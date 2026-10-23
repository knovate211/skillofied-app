import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  /** A fuller worked example, shown under its own heading with its output. */
  codeExample?: string;
  codeOutput?: string;
  /** Pitfalls called out in an amber callout below the example. */
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
  quiz: QuizQuestion[];
  assignment: {
    // This course is multiple choice only: every prompt is kind:'mcq'. The
    // wider AssignmentQuestion type also allows 'code' and 'text', which other
    // courses use — do not introduce them here.
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

/**
 * The full course, assembled from one file per module under ./modules. The app
 * loads modules one at a time through ./modules/loaders.ts; this assembly is
 * what dashbord_backend's gen-quiz-seed.js reads the answer keys from.
 */
export const GENAI_COURSE_DATA: Record<string, ModuleData> = {
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
};
