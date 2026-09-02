import React from 'react';

/** What actually happens between "my app runs a query" and "rows come back". */
const ClientServerDiagram: React.FC = () => (
  <svg
    viewBox="0 0 620 180"
    role="img"
    aria-label="An application sends SQL over TCP to the database server, which parses, plans and executes it against disk, then returns rows"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="csd-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    {/* Client */}
    <rect x="8" y="46" width="108" height="66" rx="10" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.4" />
    <text x="62" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
      Your app
    </text>
    <text x="62" y="88" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      Node · psql · DBeaver
    </text>
    <text x="62" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-muted)" letterSpacing="0.06em">
      CLIENT
    </text>

    <line x1="120" y1="66" x2="164" y2="66" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#csd-arrow)" />
    <text x="142" y="58" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="monospace">
      SQL text
    </text>
    <line x1="164" y1="92" x2="120" y2="92" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#csd-arrow)" />
    <text x="142" y="106" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)" fontFamily="monospace">
      rows
    </text>

    {/* Server */}
    <rect x="168" y="20" width="308" height="122" rx="12" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1.4" />
    <text x="322" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-muted)" letterSpacing="0.06em">
      DATABASE SERVER
    </text>

    {['Parser', 'Planner', 'Executor'].map((stage, i) => (
      <g key={stage}>
        <rect x={182 + i * 98} y="52" width="86" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--olive)" strokeWidth="1.3" />
        <text x={225 + i * 98} y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
          {stage}
        </text>
        {i < 2 && (
          <line
            x1={268 + i * 98}
            y1="72"
            x2={280 + i * 98}
            y2="72"
            stroke="var(--text-muted)"
            strokeWidth="1.4"
            markerEnd="url(#csd-arrow)"
          />
        )}
      </g>
    ))}
    <text x="225" y="110" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      is the syntax valid?
    </text>
    <text x="323" y="110" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      index or full scan?
    </text>
    <text x="421" y="110" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      fetch the rows
    </text>

    <line x1="480" y1="72" x2="514" y2="72" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#csd-arrow)" />

    {/* Storage */}
    <g transform="translate(524 40)">
      <ellipse cx="38" cy="10" rx="34" ry="10" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.4" />
      <path d="M4 10 v44 c0 5.5 15 10 34 10 s34 -4.5 34 -10 V10" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.4" />
      <path d="M4 32 c0 5.5 15 10 34 10 s34 -4.5 34 -10" fill="none" stroke="var(--olive-deep)" strokeWidth="1.4" />
    </g>
    <text x="562" y="126" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-muted)" letterSpacing="0.06em">
      DISK
    </text>
    <text x="562" y="140" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      tables · indexes · WAL
    </text>
  </svg>
);

export default ClientServerDiagram;
