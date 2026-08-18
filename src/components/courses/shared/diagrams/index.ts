import React from 'react';
import JavaPipelineDiagram from './JavaPipelineDiagram';

/**
 * Registry of side-panel diagrams. Lesson data references a diagram by key so
 * the course data files stay serialisable and free of JSX.
 */
export const LESSON_DIAGRAMS: Record<string, React.FC> = {
  'java-pipeline': JavaPipelineDiagram,
};

export type LessonDiagramKey = keyof typeof LESSON_DIAGRAMS;
