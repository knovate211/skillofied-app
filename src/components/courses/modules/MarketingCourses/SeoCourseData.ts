import { MarketingCourseContent } from './types';
import { aiOverviewLessons } from './seo/aiOverview';
import { aiModules1And2Lessons, aiModules1And2Quizzes, aiModules1And2Assignments } from './seo/aiModules1And2';
import { aiModules3And4Lessons, aiModules3And4Quizzes, aiModules3And4Assignments } from './seo/aiModules3And4';
import { aiModules5And6Lessons, aiModules5And6Quizzes, aiModules5And6Assignments } from './seo/aiModules5And6';
import { aiModules7And8Lessons, aiModules7And8Quizzes, aiModules7And8Assignments } from './seo/aiModules7And8';

/**
 * AI SEO & Search Visibility — full course content.
 *
 * Module and lesson titles follow the published syllabus shown on the course
 * landing page (CoursePlaceholderPage), so what learners were promised is what
 * they get. Lesson bodies live under ./seo, two modules per file.
 */
export const seoContent: MarketingCourseContent = {
  lessons: {
    ...aiOverviewLessons,
    ...aiModules1And2Lessons,
    ...aiModules3And4Lessons,
    ...aiModules5And6Lessons,
    ...aiModules7And8Lessons,
  },

  quizzes: {
    ...aiModules1And2Quizzes,
    ...aiModules3And4Quizzes,
    ...aiModules5And6Quizzes,
    ...aiModules7And8Quizzes,
  },

  assignments: {
    ...aiModules1And2Assignments,
    ...aiModules3And4Assignments,
    ...aiModules5And6Assignments,
    ...aiModules7And8Assignments,
  },
};
