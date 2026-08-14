import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../../../types';
import { submitQuizApi, QuizQuestionResult } from '../../../api';
import { getQuizAttemptsCached, invalidateQuizAttempts } from './quizAttemptsCache';
import styles from './ModuleQuiz.module.css';

interface ModuleQuizProps {
  /**
   * Course-namespaced module id, e.g. "java-m1", "sql-m4", "frontend-m9".
   * All three courses number their modules from m1, so the course prefix is
   * what keeps their answer keys distinct on the server.
   */
  moduleId: string;
  title?: string;
  questions: QuizQuestion[];
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Module-end quiz, presented one question at a time.
 *
 * Grading happens on the server: answers are sent to the API and the score
 * comes back. The client never holds the answer key, so answers cannot be read
 * out of the bundle or spoofed, and the score is persisted against the
 * learner's account rather than living only in component state.
 */
const ModuleQuiz: React.FC<ModuleQuizProps> = ({ moduleId, title = 'Module Quiz', questions }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [score, setScore] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [results, setResults] = useState<Record<number, QuizQuestionResult>>({});
  const submitted = score !== null;

  const [previousBest, setPreviousBest] = useState<{ score: number; total: number; at: string } | null>(null);

  // Paging state. `reviewing` lets a graded learner step back through the
  // questions instead of sitting on the summary card.
  const [current, setCurrent] = useState(0);
  const [reviewing, setReviewing] = useState(false);

  const moduleNumber = /m(\d+)$/.exec(moduleId)?.[1];

  // ─── Load any previous attempt for this module ────────────────────────────
  useEffect(() => {
    let cancelled = false;

    getQuizAttemptsCached()
      .then((attempts) => {
        if (cancelled) return;
        const prior = attempts.find((a) => a.moduleId === moduleId);
        if (prior) {
          setPreviousBest({ score: prior.score, total: prior.totalQuestions, at: prior.completedAt });
          if (prior.selectedAnswers) {
            try {
              // Convert parsed integer keys if necessary
              const parsed = JSON.parse(prior.selectedAnswers);
              const mapped: Record<number, string> = {};
              Object.entries(parsed).forEach(([k, v]) => {
                mapped[Number(k)] = String(v);
              });
              setAnswers(mapped);
              // Also show the quiz in submitted/graded state so correct/incorrect options highlight
              setScore(prior.score);
              setTotal(prior.totalQuestions);
            } catch (e) {
              console.error('Failed to parse previous quiz answers:', e);
            }
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load quiz attempts:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const handleSelect = (questionId: number, option: string) => {
    if (submitted || submitting) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] ?? '',
      }));

      const result = await submitQuizApi(moduleId, payload);

      setScore(result.score);
      setTotal(result.totalQuestions);
      setResults(Object.fromEntries(result.results.map((r) => [r.questionId, r])));
      setReviewing(false);

      // The stored best score may have changed.
      invalidateQuizAttempts();
    } catch (err) {
      setError(
        err instanceof Error
          ? `Could not submit your quiz: ${err.message}`
          : 'Could not submit your quiz. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setScore(null);
    setTotal(null);
    setResults({});
    setError(null);
    setCurrent(0);
    setReviewing(false);
  };

  const goTo = (index: number) => setCurrent(index);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  if (questions.length === 0) {
    return <div className={styles.wrap}>Quiz questions are being prepared.</div>;
  }

  const optionClass = (question: QuizQuestion, option: string): string => {
    const selected = answers[question.id];

    if (!submitted) {
      return selected === option ? `${styles.option} ${styles.selected}` : styles.option;
    }

    // After grading, the server's result metadata is the source of truth; on a
    // restored attempt it is absent, so fall back to the authoring-time key
    // (which is stripped from production builds and simply reads undefined).
    const correctAns = results[question.id]?.correctAnswer || question.correctAnswer;
    if (correctAns && option === correctAns) return `${styles.option} ${styles.correct}`;
    if (selected === option) return `${styles.option} ${styles.incorrect}`;
    return styles.option;
  };

  const header = (
    <>
      {moduleNumber && <span className={styles.badge}>Module {moduleNumber}</span>}
      <h2 className={styles.title}>{title} 📋</h2>
      <p className={styles.subtitle}>Test your understanding of the concepts covered in this module.</p>
    </>
  );

  // ─── Result summary ───────────────────────────────────────────────────────
  if (submitted && !reviewing) {
    const perfect = score === total;

    return (
      <div className={styles.wrap}>
        {header}

        <div className={styles.result}>
          <p className={styles.resultScore}>
            {score}
            <span className={styles.resultOutOf}> / {total}</span>
          </p>
          <p className={styles.resultNote}>
            {perfect ? '🎉 Perfect score — every question correct.' : '👍 Review the lessons and try again to improve.'}
          </p>
          {previousBest && (
            <p className={styles.resultMeta}>
              Best: {previousBest.score} / {previousBest.total}
              {previousBest.at ? ` on ${new Date(previousBest.at).toLocaleDateString()}` : ''}
            </p>
          )}
          <div className={styles.resultActions}>
            <button
              className={styles.btn}
              onClick={() => {
                setReviewing(true);
                goTo(0);
              }}
            >
              Review answers
            </button>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleRetry}>
              Retry quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Paged question ───────────────────────────────────────────────────────
  const question = questions[current];
  const isLast = current === questions.length - 1;

  return (
    <div className={styles.wrap}>
      {header}

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <span className={styles.progressPill}>
            Question {current + 1} of {questions.length}
          </span>
          <span className={styles.markPill}>1 Mark</span>
        </div>

        <h3 className={styles.question}>{question.question}</h3>
        <p className={styles.lead}>
          {reviewing
            ? 'Your answer is marked below against the correct one.'
            : 'Select the correct option and click “Next” to continue.'}
        </p>

        <div className={styles.options} role="radiogroup" aria-label={question.question}>
          {question.options.map((opt, i) => {
            const isSelected = answers[question.id] === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={optionClass(question, opt)}
                onClick={() => handleSelect(question.id, opt)}
                disabled={submitted || submitting}
              >
                <span className={styles.radio}>{isSelected && <span className={styles.radioDot} />}</span>
                <span className={styles.letter}>{LETTERS[i] ?? i + 1}</span>
                <span className={styles.optionText}>{opt}</span>
              </button>
            );
          })}
        </div>

      </div>

      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}

      <div className={styles.nav}>
        <button className={styles.btn} onClick={() => goTo(current - 1)} disabled={current === 0}>
          ← Previous
        </button>

        {!submitted && !allAnswered && (
          <span className={styles.navNote}>
            {answeredCount} of {questions.length} answered
          </span>
        )}

        {reviewing && isLast ? (
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setReviewing(false)}>
            Back to results
          </button>
        ) : isLast && !submitted ? (
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? 'Submitting…' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => goTo(current + 1)}
            disabled={isLast}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default ModuleQuiz;
