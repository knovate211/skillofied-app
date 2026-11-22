// Checks for the profile edit forms. Each returns the problems with one
// section's draft, worded for the learner; an empty list means it can be saved.
// The forms mark these fields required; until now nothing enforced it.

const blank = (v: string | undefined) => !v || !v.trim();

const missing = (fields: [string, string | undefined][]) =>
  fields.filter(([, v]) => blank(v)).map(([label]) => label);

/** An http(s) URL on `host` or one of its subdomains. */
export function isProfileUrl(value: string, host: string): boolean {
  try {
    const u = new URL(value.trim());
    return (u.protocol === 'https:' || u.protocol === 'http:') &&
      (u.hostname === host || u.hostname.endsWith('.' + host)) &&
      u.pathname.replace(/\/+$/, '').length > 1;
  } catch {
    return false;
  }
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function yearProblem(label: string, v: string): string | null {
  const y = Number(v.trim());
  const max = new Date().getFullYear() + 6;
  return /^\d{4}$/.test(v.trim()) && y >= 1950 && y <= max ? null : `${label} should be a year between 1950 and ${max}.`;
}

function rangeProblem(label: string, v: string, max: number): string | null {
  const n = Number(v.trim());
  return v.trim() !== '' && Number.isFinite(n) && n >= 0 && n <= max ? null : `${label} should be a number from 0 to ${max}.`;
}

function withRequired(required: string[], formatProblems: (string | null)[]): string[] {
  const out: string[] = [];
  if (required.length) out.push(`Please fill in: ${required.join(', ')}.`);
  for (const p of formatProblems) if (p) out.push(p);
  return out;
}

export function validatePersonal(d: { name: string; email: string; gender: string; dob: string; experience: string }): string[] {
  const req = missing([['Full Name', d.name], ['Email Address', d.email], ['Gender', d.gender], ['Date of Birth', d.dob], ['Work Experience', d.experience]]);
  return withRequired(req, [
    !blank(d.email) && !isEmail(d.email) ? 'Email Address does not look like an email address.' : null,
    !blank(d.dob) && new Date(d.dob) > new Date() ? 'Date of Birth cannot be in the future.' : null,
  ]);
}

export function validateGeneric(d: {
  workExperience: string; careerGap: string; currentState: string; currentCity: string;
  preferredLocations: string[]; githubLink: string; linkedinLink: string; isWorkingPro: string;
}): string[] {
  const req = missing([
    ['Work Experience', d.workExperience], ['Career gap', d.careerGap], ['Current State', d.currentState],
    ['Current City', d.currentCity], ['Github Link', d.githubLink], ['Linkedin Link', d.linkedinLink],
    ['Are you working professional?', d.isWorkingPro],
  ]);
  if (!d.preferredLocations.length) req.splice(4, 0, 'Preferred Location (type a city and press Enter)');
  return withRequired(req, [
    !blank(d.githubLink) && !isProfileUrl(d.githubLink, 'github.com') ? 'Github Link should be your profile address, like https://github.com/username.' : null,
    !blank(d.linkedinLink) && !isProfileUrl(d.linkedinLink, 'linkedin.com') ? 'Linkedin Link should be your profile address, like https://linkedin.com/in/username.' : null,
  ]);
}

export function validateSchool(d: { schoolName: string; yearOfPassout: string; marksPercent: string }, nameLabel: string): string[] {
  const req = missing([[nameLabel, d.schoolName], ['Year of Passout', d.yearOfPassout], ['Marks in %', d.marksPercent]]);
  return withRequired(req, [
    !blank(d.yearOfPassout) ? yearProblem('Year of Passout', d.yearOfPassout) : null,
    !blank(d.marksPercent) ? rangeProblem('Marks in %', d.marksPercent, 100) : null,
  ]);
}

export function validateUG(d: {
  universityRollNo: string; collegeName: string; courseName: string; branch: string;
  yearOfPassout: string; marksPercent: string; cgpa: string;
}): string[] {
  const req = missing([
    ['University Roll No.', d.universityRollNo], ['College Name', d.collegeName], ['Course Name', d.courseName],
    ['Branch', d.branch], ['Year of Passout', d.yearOfPassout], ['Marks in %', d.marksPercent],
  ]);
  return withRequired(req, [
    !blank(d.yearOfPassout) ? yearProblem('Year of Passout', d.yearOfPassout) : null,
    !blank(d.marksPercent) ? rangeProblem('Marks in %', d.marksPercent, 100) : null,
    !blank(d.cgpa) ? rangeProblem('CGPA', d.cgpa, 10) : null,
  ]);
}
