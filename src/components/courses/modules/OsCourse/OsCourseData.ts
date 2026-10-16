import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  /** A fuller worked example, shown under its own heading with its output. */
  codeExample?: string;
  codeOutput?: string;
  /** Pitfalls called out in an amber callout below the example. */
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
  /** Overrides the renderer's default highlighting for this lesson's example. */
  language?: string;
  snippetTitle?: string;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    // This course is multiple choice only: every prompt is kind:'mcq'. The
    // wider AssignmentQuestion type also allows 'code' and 'text', which other
    // courses use — do not introduce them here.
    prompts: AssignmentQuestion[];
  };
}

/**
 * Operating Systems curriculum.
 *
 * Assessment is multiple choice throughout — both the module quiz and the
 * practice set. Questions are written to test whether the learner can reason
 * about a real situation ("free -h shows almost no free memory, what do you
 * conclude?"), not whether they can recite a definition. Distractors are the
 * beliefs people actually hold, so a wrong answer is diagnostic.
 *
 * Lesson code examples stay: C-style C++ where the kernel interface is the
 * point (fork, exec, pthreads, signals — the sandbox genuinely runs all of
 * these, so the examples are real programs rather than pseudocode), and bash
 * where the lesson is about observing a live machine. They are there to be read
 * and run by the learner on their own box; nothing is graded on them.
 *
 * Every codeOutput is the verbatim output of running the example. Keep it that
 * way: if you edit an example, run it and paste the real output back.
 */
export const OS_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: OS FUNDAMENTALS',
    overview:
      'What an operating system actually does, where the boundary between your code and the kernel sits, and how a machine gets from power-on to a login prompt.',
    outcomes: [
      'Explain the OS as a resource manager and a hardware abstraction',
      'Describe the user/kernel boundary and why it is enforced in hardware',
      'Trace a system call from library function to kernel and back',
      'Compare monolithic, microkernel and hybrid designs on real trade-offs',
    ],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 What an Operating System Is',
        objectives: [
          'Define the OS by the two jobs it actually does.',
          'Explain why applications cannot simply talk to hardware.',
          'Recognise the OS behind everyday program behaviour.',
        ],
        theory:
          'An operating system does two jobs. It is an abstraction layer, turning wildly different hardware into one uniform interface — you call write() and neither know nor care whether the target is an NVMe SSD, a network socket or a terminal. And it is a resource manager, deciding which process gets the CPU next, which pages stay in memory, and whose I/O request the disk serves first.\nThe abstraction is what makes portable software possible. Without it, every program would need a driver for every disk controller ever made, and adding hardware would mean recompiling your applications. With it, the kernel owns that knowledge once and exposes a stable interface above it.\nThe resource management is what makes a shared machine possible. Hundreds of processes believe they have the CPU and a private, contiguous memory space. All of them are wrong, and the OS maintains the illusion — timeslicing the CPU so fast that everything appears simultaneous, and mapping each process\'s addresses onto whatever physical frames happen to be free.\nThe reason this matters to you as a developer is that the illusion leaks. When it leaks you see a page fault storm, a process stuck in D state, a context-switch storm, a deadlock. Those are not exotic failures — they are the OS becoming visible, and you cannot debug them without knowing what it was hiding.',
        callout: {
          lead: 'Think of it like this:',
          text: 'The OS sells every process the same lie — "the machine is yours" — and spends all its time keeping the lie consistent.',
        },
        codeExample: `# Every one of these commands is asking the OS about an illusion it maintains.

$ nproc                       # how many CPUs the scheduler is juggling
8

$ ps -e --no-headers | wc -l  # processes that all think they have a CPU
412

$ free -h                     # physical memory behind every "private" address space
               total        used        free      shared  buff/cache
Mem:            15Gi       6.1Gi       1.2Gi       412Mi       8.4Gi
Swap:          2.0Gi       128Mi       1.9Gi

# 412 processes, 8 CPUs. At any instant at most 8 are running.
# The other 404 are being convincingly lied to.`,
        codeOutput: `8
412
               total        used        free      shared  buff/cache
Mem:            15Gi       6.1Gi       1.2Gi       412Mi       8.4Gi
Swap:          2.0Gi       128Mi       1.9Gi`,
        language: 'bash',
        snippetTitle: 'illusions.sh',
        sidePanel: {
          title: 'The two jobs',
          bulletsTitle: 'Everything the kernel does falls under one of these',
          bullets: [
            { label: 'Abstraction', text: 'One interface over many devices — files, sockets and pipes all answer read() and write().' },
            { label: 'CPU management', text: 'Scheduling and context switching, so more processes than cores appear to run at once.' },
            { label: 'Memory management', text: 'Virtual addresses mapped to physical frames, with isolation enforced by hardware.' },
            { label: 'Storage', text: 'Blocks on a device presented as named files in a directory tree.' },
            { label: 'Protection', text: 'Processes cannot read each other\'s memory or drive hardware directly.' },
          ],
        },
        mistakes: [
          'Calling the OS "the desktop you see". The GUI is an ordinary application; the kernel is the part with privileged access to hardware.',
          'Assuming free memory should be high. Linux deliberately uses spare RAM as page cache — the buff/cache column is available, not lost.',
        ],
        takeaways: [
          'The OS is an abstraction layer and a resource manager — every feature serves one of those two jobs.',
          'Each process is given the illusion of a private CPU and private contiguous memory.',
          'Most hard production bugs are that illusion leaking, which is why the mechanism matters.',
        ],
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 Kernel Space and User Space',
        objectives: [
          'Explain what the CPU privilege bit actually controls.',
          'Say why isolation is enforced by hardware rather than convention.',
          'Read a segmentation fault as a protection mechanism working.',
        ],
        theory:
          'The CPU has at least two privilege levels. In kernel mode every instruction is legal: you can talk to devices, edit page tables, disable interrupts. In user mode the privileged instructions simply fail — the hardware refuses them. The kernel runs in kernel mode; everything else runs in user mode. This is not a software convention that a clever program can talk its way around; it is a bit in a register that only the kernel can change.\nThat single bit is the whole basis of protection. Because your process runs in user mode, it cannot write to another process\'s memory, cannot reprogram the disk controller, and cannot turn off the timer interrupt that will eventually preempt it. A buggy program crashes itself rather than the machine, which is a property Windows 95 famously did not have.\nMemory is split along the same line. Each process has its own address space with the kernel mapped into a region it cannot touch. When your code dereferences a bad pointer, the MMU notices the access is not permitted, raises a fault, and the kernel kills your process with SIGSEGV. A segfault is not the protection failing — it is the protection working exactly as designed.\nCrossing the boundary is therefore deliberate and controlled. There is exactly one legitimate door: the system call, which the next lesson covers. The cost of that crossing is why "syscall overhead" appears in performance discussions at all.',
        callout: {
          lead: 'Think of it like this:',
          text: 'User mode is a padded room. The door is the system call, and the kernel decides what comes through it.',
        },
        codeExample: `/* A user-mode process cannot touch kernel memory. The hardware stops it,
 * not the compiler and not a runtime check. */
#include <stdio.h>

int main(void) {
    /* A plausible kernel-space address on x86-64 Linux. */
    int *kernel_ptr = (int *)0xffffffff81000000;

    printf("about to read kernel memory...\\n");
    fflush(stdout);            /* flush first: the next line never returns */

    int value = *kernel_ptr;   /* MMU: access denied -> page fault -> SIGSEGV */

    printf("read %d (this line is unreachable)\\n", value);
    return 0;
}`,
        codeOutput: `about to read kernel memory...
Segmentation fault (core dumped)`,
        sidePanel: {
          title: 'The privilege boundary',
          bulletsTitle: 'What changes when you cross it',
          bullets: [
            { label: 'User mode', text: 'Ordinary instructions only. No device access, no page-table edits, no disabling interrupts.' },
            { label: 'Kernel mode', text: 'Full access to hardware and all physical memory.' },
            { label: 'The door', text: 'System calls — the only sanctioned way in. Interrupts and faults also switch mode, but not at your request.' },
            { label: 'Enforcement', text: 'A CPU privilege bit plus MMU page permissions. Hardware, not honour.' },
            { label: 'SIGSEGV', text: 'The MMU caught an illegal access and the kernel killed the offender. Working as intended.' },
          ],
        },
        mistakes: [
          'Reading "kernel space" as a separate machine. It is mapped into every process\'s address space — just marked inaccessible from user mode.',
          'Believing a segfault means memory is corrupt. It means an access was refused; the memory is fine and your pointer was not.',
        ],
        takeaways: [
          'A CPU privilege bit, not a software rule, is what separates user code from the kernel.',
          'Isolation is enforced by hardware — the MMU and the privilege level — so a buggy process cannot take down the machine.',
          'A segmentation fault is the protection mechanism succeeding, not failing.',
        ],
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 System Calls',
        objectives: [
          'Trace a system call from library wrapper to kernel and back.',
          'Explain why a syscall costs more than a function call.',
          'Use strace to see the real calls a program makes.',
        ],
        theory:
          'A system call is a request for the kernel to do something your process is not permitted to do itself. Opening a file, sending on a socket, allocating memory, creating a process — all of it goes through this one mechanism.\nThe sequence is fixed. Your code calls a library wrapper such as read(), which places the syscall number in a register, puts the arguments in others, and executes a special instruction (syscall on x86-64). That instruction switches the CPU to kernel mode and jumps to a fixed entry point — your process cannot choose where it lands, which is what makes the door safe. The kernel validates every argument, does the work, places a return value in a register and returns, switching back to user mode. A negative return is turned into -1 and errno by the wrapper.\nThe cost is real but often overstated. A syscall is not a context switch — you are not scheduling another process — but it does mean a mode switch, saving and restoring registers, and cache and TLB effects. Hundreds of nanoseconds rather than the single nanosecond of a function call. That is exactly why buffered I/O exists: writing a file byte by byte costs one syscall per byte, while a buffered writer batches thousands of bytes into one.\nThe practical skill here is strace. It prints every syscall a process makes with its arguments and return value — and when a program mysteriously fails to find a config file or hangs, strace usually shows you the exact failing call in seconds.',
        callout: {
          lead: 'Think of it like this:',
          text: 'printf() is your code. write() is you asking the kernel, politely and through the only door, to actually put bytes somewhere.',
        },
        codeExample: `# What a trivial program really asks the kernel for.

$ cat hello.c
#include <stdio.h>
int main(void) { printf("hello\\n"); return 0; }

$ gcc hello.c -o hello && strace -e trace=openat,read,write,close ./hello
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
read(3, "\\177ELF\\2\\1\\1\\3\\0\\0\\0\\0\\0\\0\\0\\0\\3\\0>\\0\\1\\0\\0\\0"..., 832) = 832
close(3)                                = 0
openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\\177ELF\\2\\1\\1\\3\\0\\0\\0\\0\\0\\0\\0\\0\\3\\0>\\0\\1\\0\\0\\0"..., 832) = 832
close(3)                                = 0
write(1, "hello\\n", 6hello
)                  = 6
+++ exited with 0 +++

# Note: ONE write(), not five. printf buffered the string and flushed once.
# Note also how much work happens before main() — that is the dynamic linker.`,
        codeOutput: `write(1, "hello\\n", 6hello
)                  = 6
+++ exited with 0 +++`,
        language: 'bash',
        snippetTitle: 'strace-hello.sh',
        sidePanel: {
          title: 'Anatomy of a syscall',
          diagram: undefined,
          bulletsTitle: 'read(fd, buf, 4096) step by step',
          bullets: [
            { label: '1. Wrapper', text: 'libc puts the syscall number and arguments into registers.' },
            { label: '2. Trap', text: 'The syscall instruction switches to kernel mode at a fixed entry point.' },
            { label: '3. Validate', text: 'The kernel checks the fd, the buffer address and the length. Never trusts user input.' },
            { label: '4. Work', text: 'Copy from page cache, or block and let the scheduler run someone else.' },
            { label: '5. Return', text: 'Back to user mode with a count, or a negative code that becomes -1 and errno.' },
          ],
        },
        mistakes: [
          'Confusing a system call with a context switch. A syscall is a mode switch in the same process; only blocking may cause a context switch.',
          'Writing unbuffered byte-at-a-time I/O in a loop. That is one syscall per byte and is thousands of times slower than buffering.',
          'Ignoring the return value of write(). A short write is legal and common on sockets — it is not an error, it means call it again.',
        ],
        takeaways: [
          'The system call is the only sanctioned path from user mode into the kernel.',
          'Its cost is a mode switch plus argument validation — cheap individually, ruinous in a tight loop.',
          'strace shows the real calls a program makes and is the fastest way to find where it is actually failing.',
        ],
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 OS Services and Components',
        objectives: [
          'Name the major kernel subsystems and what each owns.',
          'Distinguish kernel components from the userland around them.',
          'Locate where a given problem is likely to live.',
        ],
        theory:
          'It helps to have a map. The process manager owns creation, termination, scheduling and signals — it answers "who runs next". The memory manager owns the virtual address space, page tables, allocation and swapping. The filesystem layer turns blocks into named files, usually behind a virtual filesystem switch so ext4, XFS and NFS all answer the same interface. The I/O subsystem owns device drivers, interrupt handling and buffering. The networking stack implements the protocols and the socket interface. Underneath them all sits an inter-process communication layer — pipes, signals, shared memory, sockets.\nA great deal of what people call "the operating system" is not the kernel at all. The shell, the C library, systemd, the package manager, the window server, the compiler toolchain — all of these are ordinary user-mode programs. They are essential to using the system and entirely replaceable. This is why "Linux" is technically only the kernel and a distribution is the kernel plus everything else.\nThe map matters for diagnosis. A process that will not die is a process-management question. A machine that grinds while the disk light stays on is memory management, specifically swapping. A file that cannot be deleted although it exists is filesystem permissions. Knowing which subsystem owns the symptom tells you which tool to reach for, and that is most of the speed difference between engineers debugging the same outage.',
        callout: {
          lead: 'Think of it like this:',
          text: 'The kernel is a small set of managers with hard boundaries. Naming the right manager is most of the debugging.',
        },
        codeExample: `# The subsystems, and where each one exposes itself on a Linux box.

$ ls /proc/self/                # process manager: this process, as files
cmdline  cwd  environ  exe  fd  limits  maps  stat  status  task

$ cat /proc/meminfo | head -4   # memory manager
MemTotal:       16116944 kB
MemFree:         1264872 kB
MemAvailable:    9028416 kB
Buffers:          312460 kB

$ cat /proc/filesystems | head -3   # VFS: what this kernel can mount
nodev	sysfs
nodev	proc
	ext3

$ ls /sys/class/net/            # networking: interfaces the stack knows about
enp3s0  lo  wlp2s0

$ lsmod | head -3               # I/O: loadable drivers currently in the kernel
Module                  Size  Used by
nvme                   49152  3
i915                 2842624  11`,
        codeOutput: `cmdline  cwd  environ  exe  fd  limits  maps  stat  status  task
MemTotal:       16116944 kB
MemFree:         1264872 kB
enp3s0  lo  wlp2s0`,
        language: 'bash',
        snippetTitle: 'subsystems.sh',
        sidePanel: {
          title: 'Symptom → subsystem',
          bulletsTitle: 'Where to look first',
          bullets: [
            { label: 'Process will not die', text: 'Process management. Check state in ps — D means blocked in the kernel on I/O.' },
            { label: 'Machine crawls, disk busy', text: 'Memory management. Almost always swapping; check si/so in vmstat.' },
            { label: 'Permission denied', text: 'Filesystem. Check mode bits, ownership, and whether the mount is read-only.' },
            { label: 'Connection refused', text: 'Networking. Nothing is listening on that port, or a firewall rejected it.' },
            { label: 'Device missing', text: 'I/O and drivers. Check dmesg and whether the module is loaded.' },
          ],
        },
        mistakes: [
          'Treating the shell or the desktop as part of the kernel. They are user-mode programs and can be swapped out entirely.',
          'Forgetting the VFS layer exists, then being surprised that a file on NFS behaves differently from one on ext4 despite the identical API.',
        ],
        takeaways: [
          'The kernel divides into process, memory, filesystem, I/O and networking subsystems, plus IPC.',
          'Most of a "operating system" by volume is user-mode software around the kernel, not the kernel.',
          'Mapping a symptom to the owning subsystem is the fastest route to the right diagnostic tool.',
        ],
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 Kernel Architectures',
        objectives: [
          'Compare monolithic and microkernel designs on their real trade-offs.',
          'Explain why the mainstream settled on hybrids.',
          'Relate the debate to modern modules and userspace drivers.',
        ],
        theory:
          'A monolithic kernel runs every subsystem — scheduler, memory manager, filesystems, drivers, network stack — in kernel mode, in one address space. Calls between subsystems are ordinary function calls, which makes it fast. The cost is blast radius: a bug in any driver is a bug with full kernel privileges, and a bad one takes down the machine.\nA microkernel keeps only the bare minimum in kernel mode — scheduling, memory, IPC — and pushes filesystems, drivers and networking into ordinary user-mode processes. A crashed driver now takes down a restartable service rather than the system, and the trusted computing base shrinks to something you could plausibly verify. The cost is that every cross-subsystem call becomes IPC with message passing and mode switches instead of a function call. Early microkernels were slow enough that the argument looked settled.\nThe honest answer is that both won something. Linux is monolithic but loads drivers as modules at runtime and has steadily moved risky drivers to userspace (FUSE for filesystems, and userspace USB and network drivers). Windows and macOS are hybrids: microkernel-influenced structure with performance-critical services kept in kernel mode. Genuinely strict microkernels dominate where a crash is unacceptable — seL4 in avionics and secure enclaves.\nThe modern version of the debate is not academic. Every time you choose between a FUSE filesystem and a kernel one, or run a network function in userspace with DPDK, you are trading the same isolation against the same overhead.',
        callout: {
          lead: 'Think of it like this:',
          text: 'Monolithic puts everyone in one room so they can shout across it. Microkernel gives everyone an office and makes them send email.',
        },
        codeExample: `# Linux is monolithic — but loadable, which is most of the practical benefit.

$ lsmod | head -5
Module                  Size  Used by
xfs                  2179072  1
nvme                    49152  3
kvm_intel             376832  0
i915                  2842624  11

# Every one of those runs in kernel mode with full privileges.
# A null-pointer bug in any of them is a kernel panic, not a crashed program.

$ sudo modprobe -r kvm_intel      # unload without rebooting
$ sudo modprobe kvm_intel         # and back

# The microkernel-flavoured escape hatch: filesystems in userspace.
$ sshfs user@host:/data /mnt/data   # a *process* implements this filesystem
$ ps -o comm= -C sshfs
sshfs
# If it crashes, the mount breaks. The kernel does not.`,
        codeOutput: `Module                  Size  Used by
xfs                  2179072  1
nvme                    49152  3
kvm_intel             376832  0
i915                  2842624  11
sshfs`,
        language: 'bash',
        snippetTitle: 'architectures.sh',
        sidePanel: {
          title: 'The trade-off',
          bulletsTitle: 'Monolithic vs microkernel',
          bullets: [
            { label: 'Speed', text: 'Monolithic wins — function calls, not message passing across a mode switch.' },
            { label: 'Isolation', text: 'Microkernel wins — a failed driver is a restartable process, not a panic.' },
            { label: 'Trusted base', text: 'Microkernel wins — thousands of lines to verify rather than millions.' },
            { label: 'Complexity', text: 'Monolithic is simpler to write, harder to reason about safely.' },
            { label: 'Reality', text: 'Linux, Windows and macOS are all pragmatic hybrids.' },
          ],
        },
        mistakes: [
          'Asserting microkernels "lost". They dominate safety-critical and high-assurance systems, where a panic is unacceptable at any speed.',
          'Thinking loadable modules make Linux a microkernel. Modules still run in kernel mode with full privileges — only the loading is dynamic.',
        ],
        takeaways: [
          'Monolithic kernels trade isolation for speed; microkernels trade speed for isolation and a small trusted base.',
          'Mainstream systems are hybrids, and Linux has steadily moved risky drivers toward userspace.',
          'The same trade-off recurs whenever you choose FUSE over a kernel filesystem or userspace networking over the kernel stack.',
        ],
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 The Boot Process',
        objectives: [
          'Sequence the stages from power-on to a usable system.',
          'Explain why booting is a chain of progressively larger loaders.',
          'Know which stage a boot failure implicates.',
        ],
        theory:
          'Booting is a bootstrapping problem: the kernel lives on a disk the machine does not yet know how to read. The solution is a chain, each stage just capable enough to load the next.\nFirmware runs first, from ROM — BIOS on older machines, UEFI on modern ones. It initialises the CPU and memory, runs power-on self-test, enumerates hardware and finds something bootable. On UEFI that means reading the EFI System Partition, an actual FAT filesystem, and running a bootloader executable from it — which is why UEFI does not need the 512-byte MBR contortions BIOS did.\nThe bootloader — GRUB on most Linux systems — presents the menu, then loads two things into memory: the kernel image and an initial ramdisk. The initramfs exists to solve a chicken-and-egg problem. The kernel needs a driver to read the root filesystem, but that driver may live on the root filesystem. The initramfs is a small self-contained filesystem in memory carrying exactly the modules needed to reach the real root.\nThe kernel then takes over: decompresses itself, sets up memory management and interrupts, mounts the initramfs, loads storage drivers, mounts the real root filesystem, and pivots to it. Finally it starts exactly one user-space process — PID 1, systemd on most distributions — and its own job is done. PID 1 brings up everything else: mounts remaining filesystems, starts services in dependency order, and eventually gives you a login prompt.\nThis chain is a diagnostic tool. No firmware screen is a hardware or firmware fault. A GRUB prompt instead of a menu means the bootloader loaded but its config did not. "Kernel panic — unable to mount root" means the kernel ran but the initramfs lacked the right driver. Reaching a login prompt with a failed service is entirely a systemd problem.',
        callout: {
          lead: 'Think of it like this:',
          text: 'Each boot stage is just big enough to load the next one. The initramfs exists solely because the kernel needs a driver that lives behind the driver.',
        },
        codeExample: `# Reading the boot you are currently sitting in.

$ systemd-analyze
Startup finished in 4.129s (firmware) + 2.801s (loader) + 1.933s (kernel)
                       + 6.214s (userspace) = 15.078s

$ systemd-analyze blame | head -4      # which units cost the most
          3.881s NetworkManager-wait-online.service
          1.204s docker.service
           612ms snapd.service
           388ms systemd-journal-flush.service

$ cat /proc/cmdline                     # what the bootloader passed the kernel
BOOT_IMAGE=/vmlinuz-6.8.0-45-generic root=UUID=1f3c-...-9ab2 ro quiet splash

$ ls /boot/                             # the pieces GRUB loads
config-6.8.0-45-generic  initrd.img-6.8.0-45-generic  vmlinuz-6.8.0-45-generic

$ ps -p 1 -o pid,comm=                  # the one process the kernel starts
      1 systemd`,
        codeOutput: `Startup finished in 4.129s (firmware) + 2.801s (loader) + 1.933s (kernel)
                       + 6.214s (userspace) = 15.078s
          3.881s NetworkManager-wait-online.service
BOOT_IMAGE=/vmlinuz-6.8.0-45-generic root=UUID=1f3c-...-9ab2 ro quiet splash
      1 systemd`,
        language: 'bash',
        snippetTitle: 'boot.sh',
        sidePanel: {
          title: 'The boot chain',
          bulletsTitle: 'Where a failure points',
          bullets: [
            { label: 'Firmware (BIOS/UEFI)', text: 'POST, hardware init, find a boot device. No output at all = hardware or firmware.' },
            { label: 'Bootloader (GRUB)', text: 'Loads kernel + initramfs. A bare grub> prompt = config or partition problem.' },
            { label: 'Kernel', text: 'Decompress, init subsystems, mount initramfs. Panic here = missing driver for root.' },
            { label: 'initramfs', text: 'Temporary root carrying storage drivers, then pivots to the real one.' },
            { label: 'PID 1 (systemd)', text: 'Mounts, services, targets. Login prompt + failed service = purely userspace.' },
          ],
        },
        mistakes: [
          'Assuming the kernel starts all services. It starts exactly one process — PID 1 — and everything else is that process\'s work.',
          'Forgetting the initramfs when building a custom kernel. Compile the storage or filesystem driver as a module without including it, and the kernel cannot mount root.',
        ],
        takeaways: [
          'Boot is a chain — firmware, bootloader, kernel, initramfs, PID 1 — each stage loading the next.',
          'The initramfs exists to break the circular dependency between the root filesystem and its own driver.',
          'How far the machine gets tells you precisely which stage to investigate.',
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary purpose of the CPU privilege bit (kernel mode vs user mode)?',
        options: [
          "To enforce, in hardware, that ordinary processes cannot execute privileged instructions or touch kernel memory",
          "To let the kernel run faster by skipping the memory checks that user code must pass",
          "To decide which process the scheduler runs next",
          "To separate 32-bit and 64-bit programs so each uses the correct instruction set",
        ],
        correctAnswer:
          'To enforce, in hardware, that ordinary processes cannot execute privileged instructions or touch kernel memory',
      },
      {
        id: 2,
        question: 'Why does the initramfs exist?',
        options: [
          "It caches the compressed kernel image in RAM so later boots skip reading the disk entirely",
          "The driver needed to read the root filesystem may itself live on the root filesystem, so a temporary in-memory root breaks the circular dependency",
          "It stores the GRUB configuration so the bootloader can find the kernel on an unmounted disk",
          "It provides temporary swap space so the kernel can decompress itself before the real swap partition is mounted",
        ],
        correctAnswer:
          'The driver needed to read the root filesystem may itself live on the root filesystem, so a temporary in-memory root breaks the circular dependency',
      },
      {
        id: 3,
        question: 'A system call is best described as:',
        options: [
          "A context switch from one process to another",
          "An ordinary function call into libc, which runs the work in user mode",
          "A controlled entry into kernel mode at a fixed entry point, used to request privileged work",
          "An asynchronous interrupt raised by a hardware device when it needs the CPU",
        ],
        correctAnswer: 'A controlled entry into kernel mode at a fixed entry point, used to request privileged work',
      },
      {
        id: 4,
        question: 'Which statement about monolithic and microkernel designs is accurate?',
        options: [
          "Microkernels are faster, because a smaller kernel fits in cache and avoids the overhead of loading large drivers",
          "Monolithic kernels must be rebuilt and rebooted to add drivers, while microkernels load them live",
          "Microkernels run device drivers in kernel mode for speed",
          "Monolithic kernels are faster because subsystems call each other directly; microkernels isolate failures at the cost of IPC overhead",
        ],
        correctAnswer:
          'Monolithic kernels are faster because subsystems call each other directly; microkernels isolate failures at the cost of IPC overhead',
      },
      {
        id: 5,
        question: 'A process dereferences an invalid pointer and receives SIGSEGV. What happened?',
        options: [
          "The MMU detected an access the page permissions forbid and faulted; the kernel terminated the process",
          "Physical memory at that address is corrupted, so the kernel stops the process to protect other data",
          "The kernel ran out of memory and killed the process to reclaim it",
          "The scheduler preempted the process while it held a lock, leaving the pointer invalid",
        ],
        correctAnswer: 'The MMU detected an access the page permissions forbid and faulted; the kernel terminated the process',
      },
      {
        id: 6,
        question: 'How many processes does the Linux kernel start directly at the end of boot?',
        options: [
          'One per CPU core',
          'Exactly one — PID 1 — which then starts everything else',
          'All services listed in the default systemd target',
          'None; the bootloader starts the first process',
        ],
        correctAnswer: 'Exactly one — PID 1 — which then starts everything else',
      },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt:
            'A program writes 100,000 bytes one byte at a time with no buffering, then the same 100,000 bytes through a 4096-byte buffer. How many write() system calls does each make?',
          options: [
            '100,000 for both — buffering does not change the number of syscalls',
            '1 unbuffered and 25 buffered',
            '100,000 unbuffered and 25 buffered — the buffer flushes only when full',
            '25 for both — the kernel merges adjacent writes automatically',
          ],
          correctAnswer: '100,000 unbuffered and 25 buffered — the buffer flushes only when full',
        },
        {
          kind: 'mcq',
          prompt:
            'A program is failing with "config not found" but the file clearly exists. Which tool tells you fastest what path it is actually opening?',
          options: [
            "top, which shows CPU usage per process",
            "lsof, which lists every file the process currently has open",
            "lsmod, which lists loaded kernel modules",
            "strace, which prints every syscall with its arguments and return value",
          ],
          correctAnswer: 'strace, which prints every syscall with its arguments and return value',
        },
        {
          kind: 'mcq',
          prompt: 'The machine shows no firmware splash and no GRUB menu at power-on. Which stage is implicated?',
          options: [
            "Firmware or hardware — nothing has got as far as the bootloader",
            "The initramfs is missing a storage driver",
            "systemd failed to reach the default target",
            "The root filesystem is corrupt, so the bootloader has nothing to hand to",
          ],
          correctAnswer: 'Firmware or hardware — nothing has got as far as the bootloader',
        },
        {
          kind: 'mcq',
          prompt:
            'A process dereferences a pointer into kernel address space. What stops it, and at what point?',
          options: [
            "The compiler detects the kernel address and rejects the program at build time",
            "The MMU refuses the access at execution time and raises a fault; the kernel then delivers SIGSEGV",
            "The C library validates every pointer before dereferencing and aborts the process",
            "Nothing stops it — the read succeeds but returns zeroes",
          ],
          correctAnswer:
            'The MMU refuses the access at execution time and raises a fault; the kernel then delivers SIGSEGV',
        },
        {
          kind: 'mcq',
          prompt:
            'On a healthy Linux server, free -h reports very little free memory but a large buff/cache figure. What should you conclude?',
          options: [
            'The machine is out of memory and will start swapping imminently',
            'A process is leaking memory and should be restarted',
            'Nothing is wrong — page cache is reclaimable, so look at the available column rather than free',
            'The kernel has failed to release memory from exited processes',
          ],
          correctAnswer:
            'Nothing is wrong — page cache is reclaimable, so look at the available column rather than free',
        },
        {
          kind: 'mcq',
          prompt:
            'Linux loads device drivers as modules at runtime. Does that make it a microkernel?',
          options: [
            'Yes — loadable drivers are the defining property of a microkernel',
            'Yes, but only when the module is unloaded again',
            'No — microkernels cannot load drivers at all',
            'No — modules still run in kernel mode with full privileges; only the loading is dynamic',
          ],
          correctAnswer: 'No — modules still run in kernel mode with full privileges; only the loading is dynamic',
        },
      ],
    },
  },
};