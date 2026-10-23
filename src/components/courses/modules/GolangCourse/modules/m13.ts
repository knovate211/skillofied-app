import type { ModuleData } from '../GolangCourseData';

const mod_m13: ModuleData = {
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
    { id: 1, question: 'Which built-in package serves HTTP routers in Go?', options: ['net/http', 'http', 'web', 'net/web'], correctAnswer: 'net/http' },
    { id: 2, question: "What is the signature of an http.HandlerFunc?", options: ["func(r *http.Request) string", "func(ctx context.Context) error", "func(w http.ResponseWriter, r *http.Request)", "func(w io.Writer)"], correctAnswer: "func(w http.ResponseWriter, r *http.Request)" },
    { id: 3, question: "Which call starts an HTTP server on port 8080?", options: ["http.Start(8080)", "http.Serve(\"8080\")", "net.Listen(8080)", "http.ListenAndServe(\":8080\", mux)"], correctAnswer: "http.ListenAndServe(\":8080\", mux)" },
    { id: 4, question: "How is middleware usually written with net/http?", options: ["A function that wraps and returns an http.Handler", "A struct tag on the handler", "A goroutine started for each route at server startup", "A global variable of rules"], correctAnswer: "A function that wraps and returns an http.Handler" },
    { id: 5, question: "Which status code should a successful resource creation return?", options: ["200 OK", "201 Created", "204 No Content", "302 Found"], correctAnswer: "201 Created" },
    { id: 6, question: "Why decode request JSON into a typed struct?", options: ["It skips the need for validation", "It makes responses smaller", "Invalid shapes fail early with a clear error", "It avoids reading the body"], correctAnswer: "Invalid shapes fail early with a clear error" },
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
};

export default mod_m13;
