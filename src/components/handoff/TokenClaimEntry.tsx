import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { setSession, SessionUser } from '../../lib/session';
import styles from '../scholarship/Scholarship.module.css';

/** What every hand-off claim endpoint returns. */
export interface ClaimResult {
  token: string;
  user: SessionUser;
  assessmentId: string;
  inviteToken: string;
}

interface Props<R extends ClaimResult> {
  /** Spends the one-time token from the link. */
  claim: (token: string) => Promise<R>;
  /** sessionStorage prefix for the invite token, read by the instructions screen. */
  invitePrefix: string;
  /** Where the test's rules are shown. */
  instructionsPath: (assessmentId: string) => string;
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
  /** Anything else this kind of link keeps for the session. */
  onClaimed?: (result: R) => void;
  copy: {
    eyebrow: string;
    /** "your email", "your invitation email" … */
    linkSource: string;
    /** "test" or "exam". */
    noun: string;
    /** What the candidate can do about a failed link. */
    help: React.ReactNode;
  };
}

/**
 * The landing point for a scholarship, hiring or certification link
 * (/…/start?t=…).
 *
 * The token in the URL is not a session — it is a one-time coupon for one. This
 * screen spends it, stores the session the server hands back under the same keys
 * the login form uses, and moves on to the instructions. Every authenticated
 * call in the app then works unchanged. It never starts the test itself: nobody
 * should have a clock running before they have read the rules.
 */
function TokenClaimEntry<R extends ClaimResult>({ claim, invitePrefix, instructionsPath, onSession, onClaimed, copy }: Props<R>) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // React 18 StrictMode mounts effects twice in development. The token survives
  // repeat use inside its window, but spending it twice would still be sloppy.
  const claimed = useRef(false);

  useEffect(() => {
    const token = params.get('t') ?? '';
    if (!token) {
      setError(`This link is missing its access code. Please use the link from ${copy.linkSource}.`);
      return;
    }
    if (claimed.current) return;
    claimed.current = true;

    (async () => {
      try {
        const res = await claim(token);
        setSession(res.token, res.user);
        // Scoped to this one assessment and useless anywhere else, so
        // sessionStorage is enough. The instructions screen hands it to startAttempt.
        sessionStorage.setItem(`${invitePrefix}.invite.${res.assessmentId}`, res.inviteToken);
        onClaimed?.(res);

        onSession();
        navigate(instructionsPath(res.assessmentId), { replace: true });
      } catch (e) {
        setError(e instanceof Error ? e.message : `We could not open your ${copy.noun}.`);
      }
    })();
    // The copy and callbacks are fixed per page; the token is what matters.
  }, [params, navigate, onSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>We could not open your {copy.noun}</h1>
          <p className={styles.lede}>{error}</p>
          {copy.help}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={`${styles.card} ${styles.centered}`}>
        <div className={styles.spinner} />
        <h1 className={styles.title}>Opening your {copy.noun}…</h1>
        <p className={styles.lede}>One moment while we set up your session.</p>
      </div>
    </div>
  );
}

export default TokenClaimEntry;
