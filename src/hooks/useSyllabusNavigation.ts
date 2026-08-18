import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SyllabusModule } from '../types';

/** Query parameter holding the open lesson, e.g. /courses/golang?lesson=m2-l3 */
const LESSON_PARAM = 'lesson';

/** Where the last-visited lesson is remembered, derived from the course's progress key. */
const lastLessonKey = (storageKey: string) => `${storageKey}:lastLesson`;

/**
 * Manages all sidebar navigation state and prev/next lesson navigation
 * for course pages. Extracted from both FrontendCoursePage and JavaCoursePage.
 *
 * The open lesson lives in the URL rather than component state so a reload,
 * a shared link, or the browser back button all land on the same lesson
 * instead of resetting to the start of the course. Entering the course with
 * no lesson in the URL resumes the last one visited, remembered per course.
 */
export function useSyllabusNavigation(
  syllabus: SyllabusModule[],
  allItems: { id: string; title: string }[],
  initialItemId: string,
  maxIndexRead: number,
  setMaxIndexRead: (idx: number) => void,
  storageKey: string,
) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // An unknown or hand-edited id falls back to the course start rather than
  // rendering an empty page.
  const lessonParam = searchParams.get(LESSON_PARAM);
  const selectedItemId = useMemo(
    () => (lessonParam && allItems.some(item => item.id === lessonParam) ? lessonParam : initialItemId),
    [lessonParam, allItems, initialItemId],
  );

  const moduleIdOf = useCallback(
    (itemId: string) => syllabus.find(m => m.items.some(i => i.id === itemId))?.id,
    [syllabus],
  );

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Open the module owning the lesson we are landing on, so a reload deep in
    // the course does not show a fully collapsed syllabus.
    const landingModule = moduleIdOf(selectedItemId);
    return { overview: true, m1: true, ...(landingModule ? { [landingModule]: true } : {}) };
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const currentIdx = allItems.findIndex(item => item.id === selectedItemId);

  /**
   * Write the lesson to the URL. Explicit navigation pushes, so browser back
   * steps through lessons; `replace` is used for corrections that should not
   * add a history entry.
   */
  const goToItem = useCallback(
    (itemId: string, replace = false) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          next.set(LESSON_PARAM, itemId);
          return next;
        },
        { replace },
      );
      const modId = moduleIdOf(itemId);
      if (modId) setExpandedModules(prev => ({ ...prev, [modId]: true }));
    },
    [setSearchParams, moduleIdOf],
  );

  // Arriving from outside the course (no lesson in the URL) resumes where the
  // learner left off. Mount-only, so it never fights in-course navigation, and
  // `replace` so browser back returns to the course list rather than bouncing
  // through this redirect again.
  const resumeChecked = useRef(false);
  useEffect(() => {
    if (resumeChecked.current) return;
    resumeChecked.current = true;
    if (lessonParam) return;

    const saved = localStorage.getItem(lastLessonKey(storageKey));
    // A saved id from an older version of the syllabus is ignored.
    if (saved && saved !== initialItemId && allItems.some(item => item.id === saved)) {
      goToItem(saved, true);
    }
  }, [lessonParam, storageKey, initialItemId, allItems, goToItem]);

  // Remember the open lesson so the next visit can resume it.
  //
  // Only ever persist a lesson that is explicitly in the URL. Without this
  // guard, mounting at the course root would immediately write the implicit
  // default over the saved lesson — destroying it before the resume above
  // could ever use it.
  useEffect(() => {
    if (!lessonParam) return;
    localStorage.setItem(lastLessonKey(storageKey), selectedItemId);
  }, [lessonParam, selectedItemId, storageKey]);

  // Track furthest lesson visited for progress calculation
  useEffect(() => {
    if (currentIdx > maxIndexRead) {
      setMaxIndexRead(currentIdx);
    }
  }, [selectedItemId, currentIdx, maxIndexRead, setMaxIndexRead]);

  // Keep the sidebar in sync when the lesson changes from outside this hook —
  // browser back/forward, or a pasted link.
  useEffect(() => {
    const modId = moduleIdOf(selectedItemId);
    if (modId) setExpandedModules(prev => (prev[modId] ? prev : { ...prev, [modId]: true }));
  }, [selectedItemId, moduleIdOf]);

  const handleSelectSidebarItem = (itemId: string) => {
    goToItem(itemId);
    setIsMobileMenuOpen(false);
  };

  const toggleModuleExpanded = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handlePageNext = () => {
    if (currentIdx < allItems.length - 1) {
      goToItem(allItems[currentIdx + 1].id);
    }
  };

  const handlePagePrev = () => {
    if (currentIdx > 0) {
      goToItem(allItems[currentIdx - 1].id);
    }
  };

  const handleBackToCourses = () => navigate('/courses');

  const isFirstItem = currentIdx === 0;
  const isLastItem = currentIdx === allItems.length - 1;

  return {
    selectedItemId,
    expandedModules,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentIdx,
    handleSelectSidebarItem,
    toggleModuleExpanded,
    handlePageNext,
    handlePagePrev,
    handleBackToCourses,
    isFirstItem,
    isLastItem,
  };
}
