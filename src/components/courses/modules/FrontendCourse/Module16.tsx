import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module16: React.FC<Props> = ({ page }) => {

  // Advanced Project context/theme state simulation
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What is "Prop Drilling" in React development?', options: ['A. Fetching parameters from server databases', 'B. Passing props through multiple nested components that don\'t need them, just to reach a deep child component', 'C. Compiling JSX into variables', 'D. Reassigning local state variables'], correctAnswer: 'B. Passing props through multiple nested components that don\'t need them, just to reach a deep child component' },
    { id: 2, question: 'Q2: In useReducer, what triggers a state transition?', options: ['A. Mutating state directly', 'B. Dispatching an action object', 'C. Re-rendering the layout page', 'D. Changing props inputs'], correctAnswer: 'B. Dispatching an action object' },
    { id: 3, question: 'Q3: How does Zustand differ from Redux Toolkit?', options: ['A. Zustand requires huge boilerplate code templates', 'B. Zustand is lightweight and does not require Provider wrapper setups', 'C. Zustand is written in Java', 'D. There is no difference'], correctAnswer: 'B. Zustand is lightweight and does not require Provider wrapper setups' },
    { id: 4, question: 'Q4: Which React features enable lazy-loading of components?', options: ['A. useMemo & useCallback', 'B. React.lazy() & Suspense', 'C. useEffect & useState', 'D. Context API & Providers'], correctAnswer: 'B. React.lazy() & Suspense' },
    { id: 5, question: 'Q5: What are the two main parts returned by a Context object?', options: ['A. dispatch & actions', 'B. Provider & Consumer', 'C. state & setState', 'D. get & set'], correctAnswer: 'B. Provider & Consumer' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 16.1: Context API</h2>
          <p className={styles.paragraph}>In React, data is passed top-down via props. However, for global properties (e.g. user authentication or themes), passing props through dozens of nested intermediate components is tedious and error-prone (known as <strong>Prop Drilling</strong>).</p>
          <p className={styles.paragraph}>The <strong>Context API</strong> provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.</p>
          
          <div className={styles.codeLabel}>Context creation and usage</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import React, { createContext, useContext } from 'react';

const ThemeContext = createContext("light");

function Parent() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext); // "dark"
  return <div>Active theme: {theme}</div>;
}`} />
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 16.2: Reducers</h2>
          <p className={styles.paragraph}>For components with complex state logic, the standard <code>useState</code> hook can become unmanageable. The <code>useReducer</code> hook accepts a reducer function of type <code>(state, action) =&gt; newState</code> and returns the current state paired with a <code>dispatch</code> method.</p>
          
          <div className={styles.codeLabel}>useReducer setup</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error();
  }
}

// In Component:
// const [state, dispatch] = useReducer(reducer, initialState);
// <button onClick={() => dispatch({ type: 'increment' })}>+</button>`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 16.3: Zustand Basics</h2>
          <p className={styles.paragraph}><strong>Zustand</strong> is a small, fast, and scalable barebones state-management solution. It uses simplified hook interfaces without boilerplate setups, and is popular in modern React pipelines.</p>
          
          <div className={styles.codeLabel}>Zustand Store declaration</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// In Component:
// const bears = useStore((state) => state.bears);
// const increase = useStore((state) => state.increasePopulation);`} />
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 16.4: Redux Toolkit Basics</h2>
          <p className={styles.paragraph}><strong>Redux Toolkit (RTK)</strong> is the official, opinionated, toolset for efficient Redux development. It simplifies store setup, slice configurations, and reducer definitions.</p>
          
          <div className={styles.codeLabel}>RTK Slice creation</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // RTK handles safety mutations
    }
  }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;`} />
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 16.5: Performance Optimization</h2>
          <p className={styles.paragraph}>Large bundles degrade load speeds. To optimize, split bundles using lazy-loading, caching rendering nodes, and removing redundant triggers.</p>
          
          <h3 className={styles.subtitle}>Key Techniques</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Code Splitting</strong>: Dynamic imports using <code>React.lazy</code> and wrapping components inside <code>Suspense</code> boundaries.</li>
            <li><strong>Memoization</strong>: Caching child widgets using <code>React.memo</code> to skip renders unless props change.</li>
          </ul>

          <div className={styles.codeLabel}>React.lazy syntax</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`} />
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Advanced Project</h2>
          <p className={styles.paragraph}>Build a Theme Provider context switcher that distributes dark/light styling states down to child widgets.</p>
          
          <h3 className={styles.subtitle}>Theme Context Playground</h3>
          <div style={{ background: themeMode === 'light' ? '#f3f4f6' : '#1e293b', color: themeMode === 'light' ? '#1f2937' : '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.3s' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Current theme context value: {themeMode.toUpperCase()}</h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px' }}>Notice how this entire element updates its color styling themes dynamically!</p>
            <button className={styles.saveBtn} onClick={() => setThemeMode(t => t === 'dark' ? 'light' : 'dark')}>
              Switch theme context
            </button>
          </div>
        </div>
      );

    case 7:
      return <ModuleQuiz moduleId="frontend-m16" title="Module 16 Quiz" questions={quizQuestions} />;

    case 8:
      return (
        <ModuleAssignment
          moduleId="frontend-m16"
          title="Module 16 Assignment"
          questions={frontendAssignments.m16}
        />
      );

    default:
      return null;
  }
};

export default Module16;
