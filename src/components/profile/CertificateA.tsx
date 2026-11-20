import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * Knovate certificate, design A ("Classic"): an A4-landscape page, drawn at
 * 1123×794 CSS px (A4 at 96 dpi) and scaled to fit its container, so the
 * preview, the full view and the printed page are the same drawing.
 *
 * The same file lives in knovate-web and skillofied-app — change both.
 */
export interface CertificateAProps {
  holderName: string;
  title: string;
  /** 0 hides the score. */
  scorePercent?: number;
  /** A date string the page formats, e.g. "2026-11-18". */
  issuedAt: string;
  credentialId: string;
  /** Shown under the credential ID; defaults to knovate.com/verify. */
  verifyLabel?: string;
  revoked?: boolean;
  /** 'exam' (passed a certification exam) or 'course' (completed a course). */
  kind?: 'exam' | 'course';
  /** Fixed width in px; omit to fill the container. */
  width?: number;
  className?: string;
}

export const CERT_W = 1123;
export const CERT_H = 794;

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Poppins:wght@700&family=Inter:wght@400;500;600&display=swap';

function useCertFonts() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById('knv-cert-fonts')) return;
    const l = document.createElement('link');
    l.id = 'knv-cert-fonts';
    l.rel = 'stylesheet';
    l.href = FONT_HREF;
    document.head.appendChild(l);
  }, []);
}

function formatDate(s: string): string {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const INK = '#2b2620';
const MUTED = '#6c6455';
const RULE = '#e0cba8';
const SERIF = "Fraunces, Georgia, 'Times New Roman', serif";

const CertificateA: React.FC<CertificateAProps> = ({
  holderName, title, scorePercent = 0, issuedAt, credentialId,
  verifyLabel = 'knovate.com/verify', revoked = false, kind = 'exam', width, className,
}) => {
  useCertFonts();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (n: string) => `${n}${uid}`;
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(width ?? 0);

  useEffect(() => {
    if (width || !wrap.current) return;
    const el = wrap.current;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, [width]);

  const scale = (width ?? w) / CERT_W || 0;
  const k = (
    <>
      <polygon points="28,44 56,54 28,80" fill={`url(#${g('a')})`} />
      <polygon points="28,104 28,92 88,42 112,42 40,108 32,108" fill={`url(#${g('b')})`} />
      <polygon points="60,80 72,69 104,108 80,108" fill={`url(#${g('c')})`} />
    </>
  );

  return (
    <div
      ref={wrap}
      className={className}
      style={{ width: width ?? '100%', aspectRatio: `${CERT_W} / ${CERT_H}`, position: 'relative', overflow: 'hidden' }}
    >
      <div
        className="knv-cert-page"
        style={{
          width: CERT_W, height: CERT_H, transform: `scale(${scale})`, transformOrigin: '0 0',
          position: 'absolute', top: 0, left: 0, boxSizing: 'border-box', padding: 28,
          background: '#f7f3ec', color: INK, fontFamily: "Inter, system-ui, sans-serif",
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id={g('a')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e0a85a" /><stop offset="1" stopColor="#c98a3a" /></linearGradient>
            <linearGradient id={g('b')} x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#b5701f" /><stop offset=".5" stopColor="#c98a3a" /><stop offset="1" stopColor="#e6b46c" /></linearGradient>
            <linearGradient id={g('c')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a5a12" /><stop offset="1" stopColor="#b5701f" /></linearGradient>
            <linearGradient id={g('s')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b5701f" /><stop offset="1" stopColor="#e6b46c" /></linearGradient>
          </defs>
        </svg>
        <div style={{ height: '100%', boxSizing: 'border-box', border: '2px solid #c98a3a', padding: 8 }}>
          <div style={{
            height: '100%', boxSizing: 'border-box', border: `1px solid ${RULE}`, background: '#fffdf9',
            padding: '44px 72px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative',
          }}>
            {revoked && (
              <div style={{ position: 'absolute', top: 28, right: 28, padding: '6px 14px', borderRadius: 999, background: '#fbecea', color: '#c0492f', fontSize: 13, fontWeight: 700, letterSpacing: '.08em' }}>
                REVOKED
              </div>
            )}
            <svg width="200" height="58" viewBox="8 -2 452 132" role="img" aria-label="Knovate">
              <polygon points="14,14 56,0 98,14 56,28" fill={INK} />
              <polygon points="34,21 56,28 78,21 78,30 56,37 34,30" fill={INK} />
              <line x1="20" y1="16" x2="20" y2="40" stroke={INK} strokeWidth="2.5" />
              <rect x="17" y="38" width="6" height="10" rx="1.5" fill={INK} />
              {k}
              <text x="106" y="106" fontFamily="Poppins, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="92" fontWeight="700" letterSpacing="-2" fill={INK}>novate</text>
              <path d="M150 126 Q290 100 446 114" fill="none" stroke={`url(#${g('s')})`} strokeWidth="5" strokeLinecap="round" />
            </svg>

            <div style={{ marginTop: 26, fontSize: 13, fontWeight: 600, letterSpacing: '.32em', color: '#b5701f' }}>{kind === 'course' ? 'CERTIFICATE OF COMPLETION' : 'CERTIFICATE OF ACHIEVEMENT'}</div>
            <div style={{ marginTop: 22, fontSize: 15, color: MUTED }}>This certifies that</div>
            <div style={{ marginTop: 6, fontFamily: SERIF, fontSize: holderName.length > 26 ? 46 : 58, fontWeight: 500, lineHeight: 1.1, maxWidth: 900, overflowWrap: 'anywhere' }}>{holderName}</div>
            <div style={{ width: 360, height: 1, background: RULE, marginTop: 10 }} />
            <div style={{ marginTop: 18, fontSize: 15, color: MUTED }}>{kind === 'course' ? 'has successfully completed the Knovate course' : 'has passed the proctored Knovate certification exam in'}</div>
            <div style={{ marginTop: 8, fontFamily: SERIF, fontSize: title.length > 40 ? 24 : 30, fontWeight: 700, maxWidth: 900 }}>{title}</div>
            <div style={{ marginTop: 12, display: 'flex', gap: 10, fontSize: 14, color: MUTED }}>
              {kind === 'exam' && scorePercent > 0 && (<><span>Score <strong style={{ color: INK }}>{Math.round(scorePercent)}%</strong></span><span>·</span></>)}
              <span>Issued <strong style={{ color: INK }}>{formatDate(issuedAt)}</strong></span>
            </div>

            <div style={{ flexGrow: 1 }} />

            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', alignItems: 'end', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: INK, minHeight: 28 }}>Knovate</div>
                <div style={{ width: 200, height: 1, background: INK }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>Knovate Certification Board</div>
                <div style={{ fontSize: 12, color: MUTED }}>Issued digitally by Knovate</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="Knovate certified seal">
                  <polygon points="64,4 116,34 116,94 64,124 12,94 12,34" fill="#fffdf9" stroke="#c98a3a" strokeWidth="4" />
                  <polygon points="64,14 107,39 107,89 64,114 21,89 21,39" fill="none" stroke={RULE} strokeWidth="1.5" />
                  <g transform="translate(30 30) scale(0.56)">{k}<polygon points="14,14 56,0 98,14 56,28" fill={INK} /></g>
                  <text x="64" y="104" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2" fill="#8a5a12">{kind === 'course' ? 'COMPLETED' : 'CERTIFIED'}</text>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 12, color: MUTED }}>Credential ID</div>
                <div style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 16, fontWeight: 600, letterSpacing: '.06em' }}>{credentialId}</div>
                <div style={{ fontSize: 12, color: MUTED }}>Verify at <span style={{ color: '#8a5a12', fontWeight: 600 }}>{verifyLabel}</span></div>
              </div>
            </div>
            <div style={{ marginTop: 22, fontSize: 12, fontStyle: 'italic', color: '#8a8072' }}>
              We don&apos;t just teach skills — we empower people to create the future.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateA;
