import { useEffect, useState } from 'react';

/**
 * Loads one course module's data on demand, for courses split into one chunk
 * per module (Java, GenAI, Golang).
 *
 * - `data` is the open module's data, or null while it is loading.
 * - `missing` means the course has no such module.
 * - `failed` means the chunk could not be fetched; `retry` tries again.
 *
 * The result is keyed by module, so a response for the previous module is
 * never shown after the learner has moved on.
 */
export function useModuleData<T>(loaders: Record<string, () => Promise<T>>, moduleId: string) {
  const [loaded, setLoaded] = useState<{ moduleId: string; data: T } | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const load = loaders[moduleId];

  useEffect(() => {
    if (!load) return;
    let cancelled = false;
    setFailed(false);
    load()
      .then((data) => {
        if (!cancelled) setLoaded({ moduleId, data });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [load, moduleId, attempt]);

  return {
    data: loaded?.moduleId === moduleId ? loaded.data : null,
    missing: !load,
    failed,
    retry: () => setAttempt((n) => n + 1),
  };
}
