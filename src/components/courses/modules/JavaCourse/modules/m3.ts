import type { ModuleData } from '../JavaCourseData';

const mod_m3: ModuleData = {
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
    {id: 1, question: 'Which of the following data types CANNOT be used as the controlling expression in a standard Java switch-case statement?', options: ["A. char", "B. int", "C. String", "D. double"], correctAnswer: "D. double"},
    {id: 2, question: 'What happens if a matching case block in a switch statement does not contain a \'break\' statement?', options: ["A. The program falls through, executing subsequent case blocks sequentially until a break or the end of the switch is encountered.", "B. The compiler inserts an implicit break at the end of the matching case, so only that case block runs.", "C. The switch statement terminates instantly without running anything.", "D. Execution immediately jumps to the default block regardless of its position."], correctAnswer: "A. The program falls through, executing subsequent case blocks sequentially until a break or the end of the switch is encountered."},
    {id: 3, question: 'Which statement best describes the evaluation behavior of a conditional statement structured with nested if blocks?', options: ["A. The inner 'if' condition is evaluated regardless of whether the outer 'if' condition is true or false.", "B. The inner 'if' condition is evaluated only if the outer 'if' condition evaluates to true.", "C. The compiler combines them automatically into a single flat logical AND expression.", "D. Both outer and inner conditions are checked simultaneously in parallel."], correctAnswer: "B. The inner 'if' condition is evaluated only if the outer 'if' condition evaluates to true."},
    {id: 4, question: 'How many operands are evaluated by a conditional ternary operator expression in Java?', options: ["A. 1", "B. 2", "C. 3", "D. 4"], correctAnswer: "C. 3"},
    {id: 5, question: 'Guess the output of the following Java code snippet:\n\nint score = 75;\nif (score > 80)\nSystem.out.print(\'A \');\nSystem.out.print(\'Passed \');', options: ["A. No output is displayed", "B. A Passed", "C. A", "D. Passed"], correctAnswer: "D. Passed"},
    {id: 6, question: 'Guess the output of the following Java code snippet:\n\nint x = 10;\nint y = 20;\nif (x > 5) {\nif (y < 15) {\nSystem.out.println(\'Block 1\');\n} else {\nSystem.out.println(\'Block 2\');\n}\n} else {\nSystem.out.println(\'Block 3\');\n}', options: ["A. Block 2", "B. Block 1", "C. Block 3", "D. Block 2\nBlock 3"], correctAnswer: "A. Block 2"},
    {id: 7, question: 'Guess the output of the following Java code snippet:\n\nint status = 2;\nswitch (status) {\ncase 1:\nSystem.out.print(\'Ready \');\ncase 2:\nSystem.out.print(\'Set \');\ncase 3:\nSystem.out.print(\'Go \');\ndefault:\nSystem.out.print(\'Done \');\n}', options: ['A. Set', 'B. Set Go Done', 'C. Set Done', 'D. Ready Set Go Done'], correctAnswer: 'B. Set Go Done'},
    {id: 8, question: 'Guess the output of the following Java code snippet:\n\nint a = 10, b = 5;\nString result = (a < b) ? \'Low\' : (a == b) ? \'Equal\' : \'High\';\nSystem.out.println(result);', options: ["A. Low", "B. Compilation Error", "C. High", "D. Equal"], correctAnswer: "C. High"},
    {id: 9, question: 'Guess the output of the following Java code snippet:\n\nint number = 15;\nif (number % 3 == 0 || number % 5 == 0) {\nSystem.out.println(\'Divisible\');\n} else if (number % 15 == 0) {\nSystem.out.println(\'Divisible by 15\');\n}', options: ["A. Divisible by 15", "B. Divisible\nDivisible by 15", "C. No output due to compilation conflict", "D. Divisible"], correctAnswer: "D. Divisible"},
    {id: 10, question: 'Guess the output of the following Java code snippet:\n\nint count = 10;\nboolean check = false;\nif (check && (count++ > 5)) {\nSystem.out.println(\'Inside\');\n}\nSystem.out.println(count);', options: ["A. 10", "B. Runtime Error", "C. 11", "D. Inside\n11"], correctAnswer: "A. 10"},
    {id: 11, question: 'Guess the output of the following Java code snippet:\n\nint value = 5;\nif (value = 10) {\nSystem.out.println(\'True Block\');\n} else {\nSystem.out.println(\'False Block\');\n}', options: ["A. False Block", "B. Compilation Error", "C. True Block", "D. 5"], correctAnswer: "B. Compilation Error"},
    {id: 12, question: 'Guess the output of the following Java code snippet:\n\nboolean power = true;\nif (power = false) {\nSystem.out.println(\'On\');\n} else {\nSystem.out.println(\'Off\');\n}', options: ['A. No output', 'B. Compilation Error', 'C. Off', 'D. On'], correctAnswer: 'C. Off'},
    {id: 13, question: 'Guess the output of the following Java code snippet:\n\nint code = 3;\nint adjustment = switch (code) {\ncase 1, 2 -> 10;\ncase 3, 4 -> 20;\ndefault -> 30;\n};\nSystem.out.println(adjustment);', options: ["A. 30", "B. 10", "C. Compilation Error", "D. 20"], correctAnswer: "D. 20"},
    {id: 14, question: 'Guess the output of the following Java code snippet:\n\nint age = 18;\nboolean registration = true;\nSystem.out.println(age >= 18 || !registration ? \'Allowed\' : \'Denied\');', options: ["A. Allowed", "B. true", "C. Compilation Error", "D. Denied"], correctAnswer: "A. Allowed"},
    {id: 15, question: 'Guess the output of the following Java code snippet:\n\nint keys = 5;\nswitch (keys) {\ndefault:\nSystem.out.print(\'Unknown \');\ncase 1:\nSystem.out.print(\'One \');\nbreak;\ncase 5:\nSystem.out.print(\'Five \');\n}', options: ['A. Unknown One Five', 'B. Five', 'C. Five Unknown', 'D. Unknown One'], correctAnswer: 'B. Five'},
    {id: 16, question: 'Guess the output of the following Java code snippet:\n\nint option = 0;\nswitch (option) {\ndefault:\nSystem.out.print(\'Default \');\ncase 1:\nSystem.out.print(\'One \');\nbreak;\ncase 2:\nSystem.out.print(\'Two \');\n}', options: ["A. Default", "B. One", "C. Default One", "D. Default One Two"], correctAnswer: "C. Default One"},
    {id: 17, question: 'Guess the output of the following Java code snippet:\n\nint temperature = 32;\nif (temperature > 30)\nif (temperature < 25)\nSystem.out.println(\'Ideal\');\nelse\nSystem.out.println(\'Warm\');', options: ["A. Ideal", "B. Compilation Error", "C. No output is displayed", "D. Warm"], correctAnswer: "D. Warm"},
    {id: 18, question: 'Guess the output of the following Java code snippet:\n\nint threshold = 5;\nboolean alert = true;\nif (!alert || (++threshold > 10)) {\nSystem.out.print(\'Active \');\n}\nSystem.out.println(threshold);', options: ["A. 6", "B. Active 6", "C. Active 5", "D. 5"], correctAnswer: "A. 6"},
    {id: 19, question: 'Guess the output of the following Java code snippet:\n\nint x = 4;\nint result = (x % 2 == 0) ? (x * 2) : (x / 2);\nSystem.out.println(result);', options: ['A. 2', 'B. 8', 'C. 16', 'D. 4'], correctAnswer: 'B. 8'},
    {id: 20, question: 'Guess the output of the following Java code snippet:\n\nint point = 2;\nswitch (point) {\ncase 1:\nSystem.out.print(\'Point 1 \');\nbreak;\ncase 2:\n// Empty Case\ncase 3:\nSystem.out.print(\'Point 3 \');\nbreak;\ndefault:\nSystem.out.print(\'End \');\n}', options: ["A. No output is displayed", "B. Compilation Error", "C. Point 3", "D. End"], correctAnswer: "C. Point 3"}
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
};

export default mod_m3;
