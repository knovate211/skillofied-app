import React from 'react';
import styles from './SectionHeader.module.css';

interface Props {
  title: string;
  /** Small mono kicker set above the title, e.g. "Pick up where you left off". */
  eyebrow?: string;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}

const SectionHeader: React.FC<Props> = ({ title, eyebrow, onPrev, onNext, canPrev, canNext }) => (
  <div className={styles.header}>
    <div className={styles.titles}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
    </div>
    {(onPrev && onNext) && (
      <div className={styles.controls}>
        <button className={styles.navBtn} onClick={onPrev} disabled={!canPrev} aria-label="Previous">
          &#8249;
        </button>
        <button className={styles.navBtn} onClick={onNext} disabled={!canNext} aria-label="Next">
          &#8250;
        </button>
      </div>
    )}
  </div>
);

export default SectionHeader;
