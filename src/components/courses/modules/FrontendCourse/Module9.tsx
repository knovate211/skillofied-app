import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module9: React.FC<Props> = ({ page }) => {

  // Async delay state
  const [delayMsg, setDelayMsg] = useState('Idle');
  const [isLoading, setIsLoading] = useState(false);

  // Promise State Visualizer
  const [promiseStatus, setPromiseStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');

  // Weather App Project mock states
  const [weatherCity, setWeatherCity] = useState('');
  const [weatherData, setWeatherData] = useState<{ temp: string; desc: string; humidity: string } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What is the main threat of executing synchronous APIs in JavaScript?', options: ['A. Code won\'t compile', 'B. Page UI freezes while task executes', 'C. Variables lose types', 'D. Memory leak risk'], correctAnswer: 'B. Page UI freezes while task executes' },
    { id: 2, question: 'Q2: What are the three states of a JavaScript Promise?', options: ['A. Start, Process, End', 'B. Pending, Resolved, Rejected', 'C. Try, Catch, Finally', 'D. Async, Await, Fetch'], correctAnswer: 'B. Pending, Resolved, Rejected' },
    { id: 3, question: 'Q3: How do you capture errors in an async/await function?', options: ['A. using e.preventDefault()', 'B. using try...catch blocks', 'C. using then().catch()', 'D. using if-else conditions'], correctAnswer: 'B. using try...catch blocks' },
    { id: 4, question: 'Q4: What method is called on a response object to read JSON data from Fetch API?', options: ['A. response.getJSON()', 'B. response.json()', 'C. response.read()', 'D. JSON.parse(response)'], correctAnswer: 'B. response.json()' },
    { id: 5, question: 'Q5: What keyword must prefix a function declaration to allow using the await keyword inside?', options: ['A. wait', 'B. promise', 'C. async', 'D. defer'], correctAnswer: 'C. async' },
  ];

  const runDelaySimulation = () => {
    setDelayMsg('Initiating 2-second background request...');
    setIsLoading(true);
    setTimeout(() => {
      setDelayMsg('✨ Request Completed! Data loaded asynchronously.');
      setIsLoading(false);
    }, 2000);
  };

  const handleFetchWeather = () => {
    if (!weatherCity.trim()) return;
    setWeatherLoading(true);
    setWeatherError('');
    setWeatherData(null);

    // Mock network call
    setTimeout(() => {
      const city = weatherCity.trim().toLowerCase();
      if (city === 'london') {
        setWeatherData({ temp: '15°C', desc: 'Rainy and overcast', humidity: '85%' });
      } else if (city === 'new york') {
        setWeatherData({ temp: '22°C', desc: 'Sunny and clear', humidity: '60%' });
      } else if (city === 'tokyo') {
        setWeatherData({ temp: '18°C', desc: 'Mostly cloudy', humidity: '70%' });
      } else if (city === 'delhi' || city === 'new delhi') {
        setWeatherData({ temp: '38°C', desc: 'Hot and sunny', humidity: '40%' });
      } else {
        setWeatherError(`City "${weatherCity}" not found in mock database. Try London, New York, Tokyo, or Delhi.`);
      }
      setWeatherLoading(false);
    }, 1000);
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.1: Synchronous vs Asynchronous</h2>
          <p className={styles.paragraph}>JavaScript is <strong>single-threaded</strong>, meaning it can only execute one line of code at a time. In a <strong>synchronous</strong> execution, each line of code must wait for the previous one to finish. If a task takes a long time (like fetching database data), the entire page freezes.</p>
          <p className={styles.paragraph}><strong>Asynchronous</strong> operations allow JavaScript to initiate a long-running task, continue executing other code, and handle the task result once it completes.</p>
          
          <h3 className={styles.subtitle}>Interactive Async Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <button className={styles.saveBtn} onClick={runDelaySimulation} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Trigger setTimeout Call'}
            </button>
            <p style={{ marginTop: '12px', margin: 0, fontSize: '13.5px', fontStyle: 'italic' }}>
              Status: <strong>{delayMsg}</strong>
            </p>
          </div>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.2: Callbacks</h2>
          <p className={styles.paragraph}>A <strong>callback</strong> is a function passed as an argument to another function, to be executed once an asynchronous operation completes.</p>
          
          <div className={styles.codeLabel}>Callback Example</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`function loadData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Alice" };
    callback(data); // execute the callback
  }, 1000);
}

loadData((result) => {
  console.log("Data loaded:", result.name);
});`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>⚠️ Callback Hell</p>
            <p className={styles.tipBoxText}>When nesting multiple asynchronous operations together using callbacks, the code grows horizontally, becoming difficult to read. This is commonly referred to as "Callback Hell" or the "Pyramid of Doom".</p>
          </div>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.3: Promises</h2>
          <p className={styles.paragraph}>A <strong>Promise</strong> is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.</p>
          
          <h3 className={styles.subtitle}>Promise States</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Pending</strong>: Initial state, neither fulfilled nor rejected.</li>
            <li><strong>Fulfilled (Resolved)</strong>: Operation completed successfully.</li>
            <li><strong>Rejected</strong>: Operation failed.</li>
          </ul>

          <div className={styles.codeLabel}>Promise Chain Usage</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const fetchPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) resolve("Success!");
  else reject("Failed!");
});

fetchPromise
  .then(res => console.log(res))
  .catch(err => console.error(err));`} />

          <h3 className={styles.subtitle}>Interactive State Visualizer</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 12px 0', fontSize: '13.5px' }}>Current State: <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: promiseStatus === 'resolved' ? '#10b981' : promiseStatus === 'rejected' ? '#ef4444' : 'var(--text-muted)' }}>{promiseStatus}</span></p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={styles.backBtn} onClick={() => setPromiseStatus('resolved')}>Resolve Promise</button>
              <button className={styles.backBtn} onClick={() => setPromiseStatus('rejected')}>Reject Promise</button>
              <button className={styles.backBtn} onClick={() => setPromiseStatus('pending')}>Reset State</button>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.4: Async/Await</h2>
          <p className={styles.paragraph}>Introduced in ES2017, <code>async</code> and <code>await</code> are syntactic sugar written on top of Promises. They make asynchronous code look and behave more like synchronous code.</p>
          
          <div className={styles.codeLabel}>Async/Await Structure</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`async function getUserData() {
  try {
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Await Rules</p>
            <p className={styles.tipBoxText}>The <code>await</code> keyword can only be used inside functions that are declared with the <code>async</code> keyword prefix. Using it in top-level files without async wrappers will throw syntax errors.</p>
          </div>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.5: Fetch API</h2>
          <p className={styles.paragraph}>The <strong>Fetch API</strong> provides a modern global <code>fetch()</code> method that provides an easy, logical way to fetch resources asynchronously across the network.</p>
          
          <div className={styles.codeLabel}>GET Request Example</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`fetch("https://api.github.com/users/octocat")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json(); // parse response stream
  })
  .then(data => {
    console.log("User name:", data.name);
  })
  .catch(err => {
    console.error("Fetch failed:", err);
  });`} />
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.6: Error Handling</h2>
          <p className={styles.paragraph}>Handling errors prevents your entire application from crashing when a network connection drops or a backend API returns an error code.</p>
          
          <div className={styles.codeLabel}>Structured error handling</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`async function fetchWeather(city) {
  try {
    let response = await fetch(\`https://api.weather.com/\${city}\`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    let data = await response.json();
    return data;
  } catch (err) {
    console.warn("Weather error:", err.message);
    // return fallback data or display warning alert banner
  }
}`} />
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 9.7: API Integration</h2>
          <p className={styles.paragraph}>API integration connects your frontend components to backend databases. A professional client application should always manage <strong>Loading</strong>, <strong>Error</strong>, and <strong>Success</strong> states in the UI.</p>
          
          <div className={styles.codeLabel}>React State Integration concept</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

async function loadData() {
  setLoading(true);
  try {
    let res = await fetch("https://api.url");
    let obj = await res.json();
    setData(obj);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}`} />
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Weather App Project</h2>
          <p className={styles.paragraph}>Build a Weather Application that queries a mock weather API and dynamically updates the interface layout with the returned data.</p>
          
          <h3 className={styles.subtitle}>Interactive Weather API Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px' }}>Enter a city name: (London, New York, Tokyo, or Delhi)</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} type="text" placeholder="e.g. London" value={weatherCity} onChange={e => setWeatherCity(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFetchWeather()} />
              <button className={styles.saveBtn} onClick={handleFetchWeather} disabled={weatherLoading}>Search</button>
            </div>

            {weatherLoading && <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-muted)' }}>Querying weather endpoint...</p>}
            {weatherError && <p style={{ margin: 0, fontSize: '13.5px', color: '#ef4444' }}>{weatherError}</p>}
            
            {weatherData && (
              <div style={{ background: 'var(--bg-surface-1)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                <h4 style={{ margin: '0 0 6px 0', textTransform: 'capitalize' }}>🌤️ Weather Report for {weatherCity}</h4>
                <p style={{ margin: '4px 0', fontSize: '13.5px' }}>Temperature: <strong>{weatherData.temp}</strong></p>
                <p style={{ margin: '4px 0', fontSize: '13.5px' }}>Conditions: <strong>{weatherData.desc}</strong></p>
                <p style={{ margin: '4px 0', fontSize: '13.5px' }}>Humidity: <strong>{weatherData.humidity}</strong></p>
              </div>
            )}
          </div>
        </div>
      );

    case 9:
      return <ModuleQuiz moduleId="frontend-m9" title="Module 9 Quiz" questions={quizQuestions} />;

    case 10:
      return (
        <ModuleAssignment
          moduleId="frontend-m9"
          title="Module 9 Assignment"
          questions={frontendAssignments.m9}
        />
      );

    default:
      return null;
  }
};

export default Module9;
