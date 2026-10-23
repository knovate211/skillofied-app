import type { ModuleData } from '../JavaCourseData';

const mod_m1: ModuleData = {
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
        "A. James Gosling",
        "B. Bjarne Stroustrup",
        "C. Dennis Ritchie",
        "D. Guido van Rossum",
      ],
      correctAnswer: "A. James Gosling"
    },
    {
      id: 2,
      question: 'What was the original name of the Java programming language when it was first developed?',
      options: [
        "A. Coffee",
        "B. Oak",
        "C. Green",
        "D. C+++",
      ],
      correctAnswer: "B. Oak"
    },
    {
      id: 3,
      question: "Which of the following slogans best describes Java's key feature of platform independence?",
      options: [
        "A. Run Once, Test Everywhere",
        "B. Compile Anywhere, Debug Everywhere",
        "C. Write Once, Run Anywhere (WORA)",
        "D. Code Once, Interpret Always",
      ],
      correctAnswer: "C. Write Once, Run Anywhere (WORA)"
    },
    {
      id: 4,
      question: 'What components are included in the Java Development Kit (JDK)?',
      options: [
        "A. Operating system libraries and JVM exclusively",
        "B. Only the Java Virtual Machine (JVM)",
        "C. Only the Java Runtime Environment (JRE)",
        "D. JRE and development tools like 'javac'",
      ],
      correctAnswer: "D. JRE and development tools like 'javac'"
    },
    {
      id: 5,
      question: 'Which component is strictly responsible for executing Java bytecode directly on a host machine?',
      options: [
        "A. Java Virtual Machine (JVM)",
        "B. Java Compiler (javac)",
        "C. Java Source File (.java)",
        "D. Integrated Development Environment (IDE)",
      ],
      correctAnswer: "A. Java Virtual Machine (JVM)"
    },
    {
      id: 6,
      question: 'What file extension does a compiled Java bytecode file have?',
      options: [
        "A. .java",
        "B. .class",
        "C. .exe",
        "D. .jar",
      ],
      correctAnswer: "B. .class"
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
        "A. Finalization Buffer",
        "B. Manual Deconstructors",
        "C. Memory Pointer Allocation",
        "D. Garbage Collection",
      ],
      correctAnswer: "D. Garbage Collection"
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
        "A. welcome.class",
        "B. Welcome.java",
        "C. Main.java",
        "D. welcome.java",
      ],
      correctAnswer: "B. Welcome.java"
    },
    {
      id: 11,
      question: 'Which tool or feature is an Integrated Development Environment (IDE) primarily used for during Java setup?',
      options: [
        "A. Hosting databases remotely",
        "B. Replacing the local operating system",
        "C. Providing an all-in-one text editor, build automation tool, and debugger",
        "D. Exclusively executing bytecode without an underlying JVM",
      ],
      correctAnswer: "C. Providing an all-in-one text editor, build automation tool, and debugger"
    },
    {
      id: 12,
      question: "What is the command line utility used to compile a Java file named 'Test.java'?",
      options: [
        "A. run javac Test",
        "B. java Test.java",
        "C. compile Test.class",
        "D. javac Test.java",
      ],
      correctAnswer: "D. javac Test.java"
    },
    {
      id: 13,
      question: "What does the 'void' keyword mean in the statement 'public static void main(String[] args)'?",
      options: [
        "A. The method does not return any value when it finishes executing.",
        "B. The method is empty and has no internal code logic.",
        "C. The method takes no parameters.",
        "D. The variables inside the method are null by default.",
      ],
      correctAnswer: "A. The method does not return any value when it finishes executing."
    },
    {
      id: 14,
      question: "Java is described as a 'Robust' language. Which feature directly contributes to this characteristic?",
      options: [
        "A. Lightweight syntax copied directly from scripting languages",
        "B. Strong type checking and exception handling mechanisms",
        "C. Support for platform-specific system pointers",
        "D. Its dependence on a web browser to run basic desktop software",
      ],
      correctAnswer: "B. Strong type checking and exception handling mechanisms"
    },
    {
      id: 15,
      question: "Which command is used to run a compiled class file named 'Demo.class' from the terminal?",
      options: [
        "A. execute Demo",
        "B. javac Demo",
        "C. java Demo",
        "D. run Demo.class",
      ],
      correctAnswer: "C. java Demo"
    },
    {
      id: 16,
      question: 'What system environment variable must often be configured manually to let your computer discover standard Java developer utilities from any directory terminal?',
      options: [
        "A. HOME_FOLDER",
        "B. IDE_LINK",
        "C. JAVA_VERSION",
        "D. PATH",
      ],
      correctAnswer: "D. PATH"
    },
    {
      id: 17,
      question: "Which of these lines uses correct syntax to display the message 'Hello World' on the user console screen?",
      options: [
        "A. System.out.println(\"Hello World\");",
        "B. Print(\"Hello World\");",
        "C. system.out.printLn('Hello World');",
        "D. System.Output.Println('Hello World');",
      ],
      correctAnswer: "A. System.out.println(\"Hello World\");"
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
        "A. They are completely independent systems with no overlapping tools.",
        "B. The JRE contains the JDK along with separate design compilers.",
        "C. The JDK is a superset that includes the complete JRE plus development tools.",
        "D. The JDK manages hardware interfaces while the JRE handles text formatting.",
      ],
      correctAnswer: "C. The JDK is a superset that includes the complete JRE plus development tools."
    },
    {
      id: 20,
      question: 'What role do double forward slashes (//) perform when written inside a Java source file?',
      options: [
        "A. They are required before importing external system modules.",
        "B. They create a secure network link to external servers.",
        "C. They represent integer mathematical division operations.",
        "D. They mark the beginning of a single-line text comment.",
      ],
      correctAnswer: "D. They mark the beginning of a single-line text comment."
    }
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: 'Which component of the Java environment contains the compiler (javac) and other development tools?',
        options: [
          "A. Java Development Kit (JDK)",
          "B. Java Virtual Machine (JVM)",
          "C. Java Runtime Environment (JRE)",
          "D. Java Class Loader",
        ],
        correctAnswer: "A. Java Development Kit (JDK)"
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
          "A. The JVM is platform-independent; the same JVM runs on Linux, Mac, and Windows.",
          "B. The JVM only runs on Windows systems.",
          "C. The JVM is platform-dependent; a specific version must be installed for each OS.",
          "D. The JVM is written entirely in Java and dynamically adapts to the host machine.",
        ],
        correctAnswer: "C. The JVM is platform-dependent; a specific version must be installed for each OS."
      },
      {
        kind: 'mcq',
        prompt: 'What is the correct command-line sequence to compile a Java file named App.java?',
        options: [
          "A. java App.java",
          "B. run App.class",
          "C. compile App.java",
          "D. javac App.java",
        ],
        correctAnswer: "D. javac App.java"
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
};

export default mod_m1;
