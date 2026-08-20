const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ── Profile ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  userId: string;
  // Personal Info
  gender: string;
  dob: string;
  whatsapp: string;
  phone: string;
  experience: string;
  // Generic Details
  workExperience: string;
  careerGap: string;
  currentState: string;
  currentCity: string;
  preferredLocations: string[];
  githubLink: string;
  linkedinLink: string;
  isWorkingProfessional: boolean;
  resumeName: string;
  // 10th Grade
  edu10SchoolName: string;
  edu10YearOfPassout: string;
  edu10MarksPercent: string;
  // 12th / PUC
  edu12SchoolName: string;
  edu12YearOfPassout: string;
  edu12MarksPercent: string;
  // UG Detail
  ugUniversityRollNo: string;
  ugCollegeName: string;
  ugCourseName: string;
  ugBranch: string;
  ugYearOfPassout: string;
  ugMarksPercent: string;
  ugCgpa: string;
  ugActiveBacklogs: string;
  // PG Detail
  pgHasCertificate: boolean;
}

export async function getProfileApi(): Promise<UserProfile> {
  const query = `
    query GetProfile {
      getProfile {
        userId
        gender
        dob
        whatsapp
        phone
        experience
        workExperience
        careerGap
        currentState
        currentCity
        preferredLocations
        githubLink
        linkedinLink
        isWorkingProfessional
        resumeName
        edu10SchoolName
        edu10YearOfPassout
        edu10MarksPercent
        edu12SchoolName
        edu12YearOfPassout
        edu12MarksPercent
        ugUniversityRollNo
        ugCollegeName
        ugCourseName
        ugBranch
        ugYearOfPassout
        ugMarksPercent
        ugCgpa
        ugActiveBacklogs
        pgHasCertificate
      }
    }
  `;
  const data = await graphqlRequest<{ getProfile: UserProfile }>(query);
  return data.getProfile;
}

export async function upsertProfileApi(profile: Partial<UserProfile>): Promise<void> {
  const mutation = `
    mutation UpsertProfile($profile: UserProfileInput!) {
      upsertProfile(profile: $profile) {
        success
        message
      }
    }
  `;
  // Exclude userId from the payload to send to mutation as it's enforced by JWT context
  const { userId, ...payload } = profile;
  const data = await graphqlRequest<{ upsertProfile: { success: boolean; message: string } }>(mutation, {
    profile: payload,
  });
	if (!data.upsertProfile.success) {
		throw new Error(data.upsertProfile.message || 'Failed to save profile');
	}
}

export async function getMyCoursesApi(): Promise<any[]> {
	const query = `
		query GetMyCourses {
			getMyCourses {
				id
				title
				mentor
				initial
				color
				classTime
			}
		}
	`;
	const data = await graphqlRequest<{ getMyCourses: any[] }>(query);
	return data.getMyCourses;
}

export async function getReferralsApi(): Promise<any[]> {
  const query = `
    query GetReferrals {
      getReferrals {
        id
        name
        date
        status
      }
    }
  `;
  try {
    const data = await graphqlRequest<{ getReferrals: any[] }>(query);
    return data.getReferrals || [];
  } catch (err) {
    console.error("Referrals API not fully implemented yet:", err);
    return [];
  }
}

export async function getCertificatesApi(): Promise<any[]> {
  const query = `
    query GetCertificates {
      getCertificates {
        id
        courseName
        issueDate
        credentialId
        pdfUrl
      }
    }
  `;
  try {
    const data = await graphqlRequest<{ getCertificates: any[] }>(query);
    return data.getCertificates || [];
  } catch (err) {
    console.error("Certificates API not fully implemented yet:", err);
    return [
      {
        id: 'cert-1',
        courseName: 'Full Stack Web Development',
        issueDate: '2023-08-12',
        credentialId: 'SKLO-FSWD-9X2P',
        pdfUrl: '#',
      },
      {
        id: 'cert-2',
        courseName: 'Advanced Data Structures in Java',
        issueDate: '2023-11-05',
        credentialId: 'SKLO-ADJ-4M7L',
        pdfUrl: '#',
      }
    ];
  }
}

// ── Auth / GraphQL ─────────────────────────────────────────────────────────────

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const resp = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to authenticate');
  }

  return resp.json();
}

async function postPublic(
  path: string,
  body: Record<string, unknown>,
  fallbackError: string,
): Promise<any> {
  const resp = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data.error || fallbackError);
  }
  return data;
}

/**
 * Step 1 of the password reset.
 *
 * Returns whether the server wants a code. It only sends one when mail delivery
 * is configured; otherwise it resets on the email address alone and the client
 * goes straight to the new password.
 *
 * When a code IS required this succeeds whether or not the address belongs to an
 * account — the server deliberately answers identically either way, so this
 * cannot be used to discover who has an account. Never report "unknown email"
 * from this call.
 */
export async function requestPasswordResetApi(email: string): Promise<{ codeRequired: boolean }> {
  const data = await postPublic(
    '/api/password-reset/request',
    { email },
    'Could not start the reset. Please try again.',
  );
  return { codeRequired: data.code_required !== false };
}

/**
 * Step 2: sets the new password. `code` is the emailed six-digit code, or an
 * empty string when the server reported that no code is required.
 */
export async function confirmPasswordResetApi(
  email: string,
  code: string,
  newPassword: string,
): Promise<void> {
  await postPublic(
    '/api/password-reset/confirm',
    { email, code, new_password: newPassword },
    'Could not update your password. Please try again.',
  );
}

export async function graphqlRequest<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const resp = await fetch(`${API_BASE}/api/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await resp.json();

  if (result.errors && result.errors.length > 0) {
    const errMsg = result.errors[0].message || 'GraphQL Query Error';
    if (errMsg === 'authentication required') {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error(errMsg);
  }

  return result.data;
}

// ── Quiz Verification ─────────────────────────────────────────────────────────

export interface QuizAttempt {
  moduleId: string;
  score: number;
  totalQuestions: number;
  selectedAnswers: string;
  completedAt: string;
}

/**
 * Per-question outcome returned after grading. `correctAnswer` is only ever
 * sent in a submission response, which is what lets the UI reveal the right
 * option without the answer key being present in the client bundle.
 */
export interface QuizQuestionResult {
  questionId: number;
  correct: boolean;
  correctAnswer: string;
}

export interface SubmitQuizResult {
  success: boolean;
  score: number;
  totalQuestions: number;
  results: QuizQuestionResult[];
}

export async function submitQuizApi(moduleId: string, answers: { questionId: number; answer: string }[]): Promise<SubmitQuizResult> {
  const mutation = `
    mutation SubmitQuiz($moduleId: String!, $answers: [QuizAnswerInput!]!) {
      submitQuiz(moduleId: $moduleId, answers: $answers) {
        success
        score
        totalQuestions
        results {
          questionId
          correct
          correctAnswer
        }
      }
    }
  `;
  const data = await graphqlRequest<{ submitQuiz: SubmitQuizResult }>(mutation, {
    moduleId,
    answers,
  });
  return data.submitQuiz;
}

export async function getQuizAttemptsApi(): Promise<QuizAttempt[]> {
  const query = `
    query GetQuizAttempts {
      getQuizAttempts {
        moduleId
        score
        totalQuestions
        selectedAnswers
        completedAt
      }
    }
  `;
  try {
    const data = await graphqlRequest<{ getQuizAttempts: QuizAttempt[] }>(query);
    return data.getQuizAttempts || [];
  } catch (err) {
    console.error("Get quiz attempts failed:", err);
    return [];
  }
}

/** A posting from JSearch, which aggregates LinkedIn, Indeed, Glassdoor and
 *  company career pages behind one API. */
export interface JobListing {
  url: string;
  title: string;
  company: string;
  locations: string;
  description: string;
  salary: string;
  date: string;
  /** Board the posting came from, e.g. "LinkedIn" */
  site: string;
  employerLogo: string | null;
  employmentType: string | null;
  isRemote: boolean;
}

export interface JobSearchResult {
  jobs: JobListing[];
  total: number;
  pages: number;
}

export async function searchJobsApi(keywords: string, location: string, page: number = 1): Promise<JobSearchResult> {
  const query = `
    query SearchJobs($keywords: String, $location: String, $page: Int) {
      searchJobs(keywords: $keywords, location: $location, page: $page) {
        jobs {
          url
          title
          company
          locations
          description
          salary
          date
          site
          employerLogo
          employmentType
          isRemote
        }
        total
        pages
      }
    }
  `;
  const data = await graphqlRequest<{ searchJobs: JobSearchResult }>(query, { keywords, location, page });
  return data.searchJobs;
}

// ── Scratchpad execution ──────────────────────────────────────────────────────

/**
 * Result of running code in the in-lesson editor. There are no test cases and
 * no grading: the learner sees exactly what their program printed.
 */
export interface ScratchpadResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionMs: number;
  timedOut: boolean;
}

export async function runScratchpadApi(
  language: string,
  code: string,
  stdin = ''
): Promise<ScratchpadResult> {
  const mutation = `
    mutation RunScratchpad($language: String!, $code: String!, $stdin: String) {
      runScratchpad(language: $language, code: $code, stdin: $stdin) {
        stdout
        stderr
        exitCode
        executionMs
        timedOut
      }
    }
  `;
  const data = await graphqlRequest<{ runScratchpad: ScratchpadResult }>(mutation, {
    language,
    code,
    stdin,
  });
  return data.runScratchpad;
}

// ── Placement assessments ─────────────────────────────────────────────────────
//
// The server is authoritative for everything here: the paper, the saved
// answers, and above all the clock. `secondsLeft` from the server is the only
// time that counts — the browser clock is used solely to tick between polls.

export interface AssessmentSummaryItem {
  id: string;
  title: string;
  description: string;
  purpose: 'practice' | 'hiring' | string;
  companyName: string;
  companyLogo: string;
  durationMinutes: number;
  totalMarks: number;
  questionCount: number;
  sectionSummary: string;
  opensAt: string;
  closesAt: string;
  maxAttempts: number;
  attemptsUsed: number;
  liveAttemptId: string;
  canStart: boolean;
  blockedReason: string;
  /** Present so the instructions screen can disclose monitoring before consent. */
  proctoring?: Proctoring | null;
}

export interface McqOption {
  id: string;
  body: string;
  isCorrect: boolean;
  orderIndex: number;
}

export type QuestionKind = 'mcq' | 'coding' | 'descriptive';

export interface AttemptQuestion {
  id: string;
  sectionId: string;
  kind: QuestionKind;
  orderIndex: number;
  marks: number;
  body: string;
  mcqKind: 'single' | 'multiple' | 'numeric' | '';
  options: McqOption[];
  problemId: string;
  problemTitle: string;
  selectedOptionIds: string[];
  textAnswer: string;
  submissionId: string;
  language: string;
  code: string;
  gradingStatus: 'ungraded' | 'pending' | 'graded' | 'manual_review';
  visited: boolean;
  markedReview: boolean;
  timeSpentMs: number;
  awardedMarks: number | null;
}

export interface AttemptSection {
  id: string;
  title: string;
  kind: QuestionKind;
  orderIndex: number;
  durationMinutes: number;
}

export interface Proctoring {
  requireFullscreen: boolean;
  tabSwitchLimit: number;
  blockCopyPaste: boolean;
  webcam: boolean;
}

export interface AttemptState {
  attemptId: string;
  assessmentId: string;
  title: string;
  status: 'in_progress' | 'submitted' | 'evaluating' | 'evaluated' | 'disqualified' | 'expired';
  allowBacktrack: boolean;
  proctoring: Proctoring;
  serverNow: string;
  expiresAt: string;
  secondsLeft: number;
  sections: AttemptSection[];
  questions: AttemptQuestion[];
  maxScore: number;
  negativeMarking: number;
  /**
   * The server refuses to show this candidate their own score. Scholarship
   * results are a fee decision staff make and email out, so the player ends on
   * "submitted" rather than a score screen.
   */
  resultsWithheld: boolean;
}

export interface AttemptSummary {
  id: string;
  assessmentId: string;
  assessmentName: string;
  attemptNo: number;
  status: string;
  startedAt: string;
  submittedAt: string;
  evaluatedAt: string;
  score: number;
  maxScore: number;
  percent: number;
  integrityScore: number;
  passed: boolean;
}

export interface AttemptResult {
  summary: AttemptSummary;
  questions: AttemptQuestion[];
  revealed: boolean;
  /** Marks and questions are absent by design, not because grading failed. */
  withheld: boolean;
}

const ATTEMPT_QUESTION_FIELDS = `
  id sectionId kind orderIndex marks body mcqKind
  options { id body isCorrect orderIndex }
  problemId problemTitle selectedOptionIds textAnswer
  submissionId language code gradingStatus visited markedReview timeSpentMs awardedMarks
`;

const ATTEMPT_STATE_FIELDS = `
  attemptId assessmentId title status allowBacktrack
  proctoring { requireFullscreen tabSwitchLimit blockCopyPaste webcam }
  serverNow expiresAt secondsLeft
  sections { id title kind orderIndex durationMinutes }
  questions { ${ATTEMPT_QUESTION_FIELDS} }
  maxScore negativeMarking resultsWithheld
`;

const ATTEMPT_SUMMARY_FIELDS = `
  id assessmentId assessmentName attemptNo status
  startedAt submittedAt evaluatedAt
  score maxScore percent integrityScore passed
`;

export async function listAssessmentsApi(scope = ''): Promise<AssessmentSummaryItem[]> {
  const query = `
    query ListAssessments($scope: String) {
      listAssessments(scope: $scope) {
        id title description purpose companyName companyLogo
        durationMinutes totalMarks questionCount sectionSummary
        opensAt closesAt maxAttempts attemptsUsed liveAttemptId canStart blockedReason
        proctoring { requireFullscreen tabSwitchLimit blockCopyPaste webcam }
      }
    }
  `;
  const data = await graphqlRequest<{ listAssessments: AssessmentSummaryItem[] }>(query, { scope });
  return data.listAssessments ?? [];
}

export async function startAttemptApi(assessmentId: string, inviteToken = ''): Promise<AttemptState> {
  const mutation = `
    mutation StartAttempt($assessmentId: String!, $inviteToken: String) {
      startAttempt(assessmentId: $assessmentId, inviteToken: $inviteToken) { ${ATTEMPT_STATE_FIELDS} }
    }
  `;
  const data = await graphqlRequest<{ startAttempt: AttemptState }>(mutation, { assessmentId, inviteToken });
  return data.startAttempt;
}

export async function getAttemptStateApi(attemptId: string): Promise<AttemptState> {
  const query = `
    query GetAttemptState($attemptId: String!) {
      getAttemptState(attemptId: $attemptId) { ${ATTEMPT_STATE_FIELDS} }
    }
  `;
  const data = await graphqlRequest<{ getAttemptState: AttemptState }>(query, { attemptId });
  return data.getAttemptState;
}

export interface SaveAnswerInput {
  attemptId: string;
  questionId: string;
  selectedOptionIds?: string[];
  textAnswer?: string;
  timeSpentMs?: number;
  markedReview?: boolean;
  clearAnswer?: boolean;
  /** Coding draft. Saved, never graded — grading is still Submit-only. */
  language?: string;
  code?: string;
}

export async function saveAnswerApi(input: SaveAnswerInput): Promise<{ saved: boolean; secondsLeft: number }> {
  const mutation = `
    mutation SaveAnswer(
      $attemptId: String!, $questionId: String!, $selectedOptionIds: [String!],
      $textAnswer: String, $timeSpentMs: Int, $markedReview: Boolean, $clearAnswer: Boolean,
      $language: String, $code: String
    ) {
      saveAnswer(
        attemptId: $attemptId, questionId: $questionId, selectedOptionIds: $selectedOptionIds,
        textAnswer: $textAnswer, timeSpentMs: $timeSpentMs, markedReview: $markedReview,
        clearAnswer: $clearAnswer, language: $language, code: $code
      ) { saved secondsLeft }
    }
  `;
  const data = await graphqlRequest<{ saveAnswer: { saved: boolean; secondsLeft: number } }>(mutation, input);
  return data.saveAnswer;
}

export interface AttemptTestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: string;
  executionMs: number;
  error: string;
}

export interface RunAttemptCodeResult {
  overallStatus: string;
  testResults: AttemptTestResult[];
  compileError: string;
  runtimeMs: number;
}

export async function runAttemptCodeApi(
  attemptId: string, questionId: string, language: string, code: string
): Promise<RunAttemptCodeResult> {
  const mutation = `
    mutation RunAttemptCode($attemptId: String!, $questionId: String!, $language: String!, $code: String!) {
      runAttemptCode(attemptId: $attemptId, questionId: $questionId, language: $language, code: $code) {
        overallStatus compileError runtimeMs
        testResults { input expectedOutput actualOutput status executionMs error }
      }
    }
  `;
  const data = await graphqlRequest<{ runAttemptCode: RunAttemptCodeResult }>(mutation, {
    attemptId, questionId, language, code,
  });
  return data.runAttemptCode;
}

export async function submitAttemptCodeApi(
  attemptId: string, questionId: string, language: string, code: string
): Promise<{ submissionId: string; secondsLeft: number }> {
  const mutation = `
    mutation SubmitAttemptCode($attemptId: String!, $questionId: String!, $language: String!, $code: String!) {
      submitAttemptCode(attemptId: $attemptId, questionId: $questionId, language: $language, code: $code) {
        submissionId secondsLeft
      }
    }
  `;
  const data = await graphqlRequest<{ submitAttemptCode: { submissionId: string; secondsLeft: number } }>(
    mutation, { attemptId, questionId, language, code },
  );
  return data.submitAttemptCode;
}

export interface AttemptSubmissionStatus {
  submissionId: string;
  status: string;
  passedCount: number;
  totalCount: number;
  compileError: string;
  runtimeMs: number;
}

export async function getAttemptSubmissionApi(
  attemptId: string, submissionId: string
): Promise<AttemptSubmissionStatus> {
  const query = `
    query GetAttemptSubmission($attemptId: String!, $submissionId: String!) {
      getAttemptSubmission(attemptId: $attemptId, submissionId: $submissionId) {
        submissionId status passedCount totalCount compileError runtimeMs
      }
    }
  `;
  const data = await graphqlRequest<{ getAttemptSubmission: AttemptSubmissionStatus }>(query, {
    attemptId, submissionId,
  });
  return data.getAttemptSubmission;
}

export async function submitAttemptApi(attemptId: string): Promise<AttemptSummary> {
  const mutation = `
    mutation SubmitAttempt($attemptId: String!) {
      submitAttempt(attemptId: $attemptId) { ${ATTEMPT_SUMMARY_FIELDS} }
    }
  `;
  const data = await graphqlRequest<{ submitAttempt: AttemptSummary }>(mutation, { attemptId });
  return data.submitAttempt;
}

export async function getMyAttemptsApi(): Promise<AttemptSummary[]> {
  const query = `query GetMyAttempts { getMyAttempts { ${ATTEMPT_SUMMARY_FIELDS} } }`;
  const data = await graphqlRequest<{ getMyAttempts: AttemptSummary[] }>(query);
  return data.getMyAttempts ?? [];
}

export async function getAttemptResultApi(attemptId: string): Promise<AttemptResult> {
  const query = `
    query GetAttemptResult($attemptId: String!) {
      getAttemptResult(attemptId: $attemptId) {
        summary { ${ATTEMPT_SUMMARY_FIELDS} }
        questions { ${ATTEMPT_QUESTION_FIELDS} }
        revealed
        withheld
      }
    }
  `;
  const data = await graphqlRequest<{ getAttemptResult: AttemptResult }>(query, { attemptId });
  return data.getAttemptResult;
}

export interface ProctorEventResult {
  integrityScore: number;
  terminated: boolean;
  warning: string;
}

export async function recordProctorEventApi(
  attemptId: string, kind: string, detail = ''
): Promise<ProctorEventResult> {
  const mutation = `
    mutation RecordProctorEvent($attemptId: String!, $kind: String!, $detail: String) {
      recordProctorEvent(attemptId: $attemptId, kind: $kind, detail: $detail) {
        integrityScore terminated warning
      }
    }
  `;
  const data = await graphqlRequest<{ recordProctorEvent: ProctorEventResult }>(mutation, {
    attemptId, kind, detail,
  });
  return data.recordProctorEvent;
}

// ── Practice ──────────────────────────────────────────────────────────────────

export interface PracticeSetSummary {
  id: string;
  title: string;
  level: string;
  levelColor: string;
  bgColor: string;
  totalProblems: number;
  progress: number;
}

export type ProblemStatus = 'Solved' | 'Unsolved' | 'In Progress';

export interface PracticeProblemSummary {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  xp: number;
  setId?: string;
  status: ProblemStatus;
}

export interface ProblemExampleDto {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemHint {
  order: number;
  title: string;
  body: string;
}

export interface StarterCodes {
  javascript: string;
  python: string;
  java: string;
  cpp: string;
  go?: string;
}

export interface ProblemDetailDto {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  xp: number;
  statement: string;
  constraints: string[];
  tags: string[];
  examples: ProblemExampleDto[];
  hints: ProblemHint[];
  starterCodes: StarterCodes;
  setId?: string;
  userStatus?: string;
}

export interface TestCaseResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: string;
  executionMs: number;
  error: string;
}

export interface RunCodeResult {
  jobId: string;
  overallStatus: string;
  testResults: TestCaseResult[];
  compileError: string;
  runtimeMs: number;
}

export interface SubmissionRecord {
  id: string;
  problemId: string;
  language: string;
  status: string;
  runtimeMs: number;
  memoryKb: number;
  submittedAt: string;
}

export interface SubmissionDetail extends SubmissionRecord {
  testResults: TestCaseResult[];
}

/** The backend reports `InProgress`; the UI labels it `In Progress`. */
export function normalizeProblemStatus(userStatus?: string): ProblemStatus {
  if (userStatus === 'Solved') return 'Solved';
  if (userStatus === 'InProgress') return 'In Progress';
  return 'Unsolved';
}

/** `Accepted` / `WrongAnswer` / anything else is treated as a runtime failure. */
export function normalizeSubmissionStatus(status: string): 'Accepted' | 'Wrong Answer' | 'Runtime Error' {
  if (status === 'Accepted') return 'Accepted';
  if (status === 'WrongAnswer') return 'Wrong Answer';
  return 'Runtime Error';
}

const PRACTICE_SET_FIELDS = `
  id
  title
  level
  levelColor
  bgColor
  totalProblems
  progress
`;

const TEST_RESULT_FIELDS = `
  testCaseId
  input
  expectedOutput
  actualOutput
  status
  executionMs
  error
`;

export async function listPracticeSetsApi(): Promise<PracticeSetSummary[]> {
  const query = `
    query ListPracticeSets {
      listPracticeSets { ${PRACTICE_SET_FIELDS} }
    }
  `;
  const data = await graphqlRequest<{ listPracticeSets: PracticeSetSummary[] }>(query);
  return data.listPracticeSets || [];
}

export async function listProblemsApi(setId?: string): Promise<PracticeProblemSummary[]> {
  const query = `
    query ListProblems($setId: String) {
      listProblems(setId: $setId) {
        problems {
          id
          slug
          title
          difficulty
          topic
          xp
          setId
          userStatus
        }
      }
    }
  `;
  const data = await graphqlRequest<{ listProblems: { problems: any[] } }>(query, { setId });
  const problems = data.listProblems?.problems || [];
  return problems.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    difficulty: p.difficulty,
    topic: p.topic,
    xp: p.xp,
    setId: p.setId,
    status: normalizeProblemStatus(p.userStatus),
  }));
}

export async function getProblemApi(id: string): Promise<ProblemDetailDto | null> {
  const query = `
    query GetProblem($id: String!) {
      getProblem(id: $id) {
        id
        slug
        title
        difficulty
        topic
        xp
        statement
        constraints
        tags
        examples { input output explanation }
        hints { order title body }
        starterCodes { javascript python java cpp go }
        setId
        userStatus
      }
    }
  `;
  const data = await graphqlRequest<{ getProblem: ProblemDetailDto }>(query, { id });
  return data.getProblem || null;
}

export async function listSubmissionsApi(problemId: string): Promise<SubmissionRecord[]> {
  const query = `
    query ListSubmissions($problemId: String) {
      listSubmissions(problemId: $problemId) {
        submissions {
          id
          problemId
          language
          status
          runtimeMs
          memoryKb
          submittedAt
        }
      }
    }
  `;
  const data = await graphqlRequest<{ listSubmissions: { submissions: SubmissionRecord[] } }>(query, { problemId });
  return data.listSubmissions?.submissions || [];
}

export async function runCodeApi(problemId: string, language: string, code: string): Promise<RunCodeResult> {
  const mutation = `
    mutation RunCode($problemId: String!, $language: String!, $code: String!) {
      runCode(problemId: $problemId, language: $language, code: $code) {
        jobId
        overallStatus
        testResults { ${TEST_RESULT_FIELDS} }
        compileError
        runtimeMs
      }
    }
  `;
  const data = await graphqlRequest<{ runCode: RunCodeResult }>(mutation, { problemId, language, code });
  return data.runCode;
}

export async function submitCodeApi(problemId: string, language: string, code: string): Promise<string> {
  const mutation = `
    mutation SubmitCode($problemId: String!, $language: String!, $code: String!) {
      submitCode(problemId: $problemId, language: $language, code: $code) {
        submissionId
      }
    }
  `;
  const data = await graphqlRequest<{ submitCode: { submissionId: string } }>(mutation, { problemId, language, code });
  return data.submitCode.submissionId;
}

export async function getSubmissionApi(id: string): Promise<SubmissionDetail> {
  const query = `
    query GetSubmission($id: String!) {
      getSubmission(id: $id) {
        id
        status
        runtimeMs
        memoryKb
        testResults { ${TEST_RESULT_FIELDS} }
        submittedAt
      }
    }
  `;
  const data = await graphqlRequest<{ getSubmission: SubmissionDetail }>(query, { id });
  return data.getSubmission;
}

// ── Scholarship hand-off ──────────────────────────────────────────────────────

export interface ScholarshipClaim {
  /** A normal session JWT — same signer, claims and lifetime as /api/login. */
  token: string;
  user: { id: string; email: string; name: string; role: string };
  assessmentId: string;
  /** Passed to startAttempt; the invite is what makes the paper startable. */
  inviteToken: string;
  courseId: string;
  applicationId: string;
}

/**
 * Exchanges the one-time token from a scholarship link for a real session.
 *
 * The raw token only ever exists in the URL the applicant was redirected to (and
 * in the email we sent them); the server holds nothing but its SHA-256, so this
 * is the only way to turn it into a login. It is public by necessity — a
 * candidate arriving from the marketing site has no credentials to present.
 */
export async function claimScholarshipApi(token: string): Promise<ScholarshipClaim> {
  return postPublic(
    '/api/scholarship/claim',
    { token },
    'This link is no longer valid. Please apply again or sign in.',
  );
}

export interface ScholarshipOutcome {
  isScholarship: boolean;
  courseName?: string;
  status?: string;
  /**
   * The result exists but is not served to the candidate — it is reviewed and
   * emailed by staff. When set, every scoring field below is absent.
   */
  withheld?: boolean;
  /** The address the result will be sent to, echoed back so the page can show it. */
  email?: string;
  /** True while the judge is still grading — no score to show yet. */
  pending?: boolean;
  percent?: number;
  score?: number;
  maxScore?: number;
  qualified?: boolean;
  awardPercent?: number;
  bandMinPercent?: number;
  nextBandMinPercent?: number;
  nextBandAwardPercent?: number;
  /** Set once an admin has confirmed the decision; overrides the ladder. */
  confirmedAwardPercent?: number;
  slabs?: { minPercent: number; awardPercent: number }[];
}

/**
 * What this attempt earned, if it was a scholarship attempt at all.
 *
 * Returns `{ isScholarship: false }` for ordinary practice and hiring attempts
 * rather than erroring, so the result page can call it unconditionally.
 */
export async function getScholarshipOutcomeApi(attemptId: string): Promise<ScholarshipOutcome> {
  const token = localStorage.getItem('token');
  const resp = await fetch(`${API_BASE}/api/scholarship/outcome?attemptId=${encodeURIComponent(attemptId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!resp.ok) return { isScholarship: false };
  return resp.json();
}
