import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { claimCertificationApi } from '../../api';
import styles from '../scholarship/Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/**
 * Where a certification exam link lands: /certification/start?t=…
 *
 * Same shape as the scholarship and hiring entries — spend the token, store the
 * session under the keys the login form uses, move on to the rules — with one
 * difference that matters: this candidate has paid. So a failure here is never
 * a dead end. Every message points at a way to get the exam back, because the
 * alternative is somebody who is out of pocket and out of options.
 */
const CertificationEntry: React.FC<Props> = ({ onSession }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // StrictMode runs effects twice in development; spend the token once.
  const claimed = useRef(false);

  useEffect(() => {
    const token = params.get('t') ?? '';
    if (!token) {
      setError('This link is missing its access code. Please use the link from your confirmation email.');
      return;
    }
    if (claimed.current) return;
    claimed.current = true;

    (async () => {
      try {
        const res = await claimCertificationApi(token);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('isLoggedIn', 'true');
        // Scoped to this one exam and useless anywhere else, so sessionStorage
        // is enough. The instructions screen reads it to start the attempt.
        sessionStorage.setItem(`certification.invite.${res.assessmentId}`, res.inviteToken);

        onSession();
        navigate(`/certification/instructions/${res.assessmentId}`, { replace: true });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'We could not open your exam.');
      }
    })();
  }, [params, navigate, onSession]);

  if (error) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>Certification</p>
          <h1 className={styles.title}>We could not open your exam</h1>
          <p className={styles.lede}>{error}</p>
          <p className={styles.footnote}>
            Your registration is safe. Email us and we will send a fresh link — you have not lost
            the exam you paid for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={`${styles.card} ${styles.centered}`}>
        <div className={styles.spinner} />
        <h1 className={styles.title}>Opening your exam…</h1>
        <p className={styles.lede}>One moment while we set up your session.</p>
      </div>
    </div>
  );
};

export default CertificationEntry;
