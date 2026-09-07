import React from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module4: React.FC<Props> = ({ page }) => {
  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: Which property makes a container a flex container?', options: ['A. flex: 1', 'B. display: flex', 'C. flexbox: true', 'D. flex-direction: row'], correctAnswer: 'B. display: flex' },
    { id: 2, question: 'Q2: What does justify-content control?', options: ['A. Vertical alignment', 'B. Horizontal alignment (main axis)', 'C. Font size', 'D. Item order'], correctAnswer: 'B. Horizontal alignment (main axis)' },
    { id: 3, question: 'Q3: Which property creates columns in CSS Grid?', options: ['A. grid-columns', 'B. grid-template-columns', 'C. column-template', 'D. display: columns'], correctAnswer: 'B. grid-template-columns' },
    { id: 4, question: 'Q4: What does flex-wrap: wrap do?', options: ['A. Prevents wrapping', 'B. Wraps items to next line when no space', 'C. Reverses items', 'D. Centers items'], correctAnswer: 'B. Wraps items to next line when no space' },
    { id: 5, question: 'Q5: What does "fr" unit stand for in CSS Grid?', options: ['A. Frame', 'B. Fraction', 'C. Full Row', 'D. Flex Ratio'], correctAnswer: 'B. Fraction' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.1: Introduction to Flexbox</h2>
          <p className={styles.paragraph}><strong>Flexbox</strong> (Flexible Box Layout) is a one-dimensional layout system designed for arranging items in rows or columns. It makes alignment, spacing, and distribution of space between items effortless.</p>
          <p className={styles.paragraph}>Before Flexbox, developers relied on complex hacks. Flexbox replaced all of that with clean, predictable layout behavior.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .container {
    display: flex; /* Enables Flexbox */
    background: #e2e8f0;
    padding: 10px;
    border-radius: 8px;
  }
  
  .item {
    background: #3b82f6;
    color: white;
    padding: 20px;
    margin: 5px;
    border-radius: 4px;
    font-weight: bold;
  }
</style>

<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>display: flex;</code>: This is applied to the <strong>parent container</strong>. Instantly, all direct children become "flex items".</li>
            <li>By default, flex items are arranged in a horizontal row, stretching from left to right.</li>
          </ul>

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Key Concept</p>
            <p className={styles.tipBoxText}>Flexbox works along a <strong>main axis</strong> (default: horizontal row) and a <strong>cross axis</strong> (perpendicular vertical column). Everything you do in Flexbox involves aligning items along one of these two axes!</p>
          </div>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.2: Flex Container Properties</h2>
          <p className={styles.paragraph}>The flex container controls the overall layout behavior. Two properties are most important: <code>justify-content</code> (Main Axis) and <code>align-items</code> (Cross Axis).</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .navbar {
    display: flex;
    justify-content: space-between; /* Spreads items apart horizontally */
    align-items: center; /* Centers items vertically */
    
    background: #1e293b;
    padding: 15px 30px;
    border-radius: 8px;
    color: white;
  }
  
  .links {
    display: flex;
    gap: 20px; /* Adds space between flex items! */
    list-style: none;
    margin: 0; padding: 0;
  }
</style>

<nav class="navbar">
  <div style="font-size: 24px; font-weight: bold;">Logo</div>
  <ul class="links">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>justify-content: space-between;</code>: Pushes the first item (Logo) to the far left, and the last item (the Links) to the far right.</li>
            <li><code>align-items: center;</code>: Ensures the Logo text and the Links text are perfectly centered vertically relative to each other.</li>
            <li><code>gap: 20px;</code>: A magical property that adds exactly 20px of space between items, without adding unnecessary margins to the outside edges!</li>
          </ul>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.3: Flex Item Properties</h2>
          <p className={styles.paragraph}>Individual flex items can be controlled to dictate how they grow or shrink relative to their siblings to fill available space.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .container { display: flex; gap: 10px; }
  
  .box { padding: 20px; color: white; text-align: center; border-radius: 6px; }
  
  /* Flex Shorthand: flex-grow | flex-shrink | flex-basis */
  
  .sidebar { 
    flex: 0 0 150px; /* Don't grow, don't shrink, strictly 150px wide */
    background: #ef4444; 
  }
  
  .main-content { 
    flex: 1; /* Grow to fill ALL remaining space! */
    background: #10b981; 
  }
</style>

<div class="container">
  <div class="box sidebar">Sidebar (Fixed)</div>
  <div class="box main-content">Main Content (Flexible)</div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>flex: 0 0 150px;</code>: This is shorthand for <code>flex-grow: 0</code>, <code>flex-shrink: 0</code>, and <code>flex-basis: 150px</code>. It locks the sidebar to exactly 150px.</li>
            <li><code>flex: 1;</code>: This tells the main content area to aggressively grow and consume whatever space the sidebar didn't use. This is the secret to modern responsive layouts!</li>
          </ul>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.4: Wrapping & Responsive Cards</h2>
          <p className={styles.paragraph}>By default, Flexbox tries to squeeze all items onto one single line. But with <code>flex-wrap</code>, we can create grids of cards that automatically wrap onto new lines on smaller screens!</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .card-container {
    display: flex;
    flex-wrap: wrap; /* Allows items to flow to the next row */
    gap: 15px;
  }
  
  .card {
    /* Grow if there's space, shrink if tight, try to be 200px wide */
    flex: 1 1 200px; 
    
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
</style>

<div class="card-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>flex-wrap: wrap;</code>: The magic switch that tells the container it's okay to break items onto a new line if they run out of room.</li>
            <li><code>flex: 1 1 200px;</code>: Because of this, each card wants to be 200px. If the container is 500px wide, 2 cards fit (400px), and they grow slightly to fill the remaining 100px! The rest wrap to the next line.</li>
          </ul>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.5: Introduction to CSS Grid</h2>
          <p className={styles.paragraph}><strong>CSS Grid</strong> is a two-dimensional layout system. While Flexbox is amazing for a single row of items (1D), Grid excels at building full page layouts (Rows AND Columns simultaneously).</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .grid-container {
    display: grid;
    /* Create 3 columns of equal size using the 'fr' (fraction) unit */
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  
  .cell {
    background: #8b5cf6;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 4px;
  }
</style>

<div class="grid-container">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>display: grid;</code>: Turns the container into a Grid. Direct children become grid items.</li>
            <li><code>grid-template-columns: 1fr 1fr 1fr;</code>: We explicitly tell the browser to carve the space into 3 equal columns. The <code>fr</code> unit stands for "fraction of available space".</li>
            <li>Grid automatically places the 6 items into the 3 columns, wrapping exactly when expected to create a perfect 3x2 grid.</li>
          </ul>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.6: Grid Rows, Columns & Spanning</h2>
          <p className={styles.paragraph}>Grid's true power comes from its ability to define precise row and column templates, and allow items to stretch across multiple cells!</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .layout {
    display: grid;
    /* Column 1: 150px. Column 2: The rest of the space */
    grid-template-columns: 150px 1fr;
    gap: 10px;
  }
  
  .box { padding: 20px; color: white; text-align: center; border-radius: 4px; }
  
  /* Make the header stretch across ALL columns */
  .header { grid-column: 1 / -1; background: #f59e0b; }
  
  .sidebar { background: #ec4899; }
  .content { background: #06b6d4; min-height: 100px; }
  
  .footer { grid-column: 1 / -1; background: #10b981; }
</style>

<div class="layout">
  <div class="box header">Header (Spans across!)</div>
  <div class="box sidebar">Sidebar</div>
  <div class="box content">Main Content Area</div>
  <div class="box footer">Footer (Spans across!)</div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>grid-template-columns: 150px 1fr;</code>: Creates exactly 2 columns. A fixed left sidebar (150px), and a flexible right content area (1fr).</li>
            <li><code>grid-column: 1 / -1;</code>: This is a powerful trick. It tells the item to start at grid line 1 (the far left edge), and stretch to line -1 (the absolute far right edge), effectively spanning across all columns!</li>
          </ul>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 4.7: Dashboard Layout with Grid Areas</h2>
          <p className={styles.paragraph}>Let's build a complex Dashboard layout using <strong>Grid Template Areas</strong>. This feature allows you to literally "draw" your layout using strings!</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .dashboard {
    display: grid;
    /* Draw the layout visually! */
    grid-template-areas:
      "nav  nav  nav"
      "side main main"
      "side foot foot";
    grid-template-columns: 150px 1fr 1fr;
    grid-template-rows: auto 150px auto;
    gap: 8px;
  }
  
  .box { padding: 15px; color: white; font-weight: bold; border-radius: 4px; }
  
  /* Assign HTML elements to the named areas */
  .header  { grid-area: nav;  background: #f43f5e; }
  .sidebar { grid-area: side; background: #8b5cf6; }
  .main    { grid-area: main; background: #3b82f6; }
  .footer  { grid-area: foot; background: #10b981; }
</style>

<div class="dashboard">
  <header class="box header">Top Navigation</header>
  <aside class="box sidebar">Sidebar Menu</aside>
  <main class="box main">Dashboard Content Area</main>
  <footer class="box footer">Dashboard Footer</footer>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>grid-template-areas</code>: Notice how the string literally looks like the resulting layout! We map out names like "nav", "side", "main", and "foot".</li>
            <li><code>grid-area: nav;</code>: We then assign our actual HTML elements to those named blocks. Grid handles all the complicated sizing and positioning math for us automatically!</li>
          </ul>
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Flexbox & Grid Project: Landing Page</h2>
          <p className={styles.paragraph}>Build a complete landing page using both Flexbox and Grid to demonstrate mastery of both layout systems.</p>
          <h3 className={styles.subtitle}>Project Requirements</h3>
          <div className={styles.stepsContainer}>
            <div className={styles.stepBlock}><span className={styles.stepNum}>1</span><p className={styles.stepText}><strong>Navbar</strong> (Flexbox): Logo left, navigation links center, CTA button right.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>2</span><p className={styles.stepText}><strong>Hero Section</strong> (Flexbox): Two-column layout with text left and image right.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>3</span><p className={styles.stepText}><strong>Features Grid</strong> (CSS Grid): 3-column grid of feature cards with icons.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>4</span><p className={styles.stepText}><strong>Testimonials</strong> (Flexbox): Horizontally scrolling testimonial cards.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>5</span><p className={styles.stepText}><strong>Footer</strong> (Grid): Multi-column footer using Grid Template Areas.</p></div>
          </div>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>🎯 Deliverable</p>
            <p className={styles.tipBoxText}>Submit HTML + CSS files. The page should use Flexbox for component-level layouts (navbar, hero) and Grid for section-level layouts (features, footer).</p>
          </div>
        </div>
      );

    case 9:
      return <ModuleQuiz moduleId="frontend-m4" title="Module 4 Quiz: Flexbox & Grid" questions={quizQuestions} />;

    case 10:
      return (
        <ModuleAssignment
          moduleId="frontend-m4"
          title="Module 4 Assignment"
          questions={frontendAssignments.m4}
        />
      );

    default:
      return null;
  }
};

export default Module4;
