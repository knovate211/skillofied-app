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

const GenAIModuleRenderer: React.FC<Props> = ({ moduleId, page }) => {
  const [courseData, setCourseData] = useState<any>(null);

  // Loaded on demand so the course content stays out of the main bundle.
  useEffect(() => {
    import('./GenAICourseData').then((module) => {
      setCourseData(module.GENAI_COURSE_DATA);
    });
  }, []);

  // Non-module sections render without the course data.
  if (moduleId === 'projects') return <MajorProjects page={page} />;
  if (moduleId === 'interview') return <InterviewPrep page={page} />;
  if (moduleId === 'assessment') return <FinalAssessment page={page} />;
  if (moduleId === 'certification') return <Certification page={page} />;

  if (!courseData) {
    return (
      <div
        className={styles.contentArea}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    );
  }

  const moduleData = courseData[moduleId];
  if (!moduleData) {
    return <div className={styles.contentArea}>Item not found</div>;
  }

  const lessons = moduleData.lessons || [];
  const totalLessons = lessons.length;

  // Quiz sits immediately after the lessons, then the practice set.
  if (page === totalLessons + 1) {
    return <ModuleQuiz key={moduleId} moduleId={`genai-${moduleId}`} questions={moduleData.quiz || []} />;
  }

  if (page === totalLessons + 2) {
    const assignment = moduleData.assignment || { prompts: [] };
    return (
      <ModuleAssignment
        key={moduleId}
        moduleId={`genai-${moduleId}`}
        title="Module Practice Set"
        questions={assignment.prompts}
      />
    );
  }

  const lessonData = lessons[page - 1];
  if (!lessonData) {
    return (
      <div className={styles.contentArea}>
        <h2>Lesson Content</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Content loading...</p>
      </div>
    );
  }

  return <StandardLessonView lesson={lessonData} language="python" snippetTitle="example.py" />;
};

export default GenAIModuleRenderer;
