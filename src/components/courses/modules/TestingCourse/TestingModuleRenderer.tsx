import React, { useState, useEffect } from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import StandardLessonView from '../../shared/StandardLessonView';
import { SYLLABUS } from '../../TestingCoursePage';
import { SyllabusModule } from '../../../../types';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  moduleId: string;
  page: number;
}

const TestingModuleRenderer: React.FC<Props> = ({ moduleId, page }) => {
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    import('./TestingCourseData').then((module) => {
      setCourseData(module.TESTING_COURSE_DATA);
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

  const syllabusModule = SYLLABUS.find((m: SyllabusModule) => m.id === moduleId);
  const itemId = syllabusModule?.items[page - 1]?.id ?? '';
  const itemTitle = syllabusModule?.items[page - 1]?.title ?? '';

  let pageType: 'lesson' | 'quiz' | 'assignment' | 'missing' = 'lesson';
  let activeLesson: any = null;

  if (itemId.endsWith('-quiz')) {
    pageType = 'quiz';
  } else if (
    itemId.endsWith('-assignment') || 
    itemId.endsWith('-proj') || 
    itemId.includes('-p') || 
    itemId.endsWith('-final') ||
    itemId.startsWith('interview-') ||
    itemId.startsWith('assessment-') ||
    itemId.startsWith('cert-')
  ) {
    pageType = 'assignment';
  } else {
    activeLesson = moduleData.lessons?.find((l: any) => l.id === itemId) ?? null;
    pageType = activeLesson ? 'lesson' : 'missing';
  }

  if (pageType === 'missing') {
    return (
      <div className={styles.contentArea}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--heading)' }}>{itemTitle || 'Lesson'}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          This lesson is being written and will be published shortly. Continue with the next item in the sidebar in the meantime.
        </p>
      </div>
    );
  }

  // 1. Quizzes
  if (pageType === 'quiz') {
    const questions = moduleData.quiz || [];
    return <ModuleQuiz key={itemId} moduleId={`testing-${moduleId}`} questions={questions} />;
  }

  // 2. Assignments & Projects
  if (pageType === 'assignment') {
    const assignment = moduleData.assignment || { prompts: [] };
    const prompts = assignment.prompts.length > 0 ? assignment.prompts : [itemTitle];
    return <ModuleAssignment key={itemId} moduleId={`testing-${moduleId}`} title="Module Practice Set" questions={prompts} />;
  }

  // 3. Lessons
  if (pageType === 'lesson' && activeLesson) {
    return <StandardLessonView lesson={activeLesson} language="javascript" snippetTitle="example.spec.js" />;
  }

  return <div className={styles.contentArea}>Content not available.</div>;
};

export default TestingModuleRenderer;
