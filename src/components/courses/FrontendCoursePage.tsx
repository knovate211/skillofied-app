import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import LessonChrome from './shared/LessonChrome';
import { SyllabusModule } from '../../types';

// Import modular lesson components
import CourseOverview from './modules/FrontendCourse/CourseOverview';
import Module1 from './modules/FrontendCourse/Module1';
import Module2 from './modules/FrontendCourse/Module2';
import Module3 from './modules/FrontendCourse/Module3';
import Module4 from './modules/FrontendCourse/Module4';
import Module5 from './modules/FrontendCourse/Module5';
import Module6 from './modules/FrontendCourse/Module6';
import Module7 from './modules/FrontendCourse/Module7';
import Module8 from './modules/FrontendCourse/Module8';
import Module9 from './modules/FrontendCourse/Module9';
import Module10 from './modules/FrontendCourse/Module10';
import Module11 from './modules/FrontendCourse/Module11';
import Module12 from './modules/FrontendCourse/Module12';
import Module13 from './modules/FrontendCourse/Module13';
import Module14 from './modules/FrontendCourse/Module14';
import Module15 from './modules/FrontendCourse/Module15';
import Module16 from './modules/FrontendCourse/Module16';
import Module17 from './modules/FrontendCourse/Module17';
import MajorProjects from './modules/FrontendCourse/MajorProjects';
import InterviewPrep from './modules/FrontendCourse/InterviewPrep';
import FinalAssessment from './modules/FrontendCourse/FinalAssessment';
import Certification from './modules/FrontendCourse/Certification';

// ─── SYLLABUS DATA ────────────────────────────────────────────────────────────
const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [
      { id: 'overview-welcome', title: 'Welcome Message' },
      { id: 'overview-video', title: 'Course Introduction Video' },
      { id: 'overview-outcomes', title: 'Learning Outcomes' },
      { id: 'overview-roadmap', title: 'Course Roadmap' },
      { id: 'overview-prereqs', title: 'Prerequisites' },
      { id: 'overview-resources', title: 'Course Resources' },
    ],
  },
  {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION TO WEB DEVELOPMENT',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 Welcome to Web Development' },
      { id: 'm1-l2', title: 'Lesson 1.2 What is Web Development?' },
      { id: 'm1-l3', title: 'Lesson 1.3 How Websites Work' },
      { id: 'm1-l4', title: 'Lesson 1.4 Frontend vs Backend vs Database' },
      { id: 'm1-l5', title: 'Lesson 1.5 Frontend Development Roadmap' },
      { id: 'm1-l6', title: 'Lesson 1.6 Types of Websites' },
      { id: 'm1-l7', title: 'Lesson 1.7 Developer Tools Setup' },
      { id: 'm1-l8', title: 'Lesson 1.8 Career Opportunities' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: HTML FUNDAMENTALS',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 Introduction to HTML' },
      { id: 'm2-l2', title: 'Lesson 2.2 HTML Document Structure' },
      { id: 'm2-l3', title: 'Lesson 2.3 Headings and Paragraphs' },
      { id: 'm2-l4', title: 'Lesson 2.4 Text Formatting Tags' },
      { id: 'm2-l5', title: 'Lesson 2.5 Links and Navigation' },
      { id: 'm2-l6', title: 'Lesson 2.6 Images and Multimedia' },
      { id: 'm2-l7', title: 'Lesson 2.7 Lists (Ordered & Unordered)' },
      { id: 'm2-l8', title: 'Lesson 2.8 Tables' },
      { id: 'm2-l9', title: 'Lesson 2.9 Forms and Inputs' },
      { id: 'm2-l10', title: 'Lesson 2.10 Semantic HTML' },
      { id: 'm2-l11', title: 'Lesson 2.11 Accessibility Basics' },
      { id: 'm2-proj', title: 'HTML Mini Project' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: CSS FUNDAMENTALS',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 Introduction to CSS' },
      { id: 'm3-l2', title: 'Lesson 3.2 CSS Syntax' },
      { id: 'm3-l3', title: 'Lesson 3.3 Selectors' },
      { id: 'm3-l4', title: 'Lesson 3.4 Colors and Backgrounds' },
      { id: 'm3-l5', title: 'Lesson 3.5 Typography' },
      { id: 'm3-l6', title: 'Lesson 3.6 Box Model' },
      { id: 'm3-l7', title: 'Lesson 3.7 Borders and Shadows' },
      { id: 'm3-l8', title: 'Lesson 3.8 Display Property' },
      { id: 'm3-l9', title: 'Lesson 3.9 Flexbox Layout' },
      { id: 'm3-l10', title: 'Lesson 3.10 Position Property' },
      { id: 'm3-l11', title: 'Lesson 3.11 CSS Variables & Hover States' },
      { id: 'm3-proj', title: 'CSS Mini Project' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: FLEXBOX & GRID',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 Introduction to Flexbox' },
      { id: 'm4-l2', title: 'Lesson 4.2 Flex Container' },
      { id: 'm4-l3', title: 'Lesson 4.3 Flex Items' },
      { id: 'm4-l4', title: 'Lesson 4.4 Wrapping & Responsive Cards' },
      { id: 'm4-l5', title: 'Lesson 4.5 Introduction to CSS Grid' },
      { id: 'm4-l6', title: 'Lesson 4.6 Grid Rows & Columns' },
      { id: 'm4-l7', title: 'Lesson 4.7 Dashboard Layout with Grid Areas' },
      { id: 'm4-proj', title: 'Flexbox & Grid Project' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: RESPONSIVE WEB DESIGN',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 What is Responsive Design' },
      { id: 'm5-l2', title: 'Lesson 5.2 Mobile First Design' },
      { id: 'm5-l3', title: 'Lesson 5.3 Media Queries' },
      { id: 'm5-l4', title: 'Lesson 5.4 Responsive Navigation' },
      { id: 'm5-l5', title: 'Lesson 5.5 Responsive Images' },
      { id: 'm5-l6', title: 'Lesson 5.6 Responsive Layouts' },
      { id: 'm5-proj', title: 'Responsive Website Project' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: JAVASCRIPT FUNDAMENTALS',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 Introduction to JavaScript' },
      { id: 'm6-l2', title: 'Lesson 6.2 Variables' },
      { id: 'm6-l3', title: 'Lesson 6.3 Data Types' },
      { id: 'm6-l4', title: 'Lesson 6.4 Operators' },
      { id: 'm6-l5', title: 'Lesson 6.5 Conditional Statements' },
      { id: 'm6-l6', title: 'Lesson 6.6 Loops' },
      { id: 'm6-l7', title: 'Lesson 6.7 Functions' },
      { id: 'm6-l8', title: 'Lesson 6.8 Arrays' },
      { id: 'm6-l9', title: 'Lesson 6.9 Objects' },
      { id: 'm6-l10', title: 'Lesson 6.10 Scope' },
      { id: 'm6-l11', title: 'Lesson 6.11 Hoisting' },
      { id: 'm6-proj', title: 'JavaScript Exercises' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: DOM MANIPULATION & EVENTS',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 Introduction to DOM' },
      { id: 'm7-l2', title: 'Lesson 7.2 Selecting Elements' },
      { id: 'm7-l3', title: 'Lesson 7.3 Updating Elements' },
      { id: 'm7-l4', title: 'Lesson 7.4 Creating Elements' },
      { id: 'm7-l5', title: 'Lesson 7.5 Event Listeners' },
      { id: 'm7-l6', title: 'Lesson 7.6 Form Validation' },
      { id: 'm7-l7', title: 'Lesson 7.7 Local Storage' },
      { id: 'm7-l8', title: 'Lesson 7.8 Session Storage' },
      { id: 'm7-proj', title: 'Todo App Project' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: MODERN JAVASCRIPT (ES6+)',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 let vs const' },
      { id: 'm8-l2', title: 'Lesson 8.2 Arrow Functions' },
      { id: 'm8-l3', title: 'Lesson 8.3 Template Literals' },
      { id: 'm8-l4', title: 'Lesson 8.4 Destructuring' },
      { id: 'm8-l5', title: 'Lesson 8.5 Spread Operator' },
      { id: 'm8-l6', title: 'Lesson 8.6 Rest Operator' },
      { id: 'm8-l7', title: 'Lesson 8.7 Default Parameters' },
      { id: 'm8-l8', title: 'Lesson 8.8 Modules' },
      { id: 'm8-l9', title: 'Lesson 8.9 Classes' },
      { id: 'm8-l10', title: 'Lesson 8.10 Object-Oriented JavaScript' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: ASYNCHRONOUS JAVASCRIPT',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 Synchronous vs Asynchronous' },
      { id: 'm9-l2', title: 'Lesson 9.2 Callbacks' },
      { id: 'm9-l3', title: 'Lesson 9.3 Promises' },
      { id: 'm9-l4', title: 'Lesson 9.4 Async/Await' },
      { id: 'm9-l5', title: 'Lesson 9.5 Fetch API' },
      { id: 'm9-l6', title: 'Lesson 9.6 Error Handling' },
      { id: 'm9-l7', title: 'Lesson 9.7 API Integration' },
      { id: 'm9-proj', title: 'Weather App Project' },
      { id: 'm9-quiz', title: 'Module Quiz' },
      { id: 'm9-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: GIT & GITHUB',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 Introduction to Git' },
      { id: 'm10-l2', title: 'Lesson 10.2 Installing Git' },
      { id: 'm10-l3', title: 'Lesson 10.3 Git Commands' },
      { id: 'm10-l4', title: 'Lesson 10.4 Creating Repositories' },
      { id: 'm10-l5', title: 'Lesson 10.5 GitHub Basics' },
      { id: 'm10-l6', title: 'Lesson 10.6 Branching' },
      { id: 'm10-l7', title: 'Lesson 10.7 Merging' },
      { id: 'm10-l8', title: 'Lesson 10.8 Pull Requests' },
      { id: 'm10-quiz', title: 'Module Quiz' },
      { id: 'm10-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: INTRODUCTION TO REACT',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 What is React' },
      { id: 'm11-l2', title: 'Lesson 11.2 Installing React with Vite' },
      { id: 'm11-l3', title: 'Lesson 11.3 Project Structure' },
      { id: 'm11-l4', title: 'Lesson 11.4 JSX' },
      { id: 'm11-l5', title: 'Lesson 11.5 React Components' },
      { id: 'm11-l6', title: 'Lesson 11.6 Props' },
      { id: 'm11-l7', title: 'Lesson 11.7 Component Reusability' },
      { id: 'm11-proj', title: 'React Mini Project' },
      { id: 'm11-quiz', title: 'Module Quiz' },
      { id: 'm11-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: REACT STATE MANAGEMENT',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 State Introduction' },
      { id: 'm12-l2', title: 'Lesson 12.2 useState Hook' },
      { id: 'm12-l3', title: 'Lesson 12.3 Event Handling' },
      { id: 'm12-l4', title: 'Lesson 12.4 Forms in React' },
      { id: 'm12-l5', title: 'Lesson 12.5 Conditional Rendering' },
      { id: 'm12-l6', title: 'Lesson 12.6 Lists and Keys' },
      { id: 'm12-proj', title: 'Counter App Project' },
      { id: 'm12-quiz', title: 'Module Quiz' },
      { id: 'm12-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm13',
    title: 'MODULE 13: REACT HOOKS',
    items: [
      { id: 'm13-l1', title: 'Lesson 13.1 useEffect' },
      { id: 'm13-l2', title: 'Lesson 13.2 useRef' },
      { id: 'm13-l3', title: 'Lesson 13.3 useMemo' },
      { id: 'm13-l4', title: 'Lesson 13.4 useCallback' },
      { id: 'm13-l5', title: 'Lesson 13.5 Custom Hooks' },
      { id: 'm13-proj', title: 'Hooks Project' },
      { id: 'm13-quiz', title: 'Module Quiz' },
      { id: 'm13-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm14',
    title: 'MODULE 14: REACT ROUTER',
    items: [
      { id: 'm14-l1', title: 'Lesson 14.1 Routing Basics' },
      { id: 'm14-l2', title: 'Lesson 14.2 Browser Router' },
      { id: 'm14-l3', title: 'Lesson 14.3 Route Parameters' },
      { id: 'm14-l4', title: 'Lesson 14.4 Nested Routes' },
      { id: 'm14-l5', title: 'Lesson 14.5 Protected Routes' },
      { id: 'm14-proj', title: 'Routing Project' },
      { id: 'm14-quiz', title: 'Module Quiz' },
      { id: 'm14-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm15',
    title: 'MODULE 15: REACT API INTEGRATION',
    items: [
      { id: 'm15-l1', title: 'Lesson 15.1 Fetching Data' },
      { id: 'm15-l2', title: 'Lesson 15.2 Loading States' },
      { id: 'm15-l3', title: 'Lesson 15.3 Error States' },
      { id: 'm15-l4', title: 'Lesson 15.4 CRUD Operations' },
      { id: 'm15-l5', title: 'Lesson 15.5 Authentication UI' },
      { id: 'm15-proj', title: 'Movie App Project' },
      { id: 'm15-quiz', title: 'Module Quiz' },
      { id: 'm15-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm16',
    title: 'MODULE 16: ADVANCED REACT',
    items: [
      { id: 'm16-l1', title: 'Lesson 16.1 Context API' },
      { id: 'm16-l2', title: 'Lesson 16.2 Reducers' },
      { id: 'm16-l3', title: 'Lesson 16.3 Zustand Basics' },
      { id: 'm16-l4', title: 'Lesson 16.4 Redux Toolkit Basics' },
      { id: 'm16-l5', title: 'Lesson 16.5 Performance Optimization' },
      { id: 'm16-proj', title: 'Advanced Project' },
      { id: 'm16-quiz', title: 'Module Quiz' },
      { id: 'm16-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm17',
    title: 'MODULE 17: DEPLOYMENT & OPTIMIZATION',
    items: [
      { id: 'm17-l1', title: 'Lesson 17.1 Build Process' },
      { id: 'm17-l2', title: 'Lesson 17.2 Environment Variables' },
      { id: 'm17-l3', title: 'Lesson 17.3 Deploying on Vercel' },
      { id: 'm17-l4', title: 'Lesson 17.4 Deploying on Netlify' },
      { id: 'm17-l5', title: 'Lesson 17.5 Custom Domain Setup' },
      { id: 'm17-l6', title: 'Lesson 17.6 SEO Basics' },
      { id: 'm17-quiz', title: 'Module Quiz' },
      { id: 'm17-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'projects',
    title: 'MAJOR PROJECTS',
    items: [
      { id: 'proj-1', title: 'Project 1: Personal Portfolio Website' },
      { id: 'proj-2', title: 'Project 2: Responsive Landing Page' },
      { id: 'proj-3', title: 'Project 3: Calculator App' },
      { id: 'proj-4', title: 'Project 4: Todo App' },
      { id: 'proj-5', title: 'Project 5: Weather Application' },
      { id: 'proj-6', title: 'Project 6: Movie Search Application' },
      { id: 'proj-7', title: 'Project 7: E-Commerce Frontend' },
      { id: 'proj-8', title: 'Project 8: Admin Dashboard' },
      { id: 'proj-capstone', title: 'Final Capstone Project' },
    ],
  },
  {
    id: 'prep',
    title: 'INTERVIEW PREPARATION',
    items: [
      { id: 'prep-htmlcss', title: 'HTML & CSS Questions' },
      { id: 'prep-js', title: 'JavaScript Questions' },
      { id: 'prep-react', title: 'React Questions' },
      { id: 'prep-perf', title: 'Performance & Tooling Questions' },
      { id: 'prep-coding', title: 'Coding Challenges' },
      { id: 'prep-mock', title: 'Mock Interviews' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'test-theory', title: 'Theory Test' },
      { id: 'test-coding', title: 'Coding Test' },
      { id: 'test-eval', title: 'Project Evaluation' },
      { id: 'test-viva', title: 'Viva / Interview Questions' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [
      { id: 'cert-view', title: 'Course Certificate' },
      { id: 'cert-badge', title: 'Project Badge' },
      { id: 'cert-skills', title: 'Skills Certificate' },
    ],
  },
];

// ─── Module Content Router ─────────────────────────────────────────────────
// The Frontend lessons are hand-authored JSX rather than course data, so they
// cannot go through LessonLayout like the other courses. Routing every page
// through LessonChrome here gives them the template's header, measure, and type
// scale without rewriting the seventeen module files.
function renderFrontendContent(moduleId: string, page: number): React.ReactNode {
  const content = renderModule(moduleId, page);

  // Only the teaching modules get the reading measure. The overview, projects,
  // prep, assessment, and certification sections are wide dashboard layouts
  // (video players, project grids, certificate art) that it would squeeze.
  if (!/^m\d+$/.test(moduleId)) return content;

  const itemId = SYLLABUS.find((m) => m.id === moduleId)?.items[page - 1]?.id;

  // Quizzes and assignments bring their own centred layout, so wrapping them
  // would nest two identical containers.
  if (itemId?.endsWith('-quiz') || itemId?.endsWith('-assignment')) return content;

  return <LessonChrome itemId={itemId}>{content}</LessonChrome>;
}

function renderModule(moduleId: string, page: number): React.ReactNode {
  switch (moduleId) {
    case 'overview': return <CourseOverview page={page} />;
    case 'm1': return <Module1 page={page} />;
    case 'm2': return <Module2 page={page} />;
    case 'm3': return <Module3 page={page} />;
    case 'm4': return <Module4 page={page} />;
    case 'm5': return <Module5 page={page} />;
    case 'm6': return <Module6 page={page} />;
    case 'm7': return <Module7 page={page} />;
    case 'm8': return <Module8 page={page} />;
    case 'm9': return <Module9 page={page} />;
    case 'm10': return <Module10 page={page} />;
    case 'm11': return <Module11 page={page} />;
    case 'm12': return <Module12 page={page} />;
    case 'm13': return <Module13 page={page} />;
    case 'm14': return <Module14 page={page} />;
    case 'm15': return <Module15 page={page} />;
    case 'm16': return <Module16 page={page} />;
    case 'm17': return <Module17 page={page} />;
    case 'projects': return <MajorProjects page={page} />;
    case 'prep': return <InterviewPrep page={page} />;
    case 'assessment': return <FinalAssessment page={page} />;
    case 'certification': return <Certification page={page} />;
    default: return null;
  }
}

// ─── Page Component ─────────────────────────────────────────────────────────
const FrontendCoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="Frontend Development Mastery"
    courseSubtitle="Instructor-Led Course Syllabus"
    sidebarSubtitle="Frontend Mastery"
    storageKey="maxIndexRead"
    unlockAfterModuleId="m1"
    unlockModuleName="Module 1: Introduction to Web Development"
    renderContent={renderFrontendContent}
  />
);

export default FrontendCoursePage;
