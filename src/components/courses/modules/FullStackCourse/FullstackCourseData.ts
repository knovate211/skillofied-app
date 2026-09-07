import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  codeExample?: string;
  codeOutput?: string;
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    /** Every task is an IDE task — see the Frontend course's assignments.ts. */
    prompts: AssignmentQuestion[];
  };
}

export const FULLSTACK_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: FRONTEND FOUNDATIONS & REACT',
    overview: 'Learn semantic HTML layouts, CSS Flexbox/Grid structures, vanilla JS control structures, and React states.',
    outcomes: [
      'Understand responsive client layout designs.',
      'Deploy single-page reactive components using functional state hooks.'
    ],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Web Fundamentals & HTML',
        objectives: ['Learn basic semantic document hierarchies.'],
        theory: 'Semantic HTML markup tags structure standard body content layout for accessibility and correct search engine indexing.',
        takeaways: ['Always prefer semantic tags over simple divs where appropriate.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which tag is semantic?', options: ['article', 'div', 'span', 'b'], correctAnswer: 'article' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build the profile page structure with semantic elements only — no div where a real element exists. It needs a banner with the name and role, a nav, a main with an about section and a projects list, and a contentinfo footer. Every image needs alt text and the heading levels must not skip.',
          language: 'html',
          runnable: false,
          starterCode: `<body>
  <!-- TODO: banner with an h1 (name) and the role -->

  <!-- TODO: nav with in-page links to #about and #projects -->

  <!-- TODO: main
       - section#about with an h2 and a paragraph
       - section#projects with an h2 and a list of three projects,
         each with a title, one line of description and a link -->

  <!-- TODO: footer -->
</body>`,
        },
        {
          kind: 'code',
          prompt: 'Style the profile page. The layout is a centred column capped at 720px, the project list is a responsive grid that needs no media query, and the whole palette comes from custom properties so a dark theme is a token swap rather than a rewrite.',
          language: 'css',
          runnable: false,
          starterCode: `:root {
  /* TODO: colour, spacing and radius tokens */
}

body {
  /* TODO: centred column, max-width 720px, readable line length */
}

#projects ul {
  display: grid;
  /* TODO: auto-fit + minmax so columns collapse on their own */
  gap: 16px;
  list-style: none;
  padding: 0;
}

/* TODO: [data-theme="dark"] redefining tokens only */`,
        },
        {
          kind: 'code',
          prompt: 'Write the ProfileCard component. It takes name, role, skills and an optional avatar, destructured in the signature, renders the skills as a keyed list, and falls back to initials when there is no avatar.',
          language: 'jsx',
          runnable: false,
          starterCode: `// TODO: function ProfileCard({ name, role, skills, avatarUrl })
//   - skills render as <li> with a stable key (not the index)
//   - no avatarUrl: render the initials instead of a broken <img>

export default function App() {
  return (
    <ProfileCard
      name="Kavya Rao"
      role="Frontend Engineer"
      skills={['React', 'TypeScript', 'CSS']}
    />
  );
}`,
        },
        {
          kind: 'code',
          prompt: 'The projects come back from the API in the wrong shape and unsorted. Write toProjectList so the component gets exactly what it renders: published projects only, newest first, with the tags lowercased and de-duplicated.',
          language: 'javascript',
          runnable: true,
          starterCode: `const raw = [
  { id: 3, name: 'Portfolio', shipped: '2026-02-11', visible: true, tags: ['React', 'css', 'CSS'] },
  { id: 1, name: 'Draft app', shipped: '2026-04-02', visible: false, tags: ['Go'] },
  { id: 2, name: 'Course player', shipped: '2026-05-30', visible: true, tags: ['React', 'Vite'] },
];

function toProjectList(rows) {
  // TODO: -> [{ id, name, shipped, tags }] — visible only, newest first,
  // tags lowercased with duplicates removed, original order kept within tags.
}

console.log(JSON.stringify(toProjectList(raw)));`,
          examples: [
            {
              input: 'None',
              output: '[{"id":2,"name":"Course player","shipped":"2026-05-30","tags":["react","vite"]},{"id":3,"name":"Portfolio","shipped":"2026-02-11","tags":["react","css"]}]',
              explanation: 'React and css/CSS collapse to two tags, not three.',
            },
          ],
        },
      ]
    }
  },
  m2: {
    id: 'm2',
    title: 'MODULE 2: BACKEND SERVERS & APIS',
    overview: 'Build web services, endpoints routing, and JSON request filters using frameworks.',
    outcomes: [
      'Construct functional REST controllers handling parameters.',
      'Implement JWT token authorization algorithms.'
    ],
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1 API Design Principles',
        objectives: ['Implement clean HTTP verb methods (GET/POST/PUT).'],
        theory: 'Representational State Transfer (REST) maps standard CRUD database actions to distinct clean routing paths.',
        takeaways: ['Use POST for object creation, PUT for updates, and DELETE for removals.']
      }
    ],
    quiz: [
      { id: 1, question: 'Which verb updates resources?', options: ['PUT', 'GET', 'POST', 'DELETE'], correctAnswer: 'PUT' }
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Map the CRUD operations onto the right HTTP verbs and status codes. Implement route() so it returns the handler name and the status a correct REST API would answer with — including 404 for a missing id and 201 with a Location header for a creation.',
          language: 'javascript',
          runnable: true,
          starterCode: `const lessons = new Map([['m1', { id: 'm1', title: 'Intro' }]]);

function route(method, path, body) {
  // TODO: return { handler, status, location } (location only on create).
  //   GET    /lessons       -> list,   200
  //   POST   /lessons       -> create, 201 + location '/lessons/<id>'
  //   GET    /lessons/:id   -> show,   200 or 404
  //   PUT    /lessons/:id   -> update, 200 or 404
  //   DELETE /lessons/:id   -> destroy, 204 or 404
  //   anything else         -> unknown, 405
}

for (const call of [
  ['GET', '/lessons'],
  ['POST', '/lessons', { id: 'm2', title: 'APIs' }],
  ['GET', '/lessons/m1'],
  ['GET', '/lessons/nope'],
  ['DELETE', '/lessons/m1'],
  ['PATCH', '/lessons/m1'],
]) {
  console.log(call[0], call[1], '->', JSON.stringify(route(call[0], call[1], call[2])));
}`,
          examples: [
            {
              input: 'None',
              output: 'GET /lessons -> {"handler":"list","status":200}\nPOST /lessons -> {"handler":"create","status":201,"location":"/lessons/m2"}\nGET /lessons/m1 -> {"handler":"show","status":200}\nGET /lessons/nope -> {"handler":"show","status":404}\nDELETE /lessons/m1 -> {"handler":"destroy","status":204}\nPATCH /lessons/m1 -> {"handler":"unknown","status":405}',
              explanation: '204 means "done, nothing to send back" — a delete has no body.',
            },
          ],
        },
        {
          kind: 'code',
          prompt: 'A JWT is three base64url segments joined by dots — signature verification aside, everything else is parsing. Write verifyToken so it rejects a malformed token, an expired one and one missing the required scope, with a distinct reason for each.',
          language: 'javascript',
          runnable: true,
          starterCode: `function decodeSegment(segment) {
  return JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'));
}

function makeToken(payload) {
  const head = Buffer.from(JSON.stringify({ alg: 'HS256' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return head + '.' + body + '.signature';
}

const NOW = 1_800_000_000;

function verifyToken(token, requiredScope) {
  // TODO: return { ok: true, sub } or { ok: false, reason }.
  // reasons: 'malformed', 'expired', 'missing scope'
}

console.log(JSON.stringify(verifyToken('not-a-token', 'lessons:write')));
console.log(JSON.stringify(verifyToken(makeToken({ sub: 'u1', exp: NOW - 60, scopes: ['lessons:write'] }), 'lessons:write')));
console.log(JSON.stringify(verifyToken(makeToken({ sub: 'u1', exp: NOW + 60, scopes: ['lessons:read'] }), 'lessons:write')));
console.log(JSON.stringify(verifyToken(makeToken({ sub: 'u1', exp: NOW + 60, scopes: ['lessons:write'] }), 'lessons:write')));`,
          examples: [
            {
              input: 'None',
              output: '{"ok":false,"reason":"malformed"}\n{"ok":false,"reason":"expired"}\n{"ok":false,"reason":"missing scope"}\n{"ok":true,"sub":"u1"}',
              explanation: 'Check expiry before scope, or an expired admin token reads as a permissions problem.',
            },
          ],
        },
        {
          kind: 'code',
          prompt: 'Never trust a request body. Write validateLesson so it returns every problem at once rather than the first — a client fixing one field at a time is a client making five round trips.',
          language: 'javascript',
          runnable: true,
          starterCode: `function validateLesson(body) {
  // TODO: return a sorted array of error strings.
  //   'title is required'        — missing, not a string, or blank after trim
  //   'title is too long'        — over 120 characters
  //   'order must be a positive integer'
  //   'moduleId is required'
  //   'unknown field: <name>'    — one per unexpected key, in key order
  // Allowed keys: title, order, moduleId.
}

console.log(JSON.stringify(validateLesson({ title: 'Intro', order: 1, moduleId: 'm1' })));
console.log(JSON.stringify(validateLesson({ title: '   ', order: 0, extra: true })));`,
          examples: [
            {
              input: 'None',
              output: '[]\n["moduleId is required","order must be a positive integer","title is required","unknown field: extra"]',
              explanation: 'One request, four problems — the client fixes them in a single edit.',
            },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the middleware chain by hand so you understand what a framework is doing for you. Each middleware may pass control on with next(), or answer the request itself and stop the chain — nothing after it should run.',
          language: 'javascript',
          runnable: true,
          starterCode: `const trace = [];

const logger = (req, res, next) => { trace.push('logger'); next(); };
const auth = (req, res, next) => {
  trace.push('auth');
  if (!req.token) return res.send(401, 'unauthorized');
  next();
};
const handler = (req, res) => { trace.push('handler'); res.send(200, 'ok'); };

function runChain(middlewares, req) {
  // TODO: call them in order, giving each a next() that advances exactly once.
  // res.send(status, body) must record the response and stop the chain.
  // Return { status, body }.
}

console.log(JSON.stringify(runChain([logger, auth, handler], { token: 'abc' })), trace.join('>'));
trace.length = 0;
console.log(JSON.stringify(runChain([logger, auth, handler], {})), trace.join('>'));`,
          examples: [
            {
              input: 'None',
              output: '{"status":200,"body":"ok"} logger>auth>handler\n{"status":401,"body":"unauthorized"} logger>auth',
              explanation: 'The handler never runs on the unauthenticated request — that is the whole point of the chain.',
            },
          ],
        },
      ]
    }
  }
};
