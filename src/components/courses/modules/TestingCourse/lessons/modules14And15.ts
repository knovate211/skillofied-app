import type { Lesson } from '../TestingCourseData';

/**
 * Expanded beginner lessons for Module 14 (AI in Software Testing)
 * and Module 15 (Capstone Projects).
 */
export const modules14And15Lessons: Record<string, Lesson> = {
  /* ------------------------------------------------------------------ */
  /* MODULE 14: AI IN SOFTWARE TESTING                                   */
  /* ------------------------------------------------------------------ */
  'm14-l1': {
    id: 'm14-l1',
    title: 'Lesson 14.1 AI in Testing',
    objectives: [
      'Explain in simple words what AI and a Large Language Model (LLM) are.',
      'List testing tasks where AI helps today and tasks where it does not.',
      'Describe why a human tester must always review AI output.',
    ],
    theory:
      'AI tools, especially Large Language Models (LLMs), can help testers draft test cases, write automation code and summarise logs. They are fast but can be wrong, so a human must always check the results.',
    blocks: [
      {
        type: 'text',
        value:
          'AI means Artificial Intelligence. It is software that learns patterns from a lot of data and then uses those patterns to make guesses. In testing, the most common kind of AI today is the Large Language Model, or LLM. Examples are ChatGPT, Claude, Gemini and GitHub Copilot.',
      },
      {
        type: 'text',
        value:
          'An LLM reads text (your question, called a prompt) and writes text back. It does not "understand" your product like a person does. It predicts likely words based on what it learned. This is why it can sound very sure and still be wrong.',
      },
      { type: 'heading', value: 'Key words' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['AI', 'Software that makes predictions or decisions from patterns in data.'],
          ['Machine Learning (ML)', 'A way to build AI by training a model on examples instead of writing every rule by hand.'],
          ['LLM', 'A large AI model trained on huge amounts of text. It can read and write text and code.'],
          ['Prompt', 'The instruction or question you give to an AI tool.'],
          ['Hallucination', 'When the AI invents facts, features or rules that do not exist.'],
          ['Human in the loop', 'A person checks and approves AI output before it is used.'],
        ],
      },
      { type: 'heading', value: 'What AI can and cannot do in QA' },
      {
        type: 'compare',
        columns: [
          {
            title: 'AI is good at',
            tone: 'olive',
            items: [
              'Drafting test case ideas from a requirement',
              'Writing first versions of automation code',
              'Summarising long logs and stack traces',
              'Grouping similar failures together',
              'Suggesting test data (valid, invalid, boundary values)',
              'Comparing screenshots to spot visual changes',
            ],
          },
          {
            title: 'AI is weak at',
            tone: 'rose',
            items: [
              'Knowing your real business rules',
              'Deciding if a result is truly correct for users',
              'Knowing what is important or risky for your company',
              'Staying accurate without clear input',
              'Explaining why it made a guess',
              'Taking responsibility for a release decision',
            ],
          },
        ],
      },
      {
        type: 'alert',
        value:
          'AI is an assistant, not a replacement for testing skill. You still need to know test design techniques, how the product works, and what "correct" means. AI makes a skilled tester faster. It does not make an unskilled tester correct.',
      },
      { type: 'heading', value: 'Where AI fits in the testing life cycle (STLC)' },
      {
        type: 'steps',
        steps: [
          { label: 'Requirement analysis', text: 'Ask AI to list unclear points and questions to ask the product owner.' },
          { label: 'Test planning', text: 'Ask AI for a draft risk list. You decide the final priorities.' },
          { label: 'Test design', text: 'Generate test case ideas, then review and fix them.' },
          { label: 'Test execution', text: 'Use AI coding help to write scripts; use visual AI to compare screens.' },
          { label: 'Defect reporting', text: 'Summarise logs and find possible duplicate bugs.' },
          { label: 'Test closure', text: 'Draft the summary report from real numbers that you provide and check.' },
        ],
      },
      {
        type: 'warning',
        value:
          'Believing AI output because it "sounds professional". AI text is often well written even when the content is wrong. Always check it against the real requirement and the real application.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'AI is like a very fast new intern who has read many books but has never seen your product. The intern gives you a lot of useful drafts quickly, but you must check every page before it goes to the customer.',
    },
    mistakes: [
      'Using AI output without reading and checking it.',
      'Expecting AI to know business rules that were never written in the prompt.',
      'Thinking AI removes the need to learn test design techniques.',
      'Using AI for release decisions instead of human judgement.',
    ],
    takeaways: [
      'An LLM predicts text; it does not truly understand your product.',
      'AI helps most with drafting, summarising and grouping.',
      'AI can hallucinate: invent features, rules or facts.',
      'A human must judge whether results are correct and meaningful.',
      'AI makes skilled testers faster; it does not replace their skills.',
    ],
  },

  'm14-l2': {
    id: 'm14-l2',
    title: 'Lesson 14.2 AI Test Case Generation',
    objectives: [
      'Write a clear prompt that asks an AI tool for test cases.',
      'Review AI-generated test cases and find common problems.',
      'Fix hallucinated requirements and add missing negative tests.',
    ],
    theory:
      'You can give an AI tool a requirement and ask it to draft test cases. The result is a fast first draft, but it often contains invented rules and misses negative cases, so you must review and fix it.',
    blocks: [
      {
        type: 'text',
        value:
          'Test case generation means asking an AI tool to write test cases for you. You give it a requirement (a description of how a feature should work). The AI gives back a list of tests. This can save time, especially for simple forms and common flows.',
      },
      {
        type: 'text',
        value:
          'The quality of the answer depends on the quality of your prompt. A vague prompt gives vague tests. A clear prompt with the real rules, the format you want and the techniques to use gives much better tests.',
      },
      { type: 'heading', value: 'Parts of a good prompt' },
      {
        type: 'syntax',
        title: 'Prompt structure',
        parts: [
          { clause: 'Role', text: 'Tell the AI who it should act as, e.g. "You are a senior QA engineer."' },
          { clause: 'Context', text: 'Paste the real requirement. Use fake data, never confidential data.' },
          { clause: 'Task', text: 'Say exactly what you want, e.g. "Write test cases for this login form."' },
          { clause: 'Techniques', text: 'Ask for positive, negative, boundary value and equivalence partitioning tests.' },
          { clause: 'Format', text: 'Ask for a table with ID, Title, Steps, Test Data, Expected Result, Priority.' },
          { clause: 'Limits', text: 'Say "Do not invent rules. If something is unclear, list it as a question."' },
        ],
      },
      {
        type: 'example',
        title: 'Example prompt',
        value: `You are a senior QA engineer.

Requirement (Signup form):
- Email is required and must be a valid email format.
- Password is required, 8 to 20 characters, at least one number.
- "Confirm password" must match "Password".
- On success, the user sees "Account created".

Task: Write manual test cases for this form.
Use positive, negative and boundary value tests.
Format: table with ID | Title | Test Data | Expected Result | Priority.
Do not invent rules that are not in the requirement.
At the end, list any open questions about unclear rules.`,
      },
      {
        type: 'example',
        title: 'Example AI output (shortened)',
        value: `ID    | Title                          | Test Data                    | Expected Result          | Priority
TC-01 | Valid signup                   | a@test.com / Passw0rd1       | "Account created"        | High
TC-02 | Email empty                    | "" / Passw0rd1               | Email required error     | High
TC-03 | Password 7 chars (below min)   | a@test.com / Pass12a         | Password length error    | High
TC-04 | Password 8 chars (min)         | a@test.com / Passwo1d        | "Account created"        | High
TC-05 | Password 21 chars (above max)  | a@test.com / (21 chars)      | Password length error    | Medium
TC-06 | Password without special char  | a@test.com / Password1       | Special character error  | Medium
TC-07 | Account locked after 3 tries   | wrong password x3            | Account locked message   | High

Open questions: none.`,
      },
      { type: 'heading', value: 'Review the output: what is wrong?' },
      {
        type: 'table',
        headers: ['Problem', 'Where', 'Fix'],
        rows: [
          ['Hallucinated requirement', 'TC-06: the requirement never asks for a special character.', 'Delete TC-06 or change it: "Password1" should be accepted.'],
          ['Wrong feature', 'TC-07: account locking is a login rule, not a signup rule.', 'Remove it, or ask the product owner if it is needed.'],
          ['Missing negative test', 'No test for "Confirm password" not matching.', 'Add: Password and Confirm password differ, expect mismatch error.'],
          ['Missing negative test', 'No invalid email format (e.g. "abc@").', 'Add invalid format tests.'],
          ['Missing boundary', 'No test for exactly 20 characters (max).', 'Add a 20-character valid password test.'],
          ['Missing rule check', 'No password with zero numbers (e.g. "Password").', 'Add: expect "at least one number" error.'],
          ['Fake "no questions"', 'Error message texts are not given in the requirement.', 'Add open question: What is the exact error text?'],
        ],
      },
      { type: 'heading', value: 'Review checklist for AI test cases' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Trace every test back to a line in the requirement. If there is no line, it may be a hallucination.',
          'Check that every rule has at least one positive and one negative test.',
          'Check boundary values: minimum, maximum, just below and just above.',
          'Check that expected results are exact, not vague ("works correctly" is not a result).',
          'Remove duplicates and tests for features that do not exist.',
          'Add business context the AI cannot know (user roles, real limits, legal rules).',
          'Run a few tests on the real app to confirm the expected results.',
        ],
      },
      {
        type: 'warning',
        value:
          'Copying AI test cases straight into the test management tool. AI often adds rules that sound normal (like special characters or account locking) but are not in your requirement. These create false bugs and waste developer time.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Using AI for test cases is like using a recipe app. It gives you a quick shopping list, but you still check your fridge. Maybe it added an item you do not need and forgot the salt.',
    },
    mistakes: [
      'Writing a vague prompt like "write tests for login" with no real rules.',
      'Accepting tests for rules that are not in the requirement (hallucinations).',
      'Not checking for missing negative and boundary tests.',
      'Pasting real customer data or secret code into a public AI tool.',
      'Skipping a trial run of the tests on the real application.',
    ],
    takeaways: [
      'A clear prompt has role, context, task, techniques, format and limits.',
      'AI test cases are a first draft, never the final version.',
      'Trace each AI test back to a real requirement line.',
      'AI often misses negative tests and invents extra rules.',
      'AI can miss business context, so a human review is required.',
    ],
  },

  'm14-l3': {
    id: 'm14-l3',
    title: 'Lesson 14.3 AI Bug Analysis',
    objectives: [
      'Use AI to summarise long logs and stack traces.',
      'Explain how AI helps find duplicate bugs and group similar failures.',
      'Describe how AI can help triage flaky tests, and its limits.',
    ],
    theory:
      'AI can read long logs, summarise errors, group similar failures and suggest likely causes. It saves time, but its suggestions are guesses that a tester or developer must confirm.',
    blocks: [
      {
        type: 'text',
        value:
          'Bug analysis means finding out what went wrong, why, and whether the bug is already known. It often means reading long log files. A log is a text file where the application writes what it is doing, including errors. A stack trace is the part of an error that shows which code lines were running when the error happened.',
      },
      {
        type: 'text',
        value:
          'Reading thousands of log lines is slow. AI tools can read them quickly and point to the important part. They can also compare a new failure with old ones.',
      },
      { type: 'heading', value: '1. Log and stack trace summarisation' },
      {
        type: 'example',
        title: 'Example prompt',
        value: `Summarise this test failure for a bug report.
Give: 1) the first real error, 2) the likely failing component,
3) 2-3 possible causes, 4) what to check next.
Mark anything you are guessing as "guess".

[paste the log here, with passwords, tokens and customer data removed]`,
      },
      {
        type: 'example',
        title: 'Example AI answer (shortened)',
        value: `1) First real error: NullPointerException in CartService.applyDiscount (line 88).
   Later errors ("500 Internal Server Error" on /checkout) come from this one.
2) Likely component: discount / coupon logic in the cart service.
3) Possible causes (guess): coupon object is null when no coupon is entered;
   discount table empty in the test environment.
4) Check next: run checkout with and without a coupon; check test data.`,
      },
      {
        type: 'alert',
        value:
          'Notice the AI found the FIRST error. In logs, one early error often causes many later errors. Finding the first one is a key skill, and AI can help. But you must still reproduce the bug yourself before reporting it.',
      },
      { type: 'heading', value: '2. Duplicate bug detection' },
      {
        type: 'text',
        value:
          'A duplicate bug is a new report for a problem that is already reported. Many bug trackers and add-ons can use AI to compare the text of a new bug with existing ones. They do not only look for the same words. They look for similar meaning, like "cannot pay" and "checkout fails at payment step". The tool then shows "possible duplicates", and a person decides.',
      },
      { type: 'heading', value: '3. Grouping failures and flaky test triage' },
      {
        type: 'text',
        value:
          'A flaky test is a test that sometimes passes and sometimes fails without any code change. Triage means sorting problems by type and priority. When 200 tests fail in a nightly run, AI-based reporting tools can cluster (group) them by similar error message, so you may find only 3 real root causes.',
      },
      {
        type: 'table',
        headers: ['Failure pattern', 'What AI may suggest', 'What you must confirm'],
        rows: [
          ['Same test fails 1 time in 10, different errors each time', 'Probably flaky (timing or test data)', 'Re-run it; look for missing waits or shared data'],
          ['50 tests fail with "Connection refused"', 'Environment problem, not 50 bugs', 'Check if the server or database was down'],
          ['New failure after a specific commit, fails every time', 'Likely a real regression bug', 'Reproduce manually; report with steps'],
          ['TimeoutException only on the CI server', 'Slow environment or wait problem', 'Compare with local runs; check explicit waits'],
        ],
      },
      {
        type: 'steps',
        title: 'A safe AI-assisted bug analysis flow',
        steps: [
          { label: 'Collect', text: 'Get the logs, screenshot and test name.' },
          { label: 'Clean', text: 'Remove passwords, tokens, personal and customer data.' },
          { label: 'Ask', text: 'Ask AI for a summary, first error and possible causes.' },
          { label: 'Reproduce', text: 'Try the steps yourself on the test environment.' },
          { label: 'Search', text: 'Check the bug tracker for duplicates (AI suggestions + your own search).' },
          { label: 'Report', text: 'Write the bug report with real steps, actual and expected results.' },
        ],
      },
      {
        type: 'warning',
        value:
          'Marking a test as "flaky" just because AI said so. Some "flaky" failures are real bugs, for example a race condition that only happens sometimes. Real users can hit those bugs too.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'AI bug analysis is like a smart sorting machine at a post office. It groups letters by address very fast, but a person still opens the strange ones and decides what to do.',
    },
    mistakes: [
      'Putting the AI summary in the bug report without reproducing the bug.',
      'Pasting logs that contain passwords, tokens or customer data into an AI tool.',
      'Believing the suggested root cause is proven when it is only a guess.',
      'Ignoring tests marked as flaky instead of investigating them.',
      'Closing a bug as duplicate only because the AI tool said "similar".',
    ],
    takeaways: [
      'AI can summarise long logs and find the first real error quickly.',
      'AI can cluster similar failures and suggest likely causes.',
      'Duplicate detection compares meaning, but a person makes the final call.',
      'Flaky tests may hide real bugs; investigate before ignoring.',
      'AI does not fix all bugs automatically; humans confirm and fix.',
    ],
  },

  'm14-l4': {
    id: 'm14-l4',
    title: 'Lesson 14.4 Self-Healing Automation',
    objectives: [
      'Explain why UI tests break when locators change.',
      'Describe how self-healing locators use multiple attributes and scoring.',
      'Explain the risk of self-healing hiding real bugs, and how to control it.',
    ],
    theory:
      'Self-healing tools remember many attributes of each element. When the main locator breaks, they find the most similar element and continue, which reduces maintenance. The risk is that they silently pick the wrong element, so every heal must be reviewed.',
    blocks: [
      {
        type: 'text',
        value:
          'A locator is how an automation test finds an element on a page, for example By.id("login-button") or a CSS selector. The DOM (Document Object Model) is the structure of the web page that the browser builds from HTML. When developers change the page, an id or class can change. Then the locator finds nothing and the test fails, even though the feature still works. This is called a brittle (easily broken) test.',
      },
      {
        type: 'text',
        value:
          'Self-healing automation tries to fix this automatically. When a locator fails, the tool looks for the element in another way and updates the selector, so the test can continue.',
      },
      { type: 'heading', value: 'How self-healing works' },
      {
        type: 'steps',
        steps: [
          { label: 'Learn', text: 'On a passing run, the tool saves many attributes of the element: id, name, class, text, tag, position, nearby labels and parent elements.' },
          { label: 'Detect', text: 'On a later run, the main locator finds no element (or the wrong kind).' },
          { label: 'Search', text: 'The tool looks at candidate elements on the current page.' },
          { label: 'Score', text: 'Each candidate gets a similarity score based on how many saved attributes match.' },
          { label: 'Heal', text: 'If the best score is above a threshold (a minimum level), the tool uses that element.' },
          { label: 'Report', text: 'Good tools log the heal: old locator, new locator and score, so a person can review it.' },
        ],
      },
      {
        type: 'example',
        title: 'Example of fallback scoring',
        value: `Saved element "Login button":
  id="login-btn"  text="Log in"  tag=button  class="btn primary"  inside form#login

New page: id="login-btn" is gone. Candidates:
  A) <button id="signin" class="btn primary">Log in</button>   inside form#login
     matches: text, tag, class, parent  -> score 0.85
  B) <button id="help" class="btn">Help</button>                inside form#login
     matches: tag, parent               -> score 0.40

Threshold = 0.70 -> tool uses A and logs "healed: #login-btn -> #signin (0.85)"`,
      },
      { type: 'heading', value: 'Benefits and risks' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Benefits',
            tone: 'olive',
            items: [
              'Fewer failures caused only by small UI changes',
              'Less time spent fixing locators',
              'Nightly runs keep going instead of stopping early',
            ],
          },
          {
            title: 'Risks',
            tone: 'rose',
            items: [
              'Silently binding to the wrong element',
              'Hiding a real bug (e.g. a button really disappeared)',
              'A passing test that no longer tests the right thing',
              'Teams stop writing stable locators',
            ],
          },
        ],
      },
      {
        type: 'text',
        value:
          'Imagine the "Pay now" button was removed by mistake, and a "Save for later" button sits in the same place with the same style. A self-healing tool might click "Save for later" and the test might continue. The test passes, but real users cannot pay. This is why self-healing must never be fully silent.',
      },
      { type: 'heading', value: 'How to use self-healing safely' },
      {
        type: 'list',
        items: [
          'Keep writing stable locators first: ask developers for data-testid or unique ids.',
          'Set a high threshold, so weak matches fail instead of healing.',
          'Review the heal report after every run. Accept or reject each heal.',
          'Update the real locator in code after you accept a heal.',
          'Never let self-healing change assertions (the checks). It should only find elements.',
          'Keep strong assertions after each important step, e.g. check the order confirmation text.',
        ],
      },
      {
        type: 'alert',
        value:
          'Examples: commercial tools such as Testim, mabl and Katalon include self-healing features. Healenium is an open-source library that adds self-healing to Selenium tests. Features and settings differ by tool and version, so read the current documentation.',
      },
      {
        type: 'warning',
        value:
          'Treating a green (passing) run as proof that everything works when some steps were healed. A healed step means "something changed". Someone must check what changed.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Self-healing is like a delivery driver whose GPS address is wrong. The driver finds a house that looks very similar and delivers there. Usually it is right, but sometimes the parcel goes to the neighbour, so the driver must tell you where it went.',
    },
    mistakes: [
      'Turning on self-healing and never reading the heal reports.',
      'Using a low similarity threshold that accepts weak matches.',
      'Relying on self-healing instead of writing stable locators.',
      'Believing self-healing can rewrite failing assertions to make tests pass (it should not).',
    ],
    takeaways: [
      'Locators break when the DOM changes, even if the feature works.',
      'Self-healing stores many attributes and scores candidate elements.',
      'Its main benefit is automatically updating selectors, reducing maintenance.',
      'Its main danger is silently binding to the wrong element.',
      'Review every heal and keep strong assertions.',
    ],
  },

  'm14-l5': {
    id: 'm14-l5',
    title: 'Lesson 14.5 AI Testing Tools',
    objectives: [
      'Name common AI-assisted testing tools and what category they belong to.',
      'Explain how visual AI testing differs from HTML assertions.',
      'Choose questions to ask before adopting an AI testing tool, including data privacy.',
    ],
    theory:
      'AI testing tools fall into groups: coding assistants, AI-assisted low-code platforms, visual AI and browser agents. Each helps with different tasks, and each must be checked for accuracy, cost and data privacy before use.',
    blocks: [
      {
        type: 'text',
        value:
          'Many testing tools now say they use "AI". Some use it a lot, some only a little. As a beginner, it helps to group tools by what they do. Do not choose a tool because of marketing words. Choose it because it solves a real problem in your team.',
      },
      { type: 'heading', value: 'Common tools (general overview)' },
      {
        type: 'table',
        headers: ['Tool', 'Category', 'What it helps with'],
        rows: [
          ['GitHub Copilot', 'AI coding assistant', 'Suggests code in the editor and answers questions in chat. Can draft unit tests and Selenium/Playwright code that you review.'],
          ['Playwright codegen', 'Recorder (not AI)', 'Records your browser clicks and writes Playwright test code. Good starting point; still needs clean-up.'],
          ['Playwright MCP', 'Browser control for AI agents', 'An MCP (Model Context Protocol) server that lets an AI assistant open and control a browser using the page structure. Used to explore apps and draft tests.'],
          ['Testim (Tricentis)', 'AI-assisted UI automation platform', 'Record and edit UI tests; uses "smart locators" that look at many element attributes to reduce broken tests.'],
          ['mabl', 'Low-code test automation platform', 'Cloud-based web, API and mobile testing with auto-healing and AI-assisted features.'],
          ['Applitools Eyes', 'Visual AI testing', 'Compares screenshots with a baseline using Visual AI to find visual differences that matter, ignoring tiny rendering noise.'],
          ['Katalon', 'Test automation platform', 'Web, API, mobile and desktop testing with self-healing and AI assistant features.'],
        ],
      },
      {
        type: 'alert',
        value:
          'Tools change fast. Features, plans and prices change often, so always check the official website and documentation before you decide. This table describes general categories, not a full feature list.',
      },
      { type: 'heading', value: 'Visual AI vs HTML assertions' },
      {
        type: 'compare',
        columns: [
          {
            title: 'HTML / DOM assertion',
            tone: 'honey',
            items: [
              'Checks code values, e.g. text equals "Total: $40"',
              'Cannot see if the text is hidden behind another element',
              'Cannot see wrong colours or broken layout',
              'Very precise for data and logic',
            ],
          },
          {
            title: 'Visual AI testing',
            tone: 'olive',
            items: [
              'Compares screenshots with an approved baseline',
              'Finds overlaps, missing images, layout shifts',
              'Uses ML to ignore tiny pixel noise that humans cannot see',
              'Finds visual changes even when the HTML looks fine',
            ],
          },
        ],
      },
      {
        type: 'text',
        value:
          'A baseline is the approved "correct" screenshot. On each run, the tool takes a new screenshot and compares it to the baseline. A person then accepts the change (new baseline) or reports a bug. The best approach uses both: DOM assertions for data, and visual checks for how the page looks.',
      },
      { type: 'heading', value: 'Questions to ask before you adopt a tool' },
      {
        type: 'list',
        ordered: true,
        items: [
          'What problem does it solve for us? (flaky locators, slow test writing, visual bugs?)',
          'Where does our data go? Is it stored or used to train models?',
          'Can we export our tests, or are we locked in to this tool?',
          'Does it work with our CI pipeline (e.g. GitHub Actions, Jenkins)?',
          'How do we review what the AI did (heal logs, change reports)?',
          'What is the total cost for our team size?',
        ],
      },
      {
        type: 'warning',
        value:
          'Pasting confidential data into AI tools. Real customer data, passwords, API keys, private source code and unreleased product plans must not go into public AI chat tools. Use only company-approved tools, remove secrets first, and follow your company policy and privacy laws such as GDPR.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Choosing an AI testing tool is like choosing a kitchen machine. A blender, an oven and a coffee maker are all "smart", but each does a different job. Buy the one that fits what you cook, and read the manual.',
    },
    mistakes: [
      'Choosing a tool because of the word "AI" instead of a real need.',
      'Believing a tool has a feature without checking current documentation.',
      'Using only visual checks and no data assertions (or the reverse).',
      'Sending confidential data or secrets to an unapproved AI service.',
      'Accepting every visual difference as a new baseline without looking.',
    ],
    takeaways: [
      'Group tools by job: coding help, low-code platforms, visual AI, browser agents.',
      'Applitools Eyes is known for AI-powered visual regression testing.',
      'Visual AI compares screenshots and finds visual changes regardless of HTML changes.',
      'Playwright codegen is a recorder; Playwright MCP lets AI agents control a browser.',
      'Never paste confidential data into AI tools that are not approved.',
    ],
  },

  'm14-l6': {
    id: 'm14-l6',
    title: 'Lesson 14.6 Future of QA',
    objectives: [
      'Describe how the QA role is changing because of AI.',
      'List skills that stay important and new skills to learn.',
      'Explain what "testing AI features" means as a new kind of work.',
    ],
    theory:
      'AI will take over some repetitive testing tasks, but the need for human judgement about quality stays. Future QA engineers combine strong testing basics with skills in automation, AI tools and testing AI-based features.',
    blocks: [
      {
        type: 'text',
        value:
          'Many people ask, "Will AI replace testers?" A balanced answer is: AI changes the work, but it does not remove the need for quality. Some simple, repetitive tasks, like writing basic test steps, become faster with AI. But someone must still decide what to test, judge the results and speak for the user.',
      },
      { type: 'heading', value: 'How tasks are changing' },
      {
        type: 'table',
        headers: ['Task', 'Before AI tools', 'With AI tools'],
        rows: [
          ['Writing test cases', 'Written fully by hand', 'AI drafts, tester reviews and improves'],
          ['Writing automation code', 'Written line by line', 'AI suggests code, tester checks design and correctness'],
          ['Maintaining locators', 'Fixed by hand after each UI change', 'Self-healing suggests fixes, tester approves'],
          ['Analysing failures', 'Read every log', 'AI groups and summarises, tester confirms cause'],
          ['Deciding if quality is good enough', 'Human judgement', 'Still human judgement'],
        ],
      },
      { type: 'heading', value: 'Skills that stay important' },
      {
        type: 'list',
        items: [
          'Test design techniques: boundary values, equivalence partitioning, decision tables.',
          'Understanding the business and the user.',
          'Clear bug reports and good communication.',
          'Risk-based thinking: what can hurt users or the company most?',
          'Exploratory testing: learning the product and finding unexpected problems.',
        ],
      },
      { type: 'heading', value: 'New skills worth learning' },
      {
        type: 'list',
        items: [
          'Prompt writing and reviewing AI output carefully.',
          'Automation with code (Selenium, Playwright, API testing) so you can check AI-written code.',
          'CI/CD pipelines, so tests run automatically on every change.',
          'Data privacy and security basics when using AI tools.',
          'Testing AI features: checking chatbots and AI outputs for wrong, unsafe, biased or inconsistent answers.',
        ],
      },
      {
        type: 'text',
        value:
          'Testing AI features is a new area. An AI chatbot may give a different answer to the same question each time. So testers cannot always check for one exact expected result. Instead they check rules: Is the answer correct? Is it safe? Does it leak private data? Does it stay on topic? This needs good test design and clear quality criteria.',
      },
      {
        type: 'steps',
        title: 'A simple learning path',
        steps: [
          { label: 'Strong basics', text: 'Manual testing, STLC, test design, bug reporting.' },
          { label: 'Automation', text: 'One UI tool, one API tool, Git and a CI pipeline.' },
          { label: 'AI assistants', text: 'Use AI to draft tests and code; practise reviewing it.' },
          { label: 'Specialise', text: 'Choose a direction: automation, performance, security, or testing AI systems.' },
        ],
      },
      {
        type: 'warning',
        value:
          'Skipping the basics and learning only AI tools. Without testing fundamentals, you cannot tell when the AI is wrong, and that is exactly the skill companies need.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Calculators did not remove the need for accountants. They removed slow manual adding. Accountants who used calculators well did more valuable work. AI can do the same for testers.',
    },
    mistakes: [
      'Believing AI will do all testing, so learning testing is not needed.',
      'Ignoring AI tools completely and falling behind.',
      'Learning tool names without understanding testing principles.',
      'Assuming AI features can be tested only with exact expected outputs.',
    ],
    takeaways: [
      'AI changes QA work; it does not remove the need for quality judgement.',
      'Test design, risk thinking and communication stay core skills.',
      'Automation, CI/CD and AI-tool skills make testers more valuable.',
      'Testing AI features is a growing new area of QA.',
      'Continuous learning is the best way to keep your career strong.',
    ],
  },

  /* ------------------------------------------------------------------ */
  /* MODULE 15: CAPSTONE PROJECTS                                        */
  /* ------------------------------------------------------------------ */
  'm15-p1': {
    id: 'm15-p1',
    title: 'Project 1: E-Commerce Website Testing',
    objectives: [
      'Plan and test the main shopping flow: login, products, cart and checkout.',
      'Write positive, negative and boundary test cases and clear bug reports.',
      'Automate the most important flows and present the project on GitHub.',
    ],
    theory:
      'In this project you test a demo online shop (SauceDemo) from login to order confirmation. You write a test plan, manual test cases, bug reports, a few automated scripts and a summary report.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You are the QA engineer for an online shop. The team wants to release a new version. Your job is to check that customers can log in, find products, add them to the cart and complete checkout. You will use SauceDemo (https://www.saucedemo.com), a free practice website made for testers.',
      },
      {
        type: 'text',
        value:
          'SauceDemo shows its test users on the login page, for example standard_user, locked_out_user and problem_user. All use the password shown on that page (secret_sauce). Some users are designed to show bugs or slow behaviour, which is perfect for practice. No real payment happens.',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Login and logout (valid, invalid, locked user)', 'Real payment gateways (the demo has none)'],
          ['Product list and sorting (name, price)', 'Coupons and discounts (not in this demo; list as a risk for a real shop)'],
          ['Product details page', 'Load and performance testing'],
          ['Add to cart, remove from cart, cart badge count', 'Security penetration testing'],
          ['Checkout: customer info, overview, total, finish', 'Mobile apps'],
          ['Basic cross-browser check (Chrome, Firefox)', 'Backend database checks'],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Explore (half day)', text: 'Use the site as each test user. Write notes and questions.' },
          { label: '2. Test plan', text: 'Write scope, approach, environments, entry/exit criteria and risks.' },
          { label: '3. Test cases', text: 'Write 25-40 test cases. Checkout and payment flow first.' },
          { label: '4. Execute and report bugs', text: 'Run the cases, record Pass/Fail, and log bugs with screenshots.' },
          { label: '5. Automate', text: 'Automate 5-8 key flows with Selenium or Playwright.' },
          { label: '6. Summary report', text: 'Coverage, results, defects found and open risks.' },
        ],
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Format', 'Must contain'],
        rows: [
          ['Test plan', 'PDF or Markdown', 'Scope, approach, environments, schedule, risks, entry/exit criteria'],
          ['Test cases', 'Excel/Google Sheet or test tool export', 'ID, title, preconditions, steps, data, expected, actual, status, priority'],
          ['Bug reports', 'Sheet, Jira or GitHub Issues', 'Title, steps, expected vs actual, severity, priority, evidence'],
          ['Automation code', 'GitHub repository', 'Page objects, tests, test data, README with run command'],
          ['Test summary report', 'PDF or Markdown', 'Coverage, pass/fail numbers, defects by severity, open risks, recommendation'],
        ],
      },
      { type: 'heading', value: 'Sample test cases' },
      {
        type: 'table',
        headers: ['ID', 'Title', 'Steps', 'Test data', 'Expected result', 'Priority'],
        rows: [
          ['TC-LOGIN-01', 'Login with valid user', 'Open site, enter user and password, click Login', 'standard_user / secret_sauce', 'Products page is shown', 'High'],
          ['TC-LOGIN-03', 'Locked user cannot log in', 'Enter locked user, click Login', 'locked_out_user / secret_sauce', 'Error says the user has been locked out', 'High'],
          ['TC-CART-02', 'Cart badge count updates', 'Add 2 products, remove 1', 'standard_user', 'Badge shows 2, then 1', 'High'],
          ['TC-CHK-04', 'Checkout without first name', 'Cart > Checkout, leave First Name empty, click Continue', 'Last name: Test, Zip: 12345', 'Error "First Name is required"', 'High'],
          ['TC-CHK-07', 'Order total is correct', 'Add 2 products, go to Checkout overview', 'Two known product prices', 'Item total = sum of prices; Total = item total + tax', 'High'],
          ['TC-SORT-02', 'Sort price low to high', 'Choose "Price (low to high)"', 'standard_user', 'Products appear in ascending price order', 'Medium'],
        ],
      },
      {
        type: 'example',
        title: 'Sample bug report',
        value: `ID: BUG-012
Title: Product images show the same wrong picture for problem_user
Environment: https://www.saucedemo.com, Chrome (latest), Windows 11
Precondition: Logged in as problem_user
Steps:
  1. Log in as problem_user / secret_sauce
  2. Look at the product list
Expected: Each product shows its own correct image
Actual: All products show the same image, which does not match the product names
Severity: Medium   Priority: Medium
Evidence: screenshot BUG-012.png
Note: Works correctly for standard_user`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Checkout and payment: wrong totals or a blocked checkout means lost money. Test this first.',
          'Cart state: items lost after navigation, or wrong badge counts.',
          'Form validation: empty or invalid customer information.',
          'Different user types behaving differently (locked, slow or buggy users).',
          'In a real shop: coupon expiry, stock limits and price changes during checkout.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Test plan quality', '15%', 'Clear scope, realistic risks, measurable exit criteria'],
          ['Test case coverage', '25%', 'All in-scope features; positive, negative and boundary cases; checkout prioritised'],
          ['Bug reports', '20%', 'Reproducible steps, clear expected vs actual, correct severity, evidence'],
          ['Automation', '25%', 'Page Object Model, no Thread.sleep, stable locators, tests pass on a clean run'],
          ['Summary report and presentation', '15%', 'Honest numbers, open risks, clean README'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'Repository name like "saucedemo-qa-project".',
          'README: project goal, scope, tools, how to run tests, link to test cases and reports.',
          'Folders: docs/ (plan, summary), test-cases/, bug-reports/, src/ (automation).',
          'Add a screenshot of a test report and 2-3 of your best bug reports.',
        ],
      },
      { type: 'heading', value: 'Self-review checklist' },
      {
        type: 'list',
        items: [
          'Did I test checkout and payment flow before less important pages?',
          'Does every feature have at least one negative test?',
          'Can someone else reproduce each bug from my steps alone?',
          'Does my summary report list open risks, not only pass counts?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing a shop is like being a secret shopper. You walk through the store as a real customer, from the door to the cash register, and note every place where a customer could get stuck or pay the wrong amount.',
    },
    mistakes: [
      'Spending most time on footer links and "About" pages instead of checkout.',
      'Writing only happy-path tests with valid data.',
      'Bug reports without the test user, browser or screenshot.',
      'Automating everything before the manual cases are stable.',
    ],
    takeaways: [
      'Test the money path (checkout and payment) first.',
      'Use the demo test users to practise finding different kinds of bugs.',
      'Negative tests prove the site handles invalid input safely.',
      'Deliver a plan, cases, bugs, code and a summary report.',
      'A good README makes your project easy to understand for employers.',
    ],
  },

  'm15-p2': {
    id: 'm15-p2',
    title: 'Project 2: Banking Application Testing',
    objectives: [
      'Test core banking flows: registration, accounts, transfers and bill pay.',
      'Verify that balances stay consistent, including when a step fails.',
      'Test security rules such as unauthorised access and session handling.',
    ],
    theory:
      'In this project you test a demo online bank (ParaBank). The focus is on money transfers, balances, transaction history and security, because in banking a small mistake can mean lost money.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You are the QA engineer for an online bank. Customers must be able to open accounts, move money and pay bills safely. You will use ParaBank (https://parabank.parasoft.com), a free demo bank made by Parasoft for testing practice. You can register your own fake customer. No real money is used.',
      },
      {
        type: 'alert',
        value:
          'ParaBank is a shared public demo. Its data can be reset, and other people use it at the same time. Create your own user, write down account numbers at the start of each session, and never enter real personal information.',
      },
      {
        type: 'text',
        value:
          'Key word: transaction integrity. It means a money movement happens completely or not at all. If $100 leaves account A, exactly $100 must arrive in account B. If something fails in the middle, both balances must go back to the start (this is called a rollback).',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Register, log in, log out', 'Real payment networks and card systems'],
          ['Open new account (checking, savings)', 'Load and stress testing of the public demo'],
          ['Accounts overview and account activity', 'Direct database access (not available on the demo)'],
          ['Transfer funds between own accounts', 'Attacking the demo site (only safe, basic security checks)'],
          ['Bill pay, find transactions, update contact info', 'Mobile apps'],
          ['Access without login (direct URLs), session after logout', 'Performance of third-party services'],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Explore', text: 'Register a user, open a second account, try each menu item.' },
          { label: '2. Test plan', text: 'Highlight money-related risks and security checks.' },
          { label: '3. Test cases', text: '30-45 cases; transfers and balances first.' },
          { label: '4. Execute and log bugs', text: 'Record balances before and after every money test.' },
          { label: '5. Data checks', text: 'Confirm balances in Accounts Overview and Account Activity match your calculation.' },
          { label: '6. Automate + report', text: 'Automate login and transfer checks; write the summary report.' },
        ],
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['Test plan', 'Scope, risks (money, security, data), test data strategy, entry/exit criteria'],
          ['Test cases', 'Before/after balances in the data column for every money test'],
          ['Bug reports', 'Account numbers used, amounts, exact steps, screenshots'],
          ['Automation code', 'Login, open account and transfer tests using Page Object Model'],
          ['Summary report', 'Coverage, defects by severity, balance consistency results, open risks'],
        ],
      },
      { type: 'heading', value: 'Sample test cases' },
      {
        type: 'table',
        headers: ['ID', 'Title', 'Test data', 'Expected result', 'Priority'],
        rows: [
          ['TC-TRF-01', 'Transfer valid amount', 'From A (balance 500) to B (balance 100), amount 50', 'Success message; A = 450, B = 150; both show the transaction', 'High'],
          ['TC-TRF-03', 'Transfer more than balance', 'From A (balance 100), amount 1000', 'Rejected or clearly handled; no negative or wrong balance without a rule', 'High'],
          ['TC-TRF-04', 'Transfer with empty amount', 'Amount blank', 'Validation error; balances unchanged', 'High'],
          ['TC-TRF-05', 'Transfer with text in amount', 'Amount "abc"', 'Validation error; balances unchanged', 'High'],
          ['TC-SEC-01', 'Open account page without login', 'Paste overview URL in a new private window', 'Redirect to login or error; no account data shown', 'High'],
          ['TC-SEC-02', 'Back button after logout', 'Log out, press browser Back', 'No account data is usable; actions ask for login', 'High'],
        ],
      },
      {
        type: 'example',
        title: 'Sample bug report (format example)',
        value: `ID: BUG-021
Title: Transfer of amount larger than balance is accepted and makes balance negative
Environment: ParaBank demo, Chrome (latest)
Test data: Account 13344 balance $100.00, Account 13455 balance $0.00
Steps:
  1. Log in as test user "qa_student1"
  2. Open Transfer Funds
  3. Amount: 1000, From: 13344, To: 13455, click Transfer
Expected: Transfer is rejected with "insufficient funds" (or follows the documented overdraft rule)
Actual: "Transfer Complete!" is shown. Account 13344 shows -$900.00
Severity: High   Priority: High
Evidence: before.png, after.png
Note: Confirm the business rule with the product owner; the demo has no written spec.`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Balances stay consistent even when a step fails (no money created or lost).',
          'Invalid amounts: zero, negative, decimals with many digits, very large values, text.',
          'Unauthorised access: viewing pages or other accounts without the right login.',
          'Session handling: logout, back button, session timeout.',
          'Transaction history: every transfer and bill payment appears once, with the right amount and date.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Money flow coverage', '30%', 'Every transfer and bill pay test records balances before and after'],
          ['Negative and boundary tests', '20%', 'Zero, negative, too large, empty and text amounts covered'],
          ['Security checks', '15%', 'Direct URL access, logout and session tests included'],
          ['Bug reports', '20%', 'Exact accounts, amounts and evidence; correct severity'],
          ['Automation and summary report', '15%', 'Stable tests; report lists open risks honestly'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'README: explain "transaction integrity" and how you checked it.',
          'Include a small balance-check table (before, amount, after, result).',
          'Show one high-severity bug report as a highlight.',
          'Never commit real passwords; use a config file with demo values only.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Why must you record balances both before and after a transfer?',
          'What should happen to both balances if a transfer fails halfway?',
          'Name three invalid amount values you tested.',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A bank transfer is like handing a box from one person to another. The box must never be dropped in the middle. Either the second person has it, or the first person still has it.',
    },
    mistakes: [
      'Checking only the "Transfer Complete" message, not the actual balances.',
      'Skipping negative amounts and text input in money fields.',
      'Forgetting security tests like opening pages without logging in.',
      'Using real personal details on a public demo site.',
      'Not noting account numbers and amounts in bug reports.',
    ],
    takeaways: [
      'In banking, balance consistency is the most important check.',
      'Transaction integrity: all or nothing, with rollback on failure.',
      'Always record balances before and after every money test.',
      'Security and session tests are required, not optional.',
      'Public demo data can reset, so plan your test data carefully.',
    ],
  },

  'm15-p3': {
    id: 'm15-p3',
    title: 'Project 3: LMS Website Testing',
    objectives: [
      'Test a Learning Management System: courses, enrolment, lessons, quizzes and certificates.',
      'Check role-based access for students, teachers and admins.',
      'Verify that progress and enrolment status update correctly.',
    ],
    theory:
      'An LMS (Learning Management System) is a website for online courses. In this project you test enrolment, lesson content, quizzes, progress tracking and certificates for different user roles.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You are the QA engineer for an online learning platform. Students browse courses, enrol, watch videos, take quizzes and receive a certificate. Teachers create courses and grade quizzes. Admins manage users.',
      },
      {
        type: 'text',
        value:
          'Where to test: use any open-source LMS demo. A good option is the public Moodle demo site linked from moodle.org/demo, which provides demo accounts and resets regularly. You can also install an open-source LMS locally, or test against a written specification provided by your mentor. Adjust feature names to match the system you use.',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Course catalogue, search and course details', 'Payment for paid courses (unless your demo has it)'],
          ['Enrolment and un-enrolment', 'Video streaming performance under load'],
          ['Lesson pages, video player controls, file downloads', 'Third-party video hosting internals'],
          ['Quizzes: attempts, time limits, scoring, feedback', 'Email delivery servers'],
          ['Progress tracking and certificate generation', 'Mobile apps'],
          ['Roles: student, teacher, admin permissions', 'Data migration'],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Learn the roles', text: 'Log in as student and teacher; map what each can do.' },
          { label: '2. Test plan', text: 'Define roles, features, risks and test data (course, quiz, users).' },
          { label: '3. Test cases', text: '30-40 cases covering enrolment, quizzes, progress and permissions.' },
          { label: '4. Execute', text: 'Run cases in two roles at the same time (two browsers).' },
          { label: '5. Bugs and automation', text: 'Log bugs; automate login, enrol and quiz submit.' },
          { label: '6. Summary report', text: 'Coverage per role, defects, open risks.' },
        ],
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['Test plan', 'Role matrix, scope, risks, environment (which demo or spec)'],
          ['Test cases', 'Role column for each case; quiz scoring cases with expected scores'],
          ['Permission matrix', 'Table of role vs action (allowed / not allowed) with results'],
          ['Bug reports', 'Role used, course name, steps, evidence'],
          ['Automation + summary report', 'Key flows automated; coverage by role and open risks'],
        ],
      },
      { type: 'heading', value: 'Sample test cases' },
      {
        type: 'table',
        headers: ['ID', 'Role', 'Title', 'Expected result', 'Priority'],
        rows: [
          ['TC-ENR-01', 'Student', 'Enrol in an open course', 'Course appears in "My courses"; status shows enrolled at once', 'High'],
          ['TC-ENR-04', 'Student', 'Open lesson URL of a course not enrolled in', 'Access denied or enrol page; lesson content not shown', 'High'],
          ['TC-QZ-02', 'Student', 'Submit quiz with 3 of 5 correct (1 point each)', 'Score 3/5 (60%) shown; attempt saved', 'High'],
          ['TC-QZ-05', 'Student', 'Quiz time limit ends', 'Quiz closes/submits per settings; no answers after time', 'Medium'],
          ['TC-CERT-01', 'Student', 'Complete all required activities', 'Progress 100%; certificate available with correct name and date', 'High'],
          ['TC-ROLE-03', 'Student', 'Try to open teacher grading page', 'Permission error; no grades editable', 'High'],
        ],
      },
      {
        type: 'example',
        title: 'Sample bug report (format example)',
        value: `ID: BUG-007
Title: Course progress stays at 80% after completing the last lesson
Environment: LMS demo site, Firefox (latest)
Role: Student (demo account)
Steps:
  1. Enrol in "Demo Course 1"
  2. Complete lessons 1-5 (mark each as complete)
  3. Open the course dashboard
Expected: Progress shows 100% and certificate becomes available
Actual: Progress shows 80%; certificate link is disabled. After logout/login it shows 100%
Severity: Medium   Priority: High (blocks certificates)
Evidence: progress-80.png, progress-after-relogin.png`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Enrolment status not updating in real time (student cannot see the course).',
          'Wrong quiz scoring or lost quiz attempts.',
          'Students reaching teacher or admin features (permission bugs).',
          'Certificates with wrong names, dates, or issued before completion.',
          'Video player problems on different browsers (play, pause, seek, subtitles).',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Role coverage', '25%', 'Permission matrix covers every role and key action'],
          ['Functional coverage', '25%', 'Enrolment, lessons, quizzes, progress and certificates all tested'],
          ['Quiz and progress accuracy', '20%', 'Expected scores and percentages calculated and verified'],
          ['Bug reports', '15%', 'Role and course named, reproducible, evidence attached'],
          ['Automation and report', '15%', 'Key flows automated; report shows risks per role'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'State clearly which LMS demo or spec you tested, and the date.',
          'Put the role permission matrix in the README; it shows structured thinking.',
          'Do not commit shared demo passwords if the site asks you not to; describe how to get them.',
        ],
      },
      { type: 'heading', value: 'Self-review checklist' },
      {
        type: 'list',
        items: [
          'Did I test each feature with more than one role?',
          'Did I calculate expected quiz scores before running the quiz?',
          'Did I check that a student cannot open content without enrolling?',
          'Did I note which demo site and version I used?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing an LMS is like checking a school. Students must get into the right classes, exams must be marked correctly, only teachers can change grades, and the diploma must have the right name on it.',
    },
    mistakes: [
      'Testing only as a student and forgetting teacher and admin roles.',
      'Not calculating expected quiz scores in advance.',
      'Ignoring direct-URL access to lessons without enrolment.',
      'Not saying which demo site or version was tested.',
    ],
    takeaways: [
      'An LMS has many roles; permissions are a top risk.',
      'Enrolment status and progress must update correctly and quickly.',
      'Quiz scoring and certificates need exact expected results.',
      'A role permission matrix is a strong deliverable.',
      'Any open-source LMS demo or a provided spec can be used.',
    ],
  },

  'm15-p4': {
    id: 'm15-p4',
    title: 'Project 4: HMS Website Testing',
    objectives: [
      'Test a Hospital Management System: patients, doctors, appointments and records.',
      'Find scheduling bugs such as double booking and invalid time slots.',
      'Check that patient data is protected and handled with privacy rules in mind.',
    ],
    theory:
      'An HMS (Hospital Management System) manages patients, doctors and appointments. In this project you test booking rules, doctor slots, patient records and data privacy, using only fake patient data.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You are the QA engineer for a hospital website. Patients book appointments with doctors. Receptionists manage schedules. Doctors view patient records. A mistake here can mean a missed appointment or private health data shown to the wrong person.',
      },
      {
        type: 'text',
        value:
          'Where to test: use an open-source hospital or clinic system demo (for example, OpenEMR offers public demo instances on its website), a local installation, or a specification provided by your mentor. Always use fake (synthetic) patient data. Adjust feature names to match your system.',
      },
      {
        type: 'warning',
        value:
          'Using real patient names or health details in test data or screenshots. Health data is highly sensitive. Laws such as GDPR (Europe) and HIPAA (USA) protect it. Always use invented data like "Test Patient 01".',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Patient registration and profile update', 'Medical device integrations'],
          ['Doctor list, specialities and available slots', 'Insurance claim processing'],
          ['Book, reschedule and cancel appointments', 'Billing and payment systems'],
          ['Double-booking and past-date rules', 'Legal compliance audit (only basic privacy checks)'],
          ['Patient record access by role (patient, doctor, receptionist)', 'Load testing'],
          ['Notifications shown in the app for bookings', 'SMS and email delivery providers'],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Understand the rules', text: 'Write down booking rules: slot length, working hours, cancellation limits.' },
          { label: '2. Test plan', text: 'Roles, scope, privacy risks, synthetic test data plan.' },
          { label: '3. Test cases', text: '30-40 cases; use boundary values for dates and times.' },
          { label: '4. Execute', text: 'Try two users booking the same slot at the same time.' },
          { label: '5. Bugs and automation', text: 'Log bugs; automate registration and booking flows.' },
          { label: '6. Summary report', text: 'Coverage, defects, privacy findings, open risks.' },
        ],
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['Test plan', 'Booking rules, roles, privacy risks, synthetic data strategy'],
          ['Test cases', 'Date/time boundary cases and role-based access cases'],
          ['Bug reports', 'Doctor, slot, date/time and role used; no real personal data'],
          ['Automation code', 'Book and cancel appointment flows with Page Object Model'],
          ['Summary report', 'Defects by severity, privacy findings, open risks'],
        ],
      },
      { type: 'heading', value: 'Sample test cases' },
      {
        type: 'table',
        headers: ['ID', 'Title', 'Test data', 'Expected result', 'Priority'],
        rows: [
          ['TC-APT-01', 'Book a free slot', 'Dr. Test A, tomorrow 10:00', 'Booking confirmed; slot no longer available to others', 'High'],
          ['TC-APT-03', 'Book an already booked slot', 'Same doctor, same date and time', 'Slot not bookable; clear message', 'High'],
          ['TC-APT-04', 'Book a date in the past', 'Yesterday 10:00', 'Rejected with validation message', 'High'],
          ['TC-APT-06', 'Book outside working hours', 'Doctor hours 09:00-17:00; choose 17:00 and 08:59', 'Both rejected (boundary check)', 'Medium'],
          ['TC-APT-08', 'Cancel appointment', 'Existing booking', 'Status "Cancelled"; slot becomes free again', 'High'],
          ['TC-PRIV-02', 'Patient opens another patient record by changing ID in URL', 'Logged in as Test Patient 01', 'Access denied; no data from other patient shown', 'High'],
        ],
      },
      {
        type: 'example',
        title: 'Sample bug report (format example)',
        value: `ID: BUG-004
Title: Two patients can book the same doctor slot at the same time
Environment: HMS demo, Chrome (latest), two browser windows
Test data: Test Patient 01, Test Patient 02, Dr. Test A, 2026-10-02 10:00
Steps:
  1. Log in as Test Patient 01 in window 1 and Test Patient 02 in window 2
  2. In both windows open Dr. Test A, select 2026-10-02 10:00
  3. Click "Confirm booking" in both windows within 2 seconds
Expected: Only one booking succeeds; the other gets "slot no longer available"
Actual: Both bookings are confirmed; doctor schedule shows two patients at 10:00
Severity: High   Priority: High
Evidence: window1.png, window2.png, schedule.png`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Double booking of the same slot (especially at the same moment).',
          'Wrong dates and times: past dates, time zones, working-hour boundaries.',
          'Patient records visible to the wrong user (privacy and data integrity).',
          'Cancelled slots not released, so doctors lose free time.',
          'Record changes lost or saved to the wrong patient.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Scheduling rules coverage', '30%', 'Double booking, past dates, boundaries and cancellation all tested'],
          ['Privacy and access control', '25%', 'Role and URL-change tests; only synthetic data used'],
          ['Test case quality', '15%', 'Clear data and exact expected results'],
          ['Bug reports', '15%', 'Reproducible, with exact date/time and roles'],
          ['Automation and report', '15%', 'Stable booking tests; report lists privacy risks'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'Say in the README that all data is synthetic.',
          'Show your booking-rule boundary table; it proves test design skill.',
          'Blur or avoid any screenshots that could contain personal data from a shared demo.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        items: [
          'Which boundary times would you test for doctor hours 09:00-17:00?',
          'How would you test two users booking the same slot?',
          'Why must you never use real patient data in test cases?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'An appointment system is like seats in a cinema. One seat can hold only one person per show, a cancelled ticket must free the seat again, and nobody should see another person\'s ticket details.',
    },
    mistakes: [
      'Using real names or health details in test data.',
      'Testing booking only with one user at a time.',
      'Skipping boundary times and past dates.',
      'Not checking that cancelled slots become free again.',
    ],
    takeaways: [
      'Scheduling rules are the core risk: no double booking, no invalid times.',
      'Use boundary value analysis for dates and working hours.',
      'Patient data must be secure; test access by role and by URL change.',
      'Use only synthetic data because health data is protected by law.',
      'Any open-source HMS demo or a provided spec can be used.',
    ],
  },

  'm15-p5': {
    id: 'm15-p5',
    title: 'Project 5: API Testing Suite',
    objectives: [
      'Build a Postman collection for a public REST API with chained requests.',
      'Write assertions for status codes, response body, schema and error handling.',
      'Run the collection from the command line with Newman and share results.',
    ],
    theory:
      'In this project you build a complete API test suite in Postman for Restful-Booker. You chain requests (create a token, create a booking, update, delete), check status codes, schema and errors, and run it with Newman.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You are the API tester for a hotel booking service. The mobile app and website both use this API, so bugs here affect everyone. You will use Restful-Booker (https://restful-booker.herokuapp.com), a free practice API. Its documentation is at /apidoc. It contains some intentional bugs for testers to find.',
      },
      {
        type: 'text',
        value:
          'Key words: an endpoint is one API address, like GET /booking. A status code is the number the server returns, like 200 (OK), 201 (Created), 403 (Forbidden) or 404 (Not Found). Chaining means saving a value from one response (like a token or booking ID) and using it in the next request.',
      },
      {
        type: 'alert',
        value:
          'Alternative: JSONPlaceholder (https://jsonplaceholder.typicode.com) is also good for practice, but its create, update and delete calls are faked: they return a response but do not really save data. Restful-Booker is better for chaining because it really stores bookings (until it resets).',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['POST /auth (create token)', 'Load testing the public API (do not overload it)'],
          ['GET /booking and GET /booking/{id}', 'Security attacks beyond basic auth checks'],
          ['POST /booking (create)', 'Front-end UI testing'],
          ['PUT and PATCH /booking/{id} (update, needs token)', 'API internals and database'],
          ['DELETE /booking/{id} (needs token)', 'Other APIs'],
          ['Negative tests: no token, wrong ID, invalid body', ''],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Read the docs', text: 'List every endpoint, method, required fields and expected status codes.' },
          { label: '2. Environment', text: 'Create a Postman environment with baseUrl, and empty token and bookingId.' },
          { label: '3. Happy path chain', text: 'Auth > Create > Get > Update > Partial update > Delete > Get (404).' },
          { label: '4. Negative tests', text: 'Missing token, wrong token, unknown ID, missing fields, wrong data types.' },
          { label: '5. Assertions', text: 'Status, response time limit, body values and JSON schema for each request.' },
          { label: '6. Newman + report', text: 'Run from the command line, export an HTML report, write the summary.' },
        ],
      },
      { type: 'heading', value: 'Sample assertions (Postman test script)' },
      {
        type: 'code',
        language: 'javascript',
        value: `// Tests tab of "Create booking" (POST /booking)
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

const body = pm.response.json();

pm.test("Response has bookingid and same first name", function () {
  pm.expect(body.bookingid).to.be.a("number");
  pm.expect(body.booking.firstname).to.eql("Test");
});

pm.test("Response time is below 2000 ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Save the ID for the next requests (chaining)
pm.environment.set("bookingId", body.bookingid);`,
      },
      {
        type: 'code',
        language: 'bash',
        value: `# Install Newman and an HTML reporter, then run the collection
npm install -g newman newman-reporter-htmlextra
newman run restful-booker.postman_collection.json \\
  -e restful-booker.postman_environment.json \\
  -r cli,htmlextra --reporter-htmlextra-export reports/api-report.html`,
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['API test plan', 'Endpoints, methods, auth, positive/negative approach, exit criteria'],
          ['Postman collection (JSON export)', 'Folders: Auth, Bookings-Positive, Bookings-Negative; tests on every request'],
          ['Environment file', 'baseUrl and variables; no real secrets'],
          ['Bug reports', 'Request, response, expected vs actual status/body'],
          ['Newman HTML report + summary', 'Pass/fail counts, defects, open risks'],
        ],
      },
      { type: 'heading', value: 'Sample test cases' },
      {
        type: 'table',
        headers: ['ID', 'Request', 'Condition', 'Expected'],
        rows: [
          ['API-01', 'POST /auth', 'Valid admin credentials from the docs', '200; body has "token"; token saved'],
          ['API-04', 'GET /booking/{bookingId}', 'ID from create step', '200; values match created booking'],
          ['API-07', 'PUT /booking/{bookingId}', 'No token (no Cookie / Authorization header)', '403 Forbidden; booking unchanged'],
          ['API-09', 'GET /booking/999999999', 'ID that does not exist', '404 Not Found'],
          ['API-11', 'POST /booking', 'Missing "firstname" field', 'Error status (4xx expected); note actual behaviour'],
          ['API-13', 'DELETE then GET same ID', 'Valid token', 'GET returns 404 after delete'],
        ],
      },
      {
        type: 'example',
        title: 'Sample bug report (check against your own run)',
        value: `ID: BUG-API-02
Title: POST /booking with missing "firstname" returns 500 instead of 400
Request: POST https://restful-booker.herokuapp.com/booking
Body: {"lastname":"User","totalprice":100,"depositpaid":true,
       "bookingdates":{"checkin":"2026-10-01","checkout":"2026-10-03"}}
Expected: 400 Bad Request with a message about the missing field
Actual: 500 Internal Server Error
Severity: Medium   Priority: Medium
Evidence: Postman console screenshot, Newman report line API-11
Note: Restful-Booker has intentional bugs. Always record what YOU observed.`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Authorisation: update and delete must be refused without a valid token.',
          'Wrong status codes (e.g. 500 or 200 where 400 or 404 is correct).',
          'Response schema changes that would break the app (missing or renamed fields).',
          'Error handling for missing fields, wrong data types and invalid dates.',
          'Quirks to document: e.g. check what status DELETE and bad-credential auth really return.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Endpoint coverage', '20%', 'Every in-scope endpoint and method tested'],
          ['Assertions', '25%', 'Status codes, body values, schema and error handling, not only "server responds"'],
          ['Chaining and variables', '20%', 'Token and IDs saved and reused; no hard-coded IDs'],
          ['Negative tests and bugs', '20%', 'Auth, not-found and invalid-body cases; clear bug reports'],
          ['Newman run and presentation', '15%', 'One command runs everything; HTML report in repo'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'Commit the collection and environment JSON files (no secrets).',
          'README: endpoints covered, the Newman command, and a screenshot of the report.',
          'Optional: run Newman automatically with GitHub Actions on every push.',
        ],
      },
      { type: 'heading', value: 'Self-review checklist' },
      {
        type: 'list',
        items: [
          'Does every request have at least one assertion besides the status code?',
          'Does the collection run from start to end in a fresh environment?',
          'Did I test what happens without a token?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing an API is like testing a restaurant\'s kitchen window. You pass in order slips (requests) and check that the right dish (response) comes back, with the right label, and that the kitchen refuses orders from people without a ticket.',
    },
    mistakes: [
      'Checking only that the server responds, not the body and schema.',
      'Hard-coding booking IDs instead of saving them from responses.',
      'Testing only the happy path and skipping auth and error cases.',
      'Committing real tokens or passwords in environment files.',
      'Assuming JSONPlaceholder really saves created or updated data.',
    ],
    takeaways: [
      'A good API suite verifies status codes, response schema and error handling.',
      'Chaining passes tokens and IDs from one request to the next.',
      'Negative tests must include missing or invalid authorisation.',
      'Newman runs Postman collections from the command line and CI.',
      'Record the real behaviour you observe, including known quirks.',
    ],
  },

  'm15-p6': {
    id: 'm15-p6',
    title: 'Project 6: Selenium Automation Framework',
    objectives: [
      'Build a hybrid Selenium 4 framework in Java with Maven, TestNG and Page Object Model.',
      'Add data-driven tests, logging, screenshots on failure and HTML reports.',
      'Structure the framework so tests can run in parallel and in CI.',
    ],
    theory:
      'In this project you build a reusable Maven Java framework for SauceDemo that combines Page Object Model, data-driven testing, logging with Log4j 2 and HTML reports, and runs tests in parallel with TestNG.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'Your team is tired of copy-pasted, broken test scripts. They ask you to build a clean automation framework that anyone can extend. You will automate SauceDemo (https://www.saucedemo.com). The framework is "hybrid" because it combines several ideas: Page Object Model, data-driven tests, custom logging and HTML reporting.',
      },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Maven', 'A build tool for Java. It downloads libraries (dependencies) listed in pom.xml.'],
          ['TestNG', 'A Java test framework: annotations, groups, data providers, parallel runs.'],
          ['Page Object Model (POM)', 'One class per page. Locators and actions live in the page class, not in tests.'],
          ['Data-driven testing', 'The same test runs many times with different data from a DataProvider, Excel or JSON.'],
          ['Log4j 2', 'A logging library that writes what the framework does to the console and files.'],
          ['ThreadLocal', 'Gives each parallel thread its own WebDriver, so tests do not share a browser.'],
        ],
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Framework structure, config file, driver setup (Chrome, Firefox)', 'Mobile automation'],
          ['Page objects for Login, Products, Cart, Checkout', 'API tests (see Project 5)'],
          ['Data-driven login tests', 'Visual AI tools'],
          ['Explicit waits, screenshots on failure, logs, HTML report', 'Selenium Grid cluster setup (optional bonus only)'],
          ['Parallel run with testng.xml; run with mvn test', 'Performance testing'],
        ],
      },
      { type: 'heading', value: 'Project folder structure' },
      {
        type: 'code',
        language: 'bash',
        value: `saucedemo-framework/
├── pom.xml                         # selenium-java 4.x, testng, log4j-core, extentreports
├── testng.xml                      # suites, groups, parallel settings
├── README.md
└── src/
    ├── main/java/com/qa/
    │   ├── base/BasePage.java      # shared wait + click/type helpers
    │   ├── pages/LoginPage.java
    │   ├── pages/ProductsPage.java
    │   ├── pages/CartPage.java
    │   ├── pages/CheckoutPage.java
    │   └── utils/
    │       ├── ConfigReader.java   # reads config.properties
    │       ├── DriverFactory.java  # ThreadLocal<WebDriver>
    │       └── ScreenshotUtil.java
    └── test/
        ├── java/com/qa/
        │   ├── base/BaseTest.java  # @BeforeMethod / @AfterMethod
        │   ├── listeners/TestListener.java  # report + screenshot on failure
        │   └── tests/LoginTest.java, CartTest.java, CheckoutTest.java
        └── resources/
            ├── config.properties   # baseUrl, browser, timeout
            ├── log4j2.xml
            └── testdata/login.json`,
      },
      { type: 'heading', value: 'Short POM + TestNG example (Selenium 4)' },
      {
        type: 'code',
        language: 'java',
        value: `// LoginPage.java - locators and actions only, no assertions
public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;
    private final By username = By.id("user-name");
    private final By password = By.id("password");
    private final By loginBtn = By.id("login-button");
    private final By error    = By.cssSelector("[data-test='error']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void login(String user, String pass) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(username)).sendKeys(user);
        driver.findElement(password).sendKeys(pass);
        driver.findElement(loginBtn).click();
    }

    public String getError() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(error)).getText();
    }
}

// LoginTest.java - data-driven test using a TestNG DataProvider
public class LoginTest extends BaseTest {

    @DataProvider(name = "invalidLogins", parallel = true)
    public Object[][] invalidLogins() {
        return new Object[][] {
            {"locked_out_user", "secret_sauce", "locked out"},
            {"standard_user",   "wrong_pass",   "do not match"},
            {"",                "secret_sauce", "Username is required"}
        };
    }

    @Test(dataProvider = "invalidLogins", groups = "regression")
    public void loginShowsError(String user, String pass, String expected) {
        LoginPage page = new LoginPage(getDriver());   // getDriver() reads ThreadLocal
        page.login(user, pass);
        Assert.assertTrue(page.getError().contains(expected));
    }
}`,
      },
      {
        type: 'steps',
        title: 'Milestones',
        steps: [
          { label: '1. Setup', text: 'Create Maven project, add dependencies, run one "open browser" test. Selenium Manager (built into Selenium 4.6+) downloads drivers.' },
          { label: '2. Core', text: 'DriverFactory with ThreadLocal, ConfigReader, BaseTest.' },
          { label: '3. Page objects', text: 'Login, Products, Cart, Checkout with explicit waits.' },
          { label: '4. Tests', text: 'Login (data-driven), cart and checkout tests; 12-20 tests total.' },
          { label: '5. Reporting', text: 'Log4j 2 logs, TestNG listener, screenshot on failure, HTML report (e.g. ExtentReports).' },
          { label: '6. Parallel + CI', text: 'testng.xml parallel="methods" with thread-count; run mvn test in GitHub Actions.' },
        ],
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['Framework design note', 'Folder structure, design choices, how to add a new page and test'],
          ['Automation code', 'POM, data-driven tests, config, logging, listeners'],
          ['Test case mapping', 'Table linking manual test case IDs to automated test methods'],
          ['HTML report + logs', 'A sample report from a full run, with a failure screenshot example'],
          ['Summary report', 'Tests automated, pass/fail, flaky tests found, next steps'],
        ],
      },
      {
        type: 'example',
        title: 'Sample automation defect note',
        value: `ID: AUTO-003
Title: CheckoutTest.finishOrder fails in parallel runs only
Observed: Passes alone; fails 2 of 5 runs with thread-count=3
Cause found: WebDriver stored in a static field, shared by threads
Fix: Moved driver to ThreadLocal<WebDriver> in DriverFactory; quit in @AfterMethod
Result: 10 of 10 parallel runs pass`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Shared static WebDriver breaks parallel runs.',
          'Thread.sleep and missing explicit waits cause flaky tests.',
          'Assertions inside page objects make pages hard to reuse.',
          'Hard-coded URLs and data make the framework hard to move to new environments.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Framework design (POM, structure)', '25%', 'Clear layers; no locators in tests; reusable BasePage'],
          ['Data-driven tests', '15%', 'DataProvider or external data; no copy-pasted tests'],
          ['Stability', '20%', 'Explicit waits only; suite passes repeatedly, also in parallel'],
          ['Logging and reporting', '20%', 'Readable logs, HTML report, screenshot on failure'],
          ['README and CI', '20%', 'One command to run; CI run badge or screenshot'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub' },
      {
        type: 'list',
        items: [
          'README: tech stack, folder structure, how to run (mvn test), how to add a test.',
          'Add a screenshot of the HTML report and a GitHub Actions run.',
          'Add a .gitignore for target/, reports and logs.',
        ],
      },
      { type: 'heading', value: 'Self-review checklist' },
      {
        type: 'list',
        items: [
          'Are there zero Thread.sleep calls in my code?',
          'Can I change the browser or URL only in config.properties?',
          'Does each parallel thread have its own WebDriver?',
          'Does a failing test produce a screenshot and a log entry?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A framework is like a well-organised kitchen. Each tool has a fixed place (page objects), recipes use ingredients from the shelf (test data), and every cook has their own knife (ThreadLocal driver) so nobody gets in each other\'s way.',
    },
    mistakes: [
      'Hard-coding XPaths inside every test method.',
      'Using Thread.sleep instead of explicit waits.',
      'Sharing one static WebDriver across parallel tests.',
      'Writing one giant test method that checks everything.',
      'Putting passwords and URLs directly in code instead of config.',
    ],
    takeaways: [
      'A hybrid framework combines POM, data-driven tests, logging and HTML reports.',
      'Page objects hold locators and actions; tests hold assertions.',
      'Use explicit waits, never Thread.sleep.',
      'ThreadLocal WebDriver makes parallel execution safe.',
      'A clear README and one-command run make the framework usable by others.',
    ],
  },

  'm15-final': {
    id: 'm15-final',
    title: 'Final Industry Capstone Project',
    objectives: [
      'Combine manual testing, API testing and UI automation into one portfolio project.',
      'Run all automated tests in a CI pipeline and publish reports.',
      'Present the project clearly to employers on GitHub and in an interview.',
    ],
    theory:
      'The final capstone joins everything: a test plan, manual test cases, bug reports, an API suite, a Selenium framework and a CI pipeline, all for one product. It is your main portfolio piece for QA job applications.',
    blocks: [
      { type: 'heading', value: 'Scenario' },
      {
        type: 'text',
        value:
          'You join "ShopEasy" as the only QA engineer. The product has a website and a backend API. The team releases every two weeks. Your manager asks for a full quality setup: plan, manual tests, automated UI and API tests that run on every change, and a clear report before each release.',
      },
      {
        type: 'text',
        value:
          'Use SauceDemo (https://www.saucedemo.com) as the website and Restful-Booker (https://restful-booker.herokuapp.com) as the API. They are different demo products, so in your README explain that together they represent the "web" and "API" layers of one release. You may reuse work from Projects 1, 5 and 6, but improve it.',
      },
      { type: 'heading', value: 'Scope' },
      {
        type: 'table',
        headers: ['In scope', 'Out of scope'],
        rows: [
          ['Test strategy and test plan for one release', 'Performance and load testing (mention as a risk)'],
          ['Manual test cases (40+) and exploratory test notes', 'Deep security testing'],
          ['Bug reports with severity and priority', 'Mobile apps'],
          ['API suite: Postman + Newman (or Java REST Assured)', 'Real production systems'],
          ['UI automation: Selenium 4 + TestNG + POM', 'Paid tools'],
          ['CI pipeline (GitHub Actions) and test summary report', ''],
        ],
      },
      {
        type: 'steps',
        title: 'Milestones (about 3-4 weeks)',
        steps: [
          { label: 'Week 1: Plan', text: 'Test strategy, test plan, risk list, requirement traceability matrix (RTM).' },
          { label: 'Week 1-2: Manual', text: 'Write and run test cases; exploratory sessions; log bugs.' },
          { label: 'Week 2: API', text: 'Postman collection with chaining, negative tests and Newman report.' },
          { label: 'Week 3: UI automation', text: 'Selenium framework for smoke and regression flows.' },
          { label: 'Week 3-4: CI', text: 'GitHub Actions runs API and UI tests on push; reports saved as artifacts.' },
          { label: 'Week 4: Close', text: 'Test summary report, release recommendation, README and short demo video.' },
        ],
      },
      { type: 'heading', value: 'Project folder structure' },
      {
        type: 'code',
        language: 'bash',
        value: `shopeasy-qa-capstone/
├── README.md                    # overview, how to run, links, results
├── docs/
│   ├── test-strategy.md
│   ├── test-plan.md
│   ├── rtm.xlsx                 # requirement -> test case -> result
│   └── test-summary-report.md
├── manual-tests/
│   ├── test-cases.xlsx
│   ├── exploratory-notes.md
│   └── bug-reports/             # BUG-001.md ... with screenshots
├── api-tests/
│   ├── shopeasy-api.postman_collection.json
│   ├── qa.postman_environment.json
│   └── reports/
├── ui-automation/               # Maven + Selenium 4 + TestNG
│   ├── pom.xml
│   ├── testng.xml
│   └── src/ (main/java/pages, test/java/tests, test/resources)
└── .github/workflows/
    └── tests.yml                # runs Newman + mvn test`,
      },
      { type: 'heading', value: 'Short end-to-end test example (Selenium 4 + TestNG)' },
      {
        type: 'code',
        language: 'java',
        value: `public class CheckoutE2ETest extends BaseTest {

    @Test(groups = {"smoke"}, description = "TC-CHK-01 Complete order with one item")
    public void userCanCompleteOrder() {
        ProductsPage products = new LoginPage(getDriver())
                .loginAs("standard_user", "secret_sauce");   // returns ProductsPage

        CartPage cart = products.addToCart("Sauce Labs Backpack").openCart();
        Assert.assertEquals(cart.getItemCount(), 1, "Cart should contain 1 item");

        CheckoutCompletePage done = cart.checkout()
                .enterCustomerInfo("Test", "User", "12345")
                .finish();

        Assert.assertEquals(done.getHeaderText(), "Thank you for your order!");
    }
}`,
      },
      {
        type: 'code',
        language: 'yaml',
        value: `# .github/workflows/tests.yml (simplified)
name: QA tests
on: [push, pull_request]
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '17' }
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm install -g newman
      - run: newman run api-tests/shopeasy-api.postman_collection.json -e api-tests/qa.postman_environment.json
      - run: mvn -f ui-automation/pom.xml test -Dheadless=true`,
      },
      { type: 'heading', value: 'Required deliverables' },
      {
        type: 'table',
        headers: ['Deliverable', 'Must contain'],
        rows: [
          ['Test strategy + test plan', 'Levels and types of testing, tools, environments, entry/exit criteria, risks'],
          ['RTM', 'Every requirement linked to test cases and their latest result'],
          ['Manual test cases + bug reports', 'Positive, negative, boundary cases; reproducible bugs with evidence'],
          ['API suite', 'Status codes, schema and error handling checks; Newman report'],
          ['UI framework', 'POM, data-driven tests, logging, HTML report, parallel-ready'],
          ['CI pipeline', 'Tests run automatically on push; reports available'],
          ['Test summary report', 'Coverage, results, defects found (by severity), open risks, go/no-go recommendation'],
        ],
      },
      {
        type: 'example',
        title: 'Sample test summary (short)',
        value: `Release: ShopEasy 1.4   Period: 2 weeks
Coverage: 18 of 20 requirements tested (2 blocked: payment provider not available)
Manual: 46 cases run, 41 passed, 5 failed
API: 32 requests, 118 assertions, 112 passed
UI automation: 18 tests (smoke 6, regression 12), 17 passed, 1 known flaky (tracked)
Defects: 9 found - Critical 0, High 2, Medium 4, Low 3; 2 High still open
Open risks: payment flow untested; no performance testing done
Recommendation: No-go until BUG-014 (wrong order total) is fixed and retested`,
      },
      { type: 'heading', value: 'Key risk areas' },
      {
        type: 'list',
        items: [
          'Checkout and order totals (money-related flows).',
          'API authorisation and error handling.',
          'Flaky automation that hides real failures or blocks CI.',
          'Gaps between requirements and tests (use the RTM to find them).',
          'Untested areas: always report them as open risks.',
        ],
      },
      { type: 'heading', value: 'Evaluation rubric' },
      {
        type: 'table',
        headers: ['Criteria', 'Weight', 'What good looks like'],
        rows: [
          ['Planning and traceability', '15%', 'Clear strategy and plan; RTM with no unexplained gaps'],
          ['Manual testing and bug reports', '20%', 'Good technique use; negative cases; reproducible, well-prioritised bugs'],
          ['API testing', '15%', 'Status, schema and error checks; chained, data-independent requests'],
          ['UI automation framework', '20%', 'POM, data-driven, explicit waits, reports, stable runs'],
          ['CI/CD integration', '10%', 'Pipeline runs on push and publishes results'],
          ['Summary report and presentation', '20%', 'Honest coverage, defects and open risks; clear README and demo'],
        ],
      },
      { type: 'heading', value: 'Present it on GitHub and in interviews' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pin the repository on your GitHub profile.',
          'README first screen: one-paragraph summary, tech stack, results table, "How to run".',
          'Add screenshots: CI run, Newman report, Selenium HTML report, one strong bug report.',
          'Record a 3-5 minute demo video and link it in the README and on LinkedIn.',
          'Prepare to explain: why you tested checkout first, one hard bug, one flaky test you fixed.',
        ],
      },
      { type: 'heading', value: 'Final self-review checklist' },
      {
        type: 'list',
        items: [
          'Can a stranger clone the repo and run all tests with the README alone?',
          'Does every requirement in the RTM have at least one test?',
          'Are there no passwords, tokens or personal data in the repository?',
          'Does the summary report show coverage, defects found and open risks?',
          'Does the pipeline pass on a clean run?',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The final capstone is like a builder\'s show home. Employers cannot see your past work inside other companies, but they can walk through this house and see how you plan, build, check and explain everything.',
    },
    mistakes: [
      'Collecting separate projects without linking them in one clear README.',
      'Automating many tests but writing no test plan or summary report.',
      'Hiding failing or flaky tests instead of reporting them honestly.',
      'Committing secrets or large report folders to Git.',
      'Not being able to explain design choices in an interview.',
    ],
    takeaways: [
      'The final project combines manual, API and UI automation testing with CI.',
      'Traceability (RTM) proves every requirement is covered.',
      'The summary report must show coverage, defects found and open risks.',
      'A maintainable UI suite uses POM with data-driven tests.',
      'Clear presentation on GitHub turns your work into job evidence.',
    ],
  },
};
