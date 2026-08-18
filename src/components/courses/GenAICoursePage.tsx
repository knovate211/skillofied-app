import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';

import CourseOverview from './modules/GenAICourse/CourseOverview';
import GenAIModuleRenderer from './modules/GenAICourse/GenAIModuleRenderer';

// Item order within a module maps directly to page numbers, so lessons must
// come first, then the quiz, then the practice set — see GenAIModuleRenderer.
export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [{ id: 'overview-welcome', title: 'Welcome to GenAI & FDE' }],
  },
  {
    id: 'm1',
    title: 'MODULE 1: PYTHON & AI FOUNDATIONS',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 Why Python Runs GenAI' },
      { id: 'm1-l2', title: 'Lesson 1.2 Data Structures You Will Use' },
      { id: 'm1-l3', title: 'Lesson 1.3 Functions, Comprehensions, Types' },
      { id: 'm1-l4', title: 'Lesson 1.4 Classes and Dataclasses' },
      { id: 'm1-l5', title: 'Lesson 1.5 Virtual Environments' },
      { id: 'm1-l6', title: 'Lesson 1.6 Async Python and HTTP' },
      { id: 'm1-l7', title: 'Lesson 1.7 JSON and REST Fundamentals' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Practice: Defensive Parsing' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: MACHINE LEARNING ESSENTIALS',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 What Machine Learning Is' },
      { id: 'm2-l2', title: 'Lesson 2.2 Supervised and Unsupervised' },
      { id: 'm2-l3', title: 'Lesson 2.3 Splitting Data and Overfitting' },
      { id: 'm2-l4', title: 'Lesson 2.4 Features, Labels, Text as Numbers' },
      { id: 'm2-l5', title: 'Lesson 2.5 Measuring Quality' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Practice: Precision, Recall, F1' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: LLM FUNDAMENTALS',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 What an LLM Is' },
      { id: 'm3-l2', title: 'Lesson 3.2 Tokens and the Context Window' },
      { id: 'm3-l3', title: 'Lesson 3.3 Transformers and Attention' },
      { id: 'm3-l4', title: 'Lesson 3.4 Temperature and Top-p' },
      { id: 'm3-l5', title: 'Lesson 3.5 Hallucination' },
      { id: 'm3-l6', title: 'Lesson 3.6 Calling a Model API' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Practice: Context Budget' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: PROMPT ENGINEERING',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 Anatomy of a Prompt' },
      { id: 'm4-l2', title: 'Lesson 4.2 Zero-shot, Few-shot, Role' },
      { id: 'm4-l3', title: 'Lesson 4.3 Structured Output' },
      { id: 'm4-l4', title: 'Lesson 4.4 Chain-of-Thought and Reasoning' },
      { id: 'm4-l5', title: 'Lesson 4.5 Templates and Versioning' },
      { id: 'm4-l6', title: 'Lesson 4.6 Prompt Injection' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Practice: Safe Prompt Templating' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: EMBEDDINGS & VECTOR SEARCH',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 From Text to Vectors' },
      { id: 'm5-l2', title: 'Lesson 5.2 Similarity Metrics' },
      { id: 'm5-l3', title: 'Lesson 5.3 Chunking Strategy' },
      { id: 'm5-l4', title: 'Lesson 5.4 Metadata and Filtering' },
      { id: 'm5-l5', title: 'Lesson 5.5 Vector Databases' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Practice: Cosine Search with Filtering' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: RETRIEVAL-AUGMENTED GENERATION',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 Why RAG' },
      { id: 'm6-l2', title: 'Lesson 6.2 The Ingestion Pipeline' },
      { id: 'm6-l3', title: 'Lesson 6.3 Retrieval and Reranking' },
      { id: 'm6-l4', title: 'Lesson 6.4 Context and Citations' },
      { id: 'm6-l5', title: 'Lesson 6.5 Evaluating RAG' },
      { id: 'm6-l6', title: 'Lesson 6.6 Reducing Hallucination' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: 'Practice: Grounding and Citations' },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: AI AGENTS',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 What Makes Something an Agent' },
      { id: 'm7-l2', title: 'Lesson 7.2 Tools and Function Calling' },
      { id: 'm7-l3', title: 'Lesson 7.3 The Agent Loop' },
      { id: 'm7-l4', title: 'Lesson 7.4 Memory' },
      { id: 'm7-l5', title: 'Lesson 7.5 Multi-Agent Systems' },
      { id: 'm7-l6', title: 'Lesson 7.6 Safety and Human-in-the-Loop' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Practice: Build an Agent Loop' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: MULTIMODAL GENAI',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 Beyond Text' },
      { id: 'm8-l2', title: 'Lesson 8.2 Speech to Text' },
      { id: 'm8-l3', title: 'Lesson 8.3 Text to Speech and Streaming' },
      { id: 'm8-l4', title: 'Lesson 8.4 Vision' },
      { id: 'm8-l5', title: 'Lesson 8.5 Voice Agent Architecture' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Practice: Latency Budget' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: FINE-TUNING',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 Prompting vs RAG vs Fine-tuning' },
      { id: 'm9-l2', title: 'Lesson 9.2 Preparing the Dataset' },
      { id: 'm9-l3', title: 'Lesson 9.3 Instruction Tuning' },
      { id: 'm9-l4', title: 'Lesson 9.4 LoRA, QLoRA and PEFT' },
      { id: 'm9-l5', title: 'Lesson 9.5 Evaluating and When Not To' },
      { id: 'm9-quiz', title: 'Module Quiz' },
      { id: 'm9-assignment', title: 'Practice: Validate a Training Set' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: PRODUCTION GENAI',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 Serving Architecture' },
      { id: 'm10-l2', title: 'Lesson 10.2 Streaming Responses' },
      { id: 'm10-l3', title: 'Lesson 10.3 Token Cost' },
      { id: 'm10-l4', title: 'Lesson 10.4 Caching' },
      { id: 'm10-l5', title: 'Lesson 10.5 Retries, Timeouts, Fallback' },
      { id: 'm10-l6', title: 'Lesson 10.6 Rate Limits and Concurrency' },
      { id: 'm10-quiz', title: 'Module Quiz' },
      { id: 'm10-assignment', title: 'Practice: Retry Policy' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: LLMOPS',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 Why LLMOps Exists' },
      { id: 'm11-l2', title: 'Lesson 11.2 Tracing' },
      { id: 'm11-l3', title: 'Lesson 11.3 Evaluation Harnesses' },
      { id: 'm11-l4', title: 'Lesson 11.4 RAG and Hallucination Evaluation' },
      { id: 'm11-l5', title: 'Lesson 11.5 Guardrails and Security' },
      { id: 'm11-l6', title: 'Lesson 11.6 Monitoring in Production' },
      { id: 'm11-quiz', title: 'Module Quiz' },
      { id: 'm11-assignment', title: 'Practice: Evaluation Harness' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: FORWARD DEPLOYED ENGINEERING',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 What an FDE Does' },
      { id: 'm12-l2', title: 'Lesson 12.2 Requirement Gathering' },
      { id: 'm12-l3', title: 'Lesson 12.3 Architecture and Scoping' },
      { id: 'm12-l4', title: 'Lesson 12.4 Data Integration and Auth' },
      { id: 'm12-l5', title: 'Lesson 12.5 Customer Environments' },
      { id: 'm12-l6', title: 'Lesson 12.6 Communicating Trade-offs' },
      { id: 'm12-quiz', title: 'Module Quiz' },
      { id: 'm12-assignment', title: 'Practice: Sizing and Scoping' },
    ],
  },
  {
    id: 'projects',
    title: 'PORTFOLIO PROJECTS',
    items: [
      { id: 'proj-1', title: 'Project 1: Enterprise Document RAG' },
      { id: 'proj-2', title: 'Project 2: AI Coding Assistant' },
      { id: 'proj-3', title: 'Project 3: AI Voice Agent' },
      { id: 'proj-4', title: 'Project 4: Multi-Agent Research Platform' },
      { id: 'proj-5', title: 'Project 5: Enterprise AI Platform (Capstone)' },
    ],
  },
  {
    id: 'interview',
    title: 'INTERVIEW PREPARATION',
    items: [
      { id: 'prep-llm', title: 'LLM Fundamentals' },
      { id: 'prep-rag', title: 'RAG and Retrieval' },
      { id: 'prep-agents', title: 'Agents and Tools' },
      { id: 'prep-prod', title: 'Production and Cost' },
      { id: 'prep-design', title: 'System Design' },
      { id: 'prep-fde', title: 'Forward Deployed Engineering' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'test-theory', title: 'Theory Test' },
      { id: 'test-capstone', title: 'Capstone Code Submission' },
      { id: 'test-eval', title: 'RAG Evaluation Review' },
      { id: 'test-design', title: 'Solution Design Interview' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [{ id: 'cert-view', title: 'GenAI & FDE Certificate' }],
  },
];

const GenAICoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="GenAI & Forward Deployed Engineering"
    courseSubtitle="Production AI systems, from RAG to customer deployment"
    sidebarSubtitle="GenAI Engineering"
    storageKey="maxGenAIIndexRead"
    unlockAfterModuleId="m1"
    unlockModuleName="Module 1: Python & AI Foundations"
    renderContent={(moduleId: string, page: number) => {
      if (moduleId === 'overview') return <CourseOverview />;
      return <GenAIModuleRenderer moduleId={moduleId} page={page} />;
    }}
  />
);

export default GenAICoursePage;
