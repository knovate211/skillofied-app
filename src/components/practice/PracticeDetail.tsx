import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopicType, PracticeProblem } from '../../types';
import { listPracticeSetsApi, listProblemsApi } from '../../api';
import TopicChip from '../common/TopicChip';
import { formatPracticeSetTitle } from '../../utils/practiceHelpers';
import styles from './PracticeDetail.module.css';
import ActionButton from '../common/ActionButton';
import { useNavigatePending } from '../../hooks/useNavigatePending';

// Topic chips are derived from the problems actually in this set, so an SQL
// set shows SQL topics rather than a hardcoded list of DSA categories.
// TOPIC_ORDER puts known topics in a sensible teaching order; anything new
// still appears, sorted alphabetically after them.
const TOPIC_ORDER: TopicType[] = [
  // DSA
  'Array', 'String', 'HashMap', 'Linked List', 'Tree', 'Graph',
  'DP', 'Stack/Queue', 'Heap', 'Backtracking',
  // Language fundamentals
  'Operators', 'Conditionals', 'Loops', 'Functions', 'Arrays', 'Strings', 'Objects',
  // SQL
  'Filtering', 'Aggregation', 'Joins', 'Subqueries', 'Window Functions',
  'String Functions', 'Date Functions', 'Data Modification',
];

/** Levels arrive as "beginner Challenge" — the hero wants just "Beginner". */
const formatDifficulty = (level: string) => {
  const word = (level || '').trim().split(/\s+/)[0] || 'Beginner';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/* Difficulty drives colour throughout the page — the pill, the solve button,
   and the hero's difficulty line all resolve to the same three tones. */
type Tone = 'Easy' | 'Medium' | 'Hard';

const toneFor = (difficulty: string): Tone => {
  const d = (difficulty || '').toLowerCase();
  if (d.startsWith('hard') || d.startsWith('advanced')) return 'Hard';
  if (d.startsWith('medium') || d.startsWith('intermediate')) return 'Medium';
  return 'Easy';
};

const PracticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { go, isPending } = useNavigatePending();

  const [currentSet, setCurrentSet] = useState<any>(null);
  const [problems, setProblems] = useState<PracticeProblem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // There is deliberately no mock stand-in on failure: it showed problems the
  // server did not have, and an unknown set opened a different one instead.
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeTopic, setActiveTopic] = useState<TopicType>('All');

  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);

    Promise.all([listPracticeSetsApi(), listProblemsApi(id)])
      .then(([sets, fetchedProblems]) => {
        const set = sets.find((s) => s.id === id);
        if (!set) {
          setLoadError("This practice set doesn't exist, or it isn't available to you.");
          return;
        }
        setCurrentSet(set);
        setProblems(fetchedProblems as PracticeProblem[]);
      })
      .catch((err) => {
        console.error('Failed to load practice set:', err);
        setLoadError("We couldn't load this practice set. Check your connection and try again.");
      })
      .finally(() => setIsLoading(false));
  }, [id, reloadKey]);

  // Navigate back to practice dashboard
  const handleBack = () => {
    navigate('/practice');
  };

  // Navigate to Solve Problem Workspace. The workspace is a large lazy chunk,
  // so the button reports progress until it has rendered.
  const solveRoute = (problemId: string) => `/problems/${problemId}/solve`;

  // Helper to compute topic stats
  const getTopicStats = (topic: TopicType) => {
    const topicProbs = topic === 'All' 
      ? problems 
      : problems.filter((p) => p.topic === topic);
    const solved = topicProbs.filter((p) => p.status === 'Solved').length;
    return {
      solved,
      total: topicProbs.length,
    };
  };

  // Filtered problems list based on active chip
  const filteredProblems = activeTopic === 'All'
    ? problems
    : problems.filter((p) => p.topic === activeTopic);

  const presentTopics = Array.from(new Set(problems.map((p) => p.topic))).filter(Boolean);

  const topics: TopicType[] = [
    'All',
    ...presentTopics.sort((a, b) => {
      const ia = TOPIC_ORDER.indexOf(a);
      const ib = TOPIC_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    }),
  ];

  // Calculate overall completion percent based on current solved problems
  const totalSolved = problems.filter((p) => p.status === 'Solved').length;
  const overallProgress = problems.length > 0 ? (totalSolved / problems.length) * 100 : 0;

  if (loadError) {
    return (
      <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, minHeight: '300px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{loadError}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={styles.backLink} onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
          <button className={styles.backLink} onClick={handleBack}>Back to Practice</button>
        </div>
      </div>
    );
  }

  if (isLoading || !currentSet) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--text-secondary)' }}>
        Loading challenges...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back Header */}
      <button className={styles.backLink} onClick={handleBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>Back to Practice</span>
      </button>

      {/* Hero card / Intro */}
      <div className={styles.heroCard}>
        <div className={styles.heroLeft}>
          <span className={styles.badge}>Practice Set</span>
          <h1 className={styles.title}>{formatPracticeSetTitle(currentSet.title)}</h1>
          <p className={styles.description}>
            Master core concepts through interactive challenges. Build your problem-solving skills step by step.
          </p>
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              Difficulty:{' '}
              <b className={styles[`text${toneFor(currentSet.level)}`]}>
                {formatDifficulty(currentSet.level)}
              </b>
            </div>
            <div className={styles.metaItem}>
              Total problems: <b>{problems.length} challenges</b>
            </div>
          </div>
        </div>

        {/* Progress Display */}
        <div className={styles.progressCard}>
          <span className={styles.progressLabel}>Overall progress</span>
          <span className={styles.progressPercent}>{overallProgress.toFixed(1)}%</span>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${overallProgress}%` }} />
          </div>
          <span className={styles.solvedCount}>
            {totalSolved} of {problems.length} solved
          </span>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <h2 className={styles.filterTitle}>Filter by topic</h2>
        <div className={styles.chipsGrid}>
          {topics.map((topic) => {
            const { solved, total } = getTopicStats(topic);
            return (
              <TopicChip
                key={topic}
                topic={topic}
                isActive={activeTopic === topic}
                solvedCount={solved}
                totalCount={total}
                onClick={() => setActiveTopic(topic)}
              />
            );
          })}
        </div>
      </div>

      {/* Problems List */}
      <div className={styles.problemsSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.subTitle}>
            {activeTopic === 'All' ? 'All challenges' : `${activeTopic} challenges`}
          </h3>
          <span className={styles.resultsCount}>{filteredProblems.length} results</span>
        </div>

        {problems.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', padding: '24px 0' }}>
            No challenges have been added to this set yet.
          </p>
        )}

        <div className={styles.problemsGrid}>
          {filteredProblems.map((prob) => {
            const isSolved = prob.status === 'Solved';
            const tone = toneFor(prob.difficulty);

            return (
              <div
                key={prob.id}
                className={`${styles.problemCard} ${isSolved ? styles.solvedCard : ''}`}
              >
                <div className={styles.probHeader}>
                  <span className={`${styles.difficultyPill} ${styles[`pill${tone}`]}`}>
                    {prob.difficulty}
                  </span>
                  <span className={styles.xpVal}>+{prob.xp} XP</span>
                </div>

                <h4 className={styles.probTitle}>{prob.title}</h4>
                <span className={styles.probTopicTag}>{prob.topic}</span>

                <div className={styles.probDivider} />

                <div className={styles.probFooter}>
                  <span className={`${styles.status} ${isSolved ? styles.statusSolved : ''}`}>
                    {prob.status}
                  </span>
                  <ActionButton
                    onClick={() => go(solveRoute(prob.id))}
                    loading={isPending(solveRoute(prob.id))}
                    loadingText="Opening…"
                    trailing={<span aria-hidden="true">→</span>}
                    className={`${styles.solveBtn} ${styles[`btn${tone}`]}`}
                  >
                    {isSolved ? 'Try again' : 'Solve'}
                  </ActionButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeDetail;
