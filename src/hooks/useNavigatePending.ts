import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** Give up on a stuck spinner rather than leaving a button disabled forever. */
const SAFETY_TIMEOUT_MS = 15_000;

/**
 * Navigation that reports which destination is still loading.
 *
 * React Router 7 wraps navigation in a React transition, so when the target
 * route is a lazy chunk the *old* screen stays on screen while it downloads —
 * no Suspense fallback, no visible change. On a course page whose data chunk is
 * hundreds of kilobytes that reads as "the button did nothing".
 *
 * Because the current screen stays mounted for that whole window, the button
 * that was clicked is still there to show a spinner — which is exactly the
 * feedback the transition removes.
 */
export function useNavigatePending() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingTo, setPendingTo] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // The new route has rendered, so whatever was pending has arrived.
  useEffect(() => {
    setPendingTo(null);
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = useCallback(
    (to: string) => {
      // Navigating to where we already are changes no location, so nothing
      // would ever clear the spinner. Skip the pending state entirely.
      if (to !== location.pathname) {
        setPendingTo(to);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPendingTo(null), SAFETY_TIMEOUT_MS);
      }
      navigate(to);
    },
    [navigate, location.pathname],
  );

  return {
    go,
    /** True while `to` is the destination being loaded. */
    isPending: useCallback((to: string) => pendingTo === to, [pendingTo]),
    /** True while any navigation from this screen is in flight. */
    isNavigating: pendingTo !== null,
  };
}
