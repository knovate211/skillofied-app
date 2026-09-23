import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';
import MarketingModuleRenderer from './modules/MarketingCourses/MarketingModuleRenderer';
import { seoContent } from './modules/MarketingCourses/SeoCourseData';

/**
 * Module and lesson titles mirror the published syllabus on the course landing
 * page, so learners get exactly what was advertised.
 */
export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [
      { id: 'overview-welcome', title: 'Welcome to AI SEO' },
      { id: 'overview-outcomes', title: 'Learning Outcomes' },
    ],
  },
  {
    id: 'seo-m1',
    title: 'MODULE 1: AI SEARCH FOUNDATIONS — GEO, LLM SEO & AEO',
    items: [
      { id: 'seo-m1-l1', title: 'How AI Search Engines Answer Questions' },
      { id: 'seo-m1-l2', title: 'GEO, LLM SEO and AEO Compared' },
      { id: 'seo-m1-l3', title: 'Why Classic SEO Still Decides AI Visibility' },
      { id: 'seo-m1-quiz', title: 'Module Quiz' },
      { id: 'seo-m1-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m2',
    title: 'MODULE 2: OPTIMISING A PAGE FOR AI ANSWERS',
    items: [
      { id: 'seo-m2-l1', title: 'Answer-First Content Structure' },
      { id: 'seo-m2-l2', title: 'Structured Content vs Structured Data' },
      { id: 'seo-m2-l3', title: 'One Page for AEO, GEO and SEO' },
      { id: 'seo-m2-quiz', title: 'Module Quiz' },
      { id: 'seo-m2-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m3',
    title: 'MODULE 3: TRAINING AI TO FIND AND CITE YOU',
    items: [
      { id: 'seo-m3-l1', title: 'Auditing What AI Says About You' },
      { id: 'seo-m3-l2', title: 'About, Contact and Source Pages AI Can Trust' },
      { id: 'seo-m3-l3', title: 'How AI Models Actually Learn' },
      { id: 'seo-m3-quiz', title: 'Module Quiz' },
      { id: 'seo-m3-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m4',
    title: 'MODULE 4: CRAWLABILITY FOR AI CRAWLERS',
    items: [
      { id: 'seo-m4-l1', title: 'How Crawling Works for Search and AI Bots' },
      { id: 'seo-m4-l2', title: 'robots.txt Mistakes That Block AI' },
      { id: 'seo-m4-l3', title: 'llms.txt: Writing and Verifying It' },
      { id: 'seo-m4-quiz', title: 'Module Quiz' },
      { id: 'seo-m4-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m5',
    title: 'MODULE 5: REPUTATION — E-E-A-T AND ENTITY AUTHORITY',
    items: [
      { id: 'seo-m5-l1', title: 'Google E-E-A-T Explained' },
      { id: 'seo-m5-l2', title: 'Building a Consistent Entity Across the Web' },
      { id: 'seo-m5-l3', title: 'Mentions in Databases, Forums and Communities' },
      { id: 'seo-m5-quiz', title: 'Module Quiz' },
      { id: 'seo-m5-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m6',
    title: 'MODULE 6: DIGITAL PR — EARNING MENTIONS THAT TRAIN AI',
    items: [
      { id: 'seo-m6-l1', title: 'Why Mentions Move AI Answers' },
      { id: 'seo-m6-l2', title: 'Writing a Press Release for Humans, Search and AI' },
      { id: 'seo-m6-l3', title: 'Distribution, Follow-Up and Measuring Coverage' },
      { id: 'seo-m6-quiz', title: 'Module Quiz' },
      { id: 'seo-m6-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m7',
    title: 'MODULE 7: AI-ASSISTED TECHNICAL SEO',
    items: [
      { id: 'seo-m7-l1', title: 'Building an SEO-Ready Site with AI Tools' },
      { id: 'seo-m7-l2', title: 'FAQ Schema, Interlinking and Long-Tail Coverage' },
      { id: 'seo-m7-l3', title: 'Page Speed and Core Web Vitals with AI Help' },
      { id: 'seo-m7-quiz', title: 'Module Quiz' },
      { id: 'seo-m7-assignment', title: 'Module Assignment' },
    ],
  },
  {
    id: 'seo-m8',
    title: 'MODULE 8: MEASURING AI VISIBILITY AND STAYING AHEAD',
    items: [
      { id: 'seo-m8-l1', title: 'Tracking Citations and Brand Mentions in AI Answers' },
      { id: 'seo-m8-l2', title: 'Google AI Overviews and AI Mode' },
      { id: 'seo-m8-l3', title: 'Ethics, Limits and What Comes Next' },
      { id: 'seo-m8-quiz', title: 'Module Quiz' },
      { id: 'seo-m8-assignment', title: 'Module Assignment' },
    ],
  },
];

const SeoCoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="AI SEO & Search Visibility"
    courseSubtitle="Get found, understood and cited by AI search"
    sidebarSubtitle="AI SEO Specialist"
    storageKey="maxSeoIndexRead"
    unlockAfterModuleId="seo-m1"
    unlockModuleName="Module 1: AI Search Foundations"
    renderContent={(moduleId, page) => (
      <MarketingModuleRenderer
        syllabus={SYLLABUS}
        content={seoContent}
        moduleId={moduleId}
        page={page}
      />
    )}
  />
);

export default SeoCoursePage;
