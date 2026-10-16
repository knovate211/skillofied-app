import { AssignmentQuestion } from '../../../shared/ModuleAssignment';

export interface AssignmentContent {
  title: string;
  questions: AssignmentQuestion[];
}

/**
 * The tables every task runs against, in the runner's fixture format (see
 * execution-service/runners/sql/harness.py). employees and departments hold
 * exactly the rows the lessons reason about, so a learner is never asked to
 * query data they have not already seen — and the deliberate gaps survive:
 * Eli has no department, Legal has no employees, Ravi has no orders, and one
 * order is cancelled.
 */
const TABLES = {
  employees: [
    { id: 1, name: 'Ana Iyer', dept_id: 1, salary: 92000, hired_on: '2021-03-14' },
    { id: 2, name: 'Bo Chen', dept_id: 1, salary: 78000, hired_on: '2022-07-01' },
    { id: 3, name: 'Cy Das', dept_id: 2, salary: 64000, hired_on: '2020-11-23' },
    { id: 4, name: 'Dia Rao', dept_id: 2, salary: 64000, hired_on: '2023-01-09' },
    { id: 5, name: 'Eli Roy', dept_id: null, salary: 51000, hired_on: '2023-06-30' },
  ],
  departments: [
    { id: 1, name: 'Engineering', city: 'Pune' },
    { id: 2, name: 'Sales', city: 'Mumbai' },
    { id: 3, name: 'Legal', city: 'Delhi' },
  ],
  users: [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', city: 'Pune', created_at: '2024-01-05' },
    { id: 2, name: 'John Smith', email: 'john@example.com', city: 'Mumbai', created_at: '2024-02-11' },
    { id: 3, name: 'Asha Nair', email: 'asha@example.com', city: 'Pune', created_at: '2024-03-02' },
    { id: 4, name: 'Ravi Kumar', email: 'ravi@example.com', city: 'Delhi', created_at: '2024-03-18' },
  ],
  orders: [
    { id: 1, user_id: 1, total: 120.5, status: 'paid', placed_on: '2024-04-02' },
    { id: 2, user_id: 1, total: 45.0, status: 'paid', placed_on: '2024-04-19' },
    { id: 3, user_id: 2, total: 310.75, status: 'paid', placed_on: '2024-05-07' },
    { id: 4, user_id: 3, total: 89.99, status: 'cancelled', placed_on: '2024-05-21' },
    { id: 5, user_id: 2, total: 210.0, status: 'paid', placed_on: '2024-06-03' },
  ],
  order_items: [
    { order_id: 1, product: 'Keyboard', quantity: 1, unit_price: 120.5 },
    { order_id: 2, product: 'Cable', quantity: 3, unit_price: 15.0 },
    { order_id: 3, product: 'Monitor', quantity: 1, unit_price: 310.75 },
    { order_id: 4, product: 'Mouse', quantity: 1, unit_price: 89.99 },
    { order_id: 5, product: 'Headset', quantity: 2, unit_price: 105.0 },
  ],
};

/**
 * A deliberately un-normalised table, used only by Module 13. The Premium plan
 * is stored with two different prices — the update anomaly the module is about,
 * left in the data so the learner can find it with a query rather than be told.
 */
const WATCH_HISTORY_BAD = [
  { user_id: 1, user_email: 'jane@example.com', plan_name: 'Premium', plan_price: 649, movie_title: 'Inception', movie_genre: 'Sci-Fi', director_name: 'Nolan', watched_at: '2024-05-01' },
  { user_id: 1, user_email: 'jane@example.com', plan_name: 'Premium', plan_price: 649, movie_title: 'Tenet', movie_genre: 'Sci-Fi', director_name: 'Nolan', watched_at: '2024-05-03' },
  { user_id: 2, user_email: 'john@example.com', plan_name: 'Premium', plan_price: 799, movie_title: 'Dune', movie_genre: 'Sci-Fi', director_name: 'Villeneuve', watched_at: '2024-05-04' },
  { user_id: 3, user_email: 'asha@example.com', plan_name: 'Basic', plan_price: 199, movie_title: 'Arrival', movie_genre: 'Sci-Fi', director_name: 'Villeneuve', watched_at: '2024-05-06' },
];

/** Repeated at the top of every editor so the schema is always in view. */
const SCHEMA_HEADER = [
  '-- employees(id, name, dept_id, salary, hired_on)   -- Eli Roy has dept_id NULL',
  '-- departments(id, name, city)                      -- Legal has no employees',
  '-- users(id, name, email, city, created_at)         -- Ravi has no orders',
  '-- orders(id, user_id, total, status, placed_on)    -- order 4 is cancelled',
  '-- order_items(order_id, product, quantity, unit_price)',
  '',
].join('\n');

interface TaskOptions {
  /** Extra fixture tables for a module that needs them. */
  extra?: Record<string, unknown[]>;
  /** For DDL/DML tasks: the query whose output is shown after the statement runs. */
  verify?: string;
  /** Extra schema notes shown above the starter code. */
  header?: string;
}

/**
 * Every assignment task is a runnable problem in the IDE — the learner writes
 * real SQL against real rows and presses Run. `expected` is the spec: nothing
 * is auto-graded (a mentor reviews submissions), so the task has to say plainly
 * what a correct result looks like.
 */
const task = (
  prompt: string,
  expected: string,
  starter: string,
  opts: TaskOptions = {},
): AssignmentQuestion => ({
  kind: 'code',
  prompt,
  language: 'sql',
  starterCode: (opts.header ? `${opts.header}\n` : '') + SCHEMA_HEADER + starter,
  fixture: JSON.stringify({
    tables: { ...TABLES, ...(opts.extra ?? {}) },
    ...(opts.verify ? { verify: opts.verify } : {}),
  }),
  examples: [
    {
      input: opts.verify ? 'Run your statement, then the tables are read back' : 'The fixture tables above',
      output: expected,
    },
  ],
});

export const sqlAssignments: Record<string, AssignmentContent> = {
  // ── Module 1 → Lessons 1.1–1.7 ──
  'm1-assignment': {
    title: 'Practice: Your First Queries',
    questions: [
      task(
        'Confirm your environment works. Return every column of every department, ordered by id.',
        '3 rows: Engineering/Pune, Sales/Mumbai, Legal/Delhi',
        'SELECT\nFROM\nORDER BY;',
      ),
      task(
        'Structured data is queryable by column. Return the name and salary of every employee earning more than 60000, highest paid first.',
        '4 rows: Ana Iyer 92000, Bo Chen 78000, then the two 64000 rows',
        'SELECT\nFROM\nWHERE\nORDER BY;',
      ),
      task(
        'Return a single row holding the number of employees, labelled headcount.',
        '1 row: headcount = 5',
        'SELECT\nFROM;',
      ),
      task(
        'Return the name and hire date of everyone hired during 2023. Use a half-open date range rather than BETWEEN.',
        '2 rows: Dia Rao 2023-01-09, Eli Roy 2023-06-30',
        "SELECT\nFROM\nWHERE  hired_on >= ''\n  AND  hired_on <  '';",
      ),
      task(
        'Lesson 1.3 said relationships are stored as matching values, not pointers. Prove it: return the name and dept_id of every employee whose dept_id actually exists in departments.',
        '4 rows — Eli Roy is excluded, because a NULL dept_id matches no department',
        'SELECT\nFROM\nWHERE  dept_id IN (SELECT ... );',
      ),
    ],
  },

  // ── Module 2 → Lessons 2.1–2.4 ──
  'm2-assignment': {
    title: 'Practice: Schema, Types and NULL',
    questions: [
      task(
        'Create a `students` table with: an auto-generated integer primary key, a name that cannot be null, an email that must be unique, and an enrolled_on date defaulting to today. Then insert two students.',
        '2 rows: Ana Iyer / ana@uni.edu and Bo Chen / bo@uni.edu',
        "CREATE TABLE students (\n  -- your columns here\n);\n\nINSERT INTO students (name, email) VALUES\n  ('Ana Iyer', 'ana@uni.edu'),\n  ('Bo Chen',  'bo@uni.edu');",
        { verify: 'SELECT name, email FROM students ORDER BY name' },
      ),
      task(
        'Eli Roy has no department. Return the name and dept_id of every employee whose department is unknown. Remember that = NULL will not work.',
        '1 row: Eli Roy, dept_id NULL',
        'SELECT\nFROM\nWHERE;',
      ),
      task(
        "Return every employee's name alongside their department id shown as the text 'unassigned' when it is NULL. Alias that column as dept.",
        "5 rows; Ana/Bo show 1, Cy/Dia show 2, Eli shows 'unassigned'",
        'SELECT\nFROM;',
      ),
      task(
        'Return every employee NOT in department 1 — and include Eli Roy, whose department is unknown. Use the NULL-safe comparison from Lesson 4.1.',
        '3 rows: Cy Das, Dia Rao, Eli Roy',
        'SELECT\nFROM\nWHERE;',
      ),
      task(
        'Money must be exact. Return each employee with their salary cast to NUMERIC(12,2) as exact_salary, and their annual pay (salary × 12) as annual_pay.',
        '5 rows; Ana Iyer shows 92000.00 and 1104000',
        'SELECT\nFROM\nORDER BY;',
      ),
    ],
  },

  // ── Module 3 → Lessons 3.1–3.3 ──
  'm3-assignment': {
    title: 'Practice: DDL, DML and DQL',
    questions: [
      task(
        'Create both sides of a relationship, parent first. `clients` needs an identity primary key and a unique name; `projects` needs an identity primary key, a NOT NULL title, a client_id referencing clients(id), and a budget NUMERIC(10,2) that must be positive. Then insert the rows below and confirm the join works.',
        '2 rows: Billing rewrite → Meridian Bank, Sales dashboard → Northwind',
        "-- The parent must exist before the child can reference it, and the\n-- referenced column must be a PRIMARY KEY or UNIQUE.\nCREATE TABLE clients (\n  -- your columns here\n);\n\nCREATE TABLE projects (\n  -- your columns here\n);\n\nINSERT INTO clients (name) VALUES ('Meridian Bank'), ('Northwind');\n\nINSERT INTO projects (title, client_id, budget) VALUES\n  ('Billing rewrite', 1, 250000),\n  ('Sales dashboard', 2, 80000);",
        { verify: 'SELECT p.title, c.name AS client, p.budget FROM projects p JOIN clients c ON c.id = p.client_id ORDER BY p.title' },
      ),
      task(
        'Give every Engineering employee (dept_id = 1) a 10% raise. Predict how many rows will change before you run it.',
        'Ana Iyer becomes 101200, Bo Chen becomes 85800; the other three are unchanged',
        'UPDATE employees\nSET \nWHERE ;',
        { verify: 'SELECT name, salary FROM employees ORDER BY id' },
      ),
      task(
        'Cancelled orders should not sit in the live table. Delete every order whose status is cancelled.',
        '4 rows remain: orders 1, 2, 3 and 5',
        'DELETE FROM orders\nWHERE ;',
        { verify: 'SELECT id, user_id, total, status FROM orders ORDER BY id' },
      ),
      task(
        'Return the three highest-paid employees — name and salary only, highest first.',
        '3 rows: Ana Iyer 92000, Bo Chen 78000, then one 64000 row',
        'SELECT\nFROM\nORDER BY\nLIMIT;',
      ),
      task(
        'Return every distinct salary in the company, lowest first.',
        '4 rows: 51000, 64000, 78000, 92000 — Cy and Dia share a salary',
        'SELECT\nFROM\nORDER BY;',
      ),
    ],
  },

  // ── Module 4 → Lessons 4.1–4.3 ──
  'm4-assignment': {
    title: 'Practice: Filtering and Operators',
    questions: [
      task(
        'Return the name and salary of everyone earning between 64000 and 78000 inclusive, highest first.',
        '3 rows: Bo Chen 78000, then the two 64000 rows',
        'SELECT\nFROM\nWHERE\nORDER BY;',
      ),
      task(
        'Return everyone in Engineering or Sales (dept_id 1 or 2) who earns more than 70000. Mind your bracketing — AND binds tighter than OR.',
        '2 rows: Ana Iyer, Bo Chen',
        'SELECT\nFROM\nWHERE ( ... ) AND ...;',
      ),
      task(
        'Return every employee whose name contains a lowercase "a". LIKE is case-sensitive in PostgreSQL.',
        '3 rows: Ana Iyer, Cy Das, Dia Rao',
        "SELECT\nFROM\nWHERE  name LIKE '';",
      ),
      task(
        'Return every employee whose department is not 1, including Eli Roy whose department is unknown.',
        '3 rows: Cy Das, Dia Rao, Eli Roy',
        'SELECT\nFROM\nWHERE;',
      ),
      task(
        'Return every order placed during May 2024. Use a half-open range so the last day is not silently dropped.',
        '2 rows: order 3 (2024-05-07) and order 4 (2024-05-21)',
        "SELECT\nFROM\nWHERE  placed_on >= ''\n  AND  placed_on <  '';",
      ),
    ],
  },

  // ── Module 5 → Lessons 5.1–5.3 ──
  'm5-assignment': {
    title: 'Practice: String, Numeric and Date Functions',
    questions: [
      task(
        'For each employee return their full name, their first name and last name as separate columns, and the character length of the full name. Use SPLIT_PART.',
        '5 rows; Ana Iyer → Ana / Iyer / 8',
        'SELECT\nFROM\nORDER BY id;',
      ),
      task(
        "Return each employee's name and the percentage their salary is of total payroll, rounded to one decimal place. Beware integer division.",
        '5 rows; Ana Iyer ≈ 26.4, Eli Roy ≈ 14.6',
        'SELECT\nFROM\nORDER BY;',
      ),
      task(
        'For every order item return the order id, product, and the unit cost computed as unit_price / quantity — guarded so a zero quantity would return NULL rather than raising an error.',
        '5 rows; Cable (3 × 15.00) gives 5.00',
        'SELECT\nFROM\nORDER BY order_id;',
      ),
      task(
        'Return each employee with their hire date truncated to the first of its month, and the calendar year as an integer. Order by hire date.',
        '5 rows; Cy Das → 2020-11-01 and 2020',
        'SELECT\nFROM\nORDER BY;',
      ),
      task(
        "Build a display label for each employee: their name in upper case, then their city in brackets, using 'No city' when they have no department. Alias it as label.",
        "5 rows; Ana Iyer → 'ANA IYER (Pune)', Eli Roy → 'ELI ROY (No city)'",
        'SELECT\nFROM\nLEFT JOIN\nORDER BY;',
      ),
    ],
  },

  // ── Module 6 → Lessons 6.1–6.2 ──
  'm6-assignment': {
    title: 'Practice: Aggregation and Reports',
    questions: [
      task(
        'Return one row summarising the company: headcount, total payroll, average salary rounded to 2 decimals, lowest salary and highest salary.',
        '1 row: 5, 349000, 69800.00, 51000, 92000',
        'SELECT\nFROM;',
      ),
      task(
        'In a single row, return how many employees have a department and how many do not. Use FILTER, or a CASE inside the aggregate.',
        '1 row: with_department = 4, without_department = 1',
        'SELECT\nFROM;',
      ),
      task(
        'Return headcount, total payroll and average salary per dept_id. Include the NULL department as its own group.',
        '3 groups: dept 1 (2, 170000, 85000), dept 2 (2, 128000, 64000), NULL (1, 51000, 51000)',
        'SELECT\nFROM\nGROUP BY\nORDER BY;',
      ),
      task(
        'Return only the departments whose average salary exceeds 70000, after first excluding anyone earning under 55000. Order by average salary descending.',
        '1 row: dept 1, average 85000',
        'SELECT\nFROM\nWHERE\nGROUP BY\nHAVING\nORDER BY;',
      ),
      task(
        'Return paid revenue per month: the first day of each month and the total, oldest month first. Exclude cancelled orders.',
        '3 rows: 2024-04-01 → 165.50, 2024-05-01 → 310.75, 2024-06-01 → 210.00',
        'SELECT\nFROM\nWHERE\nGROUP BY\nORDER BY;',
      ),
    ],
  },

  // ── Module 7 → Lessons 7.1–7.3 ──
  'm7-assignment': {
    title: 'Practice: Every Join Type',
    questions: [
      task(
        'Return each employee with their department name and city. Only employees who have a department should appear.',
        '4 rows — Eli Roy is dropped, and so is the Legal department',
        'SELECT\nFROM   employees e\nJOIN   departments d ON \nORDER BY e.id;',
      ),
      task(
        'Now return every employee, showing NULL for the department when they have none.',
        '5 rows — Eli Roy appears with a NULL department',
        'SELECT\nFROM   employees e\nLEFT JOIN departments d ON \nORDER BY e.id;',
      ),
      task(
        'Return every department with its headcount, including departments with nobody in them. Legal must show 0, not 1 — choose what you count carefully.',
        '3 rows: Engineering 2, Sales 2, Legal 0',
        'SELECT\nFROM   departments d\nLEFT JOIN employees e ON \nGROUP BY\nORDER BY;',
      ),
      task(
        'Return the customers who have never placed an order, using the anti-join pattern.',
        '1 row: Ravi Kumar',
        'SELECT\nFROM   users u\nLEFT JOIN orders o ON \nWHERE  o.id IS NULL;',
      ),
      task(
        'Build a receipt: for every non-cancelled order return the customer name, order id, product, quantity and the line total (quantity × unit_price). Order by order id.',
        '4 rows — order 4 is excluded; order 5 shows Headset, 2, 210.00',
        'SELECT\nFROM   orders o\nJOIN   users u       ON \nJOIN   order_items i ON \nWHERE\nORDER BY o.id;',
      ),
    ],
  },

  // ── Module 8 → Lessons 8.1–8.2 ──
  'm8-assignment': {
    title: 'Interview Practice: Subqueries and Ranking',
    questions: [
      task(
        'Return the name and salary of every employee earning more than the company average.',
        '2 rows: Ana Iyer 92000, Bo Chen 78000 (the average is 69800)',
        'SELECT\nFROM\nWHERE  salary > (SELECT ... )\nORDER BY;',
      ),
      task(
        'Return every employee earning more than the average for their own department. A correlated subquery or a window function both work.',
        '1 row: Ana Iyer — Engineering averages 85000, and Sales is tied at 64000',
        'SELECT\nFROM   employees e\nWHERE  e.salary > (\n         SELECT ...\n       );',
      ),
      task(
        'Return the second-highest distinct salary in the company. Solve it with DENSE_RANK, and be ready to explain how a tie changes the answer.',
        '1 row: 78000',
        'WITH ranked AS (\n  SELECT ...\n)\nSELECT\nFROM   ranked\nWHERE;',
      ),
      task(
        'Return the departments that have no employees. Use NOT EXISTS, not NOT IN.',
        '1 row: Legal',
        'SELECT\nFROM   departments d\nWHERE  NOT EXISTS (\n         SELECT 1 ...\n       );',
      ),
      task(
        'Return the highest-paid employee in each department, including the NULL department. Break ties by lowest id so the result is deterministic.',
        '3 rows: Ana Iyer (dept 1), Cy Das (dept 2), Eli Roy (NULL)',
        'WITH ranked AS (\n  SELECT ..., ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) AS rn\n  FROM   employees\n)\nSELECT\nFROM   ranked\nWHERE  rn = 1;',
      ),
    ],
  },

  // ── Module 13 → Lessons 13.1–13.2 ──
  'm13-assignment': {
    title: 'Design Practice: Finding and Fixing Anomalies',
    questions: [
      task(
        'The extra table `watch_history_bad` flattens users, plans, movies and views into one table. Find the evidence of an update anomaly: return every plan_name stored with more than one distinct plan_price, with how many prices it has.',
        '1 row: Premium, 2 distinct prices (649 and 799)',
        'SELECT\nFROM   watch_history_bad\nGROUP BY\nHAVING;',
        { extra: { watch_history_bad: WATCH_HISTORY_BAD }, header: '-- watch_history_bad(user_id, user_email, plan_name, plan_price,\n--                    movie_title, movie_genre, director_name, watched_at)' },
      ),
      task(
        'Show the redundancy that caused it: return each plan_name with how many rows repeat it, and the number of distinct users actually on it.',
        '2 rows: Premium (3 rows, 2 users), Basic (1 row, 1 user)',
        'SELECT\nFROM   watch_history_bad\nGROUP BY\nORDER BY;',
        { extra: { watch_history_bad: WATCH_HISTORY_BAD }, header: '-- watch_history_bad(user_id, user_email, plan_name, plan_price, ...)' },
      ),
      task(
        'Start the fix. Create a `plans` table (identity pk, unique name, monthly_price NUMERIC(8,2) that must be positive), and insert Basic at 199 and Premium at 649. Now the price is stored exactly once.',
        '2 rows: Basic 199.00, Premium 649.00',
        "CREATE TABLE plans (\n  -- your columns here\n);\n\nINSERT INTO plans (name, monthly_price) VALUES\n  ('Basic', 199),\n  ('Premium', 649);",
        { verify: 'SELECT name, monthly_price FROM plans ORDER BY name' },
      ),
      task(
        'Model the one-to-many between an account and its profiles. Create `accounts` (identity pk, unique email) and `profiles` (identity pk, an account_id referencing accounts(id) that cascades on delete, a display_name that cannot be null, and is_kids defaulting to false). Insert one account and two profiles on it.',
        '2 rows on the same account, one of them a kids profile',
        "-- Parent first: a foreign key can only point at a PRIMARY KEY or\n-- UNIQUE column, so accounts must be created before profiles.\nCREATE TABLE accounts (\n  -- your columns here\n);\n\nCREATE TABLE profiles (\n  -- your columns here\n);\n\nINSERT INTO accounts (email) VALUES ('jane@example.com');\n\nINSERT INTO profiles (account_id, display_name, is_kids) VALUES\n  (1, 'Jane', FALSE),\n  (1, 'Jane Kids', TRUE);",
        { verify: 'SELECT a.email, p.display_name, p.is_kids FROM profiles p JOIN accounts a ON a.id = p.account_id ORDER BY p.display_name' },
      ),
      task(
        'A profile can watch many movies and a movie is watched by many profiles. Create the junction table `watchlist` with profile_id, movie_id, added_at defaulting to now, and a composite primary key that stops the same pair being added twice. Then insert two rows and try inserting a duplicate to see the constraint fire.',
        '2 rows; the duplicate insert is rejected by the primary key',
        'CREATE TABLE watchlist (\n  -- your columns here\n);\n\nINSERT INTO watchlist (profile_id, movie_id) VALUES\n  (1, 10),\n  (1, 11);',
        { verify: 'SELECT profile_id, movie_id FROM watchlist ORDER BY profile_id, movie_id' },
      ),
    ],
  },
};
