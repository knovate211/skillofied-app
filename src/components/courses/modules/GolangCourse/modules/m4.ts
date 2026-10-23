import type { ModuleData } from '../GolangCourseData';

const mod_m4: ModuleData = {
  id: 'm4',
  title: 'MODULE 4: FUNCTIONS',
  overview: 'Learn parameters, multiple return values, named returns, closures and anonymous wrappers.',
  outcomes: ['Construct reusable routines', 'Pass and execute functions as parameters'],
  lessons: [
    { id: 'm4-l1', title: 'Lesson 4.1 Functions', objectives: ['Define functions'], theory: 'Functions are declared using the func keyword. They can accept parameter parameters and return parameter lists. Multiple parameters of the same type can share a single type declaration.', syntax: `package main
import "fmt"

func add(x int, y int) int {
    return x + y
}

func main() {
    fmt.Println(add(42, 13))
}`, takeaways: ['Functions are defined with the func keyword.', 'Param types sit after parameter names.'] },
    { id: 'm4-l2', title: 'Lesson 4.2 Parameters', objectives: ['Function inputs'], theory: 'Go passes arguments by value by default. This means the function gets a copy of the argument. To mutate the original variable, you must pass a pointer address using the & operator.', syntax: `package main
import "fmt"

func updateVal(val *int) {
    *val = 99
}

func main() {
    n := 10
    updateVal(&n)
    fmt.Println(n) // 99
}`, takeaways: ['Parameters are passed by value by default.', 'Pass pointers to modify the caller\'s variables.'] },
    { id: 'm4-l3', title: 'Lesson 4.3 Multiple Return Values', objectives: ['Return tuples'], theory: 'Go functions can return multiple values. This is widely used in Go to return a result alongside an error code.', syntax: `package main
import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    res, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", res)
    }
}`, takeaways: ['Functions support tuple returns.', 'Unused values must be ignored with the blank identifier (_).'] },
    { id: 'm4-l4', title: 'Lesson 4.4 Named Return Values', objectives: ['Define return variables'], theory: 'Go allows you to name your return variables in the function signature. They are treated as variables defined at the top of the function. Running a naked return statement will automatically return these variables.', syntax: `package main
import "fmt"

func getSplit(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}

func main() {
    fmt.Println(getSplit(17))
}`, takeaways: ['Named returns initialize return variables automatically.', 'Naked returns can make long functions harder to read.'] },
    { id: 'm4-l5', title: 'Lesson 4.5 Variadic Functions', objectives: ['Varying input size'], theory: 'Variadic functions accept any number of trailing arguments. Declare them using the ... ellipsis prefix before the parameter type. Inside the function, the variadic parameter behaves like a slice.', syntax: `package main
import "fmt"

func sumAll(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    fmt.Println(sumAll(1, 2, 3, 4))
}`, takeaways: ['Variadic parameters are defined with the ... prefix.', 'The variadic parameter behaves as a slice inside the function.'] },
    { id: 'm4-l6', title: 'Lesson 4.6 Anonymous Functions', objectives: ['Inline routines'], theory: 'Anonymous functions are functions declared without a name. They can be defined inline and executed immediately using trailing parentheses, or assigned to variables to be executed later.', syntax: `package main
import "fmt"

func main() {
    func(msg string) {
        fmt.Println(msg)
    }("Execute anonymous func")
}`, takeaways: ['Anonymous functions are declared without identifiers.', 'Can be invoked inline or stored inside variables.'] },
    { id: 'm4-l7', title: 'Lesson 4.7 Closures', objectives: ['Stateful functions'], theory: 'Closures are anonymous functions that reference variables from outside their immediate scope. The function "closes over" and binds these variables, preserving their state between calls.', syntax: `package main
import "fmt"

func seqGenerator() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {
    next := seqGenerator()
    fmt.Println(next()) // 1
    fmt.Println(next()) // 2
}`, takeaways: ['Closures capture scope variables.', 'State is preserved between function calls.'] },
    { id: 'm4-l8', title: 'Lesson 4.8 Recursion', objectives: ['Self invoking functions'], theory: 'Recursion is when a function calls itself to break down a problem. A recursive function must define a base case to stop execution and prevent stack overflow errors.', syntax: `package main
import "fmt"

func factorial(n int) int {
    if n == 0 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println(factorial(5))
}`, takeaways: ['Recursive functions call themselves.', 'Always define a base case to prevent stack overflows.'] }
  ],
  quiz: [
    { id: 1, question: 'How do you ignore a returned value from a function?', options: ["Using null", "Using nil", "By leaving it empty", "Using _ blank identifier"], correctAnswer: "Using _ blank identifier" },
    { id: 2, question: "What does a variadic parameter `nums ...int` arrive as inside the function?", options: ["An [N]int array", "A map of ints", "A channel of ints", "A []int slice"], correctAnswer: "A []int slice" },
    { id: 3, question: "How do you pass an existing slice `s` to a variadic function?", options: ["f(s...)", "f(*s)", "f(...s)", "f(&s)"], correctAnswer: "f(s...)" },
    { id: 4, question: "What is a closure in Go?", options: ["A function that cannot return values", "A function value that captures surrounding variables", "A method bound to a struct pointer", "A function that runs only once"], correctAnswer: "A function value that captures surrounding variables" },
    { id: 5, question: "By default, how are arguments passed to Go functions?", options: ["By reference", "By pointer automatically", "By value; a copy is passed", "By name"], correctAnswer: "By value; a copy is passed" },
    { id: 6, question: "Why is a base case essential in a recursive function?", options: ["Go requires it to compile", "It makes the function run concurrently", "It caches earlier results", "Without one the call stack grows until it overflows"], correctAnswer: "Without one the call stack grows until it overflows" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write sumAndProduct(nums []int) (int, int) returning both the sum and the product of the slice, using Go multiple return values. Return 0, 1 for an empty slice so the product identity stays correct.',
        language: 'go',
        starterCode: 'package main\n\nimport "fmt"\n\n// Return the sum and the product of nums.\nfunc sumAndProduct(nums []int) (int, int) {\n    // TODO\n    return 0, 1\n}\n\nfunc main() {\n    sum, product := sumAndProduct([]int{1, 2, 3, 4})\n    fmt.Println(sum, product)\n}',
        examples: [
          { input: '[]int{1, 2, 3, 4}', output: '10 24' },
          { input: '[]int{}', output: '0 1', explanation: 'An empty slice sums to 0 and has product identity 1.' }
        ]
      }
    ]
  }
};

export default mod_m4;
