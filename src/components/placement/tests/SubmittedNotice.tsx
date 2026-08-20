import React, { useEffect, useState } from 'react';

import { getScholarshipOutcomeApi } from '../../../api';
import styles from './Tests.module.css';

/**
 * What a scholarship candidate sees when their paper is in.
 *
 * They are shown that it arrived and nothing else. A scholarship result is a
 * fee decision — reviewed against the award ladder, adjustable by staff, sent
 * out by email with what happens next — so a percentage on screen the second
 * they hit submit would pre-empt a decision nobody has made yet. It would also
 * frequently be wrong: coding answers grade asynchronously, so the honest score
 * at that moment is often zero.
 *
 * The same panel serves two entrances — the end of the test, and anybody who
 * later opens the /result/:id URL directly. Both are driven by the server's
 * withheld flag, so there is no arrangement of client state that shows a score.
 */
const SubmittedNotice: React.FC<{
  attemptId: string;
  title?: string;
  submittedAt?: string;
  /** Rendered over the player, which has no app shell around it. */
  standalone?: boolean;
  onDone?: () => void;
}> = ({ attemptId, title, submittedAt, standalone = false, onDone }) => {
  const [email, setEmail] = useState('');
  const [courseName, setCourseName] = useState('');

  // Only for the address to write to and the course name — the endpoint no
  // longer returns a score to leak.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getScholarshipOutcomeApi(attemptId);
        if (cancelled || !res.isScholarship) return;
        setEmail(res.email ?? '');
        setCourseName(res.courseName ?? '');
      } catch {
        // The panel reads fine without either.
      }
    })();
    return () => { cancelled = true; };
  }, [attemptId]);

  const card = (
    <section className={styles.submittedCard} role="status" aria-live="polite">
      <div className={styles.submittedTick} aria-hidden="true">✓</div>

      <h1 className={styles.submittedTitle}>Your test has been submitted</h1>

      <p className={styles.submittedLead}>
        {title ? <>Every answer you gave on <strong>{title}</strong> has been recorded.</> : 'Every answer you gave has been recorded.'}
        {' '}You can close this window.
      </p>

      <div className={styles.submittedNext}>
        <h2 className={styles.submittedNextHead}>What happens next</h2>
        <ol className={styles.submittedSteps}>
          <li>Our team reviews your paper, including the coding answers.</li>
          <li>
            We email your result{courseName ? <> and your scholarship decision for <strong>{courseName}</strong></> : null}
            {email ? <> to <strong>{email}</strong></> : null}.
          </li>
          <li>If you have earned an award, a counsellor calls you to take you through enrolment.</li>
        </ol>
        <p className={styles.submittedFinePrint}>
          Results are not shown here. Please do not resubmit or retake the test — check your
          inbox, and your spam folder, over the next few working days.
        </p>
      </div>

      {submittedAt ? (
        <p className={styles.submittedStamp}>Received {submittedAt}</p>
      ) : null}

      {onDone ? (
        <button type="button" className={styles.ghostBtn} onClick={onDone}>Done</button>
      ) : null}
    </section>
  );

  return standalone ? <div className={styles.submittedScreen}>{card}</div> : <div className={styles.resultWrap}>{card}</div>;
};

export default SubmittedNotice;
