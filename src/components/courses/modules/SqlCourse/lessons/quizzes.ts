import { QuizQuestion } from '../../../../../types';

/**
 * Five questions per module, each drawn from something that module actually
 * teaches — several target the specific trap the lesson warns about, since
 * those are the ones worth checking a learner absorbed.
 *
 * `correctAnswer` is the authoring-time answer key. It is stripped from
 * production builds by the stripQuizAnswers Vite plugin and seeded server-side
 * by dashbord_backend/scripts/gen-quiz-seed.js — rerun that script after
 * editing anything here.
 */
export const sqlQuizzes: Record<string, QuizQuestion[]> = {
  // ── Module 1: Introduction & Fundamentals ──
  'm1-quiz': [
    { id: 1, question: 'Which kind of data is a relational database designed for?', options: ['Structured data with fixed, typed columns', 'Unstructured data such as images and audio', 'Only semi-structured JSON documents', 'Any data, with no distinction'], correctAnswer: 'Structured data with fixed, typed columns' },
    { id: 2, question: 'Two processes read the same CSV, each append a row, and each write the file back. What happens?', options: ["Both rows are saved correctly", "The second write overwrites the first, and one row is silently lost", "The operating system rejects the second write", "The file is locked automatically"], correctAnswer: "The second write overwrites the first, and one row is silently lost" },
    { id: 3, question: 'In the relational model, how does one table refer to a row in another table?', options: ["By storing a disk address pointer", "By storing the row number", "By storing the matching key value", "By nesting the row inside it"], correctAnswer: "By storing the matching key value" },
    { id: 4, question: 'What does a document database buy you by embedding an author inside every post?', options: ["Guaranteed consistency across all posts", "Smaller storage than a relational schema", "Automatic foreign key enforcement between posts and authors", "Faster reads, at the cost of updating every copy when the author changes"], correctAnswer: "Faster reads, at the cost of updating every copy when the author changes" },
    { id: 5, question: 'Which stage of query processing determines how fast a query runs?', options: ['The planner, which chooses the execution strategy', 'The parser, which validates syntax', 'The connection handshake', 'The result serialiser'], correctAnswer: 'The planner, which chooses the execution strategy' },
  ],

  // ── Module 2: Database Design Fundamentals ──
  'm2-quiz': [
    { id: 1, question: 'A query fails with "relation does not exist" even though you can see the table. What is the most likely cause?', options: ["The table has no rows yet, so the planner cannot find it", "You are in the wrong database, the wrong schema, or the name was created quoted with capitals", "The table has no primary key", "Your user lacks SELECT permission, which PostgreSQL reports as a missing table"], correctAnswer: "You are in the wrong database, the wrong schema, or the name was created quoted with capitals" },
    { id: 2, question: 'Why does WHERE dept_id = NULL return no rows?', options: ["NULL equals only itself, and no row stores that", "It is a syntax error that returns empty", "NULL means unknown, so the comparison is UNKNOWN and never TRUE", "NULL is treated as zero, which no row matches"], correctAnswer: "NULL means unknown, so the comparison is UNKNOWN and never TRUE" },
    { id: 3, question: 'Which type should store a monetary amount?', options: ["FLOAT, because it is fast", "DOUBLE PRECISION, for the extra range", "REAL, because money needs decimals", "NUMERIC, because it is exact"], correctAnswer: "NUMERIC, because it is exact" },
    { id: 4, question: 'What is the difference between TIMESTAMP and TIMESTAMPTZ?', options: ["TIMESTAMPTZ records an actual moment; TIMESTAMP records an ambiguous wall-clock reading", "TIMESTAMPTZ is larger but otherwise identical", "TIMESTAMP stores only the date", "TIMESTAMPTZ stores the zone name, so it cannot be indexed efficiently"], correctAnswer: 'TIMESTAMPTZ records an actual moment; TIMESTAMP records an ambiguous wall-clock reading' },
    { id: 5, question: 'What does ON DELETE CASCADE do when a parent row is deleted?', options: ["Blocks the delete while children exist", "Deletes the child rows too, and any rows cascading from them", "Sets the child foreign keys to NULL", "Deletes the parent only after its children are archived"], correctAnswer: "Deletes the child rows too, and any rows cascading from them" },
  ],

  // ── Module 3: SQL Commands Deep Dive ──
  'm3-quiz': [
    { id: 1, question: 'Which statement empties a table but leaves its structure in place?', options: ["DROP", "DELETE FROM with no WHERE, which also drops indexes", "TRUNCATE", "ALTER TABLE CLEAR"], correctAnswer: "TRUNCATE" },
    { id: 2, question: 'Adding a NOT NULL column with no DEFAULT to a table that already has rows will:', options: ["Succeed, filling existing rows with an empty string", "Succeed, filling existing rows with NULL", "Succeed only on an empty schema", "Fail, because the existing rows would violate the constraint"], correctAnswer: "Fail, because the existing rows would violate the constraint" },
    { id: 3, question: 'What does RETURNING add to an INSERT?', options: ["It returns the inserted rows, so a generated id needs no second query", "It rolls the insert back if it conflicts", "It returns the number of affected rows only", "It re-runs the insert when a conflict is detected"], correctAnswer: 'It returns the inserted rows, so a generated id needs no second query' },
    { id: 4, question: 'You cannot use a SELECT alias in WHERE. Why?', options: ["Aliases are only valid in subqueries", "WHERE is evaluated before SELECT, so the alias does not exist yet", "Aliases are resolved after ORDER BY, so WHERE cannot see them", "Aliases must be double-quoted in WHERE"], correctAnswer: "WHERE is evaluated before SELECT, so the alias does not exist yet" },
    { id: 5, question: 'What is wrong with LIMIT 10 with no ORDER BY?', options: ["It always returns the first ten rows inserted", "It is a syntax error", "The engine may return a different, arbitrary ten rows each time", "It silently returns all rows"], correctAnswer: "The engine may return a different, arbitrary ten rows each time" },
  ],

  // ── Module 4: Filtering & Operators ──
  'm4-quiz': [
    { id: 1, question: 'Which filter correctly selects every event that happened during January 2024?', options: ["created_at BETWEEN '2024-01-01' AND '2024-01-31'", "DATE(created_at) = '2024-01'", "created_at LIKE '2024-01%'", "created_at >= '2024-01-01' AND created_at < '2024-02-01'"], correctAnswer: "created_at >= '2024-01-01' AND created_at < '2024-02-01'" },
    { id: 2, question: 'WHERE dept_id <> 1 excludes the employee whose dept_id is NULL. Which operator includes them?', options: ['IS DISTINCT FROM', 'NOT LIKE', '!==', 'NOT BETWEEN'], correctAnswer: 'IS DISTINCT FROM' },
    { id: 3, question: 'What does WHERE dept_id = 1 OR dept_id = 2 AND salary > 70000 actually mean?', options: ["Everyone in dept 1 or 2 who earns over 70000", "Everyone in dept 1, plus anyone in dept 2 earning over 70000", "Everyone earning over 70000", "It is a syntax error without brackets"], correctAnswer: "Everyone in dept 1, plus anyone in dept 2 earning over 70000" },
    { id: 4, question: 'Why can WHERE name LIKE \'%smith%\' not use an ordinary B-Tree index?', options: ["LIKE cannot use any index, with or without wildcards", "The index only stores exact values", "A leading wildcard means the sort order gives no starting point", "Indexes ignore text columns"], correctAnswer: "A leading wildcard means the sort order gives no starting point" },
    { id: 5, question: 'What is TRUE OR NULL?', options: ["NULL, because any NULL propagates", "FALSE, since OR with an unknown operand cannot be proven true", "An error", "TRUE, because the result cannot depend on the unknown"], correctAnswer: "TRUE, because the result cannot depend on the unknown" },
  ],

  // ── Module 5: SQL Functions ──
  'm5-quiz': [
    { id: 1, question: 'What does SELECT 7 / 2 return in SQL?', options: ["3, because integer divided by integer is an integer", "3.5, because SQL division always returns a decimal", "4, rounded up", "An error about implicit casting"], correctAnswer: '3, because integer divided by integer is an integer' },
    { id: 2, question: 'Which idiom prevents a division-by-zero error?', options: ["COALESCE(total / quantity, 0)", "total / NULLIF(quantity, 0)", "total / ABS(quantity)", "ROUND(total / quantity, 2)"], correctAnswer: "total / NULLIF(quantity, 0)" },
    { id: 3, question: 'If email is NULL, what does name || \' <\' || email || \'>\' produce?', options: ["The name followed by empty angle brackets", "Just the name", "NULL for the entire expression", "An error"], correctAnswer: "NULL for the entire expression" },
    { id: 4, question: 'Which function snaps a timestamp down to the first day of its month?', options: ["EXTRACT(MONTH FROM ts)", "TO_CHAR(ts, 'YYYY-MM')", "AGE(ts, ts)", "DATE_TRUNC('month', ts)"], correctAnswer: "DATE_TRUNC('month', ts)" },
    { id: 5, question: 'Where does SUBSTRING(s FROM 1 FOR 3) start?', options: ['At the first character — SQL strings are 1-indexed', 'At the second character — SQL strings are 0-indexed', 'At the last character', 'It depends on the collation'], correctAnswer: 'At the first character — SQL strings are 1-indexed' },
  ],

  // ── Module 6: Aggregation & Grouping ──
  'm6-quiz': [
    { id: 1, question: 'A table has 5 rows, one of which has a NULL dept_id. What do COUNT(*) and COUNT(dept_id) return?', options: ["5 and 5", "5 and 4", "4 and 4", "4 and 5"], correctAnswer: "5 and 4" },
    { id: 2, question: 'Why can WHERE not reference AVG(salary)?', options: ["Aggregates are only allowed in SELECT", "WHERE only accepts indexed columns", "WHERE runs before the aggregation, so the value does not exist yet", "It can, as long as salary appears in GROUP BY"], correctAnswer: "WHERE runs before the aggregation, so the value does not exist yet" },
    { id: 3, question: 'Ratings are 5, 4, NULL and 3. What does AVG(rating) return?', options: ["3.0, because the NULL counts as zero", "NULL, because one value is NULL", "4.5", "4.0, because AVG divides by the three non-null values"], correctAnswer: "4.0, because AVG divides by the three non-null values" },
    { id: 4, question: 'Every column in a SELECT with GROUP BY must be:', options: ['In the GROUP BY, or wrapped in an aggregate', 'Indexed', 'Listed in the ORDER BY too', 'Of a numeric type'], correctAnswer: 'In the GROUP BY, or wrapped in an aggregate' },
    { id: 5, question: 'How does GROUP BY treat rows whose grouping column is NULL?', options: ["They are discarded", "They form a single group of their own", "Each becomes its own group", "The query errors"], correctAnswer: "They form a single group of their own" },
  ],

  // ── Module 7: SQL Joins ──
  'm7-quiz': [
    { id: 1, question: 'An INNER JOIN between employees and departments drops two rows. Why?', options: ["INNER JOIN always limits the result to the smaller table", "The join key was not indexed", "An employee with no department and a department with no employees both lack a partner", "Rows with duplicate department ids were collapsed into one"], correctAnswer: "An employee with no department and a department with no employees both lack a partner" },
    { id: 2, question: 'You add WHERE d.city = \'Pune\' to a LEFT JOIN and the unmatched rows disappear. Why?', options: ["LEFT JOIN only keeps unmatched rows when there is no WHERE at all", "The join silently became a CROSS JOIN", "WHERE runs before the join", "NULL fails the comparison, so WHERE removes the NULL-padded rows"], correctAnswer: "NULL fails the comparison, so WHERE removes the NULL-padded rows" },
    { id: 3, question: 'How do you list every department including those with zero employees?', options: ['LEFT JOIN from departments and use COUNT(e.id)', 'INNER JOIN and use COUNT(*)', 'LEFT JOIN from departments and use COUNT(*)', 'CROSS JOIN the two tables'], correctAnswer: 'LEFT JOIN from departments and use COUNT(e.id)' },
    { id: 4, question: 'Which pattern finds customers who have never placed an order?', options: ["INNER JOIN orders and filter WHERE orders.id IS NULL", "LEFT JOIN orders and filter WHERE orders.id IS NULL", "FULL JOIN orders with no WHERE", "CROSS JOIN orders and filter on NULL"], correctAnswer: "LEFT JOIN orders and filter WHERE orders.id IS NULL" },
    { id: 5, question: 'A query joining two 100,000-row tables suddenly returns billions of rows. What is the likely cause?', options: ["The tables need reindexing", "One table has duplicate primary keys", "The ON clause is missing, so it became a cross join", "The LIMIT was omitted"], correctAnswer: "The ON clause is missing, so it became a cross join" },
  ],

  // ── Module 8: Subqueries ──
  'm8-quiz': [
    { id: 1, question: 'What makes a subquery correlated?', options: ["It is nested more than two levels deep", "It appears in the FROM clause", "It returns more than one row, so it runs once per result", "It references a column from the outer query, so it re-runs per outer row"], correctAnswer: "It references a column from the outer query, so it re-runs per outer row" },
    { id: 2, question: 'Why does WHERE id NOT IN (SELECT dept_id FROM employees) return zero rows when one dept_id is NULL?', options: ['Comparing against NULL yields UNKNOWN, so the condition is never TRUE', 'NOT IN rejects any subquery containing NULL as invalid', 'The subquery returns no rows at all', 'NULL is coerced to every possible id'], correctAnswer: 'Comparing against NULL yields UNKNOWN, so the condition is never TRUE' },
    { id: 3, question: 'Which is preferred for a correlated existence check on a large table?', options: ["NOT IN, because it builds the whole set first", "NOT EXISTS, because it stops at the first match and handles NULL correctly", "A CROSS JOIN with a filter", "A LEFT JOIN with GROUP BY and HAVING COUNT(*) = 0 on every row"], correctAnswer: "NOT EXISTS, because it stops at the first match and handles NULL correctly" },
    { id: 4, question: 'Two employees tie for the top salary. Which function makes the next distinct salary rank 2?', options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE(2)"], correctAnswer: "DENSE_RANK()" },
    { id: 5, question: 'What happens when a scalar subquery in a WHERE clause returns two rows?', options: ["It silently uses the first row", "It returns no rows", "The planner converts it to an IN", "It raises an error at runtime, not at parse time"], correctAnswer: "It raises an error at runtime, not at parse time" },
  ],

  // ── Module 9: Advanced SQL Concepts ──
  'm9-quiz': [
    { id: 1, question: 'Does replacing a five-table join with a view make queries faster?', options: ["No — a view stores the query, so every read costs the full join", "Yes, the result is cached on disk", "Yes, views are automatically indexed", "Only in PostgreSQL, which inlines views into the plan"], correctAnswer: 'No — a view stores the query, so every read costs the full join' },
    { id: 2, question: 'What does a materialised view trade for its read speed?', options: ["Type safety", "Freshness — the data is stale until you refresh it", "The ability to be queried with SQL", "Transactional consistency"], correctAnswer: "Freshness — the data is stale until you refresh it" },
    { id: 3, question: 'Given an index on (user_id, status, placed_at), which query cannot use it?', options: ["WHERE user_id = 7", "WHERE user_id = 7 AND status = 'paid'", "WHERE status = 'paid'", "WHERE user_id = 7 AND status = 'paid' AND placed_at > '2024-01-01'"], correctAnswer: "WHERE status = 'paid'" },
    { id: 4, question: 'In an EXPLAIN plan, estimated rows=5 but actual rows=50000. What should you do first?', options: ["Add an index on every column", "Rewrite the query as a subquery", "Increase shared_buffers", "Run ANALYZE to refresh the table statistics"], correctAnswer: "Run ANALYZE to refresh the table statistics" },
    { id: 5, question: 'Which foreign key columns does PostgreSQL index automatically?', options: ['None — only the referenced primary key is indexed', 'All of them', 'Only NOT NULL ones', 'Only those with ON DELETE CASCADE'], correctAnswer: 'None — only the referenced primary key is indexed' },
  ],

  // ── Module 10: Transactions & ACID ──
  'm10-quiz': [
    { id: 1, question: 'A transfer debits one account and the process dies before the credit. What prevents the money vanishing?', options: ["Durability — the write-ahead log replays the credit", "Atomicity — an uncommitted transaction is rolled back entirely", "Consistency — a CHECK constraint restores the balance", "Isolation — no other session saw the debit"], correctAnswer: "Atomicity — an uncommitted transaction is rolled back entirely" },
    { id: 2, question: 'Which mechanism makes a committed transaction survive a power cut?', options: ["The data files are written synchronously on every row change", "Shared buffers are mirrored to a second machine", "The write-ahead log is flushed to disk before COMMIT returns", "VACUUM runs after each commit"], correctAnswer: "The write-ahead log is flushed to disk before COMMIT returns" },
    { id: 3, question: 'Under PostgreSQL\'s default READ COMMITTED level, two identical SELECTs in one transaction can differ. Which level stops that?', options: ["READ UNCOMMITTED", "AUTOCOMMIT", "READ COMMITTED with a savepoint", "REPEATABLE READ"], correctAnswer: "REPEATABLE READ" },
    { id: 4, question: 'After an error inside a transaction, every later statement fails until you roll back. What lets you recover and continue?', options: ['A SAVEPOINT taken before the failing statement', 'Re-running the failing statement', 'Issuing COMMIT to clear the error', 'Switching isolation level'], correctAnswer: 'A SAVEPOINT taken before the failing statement' },
    { id: 5, question: 'Which structural change most reliably prevents deadlocks?', options: ["Increasing the deadlock timeout", "Acquiring locks in a consistent order everywhere", "Using SELECT FOR UPDATE on every read", "Running everything at SERIALIZABLE"], correctAnswer: "Acquiring locks in a consistent order everywhere" },
  ],

  // ── Module 11: Stored Procedures ──
  'm11-quiz': [
    { id: 1, question: 'Which is true of a procedure but not a function?', options: ["It can be called inside a SELECT list", "It must return a value", "It can COMMIT and ROLLBACK inside itself", "It runs faster"], correctAnswer: "It can COMMIT and ROLLBACK inside itself" },
    { id: 2, question: 'What goes wrong if you mark a function IMMUTABLE when it reads a table?', options: ["PostgreSQL refuses to create it", "It runs more slowly, because every call re-plans the query", "It loses access to its parameters", "Its result can be cached or indexed, and becomes silently wrong when the table changes"], correctAnswer: "Its result can be cached or indexed, and becomes silently wrong when the table changes" },
    { id: 3, question: 'Why should a PL/pgSQL parameter be named p_id rather than id?', options: ["A parameter named after a column makes WHERE id = id always true", "Parameters cannot start with a letter", "PostgreSQL reserves single-word names", "It avoids a clash with PostgreSQL reserved words like id"], correctAnswer: 'A parameter named after a column makes WHERE id = id always true' },
    { id: 4, question: 'What is the cost of a BEGIN ... EXCEPTION block inside a loop over a million rows?', options: ["Nothing — exception blocks are free", "Each iteration creates an implicit savepoint, which is slow", "It disables the query planner", "It takes a lock on the whole table for each iteration"], correctAnswer: "Each iteration creates an implicit savepoint, which is slow" },
    { id: 5, question: 'Why should an audit trigger compare with IS DISTINCT FROM rather than <>?', options: ["<> cannot compare numeric columns", "IS DISTINCT FROM is faster", "<> misses a change from NULL to a value", "<> is not valid inside a trigger"], correctAnswer: "<> misses a change from NULL to a value" },
  ],

  // ── Module 12: Database Relationships ──
  'm12-quiz': [
    { id: 1, question: 'What turns a one-to-many foreign key into a one-to-one relationship?', options: ["Making the column NOT NULL", "Adding an index", "Using ON DELETE CASCADE", "A UNIQUE constraint on the foreign key column"], correctAnswer: "A UNIQUE constraint on the foreign key column" },
    { id: 2, question: 'In a one-to-many relationship, which side holds the foreign key, and why?', options: ['The many side, because a column can hold only one value', 'The one side, because it owns the relationship', 'Both sides, for symmetry', 'Neither — a junction table is required'], correctAnswer: 'The many side, because a column can hold only one value' },
    { id: 3, question: 'What does the composite primary key (student_id, course_id) on a junction table guarantee?', options: ["A student can take only one course", "A student cannot be enrolled in the same course twice", "Enrolments are returned in order", "The table needs no indexes"], correctAnswer: "A student cannot be enrolled in the same course twice" },
    { id: 4, question: 'Why is unit_price stored on order_items rather than read from products?', options: ["Joins to products are too slow", "products may be deleted", "An invoice is a historical fact and must not change when the catalogue does", "It saves storage, since prices repeat less often than products"], correctAnswer: "An invoice is a historical fact and must not change when the catalogue does" },
    { id: 5, question: 'You fetch 100 departments, then run one query per department for its employees. What is this called?', options: ["A cross join", "A correlated subquery", "Connection thrashing", "The N+1 query problem"], correctAnswer: "The N+1 query problem" },
  ],

  // ── Module 13: Normalization ──
  'm13-quiz': [
    { id: 1, question: 'A new instructor cannot be recorded because every row requires a student and a course. Which anomaly is this?', options: ['Insertion anomaly', 'Update anomaly', 'Deletion anomaly', 'Referential anomaly'], correctAnswer: 'Insertion anomaly' },
    { id: 2, question: 'What single root cause produces all three anomalies?', options: ["Missing indexes on the columns used to join tables", "One fact stored in more than one place", "Too many tables", "Nullable columns"], correctAnswer: "One fact stored in more than one place" },
    { id: 3, question: 'A column holds "SQL, Python, Stats". Which normal form does this violate?', options: ["2NF, because of a partial dependency", "3NF, because of a transitive dependency", "1NF, because the value is not atomic", "BCNF only"], correctAnswer: "1NF, because the value is not atomic" },
    { id: 4, question: 'When does 2NF apply at all?', options: ["Only when the table has a foreign key", "To every table without exception", "Only when the table has more than ten columns", "Only when the primary key is composite"], correctAnswer: "Only when the primary key is composite" },
    { id: 5, question: 'employees stores dept_name alongside dept_id. Which normal form is violated?', options: ["3NF — dept_name depends on dept_id, not on the employee", "1NF — the value is not atomic", "2NF — there is a partial dependency", "None; storing both is standard denormalisation within 3NF"], correctAnswer: '3NF — dept_name depends on dept_id, not on the employee' },
  ],

  // ── Module 14: PostgreSQL Advanced ──
  'm14-quiz': [
    { id: 1, question: 'What is the main advantage of JSONB over JSON in PostgreSQL?', options: ["It preserves key order and whitespace", "It is stored parsed, so it can be indexed and queried with operators", "It enforces a schema, rejecting documents with unknown keys", "It uses less storage in every case"], correctAnswer: "It is stored parsed, so it can be indexed and queried with operators" },
    { id: 2, question: 'A recursive CTE needs three parts. Which is the one people forget?', options: ["The WITH RECURSIVE keyword pair, without which it errors", "The anchor query", "A termination condition, without which it loops forever", "The WITH keyword"], correctAnswer: "A termination condition, without which it loops forever" },
    { id: 3, question: 'How does SUM(salary) OVER (PARTITION BY dept_id) differ from GROUP BY dept_id?', options: ["It returns one row per department", "It drops rows whose dept_id is NULL before summing each department", "It is only valid in a subquery", "It keeps every input row and attaches the total to each"], correctAnswer: "It keeps every input row and attaches the total to each" },
    { id: 4, question: 'Adding ORDER BY inside an OVER clause with no explicit frame gives you:', options: ["A running total up to the current row, not the partition total", "The partition total, just sorted", "An error, because OVER needs an explicit ROWS frame", "A moving average"], correctAnswer: 'A running total up to the current row, not the partition total' },
    { id: 5, question: 'Why can you not filter on a window function result in WHERE?', options: ["WHERE only accepts indexed columns", "Window functions are evaluated after WHERE, so wrap the query in a CTE", "Window results are always NULL at that point", "You can, by naming the window with the WINDOW clause first"], correctAnswer: "Window functions are evaluated after WHERE, so wrap the query in a CTE" },
  ],

  // ── Module 15: SQL for Backend Developers ──
  'm15-quiz': [
    { id: 1, question: 'Why must a transaction use pool.connect() rather than pool.query()?', options: ["pool.query cannot send BEGIN", "pool.connect opens a dedicated pool that is faster for writes", "A transaction lives on one connection, and pool.query may use a different one each call", "Transactions require a second pool"], correctAnswer: "A transaction lives on one connection, and pool.query may use a different one each call" },
    { id: 2, question: 'What happens if client.release() is missing from the finally block?', options: ["The transaction stays open but the connection returns", "Nothing — the garbage collector releases it", "The next query throws immediately", "A connection leaks per failed request until the pool drains and requests hang"], correctAnswer: "A connection leaks per failed request until the pool drains and requests hang" },
    { id: 3, question: 'Can a $1 placeholder be used for a dynamic ORDER BY column?', options: ["No — placeholders bind values, not identifiers; use an allow-list", "Yes, exactly like a value", "Yes, if the column name is passed as a quoted string value", "Only in prepared statements"], correctAnswer: 'No — placeholders bind values, not identifiers; use an allow-list' },
    { id: 4, question: 'Why is a parameterised query safe from injection?', options: ["The driver escapes every quote character", "The query is planned before the value arrives, so input can never become code", "The database rejects long inputs", "Parameterised queries run inside an implicit transaction"], correctAnswer: "The query is planned before the value arrives, so input can never become code" },
    { id: 5, question: 'Why must CREATE INDEX CONCURRENTLY run outside a transaction block?', options: ["It needs an exclusive table lock", "It blocks all writes while building, so it must run outside to avoid deadlocks", "It cannot run inside one, and most migration tools wrap migrations in a transaction by default", "It requires superuser rights"], correctAnswer: "It cannot run inside one, and most migration tools wrap migrations in a transaction by default" },
  ],

  // ── Module 16: Real World Projects ──
  'm16-quiz': [
    { id: 1, question: 'Why should order line items live in their own table rather than a JSON column on orders?', options: ["Because JSON cannot store numbers", "To reduce storage, since JSON repeats key names per line", "Because orders cannot have a JSONB column", "So each line can be joined, aggregated and constrained as real data"], correctAnswer: "So each line can be joined, aggregated and constrained as real data" },
    { id: 2, question: 'Which statement decrements stock safely under concurrency?', options: ['UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0', 'SELECT stock, check it in code, then UPDATE products SET stock = $2', 'UPDATE products SET stock = $2 WHERE id = $1', 'DELETE then INSERT the product row'], correctAnswer: 'UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0' },
    { id: 3, question: 'Why is ON DELETE RESTRICT correct for order_items.product_id?', options: ["RESTRICT is faster than CASCADE", "Deleting a product must not erase what a customer bought", "Products are never deleted anyway", "It keeps order_items smaller by blocking new product rows"], correctAnswer: "Deleting a product must not erase what a customer bought" },
    { id: 4, question: 'How do you enforce exactly one default address per user?', options: ["A CHECK constraint on is_default", "A UNIQUE constraint on is_default", "A partial unique index: CREATE UNIQUE INDEX ON addresses (user_id) WHERE is_default", "A trigger, since constraints cannot reference other rows"], correctAnswer: "A partial unique index: CREATE UNIQUE INDEX ON addresses (user_id) WHERE is_default" },
    { id: 5, question: 'What does UNIQUE (course_id, position) on a modules table prevent?', options: ["A course having more than one module", "Modules being reordered", "Duplicate module titles", "Two modules claiming the same slot in one course"], correctAnswer: "Two modules claiming the same slot in one course" },
  ],

  // ── Module 17: Interview Preparation ──
  'm17-quiz': [
    { id: 1, question: 'Asked "how would you optimise this query?", what should the first step be?', options: ['Run EXPLAIN ANALYZE — measure before changing anything', 'Add an index on every column in the WHERE clause', 'Rewrite the joins as subqueries', 'Increase the connection pool size'], correctAnswer: 'Run EXPLAIN ANALYZE — measure before changing anything' },
    { id: 2, question: 'Counting with a LEFT JOIN, why use COUNT(e.id) instead of COUNT(*)?', options: ["COUNT(*) is slower on a LEFT JOIN because it scans every column", "COUNT(*) counts the NULL-padded row, reporting 1 where the answer is 0", "COUNT(*) ignores NULLs", "COUNT(*) is invalid with a join"], correctAnswer: "COUNT(*) counts the NULL-padded row, reporting 1 where the answer is 0" },
    { id: 3, question: 'Which pattern solves top-N per group?', options: ["GROUP BY the group, then LIMIT N inside each group", "DISTINCT with ORDER BY", "ROW_NUMBER() OVER (PARTITION BY ...) in a CTE, filtered to rn <= N", "A CROSS JOIN with HAVING"], correctAnswer: "ROW_NUMBER() OVER (PARTITION BY ...) in a CTE, filtered to rn <= N" },
    { id: 4, question: 'In a gaps-and-islands problem, what identifies a run of consecutive days?', options: ["The difference between MIN and MAX dates", "A recursive CTE is the only way", "COUNT(DISTINCT date)", "The date minus a row number is constant within a run"], correctAnswer: "The date minus a row number is constant within a run" },
    { id: 5, question: 'Asked to scale a read-heavy database, which should you reach for last?', options: ["Sharding, because it complicates everything else", "Adding an index", "A read replica", "Adding an index, because indexes slow down every write"], correctAnswer: 'Sharding, because it complicates everything else' },
  ],
};
