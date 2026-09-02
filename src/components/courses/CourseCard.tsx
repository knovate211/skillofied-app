import React from 'react';
import { Course } from '../../types';
import styles from './CourseCard.module.css';
import { getCourseButtonText, getCourseProgress } from '../../utils/courseHelpers';
import ActionButton from '../common/ActionButton';
import { useNavigatePending } from '../../hooks/useNavigatePending';

interface Props {
  course: Course;
  /** Position in its row — decides which of the three accents the card wears. */
  index?: number;
}

/* The three seasonal accents, cycled across a row so neighbouring cards never
   share a colour. Each class supplies --band / --band-ink / --band-ink-deep /
   --track-bg, and carries its own dark-theme values. */
const TONES = [styles.toneHoney, styles.toneOlive, styles.toneRose];

const formatTitle = (title: string) => (title === 'Front-End Technologies' ? 'Front-End Tech' : title);

const iconFor = (title: string) => {
  const t = title.toLowerCase();
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (t.includes('sql') || t.includes('database')) {
    return (
      <svg {...props}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    );
  }
  if (t.includes('front-end') || t.includes('frontend')) {
    return (
      <svg {...props}>
        <path d="M4 7h16" />
        <path d="M4 12h10" />
        <path d="M4 17h13" />
      </svg>
    );
  }
  if (t.includes('java')) {
    return (
      <svg {...props}>
        <path d="M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z" />
        <path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2" />
        <path d="M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3" />
      </svg>
    );
  }
  if (t.includes('genai') || t.includes('ai')) {
    return (
      <svg {...props}>
        <path d="M12 3l1.9 4.9L19 9.8l-4.2 3.2L15.6 18 12 15.3 8.4 18l.8-5L5 9.8l5.1-1.9z" />
      </svg>
    );
  }
  if (t.includes('testing') || t.includes('qa')) {
    return (
      <svg {...props}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  if (t.includes('seo') || t.includes('marketing')) {
    return (
      <svg {...props}>
        <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
        <path d="M17 8a5 5 0 0 1 0 8" />
      </svg>
    );
  }
  if (t.includes('golang') || t.includes('full stack') || t.includes('fullstack')) {
    return (
      <svg {...props}>
        <path d="M9 8l-5 4 5 4M15 8l5 4-5 4" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
    </svg>
  );
};

/**
 * Maps the course title returned by the API to its course-viewer route.
 * Titles not listed here have no course page built yet.
 */
const COURSE_ROUTES: Record<string, string> = {
  'Front-End Technologies': '/courses/frontend',
  'Java': '/courses/java',
  'Java Development': '/courses/java',
  'Mastering SQL': '/courses/sql',
  'Golang Engineering': '/courses/golang',
  'Full Stack Engineering': '/courses/fullstack',
  'GenAI & Forward Deployed Engineering': '/courses/genai',
  'GenAI Engineering': '/courses/genai',
  'Software Testing': '/courses/testing',
  'SEO Fundamentals': '/courses/seo',
  'Digital Marketing Strategy': '/courses/digital-marketing',
};

const CourseCard: React.FC<Props> = ({ course, index = 0 }) => {
  const { go, isPending } = useNavigatePending();
  const toneClass = TONES[index % TONES.length];

  const progressValue = getCourseProgress(course.title);
  const displayProgress = Math.round(progressValue);

  // No course page built yet — the syllabus landing page still shows the
  // outline rather than dead-ending the learner.
  const route = COURSE_ROUTES[course.title] || '/courses';

  return (
    <div className={`${styles.card} ${toneClass}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{iconFor(course.title)}</div>
        <h3 className={styles.courseName}>{formatTitle(course.title)}</h3>
        <p className={styles.instructor}>{course.mentor}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.pin}>
          <b>{displayProgress}%</b>
          <span>done</span>
        </div>

        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }} />
        </div>

        <div className={styles.metaRow}>
          <div className={styles.timeTag}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15.5 14" />
            </svg>
            <span>{course.classTime}</span>
          </div>
        </div>

        <ActionButton
          className={styles.btn}
          onClick={() => go(route)}
          loading={isPending(route)}
          loadingText="Opening…"
          trailing={<span aria-hidden="true">→</span>}
        >
          {getCourseButtonText(progressValue)}
        </ActionButton>
      </div>
    </div>
  );
};

export default CourseCard;
