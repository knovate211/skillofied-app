import { courseForTitle } from '../lib/courseRegistry';

export function getCourseButtonText(progress: number) {
  if (progress === 0) return "Start Course";
  if (progress === 100) return "Review Course";
  return "Continue Learning";
}

/** Dashboard percentage for a course, from the cached progress (see lib/courseProgress). */
export function getCourseProgress(title: string): number {
  const course = courseForTitle(title);
  if (!course) return 0;
  const idx = parseInt(localStorage.getItem(course.storageKey) || '', 10);
  // No stored progress means the learner has not opened the course yet.
  if (isNaN(idx)) return 0;
  return Math.min(100, Math.round(((idx + 1) / course.totalItems) * 100));
}
