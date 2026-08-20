import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';

import {
  AttemptQuestion,
  RunAttemptCodeResult,
  getAttemptSubmissionApi,
  graphqlRequest,
  runAttemptCodeApi,
  runScratchpadApi,
  submitAttemptCodeApi,
} from '../../../api';
import RichText from './RichText';
import styles from './Tests.module.css';

interface ProblemDetail {
  title: string;
  statement: string;
  constraints: string[];
  examples: { input: string; output: string; explanation: string }[];
  starterCodes: Record<string, string>;
}

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { id: 'python', label: 'Python', monaco: 'python' },
  { id: 'java', label: 'Java', monaco: 'java' },
  { id: 'cpp', label: 'C++', monaco: 'cpp' },
  { id: 'go', label: 'Go', monaco: 'go' },
];

const LANG_KEY = 'skillofide.test.language';
const FONT_KEY = 'skillofide.test.fontSize';

interface Props {
  attemptId: string;
  question: AttemptQuestion;
  index: number;
  total: number;
  onSubmitted: (submissionId: string, language: string, code: string) => void;
  /** Debounced draft save. Stores the editor's contents; grades nothing. */
  onDraft: (language: string, code: string) => void;
  onSecondsLeft: (seconds: number) => void;
}

interface HistoryEntry {
  submissionId: string;
  language: string;
  verdict: string;
  at: number;
}

type ConsoleTab = 'cases' | 'custom' | 'history';

/**
 * The coding question inside a test.
 *
 * Run executes against the visible cases and scores nothing. Submit hands the
 * code to the same judge the practice section uses; the verdict arrives
 * asynchronously, so this polls for it and reports pass counts only — hidden
 * test-case content is never shown mid-test. Scoring keeps the BEST submission
 * per question, so a candidate is safe to keep experimenting after a good
 * result, and the history panel exists to make that visible rather than
 * something they have to take on trust.
 */
const CodingQuestionView: React.FC<Props> = ({
  attemptId, question, index, total, onSubmitted, onDraft, onSecondsLeft,
}) => {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [language, setLanguage] = useState(
    () => question.language || localStorage.getItem(LANG_KEY) || 'javascript',
  );
  const [code, setCode] = useState(question.code || '');
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem(FONT_KEY)) || 14);
  const [expanded, setExpanded] = useState(false);

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<RunAttemptCodeResult | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState<string | null>(null);
  const [tab, setTab] = useState<ConsoleTab>('cases');
  const [verdict, setVerdict] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState('');

  const pollRef = useRef<number | null>(null);
  const draftRef = useRef(onDraft);
  draftRef.current = onDraft;

  // Load the statement. The paper only carries the problem id to keep the
  // attempt payload small.
  useEffect(() => {
    let cancelled = false;
    if (!question.problemId) return;

    (async () => {
      try {
        const data = await graphqlRequest<{ getProblem: ProblemDetail }>(`
          query GetProblem($id: String!) {
            getProblem(id: $id) {
              title statement constraints
              examples { input output explanation }
              starterCodes { javascript python java cpp go }
            }
          }
        `, { id: question.problemId });
        if (cancelled) return;
        setProblem(data.getProblem);
        if (!question.code && data.getProblem?.starterCodes) {
          setCode(data.getProblem.starterCodes[language] || '');
        }
      } catch {
        if (!cancelled) setError('Could not load the problem statement.');
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.problemId]);

  // Moving between questions swaps the whole editor over. Without this the
  // second coding question would open showing the first one's code.
  useEffect(() => {
    setCode(question.code || '');
    if (question.language) setLanguage(question.language);
    setRunResult(null);
    setCustomOutput(null);
    setVerdict('');
    setError('');
    setTab('cases');
  }, [question.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced draft save. The parent's autosave queue already collapses rapid
  // edits per question; this only keeps typing off the network on every keystroke.
  useEffect(() => {
    if (!code) return;
    const t = window.setTimeout(() => draftRef.current(language, code), 900);
    return () => window.clearTimeout(t);
  }, [code, language]);

  const changeLanguage = (next: string) => {
    const starter = problem?.starterCodes?.[language] || '';
    const untouched = code.trim() === '' || code.trim() === starter.trim();
    setLanguage(next);
    localStorage.setItem(LANG_KEY, next);
    if (untouched) setCode(problem?.starterCodes?.[next] || '');
  };

  const resetToStarter = () => {
    if (!problem?.starterCodes) return;
    // Destructive and easy to hit by accident next to Run/Submit.
    if (!window.confirm('Replace your code with the starter template?')) return;
    setCode(problem.starterCodes[language] || '');
  };

  const setSize = (delta: number) => {
    setFontSize((f) => {
      const next = Math.min(22, Math.max(11, f + delta));
      localStorage.setItem(FONT_KEY, String(next));
      return next;
    });
  };

  const poll = useCallback((submissionId: string) => {
    let tries = 0;
    const tick = async () => {
      tries += 1;
      try {
        const res = await getAttemptSubmissionApi(attemptId, submissionId);
        if (res.status && res.status !== 'Pending' && res.status !== 'Running') {
          const text = res.compileError
            ? `Compile error\n${res.compileError}`
            : `${res.status} — ${res.passedCount}/${res.totalCount} hidden tests passed`;
          setVerdict(text);
          setHistory((h) => h.map((e) => (e.submissionId === submissionId ? { ...e, verdict: text } : e)));
          setSubmitting(false);
          return;
        }
      } catch {
        // keep polling; a transient failure should not strand the UI
      }
      if (tries > 60) {
        setVerdict('Still evaluating — your score will be updated automatically.');
        setSubmitting(false);
        return;
      }
      pollRef.current = window.setTimeout(tick, 2000);
    };
    pollRef.current = window.setTimeout(tick, 1500);
  }, [attemptId]);

  useEffect(() => () => { if (pollRef.current) window.clearTimeout(pollRef.current); }, []);

  const run = useCallback(async () => {
    setRunning(true);
    setError('');
    try {
      if (tab === 'custom' && customInput.trim()) {
        // Sample cases run through a harness that calls the solution with fixed
        // arguments, so there is nowhere to put arbitrary stdin. The scratchpad
        // runner executes the file verbatim instead, which is what "run it with
        // my input" actually means.
        setCustomOutput(null);
        const out = await runScratchpadApi(language, code, customInput);
        setCustomOutput(
          out.timedOut ? 'Timed out.'
            : (out.stdout || out.stderr || '(no output)') + `\n\n— exit ${out.exitCode} · ${out.executionMs} ms`,
        );
      } else {
        setRunResult(null);
        const res = await runAttemptCodeApi(attemptId, question.id, language, code);
        setRunResult(res);
        setActiveCase(0);
        setTab('cases');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not run your code.');
    } finally {
      setRunning(false);
    }
  }, [attemptId, question.id, language, code, tab, customInput]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setError('');
    setVerdict('Queued for evaluation…');
    try {
      const res = await submitAttemptCodeApi(attemptId, question.id, language, code);
      onSubmitted(res.submissionId, language, code);
      onSecondsLeft(res.secondsLeft);
      setHistory((h) => [
        { submissionId: res.submissionId, language, verdict: 'Evaluating…', at: Date.now() },
        ...h,
      ]);
      poll(res.submissionId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not submit your code.');
      setVerdict('');
      setSubmitting(false);
    }
  }, [attemptId, question.id, language, code, onSubmitted, onSecondsLeft, poll]);

  // Ctrl/Cmd+Enter runs, Ctrl/Cmd+S saves the draft. Both are what a candidate
  // coming from any other editor will try first.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === 'Enter') { e.preventDefault(); if (!running && !submitting) void run(); }
      if (e.key.toLowerCase() === 's') { e.preventDefault(); draftRef.current(language, code); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [run, running, submitting, language, code]);

  const monacoLang = LANGUAGES.find((l) => l.id === language)?.monaco ?? 'plaintext';
  const cases = runResult?.testResults ?? [];
  const passed = useMemo(() => cases.filter((c) => c.status === 'Accepted').length, [cases]);

  const statement = (
    <div className={styles.wbStatement}>
      <h3 className={styles.wbProblemTitle}>
        {problem?.title || question.problemTitle || 'Loading…'}
      </h3>
      <RichText className={styles.wbProse} text={problem?.statement || ''} />

      {problem?.examples?.length ? (
        <>
          <div className={styles.wbSubhead}>Examples</div>
          {problem.examples.map((ex, i) => (
            <div key={i} className={styles.wbExample}>
              <div><span className={styles.wbIoLabel}>Input</span><code>{ex.input}</code></div>
              <div><span className={styles.wbIoLabel}>Output</span><code>{ex.output}</code></div>
              {ex.explanation ? <div className={styles.wbNote}>{ex.explanation}</div> : null}
            </div>
          ))}
        </>
      ) : null}

      {problem?.constraints?.length ? (
        <>
          <div className={styles.wbSubhead}>Constraints</div>
          <ul className={styles.wbConstraints}>
            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      ) : null}
    </div>
  );

  const console_ = (
    <div className={styles.wbConsole}>
      <div className={styles.wbTabs} role="tablist">
        <button role="tab" aria-selected={tab === 'cases'}
          className={tab === 'cases' ? styles.wbTabOn : styles.wbTab}
          onClick={() => setTab('cases')}>
          Test cases{cases.length ? ` · ${passed}/${cases.length}` : ''}
        </button>
        <button role="tab" aria-selected={tab === 'custom'}
          className={tab === 'custom' ? styles.wbTabOn : styles.wbTab}
          onClick={() => setTab('custom')}>Custom input</button>
        <button role="tab" aria-selected={tab === 'history'}
          className={tab === 'history' ? styles.wbTabOn : styles.wbTab}
          onClick={() => setTab('history')}>
          Submissions{history.length ? ` · ${history.length}` : ''}
        </button>
      </div>

      <div className={styles.wbConsoleBody}>
        {error ? <div className={styles.errorBox}>{error}</div> : null}

        {tab === 'cases' && (
          running ? <div className={styles.wbMuted}>Compiling and running…</div>
          : runResult?.compileError ? (
            <pre className={styles.wbCompileError}>{runResult.compileError}</pre>
          ) : cases.length === 0 ? (
            <div className={styles.wbMuted}>
              Press <b>Run</b> to try your code against the visible examples. Running scores
              nothing — only <b>Submit</b> counts.
            </div>
          ) : (
            <>
              <div className={styles.wbCaseChips}>
                {cases.map((c, i) => (
                  <button key={i}
                    className={`${styles.wbChip} ${i === activeCase ? styles.wbChipOn : ''} ${
                      c.status === 'Accepted' ? styles.wbChipPass : styles.wbChipFail}`}
                    onClick={() => setActiveCase(i)}>
                    <span aria-hidden>{c.status === 'Accepted' ? '✓' : '✕'}</span> Case {i + 1}
                  </button>
                ))}
              </div>
              {cases[activeCase] && (
                <div className={styles.wbCaseDetail}>
                  <div className={styles.wbIoLabel}>Input</div>
                  <pre>{cases[activeCase].input}</pre>
                  <div className={styles.wbIoLabel}>Expected</div>
                  <pre>{cases[activeCase].expectedOutput}</pre>
                  <div className={styles.wbIoLabel}>Your output</div>
                  <pre className={cases[activeCase].status === 'Accepted' ? '' : styles.wbBad}>
                    {cases[activeCase].actualOutput || '(no output)'}
                  </pre>
                  {cases[activeCase].error ? (
                    <pre className={styles.wbBad}>{cases[activeCase].error}</pre>
                  ) : null}
                </div>
              )}
            </>
          )
        )}

        {tab === 'custom' && (
          <div className={styles.wbCustom}>
            <div className={styles.wbIoLabel}>Input</div>
            <textarea
              className={styles.wbTextarea}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={'Your program reads this from standard input.'}
            />
            <p className={styles.wbHint}>
              This runs your file exactly as written — add a <code>main</code> or a print if your
              solution is only a function. It scores nothing.
            </p>
            {customOutput !== null && <pre className={styles.wbCaseDetailPre}>{customOutput}</pre>}
          </div>
        )}

        {tab === 'history' && (
          history.length === 0 ? (
            <div className={styles.wbMuted}>
              Nothing submitted yet. Your <b>best</b> submission counts, so submitting early and
              improving later cannot hurt your score.
            </div>
          ) : (
            <ul className={styles.wbHistory}>
              {history.map((h) => (
                <li key={h.submissionId}>
                  <span className={styles.wbHistTime}>
                    {new Date(h.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={styles.wbHistLang}>{h.language}</span>
                  <span>{h.verdict}</span>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );

  const editorPane = (
    <div className={styles.wbEditorPane}>
      <div className={styles.wbToolbar}>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className={styles.wbSelect}
          aria-label="Language"
        >
          {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>

        <div className={styles.wbToolGroup}>
          <button className={styles.wbIconBtn} onClick={() => setSize(-1)} aria-label="Smaller text">A−</button>
          <button className={styles.wbIconBtn} onClick={() => setSize(1)} aria-label="Larger text">A+</button>
          <button className={styles.wbIconBtn} onClick={resetToStarter} title="Reset to the starter template">Reset</button>
          <button className={styles.wbIconBtn} onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Exit full width' : 'Full width'}
          </button>
        </div>

        <div className={styles.spacer} />
        <span className={styles.wbShortcut}>⌘/Ctrl + ↵ to run</span>
        <button className={styles.ghostBtn} onClick={run} disabled={running || submitting}>
          {running ? 'Running…' : 'Run'}
        </button>
        <button className={styles.primaryBtn} onClick={submit} disabled={submitting || running}>
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>

      <PanelGroup orientation="vertical" className={styles.wbInnerGroup}>
        <Panel defaultSize={62} minSize={25}>
          <Editor
            height="100%"
            language={monacoLang}
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v ?? '')}
            options={{
              minimap: { enabled: false },
              fontSize,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </Panel>
        <PanelResizeHandle className={styles.wbHandleH} />
        <Panel defaultSize={38} minSize={15}>{console_}</Panel>
      </PanelGroup>

      {verdict ? (
        <div className={styles.wbVerdictBar}>
          <span className={submitting ? styles.verdictWait : styles.verdictOk}>{verdict}</span>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={styles.wbLayout}>
      <div className={styles.questionHead}>
        <span className={styles.questionNo}>Question {index + 1} of {total} · Coding</span>
        <span className={styles.marks}>{question.marks} marks</span>
      </div>

      {expanded ? editorPane : (
        <PanelGroup orientation="horizontal" className={styles.wbGroup}>
          <Panel defaultSize={40} minSize={22}>{statement}</Panel>
          <PanelResizeHandle className={styles.wbHandleV} />
          <Panel defaultSize={60} minSize={35}>{editorPane}</Panel>
        </PanelGroup>
      )}
    </div>
  );
};

export default CodingQuestionView;
