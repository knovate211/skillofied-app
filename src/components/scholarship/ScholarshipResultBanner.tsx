import React, { useEffect, useState } from 'react';
import { getScholarshipOutcomeApi, type ScholarshipOutcome } from '../../api';
import styles from './Scholarship.module.css';

/**
 * Turns a percentage into the thing the candidate actually cares about.
 *
 * Renders nothing for ordinary practice and hiring attempts, so the result page
 * can mount it unconditionally. A score that missed the ladder still gets a
 * banner: silence after an hour of work reads as a system failure, and the
 * honest "here is what you would have needed" is more useful than nothing.
 */
const ScholarshipResultBanner: React.FC<{ attemptId: string; evaluating: boolean }> = ({
  attemptId,
  evaluating,
}) => {
  const [outcome, setOutcome] = useState<ScholarshipOutcome | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getScholarshipOutcomeApi(attemptId);
      if (!cancelled) setOutcome(res);
    })();
    return () => { cancelled = true; };
    // Re-reads once grading finishes, so the banner catches up with the score
    // above it rather than staying on "still being marked".
  }, [attemptId, evaluating]);

  if (!outcome?.isScholarship) return null;

  if (outcome.pending) {
    return (
      <div className={`${styles.awardBanner} ${styles.awardPending}`}>
        <div className={styles.awardLabel}>Scholarship</div>
        <div className={styles.awardHeadline}>Still being marked</div>
        <p className={styles.awardBody}>
          Your coding answers are running against the full test suite. This page updates itself —
          it usually takes under a minute.
        </p>
      </div>
    );
  }

  // A confirmed decision beats the ladder: staff may have adjusted it.
  const award = outcome.confirmedAwardPercent ?? outcome.awardPercent;
  const confirmed = outcome.confirmedAwardPercent != null;

  if (outcome.qualified && award) {
    return (
      <div className={`${styles.awardBanner} ${styles.awardWon}`}>
        <div className={styles.awardLabel}>Scholarship</div>
        <div className={styles.awardHeadline}>
          You&apos;ve earned <strong>{award}% off</strong>
          {outcome.courseName ? ` ${outcome.courseName}` : ''}
        </div>
        <p className={styles.awardBody}>
          You scored <b>{outcome.percent}%</b>
          {outcome.bandMinPercent != null && !confirmed
            ? `, which clears the ${outcome.bandMinPercent}% band.`
            : '.'}{' '}
          {confirmed
            ? 'Your award is confirmed — a counsellor will call you to enrol.'
            : 'A counsellor will call you to confirm it and take you through enrolment.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.awardBanner} ${styles.awardMissed}`}>
      <div className={styles.awardLabel}>Scholarship</div>
      <div className={styles.awardHeadline}>You scored {outcome.percent}%</div>
      <p className={styles.awardBody}>
        {outcome.nextBandMinPercent != null ? (
          <>
            That is short of the {outcome.nextBandMinPercent}% needed for a{' '}
            {outcome.nextBandAwardPercent}% scholarship.{' '}
          </>
        ) : null}
        You can still join the course at the standard fee — talk to our team about payment plans
        and EMI options.
      </p>
    </div>
  );
};

export default ScholarshipResultBanner;
