import React, { useState } from 'react';

// ─── Design tokens ─────────────────────────────────────────────
const T = {
  bg: '#0d0f1a',
  bgPanel: '#111320',
  bgCard: '#151829',
  bgHover: '#1a1d30',
  border: '#1f2235',
  primary: '#4648d4',
  primaryHover: '#5557e8',
  primaryGlow: 'rgba(70,72,212,0.12)',
  green: '#00ea64',
  greenDim: '#052e16',
  red: '#f87171',
  redDim: '#2a0a0a',
  purple: '#c0c1ff',
  amber: '#fbbf24',
  textPrimary: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#4b5675',
  mono: "'Fira Code','JetBrains Mono',monospace",
  sans: "'Plus Jakarta Sans',sans-serif",
};

// ─── Types ──────────────────────────────────────────────────────
interface CaseResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  stdout?: string;
}

interface RunResults {
  /**
   * Which button produced this result, and therefore how it may be labelled.
   * 'custom' is a scratchpad execution against the learner's own stdin — there
   * are no test cases and no verdict, so it must never render as "Accepted".
   */
  mode?: 'run' | 'submit' | 'custom';
  success: boolean;
  totalCases: number;
  passedCases: number;
  results: CaseResult[];
  runtime?: string;
  memory?: string;
  error?: string;
}

interface Example { input: string; output: string; }

interface ConsolePanelProps {
  examples: Example[];
  isRunning: boolean;
  runResults: RunResults | null;
  customInput: string;
  onCustomInputChange: (v: string) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  isSubmitting: boolean;
  activeTab: 'testcases' | 'output' | 'custom';
  setActiveTab: (t: 'testcases' | 'output' | 'custom') => void;
  isAssignmentMode?: boolean;
}

// ─── Tiny shared components ─────────────────────────────────────
const IOLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: T.textMuted, marginBottom: 6 }}>
    {children}
  </div>
);

const CodeBlock = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <pre style={{
    fontFamily: T.mono, fontSize: 12, lineHeight: 1.65,
    background: T.bgCard, border: `1px solid ${T.border}`,
    borderRadius: 8, padding: '8px 12px',
    color: color ?? T.textPrimary,
    overflowX: 'auto', whiteSpace: 'pre-wrap', margin: 0,
  }}>{children}</pre>
);

// ─── Main component ─────────────────────────────────────────────
const ConsolePanel: React.FC<ConsolePanelProps> = ({
  examples,
  isRunning,
  runResults,
  customInput,
  onCustomInputChange,
  onRunCode,
  onSubmitCode,
  isSubmitting,
  activeTab,
  setActiveTab,
  isAssignmentMode,
}) => {
  const [caseIdx, setCaseIdx] = useState(0);
  const [resultIdx, setResultIdx] = useState(0);

  // `resultIdx` survives across runs and is never reset, so a "Case 3" selected
  // during a graded run would index past the end of a later single-result custom
  // run and blank the detail panel. Clamp rather than trust it.
  const safeResultIdx = runResults
    ? Math.min(resultIdx, Math.max(0, runResults.results.length - 1))
    : 0;

  const tabStyle = (tab: typeof activeTab): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '10px 14px', fontSize: 12, fontWeight: 700,
    fontFamily: T.sans, cursor: 'pointer', border: 'none', background: 'transparent',
    borderBottom: `2px solid ${activeTab === tab ? T.primary : 'transparent'}`,
    marginBottom: -1,
    color: activeTab === tab ? T.purple : T.textMuted,
    transition: 'color .15s, border-color .15s',
    position: 'relative' as const,
  });

  const casePillStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
    fontFamily: T.sans, cursor: 'pointer', border: `1px solid ${active ? T.primary : T.border}`,
    background: active ? T.primaryGlow : T.bgCard,
    color: active ? T.purple : T.textSecondary,
    transition: 'all .15s',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@400;500&display=swap');
        .cp-scroll::-webkit-scrollbar{width:4px}
        .cp-scroll::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}
        .cp-run:hover{background:${T.bgHover}!important;border-color:${T.textMuted}!important;color:${T.textPrimary}!important}
        .cp-submit:hover{background:${T.primaryHover}!important}
        .cp-tab:hover{color:${T.textSecondary}!important}
        .cp-case:hover{border-color:${T.primary}!important;color:${T.purple}!important}
        @keyframes cp-spin{to{transform:rotate(360deg)}}
        @keyframes cp-pulse{0%,100%{opacity:1}50%{opacity:.3}}
      `}</style>

      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        background: T.bgPanel, border: `1px solid ${T.border}`,
        borderRadius: 12, overflow: 'hidden', fontFamily: T.sans,
      }}>

        {/* ── Tab bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${T.border}`, background: T.bg,
          padding: '0 12px 0 4px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex' }}>
            {/* Test Cases */}
            <button className="cp-tab" style={tabStyle('testcases')} onClick={() => setActiveTab('testcases')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="18" y2="18" /></svg>
              Test Cases
            </button>
            {/* Custom Input */}
            <button className="cp-tab" style={tabStyle('custom')} onClick={() => setActiveTab('custom')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Custom Input
            </button>
            {/* Output */}
            <button className="cp-tab" style={tabStyle('output')} onClick={() => setActiveTab('output')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
              Output
              {runResults && (
                <span style={{
                  position: 'absolute', top: 10, right: 4,
                  width: 6, height: 6, borderRadius: '50%',
                  background: runResults.success ? T.green : T.red,
                }} />
              )}
            </button>
          </div>

          {/* Run + Submit */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className="cp-run" onClick={onRunCode} disabled={isRunning || isSubmitting} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 8,
              background: T.bgCard, border: `1px solid ${T.border}`,
              color: T.textSecondary, fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: T.sans, transition: 'all .15s',
              opacity: isRunning || isSubmitting ? 0.5 : 1,
              pointerEvents: isRunning || isSubmitting ? 'none' : 'auto',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill={T.green} stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              Run Code
            </button>
            <button className="cp-submit" onClick={onSubmitCode} disabled={isRunning || isSubmitting} style={{
              padding: '5px 14px', borderRadius: 8,
              background: T.primary, border: 'none',
              color: '#fff', fontSize: 12, fontWeight: 800,
              cursor: 'pointer', fontFamily: T.sans, transition: 'background .15s',
              opacity: isRunning || isSubmitting ? 0.5 : 1,
              pointerEvents: isRunning || isSubmitting ? 'none' : 'auto',
              boxShadow: `0 0 14px rgba(70,72,212,.3)`,
            }}>
              Submit
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="cp-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>

          {/* ── TEST CASES ── */}
          {activeTab === 'testcases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {examples.map((_, i) => (
                  <button key={i} className="cp-case" onClick={() => setCaseIdx(i)} style={casePillStyle(caseIdx === i)}>
                    Case {i + 1}
                  </button>
                ))}
              </div>
              {examples[caseIdx] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: T.mono }}>
                  <div><IOLabel>Input Variable(s)</IOLabel><CodeBlock>{examples[caseIdx].input}</CodeBlock></div>
                  <div><IOLabel>Expected Output</IOLabel><CodeBlock color={T.green}>{examples[caseIdx].output}</CodeBlock></div>
                </div>
              )}
            </div>
          )}

          {/* ── CUSTOM INPUT ── */}
          {activeTab === 'custom' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
              <IOLabel>Provide Input Arguments</IOLabel>
              {/* Run Code branches on this box being non-empty, which is not
                  obvious from the UI. Say so, or a learner leaves a stray
                  character here and wonders why nothing is ever graded. */}
              <p style={{ fontSize: 11, color: customInput.trim() ? T.amber : T.textMuted, margin: 0, lineHeight: 1.5 }}>
                {customInput.trim()
                  ? 'While this box has content, Run Code executes your program against it instead of the test cases. Clear it to go back to grading.'
                  : 'Leave empty to run against the sample test cases. One value per line, in argument order.'}
              </p>
              <textarea
                value={customInput}
                onChange={e => onCustomInputChange(e.target.value)}
                placeholder={'e.g. [2,7,11,15]\n9'}
                style={{
                  flex: 1, minHeight: 120, width: '100%', resize: 'none',
                  padding: '10px 12px', fontFamily: T.mono, fontSize: 12,
                  background: T.bgCard, border: `1px solid ${T.border}`,
                  borderRadius: 8, color: T.textPrimary, outline: 'none',
                  transition: 'border-color .15s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = T.primary; }}
                onBlur={e => { e.currentTarget.style.borderColor = T.border; }}
              />
            </div>
          )}

          {/* ── OUTPUT ── */}
          {activeTab === 'output' && (
            <div style={{ height: '100%' }}>
              {isRunning ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: 12, textAlign: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${T.primary}`, borderTopColor: 'transparent', animation: 'cp-spin .8s linear infinite' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: T.textMuted, animation: 'cp-pulse 1.4s ease-in-out infinite' }}>COMPILING & EXECUTING...</span>
                </div>
              ) : runResults ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {runResults.success
                        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>}
                      <span style={{ fontSize: 16, fontWeight: 800, color: runResults.success ? T.green : T.red }}>
                        {isAssignmentMode || runResults.mode === 'custom'
                          ? (runResults.success ? 'Executed Successfully' : 'Execution Failed')
                          : (runResults.success ? 'Accepted' : 'Wrong Answer')}
                      </span>
                    </div>
                    {runResults.runtime && (
                      <div style={{ display: 'flex', gap: 14, fontSize: 11, fontFamily: T.mono, color: T.textSecondary }}>
                        <span>Runtime: <strong style={{ color: T.textPrimary }}>{runResults.runtime}</strong></span>
                        <span>Memory: <strong style={{ color: T.textPrimary }}>{runResults.memory}</strong></span>
                      </div>
                    )}
                  </div>

                  {runResults.error ? (
                    <div style={{ background: T.redDim, border: `1px solid ${T.red}30`, borderRadius: 8, padding: '10px 12px', fontFamily: T.mono, fontSize: 12, color: T.red, whiteSpace: 'pre-wrap' }}>
                      {runResults.error}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 12, color: T.textSecondary, fontWeight: 600 }}>
                        {isAssignmentMode ? 'Code ran to completion without errors.'
                          : runResults.mode === 'custom' ? 'Ran against your custom input — not graded against the test cases.'
                          : (
                          <>
                            Passed: <span style={{ color: T.green, fontWeight: 800 }}>{runResults.passedCases}</span> / {runResults.totalCases} cases
                          </>
                        )}
                      </div>
                      {/* Case tabs — a custom run has a single result and no verdict per case. */}
                      {runResults.mode !== 'custom' && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>
                        {runResults.results.map((r, i) => (
                          <button key={i} className="cp-case" onClick={() => setResultIdx(i)} style={{
                            ...casePillStyle(safeResultIdx === i),
                            display: 'flex', alignItems: 'center', gap: 5,
                          }}>
                            {r.passed
                              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
                            Case {i + 1}
                          </button>
                        ))}
                      </div>
                      )}
                      {/* Case detail */}
                      {runResults.results[safeResultIdx] && (() => {
                        const r = runResults.results[safeResultIdx];
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div><IOLabel>Input</IOLabel><CodeBlock>{r.input}</CodeBlock></div>
                            {runResults.mode === 'custom' ? (
                              <div><IOLabel>Your Output</IOLabel><CodeBlock color={r.passed ? T.textPrimary : T.red}>{r.actual}</CodeBlock></div>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div><IOLabel>Expected Output</IOLabel><CodeBlock color={T.green}>{r.expected}</CodeBlock></div>
                                <div><IOLabel>Your Output</IOLabel><CodeBlock color={r.passed ? T.green : T.red}>{r.actual}</CodeBlock></div>
                              </div>
                            )}
                            {r.stdout && <div><IOLabel>Stdout</IOLabel><CodeBlock color={T.textSecondary}>{r.stdout}</CodeBlock></div>}
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: 10, textAlign: 'center' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="1.5" opacity=".35"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                  <p style={{ fontSize: 13, color: T.textMuted }}>Run your code to see output here.</p>
                  <p style={{ fontSize: 12, color: T.textMuted, opacity: .7 }}>Click Run Code to execute test cases.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsolePanel;