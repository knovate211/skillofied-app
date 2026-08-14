import React from 'react';
import CodeSnippet from '../../common/CodeSnippet';
import LessonLayout, { LessonCallout, LessonSidePanel } from './LessonLayout';
import { renderLessonTheory, lessonBadge } from './lessonTheory';
import styles from './StandardLessonView.module.css';

/**
 * The lesson shape shared by the Java, Go, GenAI, Full-Stack, and Testing course
 * data files. Optional everywhere the older courses never filled a field in.
 */
export interface StandardLesson {
  id: string;
  title: string;
  objectives?: string[];
  theory: string;
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways?: string[];
  callout?: LessonCallout;
  sidePanel?: LessonSidePanel;
}

interface Props {
  lesson: StandardLesson;
  /** Syntax-highlighting language for this course's snippets. */
  language: string;
  /** Filename shown in the CodeSnippet chrome, e.g. "main.go". */
  snippetTitle?: string;
}

/**
 * Renders a data-driven lesson through the shared LessonLayout template, with
 * the syntax / worked-example / mistakes blocks slotted between the objectives
 * and the takeaways.
 */
const StandardLessonView: React.FC<Props> = ({ lesson, language, snippetTitle }) => (
  <LessonLayout
    badge={lessonBadge(lesson.id)}
    title={lesson.title}
    theory={renderLessonTheory(lesson.theory, language, snippetTitle ?? 'Code Block')}
    callout={lesson.callout}
    objectives={lesson.objectives ?? []}
    takeaways={lesson.takeaways ?? []}
    sidePanel={lesson.sidePanel}
  >
    {lesson.syntax && (
      <>
        <h3 className={styles.heading}>Syntax Breakdown</h3>
        <CodeSnippet title="Syntax Definition" code={lesson.syntax} language={language} isRunnable={false} />
      </>
    )}

    {lesson.codeExample && (
      <>
        <h3 className={styles.heading}>Worked Example</h3>
        <CodeSnippet
          title={snippetTitle ?? 'Example'}
          code={lesson.codeExample}
          language={language}
          isRunnable={false}
        />
        {lesson.codeOutput && (
          <>
            <div className={styles.outputLabel}>Output</div>
            <pre className={styles.output}>
              <code>{lesson.codeOutput}</code>
            </pre>
          </>
        )}
      </>
    )}

    {lesson.mistakes && lesson.mistakes.length > 0 && (
      <>
        <h3 className={styles.heading}>Common Mistakes</h3>
        <ul className={styles.mistakes}>
          {lesson.mistakes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </>
    )}
  </LessonLayout>
);

export default StandardLessonView;
