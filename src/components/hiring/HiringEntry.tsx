import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { claimHiringApi } from '../../api';
import styles from '../scholarship/Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/**
 * Where a hiring invitation lands: /hiring/start?t=…
 *
 * The hiring team added this candidate and the invitation email carried a
 * personal link. This screen exchanges the link's token for a session, stores
 * it under the same keys the login form uses, and moves on to the test's
 * instructions. Like the scholarship entry, it never starts the clock itself.
 */
const HiringEntry: React.FC<Props> = ({ onSession }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // StrictMode runs effects twice in development; spend the token once.
  const claimed = useRef(false);

  useEffect(() => {
    const token = params.get('t') ?? '';
    if (!token) {
      setError('This link is missing its access code. Please use the link from your invitation email.');
      return;
    }
    if (claimed.current) return;
    claimed.current = true;

    (async () => {
      try {
        const res = await claimHiringApi(token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('isLoggedIn', 'true');
        // Scoped to this one test; the instructions page hands it to startAttempt.
        sessionStorage.setItem(`hiring.invite.${res.assessmentId}`, res.inviteToken);
        sessionStorage.setItem('hiring.company', res.companyName);

        onSession();
        navigate(`/hiring/instructions/${res.assessmentId}`, { replace: true });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'We could not open your test.');
      }
    })();
  }, [params, navigate, onSession]);

  if (error) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>Online assessment</p>
          <h1 className={styles.title}>We could not open your test</h1>
          <p className={styles.lede}>{error}</p>
          <p className={styles.footnote}>
            Test links are personal and expire after a few days. If yours has expired, reply to your
            invitation email and ask the hiring team to send a new one.
          </p>
          <p className={styles.footnote}>You can close this tab now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={`${styles.card} ${styles.centered}`}>
        <div className={styles.spinner} />
        <h1 className={styles.title}>Opening your test…</h1>
        <p className={styles.lede}>One moment while we set up your session.</p>
      </div>
    </div>
  );
};

export default HiringEntry;
