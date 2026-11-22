import React from 'react';

import { claimScholarshipApi } from '../../api';
import TokenClaimEntry from '../handoff/TokenClaimEntry';
import styles from './Scholarship.module.css';

interface Props {
  /** Lets App know a session now exists, without navigating anywhere itself. */
  onSession: () => void;
}

/** The landing point for a scholarship link: /scholarship/start?t=… (see TokenClaimEntry). */
const ScholarshipEntry: React.FC<Props> = ({ onSession }) => (
  <TokenClaimEntry
    claim={claimScholarshipApi}
    invitePrefix="scholarship"
    instructionsPath={(id) => `/scholarship/instructions/${id}`}
    onSession={onSession}
    copy={{
      eyebrow: 'Scholarship',
      linkSource: 'your email',
      noun: 'test',
      help: (
        <>
          <p className={styles.footnote}>
            Links expire three days after you apply. Applying again with the same email address
            sends a fresh one — you will not lose your place.
          </p>
          {/* No "sign in" here: a scholarship applicant has no password to sign
              in with — the link was their only way in. Offering a login sends
              them to a form they can never complete. There is nothing more for
              them to do on this page, so we say so plainly. */}
          <p className={styles.footnote}>You can close this tab now.</p>
        </>
      ),
    }}
  />
);

export default ScholarshipEntry;
