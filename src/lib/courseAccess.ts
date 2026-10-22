// Which course pages a learner may open, derived from getMyCourses.
//
// The sidebar uses this to lock its links and App.tsx uses it to guard the
// course routes, so typing a URL cannot open a course the sidebar shows as
// locked. Keep the two in step by changing the rules only here.

interface EnrolledCourse {
  title: string;
}

export function getUnlockedCoursePaths(enrolledCourses: EnrolledCourse[]): Set<string> {
  const has = (match: (title: string) => boolean) => enrolledCourses.some(c => match(c.title));

  const golang = has(t => t.includes('Golang'));
  // Full Stack is an entitlement rather than a course of its own: it unlocks
  // GenAI, Front-End, Java and SQL, which is where the curriculum lives.
  const fullStack = has(t => t.includes('Full Stack') || t.includes('Fullstack'));
  const genAI = has(t => t.includes('GenAI') || t.includes('Generative AI')) || fullStack;
  const frontend = has(t => t === 'Front-End Technologies') || fullStack;
  const java = has(t => t === 'Java Development' || t === 'Java') || fullStack;
  const sql = has(t => t === 'Mastering SQL') || fullStack;
  const marketing = has(t => t === 'SEO Fundamentals' || t === 'Digital Marketing Strategy');
  const testing = has(t => t.toLowerCase().includes('testing'));

  // Computer Science Core is self-paced: no separate enrolment, no schedule, no
  // mentor. It opens for anyone on a development track — the fundamentals under
  // every one of those courses — and stays shut for the marketing and QA tracks,
  // where it is not part of what the student signed up to learn.
  const development = fullStack || frontend || java || sql || golang || genAI;

  const unlocked: [string, boolean][] = [
    ['/courses/golang', golang],
    ['/courses/genai', genAI],
    ['/courses/fullstack', fullStack],
    ['/courses/frontend', frontend],
    ['/courses/java', java],
    ['/courses/sql', sql],
    ['/courses/os', development],
    ['/courses/networking', development],
    ['/courses/seo', marketing],
    ['/courses/digital-marketing', marketing],
    ['/courses/testing', testing],
  ];
  return new Set(unlocked.filter(([, ok]) => ok).map(([path]) => path));
}
