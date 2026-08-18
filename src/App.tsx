import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Sidebar from './components/layout/Sidebar';
import CoursesSection from './components/courses/CoursesSection';
import Login from './components/auth/Login';
import { getMyCoursesApi } from './api';
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

  const handleTabChange = (tab: Tab) => {
    if (tab === 'Home') navigate('/');
    else if (tab === 'Course') navigate('/courses');
    else if (tab === 'Practice') navigate('/practice');
    else if (tab === 'Placement') navigate('/placement');
  };

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else if (isLoggedIn && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const isCourseDetailPage = location.pathname.startsWith('/courses/') && location.pathname !== '/courses';

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
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
                <BottomNav active={activeTab} onChange={handleTabChange} />
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

