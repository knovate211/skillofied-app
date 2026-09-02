import React from 'react';

/** Where a connection pool sits, and why one exists at all. */
export const ConnectionPoolDiagram: React.FC = () => (
  <svg
    viewBox="0 0 560 168"
    role="img"
    aria-label="Many HTTP requests share a small pool of reused database connections rather than opening one each"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="cp-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    <text x="52" y="14" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.05em">
      REQUESTS
    </text>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="8" y={24 + i * 26} width="88" height="20" rx="5" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1" />
        <text x="52" y={38 + i * 26} textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontFamily="monospace">
          GET /orders
        </text>
        <line x1="98" y1={34 + i * 26} x2="150" y2={78} stroke="var(--border)" strokeWidth="1" />
      </g>
    ))}

    <rect x="154" y="34" width="150" height="92" rx="10" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.5" />
    <text x="229" y="54" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">
      Connection pool
    </text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={170 + i * 46} y="64" width="38" height="22" rx="5" fill="var(--bg-surface)" stroke="var(--honey-deep)" strokeWidth="1.2" />
        <text x={189 + i * 46} y="79" textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontFamily="monospace">
          conn
        </text>
      </g>
    ))}
    <text x="229" y="104" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      max: 10 · reused, never
    </text>
    <text x="229" y="116" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      reopened per request
    </text>

    <line x1="308" y1="80" x2="346" y2="80" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#cp-arrow)" />

    <g transform="translate(360 44)">
      <ellipse cx="38" cy="10" rx="34" ry="10" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.4" />
      <path d="M4 10 v44 c0 5.5 15 10 34 10 s34 -4.5 34 -10 V10" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.4" />
      <path d="M4 32 c0 5.5 15 10 34 10 s34 -4.5 34 -10" fill="none" stroke="var(--olive-deep)" strokeWidth="1.4" />
    </g>
    <text x="398" y="130" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text-secondary)">
      PostgreSQL
    </text>

    <text x="472" y="70" fontSize="9" fill="var(--rose-deep)" fontWeight="700">
      opening a connection
    </text>
    <text x="472" y="82" fontSize="9" fill="var(--rose-deep)" fontWeight="700">
      costs ~20–50 ms
    </text>
    <text x="472" y="98" fontSize="9" fill="var(--olive-deep)" fontWeight="700">
      borrowing one costs
    </text>
    <text x="472" y="110" fontSize="9" fill="var(--olive-deep)" fontWeight="700">
      microseconds
    </text>
  </svg>
);

/** Why a parameterised query is not "escaping done properly" but a different mechanism. */
export const SqlInjectionDiagram: React.FC = () => (
  <svg
    viewBox="0 0 600 190"
    role="img"
    aria-label="String concatenation lets user input become SQL, while a parameterised query sends the input separately as data"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <rect x="8" y="8" width="284" height="170" rx="10" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.5" />
    <text x="150" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--rose-deep)">
      ✗ String concatenation
    </text>
    <text x="22" y="50" fontSize="9.5" fill="var(--text-primary)" fontFamily="monospace">
      "SELECT * FROM users WHERE id = " + input
    </text>
    <text x="22" y="74" fontSize="9" fill="var(--text-secondary)">
      input = <tspan fontFamily="monospace" fill="var(--rose-deep)">1 OR 1=1; DROP TABLE users</tspan>
    </text>
    <rect x="22" y="86" width="256" height="34" rx="6" fill="var(--bg-surface)" stroke="var(--rose-deep)" strokeWidth="1.2" />
    <text x="32" y="107" fontSize="9" fill="var(--rose-deep)" fontFamily="monospace">
      → parsed as SQL. Every row returned.
    </text>
    <text x="150" y="146" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      the database cannot tell your query
    </text>
    <text x="150" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      apart from the attacker's
    </text>

    <rect x="308" y="8" width="284" height="170" rx="10" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.5" />
    <text x="450" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--olive-deep)">
      ✓ Parameterised query
    </text>
    <text x="322" y="50" fontSize="9.5" fill="var(--text-primary)" fontFamily="monospace">
      "SELECT * FROM users WHERE id = $1", [input]
    </text>
    <text x="322" y="74" fontSize="9" fill="var(--text-secondary)">
      input = <tspan fontFamily="monospace" fill="var(--olive-deep)">1 OR 1=1; DROP TABLE users</tspan>
    </text>
    <rect x="322" y="86" width="256" height="34" rx="6" fill="var(--bg-surface)" stroke="var(--olive-deep)" strokeWidth="1.2" />
    <text x="332" y="107" fontSize="9" fill="var(--olive-deep)" fontFamily="monospace">
      → looked up as one id value. 0 rows.
    </text>
    <text x="450" y="146" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      the query is planned before the value
    </text>
    <text x="450" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      arrives, so input can never be code
    </text>
  </svg>
);
