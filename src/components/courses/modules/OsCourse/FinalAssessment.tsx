import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

const FinalAssessment: React.FC<Props> = ({ page }) => {
  const [repo, setRepo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (page === 1) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Final Theory Assessment</h2>
        <p className={styles.paragraph}>
          Comprehensive questions across processes and threads, scheduling, synchronization and deadlock,
          virtual memory, file systems and I/O. Every question is drawn from something you would have to
          explain on a real system — not definitions to recite.
        </p>
        <button className={styles.saveBtn}>Launch Assessment Portal</button>
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Implementation Test</h2>
        <p className={styles.paragraph}>
          Submit your capstone: the Linux System Monitor, plus the scheduling and memory simulators.
          Include a README stating your sampling interval, how you compute CPU utilisation from
          /proc/stat deltas, and the measured overhead of the monitor itself.
        </p>
        {submitted ? (
          <div style={{ color: '#10b981', fontWeight: 600 }}>✓ Code submission received.</div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <input
              className={styles.inputField}
              placeholder="GitHub repository link"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />
            <button
              className={styles.saveBtn}
              onClick={() => setSubmitted(true)}
              disabled={!repo.trim()}
              style={{ marginTop: '10px' }}
            >
              Submit Repository
            </button>
          </div>
        )}
      </div>
    );
  }

  if (page === 3) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Debugging Scenario</h2>
        <p className={styles.paragraph}>
          You are given a machine in a broken state and asked to diagnose it live: a process stuck in
          D-state, a memory figure that does not add up, a deadlocked pair of threads, and a disk that
          reports free space while writes fail. You are marked on method and evidence — which command you
          ran, what it told you, and what you ruled out — not on guessing the answer.
        </p>
        <p className={styles.paragraph}>
          Bring the reasoning from Module 11. &quot;I would check /proc/[pid]/status because…&quot; scores;
          naming a tool without saying what you expect to see does not.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>System Design Interview</h2>
      <p className={styles.paragraph}>
        A live discussion where you design something OS-shaped and defend the trade-offs: a thread pool
        for a server with a known request profile, a caching layer under a memory ceiling, or the
        process and isolation model for a multi-tenant job runner.
      </p>
      <p className={styles.paragraph}>
        You will be pushed on the numbers — how large is the working set, what happens when it exceeds
        RAM, where the lock contention is, and what fails first under load.
      </p>
    </div>
  );
};

export default FinalAssessment;
