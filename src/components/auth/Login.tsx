import React, { useState } from 'react';
import styles from './Login.module.css';
import loginArt from '../../assets/apploginpage.png';
import ForgotPasswordModal from './ForgotPasswordModal';
import { loginApi } from '../../api';

interface LoginProps {
  onLogin: () => void;
}

/** The K mark, drawn so it stays crisp beside the wordmark at any size. */
const Mark: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path d="M4 3h7v26H4z" fill="#CE9C3C" />
    <path d="M11 16 21 3h8L19 16z" fill="#E9C273" />
    <path d="M11 16h8l10 13h-8z" fill="#B5701F" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon: React.FC<{ off: boolean }> = ({ off }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginApi(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoading(false);
      onLogin();
    } catch (err: any) {
      setIsLoading(false);
      // Never suggest an account to try: this message is shown to everyone who
      // mistypes a password, including people who should not have one.
      setError(err.message || 'Invalid email or password.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className={styles.page}>
      {/* ── Brand panel ──
          One artwork carrying the logo, headline and feature row. Its alt text
          repeats that wording, because a screen reader gets nothing from a
          picture of words. Dropped below 960px, where it would be unreadable. */}
      <div className={styles.panel}>
        <img
          src={loginArt}
          className={styles.panelArt}
          alt="Knovate Learning Management System. Learn today, build tomorrow — access your courses, track your progress, and achieve your goals, all in one place. Personalised learning paths, expert instructors, progress tracking and certificates."
        />
      </div>

      {/* ── Sign-in card ── */}
      <div className={styles.formPanel}>
        <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
          <span className={styles.cardLogo}><Mark size={32} /> Knovate</span>
          <h1 className={styles.heading}>LMS Login</h1>
          <p className={styles.sub}>Continue your learning journey. Sign in to your account.</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><MailIcon /></span>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><LockIcon /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.reveal}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>

            <div className={styles.rowEnd}>
              <button type="button" className={styles.link} onClick={() => setForgotOpen(true)}>
                Forgot password?
              </button>
            </div>

            {error && (
              <div className={styles.errorMsg} role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.errorIcon}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button id="login-submit-btn" type="submit" className={styles.loginBtn} disabled={isLoading}>
              {isLoading ? (
                <span className={styles.spinner} aria-label="Logging in…" />
              ) : (
                <>
                  Log in
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnArrow} aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        initialEmail={email}
      />
    </div>
  );
};

export default Login;
