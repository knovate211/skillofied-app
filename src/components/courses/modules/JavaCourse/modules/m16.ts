import type { ModuleData } from '../JavaCourseData';

const mod_m16: ModuleData = {
  id: 'm16',
  title: 'MODULE 16: SPRING BOOT FUNDAMENTALS',
  overview: 'Learn Spring Boot framework architectures: REST APIs, Controllers, Services, Repositories, and Dependency Injection.',
  outcomes: [
    'Configure Spring Boot projects using Spring Initializr.',
    'Build REST endpoints with @RestController.',
    'Use Dependency Injection with @Autowired.'
  ],
  lessons: [
    {
      "id": "m16-l1",
      "title": "Lesson 16.1 Introduction to Spring Boot",
      "objectives": [
        "Explain what Spring Boot adds to Spring.",
        "Understand auto-configuration and starters."
      ],
      "theory": "**Spring** is a framework for building Java applications around dependency injection. It is powerful but historically demanded enormous configuration — XML files, servlet descriptors, manual bean wiring. A \"hello world\" REST service could take an afternoon.\n\n**Spring Boot** is Spring with opinions. It keeps the framework and removes the ceremony, through three ideas:\n\n1. **Auto-configuration.** Boot inspects your classpath and configures sensible defaults. Find `spring-boot-starter-web` on the classpath and it configures an embedded Tomcat, a `DispatcherServlet`, and JSON conversion — with no configuration from you. Any default can be overridden.\n2. **Starters.** Curated dependency bundles with versions already reconciled. `spring-boot-starter-web` pulls in Spring MVC, Tomcat, Jackson and validation as one coherent set, eliminating version-conflict debugging.\n3. **Embedded server.** The application packages as a runnable JAR containing its own Tomcat. `java -jar app.jar` is the whole deployment. No external application server to install and configure — which is precisely what makes Boot the natural fit for containers and cloud platforms.\n\nThe entry point is a class annotated `@SpringBootApplication`. That single annotation is a composite of three: `@Configuration` (this class declares beans), `@EnableAutoConfiguration` (turn on the magic), and `@ComponentScan` (discover components in this package and below).\n\nThat last part explains the most common beginner failure: **classes outside the main class's package are never scanned**, so their beans silently do not exist.",
      "syntax": "@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}",
      "codeExample": "package com.skillofied.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.context.ApplicationContext;\n\n// Equivalent to @Configuration + @EnableAutoConfiguration + @ComponentScan\n@SpringBootApplication\npublic class Application {\n\n    public static void main(String[] args) {\n        ApplicationContext context = SpringApplication.run(Application.class, args);\n\n        System.out.println(\"Beans loaded : \" + context.getBeanDefinitionCount());\n        System.out.println(\"App name     : \" + context.getApplicationName());\n\n        // Auto-configuration registered these without any code from us\n        boolean hasTomcat = context.containsBean(\"tomcatServletWebServerFactory\");\n        System.out.println(\"Embedded Tomcat configured: \" + hasTomcat);\n    }\n}",
      "codeOutput": "  .   ____          _            __ _ _\n Spring Boot :: (v3.2.0)\n\nTomcat initialized with port(s): 8080 (http)\nStarted Application in 1.842 seconds (process running for 2.15)\nBeans loaded : 128\nApp name     :\nEmbedded Tomcat configured: true",
      "mistakes": [
        "Placing controllers or services in a package that is not under the main class's package — component scanning never finds them and requests 404.",
        "Adding individual Spring libraries instead of a starter, then fighting version conflicts.",
        "Assuming auto-configuration cannot be overridden. Define your own bean of the same type and Boot backs off.",
        "Confusing Spring Boot with Spring MVC. Boot is the configuration layer; MVC is the web framework it configures."
      ],
      "takeaways": [
        "Spring Boot is Spring plus auto-configuration, starters, and an embedded server.",
        "`@SpringBootApplication` bundles `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`.",
        "Component scanning starts at the main class's package — keep everything beneath it.",
        "The output is a self-contained runnable JAR."
      ]
    },
    {
      "id": "m16-l2",
      "title": "Lesson 16.2 Spring Boot Setup",
      "objectives": [
        "Generate a project with Spring Initializr.",
        "Understand pom.xml and application.properties."
      ],
      "theory": "The standard way to start is **Spring Initializr** at `start.spring.io`, also built into IntelliJ IDEA and VS Code. You pick the build tool, language, Boot version and starters, and it produces a working skeleton.\n\nFor a typical REST API you select: **Spring Web** (MVC and embedded Tomcat), **Spring Data JPA** (database access), a **driver** (MySQL or PostgreSQL), **Validation**, and **Spring Boot DevTools** (automatic restart on code change).\n\nThe generated project has a fixed shape:\n\n- `pom.xml` (or `build.gradle`) — dependencies. Note the `spring-boot-starter-parent`, which supplies a curated dependency-management section so you never write version numbers for Spring libraries.\n- `src/main/java` — your code, rooted at the package holding the main class.\n- `src/main/resources/application.properties` (or `.yml`) — configuration.\n- `src/test/java` — tests, with `spring-boot-starter-test` already wired up.\n- `mvnw` / `gradlew` — wrapper scripts, so contributors need no local Maven or Gradle install.\n\n`application.properties` is where you set the port, datasource URL, JPA behaviour and logging levels. Values can be **externalised** — an environment variable or a command-line argument overrides the file, which is how the same JAR runs unchanged in dev, staging and production.\n\n**Profiles** formalise this. Put environment-specific values in `application-dev.properties` and `application-prod.properties`, then activate one with `spring.profiles.active=prod`.",
      "syntax": "# application.properties\nserver.port=8081\nspring.datasource.url=jdbc:mysql://localhost:3306/school\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true",
      "codeExample": "<!-- pom.xml - generated by Spring Initializr -->\n<project>\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>3.2.0</version>\n    </parent>\n\n    <groupId>com.skillofied</groupId>\n    <artifactId>student-api</artifactId>\n    <version>1.0.0</version>\n\n    <properties>\n        <java.version>17</java.version>\n    </properties>\n\n    <dependencies>\n        <!-- No version tags: the parent manages them -->\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-data-jpa</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-validation</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>com.mysql</groupId>\n            <artifactId>mysql-connector-j</artifactId>\n            <scope>runtime</scope>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-devtools</artifactId>\n            <scope>runtime</scope>\n            <optional>true</optional>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-test</artifactId>\n            <scope>test</scope>\n        </dependency>\n    </dependencies>\n\n    <build>\n        <plugins>\n            <plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>\n        </plugins>\n    </build>\n</project>",
      "codeOutput": "$ ./mvnw spring-boot:run\n[INFO] Building student-api 1.0.0\n[INFO] BUILD SUCCESS\nTomcat started on port 8081 (http)\nStarted Application in 2.104 seconds",
      "mistakes": [
        "Adding explicit `<version>` tags for Spring dependencies and breaking the parent's curated set.",
        "Forgetting the database driver, which fails at startup with \"Failed to determine a suitable driver class\".",
        "Committing production credentials in `application.properties`. Use environment variables or profiles.",
        "Omitting `spring-boot-maven-plugin`, so `mvn package` produces a plain JAR that will not run."
      ],
      "takeaways": [
        "Generate projects with Spring Initializr rather than by hand.",
        "The starter parent manages versions — do not specify your own.",
        "`application.properties` is overridable by environment variables and CLI arguments.",
        "Profiles keep dev and prod configuration separate in one artifact."
      ]
    },
    {
      "id": "m16-l3",
      "title": "Lesson 16.3 REST APIs",
      "objectives": [
        "Explain REST principles.",
        "Map HTTP methods and status codes correctly."
      ],
      "theory": "**REST** (Representational State Transfer) is an architectural style for web APIs. Its rules are what make an API predictable to anyone who has used another one.\n\n**Resources are nouns, identified by URLs.** `/students` is the collection; `/students/7` is one member. Verbs do not belong in URLs — `/getStudent` and `/deleteStudent` are the classic beginner mistake, because the HTTP method already carries the verb.\n\n**The HTTP method is the operation:**\n\n| Method | Purpose | Idempotent | Safe |\n|---|---|---|---|\n| GET | read | yes | yes |\n| POST | create | no | no |\n| PUT | replace whole resource | yes | no |\n| PATCH | update part | no | no |\n| DELETE | remove | yes | no |\n\n*Idempotent* means repeating the call has the same effect as making it once. It matters because clients retry on network failure — a retried DELETE is harmless, a retried POST creates a duplicate.\n\n**Status codes are part of the contract:**\n\n- 200 OK, 201 Created (with a `Location` header), 204 No Content\n- 400 Bad Request, 401 Unauthorised, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable\n- 500 Internal Server Error\n\nReturning `200 OK` with `{\"error\": \"not found\"}` in the body defeats the point: clients, proxies and monitoring all key off the status code.\n\n**Statelessness** is the final principle. Each request carries everything needed to serve it — no server-side session — which is what lets you run twenty instances behind a load balancer.",
      "syntax": "GET    /api/students      -> 200 list\nGET    /api/students/7    -> 200 one, or 404\nPOST   /api/students      -> 201 + Location header\nPUT    /api/students/7    -> 200 replaced\nDELETE /api/students/7    -> 204 no content",
      "codeExample": "package com.skillofied.demo.controller;\n\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\nimport java.net.URI;\nimport java.util.*;\n\nrecord Student(Integer id, String name, String grade) { }\n\n@RestController                       // @Controller + @ResponseBody\n@RequestMapping(\"/api/students\")      // shared base path\npublic class StudentRestController {\n\n    private final Map<Integer, Student> store = new LinkedHashMap<>();\n    private int nextId = 1;\n\n    // GET /api/students?grade=A  -> 200\n    @GetMapping\n    public List<Student> list(@RequestParam(required = false) String grade) {\n        return store.values().stream()\n            .filter(s -> grade == null || s.grade().equals(grade))\n            .toList();\n    }\n\n    // GET /api/students/7  -> 200 or 404\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Student> getOne(@PathVariable Integer id) {\n        Student found = store.get(id);\n        return found == null\n            ? ResponseEntity.notFound().build()\n            : ResponseEntity.ok(found);\n    }\n\n    // POST /api/students  -> 201 with a Location header\n    @PostMapping\n    public ResponseEntity<Student> create(@RequestBody Student incoming) {\n        Student saved = new Student(nextId++, incoming.name(), incoming.grade());\n        store.put(saved.id(), saved);\n        return ResponseEntity\n            .created(URI.create(\"/api/students/\" + saved.id()))\n            .body(saved);\n    }\n\n    // PUT /api/students/7  -> 200 or 404\n    @PutMapping(\"/{id}\")\n    public ResponseEntity<Student> replace(@PathVariable Integer id, @RequestBody Student incoming) {\n        if (!store.containsKey(id)) return ResponseEntity.notFound().build();\n        Student updated = new Student(id, incoming.name(), incoming.grade());\n        store.put(id, updated);\n        return ResponseEntity.ok(updated);\n    }\n\n    // DELETE /api/students/7  -> 204 or 404\n    @DeleteMapping(\"/{id}\")\n    @ResponseStatus(HttpStatus.NO_CONTENT)\n    public ResponseEntity<Void> delete(@PathVariable Integer id) {\n        return store.remove(id) == null\n            ? ResponseEntity.notFound().build()\n            : ResponseEntity.noContent().build();\n    }\n}",
      "codeOutput": "$ curl -i -X POST localhost:8080/api/students \\\n    -H \"Content-Type: application/json\" \\\n    -d '{\"name\":\"Asha\",\"grade\":\"A\"}'\n\nHTTP/1.1 201 Created\nLocation: /api/students/1\nContent-Type: application/json\n\n{\"id\":1,\"name\":\"Asha\",\"grade\":\"A\"}\n\n$ curl -i localhost:8080/api/students/99\nHTTP/1.1 404 Not Found",
      "mistakes": [
        "Putting verbs in URLs: `/api/getAllStudents` instead of `GET /api/students`.",
        "Returning 200 for every outcome, including errors.",
        "Using GET for operations that change data — crawlers and prefetchers will trigger them.",
        "Omitting the `Location` header on 201 Created.",
        "Using `@Controller` instead of `@RestController` and getting a view-name lookup instead of JSON."
      ],
      "takeaways": [
        "URLs name resources; HTTP methods supply the verb.",
        "GET, PUT and DELETE are idempotent; POST and PATCH are not.",
        "Status codes are part of the API contract.",
        "`@RestController` serialises return values straight to JSON."
      ]
    },
    {
      "id": "m16-l4",
      "title": "Lesson 16.4 Controllers",
      "objectives": [
        "Map requests with Spring MVC annotations.",
        "Bind path variables, query parameters and request bodies."
      ],
      "theory": "A **controller** is the entry point for HTTP requests. Spring's `DispatcherServlet` receives every request and routes it to the handler method whose mapping matches.\n\n`@RestController` is `@Controller` plus `@ResponseBody`: return values are serialised directly into the response body — as JSON, via Jackson — rather than being treated as view names. Use plain `@Controller` only when rendering server-side templates.\n\n`@RequestMapping` at class level sets a base path; the method-level shortcuts `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping` and `@DeleteMapping` add the rest.\n\nFour binding annotations cover almost every case:\n\n- **`@PathVariable`** — a segment of the URL. `/students/{id}` → `@PathVariable Integer id`.\n- **`@RequestParam`** — a query-string parameter. `?page=2` → `@RequestParam int page`. Supports `defaultValue` and `required=false`.\n- **`@RequestBody`** — deserialise the JSON body into an object.\n- **`@RequestHeader`** — read a header such as `Authorization`.\n\nReturn either the object itself (Spring supplies 200) or a **`ResponseEntity<T>`** when you need control over the status code and headers.\n\nThe crucial architectural rule: **controllers should be thin**. Their job is to translate HTTP into a method call, delegate to a service, and translate the result back. Business logic in a controller cannot be reused or unit-tested without spinning up the web layer.",
      "syntax": "@GetMapping(\"/{id}\")\npublic ResponseEntity<Student> get(@PathVariable Long id,\n                                  @RequestParam(defaultValue = \"false\") boolean full) { }",
      "codeExample": "package com.skillofied.demo.controller;\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\nimport java.util.List;\nimport java.util.Map;\n\nrecord StudentDto(Long id, String name, String grade) { }\n\n@RestController\n@RequestMapping(\"/api/students\")\npublic class ControllerDemo {\n\n    // Thin controller: it delegates, it does not compute.\n    private final StudentService service;\n\n    public ControllerDemo(StudentService service) {\n        this.service = service;\n    }\n\n    // Path variable + query parameter with a default\n    // GET /api/students/7?includeGrades=true\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<StudentDto> getOne(\n            @PathVariable Long id,\n            @RequestParam(defaultValue = \"false\") boolean includeGrades) {\n\n        return service.findById(id)\n            .map(ResponseEntity::ok)\n            .orElseGet(() -> ResponseEntity.notFound().build());\n    }\n\n    // Paging via query parameters\n    // GET /api/students?page=0&size=20&sort=name\n    @GetMapping\n    public List<StudentDto> list(\n            @RequestParam(defaultValue = \"0\")    int page,\n            @RequestParam(defaultValue = \"20\")   int size,\n            @RequestParam(defaultValue = \"name\") String sort) {\n        return service.findAll(page, size, sort);\n    }\n\n    // Request body deserialised from JSON\n    @PostMapping\n    public ResponseEntity<StudentDto> create(@RequestBody StudentDto body) {\n        StudentDto saved = service.create(body);\n        return ResponseEntity.status(201).body(saved);\n    }\n\n    // Reading a header\n    @GetMapping(\"/whoami\")\n    public Map<String, String> whoami(@RequestHeader(\"Authorization\") String auth) {\n        return Map.of(\"tokenPresent\", String.valueOf(auth != null && !auth.isBlank()));\n    }\n\n    // Multiple path variables\n    @GetMapping(\"/{id}/subjects/{code}\")\n    public Map<String, Object> subject(@PathVariable Long id, @PathVariable String code) {\n        return Map.of(\"studentId\", id, \"subject\", code);\n    }\n}\n\ninterface StudentService {\n    java.util.Optional<StudentDto> findById(Long id);\n    List<StudentDto> findAll(int page, int size, String sort);\n    StudentDto create(StudentDto dto);\n}",
      "codeOutput": "$ curl localhost:8080/api/students/7\n{\"id\":7,\"name\":\"Asha Nair\",\"grade\":\"A\"}\n\n$ curl \"localhost:8080/api/students?page=0&size=2\"\n[{\"id\":1,\"name\":\"Asha Nair\",\"grade\":\"A\"},{\"id\":2,\"name\":\"Ravi Kumar\",\"grade\":\"B\"}]\n\n$ curl localhost:8080/api/students/7/subjects/CS101\n{\"studentId\":7,\"subject\":\"CS101\"}",
      "mistakes": [
        "Using `@Controller` without `@ResponseBody` and getting a 404 as Spring hunts for a view template.",
        "Naming the method parameter differently from the path placeholder without specifying `@PathVariable(\"id\")`.",
        "Putting business logic and database calls in the controller instead of delegating to a service.",
        "Forgetting `@RequestBody`, so Spring tries to bind JSON fields as query parameters and every field is null.",
        "Two methods mapped to the same path and method, which fails at startup with an ambiguous-mapping error."
      ],
      "takeaways": [
        "`@RestController` returns data; `@Controller` returns view names.",
        "`@PathVariable` for URL segments, `@RequestParam` for the query string, `@RequestBody` for JSON.",
        "`ResponseEntity` gives you control over status and headers.",
        "Keep controllers thin — delegate to services."
      ]
    },
    {
      "id": "m16-l5",
      "title": "Lesson 16.5 Services",
      "objectives": [
        "Place business logic in a service layer.",
        "Use @Service and @Transactional."
      ],
      "theory": "The **service layer** holds your business logic — the rules that make the application do something useful, as opposed to the plumbing of HTTP and SQL.\n\nWhy separate it at all? Three concrete reasons:\n\n1. **Reuse.** The same `enrolStudent` logic serves a REST endpoint, a scheduled job, and a CLI command. Logic trapped in a controller is reachable only over HTTP.\n2. **Testability.** A service is a plain object. Unit-testing it means `new StudentService(mockRepo)` — no server, no HTTP, millisecond tests.\n3. **Transaction boundaries.** A business operation often spans several repository calls that must succeed or fail together. The service is the natural place to draw that boundary.\n\n`@Service` marks the class as a Spring-managed bean. Functionally it is `@Component` with a clearer name, but that naming is not cosmetic — it documents the layer and lets tooling and aspects target services specifically.\n\n**`@Transactional`** is the annotation that earns the layer its keep. Spring wraps the method in a database transaction: it commits when the method returns normally and **rolls back automatically on an unchecked exception**. Two behaviours surprise people:\n\n- By default it rolls back on `RuntimeException` and `Error`, but **not on checked exceptions**. Use `@Transactional(rollbackFor = Exception.class)` if you need that.\n- It works by creating a **proxy**, so **calling a `@Transactional` method from another method in the same class bypasses it entirely** — the call never leaves the object, so the proxy never sees it. This is the single most common Spring transaction bug.\n\nUse `@Transactional(readOnly = true)` on query methods; it lets the persistence provider skip dirty-checking.",
      "syntax": "@Service\npublic class StudentService {\n\n    @Transactional\n    public Student enrol(Long id, String course) { ... }\n\n    @Transactional(readOnly = true)\n    public List<Student> findAll() { ... }\n}",
      "codeExample": "package com.skillofied.demo.service;\n\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\nimport java.util.Optional;\n\n@Service\npublic class StudentService {\n\n    private final StudentRepository repository;\n    private final AuditRepository audit;\n\n    // Constructor injection - no @Autowired needed for a single constructor\n    public StudentService(StudentRepository repository, AuditRepository audit) {\n        this.repository = repository;\n        this.audit = audit;\n    }\n\n    @Transactional(readOnly = true)\n    public List<Student> findAll() {\n        return repository.findAll();\n    }\n\n    @Transactional(readOnly = true)\n    public Optional<Student> findById(Long id) {\n        return repository.findById(id);\n    }\n\n    // Business rules live here, not in the controller\n    @Transactional\n    public Student enrol(Long studentId, String courseCode) {\n        Student student = repository.findById(studentId)\n            .orElseThrow(() -> new StudentNotFoundException(studentId));\n\n        if (student.getCourses().size() >= 6) {\n            throw new EnrolmentLimitException(\"A student may take at most 6 courses\");\n        }\n        if (student.getCourses().contains(courseCode)) {\n            throw new DuplicateEnrolmentException(courseCode);\n        }\n\n        student.getCourses().add(courseCode);\n        Student saved = repository.save(student);\n\n        // Both writes share one transaction: if the audit insert fails,\n        // the enrolment is rolled back too.\n        audit.record(\"ENROL\", studentId, courseCode);\n\n        return saved;\n    }\n\n    @Transactional\n    public void delete(Long id) {\n        if (!repository.existsById(id)) {\n            throw new StudentNotFoundException(id);\n        }\n        repository.deleteById(id);\n        audit.record(\"DELETE\", id, null);\n    }\n}\n\nclass StudentNotFoundException extends RuntimeException {\n    StudentNotFoundException(Long id) { super(\"No student with id \" + id); }\n}\nclass EnrolmentLimitException extends RuntimeException {\n    EnrolmentLimitException(String message) { super(message); }\n}\nclass DuplicateEnrolmentException extends RuntimeException {\n    DuplicateEnrolmentException(String code) { super(\"Already enrolled in \" + code); }\n}",
      "codeOutput": "$ curl -X POST localhost:8080/api/students/7/enrol?course=CS101\n{\"id\":7,\"name\":\"Asha Nair\",\"courses\":[\"CS101\"]}\n\n$ curl -X POST localhost:8080/api/students/7/enrol?course=CS101\n{\"status\":409,\"message\":\"Already enrolled in CS101\"}\n\n# Audit insert failed -> the enrolment was rolled back as well",
      "mistakes": [
        "Calling a `@Transactional` method from another method of the same class. The proxy is bypassed and no transaction starts.",
        "Expecting a rollback from a checked exception — the default only rolls back on unchecked ones.",
        "Catching an exception inside the transactional method and swallowing it, so Spring never sees a reason to roll back.",
        "Putting `@Transactional` on the controller instead of the service, stretching the transaction across the whole HTTP request.",
        "Leaking JPA entities out of the service; map to DTOs so lazy-loading does not explode during serialisation."
      ],
      "takeaways": [
        "Services hold business logic; controllers handle HTTP; repositories handle persistence.",
        "`@Transactional` commits on normal return and rolls back on unchecked exceptions.",
        "Self-invocation bypasses the proxy — the transaction will not start.",
        "Mark read paths `readOnly = true`."
      ]
    },
    {
      "id": "m16-l6",
      "title": "Lesson 16.6 Repositories",
      "objectives": [
        "Use Spring Data JPA repository interfaces.",
        "Write derived query methods.",
        "Know when to drop to @Query."
      ],
      "theory": "A **repository** is the persistence layer — the only place that talks to the database. Spring Data JPA makes this layer almost free: you declare an **interface**, and Spring generates the implementation at runtime.\n\nExtend one of the built-ins and you inherit a full CRUD API:\n\n- **`CrudRepository<T, ID>`** — `save`, `findById`, `findAll`, `deleteById`, `count`, `existsById`.\n- **`JpaRepository<T, ID>`** — all of the above plus paging, sorting, `flush`, and batch operations. This is the usual choice.\n\nThe part that feels like magic is **derived query methods**. Spring parses the *method name* and writes the query for you. `findByGradeAndAgeGreaterThan(String grade, int age)` becomes `SELECT s FROM Student s WHERE s.grade = ?1 AND s.age > ?2`. The vocabulary includes `And`, `Or`, `Between`, `LessThan`, `GreaterThan`, `Like`, `Containing`, `StartingWith`, `In`, `IsNull`, `OrderBy`, `Top`, `First`, `Distinct`.\n\nBecause the name *is* the query, **the property names in the method must match the entity's fields exactly**. A typo fails at application startup, not at runtime — noisy, but far better than silently wrong data.\n\nWhen a name would become unreadable, switch to **`@Query`** and write JPQL (which operates on entities) or native SQL (`nativeQuery = true`). Any modifying query needs `@Modifying` and must run inside a transaction.\n\nOne performance trap worth knowing early: the **N+1 select problem**. Fetch 100 students and then touch each one's lazily-loaded courses, and you have issued 101 queries. Fix it with `@EntityGraph` or a `JOIN FETCH` in an explicit `@Query`.",
      "syntax": "public interface StudentRepository extends JpaRepository<Student, Long> {\n    List<Student> findByGrade(String grade);\n    Optional<Student> findByEmail(String email);\n    List<Student> findByAgeGreaterThanOrderByNameAsc(int age);\n}",
      "codeExample": "package com.skillofied.demo.repository;\n\nimport org.springframework.data.domain.Page;\nimport org.springframework.data.domain.Pageable;\nimport org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport org.springframework.stereotype.Repository;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\nimport java.util.Optional;\n\n@Repository\npublic interface StudentRepository extends JpaRepository<Student, Long> {\n\n    // ---- Derived queries: Spring writes the SQL from the method name ----\n\n    List<Student> findByGrade(String grade);\n\n    Optional<Student> findByEmail(String email);\n\n    List<Student> findByAgeBetween(int min, int max);\n\n    List<Student> findByNameContainingIgnoreCase(String fragment);\n\n    List<Student> findByGradeAndAgeGreaterThanOrderByNameAsc(String grade, int age);\n\n    List<Student> findTop5ByOrderByAgeDesc();\n\n    boolean existsByEmail(String email);\n\n    long countByGrade(String grade);\n\n    // Paging comes for free\n    Page<Student> findByGrade(String grade, Pageable pageable);\n\n    // ---- Explicit JPQL when the method name would get silly ----\n\n    @Query(\"SELECT s FROM Student s WHERE s.grade = :grade AND s.age > :age\")\n    List<Student> search(@Param(\"grade\") String grade, @Param(\"age\") int age);\n\n    // JOIN FETCH avoids the N+1 problem by loading courses in one query\n    @Query(\"SELECT DISTINCT s FROM Student s LEFT JOIN FETCH s.courses\")\n    List<Student> findAllWithCourses();\n\n    // Native SQL when you need database-specific features\n    @Query(value = \"SELECT * FROM students WHERE YEAR(created_at) = :year\",\n           nativeQuery = true)\n    List<Student> findByEnrolmentYear(@Param(\"year\") int year);\n\n    // Modifying queries need @Modifying and a transaction\n    @Modifying\n    @Transactional\n    @Query(\"UPDATE Student s SET s.grade = :grade WHERE s.id = :id\")\n    int updateGrade(@Param(\"id\") Long id, @Param(\"grade\") String grade);\n}",
      "codeOutput": "# Hibernate logs the generated SQL (spring.jpa.show-sql=true)\n\nHibernate: select s1_0.id, s1_0.name, s1_0.grade, s1_0.age\n           from students s1_0 where s1_0.grade=?\n\nHibernate: select s1_0.id, s1_0.name from students s1_0\n           where upper(s1_0.name) like upper(?) escape '\\'\n\nHibernate: select distinct s1_0.id, c1_0.student_id, c1_0.code\n           from students s1_0 left join courses c1_0 on s1_0.id=c1_0.student_id",
      "mistakes": [
        "Misspelling a property in a derived method name — the application refuses to start with \"No property found for type\".",
        "Forgetting `@Modifying` on an UPDATE or DELETE `@Query`, which throws at runtime.",
        "Triggering N+1 selects by looping over entities and touching lazy associations. Use `JOIN FETCH` or `@EntityGraph`.",
        "Writing a derived method name so long it is unreadable; past three conditions, switch to `@Query`.",
        "Returning entities straight to the controller and hitting `LazyInitializationException` during JSON serialisation."
      ],
      "takeaways": [
        "Declare an interface; Spring Data generates the implementation.",
        "`JpaRepository` gives CRUD, paging and sorting for free.",
        "Method names are parsed into queries — spelling must match entity fields.",
        "Use `@Query` for complex cases and `JOIN FETCH` to avoid N+1."
      ]
    },
    {
      "id": "m16-l7",
      "title": "Lesson 16.7 Dependency Injection",
      "objectives": [
        "Explain Inversion of Control.",
        "Prefer constructor injection.",
        "Understand bean scopes."
      ],
      "theory": "**Inversion of Control** is the idea at the heart of Spring. Normally an object creates what it needs: `this.repo = new StudentRepository()`. That hard-codes the dependency — you cannot substitute a mock in a test or swap the implementation without editing the class.\n\nIoC inverts it. The object *declares* what it needs and the framework supplies it. **Dependency Injection** is how Spring performs that supply.\n\nThe **ApplicationContext** is the container. At startup it scans for `@Component` and its specialisations (`@Service`, `@Repository`, `@Controller`, `@RestController`), instantiates them, and wires them together by type.\n\nThere are three injection styles, and they are not equal:\n\n1. **Constructor injection — use this.** Dependencies become `final`, the object is impossible to construct in an invalid state, and testing needs no framework at all. Since Spring 4.3, a class with a single constructor needs no `@Autowired`.\n2. **Setter injection** — acceptable for genuinely optional dependencies.\n3. **Field injection** (`@Autowired` on the field) — avoid. Fields cannot be `final`, you cannot construct the object in a plain unit test, and it hides how many dependencies a class has, letting classes quietly grow bloated.\n\nWhen two beans implement the same interface, Spring cannot choose and startup fails. Disambiguate with **`@Primary`** on the default, or **`@Qualifier(\"name\")`** at the injection point.\n\n**Scopes** control lifecycle. The default `singleton` means one shared instance for the whole application — which is why **singleton beans must be stateless**. Mutable instance fields on a singleton service are shared across every concurrent request. `prototype` gives a new instance per injection; `request` and `session` apply to web applications.",
      "syntax": "@Service\npublic class StudentService {\n    private final StudentRepository repository;   // final = guaranteed set\n\n    public StudentService(StudentRepository repository) {\n        this.repository = repository;             // no @Autowired needed\n    }\n}",
      "codeExample": "package com.skillofied.demo;\n\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.*;\nimport org.springframework.stereotype.Service;\n\ninterface NotificationSender {\n    String send(String to, String message);\n}\n\n@Service\n@Primary                                   // the default choice\nclass EmailSender implements NotificationSender {\n    public String send(String to, String message) {\n        return \"EMAIL to \" + to + \": \" + message;\n    }\n}\n\n@Service\n@Qualifier(\"sms\")\nclass SmsSender implements NotificationSender {\n    public String send(String to, String message) {\n        return \"SMS to \" + to + \": \" + message;\n    }\n}\n\n// RECOMMENDED: constructor injection\n@Service\nclass EnrolmentService {\n    private final NotificationSender sender;   // final, always set\n\n    EnrolmentService(NotificationSender sender) {   // @Primary wins -> EmailSender\n        this.sender = sender;\n    }\n\n    String confirm(String student) {\n        return sender.send(student, \"Enrolment confirmed\");\n    }\n}\n\n// Choosing a non-primary bean explicitly\n@Service\nclass AlertService {\n    private final NotificationSender sender;\n\n    AlertService(@Qualifier(\"sms\") NotificationSender sender) {\n        this.sender = sender;\n    }\n\n    String alert(String student) {\n        return sender.send(student, \"Fee overdue\");\n    }\n}\n\n// DISCOURAGED: field injection - cannot be final, hard to unit test\n@Service\nclass LegacyService {\n    @Autowired\n    private NotificationSender sender;\n}\n\n// Beans for third-party classes you cannot annotate\n@Configuration\nclass AppConfig {\n\n    @Bean\n    public com.fasterxml.jackson.databind.ObjectMapper objectMapper() {\n        return new com.fasterxml.jackson.databind.ObjectMapper();\n    }\n\n    @Bean\n    @Scope(\"prototype\")   // a fresh instance at every injection point\n    public StringBuilder scratchBuffer() {\n        return new StringBuilder();\n    }\n}",
      "codeOutput": "EnrolmentService -> EMAIL to Asha: Enrolment confirmed\nAlertService     -> SMS to Ravi: Fee overdue\n\n# Without @Primary or @Qualifier, startup fails:\n# NoUniqueBeanDefinitionException: expected single matching bean but found 2",
      "mistakes": [
        "Using field injection, which prevents `final` fields and makes plain unit tests impossible.",
        "Two implementations of one interface with no `@Primary` or `@Qualifier`, causing `NoUniqueBeanDefinitionException` at startup.",
        "Storing mutable state in a singleton bean — it is shared across all concurrent requests.",
        "Instantiating a dependency with `new` inside a bean, which bypasses the container entirely.",
        "Circular constructor dependencies between two beans, which Spring Boot 2.6+ rejects at startup."
      ],
      "takeaways": [
        "IoC means the container supplies dependencies instead of the class creating them.",
        "Prefer constructor injection; it enables `final` fields and framework-free tests.",
        "Resolve ambiguity with `@Primary` or `@Qualifier`.",
        "Singleton is the default scope — keep those beans stateless."
      ]
    },
    {
      "id": "m16-l8",
      "title": "Lesson 16.8 Spring Boot Project Structure",
      "objectives": [
        "Lay out a project in conventional layers.",
        "Understand why DTOs exist."
      ],
      "theory": "Spring Boot does not force a structure, but there is a convention every team recognises. Following it means a new developer finds their way around in minutes.\n\nThe **layered** (package-by-layer) arrangement:\n\n```\ncom.skillofied.studentapi\n├── StudentApiApplication.java   <- main class, root package\n├── controller/    HTTP endpoints\n├── service/       business logic\n├── repository/    data access\n├── model/         JPA entities\n├── dto/           request and response shapes\n├── exception/     custom exceptions + @ControllerAdvice\n└── config/        @Configuration classes\n```\n\nThe non-negotiable rule: **the main class sits in the root package**, because `@ComponentScan` starts there. Anything in a sibling package is invisible to Spring.\n\nDependencies flow **strictly one way**: controller → service → repository. A repository must never call a service, and a controller must never touch a repository. This keeps layers independently testable and stops the codebase turning into a web of mutual calls.\n\n**Why DTOs?** It is tempting to return JPA entities straight from controllers, but that couples your public API to your database schema. Rename a column and you break every client. Worse, entities carry lazy associations that blow up during JSON serialisation, and they may contain fields — a password hash, an internal flag — that must never leave the server. A DTO is a plain object shaped for the API, mapped from the entity in the service layer.\n\nFor larger systems, **package-by-feature** (`student/`, `course/`, `enrolment/`, each containing its own controller, service and repository) scales better, because a change to one feature touches one directory instead of five.",
      "syntax": "com.skillofied.studentapi        <- @SpringBootApplication lives here\n  .controller  .service  .repository\n  .model  .dto  .exception  .config",
      "codeExample": "// ===== model/Student.java - the database shape =====\npackage com.skillofied.studentapi.model;\n\nimport jakarta.persistence.*;\n\n@Entity\n@Table(name = \"students\")\npublic class Student {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n    private String email;\n    private String passwordHash;   // must never reach a client\n    private String grade;\n\n    public Long getId() { return id; }\n    public String getName() { return name; }\n    public String getEmail() { return email; }\n    public String getGrade() { return grade; }\n    public void setName(String name) { this.name = name; }\n    public void setEmail(String email) { this.email = email; }\n    public void setGrade(String grade) { this.grade = grade; }\n}\n\n// ===== dto/StudentResponse.java - the API shape =====\npackage com.skillofied.studentapi.dto;\n\n// No passwordHash: the DTO decides what is public\npublic record StudentResponse(Long id, String name, String email, String grade) { }\n\n// ===== dto/StudentRequest.java =====\npackage com.skillofied.studentapi.dto;\n\nimport jakarta.validation.constraints.*;\n\npublic record StudentRequest(\n    @NotBlank(message = \"Name is required\")\n    String name,\n\n    @Email(message = \"Must be a valid email\")\n    String email,\n\n    @Pattern(regexp = \"[A-F][+-]?\", message = \"Grade must be A-F\")\n    String grade\n) { }\n\n// ===== service/StudentService.java - maps entity <-> DTO =====\npackage com.skillofied.studentapi.service;\n\nimport com.skillofied.studentapi.dto.*;\nimport com.skillofied.studentapi.model.Student;\nimport com.skillofied.studentapi.repository.StudentRepository;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\n\nimport java.util.List;\n\n@Service\npublic class StudentService {\n    private final StudentRepository repository;\n\n    public StudentService(StudentRepository repository) {\n        this.repository = repository;\n    }\n\n    @Transactional(readOnly = true)\n    public List<StudentResponse> findAll() {\n        return repository.findAll().stream().map(this::toDto).toList();\n    }\n\n    @Transactional\n    public StudentResponse create(StudentRequest request) {\n        Student entity = new Student();\n        entity.setName(request.name());\n        entity.setEmail(request.email());\n        entity.setGrade(request.grade());\n        return toDto(repository.save(entity));\n    }\n\n    // The boundary: entities stop here, DTOs travel outward\n    private StudentResponse toDto(Student s) {\n        return new StudentResponse(s.getId(), s.getName(), s.getEmail(), s.getGrade());\n    }\n}",
      "codeOutput": "student-api/\n├── src/main/java/com/skillofied/studentapi/\n│   ├── StudentApiApplication.java\n│   ├── controller/StudentController.java\n│   ├── service/StudentService.java\n│   ├── repository/StudentRepository.java\n│   ├── model/Student.java\n│   ├── dto/StudentRequest.java\n│   ├── dto/StudentResponse.java\n│   ├── exception/GlobalExceptionHandler.java\n│   └── config/SecurityConfig.java\n├── src/main/resources/application.properties\n└── pom.xml",
      "mistakes": [
        "Placing the main class in a sub-package, so component scanning misses everything above it.",
        "Returning JPA entities from controllers, coupling the API to the schema and risking leaked fields.",
        "Calling a repository directly from a controller and skipping the service layer.",
        "Creating a `util` package that becomes a dumping ground for unrelated code.",
        "Introducing a dependency from a lower layer up to a higher one."
      ],
      "takeaways": [
        "The main class belongs in the root package.",
        "Dependencies flow one way: controller → service → repository.",
        "DTOs decouple the API from the database schema and control what is exposed.",
        "Package-by-layer suits small projects; package-by-feature scales better."
      ]
    }
  ],
  exercise: {
    title: 'Build a REST controller with a service layer',
    description: 'Wire a thin controller to a service using constructor injection.',
    instructions: ['Create a @RestController with GET, POST and DELETE mappings under /api/students.', 'Inject the service through the constructor, not a field.', 'Return 201 with a Location header on create and 204 on delete.'],
    starterCode: '@RestController\n@RequestMapping("/api/students")\npublic class StudentController {\n\n    private final StudentService service;\n\n    // TODO: constructor injection\n\n    @GetMapping("/{id}")\n    public ResponseEntity<StudentDto> getOne(@PathVariable Long id) {\n        // TODO: return 200 or 404\n        return null;\n    }\n}',
    expectedOutput: 'POST /api/students -> 201 Created\nGET  /api/students/1 -> 200 OK\nDELETE /api/students/1 -> 204 No Content',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which annotation declares a REST API controller class?', options: ["A. @Controller", "B. @API", "C. @RequestMapping", "D. @RestController"], correctAnswer: "D. @RestController" },
    { id: 2, question: 'Which tool bootstraps Spring Boot starter projects?', options: ["A. Spring Initializr", "B. Maven builder", "C. NPM init", "D. Gradle daemon"], correctAnswer: "A. Spring Initializr" },
    { id: 3, question: 'Which annotation enables Dependency Injection in Spring?', options: ['A. @Inject', 'B. @Autowired', 'C. @Resource', 'D. @Bean'], correctAnswer: 'B. @Autowired' },
    { id: 4, question: 'What is the default embedded web server in Spring Boot?', options: ['A. Nginx', 'B. Jetty', 'C. Tomcat', 'D. GlassFish'], correctAnswer: 'C. Tomcat' },
    { id: 5, question: 'Which interface is commonly extended for repositories?', options: ["A. CrudRepository", "B. MongoRepository", "C. sqlRepository", "D. JpaRepository"], correctAnswer: "D. JpaRepository" },
    { id: 6, question: 'Which three annotations does @SpringBootApplication combine?', options: ["A. @Configuration, @EnableAutoConfiguration, @ComponentScan", "B. @Service, @Repository, @Controller", "C. @Bean, @Autowired, @Component", "D. @Component, @Autowired, @EnableWebMvc"], correctAnswer: 'A. @Configuration, @EnableAutoConfiguration, @ComponentScan' },
    { id: 7, question: 'Where must the main class be placed for component scanning to work?', options: ['A. In any package', 'B. In the root package above your components', 'C. In a sub-package', 'D. In the default package only'], correctAnswer: 'B. In the root package above your components' },
    { id: 8, question: 'What does @RestController add over @Controller?', options: ["A. Transaction support", "B. Security", "C. @ResponseBody on every method", "D. Caching"], correctAnswer: "C. @ResponseBody on every method" },
    { id: 9, question: 'Which annotation binds a URL path segment to a parameter?', options: ["A. @RequestParam", "B. @RequestBody", "C. @RequestHeader", "D. @PathVariable"], correctAnswer: "D. @PathVariable" },
    { id: 10, question: 'Which binds a query-string parameter?', options: ["A. @RequestParam", "B. @PathVariable", "C. @RequestBody", "D. @ModelAttribute"], correctAnswer: "A. @RequestParam" },
    { id: 11, question: 'Which HTTP status should a successful POST that creates a resource return?', options: ['A. 200', 'B. 201', 'C. 204', 'D. 302'], correctAnswer: 'B. 201' },
    { id: 12, question: 'Which status is correct for a successful DELETE with no body?', options: ['A. 200', 'B. 201', 'C. 204', 'D. 404'], correctAnswer: 'C. 204' },
    { id: 13, question: 'Which HTTP methods are idempotent?', options: ["A. POST only", "B. POST and PATCH", "C. None", "D. GET, PUT, DELETE"], correctAnswer: "D. GET, PUT, DELETE" },
    { id: 14, question: 'Which injection style is recommended?', options: ["A. Constructor injection", "B. Field injection", "C. Setter injection", "D. Static injection"], correctAnswer: "A. Constructor injection" },
    { id: 15, question: 'Why is field injection discouraged?', options: ["A. It is slower, because reflection runs on every access", "B. Fields cannot be final and testing without the framework is hard", "C. It is deprecated", "D. It causes memory leaks"], correctAnswer: 'B. Fields cannot be final and testing without the framework is hard' },
    { id: 16, question: 'What is the default bean scope?', options: ["A. prototype", "B. request", "C. singleton", "D. session"], correctAnswer: "C. singleton" },
    { id: 17, question: 'What must be true of a singleton bean?', options: ["A. It must be final", "B. It must be public", "C. It must implement Serializable", "D. It should be stateless"], correctAnswer: "D. It should be stateless" },
    { id: 18, question: 'Which annotation resolves ambiguity between two beans of the same type?', options: ["A. @Qualifier", "B. @Autowired", "C. @Bean", "D. @Scope"], correctAnswer: "A. @Qualifier" },
    { id: 19, question: 'What does @Transactional roll back on by default?', options: ['A. All exceptions', 'B. Unchecked exceptions only', 'C. Checked exceptions only', 'D. Nothing'], correctAnswer: 'B. Unchecked exceptions only' },
    { id: 20, question: 'Why does calling a @Transactional method from the same class fail to start a transaction?', options: ["A. It is a compile error", "B. Transactions are disabled", "C. The proxy is bypassed by self-invocation", "D. It always works"], correctAnswer: "C. The proxy is bypassed by self-invocation" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a simple REST controller that returns "Hello Spring" on /api/hello GET route.', language: 'java', starterCode: 'import org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api")\npublic class HelloController {\n    // GET /api/hello should return "Hello Spring"\n}', runnable: false },
      {
        kind: 'mcq',
        prompt: 'Why is constructor injection generally preferred over field injection with @Autowired in Spring Boot?',
        options: [
          "A. Constructor injection is faster, because Spring skips reflection when creating the bean at startup.",
          "B. Field injection is deprecated in Java 17 and throws a runtime exception.",
          "C. Constructor injection does not support lazy initialization.",
          "D. Constructor injection allows the class to declare dependencies as final (immutable), enforces required dependencies, and simplifies unit testing.",
        ],
        correctAnswer: "D. Constructor injection allows the class to declare dependencies as final (immutable), enforces required dependencies, and simplifies unit testing."
      }
    ]
  }
};

export default mod_m16;
