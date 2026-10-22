// Per-learner data the app caches in localStorage.
//
// None of these keys carries a user id, so on a shared computer the next
// person to sign in would see the previous learner's course progress,
// assignment answers and code drafts. They are cleared on logout, and also
// when someone else signs in on this browser (a session that expired rather
// than being logged out never runs the logout path).
//
// Theme and editor preferences are not personal and are kept.
import { flushCourseProgress, isProgressKey, resetCourseProgress } from './courseProgress';

const OWNER_KEY = 'learnerDataOwner';

const isLearnerKey = (key: string) =>
  isProgressKey(key) ||
  key.startsWith('assignment-state-') || // module assignment answers
  key.startsWith('code_') || // practice IDE drafts
  key.startsWith('lang_'); // practice IDE language per problem

export function clearLearnerData() {
  flushCourseProgress();
  resetCourseProgress();
  const doomed: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && isLearnerKey(key)) doomed.push(key);
  }
  doomed.forEach(key => localStorage.removeItem(key));
  localStorage.removeItem(OWNER_KEY);
}

/**
 * Marks the cached learner data as belonging to `userId`, first clearing it if
 * it belongs to someone else. Call this as soon as a session is established,
 * before anything renders from the cache.
 *
 * Data from before this was introduced has no owner. It is kept and claimed by
 * whoever signs in next, so existing learners do not lose their progress.
 */
export function claimLearnerData(userId: string | undefined) {
  if (!userId) return;
  const owner = localStorage.getItem(OWNER_KEY);
  if (owner && owner !== userId) {
    clearLearnerData();
  }
  localStorage.setItem(OWNER_KEY, userId);
}
