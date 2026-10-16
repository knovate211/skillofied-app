import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';

import CourseOverview from './modules/OsCourse/CourseOverview';
import OsModuleRenderer from './modules/OsCourse/OsModuleRenderer';

// Item order within a module maps directly to page numbers, so lessons must
// come first, then the quiz, then the practice set — see OsModuleRenderer.
export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [{ id: 'overview-welcome', title: 'Welcome to Operating Systems' }],
  },
  {
    id: 'm1',
    title: 'MODULE 1: OS FUNDAMENTALS',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 What an Operating System Is' },
      { id: 'm1-l2', title: 'Lesson 1.2 Kernel Space and User Space' },
      { id: 'm1-l3', title: 'Lesson 1.3 System Calls' },
      { id: 'm1-l4', title: 'Lesson 1.4 OS Services and Components' },
      { id: 'm1-l5', title: 'Lesson 1.5 Kernel Architectures' },
      { id: 'm1-l6', title: 'Lesson 1.6 The Boot Process' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Practice: OS Fundamentals' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: PROCESSES',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 Program vs Process' },
      { id: 'm2-l2', title: 'Lesson 2.2 Process States' },
      { id: 'm2-l3', title: 'Lesson 2.3 The Process Control Block' },
      { id: 'm2-l4', title: 'Lesson 2.4 Creation, Termination, Zombies' },
      { id: 'm2-l5', title: 'Lesson 2.5 Context Switching' },
      { id: 'm2-l6', title: 'Lesson 2.6 Inter-Process Communication' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Practice: Processes' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: THREADS & CONCURRENCY',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 Process vs Thread' },
      { id: 'm3-l2', title: 'Lesson 3.2 User and Kernel Threads' },
      { id: 'm3-l3', title: 'Lesson 3.3 Race Conditions' },
      { id: 'm3-l4', title: 'Lesson 3.4 Critical Sections and Mutexes' },
      { id: 'm3-l5', title: 'Lesson 3.5 Semaphores and Monitors' },
      { id: 'm3-l6', title: 'Lesson 3.6 Spinlocks and When to Use Them' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Practice: Threads & Concurrency' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: CPU SCHEDULING',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 Scheduling Objectives and Metrics' },
      { id: 'm4-l2', title: 'Lesson 4.2 FCFS and the Convoy Effect' },
      { id: 'm4-l3', title: 'Lesson 4.3 SJF and SRTF' },
      { id: 'm4-l4', title: 'Lesson 4.4 Priority Scheduling and Starvation' },
      { id: 'm4-l5', title: 'Lesson 4.5 Round Robin and the Quantum' },
      { id: 'm4-l6', title: 'Lesson 4.6 Multilevel Feedback Queues' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Practice: CPU Scheduling' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: PROCESS SYNCHRONIZATION',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 The Critical-Section Problem' },
      { id: 'm5-l2', title: "Lesson 5.2 Peterson's Solution" },
      { id: 'm5-l3', title: 'Lesson 5.3 Producer–Consumer' },
      { id: 'm5-l4', title: 'Lesson 5.4 Readers–Writers' },
      { id: 'm5-l5', title: 'Lesson 5.5 Dining Philosophers' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Practice: Synchronization' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: DEADLOCKS',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 The Four Coffman Conditions' },
      { id: 'm6-l2', title: 'Lesson 6.2 Resource Allocation Graphs' },
      { id: 'm6-l3', title: 'Lesson 6.3 Prevention' },
      { id: 'm6-l4', title: "Lesson 6.4 Avoidance and Banker's Algorithm" },
      { id: 'm6-l5', title: 'Lesson 6.5 Detection and Recovery' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: "Practice: Deadlocks" },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: MEMORY MANAGEMENT',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 The Memory Hierarchy' },
      { id: 'm7-l2', title: 'Lesson 7.2 Logical vs Physical Addresses' },
      { id: 'm7-l3', title: 'Lesson 7.3 Contiguous Allocation' },
      { id: 'm7-l4', title: 'Lesson 7.4 Fragmentation' },
      { id: 'm7-l5', title: 'Lesson 7.5 Paging and Page Tables' },
      { id: 'm7-l6', title: 'Lesson 7.6 The TLB and Segmentation' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Practice: Memory Management' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: VIRTUAL MEMORY',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 Demand Paging' },
      { id: 'm8-l2', title: 'Lesson 8.2 The Page Fault Path' },
      { id: 'm8-l3', title: 'Lesson 8.3 FIFO, Optimal and LRU' },
      { id: 'm8-l4', title: 'Lesson 8.4 Clock and Second Chance' },
      { id: 'm8-l5', title: 'Lesson 8.5 Thrashing and the Working Set' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Practice: Virtual Memory' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: FILE SYSTEMS',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 Files, Directories, Metadata' },
      { id: 'm9-l2', title: 'Lesson 9.2 Inodes' },
      { id: 'm9-l3', title: 'Lesson 9.3 File Allocation Methods' },
      { id: 'm9-l4', title: 'Lesson 9.4 Permissions and Ownership' },
      { id: 'm9-l5', title: 'Lesson 9.5 Hard Links and Symbolic Links' },
      { id: 'm9-l6', title: 'Lesson 9.6 Journaling and Crash Consistency' },
      { id: 'm9-quiz', title: 'Module Quiz' },
      { id: 'm9-assignment', title: 'Practice: File Systems' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: STORAGE & I/O',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 HDDs, SSDs and Disk Geometry' },
      { id: 'm10-l2', title: 'Lesson 10.2 Disk Scheduling Algorithms' },
      { id: 'm10-l3', title: 'Lesson 10.3 RAID Levels' },
      { id: 'm10-l4', title: 'Lesson 10.4 Interrupts, Polling and DMA' },
      { id: 'm10-l5', title: 'Lesson 10.5 Device Drivers and the Block Layer' },
      { id: 'm10-quiz', title: 'Module Quiz' },
      { id: 'm10-assignment', title: 'Practice: Storage & I/O' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: LINUX INTERNALS',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 Linux Architecture' },
      { id: 'm11-l2', title: 'Lesson 11.2 Reading /proc' },
      { id: 'm11-l3', title: 'Lesson 11.3 Signals' },
      { id: 'm11-l4', title: 'Lesson 11.4 Users, Groups and Permissions' },
      { id: 'm11-l5', title: 'Lesson 11.5 Services and systemd' },
      { id: 'm11-l6', title: 'Lesson 11.6 Shell Scripting for Operators' },
      { id: 'm11-quiz', title: 'Module Quiz' },
      { id: 'm11-assignment', title: 'Practice: Linux Internals' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: ADVANCED OS CONCEPTS',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 Multicore and SMP' },
      { id: 'm12-l2', title: 'Lesson 12.2 Virtualization and Hypervisors' },
      { id: 'm12-l3', title: 'Lesson 12.3 Containers, Namespaces, cgroups' },
      { id: 'm12-l4', title: 'Lesson 12.4 Distributed System Basics' },
      { id: 'm12-l5', title: 'Lesson 12.5 OS Security and Access Control' },
      { id: 'm12-quiz', title: 'Module Quiz' },
      { id: 'm12-assignment', title: 'Practice: Advanced OS' },
    ],
  },
  {
    id: 'projects',
    title: 'CAPSTONE PROJECTS',
    items: [
      { id: 'proj-1', title: 'Project 1: CPU Scheduling Simulator' },
      { id: 'proj-2', title: 'Project 2: Memory Management Simulator' },
      { id: 'proj-3', title: 'Project 3: Mini Shell' },
      { id: 'proj-4', title: 'Project 4: Linux System Monitor (Capstone)' },
    ],
  },
  {
    id: 'interview',
    title: 'INTERVIEW PREPARATION',
    items: [
      { id: 'prep-process', title: 'Processes and Threads' },
      { id: 'prep-sync', title: 'Synchronization and Deadlock' },
      { id: 'prep-sched', title: 'Scheduling' },
      { id: 'prep-mem', title: 'Memory and Virtual Memory' },
      { id: 'prep-fs', title: 'File Systems and I/O' },
      { id: 'prep-linux', title: 'Linux and Practical Debugging' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'test-theory', title: 'Theory Test' },
      { id: 'test-code', title: 'Implementation Test' },
      { id: 'test-debug', title: 'Debugging Scenario' },
      { id: 'test-design', title: 'System Design Interview' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [{ id: 'cert-view', title: 'Operating Systems Certificate' }],
  },
];

const OsCoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="Operating Systems"
    courseSubtitle="Processes, memory, file systems and the Linux kernel in practice"
    sidebarSubtitle="Operating Systems"
    storageKey="maxOsIndexRead"
    unlockAfterModuleId="m1"
    unlockModuleName="Module 1: OS Fundamentals"
    renderContent={(moduleId: string, page: number) => {
      if (moduleId === 'overview') return <CourseOverview />;
      return <OsModuleRenderer moduleId={moduleId} page={page} />;
    }}
  />
);

export default OsCoursePage;
