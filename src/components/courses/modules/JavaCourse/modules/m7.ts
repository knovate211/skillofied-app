import type { ModuleData } from '../JavaCourseData';

const mod_m7: ModuleData = {
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
    { id: 1, question: 'Which memory structure caches unique string literals?', options: ["A. String Constant Pool (SCP)", "B. Heap pool", "C. Stack frame", "D. Global registry"], correctAnswer: "A. String Constant Pool (SCP)" },
    { id: 2, question: 'Which comparison matches actual content values of strings?', options: ['A. str1 == str2', 'B. str1.equals(str2)', 'C. str1.compare(str2)', 'D. str1 === str2'], correctAnswer: 'B. str1.equals(str2)' },
    { id: 3, question: 'Which string builder tool is mutable but not thread-safe?', options: ['A. String', 'B. StringBuffer', 'C. StringBuilder', 'D. ArrayBuilder'], correctAnswer: 'C. StringBuilder' },
    { id: 4, question: 'What is the result of "abc".substring(1, 3)?', options: ["A. \"ab\"", "B. \"b\"", "C. \"c\"", "D. \"bc\""], correctAnswer: "D. \"bc\"" },
    { id: 5, question: 'Why are String objects immutable in Java?', options: ['A. For security, caching, and thread safety', 'B. Because compiler cannot modify them', 'C. To save storage spaces', 'D. By mistake'], correctAnswer: 'A. For security, caching, and thread safety' },
    { id: 6, question: 'Why are Strings immutable in Java?', options: ["A. To save disk space", "B. For caching, thread safety and security", "C. Because they are primitives", "D. To allow modification"], correctAnswer: "B. For caching, thread safety and security" },
    { id: 7, question: 'What does `==` compare for two String variables?', options: ["A. Their contents", "B. Their lengths", "C. Their reference addresses", "D. Their hash codes"], correctAnswer: "C. Their reference addresses" },
    { id: 8, question: 'Which method correctly compares String contents?', options: ["A. ==", "B. compare()", "C. matches()", "D. equals()"], correctAnswer: "D. equals()" },
    { id: 9, question: 'Which class is mutable AND synchronised?', options: ["A. StringBuffer", "B. String", "C. StringBuilder", "D. CharSequence"], correctAnswer: "A. StringBuffer" },
    { id: 10, question: 'Which is faster in single-threaded code?', options: ['A. StringBuffer', 'B. StringBuilder', 'C. They are identical', 'D. String'], correctAnswer: 'B. StringBuilder' },
    { id: 11, question: 'What does `"Java".charAt(0)` return?', options: ["A. \"J\"", "B. 0", "C. 'J'", "D. \"Java\""], correctAnswer: "C. 'J'" },
    { id: 12, question: 'What does `"  hi  ".trim()` produce?', options: ["A. \"  hi\"", "B. \"hi  \"", "C. \"  hi  \"", "D. \"hi\""], correctAnswer: "D. \"hi\"" },
    { id: 13, question: 'What does `String.valueOf(42)` return?', options: ["A. \"42\"", "B. 42", "C. '4'", "D. null"], correctAnswer: "A. \"42\"" },
    { id: 14, question: 'What does `"a,b,c".split(",")` return?', options: ['A. A String', 'B. A String array of length 3', 'C. A List', 'D. A char array'], correctAnswer: 'B. A String array of length 3' },
    { id: 15, question: 'Where are String literals stored?', options: ["A. The stack", "B. Metaspace", "C. The String constant pool", "D. A register"], correctAnswer: "C. The String constant pool" },
    { id: 16, question: 'What does `new String("hi")` guarantee?', options: ["A. Reuse of the pooled literal", "B. A compile error", "C. A null value", "D. A distinct object on the heap"], correctAnswer: "D. A distinct object on the heap" },
    { id: 17, question: 'Which method ignores case when comparing?', options: ["A. equalsIgnoreCase()", "B. equals()", "C. compareTo()", "D. contentEquals()"], correctAnswer: "A. equalsIgnoreCase()" },
    { id: 18, question: 'What does `"hello".substring(1, 3)` return?', options: ["A. \"ell\"", "B. \"el\"", "C. \"he\"", "D. \"llo\""], correctAnswer: "B. \"el\"" },
    { id: 19, question: 'Why is String concatenation in a large loop discouraged?', options: ["A. The compiler rejects + on Strings inside loops", "B. It reverses the string", "C. Each concatenation creates a new String object", "D. It uses too little memory"], correctAnswer: "C. Each concatenation creates a new String object" },
    { id: 20, question: 'What does `"Java".indexOf("v")` return?', options: ["A. 1", "B. 3", "C. -1", "D. 2"], correctAnswer: "D. 2" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a program that counts the frequencies of each word in a text string.', language: 'java', starterCode: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        String text = "the quick brown fox jumps over the lazy dog the fox";\n        // Count each word and print the results\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'Why does String comparison using the "==" operator return false when comparing two strings created with new String("test")?',
        options: [
          "A. The \"==\" operator compares memory references (addresses), not the actual contents.",
          "B. The \"==\" operator compares the content of the string objects, which is different.",
          "C. The compiler automatically optimizes new String() objects to have random values.",
          "D. The \"==\" operator is not allowed for String objects and will cause a compilation error.",
        ],
        correctAnswer: "A. The \"==\" operator compares memory references (addresses), not the actual contents."
      }
    ]
  }
};

export default mod_m7;
