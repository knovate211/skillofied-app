import type { LessonMap } from './lessons/types';

export type { LessonContent } from './lessons/types';
export type { AssignmentContent } from './lessons/assignments';

export { sqlQuizzes } from './lessons/quizzes';
export { sqlAssignments } from './lessons/assignments';

/**
 * Lesson bodies live in ./lessons, split by module group, and are most of this
 * course's size. Each group is its own chunk, fetched the first time a learner
 * opens one of its lessons, rather than the whole course arriving at once.
 * Quizzes and assignments are small and stay in this file.
 */
type LessonFile = () => Promise<LessonMap>;

const foundations: LessonFile = () => import('./lessons/foundations').then((m) => m.foundationLessons);
const commands: LessonFile = () => import('./lessons/commands').then((m) => m.commandLessons);
const analysis: LessonFile = () => import('./lessons/analysis').then((m) => m.analysisLessons);
const advanced: LessonFile = () => import('./lessons/advanced').then((m) => m.advancedLessons);
const design: LessonFile = () => import('./lessons/design').then((m) => m.designLessons);
const applied: LessonFile = () => import('./lessons/applied').then((m) => m.appliedLessons);

/** Which file holds a lesson, by the part of its id before the first dash ("m3" of "m3-l2"). */
const FILE_BY_PREFIX: Record<string, LessonFile> = {
  overview: foundations, m1: foundations, m2: foundations,
  m3: commands, m4: commands, m5: commands,
  m6: analysis, m7: analysis, m8: analysis,
  m9: advanced, m10: advanced, m11: advanced,
  m12: design, m13: design, m14: design,
  m15: applied, m16: applied, m17: applied, test: applied, cert: applied, capstone: applied,
};

/** The lesson file an item's body is in, or undefined when it has none. */
export function sqlLessonFileFor(itemId: string): LessonFile | undefined {
  return FILE_BY_PREFIX[itemId.split('-')[0]];
}
