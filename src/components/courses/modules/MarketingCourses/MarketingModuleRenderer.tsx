import React from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { SyllabusModule } from '../../../../types';
import { MarketingCourseContent } from './types';
import LessonLayout from '../../shared/LessonLayout';
import LessonBlocks, { LessonBlock } from '../../shared/LessonBlocks';
import { lessonBadge } from '../../shared/lessonTheory';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  syllabus: SyllabusModule[];
  content: MarketingCourseContent;
  moduleId: string;
  page: number;
}

const MarketingModuleRenderer: React.FC<Props> = ({ syllabus, content, moduleId, page }) => {
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
