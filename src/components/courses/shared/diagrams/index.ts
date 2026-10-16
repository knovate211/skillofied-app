import React from 'react';
import JavaPipelineDiagram from './JavaPipelineDiagram';
import {
  InnerJoinVenn,
  LeftJoinVenn,
  RightJoinVenn,
  FullJoinVenn,
  LeftAntiJoinVenn,
  FullAntiJoinVenn,
} from './sql/JoinVenn';
import CrossJoinGrid from './sql/CrossJoinGrid';
import QueryExecutionOrder from './sql/QueryExecutionOrder';
import SqlCommandFamilies from './sql/SqlCommandFamilies';
import ClientServerDiagram from './sql/ClientServerDiagram';
import NormalizationFlow from './sql/NormalizationFlow';
import { OneToOneDiagram, OneToManyDiagram, ManyToManyDiagram } from './sql/RelationshipDiagrams';
import { BTreeIndexDiagram, ScanComparisonDiagram } from './sql/IndexDiagrams';
import { TransactionLifecycle, DeadlockDiagram } from './sql/TransactionDiagrams';
import { SubqueryFlow, WindowVsGroupBy } from './sql/SubqueryFlow';
import { ConnectionPoolDiagram, SqlInjectionDiagram } from './sql/BackendDiagrams';
import { DatabaseHierarchy, KeyLinkDiagram, ViewDiagram } from './sql/StructureDiagrams';

/**
 * Registry of lesson diagrams. Lesson data references a diagram by key so the
 * course data files stay serialisable and free of JSX. Used both by
 * LessonLayout's side panel and by LessonBlocks' inline `diagram` block.
 */
export const LESSON_DIAGRAMS: Record<string, React.FC> = {
  'java-pipeline': JavaPipelineDiagram,

  // ── SQL ──
  'sql-architecture': ClientServerDiagram,
  'sql-hierarchy': DatabaseHierarchy,
  'sql-command-families': SqlCommandFamilies,
  'sql-keys': KeyLinkDiagram,
  'sql-execution-order': QueryExecutionOrder,
  'sql-join-inner': InnerJoinVenn,
  'sql-join-left': LeftJoinVenn,
  'sql-join-right': RightJoinVenn,
  'sql-join-full': FullJoinVenn,
  'sql-join-left-anti': LeftAntiJoinVenn,
  'sql-join-full-anti': FullAntiJoinVenn,
  'sql-join-cross': CrossJoinGrid,
  'sql-subquery-flow': SubqueryFlow,
  'sql-window-vs-group': WindowVsGroupBy,
  'sql-view': ViewDiagram,
  'sql-btree': BTreeIndexDiagram,
  'sql-scan-comparison': ScanComparisonDiagram,
  'sql-transaction': TransactionLifecycle,
  'sql-deadlock': DeadlockDiagram,
  'sql-rel-1-1': OneToOneDiagram,
  'sql-rel-1-n': OneToManyDiagram,
  'sql-rel-n-n': ManyToManyDiagram,
  'sql-normalization': NormalizationFlow,
  'sql-connection-pool': ConnectionPoolDiagram,
  'sql-injection': SqlInjectionDiagram,
};

export type LessonDiagramKey = keyof typeof LESSON_DIAGRAMS;
