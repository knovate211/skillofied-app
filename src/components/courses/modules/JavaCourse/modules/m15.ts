import type { ModuleData } from '../JavaCourseData';

const mod_m15: ModuleData = {
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
    { id: 1, question: 'What is the search time complexity of Binary Search?', options: ["A. O(N)", "B. O(N^2)", "C. O(1)", "D. O(log N)"], correctAnswer: "D. O(log N)" },
    { id: 2, question: 'Which data structure follows LIFO?', options: ["A. Stack", "B. Queue", "C. LinkedList", "D. Matrix"], correctAnswer: "A. Stack" },
    { id: 3, question: 'What traversal algorithm uses queues?', options: ['A. Depth First Search (DFS)', 'B. Breadth First Search (BFS)', 'C. In-order traversal', 'D. Binary search'], correctAnswer: 'B. Breadth First Search (BFS)' },
    { id: 4, question: 'What is the worst-case sorting complexity of Bubble Sort?', options: ['A. O(N log N)', 'B. O(N)', 'C. O(N^2)', 'D. O(log N)'], correctAnswer: 'C. O(N^2)' },
    { id: 5, question: 'What is the parent class interface for Queue implementations?', options: ["A. List", "B. Deque", "C. Set", "D. Queue"], correctAnswer: "D. Queue" },
    { id: 6, question: 'What is the time complexity of binary search?', options: ["A. O(log n)", "B. O(1)", "C. O(n)", "D. O(n log n)"], correctAnswer: "A. O(log n)" },
    { id: 7, question: 'What precondition does binary search require?', options: ["A. The data must be unique", "B. The data must be sorted", "C. The data must be numeric", "D. None"], correctAnswer: "B. The data must be sorted" },
    { id: 8, question: 'Why write `low + (high - low) / 2` instead of `(low + high) / 2`?', options: ["A. It is faster", "B. It is more readable", "C. To avoid integer overflow", "D. No reason"], correctAnswer: "C. To avoid integer overflow" },
    { id: 9, question: 'Which traversal of a BST produces sorted output?', options: ["A. Pre-order", "B. Post-order", "C. Level-order", "D. In-order"], correctAnswer: "D. In-order" },
    { id: 10, question: 'What happens to a plain BST when you insert already-sorted data?', options: ["A. It degenerates into a linked list with O(n) operations", "B. Nothing changes", "C. It rebalances", "D. It throws once the tree becomes unbalanced"], correctAnswer: "A. It degenerates into a linked list with O(n) operations" },
    { id: 11, question: 'Which Java classes are implemented as red-black trees?', options: ['A. HashMap and HashSet', 'B. TreeMap and TreeSet', 'C. ArrayList and LinkedList', 'D. ArrayDeque'], correctAnswer: 'B. TreeMap and TreeSet' },
    { id: 12, question: 'Which data structure does BFS use?', options: ["A. Stack", "B. Heap", "C. Queue", "D. Tree"], correctAnswer: "C. Queue" },
    { id: 13, question: 'Which data structure does DFS use?', options: ["A. Queue", "B. HashMap", "C. Array", "D. Stack (or recursion)"], correctAnswer: "D. Stack (or recursion)" },
    { id: 14, question: 'Which traversal guarantees the shortest path in an unweighted graph?', options: ["A. BFS", "B. DFS", "C. Either", "D. Neither"], correctAnswer: "A. BFS" },
    { id: 15, question: 'Why is a visited set mandatory in graph traversal?', options: ["A. To speed up traversal by skipping leaf nodes", "B. Cycles would cause an infinite loop", "C. To sort nodes", "D. It is optional"], correctAnswer: 'B. Cycles would cause an infinite loop' },
    { id: 16, question: 'Which sorting algorithm is stable and guaranteed O(n log n)?', options: ["A. Quicksort", "B. Selection sort", "C. Merge sort", "D. Heap sort"], correctAnswer: "C. Merge sort" },
    { id: 17, question: 'What is the worst-case complexity of quicksort?', options: ["A. O(n log n)", "B. O(n)", "C. O(log n)", "D. O(n^2)"], correctAnswer: "D. O(n^2)" },
    { id: 18, question: 'What does sorting "stability" mean?', options: ["A. Equal elements keep their relative order", "B. It never crashes", "C. It uses constant memory", "D. It is always fast"], correctAnswer: "A. Equal elements keep their relative order" },
    { id: 19, question: 'Which algorithm does `Arrays.sort()` use for object arrays?', options: ['A. Quicksort', 'B. TimSort', 'C. Bubble sort', 'D. Heap sort'], correctAnswer: 'B. TimSort' },
    { id: 20, question: 'Which structure should you use for LIFO access?', options: ["A. Queue", "B. TreeMap", "C. ArrayDeque used as a stack", "D. LinkedHashSet"], correctAnswer: "C. ArrayDeque used as a stack" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a function that reverses a singly linked list in place.', language: 'java', starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        // Implement the algorithm and print the result\n    }\n}' },
      { kind: 'code', prompt: 'Show how to implement a queue using two stacks.', language: 'java', starterCode: 'import java.util.*;\n\nclass QueueFromStacks {\n    private final Deque<Integer> in = new ArrayDeque<>();\n    private final Deque<Integer> out = new ArrayDeque<>();\n\n    void enqueue(int x) {\n        // push onto in\n    }\n\n    int dequeue() {\n        // move in -> out only when out is empty\n        return -1;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Enqueue 1,2,3 then dequeue and print\n    }\n}' }
    ]
  }
};

export default mod_m15;
