import type { ModuleData } from '../JavaCourseData';

const mod_m14: ModuleData = {
  id: 'm14',
  title: 'MODULE 14: JDBC (DATABASE CONNECTIVITY)',
  overview: 'Connect Java apps to databases using JDBC: Drivers, Connection, Statement, PreparedStatements, and ResultSets.',
  outcomes: [
    'Establish database connections via URL parameters.',
    'Execute SQL queries using PreparedStatements.',
    'Parse query results using ResultSet.'
  ],
  lessons: [
    {
      "id": "m14-l1",
      "title": "Lesson 14.1 Introduction to JDBC",
      "objectives": [
        "Explain what JDBC is and why it exists.",
        "Name the layers of the JDBC architecture."
      ],
      "theory": "**JDBC** (Java Database Connectivity) is the standard API for talking to relational databases from Java. Its central idea is *abstraction*: your code is written against interfaces in `java.sql`, and a vendor-supplied **driver** implements them. Swap MySQL for PostgreSQL and, in principle, only the connection URL and the dependency change.\n\nThe architecture has four layers:\n\n1. **Your application** — calls JDBC interfaces.\n2. **The JDBC API** (`java.sql`) — `Connection`, `Statement`, `PreparedStatement`, `ResultSet`. All interfaces, no implementation.\n3. **The driver** — a JAR such as `mysql-connector-j` or `postgresql`, which implements those interfaces over the database's wire protocol.\n4. **The database**.\n\nModern drivers are **Type 4**: pure Java, talking the native protocol directly with no native libraries or bridges. Since JDBC 4.0 drivers register themselves automatically via the service-loader mechanism, so the old `Class.forName(\"com.mysql.jdbc.Driver\")` incantation is no longer needed.\n\nAlmost every JDBC method throws the checked `SQLException`, so error handling is not optional.",
      "syntax": "// Core java.sql types\nConnection        // a session with the database\nPreparedStatement // a pre-compiled, parameterised SQL statement\nResultSet         // a cursor over the rows a query returned",
      "codeExample": "import java.sql.Connection;\nimport java.sql.DatabaseMetaData;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\n\npublic class JdbcIntro {\n    public static void main(String[] args) {\n        String url  = \"jdbc:mysql://localhost:3306/school\";\n        String user = \"root\";\n        String pass = \"password\";\n\n        try (Connection conn = DriverManager.getConnection(url, user, pass)) {\n            DatabaseMetaData meta = conn.getMetaData();\n\n            System.out.println(\"Driver name    : \" + meta.getDriverName());\n            System.out.println(\"Driver version : \" + meta.getDriverVersion());\n            System.out.println(\"Database       : \" + meta.getDatabaseProductName());\n            System.out.println(\"JDBC version   : \" + meta.getJDBCMajorVersion());\n            System.out.println(\"Auto-commit    : \" + conn.getAutoCommit());\n\n        } catch (SQLException e) {\n            System.out.println(\"SQL state \" + e.getSQLState() + \": \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Driver name    : MySQL Connector/J\nDriver version : mysql-connector-j-8.3.0\nDatabase       : MySQL\nJDBC version   : 4\nAuto-commit    : true",
      "mistakes": [
        "Forgetting to add the driver JAR to the classpath, producing \"No suitable driver found for jdbc:...\".",
        "Still writing `Class.forName(...)` — harmless but obsolete since JDBC 4.0.",
        "Catching `SQLException` and printing nothing; always log `getSQLState()` and `getErrorCode()`."
      ],
      "takeaways": [
        "JDBC is an interface layer; the driver supplies the implementation.",
        "Type 4 drivers are pure Java and register themselves automatically.",
        "`SQLException` is checked — every JDBC call must handle or declare it."
      ]
    },
    {
      "id": "m14-l2",
      "title": "Lesson 14.2 Database Setup",
      "objectives": [
        "Add a JDBC driver dependency.",
        "Build a correct connection URL.",
        "Keep credentials out of source code."
      ],
      "theory": "Before any Java code runs you need three things in place: a database, a driver on the classpath, and a correct URL.\n\n**The dependency.** With Maven, add `mysql:mysql-connector-j` or `org.postgresql:postgresql`. With Gradle it is a single `implementation` line. Without it the driver cannot register and `getConnection` fails.\n\n**The URL** follows the shape `jdbc:<subprotocol>://<host>:<port>/<database>?<params>`:\n\n- MySQL — `jdbc:mysql://localhost:3306/school?useSSL=false&serverTimezone=UTC`\n- PostgreSQL — `jdbc:postgresql://localhost:5432/school`\n- H2 in-memory (ideal for tests) — `jdbc:h2:mem:testdb`\n\n**Credentials.** Never hard-code a username and password into a class that goes into version control. Read them from environment variables or an external properties file that is listed in `.gitignore`. Leaked database credentials in public repositories are a routine cause of breaches.\n\nOne more production note: opening a connection is expensive — a TCP handshake plus authentication, often tens of milliseconds. Real applications use a **connection pool** such as HikariCP that keeps connections open and hands them out on demand.",
      "syntax": "<!-- Maven -->\n<dependency>\n  <groupId>com.mysql</groupId>\n  <artifactId>mysql-connector-j</artifactId>\n  <version>8.3.0</version>\n</dependency>",
      "codeExample": "import java.io.IOException;\nimport java.io.InputStream;\nimport java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\nimport java.sql.Statement;\nimport java.util.Properties;\n\npublic class DatabaseSetup {\n\n    // Credentials loaded from db.properties (which is gitignored),\n    // falling back to environment variables.\n    private static Properties loadConfig() throws IOException {\n        Properties props = new Properties();\n        try (InputStream in = DatabaseSetup.class.getResourceAsStream(\"/db.properties\")) {\n            if (in != null) {\n                props.load(in);\n            } else {\n                props.setProperty(\"db.url\",  System.getenv(\"DB_URL\"));\n                props.setProperty(\"db.user\", System.getenv(\"DB_USER\"));\n                props.setProperty(\"db.pass\", System.getenv(\"DB_PASS\"));\n            }\n        }\n        return props;\n    }\n\n    public static Connection getConnection() throws SQLException, IOException {\n        Properties p = loadConfig();\n        return DriverManager.getConnection(\n            p.getProperty(\"db.url\"),\n            p.getProperty(\"db.user\"),\n            p.getProperty(\"db.pass\"));\n    }\n\n    public static void main(String[] args) {\n        String ddl = \"CREATE TABLE IF NOT EXISTS students (\"\n                   + \"  id INT PRIMARY KEY AUTO_INCREMENT,\"\n                   + \"  name VARCHAR(100) NOT NULL,\"\n                   + \"  age INT,\"\n                   + \"  grade VARCHAR(5))\";\n\n        try (Connection conn = getConnection();\n             Statement stmt = conn.createStatement()) {\n\n            stmt.execute(ddl);\n            System.out.println(\"Schema ready. Connected to \" + conn.getCatalog());\n\n        } catch (SQLException | IOException e) {\n            System.out.println(\"Setup failed: \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Schema ready. Connected to school",
      "mistakes": [
        "Hard-coding credentials and committing them to Git.",
        "Wrong port — 3306 is MySQL, 5432 is PostgreSQL. Mixing them gives a confusing connection-refused error.",
        "Omitting `serverTimezone` on older MySQL drivers, which fails with a timezone error before any query runs.",
        "Opening a fresh connection per request in production instead of using a pool."
      ],
      "takeaways": [
        "Driver JAR on the classpath, correct URL, credentials from outside the source tree.",
        "URL shape: `jdbc:subprotocol://host:port/database?params`.",
        "Use H2 in-memory for tests and HikariCP for production pooling."
      ]
    },
    {
      "id": "m14-l3",
      "title": "Lesson 14.3 JDBC Connection",
      "objectives": [
        "Open a Connection with DriverManager.",
        "Close it reliably with try-with-resources.",
        "Control transactions."
      ],
      "theory": "A `Connection` is an open session with the database. `DriverManager.getConnection(url, user, password)` scans the registered drivers, picks the one that recognises the URL, authenticates, and hands you the session.\n\nA connection wraps a real network socket and a server-side session, so **leaking one is a genuine resource leak**. Databases cap concurrent connections (MySQL defaults to 151); leak enough and every subsequent request fails. `try-with-resources` is the correct default because it closes the connection even when an exception is thrown.\n\nBy default a connection is in **auto-commit** mode: each statement commits immediately. For a multi-statement operation that must succeed or fail as a unit — a bank transfer being the canonical example — call `setAutoCommit(false)`, run the statements, then `commit()`. If anything throws, `rollback()` in the catch block undoes the whole thing.\n\n`Connection` is also the factory for everything else: `createStatement()`, `prepareStatement(sql)`, and `getMetaData()`.",
      "syntax": "try (Connection conn = DriverManager.getConnection(url, user, pass)) {\n    conn.setAutoCommit(false);\n    // ... statements ...\n    conn.commit();\n}",
      "codeExample": "import java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.PreparedStatement;\nimport java.sql.SQLException;\n\npublic class ConnectionDemo {\n    private static final String URL  = \"jdbc:mysql://localhost:3306/bank\";\n    private static final String USER = \"root\";\n    private static final String PASS = \"password\";\n\n    public static void main(String[] args) {\n        transfer(101, 102, 5000.0);\n    }\n\n    static void transfer(int fromId, int toId, double amount) {\n        String debit  = \"UPDATE accounts SET balance = balance - ? WHERE id = ?\";\n        String credit = \"UPDATE accounts SET balance = balance + ? WHERE id = ?\";\n\n        Connection conn = null;\n        try {\n            conn = DriverManager.getConnection(URL, USER, PASS);\n            conn.setAutoCommit(false);          // begin transaction\n\n            try (PreparedStatement out = conn.prepareStatement(debit);\n                 PreparedStatement in  = conn.prepareStatement(credit)) {\n\n                out.setDouble(1, amount);\n                out.setInt(2, fromId);\n                out.executeUpdate();\n\n                in.setDouble(1, amount);\n                in.setInt(2, toId);\n                in.executeUpdate();\n            }\n\n            conn.commit();                      // both succeeded\n            System.out.println(\"Transferred \" + amount + \" from \" + fromId + \" to \" + toId);\n\n        } catch (SQLException e) {\n            if (conn != null) {\n                try {\n                    conn.rollback();            // undo the partial transfer\n                    System.out.println(\"Rolled back: \" + e.getMessage());\n                } catch (SQLException rollbackError) {\n                    System.out.println(\"Rollback failed: \" + rollbackError.getMessage());\n                }\n            }\n        } finally {\n            if (conn != null) {\n                try { conn.close(); } catch (SQLException ignored) { }\n            }\n        }\n    }\n}",
      "codeOutput": "Transferred 5000.0 from 101 to 102",
      "mistakes": [
        "Not closing connections, exhausting the database connection limit under load.",
        "Leaving auto-commit on for multi-statement operations, so a mid-way failure leaves the data half-updated.",
        "Calling `rollback()` outside a try-catch — it can throw too.",
        "Sharing one `Connection` across threads. `Connection` is not thread-safe; give each thread its own."
      ],
      "takeaways": [
        "`DriverManager.getConnection()` opens a session; try-with-resources closes it.",
        "Auto-commit is on by default — turn it off for transactions.",
        "`commit()` on success, `rollback()` in the catch block.",
        "One connection per thread; use a pool in production."
      ]
    },
    {
      "id": "m14-l4",
      "title": "Lesson 14.4 CRUD Operations",
      "objectives": [
        "Perform Create, Read, Update and Delete through JDBC.",
        "Choose between executeUpdate and executeQuery."
      ],
      "theory": "CRUD is the four operations every data-backed application performs, and JDBC maps each to SQL:\n\n- **Create** → `INSERT`\n- **Read** → `SELECT`\n- **Update** → `UPDATE`\n- **Delete** → `DELETE`\n\nTwo execution methods cover them:\n\n- **`executeUpdate()`** for INSERT, UPDATE, DELETE. It returns an `int` — the number of rows affected. Always check it: a return of `0` means your `WHERE` clause matched nothing, which is very often the actual bug rather than a thrown exception.\n- **`executeQuery()`** for SELECT. It returns a `ResultSet` cursor.\n\nWhen you insert a row with an auto-increment primary key you usually need the new ID. Ask for it with `prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)` and read it from `getGeneratedKeys()`.\n\nFor bulk work, **batching** is transformative. `addBatch()` queues statements and `executeBatch()` sends them in one network round trip; inserting a thousand rows one at a time versus in a batch is often a hundredfold difference.\n\nGood practice is to put all of this behind a **DAO** (Data Access Object) so SQL never leaks into business logic.",
      "syntax": "int rows = pstmt.executeUpdate();      // INSERT / UPDATE / DELETE\nResultSet rs = pstmt.executeQuery();   // SELECT",
      "codeExample": "import java.sql.*;\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class StudentDao {\n    private final Connection conn;\n\n    StudentDao(Connection conn) { this.conn = conn; }\n\n    // CREATE - returns the generated primary key\n    int insert(String name, int age, String grade) throws SQLException {\n        String sql = \"INSERT INTO students (name, age, grade) VALUES (?, ?, ?)\";\n        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {\n            ps.setString(1, name);\n            ps.setInt(2, age);\n            ps.setString(3, grade);\n            ps.executeUpdate();\n\n            try (ResultSet keys = ps.getGeneratedKeys()) {\n                return keys.next() ? keys.getInt(1) : -1;\n            }\n        }\n    }\n\n    // READ\n    List<String> findByGrade(String grade) throws SQLException {\n        String sql = \"SELECT id, name, age FROM students WHERE grade = ? ORDER BY name\";\n        List<String> results = new ArrayList<>();\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, grade);\n            try (ResultSet rs = ps.executeQuery()) {\n                while (rs.next()) {\n                    results.add(rs.getInt(\"id\") + \" - \" + rs.getString(\"name\")\n                              + \" (\" + rs.getInt(\"age\") + \")\");\n                }\n            }\n        }\n        return results;\n    }\n\n    // UPDATE - the row count tells you whether anything matched\n    boolean updateGrade(int id, String newGrade) throws SQLException {\n        String sql = \"UPDATE students SET grade = ? WHERE id = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, newGrade);\n            ps.setInt(2, id);\n            return ps.executeUpdate() > 0;\n        }\n    }\n\n    // DELETE\n    boolean delete(int id) throws SQLException {\n        try (PreparedStatement ps = conn.prepareStatement(\"DELETE FROM students WHERE id = ?\")) {\n            ps.setInt(1, id);\n            return ps.executeUpdate() > 0;\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(\n                 \"jdbc:mysql://localhost:3306/school\", \"root\", \"password\")) {\n\n            StudentDao dao = new StudentDao(conn);\n\n            int newId = dao.insert(\"Asha Nair\", 20, \"A\");\n            System.out.println(\"Inserted with id \" + newId);\n\n            System.out.println(\"Grade A students : \" + dao.findByGrade(\"A\"));\n            System.out.println(\"Update applied   : \" + dao.updateGrade(newId, \"A+\"));\n            System.out.println(\"Delete applied   : \" + dao.delete(newId));\n        }\n    }\n}",
      "codeOutput": "Inserted with id 7\nGrade A students : [7 - Asha Nair (20)]\nUpdate applied   : true\nDelete applied   : true",
      "mistakes": [
        "Calling `executeQuery()` for an INSERT (or `executeUpdate()` for a SELECT) — both throw `SQLException`.",
        "Ignoring the row count from `executeUpdate()`, so a no-op UPDATE looks like a success.",
        "Running a DELETE or UPDATE without a `WHERE` clause and modifying every row in the table.",
        "Inserting thousands of rows in a loop instead of batching them."
      ],
      "takeaways": [
        "`executeUpdate()` returns affected rows; `executeQuery()` returns a ResultSet.",
        "Use `RETURN_GENERATED_KEYS` to retrieve auto-increment IDs.",
        "Batch bulk writes with `addBatch()` / `executeBatch()`.",
        "Wrap data access in a DAO to keep SQL out of business logic."
      ]
    },
    {
      "id": "m14-l5",
      "title": "Lesson 14.5 Prepared Statements",
      "objectives": [
        "Prevent SQL injection.",
        "Bind parameters by 1-based index.",
        "Understand pre-compilation."
      ],
      "theory": "This is the most security-critical lesson in the module.\n\nA `Statement` executes SQL you have assembled by string concatenation. If any part of that string came from a user, the user controls your query. Given\n\n```\n\"SELECT * FROM users WHERE name = '\" + input + \"'\"\n```\n\na user who types `' OR '1'='1` turns the query into one that matches every row. Type `'; DROP TABLE users; --` and the table is gone. This is **SQL injection**, and it has topped the OWASP risk list for two decades.\n\n`PreparedStatement` eliminates it structurally. The SQL is sent to the database **first**, with `?` placeholders, and parsed into an execution plan. Values are then bound separately as **data**. Because the query structure is already fixed before any user value arrives, no input can alter it. A malicious string is simply searched for literally and matches nothing.\n\nTwo bonuses come along for free: the database can cache and reuse the compiled plan, so repeated execution is faster; and setters like `setDate` and `setString` handle escaping and type conversion for you.\n\nThe one gotcha worth memorising: **parameter indexes start at 1, not 0.**",
      "syntax": "String sql = \"SELECT * FROM users WHERE email = ? AND active = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, email);   // 1-based\nps.setBoolean(2, true);",
      "codeExample": "import java.sql.*;\n\npublic class PreparedStatementDemo {\n    static final String URL = \"jdbc:mysql://localhost:3306/school\";\n\n    // VULNERABLE - never write this\n    static void unsafeLogin(Connection conn, String user, String pass) throws SQLException {\n        String sql = \"SELECT * FROM users WHERE username = '\" + user\n                   + \"' AND password = '\" + pass + \"'\";\n        try (Statement stmt = conn.createStatement();\n             ResultSet rs = stmt.executeQuery(sql)) {\n            System.out.println(\"Unsafe query matched a row: \" + rs.next());\n        }\n    }\n\n    // SAFE - structure is fixed before any input is bound\n    static boolean safeLogin(Connection conn, String user, String pass) throws SQLException {\n        String sql = \"SELECT id FROM users WHERE username = ? AND password = ?\";\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            ps.setString(1, user);\n            ps.setString(2, pass);\n            try (ResultSet rs = ps.executeQuery()) {\n                return rs.next();\n            }\n        }\n    }\n\n    // Batching reuses one compiled plan across many executions\n    static void bulkInsert(Connection conn, String[][] rows) throws SQLException {\n        String sql = \"INSERT INTO students (name, age, grade) VALUES (?, ?, ?)\";\n        conn.setAutoCommit(false);\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            for (String[] row : rows) {\n                ps.setString(1, row[0]);\n                ps.setInt(2, Integer.parseInt(row[1]));\n                ps.setString(3, row[2]);\n                ps.addBatch();\n            }\n            int[] counts = ps.executeBatch();\n            conn.commit();\n            System.out.println(\"Batch inserted \" + counts.length + \" rows\");\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(URL, \"root\", \"password\")) {\n            String attack = \"' OR '1'='1\";\n\n            unsafeLogin(conn, attack, attack);\n            System.out.println(\"Safe query matched  : \" + safeLogin(conn, attack, attack));\n\n            bulkInsert(conn, new String[][] {\n                {\"Ravi\", \"21\", \"B\"}, {\"Meera\", \"22\", \"A\"}, {\"Dev\", \"20\", \"A\"}\n            });\n        }\n    }\n}",
      "codeOutput": "Unsafe query matched a row: true\nSafe query matched  : false\nBatch inserted 3 rows",
      "mistakes": [
        "Using index 0 for the first parameter. JDBC is 1-based and index 0 throws.",
        "Concatenating a value into the SQL string and then also using a PreparedStatement — the injection hole is still open.",
        "Putting a `?` where a table or column name goes. Placeholders bind values only; identifiers must be validated against a whitelist.",
        "Quoting the placeholder as `'?'` — it becomes a literal question-mark string."
      ],
      "takeaways": [
        "PreparedStatement makes SQL injection structurally impossible.",
        "Parameter indexes start at 1.",
        "Pre-compilation also makes repeated execution faster.",
        "Placeholders work for values, never for identifiers."
      ]
    },
    {
      "id": "m14-l6",
      "title": "Lesson 14.6 ResultSet",
      "objectives": [
        "Iterate a ResultSet cursor.",
        "Read typed columns and handle SQL NULL.",
        "Map rows to objects."
      ],
      "theory": "`executeQuery()` returns a **`ResultSet`** — a cursor over the rows the database matched, not a list in memory. The cursor starts positioned **before** the first row, which is why the idiom is `while (rs.next())`: each call advances one row and returns `false` when there are no more.\n\nRead columns with typed getters — `getInt`, `getString`, `getDouble`, `getBoolean`, `getDate`, `getTimestamp`. Address a column by **name** (`rs.getString(\"name\")`) for readability, or by 1-based index for a marginal speed gain.\n\n**SQL NULL needs care.** Primitive getters cannot represent it, so `getInt` on a NULL column returns `0` and `getDouble` returns `0.0` — indistinguishable from a genuine zero. To tell them apart, call the getter and then `rs.wasNull()`. For object getters like `getString` you simply get `null` back.\n\nA `ResultSet` is tied to its `Statement` and its `Connection`. Close the statement or the connection and the cursor dies, so **never return a live ResultSet from a DAO method**. Map the rows into your own objects inside the try block and return those instead.\n\nBy default the cursor is forward-only and read-only, which is the fastest mode and almost always what you want.",
      "syntax": "try (ResultSet rs = ps.executeQuery()) {\n    while (rs.next()) {\n        int id = rs.getInt(\"id\");\n        String name = rs.getString(\"name\");\n    }\n}",
      "codeExample": "import java.sql.*;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Student {\n    int id; String name; Integer age; String grade;\n\n    @Override\n    public String toString() {\n        return id + \" | \" + name + \" | \" + (age == null ? \"n/a\" : age) + \" | \" + grade;\n    }\n}\n\npublic class ResultSetDemo {\n\n    static List<Student> findAll(Connection conn) throws SQLException {\n        String sql = \"SELECT id, name, age, grade FROM students ORDER BY id\";\n        List<Student> students = new ArrayList<>();\n\n        try (PreparedStatement ps = conn.prepareStatement(sql);\n             ResultSet rs = ps.executeQuery()) {\n\n            while (rs.next()) {\n                Student s = new Student();\n                s.id    = rs.getInt(\"id\");\n                s.name  = rs.getString(\"name\");\n                s.grade = rs.getString(\"grade\");   // null-safe already\n\n                int rawAge = rs.getInt(\"age\");\n                s.age = rs.wasNull() ? null : rawAge;   // distinguish NULL from 0\n\n                students.add(s);\n            }\n        }\n        return students;   // safe: mapped objects, not a live cursor\n    }\n\n    static void describeColumns(Connection conn) throws SQLException {\n        try (PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM students LIMIT 1\");\n             ResultSet rs = ps.executeQuery()) {\n\n            ResultSetMetaData meta = rs.getMetaData();\n            for (int i = 1; i <= meta.getColumnCount(); i++) {\n                System.out.println(\"  \" + meta.getColumnName(i) + \" : \" + meta.getColumnTypeName(i));\n            }\n        }\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection conn = DriverManager.getConnection(\n                 \"jdbc:mysql://localhost:3306/school\", \"root\", \"password\")) {\n\n            System.out.println(\"Columns:\");\n            describeColumns(conn);\n\n            System.out.println(\"Rows:\");\n            findAll(conn).forEach(s -> System.out.println(\"  \" + s));\n        }\n    }\n}",
      "codeOutput": "Columns:\n  id : INT\n  name : VARCHAR\n  age : INT\n  grade : VARCHAR\nRows:\n  1 | Asha Nair | 20 | A\n  2 | Ravi Kumar | n/a | B\n  3 | Meera Das | 22 | A",
      "mistakes": [
        "Reading columns before calling `next()` — the cursor starts before the first row, so this throws.",
        "Treating `getInt()` returning 0 as a real value when the column was NULL. Check `wasNull()`.",
        "Returning the `ResultSet` from a method; it is dead as soon as the statement closes.",
        "Misspelling a column name, which throws at runtime rather than compile time."
      ],
      "takeaways": [
        "The cursor starts before row one; `next()` advances and reports whether a row exists.",
        "Use `wasNull()` after primitive getters to detect SQL NULL.",
        "Map rows to objects inside the try block and return those.",
        "`ResultSetMetaData` lets you inspect columns for generic tooling."
      ]
    }
  ],
  exercise: {
    title: 'Student DAO with PreparedStatement',
    description: 'Implement full CRUD against a students table using PreparedStatement throughout.',
    instructions: ['Use PreparedStatement for every query - never concatenate user input.', 'Retrieve the generated key after insert with RETURN_GENERATED_KEYS.', 'Check the row count from executeUpdate() to detect a no-op update.'],
    starterCode: 'import java.sql.*;\n\npublic class Solution {\n    static int insert(Connection conn, String name, int age) throws SQLException {\n        String sql = "INSERT INTO students (name, age) VALUES (?, ?)";\n        // TODO: prepare, bind (1-based!), execute, return the generated id\n        return -1;\n    }\n}',
    expectedOutput: 'Inserted with id 7\nRows updated: 1',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which interface manages SQL results rows?', options: ['A. Connection', 'B. PreparedStatement', 'C. ResultSet', 'D. Statement'], correctAnswer: 'C. ResultSet' },
    { id: 2, question: 'Why are PreparedStatements preferred over standard Statements?', options: ["A. They compile faster because they skip the SQL parser", "B. They do not require Connection objects", "C. They use lower memory", "D. They prevent SQL Injection and cache query execution plans"], correctAnswer: "D. They prevent SQL Injection and cache query execution plans" },
    { id: 3, question: 'What method runs SELECT queries?', options: ["A. executeQuery()", "B. executeUpdate()", "C. runSQL()", "D. getResults()"], correctAnswer: "A. executeQuery()" },
    { id: 4, question: 'Which JDBC url represents connection to MySQL?', options: ['A. jdbc:postgresql://...', 'B. jdbc:mysql://...', 'C. mysql:jdbc://...', 'D. db:mysql://...'], correctAnswer: 'B. jdbc:mysql://...' },
    { id: 5, question: 'What is the starting index of ResultSet columns?', options: ["A. 0", "B. -1", "C. 1", "D. depends on driver"], correctAnswer: "C. 1" },
    { id: 6, question: 'What is JDBC?', options: ["A. A database", "B. An ORM framework", "C. A database driver bundled with each vendor", "D. A standard Java API for relational database access"], correctAnswer: "D. A standard Java API for relational database access" },
    { id: 7, question: 'Which JDBC driver type is pure Java and speaks the native protocol?', options: ["A. Type 4", "B. Type 1", "C. Type 2", "D. Type 3"], correctAnswer: "A. Type 4" },
    { id: 8, question: 'At what index do PreparedStatement parameters start?', options: ['A. 0', 'B. 1', 'C. -1', 'D. Depends on the driver'], correctAnswer: 'B. 1' },
    { id: 9, question: 'Which class prevents SQL injection?', options: ["A. Statement", "B. ResultSet", "C. PreparedStatement", "D. Connection"], correctAnswer: "C. PreparedStatement" },
    { id: 10, question: 'Why does PreparedStatement prevent injection?', options: ["A. It escapes quote characters in each input value", "B. It encrypts input", "C. It blocks keywords", "D. The query structure is compiled before values are bound"], correctAnswer: "D. The query structure is compiled before values are bound" },
    { id: 11, question: 'Which method is used for INSERT, UPDATE and DELETE?', options: ["A. executeUpdate()", "B. executeQuery()", "C. execute()", "D. run()"], correctAnswer: "A. executeUpdate()" },
    { id: 12, question: 'What does executeUpdate() return?', options: ['A. A ResultSet', 'B. The number of affected rows', 'C. A boolean', 'D. void'], correctAnswer: 'B. The number of affected rows' },
    { id: 13, question: 'Where does the ResultSet cursor start?', options: ["A. On the first row", "B. On the last row", "C. Before the first row", "D. At index 0"], correctAnswer: "C. Before the first row" },
    { id: 14, question: 'How do you distinguish SQL NULL from 0 after `rs.getInt()`?', options: ["A. Compare to null", "B. Use getObject() only", "C. It is impossible", "D. Call rs.wasNull()"], correctAnswer: "D. Call rs.wasNull()" },
    { id: 15, question: 'Is it safe to return a live ResultSet from a DAO method?', options: ["A. No, it dies when the statement closes", "B. Yes", "C. Only for SELECT", "D. Only with try-with-resources"], correctAnswer: "A. No, it dies when the statement closes" },
    { id: 16, question: 'What is the default auto-commit setting on a new Connection?', options: ['A. false', 'B. true', 'C. Driver-dependent', 'D. Undefined'], correctAnswer: 'B. true' },
    { id: 17, question: 'Which method undoes an uncommitted transaction?', options: ["A. commit()", "B. close()", "C. rollback()", "D. reset()"], correctAnswer: "C. rollback()" },
    { id: 18, question: 'Which flag lets you retrieve an auto-increment ID after an insert?', options: ["A. FETCH_ID", "B. AUTO_INCREMENT", "C. GET_KEYS", "D. RETURN_GENERATED_KEYS"], correctAnswer: "D. RETURN_GENERATED_KEYS" },
    { id: 19, question: 'Which pair of methods sends many statements in one round trip?', options: ['A. addBatch() and executeBatch()', 'B. bulkInsert() and flush()', 'C. addAll() and commit()', 'D. prepare() and send()'], correctAnswer: 'A. addBatch() and executeBatch()' },
    { id: 20, question: 'Is a JDBC Connection thread-safe for sharing across threads?', options: ['A. Yes', 'B. No, give each thread its own', 'C. Only for reads', 'D. Only with synchronized'], correctAnswer: 'B. No, give each thread its own' }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a code snippet inserting student records using PreparedStatements.', language: 'java', starterCode: 'import java.sql.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Sketch a PreparedStatement query. This will not connect here,\n        // so focus on correct structure and parameter binding.\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'What is the primary role of DriverManager in Java Database Connectivity (JDBC)?',
        options: [
          "A. It compiles SQL queries to run on the database server.",
          "B. It pools open connections and hands out idle ones, closing any that exceed the pool limit.",
          "C. It manages the list of database drivers, matches connection requests with the appropriate driver, and establishes the connection.",
          "D. It handles database user authentication and security roles.",
        ],
        correctAnswer: 'C. It manages the list of database drivers, matches connection requests with the appropriate driver, and establishes the connection.'
      }
    ]
  }
};

export default mod_m14;
