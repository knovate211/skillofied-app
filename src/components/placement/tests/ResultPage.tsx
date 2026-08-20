import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AttemptQuestion, AttemptResult, getAttemptResultApi } from '../../../api';
import ScholarshipResultBanner from '../../scholarship/ScholarshipResultBanner';
import SubmittedNotice from './SubmittedNotice';
import styles from './Tests.module.css';

// Plain /placement lands on the Jobs tab; a candidate leaving a test belongs
// back in the list they started from.
const TESTS_TAB = '/placement?tab=tests';

const LETTERS = 'ABCDEFGHIJ';

type Outcome = 'correct' | 'partial' | 'wrong' | 'skipped' | 'pending';

/** How one answered question turned out, for both the tally and the card. */
function outcomeOf(q: AttemptQuestion): Outcome {
  if (q.gradingStatus === 'pending' || q.gradingStatus === 'manual_review') return 'pending';
  const awarded = q.awardedMarks ?? 0;
  const answered = q.kind === 'coding'
    ? !!q.submissionId
    : q.selectedOptionIds.length > 0 || q.textAnswer.trim() !== '';
  if (!answered) return 'skipped';
  if (awarded >= q.marks) return 'correct';
  if (awarded > 0) return 'partial';
  return 'wrong';
}

const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit',
  }) : '';

/**
 * Post-test result.
 *
 * The page leads with one hero figure — the percentage — backed by a meter
 * against the total. An attempt with coding questions sits in `evaluating`
 * until the judge finishes, so it polls while that is true rather than showing
 * a misleadingly low score as final.
 */
const ResultPage: React.FC = () => {
  const { attemptId = '' } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let timer: number | null = null;
    let polls = 0;

    const load = async () => {
      try {
        const res = await getAttemptResultApi(attemptId);
        if (cancelled) return;
        setResult(res);
        polls += 1;
        if (res.summary.status === 'evaluating' && polls < 40) {
          timer = window.setTimeout(load, 3000);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load your result.');
      }
    };

    void load();
    return () => { cancelled = true; if (timer) window.clearTimeout(timer); };
  }, [attemptId]);

  const tally = useMemo(() => {
    const counts: Record<Outcome, number> = {
      correct: 0, partial: 0, wrong: 0, skipped: 0, pending: 0,
    };
    result?.questions.forEach((q) => { counts[outcomeOf(q)] += 1; });
    return counts;
  }, [result]);

  if (error) {
    return (
      <div className={styles.resultWrap}>
        <div className={styles.errorBox}>{error}</div>
        <div>
          <button className={styles.ghostBtn} onClick={() => navigate(TESTS_TAB)}>Back to tests</button>
        </div>
      </div>
    );
  }

  if (!result) {
    return <div className={styles.empty}>Loading your result…</div>;
  }

  // The server withholds the marks for scholarship papers, so there is no
  // score to render — show the same confirmation the player ends on. This is
  // the guard for anyone who reaches /result/:id directly: by URL, by the back
  // button, or from a link they kept.
  if (result.withheld) {
    return (
      <SubmittedNotice
        attemptId={attemptId}
        title={result.summary?.assessmentName}
        submittedAt={formatDate(result.summary?.submittedAt ?? '')}
      />
    );
  }

  const { summary, questions, revealed } = result;
  const evaluating = summary.status === 'evaluating';
  const disqualified = summary.status === 'disqualified';
  const pct = Math.round(summary.percent);

  const state = disqualified ? 'fail' : evaluating ? 'wait' : summary.passed ? 'pass' : 'fail';
  const pill = {
    pass: { cls: styles.pillPass, icon: '✓', label: 'Passed' },
    fail: { cls: styles.pillFail, icon: disqualified ? '⚠' : '✕', label: disqualified ? 'Disqualified' : 'Not passed' },
    wait: { cls: styles.pillWait, icon: '◷', label: 'Evaluating' },
  }[state];
  const meterFill = { pass: styles.meterPass, fail: styles.meterFail, wait: styles.meterWait }[state];

  return (
    <div className={styles.resultWrap}>
      {/* Renders nothing unless this attempt belongs to a scholarship
          application, so the ordinary practice and hiring result pages are
          untouched. It leads because "40% off your course" is the answer the
          candidate came for; the score breakdown below is the working. */}
      <ScholarshipResultBanner attemptId={attemptId} evaluating={evaluating} />

      <section className={styles.scoreCard}>
        <div className={styles.scoreTop}>
          <div>
            <h2 className={styles.scoreTitle}>{summary.assessmentName}</h2>
            <p className={styles.scoreMeta}>
              {summary.submittedAt ? `Submitted ${formatDate(summary.submittedAt)}` : 'In progress'}
              {summary.attemptNo > 1 ? ` · attempt ${summary.attemptNo}` : ''}
            </p>
          </div>
          <span className={`${styles.statusPill} ${pill.cls}`}>
            <span aria-hidden="true">{pill.icon}</span>{pill.label}
          </span>
        </div>

        <div className={styles.heroFigure}>
          {evaluating ? '—' : pct}<span className={styles.heroUnit}>%</span>
        </div>
        <p className={styles.heroCaption}>
          <strong>{summary.score}</strong> of {summary.maxScore} marks
        </p>

        <div className={styles.meter}>
          <div
            className={`${styles.meterFill} ${meterFill}`}
            style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
          />
        </div>
        <div className={styles.meterScale}>
          <span>0</span>
          <span>{summary.maxScore} marks</span>
        </div>

        {evaluating && (
          <p className={styles.evaluatingNote}>
            <span aria-hidden="true">◷</span>
            Your coding answers are still being graded. This page updates on its own.
          </p>
        )}
      </section>

      {revealed && questions.length > 0 && (
        <div className={styles.kpiRow}>
          <KpiTile value={tally.correct} label="Correct" color="var(--res-ok-fill)" />
          {tally.partial > 0 && (
            <KpiTile value={tally.partial} label="Partial" color="var(--res-warn-fill)" />
          )}
          <KpiTile value={tally.wrong} label="Incorrect" color="var(--res-bad-fill)" />
          <KpiTile value={tally.skipped} label="Skipped" color="var(--border)" />
          {tally.pending > 0 && (
            <KpiTile value={tally.pending} label="Awaiting" color="var(--res-flag-fill)" />
          )}
        </div>
      )}

      {summary.integrityScore < 100 && (
        <p className={styles.reviewNote}>
          Integrity score {Math.round(summary.integrityScore)} of 100 — the recruiter can see the
          activity recorded during your test.
        </p>
      )}

      {!revealed ? (
        <div className={styles.empty}>
          The recruiter has chosen not to publish a question-by-question breakdown for this test.
        </div>
      ) : (
        <>
          <h3 className={styles.reviewHeading}>Your answers</h3>
          <div className={styles.reviewList}>
            {questions.map((q, i) => <ReviewCard key={q.id} question={q} index={i} />)}
          </div>
        </>
      )}

      <div>
        <button className={styles.primaryBtn} onClick={() => navigate(TESTS_TAB)}>
          Back to tests &amp; drives
        </button>
      </div>
    </div>
  );
};

const KpiTile: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
  <div className={styles.kpiTile}>
    <div className={styles.kpiValue}>{value}</div>
    <div className={styles.kpiLabel}>
      <span className={styles.kpiChip} style={{ background: color }} aria-hidden="true" />
      {label}
    </div>
  </div>
);

/** One answered question: what was asked, what the candidate chose, what was right. */
const ReviewCard: React.FC<{ question: AttemptQuestion; index: number }> = ({ question: q, index }) => {
  const outcome = outcomeOf(q);
  const awardedClass = outcome === 'correct' ? styles.awardedOk
    : outcome === 'partial' ? styles.awardedPart
      : outcome === 'pending' ? '' : styles.awardedBad;

  const selected = new Set(q.selectedOptionIds);

  return (
    <article className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <span className={styles.reviewNo}>
          Question {index + 1}
          {q.kind === 'coding' ? ' · Coding' : q.kind === 'descriptive' ? ' · Written' : ''}
        </span>
        <span className={`${styles.awarded} ${awardedClass}`}>
          {outcome === 'pending'
            ? (q.gradingStatus === 'manual_review' ? 'Awaiting review' : 'Grading…')
            : `${q.awardedMarks ?? 0} / ${q.marks}`}
        </span>
      </div>

      {q.body && <div className={styles.reviewBody}>{q.body}</div>}

      {q.options.length > 0 && (
        <div className={styles.reviewOptions}>
          {q.options.map((opt, i) => {
            const picked = selected.has(opt.id);
            const cls = opt.isCorrect ? styles.reviewOptionCorrect
              : picked ? styles.reviewOptionWrong : '';
            return (
              <div key={opt.id} className={`${styles.reviewOption} ${cls}`}>
                <span className={styles.optionGlyph} aria-hidden="true">
                  {opt.isCorrect ? '✓' : picked ? '✕' : LETTERS[i] ?? i + 1}
                </span>
                <span>{opt.body}</span>
                {picked && (
                  <span className={`${styles.optionTag} ${opt.isCorrect ? styles.tagCorrect : styles.tagWrong}`}>
                    Your answer
                  </span>
                )}
                {!picked && opt.isCorrect && (
                  <span className={`${styles.optionTag} ${styles.tagCorrect}`}>Correct answer</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {q.kind === 'descriptive' && (
        <pre className={styles.reviewCode}>{q.textAnswer || '(no answer given)'}</pre>
      )}

      {q.kind === 'coding' && (
        q.code ? (
          <>
            <p className={styles.reviewNote} style={{ marginBottom: 8 }}>
              {q.problemTitle}{q.language ? ` · ${q.language}` : ''}
            </p>
            <pre className={styles.reviewCode}>{q.code}</pre>
          </>
        ) : (
          <p className={styles.reviewNote}>{q.problemTitle} — no submission.</p>
        )
      )}

      {q.options.length === 0 && q.kind === 'mcq' && q.textAnswer && (
        <p className={styles.reviewNote}>You answered: {q.textAnswer}</p>
      )}
    </article>
  );
};

export default ResultPage;
