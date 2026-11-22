import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw, Sun, Moon, Play, Send, Pause } from 'lucide-react';
import { T } from './theme';


interface WorkspaceHeaderProps {
  currentProblemId: string;
  problemTitle: string;
  problemTopic?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onResetCode?: () => void;
  onRunCode?: () => void;
  onSubmitCode?: () => void;
  isSubmitting?: boolean;
  isRunning?: boolean;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  problemTitle = 'Arithmetic Operators Basics',
  problemTopic = 'Operators',
  hasPrev = true,
  hasNext = true,
  onPrev,
  onNext,
  onResetCode,
  onRunCode,
  onSubmitCode,
  isSubmitting = false,
  isRunning = false,
}) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${ss}`;
  };

  // ── Shared button bases ──────────────────────────────────────
  const iconBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: 8,
    background: 'transparent', border: `1px solid transparent`,
    color: T.textSecondary, cursor: 'pointer', transition: 'all .15s',
    fontFamily: T.fontSans,
  };

  return (
    <>
      <style>{`
        .wh-icon:hover { background: ${T.bgCard} !important; border-color: ${T.border} !important; color: ${T.textPrimary} !important; }
        .wh-nav:hover  { background: ${T.bgCard} !important; border-color: ${T.border} !important; color: ${T.textPrimary} !important; }
        .wh-crumb:hover { color: ${T.textPrimary} !important; }
        .wh-run:hover   { background: ${T.bgCard} !important; border-color: ${T.textMuted} !important; color: ${T.textPrimary} !important; }
        .wh-submit:hover { background: ${T.primaryHover} !important; }
        @keyframes wh-ping { 0%,100%{opacity:1} 50%{opacity:.25} }
        /* A phone cannot fit the full bar: the breadcrumb, dividers and timer
           go, and Back / Run shrink, so Submit stays on screen. */
        @media (max-width: 640px) {
          .wh-header { padding: 0 10px !important; gap: 8px !important; }
          .wh-hide-sm { display: none !important; }
          .wh-run, .wh-submit { padding: 6px 10px !important; }
        }
      `}</style>

      <header className="wh-header" style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${T.border}`,
        background: 'rgba(13,15,26,0.92)', backdropFilter: 'blur(16px)',
        padding: '0 20px', height: 52, flexShrink: 0,
        fontFamily: T.fontSans, userSelect: 'none',
        gap: 12,
      }}>

        {/* ── LEFT: back + breadcrumb + prev/next ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>

          {/* Back */}
          <button
            className="wh-icon"
            onClick={() => navigate('/practice')}
            aria-label="Back to practice"
            style={{ ...iconBtn, gap: 5, width: 'auto', padding: '0 10px', fontSize: 12, fontWeight: 700, color: T.textSecondary }}
          >
            <ArrowLeft size={13} />
            <span className="wh-hide-sm">Back</span>
          </button>

          {/* Divider */}
          <div className="wh-hide-sm" style={{ width: 1, height: 18, background: T.border, flexShrink: 0 }} />

          {/* Breadcrumb */}
          <div className="wh-hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: T.textMuted, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span className="wh-crumb" onClick={() => navigate('/practice')} style={{ cursor: 'pointer', color: T.textMuted, transition: 'color .15s' }}>Practice</span>
            <span style={{ color: T.border }}>/</span>
            <span className="wh-crumb" onClick={() => navigate('/practice')} style={{ cursor: 'pointer', color: T.textMuted, transition: 'color .15s' }}>{problemTopic}</span>
            <span style={{ color: T.border }}>/</span>
            <span style={{ color: T.textPrimary, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{problemTitle}</span>
          </div>

          {/* Divider */}
          <div className="wh-hide-sm" style={{ width: 1, height: 18, background: T.border, flexShrink: 0 }} />

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: 2, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8, padding: 2 }}>
            {[
              { icon: <ChevronLeft size={14} />, disabled: !hasPrev, onClick: onPrev, title: 'Previous problem' },
              { icon: <ChevronRight size={14} />, disabled: !hasNext, onClick: onNext, title: 'Next problem' },
            ].map((btn, i) => (
              <button key={i} className="wh-nav" onClick={btn.onClick} disabled={btn.disabled} title={btn.title} style={{
                ...iconBtn, width: 26, height: 26, borderRadius: 6,
                opacity: btn.disabled ? 0.3 : 1,
                pointerEvents: btn.disabled ? 'none' : 'auto',
              }}>
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── CENTER: timer ── */}
        <div className="wh-hide-sm" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: T.bgCard, border: `1px solid ${T.border}`,
          borderRadius: 9999, padding: '5px 14px',
          flexShrink: 0,
        }}>
          {/* pulsing dot */}
          <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: running ? T.green : T.amber,
              opacity: running ? 0.4 : 0,
              animation: running ? 'wh-ping 1.4s ease-in-out infinite' : 'none',
              transform: 'scale(1.6)',
            }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: running ? T.green : T.amber }} />
          </div>

          {/* time */}
          <span style={{ fontFamily: T.fontMono, fontSize: 13, fontWeight: 600, color: T.textPrimary, letterSpacing: '.06em', minWidth: 64, textAlign: 'center' }}>
            {fmt(seconds)}
          </span>

          {/* separator */}
          <div style={{ width: 1, height: 14, background: T.border }} />

          {/* pause/resume */}
          <button onClick={() => setRunning(r => !r)} style={{ ...iconBtn, width: 22, height: 22, borderRadius: 6 }} className="wh-icon" title={running ? 'Pause' : 'Resume'}>
            {running ? <Pause size={11} /> : <Play size={11} />}
          </button>
        </div>

        {/* ── RIGHT: reset + theme + run + submit ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {/* Reset */}
          <button className="wh-icon" onClick={onResetCode} title="Reset code" style={iconBtn}>
            <RefreshCw size={14} />
          </button>

          {/* Theme toggle */}
          <button className="wh-icon" onClick={() => setIsDark(d => !d)} title="Toggle theme" style={iconBtn}>
            {isDark
              ? <Sun size={14} style={{ color: T.amber }} />
              : <Moon size={14} style={{ color: T.textSecondary }} />}
          </button>

          {/* Separator */}
          <div className="wh-hide-sm" style={{ width: 1, height: 18, background: T.border }} />

          {/* Run code */}
          <button
            className="wh-run"
            onClick={onRunCode}
            disabled={isRunning || isSubmitting}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 8,
              background: T.bgCard, border: `1px solid ${T.border}`,
              color: T.textSecondary, fontSize: 12, fontWeight: 700,
              cursor: 'pointer', fontFamily: T.fontSans,
              opacity: isRunning || isSubmitting ? 0.5 : 1,
              pointerEvents: isRunning || isSubmitting ? 'none' : 'auto',
              transition: 'all .15s',
            }}
          >
            <Play size={12} />
            Run
            {/* The button's flex gap spaces the two words. */}
            <span className="wh-hide-sm">code</span>
          </button>

          {/* Submit */}
          <button
            className="wh-submit"
            onClick={onSubmitCode}
            disabled={isRunning || isSubmitting}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 18px', borderRadius: 8,
              background: T.primary, border: 'none',
              color: '#fff', fontSize: 12, fontWeight: 800,
              cursor: 'pointer', fontFamily: T.fontSans,
              opacity: isRunning || isSubmitting ? 0.5 : 1,
              pointerEvents: isRunning || isSubmitting ? 'none' : 'auto',
              transition: 'background .15s',
              boxShadow: `0 0 16px rgba(70,72,212,0.35)`,
              letterSpacing: '.01em',
            }}
          >
            <Send size={12} />
            Submit
          </button>
        </div>
      </header>
    </>
  );
};

export default WorkspaceHeader;