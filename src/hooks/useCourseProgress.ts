import { useState, useEffect } from 'react';
import { hydrateCourseProgress, queueSave } from '../lib/courseProgress';

/**
 * Tracks the furthest lesson index the user has visited in one course.
 * Cached in localStorage and saved to the server (see lib/courseProgress).
 */
export function useCourseProgress(storageKey: string, totalItems: number) {
  const [maxIndexRead, setMaxIndexRead] = useState<number>(0);

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
