import { useState, useEffect } from 'react';
import { hydrateCourseProgress, queueSave } from '../lib/courseProgress';
import { courseForStorageKey } from '../lib/courseRegistry';

/**
 * Tracks the furthest lesson index the user has visited in one course.
 * Cached in localStorage and saved to the server (see lib/courseProgress).
 */
export function useCourseProgress(storageKey: string, totalItems: number) {
  const [maxIndexRead, setMaxIndexRead] = useState<number>(0);

  // The dashboard works its percentage out from courseRegistry's totalItems,
  // without loading the course. Flag it here, where the real syllabus is known.
  useEffect(() => {
    const registered = courseForStorageKey(storageKey)?.totalItems;
    if (import.meta.env.DEV && registered !== totalItems) {
      console.warn(`courseRegistry: ${storageKey} totalItems is ${registered}, but the syllabus has ${totalItems} items`);
    }
  }, [storageKey, totalItems]);

  // Load from the cache at once, then again after the server's progress has
  // been merged in — on a new device the cache starts empty.
  useEffect(() => {
    const load = () => {
      const idx = parseInt(localStorage.getItem(storageKey) || '', 10);
      if (!isNaN(idx)) setMaxIndexRead(prev => Math.max(prev, idx));
    };
    load();
    hydrateCourseProgress().then(load);
  }, [storageKey]);

  // Save whenever it advances
  useEffect(() => {
    if (maxIndexRead > 0) {
      localStorage.setItem(storageKey, maxIndexRead.toString());
      queueSave(storageKey);
    }
  }, [maxIndexRead, storageKey]);

  const progressPercent = Math.round(((maxIndexRead + 1) / totalItems) * 100);

  return { maxIndexRead, setMaxIndexRead, progressPercent };
}
