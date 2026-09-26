import React from 'react';
import styles from '../scholarship/Scholarship.module.css';

/**
 * Where a certification candidate lands if they wander off their exam.
 *
 * Their session exists to sit one paid exam; it is not a course account. The
 * copy says what they hold and what happens next, rather than offering a sign-in
 * they cannot complete — they have no password.
 */
const CertificationSessionNotice: React.FC = () => (
  <div className={styles.screen}>
    <div className={`${styles.card} ${styles.centered}`}>
      <p className={styles.eyebrow}>Certification</p>
      <h1 className={styles.title}>This session is for your exam</h1>
      <p className={styles.lede}>
        Your link signs you in for the certification exam you registered for, and nothing else.
        Use the link in your confirmation email to go back to it.
      </p>
      <p className={styles.footnote}>
        Pass, and your certificate is issued immediately — along with a link an employer can use to
        verify it.
      </p>
    </div>
  </div>
);

export default CertificationSessionNotice;
