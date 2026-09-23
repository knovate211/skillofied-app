import type { Lesson } from '../TestingCourseData';

/**
 * Expanded beginner lessons for Module 9 (Test Automation Frameworks)
 * and Module 13 (CI/CD for Testers).
 */
export const modules9And13Lessons: Record<string, Lesson> = {
  // ---------------------------------------------------------------------------
  // MODULE 9: TEST AUTOMATION FRAMEWORKS
  // ---------------------------------------------------------------------------
  'm9-l1': {
    id: 'm9-l1',
    title: 'Lesson 9.1 TestNG',
    objectives: [
      "Explain what TestNG is and why testers use it.",
      "Use the main TestNG annotations: @Test, @BeforeMethod, @AfterMethod and @DataProvider.",
      "Control test order and grouping with priority, groups and dependsOnMethods.",
      "Run a group of tests together, even in parallel, with a testng.xml file.",
    ],
    theory: "TestNG is a Java testing framework. It uses annotations to run, order, group and repeat tests, and a testng.xml file to organise whole test suites.",
    blocks: [
      { type: 'text', value: "When you write Selenium code, you still need something to run it. You need a tool that says: run this test first, run this setup before every test, and tell me which tests passed and which failed. That tool is a test framework. TestNG is one of the most popular test frameworks for Java testers." },
      { type: 'text', value: "The name means 'Test Next Generation'. It was built to add features that older tools did not have, such as test groups, test dependencies, data providers and parallel runs." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Framework', 'A ready-made structure with rules and tools. You add your tests into it.'],
        ['Annotation', 'A label that starts with @, placed above a method. It tells TestNG what the method is for.'],
        ['Assertion', 'A check that compares the actual result with the expected result. If they differ, the test fails.'],
        ['Test suite', 'A collection of tests that you run together.'],
        ['testng.xml', 'A file that lists which test classes to run and how to run them.'],
        ['Parallel run', 'Running several tests at the same time to save time.'],
      ] },
      { type: 'heading', value: 'The most useful annotations' },
      { type: 'table', headers: ['Annotation', 'When the method runs'], rows: [
        ['@Test', 'This method is a test.'],
        ['@BeforeMethod', 'Before every @Test method (for example: open the browser).'],
        ['@AfterMethod', 'After every @Test method (for example: close the browser).'],
        ['@BeforeClass / @AfterClass', 'Once before / after all tests in the class.'],
        ['@DataProvider', 'Gives several sets of data to one test method.'],
      ] },
      { type: 'heading', value: 'A first TestNG class for ShopEasy' },
      { type: 'text', value: "ShopEasy is a small online shop used in our examples. Users can log in, search products, add them to a cart and check out. Here is a TestNG class that tests some of these features." },
      { type: 'code', language: 'java', value: `package com.shopeasy.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class ShopEasyTest {

    private WebDriver driver;

    @BeforeMethod
    public void openBrowser() {
        driver = new ChromeDriver();          // Selenium 4 finds the driver for you
        driver.get("https://shopeasy.example.com");
    }

    @Test(priority = 1, groups = {"smoke"})
    public void loginTest() {
        driver.findElement(By.id("username")).sendKeys("anna");
        driver.findElement(By.id("password")).sendKeys("Secret123");
        driver.findElement(By.id("loginBtn")).click();
        Assert.assertEquals(driver.getTitle(), "ShopEasy - My Account");
    }

    @Test(priority = 2, groups = {"regression"}, dependsOnMethods = {"loginTest"})
    public void searchTest() {
        driver.findElement(By.id("search")).sendKeys("shoes");
        driver.findElement(By.id("searchBtn")).click();
        Assert.assertTrue(driver.getPageSource().contains("results"),
                "Search results should be shown");
    }

    @Test(priority = 3)
    public void homePageTest() {
        SoftAssert soft = new SoftAssert();
        soft.assertEquals(driver.getTitle(), "ShopEasy - Home");
        soft.assertTrue(driver.findElement(By.id("cartIcon")).isDisplayed());
        soft.assertAll();                     // reports ALL failed checks here
    }

    @DataProvider(name = "loginData")
    public Object[][] loginData() {
        return new Object[][] {
            {"anna", "Secret123", true},
            {"anna", "wrongPass", false}
        };
    }

    @Test(dataProvider = "loginData")
    public void loginWithData(String user, String pass, boolean shouldPass) {
        driver.findElement(By.id("username")).sendKeys(user);
        driver.findElement(By.id("password")).sendKeys(pass);
        driver.findElement(By.id("loginBtn")).click();
        boolean loggedIn = driver.getTitle().contains("My Account");
        Assert.assertEquals(loggedIn, shouldPass);
    }

    @AfterMethod
    public void closeBrowser() {
        driver.quit();
    }
}` },
      { type: 'heading', value: 'Line-by-line explanation' },
      { type: 'syntax', title: 'What the important lines do', parts: [
        { clause: '@BeforeMethod', text: 'openBrowser() runs before each test, so every test starts with a fresh browser.' },
        { clause: '@Test(priority = 1)', text: 'Lower priority numbers run first. Without priority, TestNG runs tests in alphabetical order of method name.' },
        { clause: 'groups = {"smoke"}', text: 'Puts the test in a group. You can later run only the smoke group.' },
        { clause: 'dependsOnMethods', text: 'searchTest runs only if loginTest passed. If loginTest fails, searchTest is SKIPPED, not failed.' },
        { clause: 'Assert.assertEquals', text: 'A hard assert. If it fails, the test stops at this line.' },
        { clause: 'SoftAssert', text: 'A soft assert collects failures and keeps going. assertAll() at the end reports them all.' },
        { clause: '@DataProvider', text: 'Returns rows of data. loginWithData runs once for each row (here, 2 times).' },
        { clause: '@AfterMethod', text: 'closeBrowser() runs after each test, even when the test fails.' },
      ] },
      { type: 'heading', value: 'Organising a suite with testng.xml' },
      { type: 'code', language: 'xml', value: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="ShopEasy Suite" parallel="classes" thread-count="3">
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="com.shopeasy.tests.ShopEasyTest"/>
            <class name="com.shopeasy.tests.CartTest"/>
        </classes>
    </test>
</suite>` },
      { type: 'text', value: "parallel=\"classes\" means each class can run at the same time in its own thread. thread-count=\"3\" means at most 3 threads at once. The <groups> part runs only tests in the smoke group." },
      { type: 'warning', value: "Parallel runs need each test to have its own WebDriver. If two threads share one driver variable, tests will click on each other's browser and fail randomly." },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create a class CartTest with two @Test methods: addToCart and removeFromCart.",
        "Give addToCart priority 1 and removeFromCart dependsOnMethods = {\"addToCart\"}.",
        "Make addToCart fail on purpose. Run the class and see that removeFromCart is marked as skipped.",
        "Add a @DataProvider with three product names and use it in a searchProduct test.",
        "Add CartTest to testng.xml and run the suite with parallel=\"classes\".",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Which annotation gives many data sets to one test? (@DataProvider)",
        "Which runs first: priority = 1 or priority = 2? (priority = 1)",
        "What happens to a test when the method it depends on fails? (It is skipped.)",
        "Why call assertAll() on a SoftAssert? (Without it, soft failures are never reported and the test passes.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "TestNG is like a school timetable. The timetable says which class comes first, which classes need a lab setup before them, and which students are in which group. The teachers (your test methods) just teach; the timetable organises everything." },
    mistakes: [
      "Forgetting to call soft.assertAll(), so soft assertion failures are silently ignored.",
      "Using priority for everything instead of making each test independent.",
      "Sharing one static WebDriver across tests while running them in parallel.",
      "Mixing up the TestNG Assert (org.testng.Assert) with the JUnit Assertions class in the same project.",
      "Writing the wrong package or class name in testng.xml, so TestNG cannot find the class.",
    ],
    takeaways: [
      "TestNG is a Java test framework that runs, orders and groups tests using annotations.",
      "@BeforeMethod and @AfterMethod give every test a clean start and a clean end.",
      "priority, groups and dependsOnMethods control which tests run and in what order.",
      "@DataProvider runs the same test with many data sets.",
      "Hard asserts stop the test; SoftAssert collects all failures until assertAll().",
      "testng.xml defines suites, groups and parallel execution.",
    ],
  },

  'm9-l2': {
    id: 'm9-l2',
    title: 'Lesson 9.2 JUnit Basics',
    objectives: [
      "Explain what JUnit 5 is and where it is used.",
      "Write tests with @Test, @BeforeEach, @AfterEach and the Assertions class.",
      "Run one test many times with @ParameterizedTest.",
      "Compare JUnit 5 with TestNG and choose the right one.",
    ],
    theory: "JUnit is the standard testing framework for Java. Developers use it for unit tests, and testers also use it to run Selenium tests with simple assertions like assertEquals().",
    blocks: [
      { type: 'text', value: "JUnit is the oldest and most widely used testing framework in the Java world. Almost every Java developer knows it. The current version family is JUnit 5, also called 'JUnit Jupiter'. It lives in the package org.junit.jupiter.api." },
      { type: 'text', value: "Developers mostly use JUnit for unit tests. A unit test checks one small piece of code, like one method, without a browser. Testers can also use JUnit to run Selenium UI tests." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Unit test', 'A test for one small piece of code, such as one method.'],
        ['JUnit Jupiter', 'The name of the JUnit 5 programming model (its annotations and classes).'],
        ['Assertions', 'The JUnit 5 class that holds checks like assertEquals and assertTrue.'],
        ['Parameterized test', 'One test method that runs many times with different input values.'],
        ['Expected / actual', 'Expected is what should happen. Actual is what really happened.'],
      ] },
      { type: 'heading', value: 'A simple JUnit 5 test' },
      { type: 'text', value: "Imagine ShopEasy has a Java class CartCalculator that adds item prices and applies a discount. Here is how a JUnit 5 test for it looks." },
      { type: 'code', language: 'java', value: `package com.shopeasy.unit;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class CartCalculatorTest {

    private CartCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new CartCalculator();     // new object before every test
    }

    @Test
    @DisplayName("Total of two items is the sum of prices")
    void totalOfTwoItems() {
        calculator.addItem(10.0);
        calculator.addItem(15.5);
        assertEquals(25.5, calculator.getTotal(), 0.001);
    }

    @Test
    void emptyCartHasZeroTotal() {
        assertAll("empty cart",
            () -> assertEquals(0.0, calculator.getTotal()),
            () -> assertTrue(calculator.isEmpty())
        );
    }

    @Test
    void negativePriceIsRejected() {
        assertThrows(IllegalArgumentException.class,
            () -> calculator.addItem(-5.0));
    }

    @ParameterizedTest
    @ValueSource(strings = {"SAVE10", "SAVE20", "WELCOME"})
    void validCouponsAreAccepted(String code) {
        assertTrue(calculator.isValidCoupon(code));
    }

    @ParameterizedTest
    @CsvSource({
        "100.0, 10, 90.0",
        "50.0,  20, 40.0"
    })
    void discountIsApplied(double price, int percent, double expected) {
        assertEquals(expected, calculator.applyDiscount(price, percent), 0.001);
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }
}` },
      { type: 'heading', value: 'Line-by-line explanation' },
      { type: 'syntax', parts: [
        { clause: 'import static ...Assertions.*', text: 'Lets you write assertEquals(...) instead of Assertions.assertEquals(...).' },
        { clause: '@BeforeEach', text: 'Runs before every test. It is the JUnit 5 name for TestNG @BeforeMethod.' },
        { clause: 'assertEquals(expected, actual, delta)', text: 'In JUnit, the EXPECTED value comes first. The delta 0.001 allows tiny decimal differences.' },
        { clause: 'assertAll', text: 'Runs all checks inside it and reports every failure together, similar to a soft assert.' },
        { clause: 'assertThrows', text: 'Passes only if the code throws the given exception.' },
        { clause: '@ParameterizedTest + @ValueSource', text: 'Runs the test once per value: 3 runs here.' },
        { clause: '@CsvSource', text: 'Each string is one row. Values are split by commas into the method parameters.' },
      ] },
      { type: 'warning', value: "Argument order is different! JUnit: assertEquals(expected, actual). TestNG: Assert.assertEquals(actual, expected). If you swap them, the failure message will say the wrong thing." },
      { type: 'heading', value: 'TestNG vs JUnit 5' },
      { type: 'compare', columns: [
        { title: 'TestNG', subtitle: 'Popular for UI automation suites', tone: 'olive', items: [
          '@BeforeMethod / @AfterMethod',
          '@DataProvider for many data sets',
          'Groups, priority and dependsOnMethods built in',
          'testng.xml controls suites and parallel runs',
          'Assert.assertEquals(actual, expected)',
        ] },
        { title: 'JUnit 5', subtitle: 'Standard for developer unit tests', tone: 'honey', items: [
          '@BeforeEach / @AfterEach',
          '@ParameterizedTest with @ValueSource or @CsvSource',
          '@Tag for groups, @Order for order (order is discouraged)',
          'Configured in code and Maven, no XML suite file needed',
          'Assertions.assertEquals(expected, actual)',
        ] },
      ] },
      { type: 'alert', value: "Both tools are good. Many teams use JUnit 5 for developer unit tests and TestNG for Selenium suites. Use the one your team already uses." },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Write a class PasswordRules with a method isStrong(String password) (at least 8 characters and one digit).",
        "Write a JUnit 5 test that checks \"abc\" is not strong using assertFalse.",
        "Write a @ParameterizedTest with @ValueSource for three strong passwords.",
        "Use assertThrows to check that isStrong(null) throws an exception (make your method throw one).",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "What is the JUnit 5 annotation that runs before each test? (@BeforeEach)",
        "In JUnit, which argument of assertEquals comes first? (The expected value.)",
        "Which JUnit annotation gives simple values to a parameterized test? (@ValueSource)",
        "Which TestNG annotation does the same job? (@DataProvider)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "JUnit is like a simple kitchen scale. It does one job very well: it tells you if the weight is exactly what the recipe says. TestNG is more like a full kitchen planner with a timetable. Both can check your cake." },
    mistakes: [
      "Swapping expected and actual in assertEquals, which makes error messages confusing.",
      "Mixing JUnit 4 imports (org.junit.Test) with JUnit 5 imports (org.junit.jupiter.api.Test).",
      "Comparing decimal numbers with assertEquals without a delta.",
      "Making tests depend on each other's order instead of using @BeforeEach for setup.",
    ],
    takeaways: [
      "JUnit 5 (Jupiter) is the standard Java unit testing framework.",
      "@Test marks a test; @BeforeEach and @AfterEach run around every test.",
      "The Assertions class has assertEquals, assertTrue, assertAll and assertThrows.",
      "@ParameterizedTest with @ValueSource or @CsvSource runs one test with many inputs.",
      "In JUnit the expected value comes first; in TestNG the actual value comes first.",
    ],
  },

  'm9-l3': {
    id: 'm9-l3',
    title: 'Lesson 9.3 Maven',
    objectives: [
      "Explain what Maven does and what a dependency is.",
      "Read and write a pom.xml for a Selenium + TestNG project.",
      "Run tests with mvn test, -Dtest and -DsuiteXmlFile.",
      "Describe the standard Maven folder structure.",
    ],
    theory: "Maven is a build automation tool for Java. It downloads the libraries declared in pom.xml and runs the build and tests with simple commands like mvn test.",
    blocks: [
      { type: 'text', value: "Your test project needs many libraries: Selenium, TestNG, a logging library and more. Downloading each JAR file by hand is slow and easy to get wrong. Maven solves this. You write the names and versions of the libraries in one file, pom.xml, and Maven downloads them for you from Maven Central." },
      { type: 'text', value: "Maven also builds and runs your project. The same command, mvn test, works on your laptop and on a CI server like Jenkins. That is why almost every Java automation project uses Maven (or its cousin, Gradle)." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Build tool', 'A program that compiles code, runs tests and packages the project.'],
        ['pom.xml', "Project Object Model file. Maven's main settings file: project name, libraries and plugins."],
        ['Dependency', 'A library your project needs, for example Selenium.'],
        ['Maven Central', 'A huge public online store of Java libraries. Maven downloads from here.'],
        ['Local repository', 'A folder on your computer (~/.m2/repository) where Maven keeps downloaded libraries.'],
        ['Plugin', 'An add-on that does a job. Surefire is the plugin that runs tests.'],
        ['Lifecycle phase', 'A build step such as compile, test or package.'],
      ] },
      { type: 'heading', value: 'Standard folder structure' },
      { type: 'code', language: 'bash', value: `shopeasy-tests/
├── pom.xml
├── testng.xml
└── src/
    ├── main/java/        # app or framework code (page classes, utils)
    └── test/
        ├── java/         # test classes
        └── resources/    # test data, config files` },
      { type: 'heading', value: 'A pom.xml for Selenium + TestNG' },
      { type: 'code', language: 'xml', value: `<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.shopeasy</groupId>
    <artifactId>shopeasy-tests</artifactId>
    <version>1.0.0</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <suiteXmlFile>testng.xml</suiteXmlFile>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>4.27.0</version>
        </dependency>
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>7.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.5.2</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>\${suiteXmlFile}</suiteXmlFile>
                    </suiteXmlFiles>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>` },
      { type: 'heading', value: 'Line-by-line explanation' },
      { type: 'syntax', parts: [
        { clause: 'groupId / artifactId / version', text: 'The unique name of your project: company, project name and version.' },
        { clause: 'maven.compiler.release', text: 'The Java version used to compile the code (17 here).' },
        { clause: '<suiteXmlFile> property', text: 'A default value (testng.xml) that you can change from the command line.' },
        { clause: '<dependency>', text: 'One library. Maven downloads it, and also the libraries it needs.' },
        { clause: '<scope>test</scope>', text: 'The library is only used for test code, not for main code.' },
        { clause: 'maven-surefire-plugin', text: 'The plugin that runs your tests during the test phase.' },
        { clause: '<suiteXmlFiles>', text: 'Tells Surefire to run the TestNG suite file instead of searching for test classes.' },
      ] },
      { type: 'heading', value: 'Useful Maven commands' },
      { type: 'code', language: 'bash', value: `# Delete old build output, then compile and run all tests
mvn clean test

# Run only one test class
mvn test -Dtest=LoginTest

# Run only one method in a class
mvn test -Dtest=LoginTest#validLogin

# Run a different TestNG suite file
mvn test -DsuiteXmlFile=smoke.xml

# Check Maven and Java versions
mvn -v` },
      { type: 'alert', value: "Test reports from Surefire are saved in target/surefire-reports. Jenkins and other CI tools read the XML files from this folder." },
      { type: 'steps', title: 'What happens when you run mvn test', steps: [
        { label: 'Read pom.xml', text: 'Maven learns which libraries and plugins it needs.' },
        { label: 'Download', text: 'Missing libraries come from Maven Central into ~/.m2/repository.' },
        { label: 'Compile', text: 'Main code and test code are compiled into the target folder.' },
        { label: 'Test', text: 'Surefire runs the tests and writes reports.' },
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create a new Maven project with the folder structure above.",
        "Copy the pom.xml and run mvn clean test. Watch Maven download Selenium and TestNG.",
        "Add the Apache POI dependency (org.apache.poi:poi-ooxml:5.3.0) and run the build again.",
        "Create smoke.xml and run it with mvn test -DsuiteXmlFile=smoke.xml.",
        "Open target/surefire-reports and find the XML result file.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Which file manages dependencies in a Maven project? (pom.xml)",
        "Which plugin runs tests? (maven-surefire-plugin)",
        "How do you run only the LoginTest class? (mvn test -Dtest=LoginTest)",
        "Where does Maven keep downloaded libraries on your computer? (~/.m2/repository)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "pom.xml is a shopping list. You write 'Selenium 4.27, TestNG 7.10'. Maven is the helper who goes to the big store (Maven Central), buys everything on the list, puts it in your kitchen (~/.m2), and then cooks the meal (runs the build)." },
    mistakes: [
      "Copying JAR files into the project by hand instead of declaring dependencies in pom.xml.",
      "Putting test classes in src/main/java, so Surefire does not find them.",
      "Naming test classes without 'Test' (for example LoginCheck); by default Surefire only picks classes like *Test or Test*.",
      "Using very old plugin or library versions that do not work with Java 17.",
      "Running mvn test without clean after big changes and getting confusing old results.",
    ],
    takeaways: [
      "Maven is a Java build tool that downloads libraries and runs builds.",
      "pom.xml lists the project name, dependencies and plugins.",
      "Dependencies come from Maven Central and are cached in ~/.m2/repository.",
      "The Surefire plugin runs tests in the test phase.",
      "mvn test, -Dtest= and -DsuiteXmlFile= let you run all or some of your tests.",
    ],
  },

  'm9-l4': {
    id: 'm9-l4',
    title: 'Lesson 9.4 Page Object Model (POM)',
    objectives: [
      "Explain the Page Object Model and the problem it solves.",
      "Write a page class with locators and action methods using Selenium 4.",
      "Write a clean test class that uses the page class.",
      "Know which code belongs in page classes and which belongs in tests.",
    ],
    theory: "The Page Object Model (POM) keeps the locators and actions of each web page inside its own page class. Test classes call these methods, so tests stay short and a UI change is fixed in one place.",
    blocks: [
      { type: 'text', value: "Imagine you have 50 tests that log in to ShopEasy. Each test has the line By.id(\"username\"). One day a developer renames the field to \"email\". Now you must change 50 files. This is slow and risky." },
      { type: 'text', value: "The Page Object Model (POM) fixes this. It is a design pattern: a proven way to organise code. You create one Java class for each page of the website. That class holds the locators (how to find elements) and the actions (what a user can do on the page). Tests only call those actions. When the UI changes, you update one page class, and all 50 tests work again." },
      { type: 'alert', value: "Do not confuse the two 'POMs'. Page Object Model is a design pattern. pom.xml is the Maven settings file. They are not related." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Design pattern', 'A common, proven way to structure code.'],
        ['Page class', 'A Java class that represents one web page, such as LoginPage.'],
        ['Locator', 'The way Selenium finds an element, for example By.id("username").'],
        ['Action method', 'A method in the page class that does a user action, such as login().'],
        ['Explicit wait', 'Code that waits until a condition is true, for example until an element is visible.'],
      ] },
      { type: 'heading', value: 'Page class: LoginPage' },
      { type: 'code', language: 'java', value: `package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    // 1. Locators: kept private, in ONE place
    private final By usernameField = By.id("username");
    private final By passwordField  = By.id("password");
    private final By loginButton    = By.id("loginBtn");
    private final By errorMessage   = By.cssSelector(".login-error");

    // 2. Constructor: receives the driver from the test
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // 3. Actions: what a user can do on this page
    public LoginPage open() {
        driver.get("https://shopeasy.example.com/login");
        return this;
    }

    public HomePage loginAs(String username, String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField))
            .sendKeys(username);
        driver.findElement(passwordField).sendKeys(password);
        driver.findElement(loginButton).click();
        return new HomePage(driver);
    }

    public String getErrorMessage() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage))
                   .getText();
    }
}` },
      { type: 'code', language: 'java', value: `package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage {

    private final WebDriver driver;
    private final By welcomeText = By.id("welcome");
    private final By searchBox   = By.id("search");

    public HomePage(WebDriver driver) {
        this.driver = driver;
    }

    public String getWelcomeText() {
        return driver.findElement(welcomeText).getText();
    }

    public void searchFor(String product) {
        driver.findElement(searchBox).sendKeys(product + "\\n");
    }
}` },
      { type: 'heading', value: 'Test class: LoginTest' },
      { type: 'code', language: 'java', value: `package com.shopeasy.tests;

import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.LoginPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTest {

    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        loginPage = new LoginPage(driver).open();
    }

    @Test
    public void validLogin() {
        HomePage home = loginPage.loginAs("anna", "Secret123");
        Assert.assertEquals(home.getWelcomeText(), "Welcome, Anna");
    }

    @Test
    public void invalidLogin() {
        loginPage.loginAs("anna", "wrongPass");
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid username or password");
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}` },
      { type: 'heading', value: 'Line-by-line explanation' },
      { type: 'syntax', parts: [
        { clause: 'private final By usernameField', text: 'The locator is stored once, in the page class. Tests never see it.' },
        { clause: 'LoginPage(WebDriver driver)', text: 'The test passes its browser to the page, so page and test use the same browser.' },
        { clause: 'WebDriverWait(driver, Duration.ofSeconds(10))', text: 'Selenium 4 style wait: wait up to 10 seconds for a condition.' },
        { clause: 'return new HomePage(driver)', text: 'After login, the user lands on the home page, so the method returns the next page object.' },
        { clause: 'loginPage.loginAs("anna", "Secret123")', text: 'The test reads like plain English. No locators, no clicks.' },
        { clause: 'Assert.assertEquals', text: 'Assertions stay in the TEST class, not in the page class.' },
      ] },
      { type: 'compare', columns: [
        { title: 'Page class', tone: 'olive', items: ['Locators', 'Actions (click, type, read text)', 'Waits for elements', 'Returns the next page'] },
        { title: 'Test class', tone: 'honey', items: ['Test steps in business language', 'Test data', 'Assertions (pass/fail checks)', 'Browser setup and cleanup'] },
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create CartPage with locators for the cart items list and the checkout button.",
        "Add methods getItemCount() and proceedToCheckout().",
        "Add a method addFirstResultToCart() to a new SearchResultsPage.",
        "Write a test: login, search 'shoes', add first result, open cart, assert item count is 1.",
        "Change one locator in CartPage and notice that no test class needs to change.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "In POM, where do page locators live? (In the page class.)",
        "What is the main benefit of POM? (Test code is separated from UI selectors, so maintenance is cheaper.)",
        "Should assertions go in page classes? (No, in test classes.)",
        "What should loginAs() return if login leads to the home page? (A HomePage object.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "A page class is like a TV remote. You press 'Volume up' without knowing which wires are inside. If the TV maker changes the wires, the button still says 'Volume up'. Your tests press buttons; the page class handles the wires." },
    mistakes: [
      "Putting assertions inside page classes, which mixes checking with actions.",
      "Making locators public and using them directly in tests.",
      "Creating one huge page class for the whole website instead of one class per page or component.",
      "Creating a new WebDriver inside a page class instead of receiving it from the test.",
      "Using Thread.sleep() in page methods instead of explicit waits.",
    ],
    takeaways: [
      "POM is a design pattern: one class per page with locators and actions.",
      "Tests call page methods and contain the assertions.",
      "When the UI changes, you update one page class, not every test.",
      "Page methods can return the next page object to show the user flow.",
      "Use Selenium 4 explicit waits (WebDriverWait with Duration) inside page classes.",
    ],
  },

  'm9-l5': {
    id: 'm9-l5',
    title: 'Lesson 9.5 Data-Driven Framework',
    objectives: [
      "Explain what data-driven testing is and when to use it.",
      "Feed test data from CSV, Excel (Apache POI) or JSON into a TestNG @DataProvider.",
      "Keep test data separate from test logic.",
    ],
    theory: "A data-driven framework reads input values from files such as Excel, CSV or JSON, and runs the same test steps and assertions once for each row of data.",
    blocks: [
      { type: 'text', value: "Many tests are the same steps with different data. Login with a valid user. Login with a wrong password. Login with an empty username. Writing three test methods is repetitive. In data-driven testing, you write the steps once and keep the data in a file. The framework runs the test once for each row." },
      { type: 'text', value: "The big benefit: test data is separated from test scripts. A manual tester or business analyst can add a new row in Excel without touching Java code." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Test data', 'The input values and expected results used by a test.'],
        ['CSV', 'Comma-Separated Values: a plain text file where each line is a row.'],
        ['Excel (.xlsx)', 'A spreadsheet file. Java reads it with the Apache POI library.'],
        ['JSON', 'A text format for data using { } and [ ], common in web APIs.'],
        ['@DataProvider', 'The TestNG annotation that supplies many data sets to one test.'],
        ['Object[][]', 'A two-dimensional array: rows of values. TestNG data providers return this.'],
      ] },
      { type: 'heading', value: 'Option 1: CSV file' },
      { type: 'code', language: 'bash', value: `# src/test/resources/testdata/login.csv
username,password,expected
anna,Secret123,success
anna,wrongPass,error
,Secret123,error` },
      { type: 'code', language: 'java', value: `package com.shopeasy.tests;

import com.shopeasy.pages.LoginPage;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class LoginDataDrivenTest extends BaseTest {

    @DataProvider(name = "csvLoginData")
    public Object[][] csvLoginData() throws IOException {
        List<String> lines = Files.readAllLines(
                Path.of("src/test/resources/testdata/login.csv"));
        return lines.stream()
                .skip(1)                              // skip the header row
                .map(line -> line.split(",", -1))     // -1 keeps empty values
                .toArray(Object[][]::new);
    }

    @Test(dataProvider = "csvLoginData")
    public void loginTest(String username, String password, String expected) {
        LoginPage page = new LoginPage(driver).open();
        page.loginAs(username, password);
        if (expected.equals("success")) {
            org.testng.Assert.assertTrue(driver.getCurrentUrl().contains("/account"));
        } else {
            org.testng.Assert.assertFalse(page.getErrorMessage().isEmpty());
        }
    }
}` },
      { type: 'text', value: "BaseTest is a parent class that opens and closes the browser in @BeforeMethod and @AfterMethod and holds the protected driver field. You will see it in the hybrid framework lesson." },
      { type: 'heading', value: 'Option 2: Excel with Apache POI' },
      { type: 'code', language: 'xml', value: `<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.3.0</version>
</dependency>` },
      { type: 'code', language: 'java', value: `package com.shopeasy.utils;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelReader {

    public static Object[][] read(String filePath, String sheetName) throws IOException {
        try (FileInputStream file = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(file)) {

            Sheet sheet = workbook.getSheet(sheetName);
            DataFormatter formatter = new DataFormatter();   // turns any cell into text
            int rows = sheet.getLastRowNum();                // last row index (header is 0)
            int cols = sheet.getRow(0).getLastCellNum();     // number of columns

            Object[][] data = new Object[rows][cols];
            for (int r = 1; r <= rows; r++) {
                Row row = sheet.getRow(r);
                for (int c = 0; c < cols; c++) {
                    data[r - 1][c] = formatter.formatCellValue(row.getCell(c));
                }
            }
            return data;
        }
    }
}` },
      { type: 'code', language: 'java', value: `@DataProvider(name = "excelLoginData")
public Object[][] excelLoginData() throws IOException {
    return ExcelReader.read("src/test/resources/testdata/login.xlsx", "Login");
}` },
      { type: 'syntax', title: 'Explaining the Excel reader', parts: [
        { clause: 'try (...)', text: 'try-with-resources closes the file and workbook automatically, even if an error happens.' },
        { clause: 'new XSSFWorkbook(file)', text: 'Opens a modern .xlsx file. (HSSFWorkbook is for old .xls files.)' },
        { clause: 'DataFormatter', text: 'Reads numbers, dates and text as the text you see in Excel, so 123 does not become 123.0.' },
        { clause: 'r = 1', text: 'Row 0 is the header, so data starts from row 1.' },
        { clause: 'data[r - 1][c]', text: 'Excel row 1 becomes array row 0.' },
      ] },
      { type: 'heading', value: 'Option 3: JSON file' },
      { type: 'code', language: 'java', value: `// src/test/resources/testdata/users.json
// [ {"username":"anna","password":"Secret123","expected":"success"},
//   {"username":"anna","password":"wrongPass","expected":"error"} ]
// Needs dependency com.fasterxml.jackson.core:jackson-databind

@DataProvider(name = "jsonLoginData")
public Object[][] jsonLoginData() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    List<Map<String, String>> users = mapper.readValue(
            new File("src/test/resources/testdata/users.json"),
            new TypeReference<List<Map<String, String>>>() {});
    return users.stream()
            .map(u -> new Object[] { u.get("username"), u.get("password"), u.get("expected") })
            .toArray(Object[][]::new);
}` },
      { type: 'compare', columns: [
        { title: 'CSV', tone: 'olive', items: ['Very simple text file', 'No extra library', 'Easy to review in Git'] },
        { title: 'Excel', tone: 'honey', items: ['Friendly for non-programmers', 'Needs Apache POI', 'Binary file, hard to compare in Git'] },
        { title: 'JSON', tone: 'rose', items: ['Good for nested data', 'Needs a library like Jackson', 'Same format as many APIs'] },
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create search.csv with columns keyword and minResults (for example: shoes,1).",
        "Write a @DataProvider that reads the CSV and a test that searches ShopEasy for each keyword.",
        "Assert that the number of results is at least minResults (use Integer.parseInt).",
        "Move the same data into search.xlsx and switch the test to use ExcelReader.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Which TestNG feature supplies multiple data sets to one test? (@DataProvider)",
        "Which library reads Excel files in Java? (Apache POI)",
        "What does a data provider return? (Object[][] — rows of values.)",
        "Why skip the first line of a CSV? (It is the header, not test data.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "A data-driven test is like a form letter. You write the letter once: 'Dear NAME, your order NUMBER is ready.' Then a list of names and numbers fills it in again and again. The letter is the test; the list is the data file." },
    mistakes: [
      "Hard-coding test data inside the test method instead of in a data file.",
      "Reading Excel numbers with getStringCellValue(), which throws an error for numeric cells (use DataFormatter).",
      "Using absolute file paths like C:/Users/me/data.xlsx that break on other computers and on Jenkins.",
      "Forgetting to skip the header row, so the test runs with 'username' as a user name.",
      "Not closing file streams, which can lock the Excel file.",
    ],
    takeaways: [
      "Data-driven testing runs the same steps with many data rows.",
      "Test data lives in CSV, Excel or JSON files, separate from test code.",
      "TestNG @DataProvider returns Object[][] and feeds each row to the test.",
      "Apache POI reads Excel; DataFormatter reads any cell as text.",
      "Keep data files in src/test/resources and use relative paths.",
    ],
  },

  'm9-l6': {
    id: 'm9-l6',
    title: 'Lesson 9.6 Hybrid Framework',
    objectives: [
      "Explain what a hybrid framework combines.",
      "Understand keyword-driven testing at a basic level.",
      "Read and build a typical hybrid framework folder structure.",
      "Write a BaseTest and a config reader used by all tests.",
    ],
    theory: "A hybrid framework combines data-driven and keyword-driven approaches, usually built on top of POM page classes, with shared utilities for configuration, logging and reports.",
    blocks: [
      { type: 'text', value: "Real projects rarely use only one approach. A hybrid framework mixes the best parts of several frameworks. The classic definition is: a hybrid framework combines the data-driven approach (data in files) with the keyword-driven approach (test steps written as action words). In practice, teams also build it on POM and add logging and reporting." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Data-driven', 'Test DATA comes from files (Excel, CSV, JSON).'],
        ['Keyword-driven', 'Test STEPS are written as keywords like openBrowser, enterText, click, often in a sheet.'],
        ['Keyword', 'An action word that maps to a Java method.'],
        ['Hybrid framework', 'A framework that combines data-driven and keyword-driven approaches (plus POM, utils and reports).'],
        ['BaseTest', 'A parent class with common setup and cleanup that all tests extend.'],
        ['config.properties', 'A settings file with values like the URL and browser name.'],
      ] },
      { type: 'heading', value: 'Keyword-driven in one minute' },
      { type: 'table', headers: ['Step', 'Keyword', 'Target', 'Value'], rows: [
        ['1', 'openUrl', '', 'https://shopeasy.example.com/login'],
        ['2', 'enterText', 'username', 'anna'],
        ['3', 'enterText', 'password', 'Secret123'],
        ['4', 'click', 'loginBtn', ''],
        ['5', 'verifyText', 'welcome', 'Welcome, Anna'],
      ] },
      { type: 'text', value: "A small Java 'keyword engine' reads each row and calls the matching method. The data columns (like 'anna') can come from a data sheet. That is how data-driven and keyword-driven meet." },
      { type: 'code', language: 'java', value: `public void runStep(String keyword, String target, String value) {
    switch (keyword) {
        case "openUrl"    -> driver.get(value);
        case "enterText"  -> driver.findElement(By.id(target)).sendKeys(value);
        case "click"      -> driver.findElement(By.id(target)).click();
        case "verifyText" -> Assert.assertEquals(
                                 driver.findElement(By.id(target)).getText(), value);
        default -> throw new IllegalArgumentException("Unknown keyword: " + keyword);
    }
}` },
      { type: 'heading', value: 'Typical hybrid folder structure' },
      { type: 'code', language: 'bash', value: `shopeasy-framework/
├── pom.xml
├── testng.xml
└── src/
    ├── main/java/com/shopeasy/
    │   ├── pages/              # POM page classes
    │   │   ├── LoginPage.java
    │   │   ├── SearchPage.java
    │   │   ├── CartPage.java
    │   │   └── CheckoutPage.java
    │   ├── keywords/           # keyword engine (action words)
    │   │   └── KeywordEngine.java
    │   └── utils/              # shared helpers
    │       ├── ConfigReader.java
    │       ├── ExcelReader.java
    │       └── DriverFactory.java
    └── test/
        ├── java/com/shopeasy/
        │   ├── base/BaseTest.java
        │   ├── listeners/ExtentListener.java
        │   └── tests/
        │       ├── LoginTest.java
        │       └── CheckoutTest.java
        └── resources/
            ├── config.properties
            ├── log4j2.xml
            └── testdata/
                ├── login.xlsx
                └── keywords.xlsx` },
      { type: 'heading', value: 'Config reader and BaseTest' },
      { type: 'code', language: 'bash', value: `# src/test/resources/config.properties
baseUrl=https://shopeasy.example.com
browser=chrome
timeoutSeconds=10` },
      { type: 'code', language: 'java', value: `package com.shopeasy.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigReader {
    private static final Properties props = new Properties();

    static {
        try (InputStream in = ConfigReader.class.getClassLoader()
                .getResourceAsStream("config.properties")) {
            props.load(in);
        } catch (IOException e) {
            throw new RuntimeException("Cannot load config.properties", e);
        }
    }

    public static String get(String key) {
        // A -D value on the command line wins over the file
        return System.getProperty(key, props.getProperty(key));
    }
}` },
      { type: 'code', language: 'java', value: `package com.shopeasy.base;

import com.shopeasy.utils.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class BaseTest {
    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {
        String browser = ConfigReader.get("browser");
        driver = browser.equalsIgnoreCase("firefox") ? new FirefoxDriver() : new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(ConfigReader.get("baseUrl"));
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}` },
      { type: 'syntax', title: 'What each part does', parts: [
        { clause: 'static { ... }', text: 'Runs once when the class is first used, and loads the properties file.' },
        { clause: 'System.getProperty(key, default)', text: 'Lets you run mvn test -Dbrowser=firefox without editing the file.' },
        { clause: 'protected WebDriver driver', text: 'Child test classes (extends BaseTest) can use driver directly.' },
        { clause: 'alwaysRun = true', text: 'The browser is closed even if setup or a dependency failed.' },
      ] },
      { type: 'steps', title: 'How one hybrid test run flows', steps: [
        { label: 'Config', text: 'BaseTest reads the URL and browser from config.properties.' },
        { label: 'Data', text: 'A @DataProvider reads rows from login.xlsx.' },
        { label: 'Steps', text: 'Keywords or POM page methods perform the actions.' },
        { label: 'Checks', text: 'Assertions in the test decide pass or fail.' },
        { label: 'Evidence', text: 'Log4j2 writes logs and Extent/Allure build the report.' },
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create the folder structure above in a Maven project (empty classes are fine at first).",
        "Write config.properties and ConfigReader, then print ConfigReader.get(\"baseUrl\").",
        "Make LoginTest extend BaseTest and use LoginPage with an Excel @DataProvider.",
        "Write a keywords.xlsx sheet with 4 steps and a loop that calls runStep() for each row.",
        "Run mvn test -Dbrowser=firefox and check that Firefox opens.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "What does a hybrid framework combine? (Data-driven and keyword-driven approaches.)",
        "In keyword-driven testing, what is 'click'? (A keyword: an action word mapped to code.)",
        "Why keep the URL in config.properties? (So you can change environments without changing code.)",
        "What does every test class extend in our structure? (BaseTest)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "A hybrid framework is like a restaurant kitchen. The recipe cards are keywords (steps), the fridge is the data files, the stations are page classes, and the order screen is the report. Each part is simple; together they cook hundreds of meals a day." },
    mistakes: [
      "Building a huge framework before writing any real tests. Start small and grow it.",
      "Hard-coding URLs, browsers and passwords inside tests instead of a config file.",
      "Putting Selenium locators in the keyword sheet and in page classes, so they get out of sync.",
      "Copy-pasting setup code into every test instead of using BaseTest.",
      "Committing real passwords in config.properties to Git.",
    ],
    takeaways: [
      "A hybrid framework combines data-driven and keyword-driven approaches.",
      "It is usually built on POM page classes with shared utils, logging and reports.",
      "A clear folder structure (pages, utils, base, tests, resources) keeps a big project easy to navigate.",
      "BaseTest holds common setup and cleanup; ConfigReader holds environment settings.",
      "Hybrid frameworks are common in large enterprise projects because they scale well.",
    ],
  },

  'm9-l7': {
    id: 'm9-l7',
    title: 'Lesson 9.7 Logging & Reporting',
    objectives: [
      "Explain the difference between a log and a report.",
      "Add Log4j2 logging to page classes and tests.",
      "Create an HTML report with Extent Reports using a TestNG listener, and know the Allure alternative.",
      "Attach a screenshot when a test fails.",
    ],
    theory: "Logging records step-by-step details of what the tests did, and reporting (Extent Reports or Allure) turns results into visual HTML dashboards. Together they help teams find the cause of failures quickly.",
    blocks: [
      { type: 'text', value: "A test fails on Jenkins at 2 a.m. In the morning, you need to know: which test failed, at which step, and why? You were not watching. Logs and reports are your evidence." },
      { type: 'text', value: "They are different tools, and you need both. A report does not replace detailed logging." },
      { type: 'compare', columns: [
        { title: 'Log', subtitle: 'For debugging', tone: 'olive', items: ['Many detailed text lines', "Written by your code: 'Clicking login button'", 'Shows what happened step by step', 'Read by testers and developers'] },
        { title: 'Report', subtitle: 'For visibility', tone: 'honey', items: ['A summary with pass/fail counts and charts', 'Built after the run (HTML dashboard)', 'Shows results, time and screenshots', 'Read by the whole team, including managers'] },
      ] },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Log4j2', 'A popular Java logging library (Apache Log4j version 2).'],
        ['Log level', 'How important a message is: DEBUG, INFO, WARN, ERROR.'],
        ['Appender', 'Where logs go: the console, a file, and so on.'],
        ['Extent Reports', 'A library that builds a nice HTML test report.'],
        ['Allure', 'Another reporting tool with rich HTML reports.'],
        ['Listener', 'A TestNG class that is called automatically when tests start, pass or fail.'],
      ] },
      { type: 'heading', value: 'Step 1: Add dependencies' },
      { type: 'code', language: 'xml', value: `<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.24.3</version>
</dependency>
<dependency>
    <groupId>com.aventstack</groupId>
    <artifactId>extentreports</artifactId>
    <version>5.1.2</version>
</dependency>` },
      { type: 'heading', value: 'Step 2: Configure Log4j2' },
      { type: 'code', language: 'xml', value: `<!-- src/test/resources/log4j2.xml -->
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss} %-5level %c{1} - %msg%n"/>
        </Console>
        <File name="File" fileName="logs/test-run.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5level %c{1} - %msg%n"/>
        </File>
    </Appenders>
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Root>
    </Loggers>
</Configuration>` },
      { type: 'code', language: 'java', value: `import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoginPage {
    private static final Logger log = LogManager.getLogger(LoginPage.class);

    public HomePage loginAs(String username, String password) {
        log.info("Logging in as user: {}", username);   // never log the password
        driver.findElement(usernameField).sendKeys(username);
        driver.findElement(passwordField).sendKeys(password);
        log.debug("Clicking the login button");
        driver.findElement(loginButton).click();
        return new HomePage(driver);
    }
}` },
      { type: 'text', value: "With level=\"info\", INFO, WARN and ERROR messages are written, but DEBUG messages are hidden. Change it to \"debug\" when you need more detail. The {} is replaced by the username value." },
      { type: 'heading', value: 'Step 3: Extent Reports with a TestNG listener' },
      { type: 'code', language: 'java', value: `package com.shopeasy.listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.shopeasy.base.BaseTest;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class ExtentListener implements ITestListener {

    private static final ExtentReports extent = new ExtentReports();
    private static final ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    @Override
    public void onStart(ITestContext context) {
        ExtentSparkReporter spark = new ExtentSparkReporter("target/extent-report.html");
        spark.config().setReportName("ShopEasy Test Report");
        extent.attachReporter(spark);
    }

    @Override
    public void onTestStart(ITestResult result) {
        test.set(extent.createTest(result.getMethod().getMethodName()));
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().pass("Test passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        WebDriver driver = ((BaseTest) result.getInstance()).getDriver();
        String base64 = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
        test.get().fail(result.getThrowable(),
                MediaEntityBuilder.createScreenCaptureFromBase64String(base64).build());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().skip("Test skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();          // writes the HTML file
    }
}` },
      { type: 'code', language: 'xml', value: `<suite name="ShopEasy Suite">
    <listeners>
        <listener class-name="com.shopeasy.listeners.ExtentListener"/>
    </listeners>
    <test name="All Tests">
        <packages>
            <package name="com.shopeasy.tests"/>
        </packages>
    </test>
</suite>` },
      { type: 'syntax', title: 'Explaining the listener', parts: [
        { clause: 'implements ITestListener', text: 'TestNG calls these methods automatically. You do not call them.' },
        { clause: 'ExtentSparkReporter', text: 'The HTML reporter. It decides where the report file is saved.' },
        { clause: 'ThreadLocal<ExtentTest>', text: 'Each thread keeps its own test entry, so parallel tests do not mix.' },
        { clause: 'getDriver()', text: 'A public getter you add to BaseTest: public WebDriver getDriver() { return driver; }' },
        { clause: 'OutputType.BASE64', text: 'The screenshot is stored inside the HTML, so the report is one file.' },
        { clause: 'extent.flush()', text: 'Without flush, the report file is never written.' },
      ] },
      { type: 'warning', value: "Screenshots must be taken in onTestFailure, which runs BEFORE @AfterMethod closes the browser. If you quit the driver first, the screenshot fails." },
      { type: 'heading', value: 'Allure: the alternative' },
      { type: 'text', value: "Allure is another popular reporting tool. You add the allure-testng dependency (io.qameta.allure:allure-testng, for example 2.29.0). Tests write result files into target/allure-results. Then you build the HTML report with the Allure command line or the Allure Jenkins plugin." },
      { type: 'code', language: 'bash', value: `mvn clean test
allure serve target/allure-results     # builds and opens the report in a browser` },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Add log4j-core and log4j2.xml to your project. Add log.info lines to LoginPage and CartPage.",
        "Run the tests and open logs/test-run.log.",
        "Add ExtentListener and register it in testng.xml.",
        "Make one test fail on purpose and open target/extent-report.html. Find the screenshot.",
        "Change the root log level to debug and compare the log file.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Why generate test reports automatically? (Results are visible and traceable after every run.)",
        "Do reports replace detailed logging? (No. Reports summarise; logs explain each step.)",
        "Which TestNG interface lets you react to pass and fail events? (ITestListener)",
        "What happens if you forget extent.flush()? (The HTML report is not written.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "A log is a plane's black box: it records every small detail so experts can find out what went wrong. A report is the airport arrivals board: everyone can see at a glance which flights landed and which were delayed." },
    mistakes: [
      "Using System.out.println instead of a logger, so there are no levels, times or log files.",
      "Logging passwords or other secrets.",
      "Forgetting extent.flush(), so no report file appears.",
      "Taking the failure screenshot after the browser is already closed.",
      "Setting log level to DEBUG everywhere, creating huge logs that nobody can read.",
    ],
    takeaways: [
      "Logs give step-by-step details for debugging; reports give a visual summary for the team.",
      "Log4j2 writes logs with levels (DEBUG, INFO, WARN, ERROR) to the console and files.",
      "Extent Reports builds an HTML dashboard; a TestNG listener fills it automatically.",
      "Attach screenshots on failure to make debugging fast.",
      "Allure is a strong alternative that also integrates with Jenkins.",
    ],
  },

  // ---------------------------------------------------------------------------
  // MODULE 13: CI/CD FOR TESTERS
  // ---------------------------------------------------------------------------
  'm13-l1': {
    id: 'm13-l1',
    title: 'Lesson 13.1 Introduction to CI/CD',
    objectives: [
      "Define Continuous Integration, Continuous Delivery and Continuous Deployment.",
      "Describe the stages of a basic pipeline.",
      "Explain the role of testers and automated tests in CI/CD.",
    ],
    theory: "Continuous Integration means developers merge changes often and every change is built and tested automatically. Continuous Delivery keeps every tested build ready to deploy, for example to test environments.",
    blocks: [
      { type: 'text', value: "In the past, teams wrote code for months, then merged everything at the end and tested it for weeks. Merging was painful and bugs were found very late. CI/CD changes this. Small changes are merged often, and machines build and test each change automatically, many times a day." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['CI (Continuous Integration)', 'Merge code changes often. Every change is automatically built and tested.'],
        ['CD (Continuous Delivery)', 'Every change that passes tests is automatically prepared and can be released with one approval.'],
        ['Continuous Deployment', 'Every change that passes all tests goes to production automatically, with no human approval.'],
        ['Pipeline', 'A list of automated stages: build, test, deploy.'],
        ['Build', 'Turning source code into something that can run.'],
        ['Environment', 'A place where the app runs: dev, QA/test, staging, production.'],
        ['Regression', 'Something that worked before but is broken by a new change.'],
      ] },
      { type: 'heading', value: 'CI vs Continuous Delivery vs Continuous Deployment' },
      { type: 'compare', columns: [
        { title: 'Continuous Integration', subtitle: 'Merge and test often', tone: 'olive', items: [
          'Developers merge small changes often',
          'Each push triggers a build',
          'Unit and fast automated tests run',
          'Broken builds are fixed quickly',
        ] },
        { title: 'Continuous Delivery', subtitle: 'Always ready to release', tone: 'honey', items: [
          'Includes everything in CI',
          'Build is deployed to test/staging automatically',
          'More automated tests run there',
          'Release to production needs a human click',
        ] },
        { title: 'Continuous Deployment', subtitle: 'Fully automatic release', tone: 'rose', items: [
          'Includes everything in Continuous Delivery',
          'No manual approval step',
          'Passing changes go live automatically',
          'Needs very strong automated tests',
        ] },
      ] },
      { type: 'heading', value: 'A typical pipeline' },
      { type: 'steps', title: 'From commit to production', steps: [
        { label: 'Commit & push', text: 'A developer or tester pushes code to Git.' },
        { label: 'Build', text: 'The CI server (for example Jenkins) downloads the code and compiles it with mvn clean compile.' },
        { label: 'Unit tests', text: 'Fast tests check small pieces of code.' },
        { label: 'Deploy to QA', text: 'The build is installed in a test environment.' },
        { label: 'Automated UI/API tests', text: 'Selenium and API suites run against the QA environment.' },
        { label: 'Reports', text: 'Results are published; the team is notified if something fails.' },
        { label: 'Release', text: 'Manual approval (Continuous Delivery) or automatic (Continuous Deployment).' },
      ] },
      { type: 'heading', value: 'Why testers care' },
      { type: 'list', items: [
        "Your automated tests run on every change, not only when you click Run.",
        "Regressions are caught within minutes, while the change is still fresh in the developer's mind.",
        "Test reports are shared with the whole team automatically.",
        "Testers help design the pipeline: which tests run where, and what must pass before a release.",
      ] },
      { type: 'alert', value: "A pipeline is only as good as its tests. If the tests are slow, flaky or missing, CI/CD just delivers bugs faster." },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Draw the pipeline for ShopEasy on paper with 5 stages.",
        "For each stage, write which tests should run (unit, API, smoke UI, full regression).",
        "Mark where a human approval would happen in Continuous Delivery.",
        "Decide which stage should stop the pipeline if tests fail, and explain why.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "What is continuous integration? (Merging changes often with automated builds and tests.)",
        "What is the difference between Continuous Delivery and Continuous Deployment? (Delivery needs a manual release approval; Deployment releases automatically.)",
        "What is a pipeline? (A series of automated stages such as build, test and deploy.)",
        "Why is merging once a month risky? (Many changes collide and bugs are found late.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "CI/CD is like a car factory assembly line. Each car moves through stations: body, paint, quality check. A problem is found at the station where it happens, not after 1,000 cars are finished. Your automated tests are the quality-check stations." },
    mistakes: [
      "Thinking CI/CD is only a developer or DevOps topic and not a tester topic.",
      "Mixing up Continuous Delivery and Continuous Deployment.",
      "Putting a 3-hour full regression on every commit, so feedback is too slow.",
      "Ignoring a red (failed) build and continuing to merge more changes.",
    ],
    takeaways: [
      "CI: merge small changes often, with automatic builds and tests.",
      "Continuous Delivery: every passing build is ready to release, with a manual approval.",
      "Continuous Deployment: passing builds go to production automatically.",
      "A pipeline is a chain of stages like build, test, deploy and report.",
      "Automated tests are the quality gates that make CI/CD safe.",
    ],
  },

  'm13-l2': {
    id: 'm13-l2',
    title: 'Lesson 13.2 Git for Testers',
    objectives: [
      "Explain what Git, a repository, a commit and a branch are.",
      "Use the daily Git commands: clone, checkout -b, add, commit, push and pull.",
      "Follow a pull request workflow for test code.",
      "Avoid committing files that should not be in Git.",
    ],
    theory: "Git tracks the history of code. Branches keep new test work separate from the main code, and pull requests let the team review changes before they are merged.",
    blocks: [
      { type: 'text', value: "Test automation code is real code, so it lives in Git just like application code. Git remembers every change: who made it, when and why. If something breaks, you can see what changed or go back to an older version. CI tools like Jenkins also get the code from Git." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Git', 'A version control system: it tracks changes in files over time.'],
        ['Repository (repo)', 'A project folder tracked by Git, including its full history.'],
        ['Remote', 'A copy of the repo on a server such as GitHub or GitLab. Usually called origin.'],
        ['Commit', 'A saved snapshot of your changes with a message.'],
        ['Branch', 'A separate line of work. You can change files without affecting main.'],
        ['Staging area', 'A waiting area for changes you want to put in the next commit.'],
        ['Pull request (PR)', 'A request to merge your branch into main, with a code review.'],
        ['Merge conflict', 'Git cannot combine two changes to the same lines automatically.'],
      ] },
      { type: 'heading', value: 'The daily workflow' },
      { type: 'code', language: 'bash', value: `# 1. Get a copy of the project (only the first time)
git clone https://github.com/shopeasy/shopeasy-tests.git
cd shopeasy-tests

# 2. Make sure your main branch is up to date
git checkout main
git pull origin main

# 3. Create a new branch and switch to it
git checkout -b feature/cart-tests

# 4. Write your tests... then check what changed
git status
git diff

# 5. Stage all changed files
git add .

# 6. Save a snapshot with a clear message
git commit -m "Add cart add/remove tests for ShopEasy"

# 7. Send your branch to the remote server
git push -u origin feature/cart-tests` },
      { type: 'syntax', title: 'Line-by-line explanation', parts: [
        { clause: 'git clone URL', text: 'Downloads the whole repository to your computer.' },
        { clause: 'git pull origin main', text: 'Fetches new changes from the remote main branch and merges them into your local branch.' },
        { clause: 'git checkout -b feature/cart-tests', text: 'Creates a new branch AND switches to it. (Newer Git also offers git switch -c.)' },
        { clause: 'git status', text: 'Shows which files are changed, staged or new.' },
        { clause: 'git add .', text: 'Stages all changed files in the current folder.' },
        { clause: 'git commit -m "..."', text: 'Saves the staged changes as a commit in your LOCAL repository.' },
        { clause: 'git push -u origin ...', text: 'Uploads your commits to the remote. -u remembers the link so next time you can type just git push.' },
      ] },
      { type: 'heading', value: 'The pull request flow' },
      { type: 'steps', steps: [
        { label: 'Push your branch', text: 'git push -u origin feature/cart-tests' },
        { label: 'Open a pull request', text: 'On GitHub/GitLab, choose your branch and target main. Describe what the tests cover.' },
        { label: 'CI runs automatically', text: 'Jenkins or GitHub Actions builds the branch and runs the tests.' },
        { label: 'Code review', text: 'A teammate reads the code and leaves comments.' },
        { label: 'Fix and push again', text: 'Commit the fixes on the same branch; the PR updates by itself.' },
        { label: 'Merge', text: 'When tests pass and the reviewer approves, the branch is merged into main.' },
      ] },
      { type: 'heading', value: 'Keep junk out of Git: .gitignore' },
      { type: 'code', language: 'bash', value: `# .gitignore
target/
logs/
test-output/
allure-results/
*.log
.idea/
.env` },
      { type: 'warning', value: "Never commit passwords, API keys or tokens. Once pushed, they stay in Git history. Use CI secrets or environment variables instead." },
      { type: 'heading', value: 'Handling a merge conflict (basic)' },
      { type: 'code', language: 'bash', value: `git pull origin main          # Git reports a CONFLICT in LoginPage.java
# Open the file. Git marks the conflict like this:
# <<<<<<< HEAD
#     private final By loginButton = By.id("loginBtn");
# =======
#     private final By loginButton = By.id("signInBtn");
# >>>>>>> origin/main
# Keep the correct line, delete the markers, then:
git add src/main/java/com/shopeasy/pages/LoginPage.java
git commit -m "Resolve login button locator conflict"
git push` },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Create a free GitHub repository and clone it.",
        "Create a branch feature/login-tests with git checkout -b.",
        "Add a LoginTest.java file, then run git add . and git commit with a clear message.",
        "Push the branch and open a pull request into main.",
        "Add a .gitignore with target/ and check that git status no longer shows the target folder.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Which command creates and switches to a new branch? (git checkout -b)",
        "Which command stages all changed files? (git add .)",
        "Which command brings updates from the remote into your local branch? (git pull)",
        "Does git commit send changes to GitHub? (No. It saves locally; git push sends them.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "Git is like a notebook with a time machine. Each commit is a saved page. A branch is a photocopy of the notebook where you can try ideas. A pull request is asking your teacher to check your photocopy before you copy it back into the main notebook." },
    mistakes: [
      "Working directly on main instead of creating a branch.",
      "Writing unclear commit messages like 'update' or 'fix'.",
      "Forgetting to git pull before starting work, which causes more conflicts later.",
      "Committing the target/ folder, logs or passwords.",
      "Thinking git commit uploads to the server (you still need git push).",
    ],
    takeaways: [
      "Test automation code belongs in Git like any other code.",
      "git checkout -b creates and switches to a new branch.",
      "git add . stages changes; git commit saves them locally; git push uploads them.",
      "git pull brings remote updates into your local branch.",
      "Pull requests combine automated CI checks with human code review before merging.",
    ],
  },

  'm13-l3': {
    id: 'm13-l3',
    title: 'Lesson 13.3 Jenkins Basics',
    objectives: [
      "Explain what Jenkins is and what jobs, builds, agents and plugins are.",
      "Install Jenkins and configure JDK and Maven tools.",
      "Create a Pipeline job connected to a Git repository.",
      "Trigger builds automatically with a webhook or a schedule.",
    ],
    theory: "Jenkins is an open-source automation server. It runs build and test stages whenever code changes are pushed or merged, and shows the results on a dashboard.",
    blocks: [
      { type: 'text', value: "Jenkins is a free, open-source automation server. It is one of the most used CI tools in the world. Jenkins watches your Git repository. When code changes, it downloads the code, runs your commands (like mvn test), and shows if everything passed." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Job / Project', 'A task set up in Jenkins, for example "Run ShopEasy tests".'],
        ['Build', 'One run of a job. Build #15 is the 15th run.'],
        ['Pipeline', 'A job defined as code in a Jenkinsfile, with stages.'],
        ['Jenkinsfile', 'A text file in your repo that describes the pipeline.'],
        ['Controller', 'The main Jenkins server with the web dashboard.'],
        ['Agent', 'A machine where builds actually run.'],
        ['Plugin', 'An add-on that gives Jenkins new features (Git, JUnit, HTML reports).'],
        ['Webhook', 'A message GitHub sends to Jenkins when code is pushed.'],
      ] },
      { type: 'heading', value: 'Installing Jenkins' },
      { type: 'code', language: 'bash', value: `# Option A: Docker (quickest for learning)
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17

# Get the first admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Option B: on macOS with Homebrew
brew install jenkins-lts
brew services start jenkins-lts` },
      { type: 'steps', title: 'First-time setup', steps: [
        { label: 'Open Jenkins', text: 'Go to http://localhost:8080 in your browser.' },
        { label: 'Unlock', text: 'Paste the initial admin password.' },
        { label: 'Install suggested plugins', text: 'This includes Git, Pipeline and JUnit plugins.' },
        { label: 'Create admin user', text: 'Choose a username and a strong password.' },
        { label: 'Configure tools', text: 'Manage Jenkins > Tools. Add a JDK named JDK17 and a Maven installation named Maven3 (tick "Install automatically").' },
      ] },
      { type: 'heading', value: 'Creating a Pipeline job' },
      { type: 'steps', title: 'Connect Jenkins to the ShopEasy test repo', steps: [
        { label: 'New Item', text: 'On the dashboard click New Item, type shopeasy-tests, choose Pipeline, click OK.' },
        { label: 'Pipeline definition', text: 'In the Pipeline section choose "Pipeline script from SCM".' },
        { label: 'SCM', text: 'Choose Git and paste the repository URL.' },
        { label: 'Credentials', text: 'Add a username + personal access token if the repo is private.' },
        { label: 'Branch', text: 'Set Branch Specifier to */main.' },
        { label: 'Script Path', text: 'Keep Jenkinsfile (the file in the root of the repo).' },
        { label: 'Save and Build Now', text: 'Click Build Now, then open the build and click Console Output.' },
      ] },
      { type: 'heading', value: 'A minimal Jenkinsfile' },
      { type: 'code', language: 'groovy', value: `pipeline {
    agent any

    tools {
        jdk 'JDK17'
        maven 'Maven3'
    }

    triggers {
        // Check Git every 5 minutes (use a webhook instead when possible)
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'mvn -B clean compile'
            }
        }
    }
}` },
      { type: 'syntax', title: 'Explaining the Jenkinsfile', parts: [
        { clause: 'pipeline { }', text: 'Starts a declarative pipeline. Everything goes inside.' },
        { clause: 'agent any', text: 'Run on any available agent machine.' },
        { clause: 'tools { }', text: 'Uses the JDK and Maven names you configured in Manage Jenkins > Tools.' },
        { clause: "pollSCM('H/5 * * * *')", text: 'Cron-style schedule: check for new commits about every 5 minutes.' },
        { clause: 'checkout scm', text: 'Downloads the code from the Git repo set in the job.' },
        { clause: "sh 'mvn -B clean compile'", text: 'Runs a shell command. -B is batch mode: cleaner logs, no questions. (On Windows agents use bat.)' },
      ] },
      { type: 'heading', value: 'Triggers: how builds start' },
      { type: 'table', headers: ['Trigger', 'How it works', 'Good for'], rows: [
        ['Build Now', 'You click a button.', 'Trying things out'],
        ['Webhook', 'GitHub calls Jenkins right after a push (URL: http://your-jenkins/github-webhook/).', 'CI on every push, fastest feedback'],
        ['pollSCM', 'Jenkins checks Git on a schedule.', 'When GitHub cannot reach Jenkins'],
        ['cron', "Runs at fixed times, e.g. cron('H 2 * * *') nightly.", 'Nightly full regression'],
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Start Jenkins with Docker and finish the first-time setup.",
        "Configure JDK17 and Maven3 in Manage Jenkins > Tools.",
        "Add the minimal Jenkinsfile to your test repository and push it.",
        "Create a Pipeline job using 'Pipeline script from SCM' and click Build Now.",
        "Read the Console Output and find the line BUILD SUCCESS.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "What is the standard file used to define a Jenkins pipeline? (Jenkinsfile)",
        "What does agent any mean? (Run on any available agent.)",
        "What triggers a pipeline automatically right after a git push? (A webhook.)",
        "Where do you see the full log of a build? (Console Output.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "Jenkins is like a very reliable robot assistant. You give it a written checklist (the Jenkinsfile). Every time new code arrives, the robot follows the checklist exactly, day or night, and puts a green or red sticker on the result." },
    mistakes: [
      "Configuring everything by clicking in the UI instead of keeping the pipeline in a Jenkinsfile in Git.",
      "Tool names in the Jenkinsfile not matching the names in Manage Jenkins > Tools.",
      "Using sh on a Windows agent (use bat there).",
      "Polling Git every minute when a webhook would be faster and lighter.",
      "Storing passwords in the Jenkinsfile instead of Jenkins Credentials.",
    ],
    takeaways: [
      "Jenkins is an open-source automation server for CI/CD.",
      "A Pipeline job reads its steps from a Jenkinsfile stored in Git.",
      "Configure JDK and Maven once in Manage Jenkins > Tools.",
      "Webhooks trigger pipelines automatically when code is pushed.",
      "Console Output shows every command and its result for each build.",
    ],
  },

  'm13-l4': {
    id: 'm13-l4',
    title: 'Lesson 13.4 Running Automated Tests',
    objectives: [
      "Write a declarative Jenkinsfile that runs Maven tests and publishes results.",
      "Run Selenium tests headless on a CI machine.",
      "Pass parameters such as suite file and browser to the pipeline.",
      "Write the same pipeline in GitHub Actions YAML.",
    ],
    theory: "A Jenkinsfile defines the pipeline stages. A test stage calls mvn test, and the post section publishes results even when tests fail.",
    blocks: [
      { type: 'text', value: "Now we connect everything: the Maven project from Module 9, Git and Jenkins. The goal is simple. Every time someone pushes code, the pipeline runs the ShopEasy test suite and shows the result." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Stage', 'A named part of a pipeline, like Build or Test.'],
        ['Step', 'One command inside a stage, like sh "mvn test".'],
        ['post', 'A section that runs after the stages: always, on success or on failure.'],
        ['Headless browser', 'A browser that runs without a visible window. Needed on most CI servers.'],
        ['Artifact', 'A file kept from a build, such as a report or a log.'],
        ['Parameter', 'A value you choose when starting a build, like which suite to run.'],
        ['UNSTABLE', 'Jenkins status (yellow) when the build worked but some tests failed.'],
      ] },
      { type: 'heading', value: 'Step 1: Make the browser headless on CI' },
      { type: 'code', language: 'java', value: `// In BaseTest.setUp()
ChromeOptions options = new ChromeOptions();
if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
    options.addArguments("--headless=new", "--window-size=1920,1080");
}
driver = new ChromeDriver(options);` },
      { type: 'text', value: "On your laptop you watch the browser. On Jenkins you run mvn test -Dheadless=true, and Chrome runs without a window." },
      { type: 'heading', value: 'Step 2: The Jenkinsfile' },
      { type: 'code', language: 'groovy', value: `pipeline {
    agent any

    tools {
        jdk 'JDK17'
        maven 'Maven3'
    }

    parameters {
        choice(name: 'SUITE', choices: ['smoke.xml', 'regression.xml'],
               description: 'Which TestNG suite to run')
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn -B clean compile'
            }
        }

        stage('Test') {
            steps {
                sh "mvn -B test -DsuiteXmlFile=\${params.SUITE} -Dheadless=true -Dmaven.test.failure.ignore=true"
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'
            archiveArtifacts artifacts: 'target/extent-report.html, logs/*.log',
                             allowEmptyArchive: true
        }
        failure {
            echo "Build \${env.BUILD_NUMBER} failed. Check the console log."
        }
    }
}` },
      { type: 'heading', value: 'Line-by-line explanation' },
      { type: 'syntax', parts: [
        { clause: 'parameters { choice(...) }', text: 'Adds a "Build with Parameters" button where you pick smoke.xml or regression.xml.' },
        { clause: 'timeout(60 MINUTES)', text: 'Stops the build if it hangs, so it does not block the agent forever.' },
        { clause: 'sh "... \${params.SUITE} ..."', text: 'Double quotes let Groovy insert the chosen suite name into the command.' },
        { clause: '-Dheadless=true', text: 'Our BaseTest reads this and starts Chrome without a window.' },
        { clause: '-Dmaven.test.failure.ignore=true', text: 'Maven does not stop on test failures, so the junit step can mark the build UNSTABLE (yellow) with results.' },
        { clause: 'post { always { junit ... } }', text: 'Always publish the Surefire XML results, even if something failed.' },
        { clause: 'archiveArtifacts', text: 'Saves the HTML report and logs so you can download them from the build page.' },
        { clause: 'failure { }', text: 'Runs only when the build result is FAILURE.' },
      ] },
      { type: 'alert', value: "The first time you add a parameters block, run the job once with Build Now. After that, Jenkins shows 'Build with Parameters'." },
      { type: 'heading', value: 'The same pipeline in GitHub Actions' },
      { type: 'text', value: "GitHub Actions is a CI tool built into GitHub. Instead of a Jenkinsfile, you write a YAML file in .github/workflows/." },
      { type: 'code', language: 'yaml', value: `# .github/workflows/tests.yml
name: ShopEasy Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
    inputs:
      suite:
        description: 'TestNG suite file'
        default: 'smoke.xml'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Java 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
          cache: maven

      - name: Run tests
        run: mvn -B test -DsuiteXmlFile=\${{ github.event.inputs.suite || 'smoke.xml' }} -Dheadless=true

      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: |
            target/surefire-reports/
            target/extent-report.html` },
      { type: 'compare', columns: [
        { title: 'Jenkins', tone: 'olive', items: ['You install and maintain the server', 'Jenkinsfile (Groovy)', 'stages / steps / post', 'Huge plugin library'] },
        { title: 'GitHub Actions', tone: 'honey', items: ['Hosted by GitHub, no server to run', 'YAML file in .github/workflows', 'jobs / steps / if: always()', 'Marketplace of ready actions'] },
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Add the headless option to your BaseTest and run mvn test -Dheadless=true locally.",
        "Replace your minimal Jenkinsfile with the full one above and push it.",
        "Run the job with the smoke.xml suite and then with regression.xml.",
        "Make one test fail and check that the build turns yellow (UNSTABLE) and results are still shown.",
        "Add the GitHub Actions file to a GitHub repo and open the Actions tab.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Why run automated tests on every pull request? (Regressions are caught before merging.)",
        "Why put junit inside post { always { } }? (So results are published even when tests fail.)",
        "Why use headless mode on CI? (CI machines usually have no screen.)",
        "In GitHub Actions, what makes a step run even after a failure? (if: always())",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "A Jenkinsfile is a recipe card taped inside the kitchen. Checkout is 'get the ingredients', Build is 'prepare', Test is 'taste the food', and post always is 'write notes about how it went' — you write notes even when the dish is burnt." },
    mistakes: [
      "Putting the junit step only inside the Test stage, so results are lost when Maven fails first.",
      "Running Selenium with a visible browser on a server with no display.",
      "Using single quotes around a command with \${params.SUITE}, so Groovy does not replace the value.",
      "Forgetting a timeout, so a stuck test blocks the agent for hours.",
      "Hard-coding the suite name instead of using a parameter.",
    ],
    takeaways: [
      "A declarative Jenkinsfile uses pipeline, agent, stages, steps and post.",
      "The Test stage calls mvn test with system properties like -DsuiteXmlFile and -Dheadless.",
      "post { always { junit 'target/surefire-reports/*.xml' } } publishes results every time.",
      "Parameters let one pipeline run different suites.",
      "GitHub Actions does the same job with a YAML workflow file.",
    ],
  },

  'm13-l5': {
    id: 'm13-l5',
    title: 'Lesson 13.5 Test Reports',
    objectives: [
      "Find the test result files that Maven Surefire and TestNG create.",
      "Publish JUnit-style results, HTML Extent reports and Allure reports in Jenkins.",
      "Read test trends and failure details on the Jenkins dashboard.",
      "Share results with the team through notifications.",
    ],
    theory: "Jenkins plugins read Surefire XML results and HTML reports such as ExtentReports or Allure, and show test failures and trends on the dashboard so the whole team can diagnose problems.",
    blocks: [
      { type: 'text', value: "A pipeline that only says 'FAILED' is not helpful. The team needs to know which test failed, the error message, a screenshot, and whether this test also failed yesterday. Jenkins can show all of this if you publish your reports correctly." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Surefire report', 'XML files created by Maven Surefire in target/surefire-reports, one per test class.'],
        ['JUnit XML format', 'A standard XML format for test results. Most CI tools understand it, even for TestNG tests.'],
        ['JUnit plugin', "The Jenkins plugin behind the junit step. It reads the XML and draws the results."],
        ['Test trend', 'A chart that shows passed and failed tests across many builds.'],
        ['HTML Publisher plugin', 'A Jenkins plugin that shows an HTML report (like Extent) as a link on the build page.'],
        ['Flaky test', 'A test that sometimes passes and sometimes fails without any code change.'],
      ] },
      { type: 'heading', value: 'Where the result files come from' },
      { type: 'code', language: 'bash', value: `target/
├── surefire-reports/
│   ├── TEST-com.shopeasy.tests.LoginTest.xml   # JUnit XML (for Jenkins)
│   ├── testng-results.xml                      # TestNG's own XML
│   └── index.html                              # TestNG default HTML
├── extent-report.html                          # our Extent report (lesson 9.7)
└── allure-results/                             # raw Allure data (if used)` },
      { type: 'heading', value: 'Publishing all reports in the Jenkinsfile' },
      { type: 'code', language: 'groovy', value: `pipeline {
    agent any
    tools {
        jdk 'JDK17'
        maven 'Maven3'
    }
    stages {
        stage('Test') {
            steps {
                sh 'mvn -B clean test -Dheadless=true -Dmaven.test.failure.ignore=true'
            }
        }
    }
    post {
        always {
            // 1. Test results + trend chart (JUnit plugin)
            junit testResults: 'target/surefire-reports/*.xml', allowEmptyResults: true

            // 2. Extent HTML report (HTML Publisher plugin)
            publishHTML(target: [
                reportDir: 'target',
                reportFiles: 'extent-report.html',
                reportName: 'Extent Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])

            // 3. Allure report (Allure Jenkins plugin)
            allure results: [[path: 'target/allure-results']]
        }
        unstable {
            echo "Some tests failed in build \${env.BUILD_NUMBER}: \${env.BUILD_URL}testReport/"
        }
    }
}` },
      { type: 'syntax', title: 'Explaining the post section', parts: [
        { clause: 'junit testResults: ...', text: 'Reads every XML file and creates the "Test Result" page and the trend chart.' },
        { clause: 'allowEmptyResults: true', text: 'Do not fail the post step if no XML exists (for example, compile failed).' },
        { clause: 'publishHTML', text: 'Adds an "Extent Report" link in the job menu. keepAll keeps reports for old builds.' },
        { clause: 'allure results: [[path: ...]]', text: 'The Allure plugin builds the Allure HTML from raw results. Configure the Allure tool in Manage Jenkins > Tools first.' },
        { clause: 'unstable { }', text: 'Runs when tests failed but the build itself worked (yellow).' },
        { clause: '\${env.BUILD_URL}testReport/', text: 'A direct link to the test results page of this build.' },
      ] },
      { type: 'warning', value: "Jenkins blocks JavaScript and CSS inside published HTML by default (Content Security Policy). If your Extent report looks broken, ask your Jenkins admin to adjust the CSP setting, or download the report with archiveArtifacts." },
      { type: 'heading', value: 'Reading results in Jenkins' },
      { type: 'steps', steps: [
        { label: 'Job page', text: 'The Test Result Trend chart shows pass (blue) and fail (red) over time.' },
        { label: 'Build page', text: "Click 'Test Result' to see how many tests failed and which ones are new failures." },
        { label: 'Failed test', text: 'Click a test name to see the error message and stack trace.' },
        { label: 'Extent/Allure link', text: 'Open the HTML report for steps, logs and screenshots.' },
        { label: 'Console Output', text: 'Use it when the report is missing or the build failed before tests ran.' },
      ] },
      { type: 'heading', value: 'Build status colours' },
      { type: 'table', headers: ['Status', 'Colour', 'Meaning'], rows: [
        ['SUCCESS', 'Green/blue', 'Everything passed.'],
        ['UNSTABLE', 'Yellow', 'Build worked but some tests failed.'],
        ['FAILURE', 'Red', 'Something broke: compile error, script error, or tests failed without failure.ignore.'],
        ['ABORTED', 'Grey', 'Someone stopped the build or it timed out.'],
      ] },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Run mvn test locally and open the files in target/surefire-reports.",
        "Install the HTML Publisher plugin in Jenkins (Manage Jenkins > Plugins).",
        "Add the junit and publishHTML steps to your Jenkinsfile and run 3 builds.",
        "Make one test fail in the 3rd build and look at the trend chart and the failed test details.",
        "Optional: install the Allure plugin and add the allure step.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "Which folder holds Maven Surefire XML results? (target/surefire-reports)",
        "Which Jenkins step reads those XML files? (junit)",
        "What does a yellow UNSTABLE build usually mean? (The build worked but some tests failed.)",
        "Which plugin shows the Extent HTML report as a link? (HTML Publisher plugin.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "Test reports in Jenkins are like a school report card that updates after every exam. You see today's grade, the list of wrong answers with the teacher's notes, and a chart showing if you are getting better or worse over the term." },
    mistakes: [
      "Using the wrong path in the junit step, so Jenkins says 'No test report files were found'.",
      "Publishing reports only on success, so failure details are missing when you need them most.",
      "Ignoring flaky tests until nobody trusts the red builds any more.",
      "Letting Maven fail the build on test failures, then wondering why the build is red instead of yellow.",
    ],
    takeaways: [
      "Maven Surefire writes JUnit-format XML results to target/surefire-reports.",
      "The junit step publishes results and draws trend charts in Jenkins.",
      "HTML Publisher shows Extent reports; the Allure plugin shows Allure reports.",
      "Put report steps in post { always { } } so they run on every build.",
      "Clear reports make pipeline failures easy for the whole team to understand.",
    ],
  },

  'm13-l6': {
    id: 'm13-l6',
    title: 'Lesson 13.6 Continuous Testing',
    objectives: [
      "Define continuous testing and shift-left testing.",
      "Place unit, API, UI, performance and security tests in the right pipeline stages.",
      "Design fast quality gates using the test pyramid.",
      "Handle flaky tests so the pipeline stays trustworthy.",
    ],
    theory: "Continuous testing runs automated checks — unit, integration, UI, security and performance — at every stage of the pipeline, so each build gets quality feedback quickly and production risk goes down.",
    blocks: [
      { type: 'text', value: "Running one Selenium suite in Jenkins is a good start. Continuous testing goes further. It means testing happens all the time, at every stage of the pipeline, not only at the end. Each stage gives quality feedback, and a build moves forward only when its checks pass." },
      { type: 'heading', value: 'Key terms' },
      { type: 'table', headers: ['Term', 'Simple meaning'], rows: [
        ['Continuous testing', 'Running automated tests at every stage of delivery to get fast quality feedback.'],
        ['Shift-left', 'Testing earlier in the process (to the "left" of the timeline), when bugs are cheaper to fix.'],
        ['Shift-right', 'Also checking in production, with monitoring and small safe releases.'],
        ['Quality gate', 'A rule a build must pass to continue, e.g. "all smoke tests pass".'],
        ['Test pyramid', 'Many fast unit tests, fewer API tests, and a few slow UI tests.'],
        ['SAST / DAST', 'Security testing: SAST scans source code; DAST attacks the running app.'],
        ['Flaky test', 'A test that passes and fails randomly without code changes.'],
      ] },
      { type: 'heading', value: 'The test pyramid' },
      { type: 'compare', columns: [
        { title: 'Unit tests (bottom)', subtitle: 'Most tests', tone: 'olive', items: ['Thousands', 'Milliseconds each', 'Run on every commit', 'JUnit 5'] },
        { title: 'API / integration (middle)', subtitle: 'Some tests', tone: 'honey', items: ['Hundreds', 'Seconds each', 'Run on every PR / QA deploy', 'REST Assured, Postman/Newman'] },
        { title: 'UI tests (top)', subtitle: 'Fewest tests', tone: 'rose', items: ['Tens', 'Minutes each', 'Smoke on every deploy, full suite nightly', 'Selenium + TestNG'] },
      ] },
      { type: 'heading', value: 'Which tests run where' },
      { type: 'table', headers: ['Pipeline stage', 'Tests', 'Target time'], rows: [
        ['Pull request / commit', 'Unit tests, static code analysis (SAST), dependency scan', 'Under 10 minutes'],
        ['Deploy to QA', 'API tests, UI smoke suite', 'Under 20 minutes'],
        ['Nightly', 'Full UI regression, cross-browser tests', 'Hours are OK'],
        ['Staging', 'Performance tests (JMeter), DAST security scan (OWASP ZAP)', 'Before release'],
        ['Production', 'Smoke checks and monitoring (shift-right)', 'After release'],
      ] },
      { type: 'heading', value: 'A continuous testing pipeline' },
      { type: 'code', language: 'groovy', value: `pipeline {
    agent any
    tools {
        jdk 'JDK17'
        maven 'Maven3'
    }
    stages {
        stage('Unit Tests') {
            steps {
                sh 'mvn -B clean test -DsuiteXmlFile=unit.xml'
            }
        }
        stage('Deploy to QA') {
            steps {
                sh './scripts/deploy.sh qa'
            }
        }
        stage('API + UI Smoke') {
            parallel {
                stage('API Tests') {
                    steps {
                        sh 'mvn -B test -DsuiteXmlFile=api.xml'
                    }
                }
                stage('UI Smoke') {
                    steps {
                        sh 'mvn -B test -DsuiteXmlFile=smoke.xml -Dheadless=true'
                    }
                }
            }
        }
        stage('Performance') {
            when { branch 'main' }
            steps {
                sh 'jmeter -n -t perf/checkout.jmx -l target/perf-results.jtl'
            }
        }
    }
    post {
        always {
            junit testResults: 'target/surefire-reports/*.xml', allowEmptyResults: true
        }
    }
}` },
      { type: 'syntax', title: 'What is new here', parts: [
        { clause: '-DsuiteXmlFile=unit.xml', text: 'Runs a suite file that includes only the "unit" group (groups were covered in lesson 9.1).' },
        { clause: 'parallel { }', text: 'API and UI smoke tests run at the same time to save minutes.' },
        { clause: "when { branch 'main' }", text: 'The slow performance stage runs only on the main branch (in a multibranch pipeline).' },
        { clause: 'jmeter -n -t ... -l ...', text: 'Runs JMeter in non-GUI mode with a test plan and saves the results file.' },
        { clause: 'Stage order', text: 'Fast, cheap tests first. If unit tests fail, the pipeline stops before slow UI tests.' },
      ] },
      { type: 'heading', value: 'Keeping the pipeline trustworthy' },
      { type: 'list', items: [
        "Fix or quarantine flaky tests quickly. Move them to a separate group until fixed.",
        "Use explicit waits, not Thread.sleep(), to avoid timing failures.",
        "Give each test its own data so tests do not affect each other.",
        "Keep PR feedback fast: move long suites to nightly jobs.",
        "Treat a red build as the team's top priority.",
      ] },
      { type: 'alert', value: "Shift-left does not mean 'no testing later'. It means start early AND keep testing at every stage." },
      { type: 'heading', value: 'Try it yourself' },
      { type: 'list', ordered: true, items: [
        "Put your ShopEasy tests into groups: unit, api, smoke and regression.",
        "Create smoke.xml and regression.xml suite files.",
        "Build a Jenkinsfile with a Unit stage and a parallel API + UI Smoke stage.",
        "Add a separate nightly job with triggers { cron('H 2 * * *') } that runs regression.xml.",
        "Find one flaky test in your suite, write down why it is flaky, and fix it.",
      ] },
      { type: 'heading', value: 'Check your understanding' },
      { type: 'list', items: [
        "What does continuous testing add to a pipeline? (Quality feedback at every stage.)",
        "What does shift-left mean? (Testing earlier, when bugs are cheaper to fix.)",
        "Which tests should be the largest group in the pyramid? (Unit tests.)",
        "Why run fast tests before slow ones? (To fail fast and give quick feedback.)",
      ] },
    ],
    callout: { lead: 'Think of it like this:', text: "Continuous testing is like airport security with many checkpoints. Your ticket is checked at check-in, your bag is scanned, your passport is checked at the gate. A problem is caught at the first checkpoint it reaches, not when the plane is already in the air." },
    mistakes: [
      "Running only UI tests and no unit or API tests (an 'ice-cream cone' instead of a pyramid).",
      "Putting slow full regression on every pull request, so developers wait an hour for feedback.",
      "Re-running flaky tests until they pass instead of fixing the cause.",
      "Leaving security and performance testing until the week before release.",
      "Letting builds stay red for days, so people stop trusting the pipeline.",
    ],
    takeaways: [
      "Continuous testing gives quality feedback at every pipeline stage.",
      "Shift-left means testing earlier; shift-right adds checks in production.",
      "Follow the test pyramid: many unit tests, some API tests, few UI tests.",
      "Run fast tests first and use parallel stages to keep feedback quick.",
      "Security (SAST/DAST) and performance checks belong in the pipeline too.",
      "Flaky tests destroy trust; fix or quarantine them quickly.",
    ],
  },
};
