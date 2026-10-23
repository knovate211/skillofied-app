import type { ModuleData } from '../GolangCourseData';

const mod_m9: ModuleData = {
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
    { id: 1, question: 'Which file lists the direct dependencies of a Go project?', options: ['go.mod', 'go.sum', 'package.json', 'go.deps'], correctAnswer: 'go.mod' },
    { id: 2, question: "What does `go mod tidy` do?", options: ["Formats all source files", "Deletes the module cache", "Adds missing and removes unused module requirements", "Upgrades every dependency to its latest version"], correctAnswer: "Adds missing and removes unused module requirements" },
    { id: 3, question: "What makes an identifier visible outside its package?", options: ["Adding the export keyword", "Declaring it in main.go", "Listing it in go.mod", "Starting its name with an uppercase letter"], correctAnswer: "Starting its name with an uppercase letter" },
    { id: 4, question: "What does go.sum record?", options: ["Checksums of module dependencies", "The list of test files", "Compiler flags", "Environment variables"], correctAnswer: "Checksums of module dependencies" },
    { id: 5, question: "Code under an `internal/` directory can be imported by...", options: ["Any module on the internet", "Packages rooted at internal's parent", "Only the main package", "Nothing; it cannot be imported"], correctAnswer: "Packages rooted at internal's parent" },
    { id: 6, question: "How many packages can a single directory contain, excluding tests?", options: ["Unlimited", "Two", "One", "One per file"], correctAnswer: "One" },
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
};

export default mod_m9;
