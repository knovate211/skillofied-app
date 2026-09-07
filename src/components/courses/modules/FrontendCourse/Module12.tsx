import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module12: React.FC<Props> = ({ page }) => {

  // Lesson states
  const [inputText, setInputText] = useState('');
  const [toggleMsg, setToggleMsg] = useState(false);

  // Project counter state
  const [projectCount, setProjectCount] = useState(0);

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What is the main difference between Props and State?', options: ['A. Props are internal memory, State is external configuration', 'B. Props are read-only (passed down), State is local (managed inside component)', 'C. Props trigger page refresh, State compiles JSX', 'D. State cannot be modified'], correctAnswer: 'B. Props are read-only (passed down), State is local (managed inside component)' },
    { id: 2, question: 'Q2: What function does useState return?', options: ['A. The current state and a function to update it', 'B. A render function', 'C. A state getter only', 'D. A compile error compiler'], correctAnswer: 'A. The current state and a function to update it' },
    { id: 3, question: 'Q3: What does the term "Controlled Component" mean in React forms?', options: ['A. The component is managed by browser controls', 'B. The form input value is driven by React state', 'C. The input cannot be edited', 'D. The form is handled by global ref objects'], correctAnswer: 'B. The form input value is driven by React state' },
    { id: 4, question: 'Q4: Why does React need unique "key" props when rendering lists?', options: ['A. To apply CSS styling styles', 'B. To help React identify which items have changed, been added, or been removed', 'C. To bind click event handlers', 'D. To encrypt item values'], correctAnswer: 'B. To help React identify which items have changed, been added, or been removed' },
    { id: 5, question: 'Q5: Which logical operator is commonly used for inline conditional rendering if you only want to render something when a condition is true?', options: ['A. ||', 'B. &&', 'C. ?:', 'D. ??'], correctAnswer: 'B. &&' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.1: State Introduction</h2>
          <p className={styles.paragraph}>While <strong>props</strong> allow parents to pass data down, <strong>state</strong> is a component's private, local memory. State holds data that can change over time, and updates to state trigger component re-rendering.</p>
          
          <h3 className={styles.subtitle}>Props vs State</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Characteristic</th>
                <th>Props</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Who sets it?</td>
                <td>Parent component</td>
                <td>Component itself</td>
              </tr>
              <tr>
                <td>Read-only (inside component)?</td>
                <td>Yes</td>
                <td>No (via setState)</td>
              </tr>
              <tr>
                <td>Triggers re-render on change?</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.2: useState Hook</h2>
          <p className={styles.paragraph}>The <code>useState</code> hook declares a state variable in a functional component.</p>
          
          <div className={styles.codeLabel}>useState syntax</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import React, { useState } from 'react';

function Counter() {
  // Declare 'count' state starting at 0
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>⚠️ Never Mutate State Directly</p>
            <p className={styles.tipBoxText}>Never write <code>count = count + 1</code> or modify arrays directly. React won't know the state changed, so it won't trigger a re-render. Always use the setter function returned by the hook (e.g. <code>setCount</code>).</p>
          </div>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.3: Event Handling</h2>
          <p className={styles.paragraph}>React events are named using camelCase, rather than lowercase. With JSX you pass a function as the event handler, rather than a string.</p>
          
          <div className={styles.codeLabel}>React Events Syntax</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`// HTML
// <button onclick="activateLasers()">Activate</button>

// React
<button onClick={activateLasers}>
  Activate
</button>`} />
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.4: Forms in React</h2>
          <p className={styles.paragraph}>In a <strong>controlled component</strong>, the form input element's value is controlled by React state. Every character typed triggers a state update via an <code>onChange</code> handler.</p>
          
          <div className={styles.codeLabel}>Controlled Input structure</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`function NameForm() {
  const [name, setName] = useState("");

  return (
    <input 
      type="text" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}`} />

          <h3 className={styles.subtitle}>Controlled Input playground</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <input className={styles.inputField} style={{ width: '100%', maxWidth: '300px', marginBottom: '8px' }} placeholder="Type here..." value={inputText} onChange={e => setInputText(e.target.value)} />
            <p style={{ margin: 0, fontSize: '13.5px' }}>React State Value: <code>{inputText || '(empty)'}</code></p>
          </div>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.5: Conditional Rendering</h2>
          <p className={styles.paragraph}>You can render different elements depending on conditions, using standard JavaScript structures like <code>if</code>, ternary operators, or logical <code>&amp;&amp;</code> operators.</p>
          
          <div className={styles.codeLabel}>JSX Ternary Expression</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`<div>
  {isLoggedIn ? <LogoutButton /> : <LoginButton />}
</div>`} />

          <h3 className={styles.subtitle}>Interactive Toggle Tester</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <button className={styles.saveBtn} style={{ marginBottom: '12px' }} onClick={() => setToggleMsg(!toggleMsg)}>Toggle Message</button>
            {toggleMsg && (
              <p style={{ margin: 0, color: '#10b981', fontWeight: 'bold', fontSize: '13.5px' }}>
                🎉 Message visible! Conditional render succeeded.
              </p>
            )}
          </div>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 12.6: Lists and Keys</h2>
          <p className={styles.paragraph}>Render lists of components by mapping arrays using <code>.map()</code>. Each item must have a unique <code>key</code> prop to help React identify changes.</p>
          
          <div className={styles.codeLabel}>Map List rendering</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const items = ["A", "B", "C"];

return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);`} />
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Counter App Project</h2>
          <p className={styles.paragraph}>Build a counter application containing increment, decrement, and reset options, incorporating validation checks to block negative counts.</p>
          
          <h3 className={styles.subtitle}>Counter App playground</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '16px' }}>{projectCount}</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className={styles.saveBtn} onClick={() => setProjectCount(p => p + 1)}>Increment</button>
              <button className={styles.backBtn} onClick={() => setProjectCount(p => p > 0 ? p - 1 : 0)}>Decrement</button>
              <button className={styles.backBtn} onClick={() => setProjectCount(0)}>Reset</button>
            </div>
            {projectCount === 0 && <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '8px' }}>*Decrement blocked below 0*</p>}
          </div>
        </div>
      );

    case 8:
      return <ModuleQuiz moduleId="frontend-m12" title="Module 12 Quiz" questions={quizQuestions} />;

    case 9:
      return (
        <ModuleAssignment
          title="Module 12 Assignment"
          questions={[
            'Contrast state and props in React components.',
            'What happens if you modify a state variable directly without calling setState?',
            'Design a controlled text area input structure in React.',
            'How does the && logical operator render content conditionally in JSX?',
            'Why is using array indexes as list item keys discouraged in dynamic list structures?',
          ]}
        />
      );

    default:
      return null;
  }
};

export default Module12;
