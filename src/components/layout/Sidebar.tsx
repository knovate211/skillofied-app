import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import knovateLogo from '../../assets/knovate-logo.png';
import { getUnlockedCoursePaths } from '../../lib/courseAccess';
import { COURSES } from '../../lib/courseRegistry';

interface CourseEligibility {
  title: string;
  path: string;
  isUnlocked: boolean;
  icon: string;
  category: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourses: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, enrolledCourses }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lockedCourseName, setLockedCourseName] = useState<string | null>(null);

  // Lock body scrolling when sidebar is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const unlocked = getUnlockedCoursePaths(enrolledCourses);

  const courses: CourseEligibility[] = COURSES.filter((c) => c.inSidebar).map((c) => ({
    title: c.title,
    path: c.path,
    isUnlocked: unlocked.has(c.path),
    icon: c.sidebarIcon,
    category: c.category,
  }));

  const handleLinkClick = (path: string, isUnlocked: boolean, courseTitle: string) => {
    if (!isUnlocked) {
      setLockedCourseName(courseTitle);
      return;
    }
    navigate(path);
    onClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.menuBtn} onClick={onClose} aria-label="Close sidebar">
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <div className={styles.logoContainer} onClick={() => handleNavigation('/')} role="button" tabIndex={0}>
            <img src={knovateLogo} alt="Knovate" className={styles.logo} />
          </div>
        </div>

        {/* Navigation Content */}
        <div className={styles.content}>
          {/* Section: Main App Links */}
          <nav className={styles.navSection}>
            <h3 className={styles.sectionTitle}>Main Menu</h3>
            <button
              className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
              onClick={() => handleNavigation('/')}
            >
              <span className={styles.itemIcon}>🏠</span>
              <span className={styles.itemLabel}>Home Dashboard</span>
            </button>
            <button
              className={`${styles.navItem} ${location.pathname === '/courses' ? styles.active : ''}`}
              onClick={() => handleNavigation('/courses')}
            >
              <span className={styles.itemIcon}>📚</span>
              <span className={styles.itemLabel}>All Enrolled Courses</span>
            </button>
            <button
              className={`${styles.navItem} ${location.pathname === '/practice' ? styles.active : ''}`}
              onClick={() => handleNavigation('/practice')}
            >
              <span className={styles.itemIcon}>💻</span>
              <span className={styles.itemLabel}>Practice IDE</span>
            </button>
            <button
              className={`${styles.navItem} ${location.pathname === '/placement' ? styles.active : ''}`}
              onClick={() => handleNavigation('/placement')}
            >
              <span className={styles.itemIcon}>🎯</span>
              <span className={styles.itemLabel}>Placements</span>
            </button>
          </nav>

          {/* Divider */}
          <hr className={styles.divider} />

          {/* Section: Pathways / Course Catalogue */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>Course Pathways</h3>
            
            {/* Group courses by Category */}
            {['Development', 'Computer Science Core', 'Marketing', 'QA & Testing'].map((cat) => {
              const catCourses = courses.filter((c) => c.category === cat);
              return (
                <div key={cat} className={styles.categoryGroup}>
                  <h4 className={styles.categoryLabel}>{cat}</h4>
                  {catCourses.map((course) => {
                    const isActive = location.pathname === course.path;
                    return (
                      <button
                        key={course.title}
                        className={`${styles.courseItem} ${isActive ? styles.active : ''} ${
                          !course.isUnlocked ? styles.locked : ''
                        }`}
                        onClick={() => handleLinkClick(course.path, course.isUnlocked, course.title)}
                        title={!course.isUnlocked ? `${course.title} (Locked)` : course.title}
                      >
                        <span className={styles.courseIcon}>{course.icon}</span>
                        <span className={styles.courseLabel}>{course.title}</span>
                        {!course.isUnlocked && (
                          <span className={styles.lockBadge}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info inside sidebar */}
        <div className={styles.footer}>
          <p>© 2026 Knovate Academy</p>
        </div>
      </aside>

      {/* Lock Notification Modal Overlay */}
      {lockedCourseName && (
        <div className={styles.modalOverlay} onClick={() => setLockedCourseName(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalLockIcon}>🔒</span>
              <h3 className={styles.modalTitle}>Pathway Locked</h3>
            </div>
            <div className={styles.modalBody}>
              <p>
                The course <strong>{lockedCourseName}</strong> is not unlocked in your current subscription.
              </p>
              <p className={styles.modalTextMuted}>
                Upgrade your training program to unlock professional curriculum lectures, practice challenges, mentor assessments, and certifications.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.upgradeBtn} onClick={() => setLockedCourseName(null)}>
                Upgrade Now
              </button>
              <button className={styles.closeBtn} onClick={() => setLockedCourseName(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
