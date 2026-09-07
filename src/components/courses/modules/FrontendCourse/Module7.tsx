import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module7: React.FC<Props> = ({ page }) => {
  
  // Lesson 7.3 interactive style states
  const [demoColor, setDemoColor] = useState('inherit');
  const [demoFontSize, setDemoFontSize] = useState('14px');

  // Lesson 7.4 dynamic element creator
  const [dynamicElems, setDynamicElems] = useState<string[]>([]);

  // Lesson 7.5 Event listeners state
  const [clickCount, setClickCount] = useState(0);

  // Lesson 7.6 Form validation
  const [usernameInput, setUsernameInput] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  // Lesson 7.7 LocalStorage preview state
  const [lsKey, setLsKey] = useState('');
  const [lsVal, setLsVal] = useState('');
  const [lsSaved, setLsSaved] = useState<Record<string, string>>({});

  // Lesson 7.9 Todo Project simulation
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: 'Learn HTML fundamentals', completed: true },
    { id: 2, text: 'Master CSS Flexbox & Grid', completed: true },
    { id: 3, text: 'Learn DOM Manipulation', completed: false }
  ]);
  const [todoInput, setTodoInput] = useState('');

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: Which method returns all matching elements as a NodeList?', options: ['A. querySelector()', 'B. querySelectorAll()', 'C. getElementById()', 'D. getElementsByClassName()'], correctAnswer: 'B. querySelectorAll()' },
    { id: 2, question: 'Q2: How do you prevent a form from refreshing the page on submit?', options: ['A. e.stop()', 'B. e.preventDefault()', 'C. return false', 'D. e.stopPropagation()'], correctAnswer: 'B. e.preventDefault()' },
    { id: 3, question: 'Q3: Where does Local Storage store data?', options: ['A. Database server', 'B. Session cookie', 'C. User\'s browser', 'D. Backend RAM'], correctAnswer: 'C. User\'s browser' },
    { id: 4, question: 'Q4: What is the correct way to add a CSS class to an element in JS?', options: ['A. elem.class = "name"', 'B. elem.classList.add("name")', 'C. elem.className.append("name")', 'D. elem.style.class = "name"'], correctAnswer: 'B. elem.classList.add("name")' },
    { id: 5, question: 'Q5: How does Session Storage differ from Local Storage?', options: ['A. Session storage stores objects', 'B. Session storage clears when tab/browser is closed', 'C. Session storage has larger capacity', 'D. Session storage is faster'], correctAnswer: 'B. Session storage clears when tab/browser is closed' },
  ];

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      setTodos(p => [...p, { id: Date.now(), text: todoInput.trim(), completed: false }]);
      setTodoInput('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(p => p.filter(t => t.id !== id));
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.1: Introduction to DOM</h2>
          <p className={styles.paragraph}>The <strong>Document Object Model (DOM)</strong> is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.</p>
          <p className={styles.paragraph}>When a web page is loaded, the browser creates a Document Object Model of the page. The HTML document is structured as a tree of nodes:</p>
          
          <div className={styles.visualFlow}>
            <div className={styles.flowItem}>document (Root)</div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowItem}>&lt;html&gt;</div>
            <div className={styles.flowArrow}>↙ ↘</div>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
              <div className={styles.flowItem}>&lt;head&gt;</div>
              <div className={styles.flowItem}>&lt;body&gt;</div>
            </div>
            <div className={styles.flowArrow} style={{ marginLeft: '45px' }}>↓</div>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginLeft: '90px' }}>
              <div className={styles.flowItem}>&lt;h1&gt; (Heading)</div>
              <div className={styles.flowItem}>&lt;p&gt; (Text)</div>
            </div>
          </div>
          
          <p className={styles.paragraph}>Using the global <code>document</code> object, JavaScript can access, update, create, or delete any node in this tree.</p>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.2: Selecting Elements</h2>
          <p className={styles.paragraph}>To modify an HTML element, you must select it first. JavaScript provides multiple selector methods:</p>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
                <th>Returns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>document.getElementById()</code></td>
                <td>Selects by ID attribute</td>
                <td>Single element</td>
              </tr>
              <tr>
                <td><code>document.getElementsByClassName()</code></td>
                <td>Selects by class name</td>
                <td>HTMLCollection</td>
              </tr>
              <tr>
                <td><code>document.querySelector()</code></td>
                <td>Selects first matching CSS selector</td>
                <td>Single element</td>
              </tr>
              <tr>
                <td><code>document.querySelectorAll()</code></td>
                <td>Selects all matching CSS selectors</td>
                <td>NodeList</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.codeLabel}>Selecting Elements Example</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`const header = document.getElementById("main-header");
const cards = document.getElementsByClassName("card");

// Selects the first item with class "menu-link" inside <nav>
const firstLink = document.querySelector("nav .menu-link");

// Selects all active items
const activeItems = document.querySelectorAll(".item.active");`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.3: Updating Elements</h2>
          <p className={styles.paragraph}>Once selected, you can modify an element's text content, HTML content, classes, or direct inline styles.</p>
          
          <div className={styles.codeLabel}>JavaScript Options</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`const title = document.querySelector("#title");

// Change text only (safe)
title.innerText = "Welcome back!";

// Change text + render nested HTML (use with caution)
title.innerHTML = "<span>Hi <em>Learner</em></span>";

// Manipulate inline style properties
title.style.color = "blue";
title.style.fontSize = "24px";`} />

          <h3 className={styles.subtitle}>Interactive Style Changer</h3>
          <p className={styles.paragraph}>Modify the look of the block below in real-time:</p>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
            <h4 style={{ color: demoColor, fontSize: demoFontSize, margin: '0 0 12px 0', transition: 'all 0.2s' }}>This is the live preview text!</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className={styles.backBtn} onClick={() => setDemoColor(c => c === 'var(--accent)' ? 'inherit' : 'var(--accent)')}>Toggle Accent Color</button>
              <button className={styles.backBtn} onClick={() => setDemoFontSize(s => s === '24px' ? '14px' : '24px')}>Toggle Text Size</button>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.4: Creating Elements</h2>
          <p className={styles.paragraph}>You can construct new HTML elements from scratch using JS and insert them into the DOM tree.</p>
          
          <div className={styles.codeLabel}>JavaScript Creating and Appending</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`// 1. Create a new <div> element
const newDiv = document.createElement("div");

// 2. Add text and classes
newDiv.innerText = "New Dynamic Card!";
newDiv.classList.add("card");

// 3. Select container and append it
const container = document.querySelector(".list-container");
container.appendChild(newDiv);`} />

          <h3 className={styles.subtitle}>Dynamic List Builder Simulation</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <button className={styles.saveBtn} style={{ marginBottom: '12px' }} onClick={() => setDynamicElems(p => [...p, `Card #${p.length + 1}`])}>Add Custom Element</button>
            {dynamicElems.length === 0 ? (
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '13px', color: 'var(--text-muted)' }}>List is currently empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {dynamicElems.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-surface-1)', padding: '8px 12px', borderRadius: '4px', borderLeft: '3px solid var(--accent)', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{item}</span>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => setDynamicElems(p => p.filter((_, i) => i !== idx))}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.5: Event Listeners</h2>
          <p className={styles.paragraph}>JavaScript uses event listeners to respond to user interactions (clicks, keypresses, forms submits, page scrolls, etc.).</p>
          
          <div className={styles.codeLabel}>Event Listener Syntax</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`const btn = document.querySelector("#submit-btn");

btn.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event.target); // The clicked button element
});`} />

          <h3 className={styles.subtitle}>Interactive Event Tester</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <button className={styles.saveBtn} onClick={() => setClickCount(p => p + 1)}>Trigger Click Event</button>
            <span style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>Click count recorded: <strong>{clickCount}</strong></span>
          </div>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.6: Form Validation</h2>
          <p className={styles.paragraph}>Forms validation ensures users fill out fields correctly before submitting data. We must listen to the <code>submit</code> event and call <code>e.preventDefault()</code> to stop page reloads.</p>
          
          <div className={styles.codeLabel}>Validation Example</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page refresh
  
  const username = document.querySelector("#username").value;
  if (username.length < 3) {
    alert("Username must be at least 3 characters long!");
  } else {
    // Proceed to login
  }
});`} />

          <h3 className={styles.subtitle}>Live Validator Form</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (usernameInput.trim().length < 3) {
                setValidationMsg('❌ Invalid: Must be at least 3 characters!');
              } else {
                setValidationMsg('✅ Valid submission! Username approved.');
              }
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className={styles.inputField} type="text" placeholder="Enter username..." value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
                <button className={styles.saveBtn} type="submit">Submit Form</button>
              </div>
            </form>
            {validationMsg && <p style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: '600' }}>{validationMsg}</p>}
          </div>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.7: Local Storage</h2>
          <p className={styles.paragraph}><strong>Local Storage</strong> is a web storage API that lets you store key-value string pairs in the user's browser. The data remains saved even after the browser tab is closed.</p>
          
          <div className={styles.codeLabel}>Local Storage Methods</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`// Store item
localStorage.setItem("username", "JohnDoe");

// Retrieve item
const user = localStorage.getItem("username"); // "JohnDoe"

// Delete specific item
localStorage.removeItem("username");

// Clear all storage
localStorage.clear();`} />

          <h3 className={styles.subtitle}>Web Storage Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input className={styles.inputField} placeholder="Key" value={lsKey} onChange={e => setLsKey(e.target.value)} />
              <input className={styles.inputField} placeholder="Value" value={lsVal} onChange={e => setLsVal(e.target.value)} />
              <button className={styles.saveBtn} onClick={() => {
                if (lsKey.trim() && lsVal.trim()) {
                  setLsSaved(p => ({ ...p, [lsKey]: lsVal }));
                  setLsKey(''); setLsVal('');
                }
              }}>Store</button>
            </div>
            {Object.keys(lsSaved).length > 0 && (
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <strong>Saved items preview:</strong>
                <ul>
                  {Object.entries(lsSaved).map(([k, v]) => (
                    <li key={k}>{k}: <code>{v}</code></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 7.8: Session Storage</h2>
          <p className={styles.paragraph}><strong>Session Storage</strong> behaves identically to Local Storage, but with one key difference: data is cleared as soon as the user closes the specific browser tab or window.</p>
          
          <div className={styles.codeLabel}>Methods comparison</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`// Session storage calls are identical:
sessionStorage.setItem("sessionID", "9812739");

const sessionVal = sessionStorage.getItem("sessionID");`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Use Cases</p>
            <p className={styles.tipBoxText}>
              <strong>Local Storage</strong>: Theme preferences (Dark/Light mode), persistent authentication tokens, saved shopping cart items.<br />
              <strong>Session Storage</strong>: Sensitive temporary forms, single-session data, game scores that should reset on refresh.
            </p>
          </div>
        </div>
      );

    case 9:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Todo App Project</h2>
          <p className={styles.paragraph}>Build a functional Todo Application where users can add items, toggle task completeness, and delete tasks from the list.</p>
          
          <h3 className={styles.subtitle}>Live Project Mockup Playground</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} type="text" placeholder="Add a new task..." value={todoInput} onChange={e => setTodoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTodo()} />
              <button className={styles.saveBtn} onClick={handleAddTodo}>Add Task</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {todos.map(todo => (
                <div key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-1)', padding: '8px 12px', borderRadius: '6px', textDecoration: todo.completed ? 'line-through' : 'none', opacity: todo.completed ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => handleToggleTodo(todo.id)}>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <span style={{ fontSize: '13.5px' }}>{todo.text}</span>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 10:
      return <ModuleQuiz moduleId="frontend-m7" title="Module 7 Quiz" questions={quizQuestions} />;

    case 11:
      return (
        <ModuleAssignment
          moduleId="frontend-m7"
          title="Module 7 Assignment"
          questions={frontendAssignments.m7}
        />
      );

    default:
      return null;
  }
};

export default Module7;
