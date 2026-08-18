import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

interface ProjectData {
  title: string;
  desc: string;
  scope: string[];
  techStack: string[];
  tips: string;
}

/**
 * Five substantial portfolio projects rather than many small ones — each is
 * meant to be defensible in an interview, so the scope lists the decisions a
 * reviewer will actually probe.
 */
const PROJECTS_LIST: ProjectData[] = [
  {
    title: 'Project 1: Enterprise Document RAG',
    desc: 'Upload PDFs, DOCX, TXT and web pages, then answer questions over them with verifiable citations. This is the reference project for the whole course.',
    scope: [
      'Ingestion pipeline: extract, clean, chunk on structure, embed, store — idempotent on a content hash.',
      'Retrieval with metadata filtering, then reranking of a wider candidate set.',
      'Grounded answers that cite chunk ids, with every citation verified against the supplied context.',
      'A golden set of 50+ real questions, with recall@k and faithfulness reported.',
      'An explicit "I don\'t know" path when retrieval scores are weak.',
    ],
    techStack: ['Python / FastAPI', 'PostgreSQL + pgvector', 'An LLM provider API', 'React'],
    tips: 'Reviewers will ask how you chose chunk size and how you know retrieval works. Have the evaluation numbers ready — that is what separates this from a tutorial.',
  },
  {
    title: 'Project 2: AI Coding Assistant',
    desc: 'Analyse a source file, detect likely bugs, explain them in plain language, propose a fix and generate a test that would have caught it.',
    scope: [
      'Parse a repository and build context from the relevant files, not the whole tree.',
      'Structured output: a typed list of findings with file, line, severity and rationale.',
      'Suggested patch generation, plus a test case that fails before the fix.',
      'Guardrails: never claim a bug without pointing at a specific line.',
    ],
    techStack: ['Python', 'Structured output / tool schemas', 'Tree-sitter or AST parsing', 'Git integration'],
    tips: 'Context selection is the hard part, not prompting. Explain how you decide which files to include within the token budget.',
  },
  {
    title: 'Project 3: AI Voice Agent',
    desc: 'A real-time voice assistant: speech in, retrieval and tools in the middle, speech out — inside a conversational latency budget.',
    scope: [
      'Streaming speech-to-text with voice-activity detection for end-of-speech.',
      'Streaming generation, with text-to-speech starting from the first sentence.',
      'Barge-in: cancel in-flight generation and audio when the user interrupts.',
      'A measured latency budget per stage, with the end-to-end figure reported.',
    ],
    techStack: ['WebSockets', 'Whisper or a streaming STT API', 'TTS API', 'Python / async'],
    tips: 'Report your actual time-to-first-audio. A voice agent that answers correctly in three seconds still feels broken — say what you did about it.',
  },
  {
    title: 'Project 4: Multi-Agent Research Platform',
    desc: 'A supervisor agent that decomposes a research question across specialist agents — search, extraction, analysis, report — and assembles a cited report.',
    scope: [
      'Supervisor routing to specialists, each with a narrow toolset.',
      'Parallel execution where subtasks are genuinely independent.',
      'Shared memory and a merge step that resolves conflicting findings.',
      'Per-agent iteration caps, full tool-call audit trail, and a total cost ceiling.',
    ],
    techStack: ['LangGraph', 'Python', 'Search API', 'Structured output'],
    tips: 'Be ready to justify why this needs multiple agents at all. "One agent with good tools would be worse because…" is the answer interviewers want.',
  },
  {
    title: 'Project 5: Enterprise AI Platform (Capstone)',
    desc: 'The capstone: a multi-tenant platform combining authentication, RAG, agents, streaming and observability behind an API gateway.',
    scope: [
      'Multi-tenancy with permission filtering enforced inside the retrieval query.',
      'File upload and ingestion, conversation history, and streaming responses.',
      'Agent tools with least privilege and approval gates for irreversible actions.',
      'Tracing, an evaluation harness in CI, and cost-per-tenant reporting.',
      'Dockerised, deployed, with model fallback when the primary provider degrades.',
    ],
    techStack: ['Go or Node gateway', 'Python / FastAPI AI service', 'PostgreSQL + pgvector', 'Redis', 'Docker', 'AWS'],
    tips: 'This is the project you walk an interviewer through end to end. Draw the architecture from memory and know why each boundary exists.',
  },
];

const MajorProjects: React.FC<Props> = ({ page }) => {
  const project = PROJECTS_LIST[page - 1];

  if (!project) {
    return <div className={styles.tabContent}>Project not found</div>;
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{project.title}</h2>
      <p className={styles.paragraph}>{project.desc}</p>

      <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '20px 0 8px' }}>Scope</h3>
      <ul style={{ paddingLeft: '20px', fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        {project.scope.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '20px 0 8px' }}>Stack</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: 'var(--bg-surface-2)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent)',
          fontSize: '13.5px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}
      >
        <strong style={{ color: 'var(--text-primary)' }}>Interview angle: </strong>
        {project.tips}
      </div>
    </div>
  );
};

export default MajorProjects;
