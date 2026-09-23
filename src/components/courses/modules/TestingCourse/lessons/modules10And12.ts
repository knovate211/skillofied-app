import type { Lesson } from '../TestingCourseData';

export const modules10And12Lessons: Record<string, Lesson> = {
  'm10-l1': {
    id: 'm10-l1',
    title: 'Lesson 10.1 Performance Testing Basics',
    objectives: [
      'Explain what performance testing checks and why it matters.',
      'Define latency, response time, and throughput in plain words.',
      'Read percentiles (p90, p95, p99) and know why they beat averages.',
    ],
    theory:
      'Performance testing checks how fast, stable, and scalable an app stays when many users use it at the same time. It measures speed and resource use under load, not whether features are correct.',
    blocks: [
      { type: 'heading', value: 'What is performance testing?' },
      {
        type: 'text',
        value:
          'Functional testing asks "does this feature work?". Performance testing asks a different question: "does it stay fast and stable when many people use it at the same time?". A page can be correct but still too slow. Performance testing finds that problem before real users do.',
      },
      {
        type: 'text',
        value:
          'We run the app under load (many users at once) and watch numbers like speed, errors, and server resource use. If the numbers get worse as load grows, we have a performance problem to fix.',
      },
      { type: 'heading', value: 'Key metrics you must know' },
      {
        type: 'table',
        headers: ['Metric', 'Plain meaning', 'Why it matters'],
        rows: [
          ['Response time', 'Total time from sending a request to getting the full reply.', 'The wait the user actually feels.'],
          ['Latency', 'Time for a request to reach the server and the first byte to come back.', 'Shows network and server delay before data flows.'],
          ['Throughput', 'How many requests the system finishes per second (req/s).', 'How much work the system can handle.'],
          ['Error rate', 'Percent of requests that fail (timeouts, 500 errors).', 'A fast system that fails is still broken.'],
          ['Concurrent users', 'Number of users active at the same moment.', 'The size of the load we apply.'],
          ['p90 / p95 / p99', 'The response time that 90% / 95% / 99% of requests stay under.', 'Reveals the slow experiences an average hides.'],
        ],
      },
      { type: 'heading', value: 'Percentiles vs average' },
      {
        type: 'text',
        value:
          'The average (mean) can lie. Imagine 100 requests: 95 take 1 second and 5 take 20 seconds. The average looks okay, but 1 in 20 users waits 20 seconds. Percentiles catch this. "p95 = 2s" means 95% of requests finished in 2 seconds or less, so only the slowest 5% were worse.',
      },
      {
        type: 'example',
        title: 'How to read a percentile',
        value:
          'p99 = 4s means 99 out of every 100 requests were 4 seconds or faster, and the slowest 1% took longer. Teams often set goals like "p95 under 2 seconds" instead of averages.',
      },
      {
        type: 'alert',
        value:
          'A Service Level Agreement (SLA) is a promise about performance, for example "95% of pages load in under 2 seconds". Percentiles let you check that promise.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A shop can serve one customer fast, but on a busy sale day the queue grows and everyone waits. Performance testing is opening the shop for a fake busy day to see how long the queue gets before it opens for real.',
    },
    mistakes: [
      'Reporting only the average response time and hiding the slow 5% of users.',
      'Confusing latency (first response) with total response time (full reply).',
      'Ignoring error rate, so a "fast" result actually hides many failed requests.',
      'Testing with 1 user and assuming it will behave the same with 1,000.',
    ],
    takeaways: [
      'Performance testing measures speed, stability, and scalability under load, not correctness.',
      'Response time is the wait the user feels; latency is the delay before data starts arriving.',
      'Throughput is requests finished per second; error rate is the percent that fail.',
      'Percentiles (p90/p95/p99) expose slow experiences that averages hide.',
      'Compare results against an SLA target like "p95 under 2 seconds".',
    ],
  },

  'm10-l2': {
    id: 'm10-l2',
    title: 'Lesson 10.2 Load Testing',
    objectives: [
      'Describe the goal of load testing.',
      'Explain ramp-up and normal vs peak load.',
      'Read a simple load test result table.',
    ],
    theory:
      'Load testing checks how the system behaves under normal and expected peak numbers of users, to confirm it stays fast enough within its limits.',
    blocks: [
      { type: 'heading', value: 'What load testing does' },
      {
        type: 'text',
        value:
          'Load testing puts the expected number of users on the app and measures whether response times, throughput, and errors stay within target. It answers: "on a normal busy day, is the app fast enough?". We do not try to break it here; we confirm it meets its goals.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Normal load: the usual number of users, like a regular weekday.',
          'Peak load: the highest expected number, like a lunchtime rush or a planned sale.',
          'Ramp-up: slowly adding users over time (for example, +50 users every 30 seconds) instead of all at once, so results are realistic and easy to read.',
        ],
      },
      { type: 'heading', value: 'A simple load test result' },
      {
        type: 'table',
        headers: ['Users', 'Throughput (req/s)', 'p95 response', 'Error rate', 'Verdict'],
        rows: [
          ['100', '95', '0.6s', '0%', 'Healthy'],
          ['300', '270', '1.1s', '0%', 'Healthy'],
          ['500', '360', '1.9s', '0.3%', 'Near the SLA limit'],
        ],
      },
      {
        type: 'text',
        value:
          'Read it like this: as users grow, throughput should keep rising and response time should stay under target. At 500 users the p95 is 1.9s, close to a 2s SLA, and small errors appear. That is the early warning that the system is approaching its comfortable limit.',
      },
      {
        type: 'alert',
        value:
          'Set a clear pass/fail rule before you start, for example "p95 under 2s and error rate under 1% at 500 users". Without a target, a number means nothing.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A bridge has a weight limit sign. Load testing is driving the normal daily traffic across it and confirming it stays steady, well inside that limit.',
    },
    mistakes: [
      'Starting all users at once instead of using a ramp-up, which gives messy, unrealistic results.',
      'Running the test without a pass/fail target to compare against.',
      'Testing on a tiny machine that does not match production, then trusting the numbers.',
      'Forgetting to include realistic think time (pauses between user actions).',
    ],
    takeaways: [
      'Load testing confirms the app meets its speed goals at normal and expected peak users.',
      'Ramp-up adds users gradually so results are realistic and readable.',
      'Watch throughput, p95 response time, and error rate together.',
      'Always define a pass/fail SLA before the test runs.',
    ],
  },

  'm10-l3': {
    id: 'm10-l3',
    title: 'Lesson 10.3 Stress Testing',
    objectives: [
      'Explain the goal of stress testing.',
      'Define the breaking point and graceful degradation.',
      'Describe how to check recovery after overload.',
    ],
    theory:
      'Stress testing pushes the system beyond its expected peak to find the breaking point and to see whether it fails safely and recovers.',
    blocks: [
      { type: 'heading', value: 'Why push past the limit?' },
      {
        type: 'text',
        value:
          'Load testing stays within expected limits. Stress testing goes past them on purpose. We keep adding users until the system struggles, to learn two things: where it breaks, and how it behaves when it breaks.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Breaking point: the load level where response times spike or errors climb sharply.',
          'Graceful degradation: the app slows down or shows a friendly "try again" message instead of crashing or losing data.',
          'Recovery: after the extra load is removed, the app returns to normal speed on its own.',
        ],
      },
      {
        type: 'example',
        title: 'Reading a stress result',
        value:
          'At 800 users the p95 is 2.5s. At 1,200 users the p95 jumps to 18s and errors hit 40%. The breaking point is near 800–1,000 users. After the load drops, the app should recover to a healthy p95 within a few minutes.',
      },
      {
        type: 'warning',
        value:
          'A crash that corrupts data or never recovers is a serious failure. Good systems fail gracefully: they reject extra requests politely and keep the stored data safe.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'Stress testing is squeezing more and more people into a lift to find out at what number the alarm sounds, and whether the doors still open safely afterwards.',
    },
    mistakes: [
      'Only finding the breaking point but never checking whether the system recovers.',
      'Treating any error under extreme load as a failure, instead of judging whether it failed safely.',
      'Not watching server resources (CPU, memory) to learn what runs out first.',
      'Running stress tests against the live production system and disturbing real users.',
    ],
    takeaways: [
      'Stress testing pushes beyond expected peak to find the breaking point.',
      'The goal is to fail gracefully and keep stored data safe, not to avoid all errors.',
      'Always test recovery: the app should return to normal after the load drops.',
      'Watch CPU and memory to see which resource runs out first.',
    ],
  },

  'm10-l4': {
    id: 'm10-l4',
    title: 'Lesson 10.4 Spike Testing',
    objectives: [
      'Explain what a spike test simulates.',
      'Describe how spike differs from load and stress testing.',
      'Explain how auto-scaling responds to spikes.',
    ],
    theory:
      'Spike testing applies a sudden, sharp jump in users for a short time to see whether the system stays stable when traffic surges without warning.',
    blocks: [
      { type: 'heading', value: 'A sudden surge' },
      {
        type: 'text',
        value:
          'Some traffic arrives all at once: a concert ticket sale opens, a product goes viral, or an email blast is sent. Spike testing copies that. It jumps from a small load to a very large load almost instantly, holds it briefly, then drops back down.',
      },
      {
        type: 'text',
        value:
          'This is different from stress testing, which raises load slowly and steadily. A spike is fast and short. The key question is: can the system absorb the sudden jump without crashing or timing out?',
      },
      {
        type: 'alert',
        value:
          'Auto-scaling means the system adds more servers automatically when traffic rises. The risk during a spike is that new servers take time to start, so early users may see slowness or errors before scaling catches up.',
      },
      {
        type: 'example',
        title: 'What a spike looks like',
        value:
          'Load sits at 100 users, then jumps to 3,000 users within 10 seconds and holds for 2 minutes. Watch whether error rate stays low and how quickly response time settles back to normal once new servers come online.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A quiet café is suddenly filled when a full tour bus arrives at once. Spike testing checks whether the café can serve that sudden crowd, or freezes at the door.',
    },
    mistakes: [
      'Confusing a spike (sudden, short) with a stress test (slow, steady rise).',
      'Ignoring how long the system takes to recover after the spike ends.',
      'Not measuring the first few seconds, where auto-scaling has not caught up yet.',
      'Assuming auto-scaling is instant; new servers usually take time to start.',
    ],
    takeaways: [
      'Spike testing simulates a sudden, sharp jump in users for a short time.',
      'It differs from stress testing, which raises load slowly.',
      'The main risk is slowness before auto-scaling adds new servers.',
      'Measure both the surge moment and the recovery afterwards.',
    ],
  },

  'm10-l5': {
    id: 'm10-l5',
    title: 'Lesson 10.5 Endurance Testing',
    objectives: [
      'Explain the goal of endurance (soak) testing.',
      'Define a memory leak and resource exhaustion.',
      'Describe what to watch over a long run.',
    ],
    theory:
      'Endurance testing, also called soak testing, runs a normal load for many hours or days to find slow problems like memory leaks that only appear over time.',
    blocks: [
      { type: 'heading', value: 'The long, slow test' },
      {
        type: 'text',
        value:
          'Some problems never show up in a short test. Endurance testing (soak testing) keeps a normal, steady load running for a long time, often hours or days, and watches for slow decline. If speed drops or memory keeps climbing over time, there is a leak.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Memory leak: the app keeps taking more memory and never gives it back, so it slowly runs out.',
          'Resource exhaustion: something limited runs out over time, such as memory, database connections, or open files.',
          'Slow response creep: response times that were fine at hour 1 get worse by hour 10.',
        ],
      },
      {
        type: 'example',
        title: 'A soak test warning sign',
        value:
          'Memory sits at 2GB at hour 1, 4GB at hour 6, and 7GB at hour 12, while load never changed. Memory should stay flat under steady load. A steady climb points to a memory leak.',
      },
      {
        type: 'alert',
        value:
          'Garbage collection is the system automatically freeing memory that is no longer used. A healthy app keeps memory roughly flat under steady load because garbage collection reclaims it.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A car can drive fine for five minutes but a small oil leak only shows up on a long road trip. Endurance testing is that long drive, watching the gauges the whole way.',
    },
    mistakes: [
      'Running the test for only a short time, so slow leaks never appear.',
      'Not monitoring memory and connections continuously over the whole run.',
      'Changing the load during the run, which makes a slow trend impossible to read.',
      'Assuming a passing short load test means no leaks exist.',
    ],
    takeaways: [
      'Endurance (soak) testing runs steady load for hours or days.',
      'It finds slow problems like memory leaks and resource exhaustion.',
      'Under steady load, memory should stay roughly flat over time.',
      'Watch memory, connections, and response time creep across the whole run.',
    ],
  },

  'm10-l6': {
    id: 'm10-l6',
    title: 'Lesson 10.6 Apache JMeter',
    objectives: [
      'List the main parts of a JMeter test plan.',
      'Run a JMeter test from the command line (non-GUI).',
      'Recognise k6 as a modern, code-based alternative.',
    ],
    theory:
      'Apache JMeter is a free tool that simulates many virtual users sending requests, so you can measure performance. Build a test plan in the GUI, then run the real test from the command line.',
    blocks: [
      { type: 'heading', value: 'What JMeter is' },
      {
        type: 'text',
        value:
          'Apache JMeter is a free, open-source tool that pretends to be many users at once. It sends real HTTP requests to your app and records response times, throughput, and errors. It needs Java installed to run, because JMeter is a Java program.',
      },
      { type: 'heading', value: 'Parts of a JMeter test plan' },
      {
        type: 'steps',
        title: 'Build the plan in this order',
        steps: [
          { label: 'Install Java, then JMeter', text: 'JMeter runs on Java, so install a Java runtime first, then unzip and start JMeter.' },
          { label: 'Add a Thread Group', text: 'This sets the number of virtual users (threads), the ramp-up time, and how many times they loop.' },
          { label: 'Add an HTTP Request sampler', text: 'This defines the request to send: the server name, path, and method (GET or POST).' },
          { label: 'Add a CSV Data Set Config', text: 'This feeds different data per user, such as many usernames and passwords from a CSV file, so users are not identical.' },
          { label: 'Add Assertions', text: 'These check each response is correct, for example that the status code is 200 or the page contains expected text.' },
          { label: 'Add Listeners', text: 'These collect and show results, such as a Summary Report or an Aggregate Report.' },
        ],
      },
      { type: 'heading', value: 'Run the real test without the GUI' },
      {
        type: 'text',
        value:
          'Use the GUI only to build and debug the plan. For the actual test, run JMeter in non-GUI (command line) mode. The GUI uses a lot of memory and slows the machine, which distorts your results.',
      },
      {
        type: 'code',
        language: 'bash',
        value: 'jmeter -n -t plan.jmx -l results.jtl -e -o report/',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '-n runs in non-GUI mode.',
          '-t plan.jmx points to your saved test plan.',
          '-l results.jtl saves the raw results to a file.',
          '-e -o report/ builds an HTML dashboard report in the report/ folder.',
        ],
      },
      {
        type: 'warning',
        value:
          'Never run a real load test in GUI mode. The GUI consumes memory and CPU, which makes your load generator itself slow and gives false, inflated response times. Always use non-GUI mode for real runs.',
      },
      { type: 'heading', value: 'A modern alternative: k6' },
      {
        type: 'text',
        value:
          'k6 is a newer, popular load testing tool where you write the test as a small JavaScript file instead of a GUI. It is lightweight and easy to keep in version control. Here is a tiny example.',
      },
      {
        type: 'code',
        language: 'javascript',
        value:
          "import http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport const options = {\n  vus: 50, // 50 virtual users\n  duration: '1m', // run for 1 minute\n};\n\nexport default function () {\n  const res = http.get('https://test.k6.io');\n  check(res, { 'status is 200': (r) => r.status === 200 });\n  sleep(1);\n}",
      },
      {
        type: 'alert',
        value:
          'You run this with the command k6 run script.js. Both JMeter and k6 do the same job; pick the one your team prefers.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'JMeter is a rehearsal where you hire a crowd of actors to fill your shop, so you see how it copes before the real customers arrive.',
    },
    mistakes: [
      'Running the real load test in GUI mode, which slows the machine and fakes the numbers.',
      'Forgetting to install Java before starting JMeter.',
      'Using the same login for every virtual user instead of a CSV Data Set for realistic variety.',
      'Skipping assertions, so failed responses are counted as successes.',
      'Running the load generator on the same machine as the app under test.',
    ],
    takeaways: [
      'JMeter simulates many virtual users and needs Java to run.',
      'A plan needs a Thread Group, HTTP Request sampler, CSV Data Set, assertions, and listeners.',
      'Build in the GUI, but run real tests in non-GUI mode: jmeter -n -t plan.jmx -l results.jtl -e -o report/.',
      'GUI mode distorts results, so never use it for real load runs.',
      'k6 is a modern alternative that defines the test as a small JavaScript file.',
    ],
  },

  'm12-l1': {
    id: 'm12-l1',
    title: 'Lesson 12.1 Security Fundamentals',
    objectives: [
      'Explain the CIA triad in plain words.',
      'Define authentication, authorization, and non-repudiation.',
      'Describe the goal of security testing.',
    ],
    theory:
      'Security testing checks that an app protects data and blocks misuse. Its core goals are the CIA triad: Confidentiality, Integrity, and Availability.',
    blocks: [
      { type: 'heading', value: 'The CIA triad' },
      {
        type: 'text',
        value:
          'Security has three main goals, remembered as CIA. This is not the spy agency; it is a simple way to remember what we protect.',
      },
      {
        type: 'compare',
        columns: [
          { title: 'Confidentiality', tone: 'rose', items: ['Only the right people can see the data.', 'Example: your password and bank balance stay private.', 'Broken by data leaks and eavesdropping.'] },
          { title: 'Integrity', tone: 'olive', items: ['Data cannot be changed by the wrong people.', 'Example: nobody can secretly edit your account balance.', 'Broken by tampering and injection attacks.'] },
          { title: 'Availability', tone: 'honey', items: ['The system stays up and usable when needed.', 'Example: the site works during a busy sale.', 'Broken by crashes and denial-of-service attacks.'] },
        ],
      },
      { type: 'heading', value: 'Other key words' },
      {
        type: 'list',
        ordered: false,
        items: [
          'Authentication: proving who you are, usually with a password or code. "Are you really this user?"',
          'Authorization: what you are allowed to do once logged in. "Can this user open the admin page?"',
          'Non-repudiation: keeping proof of who did an action, so a user cannot later deny it. Logs and audit trails provide this.',
        ],
      },
      {
        type: 'alert',
        value:
          'Security testing looks for weaknesses on purpose, so real attackers cannot use them. Its aim is to protect user data and keep the system trustworthy.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A bank keeps money locked (confidentiality), records exactly (integrity), and stays open at opening hours (availability). Security testing is checking all three before a thief tries.',
    },
    mistakes: [
      'Thinking security is only about passwords, and ignoring integrity and availability.',
      'Mixing up authentication (who you are) with authorization (what you may do).',
      'Testing security only at the end, instead of throughout development.',
      'Forgetting non-repudiation: without logs, you cannot prove who did what.',
    ],
    takeaways: [
      'The CIA triad is Confidentiality, Integrity, and Availability.',
      'Authentication proves who you are; authorization decides what you may do.',
      'Non-repudiation keeps proof of actions through logs and audit trails.',
      'Security testing hunts weaknesses on purpose to protect user data.',
    ],
  },

  'm12-l2': {
    id: 'm12-l2',
    title: 'Lesson 12.2 Authentication Testing',
    objectives: [
      'Explain what authentication testing checks.',
      'List checks for passwords, lockout, sessions, and MFA.',
      'Describe how to test that logout ends a session.',
    ],
    theory:
      'Authentication testing checks that only real users can log in and that logins are protected against guessing, stolen sessions, and weak passwords.',
    blocks: [
      { type: 'heading', value: 'What we are testing' },
      {
        type: 'text',
        value:
          'Authentication is proving who you are. Authentication testing makes sure this proof is hard to fake and hard to steal. Below is a checklist a beginner tester can follow.',
      },
      {
        type: 'table',
        headers: ['Check', 'What to test', 'Why'],
        rows: [
          ['Password policy', 'Reject short or common passwords like "123456".', 'Weak passwords are easy to guess.'],
          ['Account lockout', 'Lock or slow the account after several wrong tries.', 'Stops brute-force guessing attacks.'],
          ['Session timeout', 'Log the user out after a period of inactivity.', 'Protects an unattended, logged-in device.'],
          ['Logout invalidates session', 'After logout, the old session must not work again.', 'A stolen session token becomes useless.'],
          ['MFA', 'Require a second factor, like a code from an app.', 'Even a stolen password is not enough alone.'],
        ],
      },
      {
        type: 'alert',
        value:
          'MFA means Multi-Factor Authentication: two or more proofs, such as a password plus a one-time code from a phone app. Brute-force means trying many passwords quickly until one works.',
      },
      { type: 'heading', value: 'How to test that logout really ends the session' },
      {
        type: 'steps',
        title: 'Session invalidation test',
        steps: [
          { label: 'Log in and copy the session', text: 'Log in and note the session token or cookie in the browser tools.' },
          { label: 'Log out', text: 'Click log out normally.' },
          { label: 'Reuse the old session', text: 'Try to open a logged-in page using the old token, for example by resending an earlier request.' },
          { label: 'Confirm it is rejected', text: 'The server must reject it. If the old session still works, that is a security bug.' },
        ],
      },
      {
        type: 'warning',
        value:
          'Only test accounts and systems you are allowed to test. Never try password guessing on real accounts you do not own.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A hotel key card should stop working the moment you check out. Authentication testing is checking that the old card really cannot open the door anymore.',
    },
    mistakes: [
      'Only testing a correct login, and never testing wrong passwords or lockout.',
      'Assuming logout works without checking the old session token is rejected.',
      'Ignoring session timeout, so an idle logged-in user stays open forever.',
      'Testing against real user accounts instead of test accounts you own.',
      'Checking the password policy on the frontend only, when the server must enforce it too.',
    ],
    takeaways: [
      'Authentication testing confirms only real users log in and logins are hard to steal.',
      'Test password policy, account lockout, session timeout, and MFA.',
      'After logout, the old session must be rejected by the server.',
      'Only test systems and accounts you are authorised to test.',
    ],
  },

  'm12-l3': {
    id: 'm12-l3',
    title: 'Lesson 12.3 Authorization Testing',
    objectives: [
      'Explain the difference between authentication and authorization.',
      'Test for IDOR by changing an ID in a URL or API.',
      'Define horizontal and vertical privilege escalation.',
    ],
    theory:
      'Authorization testing checks that a logged-in user can only reach what their role allows, and cannot open other people’s data or admin-only actions.',
    blocks: [
      { type: 'heading', value: 'Authentication vs authorization' },
      {
        type: 'compare',
        columns: [
          { title: 'Authentication', subtitle: 'Who are you?', tone: 'olive', items: ['Proves identity with a password or code.', 'Happens first, at login.', 'Example: logging in as "sara".'] },
          { title: 'Authorization', subtitle: 'What may you do?', tone: 'honey', items: ['Decides which actions and data are allowed.', 'Happens after login, on every request.', 'Example: can "sara" open the admin dashboard?'] },
        ],
      },
      {
        type: 'text',
        value:
          'A common mistake is checking permission only in the frontend, by hiding buttons. The real check must happen on the server, because an attacker can call the server directly and skip the buttons.',
      },
      { type: 'heading', value: 'Testing for IDOR' },
      {
        type: 'text',
        value:
          'IDOR means Insecure Direct Object Reference. It happens when you can reach another user’s data just by changing an ID. To test it, log in as one user and change the ID in the URL or API request to point at someone else’s record.',
      },
      {
        type: 'code',
        language: 'text',
        value:
          "You are logged in as user 1001 and view your own invoice:\n  GET /api/invoices/1001\n\nNow change the ID to another user:\n  GET /api/invoices/1002\n\nBUG if it returns user 1002's invoice. The server must reject it.",
      },
      {
        type: 'alert',
        value:
          'Privilege escalation means getting more access than you should. There are two kinds: horizontal (reach another user at the same level, like reading their invoice) and vertical (reach a higher level, like a normal user gaining admin powers).',
      },
      {
        type: 'warning',
        value:
          'Only change IDs on apps you own or have written permission to test, such as practice apps. Doing this on real systems without permission is illegal.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A hotel key should open only your room. Authorization testing is trying your key on the room next door (horizontal) and on the manager’s office (vertical) to make sure both stay locked.',
    },
    mistakes: [
      'Enforcing permissions only in the frontend by hiding buttons, not on the server.',
      'Forgetting to test IDOR by changing IDs in URLs and API calls.',
      'Confusing horizontal escalation (same level) with vertical escalation (higher level).',
      'Testing access control on real production data without authorisation.',
    ],
    takeaways: [
      'Authentication is who you are; authorization is what you may do.',
      'Permission checks must run on the server, not just the frontend.',
      'Test IDOR by changing an ID in the URL or API to reach another user’s data.',
      'Horizontal escalation reaches a same-level user; vertical reaches a higher role like admin.',
    ],
  },

  'm12-l4': {
    id: 'm12-l4',
    title: 'Lesson 12.4 OWASP Top 10',
    objectives: [
      'Explain what the OWASP Top 10 is.',
      'Name the 2021 categories A01 to A10 with a plain meaning.',
      'Give a simple tester check for each category.',
    ],
    theory:
      'The OWASP Top 10 is a well-known list of the most common and serious web application security risks, used as a checklist by testers and developers.',
    blocks: [
      { type: 'heading', value: 'What is OWASP and the Top 10?' },
      {
        type: 'text',
        value:
          'OWASP stands for the Open Web Application Security Project, a free community that shares security knowledge. Its "Top 10" is a ranked list of the most common web risks. The 2021 edition is the widely used reference below. A newer update is being prepared, but the 2021 categories remain the standard reference here.',
      },
      {
        type: 'table',
        headers: ['Code', 'Name', 'Plain meaning', 'A tester check'],
        rows: [
          ['A01', 'Broken Access Control', 'Users reach data or actions they should not.', 'Change an ID or open an admin URL as a normal user.'],
          ['A02', 'Cryptographic Failures', 'Sensitive data is not properly encrypted.', 'Check the site uses HTTPS and passwords are hashed, not stored plainly.'],
          ['A03', 'Injection', 'Untrusted input is run as code or a query (SQL, commands).', 'Enter special characters like ’ or SQL text and watch for errors.'],
          ['A04', 'Insecure Design', 'The design itself lacks security thinking.', 'Ask if threats were considered when the feature was planned.'],
          ['A05', 'Security Misconfiguration', 'Weak or default settings are left in place.', 'Look for default passwords, open admin panels, or detailed error pages.'],
          ['A06', 'Vulnerable and Outdated Components', 'Old libraries with known bugs are used.', 'List dependencies and check versions for known issues.'],
          ['A07', 'Identification and Authentication Failures', 'Login is weak or sessions are poorly handled.', 'Test weak passwords, lockout, and session timeout.'],
          ['A08', 'Software and Data Integrity Failures', 'Code or updates are trusted without checking they are genuine.', 'Check that updates and packages are verified before use.'],
          ['A09', 'Security Logging and Monitoring Failures', 'Attacks are not logged or noticed.', 'Confirm failed logins and key actions are logged.'],
          ['A10', 'Server-Side Request Forgery (SSRF)', 'The server is tricked into calling an address the attacker chooses.', 'Test if a URL field makes the server fetch an internal address.'],
        ],
      },
      {
        type: 'alert',
        value:
          'You do not need to memorise all ten today. Use this table as a checklist. The two most important for beginners are A01 Broken Access Control and A03 Injection.',
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'The Top 10 is like a safety checklist a pilot runs before takeoff: the same common problems, checked every time, so nothing dangerous is missed.',
    },
    mistakes: [
      'Treating the Top 10 as a full security guarantee instead of a common-risks checklist.',
      'Memorising names but never actually running the tester checks.',
      'Mixing up the categories, for example calling XSS its own top-level item (it is part of A03 Injection in 2021).',
      'Assuming HTTPS alone makes an app secure.',
    ],
    takeaways: [
      'The OWASP Top 10 is a checklist of the most common web security risks.',
      'The 2021 list runs A01 Broken Access Control to A10 SSRF.',
      'Each category has a simple tester check you can perform.',
      'A01 Broken Access Control and A03 Injection are the most important for beginners.',
      'A newer update exists, but 2021 remains the standard reference here.',
    ],
  },

  'm12-l5': {
    id: 'm12-l5',
    title: 'Lesson 12.5 Basic Vulnerability Testing',
    objectives: [
      'Understand ethics: only test apps you are allowed to test.',
      'Recognise simple SQL injection and XSS test inputs.',
      'Follow basic OWASP ZAP steps to scan a practice app.',
    ],
    theory:
      'Basic vulnerability testing means checking whether an app safely handles bad input. Practice only on apps you own or on legal practice apps like OWASP Juice Shop or DVWA.',
    blocks: [
      { type: 'heading', value: 'Ethics first: get permission' },
      {
        type: 'warning',
        value:
          'Testing security on systems you do not own, without written permission, is illegal in most countries. Everything below is for your OWN apps or safe practice apps built for learning, such as OWASP Juice Shop and DVWA (Damn Vulnerable Web Application).',
      },
      { type: 'heading', value: 'SQL injection: the idea' },
      {
        type: 'text',
        value:
          'SQL injection happens when user input is put straight into a database query. If a login query is built by joining text, a crafted input can change its meaning. Testers use a harmless probe to see if input is not cleaned.',
      },
      {
        type: 'code',
        language: 'text',
        value:
          "On a PRACTICE app only, in a login field, try inputs such as:\n  '\n  ' OR '1'='1\n\nIf the app shows a database error or logs you in unexpectedly,\ninput is not being handled safely.\n\nThe fix (for developers): use parameterised queries so input\nis treated as data, never as part of the SQL command.",
      },
      { type: 'heading', value: 'XSS: the idea' },
      {
        type: 'text',
        value:
          'Cross-Site Scripting (XSS) happens when an app shows user input on a page without cleaning it, so a script can run in another user’s browser. A tester checks whether input is escaped.',
      },
      {
        type: 'code',
        language: 'text',
        value:
          "On a PRACTICE app only, in a comment or search box, try:\n  <script>alert('xss')</script>\n\nIf a pop-up appears, the input was not escaped and XSS is possible.\n\nThe fix (for developers): escape or encode output, so the browser\nshows the text instead of running it as code.",
      },
      { type: 'heading', value: 'Scanning with OWASP ZAP' },
      {
        type: 'text',
        value:
          'OWASP ZAP (Zed Attack Proxy) is a free tool that automatically looks for common vulnerabilities. Use it on your own or practice apps.',
      },
      {
        type: 'steps',
        title: 'Basic ZAP scan',
        steps: [
          { label: 'Install and open ZAP', text: 'Download OWASP ZAP for free and start it.' },
          { label: 'Enter the target URL', text: 'Point ZAP at your own or practice app, for example your local Juice Shop.' },
          { label: 'Spider the site', text: 'Let ZAP crawl the pages to discover links and inputs.' },
          { label: 'Run an active scan', text: 'ZAP sends test inputs to look for issues like injection and XSS.' },
          { label: 'Read the alerts', text: 'Review the findings by risk level, then confirm real issues manually.' },
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Install OWASP Juice Shop on your own machine (it is built to be safely hacked).',
          'Open a search or login field and enter a single quote to see if an error appears.',
          "Enter <script>alert('test')</script> in a comment field and see whether it is escaped.",
          'Install OWASP ZAP, spider Juice Shop, and run an active scan.',
          'Write down each finding, its risk level, and the suggested fix.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: false,
        items: [
          'What is the best developer fix for SQL injection? (Parameterised queries.)',
          'What is the best developer fix for XSS? (Escape or encode output before showing it.)',
          'Is it legal to test a website you do not own without permission? (No.)',
          'Name one safe app made for practising security testing. (OWASP Juice Shop or DVWA.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text:
        'A practice app is a locked training gym for hackers-in-learning. You may pick these locks freely, but picking a stranger’s real door is a crime.',
    },
    mistakes: [
      'Testing SQL injection or XSS on real sites you do not own; this is illegal.',
      'Believing client-side validation alone stops injection; the server must clean input too.',
      'Trusting an automated ZAP scan blindly without confirming findings by hand.',
      'Fixing SQL injection by blocking a few characters instead of using parameterised queries.',
      'Assuming a single passing test means the whole app is secure.',
    ],
    takeaways: [
      'Only test apps you own or legal practice apps like OWASP Juice Shop and DVWA.',
      'SQL injection is fixed by parameterised queries that treat input as data.',
      'XSS is fixed by escaping or encoding output so scripts do not run.',
      'OWASP ZAP scans your practice app for common vulnerabilities.',
      'Automated findings must be confirmed manually before you trust them.',
    ],
  },
};
