import React from 'react';

interface Props {
  /** Matches the surrounding text size by default. */
  size?: number;
  className?: string;
}

/**
 * An inline spinner that inherits `currentColor`, so it reads correctly on a
 * filled button, a ghost button, and in either theme without configuration.
 */
const Spinner: React.FC<Props> = ({ size = 14, className }) => (
  <span
    className={className}
    role="status"
    aria-label="Loading"
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      borderRadius: '50%',
      border: `${Math.max(1.5, size / 8)}px solid currentColor`,
      borderTopColor: 'transparent',
      opacity: 0.9,
      animation: 'spin 0.7s linear infinite',
    }}
  />
);

export default Spinner;
