import type { ModuleData } from '../GolangCourseData';

const mod_m11: ModuleData = {
  id: 'm11',
  title: 'MODULE 11: CONCURRENCY',
  overview: 'Master goroutines, channel communications, selection loops, WaitGroups, Mutex locks, and Context constraints.',
  outcomes: ['Construct thread-safe asynchronous workers', 'Manage timeouts using Go Context package'],
  lessons: [
    { id: 'm11-l1', title: 'Lesson 11.1 Introduction to Goroutines', objectives: ['Launch asynchronous threads'], theory: 'A goroutine is a lightweight execution thread managed entirely by the Go runtime scheduler, not the host operating system. When a Go program starts, the runtime automatically spins up a scheduler that runs on top of the physical CPU cores. This scheduler implements an M:N multiplexing model, which maps M goroutines onto N operating system threads. Unlike standard OS threads which require a fixed stack space allocation of 1MB to 2MB, goroutines initialize with a tiny stack allocation of just 2KB. This stack grows and shrinks dynamically in response to call frames requirements. This efficiency allows you to run hundreds of thousands of concurrent goroutines on a single computer without encountering memory exhaustion.', takeaways: ['Goroutines are cheap to initialize and execute.', 'Multiplexes thousands of execution paths over OS threads.'] },
    { id: 'm11-l2', title: 'Lesson 11.2 Channels', objectives: ['Safe threads communications'], theory: 'Channels are typed conduits that let you send and receive values between goroutines safely. They prevent race conditions by design without requiring manual Mutex locking protocols. By default, unbuffered channels block execution on both sides: a send operation blocks the sender until a receiver is ready to read from the channel, and a receive operation blocks the receiver until a sender writes data to it. This blocking behavior provides a natural synchronization point for concurrent processes.', syntax: `package main
import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "ping"
    }()
    fmt.Println(<-ch)
}`, takeaways: ['Send values to channels using the arrow operator (<-).', 'Unbuffered channel sends and receives block until both sender and receiver are ready.'] },
    { id: 'm11-l3', title: 'Lesson 11.3 Buffered Channels', objectives: ['Non-blocking queue streams'], theory: 'Buffered channels have a queue capacity. Sends to a buffered channel are non-blocking until the buffer is full.', syntax: `package main
import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2
    fmt.Println(<-ch, <-ch)
}`, takeaways: ['Initialize buffered channels with a capacity: make(chan Type, capacity)', 'Buffered channel sends only block when the queue is full.'] },
    { id: 'm11-l4', title: 'Lesson 11.4 Select Statement', objectives: ['Multi-channel multiplexing'], theory: 'The select statement lets a goroutine wait on multiple communication channels. Select blocks until one of its cases is ready to execute.', syntax: `package main
import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    go func() {
        time.Sleep(time.Millisecond)
        c1 <- "one"
    }()
    select {
    case msg := <-c1:
        fmt.Println(msg)
    case <-time.After(time.Second):
        fmt.Println("Timeout")
    }
}`, takeaways: ['Select multiplexes communications across multiple channels.', 'Use time.After to implement channel timeouts.'] },
    { id: 'm11-l5', title: 'Lesson 11.5 WaitGroup', objectives: ['Wait concurrent threads completion'], theory: 'Use sync.WaitGroup to wait for a collection of goroutines to finish. Call Add() to set the count, Done() when a goroutine completes, and Wait() to block until the count reaches zero.', syntax: `package main
import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Done working")
    }()
    wg.Wait()
}`, takeaways: ['Use sync.WaitGroup to wait for goroutines to finish.', 'Always pass WaitGroups to functions as pointer references.'] },
    { id: 'm11-l6', title: 'Lesson 11.6 Mutex', objectives: ['Prevent data race conditions'], theory: 'Use sync.Mutex to protect shared memory locations from data races by ensuring only one goroutine can access the critical section at a time.', syntax: `package main
import (
    "fmt"
    "sync"
)

type SafeBox struct {
    mu sync.Mutex
    val int
}

func (b *SafeBox) Add(x int) {
    b.mu.Lock()
    defer b.mu.Unlock()
    b.val += x
}

func main() {
    box := SafeBox{}
    box.Add(10)
    fmt.Println(box.val)
}`, takeaways: ['Use sync.Mutex to guard shared variables.', 'Run go build -race to detect data races in your binary.'] },
    { id: 'm11-l7', title: 'Lesson 11.7 Context Package', objectives: ['Cancel dead-locks'], theory: 'The context package propagates deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines.', syntax: `package main
import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond)
    defer cancel()
    select {
    case <-time.After(time.Second):
        fmt.Println("Finished")
    case <-ctx.Done():
        fmt.Println("Cancelled:", ctx.Err())
    }
}`, takeaways: ['Use context to cancel long-running operations.', 'Always call the cancel() function to release context resources.'] },
    { id: 'm11-l8', title: 'Lesson 11.8 Worker Pools', objectives: ['Write throttled concurrent workers'], theory: 'Design worker pools to limit resources. Spawn a fixed number of worker goroutines that process tasks read from a shared work channel.', takeaways: ['Worker pools limit concurrent resource usage.', 'Prevents CPU and memory spikes.'] }
  ],
  quiz: [
    { id: 1, question: 'Which command runs your tests with the data race detector enabled?', options: ["go test -speed", "go vet -threads", "go test -race", "go verify"], correctAnswer: "go test -race" },
    { id: 2, question: "What happens when you send on an unbuffered channel with no ready receiver?", options: ["The sender blocks until a receiver is ready", "The value is dropped", "The program panics", "The value is queued indefinitely"], correctAnswer: "The sender blocks until a receiver is ready" },
    { id: 3, question: "What is sync.WaitGroup used for?", options: ["Limiting CPU usage", "Waiting for a set of goroutines to finish", "Sharing memory safely", "Scheduling goroutines on threads"], correctAnswer: "Waiting for a set of goroutines to finish" },
    { id: 4, question: "What does `select` do with several channel operations?", options: ["Runs all of them in parallel", "Always picks the first case", "Proceeds with whichever is ready first", "Closes the unused channels"], correctAnswer: "Proceeds with whichever is ready first" },
    { id: 5, question: "Why pass a context.Context into long-running work?", options: ["To make it run on a new thread", "To share global variables", "To avoid returning errors", "So callers can cancel it or set a deadline"], correctAnswer: "So callers can cancel it or set a deadline" },
    { id: 6, question: "What does a worker pool bound?", options: ["The number of jobs processed concurrently", "The size of each channel message", "The number of CPU cores used by Go", "The total memory of the program"], correctAnswer: "The number of jobs processed concurrently" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Implement a worker pool: 3 workers pull job ids off a jobs channel, square each one, and send the result to a results channel. Use sync.WaitGroup to know when every worker has finished, and close the results channel before ranging over it. Because workers interleave, collect the results and sort them before printing so the output is deterministic.',
        language: 'go',
        starterCode: 'package main\n\nimport (\n    "fmt"\n    "sort"\n    "sync"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    for j := range jobs {\n        // TODO: send the square of j to results\n        _ = j\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 10)\n    results := make(chan int, 10)\n    var wg sync.WaitGroup\n\n    for w := 1; w <= 3; w++ {\n        wg.Add(1)\n        go worker(w, jobs, results, &wg)\n    }\n\n    // TODO: send jobs 1..9 into the jobs channel\n\n    close(jobs)\n    wg.Wait()\n    close(results)\n\n    collected := []int{}\n    for r := range results {\n        collected = append(collected, r)\n    }\n    sort.Ints(collected)\n    fmt.Println(collected)\n}',
        examples: [
          { input: 'jobs 1..9 across 3 workers', output: '[1 4 9 16 25 36 49 64 81]', explanation: 'Sorting hides the nondeterministic completion order of the workers.' }
        ]
      }
    ]
  }
};

export default mod_m11;
