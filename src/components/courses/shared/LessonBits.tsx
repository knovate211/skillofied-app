import React from 'react';
import styles from './LessonBlocks.module.css';

/**
 * JSX-authored counterparts to the block types in LessonBlocks.
 *
 * The SQL course is authored as data, so it renders through LessonBlocks. The
 * Frontend course is authored directly as JSX with interactive widgets inline,
 * which data cannot express. These components give it the same visual language
 * — and the same stylesheet — without converting the whole course to data.
 */

/** "In plain English" — the jargon-free restatement that follows a definition. */
export const PlainEnglish: React.FC<{ children: React.ReactNode; label?: string }> = ({
  children,
  label = 'In plain English',
}) => (
  <div className={styles.alert}>
    <span className={styles.alertIcon} aria-hidden="true">i</span>
    <div>
      <strong className={styles.alertLabel}>{label}</strong>
      <p className={styles.alertText}>{children}</p>
    </div>
  </div>
);

/** A concrete real-world comparison, for a concept that has no everyday shape. */
export const Analogy: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title = 'Think of it like this',
}) => (
  <div className={styles.example}>
    <h4 className={styles.exampleTitle}>{title}</h4>
    <p className={styles.exampleText}>{children}</p>
  </div>
);

/** The mistake learners actually make, stated before they make it. */
export const Pitfall: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title = 'Common mistake',
}) => (
  <div className={`${styles.alert} ${styles.warning}`}>
    <span className={`${styles.alertIcon} ${styles.warningIcon}`} aria-hidden="true">!</span>
    <div>
      <strong className={styles.alertLabel}>{title}</strong>
      <p className={styles.alertText}>{children}</p>
    </div>
  </div>
);

const TONE = { rose: styles.toneRose, olive: styles.toneOlive, honey: styles.toneHoney } as const;

/** Side-by-side cards — "this vs that", where the contrast is the lesson. */
export const Compare: React.FC<{
  columns: { title: string; subtitle?: string; tone?: keyof typeof TONE; items: React.ReactNode[] }[];
}> = ({ columns }) => (
  <div className={styles.compare}>
    {columns.map((col, i) => (
      <div key={i} className={`${styles.compareCard} ${TONE[col.tone ?? 'olive']}`}>
        <h4 className={styles.compareTitle}>{col.title}</h4>
        {col.subtitle && <p className={styles.compareSubtitle}>{col.subtitle}</p>}
        <ul className={styles.compareList}>
          {col.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

/** An ordered walkthrough — what happens, in the order it happens. */
export const Steps: React.FC<{
  title?: string;
  steps: { label: string; text?: React.ReactNode }[];
}> = ({ title, steps }) => (
  <div className={styles.steps}>
    {title && <h4 className={styles.stepsTitle}>{title}</h4>}
    <ol className={styles.stepsList}>
      {steps.map((s, i) => (
        <li key={i} className={styles.step}>
          <span className={styles.stepNum}>{i + 1}</span>
          <span className={styles.stepBody}>
            <code className={styles.stepLabel}>{s.label}</code>
            {s.text && <span className={styles.stepText}>{s.text}</span>}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

/** An annotated skeleton: each part of a syntax form, named and explained. */
export const Anatomy: React.FC<{ title?: string; parts: { part: string; text: React.ReactNode }[] }> = ({
  title,
  parts,
}) => (
  <div className={styles.syntax}>
    {title && <h4 className={styles.syntaxTitle}>{title}</h4>}
    <ul className={styles.syntaxList}>
      {parts.map((p, i) => (
        <li key={i} className={styles.syntaxRow}>
          <code className={styles.syntaxClause}>{p.part}</code>
          <span className={styles.syntaxText}>{p.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** What the code above actually prints or shows — stated, not left to guess. */
export const Result: React.FC<{ children: React.ReactNode; label?: string }> = ({
  children,
  label = 'What you see',
}) => (
  <figure className={styles.qrResult} style={{ marginBottom: 22 }}>
    <figcaption className={styles.qrResultHead}>
      <span className={styles.qrBadge}>{label}</span>
    </figcaption>
    <div style={{ padding: '12px 14px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
      {children}
    </div>
  </figure>
);
