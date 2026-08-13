import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

const Certification: React.FC<Props> = () => {
  return (
    <div
      className={styles.tabContent}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
      <h2 className={styles.cardTitle}>GenAI &amp; Forward Deployed Engineering Certificate</h2>
      <p className={styles.paragraph} style={{ maxWidth: '440px', margin: '0 auto 20px auto' }}>
        Complete all twelve modules, the five portfolio projects and the final assessment — including the
        capstone evaluation report — to unlock your verified certificate.
      </p>
      <button className={styles.choiceBtn} disabled style={{ opacity: 0.6 }}>
        Download Certificate (Locked)
      </button>
    </div>
  );
};

export default Certification;
