import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
}


export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  exercise?: {
    title: string;
    description: string;
    instructions: string[];
    starterCode: string;
    expectedOutput: string;
    type: string;
  };
  quiz: QuizQuestion[];
  assignment: {
    // Plain strings are written questions; objects with kind:'code' render a
    // runnable editor. See ModuleAssignment for the full shape.
    prompts: AssignmentQuestion[];
  };
}import mod_m1 from './modules/m1';
import mod_m2 from './modules/m2';
import mod_m3 from './modules/m3';
import mod_m4 from './modules/m4';
import mod_m5 from './modules/m5';
import mod_m6 from './modules/m6';
import mod_m7 from './modules/m7';
import mod_m8 from './modules/m8';
import mod_m9 from './modules/m9';
import mod_m10 from './modules/m10';
import mod_m11 from './modules/m11';
import mod_m12 from './modules/m12';
import mod_m13 from './modules/m13';
import mod_m14 from './modules/m14';
import mod_m15 from './modules/m15';
import mod_m16 from './modules/m16';
import mod_m17 from './modules/m17';
import mod_m18 from './modules/m18';
import mod_m19 from './modules/m19';

/**
 * The full course, assembled from one file per module under ./modules. The app
 * loads modules one at a time through ./modules/loaders.ts; this assembly is
 * what dashbord_backend's gen-quiz-seed.js reads the answer keys from.
 */
export const JAVA_COURSE_DATA: Record<string, ModuleData> = {
  m1: mod_m1,
  m2: mod_m2,
  m3: mod_m3,
  m4: mod_m4,
  m5: mod_m5,
  m6: mod_m6,
  m7: mod_m7,
  m8: mod_m8,
  m9: mod_m9,
  m10: mod_m10,
  m11: mod_m11,
  m12: mod_m12,
  m13: mod_m13,
  m14: mod_m14,
  m15: mod_m15,
  m16: mod_m16,
  m17: mod_m17,
  m18: mod_m18,
  m19: mod_m19,
};
