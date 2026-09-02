import React from 'react';

/**
 * Which parts of the two-circle Venn a given join keeps.
 *  - `left` / `right`  : the whole circle on that side
 *  - `both`            : both whole circles
 *  - `inner`           : the overlap only
 *  - `leftOnly` / `rightOnly` / `outer` : the anti-join shapes (overlap excluded)
 */
type Region = 'inner' | 'left' | 'right' | 'both' | 'leftOnly' | 'rightOnly' | 'outer';

const KEEPS: Record<Region, { onlyA: boolean; onlyB: boolean; overlap: boolean }> = {
  inner: { onlyA: false, onlyB: false, overlap: true },
  left: { onlyA: true, onlyB: false, overlap: true },
  right: { onlyA: false, onlyB: true, overlap: true },
  both: { onlyA: true, onlyB: true, overlap: true },
  leftOnly: { onlyA: true, onlyB: false, overlap: false },
  rightOnly: { onlyA: false, onlyB: true, overlap: false },
  outer: { onlyA: true, onlyB: true, overlap: false },
};

const A = { cx: 118, cy: 74, r: 54 };
const B = { cx: 190, cy: 74, r: 54 };

/**
 * The join Venn diagram. Every join lesson gets the same two circles in the
 * same place, so the only thing that changes between lessons is the shading —
 * which is exactly the thing being taught.
 */
export const JoinVenn: React.FC<{ region: Region; label: string }> = ({ region, label }) => {
  const keep = KEEPS[region];
  // Ids must be unique per instance: several Venns share one lesson page, and
  // duplicate mask ids would make every diagram render the first one's shading.
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 308 168"
      role="img"
      aria-label={`${label}: the shaded region of a two-table Venn diagram showing which rows the join keeps`}
      style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block', margin: '0 auto' }}
    >
      <defs>
        {/* Circle A minus circle B */}
        <mask id={`${uid}-onlyA`}>
          <circle cx={A.cx} cy={A.cy} r={A.r} fill="#fff" />
          <circle cx={B.cx} cy={B.cy} r={B.r} fill="#000" />
        </mask>
        {/* Circle B minus circle A */}
        <mask id={`${uid}-onlyB`}>
          <circle cx={B.cx} cy={B.cy} r={B.r} fill="#fff" />
          <circle cx={A.cx} cy={A.cy} r={A.r} fill="#000" />
        </mask>
        {/* The overlap: A clipped to B */}
        <clipPath id={`${uid}-overlap`}>
          <circle cx={B.cx} cy={B.cy} r={B.r} />
        </clipPath>
      </defs>

      {keep.onlyA && <circle cx={A.cx} cy={A.cy} r={A.r} fill="var(--olive)" opacity="0.55" mask={`url(#${uid}-onlyA)`} />}
      {keep.onlyB && <circle cx={B.cx} cy={B.cy} r={B.r} fill="var(--olive)" opacity="0.55" mask={`url(#${uid}-onlyB)`} />}
      {keep.overlap && (
        <g clipPath={`url(#${uid}-overlap)`}>
          <circle cx={A.cx} cy={A.cy} r={A.r} fill="var(--olive-deep)" opacity="0.8" />
        </g>
      )}

      <circle cx={A.cx} cy={A.cy} r={A.r} fill="none" stroke="var(--text-primary)" strokeWidth="1.6" />
      <circle cx={B.cx} cy={B.cy} r={B.r} fill="none" stroke="var(--text-primary)" strokeWidth="1.6" />

      <text x={A.cx - 24} y={A.cy + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
        A
      </text>
      <text x={B.cx + 24} y={B.cy + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
        B
      </text>

      <text x="72" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
        left table
      </text>
      <text x="236" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
        right table
      </text>
      <text x="154" y="20" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
        {label}
      </text>
    </svg>
  );
};

export const InnerJoinVenn: React.FC = () => <JoinVenn region="inner" label="INNER JOIN" />;
export const LeftJoinVenn: React.FC = () => <JoinVenn region="left" label="LEFT JOIN" />;
export const RightJoinVenn: React.FC = () => <JoinVenn region="right" label="RIGHT JOIN" />;
export const FullJoinVenn: React.FC = () => <JoinVenn region="both" label="FULL OUTER JOIN" />;
export const LeftAntiJoinVenn: React.FC = () => <JoinVenn region="leftOnly" label="LEFT JOIN … IS NULL" />;
export const FullAntiJoinVenn: React.FC = () => <JoinVenn region="outer" label="FULL JOIN … IS NULL" />;
