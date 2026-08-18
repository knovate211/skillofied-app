import React from 'react';
import { SyllabusModule } from '../../../types';
import { useCourseProgress } from '../../../hooks/useCourseProgress';
import { useSyllabusNavigation } from '../../../hooks/useSyllabusNavigation';
import { usePublishCourseHeader, useCourseHeader } from '../../../context/CourseHeaderContext';
import LockedModuleCard from './LockedModuleCard';
import AIMentorChatbot from './AIMentorChatbot';
import styles from '../FrontendCoursePage.module.css';

interface CoursePageShellProps {
  /** The full syllabus tree for this course */
  syllabus: SyllabusModule[];
  /** Main heading shown in the top header */
  courseTitle: string;
  /** Subtitle shown under the header */
  courseSubtitle: string;
  /** Sidebar sub-label (e.g. "Frontend Mastery" or "Java Mastery") */
  sidebarSubtitle: string;
  /** localStorage key used to persist this course's progress separately */
  storageKey: string;
  /** The module ID that must be completed before others are unlocked */
  unlockAfterModuleId: string;
  /** Human-readable name shown in the lock card (e.g. "Module 1: Introduction") */
  unlockModuleName: string;
  /**
   * Course-specific content renderer. Called with the current moduleId
   * and the 1-indexed page number within that module.
   */
  renderContent: (moduleId: string, page: number) => React.ReactNode;
}

/**
 * CoursePageShell
 *
 * Provides the complete course-viewer UI shell: sidebar syllabus tree,
 * mobile hamburger menu, progress bar, prev/next navigation, and locked-
 * module gate. All course-specific content is injected via `renderContent`.
 *
 * Used by both FrontendCoursePage and JavaCoursePage.
 */
const CoursePageShell: React.FC<CoursePageShellProps> = ({
  syllabus,
  courseTitle,
  courseSubtitle,
  sidebarSubtitle,
  storageKey,
  unlockAfterModuleId,
  unlockModuleName,
  renderContent,
}) => {
  // Flatten all items for sequential navigation
  const allItems = syllabus.flatMap(mod => mod.items);

  // Progress tracking (localStorage-backed)
  const { maxIndexRead, setMaxIndexRead, progressPercent } = useCourseProgress(
    storageKey,
    allItems.length,
  );

  // All navigation state and handlers
  const {
    selectedItemId,
    expandedModules,
    handleSelectSidebarItem,
    toggleModuleExpanded,
    handlePageNext,
    handlePagePrev,
    handleBackToCourses,
    isFirstItem,
    isLastItem,
  } = useSyllabusNavigation(syllabus, allItems, 'overview-welcome', maxIndexRead, setMaxIndexRead, storageKey);

  // The syllabus is a drawer opened from the navbar, exactly like the main app
  // sidebar. This page only reads the state and closes it on selection.
  const { sidebarOpen, closeSidebar, lessonFooter, setOnAdvanceLesson } = useCourseHeader();

  const handlePageNextRef = React.useRef(handlePageNext);
  React.useEffect(() => {
    handlePageNextRef.current = handlePageNext;
  });

  React.useEffect(() => {
    setOnAdvanceLesson(() => () => handlePageNextRef.current());
    return () => setOnAdvanceLesson(null);
  }, [setOnAdvanceLesson]);

  const selectItem = (itemId: string) => {
    handleSelectSidebarItem(itemId);
    closeSidebar();
  };

  // Course identity lives in the app navbar, not in the page, so the whole
  // content area is available for the lesson.
  usePublishCourseHeader({
    title: courseTitle,
    subtitle: courseSubtitle,
    progressPercent,
    backTo: '/courses',
    syllabusLabel: sidebarSubtitle ? `${sidebarSubtitle.replace(' Mastery', '')} Syllabus` : 'Syllabus',
  });

  // ─── Content Rendering ──────────────────────────────────────────────────────
  const renderMainContent = () => {
    // Find the module that owns the currently selected item
    const currentModule = syllabus.find(
      m => m.items.some(item => item.id === selectedItemId),
    );
    if (!currentModule) return null;

    const moduleItemIndex = currentModule.items.findIndex(item => item.id === selectedItemId);
    const pageNum = moduleItemIndex !== -1 ? moduleItemIndex + 1 : 1;

    // Calculate the index of the last item in the unlock-prerequisite module
    const unlockModule = syllabus.find(m => m.id === unlockAfterModuleId);
    if (!unlockModule) return null;
    const lastUnlockItem = unlockModule.items[unlockModule.items.length - 1];
    const lastUnlockIndex = allItems.findIndex(item => item.id === lastUnlockItem.id);

    const isLocked =
      currentModule.id !== 'overview' &&
      currentModule.id !== unlockAfterModuleId &&
      !selectedItemId.startsWith('overview') &&
      maxIndexRead < lastUnlockIndex;

    if (isLocked) {
      return (
        <LockedModuleCard
          currentModule={currentModule}
          selectedItemId={selectedItemId}
          unlockModuleName={unlockModuleName}
        />
      );
    }

    return renderContent(currentModule.id, pageNum);
  };

  return (
    <div className={styles.appLayout}>
      {/* Backdrop — click anywhere outside to dismiss, as on the home sidebar */}
      <div
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.sidebarOverlayVisible : ''}`}
        onClick={closeSidebar}
      />

      {/* Content row: sidebar + lesson area side-by-side */}
      <div className={styles.contentRow}>
        {/* Syllabus drawer */}
        <aside
          className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
          aria-hidden={!sidebarOpen}
        >
          <div className={styles.sidebarHeader}>
            <button
              className={styles.sidebarCloseBtn}
              onClick={closeSidebar}
              aria-label="Close syllabus"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className={styles.sidebarTitle}>Syllabus Navigator</h2>
            <p className={styles.sidebarSubtitle}>{sidebarSubtitle}</p>
          </div>

          <nav className={styles.syllabusList}>
            {syllabus.map(mod => {
              const isExpanded = !!expandedModules[mod.id];
              const isActive = mod.items.some(item => item.id === selectedItemId);
              return (
                <div key={mod.id} className={styles.moduleBlock}>
                  <button
                    className={`${styles.moduleHeader} ${isActive ? styles.moduleHeaderActive : ''}`}
                    onClick={() => toggleModuleExpanded(mod.id)}
                  >
                    <span style={{ flex: 1 }}>{mod.title}</span>
                    <span className={`${styles.moduleArrow} ${isExpanded ? styles.moduleArrowExpanded : ''}`}>
                      ▶
                    </span>
                  </button>

                  {isExpanded && (
                    <div className={styles.moduleItemsList}>
                      {mod.items.map(item => {
                        const isItemActive = selectedItemId === item.id;
                        return (
                          <button
                            key={item.id}
                            className={`${styles.moduleItemLink} ${isItemActive ? styles.moduleItemLinkActive : ''}`}
                            onClick={() => selectItem(item.id)}
                            title={item.title}
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Study Area */}
        <main className={styles.mainArea}>
          <div className={styles.container}>
            {/* Main Content Card */}
            <div className={styles.card}>
              {renderMainContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Lesson Navigation Bar — replaces the BottomNav on course pages */}
      {(() => {
        const currentIdx = allItems.findIndex(item => item.id === selectedItemId);
        const nextItem = allItems[currentIdx + 1];
        const prevItem = allItems[currentIdx - 1];
        const isNextAssignment = nextItem?.id.endsWith('-assignment') || nextItem?.id.includes('-assignment-');
        const isPrevAssignment = prevItem?.id.endsWith('-assignment') || prevItem?.id.includes('-assignment-');

        const defaultPrevLabel = isPrevAssignment ? '← Previous Assignment' : '← Previous Lesson';
        const defaultNextLabel = isLastItem
          ? 'Finish Course'
          : isNextAssignment
          ? 'Next Assignment →'
          : 'Next Lesson →';

        return (
          <div className={styles.lessonBottomBar}>
            <button
              className={styles.lessonNavBtn}
              onClick={(lessonFooter && lessonFooter.onPrev) ? lessonFooter.onPrev : handlePagePrev}
              disabled={(lessonFooter && lessonFooter.prevDisabled !== undefined) ? lessonFooter.prevDisabled : isFirstItem}
            >
              {lessonFooter ? (lessonFooter.prevLabel ?? '← Previous Assignment') : defaultPrevLabel}
            </button>

            {lessonFooter && (
              <span className={styles.lessonNavCount}>{lessonFooter.label}</span>
            )}

            <button
              className={`${styles.lessonNavBtn} ${(!lessonFooter && isLastItem) ? styles.lessonNavBtnActive : ''}`}
              onClick={
                lessonFooter
                  ? lessonFooter.onNext
                  : isLastItem
                  ? handleBackToCourses
                  : handlePageNext
              }
              disabled={lessonFooter ? lessonFooter.nextDisabled : false}
            >
              {lessonFooter
                ? (lessonFooter.nextLabel ?? 'Next Assignment →')
                : defaultNextLabel}
            </button>
          </div>
        );
      })()}

      {/* AI Mentor floating chatbot — available on all course pages */}
      <AIMentorChatbot />
    </div>
  );
};

export default CoursePageShell;
