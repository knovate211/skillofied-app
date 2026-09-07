import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module14: React.FC<Props> = ({ page }) => {

  // Router sandbox state
  const [currentSimUrl, setCurrentSimUrl] = useState('/');
  const [isSimAuth, setIsSimAuth] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What is a key characteristic of Single Page Applications (SPAs) routing?', options: ['A. The server loads a new HTML page on every navigation click', 'B. Page changes happen client-side in the browser without reloading the page', 'C. Routing must use hashes only', 'D. JavaScript is compiled to native code'], correctAnswer: 'B. Page changes happen client-side in the browser without reloading the page' },
    { id: 2, question: 'Q2: Which React Router component is used to link to different routes instead of standard anchor tags?', options: ['A. <a href>', 'B. <Link>', 'C. <RouterLink>', 'D. <Navigate>'], correctAnswer: 'B. <Link>' },
    { id: 3, question: 'Q3: How do you extract dynamic path parameters like "/user/:id" inside components?', options: ['A. useParams() hook', 'B. useRoute() hook', 'C. props.match.params', 'D. document.location.search'], correctAnswer: 'A. useParams() hook' },
    { id: 4, question: 'Q4: What component serves as a placeholder for child routes in a nested routing setup?', options: ['A. <Routes>', 'B. <Outlet />', 'C. <Fragment>', 'D. <Navigate>'], correctAnswer: 'B. <Outlet />' },
    { id: 5, question: 'Q5: How do you redirect a user programmatically inside event handlers or hooks?', options: ['A. useNavigate() hook', 'B. window.location.href', 'C. <Link to="...">', 'D. useParams()'], correctAnswer: 'A. useNavigate() hook' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 14.1: Routing Basics</h2>
          <p className={styles.paragraph}>In standard websites, browser clicks trigger HTTP server requests, fetching entirely new HTML documents. This causes visible white screen flashes.</p>
          <p className={styles.paragraph}>In a <strong>Single Page Application (SPA)</strong>, client-side routing intercepts browser transitions. It updates the layout view by swapping React components dynamically, resulting in smooth, instant transitions.</p>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 14.2: Browser Router</h2>
          <p className={styles.paragraph}>React Router is the standard routing library for React applications. It maps URLs to specific component hierarchies.</p>
          
          <div className={styles.codeLabel}>Router Configuration (App.tsx)</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 14.3: Route Parameters</h2>
          <p className={styles.paragraph}>Dynamic routing allows matching variable path values using colon syntax <code>:paramName</code>. These parameters can be extracted inside components via the <code>useParams</code> hook.</p>
          
          <div className={styles.codeLabel}>Route Mapping</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`<Route path="/profile/:userId" element={<UserProfile />} />`} />

          <div className={styles.codeLabel}>UserProfile Component</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <h3>Viewing profile for user ID: {userId}</h3>;
}`} />
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 14.4: Nested Routes</h2>
          <p className={styles.paragraph}>Nested routing enables rendering sub-layouts inside parent templates. The parent component uses the <code>&lt;Outlet /&gt;</code> component to specify where child routes should mount.</p>
          
          <div className={styles.codeLabel}>Nested Routes Definition</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="analytics" element={<Analytics />} />
  <Route path="settings" element={<Settings />} />
</Route>`} />

          <div className={styles.codeLabel}>DashboardLayout Component</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { Outlet, Link } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="dashboard-grid">
      <aside>
        <Link to="analytics">Analytics</Link>
        <Link to="settings">Settings</Link>
      </aside>
      <main>
        {/* Child components render here */}
        <Outlet />
      </main>
    </div>
  );
}`} />
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 14.5: Protected Routes</h2>
          <p className={styles.paragraph}>Protected routes guard page access, checking credentials (e.g. login tokens) and redirecting unauthenticated visitors to auth screens.</p>
          
          <div className={styles.codeLabel}>Protected Route wrapper</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Usage in App:
// <Route path="/admin" element={
//   <ProtectedRoute isAuthenticated={isLogged}>
//     <AdminPanel />
//   </ProtectedRoute>
// } />`} />
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Routing Project</h2>
          <p className={styles.paragraph}>Build an Admin Dashboard with multiple sub-routes (Overview, Settings, Profile) protected by simulated credentials check.</p>
          
          <h3 className={styles.subtitle}>Tab-Based Router Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'monospace' }}>Mock Address Bar: <code>http://app.local{currentSimUrl}</code></span>
              <button className={styles.backBtn} onClick={() => {
                setIsSimAuth(!isSimAuth);
                if (isSimAuth) setCurrentSimUrl('/');
              }}>
                {isSimAuth ? 'Log Out' : 'Simulate Log In'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <button className={styles.saveBtn} onClick={() => setCurrentSimUrl('/')}>Go to Home</button>
              <button className={styles.saveBtn} onClick={() => setCurrentSimUrl('/dashboard')}>Go to /dashboard</button>
              <button className={styles.saveBtn} onClick={() => setCurrentSimUrl('/dashboard/settings')}>Go to /dashboard/settings</button>
            </div>

            <div style={{ background: 'var(--bg-surface-1)', padding: '16px', borderRadius: '8px' }}>
              {currentSimUrl === '/' && <div><h4>🏠 Home Page</h4><p style={{ margin: 0, fontSize: '13px' }}>Public home screen. Anyone can view this!</p></div>}
              
              {currentSimUrl.startsWith('/dashboard') && (
                !isSimAuth ? (
                  <div style={{ color: '#ef4444' }}>
                    <h4>🔒 Protected Route Access Denied!</h4>
                    <p style={{ margin: 0, fontSize: '13px' }}>Please click "Simulate Log In" above to access protected dashboard pages.</p>
                  </div>
                ) : (
                  <div>
                    <h4>📊 Admin Dashboard Outlet</h4>
                    {currentSimUrl === '/dashboard' && <p style={{ margin: 0, fontSize: '13px' }}>Viewing Dashboard Analytics Overview.</p>}
                    {currentSimUrl === '/dashboard/settings' && <p style={{ margin: 0, fontSize: '13px' }}>Viewing Dashboard Settings configurations panel.</p>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      );

    case 7:
      return <ModuleQuiz moduleId="frontend-m14" title="Module 14 Quiz" questions={quizQuestions} />;

    case 8:
      return (
        <ModuleAssignment
          moduleId="frontend-m14"
          title="Module 14 Assignment"
          questions={frontendAssignments.m14}
        />
      );

    default:
      return null;
  }
};

export default Module14;
