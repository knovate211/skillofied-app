import type { Lesson } from '../TestingCourseData';

export const modules3And5Lessons: Record<string, Lesson> = {
  // ---------------------------------------------------------------------------
  // MODULE 3: TEST CASE DESIGN
  // ---------------------------------------------------------------------------
  'm3-l1': {
    id: "m3-l1",
    title: "Lesson 3.1 What is a Test Case?",
    objectives: [
      "Explain in simple words what a test case is.",
      "Name the main parts (fields) of a test case.",
      "Write one complete test case for a real feature.",
      "Tell the difference between a weak and a strong test case."
    ],
    theory: "A test case is a set of conditions, steps, inputs, and expected results designed to verify a specific software feature. A good test case is clear, checks one thing, and can be run again by anyone.",
    blocks: [
      { type: "text", value: "A test case is a small, written instruction for checking one feature. It says what you need before you start, what to do, what data to type, and what should happen. If the software does what the test case says, the test passes. If not, the test fails and you may have found a bug." },
      { type: "text", value: "In this module we use one demo app for all examples: ShopEasy. ShopEasy is a small online shop. Users can log in, search for products, add products to a cart, and pay at checkout." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Test case", "A written check for one feature: steps, data, and expected result."],
          ["Precondition", "Something that must be true before you start (for example, the user already has an account)."],
          ["Test step", "One action the tester does, such as 'Click the Login button'."],
          ["Test data", "The values you type or use, such as an email and a password."],
          ["Expected result", "What the software should do if it works correctly."],
          ["Actual result", "What the software really did when you ran the test."],
          ["Status", "The outcome: Pass, Fail, Blocked (cannot run), or Not Run."]
        ]
      },
      { type: "heading", value: "The parts of a test case" },
      {
        type: "table",
        headers: ["Field", "What to write", "Why it matters"],
        rows: [
          ["Test Case ID", "A unique code, e.g. TC-LOGIN-001", "Easy to find and talk about."],
          ["Title", "A short sentence about what is checked", "Anyone understands the goal quickly."],
          ["Requirement / Story", "The requirement it checks, e.g. REQ-01", "Shows which feature is covered."],
          ["Priority", "High, Medium, or Low", "Helps decide what to run first."],
          ["Preconditions", "What must be ready first", "Stops false failures."],
          ["Test data", "The exact values to use", "Everyone uses the same input."],
          ["Steps", "Numbered actions", "The test can be repeated the same way."],
          ["Expected result", "The correct behaviour", "You can decide Pass or Fail."],
          ["Actual result", "Filled in after running", "Records what really happened."],
          ["Status", "Pass / Fail / Blocked / Not Run", "Shows progress."]
        ]
      },
      { type: "heading", value: "A complete test case for ShopEasy" },
      {
        type: "table",
        headers: ["Field", "Value"],
        rows: [
          ["Test Case ID", "TC-LOGIN-001"],
          ["Title", "Verify a registered user can log in with a valid email and password"],
          ["Requirement", "REQ-01 User login"],
          ["Priority", "High"],
          ["Preconditions", "1. User account exists and is active. 2. User is logged out. 3. ShopEasy login page is open in Chrome."],
          ["Test data", "Email: anna@test.com | Password: Shop@1234"],
          ["Steps", "1. Enter the email in the Email field. 2. Enter the password in the Password field. 3. Click 'Log in'."],
          ["Expected result", "User goes to the Home page. The header shows 'Hi, Anna'. No error message is shown."],
          ["Actual result", "(Filled in when the test is run)"],
          ["Status", "Not Run"]
        ]
      },
      { type: "heading", value: "What makes a test case good?" },
      {
        type: "list",
        items: [
          "Atomic: it checks one thing only. One goal, one expected result.",
          "Clear: a new team member can run it without asking questions.",
          "Independent: it does not depend on another test running first.",
          "Reusable: you can run it again in the next release.",
          "Traceable: it links to a requirement or user story."
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Weak test case", tone: "rose", items: ["Title: 'Test login'", "Steps: 'Log in and check it works'", "No test data", "Expected: 'Works fine'"] },
          { title: "Strong test case", tone: "olive", items: ["Title: 'Verify login with valid email and password'", "Numbered, exact steps", "Exact email and password given", "Expected: 'Home page opens and shows Hi, Anna'"] }
        ]
      },
      {
        type: "example",
        title: "Running TC-LOGIN-001",
        value: "Riya runs TC-LOGIN-001 on ShopEasy.\nShe types anna@test.com and Shop@1234 and clicks 'Log in'.\nThe Home page opens, but the header says 'Hi, Guest'.\n\nActual result: Home page opens, header shows 'Hi, Guest'.\nStatus: Fail.\nRiya now raises a bug report and links it to TC-LOGIN-001."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a test case for 'Add one product to the ShopEasy cart'. Fill in every field from the template above.",
          "Write the preconditions. Hint: does the user need to be logged in? Does the product need to be in stock?",
          "Ask a friend to run your test case without talking to you. Could they do it? If not, make the steps clearer."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is the difference between expected result and actual result? (Expected is what should happen; actual is what really happened.)",
          "When do you fill in the Actual result field? (After you run the test.)",
          "What does 'atomic' mean for a test case? (It checks only one thing.)",
          "What status do you use if the test environment is down and you cannot run the test? (Blocked.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A test case is like a cooking recipe. It lists what you need (preconditions and data), the steps to follow, and a picture of how the dish should look (expected result). Anyone who follows the recipe should get the same dish."
    },
    mistakes: [
      "Writing vague steps like 'check the page' instead of exact actions.",
      "Leaving out test data, so each tester uses different values.",
      "Writing a vague expected result such as 'it works'.",
      "Putting many checks in one test case, so you cannot tell what failed.",
      "Forgetting preconditions, which causes failures that are not real bugs."
    ],
    takeaways: [
      "A test case is a written check for one feature.",
      "Main parts: ID, title, preconditions, test data, steps, expected result, actual result, status.",
      "The expected result must be clear enough to decide Pass or Fail.",
      "A good test case is atomic, clear, reusable, and traceable.",
      "Anyone on the team should be able to run your test case the same way."
    ]
  },

  'm3-l2': {
    id: "m3-l2",
    title: "Lesson 3.2 Test Scenario vs Test Case",
    objectives: [
      "Define a test scenario and a test case.",
      "Explain how they are different.",
      "Break one test scenario into several test cases."
    ],
    theory: "A test scenario is a high-level idea of what to test (for example, 'Verify payment'). A test case is a detailed check with steps, data, and expected results (for example, 'Verify payment with an expired card'). One scenario usually leads to many test cases.",
    blocks: [
      { type: "text", value: "Before you write detailed test cases, you first list what to test. Each item on that list is a test scenario. Then, for each scenario, you write test cases that explain how to test it." },
      { type: "text", value: "A scenario answers 'What should we test?'. A test case answers 'How exactly do we test it, and what should happen?'." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Requirement", "A rule about what the software must do, written by the business or product team."],
          ["Test scenario", "A one-line description of a feature or flow to test. No steps."],
          ["Test case", "A detailed check with preconditions, steps, data, and expected result."],
          ["Positive test", "A test with correct input. The feature should work."],
          ["Negative test", "A test with wrong input. The software should show a clear error."],
          ["Traceability", "Linking requirements to scenarios and test cases, so nothing is missed."]
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Test scenario", subtitle: "What to test", tone: "honey", items: ["High level, one line", "No steps or data", "Quick to write", "Good for planning and coverage", "Example: 'Verify product search'"] },
          { title: "Test case", subtitle: "How to test", tone: "olive", items: ["Low level, detailed", "Has steps, data, expected result", "Takes longer to write", "Good for running and repeating tests", "Example: 'Search for shoes shows only shoe products'"] }
        ]
      },
      { type: "heading", value: "Side by side" },
      {
        type: "table",
        headers: ["Aspect", "Test scenario", "Test case"],
        rows: [
          ["Detail level", "Low (one line)", "High (full steps)"],
          ["Answers", "What to test?", "How to test, and what should happen?"],
          ["Number", "Fewer", "Many (several per scenario)"],
          ["Contains test data?", "No", "Yes"],
          ["Main use", "Planning and checking coverage", "Running tests and recording results"]
        ]
      },
      {
        type: "steps",
        title: "From requirement to test cases",
        steps: [
          { label: "Read the requirement", text: "REQ-02: Users can search products by name." },
          { label: "Write the scenario", text: "TS-02: Verify product search." },
          { label: "Think of positive cases", text: "What happens with correct input?" },
          { label: "Think of negative and edge cases", text: "Empty input, no results, special characters, very long text." },
          { label: "Write each test case in full", text: "Add steps, data, and expected results." }
        ]
      },
      {
        type: "example",
        title: "ShopEasy: one scenario, many test cases",
        value: "Scenario TS-02: Verify product search.\n\nTC-SRCH-001 (positive): Search 'shoes' -> only shoe products are listed.\nTC-SRCH-002 (positive): Search 'SHOES' in capitals -> same results as 'shoes'.\nTC-SRCH-003 (negative): Search 'xyz123' -> message 'No products found'.\nTC-SRCH-004 (negative): Click Search with an empty box -> nothing breaks; a hint asks the user to type a word.\nTC-SRCH-005 (edge): Search '<script>' -> text is shown safely; no script runs."
      },
      { type: "heading", value: "A simple traceability table" },
      {
        type: "table",
        headers: ["Requirement", "Scenario", "Test cases"],
        rows: [
          ["REQ-01 Login", "TS-01 Verify user login", "TC-LOGIN-001 to TC-LOGIN-006"],
          ["REQ-02 Search", "TS-02 Verify product search", "TC-SRCH-001 to TC-SRCH-005"],
          ["REQ-03 Cart", "TS-03 Verify add to cart", "TC-CART-001 to TC-CART-004"],
          ["REQ-04 Checkout", "TS-04 Verify payment at checkout", "TC-PAY-001 to TC-PAY-008"]
        ]
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write three test scenarios for the ShopEasy cart.",
          "Pick one scenario, for example 'Verify remove item from cart'.",
          "Write at least four test case titles for it: two positive and two negative or edge cases."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Which one has steps and expected results: a scenario or a test case? (A test case.)",
          "Is 'Verify payment gateway' a scenario or a test case? (A scenario.)",
          "Can one scenario have many test cases? (Yes, usually it does.)",
          "Why is traceability useful? (It shows every requirement is covered by tests.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A test scenario is like a chapter title in a book, such as 'Paying for your order'. The test cases are the pages inside that chapter, each one telling a small, detailed story."
    },
    mistakes: [
      "Writing scenarios with full steps, which makes them too long to plan with.",
      "Writing only one positive test case per scenario and forgetting negative cases.",
      "Writing test cases without first listing scenarios, so whole features get missed.",
      "Not linking test cases back to requirements."
    ],
    takeaways: [
      "A scenario says what to test; a test case says how to test and what should happen.",
      "One scenario usually becomes many test cases.",
      "Cover positive, negative, and edge cases for each scenario.",
      "Scenarios help with planning and coverage; test cases help with running tests.",
      "Traceability links requirements, scenarios, and test cases."
    ]
  },

  'm3-l3': {
    id: "m3-l3",
    title: "Lesson 3.3 Test Plan",
    objectives: [
      "Explain what a test plan is and who uses it.",
      "List the main sections of a test plan.",
      "Write entry and exit criteria for a small release.",
      "Understand why a test plan changes over time."
    ],
    theory: "A test plan is a project document that describes what will be tested, how, by whom, when, and what the risks are. It is a living document and is updated when requirements or dates change.",
    blocks: [
      { type: "text", value: "A test plan is a document for one project or one release. It explains the testing work: what we will test, what we will not test, who will do it, which tools and environments we need, when it will happen, and when we can say testing is finished." },
      { type: "text", value: "The test plan is usually written by a test lead or test manager. Developers, testers, product owners, and managers read it so everyone has the same picture." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Test plan", "A document that describes the testing work for one project or release."],
          ["Scope", "What is included in testing (in scope) and what is not (out of scope)."],
          ["Test environment", "The computers, servers, browsers, and data used for testing."],
          ["Entry criteria", "Conditions that must be true before testing can start."],
          ["Exit criteria", "Conditions that must be true before testing can stop."],
          ["Risk", "Something that might go wrong and harm the project."],
          ["Deliverable", "A document or result the test team must hand over, such as a test report."]
        ]
      },
      { type: "heading", value: "Main sections of a test plan" },
      {
        type: "table",
        headers: ["Section", "Question it answers", "ShopEasy example"],
        rows: [
          ["Introduction / Objectives", "Why are we testing?", "Make sure release 2.0 checkout works safely."],
          ["Scope (in)", "What will we test?", "Login, search, cart, checkout."],
          ["Scope (out)", "What will we not test?", "The old mobile app (being retired)."],
          ["Approach", "How will we test?", "Manual functional tests, automated regression, basic performance test."],
          ["Environment", "Where will we test?", "Staging server, Chrome, Firefox, Safari, Android phone."],
          ["Resources and roles", "Who will test?", "2 testers, 1 automation engineer, test lead."],
          ["Schedule", "When?", "Test cases by 3 March; execution 4 to 14 March."],
          ["Entry and exit criteria", "When do we start and stop?", "See the example below."],
          ["Risks and mitigation", "What might go wrong?", "See the risk table below."],
          ["Deliverables", "What will we hand over?", "Test cases, bug reports, final test summary report."]
        ]
      },
      {
        type: "example",
        title: "ShopEasy release 2.0: entry and exit criteria",
        value: "Entry criteria (we can START testing when):\n- The build is deployed on the staging server.\n- Smoke tests pass.\n- Test cases are reviewed and approved.\n- Test data (users, products, test payment cards) is ready.\n\nExit criteria (we can STOP testing when):\n- 100% of high-priority test cases have been run.\n- At least 95% of all test cases pass.\n- No open Critical or High bugs.\n- The test summary report is shared with the team."
      },
      { type: "heading", value: "Risks and how to handle them" },
      {
        type: "table",
        headers: ["Risk", "Likelihood", "Impact", "Mitigation (what we do)"],
        rows: [
          ["Payment sandbox is down", "Medium", "High", "Ask the payment provider for a backup test account early."],
          ["Build arrives late", "High", "Medium", "Test high-priority features first; agree a new date."],
          ["Only one tester knows checkout", "Medium", "Medium", "Pair a second tester on checkout tests."]
        ]
      },
      {
        type: "steps",
        title: "How to write a simple test plan",
        steps: [
          { label: "Read the requirements", text: "Understand the features in the release." },
          { label: "Decide the scope", text: "List what is in scope and out of scope." },
          { label: "Choose the approach", text: "Types of testing, tools, and environments." },
          { label: "Plan people and time", text: "Who does what, and by when." },
          { label: "Set entry and exit criteria", text: "Clear rules for start and finish." },
          { label: "List risks", text: "Add a mitigation for each risk." },
          { label: "Review and share", text: "Get agreement from the team, and update the plan when things change." }
        ]
      },
      { type: "alert", value: "A test plan is a living (dynamic) document. If a new feature is added or a date moves, update the plan and tell the team." },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Imagine ShopEasy adds a 'Wishlist' feature. Write the in-scope and out-of-scope lists.",
          "Write three entry criteria and three exit criteria for testing the Wishlist.",
          "Write two risks with a mitigation for each."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Is a test plan for one project or for the whole company? (Usually for one project or release.)",
          "What do exit criteria tell you? (When testing can stop.)",
          "Why do we write 'out of scope'? (So nobody expects those areas to be tested.)",
          "Does a test plan ever change? (Yes. It is updated when requirements, dates, or risks change.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A test plan is like a plan for a family trip. It says where you are going, who is coming, what to pack, the dates, and what to do if the train is late. If the dates change, you update the plan."
    },
    mistakes: [
      "Copying a test plan from another project without changing it.",
      "Not writing what is out of scope.",
      "Writing exit criteria that cannot be measured, like 'the app is good'.",
      "Never updating the plan after requirements change.",
      "Listing risks without any mitigation."
    ],
    takeaways: [
      "A test plan describes testing for one project or release.",
      "It covers scope, approach, environment, people, schedule, criteria, and risks.",
      "Entry criteria say when to start; exit criteria say when to stop.",
      "Good criteria are clear and measurable.",
      "A test plan is a living document that changes with the project."
    ]
  },

  'm3-l4': {
    id: "m3-l4",
    title: "Lesson 3.4 Test Strategy",
    objectives: [
      "Explain what a test strategy is.",
      "Describe the main parts of a test strategy.",
      "Clearly tell a test strategy apart from a test plan."
    ],
    theory: "A test strategy is a high-level, mostly static document that describes the general testing approach, levels, tools, and standards for a project or a whole organization. Test plans follow the rules set by the strategy.",
    blocks: [
      { type: "text", value: "A test strategy gives the big picture. It says how the company or program tests software in general: which types of testing we do, which tools we use, how we report bugs, and what quality rules we follow." },
      { type: "text", value: "It is high-level and changes rarely (it is 'static'). Each project then writes its own test plan that follows the strategy." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Test strategy", "A high-level document with the general testing approach for a project or organization."],
          ["Static document", "A document that stays mostly the same over time."],
          ["Test level", "A stage of testing: unit, integration, system, acceptance."],
          ["Test type", "A kind of testing, such as functional, performance, or security."],
          ["Metric", "A number used to measure quality, such as 'percentage of tests passed'."],
          ["Defect management", "The agreed process for reporting, fixing, and closing bugs."]
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Test strategy", subtitle: "The general rules", tone: "honey", items: ["High level", "For a program or the whole organization", "Changes rarely (static)", "Written by senior QA or management", "Answers: 'How do we test in general?'"] },
          { title: "Test plan", subtitle: "The detailed project plan", tone: "olive", items: ["Detailed", "For one project or release", "Updated often (dynamic)", "Written by the test lead", "Answers: 'What, who, and when for this release?'"] }
        ]
      },
      { type: "heading", value: "What a test strategy contains" },
      {
        type: "table",
        headers: ["Section", "ShopEasy company example"],
        rows: [
          ["Scope and objectives", "All ShopEasy web and mobile products must be tested before release."],
          ["Test levels", "Unit tests by developers; integration, system, and acceptance tests by the team."],
          ["Test types", "Functional, regression, performance, security, accessibility."],
          ["Tools", "Jira for bugs and stories, Selenium or Playwright for UI automation, JMeter for load tests."],
          ["Environments", "Dev, Staging, Production. No testing with real customer data."],
          ["Defect management", "Severity levels Critical / High / Medium / Low; Critical bugs fixed before release."],
          ["Automation approach", "All regression tests for login and checkout must be automated."],
          ["Metrics and reporting", "Report pass rate, open bugs by severity, and test coverage each release."],
          ["Risks", "Payment and personal data are highest risk and get the most testing."]
        ]
      },
      {
        type: "example",
        title: "How the two documents work together at ShopEasy",
        value: "The ShopEasy test strategy says: 'Every release must run the automated regression suite, and no release goes live with open Critical bugs.'\n\nThe release 2.0 test plan then says: 'Regression suite runs on 12 March on the staging server. Owner: Omar. Exit criterion: zero open Critical or High bugs.'\n\nThe strategy sets the rule. The plan applies the rule to one release with names and dates."
      },
      { type: "warning", value: "In small companies, the test strategy is sometimes a section inside the test plan. That is fine, but the idea stays the same: strategy = general approach, plan = specific project details." },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write three rules that could go in a ShopEasy test strategy.",
          "For each rule, write how a release test plan would apply it (add a name or a date).",
          "Look at your list: which items would change every release? Those belong in the plan, not the strategy."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Which document changes less often: the strategy or the plan? (The strategy.)",
          "Where would you find 'Execution runs from 4 to 14 March'? (In the test plan.)",
          "Where would you find 'We use Jira for all bugs'? (In the test strategy.)",
          "Is a test strategy detailed or high-level? (High-level.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A test strategy is like a school's rulebook: 'All students take exams in every subject.' A test plan is like your class timetable: 'Maths exam, Room 4, Monday at 9 am.' The rulebook rarely changes; the timetable changes every term."
    },
    mistakes: [
      "Using the words 'test strategy' and 'test plan' as if they mean the same thing.",
      "Putting names, dates, and daily schedules into the strategy.",
      "Changing the strategy for every small project.",
      "Writing a project test plan that ignores the company strategy."
    ],
    takeaways: [
      "A test strategy is high-level and mostly static.",
      "It is defined for a program, a project family, or the whole organization.",
      "It covers test levels, types, tools, environments, defect rules, and metrics.",
      "A test plan is detailed, project-specific, and updated often.",
      "The plan follows the rules set in the strategy."
    ]
  },

  'm3-l5': {
    id: "m3-l5",
    title: "Lesson 3.5 Test Data Preparation",
    objectives: [
      "Explain what test data is and why it matters.",
      "Prepare valid, invalid, boundary, and empty test data.",
      "Choose safe ways to create test data without real customer information."
    ],
    theory: "Test data preparation means creating the valid, invalid, boundary, and database inputs needed to run test cases. Good test data is realistic, covers many situations, and never exposes real customer information.",
    blocks: [
      { type: "text", value: "Test data is any value you use while testing: user accounts, passwords, products, prices, addresses, and payment details. Even a perfect test case is useless if the data is missing or wrong." },
      { type: "text", value: "Preparing test data means deciding which values you need and making them ready before test execution starts." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Test data", "Values used to run tests."],
          ["Valid data", "Data the system should accept, e.g. a correct email."],
          ["Invalid data", "Data the system should reject, e.g. an email without '@'."],
          ["Boundary data", "Values at the edges of an allowed range, e.g. the minimum and maximum."],
          ["Synthetic data", "Fake data created for testing. It looks real but belongs to no real person."],
          ["Data masking", "Hiding or replacing private details (names, card numbers) in copied data."],
          ["Sandbox", "A safe test version of a service, such as a payment system that uses no real money."]
        ]
      },
      { type: "heading", value: "Types of test data" },
      {
        type: "table",
        headers: ["Type", "Purpose", "ShopEasy example"],
        rows: [
          ["Valid", "Check the happy path works", "Email anna@test.com, password Shop@1234"],
          ["Invalid", "Check errors are handled", "Email anna.test.com (no @)"],
          ["Boundary", "Check edges of limits", "Cart quantity 1 and 10 (allowed range 1 to 10)"],
          ["Empty / null", "Check missing input", "Leave Password blank"],
          ["Special characters", "Check odd input is safe", "Name: O'Brien, search: <script>"],
          ["Large volume", "Check speed and limits", "10,000 products in the catalogue"],
          ["State data", "Check special account states", "A locked user, an out-of-stock product"]
        ]
      },
      { type: "heading", value: "A test data set for ShopEasy sign-up" },
      {
        type: "table",
        headers: ["Field (rule)", "Valid", "Invalid", "Boundary / edge"],
        rows: [
          ["Email (must contain @ and a domain)", "maria@test.com", "maria@", "Very long email close to the maximum length"],
          ["Password (6 to 12 characters)", "Shop@123", "abc (too short)", "6-character and 12-character passwords"],
          ["Age (18 to 60)", "30", "15", "18 and 60"],
          ["Phone (10 digits)", "9876543210", "98765abc10", "9 digits and 11 digits"]
        ]
      },
      {
        type: "steps",
        title: "How to prepare test data",
        steps: [
          { label: "Read the test cases", text: "List every value each test case needs." },
          { label: "Group the data", text: "Valid, invalid, boundary, empty, special states." },
          { label: "Choose how to create it", text: "Manual entry, script, tool, or masked copy." },
          { label: "Load it into the test environment", text: "Create users, products, and orders." },
          { label: "Record it", text: "Keep the data in a shared sheet or file so the team can reuse it." },
          { label: "Reset after testing", text: "Clean or restore data so the next test run starts fresh." }
        ]
      },
      { type: "heading", value: "Ways to create test data" },
      {
        type: "table",
        headers: ["Method", "How", "Good for"],
        rows: [
          ["Manual", "Type data in the app yourself", "A few special cases"],
          ["SQL or scripts", "Insert rows into the test database", "Many records quickly"],
          ["Data generator tools", "Tools create fake names, emails, addresses", "Realistic synthetic data"],
          ["Masked production copy", "Copy real data, then hide private details", "Realistic volume and variety"],
          ["Provider sandbox", "Use the test cards or accounts a service gives you", "Payments without real money"]
        ]
      },
      { type: "warning", value: "Never use real customer data (real names, emails, card numbers) in testing unless it is properly masked and your company allows it. Leaking personal data can break privacy laws." },
      {
        type: "example",
        title: "ShopEasy checkout test data",
        value: "To test checkout, Riya prepares:\n- User 'maria@test.com' with a saved address.\n- Product 'Blue Sneakers', price $45, stock 5.\n- Product 'Red Cap', stock 0 (to test the out-of-stock message).\n- A successful test card and a declined test card from the payment provider's sandbox.\n- Coupon 'SAVE10' (valid) and 'OLD2020' (expired).\nWith this one data set she can run the happy path, the declined payment, the out-of-stock case, and both coupon cases."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "The ShopEasy search box accepts 1 to 50 characters. Write valid, invalid, boundary, empty, and special-character data for it.",
          "List the accounts you would need to test login: think about active, locked, and not-yet-verified users.",
          "Decide how you would create 500 fake products for a speed test."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is synthetic data? (Fake data made for testing that belongs to no real person.)",
          "Why do we reset data after testing? (So the next test run starts from a known, clean state.)",
          "Which data type checks the edges of a range? (Boundary data.)",
          "Is it OK to test payments with your own real card? (No. Use the provider's sandbox test cards.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Test data is like ingredients for a cooking class. Before the class starts, the teacher lays out good eggs, a broken egg, too little flour, and too much salt, so students can see what happens in each case."
    },
    mistakes: [
      "Testing only with valid, 'happy' data.",
      "Using real customer data without masking it.",
      "Not recording the data used, so a bug cannot be reproduced.",
      "Sharing one test account between many testers, so tests change each other's data.",
      "Forgetting to reset data, so later tests fail for the wrong reason."
    ],
    takeaways: [
      "Test data is every value you need to run your tests.",
      "Prepare valid, invalid, boundary, empty, special, and state data.",
      "Use synthetic or masked data, never raw customer data.",
      "Record and share test data so tests are repeatable.",
      "Realistic test data is essential for good integration and end-to-end testing."
    ]
  },

  'm3-l6': {
    id: "m3-l6",
    title: "Lesson 3.6 Boundary Value Analysis",
    objectives: [
      "Explain why bugs often appear at boundaries.",
      "Find the six boundary values for any numeric range.",
      "Write expected results for each boundary value."
    ],
    theory: "Boundary Value Analysis (BVA) tests the values at the edges of an allowed range: min-1, min, min+1, max-1, max, max+1. If the range is 1 to 100, the values are 0, 1, 2, 99, 100, 101.",
    blocks: [
      { type: "text", value: "Many input fields have limits. An age must be between 18 and 60. A cart quantity must be between 1 and 10. Developers often make small mistakes exactly at these limits. Boundary Value Analysis (BVA) is a technique that tests the edges of the range, where bugs like to hide." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Boundary", "The edge of an allowed range, where valid values change to invalid."],
          ["Minimum (min)", "The smallest allowed value."],
          ["Maximum (max)", "The largest allowed value."],
          ["Inclusive range", "Both min and max are allowed. '18 to 60 inclusive' means 18 and 60 are valid."],
          ["Off-by-one bug", "A bug where the limit is wrong by one, e.g. 18 is rejected but should be accepted."]
        ]
      },
      { type: "heading", value: "Why do bugs happen at boundaries?" },
      { type: "text", value: "Look at this small piece of code. The rule says age 18 to 60 is allowed. The developer typed '>' instead of '>='. Now age 18 is rejected. A test with age 30 will pass and never find this bug. Only a test with exactly 18 finds it." },
      { type: "code", language: "javascript", value: "// Rule: age must be 18 to 60 (inclusive)\nfunction isAgeValid(age) {\n  return age > 18 && age <= 60; // BUG: should be age >= 18\n}\n\nisAgeValid(30); // true  -> looks fine\nisAgeValid(18); // false -> wrong! BVA finds this" },
      {
        type: "syntax",
        title: "The six BVA values for a range min to max",
        parts: [
          { clause: "min - 1", text: "Just below the minimum. Should be rejected." },
          { clause: "min", text: "The minimum. Should be accepted." },
          { clause: "min + 1", text: "Just above the minimum. Should be accepted." },
          { clause: "max - 1", text: "Just below the maximum. Should be accepted." },
          { clause: "max", text: "The maximum. Should be accepted." },
          { clause: "max + 1", text: "Just above the maximum. Should be rejected." }
        ]
      },
      { type: "heading", value: "Worked example: age field 18 to 60" },
      { type: "text", value: "ShopEasy asks for age during sign-up. The rule: age must be from 18 to 60, inclusive. So min = 18 and max = 60." },
      {
        type: "table",
        headers: ["Test value", "Position", "Valid or invalid?", "Expected result"],
        rows: [
          ["17", "min - 1", "Invalid", "Error: 'Age must be between 18 and 60'. Account not created."],
          ["18", "min", "Valid", "Age accepted. Sign-up continues."],
          ["19", "min + 1", "Valid", "Age accepted. Sign-up continues."],
          ["59", "max - 1", "Valid", "Age accepted. Sign-up continues."],
          ["60", "max", "Valid", "Age accepted. Sign-up continues."],
          ["61", "max + 1", "Invalid", "Error: 'Age must be between 18 and 60'. Account not created."]
        ]
      },
      {
        type: "steps",
        title: "How to apply BVA",
        steps: [
          { label: "Find the rule", text: "Read the requirement: what is the allowed range?" },
          { label: "Check inclusive or exclusive", text: "Are min and max themselves allowed? Ask if it is not clear." },
          { label: "Write min and max", text: "Example: min = 18, max = 60." },
          { label: "Add the neighbours", text: "min-1, min+1, max-1, max+1." },
          { label: "Write expected results", text: "Accept or reject for each value." },
          { label: "Run and record", text: "Any wrong accept or reject is a bug." }
        ]
      },
      { type: "heading", value: "More examples" },
      {
        type: "table",
        headers: ["Rule", "min / max", "BVA test values"],
        rows: [
          ["Score from 1 to 100", "1 / 100", "0, 1, 2, 99, 100, 101"],
          ["Cart quantity from 1 to 10", "1 / 10", "0, 1, 2, 9, 10, 11"],
          ["Username length 4 to 20 characters", "4 / 20", "3, 4, 5, 19, 20, 21 characters"],
          ["Discount percent 0 to 50", "0 / 50", "-1, 0, 1, 49, 50, 51"]
        ]
      },
      {
        type: "example",
        title: "ShopEasy cart quantity",
        value: "Rule: a customer can buy 1 to 10 of the same product.\n\nOmar tests the quantity box with 0, 1, 2, 9, 10, 11.\n0  -> error 'Minimum quantity is 1' (correct)\n1  -> added to cart (correct)\n2  -> added to cart (correct)\n9  -> added to cart (correct)\n10 -> error 'Maximum quantity is 10' (WRONG - 10 should be allowed)\n11 -> error (correct)\n\nOmar found an off-by-one bug at the maximum. He reports it with the value 10 as the test data."
      },
      { type: "alert", value: "This course uses the common three-value approach: for each boundary we test the value below it, the boundary itself, and the value above it. That gives six values for a range. Some books use a two-value approach (only min-1, min, max, max+1). Both are correct; follow your team's standard." },
      { type: "text", value: "Text length also has boundaries. If a password must be 6 to 12 characters, count characters instead of numbers, and apply the same six-value rule." },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "A ShopEasy product review allows a rating from 1 to 5 stars. List the six BVA values.",
          "A delivery note field accepts 10 to 200 characters. List the six BVA lengths.",
          "For each value, write 'accept' or 'reject' as the expected result."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "For a range 18 to 60, what are the six BVA values? (17, 18, 19, 59, 60, 61.)",
          "Which of those values should be rejected? (17 and 61.)",
          "For a range 1 to 100, what are the BVA values? (0, 1, 2, 99, 100, 101.)",
          "Why is testing only the value 30 for an 18 to 60 range not enough? (It will not find mistakes at the edges, like 18 being rejected.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Imagine a fairground ride with a height sign: 'You must be 120 cm to ride'. The staff do not worry about a 170 cm adult. They look carefully at children who are 119, 120, and 121 cm. The edge is where mistakes happen."
    },
    mistakes: [
      "Testing only the middle of the range (for example, 30) and skipping the edges.",
      "Forgetting to test just outside the range (min-1 and max+1).",
      "Not checking if the range is inclusive or exclusive before choosing values.",
      "Mixing up character length and numeric value for text fields.",
      "Writing BVA values without expected results."
    ],
    takeaways: [
      "Bugs often appear exactly at boundaries.",
      "The six BVA values are min-1, min, min+1, max-1, max, max+1.",
      "For 18 to 60 the values are 17, 18, 19, 59, 60, 61.",
      "Values outside the range should be rejected; values inside should be accepted.",
      "BVA works for numbers, text lengths, dates, and quantities.",
      "Use BVA together with Equivalence Partitioning (next lesson)."
    ]
  },

  'm3-l7': {
    id: "m3-l7",
    title: "Lesson 3.7 Equivalence Partitioning",
    objectives: [
      "Explain what an equivalence partition (class) is.",
      "Split an input into valid and invalid partitions.",
      "Pick one representative value per partition.",
      "Combine Equivalence Partitioning with Boundary Value Analysis."
    ],
    theory: "Equivalence Partitioning (EP) divides input data into groups where all values should behave the same way, then tests one value from each group. For an age range 18 to 60 the partitions are: invalid (below 18), valid (18 to 60), and invalid (above 60).",
    blocks: [
      { type: "text", value: "You cannot test every possible value. An age field could get 1, 2, 3 ... 100 and more. Equivalence Partitioning (EP) helps you test less but still test well." },
      { type: "text", value: "The idea: if the system treats a group of values the same way, testing one value from that group is enough. If 25 works, 40 will also work, because both are in the same group." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Partition (equivalence class)", "A group of input values that the system should handle the same way."],
          ["Valid partition", "A group of values the system should accept."],
          ["Invalid partition", "A group of values the system should reject."],
          ["Representative value", "One value picked from a partition to stand for the whole group."],
          ["Coverage", "How much of the possible behaviour your tests check."]
        ]
      },
      {
        type: "steps",
        title: "How to apply EP",
        steps: [
          { label: "Read the rule", text: "Age must be 18 to 60." },
          { label: "Find the valid partition(s)", text: "18 to 60." },
          { label: "Find the invalid partitions", text: "Below 18, above 60, and also non-numbers or empty input." },
          { label: "Pick one value from each", text: "Usually a value in the middle of the group." },
          { label: "Write expected results", text: "Accept for valid partitions, a clear error for invalid ones." }
        ]
      },
      { type: "heading", value: "Worked example: age field 18 to 60" },
      {
        type: "table",
        headers: ["Partition", "Values in it", "Valid?", "Representative value", "Expected result"],
        rows: [
          ["P1: below the range", "17 and lower", "Invalid", "10", "Error: 'Age must be between 18 and 60'"],
          ["P2: inside the range", "18 to 60", "Valid", "35", "Age accepted"],
          ["P3: above the range", "61 and higher", "Invalid", "75", "Error: 'Age must be between 18 and 60'"]
        ]
      },
      { type: "text", value: "So the classic answer is three tests: one value below 18, one value within 18 to 60, and one value above 60." },
      { type: "text", value: "A careful tester also adds invalid partitions for input that is not a whole number:" },
      {
        type: "table",
        headers: ["Extra partition", "Representative value", "Expected result"],
        rows: [
          ["Empty input", "(blank)", "Error: 'Age is required'"],
          ["Letters", "abc", "Error: 'Enter a number'"],
          ["Decimal number", "25.5", "Error: 'Enter a whole number'"],
          ["Negative number", "-5", "Error: 'Age must be between 18 and 60'"]
        ]
      },
      { type: "heading", value: "A range with more than one valid partition" },
      { type: "text", value: "Sometimes valid values are split into several groups with different results. ShopEasy shipping is a good example." },
      {
        type: "table",
        headers: ["Partition", "Order total", "Expected shipping", "Representative value"],
        rows: [
          ["P1 (invalid)", "$0.00 or less (empty cart)", "Checkout button disabled", "$0.00"],
          ["P2 (valid)", "$0.01 to $49.99", "Shipping fee $5", "$20.00"],
          ["P3 (valid)", "$50.00 and more", "Free shipping", "$80.00"]
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Equivalence Partitioning", tone: "honey", items: ["Tests one value from each group", "Usually picks a middle value", "Reduces the number of tests", "Checks each type of behaviour"] },
          { title: "Boundary Value Analysis", tone: "olive", items: ["Tests the edges of each group", "Picks min-1, min, min+1, max-1, max, max+1", "Finds off-by-one bugs", "Checks exact limits"] }
        ]
      },
      {
        type: "example",
        title: "Using EP and BVA together on ShopEasy age",
        value: "EP values: 10, 35, 75 (one per partition).\nBVA values: 17, 18, 19, 59, 60, 61.\n\nTogether: 10, 17, 18, 19, 35, 59, 60, 61, 75, plus blank and 'abc'.\nThat is about 11 tests instead of testing every age from 0 to 150, and it covers every group and every edge."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "ShopEasy's search box accepts 1 to 50 characters. Write the partitions (valid and invalid).",
          "Pick one representative value for each partition.",
          "Now add the BVA values for the same rule and combine both lists."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "For age 18 to 60, how many basic partitions are there? (Three: below 18, 18 to 60, above 60.)",
          "Which is a good EP test set: 'only 18 and 60' or 'one value below 18, one within, one above 60'? (One value below 18, one within, one above 60.)",
          "Why is one value per partition enough? (All values in a partition should behave the same way.)",
          "Is an empty input a partition too? (Yes, an invalid one.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A cinema has ticket prices: children, adults, and seniors. To check the price machine, you do not need to try every age. You try one child, one adult, and one senior. Each group gets the same price, so one person per group is enough."
    },
    mistakes: [
      "Forgetting invalid partitions and testing only valid values.",
      "Testing many values from the same partition, which wastes time.",
      "Missing extra partitions like empty input, letters, or decimals.",
      "Using only EP and skipping boundary values.",
      "Assuming there is only one valid partition when the rules have several tiers."
    ],
    takeaways: [
      "EP groups values that should behave the same way.",
      "Test one representative value from each partition.",
      "For age 18 to 60: one value below 18, one within, one above 60.",
      "Include invalid partitions such as empty, letters, and decimals.",
      "EP reduces the number of test cases while keeping good coverage.",
      "Combine EP with BVA for strong test design."
    ]
  },

  'm3-l8': {
    id: "m3-l8",
    title: "Lesson 3.8 Decision Table Testing",
    objectives: [
      "Explain conditions, actions, and rules in a decision table.",
      "Build a complete decision table for a business rule.",
      "Turn each rule in the table into a test case."
    ],
    theory: "A decision table lists every combination of input conditions (true or false) and the action the system should take for each one. It is excellent for testing business rules where several conditions work together.",
    blocks: [
      { type: "text", value: "Some features depend on several conditions at the same time. 'Is the coupon valid?' 'Is the user a member?' 'Is the order $50 or more?' When conditions combine, it is easy to miss a case. A decision table puts every combination in one grid so nothing is forgotten." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Condition", "A question with a Yes (Y) or No (N) answer, e.g. 'Is the coupon valid?'"],
          ["Action", "What the system does, e.g. 'Apply 10% discount'."],
          ["Rule", "One column in the table: one combination of conditions and its actions."],
          ["Combination", "A mix of Y and N answers for all conditions."],
          ["'-' (don't care)", "The condition does not change the result in this rule."]
        ]
      },
      { type: "alert", value: "With n Yes/No conditions there are 2 to the power n combinations. 2 conditions = 4 rules. 3 conditions = 8 rules. 4 conditions = 16 rules." },
      {
        type: "steps",
        title: "How to build a decision table",
        steps: [
          { label: "List the conditions", text: "Each one must be a Yes/No question." },
          { label: "List the actions", text: "Everything the system can do as a result." },
          { label: "Count the rules", text: "2 to the power of the number of conditions." },
          { label: "Fill in all combinations", text: "Use a pattern so none are missed." },
          { label: "Mark the actions for each rule", text: "Use the requirement; ask the product owner if unclear." },
          { label: "Write one test case per rule", text: "Each column becomes a test." }
        ]
      },
      { type: "heading", value: "A small example: ShopEasy login" },
      {
        type: "table",
        headers: ["", "R1", "R2", "R3", "R4"],
        rows: [
          ["C1: Email is correct?", "Y", "Y", "N", "N"],
          ["C2: Password is correct?", "Y", "N", "Y", "N"],
          ["A1: Open Home page", "X", "", "", ""],
          ["A2: Show 'Invalid email or password'", "", "X", "X", "X"]
        ]
      },
      { type: "heading", value: "A full example: ShopEasy checkout offers" },
      { type: "text", value: "Business rules: (1) A valid coupon gives 10% off. (2) Members get free shipping. (3) Any order of $50 or more also gets free shipping. Otherwise shipping costs $5." },
      {
        type: "table",
        headers: ["", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
        rows: [
          ["C1: Coupon valid?", "Y", "Y", "Y", "Y", "N", "N", "N", "N"],
          ["C2: User is a member?", "Y", "Y", "N", "N", "Y", "Y", "N", "N"],
          ["C3: Order is $50 or more?", "Y", "N", "Y", "N", "Y", "N", "Y", "N"],
          ["A1: Apply 10% discount", "X", "X", "X", "X", "", "", "", ""],
          ["A2: Free shipping", "X", "X", "X", "", "X", "X", "X", ""],
          ["A3: Charge $5 shipping", "", "", "", "X", "", "", "", "X"]
        ]
      },
      { type: "heading", value: "Turning rules into test cases" },
      {
        type: "table",
        headers: ["Test case", "Rule", "Test data", "Expected result"],
        rows: [
          ["TC-OFFER-001", "R1", "Coupon SAVE10, member, order $80", "10% off, free shipping"],
          ["TC-OFFER-004", "R4", "Coupon SAVE10, guest, order $30", "10% off, $5 shipping"],
          ["TC-OFFER-006", "R6", "No coupon, member, order $30", "No discount, free shipping"],
          ["TC-OFFER-007", "R7", "No coupon, guest, order $80", "No discount, free shipping"],
          ["TC-OFFER-008", "R8", "No coupon, guest, order $30", "No discount, $5 shipping"]
        ]
      },
      { type: "text", value: "In a real project you write all eight test cases, one for each rule. The table above shows five as a sample." },
      {
        type: "example",
        title: "A bug found with the decision table",
        value: "Riya runs R6: a member with no coupon and a $30 order.\nExpected: free shipping.\nActual: ShopEasy charges $5.\n\nThe developer had coded 'free shipping only if order >= $50'. The member rule was forgotten. Testing only the 'happy path' (R1) would never have shown this."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "ShopEasy allows 'Cash on delivery' only if the order is under $200 AND the address is in a supported city. Write the two conditions and the actions.",
          "Build the full decision table (how many rules will it have?).",
          "Write one test case with test data for each rule."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "How many rules does a table with 3 Yes/No conditions have? (8.)",
          "What is one column in a decision table called? (A rule.)",
          "When is decision table testing a good choice? (When a rule depends on combinations of several conditions.)",
          "In the checkout table, does a guest with a valid coupon and a $30 order get free shipping? (No. They get 10% off and pay $5 shipping.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A decision table is like a restaurant menu grid: 'With rice? With drink? With dessert?' Each mix has a price. Writing every mix in a grid means the cashier never has to guess, and neither do you."
    },
    mistakes: [
      "Missing some combinations, so a rule is never tested.",
      "Writing conditions that are not simple Yes/No questions.",
      "Guessing the action for a rule instead of asking the product owner.",
      "Building the table but not turning each rule into a test case.",
      "Using '-' (don't care) without being sure the condition really does not matter."
    ],
    takeaways: [
      "A decision table maps combinations of conditions to actions.",
      "n Yes/No conditions give 2 to the power n rules.",
      "Each rule (column) becomes one test case.",
      "Decision tables find missing or wrong business rules.",
      "They are excellent for discounts, pricing, permissions, and eligibility rules."
    ]
  },

  'm3-l9': {
    id: "m3-l9",
    title: "Lesson 3.9 State Transition Testing",
    objectives: [
      "Explain states, events, and transitions.",
      "Build a state transition table for a login lockout feature.",
      "Design tests for both valid and invalid transitions."
    ],
    theory: "State transition testing checks how a system moves from one state to another when events happen, for example an ATM moving from Idle to Card Inserted to Authenticated. It suits systems whose behaviour depends on what happened before.",
    blocks: [
      { type: "text", value: "Some systems give a different answer to the same action, depending on what happened before. Typing a wrong password once shows a warning. Typing it wrong the third time locks the account. The action is the same, but the result is different because the system is in a different state." },
      { type: "text", value: "State transition testing helps you test these 'memory' features step by step." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["State", "The situation the system is in right now, e.g. 'Logged out' or 'Locked'."],
          ["Event", "Something that happens, e.g. 'User enters a wrong password'."],
          ["Transition", "A move from one state to another because of an event."],
          ["Action / output", "What the system shows or does during a transition, e.g. an error message."],
          ["Initial state", "The state where the system starts."],
          ["Invalid transition", "A move that should NOT be possible, e.g. from 'Locked' to 'Logged in'."]
        ]
      },
      { type: "text", value: "A simple real-world example is an ATM: Idle -> (insert card) -> Card Inserted -> (correct PIN) -> Authenticated -> (take card) -> Idle." },
      { type: "heading", value: "ShopEasy login lockout rule" },
      { type: "text", value: "Rule: after 3 wrong passwords in a row, the account is locked. A correct password before the third failure logs the user in and resets the counter. A locked account can only be unlocked using the reset link sent by email." },
      {
        type: "steps",
        title: "States in order (wrong password path)",
        steps: [
          { label: "S0: Logged out, 0 failed attempts", text: "Starting state." },
          { label: "S1: 1 failed attempt", text: "Message: 'Incorrect password. 2 attempts left.'" },
          { label: "S2: 2 failed attempts", text: "Message: 'Incorrect password. 1 attempt left.'" },
          { label: "S3: Locked", text: "Message: 'Account locked. Check your email to unlock.'" }
        ]
      },
      { type: "heading", value: "State transition table" },
      {
        type: "table",
        headers: ["Current state", "Event", "Next state", "Action / message"],
        rows: [
          ["S0 Logged out (0 fails)", "Correct password", "S4 Logged in", "Open Home page"],
          ["S0 Logged out (0 fails)", "Wrong password", "S1 (1 fail)", "'Incorrect password. 2 attempts left.'"],
          ["S1 (1 fail)", "Correct password", "S4 Logged in", "Open Home page; counter reset to 0"],
          ["S1 (1 fail)", "Wrong password", "S2 (2 fails)", "'Incorrect password. 1 attempt left.'"],
          ["S2 (2 fails)", "Correct password", "S4 Logged in", "Open Home page; counter reset to 0"],
          ["S2 (2 fails)", "Wrong password", "S3 Locked", "'Account locked. Check your email to unlock.'"],
          ["S3 Locked", "Correct password", "S3 Locked", "Still locked; login refused"],
          ["S3 Locked", "Wrong password", "S3 Locked", "Still locked; login refused"],
          ["S3 Locked", "Use email reset link", "S0 Logged out (0 fails)", "'Account unlocked. Please log in.'"],
          ["S4 Logged in", "Click Log out", "S0 Logged out (0 fails)", "Show login page"]
        ]
      },
      { type: "heading", value: "The same rules as a grid (find invalid transitions)" },
      {
        type: "table",
        headers: ["State \\ Event", "Correct password", "Wrong password", "Email reset link", "Log out"],
        rows: [
          ["S0 (0 fails)", "S4", "S1", "- (not possible)", "- (not possible)"],
          ["S1 (1 fail)", "S4", "S2", "- (not possible)", "- (not possible)"],
          ["S2 (2 fails)", "S4", "S3", "- (not possible)", "- (not possible)"],
          ["S3 Locked", "S3 (stays locked)", "S3", "S0", "- (not possible)"],
          ["S4 Logged in", "- (not possible)", "- (not possible)", "- (not possible)", "S0"]
        ]
      },
      { type: "text", value: "Every '-' cell is a chance for a negative test. For example: can a locked user reach the Home page by pressing the browser Back button? The expected answer is no." },
      { type: "heading", value: "Test cases from the table" },
      {
        type: "table",
        headers: ["Test case", "Start state", "Events", "Expected end state"],
        rows: [
          ["TC-LOCK-001", "S0", "Correct password", "S4 Logged in"],
          ["TC-LOCK-002", "S0", "Wrong, correct", "S4 Logged in, counter reset"],
          ["TC-LOCK-003", "S0", "Wrong, wrong, correct", "S4 Logged in, counter reset"],
          ["TC-LOCK-004", "S0", "Wrong, wrong, wrong", "S3 Locked"],
          ["TC-LOCK-005", "S3", "Correct password", "S3 still locked (invalid transition blocked)"],
          ["TC-LOCK-006", "S3", "Use email reset link, then correct password", "S4 Logged in"],
          ["TC-LOCK-007", "S0", "Wrong, correct, log out, wrong, wrong", "S2 (counter was reset, so not locked)"]
        ]
      },
      {
        type: "example",
        title: "A bug found on ShopEasy",
        value: "Omar runs TC-LOCK-007.\nHe enters a wrong password, then the correct one, logs out, then enters two wrong passwords.\nExpected: 'Incorrect password. 1 attempt left.'\nActual: 'Account locked.'\n\nThe counter was not reset after the successful login. The user was locked after only 2 failures in the new session. Only a test that follows a sequence of states could find this."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "A ShopEasy order has states: Placed, Paid, Shipped, Delivered, Cancelled. Write the events that move an order between them.",
          "Build a state transition table. Can a Delivered order become Cancelled? Mark invalid transitions.",
          "Write three valid and two invalid transition test cases."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is a transition? (A move from one state to another caused by an event.)",
          "In the lockout rule, what state are you in after two wrong passwords? (S2, with 1 attempt left.)",
          "Should a locked user be able to log in with the correct password? (No. They must unlock first.)",
          "What kind of systems suit state transition testing? (Systems whose behaviour depends on earlier events.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A traffic light has states: green, yellow, red. It can only change in a set order. Green to yellow is fine; green straight to red with no yellow is a problem. State transition testing checks that the software follows its allowed order."
    },
    mistakes: [
      "Testing each action alone instead of in a sequence.",
      "Testing only valid transitions and ignoring invalid ones.",
      "Forgetting to check that counters or data reset correctly.",
      "Not starting each test from a known state.",
      "Missing states that are not obvious, like 'Locked' or 'Cancelled'."
    ],
    takeaways: [
      "State transition testing checks behaviour that depends on history.",
      "States, events, transitions, and actions are the four building blocks.",
      "A state transition table lists every current state, event, and next state.",
      "Test valid transitions and also try invalid ones.",
      "Login lockout, orders, ATMs, and workflows are typical examples."
    ]
  },

  'm3-l10': {
    id: "m3-l10",
    title: "Lesson 3.10 Error Guessing",
    objectives: [
      "Explain what error guessing is and when to use it.",
      "Use a checklist of common error areas.",
      "Apply error guessing to a real feature."
    ],
    theory: "Error guessing uses the tester's experience to predict where developers commonly make mistakes, such as empty inputs, division by zero, or null fields. It adds to structured techniques; it does not replace them.",
    blocks: [
      { type: "text", value: "Techniques like BVA and decision tables follow clear rules. Error guessing is different. You use your experience and common sense to ask: 'Where would this software probably break?' Then you test exactly there." },
      { type: "text", value: "Beginners can do error guessing too. Start with a checklist of common mistakes, and your list will grow with every bug you find." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Error guessing", "Designing tests based on experience of where bugs usually are."],
          ["Heuristic", "A simple rule of thumb that often helps, but is not guaranteed."],
          ["Null / empty", "No value at all, e.g. a field left blank."],
          ["Division by zero", "Dividing a number by 0, which can crash a program."],
          ["Bug history", "A list of past bugs, useful for guessing new ones."],
          ["Exploratory testing", "Learning, designing, and running tests at the same time, without a full script."]
        ]
      },
      { type: "heading", value: "Common error areas checklist" },
      {
        type: "table",
        headers: ["Area", "What to try", "ShopEasy example"],
        rows: [
          ["Empty input", "Submit a form with blank fields", "Click 'Log in' with no email and no password"],
          ["Spaces only", "Type only spaces", "Search for '   '"],
          ["Zero and negatives", "Use 0 or minus numbers", "Set cart quantity to 0 or -1"],
          ["Division by zero", "Values that make a calculation divide by 0", "Average rating for a product with 0 reviews"],
          ["Very long input", "Paste hundreds of characters", "A 1,000-character delivery note"],
          ["Special characters", "Quotes, emoji, symbols, HTML", "Name: O'Brien; review with emoji; <b>test</b>"],
          ["Double actions", "Click a button twice fast", "Double-click 'Place order' -> two orders?"],
          ["Back and refresh", "Use browser Back or refresh mid-flow", "Refresh during payment"],
          ["Session timeout", "Wait until logged out, then act", "Leave checkout open 30 minutes, then pay"],
          ["Changing data", "Data changes while in use", "Product goes out of stock while in the cart"]
        ]
      },
      {
        type: "steps",
        title: "How to do error guessing",
        steps: [
          { label: "Understand the feature", text: "What should it do? Who uses it?" },
          { label: "Use your checklist", text: "Go through the common error areas above." },
          { label: "Look at past bugs", text: "Where did similar features break before?" },
          { label: "Write your guesses", text: "One line per idea, with the expected result." },
          { label: "Run the tests", text: "Record what happens." },
          { label: "Update the checklist", text: "Add new bug patterns you discovered." }
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Structured techniques", subtitle: "BVA, EP, decision tables", tone: "olive", items: ["Follow clear rules", "Give the same result for any tester", "Measurable coverage", "Based on requirements"] },
          { title: "Error guessing", subtitle: "Experience based", tone: "honey", items: ["Uses experience and intuition", "Different testers find different bugs", "Hard to measure coverage", "Finds bugs requirements never mention"] }
        ]
      },
      {
        type: "example",
        title: "Error guessing on the ShopEasy cart",
        value: "Riya has finished her BVA and EP tests for the cart. Now she guesses errors:\n\n1. Double-click 'Add to cart' -> quantity became 2 instead of 1. BUG.\n2. Add item, then open the cart in a second tab and remove it, then pay in the first tab -> payment page still shows the item. BUG.\n3. Quantity field with '1e3' -> field correctly rejects it. OK.\n4. Coupon code with a space at the end 'SAVE10 ' -> coupon rejected. BUG (should trim spaces).\n\nFour guesses found three real bugs that no requirement described."
      },
      { type: "warning", value: "Do not use error guessing as your only technique. Use it after structured techniques, to find the bugs they miss." },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Pick the ShopEasy checkout page. Write eight error guesses using the checklist.",
          "For each guess, write the expected (correct) behaviour.",
          "Add one new idea to the checklist that is not already listed."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is error guessing based on? (Tester experience and common bug patterns.)",
          "Should error guessing replace BVA and EP? (No. It complements them.)",
          "Give one classic error guess for a form. (Submit it with all fields empty.)",
          "Why is double-clicking 'Place order' a good guess? (It may create two orders or charge twice.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "An experienced car mechanic hears a strange noise and checks the brakes first, because brakes are where that noise usually comes from. Error guessing is the tester's version of that experience."
    },
    mistakes: [
      "Using error guessing as the only test technique.",
      "Not writing down the guesses, so they cannot be repeated.",
      "Ignoring past bug reports, which are the best source of ideas.",
      "Only testing 'wrong' input and forgetting timing issues like double clicks and timeouts.",
      "Not updating the checklist after finding new bug patterns."
    ],
    takeaways: [
      "Error guessing uses experience to target likely bugs.",
      "Common areas: empty input, zero, long text, special characters, double clicks, timeouts.",
      "A checklist makes error guessing easy for beginners.",
      "It finds bugs that requirements never mention.",
      "It complements structured techniques; it does not replace them."
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 5: AGILE TESTING
  // ---------------------------------------------------------------------------
  'm5-l1': {
    id: "m5-l1",
    title: "Lesson 5.1 Introduction to Agile",
    objectives: [
      "Explain what Agile means in simple words.",
      "List the four values of the Agile Manifesto.",
      "Compare Agile with the Waterfall model.",
      "Describe what Agile changes for testers."
    ],
    theory: "Agile is a way of building software in small pieces, with short cycles, close customer collaboration, and quick response to change. It values working software over comprehensive documentation.",
    blocks: [
      { type: "text", value: "In the old Waterfall way, a team plans everything first, builds everything next, and tests everything at the end. Customers often see the product only after many months. If something is wrong, it is expensive to change." },
      { type: "text", value: "Agile works differently. The team builds a small piece, tests it, shows it, gets feedback, and improves. This cycle repeats every few weeks." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Agile", "A mindset and set of values for building software in small steps with frequent feedback."],
          ["Iteration", "A short, fixed period of work (in Scrum it is called a Sprint)."],
          ["Increment", "A small, working, usable piece of the product."],
          ["Agile Manifesto", "A short document written in 2001 with 4 values and 12 principles."],
          ["Cross-functional team", "A team that has all the skills needed: coding, testing, design, and more."],
          ["Feedback", "Comments from users or stakeholders that help improve the product."]
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Waterfall", tone: "rose", items: ["One big plan at the start", "Phases happen one after another", "Testing mostly at the end", "Customer sees the product late", "Change is slow and costly"] },
          { title: "Agile", tone: "olive", items: ["Plan a little, often", "Build, test, and review in short cycles", "Testing happens all the time", "Customer sees progress every few weeks", "Change is expected and welcome"] }
        ]
      },
      { type: "heading", value: "The four Agile values" },
      { type: "text", value: "The Agile Manifesto says: while there is value in the items on the right, we value the items on the left more." },
      {
        type: "table",
        headers: ["We value more...", "...than", "What it means for a tester"],
        rows: [
          ["Individuals and interactions", "Processes and tools", "Talk to developers directly instead of only filing tickets."],
          ["Working software", "Comprehensive documentation", "Keep test documents light and useful; focus on testing real, running features."],
          ["Customer collaboration", "Contract negotiation", "Help the product owner and users define what 'correct' means."],
          ["Responding to change", "Following a plan", "Expect requirements to change and update tests quickly."]
        ]
      },
      { type: "heading", value: "Some Agile principles in plain words" },
      {
        type: "list",
        items: [
          "Deliver working software often, from every couple of weeks to every couple of months, with a preference for the shorter time.",
          "Welcome changing requirements, even late in development.",
          "Business people and developers work together daily.",
          "Working software is the main measure of progress.",
          "Continuous attention to technical excellence and good design.",
          "At regular intervals, the team reflects on how to become more effective."
        ]
      },
      { type: "heading", value: "Popular Agile frameworks" },
      {
        type: "table",
        headers: ["Framework", "Main idea"],
        rows: [
          ["Scrum", "Work in fixed Sprints of one month or less, with clear accountabilities and events."],
          ["Kanban", "Visualise work on a board and limit how much work is in progress at once."],
          ["Extreme Programming (XP)", "Engineering practices like pair programming, test-driven development, and continuous integration."]
        ]
      },
      {
        type: "example",
        title: "ShopEasy: Waterfall vs Agile",
        value: "Waterfall: The team plans login, search, cart, and checkout for 6 months. Testing starts in month 5. Testers find that checkout does not work with a popular payment method. Launch is delayed by 2 months.\n\nAgile: In Sprint 1 (2 weeks) the team builds and tests login. In Sprint 2, search. In Sprint 3, the cart. Customers try each piece. In Sprint 3, feedback shows users want 'Save for later', so the product owner adds it to the backlog. Problems are found early, when they are cheap to fix."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Think of a project you know (school, work, or home). Was it more like Waterfall or Agile? Why?",
          "Split a ShopEasy 'Wishlist' feature into three small pieces that could each be finished in one short cycle.",
          "For each Agile value, write one thing a tester would do differently in an Agile team."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Does Agile say documentation is useless? (No. It values working software more, but documentation still has value.)",
          "In Agile, when does testing happen? (Continuously, in every iteration.)",
          "What is an increment? (A small, working, usable piece of the product.)",
          "Name one Agile framework. (Scrum, Kanban, or XP.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Waterfall is like cooking a full wedding dinner and letting guests taste it only at the party. Agile is like cooking one dish at a time and asking guests to taste it, so you can add salt before you cook the next dish."
    },
    mistakes: [
      "Thinking Agile means 'no planning' or 'no documentation'.",
      "Thinking testers wait until the end of the iteration to start testing.",
      "Treating Agile as only a set of meetings instead of a mindset.",
      "Believing requirements must be frozen before work starts."
    ],
    takeaways: [
      "Agile builds software in small, working pieces with frequent feedback.",
      "The Agile Manifesto has 4 values and 12 principles.",
      "Agile values working software over comprehensive documentation.",
      "Change is expected and welcome in Agile.",
      "Testers work with the team throughout every iteration."
    ]
  },

  'm5-l2': {
    id: "m5-l2",
    title: "Lesson 5.2 Scrum Framework",
    objectives: [
      "Describe the three Scrum accountabilities: Product Owner, Scrum Master, and Developers.",
      "List the five Scrum events and their timeboxes.",
      "Explain the three Scrum artifacts and their commitments.",
      "Understand where testers fit in a Scrum Team."
    ],
    theory: "Scrum is a lightweight Agile framework. A Scrum Team has three accountabilities: Product Owner, Scrum Master, and Developers. Work happens in Sprints of one month or less, using fixed events and three artifacts.",
    blocks: [
      { type: "text", value: "Scrum is the most popular Agile framework. It is described in The Scrum Guide. The latest version (2020) is short and simple. It defines who is accountable for what, which events happen, and which artifacts the team uses." },
      { type: "text", value: "Older material often talks about 'three roles' and a 'Development Team'. The 2020 Scrum Guide instead uses 'accountabilities' and calls everyone who builds the product 'Developers'. Testers are Developers too. There are no sub-teams inside a Scrum Team." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Scrum Team", "A small group, typically 10 or fewer people: one Product Owner, one Scrum Master, and Developers."],
          ["Accountability", "A responsibility someone in the team owns."],
          ["Product Owner (PO)", "Maximises the value of the product and manages the Product Backlog."],
          ["Scrum Master (SM)", "Helps everyone understand and use Scrum well, and removes impediments."],
          ["Developers", "Everyone who creates the product: programmers, testers, designers, and others."],
          ["Stakeholder", "Anyone with an interest in the product, such as customers or managers."],
          ["Sprint", "A fixed period of one month or less in which a usable Increment is created."],
          ["Timebox", "The maximum time allowed for an event."]
        ]
      },
      { type: "heading", value: "The three accountabilities" },
      {
        type: "compare",
        columns: [
          { title: "Product Owner", subtitle: "What to build and why", tone: "honey", items: ["One person, not a committee", "Owns and orders the Product Backlog", "Creates and explains the Product Goal", "Decides what brings the most value", "Accepts feedback from stakeholders"] },
          { title: "Scrum Master", subtitle: "How to use Scrum well", tone: "olive", items: ["Coaches the team in Scrum", "Removes impediments (blockers)", "Makes sure events happen and are useful", "Helps the PO with backlog techniques", "A leader who serves the team"] },
          { title: "Developers", subtitle: "Build the Increment", tone: "rose", items: ["Includes testers", "Create the Sprint Backlog plan", "Follow the Definition of Done", "Adapt their plan every day", "Hold each other accountable"] }
        ]
      },
      { type: "heading", value: "The five Scrum events" },
      {
        type: "table",
        headers: ["Event", "When", "Timebox (one-month Sprint)", "Purpose"],
        rows: [
          ["The Sprint", "Container for all other events", "One month or less", "Create a valuable, usable Increment."],
          ["Sprint Planning", "Start of the Sprint", "Maximum 8 hours", "Decide the Sprint Goal, what to do, and how."],
          ["Daily Scrum", "Every day of the Sprint", "15 minutes", "Developers check progress toward the Sprint Goal and adapt the plan."],
          ["Sprint Review", "Near the end of the Sprint", "Maximum 4 hours", "Inspect the result with stakeholders and adapt the Product Backlog."],
          ["Sprint Retrospective", "Last event of the Sprint", "Maximum 3 hours", "Plan ways to improve quality and effectiveness."]
        ]
      },
      { type: "text", value: "For shorter Sprints, events are usually shorter too. Many teams use two-week Sprints." },
      { type: "heading", value: "The three artifacts and their commitments" },
      {
        type: "table",
        headers: ["Artifact", "What it is", "Commitment"],
        rows: [
          ["Product Backlog", "An ordered list of everything that might improve the product", "Product Goal (the long-term objective)"],
          ["Sprint Backlog", "The Sprint Goal, the selected backlog items, and the plan to deliver them", "Sprint Goal (the single objective for the Sprint)"],
          ["Increment", "A usable step toward the Product Goal that meets the Definition of Done", "Definition of Done (the quality standard)"]
        ]
      },
      {
        type: "steps",
        title: "How a Sprint flows",
        steps: [
          { label: "Product Backlog", text: "The PO keeps it ordered and refined." },
          { label: "Sprint Planning", text: "The whole Scrum Team agrees the Sprint Goal and the Developers create the Sprint Backlog." },
          { label: "Daily work and Daily Scrum", text: "Build and test items; inspect progress every day." },
          { label: "Increment", text: "Work that meets the Definition of Done." },
          { label: "Sprint Review", text: "Inspect the Increment with stakeholders; update the Product Backlog." },
          { label: "Sprint Retrospective", text: "Improve how the team works. Then the next Sprint starts immediately." }
        ]
      },
      {
        type: "example",
        title: "The ShopEasy Scrum Team",
        value: "Product Owner: Priya. She orders the backlog. Right now 'Guest checkout' is at the top because many users leave without buying.\nScrum Master: Leo. He noticed the test server is often down and got the IT team to fix it.\nDevelopers: Ben and Chen (programmers), Riya (tester), Sara (designer).\n\nSprint length: 2 weeks.\nSprint Goal: 'Let guests buy without creating an account.'\nRiya joins every event. She is a Developer, fully part of the team."
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "For each problem, say who is mainly accountable: (a) the backlog is in the wrong order, (b) the team does not understand the Retrospective, (c) a feature does not meet the Definition of Done.",
          "Write a Sprint Goal for a ShopEasy Sprint about product search.",
          "Draw a two-week calendar and mark when each Scrum event happens."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Who orders the Product Backlog? (The Product Owner.)",
          "What is the maximum length of a Sprint? (One month.)",
          "How long is the Daily Scrum? (15 minutes.)",
          "Are testers part of the Developers in Scrum? (Yes.)",
          "What is the commitment for the Increment? (The Definition of Done.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A Scrum Team is like a football team. The Product Owner is the one who decides which match to win first, the Scrum Master is the coach who helps the team play well together, and the Developers are the players on the field, including the goalkeeper who stops problems: the tester."
    },
    mistakes: [
      "Thinking the Scrum Master is the team's boss or project manager.",
      "Treating testers as a separate team outside Scrum.",
      "Letting a Sprint run longer than one month or changing its length every time.",
      "Having many Product Owners give the team different priorities.",
      "Skipping the Retrospective because 'we are busy'."
    ],
    takeaways: [
      "Scrum has three accountabilities: Product Owner, Scrum Master, Developers.",
      "Scrum has five events: Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.",
      "Scrum has three artifacts: Product Backlog, Sprint Backlog, Increment.",
      "A Sprint lasts one month or less; the Daily Scrum is 15 minutes.",
      "The Scrum Team is self-managing and cross-functional; testers are Developers."
    ]
  },

  'm5-l3': {
    id: "m5-l3",
    title: "Lesson 5.3 Sprint Planning",
    objectives: [
      "Explain the three topics of Sprint Planning.",
      "Write a user story with clear acceptance criteria.",
      "Estimate work using story points and Planning Poker.",
      "Describe how testers add value in Sprint Planning."
    ],
    theory: "Sprint Planning starts the Sprint. The Scrum Team decides why the Sprint is valuable (Sprint Goal), what backlog items to take, and how to do the work, which creates the Sprint Backlog. Testers help from the start by shaping acceptance criteria and sizing test effort.",
    blocks: [
      { type: "text", value: "Sprint Planning is the first event of every Sprint. The whole Scrum Team works together to plan the Sprint. For a one-month Sprint it takes at most 8 hours; for a two-week Sprint it is usually shorter." },
      { type: "text", value: "Testers join from the very beginning. They ask questions, find unclear rules, and help write acceptance criteria before any code is written." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Product Backlog item (PBI)", "One piece of work in the Product Backlog, often written as a user story."],
          ["User story", "A short description of a feature from the user's point of view."],
          ["Acceptance criteria", "Clear conditions a story must meet to be accepted."],
          ["Sprint Goal", "The single objective for the Sprint."],
          ["Sprint Backlog", "The Sprint Goal + selected items + the plan to deliver them."],
          ["Story points", "A relative size estimate of effort, complexity, and risk (a common practice, not part of the Scrum Guide)."],
          ["Velocity", "How many story points a team usually completes in a Sprint."],
          ["Capacity", "How much time the team really has this Sprint (after holidays, meetings, etc.)."]
        ]
      },
      {
        type: "steps",
        title: "The three topics of Sprint Planning",
        steps: [
          { label: "Topic 1: Why is this Sprint valuable?", text: "The PO suggests how the product can gain value. The whole Scrum Team agrees a Sprint Goal." },
          { label: "Topic 2: What can be done this Sprint?", text: "The Developers select items from the Product Backlog, based on past performance and capacity." },
          { label: "Topic 3: How will the work get done?", text: "The Developers break items into smaller tasks, often one day or less, including test tasks." }
        ]
      },
      {
        type: "syntax",
        title: "User story template",
        parts: [
          { clause: "As a <type of user>", text: "Who wants the feature." },
          { clause: "I want <goal>", text: "What they want to do." },
          { clause: "so that <reason>", text: "Why it is valuable to them." }
        ]
      },
      {
        type: "syntax",
        title: "Acceptance criteria template (Given / When / Then)",
        parts: [
          { clause: "Given <starting situation>", text: "The precondition." },
          { clause: "When <action>", text: "What the user does." },
          { clause: "Then <expected result>", text: "What must happen. This becomes a test." }
        ]
      },
      {
        type: "example",
        title: "ShopEasy story with acceptance criteria",
        value: "Story: As a shopper, I want to apply a coupon code at checkout, so that I can pay less.\n\nAC1: Given a cart of $40, when I apply valid coupon SAVE10, then the total becomes $36.\nAC2: Given an expired coupon, when I apply it, then I see 'This coupon has expired' and the total does not change.\nAC3: Given a coupon is already applied, when I apply a second coupon, then I see 'Only one coupon per order'.\n\nRiya (tester) asked: 'What if the code has lowercase letters or spaces?' The PO added AC4: codes are not case-sensitive and spaces are ignored."
      },
      { type: "heading", value: "Estimating with Planning Poker" },
      { type: "text", value: "Many teams estimate with story points using Planning Poker. Each person holds cards with numbers from a Fibonacci-like sequence: 1, 2, 3, 5, 8, 13, 21. Everyone chooses a card in secret, then all show at the same time. If the numbers are very different, the highest and lowest explain their thinking, and the team votes again." },
      {
        type: "table",
        headers: ["Story", "Votes", "Discussion", "Final estimate"],
        rows: [
          ["Apply coupon code", "3, 3, 5, 8", "Riya voted 8: many test cases for expired, invalid, and combined coupons.", "5"],
          ["Change button colour", "1, 1, 1, 2", "Small change, quick visual check.", "1"],
          ["Guest checkout", "8, 13, 13, 13", "Payment and email flows need end-to-end testing.", "13"]
        ]
      },
      { type: "alert", value: "Estimates must include testing effort. A story that is quick to code can still need a lot of testing." },
      { type: "heading", value: "How testers help in Sprint Planning" },
      {
        type: "table",
        headers: ["Tester activity", "Why it helps"],
        rows: [
          ["Ask 'what if' questions", "Finds missing rules before coding starts."],
          ["Help write acceptance criteria", "Everyone agrees what 'correct' means."],
          ["Include test effort in estimates", "The Sprint is not overloaded."],
          ["Add test tasks to the Sprint Backlog", "Test data, test cases, automation, regression."],
          ["Point out risks and dependencies", "E.g. 'We need a payment sandbox account first.'"]
        ]
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a user story for 'Save for later' in the ShopEasy cart.",
          "Write three acceptance criteria in Given / When / Then format, including one negative case.",
          "List the test tasks you would add to the Sprint Backlog for this story."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "When should testers join Sprint Planning? (From the start, to shape acceptance criteria.)",
          "What are the three topics of Sprint Planning? (Why, What, and How.)",
          "Who selects how much work to take into the Sprint? (The Developers.)",
          "Are story points part of the official Scrum Guide? (No. They are a common extra practice.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Sprint Planning is like planning a family weekend. First you agree why (to relax), then what (a picnic and a movie), then how (who buys food, who books tickets). The person who asks 'What if it rains?' is the tester."
    },
    mistakes: [
      "Testers staying silent or not attending Sprint Planning.",
      "Estimating only coding time and forgetting testing time.",
      "Accepting stories with vague acceptance criteria like 'coupon should work'.",
      "Taking more work than the team's capacity allows.",
      "Starting the Sprint without a clear Sprint Goal."
    ],
    takeaways: [
      "Sprint Planning answers Why (Sprint Goal), What (items), and How (plan).",
      "The result is the Sprint Backlog.",
      "Acceptance criteria turn stories into testable rules.",
      "Estimates, such as story points, must include test effort.",
      "Testers add the most value by joining planning from the start."
    ]
  },

  'm5-l4': {
    id: "m5-l4",
    title: "Lesson 5.4 Daily Stand-up",
    objectives: [
      "Explain the purpose and rules of the Daily Scrum (stand-up).",
      "Give a short, useful update as a tester.",
      "Recognise and raise blockers early."
    ],
    theory: "The Daily Scrum, often called the stand-up, is a 15-minute event for the Developers every working day. They inspect progress toward the Sprint Goal and adapt the plan. Many teams use three questions: what I did yesterday, what I will do today, and any blockers.",
    blocks: [
      { type: "text", value: "Every day, at the same time and place, the Developers meet for 15 minutes. Many teams stand up during it so it stays short, which is why it is often called the 'daily stand-up'. The official Scrum name is the Daily Scrum." },
      { type: "text", value: "It is not a status report for a manager. It is the Developers' own meeting to check: 'Are we still on track for the Sprint Goal? What should we change today?'" },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Daily Scrum", "A 15-minute daily event for the Developers to inspect progress and adapt the plan."],
          ["Stand-up", "The common nickname for the Daily Scrum."],
          ["Blocker (impediment)", "Anything that stops or slows your work."],
          ["Sprint Goal", "The single objective the team is working toward in this Sprint."],
          ["Task board", "A board showing work as To Do, In Progress, and Done."],
          ["Burndown chart", "A chart showing how much work is left in the Sprint."]
        ]
      },
      { type: "heading", value: "Rules of the Daily Scrum" },
      {
        type: "table",
        headers: ["Rule", "Detail"],
        rows: [
          ["Timebox", "15 minutes, every working day of the Sprint."],
          ["Same time, same place", "This makes it simple and habit-forming."],
          ["Who", "The Developers (testers included). The PO and SM take part as Developers only if they are actively working on Sprint Backlog items."],
          ["Focus", "Progress toward the Sprint Goal, and the plan for the next day."],
          ["Format", "The Developers choose. The three questions are a popular option, not a Scrum rule."],
          ["Deep discussions", "Happen after the Daily Scrum, with only the people needed."]
        ]
      },
      {
        type: "list",
        ordered: true,
        items: [
          "What did I do yesterday to help reach the Sprint Goal?",
          "What will I do today to help reach the Sprint Goal?",
          "Is anything blocking me or the team?"
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Weak tester update", tone: "rose", items: ["'I did some testing.'", "'I will continue testing.'", "'No blockers.' (but the test server was down for 3 hours)"] },
          { title: "Strong tester update", tone: "olive", items: ["'I finished testing the coupon story. 2 bugs found, both fixed and retested.'", "'Today I start guest checkout tests and automate the coupon regression test.'", "'Blocker: I need a payment sandbox account. Leo, can you help after the stand-up?'"] }
        ]
      },
      {
        type: "example",
        title: "A ShopEasy Daily Scrum (Day 6 of a 2-week Sprint)",
        value: "Ben: Finished the guest checkout form. Today: email confirmation. No blockers.\nChen: Payment API is 80% done. Today: error handling. I need Riya's declined-card test data.\nRiya (tester): Yesterday I tested the guest form: 1 bug, the postcode field accepts letters. Today I test payments with Chen. Blocker: the sandbox card for 'declined payment' does not work.\nSara: Finished the success page design. No blockers.\n\nThe team sees payment is at risk for the Sprint Goal. After the stand-up, Riya and Chen stay for 10 minutes to solve the test card issue. Leo (Scrum Master) contacts the payment provider."
      },
      {
        type: "steps",
        title: "What happens around the Daily Scrum",
        steps: [
          { label: "Before", text: "Update the task board so everyone sees real progress." },
          { label: "During (15 min)", text: "Short updates focused on the Sprint Goal; raise blockers." },
          { label: "Right after", text: "People who need to talk in detail stay behind." },
          { label: "During the day", text: "The Scrum Master helps remove impediments; the team adapts the plan." }
        ]
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write your own tester update for Day 3 of a ShopEasy Sprint about product search. Keep it under 45 seconds when spoken.",
          "Include one real blocker and say who could help.",
          "Read your update aloud and remove any detail that belongs in a follow-up talk."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "How long is the Daily Scrum? (15 minutes.)",
          "Who is the Daily Scrum for? (The Developers, including testers.)",
          "Are the three questions required by the Scrum Guide? (No. They are a common format the team may choose.)",
          "Where should a long technical discussion happen? (After the Daily Scrum, with only the people needed.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "The Daily Scrum is like a quick team huddle in a football match. Players do not discuss the whole season. They agree in a few seconds what to do next, and who needs help, then they play."
    },
    mistakes: [
      "Turning the stand-up into a long problem-solving meeting.",
      "Reporting to the Scrum Master or a manager instead of talking to the team.",
      "Giving vague updates like 'testing is going on'.",
      "Hiding blockers until it is too late.",
      "Talking about tasks without linking them to the Sprint Goal."
    ],
    takeaways: [
      "The Daily Scrum is 15 minutes, every day, same time and place.",
      "It is for the Developers to inspect progress toward the Sprint Goal.",
      "The three questions are a helpful format, not a rule.",
      "Testers should give specific updates: what was tested, bugs found, what is next.",
      "Raise blockers early; solve details after the meeting."
    ]
  },

  'm5-l5': {
    id: "m5-l5",
    title: "Lesson 5.5 Sprint Review",
    objectives: [
      "Explain the purpose of the Sprint Review.",
      "Describe who attends and what happens.",
      "Explain the Definition of Done and why only 'Done' work is shown.",
      "Describe the tester's role before, during, and after the review."
    ],
    theory: "The Sprint Review is held near the end of the Sprint. The Scrum Team and stakeholders inspect the working Increment, discuss progress, and collect feedback to update the Product Backlog. Only work that meets the Definition of Done is presented.",
    blocks: [
      { type: "text", value: "At the Sprint Review, the Scrum Team shows what they built in the Sprint to stakeholders, such as customers, managers, and support staff. Everyone discusses what is working, what has changed in the market, and what to do next." },
      { type: "text", value: "The Scrum Guide says the Sprint Review is a working session, not just a presentation. The goal is feedback that helps decide what comes next." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Sprint Review", "An event to inspect the Sprint's outcome with stakeholders and adapt the Product Backlog. Maximum 4 hours for a one-month Sprint."],
          ["Increment", "Usable, working product that meets the Definition of Done."],
          ["Definition of Done (DoD)", "A shared checklist of quality rules every item must meet to be called 'Done'."],
          ["Stakeholder", "Someone with an interest in the product: customers, managers, sales, support."],
          ["Demo", "Showing the working software live."],
          ["Feedback", "Comments and ideas that may become new Product Backlog items."]
        ]
      },
      {
        type: "steps",
        title: "A typical Sprint Review agenda",
        steps: [
          { label: "Welcome and Sprint Goal", text: "The PO explains the goal and what was Done and not Done." },
          { label: "Show the Increment", text: "Developers, including testers, demonstrate working features." },
          { label: "Discuss", text: "What went well, what problems appeared, and how they were solved." },
          { label: "Collect feedback", text: "Stakeholders try features and share ideas." },
          { label: "Look ahead", text: "Review the Product Backlog, timeline, budget, and market changes." },
          { label: "Adapt the Product Backlog", text: "New or changed items are added for future Sprints." }
        ]
      },
      { type: "heading", value: "Example Definition of Done (ShopEasy)" },
      {
        type: "table",
        headers: ["DoD item", "Checked by"],
        rows: [
          ["Code is reviewed by another developer", "Developers"],
          ["Unit tests are written and passing", "Developers"],
          ["Tests for all acceptance criteria are written and passing", "Developers (testers)"],
          ["No open Critical or High bugs for the story", "Developers (testers)"],
          ["Regression tests pass on the staging server", "Developers (testers)"],
          ["Works on Chrome, Firefox, Safari, and mobile", "Developers (testers)"],
          ["Help text or release notes updated", "Developers"]
        ]
      },
      { type: "warning", value: "If a backlog item does not meet the Definition of Done, it is not part of the Increment and should not be presented as finished. It returns to the Product Backlog for the Product Owner to reconsider." },
      { type: "heading", value: "The tester's role" },
      {
        type: "table",
        headers: ["When", "What the tester does"],
        rows: [
          ["Before", "Confirm which stories truly meet the DoD; prepare stable test data for the demo."],
          ["During", "Demo features or support the demo; explain quality status and known risks honestly."],
          ["After", "Turn feedback into new test ideas; help the PO write acceptance criteria for new items."]
        ]
      },
      {
        type: "example",
        title: "ShopEasy Sprint Review",
        value: "Sprint Goal: Let guests buy without creating an account.\nAttendees: the Scrum Team plus the head of sales and two customer support agents.\n\nDone: guest checkout form, card payment, email confirmation.\nNot Done: PayPal payment (a bug in refunds is still open). It is not shown as finished and goes back to the Product Backlog.\n\nRiya demos a guest buying 'Blue Sneakers' with a test card, and the confirmation email arriving.\nFeedback: Support says many guests later ask to track their order. The PO adds a new item: 'Guests can track an order using email and order number.'"
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a Definition of Done with five items for a ShopEasy team.",
          "A story is coded but two acceptance tests fail. Write what you would say about it at the Sprint Review.",
          "List three questions you would ask stakeholders to get useful feedback on a new search feature."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Who attends the Sprint Review? (The Scrum Team and stakeholders.)",
          "Is the Sprint Review only a slide presentation? (No. It is a working session to inspect and get feedback.)",
          "What happens to work that is not Done? (It is not shown as finished and returns to the Product Backlog.)",
          "What does the DoD typically include for QA? (Tests written and passing for the story.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A Sprint Review is like a chef inviting regular customers to taste new dishes before adding them to the menu. Only dishes that are fully cooked are served, and the customers' comments decide what the chef cooks next."
    },
    mistakes: [
      "Showing half-finished work as if it were Done.",
      "Treating the review as a one-way slide show with no feedback.",
      "Not inviting real stakeholders, so no useful feedback is collected.",
      "Hiding known bugs or risks during the demo.",
      "Forgetting to update the Product Backlog with the feedback."
    ],
    takeaways: [
      "The Sprint Review inspects the Increment with the Scrum Team and stakeholders.",
      "It is a working session focused on feedback, not only a demo.",
      "Only work that meets the Definition of Done is presented as finished.",
      "Feedback updates the Product Backlog for future Sprints.",
      "Testers make sure 'Done' really means tested and working."
    ]
  },

  'm5-l6': {
    id: "m5-l6",
    title: "Lesson 5.6 Sprint Retrospective",
    objectives: [
      "Explain the purpose of the Sprint Retrospective.",
      "Run a simple retrospective using a common format.",
      "Turn problems into clear, owned action items.",
      "Tell the difference between the Sprint Review and the Retrospective."
    ],
    theory: "The Sprint Retrospective is the last event of the Sprint. The Scrum Team looks at how the Sprint went (people, tools, processes, Definition of Done) and agrees on improvements. It focuses on team improvement, not blame.",
    blocks: [
      { type: "text", value: "After the Sprint Review, the Scrum Team meets one more time before the Sprint ends. This is the Sprint Retrospective, often called the 'retro'. The team talks about how they worked, not what they built." },
      { type: "text", value: "The goal is to find the most helpful changes to improve quality and effectiveness. The most important improvements can even be added to the next Sprint Backlog. For a one-month Sprint, the retro takes at most 3 hours; shorter Sprints usually have shorter retros." },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Sprint Retrospective", "The last Scrum event of a Sprint, used to plan improvements."],
          ["Continuous improvement", "Getting a little better every Sprint."],
          ["Action item", "A specific improvement the team agrees to try, with an owner."],
          ["Blameless", "Discussing problems without attacking or blaming people."],
          ["Psychological safety", "Feeling safe to speak honestly without fear."],
          ["Root cause", "The real reason a problem happened, not just its symptom."]
        ]
      },
      {
        type: "steps",
        title: "A simple retrospective flow",
        steps: [
          { label: "Set the stage", text: "Remind everyone the goal is improvement, not blame." },
          { label: "Gather data", text: "Everyone writes notes: what went well, what did not." },
          { label: "Find insights", text: "Group similar notes and look for root causes." },
          { label: "Decide actions", text: "Pick 1 to 3 specific improvements with owners." },
          { label: "Close", text: "Check last Sprint's actions: did they help?" }
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Start", tone: "olive", items: ["Things we should begin doing", "Example: 'Three amigos talk before each story'"] },
          { title: "Stop", tone: "rose", items: ["Things that are not helping", "Example: 'Stop merging code on the last day'"] },
          { title: "Continue", tone: "honey", items: ["Things that work well", "Example: 'Continue pairing testers with developers'"] }
        ]
      },
      {
        type: "example",
        title: "ShopEasy retrospective notes",
        value: "Went well:\n- Guest checkout was finished and demoed.\n- Riya and Chen pairing on payments found bugs early.\n\nDid not go well:\n- 4 stories were given to testing on the last 2 days.\n- The test server was down twice.\n- A refund bug was found late.\n\nRoot cause found: stories were too big, so coding took most of the Sprint and testing was squeezed at the end."
      },
      { type: "heading", value: "Turning problems into action items" },
      {
        type: "table",
        headers: ["Problem", "Action item (specific)", "Owner", "Check at next retro"],
        rows: [
          ["Testing squeezed at the end", "Split any story bigger than 8 points before Sprint Planning", "Priya (PO) with Developers", "Did any story reach testing in the last 2 days?"],
          ["Test server down", "Set up an alert when staging stops responding", "Leo (SM) with Ben", "Downtime hours this Sprint"],
          ["Refund bug found late", "Add refund cases to the automated regression suite", "Riya", "Are refund tests running on every build?"]
        ]
      },
      { type: "alert", value: "Keep action items few and specific. 'Communicate better' is not an action. 'Testers join the story kick-off for every story' is." },
      { type: "heading", value: "Sprint Review vs Sprint Retrospective" },
      {
        type: "table",
        headers: ["Aspect", "Sprint Review", "Sprint Retrospective"],
        rows: [
          ["Focus", "The product (what we built)", "The process (how we worked)"],
          ["Who attends", "Scrum Team and stakeholders", "Scrum Team"],
          ["Result", "Updated Product Backlog", "Improvement actions"],
          ["Order", "Before the retro", "Last event of the Sprint"],
          ["Max timebox (one-month Sprint)", "4 hours", "3 hours"]
        ]
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Think of your last group project. Write two Start, two Stop, and two Continue notes.",
          "Pick the biggest problem and ask 'why?' three times to find the root cause.",
          "Write one specific action item with an owner and a way to check it worked."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is the purpose of the retrospective? (To improve how the team works.)",
          "Which ceremony is held at the end of a Sprint to reflect and find improvements? (The Sprint Retrospective.)",
          "Does the retro focus on who made mistakes? (No. It is blameless and focuses on the process.)",
          "Which event comes first: the Review or the Retrospective? (The Sprint Review.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "After a match, a sports team watches the video together. They do not shout at one player. They ask: 'What worked? What should we practise this week?' Then they train on one or two things before the next game."
    },
    mistakes: [
      "Blaming individuals instead of looking at the process.",
      "Creating a long list of actions that nobody owns or follows.",
      "Writing vague actions like 'test more'.",
      "Skipping the retro when the Sprint went well.",
      "Never checking whether last Sprint's actions actually helped."
    ],
    takeaways: [
      "The Sprint Retrospective is the last event of the Sprint.",
      "It is about how the team works, not what they built.",
      "Keep it blameless and safe so everyone speaks honestly.",
      "Agree on a few specific action items with owners.",
      "Testers bring valuable quality data: late handoffs, escaped bugs, flaky environments."
    ]
  },

  'm5-l7': {
    id: "m5-l7",
    title: "Lesson 5.7 QA in Agile Teams",
    objectives: [
      "Explain the whole-team approach to quality.",
      "Describe what a tester does during each part of a Sprint.",
      "Use the Agile testing quadrants to plan different kinds of tests.",
      "Explain shift-left testing and the three amigos practice."
    ],
    theory: "In Agile teams, testing happens continuously throughout the Sprint instead of waiting for development to finish. The whole team owns quality, and testers help prevent bugs early, not just find them late.",
    blocks: [
      { type: "text", value: "In traditional projects, testers often waited for the developers to 'throw the code over the wall'. In Agile teams, testers are part of the team from the first idea to release. Quality is everyone's job." },
      { type: "text", value: "The tester's main question changes from 'Where are the bugs?' to 'How can we stop bugs from being created?'" },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Whole-team approach", "Everyone in the team is responsible for quality, not only testers."],
          ["Shift-left testing", "Starting testing activities earlier in the work, e.g. while writing requirements."],
          ["Three amigos", "A short talk between a business person (often the PO), a developer, and a tester about a story before coding."],
          ["Continuous testing", "Testing all the time, on every change, not only at the end."],
          ["Regression testing", "Re-testing old features to make sure new changes did not break them."],
          ["Continuous Integration (CI)", "Automatically building and testing code every time someone adds changes."],
          ["Test automation", "Using tools and scripts to run tests without manual clicking."]
        ]
      },
      {
        type: "compare",
        columns: [
          { title: "Traditional QA", tone: "rose", items: ["Separate test team", "Testing starts after coding ends", "Big test phase at the end", "Tester is the 'quality gate'", "Long bug reports sent by ticket"] },
          { title: "Agile QA", tone: "olive", items: ["Tester inside the Scrum Team", "Testing starts with the story idea", "Small, continuous testing every day", "Whole team owns quality", "Quick conversations, then short bug notes"] }
        ]
      },
      {
        type: "steps",
        title: "A tester's work across a two-week Sprint",
        steps: [
          { label: "Before the Sprint (refinement)", text: "Ask questions and help write acceptance criteria." },
          { label: "Sprint Planning", text: "Estimate test effort; add test tasks; point out risks." },
          { label: "Days 1-2", text: "Three amigos per story; write test cases and prepare test data." },
          { label: "Days 2-8", text: "Test each story as soon as it is ready; pair with developers; automate key checks." },
          { label: "Days 8-9", text: "Exploratory testing and regression testing, supported by automation in CI." },
          { label: "Day 10", text: "Confirm the Definition of Done; support the Sprint Review; share insights in the Retrospective." }
        ]
      },
      { type: "heading", value: "The Agile testing quadrants" },
      { type: "text", value: "The Agile testing quadrants (from Brian Marick, made popular by Lisa Crispin and Janet Gregory) help teams remember all kinds of testing, not just clicking through screens." },
      {
        type: "table",
        headers: ["Quadrant", "Focus", "Examples", "Often done by"],
        rows: [
          ["Q1", "Technology-facing, guides development", "Unit tests, component tests", "Developers, mostly automated"],
          ["Q2", "Business-facing, guides development", "Functional tests, story and acceptance tests, examples", "Testers, developers, and PO; manual and automated"],
          ["Q3", "Business-facing, critiques the product", "Exploratory testing, usability testing, user acceptance testing", "Testers and users, mostly manual"],
          ["Q4", "Technology-facing, critiques the product", "Performance, load, and security testing", "Specialists, using tools"]
        ]
      },
      {
        type: "example",
        title: "Three amigos at ShopEasy: 'Save for later'",
        value: "Story: As a shopper, I want to move an item from my cart to 'Saved for later', so that I can buy it another day.\n\nPriya (PO): Saved items should stay for 30 days.\nChen (developer): Do guests get this, or only logged-in users?\nRiya (tester): What happens if a saved item goes out of stock? And if the price changes, which price do we show?\n\nDecisions (in 15 minutes): only logged-in users; show an 'Out of stock' label; always show the current price.\nThese become acceptance criteria and test cases before any code is written. Three possible bugs were prevented, not found later."
      },
      { type: "warning", value: "Agile does not mean 'automate everything' or 'no testers needed'. Automation handles repeated checks; human testers are still needed for exploratory testing, usability, and asking good questions." },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Pick the ShopEasy search feature. Write one test idea for each of the four testing quadrants.",
          "Write three questions you would ask in a three amigos talk about a 'Product reviews' story.",
          "Plan your tester tasks for Days 1 to 10 of a Sprint that contains two stories."
        ]
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "When does testing happen in an Agile Sprint? (Continuously, from the start of each story.)",
          "Who is responsible for quality in an Agile team? (The whole team.)",
          "Who takes part in a three amigos talk? (A business person such as the PO, a developer, and a tester.)",
          "Which quadrant includes performance and security testing? (Q4.)",
          "Why does continuous testing help? (It prevents a testing bottleneck at the end of the Sprint and finds bugs when they are cheap to fix.)"
        ]
      }
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Traditional QA is like checking a cake only after it is baked, when it is too late to add sugar. Agile QA is like tasting the batter at every step, so the cake comes out right the first time."
    },
    mistakes: [
      "Waiting for all stories to be finished before starting to test.",
      "Thinking quality is only the tester's job.",
      "Skipping regression testing because 'we only changed a small thing'.",
      "Relying only on manual testing, which slows every Sprint.",
      "Relying only on automation and skipping exploratory testing."
    ],
    takeaways: [
      "Agile QA tests continuously throughout the Sprint.",
      "The whole team owns quality; testers lead quality thinking.",
      "Shift-left and three amigos help prevent bugs before coding.",
      "The four testing quadrants remind teams to cover all kinds of testing.",
      "Automation in CI supports fast regression; humans still explore.",
      "Continuous testing prevents bottlenecks at the end of Sprints."
    ]
  }
};
