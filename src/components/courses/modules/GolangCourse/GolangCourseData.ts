import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    // Plain strings are written questions; objects with kind:'code' render a
    // runnable editor. See ModuleAssignment for the full shape.
    prompts: AssignmentQuestion[];
  };
}

export const GOLANG_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION TO GOLANG',
    overview: 'Learn history, architecture design, and system setups to run your first Go app.',
    outcomes: ['Understand Go design decisions', 'Install Go locally and write Hello World'],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Welcome to Golang',
        objectives: ['Understand what Go optimises for', 'Know where Go fits in a modern stack'],
        theory: `Go is an open-source, statically typed, compiled language created at Google and released publicly in 2009. It was not designed to be the most expressive or the most academically interesting language available. It was designed to solve a specific organisational problem: very large engineering teams working in a very large codebase, where build times, dependency sprawl and unreadable code were costing more than raw language power was gaining.
Every notable decision in Go follows from that goal. There is one official formatter, so nobody argues about layout. There is no inheritance hierarchy to trace through six files. Compilation is fast enough that the edit-run cycle feels closer to a scripting language than to C++. The language is small enough that a competent engineer can hold most of it in their head after a couple of weeks.
That smallness is a genuine trade-off, not a marketing claim. You will occasionally write a loop where another language would give you a one-line built-in. In exchange, code written by a stranger three years ago reads almost exactly like code you wrote yesterday, which matters far more over the life of a real system.
Where Go sits in practice: it dominates network services, CLI tooling and infrastructure. Docker, Kubernetes, Terraform and Prometheus are all written in Go. It is a poor choice for numerical computing or machine learning, where Python's ecosystem is unmatched. Knowing what a tool is bad at is as valuable as knowing what it is good at.`,
        codeExample: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    // The runtime package exposes information about the Go
    // environment your binary was compiled for and is running on.
    fmt.Println("Go version:", runtime.Version())
    fmt.Println("OS/Arch:   ", runtime.GOOS+"/"+runtime.GOARCH)
    fmt.Println("CPU cores: ", runtime.NumCPU())
}`,
        codeOutput: `Go version: go1.22.0
OS/Arch:    linux/amd64
CPU cores:  8`,
        mistakes: [
            'Expecting Go to have classes and inheritance. It has structs and interfaces, and composition replaces inheritance entirely.',
            'Assuming "compiled" means slow to iterate. Go builds in seconds, and `go run` skips the explicit build step during development.',
            'Reaching for Go for data science or ML work. That is Python\'s territory; Go is for the services around the model.',
        ],
        takeaways: [
            'Go optimises for readability and build speed at very large scale, not for expressiveness.',
            'One formatter, a small feature set and fast compiles are deliberate trade-offs.',
            'It is the default language of cloud infrastructure; it is the wrong choice for numerical work.',
        ],
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 What is Go?',
        objectives: ['Describe Go\'s type system and memory model', 'Explain composition over inheritance'],
        theory: `Go is statically typed: every variable has a type known at compile time, and the compiler rejects mismatches before your program ever runs. This catches an entire category of bug that dynamic languages only discover in production. Go is also strongly typed with no implicit numeric conversion — assigning an int to a float64 variable is a compile error, not a silent widening. That feels pedantic for a week and then quietly saves you.
Memory is managed by a garbage collector, so you do not free memory by hand as you would in C. Go's collector is tuned for low pause times rather than maximum throughput, because it targets servers where a predictable few-hundred-microsecond pause matters more than squeezing out the last percent of CPU.
The design choice that surprises newcomers most is the absence of classes and inheritance. Go has structs, which group data, and methods, which attach behaviour to a type. Where another language would subclass, Go embeds one struct inside another and promotes its methods. This is composition, and it avoids the fragile deep hierarchies that make large object-oriented codebases hard to change.
Interfaces complete the picture and are satisfied implicitly. A type implements an interface simply by having the right methods — there is no "implements" keyword and no import linking the two. This means you can write an interface in your own package that an existing third-party type already satisfies, which makes testing and decoupling unusually easy.`,
        codeExample: `package main

import "fmt"

type Engine struct{ HP int }

func (e Engine) Start() string {
    return fmt.Sprintf("engine started (%d hp)", e.HP)
}

// Car embeds Engine rather than inheriting from it.
// Engine's methods are promoted onto Car.
type Car struct {
    Engine
    Model string
}

// Starter is satisfied implicitly — Car never declares it.
type Starter interface{ Start() string }

func main() {
    c := Car{Engine: Engine{HP: 180}, Model: "Kappa"}
    fmt.Println(c.Model, "->", c.Start())

    var s Starter = c // works because Car has Start()
    fmt.Println("as interface:", s.Start())
}`,
        codeOutput: `Kappa -> engine started (180 hp)
as interface: engine started (180 hp)`,
        mistakes: [
            'Trying to convert types implicitly: `var f float64 = someInt` fails. Write `float64(someInt)`.',
            'Looking for an `implements` keyword. Interface satisfaction is structural and implicit.',
            'Treating embedding as inheritance. The outer type gets the methods, but there is no polymorphic override of the inner type\'s own calls.',
        ],
        takeaways: [
            'Static, strong typing with no implicit conversions catches errors at compile time.',
            'Composition through struct embedding replaces inheritance.',
            'Interfaces are satisfied implicitly, which makes decoupling and testing straightforward.',
        ],
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 History of Go',
        objectives: ['Know the origin and its influence on the design'],
        theory: `Go began in 2007 as a side project by three engineers at Google: Robert Griesemer, Rob Pike and Ken Thompson. Thompson had co-created Unix and the B language; Pike had worked on Plan 9 and UTF-8. These were people with decades of systems experience and strong opinions about what had gone wrong with C++.
The founding story is that they started sketching the language while waiting roughly 45 minutes for a large C++ binary to compile. Whether or not that is exact, it captures the motivation precisely: at Google's scale, slow builds and tangled dependency graphs were a serious tax on engineering time. Go was open-sourced in November 2009 and reached version 1.0 in March 2012.
Go 1.0 came with a compatibility promise that has shaped the language ever since: code written for Go 1 would continue to compile with later Go 1.x releases. That promise is why upgrading Go is usually uneventful, and it is also why the language evolves slowly and conservatively. Generics, for instance, were debated for roughly a decade before landing in Go 1.18 in 2022.
Understanding this history explains the language's personality. When you find yourself wishing Go had some convenient feature, the answer is usually that the team considered it and decided the added complexity was not worth the cost across millions of lines of code written by thousands of engineers.`,
        mistakes: [
            'Assuming Go is immature because the feature set is small. It is deliberately conservative and has been stable since 2012.',
            'Expecting frequent breaking changes. The Go 1 compatibility promise means upgrades are usually routine.',
        ],
        takeaways: [
            'Created in 2007 by Griesemer, Pike and Thompson; open-sourced 2009; 1.0 in 2012.',
            'It was a direct response to slow builds and dependency complexity at Google scale.',
            'The Go 1 compatibility promise makes upgrades safe and makes the language evolve slowly.',
        ],
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 Why Learn Go?',
        objectives: ['Judge when Go is the right tool', 'Understand the career case'],
        theory: `The strongest practical argument for Go is deployment. A Go build produces a single statically linked binary with no runtime, no interpreter and no dependency directory. You copy one file to a server, or into a container built \`FROM scratch\`, and it runs. Compare that with shipping a JVM plus a JAR, or a Python service plus its virtualenv and system libraries, and the operational simplicity is obvious.
The second argument is concurrency. Go's goroutines are managed by the language runtime rather than the operating system, so a single process can run hundreds of thousands of them. For network services — where most time is spent waiting on I/O rather than computing — this maps directly onto the problem. Writing a concurrent server in Go is genuinely easier than in most alternatives.
Third is the ecosystem position. Docker, Kubernetes, Terraform, Prometheus, etcd, Consul and much of the CNCF landscape are written in Go. If you work anywhere near infrastructure, you will eventually need to read or extend Go source, and being able to do so is a real advantage.
Be honest about the limits. Go's error handling is verbose, and you will type \`if err != nil\` thousands of times. Generics are new and less powerful than in some languages. There is no rich data-science ecosystem. Go is an excellent choice for APIs, CLIs, infrastructure tooling and network services, and a poor one for numerical work, data analysis or heavily generic library design.`,
        mistakes: [
            'Choosing Go for a data-heavy analytics project because it is fast. Raw speed rarely compensates for a missing ecosystem.',
            'Underestimating the verbosity of explicit error handling before starting a large project.',
            'Assuming goroutines are free. They are cheap, not free — unbounded goroutine creation still exhausts memory.',
        ],
        takeaways: [
            'A single static binary makes deployment dramatically simpler than runtime-based languages.',
            'Goroutines are runtime-managed, making high-concurrency network services straightforward.',
            'Go is the language of cloud infrastructure — and the wrong tool for data science.',
        ],
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 Features of Go',
        objectives: ['Survey the core feature set', 'Know what Go deliberately omits'],
        theory: `Go's headline features are worth listing precisely, because interviews ask for exactly this. Goroutines provide lightweight concurrency starting at around 2KB of stack that grows on demand, compared with roughly 1MB for an OS thread. Channels provide typed communication between goroutines. Interfaces are implicit and structural. The garbage collector is concurrent and tuned for short pauses. \`gofmt\` enforces one canonical formatting. The standard library is unusually complete, with a production-grade HTTP server, JSON handling, cryptography and testing all built in.
Equally important is what Go leaves out. There are no exceptions — functions return errors as ordinary values. There is no inheritance. There are no implicit type conversions. Until 2022 there were no generics at all, and even now they are intentionally limited. There are no default parameter values and no function overloading.
Each omission has the same rationale: the feature makes individual lines shorter but makes the whole program harder to reason about. Exceptions hide control flow, so Go makes every failure path visible. Overloading makes it unclear which function actually runs, so Go has one name per function.
The result is code with a very low surprise factor. It is often more verbose than the equivalent in Python or Kotlin, and it is almost always easier to read cold six months later — which is the trade the language is making on your behalf.`,
        codeExample: `package main

import (
    "errors"
    "fmt"
)

// Errors are ordinary return values, not thrown exceptions.
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    if result, err := divide(10, 4); err == nil {
        fmt.Println("10 / 4 =", result)
    }

    // The failure path is impossible to overlook.
    if _, err := divide(1, 0); err != nil {
        fmt.Println("error:", err)
    }
}`,
        codeOutput: `10 / 4 = 2.5
error: division by zero`,
        mistakes: [
            'Ignoring a returned error to keep code short. The compiler allows it; production incidents follow.',
            'Looking for try/catch. Go has panic/recover, but it is for unrecoverable bugs, not routine error handling.',
            'Expecting function overloading or default arguments. Use distinct names or an options struct instead.',
        ],
        takeaways: [
            'Goroutines, channels, implicit interfaces, a low-pause GC and gofmt are the core features.',
            'No exceptions, no inheritance, no overloading — each omission buys predictability.',
            'Errors are values, so every failure path is visible in the code.',
        ],
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 Installing Go',
        objectives: ['Install the toolchain', 'Understand GOROOT, GOPATH and modules'],
        theory: `Download the installer for your platform from go.dev/dl — an .msi for Windows, a .pkg for macOS, or a .tar.gz for Linux that you extract into /usr/local. Package managers such as Homebrew or apt also work, though distribution packages are sometimes several versions behind, which matters if you need a recent language feature.
After installing, confirm the toolchain is on your PATH by running \`go version\`. If the command is not found, the install directory's bin folder is missing from PATH; on Linux and macOS that is usually /usr/local/go/bin.
Two environment variables cause most of the early confusion. GOROOT points at the Go installation itself and you should almost never set it manually — the toolchain knows where it lives. GOPATH points at your workspace for downloaded modules and installed binaries, defaulting to ~/go, and is also fine to leave alone.
The important modern point is that since Go 1.11, modules replaced the old GOPATH-based project layout. Your code no longer has to live inside GOPATH. You create a project anywhere, run \`go mod init\`, and dependencies are tracked in go.mod. Any tutorial that insists your project must sit in ~/go/src is describing a workflow that has been obsolete for years.`,
        codeExample: `# Verify the toolchain is installed and on PATH
go version
# -> go version go1.22.0 darwin/arm64

# Inspect the environment the toolchain will use
go env GOROOT GOPATH GOMODCACHE

# Start a project anywhere on disk — no GOPATH required
mkdir ~/projects/hello && cd ~/projects/hello
go mod init example.com/hello
# -> go: creating new go.mod: module example.com/hello`,
        codeOutput: `go version go1.22.0 darwin/arm64
/usr/local/go
/Users/you/go
/Users/you/go/pkg/mod
go: creating new go.mod: module example.com/hello`,
        mistakes: [
            'Setting GOROOT by hand. It is almost always wrong and breaks the toolchain; let Go manage it.',
            'Believing projects must live under ~/go/src. That has been unnecessary since modules arrived in Go 1.11.',
            'Installing from a distro package and getting an old version. Check `go version` against go.dev before debugging a missing feature.',
        ],
        takeaways: [
            'Verify the install with `go version` before anything else.',
            'Leave GOROOT and GOPATH alone; the defaults are correct.',
            'Modules mean your project can live anywhere — start with `go mod init`.',
        ],
      },
      {
        id: 'm1-l7',
        title: 'Lesson 1.7 Setting Up VS Code',
        objectives: ['Configure a productive editor', 'Know what gopls provides'],
        theory: `Install Visual Studio Code, open the Extensions panel and install the official Go extension published by the Go Team at Google. On first opening a .go file it will offer to install its helper tools; accept, and it will fetch gopls along with the debugger and analysis tools.
gopls is the official Go language server, and it is what provides autocompletion, go-to-definition, find-references, inline documentation, symbol rename and real-time diagnostics. Most of what feels like editor intelligence is gopls rather than the editor itself, which is why the same experience is available in Neovim, GoLand or any other LSP-capable editor.
Turn on format-on-save. Go has exactly one correct formatting, produced by gofmt, and formatting is simply not something Go developers discuss. Configuring the editor to run it automatically means you never think about layout again. Many teams also enable goimports, which additionally adds and removes import statements as you type — a real time-saver given that Go treats an unused import as a compile error.
For debugging, the extension integrates Delve, the Go debugger, so you can set breakpoints and inspect variables directly in the editor rather than scattering print statements through your code.`,
        codeExample: `// .vscode/settings.json — a sane starting configuration
{
  "editor.formatOnSave": true,
  "go.useLanguageServer": true,
  // goimports also fixes the import block, which matters because
  // an unused import is a compile error in Go.
  "go.formatTool": "goimports",
  "gopls": {
    "ui.semanticTokens": true,
    "staticcheck": true
  }
}`,
        mistakes: [
            'Disabling format-on-save to keep a personal style. Go has one canonical format; fighting it only creates noisy diffs.',
            'Skipping the tool installation prompt, then wondering why autocompletion does nothing.',
            'Assuming the intelligence comes from VS Code. It comes from gopls, so any LSP editor works equally well.',
        ],
        takeaways: [
            'The official Go extension plus gopls gives completion, navigation and diagnostics.',
            'Enable format-on-save with goimports — it also fixes the import block.',
            'Delve provides real breakpoint debugging; you do not need print statements.',
        ],
      },
      {
        id: 'm1-l8',
        title: 'Lesson 1.8 Your First Go Program',
        objectives: ['Write, run and build a Go program', 'Understand package main and func main'],
        theory: `Every Go file begins with a package declaration. A program that produces an executable must have a package named \`main\` containing a function named \`main\`, which is the entry point the runtime calls. Any other package name produces a library that cannot be run directly.
Imports come next, in parentheses when there is more than one. Go is strict here in a way that catches beginners: importing a package you do not use is a compile error, not a warning. This keeps dependency lists honest, and goimports removes unused imports for you automatically on save.
There are two commands you will use constantly. \`go run main.go\` compiles to a temporary location and executes immediately, which is what you want during development. \`go build\` produces a real binary in your directory that you can copy and run anywhere with the same OS and architecture — this is the single-file deployment story that makes Go so easy to ship.
One syntax rule worth internalising immediately: the opening brace must be on the same line as the function declaration. Go's parser inserts semicolons automatically at line ends, so putting the brace on its own line breaks the program in a way the error message does not always make obvious.`,
        syntax: `package main

import (
    "fmt"
    "os"
)

func main() {
    name := "World"
    // os.Args[0] is the program path, so real arguments start at index 1.
    if len(os.Args) > 1 {
        name = os.Args[1]
    }
    fmt.Printf("Hello, %s!\n", name)
}`,
        codeExample: `# Run directly during development — compiles to a temp dir, then executes
go run main.go
go run main.go Aditi

# Build a real, self-contained binary for deployment
go build -o hello main.go
./hello Aditi

# Cross-compile for another platform from your laptop
GOOS=linux GOARCH=amd64 go build -o hello-linux main.go`,
        codeOutput: `Hello, World!
Hello, Aditi!
Hello, Aditi!`,
        mistakes: [
            'Putting the opening brace on its own line. Automatic semicolon insertion breaks the program.',
            'Leaving an unused import in the file — that is a compile error in Go, not a warning.',
            'Naming the package something other than `main` and then wondering why `go run` refuses to produce an executable.',
        ],
        takeaways: [
            'An executable needs `package main` and `func main()`.',
            '`go run` for development, `go build` for a deployable single binary.',
            'Unused imports fail the build; the brace must stay on the declaration line.',
        ],
      }
    ],
    quiz: [
      { id: 1, question: 'Which command compiles and runs a Go file directly?', options: ['go run', 'go build', 'go start', 'go exec'], correctAnswer: 'go run' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Print two lines: a greeting with your own name, then the language you are learning. Use one fmt.Println for each line.',
          language: 'go',
          starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // TODO: replace World with your name\n    fmt.Println("Hello, World!")\n\n    // TODO: print a second line: I am learning Go\n}',
          examples: [
            { input: 'None', output: 'Hello, Aditi!\nI am learning Go', explanation: 'Use your own name on the first line.' }
          ]
        }
      ]
    }
  },
  m2: {
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
      { id: 1, question: 'Which format verb prints a variable type in fmt.Printf?', options: ['%T', '%v', '%s', '%d'], correctAnswer: '%T' }
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
  },
  m3: {
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
      { id: 1, question: 'What is the only looping keyword in Go?', options: ['for', 'while', 'do', 'each'], correctAnswer: 'for' }
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
  },
  m4: {
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
      { id: 1, question: 'How do you ignore a returned value from a function?', options: ['Using _ blank identifier', 'Using null', 'Using nil', 'By leaving it empty'], correctAnswer: 'Using _ blank identifier' }
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
  },
  m5: {
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
      { id: 1, question: 'Which built-in function increases a slice size?', options: ['append', 'push', 'extend', 'add'], correctAnswer: 'append' }
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
  },
  m6: {
    id: 'm6',
    title: 'MODULE 6: STRUCTS & METHODS',
    overview: 'Learn user defined types, defining receiver methods, embedded structs and JSON parsing tags.',
    outcomes: ['Model complex entities', 'Marshal objects to JSON strings'],
    lessons: [
      { id: 'm6-l1', title: 'Lesson 6.1 Structs', objectives: ['Define struct entities'], theory: 'Structs are user-defined types that group related fields together. Fields must be capitalized to make them public (exported) so they can be accessed from outside their home package.', syntax: `package main
import "fmt"

type Course struct {
    Title  string
    ID     string
    Rating float64
}

func main() {
    c := Course{Title: "Golang", ID: "4", Rating: 4.9}
    fmt.Println(c.Title)
}`, takeaways: ['Structs group related fields into a single custom type.', 'Capitalize field names to export them for external package access.'] },
      { id: 'm6-l2', title: 'Lesson 6.2 Methods', objectives: ['Receiver methods'], theory: 'Go supports methods on struct types. Methods are functions declared with a receiver argument before the function name. Use pointer receivers (*Type) to modify struct fields or avoid copying data on method calls.', syntax: `package main
import "fmt"

type Counter struct {
    Count int
}

func (c *Counter) Increment() {
    c.Count++
}

func main() {
    cnt := Counter{Count: 0}
    cnt.Increment()
    fmt.Println(cnt.Count)
}`, takeaways: ['Define receiver methods to associate behavior with structs.', 'Use pointer receivers to modify struct data.'] },
      { id: 'm6-l3', title: 'Lesson 6.3 Embedded Structs', objectives: ['Composition modeling'], theory: 'Go supports embedded fields inside structs. Declaring a field type without an explicit field name embeds its fields directly, promoting them to the parent struct.', syntax: `package main
import "fmt"

type Person struct {
    Name string
}

type Employee struct {
    Person
    Salary int
}

func main() {
    e := Employee{Person: Person{Name: "Suhani"}, Salary: 85000}
    fmt.Println(e.Name) // Field Promotion
}`, takeaways: ['Embedding fields promotes them directly to the parent struct.', 'Promoted fields can be accessed directly without naming the embedded struct.'] },
      { id: 'm6-l4', title: 'Lesson 6.4 Composition', objectives: ['OOP modeling'], theory: 'Go does not support classical object-oriented class inheritance. Instead, it favors composition—building complex types by combining smaller, specialized structs.', takeaways: ['Go uses composition instead of class-based inheritance.', 'Composition keeps code decoupled and flexible.'] },
      { id: 'm6-l5', title: 'Lesson 6.5 JSON Tags', objectives: ['JSON mapping'], theory: 'JSON tags allow you to customize how struct fields are named when marshaled into JSON strings. Define tags in backticks next to the field types.', syntax: `package main
import (
    "encoding/json"
    "fmt"
)

type User struct {
    Username string \`json:"username"\`
    Email    string \`json:"user_email"\`
}

func main() {
    u := User{Username: "suhani", Email: "suhani@yopmail.com"}
    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}`, takeaways: ['JSON tags customize field names during JSON conversions.', 'Tags are declared using backticks next to field declarations.'] },
      { id: 'm6-l6', title: 'Lesson 6.6 Best Practices', objectives: ['Efficient structs allocation'], theory: 'When designing structs, order fields from largest to smallest type. This helps Go optimize struct memory usage by minimizing padding bytes.', takeaways: ['Order struct fields from largest to smallest type to reduce padding.', 'Pass large structs as pointers to avoid copy overhead.'] }
    ],
    quiz: [
      { id: 1, question: 'How does Go export a struct field for external package access?', options: ['Capitalize the first letter', 'Prefix with export keyword', 'Prefix with public keyword', 'Define JSON tags'], correctAnswer: 'Capitalize the first letter' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Define a Book struct with Title, Author and Pages. Add a Summary() string method with a value receiver that formats the details, then marshal the struct to JSON with encoding/json. Note that struct fields must be exported (capitalised) or encoding/json will silently omit them.',
          language: 'go',
          starterCode: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Book struct {\n    // Exported fields with json tags: title, author, pages\n}\n\n// Summary returns: "<Title> by <Author> (<Pages> pages)"\nfunc (b Book) Summary() string {\n    return ""\n}\n\nfunc main() {\n    b := Book{}\n    fmt.Println(b.Summary())\n\n    data, err := json.Marshal(b)\n    if err != nil {\n        fmt.Println("marshal error:", err)\n        return\n    }\n    fmt.Println(string(data))\n}',
          examples: [
            { input: 'Book{Title: "The Go Programming Language", Author: "Donovan", Pages: 380}', output: 'The Go Programming Language by Donovan (380 pages)\n{"title":"The Go Programming Language","author":"Donovan","pages":380}' }
          ]
        }
      ]
    }
  },
  m7: {
    id: 'm7',
    title: 'MODULE 7: INTERFACES',
    overview: 'Learn interface design, empty interfaces, type assertion, type switches, and polymorphism.',
    outcomes: ['Design decoupled code layouts', 'Handle variable payload objects'],
    lessons: [
      { id: 'm7-l1', title: 'Lesson 7.1 Introduction to Interfaces', objectives: ['Decoupled specs'], theory: 'Interfaces in Go define a set of method signatures. They decouple function specifications from their concrete implementations, enabling polymorphism. An interface value is internally represented as a two-word pair: a pointer to information about the concrete type (the dynamic type) and a pointer to the actual data (the dynamic value). Under the hood, this metadata mapping is handled by the Go compiler at runtime, allowing functions to interact with abstract interfaces without needing to know the concrete type in advance. This structural typing pattern allows for clean and flexible codebases.', takeaways: ['Interfaces specify behavior without implementation.', 'Promotes decoupling in software architectures.', 'Interfaces are represented internally as a two-word pair (type, value).'] },
      { id: 'm7-l2', title: 'Lesson 7.2 Implementing Interfaces', objectives: ['Implicit implementation'], theory: 'Go interfaces are implemented implicitly. A type implements an interface simply by implementing all of its methods. There is no implements keyword in Go. This design simplifies dependency injection and structural modularity, as codebases can define interfaces in the package where they are consumed, rather than where the concrete types are defined.', syntax: `package main
import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct{}

func (d Dog) Speak() string {
    return "Woof!"
}

func main() {
    var s Speaker = Dog{}
    fmt.Println(s.Speak())
}`, takeaways: ['Implicit satisfaction simplifies dependency injection.', 'No explicit implements keyword is used.', 'Interfaces should be defined close to their usage point.'] },
      { id: 'm7-l3', title: 'Lesson 7.3 Empty Interface', objectives: ['Generic interfaces'], theory: 'The empty interface (interface{} or "any") defines zero methods. Because of this, any type in Go satisfies the empty interface, allowing it to hold values of any type. Behind the scenes, Go packages compile empty interface assignments by boxing the dynamic type info and data pointer. While this provides maximum flexibility, querying empty interfaces introduces minor runtime overhead due to type reflections.', syntax: `package main
import "fmt"

func printAnything(val interface{}) {
    fmt.Println(val)
}

func main() {
    printAnything(42)
    printAnything("Hello")
}`, takeaways: ['The empty interface (any) satisfies all Go types.', 'Use any (empty interface) to handle variable, unknown inputs.', 'Overuse of empty interfaces can bypass static type checking benefits.'] },
      { id: 'm7-l4', title: 'Lesson 7.4 Type Assertions', objectives: ['Unwrap interfaces'], theory: 'Type assertions retrieve the underlying concrete value from an interface. Use the two-value syntax (val, ok := i.(Type)) to check if the assertion succeeded and avoid runtime panics. A single-value assertion (val := i.(Type)) will crash the program with a panic if the underlying type does not match.', syntax: `package main
import "fmt"

func main() {
    var val interface{} = "Suhani"
    str, ok := val.(string)
    fmt.Println(str, ok)
}`, takeaways: ['Type assertions extract concrete values from interfaces.', 'Always use the two-value syntax to check assertions safely.', 'Single-value assertions will trigger a runtime panic on mismatch.'] },
      { id: 'm7-l5', title: 'Lesson 7.5 Type Switches', objectives: ['Branching types checks'], theory: 'Type switches let you check an interface variable\'s concrete type against multiple types in a switch block. This pattern acts as a cleaner alternative to writing multiple if-else type assertions.', syntax: `package main
import "fmt"

func inspectType(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Println("Int", v)
    case string:
        fmt.Println("String", v)
    }
}

func main() {
    inspectType(100)
}`, takeaways: ['Type switches match concrete types in a switch block.', 'Use i.(type) syntax inside type switch statements.', 'Ideal for routing heterogeneous data payloads.'] },
      { id: 'm7-l6', title: 'Lesson 7.6 Real-World Examples', objectives: ['Mocking and Testing'], theory: 'Interfaces are highly useful for writing mock implementations in tests. For example, mock database interfaces to run unit tests without connecting to a live database. This allows you to verify business logic and error paths in isolation without side effects.', takeaways: ['Interfaces make mocking external services simple.', 'Enables parallel, isolated testing of business logic.', 'Avoid mocking third-party libraries; instead, mock your own domain interfaces.'] }
    ],
    quiz: [
      { id: 1, question: 'Which keyword implements interfaces in Go?', options: ['None (implicit)', 'implements', 'interface', 'struct'], correctAnswer: 'None (implicit)' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Declare a PaymentGateway interface with Pay(amount float64) string, then implement it with CreditCard and PayPal types. Range over a []PaymentGateway and call Pay on each. Go interfaces are satisfied implicitly — there is no "implements" keyword.',
          language: 'go',
          starterCode: 'package main\n\nimport "fmt"\n\ntype PaymentGateway interface {\n    Pay(amount float64) string\n}\n\ntype CreditCard struct{ Holder string }\ntype PayPal struct{ Email string }\n\n// TODO: return "Charged <amount> to card held by <Holder>"\nfunc (c CreditCard) Pay(amount float64) string {\n    return ""\n}\n\n// TODO: return "Charged <amount> via PayPal account <Email>"\nfunc (p PayPal) Pay(amount float64) string {\n    return ""\n}\n\nfunc main() {\n    gateways := []PaymentGateway{\n        CreditCard{Holder: "Aditi"},\n        PayPal{Email: "aditi@example.com"},\n    }\n    for _, g := range gateways {\n        fmt.Println(g.Pay(499.50))\n    }\n}',
          examples: [
            { input: 'CreditCard{Holder: "Aditi"}, PayPal{Email: "aditi@example.com"}', output: 'Charged 499.50 to card held by Aditi\nCharged 499.50 via PayPal account aditi@example.com' }
          ]
        }
      ]
    }
  },
  m8: {
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
      { id: 1, question: 'In what order do deferred functions execute?', options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random', 'Parallel'], correctAnswer: 'LIFO (Last In First Out)' }
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
  },
  m9: {
    id: 'm9',
    title: 'MODULE 9: PACKAGES & MODULES',
    overview: 'Learn dependency management, package configurations, module builds and import structures.',
    outcomes: ['Structure clean workspace codebases', 'Initialize and import custom modules'],
    lessons: [
      { id: 'm9-l1', title: 'Lesson 9.1 Packages', objectives: ['Understand packages scope'], theory: 'Go projects are organized into packages. Every Go file must declare its package name at the top. Variables, functions, and types are shared across all files in the same package.', takeaways: ['Go files in the same folder must belong to the same package.', 'Package names usually match their folder name.'] },
      { id: 'm9-l2', title: 'Lesson 9.2 Go Modules', objectives: ['Initialize modules dependency'], theory: 'Initialize Go modules using the `go mod init <name>` command. This creates a go.mod file to track and manage dependencies.', takeaways: ['Create projects using: go mod init <project_name>', 'The go.mod file tracks package dependencies.'] },
      { id: 'm9-l3', title: 'Lesson 9.3 Importing Packages', objectives: ['External packages import'], theory: 'Import standard library packages or third-party libraries (e.g. from GitHub). Go automatically downloads imported packages when you run `go mod tidy`.', takeaways: ['Import standard or third-party packages in the import block.', 'Use go mod tidy to clean up unused dependencies.'] },
      { id: 'm9-l4', title: 'Lesson 9.4 Creating Packages', objectives: ['Write packages code'], theory: 'Create package directories containing Go files. Export functions and types from these packages by starting their names with a capital letter.', takeaways: ['Capitalize identifiers to export them to other packages.', 'Lowercase identifiers remain private to their package.'] },
      { id: 'm9-l5', title: 'Lesson 9.5 Package Organization', objectives: ['Refactoring architecture layouts'], theory: 'Organize projects using standard Go structures: place main executables in a cmd/ directory, and keep internal business logic in an internal/ directory.', takeaways: ['Use cmd/ folders to organize main entry-point scripts.', 'Keep package dependencies tidy and clean.'] }
    ],
    quiz: [
      { id: 1, question: 'Which file lists the direct dependencies of a Go project?', options: ['go.mod', 'go.sum', 'package.json', 'go.deps'], correctAnswer: 'go.mod' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write the exported API a calculator package would expose: Add, Sub, Mul, and Div returning (float64, error) for divide-by-zero. Only capitalised identifiers are visible outside a package, so the unexported round helper stays internal. The sandbox runs a single file, so write it as one file and treat the capitalisation rules as if these lived in their own package.',
          language: 'go',
          starterCode: 'package main\n\nimport "fmt"\n\n// Exported — callable as calculator.Add from another package.\nfunc Add(a, b float64) float64 { return 0 }\nfunc Sub(a, b float64) float64 { return 0 }\nfunc Mul(a, b float64) float64 { return 0 }\n\n// Div returns an error instead of panicking on a zero divisor.\nfunc Div(a, b float64) (float64, error) {\n    return 0, nil\n}\n\n// unexported: invisible outside this package\nfunc round(v float64) float64 { return v }\n\nfunc main() {\n    fmt.Println(Add(2, 3), Sub(9, 4), Mul(3, 4))\n    fmt.Println(Div(10, 4))\n    fmt.Println(Div(1, 0))\n}',
          examples: [
            { input: 'Add(2,3), Sub(9,4), Mul(3,4), Div(10,4), Div(1,0)', output: '5 5 12\n2.5 <nil>\n0 division by zero' }
          ]
        },
        {
          kind: 'code',
          prompt: 'Write the go.mod file that would publish this calculator as a reusable module named github.com/yourname/calculator targeting Go 1.22.',
          language: 'go',
          starterCode: '// go.mod\n\n',
          runnable: false,
          examples: [
            { input: 'None', output: 'module github.com/yourname/calculator\n\ngo 1.22' }
          ]
        }
      ]
    }
  },
  m10: {
    id: 'm10',
    title: 'MODULE 10: FILE HANDLING',
    overview: 'Learn reading files, writing file streams, parsing JSON/CSV data streams, and logging.',
    outcomes: ['Parse local CSV data logs', 'Write and read JSON configuration profiles'],
    lessons: [
      { id: 'm10-l1', title: 'Lesson 10.1 Reading Files', objectives: ['Read file contents'], theory: 'Use os.ReadFile() to read entire files into memory, or bufio.NewReader() to read files incrementally as streams.', takeaways: ['Use os.ReadFile() to read small files quickly.', 'Always close file descriptors using defer.'] },
      { id: 'm10-l2', title: 'Lesson 10.2 Writing Files', objectives: ['Write file contents'], theory: 'Use os.WriteFile() to write byte slices to disk, or os.Create() and WriteString() to write streams.', takeaways: ['Write files using: os.WriteFile(path, data, permissions)', 'Flush buffered writers to ensure all data is written.'] },
      { id: 'm10-l3', title: 'Lesson 10.3 Directories', objectives: ['Manage directories'], theory: 'Manage directory structures using os.MkdirAll() to create nested folders, and os.ReadDir() to list folder contents.', takeaways: ['Create nested directories using: os.MkdirAll()', 'Check directory write permissions.'] },
      { id: 'm10-l4', title: 'Lesson 10.4 JSON Files', objectives: ['Encode/Decode JSON streams'], theory: 'Convert Go structs to JSON using json.Marshal(), and parse JSON strings back into structs using json.Unmarshal().', takeaways: ['Convert structs to JSON using: json.Marshal()', 'Parse JSON strings into structs using: json.Unmarshal()'] },
      { id: 'm10-l5', title: 'Lesson 10.5 CSV Files', objectives: ['Read CSV datasets'], theory: 'Read and write comma-separated files using the built-in encoding/csv package.', takeaways: ['Use encoding/csv to parse table datasets.', 'Check fields per record limits.'] },
      { id: 'm10-l6', title: 'Lesson 10.6 Logging', objectives: ['Write logs'], theory: 'Log events to stdout or files using the standard log package, or use structured loggers like zap to output logs in JSON format.', takeaways: ['Structured logging is essential for production tracing.', 'Zap provides high-performance logging capabilities.'] }
    ],
    quiz: [
      { id: 1, question: 'Which package is used to read/write JSON files in Go?', options: ['encoding/json', 'text/json', 'os/json', 'net/json'], correctAnswer: 'encoding/json' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Read a CSV user list from standard input (header row: name,email,age) and emit the equivalent JSON array. Use encoding/csv to parse and encoding/json to marshal. Skip the header row, and convert age to an int with strconv.Atoi so it serialises as a number rather than a string.',
          language: 'go',
          starterCode: 'package main\n\nimport (\n    "encoding/csv"\n    "encoding/json"\n    "fmt"\n    "os"\n)\n\ntype User struct {\n    Name  string `json:"name"`\n    Email string `json:"email"`\n    Age   int    `json:"age"`\n}\n\nfunc main() {\n    records, err := csv.NewReader(os.Stdin).ReadAll()\n    if err != nil {\n        fmt.Println("read error:", err)\n        return\n    }\n\n    users := []User{}\n    for _, rec := range records[1:] { // records[0] is the header row\n        // TODO: convert rec[2] with strconv.Atoi and set Age\n        users = append(users, User{Name: rec[0], Email: rec[1]})\n    }\n\n    data, err := json.Marshal(users)\n    if err != nil {\n        fmt.Println("marshal error:", err)\n        return\n    }\n    fmt.Println(string(data))\n}',
          fixture: 'name,email,age\nAditi,aditi@example.com,24\nRohan,rohan@example.com,31',
          examples: [
            { input: 'name,email,age\nAditi,aditi@example.com,24\nRohan,rohan@example.com,31', output: '[{"name":"Aditi","email":"aditi@example.com","age":24},{"name":"Rohan","email":"rohan@example.com","age":31}]' }
          ]
        }
      ]
    }
  },
  m11: {
    id: 'm11',
    title: 'MODULE 11: CONCURRENCY',
    overview: 'Master goroutines, channel communications, selection loops, WaitGroups, Mutex locks, and Context constraints.',
    outcomes: ['Construct thread-safe asynchronous workers', 'Manage timeouts using Go Context package'],
    lessons: [
      { id: 'm11-l1', title: 'Lesson 11.1 Introduction to Goroutines', objectives: ['Launch asynchronous threads'], theory: 'A goroutine is a lightweight execution thread managed entirely by the Go runtime scheduler, not the host operating system. When a Go program starts, the runtime automatically spins up a scheduler that runs on top of the physical CPU cores. This scheduler implements an M:N multiplexing model, which maps M goroutines onto N operating system threads. Unlike standard OS threads which require a fixed stack space allocation of 1MB to 2MB, goroutines initialize with a tiny stack allocation of just 2KB. This stack grows and shrinks dynamically in response to call frames requirements. This efficiency allows you to run hundreds of thousands of concurrent goroutines on a single computer without encountering memory exhaustion.', takeaways: ['Goroutines are cheap to initialize and execute.', 'Multiplexes thousands of execution paths over OS threads.'] },
      { id: 'm11-l2', title: 'Lesson 11.2 Channels', objectives: ['Safe threads communications'], theory: 'Channels are typed conduits that let you send and receive values between goroutines safely. They prevent race conditions by design without requiring manual Mutex locking protocols. By default, unbuffered channels block execution on both sides: a send operation blocks the sender until a receiver is ready to read from the channel, and a receive operation blocks the receiver until a sender writes data to it. This blocking behavior provides a natural synchronization point for concurrent processes.', syntax: `package main
import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "ping"
    }()
    fmt.Println(<-ch)
}`, takeaways: ['Send values to channels using the arrow operator (<-).', 'Unbuffered channel sends and receives block until both sender and receiver are ready.'] },
      { id: 'm11-l3', title: 'Lesson 11.3 Buffered Channels', objectives: ['Non-blocking queue streams'], theory: 'Buffered channels have a queue capacity. Sends to a buffered channel are non-blocking until the buffer is full.', syntax: `package main
import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2
    fmt.Println(<-ch, <-ch)
}`, takeaways: ['Initialize buffered channels with a capacity: make(chan Type, capacity)', 'Buffered channel sends only block when the queue is full.'] },
      { id: 'm11-l4', title: 'Lesson 11.4 Select Statement', objectives: ['Multi-channel multiplexing'], theory: 'The select statement lets a goroutine wait on multiple communication channels. Select blocks until one of its cases is ready to execute.', syntax: `package main
import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    go func() {
        time.Sleep(time.Millisecond)
        c1 <- "one"
    }()
    select {
    case msg := <-c1:
        fmt.Println(msg)
    case <-time.After(time.Second):
        fmt.Println("Timeout")
    }
}`, takeaways: ['Select multiplexes communications across multiple channels.', 'Use time.After to implement channel timeouts.'] },
      { id: 'm11-l5', title: 'Lesson 11.5 WaitGroup', objectives: ['Wait concurrent threads completion'], theory: 'Use sync.WaitGroup to wait for a collection of goroutines to finish. Call Add() to set the count, Done() when a goroutine completes, and Wait() to block until the count reaches zero.', syntax: `package main
import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Done working")
    }()
    wg.Wait()
}`, takeaways: ['Use sync.WaitGroup to wait for goroutines to finish.', 'Always pass WaitGroups to functions as pointer references.'] },
      { id: 'm11-l6', title: 'Lesson 11.6 Mutex', objectives: ['Prevent data race conditions'], theory: 'Use sync.Mutex to protect shared memory locations from data races by ensuring only one goroutine can access the critical section at a time.', syntax: `package main
import (
    "fmt"
    "sync"
)

type SafeBox struct {
    mu sync.Mutex
    val int
}

func (b *SafeBox) Add(x int) {
    b.mu.Lock()
    defer b.mu.Unlock()
    b.val += x
}

func main() {
    box := SafeBox{}
    box.Add(10)
    fmt.Println(box.val)
}`, takeaways: ['Use sync.Mutex to guard shared variables.', 'Run go build -race to detect data races in your binary.'] },
      { id: 'm11-l7', title: 'Lesson 11.7 Context Package', objectives: ['Cancel dead-locks'], theory: 'The context package propagates deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines.', syntax: `package main
import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond)
    defer cancel()
    select {
    case <-time.After(time.Second):
        fmt.Println("Finished")
    case <-ctx.Done():
        fmt.Println("Cancelled:", ctx.Err())
    }
}`, takeaways: ['Use context to cancel long-running operations.', 'Always call the cancel() function to release context resources.'] },
      { id: 'm11-l8', title: 'Lesson 11.8 Worker Pools', objectives: ['Write throttled concurrent workers'], theory: 'Design worker pools to limit resources. Spawn a fixed number of worker goroutines that process tasks read from a shared work channel.', takeaways: ['Worker pools limit concurrent resource usage.', 'Prevents CPU and memory spikes.'] }
    ],
    quiz: [
      { id: 1, question: 'Which command audits a Go binary for memory race conditions?', options: ['go run -race', 'go test -speed', 'go race', 'go verify'], correctAnswer: 'go run -race' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Implement a worker pool: 3 workers pull job ids off a jobs channel, square each one, and send the result to a results channel. Use sync.WaitGroup to know when every worker has finished, and close the results channel before ranging over it. Because workers interleave, collect the results and sort them before printing so the output is deterministic.',
          language: 'go',
          starterCode: 'package main\n\nimport (\n    "fmt"\n    "sort"\n    "sync"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    for j := range jobs {\n        // TODO: send the square of j to results\n        _ = j\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 10)\n    results := make(chan int, 10)\n    var wg sync.WaitGroup\n\n    for w := 1; w <= 3; w++ {\n        wg.Add(1)\n        go worker(w, jobs, results, &wg)\n    }\n\n    // TODO: send jobs 1..9 into the jobs channel\n\n    close(jobs)\n    wg.Wait()\n    close(results)\n\n    collected := []int{}\n    for r := range results {\n        collected = append(collected, r)\n    }\n    sort.Ints(collected)\n    fmt.Println(collected)\n}',
          examples: [
            { input: 'jobs 1..9 across 3 workers', output: '[1 4 9 16 25 36 49 64 81]', explanation: 'Sorting hides the nondeterministic completion order of the workers.' }
          ]
        }
      ]
    }
  },
  m12: {
    id: 'm12',
    title: 'MODULE 12: TESTING',
    overview: 'Learn unit testing, writing table-driven suites, benchmark measurements, and mock assertions.',
    outcomes: ['Construct automated test suites', 'Measure memory/speed benchmarks'],
    lessons: [
      { id: 'm12-l1', title: 'Lesson 12.1 Introduction to Testing', objectives: ['Go testing package specs'], theory: 'Go includes a built-in testing framework. Test files must end with the `_test.go` suffix, and testing functions must start with the `Test` prefix.', takeaways: ['Run test suites using: go test', 'Test files must end in _test.go.'] },
      { id: 'm12-l2', title: 'Lesson 12.2 Unit Testing', objectives: ['Write unit assertions'], theory: 'Write unit tests to assert code behavior using the standard testing library. Call `t.Errorf()` to report failures without stopping the test run.', syntax: `package main
import "testing"

func Sum(a, b int) int { return a + b }

func TestSum(t *testing.T) {
    if Sum(2, 3) != 5 {
        t.Errorf("Calculation failed")
    }
}`, takeaways: ['Test functions accept a *testing.T parameter.', 'Use t.Errorf() to report test failures.'] },
      { id: 'm12-l3', title: 'Lesson 12.3 Table-Driven Tests', objectives: ['Design matrix inputs'], theory: 'Table-driven tests define a slice of test cases (inputs and expected outputs) and loop through them to run assertions. This is the idiomatic way to write tests in Go.', syntax: `package main
import "testing"

func TestSumTable(t *testing.T) {
    cases := []struct {
        a, b, expected int
    }{
        {1, 1, 2},
        {2, 2, 4},
    }
    for _, tc := range cases {
        if res := tc.a + tc.b; res != tc.expected {
            t.Errorf("Fail")
        }
    }
}`, takeaways: ['Table-driven tests keep test logic clean and reusable.', 'Loop through case slices to run tests against different inputs.'] },
      { id: 'm12-l4', title: 'Lesson 12.4 Benchmark Testing', objectives: ['Test throughput speed'], theory: 'Write benchmark functions starting with the `Benchmark` prefix to measure your code\'s execution speed and memory allocations.', syntax: `package main
import "testing"

func BenchmarkLoop(b *testing.B) {
    for i := 0; i < b.N; i++ {
        // execute method
    }
}`, takeaways: ['Run benchmarks using the -bench flag: go test -bench=.', 'Benchmark functions accept a *testing.B parameter.'] },
      { id: 'm12-l5', title: 'Lesson 12.5 Mocking Basics', objectives: ['Mock interface responses'], theory: 'Mock external services by defining mock structs that implement the same interface. This lets you test business logic in isolation without making real network or database calls.', takeaways: ['Use interfaces to mock external services.', 'Mocking decouples tests from network and database environments.'] }
    ],
    quiz: [
      { id: 1, question: 'What suffix must Go test filenames have?', options: ['_test.go', '.test.go', '_spec.go', '.spec.go'], correctAnswer: '_test.go' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write a table-driven test for a password hashing helper. Define a slice of anonymous structs holding the case name, input and expectation, then loop over it calling t.Run(tc.name, ...) so each case reports separately. Note this file is run with "go test", not "go run", so the Run button is unavailable here.',
          language: 'go',
          starterCode: 'package auth\n\nimport "testing"\n\n// HashPassword returns a hash, and an error for an empty password.\n// Verify reports whether a password matches a hash.\n\nfunc TestHashPassword(t *testing.T) {\n    tests := []struct {\n        name     string\n        password string\n        wantErr  bool\n    }{\n        // Add cases: a normal password, an empty password, a very long one\n    }\n\n    for _, tc := range tests {\n        t.Run(tc.name, func(t *testing.T) {\n            // Call HashPassword, check the error against tc.wantErr,\n            // then assert Verify(tc.password, hash) is true.\n        })\n    }\n}',
          runnable: false,
          examples: [
            { input: 'go test ./... -run TestHashPassword -v', output: '=== RUN   TestHashPassword/valid_password\n--- PASS: TestHashPassword/valid_password\n=== RUN   TestHashPassword/empty_password\n--- PASS: TestHashPassword/empty_password\nPASS' }
          ]
        }
      ]
    }
  },
  m13: {
    id: 'm13',
    title: 'MODULE 13: HTTP & REST APIs',
    overview: 'Learn net/http servers config, routing, request bindings, middleware wrappers, and version patterns.',
    outcomes: ['Serve REST APIs on port endpoints', 'Decrypt request body payloads'],
    lessons: [
      { id: 'm13-l1', title: 'Lesson 13.1 HTTP Package', objectives: ['Build net/http connections'], theory: 'Go\'s standard library includes a production-ready HTTP server inside the net/http package. It handles routing and serves incoming TCP requests efficiently.', takeaways: ['Use net/http to build web servers without external frameworks.', 'Handles routing and processes request payloads.'] },
      { id: 'm13-l2', title: 'Lesson 13.2 Web Server', objectives: ['Listen on TCP ports'], theory: 'Configure port mappings and start HTTP servers using the http.ListenAndServe() function.', syntax: `package main
import "net/http"

func main() {
    http.ListenAndServe(":8080", nil)
}`, takeaways: ['http.ListenAndServe starts the HTTP server.', 'Port allocations are specified as host:port strings.'] },
      { id: 'm13-l3', title: 'Lesson 13.3 Routing', objectives: ['Match request URLs'], theory: 'Register route paths and associate them with handler functions using http.HandleFunc().', syntax: `package main
import (
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello")
}

func main() {
    http.HandleFunc("/hello", hello)
    http.ListenAndServe(":8080", nil)
}`, takeaways: ['Use http.HandleFunc() to map paths to handlers.', 'Handlers accept ResponseWriter and Request parameters.'] },
      { id: 'm13-l4', title: 'Lesson 13.4 Request Handling', objectives: ['Read request inputs'], theory: 'Read incoming request methods, query parameters, HTTP headers, and body payloads from the http.Request object.', takeaways: ['Read request methods using: r.Method', 'Read query parameters from the request object.'] },
      { id: 'm13-l5', title: 'Lesson 13.5 JSON APIs', objectives: ['Write JSON APIs response'], theory: 'Build JSON APIs by setting the Content-Type header to application/json and serializing response structs using json.NewEncoder().', syntax: `package main
import (
    "encoding/json"
    "net/http"
)

func getProfile(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"name": "Suhani"})
}`, takeaways: ['Set the Content-Type header to application/json.', 'Use json.NewEncoder() to write JSON responses directly to the client.'] },
      { id: 'm13-l6', title: 'Lesson 13.6 Middleware', objectives: ['Intercept requests'], theory: 'Write HTTP middleware functions that wrap handlers. Use them to log requests, authenticate sessions, or inject CORS headers before running the main handler logic.', syntax: `func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Log request info
        next.ServeHTTP(w, r)
    })
}`, takeaways: ['Middleware wraps handlers to intercept incoming requests.', 'Promotes reusable request processing patterns.'] },
      { id: 'm13-l7', title: 'Lesson 13.7 API Versioning', objectives: ['Define version paths'], theory: 'Version your API endpoints using path prefixes like `/api/v1` to prevent breaking changes for existing clients when updates are deployed.', takeaways: ['Scope endpoints under versioned prefixes (e.g. /api/v1).', 'Prevents breaking client integrations.'] }
    ],
    quiz: [
      { id: 1, question: 'Which built-in package serves HTTP routers in Go?', options: ['net/http', 'http', 'web', 'net/web'], correctAnswer: 'net/http' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build an HTTP server exposing GET /time that responds with the current time as JSON: {"unix":...,"iso":...,"zone":...}. Set the Content-Type header to application/json before writing the body — once you write, the headers are already flushed. The Run button is off here because a server blocks rather than exiting.',
          language: 'go',
          starterCode: 'package main\n\nimport (\n    "encoding/json"\n    "net/http"\n    "time"\n)\n\ntype timeResponse struct {\n    Unix int64  `json:"unix"`\n    ISO  string `json:"iso"`\n    Zone string `json:"zone"`\n}\n\nfunc timeHandler(w http.ResponseWriter, r *http.Request) {\n    // Set Content-Type, build timeResponse from time.Now(), encode it\n    _ = json.NewEncoder\n    _ = time.Now\n}\n\nfunc main() {\n    http.HandleFunc("/time", timeHandler)\n    http.ListenAndServe(":8080", nil)\n}',
          runnable: false,
          examples: [
            { input: 'GET /time', output: '{"unix":1786000000,"iso":"2026-08-13T10:04:12+05:30","zone":"IST"}' }
          ]
        }
      ]
    }
  },
  m14: {
    id: 'm14',
    title: 'MODULE 14: DATABASES',
    overview: 'Learn SQL connections, executing CRUD statements, managing transactions, running migrations, and repository pattern.',
    outcomes: ['Connect PostgreSQL connections pool', 'Execute SQL transactions rollback'],
    lessons: [
      { id: 'm14-l1', title: 'Lesson 14.1 SQL Basics', objectives: ['RDBMS specs'], theory: 'Understand relational database concepts: tables, schemas, primary and foreign keys, joins, and database normalization.', takeaways: ['Key database foundation.', 'Relational databases store structured data rows.'] },
      { id: 'm14-l2', title: 'Lesson 14.2 PostgreSQL Setup', objectives: ['Run Postgres container'], theory: 'Provision and configure PostgreSQL database instances inside Docker containers for local development.', takeaways: ['Simplifies environment configuration.', 'Postgres is a powerful open-source database.'] },
      { id: 'm14-l3', title: 'Lesson 14.3 Database Connections', objectives: ['Open connection pool'], theory: 'Open a connection pool to your database using the database/sql package and drivers like pgx.', syntax: `package main
import (
    "database/sql"
    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    db, _ := sql.Open("pgx", "postgres://user:pass@localhost:5432/db")
    defer db.Close()
}`, takeaways: ['Open database connection pools using: sql.Open()', 'The sql.DB object represents a pool of active connections.'] },
      { id: 'm14-l4', title: 'Lesson 14.4 CRUD Operations', objectives: ['Run CRUD queries'], theory: 'Query database rows using QueryRow() for single records and Query() for multiple records. Use Exec() to execute INSERT, UPDATE, and DELETE statements.', syntax: `var name string
err := db.QueryRow("SELECT name FROM users WHERE id = $1", 1).Scan(&name)`, takeaways: ['Query single rows using: db.QueryRow()', 'Always sanitize queries using placeholder parameters ($1) to prevent SQL injection.'] },
      { id: 'm14-l5', title: 'Lesson 14.5 Transactions', objectives: ['Execute SQL transactions'], theory: 'Use database transactions to group multiple database operations. Call db.Begin() to start a transaction, and execute Commit() or Rollback() to persist or discard the changes.', syntax: `tx, _ := db.Begin()
_, err := tx.Exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
if err != nil {
    tx.Rollback()
}
tx.Commit()`, takeaways: ['Transactions ensure atomic execution of multiple database updates.', 'Call tx.Rollback() if an error occurs to discard changes.'] },
      { id: 'm14-l6', title: 'Lesson 14.6 Migrations', objectives: ['Version schema updates'], theory: 'Track database schema changes over time using migration tools like golang-migrate. Migrations let you version database updates alongside your application code.', takeaways: ['Essential for version control.', 'golang-migrate is a popular database schema migration tool.'] },
      { id: 'm14-l7', title: 'Lesson 14.7 Repository Pattern', objectives: ['Isolate database queries'], theory: 'Isolate database queries from your core application logic by defining repository interfaces. This separates data storage concerns from business rules.', takeaways: ['Decouples data access from business logic.', 'Enables mock testing of application services.'] }
    ],
    quiz: [
      { id: 1, question: 'What is the purpose of using query placeholder parameters ($1, ?)?', options: ['To prevent SQL Injection', 'To style query variables', 'To improve search speed', 'To format output values'], correctAnswer: 'To prevent SQL Injection' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write a UserRepository with UpdateProfile using pgx. Pass values as $1/$2 placeholders rather than building the SQL with fmt.Sprintf — that is what prevents SQL injection. Check the command tag\'s RowsAffected so updating a missing user reports an error instead of silently succeeding. Not runnable here: it needs a live Postgres connection.',
          language: 'go',
          starterCode: 'package repository\n\nimport (\n    "context"\n    "fmt"\n\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\ntype UserRepository struct {\n    pool *pgxpool.Pool\n}\n\nfunc (r *UserRepository) UpdateProfile(ctx context.Context, userID, name, bio string) error {\n    // UPDATE users SET name = $1, bio = $2 WHERE id = $3\n    // Use parameter placeholders, then check tag.RowsAffected() == 0\n    _ = fmt.Errorf\n    return nil\n}',
          runnable: false,
          examples: [
            { input: 'UpdateProfile(ctx, "unknown-id", "Aditi", "Backend dev")', output: 'error: no user with id unknown-id' }
          ]
        }
      ]
    }
  },
  m15: {
    id: 'm15',
    title: 'MODULE 15: BUILDING APIS WITH GIN',
    overview: 'Learn Gin framework setup, route groups setup, custom parameter validation, and JWT authentication.',
    outcomes: ['Construct REST APIs using Gin framework', 'Validate body structures using binding tags'],
    lessons: [
      { id: 'm15-l1', title: 'Lesson 15.1 Introduction to Gin', objectives: ['Use Gin framework'], theory: 'Gin is a high-performance web framework for Go. It features a fast Radix tree-based router, built-in JSON rendering, and simple middleware chaining.', takeaways: ['Gin is a popular high-performance web framework.', 'Vastly simplifies API development in Go.'] },
      { id: 'm15-l2', title: 'Lesson 15.2 Project Structure', objectives: ['Organize MVC folders'], theory: 'Organize Gin projects using clean MVC directory structures: place handlers in controllers/, database logic in repositories/, and business rules in services/.', takeaways: ['Keep handler functions thin.', 'Separate transport logic from business services.'] },
      { id: 'm15-l3', title: 'Lesson 15.3 Routing', objectives: ['Define group paths'], theory: 'Group related API endpoints under route groups to manage paths and middleware configurations easily.', syntax: `package main
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    v1 := r.Group("/api/v1")
    {
        v1.GET("/users", func(c *gin.Context) {})
    }
    r.Run()
}`, takeaways: ['Route groups organize related API endpoints.', 'Use v1 := r.Group("/api/v1") to group paths.'] },
      { id: 'm15-l4', title: 'Lesson 15.4 Controllers', objectives: ['Process HTTP requests'], theory: 'Write controller handlers that read requests from the gin.Context object and return JSON responses.', syntax: `func GetUsers(c *gin.Context) {
    c.JSON(200, gin.H{"users": []string{"Suhani"}})
}`, takeaways: ['Controller handlers accept a *gin.Context argument.', 'Use c.JSON() to return JSON payloads to the client.'] },
      { id: 'm15-l5', title: 'Lesson 15.5 Services', objectives: ['Business logic isolation'], theory: 'Keep business rules in a separate service layer, decoupled from your HTTP controllers and database repositories.', takeaways: ['Decouples transport logic from business rules.', 'Improves code reuse and testability.'] },
      { id: 'm15-l6', title: 'Lesson 15.6 Middleware', objectives: ['Gin middleware wrappers'], theory: 'Write custom middleware for Gin using the gin.HandlerFunc type. Use c.Next() to continue execution down the handler chain.', syntax: `func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
    }
}`, takeaways: ['Write Gin middleware using: gin.HandlerFunc', 'Call c.Next() to run the next handler in the execution chain.'] },
      { id: 'm15-l7', title: 'Lesson 15.7 Validation', objectives: ['Validate request inputs'], theory: 'Validate incoming JSON request bodies using struct binding tags (e.g. binding:"required,email"). Gin validates these tags automatically during binding.', syntax: `type RegisterReq struct {
    Email    string \`json:"email" binding:"required,email"\`
    Password string \`json:"password" binding:"required,min=6"\`
}`, takeaways: ['Validate JSON request payloads using binding tags.', 'Returns HTTP 400 automatically if validation fails.'] },
      { id: 'm15-l8', title: 'Lesson 15.8 Authentication', objectives: ['Protect routes'], theory: 'Secure API routes by adding JWT authorization middleware to verify user sessions.', takeaways: ['Intercepts requests to verify access credentials.', 'Protects endpoints from unauthorized access.'] }
    ],
    quiz: [
      { id: 1, question: 'Which tag enforces parameter validation checks in Gin binding structs?', options: ['binding', 'validate', 'json', 'require'], correctAnswer: 'binding' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build a Gin route GET /products supporting ?q= name search and ?max= price filter. Read them with c.Query, treat an absent filter as "no filter" rather than an empty match, and respond with c.JSON. Not runnable here — the sandbox has no network access to fetch the Gin module.',
          language: 'go',
          starterCode: 'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\ntype Product struct {\n    Name  string  `json:"name"`\n    Price float64 `json:"price"`\n}\n\nvar catalog = []Product{\n    {"Mechanical Keyboard", 4999},\n    {"USB-C Cable", 499},\n    {"27in Monitor", 18999},\n}\n\nfunc main() {\n    r := gin.Default()\n\n    r.GET("/products", func(c *gin.Context) {\n        // q := c.Query("q")   — case-insensitive name match, skip when empty\n        // max := c.Query("max") — parse to float, skip when empty\n        // c.JSON(http.StatusOK, filtered)\n    })\n\n    r.Run(":8080")\n}',
          runnable: false,
          examples: [
            { input: 'GET /products?q=cable', output: '[{"name":"USB-C Cable","price":499}]' },
            { input: 'GET /products?max=5000', output: '[{"name":"Mechanical Keyboard","price":4999},{"name":"USB-C Cable","price":499}]' }
          ]
        }
      ]
    }
  },
  m16: {
    id: 'm16',
    title: 'MODULE 16: AUTHENTICATION & SECURITY',
    overview: 'Learn bcrypt password hashing, JWT generation, CORS configurations, and token refresh mechanisms.',
    outcomes: ['Hash passwords using bcrypt algorithm', 'Validate JWT payloads'],
    lessons: [
      { id: 'm16-l1', title: 'Lesson 16.1 Password Hashing', objectives: ['Hash user passwords'], theory: 'Secure user passwords by hashing them with salt algorithms like bcrypt before storing them in your database. Never store raw, plain-text passwords.', syntax: `package main
import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
)

func main() {
    pwd := []byte("securepwd123")
    hash, _ := bcrypt.GenerateFromPassword(pwd, bcrypt.DefaultCost)
    err := bcrypt.CompareHashAndPassword(hash, pwd)
    fmt.Println("Matched:", err == nil)
}`, takeaways: ['Use bcrypt to hash user passwords before database storage.', 'Never store raw, plain-text passwords.'] },
      { id: 'm16-l2', title: 'Lesson 16.2 JWT Authentication', objectives: ['Generate signed JWTs'], theory: 'Handle stateless user sessions using JSON Web Tokens (JWT). Sign tokens using private keys (RS256) or shared secrets (HS256).', takeaways: ['JWTs enable stateless session tracking.', 'Pass tokens in HTTP authorization headers or HTTPOnly cookies.'] },
      { id: 'm16-l3', title: 'Lesson 16.3 Authorization', objectives: ['Check access roles'], theory: 'Implement role-based access control (RBAC) to restrict specific routes to authorized user roles (e.g. admin or student).', takeaways: ['Validates scopes from decoded claims.', 'Ensures users only access authorized paths.'] },
      { id: 'm16-l4', title: 'Lesson 16.4 Refresh Tokens', objectives: ['Handle token lifecycles'], theory: 'Generate long-lived refresh tokens to issue new, short-lived access tokens, limiting exposure risk if an access token is compromised.', takeaways: ['Access tokens should be short-lived.', 'Use refresh tokens to renew access sessions safely.'] },
      { id: 'm16-l5', title: 'Lesson 16.5 API Security', objectives: ['Defensive headers config'], theory: 'Protect your API against common web security risks by configuring rate limiters, CORS policies, and secure HTTP headers.', takeaways: ['Rate limiters protect APIs from denial of service attacks.', 'Configure secure HTTP headers.'] },
      { id: 'm16-l6', title: 'Lesson 16.6 CORS', objectives: ['Configure CORS policies'], theory: 'Configure Cross-Origin Resource Sharing (CORS) rules to control which frontend origins are allowed to request resources from your backend API.', takeaways: ['CORS restricts cross-origin browser requests.', 'Essential for managing client-side browser connections.'] }
    ],
    quiz: [
      { id: 1, question: 'Which algorithm is commonly used for secure password hashing in Go?', options: ['bcrypt', 'md5', 'sha1', 'aes'], correctAnswer: 'bcrypt' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write a login handler that verifies a bcrypt password hash and issues a signed JWT. Compare with bcrypt.CompareHashAndPassword rather than hashing the input and comparing strings — bcrypt salts every hash, so the two never match textually. Return the same generic error for unknown user and wrong password so the response cannot be used to enumerate accounts. Not runnable here: external modules need network access.',
          language: 'go',
          starterCode: 'package auth\n\nimport (\n    "errors"\n    "time"\n\n    "github.com/golang-jwt/jwt/v5"\n    "golang.org/x/crypto/bcrypt"\n)\n\nvar ErrInvalidCredentials = errors.New("invalid email or password")\n\nfunc Login(email, password, storedHash string, secret []byte) (string, error) {\n    // 1. bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(password))\n    //    -> return ErrInvalidCredentials on mismatch\n    // 2. Build claims: sub = email, exp = 24h from now\n    // 3. Sign with jwt.SigningMethodHS256 and return the token string\n    _ = jwt.SigningMethodHS256\n    _ = time.Now\n    _ = bcrypt.CompareHashAndPassword\n    return "", nil\n}',
          runnable: false,
          examples: [
            { input: 'Login("aditi@example.com", "correct-horse", storedHash, secret)', output: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            { input: 'Login("aditi@example.com", "wrong-password", storedHash, secret)', output: 'error: invalid email or password' }
          ]
        }
      ]
    }
  },
  m17: {
    id: 'm17',
    title: 'MODULE 17: MICROSERVICES BASICS',
    overview: 'Learn service communication patterns, gRPC RPC calls, Docker container setups, and message queue connections.',
    outcomes: ['Construct Protobuf service schemas', 'Dockerize backend executables'],
    lessons: [
      { id: 'm17-l1', title: 'Lesson 17.1 What are Microservices?', objectives: ['Decoupled architectures'], theory: 'Split monolithic systems into independent, single-responsibility microservices. Each service runs in its own process and handles a specific business domain.', takeaways: ['Microservices isolate business domains.', 'Simplifies scaling and independent deployments.'] },
      { id: 'm17-l2', title: 'Lesson 17.2 Service Communication', objectives: ['Sync vs Async calls'], theory: 'Connect microservices using synchronous RPC protocols like gRPC, or asynchronous message brokers like NATS, RabbitMQ, and Kafka.', takeaways: ['Sync communication is useful for immediate dependency queries.', 'Async messaging decouples service execution paths.'] },
      { id: 'm17-l3', title: 'Lesson 17.3 gRPC Basics', objectives: ['Configure Protocol Buffers'], theory: 'gRPC is a high-performance RPC framework developed by Google. It uses Protocol Buffers (protobuf) to define service contracts and serialize structured data.', syntax: `syntax = "proto3";
package user;

service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
    string id = 1;
}

message UserResponse {
    string email = 1;
}`, takeaways: ['gRPC uses Protocol Buffers for service definitions.', 'Offers faster serialization and lower latency than REST JSON APIs.'] },
      { id: 'm17-l4', title: 'Lesson 17.4 Message Queues', objectives: ['Publish event notifications'], theory: 'Decouple services using event-driven architectures. Publish events to message brokers like NATS, which routes them to subscribing services.', takeaways: ['Message brokers enable event-driven architectures.', 'Guarantees message delivery across services.'] },
      { id: 'm17-l5', title: 'Lesson 17.5 Dockerizing Services', objectives: ['Write multi-stage Dockerfiles'], theory: 'Containerize Go applications using multi-stage Dockerfiles. Build the Go binary in a builder image, then copy it to a minimal scratch or alpine image for production.', syntax: `# Build Stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Run Stage
FROM alpine:3.18
COPY --from=builder /app/main /main
CMD ["/main"]`, takeaways: ['Multi-stage Dockerfiles build minimal production images.', 'Scratch or alpine base images reduce the container size.'] },
      { id: 'm17-l6', title: 'Lesson 17.6 Service Discovery', objectives: ['Route network addresses'], theory: 'Track and route traffic to dynamically scaled microservice instances using service registries like Consul or Kubernetes DNS.', takeaways: ['Service discovery resolves dynamic IP addresses.', 'Simplifies horizontal service scaling.'] }
    ],
    quiz: [
      { id: 1, question: 'Which serialization format is used by gRPC?', options: ['Protocol Buffers', 'JSON', 'XML', 'YAML'], correctAnswer: 'Protocol Buffers' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write the Protobuf schema for a catalog service: a CatalogService with GetProduct and ListProducts RPCs, plus the Product, request and response messages. Field numbers are part of the wire format — they must be unique within a message and must never be reused once shipped.',
          language: 'protobuf',
          starterCode: 'syntax = "proto3";\n\npackage catalog.v1;\n\noption go_package = "github.com/yourname/catalog/gen/catalog/v1;catalogv1";\n\n// service CatalogService with GetProduct and ListProducts\n\n// message Product { id, name, price_cents, in_stock }\n\n// message GetProductRequest / GetProductResponse\n// message ListProductsRequest / ListProductsResponse\n',
          runnable: false,
          examples: [
            { input: 'protoc --go_out=. --go-grpc_out=. catalog.proto', output: 'generates catalog.pb.go and catalog_grpc.pb.go' }
          ]
        },
        {
          kind: 'code',
          prompt: 'Write a multi-stage Dockerfile packaging this Go microservice. Build with the golang:1.22 image, then copy only the compiled binary into a minimal final stage. Set CGO_ENABLED=0 so the binary is statically linked and actually runs in a scratch/alpine image.',
          language: 'dockerfile',
          starterCode: '# Stage 1: build\n# FROM golang:1.22 AS builder\n# ... go mod download, then build with CGO_ENABLED=0\n\n# Stage 2: minimal runtime\n# FROM alpine:3.20 (or scratch)\n# COPY the binary from the builder stage, EXPOSE the port, set ENTRYPOINT\n',
          runnable: false,
          examples: [
            { input: 'docker build -t catalog . && docker run -p 8080:8080 catalog', output: 'listening on :8080' }
          ]
        }
      ]
    }
  },
  m18: {
    id: 'm18',
    title: 'MODULE 18: DEPLOYMENT & DEVOPS',
    overview: 'Learn building static executables, configuring compose workspaces, EC2 instances deployments and CI/CD pipelines.',
    outcomes: ['Deploy docker systems', 'Configure Github Actions workflows'],
    lessons: [
      { id: 'm18-l1', title: 'Lesson 18.1 Building Executables', objectives: ['Compile static binaries'], theory: 'Go compiles into a single, self-contained binary containing all dependency resources.', takeaways: ['No external VM/runtime installation is required on destination servers.'] },
      { id: 'm18-l2', title: 'Lesson 18.2 Environment Variables', objectives: ['Load DSN configurations'], theory: 'Configure and load environment variables at runtime instead of hardcoding credentials.', takeaways: ['Prevents sensitive secrets leaks.'] },
      { id: 'm18-l3', title: 'Lesson 18.3 Docker', objectives: ['Run docker binaries'], theory: 'Package Go executables into lightweight Docker containers.', takeaways: ['Ensures consistent behavior across staging and production.'] },
      { id: 'm18-l4', title: 'Lesson 18.4 Docker Compose', objectives: ['Manage multi-container setups'], theory: 'Orchestrate multi-container environments (e.g. API gateway, Postgres database, Redis cache) using YAML specifications.', takeaways: ['Simplifies local multi-service testing.'] },
      { id: 'm18-l5', title: 'Lesson 18.5 AWS EC2 Deployment', objectives: ['Launch cloud instances'], theory: 'Provision AWS EC2 Linux nodes and configure SSH keys to deploy Go backend binaries.', takeaways: ['Ensure port 80/443 mapping rules are active.'] },
      { id: 'm18-l6', title: 'Lesson 18.6 CI/CD Basics', objectives: ['Automate builds validation'], theory: 'Configure automated pipelines (e.g. GitHub Actions) to run test suites and lint checks on every commit.', takeaways: ['Ensures deployment reliability.'] }
    ],
    quiz: [
      { id: 1, question: 'What is the main benefit of Go compilation?', options: ['Generates a single self-contained binary', 'Runs on a JVM', 'Interprets code at runtime', 'Automatically deploys to AWS'], correctAnswer: 'Generates a single self-contained binary' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write a GitHub Actions workflow that vets, tests and builds a Go project on every pull request. Use actions/setup-go with a pinned version, and run go vet and go test before go build so a broken build fails fast.',
          language: 'yaml',
          starterCode: '# .github/workflows/ci.yml\nname: CI\n\non:\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      # actions/checkout\n      # actions/setup-go with go-version: "1.22"\n      # go mod download\n      # go vet ./...\n      # go test ./... -race\n      # go build ./...\n',
          runnable: false,
          examples: [
            { input: 'open a pull request against main', output: 'CI / build (pull_request) — passed in 48s' }
          ]
        }
      ]
    }
  }
};
