import type { ModuleData } from '../GolangCourseData';

/**
 * One chunk per module, fetched when a learner opens it. The course used to
 * arrive as a single file of every module's lessons at once.
 */
export const GOLANG_MODULE_LOADERS: Record<string, () => Promise<ModuleData>> = {
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
  m13: () => import('./m13').then((m) => m.default),
  m14: () => import('./m14').then((m) => m.default),
  m15: () => import('./m15').then((m) => m.default),
  m16: () => import('./m16').then((m) => m.default),
  m17: () => import('./m17').then((m) => m.default),
  m18: () => import('./m18').then((m) => m.default),
};
