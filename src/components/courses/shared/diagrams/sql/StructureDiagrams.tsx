import React from 'react';

/** Cluster → database → schema → table → row: the nesting beginners keep conflating. */
export const DatabaseHierarchy: React.FC = () => {
  // One shared step so every nesting level keeps an even inset, and the three
  // table cards stay optically centred inside the schema box.
  const TABLES = ['users', 'orders', 'products'];
  const tableX = (i: number) => 48 + i * 145;

  return (
    <svg
      viewBox="0 0 520 180"
      role="img"
      aria-label="A server holds databases, a database holds schemas, a schema holds tables, and a table holds rows"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <rect x="8" y="8" width="504" height="164" rx="12" fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1.4" />
      <text x="22" y="26" fontSize="9.5" fontWeight="700" fill="var(--text-muted)" letterSpacing="0.06em">
        SERVER (one PostgreSQL instance)
      </text>

      <rect x="22" y="34" width="476" height="128" rx="10" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.3" />
      <text x="36" y="52" fontSize="9.5" fontWeight="700" fill="var(--rose-deep)" letterSpacing="0.06em">
        DATABASE  shop
      </text>

      <rect x="36" y="62" width="448" height="92" rx="9" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.3" />
      <text x="48" y="80" fontSize="9.5" fontWeight="700" fill="var(--honey-deep)" letterSpacing="0.06em">
        SCHEMA  public
      </text>

      {TABLES.map((t, i) => (
        <g key={t}>
          <rect x={tableX(i)} y="88" width="134" height="56" rx="8" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.3" />
          <text x={tableX(i) + 67} y="105" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {t}
          </text>
          {[0, 1, 2].map((r) => (
            <rect
              key={r}
              x={tableX(i) + 10}
              y={110 + r * 10}
              width="114"
              height="8"
              rx="2"
              fill="var(--bg-surface)"
              stroke="var(--olive)"
              strokeWidth="0.8"
            />
          ))}
        </g>
      ))}

    </svg>
  );
};

/** The PK/FK link, drawn on actual rows so "referential integrity" stops being abstract. */
export const KeyLinkDiagram: React.FC = () => (
  <svg
    viewBox="0 0 560 190"
    role="img"
    aria-label="Each order's user_id foreign key points at a users primary key, and a value with no match is rejected"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="kl-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--olive-deep)" />
      </marker>
      <marker id="kl-bad" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--rose-deep)" />
      </marker>
    </defs>

    <text x="8" y="14" fontSize="10" fontWeight="700" fill="var(--text-secondary)" fontFamily="monospace">
      users
    </text>
    <text x="18" y="30" fontSize="8.5" fontWeight="700" fill="var(--rose-deep)" letterSpacing="0.05em">
      PRIMARY KEY
    </text>
    {['1  Ana', '2  Bo', '3  Cy'].map((r, i) => (
      <g key={r}>
        <rect x="8" y={36 + i * 30} width="140" height="24" rx="5" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.1" />
        <text x="20" y={52 + i * 30} fontSize="10.5" fill="var(--text-primary)" fontFamily="monospace">
          {r}
        </text>
      </g>
    ))}

    <text x="352" y="14" fontSize="10" fontWeight="700" fill="var(--text-secondary)" fontFamily="monospace">
      orders
    </text>
    <text x="362" y="30" fontSize="8.5" fontWeight="700" fill="var(--olive-deep)" letterSpacing="0.05em">
      FOREIGN KEY user_id
    </text>
    {[
      { label: '101  user_id 1', ok: true },
      { label: '102  user_id 1', ok: true },
      { label: '103  user_id 3', ok: true },
      { label: '104  user_id 9', ok: false },
    ].map((r, i) => (
      <g key={r.label}>
        <rect
          x="352"
          y={36 + i * 30}
          width="160"
          height="24"
          rx="5"
          fill={r.ok ? 'var(--olive-tint)' : 'var(--bg-surface)'}
          stroke={r.ok ? 'var(--olive)' : 'var(--rose-deep)'}
          strokeWidth="1.1"
          strokeDasharray={r.ok ? undefined : '4 3'}
        />
        <text x="364" y={52 + i * 30} fontSize="10.5" fill="var(--text-primary)" fontFamily="monospace">
          {r.label}
        </text>
      </g>
    ))}

    <path d="M348 48 H 260 L 152 48" fill="none" stroke="var(--olive-deep)" strokeWidth="1.3" markerEnd="url(#kl-arrow)" />
    <path d="M348 78 C 260 78, 240 50, 152 48" fill="none" stroke="var(--olive-deep)" strokeWidth="1.3" markerEnd="url(#kl-arrow)" />
    <path d="M348 108 C 260 108, 240 110, 152 108" fill="none" stroke="var(--olive-deep)" strokeWidth="1.3" markerEnd="url(#kl-arrow)" />
    <path d="M348 138 H 230" fill="none" stroke="var(--rose-deep)" strokeWidth="1.4" strokeDasharray="5 3" markerEnd="url(#kl-bad)" />
    <text x="228" y="134" textAnchor="end" fontSize="9" fontWeight="700" fill="var(--rose-deep)">
      no user 9 → INSERT rejected
    </text>

    <text x="280" y="180" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      that rejection is referential integrity — the database refuses to hold an orphan row
    </text>
  </svg>
);

/** A view is a saved query, not stored rows. */
export const ViewDiagram: React.FC = () => (
  <svg
    viewBox="0 0 540 160"
    role="img"
    aria-label="A view stores only a query definition; selecting from it re-runs that query against the base tables"
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <defs>
      <marker id="vw-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-muted)" />
      </marker>
    </defs>

    <rect x="8" y="34" width="118" height="34" rx="7" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.3" />
    <text x="67" y="56" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      users
    </text>
    <rect x="8" y="92" width="118" height="34" rx="7" fill="var(--rose-tint)" stroke="var(--rose)" strokeWidth="1.3" />
    <text x="67" y="114" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      orders
    </text>
    <text x="67" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-muted)" letterSpacing="0.05em">
      BASE TABLES (real rows)
    </text>

    <line x1="130" y1="52" x2="184" y2="72" stroke="var(--text-muted)" strokeWidth="1.4" markerEnd="url(#vw-arrow)" />
    <line x1="130" y1="108" x2="184" y2="88" stroke="var(--text-muted)" strokeWidth="1.4" markerEnd="url(#vw-arrow)" />

    <rect x="192" y="46" width="164" height="66" rx="9" fill="var(--honey-tint)" stroke="var(--honey)" strokeWidth="1.5" strokeDasharray="6 3" />
    <text x="274" y="68" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
      customer_totals
    </text>
    <text x="274" y="84" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      stores a SELECT,
    </text>
    <text x="274" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
      not a single row
    </text>
    <text x="274" y="32" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--honey-deep)" letterSpacing="0.05em">
      VIEW (virtual)
    </text>

    <line x1="360" y1="79" x2="410" y2="79" stroke="var(--text-muted)" strokeWidth="1.4" markerEnd="url(#vw-arrow)" />
    <rect x="416" y="52" width="116" height="54" rx="9" fill="var(--olive-tint)" stroke="var(--olive)" strokeWidth="1.4" />
    <text x="474" y="74" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">
      SELECT * FROM
    </text>
    <text x="474" y="88" textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">
      customer_totals
    </text>

    <text x="270" y="148" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">
      every read re-runs the underlying query, so a view is always current — and never faster on its own
    </text>
  </svg>
);
