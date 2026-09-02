import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Sidebar from './components/layout/Sidebar';
import CoursesSection from './components/courses/CoursesSection';
import Login from './components/auth/Login';
import { getMyCoursesApi } from './api';
import { isApplicantSession } from './lib/session';
import { useNavigatePending } from './hooks/useNavigatePending';
import styles from './App.module.css';
import TodaySchedule from './components/dashboard/TodaySchedule';

// Lazy loaded route components
const FrontendCoursePage = lazy(() => import('./components/courses/FrontendCoursePage'));
const JavaCoursePage = lazy(() => import('./components/courses/JavaCoursePage'));
const SqlCoursePage = lazy(() => import('./components/courses/SqlCoursePage'));
const GolangCoursePage = lazy(() => import('./components/courses/GolangCoursePage'));
const GenAICoursePage = lazy(() => import('./components/courses/GenAICoursePage'));
const FullStackCoursePage = lazy(() => import('./components/courses/FullStackCoursePage'));
const TestingCoursePage = lazy(() => import('./components/courses/TestingCoursePage'));
const CoursePlaceholderPage = lazy(() => import('./components/courses/CoursePlaceholderPage'));
const SeoCoursePage = lazy(() => import('./components/courses/SeoCoursePage'));
const DigitalMarketingCoursePage = lazy(() => import('./components/courses/DigitalMarketingCoursePage'));
const PracticeSection = lazy(() => import('./components/practice/PracticeSection'));
const PracticeDetail = lazy(() => import('./components/practice/PracticeDetail'));
const SolveProblemPage = lazy(() => import('./components/practice/SolveProblemPage'));
const PlacementSection = lazy(() => import('./components/placement/PlacementSection'));
const TestPlayer = lazy(() => import('./components/placement/tests/TestPlayer'));
const TestResultPage = lazy(() => import('./components/placement/tests/ResultPage'));
const ProfilePage = lazy(() => import('./components/profile/ProfilePage'));
const ScholarshipEntry = lazy(() => import('./components/scholarship/ScholarshipEntry'));
const ScholarshipInstructions = lazy(() => import('./components/scholarship/ScholarshipInstructions'));
const ScholarshipSessionNotice = lazy(() => import('./components/scholarship/ScholarshipSessionNotice'));

// A clean simple loading indicator to show during code-split chunk loading
const LoadingScreen: React.FC = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    background: 'var(--bg-page)',
    color: 'var(--text-secondary)',
    gap: 12
  }}>
    <div style={{
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: '2px solid var(--accent)',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite'
    }} />
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em' }}>LOADING...</span>
  </div>
);

type Tab = 'Home' | 'Course' | 'Practice' | 'Placement';



const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Require both the flag AND a real token — guards against stale sessions
    return localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('token');
  });

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { go, isPending } = useNavigatePending();

  useEffect(() => {
    if (isLoggedIn) {
      getMyCoursesApi()
        .then((data) => setEnrolledCourses(data))
        .catch((err) => console.error('Failed to load enrolled courses:', err));
    } else {
      setEnrolledCourses([]);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  // Same state change as handleLogin, minus the redirect. The scholarship
  // hand-off has its own destination — the instructions for the paper the
  // candidate was invited to — and bouncing them to the dashboard first would
  // lose them.
  const handleSessionEstablished = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  };

  const getActiveTab = (pathname: string): Tab => {
    if (pathname === '/courses') return 'Course';
    if (pathname === '/practice') return 'Practice';
    if (pathname === '/placement') return 'Placement';
    return 'Home';
  };

  const activeTab = getActiveTab(location.pathname);

  const TAB_ROUTES: Record<Tab, string> = {
    Home: '/',
    Course: '/courses',
    Practice: '/practice',
    Placement: '/placement',
  };

  const handleTabChange = (tab: Tab) => go(TAB_ROUTES[tab]);

  // Practice and Placement are lazy chunks, so the tab shows the wait.
  const pendingTab =
    (Object.keys(TAB_ROUTES) as Tab[]).find((t) => isPending(TAB_ROUTES[t])) ?? null;

  // The scholarship hand-off is public by necessity: a candidate arriving from
  // the marketing site has no session until /scholarship/start exchanges their
  // token for one. Redirecting them to the login form would strand them at a
  // password they were never given.
  const isPublicPath =
    location.pathname === '/login' || location.pathname.startsWith('/scholarship/');

  useEffect(() => {
    if (!isLoggedIn && !isPublicPath) {
      navigate('/login', { replace: true });
    } else if (isLoggedIn && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, isPublicPath, location.pathname, navigate]);

  // Confine an applicant session to the test.
  //
  // A scholarship applicant holds a real 24h session — the assessment engine
  // keys an attempt to a user id — but they are not a student, so the course
  // portal is not theirs to browse. Without this, a lingering claim session
  // let an applicant reach the student home, courses and practice simply by
  // navigating to "/" (which is also where "Sign in instead" lands them once
  // they already have a session). They may be on the scholarship pages and in
  // the live test player; everywhere else sends them to the session notice.
  useEffect(() => {
    if (!isLoggedIn || !isApplicantSession()) return;
    const p = location.pathname;
    const allowed =
      p.startsWith('/scholarship/') ||
      p.startsWith('/placement/tests/attempt/');
    if (!allowed) navigate('/scholarship/session', { replace: true });
  }, [isLoggedIn, location.pathname, navigate]);

  const isCourseDetailPage = location.pathname.startsWith('/courses/') && location.pathname !== '/courses';

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />
      {/* The scholarship hand-off, also outside the shell and also public: the
          candidate has no session until /start spends their one-time token. */}
      <Route
        path="/scholarship/start"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <ScholarshipEntry onSession={handleSessionEstablished} />
          </Suspense>
        }
      />
      <Route
        path="/scholarship/session"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <ScholarshipSessionNotice />
          </Suspense>
        }
      />
      <Route
        path="/scholarship/instructions/:assessmentId"
        element={
          isLoggedIn ? (
            <Suspense fallback={<LoadingScreen />}>
              <ScholarshipInstructions />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* The test player runs outside the app shell: a live assessment gets the
          whole viewport, with no nav to wander off into mid-test. */}
      <Route
        path="/placement/tests/attempt/:attemptId"
        element={
          isLoggedIn ? (
            <Suspense fallback={<LoadingScreen />}>
              <TestPlayer />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/problems/:id/solve"
        element={
          isLoggedIn ? (
            <Suspense fallback={<LoadingScreen />}>
              <SolveProblemPage />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <div
              className={`${styles.appShell} ${isCourseDetailPage ? styles.appShellFixed : ''}`}
            >
              <Navbar
                onProfileClick={() => navigate('/profile')}
                onLogoClick={() => navigate('/')}
                onLogout={handleLogout}
                onMenuClick={() => setIsSidebarOpen(true)}
              />
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                enrolledCourses={enrolledCourses}
              />
              <main className={isCourseDetailPage ? styles.mainCoursePage : styles.main}>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <TodaySchedule />
                          <CoursesSection />
                          <PracticeSection isHomePage />
                        </>
                      }
                    />
                    <Route path="/courses" element={<CoursesSection />} />
                    <Route path="/courses/frontend" element={<FrontendCoursePage />} />
                    <Route path="/courses/java" element={<JavaCoursePage />} />
                    <Route path="/courses/sql" element={<SqlCoursePage />} />
                    <Route path="/courses/golang" element={<GolangCoursePage />} />
                    <Route path="/courses/genai" element={<GenAICoursePage />} />
                    <Route path="/courses/fullstack" element={<FullStackCoursePage />} />
                    <Route path="/courses/seo" element={<SeoCoursePage />} />
                    <Route path="/courses/digital-marketing" element={<DigitalMarketingCoursePage />} />
                    {/* Courses without content yet fall through to the syllabus landing page. */}
                    <Route path="/courses/testing" element={<TestingCoursePage />} />
                    <Route path="/courses/:courseId" element={<CoursePlaceholderPage />} />
                    <Route path="/practice" element={<PracticeSection />} />
                    <Route path="/practice/:id" element={<PracticeDetail />} />
                    <Route path="/placement" element={<PlacementSection />} />
                    <Route path="/placement/tests/result/:attemptId" element={<TestResultPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
              {!isCourseDetailPage && (
                <BottomNav active={activeTab} onChange={handleTabChange} pendingTab={pendingTab} />
              )}
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;

