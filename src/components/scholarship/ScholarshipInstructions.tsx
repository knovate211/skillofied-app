import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AssessmentSummaryItem, listAssessmentsApi, startAttemptApi } from '../../api';
import SystemCheck, { runChecks } from './SystemCheck';
import styles from './Scholarship.module.css';

/**
 * The last screen before the clock starts.
 *
 * Deliberately a separate step from the hand-off: the entry screen spends the
 * candidate's token the moment they arrive, but nothing here calls
 * startAttempt until they press the button. That gap is the whole point — a
 * one-attempt, server-timed exam should never begin because somebody followed a
 * link.
 */
const ScholarshipInstructions: React.FC = () => {
  const { assessmentId = '' } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<AssessmentSummaryItem | null>(null);
  const [loadError, setLoadError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState('');

  const checks = useMemo(() => runChecks(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // The candidate-facing listing already filters to what they may sit, so
        // an assessment missing here is one they are not entitled to.
        const list = await listAssessmentsApi();
        if (cancelled) return;
        const found = list.find((a) => a.id === assessmentId);
        if (!found) {
          setLoadError('We could not find your test. It may have closed, or this link may belong to a different account.');
          return;
        }
        // Someone returning mid-test goes straight back into their paper rather
        // than reading the rules again while their clock runs down.
        if (found.liveAttemptId) {
          navigate(`/placement/tests/attempt/${found.liveAttemptId}`, { replace: true });
          return;
        }
        setAssessment(found);
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'We could not load your test.');
      }
    })();
    return () => { cancelled = true; };
  }, [assessmentId, navigate]);

  const start = async () => {
    setStarting(true);
    setStartError('');
    try {
      const inviteToken = sessionStorage.getItem(`scholarship.invite.${assessmentId}`) ?? '';
      const state = await startAttemptApi(assessmentId, inviteToken);
      sessionStorage.removeItem(`scholarship.invite.${assessmentId}`);
      navigate(`/placement/tests/attempt/${state.attemptId}`, { replace: true });
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'We could not start your test.');
      setStarting(false);
    }
  };

  if (loadError) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>Scholarship</p>
          <h1 className={styles.title}>We could not open your test</h1>
          <p className={styles.lede}>{loadError}</p>
          <button className={styles.ghostBtn} onClick={() => navigate('/placement')}>
            Go to my dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <div className={styles.spinner} />
          <p className={styles.lede}>Loading your test…</p>
        </div>
      </div>
    );
  }

  const blocked = !assessment.canStart;

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Scholarship test</p>
        <h1 className={styles.title}>{assessment.title}</h1>
        <p className={styles.lede}>
          Read this through before you begin. Once you start, the timer runs on our servers and
          does not pause.
        </p>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <div className={styles.metaValue}>{assessment.durationMinutes} min</div>
            <div className={styles.metaLabel}>one sitting</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaValue}>{assessment.totalMarks}</div>
            <div className={styles.metaLabel}>marks total</div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaValue}>{assessment.questionCount}</div>
            <div className={styles.metaLabel}>
              {assessment.sectionSummary || 'questions'}
            </div>
          </div>
        </div>

        <ul className={styles.rules}>
          <li>
            <span className={styles.bullet} />
            <span>
              <b>The clock is ours, not your browser&apos;s.</b> Closing the tab, losing your
              connection or switching devices does not stop it. Your answers are saved as you go,
              so you can resume where you left off.
            </span>
          </li>
          <li>
            <span className={styles.bullet} />
            <span>
              <b>One attempt.</b> When you submit, or when the time runs out, that is your result.
            </span>
          </li>
          <li>
            <span className={styles.bullet} />
            <span>
              <b>Coding answers run against real test cases.</b> Use <b>Run</b> to try the visible
              examples as often as you like — it scores nothing. <b>Submit</b> grades against
              hidden cases, and your best submission for each question is the one that counts.
            </span>
          </li>
          <li>
            <span className={`${styles.bullet} ${styles.bulletWarn}`} />
            <span>
              <b>The test runs full-screen and counts how often you leave it.</b> Switching tabs or
              windows is recorded and shown to the reviewer. There is no webcam and no screen
              recording.
            </span>
          </li>
        </ul>

        <div className={styles.footnote} style={{ marginBottom: 4 }}>Before you start</div>
        <SystemCheck checks={checks} />

        <label className={styles.consent}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I have read the above, I am ready to sit the whole {assessment.durationMinutes} minutes
            now, and I understand this is my one attempt.
          </span>
        </label>

        {blocked && assessment.blockedReason && (
          <div className={styles.errorBox}>{assessment.blockedReason}</div>
        )}
        {startError && <div className={styles.errorBox}>{startError}</div>}

        <button
          className={styles.primaryBtn}
          onClick={start}
          disabled={!agreed || starting || blocked}
        >
          {starting ? 'Starting…' : 'Start my test'}
        </button>

        <p className={styles.footnote}>
          Not ready? Close this tab — your link stays valid for three days and the clock only
          starts when you press the button.
        </p>
      </div>
    </div>
  );
};

export default ScholarshipInstructions;
