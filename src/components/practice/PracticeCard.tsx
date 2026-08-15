import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticeSet } from '../../types';
import styles from './PracticeCard.module.css';
import { formatPracticeSetTitle } from '../../utils/practiceHelpers';

interface Props {
  practiceSet: PracticeSet;
}

/* Difficulty reads as colour: olive for the gentle end, honey in the middle,
   rose for the hardest set. */
const getLevelTheme = (level: string) => {
  const lvl = level.toLowerCase();
  if (lvl.includes('advanced')) {
    return { toneClass: styles.toneRose, label: 'Advanced Challenge' };
  }
  if (lvl.includes('intermediate')) {
    return { toneClass: styles.toneHoney, label: 'Intermediate Challenge' };
  }
  return { toneClass: styles.toneOlive, label: 'Beginner Challenge' };
};

const getPracticeStatus = (progress: number) => {
  if (progress === 0) return 'Not started';
  if (progress === 100) return 'Completed';
  return 'In progress';
};

const SproutIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21v-8" />
    <path d="M12 13C12 9.5 9.5 7 6 7c0 3.5 2.5 6 6 6z" />
    <path d="M12 13c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6z" />
  </svg>
);

const PracticeCard: React.FC<Props> = ({ practiceSet }) => {
  const navigate = useNavigate();
  const theme = getLevelTheme(practiceSet.level);
  const status = getPracticeStatus(practiceSet.progress);
  const actionText = practiceSet.progress === 0 ? 'Start practice' : 'Continue';
  const displayProgress = Math.round(practiceSet.progress);
  const displayTitle = formatPracticeSetTitle(practiceSet.title);

  const open = () => navigate(`/practice/${practiceSet.id}`);

  return (
    <div
      className={`${styles.card} ${theme.toneClass}`}
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.icon}>
          <SproutIcon />
        </div>
        <h3 className={styles.setName} title={displayTitle}>
          {displayTitle}
        </h3>
        <p className={styles.level}>{theme.label}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.pin}>
          <b>{displayProgress}%</b>
          <span>done</span>
        </div>

        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${Math.min(100, Math.max(0, practiceSet.progress))}%` }}
          />
        </div>

        <div className={styles.metaRow}>
          <div className={styles.problemCount}>
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
              <path d="M4 7h16" />
              <path d="M4 12h10" />
              <path d="M4 17h13" />
            </svg>
            <span>{practiceSet.totalProblems} problems</span>
          </div>

          <span className={styles.badge}>{status}</span>
        </div>

        <button className={styles.btn}>
          <span>{actionText}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
};

export default PracticeCard;
