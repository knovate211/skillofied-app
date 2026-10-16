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
          Comprehensive questions across the layered models, addressing and routing, the transport layer,
          application protocols, security and cloud networking. Every question is drawn from something you
          would have to explain or debug on a real network.
        </p>
        <button className={styles.saveBtn}>Launch Assessment Portal</button>
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Subnetting Test</h2>
        <p className={styles.paragraph}>
          Timed and calculator-free. Given blocks and host requirements, produce addressing plans using
          VLSM; given an address and prefix, produce the network, broadcast and usable range; given a
          routing table and a destination, name the route that wins and say why.
        </p>
        <p className={styles.paragraph}>
          Speed comes from block sizes, not from converting every octet to binary. Module 4 drills the
          method the test assumes.
        </p>
        <button className={styles.saveBtn}>Launch Assessment Portal</button>
      </div>
    );
  }

  if (page === 3) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Packet Capture Analysis</h2>
        <p className={styles.paragraph}>
          You are given a capture of a failing session and asked what went wrong and at which layer.
          Expect a mixture: a handshake that never completed, a connection reset mid-transfer, a DNS
          answer pointing at the wrong host, retransmissions under congestion, and a TLS handshake
          failing on name mismatch.
        </p>
        <p className={styles.paragraph}>
          Submit your written analysis alongside the Packet Analyzer you built in Project 2 — you are
          marked on the reasoning and the evidence you cite from the bytes, not on the verdict alone.
        </p>
        {submitted ? (
          <div style={{ color: '#10b981', fontWeight: 600 }}>✓ Submission received.</div>
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

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>Network Design Interview</h2>
      <p className={styles.paragraph}>
        A live discussion of your capstone design. You will present the addressing plan, the segmentation
        and the edge, then defend it: what happens when this link fails, why this block is that size, why
        this traffic crosses that firewall, and what you would change at ten times the scale.
      </p>
      <p className={styles.paragraph}>
        Expect at least one deliberate change of requirements mid-interview — a new site, a compliance
        rule, a merger with overlapping address space — to see whether the plan has room in it.
      </p>
    </div>
  );
};

export default FinalAssessment;
