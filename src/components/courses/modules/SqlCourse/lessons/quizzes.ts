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
    { id: 2, question: 'Two processes read the same CSV, each append a row, and each write the file back. What happens?', options: ['The second write overwrites the first, and one row is silently lost', 'Both rows are saved correctly', 'The operating system rejects the second write', 'The file is locked automatically'], correctAnswer: 'The second write overwrites the first, and one row is silently lost' },
    { id: 3, question: 'In the relational model, how does one table refer to a row in another table?', options: ['By storing the matching key value', 'By storing a disk address pointer', 'By storing the row number', 'By nesting the row inside it'], correctAnswer: 'By storing the matching key value' },
    { id: 4, question: 'What does a document database buy you by embedding an author inside every post?', options: ['Faster reads, at the cost of updating every copy when the author changes', 'Guaranteed consistency across all posts', 'Smaller storage than a relational schema', 'Automatic foreign key enforcement'], correctAnswer: 'Faster reads, at the cost of updating every copy when the author changes' },
    { id: 5, question: 'Which stage of query processing determines how fast a query runs?', options: ['The planner, which chooses the execution strategy', 'The parser, which validates syntax', 'The connection handshake', 'The result serialiser'], correctAnswer: 'The planner, which chooses the execution strategy' },
  ],

  // ── Module 2: Database Design Fundamentals ──
  'm2-quiz': [
    { id: 1, question: 'A query fails with "relation does not exist" even though you can see the table. What is the most likely cause?', options: ['You are in the wrong database, the wrong schema, or the name was created quoted with capitals', 'The table has no rows yet', 'The table has no primary key', 'Your user lacks a password'], correctAnswer: 'You are in the wrong database, the wrong schema, or the name was created quoted with capitals' },
    { id: 2, question: 'Why does WHERE dept_id = NULL return no rows?', options: ['NULL means unknown, so the comparison is UNKNOWN and never TRUE', 'NULL equals only itself, and no row stores that', 'It is a syntax error that returns empty', 'NULL is treated as zero, which no row matches'], correctAnswer: 'NULL means unknown, so the comparison is UNKNOWN and never TRUE' },
    { id: 3, question: 'Which type should store a monetary amount?', options: ['NUMERIC, because it is exact', 'FLOAT, because it is fast', 'DOUBLE PRECISION, for the extra range', 'REAL, because money needs decimals'], correctAnswer: 'NUMERIC, because it is exact' },
    { id: 4, question: 'What is the difference between TIMESTAMP and TIMESTAMPTZ?', options: ['TIMESTAMPTZ records an actual moment; TIMESTAMP records an ambiguous wall-clock reading', 'TIMESTAMPTZ is larger but otherwise identical', 'TIMESTAMP stores only the date', 'TIMESTAMPTZ cannot be indexed'], correctAnswer: 'TIMESTAMPTZ records an actual moment; TIMESTAMP records an ambiguous wall-clock reading' },
    { id: 5, question: 'What does ON DELETE CASCADE do when a parent row is deleted?', options: ['Deletes the child rows too, and any rows cascading from them', 'Blocks the delete while children exist', 'Sets the child foreign keys to NULL', 'Nothing until you run VACUUM'], correctAnswer: 'Deletes the child rows too, and any rows cascading from them' },
  ],

  // ── Module 3: SQL Commands Deep Dive ──
  'm3-quiz': [
    { id: 1, question: 'Which statement empties a table but leaves its structure in place?', options: ['TRUNCATE', 'DROP', 'DELETE FROM with no WHERE, which also drops indexes', 'ALTER TABLE CLEAR'], correctAnswer: 'TRUNCATE' },
    { id: 2, question: 'Adding a NOT NULL column with no DEFAULT to a table that already has rows will:', options: ['Fail, because the existing rows would violate the constraint', 'Succeed, filling existing rows with an empty string', 'Succeed, filling existing rows with NULL', 'Succeed only on an empty schema'], correctAnswer: 'Fail, because the existing rows would violate the constraint' },
    { id: 3, question: 'What does RETURNING add to an INSERT?', options: ['It returns the inserted rows, so a generated id needs no second query', 'It rolls the insert back if it conflicts', 'It returns the number of affected rows only', 'It repeats the insert on failure'], correctAnswer: 'It returns the inserted rows, so a generated id needs no second query' },
    { id: 4, question: 'You cannot use a SELECT alias in WHERE. Why?', options: ['WHERE is evaluated before SELECT, so the alias does not exist yet', 'Aliases are only valid in subqueries', 'WHERE only accepts literal values', 'Aliases must be double-quoted in WHERE'], correctAnswer: 'WHERE is evaluated before SELECT, so the alias does not exist yet' },
    { id: 5, question: 'What is wrong with LIMIT 10 with no ORDER BY?', options: ['The engine may return a different, arbitrary ten rows each time', 'It always returns the first ten rows inserted', 'It is a syntax error', 'It silently returns all rows'], correctAnswer: 'The engine may return a different, arbitrary ten rows each time' },
  ],

  // ── Module 4: Filtering & Operators ──
  'm4-quiz': [
    { id: 1, question: 'Which filter correctly selects every event that happened during January 2024?', options: ["created_at >= '2024-01-01' AND created_at < '2024-02-01'", "created_at BETWEEN '2024-01-01' AND '2024-01-31'", "DATE(created_at) = '2024-01'", "created_at LIKE '2024-01%'"], correctAnswer: "created_at >= '2024-01-01' AND created_at < '2024-02-01'" },
    { id: 2, question: 'WHERE dept_id <> 1 excludes the employee whose dept_id is NULL. Which operator includes them?', options: ['IS DISTINCT FROM', 'NOT LIKE', '!==', 'NOT BETWEEN'], correctAnswer: 'IS DISTINCT FROM' },
    { id: 3, question: 'What does WHERE dept_id = 1 OR dept_id = 2 AND salary > 70000 actually mean?', options: ['Everyone in dept 1, plus anyone in dept 2 earning over 70000', 'Everyone in dept 1 or 2 who earns over 70000', 'Everyone earning over 70000', 'It is a syntax error without brackets'], correctAnswer: 'Everyone in dept 1, plus anyone in dept 2 earning over 70000' },
    { id: 4, question: 'Why can WHERE name LIKE \'%smith%\' not use an ordinary B-Tree index?', options: ['A leading wildcard means the sort order gives no starting point', 'LIKE is never indexable', 'The index only stores exact values', 'Indexes ignore text columns'], correctAnswer: 'A leading wildcard means the sort order gives no starting point' },
    { id: 5, question: 'What is TRUE OR NULL?', options: ['TRUE, because the result cannot depend on the unknown', 'NULL, because any NULL propagates', 'FALSE', 'An error'], correctAnswer: 'TRUE, because the result cannot depend on the unknown' },
  ],

  // ── Module 5: SQL Functions ──
  'm5-quiz': [
    { id: 1, question: 'What does SELECT 7 / 2 return in SQL?', options: ['3, because integer divided by integer is an integer', '3.5', '4, rounded up', 'An error about implicit casting'], correctAnswer: '3, because integer divided by integer is an integer' },
    { id: 2, question: 'Which idiom prevents a division-by-zero error?', options: ['total / NULLIF(quantity, 0)', 'COALESCE(total / quantity, 0)', 'total / ABS(quantity)', 'ROUND(total / quantity, 2)'], correctAnswer: 'total / NULLIF(quantity, 0)' },
    { id: 3, question: 'If email is NULL, what does name || \' <\' || email || \'>\' produce?', options: ['NULL for the entire expression', 'The name followed by empty angle brackets', 'Just the name', 'An error'], correctAnswer: 'NULL for the entire expression' },
    { id: 4, question: 'Which function snaps a timestamp down to the first day of its month?', options: ["DATE_TRUNC('month', ts)", "EXTRACT(MONTH FROM ts)", "TO_CHAR(ts, 'YYYY-MM')", "AGE(ts, ts)"], correctAnswer: "DATE_TRUNC('month', ts)" },
    { id: 5, question: 'Where does SUBSTRING(s FROM 1 FOR 3) start?', options: ['At the first character — SQL strings are 1-indexed', 'At the second character — SQL strings are 0-indexed', 'At the last character', 'It depends on the collation'], correctAnswer: 'At the first character — SQL strings are 1-indexed' },
  ],

  // ── Module 6: Aggregation & Grouping ──
  'm6-quiz': [
    { id: 1, question: 'A table has 5 rows, one of which has a NULL dept_id. What do COUNT(*) and COUNT(dept_id) return?', options: ['5 and 4', '5 and 5', '4 and 4', '4 and 5'], correctAnswer: '5 and 4' },
    { id: 2, question: 'Why can WHERE not reference AVG(salary)?', options: ['WHERE runs before the aggregation, so the value does not exist yet', 'Aggregates are only allowed in SELECT', 'WHERE only accepts indexed columns', 'It can, if the column is grouped'], correctAnswer: 'WHERE runs before the aggregation, so the value does not exist yet' },
    { id: 3, question: 'Ratings are 5, 4, NULL and 3. What does AVG(rating) return?', options: ['4.0, because AVG divides by the three non-null values', '3.0, because the NULL counts as zero', 'NULL, because one value is NULL', '4.5'], correctAnswer: '4.0, because AVG divides by the three non-null values' },
    { id: 4, question: 'Every column in a SELECT with GROUP BY must be:', options: ['In the GROUP BY, or wrapped in an aggregate', 'Indexed', 'Listed in the ORDER BY too', 'Of a numeric type'], correctAnswer: 'In the GROUP BY, or wrapped in an aggregate' },
    { id: 5, question: 'How does GROUP BY treat rows whose grouping column is NULL?', options: ['They form a single group of their own', 'They are discarded', 'Each becomes its own group', 'The query errors'], correctAnswer: 'They form a single group of their own' },
  ],

  // ── Module 7: SQL Joins ──
  'm7-quiz': [
    { id: 1, question: 'An INNER JOIN between employees and departments drops two rows. Why?', options: ['An employee with no department and a department with no employees both lack a partner', 'INNER JOIN always limits the result to the smaller table', 'The join key was not indexed', 'Duplicate keys were removed'], correctAnswer: 'An employee with no department and a department with no employees both lack a partner' },
    { id: 2, question: 'You add WHERE d.city = \'Pune\' to a LEFT JOIN and the unmatched rows disappear. Why?', options: ['NULL fails the comparison, so WHERE removes the NULL-padded rows', 'LEFT JOIN only keeps unmatched rows when there is no WHERE at all', 'The join silently became a CROSS JOIN', 'WHERE runs before the join'], correctAnswer: 'NULL fails the comparison, so WHERE removes the NULL-padded rows' },
    { id: 3, question: 'How do you list every department including those with zero employees?', options: ['LEFT JOIN from departments and use COUNT(e.id)', 'INNER JOIN and use COUNT(*)', 'LEFT JOIN from departments and use COUNT(*)', 'CROSS JOIN the two tables'], correctAnswer: 'LEFT JOIN from departments and use COUNT(e.id)' },
    { id: 4, question: 'Which pattern finds customers who have never placed an order?', options: ['LEFT JOIN orders and filter WHERE orders.id IS NULL', 'INNER JOIN orders and filter WHERE orders.id IS NULL', 'FULL JOIN orders with no WHERE', 'CROSS JOIN orders and filter on NULL'], correctAnswer: 'LEFT JOIN orders and filter WHERE orders.id IS NULL' },
    { id: 5, question: 'A query joining two 100,000-row tables suddenly returns billions of rows. What is the likely cause?', options: ['The ON clause is missing, so it became a cross join', 'The tables need reindexing', 'One table has duplicate primary keys', 'The LIMIT was omitted'], correctAnswer: 'The ON clause is missing, so it became a cross join' },
  ],

  // ── Module 8: Subqueries ──
  'm8-quiz': [
    { id: 1, question: 'What makes a subquery correlated?', options: ['It references a column from the outer query, so it re-runs per outer row', 'It is nested more than two levels deep', 'It appears in the FROM clause', 'It returns more than one row'], correctAnswer: 'It references a column from the outer query, so it re-runs per outer row' },
    { id: 2, question: 'Why does WHERE id NOT IN (SELECT dept_id FROM employees) return zero rows when one dept_id is NULL?', options: ['Comparing against NULL yields UNKNOWN, so the condition is never TRUE', 'NOT IN rejects any subquery containing NULL as invalid', 'The subquery returns no rows at all', 'NULL is coerced to every possible id'], correctAnswer: 'Comparing against NULL yields UNKNOWN, so the condition is never TRUE' },
    { id: 3, question: 'Which is preferred for a correlated existence check on a large table?', options: ['NOT EXISTS, because it stops at the first match and handles NULL correctly', 'NOT IN, because it builds the whole set first', 'A CROSS JOIN with a filter', 'A HAVING clause'], correctAnswer: 'NOT EXISTS, because it stops at the first match and handles NULL correctly' },
    { id: 4, question: 'Two employees tie for the top salary. Which function makes the next distinct salary rank 2?', options: ['DENSE_RANK()', 'ROW_NUMBER()', 'RANK()', 'NTILE(2)'], correctAnswer: 'DENSE_RANK()' },
    { id: 5, question: 'What happens when a scalar subquery in a WHERE clause returns two rows?', options: ['It raises an error at runtime, not at parse time', 'It silently uses the first row', 'It returns no rows', 'The planner converts it to an IN'], correctAnswer: 'It raises an error at runtime, not at parse time' },
  ],

  // ── Module 9: Advanced SQL Concepts ──
  'm9-quiz': [
    { id: 1, question: 'Does replacing a five-table join with a view make queries faster?', options: ['No — a view stores the query, so every read costs the full join', 'Yes, the result is cached on disk', 'Yes, views are automatically indexed', 'Only in PostgreSQL'], correctAnswer: 'No — a view stores the query, so every read costs the full join' },
    { id: 2, question: 'What does a materialised view trade for its read speed?', options: ['Freshness — the data is stale until you refresh it', 'Type safety', 'The ability to be queried with SQL', 'Transactional consistency'], correctAnswer: 'Freshness — the data is stale until you refresh it' },
    { id: 3, question: 'Given an index on (user_id, status, placed_at), which query cannot use it?', options: ["WHERE status = 'paid'", 'WHERE user_id = 7', "WHERE user_id = 7 AND status = 'paid'", "WHERE user_id = 7 AND status = 'paid' AND placed_at > '2024-01-01'"], correctAnswer: "WHERE status = 'paid'" },
    { id: 4, question: 'In an EXPLAIN plan, estimated rows=5 but actual rows=50000. What should you do first?', options: ['Run ANALYZE to refresh the table statistics', 'Add an index on every column', 'Rewrite the query as a subquery', 'Increase shared_buffers'], correctAnswer: 'Run ANALYZE to refresh the table statistics' },
    { id: 5, question: 'Which foreign key columns does PostgreSQL index automatically?', options: ['None — only the referenced primary key is indexed', 'All of them', 'Only NOT NULL ones', 'Only those with ON DELETE CASCADE'], correctAnswer: 'None — only the referenced primary key is indexed' },
  ],

  // ── Module 10: Transactions & ACID ──
  'm10-quiz': [
    { id: 1, question: 'A transfer debits one account and the process dies before the credit. What prevents the money vanishing?', options: ['Atomicity — an uncommitted transaction is rolled back entirely', 'Durability — the write-ahead log replays the credit', 'Consistency — a CHECK constraint restores the balance', 'Isolation — no other session saw the debit'], correctAnswer: 'Atomicity — an uncommitted transaction is rolled back entirely' },
    { id: 2, question: 'Which mechanism makes a committed transaction survive a power cut?', options: ['The write-ahead log is flushed to disk before COMMIT returns', 'The data files are written synchronously on every row change', 'Shared buffers are mirrored to a second machine', 'VACUUM runs after each commit'], correctAnswer: 'The write-ahead log is flushed to disk before COMMIT returns' },
    { id: 3, question: 'Under PostgreSQL\'s default READ COMMITTED level, two identical SELECTs in one transaction can differ. Which level stops that?', options: ['REPEATABLE READ', 'READ UNCOMMITTED', 'AUTOCOMMIT', 'READ COMMITTED with a savepoint'], correctAnswer: 'REPEATABLE READ' },
    { id: 4, question: 'After an error inside a transaction, every later statement fails until you roll back. What lets you recover and continue?', options: ['A SAVEPOINT taken before the failing statement', 'Re-running the failing statement', 'Issuing COMMIT to clear the error', 'Switching isolation level'], correctAnswer: 'A SAVEPOINT taken before the failing statement' },
    { id: 5, question: 'Which structural change most reliably prevents deadlocks?', options: ['Acquiring locks in a consistent order everywhere', 'Increasing the deadlock timeout', 'Using SELECT FOR UPDATE on every read', 'Running everything at SERIALIZABLE'], correctAnswer: 'Acquiring locks in a consistent order everywhere' },
  ],

  // ── Module 11: Stored Procedures ──
  'm11-quiz': [
    { id: 1, question: 'Which is true of a procedure but not a function?', options: ['It can COMMIT and ROLLBACK inside itself', 'It can be called inside a SELECT list', 'It must return a value', 'It runs faster'], correctAnswer: 'It can COMMIT and ROLLBACK inside itself' },
    { id: 2, question: 'What goes wrong if you mark a function IMMUTABLE when it reads a table?', options: ['Its result can be cached or indexed, and becomes silently wrong when the table changes', 'PostgreSQL refuses to create it', 'It runs more slowly', 'It loses access to its parameters'], correctAnswer: 'Its result can be cached or indexed, and becomes silently wrong when the table changes' },
    { id: 3, question: 'Why should a PL/pgSQL parameter be named p_id rather than id?', options: ['A parameter named after a column makes WHERE id = id always true', 'Parameters cannot start with a letter', 'PostgreSQL reserves single-word names', 'It has no effect, only style'], correctAnswer: 'A parameter named after a column makes WHERE id = id always true' },
    { id: 4, question: 'What is the cost of a BEGIN ... EXCEPTION block inside a loop over a million rows?', options: ['Each iteration creates an implicit savepoint, which is slow', 'Nothing — exception blocks are free', 'It disables the query planner', 'It forces a table lock'], correctAnswer: 'Each iteration creates an implicit savepoint, which is slow' },
    { id: 5, question: 'Why should an audit trigger compare with IS DISTINCT FROM rather than <>?', options: ['<> misses a change from NULL to a value', '<> cannot compare numeric columns', 'IS DISTINCT FROM is faster', '<> is not valid inside a trigger'], correctAnswer: '<> misses a change from NULL to a value' },
  ],

  // ── Module 12: Database Relationships ──
  'm12-quiz': [
    { id: 1, question: 'What turns a one-to-many foreign key into a one-to-one relationship?', options: ['A UNIQUE constraint on the foreign key column', 'Making the column NOT NULL', 'Adding an index', 'Using ON DELETE CASCADE'], correctAnswer: 'A UNIQUE constraint on the foreign key column' },
    { id: 2, question: 'In a one-to-many relationship, which side holds the foreign key, and why?', options: ['The many side, because a column can hold only one value', 'The one side, because it owns the relationship', 'Both sides, for symmetry', 'Neither — a junction table is required'], correctAnswer: 'The many side, because a column can hold only one value' },
    { id: 3, question: 'What does the composite primary key (student_id, course_id) on a junction table guarantee?', options: ['A student cannot be enrolled in the same course twice', 'A student can take only one course', 'Enrolments are returned in order', 'The table needs no indexes'], correctAnswer: 'A student cannot be enrolled in the same course twice' },
    { id: 4, question: 'Why is unit_price stored on order_items rather than read from products?', options: ['An invoice is a historical fact and must not change when the catalogue does', 'Joins to products are too slow', 'products may be deleted', 'It saves storage'], correctAnswer: 'An invoice is a historical fact and must not change when the catalogue does' },
    { id: 5, question: 'You fetch 100 departments, then run one query per department for its employees. What is this called?', options: ['The N+1 query problem', 'A cross join', 'A correlated subquery', 'Connection thrashing'], correctAnswer: 'The N+1 query problem' },
  ],

  // ── Module 13: Normalization ──
  'm13-quiz': [
    { id: 1, question: 'A new instructor cannot be recorded because every row requires a student and a course. Which anomaly is this?', options: ['Insertion anomaly', 'Update anomaly', 'Deletion anomaly', 'Referential anomaly'], correctAnswer: 'Insertion anomaly' },
    { id: 2, question: 'What single root cause produces all three anomalies?', options: ['One fact stored in more than one place', 'Missing indexes', 'Too many tables', 'Nullable columns'], correctAnswer: 'One fact stored in more than one place' },
    { id: 3, question: 'A column holds "SQL, Python, Stats". Which normal form does this violate?', options: ['1NF, because the value is not atomic', '2NF, because of a partial dependency', '3NF, because of a transitive dependency', 'BCNF only'], correctAnswer: '1NF, because the value is not atomic' },
    { id: 4, question: 'When does 2NF apply at all?', options: ['Only when the primary key is composite', 'Only when the table has a foreign key', 'To every table without exception', 'Only when the table has more than ten columns'], correctAnswer: 'Only when the primary key is composite' },
    { id: 5, question: 'employees stores dept_name alongside dept_id. Which normal form is violated?', options: ['3NF — dept_name depends on dept_id, not on the employee', '1NF — the value is not atomic', '2NF — there is a partial dependency', 'None; this is correct'], correctAnswer: '3NF — dept_name depends on dept_id, not on the employee' },
  ],

  // ── Module 14: PostgreSQL Advanced ──
  'm14-quiz': [
    { id: 1, question: 'What is the main advantage of JSONB over JSON in PostgreSQL?', options: ['It is stored parsed, so it can be indexed and queried with operators', 'It preserves key order and whitespace', 'It enforces a schema', 'It uses less storage in every case'], correctAnswer: 'It is stored parsed, so it can be indexed and queried with operators' },
    { id: 2, question: 'A recursive CTE needs three parts. Which is the one people forget?', options: ['A termination condition, without which it loops forever', 'The UNION ALL', 'The anchor query', 'The WITH keyword'], correctAnswer: 'A termination condition, without which it loops forever' },
    { id: 3, question: 'How does SUM(salary) OVER (PARTITION BY dept_id) differ from GROUP BY dept_id?', options: ['It keeps every input row and attaches the total to each', 'It returns one row per department', 'It ignores NULL partitions', 'It is only valid in a subquery'], correctAnswer: 'It keeps every input row and attaches the total to each' },
    { id: 4, question: 'Adding ORDER BY inside an OVER clause with no explicit frame gives you:', options: ['A running total up to the current row, not the partition total', 'The partition total, just sorted', 'An error', 'A moving average'], correctAnswer: 'A running total up to the current row, not the partition total' },
    { id: 5, question: 'Why can you not filter on a window function result in WHERE?', options: ['Window functions are evaluated after WHERE, so wrap the query in a CTE', 'WHERE only accepts indexed columns', 'Window results are always NULL at that point', 'You can, with the WINDOW keyword'], correctAnswer: 'Window functions are evaluated after WHERE, so wrap the query in a CTE' },
  ],

  // ── Module 15: SQL for Backend Developers ──
  'm15-quiz': [
    { id: 1, question: 'Why must a transaction use pool.connect() rather than pool.query()?', options: ['A transaction lives on one connection, and pool.query may use a different one each call', 'pool.query cannot send BEGIN', 'pool.connect is faster', 'Transactions require a second pool'], correctAnswer: 'A transaction lives on one connection, and pool.query may use a different one each call' },
    { id: 2, question: 'What happens if client.release() is missing from the finally block?', options: ['A connection leaks per failed request until the pool drains and requests hang', 'The transaction stays open but the connection returns', 'Nothing — the garbage collector releases it', 'The next query throws immediately'], correctAnswer: 'A connection leaks per failed request until the pool drains and requests hang' },
    { id: 3, question: 'Can a $1 placeholder be used for a dynamic ORDER BY column?', options: ['No — placeholders bind values, not identifiers; use an allow-list', 'Yes, exactly like a value', 'Yes, if you quote it', 'Only in prepared statements'], correctAnswer: 'No — placeholders bind values, not identifiers; use an allow-list' },
    { id: 4, question: 'Why is a parameterised query safe from injection?', options: ['The query is planned before the value arrives, so input can never become code', 'The driver escapes every quote character', 'The database rejects long inputs', 'It runs inside a transaction'], correctAnswer: 'The query is planned before the value arrives, so input can never become code' },
    { id: 5, question: 'Why must CREATE INDEX CONCURRENTLY run outside a transaction block?', options: ['It cannot run inside one, and most migration tools wrap migrations in a transaction by default', 'It needs an exclusive table lock', 'It is only valid in psql', 'It requires superuser rights'], correctAnswer: 'It cannot run inside one, and most migration tools wrap migrations in a transaction by default' },
  ],

  // ── Module 16: Real World Projects ──
  'm16-quiz': [
    { id: 1, question: 'Why should order line items live in their own table rather than a JSON column on orders?', options: ['So each line can be joined, aggregated and constrained as real data', 'Because JSON cannot store numbers', 'To reduce storage', 'Because orders cannot have a JSONB column'], correctAnswer: 'So each line can be joined, aggregated and constrained as real data' },
    { id: 2, question: 'Which statement decrements stock safely under concurrency?', options: ['UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0', 'SELECT stock, check it in code, then UPDATE products SET stock = $2', 'UPDATE products SET stock = $2 WHERE id = $1', 'DELETE then INSERT the product row'], correctAnswer: 'UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0' },
    { id: 3, question: 'Why is ON DELETE RESTRICT correct for order_items.product_id?', options: ['Deleting a product must not erase what a customer bought', 'RESTRICT is faster than CASCADE', 'Products are never deleted anyway', 'It avoids needing an index'], correctAnswer: 'Deleting a product must not erase what a customer bought' },
    { id: 4, question: 'How do you enforce exactly one default address per user?', options: ['A partial unique index: CREATE UNIQUE INDEX ON addresses (user_id) WHERE is_default', 'A CHECK constraint on is_default', 'A UNIQUE constraint on is_default', 'A trigger is the only option'], correctAnswer: 'A partial unique index: CREATE UNIQUE INDEX ON addresses (user_id) WHERE is_default' },
    { id: 5, question: 'What does UNIQUE (course_id, position) on a modules table prevent?', options: ['Two modules claiming the same slot in one course', 'A course having more than one module', 'Modules being reordered', 'Duplicate module titles'], correctAnswer: 'Two modules claiming the same slot in one course' },
  ],

  // ── Module 17: Interview Preparation ──
  'm17-quiz': [
    { id: 1, question: 'Asked "how would you optimise this query?", what should the first step be?', options: ['Run EXPLAIN ANALYZE — measure before changing anything', 'Add an index on every column in the WHERE clause', 'Rewrite the joins as subqueries', 'Increase the connection pool size'], correctAnswer: 'Run EXPLAIN ANALYZE — measure before changing anything' },
    { id: 2, question: 'Counting with a LEFT JOIN, why use COUNT(e.id) instead of COUNT(*)?', options: ['COUNT(*) counts the NULL-padded row, reporting 1 where the answer is 0', 'COUNT(*) is slower', 'COUNT(*) ignores NULLs', 'COUNT(*) is invalid with a join'], correctAnswer: 'COUNT(*) counts the NULL-padded row, reporting 1 where the answer is 0' },
    { id: 3, question: 'Which pattern solves top-N per group?', options: ['ROW_NUMBER() OVER (PARTITION BY ...) in a CTE, filtered to rn <= N', 'GROUP BY with LIMIT N', 'DISTINCT with ORDER BY', 'A CROSS JOIN with HAVING'], correctAnswer: 'ROW_NUMBER() OVER (PARTITION BY ...) in a CTE, filtered to rn <= N' },
    { id: 4, question: 'In a gaps-and-islands problem, what identifies a run of consecutive days?', options: ['The date minus a row number is constant within a run', 'The difference between MIN and MAX dates', 'A recursive CTE is the only way', 'COUNT(DISTINCT date)'], correctAnswer: 'The date minus a row number is constant within a run' },
    { id: 5, question: 'Asked to scale a read-heavy database, which should you reach for last?', options: ['Sharding, because it complicates everything else', 'Adding an index', 'A read replica', 'Caching'], correctAnswer: 'Sharding, because it complicates everything else' },
  ],
};
