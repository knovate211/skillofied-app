import { LessonBlock } from '../../../shared/LessonBlocks';

export interface LessonContent {
  title: string;
  content: LessonBlock[];
  /** Rendered as the icon cards under the prose; omit for a prose-only lesson. */
  objectives?: string[];
  /** Rendered as the tinted cards at the foot of the lesson. */
  takeaways?: string[];
}

export type LessonMap = Record<string, LessonContent>;

/**
 * The two tables every join, aggregate and subquery lesson reuses. Keeping one
 * dataset across seventeen modules means a learner reads new SQL against rows
 * they already know — the only unfamiliar thing on the page is the concept.
 *
 * Deliberate shape: employee 5 has no department and department 3 has no
 * employees, so the same five rows demonstrate every outer join.
 */
export const EMPLOYEES = {
  headers: ['id', 'name', 'dept_id', 'salary', 'hired_on'],
  rows: [
    ['1', 'Ana Iyer', '1', '92000', '2021-03-14'],
    ['2', 'Bo Chen', '1', '78000', '2022-07-01'],
    ['3', 'Cy Das', '2', '64000', '2020-11-23'],
    ['4', 'Dia Rao', '2', '64000', '2023-01-09'],
    ['5', 'Eli Roy', '', '51000', '2023-06-30'],
  ],
};

export const DEPARTMENTS = {
  headers: ['id', 'name', 'city'],
  rows: [
    ['1', 'Engineering', 'Pune'],
    ['2', 'Sales', 'Mumbai'],
    ['3', 'Legal', 'Delhi'],
  ],
};
