import React from 'react';
import CodeSnippet from '../../common/CodeSnippet';
import styles from './LessonLayout.module.css';

/**
 * Shared prose renderer for lesson theory strings.
 *
 * Understands the light markdown the course data files use: ``` fences,
 * **bold**, `inline code`, and dash/number-prefixed list lines. Typography is
 * left to LessonLayout's `.theory` rules so every course reads the same.
 *
 * @param defaultLanguage syntax-highlighting language for unlabelled fences
 * @param snippetTitle    filename shown in the CodeSnippet chrome
 */
export const renderLessonTheory = (
  text: string,
  defaultLanguage = 'code',
  snippetTitle = 'Code Block',
): React.ReactNode => {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('```')) {
      const lines = part.split('\n');
      const language = lines[0].replace('```', '').trim() || defaultLanguage;
      const code = lines.slice(1, -1).join('\n');
      return (
        <CodeSnippet key={idx} title={snippetTitle} code={code} language={language} isRunnable={false} />
      );
    }

    return part.split('\n').map((para, pIdx) => {
      if (!para.trim()) return null;

      const inlineParts = para.split(/(\*\*.*?\*\*|`.*?`)/g);
      const parsedElements = inlineParts.map((inlinePart, iIdx) => {
        if (inlinePart.startsWith('**') && inlinePart.endsWith('**')) {
          return <strong key={iIdx}>{inlinePart.slice(2, -2)}</strong>;
        }
        if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
          return <code key={iIdx}>{inlinePart.slice(1, -1)}</code>;
        }
        return inlinePart;
      });

      const isListItem = /^\d+\.\s/.test(para) || para.trim().startsWith('-') || para.trim().startsWith('*');
      if (isListItem) {
        return (
          <div key={`${idx}-${pIdx}`} className={styles.theoryListItem}>
            {parsedElements}
          </div>
        );
      }

      return <p key={`${idx}-${pIdx}`}>{parsedElements}</p>;
    });
  });
};

/**
 * "Module 3 • Lesson 5" from a lesson id. Every course numbers its lessons
 * `[prefix-]m<module>-l<lesson>`, so one pattern covers them all; anything else
 * simply gets no badge rather than a wrong one.
 */
export const lessonBadge = (lessonId: string | undefined): string | undefined => {
  const match = lessonId ? /m(\d+)-l(\d+)$/.exec(lessonId) : null;
  return match ? `Module ${match[1]} • Lesson ${match[2]}` : undefined;
};
