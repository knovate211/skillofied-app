import React from 'react';
import styles from './Scholarship.module.css';

export interface CheckResult {
  label: string;
  ok: boolean;
  hint: string;
}

/**
 * Pre-flight checks, run before the clock rather than after.
 *
 * These are advisory, not gates — a candidate on an unusual setup is still let
 * through, because a false negative here would cost somebody a scholarship. The
 * point is to surface a fixable problem while fixing it is still free.
 */
export async function runCameraCheck(): Promise<CheckResult> {
  // Asked here rather than at the clock, so a blocked camera is a thing to fix
  // now instead of a proctoring finding two minutes into a one-attempt exam.
  // The stream is released immediately — this only establishes permission.
  const hint =
    'Your camera and microphone are monitored during this test. Allow access when your browser asks, ' +
    'or the test will record that it was blocked.';
  if (!navigator.mediaDevices?.getUserMedia) {
    return { label: 'Camera and microphone', ok: false, hint };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return { label: 'Camera and microphone', ok: true, hint };
  } catch {
    return { label: 'Camera and microphone', ok: false, hint };
  }
}

export function runChecks(): CheckResult[] {
  const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
  return [
    {
      label: 'Full-screen mode',
      ok: !!(el.requestFullscreen || el.webkitRequestFullscreen),
      hint: 'Your browser may not support the full-screen mode the test runs in. Try Chrome, Edge or Firefox.',
    },
    {
      label: 'Screen size',
      // The coding view puts an editor beside a problem statement; below roughly
      // this width one of them has nowhere to go.
      ok: window.innerWidth >= 900,
      hint: 'Your window is narrow. Use a laptop or desktop and maximise the window — the code editor needs the room.',
    },
    {
      label: 'Connection',
      ok: navigator.onLine !== false,
      hint: 'You appear to be offline. Your answers save to our servers as you go, so you need a steady connection.',
    },
    {
      label: 'Local storage',
      ok: (() => {
        try {
          localStorage.setItem('__sc', '1');
          localStorage.removeItem('__sc');
          return true;
        } catch {
          return false;
        }
      })(),
      // Private-browsing modes and blocked cookies both land here, and both
      // lose the session mid-test.
      hint: 'Your browser is blocking site storage, which the test needs to keep you signed in. Turn off private browsing or allow storage for this site.',
    },
  ];
}

const SystemCheck: React.FC<{ checks: CheckResult[] }> = ({ checks }) => (
  <div>
    {checks.map((c) => (
      <div key={c.label} className={styles.checkRow}>
        <span className={c.ok ? styles.checkOk : styles.checkBad} aria-hidden>
          {c.ok ? '✓' : '!'}
        </span>
        <span>
          {c.label}
          {!c.ok && <span style={{ display: 'block', fontSize: 12.5 }}>{c.hint}</span>}
        </span>
      </div>
    ))}
  </div>
);

export default SystemCheck;
