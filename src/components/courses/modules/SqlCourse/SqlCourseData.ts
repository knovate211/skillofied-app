import { LessonMap } from './lessons/types';
import { foundationLessons } from './lessons/foundations';
import { commandLessons } from './lessons/commands';
import { analysisLessons } from './lessons/analysis';
import { advancedLessons } from './lessons/advanced';
import { designLessons } from './lessons/design';
import { appliedLessons } from './lessons/applied';

export type { LessonContent } from './lessons/types';
export type { AssignmentContent } from './lessons/assignments';

export { sqlQuizzes } from './lessons/quizzes';
export { sqlAssignments } from './lessons/assignments';

/**
 * Lesson bodies live in ./lessons, split by module group. Merging them here
 * keeps SqlModuleRenderer's single dynamic import — the whole course still
 * arrives in one lazy chunk — while each group stays an editable size.
 */
export const sqlLessons: LessonMap = {
  ...foundationLessons,
  ...commandLessons,
  ...analysisLessons,
  ...advancedLessons,
  ...designLessons,
  ...appliedLessons,
};
