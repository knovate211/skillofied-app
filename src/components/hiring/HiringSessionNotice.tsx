import React from 'react';

import HandoffSessionNotice from '../handoff/HandoffSessionNotice';

/**
 * Where a hiring candidate lands if they wander outside their test. Their
 * session exists only to sit the company's assessment, so there is no student
 * portal to show them.
 */
const HiringSessionNotice: React.FC = () => (
  <HandoffSessionNotice
    eyebrow="Online assessment"
    title="You're signed in for your test"
    lede="This sign-in is only for the assessment you were invited to. To open it again, use the link in your invitation email."
    footnote="If you have already submitted, you are all done — the hiring team will contact you about the next steps."
    signOut
  />
);

export default HiringSessionNotice;
