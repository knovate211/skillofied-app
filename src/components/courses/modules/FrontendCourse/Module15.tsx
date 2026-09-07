import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module15: React.FC<Props> = ({ page }) => {

  // Movie Search App simulation states
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesList, setMoviesList] = useState<{ id: number; title: string; year: string; genre: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: In which lifecycle hook should REST API data fetching ordinarily take place?', options: ['A. useMemo', 'B. useEffect', 'C. useState', 'D. useLayoutEffect'], correctAnswer: 'B. useEffect' },
    { id: 2, question: 'Q2: Why must you verify response.ok when using Fetch API inside React?', options: ['A. Fetch doesn\'t throw errors on 404 or 500 status codes', 'B. It compiles JSX code', 'C. To refresh the page', 'D. It is not needed'], correctAnswer: 'A. Fetch doesn\'t throw errors on 404 or 500 status codes' },
    { id: 3, question: 'Q3: Which HTTP method is typically used to create new resources on a server?', options: ['A. GET', 'B. POST', 'C. PUT', 'D. DELETE'], correctAnswer: 'B. POST' },
    { id: 4, question: 'Q4: Where are JWT authorization tokens usually stored in React applications to persist sessions?', options: ['A. Component State variables', 'B. LocalStorage or HTTP-only cookies', 'C. Virtual DOM', 'D. README.md file'], correctAnswer: 'B. LocalStorage or HTTP-only cookies' },
    { id: 5, question: 'Q5: What is the main purpose of dynamic "loading states" in API integration?', options: ['A. Speeding up network speeds', 'B. Communicating request status to the user to improve UX', 'C. Compiling background scripts', 'D. Encrypting data parameters'], correctAnswer: 'B. Communicating request status to the user to improve UX' },
  ];

  const handleSearchMovies = () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setMoviesList([]);

    setTimeout(() => {
      const q = searchQuery.trim().toLowerCase();
      const db = [
        { id: 1, title: 'Inception', year: '2010', genre: 'Sci-Fi' },
        { id: 2, title: 'The Dark Knight', year: '2008', genre: 'Action' },
        { id: 3, title: 'Interstellar', year: '2014', genre: 'Sci-Fi' },
        { id: 4, title: 'Parasite', year: '2019', genre: 'Drama' },
      ];
      const filtered = db.filter(m => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q));
      
      if (filtered.length > 0) {
        setMoviesList(filtered);
      } else {
        setErrorMsg('No movies matched your search query. Try searching: Sci-Fi, Dark, or Parasite.');
      }
      setLoading(false);
    }, 1000);
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 15.1: Fetching Data</h2>
          <p className={styles.paragraph}>Connecting React applications to external REST APIs is essential. This is ordinarily done using the standard <code>fetch()</code> API or libraries like <code>axios</code> inside a <code>useEffect</code> hook.</p>
          
          <div className={styles.codeLabel}>Data Fetching inside useEffect</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`useEffect(() => {
  fetch("https://api.example.com/items")
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
    .then(data => setData(data))
    .catch(err => setError(err.message));
}, []); // Empty dependency array runs only on mount`} />
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 15.2: Loading States</h2>
          <p className={styles.paragraph}>Since network requests are asynchronous and take time, you must keep users engaged by displaying a loader (spinner, skeleton, or message) while the request is pending.</p>
          
          <div className={styles.codeLabel}>Loading state logic</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const [loading, setLoading] = useState(true);

if (loading) {
  return <div className="spinner">Loading items list...</div>;
}

return <div className="list">{/* Render items */}</div>;`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 15.3: Error States</h2>
          <p className={styles.paragraph}>Network requests fail for many reasons: server crashes, offline status, or resource not found (404). Always implement error state boundaries to keep your UI friendly.</p>
          
          <div className={styles.codeLabel}>Handling Error displays</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const [error, setError] = useState(null);

if (error) {
  return (
    <div className="error-banner">
      <h3>⚠️ Error Loading Data</h3>
      <p>{error}</p>
      <button onClick={retryFetch}>Retry Connection</button>
    </div>
  );
}`} />
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 15.4: CRUD Operations</h2>
          <p className={styles.paragraph}>CRUD stands for <strong>Create, Read, Update, Delete</strong>. To modify data on a server, we specify headers and request bodies inside our fetch requests.</p>
          
          <div className={styles.codeLabel}>POST request (Create)</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`fetch("https://api.example.com/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "New Item", price: 100 }),
});`} />
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 15.5: Authentication UI</h2>
          <p className={styles.paragraph}>Secure pages require users to send credentials. Commonly, this is done by attaching a JSON Web Token (JWT) in the request Authorization headers.</p>
          
          <div className={styles.codeLabel}>Authorized Fetch request</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const token = localStorage.getItem("userToken");

fetch("https://api.example.com/profile", {
  headers: {
    "Authorization": \`Bearer \${token}\`
  }
});`} />
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Movie App Project</h2>
          <p className={styles.paragraph}>Build a Movie Catalog search engine that queries a database and displays details including title, year, and genre.</p>
          
          <h3 className={styles.subtitle}>Movie Search API Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>Try searching: (Inception, Dark, Interstellar, Sci-Fi)</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} placeholder="e.g. Sci-Fi" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearchMovies()} />
              <button className={styles.saveBtn} onClick={handleSearchMovies} disabled={loading}>Search Database</button>
            </div>

            {loading && <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-muted)' }}>Searching database index...</p>}
            {errorMsg && <p style={{ margin: 0, fontSize: '13.5px', color: '#ef4444' }}>{errorMsg}</p>}

            {moviesList.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {moviesList.map(m => (
                  <div key={m.id} style={{ background: 'var(--bg-surface-1)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                    <h4 style={{ margin: '0 0 4px 0' }}>🎥 {m.title}</h4>
                    <p style={{ margin: '2px 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>Year: <strong>{m.year}</strong></p>
                    <p style={{ margin: '2px 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>Genre: <strong>{m.genre}</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 7:
      return <ModuleQuiz moduleId="frontend-m15" title="Module 15 Quiz" questions={quizQuestions} />;

    case 8:
      return (
        <ModuleAssignment
          moduleId="frontend-m15"
          title="Module 15 Assignment"
          questions={frontendAssignments.m15}
        />
      );

    default:
      return null;
  }
};

export default Module15;
