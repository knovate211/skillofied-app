import type { ModuleData } from '../JavaCourseData';

const mod_m2: ModuleData = {
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
    {id: 1, question: 'Which of the following is a valid variable identifier name in Java?', options: ["A. class", "B. 2varName", "C. _variable$5", "D. variable name"], correctAnswer: "C. _variable$5"},
    {id: 2, question: 'Which of the following data types is NOT a primitive data type in Java?', options: ["A. boolean", "B. char", "C. int", "D. String"], correctAnswer: "D. String"},
    {id: 3, question: 'What is the difference between widening type casting and narrowing type casting?', options: ["A. Widening casting happens automatically; narrowing casting must be done manually.", "B. Narrowing casting happens automatically; widening casting must be done manually.", "C. Both widening and narrowing type casting occur automatically at runtime.", "D. Widening casting applies only to objects, while narrowing casting applies only to primitives."], correctAnswer: "A. Widening casting happens automatically; narrowing casting must be done manually."},
    {id: 4, question: 'Which type of comment in Java is specifically processed by documentation generation utilities to create API reference sheets?', options: ['A. // Single-line comment', 'B. /** Documentation comment */', 'C. Shell comment', 'D. /* Multi-line comment */'], correctAnswer: 'B. /** Documentation comment */'},
    {id: 5, question: 'When collecting user console input using the Scanner class, what is the primary difference between using next() and nextLine()?', options: ["A. nextLine() reads only up to the next whitespace, while next() reads the whole line including the newline.", "B. next() reads only numeric characters, while nextLine() reads text.", "C. next() reads input up to the next whitespace delimiter, while nextLine() reads the entire line until a newline character.", "D. nextLine() handles numeric variables safer than next()."], correctAnswer: "C. next() reads input up to the next whitespace delimiter, while nextLine() reads the entire line until a newline character."},
    {id: 6, question: 'In the format string syntax used by System.out.printf(), what placeholder flag is designated to structure decimal floating-point representation outputs?', options: ["A. %d", "B. %c", "C. %s", "D. %f"], correctAnswer: "D. %f"},
    {id: 7, question: 'What is the behavior of short-circuit logical operators like && and || in Java expression evaluations?', options: ["A. They skip evaluating the second condition if the overall result is already determined by the first condition.", "B. They require execution paths to loop until variables change state.", "C. They always evaluate both sides of the expression to verify execution parity.", "D. They invert the boolean answer automatically at the end of the evaluation statement."], correctAnswer: "A. They skip evaluating the second condition if the overall result is already determined by the first condition."},
    {id: 8, question: 'Guess the output of the following Java code snippet:\n\nint a = 5;\nint b = a++ + ++a;\nSystem.out.println(\'a=\' + a + \', b=\' + b);', options: ['A. a=7, b=11', 'B. a=7, b=12', 'C. a=5, b=12', 'D. a=6, b=10'], correctAnswer: 'B. a=7, b=12'},
    {id: 9, question: 'Guess the output of the following Java code snippet:\n\nint x = 5;\nint y = 2;\ndouble result = x / y;\nSystem.out.println(result);', options: ["A. 2.5", "B. 0.4", "C. 2.0", "D. 3.0"], correctAnswer: "C. 2.0"},
    {id: 10, question: 'Guess the output of the following Java code snippet:\n\ndouble value = 9.78;\nint numerical = (int) value;\nSystem.out.println(numerical);', options: ['A. 9.78', 'B. 0', 'C. 10', 'D. 9'], correctAnswer: 'D. 9'},
    {id: 11, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(\'Output: \' + 10 + 20);', options: ["A. Output: 1020", "B. 30 Output:", "C. Compilation Error", "D. Output: 30"], correctAnswer: "A. Output: 1020"},
    {id: 12, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(10 + 20 + \' Output\');', options: ["A. Output 1020", "B. 30 Output", "C. 1020 Output", "D. Output 30"], correctAnswer: "B. 30 Output"},
    {id: 13, question: 'Guess the output of the following Java code snippet:\n\nint result = -5 % 2;\nSystem.out.println(result);', options: ["A. 1", "B. -2", "C. -1", "D. 0"], correctAnswer: "C. -1"},
    {id: 14, question: 'Guess the output of the following Java code snippet:\n\nboolean flag = false;\nint val = 10;\nif (flag && (val++ > 5)) {\nval += 5;\n}\nSystem.out.println(val);', options: ["A. 11", "B. 15", "C. 16", "D. 10"], correctAnswer: "D. 10"},
    {id: 15, question: 'Guess the output of the following Java code snippet:\n\nbyte b = 127;\nb++;\nSystem.out.println(b);', options: ["A. -128", "B. -1", "C. Compilation Error", "D. 128"], correctAnswer: "A. -128"},
    {id: 16, question: 'Guess the output of the following Java code snippet:\n\ndouble values = 5.6789;\nSystem.out.printf(\'%.2f\', values);', options: ["A. 5.6789", "B. 5.68", "C. 5.67", "D. 5.7"], correctAnswer: "B. 5.68"},
    {id: 17, question: 'Guess the output of the following Java code snippet:\n\nint n1 = 10;\nint n2 = 20;\nn1 = n1 + n2;\nn2 = n1 - n2;\nn1 = n1 - n2;\nSystem.out.println(\'n1=\' + n1 + \', n2=\' + n2);', options: ["A. n1=30, n2=10", "B. n1=10, n2=20", "C. n1=20, n2=10", "D. n1=20, n2=20"], correctAnswer: "C. n1=20, n2=10"},
    {id: 18, question: 'Guess the output of the following Java code snippet:\n\nint val1 = 10;\nint val2 = 20;\nint res = val1 > val2 ? val1 : val2 > 15 ? 30 : 40;\nSystem.out.println(res);', options: ['A. 20', 'B. 10', 'C. 40', 'D. 30'], correctAnswer: 'D. 30'},
    {id: 19, question: 'Guess the output of the following Java code snippet:\n\nSystem.out.println(5 > 3 || 4 < 2 && 10 == 10);', options: ['A. true', 'B. Runtime Exception', 'C. false', 'D. Compilation Error'], correctAnswer: 'A. true'},
    {id: 20, question: 'Guess the output of the following Java code snippet:\n\nchar letter = \\\'A\\\';\nletter++;\nSystem.out.println(letter);', options: ["A. 66", "B. B", "C. Compilation Error", "D. A1"], correctAnswer: "B. B"}
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
          "A. Narrowing is done automatically; widening must be done manually.",
          "B. Widening casting can result in data loss; narrowing casting never results in data loss.",
          "C. Widening is done automatically when converting a smaller type to a larger type; narrowing must be done manually.",
          "D. Widening is only applicable to reference types; narrowing is only applicable to primitive types.",
        ],
        correctAnswer: "C. Widening is done automatically when converting a smaller type to a larger type; narrowing must be done manually."
      }
    ]
  }
};

export default mod_m2;
