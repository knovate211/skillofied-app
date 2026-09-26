import React, { useState, useEffect } from 'react';
import styles from './CertificateSection.module.css';
import { getCertificatesApi, type CertificateRecord } from '../../api';

const CertificateSection: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);

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
            View, download, and share the certificates you've earned from completing Knovate courses.
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
              <div className={styles.certPreview}>
                {/* A revoked credential still shows, labelled: quietly hiding
                    one leaves the holder wondering where it went. */}
                <div className={styles.certRibbon}>{cert.revoked ? 'Revoked' : 'Verified'}</div>
                <svg className={styles.certPreviewIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.certContent}>
                <div className={styles.certCourse}>{cert.title}</div>
                <div className={styles.certMeta}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Issued</span>
                    <span className={styles.metaValue}>{cert.issuedAt}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Credential ID</span>
                    <span className={styles.metaValue}>{cert.credentialId}</span>
                  </div>
                  {cert.scorePercent > 0 && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Score</span>
                      <span className={styles.metaValue}>{cert.scorePercent}%</span>
                    </div>
                  )}
                </div>
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
                  <a href={`${cert.verifyUrl}?print=1`} target="_blank" rel="noreferrer" className={styles.btnDownload} title="Open a printable certificate">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateSection;
