import React from 'react';

const FAMILIES = [
  { key: 'DDL', name: 'Definition', cmds: 'CREATE · ALTER · DROP · TRUNCATE', tint: 'var(--rose-tint)', edge: 'var(--rose)' },
  { key: 'DML', name: 'Manipulation', cmds: 'INSERT · UPDATE · DELETE', tint: 'var(--honey-tint)', edge: 'var(--honey)' },
  { key: 'DQL', name: 'Query', cmds: 'SELECT', tint: 'var(--olive-tint)', edge: 'var(--olive)' },
  { key: 'TCL', name: 'Transaction', cmds: 'COMMIT · ROLLBACK · SAVEPOINT', tint: 'var(--bg-surface-2)', edge: 'var(--border)' },
  { key: 'DCL', name: 'Control', cmds: 'GRANT · REVOKE', tint: 'var(--bg-surface-2)', edge: 'var(--border)' },
];

/** The five command families, so every new keyword has a shelf to go on. */
const SqlCommandFamilies: React.FC = () => (
  <svg
    viewBox="0 0 640 132"
    role="img"
    aria-label="SQL commands grouped into DDL, DML, DQL, TCL and DCL families"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <rect x="248" y="6" width="144" height="26" rx="8" fill="var(--callout-icon)" />
    <text x="320" y="23" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="monospace">
      SQL
    </text>

    {FAMILIES.map((f, i) => {
      const x = 6 + i * 128;
      const cx = x + 60;
      return (
        <g key={f.key}>
          <path d={`M320 32 V 46 H ${cx} V 62`} fill="none" stroke="var(--border)" strokeWidth="1.3" />
          <rect x={x} y="62" width="120" height="62" rx="9" fill={f.tint} stroke={f.edge} strokeWidth="1.3" />
          <text x={cx} y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {f.key}
          </text>
          <text x={cx} y="93" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            {f.name}
          </text>
          {/* Command list wraps by hand: SVG text has no automatic wrapping. */}
          {f.cmds.split(' · ').reduce<string[][]>((lines, cmd) => {
            const last = lines[lines.length - 1];
            if (last && last.join(' · ').length + cmd.length < 18) last.push(cmd);
            else lines.push([cmd]);
            return lines;
          }, []).slice(0, 2).map((line, li) => (
            <text key={li} x={cx} y={107 + li * 10} textAnchor="middle" fontSize="7.5" fill="var(--text-muted)" fontFamily="monospace">
              {line.join(' · ')}
            </text>
          ))}
        </g>
      );
    })}
  </svg>
);

export default SqlCommandFamilies;
