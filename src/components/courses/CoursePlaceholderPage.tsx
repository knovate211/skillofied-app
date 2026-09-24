import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CoursePlaceholderPage.module.css';

interface SyllabusModule {
  id: string;
  title: string;
  lessons: string[];
}

interface CourseDetail {
  title: string;
  mentor: string;
  duration: string;
  lectures: number;
  projects: number;
  description: string;
  colorGrad: string;
  initial: string;
  startDate: string;
  syllabus: SyllabusModule[];
}

const COURSE_DATA: Record<string, CourseDetail> = {
  sql: {
    title: 'Mastering SQL',
    mentor: 'Ayush B',
    duration: '6 Weeks',
    lectures: 30,
    projects: 3,
    description: 'Master relational database design, query writing, optimization, triggers, indexes, and analytics functions in PostgreSQL and MySQL. Design robust data schemas.',
    colorGrad: 'linear-gradient(135deg, #10ac84, #1dd1a1)',
    initial: 'SQL',
    startDate: 'July 15, 2026',
    syllabus: [
      { id: 'sql-m1', title: 'Module 1: Relational Database Basics & Design', lessons: ['Relational Model & Tables', 'Defining Keys: Primary, Foreign, Unique Keys', 'Entity-Relationship Diagrams (ERDs)'] },
      { id: 'sql-m2', title: 'Module 2: Querying & Filtering Data', lessons: ['SELECT, WHERE, ORDER BY, LIMIT clauses', 'Comparison and Logical Operators', 'Pattern Matching with LIKE and regular expressions'] },
      { id: 'sql-m3', title: 'Module 3: Joining & Aggregating Tables', lessons: ['INNER, LEFT, RIGHT, FULL outer joins', 'GROUP BY & HAVING clauses', 'Aggregations: COUNT, SUM, AVG, MIN, MAX'] },
      { id: 'sql-m4', title: 'Module 4: Subqueries & Common Table Expressions', lessons: ['Subqueries in WHERE and SELECT clauses', 'WITH clause (CTEs) for readable SQL', 'Set Operations: UNION, INTERSECT, EXCEPT'] },
      { id: 'sql-m5', title: 'Module 5: Performance Tuning & Indexes', lessons: ['EXPLAIN & EXPLAIN ANALYZE for query plans', 'Designing Indexes (B-Tree, Hash, GIN)', 'Normal Form Normalization (1NF, 2NF, 3NF)'] }
    ]
  },
  seo: {
    title: 'AI SEO & Search Visibility',
    mentor: 'Marketing Team Specialist',
    duration: '8 Weeks',
    lectures: 26,
    projects: 8,
    description: 'Learn how AI answer engines pick their sources, and optimise a real site to be found, understood and cited by ChatGPT, Google AI Overviews, Gemini, Perplexity and Claude — alongside classic search.',
    colorGrad: 'linear-gradient(135deg, #f39c12, #f1c40f)',
    initial: 'AI',
    startDate: 'July 22, 2026',
    syllabus: [
      { id: 'seo-m1', title: 'Module 1: AI Search Foundations — GEO, LLM SEO & AEO', lessons: ['How AI Search Engines Answer Questions', 'GEO, LLM SEO and AEO Compared', 'Why Classic SEO Still Decides AI Visibility'] },
      { id: 'seo-m2', title: 'Module 2: Optimising a Page for AI Answers', lessons: ['Answer-First Content Structure', 'Structured Content vs Structured Data', 'One Page for AEO, GEO and SEO'] },
      { id: 'seo-m3', title: 'Module 3: Training AI to Find and Cite You', lessons: ['Auditing What AI Says About You', 'About, Contact and Source Pages AI Can Trust', 'How AI Models Actually Learn'] },
      { id: 'seo-m4', title: 'Module 4: Crawlability for AI Crawlers', lessons: ['How Crawling Works for Search and AI Bots', 'robots.txt Mistakes That Block AI', 'llms.txt: Writing and Verifying It'] },
      { id: 'seo-m5', title: 'Module 5: Reputation — E-E-A-T and Entity Authority', lessons: ['Google E-E-A-T Explained', 'Building a Consistent Entity Across the Web', 'Mentions in Databases, Forums and Communities'] },
      { id: 'seo-m6', title: 'Module 6: Digital PR — Earning Mentions That Train AI', lessons: ['Why Mentions Move AI Answers', 'Writing a Press Release for Humans, Search and AI', 'Distribution, Follow-Up and Measuring Coverage'] },
      { id: 'seo-m7', title: 'Module 7: AI-Assisted Technical SEO', lessons: ['Building an SEO-Ready Site with AI Tools', 'FAQ Schema, Interlinking and Long-Tail Coverage', 'Page Speed and Core Web Vitals with AI Help'] },
      { id: 'seo-m8', title: 'Module 8: Measuring AI Visibility and Staying Ahead', lessons: ['Tracking Citations and Brand Mentions in AI Answers', 'Google AI Overviews and AI Mode', 'Ethics, Limits and What Comes Next'] }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing Strategy',
    mentor: 'Marketing Team Lead',
    duration: '12 Weeks',
    lectures: 29,
    projects: 9,
    description: 'Formulate end-to-end digital growth funnels. Master paid search and social ads, organic social, email automation, conversion optimisation, analytics and attribution, content and video, AI-assisted marketing, and a full capstone campaign plan.',
    colorGrad: 'linear-gradient(135deg, #e67e22, #f39c12)',
    initial: 'DM',
    startDate: 'July 18, 2026',
    syllabus: [
      { id: 'dm-m1', title: 'Module 1: The Digital Marketing Funnel', lessons: ['AIDA Model & Customer Value Journey', 'Defining Target Personas & Segments', 'Mapping Marketing Channels to Goals'] },
      { id: 'dm-m2', title: 'Module 2: Social Media Marketing & Organic Growth', lessons: ['Content Pillars and Scheduling Strategies', 'Algorithm Optimization (LinkedIn, Instagram)', 'Community Management & Engagement'] },
      { id: 'dm-m3', title: 'Module 3: Pay-Per-Click (PPC) Advertising', lessons: ['Google Search Ads Campaign Setup', 'Meta (Facebook/Instagram) Ads Manager', 'Bidding Strategies, Budgets, and Retargeting'] },
      { id: 'dm-m4', title: 'Module 4: Email Marketing Automation', lessons: ['Lead Magnet Design & List Growth', 'Writing High-Open-Rate Sequences', 'Setting up Behavioral Triggers & Workflows'] },
      { id: 'dm-m5', title: 'Module 5: Conversion Rate Optimization (CRO)', lessons: ['Landing Page Best Practices', 'A/B Testing Frameworks & Tools', 'Analyzing User Heatmaps and Sessions'] },
      { id: 'dm-m6', title: 'Module 6: Measurement, Analytics & Attribution', lessons: ['Reading GA4 Without Getting Lost', 'UTM Tracking & Clean Campaign Data', 'Attribution & the Monthly Report'] },
      { id: 'dm-m7', title: 'Module 7: Content, Video & Partnerships', lessons: ['Content Marketing That Feeds Every Channel', 'Short-Form Video & Creative Testing', 'Influencers, Affiliates & Messaging Channels'] },
      { id: 'dm-m8', title: 'Module 8: AI in Digital Marketing', lessons: ['Where AI Helps and Where It Fails', 'AI for Research, Copy & Creative', 'AI for Analysis, Reporting & Its Limits'] },
      { id: 'dm-m9', title: 'Module 9: Capstone & Career', lessons: ['The Capstone Campaign Plan', 'Presenting Results & Building a Portfolio', 'Career Paths & Interview Preparation'] }
    ]
  },
  testing: {
    title: 'Software Testing & QA',
    mentor: 'QA Tech Lead',
    duration: '8 Weeks',
    lectures: 48,
    projects: 4,
    description: 'Transition from manual testing to modern QA automation. Learn defect tracking, testing architectures, and write automated tests using Selenium, Jest, Postman, and Cypress.',
    colorGrad: 'linear-gradient(135deg, #1abc9c, #2ecc71)',
    initial: 'QA',
    startDate: 'July 25, 2026',
    syllabus: [
      { id: 'test-m1', title: 'Module 1: Fundamentals of Software Quality', lessons: ['Software Development Life Cycle vs STLC', 'Black Box vs White Box Testing Methods', 'Test Scenarios & Test Case Documentation'] },
      { id: 'test-m2', title: 'Module 2: Defect Lifecycle & Tracking', lessons: ['Defect Classification & Severity/Priority', 'Bug Reporting in Jira', 'Regression Testing Protocols'] },
      { id: 'test-m3', title: 'Module 3: API Testing & Validation', lessons: ['REST API Basics', 'Automating Postman Collections', 'Asserting Status Codes, Headers, and Payloads'] },
      { id: 'test-m4', title: 'Module 4: UI Automation with Selenium', lessons: ['XPath & CSS Locator Strategies', 'Selenium Web Driver Architecture', 'Creating Page Object Models (POM)'] },
      { id: 'test-m5', title: 'Module 5: Modern E2E Testing with Cypress', lessons: ['Cypress Environment Setup', 'Writing Integration Tests', 'Simulating Network Failures & Mocks'] }
    ]
  }
};

const CoursePlaceholderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract path to identify which course to load
  const getCourseKey = (): string => {
    const path = location.pathname;
    if (path.includes('sql')) return 'sql';
    if (path.includes('seo')) return 'seo';
    if (path.includes('digital-marketing')) return 'digital-marketing';
    if (path.includes('testing')) return 'testing';
    return 'sql'; // Fallback
  };

  const courseKey = getCourseKey();
  const course = COURSE_DATA[courseKey] || COURSE_DATA.sql;

  const [expandedModule, setExpandedModule] = useState<string | null>(course.syllabus[0]?.id || null);

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <div className={styles.wrapper}>
      {/* Header Bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/courses')}>
          ← Back to Courses
        </button>
        <span className={styles.breadcrum}>Courses / {course.title}</span>
      </div>

      {/* Hero Header Section */}
      <header className={styles.hero} style={{ background: course.colorGrad }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.initialBadge}>{course.initial}</div>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.mentor}>Led by <strong>{course.mentor}</strong></p>
            <p className={styles.desc}>{course.description}</p>
          </div>
        </div>
      </header>

      {/* Info Cards Panel */}
      <section className={styles.statsContainer}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⏳</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Duration</span>
            <span className={styles.statValue}>{course.duration}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🎥</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Lectures</span>
            <span className={styles.statValue}>{course.lectures} Core Sessions</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📂</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Capstone Projects</span>
            <span className={styles.statValue}>{course.projects} Industry Projects</span>
          </div>
        </div>
      </section>

      {/* Layout Content Grid */}
      <div className={styles.layoutGrid}>
        {/* Left Column: Syllabus Accordion */}
        <main className={styles.syllabusSection}>
          <h2 className={styles.syllabusTitle}>Course Curriculum</h2>
          <p className={styles.syllabusSubtitle}>Click modules to expand lecture topics</p>

          <div className={styles.accordion}>
            {course.syllabus.map((mod) => {
              const isOpen = expandedModule === mod.id;
              return (
                <div key={mod.id} className={`${styles.accordionBlock} ${isOpen ? styles.open : ''}`}>
                  <button className={styles.accordionHeader} onClick={() => toggleModule(mod.id)}>
                    <span className={styles.moduleName}>{mod.title}</span>
                    <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▶</span>
                  </button>
                  {isOpen && (
                    <ul className={styles.lessonList}>
                      {mod.lessons.map((lesson, idx) => (
                        <li key={idx} className={styles.lessonItem}>
                          <span className={styles.bullet}>✓</span>
                          <span className={styles.lessonName}>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* Right Column: Enrollment Info Box */}
        <aside className={styles.sidebarSection}>
          <div className={styles.enrollCard}>
            <div className={styles.enrollStatus}>
              <span className={styles.statusPulse} />
              <span className={styles.statusLabel}>Enrolled & Active</span>
            </div>
            
            <h3 className={styles.enrollTitle}>You have access to this Pathway</h3>
            <p className={styles.enrollText}>
              Your enrollment in this track is active. Full interactive learning platform modules and automated grading IDEs for this track will be released soon.
            </p>

            <div className={styles.cohortDetails}>
              <div className={styles.cohortRow}>
                <span>Start Date:</span>
                <strong>{course.startDate}</strong>
              </div>
              <div className={styles.cohortRow}>
                <span>Platform State:</span>
                <span className={styles.badgeComing}>Modules Releasing Soon</span>
              </div>
            </div>

            <button className={styles.notifyBtn} onClick={() => alert('You will be notified as soon as new modules are released!')}>
              🔔 Notify me on updates
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlaceholderPage;
