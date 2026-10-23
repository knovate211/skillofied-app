import type { ModuleData } from '../JavaCourseData';

const mod_m12: ModuleData = {
  id: 'm12',
  title: 'MODULE 12: MULTITHREADING',
  overview: 'Learn multithreaded systems execution. Differentiate Thread class, Runnable interface, thread synchronization, and thread pools.',
  outcomes: [
    'Create concurrent threads of execution.',
    'Synchronize critical sections to prevent data races.',
    'Use thread pools to manage threads.'
  ],
  lessons: [
    {
      "id": "m12-l1",
      "title": "Lesson 12.1 Introduction to Threads",
      "objectives": [
        "Distinguish processes from threads.",
        "Understand concurrency versus parallelism."
      ],
      "theory": "A **process** is a running program with its own isolated memory. A **thread** is a unit of execution *inside* a process. Every Java program starts with one thread, called `main`.\n\nAll threads in a process share the same heap — the same objects — which is what makes threading both powerful and dangerous. Sharing is free, but two threads touching the same field at the same time is a bug waiting to happen.\n\n**Concurrency** means several tasks are in progress over the same period, interleaved by the scheduler. **Parallelism** means they literally execute at the same instant on different CPU cores. A single-core machine can be concurrent but never parallel.\n\nThreading pays off in two situations: keeping a UI or server responsive while slow I/O is pending, and splitting CPU-bound work across cores. It is not free — each thread costs roughly 1 MB of stack, and context switching has overhead.",
      "syntax": "Thread current = Thread.currentThread();\nSystem.out.println(current.getName());",
      "codeExample": "public class ThreadIntro {\n    public static void main(String[] args) {\n        Thread main = Thread.currentThread();\n\n        System.out.println(\"Thread name     : \" + main.getName());\n        System.out.println(\"Priority        : \" + main.getPriority());\n        System.out.println(\"Is alive        : \" + main.isAlive());\n        System.out.println(\"Available cores : \" + Runtime.getRuntime().availableProcessors());\n\n        main.setName(\"primary-worker\");\n        System.out.println(\"Renamed to      : \" + main.getName());\n    }\n}",
      "codeOutput": "Thread name     : main\nPriority        : 5\nIs alive        : true\nAvailable cores : 8\nRenamed to      : primary-worker",
      "mistakes": [
        "Assuming more threads always means faster. Beyond the core count, CPU-bound work just adds context-switching overhead.",
        "Confusing concurrency with parallelism in interviews — they are related but distinct."
      ],
      "takeaways": [
        "Threads share heap memory but each has its own call stack.",
        "Every Java program has a `main` thread.",
        "Priority is a hint to the scheduler, never a guarantee of ordering."
      ]
    },
    {
      "id": "m12-l2",
      "title": "Lesson 12.2 Creating Threads",
      "objectives": [
        "Create a thread by extending Thread.",
        "Understand why start() and run() differ."
      ],
      "theory": "The first way to create a thread is to **extend the `Thread` class** and override its `run()` method. `run()` holds the code the new thread will execute.\n\nThe single most important distinction in this module: **`start()` versus `run()`**.\n\n- `start()` asks the JVM to allocate a new call stack and schedule a new OS thread, which then invokes `run()`. You get concurrency.\n- `run()` is just a normal method call. It executes on the *current* thread, synchronously. You get no concurrency at all, and nothing warns you.\n\nCalling `start()` twice on the same Thread object throws `IllegalThreadStateException` — a thread cannot be restarted once it has finished.\n\nOutput ordering between threads is **non-deterministic**. Running the same program twice can interleave differently; never write code that depends on a particular interleaving.",
      "syntax": "class Worker extends Thread {\n    public void run() { /* work */ }\n}\nnew Worker().start();   // NOT run()",
      "codeExample": "class Downloader extends Thread {\n    private final String file;\n\n    Downloader(String file) {\n        this.file = file;\n        setName(\"dl-\" + file);\n    }\n\n    @Override\n    public void run() {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(getName() + \" chunk \" + i);\n            try {\n                Thread.sleep(100);\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n                return;\n            }\n        }\n        System.out.println(getName() + \" complete\");\n    }\n}\n\npublic class CreatingThreads {\n    public static void main(String[] args) throws InterruptedException {\n        Downloader a = new Downloader(\"a.zip\");\n        Downloader b = new Downloader(\"b.zip\");\n\n        a.start();\n        b.start();\n\n        a.join();   // wait for a to finish\n        b.join();   // wait for b to finish\n\n        System.out.println(\"All downloads finished.\");\n    }\n}",
      "codeOutput": "dl-a.zip chunk 1\ndl-b.zip chunk 1\ndl-a.zip chunk 2\ndl-b.zip chunk 2\ndl-a.zip chunk 3\ndl-b.zip chunk 3\ndl-a.zip complete\ndl-b.zip complete\nAll downloads finished.",
      "mistakes": [
        "Calling `run()` instead of `start()` — everything executes sequentially on the main thread and the bug is invisible.",
        "Calling `start()` twice on one object, which throws `IllegalThreadStateException`.",
        "Expecting deterministic output ordering across threads."
      ],
      "takeaways": [
        "Extend `Thread`, override `run()`, invoke `start()`.",
        "`start()` creates a new stack; `run()` is an ordinary method call.",
        "`join()` blocks the caller until the target thread terminates."
      ]
    },
    {
      "id": "m12-l3",
      "title": "Lesson 12.3 Runnable Interface",
      "objectives": [
        "Create threads by implementing Runnable.",
        "Explain why Runnable is preferred over extending Thread."
      ],
      "theory": "`Runnable` is a functional interface with a single method, `run()`. You pass an implementation to a `Thread` constructor and the thread runs it.\n\nThis is the **preferred approach**, for three reasons:\n\n1. **Java has single class inheritance.** Extending `Thread` burns your one and only superclass slot. Implementing `Runnable` leaves you free to extend something meaningful.\n2. **Separation of concerns.** `Runnable` describes *the task*; `Thread` is *the worker* that runs it. Keeping them apart is better design.\n3. **Reusability with executors.** Thread pools (`ExecutorService`) accept `Runnable`, not `Thread` subclasses. Code written against `Runnable` scales up to pools unchanged.\n\nBecause `Runnable` is functional, a lambda is usually the whole implementation: `new Thread(() -> doWork()).start();`",
      "syntax": "Runnable task = () -> { /* work */ };\nnew Thread(task, \"worker-1\").start();",
      "codeExample": "class OrderProcessor implements Runnable {\n    private final int orderId;\n\n    OrderProcessor(int orderId) {\n        this.orderId = orderId;\n    }\n\n    @Override\n    public void run() {\n        String who = Thread.currentThread().getName();\n        System.out.println(who + \" processing order \" + orderId);\n    }\n}\n\npublic class RunnableDemo {\n    public static void main(String[] args) throws InterruptedException {\n        // 1. Named class implementing Runnable\n        Thread t1 = new Thread(new OrderProcessor(101), \"worker-1\");\n\n        // 2. Lambda - Runnable is a functional interface\n        Thread t2 = new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + \" sending invoices\");\n        }, \"worker-2\");\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Batch complete.\");\n    }\n}",
      "codeOutput": "worker-1 processing order 101\nworker-2 sending invoices\nBatch complete.",
      "mistakes": [
        "Calling `myRunnable.run()` directly instead of handing it to a Thread and calling `start()`.",
        "Extending `Thread` out of habit and then discovering you needed to extend a domain class.",
        "Sharing one Runnable instance across threads without realising its fields are now shared mutable state."
      ],
      "takeaways": [
        "Prefer `Runnable` over extending `Thread` — it keeps your inheritance slot free.",
        "`Runnable` is a functional interface, so lambdas work.",
        "`Runnable` returns nothing and cannot throw checked exceptions; use `Callable<V>` when you need a result."
      ]
    },
    {
      "id": "m12-l4",
      "title": "Lesson 12.4 Thread Lifecycle",
      "objectives": [
        "Name the six thread states.",
        "Trace the transitions between them."
      ],
      "theory": "A Java thread is always in exactly one of six states, available via `Thread.getState()`.\n\n1. **NEW** — object constructed, `start()` not yet called.\n2. **RUNNABLE** — eligible to run. Note Java does not distinguish \"ready\" from \"actually on a CPU\"; both are RUNNABLE.\n3. **BLOCKED** — waiting to acquire a monitor lock held by another thread, i.e. queued outside a `synchronized` block.\n4. **WAITING** — waiting indefinitely for another thread to act. Entered via `wait()`, `join()`, or `LockSupport.park()`.\n5. **TIMED_WAITING** — the same, but with a deadline. Entered via `sleep(ms)`, `wait(ms)`, `join(ms)`.\n6. **TERMINATED** — `run()` has returned or thrown. **A terminated thread cannot be restarted.**\n\nThe distinction that trips people up: `sleep()` holds any locks it owns while it waits, whereas `wait()` **releases** the monitor so another thread can enter. That single difference is the source of countless deadlocks and a perennial interview question.",
      "syntax": "Thread.State state = myThread.getState();\n// NEW | RUNNABLE | BLOCKED | WAITING | TIMED_WAITING | TERMINATED",
      "codeExample": "public class ThreadLifecycle {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            try {\n                Thread.sleep(200);          // TIMED_WAITING\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        }, \"worker\");\n\n        System.out.println(\"After construction : \" + worker.getState());\n\n        worker.start();\n        System.out.println(\"After start()      : \" + worker.getState());\n\n        Thread.sleep(50);\n        System.out.println(\"While sleeping     : \" + worker.getState());\n\n        worker.join();\n        System.out.println(\"After join()       : \" + worker.getState());\n\n        // A terminated thread cannot be revived\n        try {\n            worker.start();\n        } catch (IllegalThreadStateException e) {\n            System.out.println(\"Restart refused    : \" + e.getClass().getSimpleName());\n        }\n    }\n}",
      "codeOutput": "After construction : NEW\nAfter start()      : RUNNABLE\nWhile sleeping     : TIMED_WAITING\nAfter join()       : TERMINATED\nRestart refused    : IllegalThreadStateException",
      "mistakes": [
        "Believing RUNNABLE means \"currently executing\" — it also covers threads queued for a CPU.",
        "Trying to reuse a TERMINATED thread by calling `start()` again.",
        "Confusing BLOCKED (waiting for a lock) with WAITING (waiting for a notification)."
      ],
      "takeaways": [
        "Six states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
        "`sleep()` keeps its locks; `wait()` releases the monitor.",
        "Termination is final — construct a new Thread to run the task again."
      ]
    },
    {
      "id": "m12-l5",
      "title": "Lesson 12.5 Synchronization",
      "objectives": [
        "Identify race conditions.",
        "Protect shared state with synchronized and volatile."
      ],
      "theory": "When two threads write the same variable without coordination you get a **race condition**. The classic example is `count++`, which looks atomic but is actually three operations: read, add one, write back. Two threads can both read 5, both compute 6, and both store 6 — one increment silently vanishes.\n\n**`synchronized`** fixes this. Every Java object owns a *monitor*; entering a synchronized block acquires it and exiting releases it. Only one thread can hold a given monitor at a time, so the protected region becomes mutually exclusive. You can synchronize a whole method (locking `this`, or the Class object for static methods) or a narrower block on a specific lock object — the narrower the region, the less contention.\n\n**`volatile`** solves a different problem: **visibility**. Without it a thread may cache a field in a CPU register and never see another thread's update, causing an infinite loop. `volatile` forces reads and writes to go to main memory. It does *not* make compound operations like `++` atomic — for counters use `AtomicInteger`.\n\nA **deadlock** occurs when two threads each hold a lock the other needs. The standard prevention is to always acquire multiple locks in the same global order.",
      "syntax": "private final Object lock = new Object();\nsynchronized (lock) { /* critical section */ }\n\npublic synchronized void method() { /* locks on this */ }",
      "codeExample": "class Counter {\n    private int count = 0;\n\n    // Without synchronized, increments are lost under contention\n    public synchronized void increment() {\n        count++;\n    }\n\n    public synchronized int get() {\n        return count;\n    }\n}\n\npublic class SynchronizationDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        Runnable job = () -> {\n            for (int i = 0; i < 10000; i++) {\n                counter.increment();\n            }\n        };\n\n        Thread t1 = new Thread(job);\n        Thread t2 = new Thread(job);\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"Expected : 20000\");\n        System.out.println(\"Actual   : \" + counter.get());\n    }\n}",
      "codeOutput": "Expected : 20000\nActual   : 20000",
      "mistakes": [
        "Assuming `count++` is atomic — it is a read-modify-write triple.",
        "Using `volatile` for counters. It guarantees visibility, not atomicity.",
        "Synchronizing on a mutable field or on a boxed value like `Integer`, so different threads end up locking different objects.",
        "Acquiring locks in inconsistent orders across methods, creating a deadlock."
      ],
      "takeaways": [
        "`synchronized` provides mutual exclusion; `volatile` provides visibility.",
        "Keep critical sections as small as possible to reduce contention.",
        "Prefer `AtomicInteger` and the `java.util.concurrent` classes over hand-rolled locking."
      ]
    },
    {
      "id": "m12-l6",
      "title": "Lesson 12.6 Thread Pool Basics",
      "objectives": [
        "Explain why pools beat raw threads.",
        "Use ExecutorService and Callable."
      ],
      "theory": "Creating a thread per task does not scale. Each thread costs roughly 1 MB of stack plus OS bookkeeping, and creation itself is expensive. A server that spawns a thread per request will collapse under load.\n\nA **thread pool** keeps a fixed set of worker threads alive and feeds them tasks from a queue. Threads are reused, memory is bounded, and load shedding becomes possible.\n\n`ExecutorService` is the standard API, obtained from the `Executors` factory:\n\n- `newFixedThreadPool(n)` — n workers, unbounded queue. The usual default; size it near your core count for CPU-bound work.\n- `newCachedThreadPool()` — grows on demand, reaps idle threads. Good for many short I/O-bound tasks.\n- `newSingleThreadExecutor()` — one worker, guaranteeing sequential execution.\n- `newScheduledThreadPool(n)` — for delayed and periodic tasks.\n\nSubmit a `Runnable` when you want fire-and-forget, or a **`Callable<V>`** when you need a result. `submit()` returns a `Future<V>`; calling `future.get()` blocks until the value is ready and rethrows any exception the task threw.\n\n**Always shut down the pool.** Its threads are non-daemon, so a forgotten executor keeps the JVM alive forever. `shutdown()` stops accepting new work and drains the queue; `shutdownNow()` attempts to interrupt running tasks.",
      "syntax": "ExecutorService pool = Executors.newFixedThreadPool(4);\nFuture<Integer> f = pool.submit(() -> compute());\nInteger result = f.get();\npool.shutdown();",
      "codeExample": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.concurrent.Callable;\nimport java.util.concurrent.ExecutionException;\nimport java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\nimport java.util.concurrent.Future;\nimport java.util.concurrent.TimeUnit;\n\npublic class ThreadPoolDemo {\n    public static void main(String[] args) throws InterruptedException, ExecutionException {\n        ExecutorService pool = Executors.newFixedThreadPool(3);\n        List<Future<Integer>> futures = new ArrayList<>();\n\n        for (int i = 1; i <= 5; i++) {\n            final int taskId = i;\n            Callable<Integer> task = () -> {\n                System.out.println(Thread.currentThread().getName() + \" runs task \" + taskId);\n                Thread.sleep(100);\n                return taskId * taskId;\n            };\n            futures.add(pool.submit(task));\n        }\n\n        int total = 0;\n        for (Future<Integer> f : futures) {\n            total += f.get();   // blocks until this task completes\n        }\n        System.out.println(\"Sum of squares: \" + total);\n\n        pool.shutdown();\n        if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {\n            pool.shutdownNow();\n        }\n        System.out.println(\"Pool terminated: \" + pool.isTerminated());\n    }\n}",
      "codeOutput": "pool-1-thread-1 runs task 1\npool-1-thread-2 runs task 2\npool-1-thread-3 runs task 3\npool-1-thread-1 runs task 4\npool-1-thread-2 runs task 5\nSum of squares: 55\nPool terminated: true",
      "mistakes": [
        "Never calling `shutdown()`, leaving non-daemon worker threads that stop the JVM exiting.",
        "Calling `future.get()` immediately after each `submit()`, which serialises everything and defeats the pool.",
        "Sizing a CPU-bound pool at hundreds of threads instead of roughly the core count.",
        "Swallowing task failures — exceptions inside a submitted task surface only when you call `get()`."
      ],
      "takeaways": [
        "Pools reuse a bounded set of threads instead of creating one per task.",
        "`Runnable` returns nothing; `Callable<V>` returns a value via `Future<V>`.",
        "Submit everything first, then collect the futures — otherwise you lose the parallelism.",
        "Always shut the executor down."
      ]
    }
  ],
  exercise: {
    title: 'Thread-safe counter',
    description: 'Demonstrate a race condition, then fix it with synchronization and again with AtomicInteger.',
    instructions: ['Run two threads that each increment a shared counter 10,000 times.', 'Observe that the unsynchronised total is below 20,000.', 'Fix it with a synchronized method, then compare against AtomicInteger.'],
    starterCode: 'public class Solution {\n    static int count = 0;\n\n    public static void main(String[] args) throws InterruptedException {\n        Runnable job = () -> {\n            for (int i = 0; i < 10000; i++) count++;   // TODO: make this safe\n        };\n        // TODO: start two threads, join them, print the total\n    }\n}',
    expectedOutput: 'Expected: 20000\nActual: 20000',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which method starts thread execution?', options: ['A. run()', 'B. start()', 'C. init()', 'D. execute()'], correctAnswer: 'B. start()' },
    { id: 2, question: 'Which keyword prevents concurrent access to critical methods?', options: ['A. lock', 'B. private', 'C. synchronized', 'D. volatile'], correctAnswer: 'C. synchronized' },
    { id: 3, question: 'Why is Runnable preferred over extending Thread?', options: ["A. Runnable tasks start faster than Thread subclasses", "B. Runnable methods are synchronized automatically, so shared state needs no extra locking", "C. Extending Thread is deprecated in modern Java versions", "D. Java supports multiple interface implementations but only single class inheritance"], correctAnswer: "D. Java supports multiple interface implementations but only single class inheritance" },
    { id: 4, question: 'What state is a thread in after calling start()?', options: ["A. Runnable", "B. Running", "C. New", "D. Terminated"], correctAnswer: "A. Runnable" },
    { id: 5, question: 'Which class creates built-in thread pools?', options: ['A. ThreadBuilder', 'B. Executors', 'C. PoolService', 'D. RunnableFactory'], correctAnswer: 'B. Executors' },
    { id: 6, question: 'What does calling `run()` directly instead of `start()` do?', options: ["A. Starts a new thread", "B. Throws an exception", "C. Executes synchronously on the current thread", "D. Queues run() to execute after the current method returns"], correctAnswer: "C. Executes synchronously on the current thread" },
    { id: 7, question: 'What happens if you call `start()` twice on the same Thread?', options: ["A. It runs twice", "B. Nothing", "C. It restarts", "D. IllegalThreadStateException"], correctAnswer: "D. IllegalThreadStateException" },
    { id: 8, question: 'Why is implementing Runnable preferred over extending Thread?', options: ["A. It leaves the single inheritance slot free", "B. It is faster", "C. It is required by the JVM", "D. It avoids exceptions"], correctAnswer: "A. It leaves the single inheritance slot free" },
    { id: 9, question: 'How many states can a Java thread be in?', options: ["A. Four", "B. Six", "C. Five", "D. Three"], correctAnswer: "B. Six" },
    { id: 10, question: 'Which state means the thread is waiting to acquire a monitor lock?', options: ["A. WAITING", "B. TIMED_WAITING", "C. BLOCKED", "D. RUNNABLE"], correctAnswer: "C. BLOCKED" },
    { id: 11, question: 'Which releases the monitor lock while waiting?', options: ["A. sleep()", "B. join()", "C. yield()", "D. wait()"], correctAnswer: "D. wait()" },
    { id: 12, question: 'Why is `count++` not thread-safe?', options: ["A. It is a read-modify-write sequence, not atomic", "B. It uses too much memory", "C. It is a syntax error", "D. It blocks other threads while it runs, causing contention"], correctAnswer: 'A. It is a read-modify-write sequence, not atomic' },
    { id: 13, question: 'What does `volatile` guarantee?', options: ['A. Atomicity of compound operations', 'B. Visibility of reads and writes across threads', 'C. Mutual exclusion', 'D. Thread priority'], correctAnswer: 'B. Visibility of reads and writes across threads' },
    { id: 14, question: 'Which class provides atomic increment without explicit locking?', options: ["A. Integer", "B. volatile int", "C. AtomicInteger", "D. Long"], correctAnswer: "C. AtomicInteger" },
    { id: 15, question: 'What does `join()` do?', options: ["A. Merges two threads", "B. Starts the target thread and waits one second", "C. Releases a lock", "D. Blocks the caller until the target thread finishes"], correctAnswer: "D. Blocks the caller until the target thread finishes" },
    { id: 16, question: 'What is a deadlock?', options: ["A. Two threads each holding a lock the other needs", "B. A thread that finished", "C. A thread that holds a lock for too long", "D. An unhandled exception"], correctAnswer: "A. Two threads each holding a lock the other needs" },
    { id: 17, question: 'What is the standard way to prevent deadlock with multiple locks?', options: ["A. Use more threads", "B. Always acquire locks in the same global order", "C. Remove synchronized", "D. Add sleep() between acquisitions so threads interleave"], correctAnswer: 'B. Always acquire locks in the same global order' },
    { id: 18, question: 'Why prefer a thread pool over creating a thread per task?', options: ["A. Pools are required by Java", "B. Pooled threads always use less CPU than new threads", "C. Threads are expensive to create and consume ~1MB stack each", "D. Threads cannot be reused otherwise"], correctAnswer: "C. Threads are expensive to create and consume ~1MB stack each" },
    { id: 19, question: 'Which interface should you use when a task must return a result?', options: ["A. Runnable", "B. Thread", "C. Executor", "D. Callable"], correctAnswer: "D. Callable" },
    { id: 20, question: 'What happens if you never call `shutdown()` on an ExecutorService?', options: ["A. Its non-daemon threads keep the JVM alive", "B. Nothing — the pool shuts down when main() returns", "C. Tasks are lost", "D. It throws"], correctAnswer: "A. Its non-daemon threads keep the JVM alive" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a thread-safe singleton program utilizing synchronized blocks.', language: 'java', starterCode: 'public class Solution {\n    public static void main(String[] args) {\n        Runnable job = () -> {\n            // work to run concurrently\n        };\n        // Start two threads, join them, print the result\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'What is the difference between calling start() and run() on a Thread object in Java?',
        options: [
          'A. start() executes the thread code in the same caller thread; run() spawns a new call stack and thread.',
          'B. start() creates a new thread and executes run() asynchronously in it; calling run() directly runs the code synchronously in the current thread.',
          'C. calling run() throws a checked exception; start() does not.',
          'D. calling start() is deprecated; run() should always be called instead.'
        ],
        correctAnswer: 'B. start() creates a new thread and executes run() asynchronously in it; calling run() directly runs the code synchronously in the current thread.'
      }
    ]
  }
};

export default mod_m12;
