import React from 'react';

import HandoffSessionNotice from '../handoff/HandoffSessionNotice';

/**
 * Where a certification candidate lands if they wander off their exam.
 *
 * Their session exists to sit one paid exam; it is not a course account. The
 * copy says what they hold and what happens next, rather than offering a sign-in
 * they cannot complete — they have no password.
 */
const CertificationSessionNotice: React.FC = () => (
  <HandoffSessionNotice
    eyebrow="Certification"
    title="This session is for your exam"
    lede="Your link signs you in for the certification exam you registered for, and nothing else. Use the link in your confirmation email to go back to it."
    footnote="Pass, and your certificate is issued immediately — along with a link an employer can use to verify it."
  />
);

export default CertificationSessionNotice;
