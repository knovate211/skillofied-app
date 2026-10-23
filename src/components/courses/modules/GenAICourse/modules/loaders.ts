import type { ModuleData } from '../GenAICourseData';

/**
 * One chunk per module, fetched when a learner opens it. The course used to
 * arrive as a single file of every module's lessons at once.
 */
export const GENAI_MODULE_LOADERS: Record<string, () => Promise<ModuleData>> = {
  m1: () => import('./m1').then((m) => m.default),
  m2: () => import('./m2').then((m) => m.default),
  m3: () => import('./m3').then((m) => m.default),
  m4: () => import('./m4').then((m) => m.default),
  m5: () => import('./m5').then((m) => m.default),
  m6: () => import('./m6').then((m) => m.default),
  m7: () => import('./m7').then((m) => m.default),
  m8: () => import('./m8').then((m) => m.default),
  m9: () => import('./m9').then((m) => m.default),
  m10: () => import('./m10').then((m) => m.default),
  m11: () => import('./m11').then((m) => m.default),
  m12: () => import('./m12').then((m) => m.default),
};
