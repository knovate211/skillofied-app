import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, XCircle } from 'lucide-react';

import WorkspaceHeader from './WorkspaceHeader';
import ProblemDescriptionPanel from './ProblemDescriptionPanel';
import IDEPanel from './IDEPanel';
import ConsolePanel from './ConsolePanel';

// Type-only: erased at build time, so the 2.5k-line fallback dataset below is
// never pulled into this chunk. It is loaded on demand only if the API fails.
import type { ProblemDetail } from '../../data/problemsData';
import { practiceProblems } from '../../data/mockData';
import {
  getProblemApi,
  getSubmissionApi,
  listSubmissionsApi,
  normalizeSubmissionStatus,
  runCodeApi,
  runScratchpadApi,
  submitCodeApi,
  TestCaseResult,
} from '../../api';

/** Loaded lazily so the offline fallback never ships in the main solve bundle. */
async function loadFallbackProblem(id: string, nameFallback: string): Promise<ProblemDetail> {
  const { getProblemDetail } = await import('../../data/problemsData');
  return getProblemDetail(id, nameFallback);
}

const isSqlProblem = (p: { tags?: string[]; topic?: string } | null): boolean =>
  !!p && (p.tags?.includes('SQL') || p.topic === 'Database' || p.topic === 'Databases');

const toPanelResults = (testResults: TestCaseResult[]) =>
  testResults.map((tr) => ({
    input: tr.input,
    expected: tr.expectedOutput,
    actual: tr.actualOutput,
    passed: tr.status === 'Accepted',
    stdout: tr.error,
  }));

// Toast interface
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface Submission {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error';
  timestamp: string;
  language: string;
  runtime: string;
  code: string;
}

const SolveProblemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find overall problem name from initial list if exists
  const baseProb = practiceProblems.find((p) => p.id === id);
  const problemName = baseProb ? baseProb.title : 'Challenge';

  // Load problem details
  const [problem, setProblem] = useState<ProblemDetail | null>(null);

  // Workspace settings state
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem(`lang_${id}`) || 'javascript';
  });
  const [code, setCode] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'output' | 'custom'>('testcases');
  const [customInput, setCustomInput] = useState<string>('');

  // Runner and submission states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [runResults, setRunResults] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Reload problem and submissions when id changes
  useEffect(() => {
    setIsLoading(true);
    setRunResults(null);
    setConsoleTab('testcases');

    // Applies a freshly loaded problem, picking the language and seeding the
    // editor from either saved work or the starter template.
    const applyProblem = (prob: ProblemDetail) => {
      setProblem(prob);

      const newLang = isSqlProblem(prob) ? 'sql' : (localStorage.getItem(`lang_${id}`) || 'javascript');
      setLanguage(newLang);

      const savedCode = localStorage.getItem(`code_${id}_${newLang}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        const starterKey = newLang === 'sql' ? 'javascript' : newLang;
        setCode(prob.starterCodes[starterKey as keyof typeof prob.starterCodes] || '');
      }

      setCustomInput(prob.examples?.length ? prob.examples[0].input : '');
    };

    getProblemApi(id || '')
      .then(async (prob) => {
        applyProblem(prob ? (prob as unknown as ProblemDetail) : await loadFallbackProblem(id || '', problemName));
      })
      .catch(async (err) => {
        console.error("Failed to load problem details from API:", err);
        applyProblem(await loadFallbackProblem(id || '', problemName));
      })
      .finally(() => setIsLoading(false));

    // Load historical submissions from API
    listSubmissionsApi(id || '')
      .then((records) => {
        setSubmissions(records.map((s) => ({
          status: normalizeSubmissionStatus(s.status),
          timestamp: new Date(s.submittedAt).toLocaleString(),
          language: s.language.toUpperCase(),
          runtime: `${s.runtimeMs}ms`,
          code: '',
        })));
      })
      .catch((err) => console.error("Failed to load submissions from API:", err));

    // `problemName` derives from `id`, and `language` is set by this effect —
    // including either would refetch the problem and discard in-progress code.
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load default/saved code on language change
  useEffect(() => {
    if (!problem) return;
    const savedCode = localStorage.getItem(`code_${id}_${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(problem.starterCodes[language as keyof typeof problem.starterCodes] || '');
    }
    localStorage.setItem(`lang_${id}`, language);
  }, [language, id, problem]);

  // Auto-save code to localStorage when updated
  useEffect(() => {
    if (code) {
      localStorage.setItem(`code_${id}_${language}`, code);
    }
  }, [code, id, language]);

  // Keyboard shortcut Ctrl + Enter to run code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language, problem]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const toastId = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id: toastId, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 4000);
  };

  const handleResetCode = () => {
    if (!problem) return;
    const confirmReset = window.confirm("Are you sure you want to reset your editor to the default starter code?");
    if (confirmReset) {
      const defaultCode = problem.starterCodes[language as keyof typeof problem.starterCodes] || '';
      setCode(defaultCode);
      showToast("Code reset to starter template.", "info");
    }
  };


  // Run code synchronously via API gateway
  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleTab('output');

    // Custom input takes a different path on purpose. The sample-case runner
    // wraps the solution in a harness that calls it with fixed arguments, so it
    // has nowhere to put arbitrary stdin. runScratchpad executes the file
    // verbatim instead, which is what "run it with my input" actually means.
    if (customInput.trim()) {
      try {
        const out = await runScratchpadApi(language, code, customInput);
        setRunResults({
          success: out.exitCode === 0 && !out.timedOut,
          custom: true,
          totalCases: 1,
          passedCases: out.exitCode === 0 ? 1 : 0,
          results: [{
            input: customInput,
            expected: '',
            actual: out.stdout || out.stderr || '(no output)',
            passed: out.exitCode === 0 && !out.timedOut,
          }],
          runtime: `${out.executionMs}ms`,
          memory: 'N/A',
        });
        if (out.timedOut) showToast('Your code timed out.', 'error');
        else if (out.exitCode !== 0) showToast('Your code exited with an error.', 'error');
        else showToast('Ran with your input.', 'success');
      } catch (err: any) {
        showToast(err.message || 'Failed to run with your input', 'error');
      } finally {
        setIsRunning(false);
      }
      return;
    }

    try {
      const run = await runCodeApi(id || '', language, code);

      setRunResults({
        success: run.overallStatus === 'Accepted',
        totalCases: run.testResults.length,
        passedCases: run.testResults.filter((tr) => tr.status === 'Accepted').length,
        results: toPanelResults(run.testResults),
        runtime: `${run.runtimeMs}ms`,
        memory: 'N/A',
      });

      setIsRunning(false);

      if (run.overallStatus === 'Accepted') {
        showToast("Code ran successfully! All test cases passed.", "success");
      } else {
        showToast(`Code failed correctness checks: ${run.overallStatus}`, "error");
      }
    } catch (err: any) {
      console.error("Run code error:", err);
      setIsRunning(false);
      showToast(err.message || "Failed to run code", "error");
    }
  };

  // Submit code asynchronously via API gateway and poll status
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setIsRunning(true);
    setConsoleTab('output');

    try {
      const submissionId = await submitCodeApi(id || '', language, code);
      showToast("Code submitted! Awaiting evaluation...", "info");

      // Poll getSubmission until it's graded
      let pollCount = 0;
      const pollInterval = setInterval(async () => {
        pollCount++;
        if (pollCount > 15) {
          clearInterval(pollInterval);
          setIsSubmitting(false);
          setIsRunning(false);
          showToast("Evaluation timed out. Please check submissions history.", "error");
          return;
        }

        try {
          const sub = await getSubmissionApi(submissionId);
          if (sub.status !== 'Pending' && sub.status !== 'Running') {
            clearInterval(pollInterval);
            setIsSubmitting(false);
            setIsRunning(false);

            setRunResults({
              success: sub.status === 'Accepted',
              totalCases: sub.testResults.length,
              passedCases: sub.testResults.filter((tr) => tr.status === 'Accepted').length,
              results: toPanelResults(sub.testResults),
              runtime: `${sub.runtimeMs}ms`,
              memory: `${(sub.memoryKb / 1024).toFixed(1)}MB`,
            });

            // Update submissions list
            const newSubmission: Submission = {
              status: normalizeSubmissionStatus(sub.status),
              timestamp: new Date(sub.submittedAt).toLocaleString(),
              language: language.toUpperCase(),
              runtime: `${sub.runtimeMs}ms`,
              code: code,
            };
            setSubmissions(prev => [newSubmission, ...prev]);

            if (sub.status === 'Accepted') {
              showToast("Submission Accepted! All test cases passed.", "success");
            } else {
              showToast(`Submission Rejected: ${sub.status}`, "error");
            }
          }
        } catch (err) {
          console.error("Failed to poll submission status:", err);
        }
      }, 1000);

    } catch (err: any) {
      console.error("Submit code error:", err);
      setIsRunning(false);
      setIsSubmitting(false);
      showToast(err.message || "Failed to submit code", "error");
    }
  };

  if (isLoading || !problem) {
    return (
      <div className="h-screen w-screen flex items-center justify-center font-semibold" style={{ background: '#0d0f1a', color: '#94a3b8' }}>
        Loading challenge workspace...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans select-none antialiased" style={{ background: '#0d0f1a', color: '#e2e8f0' }}>
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl border shadow-xl text-xs font-semibold pointer-events-auto ${toast.type === 'success'
                  ? 'border-green-500/20 text-green-500 shadow-green-500/5'
                  : toast.type === 'error'
                    ? 'border-red-500/20 text-red-500 shadow-red-500/5'
                    : 'border-accent/20 text-accent shadow-accent/5'
                }`}
              style={{ background: '#151829' }}
            >
              {toast.type === 'success' && <CheckCircle className="h-4 w-4" />}
              {toast.type === 'error' && <XCircle className="h-4 w-4" />}
              {toast.type === 'info' && <Info className="h-4 w-4" />}
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <WorkspaceHeader
        currentProblemId={id || ''}
        problemTitle={problem.title}
        onResetCode={handleResetCode}
        onRunCode={handleRunCode}
        onSubmitCode={handleSubmitCode}
        isSubmitting={isSubmitting}
        isRunning={isRunning}
      />

      {/* Resizable panels layout */}
      <div className="flex-1 w-full p-4 overflow-hidden transition-colors duration-200" style={{ background: '#0d0f1a' }}>
        <PanelGroup orientation="horizontal">
          {!isFullscreen && (
            <>
              <Panel defaultSize={42} minSize={25} className="h-full">
                <ProblemDescriptionPanel problem={problem} submissions={submissions} />
              </Panel>
              {/* Vertical resizer gutter */}
              <PanelResizeHandle className="w-2.5 group relative flex items-center justify-center cursor-col-resize focus:outline-none select-none">
                <div className="h-12 w-0.5 rounded-full bg-[#1f2235] group-hover:bg-[#4648d4] group-focus:bg-[#4648d4] transition-colors" />
              </PanelResizeHandle>
            </>
          )}

          <Panel defaultSize={isFullscreen ? 100 : 58} minSize={25} className="h-full">
            <PanelGroup orientation="vertical">
              <Panel defaultSize={62} minSize={30} className="w-full">
                <IDEPanel
                  language={language}
                  onLanguageChange={setLanguage}
                  code={code}
                  onCodeChange={setCode}
                  onReset={handleResetCode}
                  isFullscreen={isFullscreen}
                  onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                  isSqlMode={isSqlProblem(problem)}
                />
              </Panel>

              {/* Horizontal resizer gutter */}
              <PanelResizeHandle className="h-2.5 group relative flex items-center justify-center cursor-row-resize focus:outline-none select-none">
                <div className="w-12 h-0.5 rounded-full bg-[#1f2235] group-hover:bg-[#4648d4] group-focus:bg-[#4648d4] transition-colors" />
              </PanelResizeHandle>

              <Panel defaultSize={38} minSize={20} className="w-full">
                <ConsolePanel
                  examples={problem.examples}
                  isRunning={isRunning}
                  runResults={runResults}
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                  onRunCode={handleRunCode}
                  onSubmitCode={handleSubmitCode}
                  isSubmitting={isSubmitting}
                  activeTab={consoleTab}
                  setActiveTab={setConsoleTab}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default SolveProblemPage;
