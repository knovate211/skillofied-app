import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Camera and microphone monitoring for a live attempt.
 *
 * The deliberate limit here: this **detects and reports, it never records**.
 * No frame, no audio sample and no derived biometric leaves the candidate's
 * machine — only small events of the same kind the rest of the proctor already
 * emits. That keeps a scholarship test out of biometric-data territory, which
 * carries real obligations under India's DPDP Act and would otherwise mean
 * holding video of students (often minors) for as long as a dispute might run.
 * It is also the part that actually deters: a candidate who can see themselves
 * being watched behaves differently, whether or not anything is stored.
 *
 * What it can tell you, in descending order of confidence:
 *
 *   camera_denied   permission refused, or no device — unambiguous
 *   camera_off      the stream ended mid-test: unplugged, covered by the OS,
 *                   or revoked. Also unambiguous.
 *   camera_dark     the frame went black — a hand, a lens cover, a lid
 *   no_motion       the picture stopped changing for half a minute: an empty
 *                   chair, a photo propped in front of the lens, a frozen feed
 *   voice_detected  sustained speech-level sound
 *   no_face /       only when the browser ships a face detector. Most do not,
 *   multi_face      and this never pretends otherwise.
 *
 * Everything is advisory. RecordProctorEvent deliberately terminates an attempt
 * only on a configured tab-switch limit, and nothing here changes that: client
 * proctoring false-positives too often — bad light, a headscarf, a sibling
 * walking past — to fail somebody's scholarship on it automatically.
 */

export type MediaState = 'idle' | 'requesting' | 'live' | 'denied' | 'unsupported';

interface Options {
  enabled: boolean;
  active: boolean;
  report: (kind: string, detail?: string) => void;
}

// A frame this dark is a covered lens, not a dim room.
const DARK_THRESHOLD = 12;
// Mean absolute pixel change between frames, 0-255. A webcam's own sensor noise
// sits above this even pointed at a wall, so falling under it means the image is
// not changing at all.
const MOTION_THRESHOLD = 2.2;
// How long the picture must sit frozen before it is worth reporting. A candidate
// reading a question is still for seconds, not half a minute — over this long,
// a live frame always moves, if only from breathing and sensor noise.
const STILL_TICKS = 8; // × 4s ≈ 32 seconds
// Speech-level RMS on a 0-255 analyser scale, held long enough to not be a cough.
const VOICE_THRESHOLD = 26;
const VOICE_SUSTAIN_MS = 1200;
// One report per breach type per this long, so a covered camera does not write
// a thousand rows.
const REPORT_COOLDOWN_MS = 20000;

export function useMediaProctor({ enabled, active, report }: Options) {
  const [state, setState] = useState<MediaState>('idle');
  const [error, setError] = useState('');
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastReport = useRef<Record<string, number>>({});
  const reportRef = useRef(report);
  reportRef.current = report;

  const throttledReport = useCallback((kind: string, detail?: string) => {
    const now = Date.now();
    if (now - (lastReport.current[kind] ?? 0) < REPORT_COOLDOWN_MS) return;
    lastReport.current[kind] = now;
    reportRef.current(kind, detail);
  }, []);

  // ── acquire ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled || !active) return;
    let cancelled = false;

    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState('unsupported');
        throttledReport('camera_denied', 'browser has no camera support');
        return;
      }
      setState('requesting');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' },
          audio: true,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        setState('live');

        // A track ending mid-test is the candidate revoking access, pulling the
        // webcam, or the OS taking it — all worth knowing about.
        stream.getTracks().forEach((t) => {
          t.addEventListener('ended', () => {
            throttledReport('camera_off', `${t.kind} track ended`);
            setState('denied');
          });
        });
      } catch (e) {
        if (cancelled) return;
        setState('denied');
        const name = e instanceof Error ? e.name : 'unknown';
        setError(
          name === 'NotAllowedError'
            ? 'Camera and microphone access was blocked.'
            : name === 'NotFoundError'
              ? 'No camera or microphone was found.'
              : 'The camera could not be started.',
        );
        throttledReport('camera_denied', name);
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [enabled, active, throttledReport]);

  // ── attach the preview ─────────────────────────────────────────────────────
  const attachVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
      void el.play().catch(() => {});
    }
  }, []);
  useEffect(() => {
    if (state === 'live' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      void videoRef.current.play().catch(() => {});
    }
  }, [state]);

  // ── watch the picture ──────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'live' || !active) return;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 48;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Only where the browser genuinely provides it. Loading a face-detection
    // model would mean megabytes before the clock starts, and a false "no face"
    // costs somebody a scholarship — so this stays opportunistic.
    const FD = (window as unknown as { FaceDetector?: new (o?: object) => { detect(i: unknown): Promise<unknown[]> } }).FaceDetector;
    const detector = FD ? new FD({ fastMode: true }) : null;

    let previous: Float32Array | null = null;
    let stillFor = 0;

    const id = window.setInterval(async () => {
      const v = videoRef.current;
      if (!v || !ctx || v.readyState < 2) return;
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const grey = new Float32Array(data.length / 4);
      let sum = 0;
      for (let i = 0, g = 0; i < data.length; i += 4, g++) {
        const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grey[g] = lum;
        sum += lum;
      }
      const brightness = sum / grey.length;
      if (brightness < DARK_THRESHOLD) {
        previous = grey;
        stillFor = 0;
        throttledReport('camera_dark', `brightness ${brightness.toFixed(1)}`);
        return;
      }

      // Is anything in front of the lens actually alive?
      //
      // This is not face detection and does not pretend to be — it asks the
      // narrower question the camera can answer without a model: is this
      // picture changing? A person breathes, blinks and shifts; an empty chair,
      // a photograph propped in front of the webcam, or a frozen stream do not.
      // It cannot tell you who is there or how many, but it does catch the
      // common case of someone walking away from a proctored exam.
      if (previous) {
        let diff = 0;
        for (let i = 0; i < grey.length; i++) diff += Math.abs(grey[i] - previous[i]);
        const motion = diff / grey.length;

        if (motion < MOTION_THRESHOLD) {
          stillFor += 1;
          if (stillFor >= STILL_TICKS) {
            throttledReport('no_motion', `frame static for ~${stillFor * 4}s`);
            stillFor = 0;
          }
        } else {
          stillFor = 0;
        }
      }
      previous = grey;

      if (detector) {
        try {
          const faces = await detector.detect(canvas);
          if (faces.length === 0) throttledReport('no_face');
          else if (faces.length > 1) throttledReport('multi_face', `${faces.length} faces`);
        } catch {
          /* detector unavailable at runtime — the other signals stand alone */
        }
      }
    }, 4000);

    return () => window.clearInterval(id);
  }, [state, active, throttledReport]);

  // ── listen ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'live' || !active || !streamRef.current) return;
    const AudioCtor = window.AudioContext
      ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const audio = new AudioCtor();
    const source = audio.createMediaStreamSource(streamRef.current);
    const analyser = audio.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const buf = new Uint8Array(analyser.frequencyBinCount);
    let loudSince = 0;

    const id = window.setInterval(() => {
      analyser.getByteFrequencyData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i];
      const level = sum / buf.length;

      if (level > VOICE_THRESHOLD) {
        // Sustained, so a door closing or a cough is not a finding.
        if (loudSince === 0) loudSince = Date.now();
        else if (Date.now() - loudSince > VOICE_SUSTAIN_MS) {
          throttledReport('voice_detected', `level ${level.toFixed(0)}`);
          loudSince = 0;
        }
      } else {
        loudSince = 0;
      }
    }, 400);

    return () => {
      window.clearInterval(id);
      source.disconnect();
      void audio.close().catch(() => {});
    };
  }, [state, active, throttledReport]);

  return { state, error, attachVideo };
}
