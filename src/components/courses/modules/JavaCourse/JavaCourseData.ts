import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
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
  exercise?: {
    title: string;
    description: string;
    instructions: string[];
    starterCode: string;
    expectedOutput: string;
    type: string;
  };
  quiz: QuizQuestion[];
  assignment: {
    // Plain strings are written questions; objects with kind:'code' render a
    // runnable editor. See ModuleAssignment for the full shape.
    prompts: AssignmentQuestion[];
  };
}

export const JAVA_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION TO JAVA',
    overview: 'Get started with Java. Understand what Java is, its history, architecture (JVM, JRE, JDK), installation, and run your first Hello World program.',
    outcomes: [
      'Understand JVM, JRE, and JDK relationships.',
      'Configure local Java environment on VS Code or IntelliJ.',
      'Write, compile, and run your first Java program.'
    ],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Welcome to Java',
        objectives: [
          'Understand the current industrial relevance and scope of Java.',
          'Learn why Java is the language of choice for large-scale enterprise backends.',
          'Explore the concept of backward compatibility and community support.'
        ],
        theory: 'Welcome to the world of Java programming! Java is a highly popular, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. First released in 1995 by Sun Microsystems, Java has evolved into one of the most reliable and widely used programming languages in the world. Java powers a vast ecosystem, ranging from enterprise-scale web applications, cloud-native services, and big data infrastructure to Android apps, financial transaction systems, and embedded devices. The core value proposition of Java is its high reliability, secure runtime environment, backward compatibility, and massive global community. With its strong type safety, automatic memory management (garbage collection), and extensive standard library, Java helps developers build robust, scalable applications that can run on virtually any platform without modification.',
        takeaways: [
          'Java is a mature, production-proven language powering enterprise backends, Android apps, and financial systems globally.',
          'The language emphasizes type safety, readability, and security.',
          'Java features a vast library ecosystem and a robust virtual machine environment.'
        ]
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 What is Java?',
        objectives: [
          'Differentiate between source code (.java) and compiled bytecode (.class).',
          'Understand how Java combines compilation and interpretation for cross-platform execution.',
          'Learn the role of the JIT (Just-In-Time) compiler in performance optimization.'
        ],
        theory:
          'Java is a powerful, platform-independent programming language created by Sun Microsystems (now Oracle). It is both `compiled` and `interpreted`, making it unique. When you write Java code, it is saved in a `.java` source file.\n' +
          'The Java compiler (`javac`) converts this source code into an intermediate format called `bytecode`, which is stored in a `.class` file. Bytecode is a highly optimized set of instructions that is neutral to the platform.\n' +
          'The Java Virtual Machine (`JVM`) then reads and executes this bytecode on the underlying operating system. This compilation-interpretation hybrid model gives Java its famous **portability**, **security**, and **performance**. Just-In-Time (JIT) compilers further optimize bytecode at runtime for near-native speed.',
        callout: {
          lead: 'Think of Java like this:',
          text: 'You write once, compile to bytecode, and run anywhere.'
        },
        sidePanel: {
          title: 'How Java Works',
          diagram: 'java-pipeline',
          bulletsTitle: 'Why Java?',
          bullets: [
            { label: 'Platform Independent', text: 'Runs on any device with a JVM' },
            { label: 'Robust & Secure', text: 'Built-in security features & strong memory management' },
            { label: 'High Performance', text: 'JIT compiler optimizes code at runtime' },
            { label: 'Object-Oriented', text: 'Promotes modular, reusable, and maintainable code' },
            { label: 'Large Ecosystem', text: 'Rich standard library & active community' }
          ]
        },
        takeaways: [
          'Java source code is compiled into platform-neutral bytecode (.class).',
          'Bytecode is executed on the target machine by the Java Virtual Machine (JVM).',
          'Hybrid architecture + JIT compilation makes Java secure, portable, and fast.'
        ]
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 History of Java',
        objectives: [
          'Trace the origins of Java from the Green Project and its founders.',
          'Understand the significance of the \'Write Once, Run Anywhere\' (WORA) philosophy.',
          'Learn about the evolution of Java versions and the modern LTS release cycle.'
        ],
        theory: 'Java was initiated by James Gosling, Mike Sheridan, and Patrick Naughton in June 1991 as part of the \'Green Project\' at Sun Microsystems. Initially designed for interactive television and consumer digital devices, the language was originally named Oak (after an oak tree that stood outside Gosling\'s office), and later renamed Green. Ultimately, it was named \'Java\' (inspired by Java coffee, which the team consumed in large quantities). The first public implementation, Java 1.0, was released in 1995 under the promise of \'Write Once, Run Anywhere\' (WORA). In 2010, Oracle Corporation acquired Sun Microsystems, taking over ownership and stewardship of Java. Today, Java follows a strict release cycle, with a new version released every six months and Long-Term Support (LTS) versions released every two years (such as Java 11, 17, and 21).',
        takeaways: [
          'Created by James Gosling at Sun Microsystems in the early 1990s.',
          'Designed to solve the problem of platform-dependent software development.',
          'Now owned and maintained by Oracle with predictable 6-month release cadences.'
        ]
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 Features of Java',
        objectives: [
          'Explain the key architectural design features that define Java.',
          'Understand how Java achieves robustness through compile-time and runtime checks.',
          'Explore the security model of the Java runtime environment.'
        ],
        theory: 'Java\'s success is due to several core design features:\n\n1. **Simple**: Java syntax is easy to learn and write, clean, and avoids complex features like explicit pointers, operator overloading, and multiple inheritance of classes.\n2. **Object-Oriented**: Everything in Java is an object (except primitive types), promoting modularity, reusability, and clean architecture.\n3. **Platform-Independent**: Compilation to bytecode allows Java programs to run on any computer that has a JVM.\n4. **Secure**: Java code runs inside a virtual sandbox, preventing direct access to physical memory and hardware unless permitted.\n5. **Robust**: Strong type checking, exception handling, and automatic garbage collection eliminate memory leaks and common runtime crashes.\n6. **Multithreaded**: Java has built-in support for writing programs that can execute multiple tasks concurrently, maximizing CPU utilization.',
        takeaways: [
          'Java eliminates pointers and manual memory management to prevent memory errors.',
          'Platform independence is achieved via the JVM\'s interpreter and JIT.',
          'Inherently supports multithreading and concurrency out of the box.'
        ]
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 JDK, JRE, and JVM',
        objectives: [
          'Distinguish the functions and relationships between JVM, JRE, and JDK.',
          'Learn which packages are required for developing vs running applications.',
          'Understand why the JVM is platform-dependent while bytecode is platform-independent.'
        ],
        theory: 'To develop and run Java programs, you must understand the relationship between the JDK, JRE, and JVM:\n\n1. **JVM (Java Virtual Machine)**: The core engine that loads, verifies, compiles, and executes Java bytecode on a specific hardware platform. The JVM itself is platform-dependent because it must translate bytecode into machine-specific instructions.\n2. **JRE (Java Runtime Environment)**: A software package that contains the JVM, core libraries, and support files necessary to run compiled Java applications. It does not contain development tools like compilers.\n3. **JDK (Java Development Kit)**: A complete software development environment that includes the JRE, along with developers\' tools such as the compiler (`javac`), archiver (`jar`), and debugger. If you want to write Java code, you need the JDK; if you only want to run it, the JRE is sufficient.',
        syntax: 'JDK (Java Development Kit) = JRE + Development Tools (javac, jar, jdb, etc.)\nJRE (Java Runtime Environment) = JVM + Class Libraries + Support Files\nJVM (Java Virtual Machine) = Execution Engine + Bytecode Verifier + Class Loader',
        takeaways: [
          'JVM executes bytecode and is platform-dependent.',
          'JRE contains the JVM and runtime libraries, suitable for end-users.',
          'JDK includes JRE and command line tools (javac) needed by developers.'
        ]
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 Installing Java',
        objectives: [
          'Choose and download a suitable OpenJDK distribution (e.g., Adoptium Temurin).',
          'Install the JDK on your specific operating system (macOS/Windows/Linux).',
          'Configure environment variables (JAVA_HOME and PATH) for command line utility access.'
        ],
        theory: 'To start coding in Java, you need to install a Java Development Kit (JDK). Today, there are many builds of OpenJDK available, such as Eclipse Temurin (by Adoptium), Amazon Corretto, Microsoft Build of OpenJDK, or Oracle\'s official JDK. It is highly recommended to install a Long-Term Support (LTS) version, such as JDK 17 or JDK 21.\n\n**Installation Steps:**\n1. Download the installer for your operating system (Windows, macOS, or Linux) from a trusted distributor (e.g., Adoptium).\n2. Run the installer and follow the prompt instructions.\n3. Set the `JAVA_HOME` environment variable to point to the JDK installation directory.\n4. Update your system `PATH` variable to include the JDK `bin` directory. This allows you to run `java` and `javac` commands from any terminal window.\n\n**Verification:** Open a terminal and run `java -version` and `javac -version` to confirm successful installation.',
        takeaways: [
          'Install JDK 17 or 21 LTS for production-grade projects.',
          'Always set JAVA_HOME environment variable to ensure system utilities can locate the compiler.',
          'Verify correct setup using command line: java -version'
        ]
      },
      {
        id: 'm1-l7',
        title: 'Lesson 1.7 Setting Up IDEs',
        objectives: [
          'Configure Visual Studio Code with the Extension Pack for Java.',
          'Set up IntelliJ IDEA Community Edition for local Java development.',
          'Understand the advantages of IDEs like auto-completion, refactoring, and debugging.'
        ],
        theory: 'While you can write Java code in a simple text editor and compile it via the command line, using an Integrated Development Environment (IDE) significantly boosts productivity. The two most popular choices are:\n\n1. **Visual Studio Code (VS Code)**: A lightweight, extensible editor. To write Java, install the \'Extension Pack for Java\' from Microsoft, which includes support for code completion, debugging, project management, and automated test runners.\n2. **IntelliJ IDEA**: The industry-standard IDE developed by JetBrains specifically for Java. The free \'Community Edition\' is highly powerful, providing intelligent code completion, deep static code analysis, built-in version control, refactoring tools, and integrated build tools.\n\nIn this course, we recommend starting with a clean workspace folder to organize your packages, class files, and build configurations.',
        takeaways: [
          'VS Code with Microsoft extension pack is excellent for light to medium projects.',
          'IntelliJ IDEA is the most powerful industry standard for large enterprise applications.',
          'IDEs automate compiling, linking, running, and testing cycles in the background.'
        ]
      },
      {
        id: 'm1-l8',
        title: 'Lesson 1.8 Your First Java Program',
        objectives: [
          'Write, compile, and run your very first Java program.',
          'Understand the file-naming rules regarding public classes.',
          'Examine the signature and structure of the main entry point method.'
        ],
        theory: 'Let\'s dissect the classic \'Hello, World!\' program to understand Java\'s basic structure and grammar:\n\n```java\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n```\n\n**Key Rules & Breakdown:**\n1. **`public class Main`**: In Java, all code must reside inside a class. The class name (`Main`) must exactly match the filename (`Main.java`), including capitalization.\n2. **`public static void main(String[] args)`**: This is the entry point method. The JVM looks for this exact signature to start executing your application.\n   - `public`: Accessible from anywhere.\n   - `static`: Can be called without creating an instance of the class.\n   - `void`: Does not return any value.\n   - `main`: Method name.\n   - `String[] args`: Takes an array of strings as command-line arguments.\n3. **`System.out.println(...)`**: Prints the string inside the double quotes to the console, followed by a new line. `System` is a standard class, `out` is an output stream, and `println` is the method.',
        syntax: 'public class <ClassName> {\n    public static void main(String[] args) {\n        // Statement(s) here;\n    }\n}',
        codeExample: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Welcome to Skillofied Java Mastery!");\n    }\n}',
        codeOutput: 'Welcome to Skillofied Java Mastery!',
        takeaways: [
          'Java is strictly object-oriented; all variables and methods must be declared within a class.',
          'The class name must match the .java file name precisely.',
          'The main method signature is the standard entry point recognized by the JVM.'
        ]
      }
    ],
    exercise: {
      title: 'Variable naming checker',
      description: 'Validate if a variable name follows standard camelCase and rules in Java.',
      instructions: ['Must not start with a digit.', 'Should follow camelCase.', 'Cannot be a reserved keyword.'],
      starterCode: 'String 1name = "Fail";',
      expectedOutput: 'Invalid',
      type: 'input_validation'
    },
    quiz: [
      {
        id: 1,
        question: 'Who is recognized as the father of the Java programming language?',
        options: [
          'A. Bjarne Stroustrup',
          'B. Dennis Ritchie',
          'C. Guido van Rossum',
          'D. James Gosling'
        ],
        correctAnswer: 'D. James Gosling'
      },
      {
        id: 2,
        question: 'What was the original name of the Java programming language when it was first developed?',
        options: [
          'A. Coffee',
          'B. Green',
          'C. Oak',
          'D. C+++'
        ],
        correctAnswer: 'C. Oak'
      },
      {
        id: 3,
        question: "Which of the following slogans best describes Java's key feature of platform independence?",
        options: [
          'A. Write Once, Run Anywhere (WORA)',
          'B. Run Once, Test Everywhere',
          'C. Compile Anywhere, Debug Everywhere',
          'D. Code Once, Interpret Always'
        ],
        correctAnswer: 'A. Write Once, Run Anywhere (WORA)'
      },
      {
        id: 4,
        question: 'What components are included in the Java Development Kit (JDK)?',
        options: [
          'A. Operating system libraries and JVM exclusively',
          'B. JRE and development tools like \'javac\'',
          'C. Only the Java Virtual Machine (JVM)',
          'D. Only the Java Runtime Environment (JRE)'
        ],
        correctAnswer: 'B. JRE and development tools like \'javac\''
      },
      {
        id: 5,
        question: 'Which component is strictly responsible for executing Java bytecode directly on a host machine?',
        options: [
          'A. Java Compiler (javac)',
          'B. Java Virtual Machine (JVM)',
          'C. Java Source File (.java)',
          'D. Integrated Development Environment (IDE)'
        ],
        correctAnswer: 'B. Java Virtual Machine (JVM)'
      },
      {
        id: 6,
        question: 'What file extension does a compiled Java bytecode file have?',
        options: [
          'A. .java',
          'B. .exe',
          'C. .class',
          'D. .jar'
        ],
        correctAnswer: 'C. .class'
      },
      {
        id: 7,
        question: 'Which of the following statements is true regarding the platform independence of Java components?',
        options: [
          'A. Java Bytecode is platform-dependent, but the JVM is platform-independent.',
          'B. Both Java Bytecode and the JVM are platform-dependent.',
          'C. Java Bytecode is platform-independent, but the JVM is platform-dependent.',
          'D. Both Java Bytecode and the JVM are platform-independent.'
        ],
        correctAnswer: 'C. Java Bytecode is platform-independent, but the JVM is platform-dependent.'
      },
      {
        id: 8,
        question: 'What feature of Java automatically manages memory by reclaiming space occupied by objects that are no longer in use?',
        options: [
          'A. Garbage Collection',
          'B. Finalization Buffer',
          'C. Manual Deconstructors',
          'D. Memory Pointer Allocation'
        ],
        correctAnswer: 'A. Garbage Collection'
      },
      {
        id: 9,
        question: "In a basic Java program, what is the exact required signature for the application's entry point method?",
        options: [
          'A. public static void main(String[] args)',
          'B. public void main(String args[])',
          'C. public static void Main(String args)',
          'D. private static int main(String[] args)'
        ],
        correctAnswer: 'A. public static void main(String[] args)'
      },
      {
        id: 10,
        question: "If a public class in a Java source file is named 'Welcome', what must the source code file be named?",
        options: [
          'A. welcome.class',
          'B. Main.java',
          'C. Welcome.java',
          'D. welcome.java'
        ],
        correctAnswer: 'C. Welcome.java'
      },
      {
        id: 11,
        question: 'Which tool or feature is an Integrated Development Environment (IDE) primarily used for during Java setup?',
        options: [
          'A. Hosting databases remotely',
          'B. Providing an all-in-one text editor, build automation tool, and debugger',
          'C. Replacing the local operating system',
          'D. Exclusively executing bytecode without an underlying JVM'
        ],
        correctAnswer: 'B. Providing an all-in-one text editor, build automation tool, and debugger'
      },
      {
        id: 12,
        question: "What is the command line utility used to compile a Java file named 'Test.java'?",
        options: [
          'A. javac Test.java',
          'B. run javac Test',
          'C. java Test.java',
          'D. compile Test.class'
        ],
        correctAnswer: 'A. javac Test.java'
      },
      {
        id: 13,
        question: "What does the 'void' keyword mean in the statement 'public static void main(String[] args)'?",
        options: [
          'A. The method is empty and has no internal code logic.',
          'B. The method does not return any value when it finishes executing.',
          'C. The method takes no parameters.',
          'D. The variables inside the method are null by default.'
        ],
        correctAnswer: 'B. The method does not return any value when it finishes executing.'
      },
      {
        id: 14,
        question: "Java is described as a 'Robust' language. Which feature directly contributes to this characteristic?",
        options: [
          'A. Strong type checking and exception handling mechanisms',
          'B. Lightweight syntax copied directly from scripting languages',
          'C. Support for platform-specific system pointers',
          'D. Its dependence on a web browser to run basic desktop software'
        ],
        correctAnswer: 'A. Strong type checking and exception handling mechanisms'
      },
      {
        id: 15,
        question: "Which command is used to run a compiled class file named 'Demo.class' from the terminal?",
        options: [
          'A. java Demo',
          'B. execute Demo',
          'C. javac Demo',
          'D. run Demo.class'
        ],
        correctAnswer: 'A. java Demo'
      },
      {
        id: 16,
        question: 'What system environment variable must often be configured manually to let your computer discover standard Java developer utilities from any directory terminal?',
        options: [
          'A. HOME_FOLDER',
          'B. IDE_LINK',
          'C. PATH',
          'D. JAVA_VERSION'
        ],
        correctAnswer: 'C. PATH'
      },
      {
        id: 17,
        question: "Which of these lines uses correct syntax to display the message 'Hello World' on the user console screen?",
        options: [
          'A. Print("Hello World");',
          'B. system.out.printLn(\'Hello World\');',
          'C. System.Output.Println(\'Hello World\');',
          'D. System.out.println("Hello World");'
        ],
        correctAnswer: 'D. System.out.println("Hello World");'
      },
      {
        id: 18,
        question: "Why is the main method declared as 'static' in a standard Java application?",
        options: [
          'A. To prevent other developers from modifying or overriding the method\'s code',
          'B. To enable the JVM to call the method without creating an instance of the class first',
          'C. To explicitly hide the method from unauthorized outside runtime systems',
          'D. To allow the main method to dynamically change return types at runtime'
        ],
        correctAnswer: 'B. To enable the JVM to call the method without creating an instance of the class first'
      },
      {
        id: 19,
        question: 'Which statement accurately describes the core architectural relationship between the JDK and the JRE?',
        options: [
          'A. They are completely independent systems with no overlapping tools.',
          'B. The JDK is a superset that includes the complete JRE plus development tools.',
          'C. The JRE contains the JDK along with separate design compilers.',
          'D. The JDK manages hardware interfaces while the JRE handles text formatting.'
        ],
        correctAnswer: 'B. The JDK is a superset that includes the complete JRE plus development tools.'
      },
      {
        id: 20,
        question: 'What role do double forward slashes (//) perform when written inside a Java source file?',
        options: [
          'A. They mark the beginning of a single-line text comment.',
          'B. They are required before importing external system modules.',
          'C. They create a secure network link to external servers.',
          'D. They represent integer mathematical division operations.'
        ],
        correctAnswer: 'A. They mark the beginning of a single-line text comment.'
      }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'Which component of the Java environment contains the compiler (javac) and other development tools?',
          options: [
            'A. Java Virtual Machine (JVM)',
            'B. Java Runtime Environment (JRE)',
            'C. Java Development Kit (JDK)',
            'D. Java Class Loader'
          ],
          correctAnswer: 'C. Java Development Kit (JDK)'
        },
        {
          kind: 'mcq',
          prompt: 'Why is Java referred to as a "Platform Independent" language?',
          options: [
            'A. The source code (.java) can run directly on any operating system without compilation.',
            'B. The compiled bytecode (.class) is platform-neutral and can run on any JVM.',
            'C. The Java compiler generates machine-native assembly code for every platform.',
            'D. The Java Virtual Machine (JVM) is identical across all operating systems.'
          ],
          correctAnswer: 'B. The compiled bytecode (.class) is platform-neutral and can run on any JVM.'
        },
        {
          kind: 'mcq',
          prompt: 'Which statement correctly describes the platform dependency of the Java Virtual Machine (JVM)?',
          options: [
            'A. The JVM is platform-independent; the same JVM runs on Linux, Mac, and Windows.',
            'B. The JVM is platform-dependent; a specific version must be installed for each OS.',
            'C. The JVM only runs on Windows systems.',
            'D. The JVM is written entirely in Java and dynamically adapts to the host machine.'
          ],
          correctAnswer: 'B. The JVM is platform-dependent; a specific version must be installed for each OS.'
        },
        {
          kind: 'mcq',
          prompt: 'What is the correct command-line sequence to compile a Java file named App.java?',
          options: [
            'A. java App.java',
            'B. javac App.java',
            'C. run App.class',
            'D. compile App.java'
          ],
          correctAnswer: 'B. javac App.java'
        },
        {
          kind: 'mcq',
          prompt: 'After successfully compiling App.java into App.class, which command is used to run it?',
          options: [
            'A. java App',
            'B. java App.class',
            'C. run App',
            'D. javac App'
          ],
          correctAnswer: 'A. java App'
        },
        {
          kind: 'mcq',
          prompt: 'What is the extension of the compiled Java bytecode file generated by the compiler?',
          options: [
            'A. .java',
            'B. .class',
            'C. .exe',
            'D. .jar'
          ],
          correctAnswer: 'B. .class'
        }
      ]
    }
  },
  m2: {
    id: 'm2',
    title: 'MODULE 2: JAVA BASICS',
    overview: 'Learn basic structure, variables, primitive types, operators, Scanner for console user input, and System.out formatting.',
    outcomes: [
      'Differentiate primitive vs non-primitive datatypes.',
      'Perform type casting (widening and narrowing).',
      'Read console inputs using the Scanner class.'
    ],
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1 Java Program Structure',
        objectives: [
          'Understand package declarations and namespace management in Java.',
          'Learn how to import external classes from the standard library.',
          'Understand how classes, methods, and variables are nested inside a file.'
        ],
        theory: 'Every Java program follows a rigid hierarchical structure. At the absolute top sits the package declaration (e.g., `package com.skillofied;`), which establishes the namespace and folder layout. Next come import statements, which allow you to reference classes outside the current package (e.g., `import java.util.ArrayList;`). Following this is the class definition. In Java, all executable code must reside inside a class. Inside this class, you declare member variables (state) and methods (behavior). Note that if a class is declared public, it must be defined in a file matching its exact name (with a `.java` extension). Proper indentation, camelCase formatting for methods/variables, and TitleCase formatting for classes are critical best practices that ensure readability in team environments.',
        syntax: 'package <packageName>;\n\nimport <externalClassPath>;\n\npublic class <ClassName> {\n    // Member variables (State)\n    // Constructor(s)\n    // Methods (Behavior)\n}',
        codeExample: 'package com.demo;\n\nimport java.time.LocalDate;\n\npublic class SystemReport {\n    public static void main(String[] args) {\n        System.out.println("System initialized on: " + LocalDate.now());\n    }\n}',
        codeOutput: 'System initialized on: 2026-07-06',
        takeaways: [
          'The package statement must be the very first non-comment line in your file.',
          'Imports tell the compiler where to look for pre-written external libraries.',
          'All Java files must wrap execution logic inside a class definition block.'
        ]
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2 Comments in Java',
        objectives: [
          'Use single-line and multi-line comments effectively to document code.',
          'Generate professional API documentations using JavaDoc syntax.',
          'Understand how compiler processes ignore commented blocks.'
        ],
        theory: 'Comments are descriptive notes written to help developers understand the logic, intent, or design choices of the source code. The Java compiler (`javac`) strips comments entirely during the parsing phase, meaning they do not affect compilation speed or compiled `.class` file performance.\n\nJava provides three distinct comment formats:\n1. **Single-line comments**: Initiated with double slashes `//`. Everything following `//` on that line is ignored.\n2. **Multi-line comments**: Wrapped inside `/*` and `*/`. This is useful for writing multi-line explanations or temporarily disabling blocks of code.\n3. **JavaDoc comments**: Wrapped inside `/**` and `*/`. These are specialized comments placed before classes, variables, or methods that can be extracted automatically by the `javadoc` tool to build interactive HTML developer API documentations.',
        syntax: '// Single line comment\n\n/*\n   Multi-line comment block\n   spanning multiple lines\n*/\n\n/**\n * JavaDoc style document comments\n * @param args description of CLI parameters\n */',
        codeExample: 'public class Calculation {\n    public static void main(String[] args) {\n        // Calculate simple tax deduction\n        double salary = 80000.0;\n        /* Tax rates vary by state.\n           Using default rate of 15% */\n        double tax = salary * 0.15;\n        System.out.println("Tax: $" + tax);\n    }\n}',
        codeOutput: 'Tax: $12000.0',
        takeaways: [
          'Comments are ignored by the compiler and are purely for developer reference.',
          'Do not over-comment obvious lines; explain the "why" rather than the "what".',
          'Use JavaDoc comments (`/** ... */`) to document public methods and APIs.'
        ]
      },
      {
        id: 'm2-l3',
        title: 'Lesson 2.3 Variables',
        objectives: [
          'Declare and initialize variables with correct type safety rules.',
          'Understand variable scopes: local, instance, and static parameters.',
          'Apply naming conventions like camelCase and descriptive identifiers.'
        ],
        theory: 'A variable is a symbolic name pointing to a memory location that stores a value. Java is a statically-typed language, meaning that every variable must be declared with a specific data type before it can be used, and this type cannot change. Declaring a variable tells the computer to reserve a block of memory of the appropriate size. Instantiation or initialization assigns a starting value to that variable.\n\nVariables in Java have defined scopes:\n- **Local variables**: Declared inside a method, only accessible inside that method, and must be initialized before first use.\n- **Instance variables**: Declared inside a class but outside any method, representing object properties.\n- **Static variables**: Declared with the `static` keyword, shared among all instances of a class.',
        syntax: '<dataType> <variableName>; // Declaration\n<variableName> = <value>;  // Initialization\n\n<dataType> <variableName> = <value>; // Combined declaration and initialization',
        codeExample: 'public class Counter {\n    public static void main(String[] args) {\n        int visitors = 12; // local variable\n        visitors = visitors + 5;\n        System.out.println("Current Visitors: " + visitors);\n    }\n}',
        codeOutput: 'Current Visitors: 17',
        takeaways: [
          'Java requires variables to be explicitly typed and initialized before use.',
          'Local variables do not receive default values; you must initialize them manually.',
          'Always use camelCase starting with a letter for variables (e.g. employeeCount).'
        ]
      },
      {
        id: 'm2-l4',
        title: 'Lesson 2.4 Data Types',
        objectives: [
          'Differentiate between primitive and reference data types.',
          'Memorize sizes, range limits, and default values of all 8 primitives.',
          'Choose the optimal data type based on precision and memory usage.'
        ],
        theory: 'Data types in Java are divided into two main categories:\n\n1. **Primitive Data Types**: Predefined, built-in types that store raw values in stack memory. There are exactly 8 primitives:\n   - `byte` (1 byte, range -128 to 127)\n   - `short` (2 bytes, range -32,768 to 32,767)\n   - `int` (4 bytes, range -2B to 2B - standard for numbers)\n   - `long` (8 bytes, suffix with \'L\' or \'l\')\n   - `float` (4 bytes, single-precision, suffix with \'f\' or \'F\')\n   - `double` (8 bytes, double-precision - standard for decimals)\n   - `char` (2 bytes, holds a single Unicode character wrapped in single quotes, e.g. \'A\')\n   - `boolean` (1 bit, stores only `true` or `false`)\n\n2. **Reference Data Types**: Point to objects in heap memory (e.g., `String`, `Array`, user-defined classes). Reference types store the memory address of the object rather than the object itself.',
        syntax: 'int pageNumber = 4;\ndouble price = 19.99;\nchar grade = \'A\';\nboolean isCompleted = true;\nString bookTitle = "Java Basics"; // Reference type',
        codeExample: 'public class TypesDemo {\n    public static void main(String[] args) {\n        long worldPopulation = 8000000000L; // requires L suffix\n        float taxRate = 0.0825f; // requires f suffix\n        char status = \'Y\';\n        System.out.println("Population: " + worldPopulation);\n        System.out.println("Rate: " + taxRate + ", Status: " + status);\n    }\n}',
        codeOutput: 'Population: 8000000000\nRate: 0.0825, Status: Y',
        takeaways: [
          'Primitives store the literal values, while reference types store addresses.',
          'Always append \'L\' for long values and \'f\' for float values to satisfy the compiler.',
          'Double-precision decimals (double) are the default for decimal literals.'
        ]
      },
      {
        id: 'm2-l5',
        title: 'Lesson 2.5 Type Casting',
        objectives: [
          'Differentiate between widening and narrowing type conversions.',
          'Apply explicit casting operators to force conversions without compiler errors.',
          'Avoid potential runtime data loss caused by numeric overflow or truncating decimals.'
        ],
        theory: 'Type casting is the process of converting a value of one data type into another. In Java, this happens in two ways:\n\n1. **Widening Casting (Implicit)**: Automatically done by Java when converting a smaller type to a larger type size. It is completely safe and incurs no loss of data.\n   `byte` -> `short` -> `char` -> `int` -> `long` -> `float` -> `double`.\n\n2. **Narrowing Casting (Explicit)**: Must be done manually by placing the target type in parentheses before the value. This is required because you are converting a larger type size to a smaller size, which could lead to truncation (losing decimals) or overflow.',
        syntax: '// Implicit Widening\nint myInt = 9;\ndouble myDouble = myInt; \n\n// Explicit Narrowing\ndouble originalDouble = 9.78;\nint castedInt = (int) originalDouble; // castedInt becomes 9',
        codeExample: 'public class Casting {\n    public static void main(String[] args) {\n        double salary = 45500.85;\n        int roundSalary = (int) salary; // drops decimal digits\n        System.out.println("Original: " + salary);\n        System.out.println("Casted: " + roundSalary);\n    }\n}',
        codeOutput: 'Original: 45500.85\nCasted: 45500',
        takeaways: [
          'Widening casting happens implicitly and automatically.',
          'Narrowing casting requires explicit syntax and drops any decimal remainder (does not round).',
          'Attempting to narrow outside range limits will result in integer overflow wrapped values.'
        ]
      },
      {
        id: 'm2-l6',
        title: 'Lesson 2.6 Operators',
        objectives: [
          'Use arithmetic operators (+, -, *, /, %) and understand integer division.',
          'Apply relational (==, !=, <, >) and logical (&&, ||, !) operators in conditions.',
          'Learn operator precedence hierarchy and shortcut assignment rules.'
        ],
        theory: 'Operators are special symbols that perform operations on operands (variables and values). Java divides operators into several categories:\n\n- **Arithmetic Operators**: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), and `%` (modulus/remainder).\n  *Note*: Integer division `/` discards decimals (e.g. `5 / 2` is `2`). Modulus `%` returns the remainder (e.g. `5 % 2` is `1`).\n- **Unary Operators**: `++` (increment by 1), `--` (decrement by 1). Prefixes (`++x`) increment before evaluation, while suffixes (`x++`) increment after evaluation.\n- **Relational Operators**: Compare values and return boolean true/false. Includes `==`, `!=`, `>`, `<`, `>=`, `<=Point`.\n- **Logical Operators**: `&&` (logical AND - returns true if both are true), `||` (logical OR - returns true if at least one is true), and `!` (logical NOT).',
        syntax: 'int sum = a + b;\nboolean match = (x == y);\nboolean criteria = (age >= 18 && hasID);',
        codeExample: 'public class OperatorsDemo {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 3;\n        System.out.println("Division: " + (x / y));\n        System.out.println("Remainder: " + (x % y));\n        System.out.println("Logical: " + (x > 5 && y < 5));\n    }\n}',
        codeOutput: 'Division: 3\nRemainder: 1\nLogical: true',
        takeaways: [
          'Division with two integers throws away the remainder; cast one operand to double for exact values.',
          'Logical AND (&&) and logical OR (||) are short-circuiting: they skip evaluations if the output is determined early.',
          'Modulus (%) is highly useful for checking even/odd numbers and loop cycles.'
        ]
      },
      {
        id: 'm2-l7',
        title: 'Lesson 2.7 User Input using Scanner',
        objectives: [
          'Import and initialize the Scanner class from the java.util package.',
          'Read strings, integers, and floating-point inputs from the console.',
          'Identify and resolve common issues like newline buffering and resource leaks.'
        ],
        theory: 'To read inputs interactively from the terminal console, Java provides the `Scanner` class within the `java.util` package. You instantiate the Scanner by passing the standard input stream `System.in` to its constructor.\n\n**Reading Methods:**\n- `nextLine()`: Reads an entire line of text as a String.\n- `next()`: Reads a single space-delimited word.\n- `nextInt()`: Reads and parses an integer.\n- `nextDouble()`: Reads and parses a double.\n\n*Critical Warning*: Numeric readers like `nextInt()` leave a newline character `\\n` in the input buffer. If you call `nextLine()` immediately after reading a number, it will consume the leftover newline and return empty text. To prevent this, always place an extra dummy `scanner.nextLine()` to clear the buffer.',
        syntax: 'import java.util.Scanner;\n\nScanner scanner = new Scanner(System.in);\nString name = scanner.nextLine();\nint value = scanner.nextInt();\nscanner.close(); // clean up resources',
        codeExample: 'import java.util.Scanner;\n\npublic class ScannerDemo {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter rank: ");\n        int rank = scanner.nextInt();\n        scanner.nextLine(); // clear buffer\n        System.out.print("Enter name: ");\n        String name = scanner.nextLine();\n        System.out.println(name + " holds rank " + rank);\n        scanner.close();\n    }\n}',
        codeOutput: 'Enter rank: 1\nEnter name: Skillofied Master\nSkillofied Master holds rank 1',
        takeaways: [
          'Always import java.util.Scanner to use terminal readers.',
          'Close the scanner object when done to prevent memory leaks and resource warnings.',
          'Always clear the buffer using scanner.nextLine() when transitioning from numbers to lines.'
        ]
      },
      {
        id: 'm2-l8',
        title: 'Lesson 2.8 Output Formatting',
        objectives: [
          'Format console output precisely using System.out.printf.',
          'Utilize standard format specifiers like %d, %f, %s, and %b.',
          'Apply width flags, precision padding, and decimal constraints.'
        ],
        theory: 'While `System.out.println` is convenient, it offers no control over spacing, alignment, or number precision. To solve this, Java inherits `printf` (print formatted) from C. The `System.out.printf` method takes a format string containing specifiers, followed by arguments.\n\n**Format Specifiers:**\n- `%d`: Integers (byte, short, int, long)\n- `%f`: Floating-point numbers (float, double)\n- `%s`: Strings\n- `%b`: Booleans\n- `%n`: Platform-independent newline\n\n**Formatting Modifiers:**\n- `%.2f`: Formats a decimal number with exactly 2 digits after the decimal point.\n- `%10s`: Right-aligns a string within a column width of 10 characters.',
        syntax: 'System.out.printf("Format String", arg1, arg2, ...);',
        codeExample: 'public class Formatting {\n    public static void main(String[] args) {\n        double value = 123.45678;\n        String name = "Item";\n        int qty = 5;\n        // Format decimal to 2 decimal places\n        System.out.printf("%s count: %d, price: $%.2f%n", name, qty, value);\n        // Column formatting\n        System.out.printf("|%-10s|%5d|%n", "Aligned", 42);\n    }\n}',
        codeOutput: 'Item count: 5, price: $123.46\n|Aligned   |   42|',
        takeaways: [
          'printf provides clean spacing and formatting controls.',
          'Use %.Nf to format floating point numbers to exactly N decimal places.',
          'Always use %n instead of \\n to represent newlines in printf for cross-platform compatibility.'
        ]
      }
    ],
    exercise: {
      title: 'Temperature converter',
      description: 'Read a Celsius value, convert it to Fahrenheit, and print the result with correct type handling.',
      instructions: ['Declare a double for the Celsius temperature.', 'Apply the formula F = (C * 9/5) + 32 - watch out for integer division.', 'Print the result formatted to one decimal place with printf.'],
      starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        double celsius = 37.5;\n        // TODO: convert to Fahrenheit and print to 1 decimal place\n    }\n}',
      expectedOutput: '37.5C = 99.5F',
      type: 'scanner_sim'
    },
    quiz: [
      {id: 1, question: 'Which of the following is a valid variable identifier name in Java?', options: ['A. class', 'B. 2varName', 'C. variable name', 'D. _variable$5'], correctAnswer: 'D. _variable$5'},
      {id: 2, question: 'Which of the following data types is NOT a primitive data type in Java?', options: ['A. String', 'B. boolean', 'C. char', 'D. int'], correctAnswer: 'A. String'},
      {id: 3, question: 'What is the difference between widening type casting and narrowing type casting?', options: ['A. Narrowing casting happens automatically; widening casting must be done manually.', 'B. Both widening and narrowing type casting occur automatically at runtime.', 'C. Widening casting happens automatically; narrowing casting must be done manually.', 'D. Widening casting applies only to objects, while narrowing casting applies only to primitives.'], correctAnswer: 'C. Widening casting happens automatically; narrowing casting must be done manually.'},
      {id: 4, question: 'Which type of comment in Java is specifically processed by documentation generation utilities to create API reference sheets?', options: ['A. // Single-line comment', 'B. /** Documentation comment */', 'C. Shell comment', 'D. /* Multi-line comment */'], correctAnswer: 'B. /** Documentation comment */'},
      {id: 5, question: 'When collecting user console input using the Scanner class, what is the primary difference between using next() and nextLine()?', options: ['A. next() automatically converts inputs to uppercase characters.', 'B. next() reads input up to the next whitespace delimiter, while nextLine() reads the entire line until a newline character.', 'C. next() reads only numeric characters, while nextLine() reads text.', 'D. nextLine() handles numeric variables safer than next().'], correctAnswer: 'B. next() reads input up to the next whitespace delimiter, while nextLine() reads the entire line until a newline character.'},
      {id: 6, question: 'In the format string syntax used by System.out.printf(), what placeholder flag is designated to structure decimal floating-point representation outputs?', options: ['A. %f', 'B. %d', 'C. %c', 'D. %s'], correctAnswer: 'A. %f'},
      {id: 7, question: 'What is the behavior of short-circuit logical operators like && and || in Java expression evaluations?', options: ['A. They require execution paths to loop until variables change state.', 'B. They skip evaluating the second condition if the overall result is already determined by the first condition.', 'C. They always evaluate both sides of the expression to verify execution parity.', 'D. They invert the boolean answer automatically at the end of the evaluation statement.'], correctAnswer: 'B. They skip evaluating the second condition if the overall result is already determined by the first condition.'},
      {id: 8, question: 'Guess the output of the following Java code snippet:\n\nint a = 5;\nint b = a++ + ++a;\nSystem.out.println(\'a=\' + a + \', b=\' + b);', options: ['A. a=7, b=11', 'B. a=7, b=12', 'C. a=5, b=12', 'D. a=6, b=10'], correctAnswer: 'B. a=7, b=12'},
      {id: 9, question: 'Guess the output of the following Java code snippet:\n\nint x = 5;\nint y = 2;\ndouble result = x / y;\nSystem.out.println(result);', options: ['A. 2.5', 'B. 2.0', 'C. 0.4', 'D. 3.0'], correctAnswer: 'B. 2.0'},
      {id: 10, question: 'Guess the output of the following Java code snippet:\n\ndouble value = 9.78;\nint numerical = (int) value;\nSystem.out.println(numerical);', options: ['A. 9.78', 'B. 0', 'C. 10', 'D. 9'], correctAnswer: 'D. 9'},
      {id: 11, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(\'Output: \' + 10 + 20);', options: ['A. 30 Output:', 'B. Compilation Error', 'C. Output: 1020', 'D. Output: 30'], correctAnswer: 'C. Output: 1020'},
      {id: 12, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(10 + 20 + \' Output\');', options: ['A. Output 1020', 'B. 1020 Output', 'C. 30 Output', 'D. Output 30'], correctAnswer: 'C. 30 Output'},
      {id: 13, question: 'Guess the output of the following Java code snippet:\n\nint result = -5 % 2;\nSystem.out.println(result);', options: ['A. -1', 'B. 1', 'C. -2', 'D. 0'], correctAnswer: 'A. -1'},
      {id: 14, question: 'Guess the output of the following Java code snippet:\n\nboolean flag = false;\nint val = 10;\nif (flag && (val++ > 5)) {\nval += 5;\n}\nSystem.out.println(val);', options: ['A. 11', 'B. 10', 'C. 15', 'D. 16'], correctAnswer: 'B. 10'},
      {id: 15, question: 'Guess the output of the following Java code snippet:\n\nbyte b = 127;\nb++;\nSystem.out.println(b);', options: ['A. -1', 'B. Compilation Error', 'C. 128', 'D. -128'], correctAnswer: 'D. -128'},
      {id: 16, question: 'Guess the output of the following Java code snippet:\n\ndouble values = 5.6789;\nSystem.out.printf(\'%.2f\', values);', options: ['A. 5.6789', 'B. 5.67', 'C. 5.7', 'D. 5.68'], correctAnswer: 'D. 5.68'},
      {id: 17, question: 'Guess the output of the following Java code snippet:\n\nint n1 = 10;\nint n2 = 20;\nn1 = n1 + n2;\nn2 = n1 - n2;\nn1 = n1 - n2;\nSystem.out.println(\'n1=\' + n1 + \', n2=\' + n2);', options: ['A. n1=20, n2=10', 'B. n1=30, n2=10', 'C. n1=10, n2=20', 'D. n1=20, n2=20'], correctAnswer: 'A. n1=20, n2=10'},
      {id: 18, question: 'Guess the output of the following Java code snippet:\n\nint val1 = 10;\nint val2 = 20;\nint res = val1 > val2 ? val1 : val2 > 15 ? 30 : 40;\nSystem.out.println(res);', options: ['A. 20', 'B. 10', 'C. 40', 'D. 30'], correctAnswer: 'D. 30'},
      {id: 19, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(5 > 3 || 4 < 2 && 10 == 10);', options: ['A. true', 'B. Runtime Exception', 'C. false', 'D. Compilation Error'], correctAnswer: 'A. true'},
      {id: 20, question: 'Guess the output of the following Java code snippet:\n\nchar letter = \\\'A\\\';\nletter++;\nSystem.out.println(letter);', options: ['A. B', 'B. 66', 'C. Compilation Error', 'D. A1'], correctAnswer: 'A. B'}
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a short block of code that reads an age from the user and prints it in format: "You are %d years old".', 
          language: 'java', 
          starterCode: 'import java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read the age and print: You are %d years old\n    }\n}', 
          stdin: true,
          examples: [
            { input: '25', output: 'You are 25 years old' }
          ]
        },
        {
          kind: 'mcq',
          prompt: 'What is the main difference between widening (implicit) and narrowing (explicit) casting in Java?',
          options: [
            'A. Widening is done automatically when converting a smaller type to a larger type; narrowing must be done manually.',
            'B. Narrowing is done automatically; widening must be done manually.',
            'C. Widening casting can result in data loss; narrowing casting never results in data loss.',
            'D. Widening is only applicable to reference types; narrowing is only applicable to primitive types.'
          ],
          correctAnswer: 'A. Widening is done automatically when converting a smaller type to a larger type; narrowing must be done manually.'
        }
      ]
    }
  },
  m3: {
    id: 'm3',
    title: 'MODULE 3: CONTROL STATEMENTS',
    overview: 'Master conditional logic in Java using if, else, else-if, nested conditions, switch statements, and ternary operators.',
    outcomes: [
      'Evaluate nested condition chains.',
      'Use modern switch case statements.',
      'Apply ternary expressions to simplify variables setup.'
    ],
    lessons: [
      {
        "id": "m3-l1",
        "title": "Lesson 3.1 if Statement",
        "objectives": [
          "Branch execution on a boolean condition.",
          "Understand truthiness rules in Java."
        ],
        "theory": "The `if` statement is the most basic decision-making construct in Java. It evaluates a boolean expression and executes the block that follows only when that expression is `true`.\n\nUnlike JavaScript or Python, Java has **no truthy/falsy coercion**. The condition must be an actual `boolean` — writing `if (1)` or `if (someString)` is a compile-time error. This strictness eliminates a whole family of bugs found in loosely typed languages.\n\nIf the body is a single statement the braces are optional, but professional codebases always use braces. Omitting them is how the famous Apple `goto fail` SSL bug shipped.",
        "syntax": "if (booleanExpression) {\n    // runs only when the expression is true\n}",
        "codeExample": "public class IfDemo {\n    public static void main(String[] args) {\n        int temperature = 38;\n\n        if (temperature > 37) {\n            System.out.println(\"Fever detected.\");\n            System.out.println(\"Advise the patient to rest.\");\n        }\n\n        boolean isRaining = true;\n        if (isRaining) {\n            System.out.println(\"Carry an umbrella.\");\n        }\n\n        System.out.println(\"Checks complete.\");\n    }\n}",
        "codeOutput": "Fever detected.\nAdvise the patient to rest.\nCarry an umbrella.\nChecks complete.",
        "mistakes": [
          "Writing `if (x = 5)` instead of `if (x == 5)`. In Java this is a compile error for ints (assignment yields int, not boolean), but it compiles silently for booleans — `if (flag = true)` always runs.",
          "Putting a semicolon straight after the condition: `if (x > 0);` — the body becomes an empty statement and the block after it always runs."
        ],
        "takeaways": [
          "The condition must evaluate to `boolean`; Java performs no truthiness conversion.",
          "Always use braces, even for one-line bodies.",
          "An `if` with no matching `else` simply skips its block when the condition is false."
        ]
      },
      {
        "id": "m3-l2",
        "title": "Lesson 3.2 if-else Statement",
        "objectives": [
          "Provide a fallback branch.",
          "Chain conditions with else-if ladders."
        ],
        "theory": "`if-else` guarantees that exactly one of two branches runs. When you need more than two outcomes you chain them into an **else-if ladder**.\n\nThe ladder is evaluated top to bottom and **stops at the first match**. Order therefore matters enormously: put the most specific or most restrictive condition first. A ladder that starts with `score >= 40` will award a D to a student who scored 95, because that first condition already matched.\n\nA trailing bare `else` acts as the catch-all default and is good defensive practice — it guarantees some branch always executes.",
        "syntax": "if (cond1) {\n    ...\n} else if (cond2) {\n    ...\n} else {\n    ...\n}",
        "codeExample": "public class GradeCalculator {\n    public static void main(String[] args) {\n        int score = 78;\n        char grade;\n\n        if (score >= 90) {\n            grade = 'A';\n        } else if (score >= 80) {\n            grade = 'B';\n        } else if (score >= 70) {\n            grade = 'C';\n        } else if (score >= 40) {\n            grade = 'D';\n        } else {\n            grade = 'F';\n        }\n\n        System.out.println(\"Score: \" + score);\n        System.out.println(\"Grade: \" + grade);\n    }\n}",
        "codeOutput": "Score: 78\nGrade: C",
        "mistakes": [
          "Ordering the ladder from lowest to highest boundary, so every value matches the first (loosest) condition.",
          "Using separate `if` statements instead of `else if` — each one is then evaluated independently and several branches can fire."
        ],
        "takeaways": [
          "An else-if ladder short-circuits at the first true condition.",
          "Order branches from most restrictive to least restrictive.",
          "A final `else` guarantees a default outcome and prevents \"variable might not have been initialized\" compile errors."
        ]
      },
      {
        "id": "m3-l3",
        "title": "Lesson 3.3 Nested if",
        "objectives": [
          "Place a decision inside another decision.",
          "Refactor deep nesting using guard clauses."
        ],
        "theory": "A **nested if** is an `if` statement placed inside the body of another. Use it when an inner question only makes sense once an outer question has been answered — for example, you only check a withdrawal amount after you have confirmed the account exists.\n\nNesting is legal to any depth, but each level adds cognitive load. Once you pass two or three levels the code becomes an \"arrow anti-pattern\" that drifts across the screen. The standard cure is the **guard clause**: invert each check and return (or throw) early, so the happy path stays flat at the left margin.",
        "syntax": "if (outerCondition) {\n    if (innerCondition) {\n        // reached only when BOTH are true\n    }\n}",
        "codeExample": "public class NestedIfDemo {\n    public static void main(String[] args) {\n        boolean accountExists = true;\n        double balance = 5000.0;\n        double withdrawal = 7000.0;\n\n        if (accountExists) {\n            if (withdrawal <= 0) {\n                System.out.println(\"Invalid amount.\");\n            } else if (withdrawal <= balance) {\n                balance -= withdrawal;\n                System.out.println(\"Approved. New balance: \" + balance);\n            } else {\n                System.out.println(\"Declined: insufficient funds.\");\n                System.out.println(\"Short by: \" + (withdrawal - balance));\n            }\n        } else {\n            System.out.println(\"No such account.\");\n        }\n    }\n}",
        "codeOutput": "Declined: insufficient funds.\nShort by: 2000.0",
        "mistakes": [
          "The dangling-else problem: without braces, an `else` binds to the *nearest* unmatched `if`, not the one you visually lined it up with.",
          "Nesting conditions that are simply independent — those should be combined with `&&` instead."
        ],
        "takeaways": [
          "Nest only when the inner test depends on the outer test being true.",
          "`if (a) { if (b) {...} }` is equivalent to `if (a && b) {...}` when there is no `else` — prefer the flatter form.",
          "Refactor three-plus levels of nesting into guard clauses that return early."
        ]
      },
      {
        "id": "m3-l4",
        "title": "Lesson 3.4 Switch Case",
        "objectives": [
          "Dispatch on a single value across many branches.",
          "Understand fall-through and the modern switch syntax."
        ],
        "theory": "`switch` compares one expression against a list of constant labels. It is clearer than a long ladder when you are testing **equality against many fixed values** — a menu choice, a day number, an enum constant.\n\nThe classic form requires `break` at the end of each case. Without it execution **falls through** into the next case, which is occasionally useful for grouping labels but is far more often a bug.\n\nJava 14 introduced the **arrow form** (`case X ->`), which never falls through and can be used as an expression that produces a value. New code should prefer it. Switch works on `byte`, `short`, `char`, `int`, their wrappers, `String`, and enums — but not on `long`, `float`, `double`, or `boolean`.",
        "syntax": "// classic\nswitch (value) {\n    case A: ...; break;\n    default: ...;\n}\n\n// arrow form (Java 14+)\nString result = switch (value) {\n    case A -> \"first\";\n    default -> \"other\";\n};",
        "codeExample": "public class SwitchDemo {\n    public static void main(String[] args) {\n        int day = 6;\n\n        // Classic form with intentional grouped fall-through\n        switch (day) {\n            case 1:\n            case 2:\n            case 3:\n            case 4:\n            case 5:\n                System.out.println(\"Weekday - work day.\");\n                break;\n            case 6:\n            case 7:\n                System.out.println(\"Weekend - rest day.\");\n                break;\n            default:\n                System.out.println(\"Invalid day number.\");\n        }\n\n        // Modern arrow form used as an expression\n        String name = switch (day) {\n            case 1 -> \"Monday\";\n            case 6 -> \"Saturday\";\n            case 7 -> \"Sunday\";\n            default -> \"Midweek\";\n        };\n        System.out.println(\"Day name: \" + name);\n    }\n}",
        "codeOutput": "Weekend - rest day.\nDay name: Saturday",
        "mistakes": [
          "Forgetting `break` in the classic form, causing every following case to execute.",
          "Trying to switch on a `double` or `boolean`, or on a non-constant case label — both are compile errors.",
          "Comparing Strings with a switch and expecting `null` to hit `default` — a null selector throws NullPointerException instead."
        ],
        "takeaways": [
          "Use `switch` for equality against many constants; use an if-else ladder for ranges and complex boolean logic.",
          "The arrow form (`->`) cannot fall through and can return a value.",
          "`default` is optional but strongly recommended as a safety net."
        ]
      },
      {
        "id": "m3-l5",
        "title": "Lesson 3.5 Ternary Operator",
        "objectives": [
          "Choose between two values in a single expression.",
          "Know when a ternary hurts readability."
        ],
        "theory": "The ternary conditional `?:` is Java's only three-operand operator. It is an **expression**, not a statement: it produces a value, so it can sit on the right-hand side of an assignment, inside a method argument, or in a return statement.\n\nRead `condition ? a : b` as \"if condition then a else b\". Both branches must produce compatible types, because the compiler has to infer a single result type for the whole expression.\n\nUse it for short value selection. Do **not** use it to drive side effects or to nest three levels deep — an if-else block is clearer the moment the logic stops fitting comfortably on one line.",
        "syntax": "type result = condition ? valueIfTrue : valueIfFalse;",
        "codeExample": "public class TernaryDemo {\n    public static void main(String[] args) {\n        int a = 17, b = 42;\n\n        int max = (a > b) ? a : b;\n        System.out.println(\"Max: \" + max);\n\n        int number = 17;\n        String parity = (number % 2 == 0) ? \"Even\" : \"Odd\";\n        System.out.println(number + \" is \" + parity);\n\n        // Handy for null-safe defaults\n        String username = null;\n        String display = (username != null) ? username : \"Guest\";\n        System.out.println(\"Welcome, \" + display);\n\n        // Inline inside string concatenation\n        int items = 1;\n        System.out.println(\"You have \" + items + (items == 1 ? \" item\" : \" items\"));\n    }\n}",
        "codeOutput": "Max: 42\n17 is Odd\nWelcome, Guest\nYou have 1 item",
        "mistakes": [
          "Nesting ternaries several levels deep, producing an unreadable one-liner.",
          "Mixing incompatible branch types (e.g. `flag ? 1 : \"one\"`), which forces the result to `Object`.",
          "Unboxing surprises: `flag ? someInteger : 0` will throw NullPointerException if `someInteger` is null, because the mixed types force unboxing."
        ],
        "takeaways": [
          "The ternary is an expression that yields a value; `if` is a statement that does not.",
          "Both branches must be type-compatible.",
          "One level of ternary is elegant; two or more is a code smell — switch to if-else."
        ]
      },
      {
        "id": "m3-l6",
        "title": "Lesson 3.6 Logical Operators",
        "objectives": [
          "Combine boolean conditions with &&, || and !.",
          "Exploit short-circuit evaluation for null safety."
        ],
        "theory": "Logical operators let one condition express several requirements at once.\n\n- `&&` (AND) is true only when **both** operands are true.\n- `||` (OR) is true when **at least one** operand is true.\n- `!` (NOT) inverts a boolean.\n\nThe critical behaviour is **short-circuiting**. `&&` does not evaluate its right operand if the left is already false, and `||` skips the right operand if the left is already true. This is not merely an optimisation — it is the standard idiom for null-safe checks: `if (user != null && user.isActive())` never dereferences a null `user`.\n\nThe single-character forms `&` and `|` also work on booleans but **always evaluate both sides**, losing the null-safety guarantee. Reserve them for bitwise work on integers.\n\nDe Morgan's laws are worth memorising for refactoring: `!(a && b)` equals `!a || !b`, and `!(a || b)` equals `!a && !b`.",
        "syntax": "boolean r1 = condA && condB;   // both\nboolean r2 = condA || condB;   // either\nboolean r3 = !condA;           // negation",
        "codeExample": "public class LogicalOperatorsDemo {\n    public static void main(String[] args) {\n        int age = 25;\n        boolean hasLicence = true;\n\n        if (age >= 18 && hasLicence) {\n            System.out.println(\"Allowed to drive.\");\n        }\n\n        String role = \"admin\";\n        if (role.equals(\"admin\") || role.equals(\"moderator\")) {\n            System.out.println(\"Has elevated permissions.\");\n        }\n\n        boolean isSuspended = false;\n        if (!isSuspended) {\n            System.out.println(\"Account is in good standing.\");\n        }\n\n        // Short-circuit protects the method call from a null reference\n        String token = null;\n        if (token != null && token.length() > 10) {\n            System.out.println(\"Valid token.\");\n        } else {\n            System.out.println(\"Missing or short token.\");\n        }\n    }\n}",
        "codeOutput": "Allowed to drive.\nHas elevated permissions.\nAccount is in good standing.\nMissing or short token.",
        "mistakes": [
          "Using `&` / `|` where `&&` / `||` was intended — both sides run, so the null guard no longer protects you.",
          "Ordering a null check *after* the method call: `user.isActive() && user != null` throws before the guard is reached.",
          "Writing `if (x == 1 || 2)` — the right operand must be a full boolean expression, so this is a compile error."
        ],
        "takeaways": [
          "`&&` and `||` short-circuit; `&` and `|` do not.",
          "Always place the null check on the left of `&&`.",
          "Apply De Morgan's laws to simplify negated compound conditions."
        ]
      }
    ],
    exercise: {
      title: 'Grade classifier',
      description: 'Map a numeric score to a letter grade using an else-if ladder, then repeat it with a switch expression.',
      instructions: ['Use an else-if ladder ordered from the highest boundary downwards.', 'Return A for 90+, B for 80+, C for 70+, D for 40+, otherwise F.', 'Reject scores outside 0-100 before classifying.'],
      starterCode: 'public class Solution {\n    static char grade(int score) {\n        // TODO: return the correct letter grade\n        return \'F\';\n    }\n\n    public static void main(String[] args) {\n        System.out.println(grade(78));\n    }\n}',
      expectedOutput: 'C',
      type: 'code_sandbox'
    },
    quiz: [
      {id: 1, question: 'Which of the following data types CANNOT be used as the controlling expression in a standard Java switch-case statement?', options: ['A. char', 'B. int', 'C. double', 'D. String'], correctAnswer: 'C. double'},
      {id: 2, question: 'What happens if a matching case block in a switch statement does not contain a \'break\' statement?', options: ['A. The program throws a compilation error immediately.', 'B. The switch statement terminates instantly without running anything.', 'C. The program falls through, executing subsequent case blocks sequentially until a break or the end of the switch is encountered.', 'D. Execution immediately jumps to the default block regardless of its position.'], correctAnswer: 'C. The program falls through, executing subsequent case blocks sequentially until a break or the end of the switch is encountered.'},
      {id: 3, question: 'Which statement best describes the evaluation behavior of a conditional statement structured with nested if blocks?', options: ['A. The inner \'if\' condition is evaluated only if the outer \'if\' condition evaluates to true.', 'B. The inner \'if\' condition is evaluated regardless of whether the outer \'if\' condition is true or false.', 'C. The compiler combines them automatically into a single flat logical AND expression.', 'D. Both outer and inner conditions are checked simultaneously in parallel.'], correctAnswer: 'A. The inner \'if\' condition is evaluated only if the outer \'if\' condition evaluates to true.'},
      {id: 4, question: 'How many operands are evaluated by a conditional ternary operator expression in Java?', options: ['A. 3', 'B. 1', 'C. 2', 'D. 4'], correctAnswer: 'A. 3'},
      {id: 5, question: 'Guess the output of the following Java code snippet:\n\nint score = 75;\nif (score > 80)\nSystem.out.print(\'A \');\nSystem.out.print(\'Passed \');', options: ['A. No output is displayed', 'B. A Passed', 'C. Passed', 'D. A'], correctAnswer: 'C. Passed'},
      {id: 6, question: 'Guess the output of the following Java code snippet:\n\nint x = 10;\nint y = 20;\nif (x > 5) {\nif (y < 15) {\nSystem.out.println(\'Block 1\');\n} else {\nSystem.out.println(\'Block 2\');\n}\n} else {\nSystem.out.println(\'Block 3\');\n}', options: ['A. Block 1', 'B. Block 3', 'C. Block 2', 'D. Block 2\nBlock 3'], correctAnswer: 'C. Block 2'},
      {id: 7, question: 'Guess the output of the following Java code snippet:\n\nint status = 2;\nswitch (status) {\ncase 1:\nSystem.out.print(\'Ready \');\ncase 2:\nSystem.out.print(\'Set \');\ncase 3:\nSystem.out.print(\'Go \');\ndefault:\nSystem.out.print(\'Done \');\n}', options: ['A. Set', 'B. Set Go Done', 'C. Set Done', 'D. Ready Set Go Done'], correctAnswer: 'B. Set Go Done'},
      {id: 8, question: 'Guess the output of the following Java code snippet:\n\nint a = 10, b = 5;\nString result = (a < b) ? \'Low\' : (a == b) ? \'Equal\' : \'High\';\nSystem.out.println(result);', options: ['A. Low', 'B. High', 'C. Compilation Error', 'D. Equal'], correctAnswer: 'B. High'},
      {id: 9, question: 'Guess the output of the following Java code snippet:\n\nint number = 15;\nif (number % 3 == 0 || number % 5 == 0) {\nSystem.out.println(\'Divisible\');\n} else if (number % 15 == 0) {\nSystem.out.println(\'Divisible by 15\');\n}', options: ['A. Divisible by 15', 'B. Divisible', 'C. Divisible\nDivisible by 15', 'D. No output due to compilation conflict'], correctAnswer: 'B. Divisible'},
      {id: 10, question: 'Guess the output of the following Java code snippet:\n\nint count = 10;\nboolean check = false;\nif (check && (count++ > 5)) {\nSystem.out.println(\'Inside\');\n}\nSystem.out.println(count);', options: ['A. Runtime Error', 'B. 11', 'C. Inside\n11', 'D. 10'], correctAnswer: 'D. 10'},
      {id: 11, question: 'Guess the output of the following Java code snippet:\n\nint value = 5;\nif (value = 10) {\nSystem.out.println(\'True Block\');\n} else {\nSystem.out.println(\'False Block\');\n}', options: ['A. False Block', 'B. True Block', 'C. 5', 'D. Compilation Error'], correctAnswer: 'D. Compilation Error'},
      {id: 12, question: 'Guess the output of the following Java code snippet:\n\nboolean power = true;\nif (power = false) {\nSystem.out.println(\'On\');\n} else {\nSystem.out.println(\'Off\');\n}', options: ['A. No output', 'B. Compilation Error', 'C. Off', 'D. On'], correctAnswer: 'C. Off'},
      {id: 13, question: 'Guess the output of the following Java code snippet:\n\nint code = 3;\nint adjustment = switch (code) {\ncase 1, 2 -> 10;\ncase 3, 4 -> 20;\ndefault -> 30;\n};\nSystem.out.println(adjustment);', options: ['A. 20', 'B. 30', 'C. 10', 'D. Compilation Error'], correctAnswer: 'A. 20'},
      {id: 14, question: 'Guess the output of the following Java code snippet:\n\nint age = 18;\nboolean registration = true;\nSystem.out.println(age >= 18 || !registration ? \'Allowed\' : \'Denied\');', options: ['A. true', 'B. Compilation Error', 'C. Allowed', 'D. Denied'], correctAnswer: 'C. Allowed'},
      {id: 15, question: 'Guess the output of the following Java code snippet:\n\nint keys = 5;\nswitch (keys) {\ndefault:\nSystem.out.print(\'Unknown \');\ncase 1:\nSystem.out.print(\'One \');\nbreak;\ncase 5:\nSystem.out.print(\'Five \');\n}', options: ['A. Unknown One Five', 'B. Five', 'C. Five Unknown', 'D. Unknown One'], correctAnswer: 'B. Five'},
      {id: 16, question: 'Guess the output of the following Java code snippet:\n\nint option = 0;\nswitch (option) {\ndefault:\nSystem.out.print(\'Default \');\ncase 1:\nSystem.out.print(\'One \');\nbreak;\ncase 2:\nSystem.out.print(\'Two \');\n}', options: ['A. Default', 'B. One', 'C. Default One Two', 'D. Default One'], correctAnswer: 'D. Default One'},
      {id: 17, question: 'Guess the output of the following Java code snippet:\n\nint temperature = 32;\nif (temperature > 30)\nif (temperature < 25)\nSystem.out.println(\'Ideal\');\nelse\nSystem.out.println(\'Warm\');', options: ['A. Warm', 'B. Ideal', 'C. Compilation Error', 'D. No output is displayed'], correctAnswer: 'A. Warm'},
      {id: 18, question: 'Guess the output of the following Java code snippet:\n\nint threshold = 5;\nboolean alert = true;\nif (!alert || (++threshold > 10)) {\nSystem.out.print(\'Active \');\n}\nSystem.out.println(threshold);', options: ['A. Active 6', 'B. 6', 'C. Active 5', 'D. 5'], correctAnswer: 'B. 6'},
      {id: 19, question: 'Guess the output of the following Java code snippet:\n\nint x = 4;\nint result = (x % 2 == 0) ? (x * 2) : (x / 2);\nSystem.out.println(result);', options: ['A. 2', 'B. 8', 'C. 16', 'D. 4'], correctAnswer: 'B. 8'},
      {id: 20, question: 'Guess the output of the following Java code snippet:\n\nint point = 2;\nswitch (point) {\ncase 1:\nSystem.out.print(\'Point 1 \');\nbreak;\ncase 2:\n// Empty Case\ncase 3:\nSystem.out.print(\'Point 3 \');\nbreak;\ndefault:\nSystem.out.print(\'End \');\n}', options: ['A. No output is displayed', 'B. Compilation Error', 'C. End', 'D. Point 3'], correctAnswer: 'D. Point 3'}
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a Java code snippet that checks if a year is a Leap Year.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int year = 2024;\n        // A leap year is divisible by 4, but not by 100 unless also by 400\n    }\n}',
          examples: [
            { input: 'year = 2024', output: 'leap' }
          ]
        },
        { 
          kind: 'code', 
          prompt: 'Convert an if-else grading block into a clean switch statement.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int score = 78;\n        // Rewrite this ladder as a switch:\n        //   90+ A, 80+ B, 70+ C, 40+ D, else F\n    }\n}',
          examples: [
            { input: 'score = 78', output: 'C' }
          ]
        }
      ]
    }
  },
  m4: {
    id: 'm4',
    title: 'MODULE 4: LOOPS',
    overview: 'Understand loops in Java: for, while, do-while, nested loops, break, and continue. Implement pattern programs.',
    outcomes: [
      'Determine when to use for vs while loops.',
      'Control iterations with break and continue statements.',
      'Construct nested loops for grid patterns.'
    ],
    lessons: [
      {
        id: 'm4-l1',
        title: 'Lesson 4.1 for Loop',
        objectives: [
          'Execute loops for known intervals.',
          'Understand loop initialization, condition checking, and increments.',
          'Declare loop counters with proper scopes.'
        ],
        theory: 'Use the `for` loop when you know exactly how many times you want to iterate a block of code. It condenses the loop control variables into a single line at the top. The execution flows in this order: initialization (runs once), condition (checked before every iteration), code execution, and finally the update (runs after every iteration).',
        syntax: 'for (initialization; condition; update) {\n    // Code block to be executed\n}',
        codeExample: 'public class ForLoopDemo {\n    public static void main(String[] args) {\n        // Print numbers 1 through 5\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("Iteration: " + i);\n        }\n    }\n}',
        codeOutput: 'Iteration: 1\nIteration: 2\nIteration: 3\nIteration: 4\nIteration: 5',
        takeaways: [
          'Variables declared inside the for loop header (like int i = 0) exist only within the loop block.',
          'If the condition evaluates to false initially, the loop block will never execute.',
          'Be careful to avoid infinite loops by ensuring the update step eventually makes the condition false.'
        ]
      },
      {
        id: 'm4-l2',
        title: 'Lesson 4.2 while Loop',
        objectives: [
          'Execute loops for dynamic, condition-based intervals.',
          'Avoid infinite loops by managing loop state variables.'
        ],
        theory: 'Use the `while` loop when you want the loop to continue iterating an unknown number of times, strictly as long as a condition remains true. It is commonly used for reading files, processing data streams, or waiting for specific user input where the number of required iterations cannot be predicted beforehand.',
        syntax: 'while (condition) {\n    // Code to be executed\n    // Remember to update condition variables!\n}',
        codeExample: 'import java.util.Scanner;\n\npublic class WhileDemo {\n    public static void main(String[] args) {\n        int count = 3;\n        while (count > 0) {\n            System.out.println("Countdown: " + count);\n            count--; // Decrement is crucial to avoid infinite loop\n        }\n        System.out.println("Liftoff!");\n    }\n}',
        codeOutput: 'Countdown: 3\nCountdown: 2\nCountdown: 1\nLiftoff!',
        takeaways: [
          'The condition is evaluated before the code block executes.',
          'If you forget to update the variables that affect the condition, your program will freeze in an infinite loop.',
          'A while loop can execute zero times if the condition starts out false.'
        ]
      },
      {
        id: 'm4-l3',
        title: 'Lesson 4.3 do-while Loop',
        objectives: [
          'Guarantee at least one iteration of a loop.',
          'Understand post-test looping conditions.'
        ],
        theory: 'The `do-while` loop is a variant of the while loop. Instead of checking the condition at the beginning, it executes the code block first, and *then* checks the condition. This means the code inside the loop is guaranteed to run at least once, regardless of whether the condition is true or false.',
        syntax: 'do {\n    // Code block to execute\n} while (condition);',
        codeExample: 'public class DoWhileDemo {\n    public static void main(String[] args) {\n        int attempts = 0;\n        do {\n            System.out.println("Attempting connection...");\n            attempts++;\n        } while (attempts < 1); // Condition is false after first run\n    }\n}',
        codeOutput: 'Attempting connection...',
        takeaways: [
          'Requires a semicolon at the very end of the statement after the while condition.',
          'Perfect for scenarios like menu prompts where you must show the menu to the user before asking them for their choice.',
          'Because it evaluates at the end, it is known as a post-test loop.'
        ]
      },
      {
        id: 'm4-l4',
        title: 'Lesson 4.4 Nested Loops',
        objectives: [
          'Build loops inside loops for complex data structures.',
          'Understand execution cycles in nested environments.'
        ],
        theory: 'A nested loop is a loop placed inside the body of another loop. This is heavily used for working with two-dimensional data structures like grids, matrices, or printing visual patterns. For every single iteration of the outer loop, the inner loop executes completely from start to finish.',
        syntax: 'for (int i = 0; i < outerLimit; i++) {\n    for (int j = 0; j < innerLimit; j++) {\n        // Code executed outerLimit * innerLimit times\n    }\n}',
        codeExample: 'public class NestedLoopDemo {\n    public static void main(String[] args) {\n        // Print a 3x3 grid of stars\n        for (int row = 1; row <= 3; row++) {\n            for (int col = 1; col <= 3; col++) {\n                System.out.print("* ");\n            }\n            System.out.println(); // Move to the next line\n        }\n    }\n}',
        codeOutput: '* * * \n* * * \n* * * ',
        takeaways: [
          'The total number of executions is the product of the iteration limits (e.g., 3 outer × 3 inner = 9 executions).',
          'Nesting loops increases time complexity exponentially (O(N^2)).',
          'Avoid nesting too deeply (more than 3 levels) as it heavily degrades performance.'
        ]
      },
      {
        id: 'm4-l5',
        title: 'Lesson 4.5 break Statement',
        objectives: [
          'Terminate loops early based on dynamic conditions.',
          'Understand how break interacts with nested loops.'
        ],
        theory: 'The `break` statement immediately exits the loop block it resides in, entirely skipping all remaining iterations. Execution resumes at the very next statement after the loop. It is commonly used to stop searching once a target item is found to save processing time.',
        syntax: 'while (true) {\n    if (shouldStop) {\n        break; // Exits the loop immediately\n    }\n}',
        codeExample: 'public class BreakDemo {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            if (i == 4) {\n                System.out.println("Found 4, stopping loop.");\n                break;\n            }\n            System.out.println("Checking " + i);\n        }\n    }\n}',
        codeOutput: 'Checking 1\nChecking 2\nChecking 3\nFound 4, stopping loop.',
        takeaways: [
          'In nested loops, break only exits the innermost loop containing it.',
          'It is the exact same break statement used to terminate switch case blocks.',
          'Using break allows for efficient early exits from algorithms.'
        ]
      },
      {
        id: 'm4-l6',
        title: 'Lesson 4.6 continue Statement',
        objectives: [
          'Skip specific iterations without destroying the loop.',
          'Filter data processed inside loop blocks.'
        ],
        theory: 'The `continue` statement skips the remaining code inside the current loop iteration and jumps directly to the next loop evaluation (the update step in a for loop, or condition check in a while loop). Unlike break, it does not destroy the loop entirely; it simply aborts the current cycle.',
        syntax: 'for (int i = 0; i < 5; i++) {\n    if (skipCondition) {\n        continue; // Jumps to i++\n    }\n    // Code here is skipped for this iteration\n}',
        codeExample: 'public class ContinueDemo {\n    public static void main(String[] args) {\n        // Print only odd numbers by skipping evens\n        for (int i = 1; i <= 5; i++) {\n            if (i % 2 == 0) {\n                continue;\n            }\n            System.out.println("Odd: " + i);\n        }\n    }\n}',
        codeOutput: 'Odd: 1\nOdd: 3\nOdd: 5',
        takeaways: [
          'Continue does not exit the loop, it only skips the lines below it for the current cycle.',
          'It is extremely useful for filtering out invalid data while processing a list of items.',
          'Be careful using continue inside a while loop; if the variable update is skipped, it will cause an infinite loop.'
        ]
      }
    ],
    exercise: {
      title: 'Prime numbers and patterns',
      description: 'Use nested loops to print prime numbers, then build a triangle pattern.',
      instructions: ['Print every prime between 1 and 50 on one line.', 'Use break to exit the inner divisor loop as soon as a factor is found.', 'Then print a five-row right-angled triangle of stars.'],
      starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        for (int n = 2; n <= 50; n++) {\n            // TODO: test primality and print n if prime\n        }\n    }\n}',
      expectedOutput: '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47',
      type: 'loop_stepper'
    },
    quiz: [
      { id: 1, question: 'Which loop is guaranteed to execute at least once?', options: ['A. for loop', 'B. while loop', 'C. do-while loop', 'D. enhanced-for loop'], correctAnswer: 'C. do-while loop' },
      { id: 2, question: 'Which statement skips remaining lines in a loop iteration and moves to the next iteration?', options: ['A. break', 'B. continue', 'C. exit', 'D. return'], correctAnswer: 'B. continue' },
      { id: 3, question: 'What happens if a loop condition is always true and has no break?', options: ['A. Program completes', 'B. Infinite loop', 'C. Compiler crash', 'D. Syntax error'], correctAnswer: 'B. Infinite loop' },
      { id: 4, question: 'What is the runtime complexity of two nested loops matching bounds N?', options: ['A. O(N)', 'B. O(log N)', 'C. O(N^2)', 'D. O(1)'], correctAnswer: 'C. O(N^2)' },
      { id: 5, question: 'What is required at the end of a do-while loop statement?', options: ['A. colon (:)', 'B. double colon (::)', 'C. semicolon (;)', 'D. nothing'], correctAnswer: 'C. semicolon (;)' },
      { id: 6, question: 'Which loop is best when the number of iterations is known in advance?', options: ['A. while', 'B. for', 'C. do-while', 'D. infinite'], correctAnswer: 'B. for' },
      { id: 7, question: 'What does the enhanced for loop (for-each) NOT allow you to do?', options: ['A. Read each element', 'B. Modify the array structure while iterating', 'C. Iterate a List', 'D. Iterate a String array'], correctAnswer: 'B. Modify the array structure while iterating' },
      { id: 8, question: 'How many times does `for (int i = 0; i < 5; i++)` execute its body?', options: ['A. 4', 'B. 5', 'C. 6', 'D. 0'], correctAnswer: 'B. 5' },
      { id: 9, question: 'What does `break` do inside a nested loop?', options: ['A. Exits all loops', 'B. Exits only the innermost loop', 'C. Skips one iteration', 'D. Restarts the loop'], correctAnswer: 'B. Exits only the innermost loop' },
      { id: 10, question: 'Which construct lets `break` exit an outer loop directly?', options: ['A. A labelled break', 'B. break outer;', 'C. exit()', 'D. It is impossible'], correctAnswer: 'A. A labelled break' },
      { id: 11, question: 'What is printed by `for (int i = 0; i < 3; i++) { if (i == 1) continue; System.out.print(i); }`?', options: ['A. 012', 'B. 02', 'C. 12', 'D. 0'], correctAnswer: 'B. 02' },
      { id: 12, question: 'Which part of a for loop is executed only once?', options: ['A. Condition', 'B. Initialization', 'C. Update', 'D. Body'], correctAnswer: 'B. Initialization' },
      { id: 13, question: 'What happens with `for (;;)`?', options: ['A. Compile error', 'B. Runs zero times', 'C. Infinite loop', 'D. Runs once'], correctAnswer: 'C. Infinite loop' },
      { id: 14, question: 'Where is a variable declared in a for loop initializer accessible?', options: ['A. Everywhere in the class', 'B. Only inside that loop', 'C. In the enclosing method after the loop', 'D. Only in the condition'], correctAnswer: 'B. Only inside that loop' },
      { id: 15, question: 'Which loop checks its condition AFTER executing the body?', options: ['A. for', 'B. while', 'C. do-while', 'D. for-each'], correctAnswer: 'C. do-while' },
      { id: 16, question: 'How many total iterations does a nested loop with outer 3 and inner 4 perform?', options: ['A. 7', 'B. 12', 'C. 34', 'D. 4'], correctAnswer: 'B. 12' },
      { id: 17, question: 'What is the output of `int i = 0; while (i++ < 3) System.out.print(i);`?', options: ['A. 012', 'B. 123', 'C. 0123', 'D. 12'], correctAnswer: 'B. 123' },
      { id: 18, question: 'Which statement immediately exits the enclosing method, not just the loop?', options: ['A. break', 'B. continue', 'C. return', 'D. exit'], correctAnswer: 'C. return' },
      { id: 19, question: 'What is a common cause of an unintentional infinite while loop?', options: ['A. Forgetting to update the loop variable', 'B. Using braces', 'C. Declaring the variable as int', 'D. Using a condition'], correctAnswer: 'A. Forgetting to update the loop variable' },
      { id: 20, question: 'Which loop type is most appropriate for iterating every element of a collection read-only?', options: ['A. do-while', 'B. enhanced for (for-each)', 'C. Labelled loop', 'D. Infinite loop'], correctAnswer: 'B. enhanced for (for-each)' }
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a Java loop that prints prime numbers between 1 and 50.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        // Print every prime between 1 and 50\n        for (int n = 2; n <= 50; n++) {\n\n        }\n    }\n}',
          examples: [
            { input: 'None', output: '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47' }
          ]
        },
        {
          kind: 'mcq',
          prompt: 'What is the functional difference between break and continue statements in loops?',
          options: [
            'A. break terminates the loop entirely; continue skips the current iteration and moves to the next one.',
            'B. continue terminates the loop entirely; break skips the current iteration.',
            'C. break can only be used in while loops; continue can only be used in for loops.',
            'D. both statements do the exact same thing but have different names.'
          ],
          correctAnswer: 'A. break terminates the loop entirely; continue skips the current iteration and moves to the next one.'
        }
      ]
    }
  },
  m5: {
    id: 'm5',
    title: 'MODULE 5: METHODS & FUNCTIONS',
    overview: 'Understand methods, arguments, return statements, method overloading, recursion, and variable scope in Java.',
    outcomes: [
      'Create reusable procedures with input parameters.',
      'Implement method overloading with different parameters list.',
      'Solve problems using recursive method calls.'
    ],
    lessons: [
      {
        id: 'm5-l1',
        title: 'Lesson 5.1 Introduction to Methods',
        objectives: [
          'Write modular, reusable methods.',
          'Understand method signatures and access modifiers.'
        ],
        theory: 'Methods (often called functions in other languages) are blocks of code that only run when called. They allow you to divide complex programs into small, manageable, and reusable chunks. A method signature consists of its access modifier (e.g., public), return type, name, and parameters.',
        syntax: 'accessModifier returnType methodName(parameters) {\n    // Code block to execute\n}',
        codeExample: 'public class MethodDemo {\n    // Defining the method\n    public static void sayHello() {\n        System.out.println("Hello from the method!");\n    }\n\n    public static void main(String[] args) {\n        // Calling the method\n        sayHello();\n        sayHello();\n    }\n}',
        codeOutput: 'Hello from the method!\nHello from the method!',
        takeaways: [
          'Methods should ideally focus on performing a single specific task.',
          'Code written inside a method does not execute automatically; the method must be explicitly called.',
          'Static methods can be called directly without creating an object instance.'
        ]
      },
      {
        id: 'm5-l2',
        title: 'Lesson 5.2 Method Parameters',
        objectives: [
          'Pass arguments into methods.',
          'Understand pass-by-value semantics.'
        ],
        theory: 'Parameters act as local variables inside the method. You define them in the method signature to accept external data. When you call the method, you pass actual values known as arguments. Java passes primitive data types strictly by value, meaning a copy of the value is sent to the method, not the original variable.',
        syntax: 'public static void printSum(int a, int b) {\n    System.out.println(a + b);\n}',
        codeExample: 'public class ParamDemo {\n    public static void greetUser(String name, int age) {\n        System.out.println("User " + name + " is " + age + " years old.");\n    }\n\n    public static void main(String[] args) {\n        greetUser("Alice", 25);\n        greetUser("Bob", 30);\n    }\n}',
        codeOutput: 'User Alice is 25 years old.\nUser Bob is 30 years old.',
        takeaways: [
          'You can pass multiple parameters by separating them with commas.',
          'The data type and order of arguments passed must exactly match the parameter definition.',
          'Modifying a primitive parameter inside a method does not affect the original variable in the caller.'
        ]
      },
      {
        id: 'm5-l3',
        title: 'Lesson 5.3 Return Types',
        objectives: [
          'Return calculation outputs back to the caller.',
          'Understand the void keyword.'
        ],
        theory: 'If you want a method to process data and send a result back to the caller, you must specify a return type in the method signature (e.g., int, double, String). The method must then use the `return` keyword to output a value of that exact type. If a method does not return anything, its return type must be declared as `void`.',
        syntax: 'public static int add(int x, int y) {\n    return x + y; // Must return an integer\n}',
        codeExample: 'public class ReturnDemo {\n    public static double calculateTax(double amount) {\n        return amount * 0.15;\n    }\n\n    public static void main(String[] args) {\n        double tax = calculateTax(200.0);\n        System.out.println("Tax to pay: $" + tax);\n    }\n}',
        codeOutput: 'Tax to pay: $30.0',
        takeaways: [
          'The execution of a method terminates immediately upon hitting a return statement.',
          'A method with a non-void return type must guarantee that a value is returned under all logical paths.',
          'You can use the return value directly in print statements or variable assignments.'
        ]
      },
      {
        id: 'm5-l4',
        title: 'Lesson 5.4 Method Overloading',
        objectives: [
          'Define multiple methods with the same name.',
          'Resolve methods using different parameter signatures.'
        ],
        theory: 'Method overloading allows you to define multiple methods in the same class that share the exact same name, as long as their parameter lists are different (different number of parameters, different types, or different order). This provides flexibility by letting the same logical action handle different types of inputs.',
        syntax: 'public int calc(int a) { return a; }\npublic double calc(double a) { return a; }\npublic int calc(int a, int b) { return a + b; }',
        codeExample: 'public class OverloadDemo {\n    public static void print(String text) {\n        System.out.println("String: " + text);\n    }\n    public static void print(int number) {\n        System.out.println("Integer: " + number);\n    }\n\n    public static void main(String[] args) {\n        print("Hello");\n        print(42);\n    }\n}',
        codeOutput: 'String: Hello\nInteger: 42',
        takeaways: [
          'Overloading is determined at compile time (static polymorphism).',
          'You cannot overload methods by changing only the return type; the parameter list must differ.',
          'It makes APIs cleaner (e.g., System.out.println() is heavily overloaded).'
        ]
      },
      {
        id: 'm5-l5',
        title: 'Lesson 5.5 Recursion',
        objectives: [
          'Call methods from within themselves.',
          'Define strict base cases to prevent overflow.'
        ],
        theory: 'Recursion is the technique of making a method call itself to solve smaller pieces of a larger problem. Every recursive method absolutely requires a "base case"—a condition where it stops calling itself and begins returning values. Without a base case, it will call itself infinitely until the JVM runs out of memory.',
        syntax: 'public int factorial(int n) {\n    if (n <= 1) return 1; // Base case\n    return n * factorial(n - 1); // Recursive call\n}',
        codeExample: 'public class RecursionDemo {\n    public static int sumDown(int n) {\n        if (n <= 0) { // Base Case\n            return 0;\n        }\n        return n + sumDown(n - 1);\n    }\n\n    public static void main(String[] args) {\n        int result = sumDown(3); // 3 + 2 + 1 + 0\n        System.out.println("Sum: " + result);\n    }\n}',
        codeOutput: 'Sum: 6',
        takeaways: [
          'Missing or unreachable base cases will result in a StackOverflowError.',
          'Recursion can sometimes be slower and consume more memory than simple loops due to call stack overhead.',
          'It is extremely elegant for tree traversals and sorting algorithms like QuickSort.'
        ]
      },
      {
        id: 'm5-l6',
        title: 'Lesson 5.6 Variable Scope',
        objectives: [
          'Understand local, block, and class scopes.',
          'Prevent naming collisions and variable shadowing.'
        ],
        theory: 'Scope defines the region of the program where a variable is accessible. In Java, variables declared inside a method (local variables) are only accessible within that method. Variables declared inside a block (like a loop or if statement) are block-scoped and disappear when the block ends. Class-level variables (fields) are accessible anywhere within the class.',
        syntax: 'public class Scope {\n    int global = 1; // Class scope\n    public void test() {\n        int local = 2; // Method scope\n        if (true) { int block = 3; } // Block scope\n    }\n}',
        codeExample: 'public class ScopeDemo {\n    static int classLevel = 100;\n\n    public static void showScopes() {\n        int methodLevel = 50;\n        for(int i=0; i<1; i++) {\n            int blockLevel = 10;\n            System.out.println("Can see all: " + classLevel + ", " + methodLevel + ", " + blockLevel);\n        }\n        // blockLevel is dead here\n    }\n\n    public static void main(String[] args) {\n        showScopes();\n    }\n}',
        codeOutput: 'Can see all: 100, 50, 10',
        takeaways: [
          'Local variables do not have default values and must be initialized manually.',
          'If a local variable has the same name as a class variable, it "shadows" (hides) the class variable.',
          'Block scope ensures temporary variables are garbage collected as early as possible.'
        ]
      }
    ],
    exercise: {
      title: 'Overloading and recursion',
      description: 'Write overloaded area methods and a recursive factorial.',
      instructions: ['Overload area() for a circle (one double) and a rectangle (two doubles).', 'Write factorial(int n) recursively with a correct base case.', 'Confirm factorial(0) returns 1, not 0.'],
      starterCode: 'public class Solution {\n    static long factorial(int n) {\n        // TODO: base case + recursive call\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}',
      expectedOutput: '120',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'What keyword denotes that a method returns nothing?', options: ['A. null', 'B. blank', 'C. void', 'D. static'], correctAnswer: 'C. void' },
      { id: 2, question: 'Which error happens if recursive calls have no terminating base case?', options: ['A. NullPointerException', 'B. StackOverflowError', 'C. ArithmeticException', 'D. OutOfMemoryError'], correctAnswer: 'B. StackOverflowError' },
      { id: 3, question: 'Can you overload a method by changing only the return type?', options: ['A. Yes', 'B. No', 'C. Depends on JVM', 'D. Only in interfaces'], correctAnswer: 'B. No' },
      { id: 4, question: 'How is data passed into Java methods?', options: ['A. Pass by reference', 'B. Pass by value', 'C. Pass by pointer', 'D. Pass by address'], correctAnswer: 'B. Pass by value' },
      { id: 5, question: 'What is dynamic method binding?', options: ['A. Overloading resolution', 'B. Runtime recursion', 'C. Overriding resolution at runtime', 'D. Importing classes'], correctAnswer: 'C. Overriding resolution at runtime' },
      { id: 6, question: 'What is method overloading?', options: ['A. Same name, different parameter lists', 'B. Same name and same parameters in a subclass', 'C. Calling a method twice', 'D. A method that is too long'], correctAnswer: 'A. Same name, different parameter lists' },
      { id: 7, question: 'Can two methods be overloaded by return type alone?', options: ['A. Yes', 'B. No, it is a compile error', 'C. Only for static methods', 'D. Only for void'], correctAnswer: 'B. No, it is a compile error' },
      { id: 8, question: 'What must every recursive method have to avoid StackOverflowError?', options: ['A. A loop', 'B. A base case', 'C. A return type of void', 'D. Two parameters'], correctAnswer: 'B. A base case' },
      { id: 9, question: 'How are primitive arguments passed in Java?', options: ['A. By reference', 'B. By value (a copy)', 'C. By pointer', 'D. By name'], correctAnswer: 'B. By value (a copy)' },
      { id: 10, question: 'When you pass an object to a method, what is copied?', options: ['A. The whole object', 'B. The reference value', 'C. Nothing', 'D. Only the fields'], correctAnswer: 'B. The reference value' },
      { id: 11, question: 'What does a method with return type `void` return?', options: ['A. null', 'B. 0', 'C. Nothing', 'D. An empty object'], correctAnswer: 'C. Nothing' },
      { id: 12, question: 'What keyword allows a method to be called without creating an object?', options: ['A. final', 'B. static', 'C. public', 'D. abstract'], correctAnswer: 'B. static' },
      { id: 13, question: 'Can a static method directly access an instance variable?', options: ['A. Yes, always', 'B. No, it has no instance context', 'C. Only if the variable is public', 'D. Only in the constructor'], correctAnswer: 'B. No, it has no instance context' },
      { id: 14, question: 'What is the scope of a local variable declared inside a method?', options: ['A. The whole class', 'B. Only that method', 'C. The whole package', 'D. All subclasses'], correctAnswer: 'B. Only that method' },
      { id: 15, question: 'What does varargs (`int... nums`) allow?', options: ['A. Zero or more arguments of that type', 'B. Exactly three arguments', 'C. Only arrays', 'D. Named arguments'], correctAnswer: 'A. Zero or more arguments of that type' },
      { id: 16, question: 'Where must a varargs parameter appear in a parameter list?', options: ['A. First', 'B. Anywhere', 'C. Last', 'D. It cannot be combined with others'], correctAnswer: 'C. Last' },
      { id: 17, question: 'What is the recursive definition of factorial(0)?', options: ['A. 0', 'B. 1', 'C. Undefined', 'D. -1'], correctAnswer: 'B. 1' },
      { id: 18, question: 'Which is generally more memory-efficient for simple repetition?', options: ['A. Recursion', 'B. Iteration', 'C. They are identical', 'D. Neither'], correctAnswer: 'B. Iteration' },
      { id: 19, question: 'What happens when a local variable shadows an instance variable of the same name?', options: ['A. Compile error', 'B. The local variable wins inside that scope', 'C. The instance variable wins', 'D. Both are updated'], correctAnswer: 'B. The local variable wins inside that scope' },
      { id: 20, question: 'Which access modifier makes a method visible only within its own class?', options: ['A. public', 'B. protected', 'C. private', 'D. default'], correctAnswer: 'C. private' }
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a recursive method that generates the N-th Fibonacci number.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    static int fib(int n) {\n        // Base case, then the recursive step\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fib(10));\n    }\n}',
          examples: [
            { input: 'n = 10', output: '55' }
          ]
        },
        { 
          kind: 'code', 
          prompt: 'Provide a code example showcasing method overloading.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    // Overload area() for a circle and a rectangle\n\n    public static void main(String[] args) {\n        // Call both and print the results\n    }\n}',
          examples: [
            { input: 'None', output: 'area' }
          ]
        }
      ]
    }
  },
  m6: {
    id: 'm6',
    title: 'MODULE 6: ARRAYS',
    overview: 'Learn one-dimensional and two-dimensional arrays, common operations, sorting, and searching in Java.',
    outcomes: [
      'Declare and populate arrays.',
      'Iterate over multidimensional grid arrays.',
      'Sort arrays using Arrays.sort().'
    ],
    lessons: [
      {
        id: 'm6-l1',
        title: 'Lesson 6.1 Introduction to Arrays',
        objectives: [
          'Define static data sequences.',
          'Understand array memory allocation.',
          'Declare and instantiate arrays correctly.'
        ],
        theory: 'Arrays are fixed-size sequential collections of elements of the same data type. They allow you to store multiple values in a single variable instead of declaring separate variables for each value. Arrays in Java are objects, meaning they are stored in the heap memory and must be instantiated using the `new` keyword, which sets their permanent size.',
        syntax: 'dataType[] arrayName = new dataType[size];\n// Alternatively: dataType[] arrayName = {val1, val2, ...};',
        codeExample: 'public class ArrayIntro {\n    public static void main(String[] args) {\n        // Declaring and instantiating\n        int[] scores = new int[3];\n        // Direct initialization\n        String[] names = {"Alice", "Bob", "Charlie"};\n        System.out.println("Names array holds: " + names.length + " elements.");\n    }\n}',
        codeOutput: 'Names array holds: 3 elements.',
        takeaways: [
          'The size of an array is permanently fixed at the time of creation and cannot be changed later.',
          'Numeric arrays default to 0, boolean arrays default to false, and object arrays default to null.',
          'Use the arrayName.length property (not a method) to find the size of the array.'
        ]
      },
      {
        id: 'm6-l2',
        title: 'Lesson 6.2 One-Dimensional Arrays',
        objectives: [
          'Access and modify array elements using indices.',
          'Understand ArrayIndexOutOfBoundsException.'
        ],
        theory: 'You can read or update elements in an array using their index. Java arrays use 0-based indexing, meaning the first element is at index 0 and the last element is at index `length - 1`. If you try to access an index outside this strict boundary, Java will throw a runtime error.',
        syntax: 'arrayName[index] = value; // Assigning\ndataType var = arrayName[index]; // Reading',
        codeExample: 'public class ArrayAccess {\n    public static void main(String[] args) {\n        int[] numbers = new int[5];\n        numbers[0] = 10;\n        numbers[1] = 20;\n        numbers[4] = 50;\n        System.out.println("First element: " + numbers[0]);\n        System.out.println("Last element: " + numbers[numbers.length - 1]);\n    }\n}',
        codeOutput: 'First element: 10\nLast element: 50',
        takeaways: [
          'Accessing index -1 or index >= length throws an ArrayIndexOutOfBoundsException.',
          'Always use index `0` for the first item and `length - 1` for the final item.',
          'Elements inside arrays can be modified at any time even if the array variable is final (final only protects the reference).'
        ]
      },
      {
        id: 'm6-l3',
        title: 'Lesson 6.3 Two-Dimensional Arrays',
        objectives: [
          'Build multi-dimensional matrices.',
          'Understand arrays of arrays.'
        ],
        theory: 'A 2D array in Java is simply an array where each element is another array. They are perfect for representing grids, tables, coordinates, or game boards (like Chess or Tic-Tac-Toe). You access elements using two indices: one for the row, and one for the column.',
        syntax: 'dataType[][] matrix = new dataType[rows][cols];',
        codeExample: 'public class MatrixDemo {\n    public static void main(String[] args) {\n        int[][] grid = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        // Accessing row 1 (second array), column 2 (third element)\n        System.out.println("Element at (1,2): " + grid[1][2]);\n        System.out.println("Total Rows: " + grid.length);\n        System.out.println("Cols in Row 0: " + grid[0].length);\n    }\n}',
        codeOutput: 'Element at (1,2): 6\nTotal Rows: 2\nCols in Row 0: 3',
        takeaways: [
          'The outer array size determines the number of rows, and inner array size determines columns.',
          'Java supports "jagged arrays" where each row can actually have a different number of columns.',
          'Always use nested loops to iterate over 2D array elements.'
        ]
      },
      {
        id: 'm6-l4',
        title: 'Lesson 6.4 Array Operations',
        objectives: [
          'Iterate using standard for loops.',
          'Utilize enhanced for-each loops.'
        ],
        theory: 'The most common operation performed on arrays is iteration—visiting every single element to read or modify it. You can use standard `for` loops using indices, or the enhanced `for-each` loop which hides the index logic and provides a cleaner syntax for strictly reading data sequentially.',
        syntax: 'for (dataType element : arrayName) {\n    // element holds the value\n}',
        codeExample: 'public class IterationDemo {\n    public static void main(String[] args) {\n        String[] fruits = {"Apple", "Banana", "Cherry"};\n        \n        // Standard loop\n        for (int i = 0; i < fruits.length; i++) {\n            System.out.print(fruits[i] + " ");\n        }\n        System.out.println();\n        \n        // Enhanced for-each loop\n        for (String fruit : fruits) {\n            System.out.print(fruit + " ");\n        }\n    }\n}',
        codeOutput: 'Apple Banana Cherry \nApple Banana Cherry ',
        takeaways: [
          'The standard for loop allows backward iteration, skipping elements, and modifying the array.',
          'The enhanced for-each loop strictly moves forward by 1, and operates on a copy of the element (modifying it does not change the array).',
          'Use for-each whenever you only need to read elements sequentially.'
        ]
      },
      {
        id: 'm6-l5',
        title: 'Lesson 6.5 Array Sorting',
        objectives: [
          'Use java.util.Arrays to sort data natively.',
          'Understand default sorting behaviors.'
        ],
        theory: 'Instead of writing manual sorting algorithms like Bubble Sort, Java provides the `java.util.Arrays` utility class. The `Arrays.sort()` method sorts array elements into ascending numerical or alphabetical order automatically. It uses an extremely fast dual-pivot Quicksort algorithm for primitives.',
        syntax: 'import java.util.Arrays;\n\nArrays.sort(arrayName);',
        codeExample: 'import java.util.Arrays;\n\npublic class SortDemo {\n    public static void main(String[] args) {\n        int[] numbers = {50, 10, 40, 20, 30};\n        Arrays.sort(numbers);\n        System.out.println(Arrays.toString(numbers));\n    }\n}',
        codeOutput: '[10, 20, 30, 40, 50]',
        takeaways: [
          'Arrays.sort() modifies the original array; it does not return a new one.',
          'You can sort objects (like Strings) alphabetically natively.',
          'Arrays.toString() is a helper method to print arrays easily without writing a loop.'
        ]
      },
      {
        id: 'm6-l6',
        title: 'Lesson 6.6 Array Searching',
        objectives: [
          'Implement Linear search techniques.',
          'Utilize fast Binary Search algorithms.'
        ],
        theory: 'Searching involves finding the index of a specific element. A **Linear Search** checks every element one by one (O(N) time), which works on any array. A **Binary Search** is incredibly fast (O(log N) time) but requires the array to be sorted first. It works by repeatedly dividing the search interval in half.',
        syntax: 'int index = Arrays.binarySearch(sortedArray, targetValue);',
        codeExample: 'import java.util.Arrays;\n\npublic class SearchDemo {\n    public static void main(String[] args) {\n        int[] data = {5, 12, 19, 21, 33};\n        int target = 21;\n        \n        int foundIndex = Arrays.binarySearch(data, target);\n        System.out.println("Element 21 found at index: " + foundIndex);\n    }\n}',
        codeOutput: 'Element 21 found at index: 3',
        takeaways: [
          'If you use Arrays.binarySearch() on an unsorted array, the results are completely unpredictable.',
          'If the element is not found, binarySearch returns a negative integer.',
          'Linear search is safer for constantly changing, unsorted data.'
        ]
      }
    ],
    exercise: {
      title: 'Array statistics',
      description: 'Compute the minimum, maximum and average of an int array without using library helpers.',
      instructions: ['Traverse the array once to find both min and max.', 'Accumulate the sum as a long to avoid overflow, then divide as a double.', 'Handle the empty-array case rather than dividing by zero.'],
      starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] data = {64, 25, 12, 22, 11, 90, 34};\n        // TODO: print min, max and average\n    }\n}',
      expectedOutput: 'Min: 11, Max: 90, Avg: 36.857142857142854',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which index represents the third element of a Java array?', options: ['A. 3', 'B. 2', 'C. 1', 'D. 4'], correctAnswer: 'B. 2' },
      { id: 2, question: 'What property gives the size of an array?', options: ['A. size()', 'B. length', 'C. length()', 'D. capacity'], correctAnswer: 'B. length' },
      { id: 3, question: 'What exception is thrown when accessing index -1?', options: ['A. NullPointerException', 'B. OutOfBoundsException', 'C. ArrayIndexOutOfBoundsException', 'D. InvalidIndexException'], correctAnswer: 'C. ArrayIndexOutOfBoundsException' },
      { id: 4, question: 'Which sorting method is built into the Arrays utility class?', options: ['A. Arrays.order()', 'B. Arrays.sort()', 'C. Arrays.filter()', 'D. Arrays.binarySearch()'], correctAnswer: 'B. Arrays.sort()' },
      { id: 5, question: 'Can you dynamically resize an array after creation?', options: ['A. Yes', 'B. No', 'C. Using size = newSize', 'D. Only in main method'], correctAnswer: 'B. No' },
      { id: 6, question: 'What is the default value of an element in a newly created `int[5]`?', options: ['A. null', 'B. 0', 'C. undefined', 'D. -1'], correctAnswer: 'B. 0' },
      { id: 7, question: 'What is the default value in a new `String[3]`?', options: ['A. ""', 'B. null', 'C. "null"', 'D. 0'], correctAnswer: 'B. null' },
      { id: 8, question: 'Which exception is thrown by accessing `arr[arr.length]`?', options: ['A. NullPointerException', 'B. ArrayIndexOutOfBoundsException', 'C. IllegalArgumentException', 'D. ArrayStoreException'], correctAnswer: 'B. ArrayIndexOutOfBoundsException' },
      { id: 9, question: 'How do you get the size of an array named `data`?', options: ['A. data.size()', 'B. data.length()', 'C. data.length', 'D. length(data)'], correctAnswer: 'C. data.length' },
      { id: 10, question: 'Can the length of a Java array be changed after creation?', options: ['A. Yes, with resize()', 'B. No, it is fixed', 'C. Only for int arrays', 'D. Only if declared final'], correctAnswer: 'B. No, it is fixed' },
      { id: 11, question: 'Which method sorts an int array in ascending order?', options: ['A. Arrays.sort()', 'B. Arrays.order()', 'C. Collections.sort()', 'D. array.sort()'], correctAnswer: 'A. Arrays.sort()' },
      { id: 12, question: 'What does `Arrays.toString(arr)` do?', options: ['A. Converts elements to Strings', 'B. Returns a readable representation of the array', 'C. Sorts then prints', 'D. Returns the memory address'], correctAnswer: 'B. Returns a readable representation of the array' },
      { id: 13, question: 'What is the time complexity of accessing an array element by index?', options: ['A. O(1)', 'B. O(n)', 'C. O(log n)', 'D. O(n^2)'], correctAnswer: 'A. O(1)' },
      { id: 14, question: 'How is a 2D array declared in Java?', options: ['A. int[][] grid = new int[3][4];', 'B. int grid[3][4];', 'C. array2d int grid;', 'D. int grid = new int[3,4];'], correctAnswer: 'A. int[][] grid = new int[3][4];' },
      { id: 15, question: 'What is a jagged array?', options: ['A. An unsorted array', 'B. A 2D array whose rows have different lengths', 'C. An array with null elements', 'D. An array of objects'], correctAnswer: 'B. A 2D array whose rows have different lengths' },
      { id: 16, question: 'Which precondition does `Arrays.binarySearch()` require?', options: ['A. The array must be sorted', 'B. The array must be non-empty', 'C. The array must be 2D', 'D. No precondition'], correctAnswer: 'A. The array must be sorted' },
      { id: 17, question: 'What does `System.arraycopy()` do?', options: ['A. Copies a range of elements between arrays', 'B. Creates a deep clone', 'C. Sorts and copies', 'D. Prints the array'], correctAnswer: 'A. Copies a range of elements between arrays' },
      { id: 18, question: 'Is `arr.clone()` on an array of objects a deep copy?', options: ['A. Yes', 'B. No, it copies references (shallow)', 'C. Only for Strings', 'D. Only for primitives'], correctAnswer: 'B. No, it copies references (shallow)' },
      { id: 19, question: 'What is the cost of inserting into the middle of an array?', options: ['A. O(1)', 'B. O(log n)', 'C. O(n) because elements must shift', 'D. Impossible'], correctAnswer: 'C. O(n) because elements must shift' },
      { id: 20, question: 'Which class should you use when the number of elements is not known upfront?', options: ['A. int[]', 'B. ArrayList', 'C. String[]', 'D. Arrays'], correctAnswer: 'B. ArrayList' }
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a program to find the second largest element in an integer array.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] nums = {12, 35, 1, 10, 34, 1};\n        // Find the second largest WITHOUT sorting\n    }\n}',
          examples: [
            { input: 'nums = {12, 35, 1, 10, 34, 1}', output: '34' }
          ]
        },
        { 
          kind: 'code', 
          prompt: 'Write a code snippet to print all elements of a 2D matrix.', 
          language: 'java', 
          starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n        // Print every element, one row per line\n    }\n}',
          examples: [
            { input: 'grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}', output: '1 2 3\n4 5 6\n7 8 9' }
          ]
        }
      ]
    }
  },
  m7: {
    id: 'm7',
    title: 'MODULE 7: STRINGS',
    overview: 'Learn Java String manipulation, methods, immutable nature, StringBuilder, StringBuffer, and memory mapping.',
    outcomes: [
      'Compare Strings using equals() instead of ==.',
      'Use StringBuilder for highly performant loops manipulations.',
      'Understand String Pool storage mechanics.'
    ],
    lessons: [
      {
        id: 'm7-l1',
        title: 'Lesson 7.1 Introduction to Strings',
        objectives: [
          'Understand the difference between primitives and Strings.',
          'Master the concept of String immutability.'
        ],
        theory: 'Strings in Java are not primitive data types; they are objects representing a sequence of characters. The most critical feature of Java Strings is immutability: once a String object is created in memory, its exact sequence of characters cannot ever be changed. Any operation that appears to modify a String actually creates and returns an entirely new String object.',
        syntax: 'String str1 = "Hello"; // Literal notation\nString str2 = new String("World"); // Object notation',
        codeExample: 'public class StringIntro {\n    public static void main(String[] args) {\n        String original = "Java";\n        original.concat(" Programming"); // Creates new string, but we ignore it\n        System.out.println("Original String: " + original);\n        \n        // Correct way to capture modification\n        original = original.concat(" Programming");\n        System.out.println("Reassigned String: " + original);\n    }\n}',
        codeOutput: 'Original String: Java\nReassigned String: Java Programming',
        takeaways: [
          'String methods do not alter the existing string; they spawn new instances.',
          'This immutability ensures security, thread-safety, and allows caching.',
          'Literal notation ("text") is preferred over new String() to leverage memory caching.'
        ]
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2 String Methods',
        objectives: [
          'Perform robust string manipulations.',
          'Extract specific characters and substrings.'
        ],
        theory: 'The `String` class is packed with helper methods to process text. You can find the length, extract parts of the text (substrings), change casing, check for suffixes, or remove whitespace. Remember, indices in strings always start at 0, just like arrays.',
        syntax: 'int len = text.length();\nString sub = text.substring(start, end);\nchar c = text.charAt(index);',
        codeExample: 'public class StringMethods {\n    public static void main(String[] args) {\n        String phrase = "  Hello Universe  ";\n        String clean = phrase.trim(); // Removes outer spaces\n        System.out.println("Length: " + clean.length());\n        System.out.println("Uppercase: " + clean.toUpperCase());\n        System.out.println("Substring: " + clean.substring(6, 14));\n    }\n}',
        codeOutput: 'Length: 14\nUppercase: HELLO UNIVERSE\nSubstring: Universe',
        takeaways: [
          'length() is a method with parenthesis in Strings, unlike arrays where it is a property.',
          'substring(start, end) includes the start index but excludes the end index.',
          'trim() is extremely useful for sanitizing user inputs from forms.'
        ]
      },
      {
        id: 'm7-l3',
        title: 'Lesson 7.3 StringBuilder',
        objectives: [
          'Build strings dynamically and efficiently.',
          'Understand performance bottlenecks of concatenating in loops.'
        ],
        theory: 'Because standard Strings are immutable, concatenating strings inside large loops creates thousands of abandoned objects, destroying performance and filling up memory. To solve this, Java provides `StringBuilder`. It represents a mutable sequence of characters. You can append, insert, or delete characters directly inside the same memory space.',
        syntax: 'StringBuilder sb = new StringBuilder();\nsb.append("Value");',
        codeExample: 'public class BuilderDemo {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder("Java");\n        sb.append(" is");\n        sb.append(" fast!");\n        sb.insert(4, " Code"); // Inserts at index 4\n        \n        System.out.println(sb.toString());\n    }\n}',
        codeOutput: 'Java Code is fast!',
        takeaways: [
          'Always use StringBuilder when combining strings inside loops (e.g. for loops or while loops).',
          'Call toString() on the StringBuilder when you are finished to get the final immutable String.',
          'It is vastly faster than using the standard + operator for dynamic concatenations.'
        ]
      },
      {
        id: 'm7-l4',
        title: 'Lesson 7.4 StringBuffer',
        objectives: [
          'Learn thread-safe string building configurations.',
          'Contrast StringBuffer against StringBuilder.'
        ],
        theory: '`StringBuffer` is the older sibling of `StringBuilder`. It performs the exact same mutable string operations (append, insert, etc.). The critical difference is that `StringBuffer` is synchronized, meaning it is thread-safe. If multiple threads are attempting to modify the same string simultaneously, StringBuffer prevents data corruption, but this synchronization lock makes it noticeably slower.',
        syntax: 'StringBuffer sb = new StringBuffer();\nsb.append("Thread-Safe");',
        codeExample: 'public class BufferDemo {\n    public static void main(String[] args) {\n        StringBuffer buffer = new StringBuffer("Safe");\n        buffer.append(" Operations");\n        buffer.reverse(); // Easily reverse strings\n        System.out.println(buffer.toString());\n    }\n}',
        codeOutput: 'snoitarepO efaS',
        takeaways: [
          'Use StringBuilder 99% of the time for standard applications.',
          'Use StringBuffer only when you are explicitly managing multiple background threads sharing the same variable.',
          'Both classes share the exact same method names.'
        ]
      },
      {
        id: 'm7-l5',
        title: 'Lesson 7.5 String Comparison',
        objectives: [
          'Differentiate `==` operator from `equals()`.',
          'Avoid logic bugs caused by memory address comparisons.'
        ],
        theory: 'A massive beginner pitfall in Java is comparing strings using `==`. The `==` operator checks if two variables point to the exact same memory address (object reference). To check if two strings contain the same actual sequence of letters (content value), you must use the `.equals()` method.',
        syntax: 'boolean match = str1.equals(str2);\nboolean insensitive = str1.equalsIgnoreCase(str2);',
        codeExample: 'public class CompareDemo {\n    public static void main(String[] args) {\n        String a = new String("test");\n        String b = new String("test");\n        \n        System.out.println("Using == : " + (a == b));\n        System.out.println("Using equals: " + a.equals(b));\n    }\n}',
        codeOutput: 'Using == : false\nUsing equals: true',
        takeaways: [
          'NEVER use == to compare string text. It will often return false even if the text matches.',
          'Always use equals() for exact matches, and equalsIgnoreCase() for case-insensitive checks.',
          'If you create strings without `new`, Java may cache them to the same address, making `==` work occasionally, but it is too dangerous to rely on.'
        ]
      },
      {
        id: 'm7-l6',
        title: 'Lesson 7.6 String Manipulation',
        objectives: [
          'Split monolithic strings into arrays.',
          'Sanitize data using replace operators.'
        ],
        theory: 'For parsing complex data sets (like CSV files or URLs), the `split()` method divides a string into a String array using a provided delimiter or regular expression. Conversely, the `replace()` method scans the string and substitutes all occurrences of a specific character or sequence with a new one.',
        syntax: 'String[] parts = text.split("delimiter");\nString replaced = text.replace("old", "new");',
        codeExample: 'public class ManipulateDemo {\n    public static void main(String[] args) {\n        String csv = "apple,banana,orange";\n        String[] fruits = csv.split(",");\n        System.out.println("Second fruit: " + fruits[1]);\n        \n        String messy = "I love apples";\n        System.out.println("Fixed: " + messy.replace("apples", "Java"));\n    }\n}',
        codeOutput: 'Second fruit: banana\nFixed: I love Java',
        takeaways: [
          'split() accepts regular expressions (Regex), so splitting on special characters like periods requires escaping: split("\\\\.").',
          'replace() replaces every matching occurrence, not just the first one.',
          'These operations are heavy; use them judiciously on very large strings.'
        ]
      }
    ],
    exercise: {
      title: 'Palindrome and reversal',
      description: 'Check whether a string is a palindrome, ignoring case and non-letters.',
      instructions: ['Normalise the input: lowercase it and strip anything that is not a letter or digit.', 'Compare characters from both ends moving inwards.', 'Use StringBuilder for the reversal variant and note why it beats String concatenation.'],
      starterCode: 'public class Solution {\n    static boolean isPalindrome(String input) {\n        // TODO: normalise, then two-pointer compare\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));\n    }\n}',
      expectedOutput: 'true',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which memory structure caches unique string literals?', options: ['A. Heap pool', 'B. Stack frame', 'C. String Constant Pool (SCP)', 'D. Global registry'], correctAnswer: 'C. String Constant Pool (SCP)' },
      { id: 2, question: 'Which comparison matches actual content values of strings?', options: ['A. str1 == str2', 'B. str1.equals(str2)', 'C. str1.compare(str2)', 'D. str1 === str2'], correctAnswer: 'B. str1.equals(str2)' },
      { id: 3, question: 'Which string builder tool is mutable but not thread-safe?', options: ['A. String', 'B. StringBuffer', 'C. StringBuilder', 'D. ArrayBuilder'], correctAnswer: 'C. StringBuilder' },
      { id: 4, question: 'What is the result of "abc".substring(1, 3)?', options: ['A. "ab"', 'B. "bc"', 'C. "b"', 'D. "c"'], correctAnswer: 'B. "bc"' },
      { id: 5, question: 'Why are String objects immutable in Java?', options: ['A. For security, caching, and thread safety', 'B. Because compiler cannot modify them', 'C. To save storage spaces', 'D. By mistake'], correctAnswer: 'A. For security, caching, and thread safety' },
      { id: 6, question: 'Why are Strings immutable in Java?', options: ['A. For caching, thread safety and security', 'B. To save disk space', 'C. Because they are primitives', 'D. To allow modification'], correctAnswer: 'A. For caching, thread safety and security' },
      { id: 7, question: 'What does `==` compare for two String variables?', options: ['A. Their contents', 'B. Their reference addresses', 'C. Their lengths', 'D. Their hash codes'], correctAnswer: 'B. Their reference addresses' },
      { id: 8, question: 'Which method correctly compares String contents?', options: ['A. ==', 'B. equals()', 'C. compare()', 'D. matches()'], correctAnswer: 'B. equals()' },
      { id: 9, question: 'Which class is mutable AND synchronised?', options: ['A. String', 'B. StringBuilder', 'C. StringBuffer', 'D. CharSequence'], correctAnswer: 'C. StringBuffer' },
      { id: 10, question: 'Which is faster in single-threaded code?', options: ['A. StringBuffer', 'B. StringBuilder', 'C. They are identical', 'D. String'], correctAnswer: 'B. StringBuilder' },
      { id: 11, question: 'What does `"Java".charAt(0)` return?', options: ['A. "J"', 'B. \'J\'', 'C. 0', 'D. "Java"'], correctAnswer: 'B. \'J\'' },
      { id: 12, question: 'What does `"  hi  ".trim()` produce?', options: ['A. "hi"', 'B. "  hi"', 'C. "hi  "', 'D. "  hi  "'], correctAnswer: 'A. "hi"' },
      { id: 13, question: 'What does `String.valueOf(42)` return?', options: ['A. 42', 'B. "42"', 'C. \'4\'', 'D. null'], correctAnswer: 'B. "42"' },
      { id: 14, question: 'What does `"a,b,c".split(",")` return?', options: ['A. A String', 'B. A String array of length 3', 'C. A List', 'D. A char array'], correctAnswer: 'B. A String array of length 3' },
      { id: 15, question: 'Where are String literals stored?', options: ['A. The String constant pool', 'B. The stack', 'C. Metaspace', 'D. A register'], correctAnswer: 'A. The String constant pool' },
      { id: 16, question: 'What does `new String("hi")` guarantee?', options: ['A. Reuse of the pooled literal', 'B. A distinct object on the heap', 'C. A compile error', 'D. A null value'], correctAnswer: 'B. A distinct object on the heap' },
      { id: 17, question: 'Which method ignores case when comparing?', options: ['A. equals()', 'B. equalsIgnoreCase()', 'C. compareTo()', 'D. contentEquals()'], correctAnswer: 'B. equalsIgnoreCase()' },
      { id: 18, question: 'What does `"hello".substring(1, 3)` return?', options: ['A. "el"', 'B. "ell"', 'C. "he"', 'D. "llo"'], correctAnswer: 'A. "el"' },
      { id: 19, question: 'Why is String concatenation in a large loop discouraged?', options: ['A. It is a syntax error', 'B. Each concatenation creates a new String object', 'C. It reverses the string', 'D. It uses too little memory'], correctAnswer: 'B. Each concatenation creates a new String object' },
      { id: 20, question: 'What does `"Java".indexOf("v")` return?', options: ['A. 1', 'B. 2', 'C. 3', 'D. -1'], correctAnswer: 'B. 2' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a program that counts the frequencies of each word in a text string.', language: 'java', starterCode: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        String text = "the quick brown fox jumps over the lazy dog the fox";\n        // Count each word and print the results\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'Why does String comparison using the "==" operator return false when comparing two strings created with new String("test")?',
          options: [
            'A. The "==" operator compares the content of the string objects, which is different.',
            'B. The "==" operator compares memory references (addresses), not the actual contents.',
            'C. The compiler automatically optimizes new String() objects to have random values.',
            'D. The "==" operator is not allowed for String objects and will cause a compilation error.'
          ],
          correctAnswer: 'B. The "==" operator compares memory references (addresses), not the actual contents.'
        }
      ]
    }
  },
  m8: {
    id: 'm8',
    title: 'MODULE 8: OBJECT-ORIENTED PROGRAMMING (OOP)',
    overview: 'Master Java Object-Oriented paradigms: Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, Abstraction, and Interfaces.',
    outcomes: [
      'Write encapsulated classes using private variables and getters/setters.',
      'Differentiate abstract classes vs interfaces.',
      'Implement polymorphism using method overriding.'
    ],
    lessons: [
      {
        id: 'm8-l1',
        title: 'Lesson 8.1 Introduction to OOP',
        objectives: [
          'Understand paradigm shifts from procedural programming.',
          'Memorize the four pillars of Object-Oriented logic.'
        ],
        theory: 'Object-Oriented Programming (OOP) is a paradigm that models software components as real-world "objects" that contain both data (state) and methods (behavior). This is vastly different from procedural programming (like C) which separates data from functions. The four core pillars of OOP that organize architecture are: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
        syntax: '// Object Oriented Design models Entities\nclass BankAccount {\n    double balance;\n    void deposit(double amt) { ... }\n}',
        codeExample: 'public class OOPConcept {\n    public static void main(String[] args) {\n        System.out.println("OOP builds modular, reusable software mapped to business logic.");\n    }\n}',
        codeOutput: 'OOP builds modular, reusable software mapped to business logic.',
        takeaways: [
          'OOP makes large codebases vastly easier to maintain, scale, and debug.',
          'An object is self-contained: it knows its own data and how to manipulate it.',
          'Everything in Java revolves around OOP; you cannot write code outside of a Class.'
        ]
      },
      {
        id: 'm8-l2',
        title: 'Lesson 8.2 Classes and Objects',
        objectives: [
          'Define class blueprints.',
          'Instantiate objects into heap memory.'
        ],
        theory: 'A **Class** is a blueprint or template. It defines what attributes and behaviors an entity will have, but it consumes no data memory itself. An **Object** is a concrete instance of that class. You create objects using the `new` keyword, which allocates space in heap memory and returns a reference address back to your variable.',
        syntax: 'ClassName objectName = new ClassName();',
        codeExample: 'class Car {\n    String color;\n    void honk() { System.out.println("Beep!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car myCar = new Car(); // Instantiation\n        myCar.color = "Red";\n        myCar.honk();\n    }\n}',
        codeOutput: 'Beep!',
        takeaways: [
          'You can create thousands of unique Objects from a single Class blueprint.',
          'Object variables act as remote controls pointing to the data in heap memory.',
          'A class should typically define fields at the top, and methods below.'
        ]
      },
      {
        id: 'm8-l3',
        title: 'Lesson 8.3 Constructors',
        objectives: [
          'Initialize objects with startup data.',
          'Differentiate constructors from standard methods.'
        ],
        theory: 'A Constructor is a special block of code called automatically the exact moment an object is instantiated with `new`. Its purpose is to initialize the object\'s fields. Constructors have two strict rules: they must have the exact same name as the Class, and they absolutely cannot have a return type (not even void).',
        syntax: 'public ClassName(parameters) {\n    // Setup code\n}',
        codeExample: 'class User {\n    String role;\n    // Constructor\n    public User(String assignedRole) {\n        role = assignedRole;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        User admin = new User("Admin");\n        System.out.println("Role: " + admin.role);\n    }\n}',
        codeOutput: 'Role: Admin',
        takeaways: [
          'If you write zero constructors, Java quietly inserts an empty Default Constructor for you.',
          'If you write any custom constructor, Java removes the default one.',
          'Constructors can be overloaded just like methods.'
        ]
      },
      {
        id: 'm8-l4',
        title: 'Lesson 8.4 this Keyword',
        objectives: [
          'Resolve variable naming collisions.',
          'Reference the current active instance.'
        ],
        theory: 'Inside class methods, the `this` keyword is a reference variable that points to the current object instance executing the method. It is most heavily used in constructors and setter methods to resolve variable shadowing (when a method parameter has the exact same name as a class attribute).',
        syntax: 'public void setAge(int age) {\n    this.age = age; // this.age refers to the class field\n}',
        codeExample: 'class Person {\n    String name;\n    public Person(String name) {\n        // Without `this`, the parameter assigns to itself, doing nothing\n        this.name = name;\n    }\n    public void display() {\n        System.out.println("I am " + this.name);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Person p = new Person("John");\n        p.display();\n    }\n}',
        codeOutput: 'I am John',
        takeaways: [
          'Using `this.field` clarifies that you are modifying the object state, not a local variable.',
          'You can also use `this()` to call other constructors within the same class.',
          '`this` cannot be used inside static methods, because static methods belong to the class, not an object instance.'
        ]
      },
      {
        id: 'm8-l5',
        title: 'Lesson 8.5 Encapsulation',
        objectives: [
          'Implement data hiding using private modifiers.',
          'Write robust Getter and Setter architectures.'
        ],
        theory: 'Encapsulation is the OOP mechanism of wrapping data (variables) and code acting on the data (methods) together as a single unit. In practice, this means declaring class variables as `private` to lock them away from direct outside access, and providing `public` Getters (to read) and Setters (to write) to enforce validation logic.',
        syntax: 'private int field;\npublic int getField() { return field; }\npublic void setField(int val) { field = val; }',
        codeExample: 'class Bank {\n    private double balance = 1000;\n    \n    public double getBalance() { return balance; }\n    \n    public void withdraw(double amt) {\n        if (amt > 0 && amt <= balance) {\n            balance -= amt;\n        }\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Bank b = new Bank();\n        b.withdraw(400);\n        System.out.println("Remaining: " + b.getBalance());\n    }\n}',
        codeOutput: 'Remaining: 600.0',
        takeaways: [
          'Encapsulation prevents other developers from injecting bad data (e.g. setting health to -500).',
          'It allows you to change internal logic without breaking external code that relies on your class.',
          'Almost all fields in professional Java applications should be private.'
        ]
      },
      {
        id: 'm8-l6',
        title: 'Lesson 8.6 Inheritance',
        objectives: [
          'Establish Is-A hierarchical relationships.',
          'Extend classes to inherit attributes and methods.'
        ],
        theory: 'Inheritance allows a new class (Child/Subclass) to acquire the properties and methods of an existing class (Parent/Superclass) using the `extends` keyword. This promotes massive code reusability. A Dog "Is-A" Animal, so Dog can extend Animal and inherit walking and eating methods, while adding its own barking methods.',
        syntax: 'class ChildClass extends ParentClass {\n    // Additional features\n}',
        codeExample: 'class Animal {\n    void eat() { System.out.println("Eating..."); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println("Barking!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat(); // Inherited method\n        d.bark(); // Specific method\n    }\n}',
        codeOutput: 'Eating...\nBarking!',
        takeaways: [
          'Private fields and methods of a parent class are NOT accessible to the child class.',
          'Java supports Multi-level inheritance (A->B->C) but absolutely forbids Multiple inheritance (A extending B and C simultaneously).',
          'The `super` keyword is used in subclasses to access parent constructors and overridden methods.'
        ]
      },
      {
        id: 'm8-l7',
        title: 'Lesson 8.7 Polymorphism',
        objectives: [
          'Implement dynamic method dispatch.',
          'Override parent methods to customize behaviors.'
        ],
        theory: 'Polymorphism ("many forms") allows objects of different classes to be treated as objects of a common superclass. The most powerful form is Method Overriding (Runtime Polymorphism). If a child class provides a specific implementation of a method already defined in its parent, calling that method executes the child\'s version, even if the variable type is the parent class.',
        syntax: '@Override\npublic void parentMethod() {\n    // New logic\n}',
        codeExample: 'class Bird {\n    void sing() { System.out.println("Bird song"); }\n}\nclass Crow extends Bird {\n    @Override\n    void sing() { System.out.println("Caw caw!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Bird myBird = new Crow(); // Parent reference, Child object\n        myBird.sing(); // Calls Crow\'s version dynamically\n    }\n}',
        codeOutput: 'Caw caw!',
        takeaways: [
          'The `@Override` annotation is highly recommended to let the compiler check for spelling mistakes.',
          'Polymorphism allows you to write one method that can accept hundreds of different child object types.',
          'Overloading is compile-time polymorphism; overriding is runtime polymorphism.'
        ]
      },
      {
        id: 'm8-l8',
        title: 'Lesson 8.8 Abstraction',
        objectives: [
          'Hide implementation complexities.',
          'Define abstract classes and methods.'
        ],
        theory: 'Abstraction focuses on hiding complex implementation details and showing only the essential features of an object. You achieve this using the `abstract` keyword. An abstract class acts as a rigid template: it cannot be instantiated itself, and it forces any child class to write the code for its abstract methods.',
        syntax: 'abstract class Vehicle {\n    abstract void startEngine(); // No body allowed!\n}',
        codeExample: 'abstract class Shape {\n    abstract void draw(); // Must be overridden\n}\nclass Circle extends Shape {\n    void draw() {\n        System.out.println("Drawing a circle.");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}',
        codeOutput: 'Drawing a circle.',
        takeaways: [
          'You can NEVER use `new` to instantiate an abstract class directly.',
          'Abstract classes can contain both abstract methods (no body) and normal methods (with bodies).',
          'It forces subclasses to adhere to a strict structural design.'
        ]
      },
      {
        id: 'm8-l9',
        title: 'Lesson 8.9 Interfaces',
        objectives: [
          'Implement 100% abstract contracts.',
          'Bypass multiple inheritance limitations.'
        ],
        theory: 'An Interface is a completely abstract "contract" that classes can agree to follow using the `implements` keyword. Because Java blocks a class from extending multiple parents, interfaces are the solution. A class can implement infinite interfaces. By default, all methods inside an interface are implicitly public and abstract.',
        syntax: 'interface Playable {\n    void play();\n}\nclass Video implements Playable {\n    public void play() { ... }\n}',
        codeExample: 'interface Drivable {\n    void drive();\n}\nclass Truck implements Drivable {\n    public void drive() {\n        System.out.println("Truck driving heavily.");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Drivable t = new Truck();\n        t.drive();\n    }\n}',
        codeOutput: 'Truck driving heavily.',
        takeaways: [
          'Fields in interfaces are always implicitly `public static final` (constants).',
          'A class must implement every single method defined in the interface, or declare itself abstract.',
          'Modern Java (8+) allows `default` and `static` methods with bodies inside interfaces, but the primary use is still abstract contracts.'
        ]
      }
    ],
    exercise: {
      title: 'Bank account hierarchy',
      description: 'Model encapsulation, inheritance and polymorphism with a small account hierarchy.',
      instructions: ['Create an abstract Account with a private balance and public deposit/withdraw methods.', 'Derive SavingsAccount and CurrentAccount, each overriding calculateInterest().', 'Store both in an Account[] and call the overridden method to demonstrate runtime polymorphism.'],
      starterCode: 'abstract class Account {\n    private double balance;\n    abstract double calculateInterest();\n    // TODO: encapsulated deposit and withdraw\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: build an Account[] and print each interest value\n    }\n}',
      expectedOutput: 'Savings interest: 400.0\nCurrent interest: 0.0',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which pillar hides implementation details and exposes only functionality?', options: ['A. Encapsulation', 'B. Inheritance', 'C. Polymorphism', 'D. Abstraction'], correctAnswer: 'D. Abstraction' },
      { id: 2, question: 'Which keyword points to the current object instance?', options: ['A. super', 'B. this', 'C. base', 'D. current'], correctAnswer: 'B. this' },
      { id: 3, question: 'Can a Java class extend multiple parent classes?', options: ['A. Yes', 'B. No', 'C. Only abstract classes', 'D. Only in interfaces'], correctAnswer: 'B. No' },
      { id: 4, question: 'Which keyword implements an interface contract?', options: ['A. extends', 'B. inherits', 'C. implements', 'D. uses'], correctAnswer: 'C. implements' },
      { id: 5, question: 'What is compile-time polymorphism?', options: ['A. Method Overriding', 'B. Method Overloading', 'C. Garbage Collection', 'D. Inheritance'], correctAnswer: 'B. Method Overloading' },
      { id: 6, question: 'Which OOP pillar hides internal state behind methods?', options: ['A. Inheritance', 'B. Encapsulation', 'C. Polymorphism', 'D. Abstraction'], correctAnswer: 'B. Encapsulation' },
      { id: 7, question: 'What is the purpose of a constructor?', options: ['A. To destroy objects', 'B. To initialise a new object', 'C. To return a value', 'D. To declare a class'], correctAnswer: 'B. To initialise a new object' },
      { id: 8, question: 'What does a constructor return?', options: ['A. void', 'B. The class type', 'C. Nothing, it has no return type', 'D. null'], correctAnswer: 'C. Nothing, it has no return type' },
      { id: 9, question: 'What happens if you define no constructor at all?', options: ['A. Compile error', 'B. Java provides a default no-arg constructor', 'C. The class cannot be instantiated', 'D. All fields become final'], correctAnswer: 'B. Java provides a default no-arg constructor' },
      { id: 10, question: 'What does the `this` keyword refer to?', options: ['A. The superclass', 'B. The current object instance', 'C. A static context', 'D. The class itself'], correctAnswer: 'B. The current object instance' },
      { id: 11, question: 'Which keyword is used to inherit from a class?', options: ['A. implements', 'B. extends', 'C. inherits', 'D. super'], correctAnswer: 'B. extends' },
      { id: 12, question: 'How many classes can a Java class extend directly?', options: ['A. One', 'B. Two', 'C. Unlimited', 'D. Zero'], correctAnswer: 'A. One' },
      { id: 13, question: 'Which enables multiple inheritance of type in Java?', options: ['A. Abstract classes', 'B. Interfaces', 'C. Inner classes', 'D. Static classes'], correctAnswer: 'B. Interfaces' },
      { id: 14, question: 'Compile-time polymorphism is achieved through:', options: ['A. Overriding', 'B. Overloading', 'C. Inheritance', 'D. Encapsulation'], correctAnswer: 'B. Overloading' },
      { id: 15, question: 'Runtime polymorphism is achieved through:', options: ['A. Overloading', 'B. Method overriding', 'C. Static methods', 'D. Constructors'], correctAnswer: 'B. Method overriding' },
      { id: 16, question: 'Can an abstract class have a constructor?', options: ['A. Yes', 'B. No', 'C. Only if it has no abstract methods', 'D. Only a private one'], correctAnswer: 'A. Yes' },
      { id: 17, question: 'Can you instantiate an abstract class directly?', options: ['A. Yes', 'B. No', 'C. Only with new', 'D. Only in the same package'], correctAnswer: 'B. No' },
      { id: 18, question: 'Which access modifier allows access in subclasses and the same package?', options: ['A. private', 'B. protected', 'C. public', 'D. default'], correctAnswer: 'B. protected' },
      { id: 19, question: 'What does `super()` do?', options: ['A. Calls the superclass constructor', 'B. Creates a new object', 'C. Calls a static method', 'D. Returns the parent class'], correctAnswer: 'A. Calls the superclass constructor' },
      { id: 20, question: 'Since Java 8, what can an interface contain besides abstract methods?', options: ['A. Nothing else', 'B. default and static methods', 'C. Constructors', 'D. Instance fields'], correctAnswer: 'B. default and static methods' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Design a Class structure representing a Bank Account with encapsulation.', language: 'java', starterCode: 'class BankAccount {\n    // Private fields, public deposit/withdraw, no direct balance access\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Demonstrate deposit, withdraw and a rejected overdraft\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'Which of the following is a key difference between abstract classes and interfaces in Java 8 and later?',
          options: [
            'A. An interface can have instance fields; an abstract class cannot.',
            'B. A class can extend multiple abstract classes but can implement only one interface.',
            'C. An abstract class can have instance fields and constructors; an interface cannot have instance fields or constructors.',
            'D. Interfaces cannot have any method implementations.'
          ],
          correctAnswer: 'C. An abstract class can have instance fields and constructors; an interface cannot have instance fields or constructors.'
        }
      ]
    }
  },
  m9: {
    id: 'm9',
    title: 'MODULE 9: EXCEPTION HANDLING',
    overview: 'Learn robust code handling in Java. Differentiate checked vs unchecked exceptions, try-catch-finally, throws, and custom exceptions.',
    outcomes: [
      'Catch run-time exceptions without program crashes.',
      'Design finally blocks to release resources.',
      'Create custom checked exceptions.'
    ],
    lessons: [
      {
        id: 'm9-l1',
        title: 'Lesson 9.1 What are Exceptions?',
        objectives: [
          'Understand exception hierarchies.',
          'Differentiate between Checked and Unchecked Exceptions.'
        ],
        theory: 'In Java, an exception is an unwanted or unexpected event that disrupts the normal flow of the program at runtime (like dividing by zero, or opening a missing file). All exceptions inherit from the `Throwable` class. They are split into two major categories: **Checked Exceptions** (checked at compile-time, forcing you to handle them) and **Unchecked Exceptions** (runtime errors that are usually due to bad programming logic, like NullPointerException).',
        syntax: 'Throwable -> Exception -> RuntimeException (Unchecked)',
        codeExample: 'public class IntroDemo {\n    public static void main(String[] args) {\n        // This throws an Unchecked ArithmeticException\n        int result = 100 / 0; \n        System.out.println(result);\n    }\n}',
        codeOutput: 'Exception in thread "main" java.lang.ArithmeticException: / by zero',
        takeaways: [
          'Errors (like OutOfMemoryError) are also throwables, but they represent severe system failures that you should not try to catch.',
          'Checked exceptions must be explicitly caught or declared in the method signature.',
          'Unchecked exceptions inherit from RuntimeException.'
        ]
      },
      {
        id: 'm9-l2',
        title: 'Lesson 9.2 try-catch Block',
        objectives: [
          'Handle errors safely without crashing.',
          'Read exception stack traces.'
        ],
        theory: 'To prevent a program from crashing when an exception occurs, you wrap the risky code inside a `try` block. If an exception is thrown inside the try block, execution instantly jumps to the matching `catch` block, allowing you to handle the error gracefully and continue program execution.',
        syntax: 'try {\n    // Risky code\n} catch (ExceptionType e) {\n    // Handle error\n}',
        codeExample: 'public class CatchDemo {\n    public static void main(String[] args) {\n        try {\n            int[] numbers = {1, 2, 3};\n            System.out.println(numbers[5]); // Out of bounds\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Error: Index is invalid! Returning default.");\n        }\n        System.out.println("Program continues running...");\n    }\n}',
        codeOutput: 'Error: Index is invalid! Returning default.\nProgram continues running...',
        takeaways: [
          'You can chain multiple catch blocks together to handle different errors differently.',
          'Always catch the most specific exception first (e.g. FileNotFoundException) before general ones (e.g. Exception).',
          'The `e.getMessage()` and `e.printStackTrace()` methods are crucial for debugging.'
        ]
      },
      {
        id: 'm9-l3',
        title: 'Lesson 9.3 finally Block',
        objectives: [
          'Clean up system resources safely.',
          'Understand guaranteed execution paths.'
        ],
        theory: 'The `finally` block is attached after try-catch blocks. The code inside the finally block is guaranteed to execute regardless of whether an exception was thrown, whether it was caught, or even if the try block hit a `return` statement. It is exclusively used for cleaning up resources, like closing database connections or network sockets.',
        syntax: 'try { \n   // Code \n} catch (Exception e) { \n   // Handle \n} finally { \n   // Always runs \n}',
        codeExample: 'import java.util.Scanner;\n\npublic class FinallyDemo {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        try {\n            System.out.println("Reading data...");\n            // Simulated crash\n            int crash = 1 / 0;\n        } catch (Exception e) {\n            System.out.println("Caught an error.");\n        } finally {\n            scanner.close();\n            System.out.println("Scanner closed successfully.");\n        }\n    }\n}',
        codeOutput: 'Reading data...\nCaught an error.\nScanner closed successfully.',
        takeaways: [
          'The finally block runs even if a crash occurs that isn\'t caught by your catch block.',
          'The only time finally doesn\'t run is if you call System.exit(0) or the JVM crashes completely.',
          'In modern Java, "Try-with-resources" often replaces finally for auto-closing files.'
        ]
      },
      {
        id: 'm9-l4',
        title: 'Lesson 9.4 throw Keyword',
        objectives: [
          'Instantiate and throw exceptions manually.',
          'Enforce strict method inputs.'
        ],
        theory: 'Sometimes you want to manually trigger an exception if user input is invalid or a business rule is broken. You use the `throw` keyword followed by a `new` instance of an Exception class. This immediately stops the method\'s execution and hands the error back to the caller.',
        syntax: 'throw new IllegalArgumentException("Error message here");',
        codeExample: 'public class ThrowDemo {\n    public static void checkAge(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException("Access denied - You must be at least 18.");\n        }\n        System.out.println("Access granted.");\n    }\n\n    public static void main(String[] args) {\n        checkAge(15);\n    }\n}',
        codeOutput: 'Exception in thread "main" java.lang.IllegalArgumentException: Access denied - You must be at least 18.',
        takeaways: [
          'It is highly recommended to throw standard exceptions like IllegalArgumentException or IllegalStateException when inputs are bad.',
          'Throwing an exception acts somewhat like a `return` statement; code below the throw will not execute.',
          'You must instantiate the exception with the `new` keyword.'
        ]
      },
      {
        id: 'm9-l5',
        title: 'Lesson 9.5 throws Keyword',
        objectives: [
          'Delegate exception handling up the call stack.',
          'Satisfy compiler checks for Checked Exceptions.'
        ],
        theory: 'If a method executes code that might trigger a Checked Exception (like reading a file), but you don\'t want to handle it using try-catch inside that method, you must append the `throws` keyword to the method signature. This tells the compiler: "I am aware this might fail, but I am forcing whoever calls this method to handle the error."',
        syntax: 'public void readFile() throws IOException {\n    // Code that might throw IOException\n}',
        codeExample: 'import java.io.File;\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class ThrowsDemo {\n    // Delegating the error handling to main()\n    public static void openFile() throws IOException {\n        FileReader reader = new FileReader("missing.txt");\n    }\n\n    public static void main(String[] args) {\n        try {\n            openFile();\n        } catch (IOException e) {\n            System.out.println("File not found! Handled in main.");\n        }\n    }\n}',
        codeOutput: 'File not found! Handled in main.',
        takeaways: [
          'The `throw` keyword actually throws the object. The `throws` keyword is just a warning label on the method signature.',
          'You can declare multiple exceptions in a signature: `throws IOException, SQLException`.',
          'If the main method throws an exception, the program will crash.'
        ]
      },
      {
        id: 'm9-l6',
        title: 'Lesson 9.6 Custom Exceptions',
        objectives: [
          'Write highly specific domain exceptions.',
          'Extend existing Exception hierarchies.'
        ],
        theory: 'Standard exceptions (like IllegalArgumentException) are great, but sometimes you need an error name that exactly matches your business logic (e.g. `InsufficientFundsException`). You can create custom exceptions by simply creating a new class that `extends Exception` (for a checked exception) or `extends RuntimeException` (for unchecked).',
        syntax: 'public class CustomException extends Exception {\n    public CustomException(String msg) { super(msg); }\n}',
        codeExample: 'class InvalidPasswordException extends Exception {\n    public InvalidPasswordException(String message) {\n        super(message);\n    }\n}\n\npublic class CustomDemo {\n    public static void main(String[] args) {\n        try {\n            throw new InvalidPasswordException("Password must contain a number!");\n        } catch (InvalidPasswordException e) {\n            System.out.println("Security Error: " + e.getMessage());\n        }\n    }\n}',
        codeOutput: 'Security Error: Password must contain a number!',
        takeaways: [
          'Custom exceptions make your logs incredibly easy to read and debug.',
          'Always pass the error string to the super constructor using `super(message)`.',
          'Prefer extending RuntimeException unless you want to force other developers to write try-catch blocks.'
        ]
      }
    ],
    exercise: {
      title: 'Safe division with custom exceptions',
      description: 'Handle arithmetic and parsing failures, then define your own business exception.',
      instructions: ['Catch ArithmeticException for division by zero and NumberFormatException for bad input.', 'Order the catch blocks from most specific to most general.', 'Define InsufficientBalanceException extending RuntimeException and throw it from a withdraw method.'],
      starterCode: 'public class Solution {\n    static int safeDivide(String a, String b) {\n        // TODO: parse, divide, and handle both failure modes\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(safeDivide("10", "0"));\n    }\n}',
      expectedOutput: 'Cannot divide by zero. Returning 0.',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which block always runs, even if an exception is thrown?', options: ['A. try', 'B. catch', 'C. finally', 'D. throws'], correctAnswer: 'C. finally' },
      { id: 2, question: 'Which keyword declares exceptions in method headers?', options: ['A. throw', 'B. throws', 'C. try', 'D. declare'], correctAnswer: 'B. throws' },
      { id: 3, question: 'Which class serves as the parent to all exceptions?', options: ['A. Throwable', 'B. Object', 'C. Error', 'D. Compiler'], correctAnswer: 'A. Throwable' },
      { id: 4, question: 'Is NullPointerException checked or unchecked?', options: ['A. Checked', 'B. Unchecked', 'C. Error', 'D. Warning'], correctAnswer: 'B. Unchecked' },
      { id: 5, question: 'How do you create a custom checked exception?', options: ['A. Extend RuntimeException', 'B. Extend Exception', 'C. Extend Error', 'D. Implement Interface'], correctAnswer: 'B. Extend Exception' },
      { id: 6, question: 'Which class is the parent of all errors and exceptions?', options: ['A. Exception', 'B. Throwable', 'C. Error', 'D. RuntimeException'], correctAnswer: 'B. Throwable' },
      { id: 7, question: 'Which of these is a checked exception?', options: ['A. NullPointerException', 'B. IOException', 'C. ArithmeticException', 'D. ArrayIndexOutOfBoundsException'], correctAnswer: 'B. IOException' },
      { id: 8, question: 'Which of these is unchecked?', options: ['A. IOException', 'B. SQLException', 'C. NullPointerException', 'D. FileNotFoundException'], correctAnswer: 'C. NullPointerException' },
      { id: 9, question: 'When does a `finally` block execute?', options: ['A. Only on success', 'B. Only on exception', 'C. Almost always, whether or not an exception occurred', 'D. Never'], correctAnswer: 'C. Almost always, whether or not an exception occurred' },
      { id: 10, question: 'What is the difference between `throw` and `throws`?', options: ['A. throw raises an exception; throws declares one', 'B. They are identical', 'C. throws raises; throw declares', 'D. throw is for errors only'], correctAnswer: 'A. throw raises an exception; throws declares one' },
      { id: 11, question: 'In a multi-catch chain, which order is required?', options: ['A. Most general first', 'B. Most specific first', 'C. Any order', 'D. Alphabetical'], correctAnswer: 'B. Most specific first' },
      { id: 12, question: 'What does try-with-resources guarantee?', options: ['A. No exceptions occur', 'B. Declared AutoCloseable resources are closed', 'C. The code runs twice', 'D. Faster execution'], correctAnswer: 'B. Declared AutoCloseable resources are closed' },
      { id: 13, question: 'Which exception is thrown by dividing an int by zero?', options: ['A. ArithmeticException', 'B. NumberFormatException', 'C. NullPointerException', 'D. None, it returns Infinity'], correctAnswer: 'A. ArithmeticException' },
      { id: 14, question: 'What does `1.0 / 0` produce for doubles?', options: ['A. ArithmeticException', 'B. Infinity', 'C. 0', 'D. NaN'], correctAnswer: 'B. Infinity' },
      { id: 15, question: 'Which class should a custom business exception usually extend?', options: ['A. Error', 'B. Throwable', 'C. RuntimeException', 'D. Thread'], correctAnswer: 'C. RuntimeException' },
      { id: 16, question: 'What is thrown by `Integer.parseInt("abc")`?', options: ['A. NumberFormatException', 'B. ClassCastException', 'C. IOException', 'D. ParseException'], correctAnswer: 'A. NumberFormatException' },
      { id: 17, question: 'Should you catch `Error` (e.g. OutOfMemoryError)?', options: ['A. Yes, always', 'B. No, they signal unrecoverable JVM conditions', 'C. Only in main()', 'D. Only in finally'], correctAnswer: 'B. No, they signal unrecoverable JVM conditions' },
      { id: 18, question: 'What is wrong with an empty catch block?', options: ['A. Nothing', 'B. It silently swallows failures', 'C. It is a compile error', 'D. It rethrows automatically'], correctAnswer: 'B. It silently swallows failures' },
      { id: 19, question: 'Can a try block exist without catch?', options: ['A. No', 'B. Yes, if it has finally or is try-with-resources', 'C. Only in static methods', 'D. Only in interfaces'], correctAnswer: 'B. Yes, if it has finally or is try-with-resources' },
      { id: 20, question: 'What does exception chaining preserve?', options: ['A. The original cause of the failure', 'B. The stack size', 'C. The thread name', 'D. The class loader'], correctAnswer: 'A. The original cause of the failure' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a block of code reading file inputs that catches custom file errors.', language: 'java', starterCode: 'import java.io.*;\n\nclass FileFormatException extends RuntimeException {\n    FileFormatException(String message) { super(message); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Read a file with try-with-resources and handle IOException,\n        // then throw and catch your custom exception\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'What is the difference between the throw and throws keywords in Java exception handling?',
          options: [
            'A. throws is used to explicitly throw an exception; throw is used to declare exceptions in a method signature.',
            'B. throw is used to explicitly throw a single exception instance; throws is used in method signatures to declare exceptions that might be thrown.',
            'C. throw can only throw checked exceptions; throws can only throw unchecked exceptions.',
            'D. there is no functional difference; they can be used interchangeably.'
          ],
          correctAnswer: 'B. throw is used to explicitly throw a single exception instance; throws is used in method signatures to declare exceptions that might be thrown.'
        }
      ]
    }
  },
  m10: {
    id: 'm10',
    title: 'MODULE 10: COLLECTION FRAMEWORK',
    overview: 'Master data structures in Java: Lists, Sets, Maps, ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap, and Iterators.',
    outcomes: [
      'Choose appropriate Collection structures based on runtime requirements.',
      'Iterate over key-value maps.',
      'Differentiate HashSet vs TreeSet sorting.'
    ],
    lessons: [
      {
        id: 'm10-l1',
        title: 'Lesson 10.1 Introduction to Collections',
        objectives: [
          'Learn the Collections hierarchy.',
          'Understand when to use Lists, Sets, and Maps.'
        ],
        theory: 'The Java Collections Framework provides a unified architecture to store and manipulate groups of objects. Unlike standard Arrays which have a fixed size, Collections grow and shrink dynamically. The core interfaces are `List` (ordered data with duplicates), `Set` (unordered unique data), and `Map` (key-value pairs). Note that `Map` does not technically inherit from the `Collection` interface, but is considered part of the framework.',
        syntax: 'Collection<Type> col = new ImplementingClass<>();',
        codeExample: 'import java.util.Collection;\nimport java.util.ArrayList;\n\npublic class CollectionDemo {\n    public static void main(String[] args) {\n        Collection<String> items = new ArrayList<>();\n        items.add("Box");\n        System.out.println("Collection size: " + items.size());\n    }\n}',
        codeOutput: 'Collection size: 1',
        takeaways: [
          'Collections can only store Objects (like Integer, Double, String), NEVER primitives (like int, double).',
          'Use Lists for standard dynamic arrays, Sets to ensure uniqueness, and Maps for dictionary lookups.',
          'Always program to the interface (e.g. `List<String> = new ArrayList<>()`) for flexibility.'
        ]
      },
      {
        id: 'm10-l2',
        title: 'Lesson 10.2 ArrayList',
        objectives: [
          'Use highly performant dynamic arrays.',
          'Understand resizing mechanics.'
        ],
        theory: '`ArrayList` is the most popular implementation of the `List` interface. Under the hood, it is backed by a standard Array. When it gets full, it automatically creates a new array 50% larger and copies the data over. It maintains exact insertion order and allows infinite duplicate values. Reading data using an index is extremely fast (O(1)).',
        syntax: 'List<String> list = new ArrayList<>();\nlist.add("Java");\nlist.get(0);',
        codeExample: 'import java.util.ArrayList;\nimport java.util.List;\n\npublic class ArrayListDemo {\n    public static void main(String[] args) {\n        List<Integer> scores = new ArrayList<>();\n        scores.add(90);\n        scores.add(85);\n        scores.add(90); // Duplicates allowed\n        \n        scores.remove(1); // Removes 85\n        System.out.println("First item: " + scores.get(0));\n        System.out.println("Total items: " + scores.size());\n    }\n}',
        codeOutput: 'First item: 90\nTotal items: 2',
        takeaways: [
          'Retrieving data via index is lightning fast.',
          'Inserting or deleting elements in the *middle* of an ArrayList is slow because all subsequent elements must be shifted.',
          'Use .size() instead of .length to get item counts.'
        ]
      },
      {
        id: 'm10-l3',
        title: 'Lesson 10.3 LinkedList',
        objectives: [
          'Use doubly-linked structures.',
          'Contrast with ArrayList performance.'
        ],
        theory: 'A `LinkedList` also implements the `List` interface (and `Queue`), but instead of a contiguous array, it stores elements as independent "Nodes". Each node holds data and a memory pointer to both the previous and next nodes. This makes inserting or deleting data in the middle of the list extremely fast (O(1)), but randomly accessing data (e.g. `get(500)`) is very slow (O(N)) because it must walk the chain.',
        syntax: 'List<String> list = new LinkedList<>();',
        codeExample: 'import java.util.LinkedList;\n\npublic class LinkedDemo {\n    public static void main(String[] args) {\n        LinkedList<String> tasks = new LinkedList<>();\n        tasks.add("Design");\n        tasks.add("Code");\n        tasks.addFirst("Plan"); // Specific LinkedList method\n        tasks.addLast("Test");\n        \n        System.out.println(tasks);\n    }\n}',
        codeOutput: '[Plan, Design, Code, Test]',
        takeaways: [
          'Use LinkedList when your application requires constant data insertions and removals from the middle of the list.',
          'Use ArrayList if your application requires heavy reading and very little modifying.',
          'LinkedList consumes more memory per item because of the node pointers.'
        ]
      },
      {
        id: 'm10-l4',
        title: 'Lesson 10.4 HashSet',
        objectives: [
          'Store universally unique elements.',
          'Understand HashMap backing.'
        ],
        theory: 'A `HashSet` implements the `Set` interface, which strictly prohibits duplicate values. If you try to add a duplicate, it is quietly ignored. Under the hood, it is actually backed by a HashMap. It provides insanely fast O(1) performance for adding and checking if an element exists, but it completely destroys the insertion order (items will appear randomly).',
        syntax: 'Set<String> set = new HashSet<>();\nset.add("Unique");',
        codeExample: 'import java.util.HashSet;\nimport java.util.Set;\n\npublic class HashSetDemo {\n    public static void main(String[] args) {\n        Set<String> emails = new HashSet<>();\n        emails.add("a@test.com");\n        emails.add("b@test.com");\n        boolean isAdded = emails.add("a@test.com"); // Duplicate ignored\n        \n        System.out.println("Emails count: " + emails.size());\n        System.out.println("Duplicate was added: " + isAdded);\n    }\n}',
        codeOutput: 'Emails count: 2\nDuplicate was added: false',
        takeaways: [
          'Perfect for removing duplicates from an existing list.',
          'Do not use HashSet if you need elements returned in the exact order you added them (use LinkedHashSet instead).',
          'Custom objects stored in a HashSet MUST properly override the hashCode() and equals() methods.'
        ]
      },
      {
        id: 'm10-l5',
        title: 'Lesson 10.5 TreeSet',
        objectives: [
          'Maintain naturally sorted Sets.',
          'Understand Red-Black tree mechanics.'
        ],
        theory: 'A `TreeSet` is a Set that guarantees elements will be strictly sorted in their natural ascending order (e.g., A-Z for Strings, 1-100 for numbers). It does this by using a balanced Red-Black tree data structure under the hood. Because it must re-sort the tree every time you add an item, insertions and lookups are slightly slower (O(log N)) than a HashSet.',
        syntax: 'Set<Integer> sorted = new TreeSet<>();',
        codeExample: 'import java.util.TreeSet;\nimport java.util.Set;\n\npublic class TreeSetDemo {\n    public static void main(String[] args) {\n        Set<Integer> numbers = new TreeSet<>();\n        numbers.add(50);\n        numbers.add(10);\n        numbers.add(99);\n        numbers.add(25);\n        \n        // Automatically prints in sorted order\n        System.out.println("Sorted: " + numbers);\n    }\n}',
        codeOutput: 'Sorted: [10, 25, 50, 99]',
        takeaways: [
          'Does not allow duplicate values.',
          'Objects added to a TreeSet must implement the Comparable interface, or you must provide a custom Comparator.',
          'TreeSet is slower than HashSet, use it only when sorting is strictly required.'
        ]
      },
      {
        id: 'm10-l6',
        title: 'Lesson 10.6 HashMap',
        objectives: [
          'Store and retrieve Key-Value dictionary pairs.',
          'Understand hashing performance.'
        ],
        theory: 'A `HashMap` stores data in Key-Value pairs, acting like a dictionary. You look up a "Value" by asking for its unique "Key". Keys MUST be absolutely unique (adding a duplicate key overwrites the old value), but Values can be duplicated infinitely. HashMaps use a hashing algorithm to provide instant O(1) lookups, making them one of the most powerful data structures in Java.',
        syntax: 'Map<KeyType, ValueType> map = new HashMap<>();\nmap.put(key, value);\nmap.get(key);',
        codeExample: 'import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashMapDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> directory = new HashMap<>();\n        directory.put("Alice", 5551234);\n        directory.put("Bob", 5559999);\n        \n        // Look up by Key\n        System.out.println("Alice Phone: " + directory.get("Alice"));\n        \n        // Overwriting a key\n        directory.put("Alice", 1110000);\n        System.out.println("Alice New Phone: " + directory.get("Alice"));\n    }\n}',
        codeOutput: 'Alice Phone: 5551234\nAlice New Phone: 1110000',
        takeaways: [
          'HashMap does not guarantee any order of the keys.',
          'It allows exactly one null key, and infinite null values.',
          'Keys are hashed to determine their exact memory bucket; custom objects used as keys must override hashCode().'
        ]
      },
      {
        id: 'm10-l7',
        title: 'Lesson 10.7 TreeMap',
        objectives: [
          'Store sorted Maps.',
          'Iterate over alphabetized dictionaries.'
        ],
        theory: 'A `TreeMap` is identical to a HashMap in that it stores Key-Value pairs, but it automatically sorts all the entries based on the natural order of the Keys. Just like TreeSet, it uses a Red-Black tree under the hood, meaning operations operate at O(log N) speeds instead of O(1).',
        syntax: 'Map<String, Integer> map = new TreeMap<>();',
        codeExample: 'import java.util.TreeMap;\nimport java.util.Map;\n\npublic class TreeMapDemo {\n    public static void main(String[] args) {\n        Map<String, String> states = new TreeMap<>();\n        states.put("TX", "Texas");\n        states.put("CA", "California");\n        states.put("NY", "New York");\n        \n        // Prints alphabetically by Key (CA, NY, TX)\n        System.out.println("Sorted map: " + states);\n    }\n}',
        codeOutput: 'Sorted map: {CA=California, NY=New York, TX=Texas}',
        takeaways: [
          'Keys must be comparable (like Strings or Integers) so the map knows how to sort them.',
          'Does NOT allow null keys, as it cannot compare null to other values.',
          'Use only when you absolutely need to iterate over your dictionary in alphabetical/numerical order.'
        ]
      },
      {
        id: 'm10-l8',
        title: 'Lesson 10.8 Iterator',
        objectives: [
          'Traverse collections safely.',
          'Avoid ConcurrentModificationException.'
        ],
        theory: 'An `Iterator` is an object that allows you to traverse through a collection safely. If you try to remove an item from an ArrayList using a standard `for-each` loop, Java will immediately crash with a `ConcurrentModificationException`. Iterators solve this by tracking the state safely and providing a special `remove()` method.',
        syntax: 'Iterator<String> it = list.iterator();\nwhile(it.hasNext()) {\n    String s = it.next();\n    it.remove();\n}',
        codeExample: 'import java.util.ArrayList;\nimport java.util.Iterator;\nimport java.util.List;\n\npublic class IteratorDemo {\n    public static void main(String[] args) {\n        List<String> names = new ArrayList<>();\n        names.add("Alice");\n        names.add("Bob");\n        \n        Iterator<String> it = names.iterator();\n        while (it.hasNext()) {\n            String current = it.next();\n            if (current.equals("Alice")) {\n                it.remove(); // Safely deletes Alice\n            }\n        }\n        System.out.println("Remaining: " + names);\n    }\n}',
        codeOutput: 'Remaining: [Bob]',
        takeaways: [
          'You must call it.next() before you can call it.remove().',
          'Modern Java (8+) often replaces Iterators with `list.removeIf(condition)` lambda expressions for cleaner syntax.',
          'Maps do not have Iterators directly; you must iterate over `map.keySet()` or `map.entrySet()`.'
        ]
      }
    ],
    exercise: {
      title: 'Word frequency counter',
      description: 'Count word occurrences with a HashMap, then sort the results by frequency.',
      instructions: ['Split the sentence on whitespace and normalise to lowercase.', 'Use merge() or getOrDefault() to accumulate counts.', 'Sort the entry set by value descending and print the top three.'],
      starterCode: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        String text = "the quick brown fox jumps over the lazy dog the fox";\n        // TODO: count words and print the three most frequent\n    }\n}',
      expectedOutput: 'the=3, fox=2, quick=1',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which collection does not allow duplicate values?', options: ['A. ArrayList', 'B. LinkedList', 'C. HashSet', 'D. Vector'], correctAnswer: 'C. HashSet' },
      { id: 2, question: 'Which class maps key-value pairs with O(1) lookup?', options: ['A. TreeSet', 'B. HashMap', 'C. ArrayList', 'D. TreeMap'], correctAnswer: 'B. HashMap' },
      { id: 3, question: 'Which Set is sorted automatically?', options: ['A. HashSet', 'B. LinkedHashSet', 'C. TreeSet', 'D. VectorSet'], correctAnswer: 'C. TreeSet' },
      { id: 4, question: 'How do you check if a map contains a key?', options: ['A. map.hasKey()', 'B. map.containsKey()', 'C. map.find()', 'D. map.get()'], correctAnswer: 'B. map.containsKey()' },
      { id: 5, question: 'What exception is thrown when modifying collections during simple loop iteration?', options: ['A. NullPointerException', 'B. ConcurrentModificationException', 'C. IndexOutOfBoundsException', 'D. CollectionException'], correctAnswer: 'B. ConcurrentModificationException' },
      { id: 6, question: 'Which interface does NOT allow duplicate elements?', options: ['A. List', 'B. Set', 'C. Queue', 'D. Collection'], correctAnswer: 'B. Set' },
      { id: 7, question: 'Which implementation gives O(1) average lookup by key?', options: ['A. TreeMap', 'B. HashMap', 'C. LinkedList', 'D. ArrayList'], correctAnswer: 'B. HashMap' },
      { id: 8, question: 'Which Map implementation keeps keys sorted?', options: ['A. HashMap', 'B. LinkedHashMap', 'C. TreeMap', 'D. Hashtable'], correctAnswer: 'C. TreeMap' },
      { id: 9, question: 'Which Map preserves insertion order?', options: ['A. HashMap', 'B. TreeMap', 'C. LinkedHashMap', 'D. Hashtable'], correctAnswer: 'C. LinkedHashMap' },
      { id: 10, question: 'Does Map extend Collection?', options: ['A. Yes', 'B. No, it is a separate hierarchy', 'C. Only TreeMap does', 'D. Only in Java 8+'], correctAnswer: 'B. No, it is a separate hierarchy' },
      { id: 11, question: 'What is the time complexity of ArrayList.get(i)?', options: ['A. O(1)', 'B. O(n)', 'C. O(log n)', 'D. O(n log n)'], correctAnswer: 'A. O(1)' },
      { id: 12, question: 'What is the complexity of LinkedList.get(i)?', options: ['A. O(1)', 'B. O(n)', 'C. O(log n)', 'D. O(1) amortised'], correctAnswer: 'B. O(n)' },
      { id: 13, question: 'Which two methods must you override together for correct HashMap behaviour?', options: ['A. toString() and equals()', 'B. equals() and hashCode()', 'C. compareTo() and equals()', 'D. clone() and hashCode()'], correctAnswer: 'B. equals() and hashCode()' },
      { id: 14, question: 'What happens if you put a key with an equal hashCode but unequal equals()?', options: ['A. It replaces the existing entry', 'B. Both are stored in the same bucket', 'C. Compile error', 'D. The map is cleared'], correctAnswer: 'B. Both are stored in the same bucket' },
      { id: 15, question: 'What exception is thrown by modifying a collection while iterating it with a for-each?', options: ['A. ConcurrentModificationException', 'B. IllegalStateException', 'C. UnsupportedOperationException', 'D. NoSuchElementException'], correctAnswer: 'A. ConcurrentModificationException' },
      { id: 16, question: 'Which method safely removes during iteration?', options: ['A. list.remove()', 'B. iterator.remove()', 'C. list.clear()', 'D. collection.removeAll()'], correctAnswer: 'B. iterator.remove()' },
      { id: 17, question: 'Which collection is a thread-safe Map for concurrent use?', options: ['A. HashMap', 'B. TreeMap', 'C. ConcurrentHashMap', 'D. LinkedHashMap'], correctAnswer: 'C. ConcurrentHashMap' },
      { id: 18, question: 'What does `Arrays.asList()` return?', options: ['A. A fully mutable ArrayList', 'B. A fixed-size list backed by the array', 'C. An immutable copy', 'D. A Set'], correctAnswer: 'B. A fixed-size list backed by the array' },
      { id: 19, question: 'Which interface must a class implement to define natural ordering?', options: ['A. Comparator', 'B. Comparable', 'C. Iterable', 'D. Cloneable'], correctAnswer: 'B. Comparable' },
      { id: 20, question: 'What does a Set implementation use to detect duplicates?', options: ['A. toString()', 'B. equals() and hashCode()', 'C. The index', 'D. compareTo() only'], correctAnswer: 'B. equals() and hashCode()' }
    ],
    assignment: {
      prompts: [
        { 
          kind: 'code', 
          prompt: 'Write a program to remove duplicates from an ArrayList using a Set.', 
          language: 'java', 
          starterCode: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(List.of(3, 1, 3, 7, 1, 9, 7));\n        // Remove duplicates using a Set, then print the result\n    }\n}',
          examples: [
            { input: 'nums = {3, 1, 3, 7, 1, 9, 7}', output: '9' }
          ]
        },
        {
          kind: 'mcq',
          prompt: 'When would you choose a TreeMap over a HashMap in Java?',
          options: [
            'A. When you need constant-time O(1) performance for basic operations.',
            'B. When you need the keys to be maintained in a sorted order.',
            'C. When you need to allow null keys and null values.',
            'D. When memory footprint is your primary concern.'
          ],
          correctAnswer: 'B. When you need the keys to be maintained in a sorted order.'
        }
      ]
    }
  },
  m11: {
    id: 'm11',
    title: 'MODULE 11: FILE HANDLING',
    overview: 'Learn reading, writing, file structures, BufferedReader, and BufferedWriter configurations in Java.',
    outcomes: [
      'Write text strings directly to disk files.',
      'Parse large files using BufferedReader.',
      'Manage system resources using Try-with-resources.'
    ],
    lessons: [
      {
        "id": "m11-l1",
        "title": "Lesson 11.1 Introduction to Files",
        "objectives": [
          "Understand streams and the java.io package.",
          "Inspect and create files with the File class."
        ],
        "theory": "File handling lets a program keep data after it exits. Java models all input and output as **streams** — ordered sequences of data flowing to or from a source.\n\nThere are two families:\n\n- **Byte streams** (`InputStream` / `OutputStream`) move raw 8-bit data. Use these for images, PDFs, and any binary format.\n- **Character streams** (`Reader` / `Writer`) move text and handle character encoding for you. Use these for `.txt`, `.csv`, `.json`.\n\nThe `java.io.File` class does **not** hold file contents. It is a handle describing a *path*, which may or may not point at something that exists. You use it to test existence, read metadata, create empty files, and delete them.\n\nModern Java also offers `java.nio.file.Path` and `Files`, which are more capable; `File` remains the gentlest introduction and is still ubiquitous in existing codebases.",
        "syntax": "File file = new File(\"data/notes.txt\");\nboolean created = file.createNewFile();\nboolean exists  = file.exists();",
        "codeExample": "import java.io.File;\nimport java.io.IOException;\n\npublic class FileIntro {\n    public static void main(String[] args) {\n        File file = new File(\"notes.txt\");\n\n        try {\n            if (file.createNewFile()) {\n                System.out.println(\"Created: \" + file.getName());\n            } else {\n                System.out.println(\"Already exists: \" + file.getName());\n            }\n\n            System.out.println(\"Absolute path : \" + file.getAbsolutePath());\n            System.out.println(\"Writable      : \" + file.canWrite());\n            System.out.println(\"Size in bytes : \" + file.length());\n\n        } catch (IOException e) {\n            System.out.println(\"I/O error: \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Created: notes.txt\nAbsolute path : /home/user/project/notes.txt\nWritable      : true\nSize in bytes : 0",
        "mistakes": [
          "Assuming `new File(\"x.txt\")` creates the file. It only creates the *object*; `createNewFile()` touches the disk.",
          "Using relative paths and being surprised by the location — they resolve against the JVM working directory, not the source folder.",
          "Forgetting that every file operation can throw `IOException`, a checked exception you must handle or declare."
        ],
        "takeaways": [
          "Byte streams for binary data, character streams for text.",
          "`File` represents a path, not content.",
          "All of java.io is checked-exception based: wrap calls in try-catch or declare `throws IOException`."
        ]
      },
      {
        "id": "m11-l2",
        "title": "Lesson 11.2 Reading Files",
        "objectives": [
          "Read a text file with FileReader and Scanner.",
          "Handle the end-of-file signal correctly."
        ],
        "theory": "`FileReader` is the simplest character-stream reader. Its `read()` method returns the next character as an `int`, and returns **-1** when the stream is exhausted. That `-1` sentinel is why the return type is `int` rather than `char` — every real char value is non-negative, so -1 can unambiguously mean \"end of file\".\n\nReading one character at a time works but hits the disk constantly, so it is slow for anything sizeable. For line-oriented text most developers reach for `Scanner`, which offers the familiar `hasNextLine()` / `nextLine()` pair, or `BufferedReader` (covered in Lesson 11.4) when throughput matters.\n\nWhatever you use, the stream holds an operating-system file handle. Leaking handles will eventually exhaust the OS limit, so closing is mandatory.",
        "syntax": "FileReader reader = new FileReader(\"notes.txt\");\nint ch;\nwhile ((ch = reader.read()) != -1) { ... }\nreader.close();",
        "codeExample": "import java.io.File;\nimport java.io.FileReader;\nimport java.io.FileNotFoundException;\nimport java.io.IOException;\nimport java.util.Scanner;\n\npublic class ReadingFiles {\n    public static void main(String[] args) {\n        // Approach 1: character-by-character with FileReader\n        try (FileReader reader = new FileReader(\"notes.txt\")) {\n            int ch;\n            while ((ch = reader.read()) != -1) {\n                System.out.print((char) ch);\n            }\n        } catch (IOException e) {\n            System.out.println(\"Read failed: \" + e.getMessage());\n        }\n\n        // Approach 2: line-by-line with Scanner\n        try (Scanner scanner = new Scanner(new File(\"notes.txt\"))) {\n            int lineNumber = 1;\n            while (scanner.hasNextLine()) {\n                System.out.println(lineNumber++ + \": \" + scanner.nextLine());\n            }\n        } catch (FileNotFoundException e) {\n            System.out.println(\"File not found.\");\n        }\n    }\n}",
        "codeOutput": "Hello Java\nFile handling is useful\n1: Hello Java\n2: File handling is useful",
        "mistakes": [
          "Declaring the loop variable as `char` — the -1 sentinel then wraps around and the loop never terminates.",
          "Calling `nextLine()` without first checking `hasNextLine()`, which throws `NoSuchElementException` at the end of the file.",
          "Not closing the reader, leaking OS file handles."
        ],
        "takeaways": [
          "`read()` returns `int`; -1 means end of stream.",
          "`Scanner` is convenient for line-based reads, `FileReader` for raw character access.",
          "Always close streams — ideally with try-with-resources."
        ]
      },
      {
        "id": "m11-l3",
        "title": "Lesson 11.3 Writing Files",
        "objectives": [
          "Write text with FileWriter.",
          "Choose between overwrite and append mode.",
          "Understand flushing."
        ],
        "theory": "`FileWriter` sends characters to a file. Two details decide whether it behaves the way you expect.\n\n**Mode.** `new FileWriter(\"log.txt\")` **truncates** the file to zero length the moment it is opened — existing content is gone. Passing `true` as a second argument (`new FileWriter(\"log.txt\", true)`) opens it in **append** mode instead, adding to the end. Truncating a log file by accident is one of the most common beginner mistakes in Java I/O.\n\n**Buffering.** Writes are held in memory and only pushed to disk when the buffer fills, when you call `flush()`, or when you `close()`. If your program exits without closing, the buffered text is silently lost. Closing implies a flush, which is one more reason try-with-resources is the right default.\n\nUse `System.lineSeparator()` rather than a hard-coded `\\n` if the file must be portable across Windows and Unix.",
        "syntax": "FileWriter writer = new FileWriter(\"log.txt\", true); // true = append\nwriter.write(\"text\");\nwriter.close();  // flushes automatically",
        "codeExample": "import java.io.FileWriter;\nimport java.io.IOException;\n\npublic class WritingFiles {\n    public static void main(String[] args) {\n        // Overwrite mode: wipes any existing content\n        try (FileWriter writer = new FileWriter(\"report.txt\")) {\n            writer.write(\"Quarterly Report\\n\");\n            writer.write(\"================\\n\");\n            writer.write(\"Revenue: 1,250,000\\n\");\n            System.out.println(\"Report written.\");\n        } catch (IOException e) {\n            System.out.println(\"Write failed: \" + e.getMessage());\n        }\n\n        // Append mode: adds to the end, keeps existing content\n        try (FileWriter appender = new FileWriter(\"report.txt\", true)) {\n            appender.write(\"Growth: 12.4%\" + System.lineSeparator());\n            System.out.println(\"Footer appended.\");\n        } catch (IOException e) {\n            System.out.println(\"Append failed: \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Report written.\nFooter appended.",
        "mistakes": [
          "Forgetting the `true` append flag and silently destroying an existing file.",
          "Never calling `close()` or `flush()`, so buffered output never reaches disk.",
          "Hard-coding `\\n` in files that Windows tools will open — use `System.lineSeparator()`."
        ],
        "takeaways": [
          "One-argument `FileWriter` truncates; the two-argument form with `true` appends.",
          "Output is buffered — `close()` flushes it for you.",
          "`write()` accepts a String, a char array, or a single int character code."
        ]
      },
      {
        "id": "m11-l4",
        "title": "Lesson 11.4 BufferedReader",
        "objectives": [
          "Wrap a Reader for efficient line-based input.",
          "Compare BufferedReader with Scanner."
        ],
        "theory": "`BufferedReader` is a **decorator**: it wraps another `Reader` and adds an in-memory buffer, typically 8 KB. Instead of one system call per character, it fetches a large block at a time and serves your reads from memory. On a large file this is routinely an order of magnitude faster than a bare `FileReader`.\n\nIts headline method is `readLine()`, which returns the next line without its terminator, or `null` at end of file. Note the sentinel differs from `read()`: **`null`, not -1**.\n\n`BufferedReader` versus `Scanner`:\n\n- `BufferedReader` is faster, has a bigger buffer, and is synchronised (thread-safe).\n- `Scanner` parses — `nextInt()`, `nextDouble()` — and splits on regex, but is slower and not thread-safe.\n\nFor bulk reading of lines, `BufferedReader` wins. For interactive parsing of mixed types, `Scanner` is more convenient.",
        "syntax": "BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) { ... }",
        "codeExample": "import java.io.BufferedReader;\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class BufferedReaderDemo {\n    public static void main(String[] args) {\n        try (BufferedReader br = new BufferedReader(new FileReader(\"employees.csv\"))) {\n\n            String header = br.readLine();  // consume the header row\n            System.out.println(\"Columns: \" + header);\n\n            String line;\n            int count = 0;\n            double totalSalary = 0;\n\n            while ((line = br.readLine()) != null) {\n                String[] parts = line.split(\",\");\n                String name = parts[0];\n                double salary = Double.parseDouble(parts[1]);\n\n                totalSalary += salary;\n                count++;\n                System.out.println(name + \" earns \" + salary);\n            }\n\n            System.out.println(\"Average salary: \" + (totalSalary / count));\n\n        } catch (IOException e) {\n            System.out.println(\"Error reading file: \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Columns: name,salary\nAsha earns 82000.0\nRavi earns 74000.0\nMeera earns 91000.0\nAverage salary: 82333.33333333333",
        "mistakes": [
          "Testing `readLine() != -1`. The end-of-file sentinel for `readLine()` is `null`.",
          "Calling `readLine()` twice inside one loop iteration, which silently skips every other line.",
          "Assuming `readLine()` keeps the newline character — it strips it."
        ],
        "takeaways": [
          "`BufferedReader` wraps another Reader and buffers it for speed.",
          "`readLine()` returns `null` at end of file.",
          "Prefer `BufferedReader` for large files, `Scanner` for typed parsing."
        ]
      },
      {
        "id": "m11-l5",
        "title": "Lesson 11.5 BufferedWriter",
        "objectives": [
          "Wrap a Writer for efficient output.",
          "Use newLine() for portable line endings.",
          "Apply try-with-resources to I/O."
        ],
        "theory": "`BufferedWriter` is the output counterpart to `BufferedReader`. It wraps a `Writer` and accumulates characters in memory, issuing one disk write per full buffer instead of one per call. Writing ten thousand short lines through a bare `FileWriter` means ten thousand system calls; through a `BufferedWriter` it means a handful.\n\nIt adds `newLine()`, which emits the platform's correct line separator — `\\r\\n` on Windows, `\\n` on Linux and macOS — so your files stay portable without you thinking about it.\n\nBecause output sits in the buffer until flushed, **closing is not optional**. `try-with-resources` is the right tool: any object implementing `AutoCloseable` declared in the parentheses is closed automatically when the block exits, even if an exception is thrown. Resources are closed in reverse order of declaration, so wrapping `new BufferedWriter(new FileWriter(...))` in a single declaration correctly closes the buffer first and the underlying file second.",
        "syntax": "try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\", true))) {\n    bw.write(\"line\");\n    bw.newLine();\n}   // flushed and closed automatically",
        "codeExample": "import java.io.BufferedWriter;\nimport java.io.FileWriter;\nimport java.io.IOException;\n\npublic class BufferedWriterDemo {\n    public static void main(String[] args) {\n        String[] transactions = {\n            \"TXN001,DEPOSIT,5000\",\n            \"TXN002,WITHDRAW,1200\",\n            \"TXN003,DEPOSIT,3400\"\n        };\n\n        // try-with-resources: no explicit close(), no leak on exception\n        try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"ledger.csv\"))) {\n\n            bw.write(\"id,type,amount\");\n            bw.newLine();\n\n            for (String txn : transactions) {\n                bw.write(txn);\n                bw.newLine();\n            }\n\n            System.out.println(\"Wrote \" + transactions.length + \" transactions.\");\n\n        } catch (IOException e) {\n            System.out.println(\"Write failed: \" + e.getMessage());\n        }\n\n        // Appending an audit line later\n        try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"ledger.csv\", true))) {\n            bw.write(\"# audited\");\n            bw.newLine();\n            System.out.println(\"Audit marker appended.\");\n        } catch (IOException e) {\n            System.out.println(\"Append failed: \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Wrote 3 transactions.\nAudit marker appended.",
        "mistakes": [
          "Exiting without closing, so the buffer is discarded and the file ends up empty.",
          "Using `write(\"\\n\")` instead of `newLine()`, producing files that look like one long line in Windows Notepad.",
          "Declaring the resource *outside* the try parentheses — it is then not managed and will not be auto-closed."
        ],
        "takeaways": [
          "`BufferedWriter` batches writes; always close it to flush.",
          "`newLine()` writes the platform-correct separator.",
          "try-with-resources closes every declared `AutoCloseable` in reverse order, even when an exception is thrown."
        ]
      }
    ],
    exercise: {
      title: 'CSV reader and writer',
      description: 'Write records to a CSV with BufferedWriter, then read them back with BufferedReader.',
      instructions: ['Write a header row followed by three data rows, using newLine() rather than "\\n".', 'Wrap both streams in try-with-resources so they always close.', 'Read the file back, skip the header, and compute the average of the numeric column.'],
      starterCode: 'import java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: write ledger.csv, then read it back and average the amounts\n    }\n}',
      expectedOutput: 'Wrote 3 rows\nAverage amount: 3200.0',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which class reads files line by line?', options: ['A. FileReader', 'B. BufferedReader', 'C. Scanner', 'D. FileInputStream'], correctAnswer: 'B. BufferedReader' },
      { id: 2, question: 'Which construct automatically closes resources?', options: ['A. try catch finally', 'B. Try-with-resources', 'C. garbage collection', 'D. finalize()'], correctAnswer: 'B. Try-with-resources' },
      { id: 3, question: 'How do you check if a file exists?', options: ['A. file.has()', 'B. file.exists()', 'C. file.check()', 'D. file.load()'], correctAnswer: 'B. file.exists()' },
      { id: 4, question: 'Which FileWriter constructor appends text to an existing file?', options: ['A. new FileWriter("file.txt")', 'B. new FileWriter("file.txt", true)', 'C. new FileWriter("file.txt", "append")', 'D. new FileWriter(true)'], correctAnswer: 'B. new FileWriter("file.txt", true)' },
      { id: 5, question: 'Which package contains File handling classes?', options: ['A. java.util', 'B. java.lang', 'C. java.io', 'D. java.net'], correctAnswer: 'C. java.io' },
      { id: 6, question: 'Which stream family should you use for binary data such as images?', options: ['A. Reader/Writer', 'B. InputStream/OutputStream', 'C. Scanner', 'D. BufferedReader'], correctAnswer: 'B. InputStream/OutputStream' },
      { id: 7, question: 'What does `FileReader.read()` return at end of file?', options: ['A. 0', 'B. null', 'C. -1', 'D. It throws EOFException'], correctAnswer: 'C. -1' },
      { id: 8, question: 'What does `BufferedReader.readLine()` return at end of file?', options: ['A. -1', 'B. null', 'C. ""', 'D. It throws'], correctAnswer: 'B. null' },
      { id: 9, question: 'Which FileWriter constructor appends instead of overwriting?', options: ['A. new FileWriter(path)', 'B. new FileWriter(path, true)', 'C. new FileWriter(path, "append")', 'D. FileWriter.append(path)'], correctAnswer: 'B. new FileWriter(path, true)' },
      { id: 10, question: 'What does `new File("x.txt")` actually do?', options: ['A. Creates the file on disk', 'B. Creates only an object representing a path', 'C. Opens a stream', 'D. Deletes the file'], correctAnswer: 'B. Creates only an object representing a path' },
      { id: 11, question: 'Which method actually creates an empty file on disk?', options: ['A. file.create()', 'B. file.createNewFile()', 'C. file.mkdir()', 'D. file.write()'], correctAnswer: 'B. file.createNewFile()' },
      { id: 12, question: 'Why is BufferedWriter faster than a bare FileWriter?', options: ['A. It compresses data', 'B. It batches writes in memory before hitting disk', 'C. It uses multiple threads', 'D. It skips validation'], correctAnswer: 'B. It batches writes in memory before hitting disk' },
      { id: 13, question: 'What does `BufferedWriter.newLine()` write?', options: ['A. Always \\n', 'B. The platform-specific line separator', 'C. Always \\r\\n', 'D. A space'], correctAnswer: 'B. The platform-specific line separator' },
      { id: 14, question: 'What happens if you never close a BufferedWriter?', options: ['A. Nothing', 'B. Buffered data may never reach disk', 'C. The file is deleted', 'D. It throws immediately'], correctAnswer: 'B. Buffered data may never reach disk' },
      { id: 15, question: 'In what order does try-with-resources close resources?', options: ['A. Declaration order', 'B. Reverse declaration order', 'C. Random', 'D. Alphabetical'], correctAnswer: 'B. Reverse declaration order' },
      { id: 16, question: 'What interface must a class implement to be used in try-with-resources?', options: ['A. Serializable', 'B. AutoCloseable', 'C. Runnable', 'D. Comparable'], correctAnswer: 'B. AutoCloseable' },
      { id: 17, question: 'Which checked exception do most java.io operations throw?', options: ['A. IOException', 'B. RuntimeException', 'C. SQLException', 'D. FileException'], correctAnswer: 'A. IOException' },
      { id: 18, question: 'Why must the loop variable for `read()` be an `int` rather than a `char`?', options: ['A. Performance', 'B. So the -1 end-of-stream sentinel can be represented', 'C. Convention only', 'D. To support Unicode'], correctAnswer: 'B. So the -1 end-of-stream sentinel can be represented' },
      { id: 19, question: 'Which is generally faster for reading many lines?', options: ['A. Scanner', 'B. BufferedReader', 'C. FileReader alone', 'D. They are identical'], correctAnswer: 'B. BufferedReader' },
      { id: 20, question: 'Against what does a relative file path resolve?', options: ['A. The source folder', 'B. The JVM working directory', 'C. The user home directory', 'D. The classpath root'], correctAnswer: 'B. The JVM working directory' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a program that copies the contents of source.txt to destination.txt using Try-with-resources.', language: 'java', starterCode: 'import java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write lines to a file, then read them back and print them\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'What is the primary benefit of wrapping a FileReader inside a BufferedReader in Java I/O?',
          options: [
            'A. It allows reading binary files (like images) instead of text files.',
            'B. It automatically compresses the file content as it reads it.',
            'C. It buffers input for efficient reading, reducing the number of costly system/disk read operations.',
            'D. It encrypts the stream for secure file reading.'
          ],
          correctAnswer: 'C. It buffers input for efficient reading, reducing the number of costly system/disk read operations.'
        }
      ]
    }
  },
  m12: {
    id: 'm12',
    title: 'MODULE 12: MULTITHREADING',
    overview: 'Learn multithreaded systems execution. Differentiate Thread class, Runnable interface, thread synchronization, and thread pools.',
    outcomes: [
      'Create concurrent threads of execution.',
      'Synchronize critical sections to prevent data races.',
      'Use thread pools to manage threads.'
    ],
    lessons: [
      {
        "id": "m12-l1",
        "title": "Lesson 12.1 Introduction to Threads",
        "objectives": [
          "Distinguish processes from threads.",
          "Understand concurrency versus parallelism."
        ],
        "theory": "A **process** is a running program with its own isolated memory. A **thread** is a unit of execution *inside* a process. Every Java program starts with one thread, called `main`.\n\nAll threads in a process share the same heap — the same objects — which is what makes threading both powerful and dangerous. Sharing is free, but two threads touching the same field at the same time is a bug waiting to happen.\n\n**Concurrency** means several tasks are in progress over the same period, interleaved by the scheduler. **Parallelism** means they literally execute at the same instant on different CPU cores. A single-core machine can be concurrent but never parallel.\n\nThreading pays off in two situations: keeping a UI or server responsive while slow I/O is pending, and splitting CPU-bound work across cores. It is not free — each thread costs roughly 1 MB of stack, and context switching has overhead.",
        "syntax": "Thread current = Thread.currentThread();\nSystem.out.println(current.getName());",
        "codeExample": "public class ThreadIntro {\n    public static void main(String[] args) {\n        Thread main = Thread.currentThread();\n\n        System.out.println(\"Thread name     : \" + main.getName());\n        System.out.println(\"Priority        : \" + main.getPriority());\n        System.out.println(\"Is alive        : \" + main.isAlive());\n        System.out.println(\"Available cores : \" + Runtime.getRuntime().availableProcessors());\n\n        main.setName(\"primary-worker\");\n        System.out.println(\"Renamed to      : \" + main.getName());\n    }\n}",
        "codeOutput": "Thread name     : main\nPriority        : 5\nIs alive        : true\nAvailable cores : 8\nRenamed to      : primary-worker",
        "mistakes": [
          "Assuming more threads always means faster. Beyond the core count, CPU-bound work just adds context-switching overhead.",
          "Confusing concurrency with parallelism in interviews — they are related but distinct."
        ],
        "takeaways": [
          "Threads share heap memory but each has its own call stack.",
          "Every Java program has a `main` thread.",
          "Priority is a hint to the scheduler, never a guarantee of ordering."
        ]
      },
      {
        "id": "m12-l2",
        "title": "Lesson 12.2 Creating Threads",
        "objectives": [
          "Create a thread by extending Thread.",
          "Understand why start() and run() differ."
        ],
        "theory": "The first way to create a thread is to **extend the `Thread` class** and override its `run()` method. `run()` holds the code the new thread will execute.\n\nThe single most important distinction in this module: **`start()` versus `run()`**.\n\n- `start()` asks the JVM to allocate a new call stack and schedule a new OS thread, which then invokes `run()`. You get concurrency.\n- `run()` is just a normal method call. It executes on the *current* thread, synchronously. You get no concurrency at all, and nothing warns you.\n\nCalling `start()` twice on the same Thread object throws `IllegalThreadStateException` — a thread cannot be restarted once it has finished.\n\nOutput ordering between threads is **non-deterministic**. Running the same program twice can interleave differently; never write code that depends on a particular interleaving.",
        "syntax": "class Worker extends Thread {\n    public void run() { /* work */ }\n}\nnew Worker().start();   // NOT run()",
        "codeExample": "class Downloader extends Thread {\n    private final String file;\n\n    Downloader(String file) {\n        this.file = file;\n        setName(\"dl-\" + file);\n    }\n\n    @Override\n    public void run() {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(getName() + \" chunk \" + i);\n            try {\n                Thread.sleep(100);\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n                return;\n            }\n        }\n        System.out.println(getName() + \" complete\");\n    }\n}\n\npublic class CreatingThreads {\n    public static void main(String[] args) throws InterruptedException {\n        Downloader a = new Downloader(\"a.zip\");\n        Downloader b = new Downloader(\"b.zip\");\n\n        a.start();\n        b.start();\n\n        a.join();   // wait for a to finish\n        b.join();   // wait for b to finish\n\n        System.out.println(\"All downloads finished.\");\n    }\n}",
        "codeOutput": "dl-a.zip chunk 1\ndl-b.zip chunk 1\ndl-a.zip chunk 2\ndl-b.zip chunk 2\ndl-a.zip chunk 3\ndl-b.zip chunk 3\ndl-a.zip complete\ndl-b.zip complete\nAll downloads finished.",
        "mistakes": [
          "Calling `run()` instead of `start()` — everything executes sequentially on the main thread and the bug is invisible.",
          "Calling `start()` twice on one object, which throws `IllegalThreadStateException`.",
          "Expecting deterministic output ordering across threads."
        ],
        "takeaways": [
          "Extend `Thread`, override `run()`, invoke `start()`.",
          "`start()` creates a new stack; `run()` is an ordinary method call.",
          "`join()` blocks the caller until the target thread terminates."
        ]
      },
      {
        "id": "m12-l3",
        "title": "Lesson 12.3 Runnable Interface",
        "objectives": [
          "Create threads by implementing Runnable.",
          "Explain why Runnable is preferred over extending Thread."
        ],
        "theory": "`Runnable` is a functional interface with a single method, `run()`. You pass an implementation to a `Thread` constructor and the thread runs it.\n\nThis is the **preferred approach**, for three reasons:\n\n1. **Java has single class inheritance.** Extending `Thread` burns your one and only superclass slot. Implementing `Runnable` leaves you free to extend something meaningful.\n2. **Separation of concerns.** `Runnable` describes *the task*; `Thread` is *the worker* that runs it. Keeping them apart is better design.\n3. **Reusability with executors.** Thread pools (`ExecutorService`) accept `Runnable`, not `Thread` subclasses. Code written against `Runnable` scales up to pools unchanged.\n\nBecause `Runnable` is functional, a lambda is usually the whole implementation: `new Thread(() -> doWork()).start();`",
        "syntax": "Runnable task = () -> { /* work */ };\nnew Thread(task, \"worker-1\").start();",
        "codeExample": "class OrderProcessor implements Runnable {\n    private final int orderId;\n\n    OrderProcessor(int orderId) {\n        this.orderId = orderId;\n    }\n\n    @Override\n    public void run() {\n        String who = Thread.currentThread().getName();\n        System.out.println(who + \" processing order \" + orderId);\n    }\n}\n\npublic class RunnableDemo {\n    public static void main(String[] args) throws InterruptedException {\n        // 1. Named class implementing Runnable\n        Thread t1 = new Thread(new OrderProcessor(101), \"worker-1\");\n\n        // 2. Lambda - Runnable is a functional interface\n        Thread t2 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" sending invoices\");\n        }, \"worker-2\");\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Batch complete.\");\n    }\n}",
        "codeOutput": "worker-1 processing order 101\nworker-2 sending invoices\nBatch complete.",
        "mistakes": [
          "Calling `myRunnable.run()` directly instead of handing it to a Thread and calling `start()`.",
          "Extending `Thread` out of habit and then discovering you needed to extend a domain class.",
          "Sharing one Runnable instance across threads without realising its fields are now shared mutable state."
        ],
        "takeaways": [
          "Prefer `Runnable` over extending `Thread` — it keeps your inheritance slot free.",
          "`Runnable` is a functional interface, so lambdas work.",
          "`Runnable` returns nothing and cannot throw checked exceptions; use `Callable<V>` when you need a result."
        ]
      },
      {
        "id": "m12-l4",
        "title": "Lesson 12.4 Thread Lifecycle",
        "objectives": [
          "Name the six thread states.",
          "Trace the transitions between them."
        ],
        "theory": "A Java thread is always in exactly one of six states, available via `Thread.getState()`.\n\n1. **NEW** — object constructed, `start()` not yet called.\n2. **RUNNABLE** — eligible to run. Note Java does not distinguish \"ready\" from \"actually on a CPU\"; both are RUNNABLE.\n3. **BLOCKED** — waiting to acquire a monitor lock held by another thread, i.e. queued outside a `synchronized` block.\n4. **WAITING** — waiting indefinitely for another thread to act. Entered via `wait()`, `join()`, or `LockSupport.park()`.\n5. **TIMED_WAITING** — the same, but with a deadline. Entered via `sleep(ms)`, `wait(ms)`, `join(ms)`.\n6. **TERMINATED** — `run()` has returned or thrown. **A terminated thread cannot be restarted.**\n\nThe distinction that trips people up: `sleep()` holds any locks it owns while it waits, whereas `wait()` **releases** the monitor so another thread can enter. That single difference is the source of countless deadlocks and a perennial interview question.",
        "syntax": "Thread.State state = myThread.getState();\n// NEW | RUNNABLE | BLOCKED | WAITING | TIMED_WAITING | TERMINATED",
        "codeExample": "public class ThreadLifecycle {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            try {\n                Thread.sleep(200);          // TIMED_WAITING\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        }, \"worker\");\n\n        System.out.println(\"After construction : \" + worker.getState());\n\n        worker.start();\n        System.out.println(\"After start()      : \" + worker.getState());\n\n        Thread.sleep(50);\n        System.out.println(\"While sleeping     : \" + worker.getState());\n\n        worker.join();\n        System.out.println(\"After join()       : \" + worker.getState());\n\n        // A terminated thread cannot be revived\n        try {\n            worker.start();\n        } catch (IllegalThreadStateException e) {\n            System.out.println(\"Restart refused    : \" + e.getClass().getSimpleName());\n        }\n    }\n}",
        "codeOutput": "After construction : NEW\nAfter start()      : RUNNABLE\nWhile sleeping     : TIMED_WAITING\nAfter join()       : TERMINATED\nRestart refused    : IllegalThreadStateException",
        "mistakes": [
          "Believing RUNNABLE means \"currently executing\" — it also covers threads queued for a CPU.",
          "Trying to reuse a TERMINATED thread by calling `start()` again.",
          "Confusing BLOCKED (waiting for a lock) with WAITING (waiting for a notification)."
        ],
        "takeaways": [
          "Six states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
          "`sleep()` keeps its locks; `wait()` releases the monitor.",
          "Termination is final — construct a new Thread to run the task again."
        ]
      },
      {
        "id": "m12-l5",
        "title": "Lesson 12.5 Synchronization",
        "objectives": [
          "Identify race conditions.",
          "Protect shared state with synchronized and volatile."
        ],
        "theory": "When two threads write the same variable without coordination you get a **race condition**. The classic example is `count++`, which looks atomic but is actually three operations: read, add one, write back. Two threads can both read 5, both compute 6, and both store 6 — one increment silently vanishes.\n\n**`synchronized`** fixes this. Every Java object owns a *monitor*; entering a synchronized block acquires it and exiting releases it. Only one thread can hold a given monitor at a time, so the protected region becomes mutually exclusive. You can synchronize a whole method (locking `this`, or the Class object for static methods) or a narrower block on a specific lock object — the narrower the region, the less contention.\n\n**`volatile`** solves a different problem: **visibility**. Without it a thread may cache a field in a CPU register and never see another thread's update, causing an infinite loop. `volatile` forces reads and writes to go to main memory. It does *not* make compound operations like `++` atomic — for counters use `AtomicInteger`.\n\nA **deadlock** occurs when two threads each hold a lock the other needs. The standard prevention is to always acquire multiple locks in the same global order.",
        "syntax": "private final Object lock = new Object();\nsynchronized (lock) { /* critical section */ }\n\npublic synchronized void method() { /* locks on this */ }",
        "codeExample": "class Counter {\n    private int count = 0;\n\n    // Without synchronized, increments are lost under contention\n    public synchronized void increment() {\n        count++;\n    }\n\n    public synchronized int get() {\n        return count;\n    }\n}\n\npublic class SynchronizationDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        Runnable job = () -> {\n            for (int i = 0; i < 10000; i++) {\n                counter.increment();\n            }\n        };\n\n        Thread t1 = new Thread(job);\n        Thread t2 = new Thread(job);\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Expected : 20000\");\n        System.out.println(\"Actual   : \" + counter.get());\n    }\n}",
        "codeOutput": "Expected : 20000\nActual   : 20000",
        "mistakes": [
          "Assuming `count++` is atomic — it is a read-modify-write triple.",
          "Using `volatile` for counters. It guarantees visibility, not atomicity.",
          "Synchronizing on a mutable field or on a boxed value like `Integer`, so different threads end up locking different objects.",
          "Acquiring locks in inconsistent orders across methods, creating a deadlock."
        ],
        "takeaways": [
          "`synchronized` provides mutual exclusion; `volatile` provides visibility.",
          "Keep critical sections as small as possible to reduce contention.",
          "Prefer `AtomicInteger` and the `java.util.concurrent` classes over hand-rolled locking."
        ]
      },
      {
        "id": "m12-l6",
        "title": "Lesson 12.6 Thread Pool Basics",
        "objectives": [
          "Explain why pools beat raw threads.",
          "Use ExecutorService and Callable."
        ],
        "theory": "Creating a thread per task does not scale. Each thread costs roughly 1 MB of stack plus OS bookkeeping, and creation itself is expensive. A server that spawns a thread per request will collapse under load.\n\nA **thread pool** keeps a fixed set of worker threads alive and feeds them tasks from a queue. Threads are reused, memory is bounded, and load shedding becomes possible.\n\n`ExecutorService` is the standard API, obtained from the `Executors` factory:\n\n- `newFixedThreadPool(n)` — n workers, unbounded queue. The usual default; size it near your core count for CPU-bound work.\n- `newCachedThreadPool()` — grows on demand, reaps idle threads. Good for many short I/O-bound tasks.\n- `newSingleThreadExecutor()` — one worker, guaranteeing sequential execution.\n- `newScheduledThreadPool(n)` — for delayed and periodic tasks.\n\nSubmit a `Runnable` when you want fire-and-forget, or a **`Callable<V>`** when you need a result. `submit()` returns a `Future<V>`; calling `future.get()` blocks until the value is ready and rethrows any exception the task threw.\n\n**Always shut down the pool.** Its threads are non-daemon, so a forgotten executor keeps the JVM alive forever. `shutdown()` stops accepting new work and drains the queue; `shutdownNow()` attempts to interrupt running tasks.",
        "syntax": "ExecutorService pool = Executors.newFixedThreadPool(4);\nFuture<Integer> f = pool.submit(() -> compute());\nInteger result = f.get();\npool.shutdown();",
        "codeExample": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.concurrent.Callable;\nimport java.util.concurrent.ExecutionException;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\nimport java.util.concurrent.TimeUnit;\n\npublic class ThreadPoolDemo {\n    public static void main(String[] args) throws InterruptedException, ExecutionException {\n        ExecutorService pool = Executors.newFixedThreadPool(3);\n        List<Future<Integer>> futures = new ArrayList<>();\n\n        for (int i = 1; i <= 5; i++) {\n            final int taskId = i;\n            Callable<Integer> task = () -> {\n                System.out.println(Thread.currentThread().getName() + \" runs task \" + taskId);\n                Thread.sleep(100);\n                return taskId * taskId;\n            };\n            futures.add(pool.submit(task));\n        }\n\n        int total = 0;\n        for (Future<Integer> f : futures) {\n            total += f.get();   // blocks until this task completes\n        }\n        System.out.println(\"Sum of squares: \" + total);\n\n        pool.shutdown();\n        if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {\n            pool.shutdownNow();\n        }\n        System.out.println(\"Pool terminated: \" + pool.isTerminated());\n    }\n}",
        "codeOutput": "pool-1-thread-1 runs task 1\npool-1-thread-2 runs task 2\npool-1-thread-3 runs task 3\npool-1-thread-1 runs task 4\npool-1-thread-2 runs task 5\nSum of squares: 55\nPool terminated: true",
        "mistakes": [
          "Never calling `shutdown()`, leaving non-daemon worker threads that stop the JVM exiting.",
          "Calling `future.get()` immediately after each `submit()`, which serialises everything and defeats the pool.",
          "Sizing a CPU-bound pool at hundreds of threads instead of roughly the core count.",
          "Swallowing task failures — exceptions inside a submitted task surface only when you call `get()`."
        ],
        "takeaways": [
          "Pools reuse a bounded set of threads instead of creating one per task.",
          "`Runnable` returns nothing; `Callable<V>` returns a value via `Future<V>`.",
          "Submit everything first, then collect the futures — otherwise you lose the parallelism.",
          "Always shut the executor down."
        ]
      }
    ],
    exercise: {
      title: 'Thread-safe counter',
      description: 'Demonstrate a race condition, then fix it with synchronization and again with AtomicInteger.',
      instructions: ['Run two threads that each increment a shared counter 10,000 times.', 'Observe that the unsynchronised total is below 20,000.', 'Fix it with a synchronized method, then compare against AtomicInteger.'],
      starterCode: 'public class Solution {\n    static int count = 0;\n\n    public static void main(String[] args) throws InterruptedException {\n        Runnable job = () -> {\n            for (int i = 0; i < 10000; i++) count++;   // TODO: make this safe\n        };\n        // TODO: start two threads, join them, print the total\n    }\n}',
      expectedOutput: 'Expected: 20000\nActual: 20000',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which method starts thread execution?', options: ['A. run()', 'B. start()', 'C. init()', 'D. execute()'], correctAnswer: 'B. start()' },
      { id: 2, question: 'Which keyword prevents concurrent access to critical methods?', options: ['A. lock', 'B. private', 'C. synchronized', 'D. volatile'], correctAnswer: 'C. synchronized' },
      { id: 3, question: 'Why is Runnable preferred over extending Thread?', options: ['A. Runnable is faster', 'B. Java supports multiple interface implementations but only single class inheritance', 'C. Runnable handles synchronized naturally', 'D. Thread is deprecated'], correctAnswer: 'B. Java supports multiple interface implementations but only single class inheritance' },
      { id: 4, question: 'What state is a thread in after calling start()?', options: ['A. Running', 'B. Runnable', 'C. New', 'D. Terminated'], correctAnswer: 'B. Runnable' },
      { id: 5, question: 'Which class creates built-in thread pools?', options: ['A. ThreadBuilder', 'B. Executors', 'C. PoolService', 'D. RunnableFactory'], correctAnswer: 'B. Executors' },
      { id: 6, question: 'What does calling `run()` directly instead of `start()` do?', options: ['A. Starts a new thread', 'B. Executes synchronously on the current thread', 'C. Throws an exception', 'D. Nothing'], correctAnswer: 'B. Executes synchronously on the current thread' },
      { id: 7, question: 'What happens if you call `start()` twice on the same Thread?', options: ['A. It runs twice', 'B. IllegalThreadStateException', 'C. Nothing', 'D. It restarts'], correctAnswer: 'B. IllegalThreadStateException' },
      { id: 8, question: 'Why is implementing Runnable preferred over extending Thread?', options: ['A. It is faster', 'B. It leaves the single inheritance slot free', 'C. It is required by the JVM', 'D. It avoids exceptions'], correctAnswer: 'B. It leaves the single inheritance slot free' },
      { id: 9, question: 'How many states can a Java thread be in?', options: ['A. Four', 'B. Five', 'C. Six', 'D. Three'], correctAnswer: 'C. Six' },
      { id: 10, question: 'Which state means the thread is waiting to acquire a monitor lock?', options: ['A. WAITING', 'B. BLOCKED', 'C. TIMED_WAITING', 'D. RUNNABLE'], correctAnswer: 'B. BLOCKED' },
      { id: 11, question: 'Which releases the monitor lock while waiting?', options: ['A. sleep()', 'B. wait()', 'C. join()', 'D. yield()'], correctAnswer: 'B. wait()' },
      { id: 12, question: 'Why is `count++` not thread-safe?', options: ['A. It is a read-modify-write sequence, not atomic', 'B. It uses too much memory', 'C. It is a syntax error', 'D. It blocks threads'], correctAnswer: 'A. It is a read-modify-write sequence, not atomic' },
      { id: 13, question: 'What does `volatile` guarantee?', options: ['A. Atomicity of compound operations', 'B. Visibility of reads and writes across threads', 'C. Mutual exclusion', 'D. Thread priority'], correctAnswer: 'B. Visibility of reads and writes across threads' },
      { id: 14, question: 'Which class provides atomic increment without explicit locking?', options: ['A. Integer', 'B. AtomicInteger', 'C. volatile int', 'D. Long'], correctAnswer: 'B. AtomicInteger' },
      { id: 15, question: 'What does `join()` do?', options: ['A. Merges two threads', 'B. Blocks the caller until the target thread finishes', 'C. Starts a thread', 'D. Releases a lock'], correctAnswer: 'B. Blocks the caller until the target thread finishes' },
      { id: 16, question: 'What is a deadlock?', options: ['A. A thread that finished', 'B. Two threads each holding a lock the other needs', 'C. A slow thread', 'D. An unhandled exception'], correctAnswer: 'B. Two threads each holding a lock the other needs' },
      { id: 17, question: 'What is the standard way to prevent deadlock with multiple locks?', options: ['A. Use more threads', 'B. Always acquire locks in the same global order', 'C. Remove synchronized', 'D. Use sleep()'], correctAnswer: 'B. Always acquire locks in the same global order' },
      { id: 18, question: 'Why prefer a thread pool over creating a thread per task?', options: ['A. Threads are expensive to create and consume ~1MB stack each', 'B. Pools are required by Java', 'C. Pools use less CPU always', 'D. Threads cannot be reused otherwise'], correctAnswer: 'A. Threads are expensive to create and consume ~1MB stack each' },
      { id: 19, question: 'Which interface should you use when a task must return a result?', options: ['A. Runnable', 'B. Callable', 'C. Thread', 'D. Executor'], correctAnswer: 'B. Callable' },
      { id: 20, question: 'What happens if you never call `shutdown()` on an ExecutorService?', options: ['A. Nothing', 'B. Its non-daemon threads keep the JVM alive', 'C. Tasks are lost', 'D. It throws'], correctAnswer: 'B. Its non-daemon threads keep the JVM alive' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a thread-safe singleton program utilizing synchronized blocks.', language: 'java', starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        Runnable job = () -> {\n            // work to run concurrently\n        };\n        // Start two threads, join them, print the result\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'What is the difference between calling start() and run() on a Thread object in Java?',
          options: [
            'A. start() executes the thread code in the same caller thread; run() spawns a new call stack and thread.',
            'B. start() creates a new thread and executes run() asynchronously in it; calling run() directly runs the code synchronously in the current thread.',
            'C. calling run() throws a checked exception; start() does not.',
            'D. calling start() is deprecated; run() should always be called instead.'
          ],
          correctAnswer: 'B. start() creates a new thread and executes run() asynchronously in it; calling run() directly runs the code synchronously in the current thread.'
        }
      ]
    }
  },
  m13: {
    id: 'm13',
    title: 'MODULE 13: JAVA 8 FEATURES',
    overview: 'Learn key modern Java paradigms: Lambda Expressions, Functional Interfaces, Stream API, Optional class, and Method References.',
    outcomes: [
      'Write clean, functional code with Lambdas.',
      'Process collections using Stream operations.',
      'Avoid null pointer issues with Optional.'
    ],
    lessons: [
      {
        "id": "m13-l1",
        "title": "Lesson 13.1 Lambda Expressions",
        "objectives": [
          "Write concise anonymous functions.",
          "Understand effectively-final capture."
        ],
        "theory": "A **lambda expression** is an anonymous function — a block of behaviour you can pass around like a value. Before Java 8 this required a verbose anonymous inner class; a lambda reduces the same idea to a single line.\n\nThe form is `(parameters) -> body`. Parameter types are usually inferred, so `(String s) -> s.length()` shortens to `s -> s.length()`. A single-expression body implicitly returns its value; a braced body needs an explicit `return`.\n\nA lambda can only be assigned to a **functional interface** — an interface with exactly one abstract method (covered next lesson). The compiler matches the lambda's shape to that method's signature.\n\nOne important rule: a lambda may reference local variables from its enclosing scope only if they are **final or effectively final** (never reassigned after initialisation). This is because the value is captured by copy, and allowing mutation would make the captured state ambiguous. Unlike an anonymous inner class, `this` inside a lambda refers to the *enclosing* instance, not the lambda itself.",
        "syntax": "() -> expression\nx -> expression\n(x, y) -> { statements; return value; }",
        "codeExample": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class LambdaDemo {\n    public static void main(String[] args) {\n        List<String> names = new ArrayList<>(Arrays.asList(\"Ravi\", \"Asha\", \"Meera\", \"Dev\"));\n\n        // Before Java 8: anonymous inner class\n        names.sort(new java.util.Comparator<String>() {\n            @Override\n            public int compare(String a, String b) {\n                return a.length() - b.length();\n            }\n        });\n        System.out.println(\"Anonymous class: \" + names);\n\n        // With a lambda: same behaviour, one line\n        names.sort((a, b) -> b.length() - a.length());\n        System.out.println(\"Lambda         : \" + names);\n\n        // Multi-statement body needs braces and an explicit return\n        names.sort((a, b) -> {\n            int byLength = a.length() - b.length();\n            return byLength != 0 ? byLength : a.compareTo(b);\n        });\n        System.out.println(\"Length then A-Z: \" + names);\n\n        // forEach takes a Consumer<String>\n        names.forEach(n -> System.out.println(\"Hello, \" + n));\n    }\n}",
        "codeOutput": "Anonymous class: [Dev, Ravi, Asha, Meera]\nLambda         : [Meera, Ravi, Asha, Dev]\nLength then A-Z: [Dev, Asha, Ravi, Meera]\nHello, Dev\nHello, Asha\nHello, Ravi\nHello, Meera",
        "mistakes": [
          "Reassigning a captured local variable — the compiler rejects it with \"must be final or effectively final\".",
          "Mixing styles: `x -> { x * 2; }` returns nothing. Either drop the braces or add `return`.",
          "Expecting `this` inside a lambda to mean the lambda; it refers to the enclosing object."
        ],
        "takeaways": [
          "A lambda is an anonymous implementation of a functional interface.",
          "Single-expression bodies return implicitly; braced bodies need `return`.",
          "Captured locals must be final or effectively final."
        ]
      },
      {
        "id": "m13-l2",
        "title": "Lesson 13.2 Functional Interfaces",
        "objectives": [
          "Define a functional interface.",
          "Use the built-in interfaces from java.util.function."
        ],
        "theory": "A **functional interface** has exactly one abstract method, which is what gives the compiler an unambiguous target when it sees a lambda. It may also carry any number of `default` and `static` methods — those have bodies, so they do not count.\n\nThe `@FunctionalInterface` annotation is optional but recommended: it makes the compiler fail loudly if someone later adds a second abstract method and breaks every lambda that used it.\n\n`java.util.function` ships the ones you will actually use day to day:\n\n- **`Predicate<T>`** — `boolean test(T)`. Filtering.\n- **`Function<T,R>`** — `R apply(T)`. Transformation.\n- **`Consumer<T>`** — `void accept(T)`. Side effects such as printing.\n- **`Supplier<T>`** — `T get()`. Lazy production of a value.\n- **`BiFunction<T,U,R>`** — two arguments, one result.\n- **`UnaryOperator<T>`** — a `Function` where input and output share a type.\n\nMany of these compose: `predicate.and(other)`, `predicate.negate()`, `function.andThen(next)`. Composition is what makes the Stream API in the next lesson so expressive.",
        "syntax": "@FunctionalInterface\ninterface Validator {\n    boolean validate(String input);\n}\n\nValidator notEmpty = s -> s != null && !s.isBlank();",
        "codeExample": "import java.util.function.BiFunction;\nimport java.util.function.Consumer;\nimport java.util.function.Function;\nimport java.util.function.Predicate;\nimport java.util.function.Supplier;\n\n@FunctionalInterface\ninterface Discount {\n    double apply(double price);\n\n    default Discount then(Discount next) {\n        return price -> next.apply(this.apply(price));\n    }\n}\n\npublic class FunctionalInterfaceDemo {\n    public static void main(String[] args) {\n        // Custom functional interface, composed via a default method\n        Discount tenPercent = p -> p * 0.90;\n        Discount flatFifty  = p -> p - 50;\n        System.out.println(\"Chained: \" + tenPercent.then(flatFifty).apply(1000));\n\n        // Built-in interfaces\n        Predicate<String> isLong = s -> s.length() > 5;\n        System.out.println(\"isLong(\\\"Java\\\")       : \" + isLong.test(\"Java\"));\n        System.out.println(\"negated              : \" + isLong.negate().test(\"Java\"));\n\n        Function<String, Integer> length = String::length;\n        System.out.println(\"length(\\\"Spring\\\")     : \" + length.apply(\"Spring\"));\n\n        Consumer<String> printer = s -> System.out.println(\"Consumed: \" + s);\n        printer.accept(\"payload\");\n\n        Supplier<Double> random = () -> 0.42;\n        System.out.println(\"Supplied             : \" + random.get());\n\n        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;\n        System.out.println(\"add(7, 5)            : \" + add.apply(7, 5));\n    }\n}",
        "codeOutput": "Chained: 850.0\nisLong(\"Java\")       : false\nnegated              : true\nlength(\"Spring\")     : 6\nConsumed: payload\nSupplied             : 0.42\nadd(7, 5)            : 12",
        "mistakes": [
          "Adding a second abstract method and breaking every existing lambda — `@FunctionalInterface` catches this at compile time.",
          "Writing a custom interface when `Predicate`, `Function`, `Consumer`, or `Supplier` already fits.",
          "Forgetting the primitive variants (`IntPredicate`, `ToIntFunction`) and paying boxing costs in hot loops."
        ],
        "takeaways": [
          "Exactly one abstract method; default and static methods are unlimited.",
          "Annotate with `@FunctionalInterface` to lock the contract.",
          "Prefer the standard interfaces in `java.util.function` over custom ones."
        ]
      },
      {
        "id": "m13-l3",
        "title": "Lesson 13.3 Stream API",
        "objectives": [
          "Build a pipeline of source, intermediate and terminal operations.",
          "Understand laziness."
        ],
        "theory": "A **stream** is a pipeline for processing a sequence of elements declaratively. You describe *what* you want, not the loop mechanics.\n\nEvery pipeline has three parts:\n\n1. **Source** — `list.stream()`, `Arrays.stream(arr)`, `Stream.of(...)`.\n2. **Intermediate operations** — `filter`, `map`, `sorted`, `distinct`, `limit`, `skip`. Each returns a new stream and is **lazy**: nothing executes yet.\n3. **Terminal operation** — `collect`, `forEach`, `count`, `reduce`, `anyMatch`, `findFirst`. This triggers the work and consumes the stream.\n\nLaziness matters for performance. In `list.stream().filter(...).findFirst()`, the filter runs only until the first match is found, not across the whole collection.\n\nTwo rules to internalise. First, a stream can be consumed **only once** — reusing it throws `IllegalStateException`. Second, streams should be **non-interfering**: do not modify the source collection while a pipeline over it is running, or you risk `ConcurrentModificationException`.\n\n`parallelStream()` splits work across the common ForkJoinPool. It only pays off for large datasets with genuinely independent, CPU-bound work.",
        "syntax": "List<String> result = items.stream()\n    .filter(x -> x.isActive())\n    .map(X::getName)\n    .sorted()\n    .collect(Collectors.toList());",
        "codeExample": "import java.util.Arrays;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Optional;\nimport java.util.stream.Collectors;\n\nclass Employee {\n    String name; String dept; double salary;\n    Employee(String name, String dept, double salary) {\n        this.name = name; this.dept = dept; this.salary = salary;\n    }\n    String getName()   { return name; }\n    String getDept()   { return dept; }\n    double getSalary() { return salary; }\n}\n\npublic class StreamDemo {\n    public static void main(String[] args) {\n        List<Employee> staff = Arrays.asList(\n            new Employee(\"Asha\",  \"ENG\",   95000),\n            new Employee(\"Ravi\",  \"ENG\",   78000),\n            new Employee(\"Meera\", \"SALES\", 64000),\n            new Employee(\"Dev\",   \"ENG\",   112000),\n            new Employee(\"Nita\",  \"SALES\", 88000)\n        );\n\n        // filter -> map -> sorted -> collect\n        List<String> wellPaidEngineers = staff.stream()\n            .filter(e -> e.getDept().equals(\"ENG\"))\n            .filter(e -> e.getSalary() > 80000)\n            .map(Employee::getName)\n            .sorted()\n            .collect(Collectors.toList());\n        System.out.println(\"Well paid engineers: \" + wellPaidEngineers);\n\n        // Aggregation\n        double payroll = staff.stream().mapToDouble(Employee::getSalary).sum();\n        System.out.println(\"Total payroll      : \" + payroll);\n\n        // Grouping\n        Map<String, Long> headcount = staff.stream()\n            .collect(Collectors.groupingBy(Employee::getDept, Collectors.counting()));\n        System.out.println(\"Headcount by dept  : \" + headcount);\n\n        // Short-circuiting terminal operation\n        Optional<Employee> topEarner = staff.stream()\n            .max((a, b) -> Double.compare(a.getSalary(), b.getSalary()));\n        System.out.println(\"Top earner         : \" + topEarner.map(Employee::getName).orElse(\"none\"));\n    }\n}",
        "codeOutput": "Well paid engineers: [Asha, Dev]\nTotal payroll      : 437000.0\nHeadcount by dept  : {ENG=3, SALES=2}\nTop earner         : Dev",
        "mistakes": [
          "Building a pipeline with no terminal operation — nothing runs, and there is no warning.",
          "Reusing a consumed stream, which throws `IllegalStateException`.",
          "Mutating the source collection inside a lambda, risking `ConcurrentModificationException`.",
          "Reaching for `parallelStream()` on small collections, where coordination costs exceed any gain."
        ],
        "takeaways": [
          "Source, then lazy intermediate operations, then one terminal operation.",
          "Intermediate operations do nothing until a terminal operation runs.",
          "A stream is single-use.",
          "Use `mapToInt` / `mapToDouble` to avoid boxing when aggregating numbers."
        ]
      },
      {
        "id": "m13-l4",
        "title": "Lesson 13.4 Method References",
        "objectives": [
          "Replace trivial lambdas with method references.",
          "Recognise the four reference forms."
        ],
        "theory": "When a lambda does nothing but call one existing method, a **method reference** says the same thing with less noise. `s -> s.length()` becomes `String::length`.\n\nThere are four forms:\n\n1. **Static method** — `Integer::parseInt` replaces `s -> Integer.parseInt(s)`.\n2. **Instance method of a particular object** — `System.out::println` replaces `x -> System.out.println(x)`.\n3. **Instance method of an arbitrary object of a type** — `String::toUpperCase` replaces `s -> s.toUpperCase()`. Here the stream element *becomes* the receiver.\n4. **Constructor** — `ArrayList::new` replaces `() -> new ArrayList<>()`.\n\nForm 3 is the one that confuses people, because the parameter silently moves from being an argument to being the object the method is called on.\n\nMethod references are purely syntactic sugar — identical bytecode, no performance difference. Use one when it reads more clearly, and stay with a lambda when arguments need reordering or extra work.",
        "syntax": "ClassName::staticMethod\ninstance::instanceMethod\nClassName::instanceMethod\nClassName::new",
        "codeExample": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\nimport java.util.function.BiFunction;\nimport java.util.function.Function;\nimport java.util.function.Supplier;\nimport java.util.stream.Collectors;\n\nclass Product {\n    private final String name;\n    Product(String name) { this.name = name; }\n    String getName() { return name; }\n}\n\npublic class MethodReferenceDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"ravi\", \"asha\", \"meera\");\n\n        // 3. Instance method of an arbitrary object: each element is the receiver\n        List<String> upper = names.stream()\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        System.out.println(\"Uppercased : \" + upper);\n\n        // 2. Instance method of a specific object\n        names.forEach(System.out::println);\n\n        // 1. Static method reference\n        List<Integer> numbers = Arrays.asList(\"10\", \"25\", \"7\").stream()\n            .map(Integer::parseInt)\n            .collect(Collectors.toList());\n        System.out.println(\"Parsed     : \" + numbers);\n\n        // 4. Constructor reference\n        Supplier<ArrayList<String>> listMaker = ArrayList::new;\n        System.out.println(\"New list   : \" + listMaker.get());\n\n        Function<String, Product> productMaker = Product::new;\n        System.out.println(\"Product    : \" + productMaker.apply(\"Keyboard\").getName());\n\n        // Static reference with two arguments\n        BiFunction<Integer, Integer, Integer> max = Integer::max;\n        System.out.println(\"max(9, 14) : \" + max.apply(9, 14));\n    }\n}",
        "codeOutput": "Uppercased : [RAVI, ASHA, MEERA]\nravi\nasha\nmeera\nParsed     : [10, 25, 7]\nNew list   : []\nProduct    : Keyboard\nmax(9, 14) : 14",
        "mistakes": [
          "Writing `System.out::println()` with parentheses — a method reference never has an argument list.",
          "Trying to use a method reference when the lambda reorders arguments or does extra work; keep the lambda.",
          "Confusing `String::toUpperCase` (arbitrary receiver) with `someString::toUpperCase` (fixed receiver)."
        ],
        "takeaways": [
          "Four forms: static, bound instance, unbound instance, constructor.",
          "Use one only when the lambda is a single, direct method call.",
          "Purely a readability feature — no runtime difference."
        ]
      },
      {
        "id": "m13-l5",
        "title": "Lesson 13.5 Optional Class",
        "objectives": [
          "Model absent values without null.",
          "Use the Optional API correctly."
        ],
        "theory": "`Optional<T>` is a container that either holds a value or is explicitly empty. Its purpose is to make \"this might not exist\" part of the **type signature**, so callers cannot forget to handle the absent case. Tony Hoare called null his \"billion-dollar mistake\"; `Optional` is Java's answer.\n\nCreate one with `Optional.of(value)` (throws if null), `Optional.ofNullable(maybeNull)` (safe), or `Optional.empty()`.\n\nConsume it functionally, not by asking whether it is present:\n\n- `orElse(default)` — return a fallback.\n- `orElseGet(supplier)` — same, but the fallback is computed lazily. Prefer this when the default is expensive.\n- `orElseThrow(...)` — throw a meaningful exception.\n- `map(fn)` / `flatMap(fn)` — transform the value if present.\n- `filter(predicate)` — keep the value only if it matches.\n- `ifPresent(consumer)` — run a side effect when present.\n\nThe anti-pattern is `if (opt.isPresent()) { opt.get(); }` — that is a null check with extra ceremony. Note also that `orElse` **always evaluates its argument**, even when the Optional is non-empty, which is why `orElseGet` matters for costly defaults.\n\nUse `Optional` as a **return type**. Do not use it for fields, method parameters, or collection elements — it is not serialisable and adds allocation for no benefit.",
        "syntax": "Optional<User> findById(int id);\n\nString name = findById(7)\n    .map(User::getName)\n    .orElse(\"Unknown\");",
        "codeExample": "import java.util.Arrays;\nimport java.util.List;\nimport java.util.Optional;\n\nclass User {\n    private final String name;\n    private final String email;\n    User(String name, String email) { this.name = name; this.email = email; }\n    String getName() { return name; }\n    Optional<String> getEmail() { return Optional.ofNullable(email); }\n}\n\npublic class OptionalDemo {\n    static final List<User> USERS = Arrays.asList(\n        new User(\"Asha\", \"asha@example.com\"),\n        new User(\"Ravi\", null)\n    );\n\n    static Optional<User> findByName(String name) {\n        return USERS.stream().filter(u -> u.getName().equals(name)).findFirst();\n    }\n\n    public static void main(String[] args) {\n        // Present value, transformed\n        String ashaEmail = findByName(\"Asha\")\n            .flatMap(User::getEmail)\n            .map(String::toLowerCase)\n            .orElse(\"no email on file\");\n        System.out.println(\"Asha  : \" + ashaEmail);\n\n        // Present user, absent email\n        String raviEmail = findByName(\"Ravi\")\n            .flatMap(User::getEmail)\n            .orElse(\"no email on file\");\n        System.out.println(\"Ravi  : \" + raviEmail);\n\n        // Absent user entirely\n        String ghost = findByName(\"Ghost\")\n            .map(User::getName)\n            .orElseGet(() -> \"user not found\");\n        System.out.println(\"Ghost : \" + ghost);\n\n        // Side effect only when present\n        findByName(\"Asha\").ifPresent(u -> System.out.println(\"Found : \" + u.getName()));\n\n        // filter keeps the value only if it matches\n        System.out.println(\"Filtered: \" + findByName(\"Ravi\")\n            .filter(u -> u.getEmail().isPresent())\n            .isPresent());\n    }\n}",
        "codeOutput": "Asha  : asha@example.com\nRavi  : no email on file\nGhost : user not found\nFound : Asha\nFiltered: false",
        "mistakes": [
          "Calling `get()` without checking, which throws `NoSuchElementException` — no better than a NullPointerException.",
          "Writing `if (opt.isPresent()) opt.get()` instead of `map` / `orElse` / `ifPresent`.",
          "Passing `null` to `Optional.of()` — that throws immediately; use `ofNullable`.",
          "Using `orElse(expensiveCall())` when the value is usually present — the argument is evaluated regardless. Use `orElseGet`.",
          "Declaring `Optional` fields or parameters. It is designed for return types."
        ],
        "takeaways": [
          "`Optional` makes absence explicit in the type system.",
          "Prefer `map` / `orElse` / `orElseThrow` over `isPresent` + `get`.",
          "`orElse` evaluates eagerly; `orElseGet` evaluates lazily.",
          "Return `Optional`; do not store it in fields or collections."
        ]
      }
    ],
    exercise: {
      title: 'Stream pipeline over employees',
      description: 'Filter, map, group and reduce a list of employees using the Stream API.',
      instructions: ['Filter to the engineering department, then map to names and sort them.', 'Group employees by department and count each group with Collectors.counting().', 'Find the highest earner and return the result as an Optional.'],
      starterCode: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class Solution {\n    record Employee(String name, String dept, double salary) { }\n\n    public static void main(String[] args) {\n        List<Employee> staff = List.of(\n            new Employee("Asha", "ENG", 95000),\n            new Employee("Ravi", "ENG", 78000),\n            new Employee("Meera", "SALES", 64000));\n        // TODO: build the stream pipelines\n    }\n}',
      expectedOutput: 'Engineers: [Asha, Ravi]\nBy dept: {ENG=2, SALES=1}\nTop earner: Asha',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which annotation declares single-method functional interfaces?', options: ['A. @Interface', 'B. @FunctionalInterface', 'C. @Lambda', 'D. @Contract'], correctAnswer: 'B. @FunctionalInterface' },
      { id: 2, question: 'Which operator denotes method references?', options: ['A. ->', 'B. .', 'C. ::', 'D. #'], correctAnswer: 'C. ::' },
      { id: 3, question: 'Which Stream operation aggregates elements to a single result?', options: ['A. map()', 'B. filter()', 'C. reduce()', 'D. sorted()'], correctAnswer: 'C. reduce()' },
      { id: 4, question: 'How do you create an empty Optional container?', options: ['A. Optional.empty()', 'B. new Optional()', 'C. Optional.of(null)', 'D. Optional.clear()'], correctAnswer: 'A. Optional.empty()' },
      { id: 5, question: 'Is stream map() intermediate or terminal?', options: ['A. Intermediate', 'B. Terminal', 'C. Finalizer', 'D. Getter'], correctAnswer: 'A. Intermediate' },
      { id: 6, question: 'What is a functional interface?', options: ['A. An interface with exactly one abstract method', 'B. Any interface', 'C. An interface with only static methods', 'D. A class with one method'], correctAnswer: 'A. An interface with exactly one abstract method' },
      { id: 7, question: 'Which annotation enforces the functional-interface contract?', options: ['A. @Override', 'B. @FunctionalInterface', 'C. @Lambda', 'D. @Interface'], correctAnswer: 'B. @FunctionalInterface' },
      { id: 8, question: 'What must a local variable be to be captured by a lambda?', options: ['A. static', 'B. public', 'C. final or effectively final', 'D. volatile'], correctAnswer: 'C. final or effectively final' },
      { id: 9, question: 'Which functional interface represents `boolean test(T)`?', options: ['A. Function', 'B. Predicate', 'C. Consumer', 'D. Supplier'], correctAnswer: 'B. Predicate' },
      { id: 10, question: 'Which represents `R apply(T)`?', options: ['A. Function', 'B. Predicate', 'C. Supplier', 'D. Consumer'], correctAnswer: 'A. Function' },
      { id: 11, question: 'Which takes an argument and returns nothing?', options: ['A. Supplier', 'B. Function', 'C. Consumer', 'D. Predicate'], correctAnswer: 'C. Consumer' },
      { id: 12, question: 'Which takes no argument and returns a value?', options: ['A. Consumer', 'B. Supplier', 'C. Predicate', 'D. Runnable'], correctAnswer: 'B. Supplier' },
      { id: 13, question: 'What are the three parts of a stream pipeline?', options: ['A. Source, intermediate operations, terminal operation', 'B. Start, middle, end', 'C. Filter, map, sort', 'D. Input, process, print'], correctAnswer: 'A. Source, intermediate operations, terminal operation' },
      { id: 14, question: 'What happens if a stream pipeline has no terminal operation?', options: ['A. It throws', 'B. Nothing executes', 'C. It runs anyway', 'D. Compile error'], correctAnswer: 'B. Nothing executes' },
      { id: 15, question: 'Can a stream be consumed more than once?', options: ['A. Yes', 'B. No, it throws IllegalStateException', 'C. Only parallel streams', 'D. Only if collected first'], correctAnswer: 'B. No, it throws IllegalStateException' },
      { id: 16, question: 'Which is a terminal operation?', options: ['A. filter', 'B. map', 'C. collect', 'D. sorted'], correctAnswer: 'C. collect' },
      { id: 17, question: 'What does `String::length` represent?', options: ['A. A static method reference', 'B. An unbound instance method reference', 'C. A constructor reference', 'D. A field access'], correctAnswer: 'B. An unbound instance method reference' },
      { id: 18, question: 'What does `ArrayList::new` represent?', options: ['A. A constructor reference', 'B. A static method reference', 'C. An instance method reference', 'D. Invalid syntax'], correctAnswer: 'A. A constructor reference' },
      { id: 19, question: 'What is the key difference between `orElse` and `orElseGet`?', options: ['A. None', 'B. orElse always evaluates its argument; orElseGet is lazy', 'C. orElseGet throws', 'D. orElse is faster always'], correctAnswer: 'B. orElse always evaluates its argument; orElseGet is lazy' },
      { id: 20, question: 'Where is Optional intended to be used?', options: ['A. As a field type', 'B. As a return type', 'C. As a method parameter', 'D. As a collection element'], correctAnswer: 'B. As a return type' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a Stream pipeline that filters odd numbers, squares them, and prints the result.', language: 'java', starterCode: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> names = List.of("Asha", "Ravi", "Meera", "Dev");\n        // Filter, map and collect using the Stream API\n    }\n}' },
        { kind: 'code', prompt: 'Show how Optional replaces checking `if (user != null)`.', language: 'java', starterCode: 'import java.util.Optional;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Optional<String> name = Optional.ofNullable(null);\n        // Replace an if (x != null) check using map / orElse\n    }\n}' }
      ]
    }
  },
  m14: {
    id: 'm14',
    title: 'MODULE 14: JDBC (DATABASE CONNECTIVITY)',
    overview: 'Connect Java apps to databases using JDBC: Drivers, Connection, Statement, PreparedStatements, and ResultSets.',
    outcomes: [
      'Establish database connections via URL parameters.',
      'Execute SQL queries using PreparedStatements.',
      'Parse query results using ResultSet.'
    ],
    lessons: [
      {
        "id": "m14-l1",
        "title": "Lesson 14.1 Introduction to JDBC",
        "objectives": [
          "Explain what JDBC is and why it exists.",
          "Name the layers of the JDBC architecture."
        ],
        "theory": "**JDBC** (Java Database Connectivity) is the standard API for talking to relational databases from Java. Its central idea is *abstraction*: your code is written against interfaces in `java.sql`, and a vendor-supplied **driver** implements them. Swap MySQL for PostgreSQL and, in principle, only the connection URL and the dependency change.\n\nThe architecture has four layers:\n\n1. **Your application** — calls JDBC interfaces.\n2. **The JDBC API** (`java.sql`) — `Connection`, `Statement`, `PreparedStatement`, `ResultSet`. All interfaces, no implementation.\n3. **The driver** — a JAR such as `mysql-connector-j` or `postgresql`, which implements those interfaces over the database's wire protocol.\n4. **The database**.\n\nModern drivers are **Type 4**: pure Java, talking the native protocol directly with no native libraries or bridges. Since JDBC 4.0 drivers register themselves automatically via the service-loader mechanism, so the old `Class.forName(\"com.mysql.jdbc.Driver\")` incantation is no longer needed.\n\nAlmost every JDBC method throws the checked `SQLException`, so error handling is not optional.",
        "syntax": "// Core java.sql types\nConnection        // a session with the database\nPreparedStatement // a pre-compiled, parameterised SQL statement\nResultSet         // a cursor over the rows a query returned",
        "codeExample": "import java.sql.Connection;\nimport java.sql.DatabaseMetaData;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\n\npublic class JdbcIntro {\n    public static void main(String[] args) {\n        String url  = \"jdbc:mysql://localhost:3306/school\";\n        String user = \"root\";\n        String pass = \"password\";\n\n        try (Connection conn = DriverManager.getConnection(url, user, pass)) {\n            DatabaseMetaData meta = conn.getMetaData();\n\n            System.out.println(\"Driver name    : \" + meta.getDriverName());\n            System.out.println(\"Driver version : \" + meta.getDriverVersion());\n            System.out.println(\"Database       : \" + meta.getDatabaseProductName());\n            System.out.println(\"JDBC version   : \" + meta.getJDBCMajorVersion());\n            System.out.println(\"Auto-commit    : \" + conn.getAutoCommit());\n\n        } catch (SQLException e) {\n            System.out.println(\"SQL state \" + e.getSQLState() + \": \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Driver name    : MySQL Connector/J\nDriver version : mysql-connector-j-8.3.0\nDatabase       : MySQL\nJDBC version   : 4\nAuto-commit    : true",
        "mistakes": [
          "Forgetting to add the driver JAR to the classpath, producing \"No suitable driver found for jdbc:...\".",
          "Still writing `Class.forName(...)` — harmless but obsolete since JDBC 4.0.",
          "Catching `SQLException` and printing nothing; always log `getSQLState()` and `getErrorCode()`."
        ],
        "takeaways": [
          "JDBC is an interface layer; the driver supplies the implementation.",
          "Type 4 drivers are pure Java and register themselves automatically.",
          "`SQLException` is checked — every JDBC call must handle or declare it."
        ]
      },
      {
        "id": "m14-l2",
        "title": "Lesson 14.2 Database Setup",
        "objectives": [
          "Add a JDBC driver dependency.",
          "Build a correct connection URL.",
          "Keep credentials out of source code."
        ],
        "theory": "Before any Java code runs you need three things in place: a database, a driver on the classpath, and a correct URL.\n\n**The dependency.** With Maven, add `mysql:mysql-connector-j` or `org.postgresql:postgresql`. With Gradle it is a single `implementation` line. Without it the driver cannot register and `getConnection` fails.\n\n**The URL** follows the shape `jdbc:<subprotocol>://<host>:<port>/<database>?<params>`:\n\n- MySQL — `jdbc:mysql://localhost:3306/school?useSSL=false&serverTimezone=UTC`\n- PostgreSQL — `jdbc:postgresql://localhost:5432/school`\n- H2 in-memory (ideal for tests) — `jdbc:h2:mem:testdb`\n\n**Credentials.** Never hard-code a username and password into a class that goes into version control. Read them from environment variables or an external properties file that is listed in `.gitignore`. Leaked database credentials in public repositories are a routine cause of breaches.\n\nOne more production note: opening a connection is expensive — a TCP handshake plus authentication, often tens of milliseconds. Real applications use a **connection pool** such as HikariCP that keeps connections open and hands them out on demand.",
        "syntax": "<!-- Maven -->\n<dependency>\n  <groupId>com.mysql</groupId>\n  <artifactId>mysql-connector-j</artifactId>\n  <version>8.3.0</version>\n</dependency>",
        "codeExample": "import java.io.IOException;\nimport java.io.InputStream;\nimport java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\nimport java.sql.Statement;\nimport java.util.Properties;\n\npublic class DatabaseSetup {\n\n    // Credentials loaded from db.properties (which is gitignored),\n    // falling back to environment variables.\n    private static Properties loadConfig() throws IOException {\n        Properties props = new Properties();\n        try (InputStream in = DatabaseSetup.class.getResourceAsStream(\"/db.properties\")) {\n            if (in != null) {\n                props.load(in);\n            } else {\n                props.setProperty(\"db.url\",  System.getenv(\"DB_URL\"));\n                props.setProperty(\"db.user\", System.getenv(\"DB_USER\"));\n                props.setProperty(\"db.pass\", System.getenv(\"DB_PASS\"));\n            }\n        }\n        return props;\n    }\n\n    public static Connection getConnection() throws SQLException, IOException {\n        Properties p = loadConfig();\n        return DriverManager.getConnection(\n            p.getProperty(\"db.url\"),\n            p.getProperty(\"db.user\"),\n            p.getProperty(\"db.pass\"));\n    }\n\n    public static void main(String[] args) {\n        String ddl = \"CREATE TABLE IF NOT EXISTS students (\"\n                   + \"  id INT PRIMARY KEY AUTO_INCREMENT,\"\n                   + \"  name VARCHAR(100) NOT NULL,\"\n                   + \"  age INT,\"\n                   + \"  grade VARCHAR(5))\";\n\n        try (Connection conn = getConnection();\n             Statement stmt = conn.createStatement()) {\n\n            stmt.execute(ddl);\n            System.out.println(\"Schema ready. Connected to \" + conn.getCatalog());\n\n        } catch (SQLException | IOException e) {\n            System.out.println(\"Setup failed: \" + e.getMessage());\n        }\n    }\n}",
        "codeOutput": "Schema ready. Connected to school",
        "mistakes": [
          "Hard-coding credentials and committing them to Git.",
          "Wrong port — 3306 is MySQL, 5432 is PostgreSQL. Mixing them gives a confusing connection-refused error.",
          "Omitting `serverTimezone` on older MySQL drivers, which fails with a timezone error before any query runs.",
          "Opening a fresh connection per request in production instead of using a pool."
        ],
        "takeaways": [
          "Driver JAR on the classpath, correct URL, credentials from outside the source tree.",
          "URL shape: `jdbc:subprotocol://host:port/database?params`.",
          "Use H2 in-memory for tests and HikariCP for production pooling."
        ]
      },
      {
        "id": "m14-l3",
        "title": "Lesson 14.3 JDBC Connection",
        "objectives": [
          "Open a Connection with DriverManager.",
          "Close it reliably with try-with-resources.",
          "Control transactions."
        ],
        "theory": "A `Connection` is an open session with the database. `DriverManager.getConnection(url, user, password)` scans the registered drivers, picks the one that recognises the URL, authenticates, and hands you the session.\n\nA connection wraps a real network socket and a server-side session, so **leaking one is a genuine resource leak**. Databases cap concurrent connections (MySQL defaults to 151); leak enough and every subsequent request fails. `try-with-resources` is the correct default because it closes the connection even when an exception is thrown.\n\nBy default a connection is in **auto-commit** mode: each statement commits immediately. For a multi-statement operation that must succeed or fail as a unit — a bank transfer being the canonical example — call `setAutoCommit(false)`, run the statements, then `commit()`. If anything throws, `rollback()` in the catch block undoes the whole thing.\n\n`Connection` is also the factory for everything else: `createStatement()`, `prepareStatement(sql)`, and `getMetaData()`.",
        "syntax": "try (Connection conn = DriverManager.getConnection(url, user, pass)) {\n    conn.setAutoCommit(false);\n    // ... statements ...\n    conn.commit();\n}",
        "codeExample": "import java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.PreparedStatement;\nimport java.sql.SQLException;\n\npublic class ConnectionDemo {\n    private static final String URL  = \"jdbc:mysql://localhost:3306/bank\";\n    private static final String USER = \"root\";\n    private static final String PASS = \"password\";\n\n    public static void main(String[] args) {\n        transfer(101, 102, 5000.0);\n    }\n\n    static void transfer(int fromId, int toId, double amount) {\n        String debit  = \"UPDATE accounts SET balance = balance - ? WHERE id = ?\";\n        String credit = \"UPDATE accounts SET balance = balance + ? WHERE id = ?\";\n\n        Connection conn = null;\n        try {\n            conn = DriverManager.getConnection(URL, USER, PASS);\n            conn.setAutoCommit(false);          // begin transaction\n\n            try (PreparedStatement out = conn.prepareStatement(debit);\n                 PreparedStatement in  = conn.prepareStatement(credit)) {\n\n                out.setDouble(1, amount);\n                out.setInt(2, fromId);\n                out.executeUpdate();\n\n                in.setDouble(1, amount);\n                in.setInt(2, toId);\n                in.executeUpdate();\n            }\n\n            conn.commit();                      // both succeeded\n            System.out.println(\"Transferred \" + amount + \" from \" + fromId + \" to \" + toId);\n\n        } catch (SQLException e) {\n            if (conn != null) {\n                try {\n                    conn.rollback();            // undo the partial transfer\n                    System.out.println(\"Rolled back: \" + e.getMessage());\n                } catch (SQLException rollbackError) {\n                    System.out.println(\"Rollback failed: \" + rollbackError.getMessage());\n                }\n            }\n        } finally {\n            if (conn != null) {\n                try { conn.close(); } catch (SQLException ignored) { }\n            }\n        }\n    }\n}",
        "codeOutput": "Transferred 5000.0 from 101 to 102",
        "mistakes": [
          "Not closing connections, exhausting the database connection limit under load.",
          "Leaving auto-commit on for multi-statement operations, so a mid-way failure leaves the data half-updated.",
          "Calling `rollback()` outside a try-catch — it can throw too.",
          "Sharing one `Connection` across threads. `Connection` is not thread-safe; give each thread its own."
        ],
        "takeaways": [
          "`DriverManager.getConnection()` opens a session; try-with-resources closes it.",
          "Auto-commit is on by default — turn it off for transactions.",
          "`commit()` on success, `rollback()` in the catch block.",
          "One connection per thread; use a pool in production."
        ]
      },
      {
        "id": "m14-l4",
        "title": "Lesson 14.4 CRUD Operations",
        "objectives": [
          "Perform Create, Read, Update and Delete through JDBC.",
          "Choose between executeUpdate and executeQuery."
        ],
        "theory": "CRUD is the four operations every data-backed application performs, and JDBC maps each to SQL:\n\n- **Create** → `INSERT`\n- **Read** → `SELECT`\n- **Update** → `UPDATE`\n- **Delete** → `DELETE`\n\nTwo execution methods cover them:\n\n- **`executeUpdate()`** for INSERT, UPDATE, DELETE. It returns an `int` — the number of rows affected. Always check it: a return of `0` means your `WHERE` clause matched nothing, which is very often the actual bug rather than a thrown exception.\n- **`executeQuery()`** for SELECT. It returns a `ResultSet` cursor.\n\nWhen you insert a row with an auto-increment primary key you usually need the new ID. Ask for it with `prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)` and read it from `getGeneratedKeys()`.\n\nFor bulk work, **batching** is transformative. `addBatch()` queues statements and `executeBatch()` sends them in one network round trip; inserting a thousand rows one at a time versus in a batch is often a hundredfold difference.\n\nGood practice is to put all of this behind a **DAO** (Data Access Object) so SQL never leaks into business logic.",
        "syntax": "int rows = pstmt.executeUpdate();      // INSERT / UPDATE / DELETE\nResultSet rs = pstmt.executeQuery();   // SELECT",
        "codeExample": "import java.sql.*;\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class StudentDao {\n    private final Connection conn;\n\n    StudentDao(Connection conn) { this.conn = conn; }\n\n    // CREATE - returns the generated primary key\n    int insert(String name, int age, String grade) throws SQLException {\n        String sql = \"INSERT INTO students (name, age, grade) VALUES (?, ?, ?)\";\n        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {\n            ps.setString(1, name);\n            ps.setInt(2, age);\n            ps.setString(3, grade);\n            ps.executeUpdate();\n\n            try (ResultSet keys = ps.getGeneratedKeys()) {\n                return keys.next() ? keys.getInt(1) : -1;\n            }\n        }\n    }\n\n    // READ\n    List<String> findByGrade(String grade) throws SQLException {\n        String sql = \"SELECT id, name, age FROM students WHERE grade = ? ORDER BY name\";\n        List<String> results = new ArrayList<>();\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, grade);\n            try (ResultSet rs = ps.executeQuery()) {\n                while (rs.next()) {\n                    results.add(rs.getInt(\"id\") + \" - \" + rs.getString(\"name\")\n                              + \" (\" + rs.getInt(\"age\") + \")\");\n                }\n            }\n        }\n        return results;\n    }\n\n    // UPDATE - the row count tells you whether anything matched\n    boolean updateGrade(int id, String newGrade) throws SQLException {\n        String sql = \"UPDATE students SET grade = ? WHERE id = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, newGrade);\n            ps.setInt(2, id);\n            return ps.executeUpdate() > 0;\n        }\n    }\n\n    // DELETE\n    boolean delete(int id) throws SQLException {\n        try (PreparedStatement ps = conn.prepareStatement(\"DELETE FROM students WHERE id = ?\")) {\n            ps.setInt(1, id);\n            return ps.executeUpdate() > 0;\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(\n                 \"jdbc:mysql://localhost:3306/school\", \"root\", \"password\")) {\n\n            StudentDao dao = new StudentDao(conn);\n\n            int newId = dao.insert(\"Asha Nair\", 20, \"A\");\n            System.out.println(\"Inserted with id \" + newId);\n\n            System.out.println(\"Grade A students : \" + dao.findByGrade(\"A\"));\n            System.out.println(\"Update applied   : \" + dao.updateGrade(newId, \"A+\"));\n            System.out.println(\"Delete applied   : \" + dao.delete(newId));\n        }\n    }\n}",
        "codeOutput": "Inserted with id 7\nGrade A students : [7 - Asha Nair (20)]\nUpdate applied   : true\nDelete applied   : true",
        "mistakes": [
          "Calling `executeQuery()` for an INSERT (or `executeUpdate()` for a SELECT) — both throw `SQLException`.",
          "Ignoring the row count from `executeUpdate()`, so a no-op UPDATE looks like a success.",
          "Running a DELETE or UPDATE without a `WHERE` clause and modifying every row in the table.",
          "Inserting thousands of rows in a loop instead of batching them."
        ],
        "takeaways": [
          "`executeUpdate()` returns affected rows; `executeQuery()` returns a ResultSet.",
          "Use `RETURN_GENERATED_KEYS` to retrieve auto-increment IDs.",
          "Batch bulk writes with `addBatch()` / `executeBatch()`.",
          "Wrap data access in a DAO to keep SQL out of business logic."
        ]
      },
      {
        "id": "m14-l5",
        "title": "Lesson 14.5 Prepared Statements",
        "objectives": [
          "Prevent SQL injection.",
          "Bind parameters by 1-based index.",
          "Understand pre-compilation."
        ],
        "theory": "This is the most security-critical lesson in the module.\n\nA `Statement` executes SQL you have assembled by string concatenation. If any part of that string came from a user, the user controls your query. Given\n\n```\n\"SELECT * FROM users WHERE name = '\" + input + \"'\"\n```\n\na user who types `' OR '1'='1` turns the query into one that matches every row. Type `'; DROP TABLE users; --` and the table is gone. This is **SQL injection**, and it has topped the OWASP risk list for two decades.\n\n`PreparedStatement` eliminates it structurally. The SQL is sent to the database **first**, with `?` placeholders, and parsed into an execution plan. Values are then bound separately as **data**. Because the query structure is already fixed before any user value arrives, no input can alter it. A malicious string is simply searched for literally and matches nothing.\n\nTwo bonuses come along for free: the database can cache and reuse the compiled plan, so repeated execution is faster; and setters like `setDate` and `setString` handle escaping and type conversion for you.\n\nThe one gotcha worth memorising: **parameter indexes start at 1, not 0.**",
        "syntax": "String sql = \"SELECT * FROM users WHERE email = ? AND active = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, email);   // 1-based\nps.setBoolean(2, true);",
        "codeExample": "import java.sql.*;\n\npublic class PreparedStatementDemo {\n    static final String URL = \"jdbc:mysql://localhost:3306/school\";\n\n    // VULNERABLE - never write this\n    static void unsafeLogin(Connection conn, String user, String pass) throws SQLException {\n        String sql = \"SELECT * FROM users WHERE username = '\" + user\n                   + \"' AND password = '\" + pass + \"'\";\n        try (Statement stmt = conn.createStatement();\n             ResultSet rs = stmt.executeQuery(sql)) {\n            System.out.println(\"Unsafe query matched a row: \" + rs.next());\n        }\n    }\n\n    // SAFE - structure is fixed before any input is bound\n    static boolean safeLogin(Connection conn, String user, String pass) throws SQLException {\n        String sql = \"SELECT id FROM users WHERE username = ? AND password = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, user);\n            ps.setString(2, pass);\n            try (ResultSet rs = ps.executeQuery()) {\n                return rs.next();\n            }\n        }\n    }\n\n    // Batching reuses one compiled plan across many executions\n    static void bulkInsert(Connection conn, String[][] rows) throws SQLException {\n        String sql = \"INSERT INTO students (name, age, grade) VALUES (?, ?, ?)\";\n        conn.setAutoCommit(false);\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            for (String[] row : rows) {\n                ps.setString(1, row[0]);\n                ps.setInt(2, Integer.parseInt(row[1]));\n                ps.setString(3, row[2]);\n                ps.addBatch();\n            }\n            int[] counts = ps.executeBatch();\n            conn.commit();\n            System.out.println(\"Batch inserted \" + counts.length + \" rows\");\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(URL, \"root\", \"password\")) {\n            String attack = \"' OR '1'='1\";\n\n            unsafeLogin(conn, attack, attack);\n            System.out.println(\"Safe query matched  : \" + safeLogin(conn, attack, attack));\n\n            bulkInsert(conn, new String[][] {\n                {\"Ravi\", \"21\", \"B\"}, {\"Meera\", \"22\", \"A\"}, {\"Dev\", \"20\", \"A\"}\n            });\n        }\n    }\n}",
        "codeOutput": "Unsafe query matched a row: true\nSafe query matched  : false\nBatch inserted 3 rows",
        "mistakes": [
          "Using index 0 for the first parameter. JDBC is 1-based and index 0 throws.",
          "Concatenating a value into the SQL string and then also using a PreparedStatement — the injection hole is still open.",
          "Putting a `?` where a table or column name goes. Placeholders bind values only; identifiers must be validated against a whitelist.",
          "Quoting the placeholder as `'?'` — it becomes a literal question-mark string."
        ],
        "takeaways": [
          "PreparedStatement makes SQL injection structurally impossible.",
          "Parameter indexes start at 1.",
          "Pre-compilation also makes repeated execution faster.",
          "Placeholders work for values, never for identifiers."
        ]
      },
      {
        "id": "m14-l6",
        "title": "Lesson 14.6 ResultSet",
        "objectives": [
          "Iterate a ResultSet cursor.",
          "Read typed columns and handle SQL NULL.",
          "Map rows to objects."
        ],
        "theory": "`executeQuery()` returns a **`ResultSet`** — a cursor over the rows the database matched, not a list in memory. The cursor starts positioned **before** the first row, which is why the idiom is `while (rs.next())`: each call advances one row and returns `false` when there are no more.\n\nRead columns with typed getters — `getInt`, `getString`, `getDouble`, `getBoolean`, `getDate`, `getTimestamp`. Address a column by **name** (`rs.getString(\"name\")`) for readability, or by 1-based index for a marginal speed gain.\n\n**SQL NULL needs care.** Primitive getters cannot represent it, so `getInt` on a NULL column returns `0` and `getDouble` returns `0.0` — indistinguishable from a genuine zero. To tell them apart, call the getter and then `rs.wasNull()`. For object getters like `getString` you simply get `null` back.\n\nA `ResultSet` is tied to its `Statement` and its `Connection`. Close the statement or the connection and the cursor dies, so **never return a live ResultSet from a DAO method**. Map the rows into your own objects inside the try block and return those instead.\n\nBy default the cursor is forward-only and read-only, which is the fastest mode and almost always what you want.",
        "syntax": "try (ResultSet rs = ps.executeQuery()) {\n    while (rs.next()) {\n        int id = rs.getInt(\"id\");\n        String name = rs.getString(\"name\");\n    }\n}",
        "codeExample": "import java.sql.*;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Student {\n    int id; String name; Integer age; String grade;\n\n    @Override\n    public String toString() {\n        return id + \" | \" + name + \" | \" + (age == null ? \"n/a\" : age) + \" | \" + grade;\n    }\n}\n\npublic class ResultSetDemo {\n\n    static List<Student> findAll(Connection conn) throws SQLException {\n        String sql = \"SELECT id, name, age, grade FROM students ORDER BY id\";\n        List<Student> students = new ArrayList<>();\n\n        try (PreparedStatement ps = conn.prepareStatement(sql);\n             ResultSet rs = ps.executeQuery()) {\n\n            while (rs.next()) {\n                Student s = new Student();\n                s.id    = rs.getInt(\"id\");\n                s.name  = rs.getString(\"name\");\n                s.grade = rs.getString(\"grade\");   // null-safe already\n\n                int rawAge = rs.getInt(\"age\");\n                s.age = rs.wasNull() ? null : rawAge;   // distinguish NULL from 0\n\n                students.add(s);\n            }\n        }\n        return students;   // safe: mapped objects, not a live cursor\n    }\n\n    static void describeColumns(Connection conn) throws SQLException {\n        try (PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM students LIMIT 1\");\n             ResultSet rs = ps.executeQuery()) {\n\n            ResultSetMetaData meta = rs.getMetaData();\n            for (int i = 1; i <= meta.getColumnCount(); i++) {\n                System.out.println(\"  \" + meta.getColumnName(i) + \" : \" + meta.getColumnTypeName(i));\n            }\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(\n                 \"jdbc:mysql://localhost:3306/school\", \"root\", \"password\")) {\n\n            System.out.println(\"Columns:\");\n            describeColumns(conn);\n\n            System.out.println(\"Rows:\");\n            findAll(conn).forEach(s -> System.out.println(\"  \" + s));\n        }\n    }\n}",
        "codeOutput": "Columns:\n  id : INT\n  name : VARCHAR\n  age : INT\n  grade : VARCHAR\nRows:\n  1 | Asha Nair | 20 | A\n  2 | Ravi Kumar | n/a | B\n  3 | Meera Das | 22 | A",
        "mistakes": [
          "Reading columns before calling `next()` — the cursor starts before the first row, so this throws.",
          "Treating `getInt()` returning 0 as a real value when the column was NULL. Check `wasNull()`.",
          "Returning the `ResultSet` from a method; it is dead as soon as the statement closes.",
          "Misspelling a column name, which throws at runtime rather than compile time."
        ],
        "takeaways": [
          "The cursor starts before row one; `next()` advances and reports whether a row exists.",
          "Use `wasNull()` after primitive getters to detect SQL NULL.",
          "Map rows to objects inside the try block and return those.",
          "`ResultSetMetaData` lets you inspect columns for generic tooling."
        ]
      }
    ],
    exercise: {
      title: 'Student DAO with PreparedStatement',
      description: 'Implement full CRUD against a students table using PreparedStatement throughout.',
      instructions: ['Use PreparedStatement for every query - never concatenate user input.', 'Retrieve the generated key after insert with RETURN_GENERATED_KEYS.', 'Check the row count from executeUpdate() to detect a no-op update.'],
      starterCode: 'import java.sql.*;\n\npublic class Solution {\n    static int insert(Connection conn, String name, int age) throws SQLException {\n        String sql = "INSERT INTO students (name, age) VALUES (?, ?)";\n        // TODO: prepare, bind (1-based!), execute, return the generated id\n        return -1;\n    }\n}',
      expectedOutput: 'Inserted with id 7\nRows updated: 1',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which interface manages SQL results rows?', options: ['A. Connection', 'B. PreparedStatement', 'C. ResultSet', 'D. Statement'], correctAnswer: 'C. ResultSet' },
      { id: 2, question: 'Why are PreparedStatements preferred over standard Statements?', options: ['A. They compile faster', 'B. They prevent SQL Injection and cache query execution plans', 'C. They do not require Connection objects', 'D. They use lower memory'], correctAnswer: 'B. They prevent SQL Injection and cache query execution plans' },
      { id: 3, question: 'What method runs SELECT queries?', options: ['A. executeUpdate()', 'B. executeQuery()', 'C. runSQL()', 'D. getResults()'], correctAnswer: 'B. executeQuery()' },
      { id: 4, question: 'Which JDBC url represents connection to MySQL?', options: ['A. jdbc:postgresql://...', 'B. jdbc:mysql://...', 'C. mysql:jdbc://...', 'D. db:mysql://...'], correctAnswer: 'B. jdbc:mysql://...' },
      { id: 5, question: 'What is the starting index of ResultSet columns?', options: ['A. 0', 'B. 1', 'C. -1', 'D. depends on driver'], correctAnswer: 'B. 1' },
      { id: 6, question: 'What is JDBC?', options: ['A. A database', 'B. A standard Java API for relational database access', 'C. An ORM framework', 'D. A driver'], correctAnswer: 'B. A standard Java API for relational database access' },
      { id: 7, question: 'Which JDBC driver type is pure Java and speaks the native protocol?', options: ['A. Type 1', 'B. Type 2', 'C. Type 3', 'D. Type 4'], correctAnswer: 'D. Type 4' },
      { id: 8, question: 'At what index do PreparedStatement parameters start?', options: ['A. 0', 'B. 1', 'C. -1', 'D. Depends on the driver'], correctAnswer: 'B. 1' },
      { id: 9, question: 'Which class prevents SQL injection?', options: ['A. Statement', 'B. PreparedStatement', 'C. ResultSet', 'D. Connection'], correctAnswer: 'B. PreparedStatement' },
      { id: 10, question: 'Why does PreparedStatement prevent injection?', options: ['A. It escapes quotes', 'B. The query structure is compiled before values are bound', 'C. It encrypts input', 'D. It blocks keywords'], correctAnswer: 'B. The query structure is compiled before values are bound' },
      { id: 11, question: 'Which method is used for INSERT, UPDATE and DELETE?', options: ['A. executeQuery()', 'B. executeUpdate()', 'C. execute()', 'D. run()'], correctAnswer: 'B. executeUpdate()' },
      { id: 12, question: 'What does executeUpdate() return?', options: ['A. A ResultSet', 'B. The number of affected rows', 'C. A boolean', 'D. void'], correctAnswer: 'B. The number of affected rows' },
      { id: 13, question: 'Where does the ResultSet cursor start?', options: ['A. On the first row', 'B. Before the first row', 'C. On the last row', 'D. At index 0'], correctAnswer: 'B. Before the first row' },
      { id: 14, question: 'How do you distinguish SQL NULL from 0 after `rs.getInt()`?', options: ['A. Compare to null', 'B. Call rs.wasNull()', 'C. Use getObject() only', 'D. It is impossible'], correctAnswer: 'B. Call rs.wasNull()' },
      { id: 15, question: 'Is it safe to return a live ResultSet from a DAO method?', options: ['A. Yes', 'B. No, it dies when the statement closes', 'C. Only for SELECT', 'D. Only with try-with-resources'], correctAnswer: 'B. No, it dies when the statement closes' },
      { id: 16, question: 'What is the default auto-commit setting on a new Connection?', options: ['A. false', 'B. true', 'C. Driver-dependent', 'D. Undefined'], correctAnswer: 'B. true' },
      { id: 17, question: 'Which method undoes an uncommitted transaction?', options: ['A. commit()', 'B. rollback()', 'C. close()', 'D. reset()'], correctAnswer: 'B. rollback()' },
      { id: 18, question: 'Which flag lets you retrieve an auto-increment ID after an insert?', options: ['A. RETURN_GENERATED_KEYS', 'B. FETCH_ID', 'C. AUTO_INCREMENT', 'D. GET_KEYS'], correctAnswer: 'A. RETURN_GENERATED_KEYS' },
      { id: 19, question: 'Which pair of methods sends many statements in one round trip?', options: ['A. addBatch() and executeBatch()', 'B. bulkInsert() and flush()', 'C. addAll() and commit()', 'D. prepare() and send()'], correctAnswer: 'A. addBatch() and executeBatch()' },
      { id: 20, question: 'Is a JDBC Connection thread-safe for sharing across threads?', options: ['A. Yes', 'B. No, give each thread its own', 'C. Only for reads', 'D. Only with synchronized'], correctAnswer: 'B. No, give each thread its own' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a code snippet inserting student records using PreparedStatements.', language: 'java', starterCode: 'import java.sql.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Sketch a PreparedStatement query. This will not connect here,\n        // so focus on correct structure and parameter binding.\n    }\n}' },
        {
          kind: 'mcq',
          prompt: 'What is the primary role of DriverManager in Java Database Connectivity (JDBC)?',
          options: [
            'A. It compiles SQL queries to run on the database server.',
            'B. It acts as the buffer pool manager for query results.',
            'C. It manages the list of database drivers, matches connection requests with the appropriate driver, and establishes the connection.',
            'D. It handles database user authentication and security roles.'
          ],
          correctAnswer: 'C. It manages the list of database drivers, matches connection requests with the appropriate driver, and establishes the connection.'
        }
      ]
    }
  },
  m15: {
    id: 'm15',
    title: 'MODULE 15: DATA STRUCTURES & ALGORITHMS IN JAVA',
    overview: 'Learn Big O analysis and core computer science algorithms: Linked Lists, Stacks, Queues, Binary Trees, Graphs, Sorting, and Searching.',
    outcomes: [
      'Analyze code runtime using Big O notation.',
      'Implement Stacks and Queues using dynamic lists.',
      'Perform Binary Search on arrays.'
    ],
    lessons: [
      {
        "id": "m15-l1",
        "title": "Lesson 15.1 Time Complexity",
        "objectives": [
          "Read and reason about Big O notation.",
          "Compare algorithms by growth rate."
        ],
        "theory": "**Big O** describes how an algorithm's cost grows as the input grows. It deliberately ignores constants and hardware, because those change; growth rate does not.\n\nThe hierarchy you must know, best to worst:\n\n- **O(1)** constant — array index, HashMap get.\n- **O(log n)** logarithmic — binary search. Doubling the input adds one step.\n- **O(n)** linear — a single loop over the data.\n- **O(n log n)** linearithmic — efficient sorting (merge sort, `Collections.sort`).\n- **O(n²)** quadratic — nested loops over the same data. Fine at n=100, unusable at n=1,000,000.\n- **O(2ⁿ)** exponential — naive recursive Fibonacci. Hopeless beyond about n=40.\n\nThe scale is easy to underestimate. At n = 1,000,000: O(n) is a million operations, O(n log n) about twenty million, and O(n²) is a *trillion* — the difference between milliseconds and weeks.\n\nAlways state which case you mean. Quicksort is O(n log n) average but O(n²) worst; HashMap lookup is O(1) average but O(n) if every key collides. Interviewers expect the average case unless they ask otherwise.\n\n**Space complexity** measures extra memory by the same notation. An in-place sort is O(1) space; merge sort needs O(n).",
        "syntax": "O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)",
        "codeExample": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ComplexityDemo {\n\n    // O(1) - one operation regardless of input size\n    static int first(int[] arr) {\n        return arr[0];\n    }\n\n    // O(n) - touches every element once\n    static int sum(int[] arr) {\n        int total = 0;\n        for (int value : arr) {\n            total += value;\n        }\n        return total;\n    }\n\n    // O(n^2) - nested loops over the same input\n    static boolean hasDuplicateSlow(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[i] == arr[j]) return true;\n            }\n        }\n        return false;\n    }\n\n    // O(n) - same result, trading O(n) space for a huge time win\n    static boolean hasDuplicateFast(int[] arr) {\n        Map<Integer, Boolean> seen = new HashMap<>();\n        for (int value : arr) {\n            if (seen.containsKey(value)) return true;\n            seen.put(value, true);\n        }\n        return false;\n    }\n\n    // O(log n) - halves the search space each step\n    static int binarySearch(int[] sorted, int target) {\n        int low = 0, high = sorted.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (sorted[mid] == target) return mid;\n            if (sorted[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] data = {3, 8, 12, 19, 25, 31, 42};\n\n        System.out.println(\"first()        O(1)      : \" + first(data));\n        System.out.println(\"sum()          O(n)      : \" + sum(data));\n        System.out.println(\"duplicateSlow  O(n^2)    : \" + hasDuplicateSlow(data));\n        System.out.println(\"duplicateFast  O(n)      : \" + hasDuplicateFast(data));\n        System.out.println(\"binarySearch   O(log n)  : index \" + binarySearch(data, 25));\n    }\n}",
        "codeOutput": "first()        O(1)      : 3\nsum()          O(n)      : 140\nduplicateSlow  O(n^2)    : false\nduplicateFast  O(n)      : false\nbinarySearch   O(log n)  : index 4",
        "mistakes": [
          "Keeping constants: O(2n) is O(n), and O(n + 5) is O(n).",
          "Assuming nested loops are always O(n²) — if the inner loop runs a fixed number of times it is O(n).",
          "Quoting best-case complexity in interviews. Default to average, and know the worst case.",
          "Optimising complexity on tiny inputs where an O(n²) loop is genuinely faster than building a HashMap."
        ],
        "takeaways": [
          "Big O expresses growth rate, dropping constants and lower-order terms.",
          "Memorise the hierarchy from O(1) to O(2ⁿ).",
          "Hash-based lookups typically trade O(n) space for O(1) time.",
          "Always know which case — best, average, or worst — you are quoting."
        ]
      },
      {
        "id": "m15-l2",
        "title": "Lesson 15.2 Arrays",
        "objectives": [
          "Understand contiguous memory and O(1) indexing.",
          "Know the cost of insertion and deletion."
        ],
        "theory": "An **array** stores elements in one contiguous block of memory, all of the same type. That layout is the source of both its great strength and its main weakness.\n\nBecause the block is contiguous and every element is the same size, the address of element *i* is a single multiplication: `base + i × size`. No searching is involved, so **access is O(1)** for any index. Contiguity also means excellent CPU cache behaviour, which often makes arrays faster in practice than their Big O suggests.\n\nThe weakness is rigidity. The length is **fixed at creation** — there is no growing an array. And inserting or removing in the middle costs **O(n)**, because every subsequent element must shift to keep the block contiguous.\n\n| Operation | Cost |\n|---|---|\n| Access by index | O(1) |\n| Search (unsorted) | O(n) |\n| Insert / delete at end | O(1) |\n| Insert / delete in middle | O(n) |\n\n`ArrayList` is an array underneath. When it fills, it allocates a new array 1.5× larger and copies everything across. That copy is O(n), but because it happens rarely the **amortised** cost of `add()` stays O(1).\n\nJava arrays are always bounds-checked; going out of range throws `ArrayIndexOutOfBoundsException` rather than corrupting memory.",
        "syntax": "int[] arr = new int[5];\nint[] init = {10, 20, 30};\nint value = arr[2];        // O(1)\nint length = arr.length;   // field, not a method",
        "codeExample": "import java.util.Arrays;\n\npublic class ArrayDemo {\n\n    // Inserting into the middle costs O(n) - everything after shifts right\n    static int[] insertAt(int[] arr, int index, int value) {\n        int[] result = new int[arr.length + 1];\n        System.arraycopy(arr, 0, result, 0, index);\n        result[index] = value;\n        System.arraycopy(arr, index, result, index + 1, arr.length - index);\n        return result;\n    }\n\n    static int[] removeAt(int[] arr, int index) {\n        int[] result = new int[arr.length - 1];\n        System.arraycopy(arr, 0, result, 0, index);\n        System.arraycopy(arr, index + 1, result, index, arr.length - index - 1);\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] data = {10, 20, 30, 40, 50};\n\n        System.out.println(\"Original     : \" + Arrays.toString(data));\n        System.out.println(\"data[2]      : \" + data[2] + \"   (O(1) access)\");\n        System.out.println(\"Length       : \" + data.length);\n\n        data = insertAt(data, 2, 99);\n        System.out.println(\"After insert : \" + Arrays.toString(data));\n\n        data = removeAt(data, 0);\n        System.out.println(\"After remove : \" + Arrays.toString(data));\n\n        // Useful helpers from java.util.Arrays\n        int[] copy = Arrays.copyOf(data, data.length);\n        Arrays.sort(copy);\n        System.out.println(\"Sorted copy  : \" + Arrays.toString(copy));\n        System.out.println(\"Binary search: index \" + Arrays.binarySearch(copy, 40));\n\n        int[][] grid = new int[2][3];\n        grid[1][2] = 7;\n        System.out.println(\"2D array     : \" + Arrays.deepToString(grid));\n\n        try {\n            System.out.println(data[99]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Bounds check : \" + e.getClass().getSimpleName());\n        }\n    }\n}",
        "codeOutput": "Original     : [10, 20, 30, 40, 50]\ndata[2]      : 30   (O(1) access)\nLength       : 5\nAfter insert : [10, 20, 99, 30, 40, 50]\nAfter remove : [20, 99, 30, 40, 50]\nSorted copy  : [20, 30, 40, 50, 99]\nBinary search: index 2\n2D array     : [[0, 0, 0], [0, 0, 7]]\nBounds check : ArrayIndexOutOfBoundsException",
        "mistakes": [
          "Writing `arr.length()` — length is a field on arrays and a method on String. No parentheses for arrays.",
          "Off-by-one loops using `i <= arr.length`, which always throws on the last iteration.",
          "Expecting an array to grow. Use `ArrayList` when the size is not known upfront.",
          "Calling `Arrays.binarySearch` on an unsorted array; the result is meaningless."
        ],
        "takeaways": [
          "Contiguous memory gives O(1) indexing and great cache locality.",
          "Fixed size; middle insertion and deletion are O(n).",
          "`ArrayList` wraps an array and resizes by copying, giving amortised O(1) append.",
          "Java bounds-checks every access."
        ]
      },
      {
        "id": "m15-l3",
        "title": "Lesson 15.3 Linked Lists",
        "objectives": [
          "Understand node-and-pointer structure.",
          "Compare LinkedList with ArrayList."
        ],
        "theory": "A **linked list** stores each element in a **node** that holds the value plus a reference to the next node. Nodes live wherever the heap has room — there is no contiguous block.\n\nThat inverts the array's trade-offs. Because there is no index arithmetic, reaching element *i* means walking from the head, so **access is O(n)**. But because inserting only means rewiring two references, **insertion and deletion at a known position are O(1)** — no shifting at all.\n\n| Operation | Array / ArrayList | LinkedList |\n|---|---|---|\n| Access by index | O(1) | O(n) |\n| Insert / delete at head | O(n) | O(1) |\n| Insert / delete at tail | O(1)* | O(1) |\n| Memory per element | value only | value + reference(s) |\n\nA **singly** linked list points forward only. A **doubly** linked list also points back, allowing backward traversal and O(1) removal given a node. Java's `java.util.LinkedList` is doubly linked and also implements `Deque`.\n\nIn practice `ArrayList` wins most of the time — cache locality beats theoretical complexity for typical sizes. Reach for `LinkedList` when you are constantly adding and removing at the ends, which is exactly the queue and deque use case.\n\nThe classic interview technique here is **two pointers**: a slow pointer advancing one node and a fast pointer advancing two. When fast reaches the end, slow is at the middle. The same trick detects cycles — if the two ever meet, the list loops.",
        "syntax": "class Node {\n    int data;\n    Node next;\n    Node(int data) { this.data = data; }\n}",
        "codeExample": "public class LinkedListDemo {\n\n    static class Node {\n        int data;\n        Node next;\n        Node(int data) { this.data = data; }\n    }\n\n    static class SinglyLinkedList {\n        private Node head;\n        private int size;\n\n        // O(1) - just rewire the head\n        void addFirst(int data) {\n            Node node = new Node(data);\n            node.next = head;\n            head = node;\n            size++;\n        }\n\n        // O(n) - must walk to the tail\n        void addLast(int data) {\n            Node node = new Node(data);\n            if (head == null) { head = node; size++; return; }\n            Node current = head;\n            while (current.next != null) current = current.next;\n            current.next = node;\n            size++;\n        }\n\n        boolean remove(int data) {\n            if (head == null) return false;\n            if (head.data == data) { head = head.next; size--; return true; }\n            Node current = head;\n            while (current.next != null) {\n                if (current.next.data == data) {\n                    current.next = current.next.next;   // O(1) rewire\n                    size--;\n                    return true;\n                }\n                current = current.next;\n            }\n            return false;\n        }\n\n        // Classic interview problem: reverse in O(n) time, O(1) space\n        void reverse() {\n            Node prev = null, current = head;\n            while (current != null) {\n                Node next = current.next;\n                current.next = prev;\n                prev = current;\n                current = next;\n            }\n            head = prev;\n        }\n\n        // Two-pointer technique: slow moves 1, fast moves 2\n        Integer findMiddle() {\n            if (head == null) return null;\n            Node slow = head, fast = head;\n            while (fast.next != null && fast.next.next != null) {\n                slow = slow.next;\n                fast = fast.next.next;\n            }\n            return slow.data;\n        }\n\n        @Override\n        public String toString() {\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (Node n = head; n != null; n = n.next) {\n                sb.append(n.data);\n                if (n.next != null) sb.append(\" -> \");\n            }\n            return sb.append(\"] size=\").append(size).toString();\n        }\n    }\n\n    public static void main(String[] args) {\n        SinglyLinkedList list = new SinglyLinkedList();\n        list.addLast(10);\n        list.addLast(20);\n        list.addLast(30);\n        list.addFirst(5);\n\n        System.out.println(\"Built        : \" + list);\n        System.out.println(\"Middle       : \" + list.findMiddle());\n        list.remove(20);\n        System.out.println(\"After remove : \" + list);\n        list.reverse();\n        System.out.println(\"Reversed     : \" + list);\n    }\n}",
        "codeOutput": "Built        : [5 -> 10 -> 20 -> 30] size=4\nMiddle       : 10\nAfter remove : [5 -> 10 -> 30] size=3\nReversed     : [30 -> 10 -> 5] size=3",
        "mistakes": [
          "Losing the rest of the list during reversal by overwriting `current.next` before saving it.",
          "Forgetting the empty-list and single-node cases, which is where most null pointer bugs live.",
          "Indexing a LinkedList in a loop: `for (i...) list.get(i)` is O(n²). Use an iterator or enhanced for.",
          "Choosing LinkedList for random access — ArrayList is almost always the better default."
        ],
        "takeaways": [
          "Nodes plus references: O(n) access, O(1) insertion at a known position.",
          "Java's `LinkedList` is doubly linked and implements `Deque`.",
          "Prefer `ArrayList` unless you are working at the ends constantly.",
          "The slow/fast two-pointer pattern finds the middle and detects cycles."
        ]
      },
      {
        "id": "m15-l4",
        "title": "Lesson 15.4 Stacks",
        "objectives": [
          "Apply the LIFO principle.",
          "Use Deque as the modern stack.",
          "Solve bracket matching."
        ],
        "theory": "A **stack** is a LIFO structure: **Last In, First Out**. Think of a stack of plates — you add to the top and remove from the top. Only the top element is reachable.\n\nThree operations, all **O(1)**:\n\n- `push(x)` — add to the top.\n- `pop()` — remove and return the top.\n- `peek()` — look at the top without removing it.\n\nStacks appear everywhere. The JVM uses one for method calls, which is why infinite recursion throws `StackOverflowError`. Undo functionality, browser back buttons, expression evaluation, and depth-first search are all stack-driven.\n\nA note on the Java API: the legacy `java.util.Stack` class extends `Vector`, which makes every operation synchronised and — worse — exposes index-based access that breaks the LIFO abstraction. It also iterates bottom-to-top, which surprises everyone. **Use `ArrayDeque` instead**; the official documentation recommends it, and it is faster.\n\nThe canonical interview problem is **balanced brackets**: push every opening bracket, and on every closing bracket pop and check the pair matches. If the stack is empty when you need to pop, or non-empty at the end, the string is unbalanced.",
        "syntax": "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(10);\nint top = stack.peek();\nint removed = stack.pop();",
        "codeExample": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class StackDemo {\n\n    // Classic interview problem: are the brackets balanced?\n    static boolean isBalanced(String input) {\n        Deque<Character> stack = new ArrayDeque<>();\n\n        for (char c : input.toCharArray()) {\n            switch (c) {\n                case '(': case '[': case '{':\n                    stack.push(c);\n                    break;\n                case ')':\n                    if (stack.isEmpty() || stack.pop() != '(') return false;\n                    break;\n                case ']':\n                    if (stack.isEmpty() || stack.pop() != '[') return false;\n                    break;\n                case '}':\n                    if (stack.isEmpty() || stack.pop() != '{') return false;\n                    break;\n                default:\n                    break;\n            }\n        }\n        return stack.isEmpty();   // leftovers mean unclosed brackets\n    }\n\n    static String reverse(String text) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : text.toCharArray()) stack.push(c);\n\n        StringBuilder sb = new StringBuilder();\n        while (!stack.isEmpty()) sb.append(stack.pop());\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        stack.push(10);\n        stack.push(20);\n        stack.push(30);\n\n        System.out.println(\"Stack       : \" + stack);\n        System.out.println(\"peek()      : \" + stack.peek());\n        System.out.println(\"pop()       : \" + stack.pop());\n        System.out.println(\"After pop   : \" + stack);\n        System.out.println(\"size()      : \" + stack.size());\n\n        System.out.println(\"\\\"{[()]}\\\"   balanced : \" + isBalanced(\"{[()]}\"));\n        System.out.println(\"\\\"{[(])}\\\"   balanced : \" + isBalanced(\"{[(])}\"));\n        System.out.println(\"\\\"((\\\"       balanced : \" + isBalanced(\"((\"));\n\n        System.out.println(\"reverse     : \" + reverse(\"stack\"));\n    }\n}",
        "codeOutput": "Stack       : [30, 20, 10]\npeek()      : 30\npop()       : 30\nAfter pop   : [20, 10]\nsize()      : 2\n\"{[()]}\"   balanced : true\n\"{[(])}\"   balanced : false\n\"((\"       balanced : false",
        "mistakes": [
          "Calling `pop()` on an empty stack — `ArrayDeque` throws `NoSuchElementException`. Check `isEmpty()` first.",
          "Using the legacy `java.util.Stack`, which is synchronised, slower, and iterates in the wrong order.",
          "Forgetting the final `stack.isEmpty()` check in bracket matching, so `\"((\"` wrongly passes.",
          "Unbounded recursion, which overflows the JVM call stack."
        ],
        "takeaways": [
          "LIFO with O(1) push, pop and peek.",
          "Prefer `ArrayDeque` over the legacy `Stack` class.",
          "The JVM call stack is why deep recursion throws `StackOverflowError`.",
          "Bracket matching, undo, and DFS are the archetypal stack problems."
        ]
      },
      {
        "id": "m15-l5",
        "title": "Lesson 15.5 Queues",
        "objectives": [
          "Apply the FIFO principle.",
          "Distinguish Queue, Deque and PriorityQueue.",
          "Know the throwing and non-throwing method pairs."
        ],
        "theory": "A **queue** is FIFO: **First In, First Out** — a line at a counter. You add at the back (*enqueue*) and remove from the front (*dequeue*).\n\n`Queue` in Java is an interface with two parallel method sets, and knowing which is which matters:\n\n| Action | Throws on failure | Returns special value |\n|---|---|---|\n| Insert | `add(e)` | `offer(e)` → false |\n| Remove | `remove()` | `poll()` → null |\n| Inspect | `element()` | `peek()` → null |\n\nUse `offer` / `poll` / `peek` unless you actively want an exception on an empty or full queue.\n\nThree variants cover most needs:\n\n- **`LinkedList`** — a plain unbounded FIFO queue.\n- **`ArrayDeque`** — a double-ended queue, faster than LinkedList; add and remove at both ends. It serves as both stack and queue.\n- **`PriorityQueue`** — a heap. `poll()` returns the *smallest* element by natural ordering (or by a supplied `Comparator`), not the oldest. Insert and remove are O(log n), peek is O(1).\n\nOne warning about `PriorityQueue`: its `toString()` and its iterator expose the internal heap array, which is **not** in sorted order. Only repeated `poll()` gives you sorted output.\n\nQueues drive breadth-first search, task scheduling, and producer-consumer pipelines. For threads, use `BlockingQueue` from `java.util.concurrent`.",
        "syntax": "Queue<String> q = new LinkedList<>();\nq.offer(\"first\");\nString head = q.peek();\nString removed = q.poll();",
        "codeExample": "import java.util.ArrayDeque;\nimport java.util.Comparator;\nimport java.util.Deque;\nimport java.util.LinkedList;\nimport java.util.PriorityQueue;\nimport java.util.Queue;\n\npublic class QueueDemo {\n\n    record Task(String name, int priority) { }\n\n    public static void main(String[] args) {\n        // Plain FIFO\n        Queue<String> queue = new LinkedList<>();\n        queue.offer(\"Asha\");\n        queue.offer(\"Ravi\");\n        queue.offer(\"Meera\");\n\n        System.out.println(\"Queue    : \" + queue);\n        System.out.println(\"peek()   : \" + queue.peek());\n        System.out.println(\"poll()   : \" + queue.poll());\n        System.out.println(\"After    : \" + queue);\n        System.out.println(\"Empty poll returns null: \" + new LinkedList<String>().poll());\n\n        // Deque - insert and remove at both ends\n        Deque<Integer> deque = new ArrayDeque<>();\n        deque.offerFirst(1);\n        deque.offerLast(2);\n        deque.offerFirst(0);\n        System.out.println(\"Deque    : \" + deque);\n        System.out.println(\"pollFirst: \" + deque.pollFirst() + \", pollLast: \" + deque.pollLast());\n\n        // PriorityQueue - smallest first, not oldest first\n        PriorityQueue<Task> tasks = new PriorityQueue<>(Comparator.comparingInt(Task::priority));\n        tasks.offer(new Task(\"deploy\",  3));\n        tasks.offer(new Task(\"hotfix\",  1));\n        tasks.offer(new Task(\"cleanup\", 5));\n        tasks.offer(new Task(\"review\",  2));\n\n        System.out.println(\"Draining by priority:\");\n        while (!tasks.isEmpty()) {\n            Task t = tasks.poll();\n            System.out.println(\"  p\" + t.priority() + \" \" + t.name());\n        }\n    }\n}",
        "codeOutput": "Queue    : [Asha, Ravi, Meera]\npeek()   : Asha\npoll()   : Asha\nAfter    : [Ravi, Meera]\nEmpty poll returns null: null\nDeque    : [0, 1, 2]\npollFirst: 0, pollLast: 2\nDraining by priority:\n  p1 hotfix\n  p2 review\n  p3 cleanup\n  p5 deploy",
        "mistakes": [
          "Calling `remove()` or `element()` on an empty queue and getting `NoSuchElementException` instead of `null`.",
          "Trusting `PriorityQueue.toString()` to be sorted — it shows raw heap order.",
          "Using a plain `Queue` across threads. Use `BlockingQueue` for producer-consumer.",
          "Adding elements to a `PriorityQueue` whose type has no natural ordering and supplying no comparator, which throws `ClassCastException` at insert time."
        ],
        "takeaways": [
          "FIFO: `offer` at the back, `poll` from the front.",
          "`offer` / `poll` / `peek` return special values; `add` / `remove` / `element` throw.",
          "`ArrayDeque` is the fast general-purpose queue and stack.",
          "`PriorityQueue` orders by comparator, giving O(log n) insert and remove."
        ]
      },
      {
        "id": "m15-l6",
        "title": "Lesson 15.6 Trees",
        "objectives": [
          "Understand binary search tree structure.",
          "Implement the three depth-first traversals.",
          "Explain why balance matters."
        ],
        "theory": "A **tree** is a hierarchical structure of nodes with a single **root** and no cycles. Each node has children; nodes with none are **leaves**. The **height** is the longest root-to-leaf path.\n\nA **binary tree** allows at most two children per node. A **binary search tree** (BST) adds the ordering invariant that makes it useful:\n\n> everything in the left subtree is smaller than the node; everything in the right subtree is larger.\n\nThat invariant lets you discard half the remaining tree at every comparison, giving **O(log n)** search, insert and delete — provided the tree is balanced.\n\nThe catch: inserting already-sorted data produces a tree where every node has one child. It has degenerated into a linked list and every operation is **O(n)**. Self-balancing variants such as **AVL** and **red-black trees** rotate on insertion to keep the height logarithmic. Java's `TreeMap` and `TreeSet` are red-black trees, which is why they guarantee O(log n).\n\nThree depth-first traversals, each named for when the node itself is visited:\n\n- **In-order** (left, node, right) — on a BST this emits elements **in sorted order**.\n- **Pre-order** (node, left, right) — used to copy or serialise a tree.\n- **Post-order** (left, right, node) — used to delete a tree, children first.\n\nThere is also **level-order** (breadth-first), which uses a queue and visits the tree row by row.",
        "syntax": "class TreeNode {\n    int value;\n    TreeNode left, right;\n    TreeNode(int value) { this.value = value; }\n}",
        "codeExample": "import java.util.ArrayList;\nimport java.util.LinkedList;\nimport java.util.List;\nimport java.util.Queue;\n\npublic class BinarySearchTree {\n\n    static class TreeNode {\n        int value;\n        TreeNode left, right;\n        TreeNode(int value) { this.value = value; }\n    }\n\n    private TreeNode root;\n\n    // O(log n) when balanced, O(n) when degenerate\n    void insert(int value) {\n        root = insertRec(root, value);\n    }\n\n    private TreeNode insertRec(TreeNode node, int value) {\n        if (node == null) return new TreeNode(value);\n        if (value < node.value)      node.left  = insertRec(node.left, value);\n        else if (value > node.value) node.right = insertRec(node.right, value);\n        return node;   // duplicates ignored\n    }\n\n    boolean contains(int value) {\n        TreeNode current = root;\n        while (current != null) {\n            if (value == current.value) return true;\n            current = value < current.value ? current.left : current.right;\n        }\n        return false;\n    }\n\n    // In-order on a BST yields sorted output\n    List<Integer> inOrder() {\n        List<Integer> out = new ArrayList<>();\n        inOrderRec(root, out);\n        return out;\n    }\n\n    private void inOrderRec(TreeNode n, List<Integer> out) {\n        if (n == null) return;\n        inOrderRec(n.left, out);\n        out.add(n.value);\n        inOrderRec(n.right, out);\n    }\n\n    List<Integer> preOrder() {\n        List<Integer> out = new ArrayList<>();\n        preOrderRec(root, out);\n        return out;\n    }\n\n    private void preOrderRec(TreeNode n, List<Integer> out) {\n        if (n == null) return;\n        out.add(n.value);\n        preOrderRec(n.left, out);\n        preOrderRec(n.right, out);\n    }\n\n    List<Integer> postOrder() {\n        List<Integer> out = new ArrayList<>();\n        postOrderRec(root, out);\n        return out;\n    }\n\n    private void postOrderRec(TreeNode n, List<Integer> out) {\n        if (n == null) return;\n        postOrderRec(n.left, out);\n        postOrderRec(n.right, out);\n        out.add(n.value);\n    }\n\n    // Breadth-first, using a queue\n    List<Integer> levelOrder() {\n        List<Integer> out = new ArrayList<>();\n        if (root == null) return out;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            TreeNode n = q.poll();\n            out.add(n.value);\n            if (n.left  != null) q.offer(n.left);\n            if (n.right != null) q.offer(n.right);\n        }\n        return out;\n    }\n\n    int height(TreeNode n) {\n        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));\n    }\n\n    public static void main(String[] args) {\n        BinarySearchTree tree = new BinarySearchTree();\n        int[] values = {50, 30, 70, 20, 40, 60, 80};\n        for (int v : values) tree.insert(v);\n\n        System.out.println(\"In-order    : \" + tree.inOrder());\n        System.out.println(\"Pre-order   : \" + tree.preOrder());\n        System.out.println(\"Post-order  : \" + tree.postOrder());\n        System.out.println(\"Level-order : \" + tree.levelOrder());\n        System.out.println(\"contains(40): \" + tree.contains(40));\n        System.out.println(\"contains(45): \" + tree.contains(45));\n        System.out.println(\"Height      : \" + tree.height(tree.root));\n\n        // Degenerate case: sorted input becomes a linked list\n        BinarySearchTree skewed = new BinarySearchTree();\n        for (int v : new int[]{1, 2, 3, 4, 5}) skewed.insert(v);\n        System.out.println(\"Skewed height (n=5): \" + skewed.height(skewed.root));\n    }\n}",
        "codeOutput": "In-order    : [20, 30, 40, 50, 60, 70, 80]\nPre-order   : [50, 30, 20, 40, 70, 60, 80]\nPost-order  : [20, 40, 30, 60, 80, 70, 50]\nLevel-order : [50, 30, 70, 20, 40, 60, 80]\ncontains(40): true\ncontains(45): false\nHeight      : 3\nSkewed height (n=5): 5",
        "mistakes": [
          "Inserting sorted data into a plain BST and losing all O(log n) guarantees.",
          "Forgetting the `node == null` base case, causing a NullPointerException or infinite recursion.",
          "Mixing up the traversals — only *in-order* gives sorted output on a BST.",
          "Assuming any binary tree is a BST. The ordering invariant must actually hold."
        ],
        "takeaways": [
          "A BST keeps smaller values left and larger values right.",
          "Balanced gives O(log n); degenerate gives O(n).",
          "In-order = sorted, pre-order = copy, post-order = delete.",
          "`TreeMap` and `TreeSet` are red-black trees with guaranteed O(log n)."
        ]
      },
      {
        "id": "m15-l7",
        "title": "Lesson 15.7 Graphs",
        "objectives": [
          "Represent a graph in code.",
          "Implement BFS and DFS.",
          "Choose the right traversal for the problem."
        ],
        "theory": "A **graph** is a set of **vertices** connected by **edges**. Unlike a tree it may contain cycles and need not be connected. Social networks, road maps, dependency graphs and web links are all graphs.\n\nTerminology: edges are **directed** (one-way) or **undirected** (both ways), and **weighted** if they carry a cost.\n\nTwo representations dominate:\n\n- **Adjacency list** — a map from each vertex to its neighbours. Space O(V + E). Best for sparse graphs, which is nearly all real ones.\n- **Adjacency matrix** — a V×V grid of booleans. Space O(V²), but edge lookup is O(1). Use only for dense graphs.\n\nTwo traversals, both O(V + E) with an adjacency list:\n\n- **BFS** (breadth-first) uses a **queue** and explores level by level. On an unweighted graph it finds the **shortest path** in edges — that guarantee is its whole point.\n- **DFS** (depth-first) uses a **stack**, or recursion, and follows one branch to its end before backtracking. Use it for cycle detection, topological sorting, and connected components.\n\nThe non-negotiable detail is the **visited set**. A graph can contain cycles, and a traversal without a visited set will loop forever. This is the single most common graph bug.\n\nFor weighted shortest paths, BFS is not enough — that is Dijkstra's algorithm, which is BFS with a priority queue.",
        "syntax": "Map<String, List<String>> graph = new HashMap<>();\ngraph.computeIfAbsent(\"A\", k -> new ArrayList<>()).add(\"B\");",
        "codeExample": "import java.util.*;\n\npublic class GraphDemo {\n\n    private final Map<String, List<String>> adjacency = new HashMap<>();\n\n    void addVertex(String v) {\n        adjacency.putIfAbsent(v, new ArrayList<>());\n    }\n\n    void addEdge(String a, String b) {\n        addVertex(a);\n        addVertex(b);\n        adjacency.get(a).add(b);\n        adjacency.get(b).add(a);   // undirected\n    }\n\n    // BFS - queue, level by level, finds shortest unweighted path\n    List<String> bfs(String start) {\n        List<String> order = new ArrayList<>();\n        Set<String> visited = new HashSet<>();\n        Queue<String> queue = new LinkedList<>();\n\n        queue.offer(start);\n        visited.add(start);\n\n        while (!queue.isEmpty()) {\n            String current = queue.poll();\n            order.add(current);\n            for (String neighbour : adjacency.getOrDefault(current, List.of())) {\n                if (visited.add(neighbour)) {   // add() returns false if already present\n                    queue.offer(neighbour);\n                }\n            }\n        }\n        return order;\n    }\n\n    // DFS - recursion (an implicit stack)\n    List<String> dfs(String start) {\n        List<String> order = new ArrayList<>();\n        dfsRec(start, new HashSet<>(), order);\n        return order;\n    }\n\n    private void dfsRec(String node, Set<String> visited, List<String> order) {\n        if (!visited.add(node)) return;   // already seen - prevents infinite loops\n        order.add(node);\n        for (String neighbour : adjacency.getOrDefault(node, List.of())) {\n            dfsRec(neighbour, visited, order);\n        }\n    }\n\n    // BFS tracking predecessors gives the shortest path itself\n    List<String> shortestPath(String from, String to) {\n        Map<String, String> parent = new HashMap<>();\n        Set<String> visited = new HashSet<>(Set.of(from));\n        Queue<String> queue = new LinkedList<>(List.of(from));\n\n        while (!queue.isEmpty()) {\n            String current = queue.poll();\n            if (current.equals(to)) break;\n            for (String neighbour : adjacency.getOrDefault(current, List.of())) {\n                if (visited.add(neighbour)) {\n                    parent.put(neighbour, current);\n                    queue.offer(neighbour);\n                }\n            }\n        }\n\n        if (!to.equals(from) && !parent.containsKey(to)) return List.of();\n\n        LinkedList<String> path = new LinkedList<>();\n        for (String at = to; at != null; at = parent.get(at)) path.addFirst(at);\n        return path;\n    }\n\n    public static void main(String[] args) {\n        GraphDemo g = new GraphDemo();\n        g.addEdge(\"A\", \"B\");\n        g.addEdge(\"A\", \"C\");\n        g.addEdge(\"B\", \"D\");\n        g.addEdge(\"C\", \"E\");\n        g.addEdge(\"D\", \"E\");\n        g.addEdge(\"E\", \"F\");\n\n        System.out.println(\"BFS from A     : \" + g.bfs(\"A\"));\n        System.out.println(\"DFS from A     : \" + g.dfs(\"A\"));\n        System.out.println(\"Shortest A -> F: \" + g.shortestPath(\"A\", \"F\"));\n    }\n}",
        "codeOutput": "BFS from A     : [A, B, C, D, E, F]\nDFS from A     : [A, B, D, E, C, F]\nShortest A -> F: [A, C, E, F]",
        "mistakes": [
          "Omitting the visited set, so any cycle causes an infinite loop or stack overflow.",
          "Marking a node visited when you dequeue it rather than when you enqueue it, which lets duplicates into the queue.",
          "Using DFS to find a shortest path — only BFS guarantees it on unweighted graphs.",
          "Choosing an adjacency matrix for a large sparse graph and wasting O(V²) memory."
        ],
        "takeaways": [
          "Adjacency list for sparse graphs, matrix for dense ones.",
          "BFS uses a queue and finds shortest unweighted paths; DFS uses a stack and explores deeply.",
          "Both are O(V + E) with an adjacency list.",
          "The visited set is mandatory — graphs have cycles."
        ]
      },
      {
        "id": "m15-l8",
        "title": "Lesson 15.8 Searching Algorithms",
        "objectives": [
          "Implement linear and binary search.",
          "Know the precondition binary search requires.",
          "Avoid the classic overflow bug."
        ],
        "theory": "**Linear search** checks each element in turn. It is **O(n)**, works on any collection, and needs no preparation. For small or unsorted data it is the right answer.\n\n**Binary search** requires **sorted** data and repeatedly halves the search space. Compare the middle element: equal means found, smaller means discard the left half, larger means discard the right. Each step eliminates half the candidates, giving **O(log n)**.\n\nThe difference is dramatic. Searching a million sorted elements takes at most 20 comparisons instead of a million.\n\nBut the precondition is absolute: **on unsorted data binary search returns garbage, silently**. It does not throw. If you must sort first, that is O(n log n), so a single search is not worth it — binary search pays off when you search the same sorted data repeatedly.\n\nTwo implementation details separate correct code from subtly broken code:\n\n1. **Overflow.** Writing `(low + high) / 2` can overflow `int` for very large arrays. The correct form is `low + (high - low) / 2`. This bug lived in the JDK's own binary search for nine years.\n2. **Loop condition.** It must be `low <= high`, not `low < high`, or you miss the case where the target is the final remaining element.\n\nIn practice, use `Arrays.binarySearch` or `Collections.binarySearch`. Note their return value: a non-negative index when found, and `-(insertionPoint) - 1` when not — which is useful for finding where a value *would* go.",
        "syntax": "int mid = low + (high - low) / 2;   // overflow-safe\nwhile (low <= high) { ... }         // note <=",
        "codeExample": "import java.util.Arrays;\n\npublic class SearchingDemo {\n\n    // O(n) - works on anything\n    static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n\n    // O(log n) - REQUIRES sorted input\n    static int binarySearch(int[] sorted, int target) {\n        int low = 0, high = sorted.length - 1;\n\n        while (low <= high) {                       // <= not <\n            int mid = low + (high - low) / 2;       // overflow-safe\n\n            if (sorted[mid] == target) return mid;\n            if (sorted[mid] < target) low = mid + 1;\n            else                      high = mid - 1;\n        }\n        return -1;\n    }\n\n    static int binarySearchRec(int[] sorted, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (sorted[mid] == target) return mid;\n        return sorted[mid] < target\n            ? binarySearchRec(sorted, target, mid + 1, high)\n            : binarySearchRec(sorted, target, low, mid - 1);\n    }\n\n    public static void main(String[] args) {\n        int[] sorted   = {11, 23, 34, 45, 56, 67, 78, 89};\n        int[] unsorted = {45, 11, 89, 23, 67, 34, 78, 56};\n\n        System.out.println(\"Sorted array   : \" + Arrays.toString(sorted));\n        System.out.println(\"linear(67)     : index \" + linearSearch(sorted, 67));\n        System.out.println(\"binary(67)     : index \" + binarySearch(sorted, 67));\n        System.out.println(\"binary(99)     : \" + binarySearch(sorted, 99) + \" (not found)\");\n        System.out.println(\"recursive(23)  : index \" + binarySearchRec(sorted, 23, 0, sorted.length - 1));\n\n        // The silent failure mode\n        System.out.println(\"\\nUnsorted array : \" + Arrays.toString(unsorted));\n        System.out.println(\"linear(34)     : index \" + linearSearch(unsorted, 34) + \" (correct)\");\n        System.out.println(\"binary(34)     : \" + binarySearch(unsorted, 34) + \" (WRONG - input not sorted)\");\n\n        // Library version: negative result encodes the insertion point\n        int miss = Arrays.binarySearch(sorted, 50);\n        System.out.println(\"\\nArrays.binarySearch(50) = \" + miss\n                         + \" -> would insert at index \" + (-miss - 1));\n    }\n}",
        "codeOutput": "Sorted array   : [11, 23, 34, 45, 56, 67, 78, 89]\nlinear(67)     : index 5\nbinary(67)     : index 5\nbinary(99)     : -1 (not found)\nrecursive(23)  : index 1\n\nUnsorted array : [45, 11, 89, 23, 67, 34, 78, 56]\nlinear(34)     : index 5 (correct)\nbinary(34)     : -1 (WRONG - input not sorted)\n\nArrays.binarySearch(50) = -5 -> would insert at index 4",
        "mistakes": [
          "Running binary search on unsorted data. It fails silently rather than throwing.",
          "Writing `(low + high) / 2`, which overflows for very large arrays.",
          "Using `while (low < high)` and missing the single-element case.",
          "Forgetting `mid + 1` / `mid - 1` and looping forever because the range never shrinks.",
          "Treating the negative return of `Arrays.binarySearch` as a plain \"not found\" flag — it encodes the insertion point."
        ],
        "takeaways": [
          "Linear search: O(n), no preconditions. Binary search: O(log n), sorted input required.",
          "Use `low + (high - low) / 2` to avoid overflow.",
          "The loop condition must be `low <= high`.",
          "Sorting to enable one binary search is not worth it; sorting for many searches is."
        ]
      },
      {
        "id": "m15-l9",
        "title": "Lesson 15.9 Sorting Algorithms",
        "objectives": [
          "Implement the classic O(n²) and O(n log n) sorts.",
          "Compare them on stability and space.",
          "Know what Java actually uses."
        ],
        "theory": "Sorting is the most studied problem in computing, and the algorithms are a standard interview topic.\n\n**The simple O(n²) sorts** are educational rather than practical:\n\n- **Bubble sort** repeatedly swaps adjacent out-of-order pairs. With an early-exit flag it is O(n) on already-sorted input.\n- **Selection sort** finds the minimum and swaps it into place. Always O(n²), but makes only O(n) swaps — useful when writes are expensive.\n- **Insertion sort** builds a sorted prefix one element at a time. Genuinely fast on small or nearly-sorted arrays, which is why real libraries fall back to it below ~47 elements.\n\n**The efficient O(n log n) sorts:**\n\n- **Merge sort** splits, sorts each half recursively, and merges. Guaranteed O(n log n) in every case and **stable**, but needs O(n) extra space.\n- **Quicksort** partitions around a pivot and recurses. O(n log n) average with O(log n) space and excellent constants, but O(n²) worst case if pivots are chosen badly. Randomised or median-of-three pivots make that essentially impossible.\n\n**Stability** means equal elements keep their original relative order. It matters when you sort by one key and then another — sort by name, then stably by department, and within each department names remain alphabetical.\n\nWhat Java actually does: `Arrays.sort` on **primitives** uses dual-pivot quicksort (fast, not stable — irrelevant for primitives). On **objects** it uses TimSort, a merge/insertion hybrid that is stable and exploits existing runs. `Collections.sort` delegates to the same TimSort.",
        "syntax": "Arrays.sort(primitiveArray);              // dual-pivot quicksort\nArrays.sort(objectArray);                 // TimSort, stable\nlist.sort(Comparator.comparing(X::key));  // TimSort, stable",
        "codeExample": "import java.util.Arrays;\n\npublic class SortingDemo {\n\n    // O(n^2), stable, O(1) space. Early exit makes it O(n) on sorted input.\n    static void bubbleSort(int[] a) {\n        for (int i = 0; i < a.length - 1; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < a.length - 1 - i; j++) {\n                if (a[j] > a[j + 1]) {\n                    int tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp;\n                    swapped = true;\n                }\n            }\n            if (!swapped) return;\n        }\n    }\n\n    // O(n^2) always, but only O(n) swaps\n    static void selectionSort(int[] a) {\n        for (int i = 0; i < a.length - 1; i++) {\n            int min = i;\n            for (int j = i + 1; j < a.length; j++) {\n                if (a[j] < a[min]) min = j;\n            }\n            int tmp = a[i]; a[i] = a[min]; a[min] = tmp;\n        }\n    }\n\n    // O(n^2) worst, O(n) on nearly-sorted data\n    static void insertionSort(int[] a) {\n        for (int i = 1; i < a.length; i++) {\n            int key = a[i], j = i - 1;\n            while (j >= 0 && a[j] > key) {\n                a[j + 1] = a[j];\n                j--;\n            }\n            a[j + 1] = key;\n        }\n    }\n\n    // O(n log n) guaranteed, stable, O(n) extra space\n    static void mergeSort(int[] a, int low, int high) {\n        if (low >= high) return;\n        int mid = low + (high - low) / 2;\n        mergeSort(a, low, mid);\n        mergeSort(a, mid + 1, high);\n        merge(a, low, mid, high);\n    }\n\n    private static void merge(int[] a, int low, int mid, int high) {\n        int[] left  = Arrays.copyOfRange(a, low, mid + 1);\n        int[] right = Arrays.copyOfRange(a, mid + 1, high + 1);\n\n        int i = 0, j = 0, k = low;\n        while (i < left.length && j < right.length) {\n            a[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];   // <= keeps it stable\n        }\n        while (i < left.length)  a[k++] = left[i++];\n        while (j < right.length) a[k++] = right[j++];\n    }\n\n    // O(n log n) average, O(log n) space, not stable\n    static void quickSort(int[] a, int low, int high) {\n        if (low >= high) return;\n        int p = partition(a, low, high);\n        quickSort(a, low, p - 1);\n        quickSort(a, p + 1, high);\n    }\n\n    private static int partition(int[] a, int low, int high) {\n        int pivot = a[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (a[j] < pivot) {\n                i++;\n                int tmp = a[i]; a[i] = a[j]; a[j] = tmp;\n            }\n        }\n        int tmp = a[i + 1]; a[i + 1] = a[high]; a[high] = tmp;\n        return i + 1;\n    }\n\n    public static void main(String[] args) {\n        int[] base = {64, 25, 12, 22, 11, 90, 34};\n\n        int[] a = base.clone(); bubbleSort(a);\n        System.out.println(\"Bubble    : \" + Arrays.toString(a));\n\n        int[] b = base.clone(); selectionSort(b);\n        System.out.println(\"Selection : \" + Arrays.toString(b));\n\n        int[] c = base.clone(); insertionSort(c);\n        System.out.println(\"Insertion : \" + Arrays.toString(c));\n\n        int[] d = base.clone(); mergeSort(d, 0, d.length - 1);\n        System.out.println(\"Merge     : \" + Arrays.toString(d));\n\n        int[] e = base.clone(); quickSort(e, 0, e.length - 1);\n        System.out.println(\"Quick     : \" + Arrays.toString(e));\n\n        int[] f = base.clone(); Arrays.sort(f);\n        System.out.println(\"Arrays    : \" + Arrays.toString(f));\n    }\n}",
        "codeOutput": "Bubble    : [11, 12, 22, 25, 34, 64, 90]\nSelection : [11, 12, 22, 25, 34, 64, 90]\nInsertion : [11, 12, 22, 25, 34, 64, 90]\nMerge     : [11, 12, 22, 25, 34, 64, 90]\nQuick     : [11, 12, 22, 25, 34, 64, 90]\nArrays    : [11, 12, 22, 25, 34, 64, 90]",
        "mistakes": [
          "Off-by-one in the bubble sort inner bound (`j < a.length - 1 - i`), causing an out-of-bounds read.",
          "Using `<` instead of `<=` in the merge step, which silently destroys stability.",
          "Always taking the last element as the quicksort pivot, giving O(n²) on already-sorted input.",
          "Hand-rolling a sort in production instead of calling `Arrays.sort` or `Collections.sort`.",
          "Claiming quicksort is O(n log n) worst case in an interview — it is O(n²)."
        ],
        "takeaways": [
          "Bubble, selection and insertion are O(n²); merge and quick are O(n log n).",
          "Merge sort is stable with O(n) space; quicksort is in-place but unstable.",
          "Stability preserves the order of equal elements — essential for multi-key sorting.",
          "Java uses dual-pivot quicksort for primitives and stable TimSort for objects."
        ]
      }
    ],
    exercise: {
      title: 'Reverse a linked list and detect a cycle',
      description: 'Implement two classic interview problems on a singly linked list.',
      instructions: ['Reverse the list iteratively in O(n) time and O(1) space - save next before rewiring.', 'Use the slow/fast two-pointer technique to find the middle node.', 'Extend the same technique to detect whether the list contains a cycle.'],
      starterCode: 'public class Solution {\n    static class Node {\n        int data; Node next;\n        Node(int data) { this.data = data; }\n    }\n\n    static Node reverse(Node head) {\n        // TODO: prev / current / next rewiring loop\n        return head;\n    }\n}',
      expectedOutput: 'Original: [1 -> 2 -> 3 -> 4]\nReversed: [4 -> 3 -> 2 -> 1]',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'What is the search time complexity of Binary Search?', options: ['A. O(N)', 'B. O(log N)', 'C. O(N^2)', 'D. O(1)'], correctAnswer: 'B. O(log N)' },
      { id: 2, question: 'Which data structure follows LIFO?', options: ['A. Queue', 'B. Stack', 'C. LinkedList', 'D. Matrix'], correctAnswer: 'B. Stack' },
      { id: 3, question: 'What traversal algorithm uses queues?', options: ['A. Depth First Search (DFS)', 'B. Breadth First Search (BFS)', 'C. In-order traversal', 'D. Binary search'], correctAnswer: 'B. Breadth First Search (BFS)' },
      { id: 4, question: 'What is the worst-case sorting complexity of Bubble Sort?', options: ['A. O(N log N)', 'B. O(N)', 'C. O(N^2)', 'D. O(log N)'], correctAnswer: 'C. O(N^2)' },
      { id: 5, question: 'What is the parent class interface for Queue implementations?', options: ['A. List', 'B. Queue', 'C. Deque', 'D. Set'], correctAnswer: 'B. Queue' },
      { id: 6, question: 'What is the time complexity of binary search?', options: ['A. O(1)', 'B. O(log n)', 'C. O(n)', 'D. O(n log n)'], correctAnswer: 'B. O(log n)' },
      { id: 7, question: 'What precondition does binary search require?', options: ['A. The data must be sorted', 'B. The data must be unique', 'C. The data must be numeric', 'D. None'], correctAnswer: 'A. The data must be sorted' },
      { id: 8, question: 'Why write `low + (high - low) / 2` instead of `(low + high) / 2`?', options: ['A. It is faster', 'B. To avoid integer overflow', 'C. It is more readable', 'D. No reason'], correctAnswer: 'B. To avoid integer overflow' },
      { id: 9, question: 'Which traversal of a BST produces sorted output?', options: ['A. Pre-order', 'B. In-order', 'C. Post-order', 'D. Level-order'], correctAnswer: 'B. In-order' },
      { id: 10, question: 'What happens to a plain BST when you insert already-sorted data?', options: ['A. Nothing changes', 'B. It degenerates into a linked list with O(n) operations', 'C. It rebalances', 'D. It throws'], correctAnswer: 'B. It degenerates into a linked list with O(n) operations' },
      { id: 11, question: 'Which Java classes are implemented as red-black trees?', options: ['A. HashMap and HashSet', 'B. TreeMap and TreeSet', 'C. ArrayList and LinkedList', 'D. ArrayDeque'], correctAnswer: 'B. TreeMap and TreeSet' },
      { id: 12, question: 'Which data structure does BFS use?', options: ['A. Stack', 'B. Queue', 'C. Heap', 'D. Tree'], correctAnswer: 'B. Queue' },
      { id: 13, question: 'Which data structure does DFS use?', options: ['A. Queue', 'B. Stack (or recursion)', 'C. HashMap', 'D. Array'], correctAnswer: 'B. Stack (or recursion)' },
      { id: 14, question: 'Which traversal guarantees the shortest path in an unweighted graph?', options: ['A. DFS', 'B. BFS', 'C. Either', 'D. Neither'], correctAnswer: 'B. BFS' },
      { id: 15, question: 'Why is a visited set mandatory in graph traversal?', options: ['A. For speed', 'B. Cycles would cause an infinite loop', 'C. To sort nodes', 'D. It is optional'], correctAnswer: 'B. Cycles would cause an infinite loop' },
      { id: 16, question: 'Which sorting algorithm is stable and guaranteed O(n log n)?', options: ['A. Quicksort', 'B. Merge sort', 'C. Selection sort', 'D. Heap sort'], correctAnswer: 'B. Merge sort' },
      { id: 17, question: 'What is the worst-case complexity of quicksort?', options: ['A. O(n log n)', 'B. O(n^2)', 'C. O(n)', 'D. O(log n)'], correctAnswer: 'B. O(n^2)' },
      { id: 18, question: 'What does sorting "stability" mean?', options: ['A. It never crashes', 'B. Equal elements keep their relative order', 'C. It uses constant memory', 'D. It is always fast'], correctAnswer: 'B. Equal elements keep their relative order' },
      { id: 19, question: 'Which algorithm does `Arrays.sort()` use for object arrays?', options: ['A. Quicksort', 'B. TimSort', 'C. Bubble sort', 'D. Heap sort'], correctAnswer: 'B. TimSort' },
      { id: 20, question: 'Which structure should you use for LIFO access?', options: ['A. Queue', 'B. ArrayDeque used as a stack', 'C. TreeMap', 'D. LinkedHashSet'], correctAnswer: 'B. ArrayDeque used as a stack' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a function that reverses a singly linked list in place.', language: 'java', starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        // Implement the algorithm and print the result\n    }\n}' },
        { kind: 'code', prompt: 'Show how to implement a queue using two stacks.', language: 'java', starterCode: 'import java.util.*;\n\nclass QueueFromStacks {\n    private final Deque<Integer> in = new ArrayDeque<>();\n    private final Deque<Integer> out = new ArrayDeque<>();\n\n    void enqueue(int x) {\n        // push onto in\n    }\n\n    int dequeue() {\n        // move in -> out only when out is empty\n        return -1;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Enqueue 1,2,3 then dequeue and print\n    }\n}' }
      ]
    }
  },
  m16: {
    id: 'm16',
    title: 'MODULE 16: SPRING BOOT FUNDAMENTALS',
    overview: 'Learn Spring Boot framework architectures: REST APIs, Controllers, Services, Repositories, and Dependency Injection.',
    outcomes: [
      'Configure Spring Boot projects using Spring Initializr.',
      'Build REST endpoints with @RestController.',
      'Use Dependency Injection with @Autowired.'
    ],
    lessons: [
      {
        "id": "m16-l1",
        "title": "Lesson 16.1 Introduction to Spring Boot",
        "objectives": [
          "Explain what Spring Boot adds to Spring.",
          "Understand auto-configuration and starters."
        ],
        "theory": "**Spring** is a framework for building Java applications around dependency injection. It is powerful but historically demanded enormous configuration — XML files, servlet descriptors, manual bean wiring. A \"hello world\" REST service could take an afternoon.\n\n**Spring Boot** is Spring with opinions. It keeps the framework and removes the ceremony, through three ideas:\n\n1. **Auto-configuration.** Boot inspects your classpath and configures sensible defaults. Find `spring-boot-starter-web` on the classpath and it configures an embedded Tomcat, a `DispatcherServlet`, and JSON conversion — with no configuration from you. Any default can be overridden.\n2. **Starters.** Curated dependency bundles with versions already reconciled. `spring-boot-starter-web` pulls in Spring MVC, Tomcat, Jackson and validation as one coherent set, eliminating version-conflict debugging.\n3. **Embedded server.** The application packages as a runnable JAR containing its own Tomcat. `java -jar app.jar` is the whole deployment. No external application server to install and configure — which is precisely what makes Boot the natural fit for containers and cloud platforms.\n\nThe entry point is a class annotated `@SpringBootApplication`. That single annotation is a composite of three: `@Configuration` (this class declares beans), `@EnableAutoConfiguration` (turn on the magic), and `@ComponentScan` (discover components in this package and below).\n\nThat last part explains the most common beginner failure: **classes outside the main class's package are never scanned**, so their beans silently do not exist.",
        "syntax": "@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}",
        "codeExample": "package com.skillofied.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.context.ApplicationContext;\n\n// Equivalent to @Configuration + @EnableAutoConfiguration + @ComponentScan\n@SpringBootApplication\npublic class Application {\n\n    public static void main(String[] args) {\n        ApplicationContext context = SpringApplication.run(Application.class, args);\n\n        System.out.println(\"Beans loaded : \" + context.getBeanDefinitionCount());\n        System.out.println(\"App name     : \" + context.getApplicationName());\n\n        // Auto-configuration registered these without any code from us\n        boolean hasTomcat = context.containsBean(\"tomcatServletWebServerFactory\");\n        System.out.println(\"Embedded Tomcat configured: \" + hasTomcat);\n    }\n}",
        "codeOutput": "  .   ____          _            __ _ _\n Spring Boot :: (v3.2.0)\n\nTomcat initialized with port(s): 8080 (http)\nStarted Application in 1.842 seconds (process running for 2.15)\nBeans loaded : 128\nApp name     :\nEmbedded Tomcat configured: true",
        "mistakes": [
          "Placing controllers or services in a package that is not under the main class's package — component scanning never finds them and requests 404.",
          "Adding individual Spring libraries instead of a starter, then fighting version conflicts.",
          "Assuming auto-configuration cannot be overridden. Define your own bean of the same type and Boot backs off.",
          "Confusing Spring Boot with Spring MVC. Boot is the configuration layer; MVC is the web framework it configures."
        ],
        "takeaways": [
          "Spring Boot is Spring plus auto-configuration, starters, and an embedded server.",
          "`@SpringBootApplication` bundles `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`.",
          "Component scanning starts at the main class's package — keep everything beneath it.",
          "The output is a self-contained runnable JAR."
        ]
      },
      {
        "id": "m16-l2",
        "title": "Lesson 16.2 Spring Boot Setup",
        "objectives": [
          "Generate a project with Spring Initializr.",
          "Understand pom.xml and application.properties."
        ],
        "theory": "The standard way to start is **Spring Initializr** at `start.spring.io`, also built into IntelliJ IDEA and VS Code. You pick the build tool, language, Boot version and starters, and it produces a working skeleton.\n\nFor a typical REST API you select: **Spring Web** (MVC and embedded Tomcat), **Spring Data JPA** (database access), a **driver** (MySQL or PostgreSQL), **Validation**, and **Spring Boot DevTools** (automatic restart on code change).\n\nThe generated project has a fixed shape:\n\n- `pom.xml` (or `build.gradle`) — dependencies. Note the `spring-boot-starter-parent`, which supplies a curated dependency-management section so you never write version numbers for Spring libraries.\n- `src/main/java` — your code, rooted at the package holding the main class.\n- `src/main/resources/application.properties` (or `.yml`) — configuration.\n- `src/test/java` — tests, with `spring-boot-starter-test` already wired up.\n- `mvnw` / `gradlew` — wrapper scripts, so contributors need no local Maven or Gradle install.\n\n`application.properties` is where you set the port, datasource URL, JPA behaviour and logging levels. Values can be **externalised** — an environment variable or a command-line argument overrides the file, which is how the same JAR runs unchanged in dev, staging and production.\n\n**Profiles** formalise this. Put environment-specific values in `application-dev.properties` and `application-prod.properties`, then activate one with `spring.profiles.active=prod`.",
        "syntax": "# application.properties\nserver.port=8081\nspring.datasource.url=jdbc:mysql://localhost:3306/school\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true",
        "codeExample": "<!-- pom.xml - generated by Spring Initializr -->\n<project>\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>3.2.0</version>\n    </parent>\n\n    <groupId>com.skillofied</groupId>\n    <artifactId>student-api</artifactId>\n    <version>1.0.0</version>\n\n    <properties>\n        <java.version>17</java.version>\n    </properties>\n\n    <dependencies>\n        <!-- No version tags: the parent manages them -->\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-data-jpa</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-validation</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>com.mysql</groupId>\n            <artifactId>mysql-connector-j</artifactId>\n            <scope>runtime</scope>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-devtools</artifactId>\n            <scope>runtime</scope>\n            <optional>true</optional>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-test</artifactId>\n            <scope>test</scope>\n        </dependency>\n    </dependencies>\n\n    <build>\n        <plugins>\n            <plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>\n        </plugins>\n    </build>\n</project>",
        "codeOutput": "$ ./mvnw spring-boot:run\n[INFO] Building student-api 1.0.0\n[INFO] BUILD SUCCESS\nTomcat started on port 8081 (http)\nStarted Application in 2.104 seconds",
        "mistakes": [
          "Adding explicit `<version>` tags for Spring dependencies and breaking the parent's curated set.",
          "Forgetting the database driver, which fails at startup with \"Failed to determine a suitable driver class\".",
          "Committing production credentials in `application.properties`. Use environment variables or profiles.",
          "Omitting `spring-boot-maven-plugin`, so `mvn package` produces a plain JAR that will not run."
        ],
        "takeaways": [
          "Generate projects with Spring Initializr rather than by hand.",
          "The starter parent manages versions — do not specify your own.",
          "`application.properties` is overridable by environment variables and CLI arguments.",
          "Profiles keep dev and prod configuration separate in one artifact."
        ]
      },
      {
        "id": "m16-l3",
        "title": "Lesson 16.3 REST APIs",
        "objectives": [
          "Explain REST principles.",
          "Map HTTP methods and status codes correctly."
        ],
        "theory": "**REST** (Representational State Transfer) is an architectural style for web APIs. Its rules are what make an API predictable to anyone who has used another one.\n\n**Resources are nouns, identified by URLs.** `/students` is the collection; `/students/7` is one member. Verbs do not belong in URLs — `/getStudent` and `/deleteStudent` are the classic beginner mistake, because the HTTP method already carries the verb.\n\n**The HTTP method is the operation:**\n\n| Method | Purpose | Idempotent | Safe |\n|---|---|---|---|\n| GET | read | yes | yes |\n| POST | create | no | no |\n| PUT | replace whole resource | yes | no |\n| PATCH | update part | no | no |\n| DELETE | remove | yes | no |\n\n*Idempotent* means repeating the call has the same effect as making it once. It matters because clients retry on network failure — a retried DELETE is harmless, a retried POST creates a duplicate.\n\n**Status codes are part of the contract:**\n\n- 200 OK, 201 Created (with a `Location` header), 204 No Content\n- 400 Bad Request, 401 Unauthorised, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable\n- 500 Internal Server Error\n\nReturning `200 OK` with `{\"error\": \"not found\"}` in the body defeats the point: clients, proxies and monitoring all key off the status code.\n\n**Statelessness** is the final principle. Each request carries everything needed to serve it — no server-side session — which is what lets you run twenty instances behind a load balancer.",
        "syntax": "GET    /api/students      -> 200 list\nGET    /api/students/7    -> 200 one, or 404\nPOST   /api/students      -> 201 + Location header\nPUT    /api/students/7    -> 200 replaced\nDELETE /api/students/7    -> 204 no content",
        "codeExample": "package com.skillofied.demo.controller;\n\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\nimport java.net.URI;\nimport java.util.*;\n\nrecord Student(Integer id, String name, String grade) { }\n\n@RestController                       // @Controller + @ResponseBody\n@RequestMapping(\"/api/students\")      // shared base path\npublic class StudentRestController {\n\n    private final Map<Integer, Student> store = new LinkedHashMap<>();\n    private int nextId = 1;\n\n    // GET /api/students?grade=A  -> 200\n    @GetMapping\n    public List<Student> list(@RequestParam(required = false) String grade) {\n        return store.values().stream()\n            .filter(s -> grade == null || s.grade().equals(grade))\n            .toList();\n    }\n\n    // GET /api/students/7  -> 200 or 404\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Student> getOne(@PathVariable Integer id) {\n        Student found = store.get(id);\n        return found == null\n            ? ResponseEntity.notFound().build()\n            : ResponseEntity.ok(found);\n    }\n\n    // POST /api/students  -> 201 with a Location header\n    @PostMapping\n    public ResponseEntity<Student> create(@RequestBody Student incoming) {\n        Student saved = new Student(nextId++, incoming.name(), incoming.grade());\n        store.put(saved.id(), saved);\n        return ResponseEntity\n            .created(URI.create(\"/api/students/\" + saved.id()))\n            .body(saved);\n    }\n\n    // PUT /api/students/7  -> 200 or 404\n    @PutMapping(\"/{id}\")\n    public ResponseEntity<Student> replace(@PathVariable Integer id, @RequestBody Student incoming) {\n        if (!store.containsKey(id)) return ResponseEntity.notFound().build();\n        Student updated = new Student(id, incoming.name(), incoming.grade());\n        store.put(id, updated);\n        return ResponseEntity.ok(updated);\n    }\n\n    // DELETE /api/students/7  -> 204 or 404\n    @DeleteMapping(\"/{id}\")\n    @ResponseStatus(HttpStatus.NO_CONTENT)\n    public ResponseEntity<Void> delete(@PathVariable Integer id) {\n        return store.remove(id) == null\n            ? ResponseEntity.notFound().build()\n            : ResponseEntity.noContent().build();\n    }\n}",
        "codeOutput": "$ curl -i -X POST localhost:8080/api/students \\\n    -H \"Content-Type: application/json\" \\\n    -d '{\"name\":\"Asha\",\"grade\":\"A\"}'\n\nHTTP/1.1 201 Created\nLocation: /api/students/1\nContent-Type: application/json\n\n{\"id\":1,\"name\":\"Asha\",\"grade\":\"A\"}\n\n$ curl -i localhost:8080/api/students/99\nHTTP/1.1 404 Not Found",
        "mistakes": [
          "Putting verbs in URLs: `/api/getAllStudents` instead of `GET /api/students`.",
          "Returning 200 for every outcome, including errors.",
          "Using GET for operations that change data — crawlers and prefetchers will trigger them.",
          "Omitting the `Location` header on 201 Created.",
          "Using `@Controller` instead of `@RestController` and getting a view-name lookup instead of JSON."
        ],
        "takeaways": [
          "URLs name resources; HTTP methods supply the verb.",
          "GET, PUT and DELETE are idempotent; POST and PATCH are not.",
          "Status codes are part of the API contract.",
          "`@RestController` serialises return values straight to JSON."
        ]
      },
      {
        "id": "m16-l4",
        "title": "Lesson 16.4 Controllers",
        "objectives": [
          "Map requests with Spring MVC annotations.",
          "Bind path variables, query parameters and request bodies."
        ],
        "theory": "A **controller** is the entry point for HTTP requests. Spring's `DispatcherServlet` receives every request and routes it to the handler method whose mapping matches.\n\n`@RestController` is `@Controller` plus `@ResponseBody`: return values are serialised directly into the response body — as JSON, via Jackson — rather than being treated as view names. Use plain `@Controller` only when rendering server-side templates.\n\n`@RequestMapping` at class level sets a base path; the method-level shortcuts `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping` and `@DeleteMapping` add the rest.\n\nFour binding annotations cover almost every case:\n\n- **`@PathVariable`** — a segment of the URL. `/students/{id}` → `@PathVariable Integer id`.\n- **`@RequestParam`** — a query-string parameter. `?page=2` → `@RequestParam int page`. Supports `defaultValue` and `required=false`.\n- **`@RequestBody`** — deserialise the JSON body into an object.\n- **`@RequestHeader`** — read a header such as `Authorization`.\n\nReturn either the object itself (Spring supplies 200) or a **`ResponseEntity<T>`** when you need control over the status code and headers.\n\nThe crucial architectural rule: **controllers should be thin**. Their job is to translate HTTP into a method call, delegate to a service, and translate the result back. Business logic in a controller cannot be reused or unit-tested without spinning up the web layer.",
        "syntax": "@GetMapping(\"/{id}\")\npublic ResponseEntity<Student> get(@PathVariable Long id,\n                                  @RequestParam(defaultValue = \"false\") boolean full) { }",
        "codeExample": "package com.skillofied.demo.controller;\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\nimport java.util.List;\nimport java.util.Map;\n\nrecord StudentDto(Long id, String name, String grade) { }\n\n@RestController\n@RequestMapping(\"/api/students\")\npublic class ControllerDemo {\n\n    // Thin controller: it delegates, it does not compute.\n    private final StudentService service;\n\n    public ControllerDemo(StudentService service) {\n        this.service = service;\n    }\n\n    // Path variable + query parameter with a default\n    // GET /api/students/7?includeGrades=true\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<StudentDto> getOne(\n            @PathVariable Long id,\n            @RequestParam(defaultValue = \"false\") boolean includeGrades) {\n\n        return service.findById(id)\n            .map(ResponseEntity::ok)\n            .orElseGet(() -> ResponseEntity.notFound().build());\n    }\n\n    // Paging via query parameters\n    // GET /api/students?page=0&size=20&sort=name\n    @GetMapping\n    public List<StudentDto> list(\n            @RequestParam(defaultValue = \"0\")    int page,\n            @RequestParam(defaultValue = \"20\")   int size,\n            @RequestParam(defaultValue = \"name\") String sort) {\n        return service.findAll(page, size, sort);\n    }\n\n    // Request body deserialised from JSON\n    @PostMapping\n    public ResponseEntity<StudentDto> create(@RequestBody StudentDto body) {\n        StudentDto saved = service.create(body);\n        return ResponseEntity.status(201).body(saved);\n    }\n\n    // Reading a header\n    @GetMapping(\"/whoami\")\n    public Map<String, String> whoami(@RequestHeader(\"Authorization\") String auth) {\n        return Map.of(\"tokenPresent\", String.valueOf(auth != null && !auth.isBlank()));\n    }\n\n    // Multiple path variables\n    @GetMapping(\"/{id}/subjects/{code}\")\n    public Map<String, Object> subject(@PathVariable Long id, @PathVariable String code) {\n        return Map.of(\"studentId\", id, \"subject\", code);\n    }\n}\n\ninterface StudentService {\n    java.util.Optional<StudentDto> findById(Long id);\n    List<StudentDto> findAll(int page, int size, String sort);\n    StudentDto create(StudentDto dto);\n}",
        "codeOutput": "$ curl localhost:8080/api/students/7\n{\"id\":7,\"name\":\"Asha Nair\",\"grade\":\"A\"}\n\n$ curl \"localhost:8080/api/students?page=0&size=2\"\n[{\"id\":1,\"name\":\"Asha Nair\",\"grade\":\"A\"},{\"id\":2,\"name\":\"Ravi Kumar\",\"grade\":\"B\"}]\n\n$ curl localhost:8080/api/students/7/subjects/CS101\n{\"studentId\":7,\"subject\":\"CS101\"}",
        "mistakes": [
          "Using `@Controller` without `@ResponseBody` and getting a 404 as Spring hunts for a view template.",
          "Naming the method parameter differently from the path placeholder without specifying `@PathVariable(\"id\")`.",
          "Putting business logic and database calls in the controller instead of delegating to a service.",
          "Forgetting `@RequestBody`, so Spring tries to bind JSON fields as query parameters and every field is null.",
          "Two methods mapped to the same path and method, which fails at startup with an ambiguous-mapping error."
        ],
        "takeaways": [
          "`@RestController` returns data; `@Controller` returns view names.",
          "`@PathVariable` for URL segments, `@RequestParam` for the query string, `@RequestBody` for JSON.",
          "`ResponseEntity` gives you control over status and headers.",
          "Keep controllers thin — delegate to services."
        ]
      },
      {
        "id": "m16-l5",
        "title": "Lesson 16.5 Services",
        "objectives": [
          "Place business logic in a service layer.",
          "Use @Service and @Transactional."
        ],
        "theory": "The **service layer** holds your business logic — the rules that make the application do something useful, as opposed to the plumbing of HTTP and SQL.\n\nWhy separate it at all? Three concrete reasons:\n\n1. **Reuse.** The same `enrolStudent` logic serves a REST endpoint, a scheduled job, and a CLI command. Logic trapped in a controller is reachable only over HTTP.\n2. **Testability.** A service is a plain object. Unit-testing it means `new StudentService(mockRepo)` — no server, no HTTP, millisecond tests.\n3. **Transaction boundaries.** A business operation often spans several repository calls that must succeed or fail together. The service is the natural place to draw that boundary.\n\n`@Service` marks the class as a Spring-managed bean. Functionally it is `@Component` with a clearer name, but that naming is not cosmetic — it documents the layer and lets tooling and aspects target services specifically.\n\n**`@Transactional`** is the annotation that earns the layer its keep. Spring wraps the method in a database transaction: it commits when the method returns normally and **rolls back automatically on an unchecked exception**. Two behaviours surprise people:\n\n- By default it rolls back on `RuntimeException` and `Error`, but **not on checked exceptions**. Use `@Transactional(rollbackFor = Exception.class)` if you need that.\n- It works by creating a **proxy**, so **calling a `@Transactional` method from another method in the same class bypasses it entirely** — the call never leaves the object, so the proxy never sees it. This is the single most common Spring transaction bug.\n\nUse `@Transactional(readOnly = true)` on query methods; it lets the persistence provider skip dirty-checking.",
        "syntax": "@Service\npublic class StudentService {\n\n    @Transactional\n    public Student enrol(Long id, String course) { ... }\n\n    @Transactional(readOnly = true)\n    public List<Student> findAll() { ... }\n}",
        "codeExample": "package com.skillofied.demo.service;\n\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\nimport java.util.Optional;\n\n@Service\npublic class StudentService {\n\n    private final StudentRepository repository;\n    private final AuditRepository audit;\n\n    // Constructor injection - no @Autowired needed for a single constructor\n    public StudentService(StudentRepository repository, AuditRepository audit) {\n        this.repository = repository;\n        this.audit = audit;\n    }\n\n    @Transactional(readOnly = true)\n    public List<Student> findAll() {\n        return repository.findAll();\n    }\n\n    @Transactional(readOnly = true)\n    public Optional<Student> findById(Long id) {\n        return repository.findById(id);\n    }\n\n    // Business rules live here, not in the controller\n    @Transactional\n    public Student enrol(Long studentId, String courseCode) {\n        Student student = repository.findById(studentId)\n            .orElseThrow(() -> new StudentNotFoundException(studentId));\n\n        if (student.getCourses().size() >= 6) {\n            throw new EnrolmentLimitException(\"A student may take at most 6 courses\");\n        }\n        if (student.getCourses().contains(courseCode)) {\n            throw new DuplicateEnrolmentException(courseCode);\n        }\n\n        student.getCourses().add(courseCode);\n        Student saved = repository.save(student);\n\n        // Both writes share one transaction: if the audit insert fails,\n        // the enrolment is rolled back too.\n        audit.record(\"ENROL\", studentId, courseCode);\n\n        return saved;\n    }\n\n    @Transactional\n    public void delete(Long id) {\n        if (!repository.existsById(id)) {\n            throw new StudentNotFoundException(id);\n        }\n        repository.deleteById(id);\n        audit.record(\"DELETE\", id, null);\n    }\n}\n\nclass StudentNotFoundException extends RuntimeException {\n    StudentNotFoundException(Long id) { super(\"No student with id \" + id); }\n}\nclass EnrolmentLimitException extends RuntimeException {\n    EnrolmentLimitException(String message) { super(message); }\n}\nclass DuplicateEnrolmentException extends RuntimeException {\n    DuplicateEnrolmentException(String code) { super(\"Already enrolled in \" + code); }\n}",
        "codeOutput": "$ curl -X POST localhost:8080/api/students/7/enrol?course=CS101\n{\"id\":7,\"name\":\"Asha Nair\",\"courses\":[\"CS101\"]}\n\n$ curl -X POST localhost:8080/api/students/7/enrol?course=CS101\n{\"status\":409,\"message\":\"Already enrolled in CS101\"}\n\n# Audit insert failed -> the enrolment was rolled back as well",
        "mistakes": [
          "Calling a `@Transactional` method from another method of the same class. The proxy is bypassed and no transaction starts.",
          "Expecting a rollback from a checked exception — the default only rolls back on unchecked ones.",
          "Catching an exception inside the transactional method and swallowing it, so Spring never sees a reason to roll back.",
          "Putting `@Transactional` on the controller instead of the service, stretching the transaction across the whole HTTP request.",
          "Leaking JPA entities out of the service; map to DTOs so lazy-loading does not explode during serialisation."
        ],
        "takeaways": [
          "Services hold business logic; controllers handle HTTP; repositories handle persistence.",
          "`@Transactional` commits on normal return and rolls back on unchecked exceptions.",
          "Self-invocation bypasses the proxy — the transaction will not start.",
          "Mark read paths `readOnly = true`."
        ]
      },
      {
        "id": "m16-l6",
        "title": "Lesson 16.6 Repositories",
        "objectives": [
          "Use Spring Data JPA repository interfaces.",
          "Write derived query methods.",
          "Know when to drop to @Query."
        ],
        "theory": "A **repository** is the persistence layer — the only place that talks to the database. Spring Data JPA makes this layer almost free: you declare an **interface**, and Spring generates the implementation at runtime.\n\nExtend one of the built-ins and you inherit a full CRUD API:\n\n- **`CrudRepository<T, ID>`** — `save`, `findById`, `findAll`, `deleteById`, `count`, `existsById`.\n- **`JpaRepository<T, ID>`** — all of the above plus paging, sorting, `flush`, and batch operations. This is the usual choice.\n\nThe part that feels like magic is **derived query methods**. Spring parses the *method name* and writes the query for you. `findByGradeAndAgeGreaterThan(String grade, int age)` becomes `SELECT s FROM Student s WHERE s.grade = ?1 AND s.age > ?2`. The vocabulary includes `And`, `Or`, `Between`, `LessThan`, `GreaterThan`, `Like`, `Containing`, `StartingWith`, `In`, `IsNull`, `OrderBy`, `Top`, `First`, `Distinct`.\n\nBecause the name *is* the query, **the property names in the method must match the entity's fields exactly**. A typo fails at application startup, not at runtime — noisy, but far better than silently wrong data.\n\nWhen a name would become unreadable, switch to **`@Query`** and write JPQL (which operates on entities) or native SQL (`nativeQuery = true`). Any modifying query needs `@Modifying` and must run inside a transaction.\n\nOne performance trap worth knowing early: the **N+1 select problem**. Fetch 100 students and then touch each one's lazily-loaded courses, and you have issued 101 queries. Fix it with `@EntityGraph` or a `JOIN FETCH` in an explicit `@Query`.",
        "syntax": "public interface StudentRepository extends JpaRepository<Student, Long> {\n    List<Student> findByGrade(String grade);\n    Optional<Student> findByEmail(String email);\n    List<Student> findByAgeGreaterThanOrderByNameAsc(int age);\n}",
        "codeExample": "package com.skillofied.demo.repository;\n\nimport org.springframework.data.domain.Page;\nimport org.springframework.data.domain.Pageable;\nimport org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport org.springframework.stereotype.Repository;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\nimport java.util.Optional;\n\n@Repository\npublic interface StudentRepository extends JpaRepository<Student, Long> {\n\n    // ---- Derived queries: Spring writes the SQL from the method name ----\n\n    List<Student> findByGrade(String grade);\n\n    Optional<Student> findByEmail(String email);\n\n    List<Student> findByAgeBetween(int min, int max);\n\n    List<Student> findByNameContainingIgnoreCase(String fragment);\n\n    List<Student> findByGradeAndAgeGreaterThanOrderByNameAsc(String grade, int age);\n\n    List<Student> findTop5ByOrderByAgeDesc();\n\n    boolean existsByEmail(String email);\n\n    long countByGrade(String grade);\n\n    // Paging comes for free\n    Page<Student> findByGrade(String grade, Pageable pageable);\n\n    // ---- Explicit JPQL when the method name would get silly ----\n\n    @Query(\"SELECT s FROM Student s WHERE s.grade = :grade AND s.age > :age\")\n    List<Student> search(@Param(\"grade\") String grade, @Param(\"age\") int age);\n\n    // JOIN FETCH avoids the N+1 problem by loading courses in one query\n    @Query(\"SELECT DISTINCT s FROM Student s LEFT JOIN FETCH s.courses\")\n    List<Student> findAllWithCourses();\n\n    // Native SQL when you need database-specific features\n    @Query(value = \"SELECT * FROM students WHERE YEAR(created_at) = :year\",\n           nativeQuery = true)\n    List<Student> findByEnrolmentYear(@Param(\"year\") int year);\n\n    // Modifying queries need @Modifying and a transaction\n    @Modifying\n    @Transactional\n    @Query(\"UPDATE Student s SET s.grade = :grade WHERE s.id = :id\")\n    int updateGrade(@Param(\"id\") Long id, @Param(\"grade\") String grade);\n}",
        "codeOutput": "# Hibernate logs the generated SQL (spring.jpa.show-sql=true)\n\nHibernate: select s1_0.id, s1_0.name, s1_0.grade, s1_0.age\n           from students s1_0 where s1_0.grade=?\n\nHibernate: select s1_0.id, s1_0.name from students s1_0\n           where upper(s1_0.name) like upper(?) escape '\\'\n\nHibernate: select distinct s1_0.id, c1_0.student_id, c1_0.code\n           from students s1_0 left join courses c1_0 on s1_0.id=c1_0.student_id",
        "mistakes": [
          "Misspelling a property in a derived method name — the application refuses to start with \"No property found for type\".",
          "Forgetting `@Modifying` on an UPDATE or DELETE `@Query`, which throws at runtime.",
          "Triggering N+1 selects by looping over entities and touching lazy associations. Use `JOIN FETCH` or `@EntityGraph`.",
          "Writing a derived method name so long it is unreadable; past three conditions, switch to `@Query`.",
          "Returning entities straight to the controller and hitting `LazyInitializationException` during JSON serialisation."
        ],
        "takeaways": [
          "Declare an interface; Spring Data generates the implementation.",
          "`JpaRepository` gives CRUD, paging and sorting for free.",
          "Method names are parsed into queries — spelling must match entity fields.",
          "Use `@Query` for complex cases and `JOIN FETCH` to avoid N+1."
        ]
      },
      {
        "id": "m16-l7",
        "title": "Lesson 16.7 Dependency Injection",
        "objectives": [
          "Explain Inversion of Control.",
          "Prefer constructor injection.",
          "Understand bean scopes."
        ],
        "theory": "**Inversion of Control** is the idea at the heart of Spring. Normally an object creates what it needs: `this.repo = new StudentRepository()`. That hard-codes the dependency — you cannot substitute a mock in a test or swap the implementation without editing the class.\n\nIoC inverts it. The object *declares* what it needs and the framework supplies it. **Dependency Injection** is how Spring performs that supply.\n\nThe **ApplicationContext** is the container. At startup it scans for `@Component` and its specialisations (`@Service`, `@Repository`, `@Controller`, `@RestController`), instantiates them, and wires them together by type.\n\nThere are three injection styles, and they are not equal:\n\n1. **Constructor injection — use this.** Dependencies become `final`, the object is impossible to construct in an invalid state, and testing needs no framework at all. Since Spring 4.3, a class with a single constructor needs no `@Autowired`.\n2. **Setter injection** — acceptable for genuinely optional dependencies.\n3. **Field injection** (`@Autowired` on the field) — avoid. Fields cannot be `final`, you cannot construct the object in a plain unit test, and it hides how many dependencies a class has, letting classes quietly grow bloated.\n\nWhen two beans implement the same interface, Spring cannot choose and startup fails. Disambiguate with **`@Primary`** on the default, or **`@Qualifier(\"name\")`** at the injection point.\n\n**Scopes** control lifecycle. The default `singleton` means one shared instance for the whole application — which is why **singleton beans must be stateless**. Mutable instance fields on a singleton service are shared across every concurrent request. `prototype` gives a new instance per injection; `request` and `session` apply to web applications.",
        "syntax": "@Service\npublic class StudentService {\n    private final StudentRepository repository;   // final = guaranteed set\n\n    public StudentService(StudentRepository repository) {\n        this.repository = repository;             // no @Autowired needed\n    }\n}",
        "codeExample": "package com.skillofied.demo;\n\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.*;\nimport org.springframework.stereotype.Service;\n\ninterface NotificationSender {\n    String send(String to, String message);\n}\n\n@Service\n@Primary                                   // the default choice\nclass EmailSender implements NotificationSender {\n    public String send(String to, String message) {\n        return \"EMAIL to \" + to + \": \" + message;\n    }\n}\n\n@Service\n@Qualifier(\"sms\")\nclass SmsSender implements NotificationSender {\n    public String send(String to, String message) {\n        return \"SMS to \" + to + \": \" + message;\n    }\n}\n\n// RECOMMENDED: constructor injection\n@Service\nclass EnrolmentService {\n    private final NotificationSender sender;   // final, always set\n\n    EnrolmentService(NotificationSender sender) {   // @Primary wins -> EmailSender\n        this.sender = sender;\n    }\n\n    String confirm(String student) {\n        return sender.send(student, \"Enrolment confirmed\");\n    }\n}\n\n// Choosing a non-primary bean explicitly\n@Service\nclass AlertService {\n    private final NotificationSender sender;\n\n    AlertService(@Qualifier(\"sms\") NotificationSender sender) {\n        this.sender = sender;\n    }\n\n    String alert(String student) {\n        return sender.send(student, \"Fee overdue\");\n    }\n}\n\n// DISCOURAGED: field injection - cannot be final, hard to unit test\n@Service\nclass LegacyService {\n    @Autowired\n    private NotificationSender sender;\n}\n\n// Beans for third-party classes you cannot annotate\n@Configuration\nclass AppConfig {\n\n    @Bean\n    public com.fasterxml.jackson.databind.ObjectMapper objectMapper() {\n        return new com.fasterxml.jackson.databind.ObjectMapper();\n    }\n\n    @Bean\n    @Scope(\"prototype\")   // a fresh instance at every injection point\n    public StringBuilder scratchBuffer() {\n        return new StringBuilder();\n    }\n}",
        "codeOutput": "EnrolmentService -> EMAIL to Asha: Enrolment confirmed\nAlertService     -> SMS to Ravi: Fee overdue\n\n# Without @Primary or @Qualifier, startup fails:\n# NoUniqueBeanDefinitionException: expected single matching bean but found 2",
        "mistakes": [
          "Using field injection, which prevents `final` fields and makes plain unit tests impossible.",
          "Two implementations of one interface with no `@Primary` or `@Qualifier`, causing `NoUniqueBeanDefinitionException` at startup.",
          "Storing mutable state in a singleton bean — it is shared across all concurrent requests.",
          "Instantiating a dependency with `new` inside a bean, which bypasses the container entirely.",
          "Circular constructor dependencies between two beans, which Spring Boot 2.6+ rejects at startup."
        ],
        "takeaways": [
          "IoC means the container supplies dependencies instead of the class creating them.",
          "Prefer constructor injection; it enables `final` fields and framework-free tests.",
          "Resolve ambiguity with `@Primary` or `@Qualifier`.",
          "Singleton is the default scope — keep those beans stateless."
        ]
      },
      {
        "id": "m16-l8",
        "title": "Lesson 16.8 Spring Boot Project Structure",
        "objectives": [
          "Lay out a project in conventional layers.",
          "Understand why DTOs exist."
        ],
        "theory": "Spring Boot does not force a structure, but there is a convention every team recognises. Following it means a new developer finds their way around in minutes.\n\nThe **layered** (package-by-layer) arrangement:\n\n```\ncom.skillofied.studentapi\n├── StudentApiApplication.java   <- main class, root package\n├── controller/    HTTP endpoints\n├── service/       business logic\n├── repository/    data access\n├── model/         JPA entities\n├── dto/           request and response shapes\n├── exception/     custom exceptions + @ControllerAdvice\n└── config/        @Configuration classes\n```\n\nThe non-negotiable rule: **the main class sits in the root package**, because `@ComponentScan` starts there. Anything in a sibling package is invisible to Spring.\n\nDependencies flow **strictly one way**: controller → service → repository. A repository must never call a service, and a controller must never touch a repository. This keeps layers independently testable and stops the codebase turning into a web of mutual calls.\n\n**Why DTOs?** It is tempting to return JPA entities straight from controllers, but that couples your public API to your database schema. Rename a column and you break every client. Worse, entities carry lazy associations that blow up during JSON serialisation, and they may contain fields — a password hash, an internal flag — that must never leave the server. A DTO is a plain object shaped for the API, mapped from the entity in the service layer.\n\nFor larger systems, **package-by-feature** (`student/`, `course/`, `enrolment/`, each containing its own controller, service and repository) scales better, because a change to one feature touches one directory instead of five.",
        "syntax": "com.skillofied.studentapi        <- @SpringBootApplication lives here\n  .controller  .service  .repository\n  .model  .dto  .exception  .config",
        "codeExample": "// ===== model/Student.java - the database shape =====\npackage com.skillofied.studentapi.model;\n\nimport jakarta.persistence.*;\n\n@Entity\n@Table(name = \"students\")\npublic class Student {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n    private String email;\n    private String passwordHash;   // must never reach a client\n    private String grade;\n\n    public Long getId() { return id; }\n    public String getName() { return name; }\n    public String getEmail() { return email; }\n    public String getGrade() { return grade; }\n    public void setName(String name) { this.name = name; }\n    public void setEmail(String email) { this.email = email; }\n    public void setGrade(String grade) { this.grade = grade; }\n}\n\n// ===== dto/StudentResponse.java - the API shape =====\npackage com.skillofied.studentapi.dto;\n\n// No passwordHash: the DTO decides what is public\npublic record StudentResponse(Long id, String name, String email, String grade) { }\n\n// ===== dto/StudentRequest.java =====\npackage com.skillofied.studentapi.dto;\n\nimport jakarta.validation.constraints.*;\n\npublic record StudentRequest(\n    @NotBlank(message = \"Name is required\")\n    String name,\n\n    @Email(message = \"Must be a valid email\")\n    String email,\n\n    @Pattern(regexp = \"[A-F][+-]?\", message = \"Grade must be A-F\")\n    String grade\n) { }\n\n// ===== service/StudentService.java - maps entity <-> DTO =====\npackage com.skillofied.studentapi.service;\n\nimport com.skillofied.studentapi.dto.*;\nimport com.skillofied.studentapi.model.Student;\nimport com.skillofied.studentapi.repository.StudentRepository;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\n\n@Service\npublic class StudentService {\n    private final StudentRepository repository;\n\n    public StudentService(StudentRepository repository) {\n        this.repository = repository;\n    }\n\n    @Transactional(readOnly = true)\n    public List<StudentResponse> findAll() {\n        return repository.findAll().stream().map(this::toDto).toList();\n    }\n\n    @Transactional\n    public StudentResponse create(StudentRequest request) {\n        Student entity = new Student();\n        entity.setName(request.name());\n        entity.setEmail(request.email());\n        entity.setGrade(request.grade());\n        return toDto(repository.save(entity));\n    }\n\n    // The boundary: entities stop here, DTOs travel outward\n    private StudentResponse toDto(Student s) {\n        return new StudentResponse(s.getId(), s.getName(), s.getEmail(), s.getGrade());\n    }\n}",
        "codeOutput": "student-api/\n├── src/main/java/com/skillofied/studentapi/\n│   ├── StudentApiApplication.java\n│   ├── controller/StudentController.java\n│   ├── service/StudentService.java\n│   ├── repository/StudentRepository.java\n│   ├── model/Student.java\n│   ├── dto/StudentRequest.java\n│   ├── dto/StudentResponse.java\n│   ├── exception/GlobalExceptionHandler.java\n│   └── config/SecurityConfig.java\n├── src/main/resources/application.properties\n└── pom.xml",
        "mistakes": [
          "Placing the main class in a sub-package, so component scanning misses everything above it.",
          "Returning JPA entities from controllers, coupling the API to the schema and risking leaked fields.",
          "Calling a repository directly from a controller and skipping the service layer.",
          "Creating a `util` package that becomes a dumping ground for unrelated code.",
          "Introducing a dependency from a lower layer up to a higher one."
        ],
        "takeaways": [
          "The main class belongs in the root package.",
          "Dependencies flow one way: controller → service → repository.",
          "DTOs decouple the API from the database schema and control what is exposed.",
          "Package-by-layer suits small projects; package-by-feature scales better."
        ]
      }
    ],
    exercise: {
      title: 'Build a REST controller with a service layer',
      description: 'Wire a thin controller to a service using constructor injection.',
      instructions: ['Create a @RestController with GET, POST and DELETE mappings under /api/students.', 'Inject the service through the constructor, not a field.', 'Return 201 with a Location header on create and 204 on delete.'],
      starterCode: '@RestController\n@RequestMapping("/api/students")\npublic class StudentController {\n\n    private final StudentService service;\n\n    // TODO: constructor injection\n\n    @GetMapping("/{id}")\n    public ResponseEntity<StudentDto> getOne(@PathVariable Long id) {\n        // TODO: return 200 or 404\n        return null;\n    }\n}',
      expectedOutput: 'POST /api/students -> 201 Created\nGET  /api/students/1 -> 200 OK\nDELETE /api/students/1 -> 204 No Content',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which annotation declares a REST API controller class?', options: ['A. @Controller', 'B. @RestController', 'C. @API', 'D. @RequestMapping'], correctAnswer: 'B. @RestController' },
      { id: 2, question: 'Which tool bootstraps Spring Boot starter projects?', options: ['A. Maven builder', 'B. Spring Initializr', 'C. NPM init', 'D. Gradle daemon'], correctAnswer: 'B. Spring Initializr' },
      { id: 3, question: 'Which annotation enables Dependency Injection in Spring?', options: ['A. @Inject', 'B. @Autowired', 'C. @Resource', 'D. @Bean'], correctAnswer: 'B. @Autowired' },
      { id: 4, question: 'What is the default embedded web server in Spring Boot?', options: ['A. Nginx', 'B. Jetty', 'C. Tomcat', 'D. GlassFish'], correctAnswer: 'C. Tomcat' },
      { id: 5, question: 'Which interface is commonly extended for repositories?', options: ['A. CrudRepository', 'B. JpaRepository', 'C. MongoRepository', 'D. sqlRepository'], correctAnswer: 'B. JpaRepository' },
      { id: 6, question: 'Which three annotations does @SpringBootApplication combine?', options: ['A. @Configuration, @EnableAutoConfiguration, @ComponentScan', 'B. @Service, @Repository, @Controller', 'C. @Bean, @Autowired, @Component', 'D. @Entity, @Table, @Id'], correctAnswer: 'A. @Configuration, @EnableAutoConfiguration, @ComponentScan' },
      { id: 7, question: 'Where must the main class be placed for component scanning to work?', options: ['A. In any package', 'B. In the root package above your components', 'C. In a sub-package', 'D. In the default package only'], correctAnswer: 'B. In the root package above your components' },
      { id: 8, question: 'What does @RestController add over @Controller?', options: ['A. @ResponseBody on every method', 'B. Transaction support', 'C. Security', 'D. Caching'], correctAnswer: 'A. @ResponseBody on every method' },
      { id: 9, question: 'Which annotation binds a URL path segment to a parameter?', options: ['A. @RequestParam', 'B. @PathVariable', 'C. @RequestBody', 'D. @RequestHeader'], correctAnswer: 'B. @PathVariable' },
      { id: 10, question: 'Which binds a query-string parameter?', options: ['A. @PathVariable', 'B. @RequestParam', 'C. @RequestBody', 'D. @ModelAttribute'], correctAnswer: 'B. @RequestParam' },
      { id: 11, question: 'Which HTTP status should a successful POST that creates a resource return?', options: ['A. 200', 'B. 201', 'C. 204', 'D. 302'], correctAnswer: 'B. 201' },
      { id: 12, question: 'Which status is correct for a successful DELETE with no body?', options: ['A. 200', 'B. 201', 'C. 204', 'D. 404'], correctAnswer: 'C. 204' },
      { id: 13, question: 'Which HTTP methods are idempotent?', options: ['A. GET, PUT, DELETE', 'B. POST only', 'C. POST and PATCH', 'D. None'], correctAnswer: 'A. GET, PUT, DELETE' },
      { id: 14, question: 'Which injection style is recommended?', options: ['A. Field injection', 'B. Constructor injection', 'C. Setter injection', 'D. Static injection'], correctAnswer: 'B. Constructor injection' },
      { id: 15, question: 'Why is field injection discouraged?', options: ['A. It is slower', 'B. Fields cannot be final and testing without the framework is hard', 'C. It is deprecated', 'D. It causes memory leaks'], correctAnswer: 'B. Fields cannot be final and testing without the framework is hard' },
      { id: 16, question: 'What is the default bean scope?', options: ['A. prototype', 'B. singleton', 'C. request', 'D. session'], correctAnswer: 'B. singleton' },
      { id: 17, question: 'What must be true of a singleton bean?', options: ['A. It should be stateless', 'B. It must be final', 'C. It must be public', 'D. It must implement Serializable'], correctAnswer: 'A. It should be stateless' },
      { id: 18, question: 'Which annotation resolves ambiguity between two beans of the same type?', options: ['A. @Autowired', 'B. @Qualifier', 'C. @Bean', 'D. @Scope'], correctAnswer: 'B. @Qualifier' },
      { id: 19, question: 'What does @Transactional roll back on by default?', options: ['A. All exceptions', 'B. Unchecked exceptions only', 'C. Checked exceptions only', 'D. Nothing'], correctAnswer: 'B. Unchecked exceptions only' },
      { id: 20, question: 'Why does calling a @Transactional method from the same class fail to start a transaction?', options: ['A. The proxy is bypassed by self-invocation', 'B. It is a compile error', 'C. Transactions are disabled', 'D. It always works'], correctAnswer: 'A. The proxy is bypassed by self-invocation' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a simple REST controller that returns "Hello Spring" on /api/hello GET route.', language: 'java', starterCode: 'import org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api")\npublic class HelloController {\n    // GET /api/hello should return "Hello Spring"\n}', runnable: false },
        {
          kind: 'mcq',
          prompt: 'Why is constructor injection generally preferred over field injection with @Autowired in Spring Boot?',
          options: [
            'A. Constructor injection is slower than field injection.',
            'B. Constructor injection allows the class to declare dependencies as final (immutable), enforces required dependencies, and simplifies unit testing.',
            'C. Field injection is deprecated in Java 17 and throws a runtime exception.',
            'D. Constructor injection does not support lazy initialization.'
          ],
          correctAnswer: 'B. Constructor injection allows the class to declare dependencies as final (immutable), enforces required dependencies, and simplifies unit testing.'
        }
      ]
    }
  },
  m17: {
    id: 'm17',
    title: 'MODULE 17: SPRING BOOT + DATABASE',
    overview: 'Integrate relational databases (MySQL/PostgreSQL) with Spring Boot using Spring Data JPA, Hibernate mapping, and CRUD APIs.',
    outcomes: [
      'Connect Spring Boot to a PostgreSQL database.',
      'Map Java classes to database tables using @Entity.',
      'Implement validation constraints.'
    ],
    lessons: [
      {
        "id": "m17-l1",
        "title": "Lesson 17.1 MySQL/PostgreSQL Integration",
        "objectives": [
          "Connect Spring Boot to a real database.",
          "Configure the datasource and connection pool."
        ],
        "theory": "Connecting Spring Boot to a relational database takes three things: a driver dependency, datasource properties, and a decision about schema management.\n\n**The driver** goes in `pom.xml` — `com.mysql:mysql-connector-j` or `org.postgresql:postgresql`. Boot detects it and auto-configures a `DataSource`.\n\n**The properties** live in `application.properties`. The essential four are the URL, username, password, and (usually inferred) driver class. Boot also configures **HikariCP** as the connection pool automatically — this matters, because opening a connection per request would cripple throughput. Hikari keeps a warm pool; tune it with `spring.datasource.hikari.maximum-pool-size`.\n\n**Schema management** is controlled by `spring.jpa.hibernate.ddl-auto`:\n\n- `none` — do nothing. **Correct for production.**\n- `validate` — verify entities match existing tables and fail fast if not. Excellent for production.\n- `update` — add missing tables and columns. Convenient in development, but it never drops or alters existing columns, so schemas drift.\n- `create-drop` — rebuild on startup, wipe on shutdown. Ideal for tests.\n\n**Never use `update` or `create-drop` in production.** For real schema evolution use a migration tool — Flyway or Liquibase — which versions changes in source control and applies them deterministically.\n\nThe **dialect** tells Hibernate which SQL flavour to generate. Boot infers it from the URL; only set it manually if detection fails.",
        "syntax": "spring.datasource.url=jdbc:postgresql://localhost:5432/school\nspring.datasource.username=${DB_USER}\nspring.datasource.password=${DB_PASS}\nspring.jpa.hibernate.ddl-auto=validate",
        "codeExample": "# ============ application.properties (development) ============\n\n# --- MySQL ---\nspring.datasource.url=jdbc:mysql://localhost:3306/school?useSSL=false&serverTimezone=UTC\nspring.datasource.username=root\nspring.datasource.password=password\nspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver\n\n# --- PostgreSQL alternative ---\n# spring.datasource.url=jdbc:postgresql://localhost:5432/school\n# spring.datasource.driver-class-name=org.postgresql.Driver\n\n# --- HikariCP connection pool ---\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.minimum-idle=2\nspring.datasource.hikari.connection-timeout=30000\nspring.datasource.hikari.idle-timeout=600000\n\n# --- JPA / Hibernate ---\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\nspring.jpa.properties.hibernate.format_sql=true\nspring.jpa.open-in-view=false\n\n\n# ============ application-prod.properties ============\n# Activate with: java -jar app.jar --spring.profiles.active=prod\n\nspring.datasource.url=${DATABASE_URL}\nspring.datasource.username=${DATABASE_USER}\nspring.datasource.password=${DATABASE_PASSWORD}\n\n# Never mutate a production schema automatically\nspring.jpa.hibernate.ddl-auto=validate\nspring.jpa.show-sql=false\nspring.datasource.hikari.maximum-pool-size=20\n\n\n# ============ application-test.properties ============\n# In-memory H2: fast, isolated, disposable\n\nspring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1\nspring.datasource.driver-class-name=org.h2.Driver\nspring.jpa.hibernate.ddl-auto=create-drop",
        "codeOutput": "HikariPool-1 - Starting...\nHikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@4a2f0m\nHikariPool-1 - Start completed.\nHHH000412: Hibernate ORM core version 6.4.1.Final\nDatabase: MySQL 8.0.35\nDialect : org.hibernate.dialect.MySQLDialect\nTomcat started on port 8080 (http)",
        "mistakes": [
          "Leaving `ddl-auto=update` on in production, letting Hibernate silently alter the schema.",
          "Hard-coding credentials instead of reading environment variables.",
          "Forgetting the driver dependency: \"Failed to determine a suitable driver class\" at startup.",
          "Leaving `spring.jpa.open-in-view=true` (the default), which holds a database connection open for the whole HTTP request.",
          "Setting a huge Hikari pool size and exhausting the database's own connection limit."
        ],
        "takeaways": [
          "Driver dependency plus datasource properties is all Boot needs.",
          "HikariCP is auto-configured — tune the pool, do not replace it.",
          "Use `validate` or `none` in production and a migration tool for changes.",
          "Disable `open-in-view` to avoid holding connections across the request."
        ]
      },
      {
        "id": "m17-l2",
        "title": "Lesson 17.2 JPA & Hibernate",
        "objectives": [
          "Distinguish JPA from Hibernate.",
          "Understand the persistence context and entity lifecycle."
        ],
        "theory": "These two names are constantly confused, and the distinction is a standard interview question.\n\n**JPA** (Jakarta Persistence API) is a **specification** — a set of interfaces and annotations (`@Entity`, `@Id`, `EntityManager`) with no implementation. **Hibernate** is the most popular **implementation** of that specification, and Spring Boot's default. Programming against JPA keeps you portable; Hibernate adds extras beyond the spec, at the cost of tying you to it.\n\n**ORM** (Object-Relational Mapping) is the problem they solve: objects have references and inheritance, tables have foreign keys and rows. ORM translates between them so you write Java instead of SQL.\n\nThe concept that explains most Hibernate behaviour is the **persistence context** — a first-level cache holding every entity the current transaction has loaded. Two consequences follow:\n\n1. Loading the same row twice in one transaction returns the **identical object**; the second call never hits the database.\n2. Hibernate performs **dirty checking**. It remembers each entity's loaded state and, at commit, compares. Any changed field is flushed as an UPDATE — **you never need to call `save()` on an entity that was loaded inside the transaction**. Simply setting a field is enough. This surprises everyone the first time.\n\nAn entity moves through four states:\n\n- **Transient** — created with `new`, unknown to Hibernate.\n- **Managed** — loaded or persisted, tracked by the persistence context, dirty-checked.\n- **Detached** — the context closed; changes are no longer tracked.\n- **Removed** — marked for deletion at flush.\n\n`LazyInitializationException` is what happens when you touch a lazy association on a **detached** entity — typically during JSON serialisation, after the transaction has already ended.",
        "syntax": "// JPA = the specification, Hibernate = the implementation\n@Entity                  // jakarta.persistence - JPA\npublic class Student { }\n\n// Dirty checking: no save() call needed\n@Transactional\nvoid rename(Long id, String name) {\n    Student s = repository.findById(id).orElseThrow();\n    s.setName(name);     // flushed automatically at commit\n}",
        "codeExample": "package com.skillofied.demo;\n\nimport jakarta.persistence.*;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\n@Service\npublic class JpaLifecycleDemo {\n\n    @PersistenceContext\n    private EntityManager em;\n\n    @Transactional\n    public void demonstrateLifecycle() {\n        // 1. TRANSIENT - a plain object, Hibernate knows nothing about it\n        Student student = new Student();\n        student.setName(\"Asha Nair\");\n        System.out.println(\"Managed? \" + em.contains(student));   // false\n\n        // 2. MANAGED - now tracked and dirty-checked\n        em.persist(student);\n        System.out.println(\"Managed? \" + em.contains(student));   // true\n\n        // Dirty checking: this UPDATE is issued at commit with no save() call\n        student.setName(\"Asha K. Nair\");\n\n        // First-level cache: the same object, no second SELECT\n        Student again = em.find(Student.class, student.getId());\n        System.out.println(\"Same instance? \" + (student == again));   // true\n\n        // 3. DETACHED - changes are no longer tracked\n        em.detach(student);\n        student.setName(\"Ignored\");\n        System.out.println(\"Managed? \" + em.contains(student));   // false\n\n        // Re-attach with merge (returns a NEW managed copy)\n        Student merged = em.merge(student);\n        System.out.println(\"Merged managed? \" + em.contains(merged));\n\n        // 4. REMOVED - deleted at flush\n        em.remove(merged);\n    }\n\n    // The commonest ORM trap, and its fix\n    @Transactional(readOnly = true)\n    public void lazyLoading(Long id) {\n        Student s = em.find(Student.class, id);\n        // Inside the transaction the context is open, so this works\n        System.out.println(\"Courses: \" + s.getCourses().size());\n    }\n    // Touch s.getCourses() AFTER this method returns and you get\n    // LazyInitializationException - the context is closed and the entity detached.\n}\n\n@Entity\n@Table(name = \"students\")\nclass Student {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n\n    @OneToMany(mappedBy = \"student\", fetch = FetchType.LAZY)\n    private java.util.List<Course> courses = new java.util.ArrayList<>();\n\n    public Long getId() { return id; }\n    public void setName(String name) { this.name = name; }\n    public java.util.List<Course> getCourses() { return courses; }\n}\n\n@Entity\nclass Course {\n    @Id @GeneratedValue private Long id;\n    private String code;\n    @ManyToOne private Student student;\n}",
        "codeOutput": "Managed? false\nHibernate: insert into students (name) values (?)\nManaged? true\nSame instance? true\nManaged? false\nMerged managed? true\nHibernate: update students set name=? where id=?\nHibernate: delete from students where id=?",
        "mistakes": [
          "Calling `save()` on an entity loaded inside the same transaction — redundant, since dirty checking already handles it.",
          "Touching a lazy collection after the transaction ends, producing `LazyInitializationException`.",
          "Assuming `merge()` mutates the object you passed in. It returns a *new* managed instance; use the return value.",
          "Saying \"Hibernate is a specification\" in an interview. JPA is the spec; Hibernate implements it.",
          "Using `FetchType.EAGER` everywhere to dodge lazy exceptions, which drags the whole object graph into memory."
        ],
        "takeaways": [
          "JPA is the specification; Hibernate is the default implementation.",
          "The persistence context caches entities and dirty-checks them at commit.",
          "Transient → managed → detached → removed.",
          "`LazyInitializationException` means you touched a lazy field on a detached entity."
        ]
      },
      {
        "id": "m17-l3",
        "title": "Lesson 17.3 Entity Mapping",
        "objectives": [
          "Map classes to tables with JPA annotations.",
          "Model one-to-many and many-to-many relationships."
        ],
        "theory": "**Entity mapping** declares how a Java class corresponds to a database table.\n\nThe basics: `@Entity` marks the class, `@Table(name=...)` names the table (defaulting to the class name), `@Id` marks the primary key, and `@GeneratedValue` chooses how it is produced. For MySQL and PostgreSQL auto-increment columns use `GenerationType.IDENTITY`.\n\nColumn-level control comes from `@Column(name, nullable, length, unique)`. Fields with no annotation are still mapped, using the field name. Use `@Transient` for a field you do *not* want persisted, and `@Enumerated(EnumType.STRING)` for enums — **never** the default `ORDINAL`, which stores the enum's position and silently corrupts your data the day someone reorders the constants.\n\n**Relationships** are where the real design happens:\n\n- **`@OneToOne`** — a user and their profile.\n- **`@ManyToOne`** — many courses belong to one student. This is the **owning side**: it holds the foreign key, declared with `@JoinColumn`.\n- **`@OneToMany(mappedBy = \"...\")`** — the inverse side. `mappedBy` names the field on the owning side and means \"the foreign key lives over there\". Omit it and Hibernate creates a pointless extra join table.\n- **`@ManyToMany`** — students and courses, via a `@JoinTable`.\n\nTwo defaults worth memorising: `@ManyToOne` and `@OneToOne` are **EAGER**, while `@OneToMany` and `@ManyToMany` are **LAZY**. Those eager defaults are a frequent cause of accidental N+1 queries; most teams set `fetch = FetchType.LAZY` explicitly on the to-one sides.\n\n`cascade` propagates operations to associated entities, and `orphanRemoval = true` deletes children removed from a collection. Both are powerful and easy to misuse — `CascadeType.REMOVE` on the wrong association can delete far more than you intended.",
        "syntax": "@Entity\n@Table(name = \"students\")\npublic class Student {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String name;\n}",
        "codeExample": "package com.skillofied.demo.model;\n\nimport jakarta.persistence.*;\nimport java.time.LocalDateTime;\nimport java.util.ArrayList;\nimport java.util.HashSet;\nimport java.util.List;\nimport java.util.Set;\n\n@Entity\n@Table(name = \"students\",\n       uniqueConstraints = @UniqueConstraint(columnNames = \"email\"))\npublic class Student {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String name;\n\n    @Column(nullable = false, unique = true)\n    private String email;\n\n    // STRING, never ORDINAL - reordering the enum must not corrupt stored data\n    @Enumerated(EnumType.STRING)\n    @Column(length = 10)\n    private Status status = Status.ACTIVE;\n\n    @Column(name = \"created_at\", updatable = false)\n    private LocalDateTime createdAt;\n\n    @Transient                     // computed, never persisted\n    private String displayLabel;\n\n    // One student -> many enrolments. mappedBy points at the owning field.\n    @OneToMany(mappedBy = \"student\",\n               cascade = CascadeType.ALL,\n               orphanRemoval = true,\n               fetch = FetchType.LAZY)\n    private List<Enrolment> enrolments = new ArrayList<>();\n\n    // Many-to-many through an explicit join table\n    @ManyToMany(fetch = FetchType.LAZY)\n    @JoinTable(name = \"student_clubs\",\n               joinColumns        = @JoinColumn(name = \"student_id\"),\n               inverseJoinColumns = @JoinColumn(name = \"club_id\"))\n    private Set<Club> clubs = new HashSet<>();\n\n    @PrePersist\n    void onCreate() {\n        this.createdAt = LocalDateTime.now();\n    }\n\n    // Helper keeps both sides of the relationship consistent\n    public void addEnrolment(Enrolment e) {\n        enrolments.add(e);\n        e.setStudent(this);\n    }\n\n    public enum Status { ACTIVE, SUSPENDED, GRADUATED }\n\n    public Long getId() { return id; }\n    public List<Enrolment> getEnrolments() { return enrolments; }\n    public Set<Club> getClubs() { return clubs; }\n}\n\n@Entity\n@Table(name = \"enrolments\")\nclass Enrolment {\n\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    private String courseCode;\n\n    // The OWNING side: this table holds the foreign key.\n    // Explicit LAZY - @ManyToOne defaults to EAGER.\n    @ManyToOne(fetch = FetchType.LAZY, optional = false)\n    @JoinColumn(name = \"student_id\", nullable = false)\n    private Student student;\n\n    void setStudent(Student student) { this.student = student; }\n}\n\n@Entity\n@Table(name = \"clubs\")\nclass Club {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n\n    @ManyToMany(mappedBy = \"clubs\")\n    private Set<Student> members = new HashSet<>();\n}",
        "codeOutput": "Hibernate: create table students (\n    id bigint not null auto_increment,\n    name varchar(100) not null,\n    email varchar(255) not null,\n    status varchar(10),\n    created_at datetime(6),\n    primary key (id),\n    unique (email))\n\nHibernate: create table enrolments (\n    id bigint not null auto_increment,\n    course_code varchar(255),\n    student_id bigint not null,\n    primary key (id),\n    foreign key (student_id) references students(id))\n\nHibernate: create table student_clubs (\n    student_id bigint not null,\n    club_id bigint not null)",
        "mistakes": [
          "Using `@Enumerated(EnumType.ORDINAL)` (the default). Reorder the enum and every stored row now means something else.",
          "Omitting `mappedBy` on `@OneToMany`, so Hibernate invents a redundant join table.",
          "Leaving `@ManyToOne` at its EAGER default and loading half the database with every query.",
          "Updating only one side of a bidirectional relationship. Use a helper method to set both.",
          "Applying `CascadeType.REMOVE` on a `@ManyToOne`, which can delete the parent when you delete a child.",
          "Forgetting the no-argument constructor JPA requires for entities."
        ],
        "takeaways": [
          "`@Entity` + `@Id` + `@GeneratedValue` is the minimum.",
          "The owning side holds the foreign key; the inverse side uses `mappedBy`.",
          "To-one associations default to EAGER, to-many to LAZY — set them explicitly.",
          "Always use `EnumType.STRING`."
        ]
      },
      {
        "id": "m17-l4",
        "title": "Lesson 17.4 CRUD APIs",
        "objectives": [
          "Wire controller, service and repository into a working API.",
          "Return correct status codes for each operation."
        ],
        "theory": "This lesson assembles everything from Module 16 and 17 into a complete, production-shaped REST API.\n\nThe flow for any request is the same three hops:\n\n**Controller** receives the HTTP request and binds its parts → **Service** applies business rules inside a transaction and maps between DTOs and entities → **Repository** issues the SQL.\n\nEach CRUD operation has a conventional shape:\n\n- **Create** — `POST /api/students`, body validated, returns **201 Created** with a `Location` header pointing at the new resource.\n- **Read all** — `GET /api/students`, returns **200** with a list. Real APIs page this; returning ten thousand rows is a denial-of-service risk against your own server.\n- **Read one** — `GET /api/students/{id}`, returns **200** or **404**.\n- **Update** — `PUT /api/students/{id}` replaces the resource and returns **200**; `PATCH` applies a partial update.\n- **Delete** — `DELETE /api/students/{id}`, returns **204 No Content**, or **404** if it was not there.\n\nTwo details separate a toy API from a real one. First, **paging**: accept `Pageable` and return a `Page<T>`, and Spring Data handles limit, offset and sorting for you. Second, **never accept a client-supplied ID on create** — the database assigns it; trusting the client lets a caller overwrite an existing row.",
        "syntax": "@PostMapping   -> 201 Created + Location\n@GetMapping    -> 200 OK\n@PutMapping    -> 200 OK / 404\n@DeleteMapping -> 204 No Content / 404",
        "codeExample": "package com.skillofied.demo.controller;\n\nimport com.skillofied.demo.dto.*;\nimport com.skillofied.demo.service.StudentService;\nimport jakarta.validation.Valid;\nimport org.springframework.data.domain.Page;\nimport org.springframework.data.domain.Pageable;\nimport org.springframework.data.web.PageableDefault;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\nimport org.springframework.web.servlet.support.ServletUriComponentsBuilder;\n\nimport java.net.URI;\n\n@RestController\n@RequestMapping(\"/api/students\")\npublic class StudentController {\n\n    private final StudentService service;\n\n    public StudentController(StudentService service) {\n        this.service = service;\n    }\n\n    // CREATE -> 201 with Location\n    @PostMapping\n    public ResponseEntity<StudentResponse> create(@Valid @RequestBody StudentRequest request) {\n        StudentResponse saved = service.create(request);\n\n        URI location = ServletUriComponentsBuilder\n            .fromCurrentRequest()\n            .path(\"/{id}\")\n            .buildAndExpand(saved.id())\n            .toUri();\n\n        return ResponseEntity.created(location).body(saved);\n    }\n\n    // READ ALL (paged) -> 200\n    // GET /api/students?page=0&size=20&sort=name,asc\n    @GetMapping\n    public Page<StudentResponse> list(@PageableDefault(size = 20, sort = \"name\") Pageable pageable) {\n        return service.findAll(pageable);\n    }\n\n    // READ ONE -> 200 or 404 (404 raised by the service, handled globally)\n    @GetMapping(\"/{id}\")\n    public StudentResponse getOne(@PathVariable Long id) {\n        return service.findById(id);\n    }\n\n    // FULL UPDATE -> 200\n    @PutMapping(\"/{id}\")\n    public StudentResponse replace(@PathVariable Long id,\n                                   @Valid @RequestBody StudentRequest request) {\n        return service.replace(id, request);\n    }\n\n    // PARTIAL UPDATE -> 200\n    @PatchMapping(\"/{id}\")\n    public StudentResponse patch(@PathVariable Long id,\n                                 @RequestBody StudentPatchRequest request) {\n        return service.patch(id, request);\n    }\n\n    // DELETE -> 204\n    @DeleteMapping(\"/{id}\")\n    public ResponseEntity<Void> delete(@PathVariable Long id) {\n        service.delete(id);\n        return ResponseEntity.noContent().build();\n    }\n}",
        "codeOutput": "$ curl -i -X POST localhost:8080/api/students \\\n    -H \"Content-Type: application/json\" \\\n    -d '{\"name\":\"Asha Nair\",\"email\":\"asha@example.com\",\"grade\":\"A\"}'\nHTTP/1.1 201 Created\nLocation: http://localhost:8080/api/students/1\n{\"id\":1,\"name\":\"Asha Nair\",\"email\":\"asha@example.com\",\"grade\":\"A\"}\n\n$ curl \"localhost:8080/api/students?page=0&size=2&sort=name,asc\"\n{\"content\":[{\"id\":1,\"name\":\"Asha Nair\",...}],\n \"totalElements\":1,\"totalPages\":1,\"number\":0,\"size\":2}\n\n$ curl -i -X DELETE localhost:8080/api/students/1\nHTTP/1.1 204 No Content\n\n$ curl -i localhost:8080/api/students/1\nHTTP/1.1 404 Not Found\n{\"status\":404,\"message\":\"No student with id 1\"}",
        "mistakes": [
          "Returning 200 for a create instead of 201, and omitting the `Location` header.",
          "Accepting a client-supplied ID on POST, letting a caller overwrite an existing record.",
          "Returning every row from `findAll()` with no paging.",
          "Returning 200 with an error message in the body instead of a 4xx status.",
          "Using PUT for partial updates — PUT replaces the whole resource, so omitted fields become null."
        ],
        "takeaways": [
          "Controller → service → repository, one direction only.",
          "201 + Location for create, 204 for delete, 404 for a missing resource.",
          "Accept `Pageable` and return `Page<T>` for collections.",
          "The server owns identifier assignment."
        ]
      },
      {
        "id": "m17-l5",
        "title": "Lesson 17.5 Validation",
        "objectives": [
          "Validate request bodies declaratively.",
          "Apply Bean Validation constraints.",
          "Return useful validation errors."
        ],
        "theory": "Never trust client input. **Bean Validation** (Jakarta Validation) lets you express the rules as annotations on the DTO instead of scattering `if` statements through your controller.\n\nAdd `spring-boot-starter-validation`, annotate the fields, and put **`@Valid`** on the `@RequestBody` parameter. That last part is the step everyone forgets — **without `@Valid` the annotations are silently ignored** and invalid data sails straight through.\n\nThe common constraints:\n\n- **`@NotNull`** — must not be null (but `\"\"` passes).\n- **`@NotEmpty`** — not null and length > 0 (but `\" \"` passes).\n- **`@NotBlank`** — not null and contains non-whitespace. **This is the one you want for strings.**\n- `@Size(min, max)`, `@Min` / `@Max`, `@Positive`, `@Email`, `@Pattern(regexp)`, `@Past` / `@Future`.\n\nWhen validation fails Spring throws `MethodArgumentNotValidException`, which by default produces a sprawling response. Handle it in a `@RestControllerAdvice` and return a clean map of field → message with **400 Bad Request**. Every `message` attribute you write becomes what the client sees, so write them for a human.\n\nTwo extensions: `@Validated` on the class enables validation of `@RequestParam` and `@PathVariable` too, and nested objects need `@Valid` on the field to be validated recursively.\n\nFinally, note that validation and constraints are complementary. `@Email` catches a malformed address; only a database unique constraint can catch a duplicate one, because two concurrent requests can both pass a pre-check.",
        "syntax": "public record StudentRequest(\n    @NotBlank(message = \"Name is required\") String name,\n    @Email(message = \"Must be a valid email\") String email,\n    @Min(16) @Max(100) int age\n) { }\n\n@PostMapping\npublic X create(@Valid @RequestBody StudentRequest r) { }",
        "codeExample": "package com.skillofied.demo.dto;\n\nimport jakarta.validation.Valid;\nimport jakarta.validation.constraints.*;\n\npublic record StudentRequest(\n\n    // @NotBlank, not @NotNull: rejects \"\" and \"   \" too\n    @NotBlank(message = \"Name is required\")\n    @Size(min = 2, max = 100, message = \"Name must be 2-100 characters\")\n    String name,\n\n    @NotBlank(message = \"Email is required\")\n    @Email(message = \"Must be a valid email address\")\n    String email,\n\n    @NotNull(message = \"Age is required\")\n    @Min(value = 16, message = \"Must be at least 16\")\n    @Max(value = 100, message = \"Age looks invalid\")\n    Integer age,\n\n    @Pattern(regexp = \"^[A-F][+-]?$\", message = \"Grade must be A-F, optionally with + or -\")\n    String grade,\n\n    @Valid                       // nested objects need their own @Valid\n    AddressRequest address\n) { }\n\nrecord AddressRequest(\n    @NotBlank(message = \"City is required\") String city,\n    @Pattern(regexp = \"\\\\d{6}\", message = \"Postcode must be 6 digits\") String postcode\n) { }\n\n\n// ===== Turning validation failures into a clean 400 response =====\npackage com.skillofied.demo.exception;\n\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.validation.FieldError;\nimport org.springframework.web.bind.MethodArgumentNotValidException;\nimport org.springframework.web.bind.annotation.ExceptionHandler;\nimport org.springframework.web.bind.annotation.RestControllerAdvice;\n\nimport java.time.LocalDateTime;\nimport java.util.LinkedHashMap;\nimport java.util.Map;\n\n@RestControllerAdvice\npublic class ValidationExceptionHandler {\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {\n\n        Map<String, String> fieldErrors = new LinkedHashMap<>();\n        for (FieldError error : ex.getBindingResult().getFieldErrors()) {\n            fieldErrors.put(error.getField(), error.getDefaultMessage());\n        }\n\n        Map<String, Object> body = new LinkedHashMap<>();\n        body.put(\"timestamp\", LocalDateTime.now());\n        body.put(\"status\", 400);\n        body.put(\"error\", \"Validation Failed\");\n        body.put(\"fields\", fieldErrors);\n\n        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);\n    }\n}",
        "codeOutput": "$ curl -i -X POST localhost:8080/api/students \\\n    -H \"Content-Type: application/json\" \\\n    -d '{\"name\":\"  \",\"email\":\"not-an-email\",\"age\":12,\"grade\":\"Z\"}'\n\nHTTP/1.1 400 Bad Request\n{\n  \"timestamp\": \"2026-07-30T11:04:22.517\",\n  \"status\": 400,\n  \"error\": \"Validation Failed\",\n  \"fields\": {\n    \"name\":  \"Name is required\",\n    \"email\": \"Must be a valid email address\",\n    \"age\":   \"Must be at least 16\",\n    \"grade\": \"Grade must be A-F, optionally with + or -\"\n  }\n}",
        "mistakes": [
          "Omitting `@Valid` on the `@RequestBody` parameter. Every constraint is then ignored, silently.",
          "Using `@NotNull` on a String when you meant `@NotBlank` — `\"   \"` passes `@NotNull`.",
          "Forgetting the `spring-boot-starter-validation` dependency; annotations compile but do nothing.",
          "Not annotating nested objects with `@Valid`, so their constraints never run.",
          "Relying on validation alone for uniqueness — two concurrent requests can both pass. Add a database unique constraint."
        ],
        "takeaways": [
          "Constraints go on the DTO; `@Valid` on the parameter activates them.",
          "`@NotBlank` for strings, `@NotNull` for objects and boxed numbers.",
          "Handle `MethodArgumentNotValidException` to return a clean field → message map.",
          "Validation complements, but does not replace, database constraints."
        ]
      },
      {
        "id": "m17-l6",
        "title": "Lesson 17.6 Exception Handling",
        "objectives": [
          "Centralise error handling with @RestControllerAdvice.",
          "Design a consistent error response.",
          "Avoid leaking internals."
        ],
        "theory": "Without deliberate handling, an uncaught exception produces Spring's default error page — a 500 with a stack trace. That is both unhelpful to clients and a **security problem**, because a stack trace reveals your package structure, framework versions, and sometimes SQL.\n\n**`@RestControllerAdvice`** solves this globally. It is a component whose `@ExceptionHandler` methods apply across every controller, so error handling lives in exactly one place and controllers stay clean — they simply throw, and the advice decides the HTTP response.\n\nThe pattern has three parts:\n\n1. **Custom exceptions** that carry meaning: `StudentNotFoundException`, `DuplicateEmailException`. Extend `RuntimeException` so they do not clutter method signatures — and remember `@Transactional` rolls back on unchecked exceptions.\n2. **A consistent error DTO** — timestamp, status, error, message, path. Clients can then parse errors reliably instead of pattern-matching on strings.\n3. **Handlers** mapping each exception to the right status: not-found → 404, duplicate → 409, validation → 400, access denied → 403.\n\nTwo rules matter for the catch-all `Exception` handler. **Log the full stack trace server-side** so you can debug, but **return a generic message** to the client — never `e.getMessage()`, which may embed a SQL fragment or file path. And keep the catch-all last; Spring picks the most specific matching handler, but an over-broad handler placed carelessly can swallow cases you meant to treat individually.\n\nAn alternative for simple cases is `@ResponseStatus` on the exception class itself, though it gives you no control over the body.",
        "syntax": "@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(StudentNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(StudentNotFoundException ex) {\n        return ResponseEntity.status(404).body(...);\n    }\n}",
        "codeExample": "package com.skillofied.demo.exception;\n\nimport jakarta.servlet.http.HttpServletRequest;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.ExceptionHandler;\nimport org.springframework.web.bind.annotation.RestControllerAdvice;\n\nimport java.time.LocalDateTime;\n\n// ---- Custom exceptions carry meaning ----\npublic class StudentNotFoundException extends RuntimeException {\n    public StudentNotFoundException(Long id) { super(\"No student with id \" + id); }\n}\n\nclass DuplicateEmailException extends RuntimeException {\n    DuplicateEmailException(String email) { super(\"Email already registered: \" + email); }\n}\n\nclass EnrolmentLimitException extends RuntimeException {\n    EnrolmentLimitException(String message) { super(message); }\n}\n\n// ---- A consistent error shape for every failure ----\nrecord ErrorResponse(\n    LocalDateTime timestamp,\n    int status,\n    String error,\n    String message,\n    String path\n) { }\n\n// ---- One place decides how every exception becomes a response ----\n@RestControllerAdvice\nclass GlobalExceptionHandler {\n\n    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);\n\n    private ResponseEntity<ErrorResponse> build(HttpStatus status, String message, HttpServletRequest req) {\n        ErrorResponse body = new ErrorResponse(\n            LocalDateTime.now(), status.value(), status.getReasonPhrase(), message, req.getRequestURI());\n        return ResponseEntity.status(status).body(body);\n    }\n\n    @ExceptionHandler(StudentNotFoundException.class)\n    ResponseEntity<ErrorResponse> handleNotFound(StudentNotFoundException ex, HttpServletRequest req) {\n        return build(HttpStatus.NOT_FOUND, ex.getMessage(), req);\n    }\n\n    @ExceptionHandler(DuplicateEmailException.class)\n    ResponseEntity<ErrorResponse> handleDuplicate(DuplicateEmailException ex, HttpServletRequest req) {\n        return build(HttpStatus.CONFLICT, ex.getMessage(), req);\n    }\n\n    @ExceptionHandler(EnrolmentLimitException.class)\n    ResponseEntity<ErrorResponse> handleBusinessRule(EnrolmentLimitException ex, HttpServletRequest req) {\n        return build(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage(), req);\n    }\n\n    @ExceptionHandler(IllegalArgumentException.class)\n    ResponseEntity<ErrorResponse> handleBadInput(IllegalArgumentException ex, HttpServletRequest req) {\n        return build(HttpStatus.BAD_REQUEST, ex.getMessage(), req);\n    }\n\n    // Catch-all: log everything, reveal nothing\n    @ExceptionHandler(Exception.class)\n    ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest req) {\n        log.error(\"Unhandled exception on {}\", req.getRequestURI(), ex);   // full trace, server-side\n        return build(HttpStatus.INTERNAL_SERVER_ERROR,\n                     \"An unexpected error occurred. Please contact support.\",   // generic, client-side\n                     req);\n    }\n}",
        "codeOutput": "$ curl -i localhost:8080/api/students/999\nHTTP/1.1 404 Not Found\n{\n  \"timestamp\": \"2026-07-30T11:12:04.881\",\n  \"status\": 404,\n  \"error\": \"Not Found\",\n  \"message\": \"No student with id 999\",\n  \"path\": \"/api/students/999\"\n}\n\n$ curl -i -X POST localhost:8080/api/students -d '{\"email\":\"asha@example.com\",...}'\nHTTP/1.1 409 Conflict\n{\"status\":409,\"error\":\"Conflict\",\"message\":\"Email already registered: asha@example.com\",...}\n\n# Server log keeps the detail the client never sees:\nERROR GlobalExceptionHandler - Unhandled exception on /api/students\njava.sql.SQLException: Connection refused ...",
        "mistakes": [
          "Returning `e.getMessage()` from the catch-all handler, leaking SQL fragments, file paths and class names.",
          "Try-catching in every controller method instead of throwing and letting the advice handle it.",
          "Mapping every failure to 500 — a missing record is 404, a duplicate is 409.",
          "Catching and swallowing an exception inside a `@Transactional` method, so the rollback never happens.",
          "Extending `Exception` instead of `RuntimeException` for business exceptions, forcing `throws` clauses everywhere."
        ],
        "takeaways": [
          "`@RestControllerAdvice` centralises error handling across all controllers.",
          "Custom unchecked exceptions map cleanly to HTTP status codes.",
          "Return one consistent error shape so clients can parse failures.",
          "Log the stack trace; return a generic message."
        ]
      }
    ],
    exercise: {
      title: 'Entity mapping and derived queries',
      description: 'Map a Student entity with a one-to-many relationship and add repository query methods.',
      instructions: ['Annotate the entity with @Entity and @Id, and use EnumType.STRING for the status enum.', 'Map enrolments with @OneToMany(mappedBy = "student") and set the owning side explicitly.', 'Add derived query methods and one @Query using JOIN FETCH to avoid N+1.'],
      starterCode: '@Entity\n@Table(name = "students")\npublic class Student {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    // TODO: add @Enumerated(EnumType.STRING) status\n    // TODO: add @OneToMany(mappedBy = "student") enrolments\n}',
      expectedOutput: 'findByGrade("A") -> 2 rows\nfindAllWithCourses() -> 1 query, no N+1',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which JPA annotation marks primary keys?', options: ['A. @Column', 'B. @Id', 'C. @PrimaryKey', 'D. @GeneratedValue'], correctAnswer: 'B. @Id' },
      { id: 2, question: 'Which JPA annotation maps classes to SQL tables?', options: ['A. @Table', 'B. @Entity', 'C. @Model', 'D. @Database'], correctAnswer: 'B. @Entity' },
      { id: 3, question: 'How do you trigger request validation inside controller mappings?', options: ['A. @Validate', 'B. @Valid', 'C. @NotNull', 'D. @Check'], correctAnswer: 'B. @Valid' },
      { id: 4, question: 'Which annotation builds global REST API controllers handlers?', options: ['A. @Controller', 'B. @ExceptionHandler', 'C. @RestControllerAdvice', 'D. @ErrorInterceptor'], correctAnswer: 'C. @RestControllerAdvice' },
      { id: 5, question: 'What property setting auto-updates databases tables schema changes?', options: ['A. spring.database.create', 'B. spring.jpa.hibernate.ddl-auto=update', 'C. spring.jpa.schema=renew', 'D. hibernate.sync'], correctAnswer: 'B. spring.jpa.hibernate.ddl-auto=update' },
      { id: 6, question: 'What is the relationship between JPA and Hibernate?', options: ['A. JPA is the specification, Hibernate an implementation', 'B. Hibernate is the specification', 'C. They are unrelated', 'D. They are the same product'], correctAnswer: 'A. JPA is the specification, Hibernate an implementation' },
      { id: 7, question: 'Which ddl-auto value is safest for production?', options: ['A. update', 'B. create-drop', 'C. validate', 'D. create'], correctAnswer: 'C. validate' },
      { id: 8, question: 'Which connection pool does Spring Boot configure by default?', options: ['A. C3P0', 'B. HikariCP', 'C. DBCP', 'D. Tomcat JDBC'], correctAnswer: 'B. HikariCP' },
      { id: 9, question: 'Which annotation marks a class as a JPA entity?', options: ['A. @Table', 'B. @Entity', 'C. @Repository', 'D. @Component'], correctAnswer: 'B. @Entity' },
      { id: 10, question: 'Which EnumType should you use for persisted enums?', options: ['A. ORDINAL', 'B. STRING', 'C. INTEGER', 'D. AUTO'], correctAnswer: 'B. STRING' },
      { id: 11, question: 'Why is EnumType.ORDINAL dangerous?', options: ['A. It is slower', 'B. Reordering the enum silently changes stored meanings', 'C. It uses more space', 'D. It is deprecated'], correctAnswer: 'B. Reordering the enum silently changes stored meanings' },
      { id: 12, question: 'Which side of a relationship holds the foreign key?', options: ['A. The owning side', 'B. The mappedBy side', 'C. Both', 'D. Neither'], correctAnswer: 'A. The owning side' },
      { id: 13, question: 'What is the default fetch type for @ManyToOne?', options: ['A. LAZY', 'B. EAGER', 'C. AUTO', 'D. None'], correctAnswer: 'B. EAGER' },
      { id: 14, question: 'What is the default fetch type for @OneToMany?', options: ['A. EAGER', 'B. LAZY', 'C. AUTO', 'D. JOIN'], correctAnswer: 'B. LAZY' },
      { id: 15, question: 'What causes LazyInitializationException?', options: ['A. Touching a lazy association on a detached entity', 'B. A null entity', 'C. A missing @Entity', 'D. A syntax error'], correctAnswer: 'A. Touching a lazy association on a detached entity' },
      { id: 16, question: 'What is dirty checking?', options: ['A. Validating input', 'B. Hibernate flushing changed managed entities at commit', 'C. Checking for null', 'D. A security scan'], correctAnswer: 'B. Hibernate flushing changed managed entities at commit' },
      { id: 17, question: 'Do you need to call save() on an entity loaded inside the same transaction?', options: ['A. Yes, always', 'B. No, dirty checking handles it', 'C. Only for updates', 'D. Only for deletes'], correctAnswer: 'B. No, dirty checking handles it' },
      { id: 18, question: 'What is the N+1 select problem?', options: ['A. One query per collection element instead of one overall', 'B. Too many columns', 'C. A deadlock', 'D. A validation error'], correctAnswer: 'A. One query per collection element instead of one overall' },
      { id: 19, question: 'What activates Bean Validation on a request body?', options: ['A. @Validated on the class only', 'B. @Valid on the @RequestBody parameter', 'C. Nothing, it is automatic', 'D. @NotNull alone'], correctAnswer: 'B. @Valid on the @RequestBody parameter' },
      { id: 20, question: 'Which annotation centralises exception handling across all controllers?', options: ['A. @ExceptionHandler alone', 'B. @RestControllerAdvice', 'C. @ResponseStatus', 'D. @ErrorHandler'], correctAnswer: 'B. @RestControllerAdvice' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Design a Product Entity class containing id, name, price, and email validations.', language: 'java', starterCode: 'import jakarta.persistence.*;\nimport jakarta.validation.constraints.*;\n\n@Entity\npublic class Product {\n    // id, name, price and an email field with validation\n}', runnable: false },
        {
          kind: 'mcq',
          prompt: 'What is the relationship between JPA and Hibernate in Java?',
          options: [
            'A. JPA is an ORM implementation; Hibernate is just a specification.',
            'B. JPA is the specification (guidelines/interface); Hibernate is a concrete provider (implementation) of the JPA specification.',
            'C. JPA is only used for SQL databases; Hibernate is only used for NoSQL databases.',
            'D. JPA and Hibernate are identical and developed by the same open source team.'
          ],
          correctAnswer: 'B. JPA is the specification (guidelines/interface); Hibernate is a concrete provider (implementation) of the JPA specification.'
        }
      ]
    }
  },
  m18: {
    id: 'm18',
    title: 'MODULE 18: SECURITY & AUTHENTICATION',
    overview: 'Secure your Spring Boot apps. Learn authentication basics, Spring Security filters, password hashing, and JWT tokens.',
    outcomes: [
      'Configure password encryption using BCrypt.',
      'Implement JWT token authorization filters.',
      'Secure Spring Boot endpoints.'
    ],
    lessons: [
      {
        "id": "m18-l1",
        "title": "Lesson 18.1 Authentication Basics",
        "objectives": [
          "Distinguish authentication from authorization.",
          "Compare session and token-based authentication."
        ],
        "theory": "Two words that sound alike and mean different things:\n\n- **Authentication (AuthN)** — *who are you?* Verifying identity, usually with credentials.\n- **Authorization (AuthZ)** — *what may you do?* Checking permissions once identity is established.\n\nAuthentication always comes first. A useful shorthand: authentication is showing your passport; authorization is whether that passport gets you through this particular gate.\n\nThere are two dominant mechanisms.\n\n**Session-based** authentication: the user logs in, the server creates a session, stores it in memory or Redis, and returns a session ID in a cookie. The server is **stateful** — it remembers you. Revoking access is trivial (delete the session), but scaling requires sticky sessions or shared session storage, and cookies bring CSRF risk.\n\n**Token-based** authentication: the server returns a signed token (typically a JWT) that the client sends in an `Authorization: Bearer <token>` header. The server is **stateless** — it verifies the signature and needs no stored session. This scales horizontally without coordination and suits mobile and third-party clients, which is why it dominates modern APIs. The trade-off is that a token is valid until it expires; you cannot easily revoke one without reintroducing state.\n\nIn Spring Security the key abstractions are the **`SecurityFilterChain`** (a chain of servlet filters every request passes through), **`Authentication`** (the current principal), and **`SecurityContextHolder`** (thread-local storage holding it).",
        "syntax": "// AuthN: who are you?\nAuthentication auth = SecurityContextHolder.getContext().getAuthentication();\nString username = auth.getName();\n\n// AuthZ: what may you do?\nboolean isAdmin = auth.getAuthorities().stream()\n    .anyMatch(a -> a.getAuthority().equals(\"ROLE_ADMIN\"));",
        "codeExample": "package com.skillofied.demo.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.core.Authentication;\nimport org.springframework.security.core.context.SecurityContextHolder;\nimport org.springframework.security.core.userdetails.*;\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\nimport org.springframework.security.crypto.password.PasswordEncoder;\nimport org.springframework.security.provisioning.InMemoryUserDetailsManager;\nimport org.springframework.web.bind.annotation.*;\n\nimport java.util.Map;\nimport java.util.stream.Collectors;\n\n@Configuration\npublic class AuthenticationBasics {\n\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n\n    // A simple in-memory user store (real apps load from a database)\n    @Bean\n    public UserDetailsService userDetailsService(PasswordEncoder encoder) {\n        UserDetails student = User.builder()\n            .username(\"asha\")\n            .password(encoder.encode(\"student123\"))\n            .roles(\"STUDENT\")\n            .build();\n\n        UserDetails admin = User.builder()\n            .username(\"admin\")\n            .password(encoder.encode(\"admin123\"))\n            .roles(\"ADMIN\", \"STUDENT\")\n            .build();\n\n        return new InMemoryUserDetailsManager(student, admin);\n    }\n}\n\n@RestController\n@RequestMapping(\"/api/auth\")\nclass WhoAmIController {\n\n    // Reading the authenticated principal\n    @GetMapping(\"/me\")\n    public Map<String, Object> me() {\n        Authentication auth = SecurityContextHolder.getContext().getAuthentication();\n\n        if (auth == null || !auth.isAuthenticated()) {\n            return Map.of(\"authenticated\", false);\n        }\n\n        return Map.of(\n            \"authenticated\", true,\n            \"username\",      auth.getName(),                 // AuthN result\n            \"authorities\",   auth.getAuthorities().stream()  // AuthZ inputs\n                                 .map(Object::toString)\n                                 .collect(Collectors.toList())\n        );\n    }\n}",
        "codeOutput": "$ curl -u asha:student123 localhost:8080/api/auth/me\n{\"authenticated\":true,\"username\":\"asha\",\"authorities\":[\"ROLE_STUDENT\"]}\n\n$ curl -u admin:admin123 localhost:8080/api/auth/me\n{\"authenticated\":true,\"username\":\"admin\",\"authorities\":[\"ROLE_ADMIN\",\"ROLE_STUDENT\"]}\n\n$ curl -i localhost:8080/api/auth/me\nHTTP/1.1 401 Unauthorized",
        "mistakes": [
          "Using \"authentication\" and \"authorization\" interchangeably. Interviewers ask this specifically.",
          "Returning 403 when the user is not logged in. Not authenticated is **401**; authenticated but not permitted is **403**.",
          "Choosing sessions for a stateless API consumed by mobile clients.",
          "Storing tokens in `localStorage`, where any XSS payload can read them."
        ],
        "takeaways": [
          "Authentication establishes identity; authorization grants access.",
          "Sessions are stateful and easy to revoke; tokens are stateless and scale better.",
          "401 = not authenticated, 403 = authenticated but forbidden.",
          "`SecurityContextHolder` exposes the current principal."
        ]
      },
      {
        "id": "m18-l2",
        "title": "Lesson 18.2 Authorization",
        "objectives": [
          "Restrict endpoints by role.",
          "Distinguish roles from authorities.",
          "Apply method-level security."
        ],
        "theory": "Once identity is established, **authorization** decides what that identity may do.\n\nSpring Security models permissions as **`GrantedAuthority`** strings. A **role** is simply an authority conventionally prefixed with `ROLE_`. This prefix is the source of endless confusion, because the API is inconsistent about it:\n\n- `hasRole(\"ADMIN\")` — Spring **adds** the prefix, matching `ROLE_ADMIN`.\n- `hasAuthority(\"ROLE_ADMIN\")` — no prefix added, so you must write it yourself.\n\nUse one style consistently. Mixing them is why rules mysteriously fail to match.\n\nThere are two places to enforce rules:\n\n**URL-based**, in the `SecurityFilterChain`. Rules are evaluated **top to bottom, first match wins** — so specific paths must come *before* general ones. Put `anyRequest().authenticated()` last, as a deny-by-default backstop. Ordering errors here are the most common security misconfiguration: a broad `permitAll()` placed early silently opens everything after it.\n\n**Method-based**, with `@PreAuthorize` on service methods, enabled by `@EnableMethodSecurity`. This is more expressive because it can reference the arguments and the principal: `@PreAuthorize(\"hasRole('ADMIN') or #id == authentication.principal.id\")` lets admins edit anyone while ordinary users edit only themselves.\n\nDefence in depth argues for both — URL rules as the coarse filter, method rules as the precise one closest to the data.",
        "syntax": "http.authorizeHttpRequests(auth -> auth\n    .requestMatchers(\"/api/public/**\").permitAll()\n    .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n    .anyRequest().authenticated());   // deny-by-default, last\n\n@PreAuthorize(\"hasRole('ADMIN')\")\npublic void deleteStudent(Long id) { }",
        "codeExample": "package com.skillofied.demo.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.access.prepost.PreAuthorize;\nimport org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.stereotype.Service;\nimport org.springframework.web.bind.annotation.*;\n\n@Configuration\n@EnableMethodSecurity          // switches on @PreAuthorize / @PostAuthorize\npublic class AuthorizationConfig {\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable())          // safe for a stateless token API\n            .authorizeHttpRequests(auth -> auth\n\n                // MOST SPECIFIC FIRST - rules are matched top to bottom\n                .requestMatchers(\"/api/auth/**\", \"/api/public/**\").permitAll()\n                .requestMatchers(\"/actuator/health\").permitAll()\n\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .requestMatchers(\"/api/reports/**\").hasAnyRole(\"ADMIN\", \"TEACHER\")\n\n                // Method-specific rules on the same path\n                .requestMatchers(org.springframework.http.HttpMethod.GET, \"/api/students/**\")\n                    .hasAnyRole(\"STUDENT\", \"TEACHER\", \"ADMIN\")\n                .requestMatchers(org.springframework.http.HttpMethod.DELETE, \"/api/students/**\")\n                    .hasRole(\"ADMIN\")\n\n                // Deny-by-default backstop - always last\n                .anyRequest().authenticated()\n            )\n            .httpBasic(basic -> { });\n\n        return http.build();\n    }\n}\n\n@Service\nclass StudentSecurityService {\n\n    @PreAuthorize(\"hasRole('ADMIN')\")\n    public void deleteAnyStudent(Long id) {\n        System.out.println(\"Deleted student \" + id);\n    }\n\n    // Method security can reference arguments and the principal:\n    // admins may edit anyone, users may edit only themselves\n    @PreAuthorize(\"hasRole('ADMIN') or #id == authentication.principal.id\")\n    public void updateProfile(Long id, String name) {\n        System.out.println(\"Updated \" + id + \" to \" + name);\n    }\n\n    @PreAuthorize(\"hasAnyRole('TEACHER', 'ADMIN')\")\n    public String gradeReport() {\n        return \"Class average: 78%\";\n    }\n}\n\n@RestController\n@RequestMapping(\"/api\")\nclass SecuredController {\n\n    @GetMapping(\"/public/info\")\n    public String publicInfo() { return \"Anyone can read this\"; }\n\n    @GetMapping(\"/students/me\")\n    public String profile() { return \"Any authenticated user\"; }\n\n    @GetMapping(\"/admin/stats\")\n    public String adminStats() { return \"Admins only\"; }\n}",
        "codeOutput": "$ curl localhost:8080/api/public/info\nAnyone can read this\n\n$ curl -u asha:student123 localhost:8080/api/students/me\nAny authenticated user\n\n$ curl -i -u asha:student123 localhost:8080/api/admin/stats\nHTTP/1.1 403 Forbidden      # authenticated, but lacks ROLE_ADMIN\n\n$ curl -i localhost:8080/api/admin/stats\nHTTP/1.1 401 Unauthorized   # not authenticated at all\n\n$ curl -u admin:admin123 localhost:8080/api/admin/stats\nAdmins only",
        "mistakes": [
          "Writing `hasRole(\"ROLE_ADMIN\")`, which looks for `ROLE_ROLE_ADMIN` and never matches.",
          "Placing `anyRequest().permitAll()` before specific rules, which opens every endpoint.",
          "Forgetting `@EnableMethodSecurity`, so `@PreAuthorize` annotations are silently ignored.",
          "Relying only on hiding UI buttons. The client is not a security boundary — enforce on the server.",
          "Not restricting by HTTP method, so a read-only role can also DELETE."
        ],
        "takeaways": [
          "Roles are authorities prefixed with `ROLE_`; `hasRole` adds it, `hasAuthority` does not.",
          "URL rules match top to bottom — specific first, `anyRequest()` last.",
          "`@PreAuthorize` can reference method arguments and the principal.",
          "Enforce authorization on the server, always."
        ]
      },
      {
        "id": "m18-l3",
        "title": "Lesson 18.3 JWT Authentication",
        "objectives": [
          "Explain JWT structure.",
          "Issue and verify tokens.",
          "Know what must never go in a payload."
        ],
        "theory": "A **JSON Web Token** is a self-contained, signed credential. It is three Base64URL-encoded parts joined by dots: `header.payload.signature`.\n\n- **Header** — the signing algorithm, e.g. `{\"alg\":\"HS256\",\"typ\":\"JWT\"}`.\n- **Payload** — the claims: `sub` (subject), `iat` (issued at), `exp` (expiry), plus your own such as roles.\n- **Signature** — `HMACSHA256(base64(header) + \".\" + base64(payload), secret)`.\n\nThe critical property, and the one most often misunderstood: **the payload is encoded, not encrypted.** Anyone can paste a JWT into jwt.io and read every claim. The signature guarantees *integrity* — that the content has not been altered — not *confidentiality*. **Never put a password, a card number, or any secret in a JWT payload.**\n\nThe flow is: client posts credentials → server validates and returns a signed token → client sends `Authorization: Bearer <token>` on subsequent requests → server verifies the signature and expiry, with no database lookup. That last point is the whole appeal: verification is a local computation, so any instance can serve any request.\n\nThe cost is **revocation**. A valid token stays valid until it expires; there is no session to delete. The standard mitigation is short-lived access tokens (15 minutes) paired with a long-lived **refresh token** that *is* stored server-side and can be revoked.\n\nOperationally: the signing secret must be long, random, and loaded from the environment — a hard-coded secret in a public repository is a total compromise. And always pin the expected algorithm when verifying; historical libraries accepted `alg: none` and could be tricked into skipping verification entirely.",
        "syntax": "header.payload.signature\n\neyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2hhIn0.dQw4w9WgXcQ...\n\nAuthorization: Bearer <token>",
        "codeExample": "package com.skillofied.demo.security;\n\nimport io.jsonwebtoken.*;\nimport io.jsonwebtoken.security.Keys;\nimport jakarta.servlet.FilterChain;\nimport jakarta.servlet.http.*;\nimport org.springframework.beans.factory.annotation.Value;\nimport org.springframework.security.authentication.UsernamePasswordAuthenticationToken;\nimport org.springframework.security.core.authority.SimpleGrantedAuthority;\nimport org.springframework.security.core.context.SecurityContextHolder;\nimport org.springframework.stereotype.Component;\nimport org.springframework.web.filter.OncePerRequestFilter;\n\nimport javax.crypto.SecretKey;\nimport java.util.*;\n\n@Component\npublic class JwtService {\n\n    // Loaded from the environment - NEVER hard-coded\n    @Value(\"${app.jwt.secret}\")\n    private String secret;\n\n    @Value(\"${app.jwt.expiration-ms:900000}\")   // 15 minutes\n    private long expirationMs;\n\n    private SecretKey key() {\n        return Keys.hmacShaKeyFor(secret.getBytes());\n    }\n\n    public String generateToken(String username, List<String> roles) {\n        Date now = new Date();\n        return Jwts.builder()\n            .subject(username)                 // sub - readable by anyone\n            .claim(\"roles\", roles)             // custom claim - also readable\n            .issuedAt(now)                     // iat\n            .expiration(new Date(now.getTime() + expirationMs))   // exp\n            .signWith(key())\n            .compact();\n            // Note: no password, no card number. The payload is NOT encrypted.\n    }\n\n    public boolean isValid(String token) {\n        try {\n            parse(token);\n            return true;\n        } catch (ExpiredJwtException e) {\n            return false;                      // token past its exp\n        } catch (JwtException | IllegalArgumentException e) {\n            return false;                      // bad signature or malformed\n        }\n    }\n\n    public String extractUsername(String token) {\n        return parse(token).getSubject();\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public List<String> extractRoles(String token) {\n        return parse(token).get(\"roles\", List.class);\n    }\n\n    private Claims parse(String token) {\n        return Jwts.parser()\n            .verifyWith(key())     // pins the algorithm - rejects \"alg: none\"\n            .build()\n            .parseSignedClaims(token)\n            .getPayload();\n    }\n}\n\n// Runs once per request: reads the header, verifies, populates the context\n@Component\nclass JwtAuthenticationFilter extends OncePerRequestFilter {\n\n    private final JwtService jwtService;\n\n    JwtAuthenticationFilter(JwtService jwtService) {\n        this.jwtService = jwtService;\n    }\n\n    @Override\n    protected void doFilterInternal(HttpServletRequest request,\n                                    HttpServletResponse response,\n                                    FilterChain chain) throws java.io.IOException, jakarta.servlet.ServletException {\n\n        String header = request.getHeader(\"Authorization\");\n\n        if (header != null && header.startsWith(\"Bearer \")) {\n            String token = header.substring(7);\n\n            if (jwtService.isValid(token)) {\n                String username = jwtService.extractUsername(token);\n\n                var authorities = jwtService.extractRoles(token).stream()\n                    .map(SimpleGrantedAuthority::new)\n                    .toList();\n\n                var authentication = new UsernamePasswordAuthenticationToken(\n                    username, null, authorities);\n\n                SecurityContextHolder.getContext().setAuthentication(authentication);\n            }\n        }\n\n        chain.doFilter(request, response);   // always continue the chain\n    }\n}",
        "codeOutput": "$ curl -X POST localhost:8080/api/auth/login \\\n    -d '{\"username\":\"asha\",\"password\":\"student123\"}'\n{\n  \"accessToken\": \"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2hhIiwicm9sZXMiOlsiUk9MRV9TVFVERU5UIl0sImV4cCI6MTc1MzI0NTYwMH0.k7Hs...\",\n  \"expiresIn\": 900\n}\n\n$ curl localhost:8080/api/students/me -H \"Authorization: Bearer eyJhbGciOi...\"\n{\"username\":\"asha\",\"roles\":[\"ROLE_STUDENT\"]}\n\n$ curl -i localhost:8080/api/students/me -H \"Authorization: Bearer tampered.token.here\"\nHTTP/1.1 401 Unauthorized",
        "mistakes": [
          "Putting passwords or other secrets in the payload. It is Base64, not encryption — anyone can decode it.",
          "Hard-coding the signing secret, or committing it to Git.",
          "Issuing tokens with no expiry, or one measured in months.",
          "Failing to pin the algorithm on verification, leaving the `alg: none` attack open.",
          "Storing tokens in `localStorage`, readable by any XSS payload. An httpOnly cookie is safer.",
          "Expecting to revoke a stateless token. Use short expiry plus a stored refresh token."
        ],
        "takeaways": [
          "A JWT is header.payload.signature, Base64URL-encoded and signed.",
          "The signature gives integrity, not confidentiality — the payload is public.",
          "Stateless verification is the benefit; hard revocation is the cost.",
          "Short-lived access tokens plus a revocable refresh token is the standard design."
        ]
      },
      {
        "id": "m18-l4",
        "title": "Lesson 18.4 Password Encryption",
        "objectives": [
          "Explain why hashing is not encryption.",
          "Use BCrypt correctly.",
          "Understand salting."
        ],
        "theory": "Storing passwords correctly is the single highest-stakes decision in this module, because getting it wrong turns one database breach into a compromise of every user's other accounts.\n\nFirst, the vocabulary. **Encryption is reversible** — with the key you recover the plaintext. **Hashing is one-way** — you cannot invert it. Passwords must be **hashed, never encrypted**, because your system never needs the original. To verify a login you hash the submitted password and compare hashes.\n\nSecond, not all hashes are suitable. MD5 and SHA-256 are designed to be **fast**, which is exactly wrong here: a modern GPU computes billions of SHA-256 hashes per second, so an attacker brute-forces common passwords almost instantly. Password hashing needs a **deliberately slow** algorithm — BCrypt, SCrypt or Argon2.\n\n**BCrypt** is Spring Security's default and the pragmatic choice. Two properties matter:\n\n1. **Automatic salting.** A random salt is generated per password and stored inside the hash string itself. This is why hashing the same password twice produces two different outputs — and it defeats **rainbow tables**, since a precomputed table is useless against a unique salt.\n2. **A tunable work factor.** The strength parameter (default 10) sets 2^strength rounds. As hardware improves you raise it. Each increment doubles the cost for you and for an attacker.\n\nBecause the salt is embedded and each hash is unique, **you must never compare hashes with `equals()`**. Use `passwordEncoder.matches(raw, stored)`, which extracts the salt and re-derives the hash.\n\nOne operational detail: BCrypt silently truncates input beyond 72 bytes.",
        "syntax": "@Bean\nPasswordEncoder passwordEncoder() {\n    return new BCryptPasswordEncoder(12);\n}\n\nString hash = encoder.encode(rawPassword);\nboolean ok  = encoder.matches(rawPassword, hash);   // never equals()",
        "codeExample": "package com.skillofied.demo.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\nimport org.springframework.security.crypto.password.PasswordEncoder;\nimport org.springframework.stereotype.Service;\n\n@Configuration\npublic class PasswordConfig {\n\n    // Strength 12 = 2^12 rounds. Raise it as hardware gets faster.\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder(12);\n    }\n}\n\n@Service\nclass RegistrationService {\n\n    private final PasswordEncoder encoder;\n    private final UserRepository users;\n\n    RegistrationService(PasswordEncoder encoder, UserRepository users) {\n        this.encoder = encoder;\n        this.users = users;\n    }\n\n    public void register(String username, String rawPassword) {\n        if (rawPassword == null || rawPassword.length() < 8) {\n            throw new IllegalArgumentException(\"Password must be at least 8 characters\");\n        }\n\n        // Hash before storing. The raw password is never persisted or logged.\n        String hashed = encoder.encode(rawPassword);\n\n        User user = new User();\n        user.setUsername(username);\n        user.setPasswordHash(hashed);\n        users.save(user);\n    }\n\n    public boolean login(String username, String rawPassword) {\n        return users.findByUsername(username)\n            // matches() extracts the embedded salt and re-derives the hash.\n            // NEVER: storedHash.equals(encoder.encode(rawPassword))\n            .map(u -> encoder.matches(rawPassword, u.getPasswordHash()))\n            .orElse(false);\n    }\n\n    public static void main(String[] args) {\n        PasswordEncoder encoder = new BCryptPasswordEncoder(12);\n\n        String password = \"student123\";\n        String hash1 = encoder.encode(password);\n        String hash2 = encoder.encode(password);\n\n        System.out.println(\"Hash 1 : \" + hash1);\n        System.out.println(\"Hash 2 : \" + hash2);\n        System.out.println(\"Equal? : \" + hash1.equals(hash2) + \"   <- different salts\");\n\n        System.out.println(\"matches(correct) : \" + encoder.matches(password, hash1));\n        System.out.println(\"matches(wrong)   : \" + encoder.matches(\"wrongpass\", hash1));\n\n        // Anatomy: $2a$ = algorithm, 12 = strength, then 22 chars of salt, then the hash\n        System.out.println(\"Algorithm : \" + hash1.substring(0, 4));\n        System.out.println(\"Strength  : \" + hash1.substring(4, 6));\n    }\n}\n\ninterface UserRepository {\n    java.util.Optional<User> findByUsername(String username);\n    User save(User user);\n}\n\nclass User {\n    private String username, passwordHash;\n    void setUsername(String u) { this.username = u; }\n    void setPasswordHash(String h) { this.passwordHash = h; }\n    String getPasswordHash() { return passwordHash; }\n}",
        "codeOutput": "Hash 1 : $2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy\nHash 2 : $2a$12$K4hRm2pQvXcnLbYwT8zOaeR7fUuiHs3vNmKpQxYzWvBcDeFgHiJkL\nEqual? : false   <- different salts\nmatches(correct) : true\nmatches(wrong)   : false\nAlgorithm : $2a$\nStrength  : 12",
        "mistakes": [
          "Storing passwords in plain text. This is the worst possible failure and still happens.",
          "Using MD5 or SHA-256, which are far too fast for password hashing.",
          "Comparing with `hash.equals(encoder.encode(raw))` — the salts differ, so it never matches. Use `matches()`.",
          "Rolling your own salting scheme. BCrypt already handles it correctly.",
          "Logging the raw password, which puts it straight into your log aggregator.",
          "Forgetting that BCrypt truncates input past 72 bytes."
        ],
        "takeaways": [
          "Hash passwords, never encrypt them.",
          "Use BCrypt, SCrypt or Argon2 — slowness is the feature.",
          "BCrypt salts automatically, so identical passwords hash differently.",
          "Verify with `matches()`, never `equals()`."
        ]
      },
      {
        "id": "m18-l5",
        "title": "Lesson 18.5 Secure APIs",
        "objectives": [
          "Assemble a complete security configuration.",
          "Configure CORS and CSRF correctly.",
          "Apply defence in depth."
        ],
        "theory": "This lesson pulls the module together into a configuration you could actually ship.\n\n**The filter chain.** In modern Spring Security you define a `SecurityFilterChain` bean. For a token API the essentials are: disable CSRF, set the session policy to `STATELESS`, declare the URL rules, and insert the JWT filter before `UsernamePasswordAuthenticationFilter`.\n\n**CSRF.** Cross-Site Request Forgery relies on the browser automatically attaching **cookies** to a cross-site request. A JWT sent in an `Authorization` header is not attached automatically, so a stateless token API is not vulnerable and disabling CSRF protection is correct. If you authenticate with cookies, **CSRF protection must stay on** — disabling it \"to make things work\" is a genuine vulnerability, and it is a common one.\n\n**CORS** is a different thing entirely, despite being confused with CSRF constantly. It is the browser rule that stops a page on one origin calling an API on another. Configure allowed origins explicitly. `allowedOrigins(\"*\")` combined with `allowCredentials(true)` is rejected by browsers and is a red flag in review — list your real front-end origins.\n\n**Defence in depth** means no single control is load-bearing:\n\n- **HTTPS only** in production; a bearer token over plain HTTP is readable by anyone on the path.\n- **Security headers** — HSTS, `X-Content-Type-Options: nosniff`, frame options.\n- **Rate limiting** on login endpoints to blunt credential stuffing.\n- **Validate every input** (Module 17.5) and use `PreparedStatement` or JPA (Module 14.5) so injection is impossible.\n- **Generic error messages** — \"Invalid username or password\", never \"No such user\", which lets an attacker enumerate accounts.\n- **Log security events**, never secrets.\n- **Keep dependencies patched.** Most real breaches exploit a known CVE in an outdated library, not a novel flaw.",
        "syntax": "@Bean\nSecurityFilterChain chain(HttpSecurity http) throws Exception {\n    return http\n        .csrf(c -> c.disable())\n        .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))\n        .authorizeHttpRequests(a -> a.anyRequest().authenticated())\n        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)\n        .build();\n}",
        "codeExample": "package com.skillofied.demo.security;\n\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.http.HttpMethod;\nimport org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\nimport org.springframework.security.crypto.password.PasswordEncoder;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;\nimport org.springframework.web.cors.*;\n\nimport java.util.List;\n\n@Configuration\n@EnableWebSecurity\n@EnableMethodSecurity\npublic class SecurityConfig {\n\n    private final JwtAuthenticationFilter jwtFilter;\n\n    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {\n        this.jwtFilter = jwtFilter;\n    }\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            // Safe to disable ONLY because we authenticate with a header, not a cookie\n            .csrf(csrf -> csrf.disable())\n\n            .cors(cors -> cors.configurationSource(corsConfigurationSource()))\n\n            // No server-side session: every request carries its own token\n            .sessionManagement(session ->\n                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/auth/login\", \"/api/auth/register\").permitAll()\n                .requestMatchers(HttpMethod.GET, \"/api/public/**\").permitAll()\n                .requestMatchers(\"/actuator/health\").permitAll()\n\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .requestMatchers(HttpMethod.DELETE, \"/api/**\").hasRole(\"ADMIN\")\n\n                .anyRequest().authenticated()          // deny by default\n            )\n\n            // Security headers\n            .headers(headers -> headers\n                .httpStrictTransportSecurity(hsts -> hsts\n                    .includeSubDomains(true)\n                    .maxAgeInSeconds(31536000))\n                .frameOptions(frame -> frame.deny())\n            )\n\n            // Consistent 401 / 403 instead of a login-page redirect\n            .exceptionHandling(ex -> ex\n                .authenticationEntryPoint((req, res, e) ->\n                    res.sendError(401, \"Authentication required\"))\n                .accessDeniedHandler((req, res, e) ->\n                    res.sendError(403, \"Access denied\"))\n            )\n\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);\n\n        return http.build();\n    }\n\n    @Bean\n    public CorsConfigurationSource corsConfigurationSource() {\n        CorsConfiguration config = new CorsConfiguration();\n\n        // Explicit origins - never \"*\" alongside allowCredentials(true)\n        config.setAllowedOrigins(List.of(\n            \"https://app.skillofied.com\",\n            \"http://localhost:5173\"\n        ));\n        config.setAllowedMethods(List.of(\"GET\", \"POST\", \"PUT\", \"PATCH\", \"DELETE\", \"OPTIONS\"));\n        config.setAllowedHeaders(List.of(\"Authorization\", \"Content-Type\"));\n        config.setAllowCredentials(true);\n        config.setMaxAge(3600L);\n\n        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();\n        source.registerCorsConfiguration(\"/api/**\", config);\n        return source;\n    }\n\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder(12);\n    }\n}",
        "codeOutput": "$ curl -i localhost:8080/api/students\nHTTP/1.1 401 Unauthorized\n\n$ curl -X POST localhost:8080/api/auth/login \\\n    -d '{\"username\":\"asha\",\"password\":\"student123\"}'\n{\"accessToken\":\"eyJhbGciOi...\",\"expiresIn\":900}\n\n$ curl localhost:8080/api/students -H \"Authorization: Bearer eyJhbGciOi...\"\n[{\"id\":1,\"name\":\"Asha Nair\",\"grade\":\"A\"}]\n\n$ curl -i -X DELETE localhost:8080/api/students/1 -H \"Authorization: Bearer eyJhbGciOi...\"\nHTTP/1.1 403 Forbidden\n\n# Wrong credentials give a deliberately vague message\n$ curl -X POST localhost:8080/api/auth/login -d '{\"username\":\"ghost\",\"password\":\"x\"}'\n{\"status\":401,\"message\":\"Invalid username or password\"}",
        "mistakes": [
          "Disabling CSRF on a cookie-authenticated application \"because requests were failing\". That is a real vulnerability.",
          "Setting `allowedOrigins(\"*\")` with `allowCredentials(true)`. Browsers reject it, and it is unsafe in any case.",
          "Leaving the session policy at its default for a token API, so Spring creates sessions you never use.",
          "Serving a bearer-token API over plain HTTP.",
          "Distinct error messages for \"no such user\" and \"wrong password\", enabling account enumeration.",
          "Registering the JWT filter after `UsernamePasswordAuthenticationFilter`, so the context is never populated in time."
        ],
        "takeaways": [
          "Stateless token API: disable CSRF, set `STATELESS`, insert the JWT filter early.",
          "CSRF is a cookie problem; CORS is a cross-origin browser rule. They are unrelated.",
          "Deny by default and layer controls — HTTPS, headers, rate limiting, validation.",
          "Keep error messages vague and dependencies current."
        ]
      }
    ],
    exercise: {
      title: 'Hash passwords and issue a JWT',
      description: 'Register a user with a BCrypt hash, then issue and verify a signed token.',
      instructions: ['Hash the password with BCryptPasswordEncoder before storing it - never store plaintext.', 'Verify logins with matches(), never with equals().', 'Issue a JWT containing only the subject and roles, with a 15-minute expiry.'],
      starterCode: 'public class Solution {\n    static PasswordEncoder encoder = new BCryptPasswordEncoder(12);\n\n    static boolean login(String raw, String storedHash) {\n        // TODO: use matches(), not equals()\n        return false;\n    }\n}',
      expectedOutput: 'matches(correct): true\nmatches(wrong): false\nToken issued, expires in 900s',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which class hashes user passwords in Spring Boot?', options: ['A. MD5PasswordEncoder', 'B. BCryptPasswordEncoder', 'C. SHAEncoder', 'D. Cryptor'], correctAnswer: 'B. BCryptPasswordEncoder' },
      { id: 2, question: 'What does JWT stand for?', options: ['A. Java Web Token', 'B. JSON Web Token', 'C. Joint Web Technology', 'D. Java Web Tool'], correctAnswer: 'B. JSON Web Token' },
      { id: 3, question: 'Where is Bearer JWT tokens sent in API calls?', options: ['A. Query params', 'B. Authorization Header', 'C. Cookie value', 'D. Response body'], correctAnswer: 'B. Authorization Header' },
      { id: 4, question: 'Which setting disables CSRF protection in Spring Security configs?', options: ['A. csrf.disable()', 'B. csrf().disable()', 'C. security.csrf(false)', 'D. disableCSRF()'], correctAnswer: 'B. csrf().disable()' },
      { id: 5, question: 'What verifies WHAT a user can access?', options: ['A. Authentication', 'B. Authorization', 'C. Registration', 'D. Verification'], correctAnswer: 'B. Authorization' },
      { id: 6, question: 'What is the difference between authentication and authorization?', options: ['A. AuthN is who you are; AuthZ is what you may do', 'B. They are the same', 'C. AuthZ comes first', 'D. AuthN is only for admins'], correctAnswer: 'A. AuthN is who you are; AuthZ is what you may do' },
      { id: 7, question: 'Which status means "not authenticated"?', options: ['A. 400', 'B. 401', 'C. 403', 'D. 404'], correctAnswer: 'B. 401' },
      { id: 8, question: 'Which status means "authenticated but not permitted"?', options: ['A. 401', 'B. 403', 'C. 405', 'D. 409'], correctAnswer: 'B. 403' },
      { id: 9, question: 'What are the three parts of a JWT?', options: ['A. header.payload.signature', 'B. key.value.hash', 'C. user.role.expiry', 'D. alg.data.secret'], correctAnswer: 'A. header.payload.signature' },
      { id: 10, question: 'Is a JWT payload encrypted?', options: ['A. Yes', 'B. No, it is only Base64URL encoded and readable by anyone', 'C. Only the claims', 'D. Only with HTTPS'], correctAnswer: 'B. No, it is only Base64URL encoded and readable by anyone' },
      { id: 11, question: 'What does the JWT signature guarantee?', options: ['A. Confidentiality', 'B. Integrity', 'C. Compression', 'D. Availability'], correctAnswer: 'B. Integrity' },
      { id: 12, question: 'What is the main drawback of stateless JWTs?', options: ['A. They are slow', 'B. They cannot easily be revoked before expiry', 'C. They need a database', 'D. They only work on one server'], correctAnswer: 'B. They cannot easily be revoked before expiry' },
      { id: 13, question: 'Why must passwords be hashed rather than encrypted?', options: ['A. Hashing is one-way; the system never needs the plaintext', 'B. Encryption is illegal', 'C. Hashing is faster', 'D. Encryption uses more disk'], correctAnswer: 'A. Hashing is one-way; the system never needs the plaintext' },
      { id: 14, question: 'Why are MD5 and SHA-256 unsuitable for password hashing?', options: ['A. They are too slow', 'B. They are too fast, enabling rapid brute force', 'C. They are not available in Java', 'D. They produce short output'], correctAnswer: 'B. They are too fast, enabling rapid brute force' },
      { id: 15, question: 'What does BCrypt do automatically that defeats rainbow tables?', options: ['A. Encryption', 'B. Generates a unique random salt per password', 'C. Compression', 'D. Key rotation'], correctAnswer: 'B. Generates a unique random salt per password' },
      { id: 16, question: 'How do you verify a password against a BCrypt hash?', options: ['A. hash.equals(encoder.encode(raw))', 'B. encoder.matches(raw, hash)', 'C. raw.equals(hash)', 'D. Arrays.equals()'], correctAnswer: 'B. encoder.matches(raw, hash)' },
      { id: 17, question: 'Why does encoding the same password twice with BCrypt give different results?', options: ['A. A bug', 'B. Each call uses a new random salt', 'C. Time is included', 'D. It does not'], correctAnswer: 'B. Each call uses a new random salt' },
      { id: 18, question: 'When is disabling CSRF protection acceptable?', options: ['A. Always', 'B. For a stateless API authenticated by an Authorization header', 'C. For cookie-based sessions', 'D. Never'], correctAnswer: 'B. For a stateless API authenticated by an Authorization header' },
      { id: 19, question: 'What does hasRole("ADMIN") actually match?', options: ['A. ADMIN', 'B. ROLE_ADMIN', 'C. role_admin', 'D. Admin'], correctAnswer: 'B. ROLE_ADMIN' },
      { id: 20, question: 'In what order are URL authorization rules evaluated?', options: ['A. Top to bottom, first match wins', 'B. Bottom to top', 'C. Most specific automatically first', 'D. Random'], correctAnswer: 'A. Top to bottom, first match wins' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt: 'In a JWT-based authentication flow for a Spring Boot application, where is the JWT usually retrieved from in subsequent requests?',
          options: [
            'A. The Authorization header (using Bearer scheme).',
            'B. The body of a POST request.',
            'C. A custom query parameter named ?token.',
            'D. The User-Agent header.'
          ],
          correctAnswer: 'A. The Authorization header (using Bearer scheme).'
        },
        {
          kind: 'mcq',
          prompt: 'Why is BCrypt hashing preferred over SHA-256 for password hashing?',
          options: [
            'A. SHA-256 is slow, making it vulnerable to denial of service attacks.',
            'B. BCrypt is a slow, adaptive hashing algorithm that makes brute-force attacks much harder; SHA-256 is extremely fast and vulnerable to hardware-accelerated cracking.',
            'C. BCrypt is built into Java standard library; SHA-256 requires third-party dependencies.',
            'D. SHA-256 hashes are easily decrypted back to plain text.'
          ],
          correctAnswer: 'B. BCrypt is a slow, adaptive hashing algorithm that makes brute-force attacks much harder; SHA-256 is extremely fast and vulnerable to hardware-accelerated cracking.'
        }
      ]
    }
  },
  m19: {
    id: 'm19',
    title: 'MODULE 19: DEPLOYMENT',
    overview: 'Deploy Spring Boot applications to production: building JAR files, configuring environment variables, Dockerizing, and hosting on AWS or Render.',
    outcomes: [
      'Compile executable JAR files.',
      'Dockerize Spring Boot apps.',
      'Deploy backend APIs to cloud hosting platforms.'
    ],
    lessons: [
      {
        "id": "m19-l1",
        "title": "Lesson 19.1 Building JAR Files",
        "objectives": [
          "Package an application as an executable JAR.",
          "Understand the fat-JAR layout."
        ],
        "theory": "A **JAR** is a ZIP archive of compiled classes and resources. Spring Boot produces a special kind: an **executable (fat, or uber) JAR** that contains your code, every dependency, and an embedded Tomcat. One file, `java -jar app.jar`, and the application is running. No application server to install, which is exactly what makes containerised deployment simple.\n\nThe `spring-boot-maven-plugin` performs the repackaging. `mvn package` first produces an ordinary JAR, then the plugin rewrites it into the Boot layout:\n\n```\napp.jar\n├── META-INF/MANIFEST.MF        <- Main-Class: JarLauncher\n├── org/springframework/boot/loader/   <- the launcher\n└── BOOT-INF/\n    ├── classes/                <- your code\n    └── lib/                    <- every dependency JAR\n```\n\nNested JARs are not something standard Java can load, which is why Boot ships its own `JarLauncher` as the manifest's `Main-Class`. It sets up a classloader that can read them, then calls your real main class.\n\nUseful commands: `mvn clean package` builds, `-DskipTests` skips tests (fine locally, never in CI), and `mvn spring-boot:build-image` produces an OCI container image with no Dockerfile at all.\n\nOne practical note: the plugin also keeps the pre-repackaging artefact as `app.jar.original`. If you deploy that by mistake you get \"no main manifest attribute\" — a confusing error with a simple cause.\n\nFor Docker, consider a **layered JAR** (enabled by default in recent versions), which splits dependencies from application code so image layers cache well and rebuilds stay small.",
        "syntax": "mvn clean package              # build\njava -jar target/app-1.0.0.jar # run\n\nmvn clean package -DskipTests  # skip tests (not in CI)",
        "codeExample": "<!-- The plugin that produces the executable JAR -->\n<build>\n    <finalName>student-api</finalName>\n    <plugins>\n        <plugin>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-maven-plugin</artifactId>\n            <configuration>\n                <!-- Split into layers so Docker caches dependencies separately -->\n                <layers>\n                    <enabled>true</enabled>\n                </layers>\n                <excludes>\n                    <exclude>\n                        <groupId>org.springframework.boot</groupId>\n                        <artifactId>spring-boot-devtools</artifactId>\n                    </exclude>\n                </excludes>\n            </configuration>\n        </plugin>\n    </plugins>\n</build>\n\n<!-- ============ Build and run ============\n\n$ ./mvnw clean package\n[INFO] Building jar: /project/target/student-api.jar\n[INFO] Replacing main artifact with repackaged archive\n[INFO] BUILD SUCCESS\n\n$ ls -lh target/\n  student-api.jar            42M   <- executable fat JAR\n  student-api.jar.original  180K   <- plain JAR, do NOT deploy this\n\n$ java -jar target/student-api.jar\nStarted Application in 2.31 seconds\n\n# Override configuration at launch\n$ java -jar target/student-api.jar --server.port=9090\n$ java -jar target/student-api.jar --spring.profiles.active=prod\n\n# Tune the JVM\n$ java -Xmx512m -jar target/student-api.jar\n\n# Inspect the layers Docker will cache\n$ java -Djarmode=layertools -jar target/student-api.jar list\n  dependencies\n  spring-boot-loader\n  snapshot-dependencies\n  application\n\n============ -->",
        "codeOutput": "$ java -jar target/student-api.jar\n\n  .   ____          _            __ _ _\n Spring Boot :: (v3.2.0)\n\nStarting Application v1.0.0 using Java 17\nThe following 1 profile is active: \"default\"\nTomcat initialized with port(s): 8080 (http)\nStarted Application in 2.314 seconds (process running for 2.61)",
        "mistakes": [
          "Omitting `spring-boot-maven-plugin`, so `mvn package` yields a plain JAR that fails with \"no main manifest attribute\".",
          "Deploying `app.jar.original` by mistake.",
          "Running `-DskipTests` in CI, defeating the point of the pipeline.",
          "Shipping DevTools in the production JAR.",
          "A Java version mismatch between build and runtime, producing `UnsupportedClassVersionError`."
        ],
        "takeaways": [
          "Boot produces a fat JAR containing dependencies and an embedded server.",
          "`spring-boot-maven-plugin` does the repackaging — it is required.",
          "Command-line arguments override `application.properties`.",
          "Layered JARs make Docker rebuilds much faster."
        ]
      },
      {
        "id": "m19-l2",
        "title": "Lesson 19.2 Environment Variables",
        "objectives": [
          "Externalise configuration.",
          "Understand property precedence.",
          "Use profiles."
        ],
        "theory": "The **twelve-factor** principle here is simple: **build once, deploy anywhere**. The same JAR should run in dev, staging and production, with only the environment differing. That means configuration must live outside the artefact.\n\nSpring Boot resolves properties from many sources in a defined **order of precedence**, highest first:\n\n1. Command-line arguments — `--server.port=9090`\n2. `SPRING_APPLICATION_JSON`\n3. OS environment variables\n4. `application-{profile}.properties`\n5. `application.properties`\n6. Defaults in code\n\nHigher sources override lower ones, which is what makes the pattern work: commit sensible defaults, override them per environment.\n\n**The naming translation** trips everyone up once. An environment variable maps to a property by upper-casing and replacing dots and dashes with underscores. `spring.datasource.url` becomes `SPRING_DATASOURCE_URL`. This *relaxed binding* is why cloud platforms can configure Spring apps with nothing but environment variables.\n\nIn a properties file, reference them with `${VAR}` and supply a fallback with `${VAR:default}`.\n\n**Profiles** group environment-specific configuration. Put values in `application-dev.properties` and `application-prod.properties`, activate with `--spring.profiles.active=prod`, and Boot layers the profile file over the base one. `@Profile(\"prod\")` on a bean restricts it to that environment.\n\nFor type-safe access to a group of related properties, prefer **`@ConfigurationProperties`** over scattered `@Value` annotations — it validates at startup rather than failing at first use.\n\nThe security rule underneath all of this: **secrets never go in the repository**. Use environment variables, or a secret manager in production.",
        "syntax": "# In a properties file\nspring.datasource.url=${DATABASE_URL:jdbc:h2:mem:testdb}\n\n# As an environment variable\nexport SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/school\n\n# As a command-line argument (highest precedence)\njava -jar app.jar --spring.datasource.url=...",
        "codeExample": "# ================= application.properties (defaults, committed) =================\nspring.application.name=student-api\nserver.port=${PORT:8080}\n\n# ${VAR:fallback} - works locally, overridden in production\nspring.datasource.url=${DATABASE_URL:jdbc:h2:mem:devdb}\nspring.datasource.username=${DATABASE_USER:sa}\nspring.datasource.password=${DATABASE_PASSWORD:}\n\napp.jwt.secret=${JWT_SECRET:dev-only-secret-change-me}\napp.jwt.expiration-ms=${JWT_EXPIRATION:900000}\napp.cors.allowed-origins=${CORS_ORIGINS:http://localhost:5173}\n\n\n# ================= application-prod.properties =================\nspring.jpa.hibernate.ddl-auto=validate\nspring.jpa.show-sql=false\nlogging.level.root=WARN\nlogging.level.com.skillofied=INFO\nserver.error.include-stacktrace=never\n\n\n// ================= Type-safe configuration =================\npackage com.skillofied.demo.config;\n\nimport jakarta.validation.constraints.*;\nimport org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.context.annotation.*;\nimport org.springframework.stereotype.Component;\nimport org.springframework.validation.annotation.Validated;\n\nimport java.util.List;\n\n// Fails fast at startup if a required value is missing or invalid\n@Component\n@Validated\n@ConfigurationProperties(prefix = \"app.jwt\")\npublic class JwtProperties {\n\n    @NotBlank(message = \"JWT_SECRET must be set\")\n    @Size(min = 32, message = \"JWT secret must be at least 32 characters\")\n    private String secret;\n\n    @Positive\n    private long expirationMs = 900_000;\n\n    public String getSecret() { return secret; }\n    public void setSecret(String secret) { this.secret = secret; }\n    public long getExpirationMs() { return expirationMs; }\n    public void setExpirationMs(long expirationMs) { this.expirationMs = expirationMs; }\n}\n\n@Component\n@ConfigurationProperties(prefix = \"app.cors\")\nclass CorsProperties {\n    private List<String> allowedOrigins = List.of();\n    public List<String> getAllowedOrigins() { return allowedOrigins; }\n    public void setAllowedOrigins(List<String> o) { this.allowedOrigins = o; }\n}\n\n// Profile-scoped beans\n@Configuration\nclass EnvironmentBeans {\n\n    @Bean\n    @Profile(\"dev\")\n    public String devBanner() { return \"Running in DEVELOPMENT\"; }\n\n    @Bean\n    @Profile(\"prod\")\n    public String prodBanner() { return \"Running in PRODUCTION\"; }\n}",
        "codeOutput": "# Local run - defaults apply\n$ java -jar app.jar\nUsing H2 in-memory database, port 8080\n\n# Production - environment variables win\n$ export DATABASE_URL=jdbc:postgresql://db.internal:5432/school\n$ export DATABASE_USER=api_user\n$ export DATABASE_PASSWORD=s3cr3t\n$ export JWT_SECRET=a-very-long-random-production-secret-value\n$ java -jar app.jar --spring.profiles.active=prod\n\nThe following 1 profile is active: \"prod\"\nHikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@1f2a\nStarted Application in 3.02 seconds\n\n# A missing required secret fails at startup, not at first login\n$ unset JWT_SECRET && java -jar app.jar --spring.profiles.active=prod\nAPPLICATION FAILED TO START\nProperty: app.jwt.secret\nReason: JWT secret must be at least 32 characters",
        "mistakes": [
          "Committing production secrets to `application.properties`.",
          "Getting the variable name wrong — `spring.datasource.url` is `SPRING_DATASOURCE_URL`, with underscores.",
          "Building a separate JAR per environment instead of one artefact plus configuration.",
          "Not setting `spring.profiles.active` in production, so development defaults silently apply.",
          "Scattering `@Value` everywhere instead of grouping with `@ConfigurationProperties`, losing startup validation."
        ],
        "takeaways": [
          "One artefact, many environments — configuration comes from outside.",
          "Precedence: CLI args > env vars > profile file > base file > code defaults.",
          "Environment variable names upper-case and replace dots with underscores.",
          "`@ConfigurationProperties` with `@Validated` fails fast on bad configuration."
        ]
      },
      {
        "id": "m19-l3",
        "title": "Lesson 19.3 Deploying on AWS",
        "objectives": [
          "Compare AWS deployment options.",
          "Deploy to Elastic Beanstalk.",
          "Follow production practices."
        ],
        "theory": "AWS offers several ways to run a Spring Boot JAR, and choosing well matters more than the mechanics.\n\n- **EC2** — a raw virtual machine. Maximum control, maximum operational burden: you patch the OS, configure the service, manage scaling.\n- **Elastic Beanstalk** — a managed platform. Upload the JAR and it provisions EC2, a load balancer, auto-scaling and health checks. **The best starting point.**\n- **ECS / Fargate** — run containers, with Fargate removing server management. The standard choice once you are containerised.\n- **Elastic Kubernetes Service** — full Kubernetes. Powerful, and overkill for a single service.\n- **Lambda** — serverless. Poorly suited to Spring Boot, whose startup time makes cold starts painful.\n\nA typical Beanstalk deployment is: build the JAR, create an application and environment on the *Corretto* platform, upload, and set environment variables in the console. Beanstalk expects your app on **port 5000**, so set `SERVER_PORT=5000` — missing this is the classic first-deployment failure, showing as a health check that never goes green.\n\nThe database belongs on **RDS**, provisioned separately rather than inside the Beanstalk environment, so that tearing down the environment does not destroy your data. Lock the RDS security group so it accepts connections only from your application's security group, never from the internet.\n\nProduction practices that are not optional: secrets in **Secrets Manager** or **Parameter Store**, not environment variables in the console; HTTPS terminated at the load balancer with an **ACM** certificate; logs shipped to **CloudWatch**; health checks pointed at `/actuator/health`; and auto-scaling configured on CPU.",
        "syntax": "# Build\nmvn clean package -DskipTests\n\n# Deploy with the EB CLI\neb init -p corretto-17 student-api --region ap-south-1\neb create student-api-prod --instance-type t3.small\neb setenv SERVER_PORT=5000 SPRING_PROFILES_ACTIVE=prod\neb deploy",
        "codeExample": "# ============ 1. Build the artefact ============\n$ ./mvnw clean package -DskipTests\n$ ls target/student-api.jar\n\n\n# ============ 2. Configure Beanstalk ============\n# .ebextensions/01-environment.config\noption_settings:\n  aws:elasticbeanstalk:application:environment:\n    SERVER_PORT: 5000              # Beanstalk proxies to 5000, not 8080\n    SPRING_PROFILES_ACTIVE: prod\n    JAVA_TOOL_OPTIONS: \"-Xmx512m\"\n\n  aws:elasticbeanstalk:environment:proxy:\n    ProxyServer: nginx\n\n  aws:elasticbeanstalk:environment:process:default:\n    HealthCheckPath: /actuator/health\n    MatcherHTTPCode: 200\n\n  aws:autoscaling:asg:\n    MinSize: 2                     # two instances for availability\n    MaxSize: 6\n\n\n# ============ 3. Provision RDS separately ============\n$ aws rds create-db-instance \\\n    --db-instance-identifier student-db \\\n    --db-instance-class db.t3.micro \\\n    --engine postgres \\\n    --allocated-storage 20 \\\n    --master-username apiuser \\\n    --manage-master-user-password \\\n    --no-publicly-accessible          # reachable only from the VPC\n\n\n# ============ 4. Store secrets properly ============\n$ aws secretsmanager create-secret \\\n    --name student-api/prod \\\n    --secret-string '{\"JWT_SECRET\":\"...\",\"DATABASE_PASSWORD\":\"...\"}'\n\n\n# ============ 5. Deploy ============\n$ eb init -p corretto-17 student-api --region ap-south-1\n$ eb create student-api-prod --instance-type t3.small --elb-type application\n$ eb setenv SPRING_PROFILES_ACTIVE=prod \\\n            SERVER_PORT=5000 \\\n            DATABASE_URL=jdbc:postgresql://student-db.xxxx.rds.amazonaws.com:5432/school\n$ eb deploy\n$ eb status\n$ eb logs\n\n\n# ============ 6. Expose the health endpoint ============\n# application-prod.properties\nmanagement.endpoints.web.exposure.include=health,info,metrics\nmanagement.endpoint.health.show-details=never\nmanagement.endpoint.health.probes.enabled=true",
        "codeOutput": "$ eb create student-api-prod\nCreating application version archive \"app-250730_1104\".\nUploading student-api/app-250730_1104.zip to S3...\nEnvironment details for: student-api-prod\n  Application name: student-api\n  Region: ap-south-1\n  CNAME: student-api-prod.ap-south-1.elasticbeanstalk.com\n\nPrinting Status:\n  INFO: Created load balancer named: awseb-AWSEB-1A2B3C\n  INFO: Successfully launched environment: student-api-prod\n\n$ eb status\n  Health: Green\n  Status: Ready\n  Running Version: app-250730_1104\n\n$ curl https://student-api-prod.ap-south-1.elasticbeanstalk.com/actuator/health\n{\"status\":\"UP\"}",
        "mistakes": [
          "Leaving the port at 8080. Beanstalk proxies to 5000, so health checks fail and the environment stays red.",
          "Running the database inside the Beanstalk environment, so terminating it destroys your data.",
          "Making the RDS instance publicly accessible instead of restricting it to the app security group.",
          "Storing secrets as plain environment variables in the console rather than Secrets Manager.",
          "Serving traffic over HTTP with no ACM certificate.",
          "A single instance with no auto-scaling, so any instance failure is an outage."
        ],
        "takeaways": [
          "Beanstalk is the easiest managed start; ECS/Fargate is the container-native choice.",
          "Set `SERVER_PORT=5000` for Beanstalk.",
          "Provision RDS separately and keep it private.",
          "Secrets Manager, ACM for HTTPS, CloudWatch for logs, `/actuator/health` for checks."
        ]
      },
      {
        "id": "m19-l4",
        "title": "Lesson 19.4 Deploying on Render",
        "objectives": [
          "Deploy a Spring Boot app to Render.",
          "Configure a managed database and health checks."
        ],
        "theory": "**Render** is a platform-as-a-service that connects to a Git repository, builds on push, and runs the result. Compared with AWS it trades fine-grained control for a dramatically shorter path to a running application — which makes it ideal for student projects, portfolios and MVPs.\n\nThe deployment model is straightforward. Connect your GitHub repository, choose a **Web Service**, and give Render two commands:\n\n- **Build command** — `./mvnw clean package -DskipTests`\n- **Start command** — `java -jar target/student-api.jar`\n\nRender then builds on every push to the tracked branch, giving you continuous deployment for free.\n\nThe one platform-specific detail that matters: **Render assigns the port through a `PORT` environment variable**, and your service must bind to it. Set `server.port=${PORT:8080}` and you work both locally and on Render. Binding to a hard-coded 8080 means the health check never passes and the deploy is marked failed — this is the single most common Render mistake, and it is the same class of error as Beanstalk's port 5000.\n\nRender offers **managed PostgreSQL**. Create the database, then reference its internal connection string from the web service. Use the *internal* URL — it does not traverse the public internet and is faster.\n\nTwo caveats to plan around. The **free tier spins down after inactivity**, so the next request pays a cold start of thirty seconds or more; use a paid instance for anything real. And the filesystem is **ephemeral** — anything written to disk disappears on redeploy, so uploads belong in S3 or an equivalent, never on local disk.\n\nAll of this can be committed as a `render.yaml` blueprint, which makes the infrastructure reproducible and reviewable.",
        "syntax": "# Build command\n./mvnw clean package -DskipTests\n\n# Start command\njava -jar target/student-api.jar\n\n# Essential: bind to the port Render assigns\nserver.port=${PORT:8080}",
        "codeExample": "# ============ render.yaml - infrastructure as code ============\nservices:\n  - type: web\n    name: student-api\n    runtime: docker              # or \"java\" for a buildpack deploy\n    plan: starter                # free tier spins down when idle\n    region: singapore\n    branch: main\n    healthCheckPath: /actuator/health\n\n    buildCommand: ./mvnw clean package -DskipTests\n    startCommand: java -Xmx400m -jar target/student-api.jar\n\n    envVars:\n      - key: SPRING_PROFILES_ACTIVE\n        value: prod\n\n      # Pulled from the managed database below\n      - key: DATABASE_URL\n        fromDatabase:\n          name: student-db\n          property: connectionString\n\n      # Generated once by Render and kept secret\n      - key: JWT_SECRET\n        generateValue: true\n\n      - key: CORS_ORIGINS\n        value: https://student-app.onrender.com\n\ndatabases:\n  - name: student-db\n    databaseName: school\n    user: apiuser\n    plan: starter\n    region: singapore\n\n\n# ============ application-prod.properties ============\n\n# CRITICAL: Render injects PORT. Binding to a fixed 8080 fails the health check.\nserver.port=${PORT:8080}\n\nspring.datasource.url=${DATABASE_URL}\nspring.jpa.hibernate.ddl-auto=validate\nspring.jpa.show-sql=false\n\nmanagement.endpoints.web.exposure.include=health\nmanagement.endpoint.health.probes.enabled=true\n\n# Free instances have little memory - keep the pool small\nspring.datasource.hikari.maximum-pool-size=5\n\n\n# ============ Optional Dockerfile for full control ============\n# Multi-stage: build with Maven, run on a slim JRE\nFROM maven:3.9-eclipse-temurin-17 AS build\nWORKDIR /app\nCOPY pom.xml .\nRUN mvn dependency:go-offline          # cached layer\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY --from=build /app/target/student-api.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"sh\", \"-c\", \"java -Xmx400m -jar app.jar --server.port=${PORT:-8080}\"]",
        "codeOutput": "==> Cloning from https://github.com/user/student-api\n==> Checking out commit 4f2a9c1 in branch main\n==> Running build command './mvnw clean package -DskipTests'\n    [INFO] BUILD SUCCESS\n    [INFO] Total time: 47.203 s\n==> Uploading build...\n==> Deploying...\n==> Running 'java -Xmx400m -jar target/student-api.jar'\n\n    Started Application in 4.112 seconds\n    Tomcat started on port 10000 (http)      <- Render assigned PORT=10000\n\n==> Your service is live at https://student-api.onrender.com\n\n$ curl https://student-api.onrender.com/actuator/health\n{\"status\":\"UP\"}",
        "mistakes": [
          "Hard-coding `server.port=8080`. Render assigns `PORT`, the health check fails, and the deploy is marked failed.",
          "Using the external database URL instead of the internal one, adding latency and public exposure.",
          "Writing uploads to the local filesystem, which is wiped on every redeploy.",
          "Expecting the free tier to stay warm — it spins down and cold-starts.",
          "Leaving `ddl-auto=update` on against a managed production database.",
          "Setting a large heap or connection pool that a small instance cannot support."
        ],
        "takeaways": [
          "Render builds from Git on push — connect the repo and give it build and start commands.",
          "`server.port=${PORT:8080}` is mandatory.",
          "Use the managed PostgreSQL internal connection string.",
          "The filesystem is ephemeral and the free tier sleeps."
        ]
      },
      {
        "id": "m19-l5",
        "title": "Lesson 19.5 Deploying with Docker",
        "objectives": [
          "Containerise a Spring Boot application.",
          "Write an efficient multi-stage Dockerfile.",
          "Orchestrate with Docker Compose."
        ],
        "theory": "**Docker** packages your application together with its runtime and dependencies into an **image**. A running instance of that image is a **container**. Because the image contains everything, it behaves identically on your laptop, in CI, and in production — the definitive answer to \"it works on my machine\".\n\nA container is not a virtual machine. It shares the host kernel and isolates only the process and filesystem, which is why it starts in milliseconds and costs megabytes rather than gigabytes.\n\n**Write a multi-stage Dockerfile.** The build stage needs Maven and the full JDK; the runtime stage needs only a JRE. Copying just the JAR from the build stage into a slim base image typically takes the result from ~700 MB down to under 200 MB. Smaller images pull faster, start faster, and expose less attack surface.\n\n**Order layers for caching.** Docker caches each instruction and invalidates everything after the first change. Copy `pom.xml` and download dependencies *before* copying `src`. Then a source-only change reuses the cached dependency layer, turning a three-minute rebuild into fifteen seconds.\n\n**Do not run as root.** Create an unprivileged user and switch to it with `USER`. If the container is compromised, the attacker inherits that user's limited rights.\n\n**Never bake secrets into an image.** Every `ENV` and every build argument is visible in the image history to anyone who can pull it. Pass secrets at runtime.\n\nA `.dockerignore` keeps `target/`, `.git/` and IDE files out of the build context — often shrinking it by an order of magnitude.\n\n**Docker Compose** then runs the whole stack — application plus database — with one command, using `depends_on` with a health condition so the app waits for the database to be genuinely ready rather than merely started.",
        "syntax": "docker build -t student-api:1.0 .\ndocker run -p 8080:8080 -e DATABASE_URL=... student-api:1.0\ndocker compose up -d",
        "codeExample": "# ==================== Dockerfile ====================\n# ---------- Stage 1: build (needs the full JDK + Maven) ----------\nFROM maven:3.9-eclipse-temurin-17 AS build\nWORKDIR /app\n\n# Copy the POM first so the dependency layer caches independently of source changes\nCOPY pom.xml .\nRUN mvn dependency:go-offline -B\n\n# Now the source - only this layer rebuilds when code changes\nCOPY src ./src\nRUN mvn clean package -DskipTests -B\n\n\n# ---------- Stage 2: runtime (JRE only - much smaller) ----------\nFROM eclipse-temurin:17-jre-alpine\n\n# Never run as root\nRUN addgroup -S spring && adduser -S spring -G spring\n\nWORKDIR /app\nCOPY --from=build --chown=spring:spring /app/target/*.jar app.jar\n\nUSER spring\n\nEXPOSE 8080\n\nHEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\\n  CMD wget -qO- http://localhost:8080/actuator/health || exit 1\n\n# Container-aware memory settings\nENTRYPOINT [\"java\", \\\n            \"-XX:MaxRAMPercentage=75.0\", \\\n            \"-XX:+UseContainerSupport\", \\\n            \"-jar\", \"app.jar\"]\n\n\n# ==================== .dockerignore ====================\n# target/\n# .git/\n# .idea/\n# *.md\n# .env\n\n\n# ==================== docker-compose.yml ====================\nservices:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: school\n      POSTGRES_USER: apiuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}     # from .env, never committed\n    volumes:\n      - pgdata:/var/lib/postgresql/data     # survives container restarts\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U apiuser -d school\"]\n      interval: 5s\n      retries: 5\n\n  api:\n    build: .\n    ports:\n      - \"8080:8080\"\n    environment:\n      SPRING_PROFILES_ACTIVE: prod\n      DATABASE_URL: jdbc:postgresql://db:5432/school   # \"db\" = the service name\n      DATABASE_USER: apiuser\n      DATABASE_PASSWORD: ${DB_PASSWORD}\n      JWT_SECRET: ${JWT_SECRET}\n    depends_on:\n      db:\n        condition: service_healthy          # wait for READY, not just started\n    restart: unless-stopped\n\nvolumes:\n  pgdata:",
        "codeOutput": "$ docker build -t student-api:1.0 .\n[+] Building 52.4s\n => [build 4/6] RUN mvn dependency:go-offline    38.2s\n => CACHED [build 5/6] COPY src ./src\n => [runtime 4/4] COPY --from=build /app/target/*.jar    0.4s\n => exporting to image\nSuccessfully tagged student-api:1.0\n\n$ docker images student-api\nREPOSITORY    TAG   SIZE\nstudent-api   1.0   187MB          # single-stage would be ~720MB\n\n$ docker compose up -d\n [+] Running 3/3\n  Network app_default   Created\n  Container app-db-1    Healthy\n  Container app-api-1   Started\n\n$ curl localhost:8080/actuator/health\n{\"status\":\"UP\",\"components\":{\"db\":{\"status\":\"UP\"}}}\n\n# A source-only change now rebuilds in seconds, not minutes\n$ docker build -t student-api:1.1 .\n[+] Building 14.1s   (dependency layer reused from cache)",
        "mistakes": [
          "A single-stage build shipping the whole JDK and Maven cache — several times larger than necessary.",
          "Copying `src` before running the dependency download, so every code change re-downloads everything.",
          "Running as root because no `USER` was set.",
          "Baking secrets in with `ENV`; they are permanently visible in the image history.",
          "Omitting `.dockerignore`, sending `target/` and `.git/` into the build context.",
          "Using `localhost` instead of the Compose service name to reach the database from the app container.",
          "Not using a volume for Postgres data, so the database is wiped whenever the container is recreated."
        ],
        "takeaways": [
          "Multi-stage builds keep the runtime image small.",
          "Copy `pom.xml` and resolve dependencies before copying source, for layer caching.",
          "Run as a non-root user and pass secrets at runtime.",
          "Compose with `depends_on: condition: service_healthy` and a named volume for data."
        ]
      }
    ],
    exercise: {
      title: 'Containerise and deploy the API',
      description: 'Write a multi-stage Dockerfile and externalise every environment-specific value.',
      instructions: ['Build with a JDK stage and run on a slim JRE stage to keep the image small.', 'Copy pom.xml and resolve dependencies before copying src so the layer caches.', 'Bind to ${PORT:8080}, run as a non-root user, and pass secrets at runtime.'],
      starterCode: '# TODO: stage 1 - build with maven:3.9-eclipse-temurin-17\n\n# TODO: stage 2 - run on eclipse-temurin:17-jre-alpine\n#       add a non-root user, EXPOSE 8080, ENTRYPOINT java -jar app.jar',
      expectedOutput: 'Image size: 187MB\nHealth check: {"status":"UP"}',
      type: 'code_sandbox'
    },
    quiz: [
      { id: 1, question: 'Which Maven command packages applications into executable JAR files?', options: ['A. mvn clean compile', 'B. mvn clean package', 'C. mvn execute', 'D. mvn build'], correctAnswer: 'B. mvn clean package' },
      { id: 2, question: 'Which keyword executes compiled JAR files?', options: ['A. execute app.jar', 'B. java -jar app.jar', 'C. run app.jar', 'D. start java app.jar'], correctAnswer: 'B. java -jar app.jar' },
      { id: 3, question: 'What docker command builds container images?', options: ['A. docker build', 'B. docker run', 'C. docker compile', 'D. docker images'], correctAnswer: 'A. docker build' },
      { id: 4, question: 'Where does Maven build compiled outputs?', options: ['A. src/main/bin', 'B. target/', 'C. out/', 'D. dist/'], correctAnswer: 'B. target/' },
      { id: 5, question: 'How are sensitive parameters passed to production environments?', options: ['A. Hardcoded inside classes', 'B. Committed in application.properties', 'C. Passed via Environment Variables', 'D. None of the above'], correctAnswer: 'C. Passed via Environment Variables' },
      { id: 6, question: 'What does the Spring Boot Maven plugin produce?', options: ['A. A WAR file only', 'B. An executable fat JAR with dependencies and an embedded server', 'C. A Docker image only', 'D. Source archives'], correctAnswer: 'B. An executable fat JAR with dependencies and an embedded server' },
      { id: 7, question: 'What error appears if you run a JAR built without the Boot plugin?', options: ['A. ClassNotFoundException', 'B. no main manifest attribute', 'C. OutOfMemoryError', 'D. NoSuchMethodError'], correctAnswer: 'B. no main manifest attribute' },
      { id: 8, question: 'Which command runs a Spring Boot JAR?', options: ['A. java -jar app.jar', 'B. java app.jar', 'C. run app.jar', 'D. mvn app.jar'], correctAnswer: 'A. java -jar app.jar' },
      { id: 9, question: 'Which configuration source has the highest precedence?', options: ['A. application.properties', 'B. Command-line arguments', 'C. Environment variables', 'D. Code defaults'], correctAnswer: 'B. Command-line arguments' },
      { id: 10, question: 'How does `spring.datasource.url` map to an environment variable?', options: ['A. SPRING_DATASOURCE_URL', 'B. spring-datasource-url', 'C. SPRING.DATASOURCE.URL', 'D. springDatasourceUrl'], correctAnswer: 'A. SPRING_DATASOURCE_URL' },
      { id: 11, question: 'What does `${DB_URL:jdbc:h2:mem:test}` mean?', options: ['A. A syntax error', 'B. Use DB_URL, or the H2 URL as a fallback', 'C. Always use H2', 'D. Concatenate both'], correctAnswer: 'B. Use DB_URL, or the H2 URL as a fallback' },
      { id: 12, question: 'How do you activate a Spring profile at launch?', options: ['A. --spring.profiles.active=prod', 'B. --profile=prod', 'C. -Dprofile=prod', 'D. --env=prod'], correctAnswer: 'A. --spring.profiles.active=prod' },
      { id: 13, question: 'Which port does AWS Elastic Beanstalk expect a Java app to bind to?', options: ['A. 8080', 'B. 5000', 'C. 80', 'D. 3000'], correctAnswer: 'B. 5000' },
      { id: 14, question: 'How does Render tell your app which port to use?', options: ['A. Always 8080', 'B. Through the PORT environment variable', 'C. In render.yaml only', 'D. It does not'], correctAnswer: 'B. Through the PORT environment variable' },
      { id: 15, question: 'Why should the Render filesystem not be used for uploads?', options: ['A. It is read-only', 'B. It is ephemeral and wiped on redeploy', 'C. It is too small', 'D. It is encrypted'], correctAnswer: 'B. It is ephemeral and wiped on redeploy' },
      { id: 16, question: 'What is the main benefit of a multi-stage Dockerfile?', options: ['A. Faster compilation', 'B. A much smaller runtime image containing only the JRE and JAR', 'C. Better security scanning', 'D. Automatic scaling'], correctAnswer: 'B. A much smaller runtime image containing only the JRE and JAR' },
      { id: 17, question: 'Why copy pom.xml and resolve dependencies before copying src?', options: ['A. Maven requires it', 'B. So the dependency layer stays cached when only source changes', 'C. To reduce image size', 'D. No reason'], correctAnswer: 'B. So the dependency layer stays cached when only source changes' },
      { id: 18, question: 'Why should a container not run as root?', options: ['A. It is slower', 'B. A compromise would inherit full privileges', 'C. Docker forbids it', 'D. It uses more memory'], correctAnswer: 'B. A compromise would inherit full privileges' },
      { id: 19, question: 'Why must secrets never be set with ENV in a Dockerfile?', options: ['A. ENV does not work', 'B. They are permanently visible in the image history', 'C. They are too long', 'D. They get encrypted'], correctAnswer: 'B. They are permanently visible in the image history' },
      { id: 20, question: 'In Docker Compose, how does the app container reach the database?', options: ['A. localhost', 'B. By the service name, e.g. jdbc:postgresql://db:5432/...', 'C. 127.0.0.1', 'D. The host IP'], correctAnswer: 'B. By the service name, e.g. jdbc:postgresql://db:5432/...' }
    ],
    assignment: {
      prompts: [
        { kind: 'code', prompt: 'Write a complete Dockerfile packaging a Spring Boot app using OpenJDK 17.', language: 'dockerfile', starterCode: '# Multi-stage build for a Spring Boot app on OpenJDK 17\n\n', runnable: false },
        {
          kind: 'mcq',
          prompt: 'What is the role of the clean lifecycle phase in Apache Maven?',
          options: [
            'A. It deletes unused source code files from the project directory.',
            'B. It removes the target directory (compiled classes, packaged files) to ensure a fresh, full build.',
            'C. It formats the source code according to style rules.',
            'D. It purges the local Maven repository (~/.m2) of all dependencies.'
          ],
          correctAnswer: 'B. It removes the target directory (compiled classes, packaged files) to ensure a fresh, full build.'
        }
      ]
    }
  }
};
