import React, { useState } from 'react';
import styles from './Login.module.css';
import loginIllustration from '../../assets/login_illustration.png';
import knovateLogo from '../../assets/knovate-logo.png';
import { loginApi } from '../../api';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

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
      {/* Left illustration panel with light theme background */}
      <div className={styles.illustrationPanel}>
        <div className={styles.leftLogo}>
          <img src={knovateLogo} alt="Knovate" className={styles.brandLogo} />
        </div>
        <img
          src={loginIllustration}
          alt="Knovate illustration"
          className={styles.illustration}
        />
      </div>

      {/* Right login form panel with light theme warm background */}
      <div className={styles.formPanel}>
        <div className={`${styles.formCard} ${shake ? styles.shake : ''}`}>
          <h1 className={styles.heading}>Login</h1>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email@gmail.com"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>

            <span className={styles.forgotLink}>Forgot password?</span>

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
              {isLoading ? (
                <span className={styles.spinner} aria-label="Logging in…" />
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className={styles.hint}>
            Already user your account?
          </div>

          {/* Social Logins */}
          <div className={styles.socialButtons}>
            <button type="button" className={styles.socialBtn}>
              <span className={styles.socialIcon}>G</span> Google
            </button>
            <button type="button" className={styles.socialBtn}>
              <span className={styles.socialIcon}></span> Apple
            </button>
            <button type="button" className={styles.socialBtn}>
              <span className={styles.socialIcon}>❖</span> Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
