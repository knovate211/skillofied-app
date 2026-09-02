import React, { useCallback, useRef, useState } from 'react';
import Spinner from './Spinner';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

interface Props extends ButtonProps {
  /**
   * Drive the spinner from outside — for navigation, where the work finishes by
   * this component unmounting rather than by a promise resolving.
   */
  loading?: boolean;
  /**
   * A handler returning a promise keeps the button pending until it settles, so
   * async actions need no loading state of their own.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
  /** Replaces the label while pending. Omit to keep the label and just spin. */
  loadingText?: string;
  /** Trailing decoration (an arrow, say) that the spinner stands in for. */
  trailing?: React.ReactNode;
}

/**
 * A button that shows it is working.
 *
 * Two things it deliberately does:
 *  - stays the same width while pending, because a button that resizes under
 *    the cursor is worse than no feedback at all;
 *  - blocks repeat clicks, which on a slow navigation would otherwise stack up
 *    several transitions.
 */
const ActionButton: React.FC<Props> = ({
  loading = false,
  onClick,
  loadingText,
  trailing,
  children,
  disabled,
  style,
  ...rest
}) => {
  const [selfPending, setSelfPending] = useState(false);
  // Survives the unmount that a navigating button goes through mid-promise.
  const mounted = useRef(true);
  React.useEffect(() => () => { mounted.current = false; }, []);

  const pending = loading || selfPending;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (pending || disabled || !onClick) return;
      const result = onClick(e);
      if (result && typeof (result as Promise<unknown>).then === 'function') {
        setSelfPending(true);
        void (result as Promise<unknown>).finally(() => {
          if (mounted.current) setSelfPending(false);
        });
      }
    },
    [onClick, pending, disabled],
  );

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      style={{ ...style, ...(pending ? { cursor: 'progress' } : null) }}
    >
      <span>{pending && loadingText ? loadingText : children}</span>
      {pending ? <Spinner /> : trailing}
    </button>
  );
};

export default ActionButton;
