import type { ModuleData } from '../JavaCourseData';

const mod_m4: ModuleData = {
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
    { id: 1, question: 'Which loop is guaranteed to execute at least once?', options: ["A. for loop", "B. while loop", "C. enhanced-for loop", "D. do-while loop"], correctAnswer: "D. do-while loop" },
    { id: 2, question: 'Which statement skips remaining lines in a loop iteration and moves to the next iteration?', options: ["A. continue", "B. break", "C. exit", "D. return"], correctAnswer: "A. continue" },
    { id: 3, question: 'What happens if a loop condition is always true and has no break?', options: ['A. Program completes', 'B. Infinite loop', 'C. Compiler crash', 'D. Syntax error'], correctAnswer: 'B. Infinite loop' },
    { id: 4, question: 'What is the runtime complexity of two nested loops matching bounds N?', options: ['A. O(N)', 'B. O(log N)', 'C. O(N^2)', 'D. O(1)'], correctAnswer: 'C. O(N^2)' },
    { id: 5, question: 'What is required at the end of a do-while loop statement?', options: ["A. colon (:)", "B. double colon (::)", "C. nothing", "D. semicolon (;)"], correctAnswer: "D. semicolon (;)" },
    { id: 6, question: 'Which loop is best when the number of iterations is known in advance?', options: ["A. for", "B. while", "C. do-while", "D. infinite"], correctAnswer: "A. for" },
    { id: 7, question: 'What does the enhanced for loop (for-each) NOT allow you to do?', options: ["A. Read each element", "B. Modify the array structure while iterating", "C. Iterate over a List or Set", "D. Iterate arrays of primitive types such as int[]"], correctAnswer: 'B. Modify the array structure while iterating' },
    { id: 8, question: 'How many times does `for (int i = 0; i < 5; i++)` execute its body?', options: ["A. 4", "B. 6", "C. 5", "D. 0"], correctAnswer: "C. 5" },
    { id: 9, question: 'What does `break` do inside a nested loop?', options: ["A. Exits all loops", "B. Skips one iteration", "C. Restarts the loop", "D. Exits only the innermost loop"], correctAnswer: "D. Exits only the innermost loop" },
    { id: 10, question: 'Which construct lets `break` exit an outer loop directly?', options: ['A. A labelled break', 'B. break outer;', 'C. exit()', 'D. It is impossible'], correctAnswer: 'A. A labelled break' },
    { id: 11, question: 'What is printed by `for (int i = 0; i < 3; i++) { if (i == 1) continue; System.out.print(i); }`?', options: ['A. 012', 'B. 02', 'C. 12', 'D. 0'], correctAnswer: 'B. 02' },
    { id: 12, question: 'Which part of a for loop is executed only once?', options: ["A. Condition", "B. Update", "C. Initialization", "D. Body"], correctAnswer: "C. Initialization" },
    { id: 13, question: 'What happens with `for (;;)`?', options: ["A. Compile error", "B. Runs zero times", "C. Runs once", "D. Infinite loop"], correctAnswer: "D. Infinite loop" },
    { id: 14, question: 'Where is a variable declared in a for loop initializer accessible?', options: ["A. Only inside that loop", "B. Everywhere in the class", "C. In the enclosing method after the loop", "D. Only in the condition"], correctAnswer: "A. Only inside that loop" },
    { id: 15, question: 'Which loop checks its condition AFTER executing the body?', options: ["A. for", "B. do-while", "C. while", "D. for-each"], correctAnswer: "B. do-while" },
    { id: 16, question: 'How many total iterations does a nested loop with outer 3 and inner 4 perform?', options: ["A. 7", "B. 34", "C. 12", "D. 4"], correctAnswer: "C. 12" },
    { id: 17, question: 'What is the output of `int i = 0; while (i++ < 3) System.out.print(i);`?', options: ["A. 012", "B. 0123", "C. 12", "D. 123"], correctAnswer: "D. 123" },
    { id: 18, question: 'Which statement immediately exits the enclosing method, not just the loop?', options: ["A. return", "B. break", "C. continue", "D. exit"], correctAnswer: "A. return" },
    { id: 19, question: 'What is a common cause of an unintentional infinite while loop?', options: ["A. Using braces", "B. Forgetting to update the loop variable", "C. Declaring the variable as int", "D. Using a condition"], correctAnswer: "B. Forgetting to update the loop variable" },
    { id: 20, question: 'Which loop type is most appropriate for iterating every element of a collection read-only?', options: ["A. do-while", "B. Labelled loop", "C. enhanced for (for-each)", "D. Infinite loop"], correctAnswer: "C. enhanced for (for-each)" }
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
          "A. continue terminates the loop entirely; break skips the current iteration.",
          "B. break can only be used in while loops; continue can only be used in for loops.",
          "C. both statements do the exact same thing but have different names.",
          "D. break terminates the loop entirely; continue skips the current iteration and moves to the next one.",
        ],
        correctAnswer: "D. break terminates the loop entirely; continue skips the current iteration and moves to the next one."
      }
    ]
  }
};

export default mod_m4;
