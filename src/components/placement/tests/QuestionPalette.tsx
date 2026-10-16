import React from 'react';
import { AttemptQuestion, AttemptSection } from '../../../api';
import styles from './Tests.module.css';

interface Props {
  questions: AttemptQuestion[];
  sections: AttemptSection[];
  currentIndex: number;
  onJump: (index: number) => void;
  /** No-backtrack tests disable jumping to an earlier question. */
  allowBacktrack: boolean;
  /** Sequential tests disable jumping past the first unanswered question. */
  lockForward: boolean;
  /** Index of the first unanswered question — the forward edge of the paper. */
  frontier: number;
}

/** True when the candidate has committed something for this question. */
export function isAnswered(q: AttemptQuestion): boolean {
  if (q.kind === 'coding') return !!q.submissionId;
  if (q.mcqKind === 'numeric' || q.kind === 'descriptive') return q.textAnswer.trim().length > 0;
  return q.selectedOptionIds.length > 0;
}

const KIND_LABEL: Record<string, string> = {
  mcq: 'Multiple choice',
  coding: 'Coding',
  descriptive: 'Written',
};

const QuestionPalette: React.FC<Props> = ({
  questions, sections, currentIndex, onJump, allowBacktrack, lockForward, frontier,
}) => {
  const answered = questions.filter(isAnswered).length;
  const flagged = questions.filter((q) => q.markedReview).length;

  // Sections in paper order, each with the questions that belong to it. A
  // question whose section is missing from the list would otherwise vanish from
  // the palette, so anything unclaimed is collected into a trailing group.
  const groups = sections
    .map((s) => ({
      section: s,
      items: questions
        .map((q, i) => ({ q, i }))
        .filter(({ q }) => q.sectionId === s.id),
    }))
    .filter((g) => g.items.length > 0);

  const grouped = new Set(groups.flatMap((g) => g.items.map(({ i }) => i)));
  const orphans = questions.map((q, i) => ({ q, i })).filter(({ i }) => !grouped.has(i));
  if (orphans.length > 0) {
    groups.push({ section: { id: '', title: 'Questions', kind: 'mcq', orderIndex: 0, durationMinutes: 0 }, items: orphans });
  }

  return (
    <div>
      {groups.map((g) => {
        const done = g.items.filter(({ q }) => isAnswered(q)).length;
        return (
          <div key={g.section.id || 'other'} className={styles.paletteSection}>
            <p className={styles.paletteTitle}>
              {g.section.title}
              <span className={styles.paletteSectionMeta}>
                {KIND_LABEL[g.section.kind] ?? g.section.kind} · {done}/{g.items.length}
              </span>
            </p>
            <div className={styles.paletteGrid}>
              {g.items.map(({ q, i }) => {
                const behind = !allowBacktrack && i < currentIndex;
                const ahead = lockForward && i > frontier;
                const locked = behind || ahead;
                const cls = [
                  styles.paletteCell,
                  isAnswered(q) ? styles.paletteAnswered : '',
                  q.markedReview ? styles.paletteReview : '',
                  i === currentIndex ? styles.paletteCurrent : '',
                ].filter(Boolean).join(' ');

                return (
                  <button
                    key={q.id}
                    className={cls}
                    onClick={() => onJump(i)}
                    disabled={locked}
                    title={
                      behind
                        ? 'This test does not allow going back'
                        : ahead
                          ? `Answer question ${frontier + 1} to unlock this one`
                          : `Question ${i + 1}`
                    }
                    style={locked ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
                  >
                    {ahead ? '🔒' : i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={styles.legendDot} style={{ background: '#22c55e' }} />
          Answered · {answered}
        </div>
        <div className={styles.legendRow}>
          <span className={styles.legendDot} style={{ background: '#a855f7' }} />
          Marked for review · {flagged}
        </div>
        <div className={styles.legendRow}>
          <span className={styles.legendDot} style={{ background: '#1f2235' }} />
          Not answered · {questions.length - answered}
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
