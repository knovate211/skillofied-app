import React, { useState, useEffect } from 'react';
import AssignmentIDE from './AssignmentIDE';
import { usePublishLessonFooter, useCourseHeader } from '../../../context/CourseHeaderContext';
import styles from '../FrontendCoursePage.module.css';
import { submitQuizApi } from '../../../api';
import { useToast } from '../../../context/ToastContext';
import { getQuizAttemptsCached, invalidateQuizAttempts } from './quizAttemptsCache';

/**
 * An assignment question is a coding task (answered in the embedded IDE) or an
 * MCQ. Every course's assignments are IDE tasks.
 *
 * `kind: 'text'` still exists for a genuinely written answer, but it has to be
 * asked for explicitly — a bare string is no longer accepted. Accepting one was
 * how whole courses ended up as textareas: any prompt added to a `questions`
 * array was silently coerced into a written question.
 */
export interface AssignmentCodeQuestion {
  kind: 'code';
  prompt: string;
  language: string;
  starterCode: string;
  /** Show a stdin box when the program is meant to read input. */
  stdin?: boolean;
  /**
   * Fixture passed to the runner as stdin. SQL questions need this: the runner
   * builds the tables from it, so without a fixture every query fails with
   * "relation does not exist". Supplying it also hides the stdin box, since
   * the learner should not have to hand-write the sample data.
   */
  fixture?: string;
  /**
   * Set false for languages the sandbox cannot execute (Dockerfile, shell).
   * The learner still gets a proper editor with syntax highlighting; the Run
   * button is hidden rather than offered and then failing.
   */
  runnable?: boolean;
  /** Examples of inputs/outputs for the task */
  examples?: { input: string; output: string; explanation?: string }[];
}

export interface AssignmentTextQuestion {
  kind: 'text';
  prompt: string;
}

export interface AssignmentMcqQuestion {
  kind: 'mcq';
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export type AssignmentQuestion = AssignmentTextQuestion | AssignmentCodeQuestion | AssignmentMcqQuestion;

interface ModuleAssignmentProps {
  moduleId?: string;
  title?: string;
  questions: AssignmentQuestion[];
}

/**
 * Module assignment, presented one task at a time.
 *
 * - Code tasks: rendered using the full Practice IDE (AssignmentIDE) — same
 *   Monaco editor, ConsolePanel and ProblemDescriptionPanel as SolveProblemPage.
 * - Text tasks: rendered as a simple textarea.
 *
 * Task navigation (prev/next + count) is published to CourseHeaderContext so
 * CoursePageShell can display it in the shared lessonBottomBar.
 *
 * Nothing is auto-graded — submissions go to a mentor for review.
 */
const ModuleAssignment: React.FC<ModuleAssignmentProps> = ({
  moduleId = 'unknown',
  title = 'Module Assignment',
  questions,
}) => {
  const items = questions;

  const [answers, setAnswers] = useState<string[]>(() =>
    items.map((q) => (q.kind === 'code' ? q.starterCode : ''))
  );
  const [index, setIndex] = useState(0);
  const [submittedTasks, setSubmittedTasks] = useState<boolean[]>(() => items.map(() => false));

  const [score, setScore] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [gradedQuestions, setGradedQuestions] = useState<boolean[]>(() => items.map((q) => q.kind !== 'mcq'));
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>(() => items.map(() => ''));
  const submitted = score !== null;
  const [isLoaded, setIsLoaded] = useState(false);

  // ─── Restore state from localStorage and database attempts cache ───────────
  useEffect(() => {
    let cancelled = false;

    // 1. Load in-progress state from localStorage first
    const localData = localStorage.getItem(`assignment-state-${moduleId}`);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (parsed.answers && parsed.gradedQuestions && parsed.submittedAnswers) {
          setAnswers(parsed.answers);
          setGradedQuestions(parsed.gradedQuestions);
          setSubmittedAnswers(parsed.submittedAnswers);
        }
      } catch (e) {
        console.error('Failed to restore assignment state from localStorage:', e);
      }
    }

    // 2. Load completed/graded attempts from database cache
    getQuizAttemptsCached()
      .then((attempts) => {
        if (cancelled) return;
        const prior = attempts.find((a) => a.moduleId === `${moduleId}-assignment`);
        if (prior) {
          setScore(prior.score);
          setTotal(prior.totalQuestions);
          setSubmittedTasks(items.map(() => true));
          if (prior.selectedAnswers) {
            try {
              const parsed = JSON.parse(prior.selectedAnswers);
              const restoredAnswers = items.map((_, idx) => parsed[idx + 1] || '');
              setAnswers(restoredAnswers);
              setSubmittedAnswers(restoredAnswers);
              setGradedQuestions(items.map(() => true));
            } catch (e) {
              console.error('Failed to parse previous server answers:', e);
            }
          }
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load assignment attempts:', err);
        setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  // ─── Save in-progress state to localStorage ──────────────────────────────
  useEffect(() => {
    if (isLoaded && moduleId && moduleId !== 'unknown') {
      const state = {
        answers,
        gradedQuestions,
        submittedAnswers,
      };
      localStorage.setItem(`assignment-state-${moduleId}`, JSON.stringify(state));
    }
  }, [answers, gradedQuestions, submittedAnswers, moduleId, isLoaded]);

  const { onAdvanceLesson } = useCourseHeader();
  const { showToast } = useToast();

  /** Every submit outcome surfaces as a toast — that is the only message channel. */
  const fail = (message: string) => showToast(message, 'error');

  const setAnswer = (value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const active = items[index];
  const answer = answers[index];
  const isLast = index === items.length - 1;
  const allSubmitted = submittedTasks.every(Boolean);

  const handleCheckAnswer = async () => {
    if (gradedQuestions[index]) return;

    // Mark current question as graded/checked
    setGradedQuestions((prev) => prev.map((v, i) => (i === index ? true : v)));
    setSubmittedAnswers((prev) => prev.map((v, i) => (i === index ? answers[index] : v)));

    if (!isLast) {
      const correct = active.kind === 'mcq' && answers[index] === active.correctAnswer;
      showToast(
        correct ? 'Correct answer.' : 'Answer checked — see the highlighted options.',
        correct ? 'success' : 'info'
      );
    }

    // If it is the last question, submit the full set to the backend database to store score
    if (isLast) {
      setSubmitting(true);
      try {
        const payload = items.map((_, idx) => ({
          questionId: idx + 1,
          answer: idx === index ? answers[index] : (submittedAnswers[idx] || answers[idx] || ''),
        })).filter((_, idx) => items[idx].kind === 'mcq');

        const result = await submitQuizApi(moduleId + '-assignment', payload);
        setScore(result.score);
        setTotal(result.totalQuestions);
        setSubmittedTasks(items.map(() => true));
        showToast(`Assignment submitted — you scored ${result.score}/${result.totalQuestions}.`, 'success');
      } catch (err) {
        fail(
          err instanceof Error
            ? `Could not save your assignment: ${err.message}`
            : 'Could not save your assignment. Please check your connection.'
        );
      } finally {
        setSubmitting(false);
      }
    }
  };

  /** Bottom-bar navigation only — leaves the lesson without recording anything. */
  const handleAdvanceLesson = () => {
    if (onAdvanceLesson) {
      onAdvanceLesson();
    }
  };

  /**
   * Submit the current code or written task: record the answer, mark the task
   * done, then move to the next task. On the last task this falls through to
   * the "all tasks submitted" screen rather than skipping to the next lesson —
   * navigating away is the bottom bar's job, not the submit button's.
   */
  const handleSubmitTask = async () => {
    const current = items[index];
    const value = (answers[index] ?? '').trim();

    if (!value) {
      fail('Write your answer before submitting.');
      return;
    }
    if (current.kind === 'code' && value === current.starterCode.trim()) {
      fail('This is still the starter code — make your changes before submitting.');
      return;
    }

    setSubmittedAnswers((prev) => prev.map((v, i) => (i === index ? answers[index] : v)));
    setSubmittedTasks((prev) => prev.map((v, i) => (i === index ? true : v)));

    if (!isLast) {
      showToast(`Task ${index + 1} submitted. Moving to task ${index + 2}.`, 'success');
      goTo(index + 1);
      return;
    }

    // Only MCQ tasks are auto-graded. An assignment with no MCQs has no answer
    // key on the server, so submitting would fail with "no quiz keys found".
    const mcqPayload = items
      .map((_, idx) => ({
        questionId: idx + 1,
        answer: idx === index ? answers[index] : (submittedAnswers[idx] || answers[idx] || ''),
      }))
      .filter((_, idx) => items[idx].kind === 'mcq');

    if (mcqPayload.length === 0) {
      showToast('Assignment submitted. A mentor will review your work.', 'success');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitQuizApi(moduleId + '-assignment', mcqPayload);
      setScore(result.score);
      setTotal(result.totalQuestions);
      showToast(`Assignment submitted — you scored ${result.score}/${result.totalQuestions}.`, 'success');
    } catch (err) {
      fail(
        err instanceof Error
          ? `Could not save your assignment: ${err.message}`
          : 'Could not save your assignment. Please check your connection.'
      );
      setSubmittedTasks((prev) => prev.map((v, i) => (i === index ? false : v)));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    localStorage.removeItem(`assignment-state-${moduleId}`);
    invalidateQuizAttempts();

    setAnswers(items.map((q) => (q.kind === 'code' ? q.starterCode : '')));
    setScore(null);
    setTotal(null);
    setIndex(0);
    setSubmittedTasks(items.map(() => false));
    setGradedQuestions(items.map((q) => q.kind !== 'mcq'));
    setSubmittedAnswers(items.map(() => ''));
    showToast('Assignment reset — your answers were cleared.', 'info');
  };

  const goTo = (next: number) => {
    setIndex(next);
  };

  const isMcq = active.kind === 'mcq';
  const canGoNext = !isMcq || gradedQuestions[index];

  // Publish task nav to the shared lessonBottomBar
  usePublishLessonFooter(
    allSubmitted && !submitted
      ? null
      : {
          label: `${index + 1} / ${items.length}`,
          onPrev: index === 0 ? undefined : () => goTo(index - 1),
          onNext: canGoNext
            ? (isLast ? handleAdvanceLesson : () => goTo(index + 1))
            : undefined,
          prevDisabled: index === 0 ? undefined : false,
          nextDisabled: !canGoNext,
          prevLabel: index === 0 ? '← Previous Lesson' : '← Previous Assignment',
          nextLabel: isLast ? 'Next Lesson →' : 'Next Assignment →',
        }
  );

  // ── All tasks done ───────────────────────────────────────────────────────────
  if (allSubmitted && !submitted) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.completeBadge} style={{ marginTop: '24px' }}>
          <span>
            ✓ All {items.length} task{items.length === 1 ? '' : 's'} submitted. A mentor will review
            your work shortly. 🎉
          </span>
        </div>
      </div>
    );
  }

  const submitLabel = isLast ? 'Submit assignment' : 'Submit & next task →';

  // ── MCQ task: options selection ──────────────────────────────────────────────
  if (active.kind === 'mcq') {
    const isGraded = gradedQuestions[index];
    const submittedAns = submittedAnswers[index];

    const isAnswerCorrect = (opt: string) => {
      if (!isGraded) return false;
      const correctAns = active.correctAnswer;
      return opt === correctAns;
    };

    const isAnswerIncorrect = (opt: string) => {
      if (!isGraded) return false;
      const correctAns = active.correctAnswer;
      return submittedAns === opt && opt !== correctAns;
    };

    const getOptionClass = (opt: string) => {
      if (isAnswerCorrect(opt)) return styles.quizBlockOptionCorrect;
      if (isAnswerIncorrect(opt)) return styles.quizBlockOptionIncorrect;
      if (answer === opt) return styles.quizBlockOptionSelected;
      return styles.quizBlockOption;
    };

    return (
      <div className={styles.tabContent}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px' }}>
            Task {index + 1} of {items.length} · MCQ
          </p>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-primary)', margin: '0 0 16px' }}>
            {active.prompt}
          </p>
          <div className={styles.quizBlockOptions} style={{ marginTop: '20px' }}>
            {active.options.map((opt) => (
              <button
                key={opt}
                className={getOptionClass(opt)}
                onClick={() => setAnswer(opt)}
                disabled={isGraded || submitting}
              >
                {opt}
              </button>
            ))}
          </div>
          {isGraded && (
            <p style={{ marginTop: '16px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              Your choice: <strong>{submittedAns || 'No answer'}</strong>
            </p>
          )}
          <div className={styles.assignmentFooter} style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
            {isLast && submitted ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span className={styles.quizScoreText}>
                  Score: {score} / {total} {score === total ? '🎉 Perfect!' : '👍 Keep learning!'}
                </span>
                <button className={styles.backBtn} onClick={handleRetry}>
                  Retry Assignment
                </button>
              </div>
            ) : (
              <>
                <button
                  className={styles.saveBtn}
                  onClick={handleCheckAnswer}
                  disabled={!answer || isGraded || submitting}
                  title={isGraded ? "Answer checked" : (isLast ? "Submit Assignment" : "Check Answer")}
                >
                  {submitting ? 'Submitting...' : (isGraded ? 'Checked ✓' : (isLast ? 'Submit Assignment' : 'Check Answer'))}
                </button>
                {isGraded && !isLast && (
                  <button
                    className={styles.saveBtn}
                    onClick={() => goTo(index + 1)}
                  >
                    Next Task →
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Code task: full Practice IDE ─────────────────────────────────────────────
  if (active.kind === 'code') {
    return (
      // Fill the card edge-to-edge — card padding is 0 for assignments
      <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
        <AssignmentIDE
          key={index}
          taskIndex={index + 1}
          taskTotal={items.length}
          language={active.language}
          starterCode={active.starterCode}
          value={answer}
          onChange={setAnswer}
          prompt={active.prompt}
          submitted={submittedTasks[index]}
          onSubmit={handleSubmitTask}
          runnable={active.runnable}
          fixture={active.fixture}
          examples={(active as any).examples}
        />
      </div>
    );
  }

  // ── Text task: simple textarea ───────────────────────────────────────────────
  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px' }}>
        Task {index + 1} of {items.length} · written
      </p>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-primary)', margin: '0 0 16px' }}>
        {active.prompt}
      </p>
      <textarea
        key={index}
        className={styles.assignmentTextArea}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className={styles.assignmentFooter}>
        <button
          className={styles.saveBtn}
          onClick={handleSubmitTask}
          title={submitLabel}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
};

export default ModuleAssignment;
