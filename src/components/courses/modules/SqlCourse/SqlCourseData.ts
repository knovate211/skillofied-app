import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';

export interface LessonBlock {
  type: 'text' | 'code' | 'alert';
  value: string;
  language?: string;
}

export interface LessonContent {
  title: string;
  content: LessonBlock[];
  /** Rendered as the icon cards under the prose; omit for a prose-only lesson. */
  objectives?: string[];
  /** Rendered as the tinted cards at the foot of the lesson. */
  takeaways?: string[];
}

export interface AssignmentContent {
  title: string;
  // Plain strings are written questions; objects with kind:'code' render a
  // runnable editor. See ModuleAssignment for the full shape.
  questions: AssignmentQuestion[];
}

export const sqlLessons: Record<string, LessonContent> = {
  // Overview
  'overview-welcome': { 
    title: 'Welcome to SQL Mastery', 
    content: [
      { type: 'text', value: 'Welcome to the SQL Mastery course! This curriculum is designed to take you from an absolute beginner to an industry-ready SQL expert capable of designing complex database architectures and writing highly optimized queries.' },
      { type: 'text', value: 'In this course, we will not only cover the syntax of SQL, but we will dive deep into database theory, normalization, performance optimization, and advanced analytical queries using Window Functions and CTEs.' },
      { type: 'alert', value: 'Make sure you practice the queries on your own machine. Reading SQL is easy, but writing it to solve real-world problems requires hands-on experience.' }
    ] 
  },
  'overview-outcomes': { 
    title: 'Learning Outcomes', 
    content: [
      { type: 'text', value: 'By the end of this comprehensive learning path, you will be able to:' },
      { type: 'text', value: '• Design scalable and normalized relational database schemas from scratch.' },
      { type: 'text', value: '• Write complex SQL queries involving multi-table joins, subqueries, and aggregations.' },
      { type: 'text', value: '• Understand how the database engine executes queries and how to optimize them using indexes.' },
      { type: 'text', value: '• Implement advanced PostgreSQL features like JSONB, Arrays, and Window Functions.' },
      { type: 'text', value: '• Confidently tackle SQL interviews at top tech companies.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 1: INTRODUCTION & FUNDAMENTALS
  // ---------------------------------------------------------------------------
  'm1-l1': { 
    title: 'What is Data?', 
    content: [
      { type: 'text', value: 'In computing, data is information that has been translated into a form that is efficient for movement or processing. In the modern world, data is the most valuable asset a company can own.' },
      { type: 'text', value: 'Data can generally be categorized into three forms:' },
      { type: 'text', value: '1. Structured Data: Highly organized and formatted data, such as a table of users with specific columns (Name, Email, Age). This is what Relational Databases (SQL) excel at handling.' },
      { type: 'text', value: '2. Semi-structured Data: Data that does not reside in a relational database but has some organizational properties, like JSON or XML files.' },
      { type: 'text', value: '3. Unstructured Data: Data with no predefined data model, such as text documents, images, video, and audio.' },
      { type: 'alert', value: 'SQL (Structured Query Language) is specifically designed to manage and query Structured Data.' }
    ] 
  },
  'm1-l2': { 
    title: 'File system vs Database', 
    content: [
      { type: 'text', value: 'Before the advent of databases, data was stored in simple flat files (like text or CSV files) managed by the operating system\'s file system.' },
      { type: 'text', value: 'However, using flat files for complex applications presents several critical issues:' },
      { type: 'text', value: '• Data Redundancy and Inconsistency: The same information might be duplicated across multiple files. Updating one file without updating the others leads to inconsistent data.' },
      { type: 'text', value: '• Difficulty in Accessing Data: Writing a new program or script every time you need to extract specific information is inefficient.' },
      { type: 'text', value: '• Data Isolation: Data is scattered in various files and formats, making it hard to combine them for analysis.' },
      { type: 'text', value: '• Concurrent Access Anomalies: If two users try to edit a file simultaneously, data can be corrupted or lost.' },
      { type: 'text', value: 'A Database Management System (DBMS) solves all these problems by providing a centralized, secure, and structured way to store and retrieve data.' }
    ] 
  },
  'm1-l3': { 
    title: 'What is DBMS & RDBMS?', 
    content: [
      { type: 'text', value: 'A DBMS (Database Management System) is software that interacts with end-users, applications, and the database itself to capture and analyze the data.' },
      { type: 'text', value: 'An RDBMS (Relational Database Management System) is an advanced version of a DBMS. It is based on the Relational Model introduced by Edgar F. Codd.' },
      { type: 'text', value: 'Key characteristics of an RDBMS:' },
      { type: 'text', value: '• Data is stored in tables (relations) consisting of rows and columns.' },
      { type: 'text', value: '• Tables can be linked (related) to each other using common fields known as Primary Keys and Foreign Keys.' },
      { type: 'text', value: '• It enforces strict data integrity rules (e.g., ensuring an age column only contains numbers).' },
      { type: 'alert', value: 'SQL is the standard language used to interact with an RDBMS.' }
    ] 
  },
  'm1-l4': { 
    title: 'SQL vs NoSQL', 
    content: [
      { type: 'text', value: 'While SQL databases are Relational, NoSQL databases are Non-Relational and distributed.' },
      { type: 'text', value: 'SQL (Relational):' },
      { type: 'text', value: '• Structure: Uses tables with a predefined schema.' },
      { type: 'text', value: '• Scaling: Typically scaled vertically (upgrading the server hardware).' },
      { type: 'text', value: '• Best for: Complex queries, transactional systems requiring strict data consistency (ACID compliance).' },
      { type: 'text', value: 'NoSQL (Non-Relational):' },
      { type: 'text', value: '• Structure: Document-oriented (like JSON), Key-Value pairs, or Graph databases. No rigid schema.' },
      { type: 'text', value: '• Scaling: Scaled horizontally (adding more servers to a cluster).' },
      { type: 'text', value: '• Best for: Rapid development with changing data structures, massive amounts of unstructured data.' },
      { type: 'alert', value: 'Neither is inherently "better". You choose SQL for strict structure and relationships, and NoSQL for flexibility and horizontal scale.' }
    ] 
  },
  'm1-l5': { 
    title: 'Popular Databases', 
    content: [
      { type: 'text', value: 'The market is filled with several powerful relational databases. Here are the most prominent ones:' },
      { type: 'text', value: '1. PostgreSQL: Highly advanced, open-source object-relational database system. Known for reliability, feature robustness, and performance. (This is what we heavily focus on).' },
      { type: 'text', value: '2. MySQL: The world\'s most popular open-source database. Widely used in web applications (like WordPress).' },
      { type: 'text', value: '3. SQLite: A C-language library that implements a small, fast, self-contained SQL database engine. Used heavily in mobile apps and local testing.' },
      { type: 'text', value: '4. Oracle DB & Microsoft SQL Server: Enterprise-grade, proprietary databases used by massive corporations.' }
    ] 
  },
  'm1-l6': { 
    title: 'Installing PostgreSQL/MySQL', 
    content: [
      { type: 'text', value: 'To practice SQL, you need a database running on your machine. You can install it directly, but using Docker is the industry standard for development as it keeps your system clean.' },
      { type: 'text', value: 'To run PostgreSQL via Docker, open your terminal and execute:' },
      { type: 'code', language: 'bash', value: 'docker run --name my-postgres \\\n  -e POSTGRES_PASSWORD=mysecretpassword \\\n  -p 5432:5432 \\\n  -d postgres' },
      { type: 'text', value: 'This pulls the PostgreSQL image, sets a password, maps the default port (5432), and runs it in the background.' },
      { type: 'text', value: 'You can then connect to it using a GUI tool like DBeaver or pgAdmin, or using the command line tool `psql`:' },
      { type: 'code', language: 'bash', value: 'docker exec -it my-postgres psql -U postgres' }
    ] 
  },
  'm1-l7': { 
    title: 'Database Architecture', 
    content: [
      { type: 'text', value: 'Databases typically operate on a Client-Server architecture.' },
      { type: 'text', value: '• The Server: The actual DBMS software running on a machine (or cluster of machines), managing memory, disk storage, and incoming requests.' },
      { type: 'text', value: '• The Client: An application (like a Node.js backend, a GUI tool like DBeaver, or a CLI) that connects to the server over a network protocol (usually TCP/IP).' },
      { type: 'text', value: 'When your backend application executes a query, it acts as a client sending a SQL string to the database server. The server parses the SQL, executes it against the data files on disk, and sends the result set back to the client.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 2: DATABASE DESIGN FUNDAMENTALS
  // ---------------------------------------------------------------------------
  'm2-l1': { 
    title: 'Database, Schema, Tables', 
    content: [
      { type: 'text', value: 'Understanding the hierarchy of storage in an RDBMS is crucial.' },
      { type: 'text', value: '1. Database (Catalog): The highest level container. A single PostgreSQL server can host multiple distinct databases.' },
      { type: 'text', value: '2. Schema: A logical namespace inside a database. Think of it like a folder. It groups related tables together. (By default, PostgreSQL uses a schema named "public").' },
      { type: 'text', value: '3. Tables: The actual structures where data is stored. Tables exist inside schemas.' },
      { type: 'code', language: 'sql', value: '-- Create a logical grouping\nCREATE SCHEMA e_commerce;\n\n-- Create a table inside that schema\nCREATE TABLE e_commerce.users (\n  id INT,\n  username VARCHAR(50)\n);' }
    ] 
  },
  'm2-l2': { 
    title: 'Rows, Columns, Records', 
    content: [
      { type: 'text', value: 'A table is essentially a grid consisting of Columns and Rows.' },
      { type: 'text', value: '• Columns (Attributes / Fields): Define the structure of the data. Every column has a specific name and a Data Type (e.g., an "age" column must be an integer). A table can have many columns.' },
      { type: 'text', value: '• Rows (Records / Tuples): Represent a single, distinct entry of data. For example, one specific user in a users table.' },
      { type: 'alert', value: 'Unlike a spreadsheet, the order of rows in a relational database table is NOT guaranteed unless you explicitly sort them using an ORDER BY clause.' }
    ] 
  },
  'm2-l3': { 
    title: 'SQL Data Types', 
    content: [
      { type: 'text', value: 'When creating a column, you must specify its Data Type. This tells the database how to store the data on disk and what operations are valid.' },
      { type: 'text', value: 'Common Data Types:' },
      { type: 'text', value: '• Numeric: INT (whole numbers), DECIMAL or NUMERIC (exact fractions for money), FLOAT (approximate decimals).' },
      { type: 'text', value: '• String: VARCHAR(n) (variable-length string up to n characters), TEXT (unlimited length string), CHAR(n) (fixed-length string).' },
      { type: 'text', value: '• Date/Time: DATE (YYYY-MM-DD), TIMESTAMP (Date and time), TIMESTAMPTZ (Timestamp with timezone).' },
      { type: 'text', value: '• Boolean: BOOLEAN (TRUE, FALSE, or NULL).' },
      { type: 'code', language: 'sql', value: 'CREATE TABLE products (\n  id SERIAL,\n  name VARCHAR(255),\n  price DECIMAL(10, 2),\n  is_available BOOLEAN,\n  created_at TIMESTAMP\n);' }
    ] 
  },
  'm2-l4': { 
    title: 'Constraints (PK, FK, etc.)', 
    content: [
      { type: 'text', value: 'Constraints are rules applied to columns to ensure data accuracy and reliability.' },
      { type: 'text', value: '• PRIMARY KEY: Uniquely identifies each record in a table. A table can only have one primary key. It cannot be NULL.' },
      { type: 'text', value: '• FOREIGN KEY: A column that references the PRIMARY KEY of another table, creating a relationship between them.' },
      { type: 'text', value: '• UNIQUE: Ensures all values in a column are different.' },
      { type: 'text', value: '• NOT NULL: Ensures a column cannot have a NULL value.' },
      { type: 'text', value: '• CHECK: Ensures values in a column satisfy a specific condition.' },
      { type: 'code', language: 'sql', value: 'CREATE TABLE employees (\n  emp_id INT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  age INT CHECK (age >= 18),\n  department_id INT,\n  FOREIGN KEY (department_id) REFERENCES departments(id)\n);' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 3: SQL COMMANDS DEEP DIVE
  // ---------------------------------------------------------------------------
  'm3-l1': { 
    title: 'DDL (CREATE, ALTER, DROP)', 
    content: [
      { type: 'text', value: 'Data Definition Language (DDL) consists of commands that define or modify the database schema (its structure, not its data).' },
      { type: 'text', value: '• CREATE: Used to create tables, schemas, indexes, and views.' },
      { type: 'text', value: '• ALTER: Used to modify an existing database object, like adding a new column to a table.' },
      { type: 'text', value: '• DROP: Used to completely delete a database object. Warning: This removes the structure AND all data within it.' },
      { type: 'code', language: 'sql', value: '-- Create a table\nCREATE TABLE books (id INT, title VARCHAR(100));\n\n-- Add a new column\nALTER TABLE books ADD COLUMN author VARCHAR(50);\n\n-- Delete the table entirely\nDROP TABLE books;' }
    ] 
  },
  'm3-l2': { 
    title: 'DML (INSERT, UPDATE, DELETE)', 
    content: [
      { type: 'text', value: 'Data Manipulation Language (DML) consists of commands used to manage data within the existing schema.' },
      { type: 'text', value: '• INSERT: Adds new rows into a table.' },
      { type: 'text', value: '• UPDATE: Modifies existing rows. ALWAYS use a WHERE clause, otherwise you will update every row in the table!' },
      { type: 'text', value: '• DELETE: Removes rows from a table. Again, ALWAYS use a WHERE clause to avoid deleting everything.' },
      { type: 'code', language: 'sql', value: '-- Insert a single record\nINSERT INTO users (username, email) VALUES (\'john_doe\', \'john@example.com\');\n\n-- Update a specific record\nUPDATE users SET email = \'john_new@example.com\' WHERE username = \'john_doe\';\n\n-- Delete a specific record\nDELETE FROM users WHERE username = \'john_doe\';' },
      { type: 'alert', value: 'TRUNCATE is a DDL command that quickly removes all rows from a table. It is faster than DELETE without a WHERE clause because it doesn\'t scan the rows.' }
    ] 
  },
  'm3-l3': { 
    title: 'DQL (SELECT, WHERE, LIMIT)', 
    content: [
      { type: 'text', value: 'Data Query Language (DQL) is used to retrieve data from the database. The primary command is SELECT.' },
      { type: 'text', value: '• SELECT specifies the columns you want to retrieve. Use * to select all columns (though this is bad practice for performance in production).' },
      { type: 'text', value: '• FROM specifies the table.' },
      { type: 'text', value: '• WHERE filters the rows based on specific conditions.' },
      { type: 'text', value: '• LIMIT restricts the number of rows returned by the query.' },
      { type: 'code', language: 'sql', value: 'SELECT first_name, last_name, email \nFROM employees \nWHERE department = \'Engineering\' \nLIMIT 5;' },
      { type: 'text', value: 'The query above returns the names and emails of up to 5 employees who work in the Engineering department.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 4: FILTERING & OPERATORS
  // ---------------------------------------------------------------------------
  'm4-l1': {
    title: 'Comparison Operators',
    content: [
      { type: 'text', value: 'Comparison operators are the core of the WHERE clause. Each one evaluates to true, false, or — importantly — NULL when either operand is NULL.' },
      { type: 'text', value: 'The six operators are = (equal), <> or != (not equal), > (greater than), < (less than), >= and <= (greater or less than or equal). SQL uses <> as the standard not-equal operator; != is accepted by most engines but <> is the portable choice.' },
      { type: 'code', value: '-- Exact match\nSELECT * FROM products WHERE price = 10.00;\n\n-- Range filters\nSELECT * FROM products WHERE price >= 100.00;\nSELECT * FROM products WHERE stock < 5;\n\n-- Not equal, both spellings\nSELECT * FROM products WHERE category <> \'Discontinued\';\nSELECT * FROM products WHERE category != \'Discontinued\';\n\n-- Comparisons work on dates and strings too\nSELECT * FROM orders   WHERE order_date >= \'2026-01-01\';\nSELECT * FROM students WHERE name >= \'M\';    -- alphabetical ordering', language: 'sql' },
      { type: 'alert', value: 'Comparison with NULL never returns true. "WHERE price = NULL" returns no rows even when prices are genuinely NULL, because NULL means unknown and unknown = unknown is itself unknown. Always use IS NULL and IS NOT NULL.' },
      { type: 'code', value: '-- WRONG: returns nothing, always\nSELECT * FROM products WHERE discount = NULL;\n\n-- RIGHT\nSELECT * FROM products WHERE discount IS NULL;\nSELECT * FROM products WHERE discount IS NOT NULL;\n\n-- A subtle trap: <> also excludes NULL rows\n-- This misses every product whose category is NULL\nSELECT * FROM products WHERE category <> \'Books\';\n\n-- Include them explicitly if that is what you meant\nSELECT * FROM products\n WHERE category <> \'Books\' OR category IS NULL;', language: 'sql' },
      { type: 'text', value: 'That last example catches many people in production. A "not equal" filter silently drops NULL rows, so a report that should show 100 products shows 87. Whenever you write <>, ask yourself what should happen to the NULLs.' },
      { type: 'text', value: 'Comparisons are also where indexes earn their keep. An equality or range test on an indexed column lets the engine seek directly; the same test wrapped in a function — such as WHERE UPPER(name) = \'ASHA\' — usually cannot use the index at all.' }
    ]
  },
  'm4-l2': { 
    title: 'Logical Operators', 
    content: [
      { type: 'text', value: 'Logical operators allow you to combine multiple conditions in a WHERE clause.' },
      { type: 'text', value: '• AND: Requires ALL conditions to be true.' },
      { type: 'text', value: '• OR: Requires AT LEAST ONE condition to be true.' },
      { type: 'text', value: '• NOT: Reverses the boolean result of a condition.' },
      { type: 'code', language: 'sql', value: '-- Using AND\nSELECT * FROM users WHERE age > 18 AND country = \'US\';\n\n-- Using OR with Parentheses for grouping\nSELECT * FROM products WHERE (category = \'Electronics\' OR category = \'Computers\') AND stock > 0;' },
      { type: 'alert', value: 'Always use parentheses when combining AND and OR operators to ensure the logic evaluates exactly as you intend.' }
    ] 
  },
  'm4-l3': { 
    title: 'Advanced Filtering (IN, LIKE)', 
    content: [
      { type: 'text', value: 'SQL provides advanced operators for cleaner syntax and string matching.' },
      { type: 'text', value: '• IN: Allows you to specify multiple possible values for a column, replacing multiple OR conditions.' },
      { type: 'text', value: '• BETWEEN: Selects values within a given range (inclusive).' },
      { type: 'text', value: '• LIKE: Used for pattern matching in strings. The percent sign `%` represents zero, one, or multiple characters. The underscore `_` represents a single character.' },
      { type: 'code', language: 'sql', value: '-- Instead of: category = \'A\' OR category = \'B\' OR category = \'C\'\nSELECT * FROM products WHERE category IN (\'A\', \'B\', \'C\');\n\n-- Find prices between 50 and 100\nSELECT * FROM products WHERE price BETWEEN 50 AND 100;\n\n-- Find emails ending in @gmail.com\nSELECT * FROM users WHERE email LIKE \'%@gmail.com\';\n\n-- Find names starting with J and exactly 4 letters long (J _ _ _)\nSELECT * FROM users WHERE name LIKE \'J___\';' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 5: SQL FUNCTIONS
  // ---------------------------------------------------------------------------
  'm5-l1': { 
    title: 'String Functions', 
    content: [
      { type: 'text', value: 'Databases provide built-in functions to manipulate text strings directly in your query.' },
      { type: 'text', value: '• UPPER(string) / LOWER(string): Converts text to upper or lower case.' },
      { type: 'text', value: '• CONCAT(str1, str2): Joins multiple strings together.' },
      { type: 'text', value: '• LENGTH(string): Returns the number of characters in a string.' },
      { type: 'text', value: '• SUBSTRING(string, start, length): Extracts a part of a string.' },
      { type: 'code', language: 'sql', value: '-- Generate full names and ensure emails are lowercase\nSELECT \n  CONCAT(first_name, \' \', last_name) AS full_name, \n  LOWER(email) AS standardized_email\nFROM users;' }
    ] 
  },
  'm5-l2': { 
    title: 'Numeric Functions', 
    content: [
      { type: 'text', value: 'Numeric functions allow you to perform math operations inside your query.' },
      { type: 'text', value: '• ROUND(number, decimals): Rounds a number to a specified decimal place.' },
      { type: 'text', value: '• CEIL(number): Rounds a number UP to the nearest integer.' },
      { type: 'text', value: '• FLOOR(number): Rounds a number DOWN to the nearest integer.' },
      { type: 'text', value: '• ABS(number): Returns the absolute (positive) value.' },
      { type: 'code', language: 'sql', value: '-- Apply a 15% discount and round to 2 decimal places\nSELECT \n  product_name, \n  price AS original_price, \n  ROUND(price * 0.85, 2) AS discounted_price \nFROM products;' }
    ] 
  },
  'm5-l3': { 
    title: 'Date Functions', 
    content: [
      { type: 'text', value: 'Working with dates is a very common task in backend engineering.' },
      { type: 'text', value: '• CURRENT_DATE / NOW(): Returns the current date (and time).' },
      { type: 'text', value: '• EXTRACT(part FROM date): Retrieves a specific part of a date (e.g., Year, Month, Day).' },
      { type: 'text', value: '• DATE_ADD / INTERVAL: Used to add or subtract time from a date.' },
      { type: 'code', language: 'sql', value: '-- Find users who registered in the current year\nSELECT * FROM users \nWHERE EXTRACT(YEAR FROM registration_date) = EXTRACT(YEAR FROM CURRENT_DATE);\n\n-- Find accounts expiring in the next 30 days\nSELECT * FROM subscriptions \nWHERE expiry_date BETWEEN NOW() AND NOW() + INTERVAL \'30 days\';' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 6: AGGREGATION & GROUPING
  // ---------------------------------------------------------------------------
  'm6-l1': { 
    title: 'Aggregate Functions', 
    content: [
      { type: 'text', value: 'Aggregate functions perform a calculation on a set of values and return a single value. They are incredibly useful for reporting and data analysis.' },
      { type: 'text', value: 'The most commonly used aggregate functions are:' },
      { type: 'text', value: '• COUNT(): Returns the number of rows that match a specified criterion.' },
      { type: 'text', value: '• SUM(): Returns the total sum of a numeric column.' },
      { type: 'text', value: '• AVG(): Returns the average value of a numeric column.' },
      { type: 'text', value: '• MIN() / MAX(): Returns the smallest or largest value in a column.' },
      { type: 'code', language: 'sql', value: '-- Find the total number of orders placed in 2023\nSELECT COUNT(id) AS total_orders\nFROM orders \nWHERE EXTRACT(YEAR FROM created_at) = 2023;\n\n-- Calculate the average salary of employees in department 5\nSELECT AVG(salary) AS avg_salary, MAX(salary) as highest_salary\nFROM employees\nWHERE department_id = 5;' },
      { type: 'alert', value: 'Important: Aggregate functions ignore NULL values, except for COUNT(*), which counts all rows regardless of NULLs.' }
    ] 
  },
  'm6-l2': { 
    title: 'GROUP BY & HAVING', 
    content: [
      { type: 'text', value: 'The GROUP BY statement groups rows that have the same values into summary rows. It is almost always used in conjunction with aggregate functions (COUNT, MAX, MIN, SUM, AVG).' },
      { type: 'text', value: 'The HAVING clause was added to SQL because the WHERE keyword cannot be used to filter aggregate functions.' },
      { type: 'text', value: 'Think of WHERE as filtering the raw rows BEFORE grouping, and HAVING as filtering the summarized groups AFTER grouping.' },
      { type: 'code', language: 'sql', value: '-- Calculate the total sales for each product category\nSELECT category, SUM(amount) as total_sales\nFROM sales\nGROUP BY category;\n\n-- Find categories that have total sales exceeding $50,000\nSELECT category, SUM(amount) as total_sales\nFROM sales\nWHERE status = \'completed\' -- Filter rows first\nGROUP BY category\nHAVING SUM(amount) > 50000; -- Filter groups second' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 7: SQL JOINS
  // ---------------------------------------------------------------------------
  'm7-l1': { 
    title: 'INNER JOIN', 
    content: [
      { type: 'text', value: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them (usually a primary key / foreign key relationship).' },
      { type: 'text', value: 'The INNER JOIN returns only the records that have matching values in BOTH tables.' },
      { type: 'text', value: 'If there is a user with no orders, or an order with a non-existent user_id, those records are completely excluded from the result.' },
      { type: 'code', language: 'sql', value: '-- Get a list of orders along with the name of the user who placed them\nSELECT orders.id, orders.total_amount, users.username, users.email\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;' },
      { type: 'alert', value: 'INNER JOIN is the default join type in most SQL dialects. If you just write JOIN, it acts as an INNER JOIN.' }
    ] 
  },
  'm7-l2': { 
    title: 'LEFT & RIGHT JOIN', 
    content: [
      { type: 'text', value: 'Unlike INNER JOIN, OUTER joins (LEFT, RIGHT) will return records even if there is no match on the other side.' },
      { type: 'text', value: '• LEFT JOIN: Returns ALL records from the left table (table1), and the matched records from the right table (table2). If there is no match, the result is NULL on the right side.' },
      { type: 'text', value: '• RIGHT JOIN: Exactly the same, but reversed. Returns ALL records from the right table.' },
      { type: 'code', language: 'sql', value: '-- Get all users, and their orders if they have any.\n-- Users who have never placed an order will still appear in the result,\n-- but the order.total_amount column will be NULL for them.\nSELECT users.username, orders.total_amount\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id;' }
    ] 
  },
  'm7-l3': { 
    title: 'FULL, SELF, CROSS JOIN', 
    content: [
      { type: 'text', value: 'Advanced join types are necessary for specific edge cases or complex analytical reports.' },
      { type: 'text', value: '• FULL OUTER JOIN: Returns all records when there is a match in either the left or right table. Unmatched rows contain NULLs for the missing side.' },
      { type: 'text', value: '• SELF JOIN: Joining a table to itself. This is extremely common for hierarchical data, such as finding the manager for each employee (where the manager is also an employee).' },
      { type: 'text', value: '• CROSS JOIN: Returns the Cartesian product of rows from both tables. If table A has 5 rows and B has 5, the result has 25 rows.' },
      { type: 'code', language: 'sql', value: '-- Self Join: Find the name of the manager for each employee\nSELECT e.name AS Employee, m.name AS Manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 8: SUBQUERIES
  // ---------------------------------------------------------------------------
  'm8-l1': { 
    title: 'Single & Multiple Row Subqueries', 
    content: [
      { type: 'text', value: 'A Subquery (or Nested Query) is a query within another SQL query. They are typically placed inside the WHERE, HAVING, or FROM clauses.' },
      { type: 'text', value: '• Single-row Subqueries: Return exactly one row and one column. You use standard comparison operators like =, >, < with them.' },
      { type: 'text', value: '• Multiple-row Subqueries: Return a column with more than one row. You must use operators like IN, ANY, or ALL to handle the multiple values.' },
      { type: 'code', language: 'sql', value: '-- Single-row subquery: Find users older than the average age\nSELECT name, age FROM users\nWHERE age > (\n  SELECT AVG(age) FROM users\n);\n\n-- Multiple-row subquery: Find users who ordered a specific product\nSELECT name FROM users\nWHERE id IN (\n  SELECT user_id FROM orders WHERE product_name = \'Laptop\'\n);' }
    ] 
  },
  'm8-l2': { 
    title: 'Nested Queries & Operators', 
    content: [
      { type: 'text', value: 'The EXISTS operator is a very powerful way to write subqueries. It tests for the existence of ANY record in a subquery and returns a simple true or false.' },
      { type: 'text', value: 'EXISTS is highly optimized by database engines. It often performs much faster than the IN operator because the engine stops scanning as soon as it finds a single matching row.' },
      { type: 'code', language: 'sql', value: '-- Find categories that have at least one active product\nSELECT name FROM categories c\nWHERE EXISTS (\n  SELECT 1 FROM products p \n  WHERE p.category_id = c.id AND p.status = \'active\'\n);' },
      { type: 'alert', value: 'Notice the `SELECT 1`. When using EXISTS, the database doesn\'t care what columns you select in the subquery, only whether rows are returned. Using `SELECT 1` is standard convention.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 9: ADVANCED SQL CONCEPTS
  // ---------------------------------------------------------------------------
  'm9-l1': { 
    title: 'Views', 
    content: [
      { type: 'text', value: 'A View is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table, but the data is dynamically fetched when you query the view.' },
      { type: 'text', value: 'Views serve two main purposes: Security (hiding sensitive columns like passwords from analysts) and Simplicity (hiding complex JOIN logic behind a simple table name).' },
      { type: 'code', language: 'sql', value: '-- Create a secure view for the marketing team\nCREATE VIEW marketing_users AS\nSELECT id, first_name, email, created_at \nFROM users \nWHERE email_verified = true;\n\n-- The marketing team can now query this simply:\nSELECT * FROM marketing_users;' }
    ] 
  },
  'm9-l2': { 
    title: 'Indexing (B-Tree, Composite)', 
    content: [
      { type: 'text', value: 'An Index is a data structure (typically a B-Tree) that improves the speed of data retrieval operations on a database table. It functions similarly to an index in a book.' },
      { type: 'text', value: 'Without an index, the database must perform a "Sequential Scan" (reading every single row) to find matches. With an index, it can find them in O(log N) time using an "Index Scan".' },
      { type: 'code', language: 'sql', value: '-- Create a simple index on a frequently searched column\nCREATE INDEX idx_user_email ON users(email);\n\n-- Create a composite index (multiple columns) for complex queries\nCREATE INDEX idx_user_status_age ON users(status, age);' },
      { type: 'alert', value: 'Do not over-index! Indexes speed up SELECT statements, but they slow down INSERT, UPDATE, and DELETE operations because the index must be updated every time data changes.' }
    ] 
  },
  'm9-l3': { 
    title: 'Performance & EXPLAIN', 
    content: [
      { type: 'text', value: 'The EXPLAIN statement in PostgreSQL shows the execution plan of a query. It tells you exactly how the database engine intends to execute your statement, which tables it will scan, and what indexes it will use.' },
      { type: 'text', value: 'Using EXPLAIN ANALYZE actually executes the query and shows both the estimated and the actual runtime. It is your primary tool for diagnosing slow queries.' },
      { type: 'code', language: 'sql', value: '-- Analyze a slow query\nEXPLAIN ANALYZE \nSELECT * FROM orders WHERE total_amount > 1000;\n\n-- In the output, look out for "Seq Scan" on massive tables.\n-- If you see one, consider adding an index!' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 10: TRANSACTIONS & ACID
  // ---------------------------------------------------------------------------
  'm10-l1': { 
    title: 'Transactions Basics', 
    content: [
      { type: 'text', value: 'A transaction is a sequence of SQL operations treated as a single logical unit of work. If any operation within the block fails, the entire transaction is aborted (rolled back), and no changes are made.' },
      { type: 'text', value: 'This is absolutely critical for financial systems. Imagine transferring money: you deduct from Account A and add to Account B. If the server crashes in between, money is lost forever unless wrapped in a transaction.' },
      { type: 'code', language: 'sql', value: 'BEGIN;\n\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\n\nCOMMIT;' }
    ] 
  },
  'm10-l2': { 
    title: 'ACID Properties', 
    content: [
      { type: 'text', value: 'Relational databases guarantee ACID properties for transactions, ensuring maximum data integrity:' },
      { type: 'text', value: '• Atomicity: "All or nothing". The transaction fully completes, or it is completely aborted.' },
      { type: 'text', value: '• Consistency: The database must transition from one valid state to another valid state, never violating constraints (like checking if balance drops below zero).' },
      { type: 'text', value: '• Isolation: Concurrent transactions running simultaneously do not interfere with each other.' },
      { type: 'text', value: '• Durability: Once a transaction is committed, the changes are written to disk and are permanent, even if the power goes out the next second.' }
    ] 
  },
  'm10-l3': {
    title: 'Rollback & Savepoints',
    content: [
      { type: 'text', value: 'A transaction groups statements into a single unit that either fully succeeds or fully fails. COMMIT makes every change permanent; ROLLBACK discards all of them and returns the database to its state at BEGIN.' },
      { type: 'text', value: 'Rollback is what makes transactions safe. If a bank transfer debits one account and then the credit fails, ROLLBACK undoes the debit — money is never destroyed. Without it, a mid-way failure leaves the data permanently inconsistent.' },
      { type: 'code', value: 'BEGIN;\n    UPDATE accounts SET balance = balance - 500 WHERE id = 1;\n    UPDATE accounts SET balance = balance + 500 WHERE id = 2;\n\n    -- Verify before committing\n    -- If anything is wrong:\n    -- ROLLBACK;\nCOMMIT;', language: 'sql' },
      { type: 'text', value: 'A savepoint is a named marker inside a transaction. Rolling back to a savepoint undoes only the work done after it, leaving everything before it intact and the transaction still open. This gives you partial rollback instead of all-or-nothing.' },
      { type: 'code', value: 'BEGIN;\n    INSERT INTO logs (msg) VALUES (\'Batch job started\');\n\n    SAVEPOINT before_import;\n\n    INSERT INTO students (name, email) VALUES (\'Asha\', \'asha@example.com\');\n    INSERT INTO students (name, email) VALUES (\'Ravi\', \'duplicate@example.com\');\n    -- this one violates a UNIQUE constraint\n\n    -- Undo only the import, keep the opening log entry\n    ROLLBACK TO SAVEPOINT before_import;\n\n    INSERT INTO logs (msg) VALUES (\'Import failed, batch aborted cleanly\');\nCOMMIT;   -- both log rows persist; neither student was inserted', language: 'sql' },
      { type: 'text', value: 'Savepoints are most useful in long batch operations where one bad record should not discard hours of successful work, and inside stored procedures that want to attempt a risky step and recover.' },
      { type: 'code', value: '-- Releasing a savepoint you no longer need\nBEGIN;\n    SAVEPOINT sp1;\n    UPDATE inventory SET stock = stock - 1 WHERE id = 10;\n    RELEASE SAVEPOINT sp1;   -- keeps the work, drops the marker\nCOMMIT;\n\n-- Nested savepoints roll back in reverse order\nBEGIN;\n    SAVEPOINT outer_sp;\n        SAVEPOINT inner_sp;\n        DELETE FROM cart_items WHERE cart_id = 3;\n        ROLLBACK TO inner_sp;    -- undoes the delete only\n    -- outer_sp is still valid here\nCOMMIT;', language: 'sql' },
      { type: 'alert', value: 'Autocommit is on by default in most clients, meaning every statement is its own transaction. You must issue BEGIN (or START TRANSACTION) explicitly before ROLLBACK has anything to undo — otherwise your UPDATE has already committed.' }
    ]
  },
  'm10-l4': {
    title: 'Locks & Deadlocks',
    content: [
      { type: 'text', value: 'When two transactions touch the same rows at the same time, the database must stop them corrupting each other. It does this with locks.' },
      { type: 'text', value: 'A shared lock (read lock) allows many transactions to read a row at once, but blocks anyone from writing it. An exclusive lock (write lock) is held by exactly one transaction and blocks everyone else, readers and writers alike. Locks are acquired automatically as your statements run and released when the transaction ends.' },
      { type: 'text', value: 'Lock granularity matters for throughput. Row-level locking, which PostgreSQL and InnoDB use, blocks only the affected rows and allows high concurrency. Table-level locking blocks the entire table and should be avoided in hot paths.' },
      { type: 'text', value: 'A deadlock occurs when two transactions each hold a lock the other is waiting for, so neither can proceed. Transaction A locks row 1 and wants row 2; transaction B locks row 2 and wants row 1. Neither will ever release.' },
      { type: 'code', value: '-- Transaction A                      -- Transaction B\nBEGIN;                               BEGIN;\nUPDATE accounts                      UPDATE accounts\n  SET balance = balance - 100          SET balance = balance - 50\n  WHERE id = 1;   -- locks row 1       WHERE id = 2;   -- locks row 2\n\nUPDATE accounts                      UPDATE accounts\n  SET balance = balance + 100          SET balance = balance + 50\n  WHERE id = 2;   -- WAITS for B       WHERE id = 1;   -- WAITS for A\n\n-- DEADLOCK: the database detects the cycle and kills one transaction', language: 'sql' },
      { type: 'text', value: 'Databases detect deadlocks automatically and resolve them by killing one transaction (the victim), which receives an error and must be retried by your application. Nothing is corrupted, but one unit of work is lost.' },
      { type: 'text', value: 'The standard prevention is to always acquire locks in a consistent global order. If every transaction updates accounts in ascending id order, the circular wait can never form.' },
      { type: 'code', value: '-- Deadlock-safe: always lock the lower id first\nBEGIN;\n  UPDATE accounts SET balance = balance - 100\n   WHERE id = LEAST(1, 2);\n  UPDATE accounts SET balance = balance + 100\n   WHERE id = GREATEST(1, 2);\nCOMMIT;\n\n-- Explicit locking when you must read-then-write safely\nBEGIN;\n  SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- exclusive lock\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\nCOMMIT;', language: 'sql' },
      { type: 'text', value: 'SELECT ... FOR UPDATE is the tool for the read-modify-write pattern. Without it, two transactions can both read a balance of 5000, both subtract 100, and both write 4900 — losing one withdrawal entirely.' },
      { type: 'alert', value: 'Keep transactions short. The longer a transaction holds locks, the higher the chance of blocking and deadlock. Never leave a transaction open while waiting for user input or an external API call.' }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 11: STORED PROCEDURES
  // ---------------------------------------------------------------------------
  'm11-l1': {
    title: 'Functions vs Procedures',
    content: [
      { type: 'text', value: 'Stored procedures and functions are blocks of reusable logic saved inside the database itself rather than in application code. Both reduce network round trips by executing close to the data, and both centralise business rules that several applications must share.' },
      { type: 'text', value: 'The decisive difference is the return value. A function must return something and can therefore be used inside a query — in a SELECT list, a WHERE clause, or a JOIN condition. A procedure returns nothing and must be invoked with CALL as a standalone statement.' },
      { type: 'code', value: '-- FUNCTION: returns a value, usable inside a query\nCREATE FUNCTION calculate_gpa(p_student_id INT)\nRETURNS NUMERIC(3,2)\nLANGUAGE plpgsql\nAS $$\nDECLARE result NUMERIC(3,2);\nBEGIN\n    SELECT ROUND(AVG(grade_points), 2) INTO result\n      FROM enrolments WHERE student_id = p_student_id;\n    RETURN COALESCE(result, 0.00);\nEND;\n$$;\n\n-- Called inline, like any built-in function\nSELECT name, calculate_gpa(id) AS gpa\n  FROM students\n WHERE calculate_gpa(id) > 3.5;', language: 'sql' },
      { type: 'code', value: '-- PROCEDURE: returns nothing, invoked with CALL\nCREATE PROCEDURE archive_old_orders(p_before DATE)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    INSERT INTO orders_archive SELECT * FROM orders WHERE order_date < p_before;\n    DELETE FROM orders WHERE order_date < p_before;\n\n    COMMIT;              -- a procedure MAY control transactions\nEND;\n$$;\n\nCALL archive_old_orders(\'2025-01-01\');\n\n-- This would be an error - a procedure cannot appear in a query:\n-- SELECT archive_old_orders(\'2025-01-01\');', language: 'sql' },
      { type: 'text', value: 'The second difference follows from the first: because a function may be called mid-query, it cannot manage transactions. Issuing COMMIT halfway through a SELECT would be incoherent. A procedure runs standalone, so it can COMMIT and ROLLBACK freely — which is exactly why batch and maintenance jobs are written as procedures.' },
      { type: 'text', value: 'Choose a function when you need a computed value inside a query, when the logic is read-only, and when you want it usable in WHERE or ORDER BY. Choose a procedure when the work modifies data across several statements, when it needs transaction control, or when it performs a multi-step business operation such as a transfer or an archive.' },
      { type: 'alert', value: 'Deterministic functions — those returning the same output for the same input, with no side effects — can be marked IMMUTABLE in PostgreSQL, letting the planner cache results and even use them in index expressions. Marking a non-deterministic function IMMUTABLE will produce wrong results, so declare it only when it is genuinely true.' }
    ]
  },
  'm11-l2': {
    title: 'Parameters & Returns',
    content: [
      { type: 'text', value: 'Parameters let one procedure serve many cases instead of hard-coding values. SQL defines three parameter modes.' },
      { type: 'text', value: 'IN is the default: the caller supplies a value the procedure reads but cannot change. OUT is the reverse: the procedure assigns a value the caller receives back. INOUT does both, taking an initial value and returning a modified one.' },
      { type: 'code', value: '-- IN parameters only\nCREATE PROCEDURE transfer_funds(\n    IN from_account INT,\n    IN to_account   INT,\n    IN amount       NUMERIC\n)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    UPDATE accounts SET balance = balance - amount WHERE id = from_account;\n    UPDATE accounts SET balance = balance + amount WHERE id = to_account;\nEND;\n$$;\n\nCALL transfer_funds(1, 2, 500.00);', language: 'sql' },
      { type: 'text', value: 'An OUT parameter returns a value without the procedure being a function. This is how you get a status or a generated id back from a CALL.' },
      { type: 'code', value: 'CREATE PROCEDURE create_student(\n    IN  p_name  VARCHAR(100),\n    IN  p_email VARCHAR(255),\n    OUT p_id    INT,\n    OUT p_status VARCHAR(50)\n)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    IF EXISTS (SELECT 1 FROM students WHERE email = p_email) THEN\n        p_id := NULL;\n        p_status := \'DUPLICATE_EMAIL\';\n        RETURN;\n    END IF;\n\n    INSERT INTO students (name, email)\n    VALUES (p_name, p_email)\n    RETURNING id INTO p_id;      -- capture the generated key\n\n    p_status := \'CREATED\';\nEND;\n$$;\n\nCALL create_student(\'Asha Nair\', \'asha@example.com\', NULL, NULL);', language: 'sql' },
      { type: 'text', value: 'Functions differ from procedures in one decisive way: a function must return a value, and because of that it can be used inside a query. A procedure cannot.' },
      { type: 'code', value: '-- A function returns a value and is usable in SELECT\nCREATE FUNCTION calculate_gpa(p_student_id INT)\nRETURNS NUMERIC(3,2)\nLANGUAGE plpgsql\nAS $$\nDECLARE\n    result NUMERIC(3,2);\nBEGIN\n    SELECT ROUND(AVG(grade_points), 2)\n      INTO result\n      FROM enrolments\n     WHERE student_id = p_student_id;\n\n    RETURN COALESCE(result, 0.00);   -- never return NULL\nEND;\n$$;\n\n-- Usable inline, unlike a procedure\nSELECT name, calculate_gpa(id) AS gpa\n  FROM students\n ORDER BY gpa DESC;', language: 'sql' },
      { type: 'text', value: 'A function can also return a whole result set using RETURNS TABLE, which makes it behave like a parameterised view.' },
      { type: 'code', value: 'CREATE FUNCTION top_students(p_limit INT)\nRETURNS TABLE (student_name VARCHAR, gpa NUMERIC)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    RETURN QUERY\n    SELECT s.name, calculate_gpa(s.id)\n      FROM students s\n     ORDER BY 2 DESC\n     LIMIT p_limit;\nEND;\n$$;\n\nSELECT * FROM top_students(5);', language: 'sql' },
      { type: 'alert', value: 'Prefix parameters (p_name) to distinguish them from column names. If a parameter and a column share a name, the database may resolve it to the column and your WHERE clause silently becomes "WHERE name = name" — always true.' }
    ]
  },
  'm11-l3': { 
    title: 'PL/pgSQL basics', 
    content: [
      { type: 'text', value: 'PL/pgSQL is a procedural language extension specifically for PostgreSQL. It adds programming control structures—like IF/ELSE blocks, FOR loops, and exception handling—to standard SQL.' },
      { type: 'code', language: 'sql', value: 'CREATE PROCEDURE transfer_funds(sender INT, receiver INT, amount DECIMAL) AS $$\nBEGIN\n  IF (SELECT balance FROM accounts WHERE id = sender) >= amount THEN\n    UPDATE accounts SET balance = balance - amount WHERE id = sender;\n    UPDATE accounts SET balance = balance + amount WHERE id = receiver;\n  ELSE\n    RAISE EXCEPTION \'Insufficient funds for transfer\';\n  END IF;\nEND;\n$$ LANGUAGE plpgsql;' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 12: DATABASE RELATIONSHIPS
  // ---------------------------------------------------------------------------
  'm12-l1': {
    title: 'One-to-One',
    content: [
      { type: 'text', value: 'A one-to-one relationship means each row in table A relates to at most one row in table B, and vice versa. It is the rarest of the three relationship types, because if two things always occur together the obvious question is why they are not one table.' },
      { type: 'text', value: 'There are three good reasons to split them. First, performance: move large, rarely-read columns such as a biography or a profile image out of the hot table so common queries scan less data. Second, security: isolate sensitive columns into a table with tighter access permissions. Third, optionality: when a set of columns applies to only a minority of rows, splitting avoids a wide table full of NULLs.' },
      { type: 'text', value: 'It is implemented with a foreign key that also carries a UNIQUE constraint. The UNIQUE is what turns one-to-many into one-to-one — without it, nothing stops several profiles referencing the same user.' },
      { type: 'code', value: 'CREATE TABLE users (\n    id       SERIAL PRIMARY KEY,\n    email    VARCHAR(255) NOT NULL UNIQUE,\n    password_hash VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE user_profiles (\n    id       SERIAL PRIMARY KEY,\n    user_id  INT NOT NULL UNIQUE,        -- UNIQUE enforces one-to-one\n    bio      TEXT,\n    avatar_url VARCHAR(500),\n    date_of_birth DATE,\n\n    CONSTRAINT fk_profile_user\n        FOREIGN KEY (user_id) REFERENCES users(id)\n        ON DELETE CASCADE\n);', language: 'sql' },
      { type: 'alert', value: 'Drop the UNIQUE constraint and you silently have a one-to-many relationship. That single keyword is the entire difference.' },
      { type: 'text', value: 'An alternative is to make the foreign key itself the primary key of the child table. This guarantees uniqueness for free and saves a column.' },
      { type: 'code', value: 'CREATE TABLE user_security (\n    user_id INT PRIMARY KEY,             -- PK and FK at once\n    two_factor_enabled BOOLEAN DEFAULT FALSE,\n    last_password_change TIMESTAMP,\n    failed_login_attempts INT DEFAULT 0,\n\n    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n\n-- Querying joins the two halves back together\nSELECT u.email, p.bio, s.two_factor_enabled\n  FROM users u\n  LEFT JOIN user_profiles  p ON p.user_id = u.id\n  LEFT JOIN user_security  s ON s.user_id = u.id\n WHERE u.id = 7;', language: 'sql' },
      { type: 'text', value: 'Use LEFT JOIN rather than INNER JOIN when reading these. A user may exist before their profile row is created, and an INNER JOIN would silently drop them from the results.' }
    ]
  },
  'm12-l2': {
    title: 'One-to-Many',
    content: [
      { type: 'text', value: 'One-to-many is by far the most common relationship in relational databases. One customer has many orders; one post has many comments; one department has many employees.' },
      { type: 'text', value: 'The rule for implementing it is simple and worth memorising: the foreign key always goes on the "many" side. A customer does not store a list of order ids; each order stores the id of its customer. This is exactly why relational databases avoid repeating groups — the alternative would be columns named order1, order2, order3, which breaks the moment a customer places a fourth order.' },
      { type: 'code', value: 'CREATE TABLE customers (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE\n);\n\nCREATE TABLE orders (\n    id          SERIAL PRIMARY KEY,\n    customer_id INT NOT NULL,            -- FK on the MANY side\n    order_date  TIMESTAMP DEFAULT NOW(),\n    total       NUMERIC(10,2) NOT NULL,\n\n    CONSTRAINT fk_order_customer\n        FOREIGN KEY (customer_id) REFERENCES customers(id)\n        ON DELETE RESTRICT               -- refuse to delete a customer with orders\n);\n\n-- Index the foreign key: joins and lookups depend on it\nCREATE INDEX idx_orders_customer ON orders(customer_id);', language: 'sql' },
      { type: 'alert', value: 'Always index your foreign key columns. The database does not do it automatically in most engines, and without the index every join and every "find all orders for this customer" query degrades into a full table scan.' },
      { type: 'text', value: 'The ON DELETE clause decides what happens to children when a parent is removed. RESTRICT and NO ACTION refuse the delete while children exist — the safest default for financial records. CASCADE deletes the children too, which is right for comments on a deleted post but dangerous elsewhere. SET NULL orphans the children, which requires the column to be nullable.' },
      { type: 'code', value: '-- Reading the relationship in both directions\n\n-- All orders for one customer\nSELECT o.id, o.order_date, o.total\n  FROM orders o\n WHERE o.customer_id = 42\n ORDER BY o.order_date DESC;\n\n-- Every customer with their order count and lifetime value\n-- LEFT JOIN keeps customers who have never ordered\nSELECT c.name,\n       COUNT(o.id)            AS order_count,\n       COALESCE(SUM(o.total), 0) AS lifetime_value\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n GROUP BY c.id, c.name\n ORDER BY lifetime_value DESC;\n\n-- Customers who have never placed an order\nSELECT c.name\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n WHERE o.id IS NULL;', language: 'sql' },
      { type: 'text', value: 'Note the use of COUNT(o.id) rather than COUNT(*) in that aggregate. With a LEFT JOIN, a customer with no orders still produces one row with NULLs; COUNT(*) would count it as 1, while COUNT(o.id) correctly reports 0 because it ignores NULLs.' }
    ]
  },
  'm12-l3': {
    title: 'Many-to-Many',
    content: [
      { type: 'text', value: 'A many-to-many relationship means each side can relate to several of the other: a student enrols in many courses, and each course has many students.' },
      { type: 'text', value: 'This cannot be represented with a foreign key on either table — neither side has a single counterpart to point at. The solution is a third table, variously called a junction, join, bridge, or associative table, holding one row per pairing. Every many-to-many is therefore decomposed into two one-to-many relationships.' },
      { type: 'code', value: 'CREATE TABLE students (\n    id   SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE courses (\n    id    SERIAL PRIMARY KEY,\n    code  VARCHAR(10) NOT NULL UNIQUE,\n    title VARCHAR(200) NOT NULL\n);\n\n-- The junction table\nCREATE TABLE enrolments (\n    student_id  INT NOT NULL,\n    course_id   INT NOT NULL,\n\n    -- Attributes that belong to the RELATIONSHIP, not to either side\n    enrolled_on DATE NOT NULL DEFAULT CURRENT_DATE,\n    grade       VARCHAR(5),\n\n    PRIMARY KEY (student_id, course_id),      -- composite PK prevents duplicates\n    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,\n    FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE CASCADE\n);\n\nCREATE INDEX idx_enrolments_course ON enrolments(course_id);', language: 'sql' },
      { type: 'text', value: 'The composite primary key on (student_id, course_id) is doing important work: it makes it impossible to enrol the same student in the same course twice. Without it, a double-clicked button creates duplicate enrolments.' },
      { type: 'alert', value: 'The junction table is the natural home for attributes describing the relationship itself. The enrolment date and the grade belong to the pairing — not to the student, and not to the course.' },
      { type: 'code', value: '-- Querying requires joining through the junction table\n\n-- Which courses is student 7 taking?\nSELECT c.code, c.title, e.enrolled_on, e.grade\n  FROM enrolments e\n  JOIN courses c ON c.id = e.course_id\n WHERE e.student_id = 7;\n\n-- Who is on course CS101?\nSELECT s.name, e.grade\n  FROM enrolments e\n  JOIN students s ON s.id = e.student_id\n  JOIN courses  c ON c.id = e.course_id\n WHERE c.code = \'CS101\';\n\n-- Enrolment count per course, including empty courses\nSELECT c.code, COUNT(e.student_id) AS enrolled\n  FROM courses c\n  LEFT JOIN enrolments e ON e.course_id = c.id\n GROUP BY c.id, c.code\n ORDER BY enrolled DESC;\n\n-- Students taking BOTH CS101 and CS102\nSELECT s.name\n  FROM students s\n  JOIN enrolments e ON e.student_id = s.id\n  JOIN courses    c ON c.id = e.course_id\n WHERE c.code IN (\'CS101\', \'CS102\')\n GROUP BY s.id, s.name\nHAVING COUNT(DISTINCT c.code) = 2;', language: 'sql' },
      { type: 'text', value: 'That last query is a common interview pattern. Filtering with IN then requiring HAVING COUNT(DISTINCT ...) = 2 is how you express "has all of these", as opposed to a plain WHERE which only expresses "has any of these".' }
    ]
  },
  'm12-l4': {
    title: 'ER Diagrams',
    content: [
      { type: 'text', value: 'An Entity-Relationship diagram is the blueprint of a database. You draw it before writing any CREATE TABLE, because moving a relationship on paper costs seconds and moving it in production costs a migration.' },
      { type: 'text', value: 'There are three building blocks. An entity is a thing you store data about and becomes a table — Student, Course, Order. An attribute is a property of an entity and becomes a column. A relationship is how entities connect, and its cardinality is the number of rows involved on each side.' },
      { type: 'text', value: 'Crow\'s foot notation is the industry standard for cardinality. A single perpendicular bar means "exactly one". A crow\'s foot (a three-pronged fork) means "many". A circle means "zero", indicating the relationship is optional.' },
      { type: 'code', value: 'Crow\'s foot cardinality\n\n  ||------||    exactly one to exactly one\n  ||------o<    one to zero-or-many\n  ||-----|<     one to one-or-many\n  >o----o<      many to many\n\nA worked example\n\n  CUSTOMER ||------o< ORDER ||------|< ORDER_ITEM >|------|| PRODUCT\n\n  Read as:\n    A customer places zero or many orders.\n    An order contains one or many order items.\n    Each order item refers to exactly one product.', language: 'sql' },
      { type: 'text', value: 'Read the diagram aloud in both directions — it is the fastest way to catch a modelling error. "One customer has many orders" and "one order belongs to exactly one customer" together confirm a one-to-many. If both directions read as "many", you need a junction table.' },
      { type: 'text', value: 'Translating the diagram to DDL follows mechanical rules. Each entity becomes a table. Each attribute becomes a column. A one-to-many relationship becomes a foreign key on the many side. A many-to-many becomes a junction table. An optional relationship means the foreign key is nullable; a mandatory one means it is NOT NULL.' },
      { type: 'code', value: '-- The diagram above, translated\n\nCREATE TABLE customers (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE products (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(200) NOT NULL,\n    price NUMERIC(10,2) NOT NULL\n);\n\n-- one-to-many: FK on the many side, NOT NULL because it is mandatory\nCREATE TABLE orders (\n    id          SERIAL PRIMARY KEY,\n    customer_id INT NOT NULL REFERENCES customers(id),\n    order_date  TIMESTAMP DEFAULT NOW()\n);\n\n-- the junction resolving orders <-> products\nCREATE TABLE order_items (\n    order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n    product_id INT NOT NULL REFERENCES products(id),\n    quantity   INT NOT NULL CHECK (quantity > 0),\n    unit_price NUMERIC(10,2) NOT NULL,   -- price AT TIME OF ORDER\n\n    PRIMARY KEY (order_id, product_id)\n);', language: 'sql' },
      { type: 'alert', value: 'Note unit_price on order_items. Product prices change, but an old invoice must never change with them. Storing the price paid at the time of the order is a deliberate, correct duplication — one of the few cases where copying data is right.' }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 13: NORMALIZATION
  // ---------------------------------------------------------------------------
  'm13-l1': { 
    title: 'Database Anomalies', 
    content: [
      { type: 'text', value: 'An unnormalized database stores too much redundant data in a single giant table (like an Excel spreadsheet). This leads to critical anomalies:' },
      { type: 'text', value: '• Update Anomaly: If a user changes their phone number, you might have to locate and update 50 different rows where their name appears.' },
      { type: 'text', value: '• Deletion Anomaly: Deleting an order might accidentally delete the only record you have of that customer\'s shipping address.' },
      { type: 'text', value: '• Insertion Anomaly: You might not be able to add a new customer into the system until they place an order.' }
    ] 
  },
  'm13-l2': { 
    title: 'Normal Forms', 
    content: [
      { type: 'text', value: 'Normalization is a systematic approach to decomposing tables to eliminate data redundancy.' },
      { type: 'text', value: '• 1NF (First Normal Form): Ensure every column holds atomic values. Do not store comma-separated lists or arrays in a standard text column.' },
      { type: 'text', value: '• 2NF (Second Normal Form): The table must be in 1NF, and all non-key attributes must depend on the ENTIRE primary key (relevant for composite keys).' },
      { type: 'text', value: '• 3NF (Third Normal Form): The table must be in 2NF, and no non-key attribute can depend on another non-key attribute (eliminate transitive dependencies).' },
      { type: 'alert', value: 'In production systems, you generally aim to normalize up to 3NF. Going further (BCNF, 4NF) is rare and often hurts performance.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 14: POSTGRESQL ADVANCED
  // ---------------------------------------------------------------------------
  'm14-l1': { 
    title: 'UUID, JSONB, Arrays, ENUM', 
    content: [
      { type: 'text', value: 'PostgreSQL provides incredibly powerful data types that go far beyond standard ANSI SQL.' },
      { type: 'text', value: '• UUID: A 128-bit universally unique identifier (e.g. 550e8400-e29b-41d4-a716-446655440000). Highly recommended for Primary Keys on public APIs over sequential integers to prevent ID-guessing attacks.' },
      { type: 'text', value: '• JSONB: Stores JSON data in a parsed binary format. You can index and query deeply nested properties inside the JSON almost as fast as a normal column.' },
      { type: 'text', value: '• Arrays: You can store an array of integers or text directly in a column.' },
      { type: 'code', language: 'sql', value: 'CREATE TABLE api_logs (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  request_payload JSONB NOT NULL,\n  tags TEXT[]\n);\n\n-- Query inside the JSON object!\nSELECT * FROM api_logs WHERE request_payload->>\'user_action\' = \'login\';' }
    ] 
  },
  'm14-l2': { 
    title: 'CTE & Recursive Query', 
    content: [
      { type: 'text', value: 'Common Table Expressions (CTEs), introduced by the WITH clause, make complex queries highly readable by creating temporary, named result sets that exist only during the execution of the query.' },
      { type: 'text', value: 'Recursive CTEs are specifically designed to query hierarchical or graph data, like a company\'s organizational chart (employee -> manager -> VP) or a nested folder structure.' },
      { type: 'code', language: 'sql', value: 'WITH RegionalSales AS (\n  SELECT region, SUM(amount) as total \n  FROM sales \n  GROUP BY region\n)\nSELECT region, total \nFROM RegionalSales \nWHERE total > (SELECT AVG(total) FROM RegionalSales);' }
    ] 
  },
  'm14-l3': { 
    title: 'Window Functions', 
    content: [
      { type: 'text', value: 'Window functions perform calculations across a set of table rows related to the current row. UNLIKE aggregate functions with GROUP BY, window functions do NOT collapse the rows into a single output row.' },
      { type: 'text', value: 'They are essential for running totals, moving averages, and ranking.' },
      { type: 'code', language: 'sql', value: '-- Rank employees by salary within their specific department\nSELECT \n  name, \n  department_id, \n  salary, \n  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as salary_rank\nFROM employees;' },
      { type: 'text', value: 'The PARTITION BY clause divides the rows into groups (windows), and the function is applied independently within each group.' }
    ] 
  },

  // ---------------------------------------------------------------------------
  // MODULE 15: SQL FOR BACKEND DEVELOPERS
  // ---------------------------------------------------------------------------
  'm15-l1': { 
    title: 'Node.js + SQL Connections', 
    content: [
      { type: 'text', value: 'In a real backend application (like Node.js, Python, or Go), you connect to the database using a driver. The driver maintains a Connection Pool so the app doesn\'t incur the massive overhead of opening and closing a TCP connection for every single query.' },
      { type: 'alert', value: 'CRITICAL SECURITY RULE: NEVER concatenate user input directly into your SQL string. This leads to SQL Injection vulnerabilities, allowing hackers to destroy or steal your data. ALWAYS use Parameterized Queries.' },
      { type: 'code', language: 'javascript', value: '// Using the "pg" driver in Node.js\n// Notice the $1 and $2 parameters. The driver escapes them safely.\nconst result = await pool.query(\n  \'SELECT * FROM users WHERE email = $1 AND is_active = $2\', \n  [req.body.email, true]\n);' }
    ] 
  },
  'm15-l2': { 
    title: 'ORM vs Raw SQL (Prisma/TypeORM)', 
    content: [
      { type: 'text', value: 'ORMs (Object-Relational Mappers) like Prisma, TypeORM, or Sequelize abstract away raw SQL, letting you interact with the database using object-oriented code (e.g., TypeScript objects).' },
      { type: 'text', value: '• Pros: Strong type safety, massive developer velocity, easy migrations, and reduced boilerplate.' },
      { type: 'text', value: '• Cons: Can generate highly inefficient queries under the hood (like the notorious N+1 query problem). They make complex analytical queries difficult to express.' },
      { type: 'text', value: 'Best Practice: Use an ORM for 90% of your CRUD operations, but drop down to a Raw SQL query builder (like Kysely or Knex) for the 10% of complex, performance-critical analytical queries.' }
    ] 
  },
  'm15-l3': {
    title: 'Migrations & Seeders',
    content: [
      { type: 'text', value: 'A migration is a versioned, incremental change to your database schema, kept in source control alongside your code. It answers the question every team eventually faces: how do we apply the same schema change to five developer machines, CI, staging and production, in the right order, exactly once?' },
      { type: 'text', value: 'Hand-running ALTER TABLE in a production console does not scale and is not reproducible. Migrations make schema changes deterministic and reviewable in a pull request like any other code.' },
      { type: 'text', value: 'Each migration has an up step applying the change and, ideally, a down step reversing it. The tool records which migrations have run in a metadata table, so running the command again is a safe no-op.' },
      { type: 'code', value: '-- migrations/20260730120000_create_students.sql\n\n-- UP\nCREATE TABLE students (\n    id         SERIAL PRIMARY KEY,\n    name       VARCHAR(100) NOT NULL,\n    email      VARCHAR(255) NOT NULL UNIQUE,\n    created_at TIMESTAMP NOT NULL DEFAULT NOW()\n);\n\nCREATE INDEX idx_students_email ON students(email);\n\n-- DOWN\n-- DROP INDEX idx_students_email;\n-- DROP TABLE students;', language: 'sql' },
      { type: 'code', value: '-- migrations/20260731093000_add_grade_to_students.sql\n\n-- UP: additive changes are safe to deploy while the app is running\nALTER TABLE students ADD COLUMN grade VARCHAR(5);\n\n-- Backfill existing rows before adding any NOT NULL constraint\nUPDATE students SET grade = \'N/A\' WHERE grade IS NULL;\n\nALTER TABLE students ALTER COLUMN grade SET NOT NULL;\n\n-- DOWN\n-- ALTER TABLE students DROP COLUMN grade;', language: 'sql' },
      { type: 'alert', value: 'Never edit a migration that has already run somewhere else. Machines that applied the old version will never pick up your edit, and the schemas silently diverge. Always write a new migration instead.' },
      { type: 'text', value: 'A seeder populates the database with data rather than changing its structure. Reference seeds (countries, roles, categories) are required for the application to function and belong in every environment. Demo seeds (fake students, sample orders) are for development and testing only, and must never run in production.' },
      { type: 'code', value: '-- seeds/01_roles.sql - reference data, required everywhere\nINSERT INTO roles (code, label) VALUES\n    (\'ADMIN\',   \'Administrator\'),\n    (\'TEACHER\', \'Teacher\'),\n    (\'STUDENT\', \'Student\')\nON CONFLICT (code) DO NOTHING;      -- idempotent: safe to re-run\n\n-- seeds/dev/02_sample_students.sql - development only\nINSERT INTO students (name, email, grade) VALUES\n    (\'Asha Nair\',  \'asha@example.com\',  \'A\'),\n    (\'Ravi Kumar\', \'ravi@example.com\',  \'B\'),\n    (\'Meera Das\',  \'meera@example.com\', \'A\')\nON CONFLICT (email) DO NOTHING;', language: 'sql' },
      { type: 'text', value: 'The ON CONFLICT DO NOTHING clause makes a seed idempotent — running it twice does not create duplicates or throw. Idempotency is what lets you safely re-run seeds in CI on every build.' },
      { type: 'text', value: 'The common tools are Flyway and Liquibase in the Java world, Alembic for Python, and Prisma Migrate or Knex for Node. They differ in syntax but share the same model: ordered, versioned, recorded, applied once.' }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 16: REAL WORLD PROJECTS
  // ---------------------------------------------------------------------------
  'm16-p1': { 
    title: 'Project 1: Student Management DB', 
    content: [
      { type: 'text', value: 'Your task is to design a highly normalized database for a University.' },
      { type: 'text', value: 'Requirements:' },
      { type: 'text', value: '1. Entities: Students, Professors, Departments, and Courses.' },
      { type: 'text', value: '2. Relationships: A Professor belongs to a Department. A Course is taught by one Professor.' },
      { type: 'text', value: '3. A Student can enroll in many Courses, and a Course has many Students (You must implement a Many-to-Many junction table).' },
      { type: 'text', value: '4. Track the final grade the student received directly in the enrollment junction table.' }
    ] 
  },
  'm16-p2': { 
    title: 'Project 2: E-Commerce DB', 
    content: [
      { type: 'text', value: 'Build the schema for an online store like Amazon or Shopify.' },
      { type: 'text', value: 'Requirements:' },
      { type: 'text', value: '1. Entities: Users, Products, Categories, Orders, and Order_Items.' },
      { type: 'text', value: '2. Handle product inventory tracking.' },
      { type: 'text', value: '3. Crucial Design Requirement: Ensure an Order captures the exact price of the product AT THE TIME OF PURCHASE.' },
      { type: 'alert', value: 'If you just link the order item to the Product table, and the admin increases the product price a year later, all historical receipts will incorrectly show the new price! You must duplicate the `purchase_price` into the order items table.' }
    ] 
  },
  'm16-p3': {
    title: 'Project 3: LMS Database',
    content: [
      { type: 'text', value: 'Design the database for a Learning Management System: courses containing modules and lessons, students enrolling, progress being tracked, and quizzes being scored. This is deliberately close to the platform you are using now.' },
      { type: 'text', value: 'Start by identifying the entities and their relationships. Users and courses are many-to-many through enrolments. A course has many modules, and a module has many lessons — two one-to-many chains. Progress is per student per lesson, which is another many-to-many carrying data.' },
      { type: 'code', value: '-- Core entities\n\nCREATE TABLE users (\n    id            SERIAL PRIMARY KEY,\n    name          VARCHAR(100) NOT NULL,\n    email         VARCHAR(255) NOT NULL UNIQUE,\n    password_hash VARCHAR(255) NOT NULL,\n    role          VARCHAR(20)  NOT NULL DEFAULT \'STUDENT\'\n                  CHECK (role IN (\'STUDENT\',\'TEACHER\',\'ADMIN\')),\n    created_at    TIMESTAMP NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE courses (\n    id          SERIAL PRIMARY KEY,\n    slug        VARCHAR(80) NOT NULL UNIQUE,\n    title       VARCHAR(200) NOT NULL,\n    instructor_id INT REFERENCES users(id),\n    is_published BOOLEAN NOT NULL DEFAULT FALSE\n);\n\n-- Course -> Module -> Lesson: two one-to-many chains\nCREATE TABLE modules (\n    id           SERIAL PRIMARY KEY,\n    course_id    INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,\n    title        VARCHAR(200) NOT NULL,\n    sort_order   INT NOT NULL,\n    UNIQUE (course_id, sort_order)\n);\n\nCREATE TABLE lessons (\n    id          SERIAL PRIMARY KEY,\n    module_id   INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,\n    title       VARCHAR(200) NOT NULL,\n    content     TEXT,\n    sort_order  INT NOT NULL,\n    UNIQUE (module_id, sort_order)\n);', language: 'sql' },
      { type: 'text', value: 'The UNIQUE (course_id, sort_order) constraint is worth noting. It guarantees two modules in the same course cannot claim the same position, which is exactly the kind of integrity rule that is painful to enforce in application code and trivial in the schema.' },
      { type: 'code', value: '-- Enrolment: the many-to-many between users and courses\nCREATE TABLE enrolments (\n    user_id     INT NOT NULL REFERENCES users(id)   ON DELETE CASCADE,\n    course_id   INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,\n    enrolled_at TIMESTAMP NOT NULL DEFAULT NOW(),\n    completed_at TIMESTAMP,\n    PRIMARY KEY (user_id, course_id)\n);\n\n-- Progress: one row per lesson a student has completed\nCREATE TABLE lesson_progress (\n    user_id      INT NOT NULL REFERENCES users(id)    ON DELETE CASCADE,\n    lesson_id    INT NOT NULL REFERENCES lessons(id)  ON DELETE CASCADE,\n    completed_at TIMESTAMP NOT NULL DEFAULT NOW(),\n    PRIMARY KEY (user_id, lesson_id)\n);\n\n-- Quizzes and attempts\nCREATE TABLE quizzes (\n    id         SERIAL PRIMARY KEY,\n    module_id  INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,\n    pass_mark  INT NOT NULL DEFAULT 60\n);\n\nCREATE TABLE quiz_attempts (\n    id         SERIAL PRIMARY KEY,\n    quiz_id    INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,\n    user_id    INT NOT NULL REFERENCES users(id)   ON DELETE CASCADE,\n    score      INT NOT NULL CHECK (score BETWEEN 0 AND 100),\n    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()\n);\n\nCREATE INDEX idx_progress_user   ON lesson_progress(user_id);\nCREATE INDEX idx_attempts_user   ON quiz_attempts(user_id, quiz_id);', language: 'sql' },
      { type: 'text', value: 'Now the queries that make the product work. Course completion percentage is the classic one: count the lessons a student has finished against the total lessons in the course.' },
      { type: 'code', value: '-- Percentage completion for one student on one course\nSELECT c.title,\n       COUNT(DISTINCT lp.lesson_id) AS completed,\n       COUNT(DISTINCT l.id)         AS total,\n       ROUND(100.0 * COUNT(DISTINCT lp.lesson_id)\n                   / NULLIF(COUNT(DISTINCT l.id), 0), 1) AS percent\n  FROM courses c\n  JOIN modules m ON m.course_id = c.id\n  JOIN lessons l ON l.module_id = m.id\n  LEFT JOIN lesson_progress lp\n         ON lp.lesson_id = l.id AND lp.user_id = 7\n WHERE c.id = 1\n GROUP BY c.id, c.title;\n\n-- Best score per quiz for a student\nSELECT q.id, MAX(a.score) AS best_score,\n       MAX(a.score) >= q.pass_mark AS passed\n  FROM quizzes q\n  LEFT JOIN quiz_attempts a ON a.quiz_id = q.id AND a.user_id = 7\n GROUP BY q.id, q.pass_mark;', language: 'sql' },
      { type: 'alert', value: 'NULLIF(count, 0) guards against division by zero for a course with no lessons yet. Without it the query throws instead of returning 0 percent. Defensive division like this is a habit worth building.' },
      { type: 'text', value: 'Your task: extend this schema to support certificates issued on course completion, discussion threads on lessons, and per-student notes. Decide the cardinality of each new relationship before writing the DDL, and index every foreign key you add.' }
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 17: INTERVIEW PREPARATION
  // ---------------------------------------------------------------------------
  'm17-l1': {
    title: 'Beginner: 50+ Questions',
    content: [
      { type: 'text', value: 'This lesson collects the foundational SQL questions that open almost every interview. Know these cold — they are the filter before the harder material.' },
      { type: 'text', value: 'What is the difference between DELETE, TRUNCATE and DROP? DELETE removes rows, accepts a WHERE clause, is logged per row and can be rolled back. TRUNCATE removes all rows quickly by deallocating pages, accepts no WHERE, and resets identity counters. DROP removes the table structure entirely.' },
      { type: 'text', value: 'What is the difference between WHERE and HAVING? WHERE filters individual rows before grouping; HAVING filters groups after aggregation. You cannot use an aggregate function in WHERE, because the groups do not exist yet.' },
      { type: 'code', value: '-- WHERE filters rows first, HAVING filters the resulting groups\nSELECT department, AVG(salary) AS avg_salary\n  FROM employees\n WHERE hire_date >= \'2020-01-01\'     -- row filter, applied first\n GROUP BY department\nHAVING AVG(salary) > 50000           -- group filter, applied after\n ORDER BY avg_salary DESC;', language: 'sql' },
      { type: 'text', value: 'What is the difference between UNION and UNION ALL? UNION removes duplicate rows, which requires a sort and costs time. UNION ALL keeps everything and is faster. Use UNION ALL unless you actually need deduplication.' },
      { type: 'text', value: 'How do you handle NULL correctly? NULL means unknown, not zero and not empty string. Any comparison with NULL using = or != yields NULL, not true or false — which is why you must write IS NULL and IS NOT NULL. Aggregate functions skip NULLs, except COUNT(*).' },
      { type: 'code', value: '-- The NULL traps\nSELECT * FROM users WHERE age = NULL;      -- returns NOTHING, always\nSELECT * FROM users WHERE age IS NULL;     -- correct\n\n-- COUNT(*) counts rows; COUNT(column) skips NULLs\nSELECT COUNT(*)       AS all_rows,        -- 100\n       COUNT(phone)   AS with_phone,      -- 62\n       COALESCE(phone, \'not provided\') AS display\n  FROM users;\n\n-- NULL propagates through arithmetic and concatenation\nSELECT 100 + NULL;                        -- NULL, not 100', language: 'sql' },
      { type: 'text', value: 'What are the main constraint types? PRIMARY KEY (unique and not null, one per table), FOREIGN KEY (references another table\'s key), UNIQUE (no duplicates, but NULLs allowed), NOT NULL, CHECK (an arbitrary boolean condition), and DEFAULT.' },
      { type: 'text', value: 'What is the logical order of execution of a SELECT? This is asked constantly and the answer is not the order you write it: FROM and JOIN first, then WHERE, then GROUP BY, then HAVING, then SELECT, then DISTINCT, then ORDER BY, and finally LIMIT. This explains why you cannot reference a SELECT alias in WHERE — the alias does not exist yet — but you can in ORDER BY.' },
      { type: 'code', value: '-- Written order vs execution order\nSELECT department, COUNT(*) AS headcount   -- 5th\n  FROM employees                            -- 1st\n WHERE active = TRUE                        -- 2nd\n GROUP BY department                        -- 3rd\nHAVING COUNT(*) > 5                         -- 4th\n ORDER BY headcount DESC                    -- 6th  (alias works here)\n LIMIT 10;                                  -- 7th\n\n-- This FAILS: \'headcount\' does not exist during WHERE\n-- SELECT department, COUNT(*) AS headcount FROM employees WHERE headcount > 5;', language: 'sql' },
      { type: 'text', value: 'Other rapid-fire questions to prepare: the difference between CHAR and VARCHAR; what an index does and what it costs; what a primary key is versus a unique key; what a composite key is; the difference between a view and a table; what DISTINCT does; and how LIMIT and OFFSET implement pagination.' },
      { type: 'alert', value: 'When answering, always give the definition, then the trade-off, then a one-line example. Interviewers are testing whether you have used the feature in anger, not whether you memorised a glossary.' }
    ]
  },
  'm17-l2': {
    title: 'Intermediate: Joins & Aggregations',
    content: [
      { type: 'text', value: 'The intermediate round is dominated by joins and grouping. These questions separate candidates who can write queries from those who only recognise them.' },
      { type: 'text', value: 'Explain every join type. INNER returns only matching rows. LEFT returns all left rows plus matches, filling NULL where absent. RIGHT is the mirror image. FULL OUTER returns everything from both sides. CROSS returns the Cartesian product. SELF joins a table to itself, which is how you model hierarchies.' },
      { type: 'code', value: '-- Find rows in A with NO match in B: the anti-join pattern\nSELECT c.name\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n WHERE o.id IS NULL;\n\n-- SELF JOIN: every employee alongside their manager\nSELECT e.name AS employee, m.name AS manager\n  FROM employees e\n  LEFT JOIN employees m ON m.id = e.manager_id;', language: 'sql' },
      { type: 'text', value: 'The anti-join above is asked constantly. The trick is that the LEFT JOIN produces NULLs for unmatched rows, and filtering WHERE the joined key IS NULL isolates exactly those. Note the filter must be on a column from the right table.' },
      { type: 'alert', value: 'A classic trap: putting the right table\'s condition in WHERE instead of ON turns a LEFT JOIN into an INNER JOIN, because the NULL rows fail the WHERE test. Conditions on the right table belong in ON; conditions on the left table belong in WHERE.' },
      { type: 'code', value: '-- WRONG: silently behaves as an INNER JOIN\nSELECT c.name, o.total\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n WHERE o.status = \'PAID\';        -- kills the unmatched NULL rows\n\n-- RIGHT: the condition moves into ON\nSELECT c.name, o.total\n  FROM customers c\n  LEFT JOIN orders o\n         ON o.customer_id = c.id\n        AND o.status = \'PAID\';', language: 'sql' },
      { type: 'text', value: 'Find the second highest salary. There are three standard answers and knowing more than one impresses. The subquery version is portable; the window-function version is the modern one and handles ties correctly.' },
      { type: 'code', value: '-- 1. Subquery: the max below the max\nSELECT MAX(salary) AS second_highest\n  FROM employees\n WHERE salary < (SELECT MAX(salary) FROM employees);\n\n-- 2. OFFSET: simple but breaks with duplicate salaries\nSELECT DISTINCT salary\n  FROM employees\n ORDER BY salary DESC\n LIMIT 1 OFFSET 1;\n\n-- 3. DENSE_RANK: correct with ties, and generalises to Nth\nSELECT salary FROM (\n    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n      FROM employees\n) ranked\n WHERE rnk = 2;', language: 'sql' },
      { type: 'text', value: 'Find duplicates. Group by the column and keep groups with more than one member — this generalises to any duplicate-detection question.' },
      { type: 'code', value: '-- Duplicate emails and how many times each appears\nSELECT email, COUNT(*) AS occurrences\n  FROM users\n GROUP BY email\nHAVING COUNT(*) > 1\n ORDER BY occurrences DESC;\n\n-- Delete duplicates, keeping the lowest id of each group\nDELETE FROM users a\n USING users b\n WHERE a.email = b.email\n   AND a.id > b.id;\n\n-- Top earner per department: a correlated subquery\nSELECT e.department, e.name, e.salary\n  FROM employees e\n WHERE e.salary = (SELECT MAX(salary)\n                     FROM employees\n                    WHERE department = e.department);', language: 'sql' },
      { type: 'text', value: 'Know the difference between IN, EXISTS and JOIN for existence checks. EXISTS short-circuits on the first match and is usually fastest on large subqueries. IN materialises the full subquery result. And beware NOT IN: if the subquery returns even one NULL, NOT IN returns no rows at all — use NOT EXISTS instead.' }
    ]
  },
  'm17-l3': { 
    title: 'Advanced: Optimization & Indexing', 
    content: [
      { type: 'text', value: 'Advanced rounds will ask you to architect a schema or optimize a severely slow query.' },
      { type: 'text', value: 'Example Question: "We have a table with 100 million rows. This query filtering by user_id is taking 15 seconds. How do you fix it?"' },
      { type: 'text', value: 'Answer: First, run `EXPLAIN ANALYZE` on the query. If the output shows a `Seq Scan` (Sequential Scan), it means the database is reading all 100 million rows. I would solve this by creating a B-Tree index on the `user_id` column, which will change the execution plan to a lightning-fast `Index Scan`.' }
    ] 
  },
  'm17-l4': {
    title: 'Company Level Practice',
    content: [
      { type: 'text', value: 'Senior rounds move from syntax to judgement. You are asked to design, diagnose and defend decisions rather than recall keywords.' },
      { type: 'text', value: 'A frequent opener: this query was fast last month and is slow now — how do you diagnose it? Work through a fixed sequence. Run EXPLAIN ANALYZE and read the plan. Look for sequential scans on large tables, which suggest a missing index. Check whether row estimates are wildly different from actual rows, which suggests stale statistics and calls for ANALYZE. Look for nested loops over large inputs. Check whether the query is returning far more rows than the application uses.' },
      { type: 'code', value: 'EXPLAIN ANALYZE\nSELECT c.name, COUNT(o.id)\n  FROM customers c\n  JOIN orders o ON o.customer_id = c.id\n WHERE o.order_date >= \'2026-01-01\'\n GROUP BY c.id, c.name;\n\n-- Reading the plan:\n--   Seq Scan on orders  (cost=0.00..18334.00 rows=1000000)\n--     Filter: (order_date >= \'2026-01-01\')\n--     Rows Removed by Filter: 940000    <-- scanning 1M to keep 60k\n--\n-- Diagnosis: no index on order_date. The fix:\n\nCREATE INDEX idx_orders_date ON orders(order_date);\n\n-- Composite index when both columns are filtered together.\n-- Column order matters: most selective / most-filtered first.\nCREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);', language: 'sql' },
      { type: 'alert', value: 'A composite index on (a, b) can serve queries filtering on a alone, or on a and b, but NOT on b alone. This left-prefix rule is a favourite senior-level question.' },
      { type: 'text', value: 'Design questions are open-ended by design. Asked to design Instagram, Uber or a URL shortener, do not start writing DDL. Clarify scale and access patterns first, list the entities, decide the relationships, then write the schema and finally discuss indexing and sharding. Interviewers are watching your process more than your final tables.' },
      { type: 'code', value: '-- Design sketch: a URL shortener\nCREATE TABLE short_urls (\n    id          BIGSERIAL PRIMARY KEY,\n    short_code  VARCHAR(10) NOT NULL UNIQUE,   -- the lookup key\n    long_url    TEXT NOT NULL,\n    user_id     INT REFERENCES users(id),\n    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),\n    expires_at  TIMESTAMP\n);\n\n-- The hot path is a single lookup by short_code, so it must be indexed.\n-- UNIQUE already creates that index.\n\n-- Click analytics are write-heavy and separated deliberately:\n-- appending here never blocks the read path above.\nCREATE TABLE url_clicks (\n    id          BIGSERIAL PRIMARY KEY,\n    short_url_id BIGINT NOT NULL REFERENCES short_urls(id) ON DELETE CASCADE,\n    clicked_at  TIMESTAMP NOT NULL DEFAULT NOW(),\n    referrer    TEXT,\n    country     CHAR(2)\n);\n\nCREATE INDEX idx_clicks_url_time ON url_clicks(short_url_id, clicked_at DESC);', language: 'sql' },
      { type: 'text', value: 'Expect questions on transaction isolation. Read Uncommitted allows dirty reads. Read Committed, the common default, prevents dirty reads but allows non-repeatable reads. Repeatable Read prevents those but allows phantom rows. Serializable prevents all anomalies at the cost of throughput. Be ready to name the anomaly each level permits.' },
      { type: 'text', value: 'Analytical questions increasingly use window functions. Running totals, month-over-month growth, and per-group rankings are all standard.' },
      { type: 'code', value: '-- Running total and month-over-month growth\nSELECT month,\n       revenue,\n       SUM(revenue) OVER (ORDER BY month)              AS running_total,\n       LAG(revenue) OVER (ORDER BY month)              AS prev_month,\n       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))\n                   / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS growth_pct\n  FROM monthly_revenue\n ORDER BY month;\n\n-- Top 3 products per category\nSELECT category, name, revenue FROM (\n    SELECT category, name, revenue,\n           ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) AS rn\n      FROM product_sales\n) ranked\n WHERE rn <= 3;', language: 'sql' },
      { type: 'text', value: 'Finally, be ready to defend a trade-off. When would you denormalise? When read performance matters more than write simplicity and the duplicated data changes rarely. When would you not use an index? On small tables, on low-cardinality columns such as booleans, and on write-heavy tables where the index maintenance cost outweighs the read gain. Answering with a trade-off rather than a rule is what marks a senior candidate.' }
    ]
  },

  // ---------------------------------------------------------------------------
  // CAPSTONE PROJECT
  // ---------------------------------------------------------------------------
  'capstone-project': {
    title: 'Udemy + HackerRank Clone DB',
    content: [
      { type: 'text', value: 'Welcome to the Final Capstone Project! You will design a massive relational database for an LMS platform that also executes code.' },
      { type: 'text', value: 'Requirements:' },
      { type: 'text', value: '• User Management (Auth, Roles, Profiles)' },
      { type: 'text', value: '• Course hierarchies (Learning Path -> Course -> Module -> Lesson)' },
      { type: 'text', value: '• Coding Problems & Test Cases for interactive labs' },
      { type: 'text', value: '• Submission Tracking (Status, Execution Time, Memory Usage)' },
      { type: 'text', value: '• Subscriptions & Payment History (Stripe Integration)' },
      { type: 'alert', value: 'Draw out your schema using an ER Diagram tool like dbdiagram.io before you write a single line of SQL. Proper design here will save you hours of rewriting code later!' }
    ]
  },

  'test-theory': {
    title: 'Theory Test',
    content: [
      { type: 'text', value: 'The theory test covers the conceptual foundation of the course: relational design, normalisation, transactions, indexing and query execution. It is closed-book and weighted at 25 percent of your final grade.' },
      { type: 'text', value: 'Format: 40 multiple-choice and short-answer questions, 60 minutes, pass mark 60 percent. Questions are drawn proportionally from every module, with extra weight on Modules 7 (Joins), 10 (Transactions) and 13 (Normalisation).' },
      { type: 'text', value: 'What you must be able to explain without notes: the difference between DELETE, TRUNCATE and DROP; WHERE versus HAVING; every join type and when each is correct; the four ACID properties; the three normal forms and what anomaly each removes; what an index costs as well as what it gives you; and the logical order of execution of a SELECT statement.' },
      { type: 'code', value: '-- Sample question 1\n-- Which normal form does this table violate, and why?\n\nCREATE TABLE orders (\n    order_id    INT PRIMARY KEY,\n    customer_id INT,\n    customer_city VARCHAR(100),   -- depends on customer_id, not order_id\n    total       NUMERIC(10,2)\n);\n\n-- Answer: Third Normal Form. customer_city is transitively dependent\n-- on the primary key via customer_id. Move it to the customers table.\n\n\n-- Sample question 2\n-- Why does this query return no rows, even though some users have no phone?\nSELECT * FROM users WHERE phone = NULL;\n\n-- Answer: comparison with NULL yields NULL, never true. Use IS NULL.', language: 'sql' },
      { type: 'alert', value: 'The single most common failure is confusing WHERE with HAVING, and the second is answering NULL comparison questions with = instead of IS. Review Module 4 and Module 6 carefully before sitting the test.' }
    ]
  },
  'test-practical': {
    title: 'Practical Query Test',
    content: [
      { type: 'text', value: 'The practical test gives you a populated schema and asks you to write working queries against it. It is open-book — you may consult documentation, exactly as you would at work — and is weighted at 40 percent.' },
      { type: 'text', value: 'Format: 12 query-writing tasks, 90 minutes, pass mark 60 percent. Each query is graded on correctness first and efficiency second. A query that returns the right answer via a full table scan scores partial marks; one that returns the wrong answer scores none.' },
      { type: 'code', value: '-- You will be given a schema of this shape\n\nCREATE TABLE customers (id, name, city, joined_on);\nCREATE TABLE orders    (id, customer_id, order_date, status, total);\nCREATE TABLE order_items (order_id, product_id, quantity, unit_price);\nCREATE TABLE products  (id, name, category, price, stock);\n\n\n-- Representative tasks\n\n-- 1. Customers who have never placed an order\nSELECT c.name\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n WHERE o.id IS NULL;\n\n-- 2. Top 5 products by revenue\nSELECT p.name, SUM(oi.quantity * oi.unit_price) AS revenue\n  FROM order_items oi\n  JOIN products p ON p.id = oi.product_id\n GROUP BY p.id, p.name\n ORDER BY revenue DESC\n LIMIT 5;\n\n-- 3. Second highest order total\nSELECT MAX(total) FROM orders\n WHERE total < (SELECT MAX(total) FROM orders);\n\n-- 4. Month-over-month revenue growth (window functions)\nSELECT DATE_TRUNC(\'month\', order_date) AS month,\n       SUM(total) AS revenue,\n       LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC(\'month\', order_date)) AS prev\n  FROM orders\n GROUP BY 1\n ORDER BY 1;', language: 'sql' },
      { type: 'text', value: 'Tasks escalate in difficulty: the first four cover filtering and joins, the middle four cover aggregation and subqueries, and the last four require CTEs, window functions, or query optimisation with EXPLAIN.' },
      { type: 'alert', value: 'Read every task twice before writing SQL. Most lost marks come from misreading the requirement — returning all customers when the question asked only for active ones — rather than from not knowing the syntax.' }
    ]
  },
  'test-design': {
    title: 'Schema Design Evaluation',
    content: [
      { type: 'text', value: 'The design evaluation assesses whether you can turn a set of business requirements into a correct, normalised, indexed schema. It is weighted at 25 percent and is submitted as work rather than sat under exam conditions.' },
      { type: 'text', value: 'You are given a written brief for a real-world system — a hospital appointment platform, a food delivery service, or a ticketing system — and must deliver an ER diagram, the full DDL, and a short written justification of your decisions.' },
      { type: 'text', value: 'The marking rubric has five parts. Correct entities and relationships with accurate cardinality (30 percent). Normalisation to at least 3NF, with any deliberate denormalisation explained (25 percent). Appropriate constraints — primary keys, foreign keys, NOT NULL, UNIQUE, CHECK (20 percent). Sensible indexing with reasoning (15 percent). Clarity of the written justification (10 percent).' },
      { type: 'code', value: '-- A fragment of the standard expected\n\nCREATE TABLE appointments (\n    id           SERIAL PRIMARY KEY,\n    patient_id   INT NOT NULL REFERENCES patients(id),\n    doctor_id    INT NOT NULL REFERENCES doctors(id),\n    scheduled_at TIMESTAMP NOT NULL,\n    status       VARCHAR(20) NOT NULL DEFAULT \'BOOKED\'\n                 CHECK (status IN (\'BOOKED\',\'ATTENDED\',\'CANCELLED\',\'NO_SHOW\')),\n\n    -- A doctor cannot be double-booked for the same slot\n    CONSTRAINT uq_doctor_slot UNIQUE (doctor_id, scheduled_at)\n);\n\n-- Foreign keys are indexed because every lookup joins on them\nCREATE INDEX idx_appt_patient ON appointments(patient_id);\nCREATE INDEX idx_appt_doctor_time ON appointments(doctor_id, scheduled_at);', language: 'sql' },
      { type: 'text', value: 'The uq_doctor_slot constraint above illustrates what earns marks: encoding a business rule in the schema rather than trusting application code to enforce it. Constraints that make invalid states unrepresentable are the mark of a good design.' },
      { type: 'alert', value: 'Explain your trade-offs explicitly. A denormalised column with a one-line justification scores well; the same column with no explanation reads as an error. The evaluators are assessing judgement, not adherence to rules.' }
    ]
  },
  'test-viva': {
    title: 'Viva / Interview Round',
    content: [
      { type: 'text', value: 'The viva is a live 30-minute discussion in which you defend your schema design and answer follow-up questions. It carries 10 percent of the grade but is the strongest predictor of interview readiness, because it mirrors a real technical interview.' },
      { type: 'text', value: 'It runs in three parts. First, ten minutes walking through your design submission and explaining why you chose each relationship. Second, ten minutes of scenario questions — "the orders table now has 50 million rows and this query takes 30 seconds, what do you do?". Third, ten minutes of rapid-fire fundamentals.' },
      { type: 'text', value: 'Preparation that actually helps: rehearse explaining your schema aloud, because articulating a design is a distinct skill from producing one. Be ready to defend every denormalisation. Know the EXPLAIN output of your own queries. And prepare an honest answer for what you would change given more time — evaluators respect self-critique.' },
      { type: 'code', value: '-- Questions you should be able to answer on the spot\n\n-- "Why did you make this a junction table rather than two columns?"\n-- "What happens to this data if a parent row is deleted?"\n-- "Which index serves this query, and why is column order what it is?"\n-- "This composite index is on (a, b). Does it help a query filtering only on b?"\n--     Answer: no - the left-prefix rule.\n-- "How would you find and remove duplicate rows in this table?"\n-- "At what isolation level does a phantom read become possible?"\n--     Answer: Repeatable Read and below; Serializable prevents it.', language: 'sql' },
      { type: 'alert', value: 'Saying "I do not know, but here is how I would find out" scores better than a confident wrong answer. Interviewers are calibrating your judgement and honesty as much as your recall.' }
    ]
  },
  'cert-view': {
    title: 'SQL Mastery Certificate',
    content: [
      { type: 'text', value: 'The SQL Mastery certificate is issued once you have completed every module, passed all four assessment components, and submitted the final capstone project.' },
      { type: 'text', value: 'The requirements in full: complete all 17 modules and their quizzes; score at least 60 percent in each of the theory, practical and design assessments; pass the viva; and submit a capstone that runs against a real database.' },
      { type: 'text', value: 'The certificate records your name, the completion date, the final weighted grade, a unique verification identifier, and a public verification URL. Employers can confirm authenticity through that URL without contacting you.' },
      { type: 'text', value: 'Grade bands are Distinction at 85 percent and above, Merit from 70 to 84, and Pass from 60 to 69. The final grade is the weighted total: theory 25 percent, practical 40 percent, design 25 percent, viva 10 percent.' },
      { type: 'alert', value: 'Add the verification URL to your LinkedIn certifications section and your CV rather than uploading an image. A verifiable link carries far more weight with recruiters than a PDF.' }
    ]
  },
  'cert-skills': {
    title: 'Verified Skills',
    content: [
      { type: 'text', value: 'Alongside the certificate you receive a verified skills profile listing the specific competencies you have demonstrated, each mapped to the assessment that evidenced it. This is more useful than the certificate alone, because it tells a hiring manager exactly what you can do.' },
      { type: 'text', value: 'Query authoring: writing multi-table joins, subqueries, aggregations, CTEs and window functions against a normalised schema. Evidenced by the practical test.' },
      { type: 'text', value: 'Database design: modelling entities and relationships, normalising to 3NF, choosing constraints, and justifying deliberate denormalisation. Evidenced by the design evaluation and capstone.' },
      { type: 'text', value: 'Performance engineering: reading EXPLAIN output, diagnosing missing indexes, understanding the left-prefix rule, and reasoning about the read-write trade-off of indexing. Evidenced by the practical test and viva.' },
      { type: 'text', value: 'Transactional correctness: applying ACID properties, choosing isolation levels, using savepoints, and preventing deadlocks through consistent lock ordering. Evidenced by the theory test.' },
      { type: 'text', value: 'Production practice: parameterised queries to prevent SQL injection, versioned migrations, idempotent seeders, and connection pooling. Evidenced by the capstone.' },
      { type: 'alert', value: 'When applying for roles, quote the specific skill lines rather than the certificate title. "Diagnosed and fixed a missing-index scan on a 1M-row table" is a far stronger CV line than "completed an SQL course".' }
    ]
  },
};

export const sqlQuizzes: Record<string, QuizQuestion[]> = {
  'm1-quiz': [{ id: 1, question: 'What does RDBMS stand for?', options: ['Relational Database Management System', 'Rational Data Management System', 'Relational Data Movement System', 'None of the above'], correctAnswer: 'Relational Database Management System' }, { id: 2, question: 'Which of these is NOT a relational database?', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Oracle'], correctAnswer: 'MongoDB' }, { id: 3, question: 'What is the main advantage of a DBMS over flat files?', options: ['Controlled concurrent access, integrity and querying', 'Smaller file sizes', 'Faster disk spin', 'No need for backups'], correctAnswer: 'Controlled concurrent access, integrity and querying' }, { id: 4, question: 'SQL stands for what?', options: ['Structured Query Language', 'Simple Query Logic', 'Standard Quality Language', 'Sequential Query Loader'], correctAnswer: 'Structured Query Language' }, { id: 5, question: 'Which type of database is best suited to flexible, schema-less documents?', options: ['NoSQL', 'RDBMS', 'Flat file', 'Spreadsheet'], correctAnswer: 'NoSQL' }],
  'm2-quiz': [{ id: 1, question: 'Which of these is NOT a valid SQL data type?', options: ['VARCHAR', 'INT', 'BOOLEAN', 'ARRAY_STRING'], correctAnswer: 'ARRAY_STRING' }, { id: 2, question: 'What does a PRIMARY KEY guarantee about a column?', options: ['It is unique and not null', 'It is indexed only', 'It allows duplicates', 'It is always an integer'], correctAnswer: 'It is unique and not null' }, { id: 3, question: 'What is the purpose of a FOREIGN KEY?', options: ['To reference the primary key of another table', 'To speed up sorting', 'To encrypt a column', 'To allow nulls'], correctAnswer: 'To reference the primary key of another table' }, { id: 4, question: 'Which data type is best for storing exact monetary values?', options: ['DECIMAL / NUMERIC', 'FLOAT', 'DOUBLE', 'REAL'], correctAnswer: 'DECIMAL / NUMERIC' }, { id: 5, question: 'What is the difference between CHAR and VARCHAR?', options: ['CHAR is fixed length, VARCHAR is variable length', 'CHAR holds numbers', 'VARCHAR is faster always', 'There is no difference'], correctAnswer: 'CHAR is fixed length, VARCHAR is variable length' }],
  'm3-quiz': [{ id: 1, question: 'Which command is used to add new rows to a table?', options: ['ADD', 'INSERT', 'UPDATE', 'APPEND'], correctAnswer: 'INSERT' }, { id: 2, question: 'Which category does CREATE TABLE belong to?', options: ['DDL', 'DML', 'DQL', 'DCL'], correctAnswer: 'DDL' }, { id: 3, question: 'Which command removes a table structure entirely?', options: ['DROP', 'DELETE', 'TRUNCATE', 'REMOVE'], correctAnswer: 'DROP' }, { id: 4, question: 'What is the key difference between DELETE and TRUNCATE?', options: ['DELETE can use WHERE and is logged per row; TRUNCATE removes all rows quickly', 'They are identical', 'TRUNCATE accepts WHERE', 'DELETE drops the table'], correctAnswer: 'DELETE can use WHERE and is logged per row; TRUNCATE removes all rows quickly' }, { id: 5, question: 'Which clause limits how many rows a SELECT returns?', options: ['LIMIT', 'TOP ONLY', 'RESTRICT', 'FILTER'], correctAnswer: 'LIMIT' }],
  'm4-quiz': [{ id: 1, question: 'Which operator is used to search for a specified pattern in a column?', options: ['LIKE', 'IN', 'BETWEEN', 'GET'], correctAnswer: 'LIKE' }, { id: 2, question: 'Which wildcard in LIKE matches any sequence of characters?', options: ['%', '_', '*', '?'], correctAnswer: '%' }, { id: 3, question: 'What does the _ wildcard match in a LIKE pattern?', options: ['Exactly one character', 'Any number of characters', 'A digit only', 'Nothing'], correctAnswer: 'Exactly one character' }, { id: 4, question: 'How do you correctly test for a NULL value?', options: ['IS NULL', '= NULL', '== NULL', 'EQUALS NULL'], correctAnswer: 'IS NULL' }, { id: 5, question: 'Which operator tests whether a value falls within an inclusive range?', options: ['BETWEEN', 'WITHIN', 'RANGE', 'INSIDE'], correctAnswer: 'BETWEEN' }],
  'm5-quiz': [{ id: 1, question: 'Which function returns the current date and time?', options: ['NOW()', 'TODAY()', 'CURRENT()', 'DATE()'], correctAnswer: 'NOW()' }, { id: 2, question: 'Which function returns the number of characters in a string?', options: ['LENGTH()', 'SIZE()', 'COUNT()', 'CHARS()'], correctAnswer: 'LENGTH()' }, { id: 3, question: 'Which function joins two strings together?', options: ['CONCAT()', 'MERGE()', 'JOIN()', 'ADD()'], correctAnswer: 'CONCAT()' }, { id: 4, question: 'Which function rounds a number to a given number of decimal places?', options: ['ROUND()', 'TRUNC()', 'FLOOR()', 'CEIL()'], correctAnswer: 'ROUND()' }, { id: 5, question: 'Which function converts a string to uppercase?', options: ['UPPER()', 'TOUPPER()', 'CAPS()', 'UCASE_ALL()'], correctAnswer: 'UPPER()' }],
  'm6-quiz': [{ id: 1, question: 'Which clause is used to filter the results of a GROUP BY?', options: ['HAVING', 'WHERE', 'FILTER', 'ORDER BY'], correctAnswer: 'HAVING' }, { id: 2, question: 'What is the key difference between WHERE and HAVING?', options: ['WHERE filters rows before grouping; HAVING filters groups after', 'They are identical', 'HAVING runs first', 'WHERE only works on numbers'], correctAnswer: 'WHERE filters rows before grouping; HAVING filters groups after' }, { id: 3, question: 'Which aggregate function ignores NULL values in the column?', options: ['COUNT(column)', 'COUNT(*)', 'Both ignore nulls', 'Neither'], correctAnswer: 'COUNT(column)' }, { id: 4, question: 'What does COUNT(*) count?', options: ['All rows including those with nulls', 'Only non-null rows', 'Only distinct rows', 'Only the first column'], correctAnswer: 'All rows including those with nulls' }, { id: 5, question: 'Which clause must non-aggregated SELECT columns appear in?', options: ['GROUP BY', 'ORDER BY', 'HAVING', 'WHERE'], correctAnswer: 'GROUP BY' }],
  'm7-quiz': [{ id: 1, question: 'Which JOIN returns all records when there is a match in either left or right table?', options: ['FULL JOIN', 'INNER JOIN', 'LEFT JOIN', 'CROSS JOIN'], correctAnswer: 'FULL JOIN' }, { id: 2, question: 'Which JOIN returns only rows with a match in both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'], correctAnswer: 'INNER JOIN' }, { id: 3, question: 'Which JOIN keeps all rows from the left table regardless of a match?', options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'CROSS JOIN'], correctAnswer: 'LEFT JOIN' }, { id: 4, question: 'What does a CROSS JOIN produce?', options: ['The Cartesian product of both tables', 'Only matching rows', 'Only the left table', 'An error'], correctAnswer: 'The Cartesian product of both tables' }, { id: 5, question: 'How do you find rows in table A with no match in table B?', options: ['LEFT JOIN B and filter WHERE B.id IS NULL', 'INNER JOIN', 'CROSS JOIN', 'UNION'], correctAnswer: 'LEFT JOIN B and filter WHERE B.id IS NULL' }],
  'm8-quiz': [{ id: 1, question: 'What is a subquery?', options: ['A query nested inside another query', 'A query that returns no results', 'A query that runs in the background', 'A query on a view'], correctAnswer: 'A query nested inside another query' }, { id: 2, question: 'Which operator tests membership in a subquery result set?', options: ['IN', 'HAS', 'CONTAINS', 'MEMBER'], correctAnswer: 'IN' }, { id: 3, question: 'What is a correlated subquery?', options: ['One that references a column from the outer query', 'One that runs first', 'One with no WHERE clause', 'One returning a single row'], correctAnswer: 'One that references a column from the outer query' }, { id: 4, question: 'Which operator returns true if a subquery returns any rows at all?', options: ['EXISTS', 'ANY', 'SOME', 'HAVING'], correctAnswer: 'EXISTS' }, { id: 5, question: 'Where can a subquery NOT normally appear?', options: ['In the GROUP BY clause', 'In the WHERE clause', 'In the FROM clause', 'In the SELECT list'], correctAnswer: 'In the GROUP BY clause' }],
  'm9-quiz': [{ id: 1, question: 'What is a View?', options: ['A virtual table based on a query', 'A physical copy of a table', 'An index', 'A stored procedure'], correctAnswer: 'A virtual table based on a query' }, { id: 2, question: 'What is the main benefit of an index?', options: ['Faster reads on the indexed column', 'Smaller table size', 'Faster inserts', 'Automatic backups'], correctAnswer: 'Faster reads on the indexed column' }, { id: 3, question: 'What is the main cost of adding an index?', options: ['Slower writes and extra storage', 'Slower reads', 'Data loss', 'No cost'], correctAnswer: 'Slower writes and extra storage' }, { id: 4, question: 'Which command shows a query execution plan?', options: ['EXPLAIN', 'DESCRIBE PLAN', 'SHOW QUERY', 'ANALYSE ONLY'], correctAnswer: 'EXPLAIN' }, { id: 5, question: 'Can you normally update data through a complex multi-table view?', options: ['No, not usually', 'Yes, always', 'Only in MySQL', 'Only with an index'], correctAnswer: 'No, not usually' }],
  'm10-quiz': [{ id: 1, question: 'What does the "A" in ACID stand for?', options: ['Atomicity', 'Accuracy', 'Availability', 'Array'], correctAnswer: 'Atomicity' }, { id: 2, question: 'What does the "C" in ACID stand for?', options: ['Consistency', 'Concurrency', 'Caching', 'Commit'], correctAnswer: 'Consistency' }, { id: 3, question: 'Which command permanently applies a transaction?', options: ['COMMIT', 'SAVE', 'APPLY', 'FLUSH'], correctAnswer: 'COMMIT' }, { id: 4, question: 'What does a SAVEPOINT allow?', options: ['Rolling back to a point mid-transaction', 'Committing half a transaction', 'Locking a table', 'Creating a backup file'], correctAnswer: 'Rolling back to a point mid-transaction' }, { id: 5, question: 'What is a deadlock?', options: ['Two transactions each waiting on a lock the other holds', 'A slow query', 'A failed commit', 'A missing index'], correctAnswer: 'Two transactions each waiting on a lock the other holds' }],
  'm11-quiz': [{ id: 1, question: 'What is a key difference between a function and a procedure?', options: ['A function must return a value', 'A procedure must return a value', 'They are exactly the same', 'Functions cannot take parameters'], correctAnswer: 'A function must return a value' }, { id: 2, question: 'Which language does PostgreSQL use for stored procedures?', options: ['PL/pgSQL', 'T-SQL', 'PL/SQL', 'JavaScript only'], correctAnswer: 'PL/pgSQL' }, { id: 3, question: 'Can a stored procedure return multiple result sets?', options: ['Yes', 'No, never', 'Only in MySQL', 'Only functions can'], correctAnswer: 'Yes' }, { id: 4, question: 'What is an OUT parameter used for?', options: ['Returning a value from a procedure', 'Passing input', 'Logging', 'Indexing'], correctAnswer: 'Returning a value from a procedure' }, { id: 5, question: 'What is a key benefit of stored procedures?', options: ['Logic runs close to the data, reducing round trips', 'They are always faster', 'They replace indexes', 'They remove the need for transactions'], correctAnswer: 'Logic runs close to the data, reducing round trips' }],
  'm12-quiz': [{ id: 1, question: 'What is needed to model a Many-to-Many relationship?', options: ['A junction/join table', 'Two foreign keys in the same table', 'It is not possible in SQL', 'A primary key'], correctAnswer: 'A junction/join table' }, { id: 2, question: 'How is a one-to-many relationship implemented?', options: ['A foreign key on the "many" side', 'A junction table', 'Two primary keys', 'A view'], correctAnswer: 'A foreign key on the "many" side' }, { id: 3, question: 'How is a one-to-one relationship usually enforced?', options: ['A foreign key with a UNIQUE constraint', 'A junction table', 'Two foreign keys', 'An index only'], correctAnswer: 'A foreign key with a UNIQUE constraint' }, { id: 4, question: 'What does ON DELETE CASCADE do?', options: ['Deletes child rows when the parent is deleted', 'Blocks the delete', 'Sets children to null', 'Nothing'], correctAnswer: 'Deletes child rows when the parent is deleted' }, { id: 5, question: 'What does an ER diagram represent?', options: ['Entities, attributes and their relationships', 'Query plans', 'Index structure', 'Transaction logs'], correctAnswer: 'Entities, attributes and their relationships' }],
  'm13-quiz': [{ id: 1, question: 'What is the goal of Normalization?', options: ['To reduce data redundancy', 'To make queries slower', 'To increase data duplication', 'To avoid using primary keys'], correctAnswer: 'To reduce data redundancy' }, { id: 2, question: 'What does First Normal Form (1NF) require?', options: ['Atomic values, no repeating groups', 'No transitive dependencies', 'No partial dependencies', 'A single table'], correctAnswer: 'Atomic values, no repeating groups' }, { id: 3, question: 'What does Second Normal Form (2NF) eliminate?', options: ['Partial dependencies on part of a composite key', 'Transitive dependencies', 'Repeating groups', 'Foreign keys'], correctAnswer: 'Partial dependencies on part of a composite key' }, { id: 4, question: 'What does Third Normal Form (3NF) eliminate?', options: ['Transitive dependencies', 'Partial dependencies', 'Repeating groups', 'Nulls'], correctAnswer: 'Transitive dependencies' }, { id: 5, question: 'Why might you deliberately denormalise a schema?', options: ['To reduce joins and speed up reads', 'To save storage', 'To enforce integrity', 'It is never done'], correctAnswer: 'To reduce joins and speed up reads' }],
  'm14-quiz': [{ id: 1, question: 'Which clause introduces a Common Table Expression (CTE)?', options: ['WITH', 'AS', 'CTE', 'LET'], correctAnswer: 'WITH' }, { id: 2, question: 'Which PostgreSQL type stores indexed binary JSON?', options: ['JSONB', 'JSON', 'TEXT', 'BLOB'], correctAnswer: 'JSONB' }, { id: 3, question: 'What is the advantage of JSONB over JSON in PostgreSQL?', options: ['It is stored in binary form and can be indexed', 'It preserves whitespace', 'It is smaller always', 'It is human readable'], correctAnswer: 'It is stored in binary form and can be indexed' }, { id: 4, question: 'Which keyword makes a CTE recursive?', options: ['RECURSIVE', 'LOOP', 'REPEAT', 'CYCLE'], correctAnswer: 'RECURSIVE' }, { id: 5, question: 'Which window function assigns a unique sequential number per row?', options: ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()', 'COUNT()'], correctAnswer: 'ROW_NUMBER()' }],
  'm15-quiz': [{ id: 1, question: 'What is an ORM?', options: ['Object-Relational Mapper', 'Object-Relational Model', 'Object-Resource Mapper', 'Operational Relational Mapper'], correctAnswer: 'Object-Relational Mapper' }, { id: 2, question: 'What is the main risk of building SQL by string concatenation?', options: ['SQL injection', 'Slower queries', 'Larger tables', 'Lost indexes'], correctAnswer: 'SQL injection' }, { id: 3, question: 'How do you prevent SQL injection?', options: ['Use parameterised queries', 'Escape spaces', 'Use uppercase SQL', 'Disable logging'], correctAnswer: 'Use parameterised queries' }, { id: 4, question: 'What is the purpose of a database migration tool?', options: ['Version-controlled, repeatable schema changes', 'Faster queries', 'Data compression', 'Index tuning'], correctAnswer: 'Version-controlled, repeatable schema changes' }, { id: 5, question: 'Why use a connection pool?', options: ['Opening connections is expensive, so they are reused', 'It encrypts traffic', 'It creates indexes', 'It normalises data'], correctAnswer: 'Opening connections is expensive, so they are reused' }],
  'm16-quiz': [{ id: 1, question: 'In an e-commerce schema, how should order line items be modelled?', options: ['A separate order_items table referencing orders', 'A JSON column on orders', 'Repeated columns on orders', 'A view'], correctAnswer: 'A separate order_items table referencing orders' }, { id: 2, question: 'Why store the unit price on the order line rather than reading it from products?', options: ['Product prices change; the order must record the price paid', 'To save space', 'It is faster', 'It is not necessary'], correctAnswer: 'Product prices change; the order must record the price paid' }, { id: 3, question: 'Which relationship exists between students and courses in an LMS?', options: ['Many-to-many, via an enrolments table', 'One-to-one', 'One-to-many', 'No relationship'], correctAnswer: 'Many-to-many, via an enrolments table' }, { id: 4, question: 'What is a surrogate key?', options: ['A system-generated identifier with no business meaning', 'A natural business key', 'A foreign key', 'An index'], correctAnswer: 'A system-generated identifier with no business meaning' }, { id: 5, question: 'Which column should almost always be indexed?', options: ['Foreign key columns used in joins', 'Every text column', 'Boolean flags', 'No columns'], correctAnswer: 'Foreign key columns used in joins' }],
  'm17-quiz': [{ id: 1, question: 'How do you find the second highest salary in a table?', options: ['Use a subquery with MAX and a WHERE excluding the top value, or DENSE_RANK', 'Use LIMIT 2 alone', 'Use COUNT', 'It is impossible'], correctAnswer: 'Use a subquery with MAX and a WHERE excluding the top value, or DENSE_RANK' }, { id: 2, question: 'What is the difference between RANK() and DENSE_RANK()?', options: ['RANK leaves gaps after ties; DENSE_RANK does not', 'They are identical', 'DENSE_RANK leaves gaps', 'RANK only works on numbers'], correctAnswer: 'RANK leaves gaps after ties; DENSE_RANK does not' }, { id: 3, question: 'How would you find duplicate emails in a users table?', options: ['GROUP BY email HAVING COUNT(*) > 1', 'SELECT DISTINCT email', 'ORDER BY email', 'WHERE email = email'], correctAnswer: 'GROUP BY email HAVING COUNT(*) > 1' }, { id: 4, question: 'What is the difference between UNION and UNION ALL?', options: ['UNION removes duplicates; UNION ALL keeps them', 'They are identical', 'UNION ALL is slower', 'UNION sorts'], correctAnswer: 'UNION removes duplicates; UNION ALL keeps them' }, { id: 5, question: 'Which is generally faster for checking existence: IN or EXISTS on a large subquery?', options: ['EXISTS, because it short-circuits on the first match', 'IN, always', 'They are identical', 'Neither works'], correctAnswer: 'EXISTS, because it short-circuits on the first match' }],
};

export const sqlAssignments: Record<string, AssignmentContent> = {
  'm1-assignment': { title: 'Practice: Create first DB', questions: [{ kind: 'code', prompt: 'Write a SQL command to create a new database named "skillofied".', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }, 'Explain the difference between a Database and a Schema.'] },
  'm2-assignment': { title: 'Project: Student Management System Design', questions: ['List the entities required for a Student Management System.', { kind: 'code', prompt: 'Define the columns and data types for a Students table.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\n-- CREATE TABLE students (...)\n\n', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }] },
  'm3-assignment': { title: 'Practice: Build Users & Orders', questions: [{ kind: 'code', prompt: 'Create a users table and an orders table with a foreign key relationship.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }, { kind: 'code', prompt: 'Insert 3 sample rows into each table.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }] },
  'm4-assignment': { title: 'Practice: 50+ Query Problems', questions: [{ kind: 'code', prompt: 'Write a query to find all users whose name starts with "J".', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Filter users starting with J', output: 'Jane' }] }, { kind: 'code', prompt: 'Write a query to find all orders placed in the last 7 days.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Recent orders', output: '310.75' }] }] },
  'm5-assignment': { title: 'Practice: Analytics Queries', questions: [{ kind: 'code', prompt: 'Calculate the total revenue from the orders table.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Sum total revenue', output: '476.25' }] }, { kind: 'code', prompt: 'Find the average order value.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'AVG order value', output: '158.75' }] }] },
  'm6-assignment': { title: 'Practice: Revenue Reports', questions: [{ kind: 'code', prompt: 'Group orders by user_id and calculate total spent per user.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Group by user_id', output: '165.5' }] }, { kind: 'code', prompt: 'Filter for users who spent more than $100 using HAVING.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'HAVING sum > 100', output: '310.75' }] }] },
  'm7-assignment': { title: 'Practice: Complex Joins', questions: [{ kind: 'code', prompt: 'Join Users, Orders, and Order_Items tables to show a complete receipt.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Join receipt tables', output: 'Keyboard' }] }, { kind: 'code', prompt: 'Find users who have never placed an order using a LEFT JOIN.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: 'Unordered users', output: 'Asha Nair' }] }] },
  'm8-assignment': { title: 'Interview Practice: Nth Highest Salary', questions: [{ kind: 'code', prompt: 'Write a query to find the 2nd highest salary from an Employees table.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\nSELECT\n;', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}', examples: [{ input: '2nd highest salary', output: '200000' }] }] },
  'm13-assignment': { title: 'Design Interview: Netflix Schema', questions: [{ kind: 'code', prompt: 'Design a schema for Netflix including Users, Profiles, Movies, and Watch History.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\n-- CREATE TABLE statements for Users, Profiles, Movies, WatchHistory\n\n', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }, { kind: 'code', prompt: 'Normalize your schema to 3NF.', language: 'sql', starterCode: '-- Tables available: users(id, name, email, created_at),\n--   orders(id, user_id, total, order_date),\n--   order_items(order_id, product, quantity, unit_price),\n--   employees(id, name, salary)\n\n-- Rewrite the schema so no transitive dependencies remain\n\n', fixture: '{"tables":{"users":[{"id":1,"name":"Jane Doe","email":"jane@example.com","created_at":"2026-07-01"},{"id":2,"name":"John Smith","email":"john@example.com","created_at":"2026-07-20"},{"id":3,"name":"Asha Nair","email":"asha@example.com","created_at":"2026-07-26"}],"orders":[{"id":1,"user_id":1,"total":120.5,"order_date":"2026-07-26"},{"id":2,"user_id":1,"total":45.0,"order_date":"2026-07-29"},{"id":3,"user_id":2,"total":310.75,"order_date":"2026-07-30"}],"order_items":[{"order_id":1,"product":"Keyboard","quantity":1,"unit_price":120.5},{"order_id":2,"product":"Cable","quantity":3,"unit_price":15.0},{"order_id":3,"product":"Monitor","quantity":1,"unit_price":310.75}],"employees":[{"id":1,"name":"Ravi","salary":100000},{"id":2,"name":"Meera","salary":200000},{"id":3,"name":"Dev","salary":300000}]}}' }] },
};
