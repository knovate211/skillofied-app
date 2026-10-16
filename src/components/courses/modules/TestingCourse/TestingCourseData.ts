import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';
import type { LessonBlock } from '../../shared/LessonBlocks';
import { overviewAndModule1Lessons } from './lessons/overviewAndModule1';
import { modules2And4Lessons } from './lessons/modules2And4';
import { modules3And5Lessons } from './lessons/modules3And5';
import { modules6And7Lessons } from './lessons/modules6And7';
import { modules8And11Lessons } from './lessons/modules8And11';
import { modules9And13Lessons } from './lessons/modules9And13';
import { modules10And12Lessons } from './lessons/modules10And12';
import { modules14And15Lessons } from './lessons/modules14And15';
import { interviewLessons } from './lessons/interview';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  /** Rich lesson body; replaces `theory` in the prose slot when present. */
  blocks?: LessonBlock[];
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    prompts: AssignmentQuestion[];
  };
}

/** Full lesson bodies, authored per module under ./lessons. */
const EXPANDED_LESSONS: Record<string, Lesson> = {
  ...overviewAndModule1Lessons,
  ...modules2And4Lessons,
  ...modules3And5Lessons,
  ...modules6And7Lessons,
  ...modules8And11Lessons,
  ...modules9And13Lessons,
  ...modules10And12Lessons,
  ...modules14And15Lessons,
  ...interviewLessons,
};

export const TESTING_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION TO SOFTWARE TESTING',
    overview: 'Learn the fundamentals of software testing, development lifecycles, and STLC phases.',
    outcomes: [
      'Understand why software testing is critical.',
      'Differentiate between SDLC and STLC phases.'
    ],
    lessons: [
      EXPANDED_LESSONS['m1-l1'],
      EXPANDED_LESSONS['m1-l2'],
      EXPANDED_LESSONS['m1-l3'],
      EXPANDED_LESSONS['m1-l4'],
      EXPANDED_LESSONS['m1-l5'],
      EXPANDED_LESSONS['m1-l6'],
      EXPANDED_LESSONS['m1-l7'],
      EXPANDED_LESSONS['m1-l8'],
    ],
    quiz: [
      { id: 1, question: 'Which phase of STLC involves identifying testing scope and resources?', options: ["A. Test Planning", "B. Test Case Development", "C. Test Closure", "D. Environment Setup"], correctAnswer: "A. Test Planning" },
      { id: 2, question: 'What is the primary goal of software testing?', options: ['A. To prove the program has zero bugs', 'B. To find defects and verify expected behavior', 'C. To write code', 'D. To design user interfaces'], correctAnswer: 'B. To find defects and verify expected behavior' },
      { id: 3, question: "Which SDLC model runs development in short iterations with frequent feedback?", options: ["A. Waterfall", "B. Big Bang", "C. V-Model only", "D. Agile"], correctAnswer: "D. Agile" },
      { id: 4, question: "Why is it cheaper to find a defect during requirements than in production?", options: ["A. Fewer artefacts have been built on the wrong assumption", "B. Testers are paid less at the requirements stage", "C. Production bugs cannot be fixed", "D. Requirements documents are shorter"], correctAnswer: "A. Fewer artefacts have been built on the wrong assumption" },
      { id: 5, question: "Which STLC phase produces the test cases?", options: ["A. Test Closure", "B. Test Case Development", "C. Environment Setup", "D. Requirement Analysis"], correctAnswer: "B. Test Case Development" },
      { id: 6, question: "What does a QA engineer own besides finding bugs?", options: ["A. Writing all production code", "B. Setting the product roadmap", "C. Assessing quality risk and advocating for the user", "D. Approving every design before development begins"], correctAnswer: "C. Assessing quality risk and advocating for the user" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which of the following describes the correct order of STLC phases?',
          options: [
            "A. Test Planning -> Requirements Analysis -> Test Execution -> Test Case Development",
            "B. Test Execution -> Test Case Development -> Test Planning -> Test Closure",
            "C. Requirements Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure",
            "D. Environment Setup -> Test Execution -> Requirements Analysis -> Test Planning",
          ],
          correctAnswer: "C. Requirements Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure"
        }
      ]
    }
  },
  m2: {
    id: 'm2',
    title: 'MODULE 2: SOFTWARE TESTING FUNDAMENTALS',
    overview: 'Dive deep into core testing principles, test levels, black/white/grey box methodologies, and verification vs validation.',
    outcomes: [
      'Apply the 7 testing principles to real projects.',
      'Explain the difference between verification and validation.'
    ],
    lessons: [
      EXPANDED_LESSONS['m2-l1'],
      EXPANDED_LESSONS['m2-l2'],
      EXPANDED_LESSONS['m2-l3'],
      EXPANDED_LESSONS['m2-l4'],
      EXPANDED_LESSONS['m2-l5'],
      EXPANDED_LESSONS['m2-l6'],
      EXPANDED_LESSONS['m2-l7'],
      EXPANDED_LESSONS['m2-l8'],
    ],
    quiz: [
      { id: 1, question: 'Running the same regression tests every release finds fewer and fewer new bugs. Which testing principle describes this?', options: ["A. Defect clustering", "B. Exhaustive testing is impossible", "C. Early testing saves time", "D. Pesticide paradox"], correctAnswer: "D. Pesticide paradox" },
      { id: 2, question: 'Which test level is closest to the business user?', options: ["A. Acceptance Testing", "B. Unit Testing", "C. Integration Testing", "D. System Testing"], correctAnswer: "A. Acceptance Testing" },
      { id: 3, question: "\"Exhaustive testing is impossible\" means...", options: ["A. Every input should still be tried", "B. Automation can test everything", "C. Testing is not worth doing", "D. Testing must be prioritised by risk"], correctAnswer: "D. Testing must be prioritised by risk" },
      { id: 4, question: "Which is non-functional testing?", options: ["A. Load testing", "B. Login validation", "C. Form submission", "D. Checkout calculation"], correctAnswer: "A. Load testing" },
      { id: 5, question: "White box testing is designed from...", options: ["A. The user interface only", "B. The internal code structure", "C. Business requirements only", "D. User reviews"], correctAnswer: "B. The internal code structure" },
      { id: 6, question: "Verification versus validation?", options: ["A. Building the right thing versus building it right", "B. Unit versus system testing", "C. Building it right versus building the right thing", "D. Manual versus automated"], correctAnswer: "C. Building it right versus building the right thing" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What is the main difference between Verification and Validation?',
          options: [
            "A. Verification involves executing the software; Validation does not.",
            "B. Verification evaluates static documents (reviews/walkthroughs); Validation executes the active code to verify system behavior.",
            "C. Verification checks the finished product with real users, while Validation reviews the requirement documents before any code is written.",
            "D. There is no difference; the terms are used interchangeably in ISTQB.",
          ],
          correctAnswer: 'B. Verification evaluates static documents (reviews/walkthroughs); Validation executes the active code to verify system behavior.'
        }
      ]
    }
  },
  m3: {
    id: 'm3',
    title: 'MODULE 3: TEST CASE DESIGN',
    overview: 'Learn test case structuring, Test Plans, Test Strategies, and advanced black box design techniques.',
    outcomes: [
      'Write structured functional test cases.',
      'Apply Boundary Value Analysis and Equivalence Partitioning.'
    ],
    lessons: [
      EXPANDED_LESSONS['m3-l1'],
      EXPANDED_LESSONS['m3-l2'],
      EXPANDED_LESSONS['m3-l3'],
      EXPANDED_LESSONS['m3-l4'],
      EXPANDED_LESSONS['m3-l5'],
      EXPANDED_LESSONS['m3-l6'],
      EXPANDED_LESSONS['m3-l7'],
      EXPANDED_LESSONS['m3-l8'],
      EXPANDED_LESSONS['m3-l9'],
      EXPANDED_LESSONS['m3-l10'],
    ],
    quiz: [
      { id: 1, question: 'If a text field accepts a password between 6 and 12 characters, what are the boundaries to test using BVA?', options: ["A. 6, 12", "B. 1, 5, 10, 15", "C. 5, 6, 7, 11, 12, 13", "D. 0, 6, 12, 20"], correctAnswer: "C. 5, 6, 7, 11, 12, 13" },
      { id: 2, question: 'What is a Test Strategy?', options: ["A. A day-by-day execution schedule listing which tester runs each test case", "B. A detailed, step-by-step list of test cases for one sprint", "C. A database schema definition", "D. A high-level, static project or organizational policy document defining testing approaches"], correctAnswer: "D. A high-level, static project or organizational policy document defining testing approaches" },
      { id: 3, question: "An age field accepts 18–60. Which set is a valid equivalence partition example?", options: ["A. Only 18 and 60", "B. Every value from 18 to 60", "C. Only negative numbers", "D. One value below 18, one within, one above 60"], correctAnswer: "D. One value below 18, one within, one above 60" },
      { id: 4, question: "Which technique suits rules with combinations of conditions?", options: ["A. Decision table testing", "B. Error guessing", "C. Boundary value analysis", "D. Smoke testing"], correctAnswer: "A. Decision table testing" },
      { id: 5, question: "State transition testing is most useful for...", options: ["A. Static text pages", "B. Systems whose behaviour depends on prior events", "C. Rendering fonts consistently across browsers", "D. One-off calculations"], correctAnswer: "B. Systems whose behaviour depends on prior events" },
      { id: 6, question: "What distinguishes a test scenario from a test case?", options: ["A. A case is broader than a scenario", "B. A case lists what to test; a scenario gives the exact steps", "C. A scenario is what to test; a case gives steps and expected results", "D. A scenario always has test data"], correctAnswer: "C. A scenario is what to test; a case gives steps and expected results" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'You are testing an input field that accepts an integer between 10 and 50 (inclusive). Which set of values represents the boundary cases according to Boundary Value Analysis (BVA)?',
          options: [
            "A. 9, 10, 11, 49, 50, 51",
            "B. 10, 30, 50",
            "C. 0, 10, 50, 100",
            "D. 8, 9, 51, 52",
          ],
          correctAnswer: "A. 9, 10, 11, 49, 50, 51"
        }
      ]
    }
  },
  m4: {
    id: 'm4',
    title: 'MODULE 4: DEFECT MANAGEMENT',
    overview: 'Learn bug lifecycles, bug report formatting, defect triage, severity vs priority, and tool usage.',
    outcomes: [
      'Write highly descriptive and reproducible bug reports.',
      'Explain the difference between severity and priority.'
    ],
    lessons: [
      EXPANDED_LESSONS['m4-l1'],
      EXPANDED_LESSONS['m4-l2'],
      EXPANDED_LESSONS['m4-l3'],
      EXPANDED_LESSONS['m4-l4'],
      EXPANDED_LESSONS['m4-l5'],
      EXPANDED_LESSONS['m4-l6'],
    ],
    quiz: [
      { id: 1, question: 'What is the state of a bug when it is rejected by developers as not being a defect?', options: ['A. Deferred', 'B. Invalid/Rejected', 'C. Closed', 'D. Fixed'], correctAnswer: 'B. Invalid/Rejected' },
      { id: 2, question: 'Misspelled company logo on the homepage has which classification?', options: ["A. Low Severity, Low Priority", "B. High Severity, Low Priority", "C. Low Severity, High Priority", "D. High Severity, High Priority"], correctAnswer: "C. Low Severity, High Priority" },
      { id: 3, question: "Severity describes...", options: ["A. How soon it must be fixed", "B. Who reported it", "C. How long it took to find", "D. The technical impact of the defect"], correctAnswer: "D. The technical impact of the defect" },
      { id: 4, question: "What makes a bug report reproducible?", options: ["A. Exact steps, environment, and expected versus actual results", "B. A detailed opinion on the cause", "C. A severity of Critical", "D. A screenshot plus the developer's guess at the cause"], correctAnswer: "A. Exact steps, environment, and expected versus actual results" },
      { id: 5, question: "After a developer fixes a bug, what does the tester do?", options: ["A. Close it immediately", "B. Retest it and run regression on related areas", "C. Mark it Deferred until the next release", "D. Reopen it automatically"], correctAnswer: "B. Retest it and run regression on related areas" },
      { id: 6, question: "Which tool is widely used for defect tracking?", options: ["A. Postman", "B. JMeter", "C. Jira", "D. Appium"], correctAnswer: "C. Jira" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which state in the Bug Life Cycle indicates that the tester is confirming if a fixed defect has actually been resolved?',
          options: [
            "A. Deferred",
            "B. Reopened",
            "C. Deferred (awaiting the next build)",
            "D. Retesting (or Pending Retest)",
          ],
          correctAnswer: "D. Retesting (or Pending Retest)"
        }
      ]
    }
  },
  m5: {
    id: 'm5',
    title: 'MODULE 5: AGILE TESTING',
    overview: 'Understand Agile methodologies, Scrum frameworks, sprints, ceremonies, and QA integration.',
    outcomes: [
      'Participate in Scrum ceremonies as a QA engineer.',
      'Estimate story points and define acceptance criteria.'
    ],
    lessons: [
      EXPANDED_LESSONS['m5-l1'],
      EXPANDED_LESSONS['m5-l2'],
      EXPANDED_LESSONS['m5-l3'],
      EXPANDED_LESSONS['m5-l4'],
      EXPANDED_LESSONS['m5-l5'],
      EXPANDED_LESSONS['m5-l6'],
      EXPANDED_LESSONS['m5-l7'],
    ],
    quiz: [
      { id: 1, question: 'Who owns the product backlog prioritization in Scrum?', options: ["A. Product Owner", "B. Scrum Master", "C. QA Lead", "D. Tech Lead"], correctAnswer: "A. Product Owner" },
      { id: 2, question: 'What is the duration of a standard daily stand-up meeting?', options: ['A. 1 hour', 'B. 15 minutes', 'C. 30 minutes', 'D. 5 minutes'], correctAnswer: 'B. 15 minutes' },
      { id: 3, question: "When should testers join sprint planning?", options: ["A. Only after development ends", "B. Only during the review", "C. Never; planning is for developers", "D. From the start, to shape acceptance criteria"], correctAnswer: "D. From the start, to shape acceptance criteria" },
      { id: 4, question: "What is the purpose of a sprint retrospective?", options: ["A. To improve how the team works", "B. To demo features to stakeholders", "C. To assign bugs", "D. To plan the next release"], correctAnswer: "A. To improve how the team works" },
      { id: 5, question: "What does \"Definition of Done\" typically include for QA?", options: ["A. The product launched to all users", "B. Tests written and passing for the story", "C. Zero bugs anywhere in the product", "D. Manager sign-off only"], correctAnswer: "B. Tests written and passing for the story" },
      { id: 6, question: "Who attends the sprint review?", options: ["A. Developers only", "B. Testers only", "C. The team and stakeholders", "D. The Scrum Master alone"], correctAnswer: "C. The team and stakeholders" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What ceremony is held at the end of a sprint to reflect on the process and identify improvements?',
          options: [
            "A. Sprint Review",
            "B. Sprint Planning",
            "C. Sprint Retrospective",
            "D. Daily Stand-up",
          ],
          correctAnswer: "C. Sprint Retrospective"
        }
      ]
    }
  },
  m6: {
    id: 'm6',
    title: 'MODULE 6: API TESTING',
    overview: 'Master HTTP methods, REST API validation, JSON payloads, environment variables, and Postman assertions.',
    outcomes: [
      'Write assertions on JSON responses.',
      'Automate API test runs using Postman collections.'
    ],
    lessons: [
      EXPANDED_LESSONS['m6-l1'],
      EXPANDED_LESSONS['m6-l2'],
      EXPANDED_LESSONS['m6-l3'],
      EXPANDED_LESSONS['m6-l4'],
      EXPANDED_LESSONS['m6-l5'],
      EXPANDED_LESSONS['m6-l6'],
      EXPANDED_LESSONS['m6-l7'],
      EXPANDED_LESSONS['m6-l8'],
      EXPANDED_LESSONS['m6-l9'],
    ],
    quiz: [
      { id: 1, question: 'Which HTTP method should be used to create a new resource?', options: ["A. GET", "B. PUT", "C. DELETE", "D. POST"], correctAnswer: "D. POST" },
      { id: 2, question: 'What does a 401 status code signify?', options: ["A. Unauthorized (Authentication failed)", "B. Internal Server Error", "C. Page Not Found", "D. Success"], correctAnswer: "A. Unauthorized (Authentication failed)" },
      { id: 3, question: "Which method should be idempotent when updating a whole resource?", options: ["A. POST", "B. PATCH always", "C. CONNECT", "D. PUT"], correctAnswer: "D. PUT" },
      { id: 4, question: "A 404 status code means...", options: ["A. The resource was not found", "B. The server crashed", "C. The user is not logged in", "D. The request was accepted"], correctAnswer: "A. The resource was not found" },
      { id: 5, question: "Why use environment variables in Postman?", options: ["A. To cache responses so repeated requests run faster", "B. To run the same requests against dev, staging and prod", "C. To hide the response body", "D. To replace assertions"], correctAnswer: "B. To run the same requests against dev, staging and prod" },
      { id: 6, question: "A 500 status code points to a problem on...", options: ["A. The client's network", "B. The request format", "C. The server side", "D. The user's permissions"], correctAnswer: "C. The server side" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which Postman JavaScript assertion correctly verifies that the response status code is 201 Created?',
          options: [
            "A. pm.test(\"Status is 201\", () => { pm.expect(pm.status).to.eql(201); });",
            "B. pm.test(\"Status is 201\", () => { pm.response.to.have.status(201); });",
            "C. assert.equal(response.code, 201);",
            "D. verify.status = 201;",
          ],
          correctAnswer: 'B. pm.test("Status is 201", () => { pm.response.to.have.status(201); });'
        }
      ]
    }
  },
  m7: {
    id: 'm7',
    title: 'MODULE 7: DATABASE TESTING',
    overview: 'Learn basic relational databases, SQL statements, table joins, data validation, and data integrity constraints.',
    outcomes: [
      'Write SELECT, INSERT, UPDATE, and DELETE queries.',
      'Verify database state updates matching API triggers.'
    ],
    lessons: [
      EXPANDED_LESSONS['m7-l1'],
      EXPANDED_LESSONS['m7-l2'],
      EXPANDED_LESSONS['m7-l3'],
      EXPANDED_LESSONS['m7-l4'],
      EXPANDED_LESSONS['m7-l5'],
      EXPANDED_LESSONS['m7-l6'],
      EXPANDED_LESSONS['m7-l7'],
    ],
    quiz: [
      { id: 1, question: 'Which JOIN returns all rows from the left table and matched rows from the right table?', options: ["A. INNER JOIN", "B. RIGHT JOIN", "C. LEFT JOIN", "D. FULL JOIN"], correctAnswer: "C. LEFT JOIN" },
      { id: 2, question: 'Which command modifies existing records in a table?', options: ["A. SELECT", "B. INSERT", "C. DELETE", "D. UPDATE"], correctAnswer: "D. UPDATE" },
      { id: 3, question: "What is the goal of data integrity testing?", options: ["A. Measuring query speed", "B. Measuring how quickly queries run under load", "C. Backing up the database", "D. Confirming data stays accurate and consistent across operations"], correctAnswer: "D. Confirming data stays accurate and consistent across operations" },
      { id: 4, question: "Which SQL clause filters grouped results?", options: ["A. HAVING", "B. WHERE", "C. ORDER BY", "D. LIMIT"], correctAnswer: "A. HAVING" },
      { id: 5, question: "After a UI form saves a record, how do you validate it in the database?", options: ["A. Refresh the page and check the value is still shown", "B. Query the table and compare stored values to the input", "C. Check the browser console", "D. Read the server logs only"], correctAnswer: "B. Query the table and compare stored values to the input" },
      { id: 6, question: "An INNER JOIN returns...", options: ["A. All rows from both tables", "B. All left rows only", "C. Only rows with matches in both tables", "D. Rows with no matches"], correctAnswer: "C. Only rows with matches in both tables" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What SQL query should you run to select all employees whose salary is greater than 50000, sorted by their last name?',
          options: [
            "A. SELECT * FROM employees WHERE salary > 50000 ORDER BY last_name;",
            "B. SELECT * FROM employees SORT BY last_name WHERE salary > 50000;",
            "C. SELECT * FROM employees GROUP BY last_name HAVING salary > 50000;",
            "D. GET employees IF salary > 50000;",
          ],
          correctAnswer: "A. SELECT * FROM employees WHERE salary > 50000 ORDER BY last_name;"
        }
      ]
    }
  },
  m8: {
    id: 'm8',
    title: 'MODULE 8: WEB AUTOMATION WITH SELENIUM',
    overview: 'Learn locator strategies, browser command sequences, handling forms, waits, alerts, and frame switches.',
    outcomes: [
      'Write automated browser interaction scripts.',
      'Apply explicit and implicit waits to reduce test instability.'
    ],
    lessons: [
      EXPANDED_LESSONS['m8-l1'],
      EXPANDED_LESSONS['m8-l2'],
      EXPANDED_LESSONS['m8-l3'],
      EXPANDED_LESSONS['m8-l4'],
      EXPANDED_LESSONS['m8-l5'],
      EXPANDED_LESSONS['m8-l6'],
      EXPANDED_LESSONS['m8-l7'],
      EXPANDED_LESSONS['m8-l8'],
      EXPANDED_LESSONS['m8-l9'],
      EXPANDED_LESSONS['m8-l10'],
    ],
    quiz: [
      { id: 1, question: 'Which command closes all open browser windows and terminates the driver session?', options: ['A. close()', 'B. quit()', 'C. terminate()', 'D. exit()'], correctAnswer: 'B. quit()' },
      { id: 2, question: 'Why is Thread.sleep() discouraged in Selenium tests?', options: ["A. It fails on browsers that load pages asynchronously", "B. It is deprecated and removed in Selenium 4", "C. It blocks execution for a fixed duration, slowing down tests unnecessarily", "D. It does not work in Java"], correctAnswer: "C. It blocks execution for a fixed duration, slowing down tests unnecessarily" },
      { id: 3, question: "Which locator is generally the most stable?", options: ["A. An absolute XPath", "B. The element's screen position", "C. A long CSS path of nested divs", "D. A unique id attribute"], correctAnswer: "D. A unique id attribute" },
      { id: 4, question: "What does an explicit wait do?", options: ["A. Waits for a specific condition up to a timeout", "B. Pauses for a fixed time", "C. Waits for every page load forever", "D. Disables implicit waits"], correctAnswer: "A. Waits for a specific condition up to a timeout" },
      { id: 5, question: "How do you interact with an element inside an iframe?", options: ["A. Use a longer XPath", "B. Switch to the frame first", "C. Refresh the page", "D. Maximise the window"], correctAnswer: "B. Switch to the frame first" },
      { id: 6, question: "Which class selects an option from a <select> dropdown?", options: ["A. Dropdown", "B. Options", "C. Select", "D. Picker"], correctAnswer: "C. Select" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'How do you configure an explicit wait in Selenium WebDriver for an element to become clickable?',
          options: [
            "A. WebDriverWait wait = new WebDriverWait(driver, 10); wait.until(driver.findElement(locator).isDisplayed());",
            "B. driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);",
            "C. Thread.sleep(10000);",
            "D. WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); wait.until(ExpectedConditions.elementToBeClickable(locator));",
          ],
          correctAnswer: "D. WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); wait.until(ExpectedConditions.elementToBeClickable(locator));"
        }
      ]
    }
  },
  m9: {
    id: 'm9',
    title: 'MODULE 9: TEST AUTOMATION FRAMEWORKS',
    overview: 'Learn Page Object Model, test execution frameworks (TestNG, JUnit), Maven dependencies, and logging structures.',
    outcomes: [
      'Implement a clean Page Object Model design pattern.',
      'Organize parallel executions using TestNG.'
    ],
    lessons: [
      EXPANDED_LESSONS['m9-l1'],
      EXPANDED_LESSONS['m9-l2'],
      EXPANDED_LESSONS['m9-l3'],
      EXPANDED_LESSONS['m9-l4'],
      EXPANDED_LESSONS['m9-l5'],
      EXPANDED_LESSONS['m9-l6'],
      EXPANDED_LESSONS['m9-l7'],
    ],
    quiz: [
      { id: 1, question: 'Which file manages dependencies and build lifecycle in a Maven project?', options: ["A. pom.xml", "B. package.json", "C. build.gradle", "D. testng.xml"], correctAnswer: "A. pom.xml" },
      { id: 2, question: 'What is the primary benefit of the Page Object Model?', options: ["A. Faster test execution by caching page elements in memory", "B. Decoupling test code from webpage UI selectors, reducing maintenance costs", "C. Automatic bug reporting", "D. Eliminates the need for browser drivers"], correctAnswer: 'B. Decoupling test code from webpage UI selectors, reducing maintenance costs' },
      { id: 3, question: "Which TestNG feature supplies multiple data sets to one test?", options: ["A. @BeforeClass", "B. @Listeners", "C. @Ignore", "D. @DataProvider"], correctAnswer: "D. @DataProvider" },
      { id: 4, question: "What does a hybrid framework combine?", options: ["A. Data-driven and keyword-driven approaches", "B. Manual and exploratory testing", "C. Java and Python", "D. Unit and UI tests only"], correctAnswer: "A. Data-driven and keyword-driven approaches" },
      { id: 5, question: "Why generate test reports automatically?", options: ["A. Reports make tests pass", "B. Results are visible and traceable after every run", "C. Reports replace the need for detailed logging", "D. They reduce test count"], correctAnswer: "B. Results are visible and traceable after every run" },
      { id: 6, question: "In POM, where do page locators live?", options: ["A. In each test method", "B. In the pom.xml", "C. In the page class", "D. In the database"], correctAnswer: "C. In the page class" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What annotation in TestNG is used to supply multiple test data sets to a test method?',
          options: [
            "A. @Parameters",
            "B. @Test(data)",
            "C. @DataProvider",
            "D. @ValueSource",
          ],
          correctAnswer: "C. @DataProvider"
        }
      ]
    }
  },
  m10: {
    id: 'm10',
    title: 'MODULE 10: PERFORMANCE TESTING',
    overview: 'Learn performance metrics, load, stress, spike, endurance verification, and Apache JMeter scripting.',
    outcomes: [
      'Differentiate between Load, Stress, and Spike testing.',
      'Simulate concurrent virtual users using Apache JMeter.'
    ],
    lessons: [
      EXPANDED_LESSONS['m10-l1'],
      EXPANDED_LESSONS['m10-l2'],
      EXPANDED_LESSONS['m10-l3'],
      EXPANDED_LESSONS['m10-l4'],
      EXPANDED_LESSONS['m10-l5'],
      EXPANDED_LESSONS['m10-l6'],
    ],
    quiz: [
      { id: 1, question: 'Which type of testing evaluates performance over an extended period of time to spot memory leaks?', options: ["A. Load Testing", "B. Stress Testing", "C. Spike Testing", "D. Endurance (Soak) Testing"], correctAnswer: "D. Endurance (Soak) Testing" },
      { id: 2, question: 'What does latency measure in API performance reports?', options: ["A. Time taken for a request to travel from client to server and return the first byte", "B. Total network bytes transferred", "C. Average CPU usage on the server during the test", "D. The number of transactions the server completes per second under load"], correctAnswer: "A. Time taken for a request to travel from client to server and return the first byte" },
      { id: 3, question: "What does stress testing aim to find?", options: ["A. Behaviour at typical load", "B. UI layout issues", "C. Spelling mistakes", "D. The breaking point beyond normal load"], correctAnswer: "D. The breaking point beyond normal load" },
      { id: 4, question: "Spike testing checks how a system handles...", options: ["A. A sudden sharp jump in users", "B. A slow steady increase", "C. Hours of normal load", "D. A single user"], correctAnswer: "A. A sudden sharp jump in users" },
      { id: 5, question: "Why report the 95th percentile response time?", options: ["A. It is always lower than the average", "B. It shows the slow experience the average hides", "C. It counts errors", "D. It measures bandwidth"], correctAnswer: "B. It shows the slow experience the average hides" },
      { id: 6, question: "Which open-source tool is widely used for load testing?", options: ["A. Selenium", "B. Jira", "C. Apache JMeter", "D. ADB"], correctAnswer: "C. Apache JMeter" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What performance testing term describes the maximum number of requests a system can handle per second?',
          options: [
            'A. Latency',
            'B. Throughput',
            'C. Connection pool',
            'D. Ramp-up time'
          ],
          correctAnswer: 'B. Throughput'
        }
      ]
    }
  },
  m11: {
    id: 'm11',
    title: 'MODULE 11: MOBILE TESTING',
    overview: 'Explore Android and iOS testing differences, mobile device emulation, and Appium automation.',
    outcomes: [
      'Differentiate between mobile simulators, emulators, and physical devices.',
      'Configure Appium desired capabilities.'
    ],
    lessons: [
      EXPANDED_LESSONS['m11-l1'],
      EXPANDED_LESSONS['m11-l2'],
      EXPANDED_LESSONS['m11-l3'],
      EXPANDED_LESSONS['m11-l4'],
      EXPANDED_LESSONS['m11-l5'],
    ],
    quiz: [
      { id: 1, question: 'Which tool connects and manages Android devices from the command line?', options: ["A. Xcode", "B. Appium Inspector", "C. ADB (Android Debug Bridge)", "D. SDK Manager"], correctAnswer: "C. ADB (Android Debug Bridge)" },
      { id: 2, question: 'What is the main advantage of Appium?', options: ["A. It only works on Windows", "B. It does not require test devices", "C. It runs tests on devices without needing an installed app", "D. It is cross-platform, letting you use the same API for Android and iOS tests"], correctAnswer: "D. It is cross-platform, letting you use the same API for Android and iOS tests" },
      { id: 3, question: "Why test on real devices as well as emulators?", options: ["A. Emulators cannot install apps", "B. Real devices are always cheaper", "C. Emulators do not support Android", "D. Real hardware reveals issues emulators miss"], correctAnswer: "D. Real hardware reveals issues emulators miss" },
      { id: 4, question: "What must mobile testing check that desktop web testing rarely does?", options: ["A. Interruptions like calls and network changes", "B. Keyboard shortcuts", "C. Mouse hover effects", "D. Printer output and print layouts"], correctAnswer: "A. Interruptions like calls and network changes" },
      { id: 5, question: "Which language does Appium require for tests?", options: ["A. Only Java, through the Appium Java client", "B. Any language with a WebDriver client", "C. Only Kotlin", "D. Only JavaScript"], correctAnswer: "B. Any language with a WebDriver client" },
      { id: 6, question: "What tool is commonly used to inspect iOS app elements?", options: ["A. ADB with the Android Layout Inspector", "B. Postman", "C. Xcode with Appium Inspector", "D. JMeter"], correctAnswer: "C. Xcode with Appium Inspector" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What mobile app type is built using standard web technologies (HTML, CSS, JS) but runs inside a native wrapper container on the device?',
          options: [
            "A. Hybrid App",
            "B. Native App",
            "C. Web App",
            "D. Desktop App",
          ],
          correctAnswer: "A. Hybrid App"
        }
      ]
    }
  },
  m12: {
    id: 'm12',
    title: 'MODULE 12: SECURITY TESTING BASICS',
    overview: 'Learn basic security concepts, OWASP Top 10, SQL injection patterns, and cross-site scripting (XSS).',
    outcomes: [
      'Explain common web vulnerabilities.',
      'Test authentication and authorization mechanisms.'
    ],
    lessons: [
      EXPANDED_LESSONS['m12-l1'],
      EXPANDED_LESSONS['m12-l2'],
      EXPANDED_LESSONS['m12-l3'],
      EXPANDED_LESSONS['m12-l4'],
      EXPANDED_LESSONS['m12-l5'],
    ],
    quiz: [
      { id: 1, question: 'What does OWASP stand for?', options: ["A. Online Web Alert System Protocol", "B. Open Web Application Security Project", "C. Open Windows Access Security Plan", "D. Object Web Architecture Standards Program"], correctAnswer: "B. Open Web Application Security Project" },
      { id: 2, question: 'Which vulnerability allows attackers to inject malicious SQL scripts into database inputs?', options: ["A. XSS", "B. CSRF", "C. SQL Injection", "D. Broken Authentication"], correctAnswer: "C. SQL Injection" },
      { id: 3, question: "What is Cross-Site Scripting (XSS)?", options: ["A. Guessing passwords repeatedly", "B. Flooding a server with traffic", "C. Stealing session devices through Bluetooth", "D. Injecting scripts that run in other users' browsers"], correctAnswer: "D. Injecting scripts that run in other users' browsers" },
      { id: 4, question: "An authorization test checks that...", options: ["A. Users cannot reach resources they are not permitted to", "B. Passwords are long enough", "C. Login pages load quickly", "D. Users must log in before seeing any page"], correctAnswer: "A. Users cannot reach resources they are not permitted to" },
      { id: 5, question: "Why should repeated failed logins be limited?", options: ["A. To reduce server load only", "B. To slow down brute-force attacks", "C. To improve password strength", "D. To speed up login"], correctAnswer: "B. To slow down brute-force attacks" },
      { id: 6, question: "Which is the best way to prevent SQL injection?", options: ["A. Hiding error messages", "B. Longer passwords", "C. Parameterised queries", "D. Client-side validation only"], correctAnswer: "C. Parameterised queries" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which security vulnerability occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing browser script execution?',
          options: [
            "A. SQL Injection",
            "B. Cross-Site Request Forgery (CSRF)",
            "C. Buffer Overflow",
            "D. Cross-Site Scripting (XSS)",
          ],
          correctAnswer: "D. Cross-Site Scripting (XSS)"
        }
      ]
    }
  },
  m13: {
    id: 'm13',
    title: 'MODULE 13: CI/CD FOR TESTERS',
    overview: 'Learn Git branching workflows, Jenkins pipeline configurations, and automated testing integration.',
    outcomes: [
      'Manage version control with Git.',
      'Configure automated test triggers inside a Jenkins pipeline.'
    ],
    lessons: [
      EXPANDED_LESSONS['m13-l1'],
      EXPANDED_LESSONS['m13-l2'],
      EXPANDED_LESSONS['m13-l3'],
      EXPANDED_LESSONS['m13-l4'],
      EXPANDED_LESSONS['m13-l5'],
      EXPANDED_LESSONS['m13-l6'],
    ],
    quiz: [
      { id: 1, question: 'Which command creates and switches to a new Git branch?', options: ["A. git checkout -b", "B. git branch", "C. git commit", "D. git merge"], correctAnswer: "A. git checkout -b" },
      { id: 2, question: 'What is the standard configuration file used to build pipelines in Jenkins?', options: ['A. pom.xml', 'B. Jenkinsfile', 'C. package.json', 'D. testng.xml'], correctAnswer: 'B. Jenkinsfile' },
      { id: 3, question: "What is continuous integration?", options: ["A. Merging branches monthly after a full manual test", "B. Testing only before release", "C. Manual code review only", "D. Merging changes often with automated builds and tests"], correctAnswer: "D. Merging changes often with automated builds and tests" },
      { id: 4, question: "Why run automated tests on every pull request?", options: ["A. Regressions are caught before merging", "B. It makes code compile faster", "C. It replaces code review", "D. It reduces repository size"], correctAnswer: "A. Regressions are caught before merging" },
      { id: 5, question: "Which command stages all changed files in Git?", options: ["A. git commit -a only", "B. git add .", "C. git push", "D. git stage --all-files"], correctAnswer: "B. git add ." },
      { id: 6, question: "What does continuous testing add to a pipeline?", options: ["A. A final manual test only", "B. Faster deployments without tests", "C. Quality feedback at every stage", "D. Automatic bug fixes"], correctAnswer: "C. Quality feedback at every stage" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which Git command merges branch updates from a remote server into your local working branch?',
          options: [
            "A. git push",
            "B. git commit",
            "C. git pull",
            "D. git status",
          ],
          correctAnswer: "C. git pull"
        }
      ]
    }
  },
  m14: {
    id: 'm14',
    title: 'MODULE 14: AI IN SOFTWARE TESTING',
    overview: 'Learn modern AI paradigms in software testing: test generation, self-healing locators, and future QA roadmaps.',
    outcomes: [
      'Generate unit tests using LLMs.',
      'Configure self-healing locator strategies.'
    ],
    lessons: [
      EXPANDED_LESSONS['m14-l1'],
      EXPANDED_LESSONS['m14-l2'],
      EXPANDED_LESSONS['m14-l3'],
      EXPANDED_LESSONS['m14-l4'],
      EXPANDED_LESSONS['m14-l5'],
      EXPANDED_LESSONS['m14-l6'],
    ],
    quiz: [
      { id: 1, question: 'What is the primary benefit of self-healing locators in test automation?', options: ["A. Faster execution, because locators are cached between test runs", "B. Complete removal of locators", "C. Rewriting failing assertions so the test run passes", "D. Automatically updating selectors when DOM elements change, reducing maintenance"], correctAnswer: "D. Automatically updating selectors when DOM elements change, reducing maintenance" },
      { id: 2, question: 'How does AI visual regression testing differ from standard HTML assertions?', options: ["A. It compares screenshots using machine learning to detect visual deviations, regardless of HTML changes", "B. It does not check code", "C. It checks the HTML source for style changes, then renders only the changed elements", "D. It requires compilation"], correctAnswer: "A. It compares screenshots using machine learning to detect visual deviations, regardless of HTML changes" },
      { id: 3, question: "What is a key risk of AI-generated test cases?", options: ["A. They never compile without manual edits", "B. They always slow the pipeline", "C. They cannot be automated", "D. They can miss business context and must be reviewed"], correctAnswer: "D. They can miss business context and must be reviewed" },
      { id: 4, question: "How can AI help with bug analysis?", options: ["A. Clustering similar failures and suggesting likely causes", "B. Fixing all bugs automatically", "C. Removing the need for logs", "D. Replacing bug reports with automatic tickets"], correctAnswer: "A. Clustering similar failures and suggesting likely causes" },
      { id: 5, question: "What remains a human responsibility with AI testing tools?", options: ["A. Clicking every button", "B. Judging whether results are correct and meaningful", "C. Typing every locator", "D. Nothing, since AI tools validate their own output"], correctAnswer: "B. Judging whether results are correct and meaningful" },
      { id: 6, question: "What can make self-healing locators dangerous?", options: ["A. They run too fast", "B. They require no DOM", "C. Silently binding to the wrong element", "D. They only work offline"], correctAnswer: "C. Silently binding to the wrong element" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which tool specializes in AI-powered visual regression testing by comparing screenshots of user interfaces?',
          options: [
            'A. Selenium Grid',
            'B. Applitools Eyes',
            'C. Apache JMeter',
            'D. Postman CLI'
          ],
          correctAnswer: 'B. Applitools Eyes'
        }
      ]
    }
  },
  m15: {
    id: 'm15',
    title: 'MODULE 15: CAPSTONE PROJECTS',
    overview: 'Apply all manual and automation learnings to build realistic testing suites.',
    outcomes: [
      'Construct a production-grade testing suite.',
      'Generate professional test closures and reports.'
    ],
    lessons: [
      EXPANDED_LESSONS['m15-p1'],
      EXPANDED_LESSONS['m15-p2'],
      EXPANDED_LESSONS['m15-p3'],
      EXPANDED_LESSONS['m15-p4'],
      EXPANDED_LESSONS['m15-p5'],
      EXPANDED_LESSONS['m15-p6'],
      EXPANDED_LESSONS['m15-final'],
    ],
    quiz: [
      { id: 1, question: "For an e-commerce site, which flow should be tested first?", options: ["A. The About Us page", "B. Checkout and payment", "C. Footer links", "D. Blog comments"], correctAnswer: "B. Checkout and payment" },
      { id: 2, question: "What is essential when testing a banking transfer?", options: ["A. The page colour scheme", "B. Animation smoothness", "C. Balances stay consistent even when a step fails", "D. The page loads within one second on mobile"], correctAnswer: "C. Balances stay consistent even when a step fails" },
      { id: 3, question: "An API testing suite should verify...", options: ["A. Only that the server responds", "B. Only response time", "C. Only the happy path", "D. Status codes, response schema and error handling"], correctAnswer: "D. Status codes, response schema and error handling" },
      { id: 4, question: "A maintainable Selenium framework for the capstone should use...", options: ["A. Page Object Model with data-driven tests", "B. Hard-coded XPaths in each test", "C. Thread.sleep for every wait", "D. One giant test method"], correctAnswer: "A. Page Object Model with data-driven tests" },
      { id: 5, question: "What should a capstone test summary report include?", options: ["A. Only the number of passed tests", "B. Coverage, defects found, and open risks", "C. Screenshots of every page", "D. The developers' names"], correctAnswer: "B. Coverage, defects found, and open risks" },
      { id: 6, question: "Why include negative test cases in a capstone project?", options: ["A. They increase the pass rate", "B. They are faster to write than positive cases", "C. They prove the system handles invalid input safely", "D. They replace positive tests"], correctAnswer: "C. They prove the system handles invalid input safely" },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What is the main goal of a hybrid automation framework constructed in Project 6?',
          options: [
            "A. To run tests without using any browsers.",
            "B. To run the same test in every browser at once without any page objects or data files.",
            "C. To combine POM, Data-Driven testing, custom logging, and visual HTML reporting into an extensible, reusable test engine.",
            "D. To eliminate coding requirements entirely.",
          ],
          correctAnswer: "C. To combine POM, Data-Driven testing, custom logging, and visual HTML reporting into an extensible, reusable test engine."
        }
      ]
    }
  },
  overview: {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    overview: 'Get introduced to the Software Testing course, learning outcomes, career roadmaps, and resources.',
    outcomes: ['Understand the course roadmap', 'Identify career options in QA'],
    lessons: [
      EXPANDED_LESSONS['overview-welcome'],
      EXPANDED_LESSONS['overview-intro'],
      EXPANDED_LESSONS['overview-outcomes'],
      EXPANDED_LESSONS['overview-roadmap'],
      EXPANDED_LESSONS['overview-career'],
      EXPANDED_LESSONS['overview-prereq'],
      EXPANDED_LESSONS['overview-resources'],
    ],
    quiz: [],
    assignment: { prompts: [] }
  },
  interview: {
    id: 'interview',
    title: 'INTERVIEW PREPARATION',
    overview: 'Master manual, automation, API, and SQL interview questionnaires.',
    outcomes: ['Succeed in QA technical interviews'],
    lessons: [
      EXPANDED_LESSONS['interview-manual'],
      EXPANDED_LESSONS['interview-selenium'],
      EXPANDED_LESSONS['interview-api'],
      EXPANDED_LESSONS['interview-sql'],
      EXPANDED_LESSONS['interview-agile'],
      EXPANDED_LESSONS['interview-framework'],
      EXPANDED_LESSONS['interview-hr'],
      EXPANDED_LESSONS['interview-resume'],
      EXPANDED_LESSONS['interview-mock'],
      EXPANDED_LESSONS['interview-coding'],
    ],
    quiz: [],
    assignment: { prompts: [] }
  },
  assessment: {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    overview: 'Evaluate manual testing, API validation, and Selenium script architectures.',
    outcomes: ['Complete the final QA engineer certification requirements'],
    lessons: [
      {
        id: 'assessment-theory',
        title: 'Theory Test',
        objectives: ['Assess QA core fundamentals.'],
        theory: 'A comprehensive theory exam testing SDLC/STLC phases, defect priorities, SQL joins, and selenium commands.',
        takeaways: ['Ensure all answers are fully submitted.']
      },
      {
        id: 'assessment-manual',
        title: 'Manual Testing Assessment',
        objectives: ['Evaluate test design capabilities.'],
        theory: 'Write detailed functional test scenarios and boundary case designs for a mock application.',
        takeaways: ['Focus on edge cases and structured step formulations.']
      },
      {
        id: 'assessment-api',
        title: 'API Testing Assessment',
        objectives: ['Verify REST API suites.'],
        theory: 'Build and export a Postman collection validating authentication, query parameters, and response formats.',
        takeaways: ['Include assertions for negative flows (4xx errors).']
      },
      {
        id: 'assessment-automation',
        title: 'Automation Assessment',
        objectives: ['Verify Selenium skills.'],
        theory: 'Write browser automation scripts in Java/TestNG utilizing POM and explicit waits.',
        takeaways: ['Avoid brittle absolute xpaths.']
      },
      {
        id: 'assessment-capstone',
        title: 'Capstone Project Evaluation',
        objectives: ['Review project submissions.'],
        theory: 'Submit your complete repository link containing manual cases, Postman collections, and Selenium framework builds.',
        takeaways: ['Provide a detailed README.md file in your repository.']
      },
      {
        id: 'assessment-viva',
        title: 'Viva / Mock Interview',
        objectives: ['Conduct verbal evaluations.'],
        theory: 'Verbal review session with course mentors covering framework designs and test methodologies.',
        takeaways: ['Communicate your technical thoughts clearly and structured.']
      }
    ],
    quiz: [],
    assignment: { prompts: [] }
  },
  certification: {
    id: 'certification',
    title: 'CERTIFICATION',
    overview: 'Obtain credentials verifying manual QA, API validation, and Selenium Automation skills.',
    outcomes: ['Download industry-recognized quality certificates'],
    lessons: [
      {
        id: 'cert-manual',
        title: 'Manual Testing Certificate',
        objectives: ['Unlock manual testing credential.'],
        theory: 'Credential verifying mastery of test design methods, bug tracking lifecycles, and STLC phases.',
        takeaways: ['Share your achievements on LinkedIn.']
      },
      {
        id: 'cert-api',
        title: 'API Testing Certificate',
        objectives: ['Unlock API validation credential.'],
        theory: 'Credential verifying expertise in Postman, REST validations, status codes, and API assertions.',
        takeaways: ['Add API testing skills to your online resumes.']
      },
      {
        id: 'cert-selenium',
        title: 'Selenium Automation Certificate',
        objectives: ['Unlock web automation credential.'],
        theory: 'Credential verifying proficiency in WebDriver commands, Wait conditions, locators, and POM frameworks.',
        takeaways: ['Showcase your web automation credentials to hiring teams.']
      },
      {
        id: 'cert-professional',
        title: 'Software Testing Professional Certificate',
        objectives: ['Unlock program certification.'],
        theory: 'Full specialization certificate awarded upon successful completion of all core course modules.',
        takeaways: ['Marks completion of the entire Software QA study track.']
      },
      {
        id: 'cert-qa',
        title: 'QA Engineer Certification',
        objectives: ['Unlock final SDET credential.'],
        theory: 'Advanced credential representing readiness for SDET and automated QA engineering roles.',
        takeaways: ['You are now fully prepared to enter the technical software testing market!']
      }
    ],
    quiz: [],
    assignment: { prompts: [] }
  }
};

