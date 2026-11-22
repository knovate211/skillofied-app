import type { ModuleData } from '../JavaCourseData';

const mod_m10: ModuleData = {
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
    { id: 1, question: 'Which collection does not allow duplicate values?', options: ["A. ArrayList", "B. LinkedList", "C. Vector", "D. HashSet"], correctAnswer: "D. HashSet" },
    { id: 2, question: 'Which class maps key-value pairs with O(1) lookup?', options: ["A. HashMap", "B. TreeSet", "C. ArrayList", "D. TreeMap"], correctAnswer: "A. HashMap" },
    { id: 3, question: 'Which Set is sorted automatically?', options: ["A. HashSet", "B. TreeSet", "C. LinkedHashSet", "D. VectorSet"], correctAnswer: "B. TreeSet" },
    { id: 4, question: 'How do you check if a map contains a key?', options: ["A. map.hasKey()", "B. map.find()", "C. map.containsKey()", "D. map.get()"], correctAnswer: "C. map.containsKey()" },
    { id: 5, question: 'What exception is thrown when modifying collections during simple loop iteration?', options: ["A. NullPointerException", "B. IndexOutOfBoundsException", "C. CollectionException", "D. ConcurrentModificationException"], correctAnswer: "D. ConcurrentModificationException" },
    { id: 6, question: 'Which interface does NOT allow duplicate elements?', options: ["A. Set", "B. List", "C. Queue", "D. Collection"], correctAnswer: "A. Set" },
    { id: 7, question: 'Which implementation gives O(1) average lookup by key?', options: ['A. TreeMap', 'B. HashMap', 'C. LinkedList', 'D. ArrayList'], correctAnswer: 'B. HashMap' },
    { id: 8, question: 'Which Map implementation keeps keys sorted?', options: ['A. HashMap', 'B. LinkedHashMap', 'C. TreeMap', 'D. Hashtable'], correctAnswer: 'C. TreeMap' },
    { id: 9, question: 'Which Map preserves insertion order?', options: ["A. HashMap", "B. TreeMap", "C. Hashtable", "D. LinkedHashMap"], correctAnswer: "D. LinkedHashMap" },
    { id: 10, question: 'Does Map extend Collection?', options: ["A. No, it is a separate hierarchy", "B. Yes", "C. Only TreeMap does", "D. Only in Java 8+"], correctAnswer: "A. No, it is a separate hierarchy" },
    { id: 11, question: 'What is the time complexity of ArrayList.get(i)?', options: ["A. O(n)", "B. O(1)", "C. O(log n)", "D. O(n log n)"], correctAnswer: "B. O(1)" },
    { id: 12, question: 'What is the complexity of LinkedList.get(i)?', options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(1) amortised"], correctAnswer: "C. O(n)" },
    { id: 13, question: 'Which two methods must you override together for correct HashMap behaviour?', options: ["A. toString() and equals()", "B. compareTo() and equals()", "C. clone() and hashCode()", "D. equals() and hashCode()"], correctAnswer: "D. equals() and hashCode()" },
    { id: 14, question: 'What happens if you put a key with an equal hashCode but unequal equals()?', options: ["A. Both are stored in the same bucket", "B. It replaces the existing entry", "C. Compile error", "D. The map is cleared"], correctAnswer: "A. Both are stored in the same bucket" },
    { id: 15, question: 'What exception is thrown by modifying a collection while iterating it with a for-each?', options: ["A. IllegalStateException", "B. ConcurrentModificationException", "C. UnsupportedOperationException", "D. NoSuchElementException"], correctAnswer: "B. ConcurrentModificationException" },
    { id: 16, question: 'Which method safely removes during iteration?', options: ["A. list.remove()", "B. list.clear()", "C. iterator.remove()", "D. collection.removeAll()"], correctAnswer: "C. iterator.remove()" },
    { id: 17, question: 'Which collection is a thread-safe Map for concurrent use?', options: ["A. HashMap", "B. TreeMap", "C. LinkedHashMap", "D. ConcurrentHashMap"], correctAnswer: "D. ConcurrentHashMap" },
    { id: 18, question: 'What does `Arrays.asList()` return?', options: ["A. A fixed-size list backed by the array", "B. A fully mutable ArrayList", "C. An immutable copy", "D. A Set"], correctAnswer: "A. A fixed-size list backed by the array" },
    { id: 19, question: 'Which interface must a class implement to define natural ordering?', options: ['A. Comparator', 'B. Comparable', 'C. Iterable', 'D. Cloneable'], correctAnswer: 'B. Comparable' },
    { id: 20, question: 'What does a Set implementation use to detect duplicates?', options: ["A. toString()", "B. The index", "C. equals() and hashCode()", "D. compareTo() only"], correctAnswer: "C. equals() and hashCode()" }
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
          "A. When you need constant-time O(1) performance for basic operations.",
          "B. When you need to allow null keys and null values.",
          "C. When memory footprint is your primary concern.",
          "D. When you need the keys to be maintained in a sorted order.",
        ],
        correctAnswer: "D. When you need the keys to be maintained in a sorted order."
      }
    ]
  }
};

export default mod_m10;
