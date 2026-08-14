import { QuizQuestion } from '../../../../types';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
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
    prompts: any[];
  };
}

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
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Welcome to Software Testing',
        objectives: ['Understand course structure and goals.'],
        theory: 'Welcome to Software Testing Mastery! Software testing ensures applications are reliable, secure, and deliver premium UX. This course will cover manual and automation frameworks.',
        takeaways: ['Quality is a continuous process, not a final phase.']
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 What is Software Testing?',
        objectives: ['Define software testing terminology.'],
        theory: 'Software testing is the process of executing a program with the intent of finding errors and verifying that it matches expected behavior.',
        takeaways: ['Testing verifies correctness, completeness, and quality.']
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 Why Software Testing is Important',
        objectives: ['Analyze historical software bugs and impact.'],
        theory: 'Software errors can cost millions of dollars, damage brand reputations, and even cause loss of life in critical systems.',
        takeaways: ['Early testing dramatically reduces overall project costs.']
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 Software Development Life Cycle (SDLC)',
        objectives: ['Trace requirements from design to deployment.'],
        theory: 'SDLC includes Requirements, Design, Implementation, Testing, Deployment, and Maintenance.',
        takeaways: ['Testing is a core phase in all development models.']
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 Software Testing Life Cycle (STLC)',
        objectives: ['Outline STLC phases.'],
        theory: 'STLC consists of Requirements Analysis, Test Planning, Test Case Development, Environment Setup, Test Execution, and Test Closure.',
        takeaways: ['Each STLC phase has distinct entry and exit criteria.']
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 Roles and Responsibilities of a QA Engineer',
        objectives: ['Understand QA roles.'],
        theory: 'QA engineers design test cases, execute tests, report bugs, verify fixes, and collaborate with developers to maintain quality standards.',
        takeaways: ['QA is responsible for quality processes, not just testing.']
      },
      {
        id: 'm1-l7',
        title: 'Lesson 1.7 Types of Software Testing',
        objectives: ['Distinguish functional and non-functional tests.'],
        theory: 'Testing is broadly divided into functional (e.g. sanity, regression, integration) and non-functional (e.g. load, security, usability) testing.',
        takeaways: ['A balanced test suite covers both functional and non-functional aspects.']
      },
      {
        id: 'm1-l8',
        title: 'Lesson 1.8 Career Roadmap for QA Engineers',
        objectives: ['Plan career progression.'],
        theory: 'QA professionals can progress from Manual QA to Automation Engineer, QA Lead, QA Manager, or specialize in Performance and Security.',
        takeaways: ['Automation and technical skills accelerate career growth.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which phase of STLC involves identifying testing scope and resources?', options: ['A. Test Case Development', 'B. Test Planning', 'C. Test Closure', 'D. Environment Setup'], correctAnswer: 'B. Test Planning' },
      { id: 2, question: 'What is the primary goal of software testing?', options: ['A. To prove the program has zero bugs', 'B. To find defects and verify expected behavior', 'C. To write code', 'D. To design user interfaces'], correctAnswer: 'B. To find defects and verify expected behavior' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which of the following describes the correct order of STLC phases?',
          options: [
            'A. Test Planning -> Requirements Analysis -> Test Execution -> Test Case Development',
            'B. Requirements Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure',
            'C. Test Execution -> Test Case Development -> Test Planning -> Test Closure',
            'D. Environment Setup -> Test Execution -> Requirements Analysis -> Test Planning'
          ],
          correctAnswer: 'B. Requirements Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure'
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
      {
        id: 'm2-l1',
        title: 'Lesson 2.1 Testing Principles',
        objectives: ['Master the 7 software testing principles.'],
        theory: 'The 7 principles are: 1. Testing shows presence of defects, 2. Exhaustive testing is impossible, 3. Early testing, 4. Defect clustering, 5. Pesticide paradox, 6. Testing is context dependent, 7. Absence-of-errors fallacy.',
        takeaways: ['Understand that testing can never prove a system is entirely bug-free.']
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2 Test Levels',
        objectives: ['Distinguish Unit, Integration, System, and Acceptance testing.'],
        theory: 'Test levels define the target of testing: Unit (individual units/functions), Integration (combined units), System (complete integrated application), and Acceptance (user verification).',
        takeaways: ['Each test level targets a different scope and objective.']
      },
      {
        id: 'm2-l3',
        title: 'Lesson 2.3 Functional Testing',
        objectives: ['Design functional test flows.'],
        theory: 'Functional testing evaluates system behaviors against functional specifications. Examples include smoke testing, sanity testing, and regression testing.',
        takeaways: ['Functional tests verify what the system does.']
      },
      {
        id: 'm2-l4',
        title: 'Lesson 2.4 Non-Functional Testing',
        objectives: ['Identify non-functional requirements.'],
        theory: 'Non-functional testing evaluates aspects like performance, load, security, reliability, scalability, and usability.',
        takeaways: ['Non-functional testing verifies how the system performs.']
      },
      {
        id: 'm2-l5',
        title: 'Lesson 2.5 Black Box Testing',
        objectives: ['Implement black box testing techniques.'],
        theory: 'Black box testing examines system behavior without knowing its internal code structure or implementation details.',
        takeaways: ['Focuses on input parameters and expected output values.']
      },
      {
        id: 'm2-l6',
        title: 'Lesson 2.6 White Box Testing',
        objectives: ['Explain code coverage metrics.'],
        theory: 'White box testing verifies internal paths, logic, loops, statements, and code flows. It requires complete visibility into the source code.',
        takeaways: ['Commonly performed by developers during unit testing.']
      },
      {
        id: 'm2-l7',
        title: 'Lesson 2.7 Grey Box Testing',
        objectives: ['Combine black and white box techniques.'],
        theory: 'Grey box testing combines black box user-level testing with limited knowledge of database structures or API endpoints.',
        takeaways: ['Great for web services, integration testing, and database-driven apps.']
      },
      {
        id: 'm2-l8',
        title: 'Lesson 2.8 Verification vs Validation',
        objectives: ['Distinguish verification from validation.'],
        theory: 'Verification asks: "Are we building the product right?" (reviews, walkthroughs). Validation asks: "Are we building the right product?" (executing code).',
        takeaways: ['Verification focuses on documentation/design; validation focuses on code execution.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which principle states that testing is context dependent?', options: ['A. Pesticide Paradox', 'B. Testing is context dependent', 'C. Exhaustive testing is impossible', 'D. Defect clustering'], correctAnswer: 'B. Testing is context dependent' },
      { id: 2, question: 'Which test level is closest to the business user?', options: ['A. Unit Testing', 'B. Integration Testing', 'C. Acceptance Testing', 'D. System Testing'], correctAnswer: 'C. Acceptance Testing' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What is the main difference between Verification and Validation?',
          options: [
            'A. Verification involves executing the software; Validation does not.',
            'B. Verification evaluates static documents (reviews/walkthroughs); Validation executes the active code to verify system behavior.',
            'C. Verification is done by users; Validation is done by developers.',
            'D. There is no difference; they are synonyms.'
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
      {
        id: 'm3-l1',
        title: 'Lesson 3.1 What is a Test Case?',
        objectives: ['Identify key components of a test case.'],
        theory: 'A test case is a set of conditions, steps, inputs, and expected results designed to verify a specific software feature.',
        takeaways: ['A good test case is atomic, reusable, and clear.']
      },
      {
        id: 'm3-l2',
        title: 'Lesson 3.2 Test Scenario vs Test Case',
        objectives: ['Derive test cases from test scenarios.'],
        theory: 'A test scenario is a high-level functionality to test (e.g. Verify payment gateway). A test case is a specific verification path (e.g. Verify payment with expired visa).',
        takeaways: ['One test scenario can map to multiple test cases.']
      },
      {
        id: 'm3-l3',
        title: 'Lesson 3.3 Test Plan',
        objectives: ['Understand components of a Test Plan.'],
        theory: 'A Test Plan describes test scope, resources, schedule, features to test, and risk mitigation strategies.',
        takeaways: ['A Test Plan is a dynamic document updated as requirements change.']
      },
      {
        id: 'm3-l4',
        title: 'Lesson 3.4 Test Strategy',
        objectives: ['Differentiate Test Plan from Test Strategy.'],
        theory: 'A Test Strategy is a high-level, static organizational policy document defining testing approaches and tools across the organization.',
        takeaways: ['Test Strategy is generally defined at the program or company level.']
      },
      {
        id: 'm3-l5',
        title: 'Lesson 3.5 Test Data Preparation',
        objectives: ['Generate test data sets.'],
        theory: 'Test data preparation involves creating valid, invalid, boundary, and database inputs required to execute test cases.',
        takeaways: ['Realistic test data is essential for effective integration testing.']
      },
      {
        id: 'm3-l6',
        title: 'Lesson 3.6 Boundary Value Analysis',
        objectives: ['Apply BVA limits.'],
        theory: 'BVA tests values at boundaries (min, min-1, min+1, max, max-1, max+1). If range is 1-100, boundaries are 0, 1, 2, 99, 100, 101.',
        takeaways: ['Defects frequently cluster at boundaries.']
      },
      {
        id: 'm3-l7',
        title: 'Lesson 3.7 Equivalence Partitioning',
        objectives: ['Partition input domains.'],
        theory: 'EP divides input data into equivalence classes where all members are expected to behave the same way. If age range is 18-60, partitions are: invalid (<18), valid (18-60), invalid (>60).',
        takeaways: ['EP reduces the number of test cases required while maintaining high coverage.']
      },
      {
        id: 'm3-l8',
        title: 'Lesson 3.8 Decision Table Testing',
        objectives: ['Construct decision tables for complex logic.'],
        theory: 'Decision tables map boolean combinations of input conditions to expected system actions.',
        takeaways: ['Excellent for testing complex business rules.']
      },
      {
        id: 'm3-l9',
        title: 'Lesson 3.9 State Transition Testing',
        objectives: ['Design tests for state-dependent systems.'],
        theory: 'State transition testing verifies behavior changes as system state transitions (e.g. ATM state transitions from Idle to Card Inserted to Authenticated).',
        takeaways: ['Perfect for sequence-dependent transactional workflows.']
      },
      {
        id: 'm3-l10',
        title: 'Lesson 3.10 Error Guessing',
        objectives: ['Leverage heuristic test design.'],
        theory: 'Error guessing relies on tester experience to anticipate likely coding slip-ups (e.g. division by zero, empty inputs, null fields).',
        takeaways: ['Complements structured design techniques.']
      }
    ],
    quiz: [
      { id: 1, question: 'If a text field accepts a password between 6 and 12 characters, what are the boundaries to test using BVA?', options: ['A. 5, 6, 7, 11, 12, 13', 'B. 6, 12', 'C. 1, 5, 10, 15', 'D. 0, 6, 12, 20'], correctAnswer: 'A. 5, 6, 7, 11, 12, 13' },
      { id: 2, question: 'What is a Test Strategy?', options: ['A. A temporary task list', 'B. A high-level, static project or organizational policy document defining testing approaches', 'C. A list of code bugs', 'D. A database schema definition'], correctAnswer: 'B. A high-level, static project or organizational policy document defining testing approaches' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'You are testing an input field that accepts an integer between 10 and 50 (inclusive). Which set of values represents the boundary cases according to Boundary Value Analysis (BVA)?',
          options: [
            'A. 10, 30, 50',
            'B. 9, 10, 11, 49, 50, 51',
            'C. 0, 10, 50, 100',
            'D. 8, 9, 51, 52'
          ],
          correctAnswer: 'B. 9, 10, 11, 49, 50, 51'
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
      {
        id: 'm4-l1',
        title: 'Lesson 4.1 What is a Bug?',
        objectives: ['Define defect, bug, failure, and error.'],
        theory: 'An error is a human mistake. A defect/bug is a flaw in code. A failure is the visible manifestation of a defect during execution.',
        takeaways: ['Errors lead to defects, which lead to failures during execution.']
      },
      {
        id: 'm4-l2',
        title: 'Lesson 4.2 Bug Life Cycle',
        objectives: ['Trace bug states from New to Closed.'],
        theory: 'Bug lifecycle states: New -> Assigned -> Open -> Fixed -> Pending Retest -> Verified -> Closed (or Reopened).',
        takeaways: ['A bug must be retested in the target environment before being closed.']
      },
      {
        id: 'm4-l3',
        title: 'Lesson 4.3 Severity vs Priority',
        objectives: ['Classify defects by impact and urgency.'],
        theory: 'Severity is the technical impact (e.g. system crashes - High Severity). Priority is the business urgency to fix (e.g. misspelled logo - High Priority, Low Severity).',
        takeaways: ['Developers resolve defects based on priority, not just severity.']
      },
      {
        id: 'm4-l4',
        title: 'Lesson 4.4 Writing Bug Reports',
        objectives: ['Draft professional bug reports.'],
        theory: 'A bug report must contain: Title, Description, Steps to Reproduce, Expected vs Actual Behavior, Environment, Severity, Priority, and Screenshots/Logs.',
        takeaways: ['Good reproduction steps prevent back-and-forth between QA and Dev.']
      },
      {
        id: 'm4-l5',
        title: 'Lesson 4.5 Defect Tracking Tools',
        objectives: ['Introduction to tracking suites.'],
        theory: 'Tools like Jira, Bugzilla, and Redmine track defects, manage scrum boards, and maintain trace matrices.',
        takeaways: ['Jira is the industry standard for agile bug tracking.']
      },
      {
        id: 'm4-l6',
        title: 'Lesson 4.6 Bug Reporting Best Practices',
        objectives: ['Apply clean reporting habits.'],
        theory: 'Always verify duplicates before logging, isolate variables to find the root cause, and keep tone professional and objective.',
        takeaways: ['Clear evidence (logs, video recordings) speeds up resolution.']
      }
    ],
    quiz: [
      { id: 1, question: 'What is the state of a bug when it is rejected by developers as not being a defect?', options: ['A. Deferred', 'B. Invalid/Rejected', 'C. Closed', 'D. Fixed'], correctAnswer: 'B. Invalid/Rejected' },
      { id: 2, question: 'Misspelled company logo on the homepage has which classification?', options: ['A. Low Severity, Low Priority', 'B. Low Severity, High Priority', 'C. High Severity, Low Priority', 'D. High Severity, High Priority'], correctAnswer: 'B. Low Severity, High Priority' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which state in the Bug Life Cycle indicates that the tester is confirming if a fixed defect has actually been resolved?',
          options: [
            'A. Deferred',
            'B. Reopened',
            'C. Retesting (or Pending Retest)',
            'D. New'
          ],
          correctAnswer: 'C. Retesting (or Pending Retest)'
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
      {
        id: 'm5-l1',
        title: 'Lesson 5.1 Introduction to Agile',
        objectives: ['Master Agile values.'],
        theory: 'Agile is an iterative software development methodology emphasizing customer collaboration, responding to change, and self-organizing cross-functional teams.',
        takeaways: ['Agile values working software over comprehensive documentation.']
      },
      {
        id: 'm5-l2',
        title: 'Lesson 5.2 Scrum Framework',
        objectives: ['Explain Scrum roles.'],
        theory: 'Scrum contains three main roles: Product Owner (PO), Scrum Master (SM), and the Development/QA Team.',
        takeaways: ['Scrum team is self-contained and cross-functional.']
      },
      {
        id: 'm5-l3',
        title: 'Lesson 5.3 Sprint Planning',
        objectives: ['Estimate user stories.'],
        theory: 'Sprint planning defines what backlog items will be built in the next sprint (usually 2 weeks) and creates a Sprint Backlog.',
        takeaways: ['QA inputs are critical for sizing and scope definitions.']
      },
      {
        id: 'm5-l4',
        title: 'Lesson 5.4 Daily Stand-up',
        objectives: ['Provide QA updates.'],
        theory: 'A daily 15-minute sync answering: What did I do yesterday? What will I do today? Are there any blockers?',
        takeaways: ['Stand-ups keep the team aligned on sprint goals.']
      },
      {
        id: 'm5-l5',
        title: 'Lesson 5.5 Sprint Review',
        objectives: ['Participate in demos.'],
        theory: 'The sprint review demonstrates working software to stakeholders to collect feedback.',
        takeaways: ['Only complete, tested items meeting Definition of Done are demoed.']
      },
      {
        id: 'm5-l6',
        title: 'Lesson 5.6 Sprint Retrospective',
        objectives: ['Identify continuous improvements.'],
        theory: 'The retro evaluates what went well, what failed, and lists actions for improvement.',
        takeaways: ['Retrospectives focus on team improvements, not finger-pointing.']
      },
      {
        id: 'm5-l7',
        title: 'Lesson 5.7 QA in Agile Teams',
        objectives: ['Understand continuous quality.'],
        theory: 'Agile QA tests continuously throughout the sprint rather than waiting for the end of development.',
        takeaways: ['Prevents bottle-necks at the end of sprints.']
      }
    ],
    quiz: [
      { id: 1, question: 'Who owns the product backlog prioritization in Scrum?', options: ['A. Scrum Master', 'B. QA Lead', 'C. Product Owner', 'D. Tech Lead'], correctAnswer: 'C. Product Owner' },
      { id: 2, question: 'What is the duration of a standard daily stand-up meeting?', options: ['A. 1 hour', 'B. 15 minutes', 'C. 30 minutes', 'D. 5 minutes'], correctAnswer: 'B. 15 minutes' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What ceremony is held at the end of a sprint to reflect on the process and identify improvements?',
          options: [
            'A. Sprint Review',
            'B. Sprint Retrospective',
            'C. Sprint Planning',
            'D. Daily Stand-up'
          ],
          correctAnswer: 'B. Sprint Retrospective'
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
      {
        id: 'm6-l1',
        title: 'Lesson 6.1 What is an API?',
        objectives: ['Define API concepts.'],
        theory: 'Application Programming Interface (API) is a software intermediary that allows two applications to communicate with each other.',
        takeaways: ['APIs decouple backend services from client applications.']
      },
      {
        id: 'm6-l2',
        title: 'Lesson 6.2 REST APIs',
        objectives: ['Explain REST architectural style.'],
        theory: 'REST (Representational State Transfer) relies on stateless client-server communication using HTTP resources.',
        takeaways: ['REST endpoints represent system resources.']
      },
      {
        id: 'm6-l3',
        title: 'Lesson 6.3 HTTP Methods',
        objectives: ['Map CRUD operations to HTTP methods.'],
        theory: 'GET (Retrieve), POST (Create), PUT (Update full), PATCH (Update partial), DELETE (Remove).',
        takeaways: ['Methods should match their designated semantic actions.']
      },
      {
        id: 'm6-l4',
        title: 'Lesson 6.4 Status Codes',
        objectives: ['Categorize status codes.'],
        theory: '1xx (Info), 2xx (Success, e.g. 200 OK, 201 Created), 3xx (Redirect), 4xx (Client Error, e.g. 400 Bad Request, 401 Unauth, 404 Not Found), 5xx (Server Error, e.g. 500 Internal).',
        takeaways: ['Proper HTTP status codes are essential for API integration.']
      },
      {
        id: 'm6-l5',
        title: 'Lesson 6.5 JSON Basics',
        objectives: ['Parse JSON objects.'],
        theory: 'JavaScript Object Notation (JSON) is a lightweight data-interchange format composed of key-value pairs and arrays.',
        takeaways: ['JSON is the standard payload format for REST services.']
      },
      {
        id: 'm6-l6',
        title: 'Lesson 6.6 API Testing using Postman',
        objectives: ['Send REST requests.'],
        theory: 'Postman is a popular GUI client to execute API calls, set request headers, and inspect response bodies.',
        takeaways: ['Postman allows rapid manual and automated API checking.']
      },
      {
        id: 'm6-l7',
        title: 'Lesson 6.7 Environment Variables',
        objectives: ['Differentiate local, dev, and prod environments.'],
        theory: 'Environment variables prevent hardcoding credentials and hostnames (e.g. {{baseUrl}}).',
        takeaways: ['Allows executing the same test suite across staging and production.']
      },
      {
        id: 'm6-l8',
        title: 'Lesson 6.8 API Collections',
        objectives: ['Group endpoints.'],
        theory: 'Collections group related API endpoints for modular execution and automated regression testing.',
        takeaways: ['Collections help organize complex multi-stage business workflows.']
      },
      {
        id: 'm6-l9',
        title: 'Lesson 6.9 API Automation Basics',
        objectives: ['Write Postman JS assertions.'],
        syntax: `pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("JSON field check", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.eql(123);
});`,
        theory: 'Postman contains a JS execution sandbox to assert status codes, response headers, and fields after each request.',
        takeaways: ['Assertions are executed automatically after receiving the response.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which HTTP method should be used to create a new resource?', options: ['A. GET', 'B. POST', 'C. PUT', 'D. DELETE'], correctAnswer: 'B. POST' },
      { id: 2, question: 'What does a 401 status code signify?', options: ['A. Internal Server Error', 'B. Unauthorized (Authentication failed)', 'C. Page Not Found', 'D. Success'], correctAnswer: 'B. Unauthorized (Authentication failed)' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which Postman JavaScript assertion correctly verifies that the response status code is 201 Created?',
          options: [
            'A. pm.status(201);',
            'B. pm.test("Status is 201", () => { pm.response.to.have.status(201); });',
            'C. assert.equal(response.code, 201);',
            'D. verify.status = 201;'
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
      {
        id: 'm7-l1',
        title: 'Lesson 7.1 Introduction to Databases',
        objectives: ['Explain relational database models.'],
        theory: 'A database (DB) is an organized collection of structured data. Relational databases use tables, columns, rows, and relationships.',
        takeaways: ['Relational systems enforce schemas and relationships using keys.']
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2 SQL Basics',
        objectives: ['Understand Structured Query Language.'],
        theory: 'SQL is the standard language to query and modify relational databases.',
        takeaways: ['SQL queries are essential to verify backend updates.']
      },
      {
        id: 'm7-l3',
        title: 'Lesson 7.3 SELECT Queries',
        objectives: ['Query tables with filters.'],
        syntax: `SELECT first_name, last_name 
FROM employees 
WHERE department = 'QA' 
ORDER BY hire_date DESC;`,
        theory: 'SELECT queries retrieve rows. Filters are applied with the WHERE clause.',
        takeaways: ['ORDER BY and LIMIT clauses help organize retrieved records.']
      },
      {
        id: 'm7-l4',
        title: 'Lesson 7.4 INSERT, UPDATE & DELETE',
        objectives: ['Modify database records.'],
        syntax: `INSERT INTO users (id, email) VALUES (1, 'qa@test.com');
UPDATE users SET active = true WHERE id = 1;
DELETE FROM users WHERE id = 1;`,
        theory: 'INSERT adds records, UPDATE modifies existing records, and DELETE removes rows.',
        takeaways: ['Always verify updates with SELECT queries immediately after modification.']
      },
      {
        id: 'm7-l5',
        title: 'Lesson 7.5 JOIN Operations',
        objectives: ['Combine rows from multiple tables.'],
        syntax: `SELECT orders.id, customers.name 
FROM orders 
INNER JOIN customers ON orders.customer_id = customers.id;`,
        theory: 'JOIN operations combine data from two or more tables using shared keys.',
        takeaways: ['INNER, LEFT, and RIGHT joins satisfy different reporting requirements.']
      },
      {
        id: 'm7-l6',
        title: 'Lesson 7.6 Database Validation',
        objectives: ['Assert DB states.'],
        theory: 'Database validation checks if front-end transactions correctly persist in tables and reflect accurate values.',
        takeaways: ['Verify that no data truncation or schema errors occur during writes.']
      },
      {
        id: 'm7-l7',
        title: 'Lesson 7.7 Data Integrity Testing',
        objectives: ['Enforce integrity rules.'],
        theory: 'Verifies constraints like primary keys (uniqueness), foreign keys (referential integrity), and non-null column rules.',
        takeaways: ['Prevents orphan records and inconsistent states.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which JOIN returns all rows from the left table and matched rows from the right table?', options: ['A. INNER JOIN', 'B. LEFT JOIN', 'C. RIGHT JOIN', 'D. FULL JOIN'], correctAnswer: 'B. LEFT JOIN' },
      { id: 2, question: 'Which command modifies existing records in a table?', options: ['A. SELECT', 'B. INSERT', 'C. UPDATE', 'D. DELETE'], correctAnswer: 'C. UPDATE' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What SQL query should you run to select all employees whose salary is greater than 50000, sorted by their last name?',
          options: [
            'A. SELECT * FROM employees SORT BY last_name WHERE salary > 50000;',
            'B. SELECT * FROM employees WHERE salary > 50000 ORDER BY last_name;',
            'C. SELECT * FROM employees GROUP BY last_name HAVING salary > 50000;',
            'D. GET employees IF salary > 50000;'
          ],
          correctAnswer: 'B. SELECT * FROM employees WHERE salary > 50000 ORDER BY last_name;'
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
      {
        id: 'm8-l1',
        title: 'Lesson 8.1 Introduction to Selenium',
        objectives: ['Understand automation ecosystems.'],
        theory: 'Selenium automates web browsers. It consists of Selenium IDE, WebDriver, and Grid.',
        takeaways: ['WebDriver communicates natively with browser drivers.']
      },
      {
        id: 'm8-l2',
        title: 'Lesson 8.2 Selenium WebDriver',
        objectives: ['Configure drivers.'],
        theory: 'Configuring system paths to locate browser binaries (GeckoDriver, ChromeDriver) allows WebDriver to spawn browser instances.',
        takeaways: ['WebDriver acts as the interface to control browser engines.']
      },
      {
        id: 'm8-l3',
        title: 'Lesson 8.3 Locators',
        objectives: ['Master DOM selections.'],
        syntax: `driver.findElement(By.id("username"));
driver.findElement(By.xpath("//button[@type='submit']"));`,
        theory: 'Locators target DOM elements. Selectors include ID, Name, ClassName, LinkText, CSS Selector, and XPath.',
        takeaways: ['Use unique, static IDs where possible; fall back to CSS selectors or relative XPaths.']
      },
      {
        id: 'm8-l4',
        title: 'Lesson 8.4 Browser Commands',
        objectives: ['Navigate browser histories.'],
        syntax: `driver.get("https://test.com");
driver.navigate().back();
driver.close();`,
        theory: 'Basic navigation commands let testers open URLs, refresh pages, traverse history, and close windows.',
        takeaways: ['close() closes the active window; quit() terminates the driver process entirely.']
      },
      {
        id: 'm8-l5',
        title: 'Lesson 8.5 Handling Forms',
        objectives: ['Input text and click buttons.'],
        syntax: `WebElement email = driver.findElement(By.id("email"));
email.sendKeys("test@qa.com");
email.submit();`,
        theory: 'Automating standard web forms requires locating inputs, typing data, checking boxes, and submitting.',
        takeaways: ['Use clear() before sendKeys() to ensure no pre-filled text remains in input fields.']
      },
      {
        id: 'm8-l6',
        title: 'Lesson 8.6 Waits',
        objectives: ['Understand Implicit, Explicit, and Fluent waits.'],
        syntax: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));`,
        theory: 'Waits prevent race conditions caused by network latency. Implicit waits apply globally. Explicit waits target specific conditions.',
        takeaways: ['Avoid Thread.sleep() as it blocks test execution unconditionally.']
      },
      {
        id: 'm8-l7',
        title: 'Lesson 8.7 Alerts & Windows',
        objectives: ['Handle browser alerts.'],
        syntax: `Alert alert = driver.switchTo().alert();
alert.accept();`,
        theory: 'Interacting with native browser modal dialogs requires switching context to the active Alert.',
        takeaways: ['Alerts must be accepted or dismissed before continuing browser interactions.']
      },
      {
        id: 'm8-l8',
        title: 'Lesson 8.8 Frames & iFrames',
        objectives: ['Switch DOM scopes.'],
        syntax: `driver.switchTo().frame("payment-frame");
// Perform actions inside frame
driver.switchTo().defaultContent();`,
        theory: 'iFrames embed documents inside webpages. WebDriver must switch focus to the frame to access nested elements.',
        takeaways: ['Always return to default content after completing actions in a frame.']
      },
      {
        id: 'm8-l9',
        title: 'Lesson 8.9 Dropdowns',
        objectives: ['Select dropdown values.'],
        syntax: `Select select = new Select(driver.findElement(By.id("country")));
select.selectByVisibleText("Canada");`,
        theory: 'Selenium Select class makes it easy to select options inside HTML dropdowns.',
        takeaways: ['Only works on standard <select> tags.']
      },
      {
        id: 'm8-l10',
        title: 'Lesson 8.10 File Upload & Download',
        objectives: ['Automate file transfers.'],
        syntax: `driver.findElement(By.id("upload")).sendKeys("/absolute/path/file.txt");`,
        theory: 'Files can be uploaded by targeting file inputs directly and writing absolute paths.',
        takeaways: ['Avoid attempting to click the upload button itself, as native os windows block webdriver.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which command closes all open browser windows and terminates the driver session?', options: ['A. close()', 'B. quit()', 'C. terminate()', 'D. exit()'], correctAnswer: 'B. quit()' },
      { id: 2, question: 'Why is Thread.sleep() discouraged in Selenium tests?', options: ['A. It causes test failures', 'B. It blocks execution for a fixed duration, slowing down tests unnecessarily', 'C. It is deprecated', 'D. It does not work in Java'], correctAnswer: 'B. blocks execution for a fixed duration, slowing down tests unnecessarily' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'How do you configure an explicit wait in Selenium WebDriver for an element to become clickable?',
          options: [
            'A. driver.wait(10);',
            'B. WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); wait.until(ExpectedConditions.elementToBeClickable(locator));',
            'C. driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);',
            'D. Thread.sleep(10000);'
          ],
          correctAnswer: 'B. WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); wait.until(ExpectedConditions.elementToBeClickable(locator));'
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
      {
        id: 'm9-l1',
        title: 'Lesson 9.1 TestNG',
        objectives: ['Organize test suites.'],
        syntax: `@Test(priority = 1)
public void loginTest() { ... }`,
        theory: 'TestNG is a testing framework that simplifies grouping, parameterization, and prioritization of tests using annotations.',
        takeaways: ['Provides clean XML configuration files for test suite suites.']
      },
      {
        id: 'm9-l2',
        title: 'Lesson 9.2 JUnit Basics',
        objectives: ['Write unit assertions.'],
        theory: 'JUnit is the standard unit testing framework for Java, widely used in test automation and developer unit testing.',
        takeaways: ['Simple assertions like assertEquals() verify expectations.']
      },
      {
        id: 'm9-l3',
        title: 'Lesson 9.3 Maven',
        objectives: ['Manage project build dependencies.'],
        theory: 'Maven is a build automation tool that resolves imports and libraries declared in pom.xml.',
        takeaways: ['Maven central repository automatically downloads webdriver packages.']
      },
      {
        id: 'm9-l4',
        title: 'Lesson 9.4 Page Object Model (POM)',
        objectives: ['Decouple test scripts from webpage selectors.'],
        theory: 'POM stores page selectors and action methods inside dedicated Page Classes, keeping test scripts clean.',
        takeaways: ['Increases code reusability and simplifies UI change refactoring.']
      },
      {
        id: 'm9-l5',
        title: 'Lesson 9.5 Data-Driven Framework',
        objectives: ['Parameterize test cases.'],
        theory: 'Data-driven frameworks read input sets from Excel spreadsheets or CSV files to execute identical assertions over multiple users.',
        takeaways: ['Decouples test scripts from input values.']
      },
      {
        id: 'm9-l6',
        title: 'Lesson 9.6 Hybrid Framework',
        objectives: ['Combine POM and data-driven patterns.'],
        theory: 'A hybrid framework combines POM structure, data-driven parameterization, logging tools, and report modules.',
        takeaways: ['The industry standard for large enterprise applications.']
      },
      {
        id: 'm9-l7',
        title: 'Lesson 9.7 Logging & Reporting',
        objectives: ['Generate execution reports.'],
        theory: 'Integrating log4j and ExtentReports records detailed execution logs and generates visual HTML dashboards.',
        takeaways: ['Helps developers debug failures rapidly from visual logs.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which file manages dependencies and build lifecycle in a Maven project?', options: ['A. package.json', 'B. pom.xml', 'C. build.gradle', 'D. testng.xml'], correctAnswer: 'B. pom.xml' },
      { id: 2, question: 'What is the primary benefit of the Page Object Model?', options: ['A. Faster execution speed', 'B. Decoupling test code from webpage UI selectors, reducing maintenance costs', 'C. Automatic bug reporting', 'D. Eliminates the need for browser drivers'], correctAnswer: 'B. Decoupling test code from webpage UI selectors, reducing maintenance costs' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What annotation in TestNG is used to supply multiple test data sets to a test method?',
          options: [
            'A. @Parameters',
            'B. @DataProvider',
            'C. @Test(data)',
            'D. @ValueSource'
          ],
          correctAnswer: 'B. @DataProvider'
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
      {
        id: 'm10-l1',
        title: 'Lesson 10.1 Performance Testing Basics',
        objectives: ['Explain latency and throughput.'],
        theory: 'Performance testing evaluates application responsiveness, speed, scalability, stability, and resource usage under load.',
        takeaways: ['Ensures system does not degrade below service level agreements.']
      },
      {
        id: 'm10-l2',
        title: 'Lesson 10.2 Load Testing',
        objectives: ['Validate system behavior under standard loads.'],
        theory: 'Load testing measures system response times under normal and peak expected user levels.',
        takeaways: ['Checks if page loads satisfy limits under ordinary concurrent traffic.']
      },
      {
        id: 'm10-l3',
        title: 'Lesson 10.3 Stress Testing',
        objectives: ['Find system breakdown limits.'],
        theory: 'Stress testing tests system thresholds by applying loads beyond expected peak capacities to observe how the application fails and recovers.',
        takeaways: ['Checks error handling and database resilience at maximum capacities.']
      },
      {
        id: 'm10-l4',
        title: 'Lesson 10.4 Spike Testing',
        objectives: ['Handle sudden traffic spikes.'],
        theory: 'Spike testing evaluates stability during sudden, massive traffic increases (e.g. ticket sales launching).',
        takeaways: ['Verifies if autoscale groups spin up new nodes quickly enough.']
      },
      {
        id: 'm10-l5',
        title: 'Lesson 10.5 Endurance Testing',
        objectives: ['Identify memory leaks.'],
        theory: 'Also called soak testing, it runs expected loads continuously for hours/days to identify slow memory leaks and resource exhaustion.',
        takeaways: ['Critical for verifying garbage collection behaviors.']
      },
      {
        id: 'm10-l6',
        title: 'Lesson 10.6 Apache JMeter',
        objectives: ['Script thread groups.'],
        theory: 'JMeter simulates thousands of concurrent virtual HTTP requests, collecting performance graphs and throughput metrics.',
        takeaways: ['Avoid using heavy GUI mode during actual test execution.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which type of testing evaluates performance over an extended period of time to spot memory leaks?', options: ['A. Load Testing', 'B. Stress Testing', 'C. Endurance (Soak) Testing', 'D. Spike Testing'], correctAnswer: 'C. Endurance (Soak) Testing' },
      { id: 2, question: 'What does latency measure in API performance reports?', options: ['A. Total network bytes transferred', 'B. Time taken for a request to travel from client to server and return the first byte', 'C. CPU usage', 'D. Transactions per second'], correctAnswer: 'B. Time taken for a request to travel from client to server and return the first byte' }
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
      {
        id: 'm11-l1',
        title: 'Lesson 11.1 Mobile Testing Basics',
        objectives: ['Understand mobile platform specifics.'],
        theory: 'Mobile testing covers device fragmentation, screen resolutions, battery consumption, network interrupts (calls, SMS), and app types (native, hybrid, web).',
        takeaways: ['Interrupt testing (e.g. low battery triggers) is vital for mobile apps.']
      },
      {
        id: 'm11-l2',
        title: 'Lesson 11.2 Android Testing',
        objectives: ['Test Android applications.'],
        theory: 'Android testing targets APK packages, using Emulators or real devices connected via Android Debug Bridge (ADB).',
        takeaways: ['ADB command line utility controls and installs apps on targets.']
      },
      {
        id: 'm11-l3',
        title: 'Lesson 11.3 iOS Testing',
        objectives: ['Test iOS applications.'],
        theory: 'iOS testing targets IPA packages. Requires Xcode, Simulator runs on macOS, and test signing configuration.',
        takeaways: ['Simulators mimic iOS interfaces without duplicating hardware behaviors.']
      },
      {
        id: 'm11-l4',
        title: 'Lesson 11.4 Appium Introduction',
        objectives: ['Configure Appium servers.'],
        theory: 'Appium extends Selenium WebDriver protocols to mobile OS actions (clicks, swipes, keyboard input).',
        takeaways: ['Appium works across Android and iOS platforms without code rewrites.']
      },
      {
        id: 'm11-l5',
        title: 'Lesson 11.5 Mobile Automation',
        objectives: ['Write basic swipe and click commands.'],
        syntax: `DesiredCapabilities caps = new DesiredCapabilities();
caps.setCapability("platformName", "Android");
caps.setCapability("deviceName", "emulator-5554");`,
        theory: 'Automation scripts send capabilities to initialize device controllers before targeting elements.',
        takeaways: ['Desired capabilities establish connection profiles between script and device.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which tool connects and manages Android devices from the command line?', options: ['A. Xcode', 'B. ADB (Android Debug Bridge)', 'C. Appium Inspector', 'D. SDK Manager'], correctAnswer: 'B. ADB (Android Debug Bridge)' },
      { id: 2, question: 'What is the main advantage of Appium?', options: ['A. It only works on Windows', 'B. It is cross-platform, letting you use the same API for Android and iOS tests', 'C. It does not require test devices', 'D. It compiles source code'], correctAnswer: 'B. It is cross-platform, letting you use the same API for Android and iOS tests' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What mobile app type is built using standard web technologies (HTML, CSS, JS) but runs inside a native wrapper container on the device?',
          options: [
            'A. Native App',
            'B. Web App',
            'C. Hybrid App',
            'D. Desktop App'
          ],
          correctAnswer: 'C. Hybrid App'
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
      {
        id: 'm12-l1',
        title: 'Lesson 12.1 Security Fundamentals',
        objectives: ['Identify security goals.'],
        theory: 'Security testing verifies integrity, confidentiality, authentication, authorization, availability, and non-repudiation.',
        takeaways: ['Protects critical customer data from malicious actors.']
      },
      {
        id: 'm12-l2',
        title: 'Lesson 12.2 Authentication Testing',
        objectives: ['Test authentication weaknesses.'],
        theory: 'Verifies brute-force protections, credential validation, token expirations, and secure password reset links.',
        takeaways: ['Always enforce strong password validation policies.']
      },
      {
        id: 'm12-l3',
        title: 'Lesson 12.3 Authorization Testing',
        objectives: ['Test access controls.'],
        theory: 'Verifies user role boundaries. Ensures standard users cannot reach admin paths (e.g. Broken Object Level Authorization).',
        takeaways: ['Ensure access keys validate backend permissions, not just frontend visibility.']
      },
      {
        id: 'm12-l4',
        title: 'Lesson 12.4 OWASP Top 10',
        objectives: ['Analyze standard vulnerabilities.'],
        theory: 'OWASP lists critical web risks, including SQL injection, cross-site scripting (XSS), broken authentication, and security misconfigurations.',
        takeaways: ['The standard benchmark for secure application design.']
      },
      {
        id: 'm12-l5',
        title: 'Lesson 12.5 Basic Vulnerability Testing',
        objectives: ['Check input sanitation.'],
        theory: 'Input sanitation prevents malicious payload execution. Example: typing SQL tags into login inputs to bypass checks.',
        takeaways: ['Always parameterize database queries to avoid SQL Injection vulnerabilities.']
      }
    ],
    quiz: [
      { id: 1, question: 'What does OWASP stand for?', options: ['A. Open Web Application Security Project', 'B. Online Web Alert System Protocol', 'C. Open Windows Access Security Plan', 'D. Object Web Architecture Standards Program'], correctAnswer: 'A. Open Web Application Security Project' },
      { id: 2, question: 'Which vulnerability allows attackers to inject malicious SQL scripts into database inputs?', options: ['A. XSS', 'B. SQL Injection', 'C. CSRF', 'D. Broken Authentication'], correctAnswer: 'B. SQL Injection' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which security vulnerability occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing browser script execution?',
          options: [
            'A. SQL Injection',
            'B. Cross-Site Scripting (XSS)',
            'C. Cross-Site Request Forgery (CSRF)',
            'D. Buffer Overflow'
          ],
          correctAnswer: 'B. Cross-Site Scripting (XSS)'
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
      {
        id: 'm13-l1',
        title: 'Lesson 13.1 Introduction to CI/CD',
        objectives: ['Explain build pipeline principles.'],
        theory: 'Continuous Integration compiles and validates commits automatically. Continuous Delivery deploys builds to test environments.',
        takeaways: ['Enables rapid quality checks on code changes.']
      },
      {
        id: 'm13-l2',
        title: 'Lesson 13.2 Git for Testers',
        objectives: ['Use branching workflows.'],
        syntax: `git checkout -b feature/test-suite
git add .
git commit -m "add test cases"
git push origin feature/test-suite`,
        theory: 'Git tracks code history. Branching isolates test development from main source codes.',
        takeaways: ['Pull requests coordinate code review before merges.']
      },
      {
        id: 'm13-l3',
        title: 'Lesson 13.3 Jenkins Basics',
        objectives: ['Build jobs.'],
        theory: 'Jenkins orchestrates build stages, running tests whenever source changes are merged.',
        takeaways: ['Webhooks trigger pipelines automatically upon git pushes.']
      },
      {
        id: 'm13-l4',
        title: 'Lesson 13.4 Running Automated Tests',
        objectives: ['Run automation suites in pipelines.'],
        syntax: `pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}`,
        theory: 'Jenkinsfiles define build lifecycles, invoking Maven test runners inside clean container layers.',
        takeaways: ['Pipeline stages report status and build health.']
      },
      {
        id: 'm13-l5',
        title: 'Lesson 13.5 Test Reports',
        objectives: ['Collect pipeline test outputs.'],
        theory: 'Jenkins plugins capture Surefire and ExtentReports XML outputs to display test failure trends directly in dashboard metrics.',
        takeaways: ['Makes pipeline diagnostics accessible to dev teams.']
      },
      {
        id: 'm13-l6',
        title: 'Lesson 13.6 Continuous Testing',
        objectives: ['Shift-left security and performance checks.'],
        theory: 'Continuous testing executes unit, integration, and security sweeps throughout build cycles.',
        takeaways: ['Reduces production risk by validating builds constantly.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which command creates and switches to a new Git branch?', options: ['A. git branch', 'B. git checkout -b', 'C. git commit', 'D. git merge'], correctAnswer: 'B. git checkout -b' },
      { id: 2, question: 'What is the standard configuration file used to build pipelines in Jenkins?', options: ['A. pom.xml', 'B. Jenkinsfile', 'C. package.json', 'D. testng.xml'], correctAnswer: 'B. Jenkinsfile' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which Git command merges branch updates from a remote server into your local working branch?',
          options: [
            'A. git push',
            'B. git pull',
            'C. git commit',
            'D. git status'
          ],
          correctAnswer: 'B. git pull'
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
      {
        id: 'm14-l1',
        title: 'Lesson 14.1 AI in Testing',
        objectives: ['Identify AI testing trends.'],
        theory: 'Generative AI assists in drafting test cases, analyzing code coverage, and automating regression configurations.',
        takeaways: ['AI increases productivity and speeds up test design.']
      },
      {
        id: 'm14-l2',
        title: 'Lesson 14.2 AI Test Case Generation',
        objectives: ['Use LLMs for test cases.'],
        theory: 'Prompting LLMs with code snippets generates comprehensive boundary and validation tests in seconds.',
        takeaways: ['Speeds up manual test documentation.']
      },
      {
        id: 'm14-l3',
        title: 'Lesson 14.3 AI Bug Analysis',
        objectives: ['Diagnose log errors.'],
        theory: 'AI analyzers inspect stack traces to isolate defects and propose source fixes.',
        takeaways: ['Saves debugging time for developers.']
      },
      {
        id: 'm14-l4',
        title: 'Lesson 14.4 Self-Healing Automation',
        objectives: ['Minimize selector brittleness.'],
        theory: 'Self-healing tools update broken DOM selectors automatically by analyzing alternative element attributes during runtimes.',
        takeaways: ['Reduces manual test maintenance costs when UI changes.']
      },
      {
        id: 'm14-l5',
        title: 'Lesson 14.5 AI Testing Tools',
        objectives: ['Explore AI test suites.'],
        theory: 'Tools like Applitools (visual testing) and Mabl use ML models to audit layouts and behaviors.',
        takeaways: ['Visual regressions are handled natively by visual AI models.']
      },
      {
        id: 'm14-l6',
        title: 'Lesson 14.6 Future of QA',
        objectives: ['Evolve the QA role.'],
        theory: 'The future QA role shifts toward auditing AI models, training test generators, and managing automation orchestrations.',
        takeaways: ['Continuous upskilling in AI tools guarantees career longevity.']
      }
    ],
    quiz: [
      { id: 1, question: 'What is the primary benefit of self-healing locators in test automation?', options: ['A. Faster execution speeds', 'B. Automatically updating selectors when DOM elements change, reducing maintenance', 'C. Complete removal of locators', 'D. Resolving syntax bugs'], correctAnswer: 'B. Automatically updating selectors when DOM elements change, reducing maintenance' },
      { id: 2, question: 'How does AI visual regression testing differ from standard HTML assertions?', options: ['A. It does not check code', 'B. It compares screenshots using machine learning to detect visual deviations, regardless of HTML changes', 'C. It is slower', 'D. It requires compilation'], correctAnswer: 'B. It compares screenshots using machine learning to detect visual deviations, regardless of HTML changes' }
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
      {
        id: 'm15-p1',
        title: 'Project 1: E-Commerce Website Testing',
        objectives: ['Validate cart actions.'],
        theory: 'Includes writing manual test cases and automated scripts for login, search, product selection, checkout, and receipt confirmation.',
        takeaways: ['Focus on edge cases like coupon expirations and validation failures.']
      },
      {
        id: 'm15-p2',
        title: 'Project 2: Banking Application Testing',
        objectives: ['Validate transactions.'],
        theory: 'Includes testing money transfers, balance statements, unauthorized access, and database validation.',
        takeaways: ['Focus on transaction integrity and rollbacks.']
      },
      {
        id: 'm15-p3',
        title: 'Project 3: LMS Website Testing',
        objectives: ['Validate enrollment flows.'],
        theory: 'Includes testing course listings, video players, quizzes, and certificates.',
        takeaways: ['Verify enrollment status updates in real-time.']
      },
      {
        id: 'm15-p4',
        title: 'Project 4: HMS Website Testing',
        objectives: ['Validate patient bookings.'],
        theory: 'Includes appointment bookings, scheduling checks, doctor slots, and data integrity.',
        takeaways: ['Confirm patient records are secure and GDPR compliant.']
      },
      {
        id: 'm15-p5',
        title: 'Project 5: API Testing Suite',
        objectives: ['Validate REST APIs.'],
        theory: 'Includes building a complete Postman collection with chained inputs and assertions.',
        takeaways: ['Enforce correct authorization and status responses.']
      },
      {
        id: 'm15-p6',
        title: 'Project 6: Selenium Automation Framework',
        objectives: ['Build a hybrid framework.'],
        theory: 'Includes building a complete Maven Java project with POM, TestNG, log4j, and HTML reports.',
        takeaways: ['Structure code for parallel executions.']
      },
      {
        id: 'm15-final',
        title: 'Final Industry Capstone Project',
        objectives: ['Build the final portfolio project.'],
        theory: 'Integrates all manual test cases, API suites, and web automation pipelines into a single portfolio project.',
        takeaways: ['Demonstrates complete mastery of software QA.']
      }
    ],
    quiz: [],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'What is the main goal of a hybrid automation framework constructed in Project 6?',
          options: [
            'A. To run tests without using any browsers.',
            'B. To combine POM, Data-Driven testing, custom logging, and visual HTML reporting into an extensible, reusable test engine.',
            'C. To write applications instead of tests.',
            'D. To eliminate coding requirements entirely.'
          ],
          correctAnswer: 'B. To combine POM, Data-Driven testing, custom logging, and visual HTML reporting into an extensible, reusable test engine.'
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
      {
        id: 'overview-welcome',
        title: 'Welcome Message',
        objectives: ['Course introduction.'],
        theory: 'Welcome to Software Testing Mastery. This program is designed to take you from absolute zero to a professional software quality assurance engineer.',
        takeaways: ['Quality is a mindset.']
      },
      {
        id: 'overview-intro',
        title: 'Course Introduction Video',
        objectives: ['Watch syllabus breakdown.'],
        theory: 'Review our complete program video outlining manual testing, API validation, Selenium WebDrivers, and advanced continuous integration workflows.',
        takeaways: ['Watch all modules sequentially for best learning retention.']
      },
      {
        id: 'overview-outcomes',
        title: 'Learning Outcomes',
        objectives: ['Define learning milestones.'],
        theory: 'By the end of this course, you will be able to design comprehensive test suites, write automated web and API regression scripts, run performance tests, and configure Jenkins pipelines.',
        takeaways: ['Focus on building hands-on portfolio capstone projects.']
      },
      {
        id: 'overview-roadmap',
        title: 'Software Testing Roadmap',
        objectives: ['Understand course sequence.'],
        theory: 'Our roadmap is structured as: Manual Testing -> Test Case Design -> Databases/APIs -> Selenium WebDrivers -> Frameworks -> Advanced Performance/Security -> Capstones.',
        takeaways: ['Consolidate manual fundamentals before jumping into automation scripts.']
      },
      {
        id: 'overview-career',
        title: 'Career Opportunities',
        objectives: ['Explore employment markets.'],
        theory: 'Graduates can apply for roles like QA Analyst, Automation Engineer, SDET (Software Development Engineer in Test), and QA Team Lead.',
        takeaways: ['SDET is currently one of the highest-paying technical developer trajectories.']
      },
      {
        id: 'overview-prereq',
        title: 'Prerequisites',
        objectives: ['Verify entry requirements.'],
        theory: 'No prior coding experience is required! We start from basic computer concepts and build up to advanced Java/Selenium programming.',
        takeaways: ['Basic logical thinking and attention to detail are your best assets.']
      },
      {
        id: 'overview-resources',
        title: 'Course Resources',
        objectives: ['Access templates and cheat sheets.'],
        theory: 'Download our standard Bug Report templates, test plan templates, Selenium locators cheat sheets, and SQL query guides under the resources tab.',
        takeaways: ['Use these templates in your capstone exercises.']
      }
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
      {
        id: 'interview-manual',
        title: 'Manual Testing Interview Questions',
        objectives: ['Review core QA questions.'],
        theory: 'Understand common questions: What is regression testing? What is a test matrix? How do you choose between BVA and EP? Explain the bug lifecycle.',
        takeaways: ['Review standard answers before your interviews.']
      },
      {
        id: 'interview-selenium',
        title: 'Selenium Interview Questions',
        objectives: ['Master Selenium WebDriver questions.'],
        theory: 'Review selectors, explicit vs implicit waits, handling windows, driver.close() vs quit(), Page Factory, and stale element exceptions.',
        takeaways: ['Practice coding locator strings on whiteboard exercises.']
      },
      {
        id: 'interview-api',
        title: 'API Testing Interview Questions',
        objectives: ['Master REST API questionnaires.'],
        theory: 'Review HTTP verbs, status codes, header configurations, authentication keys, and Postman assertion scripts.',
        takeaways: ['Be ready to design a basic request pipeline verbally.']
      },
      {
        id: 'interview-sql',
        title: 'SQL Interview Questions',
        objectives: ['Master database questions.'],
        theory: 'Review INNER/LEFT joins, aggregate functions (GROUP BY, HAVING), database keys, and primary vs unique constraints.',
        takeaways: ['Practice writing mock SQL queries on paper.']
      },
      {
        id: 'interview-agile',
        title: 'Agile Interview Questions',
        objectives: ['Explain agile methodologies.'],
        theory: 'Review Scrum ceremonies, role definitions, Definition of Done (DoD), and handling sprint scope increases.',
        takeaways: ['Emphasize collaboration and shift-left quality processes.']
      },
      {
        id: 'interview-framework',
        title: 'Automation Framework Questions',
        objectives: ['Design extensible frameworks.'],
        theory: 'Review POM architectures, data providers, log structures, parallel run grids, and CI pipeline webhooks.',
        takeaways: ['Highlight how you minimize test maintenance overhead.']
      },
      {
        id: 'interview-hr',
        title: 'HR Interview Questions',
        objectives: ['Review behavior questions.'],
        theory: 'Master conflict resolution stories, handling deadline pressure, and explaining why you chose a career in software QA.',
        takeaways: ['Use the STAR method (Situation, Task, Action, Result) for behavioral answers.']
      },
      {
        id: 'interview-resume',
        title: 'Resume Building',
        objectives: ['Construct a premium QA resume.'],
        theory: 'List technical skills prominently. Showcase your Selenium, Postman, and Jenkins projects with Github repository links.',
        takeaways: ['Quantify metrics (e.g. "reduced manual testing time by 40%").']
      },
      {
        id: 'interview-mock',
        title: 'Mock Interviews',
        objectives: ['Simulate interviews.'],
        theory: 'Participate in peer-to-peer mock interviews, screen recordings, and timer-based practice questions.',
        takeaways: ['Familiarity reduces anxiety during actual hiring loops.']
      },
      {
        id: 'interview-coding',
        title: 'Coding & Practical Assessments',
        objectives: ['Solve coding tests.'],
        theory: 'Practice solving simple coding structures in Java/JavaScript (e.g. reverse string, find duplicates, check prime).',
        takeaways: ['Write clean, legible, self-documenting code.']
      }
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

