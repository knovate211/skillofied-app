import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { claimScholarshipApi } from '../../api';
import styles from './Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/**
 * The landing point for a scholarship link: /scholarship/start?t=…
 *
 * The token in the URL is not a session — it is a one-time coupon for one. This
 * screen spends it, stores the session the server hands back under the same
 * localStorage keys the login form uses, and moves the candidate on to the
 * instructions. Every authenticated call in the app then works unchanged.
 *
 * It never starts the test itself. Nobody should have a clock running before
 * they have read the rules.
 */
const ScholarshipEntry: React.FC<Props> = ({ onSession }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // React 18 StrictMode mounts effects twice in development. The token survives
  // repeat use inside its window, but spending it twice would still be sloppy.
  const claimed = useRef(false);

  useEffect(() => {
    const token = params.get('t') ?? '';
    if (!token) {
      setError('This link is missing its access code. Please use the link from your email.');
      return;
    }
    if (claimed.current) return;
    claimed.current = true;

    (async () => {
      try {
        const res = await claimScholarshipApi(token);

        // The same three keys the login form writes — see api.ts. Setting them
        // is what makes this a real session rather than a special case.
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('isLoggedIn', 'true');
        // The invite token rides along to StartAttempt. It is scoped to this one
        // assessment and is useless anywhere else, so sessionStorage is enough.
        sessionStorage.setItem(`scholarship.invite.${res.assessmentId}`, res.inviteToken);

        onSession();
        navigate(`/scholarship/instructions/${res.assessmentId}`, { replace: true });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'We could not open your test.');
      }
    })();
  }, [params, navigate, onSession]);

  if (error) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>Scholarship</p>
          <h1 className={styles.title}>We could not open your test</h1>
          <p className={styles.lede}>{error}</p>
          <p className={styles.footnote}>
            Links expire three days after you apply. Applying again with the same email address
            sends a fresh one — you will not lose your place.
          </p>
          {/* No "sign in" here: a scholarship applicant has no password to sign
              in with — the link was their only way in. Offering a login sends
              them to a form they can never complete. There is nothing more for
              them to do on this page, so we say so plainly. */}
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

export default ScholarshipEntry;
