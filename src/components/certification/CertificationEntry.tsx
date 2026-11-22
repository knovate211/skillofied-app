import React from 'react';

import { claimCertificationApi } from '../../api';
import TokenClaimEntry from '../handoff/TokenClaimEntry';
import styles from '../scholarship/Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/**
 * Where a certification exam link lands: /certification/start?t=…
 *
 * Same shape as the scholarship and hiring entries (see TokenClaimEntry), with
 * one difference that matters: this candidate has paid. So a failure here is
 * never a dead end. Every message points at a way to get the exam back, because
 * the alternative is somebody who is out of pocket and out of options.
 */
const CertificationEntry: React.FC<Props> = ({ onSession }) => (
  <TokenClaimEntry
    claim={claimCertificationApi}
    invitePrefix="certification"
    instructionsPath={(id) => `/certification/instructions/${id}`}
    onSession={onSession}
    copy={{
      eyebrow: 'Certification',
      linkSource: 'your confirmation email',
      noun: 'exam',
      help: (
        <p className={styles.footnote}>
          Your registration is safe. Email us and we will send a fresh link — you have not lost
          the exam you paid for.
        </p>
      ),
    }}
  />
);

export default CertificationEntry;
