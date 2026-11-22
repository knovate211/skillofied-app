import type { ModuleData } from '../GolangCourseData';

const mod_m14: ModuleData = {
  id: 'm14',
  title: 'MODULE 14: DATABASES',
  overview: 'Learn SQL connections, executing CRUD statements, managing transactions, running migrations, and repository pattern.',
  outcomes: ['Connect PostgreSQL connections pool', 'Execute SQL transactions rollback'],
  lessons: [
    { id: 'm14-l1', title: 'Lesson 14.1 SQL Basics', objectives: ['RDBMS specs'], theory: 'Understand relational database concepts: tables, schemas, primary and foreign keys, joins, and database normalization.', takeaways: ['Key database foundation.', 'Relational databases store structured data rows.'] },
    { id: 'm14-l2', title: 'Lesson 14.2 PostgreSQL Setup', objectives: ['Run Postgres container'], theory: 'Provision and configure PostgreSQL database instances inside Docker containers for local development.', takeaways: ['Simplifies environment configuration.', 'Postgres is a powerful open-source database.'] },
    { id: 'm14-l3', title: 'Lesson 14.3 Database Connections', objectives: ['Open connection pool'], theory: 'Open a connection pool to your database using the database/sql package and drivers like pgx.', syntax: `package main
import (
    "database/sql"
    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    db, _ := sql.Open("pgx", "postgres://user:pass@localhost:5432/db")
    defer db.Close()
}`, takeaways: ['Open database connection pools using: sql.Open()', 'The sql.DB object represents a pool of active connections.'] },
    { id: 'm14-l4', title: 'Lesson 14.4 CRUD Operations', objectives: ['Run CRUD queries'], theory: 'Query database rows using QueryRow() for single records and Query() for multiple records. Use Exec() to execute INSERT, UPDATE, and DELETE statements.', syntax: `var name string
err := db.QueryRow("SELECT name FROM users WHERE id = $1", 1).Scan(&name)`, takeaways: ['Query single rows using: db.QueryRow()', 'Always sanitize queries using placeholder parameters ($1) to prevent SQL injection.'] },
    { id: 'm14-l5', title: 'Lesson 14.5 Transactions', objectives: ['Execute SQL transactions'], theory: 'Use database transactions to group multiple database operations. Call db.Begin() to start a transaction, and execute Commit() or Rollback() to persist or discard the changes.', syntax: `tx, _ := db.Begin()
_, err := tx.Exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
if err != nil {
    tx.Rollback()
}
tx.Commit()`, takeaways: ['Transactions ensure atomic execution of multiple database updates.', 'Call tx.Rollback() if an error occurs to discard changes.'] },
    { id: 'm14-l6', title: 'Lesson 14.6 Migrations', objectives: ['Version schema updates'], theory: 'Track database schema changes over time using migration tools like golang-migrate. Migrations let you version database updates alongside your application code.', takeaways: ['Essential for version control.', 'golang-migrate is a popular database schema migration tool.'] },
    { id: 'm14-l7', title: 'Lesson 14.7 Repository Pattern', objectives: ['Isolate database queries'], theory: 'Isolate database queries from your core application logic by defining repository interfaces. This separates data storage concerns from business rules.', takeaways: ['Decouples data access from business logic.', 'Enables mock testing of application services.'] }
  ],
  quiz: [
    { id: 1, question: 'What is the purpose of using query placeholder parameters ($1, ?)?', options: ["To style query variables", "To prevent SQL Injection", "To improve search speed", "To format output values"], correctAnswer: "To prevent SQL Injection" },
    { id: 2, question: "Why reuse one *sql.DB instead of opening one per request?", options: ["Each Open leaks memory permanently", "It is a pooled handle meant to be long-lived", "Go allows only one Open", "It disables transactions otherwise"], correctAnswer: "It is a pooled handle meant to be long-lived" },
    { id: 3, question: "What should you do after querying rows with db.Query?", options: ["Nothing; rows close automatically", "Call db.Close()", "defer rows.Close() and check rows.Err()", "Restart the connection"], correctAnswer: "defer rows.Close() and check rows.Err()" },
    { id: 4, question: "What guarantees a transaction's statements succeed or fail together?", options: ["Running them in a goroutine", "Using prepared statements", "Setting a longer timeout", "Commit or Rollback on a sql.Tx"], correctAnswer: "Commit or Rollback on a sql.Tx" },
    { id: 5, question: "What problem do migrations solve?", options: ["Versioned, repeatable schema changes across environments", "Faster queries by rewriting slow SQL automatically", "Automatic index tuning", "Backing up production data"], correctAnswer: "Versioned, repeatable schema changes across environments" },
    { id: 6, question: "What does the repository pattern isolate?", options: ["HTTP routing from middleware", "Data-access code from business logic", "Tests from production code", "Goroutines from channels"], correctAnswer: "Data-access code from business logic" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write a UserRepository with UpdateProfile using pgx. Pass values as $1/$2 placeholders rather than building the SQL with fmt.Sprintf — that is what prevents SQL injection. Check the command tag\'s RowsAffected so updating a missing user reports an error instead of silently succeeding. Not runnable here: it needs a live Postgres connection.',
        language: 'go',
        starterCode: 'package repository\n\nimport (\n    "context"\n    "fmt"\n\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\ntype UserRepository struct {\n    pool *pgxpool.Pool\n}\n\nfunc (r *UserRepository) UpdateProfile(ctx context.Context, userID, name, bio string) error {\n    // UPDATE users SET name = $1, bio = $2 WHERE id = $3\n    // Use parameter placeholders, then check tag.RowsAffected() == 0\n    _ = fmt.Errorf\n    return nil\n}',
        runnable: false,
        examples: [
          { input: 'UpdateProfile(ctx, "unknown-id", "Aditi", "Backend dev")', output: 'error: no user with id unknown-id' }
        ]
      }
    ]
  }
};

export default mod_m14;
