import type { ModuleData } from '../GolangCourseData';

const mod_m7: ModuleData = {
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
    { id: 1, question: 'Which keyword implements interfaces in Go?', options: ["implements", "interface", "None (implicit)", "struct"], correctAnswer: "None (implicit)" },
    { id: 2, question: "What does `interface{}` (or `any`) accept?", options: ["A value of any type", "Only pointer types", "Only structs", "Only types with methods"], correctAnswer: "A value of any type" },
    { id: 3, question: "What happens on `s := v.(string)` when v holds an int?", options: ["s becomes an empty string", "It panics", "It converts the int to a string", "It returns nil"], correctAnswer: "It panics" },
    { id: 4, question: "How do you assert a type safely without risking a panic?", options: ["s := string(v)", "s := v as string", "s, ok := v.(string)", "s := try v.(string)"], correctAnswer: "s, ok := v.(string)" },
    { id: 5, question: "A type satisfies an interface when...", options: ["It embeds the interface", "It is declared with implements", "It lives in the same package", "It has every method the interface declares"], correctAnswer: "It has every method the interface declares" },
    { id: 6, question: "What is a type switch used for?", options: ["Branching on a value's dynamic type", "Converting between numeric types", "Switching goroutines", "Choosing a build target"], correctAnswer: "Branching on a value's dynamic type" },
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
};

export default mod_m7;
