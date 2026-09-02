import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import protobuf from 'react-syntax-highlighter/dist/esm/languages/prism/protobuf';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';

/**
 * PrismLight with explicit registration, not Prism.
 *
 * The default `Prism` export pulls in all ~300 grammars — roughly 600 KB of
 * JavaScript for the dozen languages this app actually shows. Registering only
 * what the courses use keeps highlighting identical and the chunk small.
 *
 * Add a language here when course content starts using one; an unregistered
 * language renders as plain text rather than failing.
 */
const LANGUAGES: Record<string, unknown> = {
  bash, css, docker, go, java, javascript, json, jsx,
  markup, protobuf, python, sql, tsx, typescript, yaml,
};
Object.entries(LANGUAGES).forEach(([name, grammar]) => {
  SyntaxHighlighter.registerLanguage(name, grammar);
});

/** Course content writes these spellings; Prism knows the values. */
const ALIASES: Record<string, string> = {
  html: 'markup',
  xml: 'markup',
  dockerfile: 'docker',
  js: 'javascript',
  ts: 'typescript',
  golang: 'go',
  postgres: 'sql',
  postgresql: 'sql',
  shell: 'bash',
  sh: 'bash',
  yml: 'yaml',
};

/** Normalise the authored language to a registered grammar name. */
const resolveLanguage = (language: string): string => {
  const key = language.trim().toLowerCase();
  return ALIASES[key] ?? key;
};
import styles from '../courses/FrontendCoursePage.module.css';

interface Props {
  language: string;
  code: string;
  title?: string;
  isRunnable?: boolean;
}

const CodeSnippet: React.FC<Props> = ({ language, code, title, isRunnable = true }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            padding: 16px; 
            margin: 0;
            color: #333;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>${code}</body>
    </html>
  `;

  const handleRun = () => {
    setIsRunning(true);
    setShowPreview(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowPreview(true);
    }, 800);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      
      {/* IDE Design (Exact Match to Java Section) */}
      <div style={{
        background: '#1e1e2e',
        border: '1.5px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
        fontSize: '13px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        {/* IDE Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#151521',
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {/* Windows Buttons */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          {/* Tab Title */}
          <div style={{ color: '#a1a1aa', fontSize: '12px', fontWeight: '600' }}>
            {title || (language.toLowerCase() === 'html' ? 'index.html' : 'Code Block')}
          </div>
          {/* Language Badge */}
          <div style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {language}
          </div>
        </div>

        {/* Editor Body */}
        <div style={{ display: 'flex', background: '#1e1e2e', padding: '16px 0', overflowX: 'auto' }}>
          {/* Line Numbers */}
          <div style={{
            textAlign: 'right',
            padding: '0 12px 0 16px',
            color: '#4b5563',
            userSelect: 'none',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            marginRight: '16px'
          }}>
            {code.trim().split('\\n').map((_, idx) => (
              <div key={idx} style={{ height: '20px', lineHeight: '20px' }}>{idx + 1}</div>
            ))}
          </div>
          
          {/* Code Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <SyntaxHighlighter
              language={resolveLanguage(language)}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                border: 'none',
                fontSize: '13px',
                lineHeight: '20px',
                fontFamily: 'inherit'
              }}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      {/* Action Area (Run Button + Output) */}
      {isRunnable && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          <div>
            <button 
              className={styles.saveBtn} 
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning ? 'Rendering Preview...' : '▶ Run Code'}
            </button>
          </div>
          
          {(isRunning || showPreview) && (
            <div style={{ 
              marginTop: '8px',
              border: '2px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              animation: 'slideDown 0.3s ease-out',
              opacity: isRunning ? 0.6 : 1,
              transition: 'opacity 0.2s'
            }}>
              <div style={{ backgroundColor: '#f1f5f9', padding: '8px 16px', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: '#64748b', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </div>
                <span style={{ marginLeft: '8px' }}>Live HTML Output</span>
              </div>
              
              {isRunning ? (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Rendering preview...
                </div>
              ) : (
                <iframe 
                  srcDoc={previewHtml}
                  style={{ width: '100%', height: '250px', border: 'none', display: 'block' }}
                  title="Live Code Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
