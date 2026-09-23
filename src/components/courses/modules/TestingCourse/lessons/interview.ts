import type { Lesson } from '../TestingCourseData';
import type { LessonBlock } from '../../../shared/LessonBlocks';

/** A question/answer pair rendered as two text blocks. */
const qa = (question: string, answer: string): LessonBlock[] => [
  { type: 'text', value: `Q: ${question}` },
  { type: 'text', value: `A: ${answer}` }
];

const h = (value: string): LessonBlock => ({ type: 'heading', value });

/* ------------------------------------------------------------------ */
/* Manual testing                                                      */
/* ------------------------------------------------------------------ */

const manual: Lesson = {
  id: 'interview-manual',
  title: 'Manual Testing Interview Questions',
  objectives: [
    'Answer the most common manual testing questions in clear, simple words.',
    'Explain classic pairs like severity vs priority and verification vs validation.',
    'Describe the bug life cycle, test design techniques and test documents with examples.'
  ],
  theory:
    'Manual testing interviews check that you understand testing basics: types of testing, test design techniques, bug life cycle and test documents. Short, correct answers with a small real example work best.',
  blocks: [
    {
      type: 'text',
      value:
        'Almost every QA interview starts with manual testing questions, even for automation roles. The interviewer wants to see that you understand why and how we test, not only which tools you know. Read each question, try to answer it aloud first, and then compare with the model answer.'
    },
    {
      type: 'alert',
      value:
        'Good answer pattern: 1) give a one-line definition, 2) add a short example from a real app (login page, shopping cart, payment), 3) stop. Do not talk for five minutes on one question.'
    },

    h('Beginner questions'),
    ...qa(
      'What is software testing and why is it needed?',
      'Software testing is the process of checking that an application works as expected and finding defects before real users do. It is needed because bugs in production cost money, damage trust and can even be dangerous (for example in banking or health apps). Testing also gives the team confidence to release.'
    ),
    ...qa(
      'What is the difference between a defect, a bug, an error and a failure?',
      'An error is a human mistake, for example a developer writes the wrong condition. That mistake creates a defect (also called a bug) in the code. When the defective code runs and the app behaves wrongly for the user, that is a failure. Not every defect causes a failure, because some code paths are never used.'
    ),
    ...qa(
      'What is the difference between verification and validation?',
      'Verification asks "Are we building the product right?" and checks documents and design against the specification, usually without running code (reviews, walkthroughs). Validation asks "Are we building the right product?" and checks the working software against real user needs by running it.'
    ),
    {
      type: 'compare',
      columns: [
        {
          title: 'Verification',
          subtitle: 'Building the product right',
          tone: 'olive',
          items: ['Static: code is not executed', 'Reviews, walkthroughs, inspections', 'Checks against specification', 'Done early, before or during coding']
        },
        {
          title: 'Validation',
          subtitle: 'Building the right product',
          tone: 'honey',
          items: ['Dynamic: code is executed', 'Functional, system, UAT testing', 'Checks against user needs', 'Done after a build is available']
        }
      ]
    },
    ...qa(
      'What is the difference between smoke testing and sanity testing?',
      'Smoke testing is a quick, broad check of the main features on a new build to decide if the build is stable enough for deeper testing. Sanity testing is a narrow, focused check on one area after a small change or bug fix to confirm that the fix works. Smoke is wide and shallow; sanity is narrow and deep.'
    ),
    ...qa(
      'What is regression testing and when do you do it?',
      'Regression testing means re-running existing tests to make sure new changes did not break features that worked before. We do it after bug fixes, new features, configuration changes or environment upgrades. Because it repeats often, regression suites are the best candidates for automation.'
    ),
    ...qa(
      'What is the difference between retesting and regression testing?',
      'Retesting checks that a specific failed test now passes after the bug is fixed; it runs the same steps that found the bug. Regression testing checks that the fix did not break other, related areas. Retesting is planned for known defects, regression looks for unexpected side effects.'
    ),
    ...qa(
      'What are the phases of STLC?',
      'The Software Testing Life Cycle has six common phases: requirement analysis, test planning, test case development, test environment setup, test execution, and test cycle closure. Each phase has entry and exit criteria, for example test execution starts only when the build and test data are ready.'
    ),

    h('Intermediate questions'),
    ...qa(
      'What is the difference between severity and priority? Give examples.',
      'Severity is how badly the defect affects the system (a technical view, usually set by the tester). Priority is how soon the defect must be fixed (a business view, usually set by the product owner or lead). They are independent, so all four combinations are possible.'
    ),
    {
      type: 'table',
      headers: ['Combination', 'Example'],
      rows: [
        ['High severity, high priority', 'Payment page crashes for every user on checkout.'],
        ['High severity, low priority', 'App crashes on a rarely used legacy report that only one internal user opens once a year.'],
        ['Low severity, high priority', 'Company logo or brand name is misspelled on the home page.'],
        ['Low severity, low priority', 'Small alignment issue in the footer of the "About us" page.']
      ]
    },
    ...qa(
      'Explain the bug life cycle.',
      'A typical cycle is: New, then Assigned to a developer, then Open while it is being fixed, then Fixed, then Retest by the tester, and finally Verified and Closed if it passes. If the fix does not work it goes to Reopened. Other possible states are Rejected (not a bug), Duplicate, and Deferred (fix later).'
    ),
    {
      type: 'steps',
      title: 'Common bug life cycle',
      steps: [
        { label: 'New', text: 'Tester logs the bug with steps, expected and actual result.' },
        { label: 'Assigned', text: 'Lead assigns it to a developer.' },
        { label: 'Open / In progress', text: 'Developer analyses and fixes it. Can also mark Rejected, Duplicate or Deferred.' },
        { label: 'Fixed', text: 'Fix is deployed to the test environment.' },
        { label: 'Retest', text: 'Tester repeats the steps.' },
        { label: 'Closed or Reopened', text: 'Closed if it passes, Reopened if the problem is still there.' }
      ]
    },
    ...qa(
      'What is Boundary Value Analysis (BVA) and Equivalence Partitioning (EP)? When do you use each?',
      'Equivalence Partitioning splits input data into groups that the system should treat the same way, and you test one value from each group. Boundary Value Analysis tests values at the edges of those groups, because bugs often hide at the limits. We usually use both together: EP to reduce the number of tests, BVA to catch off-by-one errors.'
    ),
    {
      type: 'example',
      title: 'Age field that accepts 18 to 60',
      value:
        'Equivalence partitions: below 18 (invalid), 18 to 60 (valid), above 60 (invalid). Test one value each: 10, 35, 70.\nBoundary values: 17, 18, 19 and 59, 60, 61.\nTogether these 9 values give strong coverage with very few test cases.'
    },
    ...qa(
      'What is the difference between a test plan, a test strategy, a test scenario and a test case?',
      'A test strategy is a high-level, organisation or project wide approach to testing. A test plan is a project document that describes scope, schedule, resources, environments and risks for a release. A test scenario is one thing to test, such as "verify login", and a test case is the detailed steps, data and expected result for one check inside that scenario.'
    ),
    ...qa(
      'What is a Requirement Traceability Matrix (RTM)?',
      'An RTM is a table that maps each requirement to the test cases that cover it and to any defects found. It helps us prove that every requirement is tested and quickly see the impact when a requirement changes. A simple RTM has columns like Requirement ID, Test Case IDs, Status and Defect IDs.'
    ),
    ...qa(
      'What is the difference between black box, white box and grey box testing?',
      'In black box testing the tester checks inputs and outputs without looking at the code. In white box testing the tester knows the code and designs tests for paths, branches and conditions (often done by developers). Grey box testing mixes both, for example a tester who reads the database schema or API design to plan better tests.'
    ),

    h('Advanced questions'),
    ...qa(
      'How do you decide what to test when time is short?',
      'I use risk-based testing. I first cover the features that matter most to the business and users (payment, login, data saving), areas that changed in this release, and areas that had many bugs before. I tell the lead clearly what is not covered so the team can take an informed release decision.'
    ),
    ...qa(
      'A developer says your bug is "not a bug" or "cannot reproduce". What do you do?',
      'I stay calm and first re-check the requirement to make sure my expected result is correct. Then I give clear evidence: exact steps, test data, environment, browser version, screenshots, video and logs. If we still disagree, I ask the product owner or BA to decide based on the requirement, because the goal is the right product, not winning the argument.'
    ),
    ...qa(
      'What is exploratory testing and how is it different from ad-hoc testing?',
      'Exploratory testing is learning the app, designing tests and running them at the same time, usually inside a time box with a clear goal (a charter) and notes of what was covered. Ad-hoc testing is informal and unplanned, with no documentation. Exploratory testing is structured and skilled; ad-hoc is random.'
    ),
    ...qa(
      'When should you stop testing? What are exit criteria?',
      'Testing can never prove there are zero bugs, so we stop when agreed exit criteria are met. Typical criteria are: all planned high-priority tests executed, a pass rate target reached (for example 95%), no open critical or high bugs, and requirement coverage complete. Deadlines and budget also matter, but the remaining risk should be clearly reported.'
    ),
    {
      type: 'warning',
      value:
        'Do not say "we stop testing when there are no bugs". Interviewers see this as a beginner mistake. Talk about exit criteria and risk instead.'
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Always add a small real example to a definition. "Severity vs priority" plus "a misspelled company logo" shows understanding, not memorisation.'
  },
  mistakes: [
    'Giving textbook definitions with no example from a real application.',
    'Mixing up severity and priority, or smoke and sanity testing.',
    'Saying testing can prove software has no bugs.',
    'Answering "I will just test everything" when asked how to prioritise.',
    'Speaking badly about developers when asked about bug disagreements.'
  ],
  takeaways: [
    'Use the pattern: definition, short example, stop.',
    'Know the classic pairs: severity/priority, verification/validation, smoke/sanity, retest/regression.',
    'Be ready to draw the bug life cycle and list STLC phases.',
    'Show BVA and EP with a concrete numeric example.',
    'Talk about risk and exit criteria when asked about limited time or stopping testing.'
  ]
};

/* ------------------------------------------------------------------ */
/* Selenium                                                            */
/* ------------------------------------------------------------------ */

const selenium: Lesson = {
  id: 'interview-selenium',
  title: 'Selenium Interview Questions',
  objectives: [
    'Answer common Selenium WebDriver questions with correct Selenium 4 Java code.',
    'Explain waits, locators and common exceptions in simple words.',
    'Handle windows, frames, alerts and dropdowns confidently in a live coding round.'
  ],
  theory:
    'Selenium interviews test your understanding of WebDriver, locators, waits, exceptions and handling browser elements like windows, frames and alerts. Expect to write small Java snippets.',
  blocks: [
    {
      type: 'text',
      value:
        'For automation roles, Selenium questions usually come right after manual testing questions. Many interviewers ask you to write code on a shared screen or paper, so practise typing these snippets from memory. All examples use Selenium 4 with Java.'
    },

    h('Beginner questions'),
    ...qa(
      'What is Selenium and what are its components?',
      'Selenium is a free, open-source tool suite for automating web browsers. Its main parts are Selenium WebDriver (the API that drives browsers from code), Selenium IDE (a record and playback browser extension) and Selenium Grid (runs tests on many machines and browsers in parallel). Selenium RC is the old, removed version.'
    ),
    ...qa(
      'Which locators does Selenium support? Which one do you prefer?',
      'Selenium supports id, name, className, tagName, linkText, partialLinkText, cssSelector and xpath. I prefer id when it is unique and stable, then cssSelector because it is fast and readable, and xpath when I need text matching or to move to a parent element. I avoid long absolute xpaths because they break when the layout changes.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `driver.findElement(By.id("username"));
driver.findElement(By.cssSelector("button[type='submit']"));
driver.findElement(By.xpath("//a[text()='Forgot password?']"));
// Relative xpath using a parent-child relationship
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));`
    },
    ...qa(
      'What is the difference between driver.close() and driver.quit()?',
      'close() closes only the browser window that currently has focus; the WebDriver session stays alive if other windows are open. quit() closes all windows opened by the session and ends the WebDriver session, freeing the driver process. We normally call quit() in the teardown method.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `driver.close(); // closes current window only
driver.quit();  // closes every window and ends the session

@AfterMethod
public void tearDown() {
    if (driver != null) {
        driver.quit();
    }
}`
    },
    ...qa(
      'What is the difference between findElement() and findElements()?',
      'findElement() returns the first matching WebElement and throws NoSuchElementException if nothing matches. findElements() returns a List of all matches and returns an empty list (no exception) if nothing matches. findElements() is useful to check whether an element exists.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `boolean isPresent = !driver.findElements(By.id("errorMessage")).isEmpty();`
    },
    ...qa(
      'What is the difference between get() and navigate().to()?',
      'Both open a URL and wait for the page load. navigate() also gives back(), forward() and refresh() and keeps browser history handy for navigation tests. In practice get() is used to open a page and navigate() for moving through history.'
    ),

    h('Intermediate questions'),
    ...qa(
      'What is the difference between implicit wait and explicit wait?',
      'An implicit wait is set once for the driver and makes every findElement call poll for up to that time before failing. An explicit wait waits for a specific condition on a specific element, like visible or clickable, using WebDriverWait. Explicit waits are preferred; do not mix implicit and explicit waits because the wait times can add up unpredictably.'
    ),
    {
      type: 'compare',
      columns: [
        {
          title: 'Implicit wait',
          tone: 'honey',
          items: ['Set once, applies to all findElement calls', 'Only waits for element to be present in DOM', 'Cannot wait for visible or clickable', 'Simple but less flexible']
        },
        {
          title: 'Explicit wait',
          tone: 'olive',
          items: ['Used where needed, for one condition', 'Waits for visible, clickable, text, URL and more', 'Uses WebDriverWait + ExpectedConditions', 'Recommended for stable tests']
        }
      ]
    },
    {
      type: 'code',
      language: 'java',
      value: `// Implicit wait (Selenium 4 uses Duration)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement loginBtn = wait.until(
        ExpectedConditions.elementToBeClickable(By.id("login")));
loginBtn.click();`
    },
    ...qa(
      'What is a Fluent Wait?',
      'A Fluent Wait is an explicit wait where you also control the polling interval and which exceptions to ignore while waiting. It is useful for elements that appear at irregular times. WebDriverWait is actually a subclass of FluentWait.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(30))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

WebElement status = wait.until(d -> d.findElement(By.id("status")));`
    },
    ...qa(
      'What is StaleElementReferenceException and how do you handle it?',
      'It happens when you keep a reference to an element, but the page or that part of the DOM was refreshed, so the old reference is no longer attached. The fix is to find the element again after the change. You can wait for the old element to go stale, use a retry, or use Page Factory / By locators that look the element up each time.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public void clickWithRetry(By locator) {
    int attempts = 0;
    while (attempts < 3) {
        try {
            driver.findElement(locator).click(); // fresh lookup each time
            return;
        } catch (StaleElementReferenceException e) {
            attempts++;
        }
    }
    throw new RuntimeException("Element still stale after 3 attempts: " + locator);
}

// Or wait until the old element is detached, then find it again
WebElement table = driver.findElement(By.id("results"));
driver.findElement(By.id("refresh")).click();
new WebDriverWait(driver, Duration.ofSeconds(10))
        .until(ExpectedConditions.stalenessOf(table));
table = driver.findElement(By.id("results"));`
    },
    ...qa(
      'How do you handle multiple windows or tabs?',
      'Each window has a unique handle string. Save the parent handle with getWindowHandle(), get all handles with getWindowHandles(), switch to the one that is not the parent, do the work, then close it and switch back. Selenium 4 also lets you open a new tab directly with newWindow().'
    ),
    {
      type: 'code',
      language: 'java',
      value: `String parent = driver.getWindowHandle();
driver.findElement(By.linkText("Open terms")).click();

for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(parent)) {
        driver.switchTo().window(handle);
        break;
    }
}
System.out.println("Child title: " + driver.getTitle());
driver.close();                    // close child window
driver.switchTo().window(parent);  // go back to parent

// Selenium 4: open a new tab
driver.switchTo().newWindow(WindowType.TAB);`
    },
    ...qa(
      'How do you handle frames, alerts and dropdowns?',
      'For frames, switch into the frame by index, name/id or WebElement, and use defaultContent() to come back. For JavaScript alerts, switch to the alert and accept, dismiss or read its text. For HTML select dropdowns, use the Select class.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `// Frames
driver.switchTo().frame("paymentFrame");
driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.switchTo().defaultContent();

// Alerts
Alert alert = driver.switchTo().alert();
String msg = alert.getText();
alert.accept();   // or alert.dismiss();

// Dropdowns
Select country = new Select(driver.findElement(By.id("country")));
country.selectByVisibleText("India");
country.selectByValue("IN");
country.selectByIndex(2);`
    },
    ...qa(
      'How do you perform mouse hover, drag and drop or right click?',
      'Use the Actions class. You build a chain of actions and call perform() at the end. Forgetting perform() is a common reason why nothing happens.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `Actions actions = new Actions(driver);
actions.moveToElement(driver.findElement(By.id("menu"))).perform();
actions.contextClick(driver.findElement(By.id("file"))).perform();
actions.dragAndDrop(driver.findElement(By.id("source")),
                    driver.findElement(By.id("target"))).perform();`
    },

    h('Advanced questions'),
    ...qa(
      'How do you take a screenshot in Selenium?',
      'Cast the driver to TakesScreenshot and call getScreenshotAs(). In frameworks we usually take a screenshot automatically on failure inside a TestNG listener or an @AfterMethod that checks the test result. Selenium 4 can also take a screenshot of a single element.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
Files.copy(src.toPath(), Paths.get("screenshots", "login_failed.png"),
        StandardCopyOption.REPLACE_EXISTING);

// Selenium 4: screenshot of one element
File logo = driver.findElement(By.id("logo")).getScreenshotAs(OutputType.FILE);`
    },
    ...qa(
      'When would you use JavascriptExecutor?',
      'Use it when normal WebDriver actions do not work, for example scrolling to an element, clicking an element hidden behind an overlay, or reading a value that is set by JavaScript. It should be a last resort, because a real user cannot click hidden elements, so a JS click can hide a real bug.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `JavascriptExecutor js = (JavascriptExecutor) driver;
WebElement footer = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", footer);
js.executeScript("arguments[0].click();", footer);`
    },
    ...qa(
      'What is new in Selenium 4?',
      'Selenium 4 uses the W3C WebDriver standard for communication, adds relative locators (above, below, near, toLeftOf, toRightOf), new window and tab support, element screenshots, and access to Chrome DevTools Protocol. Selenium Manager (from 4.6) downloads the correct browser driver automatically, so you no longer need to set the driver path manually.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `// No System.setProperty needed - Selenium Manager finds the driver
WebDriver driver = new ChromeDriver();

// Relative locator
WebElement password = driver.findElement(
        RelativeLocator.with(By.tagName("input")).below(By.id("username")));`
    },
    ...qa(
      'What is Selenium Grid and how does it work in Selenium 4?',
      'Selenium Grid runs tests on several machines, browsers and operating systems at the same time. In Selenium 4 you can start it in standalone mode or as hub and nodes, and tests connect using RemoteWebDriver with the grid URL and browser options. This cuts total execution time and supports cross-browser testing.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `ChromeOptions options = new ChromeOptions();
WebDriver driver = new RemoteWebDriver(
        new URL("http://localhost:4444"), options);`
    },
    ...qa(
      'What are the limitations of Selenium?',
      'Selenium only automates web browsers, so it cannot test desktop or native mobile apps directly (Appium is used for mobile). It cannot read captcha or barcodes, has no built-in reporting or test data management, and needs a framework like TestNG or JUnit for assertions and structure. Image comparison and API testing also need other libraries.'
    )
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'When you explain a concept, offer to write the code. Typing a correct explicit wait or window-switch snippet in 30 seconds is more convincing than any definition.'
  },
  mistakes: [
    'Using Thread.sleep() everywhere and calling it a wait strategy.',
    'Confusing close() with quit(), or forgetting to quit the driver in teardown.',
    'Writing old Selenium 3 syntax such as new WebDriverWait(driver, 10) instead of Duration.',
    'Saying you "always use absolute xpath" or copying xpath from browser tools without improving it.',
    'Claiming Selenium can automate captcha or desktop applications.'
  ],
  takeaways: [
    'Prefer id and CSS selectors; use short relative xpath when needed.',
    'Explicit waits (WebDriverWait) are the correct answer to timing problems; avoid mixing with implicit waits.',
    'StaleElementReferenceException means find the element again after the DOM changes.',
    'Know window, frame, alert, dropdown and Actions code by heart.',
    'Mention Selenium 4 features: Duration, relative locators, newWindow, Selenium Manager.'
  ]
};

/* ------------------------------------------------------------------ */
/* API testing                                                         */
/* ------------------------------------------------------------------ */

const api: Lesson = {
  id: 'interview-api',
  title: 'API Testing Interview Questions',
  objectives: [
    'Explain REST, HTTP methods and status codes in simple words.',
    'Compare classic pairs like PUT vs PATCH and 401 vs 403.',
    'Write basic Postman test scripts and describe how you test an API end to end.'
  ],
  theory:
    'API testing interviews check your knowledge of HTTP methods, status codes, headers, authentication and how you validate responses in tools like Postman or Rest Assured.',
  blocks: [
    {
      type: 'text',
      value:
        'An API (Application Programming Interface) lets two programs talk to each other. In most QA jobs you will test REST APIs that send and receive JSON over HTTP. Interviewers like API questions because API tests are fast, stable and find bugs before the UI is ready.'
    },

    h('Beginner questions'),
    ...qa(
      'What is API testing and why is it important?',
      'API testing checks the business logic layer directly by sending requests and validating responses, without using the UI. It is important because it is faster and more stable than UI testing, can start before the UI exists, and covers data, security and error handling that the UI may hide.'
    ),
    ...qa(
      'What is the difference between REST and SOAP?',
      'REST is an architectural style that uses standard HTTP methods and usually JSON, and it is lightweight and stateless. SOAP is a strict protocol that uses only XML messages with an envelope and a WSDL contract, with built-in standards for security and transactions. Most modern web and mobile apps use REST.'
    ),
    ...qa(
      'What are the common HTTP methods?',
      'GET reads data, POST creates a new resource, PUT replaces a whole resource, PATCH updates part of a resource, and DELETE removes a resource. GET, PUT and DELETE should be idempotent, meaning sending the same request many times gives the same final result. POST is not idempotent because each call can create a new record.'
    ),
    {
      type: 'table',
      headers: ['Method', 'Purpose', 'Idempotent', 'Typical success code'],
      rows: [
        ['GET', 'Read a resource', 'Yes', '200 OK'],
        ['POST', 'Create a resource', 'No', '201 Created'],
        ['PUT', 'Replace a whole resource', 'Yes', '200 OK or 204 No Content'],
        ['PATCH', 'Update some fields', 'Not guaranteed', '200 OK or 204 No Content'],
        ['DELETE', 'Remove a resource', 'Yes', '204 No Content or 200 OK']
      ]
    },
    ...qa(
      'Explain the main HTTP status code groups with examples.',
      '1xx are informational, 2xx mean success (200 OK, 201 Created, 204 No Content), 3xx are redirects (301 Moved Permanently, 304 Not Modified), 4xx are client errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests), and 5xx are server errors (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable).'
    ),
    ...qa(
      'What are the parts of an HTTP request and response?',
      'A request has a method, a URL (with path and query parameters), headers (like Content-Type and Authorization) and an optional body. A response has a status code, headers and an optional body. As a tester I validate all of them, not only the body.'
    ),
    {
      type: 'code',
      language: 'http',
      value: `POST /api/v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "name": "Asha",
  "email": "asha@example.com"
}

HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/users/42

{
  "id": 42,
  "name": "Asha",
  "email": "asha@example.com"
}`
    },
    ...qa(
      'What is the difference between path parameters and query parameters?',
      'A path parameter is part of the URL path and identifies a specific resource, for example /users/42. A query parameter comes after the question mark and filters, sorts or pages the results, for example /users?role=admin&page=2.'
    ),

    h('Intermediate questions'),
    ...qa(
      'What is the difference between PUT and PATCH?',
      'PUT replaces the entire resource, so you must send all fields; missing fields may be cleared or reset. PATCH sends only the fields you want to change. PUT is idempotent by definition, while PATCH may or may not be, depending on how it is implemented.'
    ),
    {
      type: 'compare',
      columns: [
        {
          title: 'PUT',
          subtitle: 'Replace everything',
          tone: 'honey',
          items: ['Send the full object', 'Missing fields can be lost', 'Idempotent', 'PUT /users/42 {"name":"Asha","email":"a@x.com","role":"admin"}']
        },
        {
          title: 'PATCH',
          subtitle: 'Change some fields',
          tone: 'olive',
          items: ['Send only changed fields', 'Other fields stay the same', 'Idempotency not guaranteed', 'PATCH /users/42 {"role":"admin"}']
        }
      ]
    },
    ...qa(
      'What is the difference between 401 and 403?',
      '401 Unauthorized means the server does not know who you are: the token is missing, invalid or expired, so you must authenticate. 403 Forbidden means the server knows who you are, but you do not have permission for this action, for example a normal user calling an admin endpoint. Logging in again fixes a 401 but not a 403.'
    ),
    {
      type: 'compare',
      columns: [
        { title: '401 Unauthorized', subtitle: 'Who are you?', tone: 'rose', items: ['Authentication problem', 'No token, wrong token, expired token', 'Fix: log in / send valid credentials'] },
        { title: '403 Forbidden', subtitle: 'I know you, but no.', tone: 'honey', items: ['Authorization problem', 'Valid user without the right role', 'Fix: needs permission, not a new login'] }
      ]
    },
    ...qa(
      'What do you validate when testing an API?',
      'I check the status code, response body values and data types, the JSON schema, required headers like Content-Type, and response time. I also verify side effects, such as the record actually being saved in the database, and negative cases like invalid input, missing fields, wrong auth and very large payloads.'
    ),
    ...qa(
      'How do you write tests in Postman?',
      'Postman tests are JavaScript written in the Scripts > Post-response tab (earlier called Tests) using pm.test and pm.expect. You can check status, body values, headers and response time, and save values like a token or an id into variables for the next request.'
    ),
    {
      type: 'code',
      language: 'javascript',
      value: `pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response time is below 1000 ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Content-Type is JSON", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

const body = pm.response.json();

pm.test("User has correct name and numeric id", function () {
    pm.expect(body.name).to.eql("Asha");
    pm.expect(body.id).to.be.a("number");
});

// Save the id for the next request (GET /users/{{userId}})
pm.collectionVariables.set("userId", body.id);`
    },
    ...qa(
      'What is the difference between environment, collection and global variables in Postman?',
      'Global variables are available in the whole workspace. Collection variables belong to one collection. Environment variables belong to an environment such as dev, QA or staging, so you can run the same collection on different servers by switching the environment. When names clash, the more specific scope wins (local and data variables beat environment, which beats collection, which beats global).'
    ),
    ...qa(
      'What are common API authentication methods?',
      'Common methods are API keys (a key in a header or query), Basic Auth (username and password encoded in Base64), Bearer tokens such as JWT, and OAuth 2.0 where a client gets an access token from an authorization server. As a tester I check valid tokens, missing tokens, expired tokens and tokens with the wrong role.'
    ),

    h('Advanced questions'),
    ...qa(
      'How would you test a "create user" API end to end?',
      'I start with the happy path: valid body returns 201, the response contains the new id and correct fields, and a GET on that id returns the same data. Then negative tests: missing required fields (400), invalid email format, duplicate email (409), wrong data types, no token (401) and a user without permission (403). Finally I check boundaries like very long names, schema validation and response time.'
    ),
    ...qa(
      'How do you chain requests in Postman?',
      'I save a value from one response into a variable and use it in the next request with double curly braces. For example, the login request saves the token, and every other request uses Authorization: Bearer {{token}}. With the Collection Runner or Newman these requests run in order.'
    ),
    {
      type: 'code',
      language: 'javascript',
      value: `// In the Login request's post-response script
const data = pm.response.json();
pm.environment.set("token", data.accessToken);

// In the next request, Headers tab:
// Authorization: Bearer {{token}}`
    },
    ...qa(
      'What is Newman and how do you run Postman tests in CI?',
      'Newman is the command line runner for Postman collections. You export the collection and environment (or use the Postman API), then run newman in a Jenkins, GitHub Actions or GitLab pipeline step, and publish the HTML or JUnit report. The build fails automatically if any test fails.'
    ),
    {
      type: 'code',
      language: 'bash',
      value: `npm install -g newman newman-reporter-htmlextra
newman run UserAPI.postman_collection.json \\
  -e qa.postman_environment.json \\
  -r cli,htmlextra,junit`
    },
    ...qa(
      'What is contract or schema testing?',
      'Schema testing checks that the response structure matches an agreed JSON schema: field names, types and required fields. It catches breaking changes, like a field renamed from userId to user_id, even when the status code is still 200. In Postman you can use pm.response.to.have.jsonSchema(schema), and in Rest Assured the json-schema-validator module.'
    ),
    ...qa(
      'How is Rest Assured used for API automation?',
      'Rest Assured is a Java library that uses a readable given / when / then style. You set up headers and body in given(), send the request in when(), and assert status and body in then(). It fits well with TestNG or JUnit inside a Maven framework.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `given()
    .baseUri("https://api.example.com")
    .header("Authorization", "Bearer " + token)
    .contentType(ContentType.JSON)
    .body("{\\"name\\":\\"Asha\\",\\"email\\":\\"asha@example.com\\"}")
.when()
    .post("/api/v1/users")
.then()
    .statusCode(201)
    .body("name", equalTo("Asha"))
    .body("id", notNullValue());`
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'When asked "how would you test this API", list categories aloud: status code, body, schema, headers, auth, negative inputs, performance and database side effects. A structured list sounds senior.'
  },
  mistakes: [
    'Saying API testing only means checking the status code is 200.',
    'Mixing up 401 and 403, or PUT and PATCH.',
    'Forgetting negative tests like missing fields, wrong types and invalid tokens.',
    'Hard-coding tokens and URLs instead of using environment variables.',
    'Not knowing how Postman tests run in CI (Newman).'
  ],
  takeaways: [
    'Know HTTP methods, idempotency and the main status codes by heart.',
    '401 = not authenticated, 403 = authenticated but not allowed.',
    'PUT replaces the whole resource, PATCH changes part of it.',
    'Validate status, body, schema, headers, response time and side effects.',
    'Use variables to chain requests and Newman to run collections in pipelines.'
  ]
};

/* ------------------------------------------------------------------ */
/* SQL                                                                 */
/* ------------------------------------------------------------------ */

const sql: Lesson = {
  id: 'interview-sql',
  title: 'SQL Interview Questions',
  objectives: [
    'Write the classic interview queries: second highest salary, duplicates, joins, GROUP BY with HAVING.',
    'Explain keys, constraints and the difference between WHERE and HAVING.',
    'Describe how a tester uses SQL to validate application data.'
  ],
  theory:
    'SQL interviews for QA roles focus on SELECT queries, joins, aggregate functions, keys and constraints, plus a few classic puzzles such as finding the second highest salary or duplicate rows.',
  blocks: [
    {
      type: 'text',
      value:
        'Testers use SQL to check that data shown in the UI or returned by an API is really stored correctly in the database, and to prepare test data. Most examples below use two simple tables: employees(id, name, salary, dept_id, email) and departments(id, dept_name).'
    },

    h('Beginner questions'),
    ...qa(
      'Why does a tester need SQL?',
      'A tester uses SQL to verify back-end data after a UI or API action (for example, that a new order row was inserted with the right amount), to find or create test data, and to investigate bugs by checking what is actually stored. It lets us test beyond what the screen shows.'
    ),
    ...qa(
      'What is the difference between a primary key, a unique key and a foreign key?',
      'A primary key uniquely identifies each row, cannot be NULL, and a table has only one. A unique key also prevents duplicate values, but a table can have many and most databases allow NULL in it. A foreign key is a column that refers to the primary key of another table and keeps the relationship valid.'
    ),
    {
      type: 'table',
      headers: ['Feature', 'Primary key', 'Unique key', 'Foreign key'],
      rows: [
        ['Duplicates allowed', 'No', 'No', 'Yes'],
        ['NULL allowed', 'No', 'Usually yes', 'Yes'],
        ['How many per table', 'One', 'Many', 'Many'],
        ['Purpose', 'Identify a row', 'Keep a column unique', 'Link to another table']
      ]
    },
    ...qa(
      'What is the difference between DELETE, TRUNCATE and DROP?',
      'DELETE removes selected rows using a WHERE clause and can be rolled back in a transaction. TRUNCATE removes all rows quickly and resets identity counters in many databases, but keeps the table structure. DROP removes the whole table, including its structure and data.'
    ),
    ...qa(
      'What are the types of SQL commands?',
      'DDL (Data Definition Language) changes structure: CREATE, ALTER, DROP, TRUNCATE. DML (Data Manipulation Language) changes data: INSERT, UPDATE, DELETE. DQL reads data: SELECT. DCL controls access: GRANT, REVOKE. TCL controls transactions: COMMIT, ROLLBACK, SAVEPOINT.'
    ),
    ...qa(
      'How do you find all employees whose name starts with "A"?',
      'Use LIKE with the % wildcard, which matches any number of characters. An underscore _ matches exactly one character.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `SELECT *
FROM employees
WHERE name LIKE 'A%';`
    },

    h('Intermediate questions'),
    ...qa(
      'Write a query to find the second highest salary.',
      'A common portable answer uses a subquery: find the maximum salary that is less than the overall maximum. With window functions you can use DENSE_RANK, which also works for the Nth highest salary and handles ties correctly.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `-- Option 1: subquery
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Option 2: DENSE_RANK (change 2 to N for Nth highest)
SELECT DISTINCT salary
FROM (
    SELECT salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;

-- Option 3: MySQL / PostgreSQL
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`
    },
    ...qa(
      'How do you find duplicate records in a table?',
      'Group by the column (or columns) that should be unique and keep only groups with a count greater than one using HAVING. This is a very common test query to check that a unique rule really works.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `SELECT email, COUNT(*) AS occurrences
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;

-- Show the full duplicate rows
SELECT e.*
FROM employees e
JOIN (
    SELECT email
    FROM employees
    GROUP BY email
    HAVING COUNT(*) > 1
) d ON e.email = d.email
ORDER BY e.email;`
    },
    ...qa(
      'Explain the different types of joins.',
      'INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right, with NULLs where there is no match. RIGHT JOIN is the opposite, FULL OUTER JOIN returns all rows from both sides, and CROSS JOIN returns every combination. A SELF JOIN joins a table to itself, for example employees to their managers.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `-- Employees with their department name (only matched rows)
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- All employees, even those without a department
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- Departments that have no employees
SELECT d.dept_name
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
WHERE e.id IS NULL;`
    },
    ...qa(
      'What is the difference between WHERE and HAVING?',
      'WHERE filters individual rows before grouping and cannot use aggregate functions. HAVING filters groups after GROUP BY and can use aggregates like COUNT, SUM or AVG. You can use both in the same query.'
    ),
    {
      type: 'compare',
      columns: [
        { title: 'WHERE', subtitle: 'Filters rows', tone: 'olive', items: ['Runs before GROUP BY', 'Cannot use COUNT, SUM, AVG', 'Works without GROUP BY', 'WHERE salary > 50000'] },
        { title: 'HAVING', subtitle: 'Filters groups', tone: 'honey', items: ['Runs after GROUP BY', 'Uses aggregate functions', 'Normally used with GROUP BY', 'HAVING COUNT(*) > 5'] }
      ]
    },
    {
      type: 'code',
      language: 'sql',
      value: `-- Departments with more than 5 employees earning above 50,000
SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM employees
WHERE salary > 50000
GROUP BY dept_id
HAVING COUNT(*) > 5
ORDER BY emp_count DESC;`
    },
    ...qa(
      'What is the difference between UNION and UNION ALL?',
      'Both combine the results of two SELECT queries with the same number and type of columns. UNION removes duplicate rows, which costs extra processing. UNION ALL keeps all rows including duplicates and is faster.'
    ),
    ...qa(
      'How do you get the highest salary in each department?',
      'Group by the department and use MAX. Join with the departments table if you need the department name.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `SELECT d.dept_name, MAX(e.salary) AS highest_salary
FROM employees e
JOIN departments d ON e.dept_id = d.id
GROUP BY d.dept_name;`
    },

    h('Advanced questions'),
    ...qa(
      'What is the logical order in which a SELECT query is executed?',
      'Even though we write SELECT first, the database logically processes FROM and JOIN, then WHERE, then GROUP BY, then HAVING, then SELECT, then DISTINCT, then ORDER BY, and finally LIMIT. This explains why you cannot use a SELECT alias inside WHERE in most databases.'
    ),
    {
      type: 'steps',
      title: 'Logical query order',
      steps: [
        { label: 'FROM / JOIN' },
        { label: 'WHERE' },
        { label: 'GROUP BY' },
        { label: 'HAVING' },
        { label: 'SELECT' },
        { label: 'DISTINCT' },
        { label: 'ORDER BY' },
        { label: 'LIMIT / OFFSET' }
      ]
    },
    ...qa(
      'How do you delete duplicate rows but keep one copy?',
      'Keep the row with the smallest id for each duplicate value and delete the rest. The exact syntax depends on the database; the ROW_NUMBER approach works in SQL Server and PostgreSQL, and a self join works in MySQL. Always run it as a SELECT first to check which rows will be deleted.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `-- MySQL: self join
DELETE e1
FROM employees e1
JOIN employees e2
  ON e1.email = e2.email
 AND e1.id > e2.id;

-- PostgreSQL: keep the lowest id per email
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id)
    FROM employees
    GROUP BY email
);`
    },
    ...qa(
      'What is an index, and how can it affect testing?',
      'An index is a data structure that makes searching a column faster, like the index at the back of a book. It speeds up SELECT queries but slows down INSERT, UPDATE and DELETE slightly and uses extra storage. In performance testing, a missing index on a frequently searched column is a common cause of slow screens.'
    ),
    ...qa(
      'What is a transaction and what are ACID properties?',
      'A transaction is a group of SQL statements that must succeed or fail together, like debiting one account and crediting another. ACID means Atomicity (all or nothing), Consistency (data stays valid), Isolation (parallel transactions do not disturb each other) and Durability (committed data survives a crash).'
    ),
    ...qa(
      'How would you verify that placing an order in the UI saved the correct data?',
      'After placing the order I take the order id from the UI, then query the orders table for that id and compare the customer, total amount, status and date with what I entered. I also check related tables, such as order_items for each product and quantity, and inventory to confirm stock was reduced.'
    ),
    {
      type: 'code',
      language: 'sql',
      value: `SELECT o.id, o.status, o.total_amount, oi.product_id, oi.quantity
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = 10245;`
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Say your query aloud while writing it: "I group by email, then keep groups having count more than one." Talking through the logic earns marks even if you miss a comma.'
  },
  mistakes: [
    'Using an aggregate like COUNT(*) inside WHERE instead of HAVING.',
    'Answering "second highest salary" with ORDER BY LIMIT 1 without handling duplicate top salaries.',
    'Mixing up LEFT JOIN and INNER JOIN results when some rows have no match.',
    'Running DELETE or UPDATE without a WHERE clause (or without first testing it as a SELECT).',
    'Saying a table can have many primary keys.'
  ],
  takeaways: [
    'Practise the classics on paper: second highest salary, duplicates, joins, highest per group.',
    'WHERE filters rows before grouping; HAVING filters groups after.',
    'Know primary vs unique vs foreign keys and DELETE vs TRUNCATE vs DROP.',
    'Remember the logical query order to explain why queries behave as they do.',
    'Explain how you use SQL to verify UI and API actions in real testing.'
  ]
};

/* ------------------------------------------------------------------ */
/* Agile                                                               */
/* ------------------------------------------------------------------ */

const agile: Lesson = {
  id: 'interview-agile',
  title: 'Agile Interview Questions',
  objectives: [
    'Explain Agile, Scrum roles, events and artifacts in simple words.',
    'Describe the tester role inside a Scrum team, including shift-left testing.',
    'Answer situation questions such as scope changes in the middle of a sprint.'
  ],
  theory:
    'Agile interviews check that you understand how testing fits into short, iterative sprints: Scrum roles and ceremonies, user stories, acceptance criteria, Definition of Done and working closely with developers.',
  blocks: [
    {
      type: 'text',
      value:
        'Most software companies today work in Agile, usually with Scrum. Interviewers want to know that you can work in two-week sprints, test early, talk openly with developers and product owners, and help the team deliver working software every sprint.'
    },

    h('Beginner questions'),
    ...qa(
      'What is Agile?',
      'Agile is a way of building software in small, frequent increments with constant feedback from customers, instead of one big delivery at the end. The Agile Manifesto values individuals and interactions, working software, customer collaboration and responding to change. Scrum and Kanban are popular Agile frameworks.'
    ),
    ...qa(
      'What is the difference between Waterfall and Agile?',
      'Waterfall runs phases one after another (requirements, design, coding, testing, release), and testing starts late. Agile repeats all activities in short iterations, so testing happens every sprint and requirements can change. Agile finds bugs earlier and gets feedback faster.'
    ),
    {
      type: 'compare',
      columns: [
        { title: 'Waterfall', tone: 'honey', items: ['Sequential phases', 'Testing after coding is finished', 'Changes are expensive', 'One big release', 'Heavy documentation'] },
        { title: 'Agile', tone: 'olive', items: ['Short iterative sprints', 'Testing inside every sprint', 'Welcomes change', 'Frequent small releases', 'Just enough documentation'] }
      ]
    },
    ...qa(
      'What are the roles in Scrum?',
      'Scrum has three accountabilities. The Product Owner owns the product backlog and decides priority. The Scrum Master coaches the team on Scrum and removes blockers. The Developers are everyone who builds the increment, and that includes testers. There is no separate "QA role" in the Scrum Guide; testers are part of the Developers.'
    ),
    ...qa(
      'What are the Scrum events (ceremonies)?',
      'The Sprint itself contains four events: Sprint Planning (decide what to build and how), Daily Scrum (a 15-minute sync on progress and blockers), Sprint Review (show the increment to stakeholders and get feedback), and Sprint Retrospective (discuss how to improve the way the team works). Backlog refinement is an ongoing activity, not an official event.'
    ),
    {
      type: 'table',
      headers: ['Event', 'Purpose', 'What the tester does'],
      rows: [
        ['Sprint Planning', 'Choose stories and plan the work', 'Asks questions on acceptance criteria, estimates testing effort'],
        ['Daily Scrum', 'Sync progress, raise blockers', 'Shares testing status and blocking bugs'],
        ['Sprint Review', 'Demo the increment', 'Helps demo tested features, notes feedback'],
        ['Retrospective', 'Improve the process', 'Suggests quality improvements, e.g. earlier test data'],
        ['Refinement', 'Clarify and split stories', 'Finds missing scenarios and edge cases early']
      ]
    },
    ...qa(
      'What is a user story and what are acceptance criteria?',
      'A user story is a short description of a feature from the user point of view: "As a [user], I want [goal] so that [benefit]." Acceptance criteria are the clear conditions the story must meet to be accepted, often written in Given / When / Then form. Testers use them as the base for test cases.'
    ),
    {
      type: 'example',
      title: 'User story with acceptance criteria',
      value:
        'Story: As a registered customer, I want to reset my password so that I can log in if I forget it.\n\nAcceptance criteria:\n1. Given I am on the login page, when I click "Forgot password" and enter a registered email, then I receive a reset link within 2 minutes.\n2. Given the link is older than 30 minutes, when I open it, then I see "Link expired".\n3. Given I enter an unregistered email, then I see the same neutral message (no account information is revealed).'
    },

    h('Intermediate questions'),
    ...qa(
      'What is the difference between Definition of Done and acceptance criteria?',
      'Acceptance criteria are specific to one user story and describe what that feature must do. The Definition of Done (DoD) is a common checklist for every story, such as code reviewed, unit tests passing, tested by QA, no open critical bugs and documentation updated. A story is done only when it meets both.'
    ),
    ...qa(
      'What is the role of a tester in an Agile team?',
      'The tester works with the team from the start: joins refinement to ask questions and add edge cases, writes test scenarios before coding, tests stories as soon as they are ready inside the sprint, automates regression tests and gives quick feedback. The tester is a quality coach for the whole team, not a gate at the end.'
    ),
    ...qa(
      'What is shift-left testing?',
      'Shift-left means moving testing activities earlier in the life cycle. Examples are reviewing requirements for unclear points, writing tests before or while coding, running unit and API tests in the CI pipeline, and pairing with developers. Bugs found early are much cheaper to fix.'
    ),
    ...qa(
      'What are story points and velocity?',
      'Story points are a relative estimate of effort, complexity and risk for a story, often using Fibonacci numbers (1, 2, 3, 5, 8, 13). Velocity is the number of story points a team completes in a sprint, averaged over several sprints to plan future work. Testing effort must be included in the estimate, not added later.'
    ),
    ...qa(
      'What is the difference between Scrum and Kanban?',
      'Scrum works in fixed-length sprints with defined roles and events. Kanban has no sprints; work flows continuously across a board, and the team limits work in progress (WIP) for each column. Kanban suits support and maintenance teams where work arrives unpredictably.'
    ),
    ...qa(
      'What are burndown charts?',
      'A sprint burndown chart shows the remaining work (story points or hours) against the days of the sprint. Ideally the line goes down steadily to zero. A flat line means work is stuck, which may point to blockers or stories that are too large.'
    ),

    h('Advanced questions'),
    ...qa(
      'The product owner adds a new story in the middle of the sprint. What do you do?',
      'In Scrum the sprint goal should stay stable, so the team first talks with the Product Owner and Scrum Master. If the new story is truly urgent, something of similar size is removed from the sprint, and I clearly explain the extra testing effort and risk. If it is not urgent, it goes to the backlog for the next sprint.'
    ),
    ...qa(
      'A story is developed on the last day of the sprint and there is no time to test. What do you do?',
      'I do not mark it done without testing, because that breaks the Definition of Done. I raise it in the Daily Scrum, test the highest-risk parts if possible, and the unfinished story goes back to the backlog. In the retrospective I suggest fixes, such as smaller stories, testing in parallel with development and developer help with testing.'
    ),
    ...qa(
      'How do you handle regression testing in short sprints?',
      'Manual full regression every sprint is not possible, so I automate stable, high-value regression tests at the API and UI levels and run them in CI on every build. Before release I run a risk-based manual check on changed areas. The test automation pyramid (many unit tests, fewer API tests, fewest UI tests) keeps the suite fast.'
    ),
    ...qa(
      'What is BDD and how does it help Agile teams?',
      'Behaviour Driven Development describes behaviour in plain Given / When / Then scenarios written together by the business, developers and testers (the "three amigos"). Tools like Cucumber turn those scenarios into automated tests. It creates a shared understanding and living documentation.'
    ),
    {
      type: 'code',
      language: 'gherkin',
      value: `Feature: Login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters "asha@example.com" and "Secret@123"
    And clicks the Login button
    Then the dashboard page is displayed`
    },
    ...qa(
      'What metrics would you share with an Agile team about quality?',
      'Useful metrics are escaped defects (bugs found in production), defects found per sprint by severity, automation pass rate and flaky test count, test coverage of acceptance criteria, and time to fix critical bugs. I share trends, not blame, and use them in retrospectives to improve.'
    )
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'For situation questions, show collaboration: "I would raise it in the Daily Scrum and discuss with the Product Owner." Agile interviewers look for teamwork, not a tester working alone.'
  },
  mistakes: [
    'Saying the tester only starts work after development is complete.',
    'Calling the Scrum Master the project manager or team boss.',
    'Confusing Definition of Done with acceptance criteria.',
    'Agreeing to mark untested stories as done to "meet the sprint".',
    'Listing ceremonies without explaining what the tester contributes in each.'
  ],
  takeaways: [
    'Scrum has Product Owner, Scrum Master and Developers; testers are part of Developers.',
    'Know the events: Sprint Planning, Daily Scrum, Sprint Review, Retrospective.',
    'Acceptance criteria are per story; Definition of Done applies to every story.',
    'Shift-left: join refinement early and test as soon as possible.',
    'Automate regression and use risk-based testing to fit short sprints.'
  ]
};

/* ------------------------------------------------------------------ */
/* Automation framework                                                */
/* ------------------------------------------------------------------ */

const framework: Lesson = {
  id: 'interview-framework',
  title: 'Automation Framework Questions',
  objectives: [
    'Explain your automation framework structure clearly in two minutes.',
    'Describe Page Object Model, data-driven testing, reporting and CI integration with code.',
    'Answer design questions on parallel runs, flaky tests and maintenance.'
  ],
  theory:
    'Framework questions check whether you can design and explain a maintainable test automation project: structure, Page Object Model, test data, configuration, reporting, parallel execution and CI/CD.',
  blocks: [
    {
      type: 'text',
      value:
        'The most common automation interview question is "Explain your framework." Interviewers want a clear picture of the layers, the tools and why you chose them. Prepare a two-minute answer and be ready for deeper follow-up questions on each layer.'
    },
    {
      type: 'steps',
      title: 'A simple way to explain your framework',
      steps: [
        { label: 'Type and tools', text: 'Hybrid framework with Java, Selenium 4, TestNG, Maven, Rest Assured.' },
        { label: 'Design pattern', text: 'Page Object Model with a BasePage for common actions.' },
        { label: 'Test data and config', text: 'Excel or JSON through DataProvider; URLs and browser in config.properties.' },
        { label: 'Utilities', text: 'Wait helpers, screenshot on failure, logger (Log4j2).' },
        { label: 'Reporting', text: 'Extent Reports or Allure with screenshots attached.' },
        { label: 'Execution', text: 'testng.xml suites, parallel runs, Selenium Grid, Jenkins or GitHub Actions on every commit.' }
      ]
    },

    h('Beginner questions'),
    ...qa(
      'What is a test automation framework?',
      'A framework is a set of rules, structure and reusable code that makes automated tests easy to write, run and maintain. It separates test logic, page locators, test data and configuration, and it provides common services like reporting, logging and screenshots.'
    ),
    ...qa(
      'What types of frameworks are there?',
      'Common types are linear (record and playback), modular, data-driven (same test with many data sets), keyword-driven (actions described by keywords in a sheet), BDD (Cucumber with Gherkin), and hybrid, which combines several of these. Most real projects use a hybrid framework with POM and data-driven tests.'
    ),
    ...qa(
      'What is the Page Object Model (POM)?',
      'POM is a design pattern where each page (or major component) of the application has its own class holding its locators and the actions a user can do on it. Tests call these methods instead of using locators directly. If the UI changes, you update one page class instead of many tests.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By username = By.id("username");
    private final By password = By.id("password");
    private final By loginBtn = By.cssSelector("button[type='submit']");
    private final By error    = By.cssSelector(".error-message");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public DashboardPage loginAs(String user, String pass) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(username)).sendKeys(user);
        driver.findElement(password).sendKeys(pass);
        driver.findElement(loginBtn).click();
        return new DashboardPage(driver);
    }

    public String getErrorText() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(error)).getText();
    }
}

// Test class
public class LoginTest extends BaseTest {
    @Test
    public void validLoginShowsDashboard() {
        DashboardPage dashboard = new LoginPage(driver).loginAs("asha", "Secret@123");
        Assert.assertTrue(dashboard.isLoaded(), "Dashboard should be displayed");
    }
}`
    },
    ...qa(
      'What is the difference between POM and Page Factory?',
      'POM is the design pattern. Page Factory is a Selenium helper that implements it with @FindBy annotations and PageFactory.initElements(), creating lazy proxies for elements. Many teams now prefer plain By locators in POM because they are simpler, work well with explicit waits and reduce stale element issues.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public class LoginPage {
    @FindBy(id = "username")
    private WebElement username;

    public LoginPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}`
    },
    ...qa(
      'Why do we use Maven in a framework?',
      'Maven manages dependencies (Selenium, TestNG, Rest Assured) through pom.xml, gives a standard folder structure, and runs tests from the command line with mvn test using the Surefire plugin. That makes the framework easy to run in CI without an IDE.'
    ),

    h('Intermediate questions'),
    ...qa(
      'How do you implement data-driven testing in TestNG?',
      'Use a @DataProvider method that returns Object[][] (data can come from Excel, CSV or JSON), and link it to the test with dataProvider. TestNG then runs the same test once for each row.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `@DataProvider(name = "loginData")
public Object[][] loginData() {
    return new Object[][] {
        {"asha",  "Secret@123", true},
        {"asha",  "wrongpass",  false},
        {"",      "Secret@123", false}
    };
}

@Test(dataProvider = "loginData")
public void loginTest(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(driver);
    login.loginAs(user, pass);
    Assert.assertEquals(driver.getCurrentUrl().contains("/dashboard"), shouldPass);
}`
    },
    ...qa(
      'How do you manage configuration such as URL, browser and credentials?',
      'Non-secret settings like base URL, browser and timeouts go in a config.properties or YAML file per environment, read by a ConfigReader class, and can be overridden from the command line (mvn test -Dbrowser=firefox). Secrets like passwords are never committed; they come from environment variables or the CI secret store.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public final class ConfigReader {
    private static final Properties props = new Properties();

    static {
        try (InputStream in = ConfigReader.class
                .getResourceAsStream("/config.properties")) {
            props.load(in);
        } catch (IOException e) {
            throw new RuntimeException("Cannot load config.properties", e);
        }
    }

    public static String get(String key) {
        // System property (-Dkey=value) wins over the file
        return System.getProperty(key, props.getProperty(key));
    }
}`
    },
    ...qa(
      'How do you take a screenshot automatically when a test fails?',
      'Implement a TestNG ITestListener and override onTestFailure, or check ITestResult in @AfterMethod. Capture the screenshot and attach it to the report. Register the listener in testng.xml or with @Listeners.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public class FailureListener implements ITestListener {
    @Override
    public void onTestFailure(ITestResult result) {
        Object testClass = result.getInstance();
        WebDriver driver = ((BaseTest) testClass).getDriver();
        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        try {
            Files.copy(src.toPath(),
                    Paths.get("screenshots", result.getName() + ".png"),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`
    },
    ...qa(
      'How do you run tests in parallel safely?',
      'Set parallel="methods" or "classes" and a thread-count in testng.xml. Each thread must have its own WebDriver, so store the driver in a ThreadLocal instead of a static field. Tests must also be independent and use their own test data.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public class DriverManager {
    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();

    public static void initDriver(String browser) {
        WebDriver driver = browser.equalsIgnoreCase("firefox")
                ? new FirefoxDriver()
                : new ChromeDriver();
        driver.manage().window().maximize();
        DRIVER.set(driver);
    }

    public static WebDriver getDriver() {
        return DRIVER.get();
    }

    public static void quitDriver() {
        if (DRIVER.get() != null) {
            DRIVER.get().quit();
            DRIVER.remove();
        }
    }
}`
    },
    {
      type: 'code',
      language: 'xml',
      value: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Regression" parallel="methods" thread-count="4">
  <listeners>
    <listener class-name="listeners.FailureListener"/>
  </listeners>
  <test name="UI tests">
    <parameter name="browser" value="chrome"/>
    <classes>
      <class name="tests.LoginTest"/>
      <class name="tests.CartTest"/>
    </classes>
  </test>
</suite>`
    },
    ...qa(
      'Which TestNG annotations do you use and in what order do they run?',
      'The order is @BeforeSuite, @BeforeTest, @BeforeClass, @BeforeMethod, @Test, @AfterMethod, @AfterClass, @AfterTest, @AfterSuite. I usually start the driver in @BeforeMethod and quit it in @AfterMethod so every test is independent. I also use groups, priority, dependsOnMethods (carefully) and retryAnalyzer.'
    ),

    h('Advanced questions'),
    ...qa(
      'How do you integrate your framework with CI/CD?',
      'The code lives in Git. A Jenkins job or GitHub Actions workflow is triggered on a pull request, a merge or a schedule; it checks out the code, runs mvn test with the chosen suite and environment, runs headless browsers or uses Selenium Grid, and publishes the report. The build is marked failed if tests fail, and the team is notified on Slack or email.'
    ),
    {
      type: 'code',
      language: 'yaml',
      value: `name: ui-regression
on:
  pull_request:
  schedule:
    - cron: "0 2 * * *"
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: "17"
      - run: mvn -B test -Dbrowser=chrome -Dheadless=true -DsuiteXmlFile=testng.xml
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-report
          path: target/surefire-reports`
    },
    ...qa(
      'How do you handle flaky tests?',
      'First I find the root cause instead of simply re-running: usually missing explicit waits, shared test data, test order dependency or an unstable environment. I fix the wait or data problem, make tests independent, and quarantine a test that still fails randomly until it is fixed. A retry analyzer can help temporarily, but it should not hide real bugs.'
    ),
    {
      type: 'code',
      language: 'java',
      value: `public class RetryAnalyzer implements IRetryAnalyzer {
    private int count = 0;
    private static final int MAX_RETRY = 1;

    @Override
    public boolean retry(ITestResult result) {
        return count++ < MAX_RETRY;
    }
}

@Test(retryAnalyzer = RetryAnalyzer.class)
public void checkoutTest() { /* ... */ }`
    },
    ...qa(
      'How do you reduce maintenance effort in a large framework?',
      'Keep locators only in page classes, prefer stable attributes (ids or data-testid), put common actions in a BasePage, avoid hard-coded data and waits, and push checks down to the API level when the UI is not needed. Regular code reviews and deleting outdated tests also keep the suite healthy.'
    ),
    ...qa(
      'Which tests should you automate and which should stay manual?',
      'Automate stable, repetitive, high-value tests such as smoke and regression, data-driven checks and API tests. Keep manual the exploratory, usability, one-time and visually subjective tests, and features that are still changing a lot. Following the test pyramid, most automated checks should be unit and API tests, with a smaller set of UI tests.'
    ),
    ...qa(
      'What does your framework folder structure look like?',
      'A clear structure separates main code (pages, utilities, config) from tests (test classes, data, suites). Interviewers like hearing that tests never contain locators and that utilities are reusable.'
    ),
    {
      type: 'code',
      language: 'text',
      value: `automation-framework/
  pom.xml
  testng.xml
  src/main/java/
    base/        BasePage.java
    pages/       LoginPage.java, CartPage.java
    driver/      DriverManager.java
    utils/       ConfigReader.java, WaitUtils.java, ExcelReader.java
    listeners/   FailureListener.java, RetryAnalyzer.java
  src/test/java/
    base/        BaseTest.java
    tests/       LoginTest.java, CartTest.java
    api/         UserApiTest.java
  src/test/resources/
    config.properties
    testdata/    users.json
  reports/`
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Explain only what you really built or understand. Interviewers ask follow-ups on every layer you mention, so an honest simple framework is better than a big list of tools you cannot defend.'
  },
  mistakes: [
    'Listing tools without explaining how the layers connect.',
    'Using a static WebDriver and then claiming the framework runs in parallel.',
    'Storing passwords in config files committed to Git.',
    'Fixing flaky tests only by adding Thread.sleep() or unlimited retries.',
    'Saying "we automate 100% of test cases".'
  ],
  takeaways: [
    'Prepare a two-minute framework explanation: tools, pattern, data, config, reports, CI.',
    'POM keeps locators and actions in page classes; tests stay readable.',
    'Use DataProvider for data-driven tests and ThreadLocal driver for parallel runs.',
    'Screenshots on failure come from listeners; reports from Extent or Allure.',
    'Treat flaky tests by finding root causes, and automate by value and stability.'
  ]
};

/* ------------------------------------------------------------------ */
/* HR                                                                  */
/* ------------------------------------------------------------------ */

const hr: Lesson = {
  id: 'interview-hr',
  title: 'HR Interview Questions',
  objectives: [
    'Use the STAR method to give clear, structured behavioural answers.',
    'Prepare honest answers to the 10 most common HR questions for QA roles.',
    'Avoid answers that create doubt about attitude, teamwork or commitment.'
  ],
  theory:
    'HR and behavioural interviews check your communication, attitude and teamwork. Use the STAR method (Situation, Task, Action, Result) to tell short, real stories that show how you work.',
  blocks: [
    {
      type: 'text',
      value:
        'Many candidates prepare only technical topics and then lose the offer in the HR round. HR interviewers want to know: Can you communicate clearly? Will you work well with the team? Do you really want this job? You do not need perfect English. You need clear, honest and structured answers.'
    },

    h('The STAR method'),
    {
      type: 'syntax',
      title: 'STAR answer structure',
      parts: [
        { clause: 'S - Situation', text: 'Set the scene in one or two sentences: project, team, when.' },
        { clause: 'T - Task', text: 'What was your responsibility or the problem you had to solve?' },
        { clause: 'A - Action', text: 'What did YOU do, step by step? This is the longest part. Say "I", not only "we".' },
        { clause: 'R - Result', text: 'What happened in the end? Use numbers if possible, and what you learned.' }
      ]
    },
    {
      type: 'alert',
      value:
        'Keep a STAR answer to about 1.5 to 2 minutes. If you are a fresher, use stories from your internship, college project, training course or a team assignment. That is completely acceptable.'
    },
    {
      type: 'example',
      title: 'Worked STAR answer 1: "Tell me about a time you found a critical bug close to release."',
      value:
        'Situation: During my internship, our team was releasing a food ordering web app on a Friday. On Thursday evening I was doing a final regression round on the checkout flow.\n\nTask: I had to confirm that payment and order confirmation worked before we signed off the release.\n\nAction: I noticed that when a coupon was applied and the user then changed the cart quantity, the total amount was not recalculated, so users could pay less than the real price. I reproduced it three times, noted the exact steps and test data, recorded a short video and checked the orders table with SQL to confirm the wrong amount was saved. I logged it as high severity, high priority, and immediately informed my lead and the developer in our team chat instead of waiting for the next stand-up. After the fix, I retested the scenario and ran a quick regression on coupons and cart.\n\nResult: The bug was fixed the same night and the release went out on time without revenue loss. My lead added my scenario to the regression suite, and I learned to always test combinations of features, not only each feature alone.'
    },
    {
      type: 'example',
      title: 'Worked STAR answer 2: "Tell me about a disagreement with a developer."',
      value:
        'Situation: In my college capstone project, I was the tester in a team of five building a library management system.\n\nTask: I reported that users could borrow more than the allowed limit of three books, but the developer closed the bug as "working as designed".\n\nAction: I did not argue in the group chat. I first re-read the requirement document to be sure, and it clearly said "maximum three books". I then met the developer, showed the requirement line, the steps and a screenshot, and asked if he had understood the rule differently. He explained he thought the limit was only for new members. We took the question to our project mentor, who acted as product owner, and she confirmed the limit applies to everyone.\n\nResult: The developer fixed the logic in one day, and we agreed to add clear acceptance criteria to every feature before coding. Our project scored well in the final review, and I learned that facts and calm conversation solve disagreements faster than arguments.'
    },

    h('10 common HR questions with guidance'),
    ...qa(
      'Tell me about yourself.',
      'Give a 60 to 90 second summary in this order: present (your education or current role and QA skills), past (training, internship or projects with one achievement), future (why you want this role). Do not repeat your full resume or share personal family details. Example start: "I am a computer science graduate trained in manual and automation testing with Selenium, Postman and SQL..."'
    ),
    ...qa(
      'Why did you choose software testing as a career?',
      'Show real interest, not "I could not get a development job". Talk about enjoying finding problems, thinking like a user, and caring about quality, and mention something concrete, like a bug you found in a project that made you enjoy testing. Add that you want to grow in automation or a specific area.'
    ),
    ...qa(
      'What are your strengths?',
      'Pick two or three strengths that matter for QA, such as attention to detail, curiosity and clear communication, and prove each with a quick example. "I am detail oriented; in my project I found a rounding bug in invoice totals that others missed" is better than a list of adjectives.'
    ),
    ...qa(
      'What is your weakness?',
      'Choose a real but non-critical weakness and show what you are doing to improve. For example: "I used to hesitate to ask questions in meetings, so now I write my questions before refinement sessions and ask them early." Avoid fake answers like "I work too hard" and avoid weaknesses that are core to the job, like "I miss details".'
    ),
    ...qa(
      'Why do you want to join our company?',
      'Research the company before the interview: its product, customers, tech stack and values. Connect them to your goals: "You build fintech products used by millions, and I want to test systems where quality really matters. I also saw that your team uses Selenium and API automation, which matches my training."'
    ),
    ...qa(
      'Where do you see yourself in five years?',
      'Show ambition that fits the company. For example, growing from a QA engineer to a senior automation engineer or QA lead who designs frameworks and mentors juniors. Avoid saying you plan to move to development or start your own business soon.'
    ),
    ...qa(
      'How do you handle pressure and tight deadlines?',
      'Answer with a short STAR story. Explain that you prioritise by risk, communicate early about what can and cannot be tested in time, and focus on critical flows first. Show that you stay calm and transparent rather than skipping testing silently.'
    ),
    ...qa(
      'Why should we hire you?',
      'Summarise your fit in three points: relevant skills (for example manual testing, Selenium, API and SQL), proof (projects or internship results), and attitude (quick learner, team player). End with enthusiasm for the role. Do not compare yourself with other candidates.'
    ),
    ...qa(
      'Why are you leaving your current job? / Why is there a gap in your resume?',
      'Stay positive and brief. Focus on what you are moving towards (growth, automation work, a better-matching domain), not on complaints about your manager or company. For a gap, say honestly what you did, such as upskilling in testing, preparing for exams or family responsibility, and show you are ready now.'
    ),
    ...qa(
      'What are your salary expectations? / Do you have any questions for us?',
      'For salary, research the market range for your role and city and give a range, or say you are open and would like to know the company range first. At the end, always ask one or two questions, such as "What does a typical sprint look like for the QA team?" or "What would success look like in the first three months?" Saying "No questions" can sound like low interest.'
    ),
    {
      type: 'warning',
      value:
        'Never lie about experience, tools or notice period. HR and technical teams compare notes, and background checks can confirm details. An honest "I have basic knowledge and I am learning it" is always safer.'
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Write down five STAR stories before the interview: a bug you found, a disagreement, a deadline, a mistake you made, and something you learned fast. Most behavioural questions can be answered with one of them.'
  },
  mistakes: [
    'Reciting the full resume for "Tell me about yourself".',
    'Speaking negatively about a former manager, company or teammates.',
    'Telling stories with only "we" so the interviewer cannot see what you did.',
    'Giving a fake weakness or a weakness that is essential for QA work.',
    'Having no questions to ask at the end of the interview.'
  ],
  takeaways: [
    'Use STAR: Situation, Task, Action, Result, with most time on Action.',
    'Prepare five real stories you can adapt to many questions.',
    'Research the company and connect it to your goals.',
    'Stay positive, honest and brief; simple English is fine.',
    'Always end with one or two thoughtful questions.'
  ]
};

/* ------------------------------------------------------------------ */
/* Resume                                                              */
/* ------------------------------------------------------------------ */

const resume: Lesson = {
  id: 'interview-resume',
  title: 'Resume Building',
  objectives: [
    'Build a clear one-page QA resume that passes ATS screening.',
    'Write strong, measurable bullet points using action verbs.',
    'Present projects, skills and GitHub links in the way recruiters expect.'
  ],
  theory:
    'A QA resume should be one clean page with a short summary, grouped technical skills, projects with measurable results and links to your GitHub work. Simple formatting helps it pass ATS software.',
  blocks: [
    {
      type: 'text',
      value:
        'A recruiter often spends less than 30 seconds on a resume, and many companies first filter resumes with an Applicant Tracking System (ATS). Your resume must be easy for both software and humans to read. For freshers, projects and skills matter more than job history.'
    },

    h('Recommended section order for a fresher'),
    {
      type: 'steps',
      steps: [
        { label: 'Header', text: 'Name, city, phone, professional email, LinkedIn and GitHub links.' },
        { label: 'Professional summary', text: '2 to 3 lines: who you are, key skills, what role you want.' },
        { label: 'Technical skills', text: 'Grouped by category: testing, automation, API, database, tools, languages.' },
        { label: 'Projects', text: '2 to 3 projects with tools used, what you did and results with numbers.' },
        { label: 'Experience / internship', text: 'If any, with the same action and result bullet style.' },
        { label: 'Education and certifications', text: 'Degree, year, ISTQB Foundation or relevant course certificates.' }
      ]
    },

    h('Sample fresher QA resume'),
    {
      type: 'example',
      title: 'Sample resume: Fresher QA Engineer',
      value:
        'PRIYA SHARMA\nPune, India | +91 98765 43210 | priya.sharma.qa@gmail.com\nlinkedin.com/in/priyasharma-qa | github.com/priyasharma-qa\n\nPROFESSIONAL SUMMARY\nDetail-oriented QA Engineer (fresher) trained in manual and automation testing. Hands-on with Selenium WebDriver (Java), TestNG, Postman and SQL through three end-to-end projects. Looking for a Software Test Engineer role in an Agile team.\n\nTECHNICAL SKILLS\nTesting: Manual testing, functional and regression testing, test case design (BVA, EP), bug life cycle, STLC, Agile/Scrum\nAutomation: Selenium WebDriver 4, TestNG, Page Object Model, Maven, Cucumber (basic)\nAPI testing: Postman, Newman, REST concepts, Rest Assured (basic)\nDatabase: SQL (joins, GROUP BY, subqueries), MySQL\nTools: Jira, Git/GitHub, Jenkins, Extent Reports\nLanguages: Java (core), JavaScript (basic)\n\nPROJECTS\nE-commerce Web App Test Automation | Java, Selenium 4, TestNG, Maven, Jenkins\n- Designed a Page Object Model framework covering 45 regression test cases for login, search, cart and checkout.\n- Added data-driven tests with TestNG DataProvider and screenshots on failure with Extent Reports.\n- Reduced regression execution time from 3 hours (manual) to 25 minutes by running tests in parallel through Jenkins.\n\nREST API Testing - Booking Service | Postman, Newman, JavaScript\n- Wrote 60+ Postman tests for status codes, JSON schema, authentication and negative inputs.\n- Chained requests with environment variables and ran the collection nightly in Jenkins with Newman HTML reports.\n- Found and reported 7 defects, including a 500 error on invalid date formats.\n\nManual Testing - Hospital Appointment Portal | Jira, SQL\n- Wrote 120 test cases from 15 user stories and maintained a requirement traceability matrix.\n- Logged 32 defects in Jira with clear steps and evidence; 5 were critical.\n- Verified appointment data in MySQL using joins to confirm UI and database consistency.\n\nINTERNSHIP\nQA Intern | ABC Softech, Pune | Jan 2026 - Jun 2026\n- Executed smoke and regression suites for 4 sprint releases of a web-based HR application.\n- Automated 20 repetitive smoke tests in Selenium, saving about 4 hours of manual effort per release.\n\nEDUCATION\nB.E. Computer Engineering | Savitribai Phule Pune University | 2026 | CGPA 7.8\n\nCERTIFICATIONS\nISTQB Certified Tester Foundation Level (CTFL) | Software Testing Mastery Course'
    },
    {
      type: 'alert',
      value:
        'The numbers in the sample are examples. Use only numbers that are true for your own projects. It is fine to count test cases, defects, scenarios or time saved in a college or course project.'
    },

    h('Before and after: bullet points'),
    {
      type: 'compare',
      columns: [
        {
          title: 'Before',
          subtitle: 'Weak, vague bullets',
          tone: 'rose',
          items: [
            'Responsible for testing.',
            'Worked on Selenium.',
            'Did API testing using Postman.',
            'Found bugs and reported them.',
            'Knowledge of SQL.'
          ]
        },
        {
          title: 'After',
          subtitle: 'Action + tool + result',
          tone: 'olive',
          items: [
            'Designed and executed 120 functional test cases for a hospital portal from 15 user stories.',
            'Automated 45 regression tests with Selenium 4 and TestNG using Page Object Model.',
            'Wrote 60+ Postman tests for status, schema and auth; ran them nightly with Newman.',
            'Logged 32 defects in Jira with clear steps and evidence, including 5 critical issues.',
            'Validated UI data against MySQL using joins and GROUP BY queries.'
          ]
        }
      ]
    },
    {
      type: 'syntax',
      title: 'Formula for a strong bullet',
      parts: [
        { clause: 'Action verb', text: 'Designed, Automated, Executed, Reduced, Identified, Validated.' },
        { clause: 'What you did', text: 'The task, with a count or scope: "45 regression tests".' },
        { clause: 'Tool / technique', text: 'Selenium 4, Postman, SQL, POM, BVA.' },
        { clause: 'Result', text: 'Time saved, bugs found, coverage improved.' }
      ]
    },

    h('ATS tips'),
    {
      type: 'list',
      items: [
        'Use a simple one-column layout. Avoid tables, text boxes, images, icons and skill "rating bars" because many ATS tools cannot read them.',
        'Use standard section headings: Summary, Skills, Projects, Experience, Education, Certifications.',
        'Copy exact keywords from the job description when they are true for you, for example "Selenium WebDriver", "API testing", "SQL", "Jira", "Agile".',
        'Write both short and full forms once: "Page Object Model (POM)", "Continuous Integration (CI)".',
        'Save as PDF unless the company asks for .docx, and name the file clearly: Priya_Sharma_QA_Engineer.pdf.',
        'Use common fonts (Calibri, Arial) in size 10 to 12, and keep it to one page for freshers.',
        'Put GitHub links to real, clean repositories with a README that explains how to run the tests.'
      ]
    },
    {
      type: 'table',
      headers: ['Include', 'Avoid'],
      rows: [
        ['Professional email and working phone number', 'Photo, date of birth, religion, marital status (unless required locally)'],
        ['Grouped technical skills you can explain', 'Every tool you have heard of once'],
        ['Projects with numbers and results', '"Responsible for..." duties without outcomes'],
        ['GitHub and LinkedIn links', 'Broken links or empty repositories'],
        ['One page, clean spacing', 'Long paragraphs, spelling mistakes, multiple fonts and colours']
      ]
    },
    {
      type: 'warning',
      value:
        'A tester resume with spelling mistakes sends a very bad signal, because attention to detail is the core skill of testing. Read it aloud, use a spell checker and ask a friend to review it.'
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Everything on your resume is a possible interview question. If you write "Jenkins", be ready to explain how you ran your tests in Jenkins. Remove anything you cannot talk about for two minutes.'
  },
  mistakes: [
    'Listing tools you cannot explain or demonstrate in the interview.',
    'Using fancy templates with columns, graphics and skill bars that ATS cannot read.',
    'Writing duties ("responsible for testing") instead of actions and results.',
    'Sending the same resume to every job without matching keywords.',
    'Leaving spelling mistakes, broken GitHub links or an unprofessional email address.'
  ],
  takeaways: [
    'Keep a fresher resume to one clean, single-column page.',
    'Lead with summary, grouped skills and strong projects.',
    'Write bullets as action verb + task + tool + measurable result.',
    'Match true keywords from each job description for ATS.',
    'Link real GitHub projects and be ready to discuss every line.'
  ]
};

/* ------------------------------------------------------------------ */
/* Mock interviews                                                     */
/* ------------------------------------------------------------------ */

const mock: Lesson = {
  id: 'interview-mock',
  title: 'Mock Interviews',
  objectives: [
    'Run a realistic mock interview with a friend, mentor or by yourself.',
    'Score your answers with a clear rubric and turn feedback into action.',
    'Follow a practice schedule that builds confidence before real interviews.'
  ],
  theory:
    'Mock interviews let you practise answering under real conditions, find weak topics and reduce nervousness. Practise with a timer, record yourself, score with a rubric and repeat on a schedule.',
  blocks: [
    {
      type: 'text',
      value:
        'Knowing an answer and saying it clearly under pressure are two different skills. A mock interview is a practice interview that feels like the real one. Even three or four mock sessions can make a big difference in how calm and clear you sound, especially if English is not your first language.'
    },

    h('How to run a mock interview'),
    {
      type: 'steps',
      title: 'A 60-minute mock interview session',
      steps: [
        { label: '1. Prepare (10 min before)', text: 'Choose the target role and pick a job description. The interviewer selects 8 to 10 questions across manual, automation, API, SQL and HR topics without showing them to you.' },
        { label: '2. Set up like a real interview', text: 'Use a video call, camera on, quiet room, formal clothes, resume open. Start recording (with permission) so you can review later.' },
        { label: '3. Introduction (5 min)', text: 'Answer "Tell me about yourself" and one or two resume follow-ups.' },
        { label: '4. Technical questions (25 min)', text: 'Theory questions plus follow-ups like "Why?" and "Give an example". The interviewer interrupts sometimes, like real interviewers do.' },
        { label: '5. Live coding or practical task (15 min)', text: 'One Java coding task, one SQL query, or write test cases for a login page while sharing your screen and thinking aloud.' },
        { label: '6. HR and your questions (5 min)', text: 'One STAR question and one question you ask the interviewer.' },
        { label: '7. Feedback (10 min after)', text: 'The interviewer scores with the rubric, gives two strengths and three improvements. You write an action list for the next session.' }
      ]
    },
    {
      type: 'alert',
      value:
        'No partner? Do a solo mock: pick random questions from this module, set a 2-minute timer for each, record your answer on your phone and watch it back. You will notice filler words, long pauses and unclear points quickly.'
    },

    h('Scoring rubric'),
    {
      type: 'table',
      headers: ['Area', '1 - Needs work', '3 - Good', '5 - Excellent'],
      rows: [
        ['Technical accuracy', 'Wrong or confused concepts', 'Mostly correct with small gaps', 'Correct, precise and complete'],
        ['Examples', 'No examples', 'Generic example', 'Real, specific example from a project'],
        ['Structure and clarity', 'Long, jumps between points', 'Understandable but could be shorter', 'Clear: definition, example, conclusion'],
        ['Coding / problem solving', 'Cannot start or no explanation', 'Working solution with hints', 'Clean solution, explains logic and edge cases'],
        ['Communication', 'Very quiet, many fillers, no eye contact', 'Clear with some hesitation', 'Calm, confident, good pace, listens well'],
        ['Honesty and attitude', 'Guesses or bluffs', 'Admits gaps but stops there', 'Admits gaps and explains how they would find out'],
        ['Behavioural answers (STAR)', 'No structure', 'Partial STAR', 'Full STAR with clear action and result']
      ]
    },
    {
      type: 'text',
      value:
        'Add up the scores (maximum 35). Below 18 means more study is needed on basics; 18 to 27 means you are close, so focus on examples and clarity; above 27 means you are ready for real interviews. Track your score after every session to see progress.'
    },

    h('4-week practice schedule'),
    {
      type: 'table',
      headers: ['Week', 'Focus', 'Daily practice (45-60 min)', 'Mock interview'],
      rows: [
        ['Week 1', 'Manual testing and HR', 'Answer 5 manual questions aloud; write 2 STAR stories; perfect "Tell me about yourself".', '1 solo recorded mock (30 min)'],
        ['Week 2', 'SQL and API', 'Write 3 SQL queries on paper; practise 5 API questions; build one Postman collection.', '1 peer mock (45 min)'],
        ['Week 3', 'Selenium, framework and coding', 'Type 2 Selenium snippets from memory; solve 2 coding tasks; explain your framework in 2 minutes.', '1 peer mock with live coding (60 min)'],
        ['Week 4', 'Full interviews and weak areas', 'Revise topics with lowest rubric scores; research target companies.', '2 full mocks with a mentor or senior tester']
      ]
    },
    {
      type: 'list',
      items: [
        'Keep a "question bank" notebook: every question you could not answer well goes in, with a better answer written after the session.',
        'Practise saying "I am not sure, but I would approach it like this..." instead of staying silent.',
        'Swap roles with a friend: being the interviewer teaches you what good answers sound like.',
        'Do the last mock at least two days before the real interview, not the night before.'
      ]
    },
    {
      type: 'warning',
      value:
        'Do not memorise answers word by word. Interviewers can tell, and one follow-up question will break a memorised answer. Remember key points and examples, then speak naturally.'
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Watch your own recordings. Most people discover the same three problems: speaking too fast, answering without an example, and not stopping when the answer is complete.'
  },
  mistakes: [
    'Practising only in your head instead of speaking answers aloud.',
    'Doing mocks with friends who are too kind to give honest feedback.',
    'Ignoring the live coding part until the real interview.',
    'Memorising scripts that break with the first follow-up question.',
    'Not writing down feedback and repeating the same mistakes next time.'
  ],
  takeaways: [
    'Mock interviews build the skill of answering clearly under pressure.',
    'Simulate real conditions: camera, timer, coding task and follow-up questions.',
    'Score each session with a rubric and track progress over time.',
    'Follow a weekly plan that covers every topic plus HR and coding.',
    'Turn every weak answer into a written better answer for next time.'
  ]
};

/* ------------------------------------------------------------------ */
/* Coding                                                              */
/* ------------------------------------------------------------------ */

const coding: Lesson = {
  id: 'interview-coding',
  title: 'Coding & Practical Assessments',
  objectives: [
    'Solve the most common QA coding tasks in Java with clean, correct code.',
    'Explain your logic and the time and space complexity of each solution.',
    'Handle edge cases like empty input, null values and negative numbers.'
  ],
  theory:
    'QA coding rounds use simple programs such as reversing a string, finding duplicates, checking prime numbers and FizzBuzz. Interviewers look for working logic, clear explanation and attention to edge cases.',
  blocks: [
    {
      type: 'text',
      value:
        'Automation testers write code every day, so most QA interviews include a short coding task. These are not hard algorithm puzzles. They test whether you can use loops, conditions, strings, arrays and collections in Java. Always explain your approach before typing, and test your code with a normal case and an edge case.'
    },
    {
      type: 'steps',
      title: 'How to approach any coding task in an interview',
      steps: [
        { label: 'Clarify', text: 'Ask about input type, case sensitivity, spaces, empty or null input.' },
        { label: 'Explain the idea', text: 'Say the approach in one or two sentences before coding.' },
        { label: 'Write clean code', text: 'Meaningful variable names, small method, no unnecessary tricks.' },
        { label: 'Dry run', text: 'Walk through a small example by hand.' },
        { label: 'Discuss complexity and edge cases', text: 'Time and space complexity, and one possible improvement.' }
      ]
    },

    h('1. Reverse a string'),
    {
      type: 'text',
      value:
        'Use two pointers from both ends of a character array and swap until they meet. Interviewers often ask you not to use StringBuilder.reverse(), so show the manual way first and mention the built-in method.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static String reverse(String input) {
    if (input == null) {
        return null;
    }
    char[] chars = input.toCharArray();
    int left = 0;
    int right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    return new String(chars);
}

// reverse("selenium") -> "muineles"
// Built-in: new StringBuilder(input).reverse().toString();`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(n) for the character array (Java strings are immutable).' },

    h('2. Check if a string is a palindrome'),
    {
      type: 'text',
      value:
        'A palindrome reads the same forwards and backwards, like "madam" or "level". Compare characters from both ends moving inward; if any pair is different, it is not a palindrome. Here we ignore case and non-letter characters, which is a good point to clarify with the interviewer.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static boolean isPalindrome(String input) {
    if (input == null) {
        return false;
    }
    String clean = input.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
    int left = 0;
    int right = clean.length() - 1;
    while (left < right) {
        if (clean.charAt(left) != clean.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// isPalindrome("Madam")                          -> true
// isPalindrome("A man, a plan, a canal: Panama") -> true
// isPalindrome("testing")                        -> false`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(n) for the cleaned string.' },

    h('3. Find duplicate elements in an array'),
    {
      type: 'text',
      value:
        'Walk through the array and try to add each value to a HashSet. add() returns false when the value is already there, which means it is a duplicate. A second set stores each duplicate once. The nested-loop approach also works but is O(n squared).'
    },
    {
      type: 'code',
      language: 'java',
      value: `import java.util.LinkedHashSet;
import java.util.HashSet;
import java.util.Set;

public static Set<Integer> findDuplicates(int[] numbers) {
    Set<Integer> seen = new HashSet<>();
    Set<Integer> duplicates = new LinkedHashSet<>(); // keeps first-found order
    for (int n : numbers) {
        if (!seen.add(n)) {
            duplicates.add(n);
        }
    }
    return duplicates;
}

// findDuplicates(new int[]{4, 2, 7, 2, 9, 4, 4}) -> [2, 4]`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(n).' },

    h('4. Count the occurrence of each character'),
    {
      type: 'text',
      value:
        'Use a LinkedHashMap where the key is the character and the value is its count. getOrDefault returns 0 the first time a character appears. LinkedHashMap keeps the order in which characters first appear, which makes the output easy to read.'
    },
    {
      type: 'code',
      language: 'java',
      value: `import java.util.LinkedHashMap;
import java.util.Map;

public static Map<Character, Integer> countCharacters(String input) {
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char c : input.toCharArray()) {
        if (c == ' ') {
            continue; // skip spaces
        }
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    return counts;
}

// countCharacters("test data") -> {t=3, e=1, s=1, d=1, a=2}`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(k) where k is the number of different characters.' },

    h('5. Find the largest (and second largest) number in an array'),
    {
      type: 'text',
      value:
        'Keep the largest value seen so far and update it in one pass. Start from the first element, not from 0, so the code also works when all numbers are negative. The follow-up "second largest" keeps two variables and skips values equal to the largest.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static int findLargest(int[] numbers) {
    if (numbers == null || numbers.length == 0) {
        throw new IllegalArgumentException("Array must not be empty");
    }
    int largest = numbers[0];
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}

public static Integer findSecondLargest(int[] numbers) {
    Integer first = null;
    Integer second = null;
    for (int n : numbers) {
        if (first == null || n > first) {
            second = first;
            first = n;
        } else if (n != first && (second == null || n > second)) {
            second = n;
        }
    }
    return second; // null if there is no distinct second largest
}

// findLargest(new int[]{-8, -3, -12})        -> -3
// findSecondLargest(new int[]{10, 40, 40, 25}) -> 25`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(1).' },

    h('6. FizzBuzz'),
    {
      type: 'text',
      value:
        'Print numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz". Check 15 (both) first, otherwise the Fizz branch would catch it.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static void fizzBuzz(int n) {
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) {
            System.out.println("FizzBuzz");
        } else if (i % 3 == 0) {
            System.out.println("Fizz");
        } else if (i % 5 == 0) {
            System.out.println("Buzz");
        } else {
            System.out.println(i);
        }
    }
}

// fizzBuzz(15) prints: 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(1).' },

    h('7. Check if a number is prime'),
    {
      type: 'text',
      value:
        'A prime number is greater than 1 and divisible only by 1 and itself. Numbers below 2 are not prime, 2 is prime, and other even numbers are not. For odd numbers you only need to check divisors up to the square root, because if n = a x b, one of a or b must be at most the square root of n.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }
    if (n == 2) {
        return true;
    }
    if (n % 2 == 0) {
        return false;
    }
    for (int i = 3; (long) i * i <= n; i += 2) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

// isPrime(1) -> false, isPrime(2) -> true, isPrime(29) -> true, isPrime(91) -> false (7 x 13)`
    },
    { type: 'text', value: 'Complexity: time O(square root of n), space O(1). The (long) cast prevents integer overflow for very large n.' },

    h('8. Swap two numbers without a temporary variable'),
    {
      type: 'text',
      value:
        'The arithmetic method uses addition and subtraction; the XOR method uses bitwise XOR, which cannot overflow. Mention that in real code a temporary variable is clearer, and that the arithmetic version can overflow with very large int values.'
    },
    {
      type: 'code',
      language: 'java',
      value: `int a = 10;
int b = 25;

// Arithmetic method
a = a + b;   // a = 35
b = a - b;   // b = 10
a = a - b;   // a = 25

// XOR method (no overflow risk)
int x = 7;
int y = 3;
x = x ^ y;
y = x ^ y;   // y = 7
x = x ^ y;   // x = 3

System.out.println("a=" + a + ", b=" + b + ", x=" + x + ", y=" + y);
// a=25, b=10, x=3, y=7`
    },
    { type: 'text', value: 'Complexity: time O(1), space O(1).' },

    h('9. Reverse the words in a sentence'),
    {
      type: 'text',
      value:
        'Split the sentence on one or more spaces, then join the words from last to first. trim() removes leading and trailing spaces so the split does not create empty words.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static String reverseWords(String sentence) {
    String[] words = sentence.trim().split("\\\\s+");
    StringBuilder result = new StringBuilder();
    for (int i = words.length - 1; i >= 0; i--) {
        result.append(words[i]);
        if (i > 0) {
            result.append(' ');
        }
    }
    return result.toString();
}

// reverseWords("  I love   testing ") -> "testing love I"`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(n).' },

    h('10. Check if two strings are anagrams'),
    {
      type: 'text',
      value:
        'Two strings are anagrams if they contain the same characters with the same counts, like "listen" and "silent". Count letters with an int array of size 26: add for the first string, subtract for the second, and every count must end at zero.'
    },
    {
      type: 'code',
      language: 'java',
      value: `public static boolean isAnagram(String first, String second) {
    String a = first.replace(" ", "").toLowerCase();
    String b = second.replace(" ", "").toLowerCase();
    if (a.length() != b.length()) {
        return false;
    }
    int[] counts = new int[26];
    for (int i = 0; i < a.length(); i++) {
        counts[a.charAt(i) - 'a']++;
        counts[b.charAt(i) - 'a']--;
    }
    for (int count : counts) {
        if (count != 0) {
            return false;
        }
    }
    return true;
}

// isAnagram("Listen", "Silent") -> true  (assumes letters a-z only)`
    },
    { type: 'text', value: 'Complexity: time O(n), space O(1) because the array size is fixed at 26.' },

    h('Quick reference'),
    {
      type: 'table',
      headers: ['Task', 'Key idea', 'Time', 'Space'],
      rows: [
        ['Reverse string', 'Two pointers, swap chars', 'O(n)', 'O(n)'],
        ['Palindrome', 'Compare both ends inward', 'O(n)', 'O(n)'],
        ['Duplicates in array', 'HashSet add() returns false', 'O(n)', 'O(n)'],
        ['Count characters', 'Map char to count', 'O(n)', 'O(k)'],
        ['Largest in array', 'Track max in one pass', 'O(n)', 'O(1)'],
        ['FizzBuzz', 'Check 15 before 3 and 5', 'O(n)', 'O(1)'],
        ['Prime check', 'Divide up to square root', 'O(square root n)', 'O(1)'],
        ['Swap without temp', 'Arithmetic or XOR', 'O(1)', 'O(1)'],
        ['Reverse words', 'Split, join backwards', 'O(n)', 'O(n)'],
        ['Anagram', 'Letter count array', 'O(n)', 'O(1)']
      ]
    },
    {
      type: 'warning',
      value:
        'Practical rounds may also ask you to automate a small flow (for example, login and verify the page title) or write test cases for a login page. Practise one Selenium script from scratch without an IDE autocomplete.'
    }
  ],
  callout: {
    lead: 'Interview tip:',
    text: 'Think aloud while coding. If you get stuck, say what you are trying to do. Interviewers often give hints, and they score your problem-solving process, not only the final output.'
  },
  mistakes: [
    'Starting to type immediately without clarifying input and edge cases.',
    'Starting a "largest number" search from 0, which fails for all-negative arrays.',
    'Checking i % 3 before i % 15 in FizzBuzz.',
    'Using only built-in shortcuts when the interviewer asked for manual logic.',
    'Not dry-running the code with an example before saying "done".'
  ],
  takeaways: [
    'Clarify, explain, code, dry run, then discuss complexity.',
    'HashSet and HashMap solve most duplicate and counting problems in O(n).',
    'Two pointers are the standard way to reverse or compare from both ends.',
    'Always handle edge cases: null, empty, negative numbers, spaces and case.',
    'Practise these tasks by typing them from memory until they feel easy.'
  ]
};

export const interviewLessons: Record<string, Lesson> = {
  'interview-manual': manual,
  'interview-selenium': selenium,
  'interview-api': api,
  'interview-sql': sql,
  'interview-agile': agile,
  'interview-framework': framework,
  'interview-hr': hr,
  'interview-resume': resume,
  'interview-mock': mock,
  'interview-coding': coding
};
