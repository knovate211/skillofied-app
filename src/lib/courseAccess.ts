// Which course pages a learner may open, derived from getMyCourses.
//
// The sidebar uses this to lock its links and App.tsx uses it to guard the
// course routes, so typing a URL cannot open a course the sidebar shows as
// locked. The rules themselves live in courseRegistry (`unlockedBy`).
import { COURSES, isUnlocked, ownedCourseKeys } from './courseRegistry';

interface EnrolledCourse {
  title: string;
}

export function getUnlockedCoursePaths(enrolledCourses: EnrolledCourse[]): Set<string> {
  const owned = ownedCourseKeys(enrolledCourses);
  return new Set(COURSES.filter((c) => isUnlocked(c, owned)).map((c) => c.path));
}
