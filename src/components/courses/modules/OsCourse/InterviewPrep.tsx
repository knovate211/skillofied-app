import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

interface QAItem {
  q: string;
  a: string;
}

const FAQS_DATA: Record<number, { title: string; list: QAItem[] }> = {
  1: {
    title: 'Processes and Threads',
    list: [
      {
        q: 'What is the difference between a process and a thread?',
        a: 'A process owns an address space, file descriptors and other kernel resources; a thread is a schedulable flow of execution inside one. Threads of the same process share the heap, globals and open files, and each has its own stack, registers and program counter. The consequence is the whole of concurrency: sharing memory is free, which is exactly why it needs protecting.',
      },
      {
        q: 'What happens on fork()?',
        a: 'The kernel creates a near-copy of the calling process: same code, same open descriptors, a copy of the address space. It returns twice — the child PID in the parent, and 0 in the child — which is how each half knows which it is. The copy is lazy: pages are shared copy-on-write and duplicated only when one side writes.',
      },
      {
        q: 'What is a zombie process, and how do you get rid of one?',
        a: 'A zombie is a process that has exited but whose exit status has not been collected. The kernel keeps the entry so the parent can call wait(); until it does, the PID stays occupied. You cannot kill a zombie — it is already dead. You fix the parent so it reaps, or the parent exits and init adopts and reaps the child.',
      },
      {
        q: 'What is an orphan process?',
        a: 'A process whose parent exited first. It is re-parented to init (PID 1), which waits on its children, so an orphan is harmless — unlike a zombie, which indicates a parent that is running but not reaping.',
      },
      {
        q: 'Compare the IPC mechanisms and say when you would use each.',
        a: 'Pipes: a byte stream between related processes, simple and the natural fit for a shell pipeline. Message queues: discrete messages with priorities, decoupled in time. Shared memory: the fastest, because no copying through the kernel — and the only one that needs its own synchronization. Sockets: the only option that also works across machines.',
      },
    ],
  },
  2: {
    title: 'Synchronization and Deadlock',
    list: [
      {
        q: 'What is a race condition? Give a concrete example.',
        a: 'Two threads access shared state concurrently and at least one writes, so the result depends on timing. The canonical case is count++ — it is a load, an add and a store, and two threads can interleave so both read the same value and one increment is lost. The bug is intermittent by nature, which is what makes it dangerous.',
      },
      {
        q: 'Mutex or semaphore — what is the actual difference?',
        a: 'A mutex is a lock with ownership: whoever takes it must release it, and it protects a critical section. A counting semaphore is a signal with a count and no owner — it can be posted by a different thread than the one that waited, which is what makes it right for producer–consumer signalling. A binary semaphore resembles a mutex but lacks ownership, so it cannot support priority inheritance.',
      },
      {
        q: 'State the four conditions for deadlock.',
        a: 'Mutual exclusion, hold and wait, no preemption, and circular wait. All four must hold simultaneously, which is the whole basis of prevention — break any one and deadlock becomes impossible. In practice the practical one to break is circular wait, by imposing a global lock ordering.',
      },
      {
        q: 'Deadlock versus starvation versus livelock?',
        a: 'Deadlock: a set of processes blocked forever, each waiting on another in the cycle; nothing progresses and nothing runs. Starvation: a process is runnable but never scheduled, typically under strict priority. Livelock: processes are running and changing state, but no work completes — two threads politely backing off in lockstep.',
      },
      {
        q: 'Why is Peterson’s solution not used in real systems?',
        a: 'It is correct on a sequentially consistent machine with two processes, and real CPUs are neither. Compilers and processors reorder memory operations, so it needs memory barriers to work at all, and it does not generalise cleanly past two threads. It is taught because it proves mutual exclusion is achievable with ordinary loads and stores — not as production advice.',
      },
    ],
  },
  3: {
    title: 'Scheduling',
    list: [
      {
        q: 'Preemptive or non-preemptive — what changes?',
        a: 'Non-preemptive schedulers only switch when a process blocks or exits, so one long CPU-bound job monopolises the machine. Preemptive schedulers can take the CPU back on a timer interrupt, which is what makes an interactive system possible. The cost is that every shared data structure is now concurrently accessible, which is where synchronization requirements come from.',
      },
      {
        q: 'Why is SJF optimal, and why can’t you use it?',
        a: 'SJF provably minimises average waiting time: running a short job before a long one reduces the long job’s wait by less than it reduces the short one’s. It is unusable because it needs the next burst length in advance, which nothing knows. Real schedulers estimate it from recent history (exponential averaging) — and it starves long jobs.',
      },
      {
        q: 'How do you choose a Round Robin time quantum?',
        a: 'Too large and it degenerates into FCFS; too small and context-switch overhead dominates — with a switch costing microseconds, a quantum of the same order wastes half the CPU. The usual rule is that roughly 80% of CPU bursts should finish inside one quantum, which in practice puts it in the tens of milliseconds.',
      },
      {
        q: 'What problem does a multilevel feedback queue solve?',
        a: 'It classifies processes by observed behaviour instead of asking the programmer to declare it. A job that uses its whole quantum is demoted toward longer-quantum, lower-priority queues; a job that blocks early stays high. So interactive work stays responsive and CPU-bound work still progresses, without anyone specifying which is which. Ageing promotes starved jobs back up.',
      },
      {
        q: 'Define waiting, turnaround and response time.',
        a: 'Turnaround = completion − arrival: total time in the system. Waiting = turnaround − burst: time spent ready but not running. Response = first run − arrival: how long before the process got the CPU at all. Interactive systems optimise response time; batch systems optimise turnaround, and the two pull in opposite directions.',
      },
    ],
  },
  4: {
    title: 'Memory and Virtual Memory',
    list: [
      {
        q: 'Walk me through translating a virtual address.',
        a: 'Split the address into a page number and an offset. Check the TLB for that page number; on a hit you get the frame number immediately. On a miss, walk the page table (multi-level on real hardware), find the frame, and load the TLB. Physical address = frame base + offset. If the entry is not present, the MMU raises a page fault and the kernel takes over.',
      },
      {
        q: 'Internal versus external fragmentation?',
        a: 'Internal is waste inside an allocated block — you asked for 5KB, got a 8KB page, and 3KB is unusable. External is free memory that exists but is split into pieces too small to satisfy a request. Paging eliminates external fragmentation entirely (any frame fits any page) at the cost of some internal fragmentation in the last page.',
      },
      {
        q: 'What exactly happens on a page fault?',
        a: 'The MMU traps to the kernel. The kernel checks whether the access is legal — if not, SIGSEGV. If legal, it finds a free frame, evicting one if necessary (writing it out first if dirty), reads the page from disk or the swap file, updates the page table and the TLB, and restarts the faulting instruction. The process never knows it happened, except in time.',
      },
      {
        q: 'What is thrashing and how do you detect it?',
        a: 'The system spends more time paging than executing: CPU utilisation collapses while disk I/O saturates. It happens when the combined working sets exceed physical memory, so every process steals frames from another. The tell is the counter-intuitive pair — low CPU and high disk. Adding more processes makes it worse, which is why the fix is to reduce the degree of multiprogramming or add RAM.',
      },
      {
        q: 'Why does Belady’s anomaly occur in FIFO but not LRU?',
        a: 'In FIFO, adding a frame can increase faults because eviction order is unrelated to usage — the larger frame set can evict a page that is about to be referenced. LRU is a stack algorithm: the set of pages in N frames is always a subset of the set in N+1 frames, so more frames can never cause more faults.',
      },
    ],
  },
  5: {
    title: 'File Systems and I/O',
    list: [
      {
        q: 'What is an inode and what is not in it?',
        a: 'An inode holds a file’s metadata — type, permissions, owner, timestamps, size, link count and the block pointers — and is identified by number. What it does not hold is the name: names live in directory entries, which map a name to an inode number. That separation is exactly what makes hard links possible.',
      },
      {
        q: 'Hard link versus symbolic link?',
        a: 'A hard link is another directory entry pointing at the same inode, so both names are equally real and the data survives until the link count reaches zero. A symlink is a small file containing a path; it can cross filesystems and point at directories, but it dangles if the target is removed. Deleting the original breaks a symlink and does nothing to a hard link.',
      },
      {
        q: 'Compare the file allocation methods.',
        a: 'Contiguous: fastest sequential and random access, but suffers external fragmentation and needs the final size up front. Linked: no fragmentation and grows freely, but random access is O(n) and one bad pointer loses the tail. Indexed (inodes): an index block holds the pointers, giving direct random access, with multi-level indirection for large files — which is why Unix filesystems use it.',
      },
      {
        q: 'What does journaling actually protect?',
        a: 'It makes metadata updates crash-consistent. A file operation touches several structures — bitmap, inode, directory entry — and a crash between them leaves the filesystem incoherent. The journal records the intent first, so recovery replays or discards a whole transaction rather than running a full fsck. Note that the common default journals metadata only, not your file data.',
      },
      {
        q: 'Explain the disk scheduling algorithms and when SCAN wins.',
        a: 'FCFS is fair and slow. SSTF always takes the nearest request, which is efficient but starves the edges of the disk. SCAN (the elevator) sweeps in one direction servicing everything, then reverses — bounded waiting and good throughput. C-SCAN returns to the start without servicing, which makes wait times more uniform. On an SSD most of this is moot: there is no seek to optimise.',
      },
    ],
  },
  6: {
    title: 'Linux and Practical Debugging',
    list: [
      {
        q: 'A process is stuck. How do you find out why?',
        a: 'Check its state in ps — D means uninterruptible sleep, almost always blocked I/O; Z means it is already dead and unreaped. Read /proc/[pid]/status and /proc/[pid]/stack, then strace it to see the syscall it is sitting in. If it is D-state on NFS or a failing disk, no signal will move it, which is itself the answer.',
      },
      {
        q: 'What is the difference between SIGKILL and SIGTERM?',
        a: 'SIGTERM is a request: the process can catch it, flush, close files and exit cleanly. SIGKILL cannot be caught, blocked or ignored — the kernel destroys the process without letting it run another instruction, so buffers are lost and locks may be left held. Always try TERM first; KILL is for a process that has stopped responding to it.',
      },
      {
        q: 'The server is out of memory but nothing looks big in top. Where did it go?',
        a: 'Check whether it is actually used or cached — free -m separates them, and page cache is reclaimable, not lost. Then look for many small processes rather than one large one, unreaped children, or a leak in kernel slab (slabtop). RSS in top also double-counts shared memory across processes, so summing it overstates real usage.',
      },
      {
        q: 'What do you learn from /proc/stat that top does not show you directly?',
        a: 'The raw cumulative jiffies per CPU state since boot — user, nice, system, idle, iowait, irq, softirq, steal. Utilisation is the delta between two samples, not a single reading. High steal tells you the hypervisor is taking your CPU; high iowait tells you the CPU is idle waiting on disk, which is a storage problem, not a CPU one.',
      },
      {
        q: 'How do containers isolate processes, given there is only one kernel?',
        a: 'Namespaces partition what a process can see — PID, mount, network, UTS, IPC, user — so a container gets its own PID 1 and its own filesystem view. cgroups limit what it can consume: CPU shares, memory ceiling, I/O bandwidth. There is no second kernel and no virtual hardware, which is why containers start in milliseconds and why a kernel exploit escapes them.',
      },
    ],
  },
};

const InterviewPrep: React.FC<Props> = ({ page }) => {
  const section = FAQS_DATA[page];

  if (!section) {
    return <div className={styles.tabContent}>Section not found</div>;
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{section.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '18px' }}>
        {section.list.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              background: 'var(--bg-surface-2)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}
          >
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
              {item.q}
            </p>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
