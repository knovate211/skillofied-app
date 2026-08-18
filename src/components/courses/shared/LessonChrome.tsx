import React from 'react';
import styles from '../FrontendCoursePage.module.css';
import { lessonBadge } from './lessonTheory';

interface Props {
  /** Syllabus item id, e.g. "m3-l2". Non-lesson items simply get no badge. */
  itemId?: string;
  children: React.ReactNode;
}

/**
 * Wraps hand-authored lesson pages in the shared template's header, reading
 * measure, and type scale.
 *
 * Unlike LessonLayout this takes no structured lesson data — the Frontend
 * course's pages are bespoke JSX with no objectives or takeaways to render — so
 * it supplies only the chrome and lets each page keep its own body.
 */
const LessonChrome: React.FC<Props> = ({ itemId, children }) => {
  const badge = lessonBadge(itemId);

  return (
    <div className={styles.lessonChrome}>
      {badge && <span className={styles.lessonChromeBadge}>{badge}</span>}
      {children}
    </div>
  );
};

export default LessonChrome;
