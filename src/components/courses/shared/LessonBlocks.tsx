import React from 'react';
import CodeSnippet from '../../common/CodeSnippet';
import styles from './LessonBlocks.module.css';

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
  | { type: 'example'; title: string; value: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface Props {
  blocks: LessonBlock[];
  /** Fallback highlighting language for code blocks that do not name one. */
  defaultLanguage?: string;
  /** Heading shown above an `alert` block. */
  alertLabel?: string;
}

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

        default:
          return null;
      }
    })}
  </>
);

export default LessonBlocks;
