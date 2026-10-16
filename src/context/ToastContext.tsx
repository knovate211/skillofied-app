import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle, Info, XCircle } from 'lucide-react';
import styles from './ToastContext.module.css';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  /** Set while the exit animation plays; the row unmounts when it finishes. */
  leaving?: boolean;
}

interface ToastContextValue {
  /** Show a transient message. Returns the id so a caller can dismiss it early. */
  showToast: (message: string, type?: ToastType) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** How long each kind stays up. Errors linger — they usually need reading. */
const DURATION_MS: Record<ToastType, number> = {
  success: 3500,
  info: 3500,
  error: 6000,
};

const ICONS: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

/** Must match the exit animation in ToastContext.module.css. */
const EXIT_MS = 180;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // Timers are cleared on manual dismiss so a re-used id cannot close its successor.
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const seq = useRef(0);

  // Dismissal is two steps: mark the toast leaving so CSS can play the exit and
  // collapse the gap it leaves behind, then drop it once that has finished.
  // This is what AnimatePresence + `layout` used to do, without shipping the
  // 125 KB layout-projection engine to every visitor for two toasts.
  const dismissToast = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    timers.current[`${id}:exit`] = setTimeout(() => {
      delete timers.current[`${id}:exit`];
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_MS);
  }, []);

  // Nothing should fire after the provider goes away.
  useEffect(() => {
    const pending = timers.current;
    return () => Object.values(pending).forEach(clearTimeout);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    seq.current += 1;
    const id = `toast-${seq.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    timers.current[id] = setTimeout(() => dismissToast(id), DURATION_MS[type]);
    return id;
  }, [dismissToast]);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} role="region" aria-label="Notifications">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <div
              key={toast.id}
              className={`${styles.slot} ${toast.leaving ? styles.leaving : ''}`}
            >
              <div
                className={`${styles.toast} ${styles[toast.type]}`}
                role={toast.type === 'error' ? 'alert' : 'status'}
                onClick={() => dismissToast(toast.id)}
              >
                <Icon className={styles.icon} aria-hidden="true" />
                <span className={styles.message}>{toast.message}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside a ToastProvider');
  }
  return ctx;
};
