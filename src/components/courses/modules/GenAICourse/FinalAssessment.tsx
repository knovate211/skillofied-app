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
          Comprehensive questions across tokens and context, retrieval and grounding, agent design,
          fine-tuning trade-offs, and production concerns. Every question is drawn from a decision you
          would actually have to defend on a real project.
        </p>
        <button className={styles.saveBtn}>Launch Assessment Portal</button>
      </div>
    );
  }

  if (page === 2) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>Capstone Code Submission</h2>
        <p className={styles.paragraph}>
          Submit the Enterprise AI Platform capstone: multi-tenant RAG with permission filtering,
          tool-calling agents with approval gates, streaming responses, an evaluation harness and
          cost reporting per tenant. Include your README and evaluation results.
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
              Submit Capstone
            </button>
          </div>
        )}
      </div>
    );
  }

  if (page === 3) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>RAG Evaluation Review</h2>
        <p className={styles.paragraph}>
          Submit the golden set and evaluation report for your capstone: at least 50 real questions,
          recall@k for retrieval, faithfulness for generation, and the refusal rate. A mentor reviews
          whether your numbers actually support the claims in your README.
        </p>
        <p className={styles.paragraph} style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          This is the artefact most candidates cannot produce — it is what makes the rest defensible.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>Solution Design Interview</h2>
      <p className={styles.paragraph}>
        A live Forward Deployed Engineer round. You are given an ambiguous customer problem and assessed
        on the discovery questions you ask, the architecture you propose, the trade-offs you name, and how
        honestly you size the work — not on reaching a predetermined answer.
      </p>
    </div>
  );
};

export default FinalAssessment;
