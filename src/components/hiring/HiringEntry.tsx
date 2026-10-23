import React from 'react';

import { claimHiringApi } from '../../api';
import TokenClaimEntry from '../handoff/TokenClaimEntry';
import styles from '../scholarship/Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/**
 * Where a hiring invitation lands: /hiring/start?t=…
 *
 * The hiring team added this candidate and the invitation email carried a
 * personal link (see TokenClaimEntry). The company's name is kept for the
 * instructions screen.
 */
const HiringEntry: React.FC<Props> = ({ onSession }) => (
  <TokenClaimEntry
    claim={claimHiringApi}
    invitePrefix="hiring"
    instructionsPath={(id) => `/hiring/instructions/${id}`}
    onSession={onSession}
    onClaimed={(res) => sessionStorage.setItem('hiring.company', res.companyName)}
    copy={{
      eyebrow: 'Online assessment',
      linkSource: 'your invitation email',
      noun: 'test',
      help: (
        <>
          <p className={styles.footnote}>
            Test links are personal and expire after a few days. If yours has expired, reply to your
            invitation email and ask the hiring team to send a new one.
          </p>
          <p className={styles.footnote}>You can close this tab now.</p>
        </>
      ),
    }}
  />
);

export default HiringEntry;
