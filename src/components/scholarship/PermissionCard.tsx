import React from 'react';
import styles from './Scholarship.module.css';

export type PermState = 'idle' | 'busy' | 'ok' | 'failed' | 'unsupported';

interface Props {
  icon: React.ReactNode;
  title: string;
  body: string;
  /** Advisory checks say so, so a candidate is not left thinking they are stuck. */
  required: boolean;
  state: PermState;
  okLabel: string;
  failLabel?: string;
  actionLabel: string;
  onAction: () => void;
  open: boolean;
  onToggle: () => void;
}

/**
 * One permission the test needs, with its own state and its own button.
 *
 * Each is a separate card because each fails separately and is fixed
 * separately: a candidate who denied the camera needs a different sentence from
 * one on a second monitor, and a single "checks failed" banner tells neither of
 * them what to do.
 */
const PermissionCard: React.FC<Props> = ({
  icon, title, body, required, state, okLabel, failLabel, actionLabel, onAction, open, onToggle,
}) => {
  const statusText =
    state === 'ok' ? okLabel
    : state === 'failed' ? (failLabel ?? 'Not allowed')
    : state === 'unsupported' ? 'Could not check in this browser'
    : state === 'busy' ? 'Checking…'
    : required ? 'Required' : 'Optional';

  const statusClass =
    state === 'ok' ? styles.permOk
    : state === 'failed' ? styles.permBad
    : state === 'unsupported' ? styles.permWarn
    : styles.permIdle;

  return (
    <div className={`${styles.permCard} ${state === 'ok' ? styles.permCardOk : ''}`}>
      <button className={styles.permHead} onClick={onToggle} aria-expanded={open}>
        <span className={styles.permIcon} aria-hidden>{icon}</span>
        <span className={styles.permTitle}>{title}</span>
        <span className={`${styles.permStatus} ${statusClass}`}>
          {state === 'ok' ? '✓ ' : state === 'failed' ? '! ' : ''}{statusText}
        </span>
        <span className={styles.permChevron} aria-hidden>{open ? '⌃' : '⌄'}</span>
      </button>

      {open ? (
        <div className={styles.permBody}>
          <p className={styles.permText}>{body}</p>
          {state !== 'ok' ? (
            <button className={styles.permAction} onClick={onAction} disabled={state === 'busy'}>
              {state === 'busy' ? 'Working…' : actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default PermissionCard;
