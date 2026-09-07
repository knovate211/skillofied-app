import React from 'react';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';

interface Props { page: number; }

const Module2: React.FC<Props> = ({ page }) => {
  const quizQuestions = [
    { id: 1, question: 'Q1: What does HTML stand for?', options: ['A. Hyper Transfer Markup Language', 'B. HyperText Markup Language', 'C. Home Tool Markup Language', 'D. Hyperlinks and Text Markup Language'], correctAnswer: 'B. HyperText Markup Language' },
    { id: 2, question: 'Q2: Which tag is used for the largest heading?', options: ['A. <heading>', 'B. <h6>', 'C. <h1>', 'D. <head>'], correctAnswer: 'C. <h1>' },
    { id: 3, question: 'Q3: Which element is used for creating a hyperlink?', options: ['A. <link>', 'B. <a>', 'C. <href>', 'D. <nav>'], correctAnswer: 'B. <a>' },
    { id: 4, question: 'Q4: Which tag is used for an unordered list?', options: ['A. <ol>', 'B. <li>', 'C. <ul>', 'D. <list>'], correctAnswer: 'C. <ul>' },
    { id: 5, question: 'Q5: What is the correct HTML element for inserting a line break?', options: ['A. <break>', 'B. <lb>', 'C. <br>', 'D. <newline>'], correctAnswer: 'C. <br>' },
    { id: 6, question: 'Q6: Which input type creates a checkbox?', options: ['A. <input type="check">', 'B. <input type="checkbox">', 'C. <input type="tick">', 'D. <checkbox>'], correctAnswer: 'B. <input type="checkbox">' },
  ];

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.1: Introduction to HTML</h2>
          <p className={styles.paragraph}>HTML (<strong>HyperText Markup Language</strong>) is the standard language used to create and structure content on the web. Every website you have ever visited, from simple blogs to complex applications like Netflix and YouTube, is built with HTML at its core.</p>
          <p className={styles.paragraph}>HTML is not a programming language because it does not handle logic (like math, conditions, or data processing) — it is a <strong>markup language</strong>. It uses "tags" to wrap around text and media to define what they are, such as headings, paragraphs, images, and links. The web browser reads these tags and displays the page accordingly.</p>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Key Concept</p>
            <p className={styles.tipBoxText}>Think of HTML as the skeleton of a website. Just like a building needs a steel frame before walls and paint, a website needs HTML before CSS (styling) and JavaScript (interactivity).</p>
          </div>
          <h3 className={styles.subtitle}>Your First HTML Code</h3>
          <p className={styles.paragraph}>Below is the simplest example of a complete HTML page. Let's look at the code first, and then break it down line by line.</p>
          <CodeSnippet language="HTML" code={`<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to HTML.</p>
  </body>
</html>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;!DOCTYPE html&gt;</code>: This declaration tells the browser that this document uses HTML5, the latest version of HTML.</li>
            <li><code>&lt;html&gt;</code>: This is the root element that wraps all the content on the entire page. Notice it closes at the very end with <code>&lt;/html&gt;</code>.</li>
            <li><code>&lt;head&gt;</code>: This section contains "meta" information about the page. Things in the head are not visible to the user, except for the title.</li>
            <li><code>&lt;title&gt;</code>: Sets the title of the webpage, which appears in the browser tab.</li>
            <li><code>&lt;body&gt;</code>: Everything inside the body tag is what the user actually sees on the webpage (text, images, links).</li>
            <li><code>&lt;h1&gt;</code>: Defines a top-level, large heading. The text "Hello, World!" will be bold and large.</li>
            <li><code>&lt;p&gt;</code>: Defines a standard paragraph of text.</li>
          </ul>
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.2: HTML Document Structure</h2>
          <p className={styles.paragraph}>While the previous lesson showed a simple HTML page, real-world web pages require a bit more setup. Every HTML document must follow a specific, rigid structure so browsers (like Chrome, Safari, or Firefox) know exactly how to render it properly on different devices.</p>
          <CodeSnippet language="HTML" code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
  </head>
  <body>
    <h1>Content goes here</h1>
  </body>
</html>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;html lang="en"&gt;</code>: Adding the <code>lang</code> attribute tells browsers and search engines the language of the page (English). This is vital for accessibility tools like screen readers.</li>
            <li><code>&lt;meta charset="UTF-8"&gt;</code>: This tells the browser to use the UTF-8 character encoding, which covers almost all characters and symbols in the world, including emojis (😊). Without this, special characters might show up as broken symbols.</li>
            <li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>: This line is critical for mobile responsiveness. It forces the website width to match the device screen width, preventing the site from zooming out automatically on phones.</li>
          </ul>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Remember</p>
            <p className={styles.tipBoxText}>The <code>&lt;head&gt;</code> is invisible to users — it provides instructions to the browser. The <code>&lt;body&gt;</code> is everything the user actually sees.</p>
          </div>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.3: Headings and Paragraphs</h2>
          <p className={styles.paragraph}>Structuring text is the most basic function of HTML. HTML provides six levels of headings (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) and the <code>&lt;p&gt;</code> tag for paragraphs. Headings create a hierarchical structure for your content, much like a table of contents in a book.</p>
          <CodeSnippet language="HTML" code={`<h1>Main Title (Largest)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>

<p>This is a paragraph of text. Paragraphs are
   block-level elements that create spacing.</p>

<p>Use <br> for a line break within a paragraph.</p>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>: These tags create headings of decreasing importance and visual size. <code>&lt;h1&gt;</code> is for the page's main title, while <code>&lt;h6&gt;</code> is the least important. By default, browsers render them in bold text with built-in spacing above and below.</li>
            <li><code>&lt;p&gt;</code>: The paragraph tag is used for standard blocks of text. Browsers automatically add a margin before and after a paragraph to separate it from surrounding content.</li>
            <li><code>&lt;br&gt;</code>: The line-break tag is a "self-closing" tag (it doesn't need an ending <code>&lt;/br&gt;</code>). It forces text to drop to the next line immediately without creating the extra spacing that a new <code>&lt;p&gt;</code> tag would create.</li>
          </ul>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>⚠️ Best Practice</p>
            <p className={styles.tipBoxText}>Never skip heading levels (e.g., don't jump from &lt;h1&gt; to &lt;h4&gt;). This hurts SEO and accessibility. Always use &lt;h1&gt; → &lt;h2&gt; → &lt;h3&gt; in order.</p>
          </div>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.4: Text Formatting Tags</h2>
          <p className={styles.paragraph}>HTML provides several tags to format and emphasize text. While CSS is generally used for visual styling, HTML formatting tags are used to add <strong>meaning</strong> and <strong>semantics</strong> to the text, which is important for accessibility (screen readers) and search engines.</p>
          <CodeSnippet language="HTML" code={`<p>This is <strong>very important</strong> text.</p>
<p>Water formula: H<sub>2</sub>O</p>
<p>Area = πr<sup>2</sup></p>
<p>This is <mark>highlighted</mark> for attention.</p>
<p>Price: <del>₹999</del> <strong>₹499</strong></p>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;strong&gt;</code>: Makes the text bold, but more importantly, it semantically marks the text as having strong importance. A screen reader will read this text with a different tone of voice.</li>
            <li><code>&lt;sub&gt;</code>: Creates subscript text (appears slightly below the normal baseline). Ideal for chemical formulas like H₂O.</li>
            <li><code>&lt;sup&gt;</code>: Creates superscript text (appears slightly above the normal baseline). Ideal for mathematical exponents or ordinal numbers (like 1st, 2nd).</li>
            <li><code>&lt;mark&gt;</code>: Highlights text (usually with a yellow background by default) to draw attention to it for reference purposes.</li>
            <li><code>&lt;del&gt;</code>: Represents text that has been deleted or is no longer accurate. Browsers render this with a strikethrough line across it, commonly used in pricing discounts.</li>
          </ul>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.5: Links and Navigation</h2>
          <p className={styles.paragraph}>The anchor tag <code>&lt;a&gt;</code> is arguably the most important HTML element. It creates clickable hyperlinks that connect different web pages together — which is literally the foundation of the World Wide Web.</p>
          <CodeSnippet language="HTML" code={`<!-- External link -->
<a href="https://www.google.com" target="_blank" rel="noopener">Visit Google</a>

<!-- Internal page link -->
<a href="/about.html">About Us</a>

<!-- Email link -->
<a href="mailto:info@skillofied.com">Email Us</a>

<!-- Anchor link (jump to section) -->
<a href="#contact">Go to Contact Section</a>

<section id="contact">
  <h2>Contact Us</h2>
</section>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;a href="..."&gt;</code>: The <code>href</code> (Hypertext Reference) attribute is required. It dictates where the link goes when clicked.</li>
            <li><code>target="_blank"</code>: This attribute tells the browser to open the linked page in a brand new tab, keeping your original website open.</li>
            <li><code>rel="noopener"</code>: A security attribute you should always pair with <code>target="_blank"</code>. It prevents the newly opened page from gaining malicious control over the original page via Javascript.</li>
            <li><code>href="/about.html"</code>: A relative path. It looks for a file named \`about.html\` in the same website, rather than going out to the internet.</li>
            <li><code>mailto:...</code>: A special URL scheme that opens the user's default email client (like Outlook or Apple Mail) pre-filled with the provided email address.</li>
            <li><code>href="#contact"</code>: The hashtag denotes an ID. When clicked, the browser will smoothly scroll down the page to the element that has the matching <code>id="contact"</code>.</li>
          </ul>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.6: Images and Multimedia</h2>
          <p className={styles.paragraph}>A web page is often more engaging with visual content. HTML provides specialized tags for embedding images, video, and audio directly into your layout.</p>
          <CodeSnippet isRunnable={true} language="HTML" code={`<!-- Basic image -->
<img src="photo.jpg" alt="A beautiful sunset over the mountains" width="400">

<!-- Image with figure caption -->
<figure>
  <img src="team.jpg" alt="Our development team">
  <figcaption>The Skillofied development team, 2024</figcaption>
</figure>

<!-- Video element -->
<video width="640" controls>
  <source src="intro.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;img src="..."&gt;</code>: The <code>src</code> (source) attribute points to the image file. The <code>&lt;img&gt;</code> tag is self-closing.</li>
            <li><code>alt="..."</code>: The Alternative Text attribute. <strong>This is mandatory for accessibility.</strong> If the image fails to load, this text is displayed instead. Screen readers will also read this aloud to visually impaired users.</li>
            <li><code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code>: These tags are used together to semantically group an image with its caption. It tells the browser that the caption specifically belongs to that exact image.</li>
            <li><code>&lt;video controls&gt;</code>: The <code>controls</code> attribute is a boolean attribute (it doesn't need a value). Its presence tells the browser to display play/pause, volume, and fullscreen buttons over the video.</li>
            <li><code>&lt;source&gt;</code>: Placed inside the video tag, it defines multiple media resources. If the browser doesn't support the first format (e.g. mp4), you can provide alternative formats below it. The text at the bottom only shows if the browser completely fails to support HTML5 video.</li>
          </ul>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.7: Lists (Ordered & Unordered)</h2>
          <p className={styles.paragraph}>Lists are a clean, structured way to display grouped items. HTML supports unordered lists (bullet points), ordered lists (numbered), and nested lists (lists within lists).</p>
          <CodeSnippet isRunnable={true} language="HTML" code={`<!-- Unordered List -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>Learn HTML basics</li>
  <li>Practice CSS styling</li>
  <li>Build a project</li>
</ol>

<!-- Nested Lists -->
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
</ul>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;ul&gt;</code>: Stands for Unordered List. By default, items inside it will have black circle bullet points. Ideal for shopping lists or features.</li>
            <li><code>&lt;ol&gt;</code>: Stands for Ordered List. Items inside will automatically be prefixed with sequential numbers (1, 2, 3). Ideal for step-by-step recipes or instructions.</li>
            <li><code>&lt;li&gt;</code>: Stands for List Item. Both <code>ul</code> and <code>ol</code> containers must only contain <code>li</code> tags as their direct children.</li>
            <li><strong>Nested Lists</strong>: Notice in the final example that the nested <code>&lt;ul&gt;</code> is placed <em>inside</em> an <code>&lt;li&gt;</code>. Browsers will automatically indent the nested list and use a different bullet point style (like an open circle).</li>
          </ul>
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.8: Tables</h2>
          <p className={styles.paragraph}>In the early days of the web, tables were used to build entire webpage layouts. Today, that is considered a terrible practice. HTML tables should <strong>only</strong> be used for organizing true tabular data — data that naturally belongs in rows and columns, like schedules, pricing tiers, and comparison charts.</p>
          <CodeSnippet isRunnable={true} language="HTML" code={`<table border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Course</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Frontend</td>
      <td>95</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Backend</td>
      <td>88</td>
    </tr>
  </tbody>
</table>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;table&gt;</code>: The main container for the entire table structure.</li>
            <li><code>&lt;thead&gt;</code>: The Table Header section. Grouping your header rows here helps screen readers understand the column names, and allows for clean styling via CSS later.</li>
            <li><code>&lt;tr&gt;</code>: Stands for Table Row. Every horizontal row (whether it contains headers or data) must be wrapped in a <code>tr</code> tag.</li>
            <li><code>&lt;th&gt;</code>: Stands for Table Header cell. Browsers default to making text inside this bold and centered. It denotes that this cell represents the title of a column.</li>
            <li><code>&lt;tbody&gt;</code>: The Table Body section. This contains all the actual data rows.</li>
            <li><code>&lt;td&gt;</code>: Stands for Table Data. These are the standard cells that hold your actual content inside a row. Notice that every <code>tr</code> in our body has exactly 3 <code>td</code> elements to match the 3 <code>th</code> headers!</li>
          </ul>
        </div>
      );

    case 9:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.9: Forms and Inputs</h2>
          <p className={styles.paragraph}>Forms are the primary way web applications collect data from users. Without forms, you couldn't log in to an app, perform a search query, or send a contact message.</p>
          <CodeSnippet isRunnable={true} language="HTML" code={`<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="user" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="pass">

  <label for="course">Course:</label>
  <select id="course" name="course">
    <option value="frontend">Frontend</option>
    <option value="backend">Backend</option>
  </select>

  <label>
    <input type="checkbox" name="terms"> I agree to terms
  </label>

  <button type="submit">Submit Form</button>
</form>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;form action="/submit" method="POST"&gt;</code>: The form container. <code>action</code> dictates where the data is sent on the server, and <code>method</code> defines the HTTP request type (POST securely sends data in the background).</li>
            <li><code>&lt;label for="username"&gt;</code>: Labels are crucial for usability. The <code>for</code> attribute must exactly match the <code>id</code> of an input. When a user clicks the label text, the browser will automatically focus the connected input box!</li>
            <li><code>&lt;input type="text" id="..." name="..."&gt;</code>: The fundamental text input. The <code>id</code> connects it to the label, while the <code>name</code> attribute is what the backend server uses to identify the data (e.g. the server receives \`user=John\`).</li>
            <li><code>required</code>: A boolean validation attribute. The browser will natively prevent the form from submitting if this field is left empty, showing a tooltip to the user.</li>
            <li><code>type="password"</code>: A special input type that masks the typed characters with dots or asterisks for security.</li>
            <li><code>&lt;select&gt;</code> and <code>&lt;option&gt;</code>: Creates a dropdown menu. The user sees the text ("Frontend"), but the form submits the hidden <code>value</code> attribute ("frontend").</li>
            <li><code>&lt;button type="submit"&gt;</code>: Clicking this button gathers all the input data inside the form and triggers the submission process.</li>
          </ul>
        </div>
      );

    case 10:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.10: Semantic HTML</h2>
          <p className={styles.paragraph}>In HTML, you can technically build an entire website using nothing but <code>&lt;div&gt;</code> tags. A "div" is a generic container with no inherent meaning. However, <strong>Semantic HTML</strong> uses tags that clearly describe their purpose. This makes your code easier to read for other developers, drastically improves SEO (Search Engine Optimization), and is essential for screen readers to navigate your site.</p>
          <CodeSnippet language="HTML" code={`<!-- Semantic (good) ✅ -->
<header>
  <h1>Skillofied</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
  </nav>
</header>
<main>
  <article>
    <h2>What is HTML?</h2>
    <p>HTML is the backbone of the web...</p>
  </article>
  <aside>
    <h3>Related Links</h3>
    <a href="#">Learn CSS</a>
  </aside>
</main>
<footer>
  <p>&copy; 2024 Skillofied</p>
</footer>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><code>&lt;header&gt;</code>: Defines introductory content, usually containing the site logo and main navigation.</li>
            <li><code>&lt;nav&gt;</code>: Specifically wraps major navigation links. Screen readers allow users to easily skip straight to the nav section.</li>
            <li><code>&lt;main&gt;</code>: Represents the dominant, primary content of the page. You should only ever have one <code>&lt;main&gt;</code> tag per page.</li>
            <li><code>&lt;article&gt;</code>: Represents a self-contained piece of content that could theoretically be syndicated independently, like a blog post or news article.</li>
            <li><code>&lt;aside&gt;</code>: Used for sidebars or content that is tangentially related to the main content around it.</li>
            <li><code>&lt;footer&gt;</code>: The bottom section of a page or article, typically containing copyright data, legal links, or author info.</li>
          </ul>
        </div>
      );

    case 11:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 2.11: Accessibility Basics</h2>
          <p className={styles.paragraph}>Web accessibility (often abbreviated as <strong>a11y</strong>) ensures that websites are usable by everyone, including people with visual, auditory, motor, or cognitive disabilities. Writing accessible HTML isn't just an afterthought—it's a fundamental responsibility of a Frontend Engineer, and in many countries, it's a legal requirement.</p>
          <h3 className={styles.subtitle}>Key Accessibility Implementations</h3>
          <CodeSnippet language="HTML" code={`<!-- Accessible Image -->
<img src="logo.png" alt="Skillofied company logo">

<!-- Accessible Button -->
<button aria-label="Close modal window">✕</button>

<!-- Accessible Input -->
<label for="search">Site Search</label>
<input type="text" id="search" aria-label="Search all courses">

<!-- Accessible Navigation -->
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
</nav>`} />
          <h3 className={styles.subtitle}>Code Breakdown</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            <li><strong>Alt Text:</strong> The <code>alt</code> attribute on the image describes what the image looks like. If a blind user navigates to this image, their screen reader will read "Skillofied company logo" aloud.</li>
            <li><strong>Aria Labels:</strong> The <code>aria-label</code> attribute provides an invisible, descriptive label for screen readers. The button simply displays a visual "✕" symbol which a sighted user understands means "close", but a screen reader might just read "times symbol" or nothing at all. The aria-label forces the screen reader to say "Close modal window" instead.</li>
            <li><strong>Forms:</strong> We use both a visual <code>&lt;label&gt;</code> (connected via the <code>for</code> attribute) and an <code>aria-label</code> to guarantee that users utilizing assistive tech immediately understand what they are typing into.</li>
            <li><strong>Nav Aria:</strong> If a site has multiple navigation menus (e.g., a top menu and a footer menu), adding <code>aria-label="Main navigation"</code> distinguishes this specific menu from the others.</li>
          </ul>
        </div>
      );

    case 12:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>HTML Mini Project: Personal Profile Page</h2>
          <p className={styles.paragraph}>Apply everything you've learned in Module 2 by building a <strong>Personal Profile Page</strong> using only HTML.</p>
          <h3 className={styles.subtitle}>Project Requirements</h3>
          <div className={styles.stepsContainer}>
            <div className={styles.stepBlock}><span className={styles.stepNum}>1</span><p className={styles.stepText}>Create a proper HTML5 document structure with <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>2</span><p className={styles.stepText}>Add a <code>&lt;header&gt;</code> with your name as <code>&lt;h1&gt;</code> and a navigation bar with at least 3 links.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>3</span><p className={styles.stepText}>Create an "About Me" section with a paragraph and a profile image using <code>&lt;figure&gt;</code>.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>4</span><p className={styles.stepText}>Add a "Skills" section with an unordered list of at least 5 technologies.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>5</span><p className={styles.stepText}>Create a "Contact" form with name, email, message textarea, and submit button.</p></div>
            <div className={styles.stepBlock}><span className={styles.stepNum}>6</span><p className={styles.stepText}>Add a <code>&lt;footer&gt;</code> with copyright text and social media links.</p></div>
          </div>
          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>🎯 Deliverable</p>
            <p className={styles.tipBoxText}>Create a file named <code>profile.html</code>. It should open correctly in a browser showing your personal profile page with all the above elements. No CSS required yet — focus on structure only!</p>
          </div>
        </div>
      );

    case 13:
      return <ModuleQuiz moduleId="frontend-m2" title="Module 2 Quiz: HTML Fundamentals" questions={quizQuestions} />;

    case 14:
      return (
        <ModuleAssignment
          moduleId="frontend-m2"
          title="Module 2 Assignment"
          questions={frontendAssignments.m2}
        />
      );

    default:
      return null;
  }
};

export default Module2;
