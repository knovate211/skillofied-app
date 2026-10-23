import type { ModuleData } from '../GolangCourseData';

const mod_m3: ModuleData = {
  id: 'm3',
  title: 'MODULE 3: CONTROL FLOW',
  overview: 'Learn conditions, loop constructs, switch assertions, and labels.',
  outcomes: ['Write conditional logic blocks', 'Iterate tasks using for loops'],
  lessons: [
    {
      id: 'm3-l1',
      title: 'Lesson 3.1 if Statement',
      objectives: ['Write idiomatic conditionals', 'Use the if-with-statement form'],
      theory: `Go's if needs no parentheses around the condition, and the braces are mandatory even for a single statement. That combination removes a whole class of C bug where an unbraced if silently governs only the first line.
The condition must be a bool. Go has no truthiness: you cannot write \`if count\` or \`if name\` and expect non-zero or non-empty to mean true. Write the comparison explicitly — \`if count > 0\` or \`if name != ""\`. This is more typing and it removes any ambiguity about what the code means.
The form that makes Go code look like Go is the if with an initialiser: \`if v, err := doThing(); err != nil\`. The statement before the semicolon runs first, and any variables it declares are scoped to the if and its else branches. Keeping err confined to the block that handles it stops error variables accumulating in the enclosing function scope, and it makes shadowing bugs less likely.
The dominant idiom built on this is the early return. Rather than nesting the happy path inside a successful condition, Go code checks each failure and returns immediately, leaving the main logic unindented at the bottom of the function. Deeply nested if-else pyramids are considered unidiomatic; if you find yourself three levels deep, invert the conditions and return early.`,
      syntax: `// No parentheses, mandatory braces, bool-only condition.
if score >= 90 {
    grade = "A"
}

// Initialiser form: err exists only inside this if/else.
if v, err := strconv.Atoi(input); err != nil {
    return fmt.Errorf("bad input %q: %w", input, err)
} else {
    total += v
}`,
      codeExample: `package main

import (
    "errors"
    "fmt"
)

type User struct {
    Name   string
    Active bool
}

func find(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("id must be positive")
    }
    if id != 1 {
        return nil, errors.New("not found")
    }
    return &User{Name: "Aditi", Active: true}, nil
}

// Early returns keep the happy path flat and unindented.
func greet(id int) string {
    u, err := find(id)
    if err != nil {
        return "error: " + err.Error()
    }
    if !u.Active {
        return u.Name + " is inactive"
    }
    return "Hello, " + u.Name
}

func main() {
    fmt.Println(greet(1))
    fmt.Println(greet(2))
    fmt.Println(greet(-5))
}`,
      codeOutput: `Hello, Aditi
error: not found
error: id must be positive`,
      mistakes: [
          'Writing `if count` expecting truthiness. Go requires an explicit boolean expression.',
          'Adding parentheses around the condition — legal but non-idiomatic, and gofmt leaves them.',
          'Nesting the happy path inside if-else pyramids instead of returning early on failure.',
          'Declaring err in the outer scope when the initialiser form would confine it to the branch.',
      ],
      takeaways: [
          'No parentheses, mandatory braces, and no truthiness — conditions must be bool.',
          'The initialiser form scopes variables to the if/else that handles them.',
          'Prefer early returns; deep if-else nesting is unidiomatic Go.',
      ],
    },
    {
      id: 'm3-l2',
      title: 'Lesson 3.2 if-else Statement',
      objectives: ['Chain conditions readably', 'Know when to switch instead'],
      theory: `Chaining with else if works exactly as expected, with one formatting rule the compiler enforces: \`} else {\` must sit on the same line as the closing brace of the previous block. Putting else on its own line is a syntax error, thanks to automatic semicolon insertion — the parser inserts a semicolon after the closing brace and the else is then orphaned. gofmt fixes this automatically, which is one more reason to enable format-on-save.
Branches are evaluated top to bottom and the first match wins, so ordering carries meaning. In a grading ladder, checking \`>= 40\` before \`>= 90\` means every passing score reports the lowest grade — a bug that reads perfectly well and produces entirely wrong output. Order from most specific to least.
Go has no ternary operator, deliberately. Where another language offers \`x = cond ? a : b\`, Go wants a short if-else or, when the pattern repeats, a small helper function. The rationale is that nested ternaries become unreadable and the authors preferred to remove the option entirely.
Once a chain reaches three or four branches comparing the same value, a switch is clearer and Go developers will expect one. Keep if-else for genuinely different conditions, and reach for switch when you are testing one value against several possibilities.`,
      codeExample: `package main

import "fmt"

// Order matters: most specific condition first.
func grade(score int) string {
    if score >= 90 {
        return "A"
    } else if score >= 80 {
        return "B"
    } else if score >= 70 {
        return "C"
    } else if score >= 40 {
        return "D"
    }
    return "F"
}

// No ternary in Go — a tiny helper is the usual replacement.
func pick(cond bool, a, b string) string {
    if cond {
        return a
    }
    return b
}

func main() {
    for _, s := range []int{95, 83, 72, 45, 12} {
        fmt.Printf("%3d -> %s\n", s, grade(s))
    }
    fmt.Println(pick(grade(95) == "A", "top marks", "keep going"))
}`,
      codeOutput: ` 95 -> A
 83 -> B
 72 -> C
 45 -> D
 12 -> F
top marks`,
      mistakes: [
          'Putting `else` on its own line — a syntax error caused by automatic semicolon insertion.',
          'Ordering a range ladder from least to most specific, so every value matches the first branch.',
          'Searching for a ternary operator; write a short if-else or a helper function.',
          'Chaining five else-if branches on one value where a switch would read far better.',
      ],
      takeaways: [
          '`} else {` must stay on the closing-brace line.',
          'First matching branch wins, so order from most specific to least.',
          'No ternary exists; past three branches on one value, prefer switch.',
      ],
    },
    {
      id: 'm3-l3',
      title: 'Lesson 3.3 Switch Statement',
      objectives: ['Use expression and tagless switches', 'Apply type switches on interfaces'],
      theory: `Go's switch fixes the two things everyone dislikes about C's. There is no implicit fall-through — each case breaks automatically, so the forgotten-break bug simply cannot happen. And cases are not limited to constants; they can be arbitrary expressions.
A case can list several values separated by commas, which replaces stacked empty cases. If you genuinely want to continue into the next case, the explicit \`fallthrough\` keyword does it, but it is rare and worth a comment when used.
The tagless switch — \`switch { case x > 10: ... }\` — is Go's replacement for a long if-else ladder. With no value after the keyword, each case is a boolean expression evaluated in order. This reads better than chained else-ifs and is the idiomatic choice for range checks.
Like if, switch accepts an initialiser: \`switch v := f(); v {\` scopes v to the switch.
The type switch is the feature you will use constantly once you work with interfaces. \`switch v := x.(type)\` branches on the dynamic type of an interface value, and inside each case v already has that concrete type, so no separate assertion is needed. It is how you handle a value that could be one of several types — decoding arbitrary JSON, walking a syntax tree, or classifying errors.
Always include a default case in a type switch. Without one, an unexpected type falls through silently and produces a zero value rather than an error you can see.`,
      codeExample: `package main

import "fmt"

func classify(x interface{}) string {
    // Type switch: v has the concrete type inside each case.
    switch v := x.(type) {
    case int:
        return fmt.Sprintf("int doubled: %d", v*2)
    case string:
        return fmt.Sprintf("string of %d chars", len(v))
    case bool, nil:
        return fmt.Sprintf("bool or nil: %v", v)
    default:
        return fmt.Sprintf("unhandled type %T", v)
    }
}

func size(n int) string {
    // Tagless switch replaces an if-else ladder.
    switch {
    case n < 0:
        return "negative"
    case n == 0:
        return "zero"
    case n < 100:
        return "small"
    default:
        return "large"
    }
}

func main() {
    fmt.Println(classify(21))
    fmt.Println(classify("hello"))
    fmt.Println(classify(3.14))
    fmt.Println(size(-1), size(0), size(42), size(5000))
}`,
      codeOutput: `int doubled: 42
string of 5 chars
unhandled type float64
negative zero small large`,
      mistakes: [
          'Writing `break` at the end of every case. Go breaks automatically; it is redundant.',
          'Expecting C-style fall-through. You must write `fallthrough` explicitly.',
          'Omitting default in a type switch, so unexpected types pass silently.',
          'Using a long if-else chain where a tagless switch would be clearer.',
      ],
      takeaways: [
          'Cases break automatically; `fallthrough` is explicit and rare.',
          'A tagless switch is the idiomatic replacement for an if-else ladder.',
          'Type switches branch on an interface\'s dynamic type — always add a default.',
      ],
    },
    {
      id: 'm3-l4',
      title: 'Lesson 3.4 for Loop',
      objectives: ['Use all four for forms', 'Range over slices, maps, strings and channels'],
      theory: `Go has exactly one loop keyword. There is no while and no do-while, because for covers every case with four forms.
The classic three-part form, \`for i := 0; i < n; i++\`, is the C loop. Dropping the init and post clauses gives \`for condition {}\`, which is Go's while. Dropping everything gives \`for {}\`, an infinite loop you exit with break or return — the standard shape for servers and worker goroutines. The fourth form is range.
Range is what you will write most. Over a slice it yields index and value; over a map, key and value; over a string, byte offset and rune; over a channel, each value until the channel is closed. If you only need the first variable, omit the second; if you only need the second, use \`_\` for the first.
Two behaviours cause real bugs. Map iteration order is deliberately randomised — Go shuffles it on every run so you cannot accidentally depend on an order that is not guaranteed. If you need deterministic output, collect the keys, sort them, and iterate the sorted slice.
The second is that range copies each element into the loop variable. Mutating that copy does not change the slice, so \`for _, u := range users { u.Active = false }\` does nothing. Index into the slice instead. Note that Go 1.22 changed loop variables to be per-iteration, which fixed the old goroutine-capture trap — but the copy semantics of range remain.`,
      codeExample: `package main

import (
    "fmt"
    "sort"
)

type User struct {
    Name   string
    Active bool
}

func main() {
    // Four forms of for.
    for i := 0; i < 3; i++ { fmt.Print(i, " ") }
    fmt.Println()

    n := 0
    for n < 3 { n++ }          // while
    fmt.Println("n =", n)

    // range copies: mutating u does NOT change the slice.
    users := []User{{"Aditi", true}, {"Rohan", true}}
    for _, u := range users { u.Active = false }
    fmt.Println("after range copy:", users)

    for i := range users { users[i].Active = false } // index to mutate
    fmt.Println("after index:     ", users)

    // Map order is randomised — sort keys for deterministic output.
    m := map[string]int{"b": 2, "a": 1, "c": 3}
    keys := make([]string, 0, len(m))
    for k := range m { keys = append(keys, k) }
    sort.Strings(keys)
    for _, k := range keys { fmt.Print(k, "=", m[k], " ") }
    fmt.Println()
}`,
      codeOutput: `0 1 2 
n = 3
after range copy: [{Aditi true} {Rohan true}]
after index:      [{Aditi false} {Rohan false}]
a=1 b=2 c=3 `,
      mistakes: [
          'Mutating the range value variable and expecting the slice to change — range copies each element.',
          'Relying on map iteration order. It is randomised on purpose; sort the keys.',
          'Looking for a while keyword. `for condition {}` is the while form.',
          'Ranging over a channel that is never closed — the loop blocks forever.',
      ],
      takeaways: [
          'One keyword, four forms: three-part, condition-only, infinite, and range.',
          'Range copies elements; index into the slice when you need to mutate.',
          'Map iteration order is deliberately random — sort keys for stable output.',
      ],
    },
    {
      id: 'm3-l5',
      title: 'Lesson 3.5 break & continue',
      objectives: ['Control loop flow', 'Understand break inside select and switch'],
      theory: `break exits the innermost enclosing for, switch or select immediately. continue skips the rest of the current iteration and moves to the next one, running the post statement first in a three-part loop.
The trap specific to Go is what break means inside a switch that sits inside a loop. Because switch is itself breakable, a bare break there exits the switch, not the loop — so the loop keeps running when you intended to stop. The same applies to select. This is one of the few places Go's syntax genuinely misleads, and the fix is a labelled break, covered in the next lesson.
continue is most useful as a guard clause at the top of a loop body: skip empty lines, skip records that fail validation, skip items already processed. Like early returns in functions, this keeps the main work at one indentation level instead of wrapped in a conditional.
A detail worth remembering: in a three-part for loop, continue still executes the post statement, so \`i++\` runs and the loop advances. In a condition-only loop there is no post statement, so if the only thing that advances your counter sits after the continue, you have written an infinite loop.
Both statements work with range loops as well, and break is the normal way to stop early once you have found what you were searching for.`,
      codeExample: `package main

import "fmt"

func main() {
    // continue as a guard clause keeps the real work unindented.
    lines := []string{"alpha", "", "beta", "#comment", "gamma"}
    for _, l := range lines {
        if l == "" || l[0] == '#' {
            continue
        }
        fmt.Println("processing:", l)
    }

    // break inside a switch exits the SWITCH, not the loop.
    fmt.Println("--- bare break ---")
    for i := 0; i < 4; i++ {
        switch i {
        case 2:
            break // exits the switch only; the loop continues
        }
        fmt.Println("still looping, i =", i)
    }
}`,
      codeOutput: `processing: alpha
processing: beta
processing: gamma
--- bare break ---
still looping, i = 0
still looping, i = 1
still looping, i = 2
still looping, i = 3`,
      mistakes: [
          'Using a bare break inside a switch within a loop and expecting the loop to stop. It only exits the switch.',
          'Placing a counter increment after continue in a condition-only loop, creating an infinite loop.',
          'Using break to leave nested loops — it only exits the innermost one; you need a label.',
          'Writing deeply nested conditionals instead of using continue as an early guard.',
      ],
      takeaways: [
          'break exits the innermost for, switch or select; continue skips to the next iteration.',
          'Inside a switch in a loop, bare break exits the switch — use a label for the loop.',
          'continue as a guard clause keeps loop bodies flat and readable.',
      ],
    },
    {
      id: 'm3-l6',
      title: 'Lesson 3.6 Labels',
      objectives: ['Break and continue outer loops', 'Know when a label is the wrong answer'],
      theory: `A label is an identifier followed by a colon placed immediately before a for, switch or select. Writing \`break Outer\` or \`continue Outer\` then targets that specific statement rather than the innermost one. This is the only way to exit nested loops in one step, and it is the correct fix for the break-inside-switch trap from the previous lesson.
The classic use is searching a two-dimensional structure: once you find the target in the inner loop, \`break OuterLoop\` leaves both loops immediately. The alternative — setting a found flag and checking it in the outer condition — works but is noisier and easy to get wrong.
\`continue Label\` is rarer but occasionally exactly right: it abandons the current outer iteration and starts the next one, skipping any remaining inner work.
Labels must be used. An unused label is a compile error, consistent with Go's treatment of unused variables and imports.
Use them sparingly. Two levels of nesting with one labelled break is clear; deeper labelled jumps start to resemble goto and become hard to follow. Very often the better refactor is to extract the inner loop into its own function and simply return from it — that removes the nesting entirely and gives the operation a name. Go does have a real goto, but it is almost never appropriate in application code.`,
      codeExample: `package main

import "fmt"

func main() {
    grid := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
    target := 5

Search:
    for r, row := range grid {
        for c, v := range row {
            if v == target {
                fmt.Printf("found %d at (%d,%d)\n", target, r, c)
                break Search // leaves BOTH loops
            }
        }
    }

    // A labelled break is also the fix for break-inside-switch.
Loop:
    for i := 0; i < 4; i++ {
        switch i {
        case 2:
            break Loop // now the loop really stops
        }
        fmt.Println("i =", i)
    }

    // Often cleaner: extract and return instead of labelling.
    if r, c, ok := find(grid, 9); ok {
        fmt.Printf("extracted find: %d at (%d,%d)\n", 9, r, c)
    }
}

func find(grid [][]int, target int) (int, int, bool) {
    for r, row := range grid {
        for c, v := range row {
            if v == target {
                return r, c, true
            }
        }
    }
    return 0, 0, false
}`,
      codeOutput: `found 5 at (1,1)
i = 0
i = 1
extracted find: 9 at (2,2)`,
      mistakes: [
          'Declaring a label and not using it — that is a compile error.',
          'Placing the label anywhere other than immediately before the for, switch or select.',
          'Reaching for labels at three or more levels of nesting instead of extracting a function.',
          'Using goto in application code where a labelled break or an extracted function is clearer.',
      ],
      takeaways: [
          'A label before a loop lets `break Label` or `continue Label` target that loop.',
          'Labelled break is the correct fix for break-inside-switch-inside-loop.',
          'Unused labels fail the build; beyond two levels, extract a function instead.',
      ],
    }
  ],
  quiz: [
    { id: 1, question: 'What is the only looping keyword in Go?', options: ["while", "do", "for", "each"], correctAnswer: "for" },
    { id: 2, question: "Does a Go switch case fall through to the next case by default?", options: ["No; you must write fallthrough", "Yes, like C", "Only for string cases", "Only if break is omitted"], correctAnswer: "No; you must write fallthrough" },
    { id: 3, question: "How do you write a while-style loop in Go?", options: ["while condition { }", "for condition { }", "loop condition { }", "do { } while condition"], correctAnswer: "for condition { }" },
    { id: 4, question: "What does `continue` do inside a for loop?", options: ["Exits the loop entirely", "Restarts the loop from zero", "Skips to the next iteration", "Exits the enclosing function"], correctAnswer: "Skips to the next iteration" },
    { id: 5, question: "What is a labelled break used for?", options: ["Jumping to any line in the file", "Pausing a goroutine", "Exiting a switch case early", "Breaking out of an outer loop"], correctAnswer: "Breaking out of an outer loop" },
    { id: 6, question: "Which is valid Go syntax for an if with a short statement?", options: ["if v := f(); v > 0 { }", "if (v = f(); v > 0) { }", "if v > 0 where v = f() { }", "if let v = f() { }"], correctAnswer: "if v := f(); v > 0 { }" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Print FizzBuzz for the numbers 1 to 20, one per line. Print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, and the number itself otherwise. Check the combined case first.',
        language: 'go',
        starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 20; i++ {\n        // TODO: check i%15, then i%3, then i%5 before falling back to i\n        fmt.Println(i)\n    }\n}',
        examples: [
          { input: 'None', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz' }
        ]
      }
    ]
  }
};

export default mod_m3;
