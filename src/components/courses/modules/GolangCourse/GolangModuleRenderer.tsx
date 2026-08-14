import React, { useState, useEffect } from 'react';
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
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    import('./GolangCourseData').then((module) => {
      setCourseData(module.GOLANG_COURSE_DATA);
    });
  }, []);

  // Isolate non-module renders
  if (moduleId === 'projects') return <MajorProjects page={page} />;
  if (moduleId === 'interview') return <InterviewPrep page={page} />;
  if (moduleId === 'assessment') return <FinalAssessment page={page} />;
  if (moduleId === 'certification') return <Certification page={page} />;

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
