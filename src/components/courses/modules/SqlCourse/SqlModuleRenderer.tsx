import React, { useState, useEffect } from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import LessonLayout from '../../shared/LessonLayout';
import LessonBlocks, { LessonBlock } from '../../shared/LessonBlocks';
import { lessonBadge } from '../../shared/lessonTheory';
import { SYLLABUS } from '../../SqlCoursePage';
import { SyllabusModule } from '../../../../types';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  moduleId: string;
  page: number;
}

const SqlModuleRenderer: React.FC<Props> = ({ moduleId, page }) => {
  const [courseData, setCourseData] = useState<any>(null);
  // The open lesson's group of bodies, keyed by the item it was loaded for so a
  // stale response from a previous lesson is never shown.
  const [loaded, setLoaded] = useState<{ itemId: string; lessons: Record<string, any> } | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  const moduleItem = SYLLABUS.find((m: SyllabusModule) => m.id === moduleId);
  const itemId = moduleItem ? moduleItem.items[page - 1]?.id : '';
  const isLessonPage = !!itemId && !itemId.endsWith('-quiz') && !itemId.endsWith('-assignment');

  useEffect(() => {
    import('./SqlCourseData').then((module) => {
      setCourseData({
        sqlLessonFileFor: module.sqlLessonFileFor,
        sqlQuizzes: module.sqlQuizzes,
        sqlAssignments: module.sqlAssignments,
      });
    });
  }, []);

  useEffect(() => {
    if (!courseData || !isLessonPage) return;
    const load = courseData.sqlLessonFileFor(itemId);
    if (!load) return;
    let cancelled = false;
    setLoadFailed(false);
    load()
      .then((lessons: Record<string, any>) => {
        if (!cancelled) setLoaded({ itemId, lessons });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [courseData, itemId, isLessonPage, retry]);

  const waitingForLesson =
    isLessonPage && !!courseData?.sqlLessonFileFor(itemId) && loaded?.itemId !== itemId;

  if (loadFailed && waitingForLesson) {
    return (
      <div className={styles.contentArea}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          This lesson couldn't be loaded. Check your connection and try again.
        </p>
        <button className={styles.lessonNavBtn} onClick={() => setRetry((n) => n + 1)}>Try again</button>
      </div>
    );
  }

  if (!courseData || waitingForLesson) {
    return (
      <div className={styles.contentArea} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--accent)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const { sqlQuizzes, sqlAssignments } = courseData;

  if (!itemId) {
    return <div className={styles.contentArea}>Item not found</div>;
  }

  // 1. Quizzes
  if (itemId.endsWith('-quiz')) {
    const questions = sqlQuizzes[itemId] || [];
    // key forces a fresh mount per module: without it, answers and the score
    // from the previous module's quiz persist when navigating to the next one.
    return <ModuleQuiz key={itemId} moduleId={`sql-${moduleId}`} questions={questions} />;
  }

  // 2. Assignments
  if (itemId.endsWith('-assignment')) {
    const assignment = sqlAssignments[itemId];
    if (!assignment) {
      return (
        <div style={{ padding: '24px' }}>
          <h2>Assignment</h2>
          <p>Assignment content is being prepared.</p>
        </div>
      );
    }
    return <ModuleAssignment key={itemId} title={assignment.title} questions={assignment.questions} />;
  }

  // 3. Standard Lesson or Capstone
  const lessonData = loaded?.itemId === itemId ? loaded.lessons[itemId] : undefined;

  if (!lessonData) {
    return (
      <div className={styles.contentArea}>
        <h2>{itemId}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed content for this lesson is coming soon!
        </p>
      </div>
    );
  }

  return (
    <LessonLayout
      badge={lessonBadge(itemId)}
      title={lessonData.title}
      theory={<LessonBlocks blocks={lessonData.content as LessonBlock[]} defaultLanguage="sql" />}
      objectives={lessonData.objectives ?? []}
      takeaways={lessonData.takeaways ?? []}
    />
  );
};

export default SqlModuleRenderer;
