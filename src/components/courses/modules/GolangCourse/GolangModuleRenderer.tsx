import React from 'react';
import { useModuleData } from '../../shared/useModuleData';
import type { ModuleData } from './GolangCourseData';
import { GOLANG_MODULE_LOADERS } from './modules/loaders';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import StandardLessonView from '../../shared/StandardLessonView';
import styles from '../../FrontendCoursePage.module.css';

import MajorProjects from './MajorProjects';
import InterviewPrep from './InterviewPrep';
import FinalAssessment from './FinalAssessment';
import Certification from './Certification';

interface Props {
  moduleId: string;
  page: number;
}

const GolangModuleRenderer: React.FC<Props> = ({ moduleId, page }) => {
  // Only the open module is fetched (one chunk per module, see modules/loaders.ts).
  // Shaped like the old whole-course object so the lookups below are unchanged.
  const { data: moduleChunk, missing, failed: loadFailed, retry } = useModuleData(GOLANG_MODULE_LOADERS, moduleId);
  const courseData: Record<string, ModuleData> | null = missing ? {} : moduleChunk ? { [moduleId]: moduleChunk } : null;

  // Isolate non-module renders
  if (moduleId === 'projects') return <MajorProjects page={page} />;
  if (moduleId === 'interview') return <InterviewPrep page={page} />;
  if (moduleId === 'assessment') return <FinalAssessment page={page} />;
  if (moduleId === 'certification') return <Certification page={page} />;

  if (!courseData && loadFailed) {
    return (
      <div className={styles.contentArea}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          This lesson couldn't be loaded. Check your connection and try again.
        </p>
        <button className={styles.lessonNavBtn} onClick={retry}>Try again</button>
      </div>
    );
  }

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

  // Calculate length of lessons
  const lessons = moduleData.lessons || [];
  const totalLessons = lessons.length;

  // 1. Quizzes (Always active on page totalLessons + 1)
  if (page === totalLessons + 1) {
    const questions = moduleData.quiz || [];
    return <ModuleQuiz key={moduleId} moduleId={`golang-${moduleId}`} questions={questions} />;
  }

  // 2. Assignments (Always active on page totalLessons + 2)
  if (page === totalLessons + 2) {
    const assignment = moduleData.assignment || { prompts: [] };
    return <ModuleAssignment key={moduleId} title="Module Practice Set" questions={assignment.prompts} />;
  }

  // 3. Lessons
  const lessonData = lessons[page - 1];
  if (!lessonData) {
    return (
      <div className={styles.contentArea}>
        <h2>Lesson Content</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Content loading...</p>
      </div>
    );
  }

  return <StandardLessonView lesson={lessonData} language="go" snippetTitle="main.go" />;
};

export default GolangModuleRenderer;
