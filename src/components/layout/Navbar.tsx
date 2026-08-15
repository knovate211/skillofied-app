import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useTheme } from '../../context/ThemeContext';
import { useCourseHeader } from '../../context/CourseHeaderContext';

interface NavbarProps {
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  onLogout?: () => void;
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, onLogoClick, onLogout, onMenuClick }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const { header, sidebarOpen, toggleSidebar } = useCourseHeader();
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          title="Menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className={styles.logoContainer} onClick={onLogoClick} role="button" tabIndex={0} aria-label="Go to home">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#logo-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.logoIcon}
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A9B98B" />
                <stop offset="100%" stopColor="#7E9260" />
              </linearGradient>
            </defs>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
          <span className={styles.logoText}>Knovate</span>
        </div>
      </div>

      {/* Course context, published by the active course page. Living here
          instead of in the page frees a full row for lesson content. */}
      {header && (
        <div className={styles.courseHeader}>
          <button
            className={styles.courseBackBtn}
            onClick={() => navigate(header.backTo)}
            title="Back to courses"
          >
            ←
          </button>
          <button
            className={styles.syllabusToggleBtn}
            onClick={toggleSidebar}
            title={sidebarOpen ? 'Hide syllabus' : 'Show syllabus'}
            aria-label={sidebarOpen ? 'Hide syllabus' : 'Show syllabus'}
            aria-expanded={sidebarOpen}
          >
            <span>{header.syllabusLabel || 'Syllabus'}</span>
            <span style={{ fontSize: '9px', transform: sidebarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
          </button>
          <div className={styles.courseTitles}>
            <span className={styles.courseHeaderTitle}>{header.title}</span>
            <span className={styles.courseHeaderSubtitle}>{header.subtitle}</span>
          </div>
          <div className={styles.courseProgress}>
            <div className={styles.courseProgressTrack}>
              <div
                className={styles.courseProgressFill}
                style={{ width: `${header.progressPercent}%` }}
              />
            </div>
            <span className={styles.courseProgressLabel}>{header.progressPercent}%</span>
          </div>
        </div>
      )}

      <div className={styles.right}>
        <button
          id="theme-toggle-btn"
          className={styles.themeBtn}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggle}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          <span className={`${styles.themeBtnInner} ${isDark ? styles.dark : styles.light}`}>
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </span>
        </button>

        <button
          id="profile-avatar-btn"
          className={styles.avatar}
          aria-label="Open profile"
          onClick={onProfileClick}
          title="View Profile"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>

        {onLogout && (
          <button
            id="logout-btn"
            className={styles.logoutBtn}
            aria-label="Logout"
            onClick={onLogout}
            title="Logout"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
