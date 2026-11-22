import type { ModuleData } from '../GolangCourseData';

const mod_m2: ModuleData = {
  id: 'm2',
  title: 'MODULE 2: GO FUNDAMENTALS',
  overview: 'Learn primitives, types declarations, operators and formatting outputs.',
  outcomes: ['Understand variable scopes', 'Format custom Console strings'],
  lessons: [
    {
      id: 'm2-l1',
      title: 'Lesson 2.1 Program Structure',
      objectives: ['Lay out a Go source file correctly', 'Understand exported vs unexported names'],
      theory: `Every Go source file follows the same three-part shape: a package clause, an import block, then declarations. The order is fixed, not stylistic — the compiler rejects anything else.
The package clause names the package this file belongs to. All files in one directory must declare the same package name, and by convention it matches the directory name. Only \`package main\` produces an executable; anything else is a library.
The import block lists what this file uses. Go is unusually strict: an import you do not reference is a compile error. This keeps dependency lists honest, and goimports handles adding and removing them automatically on save. Standard library imports are plain names like "fmt"; third-party imports are module paths like "github.com/gin-gonic/gin", and gofmt groups them into separate blocks for you.
Then come declarations — constants, variables, types, functions. Order among them does not matter: Go resolves references across the whole package, so a function can call another declared 200 lines below it. There is no forward declaration and no header file.
The rule that catches everyone eventually is visibility. Go has no public or private keyword. Instead, capitalisation decides: an identifier starting with an uppercase letter is exported and visible to other packages; a lowercase one is package-private. \`UserID\` is visible outside; \`userID\` is not. This applies to functions, types, struct fields and constants alike, which is why an exported struct with lowercase fields will silently serialise to empty JSON.`,
      syntax: `package main

import (
    "fmt"      // standard library
    "strings"
)

// Exported: visible to other packages (capital B)
const BuildVersion = "1.4.0"

// unexported: package-private (lowercase r)
var releaseChannel = "stable"

func main() {
    fmt.Println(strings.ToUpper(BuildVersion), releaseChannel)
}`,
      codeExample: `package main

import "fmt"

// Capitalisation is the only visibility control in Go.
type Config struct {
    Host string // exported — other packages and encoding/json can see it
    Port int    // exported
    key  string // unexported — invisible outside this package
}

// describe is unexported; Summary is exported.
func describe(c Config) string {
    return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

func Summary(c Config) string {
    return "config " + describe(c) // fine: same package
}

func main() {
    c := Config{Host: "localhost", Port: 8080, key: "secret"}
    fmt.Println(Summary(c))
    fmt.Println("unexported field is reachable inside the package:", c.key)
}`,
      codeOutput: `config localhost:8080
unexported field is reachable inside the package: secret`,
      mistakes: [
          'Leaving an unused import in the file — a compile error in Go, not a warning.',
          'Lowercasing struct fields and then wondering why encoding/json produces `{}`. Only exported fields are marshalled.',
          'Assuming declaration order matters. It does not; a function may call one declared later in the file.',
          'Mixing package names within one directory. Every file in a directory must share the same package clause.',
      ],
      takeaways: [
          'Package clause, then imports, then declarations — the order is enforced.',
          'Capitalisation is the visibility rule: uppercase exports, lowercase stays package-private.',
          'Unused imports fail the build; declaration order inside a package is irrelevant.',
      ],
    },
    {
      id: 'm2-l2',
      title: 'Lesson 2.2 Variables',
      objectives: ['Declare variables three ways', 'Understand zero values and shadowing'],
      theory: `Go gives you three ways to create a variable, and each has a correct place. The full form \`var name type = value\` is explicit and works anywhere, including at package level. Dropping the type, as in \`var name = value\`, lets the compiler infer it. The short form \`name := value\` also infers, but is only legal inside a function.
In practice, use \`:=\` inside functions because it is the shortest thing that reads clearly, and use \`var\` at package level or when you want the zero value without assigning anything.
Zero values are one of Go's better decisions. A declared variable is never uninitialised garbage: numbers start at 0, strings at "", booleans at false, and pointers, slices, maps, channels, functions and interfaces at nil. This makes \`var buf bytes.Buffer\` immediately usable without construction, and it means you rarely need a constructor just to establish sane defaults.
Two rules trip people up. First, an unused local variable is a compile error — Go treats it as evidence of a mistake. Unused package-level variables are fine. Second, \`:=\` requires at least one new variable on the left, so you can write \`v, err := f()\` then \`w, err := g()\` and the second reuses err rather than redeclaring it.
Shadowing is the subtle one. Inside an if or for block, \`:=\` creates a brand new variable that hides the outer one for that scope. Assigning to it does not change the outer variable, which produces bugs that look impossible until you spot the extra colon.`,
      syntax: `// All three forms produce the same variable.
var count int = 10   // explicit type
var count2 = 10      // inferred type
count3 := 10         // short form, functions only

// Zero values: no explicit initialisation needed
var (
    total   int     // 0
    name    string  // ""
    active  bool    // false
    handler func()  // nil
)`,
      codeExample: `package main

import "fmt"

func main() {
    x := 1

    if true {
        // The colon makes this a NEW x, scoped to the if-block.
        x := 2
        fmt.Println("inside if: ", x)
    }
    fmt.Println("after if:  ", x) // outer x is untouched

    if true {
        x = 3 // no colon: assigns to the OUTER x
        fmt.Println("inside if: ", x)
    }
    fmt.Println("after if:  ", x)
}`,
      codeOutput: `inside if:  2
after if:   1
inside if:  3
after if:   3`,
      mistakes: [
          'Shadowing with `:=` inside an if or for block and expecting the outer variable to change. Drop the colon to assign.',
          'Declaring a local variable and not using it — that is a compile error. Assign to `_` if you genuinely need to discard it.',
          'Trying to use `:=` at package level. It is only valid inside a function.',
          'Writing a constructor purely to zero out fields; the zero value already does that.',
      ],
      takeaways: [
          '`:=` inside functions, `var` at package level or when the zero value is enough.',
          'Every variable has a defined zero value — nothing is uninitialised.',
          'Unused locals fail the build, and `:=` inside a block shadows rather than assigns.',
      ],
    },
    {
      id: 'm2-l3',
      title: 'Lesson 2.3 Constants',
      objectives: ['Declare typed and untyped constants', 'Use iota for enumerations'],
      theory: `A constant is fixed at compile time. It can hold only a value the compiler can evaluate — numbers, strings, booleans, and expressions over them. You cannot make a constant from a function call, a slice or a map, because none of those exist until the program runs. \`const startedAt = time.Now()\` does not compile.
The interesting property is that Go constants can be untyped. An untyped constant has a default type but adapts to context, so \`const big = 1 << 40\` works even though it overflows an int32, and \`const ratio = 3\` can be used where a float64 is expected without conversion. Typed constants lose that flexibility, so prefer untyped unless you specifically want the type enforced.
For enumerations Go gives you \`iota\`, a counter that resets to 0 in each const block and increments by one per line. Combined with a named type it produces readable, type-safe enums. The idiom of writing \`_ = iota\` first is common when zero should mean "unset", so an uninitialised value is never mistaken for a valid member.
iota also handles arithmetic. Writing \`KB = 1 << (10 * (iota + 1))\` in a const block generates KB, MB, GB and so on from a single expression, because the expression is repeated implicitly on each subsequent line.
Adding a String() method to your enum type is worth the few lines: without it, printing a constant shows a bare integer, which is unhelpful in logs.`,
      codeExample: `package main

import "fmt"

type Status int

// iota resets per const block and increments per line.
const (
    StatusUnknown Status = iota // 0 — keeps "unset" distinguishable
    StatusPending               // 1
    StatusActive                // 2
    StatusClosed                // 3
)

// Without String(), printing a Status shows a bare number.
func (s Status) String() string {
    return [...]string{"unknown", "pending", "active", "closed"}[s]
}

// The expression is repeated implicitly on each line.
const (
    KB = 1 << (10 * (iota + 1))
    MB
    GB
)

func main() {
    fmt.Println(StatusActive, int(StatusActive))
    fmt.Println("KB:", KB, "MB:", MB, "GB:", GB)
}`,
      codeOutput: `active 2
KB: 1024 MB: 1048576 GB: 1073741824`,
      mistakes: [
          'Trying to initialise a constant from a function call. Constants must be computable at compile time.',
          'Forgetting that iota restarts at 0 in every new const block.',
          'Skipping a String() method on an enum type, then reading integers instead of names in logs.',
          'Typing a constant unnecessarily — untyped constants adapt to context and avoid conversions.',
      ],
      takeaways: [
          'Constants are compile-time only: no function calls, slices or maps.',
          'Untyped constants adapt to their context; prefer them unless you need enforcement.',
          'iota generates enums, resets per const block, and repeats the expression implicitly.',
      ],
    },
    {
      id: 'm2-l4',
      title: 'Lesson 2.4 Data Types',
      objectives: ['Know the basic types and their sizes', 'Understand strings, runes and bytes'],
      theory: `Go's basic types are deliberately explicit. Integers come in sized signed and unsigned forms — int8 through int64, uint8 through uint64 — plus \`int\` and \`uint\`, which are 64-bit on virtually all modern platforms. Use plain \`int\` unless you have a specific reason: a binary format, a memory constraint, or a protocol that dictates width. Floats are float32 and float64; use float64 by default, and never use either for money, where you want integer minor units or a decimal library.
Strings are where the real learning is. A Go string is an immutable sequence of bytes, conventionally holding UTF-8 text. Indexing a string with s[0] gives you a byte, not a character. For ASCII those coincide; for anything else they do not, which is why len("héllo") is 6 rather than 5 — é occupies two bytes.
A \`rune\` is Go's name for a Unicode code point, an alias for int32. Ranging over a string yields runes with their byte offsets, which is almost always what you want when processing text. Converting to []rune lets you index by character at the cost of an allocation.
Because strings are immutable, building one in a loop with += allocates a new string every iteration and is quadratic. Use strings.Builder, which writes into a growable buffer and produces the final string once.`,
      codeExample: `package main

import (
    "fmt"
    "strings"
    "unicode/utf8"
)

func main() {
    s := "héllo"

    fmt.Println("len (bytes):     ", len(s))
    fmt.Println("rune count:      ", utf8.RuneCountInString(s))
    fmt.Printf("s[1] is a byte:   %d\n", s[1])
    fmt.Printf("[]rune indexing:  %c\n", []rune(s)[1])

    // range yields (byte offset, rune) — note the offset jump over é
    for i, r := range s[:3] {
        fmt.Printf("  offset %d -> %c\n", i, r)
    }

    // Immutability: build with a Builder, never += in a loop.
    var b strings.Builder
    for i := 0; i < 3; i++ {
        b.WriteString("ab")
    }
    fmt.Println("built:", b.String())
}`,
      codeOutput: `len (bytes):      6
rune count:       5
s[1] is a byte:   195
[]rune indexing:  é
  offset 0 -> h
  offset 1 -> é
built: ababab`,
      mistakes: [
          'Assuming len(string) counts characters. It counts bytes — use utf8.RuneCountInString.',
          'Indexing a string to get a character. s[i] is a byte; convert to []rune or range instead.',
          'Concatenating with += in a loop. That is quadratic; use strings.Builder.',
          'Using float64 for currency. Use integer minor units (paise, cents) or a decimal package.',
      ],
      takeaways: [
          'Default to `int` and `float64` unless a format or constraint says otherwise.',
          'Strings are immutable UTF-8 bytes: len counts bytes, indexing yields bytes.',
          'Range over a string for runes; use strings.Builder to build strings in loops.',
      ],
    },
    {
      id: 'm2-l5',
      title: 'Lesson 2.5 Type Conversion',
      objectives: ['Convert between numeric types safely', 'Parse strings without silent failures'],
      theory: `Go performs no implicit numeric conversion at all. Adding an int to a float64 is a compile error; you must write float64(i) explicitly. This is verbose and it is intentional — implicit conversion is a classic source of silent precision loss and overflow, and Go would rather you state your intent.
Conversion between numeric types is a simple T(v) expression, but it is not always safe. Narrowing a large int64 into an int32 truncates silently with no error and no panic. Converting a negative int to a uint wraps to an enormous positive number. Go trusts you to have checked; the compiler will not.
Converting between strings and numbers is a different operation entirely, and this is where a genuinely dangerous mistake lives. \`string(65)\` does not produce "65" — it produces "A", the character with code point 65. Go vet now flags this, but it still surprises people. For numeric text you want the strconv package: strconv.Itoa for int to string, and strconv.Atoi or ParseFloat for the reverse.
Every parse can fail, so strconv returns a value and an error. Ignoring that error means a malformed input silently becomes zero, which is exactly the kind of bug that surfaces as wrong numbers in a report months later.
Converting between []byte and string is also a conversion and it copies, since strings are immutable. In a hot loop that copy can matter.`,
      codeExample: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    i := 42
    f := 3.9

    // Explicit conversion is mandatory; float->int truncates, never rounds.
    fmt.Println("sum:      ", float64(i)+f)
    fmt.Println("truncated:", int(f))

    // string(int) yields a CHARACTER, not digits — a classic bug.
    fmt.Printf("string(65) = %q  (not \"65\")\n", string(rune(65)))
    fmt.Printf("strconv.Itoa(65) = %q\n", strconv.Itoa(65))

    // Parsing can fail: handle the error, never discard it.
    if n, err := strconv.Atoi("123"); err == nil {
        fmt.Println("parsed:", n)
    }
    if _, err := strconv.Atoi("12a"); err != nil {
        fmt.Println("parse error:", err)
    }
}`,
      codeOutput: `sum:       45.9
truncated: 3
string(65) = "A"  (not "65")
strconv.Itoa(65) = "65"
parsed: 123
parse error: strconv.Atoi: parsing "12a": invalid syntax`,
      mistakes: [
          'Using string(n) to turn a number into text. That gives the code point; use strconv.Itoa.',
          'Discarding the error from strconv — malformed input then silently becomes 0.',
          'Assuming int(3.9) rounds. Conversion truncates toward zero; use math.Round first.',
          'Narrowing int64 to int32 without a range check. It truncates silently.',
      ],
      takeaways: [
          'Go has no implicit numeric conversion — write float64(x) explicitly.',
          'strconv converts between strings and numbers; string(int) gives a character.',
          'Every strconv parse returns an error; ignoring it hides bad input.',
      ],
    },
    {
      id: 'm2-l6',
      title: 'Lesson 2.6 Operators',
      objectives: ['Use arithmetic, comparison and logical operators', 'Know integer division and bit operations'],
      theory: `Go's operators are conventional, with a few sharp edges worth knowing. Arithmetic is + - * / %, and the important detail is that division between two integers performs integer division: 7 / 2 is 3, not 3.5. If you want a fractional result, convert an operand to a float first. The modulus operator % works only on integers, and takes the sign of the dividend, so -7 % 2 is -1.
Comparison operators return a bool. Equality works on comparable types — numbers, strings, booleans, pointers, channels, and structs and arrays whose fields are themselves comparable. It does not work on slices or maps, where == is only valid against nil; comparing their contents needs reflect.DeepEqual or a hand-written loop.
Logical && and || short-circuit, which Go relies on idiomatically: \`if u != nil && u.Active\` is safe because the second operand is never evaluated when the first is false. There is no ternary operator; Go deliberately omits it, so you write a short if statement instead.
Bitwise operators are & | ^ &^ plus the shifts << and >>. Two are Go-specific: unary ^ is bitwise NOT (not ~), and &^ is AND NOT, which clears bits in one operation — genuinely useful for flag manipulation.
Finally, Go has ++ and -- but they are statements, not expressions. You can write i++ on its own line; you cannot write \`x := i++\` or \`f(i++)\`. And there is no prefix form.`,
      codeExample: `package main

import "fmt"

const (
    FlagRead  = 1 << iota // 1
    FlagWrite             // 2
    FlagExec              // 4
)

func main() {
    fmt.Println("7 / 2   =", 7/2)                 // integer division
    fmt.Println("7.0 / 2 =", 7.0/2)               // float division
    fmt.Println("-7 % 2  =", -7%2)                // sign follows dividend

    perms := FlagRead | FlagWrite                 // set bits
    fmt.Println("has write:", perms&FlagWrite != 0)
    perms = perms &^ FlagWrite                    // AND NOT clears the bit
    fmt.Println("after clear:", perms&FlagWrite != 0)

    // Short-circuit: u.Active is never evaluated when u is nil.
    var u *struct{ Active bool }
    fmt.Println("safe check:", u != nil && u.Active)
}`,
      codeOutput: `7 / 2   = 3
7.0 / 2 = 3.5
-7 % 2  = -1
has write: true
after clear: false
safe check: false`,
      mistakes: [
          'Expecting 7/2 to be 3.5. Integer division truncates; convert an operand to float64 first.',
          'Comparing slices or maps with ==. Only comparison against nil is legal.',
          'Writing `x := i++`. Increment is a statement in Go, not an expression.',
          'Looking for a ternary operator or `~` for bitwise NOT. Go uses a short if, and unary `^`.',
      ],
      takeaways: [
          'Integer division truncates; % works only on integers and follows the dividend\'s sign.',
          '== does not work on slices or maps except against nil.',
          '`&^` clears bits, unary `^` is NOT, and ++ / -- are statements only.',
      ],
    },
    {
      id: 'm2-l7',
      title: 'Lesson 2.7 User Input',
      objectives: ['Read from stdin reliably', 'Choose between Scan and a Scanner'],
      theory: `Reading input in Go comes down to two approaches, and picking the wrong one causes most beginner frustration. \`fmt.Scan\` and \`fmt.Scanln\` read whitespace-separated tokens into pointers. They are convenient for a quick exercise, but they stop at the first space, so reading a full name with fmt.Scan captures only the first word.
For anything line-oriented, use bufio.Scanner wrapped around os.Stdin. Its Scan method reads one line at a time and returns false at end of input, so \`for scanner.Scan()\` is the idiomatic read-everything loop. Text() gives the line without its trailing newline.
Note that fmt.Scan takes pointers — \`fmt.Scan(&name)\` — because it writes into your variables. Forgetting the ampersand is a compile error, which is at least a fast failure.
Two production details matter. bufio.Scanner has a default maximum token size of 64KB and silently stops on longer lines unless you call Buffer to raise it; that has bitten many people processing large JSON lines. And you should check scanner.Err() after the loop, because Scan returning false means either clean end-of-input or a read error, and only Err() distinguishes them.
Input is also almost always text that needs parsing and validating. Combine the scanner with strings.TrimSpace and strconv, and handle the parse error rather than assuming well-formed input.`,
      codeExample: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Print("Name: ")
    scanner.Scan()
    name := strings.TrimSpace(scanner.Text()) // whole line, spaces included

    fmt.Print("Age: ")
    scanner.Scan()
    age, err := strconv.Atoi(strings.TrimSpace(scanner.Text()))
    if err != nil {
        fmt.Println("that is not a number:", err)
        return
    }

    // Scan() returning false can mean EOF *or* an error.
    if err := scanner.Err(); err != nil {
        fmt.Println("read error:", err)
        return
    }
    fmt.Printf("%s is %d\n", name, age)
}`,
      codeOutput: `Name: Aditi Sharma
Age: 24
Aditi Sharma is 24`,
      mistakes: [
          'Using fmt.Scan for a full name — it stops at the first space. Use bufio.Scanner for lines.',
          'Forgetting the & in fmt.Scan(&x). Scan needs a pointer to write into.',
          'Ignoring scanner.Err(), so a read failure looks identical to clean end-of-input.',
          'Hitting the silent 64KB line limit on long inputs without calling scanner.Buffer.',
      ],
      takeaways: [
          'bufio.Scanner for line input; fmt.Scan only for whitespace-separated tokens.',
          'Always TrimSpace and parse with strconv, handling the error.',
          'Check scanner.Err() after the loop and raise the buffer for long lines.',
      ],
    },
    {
      id: 'm2-l8',
      title: 'Lesson 2.8 Output Formatting',
      objectives: ['Use the Printf verbs fluently', 'Pick the right Print function'],
      theory: `The fmt package gives you three families. Print writes values with spaces only between operands that are not strings. Println always adds spaces and a newline. Printf takes a format string with verbs and gives you full control. There are matching Sprint variants that return a string instead of writing, and Fprint variants that write to any io.Writer — which is how you print to stderr or into an HTTP response.
The verbs worth memorising are small in number. %d for integers, %s for strings, %f for floats with %.2f controlling decimals, %t for booleans, %v for any value in its default form, and %T for the value's type. For debugging, %+v prints struct field names alongside values, and %#v prints Go syntax you could paste back into code — those two save enormous time.
%q is underrated: it prints a double-quoted, escaped string, which instantly reveals stray whitespace or invisible characters that %s hides. When a comparison "should" be equal but is not, printing both sides with %q usually finds it immediately.
Width and alignment matter for CLI output: %6d right-aligns in six columns, %-10s left-aligns in ten, and %08.3f pads with zeros. Aligned columns are the difference between readable and unreadable terminal output.
One caution: if the number of verbs does not match the arguments, Go does not fail the build — it prints markers like %!d(MISSING) into your output. \`go vet\` catches these, which is a good reason to run it in CI.`,
      codeExample: `package main

import (
    "fmt"
    "os"
)

type User struct {
    Name string
    Age  int
}

func main() {
    u := User{Name: "Aditi", Age: 24}

    fmt.Printf("%v\n", u)   // values only
    fmt.Printf("%+v\n", u)  // field names — best for debugging
    fmt.Printf("%#v\n", u)  // Go syntax
    fmt.Printf("%T\n", u)   // the type itself

    // %q exposes whitespace that %s hides.
    raw := "value \n"
    fmt.Printf("%s| vs %q\n", raw, raw)

    // Width and alignment for readable tables.
    fmt.Printf("|%-10s|%6d|%8.2f|\n", "widget", 42, 3.14159)

    // Fprint writes to any io.Writer — here, stderr.
    fmt.Fprintln(os.Stderr, "this goes to stderr")
}`,
      codeOutput: `{Aditi 24}
{Name:Aditi Age:24}
main.User{Name:"Aditi", Age:24}
main.User
value 
| vs "value \n"
|widget    |    42|    3.14|
this goes to stderr`,
      mistakes: [
          'Mismatching verbs and arguments — Go prints %!d(MISSING) rather than failing. Run go vet.',
          'Using %d on a string or %s on an int; the output becomes %!s(int=5) style noise.',
          'Debugging structs with %v instead of %+v, so you cannot tell which field is which.',
          'Forgetting Println adds a newline but Print does not, then wondering why output runs together.',
      ],
      takeaways: [
          'Printf verbs: %d %s %f %t %v %T, with %+v and %#v for debugging.',
          '%q reveals whitespace and escapes that %s hides.',
          'Width verbs like %-10s align CLI output; go vet catches verb mismatches.',
      ],
    }
  ],
  quiz: [
    { id: 1, question: 'Which format verb prints a variable type in fmt.Printf?', options: ["%v", "%T", "%s", "%d"], correctAnswer: "%T" },
    { id: 2, question: "What is the zero value of an uninitialised int variable?", options: ["nil", "0", "undefined", "-1"], correctAnswer: "0" },
    { id: 3, question: "Where can the short declaration `x := 5` be used?", options: ["Only at package level", "Anywhere in the file", "Only inside functions", "Only inside for loops"], correctAnswer: "Only inside functions" },
    { id: 4, question: "How do you convert an int `n` to float64?", options: ["(float64) n", "n.toFloat64()", "parseFloat(n)", "float64(n)"], correctAnswer: "float64(n)" },
    { id: 5, question: "What does `const Pi = 3.14` give you that `var Pi = 3.14` does not?", options: ["A value fixed at compile time", "A value stored on the heap", "A value that is always a string", "A value shared across goroutines"], correctAnswer: "A value fixed at compile time" },
    { id: 6, question: "What is the result of `7 / 2` when both operands are ints?", options: ["3.5", "3", "4", "A compile error"], correctAnswer: "3" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Read a name and an age from standard input, then print a formatted profile line. Use fmt.Scan to read the values and fmt.Printf with the %s and %d verbs to format the output.',
        language: 'go',
        starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var name string\n    var age int\n\n    fmt.Scan(&name, &age)\n\n    // TODO: print with Printf using %s and %d:\n    // Name: <name> | Age: <age>\n    fmt.Println(name, age)\n}',
        stdin: true,
        examples: [
          { input: 'Aditi\n24', output: 'Name: Aditi | Age: 24' }
        ]
      }
    ]
  }
};

export default mod_m2;
