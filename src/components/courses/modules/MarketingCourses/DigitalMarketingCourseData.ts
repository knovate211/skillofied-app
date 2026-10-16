import { MarketingCourseContent } from './types';
import {
  overviewAndModule1Lessons,
  overviewAndModule1Quizzes,
  overviewAndModule1Assignments,
} from './digitalMarketing/overviewAndModule1';
import { modules2And3Lessons, modules2And3Quizzes, modules2And3Assignments } from './digitalMarketing/modules2And3';
import { modules4And5Lessons, modules4And5Quizzes, modules4And5Assignments } from './digitalMarketing/modules4And5';
import { modules6And7Lessons, modules6And7Quizzes, modules6And7Assignments } from './digitalMarketing/modules6And7';
import { modules8And9Lessons, modules8And9Quizzes, modules8And9Assignments } from './digitalMarketing/modules8And9';

/**
 * Digital Marketing Strategy — full course content.
 *
 * Module and lesson titles follow the published syllabus shown on the course
 * landing page (CoursePlaceholderPage). Lesson bodies, quizzes and assignments
 * live under ./digitalMarketing, roughly two modules per file.
 *
 * Assessment is quizzes plus written case studies: this is a marketing course,
 * so nothing is answered in the code editor.
 */
export const digitalMarketingContent: MarketingCourseContent = {
  lessons: {
    ...overviewAndModule1Lessons,
    ...modules2And3Lessons,
    ...modules4And5Lessons,
    ...modules6And7Lessons,
    ...modules8And9Lessons,
  },

  quizzes: {
    ...overviewAndModule1Quizzes,
    ...modules2And3Quizzes,
    ...modules4And5Quizzes,
    ...modules6And7Quizzes,
    ...modules8And9Quizzes,
  },

  assignments: {
    ...overviewAndModule1Assignments,
    ...modules2And3Assignments,
    ...modules4And5Assignments,
    ...modules6And7Assignments,
    ...modules8And9Assignments,
  },
};
