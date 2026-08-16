import React, { useState } from 'react';
import styles from './Login.module.css';
import knovateLogo from '../../assets/knovate-logo.png';
import ForgotPasswordModal from './ForgotPasswordModal';
import { loginApi } from '../../api';

interface LoginProps {
  onLogin: () => void;
}

/* The brand panel's scene. Inline rather than an asset so it stays crisp at any
   size. Colours are literal, not tokens: the panel behind it is a fixed light
   gradient, so the figures must not invert with the theme. */
const BrandScene: React.FC = () => (
  <svg viewBox="0 0 460 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M40 340 C40 200 130 120 230 120 C330 120 420 200 420 340"
      stroke="#A9B98B"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="1 22"
      opacity="0.7"
    />

    <g transform="translate(230,210)">
      <circle r="92" fill="#fff" opacity="0.55" />
      <circle r="92" fill="none" stroke="#E7A99A" strokeWidth="3" opacity="0.6" />
    </g>

    <g transform="translate(230,225)">
      <ellipse cx="0" cy="70" rx="66" ry="26" fill="#CE7C68" />
      <circle cx="0" cy="-6" r="52" fill="#F3D2B8" />
      <path
        d="M-52 -10 C-52 -55 -20 -78 0 -78 C20 -78 52 -55 52 -10 C40 -30 20 -40 0 -40 C-20 -40 -40 -30 -52 -10Z"
        fill="#463A34"
      />
      <circle cx="-18" cy="-4" r="5" fill="#463A34" />
      <circle cx="18" cy="-4" r="5" fill="#463A34" />
      <path d="M-14 18 Q0 28 14 18" stroke="#463A34" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>

    <g transform="translate(96,140)">
      <circle r="38" fill="#FBEFD9" stroke="#CE9C3C" strokeWidth="3" />
      <circle cx="0" cy="-4" r="21" fill="#E3B48A" />
      <path
        d="M-21 -6 C-21 -24 -8 -32 0 -32 C8 -32 21 -24 21 -6 C14 -16 6 -20 0 -20 C-6 -20 -14 -16 -21 -6Z"
        fill="#463A34"
      />
      <path d="M-8 6 Q0 12 8 6" stroke="#463A34" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
    <text x="96" y="196" textAnchor="middle" fontWeight="700" fontSize="14" fill="#463A34">
      Liam · Student
    </text>

    <g transform="translate(372,300)">
      <circle r="38" fill="#EBF0E1" stroke="#7E9260" strokeWidth="3" />
      <circle cx="0" cy="-4" r="21" fill="#E3B48A" />
      <path
        d="M-21 -6 C-21 -24 -8 -32 0 -32 C8 -32 21 -24 21 -6 C14 -16 6 -20 0 -20 C-6 -20 -14 -16 -21 -6Z"
        fill="#463A34"
      />
      <path d="M-8 6 Q0 12 8 6" stroke="#463A34" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
    <text x="372" y="356" textAnchor="middle" fontWeight="700" fontSize="14" fill="#463A34">
      Sarah · Mentor
    </text>

    <g stroke="#CE7C68" strokeWidth="2.4" fill="none" strokeLinecap="round">
      <path d="M40 60 l14 14 M54 60 l-14 14" />
      <path d="M400 90 l12 12 M412 90 l-12 12" />
    </g>
    <circle cx="360" cy="50" r="5" fill="#CE9C3C" />
    <circle cx="60" cy="380" r="5" fill="#7E9260" />
    <path d="M300 60 l6 -14 l6 14 l-6 -4 Z" fill="#CE9C3C" />
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setError(err.message || 'Invalid email or password. Try admin@knovate.com / knovate123');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className={styles.page}>
      {/* Left brand panel */}
      <div className={styles.panel}>
        <span className={`${styles.dot} ${styles.dot1}`} />
        <span className={`${styles.dot} ${styles.dot2}`} />
        <span className={`${styles.dot} ${styles.dot3}`} />
        <span className={`${styles.dot} ${styles.dot4}`} />

        <div className={styles.panelBrand}>
          <img src={knovateLogo} alt="Knovate" className={styles.brandLogo} />
        </div>

        <div className={styles.scene}>
          <BrandScene />
        </div>

        <div className={styles.panelCaption}>
          <h3>Learning grows with the right people</h3>
          <p>
            Every course pairs you with mentors and peers on the same path — track progress together, not alone.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.formPanel}>
        <div className={`${styles.formInner} ${shake ? styles.shake : ''}`}>
          <p className={styles.eyebrow}>Welcome back</p>
          <h1 className={styles.heading}>Log in</h1>
          <p className={styles.sub}>Pick up your courses right where you left off.</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
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

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
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

            <button
              id="login-submit-btn"
              type="submit"
              className={styles.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? <span className={styles.spinner} aria-label="Logging in…" /> : 'Log in'}
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
