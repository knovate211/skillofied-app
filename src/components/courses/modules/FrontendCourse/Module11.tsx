import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module11: React.FC<Props> = ({ page }) => {

  // Props interactive test
  const [propName, setPropName] = useState('Jane');
  const [propColor, setPropColor] = useState('#3b82f6');

  // Mini project state
  const [cards, setCards] = useState<{ title: string; desc: string }[]>([
    { title: 'Learn React', desc: 'Starting with JSX and components.' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What is a key benefit of React\'s Virtual DOM?', options: ['A. It deletes regular DOM', 'B. It updates only changed parts of the UI, improving performance', 'C. It lets you write HTML only', 'D. It prevents any CSS loading errors'], correctAnswer: 'B. It updates only changed parts of the UI, improving performance' },
    { id: 2, question: 'Q2: Which HTML attribute is written as "className" in JSX?', options: ['A. style', 'B. class', 'C. id', 'D. value'], correctAnswer: 'B. class' },
    { id: 3, question: 'Q3: How must JSX expressions be wrapped if they contain multiple sibling elements?', options: ['A. Inside square brackets []', 'B. Inside a single parent container (e.g. <div> or Fragment)', 'C. inside template literals', 'D. Inside function blocks'], correctAnswer: 'B. Inside a single parent container (e.g. <div> or Fragment)' },
    { id: 4, question: 'Q4: What is the nature of React "props"?', options: ['A. Mutable inside components', 'B. Read-only (immutable) from inside the receiving component', 'C. Stored in databases', 'D. Loaded asynchronously'], correctAnswer: 'B. Read-only (immutable) from inside the receiving component' },
    { id: 5, question: 'Q5: What command scaffolds a React project using Vite?', options: ['A. npm install react', 'B. npm create vite@latest', 'C. create-react-app', 'D. npm run dev'], correctAnswer: 'B. npm create vite@latest' },
  ];

  const handleAddCard = () => {
    if (newTitle.trim() && newDesc.trim()) {
      setCards(p => [...p, { title: newTitle.trim(), desc: newDesc.trim() }]);
      setNewTitle('');
      setNewDesc('');
    }
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.1: What is React?</h2>
          <p className={styles.paragraph}><strong>React</strong> is a popular open-source JavaScript library developed by Facebook for building user interfaces, particularly single-page applications (SPAs).</p>
          
          <h3 className={styles.subtitle}>Core React Concepts:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Component-Based</strong>: Build encapsulated components that manage their own state, then compose them to make complex UIs.</li>
            <li><strong>Declarative</strong>: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</li>
            <li><strong>Virtual DOM</strong>: Instead of updating the browser's DOM directly, React updates an in-memory database representation (Virtual DOM) and patches differences efficiently (diffing algorithm).</li>
          </ul>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.2: Installing React with Vite</h2>
          <p className={styles.paragraph}><strong>Vite</strong> is a modern frontend build tool that is extremely fast. It is currently the industry standard way to create new React applications.</p>
          
          <div className={styles.codeLabel}>Scaffolding with Vite</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`# 1. Run the scaffolding installer
npm create vite@latest my-react-app -- --template react-ts

# 2. Change directory into project
cd my-react-app

# 3. Install packages dependencies
npm install

# 4. Start local development server
npm run dev`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.3: Project Structure</h2>
          <p className={styles.paragraph}>A Vite + React project has a standard workspace layout:</p>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>node_modules/</strong>: Contains all third-party libraries installed via npm.</li>
            <li><strong>public/</strong>: Static assets like images and favicons that are served directly.</li>
            <li><strong>src/</strong>: The source code directory where you write your application.</li>
            <li><strong>src/main.tsx</strong>: The main entry point that boots up React and mounts it to the DOM.</li>
            <li><strong>src/App.tsx</strong>: The root component of your application hierarchy.</li>
            <li><strong>package.json</strong>: Lists project dependencies, metadata, and build scripts.</li>
          </ul>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.4: JSX (JavaScript XML)</h2>
          <p className={styles.paragraph}><strong>JSX</strong> is a syntax extension to JavaScript. It looks like HTML but has the full power of JavaScript.</p>
          
          <h3 className={styles.subtitle}>Rules of JSX:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Single Parent</strong>: You must wrap multiple sibling elements in a single enclosing parent (like a <code>&lt;div&gt;</code> or a React Fragment <code>&lt;&gt;&lt;/&gt;</code>).</li>
            <li><strong>Close All Tags</strong>: All tags must be explicitly closed. e.g. <code>&lt;img /&gt;</code> or <code>&lt;br /&gt;</code>.</li>
            <li><strong>camelCase Naming</strong>: Attribute names are camelCase. e.g. <code>class</code> becomes <code>className</code>, and <code>onclick</code> becomes <code>onClick</code>.</li>
            <li><strong>Javascript Curly Braces</strong>: Evaluate JS variables and logic inside JSX using curly braces <code>{`{}`}</code>.</li>
          </ul>

          <div className={styles.codeLabel}>JSX Syntax Example</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`const name = "Alice";
const element = (
  <>
    <h1 className="welcome-title">Hello, {name}</h1>
    <p style={{ color: "blue", fontSize: "16px" }}>
      Welcome to JSX templates!
    </p>
  </>
);`} />
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.5: React Components</h2>
          <p className={styles.paragraph}>Components are the building blocks of React applications. In modern React, we use <strong>Functional Components</strong> which are simply JavaScript functions that return JSX.</p>
          
          <div className={styles.codeLabel}>Functional Component Definition</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import React from 'react';

function UserProfile() {
  return (
    <div className="profile">
      <h3>John Doe</h3>
      <p>Software Engineer</p>
    </div>
  );
}

export default UserProfile;`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Component Capitalization</p>
            <p className={styles.tipBoxText}>React component names MUST always start with a capital letter (e.g. <code>UserProfile</code>, not <code>userProfile</code>). React uses capitalization to distinguish custom React components from standard HTML tags like <code>div</code> or <code>p</code>.</p>
          </div>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.6: Props</h2>
          <p className={styles.paragraph}><strong>Props</strong> (short for properties) are inputs to React components. They allow you to pass data from a parent component down to child components.</p>
          
          <div className={styles.codeLabel}>Parent Component</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`<WelcomeMessage name="Alice" color="blue" />`} />

          <div className={styles.codeLabel}>Child Component (WelcomeMessage)</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`function WelcomeMessage(props) {
  return (
    <h1 style={{ color: props.color }}>
      Hello, {props.name}!
    </h1>
  );
}`} />

          <h3 className={styles.subtitle}>Interactive Props Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} placeholder="Enter name prop" value={propName} onChange={e => setPropName(e.target.value)} />
              <select className={styles.inputField} value={propColor} onChange={e => setPropColor(e.target.value)}>
                <option value="#3b82f6">Blue</option>
                <option value="#10b981">Green</option>
                <option value="#ef4444">Red</option>
              </select>
            </div>
            <div style={{ border: '1px dashed var(--border)', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
              <span style={{ color: propColor, fontWeight: 'bold', fontSize: '18px' }}>Hello, {propName}!</span>
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 11.7: Component Reusability</h2>
          <p className={styles.paragraph}>Components are designed to be reusable. By passing different props to the same component structure, you can render custom elements without duplicating layout structures.</p>
          
          <div className={styles.codeLabel}>Reusing components</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`function App() {
  return (
    <div className="card-container">
      <Card title="HTML" desc="Structure language" />
      <Card title="CSS" desc="Styling language" />
      <Card title="React" desc="UI library" />
    </div>
  );
}`} />
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>React Mini Project</h2>
          <p className={styles.paragraph}>Build a reusable Component Card renderer list where user props are mapped dynamically to custom cards.</p>
          
          <h3 className={styles.subtitle}>Custom Card List Playground</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} placeholder="Card Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              <input className={styles.inputField} placeholder="Card Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
              <button className={styles.saveBtn} onClick={handleAddCard}>Add Card</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {cards.map((c, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-1)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: 'var(--accent)' }}>{c.title}</h4>
                  <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 9:
      return <ModuleQuiz moduleId="frontend-m11" title="Module 11 Quiz" questions={quizQuestions} />;

    case 10:
      return (
        <ModuleAssignment
          title="Module 11 Assignment"
          questions={[
            'What is the Virtual DOM and how does React optimize rendering updates?',
            'List 3 syntax differences between standard HTML tags and JSX attributes.',
            'Why must custom React component names always start with a capital letter?',
            'Explain the direction and mutability properties of React "props".',
            'Write a simple functional component structure that accepts a "title" prop and renders it inside an h2 tag.',
          ]}
        />
      );

    default:
      return null;
  }
};

export default Module11;
