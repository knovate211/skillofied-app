import React, { useEffect, useRef, useState } from 'react';
import { requestPasswordResetApi, confirmPasswordResetApi } from '../../api';
import styles from './ForgotPasswordModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Whatever the learner already typed into the login form's email field. */
  initialEmail?: string;
}

/**
 * 'details' collects the email and the new password together, which is the whole
 * flow when the server resets directly. 'code' only appears if the server asks
 * for one — it does that when mail delivery is configured.
 */
type Step = 'details' | 'code' | 'done';

const MIN_PASSWORD = 8;

/**
 * Purpose-built rather than reusing the shared Modal: that one has a fixed
 * Cancel/Save footer with no busy or multi-step state, and it is themed,
 * whereas the login screen stays on the light palette in both themes.
 */
const ForgotPasswordModal: React.FC<Props> = ({ isOpen, onClose, initialEmail = '' }) => {
  const [step, setStep] = useState<Step>('details');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset to a clean form each time it opens, picking up whatever address the
  // learner had already typed.
  useEffect(() => {
    if (!isOpen) return;
    setStep('details');
    setEmail(initialEmail);
    setPassword('');
    setConfirm('');
    setCode('');
    setError('');
    setIsBusy(false);
  }, [isOpen, initialEmail]);

  // Move focus to the first field of whichever step is showing.
  useEffect(() => {
    if (isOpen) firstFieldRef.current?.focus();
  }, [isOpen, step]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanEmail = email.trim().toLowerCase();

  const submitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Your new password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setIsBusy(true);
    try {
      const { codeRequired } = await requestPasswordResetApi(cleanEmail);
      if (codeRequired) {
        // Mail delivery is on, so the password only applies once the emailed
        // code is supplied. Deliberately says nothing about whether the address
        // had an account.
        setStep('code');
        return;
      }
      await confirmPasswordResetApi(cleanEmail, '', password);
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Could not update your password. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code from your email.');
      return;
    }

    setIsBusy(true);
    try {
      await confirmPasswordResetApi(cleanEmail, code.trim(), password);
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Could not update your password. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  const errorBox = error ? (
    <div className={styles.errorMsg} role="alert">
      {error}
    </div>
  ) : null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Reset your password"
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {step === 'details' && (
          <>
            <p className={styles.eyebrow}>Forgot password</p>
            <h2 className={styles.title}>Reset your password</h2>
            <p className={styles.sub}>
              Enter your account email and choose a new password.
            </p>

            <form onSubmit={submitDetails}>
              <div className={styles.field}>
                <label htmlFor="fp-email" className={styles.label}>Account email</label>
                <input
                  id="fp-email"
                  ref={firstFieldRef}
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="fp-password" className={styles.label}>New password</label>
                <input
                  id="fp-password"
                  type="password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`At least ${MIN_PASSWORD} characters`}
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="fp-confirm" className={styles.label}>Confirm new password</label>
                <input
                  id="fp-confirm"
                  type="password"
                  className={styles.input}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your new password"
                  autoComplete="new-password"
                />
              </div>

              {errorBox}

              <button type="submit" className={styles.primaryBtn} disabled={isBusy}>
                {isBusy ? <span className={styles.spinner} aria-label="Saving…" /> : 'Reset password'}
              </button>
            </form>
          </>
        )}

        {step === 'code' && (
          <>
            <p className={styles.eyebrow}>Check your email</p>
            <h2 className={styles.title}>Enter your code</h2>
            <p className={styles.sub}>
              If <b className={styles.strong}>{cleanEmail}</b> has an account, a 6-digit code is on its way.
              It expires in 15 minutes.
            </p>

            <form onSubmit={submitCode}>
              <div className={styles.field}>
                <label htmlFor="fp-code" className={styles.label}>6-digit code</label>
                <input
                  id="fp-code"
                  ref={firstFieldRef}
                  className={`${styles.input} ${styles.codeInput}`}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </div>

              {errorBox}

              <button type="submit" className={styles.primaryBtn} disabled={isBusy}>
                {isBusy ? <span className={styles.spinner} aria-label="Saving…" /> : 'Confirm new password'}
              </button>
            </form>

            <button
              type="button"
              className={styles.textBtn}
              onClick={() => {
                setStep('details');
                setError('');
              }}
            >
              Start over
            </button>
          </>
        )}

        {step === 'done' && (
          <div className={styles.done}>
            <div className={styles.doneMark}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className={styles.title}>Password updated</h2>
            <p className={styles.sub}>You can now log in with your new password.</p>
            <button className={styles.primaryBtn} onClick={onClose}>
              Back to log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
