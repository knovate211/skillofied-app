import React from 'react';

const CourseOverview: React.FC = () => {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '24px 0', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--heading)' }}>
          Welcome to Operating Systems
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          Every program you write runs on top of an operating system, and most of the hard bugs in
          production — the deadlock, the leak, the process that will not die, the machine that swaps
          itself to a standstill — are the OS making itself visible. This course teaches the kernel
          from the outside in: what it does, why it does it, and how to see it happening on a machine
          you control.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Learning Outcomes</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          <li>Explain how processes, threads and scheduling actually work — and measure them</li>
          <li>Write correct concurrent code, and recognise a race or a deadlock from its symptoms</li>
          <li>Reason about virtual memory, paging and why a machine starts thrashing</li>
          <li>Navigate a Linux system confidently: /proc, signals, permissions, services</li>
          <li>Answer the OS questions that come up in placement interviews, with evidence</li>
        </ul>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>How the Course Runs</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Twelve modules, each with lessons, a module quiz and a practice set. Both the quiz and the
          practice set are multiple choice, and both are graded. The questions are built around
          situations rather than definitions — you are shown what a machine is doing and asked what you
          would conclude, with the wrong answers being the mistakes people genuinely make.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Prerequisites</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Comfort with one programming language and the basics of a terminal. Lessons include real C
          and shell examples you are encouraged to run on your own Linux machine, but nothing is graded
          on writing code. No prior C, assembly or kernel experience is assumed.
        </p>
      </div>
    </div>
  );
};

export default CourseOverview;
