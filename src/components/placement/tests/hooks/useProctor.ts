import { useCallback, useEffect, useRef, useState } from 'react';
import { Proctoring, integrityHeartbeatApi, recordProctorEventApi } from '../../../../api';

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

  // One action, one breach. Switching tabs fires "page hidden" and "window
  // lost focus" together, and doing it in full screen fires "full screen
  // exited" as well. Counted separately, one Ctrl+Tab used up three of the
  // candidate's allowed switches and the limit of 5 ended the test after two.
  // Breaches within 1.5 s of each other are the same action.
  const lastBreach = useRef(0);
  const breach = useCallback((kind: string, detail = '') => {
    const now = Date.now();
    if (now - lastBreach.current < 1500) return;
    lastBreach.current = now;
    void report(kind, detail);
  }, [report]);

  // Leaving the tab or window. `away` makes it one report per departure, not
  // one per browser event; coming back resets it.
  useEffect(() => {
    if (!active) return;
    let away = false;
    const leave = (detail: string) => {
      if (away) return;
      away = true;
      breach('tab_blur', detail);
    };
    const back = () => { away = false; };
    const onVisibility = () => (document.hidden ? leave('tab hidden') : back());
    const onBlur = () => leave('window lost focus');
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', back);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', back);
    };
  }, [active, breach]);

  // Signals that need no configuration: they are recorded on every test and
  // weighed by the reviewer, never acted on automatically.
  useEffect(() => {
    if (!active) return;
    const cleanups: (() => void)[] = [];

    // Developer tools, docked: the viewport suddenly loses a panel's worth of
    // space while the zoom level stays put. Measured against the gap at the
    // start, so a zoomed browser or a thick toolbar is not a false alarm.
    const gap = () => Math.max(window.outerWidth - window.innerWidth, window.outerHeight - window.innerHeight);
    const baseGap = gap();
    const baseDpr = window.devicePixelRatio;
    let devtoolsOpen = false;
    const devtoolsTimer = window.setInterval(() => {
      if (document.fullscreenElement || window.devicePixelRatio !== baseDpr) return;
      const open = gap() - baseGap > 160;
      if (open && !devtoolsOpen) void report('devtools', 'viewport shrank by a docked panel');
      devtoolsOpen = open;
    }, 2000);
    cleanups.push(() => window.clearInterval(devtoolsTimer));

    // A second monitor (Chromium browsers report this directly).
    // Older TS DOM typings lack Screen's EventTarget methods; the runtime has them in Chromium.
    const scr = window.screen as Screen & { isExtended?: boolean } & Partial<EventTarget>;
    const checkScreens = () => { if (scr.isExtended) void report('multi_monitor', 'extended display detected'); };
    checkScreens();
    if (typeof scr.addEventListener === 'function' && typeof scr.removeEventListener === 'function') {
      scr.addEventListener('change', checkScreens);
      cleanups.push(() => scr.removeEventListener?.('change', checkScreens));
    }

    // A window shrunk to sit something beside the test. Only when full screen
    // is not required — if it is, leaving full screen is already recorded.
    let smallSince = 0;
    let lastResizeReport = 0;
    const resizeTimer = window.setInterval(() => {
      if (config?.requireFullscreen || document.fullscreenElement) return;
      const small = window.innerWidth < window.screen.availWidth * 0.6;
      if (!small) { smallSince = 0; return; }
      if (!smallSince) smallSince = Date.now();
      if (Date.now() - smallSince > 3000 && Date.now() - lastResizeReport > 60000) {
        lastResizeReport = Date.now();
        void report('window_resized', `${window.innerWidth}px of ${window.screen.availWidth}px`);
      }
    }, 1500);
    cleanups.push(() => window.clearInterval(resizeTimer));

    // Screenshots: Print Screen, and macOS's ⌘⇧3 / ⌘⇧4 / ⌘⇧5.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') void report('screenshot', 'Print Screen');
      else if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) void report('screenshot', `⌘⇧${e.key}`);
    };
    window.addEventListener('keyup', onKey);
    window.addEventListener('keydown', onKey);
    cleanups.push(() => {
      window.removeEventListener('keyup', onKey);
      window.removeEventListener('keydown', onKey);
    });

    // Going offline. Nothing can be sent while offline, so it is reported on
    // reconnection, with how long the candidate was gone.
    let offlineAt = 0;
    const onOffline = () => { offlineAt = Date.now(); };
    const onOnline = () => {
      if (!offlineAt) return;
      const secs = Math.round((Date.now() - offlineAt) / 1000);
      offlineAt = 0;
      void report('disconnect', `offline for ${secs}s`);
    };
    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);
    cleanups.push(() => {
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('online', onOnline);
    });

    return () => cleanups.forEach((c) => c());
  }, [active, config?.requireFullscreen, report]);

  // Heartbeat: tells the server which browser session is sitting the test and
  // from which network, so a second device or tab on the same attempt shows up.
  // The session id lives in sessionStorage, which is per tab.
  useEffect(() => {
    if (!active || !attemptId) return;
    const key = `test.session.${attemptId}`;
    let sid = '';
    try {
      sid = sessionStorage.getItem(key) || '';
      if (!sid) {
        sid = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
        sessionStorage.setItem(key, sid);
      }
    } catch {
      sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    const scr = window.screen as Screen & { isExtended?: boolean };
    const screenInfo = `${scr.width}x${scr.height}${scr.isExtended ? ' +extended' : ''}`;
    const beat = () => { integrityHeartbeatApi(attemptId, sid, screenInfo).catch(() => undefined); };
    beat();
    const t = window.setInterval(beat, 30000);
    return () => window.clearInterval(t);
  }, [active, attemptId]);

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
      breach('fullscreen_exit');
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [active, config?.requireFullscreen, breach]);

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
