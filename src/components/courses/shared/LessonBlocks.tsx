import React from 'react';
import CodeSnippet from '../../common/CodeSnippet';
import { LESSON_DIAGRAMS } from './diagrams';
import styles from './LessonBlocks.module.css';

/** A rendered result grid — the shape shared by `dataset` and `queryResult`. */
interface GridShape {
  headers: string[];
  rows: string[][];
  /** Zero-based row indexes to tint, e.g. the rows a WHERE clause keeps. */
  highlightRows?: number[];
  /** Zero-based column indexes to tint, e.g. the join key. */
  highlightCols?: number[];
}

/**
 * Union of the block shapes used by the block-authored courses (SQL uses
 * text/code/alert; the marketing courses add heading/list/example/table).
 * Loosely typed on purpose so both content models can flow through unchanged.
 */
export type LessonBlock =
  | { type: 'text'; value: string }
  | { type: 'heading'; value: string }
  | { type: 'code'; value: string; language?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'alert'; value: string }
  | { type: 'warning'; value: string }
  | { type: 'example'; title: string; value: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  /** A stored table the lesson reasons about, drawn as a database grid. */
  | ({ type: 'dataset'; name: string; caption?: string } & GridShape)
  /** A query paired with the rows it returns — SQL's core "run this, get that". */
  | ({ type: 'queryResult'; query: string; caption?: string; note?: string } & GridShape)
  /** Side-by-side cards, e.g. SQL vs NoSQL or WHERE vs HAVING. */
  | {
      type: 'compare';
      columns: { title: string; subtitle?: string; tone?: 'rose' | 'olive' | 'honey'; items: string[] }[];
    }
  /** An ordered pipeline, e.g. the clause evaluation order. */
  | { type: 'steps'; title?: string; steps: { label: string; text?: string }[] }
  /** A keyed SVG from LESSON_DIAGRAMS, drawn inline in the prose. */
  | { type: 'diagram'; name: string; caption?: string }
  /** A syntax skeleton with each clause annotated. */
  | { type: 'syntax'; title?: string; parts: { clause: string; text: string }[] };

interface Props {
  blocks: LessonBlock[];
  /** Fallback highlighting language for code blocks that do not name one. */
  defaultLanguage?: string;
  /** Heading shown above an `alert` block. */
  alertLabel?: string;
}

const TONE_CLASS = {
  rose: styles.toneRose,
  olive: styles.toneOlive,
  honey: styles.toneHoney,
} as const;

/** Shared renderer for `dataset` and `queryResult` grids. */
const Grid: React.FC<GridShape> = ({ headers, rows, highlightRows = [], highlightCols = [] }) => (
  <div className={styles.gridScroll}>
    <table className={styles.grid}>
      <thead>
        <tr>
          <th className={styles.gridRowNum} aria-hidden="true" />
          {headers.map((h, i) => (
            <th key={h} className={highlightCols.includes(i) ? styles.gridColMark : undefined}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={highlightRows.includes(ri) ? styles.gridRowMark : undefined}>
            <td className={styles.gridRowNum}>{ri + 1}</td>
            {row.map((cell, ci) => (
              <td key={ci} className={highlightCols.includes(ci) ? styles.gridColMark : undefined}>
                {cell === '' ? <span className={styles.gridNull}>NULL</span> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Renders block-authored lesson bodies into the prose slot of LessonLayout,
 * matching the typography the theory-string courses get from `.theory`.
 */
const LessonBlocks: React.FC<Props> = ({ blocks, defaultLanguage = 'sql', alertLabel = 'Note' }) => (
  <>
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'heading':
          return (
            <h3 key={i} className={styles.heading}>
              {block.value}
            </h3>
          );

        case 'text':
          return (
            <p key={i} className={styles.text}>
              {block.value}
            </p>
          );

        case 'code':
          return (
            <div key={i} className={styles.code}>
              <CodeSnippet language={block.language || defaultLanguage} code={block.value} isRunnable={false} />
            </div>
          );

        case 'list': {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag key={i} className={styles.list}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </Tag>
          );
        }

        case 'alert':
          return (
            <div key={i} className={styles.alert}>
              <span className={styles.alertIcon} aria-hidden="true">i</span>
              <div>
                <strong className={styles.alertLabel}>{alertLabel}</strong>
                <p className={styles.alertText}>{block.value}</p>
              </div>
            </div>
          );

        case 'warning':
          return (
            <div key={i} className={`${styles.alert} ${styles.warning}`}>
              <span className={`${styles.alertIcon} ${styles.warningIcon}`} aria-hidden="true">!</span>
              <div>
                <strong className={styles.alertLabel}>Common mistake</strong>
                <p className={styles.alertText}>{block.value}</p>
              </div>
            </div>
          );

        case 'example':
          return (
            <div key={i} className={styles.example}>
              <h4 className={styles.exampleTitle}>{block.title}</h4>
              <p className={styles.exampleText}>{block.value}</p>
            </div>
          );

        case 'table':
          return (
            <div key={i} className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {block.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case 'dataset':
          return (
            <figure key={i} className={styles.dataset}>
              <figcaption className={styles.datasetHead}>
                <span className={styles.datasetIcon} aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="3.4" rx="6" ry="2.4" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M2 3.4v9.2c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V3.4" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M2 8c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <code className={styles.datasetName}>{block.name}</code>
                {block.caption && <span className={styles.datasetCaption}>{block.caption}</span>}
              </figcaption>
              <Grid
                headers={block.headers}
                rows={block.rows}
                highlightRows={block.highlightRows}
                highlightCols={block.highlightCols}
              />
            </figure>
          );

        case 'queryResult':
          return (
            <div key={i} className={styles.qr}>
              <CodeSnippet language="sql" code={block.query} isRunnable={false} />
              <div className={styles.qrArrow} aria-hidden="true">
                <span className={styles.qrArrowLine} />
                <span className={styles.qrArrowLabel}>returns</span>
                <span className={styles.qrArrowLine} />
              </div>
              <figure className={styles.qrResult}>
                <figcaption className={styles.qrResultHead}>
                  <span className={styles.qrBadge}>Result</span>
                  <span className={styles.qrRowCount}>
                    {block.rows.length} {block.rows.length === 1 ? 'row' : 'rows'}
                  </span>
                  {block.caption && <span className={styles.datasetCaption}>{block.caption}</span>}
                </figcaption>
                <Grid
                  headers={block.headers}
                  rows={block.rows}
                  highlightRows={block.highlightRows}
                  highlightCols={block.highlightCols}
                />
              </figure>
              {block.note && <p className={styles.qrNote}>{block.note}</p>}
            </div>
          );

        case 'compare':
          return (
            <div key={i} className={styles.compare}>
              {block.columns.map((col, ci) => (
                <div key={ci} className={`${styles.compareCard} ${TONE_CLASS[col.tone ?? 'olive']}`}>
                  <h4 className={styles.compareTitle}>{col.title}</h4>
                  {col.subtitle && <p className={styles.compareSubtitle}>{col.subtitle}</p>}
                  <ul className={styles.compareList}>
                    {col.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );

        case 'steps':
          return (
            <div key={i} className={styles.steps}>
              {block.title && <h4 className={styles.stepsTitle}>{block.title}</h4>}
              <ol className={styles.stepsList}>
                {block.steps.map((step, si) => (
                  <li key={si} className={styles.step}>
                    <span className={styles.stepNum}>{si + 1}</span>
                    <span className={styles.stepBody}>
                      <code className={styles.stepLabel}>{step.label}</code>
                      {step.text && <span className={styles.stepText}>{step.text}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );

        case 'diagram': {
          const Diagram = LESSON_DIAGRAMS[block.name];
          if (!Diagram) return null;
          return (
            <figure key={i} className={styles.diagram}>
              <Diagram />
              {block.caption && <figcaption className={styles.diagramCaption}>{block.caption}</figcaption>}
            </figure>
          );
        }

        case 'syntax':
          return (
            <div key={i} className={styles.syntax}>
              {block.title && <h4 className={styles.syntaxTitle}>{block.title}</h4>}
              <ul className={styles.syntaxList}>
                {block.parts.map((part, pi) => (
                  <li key={pi} className={styles.syntaxRow}>
                    <code className={styles.syntaxClause}>{part.clause}</code>
                    <span className={styles.syntaxText}>{part.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          );

        default:
          return null;
      }
    })}
  </>
);

export default LessonBlocks;
