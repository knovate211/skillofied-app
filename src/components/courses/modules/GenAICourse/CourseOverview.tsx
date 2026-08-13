import React from 'react';

const CourseOverview: React.FC = () => {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '24px 0', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--heading)' }}>
          Welcome to GenAI &amp; Forward Deployed Engineering
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          Build production GenAI systems — retrieval-augmented generation, agents, evaluation and deployment —
          and learn the customer-facing engineering that turns a vague requirement into a shipped solution.
          The course is built around real systems rather than notebooks: every module ends in code you run.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Learning Outcomes</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          <li>Ship a grounded RAG pipeline with citations and measured retrieval quality</li>
          <li>Build tool-calling agents with safety rails, memory and audit trails</li>
          <li>Run GenAI in production: streaming, cost control, retries, fallback and evaluation</li>
          <li>Scope, integrate and deploy an AI system inside a customer environment</li>
        </ul>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>How the Course Runs</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Twelve modules, each with lessons, a quiz and a practice set you complete in the built-in editor.
          Coding tasks are pure-Python and run in the sandbox, so you learn the mechanics — similarity,
          chunking, ranking, retries, cost — by implementing them rather than importing them. Tasks that
          need a live model provider or a database are written as design exercises instead.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Prerequisites</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Comfort with any one programming language and basic HTTP. Module 1 covers the Python you need —
          no prior Python, machine learning or maths background is assumed.
        </p>
      </div>
    </div>
  );
};

export default CourseOverview;
