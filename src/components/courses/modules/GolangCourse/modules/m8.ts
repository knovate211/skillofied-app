import type { ModuleData } from '../GolangCourseData';

const mod_m8: ModuleData = {
  id: 'm8',
  title: 'MODULE 8: ERROR HANDLING',
  overview: 'Learn error types, custom errors, defer stacks, panic triggers, and recovery routines.',
  outcomes: ['Write bulletproof logic', 'Recover gracefully from runtime panics'],
  lessons: [
    { id: 'm8-l1', title: 'Lesson 8.1 Errors in Go', objectives: ['Explicit errors check'], theory: 'In Go, errors are treated as normal values. Functions return errors explicitly as their last return value. You check for errors using simple conditional statements. This explicit pattern makes error paths transparent and encourages developers to handle failures close to where they occur, rather than letting exceptions bubble up silently.', syntax: `package main
import (
    "errors"
    "fmt"
)

func checkAge(age int) error {
    if age < 0 {
        return errors.New("age cannot be negative")
    }
    return nil
}

func main() {
    if err := checkAge(-1); err != nil {
        fmt.Println("Error occurred:", err)
    }
}`, takeaways: ['Go handles errors explicitly as return values.', 'Go does not use try-catch exception blocks.', 'Checking errors explicitly makes code execution paths transparent.'] },
    { id: 'm8-l2', title: 'Lesson 8.2 Custom Errors', objectives: ['Custom error types'], theory: 'You can define custom error structures by implementing the built-in error interface. The interface only requires a single Error() method returning a string. This lets you attach custom metadata, such as HTTP status codes or error categories, directly to the error object.', syntax: `type DBError struct {
    Code int
    Msg  string
}

func (e DBError) Error() string {
    return e.Msg
}`, takeaways: ['Any type that implements the Error() method satisfies the error interface.', 'Use custom structs to pass rich error metadata.', 'Allows callers to assert and extract custom error fields.'] },
    { id: 'm8-l3', title: 'Lesson 8.3 panic', objectives: ['Fatal error exceptions'], theory: 'Panics stop the program\'s normal execution flow. When a panic occurs, Go executes deferred functions and then crashes the application. Panics should be reserved for truly unrecoverable errors, such as out-of-bounds array access or missing configuration files at startup.', syntax: `package main

func main() {
    panic("unrecoverable system failure")
}`, takeaways: ['Panics stop normal execution and crash the program.', 'Only use panics for unrecoverable errors.', 'Deferred calls are guaranteed to run during a panic sequence.'] },
    { id: 'm8-l4', title: 'Lesson 8.4 defer', objectives: ['Postponed execution'], theory: 'The defer keyword postpones a function call to run immediately after the surrounding function returns. Defer statements are evaluated immediately (capturing their arguments), but the actual execution is placed on a stack and run at the end of the enclosing function.', syntax: `package main
import "fmt"

func main() {
    defer fmt.Println("Last")
    fmt.Println("First")
}`, takeaways: ['Deferred calls run immediately after the enclosing function returns.', 'Multiple deferred calls execute in Last-In-First-Out (LIFO) order.', 'Use defer to clean up resources like file descriptors or locks.'] },
    { id: 'm8-l5', title: 'Lesson 8.5 recover', objectives: ['Intercept panics'], theory: 'Recover is a built-in function that stops a panic, regains control of the execution flow, and prevents the application from crashing. It must be called inside a deferred function. If the program is not panicking, calling recover has no effect and returns nil.', syntax: `package main
import "fmt"

func safeCall() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    panic("fail")
}

func main() {
    safeCall()
    fmt.Println("Program continues running.")
}`, takeaways: ['Recover intercepts active panics and restores execution flow.', 'Recover must be called inside a deferred function to work.', 'Allows services to handle unexpected panics gracefully without crashing the process.'] },
    { id: 'm8-l6', title: 'Lesson 8.6 Error Wrapping', objectives: ['Contextual nesting errors'], theory: 'Wrap errors with context using the `%w` verb in fmt.Errorf(). This preserves the original error in the error chain, allowing callers to inspect it using errors.Is() for specific values and errors.As() for custom error types.', syntax: `package main
import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("item not found")

func main() {
    wrappedErr := fmt.Errorf("fetch error: %w", ErrNotFound)
    fmt.Println(errors.Is(wrappedErr, ErrNotFound)) // true
}`, takeaways: ['Wrap errors using the %w formatting verb.', 'Use errors.Is() to check for specific errors in an error chain.', 'Use errors.As() to extract custom error types from wrapped chains.'] }
  ],
  quiz: [
    { id: 1, question: 'In what order do deferred functions execute?', options: ["FIFO (First In First Out)", "Random", "Parallel", "LIFO (Last In First Out)"], correctAnswer: "LIFO (Last In First Out)" },
    { id: 2, question: "By convention, where does a Go function return its error?", options: ["As the first return value", "Through a global variable", "By throwing an exception", "As the last return value"], correctAnswer: "As the last return value" },
    { id: 3, question: "What does `recover()` do?", options: ["Regains control in a deferred function during a panic", "Retries the function that panicked, once", "Restarts the whole program", "Converts every error into nil"], correctAnswer: "Regains control in a deferred function during a panic" },
    { id: 4, question: "How do you wrap an error while keeping the original for errors.Is?", options: ["fmt.Errorf(\"context: %v\", err)", "fmt.Errorf(\"context: %w\", err)", "errors.New(err.Error())", "panic(err)"], correctAnswer: "fmt.Errorf(\"context: %w\", err)" },
    { id: 5, question: "When is `panic` appropriate in library code?", options: ["For every invalid user input", "Instead of returning errors", "Rarely; only for unrecoverable programmer errors", "Whenever an expected file or config is missing"], correctAnswer: "Rarely; only for unrecoverable programmer errors" },
    { id: 6, question: "When are deferred function arguments evaluated?", options: ["When the function returns", "When the deferred call executes", "At program exit", "When the defer statement runs"], correctAnswer: "When the defer statement runs" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write safeDivide(a, b int) (result int, err error) that survives a division-by-zero panic. Use a deferred function with recover() and assign to the named err return value so the caller receives an error instead of the program crashing.',
        language: 'go',
        starterCode: 'package main\n\nimport "fmt"\n\n// Recover from the panic and report it through err.\nfunc safeDivide(a, b int) (result int, err error) {\n    defer func() {\n        // recover() here and set err\n    }()\n    return a / b, nil\n}\n\nfunc main() {\n    fmt.Println(safeDivide(10, 2))\n    fmt.Println(safeDivide(10, 0))\n    fmt.Println("still running")\n}',
        examples: [
          { input: 'safeDivide(10, 2) then safeDivide(10, 0)', output: '5 <nil>\n0 recovered: runtime error: integer divide by zero\nstill running', explanation: 'The final line proves the panic was recovered rather than crashing the program.' }
        ]
      }
    ]
  }
};

export default mod_m8;
