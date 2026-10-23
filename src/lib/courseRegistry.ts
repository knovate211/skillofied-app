// Every course the app knows, in one place.
//
// The course page route, its progress key and length, its sidebar entry, its
// card icon, which enrolments unlock it and which dashboard row it sits in used
// to be restated in half a dozen files, each matching course titles its own way.
// They drifted: SEO and Digital Marketing were counted as 27 lessons on the
// dashboard (they have 42 and 47), and GenAI's progress was never shown at all.

export type CourseKey =
  | 'golang' | 'genai' | 'fullstack' | 'frontend' | 'java' | 'sql'
  | 'os' | 'networking' | 'seo' | 'digital-marketing' | 'testing';

export type CourseCategory = 'Development' | 'Computer Science Core' | 'Marketing' | 'QA & Testing';

/** Which card icon a course shows (see CourseCard). */
export type CourseIcon = 'database' | 'lines' | 'cup' | 'sparkle' | 'monitor' | 'network' | 'check' | 'megaphone' | 'code';

export interface CourseInfo {
  key: CourseKey;
  /** Title in the syllabus drawer. */
  title: string;
  path: string;
  /** localStorage / course-progress key the course page records progress under. */
  storageKey: string;
  /**
   * Items in the course's syllabus, for the dashboard's percentage. The course
   * page knows the real number and warns in development if this drifts.
   */
  totalItems: number;
  category: CourseCategory;
  sidebarIcon: string;
  cardIcon: CourseIcon;
  /** False for an entitlement that is not a course of its own (Full Stack). */
  inSidebar: boolean;
  /**
   * Titles getMyCourses returns for this course, plus older ones still in use.
   * Compared case-insensitively.
   */
  apiTitles: string[];
  /**
   * Looser fallback for titles not listed above: a title containing any of
   * these (case-insensitive) also means this course. Kept for the courses whose
   * access rule always matched loosely, so a renamed programme keeps working.
   */
  titleKeywords?: string[];
  /**
   * What unlocks the course: owning any of these courses, or — for the
   * self-paced Computer Science Core — being on any development course.
   */
  unlockedBy: CourseKey[] | 'any-development';
}

/** In sidebar order. */
export const COURSES: CourseInfo[] = [
  {
    key: 'golang', title: 'Golang Engineering', path: '/courses/golang', storageKey: 'maxGolangIndexRead', totalItems: 179,
    category: 'Development', sidebarIcon: '🐹', cardIcon: 'code', inSidebar: true,
    apiTitles: ['Golang Engineering'], titleKeywords: ['golang'], unlockedBy: ['golang'],
  },
  {
    key: 'genai', title: 'GenAI & Forward Deployed Engineering', path: '/courses/genai', storageKey: 'maxGenAIIndexRead', totalItems: 110,
    category: 'Development', sidebarIcon: '🤖', cardIcon: 'sparkle', inSidebar: true,
    apiTitles: ['GenAI & Forward Deployed Engineering', 'GenAI Engineering'], titleKeywords: ['genai', 'generative ai'],
    unlockedBy: ['genai', 'fullstack'],
  },
  // Full Stack is an entitlement rather than a course of its own: it unlocks
  // GenAI, Front-End, Java and SQL, which is where the curriculum lives. It is
  // deliberately not listed in the sidebar.
  {
    key: 'fullstack', title: 'Full Stack Engineering', path: '/courses/fullstack', storageKey: 'maxFullStackIndexRead', totalItems: 7,
    category: 'Development', sidebarIcon: '🧩', cardIcon: 'code', inSidebar: false,
    apiTitles: ['Full Stack Engineering'], titleKeywords: ['full stack', 'fullstack'], unlockedBy: ['fullstack'],
  },
  {
    key: 'frontend', title: 'Front-End Technologies', path: '/courses/frontend', storageKey: 'maxIndexRead', totalItems: 201,
    category: 'Development', sidebarIcon: '🎨', cardIcon: 'lines', inSidebar: true,
    apiTitles: ['Front-End Technologies'], unlockedBy: ['frontend', 'fullstack'],
  },
  {
    key: 'java', title: 'Java Development', path: '/courses/java', storageKey: 'maxJavaIndexRead', totalItems: 210,
    category: 'Development', sidebarIcon: '☕', cardIcon: 'cup', inSidebar: true,
    apiTitles: ['Java Development', 'Java'], unlockedBy: ['java', 'fullstack'],
  },
  {
    key: 'sql', title: 'Mastering SQL', path: '/courses/sql', storageKey: 'maxSqlIndexRead', totalItems: 91,
    category: 'Development', sidebarIcon: '💾', cardIcon: 'database', inSidebar: true,
    apiTitles: ['Mastering SQL'], unlockedBy: ['sql', 'fullstack'],
  },
  // Computer Science Core is self-paced: no separate enrolment, no schedule, no
  // mentor. It opens for anyone on a development track and stays shut for the
  // marketing and QA tracks, where it is not part of what the student signed up for.
  {
    key: 'os', title: 'Operating Systems', path: '/courses/os', storageKey: 'maxOsIndexRead', totalItems: 107,
    category: 'Computer Science Core', sidebarIcon: '💽', cardIcon: 'monitor', inSidebar: true,
    apiTitles: ['Operating Systems'], unlockedBy: 'any-development',
  },
  {
    key: 'networking', title: 'Computer Networks', path: '/courses/networking', storageKey: 'maxNetworkingIndexRead', totalItems: 105,
    category: 'Computer Science Core', sidebarIcon: '🌐', cardIcon: 'network', inSidebar: true,
    apiTitles: ['Computer Networks'], unlockedBy: 'any-development',
  },
  // Either marketing enrolment opens both marketing courses.
  {
    key: 'seo', title: 'SEO Fundamentals', path: '/courses/seo', storageKey: 'maxSeoIndexRead', totalItems: 42,
    category: 'Marketing', sidebarIcon: '🔍', cardIcon: 'megaphone', inSidebar: true,
    apiTitles: ['SEO Fundamentals'], unlockedBy: ['seo', 'digital-marketing'],
  },
  {
    key: 'digital-marketing', title: 'Digital Marketing Strategy', path: '/courses/digital-marketing', storageKey: 'maxDigitalMarketingIndexRead', totalItems: 47,
    category: 'Marketing', sidebarIcon: '📈', cardIcon: 'megaphone', inSidebar: true,
    apiTitles: ['Digital Marketing Strategy'], unlockedBy: ['seo', 'digital-marketing'],
  },
  {
    key: 'testing', title: 'Software Testing', path: '/courses/testing', storageKey: 'maxTestingIndexRead', totalItems: 168,
    category: 'QA & Testing', sidebarIcon: '🧪', cardIcon: 'check', inSidebar: true,
    apiTitles: ['Software Testing'], titleKeywords: ['testing'], unlockedBy: ['testing'],
  },
];

const byTitle = new Map<string, CourseInfo>();
for (const c of COURSES) for (const t of c.apiTitles) byTitle.set(t.toLowerCase(), c);

/** The course an enrolment title refers to, if the app has a page for it. */
export function courseForTitle(title: string): CourseInfo | undefined {
  const t = title.trim().toLowerCase();
  return byTitle.get(t) ?? COURSES.find((c) => c.titleKeywords?.some((k) => t.includes(k)));
}

export function courseForStorageKey(storageKey: string): CourseInfo | undefined {
  return COURSES.find((c) => c.storageKey === storageKey);
}

/** Courses the learner owns outright, from their enrolment titles. */
export function ownedCourseKeys(enrolledCourses: { title: string }[]): Set<CourseKey> {
  const owned = new Set<CourseKey>();
  for (const e of enrolledCourses) {
    const c = courseForTitle(e.title);
    if (c) owned.add(c.key);
  }
  return owned;
}

/** Whether the learner is on a development track (which opens Computer Science Core). */
export function isDevelopmentLearner(owned: Set<CourseKey>): boolean {
  return COURSES.some((c) => c.category === 'Development' && owned.has(c.key));
}

export function isUnlocked(course: CourseInfo, owned: Set<CourseKey>): boolean {
  if (course.unlockedBy === 'any-development') return isDevelopmentLearner(owned);
  return course.unlockedBy.some((k) => owned.has(k));
}
