import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../scholarship/Scholarship.module.css';

/**
 * Where a hiring candidate lands if they wander outside their test. Their
 * session exists only to sit the company's assessment, so there is no student
 * portal to show them.
 */
const HiringSessionNotice: React.FC = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.screen}>
      <div className={`${styles.card} ${styles.centered}`}>
        <p className={styles.eyebrow}>Online assessment</p>
        <h1 className={styles.title}>You&apos;re signed in for your test</h1>
        <p className={styles.lede}>
          This sign-in is only for the assessment you were invited to. To open it again, use the
          link in your invitation email.
        </p>
        <p className={styles.footnote}>
          If you have already submitted, you are all done — the hiring team will contact you about
          the next steps.
        </p>
        <button className={styles.ghostBtn} onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};

export default HiringSessionNotice;
