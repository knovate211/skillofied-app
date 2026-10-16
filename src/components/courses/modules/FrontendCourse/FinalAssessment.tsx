import React, { useState } from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import AssignmentIDE from '../../shared/AssignmentIDE';
import styles from '../../FrontendCoursePage.module.css';

interface Props { page: number; }

const FinalAssessment: React.FC<Props> = ({ page }) => {
  const starterCode = `function reverseString(str) {\n    // Return the reversed string\n    return "";\n}\n\nconsole.log(reverseString("hello"));\nconsole.log(reverseString("javascript"));`;
  const [codeAnswer, setCodeAnswer] = useState(starterCode);
  const [expandedViva, setExpandedViva] = useState<number | null>(null);

  const theoryQuestions = [
    { id: 1, question: 'Q1: What does CSS Box Model consist of, from outside to inside?', options: ["A. Margin, Border, Padding, Content", "B. Padding, Border, Margin, Content", "C. Content, Padding, Border, Margin", "D. Border, Margin, Content, Padding"], correctAnswer: "A. Margin, Border, Padding, Content" },
    { id: 2, question: 'Q2: What is the main difference between LocalStorage and SessionStorage?', options: ['A. Storage size limits', 'B. Data deletion timeline', 'C. Encryption types', 'D. None of the above'], correctAnswer: 'B. Data deletion timeline' },
    { id: 3, question: 'Q3: Why is React state mutation directly discouraged?', options: ['A. It compiles slowly', 'B. It blocks type checks', 'C. It skips rendering updates', 'D. It throws syntax errors'], correctAnswer: 'C. It skips rendering updates' },
    { id: 4, question: 'Q4: What is the main utility of git remote repository origin references?', options: ['A. Storing backup config settings', 'B. Mapping local folders to cloud databases', 'C. Hosting assets lists', 'D. Linking local repositories to remote GitHub locations'], correctAnswer: 'D. Linking local repositories to remote GitHub locations' },
  ];

  switch (page) {
    case 1:
      return (
        <ModuleQuiz
          moduleId="frontend-assessment"
          title="Final Theory Test"
          questions={theoryQuestions}
        />
      );

    case 2:
      return (
        <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
          <AssignmentIDE
            taskIndex={1}
            taskTotal={1}
            language="javascript"
            starterCode={starterCode}
            value={codeAnswer}
            onChange={setCodeAnswer}
            prompt='Complete the Javascript function to return the reverse of a string. e.g. reverseString("hello") returns "olleh".'
            submitted={false}
            onSubmit={() => {}}
            runnable={true}
            examples={[
              { input: 'reverseString("hello")', output: 'olleh' },
              { input: 'reverseString("javascript")', output: 'tpircsavaj' }
            ]}
          />
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Project Evaluation Rubric</h2>
          <p className={styles.paragraph}>To pass the Frontend Mastery course, your submitted projects must satisfy these grading rubrics:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {[
              { title: '1. Semantic Structure (15%)', desc: 'Valid HTML layout tags, appropriate header/main/footer configurations, and alt attribute definitions.' },
              { title: '2. Layout & Styles (25%)', desc: 'Flawless responsive layouts, mobile-first styling queries, container flexbox rules, grid spacing parameters.' },
              { title: '3. Programming & DOM Logic (20%)', desc: 'Proper event listeners attachments, error catches, fetch parses, LocalStorage state tracking.' },
              { title: '4. React Design (30%)', desc: 'Component structures reusability, modular props, state update bindings, routing Outlet placeholders, Context integration.' },
              { title: '5. Repository & CI Pipeline (10%)', desc: 'Descriptive Git commits history, clean README, deployed cloud build logs link.' }
            ].map((rubric, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface-2)', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                <h4 style={{ margin: '0 0 4px 0' }}>{rubric.title}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{rubric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Viva / Technical Interview Prep</h2>
          <p className={styles.paragraph}>Review these standard technical interview questions commonly asked by employers hiring Junior Frontend Developers:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            {[
              { q: 'Q1: What does semantic HTML mean and why is it important?', a: 'Semantic HTML refers to writing tag names that clearly describe their meaning and contents (e.g. <header> instead of <div class="header">). It is critical for SEO indexes mapping, browser compatibility, screen readers, and code readability.' },
              { q: 'Q2: How does the browser rendering engine handle script tags?', a: 'When the browser parser hits a script tag, it halts HTML parsing to download and execute it. Adding "defer" or "async" allows non-blocking background downloads, resolving page speed bottlenecks.' },
              { q: 'Q3: What is Event Delegation and how does it work?', a: 'Event delegation is a design pattern where you attach a single event listener to a parent element rather than individual child elements. The parent intercepts events that bubble up from children, improving memory performance.' },
              { q: 'Q4: What is the Virtual DOM and why does React use it?', a: 'The Virtual DOM is an in-memory representation of the real browser DOM. When component state changes, React updates this virtual tree first, compares it with a snapshot, and updates only the changed parts of the real DOM, optimizing page rendering speed.' },
              { q: 'Q5: Compare arrow functions and traditional functions.', a: 'Arrow functions feature cleaner implicit return syntaxes. Crucially, arrow functions inherit "this" lexical context from their surrounding scope, whereas traditional functions bind "this" dynamically based on invocation.' }
            ].map((viva, idx) => {
              const isOpen = expandedViva === idx;
              return (
                <div key={idx} style={{ background: 'var(--bg-surface-2)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedViva(isOpen ? null : idx)}>
                    <h4 style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-primary)' }}>{viva.q}</h4>
                    <span>{isOpen ? '▲' : '▼'}</span>
                  </div>
                  {isOpen && (
                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4', borderTop: '1px dashed var(--border)', paddingTop: '8px' }}>
                      {viva.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default FinalAssessment;
