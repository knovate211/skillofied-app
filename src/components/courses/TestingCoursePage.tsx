import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';

import TestingModuleRenderer from './modules/TestingCourse/TestingModuleRenderer';

export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [
      { id: 'overview-welcome', title: 'Welcome Message' },
      { id: 'overview-intro', title: 'Course Introduction Video' },
      { id: 'overview-outcomes', title: 'Learning Outcomes' },
      { id: 'overview-roadmap', title: 'Software Testing Roadmap' },
      { id: 'overview-career', title: 'Career Opportunities' },
      { id: 'overview-prereq', title: 'Prerequisites' },
      { id: 'overview-resources', title: 'Course Resources' },
    ],
  },
  {
    id: 'm1',
    title: 'MODULE 1: INTRODUCTION TO SOFTWARE TESTING',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 Welcome to Software Testing' },
      { id: 'm1-l2', title: 'Lesson 1.2 What is Software Testing?' },
      { id: 'm1-l3', title: 'Lesson 1.3 Why Software Testing is Important' },
      { id: 'm1-l4', title: 'Lesson 1.4 Software Development Life Cycle (SDLC)' },
      { id: 'm1-l5', title: 'Lesson 1.5 Software Testing Life Cycle (STLC)' },
      { id: 'm1-l6', title: 'Lesson 1.6 Roles and Responsibilities of a QA Engineer' },
      { id: 'm1-l7', title: 'Lesson 1.7 Types of Software Testing' },
      { id: 'm1-l8', title: 'Lesson 1.8 Career Roadmap for QA Engineers' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: SOFTWARE TESTING FUNDAMENTALS',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 Testing Principles' },
      { id: 'm2-l2', title: 'Lesson 2.2 Test Levels' },
      { id: 'm2-l3', title: 'Lesson 2.3 Functional Testing' },
      { id: 'm2-l4', title: 'Lesson 2.4 Non-Functional Testing' },
      { id: 'm2-l5', title: 'Lesson 2.5 Black Box Testing' },
      { id: 'm2-l6', title: 'Lesson 2.6 White Box Testing' },
      { id: 'm2-l7', title: 'Lesson 2.7 Grey Box Testing' },
      { id: 'm2-l8', title: 'Lesson 2.8 Verification vs Validation' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: TEST CASE DESIGN',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 What is a Test Case?' },
      { id: 'm3-l2', title: 'Lesson 3.2 Test Scenario vs Test Case' },
      { id: 'm3-l3', title: 'Lesson 3.3 Test Plan' },
      { id: 'm3-l4', title: 'Lesson 3.4 Test Strategy' },
      { id: 'm3-l5', title: 'Lesson 3.5 Test Data Preparation' },
      { id: 'm3-l6', title: 'Lesson 3.6 Boundary Value Analysis' },
      { id: 'm3-l7', title: 'Lesson 3.7 Equivalence Partitioning' },
      { id: 'm3-l8', title: 'Lesson 3.8 Decision Table Testing' },
      { id: 'm3-l9', title: 'Lesson 3.9 State Transition Testing' },
      { id: 'm3-l10', title: 'Lesson 3.10 Error Guessing' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: DEFECT MANAGEMENT',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 What is a Bug?' },
      { id: 'm4-l2', title: 'Lesson 4.2 Bug Life Cycle' },
      { id: 'm4-l3', title: 'Lesson 4.3 Severity vs Priority' },
      { id: 'm4-l4', title: 'Lesson 4.4 Writing Bug Reports' },
      { id: 'm4-l5', title: 'Lesson 4.5 Defect Tracking Tools' },
      { id: 'm4-l6', title: 'Lesson 4.6 Bug Reporting Best Practices' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: AGILE TESTING',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 Introduction to Agile' },
      { id: 'm5-l2', title: 'Lesson 5.2 Scrum Framework' },
      { id: 'm5-l3', title: 'Lesson 5.3 Sprint Planning' },
      { id: 'm5-l4', title: 'Lesson 5.4 Daily Stand-up' },
      { id: 'm5-l5', title: 'Lesson 5.5 Sprint Review' },
      { id: 'm5-l6', title: 'Lesson 5.6 Sprint Retrospective' },
      { id: 'm5-l7', title: 'Lesson 5.7 QA in Agile Teams' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: API TESTING',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 What is an API?' },
      { id: 'm6-l2', title: 'Lesson 6.2 REST APIs' },
      { id: 'm6-l3', title: 'Lesson 6.3 HTTP Methods' },
      { id: 'm6-l4', title: 'Lesson 6.4 Status Codes' },
      { id: 'm6-l5', title: 'Lesson 6.5 JSON Basics' },
      { id: 'm6-l6', title: 'Lesson 6.6 API Testing using Postman' },
      { id: 'm6-l7', title: 'Lesson 6.7 Environment Variables' },
      { id: 'm6-l8', title: 'Lesson 6.8 API Collections' },
      { id: 'm6-l9', title: 'Lesson 6.9 API Automation Basics' },
      { id: 'm6-proj', title: 'API Testing Project' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: DATABASE TESTING',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 Introduction to Databases' },
      { id: 'm7-l2', title: 'Lesson 7.2 SQL Basics' },
      { id: 'm7-l3', title: 'Lesson 7.3 SELECT Queries' },
      { id: 'm7-l4', title: 'Lesson 7.4 INSERT, UPDATE & DELETE' },
      { id: 'm7-l5', title: 'Lesson 7.5 JOIN Operations' },
      { id: 'm7-l6', title: 'Lesson 7.6 Database Validation' },
      { id: 'm7-l7', title: 'Lesson 7.7 Data Integrity Testing' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: WEB AUTOMATION WITH SELENIUM',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 Introduction to Selenium' },
      { id: 'm8-l2', title: 'Lesson 8.2 Selenium WebDriver' },
      { id: 'm8-l3', title: 'Lesson 8.3 Locators' },
      { id: 'm8-l4', title: 'Lesson 8.4 Browser Commands' },
      { id: 'm8-l5', title: 'Lesson 8.5 Handling Forms' },
      { id: 'm8-l6', title: 'Lesson 8.6 Waits' },
      { id: 'm8-l7', title: 'Lesson 8.7 Alerts & Windows' },
      { id: 'm8-l8', title: 'Lesson 8.8 Frames & iFrames' },
      { id: 'm8-l9', title: 'Lesson 8.9 Dropdowns' },
      { id: 'm8-l10', title: 'Lesson 8.10 File Upload & Download' },
      { id: 'm8-proj', title: 'Selenium Project' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: TEST AUTOMATION FRAMEWORKS',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 TestNG' },
      { id: 'm9-l2', title: 'Lesson 9.2 JUnit Basics' },
      { id: 'm9-l3', title: 'Lesson 9.3 Maven' },
      { id: 'm9-l4', title: 'Lesson 9.4 Page Object Model (POM)' },
      { id: 'm9-l5', title: 'Lesson 9.5 Data-Driven Framework' },
      { id: 'm9-l6', title: 'Lesson 9.6 Hybrid Framework' },
      { id: 'm9-l7', title: 'Lesson 9.7 Logging & Reporting' },
      { id: 'm9-proj', title: 'Framework Project' },
      { id: 'm9-quiz', title: 'Module Quiz' },
      { id: 'm9-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: PERFORMANCE TESTING',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 Performance Testing Basics' },
      { id: 'm10-l2', title: 'Lesson 10.2 Load Testing' },
      { id: 'm10-l3', title: 'Lesson 10.3 Stress Testing' },
      { id: 'm10-l4', title: 'Lesson 10.4 Spike Testing' },
      { id: 'm10-l5', title: 'Lesson 10.5 Endurance Testing' },
      { id: 'm10-l6', title: 'Lesson 10.6 Apache JMeter' },
      { id: 'm10-proj', title: 'Performance Project' },
      { id: 'm10-quiz', title: 'Module Quiz' },
      { id: 'm10-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: MOBILE TESTING',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 Mobile Testing Basics' },
      { id: 'm11-l2', title: 'Lesson 11.2 Android Testing' },
      { id: 'm11-l3', title: 'Lesson 11.3 iOS Testing' },
      { id: 'm11-l4', title: 'Lesson 11.4 Appium Introduction' },
      { id: 'm11-l5', title: 'Lesson 11.5 Mobile Automation' },
      { id: 'm11-quiz', title: 'Module Quiz' },
      { id: 'm11-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: SECURITY TESTING BASICS',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 Security Fundamentals' },
      { id: 'm12-l2', title: 'Lesson 12.2 Authentication Testing' },
      { id: 'm12-l3', title: 'Lesson 12.3 Authorization Testing' },
      { id: 'm12-l4', title: 'Lesson 12.4 OWASP Top 10' },
      { id: 'm12-l5', title: 'Lesson 12.5 Basic Vulnerability Testing' },
      { id: 'm12-quiz', title: 'Module Quiz' },
      { id: 'm12-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm13',
    title: 'MODULE 13: CI/CD FOR TESTERS',
    items: [
      { id: 'm13-l1', title: 'Lesson 13.1 Introduction to CI/CD' },
      { id: 'm13-l2', title: 'Lesson 13.2 Git for Testers' },
      { id: 'm13-l3', title: 'Lesson 13.3 Jenkins Basics' },
      { id: 'm13-l4', title: 'Lesson 13.4 Running Automated Tests' },
      { id: 'm13-l5', title: 'Lesson 13.5 Test Reports' },
      { id: 'm13-l6', title: 'Lesson 13.6 Continuous Testing' },
      { id: 'm13-quiz', title: 'Module Quiz' },
      { id: 'm13-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm14',
    title: 'MODULE 14: AI IN SOFTWARE TESTING',
    items: [
      { id: 'm14-l1', title: 'Lesson 14.1 AI in Testing' },
      { id: 'm14-l2', title: 'Lesson 14.2 AI Test Case Generation' },
      { id: 'm14-l3', title: 'Lesson 14.3 AI Bug Analysis' },
      { id: 'm14-l4', title: 'Lesson 14.4 Self-Healing Automation' },
      { id: 'm14-l5', title: 'Lesson 14.5 AI Testing Tools' },
      { id: 'm14-l6', title: 'Lesson 14.6 Future of QA' },
      { id: 'm14-proj', title: 'AI Testing Project' },
      { id: 'm14-quiz', title: 'Module Quiz' },
      { id: 'm14-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'm15',
    title: 'MODULE 15: CAPSTONE PROJECTS',
    items: [
      { id: 'm15-p1', title: 'Project 1: E-Commerce Website Testing' },
      { id: 'm15-p2', title: 'Project 2: Banking Application Testing' },
      { id: 'm15-p3', title: 'Project 3: LMS Website Testing' },
      { id: 'm15-p4', title: 'Project 4: HMS Website Testing' },
      { id: 'm15-p5', title: 'Project 5: API Testing Suite' },
      { id: 'm15-p6', title: 'Project 6: Selenium Automation Framework' },
      { id: 'm15-final', title: 'Final Industry Capstone Project' },
    ],
  },
  {
    id: 'interview',
    title: 'INTERVIEW PREPARATION',
    items: [
      { id: 'interview-manual', title: 'Manual Testing Interview Questions' },
      { id: 'interview-selenium', title: 'Selenium Interview Questions' },
      { id: 'interview-api', title: 'API Testing Interview Questions' },
      { id: 'interview-sql', title: 'SQL Interview Questions' },
      { id: 'interview-agile', title: 'Agile Interview Questions' },
      { id: 'interview-framework', title: 'Automation Framework Questions' },
      { id: 'interview-hr', title: 'HR Interview Questions' },
      { id: 'interview-resume', title: 'Resume Building' },
      { id: 'interview-mock', title: 'Mock Interviews' },
      { id: 'interview-coding', title: 'Coding & Practical Assessments' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'assessment-theory', title: 'Theory Test' },
      { id: 'assessment-manual', title: 'Manual Testing Assessment' },
      { id: 'assessment-api', title: 'API Testing Assessment' },
      { id: 'assessment-automation', title: 'Automation Assessment' },
      { id: 'assessment-capstone', title: 'Capstone Project Evaluation' },
      { id: 'assessment-viva', title: 'Viva / Mock Interview' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [
      { id: 'cert-manual', title: 'Manual Testing Certificate' },
      { id: 'cert-api', title: 'API Testing Certificate' },
      { id: 'cert-selenium', title: 'Selenium Automation Certificate' },
      { id: 'cert-professional', title: 'Software Testing Professional Certificate' },
      { id: 'cert-qa', title: 'QA Engineer Certification' },
    ],
  },
];

const TestingCoursePage: React.FC = () => {
  return (
    <CoursePageShell
      syllabus={SYLLABUS}
      courseTitle="Software Testing & QA"
      courseSubtitle="Manual testing, API testing and Selenium automation"
      sidebarSubtitle="Testing Specialization"
      storageKey="maxTestingIndexRead"
      unlockAfterModuleId="m1"
      unlockModuleName="Module 1: Manual Testing"
      renderContent={(moduleId: string, page: number) => (
        <TestingModuleRenderer moduleId={moduleId} page={page} />
      )}
    />
  );
};

export default TestingCoursePage;
