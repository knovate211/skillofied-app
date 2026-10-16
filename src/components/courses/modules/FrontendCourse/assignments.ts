import { AssignmentQuestion } from '../../shared/ModuleAssignment';

/**
 * Frontend course assignments — every task is an IDE task.
 *
 * The sandbox executes python, javascript, java, cpp, go and sql only, so tasks
 * split into two kinds:
 *
 * - `run(...)`   JavaScript the learner can actually execute. `examples` list
 *                the lines the finished program is expected to print; Run Code
 *                checks each one against stdout.
 * - `write(...)` HTML, CSS, JSX, shell and friends. These get the same Monaco
 *                editor with real syntax highlighting, but no Run button —
 *                a mentor reviews the submission.
 *
 * Nothing here is auto-graded either way; the prompt has to state plainly what
 * a correct answer looks like.
 */

type Example = { input: string; output: string; explanation?: string };

/** A task the sandbox can execute. */
const run = (prompt: string, starterCode: string, examples: Example[]): AssignmentQuestion => ({
  kind: 'code',
  prompt,
  language: 'javascript',
  starterCode,
  runnable: true,
  examples,
});

/** A task in a language the sandbox cannot execute — editor only. */
const write = (prompt: string, language: string, starterCode: string): AssignmentQuestion => ({
  kind: 'code',
  prompt,
  language,
  starterCode,
  runnable: false,
});

export const frontendAssignments: Record<string, AssignmentQuestion[]> = {
  // ── Module 1: Introduction to Web Development ──────────────────────────────
  m1: [
    write(
      'Build the minimal HTML5 document every page starts from. Add the doctype, set the language to English on <html>, and inside <head> add the UTF-8 charset, the responsive viewport meta and a <title>. Put a single <h1> in the body naming the site.',
      'html',
      `<!-- TODO: add the HTML5 doctype above this line -->
<html>
  <head>
    <!-- TODO: charset meta -->
    <!-- TODO: viewport meta so the page scales on phones -->
    <!-- TODO: title -->
  </head>
  <body>
    <!-- TODO: one h1 naming your site -->
  </body>
</html>`,
    ),
    write(
      'Frontend, backend and database each own a different job. Fill in the three sections: give each an <h2> naming the layer and a <ul> of exactly three responsibilities that genuinely belong to that layer and not the other two.',
      'html',
      `<main>
  <section id="frontend">
    <h2>Frontend</h2>
    <ul>
      <li>Renders the interface the user sees and clicks</li>
      <!-- TODO: two more responsibilities that belong to the frontend -->
    </ul>
  </section>

  <section id="backend">
    <!-- TODO: h2 + ul with three backend responsibilities -->
  </section>

  <section id="database">
    <!-- TODO: h2 + ul with three database responsibilities -->
  </section>
</main>`,
    ),
    write(
      'Classify four real websites as static or dynamic. Complete the table: one row per site, with the site name, "Static" or "Dynamic", and a reason that refers to whether the page content changes per visitor or per request.',
      'html',
      `<table>
  <thead>
    <tr>
      <th scope="col">Website</th>
      <th scope="col">Type</th>
      <th scope="col">Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A restaurant menu page</td>
      <td>Static</td>
      <td>Every visitor is served the same prebuilt HTML</td>
    </tr>
    <!-- TODO: three more rows. Use at least two dynamic sites. -->
  </tbody>
</table>`,
    ),
    write(
      'Write the "tools I have installed" page for your setup. For each of the four tools give a <dt> with the tool name linked to its official site and a <dd> saying what you use it for. Links must open in a new tab safely (target and rel).',
      'html',
      `<h1>My Frontend Toolkit</h1>

<dl>
  <dt>
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VS Code</a>
  </dt>
  <dd>Editor where I write and format HTML, CSS and JavaScript.</dd>

  <!-- TODO: Chrome (and its DevTools), Git, and Node.js -->
</dl>`,
    ),
    write(
      'Turn the roadmap into a plan. Write an <ol> of the stages you will work through in order, and after it a short <section> with your own three learning goals as a <ul>. Order matters: the list should read the way the roadmap is actually learnt.',
      'html',
      `<h1>My Frontend Roadmap</h1>

<ol>
  <li>HTML — structure and semantics</li>
  <!-- TODO: the remaining stages, in the order you would learn them -->
</ol>

<section>
  <h2>My goals</h2>
  <!-- TODO: ul with three specific goals, e.g. "ship a portfolio site by March" -->
</section>`,
    ),
  ],

  // ── Module 2: HTML Fundamentals ────────────────────────────────────────────
  m2: [
    write(
      'This markup works but says nothing about meaning. Replace every <div> with the semantic element that describes its role — the banner, the navigation, the main content, the self-contained article, the aside and the footer. Keep the ids so the CSS still matches.',
      'html',
      `<div id="top">
  <h1>Kavya Rao</h1>
  <div id="menu">
    <a href="#work">Work</a>
    <a href="#about">About</a>
  </div>
</div>

<div id="content">
  <div id="post">
    <h2>How I built my first landing page</h2>
    <p>It took three evenings and a lot of margin debugging.</p>
  </div>
  <div id="related">
    <h2>Also read</h2>
  </div>
</div>

<div id="bottom">
  <p>&copy; 2026 Kavya Rao</p>
</div>`,
    ),
    write(
      'Build a sign-up form that a screen reader can read. Use at least five different input types (text, email, password, date, number, tel, url, checkbox or radio). Every control needs a <label> tied to it with for/id — placeholder text is not a label. Group the radio buttons in a <fieldset> with a <legend>, and mark the required fields.',
      'html',
      `<form action="/signup" method="post">
  <div>
    <label for="fullname">Full name</label>
    <input type="text" id="fullname" name="fullname" required />
  </div>

  <!-- TODO: email, password, date of birth, and a tel or number field -->

  <!-- TODO: a fieldset + legend wrapping two radio buttons for the plan -->

  <button type="submit">Create account</button>
</form>`,
    ),
    write(
      'Complete the grade sheet for three students. Use <thead> and <tbody>, give every header cell a scope so assistive tech can pair cells with headers, and add a <caption> describing the table.',
      'html',
      `<table>
  <!-- TODO: caption -->
  <thead>
    <tr>
      <th scope="col">Student</th>
      <th scope="col">Maths</th>
      <th scope="col">Science</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ananya</th>
      <td>88</td>
      <td>91</td>
      <td>179</td>
    </tr>
    <!-- TODO: two more students, each with a row header -->
  </tbody>
</table>`,
    ),
    write(
      'Fix this navigation and media block. Every link should say where it goes when read out of context ("click here" does not), the external link needs rel="noopener noreferrer", the image needs alt text that describes the image rather than repeating the filename, and the decorative divider image needs an empty alt so it is skipped.',
      'html',
      `<nav>
  <a href="/pricing">click here</a>
  <a href="https://github.com/skillofied" target="_blank">here</a>
</nav>

<figure>
  <img src="/team-photo-2026-final-v3.jpg" alt="team-photo-2026-final-v3.jpg" />
  <!-- TODO: figcaption -->
</figure>

<img src="/divider.svg" alt="divider" />`,
    ),
    write(
      'Show that you know which tag carries meaning and which only carries styling. Build a short recipe: an <ol> of steps, a nested <ul> of ingredients, and a paragraph that uses <strong> for a genuine warning, <em> for stress emphasis, and <b>/<i> only where the text is set apart for style with no extra importance. Add an HTML comment on each of the four explaining your choice.',
      'html',
      `<h2>Masala chai</h2>

<h3>Ingredients</h3>
<ul>
  <li>2 cups water</li>
  <!-- TODO: a few more -->
</ul>

<h3>Steps</h3>
<ol>
  <li>Boil the water with the crushed spices.</li>
  <!-- TODO: a few more -->
</ol>

<p>
  <!-- TODO: one strong, one em, one b and one i, each with a comment saying why -->
</p>`,
    ),
  ],

  // ── Module 3: CSS Fundamentals ─────────────────────────────────────────────
  m3: [
    write(
      'The card must occupy exactly 400px of horizontal space on the page. With the default box-sizing it does not — work out why, then fix it twice: once by adjusting the width by hand, and once with box-sizing. Leave both solutions in, with the hand-calculated one commented out, and write the arithmetic in a comment.',
      'css',
      `.card {
  width: 400px;
  padding: 24px;
  border: 2px solid #333;
  margin: 0 auto;
}

/* Total rendered width right now = ?  Show the arithmetic here. */

/* TODO 1: fix it by changing width, keeping the default content-box */

/* TODO 2: fix it with box-sizing instead, and say which you would ship */`,
    ),
    write(
      'Write five rules that target the same <a class="btn" id="save"> button, one at each specificity level: type, class, id, inline-equivalent and !important. Order them so the winner is obvious, and put the specificity score (a,b,c) in a comment above each.',
      'css',
      `/* <a class="btn" id="save" href="#">Save</a> */

/* 0,0,1 — type selector */
a {
  color: #555;
}

/* TODO: class selector, and its score */

/* TODO: id selector, and its score */

/* TODO: a compound selector that beats the id without using !important */

/* TODO: !important — and a comment on why you should almost never need it */`,
    ),
    write(
      'Style the card: 12px rounded corners, a soft shadow, and a hover state that lifts it slightly and deepens the shadow. The movement must be animated, not instant — transition only the properties that actually change, never `all`.',
      'css',
      `.card {
  background: #fff;
  padding: 20px;
  /* TODO: border-radius */
  /* TODO: box-shadow */
  /* TODO: transition — name the properties explicitly */
}

.card:hover {
  /* TODO: lift with transform, and a stronger shadow */
}

/* TODO: respect prefers-reduced-motion and turn the movement off */`,
    ),
    write(
      'Move every hard-coded value into custom properties so the theme can be swapped in one place. Declare the tokens on :root, use var() everywhere below, and add a [data-theme="dark"] block that only redefines the tokens — no rule below :root may be duplicated.',
      'css',
      `:root {
  /* TODO: colour, spacing and font tokens */
}

body {
  background: #ffffff;
  color: #1a1a1a;
  font-family: Inter, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.panel {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  padding: 16px;
}

/* TODO: [data-theme="dark"] overriding tokens only */`,
    ),
    write(
      'Lay out the page chrome with the position property. The header sticks to the top while the page scrolls, the "New" badge sits on the top-right corner of its card, and the cookie bar is pinned to the bottom of the viewport. Each one needs a different position value — say which and why in a comment.',
      'css',
      `.site-header {
  height: 56px;
  background: #111;
  /* TODO: sticky to the top, and above the content */
}

.card {
  /* TODO: what does the badge need from its parent? */
  padding: 16px;
}

.card .badge {
  /* TODO: pin to the card's top-right corner */
}

.cookie-bar {
  /* TODO: pinned to the bottom of the viewport, full width */
}`,
    ),
  ],

  // ── Module 4: Flexbox & Grid ───────────────────────────────────────────────
  m4: [
    write(
      'Build the navbar with Flexbox: logo hard left, links centred in the remaining space, call-to-action button hard right. Do not use margin: auto on more than one element and do not use position. State in a comment which axis justify-content works on here.',
      'css',
      `.navbar {
  /* TODO */
}

.navbar .logo {
  /* TODO */
}

.navbar .links {
  /* TODO: the links sit together, centred */
}

.navbar .cta {
  /* TODO */
}`,
    ),
    write(
      'Make the card row responsive with Flexbox alone — no media queries. Cards are at least 300px wide, grow to share leftover space, and wrap onto a new line when they no longer fit. Then explain each of the three values in `flex: 1 1 300px` in a comment.',
      'css',
      `.card-row {
  display: flex;
  /* TODO: allow wrapping, add a gap */
}

.card-row .card {
  /* TODO: flex shorthand */
}

/*
  flex: 1 1 300px
    1     -> ?
    1     -> ?
    300px -> ?
*/`,
    ),
    write(
      'Build the dashboard with named grid areas: a full-width header, a sidebar down the left, a main region, an aside, and a full-width footer — three columns and two content rows. The layout must be readable from grid-template-areas alone.',
      'css',
      `.dashboard {
  display: grid;
  /* TODO: three columns, the middle one taking the slack */
  /* TODO: rows */
  /* TODO: grid-template-areas — draw the layout */
  gap: 16px;
  min-height: 100vh;
}

.dashboard > .header { /* TODO */ }
.dashboard > .sidebar { /* TODO */ }
.dashboard > .main { /* TODO */ }
.dashboard > .aside { /* TODO */ }
.dashboard > .footer { /* TODO */ }`,
    ),
    write(
      'Centre the modal in the middle of the viewport three different ways: once with Flexbox, once with Grid, and once with position plus transform. Keep all three, with two commented out, and add a comment saying which you would reach for first and why.',
      'css',
      `.overlay {
  min-height: 100vh;
}

/* 1. Flexbox */
.overlay {
  /* TODO */
}

/* 2. Grid — two declarations is enough */
/*
.overlay {
  TODO
}
*/

/* 3. position + transform */
/*
.modal {
  TODO
}
*/`,
    ),
    write(
      'Build a gallery that fits as many columns as the container allows, each between 240px and 1fr, with no media queries. Then make the first item span two columns and two rows. Explain in a comment what auto-fit does that auto-fill does not.',
      'css',
      `.gallery {
  display: grid;
  /* TODO: repeat() with auto-fit and minmax() */
  gap: 12px;
}

.gallery > :first-child {
  /* TODO: span two columns and two rows */
}

/* auto-fit vs auto-fill: */`,
    ),
  ],

  // ── Module 5: Responsive Web Design ────────────────────────────────────────
  m5: [
    write(
      'Rewrite this desktop-first stylesheet as mobile-first. The base rules must describe the phone layout, and the breakpoints must use min-width and add to the layout rather than undo it. Keep the same three visual results at 375px, 800px and 1200px.',
      'css',
      `/* Desktop-first — rewrite all of this. */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  padding: 48px;
}

@media (max-width: 1023px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}

@media (max-width: 767px) {
  .layout {
    padding: 12px;
  }
}

/* TODO: mobile-first version below */`,
    ),
    write(
      'Write a media query that targets tablets only — 768px up to and including 1023px, with nothing leaking into phone or desktop. Then add the two neighbouring breakpoints so the three ranges tile exactly, with no gaps and no overlap. Comment why 1023.98px shows up in some codebases.',
      'css',
      `/* Phones: base styles, no query */
.grid {
  grid-template-columns: 1fr;
}

/* TODO: tablet only — 768px to 1023px */

/* TODO: desktop — 1024px and up */`,
    ),
    write(
      'Make the type scale with the viewport without a single media query. Use clamp() for the h1, the body copy and the section padding, and add a comment on each explaining what the minimum, preferred and maximum values are doing.',
      'css',
      `h1 {
  font-size: 32px; /* TODO: clamp() */
}

body {
  font-size: 16px; /* TODO: clamp() */
  line-height: 1.6;
}

.section {
  padding: 24px; /* TODO: clamp() */
}`,
    ),
    write(
      'Serve the right image to the right screen. Give the hero a <picture> that uses a portrait crop below 600px and a landscape crop above it, and give the thumbnail a srcset with 1x/2x densities and a sizes attribute. Add the viewport meta the whole thing depends on, and say in a comment what breaks without it.',
      'html',
      `<head>
  <meta charset="UTF-8" />
  <!-- TODO: viewport meta, plus a comment on what breaks without it -->
</head>

<body>
  <!-- TODO: picture with a source for min-width 600px and a fallback img -->

  <img
    src="/thumb-400.jpg"
    alt="Course thumbnail"
    <!-- TODO: srcset with widths, and a sizes attribute -->
  />
</body>`,
    ),
    write(
      'Build the hamburger breakpoint. Below 768px the links are hidden and the toggle button shows; from 768px up the links lay out in a row and the button is hidden. The button must be hidden from assistive tech too when it is not in use — display:none, not just opacity.',
      'css',
      `.nav-links {
  /* TODO: hidden on phones */
}

.nav-toggle {
  /* TODO: visible on phones */
}

/* TODO: from 768px up — links in a row, toggle gone */`,
    ),
  ],

  // ── Module 6: JavaScript Fundamentals ──────────────────────────────────────
  m6: [
    run(
      'Print the type of each of the five values, one per line, using typeof. Four of the answers are what you would guess; one is a famous JavaScript bug that has been kept for backwards compatibility. Add a comment naming that one and what the answer arguably should have been.',
      `const courseName = 'Frontend Development Mastery';
const moduleCount = 17;
const isEnrolled = true;
const mentor = null;
let progress;

// TODO: print typeof for each of the five, one per line, in the order above.
console.log(typeof courseName);`,
      [{
        input: 'None',
        output: 'string\nnumber\nboolean\nobject\nundefined',
        explanation: 'typeof null is "object" — the historical bug. An unassigned let is "undefined".',
      }],
    ),
    run(
      'Classify every score into a grade band and print "<score> -> <grade>" on its own line. The bands are 90+ A, 80-89 B, 70-79 C, 60-69 D, below 60 F. Use else-if so a score is only tested until it matches — not five separate ifs.',
      `const scores = [95, 83, 71, 64, 42];

function gradeFor(score) {
  // TODO: return 'A', 'B', 'C', 'D' or 'F'
}

for (const score of scores) {
  console.log(score + ' -> ' + gradeFor(score));
}`,
      [{
        input: 'None',
        output: '95 -> A\n83 -> B\n71 -> C\n64 -> D\n42 -> F',
      }],
    ),
    run(
      'Print the 7 times table from 1 to 10, one line per row, formatted exactly as "7 x 1 = 7". Use a single for loop — no ten console.log calls.',
      `const table = 7;

// TODO: loop from 1 to 10 and print "7 x 1 = 7" style lines
`,
      [{
        input: 'None',
        output: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70',
      }],
    ),
    run(
      'Write the two conversion functions and print the three lines shown. Round every result to one decimal place with toFixed(1). Give one function a default parameter so calling it with no argument converts 0.',
      `function toFahrenheit(celsius = 0) {
  // TODO: F = C * 9 / 5 + 32, rounded to one decimal
}

function toCelsius(fahrenheit) {
  // TODO: C = (F - 32) * 5 / 9, rounded to one decimal
}

console.log('0C = ' + toFahrenheit(0) + 'F');
console.log('100C = ' + toFahrenheit(100) + 'F');
console.log('98.6F = ' + toCelsius(98.6) + 'C');`,
      [{
        input: 'None',
        output: '0C = 32.0F\n100C = 212.0F\n98.6F = 37.0C',
        explanation: 'toFixed returns a string, so 32 prints as "32.0".',
      }],
    ),
    run(
      'Keep only the published courses, print one line each as "<title> (<modules> modules)", then print the total number of modules across those published courses. Use filter, map and reduce — no manual counter variable.',
      `const courses = [
  { title: 'Frontend Development Mastery', modules: 17, published: true },
  { title: 'Go for Backend Engineers', modules: 12, published: false },
  { title: 'Modern JavaScript', modules: 9, published: true },
  { title: 'SQL from Scratch', modules: 8, published: true },
];

// TODO: filter -> map -> print each line
// TODO: reduce to the total, then print "Total published modules: <n>"
`,
      [{
        input: 'None',
        output: 'Frontend Development Mastery (17 modules)\nModern JavaScript (9 modules)\nSQL from Scratch (8 modules)\nTotal published modules: 34',
      }],
    ),
  ],

  // ── Module 7: DOM Manipulation & Events ────────────────────────────────────
  m7: [
    write(
      'Build the todo list in the DOM. Read the input, create a new <li> for each item, and append it to the list — using createElement and textContent, never innerHTML with user input. Add a comment saying what innerHTML would expose you to here.',
      'javascript',
      `const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

function addTodo(text) {
  // TODO: create an li, set its text, append it to the list
}

// TODO: wire the form up so submitting adds the todo and clears the input.
// Remember what a form does by default when you submit it.
`,
    ),
    write(
      'Stop this form from reloading the page, validate the email in the handler, and show the message in the status element instead of an alert. Explain in a comment exactly which default behaviour preventDefault is cancelling.',
      'javascript',
      `const form = document.querySelector('#signup');
const status = document.querySelector('#status');

form.addEventListener('submit', function (event) {
  // TODO: cancel the default submit

  const email = form.elements.email.value.trim();

  // TODO: if the email is empty or has no "@", show an error in #status and stop
  // TODO: otherwise show a success message
});`,
    ),
    write(
      'The list has 500 rows and each one currently gets its own click listener. Rewrite it with a single listener on the container, using event.target and closest() to find which row was clicked. Add a comment on why 500 listeners is the thing worth avoiding.',
      'javascript',
      `const list = document.querySelector('#results');

// Before — one listener per row:
// list.querySelectorAll('.row').forEach((row) => {
//   row.addEventListener('click', () => console.log(row.dataset.id));
// });

// TODO: one listener on #results that still reports the clicked row's data-id,
// and does nothing when the click lands on the container's own padding.
`,
    ),
    run(
      'localStorage and sessionStorage share the same API, so you can model it. Implement MemoryStorage with setItem, getItem, removeItem and clear, matching the real API exactly on the two details people get wrong: values are stored as strings, and getItem returns null (not undefined) for a missing key.',
      `class MemoryStorage {
  constructor() {
    this.store = {};
  }
  setItem(key, value) {
    // TODO: keys and values are always strings
  }
  getItem(key) {
    // TODO: null when absent
  }
  removeItem(key) {
    // TODO
  }
  clear() {
    // TODO
  }
}

const s = new MemoryStorage();
s.setItem('theme', 'dark');
s.setItem('count', 3);
console.log(s.getItem('theme'));
console.log(s.getItem('count'), typeof s.getItem('count'));
console.log(s.getItem('missing'));
s.removeItem('theme');
console.log(s.getItem('theme'));
s.clear();
console.log(s.getItem('count'));`,
      [{
        input: 'None',
        output: 'dark\n3 string\nnull\nnull\nnull',
        explanation: 'setItem(\'count\', 3) stores the string "3" — storage never keeps numbers.',
      }],
    ),
    run(
      'Rendering is just string building before it is DOM work. Write renderTodos so it returns the markup for the list, and escape the text so a todo containing a tag cannot inject an element. Print the result.',
      `const todos = [
  { id: 1, text: 'Finish module 7', done: true },
  { id: 2, text: 'Read about <script> tags', done: false },
];

function escapeHtml(text) {
  // TODO: replace & < > with their entities, in that order. Why & first?
}

function renderTodos(items) {
  // TODO: return '<ul>' + one <li data-id="..." class="done|"> per item + '</ul>'
  // A done item gets class="done"; an open one gets no class attribute.
}

console.log(renderTodos(todos));`,
      [{
        input: 'None',
        output: '<ul><li data-id="1" class="done">Finish module 7</li><li data-id="2">Read about &lt;script&gt; tags</li></ul>',
        explanation: 'Escape & before < and >, or you double-escape the entities you just wrote.',
      }],
    ),
  ],

  // ── Module 8: Modern JavaScript (ES6+) ─────────────────────────────────────
  m8: [
    run(
      'const does not mean the value is frozen — it means the binding cannot be reassigned. Mutate both the array and the object in place and print them, then leave a commented-out reassignment with the exact error name it would throw.',
      `const tools = ['VS Code', 'Chrome'];
const config = { theme: 'dark' };

// TODO: add 'Git' to tools, and fontSize: 14 to config — without reassigning either

console.log(tools.join(', '));
console.log(JSON.stringify(config));

// TODO: uncomment to see it fail, then comment it back with the error name:
// tools = [];`,
      [{
        input: 'None',
        output: 'VS Code, Chrome, Git\n{"theme":"dark","fontSize":14}',
        explanation: 'Reassigning throws a TypeError: Assignment to constant variable.',
      }],
    ),
    run(
      'Rewrite all three functions as arrow functions. Use an implicit return where the body is a single expression, and drop the parentheses only where there is exactly one parameter. Keep the printed output identical.',
      `function double(n) {
  return n * 2;
}

function greet(name) {
  return 'Hello, ' + name + '!';
}

function sum(numbers) {
  return numbers.reduce(function (total, n) {
    return total + n;
  }, 0);
}

// TODO: replace the three above with const arrow functions

console.log(double(21));
console.log(greet('Ana'));
console.log(sum([1, 2, 3, 4]));`,
      [{ input: 'None', output: '42\nHello, Ana!\n10' }],
    ),
    run(
      'Destructure the argument in the function signature, with defaults that survive a missing nested object. describe() must not throw when prefs is absent entirely.',
      `const riya = { name: 'Riya', prefs: { theme: 'dark' } };
const ved = { name: 'Ved', role: 'mentor', prefs: {} };
const nia = { name: 'Nia' };

// TODO: destructure name, role (default 'student') and the nested theme
// (default 'light') and fontSize (default 16) — in the parameter list itself.
function describe(user) {
  return '';
}

console.log(describe(riya));
console.log(describe(ved));
console.log(describe(nia));`,
      [{
        input: 'None',
        output: 'Riya (student) theme=dark size=16\nVed (mentor) theme=light size=16\nNia (student) theme=light size=16',
        explanation: 'The nested pattern needs its own = {} default, or Nia throws.',
      }],
    ),
    run(
      'Same three dots, two opposite jobs. Use rest to collect the amounts into an array, and spread to merge objects and to flatten arrays. Print the three results.',
      `// TODO: rest — collect every amount after the label
function total(label, amounts) {
  return label + ': ' + 0;
}

const base = { plan: 'free', seats: 1 };
// TODO: spread — copy base but override plan with 'pro', without mutating base
const upgraded = {};

const core = [1, 2, 3];
const extra = [4, 5];
// TODO: spread — one flat array
const all = [];

console.log(total('Order', 100, 150, 200));
console.log(JSON.stringify(upgraded));
console.log(JSON.stringify(base));
console.log(JSON.stringify(all));`,
      [{
        input: 'None',
        output: 'Order: 450\n{"plan":"pro","seats":1}\n{"plan":"free","seats":1}\n[1,2,3,4,5]',
        explanation: 'base must still print as free — spread copies, it does not mutate.',
      }],
    ),
    run(
      'Extend the base class. LiveCourse must call super() before touching this, and its describe() must reuse the parent implementation via super.describe() rather than repeating the string.',
      `class Course {
  constructor(title, modules) {
    this.title = title;
    this.modules = modules;
  }
  describe() {
    return this.title + ' (' + this.modules + ' modules)';
  }
}

class LiveCourse extends Course {
  // TODO: constructor(title, modules, mentor) — call super first
  // TODO: describe() — reuse super.describe() and append ' with mentor <name>'
}

console.log(new Course('Modern JavaScript', 9).describe());
console.log(new LiveCourse('Frontend Mastery', 17, 'Kavya').describe());`,
      [{
        input: 'None',
        output: 'Modern JavaScript (9 modules)\nFrontend Mastery (17 modules) with mentor Kavya',
        explanation: 'Using this before super() throws a ReferenceError.',
      }],
    ),
  ],

  // ── Module 9: Asynchronous JavaScript ──────────────────────────────────────
  m9: [
    run(
      'Write the promise so it resolves when stock is available and rejects with an Error when it is not. Handle both cases with then/catch/finally — the chain below already sequences the two calls so the output order is fixed.',
      `function checkStock(qty) {
  return new Promise((resolve, reject) => {
    // TODO: resolve with '<qty> in stock' when qty > 0
    // TODO: otherwise reject with new Error('Out of stock')
  });
}

checkStock(3)
  .then((msg) => console.log(msg))
  .catch((err) => console.log('Error: ' + err.message))
  .finally(() => console.log('checked 3'))
  .then(() =>
    checkStock(0)
      .then((msg) => console.log(msg))
      .catch((err) => console.log('Error: ' + err.message))
      .finally(() => console.log('checked 0'))
  );`,
      [{
        input: 'None',
        output: '3 in stock\nchecked 3\nError: Out of stock\nchecked 0',
        explanation: 'finally runs on both paths and passes the result straight through.',
      }],
    ),
    run(
      'This is callback hell — three levels deep, with error handling repeated at every level. Promisify the three functions and rewrite it as a flat chain with a single .catch at the end.',
      `function getUser(id, cb) {
  setTimeout(() => cb(null, { id, name: 'Ana' }), 10);
}
function getOrders(userId, cb) {
  setTimeout(() => cb(null, [{ id: 'A-1' }, { id: 'A-2' }]), 10);
}
function getInvoice(orderId, cb) {
  setTimeout(() => cb(null, { orderId, total: 1250 }), 10);
}

// The pyramid to replace:
// getUser(7, (err, user) => {
//   if (err) return console.log(err);
//   getOrders(user.id, (err, orders) => {
//     if (err) return console.log(err);
//     getInvoice(orders[0].id, (err, invoice) => {
//       if (err) return console.log(err);
//       ...
//     });
//   });
// });

// TODO: wrap each in a function returning a Promise, then chain them so the
// output below is printed in order, with one .catch for the whole chain.
`,
      [{
        input: 'None',
        output: 'user: Ana\norders: 2\ninvoice A-1 total 1250',
      }],
    ),
    run(
      'Convert the chain to async/await. Errors that a .catch used to absorb now need a try/catch, and the cleanup line has to run whichever way it goes.',
      `function loadProfile(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 1) reject(new Error('id must be positive'));
      else resolve({ id, name: 'Profile ' + id });
    }, 10);
  });
}

// TODO: async function show(id) — await loadProfile, print 'Loaded Profile <id>'
// on success and 'Failed: <message>' on failure, and print 'done' either way.
async function show(id) {}

async function main() {
  await show(7);
  await show(0);
}

main();`,
      [{
        input: 'None',
        output: 'Loaded Profile 7\ndone\nFailed: id must be positive\ndone',
      }],
    ),
    run(
      'Three requests that do not depend on each other should not be awaited one after another. Fire them together with Promise.all, then use Promise.allSettled to report on a batch where one fails — allSettled never rejects, which is the whole point.',
      `const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const failAfter = (ms, message) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

async function main() {
  // TODO: run all three together and print 'all: courses,mentors,progress'
  // Note the order of the results vs the order they finish in.
  const results = [];
  console.log('all: ' + results.join(','));

  // TODO: allSettled over [delay(10,'a'), failAfter(5,'nope'), delay(1,'c')]
  // then print 'settled: <n> fulfilled, <n> rejected'
}

main();`,
      [{
        input: 'None',
        output: 'all: courses,mentors,progress\nsettled: 2 fulfilled, 1 rejected',
        explanation: 'Promise.all keeps input order even though progress resolves first.',
      }],
    ),
    run(
      'fetch only rejects when the network itself fails — a 404 is a perfectly successful request that returned an error page. Check response.ok and throw yourself, otherwise you will happily parse an error body as if it were data.',
      `function fakeFetch(url) {
  const routes = {
    '/api/courses/1': { ok: true, status: 200, body: { title: 'Frontend Development Mastery' } },
    '/api/courses/99': { ok: false, status: 404, body: { error: 'Not found' } },
  };
  const r = routes[url];
  return Promise.resolve({
    ok: r.ok,
    status: r.status,
    json: () => Promise.resolve(r.body),
  });
}

async function loadCourse(url) {
  const response = await fakeFetch(url);
  // TODO: if the response is not ok, throw an Error reading
  // 'Request failed with status <status>'
  const data = await response.json();
  return data.title;
}

async function main() {
  try {
    console.log(await loadCourse('/api/courses/1'));
  } catch (err) {
    console.log(err.message);
  }
  try {
    console.log(await loadCourse('/api/courses/99'));
  } catch (err) {
    console.log(err.message);
  }
}

main();`,
      [{
        input: 'None',
        output: 'Frontend Development Mastery\nRequest failed with status 404',
        explanation: 'Without the ok check the 404 branch prints undefined instead of failing.',
      }],
    ),
  ],

  // ── Module 10: Git & GitHub ────────────────────────────────────────────────
  m10: [
    write(
      'Write the exact commands to take an untracked folder to a first commit on main, in order. Configure your identity first, stage selectively rather than with `git add .`, and end with the log line that proves the commit landed. Add a # comment above each command saying what it changes — working tree, index or history.',
      'shell',
      `# You are inside ~/projects/portfolio, which has index.html, style.css and notes.txt

# TODO: set your name and email for this repository

# TODO: initialise the repository

# TODO: stage index.html and style.css only — notes.txt should stay untracked

# TODO: commit with a message that says what changed and why

# TODO: show the history as one line per commit
`,
    ),
    write(
      'Do a feature branch properly. Branch off main, commit twice, bring main up to date, then merge — and finish with the branch deleted. Include the command that shows what you are about to merge before you merge it.',
      'shell',
      `# TODO: create and switch to a branch named feature/contact-form in one command

# TODO: (pretend you edited files) stage and commit twice

# TODO: switch back to main and pull the latest

# TODO: preview what the merge would bring in

# TODO: merge the feature branch

# TODO: delete the branch locally and on the remote
`,
    ),
    write(
      'You have a merge conflict in index.html. Write the sequence to resolve it — and add a comment explaining what the <<<<<<<, ======= and >>>>>>> markers separate, and why `git add` is what marks a conflict resolved.',
      'shell',
      `# git merge feature/nav
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html

# TODO: list the files that are conflicted

# TODO: (you edit index.html and remove the markers)
#   <<<<<<< HEAD          -> ?
#   =======               -> ?
#   >>>>>>> feature/nav   -> ?

# TODO: mark it resolved and complete the merge

# TODO: the command that aborts instead, if you decide to back out
`,
    ),
    write(
      'Four different "undo" situations, four different commands. Write the right one for each, and add a comment on which of them rewrite history — those are the ones that are unsafe on a shared branch.',
      'shell',
      `# 1. You edited a file and want the last committed version back (not staged yet)

# 2. You ran git add on a file by mistake — unstage it, keep the edit

# 3. The last commit is wrong but the work is fine — redo it with a new message

# 4. A commit that is already pushed is bad — undo it without rewriting history

# TODO: which of the above are safe on a branch someone else has pulled?
`,
    ),
    write(
      'Write the README a stranger could actually run the project from. It needs a one-line description, prerequisites with versions, install and run commands in fenced code blocks, an environment variable table, and a link. Do not describe the project as "a project".',
      'markdown',
      `# Portfolio

TODO: one sentence saying what this is and who it is for.

## Prerequisites

TODO: list with versions.

## Getting started

TODO: fenced bash block — clone, install, run.

## Environment variables

TODO: a table with Variable / Required / Description.

## Deploy

TODO: how it is deployed, with a link.
`,
    ),
  ],

  // ── Module 11: Introduction to React ───────────────────────────────────────
  m11: [
    write(
      'Write the CourseCard component. It takes a title, a mentor and a moduleCount as props, destructured in the signature, and renders them inside an <article> with the title in an <h2>. Give mentor a sensible default for when it is not passed.',
      'jsx',
      `// TODO: function CourseCard({ ... }) — destructure the props in the parameter list

export default function App() {
  return (
    <div>
      <CourseCard title="Frontend Development Mastery" mentor="Kavya" moduleCount={17} />
      <CourseCard title="Modern JavaScript" moduleCount={9} />
    </div>
  );
}`,
    ),
    write(
      'This component has six JSX mistakes that HTML would have tolerated. Find and fix all of them, and add a comment on each line saying what the rule is. Do not restructure the markup — only fix what is invalid.',
      'jsx',
      `function ProfileForm() {
  const user = { name: 'Ana', unread: 3 };

  return (
    <div class="profile">
      <label for="name">Name</label>
      <input type="text" id="name" value={user.name}>

      <p>You have user.unread new messages</p>

      <img src="/avatar.png">

      <!-- a comment about the button -->
      <button onclick={save}>Save</button>
    </div>
  );
}`,
    ),
    write(
      'Break this one component into three that compose: a CourseList that maps the data, a CourseCard for a single course, and a Badge used inside the card. Pass data down as props only — no component may reach into the module-level array itself.',
      'jsx',
      `const courses = [
  { id: 'fe', title: 'Frontend Development Mastery', modules: 17, level: 'Beginner' },
  { id: 'js', title: 'Modern JavaScript', modules: 9, level: 'Intermediate' },
];

function Everything() {
  return (
    <section>
      <h1>Courses</h1>
      {courses.map((c) => (
        <article key={c.id}>
          <h2>{c.title}</h2>
          <span className="badge">{c.level}</span>
          <p>{c.modules} modules</p>
        </article>
      ))}
    </section>
  );
}

// TODO: Badge, CourseCard, CourseList — and App rendering <CourseList courses={courses} />`,
    ),
    write(
      'Render the list with the right keys. The index is being used as the key and the list is sortable, which is exactly when that breaks. Switch to a stable key and write a comment describing the bug the index causes when a row is deleted from the middle.',
      'jsx',
      `function LessonList({ lessons }) {
  return (
    <ol>
      {lessons.map((lesson, index) => (
        <li key={index}>
          <input type="checkbox" defaultChecked={lesson.done} />
          {lesson.title}
        </li>
      ))}
    </ol>
  );
}

// lessons: [{ id: 'm1-l1', title: 'Welcome', done: true }, ...]
// TODO: fix the key, and explain what happens to the checkboxes without it.`,
    ),
    write(
      'A component name must start with a capital letter — otherwise JSX compiles it to a string tag and React silently renders nothing useful. Rename what needs renaming, then write, as a comment, the two lines of compiled output that show the difference.',
      'jsx',
      `function courseHeader({ title }) {
  return <h1>{title}</h1>;
}

export default function App() {
  return (
    <div>
      <courseHeader title="Frontend Development Mastery" />
    </div>
  );
}

// TODO: fix it, then show both compiled forms:
//   <courseHeader />  ->  React.createElement( ... )
//   <CourseHeader />  ->  React.createElement( ... )`,
    ),
  ],

  // ── Module 12: React State Management ──────────────────────────────────────
  m12: [
    write(
      'Wire up the counter with useState. The step buttons must not stack incorrectly when clicked quickly — use the updater form of the setter, and add a comment saying what goes wrong with the plain form when two updates are batched.',
      'jsx',
      `import { useState } from 'react';

export default function Counter() {
  // TODO: count state, starting at 0

  function incrementTwice() {
    // TODO: increase by 1 twice, so this ends up +2 — not +1
  }

  return (
    <div>
      <p>Count: {/* TODO */}</p>
      <button onClick={/* TODO: +1 */}>+1</button>
      <button onClick={incrementTwice}>+2</button>
      <button onClick={/* TODO: back to 0 */}>Reset</button>
    </div>
  );
}`,
    ),
    write(
      'Turn this uncontrolled textarea into a controlled one, with a live character count and a submit button that is disabled until at least 20 characters are typed. The component must be the single source of truth for the value.',
      'jsx',
      `import { useState } from 'react';

export default function AnswerBox() {
  return (
    <form>
      <textarea placeholder="Type your answer here..." />
      {/* TODO: "<n>/500 characters" */}
      <button type="submit">Submit</button>
    </form>
  );
}`,
    ),
    write(
      'Render the three states of this panel with the right conditional for each: && for the optional banner, a ternary for the two-way loading/loaded swap, and an early return for the error. Explain in a comment why `{count && <p>…</p>}` renders a stray 0 when count is 0.',
      'jsx',
      `export default function Inbox({ loading, error, messages, unread }) {
  // TODO: early return for error

  return (
    <section>
      {/* TODO: && — show the unread banner only when there is at least one */}

      {/* TODO: ternary — spinner while loading, the list once loaded */}
    </section>
  );
}`,
    ),
    run(
      'State updates must not mutate. Write toggleTodo so it returns a new state object with only the matching todo replaced — every other todo must be the same object it was, so React can skip re-rendering those rows.',
      `const state = {
  filter: 'all',
  todos: [
    { id: 1, text: 'Finish module 12', done: false },
    { id: 2, text: 'Push to GitHub', done: true },
  ],
};

function toggleTodo(state, id) {
  // TODO: return a new state; do not touch the original
}

const next = toggleTodo(state, 1);

console.log('toggled:', next.todos[0].done);
console.log('original untouched:', state.todos[0].done);
console.log('new state object:', next !== state);
console.log('untouched todo reused:', next.todos[1] === state.todos[1]);`,
      [{
        input: 'None',
        output: 'toggled: true\noriginal untouched: false\nnew state object: true\nuntouched todo reused: true',
        explanation: 'The last line is the point — map must return the same reference for rows that did not change.',
      }],
    ),
    write(
      'Two sibling components need the same selected lesson. Lift the state to their closest common parent and pass the value down and the setter up. Add a comment marking which component now owns the state and which are now controlled.',
      'jsx',
      `import { useState } from 'react';

function LessonSidebar({ lessons }) {
  const [selected, setSelected] = useState(null); // in the wrong place
  return (
    <ul>
      {lessons.map((l) => (
        <li key={l.id} onClick={() => setSelected(l.id)}>{l.title}</li>
      ))}
    </ul>
  );
}

function LessonContent() {
  return <article>{/* needs to know the selected lesson */}</article>;
}

export default function CoursePage({ lessons }) {
  // TODO: lift it here
  return (
    <div>
      <LessonSidebar lessons={lessons} />
      <LessonContent />
    </div>
  );
}`,
    ),
  ],

  // ── Module 13: React Hooks ─────────────────────────────────────────────────
  m13: [
    write(
      'Three useEffect calls, three different dependency arrays — no array, an empty array, and [query]. Write each one so it fires when the comment says it should, and give the subscription effect a cleanup that actually unsubscribes.',
      'jsx',
      `import { useEffect, useState } from 'react';

export default function SearchPanel({ query }) {
  const [results, setResults] = useState([]);

  // TODO: runs after every single render — and log why you would rarely want this

  // TODO: runs once on mount — open a subscription, and return the cleanup
  //       that closes it. What breaks in Strict Mode without the cleanup?

  // TODO: runs on mount and whenever query changes — fetch the results

  return <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;
}`,
    ),
    write(
      'Both of these need to survive re-renders, but only one should cause one. Use useState for the value the user sees and useRef for the render counter and the input node, then write a comment stating the rule you just applied.',
      'jsx',
      `import { useRef, useState } from 'react';

export default function Feedback() {
  // TODO: the text the user types — shown on screen
  // TODO: how many times this component has rendered — must NOT trigger a render
  // TODO: a handle on the input so a button can focus it

  return (
    <div>
      <input />
      <button>Focus the input</button>
      <p>Renders so far: {/* TODO */}</p>
    </div>
  );
}`,
    ),
    write(
      'Extract the duplicated open/close logic into a custom hook called useToggle that returns the value and a toggle function. Rules of hooks apply: the name has to start with "use", and it can only be called at the top level.',
      'jsx',
      `import { useState } from 'react';

function Modal() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return <div>{open ? 'open' : 'closed'}<button onClick={toggle}>Toggle</button></div>;
}

function Sidebar() {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen((o) => !o);
  return <div>{open ? 'open' : 'closed'}<button onClick={toggle}>Toggle</button></div>;
}

// TODO: useToggle(initial = false) -> [value, toggle], then rewrite both above.`,
    ),
    run(
      'useMemo is a cache keyed on the dependencies. Build that cache yourself: memoize wraps a function so a repeated argument is served from the cache instead of recomputing. The call counter proves it worked.',
      `let calls = 0;

function slowSquare(n) {
  calls += 1;
  return n * n;
}

function memoize(fn) {
  // TODO: keep a cache keyed on the argument
}

const fast = memoize(slowSquare);

console.log(fast(4), fast(4), fast(5), fast(4));
console.log('underlying calls: ' + calls);`,
      [{
        input: 'None',
        output: '16 16 25 16\nunderlying calls: 2',
        explanation: 'Four calls, two distinct arguments — so slowSquare runs twice.',
      }],
    ),
    run(
      'A reducer is a pure function of (state, action). Write counterReducer so it handles the three actions and — this is the part people miss — returns the state object unchanged when the action is unknown.',
      `const initialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  // TODO: 'increment' adds step; 'setStep' sets step from action.step;
  //       'reset' returns to the initial state; anything else changes nothing.
}

let state = initialState;
for (const action of [
  { type: 'increment' },
  { type: 'increment' },
  { type: 'setStep', step: 5 },
  { type: 'increment' },
]) {
  state = counterReducer(state, action);
  console.log(JSON.stringify(state));
}

const same = counterReducer(state, { type: 'nonsense' });
console.log('unknown action returns the same object: ' + (same === state));
console.log(JSON.stringify(counterReducer(state, { type: 'reset' })));`,
      [{
        input: 'None',
        output: '{"count":1,"step":1}\n{"count":2,"step":1}\n{"count":2,"step":5}\n{"count":7,"step":5}\nunknown action returns the same object: true\n{"count":0,"step":1}',
      }],
    ),
  ],

  // ── Module 14: React Router ────────────────────────────────────────────────
  m14: [
    write(
      'Set up the router. Wrap the app once, declare the four routes, and add the catch-all that renders NotFound for anything unmatched. Add a comment on why the wrapper belongs above the routes rather than inside each one.',
      'jsx',
      `import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages: Home at /, Courses at /courses, CourseDetail at /courses/:courseId,
// Profile at /profile, NotFound for everything else.

export default function App() {
  return (
    // TODO
  );
}`,
    ),
    write(
      'Half of these navigations reload the whole app and throw away the router state. Replace the ones that should be client-side with <Link> or <NavLink>, and leave the ones that must stay a real anchor — then say in a comment which are which and why.',
      'jsx',
      `export default function Nav() {
  return (
    <nav>
      <a href="/courses">Courses</a>
      <a href="/profile">Profile</a>
      <a href="https://github.com/skillofied">GitHub</a>
      <a href="/brochure.pdf" download>Download brochure</a>
      <a href="/courses" className="active-when-current">Courses (highlight when active)</a>
    </nav>
  );
}`,
    ),
    write(
      'Read the dynamic segment and the query string. CourseDetail must pull :courseId out of the path and ?lesson= out of the search params — they come from two different hooks, and mixing them up is the usual bug. Handle the case where lesson is missing.',
      'jsx',
      `import { useParams, useSearchParams } from 'react-router-dom';

// Route: <Route path="/courses/:courseId" element={<CourseDetail />} />
// URL:   /courses/frontend?lesson=m1-assignment

export default function CourseDetail() {
  // TODO: courseId from the path
  // TODO: lesson from the query string, defaulting to the first lesson
  // TODO: a setter that updates ?lesson= without a full navigation

  return <h1>{/* TODO */}</h1>;
}`,
    ),
    write(
      'Nest the course routes so the shell — header, sidebar, progress bar — renders once and only the lesson pane swaps. Add the <Outlet /> where the child should appear, and give the parent an index route.',
      'jsx',
      `import { Routes, Route, Outlet } from 'react-router-dom';

function CourseLayout() {
  return (
    <div>
      <CourseHeader />
      <Sidebar />
      {/* TODO: where do the child routes render? */}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* TODO: /courses/:courseId wrapping an index route (Overview),
          "lessons/:lessonId" (Lesson) and "quiz" (Quiz) */}
    </Routes>
  );
}`,
    ),
    run(
      'A router is, at heart, pattern matching. Write matchRoute so it returns the extracted params for a matching path, an empty object for a static match, and null when the pattern does not fit — including when the segment counts differ.',
      `function matchRoute(pattern, path) {
  // TODO: split both on '/', compare segment by segment.
  // A segment starting with ':' captures; anything else must match exactly.
}

console.log(JSON.stringify(matchRoute('/courses/:courseId/lessons/:lessonId', '/courses/frontend/lessons/m1')));
console.log(JSON.stringify(matchRoute('/about', '/about')));
console.log(JSON.stringify(matchRoute('/courses/:courseId', '/courses')));
console.log(JSON.stringify(matchRoute('/courses/:courseId', '/lessons/frontend')));`,
      [{
        input: 'None',
        output: '{"courseId":"frontend","lessonId":"m1"}\n{}\nnull\nnull',
        explanation: 'A static match returns {} — which is truthy, unlike null. That distinction is the whole API.',
      }],
    ),
  ],

  // ── Module 15: React API Integration ───────────────────────────────────────
  m15: [
    write(
      'Fetch on mount and render all three states — loading, error and loaded — with none of them able to overlap. Reset the error before a retry, and make sure the loading flag is cleared on the failure path too.',
      'jsx',
      `import { useEffect, useState } from 'react';

export default function CourseList() {
  // TODO: courses, loading, error

  useEffect(() => {
    // TODO: fetch('/api/courses'), check response.ok, set state
    // TODO: finally — clear loading whichever way it went
  }, []);

  // TODO: render the spinner, the error with a Retry button, or the list
  return null;
}`,
    ),
    write(
      'Write the authenticated delete. It needs the method, the Authorization header in the exact scheme the API expects, and the optimistic update rolled back if the request fails. Add a comment on why the token does not belong in the URL.',
      'jsx',
      `async function deleteLesson(id, token, setLessons, previous) {
  // TODO: optimistically remove the lesson from state

  try {
    const response = await fetch('/api/lessons/' + id, {
      // TODO: method
      // TODO: headers — Authorization and Content-Type
    });
    // TODO: throw on !response.ok
  } catch (err) {
    // TODO: roll the optimistic update back and surface the error
  }
}`,
    ),
    run(
      'A flaky network deserves one retry, not a failed screen. Write fetchWithRetry so it retries a rejected call up to `attempts` times and rethrows the last error if it never succeeds.',
      `let calls = 0;
const flaky = () => {
  calls += 1;
  return calls < 3 ? Promise.reject(new Error('network')) : Promise.resolve('ok');
};
const alwaysFails = () => Promise.reject(new Error('network'));

async function fetchWithRetry(fn, attempts) {
  // TODO: try fn(); on failure try again until attempts is exhausted,
  // then rethrow the last error.
}

async function main() {
  console.log(await fetchWithRetry(flaky, 5), 'after ' + calls + ' calls');
  try {
    await fetchWithRetry(alwaysFails, 2);
  } catch (err) {
    console.log('gave up: ' + err.message);
  }
}

main();`,
      [{
        input: 'None',
        output: 'ok after 3 calls\ngave up: network',
      }],
    ),
    run(
      'APIs rarely hand you the shape your component wants. Write toViewModel so the nested payload becomes a flat list your JSX can map over directly, dropping unpublished records and formatting the date as DD/MM/YYYY.',
      `const payload = {
  data: {
    items: [
      { id: '1', attributes: { title: 'Frontend Mastery', published_at: '2026-01-05', author: { full_name: 'Kavya Rao' }, state: 'published' } },
      { id: '2', attributes: { title: 'Draft course', published_at: null, author: { full_name: 'Ved S' }, state: 'draft' } },
      { id: '3', attributes: { title: 'Modern JavaScript', published_at: '2026-03-19', author: { full_name: 'Ana P' }, state: 'published' } },
    ],
  },
};

function toViewModel(payload) {
  // TODO: -> [{ id, title, author, date }] for published items only
}

console.log(JSON.stringify(toViewModel(payload), null, 0));`,
      [{
        input: 'None',
        output: '[{"id":"1","title":"Frontend Mastery","author":"Kavya Rao","date":"05/01/2026"},{"id":"3","title":"Modern JavaScript","author":"Ana P","date":"19/03/2026"}]',
      }],
    ),
    write(
      'This component sets state after it has unmounted, which React warns about and which leaks a request per navigation. Cancel the in-flight fetch in the effect cleanup with an AbortController, and swallow only the abort error — every other error still belongs on screen.',
      'jsx',
      `import { useEffect, useState } from 'react';

export default function Lesson({ lessonId }) {
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/lessons/' + lessonId)
      .then((r) => r.json())
      .then(setLesson)
      .catch(setError);
    // TODO: create the controller, pass its signal, and abort on cleanup.
    // TODO: an AbortError is expected — do not put it in the error state.
  }, [lessonId]);

  return null;
}`,
    ),
  ],

  // ── Module 16: Advanced React ──────────────────────────────────────────────
  m16: [
    write(
      'The theme is threaded through four components that do not use it. Replace the prop drilling with a context: create it, provide the value at the top, and consume it in the leaf only. Add a comment on why the provider value should be memoised.',
      'jsx',
      `// Before: theme passed App -> Layout -> Sidebar -> SettingsPanel -> ThemeToggle
function App() {
  const [theme, setTheme] = useState('dark');
  return <Layout theme={theme} setTheme={setTheme} />;
}
function Layout({ theme, setTheme }) { return <Sidebar theme={theme} setTheme={setTheme} />; }
function Sidebar({ theme, setTheme }) { return <SettingsPanel theme={theme} setTheme={setTheme} />; }
function SettingsPanel({ theme, setTheme }) { return <ThemeToggle theme={theme} setTheme={setTheme} />; }
function ThemeToggle({ theme, setTheme }) {
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme}</button>;
}

// TODO: ThemeContext + ThemeProvider + useTheme, and the four middle
// components back to taking no theme props at all.`,
    ),
    run(
      'Write the cart reducer. Adding an item that is already in the cart bumps its quantity instead of duplicating the row, removing takes it out entirely, and every action returns new objects — the previous state must stay exactly as it was.',
      `const empty = { items: [] };

function cartReducer(state, action) {
  // TODO: 'add' { id, title, price }, 'remove' { id }, 'setQty' { id, qty }.
  // Adding an existing id increments qty. setQty to 0 removes the row.
}

let state = empty;
const log = () => console.log(JSON.stringify(state.items));

state = cartReducer(state, { type: 'add', id: 'a', title: 'Course A', price: 100 });
log();
state = cartReducer(state, { type: 'add', id: 'b', title: 'Course B', price: 250 });
log();
state = cartReducer(state, { type: 'add', id: 'a', title: 'Course A', price: 100 });
log();
state = cartReducer(state, { type: 'setQty', id: 'b', qty: 0 });
log();
console.log('original empty untouched: ' + (empty.items.length === 0));`,
      [{
        input: 'None',
        output: '[{"id":"a","title":"Course A","price":100,"qty":1}]\n[{"id":"a","title":"Course A","price":100,"qty":1},{"id":"b","title":"Course B","price":250,"qty":1}]\n[{"id":"a","title":"Course A","price":100,"qty":2},{"id":"b","title":"Course B","price":250,"qty":1}]\n[{"id":"a","title":"Course A","price":100,"qty":2}]\noriginal empty untouched: true',
      }],
    ),
    run(
      'Selectors keep derived data out of state. Write the three of them over the same cart, then memoise selectTotal so re-reading an unchanged cart does not recompute — the counter is what proves it.',
      `let computations = 0;

const cart = {
  items: [
    { id: 'a', title: 'Course A', price: 100, qty: 2 },
    { id: 'b', title: 'Course B', price: 250, qty: 1 },
  ],
};

// TODO: selectItemCount(cart) -> total quantity across rows
// TODO: selectTitles(cart) -> array of titles
// TODO: selectTotal(cart) -> price * qty summed; increment \`computations\`
//       once per real computation, and skip it when called again with the
//       same cart object.

console.log(selectItemCount(cart));
console.log(selectTitles(cart).join(', '));
console.log(selectTotal(cart));
console.log(selectTotal(cart));
console.log('computations: ' + computations);`,
      [{
        input: 'None',
        output: '3\nCourse A, Course B\n450\n450\ncomputations: 1',
        explanation: 'Cache on the cart reference — that is exactly what reselect does.',
      }],
    ),
    run(
      'A global store is smaller than it looks. Build createStore with getState, setState and subscribe — where setState merges a partial update and notifies every subscriber, and subscribe returns its own unsubscribe function.',
      `function createStore(initialState) {
  // TODO: getState(), setState(partial), subscribe(listener) -> unsubscribe
}

const store = createStore({ user: null, theme: 'dark' });

const unsubscribe = store.subscribe((state) => console.log('A saw ' + JSON.stringify(state)));
store.subscribe((state) => console.log('B saw ' + JSON.stringify(state)));

store.setState({ user: 'kavya' });
unsubscribe();
store.setState({ theme: 'light' });

console.log('final: ' + JSON.stringify(store.getState()));`,
      [{
        input: 'None',
        output: 'A saw {"user":"kavya","theme":"dark"}\nB saw {"user":"kavya","theme":"dark"}\nB saw {"user":"kavya","theme":"light"}\nfinal: {"user":"kavya","theme":"light"}',
        explanation: 'setState merges — it does not replace — and A stops hearing after it unsubscribes.',
      }],
    ),
    write(
      'The whole dashboard ships in one bundle because every route is imported eagerly. Split the three heavy routes with React.lazy, wrap them in a single Suspense with a real fallback, and add an error boundary — a failed chunk load must not blank the page.',
      'jsx',
      `import { Routes, Route } from 'react-router-dom';
import Reports from './Reports';
import Analytics from './Analytics';
import VideoPlayer from './VideoPlayer';

export default function Dashboard() {
  return (
    <Routes>
      <Route path="reports" element={<Reports />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="watch/:id" element={<VideoPlayer />} />
    </Routes>
  );
}

// TODO: lazy() the three imports, add Suspense with a fallback, and wrap the
// lot in an error boundary. Comment on what the user sees on a slow 3G first load.`,
    ),
  ],

  // ── Module 17: Deployment & Optimization ───────────────────────────────────
  m17: [
    write(
      'Write the deploy runbook as commands. Build for production, preview that build locally rather than trusting the dev server, and set the environment variable both locally and on the host. Add a comment on why VITE_ is required on the prefix and what happens to a variable without it.',
      'shell',
      `# 1. TODO: install exactly what the lockfile says (not a fresh resolve)

# 2. TODO: build for production

# 3. TODO: serve the built output locally to check it before shipping

# 4. TODO: the local env file and one variable in it

# 5. TODO: why VITE_API_URL is readable in the browser and API_SECRET is not —
#          and why that means secrets never go in a frontend env file
`,
    ),
    write(
      'A single-page app 404s on refresh unless every path is rewritten to index.html. Write the config that does it, plus long cache headers for the fingerprinted assets and no caching for index.html itself.',
      'json',
      `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}

/*
  TODO — add to the JSON above:
  1. a rewrite sending every path to /index.html (and why a redirect is wrong here)
  2. Cache-Control for /assets/* — those filenames contain a content hash
  3. Cache-Control for /index.html — it must never be served stale
*/`,
    ),
    write(
      'Write the <head> block a shared link depends on. Title within 50-60 characters, meta description within 50-160, canonical URL, and the Open Graph and Twitter tags that decide what a preview card looks like. Count the characters in a comment beside the title and description.',
      'html',
      `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- TODO: title (50-60 chars) -->
  <!-- TODO: meta description (50-160 chars) -->
  <!-- TODO: canonical -->

  <!-- TODO: og:title, og:description, og:image, og:url, og:type -->

  <!-- TODO: twitter:card and the tags it needs -->
</head>`,
    ),
    write(
      'Give the crawlers a map. Write sitemap.xml listing the four public URLs with lastmod and priority, and add — as a comment — the robots.txt that points at it and keeps the crawler out of the app routes.',
      'xml',
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://skillofied.com/</loc>
    <lastmod>2026-09-07</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- TODO: /courses, /courses/frontend, /about -->
</urlset>

<!--
  robots.txt:
  TODO: allow the public pages, disallow /dashboard and /api, point at the sitemap
-->`,
    ),
    run(
      'Write the checker the SEO tools run. auditMeta scores a page out of 100 and lists what is wrong: the title must be 50-60 characters, the description 50-160, and both must be present.',
      `function auditMeta({ title = '', description = '' }) {
  // TODO: return { score, issues } — 50 points for a title in range,
  // 50 for a description in range, and an issue string for each failure:
  //   'title too short', 'title too long', 'title missing'
  //   'description too short', 'description too long', 'description missing'
}

const good = auditMeta({
  title: 'Frontend Development Mastery: Complete Beginner Course',
  description: 'Learn HTML, CSS, JavaScript and React from scratch with mentor-reviewed assignments and a portfolio project.',
});
const bad = auditMeta({ title: 'Home', description: '' });

console.log(good.score, JSON.stringify(good.issues));
console.log(bad.score, JSON.stringify(bad.issues));`,
      [{
        input: 'None',
        output: '100 []\n0 ["title too short","description missing"]',
        explanation: 'The passing title is 54 characters and the description 108 — count them before assuming.',
      }],
    ),
  ],
};
