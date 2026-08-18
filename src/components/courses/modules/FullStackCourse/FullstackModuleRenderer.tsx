import React, { useState, useEffect } from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import StandardLessonView from '../../shared/StandardLessonView';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  moduleId: string;
  page: number;
}

const FullstackModuleRenderer: React.FC<Props> = ({ moduleId, page }) => {
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    import('./FullstackCourseData').then((module) => {
      setCourseData(module.FULLSTACK_COURSE_DATA);
    });
  }, []);

  if (!courseData) {
    return (
      <div className={styles.contentArea} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--accent)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const moduleData = courseData[moduleId];
  if (!moduleData) {
    return <div className={styles.contentArea}>Item not found</div>;
  }

  // 1. Quizzes
  if (moduleId === 'm1' && page === 2) {
    const questions = moduleData.quiz || [];
    return <ModuleQuiz key={moduleId} moduleId={`fullstack-${moduleId}`} questions={questions} />;
  }
  if (moduleId === 'm2' && page === 2) {
    const questions = moduleData.quiz || [];
    return <ModuleQuiz key={moduleId} moduleId={`fullstack-${moduleId}`} questions={questions} />;
  }

  // 2. Assignments
  if (moduleId === 'm1' && page === 3) {
    const assignment = moduleData.assignment || { prompts: [] };
    return <ModuleAssignment key={moduleId} title="Module Practice Set" questions={assignment.prompts} />;
  }
  if (moduleId === 'm2' && page === 3) {
    const assignment = moduleData.assignment || { prompts: [] };
    return <ModuleAssignment key={moduleId} title="Module Practice Set" questions={assignment.prompts} />;
  }

  // 3. Lessons
  const lessons = moduleData.lessons || [];
  const lessonData = lessons[page - 1];
  if (!lessonData) {
    return (
      <div className={styles.contentArea}>
        <h2>Lesson Content</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Content loading...</p>
      </div>
    );
  }

  return <StandardLessonView lesson={lessonData} language="javascript" snippetTitle="example.js" />;
};

export default FullstackModuleRenderer;
