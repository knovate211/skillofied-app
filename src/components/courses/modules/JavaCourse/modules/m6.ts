import type { ModuleData } from '../JavaCourseData';

const mod_m6: ModuleData = {
  id: 'm6',
  title: 'MODULE 6: ARRAYS',
  overview: 'Learn one-dimensional and two-dimensional arrays, common operations, sorting, and searching in Java.',
  outcomes: [
    'Declare and populate arrays.',
    'Iterate over multidimensional grid arrays.',
    'Sort arrays using Arrays.sort().'
  ],
  lessons: [
    {
      id: 'm6-l1',
      title: 'Lesson 6.1 Introduction to Arrays',
      objectives: [
        'Define static data sequences.',
        'Understand array memory allocation.',
        'Declare and instantiate arrays correctly.'
      ],
      theory: 'Arrays are fixed-size sequential collections of elements of the same data type. They allow you to store multiple values in a single variable instead of declaring separate variables for each value. Arrays in Java are objects, meaning they are stored in the heap memory and must be instantiated using the `new` keyword, which sets their permanent size.',
      syntax: 'dataType[] arrayName = new dataType[size];\n// Alternatively: dataType[] arrayName = {val1, val2, ...};',
      codeExample: 'public class ArrayIntro {\n    public static void main(String[] args) {\n        // Declaring and instantiating\n        int[] scores = new int[3];\n        // Direct initialization\n        String[] names = {"Alice", "Bob", "Charlie"};\n        System.out.println("Names array holds: " + names.length + " elements.");\n    }\n}',
      codeOutput: 'Names array holds: 3 elements.',
      takeaways: [
        'The size of an array is permanently fixed at the time of creation and cannot be changed later.',
        'Numeric arrays default to 0, boolean arrays default to false, and object arrays default to null.',
        'Use the arrayName.length property (not a method) to find the size of the array.'
      ]
    },
    {
      id: 'm6-l2',
      title: 'Lesson 6.2 One-Dimensional Arrays',
      objectives: [
        'Access and modify array elements using indices.',
        'Understand ArrayIndexOutOfBoundsException.'
      ],
      theory: 'You can read or update elements in an array using their index. Java arrays use 0-based indexing, meaning the first element is at index 0 and the last element is at index `length - 1`. If you try to access an index outside this strict boundary, Java will throw a runtime error.',
      syntax: 'arrayName[index] = value; // Assigning\ndataType var = arrayName[index]; // Reading',
      codeExample: 'public class ArrayAccess {\n    public static void main(String[] args) {\n        int[] numbers = new int[5];\n        numbers[0] = 10;\n        numbers[1] = 20;\n        numbers[4] = 50;\n        System.out.println("First element: " + numbers[0]);\n        System.out.println("Last element: " + numbers[numbers.length - 1]);\n    }\n}',
      codeOutput: 'First element: 10\nLast element: 50',
      takeaways: [
        'Accessing index -1 or index >= length throws an ArrayIndexOutOfBoundsException.',
        'Always use index `0` for the first item and `length - 1` for the final item.',
        'Elements inside arrays can be modified at any time even if the array variable is final (final only protects the reference).'
      ]
    },
    {
      id: 'm6-l3',
      title: 'Lesson 6.3 Two-Dimensional Arrays',
      objectives: [
        'Build multi-dimensional matrices.',
        'Understand arrays of arrays.'
      ],
      theory: 'A 2D array in Java is simply an array where each element is another array. They are perfect for representing grids, tables, coordinates, or game boards (like Chess or Tic-Tac-Toe). You access elements using two indices: one for the row, and one for the column.',
      syntax: 'dataType[][] matrix = new dataType[rows][cols];',
      codeExample: 'public class MatrixDemo {\n    public static void main(String[] args) {\n        int[][] grid = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        // Accessing row 1 (second array), column 2 (third element)\n        System.out.println("Element at (1,2): " + grid[1][2]);\n        System.out.println("Total Rows: " + grid.length);\n        System.out.println("Cols in Row 0: " + grid[0].length);\n    }\n}',
      codeOutput: 'Element at (1,2): 6\nTotal Rows: 2\nCols in Row 0: 3',
      takeaways: [
        'The outer array size determines the number of rows, and inner array size determines columns.',
        'Java supports "jagged arrays" where each row can actually have a different number of columns.',
        'Always use nested loops to iterate over 2D array elements.'
      ]
    },
    {
      id: 'm6-l4',
      title: 'Lesson 6.4 Array Operations',
      objectives: [
        'Iterate using standard for loops.',
        'Utilize enhanced for-each loops.'
      ],
      theory: 'The most common operation performed on arrays is iteration—visiting every single element to read or modify it. You can use standard `for` loops using indices, or the enhanced `for-each` loop which hides the index logic and provides a cleaner syntax for strictly reading data sequentially.',
      syntax: 'for (dataType element : arrayName) {\n    // element holds the value\n}',
      codeExample: 'public class IterationDemo {\n    public static void main(String[] args) {\n        String[] fruits = {"Apple", "Banana", "Cherry"};\n        \n        // Standard loop\n        for (int i = 0; i < fruits.length; i++) {\n            System.out.print(fruits[i] + " ");\n        }\n        System.out.println();\n        \n        // Enhanced for-each loop\n        for (String fruit : fruits) {\n            System.out.print(fruit + " ");\n        }\n    }\n}',
      codeOutput: 'Apple Banana Cherry \nApple Banana Cherry ',
      takeaways: [
        'The standard for loop allows backward iteration, skipping elements, and modifying the array.',
        'The enhanced for-each loop strictly moves forward by 1, and operates on a copy of the element (modifying it does not change the array).',
        'Use for-each whenever you only need to read elements sequentially.'
      ]
    },
    {
      id: 'm6-l5',
      title: 'Lesson 6.5 Array Sorting',
      objectives: [
        'Use java.util.Arrays to sort data natively.',
        'Understand default sorting behaviors.'
      ],
      theory: 'Instead of writing manual sorting algorithms like Bubble Sort, Java provides the `java.util.Arrays` utility class. The `Arrays.sort()` method sorts array elements into ascending numerical or alphabetical order automatically. It uses an extremely fast dual-pivot Quicksort algorithm for primitives.',
      syntax: 'import java.util.Arrays;\n\nArrays.sort(arrayName);',
      codeExample: 'import java.util.Arrays;\n\npublic class SortDemo {\n    public static void main(String[] args) {\n        int[] numbers = {50, 10, 40, 20, 30};\n        Arrays.sort(numbers);\n        System.out.println(Arrays.toString(numbers));\n    }\n}',
      codeOutput: '[10, 20, 30, 40, 50]',
      takeaways: [
        'Arrays.sort() modifies the original array; it does not return a new one.',
        'You can sort objects (like Strings) alphabetically natively.',
        'Arrays.toString() is a helper method to print arrays easily without writing a loop.'
      ]
    },
    {
      id: 'm6-l6',
      title: 'Lesson 6.6 Array Searching',
      objectives: [
        'Implement Linear search techniques.',
        'Utilize fast Binary Search algorithms.'
      ],
      theory: 'Searching involves finding the index of a specific element. A **Linear Search** checks every element one by one (O(N) time), which works on any array. A **Binary Search** is incredibly fast (O(log N) time) but requires the array to be sorted first. It works by repeatedly dividing the search interval in half.',
      syntax: 'int index = Arrays.binarySearch(sortedArray, targetValue);',
      codeExample: 'import java.util.Arrays;\n\npublic class SearchDemo {\n    public static void main(String[] args) {\n        int[] data = {5, 12, 19, 21, 33};\n        int target = 21;\n        \n        int foundIndex = Arrays.binarySearch(data, target);\n        System.out.println("Element 21 found at index: " + foundIndex);\n    }\n}',
      codeOutput: 'Element 21 found at index: 3',
      takeaways: [
        'If you use Arrays.binarySearch() on an unsorted array, the results are completely unpredictable.',
        'If the element is not found, binarySearch returns a negative integer.',
        'Linear search is safer for constantly changing, unsorted data.'
      ]
    }
  ],
  exercise: {
    title: 'Array statistics',
    description: 'Compute the minimum, maximum and average of an int array without using library helpers.',
    instructions: ['Traverse the array once to find both min and max.', 'Accumulate the sum as a long to avoid overflow, then divide as a double.', 'Handle the empty-array case rather than dividing by zero.'],
    starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] data = {64, 25, 12, 22, 11, 90, 34};\n        // TODO: print min, max and average\n    }\n}',
    expectedOutput: 'Min: 11, Max: 90, Avg: 36.857142857142854',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which index represents the third element of a Java array?', options: ["A. 2", "B. 3", "C. 1", "D. 4"], correctAnswer: "A. 2" },
    { id: 2, question: 'What property gives the size of an array?', options: ['A. size()', 'B. length', 'C. length()', 'D. capacity'], correctAnswer: 'B. length' },
    { id: 3, question: 'What exception is thrown when accessing index -1?', options: ['A. NullPointerException', 'B. OutOfBoundsException', 'C. ArrayIndexOutOfBoundsException', 'D. InvalidIndexException'], correctAnswer: 'C. ArrayIndexOutOfBoundsException' },
    { id: 4, question: 'Which sorting method is built into the Arrays utility class?', options: ["A. Arrays.order()", "B. Arrays.filter()", "C. Arrays.binarySearch()", "D. Arrays.sort()"], correctAnswer: "D. Arrays.sort()" },
    { id: 5, question: 'Can you dynamically resize an array after creation?', options: ["A. No", "B. Yes", "C. Using size = newSize", "D. Only in main method"], correctAnswer: "A. No" },
    { id: 6, question: 'What is the default value of an element in a newly created `int[5]`?', options: ['A. null', 'B. 0', 'C. undefined', 'D. -1'], correctAnswer: 'B. 0' },
    { id: 7, question: 'What is the default value in a new `String[3]`?', options: ["A. \"\"", "B. \"null\"", "C. null", "D. 0"], correctAnswer: "C. null" },
    { id: 8, question: 'Which exception is thrown by accessing `arr[arr.length]`?', options: ["A. NullPointerException", "B. IllegalArgumentException", "C. ArrayStoreException", "D. ArrayIndexOutOfBoundsException"], correctAnswer: "D. ArrayIndexOutOfBoundsException" },
    { id: 9, question: 'How do you get the size of an array named `data`?', options: ["A. data.length", "B. data.size()", "C. data.length()", "D. length(data)"], correctAnswer: "A. data.length" },
    { id: 10, question: 'Can the length of a Java array be changed after creation?', options: ['A. Yes, with resize()', 'B. No, it is fixed', 'C. Only for int arrays', 'D. Only if declared final'], correctAnswer: 'B. No, it is fixed' },
    { id: 11, question: 'Which method sorts an int array in ascending order?', options: ["A. Arrays.order()", "B. Collections.sort()", "C. Arrays.sort()", "D. array.sort()"], correctAnswer: "C. Arrays.sort()" },
    { id: 12, question: 'What does `Arrays.toString(arr)` do?', options: ["A. Converts elements to Strings", "B. Sorts then prints", "C. Returns the memory address", "D. Returns a readable representation of the array"], correctAnswer: "D. Returns a readable representation of the array" },
    { id: 13, question: 'What is the time complexity of accessing an array element by index?', options: ['A. O(1)', 'B. O(n)', 'C. O(log n)', 'D. O(n^2)'], correctAnswer: 'A. O(1)' },
    { id: 14, question: 'How is a 2D array declared in Java?', options: ["A. int grid[3][4];", "B. int[][] grid = new int[3][4];", "C. array2d int grid;", "D. int grid = new int[3,4];"], correctAnswer: "B. int[][] grid = new int[3][4];" },
    { id: 15, question: 'What is a jagged array?', options: ["A. An unsorted array", "B. An array with null elements", "C. A 2D array whose rows have different lengths", "D. An array of objects"], correctAnswer: "C. A 2D array whose rows have different lengths" },
    { id: 16, question: 'Which precondition does `Arrays.binarySearch()` require?', options: ["A. The array must be non-empty", "B. The array must be 2D", "C. No precondition", "D. The array must be sorted"], correctAnswer: "D. The array must be sorted" },
    { id: 17, question: 'What does `System.arraycopy()` do?', options: ["A. Copies a range of elements between arrays", "B. Creates a deep clone", "C. Sorts the source range, then copies it", "D. Prints the copied range to standard output"], correctAnswer: 'A. Copies a range of elements between arrays' },
    { id: 18, question: 'Is `arr.clone()` on an array of objects a deep copy?', options: ['A. Yes', 'B. No, it copies references (shallow)', 'C. Only for Strings', 'D. Only for primitives'], correctAnswer: 'B. No, it copies references (shallow)' },
    { id: 19, question: 'What is the cost of inserting into the middle of an array?', options: ["A. O(1), since arrays support index access", "B. O(log n)", "C. O(n) because elements must shift", "D. Impossible without converting to an ArrayList"], correctAnswer: 'C. O(n) because elements must shift' },
    { id: 20, question: 'Which class should you use when the number of elements is not known upfront?', options: ["A. int[]", "B. String[]", "C. Arrays", "D. ArrayList"], correctAnswer: "D. ArrayList" }
  ],
  assignment: {
    prompts: [
      { 
        kind: 'code', 
        prompt: 'Write a program to find the second largest element in an integer array.', 
        language: 'java', 
        starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[] nums = {12, 35, 1, 10, 34, 1};\n        // Find the second largest WITHOUT sorting\n    }\n}',
        examples: [
          { input: 'nums = {12, 35, 1, 10, 34, 1}', output: '34' }
        ]
      },
      { 
        kind: 'code', 
        prompt: 'Write a code snippet to print all elements of a 2D matrix.', 
        language: 'java', 
        starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n        // Print every element, one row per line\n    }\n}',
        examples: [
          { input: 'grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}', output: '1 2 3\n4 5 6\n7 8 9' }
        ]
      }
    ]
  }
};

export default mod_m6;
