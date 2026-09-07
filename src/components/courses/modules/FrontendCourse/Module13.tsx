import React, { useState, useEffect } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';
import { PlainEnglish, Analogy, Pitfall, Compare, Steps, Anatomy, Result } from '../../shared/LessonBits';

interface Props { page: number; }

const Module13: React.FC<Props> = ({ page }) => {

  // useEffect interactive state
  const [effectCounter, setEffectCounter] = useState(0);
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    if (effectCounter > 0) {
      setTriggerCount(t => t + 1);
    }
  }, [effectCounter]);

  // Project simulation (Stopwatch/Timer using hooks)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: Which useEffect dependency array configuration triggers the effect only once on mount?', options: ['A. No dependency array at all', 'B. Empty dependency array []', 'C. Dependency array listing all state variables', 'D. Dependency array containing true/false values'], correctAnswer: 'B. Empty dependency array []' },
    { id: 2, question: 'Q2: What is the main purpose of the useRef hook?', options: ['A. To run asynchronous API calls', 'B. To create mutable references that persist across renders without triggering a re-render', 'C. To style dynamic elements', 'D. To memoize functions'], correctAnswer: 'B. To create mutable references that persist across renders without triggering a re-render' },
    { id: 3, question: 'Q3: How does useMemo differ from useCallback?', options: ['A. useMemo caches functions, useCallback caches variables', 'B. useMemo memoizes computed values, useCallback memoizes function instances', 'C. useMemo runs only on mount, useCallback runs on every click', 'D. There is no difference'], correctAnswer: 'B. useMemo memoizes computed values, useCallback memoizes function instances' },
    { id: 4, question: 'Q4: What naming convention should all React hooks (including custom hooks) follow?', options: ['A. start with capital letters', 'B. prefix with the word "use" (e.g. useFetch)', 'C. end with "Hook"', 'D. camelCase only'], correctAnswer: 'B. prefix with the word "use" (e.g. useFetch)' },
    { id: 5, question: 'Q5: How do you return a cleanup function from inside a useEffect hook?', options: ['A. call a cleanup() function at the end', 'B. Return a function inside the effect body', 'C. add a finally block', 'D. None of the above'], correctAnswer: 'B. Return a function inside the effect body' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 13.1: useEffect</h2>
          <p className={styles.paragraph}>A React component has one job: look at its data and return what should be on screen. That is all it is allowed to do. But real apps need to do other things too — load data from a server, start a timer, listen for the window resizing, save something to localStorage.</p>
          <p className={styles.paragraph}>Those extra jobs are called <strong>side effects</strong>, because they happen <em>alongside</em> drawing the screen. <code>useEffect</code> is where you put them.</p>

          <PlainEnglish>
            useEffect means: “after you have finished drawing the screen, also do this.”
          </PlainEnglish>

          <Analogy>
            You are a chef. Your job is to cook the dish and put it on the pass — that is the component
            rendering. But you also need to set a timer for the oven, and turn it off when service ends.
            You do not do that while plating. You do it right after. That is useEffect.
          </Analogy>

          <h3 className={styles.subtitle}>The second argument decides when it runs</h3>
          <p className={styles.paragraph}>This is the whole hook. Everything else about useEffect follows from this one choice.</p>

          <Anatomy title="The dependency array"
            parts={[
              { part: 'no array', text: <>Runs after <em>every single render</em>. Almost always a mistake — it is the cause of infinite loops.</> },
              { part: '[ ]', text: <>Runs <em>once</em>, when the component first appears. Use this for “load the data when the page opens”.</> },
              { part: '[count]', text: <>Runs once at the start, then again <em>every time <code>count</code> changes</em>. Use this for “re-fetch when the user picks a different filter”.</> },
            ]} />

          <div className={styles.codeLabel}>The same effect, three ways</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`// 1. Every render — runs forever if the effect sets state
useEffect(() => {
  console.log('ran');
});

// 2. Once, on first appearance — for loading initial data
useEffect(() => {
  fetchUser();
}, []);

// 3. Whenever userId changes — for reloading when the input changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);`} />

          <Pitfall>
            Writing <code>useEffect</code> with no array, and calling <code>setState</code> inside it.
            Setting state causes a re-render, the re-render runs the effect again, which sets state
            again — forever. If your browser tab freezes, this is almost always why. Add the array.
          </Pitfall>

          <h3 className={styles.subtitle}>Cleaning up after yourself</h3>
          <p className={styles.paragraph}>If your effect starts something that keeps running — a timer, an event listener, a subscription — you have to stop it when the component disappears. You do that by <strong>returning a function</strong> from the effect. React calls it on the way out.</p>

          <div className={styles.codeLabel}>Start a timer, then stop it</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);

  // React runs this when the component is removed
  return () => clearInterval(id);
}, []);`} />

          <Pitfall title="Why cleanup matters">
            Forget the <code>return</code> and the timer keeps ticking after the component is gone. It
            tries to update a component that no longer exists, and every time the user visits the page
            you start another one. Ten visits, ten timers, all running at once.
          </Pitfall>

          <h3 className={styles.subtitle}>Interactive Dependency Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button className={styles.saveBtn} onClick={() => setEffectCounter(c => c + 1)}>Increment state variable (Current: {effectCounter})</button>
            </div>
            <p style={{ margin: 0, fontSize: '13.5px' }}>
              Effect executed count: <strong>{triggerCount}</strong> (triggered because state variable changed).
            </p>
          </div>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 13.2: useRef</h2>
          <p className={styles.paragraph}>Sometimes a component needs to remember something, but changing it should <em>not</em> redraw the screen. And sometimes you need to reach the real HTML element on the page — to focus an input, or scroll a box. <code>useRef</code> does both.</p>

          <PlainEnglish>
            useRef is a box you can put a value in. React keeps the box between renders, but it never
            watches what is inside it — so changing the contents redraws nothing.
          </PlainEnglish>

          <Analogy>
            useState is a whiteboard on the wall: write on it and everyone looks up, because the room
            has visibly changed. useRef is a sticky note in your pocket. You can change it as often as
            you like and nobody re-reads the room.
          </Analogy>

          <h3 className={styles.subtitle}>useState or useRef?</h3>
          <Compare columns={[
            { title: 'useState', tone: 'olive', subtitle: 'The user should see it change', items: [
              'Changing it re-renders the component',
              'Read it as a plain value: count',
              'Use for: text in an input, a counter on screen, whether a modal is open',
            ] },
            { title: 'useRef', tone: 'honey', subtitle: 'Nobody needs to see it change', items: [
              'Changing it re-renders nothing',
              'Read it through .current: timerId.current',
              'Use for: a timer id, the previous value, a reference to a DOM element',
            ] },
          ]} />

          <h3 className={styles.subtitle}>Use 1 — reaching a real element on the page</h3>
          <p className={styles.paragraph}>Attach the ref to an element with the <code>ref</code> attribute, and React puts the actual DOM node into <code>.current</code> for you.</p>

          <div className={styles.codeLabel}>Direct DOM reference</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import React, { useRef } from 'react';

function InputFocus() {
  const inputEl = useRef(null);
  
  const onButtonClick = () => {
    // Set focus on input element
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}`} />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 13.3: useMemo</h2>
          <p className={styles.paragraph}>Every time a component re-renders, <em>all</em> the code inside it runs again from the top. Usually that is fine — it is fast. But if one line does heavy work, it redoes that heavy work on every render, even when nothing relevant changed.</p>

          <PlainEnglish>
            useMemo means: “remember the answer you worked out last time, and only work it out again
            if these specific inputs changed.”
          </PlainEnglish>

          <Analogy>
            You are asked the same long-division question every few minutes. Rather than redo the sum
            each time, you write the answer on a card. Someone changes the numbers — only then do you
            work it out again. The card is useMemo; the numbers are the dependency array.
          </Analogy>

          <h3 className={styles.subtitle}>The problem, concretely</h3>
          <div className={styles.codeLabel}>Without useMemo — filters 10,000 items on every keystroke</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`function ProductList({ products, search }) {
  const [theme, setTheme] = useState('light');

  // Runs again every render — including when you only toggled the theme
  const visible = products.filter(p => p.name.includes(search));

  return <List items={visible} />;
}`} />

          <Result label="What goes wrong">
            The user clicks the dark-mode toggle. That changes <code>theme</code>, so the component
            re-renders — and the filter runs over all 10,000 products again, even though
            <code> products</code> and <code>search</code> did not change at all. The toggle feels sluggish.
          </Result>

          <div className={styles.codeLabel}>With useMemo — only re-filters when it matters</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`const visible = useMemo(
  () => products.filter(p => p.name.includes(search)),
  [products, search]   // theme is not here, so toggling it reuses the old answer
);`} />

          <Steps title="What React does on each render"
            steps={[
              { label: 'Compare', text: <>Look at <code>[products, search]</code> and compare with last render.</> },
              { label: 'Unchanged?', text: 'Hand back the answer it already has. The filter never runs.' },
              { label: 'Changed?', text: 'Run the function again and remember the new answer.' },
            ]} />

          <Pitfall>
            Wrapping everything in useMemo. Remembering an answer costs memory and a comparison on
            every render, so for cheap work — adding two numbers, formatting a date — useMemo is
            <em> slower</em> than just doing it. Reach for it when you can measure a problem, not before.
          </Pitfall>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 13.4: useCallback</h2>
          <p className={styles.paragraph}><code>useCallback</code> is <code>useMemo</code>’s twin. useMemo remembers a <em>value</em>; useCallback remembers a <em>function</em>. To understand why anyone would want that, you need one fact about JavaScript first.</p>

          <div className={styles.codeLabel}>Two identical functions are not equal</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`const a = () => console.log('hi');
const b = () => console.log('hi');

a === b;   // false — they look the same, but they are two separate objects`} />

          <PlainEnglish>
            Every time your component renders, any function written inside it is built fresh. It does
            the same thing, but as far as JavaScript is concerned it is a brand new object.
          </PlainEnglish>

          <h3 className={styles.subtitle}>Why that causes a problem</h3>
          <p className={styles.paragraph}>A child component wrapped in <code>React.memo</code> promises to skip re-rendering when its props have not changed. But if you pass it a function, that prop is a <em>new</em> function on every render — so the child sees a changed prop and re-renders anyway. The optimisation quietly does nothing.</p>

          <div className={styles.codeLabel}>The fix</div>
          <CodeSnippet isRunnable={false} language="JavaScript" code={`// New function object every render — React.memo on Child is defeated
const handleClick = () => addToCart(id);

// Same function object until \`id\` changes — React.memo now works
const handleClick = useCallback(() => addToCart(id), [id]);`} />

          <Compare columns={[
            { title: 'useMemo', tone: 'olive', items: [
              'Remembers the result of running a function',
              'useMemo(() => filter(list), [list])',
              'Gives you back a value',
            ] },
            { title: 'useCallback', tone: 'honey', items: [
              'Remembers the function itself',
              'useCallback(() => save(id), [id])',
              'Gives you back a function',
            ] },
          ]} />

          <Pitfall>
            Adding useCallback to a function that is only used inside the same component, or passed to
            a child that is not wrapped in <code>React.memo</code>. It changes nothing and makes the
            code harder to read. useCallback only pays off when something downstream is comparing the
            function by identity.
          </Pitfall>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 13.5: Custom Hooks</h2>
          <p className={styles.paragraph}>Custom hooks let you extract component logic into reusable functions. A custom hook is a Javascript function whose name starts with <code>use</code> and that can call other hooks.</p>
          
          <div className={styles.codeLabel}>Custom useWindowSize Hook</div>
          <CodeSnippet isRunnable={true} language="JavaScript" code={`import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`} />
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Hooks Project</h2>
          <p className={styles.paragraph}>Build a Stopwatch using useEffect and useRef hooks to manage accurate intervals and state mutations.</p>
          
          <h3 className={styles.subtitle}>Timer Project Playground</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent)', fontFamily: 'monospace', marginBottom: '16px' }}>
              {Math.floor(timerSeconds / 60)}m : {timerSeconds % 60}s
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className={styles.saveBtn} onClick={() => setTimerActive(!timerActive)}>
                {timerActive ? 'Pause Timer' : 'Start Timer'}
              </button>
              <button className={styles.backBtn} onClick={() => { setTimerActive(false); setTimerSeconds(0); }}>Reset</button>
            </div>
          </div>
        </div>
      );

    case 7:
      return <ModuleQuiz moduleId="frontend-m13" title="Module 13 Quiz" questions={quizQuestions} />;

    case 8:
      return (
        <ModuleAssignment
          moduleId="frontend-m13"
          title="Module 13 Assignment"
          questions={frontendAssignments.m13}
        />
      );

    default:
      return null;
  }
};

export default Module13;
