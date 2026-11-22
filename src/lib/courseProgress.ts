// Course progress, kept on the server and cached in localStorage.
//
// Each course viewer has a storage key ("maxJavaIndexRead"). Under it the
// cache holds the furthest lesson index read, and under `${key}:lastLesson`
// the lesson open most recently. The server is the record: it is what lets a
// learner continue on another device. The cache lets the dashboard and the
// viewer render synchronously.
import { getCourseProgressApi, saveCourseProgressApi } from '../api';

/** Where the last-visited lesson of a course is cached. */
export const lastLessonKey = (storageKey: string) => `${storageKey}:lastLesson`;

/** Every course's progress key, e.g. maxIndexRead (Front-End) or maxSqlIndexRead. */
export const isProgressKey = (key: string) => /^max\w*IndexRead(:lastLesson)?$/.test(key);

const HYDRATED_EVENT = 'course-progress-hydrated';

let hydration: Promise<void> | null = null;
// Bumped on reset, so a response still in flight from the previous learner's
// session is discarded instead of landing in the next learner's cache.
let generation = 0;

function readIndex(storageKey: string): number {
  const idx = parseInt(localStorage.getItem(storageKey) || '', 10);
  return isNaN(idx) ? 0 : idx;
}

/**
 * Loads the learner's progress from the server into the cache, once per
 * session. Progress found only in the cache (read before progress was stored
 * on the server, or saved while offline) is uploaded. Resolves even when the
 * server cannot be reached, so callers can always wait on it.
 */
export function hydrateCourseProgress(): Promise<void> {
  if (!hydration) {
    const started = generation;
    hydration = getCourseProgressApi()
      .then(({ progress }) => {
        if (started !== generation) return;
        const onServer = new Set<string>();
        for (const p of progress) {
          onServer.add(p.course_key);
          if (p.max_index > readIndex(p.course_key)) {
            localStorage.setItem(p.course_key, String(p.max_index));
          }
          if (p.last_lesson && !localStorage.getItem(lastLessonKey(p.course_key))) {
            localStorage.setItem(lastLessonKey(p.course_key), p.last_lesson);
          }
          if (readIndex(p.course_key) > p.max_index) queueSave(p.course_key);
        }
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && isProgressKey(key) && !key.endsWith(':lastLesson') && !onServer.has(key)) {
            queueSave(key);
          }
        }
        window.dispatchEvent(new Event(HYDRATED_EVENT));
      })
      .catch(err => {
        console.error('Failed to load course progress:', err);
        // Let a later call try again rather than caching the failure.
        if (started === generation) hydration = null;
      });
  }
  return hydration;
}

/** Calls `listener` whenever server progress has been merged into the cache. */
export function onCourseProgressHydrated(listener: () => void): () => void {
  window.addEventListener(HYDRATED_EVENT, listener);
  return () => window.removeEventListener(HYDRATED_EVENT, listener);
}

// Lesson changes come in bursts (clicking Next through a module), so saves are
// batched per course and sent after a short pause.
const SAVE_DELAY_MS = 800;
const pending = new Map<string, ReturnType<typeof setTimeout>>();

function send(storageKey: string) {
  pending.delete(storageKey);
  saveCourseProgressApi(
    storageKey,
    readIndex(storageKey),
    localStorage.getItem(lastLessonKey(storageKey)) || '',
  ).catch(err => console.error('Failed to save course progress:', err));
}

/** Schedules the cached progress of one course to be sent to the server. */
export function queueSave(storageKey: string) {
  const timer = pending.get(storageKey);
  if (timer) clearTimeout(timer);
  pending.set(storageKey, setTimeout(() => send(storageKey), SAVE_DELAY_MS));
}

/**
 * Sends every scheduled save now. Called on logout, while the token is still
 * in place: each request picks up its Authorization header when it starts.
 */
export function flushCourseProgress() {
  for (const [storageKey, timer] of pending) {
    clearTimeout(timer);
    send(storageKey);
  }
}

/** Forgets this session's hydration, so the next learner's progress is fetched. */
export function resetCourseProgress() {
  hydration = null;
  generation++;
}

window.addEventListener('pagehide', flushCourseProgress);
