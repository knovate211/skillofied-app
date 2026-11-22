import type { ModuleData } from '../GolangCourseData';

const mod_m5: ModuleData = {
  id: 'm5',
  title: 'MODULE 5: ARRAYS, SLICES & MAPS',
  overview: 'Learn collection types, slices slicing operations and mapping keys.',
  outcomes: ['Construct dynamic lists', 'Manipulate maps and delete elements'],
  lessons: [
    { id: 'm5-l1', title: 'Lesson 5.1 Arrays', objectives: ['Static collections'], theory: 'Arrays are fixed-size sequences of elements of a single type. Their length is determined at declaration and forms part of their type system. This means `[5]int` and `[10]int` are treated as different types.', syntax: `package main
import "fmt"

func main() {
    var arr [5]int
    arr[0] = 100
    fmt.Println(arr, len(arr))
}`, takeaways: ['Arrays have a fixed size defined at compile time.', 'The array size is part of its type definition.'] },
    { id: 'm5-l2', title: 'Lesson 5.2 Slices', objectives: ['Dynamic wrappers'], theory: 'Slices are dynamic wrappers built on top of arrays. They have a length (number of elements) and a capacity (number of elements in the underlying array starting from the slice\'s first element). You can initialize slices using make().', syntax: `package main
import "fmt"

func main() {
    s := make([]int, 3, 5)
    fmt.Printf("len: %d, cap: %d\\n", len(s), cap(s))
}`, takeaways: ['Slices represent dynamic, resizable views of arrays.', 'Create slices with: make([]Type, len, cap)'] },
    { id: 'm5-l3', title: 'Lesson 5.3 Slice Operations', objectives: ['Manipulate slices'], theory: 'Use append() to add elements to a slice. If the underlying array runs out of capacity, Go automatically allocates a new, larger array. Slices can be partitioned using the syntax: slice[low:high].', syntax: `package main
import "fmt"

func main() {
    var s []int
    s = append(s, 1, 2, 3)
    sub := s[1:3] // [2, 3]
    fmt.Println(sub)
}`, takeaways: ['Append handles array reallocation automatically.', 'Extract sub-slices using the low:high boundary syntax.'] },
    { id: 'm5-l4', title: 'Lesson 5.4 Maps', objectives: ['Key-value hashes'], theory: 'Maps are built-in hash tables that associate unique keys with values. They are initialized using make(). Reading a missing key returns the zero-value for the map\'s value type. You can verify if a key exists using the two-value lookup syntax: val, ok := map[key].', syntax: `package main
import "fmt"

func main() {
    ages := make(map[string]int)
    ages["Aaquib"] = 28
    val, ok := ages["Suhani"]
    fmt.Printf("Val: %d, Exists: %t\\n", val, ok)
}`, takeaways: ['Initialize maps using: make(map[KeyType]ValueType).', 'Use the two-value lookup to check if a key exists in a map.'] },
    { id: 'm5-l5', title: 'Lesson 5.5 Iterating Collections', objectives: ['Loop lists'], theory: 'Use the for range syntax to iterate over arrays, slices, and maps. For arrays and slices, range returns the index and value. For maps, it returns the key and value.', syntax: `package main
import "fmt"

func main() {
    nums := []int{10, 20, 30}
    for idx, val := range nums {
        fmt.Printf("index: %d, val: %d\\n", idx, val)
    }
}`, takeaways: ['For range loops iterate over collections.', 'Range returns index/key and value pairs.'] },
    { id: 'm5-l6', title: 'Lesson 5.6 Practical Examples', objectives: ['Real usage'], theory: 'Write search algorithms, filters, and dynamic lookups. We combine maps for O(1) lookups and slices to store sorted keys.', syntax: `package main
import "fmt"

func main() {
    data := []string{"apple", "banana", "apple"}
    counts := make(map[string]int)
    for _, item := range data {
        counts[item]++
    }
    fmt.Println(counts)
}`, takeaways: ['Combine slices and maps to build complex structures.', 'Maps offer O(1) time complexity for lookup operations.'] }
  ],
  quiz: [
    { id: 1, question: 'Which built-in function increases a slice size?', options: ['append', 'push', 'extend', 'add'], correctAnswer: 'append' },
    { id: 2, question: "What is the key difference between an array and a slice?", options: ["A slice cannot hold structs", "An array is always heap-allocated", "An array has a fixed length that is part of its type", "A slice cannot be iterated with range"], correctAnswer: "An array has a fixed length that is part of its type" },
    { id: 3, question: "Reading a map key that does not exist returns what?", options: ["A runtime panic", "nil for every value type", "A compile error", "The zero value of the value type"], correctAnswer: "The zero value of the value type" },
    { id: 4, question: "How do you test whether a key is present in a map?", options: ["v, ok := m[key]", "m.has(key)", "key in m", "m.contains(key)"], correctAnswer: "v, ok := m[key]" },
    { id: 5, question: "Is iteration order over a Go map guaranteed?", options: ["Yes, insertion order", "No; it is deliberately unspecified", "Yes, sorted by key", "Only for string keys"], correctAnswer: "No; it is deliberately unspecified" },
    { id: 6, question: "Why can two slices affect each other after `b := a[1:3]`?", options: ["Slicing copies but links them", "Go syncs slices automatically", "They share the same underlying array", "b is a pointer to a"], correctAnswer: "They share the same underlying array" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Build an inventory lookup using a map[string]int. Read one product name per line from stdin and print its stock count, or "not found" when the key is absent. Use the comma-ok form (qty, ok := inventory[name]) rather than comparing against zero — a real product can legitimately have 0 stock.',
        language: 'go',
        starterCode: 'package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n    "strings"\n)\n\nfunc main() {\n    inventory := map[string]int{\n        "keyboard": 12,\n        "monitor":  4,\n        "cable":    0,\n    }\n\n    scanner := bufio.NewScanner(os.Stdin)\n    for scanner.Scan() {\n        name := strings.TrimSpace(scanner.Text())\n        if name == "" {\n            continue\n        }\n        // TODO: use the comma-ok form so 0 stock differs from a missing key:\n        //   qty, ok := inventory[name]\n        // Print "<name>: <qty>" or "<name>: not found"\n        fmt.Println(name, inventory[name])\n    }\n}',
        stdin: true,
        examples: [
          { input: 'keyboard\ncable\nmouse', output: 'keyboard: 12\ncable: 0\nmouse: not found', explanation: 'cable exists with 0 stock, so comma-ok is required to tell it apart from a missing key.' }
        ]
      }
    ]
  }
};

export default mod_m5;
