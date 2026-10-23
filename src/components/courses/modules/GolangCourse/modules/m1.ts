import type { ModuleData } from '../GolangCourseData';

const mod_m1: ModuleData = {
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
    { id: 1, question: 'Which command compiles and runs a Go file directly?', options: ['go run', 'go build', 'go start', 'go exec'], correctAnswer: 'go run' },
    { id: 2, question: "Which company created Go?", options: ["Microsoft", "Mozilla", "Google", "Apple"], correctAnswer: "Google" },
    { id: 3, question: "What does `go build` produce for a main package?", options: ["A bytecode .class file", "An interpreted script", "A shared JavaScript bundle", "A compiled executable binary"], correctAnswer: "A compiled executable binary" },
    { id: 4, question: "Which function is the entry point of a Go program?", options: ["main() in package main", "init() in any package", "start() in package app", "run() in package main"], correctAnswer: "main() in package main" },
    { id: 5, question: "Why does Go compile quickly compared with C++?", options: ["It skips type checking", "Simple grammar and explicit, acyclic imports", "It compiles only on first run", "It interprets code instead"], correctAnswer: "Simple grammar and explicit, acyclic imports" },
    { id: 6, question: "What happens when a Go file imports a package it never uses?", options: ["It compiles with a warning", "The import is removed at runtime", "Compilation fails with an error", "It runs but logs a notice"], correctAnswer: "Compilation fails with an error" },
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
};

export default mod_m1;
