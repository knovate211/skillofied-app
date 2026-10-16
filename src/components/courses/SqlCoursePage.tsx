import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';

import SqlModuleRenderer from './modules/SqlCourse/SqlModuleRenderer';

export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [
      { id: 'overview-welcome', title: 'Welcome to SQL Mastery' },
      { id: 'overview-outcomes', title: 'Learning Outcomes' },
    ],
  },
  {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION & FUNDAMENTALS',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 What is Data?' },
      { id: 'm1-l2', title: 'Lesson 1.2 File system vs Database' },
      { id: 'm1-l3', title: 'Lesson 1.3 What is DBMS & RDBMS?' },
      { id: 'm1-l4', title: 'Lesson 1.4 SQL vs NoSQL' },
      { id: 'm1-l5', title: 'Lesson 1.5 Popular Databases' },
      { id: 'm1-l6', title: 'Lesson 1.6 Installing PostgreSQL/MySQL' },
      { id: 'm1-l7', title: 'Lesson 1.7 Database Architecture' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Practice: Create first DB' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: DATABASE DESIGN FUNDAMENTALS',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 Database, Schema, Tables' },
      { id: 'm2-l2', title: 'Lesson 2.2 Rows, Columns, Records' },
      { id: 'm2-l3', title: 'Lesson 2.3 SQL Data Types' },
      { id: 'm2-l4', title: 'Lesson 2.4 Constraints (PK, FK, etc.)' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Project: Student Management System Design' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: SQL COMMANDS DEEP DIVE',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 DDL (CREATE, ALTER, DROP)' },
      { id: 'm3-l2', title: 'Lesson 3.2 DML (INSERT, UPDATE, DELETE)' },
      { id: 'm3-l3', title: 'Lesson 3.3 DQL (SELECT, WHERE, LIMIT)' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Practice: Build Users & Orders' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: FILTERING & OPERATORS',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 Comparison Operators' },
      { id: 'm4-l2', title: 'Lesson 4.2 Logical Operators' },
      { id: 'm4-l3', title: 'Lesson 4.3 Advanced Filtering (IN, LIKE)' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Practice: 50+ Query Problems' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: SQL FUNCTIONS',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 String Functions' },
      { id: 'm5-l2', title: 'Lesson 5.2 Numeric Functions' },
      { id: 'm5-l3', title: 'Lesson 5.3 Date Functions' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Practice: Analytics Queries' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: AGGREGATION & GROUPING',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 Aggregate Functions' },
      { id: 'm6-l2', title: 'Lesson 6.2 GROUP BY & HAVING' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: 'Practice: Revenue Reports' },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: SQL JOINS',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 INNER JOIN' },
      { id: 'm7-l2', title: 'Lesson 7.2 LEFT & RIGHT JOIN' },
      { id: 'm7-l3', title: 'Lesson 7.3 FULL, SELF, CROSS JOIN' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Practice: Complex Joins' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: SUBQUERIES',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 Single & Multiple Row Subqueries' },
      { id: 'm8-l2', title: 'Lesson 8.2 Nested Queries & Operators' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Interview Practice: Nth Highest Salary' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: ADVANCED SQL CONCEPTS',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 Views' },
      { id: 'm9-l2', title: 'Lesson 9.2 Indexing (B-Tree, Composite)' },
      { id: 'm9-l3', title: 'Lesson 9.3 Performance & EXPLAIN' },
      { id: 'm9-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: TRANSACTIONS & ACID',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 Transactions Basics' },
      { id: 'm10-l2', title: 'Lesson 10.2 ACID Properties' },
      { id: 'm10-l3', title: 'Lesson 10.3 Rollback & Savepoints' },
      { id: 'm10-l4', title: 'Lesson 10.4 Locks & Deadlocks' },
      { id: 'm10-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: STORED PROCEDURES',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 Functions vs Procedures' },
      { id: 'm11-l2', title: 'Lesson 11.2 Parameters & Returns' },
      { id: 'm11-l3', title: 'Lesson 11.3 PL/pgSQL basics' },
      { id: 'm11-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: DATABASE RELATIONSHIPS',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 One-to-One' },
      { id: 'm12-l2', title: 'Lesson 12.2 One-to-Many' },
      { id: 'm12-l3', title: 'Lesson 12.3 Many-to-Many' },
      { id: 'm12-l4', title: 'Lesson 12.4 ER Diagrams' },
      { id: 'm12-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm13',
    title: 'MODULE 13: NORMALIZATION',
    items: [
      { id: 'm13-l1', title: 'Lesson 13.1 Database Anomalies' },
      { id: 'm13-l2', title: 'Lesson 13.2 1NF, 2NF, 3NF, BCNF' },
      { id: 'm13-quiz', title: 'Module Quiz' },
      { id: 'm13-assignment', title: 'Design Interview: Netflix Schema' },
    ],
  },
  {
    id: 'm14',
    title: 'MODULE 14: POSTGRESQL ADVANCED',
    items: [
      { id: 'm14-l1', title: 'Lesson 14.1 UUID, JSONB, Arrays, ENUM' },
      { id: 'm14-l2', title: 'Lesson 14.2 CTE & Recursive Query' },
      { id: 'm14-l3', title: 'Lesson 14.3 Window Functions' },
      { id: 'm14-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm15',
    title: 'MODULE 15: SQL FOR BACKEND DEVELOPERS',
    items: [
      { id: 'm15-l1', title: 'Lesson 15.1 Node.js + SQL Connections' },
      { id: 'm15-l2', title: 'Lesson 15.2 ORM vs Raw SQL (Prisma/TypeORM)' },
      { id: 'm15-l3', title: 'Lesson 15.3 Migrations & Seeders' },
      { id: 'm15-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm16',
    title: 'MODULE 16: REAL WORLD PROJECTS',
    items: [
      { id: 'm16-p1', title: 'Project 1: Student Management DB' },
      { id: 'm16-p2', title: 'Project 2: E-Commerce DB' },
      { id: 'm16-p3', title: 'Project 3: LMS Database' },
      { id: 'm16-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'm17',
    title: 'MODULE 17: INTERVIEW PREPARATION',
    items: [
      { id: 'm17-l1', title: 'Beginner: 50+ Questions' },
      { id: 'm17-l2', title: 'Intermediate: Joins & Aggregations' },
      { id: 'm17-l3', title: 'Advanced: Optimization & Indexing' },
      { id: 'm17-l4', title: 'Company Level Practice' },
      { id: 'm17-quiz', title: 'Module Quiz' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'test-theory', title: 'Theory Test' },
      { id: 'test-practical', title: 'Practical Query Test' },
      { id: 'test-design', title: 'Schema Design Evaluation' },
      { id: 'test-viva', title: 'Viva / Interview Round' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [
      { id: 'cert-view', title: 'SQL Mastery Certificate' },
      { id: 'cert-skills', title: 'Verified Skills' },
    ],
  },
  {
    id: 'capstone',
    title: 'FINAL CAPSTONE PROJECT',
    items: [
      { id: 'capstone-project', title: 'Udemy + HackerRank Clone DB' },
    ],
  },
];

const SqlCoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="SQL Mastery"
    courseSubtitle="Beginner to Industry Ready"
    sidebarSubtitle="SQL Mastery"
    storageKey="maxSqlIndexRead"
    unlockAfterModuleId="m1"
    unlockModuleName="Module 1: Introduction & Fundamentals"
    // Every section, overview included, is block-authored in SqlCourseData —
    // the renderer resolves moduleId + page against SYLLABUS itself.
    renderContent={(moduleId, page) => <SqlModuleRenderer moduleId={moduleId} page={page} />}
  />
);

export default SqlCoursePage;
