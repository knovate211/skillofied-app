import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';

/**
 * Content model shared by the marketing courses (SEO Fundamentals and Digital
 * Marketing Strategy). These are non-programming courses, so the block types
 * are prose, callouts, lists, tables and worked examples rather than code.
 */
export type MarketingBlock =
  | { type: 'text'; value: string }
  | { type: 'heading'; value: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'alert'; value: string }
  | { type: 'example'; title: string; value: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  /** A "watch out" callout for common mistakes. */
  | { type: 'warning'; value: string }
  /** Side-by-side cards, e.g. a weak versus a strong title tag. */
  | {
      type: 'compare';
      columns: { title: string; subtitle?: string; tone?: 'rose' | 'olive' | 'honey'; items: string[] }[];
    }
  /** An ordered walkthrough, e.g. the steps of an indexing check. */
  | { type: 'steps'; title?: string; steps: { label: string; text?: string }[] };

export interface MarketingLesson {
  title: string;
  /** One-line statement of what the learner should be able to do afterwards. */
  objective: string;
  content: MarketingBlock[];
  takeaways: string[];
}

export interface MarketingAssignment {
  title: string;
  /**
   * Assignment tasks are IDE tasks like every other course's. The lessons are
   * prose, but the deliverables a marketer actually produces — robots.txt,
   * sitemaps, JSON-LD, keyword maps, budget and significance calculations —
   * are artifacts and arithmetic, so they are written and run in the editor.
   */
  questions: AssignmentQuestion[];
}

export interface MarketingCourseContent {
  lessons: Record<string, MarketingLesson>;
  quizzes: Record<string, QuizQuestion[]>;
  assignments: Record<string, MarketingAssignment>;
}

