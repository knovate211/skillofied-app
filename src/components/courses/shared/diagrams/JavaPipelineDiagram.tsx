import React from 'react';

/**
 * "How Java Works" pipeline: .java source → javac → bytecode → JVM → OS.
 * Drawn as a single viewBox'd SVG so it scales with the side panel instead of
 * reflowing, and takes every colour from the theme tokens so it survives the
 * light/dark toggle.
 */
const JavaPipelineDiagram: React.FC = () => (
  <svg
    viewBox="0 0 440 116"
    role="img"
    aria-label="Java source is compiled by javac into bytecode, which the JVM executes on the operating system"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="jpd-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0 0 L6 3 L0 6 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    {/* ── .java source file ── */}
    <g transform="translate(14 8)">
      <path
        d="M4 0 h26 l12 12 v40 a4 4 0 0 1 -4 4 h-34 a4 4 0 0 1 -4 -4 v-48 a4 4 0 0 1 4 -4 z"
        fill="var(--bg-surface)"
        stroke="var(--text-primary)"
        strokeWidth="2"
      />
      <path d="M30 0 v12 h12" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
      <text x="21" y="40" textAnchor="middle" fontSize="13" fill="var(--text-primary)" fontFamily="monospace">
        &lt;/&gt;
      </text>
    </g>
    <text x="35" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
      Java Source
    </text>
    <text x="35" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      (<tspan fill="#e0563f">.java</tspan>)
    </text>

    <line x1="66" y1="38" x2="86" y2="38" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#jpd-arrow)" />

    {/* ── javac compiler ── */}
    <rect x="94" y="20" width="58" height="36" rx="8" fill="rgba(99, 102, 241, 0.10)" stroke="#6366f1" strokeWidth="1.5" />
    <text x="123" y="43" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6366f1">
      JAVAC
    </text>
    <text x="123" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
      Compiler
    </text>

    <line x1="160" y1="38" x2="180" y2="38" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#jpd-arrow)" />

    {/* ── bytecode class file ── */}
    <g transform="translate(188 8)">
      <path
        d="M4 0 h26 l12 12 v40 a4 4 0 0 1 -4 4 h-34 a4 4 0 0 1 -4 -4 v-48 a4 4 0 0 1 4 -4 z"
        fill="var(--bg-surface)"
        stroke="var(--text-primary)"
        strokeWidth="2"
      />
      <path d="M30 0 v12 h12" fill="none" stroke="var(--text-primary)" strokeWidth="2" />
      <text x="21" y="40" textAnchor="middle" fontSize="13" fill="var(--text-primary)" fontFamily="monospace">
        &lt;/&gt;
      </text>
    </g>
    <text x="209" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
      Bytecode
    </text>
    <text x="209" y="94" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      (<tspan fill="#e0563f">.class</tspan>)
    </text>

    <line x1="240" y1="38" x2="260" y2="38" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#jpd-arrow)" />

    {/* ── JVM runtime ── */}
    <rect x="268" y="20" width="58" height="36" rx="8" fill="rgba(34, 197, 94, 0.10)" stroke="#22c55e" strokeWidth="1.5" />
    <text x="297" y="43" textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a">
      JVM
    </text>
    <text x="297" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
      (Runtime)
    </text>

    <line x1="334" y1="38" x2="354" y2="38" stroke="var(--text-muted)" strokeWidth="2" markerEnd="url(#jpd-arrow)" />

    {/* ── OS / hardware ── */}
    <g transform="translate(362 12)">
      <rect x="0" y="0" width="56" height="38" rx="4" fill="var(--bg-surface)" stroke="var(--text-primary)" strokeWidth="2" />
      <rect x="6" y="6" width="44" height="26" rx="2" fill="var(--text-primary)" opacity="0.85" />
      <path d="M22 38 h12 v6 h6 v2 h-24 v-2 h6 z" fill="var(--text-primary)" />
    </g>
    <text x="390" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
      OS / Hardware
    </text>
  </svg>
);

export default JavaPipelineDiagram;
