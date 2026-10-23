// The code languages the editors know: their display names, and the five that
// code can be run and graded in. The practice IDE, the test player and the
// course assignment editor each kept their own copy of this list.

/** Display names, by the language id the runner and Monaco both use. */
export const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  go: 'Go',
  sql: 'PostgreSQL',
  dockerfile: 'Dockerfile',
  shell: 'Shell',
  yaml: 'YAML',
  protobuf: 'Protocol Buffers',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  xml: 'XML',
  markdown: 'Markdown',
  typescript: 'TypeScript',
  jsx: 'JSX',
};

export const languageLabel = (id: string): string => LANGUAGE_LABELS[id] ?? id;

/** The languages a coding problem can be solved in, in menu order. */
export const PROGRAMMING_LANGUAGES: { id: string; label: string }[] = ['javascript', 'python', 'java', 'cpp', 'go'].map(
  (id) => ({ id, label: LANGUAGE_LABELS[id] }),
);
