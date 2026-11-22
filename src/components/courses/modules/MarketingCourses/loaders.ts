import type { MarketingCourseContent } from './types';

/**
 * Per-module content for the marketing courses. Each file holds two modules'
 * lessons, quizzes and assignments (a few hundred KB of prose apiece), so it is
 * its own chunk, fetched when a learner opens one of those modules instead of
 * every module arriving with the course page.
 *
 * SeoCourseData.ts and DigitalMarketingCourseData.ts still assemble the full
 * courses: dashbord_backend's gen-quiz-seed.js reads the answer keys from them.
 * The app does not import those files.
 */
export type MarketingModuleLoader = () => Promise<MarketingCourseContent>;

const part = (
  lessons: MarketingCourseContent['lessons'],
  quizzes: MarketingCourseContent['quizzes'] = {},
  assignments: MarketingCourseContent['assignments'] = {},
): MarketingCourseContent => ({ lessons, quizzes, assignments });

const seoOverview: MarketingModuleLoader = () => import('./seo/aiOverview').then((m) => part(m.aiOverviewLessons));
const seo1And2: MarketingModuleLoader = () =>
  import('./seo/aiModules1And2').then((m) => part(m.aiModules1And2Lessons, m.aiModules1And2Quizzes, m.aiModules1And2Assignments));
const seo3And4: MarketingModuleLoader = () =>
  import('./seo/aiModules3And4').then((m) => part(m.aiModules3And4Lessons, m.aiModules3And4Quizzes, m.aiModules3And4Assignments));
const seo5And6: MarketingModuleLoader = () =>
  import('./seo/aiModules5And6').then((m) => part(m.aiModules5And6Lessons, m.aiModules5And6Quizzes, m.aiModules5And6Assignments));
const seo7And8: MarketingModuleLoader = () =>
  import('./seo/aiModules7And8').then((m) => part(m.aiModules7And8Lessons, m.aiModules7And8Quizzes, m.aiModules7And8Assignments));

export const SEO_MODULE_LOADERS: Record<string, MarketingModuleLoader> = {
  overview: seoOverview,
  'seo-m1': seo1And2,
  'seo-m2': seo1And2,
  'seo-m3': seo3And4,
  'seo-m4': seo3And4,
  'seo-m5': seo5And6,
  'seo-m6': seo5And6,
  'seo-m7': seo7And8,
  'seo-m8': seo7And8,
};

const dmOverviewAnd1: MarketingModuleLoader = () =>
  import('./digitalMarketing/overviewAndModule1').then((m) =>
    part(m.overviewAndModule1Lessons, m.overviewAndModule1Quizzes, m.overviewAndModule1Assignments));
const dm2And3: MarketingModuleLoader = () =>
  import('./digitalMarketing/modules2And3').then((m) => part(m.modules2And3Lessons, m.modules2And3Quizzes, m.modules2And3Assignments));
const dm4And5: MarketingModuleLoader = () =>
  import('./digitalMarketing/modules4And5').then((m) => part(m.modules4And5Lessons, m.modules4And5Quizzes, m.modules4And5Assignments));
const dm6And7: MarketingModuleLoader = () =>
  import('./digitalMarketing/modules6And7').then((m) => part(m.modules6And7Lessons, m.modules6And7Quizzes, m.modules6And7Assignments));
const dm8And9: MarketingModuleLoader = () =>
  import('./digitalMarketing/modules8And9').then((m) => part(m.modules8And9Lessons, m.modules8And9Quizzes, m.modules8And9Assignments));

export const DM_MODULE_LOADERS: Record<string, MarketingModuleLoader> = {
  overview: dmOverviewAnd1,
  'dm-m1': dmOverviewAnd1,
  'dm-m2': dm2And3,
  'dm-m3': dm2And3,
  'dm-m4': dm4And5,
  'dm-m5': dm4And5,
  'dm-m6': dm6And7,
  'dm-m7': dm6And7,
  'dm-m8': dm8And9,
  'dm-m9': dm8And9,
};
