import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarCheck, Clock, X } from 'lucide-react';
import { getTodayClassesApi, markAttendanceApi, type ClassSession } from '../../api';
import { useToast } from '../../context/ToastContext';
import styles from './AttendancePrompt.module.css';

/** How often today's classes are re-checked while the app is open. */
const POLL_MS = 60_000;
/** "Remind me later" hides the pop-up for this long (never past the class end). */
const SNOOZE_MS = 10 * 60_000;
const SNOOZE_KEY = 'attendanceSnooze';

/** Fired after any mark, so the pop-up and the Attendance tab stay in step. */
export const ATTENDANCE_EVENT = 'attendance:changed';

const sessionKey = (s: ClassSession) => `${s.schedule_id}|${s.date}`;

const readSnoozes = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(SNOOZE_KEY) || '{}');
  } catch {
    return {};
  }
};

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

/**
 * Pops up while a class the student is enrolled in is running and they have
 * not marked attendance for it yet.
 *
 * The server owns the clock: it reports each session's status, and a mark
 * outside the class window is refused there. The client's only timing job is
 * knowing when to ask again — every minute, when the tab regains focus, and
 * exactly when the next class starts.
 */
const AttendancePrompt: React.FC = () => {
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [skewMs, setSkewMs] = useState(0);
  const [snoozes, setSnoozes] = useState(readSnoozes);
  const [marking, setMarking] = useState(false);
  const [, tick] = useState(0);
  const startTimer = useRef<number>();

  const refresh = useCallback(async () => {
    try {
      const res = await getTodayClassesApi();
      setSessions(Array.isArray(res.sessions) ? res.sessions : []);
      const serverMs = new Date(res.server_time).getTime();
      setSkewMs(Number.isFinite(serverMs) ? serverMs - Date.now() : 0);
    } catch {
      // A failed poll just leaves the last known state; the next one retries.
    }
  }, []);

  useEffect(() => {
    void refresh();
    const poll = window.setInterval(refresh, POLL_MS);
    const onFocus = () => { if (document.visibilityState === 'visible') void refresh(); };
    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener(ATTENDANCE_EVENT, refresh);
    // Re-render every 15s so snoozes lapse and countdowns stay honest between polls.
    const clock = window.setInterval(() => tick((n) => n + 1), 15_000);
    return () => {
      window.clearInterval(poll);
      window.clearInterval(clock);
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener(ATTENDANCE_EVENT, refresh);
    };
  }, [refresh]);

  // Refresh right as the next class opens rather than up to a minute late.
  useEffect(() => {
    window.clearTimeout(startTimer.current);
    const now = Date.now() + skewMs;
    const next = sessions
      .filter((s) => s.status === 'upcoming')
      .map((s) => new Date(s.starts_at).getTime() - now)
      .filter((ms) => ms > 0)
      .sort((a, b) => a - b)[0];
    if (next !== undefined && next < 6 * 60 * 60_000) {
      startTimer.current = window.setTimeout(refresh, next + 1000);
    }
    return () => window.clearTimeout(startTimer.current);
  }, [sessions, skewMs, refresh]);

  const now = Date.now() + skewMs;
  const live = sessions.find(
    (s) =>
      s.status === 'live' &&
      new Date(s.ends_at).getTime() > now &&
      (snoozes[sessionKey(s)] ?? 0) < now,
  );

  if (!live) return null;

  const snooze = () => {
    const until = Math.min(now + SNOOZE_MS, new Date(live.ends_at).getTime());
    const next = { ...snoozes, [sessionKey(live)]: until };
    setSnoozes(next);
    try { sessionStorage.setItem(SNOOZE_KEY, JSON.stringify(next)); } catch { /* private mode */ }
  };

  const mark = async () => {
    setMarking(true);
    try {
      const res = await markAttendanceApi(live.schedule_id);
      setSessions((list) =>
        list.map((s) => (sessionKey(s) === sessionKey(live) ? { ...s, status: 'present', marked_at: res.marked_at } : s)),
      );
      showToast(`Attendance marked for ${live.title}`, 'success');
      window.dispatchEvent(new Event(ATTENDANCE_EVENT));
    } catch (e: any) {
      showToast(e.message || 'Could not mark attendance', 'error');
      void refresh(); // the window may have just closed; let the server say so
    } finally {
      setMarking(false);
    }
  };

  const minsLeft = Math.max(0, Math.ceil((new Date(live.ends_at).getTime() - now) / 60_000));

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="attendance-title">
      <div className={styles.card}>
        <button className={styles.close} onClick={snooze} aria-label="Remind me later">
          <X size={18} />
        </button>
        <span className={styles.icon}><CalendarCheck size={28} /></span>
        <p className={styles.eyebrow}>Class in progress</p>
        <h2 id="attendance-title" className={styles.title}>{live.title}</h2>
        <p className={styles.time}>
          <Clock size={14} /> {formatClock(live.starts_at)} – {formatClock(live.ends_at)}
          {live.instructor && <> · {live.instructor}</>}
        </p>
        <p className={styles.body}>
          Mark your attendance before the class ends. Attendance closes in{' '}
          <strong>{minsLeft} min</strong>.
        </p>
        <button className={styles.primary} onClick={mark} disabled={marking}>
          {marking ? 'Marking…' : 'Mark my attendance'}
        </button>
        {live.meeting_url && (
          <a className={styles.link} href={live.meeting_url} target="_blank" rel="noreferrer">
            Join the class
          </a>
        )}
        <button className={styles.later} onClick={snooze}>Remind me later</button>
      </div>
    </div>
  );
};

export default AttendancePrompt;
