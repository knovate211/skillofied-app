import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Maximize2, Minimize2, RotateCcw } from 'lucide-react';

const T = {
  bg: '#0d0f1a',
  bgPanel: '#111320',
  bgCard: '#151829',
  bgHover: '#1a1d30',
  border: '#1f2235',
  textPrimary: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#4b5675',
  accent: '#28C5BC',
};

interface IDEPanelProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  code: string;
  onCodeChange: (newCode: string) => void;
  onReset: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isSqlMode?: boolean;
  /**
   * Restrict the language dropdown. Module assignments pin a question to one
   * language, because the starter code is written for it — switching would
   * silently invalidate the scaffold.
   */
  availableLanguages?: { id: string; label: string }[];
}

const IDEPanel: React.FC<IDEPanelProps> = ({
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onReset,
  isFullscreen,
  onToggleFullscreen,
  isSqlMode,
  availableLanguages,
}) => {
  const [fontSize, setFontSize] = useState<number>(14);
  const [editorLoading, setEditorLoading] = useState<boolean>(true);

  // Map editor language string to Monaco editor support
  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
        return 'javascript';
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'c++':
      case 'cpp':
        return 'cpp';
      case 'go':
      case 'golang':
        return 'go';
      case 'sql':
      case 'postgresql':
        return 'sql';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'xml':
        return 'xml';
      case 'yaml':
      case 'yml':
        return 'yaml';
      case 'markdown':
      case 'md':
        return 'markdown';
      case 'typescript':
      case 'ts':
        return 'typescript';
      // JSX has no dedicated Monaco mode; TypeScript highlights it correctly.
      case 'jsx':
      case 'tsx':
        return 'typescript';
      case 'dockerfile':
        return 'dockerfile';
      case 'shell':
      case 'bash':
      case 'sh':
        return 'shell';
      default:
        return 'javascript';
    }
  };

  const languages = availableLanguages
    ? availableLanguages
    : isSqlMode
    ? [{ id: 'sql', label: 'PostgreSQL' }]
    : [
        { id: 'javascript', label: 'JavaScript' },
        { id: 'python', label: 'Python' },
        { id: 'java', label: 'Java' },
        { id: 'cpp', label: 'C++' },
        { id: 'go', label: 'Go' },
      ];

  const iconBtnStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: '1px solid transparent',
    color: T.textSecondary, cursor: 'pointer', transition: 'all .15s',
    padding: '6px', borderRadius: '8px'
  };

  return (
    <>
      <style>{`
        .ide-btn:hover { background: ${T.bgHover}; color: ${T.textPrimary}; }
        .ide-select { background: ${T.bgCard}; border: 1px solid ${T.border}; color: ${T.textPrimary}; border-radius: 8px; padding: 4px 10px; font-size: 12px; font-weight: 700; outline: none; cursor: pointer; }
        .ide-select:hover { background: ${T.bgHover}; }
      `}</style>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        background: T.bgPanel, border: `1px solid ${T.border}`,
        borderRadius: 12, overflow: 'hidden'
      }}>
        {/* Editor Header Panel */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 16px', borderBottom: `1px solid ${T.border}`,
          background: T.bg, userSelect: 'none'
        }}>
          {/* Language select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="ide-select"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Editor controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Font sizing buttons */}
            <div style={{ display: 'flex', alignItems: 'center', background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                className="ide-btn"
                style={{ ...iconBtnStyle, padding: '4px 8px', fontSize: 10, fontWeight: 700, borderRight: `1px solid ${T.border}`, borderRadius: 0 }}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(Math.min(20, fontSize + 1))}
                className="ide-btn"
                style={{ ...iconBtnStyle, padding: '4px 8px', fontSize: 10, fontWeight: 700, borderRadius: 0 }}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            <button
              onClick={onReset}
              className="ide-btn"
              style={iconBtnStyle}
              title="Reset Editor to Default Starter Code"
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={onToggleFullscreen}
              className="ide-btn"
              style={iconBtnStyle}
              title={isFullscreen ? 'Exit Full Screen Editor' : 'Full Screen Editor'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div style={{ flex: 1, position: 'relative', width: '100%', background: T.bgPanel }}>
          {editorLoading && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', background: T.bgPanel,
              color: T.textMuted, zIndex: 10, gap: 12
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${T.accent}`, borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em' }}>INITIALIZING MONACO...</div>
            </div>
          )}
          <Editor
            height="100%"
            language={getMonacoLanguage(language)}
            value={code}
            onChange={(val) => onCodeChange(val || '')}
            onMount={() => setEditorLoading(false)}
            theme="custom-dark"
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('custom-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                  'editor.background': T.bgPanel,
                  'editorGutter.background': T.bgPanel,
                  'editor.lineHighlightBackground': '#1f293755',
                }
              });
            }}
            options={{
              fontSize: fontSize,
              fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
              minimap: { enabled: false },
              lineNumbers: 'on',
              automaticLayout: true,
              tabSize: 4,
              insertSpaces: true,
              scrollBeyondLastLine: false,
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
              hideCursorInOverviewRuler: true,
              renderLineHighlight: 'all',
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default IDEPanel;
