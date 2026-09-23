import type { Lesson } from '../TestingCourseData';

/**
 * Expanded beginner lessons for Module 2 (Testing Fundamentals) and
 * Module 4 (Defect Management). Running demo app: "ShopEasy", a small
 * e-commerce site with login, search, cart and checkout.
 */
export const modules2And4Lessons: Record<string, Lesson> = {
  // ─────────────────────────────── MODULE 2 ───────────────────────────────
  'm2-l1': {
    id: "m2-l1",
    title: "Lesson 2.1 Testing Principles",
    objectives: [
      "Name the seven software testing principles from ISTQB.",
      "Explain each principle in simple words with a real example.",
      "Use the principles to decide what to test first on a real project.",
    ],
    theory:
      "The seven testing principles are basic rules that guide every tester: testing shows defects are present, exhaustive testing is impossible, test early, defects cluster, tests wear out (pesticide paradox), testing depends on context, and a bug-free system can still be useless.",
    blocks: [
      {
        type: "text",
        value:
          "Testing has a few basic rules that are true for almost every project. ISTQB (the International Software Testing Qualifications Board) lists seven of them. They are called the seven testing principles. They help you plan your work and avoid wrong ideas about what testing can do.",
      },
      {
        type: "text",
        value:
          "In this lesson we use one demo app for all examples: ShopEasy. ShopEasy is a small online shop. Users can log in, search for products, add them to a cart, and pay at checkout.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Defect (bug)", "A mistake in the software that can make it behave wrongly."],
          ["Principle", "A basic rule or truth that guides how you work."],
          ["Exhaustive testing", "Testing every possible input and every possible situation."],
          ["Risk", "The chance that something goes wrong, multiplied by how bad it would be."],
          ["Regression test", "A test you run again after a change, to check old features still work."],
          ["Context", "The situation of the project: type of app, users, rules, budget and time."],
        ],
      },
      { type: "heading", value: "The seven principles" },
      {
        type: "table",
        headers: ["#", "Principle", "What it means in plain words"],
        rows: [
          ["1", "Testing shows the presence of defects, not their absence", "Tests can prove that bugs exist. Tests can never prove that there are zero bugs."],
          ["2", "Exhaustive testing is impossible", "You cannot test every input and every combination. You must choose tests based on risk and priority."],
          ["3", "Early testing saves time and money", "Find problems as early as possible, even in requirements and designs. Early bugs are cheap to fix."],
          ["4", "Defects cluster together", "Most bugs are usually found in a small number of modules (areas of the app)."],
          ["5", "Tests wear out (pesticide paradox)", "If you run the same tests again and again, they stop finding new bugs. Review and add new tests."],
          ["6", "Testing is context dependent", "A banking app, a game and a medical device need different testing."],
          ["7", "Absence-of-defects fallacy", "A system with no known bugs can still fail if it does not meet user needs."],
        ],
      },
      { type: "heading", value: "Each principle with a ShopEasy example" },
      {
        type: "list",
        ordered: true,
        items: [
          "Presence of defects: You run 200 tests on ShopEasy and all pass. This does not mean ShopEasy has no bugs. It only means your 200 tests found none.",
          "Exhaustive testing is impossible: The search box accepts any text up to 100 characters. The number of possible inputs is huge. So you test groups of inputs (empty, normal word, special characters, very long text) instead.",
          "Early testing: While reading the checkout requirement, you notice it does not say what happens if the card is declined. You ask the team now. Fixing a sentence costs minutes. Fixing live code later costs days.",
          "Defect clustering: In the last three releases, 70% of ShopEasy bugs were in checkout and discount codes. So you spend more test time there.",
          "Pesticide paradox: Your login regression tests have found no new bugs for six months. You add new tests, such as login with a locked account or with spaces in the email.",
          "Context dependent: ShopEasy needs strong testing of payments and security. A simple company blog would not need the same level.",
          "Absence-of-defects fallacy: ShopEasy works perfectly, but checkout needs 9 screens. Customers leave before paying. No bugs, but the product still fails.",
        ],
      },
      {
        type: "alert",
        value:
          "Principle 2 is the reason testers prioritise by risk. Test the most important and most risky features first (for ShopEasy: login, payment, order total).",
      },
      {
        type: "warning",
        value:
          "\"All tests passed\" does not mean \"no bugs\". Say instead: \"No defects were found by the tests we ran.\"",
      },
      {
        type: "example",
        title: "Worked example: planning ShopEasy testing with the principles",
        value: `Situation: You have 3 days to test a new ShopEasy release.

1. Exhaustive testing is impossible -> list features and rank them by risk.
   High risk: checkout, payment, discount codes.
   Medium risk: search, cart.
   Low risk: "About us" page.
2. Defect clustering -> old bug data shows checkout had most bugs, so give it the most time.
3. Pesticide paradox -> review old checkout tests and add 5 new ones (expired card, 0 items in cart, very large quantity).
4. Context dependent -> money is involved, so include security checks on payment.
5. Absence-of-defects fallacy -> ask a real user to try checkout and see if it is easy to use.`,
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Pick an app you use every day (for example, a food delivery app).",
          "Write one sentence for each of the seven principles showing how it applies to that app.",
          "List the three features you think are most risky, and explain why.",
          "Suggest two new tests to fight the pesticide paradox for the login screen.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Can testing prove software has no bugs? (No. Testing shows the presence of defects, not their absence.)",
          "The same regression tests find fewer new bugs every release. Which principle is this? (Pesticide paradox / tests wear out.)",
          "Why must we prioritise tests by risk? (Because exhaustive testing is impossible.)",
          "80% of bugs are in the checkout module. Which principle? (Defect clustering.)",
          "An app has no bugs but users cannot find the Buy button. Which principle? (Absence-of-defects fallacy.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A doctor's check-up can find an illness, but it can never promise you are 100% healthy. The doctor also cannot run every possible medical test, so they choose tests based on your age, symptoms and risk.",
    },
    mistakes: [
      "Telling the team \"the app is bug-free\" because all tests passed.",
      "Trying to test every possible input instead of choosing tests by risk.",
      "Running the same old regression tests for years without reviewing or updating them.",
      "Waiting until the code is finished before starting any testing activity.",
      "Using the same test approach for every project, no matter the context.",
    ],
    takeaways: [
      "Testing can never prove a system is entirely bug-free; it only shows that defects exist.",
      "Exhaustive testing is impossible, so prioritise testing by risk.",
      "Test early: bugs found in requirements are the cheapest to fix.",
      "Bugs cluster in a few modules, so focus effort where bugs were found before.",
      "Update tests regularly to beat the pesticide paradox.",
      "Working software with no bugs is still a failure if it does not meet user needs.",
    ],
  },

  'm2-l2': {
    id: "m2-l2",
    title: "Lesson 2.2 Test Levels",
    objectives: [
      "Distinguish Unit, Integration, System, and Acceptance testing.",
      "Say who usually performs each test level and what it targets.",
      "Give a ShopEasy example for each level.",
    ],
    theory:
      "Test levels group testing by the size of what is tested: Unit (one small piece of code), Integration (pieces working together), System (the complete application) and Acceptance (users or customers confirm it meets their needs).",
    blocks: [
      {
        type: "text",
        value:
          "Software is built from small pieces. Small pieces join into bigger parts. Bigger parts make the full application. We test at each of these steps. Each step is called a test level.",
      },
      {
        type: "text",
        value:
          "The four main test levels are Unit, Integration, System and Acceptance. They go from small to big, and from the developer's view to the business user's view.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Test level", "A group of test activities that focus on one size of the software (small part, whole system, and so on)."],
          ["Unit (component)", "The smallest testable part of the code, such as one function, method or class. ISTQB calls this component testing."],
          ["Integration", "Joining two or more parts so they work together, such as the app and a payment service."],
          ["System", "The complete, fully built application."],
          ["Acceptance", "The final check by users or customers that the software is ready for them."],
          ["UAT", "User Acceptance Testing: real users try the system to confirm it meets their needs."],
          ["Stub / driver", "Simple fake code that stands in for a missing part during testing."],
        ],
      },
      { type: "heading", value: "The four levels" },
      {
        type: "steps",
        title: "From small to big",
        steps: [
          { label: "1. Unit testing", text: "Test one function alone. Usually done by developers, often automated (for example with JUnit)." },
          { label: "2. Integration testing", text: "Test how parts talk to each other: modules, APIs, databases, third-party services." },
          { label: "3. System testing", text: "Test the whole application end to end, against the requirements. Usually done by the QA team." },
          { label: "4. Acceptance testing", text: "Business users or customers check the system meets their needs before go-live. Closest to the business user." },
        ],
      },
      {
        type: "table",
        headers: ["Level", "What is tested", "Who usually tests", "ShopEasy example"],
        rows: [
          ["Unit", "One function or class", "Developers", "calculateTotal() returns 250 for items priced 100 and 150."],
          ["Integration", "Connections between parts", "Developers or testers", "Cart service sends the correct total to the payment gateway."],
          ["System", "The complete app", "Independent QA team", "A user logs in, searches, adds to cart and pays successfully."],
          ["Acceptance", "Business needs", "Customer, product owner, end users", "Shop owner confirms orders appear correctly in the admin report."],
        ],
      },
      { type: "heading", value: "A small unit test example" },
      {
        type: "text",
        value: "Here is a unit test a ShopEasy developer might write in Java with JUnit. It tests only one method, with nothing else involved.",
      },
      {
        type: "code",
        language: "java",
        value: `@Test
void totalIsSumOfItemPrices() {
    Cart cart = new Cart();
    cart.add(new Item("Pen", 100));
    cart.add(new Item("Bag", 150));

    assertEquals(250, cart.calculateTotal());
}`,
      },
      {
        type: "alert",
        value:
          "Types of acceptance testing include User Acceptance Testing (UAT), Operational Acceptance Testing (by operations/admin staff), Contract and Regulatory acceptance, and Alpha/Beta testing (alpha at the developer's site, beta by real users at their own place).",
      },
      {
        type: "example",
        title: "Worked example: one bug, four levels",
        value: `Feature: 10% discount code "SAVE10" at ShopEasy checkout.

Unit: applyDiscount(200, "SAVE10") should return 180.
Integration: the checkout page calls the Discount API and shows 180.
System: a tester logs in, adds 200 worth of items, enters SAVE10, pays, and sees 180 on the receipt email.
Acceptance: the marketing manager confirms the code works for the campaign and ends on the right date.

A bug found at unit level costs minutes. The same bug found by customers after release costs money and trust.`,
      },
      {
        type: "warning",
        value: "Do not skip lower levels and hope system testing will catch everything. Bugs are harder to find and more expensive to fix later.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Choose the ShopEasy search feature.",
          "Write one test idea for each level: unit, integration, system, acceptance.",
          "For each idea, write who would most likely run it.",
          "Mark which of your tests could be automated easily.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Which level is closest to the business user? (Acceptance testing.)",
          "Testing that the app sends the right data to a payment API is which level? (Integration testing.)",
          "Who usually writes unit tests? (Developers.)",
          "Testing the full app against the requirements, end to end, is which level? (System testing.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Building a car: first you test each part, like the brakes (unit). Then you test the brakes connected to the pedal (integration). Then you drive the finished car on a test track (system). Finally the customer takes a test drive before buying (acceptance).",
    },
    mistakes: [
      "Thinking testers only do system testing and developers do nothing.",
      "Confusing integration testing (parts together) with system testing (whole app).",
      "Skipping acceptance testing because \"QA already tested it\".",
      "Believing each level must use a different tool; the level is about scope, not tools.",
    ],
    takeaways: [
      "Each test level targets a different scope and objective.",
      "Unit tests check one small piece of code, usually by developers.",
      "Integration tests check that parts work together correctly.",
      "System tests check the complete application against requirements.",
      "Acceptance testing is closest to the business user and confirms the software is ready.",
    ],
  },

  'm2-l3': {
    id: "m2-l3",
    title: "Lesson 2.3 Functional Testing",
    objectives: [
      "Define functional testing and functional requirements.",
      "Design simple functional test flows for a feature.",
      "Explain smoke, sanity and regression testing and when to use each.",
    ],
    theory:
      "Functional testing checks what the system does: does each feature behave as the requirements say? Common types are smoke, sanity and regression testing.",
    blocks: [
      {
        type: "text",
        value:
          "Functional testing checks what the software does. You compare the real behaviour with the requirement. If the requirement says \"the user can log in with email and password\", you test exactly that.",
      },
      {
        type: "text",
        value:
          "You do not need to see the code. You give an input, you perform an action, and you check the output.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Functional requirement", "A statement of what the system must do, e.g. \"Users can add items to the cart\"."],
          ["Test case", "A written set of steps, input data and the expected result."],
          ["Expected result", "What should happen according to the requirement."],
          ["Actual result", "What really happened when you ran the test."],
          ["Smoke testing", "A quick, wide check that the most important features work, so the build is stable enough to test further."],
          ["Sanity testing", "A quick, narrow check of one changed area after a small fix or change."],
          ["Regression testing", "Re-running tests after a change to make sure old features still work."],
        ],
      },
      { type: "heading", value: "How to design a functional test flow" },
      {
        type: "steps",
        title: "From requirement to result",
        steps: [
          { label: "Read the requirement", text: "Understand what the feature must do. Ask questions if something is unclear." },
          { label: "List test conditions", text: "What must be checked? Valid login, wrong password, empty fields, locked account." },
          { label: "Write test cases", text: "Add steps, test data and the expected result for each condition." },
          { label: "Execute", text: "Run the steps on the app and record the actual result." },
          { label: "Compare and report", text: "If actual differs from expected, log a defect." },
        ],
      },
      {
        type: "example",
        title: "Worked example: ShopEasy login test cases",
        value: `Requirement: A registered user can log in with a valid email and password. Wrong details show "Invalid email or password".

TC-01 Valid login
  Steps: Open login page -> enter asha@test.com / Pass@123 -> click Log in
  Expected: Home page opens, "Hi Asha" is shown.

TC-02 Wrong password
  Steps: enter asha@test.com / wrong123 -> click Log in
  Expected: Error "Invalid email or password". User stays on login page.

TC-03 Empty fields
  Steps: leave both fields empty -> click Log in
  Expected: "Email is required" and "Password is required" messages.`,
      },
      { type: "heading", value: "Smoke vs sanity vs regression" },
      {
        type: "compare",
        columns: [
          {
            title: "Smoke",
            subtitle: "Is the build stable?",
            tone: "olive",
            items: [
              "Wide but shallow",
              "Run on every new build",
              "ShopEasy: app opens, login works, search returns results, checkout page loads",
              "If it fails, reject the build",
            ],
          },
          {
            title: "Sanity",
            subtitle: "Does the fix make sense?",
            tone: "honey",
            items: [
              "Narrow and focused",
              "Run after a small change or bug fix",
              "ShopEasy: discount code bug fixed, so check discount codes quickly",
              "Often unscripted",
            ],
          },
          {
            title: "Regression",
            subtitle: "Did we break anything?",
            tone: "rose",
            items: [
              "Wide and deep",
              "Run after changes, before release",
              "ShopEasy: after a new payment option, re-test login, cart, checkout",
              "Good candidate for automation",
            ],
          },
        ],
      },
      {
        type: "alert",
        value:
          "Other functional test types include end-to-end testing, UI testing, API testing and database testing. Regression testing can also include non-functional checks, but it is most often used to re-check functions.",
      },
      {
        type: "warning",
        value: "Always write the expected result before you run the test. If you decide it after seeing the output, you may accept a bug as \"normal\".",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Read this requirement: \"Users can add a product to the cart. The cart icon shows the number of items.\"",
          "Write three test cases (one positive, two negative or edge cases) with steps and expected results.",
          "Write a five-item smoke test list for ShopEasy.",
          "Decide: the team fixed a typo in the cart page. Would you run smoke, sanity or full regression? Explain why.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Does functional testing check what the system does or how well it does it? (What it does.)",
          "Which testing is a quick, wide check that a new build is stable? (Smoke testing.)",
          "A new feature was added. Which testing checks old features still work? (Regression testing.)",
          "Is checking a login form's error message functional or non-functional? (Functional.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Testing a new TV remote: you press each button and check that it does its job. Power turns the TV on, volume up makes it louder. You are checking what it does, not how fast or how long the battery lasts.",
    },
    mistakes: [
      "Testing only the happy path (valid inputs) and forgetting wrong or empty inputs.",
      "Mixing up smoke and sanity testing.",
      "Skipping regression testing after a \"small\" change.",
      "Writing test cases without a clear expected result.",
    ],
    takeaways: [
      "Functional tests verify what the system does.",
      "Every functional test compares an actual result with an expected result from the requirements.",
      "Smoke testing is wide and shallow; it checks the build is stable.",
      "Sanity testing is narrow; it checks a specific change or fix.",
      "Regression testing checks that changes did not break existing features.",
    ],
  },

  'm2-l4': {
    id: "m2-l4",
    title: "Lesson 2.4 Non-Functional Testing",
    objectives: [
      "Identify non-functional requirements.",
      "Explain the main types: performance, load, stress, security, usability, reliability, scalability.",
      "Write measurable non-functional test ideas.",
    ],
    theory:
      "Non-functional testing checks how well the system works: speed, capacity under load, security, reliability, scalability and ease of use.",
    blocks: [
      {
        type: "text",
        value:
          "Functional testing asks \"Does the feature work?\" Non-functional testing asks \"How well does it work?\" A login page can work correctly but take 30 seconds. That is a non-functional problem.",
      },
      {
        type: "text",
        value:
          "Non-functional requirements are often called quality attributes. Good ones have numbers, so they can be measured.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Non-functional requirement", "A rule about quality, e.g. \"Search results appear in under 2 seconds\"."],
          ["Response time", "How long the system takes to answer a request."],
          ["Concurrent users", "Users using the system at the same time."],
          ["Throughput", "How many requests or transactions the system handles per second."],
          ["Vulnerability", "A weakness an attacker could use."],
          ["Usability", "How easy and pleasant the software is to use."],
        ],
      },
      { type: "heading", value: "Main types of non-functional testing" },
      {
        type: "table",
        headers: ["Type", "Question it answers", "ShopEasy example"],
        rows: [
          ["Performance", "Is it fast enough?", "Home page loads in under 3 seconds."],
          ["Load", "Does it work with the expected number of users?", "1,000 users shop at the same time with no errors."],
          ["Stress", "What happens beyond the limit?", "Push to 10,000 users and see how and when it breaks, and if it recovers."],
          ["Security", "Is data safe from attackers?", "Card numbers are encrypted; SQL injection in search is blocked."],
          ["Usability", "Is it easy to use?", "A new user can buy a product in under 2 minutes without help."],
          ["Reliability", "Does it keep working over time?", "Checkout runs 24 hours with no crashes."],
          ["Scalability", "Can it grow?", "Adding a server lets it handle twice the users."],
          ["Compatibility", "Does it work everywhere?", "Works in Chrome, Firefox, Safari and on mobile."],
        ],
      },
      {
        type: "compare",
        columns: [
          { title: "Functional", subtitle: "What the system does", tone: "olive", items: ["Login with valid details works", "Discount code reduces the total", "Order confirmation email is sent"] },
          { title: "Non-functional", subtitle: "How well it does it", tone: "honey", items: ["Login answers in under 1 second", "Checkout handles 1,000 users at once", "Password is stored encrypted"] },
        ],
      },
      {
        type: "example",
        title: "Worked example: turning a vague need into a testable one",
        value: `Vague: "ShopEasy should be fast."

Measurable:
- Search results appear in 2 seconds or less for 95% of searches.
- With 1,000 concurrent users, checkout error rate stays below 1%.

Test idea (load test with a tool like JMeter or k6):
1. Create a script: login -> search "shoes" -> add to cart -> checkout.
2. Ramp up from 0 to 1,000 virtual users over 10 minutes.
3. Hold for 30 minutes.
4. Record response times and errors.
5. Pass if 95% of searches <= 2 s and errors < 1%.`,
      },
      {
        type: "alert",
        value: "Common tools: JMeter, k6 and Gatling for performance/load; OWASP ZAP and Burp Suite for security; Lighthouse for web page speed and accessibility.",
      },
      {
        type: "warning",
        value: "Do not run load or stress tests on the live production site without permission. You could slow it down for real customers.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write three non-functional requirements for ShopEasy search, each with a number.",
          "For each, name the testing type (performance, load, security, usability...).",
          "Open any shopping website and time how long the home page takes to load. Is it acceptable?",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Is load testing functional or non-functional? (Non-functional.)",
          "Checking the app with users beyond its limit is called? (Stress testing.)",
          "\"Checkout calculates the right total\" is functional or non-functional? (Functional.)",
          "Why should non-functional requirements include numbers? (So they can be measured and clearly pass or fail.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A restaurant can serve the right dish (functional). But if the food takes two hours, the kitchen is dirty, or it cannot serve a full room on Saturday night, customers still leave unhappy. Non-functional testing checks those things.",
    },
    mistakes: [
      "Leaving non-functional testing until the very end of the project.",
      "Writing vague requirements like \"the site must be fast\" with no numbers.",
      "Thinking load testing and stress testing are the same.",
      "Testing performance on a small test server and assuming production will behave the same.",
    ],
    takeaways: [
      "Non-functional testing verifies how the system performs.",
      "Main types include performance, load, stress, security, usability, reliability and scalability.",
      "Good non-functional requirements are measurable.",
      "Load testing uses expected users; stress testing goes beyond the limit.",
      "Special tools such as JMeter or OWASP ZAP are often needed.",
    ],
  },

  'm2-l5': {
    id: "m2-l5",
    title: "Lesson 2.5 Black Box Testing",
    objectives: [
      "Explain black box testing and when to use it.",
      "Implement black box testing techniques: equivalence partitioning and boundary value analysis.",
      "Know other black box techniques: decision tables and state transition testing.",
    ],
    theory:
      "Black box testing examines system behaviour without knowing its internal code. The tester designs tests from requirements, using inputs and expected outputs.",
    blocks: [
      {
        type: "text",
        value:
          "In black box testing you treat the software like a closed black box. You cannot see inside. You only know what goes in (input) and what should come out (output). Tests are based on requirements, not on code.",
      },
      {
        type: "text",
        value:
          "Most manual testers do black box testing every day. It is used at all test levels, but it is most common in system and acceptance testing.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Black box testing", "Testing based on requirements and behaviour, without looking at the code. Also called specification-based testing."],
          ["Equivalence partitioning (EP)", "Splitting inputs into groups that the system should treat the same. Test one value from each group."],
          ["Boundary value analysis (BVA)", "Testing values at the edges of each group, where bugs often hide."],
          ["Decision table", "A table of combinations of conditions and the action for each combination."],
          ["State transition testing", "Testing how the system moves between states, e.g. Logged out -> Logged in -> Locked."],
          ["Valid / invalid partition", "A group of inputs the system should accept / should reject."],
        ],
      },
      { type: "heading", value: "Technique 1: Equivalence partitioning" },
      {
        type: "text",
        value:
          "Requirement: ShopEasy lets you buy a quantity of 1 to 10 of a product. We split inputs into three groups. We test one value from each group, because all values in a group should behave the same.",
      },
      {
        type: "table",
        headers: ["Partition", "Range", "Sample value", "Expected result"],
        rows: [
          ["Invalid (too low)", "0 or less", "-2", "Error: \"Quantity must be 1 to 10\""],
          ["Valid", "1 to 10", "5", "Item added to cart"],
          ["Invalid (too high)", "11 or more", "15", "Error: \"Quantity must be 1 to 10\""],
        ],
      },
      { type: "heading", value: "Technique 2: Boundary value analysis" },
      {
        type: "text",
        value:
          "Developers often make mistakes at edges, for example writing < instead of <=. So we test the boundary values and the values just outside them.",
      },
      {
        type: "table",
        headers: ["Value", "Why", "Expected"],
        rows: [
          ["0", "Just below the lower edge", "Rejected"],
          ["1", "Lower edge", "Accepted"],
          ["10", "Upper edge", "Accepted"],
          ["11", "Just above the upper edge", "Rejected"],
        ],
      },
      { type: "heading", value: "Technique 3: Decision table" },
      {
        type: "text",
        value: "Rule: Free delivery if the order is 500 or more OR the user is a Premium member.",
      },
      {
        type: "table",
        headers: ["Rule", "Order >= 500?", "Premium member?", "Free delivery?"],
        rows: [
          ["R1", "Yes", "Yes", "Yes"],
          ["R2", "Yes", "No", "Yes"],
          ["R3", "No", "Yes", "Yes"],
          ["R4", "No", "No", "No"],
        ],
      },
      {
        type: "example",
        title: "Worked example: state transition for ShopEasy login",
        value: `Rule: After 3 wrong passwords in a row, the account is locked.

States: Logged out -> (wrong password x1) -> 1 failure -> (x2) -> 2 failures -> (x3) -> Locked
        Any failure state -> (correct password) -> Logged in

Tests:
1. Wrong, wrong, correct -> Expected: logged in, counter resets.
2. Wrong, wrong, wrong -> Expected: "Account locked" message.
3. Locked, then correct password -> Expected: still locked.`,
      },
      {
        type: "compare",
        columns: [
          { title: "Advantages", tone: "olive", items: ["No coding knowledge needed", "Tests from the user's point of view", "Tester is independent from the developer's thinking"] },
          { title: "Limitations", tone: "rose", items: ["Some code paths may never be tested", "Hard to design tests if requirements are unclear", "Cannot show exactly where in the code a bug is"] },
        ],
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Requirement: ShopEasy passwords must be 8 to 16 characters long.",
          "Write the equivalence partitions (valid and invalid).",
          "Write the boundary values you would test (hint: 7, 8, 16, 17).",
          "Make a decision table for: 10% discount if the user is new AND uses code WELCOME.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Does a black box tester need to read the code? (No. Tests come from requirements and behaviour.)",
          "An age field accepts 18 to 60. Which boundary values do you test? (17, 18, 60, 61.)",
          "Which technique groups inputs that behave the same? (Equivalence partitioning.)",
          "Which technique suits rules with many condition combinations? (Decision table testing.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Using a coffee machine: you press \"Latte\" and check that a latte comes out. You do not open the machine to look at pipes and wires. You only care that the right input gives the right output.",
    },
    mistakes: [
      "Testing many values from the same partition (e.g. 3, 4, 5, 6) and missing the edges.",
      "Forgetting invalid partitions, such as negative numbers or letters in a number field.",
      "Testing only the boundary value and not the value just outside it.",
      "Thinking black box testing means \"random clicking\" with no technique.",
    ],
    takeaways: [
      "Black box testing focuses on input parameters and expected output values.",
      "It is designed from requirements, not from the code.",
      "Equivalence partitioning reduces the number of tests by grouping similar inputs.",
      "Boundary value analysis tests the edges, where bugs are common.",
      "Decision tables and state transitions help with rules and workflows.",
    ],
  },

  'm2-l6': {
    id: "m2-l6",
    title: "Lesson 2.6 White Box Testing",
    objectives: [
      "Explain white box testing and who usually performs it.",
      "Explain code coverage metrics: statement coverage and branch (decision) coverage.",
      "Design tests to cover every branch of a small method.",
    ],
    theory:
      "White box testing designs tests from the internal code structure: statements, branches, loops and paths. It needs access to the source code.",
    blocks: [
      {
        type: "text",
        value:
          "In white box testing you can see inside the box: the source code. You design tests so that the code's statements, decisions and paths are actually run. It is also called structure-based, glass box or clear box testing.",
      },
      {
        type: "text",
        value:
          "White box testing is commonly done by developers during unit testing. Testers with coding skills also use it, for example to check automated test coverage.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Statement", "One line or instruction of code that runs."],
          ["Branch (decision outcome)", "One possible direction after a decision, e.g. the true or false side of an if."],
          ["Path", "One complete route through the code from start to end."],
          ["Code coverage", "The percentage of code that your tests actually ran."],
          ["Statement coverage", "Executed statements / total statements x 100%."],
          ["Branch coverage", "Executed branches / total branches x 100%. Also called decision coverage."],
        ],
      },
      { type: "heading", value: "A ShopEasy method to test" },
      {
        type: "text",
        value:
          "This Java method calculates the delivery fee. Orders of 500 or more get free delivery. Premium members always pay half the normal fee.",
      },
      {
        type: "code",
        language: "java",
        value: `public int deliveryFee(int orderTotal, boolean isPremium) {
    int fee = 50;                  // S1
    if (orderTotal >= 500) {       // Decision D1
        fee = 0;                   // S2  (D1 true)
    } else if (isPremium) {        // Decision D2  (D1 false)
        fee = 25;                  // S3  (D2 true)
    }                              //     (D2 false: keep 50)
    return fee;                    // S4
}`,
      },
      {
        type: "text",
        value:
          "There are two decisions, D1 and D2. Each has a true and a false branch, so there are 4 branches in total. There are 3 routes: free, premium half price, and normal fee.",
      },
      { type: "heading", value: "Tests to cover every branch" },
      {
        type: "table",
        headers: ["Test", "orderTotal", "isPremium", "Branches run", "Expected fee"],
        rows: [
          ["T1", "600", "false", "D1 true", "0"],
          ["T2", "200", "true", "D1 false, D2 true", "25"],
          ["T3", "200", "false", "D1 false, D2 false", "50"],
        ],
      },
      {
        type: "example",
        title: "Worked example: statement vs branch coverage",
        value: `Run only T1 and T2:
  Statements run: S1, S2, S3, S4 = 4 of 4 -> 100% statement coverage.
  Branches run: D1 true, D1 false, D2 true = 3 of 4 -> 75% branch coverage.
  D2 false (normal fee of 50) was never tested!

Add T3:
  Branches run: 4 of 4 -> 100% branch coverage.

Lesson: 100% statement coverage does not mean 100% branch coverage.
100% branch coverage always gives 100% statement coverage.`,
      },
      {
        type: "code",
        language: "java",
        value: `@Test void freeDeliveryAt500OrMore() { assertEquals(0,  fees.deliveryFee(600, false)); }
@Test void premiumPaysHalf()          { assertEquals(25, fees.deliveryFee(200, true)); }
@Test void normalFeeOtherwise()       { assertEquals(50, fees.deliveryFee(200, false)); }`,
      },
      {
        type: "alert",
        value: "Coverage tools measure this for you: JaCoCo (Java), Istanbul/nyc (JavaScript), coverage.py (Python).",
      },
      {
        type: "warning",
        value: "High coverage does not mean no bugs. If the requirement said free delivery starts at 499, all three tests would pass but the code would still be wrong. Coverage shows what code ran, not whether the code is correct for the user.",
      },
      {
        type: "compare",
        columns: [
          { title: "Black box", subtitle: "Outside view", tone: "honey", items: ["Based on requirements", "No code knowledge needed", "Mostly testers", "Finds missing features"] },
          { title: "White box", subtitle: "Inside view", tone: "olive", items: ["Based on code structure", "Needs programming knowledge", "Mostly developers", "Finds untested code and logic errors"] },
        ],
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Look at this logic: if (age < 18) return \"child\"; else if (age >= 65) return \"senior\"; else return \"adult\";",
          "Count the decisions and branches.",
          "Write the smallest set of test inputs that gives 100% branch coverage.",
          "Add boundary values (17, 18, 64, 65) and explain why they help even after full coverage.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "White box tests are designed from what? (The internal code structure.)",
          "Does 100% statement coverage guarantee 100% branch coverage? (No.)",
          "How many branches does one simple if-else decision have? (Two: true and false.)",
          "At which level is white box testing most common? (Unit testing, by developers.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A mechanic checks a car with the bonnet open. They look at every pipe and wire and make sure each one is tested, not just that the car drives.",
    },
    mistakes: [
      "Believing 100% code coverage means the software has no bugs.",
      "Stopping at statement coverage and missing the false side of an if.",
      "Writing tests that run code but do not check (assert) the result.",
      "Thinking only developers can ever do white box testing.",
    ],
    takeaways: [
      "White box testing is designed from the internal code structure.",
      "It is commonly performed by developers during unit testing.",
      "Statement coverage counts lines run; branch coverage counts decision outcomes run.",
      "100% branch coverage includes 100% statement coverage, but not the other way round.",
      "Coverage tools like JaCoCo measure coverage automatically.",
    ],
  },

  'm2-l7': {
    id: "m2-l7",
    title: "Lesson 2.7 Grey Box Testing",
    objectives: [
      "Define grey box testing and how it combines black and white box techniques.",
      "Use limited knowledge of APIs and databases to design better tests.",
      "Know where grey box testing is most useful.",
    ],
    theory:
      "Grey box testing combines black box testing from the user's side with partial knowledge of the inside, such as the database design or API endpoints, but not the full code.",
    blocks: [
      {
        type: "text",
        value:
          "Grey box testing sits between black box and white box. You test through the user interface or API like a black box tester. But you also know some things about the inside, such as database tables, API documentation or the system architecture.",
      },
      {
        type: "text",
        value:
          "This extra knowledge helps you design smarter tests and check results more deeply. You still do not read or test the code line by line.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Grey box testing", "Testing with partial knowledge of the internal structure."],
          ["API", "Application Programming Interface: a way for programs to talk to each other."],
          ["Endpoint", "One address of an API, e.g. POST /api/cart/items."],
          ["Database schema", "The design of the database: its tables, columns and links."],
          ["Architecture diagram", "A picture showing the main parts of a system and how they connect."],
        ],
      },
      {
        type: "compare",
        columns: [
          { title: "Black box", subtitle: "No inside knowledge", tone: "honey", items: ["Uses requirements only", "Checks the screen output"] },
          { title: "Grey box", subtitle: "Some inside knowledge", tone: "olive", items: ["Uses requirements + API docs, DB schema", "Checks screen, API responses and database"] },
          { title: "White box", subtitle: "Full code knowledge", tone: "rose", items: ["Uses the source code", "Checks statements, branches, paths"] },
        ],
      },
      { type: "heading", value: "Worked example: placing an order" },
      {
        type: "example",
        title: "Grey box test: ShopEasy checkout creates an order",
        value: `What the tester knows (not the code):
- API docs: POST /api/orders creates an order.
- DB schema: table "orders" has columns id, user_id, total, status.

Steps:
1. Log in as asha@test.com and add 2 items (100 + 150) to the cart.
2. Click "Place order" in the UI.
3. Check the UI: "Order confirmed" message is shown.   (black box part)
4. Check the network tab: POST /api/orders returned 201 Created.
5. Run a database query to check the saved order.     (grey box part)

Expected: one row with total 250 and status PLACED.`,
      },
      {
        type: "code",
        language: "sql",
        value: `SELECT id, total, status
FROM orders
WHERE user_id = 42
ORDER BY id DESC
LIMIT 1;`,
      },
      {
        type: "code",
        language: "json",
        value: `{
  "orderId": 9001,
  "total": 250,
  "status": "PLACED"
}`,
      },
      {
        type: "text",
        value:
          "A pure black box tester would only see \"Order confirmed\". But imagine the database saved a total of 0. The screen looks fine, yet the business loses money. The grey box check catches it.",
      },
      { type: "heading", value: "Where grey box testing is useful" },
      {
        type: "list",
        items: [
          "Web services and API testing (for example with Postman).",
          "Integration testing, where you check data passes correctly between parts.",
          "Database-driven apps, where you confirm data is saved correctly.",
          "Security testing, where knowing the architecture shows weak points.",
        ],
      },
      {
        type: "warning",
        value: "Only run read queries (SELECT) on shared test databases unless you are allowed to change data. Never test directly on the production database.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Imagine ShopEasy has a \"users\" table with columns email, password_hash, is_locked.",
          "Design a grey box test for \"account locks after 3 wrong passwords\".",
          "Write what you check in the UI and what you check in the database.",
          "Add one check you would do on the API response.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What does a grey box tester know? (Partial inside knowledge, e.g. APIs or database design, but not the full code.)",
          "Why check the database after placing an order? (The UI can look correct while the saved data is wrong.)",
          "Name one area where grey box testing is common. (API/web services, integration or database testing.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A home inspector does not take the walls apart, but has the building plans. They test the taps like a normal user, and because they know where the pipes run, they also check under the sink for leaks.",
    },
    mistakes: [
      "Thinking grey box testing means reading all the source code.",
      "Checking only the UI message and not the saved data.",
      "Changing data in shared databases during checks without permission.",
      "Using old or wrong API documentation as your inside knowledge.",
    ],
    takeaways: [
      "Grey box testing combines black box user-level testing with limited inside knowledge.",
      "Typical inside knowledge: API endpoints, database schema, architecture.",
      "It catches bugs where the screen looks right but the data is wrong.",
      "Great for web services, integration testing and database-driven apps.",
    ],
  },

  'm2-l8': {
    id: "m2-l8",
    title: "Lesson 2.8 Verification vs Validation",
    objectives: [
      "Distinguish verification from validation.",
      "Link verification to static activities (reviews, walkthroughs, inspections).",
      "Link validation to dynamic activities (executing the software).",
    ],
    theory:
      "Verification asks: \"Are we building the product right?\" It uses static checks of documents and design, such as reviews and walkthroughs. Validation asks: \"Are we building the right product?\" It runs the software to check it meets user needs.",
    blocks: [
      {
        type: "text",
        value:
          "Verification and validation sound similar, but they answer two different questions. Both are needed for quality. Together they are often shortened to V&V.",
      },
      {
        type: "list",
        items: [
          "Verification: Are we building the product right? (Does the work follow the specification?)",
          "Validation: Are we building the right product? (Does the working software meet the user's real needs?)",
        ],
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Verification", "Checking documents, designs and code against specifications, without running the software."],
          ["Validation", "Running the software to check it behaves correctly and meets user needs."],
          ["Static testing", "Testing without executing code, e.g. reviews."],
          ["Dynamic testing", "Testing by executing the code."],
          ["Review", "People read a work product (requirement, design, code) to find problems."],
          ["Walkthrough", "The author guides the team through a document to explain it and collect feedback."],
          ["Inspection", "A formal review with roles, checklists and recorded defects."],
        ],
      },
      { type: "heading", value: "Side by side" },
      {
        type: "compare",
        columns: [
          {
            title: "Verification",
            subtitle: "Building it right",
            tone: "olive",
            items: [
              "Static: the software is not executed",
              "Checks requirements, design documents, code",
              "Methods: reviews, walkthroughs, inspections, static analysis",
              "Done early, before and during coding",
              "Finds defects in documents and design",
            ],
          },
          {
            title: "Validation",
            subtitle: "Building the right thing",
            tone: "honey",
            items: [
              "Dynamic: the software is executed",
              "Checks the actual working product",
              "Methods: functional, system, acceptance testing",
              "Done after code is ready to run",
              "Finds failures when the software runs",
            ],
          },
        ],
      },
      {
        type: "table",
        headers: ["Question", "Verification", "Validation"],
        rows: [
          ["Is code executed?", "No", "Yes"],
          ["Main question", "Are we building the product right?", "Are we building the right product?"],
          ["Typical input", "Documents, designs, code listings", "Running application"],
          ["Cost of fixing what it finds", "Usually lower (found early)", "Usually higher (found later)"],
        ],
      },
      {
        type: "example",
        title: "Worked example: ShopEasy password reset",
        value: `Verification (static, no running software):
- The team reviews the requirement: "Reset link expires after 24 hours."
- A tester notices in a walkthrough that the design shows no "resend link" option.
- A code review finds the expiry is set to 24 minutes, not 24 hours.

Validation (dynamic, running software):
- A tester clicks "Forgot password", receives the email and resets the password.
- A tester waits past the expiry time and confirms the link no longer works.
- In UAT, real users try the flow and confirm it is easy to follow.`,
      },
      {
        type: "alert",
        value: "Easy memory trick: Verification = Very early, on documents (static). Validation = Values the user sees, while running (dynamic).",
      },
      {
        type: "warning",
        value: "Do not swap the two questions. \"Building it right\" is verification; \"building the right thing\" is validation.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Label each activity V (verification) or VA (validation): code review; running a login test; reading the checkout design; UAT; spell-checking the requirements.",
          "For the ShopEasy search feature, write one verification activity and one validation activity.",
          "Explain in one sentence why doing both saves money.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Which asks \"Are we building the product right?\" (Verification.)",
          "Does verification execute the software? (No. It uses static reviews and walkthroughs.)",
          "Is User Acceptance Testing verification or validation? (Validation.)",
          "Is a code review verification or validation? (Verification.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Baking a birthday cake: verification is checking the recipe and the ingredient list before you bake (are we following the recipe right?). Validation is tasting the finished cake and asking the child if it is the cake they wanted (did we make the right cake?).",
    },
    mistakes: [
      "Swapping the two questions: verification is \"building it right\", validation is \"building the right thing\".",
      "Thinking verification involves running the software.",
      "Skipping reviews because \"testing will catch it later\".",
      "Believing validation is only done by testers; users also validate in acceptance testing.",
    ],
    takeaways: [
      "Verification: \"Are we building the product right?\" Validation: \"Are we building the right product?\"",
      "Verification focuses on documentation and design using static reviews and walkthroughs.",
      "Validation focuses on code execution: running the software.",
      "Verification is done early, so the problems it finds are cheaper to fix.",
      "Quality needs both: a product built correctly and a product users actually need.",
    ],
  },

  // ─────────────────────────────── MODULE 4 ───────────────────────────────
  'm4-l1': {
    id: "m4-l1",
    title: "Lesson 4.1 What is a Bug?",
    objectives: [
      "Define error, defect (bug), and failure.",
      "Explain how an error leads to a defect and a defect to a failure.",
      "Recognise that not every defect causes a visible failure.",
    ],
    theory:
      "An error is a human mistake. A defect (bug or fault) is the flaw that mistake leaves in the code or document. A failure is what you see when the defect runs and the system does the wrong thing.",
    blocks: [
      {
        type: "text",
        value:
          "People say \"bug\" for almost any problem. But testers use more exact words: error, defect and failure. They describe three different moments in the life of a problem.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning", "Other names"],
        rows: [
          ["Error", "A human mistake, e.g. a developer misreads a requirement.", "Mistake"],
          ["Defect", "A flaw in the code or a document caused by the error.", "Bug, fault"],
          ["Failure", "The system does something wrong while it runs, which a user or tester can see.", "-"],
          ["Root cause", "The deepest reason the problem happened, e.g. an unclear requirement.", "-"],
          ["Incident", "Any unexpected event noticed during testing or use that needs to be checked.", "Issue"],
        ],
      },
      { type: "heading", value: "How they connect" },
      {
        type: "steps",
        title: "Error -> Defect -> Failure",
        steps: [
          { label: "Error (human)", text: "A developer thinks the discount applies to orders over 100, but the rule says 100 or more." },
          { label: "Defect (in code)", text: "They write orderTotal > 100 instead of orderTotal >= 100." },
          { label: "Failure (when running)", text: "A customer with an order of exactly 100 does not get the discount." },
        ],
      },
      {
        type: "code",
        language: "java",
        value: `// Requirement: 10% discount for orders of 100 or more
double applyDiscount(double orderTotal) {
    if (orderTotal > 100) {        // DEFECT: should be >= 100
        return orderTotal * 0.9;
    }
    return orderTotal;
}
// applyDiscount(100) returns 100.0, expected 90.0  -> FAILURE`,
      },
      {
        type: "alert",
        value:
          "A defect does not always cause a failure. If no one ever orders exactly 100, the defect stays hidden. It is still a defect, and it can appear later.",
      },
      {
        type: "text",
        value:
          "Failures can also come from things that are not code defects, such as a wrong server setting, a network outage or bad test data. That is why testers investigate before calling something a bug.",
      },
      {
        type: "example",
        title: "Worked example: tracing a ShopEasy problem",
        value: `What the tester saw (failure):
  Searching "T-shirt" shows 0 results, but T-shirts exist.

Investigation:
  Searching "Tshirt" shows 12 results.

Defect:
  The search code removes the "-" from the product names but not from the search text.

Error:
  The developer did not know product names could contain hyphens.

Root cause:
  The search requirement did not mention special characters.`,
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "ShopEasy shows prices in dollars for users in India. Write the likely failure, defect and error.",
          "Think of a bug you saw in a real app. Describe the failure you saw and guess the defect behind it.",
          "Give one example of a failure that is not caused by a code defect.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "A developer misunderstands a requirement. Is this an error, defect or failure? (Error.)",
          "Wrong logic written in the code is called? (A defect, also called a bug or fault.)",
          "The app shows the wrong total on screen. Is this an error, defect or failure? (Failure.)",
          "Does every defect cause a failure? (No. Some defects are never triggered.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A builder misreads the plan (error), so a water pipe is installed with a crack (defect). Nobody notices until someone turns on the tap and the kitchen floods (failure).",
    },
    mistakes: [
      "Using error, defect and failure as if they mean the same thing.",
      "Assuming every failure is a code bug, without checking environment or test data.",
      "Thinking a defect does not exist just because it has not caused a failure yet.",
      "Blaming a person instead of looking for the root cause.",
    ],
    takeaways: [
      "Errors lead to defects, which lead to failures during execution.",
      "An error is a human mistake; a defect is the flaw it leaves; a failure is the wrong behaviour you see.",
      "Bug and fault are other names for defect.",
      "Not every defect causes a failure, and not every failure comes from a code defect.",
      "Finding the root cause helps stop similar bugs in the future.",
    ],
  },

  'm4-l2': {
    id: "m4-l2",
    title: "Lesson 4.2 Bug Life Cycle",
    objectives: [
      "Trace bug states from New to Closed.",
      "Explain the other states: Rejected/Invalid, Duplicate, Deferred and Reopened.",
      "Describe what the tester does after a bug is fixed (retest and regression).",
    ],
    theory:
      "The bug life cycle is the set of states a defect moves through: New -> Assigned -> Open -> Fixed -> Pending Retest -> Retest -> Verified -> Closed, with side paths such as Rejected, Duplicate, Deferred and Reopened.",
    blocks: [
      {
        type: "text",
        value:
          "A bug does not go from \"found\" to \"gone\" in one step. It moves through several states. Each state tells the team who is working on the bug and what happens next. This journey is called the bug life cycle or defect life cycle.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["State (status)", "The current stage of a bug, e.g. New or Fixed."],
          ["Triage", "A meeting or review where the team decides if a bug is valid, how important it is, and who fixes it."],
          ["Retesting (confirmation testing)", "Running the failed test again to confirm the bug is really fixed."],
          ["Regression testing", "Testing related areas to make sure the fix did not break something else."],
          ["Build", "A new version of the software prepared for testing."],
        ],
      },
      { type: "heading", value: "The main path" },
      {
        type: "steps",
        title: "Bug life cycle: happy path",
        steps: [
          { label: "New", text: "The tester logs the bug for the first time." },
          { label: "Assigned", text: "The lead or manager checks it and assigns it to a developer." },
          { label: "Open", text: "The developer starts analysing and working on it." },
          { label: "Fixed", text: "The developer changes the code and marks the bug as fixed." },
          { label: "Pending Retest", text: "The fix is in a new test build and waits for the tester." },
          { label: "Retest", text: "The tester is now retesting to confirm the fix works." },
          { label: "Verified", text: "The retest passed. The bug no longer happens." },
          { label: "Closed", text: "The bug is done. Regression checks are complete." },
        ],
      },
      { type: "heading", value: "Other states" },
      {
        type: "table",
        headers: ["State", "When it is used"],
        rows: [
          ["Reopened", "The retest failed; the bug still happens. It goes back to the developer."],
          ["Rejected / Invalid", "The developer or team decides it is not a defect, e.g. it works as designed."],
          ["Duplicate", "The same bug was already reported. Link it to the original."],
          ["Deferred", "It is a real bug, but the fix is moved to a later release (low priority, low risk)."],
          ["Not reproducible", "The developer cannot make the bug happen. More details are needed."],
        ],
      },
      {
        type: "alert",
        value:
          "State names differ between companies and tools. Some teams use \"In Progress\" instead of Open, or \"Ready for QA\" instead of Pending Retest. The ideas stay the same.",
      },
      {
        type: "example",
        title: "Worked example: a ShopEasy bug's journey",
        value: `Bug SHOP-214: "Cart total not updated after removing an item"

Mon 10:00  New          Priya (tester) logs the bug with steps and a screenshot.
Mon 11:30  Assigned     QA lead assigns it to Ravi (developer).
Mon 14:00  Open         Ravi starts investigating.
Tue 12:00  Fixed        Ravi fixes the cart refresh code.
Wed 09:00  Pending Retest  Fix deployed to the test environment in build 1.4.2.
Wed 10:00  Retest       Priya repeats the steps -> total still wrong when removing the LAST item.
Wed 10:15  Reopened     Priya adds a comment and new steps.
Thu 15:00  Fixed        Ravi fixes the last-item case.
Fri 09:30  Retest       Priya retests: all cases pass. She also runs regression on cart, discount and checkout.
Fri 11:00  Verified -> Closed`,
      },
      {
        type: "warning",
        value:
          "Never close a bug just because the developer says it is fixed. The tester must retest it in the test environment and run regression on related areas first.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Draw the bug life cycle on paper, including Reopened, Rejected, Duplicate and Deferred.",
          "A ShopEasy bug says \"Logo is blue\", but the design says blue. Which state should it go to?",
          "A fixed bug still fails on retest. Write the next state and the comment you would add.",
          "List three related areas you would regression test after a fix to the checkout discount.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What is the first state of a new bug? (New.)",
          "The tester is confirming a fixed bug is resolved. Which state? (Retesting / Pending Retest.)",
          "Developers say the report is not a defect. Which state? (Rejected / Invalid.)",
          "After a fix, what does the tester do? (Retest it and run regression on related areas.)",
          "The retest fails. What state next? (Reopened.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Sending a car to a repair shop: you report the problem (New), a mechanic is chosen (Assigned), they work on it (Open), they say it is repaired (Fixed), you test drive it (Retest). If the noise is gone you take the car home (Closed); if not, it goes back (Reopened).",
    },
    mistakes: [
      "Closing a bug without retesting it yourself.",
      "Retesting only the exact steps and skipping regression on related features.",
      "Reopening an old bug for a different new problem instead of logging a new bug.",
      "Arguing when a bug is Rejected, instead of adding evidence or checking the requirement.",
    ],
    takeaways: [
      "Main path: New -> Assigned -> Open -> Fixed -> Pending Retest -> Retest -> Verified -> Closed.",
      "A bug must be retested in the target environment before being closed.",
      "If the retest fails, the bug is Reopened.",
      "Rejected/Invalid means the team decided it is not a defect; Deferred means fix later.",
      "After a fix, testers retest and run regression on related areas.",
    ],
  },

  'm4-l3': {
    id: "m4-l3",
    title: "Lesson 4.3 Severity vs Priority",
    objectives: [
      "Classify defects by impact (severity) and urgency (priority).",
      "Explain why severity and priority can be different for the same bug.",
      "Assign severity and priority to realistic ShopEasy bugs.",
    ],
    theory:
      "Severity is the technical impact of a defect on the system. Priority is the business urgency to fix it. A misspelled company logo is Low Severity but High Priority.",
    blocks: [
      {
        type: "text",
        value:
          "Every bug needs two labels. Severity tells how badly the bug hurts the system. Priority tells how soon the team must fix it. They often match, but not always.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning", "Who usually sets it"],
        rows: [
          ["Severity", "The technical impact of the defect on the system.", "Tester (QA)"],
          ["Priority", "The business urgency: how soon it must be fixed.", "Product owner, project manager or triage team"],
          ["Workaround", "Another way for users to get their task done despite the bug.", "-"],
          ["Blocker", "A bug that stops testing or use completely.", "-"],
        ],
      },
      {
        type: "compare",
        columns: [
          {
            title: "Severity",
            subtitle: "How bad is the damage?",
            tone: "rose",
            items: [
              "Technical impact on the system",
              "Set mostly by testers",
              "Usually stays the same over time",
              "Levels: Critical, Major, Minor, Trivial",
            ],
          },
          {
            title: "Priority",
            subtitle: "How soon must we fix it?",
            tone: "honey",
            items: [
              "Business urgency and value",
              "Set by product owner / managers",
              "Can change with deadlines and business needs",
              "Levels: P1 (High) to P4 (Low)",
            ],
          },
        ],
      },
      { type: "heading", value: "Common levels" },
      {
        type: "table",
        headers: ["Severity", "Meaning", "ShopEasy example"],
        rows: [
          ["Critical", "System crash, data loss, or main feature fully blocked, no workaround.", "Checkout crashes for every user."],
          ["Major", "Important feature broken, maybe with a hard workaround.", "Discount codes do not apply."],
          ["Minor", "Small feature problem, easy workaround.", "Sort by price puts one item in the wrong place."],
          ["Trivial", "Cosmetic issue, no effect on function.", "Extra space in a footer label."],
        ],
      },
      { type: "heading", value: "The four combinations" },
      {
        type: "table",
        headers: ["Combination", "ShopEasy example", "Why"],
        rows: [
          ["High Severity, High Priority", "Payment fails for all cards.", "Nothing works and the business loses money now."],
          ["Low Severity, High Priority", "Company logo on the homepage is misspelled \"ShopEsay\".", "No function is broken, but every visitor sees it and the brand looks bad."],
          ["High Severity, Low Priority", "App crashes when exporting a yearly report used once a year by one admin.", "Serious crash, but very rare and not needed soon."],
          ["Low Severity, Low Priority", "Small typo on the \"Terms of use\" page.", "Hardly anyone sees it and it breaks nothing."],
        ],
      },
      {
        type: "example",
        title: "Worked example: triage meeting",
        value: `Three new ShopEasy bugs, one sprint left before a big sale:

SHOP-301  Search is slow (8 s) on the "Sale" page
          Severity: Major   Priority: P1  -> fix first, the sale depends on it.
SHOP-302  Crash when uploading a profile photo over 20 MB
          Severity: Critical (crash)   Priority: P3  -> very rare, workaround: smaller photo.
SHOP-303  "Chekout" spelled wrong on the main checkout button
          Severity: Trivial   Priority: P1  -> every buyer sees it during the sale.

Fix order: SHOP-301 and SHOP-303 first, SHOP-302 later.`,
      },
      {
        type: "warning",
        value: "Do not set every bug to Critical to get attention. When everything is critical, nothing is. Be honest and explain the impact in the report.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Give severity and priority for: users cannot log in on Chrome.",
          "Give severity and priority for: the \"Contact us\" page has the wrong phone number.",
          "Give severity and priority for: the app crashes when a product name has 500 characters (the limit is 50).",
          "Explain why your answers might change one day before a big marketing campaign.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What does severity describe? (The technical impact of the defect.)",
          "What does priority describe? (How urgently the defect must be fixed for the business.)",
          "Misspelled company logo on the homepage? (Low Severity, High Priority.)",
          "Rare crash in an old, rarely used feature? (High Severity, Low Priority.)",
          "Who usually decides priority? (Product owner, manager or triage team.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "In a hospital, a broken leg is serious (high severity), but a small cut that is bleeding fast may need attention first (high priority). Doctors decide the order based on urgency, not only on how bad the injury is.",
    },
    mistakes: [
      "Thinking severity and priority always have the same level.",
      "Marking every bug as Critical or P1.",
      "Letting the tester alone decide business priority without the product owner.",
      "Rating a cosmetic bug as Low Priority even when it is highly visible to all customers.",
    ],
    takeaways: [
      "Severity = technical impact; priority = business urgency.",
      "Testers usually set severity; product owners or managers usually set priority.",
      "A misspelled logo is Low Severity, High Priority.",
      "A rare crash in an unused feature can be High Severity, Low Priority.",
      "Developers resolve defects based on priority, not just severity.",
    ],
  },

  'm4-l4': {
    id: "m4-l4",
    title: "Lesson 4.4 Writing Bug Reports",
    objectives: [
      "List the fields of a professional bug report.",
      "Write clear, exact steps to reproduce.",
      "Draft a complete bug report with expected vs actual results and evidence.",
    ],
    theory:
      "A bug report must contain a clear title, description, exact steps to reproduce, expected vs actual results, environment, severity, priority, and evidence such as screenshots or logs.",
    blocks: [
      {
        type: "text",
        value:
          "A bug report is a written message from the tester to the developer. Its job is simple: help the developer see the same problem, understand it and fix it. If the developer cannot reproduce the bug, they cannot fix it.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Reproduce", "Make the bug happen again by following the same steps."],
          ["Steps to reproduce", "Numbered actions that lead to the bug, starting from a clear starting point."],
          ["Expected result", "What should happen, based on the requirement."],
          ["Actual result", "What really happened."],
          ["Environment", "Where the bug happened: app version, browser, device, operating system, test server."],
          ["Precondition", "What must be true before step 1, e.g. \"user is logged in\"."],
          ["Evidence / attachment", "Screenshot, screen recording, console log or server log."],
        ],
      },
      { type: "heading", value: "Fields of a bug report" },
      {
        type: "table",
        headers: ["Field", "What to write", "Tip"],
        rows: [
          ["ID", "Unique number, e.g. SHOP-412", "Usually created by the tool."],
          ["Title / Summary", "Short: what + where + when", "Someone should understand the bug from the title alone."],
          ["Description", "One or two sentences of extra context", "Keep it factual."],
          ["Preconditions & test data", "Account, cart contents, settings", "Give exact data values."],
          ["Steps to reproduce", "Numbered, one action per step", "Start from a clear point, e.g. the home page."],
          ["Expected result", "What should happen", "Link to the requirement if you can."],
          ["Actual result", "What happened", "Quote exact error messages."],
          ["Environment", "Build, URL, browser, OS, device", "Bugs often depend on these."],
          ["Severity & Priority", "Impact and urgency", "See Lesson 4.3."],
          ["Attachments", "Screenshots, video, logs", "Mark the problem area on screenshots."],
          ["Frequency", "Always, sometimes (e.g. 3 of 10 tries)", "Helps with random bugs."],
        ],
      },
      {
        type: "compare",
        columns: [
          { title: "Weak title", tone: "rose", items: ["Checkout not working", "Bug in cart!!!", "Error"] },
          { title: "Strong title", tone: "olive", items: ["Checkout: \"Pay now\" shows error 500 when using a saved Visa card", "Cart total does not update after removing the last item", "Search: 0 results for product names with a hyphen"] },
        ],
      },
      {
        type: "example",
        title: "Worked example: a complete ShopEasy bug report",
        value: `ID:          SHOP-412
Title:       Checkout: discount code SAVE10 is removed when the delivery address is changed
Reporter:    Priya S.        Date: 15 Sep 2026
Component:   Checkout / Discounts

Description:
After a valid discount code is applied, changing the delivery address removes the discount
without any message. The user pays the full price.

Preconditions:
- Registered user: asha@test.com / Pass@123
- Discount code SAVE10 is active (10% off)
- User has two saved addresses (Home, Office)

Steps to reproduce:
1. Go to https://test.shopeasy.example and log in as asha@test.com.
2. Search for "Running Shoes" and add 1 pair (price 200) to the cart.
3. Click the cart icon, then click "Checkout".
4. Enter SAVE10 in "Discount code" and click "Apply".
5. Note: total shows 180.
6. Under "Delivery address", change from Home to Office.
7. Look at the order total.

Expected result:
Discount stays applied. Total remains 180.

Actual result:
Discount line disappears. Total changes to 200. No message is shown.

Environment:  Build 2.3.1 (test), Chrome 128, Windows 11. Also seen on Firefox 130.
Frequency:    Always (5 of 5 tries)
Severity:     Major (customers are overcharged, workaround: re-apply the code)
Priority:     High (sale campaign starts next week)
Attachments:  checkout_discount_lost.mp4, screenshot_total_200.png, console_log.txt`,
      },
      {
        type: "alert",
        value: "One bug = one report. If you find two different problems, write two reports. This makes tracking, fixing and retesting much easier.",
      },
      {
        type: "warning",
        value: "Do not write your guess about the cause as a fact (\"the developer forgot to save the discount\"). Report what you saw. You can add a clearly marked note if you have useful evidence, such as an error in the console log.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite this weak report: \"Search broken. Please fix ASAP.\"",
          "Invent realistic steps, expected and actual results for a ShopEasy search bug.",
          "Add environment details, severity, priority and the evidence you would attach.",
          "Give your report to a friend. Can they follow the steps without asking you a question?",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What makes a bug report reproducible? (Exact steps, environment, and expected versus actual results.)",
          "Why include the environment? (Bugs may happen only on certain browsers, devices or builds.)",
          "Should one report contain three different bugs? (No. One bug per report.)",
          "What is a good title? (Short and specific: what went wrong, where and when.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "Giving directions to a friend: \"Go somewhere near the market\" does not help. \"Take bus 12 to Central Station, walk 200 metres left, the blue door\" gets them there. Good steps to reproduce are exact directions to the bug.",
    },
    mistakes: [
      "Vague titles like \"Not working\" or \"Error\".",
      "Missing steps, or steps that skip actions you did without thinking.",
      "No expected result, so the developer does not know what is correct.",
      "Forgetting the environment (browser, build, device).",
      "Putting several different bugs into one report.",
    ],
    takeaways: [
      "Good reproduction steps prevent back-and-forth between QA and Dev.",
      "Every report needs title, steps, expected vs actual, environment, severity, priority and evidence.",
      "Write exact data values and quote exact error messages.",
      "One bug per report.",
      "Report facts, not guesses or blame.",
    ],
  },

  'm4-l5': {
    id: "m4-l5",
    title: "Lesson 4.5 Defect Tracking Tools",
    objectives: [
      "Explain why teams use defect tracking tools.",
      "Describe how a bug is logged and moved through a workflow in Jira.",
      "Name other common tools, such as Bugzilla, Redmine and Azure DevOps.",
    ],
    theory:
      "Defect tracking tools store bug reports, move them through the bug life cycle, assign owners and show reports. Jira is the most widely used; Bugzilla, Redmine, Azure DevOps and others are common alternatives.",
    blocks: [
      {
        type: "text",
        value:
          "In a small project you could track bugs in a spreadsheet. But with many testers, developers and releases, a spreadsheet becomes messy. Defect tracking tools keep every bug in one place, with its history, owner and status.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Issue / ticket", "One item in the tool: a bug, task or story."],
          ["Project", "A group of issues for one product, e.g. SHOP for ShopEasy."],
          ["Workflow", "The allowed states and moves for an issue (the bug life cycle in the tool)."],
          ["Board", "A visual view with columns for each state (Scrum or Kanban board)."],
          ["Assignee / Reporter", "The person who must act on the issue / the person who created it."],
          ["JQL", "Jira Query Language: a way to search and filter issues in Jira."],
          ["Traceability", "Links between requirements, test cases and bugs, so you can see what is covered."],
        ],
      },
      { type: "heading", value: "What these tools do" },
      {
        type: "list",
        items: [
          "Store bug reports with fields, attachments and comments.",
          "Move bugs through a workflow (New -> Open -> Fixed -> Closed...).",
          "Assign bugs and notify people by email or chat.",
          "Link bugs to user stories, test cases and code commits.",
          "Show dashboards: open bugs by severity, bugs per release, bug trends.",
          "Keep a full history of who changed what and when.",
        ],
      },
      { type: "heading", value: "Common tools" },
      {
        type: "table",
        headers: ["Tool", "Type", "Notes"],
        rows: [
          ["Jira (Atlassian)", "Commercial, cloud or self-hosted", "Most widely used in agile teams; boards, sprints, JQL, many plugins (e.g. Xray, Zephyr for test cases)."],
          ["Bugzilla", "Free, open source", "Older, simple, focused on bugs."],
          ["Redmine", "Free, open source", "Project management plus issue tracking."],
          ["Azure DevOps Boards", "Microsoft", "Common in teams using Microsoft tools."],
          ["MantisBT", "Free, open source", "Lightweight bug tracker."],
          ["GitHub Issues / GitLab Issues", "Built into code hosting", "Good for developer-focused and open-source teams."],
          ["YouTrack, Linear", "Commercial", "Modern alternatives with fast interfaces."],
        ],
      },
      { type: "heading", value: "Logging a bug in Jira" },
      {
        type: "steps",
        title: "From finding to closing in Jira",
        steps: [
          { label: "Click Create", text: "Choose project SHOP and issue type Bug." },
          { label: "Fill the fields", text: "Summary, description with steps, expected vs actual, environment, priority, severity (often a custom field), component, affected version." },
          { label: "Attach evidence", text: "Drag in screenshots, videos and logs." },
          { label: "Link", text: "Link to the user story or test case, and mark duplicates with \"duplicates\" links." },
          { label: "Move through the workflow", text: "The developer moves it to In Progress and Fixed; the tester moves it to Retest, then Closed or Reopened." },
        ],
      },
      {
        type: "text",
        value: "Testers use JQL to build filters. For example, to see all open, high priority ShopEasy bugs in checkout:",
      },
      {
        type: "code",
        language: "text",
        value: `project = SHOP
AND issuetype = Bug
AND status NOT IN (Closed, Rejected)
AND priority IN (Highest, High)
AND component = Checkout
ORDER BY created DESC`,
      },
      {
        type: "example",
        title: "Worked example: ShopEasy Jira board before release",
        value: `Board columns and counts, one day before release 2.4:

New: 2 | Open / In Progress: 3 | Fixed (Pending Retest): 4 | Retest: 1 | Closed: 37
Deferred: 2 (both Low priority, moved to 2.5)

Release rule agreed by the team:
- No open Critical or High priority bugs.
- All Fixed bugs retested and regression run on cart and checkout.

Action for the tester today: retest the 4 Fixed bugs first.`,
      },
      {
        type: "alert",
        value: "Tools are different, but the skills are the same: clear reports, correct states and honest severity. Learn one tool well and the others are easy.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a free Jira Cloud account (or use a free tool like GitHub Issues).",
          "Create a project called ShopEasy and log the bug report from Lesson 4.4.",
          "Move the bug through the workflow to Closed, adding a comment at each step.",
          "Write a filter that shows only open bugs assigned to you.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "Which tool is widely used for defect tracking? (Jira.)",
          "Name two free alternatives to Jira. (Bugzilla, Redmine, MantisBT or GitHub Issues.)",
          "What is a workflow in a tracking tool? (The states and allowed moves of an issue, like the bug life cycle.)",
          "What is JQL used for? (Searching and filtering issues in Jira.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A defect tracking tool is like a parcel tracking system. Each parcel (bug) has a number, a current location (state), a person responsible, and a full history, so anyone can check where it is at any time.",
    },
    mistakes: [
      "Tracking bugs in chat messages or emails, where they get lost.",
      "Not updating the status, so the board shows old information.",
      "Leaving the assignee empty, so nobody owns the bug.",
      "Creating duplicate issues without searching the tool first.",
    ],
    takeaways: [
      "Defect tracking tools store bugs, manage workflows and show progress.",
      "Jira is the industry standard for agile bug tracking.",
      "Alternatives include Bugzilla, Redmine, Azure DevOps, MantisBT and GitHub Issues.",
      "A tool's workflow is the bug life cycle in practice.",
      "Filters, boards and dashboards help teams decide if a release is ready.",
    ],
  },

  'm4-l6': {
    id: "m4-l6",
    title: "Lesson 4.6 Bug Reporting Best Practices",
    objectives: [
      "Apply clean reporting habits: check duplicates, isolate the problem, report one bug at a time.",
      "Collect clear evidence such as logs and screen recordings.",
      "Keep communication professional and objective.",
    ],
    theory:
      "Good bug reporting means checking for duplicates before logging, isolating the problem to find exactly when it happens, attaching clear evidence, and keeping the tone professional and factual.",
    blocks: [
      {
        type: "text",
        value:
          "You already know the fields of a bug report. This lesson is about habits. Good habits make your reports trusted by developers, fixed faster and rarely rejected.",
      },
      { type: "heading", value: "Key terms" },
      {
        type: "table",
        headers: ["Term", "Meaning"],
        rows: [
          ["Duplicate", "A bug that was already reported by someone else."],
          ["Isolate", "Find the smallest set of conditions that makes the bug happen."],
          ["Intermittent bug", "A bug that happens only sometimes."],
          ["Console log", "Technical messages shown in the browser developer tools."],
          ["Objective", "Based on facts, not feelings or opinions."],
        ],
      },
      { type: "heading", value: "The best-practice checklist" },
      {
        type: "steps",
        title: "Before you click Create",
        steps: [
          { label: "1. Reproduce it", text: "Try again. Can you make it happen at least twice? Note how often it happens." },
          { label: "2. Search for duplicates", text: "Search the tracking tool by keywords, e.g. \"discount\" and \"address\". If it exists, add your details as a comment." },
          { label: "3. Isolate the problem", text: "Change one thing at a time: another browser, another user, other data. Find exactly what triggers it." },
          { label: "4. Collect evidence", text: "Screenshot, short screen recording, console log, time of the error, test data used." },
          { label: "5. Check the requirement", text: "Make sure it is really a bug and not the designed behaviour." },
          { label: "6. Write one clear report", text: "One bug per report, factual title, exact steps, expected vs actual." },
        ],
      },
      {
        type: "example",
        title: "Worked example: isolating a ShopEasy bug",
        value: `First observation: "Checkout sometimes fails."

Isolation, changing one thing at a time:
- Chrome: fails.   Firefox: fails.     -> not a browser problem
- User A: fails.   User B: works.      -> something about the user
- User A has a saved card ending 0005 (expired); User B's card is valid.
- User B with an expired card: fails.  -> trigger found

Final title:
"Checkout: 'Pay now' shows a blank page instead of an error when the saved card is expired"

Evidence: video, console error "TypeError: cannot read 'expiryDate'", time 14:32 UTC.`,
      },
      { type: "heading", value: "Professional tone" },
      {
        type: "compare",
        columns: [
          {
            title: "Avoid",
            tone: "rose",
            items: [
              "\"This is a stupid bug, did anyone even test this?\"",
              "\"Ravi broke the cart again.\"",
              "\"URGENT!!! FIX NOW!!!\"",
              "\"It doesn't work.\"",
            ],
          },
          {
            title: "Prefer",
            tone: "olive",
            items: [
              "\"The cart total is 200 instead of 180 after changing the address.\"",
              "\"Since build 2.3.1, the cart total does not update.\"",
              "\"Priority High: the sale starts on Monday.\"",
              "\"Clicking Pay now shows a blank page (video attached).\"",
            ],
          },
        ],
      },
      {
        type: "list",
        items: [
          "Report the problem, not the person.",
          "Use neutral words: \"shows\", \"returns\", \"does not display\".",
          "If a bug is rejected, read the reason calmly. Add evidence or a requirement link if you still believe it is a bug.",
          "Be available to answer developer questions quickly.",
          "Update the report if you learn something new (new steps, more browsers).",
        ],
      },
      {
        type: "alert",
        value: "Helpful evidence tools: the browser's built-in DevTools (Console and Network tabs), screen recorders such as Loom or OBS, and your tool's screenshot annotation.",
      },
      {
        type: "warning",
        value: "Remove passwords, real card numbers and personal customer data from screenshots and logs before attaching them.",
      },
      { type: "heading", value: "Try it yourself" },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite this comment in a professional tone: \"Login is broken AGAIN. Who wrote this code??\"",
          "A bug happens only sometimes on ShopEasy search. List four things you would change, one at a time, to isolate it.",
          "Open your browser DevTools on any website and find the Console and Network tabs.",
          "Write a short checklist you will follow before logging every bug.",
        ],
      },
      { type: "heading", value: "Check your understanding" },
      {
        type: "list",
        items: [
          "What should you do before logging a new bug? (Search the tool for duplicates.)",
          "What does it mean to isolate a bug? (Change one thing at a time to find the exact trigger.)",
          "What evidence speeds up resolution? (Screenshots, video recordings, logs, test data and timestamps.)",
          "Should a bug report name the developer who caused it? (No. Describe the problem objectively.)",
        ],
      },
    ],
    callout: {
      lead: "Think of it like this:",
      text: "A good bug report is like a good witness statement. The witness says exactly what they saw, when and where, with photos if possible, without shouting or blaming. That helps the investigator solve the case fast.",
    },
    mistakes: [
      "Logging a bug without searching for duplicates first.",
      "Reporting \"it fails sometimes\" without trying to isolate the trigger.",
      "Blaming developers or using an angry tone in comments.",
      "Attaching screenshots that show real passwords or customer data.",
      "Not retrying the steps, so the report cannot be reproduced.",
    ],
    takeaways: [
      "Always verify duplicates before logging a new bug.",
      "Isolate variables one at a time to find the exact trigger.",
      "Clear evidence (logs, video recordings) speeds up resolution.",
      "Keep tone professional and objective: report facts, not blame.",
      "Protect sensitive data in all attachments.",
    ],
  },
};
