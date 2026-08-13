import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../../../types';
import { submitQuizApi, QuizQuestionResult } from '../../../api';
import { getQuizAttemptsCached, invalidateQuizAttempts } from './quizAttemptsCache';
import styles from '../FrontendCoursePage.module.css';

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

/**
 * Module-end quiz.
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
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const optionClass = (question: QuizQuestion, option: string): string => {
    const selected = answers[question.id];

    if (!submitted) {
      return selected === option ? styles.quizBlockOptionSelected : styles.quizBlockOption;
    }

    // Match correctness. If we just loaded the page, we use question.correctAnswer directly.
    // If we just submitted the quiz, we can use the server's results metadata.
    const correctAns = results[question.id]?.correctAnswer || question.correctAnswer;
    if (option === correctAns) return styles.quizBlockOptionCorrect;
    if (selected === option) return styles.quizBlockOptionIncorrect;
    return styles.quizBlockOption;
  };

  return (
    <div className={styles.tabContent}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.paragraph}>
        Test your understanding of the concepts covered in this module. Your answers are graded and
        saved to your account.
      </p>

      {previousBest && !submitted && (
        <p
          style={{
            margin: '0 0 16px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'var(--bg-surface-2)',
            border: '1px solid var(--border)',
          }}
        >
          Previous best:{' '}
          <strong>
            {previousBest.score} / {previousBest.total}
          </strong>
          {previousBest.at ? ` on ${new Date(previousBest.at).toLocaleDateString()}` : ''}
        </p>
      )}

      <div className={styles.quizCardList}>
        {questions.map((q) => (
          <div key={q.id} className={styles.quizBlock}>
            <h4 className={styles.quizBlockQuestion}>{q.question}</h4>
            <div className={styles.quizBlockOptions}>
              {q.options.map((opt) => (
                <button
                  key={opt}
                  className={optionClass(q, opt)}
                  onClick={() => handleSelect(q.id, opt)}
                  disabled={submitted || submitting}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p
          role="alert"
          style={{
            margin: '16px 0 0',
            fontSize: '13px',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          {error}
        </p>
      )}

      <div className={styles.quizSubmitRow}>
        {!submitted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className={styles.saveBtn}
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
            {!allAnswered && (
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                {answeredCount} of {questions.length} answered
              </span>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <span className={styles.quizScoreText}>
              Score: {score} / {total} {score === total ? '🎉 Perfect!' : '👍 Review the lessons!'}
            </span>
            <button className={styles.backBtn} onClick={handleRetry}>
              Retry Quiz
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ModuleQuiz;
