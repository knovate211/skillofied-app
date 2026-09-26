import React, { useEffect, useState } from 'react';
import { getCertificationOutcomeApi, type CertificationOutcome } from '../../api';
import styles from '../scholarship/Scholarship.module.css';

/**
 * Pass or fail for a certification exam, and the credential if it was earned.
 *
 * Renders nothing for any other kind of attempt, so the result page can mount
 * it unconditionally next to the scholarship banner. Unlike scholarship, the
 * score itself is shown here as well as above: somebody who paid to sit an exam
 * is owed the number, not only the verdict.
 */
const CertificationResultBanner: React.FC<{ attemptId: string; evaluating: boolean }> = ({
  attemptId,
  evaluating,
}) => {
  const [outcome, setOutcome] = useState<CertificationOutcome | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getCertificationOutcomeApi(attemptId);
        if (!cancelled) setOutcome(res);
      } catch {
        // A failed lookup leaves the ordinary score card in place rather than
        // replacing a real result with an error the candidate cannot act on.
      }
    })();
    return () => { cancelled = true; };
    // Re-reads once grading finishes, so the certificate appears without a
    // manual refresh.
  }, [attemptId, evaluating]);

  if (!outcome?.isCertification) return null;

  if (outcome.evaluating) {
    return (
      <div className={`${styles.awardBanner} ${styles.awardPending}`}>
        <div className={styles.awardLabel}>Certification</div>
        <div className={styles.awardHeadline}>Still being marked</div>
        <p className={styles.awardBody}>
          Your coding answers are running against the full test suite. This page updates itself —
          it usually takes under a minute.
        </p>
      </div>
    );
  }

  if (outcome.passed) {
    return (
      <div className={`${styles.awardBanner} ${styles.awardWon}`}>
        <div className={styles.awardLabel}>Certification</div>
        <div className={styles.awardHeadline}>You passed — {outcome.examTitle}</div>
        <p className={styles.awardBody}>
          You scored {outcome.scorePercent}%, against a pass mark of {outcome.passPercent}%. Your
          certificate has been issued and is in your profile under Certificates.
        </p>
        {outcome.credentialId ? (
          <p className={styles.awardBody}>
            Credential ID <strong>{outcome.credentialId}</strong>
            {outcome.verifyUrl ? (
              <>
                {' · '}
                <a href={outcome.verifyUrl} target="_blank" rel="noreferrer">
                  employer verification link
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`${styles.awardBanner} ${styles.awardMissed}`}>
      <div className={styles.awardLabel}>Certification</div>
      <div className={styles.awardHeadline}>Not passed this time</div>
      <p className={styles.awardBody}>
        You scored {outcome.scorePercent}%, and {outcome.passPercent}% was needed. The breakdown
        below shows where the marks went. You can register to resit the exam — check the exam page
        for when resits open.
      </p>
    </div>
  );
};

export default CertificationResultBanner;
