import type { ModuleData } from '../GolangCourseData';

const mod_m12: ModuleData = {
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
    { id: 1, question: 'What suffix must Go test filenames have?', options: [".test.go", "_spec.go", ".spec.go", "_test.go"], correctAnswer: "_test.go" },
    { id: 2, question: "What must a test function signature look like?", options: ["func testXxx()", "func TestXxx() error", "func Test(t testing.T) bool", "func TestXxx(t *testing.T)"], correctAnswer: "func TestXxx(t *testing.T)" },
    { id: 3, question: "What is the main benefit of table-driven tests?", options: ["Many cases share one test body", "They run faster than normal tests", "They need no assertions", "They replace benchmarks"], correctAnswer: "Many cases share one test body" },
    { id: 4, question: "How do you run benchmarks?", options: ["go bench", "go test -bench=.", "go run -bench", "go test -perf"], correctAnswer: "go test -bench=." },
    { id: 5, question: "What does t.Fatal do that t.Error does not?", options: ["Fails the whole package run", "Marks the test as skipped", "Stops the current test immediately", "Prints without failing"], correctAnswer: "Stops the current test immediately" },
    { id: 6, question: "Why define a small interface for a dependency you want to mock?", options: ["Interfaces make code faster", "Mocks must be interfaces by law", "It removes the need for tests", "Tests can substitute a fake implementation"], correctAnswer: "Tests can substitute a fake implementation" },
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
};

export default mod_m12;
