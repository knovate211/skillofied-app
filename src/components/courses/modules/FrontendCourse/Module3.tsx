import React from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module3: React.FC<Props> = ({ page }) => {
  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What does CSS stand for?', options: ['A. Computer Style Sheets', 'B. Cascading Style Sheets', 'C. Creative Style Syntax', 'D. Colorful Style Sheets'], correctAnswer: 'B. Cascading Style Sheets' },
    { id: 2, question: 'Q2: Which property changes text color?', options: ['A. font-color', 'B. text-color', 'C. color', 'D. foreground'], correctAnswer: 'C. color' },
    { id: 3, question: 'Q3: Which CSS property controls the space between content and border?', options: ['A. margin', 'B. padding', 'C. spacing', 'D. gap'], correctAnswer: 'B. padding' },
    { id: 4, question: 'Q4: What does "display: none" do?', options: ['A. Makes element invisible but keeps space', 'B. Removes element from the page completely', 'C. Shows the element', 'D. Fades out the element'], correctAnswer: 'B. Removes element from the page completely' },
    { id: 5, question: 'Q5: Which selector has the highest specificity?', options: ['A. Element (p)', 'B. Class (.box)', 'C. ID (#main)', 'D. Universal (*)'], correctAnswer: 'C. ID (#main)' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.1: Introduction to CSS</h2>
          <p className={styles.paragraph}><strong>CSS (Cascading Style Sheets)</strong> is the language used to style and layout HTML elements. While HTML provides the structure (the skeleton), CSS makes it visually appealing with colors, fonts, spacing, and layouts (the skin and clothes).</p>
          <p className={styles.paragraph}>There are three ways to apply CSS to an HTML document. Let's look at the most common ones:</p>
          
          <h3 className={styles.subtitle}>Inline CSS</h3>
          <p className={styles.paragraph}>You can write CSS directly inside an HTML tag using the <code>style</code> attribute. This is generally avoided for large projects but is useful for quick testing.</p>
          <CodeSnippet language="HTML" code={`<h1 style="color: blue; font-size: 24px;">Hello Inline CSS</h1>
<p style="background-color: yellow; padding: 10px;">This paragraph has a yellow background.</p>`} />
          
          <h3 className={styles.subtitle}>Internal CSS</h3>
          <p className={styles.paragraph}>You can place CSS rules inside a <code>&lt;style&gt;</code> tag within the <code>&lt;head&gt;</code> of your HTML document. This keeps the HTML tags clean.</p>
          <CodeSnippet language="HTML" code={`<style>
  h1 { 
    color: red; 
    font-size: 32px; 
    text-align: center;
  }
</style>

<h1>Hello Internal CSS</h1>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>style="..."</code>: In the first example, CSS is applied directly to the specific tag. It overrides almost all other CSS.</li>
            <li><code>&lt;style&gt;</code>: In the second example, we write CSS rules. The <code>h1</code> tells the browser to target all H1 elements on the page.</li>
            <li><code>color</code> and <code>font-size</code>: These are CSS properties that dictate how the targeted element should look.</li>
          </ul>

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Best Practice: External CSS</p>
            <p className={styles.tipBoxText}>In the real world, you create a separate file named <code>styles.css</code> and link it in your HTML using <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code>. This allows you to style thousands of HTML pages with just one CSS file!</p>
          </div>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.2: CSS Syntax</h2>
          <p className={styles.paragraph}>Every CSS rule consists of a <strong>selector</strong> (what to target) and a <strong>declaration block</strong> (how to style it). The declaration block contains one or more property-value pairs.</p>
          
          <div className={styles.visualFlow}>
            <div className={styles.flowItem}>Selector → h1</div>
            <div className={styles.flowArrow}>↓</div>
            <div className={styles.flowItem}>Property → color</div>
            <div className={styles.flowArrow}>:</div>
            <div className={styles.flowItem}>Value → #333333</div>
            <div className={styles.flowArrow}>;</div>
          </div>

          <CodeSnippet language="HTML" code={`<style>
  h2 {
    color: #4648d4;
    font-size: 28px;
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<h2>This is a styled heading!</h2>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>h2</code>: This is the <strong>selector</strong>. It selects all <code>&lt;h2&gt;</code> elements.</li>
            <li><code>{'{ ... }'}</code>: The curly braces enclose the <strong>declaration block</strong>. All styles for the selector go inside here.</li>
            <li><code>color: #4648d4;</code>: This is a <strong>declaration</strong>. It consists of a property (color) and a value (#4648d4).</li>
            <li><strong>Semicolon (;)</strong>: Every declaration MUST end with a semicolon. If you forget it, the browser will fail to read the next lines of CSS!</li>
          </ul>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.3: Selectors and Specificity</h2>
          <p className={styles.paragraph}>CSS selectors determine which HTML elements receive your styles. If multiple conflicting styles target the same element, the browser uses a scoring system called <strong>Specificity</strong> to decide which style wins.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  /* 1. Element Selector (Lowest Priority) */
  p { color: black; }

  /* 2. Class Selector (Medium Priority) */
  .highlight { color: blue; }

  /* 3. ID Selector (High Priority) */
  #urgent { color: red; }
</style>

<p>I am a normal paragraph (Black).</p>
<p class="highlight">I have a class (Blue).</p>
<p class="highlight" id="urgent">I have both, but ID wins (Red).</p>
<p class="highlight" id="urgent" style="color: green;">Inline style wins over EVERYTHING (Green).</p>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>p</code>: Targets elements strictly by their HTML tag name.</li>
            <li><code>.highlight</code>: The dot (<code>.</code>) denotes a Class selector. It targets any element with <code>class="highlight"</code>. Classes can be reused infinitely.</li>
            <li><code>#urgent</code>: The hash (<code>#</code>) denotes an ID selector. It targets the element with <code>id="urgent"</code>. IDs should be totally unique per page.</li>
            <li><strong>Specificity:</strong> Inline styles &gt; IDs &gt; Classes &gt; Elements. The browser calculates the score to resolve conflicts!</li>
          </ul>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.4: Colors and Backgrounds</h2>
          <p className={styles.paragraph}>CSS provides multiple ways to define colors. You can use named colors, Hex codes, RGB, or HSL to create beautiful combinations and backgrounds.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .box-named { background-color: tomato; color: white; padding: 10px; margin: 5px; }
  
  .box-hex { background-color: #38bdf8; color: #fff; padding: 10px; margin: 5px; }
  
  .box-rgba { 
    background-color: rgba(16, 185, 129, 0.5); /* 50% opacity green */
    padding: 10px; margin: 5px; 
  }
  
  .box-gradient {
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    color: white; padding: 20px; margin: 5px;
    font-weight: bold;
  }
</style>

<div class="box-named">Named Color (tomato)</div>
<div class="box-hex">Hexadecimal (#38bdf8)</div>
<div class="box-rgba">RGBA with 50% transparency</div>
<div class="box-gradient">Linear Gradient Background</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><strong>Hexadecimal:</strong> <code>#RRGGBB</code>. A standard way to represent colors using base-16 numbers. It ranges from 00 to FF.</li>
            <li><strong>RGBA:</strong> <code>rgba(R, G, B, Alpha)</code>. The Alpha channel ranges from 0.0 (fully transparent) to 1.0 (fully solid). This is great for overlay effects!</li>
            <li><strong>Linear Gradients:</strong> Instead of a solid color, you can generate a smooth transition between two or more colors using the <code>background</code> property. The <code>90deg</code> value makes the gradient flow from left to right.</li>
          </ul>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.5: Typography</h2>
          <p className={styles.paragraph}>Typography controls how text appears on your page. Good typography significantly improves readability and the overall premium feel of your user interface.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .fancy-text {
    font-family: "Courier New", Courier, monospace;
    font-size: 24px;
    font-weight: 700; /* Bold */
    color: #333;
    
    text-transform: uppercase;
    letter-spacing: 4px;
    text-align: center;
    
    /* Adds a subtle drop shadow to the text */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  .body-text {
    font-family: Arial, sans-serif;
    line-height: 1.8; /* Adds breathing room between lines */
    color: #555;
  }
</style>

<h2 class="fancy-text">Skillofied Courses</h2>
<p class="body-text">
  By increasing the line-height, this paragraph becomes much easier to read. 
  When lines of text are too cramped together, the user's eye can accidentally jump 
  to the wrong line. Good spacing is the secret to great web design!
</p>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>font-family</code>: Defines the typeface. We provide fallbacks (like <code>sans-serif</code>) just in case the first font isn't installed on the user's computer.</li>
            <li><code>text-transform</code>: Can automatically force text to be <code>uppercase</code>, <code>lowercase</code>, or <code>capitalize</code> without changing the actual HTML content.</li>
            <li><code>line-height: 1.8</code>: Makes the vertical space between lines of text 1.8 times the size of the font. A standard line-height of 1.5 to 1.8 is considered best practice for readability.</li>
          </ul>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.6: The Box Model</h2>
          <p className={styles.paragraph}>Every HTML element is treated as a rectangular box. The CSS Box Model dictates how the size of that box is calculated. It consists of Content, Padding, Border, and Margin.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .box {
    width: 200px;
    
    /* 1. Padding: Space INSIDE the border */
    padding: 20px;
    
    /* 2. Border: The actual wall of the box */
    border: 5px solid #ef4444;
    
    /* 3. Margin: Space OUTSIDE the border (pushes other elements away) */
    margin: 20px;
    
    background-color: #f1f5f9;
    text-align: center;
  }
</style>

<div class="box">Box 1</div>
<div class="box">Box 2</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><strong>Content (Width/Height):</strong> The inner blue area where text/images actually live. (200px here)</li>
            <li><strong>Padding (Inner spacing):</strong> The invisible space between the content and the border. Increasing padding makes the box visually larger.</li>
            <li><strong>Border:</strong> A visible line wrapping the padding and content.</li>
            <li><strong>Margin (Outer spacing):</strong> Invisible space outside the border. Notice how Box 1 and Box 2 are pushed apart by 20px of margin!</li>
          </ul>
          
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>⚠️ Critical Fix: box-sizing</p>
            <p className={styles.tipBoxText}>By default, padding and borders are ADDED to the width you specify (200px width + 40px padding = 240px actual width). To fix this math headache, always add <code>* {`{ box-sizing: border-box; }`}</code> to the top of your CSS files!</p>
          </div>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.7: Borders and Shadows</h2>
          <p className={styles.paragraph}>Borders and shadows add depth and visual separation to your designs. Modern UI heavily relies on subtle box shadows to create elevated, premium-feeling "cards".</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .card {
    background: white;
    padding: 20px;
    width: 250px;
    
    /* Rounded corners */
    border-radius: 12px;
    
    /* Subtle Border */
    border: 1px solid #e2e8f0;
    
    /* X-offset, Y-offset, Blur-radius, Color */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    
    font-family: sans-serif;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    background: #38bdf8;
    border-radius: 50%; /* Perfect circle! */
    margin-bottom: 12px;
  }
</style>

<div style="padding: 20px; background: #f8fafc;">
  <div class="card">
    <div class="avatar"></div>
    <h3 style="margin: 0;">Jane Doe</h3>
    <p style="color: #64748b; margin: 5px 0 0;">Senior Developer</p>
  </div>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>border-radius: 12px;</code>: Softens the harsh 90-degree corners of the square box into a smooth curve.</li>
            <li><code>border-radius: 50%;</code>: Applying 50% border-radius to a square element turns it into a perfect circle, which is the standard way to create profile avatars.</li>
            <li><code>box-shadow</code>: The syntax is <code>x-offset y-offset blur color</code>. Here, we shifted the shadow 10px down, blurred it significantly by 25px, and used a very faint black (10% opacity). This creates a modern "floating" effect.</li>
          </ul>
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.8: Display Property</h2>
          <p className={styles.paragraph}>The <code>display</code> property dictates how elements sit next to each other on the page. The core fundamentals are <strong>block</strong> and <strong>inline</strong> elements.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .box {
    background: #3b82f6;
    color: white;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 6px;
  }
  
  .is-block {
    display: block; /* Takes up the FULL width */
  }
  
  .is-inline {
    display: inline; /* Takes up ONLY the space of its text */
  }
  
  .hidden {
    display: none; /* Completely removes it from the page */
  }
</style>

<div class="box is-block">I am a BLOCK element. I force a line break.</div>
<div class="box is-block">I am another BLOCK element below.</div>

<div class="box is-inline">Inline A</div>
<div class="box is-inline">Inline B</div>
<div class="box is-inline">Inline C sit next to each other!</div>

<div class="box hidden">You will never see me!</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>display: block;</code>: The element stretches to fill 100% of the available width, forcing elements after it onto a new line (like <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>).</li>
            <li><code>display: inline;</code>: The element only wraps its content. It doesn't break onto a new line (like <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>). *Note: Inline elements ignore width and height properties!*</li>
            <li><code>display: none;</code>: Hides the element entirely. The browser acts as if it doesn't exist in the HTML, pulling surrounding elements up to fill the gap.</li>
          </ul>
        </div>
      );

    case 9:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.9: Flexbox Layout (Flex)</h2>
          <p className={styles.paragraph}>For decades, aligning items in CSS was a nightmare. <strong>Flexbox</strong> (Flexible Box) changed everything. It is a powerful 1-dimensional layout module designed specifically to lay out, align, and distribute space among items in a container.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .container {
    display: flex;
    justify-content: space-between; /* Horizontal alignment */
    align-items: center; /* Vertical alignment */
    
    background: #f1f5f9;
    padding: 20px;
    border-radius: 8px;
    height: 100px;
  }
  
  .item {
    background: #4648d4;
    color: white;
    padding: 15px;
    border-radius: 6px;
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
            <li><code>display: flex;</code>: Turns the parent container into a Flexbox. All direct children instantly become "flex items" and sit in a row by default.</li>
            <li><code>justify-content: space-between;</code>: Controls the alignment along the main axis (horizontal). Space-between pushes the first item to the far left, the last to the far right, and centers the middle one perfectly. Other options: <code>center</code>, <code>flex-end</code>.</li>
            <li><code>align-items: center;</code>: Controls the alignment along the cross axis (vertical). It perfectly centers the items vertically inside the 100px tall container. This single property solved years of CSS centering headaches!</li>
          </ul>
        </div>
      );

    case 10:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.10: Position Property</h2>
          <p className={styles.paragraph}>The <code>position</code> property dictates exactly where an element is placed on the screen, breaking it out of the normal document flow if necessary. The most common use cases are for navigation bars and floating tooltips.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  .scroll-box {
    height: 200px;
    overflow-y: scroll;
    position: relative; /* Anchor for absolute child */
    border: 2px solid #ccc;
    padding: 20px;
  }
  
  .navbar {
    position: sticky;
    top: 0; /* Sticks to top when scrolling hits 0px */
    background: #10b981;
    color: white;
    padding: 10px;
    font-weight: bold;
  }
  
  .floating-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
  }
</style>

<div class="scroll-box">
  <div class="navbar">Sticky Header (Scroll down!)</div>
  <div class="floating-badge">New!</div>
  
  <p>Content block 1...</p>
  <p>Content block 2...</p>
  <p>Content block 3...</p>
  <p>Content block 4...</p>
  <p>Content block 5...</p>
</div>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>position: sticky;</code>: The element acts normally until you scroll past it, at which point it "sticks" to the coordinate you set (e.g., <code>top: 0</code>). Notice how the green header refuses to leave the screen!</li>
            <li><code>position: absolute;</code>: The element is ripped out of the normal flow and pinned to exact coordinates (<code>top: 10px, right: 10px</code>). Crucially, absolute elements look for the nearest parent that has <code>position: relative;</code> to use as their anchor map!</li>
          </ul>
        </div>
      );

    case 11:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 3.11: CSS Variables & Hover States</h2>
          <p className={styles.paragraph}>Modern CSS allows us to create interactive animations and use variables (custom properties) to easily manage color palettes across our entire app.</p>
          
          <CodeSnippet language="HTML" code={`<style>
  :root {
    --primary-color: #3b82f6;
    --hover-color: #1d4ed8;
    --transition-speed: 0.3s;
  }
  
  .btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    
    /* Instructs CSS to smoothly animate any changing properties */
    transition: all var(--transition-speed) ease;
  }
  
  /* The :hover pseudo-class activates when the mouse touches it */
  .btn:hover {
    background-color: var(--hover-color);
    transform: translateY(-3px); /* Lifts the button up */
    box-shadow: 0 10px 15px rgba(59, 130, 246, 0.4);
  }
</style>

<button class="btn">Hover over me!</button>`} />

          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>:root</code>: This represents the highest level of your HTML document. Defining variables (like <code>--primary-color</code>) here means they can be accessed by any element globally using <code>var()</code>.</li>
            <li><code>:hover</code>: A pseudo-class that only applies styles when the user hovers their cursor over the element.</li>
            <li><code>transition: all 0.3s ease;</code>: Without this, hover states instantly snap to the new styles. Adding a transition tells the browser to mathematically animate the color change and the lift-up effect over 0.3 seconds!</li>
          </ul>
        </div>
      );

    case 12:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>CSS Mini Project: Styled Profile Card</h2>
          <p className={styles.paragraph}>Take the HTML profile page from Module 2 and style it with everything you've learned in CSS Fundamentals.</p>
          <h3 className={styles.subtitle}>Project Requirements</h3>
          <div className={styles.stepsContainer}>
            <div className={styles.stepBlock}><span className={styles.stepNum}>1</span><p className={styles.stepText}>Create an external <code>styles.css</code> file and link it to your HTML.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>2</span><p className={styles.stepText}>Define CSS variables for your color scheme in the <code>:root</code> block.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>3</span><p className={styles.stepText}>Apply a global reset: <code>* {`{ box-sizing: border-box; margin: 0; }`}</code>.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>4</span><p className={styles.stepText}>Use Flexbox to perfectly center your profile card horizontally and vertically on the screen.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>5</span><p className={styles.stepText}>Style the card with a white background, rounded corners, and a subtle box shadow.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>6</span><p className={styles.stepText}>Add a <code>:hover</code> transition to the contact button.</p></div>
          </div>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>🎯 Deliverable</p>
            <p className={styles.tipBoxText}>Submit both <code>profile.html</code> and <code>styles.css</code>. The page should look professional with consistent colors, clean typography, and proper spacing.</p>
          </div>
        </div>
      );

    case 13:
      return <ModuleQuiz moduleId="frontend-m3" title="Module 3 Quiz: CSS Fundamentals" questions={quizQuestions} />;

    case 14:
      return (
        <ModuleAssignment
          moduleId="frontend-m3"
          title="Module 3 Assignment"
          questions={frontendAssignments.m3}
        />
      );

    default:
      return null;
  }
};

export default Module3;
