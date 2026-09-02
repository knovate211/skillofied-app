import React from 'react';

const FORMS = [
  { form: '1NF', fixes: 'atomic columns', detail: 'no lists in a cell, no repeating groups' },
  { form: '2NF', fixes: 'no partial deps', detail: 'every column depends on the whole key' },
  { form: '3NF', fixes: 'no transitive deps', detail: 'no column depends on another non-key column' },
  { form: 'BCNF', fixes: 'every determinant is a key', detail: 'the strict form of 3NF' },
];

/** The normal forms as a ladder: each rung removes one specific kind of duplication. */
const NormalizationFlow: React.FC = () => (
  <svg
    viewBox="0 0 600 172"
    role="img"
    aria-label="The normal forms as a ladder from an unnormalised table through 1NF, 2NF, 3NF to BCNF"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="nf-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    <rect x="8" y="60" width="94" height="42" rx="8" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.4" />
    <text x="55" y="79" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">
      One wide
    </text>
    <text x="55" y="92" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">
      table
    </text>
    <text x="55" y="118" textAnchor="middle" fontSize="8.5" fill="var(--rose-deep)">
      anomalies live here
    </text>

    {FORMS.map((f, i) => {
      const x = 118 + i * 120;
      return (
        <g key={f.form}>
          <line x1={x - 14} y1="81" x2={x - 2} y2="81" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#nf-arrow)" />
          <rect x={x} y="52" width="106" height="58" rx="8" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.4" />
          <text x={x + 53} y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {f.form}
          </text>
          <text x={x + 53} y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--callout-fg)">
            {f.fixes}
          </text>
          <text x={x + 53} y="101" textAnchor="middle" fontSize="7.5" fill="var(--text-secondary)">
            {f.detail.length > 34 ? `${f.detail.slice(0, 33)}…` : f.detail}
          </text>
        </g>
      );
    })}

    <text x="300" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.05em">
      EACH RUNG REMOVES ONE KIND OF DUPLICATION
    </text>
    <text x="300" y="150" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      more tables and more joins, but one fact stored in exactly one place
    </text>
  </svg>
);

export default NormalizationFlow;
