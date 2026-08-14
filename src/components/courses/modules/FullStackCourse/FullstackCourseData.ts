import { QuizQuestion } from '../../../../types';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    prompts: string[];
  };
}

export const FULLSTACK_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: FRONTEND FOUNDATIONS & REACT',
    overview: 'Learn semantic HTML layouts, CSS Flexbox/Grid structures, vanilla JS control structures, and React states.',
    outcomes: [
      'Understand responsive client layout designs.',
      'Deploy single-page reactive components using functional state hooks.'
    ],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Web Fundamentals & HTML',
        objectives: ['Learn basic semantic document hierarchies.'],
        theory: 'Semantic HTML markup tags structure standard body content layout for accessibility and correct search engine indexing.',
        takeaways: ['Always prefer semantic tags over simple divs where appropriate.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which tag is semantic?', options: ['article', 'div', 'span', 'b'], correctAnswer: 'article' }
    ],
    assignment: {
      prompts: ['Build a styled static personal profile page in HTML.']
    }
  },
  m2: {
    id: 'm2',
    title: 'MODULE 2: BACKEND SERVERS & APIS',
    overview: 'Build web services, endpoints routing, and JSON request filters using frameworks.',
    outcomes: [
      'Construct functional REST controllers handling parameters.',
      'Implement JWT token authorization algorithms.'
    ],
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1 API Design Principles',
        objectives: ['Implement clean HTTP verb methods (GET/POST/PUT).'],
        theory: 'Representational State Transfer (REST) maps standard CRUD database actions to distinct clean routing paths.',
        takeaways: ['Use POST for object creation, PUT for updates, and DELETE for removals.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which verb updates resources?', options: ['PUT', 'GET', 'POST', 'DELETE'], correctAnswer: 'PUT' }
    ],
    assignment: {
      prompts: ['Develop an authenticated API endpoint controller.']
    }
  }
};
