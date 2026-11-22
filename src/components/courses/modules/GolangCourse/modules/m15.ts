import type { ModuleData } from '../GolangCourseData';

const mod_m15: ModuleData = {
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
    { id: 1, question: 'Which tag enforces parameter validation checks in Gin binding structs?', options: ["validate", "json", "binding", "require"], correctAnswer: "binding" },
    { id: 2, question: "Which call creates a Gin engine with logger and recovery middleware?", options: ["gin.Default()", "gin.New()", "gin.Create()", "gin.Server()"], correctAnswer: "gin.Default()" },
    { id: 3, question: "How do you read the path parameter in route `/users/:id`?", options: ["c.Query(\"id\")", "c.Param(\"id\")", "c.Get(\"id\")", "c.PostForm(\"id\")"], correctAnswer: "c.Param(\"id\")" },
    { id: 4, question: "Which method binds and validates a JSON request body?", options: ["c.JSON(&req)", "c.ReadJSON(req)", "c.ShouldBindJSON(&req)", "c.Bind(req.JSON)"], correctAnswer: "c.ShouldBindJSON(&req)" },
    { id: 5, question: "Why separate controllers from services?", options: ["Gin needs separate layers to register routes correctly", "It reduces the binary size", "Services run in separate processes", "HTTP handling stays thin and business logic is testable"], correctAnswer: "HTTP handling stays thin and business logic is testable" },
    { id: 6, question: "How do you apply middleware to a group of routes?", options: ["Create a router group and call Use on it", "Add a tag to each handler", "Register it in go.mod", "Wrap main() with it"], correctAnswer: "Create a router group and call Use on it" },
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
};

export default mod_m15;
