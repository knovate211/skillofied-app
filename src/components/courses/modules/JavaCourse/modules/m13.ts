import type { ModuleData } from '../JavaCourseData';

const mod_m13: ModuleData = {
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
    { id: 1, question: 'Which annotation declares single-method functional interfaces?', options: ["A. @Interface", "B. @Lambda", "C. @FunctionalInterface", "D. @Contract"], correctAnswer: "C. @FunctionalInterface" },
    { id: 2, question: 'Which operator denotes method references?', options: ["A. ->", "B. .", "C. #", "D. ::"], correctAnswer: "D. ::" },
    { id: 3, question: 'Which Stream operation aggregates elements to a single result?', options: ["A. reduce()", "B. map()", "C. filter()", "D. sorted()"], correctAnswer: "A. reduce()" },
    { id: 4, question: 'How do you create an empty Optional container?', options: ["A. new Optional()", "B. Optional.empty()", "C. Optional.of(null)", "D. Optional.clear()"], correctAnswer: "B. Optional.empty()" },
    { id: 5, question: 'Is stream map() intermediate or terminal?', options: ["A. Terminal", "B. Finalizer", "C. Intermediate", "D. Getter"], correctAnswer: "C. Intermediate" },
    { id: 6, question: 'What is a functional interface?', options: ["A. Any interface", "B. An interface with only static methods", "C. A class with one method", "D. An interface with exactly one abstract method"], correctAnswer: "D. An interface with exactly one abstract method" },
    { id: 7, question: 'Which annotation enforces the functional-interface contract?', options: ["A. @FunctionalInterface", "B. @Override", "C. @Lambda", "D. @Interface"], correctAnswer: "A. @FunctionalInterface" },
    { id: 8, question: 'What must a local variable be to be captured by a lambda?', options: ["A. static", "B. final or effectively final", "C. public", "D. volatile"], correctAnswer: "B. final or effectively final" },
    { id: 9, question: 'Which functional interface represents `boolean test(T)`?', options: ["A. Function", "B. Consumer", "C. Predicate", "D. Supplier"], correctAnswer: "C. Predicate" },
    { id: 10, question: 'Which represents `R apply(T)`?', options: ["A. Predicate", "B. Supplier", "C. Consumer", "D. Function"], correctAnswer: "D. Function" },
    { id: 11, question: 'Which takes an argument and returns nothing?', options: ["A. Consumer", "B. Supplier", "C. Function", "D. Predicate"], correctAnswer: "A. Consumer" },
    { id: 12, question: 'Which takes no argument and returns a value?', options: ['A. Consumer', 'B. Supplier', 'C. Predicate', 'D. Runnable'], correctAnswer: 'B. Supplier' },
    { id: 13, question: 'What are the three parts of a stream pipeline?', options: ["A. Start, middle, end", "B. Filter, map and collect, always in that order", "C. Source, intermediate operations, terminal operation", "D. Input, process, print"], correctAnswer: "C. Source, intermediate operations, terminal operation" },
    { id: 14, question: 'What happens if a stream pipeline has no terminal operation?', options: ["A. It throws", "B. It runs anyway", "C. Compile error", "D. Nothing executes"], correctAnswer: "D. Nothing executes" },
    { id: 15, question: 'Can a stream be consumed more than once?', options: ["A. No, it throws IllegalStateException", "B. Yes", "C. Only parallel streams", "D. Only if collected first"], correctAnswer: "A. No, it throws IllegalStateException" },
    { id: 16, question: 'Which is a terminal operation?', options: ["A. filter", "B. collect", "C. map", "D. sorted"], correctAnswer: "B. collect" },
    { id: 17, question: 'What does `String::length` represent?', options: ["A. A static method reference", "B. A constructor reference", "C. An unbound instance method reference", "D. A field access"], correctAnswer: "C. An unbound instance method reference" },
    { id: 18, question: 'What does `ArrayList::new` represent?', options: ["A. A static method reference", "B. An instance method reference", "C. Invalid syntax", "D. A constructor reference"], correctAnswer: "D. A constructor reference" },
    { id: 19, question: 'What is the key difference between `orElse` and `orElseGet`?', options: ["A. orElse always evaluates its argument; orElseGet is lazy", "B. None — both evaluate their argument lazily", "C. orElseGet throws", "D. orElse is faster always"], correctAnswer: "A. orElse always evaluates its argument; orElseGet is lazy" },
    { id: 20, question: 'Where is Optional intended to be used?', options: ['A. As a field type', 'B. As a return type', 'C. As a method parameter', 'D. As a collection element'], correctAnswer: 'B. As a return type' }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a Stream pipeline that filters odd numbers, squares them, and prints the result.', language: 'java', starterCode: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> names = List.of("Asha", "Ravi", "Meera", "Dev");\n        // Filter, map and collect using the Stream API\n    }\n}' },
      { kind: 'code', prompt: 'Show how Optional replaces checking `if (user != null)`.', language: 'java', starterCode: 'import java.util.Optional;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Optional<String> name = Optional.ofNullable(null);\n        // Replace an if (x != null) check using map / orElse\n    }\n}' }
    ]
  }
};

export default mod_m13;
