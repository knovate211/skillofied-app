import React from 'react';

interface Entity {
  name: string;
  fields: string[];
}

/** Crow's-foot notation: "1" is a bar, "many" is the three-pronged fork. */
const CrowFoot: React.FC<{ x: number; y: number; flip?: boolean }> = ({ x, y, flip }) => {
  const d = flip ? -1 : 1;
  return (
    <g stroke="var(--text-primary)" strokeWidth="1.4" fill="none">
      <line x1={x} y1={y} x2={x + 11 * d} y2={y - 7} />
      <line x1={x} y1={y} x2={x + 11 * d} y2={y} />
      <line x1={x} y1={y} x2={x + 11 * d} y2={y + 7} />
    </g>
  );
};

const OneBar: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke="var(--text-primary)" strokeWidth="1.6" />
);

const Box: React.FC<{ x: number; y: number; entity: Entity; tint: string; edge: string }> = ({
  x,
  y,
  entity,
  tint,
  edge,
}) => (
  <g>
    <rect x={x} y={y} width="126" height={26 + entity.fields.length * 15} rx="8" fill="var(--bg-surface)" stroke={edge} strokeWidth="1.4" />
    <path d={`M${x} ${y + 8} a8 8 0 0 1 8 -8 h110 a8 8 0 0 1 8 8 v16 h-126 z`} fill={tint} />
    <text x={x + 63} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      {entity.name}
    </text>
    {entity.fields.map((f, i) => (
      <text key={f} x={x + 10} y={y + 39 + i * 15} fontSize="9.5" fill="var(--text-secondary)" fontFamily="monospace">
        {f}
      </text>
    ))}
  </g>
);

/** users 1—1 profiles: the FK carries a UNIQUE constraint, which is what caps it at one. */
export const OneToOneDiagram: React.FC = () => (
  <svg viewBox="0 0 400 116" role="img" aria-label="A one-to-one relationship: one user has one profile, enforced by a unique foreign key" style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block', margin: '0 auto' }}>
    <Box x={8} y={16} entity={{ name: 'users', fields: ['id  PK', 'email'] }} tint="var(--rose-tint)" edge="var(--rose)" />
    <line x1="134" y1="52" x2="266" y2="52" stroke="var(--text-primary)" strokeWidth="1.4" />
    <OneBar x={146} y={52} />
    <OneBar x={254} y={52} />
    <text x="200" y="44" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--callout-fg)" fontFamily="monospace">
      1 — 1
    </text>
    <text x="200" y="70" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      user_id is UNIQUE
    </text>
    <Box x={266} y={16} entity={{ name: 'profiles', fields: ['id  PK', 'user_id  FK ∪'] }} tint="var(--olive-tint)" edge="var(--olive)" />
  </svg>
);

/** users 1—* orders: the plain FK on the child side, the default relationship. */
export const OneToManyDiagram: React.FC = () => (
  <svg viewBox="0 0 400 116" role="img" aria-label="A one-to-many relationship: one user has many orders via a foreign key on orders" style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block', margin: '0 auto' }}>
    <Box x={8} y={16} entity={{ name: 'users', fields: ['id  PK', 'name'] }} tint="var(--rose-tint)" edge="var(--rose)" />
    <line x1="134" y1="52" x2="266" y2="52" stroke="var(--text-primary)" strokeWidth="1.4" />
    <OneBar x={146} y={52} />
    <CrowFoot x={254} y={52} flip />
    <text x="200" y="44" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--callout-fg)" fontFamily="monospace">
      1 — ∞
    </text>
    <text x="200" y="70" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      FK lives on the many side
    </text>
    <Box x={266} y={16} entity={{ name: 'orders', fields: ['id  PK', 'user_id  FK'] }} tint="var(--olive-tint)" edge="var(--olive)" />
  </svg>
);

/** students *—* courses: only reachable through a junction table. */
export const ManyToManyDiagram: React.FC = () => (
  <svg viewBox="0 0 560 116" role="img" aria-label="A many-to-many relationship between students and courses, resolved by an enrollments junction table" style={{ width: '100%', height: 'auto', display: 'block' }}>
    <Box x={8} y={16} entity={{ name: 'students', fields: ['id  PK', 'name'] }} tint="var(--rose-tint)" edge="var(--rose)" />
    <line x1="134" y1="52" x2="216" y2="52" stroke="var(--text-primary)" strokeWidth="1.4" />
    <OneBar x={146} y={52} />
    <CrowFoot x={204} y={52} flip />
    <Box x={216} y={8} entity={{ name: 'enrollments', fields: ['student_id  FK', 'course_id  FK', 'enrolled_at'] }} tint="var(--honey-tint)" edge="var(--honey)" />
    <line x1="342" y1="52" x2="424" y2="52" stroke="var(--text-primary)" strokeWidth="1.4" />
    <CrowFoot x={354} y={52} />
    <OneBar x={412} y={52} />
    <Box x={424} y={16} entity={{ name: 'courses', fields: ['id  PK', 'title'] }} tint="var(--olive-tint)" edge="var(--olive)" />
    <text x="279" y="106" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">
      the junction table turns one ∞—∞ into two 1—∞
    </text>
  </svg>
);
