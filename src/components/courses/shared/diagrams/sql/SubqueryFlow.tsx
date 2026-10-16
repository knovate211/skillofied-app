import React from 'react';

/** Inner query runs first and hands its value up — the mental model for subqueries. */
export const SubqueryFlow: React.FC = () => (
  <svg
    viewBox="0 0 520 168"
    role="img"
    aria-label="The inner subquery is evaluated first and its result is substituted into the outer query"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="sq-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--accent)" />
      </marker>
    </defs>

    <rect x="8" y="16" width="504" height="128" rx="10" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1.4" />
    <text x="24" y="38" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
      SELECT name FROM employees
    </text>
    <text x="24" y="56" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
      WHERE salary &gt; (
    </text>

    <rect x="44" y="66" width="290" height="34" rx="7" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.5" />
    <text x="58" y="88" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
      SELECT AVG(salary) FROM employees
    </text>
    <text x="348" y="88" fontSize="9" fontWeight="700" fill="var(--honey-deep)" letterSpacing="0.05em">
      ① RUNS FIRST
    </text>

    <text x="24" y="120" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
      );
    </text>

    <path d="M340 83 C 396 83, 404 66, 430 60" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
    <rect x="404" y="38" width="94" height="26" rx="6" fill="var(--olive-tint)" stroke="var(--olive-deep)" strokeWidth="1.4" />
    <text x="451" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      52000
    </text>
    <text x="451" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--olive-deep)" letterSpacing="0.05em">
      ② SUBSTITUTED
    </text>

    <text x="260" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      the outer query then behaves exactly as if you had typed WHERE salary &gt; 52000
    </text>
  </svg>
);

/** GROUP BY collapses rows; a window function keeps them. The single clearest contrast in SQL. */
export const WindowVsGroupBy: React.FC = () => {
  const rows = [
    ['Ana', 'Sales', '50'],
    ['Bo', 'Sales', '70'],
    ['Cy', 'Tech', '90'],
  ];
  return (
    <svg
      viewBox="0 0 600 196"
      role="img"
      aria-label="GROUP BY collapses three rows into two, while a window function keeps all three rows and adds a column"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <text x="8" y="14" fontSize="10" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.05em">
        INPUT — 3 ROWS
      </text>
      {rows.map((r, i) => (
        <g key={r[0]}>
          <rect x="8" y={22 + i * 28} width="150" height="24" rx="5" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1" />
          <text x="18" y={38 + i * 28} fontSize="10" fill="var(--text-primary)" fontFamily="monospace">
            {r[0]} · {r[1]} · {r[2]}
          </text>
        </g>
      ))}

      <text x="212" y="14" fontSize="10" fontWeight="700" fill="var(--rose-deep)" letterSpacing="0.05em">
        GROUP BY dept — 2 ROWS
      </text>
      {[
        ['Sales', '120'],
        ['Tech', '90'],
      ].map((r, i) => (
        <g key={r[0]}>
          <rect x="212" y={22 + i * 28} width="150" height="24" rx="5" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1" />
          <text x="222" y={38 + i * 28} fontSize="10" fill="var(--text-primary)" fontFamily="monospace">
            {r[0]} · SUM = {r[1]}
          </text>
        </g>
      ))}
      <text x="212" y="124" fontSize="9" fill="var(--rose-deep)">
        the individual names are gone
      </text>

      <text x="416" y="14" fontSize="10" fontWeight="700" fill="var(--olive-deep)" letterSpacing="0.05em">
        SUM() OVER — 3 ROWS
      </text>
      {[
        ['Ana', '50', '120'],
        ['Bo', '70', '120'],
        ['Cy', '90', '90'],
      ].map((r, i) => (
        <g key={r[0]}>
          <rect x="416" y={22 + i * 28} width="176" height="24" rx="5" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1" />
          <text x="426" y={38 + i * 28} fontSize="10" fill="var(--text-primary)" fontFamily="monospace">
            {r[0]} · {r[1]} · dept total {r[2]}
          </text>
        </g>
      ))}
      <text x="416" y="124" fontSize="9" fill="var(--olive-deep)">
        every row survives, with the total attached
      </text>

      <text x="300" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
        Reach for a window function whenever you need the aggregate <tspan fontStyle="italic">and</tspan> the detail row.
      </text>
    </svg>
  );
};
