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
 * Four projects rather than many small ones. Each is a simulator or a tool the
 * learner can demonstrate and defend — the scope lists the decisions a reviewer
 * will actually probe, not just the features.
 */
const PROJECTS_LIST: ProjectData[] = [
  {
    title: 'Project 1: CPU Scheduling Simulator',
    desc: 'Implement FCFS, SJF, SRTF, priority and Round Robin over the same workload, then report waiting time, turnaround time and response time for each.',
    scope: [
      'A process model with arrival time, burst time and priority, read from a workload file.',
      'All five algorithms behind one interface, so the workload is the only variable.',
      'Per-process and average waiting, turnaround and response times.',
      'A Gantt-style execution trace showing exactly when each process held the CPU.',
      'A written comparison: which algorithm wins on which workload, and why.',
    ],
    techStack: ['Python or C', 'Matplotlib or plain text Gantt output', 'CSV workload fixtures'],
    tips: 'Interviewers ask why SJF is optimal for average waiting time but unusable in practice. Your simulator should let you answer with numbers from your own runs.',
  },
  {
    title: 'Project 2: Memory Management Simulator',
    desc: 'Simulate paging with a configurable frame count, run FIFO, LRU, Optimal and Clock over a reference string, and show why Belady\u2019s anomaly appears in FIFO but not LRU.',
    scope: [
      'Reference-string generator plus loading of real traces.',
      'Four replacement policies producing page-fault counts on identical input.',
      'Frame-count sweep showing the fault curve for each policy.',
      'A reproduction of Belady\u2019s anomaly, with the exact reference string that triggers it.',
      'Optional: a TLB layer, reporting hit ratio alongside fault rate.',
    ],
    techStack: ['Python', 'Matplotlib', 'Reference-string fixtures'],
    tips: 'Be able to explain why Optimal cannot be implemented in a real kernel, and what LRU approximations (Clock, second chance) give up to become implementable.',
  },
  {
    title: 'Project 3: Mini Shell',
    desc: 'A working command shell: parse a command line, fork, exec, wait, and handle pipes, redirection and background jobs.',
    scope: [
      'Tokenising and parsing a command line, including quoted arguments.',
      'fork + execvp + waitpid, with correct exit-status reporting.',
      'Pipelines of arbitrary length using pipe() and dup2().',
      'Input/output redirection, and background execution with &.',
      'Signal handling: Ctrl-C interrupts the child, not the shell; reap zombies on SIGCHLD.',
      'Built-ins that must not fork \u2014 cd, exit \u2014 and an explanation of why.',
    ],
    techStack: ['C', 'POSIX system calls', 'Make'],
    tips: 'The question that separates candidates: why must cd be a built-in? If it forked, the directory would change in the child and be lost on exit.',
  },
  {
    title: 'Project 4: Linux System Monitor (Capstone)',
    desc: 'The capstone: a terminal or web dashboard reading real system state from /proc and /sys \u2014 CPU, memory, processes, disk and network \u2014 with alerting.',
    scope: [
      'CPU utilisation computed correctly from /proc/stat deltas, not a single sample.',
      'Memory and swap from /proc/meminfo, distinguishing used from cached.',
      'Per-process table from /proc/[pid]/, sortable by CPU and RSS.',
      'Disk usage and per-device I/O rates; network throughput from /proc/net/dev.',
      'Threshold alerts with hysteresis, so a flapping metric does not spam.',
      'A written note on sampling interval and the cost of the monitor itself.',
    ],
    techStack: ['Python or Go', '/proc and /sys', 'Rich/ncurses or a small web UI', 'systemd unit'],
    tips: 'Everyone reads /proc/stat wrong the first time \u2014 utilisation is a delta between two samples, not a ratio from one. Explaining that correctly is the whole interview.',
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
