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
