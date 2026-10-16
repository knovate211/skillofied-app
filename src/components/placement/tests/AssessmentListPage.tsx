import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  AssessmentSummaryItem,
  AttemptSummary,
  getMyAttemptsApi,
  listAssessmentsApi,
  startAttemptApi,
} from '../../../api';
import styles from './Tests.module.css';
import ActionButton from '../../common/ActionButton';
import { useNavigatePending } from '../../../hooks/useNavigatePending';

const SCOPES = [
  { id: '', label: 'All tests' },
  { id: 'invited', label: 'Company drives' },
  { id: 'completed', label: 'Attempted' },
];

function logoColor(name: string): string {
  const palette = ['#4285F4', '#00A4EF', '#F74F00', '#FF9900', '#2D6BE4', '#E91E63', '#009688', '#9C27B0'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

/** Lists the tests a student can take, with a rules confirmation before start. */
const AssessmentListPage: React.FC = () => {
  const navigate = useNavigate();
  const { go, isPending } = useNavigatePending();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token') ?? '';
  const [scope, setScope] = useState('');
  const [items, setItems] = useState<AssessmentSummaryItem[]>([]);
  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<AssessmentSummaryItem | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    (async () => {
      try {
        const [list, mine] = await Promise.all([listAssessmentsApi(scope), getMyAttemptsApi()]);
        if (cancelled) return;
        setItems(list);
        setAttempts(mine);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load tests.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [scope]);

  const start = async (item: AssessmentSummaryItem) => {
    setStarting(true);
    setError('');
    try {
      // Invites normally resolve from the signed-in user's email; an explicit
      // token covers the case where they registered under a different address
      // than the recruiter invited.
      const state = await startAttemptApi(item.id, inviteToken);
      navigate(`/placement/tests/attempt/${state.attemptId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start this test.');
      setSelected(null);
    } finally {
      setStarting(false);
    }
  };

  const latestAttemptFor = (assessmentId: string) =>
    attempts.find((a) => a.assessmentId === assessmentId && a.status !== 'in_progress');

  return (
    <div className={styles.list}>
      <div className={styles.filterRow}>
        {SCOPES.map((s) => (
          <button
            key={s.id}
            className={`${styles.filterChip} ${scope === s.id ? styles.filterChipActive : ''}`}
            onClick={() => setScope(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error ? <div className={styles.errorBox}>{error}</div> : null}

      {loading ? (
        <div className={styles.empty}>Loading tests…</div>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          {scope === 'invited'
            ? 'No company drives yet. When a partner company invites you, the test appears here.'
            : 'No tests available right now.'}
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => {
            const color = logoColor(item.companyName || item.title);
            const done = latestAttemptFor(item.id);
            const resuming = !!item.liveAttemptId;

            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.logo} style={{ background: `${color}18`, color }}>
                    {item.companyLogo
                      ? <img src={item.companyLogo} alt="" />
                      : (item.companyName || item.title).charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardSub}>{item.companyName || 'Skillofied practice'}</p>
                  </div>
                  {item.purpose === 'hiring' ? <span className={styles.hiringBadge}>Hiring</span> : null}
                </div>

                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Duration</span>
                    <span className={styles.metaValue}>{item.durationMinutes} min</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Questions</span>
                    <span className={styles.metaValue}>{item.questionCount}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Marks</span>
                    <span className={styles.metaValue}>{item.totalMarks}</span>
                  </div>
                </div>

                {item.sectionSummary ? (
                  <p className={styles.cardSub}>{item.sectionSummary}</p>
                ) : null}

                <div className={styles.cardFooter}>
                  <span className={styles.blockedText}>
                    {resuming
                      ? 'Attempt in progress'
                      : done
                        ? `Scored ${done.score}/${done.maxScore}`
                        : item.canStart
                          ? `${item.maxAttempts - item.attemptsUsed} attempt(s) left`
                          : item.blockedReason}
                  </span>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {done ? (
                      <ActionButton
                        className={styles.ghostBtn}
                        onClick={() => go(`/placement/tests/result/${done.id}`)}
                        loading={isPending(`/placement/tests/result/${done.id}`)}
                      >
                        Result
                      </ActionButton>
                    ) : null}
                    <ActionButton
                      className={styles.primaryBtn}
                      disabled={!item.canStart}
                      loading={resuming && isPending(`/placement/tests/attempt/${item.liveAttemptId}`)}
                      loadingText="Resuming…"
                      onClick={() => (resuming
                        ? go(`/placement/tests/attempt/${item.liveAttemptId}`)
                        : setSelected(item))}
                    >
                      {resuming ? 'Resume' : 'Start test'}
                    </ActionButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>{selected.title}</h3>
            <ul className={styles.rules}>
              <li>Duration is <strong>{selected.durationMinutes} minutes</strong>. The timer starts the
                moment you begin and runs on our servers — closing the tab does not pause it.</li>
              <li>{selected.questionCount} questions{selected.sectionSummary ? ` — ${selected.sectionSummary}` : ''}, {selected.totalMarks} marks total.</li>
              <li>Your answers save automatically. If you lose connection, reopen the test and you
                will resume exactly where you left off.</li>
              <li>Coding questions are graded against hidden test cases. You may submit more than
                once — your best submission counts.</li>
              <li>Leaving the test window is recorded and shown to the recruiter.</li>
            </ul>
            <div className={styles.modalActions}>
              <button className={styles.ghostBtn} onClick={() => setSelected(null)} disabled={starting}>
                Cancel
              </button>
              <ActionButton className={styles.primaryBtn} onClick={() => start(selected)} loading={starting}>
                {starting ? 'Starting…' : 'Start now'}
              </ActionButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AssessmentListPage;
