import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchJobsApi, JobListing } from '../../api';
import AssessmentListPage from './tests/AssessmentListPage';
import styles from './PlacementSection.module.css';

const SEARCH_PRESETS = [
  'Software Engineer',
  'Frontend Developer',
  'Data Scientist',
  'Backend Developer',
  'DevOps Engineer',
  'UI UX Designer',
];

const LOGO_COLORS = [
  '#4285F4','#00A4EF','#F74F00','#FF9900','#FC8019',
  '#2D6BE4','#E91E63','#009688','#9C27B0','#FF5722',
];

function logoColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return LOGO_COLORS[Math.abs(h) % LOGO_COLORS.length];
}

/** Milliseconds since the posting went live, or null when it has no usable date. */
const postedAgeMs = (dateStr: string): number | null => {
  const t = new Date(dateStr).getTime();
  return Number.isNaN(t) ? null : Date.now() - t;
};

const formatPostedAgo = (dateStr: string) => {
  const diff = postedAgeMs(dateStr);
  if (diff === null) return 'Recently';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
};

const SkeletonCard: React.FC = () => (
  <div className={styles.card} aria-busy="true">
    <div className={styles.skeletonHeader}>
      <div className={`${styles.skeleton} ${styles.skeletonLogo}`} />
      <div className={styles.skeletonInfo}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonSub}`} />
      </div>
    </div>
    <div className={`${styles.skeleton} ${styles.skeletonLine}`} />
    <div className={`${styles.skeleton} ${styles.skeletonLine}`} style={{ width: '60%' }} />
    <div className={styles.skeletonTags}>
      {[1,2,3].map(i => <div key={i} className={`${styles.skeleton} ${styles.skeletonTag}`} />)}
    </div>
    <div className={`${styles.skeleton} ${styles.skeletonBtn}`} />
  </div>
);

const JobCard: React.FC<{ job: JobListing }> = ({ job }) => {
  const [saved, setSaved] = useState(false);
  
  const salary = job.salary || 'Not disclosed';
  const postedAgo = formatPostedAgo(job.date);
  const location = job.locations;
  const initial = job.company?.charAt(0)?.toUpperCase() ?? '?';
  const color = logoColor(job.company ?? '');
  const age = postedAgeMs(job.date);
  const isNew = age !== null && age < 24 * 60 * 60 * 1000;

  return (
    <div className={styles.card}>
      {isNew && <span className={styles.newBadge}>New</span>}
      <div className={styles.cardHeader}>
        <div className={styles.companyLogo} style={{ background: `${color}18`, color }}>
          {job.employerLogo ? (
            <img
              src={job.employerLogo}
              alt=""
              className={styles.companyLogoImg}
              // Logo hosts go stale often; drop back to the initial rather
              // than leaving a broken-image icon on the card.
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            initial
          )}
        </div>
        <div className={styles.headerInfo}>
          <h3 className={styles.jobTitle} title={job.title}>{job.title}</h3>
          <p className={styles.companyName}>{job.company}</p>
        </div>
        <button
          className={`${styles.saveBtn} ${saved ? styles.saveBtnActive : ''}`}
          onClick={() => setSaved(s => !s)}
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      <div className={styles.metaRow}>
        {location && (
          <div className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{location}</span>
          </div>
        )}
        <div className={styles.metaItem}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span>{salary}</span>
        </div>
      </div>

      <p className={styles.jobDescription} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.typeBadge} style={{ background: 'rgba(86,103,233,0.12)', color: '#5667e9' }}>{job.site || 'JSearch'}</span>
          {job.employmentType && (
            <span className={styles.typeBadge} style={{ background: 'rgba(40,197,188,0.14)', color: '#1a9d96' }}>{job.employmentType}</span>
          )}
          {job.isRemote && (
            <span className={styles.typeBadge} style={{ background: 'rgba(212,162,55,0.16)', color: '#a97c15' }}>Remote</span>
          )}
        </div>
        <div className={styles.footerRight}>
          <span className={styles.postedTime}>{postedAgo}</span>
        </div>
      </div>

      <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles.applyBtn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Apply on {job.site || 'JSearch'}
      </a>
    </div>
  );
};

const JobsBoard: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('Software Engineer');
  
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await searchJobsApi(query, 'India', 1);
      setJobs(res.jobs || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(activeQuery);
  }, [activeQuery, fetchJobs]);

  const handleSearch = () => {
    if (searchInput.trim()) setActiveQuery(searchInput.trim());
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <h1 className={styles.heading}>Job Openings</h1>
          <p className={styles.subheading}>Real-time openings from LinkedIn, Indeed, Glassdoor and more</p>
        </div>
        <button className={styles.liveIndicator} onClick={() => fetchJobs(activeQuery)} title="Refresh">
          <span className={`${styles.liveDot} ${loading ? styles.liveDotLoading : error ? styles.liveDotOff : ''}`} />
          {loading ? 'Loading…' : error ? 'Unavailable' : 'Live'}
        </button>
      </div>

      <div className={styles.searchBar}>
        <svg className={styles.searchIcon} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by role, e.g. Data Scientist…"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.presetRow}>
        {SEARCH_PRESETS.map(p => (
          <button
            key={p}
            className={`${styles.presetPill} ${activeQuery === p ? styles.presetPillActive : ''}`}
            onClick={() => { setActiveQuery(p); setSearchInput(p); }}
          >
            {p}
          </button>
        ))}
      </div>

      {error && (
        <div className={styles.errorState}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={() => fetchJobs(activeQuery)}>Try Again</button>
        </div>
      )}

      {!error && loading && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!error && !loading && jobs.length > 0 && (
        <div className={styles.grid}>
          {jobs.map((job, i) => <JobCard key={i} job={job} />)}
        </div>
      )}

      {!error && !loading && jobs.length === 0 && (
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>No jobs found. Try another role.</p>
        </div>
      )}
    </>
  );
};

/**
 * Placement hub: live job openings, plus the assessments a student can take.
 *
 * The tab lives in the URL (`?tab=tests`) so a link to the tests list — the one
 * a company invitation email points at — lands on the right view.
 */
const PlacementSection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') === 'tests' ? 'tests' : 'jobs';

  const switchTab = (next: 'jobs' | 'tests') => {
    setSearchParams(next === 'tests' ? { tab: 'tests' } : {}, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.presetRow} style={{ marginBottom: 4 }}>
        <button
          className={`${styles.presetPill} ${tab === 'jobs' ? styles.presetPillActive : ''}`}
          onClick={() => switchTab('jobs')}
        >
          Job openings
        </button>
        <button
          className={`${styles.presetPill} ${tab === 'tests' ? styles.presetPillActive : ''}`}
          onClick={() => switchTab('tests')}
        >
          Tests &amp; drives
        </button>
      </div>

      {tab === 'jobs' ? <JobsBoard /> : (
        <>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <h1 className={styles.heading}>Tests &amp; hiring drives</h1>
              <p className={styles.subheading}>
                Practice assessments and company shortlisting tests — MCQ, coding, or both
              </p>
            </div>
          </div>
          <AssessmentListPage />
        </>
      )}
    </div>
  );
};

export default PlacementSection;
