import React, { useEffect, useState } from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { SyllabusModule } from '../../../../types';
import { MarketingCourseContent } from './types';
import type { MarketingModuleLoader } from './loaders';
import LessonLayout from '../../shared/LessonLayout';
import LessonBlocks, { LessonBlock } from '../../shared/LessonBlocks';
import { lessonBadge } from '../../shared/lessonTheory';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  syllabus: SyllabusModule[];
  /** Fetches one module's content; see loaders.ts. */
  loaders: Record<string, MarketingModuleLoader>;
  moduleId: string;
  page: number;
}

const spinner = (
  <div className={styles.contentArea} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--accent)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
  </div>
);

/** Loads the open module's content, then renders the item. */
const MarketingModuleRenderer: React.FC<Props> = ({ syllabus, loaders, moduleId, page }) => {
  // Keyed by module so a stale response from the previous module is never shown.
  const [loaded, setLoaded] = useState<{ moduleId: string; content: MarketingCourseContent } | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const load = loaders[moduleId];

  useEffect(() => {
    if (!load) return;
    let cancelled = false;
    setLoadFailed(false);
    load()
      .then((content) => {
        if (!cancelled) setLoaded({ moduleId, content });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [load, moduleId, retry]);

  if (!load) {
    return <div className={styles.tabContent}>Item not found.</div>;
  }
  if (loaded?.moduleId !== moduleId) {
    if (!loadFailed) return spinner;
    return (
      <div className={styles.contentArea}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          This lesson couldn't be loaded. Check your connection and try again.
        </p>
        <button className={styles.lessonNavBtn} onClick={() => setRetry((n) => n + 1)}>Try again</button>
      </div>
    );
  }
  return <MarketingModuleView syllabus={syllabus} content={loaded.content} moduleId={moduleId} page={page} />;
};

interface ViewProps {
  syllabus: SyllabusModule[];
  content: MarketingCourseContent;
  moduleId: string;
  page: number;
}

const MarketingModuleView: React.FC<ViewProps> = ({ syllabus, content, moduleId, page }) => {
  const module = syllabus.find((m) => m.id === moduleId);
  const item = module?.items[page - 1];

  if (!item) {
    return <div className={styles.tabContent}>Item not found.</div>;
  }

  if (item.id.endsWith('-quiz')) {
    const questions = content.quizzes[item.id] ?? [];
    return (
      <ModuleQuiz
        // Fresh mount per module, so a previous quiz's answers do not persist.
        key={item.id}
        // Syllabus module ids already carry the course prefix ("seo-m1",
        // "dm-m1"), so they are unique across courses without further wrapping.
        moduleId={moduleId}
        title={module?.title ? `${module.title} — Quiz` : 'Module Quiz'}
        questions={questions}
      />
    );
  }

  if (item.id.endsWith('-assignment')) {
    const assignment = content.assignments[item.id];
    if (!assignment) {
      return <div className={styles.tabContent}>Assignment not found.</div>;
    }
    return <ModuleAssignment key={item.id} title={assignment.title} questions={assignment.questions} />;
  }

  const lesson = content.lessons[item.id];
  if (!lesson) {
    return (
      <div className={styles.tabContent}>
        <h2 className={styles.cardTitle}>{item.title}</h2>
        <p className={styles.paragraph}>
          This lesson is being written and will be published shortly.
        </p>
      </div>
    );
  }

  return (
    <LessonLayout
      badge={lessonBadge(item.id)}
      title={lesson.title}
      theory={<LessonBlocks blocks={lesson.content as LessonBlock[]} alertLabel="In practice" />}
      objectives={lesson.objective ? [lesson.objective] : []}
      takeaways={lesson.takeaways}
    />
  );
};

export default MarketingModuleRenderer;
