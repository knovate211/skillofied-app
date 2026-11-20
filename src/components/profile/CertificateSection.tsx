import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CertificateA from './CertificateA';
import styles from './CertificateSection.module.css';
import { getCertificatesApi, type CertificateRecord } from '../../api';

const CertificateSection: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<CertificateRecord | null>(null);

  // Download = the browser's "Save as PDF" on a page holding only the certificate.
  const printCert = () => {
    document.body.classList.add('knv-printing');
    const done = () => { document.body.classList.remove('knv-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
  };

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setViewing(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewing]);

  useEffect(() => {
    getCertificatesApi()
      .then((data) => setCertificates(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.headerCard}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>My Certificates</h2>
          <p className={styles.subtitle}>
            View, download, and share the certificates you've earned — course completion and certification exams.
          </p>
        </div>
        <div className={styles.badgeWrap}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading your certificates...
        </div>
      ) : certificates.length === 0 ? (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M9 16l2 2 4-4" />
          </svg>
          <div className={styles.emptyTitle}>No Certificates Yet</div>
          <div className={styles.emptyDesc}>
            Pass a Knovate certification exam and your certificate appears here, with a link an
            employer can use to verify it.
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {certificates.map((cert) => (
            <div key={cert.credentialId} className={styles.certCard}>
              <button type="button" className={styles.certThumb} onClick={() => setViewing(cert)} aria-label={`Open certificate for ${cert.title}`}>
                <CertificateA holderName={cert.holderName || 'Knovate learner'} title={cert.title}
                  scorePercent={cert.scorePercent} issuedAt={cert.issuedAt} credentialId={cert.credentialId} revoked={cert.revoked} kind={cert.source === 'course' ? 'course' : 'exam'} />
              </button>
              <div className={styles.certContent}>
                <div className={styles.certActions}>
                  {/* The verification page is the certificate's public face —
                      it is what an employer is given, so it is what a holder
                      needs to hand over. */}
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className={styles.btnView} title="Open the public verification page">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Verify
                  </a>
                  <button type="button" onClick={() => { setViewing(cert); setTimeout(printCert, 400); }} className={styles.btnDownload} title="Download the certificate as a PDF">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {viewing && createPortal(
        <div className={styles.viewer} role="dialog" aria-modal="true" aria-label="Certificate" onClick={() => setViewing(null)}>
          <div className={styles.viewerBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.viewerBar}>
              <strong>{viewing.title}</strong>
              <span style={{ flex: 1 }} />
              <a href={viewing.verifyUrl} target="_blank" rel="noreferrer" className={styles.btnView}>Verify page</a>
              <a className={styles.btnView} target="_blank" rel="noreferrer"
                href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(viewing.title)}&organizationName=Knovate&certId=${encodeURIComponent(viewing.credentialId)}&certUrl=${encodeURIComponent(viewing.verifyUrl)}`}>
                Add to LinkedIn
              </a>
              {!viewing.revoked && <button type="button" className={styles.btnDownload} onClick={printCert}>Download PDF</button>}
              <button type="button" className={styles.viewerClose} onClick={() => setViewing(null)} aria-label="Close">×</button>
            </div>
            <div className="knv-print-root">
              <CertificateA holderName={viewing.holderName || 'Knovate learner'} title={viewing.title}
                scorePercent={viewing.scorePercent} issuedAt={viewing.issuedAt} credentialId={viewing.credentialId} revoked={viewing.revoked} kind={viewing.source === 'course' ? 'course' : 'exam'} />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default CertificateSection;
