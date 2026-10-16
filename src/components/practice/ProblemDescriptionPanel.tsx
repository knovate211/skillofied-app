import React, { useState } from 'react';

// ─── Design tokens ────────────────────────────────────────────
const T = {
  bg: '#0d0f1a',
  bgPanel: '#111320',
  bgCard: '#151829',
  bgHover: '#1a1d30',
  border: '#1f2235',
  borderAccent: '#4648d4',
  primary: '#4648d4',
  primaryDim: '#2f31a0',
  primaryGlow: 'rgba(70,72,212,0.15)',
  green: '#00ea64',
  greenDim: '#052e16',
  amber: '#fbbf24',
  amberDim: '#2c1800',
  red: '#f87171',
  redDim: '#2a0a0a',
  purple: '#c0c1ff',
  textPrimary: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#4b5675',
  white: '#ffffff',
  fontMono: "'Fira Code', 'JetBrains Mono', monospace",
  fontSans: "'Plus Jakarta Sans', sans-serif",
};

// ─── Types ────────────────────────────────────────────────────
interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemDetail {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  topic: string;
  statement: string;
  examples: Example[];
  constraints: string[];
  tags?: string[];
}

interface Submission {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error';
  timestamp: string;
  language: string;
  runtime: string;
  code: string;
}

interface Props {
  problem: ProblemDetail;
  submissions: Submission[];
}

// ─── Tiny helpers ──────────────────────────────────────────────
const diffStyle = (d: 'Easy' | 'Medium' | 'Hard') => {
  if (d === 'Easy') return { bg: '#052e16', color: '#00ea64', border: '#00ea6430' };
  if (d === 'Medium') return { bg: '#2c1800', color: '#fbbf24', border: '#fbbf2430' };
  return { bg: '#2a0a0a', color: '#f87171', border: '#f8717130' };
};

function Pill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 700, letterSpacing: '.04em',
      padding: '3px 10px', borderRadius: 6,
      border: `1px solid ${T.border}`,
      background: T.bgCard, color: T.textSecondary,
      ...style,
    }}>{children}</span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '.08em',
      textTransform: 'uppercase', color: T.textMuted,
      marginBottom: 10, marginTop: 20,
    }}>{children}</div>
  );
}

// Inline markdown: `code` and **bold**
function Formatted({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.75, marginBottom: 14 }}>
          {para.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((chunk, j) => {
            if (chunk.startsWith('`') && chunk.endsWith('`'))
              return <code key={j} style={{ fontFamily: T.fontMono, fontSize: 11, background: T.bgCard, color: T.purple, padding: '1px 6px', borderRadius: 4, border: `1px solid ${T.border}`, margin: '0 2px' }}>{chunk.slice(1, -1)}</code>;
            if (chunk.startsWith('**') && chunk.endsWith('**'))
              return <strong key={j} style={{ color: T.textPrimary, fontWeight: 600 }}>{chunk.slice(2, -2)}</strong>;
            return chunk;
          })}
        </p>
      ))}
    </>
  );
}

// ─── Main component ────────────────────────────────────────────
const ProblemDescriptionPanel: React.FC<Props> = ({ problem, submissions }) => {
  const [activeTab, setActiveTab] = useState<'statement' | 'submissions' | 'help'>('statement');
  const [openHint, setOpenHint] = useState<number | null>(null);
  const diff = diffStyle(problem.difficulty);

  const tabStyle = (tab: typeof activeTab): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '10px 14px', fontSize: 12, fontWeight: 700,
    fontFamily: T.fontSans, cursor: 'pointer', border: 'none',
    borderBottom: `2px solid ${activeTab === tab ? T.primary : 'transparent'}`,
    marginBottom: -1, background: 'transparent',
    color: activeTab === tab ? T.purple : T.textMuted,
    transition: 'color .15s, border-color .15s',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@400;500&display=swap');
        .pdp-scroll::-webkit-scrollbar { width: 4px; }
        .pdp-scroll::-webkit-scrollbar-track { background: transparent; }
        .pdp-scroll::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
        .pdp-tag:hover { background: ${T.bgHover} !important; color: ${T.textPrimary} !important; }
        .pdp-hint:hover { border-color: ${T.primary} !important; }
        .pdp-sub-row:hover { background: ${T.bgHover} !important; }
        .pdp-tab:hover { color: ${T.textSecondary} !important; }
      `}</style>

      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        background: T.bgPanel, border: `1px solid ${T.border}`,
        borderRadius: 12, overflow: 'hidden',
        fontFamily: T.fontSans,
      }}>

        {/* ── Tab bar ── */}
        <div style={{
          display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`,
          background: T.bg, padding: '0 16px', flexShrink: 0,
        }}>
          {(['statement', 'submissions', 'help'] as const).map(tab => (
            <button key={tab} className="pdp-tab" style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
              {tab === 'statement' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>}
              {tab === 'submissions' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>}
              {tab === 'help' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
              <span style={{ textTransform: 'capitalize' }}>{tab}</span>
              {tab === 'submissions' && <span style={{ fontSize: 10, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 4, padding: '1px 6px', color: T.textMuted }}>{submissions.length}</span>}
            </button>
          ))}
        </div>

        {/* ── Scrollable body ── */}
        <div className="pdp-scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>

          {/* ══ STATEMENT ══ */}
          {activeTab === 'statement' && (
            <div>
              {/* Title + meta */}
              <h1 style={{ fontSize: 19, fontWeight: 800, color: T.textPrimary, letterSpacing: '-.02em', marginBottom: 12, lineHeight: 1.25 }}>
                {problem.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
                <Pill style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}>
                  {problem.difficulty}
                </Pill>
                <Pill style={{ background: T.primaryGlow, color: T.purple, border: `1px solid ${T.borderAccent}40` }}>
                  +{problem.xp} XP
                </Pill>
                <Pill>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>
                  {problem.topic}
                </Pill>
              </div>

              {/* Statement */}
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
                <Formatted text={problem.statement} />
              </div>

              {/* Examples — absent on tasks the sandbox cannot run, where there
                  is no expected stdout to show. */}
              {problem.examples.length > 0 && (
              <>
              <SectionLabel>Examples</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {problem.examples.map((ex, i) => (
                  <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ padding: '6px 12px', borderBottom: `1px solid ${T.border}`, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', color: T.textMuted, textTransform: 'uppercase' }}>
                      Example {i + 1}
                    </div>
                    <div style={{ padding: '10px 12px', fontFamily: T.fontMono, fontSize: 12 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'baseline' }}>
                        <span style={{ color: T.textMuted, minWidth: 58, fontWeight: 600 }}>Input</span>
                        <code style={{ color: T.textSecondary, whiteSpace: 'pre-wrap' }}>{ex.input}</code>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        <span style={{ color: T.textMuted, minWidth: 58, fontWeight: 600 }}>Output</span>
                        <code style={{ color: T.green }}>{ex.output}</code>
                      </div>
                      {ex.explanation && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`, fontSize: 12, color: T.textSecondary, fontFamily: T.fontSans, lineHeight: 1.6, borderLeft: `2px solid ${T.primary}`, paddingLeft: 10 }}>
                          <strong style={{ color: T.textPrimary }}>Explanation: </strong>{ex.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </>
              )}

              {/* Constraints */}
              <SectionLabel>Constraints</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {problem.constraints.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: T.primary, fontSize: 14, lineHeight: 1 }}>•</span>
                    <code style={{ fontFamily: T.fontMono, fontSize: 12, background: T.bgCard, color: T.textSecondary, padding: '4px 10px', borderRadius: 6, border: `1px solid ${T.border}` }}>{c}</code>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {problem.tags && problem.tags.length > 0 && (
                <>
                  <SectionLabel>Tags</SectionLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {problem.tags.map(tag => (
                      <span key={tag} className="pdp-tag" style={{
                        fontSize: 11, fontWeight: 600, padding: '4px 10px',
                        borderRadius: 6, background: T.bgCard,
                        border: `1px solid ${T.border}`, color: T.textSecondary,
                        cursor: 'pointer', transition: 'all .15s',
                      }}>{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ SUBMISSIONS ══ */}
          {activeTab === 'submissions' && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, marginBottom: 14 }}>Submission history</div>
              {submissions.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', textAlign: 'center', gap: 10 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="1.5" opacity=".4"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  <p style={{ fontSize: 13, color: T.textMuted }}>No submissions yet.</p>
                  <p style={{ fontSize: 12, color: T.textMuted, opacity: .7 }}>Write code and click Submit to start.</p>
                </div>
              ) : (
                <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden' }}>
                  {submissions.map((sub, i) => (
                    <div key={i} className="pdp-sub-row" style={{
                      padding: '12px 14px', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between',
                      borderBottom: i < submissions.length - 1 ? `1px solid ${T.border}` : 'none',
                      transition: 'background .15s',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          {sub.status === 'Accepted'
                            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                          }
                          <span style={{ fontSize: 13, fontWeight: 700, color: sub.status === 'Accepted' ? T.green : T.red }}>{sub.status}</span>
                        </div>
                        <span style={{ fontSize: 11, color: T.textMuted }}>{sub.timestamp}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontFamily: T.fontMono, color: T.textPrimary, fontWeight: 600 }}>{sub.language}</div>
                        <div style={{ fontSize: 11, fontFamily: T.fontMono, color: T.textMuted }}>{sub.runtime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ HELP ══ */}
          {activeTab === 'help' && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, marginBottom: 14 }}>Hints & guidance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { title: 'Hint 1 — Time complexity', body: 'An O(N²) nested-loop solution may pass small inputs but fail larger ones. Can you use a Hash Table or sorting to achieve O(N) or O(N log N)?' },
                  { title: 'Hint 2 — Edge cases', body: 'Check: empty inputs, negative values, extremely large numbers, and duplicates. Each can silently break an otherwise correct solution.' },
                ].map((hint, i) => (
                  <div key={i} className="pdp-hint" onClick={() => setOpenHint(openHint === i ? null : i)} style={{
                    background: T.bgCard, border: `1px solid ${openHint === i ? T.borderAccent : T.border}`,
                    borderRadius: 10, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .15s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, background: T.primaryGlow, color: T.purple, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${T.borderAccent}40` }}>{i + 1}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{hint.title}</span>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2" style={{ transform: openHint === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                    {openHint === i && (
                      <div style={{ padding: '0 14px 12px', fontSize: 12, color: T.textSecondary, lineHeight: 1.7, borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
                        {hint.body}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Complexity */}
              <SectionLabel>Complexity target</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['Time', 'O(N)'], ['Space', 'O(N) or O(1)']].map(([label, val]) => (
                  <div key={label} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.06em', color: T.textMuted, textTransform: 'uppercase', marginBottom: 5 }}>{label} complexity</div>
                    <div style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ProblemDescriptionPanel;

// ─── Demo wrapper (remove in production) ──────────────────────
export function Demo() {
  const problem: ProblemDetail = {
    title: 'Arithmetic Operators Basics',
    difficulty: 'Easy',
    xp: 50,
    topic: 'Operators',
    statement: 'Write a program that takes two integer inputs `a` and `b` and returns their sum, difference, product, and quotient (integer division) in an array format:\n\n`[sum, difference, product, quotient]`\n\nMake sure to handle **standard arithmetic rules**.',
    examples: [{ input: 'a = 10\nb = 2', output: '[12, 8, 20, 5]', explanation: '10+2=12, 10-2=8, 10×2=20, 10÷2=5' }],
    constraints: ['-10^4 <= a, b <= 10^4', 'b != 0 for division'],
    tags: ['Basic Math', 'Operators'],
  };
  const submissions: Submission[] = [
    { status: 'Accepted', timestamp: '2026-05-28 13:01', language: 'JavaScript', runtime: '48ms', code: '' },
    { status: 'Wrong Answer', timestamp: '2026-05-28 12:55', language: 'JavaScript', runtime: '—', code: '' },
  ];
  return (
    <div style={{ background: '#0d0f1a', minHeight: '100vh', padding: 24, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ maxWidth: 520, height: 640 }}>
        <ProblemDescriptionPanel problem={problem} submissions={submissions} />
      </div>
    </div>
  );
}