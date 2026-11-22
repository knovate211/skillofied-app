import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getCertificationOutcomeApi, type CertificationOutcome } from '../../api';
import knovateLogo from '../../assets/knovate-logo.svg';
import s from './CertificationResult.module.css';

/**
 * /certification/result/:attemptId — the result a paid candidate sees on submit.
 *
 * Standalone on purpose. The generic placement result page sits inside the
 * student portal and judges pass/fail by the paper's own cutoff, so a
 * certification candidate saw a course sidebar, "recruiter" copy and a
 * "Not passed" pill beside a pass. The certification verdict uses the exam's
 * pass mark, and reading the outcome is also what issues the certificate.
 */

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
const fmtDateTime = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '';
const pct = (n?: number) => `${Math.round((n ?? 0) * 10) / 10}%`;
const num = (n?: number) => `${Math.round((n ?? 0) * 100) / 100}`;
const siteOrigin = (examUrl?: string) => {
  try { return examUrl ? new URL(examUrl).origin : ''; } catch { return ''; }
};

function linkedInUrl(o: CertificationOutcome): string {
  const issued = o.issuedAt ? new Date(o.issuedAt) : new Date();
  const q = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: `Knovate Certified — ${o.examTitle ?? ''}`,
    organizationName: 'Knovate',
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certUrl: o.verifyUrl ?? '',
    certId: o.credentialId ?? '',
  });
  return `https://www.linkedin.com/profile/add?${q.toString()}`;
}

const Check = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12l5 5L20 7" /></svg>
);

const ScoreRing: React.FC<{ score: number; pass: number }> = ({ score, pass }) => {
  const c = 2 * Math.PI * 56;
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className={s.ring}>
      <svg width="132" height="132" viewBox="0 0 132 132" role="img" aria-label={`Score ${pct(score)}, pass mark ${pct(pass)}`}>
        <circle cx="66" cy="66" r="56" fill="none" stroke="#F3E7DA" strokeWidth="12" />
        {clamped > 0 && (
          <circle cx="66" cy="66" r="56" fill="none" stroke="#CE7C68" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={`${(clamped / 100) * c} ${c}`} transform="rotate(-90 66 66)" />
        )}
        <line x1="66" y1="4" x2="66" y2="22" stroke="#463A34" strokeWidth="3" transform={`rotate(${pass * 3.6} 66 66)`} />
      </svg>
      <div className={s.ringLabel}><b>{pct(score)}</b><span>your score</span></div>
    </div>
  );
};

const ScoreBar: React.FC<{ score: number; pass: number }> = ({ score, pass }) => {
  const at = (n: number) => `${Math.max(4, Math.min(96, n))}%`;
  return (
    <div aria-hidden="true">
      <div className={s.barLabels}>
        <span style={{ left: at(score), transform: 'translateX(-50%)', color: '#9a4a37', fontWeight: 600 }}>You · {pct(score)}</span>
      </div>
      <div className={s.bar}>
        <div className={s.barFill} style={{ width: `${Math.max(0, Math.min(100, score))}%` }} />
        <div className={s.barMark} style={{ left: `${pass}%` }} />
      </div>
      <div className={s.barLabels}>
        <span style={{ left: at(pass), transform: 'translateX(-50%)', color: '#463A34', fontWeight: 600 }}>Pass · {pct(pass)}</span>
      </div>
    </div>
  );
};

const CertificationResultPage: React.FC = () => {
  const { attemptId = '' } = useParams();
  const navigate = useNavigate();
  const [outcome, setOutcome] = useState<CertificationOutcome | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const load = async () => {
      try {
        const res = await getCertificationOutcomeApi(attemptId);
        if (cancelled) return;
        setOutcome(res);
        setError('');
        // Coding answers grade asynchronously; check again until settled.
        if (res.evaluating) timer = window.setTimeout(load, 4000);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'We could not load your result.');
      }
    };
    void load();
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [attemptId]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the link is shown on the page; copying is only a convenience */
    }
  };

  const o = outcome;
  const site = siteOrigin(o?.examUrl);
  const headerMeta = o?.examTitle
    ? `${o.examTitle}${o.submittedAt ? ` · submitted ${fmtDateTime(o.submittedAt)}` : ''}`
    : '';

  const shell = (content: React.ReactNode, wide = false) => (
    <div className={s.page}>
      <header className={s.header}>
        <span className={s.brand}><img src={knovateLogo} alt="Knovate" className={s.brandLogo} /> <span>· Certification</span></span>
        {headerMeta && <span className={s.headerMeta}>{headerMeta}</span>}
      </header>
      <main className={s.main}>
        <div className={wide ? s.wide : s.narrow}>{content}</div>
      </main>
    </div>
  );

  const simple = (title: string, text: React.ReactNode, extra?: React.ReactNode) =>
    shell(
      <section className={s.card}>
        <p className={s.eyebrow}>Certification result</p>
        <h1 className={s.h1}>{title}</h1>
        <p className={s.lede}>{text}</p>
        {extra}
      </section>,
    );

  if (error) {
    return simple(
      'We could not load your result',
      'Your answers are saved and your exam is submitted. Refresh this page in a moment, or reply to your confirmation email and we will send your result.',
      <div className={s.actions}><button className={s.primary} onClick={() => window.location.reload()}>Refresh</button></div>,
    );
  }
  if (!o) {
    return shell(<section className={s.card} style={{ alignItems: 'center' }}><div className={s.spinner} aria-label="Loading your result" /></section>);
  }
  if (!o.isCertification) {
    return simple('Your test is submitted', 'This result is not part of a certification exam.');
  }
  if (o.evaluating) {
    return simple(
      'Your exam is submitted — marking now',
      'Your answers are being checked against the full test suite. This page updates by itself, usually within a minute.',
      <div className={s.spinner} aria-hidden="true" />,
    );
  }

  const score = o.scorePercent ?? 0;
  const pass = o.passPercent ?? 0;
  const multi = (o.maxAttempts ?? 1) > 1;

  const marksStat = o.maxMarks != null && (
    <div className={s.stat}><b>{num(o.marks)} / {num(o.maxMarks)}</b><span>Marks</span></div>
  );
  const timeStat = o.timeTakenMinutes != null && (
    <div className={s.stat}>
      <b>{o.timeTakenMinutes} min</b>
      <span>Time taken{o.durationMinutes ? ` of ${o.durationMinutes}` : ''}</span>
    </div>
  );

  // ── Passed ──────────────────────────────────────────────────────────────
  if (o.passed) {
    const cvLine = `Knovate Certified — ${o.examTitle}${o.credentialId ? `, ${o.credentialId}` : ''}`;
    return shell(
      <>
        <section className={`${s.card} ${s.passCard}`}>
          <div className={s.chips}>
            <span className={`${s.chip} ${s.chipPass}`}><Check />Passed</span>
            {multi && <span className={s.chip}>On attempt {o.attemptNo} of {o.maxAttempts}</span>}
          </div>
          <div>
            <h1 className={s.h1}>Congratulations — you are certified.</h1>
            <p className={s.lede} style={{ marginTop: 10 }}>
              You scored <b>{pct(score)}</b> on {o.examTitle}, above the {pct(pass)} pass mark.
              {o.credentialId ? ' Your certificate is live now.' : ''}
            </p>
          </div>

          <div className={s.stats}>
            <div className={s.stat}><b>{pct(score)}</b><span>Score · pass mark {pct(pass)}</span></div>
            {marksStat}
          </div>

          {o.verifyUrl ? (
            <>
              <div className={s.actionsCol}>
                <a className={s.primary} href={o.verifyUrl} target="_blank" rel="noreferrer">View your certificate</a>
                <div className={s.pair}>
                  <a className={s.secondary} href={linkedInUrl(o)} target="_blank" rel="noreferrer">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>
                    Add to LinkedIn
                  </a>
                  <button className={s.secondary} onClick={() => copy(o.verifyUrl!)}>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
                    {copied ? 'Link copied' : 'Copy link'}
                  </button>
                </div>
              </div>
              <div className={s.note}>
                <b>Your verification link</b><br />
                <span className={s.mono}>{o.verifyUrl.replace(/^https?:\/\//, '')}</span><br />
                Anyone — an employer, a recruiter — can open it to confirm your certificate is genuine.
              </div>
            </>
          ) : (
            <div className={s.note}>
              <b>Your certificate is being prepared.</b> Refresh this page in a minute — it appears here
              and in your confirmation email thread.
            </div>
          )}
        </section>

        <aside className={s.aside}>
          <div className={s.certFrame}>
            <div className={s.cert}>
              <p className={s.certKicker}>Knovate · Certificate of achievement</p>
              <p className={s.certName}>{o.holderName}</p>
              <p className={s.certSmall}>has passed the certification exam in</p>
              <p className={s.certTitle}>{o.examTitle}</p>
              <div className={s.certFoot}>
                <span>Credential ID<br /><b className={s.mono}>{o.credentialId ?? '—'}</b></span>
                <span style={{ textAlign: 'center' }}>Score<br /><b>{pct(score)}</b></span>
                <span style={{ textAlign: 'right' }}>Issued<br /><b>{fmtDate(o.issuedAt) || '—'}</b></span>
              </div>
            </div>
          </div>
          <p className={s.centerNote}>
            The name is printed as you registered it. Spotted a mistake?{' '}
            {site ? <a href={`${site}/contact`} target="_blank" rel="noreferrer">Contact us</a> : 'Reply to your confirmation email'}.
          </p>
        </aside>

        <section className={`${s.card} ${s.full}`}>
          <h2 className={s.h2}>Make the most of it</h2>
          <div className={s.tips}>
            <div className={s.tip}>
              <b>Add it to LinkedIn</b>
              <span>Under Licenses &amp; certifications, with the credential ID and verification link filled in.</span>
            </div>
            <div className={s.tip}>
              <b>Put it on your CV</b>
              <span>“{cvLine}”. Recruiters can check it in seconds.</span>
            </div>
            <div className={s.tip}>
              <b>Keep your credential ID</b>
              <span>It is how your certificate is looked up on the verify page — note it down somewhere safe.</span>
            </div>
          </div>
        </section>
      </>,
      true,
    );
  }

  // ── Not passed ──────────────────────────────────────────────────────────
  const left = o.attemptsLeft ?? 0;
  const canRetake = left > 0 && !!o.assessmentId;
  const short = Math.max(0, Math.round((pass - score) * 10) / 10);
  const nextNo = (o.attemptNo ?? 1) + 1;
  const resitDate = fmtDate(o.resitFrom);

  return shell(
    <>
      <section className={s.card}>
        <div className={s.verdict}>
          <ScoreRing score={score} pass={pass} />
          <div className={s.verdictText}>
            <p className={s.eyebrow}>
              Certification result{multi ? ` · attempt ${o.attemptNo} of ${o.maxAttempts}` : ''}
            </p>
            <h1 className={s.h1}>
              {canRetake ? `Not passed yet — you have ${left === 1 ? 'one more attempt' : `${left} more attempts`}` : 'Not passed this time'}
            </h1>
            {o.endedByProctor && (
              <p className={s.lede} role="alert">
                <b>Your test was ended because you left the test window too many times.</b>{' '}
                The answers you had saved were marked.
              </p>
            )}
            <p className={s.lede}>
              You were <b>{short} points</b> short of the {pct(pass)} pass mark.{' '}
              {canRetake
                ? 'Your fee already covers the next attempt, and it gives you a different set of questions.'
                : 'Your attempts on this registration are complete, and nothing more is charged.'}
            </p>
          </div>
        </div>

        <ScoreBar score={score} pass={pass} />

        <div className={s.stats}>
          {marksStat}
          {timeStat}
          {canRetake ? (
            <div className={s.stat}><b>{left}</b><span>{left === 1 ? 'Attempt left' : 'Attempts left'}</span></div>
          ) : resitDate ? (
            <div className={s.stat}><b>{resitDate}</b><span>Resit opens</span></div>
          ) : null}
        </div>

        {canRetake && (
          <div className={s.actions}>
            <button className={s.primary} onClick={() => navigate(`/certification/instructions/${o.assessmentId}`)}>
              Start attempt {nextNo}
            </button>
          </div>
        )}
      </section>

      <section className={s.card} style={{ gap: 18 }}>
        <h2 className={s.h2}>What to do next</h2>
        {canRetake ? (
          <ol className={s.steps}>
            <li>
              <span className={s.stepNo}>1</span>
              <div>
                <p className={s.stepTitle}>Take a break if you need one</p>
                <p>No need to start straight away — the link in your email works until it expires.</p>
              </div>
            </li>
            <li>
              <span className={s.stepNo}>2</span>
              <div>
                <p className={s.stepTitle}>Go over the syllabus</p>
                <p>
                  The next paper has new questions on the same topics.{' '}
                  {o.examUrl && <a href={o.examUrl} target="_blank" rel="noreferrer">Open the exam page</a>}
                </p>
              </div>
            </li>
            <li>
              <span className={s.stepNo}>3</span>
              <div>
                <p className={s.stepTitle}>Same rules apply</p>
                <p>The full time limit starts again, with the same proctoring checks as this attempt.</p>
              </div>
            </li>
          </ol>
        ) : (
          <>
            <ol className={s.steps}>
              <li>
                <span className={s.stepNo}>1</span>
                <div>
                  <p className={s.stepTitle}>Review the syllabus</p>
                  <p>
                    The exam page lists every topic the paper covers.{' '}
                    {o.examUrl && <a href={o.examUrl} target="_blank" rel="noreferrer">Open the syllabus</a>}
                  </p>
                </div>
              </li>
              <li>
                <span className={s.stepNo}>2</span>
                <div>
                  <p className={s.stepTitle}>{resitDate ? `Resit from ${resitDate}` : 'Register to resit'}</p>
                  <p>Register again on the exam page once the waiting period ends. You get a fresh paper.</p>
                </div>
              </li>
              {site && (
                <li>
                  <span className={s.stepNo}>3</span>
                  <div>
                    <p className={s.stepTitle}>Want guided preparation?</p>
                    <p>Knovate courses cover these topics in depth, with mentors.</p>
                  </div>
                </li>
              )}
            </ol>
            <div className={s.actions}>
              {o.examUrl && <a className={s.primary} href={o.examUrl} target="_blank" rel="noreferrer">Open the exam page</a>}
              {site && <a className={s.secondary} href={`${site}/courses`} target="_blank" rel="noreferrer">Explore courses</a>}
            </div>
          </>
        )}
      </section>

      <p className={s.centerNote} style={{ fontSize: 14 }}>
        Think something went wrong in your exam?{' '}
        {site ? <a href={`${site}/contact`} target="_blank" rel="noreferrer">Contact us</a> : 'Reply to your confirmation email'}{' '}
        with your registered email.
      </p>
    </>,
  );
};

export default CertificationResultPage;
