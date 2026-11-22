import type { ModuleData } from '../JavaCourseData';

const mod_m9: ModuleData = {
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
    { id: 2, question: 'Which keyword declares exceptions in method headers?', options: ["A. throw", "B. try", "C. declare", "D. throws"], correctAnswer: "D. throws" },
    { id: 3, question: 'Which class serves as the parent to all exceptions?', options: ['A. Throwable', 'B. Object', 'C. Error', 'D. Compiler'], correctAnswer: 'A. Throwable' },
    { id: 4, question: 'Is NullPointerException checked or unchecked?', options: ['A. Checked', 'B. Unchecked', 'C. Error', 'D. Warning'], correctAnswer: 'B. Unchecked' },
    { id: 5, question: 'How do you create a custom checked exception?', options: ["A. Extend RuntimeException", "B. Extend Error", "C. Extend Exception", "D. Implement Interface"], correctAnswer: "C. Extend Exception" },
    { id: 6, question: 'Which class is the parent of all errors and exceptions?', options: ["A. Exception", "B. Error", "C. RuntimeException", "D. Throwable"], correctAnswer: "D. Throwable" },
    { id: 7, question: 'Which of these is a checked exception?', options: ["A. IOException", "B. NullPointerException", "C. ArithmeticException", "D. ArrayIndexOutOfBoundsException"], correctAnswer: "A. IOException" },
    { id: 8, question: 'Which of these is unchecked?', options: ["A. IOException", "B. NullPointerException", "C. SQLException", "D. FileNotFoundException"], correctAnswer: "B. NullPointerException" },
    { id: 9, question: 'When does a `finally` block execute?', options: ["A. Only on success", "B. Only on exception", "C. Almost always, whether or not an exception occurred", "D. Only when the try block completes without an exception"], correctAnswer: 'C. Almost always, whether or not an exception occurred' },
    { id: 10, question: 'What is the difference between `throw` and `throws`?', options: ["A. They are identical", "B. throws raises; throw declares", "C. throw is for errors only", "D. throw raises an exception; throws declares one"], correctAnswer: "D. throw raises an exception; throws declares one" },
    { id: 11, question: 'In a multi-catch chain, which order is required?', options: ["A. Most specific first", "B. Most general first", "C. Any order", "D. Alphabetical"], correctAnswer: "A. Most specific first" },
    { id: 12, question: 'What does try-with-resources guarantee?', options: ["A. No exceptions occur", "B. Declared AutoCloseable resources are closed", "C. The resources are reopened if an exception occurs", "D. Exceptions thrown inside the block are suppressed"], correctAnswer: 'B. Declared AutoCloseable resources are closed' },
    { id: 13, question: 'Which exception is thrown by dividing an int by zero?', options: ["A. NumberFormatException", "B. NullPointerException", "C. ArithmeticException", "D. None, it returns Infinity"], correctAnswer: "C. ArithmeticException" },
    { id: 14, question: 'What does `1.0 / 0` produce for doubles?', options: ["A. ArithmeticException", "B. 0", "C. NaN", "D. Infinity"], correctAnswer: "D. Infinity" },
    { id: 15, question: 'Which class should a custom business exception usually extend?', options: ["A. RuntimeException", "B. Error", "C. Throwable", "D. Thread"], correctAnswer: "A. RuntimeException" },
    { id: 16, question: 'What is thrown by `Integer.parseInt("abc")`?', options: ["A. ClassCastException", "B. NumberFormatException", "C. IOException", "D. ParseException"], correctAnswer: "B. NumberFormatException" },
    { id: 17, question: 'Should you catch `Error` (e.g. OutOfMemoryError)?', options: ["A. Yes, so the application can recover and continue", "B. Only in main()", "C. No, they signal unrecoverable JVM conditions", "D. Only in finally"], correctAnswer: "C. No, they signal unrecoverable JVM conditions" },
    { id: 18, question: 'What is wrong with an empty catch block?', options: ["A. Nothing", "B. It is a compile error", "C. It rethrows automatically", "D. It silently swallows failures"], correctAnswer: "D. It silently swallows failures" },
    { id: 19, question: 'Can a try block exist without catch?', options: ["A. Yes, if it has finally or is try-with-resources", "B. No, every try needs at least one catch block", "C. Only in static methods", "D. Only in interfaces"], correctAnswer: "A. Yes, if it has finally or is try-with-resources" },
    { id: 20, question: 'What does exception chaining preserve?', options: ["A. The stack size", "B. The original cause of the failure", "C. The thread name", "D. The class loader"], correctAnswer: "B. The original cause of the failure" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a block of code reading file inputs that catches custom file errors.', language: 'java', starterCode: 'import java.io.*;\n\nclass FileFormatException extends RuntimeException {\n    FileFormatException(String message) { super(message); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Read a file with try-with-resources and handle IOException,\n        // then throw and catch your custom exception\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'What is the difference between the throw and throws keywords in Java exception handling?',
        options: [
          "A. throws is used to explicitly throw an exception; throw is used to declare exceptions in a method signature.",
          "B. throw can only throw checked exceptions; throws can only throw unchecked exceptions.",
          "C. throw is used to explicitly throw a single exception instance; throws is used in method signatures to declare exceptions that might be thrown.",
          "D. there is no functional difference; they can be used interchangeably.",
        ],
        correctAnswer: "C. throw is used to explicitly throw a single exception instance; throws is used in method signatures to declare exceptions that might be thrown."
      }
    ]
  }
};

export default mod_m9;
