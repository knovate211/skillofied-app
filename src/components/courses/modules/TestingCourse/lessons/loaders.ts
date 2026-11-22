import type { Lesson } from '../TestingCourseData';

/**
 * Where each module's lesson bodies live. The bodies are most of this course's
 * size — about 900 KB across these files — so each file is its own chunk,
 * fetched when a learner opens one of its modules rather than all up front.
 * Most files hold two modules; the import is shared, so it is fetched once.
 */
type LessonFile = () => Promise<Record<string, Lesson>>;

const overviewAndModule1: LessonFile = () => import('./overviewAndModule1').then((m) => m.overviewAndModule1Lessons);
const modules2And4: LessonFile = () => import('./modules2And4').then((m) => m.modules2And4Lessons);
const modules3And5: LessonFile = () => import('./modules3And5').then((m) => m.modules3And5Lessons);
const modules6And7: LessonFile = () => import('./modules6And7').then((m) => m.modules6And7Lessons);
const modules8And11: LessonFile = () => import('./modules8And11').then((m) => m.modules8And11Lessons);
const modules9And13: LessonFile = () => import('./modules9And13').then((m) => m.modules9And13Lessons);
const modules10And12: LessonFile = () => import('./modules10And12').then((m) => m.modules10And12Lessons);
const modules14And15: LessonFile = () => import('./modules14And15').then((m) => m.modules14And15Lessons);
const interview: LessonFile = () => import('./interview').then((m) => m.interviewLessons);

export const TESTING_LESSON_LOADERS: Record<string, LessonFile> = {
  overview: overviewAndModule1,
  m1: overviewAndModule1,
  m2: modules2And4,
  m3: modules3And5,
  m4: modules2And4,
  m5: modules3And5,
  m6: modules6And7,
  m7: modules6And7,
  m8: modules8And11,
  m9: modules9And13,
  m10: modules10And12,
  m11: modules8And11,
  m12: modules10And12,
  m13: modules9And13,
  m14: modules14And15,
  m15: modules14And15,
  interview,
};
