// Reads the signed-in user out of localStorage.
//
// The login form and the scholarship claim both write the same `user` object
// under the same key, so this is the one place that knows what kind of session
// is in play. It is intentionally tolerant: a missing or corrupt value is an
// anonymous session, never a thrown error mid-render.

export interface SessionUser {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

export function getSessionUser(): SessionUser {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}') as SessionUser;
  } catch {
    return {};
  }
}

export function getRole(): string {
  return getSessionUser().role ?? '';
}

// A scholarship applicant holds a real session — the assessment engine needs a
// user id to key an attempt to — but they are not a student. The session exists
// to sit one test and nothing else; it must not open the course portal. See the
// gate in App.tsx.
export function isApplicantSession(): boolean {
  return getRole() === 'applicant';
}

// A hiring candidate is in the same position: a session that exists to sit
// the one company test they were emailed, confined to it by App.tsx.
export function isCandidateSession(): boolean {
  return getRole() === 'candidate';
}

// Scholarship and certification candidates share the 'applicant' role, so the
// role alone cannot say which hand-off started the session. The claim records
// it here, and App.tsx uses it to pick the right session notice.
export type Handoff = 'scholarship' | 'certification' | 'hiring';

export function setHandoff(kind: string): void {
  localStorage.setItem('handoff', kind);
}

export function getHandoff(): string {
  return localStorage.getItem('handoff') ?? '';
}

/**
 * Stores a new session: the login form and the scholarship, hiring and
 * certification hand-offs all start one this way.
 */
export function setSession(token: string, user: SessionUser): void {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
}

/** Forgets the session. Learner data is cleared separately (lib/learnerData). */
export function clearSession(): void {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('handoff');
}
