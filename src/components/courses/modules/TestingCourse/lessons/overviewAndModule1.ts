import type { Lesson } from '../TestingCourseData';

/**
 * Expanded beginner-friendly lessons for the Course Overview and Module 1.
 * The running demo app across these lessons is "ShopEasy", a small online
 * shop with login, search, cart and checkout.
 */
export const overviewAndModule1Lessons: Record<string, Lesson> = {
  // ---------------------------------------------------------------------------
  // COURSE OVERVIEW
  // ---------------------------------------------------------------------------
  'overview-welcome': {
    id: 'overview-welcome',
    title: 'Welcome Message',
    objectives: [
      'Know what this course is about and who it is for.',
      'Understand how each lesson is organised.',
      'Meet ShopEasy, the demo app used in many examples.',
    ],
    theory:
      'Welcome to Software Testing Mastery. This course takes you step by step from zero knowledge to the skills of a junior QA engineer, using one simple demo shop called ShopEasy.',
    blocks: [
      { type: 'text', value: 'Welcome! We are happy you are here.' },
      {
        type: 'text',
        value:
          'This course teaches software testing. Software testing means checking that a program works the way people expect. You do not need any experience to start. We explain every new word the first time we use it.',
      },
      { type: 'heading', value: 'Who is this course for?' },
      {
        type: 'list',
        items: [
          'Complete beginners who want a first job in IT.',
          'Manual testers who want to learn automation.',
          'Developers, support staff or business analysts who want to understand quality.',
          'Students who want a practical, job-focused skill.',
        ],
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Software', 'A program that runs on a computer or phone, such as a website or an app.'],
          ['Testing', 'Checking the software to find problems and to confirm it does what it should.'],
          ['QA (Quality Assurance)', 'All the work a team does to make sure the product has good quality.'],
          ['Bug (defect)', 'A problem in the software. The result is different from what we expected.'],
          ['Automation', 'Using code or tools to run tests for you, instead of clicking by hand.'],
        ],
      },
      { type: 'heading', value: 'How each lesson works' },
      {
        type: 'steps',
        title: 'Every lesson has the same parts',
        steps: [
          { label: 'Objectives', text: 'What you will be able to do after the lesson.' },
          { label: 'Lesson body', text: 'Short explanations, tables, examples and sometimes code.' },
          { label: 'Think of it like this', text: 'An everyday comparison to help you remember.' },
          { label: 'Common mistakes', text: 'Traps that beginners often fall into.' },
          { label: 'Key takeaways', text: 'The most important points in a few lines.' },
        ],
      },
      { type: 'heading', value: 'Meet ShopEasy, our demo app' },
      {
        type: 'text',
        value:
          'Many examples use one imaginary online shop called ShopEasy. Using the same app again and again makes new ideas easier to follow.',
      },
      {
        type: 'table',
        headers: ['ShopEasy feature', 'What a user does'],
        rows: [
          ['Login', 'Enters email and password to open their account.'],
          ['Search', 'Types a word like "shoes" and sees matching products.'],
          ['Cart', 'Adds products, changes quantity, removes items.'],
          ['Checkout', 'Enters an address, pays, and gets an order number.'],
        ],
      },
      {
        type: 'example',
        title: 'Your first tester thought',
        value:
          'A user adds 2 T-shirts at $15.00 each to the ShopEasy cart.\nExpected cart total: $30.00.\nA tester asks: What if the quantity is 0? What if it is 999? What if the price has cents, like $14.99?\nAsking "what could go wrong?" is the heart of testing.',
      },
      { type: 'alert', value: 'Quality is a mindset. Good testers stay curious and ask questions all the time.' },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open any shopping website you use.',
          'Write down 3 things a user can do there (for example: search, add to cart, log in).',
          'For each one, write one thing that could go wrong.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Do you need coding experience to start this course? (No. We start from the basics.)',
          'What is a bug? (A problem where the actual result is different from the expected result.)',
          'Which four features does ShopEasy have? (Login, search, cart and checkout.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A tester is like a food taster in a restaurant kitchen. The cook makes the dish; the taster checks it before it reaches the customer.',
    },
    mistakes: [
      'Thinking testing is "just clicking around" with no plan.',
      'Skipping lessons that look easy. Later modules build on them.',
      'Reading without practising. Testing is a hands-on skill.',
      'Being afraid to ask "silly" questions. Questions find bugs.',
    ],
    takeaways: [
      'This course starts from zero and explains every new word.',
      'Testing means checking software works as people expect.',
      'Every lesson has objectives, a body, an analogy, mistakes and takeaways.',
      'ShopEasy is the demo shop used across many examples.',
      'Quality is a mindset: stay curious and ask "what could go wrong?".',
    ],
  },

  'overview-intro': {
    id: 'overview-intro',
    title: 'Course Introduction Video',
    objectives: [
      'Walk through the full course from start to finish.',
      'See what kind of work you will do in each part.',
      'Understand why the modules come in this order.',
    ],
    theory:
      'This is a written walkthrough of the course. You start with manual testing basics, move to APIs and databases, then automation with Selenium, and finish with advanced topics and capstone projects.',
    blocks: [
      {
        type: 'text',
        value:
          'This lesson is a written tour of the whole course. Read it once now. Come back to it later when you want to see where you are.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Manual testing', 'A person tests the software by hand, step by step.'],
          ['API', 'Application Programming Interface. A way for two programs to talk to each other.'],
          ['Selenium', 'A free tool that controls a web browser with code, so tests can run automatically.'],
          ['Framework', 'A reusable structure of code and folders that keeps automated tests organised.'],
          ['CI/CD', 'Continuous Integration / Continuous Delivery. Tools that build and test code automatically on every change.'],
          ['Capstone project', 'A final, larger project that uses everything you learned.'],
        ],
      },
      { type: 'heading', value: 'Part 1: Manual testing foundations (Modules 1 to 5)' },
      {
        type: 'table',
        headers: ['Module', 'What you learn'],
        rows: [
          ['1. Introduction to Software Testing', 'What testing is, why it matters, SDLC, STLC, QA roles.'],
          ['2. Software Testing Fundamentals', 'Testing principles, test levels, black/white/grey box, verification vs validation.'],
          ['3. Test Case Design', 'Writing test cases, test plans, and techniques like boundary value analysis.'],
          ['4. Defect Management', 'Bug life cycle, severity vs priority, writing clear bug reports.'],
          ['5. Agile Testing', 'Scrum, sprints, ceremonies and the tester\'s place in an Agile team.'],
        ],
      },
      { type: 'heading', value: 'Part 2: Behind the screen (Modules 6 and 7)' },
      {
        type: 'text',
        value:
          'Web pages talk to servers through APIs, and data is saved in databases. You will learn to test both. Here is a small taste of each.',
      },
      {
        type: 'code',
        language: 'http',
        value: `POST /api/cart/items HTTP/1.1
Host: shopeasy.example.com
Content-Type: application/json

{
  "productId": 101,
  "quantity": 2
}`,
      },
      {
        type: 'code',
        language: 'sql',
        value: `-- Did the order really get saved?
SELECT order_id, status, total_amount
FROM orders
WHERE customer_email = 'asha@example.com'
ORDER BY created_at DESC;`,
      },
      { type: 'heading', value: 'Part 3: Automation (Modules 8 and 9)' },
      {
        type: 'text',
        value:
          'In Module 8 you write Java code that drives a browser with Selenium 4. In Module 9 you organise that code into a framework with TestNG or JUnit 5, Maven, and the Page Object Model. A tiny preview:',
      },
      {
        type: 'code',
        language: 'java',
        value: `WebDriver driver = new ChromeDriver();
driver.get("https://shopeasy.example.com");
driver.findElement(By.name("q")).sendKeys("running shoes", Keys.ENTER);
System.out.println("Page title: " + driver.getTitle());
driver.quit();`,
      },
      { type: 'heading', value: 'Part 4: Advanced topics (Modules 10 to 14)' },
      {
        type: 'list',
        items: [
          'Module 10: Performance testing with Apache JMeter (load, stress, spike, endurance).',
          'Module 11: Mobile testing on Android and iOS, and an introduction to Appium.',
          'Module 12: Security testing basics, including the OWASP Top 10.',
          'Module 13: CI/CD for testers: Git, Jenkins, and running tests on every change.',
          'Module 14: How AI tools help with test ideas, bug analysis and self-healing locators.',
        ],
      },
      { type: 'heading', value: 'Part 5: Prove your skills' },
      {
        type: 'steps',
        steps: [
          { label: 'Module 15: Capstone projects', text: 'Test an e-commerce site, a banking app, an API suite and more.' },
          { label: 'Interview preparation', text: 'Practice manual, Selenium, API, SQL and HR questions.' },
          { label: 'Final assessment', text: 'Theory test, practical tests, capstone review and a viva.' },
          { label: 'Certification', text: 'Certificates for the parts of the course you complete.' },
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy across the course',
        value:
          'Module 3: write test cases for ShopEasy login.\nModule 4: report a bug where the cart total is wrong.\nModule 6: check the cart API returns status 201.\nModule 7: confirm the order row exists in the database.\nModule 8: automate the search flow with Selenium.\nModule 13: run those tests in Jenkins after every code change.',
      },
      { type: 'alert', value: 'There is no video for this lesson. This written walkthrough covers the same course outline.' },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Make a simple checklist with the 15 module names.',
          'Mark the modules that sound easy and the ones that sound hard.',
          'Plan a weekly time slot for study, for example 5 hours per week.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which module teaches bug reports? (Module 4: Defect Management.)',
          'Which tool is used for web automation? (Selenium WebDriver, in Module 8.)',
          'Why do manual modules come before automation? (You must know what to test before you can automate it.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The course is like learning to drive. First you learn the road rules (manual testing), then you drive with help (tools), and finally you take the test on real roads (capstone projects).',
    },
    mistakes: [
      'Jumping straight to Selenium without learning test design first.',
      'Skipping the API and SQL modules. Many real bugs hide behind the screen.',
      'Trying to finish everything in one week and forgetting most of it.',
      'Not saving your practice work, which you can later show in a portfolio.',
    ],
    takeaways: [
      'The course moves from manual basics to APIs, databases, automation and advanced topics.',
      'Modules 1 to 5 build the testing mindset and vocabulary.',
      'Modules 8 and 9 teach Selenium 4 automation and frameworks.',
      'Capstone projects, interviews and assessments help you prove your skills.',
      'Study in order; each module uses ideas from the ones before it.',
    ],
  },

  'overview-outcomes': {
    id: 'overview-outcomes',
    title: 'Learning Outcomes',
    objectives: [
      'List the skills you will have at the end of the course.',
      'Connect each skill to the module that teaches it.',
      'Understand how to show these skills to an employer.',
    ],
    theory:
      'By the end of the course you can design test cases, report bugs clearly, test APIs and databases, write Selenium automation, and run tests in a basic CI pipeline.',
    blocks: [
      {
        type: 'text',
        value:
          'A learning outcome is a skill you can show at the end of a course. It is written as an action: "you can design...", "you can write...". This lesson lists our outcomes so you know exactly what you are working towards.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Learning outcome', 'A skill you can do and show at the end of the course.'],
          ['Test suite', 'A group of test cases that belong together, for example all login tests.'],
          ['Regression test', 'A test you run again after a change, to check old features still work.'],
          ['Portfolio', 'A collection of your work (test cases, bug reports, code) that you show to employers.'],
        ],
      },
      { type: 'heading', value: 'What you will be able to do' },
      {
        type: 'table',
        headers: ['Outcome', 'Where you learn it'],
        rows: [
          ['Explain SDLC, STLC and the role of QA', 'Module 1'],
          ['Choose the right test level and technique', 'Modules 2 and 3'],
          ['Write clear test cases and a simple test plan', 'Module 3'],
          ['Write bug reports developers can act on', 'Module 4'],
          ['Work as a tester inside a Scrum team', 'Module 5'],
          ['Test REST APIs with Postman', 'Module 6'],
          ['Check data with SQL queries', 'Module 7'],
          ['Automate web tests with Selenium 4 and Java', 'Module 8'],
          ['Build a framework with POM, TestNG/JUnit 5 and Maven', 'Module 9'],
          ['Run a basic load test with JMeter', 'Module 10'],
          ['Describe mobile and security testing basics', 'Modules 11 and 12'],
          ['Run automated tests in a Jenkins pipeline', 'Module 13'],
          ['Use AI tools carefully to support testing', 'Module 14'],
        ],
      },
      { type: 'heading', value: 'Manual skills vs automation skills' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Manual testing skills',
            subtitle: 'Thinking and designing',
            tone: 'olive',
            items: [
              'Read requirements and find gaps',
              'Design test cases and test data',
              'Explore the app and find unusual bugs',
              'Write clear bug reports',
            ],
          },
          {
            title: 'Automation skills',
            subtitle: 'Coding and tooling',
            tone: 'honey',
            items: [
              'Write Selenium and API test code',
              'Organise code in a framework',
              'Run tests in CI on every change',
              'Read reports and fix flaky tests',
            ],
          },
        ],
      },
      { type: 'warning', value: 'Automation does not replace manual thinking. A script only checks what a person decided to check.' },
      {
        type: 'example',
        title: 'Outcome in action: ShopEasy login',
        value:
          'Manual: you write 8 test cases (valid login, wrong password, empty email, locked account...).\nBug report: "Login button stays disabled after a valid email is pasted".\nAPI: POST /api/login returns 401 for a wrong password.\nAutomation: a Selenium test logs in and checks the welcome message.\nCI: Jenkins runs that test on every code change.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pick the 3 outcomes that matter most for the job you want.',
          'Write them at the top of a notebook or document.',
          'After each module, write one piece of evidence (a test case, a bug report, a script) for your portfolio.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is a learning outcome? (A skill you can do and show at the end of the course.)',
          'Which module teaches SQL checks? (Module 7: Database Testing.)',
          'Does automation replace manual test design? (No. People still decide what to test.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Learning outcomes are like a shopping list before you go to the market. You know exactly what you should come home with.',
    },
    mistakes: [
      'Collecting certificates without building any real work to show.',
      'Focusing only on tools and ignoring test design.',
      'Not writing down evidence of each skill as you learn it.',
    ],
    takeaways: [
      'Outcomes are practical skills you can show, not just topics you read.',
      'Each outcome maps to a specific module.',
      'You will build both manual and automation skills.',
      'Save your work from every module for a portfolio.',
      'Hands-on capstone projects are the best proof of your skills.',
    ],
  },

  'overview-roadmap': {
    id: 'overview-roadmap',
    title: 'Software Testing Roadmap',
    objectives: [
      'Follow the recommended order of study.',
      'Understand why each stage depends on the one before.',
      'Know when you are ready to move to the next stage.',
    ],
    theory:
      'The roadmap goes: testing basics, test design and defects, Agile, APIs and SQL, Selenium automation, frameworks, advanced topics, then capstone projects.',
    blocks: [
      {
        type: 'text',
        value:
          'A roadmap is a plan that shows the order of learning. Testing skills stack like building blocks. If a lower block is weak, the blocks above it fall over.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Roadmap', 'A step-by-step plan that shows what to learn and in which order.'],
          ['Milestone', 'A point on the roadmap where you can check your progress.'],
          ['Prerequisite', 'Something you should know before starting a new topic.'],
        ],
      },
      { type: 'heading', value: 'The roadmap' },
      {
        type: 'steps',
        title: 'Recommended order',
        steps: [
          { label: 'Stage 1: Testing basics', text: 'Modules 1 and 2. What testing is, SDLC, STLC, principles, test levels.' },
          { label: 'Stage 2: Test design and defects', text: 'Modules 3 and 4. Test cases, techniques, bug reports.' },
          { label: 'Stage 3: Working in a team', text: 'Module 5. Agile and Scrum.' },
          { label: 'Stage 4: APIs and databases', text: 'Modules 6 and 7. Postman, JSON, SQL.' },
          { label: 'Stage 5: Web automation', text: 'Module 8. Selenium 4 with Java.' },
          { label: 'Stage 6: Frameworks', text: 'Module 9. TestNG, JUnit 5, Maven, Page Object Model.' },
          { label: 'Stage 7: Advanced topics', text: 'Modules 10 to 14. Performance, mobile, security, CI/CD, AI.' },
          { label: 'Stage 8: Capstones and career', text: 'Module 15, interview preparation, assessment, certification.' },
        ],
      },
      { type: 'heading', value: 'Milestones: am I ready to move on?' },
      {
        type: 'table',
        headers: ['After stage', 'You should be able to...'],
        rows: [
          ['Stage 2', 'Write 10 good test cases and 2 clear bug reports for ShopEasy login.'],
          ['Stage 4', 'Send an API request in Postman and write a SELECT query with a WHERE clause.'],
          ['Stage 5', 'Write a Selenium test that searches ShopEasy and checks the results.'],
          ['Stage 6', 'Move that test into a page object and run it with Maven.'],
          ['Stage 7', 'Run your tests automatically from a Jenkins job.'],
        ],
      },
      {
        type: 'example',
        title: 'Why order matters: the ShopEasy checkout',
        value:
          'To automate checkout (Stage 5), you first need to know which cases matter: valid card, expired card, empty address (Stage 2).\nTo check the order was really saved, you need SQL (Stage 4).\nIf you skip those stages, your script may click through checkout but still miss the important bugs.',
      },
      {
        type: 'warning',
        value: 'Consolidate manual fundamentals before jumping into automation scripts. Automating a poor test just runs a poor test faster.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Copy the 8 stages into a table with columns "Stage", "Start date", "Target date".',
          'Give each stage a realistic target date.',
          'Add the milestone task for each stage so you can test yourself.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What comes right before web automation? (APIs and databases, Modules 6 and 7.)',
          'Why learn test design before Selenium? (You need to know what to test before you automate it.)',
          'What is a milestone? (A checkpoint that shows you are ready to move on.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The roadmap is like building a house. You lay the foundation first, then the walls, then the roof. You cannot start with the roof.',
    },
    mistakes: [
      'Starting with automation because it "looks more advanced".',
      'Moving on without checking the milestone for the stage.',
      'Studying random YouTube topics out of order.',
      'Setting no dates, so the plan never finishes.',
    ],
    takeaways: [
      'The roadmap has 8 stages, from basics to capstones.',
      'Each stage builds on the stages before it.',
      'Use milestones to check you are ready to move on.',
      'Master manual test design before automation.',
      'A dated plan helps you finish the course.',
    ],
  },

  'overview-career': {
    id: 'overview-career',
    title: 'Career Opportunities',
    objectives: [
      'Name common job roles in software testing.',
      'Describe what each role does day to day.',
      'Identify the skills that help you grow into senior roles.',
    ],
    theory:
      'Testing skills lead to roles like QA Analyst, Automation Engineer, SDET and QA Lead. Pay and titles vary a lot by country, company and experience.',
    blocks: [
      {
        type: 'text',
        value:
          'Almost every company that builds software needs people who care about quality. Banks, shops, hospitals, games and startups all hire testers. This lesson describes the common roles.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['QA Analyst / Manual Tester', 'Designs and runs tests by hand, reports bugs.'],
          ['Automation Engineer', 'Writes code that runs tests automatically.'],
          ['SDET', 'Software Development Engineer in Test. A developer who focuses on testing tools and test code.'],
          ['QA Lead', 'Leads a group of testers, plans testing and reports quality to managers.'],
          ['Job description (JD)', 'The text in a job advert that lists duties and required skills.'],
        ],
      },
      { type: 'heading', value: 'Common roles' },
      {
        type: 'table',
        headers: ['Role', 'Typical work', 'Key skills'],
        rows: [
          ['QA Analyst', 'Write test cases, run them, log bugs, retest fixes.', 'Test design, bug reports, attention to detail'],
          ['API / Database Tester', 'Test services and data behind the screen.', 'Postman, JSON, SQL'],
          ['Automation Engineer', 'Build and maintain automated test suites.', 'Java, Selenium, TestNG/JUnit, Git'],
          ['SDET', 'Build test frameworks and tools, work closely with developers.', 'Strong coding, CI/CD, design patterns'],
          ['Performance Tester', 'Check speed and stability under many users.', 'JMeter, monitoring, analysis'],
          ['Security Tester', 'Look for weaknesses attackers could use.', 'OWASP Top 10, security tools'],
          ['QA Lead / Manager', 'Plan testing, guide the team, report risk.', 'Communication, planning, mentoring'],
        ],
      },
      { type: 'heading', value: 'Two common growth paths' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Technical path',
            tone: 'honey',
            items: ['QA Analyst', 'Automation Engineer', 'SDET', 'Senior SDET / Test Architect'],
          },
          {
            title: 'Leadership path',
            tone: 'olive',
            items: ['QA Analyst', 'Senior QA', 'QA Lead', 'QA Manager'],
          },
        ],
      },
      {
        type: 'alert',
        value:
          'Job titles are not standard. One company\'s "QA Engineer" may be another company\'s "SDET". Always read the duties in the job description, not just the title.',
      },
      {
        type: 'example',
        title: 'Reading a job advert',
        value:
          'Job advert: "QA Engineer for an online store. Write test cases for checkout, test REST APIs with Postman, basic SQL, Selenium with Java is a plus."\nMatching modules: 3 (test cases), 6 (APIs), 7 (SQL), 8 (Selenium).\nYour portfolio: ShopEasy checkout test cases, a Postman collection, and one Selenium script.',
      },
      {
        type: 'warning',
        value:
          'Salaries change a lot by country, city, company and experience. Check current, local job sites and salary surveys rather than trusting general claims.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Search a job site in your area for "QA Engineer" or "Software Tester".',
          'Open 5 adverts and list the skills that appear most often.',
          'Match each skill to a module in this course.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What does SDET stand for? (Software Development Engineer in Test.)',
          'Which role mostly plans testing and guides a team? (QA Lead or QA Manager.)',
          'Why read duties instead of titles? (Titles mean different things at different companies.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A testing career is like a tree. Everyone starts at the trunk (testing basics), then chooses a branch: coding, performance, security or leadership.',
    },
    mistakes: [
      'Believing online salary promises without checking local data.',
      'Applying only by job title and ignoring the listed duties.',
      'Thinking manual testing is a dead end. Strong test design is valued in every role.',
      'Waiting to "finish everything" before applying for junior jobs.',
    ],
    takeaways: [
      'Common roles include QA Analyst, Automation Engineer, SDET and QA Lead.',
      'You can grow on a technical path or a leadership path.',
      'Titles vary; the duties in the job advert matter most.',
      'Automation and coding skills open more technical roles.',
      'Check local, current data for salary information.',
    ],
  },

  'overview-prereq': {
    id: 'overview-prereq',
    title: 'Prerequisites',
    objectives: [
      'Check that you have what you need to start.',
      'Know which tools you will install later in the course.',
      'Prepare your computer for the practical modules.',
    ],
    theory:
      'You do not need coding experience. You need basic computer skills, a computer with internet access, and logical thinking. Java and tools are taught later in the course.',
    blocks: [
      {
        type: 'text',
        value:
          'A prerequisite is something you need before you begin. Good news: this course needs very little. We teach the technical parts as we go.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Prerequisite', 'Something you need to know or have before starting.'],
          ['JDK', 'Java Development Kit. The software you install to write and run Java code.'],
          ['IDE', 'Integrated Development Environment. An editor for writing code, like IntelliJ IDEA or VS Code.'],
          ['Terminal', 'A window where you type commands to the computer.'],
          ['Browser DevTools', 'Built-in browser tools (press F12) to inspect pages and network requests.'],
        ],
      },
      { type: 'heading', value: 'What you need vs what you do not need' },
      {
        type: 'compare',
        columns: [
          {
            title: 'You need',
            tone: 'olive',
            items: [
              'Basic computer skills: files, folders, copy and paste',
              'A laptop or desktop (Windows, macOS or Linux) and internet',
              'Basic English reading',
              'Logical thinking and attention to detail',
              'About 5 to 8 hours per week',
            ],
          },
          {
            title: 'You do NOT need',
            tone: 'rose',
            items: [
              'Any coding experience',
              'A computer science degree',
              'Paid software (the main tools are free)',
              'Advanced maths',
            ],
          },
        ],
      },
      { type: 'heading', value: 'Tools you will install later' },
      {
        type: 'table',
        headers: ['Tool', 'Used in', 'Cost'],
        rows: [
          ['A modern browser (Chrome, Firefox or Edge)', 'All modules', 'Free'],
          ['Postman', 'Module 6', 'Free plan available'],
          ['A SQL database (for example MySQL or PostgreSQL)', 'Module 7', 'Free'],
          ['JDK 17 or newer', 'Modules 8 and 9', 'Free'],
          ['IntelliJ IDEA Community or VS Code', 'Modules 8 and 9', 'Free'],
          ['Maven and Git', 'Modules 9 and 13', 'Free'],
          ['Apache JMeter', 'Module 10', 'Free'],
          ['Jenkins', 'Module 13', 'Free'],
        ],
      },
      {
        type: 'text',
        value:
          'When you reach the automation modules, you can check your setup with these terminal commands. Do not worry if they fail today; we install everything step by step later.',
      },
      {
        type: 'code',
        language: 'bash',
        value: `java -version    # should show version 17 or newer
mvn -version     # shows the Maven version
git --version    # shows the Git version`,
      },
      {
        type: 'example',
        title: 'Logical thinking is already a testing skill',
        value:
          'ShopEasy rule: "Free delivery for orders of $50 or more."\nA logical tester checks: $49.99 (no free delivery), $50.00 (free delivery), $50.01 (free delivery).\nNo code needed. Just careful thinking. You will learn this technique (boundary value analysis) in Module 3.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open your browser and press F12 to open DevTools. Look at the "Elements" and "Network" tabs.',
          'Create a folder called "testing-course" for all your practice files.',
          'Write 3 test ideas for this rule: "Password must be 8 to 20 characters."',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Do you need to know Java before starting? (No. Java is taught before the automation modules need it.)',
          'Which Java version do the automation lessons use? (JDK 17 or newer.)',
          'For "8 to 20 characters", which lengths would you test? (For example 7, 8, 20 and 21.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Starting this course is like joining a cooking class for beginners. You only need to bring yourself and curiosity; the class gives you the recipes and teaches you to use the tools.',
    },
    mistakes: [
      'Waiting to "learn coding first" before starting testing.',
      'Installing every tool on day one and getting confused.',
      'Using a very old Java version that modern Selenium does not support.',
      'Underestimating the value of careful, logical thinking.',
    ],
    takeaways: [
      'No coding experience is required.',
      'You need a computer, internet, basic English and logical thinking.',
      'All main tools in the course are free.',
      'Install tools only when a module needs them.',
      'Attention to detail is your most useful starting skill.',
    ],
  },

  'overview-resources': {
    id: 'overview-resources',
    title: 'Course Resources',
    objectives: [
      'Use a standard test case template.',
      'Use a standard bug report template.',
      'Keep quick reference sheets for Selenium locators and SQL.',
    ],
    theory:
      'This lesson gives you ready-to-use templates directly on the page: a test case template, a bug report template, a simple test plan outline, a Selenium locator cheat sheet and a SQL quick guide.',
    blocks: [
      {
        type: 'text',
        value:
          'A template is a ready-made layout you fill in. Templates make your work consistent and easy for others to read. All the templates below are on this page. Copy them into a spreadsheet or document you own.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Template', 'A ready-made layout with fields you fill in.'],
          ['Test case', 'Steps, data and an expected result to check one behaviour.'],
          ['Bug report', 'A document that describes a defect so a developer can reproduce and fix it.'],
          ['Test plan', 'A document that says what will be tested, how, by whom and when.'],
          ['Cheat sheet', 'A short page of the most-used commands for quick reference.'],
        ],
      },
      { type: 'heading', value: '1. Test case template' },
      {
        type: 'table',
        headers: ['Field', 'Example (ShopEasy)'],
        rows: [
          ['Test Case ID', 'TC-LOGIN-001'],
          ['Title', 'Login succeeds with valid email and password'],
          ['Preconditions', 'User account asha@example.com exists and is active'],
          ['Test data', 'Email: asha@example.com, Password: Secret123!'],
          ['Steps', '1. Open /login  2. Enter email  3. Enter password  4. Click "Log in"'],
          ['Expected result', 'User lands on the home page and sees "Welcome, Asha"'],
          ['Actual result', '(filled in during execution)'],
          ['Status', 'Pass / Fail / Blocked / Not run'],
          ['Priority', 'High'],
        ],
      },
      { type: 'heading', value: '2. Bug report template' },
      {
        type: 'table',
        headers: ['Field', 'What to write'],
        rows: [
          ['Bug ID', 'Given by the tracking tool, e.g. SHOP-142'],
          ['Title', 'Short and specific: what, where, when'],
          ['Environment', 'Browser, OS, app version, test server'],
          ['Steps to reproduce', 'Numbered steps anyone can follow'],
          ['Expected result', 'What should happen'],
          ['Actual result', 'What really happened'],
          ['Severity', 'Impact on the system: Critical / High / Medium / Low'],
          ['Priority', 'How soon to fix: High / Medium / Low'],
          ['Attachments', 'Screenshot, video, logs'],
        ],
      },
      {
        type: 'example',
        title: 'Filled bug report',
        value:
          'Title: Cart total ignores quantity change from 1 to 3\nEnvironment: Chrome (latest), Windows 11, ShopEasy v2.4 on staging\nSteps:\n1. Log in as asha@example.com\n2. Add "Blue Mug" ($8.50) to the cart\n3. In the cart, change quantity from 1 to 3\nExpected: Total shows $25.50\nActual: Total still shows $8.50\nSeverity: High   Priority: High\nAttachment: cart-total.png',
      },
      { type: 'heading', value: '3. Simple test plan outline' },
      {
        type: 'steps',
        steps: [
          { label: 'Scope', text: 'What is in and out of testing (e.g. login, search, cart, checkout; not the blog).' },
          { label: 'Approach', text: 'Types of testing: functional, regression, API, basic performance.' },
          { label: 'Resources and roles', text: 'Who tests what, and which tools are used.' },
          { label: 'Schedule', text: 'Start and end dates for each testing activity.' },
          { label: 'Entry and exit criteria', text: 'When testing can start and when it is "done".' },
          { label: 'Risks', text: 'What could delay or weaken testing, and the backup plan.' },
        ],
      },
      { type: 'heading', value: '4. Selenium locator cheat sheet' },
      {
        type: 'table',
        headers: ['Locator', 'Java (Selenium 4)', 'When to use'],
        rows: [
          ['ID', 'By.id("email")', 'Best choice when the element has a unique id'],
          ['Name', 'By.name("q")', 'Form fields with a name attribute'],
          ['CSS selector', 'By.cssSelector("button[type=\'submit\']")', 'Fast and flexible; good default'],
          ['XPath', 'By.xpath("//h2[text()=\'Your cart\']")', 'When you must match text or move up the page tree'],
          ['Link text', 'By.linkText("Checkout")', 'Links with exact visible text'],
          ['Class name', 'By.className("product-card")', 'A single class name'],
        ],
      },
      { type: 'heading', value: '5. SQL quick guide' },
      {
        type: 'code',
        language: 'sql',
        value: `-- Read rows
SELECT product_id, name, price FROM products WHERE price < 20;

-- Count rows
SELECT COUNT(*) FROM orders WHERE status = 'PAID';

-- Join two tables
SELECT o.order_id, c.email, o.total_amount
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id;

-- Add, change and remove test data (only on a test database!)
INSERT INTO coupons (code, discount_percent) VALUES ('TEST10', 10);
UPDATE coupons SET discount_percent = 15 WHERE code = 'TEST10';
DELETE FROM coupons WHERE code = 'TEST10';`,
      },
      { type: 'warning', value: 'Never run INSERT, UPDATE or DELETE on a live (production) database while practising.' },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create a spreadsheet with the test case template columns.',
          'Write 3 test cases for ShopEasy search (a found product, no results, empty search).',
          'Write one bug report using the template for an imaginary bug you choose.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which bug report field says how soon to fix a bug? (Priority.)',
          'Which locator is usually the best first choice? (ID, when it is unique.)',
          'What is the difference between expected and actual result? (Expected is what should happen; actual is what really happened.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Templates are like forms at a bank. Because everyone fills in the same boxes, the staff can read any form quickly and nothing important is forgotten.',
    },
    mistakes: [
      'Writing bug titles like "Cart broken" with no details.',
      'Leaving out the expected result in a test case.',
      'Mixing up severity (impact) and priority (urgency).',
      'Practising data changes on a real production database.',
    ],
    takeaways: [
      'Templates make test work consistent and easy to read.',
      'A test case has ID, preconditions, steps, data and expected result.',
      'A good bug report has clear steps, expected vs actual, and severity and priority.',
      'Prefer ID and CSS locators; use XPath when needed.',
      'Use these templates in your capstone exercises.',
    ],
  },

  // ---------------------------------------------------------------------------
  // MODULE 1: INTRODUCTION TO SOFTWARE TESTING
  // ---------------------------------------------------------------------------
  'm1-l1': {
    id: 'm1-l1',
    title: 'Lesson 1.1 Welcome to Software Testing',
    objectives: [
      'Describe what Module 1 covers.',
      'Explain what "quality" means for software.',
      'Understand that quality is built in all the time, not only at the end.',
    ],
    theory:
      'Software testing helps teams deliver apps that are reliable, secure and easy to use. Module 1 explains what testing is, why it matters, how it fits in SDLC and STLC, and what QA engineers do.',
    blocks: [
      {
        type: 'text',
        value:
          'Welcome to Module 1. Here you build the base for everything else in the course. You will learn the basic words and ideas that every tester uses.',
      },
      { type: 'heading', value: 'What you will learn in this module' },
      {
        type: 'table',
        headers: ['Lesson', 'Topic'],
        rows: [
          ['1.2', 'What software testing is'],
          ['1.3', 'Why testing is important (with real-world failures)'],
          ['1.4', 'SDLC: how software is built'],
          ['1.5', 'STLC: how testing is organised'],
          ['1.6', 'What a QA engineer does'],
          ['1.7', 'Types of testing'],
          ['1.8', 'Career roadmap for QA engineers'],
        ],
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Quality', 'How well the software meets the needs of its users.'],
          ['Reliable', 'Works correctly every time, not only sometimes.'],
          ['Secure', 'Protects data and blocks people who should not have access.'],
          ['Usable', 'Easy and clear for real people to use.'],
          ['UX', 'User Experience. How a person feels while using the product.'],
        ],
      },
      { type: 'heading', value: 'What does "good quality" look like?' },
      {
        type: 'table',
        headers: ['Quality attribute', 'ShopEasy example'],
        rows: [
          ['Correct', 'The cart total is right, including discounts and tax.'],
          ['Reliable', 'Checkout works at 3 a.m. and during a big sale.'],
          ['Secure', 'Another user cannot see Asha\'s saved address.'],
          ['Fast', 'Search results appear quickly.'],
          ['Usable', 'Error messages clearly say what to fix.'],
          ['Compatible', 'The site works in Chrome, Firefox, Safari and on phones.'],
        ],
      },
      { type: 'heading', value: 'Quality is continuous' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Old idea',
            subtitle: 'Test only at the end',
            tone: 'rose',
            items: [
              'Developers finish everything first',
              'Testers find many bugs late',
              'Fixes are expensive and releases slip',
            ],
          },
          {
            title: 'Modern idea',
            subtitle: 'Quality all the time',
            tone: 'olive',
            items: [
              'Testers review requirements early',
              'Tests run on every change',
              'Bugs are found when they are cheap to fix',
            ],
          },
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy: early vs late',
        value:
          'Requirement: "Users can apply a coupon at checkout."\nEarly question from a tester: "Can a user apply two coupons? Can a coupon be used after it expires?"\nThe product owner answers in 5 minutes and updates the requirement.\nIf nobody asks, the rule may be built wrong and found only after customers use it.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Think of an app you use every day.',
          'Write one example for each quality attribute: correct, reliable, secure, fast, usable.',
          'Write one question you would ask its team before a new feature is built.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Is quality only checked at the end of a project? (No. Quality is a continuous process.)',
          'Give one quality attribute other than "correct". (For example reliable, secure, fast, usable or compatible.)',
          'What does UX mean? (User Experience.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Quality is like hygiene in a kitchen. You do not clean only once before the inspector comes; you keep things clean every day.',
    },
    mistakes: [
      'Thinking quality only means "no crashes".',
      'Believing testers are only needed at the end.',
      'Ignoring usability and security because "the feature works".',
    ],
    takeaways: [
      'Module 1 builds the base vocabulary for the whole course.',
      'Quality includes correctness, reliability, security, speed and usability.',
      'Quality is a continuous process, not a final phase.',
      'Asking questions early prevents bugs.',
    ],
  },

  'm1-l2': {
    id: 'm1-l2',
    title: 'Lesson 1.2 What is Software Testing?',
    objectives: [
      'Define software testing in simple words.',
      'Explain the words error, defect and failure.',
      'Compare expected result and actual result.',
      'Understand why testing cannot prove "zero bugs".',
    ],
    theory:
      'Software testing is the process of checking software to find defects and to verify that it behaves as expected. It compares the expected result with the actual result.',
    blocks: [
      {
        type: 'text',
        value:
          'Software testing is the process of checking a program to find defects and to verify that it does what it should. The primary goal is to find defects and verify expected behaviour.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Requirement', 'A written statement of what the software must do.'],
          ['Expected result', 'What should happen, based on the requirement.'],
          ['Actual result', 'What really happens when you test.'],
          ['Error (mistake)', 'A human mistake, for example a developer types the wrong formula.'],
          ['Defect (bug)', 'The wrong code or wrong design that results from the error.'],
          ['Failure', 'What the user sees when the defect runs: a wrong result or crash.'],
          ['Test case', 'Steps, input data and an expected result used to check one behaviour.'],
        ],
      },
      { type: 'heading', value: 'Error, defect, failure' },
      {
        type: 'steps',
        steps: [
          { label: 'Error', text: 'A developer writes price + quantity instead of price * quantity.' },
          { label: 'Defect', text: 'That wrong line now sits in the cart code.' },
          { label: 'Failure', text: 'A user buys 3 mugs at $8.50 and sees a total of $11.50 instead of $25.50.' },
        ],
      },
      { type: 'heading', value: 'Expected vs actual' },
      {
        type: 'text',
        value:
          'Every test compares two things. If the expected result and the actual result match, the test passes. If they do not match, the test fails and you investigate.',
      },
      {
        type: 'table',
        headers: ['Test', 'Expected', 'Actual', 'Status'],
        rows: [
          ['Search "mug"', 'Mug products are listed', 'Mug products are listed', 'Pass'],
          ['3 mugs at $8.50', 'Total $25.50', 'Total $11.50', 'Fail'],
          ['Login with wrong password', 'Message "Invalid email or password"', 'Page crashes', 'Fail'],
        ],
      },
      { type: 'heading', value: 'Two ways to test' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Static testing',
            subtitle: 'Without running the code',
            tone: 'honey',
            items: ['Review requirements', 'Review designs', 'Code reviews'],
          },
          {
            title: 'Dynamic testing',
            subtitle: 'By running the software',
            tone: 'olive',
            items: ['Run test cases by hand', 'Run automated tests', 'Explore the app'],
          },
        ],
      },
      {
        type: 'text',
        value:
          'Here is how the cart check looks as an automated unit test with JUnit 5. You will learn this syntax later; for now, notice the expected value and the actual value.',
      },
      {
        type: 'code',
        language: 'java',
        value: `import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CartTest {

    @Test
    void totalMultipliesPriceByQuantity() {
        Cart cart = new Cart();
        cart.addItem("Blue Mug", 3, 8.50);

        double expected = 25.50;
        double actual = cart.getTotal();

        assertEquals(expected, actual, 0.001); // fails if they differ
    }
}`,
      },
      {
        type: 'warning',
        value:
          'Testing cannot prove that software has zero bugs. It shows that defects are present and lowers the risk of hidden ones.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Take the ShopEasy rule: "Search shows products whose name contains the search word."',
          'Write 3 tests with an expected result for each (e.g. "mug", "MUG", "zzzz").',
          'For "zzzz", decide what the expected result should be and write it down.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is the primary goal of testing? (To find defects and verify expected behaviour.)',
          'A developer types the wrong formula. Is that an error, defect or failure? (An error.)',
          'Can testing prove a program has zero bugs? (No.)',
          'Is a requirements review static or dynamic testing? (Static.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing is like checking a restaurant bill. You know what you ordered (expected), you read the bill (actual), and if they do not match, you ask the waiter.',
    },
    mistakes: [
      'Testing without a clear expected result.',
      'Believing that "all tests passed" means "no bugs".',
      'Mixing up error (human mistake), defect (in the code) and failure (seen by user).',
      'Thinking testing only happens by running the app, and forgetting reviews.',
    ],
    takeaways: [
      'Testing finds defects and verifies expected behaviour.',
      'Every test compares expected result with actual result.',
      'An error causes a defect, and a defect can cause a failure.',
      'Static testing reviews documents and code; dynamic testing runs the software.',
      'Testing shows bugs are present; it cannot prove there are none.',
    ],
  },

  'm1-l3': {
    id: 'm1-l3',
    title: 'Lesson 1.3 Why Software Testing is Important',
    objectives: [
      'Describe real-world software failures and their impact.',
      'Explain why defects cost more the later they are found.',
      'List the business reasons for testing.',
    ],
    theory:
      'Software failures can waste money, damage trust and even harm people. Finding defects early is much cheaper because less work has been built on the wrong assumption.',
    blocks: [
      {
        type: 'text',
        value:
          'Software runs banks, hospitals, planes and shops. When it fails, real people are affected. Testing lowers that risk.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Production', 'The live system that real customers use.'],
          ['Risk', 'The chance that something bad happens, and how bad it would be.'],
          ['Cost of a defect', 'The time and money needed to find and fix it, plus the damage it causes.'],
          ['Artefact', 'Anything the team produces: requirements, designs, code, tests, documents.'],
          ['Shift left', 'Moving testing activities earlier in the project.'],
        ],
      },
      { type: 'heading', value: 'Real software failures' },
      {
        type: 'table',
        headers: ['Case', 'What went wrong', 'Impact'],
        rows: [
          ['Therac-25 (1985 to 1987)', 'Software faults, including a race condition, in a radiation therapy machine.', 'Patients received massive radiation overdoses; some died.'],
          ['Ariane 5 Flight 501 (1996)', 'A 64-bit number was converted into a 16-bit integer and overflowed.', 'The rocket broke up about 40 seconds after launch.'],
          ['Mars Climate Orbiter (1999)', 'One team used imperial units, another used metric units.', 'The spacecraft was lost.'],
          ['Knight Capital (2012)', 'A deployment left old, unused trading code active on one server.', 'About $440 million lost in under an hour.'],
        ],
      },
      { type: 'heading', value: 'Why early testing is cheaper' },
      {
        type: 'text',
        value:
          'A defect found in the requirements is cheap to fix: you change a sentence. The same defect found in production is expensive, because designs, code, tests and documents were already built on the wrong assumption. All of them may need to change.',
      },
      {
        type: 'table',
        headers: ['Found during', 'What must be fixed', 'Relative cost'],
        rows: [
          ['Requirements', 'One sentence in a document', 'Lowest'],
          ['Design', 'Document and design', 'Low'],
          ['Coding', 'Document, design, code', 'Medium'],
          ['Testing', 'All of the above, plus retesting', 'High'],
          ['Production', 'All of the above, plus customer damage, support and reputation', 'Highest'],
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy: the free delivery rule',
        value:
          'Requirement says: "Free delivery over $50." Does $50.00 exactly get free delivery? Nobody asked.\nFound in requirements: the product owner answers "yes, $50 or more". Cost: one email.\nFound in production: hundreds of customers paid delivery at exactly $50. Cost: code fix, retest, redeploy, refunds, support tickets and angry reviews.',
      },
      { type: 'heading', value: 'Business reasons for testing' },
      {
        type: 'list',
        items: [
          'Save money by finding defects early.',
          'Protect the company\'s reputation and customer trust.',
          'Keep users and their data safe.',
          'Meet legal and industry rules (for example in banking and healthcare).',
          'Give the team confidence to release.',
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Think of a time an app or website failed for you.',
          'Write: what happened, who was affected, and what it may have cost the company.',
          'Write one test that could have caught it before release.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Why is a defect cheaper to fix in requirements than in production? (Fewer artefacts have been built on the wrong assumption.)',
          'What caused the Mars Climate Orbiter loss? (A mix-up between imperial and metric units.)',
          'What does "shift left" mean? (Doing testing activities earlier in the project.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Fixing a wrong measurement on a house plan takes an eraser. Fixing it after the walls are built takes a hammer, time and a lot of money.',
    },
    mistakes: [
      'Thinking testing is a cost that slows the team down, instead of a saving.',
      'Waiting until the code is finished to start asking questions.',
      'Believing small bugs never matter. A small rounding bug can repeat thousands of times.',
      'Testing only the "happy path" and ignoring edge cases.',
    ],
    takeaways: [
      'Software failures can cost money, trust and even lives.',
      'Early testing dramatically reduces overall project costs.',
      'Late defects are expensive because many artefacts depend on the wrong assumption.',
      'Testing protects users, data, reputation and legal compliance.',
      'Ask questions about requirements as early as possible.',
    ],
  },

  'm1-l4': {
    id: 'm1-l4',
    title: 'Lesson 1.4 Software Development Life Cycle (SDLC)',
    objectives: [
      'List the phases of the SDLC in order.',
      'Describe what happens and what is produced in each phase.',
      'Compare Waterfall, V-Model and Agile.',
      'Explain where testing fits in each model.',
    ],
    theory:
      'The SDLC is the set of phases used to build software: Requirements, Design, Implementation, Testing, Deployment and Maintenance. Models like Waterfall, V-Model and Agile arrange these phases differently.',
    blocks: [
      {
        type: 'text',
        value:
          'SDLC means Software Development Life Cycle. It is the full journey of a software product, from the first idea to the day it is retired. Every team follows some kind of SDLC, even if they do not use the name.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['SDLC', 'Software Development Life Cycle. The phases for building software.'],
          ['Phase', 'One stage of work with a clear goal.'],
          ['Deliverable', 'The output of a phase, such as a document or working code.'],
          ['Iteration', 'One short cycle of planning, building and testing.'],
          ['Deployment', 'Putting the software on servers so users can use it.'],
        ],
      },
      { type: 'heading', value: 'The six SDLC phases' },
      {
        type: 'steps',
        steps: [
          { label: '1. Requirements', text: 'Collect and write down what users and the business need.' },
          { label: '2. Design', text: 'Plan the screens, database and system architecture.' },
          { label: '3. Implementation (coding)', text: 'Developers write the code.' },
          { label: '4. Testing', text: 'Check the software against the requirements and find defects.' },
          { label: '5. Deployment', text: 'Release the software to users.' },
          { label: '6. Maintenance', text: 'Fix bugs, update and improve the live system.' },
        ],
      },
      {
        type: 'table',
        headers: ['Phase', 'ShopEasy example deliverable', 'Tester\'s role'],
        rows: [
          ['Requirements', 'Story: "User can save items to a wishlist"', 'Ask questions, find unclear rules'],
          ['Design', 'Wishlist screen mock-up and database table', 'Review designs for missing cases'],
          ['Implementation', 'Wishlist code and unit tests', 'Prepare test cases and test data'],
          ['Testing', 'Test results and bug reports', 'Run tests, report and retest bugs'],
          ['Deployment', 'Release to production', 'Run smoke tests on the live site'],
          ['Maintenance', 'Bug fixes and small updates', 'Run regression tests after each change'],
        ],
      },
      { type: 'heading', value: 'Common SDLC models' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Waterfall',
            subtitle: 'One phase after another',
            tone: 'rose',
            items: [
              'Each phase finishes before the next starts',
              'Testing happens after coding',
              'Hard to change requirements late',
              'Fits small, stable, well-understood projects',
            ],
          },
          {
            title: 'V-Model',
            subtitle: 'Each build phase has a test phase',
            tone: 'honey',
            items: [
              'Requirements pair with acceptance testing',
              'Design pairs with system and integration testing',
              'Coding pairs with unit testing',
              'Test planning starts early',
            ],
          },
          {
            title: 'Agile',
            subtitle: 'Short iterations',
            tone: 'olive',
            items: [
              'Work in short iterations (e.g. 2-week sprints)',
              'Frequent feedback from users',
              'Testing happens in every iteration',
              'Changes are welcome',
            ],
          },
        ],
      },
      {
        type: 'alert',
        value: 'Agile is the model that runs development in short iterations with frequent feedback. You will study it in detail in Module 5.',
      },
      {
        type: 'example',
        title: 'ShopEasy wishlist in Agile',
        value:
          'Sprint 1 (2 weeks): add to wishlist and view wishlist. Tester tests both inside the sprint.\nSprint review: users say "we want to move items from wishlist to cart".\nSprint 2: build and test "move to cart", and run regression tests on sprint 1 features.',
      },
      {
        type: 'warning',
        value: 'Testing is a core phase in every model. What changes is when and how often it happens, not whether it happens.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Choose a new ShopEasy feature, such as product reviews.',
          'Write one deliverable for each of the 6 SDLC phases.',
          'Write one thing a tester would do in each phase.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What are the six SDLC phases in order? (Requirements, Design, Implementation, Testing, Deployment, Maintenance.)',
          'Which model runs development in short iterations with frequent feedback? (Agile.)',
          'In the V-Model, which test level pairs with coding? (Unit testing.)',
          'In Waterfall, when does testing usually start? (After coding is finished.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The SDLC is like building a house: agree what the family needs, draw the plan, build, inspect, hand over the keys, then repair things over the years.',
    },
    mistakes: [
      'Thinking testing only happens in phase 4.',
      'Believing Waterfall and Agile skip testing; both need it.',
      'Forgetting Maintenance, which is often the longest phase.',
      'Mixing up the SDLC (building software) with the STLC (testing activities).',
    ],
    takeaways: [
      'SDLC phases: Requirements, Design, Implementation, Testing, Deployment, Maintenance.',
      'Each phase produces deliverables the next phase uses.',
      'Waterfall is sequential; the V-Model pairs each build phase with a test phase.',
      'Agile builds in short iterations with frequent feedback.',
      'Testing is a core phase in all development models.',
    ],
  },

  'm1-l5': {
    id: 'm1-l5',
    title: 'Lesson 1.5 Software Testing Life Cycle (STLC)',
    objectives: [
      'List the six STLC phases in the correct order.',
      'Describe the main activity and deliverable of each phase.',
      'Explain entry and exit criteria.',
      'Compare SDLC and STLC.',
    ],
    theory:
      'The STLC is the set of testing phases: Requirements Analysis, Test Planning, Test Case Development, Environment Setup, Test Execution and Test Closure. Each phase has entry and exit criteria.',
    blocks: [
      {
        type: 'text',
        value:
          'STLC means Software Testing Life Cycle. The SDLC describes how software is built. The STLC describes how testing is organised inside that work. It has six phases.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['STLC', 'Software Testing Life Cycle. The ordered phases of testing work.'],
          ['Entry criteria', 'Conditions that must be true before a phase can start.'],
          ['Exit criteria', 'Conditions that must be true before a phase is finished.'],
          ['Test environment', 'The servers, devices, data and tools where tests run.'],
          ['RTM', 'Requirements Traceability Matrix. A table linking each requirement to its test cases.'],
          ['Test summary report', 'A final report of what was tested, results, open defects and risks.'],
        ],
      },
      { type: 'heading', value: 'The six STLC phases' },
      {
        type: 'steps',
        title: 'Correct order',
        steps: [
          { label: '1. Requirements Analysis', text: 'Study requirements and decide what is testable.' },
          { label: '2. Test Planning', text: 'Decide scope, approach, resources, schedule and risks.' },
          { label: '3. Test Case Development', text: 'Write test cases, test data and the RTM.' },
          { label: '4. Environment Setup', text: 'Prepare servers, devices, accounts and data.' },
          { label: '5. Test Execution', text: 'Run tests, log defects, retest fixes.' },
          { label: '6. Test Closure', text: 'Summarise results, lessons learned and open risks.' },
        ],
      },
      {
        type: 'syntax',
        title: 'STLC order in one line',
        parts: [
          { clause: 'Requirements Analysis ->', text: 'understand what to test' },
          { clause: 'Test Planning ->', text: 'decide scope, people and time' },
          { clause: 'Test Case Development ->', text: 'write the tests' },
          { clause: 'Environment Setup ->', text: 'get the place ready' },
          { clause: 'Test Execution ->', text: 'run the tests' },
          { clause: 'Test Closure', text: 'report and learn' },
        ],
      },
      { type: 'heading', value: 'Phase details' },
      {
        type: 'table',
        headers: ['Phase', 'Entry criteria', 'Main deliverable', 'Exit criteria'],
        rows: [
          ['Requirements Analysis', 'Requirements document available', 'List of testable requirements, questions', 'Questions answered, scope understood'],
          ['Test Planning', 'Requirements analysed', 'Test plan (scope, resources, schedule, risks)', 'Test plan approved'],
          ['Test Case Development', 'Test plan approved', 'Test cases, test data, RTM', 'Test cases reviewed and approved'],
          ['Environment Setup', 'Environment plan and build available', 'Ready test environment', 'Smoke test passes on the environment'],
          ['Test Execution', 'Test cases and environment ready', 'Test results, defect reports', 'Planned tests run; critical defects fixed or accepted'],
          ['Test Closure', 'Execution finished', 'Test summary report', 'Report shared and signed off'],
        ],
      },
      {
        type: 'alert',
        value:
          'Test Planning is the phase where the team identifies the testing scope and resources. Test Case Development is the phase that produces the test cases.',
      },
      {
        type: 'text',
        value:
          'In real projects, Environment Setup is often done at the same time as Test Case Development, sometimes by a different team. The standard order above is still the one to remember.',
      },
      { type: 'heading', value: 'SDLC vs STLC' },
      {
        type: 'compare',
        columns: [
          {
            title: 'SDLC',
            subtitle: 'Building the product',
            tone: 'honey',
            items: [
              'Covers the whole software life',
              'Goal: build and run working software',
              'Done by the whole team',
              'Testing is one phase inside it',
            ],
          },
          {
            title: 'STLC',
            subtitle: 'Testing the product',
            tone: 'olive',
            items: [
              'Covers only testing work',
              'Goal: check quality and find defects',
              'Led mainly by the QA team',
              'Runs alongside SDLC phases',
            ],
          },
        ],
      },
      {
        type: 'example',
        title: 'STLC for ShopEasy checkout',
        value:
          '1. Requirements Analysis: find that "which cards are accepted?" is not written. Ask the product owner.\n2. Test Planning: scope = checkout with Visa and Mastercard; 2 testers; 5 days; risk = payment sandbox is slow.\n3. Test Case Development: 25 test cases, e.g. valid card, expired card, empty address.\n4. Environment Setup: staging server, payment sandbox, test user accounts.\n5. Test Execution: 23 pass, 2 fail; bugs SHOP-201 and SHOP-202 logged and retested.\n6. Test Closure: summary report with results, 0 open critical bugs, 1 low-priority known issue.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pick the ShopEasy search feature.',
          'Write one activity and one deliverable for each of the six STLC phases.',
          'Write one entry criterion and one exit criterion for Test Execution.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What is the correct STLC order? (Requirements Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure.)',
          'Which phase identifies testing scope and resources? (Test Planning.)',
          'Which phase produces the test cases? (Test Case Development.)',
          'What is an exit criterion? (A condition that must be true before a phase is finished.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The STLC is like cooking for a party: read the menu request, plan the shopping, write the recipes, set up the kitchen, cook, then clean up and note what to do better next time.',
    },
    mistakes: [
      'Starting to write test cases before understanding the requirements.',
      'Skipping Test Closure, so lessons are never recorded.',
      'Having no exit criteria, so nobody knows when testing is "done".',
      'Mixing up the order of Test Planning and Test Case Development.',
    ],
    takeaways: [
      'STLC has six phases: Requirements Analysis, Test Planning, Test Case Development, Environment Setup, Test Execution, Test Closure.',
      'Each STLC phase has distinct entry and exit criteria.',
      'Test Planning sets scope and resources; Test Case Development produces test cases.',
      'SDLC is about building software; STLC is about testing it.',
      'Test Closure produces a summary report with results and open risks.',
    ],
  },

  'm1-l6': {
    id: 'm1-l6',
    title: 'Lesson 1.6 Roles and Responsibilities of a QA Engineer',
    objectives: [
      'List the main responsibilities of a QA engineer.',
      'Explain the difference between QA, QC and testing.',
      'Describe how QA engineers work with other team members.',
    ],
    theory:
      'QA engineers design and run tests, report bugs and verify fixes. They also assess quality risk, advocate for the user and help the whole team improve its quality processes.',
    blocks: [
      {
        type: 'text',
        value:
          'A QA engineer does more than find bugs. They help the team understand quality risk and they speak up for the user. This lesson explains what the job really involves.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['QA (Quality Assurance)', 'Process-focused. Improving how the team works so fewer defects are created.'],
          ['QC (Quality Control)', 'Product-focused. Checking the product to find defects.'],
          ['Testing', 'The hands-on activity of running checks. A main part of QC.'],
          ['Stakeholder', 'Anyone who cares about the product: users, managers, developers, support.'],
          ['User advocate', 'A person who speaks for the needs of real users in team decisions.'],
          ['Quality risk', 'Something that could go wrong for users, and how likely and harmful it is.'],
        ],
      },
      { type: 'heading', value: 'QA vs QC vs testing' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Quality Assurance',
            subtitle: 'Prevent defects',
            tone: 'olive',
            items: ['Improve processes', 'Review requirements early', 'Define standards and checklists'],
          },
          {
            title: 'Quality Control',
            subtitle: 'Detect defects',
            tone: 'honey',
            items: ['Inspect the product', 'Compare results to requirements', 'Decide if quality is acceptable'],
          },
          {
            title: 'Testing',
            subtitle: 'Run the checks',
            tone: 'rose',
            items: ['Execute test cases', 'Explore the app', 'Log and retest defects'],
          },
        ],
      },
      { type: 'heading', value: 'Main responsibilities' },
      {
        type: 'table',
        headers: ['Responsibility', 'ShopEasy example'],
        rows: [
          ['Analyse requirements', 'Ask: "What happens if an item goes out of stock while in the cart?"'],
          ['Assess quality risk', 'Checkout and payment are high risk; the About Us page is low risk.'],
          ['Design test cases', 'Write cases for valid, invalid and boundary coupon codes.'],
          ['Prepare test data', 'Create users with empty carts, full carts and expired coupons.'],
          ['Execute tests', 'Run the checkout test cases on staging.'],
          ['Report defects', 'Log a clear bug with steps, expected and actual results.'],
          ['Verify fixes', 'Retest the bug and run regression tests around it.'],
          ['Advocate for the user', 'Point out that an error message is confusing, even if it is "technically correct".'],
          ['Report quality status', 'Tell the team what is tested, what failed and what risks remain.'],
          ['Improve processes', 'Suggest adding automated smoke tests to every build.'],
        ],
      },
      { type: 'heading', value: 'A day in the life' },
      {
        type: 'steps',
        steps: [
          { label: '09:30 Stand-up', text: 'Share progress and blockers with the team.' },
          { label: '10:00 Retest', text: 'Verify bug fixes deployed overnight.' },
          { label: '11:00 Refinement', text: 'Ask questions about next sprint\'s user stories.' },
          { label: '13:30 Testing', text: 'Test a new feature and log defects.' },
          { label: '16:00 Automation', text: 'Add or fix automated regression tests.' },
          { label: '17:00 Update', text: 'Update the test status for the team.' },
        ],
      },
      {
        type: 'example',
        title: 'Advocating for the user',
        value:
          'Feature: ShopEasy password reset.\nThe code works: the email is sent.\nBut the reset link expires after 2 minutes, and many users read email later.\nThe QA engineer raises this as a usability risk with the product owner. The team changes the expiry to 30 minutes.\nNo test "failed", but the user experience improved.',
      },
      {
        type: 'warning',
        value:
          'QA does not "own" quality alone. Developers, designers and product owners share responsibility. QA helps the whole team see and reduce risk.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'List all ShopEasy features you know (login, search, cart, checkout, password reset...).',
          'Mark each feature as High, Medium or Low quality risk.',
          'Explain in one sentence why checkout is high risk.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'What does a QA engineer own besides finding bugs? (Assessing quality risk and advocating for the user.)',
          'Is QA process-focused or product-focused? (Process-focused; QC is product-focused.)',
          'What should a QA engineer do after a bug is fixed? (Retest the fix and run regression tests.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A QA engineer is like a building safety inspector who also joins the planning meetings, so safety problems are prevented, not just found.',
    },
    mistakes: [
      'Thinking the job is only clicking and logging bugs.',
      'Seeing developers as opponents instead of teammates.',
      'Testing everything equally instead of focusing on high-risk areas.',
      'Staying silent about confusing user experience because "it is not a bug".',
      'Believing QA alone is responsible for quality.',
    ],
    takeaways: [
      'QA engineers design tests, run them, report bugs and verify fixes.',
      'They also assess quality risk and advocate for the user.',
      'QA prevents defects (process); QC detects them (product); testing runs the checks.',
      'Good QA engineers work closely with developers and product owners.',
      'QA is responsible for quality processes, not just testing.',
    ],
  },

  'm1-l7': {
    id: 'm1-l7',
    title: 'Lesson 1.7 Types of Software Testing',
    objectives: [
      'Distinguish functional and non-functional testing.',
      'Describe common functional types: smoke, sanity, regression, integration.',
      'Describe common non-functional types: performance, security, usability.',
      'Compare manual and automated testing.',
    ],
    theory:
      'Testing is broadly divided into functional testing (what the system does, e.g. smoke, sanity, regression, integration) and non-functional testing (how well it does it, e.g. load, security, usability).',
    blocks: [
      {
        type: 'text',
        value:
          'There are many types of testing. Do not try to memorise them all today. Start with the big split: functional and non-functional.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Functional testing', 'Checks WHAT the system does. Does the feature work as required?'],
          ['Non-functional testing', 'Checks HOW WELL the system works: speed, security, ease of use.'],
          ['Smoke testing', 'A quick check that the most important features work in a new build.'],
          ['Sanity testing', 'A quick, focused check of one area after a small change or fix.'],
          ['Regression testing', 'Re-running tests to make sure a change did not break old features.'],
          ['Integration testing', 'Checking that separate parts work correctly together.'],
          ['Build', 'A new version of the software ready for testing.'],
        ],
      },
      { type: 'heading', value: 'Functional vs non-functional' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Functional',
            subtitle: 'What it does',
            tone: 'olive',
            items: [
              'Smoke testing',
              'Sanity testing',
              'Regression testing',
              'Integration testing',
              'User acceptance testing (UAT)',
            ],
          },
          {
            title: 'Non-functional',
            subtitle: 'How well it does it',
            tone: 'honey',
            items: [
              'Performance: load, stress, spike, endurance',
              'Security testing',
              'Usability testing',
              'Compatibility testing (browsers, devices)',
              'Accessibility testing',
            ],
          },
        ],
      },
      { type: 'heading', value: 'Common types with ShopEasy examples' },
      {
        type: 'table',
        headers: ['Type', 'Category', 'ShopEasy example'],
        rows: [
          ['Smoke', 'Functional', 'New build: can users open the home page, log in, search and reach checkout?'],
          ['Sanity', 'Functional', 'After fixing the coupon bug, check coupons apply correctly.'],
          ['Regression', 'Functional', 'After adding a wishlist, re-run cart and checkout tests.'],
          ['Integration', 'Functional', 'Checkout correctly calls the payment service and saves the order.'],
          ['Load', 'Non-functional', '1,000 users search at the same time; response stays acceptable.'],
          ['Security', 'Non-functional', 'User A cannot open User B\'s order page by changing the URL.'],
          ['Usability', 'Non-functional', 'A new user can finish checkout without help.'],
          ['Compatibility', 'Non-functional', 'Checkout works in Chrome, Firefox, Safari and on mobile.'],
        ],
      },
      { type: 'heading', value: 'Smoke vs sanity vs regression' },
      {
        type: 'table',
        headers: ['', 'Smoke', 'Sanity', 'Regression'],
        rows: [
          ['When', 'On every new build', 'After a small change or fix', 'After any change, before release'],
          ['Scope', 'Wide but shallow', 'Narrow and focused', 'Wide and deep'],
          ['Question', '"Is the build stable enough to test?"', '"Does this fix work?"', '"Did we break anything else?"'],
          ['Good for automation?', 'Yes', 'Sometimes', 'Yes, strongly'],
        ],
      },
      { type: 'heading', value: 'Manual vs automated' },
      {
        type: 'text',
        value:
          'Any type can be manual or automated. Regression and smoke tests are repeated often, so teams usually automate them. Here is a smoke test for ShopEasy login using Selenium 4 and JUnit 5. The URL is a placeholder.',
      },
      {
        type: 'code',
        language: 'java',
        value: `import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

class LoginSmokeTest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver(); // Selenium Manager downloads the driver
    }

    @Test
    void userCanLogIn() {
        driver.get("https://shopeasy.example.com/login");
        driver.findElement(By.id("email")).sendKeys("asha@example.com");
        driver.findElement(By.id("password")).sendKeys("Secret123!");
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement welcome = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("welcome-message")));

        assertTrue(welcome.getText().contains("Welcome"));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
      },
      {
        type: 'alert',
        value: 'A balanced test suite covers both functional and non-functional aspects. A fast site with a wrong total is bad; a correct site that takes 30 seconds to load is also bad.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Write one functional and one non-functional test idea for ShopEasy search.',
          'A developer fixed the "Remove item" button. Which type of testing do you do first? Then what?',
          'List 3 ShopEasy tests you would automate for regression and explain why.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Is load testing functional or non-functional? (Non-functional.)',
          'Which type checks that a change did not break old features? (Regression testing.)',
          'What is the goal of a smoke test? (To check a new build is stable enough for further testing.)',
          'Is integration testing functional or non-functional? (Functional.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing a car: functional tests check the brakes, lights and horn work; non-functional tests check how fast it goes, how safe it is in a crash, and how comfortable the seats are.',
    },
    mistakes: [
      'Mixing up smoke testing (whole build, shallow) and sanity testing (one area, focused).',
      'Ignoring non-functional testing until users complain the site is slow.',
      'Skipping regression testing after a "small" change.',
      'Trying to automate every test, including one-time checks.',
    ],
    takeaways: [
      'Functional testing checks what the system does.',
      'Non-functional testing checks how well it works: speed, security, usability.',
      'Smoke checks build stability; sanity checks a fix; regression checks nothing else broke.',
      'Repeated tests like smoke and regression are good candidates for automation.',
      'A balanced test suite covers both functional and non-functional aspects.',
    ],
  },

  'm1-l8': {
    id: 'm1-l8',
    title: 'Lesson 1.8 Career Roadmap for QA Engineers',
    objectives: [
      'Describe common career steps in QA.',
      'Identify the skills needed for each step.',
      'Create a simple personal learning plan.',
    ],
    theory:
      'QA professionals often start in manual testing and grow into automation, SDET, QA lead or manager roles, or specialise in performance, security or mobile testing. Technical skills open more options.',
    blocks: [
      {
        type: 'text',
        value:
          'A career roadmap shows possible steps in your working life. There is no single correct path. This lesson shows common steps and the skills that help you move forward.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Junior / Associate', 'An entry-level role. You work with guidance from seniors.'],
          ['Senior', 'An experienced role. You work independently and guide others.'],
          ['Specialist', 'A person with deep skill in one area, such as performance or security.'],
          ['Soft skills', 'People skills: communication, teamwork, problem solving.'],
          ['Hard skills', 'Technical skills: SQL, Java, Selenium, Postman, Git.'],
        ],
      },
      { type: 'heading', value: 'Common career steps' },
      {
        type: 'steps',
        steps: [
          { label: 'Junior QA / Manual Tester', text: 'Run test cases, log bugs, learn the product.' },
          { label: 'QA Engineer', text: 'Design test cases, test APIs and databases, own features.' },
          { label: 'Automation Engineer', text: 'Build automated regression suites.' },
          { label: 'Senior QA / SDET', text: 'Design frameworks, set up CI testing, mentor others.' },
          { label: 'QA Lead / Test Architect / QA Manager', text: 'Lead strategy, people or technical direction.' },
        ],
      },
      { type: 'heading', value: 'Skills by stage' },
      {
        type: 'table',
        headers: ['Stage', 'Hard skills', 'Soft skills'],
        rows: [
          ['Junior QA', 'Test cases, bug reports, basic SQL, browser DevTools', 'Attention to detail, clear writing'],
          ['QA Engineer', 'Test design techniques, Postman, SQL joins, Agile', 'Asking good questions, teamwork'],
          ['Automation Engineer', 'Java 17+, Selenium 4, TestNG/JUnit 5, Maven, Git', 'Problem solving, patience with debugging'],
          ['SDET', 'Framework design, API automation, CI/CD pipelines', 'Working closely with developers, mentoring'],
          ['Lead / Manager', 'Test strategy, metrics, risk management', 'Leadership, planning, stakeholder communication'],
        ],
      },
      { type: 'heading', value: 'Specialist branches' },
      {
        type: 'compare',
        columns: [
          { title: 'Performance', tone: 'honey', items: ['JMeter or similar tools', 'Load and stress tests', 'Reading server metrics'] },
          { title: 'Security', tone: 'rose', items: ['OWASP Top 10', 'Authentication and authorization tests', 'Security scanning tools'] },
          { title: 'Mobile', tone: 'olive', items: ['Android and iOS testing', 'Appium automation', 'Device and network conditions'] },
        ],
      },
      {
        type: 'text',
        value:
          'Automation skills often start with small steps. Here is how an automation engineer might run a Maven project\'s test suite from the terminal:',
      },
      {
        type: 'code',
        language: 'bash',
        value: `# Run all tests in the project
mvn test

# Run only one test class
mvn test -Dtest=LoginSmokeTest`,
      },
      {
        type: 'example',
        title: 'A personal plan: Ravi, a support agent',
        value:
          'Now: works in customer support for an online shop, knows the product well.\nMonths 1 to 3: Modules 1 to 5; writes ShopEasy test cases and bug reports for a portfolio.\nMonths 4 to 5: Modules 6 and 7; builds a Postman collection and SQL checks.\nMonths 6 to 8: Modules 8 and 9; builds a small Selenium framework on GitHub.\nGoal: apply for junior QA roles from month 4, and automation roles after month 8.',
      },
      {
        type: 'warning',
        value: 'Timelines differ for everyone. Steady practice and real portfolio work matter more than speed.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Write where you are today (skills and experience).',
          'Choose a first target role, such as Junior QA or QA Engineer.',
          'List 3 hard skills and 2 soft skills you need for that role.',
          'Match each hard skill to a module in this course and add a target month.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Name one leadership role in QA. (QA Lead or QA Manager.)',
          'Which tools are common for an automation engineer? (For example Java, Selenium, TestNG or JUnit 5, Maven and Git.)',
          'Is communication a hard skill or a soft skill? (A soft skill.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A career roadmap is like a map app. You pick a destination, it shows a route, and you can change the route along the way if you find a better road.',
    },
    mistakes: [
      'Believing there is only one "right" career path.',
      'Learning tools without building portfolio projects to show them.',
      'Ignoring soft skills like clear writing and communication.',
      'Comparing your speed with others and giving up.',
    ],
    takeaways: [
      'Many QA careers start in manual testing and grow from there.',
      'Common next steps are automation engineer, SDET, QA lead or manager.',
      'Specialist branches include performance, security and mobile testing.',
      'Automation and technical skills accelerate career growth.',
      'Both hard skills and soft skills matter at every stage.',
      'A written, personal plan with portfolio goals keeps you on track.',
    ],
  },
};
