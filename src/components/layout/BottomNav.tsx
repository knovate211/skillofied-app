import React from 'react';
import Spinner from '../common/Spinner';
import styles from './BottomNav.module.css';

type Tab = 'Home' | 'Course' | 'Practice' | 'Placement';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  /** The tab whose route is still loading, if any. */
  pendingTab?: Tab | null;
}

const icons: Record<Tab, React.ReactNode> = {
  Home: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 12L12 3l9 9v9H3V12z" />
    </svg>
  ),
  Course: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Practice: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Placement: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
};

const BottomNav: React.FC<Props> = ({ active, onChange, pendingTab }) => {
  const tabs: Tab[] = ['Home', 'Course', 'Practice', 'Placement'];
  return (
    <nav className={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${active === tab ? styles.active : ''}`}
          onClick={() => onChange(tab)}
        >
          {/* The tab itself carries the wait: Practice and Placement are lazy
              chunks, and the old screen stays up while they download. */}
          <span className={styles.icon}>{pendingTab === tab ? <Spinner size={18} /> : icons[tab]}</span>
          <span className={styles.label}>{tab}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
