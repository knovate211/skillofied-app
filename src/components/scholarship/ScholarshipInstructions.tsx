import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AssessmentSummaryItem, listAssessmentsApi, startAttemptApi } from '../../api';
import knovateLogo from '../../assets/knovate-logo.png';
import PermissionCard, { type PermState } from './PermissionCard';
import SystemCheck, { runChecks } from './SystemCheck';
import styles from './Scholarship.module.css';

/**
 * The last screen before the clock starts.
 *
 * Deliberately a separate step from the hand-off: the entry screen spends the
 * candidate's token the moment they arrive, but nothing here calls startAttempt
 * until they press the button. That gap is the whole point — a one-attempt,
 * server-timed exam should never begin because somebody followed a link.
 *
 * The layout follows the shape candidates already know from other assessment
 * platforms: what the test is fixed on the left, everything they have to read
 * scrolling on the right, and the one irreversible button pinned where it
 * cannot be hit by accident on the way past.
 */

/** "20 MCQ · 2 Coding" → rows for the format table. The string is built
 *  server-side with a fixed shape, so this stays a display concern rather than
 *  another field to thread through the API. */
function parseSections(summary: string): { label: string; count: string }[] {
  return summary
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const m = part.match(/^(\d+)\s+(.*)$/);
      return m ? { label: m[2], count: m[1] } : { label: part, count: '—' };
    });
}

const ScholarshipInstructions: React.FC = () => {
  const { assessmentId = '' } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<AssessmentSummaryItem | null>(null);
  const [loadError, setLoadError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState('');

  const checks = useMemo(() => runChecks(), []);

  // Two steps: read, then grant. Splitting them means each permission is an
  // explicit act with its own result, rather than a prompt fired at somebody
  // still reading — and it puts the irreversible button behind a screen where
  // the candidate can see that everything the test needs is actually working.
  const [step, setStep] = useState<0 | 1>(0);
  const [openCard, setOpenCard] = useState<string | null>('camera');
  const [camera, setCamera] = useState<PermState>('idle');
  const [cameraMsg, setCameraMsg] = useState('');
  const [monitors, setMonitors] = useState<PermState>('idle');
  const [monitorMsg, setMonitorMsg] = useState('');
  const [screenState, setScreenState] = useState<PermState>('idle');

  const watched = !!assessment?.proctoring?.webcam;
  const needsScreen = !!assessment?.proctoring?.requireFullscreen;
  const sections = useMemo(
    () => parseSections(assessment?.sectionSummary ?? ''),
    [assessment?.sectionSummary],
  );

  // Fullscreen can be lost by pressing Escape on this very screen, so the card
  // has to follow the browser rather than remember what it once granted.
  useEffect(() => {
    const sync = () => setScreenState(document.fullscreenElement ? 'ok' : 'idle');
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  const grantCamera = async () => {
    setCamera('busy');
    setCameraMsg('');
    try {
      // Released immediately: this establishes permission, and the player
      // re-acquires when the test actually starts. Holding a stream open behind
      // a page nobody is watching lights the candidate's camera for no reason.
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setCamera('ok');
      setOpenCard(needsScreen && !document.fullscreenElement ? 'screen' : null);
    } catch (e) {
      const name = e instanceof Error ? e.name : '';
      setCamera('failed');
      setCameraMsg(
        name === 'NotFoundError'
          ? 'No camera or microphone was found on this device.'
          : 'Access was blocked. Allow it from the icon in your browser’s address bar, then try again.',
      );
    }
  };

  const checkMonitors = async () => {
    setMonitors('busy');
    // screen.isExtended answers "is this desktop spread over more than one
    // display" without any permission prompt. It is not in every browser, and
    // where it is missing this says so rather than quietly passing.
    const sc = window.screen as Screen & { isExtended?: boolean };
    if (typeof sc.isExtended !== 'boolean') {
      setMonitors('unsupported');
      setMonitorMsg('Your browser does not report display setup. Please disconnect any second screen yourself.');
      return;
    }
    if (sc.isExtended) {
      setMonitors('failed');
      setMonitorMsg('A second display is connected. Disconnect it and check again.');
    } else {
      setMonitors('ok');
      setMonitorMsg('');
    }
  };

  const enterScreen = async () => {
    setScreenState('busy');
    try {
      await document.documentElement.requestFullscreen();
      setScreenState('ok');
      setOpenCard(null);
    } catch {
      setScreenState('failed');
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await listAssessmentsApi();
        if (cancelled) return;
        const found = list.find((a) => a.id === assessmentId);
        if (!found) {
          setLoadError('We could not find your test. It may have closed, or this link may belong to a different account.');
          return;
        }
        // Someone returning mid-test goes straight back into their paper rather
        // than reading the rules again while their clock runs down.
        if (found.liveAttemptId) {
          navigate(`/placement/tests/attempt/${found.liveAttemptId}`, { replace: true });
          return;
        }
        setAssessment(found);
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : 'We could not load your test.');
      }
    })();
    return () => { cancelled = true; };
  }, [assessmentId, navigate]);

  const start = async () => {
    setStarting(true);
    setStartError('');
    try {
      // Requested here because this click is the user gesture browsers demand,
      // and because the player is reached by client-side navigation — the
      // document never reloads, so full screen carries into the test. Failure
      // is ignored on purpose: a browser that refuses must not stop someone
      // sitting their paper.
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      } catch {
        /* the player asks again, visibly, if it is still needed */
      }
      const inviteToken = sessionStorage.getItem(`scholarship.invite.${assessmentId}`) ?? '';
      const state = await startAttemptApi(assessmentId, inviteToken);
      sessionStorage.removeItem(`scholarship.invite.${assessmentId}`);
      navigate(`/placement/tests/attempt/${state.attemptId}`, { replace: true });
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'We could not start your test.');
      setStarting(false);
    }
  };

  if (loadError) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <p className={styles.eyebrow}>Scholarship</p>
          <h1 className={styles.title}>We could not open your test</h1>
          <p className={styles.lede}>{loadError}</p>
          <button className={styles.ghostBtn} onClick={() => navigate('/placement')}>
            Go to my dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className={styles.screen}>
        <div className={`${styles.card} ${styles.centered}`}>
          <div className={styles.spinner} />
          <p className={styles.lede}>Loading your test…</p>
        </div>
      </div>
    );
  }

  const blocked = !assessment.canStart;

  // Named rather than merely disabled: a greyed-out button with no explanation
  // is the single most frustrating thing to meet on the way into an exam.
  const blockers = [
    ...(watched && camera !== 'ok' ? ['allow your camera'] : []),
    ...(needsScreen && screenState !== 'ok' ? ['enter full screen'] : []),
    ...(agreed ? [] : ['tick the box above']),
  ];
  const canStart = !blocked && blockers.length === 0;

  return (
    <div className={styles.briefing}>
      {/* ── what the test is ─────────────────────────────────────────────── */}
      <aside className={styles.brief}>
        <img src={knovateLogo} alt="Knovate" className={styles.briefLogo} />
        <h1 className={styles.briefTitle}>{assessment.title}</h1>
        {assessment.description ? (
          <p className={styles.briefDesc}>{assessment.description}</p>
        ) : null}

        <div className={styles.briefPill}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
          Test duration: {assessment.durationMinutes} minutes
        </div>

        <div className={styles.briefFoot}>
          <span>Powered by <strong>Knovate</strong></span>
          <span className={styles.briefFootMeta}>
            {assessment.totalMarks} marks · {assessment.questionCount} questions ·{' '}
            {assessment.maxAttempts === 1 ? 'one attempt' : `${assessment.maxAttempts} attempts`}
          </span>
        </div>
      </aside>

      {/* ── what they have to read ───────────────────────────────────────── */}
      <main className={styles.briefMain}>
        <div className={styles.briefScroll}>
          {step === 0 ? (
          <>
          <h2 className={styles.briefH2}>Instructions</h2>

          <h3 className={styles.briefH3}>How test timing works</h3>
          <p className={styles.briefP}>
            Make sure you can complete this test in one sitting — the timer cannot be stopped once
            you begin. Pressing <strong>Start my test</strong> starts your clock, and it keeps
            running whether or not you are looking at the test. It does not pause if you close the
            tab, log out, or lose your connection.
          </p>

          <h3 className={styles.briefH3}>A few things to consider</h3>
          <ul className={styles.briefUl}>
            <li>This is a programming test. Expect multiple-choice questions and live coding.</li>
            <li>
              You have <strong>{assessment.maxAttempts === 1 ? 'one attempt' : `${assessment.maxAttempts} attempts`}</strong>.
              When you submit, or when the time runs out, that is your result.
            </li>
            <li>
              Work somewhere quiet on a laptop or desktop with a stable connection, and close
              anything that might interrupt you.
            </li>
            <li>Use a recent Chrome, Edge or Firefox. The code editor needs the screen space.</li>
            <li>Your answers save as you go, so a refresh or a crash will not lose your work.</li>
          </ul>

          <h3 className={styles.briefH3}>Test instructions</h3>
          <ul className={styles.briefUl}>
            <li>
              Where a coding question gives you a function signature, complete the function only —
              input, output and the surrounding program are handled for you.
            </li>
            <li>
              <strong>Run</strong> tries your code against the visible examples and scores nothing.
              <strong> Submit</strong> grades it against hidden cases, and your best submission for
              each question is the one that counts.
            </li>
            <li>You can print to the console to debug — <code>print</code>, <code>console.log</code>, <code>cout</code>, whichever your language uses.</li>
            <li>The <strong>Custom input</strong> tab runs your file exactly as written with input you supply.</li>
          </ul>

          <h3 className={styles.briefH3}>What is monitored</h3>
          <ul className={styles.briefUl}>
            <li>
              The test runs full screen. Leaving it, or switching to another tab or window, is
              recorded and shown to the reviewer.
            </li>
            {assessment.proctoring?.blockCopyPaste ? (
              <li>Copy and paste are disabled inside the test, and attempts are recorded.</li>
            ) : null}
            {watched ? (
              <li>
                {/* Stated before consent, and stated exactly — this is the
                    difference between monitoring somebody and recording them. */}
                <strong>Your camera and microphone stay on for the whole test</strong>, and you will
                see yourself in the corner. Nothing is filmed or saved: we check that a camera is
                present, uncovered and showing someone, and note if voices are heard. Blocking or
                covering it is recorded.
              </li>
            ) : (
              <li>There is no webcam and no screen recording.</li>
            )}
          </ul>

          <h3 className={styles.briefH3}>Test format</h3>
          <div className={styles.formatTable}>
            <div className={`${styles.formatRow} ${styles.formatHead}`}>
              <span>No.</span><span>Section</span><span>Questions</span>
            </div>
            {sections.length ? sections.map((s, i) => (
              <div className={styles.formatRow} key={s.label}>
                <span>{i + 1}</span><span>{s.label}</span><span>{s.count}</span>
              </div>
            )) : (
              <div className={styles.formatRow}>
                <span>1</span><span>All questions</span><span>{assessment.questionCount}</span>
              </div>
            )}
          </div>

          <h3 className={styles.briefH3}>Before you start</h3>
          <SystemCheck checks={checks} />
          </>
        ) : (
          <>
          <h2 className={styles.briefH2}>Integrity guidelines</h2>
          <p className={styles.briefP}>
            This test is monitored. Switching away from it, blocking the camera when one is
            required, or anything else that looks like outside help is recorded and shown to the
            reviewer alongside your answers. Nothing here fails you automatically — a person reads
            it — but it is read.
          </p>

          <h3 className={styles.briefH3}>Permissions</h3>
          <p className={styles.briefP} style={{ marginBottom: 14 }}>
            Grant these before you begin. Sorting them out now costs nothing; sorting them out with
            the clock running costs you minutes of your test.
          </p>

          <div className={styles.permList}>
            {watched ? (
              <PermissionCard
                icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>}
                title="Allow camera and microphone"
                body={cameraMsg || 'Your camera and microphone are watched for the length of the test, so we can tell that a real person is sitting it. Nothing is filmed or saved — we check that a camera is present, uncovered and showing someone, and note if voices are heard.'}
                required
                state={camera}
                okLabel="Allowed"
                failLabel="Blocked"
                actionLabel="Grant access"
                onAction={grantCamera}
                open={openCard === 'camera'}
                onToggle={() => setOpenCard(openCard === 'camera' ? null : 'camera')}
              />
            ) : null}

            <PermissionCard
              icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}
              title="Check for multiple monitors"
              body={monitorMsg || 'A second screen makes it easy to keep notes or another browser in view. We check whether your desktop is spread across more than one display.'}
              required={false}
              state={monitors}
              okLabel="Single display"
              failLabel="Second display found"
              actionLabel="Run check"
              onAction={checkMonitors}
              open={openCard === 'monitors'}
              onToggle={() => setOpenCard(openCard === 'monitors' ? null : 'monitors')}
            />

            {needsScreen ? (
              <PermissionCard
                icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M16 21h3a2 2 0 0 0 2-2v-3M8 21H5a2 2 0 0 1-2-2v-3"/></svg>}
                title="Enter full screen"
                body="The test runs full screen so nothing else is competing for your attention. Leaving it during the test is recorded."
                required
                state={screenState}
                okLabel="Full screen"
                failLabel="Not granted"
                actionLabel="Enter full screen"
                onAction={enterScreen}
                open={openCard === 'screen'}
                onToggle={() => setOpenCard(openCard === 'screen' ? null : 'screen')}
              />
            ) : null}
          </div>
          </>
        )}
        </div>

        {/* ── the one irreversible action ─────────────────────────────── */}
        <footer className={styles.briefFooter}>
          {step === 1 ? (
            <label className={styles.consent}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>
                I have read the instructions and the integrity guidelines, I am ready to sit the
                whole {assessment.durationMinutes} minutes now, and I understand this is my one
                attempt{watched ? ', and I consent to my camera and microphone being monitored while I sit it' : ''}.
              </span>
            </label>
          ) : null}

          {blocked && assessment.blockedReason ? (
            <div className={styles.errorBox}>{assessment.blockedReason}</div>
          ) : null}
          {startError ? <div className={styles.errorBox}>{startError}</div> : null}

          <div className={styles.briefActions}>
            <div className={styles.dots} aria-hidden>
              <span className={step === 0 ? styles.dotOn : styles.dot} />
              <span className={step === 1 ? styles.dotOn : styles.dot} />
            </div>

            {step === 0 ? (
              <>
                <span className={styles.briefNote}>
                  Nothing starts yet — the next screen sets up what the test needs.
                </span>
                <button className={styles.primaryBtn} onClick={() => setStep(1)}>Continue</button>
              </>
            ) : (
              <>
                <span className={styles.briefNote}>
                  {blockers.length
                    ? `Still to do: ${blockers.join(', ')}.`
                    : 'Your link stays valid for three days — the clock only starts when you press the button.'}
                </span>
                <button className={styles.ghostBtn} onClick={() => setStep(0)}>Back</button>
                <button
                  className={styles.primaryBtn}
                  onClick={start}
                  disabled={!canStart || starting}
                >
                  {starting ? 'Starting…' : 'Start test'}
                </button>
              </>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ScholarshipInstructions;
