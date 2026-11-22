import type { ModuleData } from '../GolangCourseData';

const mod_m6: ModuleData = {
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
    { id: 1, question: 'How does Go export a struct field for external package access?', options: ["Prefix with export keyword", "Capitalize the first letter", "Prefix with public keyword", "Define JSON tags"], correctAnswer: "Capitalize the first letter" },
    { id: 2, question: "When should a method use a pointer receiver?", options: ["Whenever the struct has strings", "When it modifies the struct or the struct is large", "Only for exported methods", "Never; value receivers are required"], correctAnswer: "When it modifies the struct or the struct is large" },
    { id: 3, question: "What does embedding a struct give the outer struct?", options: ["Classical inheritance with overriding", "A copy of the embedded package", "Promotion of the embedded type's fields and methods", "Automatic JSON serialisation"], correctAnswer: "Promotion of the embedded type's fields and methods" },
    { id: 4, question: "What does the tag `json:\"name,omitempty\"` do?", options: ["Makes the field required", "Renames the Go field to name", "Encrypts the field in JSON", "Uses key name and omits the field when empty"], correctAnswer: "Uses key name and omits the field when empty" },
    { id: 5, question: "An unexported struct field is lowercase. What happens when it is marshalled with encoding/json?", options: ["It is skipped", "It is included normally", "Marshalling fails", "It is written as null"], correctAnswer: "It is skipped" },
    { id: 6, question: "Why does Go favour composition over inheritance?", options: ["Go has no structs", "Small types combine without fragile class hierarchies", "Inheritance is slower at runtime", "Composition removes the need for interfaces"], correctAnswer: "Small types combine without fragile class hierarchies" },
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
};

export default mod_m6;
