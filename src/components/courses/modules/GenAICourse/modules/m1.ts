import type { ModuleData } from '../GenAICourseData';

const mod_m1: ModuleData = {
  id: 'm1',
  title: 'MODULE 1: PYTHON & AI FOUNDATIONS',
  overview: 'Get fluent in the Python you actually use to build AI systems, plus the HTTP and JSON groundwork every LLM integration sits on.',
  outcomes: ['Write clean, typed Python for AI services', 'Model data with dicts, dataclasses and JSON', 'Call and serve HTTP APIs asynchronously'],
  lessons: [
    {
      id: 'm1-l1',
      title: 'Lesson 1.1 Why Python Runs GenAI',
      objectives: [
        'Explain why the GenAI ecosystem settled on Python.',
        'Place Python correctly inside a stack you already run.',
        'Keep provider calls behind an interface you own.',
      ],
      theory: 'Almost every model provider ships a Python SDK first, and the tooling around retrieval, evaluation and fine-tuning is written in Python. That is the practical reason the language dominates GenAI work, not any inherent superiority.\nYou do not need to abandon the stack you already know. A very common production shape is a Go or Node service handling authentication, billing and orchestration, calling a small Python service that owns the model interaction. Python earns its place where the AI libraries live; the rest of the system can stay in whatever you already run well.\nWherever the model call lives, wrap it. A thin function of your own — take a prompt, return text and token counts — means that swapping provider, adding a fallback model or logging cost is a change in one file rather than a search across the codebase. Module 10 builds the production version of exactly this seam.',
      callout: {
        lead: 'Think of it like this:',
        text: 'Python is where the AI libraries live, not where your whole system has to live.',
      },
      codeExample: `from dataclasses import dataclass


@dataclass
class Reply:
    text: str
    input_tokens: int
    output_tokens: int


class FakeProvider:
    """Stands in for a real SDK so the shape is visible without a network call."""

    def complete(self, prompt: str) -> Reply:
        return Reply(text=prompt.upper(), input_tokens=len(prompt) // 4, output_tokens=8)


def ask(provider, prompt: str) -> str:
    """The seam: everything above this line can be swapped out."""
    reply = provider.complete(prompt)
    print(f"tokens in={reply.input_tokens} out={reply.output_tokens}")
    return reply.text


print(ask(FakeProvider(), "summarise the refund policy"))`,
      codeOutput: 'tokens in=6 out=8\nSUMMARISE THE REFUND POLICY',
      takeaways: [
        'Python leads because the AI ecosystem is written in it.',
        'Mixed stacks are normal — Python for the model layer, another language for the platform.',
        'Wrap the provider in your own function so swapping it is a one-file change.',
      ],
    },
    {
      id: 'm1-l2',
      title: 'Lesson 1.2 Data Structures You Will Actually Use',
      objectives: [
        'Choose between dict, list, set and tuple deliberately.',
        'Score and rank retrieval candidates.',
        'Deduplicate document ids without a second pass.',
      ],
      theory: 'Four containers carry nearly all GenAI code. Lists hold ordered chunks and message history. Dicts carry JSON payloads and metadata filters. Sets deduplicate retrieved document ids cheaply. Tuples are fixed records, often a (score, document) pair you are about to sort.\nThe habit worth building early is reaching for a dict when you have named fields and a tuple when you have a fixed-length record. Retrieval code is full of both: you score candidates into tuples, sort them, then hand the top results onward as dicts with metadata attached.\nDeduplication deserves its own note because it appears in every retrieval pipeline. The same passage often lands in several chunks, and sending three near-identical chunks to the model wastes context you paid for. A set of ids seen so far turns that into a single pass with no nested loop.',
      callout: {
        lead: 'Rule of thumb:',
        text: 'dict for named fields, tuple for a fixed-length record, set whenever the question is “have I seen this already?”',
      },
      syntax: `# A retrieved candidate, scored and ranked
candidates = [
    (0.91, {"id": "doc-3", "text": "...", "source": "handbook.pdf"}),
    (0.72, {"id": "doc-9", "text": "...", "source": "policy.pdf"}),
]
candidates.sort(key=lambda pair: pair[0], reverse=True)

seen = set()
unique = [doc for _, doc in candidates if not (doc["id"] in seen or seen.add(doc["id"]))]`,
      codeExample: `candidates = [
    (0.72, {"id": "doc-9", "source": "policy.pdf"}),
    (0.91, {"id": "doc-3", "source": "handbook.pdf"}),
    (0.64, {"id": "doc-3", "source": "handbook.pdf"}),  # same document, second chunk
]

candidates.sort(key=lambda pair: pair[0], reverse=True)

seen: set[str] = set()
ranked: list[tuple[float, str]] = []
for score, doc in candidates:
    if doc["id"] in seen:
        continue
    seen.add(doc["id"])
    ranked.append((score, doc["id"]))

print(ranked)
print("dropped duplicates:", len(candidates) - len(ranked))`,
      codeOutput: "[(0.91, 'doc-3'), (0.72, 'doc-9')]\ndropped duplicates: 1",
      takeaways: [
        'Dicts for named fields, tuples for fixed records.',
        'Sets are the cheap way to deduplicate document ids.',
        'Sort first, then deduplicate, so the highest-scoring copy is the one you keep.',
      ],
    },
    {
      id: 'm1-l3',
      title: 'Lesson 1.3 Functions, Comprehensions and Type Hints',
      objectives: [
        'Express ingestion steps as readable transformations.',
        'Annotate the shape of deeply nested AI payloads.',
        'Recognise when a loop beats a comprehension.',
      ],
      theory: 'Retrieval and ingestion code is a chain of transformations, which is exactly what comprehensions express well. A comprehension that filters and maps in one line is clearer than a four-line loop, but stop nesting them past two levels — at that point a loop is more readable.\nType hints are not enforced at runtime, yet they matter more in AI code than in most, because your data is deeply nested dicts that all look alike. Annotating a function as returning list[dict[str, str]] tells the next reader what shape to expect without running anything.\nThe example below also shows why naive chunking is a placeholder rather than a solution. Splitting on a fixed character count cuts words and sentences in half, and an embedding of half a sentence carries half a meaning. Module 5 replaces it with structure-aware splitting; for now, notice the damage.',
      callout: {
        lead: 'Watch what happens:',
        text: 'fixed-size chunking slices words in half. That is exactly the problem Module 5 solves with structure-aware splitting.',
      },
      syntax: `def chunk_texts(docs: list[str], size: int) -> list[str]:
    """Split each document into fixed-size character chunks."""
    return [d[i:i + size] for d in docs for i in range(0, len(d), size)]

long_enough = [c for c in chunk_texts(docs, 500) if len(c.strip()) > 50]`,
      codeExample: `def chunk(text: str, size: int) -> list[str]:
    """Naive fixed-width chunking — deliberately flawed, see the output."""
    return [text[i:i + size] for i in range(0, len(text), size)]


def drop_fragments(chunks: list[str], min_len: int = 10) -> list[str]:
    return [c.strip() for c in chunks if len(c.strip()) >= min_len]


doc = "Refunds are issued within 14 days.   Late claims are rejected."
pieces = chunk(doc, 20)

for p in pieces:
    print(repr(p))
print("kept:", len(drop_fragments(pieces)), "of", len(pieces))`,
      codeOutput: "'Refunds are issued w'\n'ithin 14 days.   Lat'\n'e claims are rejecte'\n'd.'\nkept: 3 of 4",
      takeaways: [
        'Comprehensions suit pipeline transforms; do not nest them deeply.',
        'Type hints document the shape of nested AI payloads.',
        'Fixed-width chunking cuts through words — treat it as a placeholder, not a strategy.',
      ],
    },
    {
      id: 'm1-l4',
      title: 'Lesson 1.4 Classes and Dataclasses',
      objectives: [
        'Model documents and chunks as typed records.',
        'Avoid the mutable-default trap.',
        'Decide between a dataclass, a dict and a full class.',
      ],
      theory: 'A dataclass gives you a typed record with a generated constructor, equality and repr, which is most of what you want for a Document, Chunk or ToolCall. Reach for a full class only when there is real behaviour attached, such as a Retriever that holds a connection.\nA practical rule: dataclasses for data crossing boundaries, plain dicts for payloads you are about to serialise to JSON, and classes for things with state and methods. Mixing all three arbitrarily is how AI codebases turn to mud.\nThe mutable-default trap is worth meeting once deliberately. A default of {} is evaluated when the function is defined, not when it is called, so every instance would share one dictionary — annotate one chunk with a page number and every other chunk silently gains it. field(default_factory=dict) builds a fresh dict per instance instead.',
      callout: {
        lead: 'The rule that saves you:',
        text: 'never write = {} or = [] as a default. field(default_factory=dict) gives each instance its own.',
      },
      syntax: `from dataclasses import dataclass, field

@dataclass
class Chunk:
    id: str
    text: str
    source: str
    metadata: dict = field(default_factory=dict)  # never a mutable default

    def preview(self, n: int = 80) -> str:
        return self.text[:n].replace("\\n", " ")`,
      codeExample: `from dataclasses import dataclass, field


@dataclass
class Chunk:
    id: str
    text: str
    source: str
    metadata: dict = field(default_factory=dict)

    def preview(self, n: int = 40) -> str:
        return self.text[:n].replace("\\n", " ")


a = Chunk("c1", "Refunds are issued within 14 days.", "policy.pdf")
b = Chunk("c1", "Refunds are issued within 14 days.", "policy.pdf")

a.metadata["page"] = 3   # annotate ONE chunk

print(a.preview())
print("a == b:", a == b)
print("a:", a.metadata, "| b:", b.metadata)`,
      codeOutput: "Refunds are issued within 14 days.\na == b: False\na: {'page': 3} | b: {}",
      takeaways: [
        'Dataclasses for records, classes for behaviour with state.',
        'Mutable defaults need field(default_factory=...), never [] or {} directly.',
        'Generated equality compares every field — including metadata you mutated.',
      ],
    },
    {
      id: 'm1-l5',
      title: 'Lesson 1.5 Virtual Environments and Dependencies',
      objectives: [
        'Isolate each project\'s dependencies.',
        'Pin versions so builds are reproducible.',
        'Spot an unpinned requirement before it breaks a deploy.',
      ],
      theory: 'AI dependencies are heavy and version-sensitive; two projects on one machine will eventually demand incompatible versions of the same library. A virtual environment gives each project its own isolated set of packages, which is why every Python AI project starts with one.\nPin your dependencies. "It worked last week" is usually an unpinned transitive dependency that shipped a breaking change. A requirements.txt with exact versions, or a lockfile from a tool like uv or Poetry, is the difference between a reproducible deployment and a mystery.\nThis matters more in AI than in most work because provider SDKs move quickly and occasionally change response shapes between minor versions. A pin is not bureaucracy; it is the thing that lets you say with confidence that the code running in production is the code you tested.',
      callout: {
        lead: 'Think of it like this:',
        text: 'an unpinned dependency means your build is a moving target that nobody is watching.',
      },
      syntax: `python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate

pip install openai anthropic fastapi uvicorn
pip freeze > requirements.txt    # exact versions, not loose ranges`,
      codeExample: `def unpinned(requirements: list[str]) -> list[str]:
    """Anything without == can change under you between builds."""
    return [r for r in requirements if "==" not in r]


reqs = [
    "openai==1.40.0",
    "anthropic>=0.30",     # floating upper bound
    "fastapi==0.111.0",
    "httpx",               # no constraint at all
]

loose = unpinned(reqs)
print("unpinned:", loose)
print(f"{len(reqs) - len(loose)}/{len(reqs)} pinned")`,
      codeOutput: "unpinned: ['anthropic>=0.30', 'httpx']\n2/4 pinned",
      takeaways: [
        'One virtual environment per project, always.',
        'Pin exact versions — unpinned transitive deps break builds silently.',
        'Provider SDKs change response shapes between minor versions; pins are how you notice on your terms.',
      ],
    },
    {
      id: 'm1-l6',
      title: 'Lesson 1.6 Async Python and HTTP',
      objectives: [
        'Explain why async suits LLM calls specifically.',
        'Run many model calls concurrently.',
        'Avoid blocking the event loop.',
      ],
      theory: 'An LLM call takes seconds, not milliseconds. If your service handles those calls synchronously, each request occupies a worker for the whole generation and your throughput collapses. Async lets one process wait on many in-flight calls at once, because the work is I/O-bound rather than CPU-bound.\nThe rule is that async only helps when you are waiting on the network. Wrapping CPU-heavy work in async gains nothing and can block the event loop. Also remember that a blocking library call inside an async function stalls every other coroutine on that loop.\nThat last point causes real incidents. A synchronous database driver or a requests.get buried inside an async handler will freeze every concurrent request for its duration, and the symptom — latency that spikes under load with no obvious cause — is genuinely hard to trace back. Use async-native clients throughout, or push blocking work to a thread pool.',
      callout: {
        lead: 'Think of it like this:',
        text: 'async does not make the model faster. It stops one slow call from occupying a worker that could be waiting on ten more.',
      },
      syntax: `import asyncio, httpx

async def summarise_all(docs: list[str]) -> list[str]:
    async with httpx.AsyncClient(timeout=60) as client:
        # Fire all requests concurrently rather than one after another.
        tasks = [call_model(client, d) for d in docs]
        return await asyncio.gather(*tasks)`,
      codeExample: `import asyncio
import time


async def call_model(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)      # stands in for the network wait
    return f"{name} done"


async def main() -> None:
    start = time.perf_counter()
    results = await asyncio.gather(
        call_model("doc-1", 0.3),
        call_model("doc-2", 0.3),
        call_model("doc-3", 0.3),
    )
    elapsed = time.perf_counter() - start
    print(results)
    print(f"three 0.3s calls took {elapsed:.1f}s, not 0.9s")


asyncio.run(main())`,
      codeOutput: "['doc-1 done', 'doc-2 done', 'doc-3 done']\nthree 0.3s calls took 0.3s, not 0.9s",
      takeaways: [
        'Async pays off for network waits, not CPU work.',
        'One blocking call inside a coroutine stalls the whole event loop.',
        'gather turns sequential model calls into concurrent ones for free.',
      ],
    },
    {
      id: 'm1-l7',
      title: 'Lesson 1.7 JSON and REST Fundamentals',
      objectives: [
        'Move structured data between services over HTTP.',
        'Parse model output defensively.',
        'Decide what a parse failure should mean.',
      ],
      theory: 'Every model provider speaks JSON over HTTPS, and so will the API you put in front of them. You should be comfortable with status codes, headers, request bodies and — critically — what to do when the response is not the shape you expected.\nModels return text, and text that looks like JSON is not guaranteed to be JSON. Always parse defensively: wrap json.loads in a try, decide what a failure means, and never let a malformed model response take down the request handler. This single habit prevents a large share of production incidents in GenAI systems.\nDeciding what failure means is the part people skip. Returning a structured error rather than raising lets the caller choose: retry once with the parse error fed back to the model, fall back to a plain-text answer, or surface a clean message. Module 4 turns that retry into a standard pattern, and Module 11 tracks how often it fires as a quality signal.',
      callout: {
        lead: 'Think of it like this:',
        text: 'model output is untrusted input that happens to arrive from your own vendor.',
      },
      syntax: `import json

def parse_model_json(raw: str) -> dict | None:
    """Model output is text; it is only JSON if it parses."""
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None   # caller decides: retry, repair, or fall back`,
      codeExample: `import json


def parse_model_output(raw: str) -> dict:
    """Never raises. The caller decides what a failure means."""
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"error": "invalid_json", "raw": raw}


good = '{"answer": "14 days", "sources": ["policy.pdf"]}'
truncated = 'Sure! Here is the JSON: {"answer"'

print(parse_model_output(good))

failed = parse_model_output(truncated)
print(failed["error"], "->", failed["raw"][:23])`,
      codeOutput: "{'answer': '14 days', 'sources': ['policy.pdf']}\ninvalid_json -> Sure! Here is the JSON:",
      takeaways: [
        'Model output is text — parse it defensively, always.',
        'A malformed response must never crash the handler.',
        'Return a structured failure so the caller can retry, repair or fall back.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "Why does async help a service that calls LLM APIs?", options: ["It lets one process wait on many I/O-bound calls at once", "It makes the model generate faster", "It reduces token cost", "It parallelises CPU work across cores"], correctAnswer: "It lets one process wait on many I/O-bound calls at once" },
    { id: 2, question: "What is the correct way to give a dataclass field an empty dict default?", options: ["metadata: dict = {}", "metadata: dict = field(default_factory=dict)", "metadata: dict = None", "metadata: dict = field(default=dict())"], correctAnswer: "metadata: dict = field(default_factory=dict)" },
    { id: 3, question: "A model returns text that looks like JSON. What should your code do?", options: ["Call json.loads directly and let errors propagate", "Trust it, since the prompt asked for JSON", "Parse inside a try/except and handle failure explicitly", "Use eval() to be more forgiving"], correctAnswer: "Parse inside a try/except and handle failure explicitly" },
    { id: 4, question: "Which container is the cheapest way to answer \"have I already seen this document id?\"", options: ["A list, checked with in", "A tuple", "A sorted list with bisect", "A set"], correctAnswer: "A set" },
    { id: 5, question: "What do Python type hints do at runtime?", options: ["Nothing — they document the expected shape for readers and tools", "They validate arguments when the function is called", "They convert values to the annotated type", "They raise TypeError on mismatch"], correctAnswer: "Nothing — they document the expected shape for readers and tools" },
    { id: 6, question: "A synchronous database driver is called inside an async request handler. What is the effect?", options: ["Only that request is slowed", "It stalls every other coroutine on the event loop", "Python automatically moves it to a thread", "It raises a RuntimeError"], correctAnswer: "It stalls every other coroutine on the event loop" },
    { id: 7, question: "Why pin exact dependency versions in an AI project specifically?", options: ["Pinning makes pip resolve packages much faster on install", "It reduces install size", "Provider SDKs move fast and can change response shapes between minor versions", "It is needed for virtual environments to work"], correctAnswer: "Provider SDKs move fast and can change response shapes between minor versions" },
    { id: 8, question: "Why wrap the provider SDK call in a thin function of your own?", options: ["It makes the API call faster", "Provider SDKs refuse calls made outside a wrapper class", "It avoids the need for type hints", "It contains swapping providers, adding fallback and logging cost to one place"], correctAnswer: "It contains swapping providers, adding fallback and logging cost to one place" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A model returns ```json { \"a\": 1 } ``` wrapped in a Markdown code fence. json.loads raises. What is the robust fix?",
        options: [
          "Strip a surrounding code fence, then parse inside try/except and handle failure explicitly",
          "Switch to eval(), which tolerates the fence and any stray prose",
          "Raise the temperature so the model stops adding fences",
          "Catch the exception and return an empty dict silently",
        ],
        correctAnswer: "Strip a surrounding code fence, then parse inside try/except and handle failure explicitly",
      },
      {
        kind: 'mcq',
        prompt: "Retrieval returns the same document id three times with different scores. You want one entry per id. Which approach is correct and efficient?",
        options: [
          "Convert the list to a set of tuples",
          "Walk the results once with a dict keyed on id, keeping the higher score",
          "Sort by score and hope duplicates end up adjacent",
          "Call list.remove() for each duplicate inside the loop",
        ],
        correctAnswer: "Walk the results once with a dict keyed on id, keeping the higher score",
      },
      {
        kind: 'mcq',
        prompt: "A function signature reads def ask(prompt: str) -> str and someone passes an int. What happens at runtime?",
        options: [
          "Python raises a TypeError as soon as the int reaches the function",
          "The int is converted to a str automatically",
          "The call runs normally; hints are not enforced unless a tool like mypy checks them",
          "The interpreter refuses to import the module",
        ],
        correctAnswer: "The call runs normally; hints are not enforced unless a tool like mypy checks them",
      },
      {
        kind: 'mcq',
        prompt: "Your service awaits ten LLM calls one after another, each taking 2 seconds. How do you cut the total time without more hardware?",
        options: [
          "Use a faster CPU",
          "Add threads to speed up token generation inside the provider",
          "Lower max_tokens to zero",
          "Run them concurrently with asyncio.gather, since the time is spent waiting on I/O",
        ],
        correctAnswer: "Run them concurrently with asyncio.gather, since the time is spent waiting on I/O",
      },
      {
        kind: 'mcq',
        prompt: "A teammate's code works but a fresh machine gets a different SDK version with a changed response shape. What prevents this?",
        options: [
          "A lock file or pinned versions installed into a virtual environment",
          "Installing the SDK globally with sudo",
          "Type-hinting the response so the new shape fails at import",
          "Wrapping the import in try/except",
        ],
        correctAnswer: "A lock file or pinned versions installed into a virtual environment",
      },
    ],
  },
};

export default mod_m1;
