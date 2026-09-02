import React from 'react';

/** BEGIN → work → COMMIT, and the ROLLBACK branch that undoes all of it. */
export const TransactionLifecycle: React.FC = () => (
  <svg
    viewBox="0 0 600 158"
    role="img"
    aria-label="A transaction begins, performs statements, then either commits durably or rolls back leaving no trace"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="txn-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    {[
      { x: 8, label: 'BEGIN', sub: 'open', tint: 'var(--bg-surface-2)', edge: 'var(--border)' },
      { x: 150, label: 'UPDATE …', sub: 'debit A', tint: 'var(--honey-tint)', edge: 'var(--honey)' },
      { x: 292, label: 'UPDATE …', sub: 'credit B', tint: 'var(--honey-tint)', edge: 'var(--honey)' },
    ].map((n, i) => (
      <g key={n.label + i}>
        <rect x={n.x} y="34" width="118" height="40" rx="8" fill={n.tint} stroke={n.edge} strokeWidth="1.4" />
        <text x={n.x + 59} y="53" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
          {n.label}
        </text>
        <text x={n.x + 59} y="66" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
          {n.sub}
        </text>
        <line x1={n.x + 118} y1="54" x2={n.x + 146} y2="54" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#txn-arrow)" />
      </g>
    ))}

    <rect x="436" y="8" width="118" height="40" rx="8" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.5" />
    <text x="495" y="27" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      COMMIT
    </text>
    <text x="495" y="40" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      all changes durable
    </text>

    <rect x="436" y="90" width="118" height="40" rx="8" fill="var(--rose-tint)" stroke="var(--rose-deep)" strokeWidth="1.5" />
    <text x="495" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      ROLLBACK
    </text>
    <text x="495" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      as if nothing ran
    </text>

    <path d="M410 46 C 424 46, 424 28, 436 28" fill="none" stroke="var(--olive-deep)" strokeWidth="1.5" markerEnd="url(#txn-arrow)" />
    <path d="M410 62 C 424 62, 424 110, 436 110" fill="none" stroke="var(--rose-deep)" strokeWidth="1.5" markerEnd="url(#txn-arrow)" />

    <text x="234" y="150" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      nothing between BEGIN and COMMIT is visible to anyone else — that is Isolation
    </text>
  </svg>
);

/** Two transactions, two locks, each waiting on the other: the deadlock cycle. */
export const DeadlockDiagram: React.FC = () => (
  <svg
    viewBox="0 0 460 168"
    role="img"
    aria-label="Transaction 1 holds row A and wants row B while transaction 2 holds row B and wants row A, forming a deadlock cycle"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="dl-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--rose-deep)" />
      </marker>
      <marker id="dl-hold" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--olive-deep)" />
      </marker>
    </defs>

    <rect x="8" y="20" width="120" height="38" rx="8" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1.4" />
    <text x="68" y="44" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      Txn 1
    </text>

    <rect x="332" y="20" width="120" height="38" rx="8" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1.4" />
    <text x="392" y="44" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      Txn 2
    </text>

    <rect x="8" y="110" width="120" height="38" rx="8" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.4" />
    <text x="68" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      row A 🔒
    </text>

    <rect x="332" y="110" width="120" height="38" rx="8" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.4" />
    <text x="392" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      row B 🔒
    </text>

    <line x1="68" y1="58" x2="68" y2="106" stroke="var(--olive-deep)" strokeWidth="1.6" markerEnd="url(#dl-hold)" />
    <text x="74" y="86" fontSize="9" fill="var(--olive-deep)">holds</text>

    <line x1="392" y1="58" x2="392" y2="106" stroke="var(--olive-deep)" strokeWidth="1.6" markerEnd="url(#dl-hold)" />
    <text x="330" y="86" textAnchor="end" fontSize="9" fill="var(--olive-deep)">holds</text>

    <path d="M128 34 H 300 L 348 106" fill="none" stroke="var(--rose-deep)" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#dl-arrow)" />
    <text x="214" y="27" textAnchor="middle" fontSize="9" fill="var(--rose-deep)">waits for B</text>

    <path d="M332 44 H 160 L 112 106" fill="none" stroke="var(--rose-deep)" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#dl-arrow)" />
    <text x="238" y="58" textAnchor="middle" fontSize="9" fill="var(--rose-deep)">waits for A</text>

    <text x="230" y="164" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      neither can proceed — the database detects the cycle and kills one
    </text>
  </svg>
);
