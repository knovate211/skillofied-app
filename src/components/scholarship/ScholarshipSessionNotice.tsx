import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Scholarship.module.css';

/**
 * Where an applicant lands if they try to reach the student portal.
 *
 * A scholarship applicant is not a student. Their session exists to sit one
 * test, so it must not open the course dashboard, the practice library or the
 * placement board — the app gate in App.tsx sends them here instead of into a
 * portal they are not enrolled in.
 *
 * The message is deliberately calm rather than an error: an applicant who has
 * just finished their test and clicked around is not doing anything wrong, they
 * simply have nowhere else to be yet. Enrolment — and with it a real student
 * account — happens only after they pass and pay, and staff do that by hand.
 */
const ScholarshipSessionNotice: React.FC = () => {
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
        <p className={styles.eyebrow}>Scholarship</p>
        <h1 className={styles.title}>You&apos;re signed in for your test</h1>
        <p className={styles.lede}>
          This sign-in is just for your scholarship test — there is no course portal to open
          yet. You become a student, with a full account, once you have passed and enrolled.
        </p>
        <p className={styles.footnote}>
          If your test is already submitted, you are all done: we will email your result. If your
          test link has expired, apply again with the same email address to get a fresh one — you
          will not lose your place.
        </p>
        <button className={styles.ghostBtn} onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};

export default ScholarshipSessionNotice;
