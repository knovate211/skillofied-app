import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import knovateLogo from '../../assets/knovate-logo.png';

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

  const isGolangUnlocked = enrolledCourses.some(c => c.title.includes('Golang'));
  const isGenAIUnlocked = enrolledCourses.some(c => c.title.includes('GenAI') || c.title.includes('Generative AI'));
  const isFullStackUnlocked = enrolledCourses.some(c => c.title.includes('Full Stack') || c.title.includes('Fullstack'));
  const isFrontendUnlocked = enrolledCourses.some(c => c.title === 'Front-End Technologies') || isFullStackUnlocked;
  const isJavaUnlocked = enrolledCourses.some(c => c.title === 'Java Development' || c.title === 'Java') || isFullStackUnlocked;
  const isSqlUnlocked = enrolledCourses.some(c => c.title === 'Mastering SQL') || isFullStackUnlocked;
  const isDigitalMarketingUnlocked = enrolledCourses.some(c => c.title === 'SEO Fundamentals' || c.title === 'Digital Marketing Strategy');
  const isTestingUnlocked = enrolledCourses.some(c => c.title.toLowerCase().includes('testing'));

  const courses: CourseEligibility[] = [
    {
      title: 'Golang Engineering',
      path: '/courses/golang',
      isUnlocked: isGolangUnlocked,
      icon: '🐹',
      category: 'Development',
    },
    {
      title: 'GenAI & Forward Deployed Engineering',
      path: '/courses/genai',
      isUnlocked: isGenAIUnlocked,
      icon: '🤖',
      category: 'Development',
    },
    // Full Stack is an entitlement rather than a course of its own: enrolling in
    // it unlocks Front-End, Java and SQL below, which is where the actual
    // curriculum lives. It is deliberately not listed here.
    {
      title: 'Front-End Technologies',
      path: '/courses/frontend',
      isUnlocked: isFrontendUnlocked,
      icon: '🎨',
      category: 'Development',
    },
    {
      title: 'Java Development',
      path: '/courses/java',
      isUnlocked: isJavaUnlocked,
      icon: '☕',
      category: 'Development',
    },
    {
      title: 'Mastering SQL',
      path: '/courses/sql',
      isUnlocked: isSqlUnlocked,
      icon: '💾',
      category: 'Development',
    },
    {
      title: 'SEO Fundamentals',
      path: '/courses/seo',
      isUnlocked: isDigitalMarketingUnlocked,
      icon: '🔍',
      category: 'Marketing',
    },
    {
      title: 'Digital Marketing Strategy',
      path: '/courses/digital-marketing',
      isUnlocked: isDigitalMarketingUnlocked,
      icon: '📈',
      category: 'Marketing',
    },
    {
      title: 'Software Testing',
      path: '/courses/testing',
      isUnlocked: isTestingUnlocked,
      icon: '🧪',
      category: 'QA & Testing',
    },
  ];

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
            {['Development', 'Marketing', 'QA & Testing'].map((cat) => {
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
