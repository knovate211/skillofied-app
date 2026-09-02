import React from 'react';

/**
 * Why an index is fast: a B-Tree turns "look at every row" into "follow three
 * pointers". The node values are the ones the walkthrough in the lesson uses.
 */
export const BTreeIndexDiagram: React.FC = () => {
  const leaves = [
    ['10', '18'],
    ['31', '44'],
    ['58', '65'],
    ['77', '92'],
  ];
  return (
    <svg
      viewBox="0 0 560 176"
      role="img"
      aria-label="A B-Tree index: a root node splits into two internal nodes, each pointing at sorted leaf pages that hold row pointers"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Root */}
      <rect x="232" y="8" width="96" height="28" rx="6" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.4" />
      <text x="280" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
        50
      </text>
      <text x="344" y="26" fontSize="8.5" fill="var(--text-muted)">
        root
      </text>

      {/* Internal */}
      {['25', '75'].map((v, i) => (
        <g key={v}>
          <path d={`M280 36 V 52 H ${146 + i * 268} V 66`} fill="none" stroke="var(--text-muted)" strokeWidth="1.3" />
          <rect x={106 + i * 268} y="66" width="80" height="26" rx="6" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.3" />
          <text x={146 + i * 268} y="84" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {v}
          </text>
        </g>
      ))}

      {/* Leaves */}
      {leaves.map((leaf, i) => {
        const x = 22 + i * 134;
        const parentX = i < 2 ? 146 : 414;
        return (
          <g key={i}>
            <path d={`M${parentX} 92 V 106 H ${x + 56} V 120`} fill="none" stroke="var(--text-muted)" strokeWidth="1.2" />
            <rect x={x} y="120" width="112" height="30" rx="6" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.3" />
            <text x={x + 56} y="139" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)" fontFamily="monospace">
              {leaf.join(' · ')} → row
            </text>
          </g>
        );
      })}

      <text x="280" y="168" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
        finding id = 65 costs 3 hops, not 1,000,000 comparisons
      </text>
    </svg>
  );
};

/** The same query with and without an index, drawn as pages touched. */
export const ScanComparisonDiagram: React.FC = () => {
  const cells = Array.from({ length: 40 }, (_, i) => i);
  const hit = 26;
  return (
    <svg
      viewBox="0 0 560 172"
      role="img"
      aria-label="A sequential scan reads every page while an index scan reads only the matching page"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <text x="8" y="14" fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.05em">
        SEQ SCAN — reads all 40 pages
      </text>
      {cells.map((i) => (
        <rect
          key={`s${i}`}
          x={8 + (i % 20) * 27}
          y={22 + Math.floor(i / 20) * 22}
          width="23"
          height="18"
          rx="3"
          fill="var(--rose-tint)"
          stroke="var(--rose)"
          strokeWidth="1"
        />
      ))}
      <text x="470" y="60" fontSize="10" fontWeight="700" fill="var(--rose-deep)" fontFamily="monospace">
        cost ≈ 40
      </text>

      <text x="8" y="96" fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" letterSpacing="0.05em">
        INDEX SCAN — reads 1 page
      </text>
      {cells.map((i) => (
        <rect
          key={`i${i}`}
          x={8 + (i % 20) * 27}
          y={104 + Math.floor(i / 20) * 22}
          width="23"
          height="18"
          rx="3"
          fill={i === hit ? 'var(--olive)' : 'var(--bg-surface-2)'}
          stroke={i === hit ? 'var(--olive-deep)' : 'var(--border)'}
          strokeWidth={i === hit ? 1.6 : 1}
        />
      ))}
      <text x="470" y="142" fontSize="10" fontWeight="700" fill="var(--olive-deep)" fontFamily="monospace">
        cost ≈ 1
      </text>
    </svg>
  );
};
