import React, { useCallback, useEffect, useState } from 'react';
import styles from './CollegeSection.module.css';
import {
  answerCollegeRequestApi,
  getCollegeLinkApi,
  linkCollegeApi,
  unlinkCollegeApi,
  type CollegeLinkEntry,
} from '../../api';

/**
 * Profile → College. A student links their account to their college so its
 * placement cell can follow their progress. It is the student's choice, it is
 * explained before they make it, and it can be undone here at any time.
 */

const WHAT_THEY_SEE = 'your course progress, class attendance, test scores and certificates';
const WHAT_THEY_DONT = 'your answers, camera data or messages';

const CollegeSection: React.FC = () => {
  const [college, setCollege] = useState<CollegeLinkEntry | null>(null);
  const [requests, setRequests] = useState<CollegeLinkEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [confirmUnlink, setConfirmUnlink] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await getCollegeLinkApi();
      setCollege(res.college);
      setRequests(res.requests || []);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your college.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const run = async (fn: () => Promise<unknown>, done: string) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await fn();
      setNotice(done);
      setConfirmUnlink(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong, please try again.');
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    void run(async () => {
      const res = await linkCollegeApi({ code: code.trim(), rollNo: rollNo.trim(), branch: branch.trim(), year: year.trim() });
      setCode('');
      return res;
    }, 'Linked. Your placement cell can now follow your progress.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Your college</h2>
        <p className={styles.lede}>
          Link your account to your college and its placement cell can see {WHAT_THEY_SEE}. They never see{' '}
          {WHAT_THEY_DONT}. You can unlink at any time.
        </p>

        {loading ? (
          <p className={styles.muted}>Loading…</p>
        ) : college ? (
          <div className={styles.linked}>
            <div>
              <span className={styles.pill}>Linked</span>
              <p className={styles.collegeName}>{college.name}</p>
              <p className={styles.muted}>
                {[college.city, college.rollNo && `Roll no. ${college.rollNo}`, college.branch, college.year].filter(Boolean).join(' · ')}
              </p>
              {college.linkedAt && (
                <p className={styles.muted}>Since {new Date(college.linkedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              )}
            </div>
            {confirmUnlink ? (
              <div className={styles.confirm} role="alertdialog" aria-label="Unlink from your college">
                <p>Unlink from {college.name}? Their placement cell stops seeing your progress straight away.</p>
                <div className={styles.actions}>
                  <button className={styles.danger} disabled={busy} onClick={() => run(unlinkCollegeApi, 'Unlinked. Your college no longer sees your progress.')}>
                    {busy ? 'Unlinking…' : 'Yes, unlink'}
                  </button>
                  <button className={styles.ghost} onClick={() => setConfirmUnlink(false)}>Keep linked</button>
                </div>
              </div>
            ) : (
              <button className={styles.ghost} onClick={() => setConfirmUnlink(true)}>Unlink</button>
            )}
          </div>
        ) : (
          <>
            {requests.map((r) => (
              <div key={r.collegeId} className={styles.request}>
                <p>
                  <strong>{r.name}</strong>{r.city ? `, ${r.city}` : ''} added you to its student list
                  {r.rollNo ? ` (roll no. ${r.rollNo})` : ''}. Accept to let its placement cell see {WHAT_THEY_SEE}.
                </p>
                <div className={styles.actions}>
                  <button className={styles.primary} disabled={busy} onClick={() => run(() => answerCollegeRequestApi(r.collegeId, 'accept'), `Linked to ${r.name}.`)}>Accept</button>
                  <button className={styles.ghost} disabled={busy} onClick={() => run(() => answerCollegeRequestApi(r.collegeId, 'decline'), 'Request declined.')}>Not my college</button>
                </div>
              </div>
            ))}

            <form className={styles.form} onSubmit={submit}>
              <p className={styles.formTitle}>{requests.length ? 'Or link with a join code' : 'Link with a join code'}</p>
              <p className={styles.muted}>Your placement cell gives you the code — it looks like ABCD-EFGH.</p>
              <label className={styles.field}>
                <span>Join code</span>
                <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="ABCD-EFGH"
                  autoComplete="off" spellCheck={false} maxLength={12} required />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Roll no. <em>optional</em></span>
                  <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} maxLength={40} />
                </label>
                <label className={styles.field}>
                  <span>Branch <em>optional</em></span>
                  <input value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. CSE" maxLength={60} />
                </label>
                <label className={styles.field}>
                  <span>Year <em>optional</em></span>
                  <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. Final year" maxLength={30} />
                </label>
              </div>
              <button type="submit" className={styles.primary} disabled={busy || !code.trim()}>{busy ? 'Linking…' : 'Link my account'}</button>
            </form>
          </>
        )}

        {error && <p className={styles.error} role="alert">{error}</p>}
        {notice && <p className={styles.notice} role="status">{notice}</p>}
      </div>
    </div>
  );
};

export default CollegeSection;
