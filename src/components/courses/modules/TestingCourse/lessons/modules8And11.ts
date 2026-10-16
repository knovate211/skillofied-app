import type { Lesson } from '../TestingCourseData';

/**
 * Expanded beginner lessons for Module 8 (Web Automation with Selenium)
 * and Module 11 (Mobile Testing).
 */
export const modules8And11Lessons: Record<string, Lesson> = {
  /* ------------------------------------------------------------------ */
  /* MODULE 8: WEB AUTOMATION WITH SELENIUM                              */
  /* ------------------------------------------------------------------ */
  'm8-l1': {
    id: 'm8-l1',
    title: 'Lesson 8.1 Introduction to Selenium',
    objectives: [
      'Explain what Selenium is and why testers use it.',
      'Name the three parts of Selenium: IDE, WebDriver and Grid.',
      'Describe how a test script talks to a real browser.',
    ],
    theory:
      'Selenium is a free, open-source tool that controls web browsers with code. It has three parts: Selenium IDE (record and play), WebDriver (write tests in code) and Grid (run tests on many machines).',
    blocks: [
      {
        type: 'text',
        value:
          'Manual testing means a person clicks through a website and checks the result. This is slow when you must repeat the same checks every day. Selenium lets a computer do the clicking for you. You write a small program, and the program opens a browser, types, clicks and checks the page.',
      },
      {
        type: 'text',
        value:
          'Selenium is free and open source. It works with Chrome, Firefox, Edge and Safari. You can write Selenium tests in Java, Python, C#, JavaScript and Ruby. In this course we use Java.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Automation', 'Using a program to do test steps that a person would normally do by hand.'],
          ['Browser', 'The app you use to open websites, like Chrome or Firefox.'],
          ['WebDriver', 'The Selenium library (and W3C standard) that sends commands to a browser.'],
          ['Browser driver', 'A small helper program (for example chromedriver) that receives WebDriver commands and controls one browser.'],
          ['DOM', 'Document Object Model. The tree of HTML elements the browser builds from a page.'],
          ['Element', 'One item on the page, such as a button, a text box or a link.'],
          ['Test script', 'The code file that contains your automated test steps.'],
        ],
      },
      { type: 'heading', value: 'The three parts of Selenium' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Selenium IDE',
            subtitle: 'Record and play back',
            tone: 'honey',
            items: [
              'A browser extension for Chrome and Firefox.',
              'Records your clicks and plays them again.',
              'No coding needed. Good for quick demos.',
              'Hard to maintain for large test suites.',
            ],
          },
          {
            title: 'Selenium WebDriver',
            subtitle: 'Tests written in code',
            tone: 'olive',
            items: [
              'A library you add to your project.',
              'You write tests in Java, Python and more.',
              'Supports loops, data, reports and frameworks.',
              'The main tool professional testers use.',
            ],
          },
          {
            title: 'Selenium Grid',
            subtitle: 'Run tests in parallel',
            tone: 'rose',
            items: [
              'Runs tests on many machines at the same time.',
              'Mixes browsers and operating systems.',
              'Makes a large test suite finish faster.',
              'Usually added later, after tests are stable.',
            ],
          },
        ],
      },
      { type: 'heading', value: 'How WebDriver talks to a browser' },
      {
        type: 'steps',
        title: 'What happens when your code runs driver.get(...)',
        steps: [
          { label: 'Your test script', text: 'Java code calls a method such as driver.get("https://shopeasy.example").' },
          { label: 'Selenium client library', text: 'The selenium-java library turns the call into a W3C WebDriver HTTP request.' },
          { label: 'Browser driver', text: 'chromedriver (or geckodriver for Firefox) receives the request.' },
          { label: 'Real browser', text: 'The driver tells Chrome to open the page, using the browser native automation support.' },
          { label: 'Response', text: 'The result (success, page title, error) travels back to your script.' },
        ],
      },
      {
        type: 'alert',
        value:
          'Since Selenium 4.6, a tool called Selenium Manager finds or downloads the correct browser driver for you. You no longer need to download chromedriver by hand.',
      },
      { type: 'heading', value: 'What Selenium can and cannot do' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Good for',
            tone: 'olive',
            items: [
              'Testing web pages in real browsers.',
              'Regression tests that run again and again.',
              'Checking the same flow on many browsers.',
            ],
          },
          {
            title: 'Not made for',
            tone: 'rose',
            items: [
              'Desktop apps or native mobile apps (use Appium for mobile).',
              'Reading CAPTCHAs or solving them.',
              'Load and performance testing (use JMeter or similar).',
            ],
          },
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy: what we will automate in this module',
        value:
          'ShopEasy is a small practice shopping website. Across Module 8 we will automate: 1) log in, 2) search for "running shoes", 3) add a product to the cart, 4) choose a country in a dropdown, 5) pay inside a payment iframe, and 6) upload a profile photo.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Install the Selenium IDE extension in Chrome or Firefox.',
          'Record yourself searching for a word on any public website.',
          'Play the recording back and watch the browser repeat your steps.',
          'Write down two reasons why this recording might break later.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which Selenium part do you use to write tests in Java? (Selenium WebDriver)',
          'Which part runs many tests on many machines at once? (Selenium Grid)',
          'What program sits between WebDriver and Chrome? (The browser driver, chromedriver)',
          'Can Selenium test a native Android app by itself? (No. Use Appium for native mobile apps.)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Selenium is a remote control for your browser. Your test script presses the buttons, the browser driver is the signal receiver, and the browser is the TV that does what it is told.',
    },
    mistakes: [
      'Thinking Selenium IDE recordings are enough for a large, long-lived test suite.',
      'Trying to use Selenium to test native mobile or desktop apps.',
      'Expecting Selenium to solve CAPTCHAs. Ask developers to disable them in the test environment.',
      'Automating a flow before it has been tested by hand at least once.',
    ],
    takeaways: [
      'Selenium is a free, open-source tool that automates web browsers.',
      'It has three parts: IDE (record and play), WebDriver (code) and Grid (parallel runs).',
      'WebDriver communicates natively with browser drivers, which control the real browser.',
      'Selenium Manager (since 4.6) sets up browser drivers for you automatically.',
      'Selenium tests web apps only; use Appium for native mobile apps.',
    ],
  },

  'm8-l2': {
    id: 'm8-l2',
    title: 'Lesson 8.2 Selenium WebDriver',
    objectives: [
      'Set up a Java 17 Maven project with the selenium-java 4 dependency.',
      'Start a browser, open a page and close it correctly.',
      'Explain how Selenium Manager handles browser drivers.',
    ],
    theory:
      'WebDriver is the interface you use in code to control a browser. You add selenium-java to a Maven project, create a ChromeDriver, and Selenium Manager finds the right driver for you.',
    blocks: [
      {
        type: 'text',
        value:
          'In this lesson you will build your first real Selenium project. You will open the ShopEasy home page, print the page title, and close the browser. It is only a few lines of code, but every Selenium test starts this way.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['JDK', 'Java Development Kit. The tools needed to compile and run Java code. We use version 17 or newer.'],
          ['Maven', 'A build tool. It downloads libraries (dependencies) and runs your tests.'],
          ['pom.xml', 'The Maven project file. It lists the libraries your project needs.'],
          ['Dependency', 'A library your code uses, such as selenium-java.'],
          ['WebDriver', 'The Java interface with methods like get(), findElement() and quit().'],
          ['ChromeDriver', 'The class that implements WebDriver for Google Chrome.'],
          ['Selenium Manager', 'A tool built into Selenium 4.6+ that finds or downloads the correct browser driver.'],
          ['Session', 'One running browser controlled by one WebDriver object.'],
        ],
      },
      { type: 'heading', value: 'Set up your project' },
      {
        type: 'steps',
        title: 'From an empty folder to a running browser',
        steps: [
          { label: 'Install Java 17 or newer', text: 'Download a JDK (for example Eclipse Temurin). Check with: java -version' },
          { label: 'Install Maven', text: 'Or use an IDE such as IntelliJ IDEA, which includes Maven. Check with: mvn -v' },
          { label: 'Create a Maven project', text: 'Use your IDE "New Project > Maven" wizard. Pick a group id like com.shopeasy and an artifact id like ui-tests.' },
          { label: 'Add selenium-java 4.x to pom.xml', text: 'Copy the snippet below. Use the latest 4.x version shown on the Selenium website.' },
          { label: 'Install Chrome', text: 'Selenium drives a real browser, so the browser must exist on the machine.' },
          { label: 'Write and run the first test', text: 'Run the class. Selenium Manager downloads a matching chromedriver in the background.' },
        ],
      },
      {
        type: 'code',
        language: 'xml',
        value: `<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
</properties>

<dependencies>
  <!-- Selenium 4: check selenium.dev for the latest 4.x version -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version>
  </dependency>

  <!-- JUnit 5 to run the code as tests -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      {
        type: 'alert',
        value:
          'Older tutorials tell you to download chromedriver and set System.setProperty("webdriver.chrome.driver", ...). You do not need this with Selenium 4.6 or newer. Selenium Manager does it automatically.',
      },
      { type: 'heading', value: 'Your first WebDriver script' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();          // 1. start Chrome
        try {
            driver.manage().window().maximize();          // 2. make the window big
            driver.get("https://shopeasy.example");      // 3. open the page
            String title = driver.getTitle();             // 4. read the title
            System.out.println("Title is: " + title);
            System.out.println("URL is: " + driver.getCurrentUrl());
        } finally {
            driver.quit();                                // 5. close browser + end session
        }
    }
}`,
      },
      { type: 'heading', value: 'Line by line' },
      {
        type: 'syntax',
        title: 'What each line does',
        parts: [
          { clause: 'WebDriver driver = new ChromeDriver();', text: 'Starts a new Chrome window. The variable type is the WebDriver interface, so you can switch to FirefoxDriver later.' },
          { clause: 'driver.manage().window().maximize();', text: 'Maximizes the window so the page layout is the same every run.' },
          { clause: 'driver.get(url);', text: 'Opens the URL and waits until the page has finished loading.' },
          { clause: 'driver.getTitle();', text: 'Returns the text inside the <title> tag of the page.' },
          { clause: 'finally { driver.quit(); }', text: 'Always closes the browser, even if a step fails. This stops leftover browsers.' },
        ],
      },
      { type: 'heading', value: 'Other browsers' },
      {
        type: 'table',
        headers: ['Browser', 'Java class', 'Driver (found by Selenium Manager)'],
        rows: [
          ['Google Chrome', 'new ChromeDriver()', 'chromedriver'],
          ['Mozilla Firefox', 'new FirefoxDriver()', 'geckodriver'],
          ['Microsoft Edge', 'new EdgeDriver()', 'msedgedriver'],
          ['Apple Safari (macOS)', 'new SafariDriver()', 'safaridriver (built into macOS)'],
        ],
      },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.chrome.ChromeOptions;

ChromeOptions options = new ChromeOptions();
options.addArguments("--headless=new");        // run without a visible window (good for CI)
options.addArguments("--window-size=1366,768");
WebDriver driver = new ChromeDriver(options);`,
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create the Maven project and add the selenium-java dependency.',
          'Run FirstTest and check the title is printed in the console.',
          'Change ChromeDriver to FirefoxDriver (install Firefox first) and run again.',
          'Add headless mode with ChromeOptions and confirm no window appears.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which Java version should you use for this course? (Java 17 or newer)',
          'Do you need to download chromedriver manually in Selenium 4.6+? (No, Selenium Manager handles it)',
          'Why put driver.quit() in a finally block? (So the browser closes even when the test fails)',
          'Which method returns the page title? (driver.getTitle())',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'WebDriver is like a universal TV remote. The buttons (get, click, quit) are the same, and you only swap the batteries (ChromeDriver, FirefoxDriver) to control a different TV.',
    },
    mistakes: [
      'Following old tutorials that set webdriver.chrome.driver paths and download drivers by hand.',
      'Forgetting driver.quit(), which leaves many hidden Chrome processes running.',
      'Declaring the variable as ChromeDriver instead of WebDriver, which makes switching browsers harder.',
      'Using an old Java version (8 or 11) that the current Selenium release no longer supports well.',
    ],
    takeaways: [
      'WebDriver acts as the interface to control browser engines.',
      'Set up Java 17+, a Maven project and the selenium-java 4.x dependency.',
      'Selenium Manager downloads the right browser driver automatically since 4.6.',
      'new ChromeDriver() starts a browser; driver.get(url) opens a page.',
      'Always call driver.quit() in a finally block or an @AfterEach method.',
    ],
  },

  'm8-l3': {
    id: 'm8-l3',
    title: 'Lesson 8.3 Locators',
    objectives: [
      'Find elements with By.id, By.name, By.cssSelector, By.xpath and others.',
      'Choose the most stable locator using a clear priority order.',
      'Write CSS and XPath locators for the ShopEasy login page.',
    ],
    theory:
      'A locator tells Selenium how to find an element on the page. Prefer a unique id, then name, then CSS selectors, and use XPath when nothing else works.',
    blocks: [
      {
        type: 'text',
        value:
          'Before Selenium can click a button, it must find the button. A locator is the "address" of an element in the page HTML. Good locators keep working when the page design changes. Bad locators break often and make tests "flaky" (sometimes pass, sometimes fail).',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Locator', 'A rule for finding an element, written with the By class.'],
          ['Attribute', 'Extra information inside an HTML tag, like id="username" or type="submit".'],
          ['CSS selector', 'A short pattern (the same one used for styling) that matches elements.'],
          ['XPath', 'A path language that walks the HTML tree. Powerful but longer.'],
          ['Absolute XPath', 'A full path from the top, like /html/body/div[2]/form/input. Very fragile.'],
          ['Relative XPath', 'A path that starts anywhere with //, like //input[@name="email"].'],
          ['DevTools', 'The browser developer panel (F12) where you inspect HTML and test locators.'],
        ],
      },
      { type: 'heading', value: 'ShopEasy login page HTML' },
      {
        type: 'code',
        language: 'html',
        value: `<form id="login-form" class="auth-form">
  <label for="username">Email</label>
  <input id="username" name="email" type="email" placeholder="you@example.com">

  <label for="password">Password</label>
  <input id="password" name="password" type="password">

  <button type="submit" class="btn btn-primary" data-testid="login-submit">Log in</button>
  <a href="/forgot">Forgot password?</a>
</form>`,
      },
      { type: 'heading', value: 'All eight locator strategies' },
      {
        type: 'code',
        language: 'java',
        value: `driver.findElement(By.id("username"));                       // id attribute
driver.findElement(By.name("password"));                     // name attribute
driver.findElement(By.className("btn-primary"));             // ONE class name only
driver.findElement(By.tagName("button"));                    // tag name
driver.findElement(By.linkText("Forgot password?"));         // full link text
driver.findElement(By.partialLinkText("Forgot"));            // part of link text
driver.findElement(By.cssSelector("[data-testid='login-submit']"));
driver.findElement(By.xpath("//button[@type='submit']"));`,
      },
      { type: 'heading', value: 'Comparing the main strategies' },
      {
        type: 'table',
        headers: ['Strategy', 'Example', 'Pros', 'Cons'],
        rows: [
          ['id', 'By.id("username")', 'Fastest, short, usually unique', 'Some elements have no id, or the id is auto-generated (e.g. input-4821)'],
          ['name', 'By.name("email")', 'Stable on form fields', 'Can repeat (e.g. radio buttons share a name)'],
          ['CSS selector', 'By.cssSelector("#login-form button")', 'Fast, flexible, readable', 'Cannot match by visible text; cannot move to a parent element'],
          ['XPath', 'By.xpath("//button[text()=\'Log in\']")', 'Can match by text and move up or sideways in the tree', 'Longer, harder to read, absolute paths break easily'],
          ['linkText', 'By.linkText("Forgot password?")', 'Very readable for links', 'Only for <a> tags; breaks when text or language changes'],
        ],
      },
      {
        type: 'steps',
        title: 'Locator priority order (use the first that works)',
        steps: [
          { label: '1. Unique, static id', text: 'By.id("username")' },
          { label: '2. Test attribute or name', text: 'By.cssSelector("[data-testid=\'login-submit\']") or By.name("email")' },
          { label: '3. Short CSS selector', text: 'By.cssSelector("#login-form input[type=\'password\']")' },
          { label: '4. Relative XPath', text: 'By.xpath("//button[normalize-space()=\'Log in\']")' },
          { label: 'Never: absolute XPath', text: '/html/body/div[2]/form/button breaks when any parent changes.' },
        ],
      },
      { type: 'heading', value: 'CSS and XPath cheat sheet' },
      {
        type: 'table',
        headers: ['What you want', 'CSS selector', 'XPath'],
        rows: [
          ['By id', '#username', "//*[@id='username']"],
          ['By class', '.btn-primary', "//*[contains(@class,'btn-primary')]"],
          ['By attribute', "input[name='email']", "//input[@name='email']"],
          ['Child of a parent', '#login-form > button', "//form[@id='login-form']/button"],
          ['Attribute starts with', "input[id^='user']", "//input[starts-with(@id,'user')]"],
          ['By visible text', '(not possible)', "//button[text()='Log in']"],
          ['Parent of an element', '(not possible)', "//input[@id='username']/.."],
        ],
      },
      { type: 'heading', value: 'Worked example: log in to ShopEasy' },
      {
        type: 'code',
        language: 'java',
        value: `WebElement email = driver.findElement(By.id("username"));
WebElement password = driver.findElement(By.name("password"));
WebElement loginButton = driver.findElement(By.cssSelector("[data-testid='login-submit']"));

email.sendKeys("maria@shopeasy.test");
password.sendKeys("Secret123!");
loginButton.click();

// findElements returns a list (empty if nothing matches) - it never throws
List<WebElement> errors = driver.findElements(By.cssSelector(".error-message"));
System.out.println("Errors shown: " + errors.size());`,
      },
      {
        type: 'text',
        value:
          'findElement returns one element and throws NoSuchElementException if nothing matches. findElements returns a list, which is empty when nothing matches. Use findElements when you want to check that something is NOT on the page.',
      },
      {
        type: 'alert',
        value:
          'Test your locator before you write code. Open DevTools (F12), press Ctrl+F (Cmd+F on Mac) in the Elements panel and type the CSS or XPath. The panel shows "1 of 1" when the locator is unique.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Copy the ShopEasy HTML into a file called login.html and open it in Chrome.',
          'Write one locator for the password field using each of: id, name, CSS and XPath.',
          'Check each locator in DevTools and confirm it matches exactly 1 element.',
          'Write an XPath that finds the Log in button by its visible text.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which locator is generally the most stable? (A unique id attribute)',
          'Can a CSS selector find an element by its visible text? (No, use XPath for that)',
          'What does findElements return when nothing matches? (An empty list)',
          'Why avoid /html/body/div[2]/form/button? (It is an absolute XPath and breaks when the layout changes)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'A locator is like a delivery address. "House number 12, Green Street" (an id) is exact. "The third blue house after the big tree" (an absolute XPath) stops working when someone paints a house.',
    },
    mistakes: [
      'Copying the absolute XPath from DevTools ("Copy full XPath"). It breaks with the smallest layout change.',
      'Using auto-generated ids such as ember-1234 or input-8f3a, which change on every page load.',
      'Passing several classes to By.className("btn btn-primary"). It accepts one class only; use a CSS selector instead.',
      'Using findElement to check that an element is absent. It throws an exception; use findElements and check size() == 0.',
      'Not checking that a locator matches exactly one element, so Selenium clicks the wrong one.',
    ],
    takeaways: [
      'Locators target DOM elements using the By class.',
      'Use unique, static IDs where possible; fall back to CSS selectors or relative XPaths.',
      'Priority: id, then name or data-testid, then CSS, then relative XPath. Never absolute XPath.',
      'XPath can match visible text and parents; CSS cannot, but CSS is shorter and faster.',
      'findElement throws when nothing matches; findElements returns an empty list.',
      'Always test locators in DevTools before writing code.',
    ],
  },

  'm8-l4': {
    id: 'm8-l4',
    title: 'Lesson 8.4 Browser Commands',
    objectives: [
      'Open pages and move through browser history.',
      'Read page information such as title, URL and page source.',
      'Explain the difference between close() and quit().',
    ],
    theory:
      'Browser commands open URLs, go back and forward, refresh, and read the title or URL. close() closes only the current window; quit() closes all windows and ends the driver session.',
    blocks: [
      {
        type: 'text',
        value:
          'Browser commands act on the whole browser, not on one element. They are like the toolbar buttons you use every day: the address bar, Back, Forward and Refresh. Selenium gives you a Java method for each one.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['URL', 'The web address of a page, like https://shopeasy.example/cart.'],
          ['History', 'The list of pages you visited in this tab. Back and Forward move through it.'],
          ['Window handle', 'A unique text id Selenium gives to each browser window or tab.'],
          ['Page source', 'The HTML of the current page as a String.'],
          ['Session', 'The connection between your script and one running browser.'],
        ],
      },
      { type: 'heading', value: 'Navigation commands' },
      {
        type: 'code',
        language: 'java',
        value: `driver.get("https://shopeasy.example");                 // open a page and wait for load
driver.navigate().to("https://shopeasy.example/cart");  // same as get(), keeps history style
driver.navigate().back();                              // browser Back button
driver.navigate().forward();                           // browser Forward button
driver.navigate().refresh();                           // browser Refresh button`,
      },
      { type: 'heading', value: 'Information commands' },
      {
        type: 'code',
        language: 'java',
        value: `String title = driver.getTitle();          // "ShopEasy - Cart"
String url = driver.getCurrentUrl();       // "https://shopeasy.example/cart"
String html = driver.getPageSource();      // full HTML of the page
String handle = driver.getWindowHandle();  // id of the current window

driver.manage().window().maximize();
driver.manage().window().setSize(new Dimension(375, 812)); // phone-sized window
driver.manage().deleteAllCookies();                        // log out by clearing cookies`,
      },
      { type: 'heading', value: 'Closing the browser: close() vs quit()' },
      {
        type: 'compare',
        columns: [
          {
            title: 'driver.close()',
            subtitle: 'Closes one window',
            tone: 'honey',
            items: [
              'Closes only the window or tab that has focus.',
              'The driver session stays alive if other windows are open.',
              'Use it after working in a popup or new tab.',
              'Afterwards, switch to another window before the next command.',
            ],
          },
          {
            title: 'driver.quit()',
            subtitle: 'Ends everything',
            tone: 'olive',
            items: [
              'Closes all open browser windows.',
              'Terminates the driver session and the driver process.',
              'Use it once, at the end of every test.',
              'The driver object cannot be used again after quit().',
            ],
          },
        ],
      },
      { type: 'heading', value: 'Worked example: navigating ShopEasy' },
      {
        type: 'code',
        language: 'java',
        value: `WebDriver driver = new ChromeDriver();
try {
    driver.get("https://shopeasy.example");
    System.out.println(driver.getTitle());          // ShopEasy - Home

    driver.findElement(By.linkText("Cart")).click();
    if (!driver.getCurrentUrl().endsWith("/cart")) {
        throw new AssertionError("Cart page did not open");
    }

    driver.navigate().back();                       // back to Home
    System.out.println(driver.getTitle());          // ShopEasy - Home

    driver.navigate().refresh();                    // reload Home
} finally {
    driver.quit();                                  // closes all windows, ends session
}`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'driver.get(...)', text: 'Opens the home page and waits for the page load event.' },
          { clause: 'By.linkText("Cart")).click()', text: 'Clicks the Cart link, which changes the URL.' },
          { clause: 'getCurrentUrl().endsWith("/cart")', text: 'Checks we really reached the cart. In real tests use JUnit assertions.' },
          { clause: 'navigate().back()', text: 'Goes back in history, like pressing the Back button.' },
          { clause: 'driver.quit()', text: 'Cleans up: closes the browser and stops chromedriver.' },
        ],
      },
      {
        type: 'warning',
        value:
          'driver.get() waits only for the page load event. Content loaded later by JavaScript (like search results) may not be ready yet. You will learn to handle this with explicit waits in Lesson 8.6.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Open two different pages one after the other.',
          'Print the title after each page, then go back and print the title again.',
          'Set the window size to 375 x 812 and see how the page layout changes.',
          'End the test with close() and then with quit(). Watch the Task Manager or Activity Monitor for leftover chromedriver processes.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which command closes all windows and ends the session? (quit())',
          'Which command is the same as pressing the browser Back button? (driver.navigate().back())',
          'How do you read the current address of the page? (driver.getCurrentUrl())',
          'Can you use the driver after calling quit()? (No, the session is gone)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'close() is closing one tab in your browser. quit() is closing the whole browser app and turning off the remote control.',
    },
    mistakes: [
      'Using close() at the end of a test and leaving the driver process running in the background.',
      'Calling any driver method after quit(), which throws a NoSuchSessionException.',
      'Assuming get() waits for content loaded by JavaScript after the page load.',
      'Comparing full URLs that contain changing query strings; check a stable part instead.',
    ],
    takeaways: [
      'get() and navigate().to() open pages; back(), forward() and refresh() move through history.',
      'getTitle(), getCurrentUrl() and getPageSource() read page information.',
      'close() closes the active window; quit() terminates the driver process entirely.',
      'Always finish every test with quit().',
      'Window size affects layout, so set it the same way in every run.',
    ],
  },

  'm8-l5': {
    id: 'm8-l5',
    title: 'Lesson 8.5 Handling Forms',
    objectives: [
      'Type into text fields, clear them and click buttons.',
      'Work with checkboxes and radio buttons.',
      'Automate the ShopEasy login and search forms.',
    ],
    theory:
      'Forms are automated by locating each field, clearing it, typing with sendKeys(), selecting options and clicking or submitting. Always check the result after submitting.',
    blocks: [
      {
        type: 'text',
        value:
          'Almost every web app has forms: login, search, sign up, checkout. A form test finds each field, types data, submits the form and then checks what happened. The WebElement interface gives you everything you need.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['WebElement', 'A Java object that represents one element found on the page.'],
          ['sendKeys()', 'Types text (or special keys) into an input.'],
          ['clear()', 'Removes any text already inside an input.'],
          ['click()', 'Clicks the element, like a mouse click.'],
          ['submit()', 'Submits the form that contains the element.'],
          ['Checkbox', 'A small box you can tick on or off. Many can be ticked.'],
          ['Radio button', 'A round option. Only one in a group can be chosen.'],
        ],
      },
      { type: 'heading', value: 'Common WebElement methods' },
      {
        type: 'table',
        headers: ['Method', 'What it does', 'Returns'],
        rows: [
          ['sendKeys("text")', 'Types text into the element', 'void'],
          ['clear()', 'Empties a text field', 'void'],
          ['click()', 'Clicks the element', 'void'],
          ['getText()', 'Reads the visible text', 'String'],
          ['getAttribute("value")', 'Reads an attribute, e.g. what is typed in an input', 'String'],
          ['isDisplayed()', 'Is the element visible?', 'boolean'],
          ['isEnabled()', 'Can the user interact with it?', 'boolean'],
          ['isSelected()', 'Is a checkbox or radio button ticked?', 'boolean'],
        ],
      },
      { type: 'heading', value: 'ShopEasy search and filter HTML' },
      {
        type: 'code',
        language: 'html',
        value: `<form id="search-form" action="/search">
  <input id="search-box" name="q" type="text" value="shoes">
  <label><input type="checkbox" id="in-stock" name="inStock"> In stock only</label>
  <label><input type="radio" name="sort" value="price-asc"> Price: low to high</label>
  <label><input type="radio" name="sort" value="rating"> Best rating</label>
  <button id="search-btn" type="submit">Search</button>
</form>
<p class="result-count">12 results</p>`,
      },
      { type: 'heading', value: 'Worked example: search ShopEasy' },
      {
        type: 'code',
        language: 'java',
        value: `WebElement searchBox = driver.findElement(By.id("search-box"));
searchBox.clear();                                  // remove the pre-filled "shoes"
searchBox.sendKeys("running shoes");

WebElement inStock = driver.findElement(By.id("in-stock"));
if (!inStock.isSelected()) {                        // click only if not already ticked
    inStock.click();
}

driver.findElement(By.cssSelector("input[name='sort'][value='price-asc']")).click();
driver.findElement(By.id("search-btn")).click();

String count = driver.findElement(By.className("result-count")).getText();
System.out.println("Search shows: " + count);`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'searchBox.clear()', text: 'The box already contains "shoes". Without clear() we would type "shoesrunning shoes".' },
          { clause: 'sendKeys("running shoes")', text: 'Types the search words, one key at a time, like a real user.' },
          { clause: 'if (!inStock.isSelected())', text: 'Clicking a checkbox toggles it. Check the state first so we do not untick it by mistake.' },
          { clause: "input[name='sort'][value='price-asc']", text: 'Radio buttons share one name, so we also match the value attribute.' },
          { clause: 'getText()', text: 'Reads the visible result text so the test can check it.' },
        ],
      },
      { type: 'heading', value: 'Worked example: log in with the Enter key' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.Keys;

WebElement email = driver.findElement(By.id("username"));
email.clear();
email.sendKeys("maria@shopeasy.test");

WebElement password = driver.findElement(By.id("password"));
password.clear();
password.sendKeys("Secret123!", Keys.ENTER);    // type, then press Enter

// Check what is really inside the field (getText() is empty for inputs)
System.out.println(email.getAttribute("value")); // maria@shopeasy.test`,
      },
      {
        type: 'alert',
        value:
          'For an <input>, getText() returns an empty string. To read what is typed inside an input, use getAttribute("value") (or getDomProperty("value") in Selenium 4).',
      },
      {
        type: 'warning',
        value:
          'submit() only works on elements inside a <form>. Many modern sites use buttons with JavaScript and no real form. In that case click the button instead.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Save the search HTML as search.html and open it with driver.get("file:///full/path/search.html").',
          'Clear the search box, type "sandals" and print the value with getAttribute("value").',
          'Tick the checkbox twice and print isSelected() after each click.',
          'Choose the "Best rating" radio button and confirm the other one is not selected.',
          'Submit the form with Keys.ENTER instead of clicking the button.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Why call clear() before sendKeys()? (To remove any pre-filled text in the field)',
          'How do you check if a checkbox is ticked? (isSelected())',
          'What does getText() return for an input field? (An empty string; use getAttribute("value"))',
          'How do you press Enter after typing? (sendKeys("text", Keys.ENTER))',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Filling a form with Selenium is like filling a paper form for someone else. First you erase what is already written (clear), then you write neatly (sendKeys), tick the right boxes (click) and hand it in (submit).',
    },
    mistakes: [
      'Skipping clear(), so new text is added to old text in the field.',
      'Clicking a checkbox without checking isSelected(), which can untick it.',
      'Using getText() to read an input value instead of getAttribute("value").',
      'Calling submit() on a button that is not inside a <form> element.',
      'Not checking the result after submitting, so the test passes even when login fails.',
    ],
    takeaways: [
      'Locate the field, clear() it, then sendKeys() the data.',
      'Use clear() before sendKeys() to ensure no pre-filled text remains in input fields.',
      'Check isSelected() before clicking checkboxes and radio buttons.',
      'Keys.ENTER and other special keys can be sent with sendKeys().',
      'Read input values with getAttribute("value"); read visible text with getText().',
      'Every form test must verify the result after submitting.',
    ],
  },

  'm8-l6': {
    id: 'm8-l6',
    title: 'Lesson 8.6 Waits',
    objectives: [
      'Explain why tests fail when the page is slower than the script.',
      'Compare implicit, explicit and fluent waits.',
      'Write an explicit wait with WebDriverWait and ExpectedConditions.',
    ],
    theory:
      'Waits make Selenium pause until the page is ready. Implicit waits apply globally to element searches; explicit waits wait for one specific condition up to a timeout. Avoid Thread.sleep().',
    blocks: [
      {
        type: 'text',
        value:
          'Your script is very fast. A web page is often slower: it loads data from a server, shows a spinner, and then shows the results. If the script looks for a result before it appears, the test fails with NoSuchElementException. The code is correct, but the timing is wrong. Waits solve this problem.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Synchronization', 'Making the script and the page move at the same speed.'],
          ['Flaky test', 'A test that sometimes passes and sometimes fails without any code change.'],
          ['Timeout', 'The maximum time to wait before giving up with an error.'],
          ['Polling', 'Checking again and again at a fixed interval (for example every 500 ms).'],
          ['Condition', 'Something that must become true, like "the button is clickable".'],
          ['ExpectedConditions', 'A Selenium class with ready-made conditions.'],
          ['Race condition', 'When the result depends on which finishes first: the script or the page.'],
        ],
      },
      { type: 'heading', value: 'Why not Thread.sleep()?' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Thread.sleep(5000)',
            tone: 'rose',
            items: [
              'Always waits the full 5 seconds, even if the page was ready after 0.3 seconds.',
              'Still fails if the page needs 6 seconds.',
              'Blocks execution for a fixed duration, slowing down tests unnecessarily.',
            ],
          },
          {
            title: 'Explicit wait (10 s)',
            tone: 'olive',
            items: [
              'Stops waiting as soon as the condition is true.',
              'Waits up to 10 seconds on a slow day.',
              'Fails with a clear TimeoutException if it never happens.',
            ],
          },
        ],
      },
      { type: 'heading', value: 'The three kinds of wait' },
      {
        type: 'table',
        headers: ['', 'Implicit wait', 'Explicit wait', 'Fluent wait'],
        rows: [
          ['Scope', 'Global: every findElement call', 'One place in the code', 'One place in the code'],
          ['Waits for', 'Element to exist in the DOM only', 'Any condition (visible, clickable, text, URL...)', 'Any condition'],
          ['Set up', 'Once, after creating the driver', 'new WebDriverWait(driver, Duration.ofSeconds(10))', 'new FluentWait<>(driver) with options'],
          ['Polling', 'Fixed by the driver', 'Every 500 ms by default', 'You choose (e.g. every 250 ms)'],
          ['Ignore exceptions', 'No', 'NoSuchElementException by default', 'You choose which to ignore'],
          ['Recommended?', 'Simple scripts only', 'Yes, the standard choice', 'For special cases'],
        ],
      },
      {
        type: 'warning',
        value:
          'Never mix implicit and explicit waits in the same test. The timeouts can combine in unexpected ways (for example a 10 s implicit wait plus a 15 s explicit wait may take much longer than 15 s). Pick explicit waits and keep the implicit wait at 0.',
      },
      { type: 'heading', value: 'Implicit wait' },
      {
        type: 'code',
        language: 'java',
        value: `// Set once. Every findElement will retry for up to 5 seconds.
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));`,
      },
      { type: 'heading', value: 'Explicit wait (recommended)' },
      {
        type: 'code',
        language: 'java',
        value: `import java.time.Duration;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
btn.click();`,
      },
      {
        type: 'table',
        headers: ['ExpectedConditions method', 'Waits until...'],
        rows: [
          ['visibilityOfElementLocated(locator)', 'the element exists and is visible'],
          ['elementToBeClickable(locator)', 'the element is visible and enabled'],
          ['presenceOfElementLocated(locator)', 'the element exists in the DOM (may be hidden)'],
          ['invisibilityOfElementLocated(locator)', 'the element is hidden or removed, e.g. a spinner'],
          ['textToBePresentInElementLocated(locator, text)', 'the element contains the text'],
          ['urlContains(text)', 'the current URL contains the text'],
          ['alertIsPresent()', 'a JavaScript alert is open'],
          ['numberOfWindowsToBe(n)', 'there are n windows or tabs'],
        ],
      },
      { type: 'heading', value: 'Worked example: add to cart on ShopEasy' },
      {
        type: 'code',
        language: 'html',
        value: `<button id="add-to-cart" data-product="rs-42">Add to cart</button>
<div class="spinner" hidden></div>
<span id="cart-count" class="badge">0</span>
<div id="toast" class="toast" hidden>Added to cart!</div>`,
      },
      {
        type: 'code',
        language: 'java',
        value: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

wait.until(ExpectedConditions.elementToBeClickable(By.id("add-to-cart"))).click();

wait.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector(".spinner")));
wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("cart-count"), "1"));

WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));
System.out.println(toast.getText());   // Added to cart!`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'new WebDriverWait(driver, Duration.ofSeconds(10))', text: 'Creates a wait with a 10 second maximum. Selenium 4 uses Duration, not a plain number.' },
          { clause: 'elementToBeClickable(...)).click()', text: 'until() returns the element when it is ready, so we can click it straight away.' },
          { clause: 'invisibilityOfElementLocated(.spinner)', text: 'Waits for the loading spinner to disappear.' },
          { clause: 'textToBePresentInElementLocated(..., "1")', text: 'Waits until the cart badge shows 1 item.' },
          { clause: 'visibilityOfElementLocated(By.id("toast"))', text: 'Waits for the success message and returns it so we can read the text.' },
        ],
      },
      { type: 'heading', value: 'Fluent wait' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

Wait<WebDriver> fluent = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(20))        // give up after 20 s
        .pollingEvery(Duration.ofMillis(250))       // check every 250 ms
        .ignoring(NoSuchElementException.class);    // keep trying if not found yet

WebElement orderId = fluent.until(d -> d.findElement(By.id("order-id")));`,
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Write a test that clicks Add to cart and immediately reads the toast text. Watch it fail.',
          'Fix it with an explicit wait for visibilityOfElementLocated.',
          'Replace the wait with Thread.sleep(3000) and time the test. Compare the speed.',
          'Write a FluentWait that polls every 200 ms for the order id to appear.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'What does an explicit wait do? (Waits for a specific condition up to a timeout)',
          'Why is Thread.sleep() discouraged? (It always waits the full time, slowing tests unnecessarily)',
          'Should you mix implicit and explicit waits? (No, the timeouts can combine unpredictably)',
          'Which condition waits for a spinner to go away? (invisibilityOfElementLocated)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Thread.sleep is setting a 10-minute timer for pasta and walking away. An explicit wait is checking the pasta every 30 seconds and taking it out the moment it is ready, with a 10-minute limit.',
    },
    mistakes: [
      'Using Thread.sleep() everywhere, which makes the suite slow and still flaky.',
      'Mixing implicit and explicit waits in the same test.',
      'Using the Selenium 3 constructor new WebDriverWait(driver, 10). Selenium 4 needs Duration.ofSeconds(10).',
      'Waiting for presence when you need to click; use elementToBeClickable instead.',
      'Setting huge timeouts (like 120 seconds) that hide real performance problems.',
    ],
    takeaways: [
      'Waits prevent race conditions caused by slow pages and network latency.',
      'Implicit waits apply globally; explicit waits target specific conditions.',
      'Standard pattern: new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions...).',
      'Fluent waits let you set polling interval and ignored exceptions.',
      'Never mix implicit and explicit waits.',
      'Avoid Thread.sleep() as it blocks test execution unconditionally.',
    ],
  },

  'm8-l7': {
    id: 'm8-l7',
    title: 'Lesson 8.7 Alerts & Windows',
    objectives: [
      'Accept, dismiss and read JavaScript alerts, confirms and prompts.',
      'Switch between browser windows and tabs using window handles.',
      'Return safely to the original window.',
    ],
    theory:
      'JavaScript alerts and new windows are outside the normal page, so WebDriver must switch to them with driver.switchTo().alert() or driver.switchTo().window(handle) before interacting.',
    blocks: [
      {
        type: 'text',
        value:
          'Sometimes a website shows a small browser popup ("Are you sure?") or opens a link in a new tab. Selenium can only work in one place at a time. It keeps its focus on the current page until you tell it to switch. This lesson shows how to switch to alerts and windows, and how to come back.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Alert', 'A browser popup with a message and an OK button (window.alert).'],
          ['Confirm', 'A popup with OK and Cancel (window.confirm).'],
          ['Prompt', 'A popup with a text box, OK and Cancel (window.prompt).'],
          ['Focus', 'The window, frame or alert where Selenium currently sends commands.'],
          ['Window handle', 'A unique String id for each browser window or tab.'],
          ['switchTo()', 'The method family that moves Selenium focus.'],
        ],
      },
      { type: 'heading', value: 'Alert methods' },
      {
        type: 'table',
        headers: ['Method', 'Same as the user...'],
        rows: [
          ['alert.accept()', 'clicks OK'],
          ['alert.dismiss()', 'clicks Cancel (or closes a simple alert)'],
          ['alert.getText()', 'reads the popup message'],
          ['alert.sendKeys("text")', 'types into a prompt box'],
        ],
      },
      { type: 'heading', value: 'Worked example: remove an item from the ShopEasy cart' },
      {
        type: 'code',
        language: 'html',
        value: `<button id="remove-item" onclick="if (confirm('Remove Running Shoes from cart?')) removeItem()">
  Remove
</button>`,
      },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.Alert;

driver.findElement(By.id("remove-item")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert confirm = wait.until(ExpectedConditions.alertIsPresent());

System.out.println(confirm.getText());   // Remove Running Shoes from cart?
confirm.accept();                        // click OK

// Focus returns to the page automatically after accept() or dismiss()
wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("cart-count"), "0"));`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'click()', text: 'Clicking Remove makes the browser show a confirm popup.' },
          { clause: 'wait.until(alertIsPresent())', text: 'Waits for the popup and switches to it. It returns an Alert object.' },
          { clause: 'confirm.getText()', text: 'Reads the message so we can check it is the right popup.' },
          { clause: 'confirm.accept()', text: 'Clicks OK. The popup closes and focus goes back to the page.' },
        ],
      },
      {
        type: 'code',
        language: 'java',
        value: `// Without a wait, you can switch directly when you know the alert is already open
Alert alert = driver.switchTo().alert();
alert.sendKeys("SAVE10");   // type a coupon into a prompt
alert.accept();`,
      },
      {
        type: 'warning',
        value:
          'While an alert is open, every other command fails with UnhandledAlertException. Alerts must be accepted or dismissed before continuing. Also, Selenium alerts only work for real browser popups. A popup made of HTML (a "modal" div) is part of the page; use normal locators for it.',
      },
      { type: 'heading', value: 'Windows and tabs' },
      {
        type: 'code',
        language: 'java',
        value: `String mainWindow = driver.getWindowHandle();          // remember where we started

driver.findElement(By.linkText("Size guide")).click(); // opens a new tab

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

for (String handle : driver.getWindowHandles()) {      // all open windows
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);              // move focus to the new tab
        break;
    }
}

System.out.println(driver.getTitle());                 // ShopEasy - Size Guide
driver.close();                                        // close only the new tab

driver.switchTo().window(mainWindow);                  // go back to the product page`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'getWindowHandle()', text: 'Returns the id of the current window. Save it before opening a new one.' },
          { clause: 'numberOfWindowsToBe(2)', text: 'Waits until the new tab really exists.' },
          { clause: 'getWindowHandles()', text: 'Returns a Set of all window ids. The order is not guaranteed.' },
          { clause: 'switchTo().window(handle)', text: 'Moves focus. Opening a tab does NOT move focus by itself.' },
          { clause: 'driver.close()', text: 'Closes the tab with focus. After this, focus points to nothing.' },
          { clause: 'switchTo().window(mainWindow)', text: 'Moves focus back so the next commands work.' },
        ],
      },
      {
        type: 'code',
        language: 'java',
        value: `// Selenium 4: open a new tab or window yourself (focus moves automatically)
driver.switchTo().newWindow(WindowType.TAB);
driver.get("https://shopeasy.example/help");`,
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create an HTML page with three buttons that call alert(), confirm() and prompt().',
          'Automate each one: read the text, then accept or dismiss it.',
          'Type your name into the prompt and print the page result.',
          'Open a link with target="_blank", switch to the new tab, print its title, close it and switch back.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'How do you click Cancel on a confirm popup? (alert.dismiss())',
          'Does clicking a link that opens a new tab move Selenium focus? (No, you must call switchTo().window())',
          'Which method returns all window handles? (driver.getWindowHandles())',
          'What happens if you click an element while an alert is open? (UnhandledAlertException)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Selenium is a person who can only look at one sheet of paper at a time. When a new sheet (tab or alert) appears on the desk, you must tell them to pick it up, and later tell them to pick up the first sheet again.',
    },
    mistakes: [
      'Expecting Selenium to follow a new tab automatically.',
      'Using switchTo().alert() for an HTML modal dialog that is part of the page.',
      'Calling driver.close() on a tab and then sending commands without switching back.',
      'Assuming getWindowHandles() returns windows in the order they were opened.',
    ],
    takeaways: [
      'Browser popups need driver.switchTo().alert() or wait.until(ExpectedConditions.alertIsPresent()).',
      'Alerts must be accepted or dismissed before continuing browser interactions.',
      'Save getWindowHandle() before opening a new window.',
      'Use getWindowHandles() and switchTo().window(handle) to move between tabs.',
      'After close(), switch back to a window that is still open.',
    ],
  },

  'm8-l8': {
    id: 'm8-l8',
    title: 'Lesson 8.8 Frames & iFrames',
    objectives: [
      'Recognize when an element lives inside an iframe.',
      'Switch into a frame by name, id, index or WebElement.',
      'Return to the main page with defaultContent() or parentFrame().',
    ],
    theory:
      'An iframe is a web page inside another web page. Selenium cannot see elements inside it until you call driver.switchTo().frame(...), and you must switch back with defaultContent() when finished.',
    blocks: [
      {
        type: 'text',
        value:
          'Many sites embed content from other places: payment forms, maps, videos, chat boxes. They use an <iframe> tag. The iframe has its own separate HTML document. Your locator can be perfect and still fail, because Selenium is looking in the main page, not inside the frame.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['iframe', 'Inline frame. An HTML tag that shows another web page inside the current page.'],
          ['Frame', 'Older name for the same idea. Selenium handles frames and iframes the same way.'],
          ['Default content', 'The main (top-level) page.'],
          ['Parent frame', 'The frame one level above the current one.'],
          ['Nested frame', 'A frame inside another frame.'],
        ],
      },
      { type: 'heading', value: 'How to know you are dealing with a frame' },
      {
        type: 'list',
        items: [
          'Your locator works in DevTools but Selenium throws NoSuchElementException.',
          'In DevTools, the element is below an <iframe> tag and a separate #document.',
          'The DevTools console has a context dropdown (top) that shows the frame name.',
        ],
      },
      { type: 'heading', value: 'ShopEasy checkout with a payment iframe' },
      {
        type: 'code',
        language: 'html',
        value: `<!-- Main checkout page -->
<h2>Checkout</h2>
<iframe id="payment-frame" name="payment-frame" src="https://pay.example/card"></iframe>
<button id="place-order">Place order</button>

<!-- Inside the iframe (a separate document) -->
<input id="card-number" placeholder="Card number">
<input id="card-expiry" placeholder="MM/YY">
<input id="card-cvc" placeholder="CVC">`,
      },
      { type: 'heading', value: 'Ways to switch into a frame' },
      {
        type: 'table',
        headers: ['Method', 'Example', 'Notes'],
        rows: [
          ['By name or id', 'driver.switchTo().frame("payment-frame")', 'Simple and readable when the frame has one.'],
          ['By index', 'driver.switchTo().frame(0)', 'First frame is 0. Fragile if frames are added or moved.'],
          ['By WebElement', 'driver.switchTo().frame(driver.findElement(By.cssSelector("iframe[src*=\'pay\']")))', 'Most flexible; use any locator.'],
          ['With a wait', 'wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("payment-frame"))', 'Best when the frame loads slowly.'],
        ],
      },
      { type: 'heading', value: 'Worked example: pay inside the frame' },
      {
        type: 'code',
        language: 'java',
        value: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// 1. Wait for the frame and switch into it
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("payment-frame")));

// 2. Now we are inside the payment page
driver.findElement(By.id("card-number")).sendKeys("4242424242424242");
driver.findElement(By.id("card-expiry")).sendKeys("12/30");
driver.findElement(By.id("card-cvc")).sendKeys("123");

// 3. Go back to the main checkout page
driver.switchTo().defaultContent();

// 4. This button is in the main page, so it can be found again
driver.findElement(By.id("place-order")).click();`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'frameToBeAvailableAndSwitchToIt(...)', text: 'Waits until the iframe is loaded and moves focus inside it in one step.' },
          { clause: 'findElement(By.id("card-number"))', text: 'Works only because focus is inside the frame now.' },
          { clause: 'switchTo().defaultContent()', text: 'Moves focus back to the top-level page.' },
          { clause: 'By.id("place-order")', text: 'Without defaultContent() this would throw NoSuchElementException.' },
        ],
      },
      { type: 'heading', value: 'Nested frames' },
      {
        type: 'code',
        language: 'java',
        value: `driver.switchTo().frame("outer");     // main page -> outer
driver.switchTo().frame("inner");     // outer -> inner (search starts in outer)

driver.switchTo().parentFrame();      // inner -> outer (one level up)
driver.switchTo().defaultContent();   // any level -> main page`,
      },
      {
        type: 'alert',
        value:
          'Always use test card numbers (like 4242 4242 4242 4242) in a test environment. Never automate real payments with real cards.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create page.html with an iframe that loads frame.html. Put an input inside frame.html.',
          'Try to type into the input without switching. Note the exception.',
          'Switch by name, type the text, then switch back with defaultContent().',
          'Repeat, switching by index and then by WebElement.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'How do you interact with an element inside an iframe? (Switch to the frame first)',
          'Which method goes back to the main page from any frame? (driver.switchTo().defaultContent())',
          'Which method goes up only one level? (driver.switchTo().parentFrame())',
          'Why is switching by index risky? (The order changes if frames are added or removed)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'An iframe is a TV screen hanging on the wall of a room. You can see the TV from the room, but to change what is on the TV you must pick up its own remote (switch to the frame). When you are done, put it down (defaultContent).',
    },
    mistakes: [
      'Writing longer XPaths to reach a frame element instead of switching into the frame.',
      'Forgetting to call defaultContent(), so later locators on the main page fail.',
      'Switching by index when the page has ads or widgets that add extra frames.',
      'Switching from inner frame to a sibling frame without going back to the parent first.',
    ],
    takeaways: [
      'iFrames embed separate documents inside webpages.',
      'WebDriver must switch focus to the frame to access nested elements.',
      'Switch by name/id, index, WebElement, or with frameToBeAvailableAndSwitchToIt.',
      'parentFrame() goes up one level; defaultContent() goes to the top page.',
      'Always return to default content after completing actions in a frame.',
    ],
  },

  'm8-l9': {
    id: 'm8-l9',
    title: 'Lesson 8.9 Dropdowns',
    objectives: [
      'Use the Select class to choose options by text, value or index.',
      'Read the selected option and all available options.',
      'Handle custom dropdowns that are not <select> tags.',
    ],
    theory:
      'The Select class chooses options in standard HTML <select> dropdowns by visible text, value or index. Custom dropdowns built with divs need normal clicks instead.',
    blocks: [
      {
        type: 'text',
        value:
          'A dropdown lets the user choose one option from a list, like a country or a delivery speed. When the page uses a real HTML <select> tag, Selenium has a helper class called Select that makes this easy.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['<select>', 'The HTML tag for a standard dropdown list.'],
          ['<option>', 'One choice inside a <select>.'],
          ['Visible text', 'The words the user sees, e.g. "Canada".'],
          ['Value', 'The hidden value sent to the server, e.g. value="CA".'],
          ['Index', 'The position of the option, starting at 0.'],
          ['Multi-select', 'A <select multiple> where more than one option can be chosen.'],
          ['Custom dropdown', 'A dropdown built from <div> or <li> tags with JavaScript, not a <select>.'],
        ],
      },
      { type: 'heading', value: 'ShopEasy checkout dropdowns' },
      {
        type: 'code',
        language: 'html',
        value: `<select id="country" name="country">
  <option value="">-- Choose country --</option>
  <option value="IN">India</option>
  <option value="CA">Canada</option>
  <option value="DE">Germany</option>
</select>

<select id="delivery" name="delivery">
  <option value="std">Standard (5 days)</option>
  <option value="exp">Express (2 days)</option>
</select>`,
      },
      { type: 'heading', value: 'Three ways to select' },
      {
        type: 'table',
        headers: ['Method', 'Example', 'Best when'],
        rows: [
          ['selectByVisibleText', 'select.selectByVisibleText("Canada")', 'The test should read like the user story. Most common.'],
          ['selectByValue', 'select.selectByValue("CA")', 'Visible text is translated into many languages.'],
          ['selectByIndex', 'select.selectByIndex(2)', 'Rarely. Breaks when options are added or reordered.'],
        ],
      },
      { type: 'heading', value: 'Worked example: choose country and delivery' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.support.ui.Select;

Select country = new Select(driver.findElement(By.id("country")));
country.selectByVisibleText("Canada");

String chosen = country.getFirstSelectedOption().getText();
System.out.println("Country: " + chosen);                  // Country: Canada

Select delivery = new Select(driver.findElement(By.id("delivery")));
delivery.selectByValue("exp");

System.out.println("Options available: " + country.getOptions().size());  // 4
for (WebElement option : country.getOptions()) {
    System.out.println(option.getText());
}`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'new Select(driver.findElement(By.id("country")))', text: 'Wraps the <select> element in the Select helper.' },
          { clause: 'selectByVisibleText("Canada")', text: 'Chooses the option whose text is exactly "Canada".' },
          { clause: 'getFirstSelectedOption().getText()', text: 'Reads which option is chosen now, so we can verify it.' },
          { clause: 'selectByValue("exp")', text: 'Chooses Express using the hidden value attribute.' },
          { clause: 'getOptions()', text: 'Returns a list of all <option> elements, useful to check the list is correct.' },
        ],
      },
      { type: 'heading', value: 'Multi-select lists' },
      {
        type: 'code',
        language: 'java',
        value: `Select sizes = new Select(driver.findElement(By.id("sizes")));  // <select id="sizes" multiple>
if (sizes.isMultiple()) {
    sizes.selectByVisibleText("8");
    sizes.selectByVisibleText("9");
    System.out.println(sizes.getAllSelectedOptions().size());  // 2
    sizes.deselectAll();                                       // only for multi-select
}`,
      },
      { type: 'heading', value: 'Standard vs custom dropdowns' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Standard <select>',
            tone: 'olive',
            items: [
              'Use the Select class.',
              'selectByVisibleText, selectByValue, selectByIndex.',
              'Works the same in every browser.',
            ],
          },
          {
            title: 'Custom dropdown (div / li)',
            tone: 'honey',
            items: [
              'Select class throws UnexpectedTagNameException.',
              'Click the box to open it, wait for the list, click the option.',
              'Common in React, Angular and UI kits.',
            ],
          },
        ],
      },
      {
        type: 'code',
        language: 'java',
        value: `// Custom dropdown: <div class="size-picker"> ... <li data-size="9">9</li>
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
driver.findElement(By.cssSelector(".size-picker")).click();
wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("li[data-size='9']"))).click();`,
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Save the ShopEasy dropdown HTML and open it with Selenium.',
          'Select Germany by visible text, then India by value, then Canada by index.',
          'After each choice, print getFirstSelectedOption().getText().',
          'Check that the country list contains exactly 4 options.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which class selects an option from a <select> dropdown? (Select)',
          'Which method uses the value attribute? (selectByValue)',
          'How do you read the chosen option? (getFirstSelectedOption())',
          'Does Select work on a dropdown built from div tags? (No, use clicks and waits)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The Select class is a waiter who knows the menu. You can order by the dish name (visible text), by the kitchen code (value) or by the line number (index). A custom dropdown is a food truck with no menu: you have to point and click yourself.',
    },
    mistakes: [
      'Using the Select class on a custom div dropdown.',
      'Choosing by index, which breaks when a new option is added.',
      'Not verifying the selected option after choosing it.',
      'Calling deselectAll() on a single-choice dropdown, which throws an exception.',
    ],
    takeaways: [
      'The Selenium Select class makes it easy to choose options in HTML dropdowns.',
      'Select by visible text, value or index; prefer text or value.',
      'getFirstSelectedOption() and getOptions() help you verify the dropdown.',
      'Select only works on standard <select> tags.',
      'Custom dropdowns need click, wait, click.',
    ],
  },

  'm8-l10': {
    id: 'm8-l10',
    title: 'Lesson 8.10 File Upload & Download',
    objectives: [
      'Upload a file by sending its absolute path to a file input.',
      'Configure Chrome to download files into a known folder.',
      'Verify that a download finished.',
    ],
    theory:
      'To upload, find the <input type="file"> and call sendKeys() with the absolute file path. Do not click the upload button, because the operating system file dialog cannot be controlled by WebDriver. For downloads, set a download folder in browser options and check the file exists.',
    blocks: [
      {
        type: 'text',
        value:
          'When a user clicks "Choose file", the operating system (Windows, macOS, Linux) opens its own file window. That window is not part of the web page, so Selenium cannot click inside it. The good news: you do not need that window. You can give the file path straight to the file input.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['File input', 'The HTML tag <input type="file"> that accepts a file.'],
          ['Absolute path', 'The full location of a file, e.g. C:\\data\\photo.png or /home/maria/photo.png.'],
          ['Relative path', 'A location compared to the project folder, e.g. src/test/resources/photo.png.'],
          ['OS dialog', 'The native file window of the operating system. WebDriver cannot control it.'],
          ['Download directory', 'The folder where the browser saves downloaded files.'],
          ['ChromeOptions', 'A class to set Chrome settings before it starts.'],
        ],
      },
      { type: 'heading', value: 'ShopEasy profile photo upload' },
      {
        type: 'code',
        language: 'html',
        value: `<form id="profile-form">
  <label for="upload">Profile photo</label>
  <input id="upload" name="photo" type="file" accept="image/png,image/jpeg">
  <button id="save-photo" type="button">Save</button>
  <p id="upload-status"></p>
</form>`,
      },
      { type: 'heading', value: 'Worked example: upload a file' },
      {
        type: 'code',
        language: 'java',
        value: `import java.io.File;

// Keep test files inside the project so the test works on every machine
File photo = new File("src/test/resources/profile.png");
String absolutePath = photo.getAbsolutePath();

WebElement fileInput = driver.findElement(By.id("upload"));
fileInput.sendKeys(absolutePath);                 // no clicking, no OS window

driver.findElement(By.id("save-photo")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.textToBePresentInElementLocated(
        By.id("upload-status"), "Upload complete"));`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'new File("src/test/resources/profile.png")', text: 'Points to a test file stored in the project, not on your personal desktop.' },
          { clause: 'getAbsolutePath()', text: 'Turns it into the full path that the browser needs.' },
          { clause: 'fileInput.sendKeys(absolutePath)', text: 'Attaches the file directly to the input. This is the whole upload trick.' },
          { clause: 'click() on save-photo', text: 'Clicks the page button that sends the file to the server (not the Choose file button).' },
          { clause: 'textToBePresentInElementLocated(...)', text: 'Waits for proof that the upload really finished.' },
        ],
      },
      {
        type: 'warning',
        value:
          'Do not click the "Choose file" input or button itself. The native OS window opens and blocks WebDriver. Always use sendKeys() with the path. If the file input is hidden with CSS, ask developers for a test hook or make it visible for the test.',
      },
      {
        type: 'alert',
        value:
          'Running on Selenium Grid or in the cloud? The file is on your machine, not the remote one. Add ((RemoteWebDriver) driver).setFileDetector(new LocalFileDetector()); so Selenium sends the file to the remote browser.',
      },
      { type: 'heading', value: 'Downloading files' },
      {
        type: 'text',
        value:
          'Selenium cannot see the browser download bar. Instead, tell Chrome where to save files and then check that folder from Java.',
      },
      {
        type: 'code',
        language: 'java',
        value: `import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

Path downloadDir = Path.of("target", "downloads").toAbsolutePath();
Files.createDirectories(downloadDir);

Map<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadDir.toString());
prefs.put("download.prompt_for_download", false);   // do not ask where to save

ChromeOptions options = new ChromeOptions();
options.setExperimentalOption("prefs", prefs);
WebDriver driver = new ChromeDriver(options);

driver.get("https://shopeasy.example/orders/1001");
driver.findElement(By.linkText("Download invoice")).click();

Path invoice = downloadDir.resolve("invoice-1001.pdf");
new WebDriverWait(driver, Duration.ofSeconds(15))
        .until(d -> Files.exists(invoice));          // wait until the file appears
System.out.println("Size in bytes: " + Files.size(invoice));`,
      },
      {
        type: 'steps',
        title: 'Download test checklist',
        steps: [
          { label: 'Empty the download folder first', text: 'Old files from earlier runs can give a false pass.' },
          { label: 'Set download.default_directory', text: 'Use an absolute path.' },
          { label: 'Click the download link', text: 'A normal Selenium click.' },
          { label: 'Wait for the file', text: 'Chrome writes a .crdownload file first, then renames it when finished.' },
          { label: 'Check name and size', text: 'Size greater than 0 proves the file is not empty.' },
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Put a small image in src/test/resources.',
          'Upload it to any practice upload page using sendKeys() and the absolute path.',
          'Verify the page shows the file name after upload.',
          'Configure ChromeOptions to download into target/downloads and download any sample file.',
          'Write a wait that passes only when the file exists and its size is above 0.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'How do you upload a file with Selenium? (sendKeys() the absolute path into the input type="file")',
          'Why not click the upload button? (The native OS window opens and WebDriver cannot control it)',
          'Which Chrome preference sets the download folder? (download.default_directory)',
          'What is needed to upload on a remote Grid? (A LocalFileDetector)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Uploading with Selenium is like handing a parcel directly through the post office window, instead of walking into the back storage room where you are not allowed.',
    },
    mistakes: [
      'Clicking the Choose file button and getting stuck on the OS file window.',
      'Hardcoding a path from your own computer like C:/Users/maria/Desktop/photo.png.',
      'Using a relative path without getAbsolutePath().',
      'Not cleaning the download folder, so an old file makes the test pass.',
      'Checking for the file immediately after clicking, before the download finishes.',
    ],
    takeaways: [
      'Files can be uploaded by targeting file inputs directly and sending absolute paths.',
      'Avoid clicking the upload button itself, as native OS windows block WebDriver.',
      'Store test files in the project, for example src/test/resources.',
      'Use LocalFileDetector when running on a remote Grid.',
      'For downloads, set a download folder in ChromeOptions and wait for the file to exist.',
    ],
  },

  /* ------------------------------------------------------------------ */
  /* MODULE 11: MOBILE TESTING                                           */
  /* ------------------------------------------------------------------ */
  'm11-l1': {
    id: 'm11-l1',
    title: 'Lesson 11.1 Mobile Testing Basics',
    objectives: [
      'Explain how mobile testing differs from desktop web testing.',
      'Tell the difference between native, hybrid and mobile web apps.',
      'Choose between emulators, simulators and real devices.',
      'List mobile-specific checks: interrupts, network, orientation and permissions.',
    ],
    theory:
      'Mobile testing checks apps on phones and tablets. It must deal with many devices and screen sizes, three app types (native, hybrid, web) and mobile problems like calls, weak network, rotation, battery and permissions.',
    blocks: [
      {
        type: 'text',
        value:
          'People use phones on the bus, with weak Wi-Fi, low battery and incoming calls. A mobile app must keep working in all these situations. Mobile testing checks the normal features and also these real-life conditions.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Native app', 'An app built for one platform with its own language (Kotlin/Java for Android, Swift for iOS). Installed from a store.'],
          ['Hybrid app', 'An app built with web technologies (HTML, CSS, JS) running inside a native wrapper container.'],
          ['Mobile web app', 'A website opened in the phone browser (Chrome, Safari). Nothing to install.'],
          ['Fragmentation', 'The huge number of different devices, screen sizes and OS versions.'],
          ['Emulator', 'Software that copies an Android device, including much of its hardware, on your computer.'],
          ['Simulator', 'Software on a Mac that imitates the iOS interface, but not the real hardware.'],
          ['Real device', 'A physical phone or tablet.'],
          ['Interrupt', 'Something that stops the app for a moment: a call, SMS, notification, alarm or low battery warning.'],
        ],
      },
      { type: 'heading', value: 'Three types of mobile app' },
      {
        type: 'compare',
        columns: [
          {
            title: 'Native',
            subtitle: 'Built for one platform',
            tone: 'olive',
            items: [
              'Android: .apk / .aab file. iOS: .ipa file.',
              'Fast and can use camera, GPS, sensors.',
              'Test on both platforms separately.',
            ],
          },
          {
            title: 'Hybrid',
            subtitle: 'Web inside a native wrapper',
            tone: 'honey',
            items: [
              'HTML, CSS and JavaScript in a WebView container.',
              'One codebase for Android and iOS.',
              'Tests may switch between native and web contexts.',
            ],
          },
          {
            title: 'Mobile web',
            subtitle: 'Website in the browser',
            tone: 'rose',
            items: [
              'Opened in Chrome or Safari on the phone.',
              'No install, no app store.',
              'Check responsive layout and touch targets.',
            ],
          },
        ],
      },
      { type: 'heading', value: 'Where to run tests' },
      {
        type: 'table',
        headers: ['', 'Emulator / Simulator', 'Real device'],
        rows: [
          ['Cost', 'Free', 'You must buy devices or rent a device cloud'],
          ['Speed to start', 'Fast to create many versions', 'Slower to set up and maintain'],
          ['Hardware (camera, GPS, sensors, battery)', 'Faked or limited', 'Real behaviour'],
          ['Performance and heat', 'Uses your computer power, so not realistic', 'Realistic'],
          ['Best for', 'Early testing, automation in CI, many OS versions', 'Final checks before release, hardware features, real networks'],
        ],
      },
      {
        type: 'alert',
        value:
          'Use both. Emulators and simulators are great for fast, early checks. Real hardware reveals issues emulators miss, such as camera bugs, touch problems, memory limits and battery drain.',
      },
      { type: 'heading', value: 'Mobile-specific checks' },
      {
        type: 'table',
        headers: ['Area', 'What to check', 'ShopEasy example'],
        rows: [
          ['Interrupts', 'Call, SMS, notification, alarm during use', 'A call arrives during checkout. After the call, the cart is still full.'],
          ['Network', 'Wi-Fi to 4G switch, slow 3G, airplane mode', 'Search shows a friendly "No connection" message offline.'],
          ['Orientation', 'Portrait to landscape and back', 'Typed address is not lost when the phone rotates.'],
          ['Permissions', 'Allow, deny, "only this time", revoke later', 'Denying camera access still lets the user type a card number.'],
          ['Battery and resources', 'Low battery, battery saver, low storage', 'App does not crash in battery saver mode.'],
          ['Background and resume', 'Home button, app switcher, lock screen', 'Returning after 5 minutes keeps the user logged in.'],
          ['Screens and gestures', 'Small and large screens, swipe, pinch, long press', 'Buttons are big enough to tap on a small phone.'],
          ['Install and update', 'Fresh install, update from old version, uninstall', 'Saved wishlist survives an app update.'],
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy mobile test ideas',
        value:
          '1) Add shoes to cart, press Home, open the app again: cart still has 1 item. 2) Turn on airplane mode, tap Pay: app shows an error, not a crash. 3) Rotate the phone on the address form: text stays. 4) Deny location permission: user can still type the delivery address.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Pick a shopping app on your own phone.',
          'Add an item to the cart, then call your phone from another phone. Check the cart after the call.',
          'Turn on airplane mode and try to search. Write down what the app shows.',
          'Rotate the phone while typing in a form. Note if any text is lost.',
          'Write each result as a short test case: steps, expected result, actual result.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which app type uses HTML, CSS and JS inside a native wrapper? (Hybrid app)',
          'Why test on real devices as well as emulators? (Real hardware reveals issues emulators miss)',
          'Name two mobile interrupts. (For example an incoming call and a low battery warning)',
          'What is fragmentation? (The large number of different devices, screens and OS versions)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Testing a website on a laptop is like testing a car in a quiet parking lot. Mobile testing is testing the same car in rain, traffic and on bumpy roads, because that is where people really drive it.',
    },
    mistakes: [
      'Testing only on emulators and never on a real device before release.',
      'Testing only on the newest, most expensive phone.',
      'Forgetting interrupts, network changes and rotation.',
      'Testing only the "Allow" path for permissions and never "Deny".',
    ],
    takeaways: [
      'Mobile apps come in three types: native, hybrid and mobile web.',
      'Emulators and simulators are fast and free; real devices show real hardware behaviour.',
      'Interrupt testing (calls, SMS, low battery) is vital for mobile apps.',
      'Also check network changes, orientation, permissions and background/resume.',
      'Choose test devices based on what your real users own.',
    ],
  },

  'm11-l2': {
    id: 'm11-l2',
    title: 'Lesson 11.2 Android Testing',
    objectives: [
      'Create and start an Android emulator with Android Studio.',
      'Use basic adb commands to install, launch and inspect apps.',
      'Connect a real Android device with USB debugging.',
      'Simulate calls, SMS, network and permission changes.',
    ],
    theory:
      'Android apps are packaged as APK (or AAB) files. You test them on emulators from Android Studio or on real devices, and control both from the command line with ADB (Android Debug Bridge).',
    blocks: [
      {
        type: 'text',
        value:
          'Android runs on thousands of phone models from many brands. To test an Android app you need a device (virtual or real), the app file, and a tool to talk to the device. That tool is ADB.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['APK', 'Android Package. The file you install on a device. (AAB is the upload format for Google Play.)'],
          ['Android Studio', 'The official tool to build Android apps. It includes the SDK and the emulator.'],
          ['SDK', 'Software Development Kit. Tools such as adb and the emulator.'],
          ['AVD', 'Android Virtual Device. One emulator configuration, e.g. Pixel 7 with Android 14.'],
          ['ADB', 'Android Debug Bridge. A command line tool that controls emulators and real devices.'],
          ['Package name', 'The unique id of an app, e.g. com.shopeasy.app.'],
          ['Activity', 'One screen of an Android app, e.g. .MainActivity.'],
          ['Logcat', 'The live system and app log of an Android device.'],
        ],
      },
      { type: 'heading', value: 'Set up an emulator' },
      {
        type: 'steps',
        title: 'Android emulator setup',
        steps: [
          { label: 'Install Android Studio', text: 'It installs the Android SDK, platform-tools (adb) and the emulator.' },
          { label: 'Add platform-tools to PATH', text: 'So you can type adb in any terminal. The SDK is usually in ~/Library/Android/sdk (macOS) or %LOCALAPPDATA%\\Android\\Sdk (Windows).' },
          { label: 'Open Device Manager', text: 'In Android Studio: Tools > Device Manager > Create Virtual Device.' },
          { label: 'Choose hardware and system image', text: 'For example Pixel 7 with Android 14 (API 34).' },
          { label: 'Start the emulator', text: 'Click the play button, or run emulator -avd <name> in a terminal.' },
          { label: 'Check the connection', text: 'Run adb devices. You should see emulator-5554 device.' },
        ],
      },
      { type: 'heading', value: 'adb basics' },
      {
        type: 'code',
        language: 'bash',
        value: `# List connected emulators and real devices
adb devices
# List of devices attached
# emulator-5554   device

# Install, reinstall (-r keeps data) and uninstall the app
adb install shopeasy.apk
adb install -r shopeasy.apk
adb uninstall com.shopeasy.app

# Launch a screen of the app
adb shell am start -n com.shopeasy.app/.MainActivity

# Clear app data (like a fresh install)
adb shell pm clear com.shopeasy.app

# Take a screenshot and copy it to your computer
adb shell screencap -p /sdcard/cart.png
adb pull /sdcard/cart.png

# Watch the logs (Ctrl+C to stop); filter errors only
adb logcat *:E

# When more than one device is connected, choose one with -s
adb -s emulator-5554 install shopeasy.apk`,
      },
      { type: 'heading', value: 'Simulating real-life conditions' },
      {
        type: 'code',
        language: 'bash',
        value: `# Emulator only: fake an incoming call, then end it
adb emu gsm call 5551234
adb emu gsm cancel 5551234

# Emulator only: receive an SMS
adb emu sms send 5551234 "Your ShopEasy code is 4821"

# Emulator only: set battery to 5 percent
adb emu power capacity 5

# Turn Wi-Fi and mobile data off, then on again
adb shell svc wifi disable
adb shell svc data disable
adb shell svc wifi enable

# Grant or revoke a runtime permission
adb shell pm grant com.shopeasy.app android.permission.CAMERA
adb shell pm revoke com.shopeasy.app android.permission.CAMERA

# Press the Home button (send app to background)
adb shell input keyevent KEYCODE_HOME`,
      },
      { type: 'heading', value: 'Connect a real Android device' },
      {
        type: 'steps',
        steps: [
          { label: 'Enable Developer options', text: 'Settings > About phone > tap Build number 7 times.' },
          { label: 'Turn on USB debugging', text: 'Settings > System > Developer options > USB debugging.' },
          { label: 'Connect with a USB cable', text: 'Use a data cable, not a charge-only cable.' },
          { label: 'Accept the prompt on the phone', text: 'Tap "Allow USB debugging" and trust this computer.' },
          { label: 'Run adb devices', text: 'The device serial number appears with the word device. If it says unauthorized, accept the prompt again.' },
        ],
      },
      {
        type: 'compare',
        columns: [
          {
            title: 'Emulator',
            tone: 'olive',
            items: [
              'Free; create any Android version.',
              'adb emu commands fake calls, SMS, battery.',
              'Great for automation in CI.',
            ],
          },
          {
            title: 'Real device',
            tone: 'honey',
            items: [
              'Real camera, fingerprint, GPS, battery.',
              'Brand changes (Samsung, Xiaomi) can cause bugs.',
              'Needed before release.',
            ],
          },
        ],
      },
      {
        type: 'example',
        title: 'ShopEasy: interrupt test on the emulator',
        value:
          'Steps: 1) adb install shopeasy.apk. 2) Log in and add Running Shoes to the cart. 3) Open checkout. 4) Run adb emu gsm call 5551234 and wait 10 seconds. 5) Run adb emu gsm cancel 5551234. Expected: the app returns to checkout, the cart still shows 1 item, and no crash appears in adb logcat *:E.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create a Pixel emulator in Android Studio and start it.',
          'Run adb devices and write down the device name.',
          'Install any sample APK, launch it and take a screenshot with adb.',
          'Fake an incoming call and an SMS while the app is open.',
          'Revoke a permission and see how the app reacts next time it needs it.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which tool connects and manages Android devices from the command line? (ADB, Android Debug Bridge)',
          'Which command installs an app? (adb install shopeasy.apk)',
          'What must you enable on a real phone before adb can see it? (Developer options and USB debugging)',
          'How do you fake a call on the emulator? (adb emu gsm call <number>)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'ADB is a long cable with a keyboard at your end and the phone at the other end. Whatever you type on your computer, the phone does: install, open, screenshot, turn off Wi-Fi.',
    },
    mistakes: [
      'Forgetting to add platform-tools to PATH, so the adb command is "not found".',
      'Running adb commands with two devices connected and no -s serial.',
      'Using adb emu commands on a real device; they only work on emulators.',
      'Testing only on a Google Pixel emulator and never on popular brands your users own.',
      'Not clearing app data between tests, so old login state hides bugs.',
    ],
    takeaways: [
      'Android testing targets APK packages on emulators or real devices.',
      'Create emulators (AVDs) in Android Studio Device Manager.',
      'ADB command line utility controls and installs apps on targets.',
      'adb emu and adb shell commands simulate calls, SMS, battery, network and permissions.',
      'Real devices need Developer options and USB debugging turned on.',
    ],
  },

  'm11-l3': {
    id: 'm11-l3',
    title: 'Lesson 11.3 iOS Testing',
    objectives: [
      'Explain the tools needed for iOS testing: macOS, Xcode and Simulator.',
      'Control the iOS Simulator with xcrun simctl.',
      'Understand signing, real devices and TestFlight beta testing.',
    ],
    theory:
      'iOS apps are tested with Xcode on a Mac. The Simulator runs iOS screens on macOS but does not copy real hardware. Real devices need signed builds (IPA), and TestFlight shares beta builds with testers.',
    blocks: [
      {
        type: 'text',
        value:
          'Apple controls both the iPhone hardware and iOS. This means fewer device types than Android, but stricter rules. You need a Mac for almost all iOS testing work, and apps must be signed before they run on a real iPhone.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Xcode', 'Apple development tool for macOS. It includes the iOS Simulator and testing tools.'],
          ['Simulator', 'Runs iOS apps on a Mac. It imitates the screen and OS, not the real hardware.'],
          ['.app', 'An app build. A simulator build runs only in the Simulator.'],
          ['IPA', 'iOS App Store Package. A signed file you install on real devices.'],
          ['Code signing', 'Apple digital signature that allows an app to run on a device.'],
          ['Provisioning profile', 'A file that lists which devices and developers may run a build.'],
          ['UDID', 'The unique id of an iPhone or iPad.'],
          ['TestFlight', 'Apple service to send beta builds to internal and external testers.'],
          ['Bundle id', 'The unique app id, e.g. com.shopeasy.app.'],
        ],
      },
      { type: 'heading', value: 'Set up the Simulator' },
      {
        type: 'steps',
        steps: [
          { label: 'Use a Mac', text: 'Xcode and the iOS Simulator only run on macOS.' },
          { label: 'Install Xcode', text: 'From the Mac App Store. Open it once to install extra components.' },
          { label: 'Install command line tools', text: 'Run xcode-select --install in Terminal.' },
          { label: 'Add simulator runtimes', text: 'Xcode > Settings > Platforms (Components) > download an iOS version.' },
          { label: 'Open the Simulator', text: 'Xcode > Open Developer Tool > Simulator, or use xcrun simctl.' },
          { label: 'Get a simulator build', text: 'Ask developers for a .app built for the simulator (an IPA for devices will not install).' },
        ],
      },
      { type: 'heading', value: 'simctl basics' },
      {
        type: 'code',
        language: 'bash',
        value: `# List all simulators and their state
xcrun simctl list devices

# Boot a simulator and open the Simulator app window
xcrun simctl boot "iPhone 15"
open -a Simulator

# Install and launch the app ("booted" = the running simulator)
xcrun simctl install booted ShopEasy.app
xcrun simctl launch booted com.shopeasy.app

# Open a deep link to a product page
xcrun simctl openurl booted "shopeasy://product/rs-42"

# Grant or revoke permissions
xcrun simctl privacy booted grant photos com.shopeasy.app
xcrun simctl privacy booted revoke location com.shopeasy.app

# Take a screenshot
xcrun simctl io booted screenshot checkout.png

# Show a low battery in the status bar (visual only)
xcrun simctl status_bar booted override --batteryLevel 5 --batteryState discharging

# Uninstall and reset
xcrun simctl uninstall booted com.shopeasy.app
xcrun simctl erase "iPhone 15"`,
      },
      {
        type: 'alert',
        value:
          'The Simulator is not a real iPhone. It uses the Mac processor and memory. It has no real camera, no real cellular network, no real calls, and push notifications and Face ID are only simulated. Check these on real devices.',
      },
      { type: 'heading', value: 'Simulator vs real device vs TestFlight' },
      {
        type: 'table',
        headers: ['', 'Simulator', 'Real device (via Xcode)', 'TestFlight'],
        rows: [
          ['Needs', 'Mac + Xcode', 'Mac + Xcode + Apple developer account + signed build', 'App Store Connect account; testers install the TestFlight app'],
          ['Build type', 'Simulator .app', 'Development-signed IPA / app', 'Build uploaded to App Store Connect'],
          ['Hardware', 'Imitated', 'Real', 'Real, on testers own phones'],
          ['Good for', 'Fast UI checks and automation', 'Camera, performance, gestures, debugging', 'Beta testing by many people before release'],
          ['Limits', 'No real calls, camera, sensors', 'Devices must be in the provisioning profile', 'External testers need Beta App Review; builds expire after 90 days'],
        ],
      },
      { type: 'heading', value: 'Testing on a real iPhone' },
      {
        type: 'steps',
        steps: [
          { label: 'Connect the iPhone to the Mac', text: 'Tap Trust This Computer on the phone.' },
          { label: 'Turn on Developer Mode', text: 'iOS 16+: Settings > Privacy & Security > Developer Mode, then restart.' },
          { label: 'Register the device', text: 'Its UDID must be in the provisioning profile (Xcode can do this automatically).' },
          { label: 'Install the signed build', text: 'Run from Xcode, or drag the IPA into Xcode > Window > Devices and Simulators.' },
          { label: 'Watch logs', text: 'Use Xcode Devices window or the Console app on the Mac.' },
        ],
      },
      { type: 'heading', value: 'Inspecting iOS elements' },
      {
        type: 'text',
        value:
          'To write automated tests you need element names. Xcode (Accessibility Inspector and the view debugger) and Appium Inspector show each element, its accessibility id, label and type. Ask developers to add accessibility identifiers such as "addToCartButton"; they are the most stable locators.',
      },
      {
        type: 'example',
        title: 'ShopEasy: iOS permission test',
        value:
          '1) xcrun simctl install booted ShopEasy.app. 2) Launch the app and open Profile > Change photo. 3) Tap "Don\'t Allow" when asked for Photos access. Expected: the app shows "Allow photo access in Settings" with a button, and does not crash. 4) xcrun simctl privacy booted grant photos com.shopeasy.app and try again. Expected: the photo picker opens.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'On a Mac, install Xcode and boot an iPhone simulator.',
          'Open Safari in the simulator and load a shopping website.',
          'Rotate the simulator (Cmd + Left arrow) and check the layout.',
          'Use simctl to take a screenshot and to override the battery level.',
          'Write three test cases that must be run on a real iPhone, not the simulator.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which computer do you need to run the iOS Simulator? (A Mac with Xcode)',
          'Can a device IPA be installed in the Simulator? (No, you need a simulator .app build)',
          'What is TestFlight used for? (Sending beta builds to testers)',
          'What tool is commonly used to inspect iOS app elements? (Xcode with Appium Inspector)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'The iOS Simulator is a flight simulator. It is perfect for practising the controls, but you still need a real flight (a real iPhone) to feel the weather, the engine and the bumps.',
    },
    mistakes: [
      'Trusting only the Simulator for camera, push notifications, performance and battery tests.',
      'Trying to install a device IPA on the Simulator, or a simulator build on an iPhone.',
      'Forgetting to register a new test iPhone in the provisioning profile.',
      'Letting TestFlight builds expire in the middle of a test cycle.',
    ],
    takeaways: [
      'iOS testing targets IPA packages and requires Xcode on macOS.',
      'Simulators mimic iOS interfaces without duplicating hardware behaviors.',
      'xcrun simctl installs apps, grants permissions and takes screenshots in the Simulator.',
      'Real devices need code signing, a provisioning profile and Developer Mode.',
      'TestFlight distributes beta builds to internal and external testers.',
      'Use Xcode and Appium Inspector to find accessibility ids for automation.',
    ],
  },

  'm11-l4': {
    id: 'm11-l4',
    title: 'Lesson 11.4 Appium Introduction',
    objectives: [
      'Explain what Appium is and how it relates to Selenium WebDriver.',
      'Install Appium 2 and its platform drivers.',
      'Use Appium Inspector to find mobile elements.',
    ],
    theory:
      'Appium is an open-source tool that uses the WebDriver protocol to automate mobile apps. Appium 2 is a server with separately installed drivers (UiAutomator2 for Android, XCUITest for iOS), so one API works for both platforms.',
    blocks: [
      {
        type: 'text',
        value:
          'You already know Selenium WebDriver for browsers. Appium brings the same idea to phones. Your test sends WebDriver commands to an Appium server. The server passes them to a driver that controls the Android or iOS device. You can write tests in any language with a WebDriver client, such as Java, Python, JavaScript or C#.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Appium server', 'A Node.js program that receives test commands (default port 4723).'],
          ['Appium driver', 'A plugin for one platform. Appium 2 installs them separately.'],
          ['UiAutomator2', 'The Appium driver for Android. Uses Google UiAutomator.'],
          ['XCUITest', 'The Appium driver for iOS. Uses Apple XCUITest and WebDriverAgent.'],
          ['Client library', 'The library in your test language, e.g. Appium java-client.'],
          ['Capabilities', 'Settings sent at the start of a session: platform, device, app path.'],
          ['Session', 'One connection between your test and one device.'],
          ['Appium Inspector', 'A desktop app that shows the screen and element attributes, like DevTools for mobile.'],
        ],
      },
      { type: 'heading', value: 'How Appium works' },
      {
        type: 'steps',
        title: 'From your test to the phone',
        steps: [
          { label: 'Test code (Java)', text: 'driver.findElement(AppiumBy.accessibilityId("loginButton")).click();' },
          { label: 'Appium java-client', text: 'Turns the call into a W3C WebDriver HTTP request.' },
          { label: 'Appium server (port 4723)', text: 'Receives the request and picks the driver from the session capabilities.' },
          { label: 'Driver (UiAutomator2 or XCUITest)', text: 'Translates the command for Android or iOS automation frameworks.' },
          { label: 'Device', text: 'The emulator, simulator or real phone performs the tap.' },
        ],
      },
      { type: 'heading', value: 'Install Appium 2' },
      {
        type: 'steps',
        steps: [
          { label: 'Install Node.js (LTS)', text: 'Appium is distributed through npm.' },
          { label: 'Install the Appium server', text: 'npm install -g appium' },
          { label: 'Install drivers separately', text: 'Appium 2 has no drivers built in. Install UiAutomator2 and/or XCUITest.' },
          { label: 'Check the setup', text: 'appium driver doctor uiautomator2 reports missing tools such as ANDROID_HOME or JAVA_HOME.' },
          { label: 'Start the server', text: 'Run appium. It listens on http://127.0.0.1:4723 (no /wd/hub path in Appium 2).' },
          { label: 'Install Appium Inspector', text: 'Download the desktop app from the Appium Inspector GitHub releases page.' },
        ],
      },
      {
        type: 'code',
        language: 'bash',
        value: `npm install -g appium
appium -v

# Drivers are installed separately in Appium 2
appium driver install uiautomator2     # Android
appium driver install xcuitest         # iOS (macOS only)
appium driver list --installed

# Check environment for a driver
appium driver doctor uiautomator2

# Start the server (default: http://127.0.0.1:4723)
appium`,
      },
      {
        type: 'warning',
        value:
          'Appium 1 tutorials use the URL http://localhost:4723/wd/hub and DesiredCapabilities. Appium 2 uses http://127.0.0.1:4723 by default, and java-client 9 uses option classes like UiAutomator2Options. Old code often fails with "resource could not be found".',
      },
      { type: 'heading', value: 'Mobile locator strategies' },
      {
        type: 'table',
        headers: ['Locator', 'Java example', 'Notes'],
        rows: [
          ['Accessibility id', 'AppiumBy.accessibilityId("addToCart")', 'Best choice. Works on Android (content-desc) and iOS (accessibilityIdentifier).'],
          ['id (Android)', 'AppiumBy.id("com.shopeasy.app:id/search_box")', 'Android resource-id. Stable and fast.'],
          ['iOS predicate', 'AppiumBy.iOSNsPredicateString("label == \'Checkout\'")', 'Fast iOS-only query.'],
          ['UiAutomator (Android)', 'AppiumBy.androidUIAutomator("new UiSelector().text(\\"Cart\\")")', 'Powerful Android-only query, e.g. scrolling into view.'],
          ['XPath', 'AppiumBy.xpath("//android.widget.Button[@text=\'Pay\']")', 'Last choice. Slow on mobile and breaks easily.'],
        ],
      },
      { type: 'heading', value: 'Using Appium Inspector' },
      {
        type: 'steps',
        steps: [
          { label: 'Start the emulator and the Appium server', text: 'adb devices shows the emulator; appium is running.' },
          { label: 'Open Appium Inspector', text: 'Set Remote Host 127.0.0.1, port 4723, path /.' },
          { label: 'Enter capabilities as JSON', text: 'For example platformName Android, appium:automationName UiAutomator2, appium:app path to the APK.' },
          { label: 'Start Session', text: 'A screenshot of the app appears.' },
          { label: 'Click an element', text: 'The right panel shows accessibility id, resource-id, text and a suggested locator.' },
        ],
      },
      {
        type: 'code',
        language: 'json',
        value: `{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:app": "/Users/maria/apps/shopeasy.apk"
}`,
      },
      {
        type: 'compare',
        columns: [
          {
            title: 'Selenium WebDriver',
            tone: 'olive',
            items: ['Automates web browsers.', 'Browser drivers: chromedriver, geckodriver.', 'Locators: id, CSS, XPath.'],
          },
          {
            title: 'Appium',
            tone: 'honey',
            items: [
              'Automates native, hybrid and mobile web apps.',
              'Appium drivers: UiAutomator2, XCUITest.',
              'Locators: accessibility id, resource-id, predicates, XPath.',
            ],
          },
        ],
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Install Node.js and Appium 2, then install the uiautomator2 driver.',
          'Run appium driver doctor uiautomator2 and fix anything it reports.',
          'Start an emulator and the Appium server.',
          'Open Appium Inspector with the JSON capabilities and start a session on any APK.',
          'Find the accessibility id of three buttons and write them down.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'What is the main advantage of Appium? (It is cross-platform: the same API for Android and iOS tests)',
          'Which language does Appium require? (Any language with a WebDriver client)',
          'Which command installs the Android driver? (appium driver install uiautomator2)',
          'Which locator should you try first on mobile? (Accessibility id)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Appium is a translator at a meeting. You speak one language (WebDriver commands). The translator has two interpreters (drivers): one who speaks Android and one who speaks iOS.',
    },
    mistakes: [
      'Following Appium 1 guides: using /wd/hub in the URL or expecting drivers to be built in.',
      'Forgetting to install a driver, then getting "Could not find a driver for automationName".',
      'Using long XPath locators instead of accessibility ids.',
      'Not setting ANDROID_HOME and JAVA_HOME, so the UiAutomator2 driver cannot start.',
    ],
    takeaways: [
      'Appium extends the WebDriver protocol to mobile actions (taps, swipes, typing).',
      'Appium 2 is a server; drivers like uiautomator2 and xcuitest are installed separately.',
      'Appium works across Android and iOS platforms with the same API, in any WebDriver client language.',
      'Appium Inspector shows element attributes and suggests locators.',
      'Prefer accessibility id locators; use XPath last.',
    ],
  },

  'm11-l5': {
    id: 'm11-l5',
    title: 'Lesson 11.5 Mobile Automation',
    objectives: [
      'Set up a Maven project with the Appium java-client 9.',
      'Start an Android session with UiAutomator2Options (and iOS with XCUITestOptions).',
      'Automate taps, typing, swipes and waits in the ShopEasy app.',
      'Automate mobile checks: background, orientation, network and permissions.',
    ],
    theory:
      'A mobile test first sends capabilities to the Appium server to start a session on a device. In java-client 9 you set capabilities with option classes like UiAutomator2Options, then find elements and tap, type and swipe.',
    blocks: [
      {
        type: 'text',
        value:
          'In this lesson you write a real Appium test in Java. It opens the ShopEasy Android app, logs in, searches, adds a product to the cart and checks the cart. Then you add mobile-only checks like rotating the screen and sending the app to the background.',
      },
      { type: 'heading', value: 'Key terms' },
      {
        type: 'table',
        headers: ['Term', 'Simple meaning'],
        rows: [
          ['Capabilities', 'Key-value settings that tell Appium which platform, device and app to use.'],
          ['DesiredCapabilities', 'The older, generic way to set capabilities. Still exists, but options classes are preferred.'],
          ['UiAutomator2Options', 'A java-client class with typed setters for Android capabilities.'],
          ['XCUITestOptions', 'The same idea for iOS.'],
          ['AndroidDriver / IOSDriver', 'The Java driver objects that start a session and send commands.'],
          ['appPackage / appActivity', 'The Android app id and the screen to open first.'],
          ['W3C Actions', 'A standard way to describe finger movements such as swipes.'],
        ],
      },
      { type: 'heading', value: 'Project setup' },
      {
        type: 'steps',
        steps: [
          { label: 'Java 17+ and Maven', text: 'Same as the Selenium project in Module 8.' },
          { label: 'Add java-client 9', text: 'It brings a compatible Selenium version with it. Do not add a different selenium-java version on top.' },
          { label: 'Start an emulator', text: 'adb devices must show it.' },
          { label: 'Start the Appium server', text: 'Run appium in a terminal (uiautomator2 driver installed).' },
          { label: 'Put the APK in the project', text: 'For example src/test/resources/shopeasy.apk.' },
        ],
      },
      {
        type: 'code',
        language: 'xml',
        value: `<dependency>
  <groupId>io.appium</groupId>
  <artifactId>java-client</artifactId>
  <version>9.3.0</version>
</dependency>
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.11.0</version>
  <scope>test</scope>
</dependency>`,
      },
      { type: 'heading', value: 'Capabilities: old way and new way' },
      {
        type: 'code',
        language: 'java',
        value: `// Older style (Appium 1 era). You will still see it in many tutorials.
DesiredCapabilities caps = new DesiredCapabilities();
caps.setCapability("platformName", "Android");
caps.setCapability("appium:automationName", "UiAutomator2");
caps.setCapability("appium:deviceName", "emulator-5554");

// Recommended in java-client 9: typed options (platformName and automationName are set for you)
UiAutomator2Options options = new UiAutomator2Options()
        .setUdid("emulator-5554")
        .setApp(new File("src/test/resources/shopeasy.apk").getAbsolutePath())
        .setAutoGrantPermissions(false)
        .setNewCommandTimeout(Duration.ofSeconds(60));`,
      },
      { type: 'heading', value: 'Worked example: ShopEasy Android test' },
      {
        type: 'code',
        language: 'java',
        value: `import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.net.URI;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ShopEasyCartTest {
    private AndroidDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void startSession() throws Exception {
        UiAutomator2Options options = new UiAutomator2Options()
                .setUdid("emulator-5554")
                .setApp(new File("src/test/resources/shopeasy.apk").getAbsolutePath());

        driver = new AndroidDriver(URI.create("http://127.0.0.1:4723").toURL(), options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test
    void addShoesToCart() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                AppiumBy.accessibilityId("emailField"))).sendKeys("maria@shopeasy.test");
        driver.findElement(AppiumBy.accessibilityId("passwordField")).sendKeys("Secret123!");
        driver.findElement(AppiumBy.accessibilityId("loginButton")).click();

        WebElement search = wait.until(ExpectedConditions.elementToBeClickable(
                AppiumBy.id("com.shopeasy.app:id/search_box")));
        search.sendKeys("running shoes");
        driver.findElement(AppiumBy.accessibilityId("searchButton")).click();

        wait.until(ExpectedConditions.elementToBeClickable(
                AppiumBy.accessibilityId("addToCart-rs-42"))).click();

        WebElement badge = driver.findElement(AppiumBy.accessibilityId("cartBadge"));
        wait.until(ExpectedConditions.textToBePresentInElement(badge, "1"));
        assertEquals("1", badge.getText());
    }

    @AfterEach
    void endSession() {
        if (driver != null) {
            driver.quit();
        }
    }
}`,
      },
      {
        type: 'syntax',
        title: 'Line by line',
        parts: [
          { clause: 'new UiAutomator2Options()', text: 'Creates Android capabilities. It already sets platformName=Android and automationName=UiAutomator2.' },
          { clause: '.setUdid("emulator-5554")', text: 'Chooses the device shown by adb devices.' },
          { clause: '.setApp(absolutePath)', text: 'Appium installs this APK and opens it.' },
          { clause: 'new AndroidDriver(URI.create(...).toURL(), options)', text: 'Connects to the Appium 2 server and starts the session.' },
          { clause: 'AppiumBy.accessibilityId("emailField")', text: 'Finds the element by its accessibility id, the most stable mobile locator.' },
          { clause: 'new WebDriverWait(driver, Duration.ofSeconds(15))', text: 'The same explicit wait you learned in Selenium. Mobile apps also load data slowly.' },
          { clause: 'driver.quit()', text: 'Ends the session so the device is free for the next test.' },
        ],
      },
      { type: 'heading', value: 'Swipe with W3C Actions' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.Dimension;
import org.openqa.selenium.interactions.PointerInput;
import org.openqa.selenium.interactions.Sequence;
import java.util.List;

Dimension size = driver.manage().window().getSize();
int x = size.getWidth() / 2;
int startY = (int) (size.getHeight() * 0.8);   // near the bottom
int endY = (int) (size.getHeight() * 0.2);     // near the top

PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence swipeUp = new Sequence(finger, 1);
swipeUp.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), x, startY));
swipeUp.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
swipeUp.addAction(finger.createPointerMove(Duration.ofMillis(600), PointerInput.Origin.viewport(), x, endY));
swipeUp.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

driver.perform(List.of(swipeUp));   // scrolls the product list down`,
      },
      {
        type: 'syntax',
        title: 'The swipe in plain words',
        parts: [
          { clause: 'PointerInput.Kind.TOUCH', text: 'Pretend to be a finger, not a mouse.' },
          { clause: 'createPointerMove(Duration.ZERO, ..., x, startY)', text: 'Put the finger above the screen at the start point.' },
          { clause: 'createPointerDown(...)', text: 'Touch the screen.' },
          { clause: 'createPointerMove(Duration.ofMillis(600), ..., x, endY)', text: 'Slide up over 0.6 seconds.' },
          { clause: 'createPointerUp(...)', text: 'Lift the finger.' },
        ],
      },
      { type: 'heading', value: 'Automating mobile-specific checks' },
      {
        type: 'code',
        language: 'java',
        value: `import org.openqa.selenium.ScreenOrientation;

// Background and resume: like pressing Home, waiting 5 s, then opening the app again
driver.runAppInBackground(Duration.ofSeconds(5));
wait.until(ExpectedConditions.textToBePresentInElementLocated(
        AppiumBy.accessibilityId("cartBadge"), "1"));

// Orientation: rotate, check the data is still there, rotate back
driver.rotate(ScreenOrientation.LANDSCAPE);
assertEquals("1", driver.findElement(AppiumBy.accessibilityId("cartBadge")).getText());
driver.rotate(ScreenOrientation.PORTRAIT);

// Terminate and relaunch the app (a cold start)
driver.terminateApp("com.shopeasy.app");
driver.activateApp("com.shopeasy.app");`,
      },
      {
        type: 'table',
        headers: ['Check', 'How to automate or trigger it'],
        rows: [
          ['Interrupt (call, SMS)', 'Emulator: adb emu gsm call 5551234 / adb emu sms send 5551234 "Hi" during the test.'],
          ['Network loss', 'adb shell svc wifi disable and adb shell svc data disable, then check the offline message.'],
          ['Orientation', 'driver.rotate(ScreenOrientation.LANDSCAPE), then verify data and layout.'],
          ['Permissions', 'setAutoGrantPermissions(false) to see the dialog; adb shell pm revoke to test "Deny".'],
          ['Background / resume', 'driver.runAppInBackground(Duration.ofSeconds(5)).'],
          ['Cold start', 'driver.terminateApp(...) then driver.activateApp(...).'],
        ],
      },
      { type: 'heading', value: 'The same test on iOS' },
      {
        type: 'code',
        language: 'java',
        value: `import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.ios.options.XCUITestOptions;

XCUITestOptions options = new XCUITestOptions()
        .setDeviceName("iPhone 15")
        .setPlatformVersion("17.5")
        .setApp("/Users/maria/apps/ShopEasy.app");

IOSDriver iosDriver = new IOSDriver(URI.create("http://127.0.0.1:4723").toURL(), options);
iosDriver.findElement(AppiumBy.accessibilityId("loginButton")).click();   // same locator!`,
      },
      {
        type: 'alert',
        value:
          'If developers use the same accessibility ids on Android and iOS, most of your test steps can be shared. Only the session setup (options and driver class) is different. A Page Object per screen keeps this clean.',
      },
      { type: 'heading', value: 'Try it yourself' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create the Maven project with java-client 9 and JUnit 5.',
          'Start an emulator and the Appium server, then run a test that only opens the app and prints driver.getPageSource() length.',
          'Add the login steps using accessibility ids from Appium Inspector.',
          'Add a swipe up and check a product lower in the list becomes visible.',
          'Add a background-and-resume check and a rotation check for the cart badge.',
        ],
      },
      { type: 'heading', value: 'Check your understanding' },
      {
        type: 'list',
        ordered: true,
        items: [
          'What do capabilities do? (Set up the connection profile: platform, device and app for the session)',
          'Which class sets Android capabilities in java-client 9? (UiAutomator2Options)',
          'What is the default Appium 2 server URL? (http://127.0.0.1:4723)',
          'How do you send the app to the background for 5 seconds? (driver.runAppInBackground(Duration.ofSeconds(5)))',
          'Which API performs a swipe? (W3C Actions with PointerInput and Sequence)',
        ],
      },
    ],
    callout: {
      lead: 'Think of it like this:',
      text: 'Capabilities are the booking form at a hotel: which city (platform), which room (device) and which luggage (app). Once the booking is confirmed (session starts), you can use the room: tap, type and swipe.',
    },
    mistakes: [
      'Mixing DesiredCapabilities from old tutorials with Appium 2 URLs like /wd/hub.',
      'Adding a separate selenium-java version that conflicts with the one java-client needs.',
      'Using Thread.sleep() instead of WebDriverWait on slow mobile screens.',
      'Using the deprecated TouchAction class for swipes instead of W3C Actions.',
      'Forgetting driver.quit(), which leaves the device busy for the next test.',
    ],
    takeaways: [
      'Automation scripts send capabilities to start a session on a device.',
      'Capabilities establish the connection profile between script and device; java-client 9 uses UiAutomator2Options and XCUITestOptions.',
      'Connect to Appium 2 at http://127.0.0.1:4723 with AndroidDriver or IOSDriver.',
      'Use AppiumBy.accessibilityId locators and explicit waits.',
      'Swipes use W3C Actions (PointerInput + Sequence).',
      'Automate mobile checks: background/resume, rotation, network, permissions.',
    ],
  },
};
