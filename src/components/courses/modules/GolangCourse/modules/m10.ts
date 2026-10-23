import type { ModuleData } from '../GolangCourseData';

const mod_m10: ModuleData = {
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
    { id: 1, question: 'Which package is used to read/write JSON files in Go?', options: ["text/json", "encoding/json", "os/json", "net/json"], correctAnswer: "encoding/json" },
    { id: 2, question: "Why write `defer f.Close()` right after opening a file?", options: ["It makes reads faster", "It closes the file on every return path", "It locks the file for other processes", "It is required for writes to succeed"], correctAnswer: "It closes the file on every return path" },
    { id: 3, question: "Which function reads an entire small file into memory?", options: ["io.ReadAll(\"path\")", "bufio.ReadFile", "os.ReadFile", "fs.Load"], correctAnswer: "os.ReadFile" },
    { id: 4, question: "Which is best for reading a large file line by line?", options: ["os.ReadFile", "json.Unmarshal", "strings.Split on the whole file", "bufio.Scanner"], correctAnswer: "bufio.Scanner" },
    { id: 5, question: "Which package parses CSV files?", options: ["encoding/csv", "text/csv", "io/csv", "strings/csv"], correctAnswer: "encoding/csv" },
    { id: 6, question: "What does os.MkdirAll do if the directory already exists?", options: ["Returns an error", "Returns nil without error", "Deletes and recreates it", "Panics"], correctAnswer: "Returns nil without error" },
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
};

export default mod_m10;
