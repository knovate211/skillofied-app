import React from 'react';

/**
 * The gap every SQL learner trips on: the order you *write* a query is not the
 * order the engine *runs* it. Both orders are drawn on one axis so the
 * mismatch — SELECT written second but evaluated sixth — is visible at a glance.
 */
const WRITTEN = ['SELECT', 'FROM', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'];
const EXECUTED = ['FROM', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'];

const CHIP_W = 76;
const CHIP_H = 24;
const GAP = 6;

const Row: React.FC<{ items: string[]; y: number; fill: string; stroke: string }> = ({ items, y, fill, stroke }) => (
  <>
    {items.map((item, i) => (
      <g key={item}>
        <rect x={8 + i * (CHIP_W + GAP)} y={y} width={CHIP_W} height={CHIP_H} rx="6" fill={fill} stroke={stroke} strokeWidth="1.2" />
        <text
          x={8 + i * (CHIP_W + GAP) + CHIP_W / 2}
          y={y + 16}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="var(--text-primary)"
          fontFamily="monospace"
        >
          {item}
        </text>
      </g>
    ))}
  </>
);

const QueryExecutionOrder: React.FC = () => (
  <svg
    viewBox="0 0 672 150"
    role="img"
    aria-label="A query is written SELECT first but executed FROM first, with SELECT evaluated sixth"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <text x="8" y="14" fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.06em">
      HOW YOU WRITE IT
    </text>
    <Row items={WRITTEN} y={22} fill="var(--bg-surface-2)" stroke="var(--border)" />

    {/* The one line that carries the lesson: SELECT slides from slot 1 to slot 6. */}
    <path
      d="M46 50 C 46 70, 456 70, 456 106"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.6"
      strokeDasharray="4 3"
    />
    <text x="236" y="68" textAnchor="middle" fontSize="9.5" fontStyle="italic" fill="var(--accent)">
      SELECT runs almost last
    </text>

    <text x="8" y="102" fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.06em">
      HOW THE ENGINE RUNS IT
    </text>
    <Row items={EXECUTED} y={110} fill="var(--olive-tint)" stroke="var(--olive)" />
  </svg>
);

export default QueryExecutionOrder;
