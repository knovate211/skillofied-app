import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AttemptQuestion,
  AttemptState,
  getAttemptStateApi,
  submitAttemptApi,
} from '../../../api';
import CodingQuestionView from './CodingQuestionView';
import McqQuestionView from './McqQuestionView';
import QuestionPalette, { isAnswered } from './QuestionPalette';
import { formatDuration, useAttemptTimer } from './hooks/useAttemptTimer';
import { useAutosave } from './hooks/useAutosave';
import { useProctor } from './hooks/useProctor';
import styles from './Tests.module.css';

/**
 * The test player.
 *
 * All state of record lives on the server: refreshing, crashing or moving to
 * another device resumes exactly where the candidate left off. The only local
 * state is the current question index and the in-flight edits that autosave
 * has not yet flushed.
 */
const TestPlayer: React.FC = () => {
  const { attemptId = '' } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<AttemptState | null>(null);
  const [questions, setQuestions] = useState<AttemptQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [serverSeconds, setServerSeconds] = useState<number | null>(null);
  const [loadError, setLoadError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [ending, setEnding] = useState(false);

  const questionEnteredAt = useRef<number>(Date.now());
  const submittedRef = useRef(false);

  const { queue, flushNow, status: saveStatus } = useAutosave(setServerSeconds);

  // exitFullscreenRef breaks the circular dependency between endTest and
  // useProctor: endTest needs to release the screen, and useProctor needs
  // endTest to terminate a disqualified attempt.
  const exitFullscreenRef = useRef<() => Promise<void>>(async () => {});

  const endTest = useCallback(async (reason: 'user' | 'timeout' | 'proctor') => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setEnding(true);
    try {
      if (reason === 'user') await flushNow();
      await submitAttemptApi(attemptId);
    } catch {
      // The server auto-submits on expiry anyway; the result page is the
      // source of truth either way.
    }
    // Release the screen before leaving the player — the result page lives in
    // the normal app shell, and a candidate should never be stuck fullscreen
    // once their test is over.
    await exitFullscreenRef.current();
    navigate(`/placement/tests/result/${attemptId}`, { replace: true });
  }, [attemptId, flushNow, navigate]);

  const timeLeft = useAttemptTimer(serverSeconds, () => { void endTest('timeout'); });

  const { warning, dismissWarning, enterFullscreen, exitFullscreen } = useProctor(
    attemptId,
    state?.proctoring,
    state?.status === 'in_progress' && !submittedRef.current,
    () => { void endTest('proctor'); },
  );
  exitFullscreenRef.current = exitFullscreen;

  // Initial load / resume.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await getAttemptStateApi(attemptId);
        if (cancelled) return;
        setState(s);
        setQuestions(s.questions);
        setServerSeconds(s.secondsLeft);
        if (s.status !== 'in_progress') {
          submittedRef.current = true;
          navigate(`/placement/tests/result/${attemptId}`, { replace: true });
        }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'Could not load your test.');
      }
    })();
    return () => { cancelled = true; };
  }, [attemptId, navigate]);

  // Periodic resync keeps the clock honest and picks up coding grades that
  // landed while the candidate was working elsewhere in the paper.
  useEffect(() => {
    if (!state || state.status !== 'in_progress') return;
    const id = window.setInterval(async () => {
      try {
        const s = await getAttemptStateApi(attemptId);
        setServerSeconds(s.secondsLeft);
        if (s.status !== 'in_progress' && !submittedRef.current) {
          submittedRef.current = true;
          navigate(`/placement/tests/result/${attemptId}`, { replace: true });
        }
      } catch {
        // offline — the local countdown carries on until we reconnect
      }
    }, 30000);
    return () => window.clearInterval(id);
  }, [attemptId, navigate, state]);

  const sections = state?.sections ?? [];
  const question = questions[current];
  const activeSectionId = question?.sectionId;

  const sectionCounts = useMemo(() => {
    const counts: Record<string, { total: number; done: number }> = {};
    for (const q of questions) {
      const c = counts[q.sectionId] ?? { total: 0, done: 0 };
      c.total += 1;
      if (isAnswered(q)) c.done += 1;
      counts[q.sectionId] = c;
    }
    return counts;
  }, [questions]);

  const unanswered = questions.filter((q) => !isAnswered(q)).length;

  /** Applies a local edit and queues the autosave for it. */
  const updateQuestion = useCallback((patch: Partial<AttemptQuestion>, save = true) => {
    if (!question) return;
    const next: AttemptQuestion = { ...question, ...patch };
    setQuestions((qs) => qs.map((q) => (q.id === next.id ? next : q)));
    if (!save) return;

    const spent = Date.now() - questionEnteredAt.current;
    questionEnteredAt.current = Date.now();
    queue({
      attemptId,
      questionId: next.id,
      selectedOptionIds: next.selectedOptionIds,
      textAnswer: next.textAnswer,
      markedReview: next.markedReview,
      timeSpentMs: spent,
      clearAnswer: next.selectedOptionIds.length === 0 && next.textAnswer.trim() === '',
      // Coding drafts ride the same queue. The server stores them without
      // grading, so a candidate who switches question, refreshes or crashes
      // comes back to the code they had written rather than an empty editor.
      ...(next.kind === 'coding' ? { language: next.language, code: next.code } : {}),
    });
  }, [attemptId, queue, question]);

  const goTo = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    if (!state?.allowBacktrack && index < current) return;
    questionEnteredAt.current = Date.now();
    setCurrent(index);
  };

  if (loadError) {
    return (
      <div style={{ padding: 32 }}>
        <div className={styles.errorBox}>{loadError}</div>
        <button className={styles.ghostBtn} style={{ marginTop: 14 }} onClick={() => navigate('/placement?tab=tests')}>
          Back to tests
        </button>
      </div>
    );
  }

  if (!state || !question) {
    return <div style={{ padding: 40, color: 'var(--text-secondary)' }}>Loading your test…</div>;
  }

  const danger = timeLeft <= 120;

  return (
    <div className={styles.player}>
      {warning ? (
        <div className={styles.warningBanner}>
          <span>⚠ {warning}</span>
          <button className={styles.warningClose} onClick={dismissWarning}>×</button>
        </div>
      ) : null}

      <header className={styles.playerHeader}>
        <span className={styles.playerTitle}>{state.title}</span>

        <div className={styles.sectionTabs}>
          {sections.map((s) => {
            const counts = sectionCounts[s.id];
            const firstIndex = questions.findIndex((q) => q.sectionId === s.id);
            return (
              <button
                key={s.id}
                className={`${styles.sectionTab} ${s.id === activeSectionId ? styles.sectionTabActive : ''}`}
                onClick={() => firstIndex >= 0 && goTo(firstIndex)}
              >
                {s.title}
                {counts ? ` ${counts.done}/${counts.total}` : ''}
              </button>
            );
          })}
        </div>

        <span className={styles.saveStatus + (saveStatus === 'offline' ? ' ' + styles.saveStatusOffline : '')}>
          {saveStatus === 'saving' ? 'Saving…' : saveStatus === 'offline' ? 'Reconnecting…' : 'Saved'}
        </span>

        <span className={`${styles.timer} ${danger ? styles.timerDanger : ''}`}>
          {formatDuration(timeLeft)}
        </span>

        <button className={styles.primaryBtn} onClick={() => setConfirming(true)} disabled={ending}>
          Submit test
        </button>
      </header>

      <div className={styles.playerBody}>
        <main className={styles.questionPane} onClick={enterFullscreen}>
          {question.kind === 'coding' ? (
            <CodingQuestionView
              attemptId={attemptId}
              question={question}
              index={current}
              total={questions.length}
              onSubmitted={(submissionId, language, code) =>
                updateQuestion({ submissionId, language, code, gradingStatus: 'pending' }, false)}
              onDraft={(language, code) => updateQuestion({ language, code })}
              onSecondsLeft={setServerSeconds}
            />
          ) : (
            <McqQuestionView
              question={question}
              index={current}
              total={questions.length}
              onSelect={(selectedOptionIds) => updateQuestion({ selectedOptionIds })}
              onText={(textAnswer) => updateQuestion({ textAnswer })}
            />
          )}
        </main>

        <aside className={styles.palettePane}>
          <QuestionPalette
            questions={questions}
            currentIndex={current}
            onJump={goTo}
            allowBacktrack={state.allowBacktrack}
          />
        </aside>
      </div>

      <footer className={styles.playerFooter}>
        <button
          className={styles.ghostBtn}
          onClick={() => goTo(current - 1)}
          disabled={current === 0 || !state.allowBacktrack}
        >
          Previous
        </button>
        <button
          className={styles.ghostBtn}
          onClick={() => updateQuestion({ markedReview: !question.markedReview })}
        >
          {question.markedReview ? 'Unmark review' : 'Mark for review'}
        </button>
        <div className={styles.spacer} />
        <button
          className={styles.primaryBtn}
          onClick={() => goTo(current + 1)}
          disabled={current === questions.length - 1}
        >
          Next
        </button>
      </footer>

      {confirming ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Submit your test?</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>
              {unanswered > 0
                ? `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. `
                : 'All questions are answered. '}
              You cannot return to the test after submitting.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.ghostBtn} onClick={() => setConfirming(false)} disabled={ending}>
                Keep working
              </button>
              <button className={styles.primaryBtn} onClick={() => void endTest('user')} disabled={ending}>
                {ending ? 'Submitting…' : 'Submit now'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TestPlayer;
