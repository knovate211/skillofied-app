import React, { useCallback, useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import {
  getAttendanceHistoryApi,
  getTodayClassesApi,
  markAttendanceApi,
  type AttendanceHistory,
  type ClassSession,
} from '../../api';
import { useToast } from '../../context/ToastContext';
import { ATTENDANCE_EVENT, formatClock } from '../attendance/AttendancePrompt';
import styles from './AttendanceSection.module.css';

const RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
];

const isoDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });

const percent = (present: number, absent: number) =>
  present + absent === 0 ? null : Math.round((present / (present + absent)) * 100);

const STATUS_LABEL: Record<ClassSession['status'], string> = {
  present: 'Present',
  absent: 'Absent',
  live: 'Live now',
  upcoming: 'Upcoming',
};

const AttendanceSection: React.FC = () => {
  const { showToast } = useToast();
  const [days, setDays] = useState(30);
  const [today, setToday] = useState<ClassSession[]>([]);
  const [history, setHistory] = useState<AttendanceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [marking, setMarking] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const [t, h] = await Promise.all([getTodayClassesApi(), getAttendanceHistoryApi(isoDaysAgo(days))]);
      setToday(Array.isArray(t.sessions) ? t.sessions : []);
      setHistory(h);
    } catch (e: any) {
      setError(e.message || 'Could not load attendance');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void load();
    window.addEventListener(ATTENDANCE_EVENT, load);
    const poll = window.setInterval(load, 60_000);
    return () => {
      window.removeEventListener(ATTENDANCE_EVENT, load);
      window.clearInterval(poll);
    };
  }, [load]);

  const mark = async (s: ClassSession) => {
    setMarking(s.schedule_id);
    try {
      await markAttendanceApi(s.schedule_id);
      showToast(`Attendance marked for ${s.title}`, 'success');
      window.dispatchEvent(new Event(ATTENDANCE_EVENT));
    } catch (e: any) {
      showToast(e.message || 'Could not mark attendance', 'error');
      void load();
    } finally {
      setMarking(null);
    }
  };

  if (loading) return <p className={styles.muted}>Loading attendance…</p>;
  if (error) {
    return (
      <div className={styles.empty}>
        <p>{error}</p>
        <button className={styles.secondaryBtn} onClick={() => { setLoading(true); void load(); }}>Try again</button>
      </div>
    );
  }

  const overall = percent(history?.present ?? 0, history?.absent ?? 0);
  const past = (history?.sessions ?? []).filter((s) => s.status === 'present' || s.status === 'absent');

  return (
    <div className={styles.container}>
      {/* ── Summary ── */}
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statMain}`}>
          <span className={styles.statLabel}>Attendance</span>
          <span className={styles.statValue}>{overall === null ? '—' : `${overall}%`}</span>
          <div className={styles.bar}><span style={{ width: `${overall ?? 0}%` }} /></div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Present</span>
          <span className={`${styles.statValue} ${styles.present}`}>{history?.present ?? 0}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Absent</span>
          <span className={`${styles.statValue} ${styles.absent}`}>{history?.absent ?? 0}</span>
        </div>
      </div>

      {/* ── Today ── */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}><CalendarCheck size={18} /> Today&apos;s classes</h3>
        {today.length === 0 ? (
          <p className={styles.muted}>No classes scheduled for today.</p>
        ) : (
          <ul className={styles.todayList}>
            {today.map((s) => (
              <li key={s.schedule_id} className={styles.todayRow}>
                <div>
                  <p className={styles.rowTitle}>{s.title}</p>
                  <p className={styles.rowMeta}>
                    <Clock size={13} /> {formatClock(s.starts_at)} – {formatClock(s.ends_at)}
                    {s.instructor && <> · {s.instructor}</>}
                  </p>
                </div>
                {s.status === 'live' ? (
                  <button className={styles.primaryBtn} disabled={marking === s.schedule_id} onClick={() => mark(s)}>
                    {marking === s.schedule_id ? 'Marking…' : 'Mark attendance'}
                  </button>
                ) : (
                  <span className={`${styles.pill} ${styles[s.status]}`}>
                    {s.status === 'present' && s.marked_at ? `Marked ${formatClock(s.marked_at)}` : STATUS_LABEL[s.status]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── By course ── */}
      {history && history.courses.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>By class</h3>
          <ul className={styles.courseList}>
            {history.courses.map((c) => {
              const pct = percent(c.present, c.absent) ?? 0;
              return (
                <li key={`${c.course_id}-${c.title}`} className={styles.courseRow}>
                  <div className={styles.courseHead}>
                    <span className={styles.rowTitle}>{c.title}</span>
                    <span className={styles.rowMeta}>{c.present}/{c.present + c.absent} · {pct}%</span>
                  </div>
                  <div className={styles.bar}><span style={{ width: `${pct}%` }} /></div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ── History ── */}
      <section className={styles.card}>
        <div className={styles.historyHead}>
          <h3 className={styles.cardTitle}>History</h3>
          <select className={styles.select} value={days} onChange={(e) => setDays(Number(e.target.value))}>
            {RANGES.map((r) => <option key={r.days} value={r.days}>{r.label}</option>)}
          </select>
        </div>
        {past.length === 0 ? (
          <p className={styles.muted}>No finished classes in this period yet.</p>
        ) : (
          <ul className={styles.historyList}>
            {past.map((s) => (
              <li key={`${s.schedule_id}|${s.date}`} className={styles.historyRow}>
                {s.status === 'present'
                  ? <CheckCircle2 size={18} className={styles.present} />
                  : <XCircle size={18} className={styles.absent} />}
                <div className={styles.historyMain}>
                  <p className={styles.rowTitle}>{s.title}</p>
                  <p className={styles.rowMeta}>{formatDate(s.date)} · {formatClock(s.starts_at)} – {formatClock(s.ends_at)}</p>
                </div>
                <span className={`${styles.pill} ${styles[s.status]}`}>{STATUS_LABEL[s.status]}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AttendanceSection;
