import React from 'react';
import { useNavigate } from 'react-router-dom';

import { clearSession } from '../../lib/session';
import styles from '../scholarship/Scholarship.module.css';

interface Props {
  eyebrow: string;
  title: string;
  lede: React.ReactNode;
  footnote: React.ReactNode;
  /** Offer a way out of the session (not for paid exams, which have no password to come back with). */
  signOut?: boolean;
}

/**
 * Where a hand-off session (scholarship applicant, hiring candidate,
 * certification candidate) lands if it wanders outside its one test. The
 * session exists to sit that test, so there is no student portal to show.
 */
const HandoffSessionNotice: React.FC<Props> = ({ eyebrow, title, lede, footnote, signOut = false }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={`${styles.card} ${styles.centered}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        <p className={styles.footnote}>{footnote}</p>
        {signOut && (
          <button
            className={styles.ghostBtn}
            onClick={() => {
              clearSession();
              navigate('/login', { replace: true });
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default HandoffSessionNotice;
