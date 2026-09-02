import React from 'react';

const SIZES = ['S', 'M', 'L'];
const COLOURS = ['Red', 'Blue'];

/**
 * CROSS JOIN has no Venn shape — the point is multiplication, so it is drawn as
 * the grid of every pairing: 3 sizes × 2 colours = 6 rows.
 */
const CrossJoinGrid: React.FC = () => (
  <svg
    viewBox="0 0 330 180"
    role="img"
    aria-label="A cross join of three sizes and two colours produces all six combinations"
    style={{ width: '100%', maxWidth: 360, height: 'auto', display: 'block', margin: '0 auto' }}
  >
    <text x="34" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)">
      sizes
    </text>
    {SIZES.map((s, i) => (
      <g key={s}>
        <rect x="14" y={26 + i * 34} width="40" height="26" rx="6" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.3" />
        <text x="34" y={43 + i * 34} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
          {s}
        </text>
      </g>
    ))}

    <text x="103" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)">
      colours
    </text>
    {COLOURS.map((c, i) => (
      <g key={c}>
        <rect x="76" y={43 + i * 34} width="54" height="26" rx="6" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.3" />
        <text x="103" y={60 + i * 34} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
          {c}
        </text>
      </g>
    ))}

    <text x="152" y="94" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-muted)">
      ×
    </text>

    <text x="248" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)">
      every pairing (6 rows)
    </text>
    {SIZES.flatMap((s, si) =>
      COLOURS.map((c, ci) => {
        const i = si * COLOURS.length + ci;
        return (
          <g key={`${s}-${c}`}>
            <rect
              x={174 + ci * 78}
              y={26 + si * 34}
              width="70"
              height="26"
              rx="6"
              fill="var(--honey-tint)"
              stroke="var(--honey)"
              strokeWidth="1.3"
            />
            <text
              x={209 + ci * 78}
              y={43 + si * 34}
              textAnchor="middle"
              fontSize="10.5"
              fill="var(--text-primary)"
              fontFamily="monospace"
            >
              {s}-{c}
            </text>
            <title>{`Row ${i + 1}`}</title>
          </g>
        );
      }),
    )}

    <text x="248" y="150" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">
      3 rows × 2 rows = 6 rows
    </text>
  </svg>
);

export default CrossJoinGrid;
