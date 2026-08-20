import { useCallback, useEffect, useRef, useState } from 'react';
import { Proctoring, recordProctorEventApi } from '../../../../api';

/**
 * Client-side integrity signals for a live attempt.
 *
 * These are evidence, not a verdict. The browser cannot actually tell a second
 * monitor from a notification popup, so everything here is reported to the
 * server, weighed there, and shown to the recruiter — only an explicitly
 * configured tab-switch limit ends a test, and the server makes that call.
 */
export function useProctor(
  attemptId: string,
  config: Proctoring | undefined,
  active: boolean,
  onTerminated: (message: string) => void,
) {
  const [warning, setWarning] = useState('');
  const activeRef = useRef(active);
  activeRef.current = active;
  // Set while we release fullscreen ourselves, so the resulting
  // fullscreenchange is not mistaken for the candidate escaping the test.
  const intentionalExit = useRef(false);

  const report = useCallback(async (kind: string, detail = '') => {
    if (!activeRef.current || !attemptId) return;
    try {
      const res = await recordProctorEventApi(attemptId, kind, detail);
      if (res.warning) setWarning(res.warning);
      if (res.terminated) onTerminated(res.warning || 'Your test was ended by the proctor.');
    } catch {
      // A dropped signal must never interrupt the candidate's test.
    }
  }, [attemptId, onTerminated]);

  // Leaving the tab or window.
  useEffect(() => {
    if (!active) return;
    const onVisibility = () => { if (document.hidden) void report('tab_blur'); };
    const onBlur = () => void report('tab_blur', 'window blur');
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
    };
  }, [active, report]);

  // Fullscreen enforcement.
  useEffect(() => {
    if (!active || !config?.requireFullscreen) return;
    const onChange = () => {
      if (document.fullscreenElement) return;
      // Leaving fullscreen because we ended the test is not a breach — without
      // this the candidate's own submit would cost them integrity points.
      if (intentionalExit.current) {
        intentionalExit.current = false;
        return;
      }
      void report('fullscreen_exit');
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [active, config?.requireFullscreen, report]);

  // Copy/paste. Blocking is best-effort — the point is the audit trail.
  useEffect(() => {
    if (!active || !config?.blockCopyPaste) return;

    // Blocked as well as recorded. The setting is called block_copy_paste and
    // an assessment author ticking it expects exactly that; until now it only
    // watched, which is a quieter guarantee than the name promises.
    //
    // What this is worth being honest about: it is a deterrent, not a control.
    // It raises the effort of lifting a question into a chatbot or dropping an
    // answer back in, and it leaves a record when someone tries. It cannot stop
    // a candidate retyping a question, or photographing the screen — nothing
    // running in their browser can.
    const onPaste = (e: ClipboardEvent) => {
      const size = e.clipboardData?.getData('text')?.length ?? 0;
      e.preventDefault();
      void report('paste', `blocked, ${size} characters`);
    };
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      void report('copy', 'blocked');
    };
    const onCut = (e: ClipboardEvent) => {
      e.preventDefault();
      void report('copy', 'blocked (cut)');
    };
    // Right-click is the obvious way round a blocked keyboard shortcut.
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener('paste', onPaste);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCut);
    document.addEventListener('contextmenu', onContextMenu);
    return () => {
      document.removeEventListener('paste', onPaste);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCut);
      document.removeEventListener('contextmenu', onContextMenu);
    };
  }, [active, config?.blockCopyPaste, report]);

  // The dependency list matters here. With an empty one this closure captured
  // `config` from the first render — before the attempt state had loaded, when
  // it is still undefined — so `config?.requireFullscreen` was permanently
  // falsy and the function returned without ever requesting fullscreen. The
  // test then ran windowed however many times the candidate clicked.
  const enterFullscreen = useCallback(async () => {
    if (!config?.requireFullscreen || document.fullscreenElement) return;
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Browsers only grant fullscreen from a user gesture; if it is refused
      // the test still runs and the exit events simply never fire.
    }
  }, [config?.requireFullscreen]);

  // exitFullscreen releases the candidate's screen once the test is over. The
  // intentionalExit flag is set first so the fullscreenchange listener does not
  // log the release as a breach.
  const exitFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) return;
    intentionalExit.current = true;
    try {
      await document.exitFullscreen();
    } catch {
      intentionalExit.current = false;
    }
  }, []);

  // Backstop: however the player unmounts — submit, timeout, disqualification,
  // or the candidate navigating away — the browser must not be left locked in
  // fullscreen.
  //
  // The release is deferred by a tick, and a remount cancels it. React's
  // StrictMode mounts, tears down and remounts every component in development,
  // so an immediate release here fired the moment the player loaded and dropped
  // the candidate straight back out of full screen — a proctored test that
  // behaved one way in development and another in production, which is the
  // worst way for an anti-cheat measure to be wrong.
  const pendingRelease = useRef<number | null>(null);
  useEffect(() => {
    if (pendingRelease.current !== null) {
      window.clearTimeout(pendingRelease.current);
      pendingRelease.current = null;
    }
    return () => {
      pendingRelease.current = window.setTimeout(() => {
        pendingRelease.current = null;
        if (document.fullscreenElement) {
          intentionalExit.current = true;
          void document.exitFullscreen().catch(() => {});
        }
      }, 0);
    };
  }, []);

  const dismissWarning = useCallback(() => setWarning(''), []);

  // Tracks the requirement being unmet, so the player can ask for fullscreen
  // out loud instead of hiding the request behind a click handler nobody knows
  // about. Kept in state rather than read inline because document.fullscreenElement
  // changes without React noticing.
  const [needsFullscreen, setNeedsFullscreen] = useState(
    () => !!config?.requireFullscreen && !document.fullscreenElement,
  );
  useEffect(() => {
    const sync = () =>
      setNeedsFullscreen(!!config?.requireFullscreen && !document.fullscreenElement && activeRef.current);
    sync();
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, [config?.requireFullscreen, active]);

  return { warning, dismissWarning, enterFullscreen, exitFullscreen, needsFullscreen, report };
}
