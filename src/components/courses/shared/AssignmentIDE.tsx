import React, { useState, Suspense, lazy } from 'react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import ConsolePanel from '../../practice/ConsolePanel';
import ProblemDescriptionPanel from '../../practice/ProblemDescriptionPanel';
import { useToast } from '../../../context/ToastContext';
import { runScratchpadApi } from '../../../api';

const IDEPanel = lazy(() => import('../../practice/IDEPanel'));

// ─── Types (mirrors ProblemDescriptionPanel's internal shape) ────────────────

interface RunResults {
  success: boolean;
  totalCases: number;
  passedCases: number;
  results: { input: string; expected: string; actual: string; passed: boolean; stdout?: string }[];
  runtime?: string;
  memory?: string;
  error?: string;
}

interface Props {
  /** Task index for the badge, e.g. 1 */
  taskIndex: number;
  /** Total number of tasks */
  taskTotal: number;
  /** Language id, e.g. "java", "python" */
  language: string;
  /** Starter code shown in the editor */
  starterCode: string;
  /** Current editor value */
  value: string;
  /** Called when the editor value changes */
  onChange: (code: string) => void;
  /** Prompt text shown in the description panel */
  prompt: string;
  /** Whether this task has already been submitted */
  submitted: boolean;
  /** Called when the learner clicks the submit button */
  onSubmit: () => void;
  /** Whether the task allows running code (false for Dockerfile/shell) */
  runnable?: boolean;
  /** Pre-set stdin fixture (e.g. SQL tables) */
  fixture?: string;
  /** Examples of inputs/outputs for the task */
  examples?: { input: string; output: string; explanation?: string }[];
}

// ─── Language label map ───────────────────────────────────────────────────────

const LANGUAGE_LABEL: Record<string, string> = {
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
};

// ─── SQL result formatter (same as AssignmentCodeEditor) ─────────────────────

function formatSqlOutput(stdout: string): string {
  let parsed: { rows?: Record<string, unknown>[] };
  try { parsed = JSON.parse(stdout); } catch { return stdout; }
  if (!Array.isArray(parsed.rows)) return stdout;
  if (parsed.rows.length === 0) return '(0 rows)';
  const rows = parsed.rows;
  const columns = Object.keys(rows[0]);
  const cell = (v: unknown) => (v === null || v === undefined ? 'NULL' : String(v));
  const widths = columns.map((c) => Math.max(c.length, ...rows.map((r) => cell(r[c]).length)));
  const line = (cells: string[]) => cells.map((v, i) => v.padEnd(widths[i])).join(' | ');
  return [
    line(columns),
    widths.map((w) => '-'.repeat(w)).join('-+-'),
    ...rows.map((r) => line(columns.map((c) => cell(r[c])))),
    '',
    `(${rows.length} row${rows.length === 1 ? '' : 's'})`,
  ].join('\n');
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Full Practice-IDE layout used inside ModuleAssignment for code tasks.
 *
 * Left panel  → ProblemDescriptionPanel (prompt + task metadata)
 * Right panel → IDEPanel (Monaco editor) + ConsolePanel (run results / submit)
 *
 * This reuses the exact same components as SolveProblemPage so both screens
 * feel identical to the learner.
 */
const AssignmentIDE: React.FC<Props> = ({
  taskIndex,
  taskTotal,
  language,
  starterCode,
  value,
  onChange,
  prompt,
  submitted,
  onSubmit,
  runnable = true,
  fixture,
  examples,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResults, setRunResults] = useState<RunResults | null>(null);
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'output' | 'custom'>('testcases');
  const [customInput, setCustomInput] = useState('');

  const { showToast } = useToast();
  const label = LANGUAGE_LABEL[language] ?? language;

  // Adapt the prompt string into the shape ProblemDescriptionPanel expects
  const problemForPanel = {
    title: `Task ${taskIndex} of ${taskTotal}`,
    difficulty: 'Medium' as const,
    xp: 0,
    topic: label,
    statement: prompt,
    examples: examples ?? [] as { input: string; output: string; explanation?: string }[],
    constraints: submitted
      ? ['✓ This task has been submitted for mentor review.']
      : ['Nothing is auto-graded — a mentor reviews your work.'],
    tags: [label],
  };

  const handleRunCode = async () => {
    if (!runnable) return;
    setIsRunning(true);
    setConsoleTab('output');
    setRunResults(null);
    try {
      const result = await runScratchpadApi(language, value, fixture ?? customInput);
      if (result.timedOut) {
        setRunResults({ success: false, totalCases: 0, passedCases: 0, results: [], error: 'Timed out. Check for an infinite loop.' });
        showToast('Timed out. Check for an infinite loop.', 'error');
      } else if (result.exitCode !== 0) {
        const detail = result.stderr.trim() || result.stdout.trim() || `Exited with code ${result.exitCode}`;
        setRunResults({
          success: false, totalCases: 0, passedCases: 0, results: [], error: detail,
        });
        showToast(detail.split('\n')[0] || 'Your code failed to run.', 'error');
      } else {
        const raw = result.stdout.trim();
        const text = language === 'sql' ? formatSqlOutput(raw) : raw || '(no output — did you print anything?)';
        
        // Evaluate against examples if provided
        const results = (examples && examples.length > 0)
          ? examples.map((ex) => {
              const cleanExpected = ex.output.trim().toLowerCase();
              const cleanActual = raw.toLowerCase();
              const passed = cleanActual.includes(cleanExpected) || cleanActual === cleanExpected;
              return {
                input: ex.input,
                expected: ex.output,
                actual: raw || '(no output)',
                passed: passed,
              };
            })
          : [{ input: customInput, expected: '', actual: text, passed: true }];

        const passedCount = results.filter((r) => r.passed).length;
        const overallSuccess = results.every((r) => r.passed);

        setRunResults({
          success: overallSuccess,
          totalCases: results.length,
          passedCases: passedCount,
          results: results,
          runtime: 'N/A',
        });
        showToast(
          overallSuccess
            ? (examples?.length ? `Ran successfully — ${passedCount}/${results.length} example(s) matched.` : 'Ran successfully.')
            : `Ran, but only ${passedCount}/${results.length} example(s) matched.`,
          overallSuccess ? 'success' : 'info'
        );
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'Could not run your code.';
      setRunResults({
        success: false, totalCases: 0, passedCases: 0, results: [], error: detail,
      });
      showToast(detail, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // "Submit" in the ConsolePanel bar maps to the assignment's onSubmit
  const handleSubmitCode = () => {
    onSubmit();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0f1a' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PanelGroup orientation="horizontal">
          {/* Left: problem description */}
          {!isFullscreen && (
            <>
              <Panel defaultSize={40} minSize={25} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <ProblemDescriptionPanel
                    problem={problemForPanel}
                    submissions={[]}
                  />
                </div>
              </Panel>
              <PanelResizeHandle
                style={{ width: 6, background: '#1f2235', cursor: 'col-resize' }}
              />
            </>
          )}

          {/* Right: editor + console */}
          <Panel defaultSize={isFullscreen ? 100 : 60} minSize={25}>
            <PanelGroup orientation="vertical">
              {/* Editor */}
              <Panel defaultSize={60} minSize={30}>
                <Suspense fallback={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#111320', color: '#4b5675' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #28C5BC', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                  </div>
                }>
                  <IDEPanel
                    language={language}
                    availableLanguages={[{ id: language, label }]}
                    onLanguageChange={() => {}}
                    code={value}
                    onCodeChange={onChange}
                    onReset={() => onChange(starterCode)}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => setIsFullscreen((f) => !f)}
                  />
                </Suspense>
              </Panel>

              <PanelResizeHandle
                style={{ height: 6, background: '#1f2235', cursor: 'row-resize' }}
              />

              {/* Console */}
              <Panel defaultSize={40} minSize={20}>
                <ConsolePanel
                  examples={examples || []}
                  isRunning={isRunning}
                  runResults={runResults}
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                  onRunCode={runnable ? handleRunCode : () => {}}
                  onSubmitCode={handleSubmitCode}
                  isSubmitting={false}
                  activeTab={consoleTab}
                  setActiveTab={setConsoleTab}
                  isAssignmentMode={true}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default AssignmentIDE;
