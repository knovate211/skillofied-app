import type { ModuleData } from '../JavaCourseData';

const mod_m5: ModuleData = {
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
    { id: 1, question: 'What keyword denotes that a method returns nothing?', options: ["A. void", "B. null", "C. blank", "D. static"], correctAnswer: "A. void" },
    { id: 2, question: 'Which error happens if recursive calls have no terminating base case?', options: ['A. NullPointerException', 'B. StackOverflowError', 'C. ArithmeticException', 'D. OutOfMemoryError'], correctAnswer: 'B. StackOverflowError' },
    { id: 3, question: 'Can you overload a method by changing only the return type?', options: ["A. Yes", "B. Depends on JVM", "C. No", "D. Only in interfaces"], correctAnswer: "C. No" },
    { id: 4, question: 'How is data passed into Java methods?', options: ["A. Pass by reference", "B. Pass by pointer", "C. Pass by address", "D. Pass by value"], correctAnswer: "D. Pass by value" },
    { id: 5, question: 'What is dynamic method binding?', options: ["A. Overriding resolution at runtime", "B. Overloading resolution", "C. Runtime recursion", "D. Importing classes"], correctAnswer: "A. Overriding resolution at runtime" },
    { id: 6, question: 'What is method overloading?', options: ["A. Same name and same parameters in a subclass", "B. Same name, different parameter lists", "C. Calling a method twice", "D. A method that is too long"], correctAnswer: "B. Same name, different parameter lists" },
    { id: 7, question: 'Can two methods be overloaded by return type alone?', options: ["A. Yes", "B. Only for static methods", "C. No, it is a compile error", "D. Only for void"], correctAnswer: "C. No, it is a compile error" },
    { id: 8, question: 'What must every recursive method have to avoid StackOverflowError?', options: ["A. A loop", "B. A return type of void", "C. Two parameters", "D. A base case"], correctAnswer: "D. A base case" },
    { id: 9, question: 'How are primitive arguments passed in Java?', options: ["A. By value (a copy)", "B. By reference", "C. By pointer", "D. By name"], correctAnswer: "A. By value (a copy)" },
    { id: 10, question: 'When you pass an object to a method, what is copied?', options: ['A. The whole object', 'B. The reference value', 'C. Nothing', 'D. Only the fields'], correctAnswer: 'B. The reference value' },
    { id: 11, question: 'What does a method with return type `void` return?', options: ['A. null', 'B. 0', 'C. Nothing', 'D. An empty object'], correctAnswer: 'C. Nothing' },
    { id: 12, question: 'What keyword allows a method to be called without creating an object?', options: ["A. final", "B. public", "C. abstract", "D. static"], correctAnswer: "D. static" },
    { id: 13, question: 'Can a static method directly access an instance variable?', options: ["A. No, it has no instance context", "B. Yes, always", "C. Only if the variable is public", "D. Only in the constructor"], correctAnswer: "A. No, it has no instance context" },
    { id: 14, question: 'What is the scope of a local variable declared inside a method?', options: ['A. The whole class', 'B. Only that method', 'C. The whole package', 'D. All subclasses'], correctAnswer: 'B. Only that method' },
    { id: 15, question: 'What does varargs (`int... nums`) allow?', options: ["A. Exactly three arguments", "B. Only arrays", "C. Zero or more arguments of that type", "D. Named arguments"], correctAnswer: "C. Zero or more arguments of that type" },
    { id: 16, question: 'Where must a varargs parameter appear in a parameter list?', options: ["A. First", "B. Anywhere", "C. It cannot be combined with others", "D. Last"], correctAnswer: "D. Last" },
    { id: 17, question: 'What is the recursive definition of factorial(0)?', options: ["A. 1", "B. 0", "C. Undefined", "D. -1"], correctAnswer: "A. 1" },
    { id: 18, question: 'Which is generally more memory-efficient for simple repetition?', options: ['A. Recursion', 'B. Iteration', 'C. They are identical', 'D. Neither'], correctAnswer: 'B. Iteration' },
    { id: 19, question: 'What happens when a local variable shadows an instance variable of the same name?', options: ["A. Compile error", "B. The instance variable wins", "C. The local variable wins inside that scope", "D. Both are updated"], correctAnswer: "C. The local variable wins inside that scope" },
    { id: 20, question: 'Which access modifier makes a method visible only within its own class?', options: ["A. public", "B. protected", "C. default", "D. private"], correctAnswer: "D. private" }
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
};

export default mod_m5;
