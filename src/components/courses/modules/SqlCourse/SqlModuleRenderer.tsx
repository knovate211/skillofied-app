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

  useEffect(() => {
    import('./SqlCourseData').then((module) => {
      setCourseData({
        sqlLessons: module.sqlLessons,
        sqlQuizzes: module.sqlQuizzes,
        sqlAssignments: module.sqlAssignments,
      });
    });
  }, []);

  const moduleItem = SYLLABUS.find((m: SyllabusModule) => m.id === moduleId);
  const itemId = moduleItem ? moduleItem.items[page - 1]?.id : '';

  if (!courseData) {
    return (
      <div className={styles.contentArea} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--accent)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const { sqlLessons, sqlQuizzes, sqlAssignments } = courseData;

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
  const lessonData = sqlLessons[itemId];

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
