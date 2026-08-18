import React, { useState, useEffect } from 'react';
import styles from './TodaySchedule.module.css';

type Tone = 'honey' | 'olive' | 'rose';

interface ScheduleItem {
  id: string;
  title: string;
  /** Shown verbatim on the chip, so the ribbon reads the same as the course cards. */
  timeLabel: string;
  startHour: number;
  endHour: number;
  tone: Tone;
}

const SCHEDULE_DATA: ScheduleItem[] = [
  { id: '1', title: 'Java Development', timeLabel: '09:00 – 11:30', startHour: 9.0, endHour: 11.5, tone: 'honey' },
  { id: '2', title: 'Front-End Tech', timeLabel: '11:15 – 01:15', startHour: 11.25, endHour: 13.25, tone: 'olive' },
  { id: '3', title: 'Mastering SQL', timeLabel: '11:30 – 12:45', startHour: 11.5, endHour: 12.75, tone: 'rose' },
];

const TONE_CLASS: Record<Tone, string> = {
  honey: styles.dotHoney,
  olive: styles.dotOlive,
  rose: styles.dotRose,
};

const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

const greetingFor = (hour: number) => {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const firstName = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    const name: string = stored.name || '';
    return name.trim().split(/\s+/)[0] || 'there';
  } catch {
    return 'there';
  }
};

const TodaySchedule: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const dateString = `${DAYS[currentTime.getDay()]}, ${currentTime.getDate()} ${MONTHS[currentTime.getMonth()]}`;
  const timeDecimal = currentTime.getHours() + currentTime.getMinutes() / 60;

  const count = SCHEDULE_DATA.length;
  const countWord = COUNT_WORDS[count] ?? String(count);
  const plural = count === 1 ? 'thing is' : 'things are';

  // The sub-line nudges toward whatever is closest: a class in progress, the
  // next one up, or — once the day is done — simply picking something back up.
  const live = SCHEDULE_DATA.find(s => timeDecimal >= s.startHour && timeDecimal <= s.endHour);
  const upcoming = SCHEDULE_DATA
    .filter(s => s.startHour > timeDecimal)
    .sort((a, b) => a.startHour - b.startHour)[0];

  let nudge = 'Pick one up where you left off, or start something new below.';
  if (live) {
    nudge = `${live.title} is running right now — jump back in, or start something new below.`;
  } else if (upcoming) {
    const mins = Math.round((upcoming.startHour - timeDecimal) * 60);
    nudge = `${upcoming.title} starts in ${mins} min. Until then, pick up where you left off.`;
  }

  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>{dateString}</p>
      <h1 className={styles.greeting}>
        {greetingFor(currentTime.getHours())}, {firstName()} <span className={styles.bloom}>🌸</span>
      </h1>
      <p className={styles.sub}>
        {countWord} {plural} growing today. {nudge}
      </p>

      <div className={styles.ribbon}>
        {SCHEDULE_DATA.map(item => (
          <div key={item.id} className={styles.chip}>
            <div className={styles.chipTime}>
              <span className={`${styles.chipDot} ${TONE_CLASS[item.tone]}`} />
              {item.timeLabel}
            </div>
            <div className={styles.chipName}>{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaySchedule;
