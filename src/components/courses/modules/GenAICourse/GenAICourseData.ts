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
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    // Plain strings are written questions; objects with kind:'code' render a
    // runnable editor. See ModuleAssignment for the full shape.
    prompts: AssignmentQuestion[];
  };
}

/**
 * GenAI Engineer + Forward Deployed Engineer curriculum.
 *
 * Runnable assignments are deliberately pure-stdlib Python: the execution
 * sandbox has no network and no third-party packages, so tasks teach the
 * mechanics (similarity, chunking, ranking, retries, cost) by hand. Anything
 * needing an LLM provider, numpy or a real database is marked runnable:false
 * so the learner still gets a proper editor without a Run button that fails.
 */
export const GENAI_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: PYTHON & AI FOUNDATIONS',
    overview: 'Get fluent in the Python you actually use to build AI systems, plus the HTTP and JSON groundwork every LLM integration sits on.',
    outcomes: ['Write clean, typed Python for AI services', 'Model data with dicts, dataclasses and JSON', 'Call and serve HTTP APIs asynchronously'],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 Why Python Runs GenAI',
        objectives: ['Understand the ecosystem'],
        theory: 'Almost every model provider ships a Python SDK first, and the tooling around retrieval, evaluation and fine-tuning is written in Python. That is the practical reason the language dominates GenAI work, not any inherent superiority.\nYou do not need to abandon the stack you already know. A very common production shape is a Go or Node service handling authentication, billing and orchestration, calling a small Python service that owns the model interaction. Python earns its place where the AI libraries live; the rest of the system can stay in whatever you already run well.',
        takeaways: ['Python leads because the AI ecosystem is written in it.', 'Mixed stacks are normal — Python for the model layer, another language for the platform.'],
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 Data Structures You Will Actually Use',
        objectives: ['Pick the right container'],
        theory: 'Four containers carry nearly all GenAI code. Lists hold ordered chunks and message history. Dicts carry JSON payloads and metadata filters. Sets deduplicate retrieved document ids cheaply. Tuples are fixed records, often a (score, document) pair you are about to sort.\nThe habit worth building early is reaching for a dict when you have named fields and a tuple when you have a fixed-length record. Retrieval code is full of both: you score candidates into tuples, sort them, then hand the top results onward as dicts with metadata attached.',
        syntax: `# A retrieved candidate, scored and ranked
candidates = [
    (0.91, {"id": "doc-3", "text": "...", "source": "handbook.pdf"}),
    (0.72, {"id": "doc-9", "text": "...", "source": "policy.pdf"}),
]
candidates.sort(key=lambda pair: pair[0], reverse=True)

seen = set()
unique = [doc for _, doc in candidates if not (doc["id"] in seen or seen.add(doc["id"]))]`,
        takeaways: ['Dicts for named fields, tuples for fixed records.', 'Sets are the cheap way to deduplicate document ids.'],
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 Functions, Comprehensions and Type Hints',
        objectives: ['Write readable pipeline code'],
        theory: 'Retrieval and ingestion code is a chain of transformations, which is exactly what comprehensions express well. A comprehension that filters and maps in one line is clearer than a four-line loop, but stop nesting them past two levels — at that point a loop is more readable.\nType hints are not enforced at runtime, yet they matter more in AI code than in most, because your data is deeply nested dicts that all look alike. Annotating a function as returning list[dict[str, str]] tells the next reader what shape to expect without running anything.',
        syntax: `def chunk_texts(docs: list[str], size: int) -> list[str]:
    """Split each document into fixed-size character chunks."""
    return [d[i:i + size] for d in docs for i in range(0, len(d), size)]

long_enough = [c for c in chunk_texts(docs, 500) if len(c.strip()) > 50]`,
        takeaways: ['Comprehensions suit pipeline transforms; do not nest them deeply.', 'Type hints document the shape of nested AI payloads.'],
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 Classes and Dataclasses',
        objectives: ['Model domain objects'],
        theory: 'A dataclass gives you a typed record with a generated constructor, equality and repr, which is most of what you want for a Document, Chunk or ToolCall. Reach for a full class only when there is real behaviour attached, such as a Retriever that holds a connection.\nA practical rule: dataclasses for data crossing boundaries, plain dicts for payloads you are about to serialise to JSON, and classes for things with state and methods. Mixing all three arbitrarily is how AI codebases turn to mud.',
        syntax: `from dataclasses import dataclass, field

@dataclass
class Chunk:
    id: str
    text: str
    source: str
    metadata: dict = field(default_factory=dict)  # never a mutable default

    def preview(self, n: int = 80) -> str:
        return self.text[:n].replace("\\n", " ")`,
        takeaways: ['Dataclasses for records, classes for behaviour with state.', 'Mutable defaults need field(default_factory=...), never [] or {} directly.'],
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 Virtual Environments and Dependencies',
        objectives: ['Keep environments reproducible'],
        theory: 'AI dependencies are heavy and version-sensitive; two projects on one machine will eventually demand incompatible versions of the same library. A virtual environment gives each project its own isolated set of packages, which is why every Python AI project starts with one.\nPin your dependencies. "It worked last week" is usually an unpinned transitive dependency that shipped a breaking change. A requirements.txt with exact versions, or a lockfile from a tool like uv or Poetry, is the difference between a reproducible deployment and a mystery.',
        syntax: `python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate

pip install openai anthropic fastapi uvicorn
pip freeze > requirements.txt    # exact versions, not loose ranges`,
        takeaways: ['One virtual environment per project, always.', 'Pin exact versions — unpinned transitive deps break builds silently.'],
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 Async Python and HTTP',
        objectives: ['Handle slow model calls'],
        theory: 'An LLM call takes seconds, not milliseconds. If your service handles those calls synchronously, each request occupies a worker for the whole generation and your throughput collapses. Async lets one process wait on many in-flight calls at once, because the work is I/O-bound rather than CPU-bound.\nThe rule is that async only helps when you are waiting on the network. Wrapping CPU-heavy work in async gains nothing and can block the event loop. Also remember that a blocking library call inside an async function stalls every other coroutine on that loop.',
        syntax: `import asyncio, httpx

async def summarise_all(docs: list[str]) -> list[str]:
    async with httpx.AsyncClient(timeout=60) as client:
        # Fire all requests concurrently rather than one after another.
        tasks = [call_model(client, d) for d in docs]
        return await asyncio.gather(*tasks)`,
        takeaways: ['Async pays off for network waits, not CPU work.', 'One blocking call inside a coroutine stalls the whole event loop.'],
      },
      {
        id: 'm1-l7',
        title: 'Lesson 1.7 JSON and REST Fundamentals',
        objectives: ['Move data between services'],
        theory: 'Every model provider speaks JSON over HTTPS, and so will the API you put in front of them. You should be comfortable with status codes, headers, request bodies and — critically — what to do when the response is not the shape you expected.\nModels return text, and text that looks like JSON is not guaranteed to be JSON. Always parse defensively: wrap json.loads in a try, decide what a failure means, and never let a malformed model response take down the request handler. This single habit prevents a large share of production incidents in GenAI systems.',
        syntax: `import json

def parse_model_json(raw: str) -> dict | None:
    """Model output is text; it is only JSON if it parses."""
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None   # caller decides: retry, repair, or fall back`,
        takeaways: ['Model output is text — parse it defensively, always.', 'A malformed response must never crash the handler.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Why does async help a service that calls LLM APIs?', options: ['It makes the model generate faster', 'It lets one process wait on many I/O-bound calls at once', 'It reduces token cost', 'It parallelises CPU work across cores'], correctAnswer: 'It lets one process wait on many I/O-bound calls at once' },
      { id: 2, question: 'What is the correct way to give a dataclass field an empty dict default?', options: ['metadata: dict = {}', 'metadata: dict = field(default_factory=dict)', 'metadata: dict = None', 'metadata = dict()'], correctAnswer: 'metadata: dict = field(default_factory=dict)' },
      { id: 3, question: 'A model returns text that looks like JSON. What should your code do?', options: ['Call json.loads directly and let errors propagate', 'Trust it, since the prompt asked for JSON', 'Parse inside a try/except and handle failure explicitly', 'Use eval() to be more forgiving'], correctAnswer: 'Parse inside a try/except and handle failure explicitly' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write parse_model_output(raw) that takes a model response string and returns a dict. If the text is valid JSON, return the parsed object. If it is not, return {"error": "invalid_json", "raw": raw}. Never raise. This is the defensive-parsing habit from Lesson 1.7.',
          language: 'python',
          starterCode: 'import json\n\n\ndef parse_model_output(raw: str) -> dict:\n    try:\n        return json.loads(raw)\n    except json.JSONDecodeError:\n        # TODO: return {"error": "invalid_json", "raw": raw} instead of {}\n        return {}\n\n\nprint(parse_model_output(\'{"answer": "42", "confidence": 0.9}\'))\nprint(parse_model_output(\'Sure! Here is the JSON: {"answer"\'))\n',
          examples: [
            { input: '\'{"answer": "42", "confidence": 0.9}\'', output: "{'answer': '42', 'confidence': 0.9}" },
            { input: "'Sure! Here is the JSON: {\"answer\"'", output: "{'error': 'invalid_json', 'raw': 'Sure! Here is the JSON: {\"answer\"'}", explanation: 'Truncated model output is common — it must not raise.' },
          ],
        },
      ],
    },
  },

  m2: {
    id: 'm2',
    title: 'MODULE 2: MACHINE LEARNING ESSENTIALS',
    overview: 'The ML vocabulary a GenAI engineer needs to reason about model behaviour and evaluate systems — without becoming a researcher.',
    outcomes: ['Explain supervised vs unsupervised learning', 'Split data correctly and spot overfitting', 'Measure quality with precision, recall and F1'],
    lessons: [
      {
        id: 'm2-l1',
        title: 'Lesson 2.1 What Machine Learning Is',
        objectives: ['Frame the problem'],
        theory: 'Traditional programming encodes rules by hand: you write the logic, the data flows through it. Machine learning inverts that — you supply examples of inputs and desired outputs, and the training process derives the rules. That is the whole idea.\nThe engineering judgement is knowing when not to use it. If a problem can be solved with a lookup table, a regular expression or a handful of if-statements, those are cheaper, faster, testable and explainable. ML earns its keep when the rules are too numerous or too fuzzy to write down — language being the classic case.',
        takeaways: ['ML learns rules from examples instead of you writing them.', 'If a regex or lookup solves it, that beats a model.'],
      },
      {
        id: 'm2-l2',
        title: 'Lesson 2.2 Supervised and Unsupervised Learning',
        objectives: ['Tell the paradigms apart'],
        theory: 'Supervised learning trains on labelled data: each example carries the correct answer. Spam detection, sentiment classification and document routing are all supervised problems, and the cost is that somebody has to produce the labels.\nUnsupervised learning finds structure in unlabelled data — clustering similar documents, or reducing dimensionality. It matters for GenAI because embeddings are learned without task labels, and semantic search is effectively unsupervised similarity. Large language models are trained primarily by self-supervision: the label is simply the next token in the text, so the data labels itself.',
        takeaways: ['Supervised needs labels; unsupervised finds structure without them.', 'LLM pretraining is self-supervised — the next token is the label.'],
      },
      {
        id: 'm2-l3',
        title: 'Lesson 2.3 Splitting Data and Overfitting',
        objectives: ['Evaluate honestly'],
        theory: 'You split data three ways. The training set fits the model, the validation set tunes your choices, and the test set is touched once at the very end to estimate real-world performance. Evaluating on data the model trained on tells you nothing — it can memorise.\nOverfitting is a model that has learned the training data rather than the pattern: excellent training scores, poor performance on anything new. The tell is a widening gap between training and validation scores. In GenAI work the same trap appears when you tune prompts against the same twenty examples until they pass; you have overfitted your prompt to a tiny sample.',
        takeaways: ['Train fits, validation tunes, test is touched once.', 'Tuning prompts against a handful of examples is prompt overfitting.'],
      },
      {
        id: 'm2-l4',
        title: 'Lesson 2.4 Features, Labels and Text as Numbers',
        objectives: ['Represent text numerically'],
        theory: 'Features are the inputs a model sees; the label is the answer you want. Models consume numbers, so text must be converted. The classic approaches are bag-of-words and TF-IDF, which count terms and weight them by how distinctive they are across a corpus.\nThese lose word order and meaning: "the dog bit the man" and "the man bit the dog" look identical to bag-of-words, and "car" has no relationship to "automobile". Embeddings, covered in Module 5, solve exactly this by placing meaning in a continuous vector space. Knowing what TF-IDF cannot do is the clearest motivation for why embeddings exist.',
        takeaways: ['Models need numbers; text must be vectorised first.', 'TF-IDF ignores word order and synonymy — that gap is why embeddings exist.'],
      },
      {
        id: 'm2-l5',
        title: 'Lesson 2.5 Measuring Quality',
        objectives: ['Choose the right metric'],
        theory: 'Accuracy is the fraction of predictions that were correct, and it is misleading whenever classes are imbalanced. If one percent of documents are fraudulent, a model that always answers "not fraud" scores ninety-nine percent accuracy while being useless.\nPrecision asks: of the items I flagged, how many were right? Recall asks: of the items I should have flagged, how many did I catch? They trade off against each other, and F1 is their harmonic mean. Which you optimise is a product decision — a legal search tool wants recall, an automated action wants precision. These same metrics reappear in Module 6 to evaluate retrieval.',
        syntax: `precision = true_positives / (true_positives + false_positives)
recall    = true_positives / (true_positives + false_negatives)
f1        = 2 * precision * recall / (precision + recall)`,
        takeaways: ['Accuracy lies on imbalanced data.', 'Precision vs recall is a product decision, not a technical one.'],
      },
    ],
    quiz: [
      { id: 1, question: 'A model scores 99% accuracy detecting fraud, where 1% of cases are fraud. What is most likely?', options: ['It is an excellent model', 'It may be predicting "not fraud" every time', 'It is overfitting the test set', 'Accuracy is the wrong formula'], correctAnswer: 'It may be predicting "not fraud" every time' },
      { id: 2, question: 'Training accuracy keeps rising while validation accuracy falls. What is happening?', options: ['Underfitting', 'Overfitting', 'Data leakage into the test set', 'The learning rate is too low'], correctAnswer: 'Overfitting' },
      { id: 3, question: 'Why is LLM pretraining described as self-supervised?', options: ['It needs no data', 'Humans label every sentence', 'The next token in the text acts as the label', 'It uses clustering instead of labels'], correctAnswer: 'The next token in the text acts as the label' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Implement precision, recall and F1 from the raw counts, without any library. Handle the zero-denominator cases by returning 0.0 rather than raising — a classifier that flags nothing is a real situation your evaluation code must survive.',
          language: 'python',
          starterCode: 'def scores(tp: int, fp: int, fn: int) -> dict:\n    """Return {"precision": p, "recall": r, "f1": f} rounded to 3 decimals."""\n    # TODO: guard every division; return 0.0 instead of raising\n    precision = 0.0\n    recall = 0.0\n    f1 = 0.0\n    return {"precision": round(precision, 3), "recall": round(recall, 3), "f1": round(f1, 3)}\n\n\nprint(scores(tp=70, fp=30, fn=10))\nprint(scores(tp=0, fp=0, fn=25))   # flagged nothing at all\n',
          examples: [
            { input: 'tp=70, fp=30, fn=10', output: "{'precision': 0.7, 'recall': 0.875, 'f1': 0.778}" },
            { input: 'tp=0, fp=0, fn=25', output: "{'precision': 0.0, 'recall': 0.0, 'f1': 0.0}", explanation: 'No predictions at all must not divide by zero.' },
          ],
        },
      ],
    },
  },

  m3: {
    id: 'm3',
    title: 'MODULE 3: LLM FUNDAMENTALS',
    overview: 'How large language models actually work, and the handful of knobs that change their behaviour in production.',
    outcomes: ['Explain tokens, context windows and attention', 'Control output with temperature and top-p', 'Call a model API and handle its failure modes'],
    lessons: [
      {
        id: 'm3-l1',
        title: 'Lesson 3.1 What an LLM Is',
        objectives: ['Build the right mental model'],
        theory: 'A large language model is a next-token predictor. Given a sequence of tokens it produces a probability distribution over what comes next, samples one, appends it, and repeats. Everything you see — reasoning, code, translation — emerges from that loop run at enormous scale.\nHolding this model in your head explains most surprising behaviour. The model has no database and performs no lookup; it has weights. It does not know whether a statement is true, only what text is plausible. That is why grounding it with retrieved documents, rather than trusting recall, is the central technique of practical GenAI engineering.',
        takeaways: ['An LLM predicts the next token, repeatedly. That is the whole mechanism.', 'It has no facts to look up — only weights. Hence retrieval.'],
      },
      {
        id: 'm3-l2',
        title: 'Lesson 3.2 Tokens and the Context Window',
        objectives: ['Budget your context'],
        theory: 'Models do not see characters or words; they see tokens, which are subword fragments. A rough English rule of thumb is four characters per token, so a thousand words lands near thirteen hundred tokens. Code, JSON and non-English text tokenize less efficiently.\nThe context window is the total number of tokens the model can attend to at once, covering system prompt, conversation history, retrieved documents and the response together. Exceeding it does not produce a graceful warning — content gets truncated or the request is rejected. Every serious GenAI system therefore has a context budget, and Module 6 spends it deliberately on retrieved chunks.',
        takeaways: ['Roughly 4 characters per token in English; code and JSON are worse.', 'The window covers prompt, history, context and output together.'],
      },
      {
        id: 'm3-l3',
        title: 'Lesson 3.3 Transformers and Attention',
        objectives: ['Explain the architecture'],
        theory: 'Before transformers, sequence models processed text one position at a time, which made long-range dependencies hard and training slow. The transformer processes the whole sequence in parallel and uses attention to let every token look at every other token directly.\nSelf-attention means each token computes how relevant every other token is to it, then builds its representation as a weighted blend of them. This is how a pronoun late in a paragraph connects to the noun it refers to. The practical consequence you feel as an engineer is cost: attention scales quadratically with sequence length, which is why long contexts are expensive and slow, not merely a licensing limit.',
        takeaways: ['Attention lets every token consult every other token directly.', 'Cost grows quadratically with length — long context is genuinely expensive.'],
      },
      {
        id: 'm3-l4',
        title: 'Lesson 3.4 Decoding: Temperature and Top-p',
        objectives: ['Control randomness'],
        theory: 'At each step the model has a probability distribution over tokens, and decoding parameters decide how you sample from it. Temperature flattens or sharpens that distribution: near zero the model almost always takes the most likely token, giving repeatable output; higher values spread probability and produce more variety.\nTop-p, or nucleus sampling, instead restricts sampling to the smallest set of tokens whose probabilities sum to p. The practical guidance is simple. For extraction, classification, JSON output and anything you will parse, use a temperature at or near zero. For brainstorming and creative copy, raise it. Tuning both aggressively at once mostly makes behaviour hard to reason about.',
        takeaways: ['Temperature near 0 for anything structured or parsed.', 'Raise temperature only where variety is genuinely wanted.'],
      },
      {
        id: 'm3-l5',
        title: 'Lesson 3.5 Hallucination',
        objectives: ['Understand the failure mode'],
        theory: 'A hallucination is fluent, confident output that is false. It is not a bug to be patched — it follows directly from the mechanism. The model optimises for plausible continuations, and a plausible-sounding citation is exactly what a fabricated citation looks like.\nThis reframes your job. You cannot eliminate hallucination by asking the model to be accurate; you reduce it structurally. Ground answers in retrieved source text, require citations that can be checked against real documents, lower temperature, and give the model an explicit path to say it does not know. Module 6 builds each of these into a pipeline.',
        takeaways: ['Hallucination follows from next-token prediction; it is not a patchable bug.', 'Reduce it structurally: grounding, citations, low temperature, an "I do not know" path.'],
      },
      {
        id: 'm3-l6',
        title: 'Lesson 3.6 Calling a Model API',
        objectives: ['Integrate a provider'],
        theory: 'The major providers — OpenAI, Anthropic and Google among them — expose broadly the same shape: you send a list of messages with roles, plus parameters, and receive generated text along with token usage. Learning one transfers readily to the others.\nTreat the provider as an unreliable network dependency, because it is. Requests time out, get rate-limited and occasionally return malformed content. Set explicit timeouts, retry transient failures with backoff, and read the usage numbers on every response so cost is observable from day one. Keep the provider call behind a thin interface of your own so swapping or adding a fallback model is a small change rather than a rewrite.',
        syntax: `# Shape is broadly the same across providers.
response = client.messages.create(
    model=MODEL_ID,                 # keep in config, not scattered in code
    max_tokens=1024,
    temperature=0,                  # structured output
    system="You answer only from the provided context.",
    messages=[{"role": "user", "content": question}],
)
text = response.content[0].text
log_usage(response.usage)           # observe cost from day one`,
        takeaways: ['Providers share a messages + parameters + usage shape.', 'Wrap the call behind your own interface so fallback is cheap.'],
      },
    ],
    quiz: [
      { id: 1, question: 'What does the context window include?', options: ['Only the user question', 'Only the retrieved documents', 'System prompt, history, context and the response together', 'The model weights'], correctAnswer: 'System prompt, history, context and the response together' },
      { id: 2, question: 'You need reliable JSON output. Which temperature?', options: ['At or near 0', 'Around 0.7', 'As high as allowed', 'Temperature has no effect on structure'], correctAnswer: 'At or near 0' },
      { id: 3, question: 'Why is very long context expensive rather than merely restricted?', options: ['Providers charge a flat premium', 'Attention cost grows quadratically with sequence length', 'Long prompts need more disk', 'It forces a larger model'], correctAnswer: 'Attention cost grows quadratically with sequence length' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write fits_in_window(system, history, context, max_output, window) that estimates tokens at 4 characters per token and reports whether a request fits. Return a dict with the estimated prompt tokens, the total including reserved output, whether it fits, and how many tokens you are over by (0 when it fits). This is the context budget every RAG pipeline needs.',
          language: 'python',
          starterCode: 'import math\n\n\ndef estimate_tokens(text: str) -> int:\n    """Rough English estimate: 4 characters per token, rounded up."""\n    return math.ceil(len(text) / 4)\n\n\ndef fits_in_window(system: str, history: list[str], context: list[str],\n                   max_output: int, window: int) -> dict:\n    # TODO: sum the estimated tokens of system + history + context,\n    # add max_output, then compare against window.\n    prompt_tokens = 0\n    total = 0\n    return {\n        "prompt_tokens": prompt_tokens,\n        "total": total,\n        "fits": total <= window,\n        "over_by": max(0, total - window),\n    }\n\n\nprint(fits_in_window("You are helpful.", ["hi there"], ["a" * 4000], 500, 2000))\n',
          examples: [
            { input: 'system=16 chars, history=8 chars, context=4000 chars, max_output=500, window=2000', output: "{'prompt_tokens': 1006, 'total': 1506, 'fits': True, 'over_by': 0}" },
          ],
        },
      ],
    },
  },

  m4: {
    id: 'm4',
    title: 'MODULE 4: PROMPT ENGINEERING',
    overview: 'Prompting as an engineering discipline: structured, templated, versioned, tested and defended against injection.',
    outcomes: ['Apply zero-shot, few-shot and role prompting deliberately', 'Get reliable structured output', 'Recognise and mitigate prompt injection'],
    lessons: [
      {
        id: 'm4-l1',
        title: 'Lesson 4.1 Anatomy of a Prompt',
        objectives: ['Use roles correctly'],
        theory: 'A production prompt is not one blob of text. The system message sets durable instructions: who the model is, what it may use, what format to return, and what to do when it cannot answer. User messages carry the actual request. Assistant messages carry prior turns.\nThe separation matters for both quality and security. Instructions in the system message persist across a conversation, while anything a user types is data rather than instruction. Concatenating everything into one string throws away that distinction, which is precisely the gap prompt injection exploits.',
        syntax: `system = """You answer strictly from the CONTEXT provided.
If the context does not contain the answer, reply exactly: I don't know.
Return JSON: {"answer": string, "sources": string[]}"""

messages = [{"role": "user", "content": f"CONTEXT:\\n{context}\\n\\nQUESTION: {question}"}]`,
        takeaways: ['System = durable rules; user = the request; keep them separate.', 'Flattening roles into one string is what makes injection easy.'],
      },
      {
        id: 'm4-l2',
        title: 'Lesson 4.2 Zero-shot, Few-shot and Role Prompting',
        objectives: ['Pick a technique'],
        theory: 'Zero-shot simply describes the task. It is the right default: cheap, short, and often sufficient for capable models. Few-shot adds worked examples of input and output, which is the strongest tool available when you need a specific format or a subtle judgement the description alone does not convey.\nWith few-shot, examples must be consistent, cover your edge cases, and be few — three to five typically captures most of the benefit, and every example costs tokens on every call. Role prompting ("you are a technical reviewer") shifts tone and framing, but it is far weaker than people assume; it does not grant knowledge or reliability the model lacks.',
        takeaways: ['Start zero-shot; add few-shot examples when format or judgement needs pinning down.', 'Roles shape tone, not capability.'],
      },
      {
        id: 'm4-l3',
        title: 'Lesson 4.3 Structured Output',
        objectives: ['Get parseable results'],
        theory: 'Anything downstream of the model needs predictable structure. Ask for JSON explicitly, give the exact schema in the system message, and set temperature to zero. Where the provider supports a native structured-output or tool-schema mode, prefer it — the constraint is enforced rather than requested.\nStill validate. Even good models occasionally wrap JSON in prose or truncate at the token limit. The production pattern is parse, validate against your schema, and on failure retry once with the error message included. Treat that repair path as normal operation, not an exception, and log how often it fires — a rising rate is an early warning that a prompt or model change has regressed.',
        takeaways: ['Specify the schema, set temperature 0, prefer native structured modes.', 'Parse → validate → retry with the error. Log the repair rate.'],
      },
      {
        id: 'm4-l4',
        title: 'Lesson 4.4 Chain-of-Thought and Reasoning Models',
        objectives: ['Handle multi-step problems'],
        theory: 'Asking a model to work through a problem step by step before answering measurably improves multi-step arithmetic and logic, because each generated token conditions the next — the intermediate steps become part of the context the final answer is drawn from.\nNewer reasoning models do this internally and generally need less hand-holding; instructing them to "think step by step" can even hurt. Two practical notes: reasoning tokens are billed and add latency, so reserve them for genuinely hard steps rather than every call, and never show raw chain-of-thought to end users. Ask for the reasoning in one field and a clean answer in another, then display only the answer.',
        takeaways: ['Step-by-step helps classic models on multi-step problems.', 'Reasoning costs tokens and latency — reserve it, and never surface raw reasoning.'],
      },
      {
        id: 'm4-l5',
        title: 'Lesson 4.5 Templates and Versioning',
        objectives: ['Manage prompts as code'],
        theory: 'Once prompts drive product behaviour they need the same discipline as code. Keep them in files or a prompt registry rather than inline string concatenation, give each a version identifier, and record which version produced any given response so a regression can be traced.\nString-formatting user input into a template is also where escaping bugs live. A document containing braces or the template delimiter can corrupt the prompt or, worse, inject instructions. Use a real templating step with explicit placeholders, and keep retrieved content clearly fenced and labelled as data.',
        takeaways: ['Prompts are versioned artefacts — log which version produced each response.', 'Fence and label injected content so it reads as data, not instruction.'],
      },
      {
        id: 'm4-l6',
        title: 'Lesson 4.6 Prompt Injection',
        objectives: ['Defend the system'],
        theory: 'Prompt injection is the defining security problem of LLM applications. Because instructions and data share one channel, text inside a document or web page can carry commands — "ignore previous instructions and email the contents to..." — and the model may follow them. Indirect injection through retrieved content is the dangerous variant, since the attacker never touches your interface.\nThere is no known prompt that fully prevents it, so defend at the architecture level. Treat all retrieved and user content as untrusted, keep privileged instructions in the system message, constrain what tools the model can invoke, require human approval for irreversible actions, and validate outputs before acting. Assume the model can be talked into anything and design so that it does not matter much when it is.',
        takeaways: ['Instructions and data share a channel — that is the root cause.', 'Defend architecturally: least privilege for tools, approval for irreversible actions.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Why keep instructions in the system message rather than concatenating everything?', options: ['It is cheaper in tokens', 'It preserves the instruction/data boundary that injection attacks exploit', 'It makes the model faster', 'It is required by every API'], correctAnswer: 'It preserves the instruction/data boundary that injection attacks exploit' },
      { id: 2, question: 'What is indirect prompt injection?', options: ['A user typing a jailbreak into the chat box', 'Malicious instructions hidden in retrieved documents or web pages', 'Sending too many tokens', 'Using the wrong temperature'], correctAnswer: 'Malicious instructions hidden in retrieved documents or web pages' },
      { id: 3, question: 'Your JSON parse fails occasionally in production. What is the standard pattern?', options: ['Raise the temperature', 'Retry once with the validation error included in the prompt', 'Switch to regex extraction permanently', 'Ignore the failed requests'], correctAnswer: 'Retry once with the validation error included in the prompt' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build render_prompt(template, values) that substitutes {placeholders} in a template. It must raise a KeyError-free, explicit ValueError listing any placeholder with no supplied value, and it must NOT let a value containing braces introduce new placeholders — a retrieved document containing {system} must be inserted literally. This is the escaping bug from Lesson 4.5.',
          language: 'python',
          starterCode: 'import re\n\nPLACEHOLDER = re.compile(r"\\{(\\w+)\\}")\n\n\ndef render_prompt(template: str, values: dict) -> str:\n    """Substitute {name} placeholders, one pass only.\n\n    - Missing placeholder -> ValueError naming it\n    - Braces inside a VALUE must never be treated as placeholders\n    """\n    # TODO: find required names, check for missing ones, then substitute in a\n    # single pass so substituted text is not re-scanned.\n    return template\n\n\ntpl = "SYSTEM: {role}\\nCONTEXT: {context}\\nQ: {question}"\nprint(render_prompt(tpl, {"role": "analyst", "context": "Costs are {system} bound.", "question": "why?"}))\ntry:\n    render_prompt(tpl, {"role": "analyst"})\nexcept ValueError as e:\n    print("ValueError:", e)\n',
          examples: [
            { input: 'context contains the literal text "{system}"', output: 'SYSTEM: analyst\nCONTEXT: Costs are {system} bound.\nQ: why?', explanation: 'The braces inside the value are inserted literally, not expanded.' },
            { input: 'values missing "context" and "question"', output: "ValueError: missing values for: context, question" },
          ],
        },
      ],
    },
  },

  m5: {
    id: 'm5',
    title: 'MODULE 5: EMBEDDINGS & VECTOR SEARCH',
    overview: 'Turning meaning into geometry: embeddings, similarity metrics, chunking strategy and the databases that store vectors.',
    outcomes: ['Explain what an embedding represents', 'Implement cosine similarity and top-k search', 'Choose a chunking strategy and a vector store'],
    lessons: [
      {
        id: 'm5-l1',
        title: 'Lesson 5.1 From Text to Vectors',
        objectives: ['Understand embeddings'],
        theory: 'An embedding maps a piece of text to a list of numbers — often several hundred to a few thousand dimensions — positioned so that texts with similar meaning land near each other. "How do I reset my password?" and "I forgot my login credentials" share almost no words but sit close together in that space.\nThat property is what makes semantic search possible, and it is exactly what keyword search cannot do. Two operational rules follow. Query and documents must be embedded with the same model, since vectors from different models are not comparable. And changing embedding model means re-embedding your entire corpus — treat it as a migration, not a config change.',
        takeaways: ['Embeddings put meaning in geometry: similar text, nearby vectors.', 'Same model for queries and documents; changing it means re-embedding everything.'],
      },
      {
        id: 'm5-l2',
        title: 'Lesson 5.2 Similarity Metrics',
        objectives: ['Compare vectors'],
        theory: 'Cosine similarity measures the angle between two vectors, ignoring their magnitude, and it is the default for text embeddings because direction carries the meaning while length often reflects incidental things like passage length. It runs from -1 to 1, with 1 being identical direction.\nEuclidean distance measures straight-line separation and is sensitive to magnitude. Dot product combines both. In practice, if your vectors are normalised to unit length — many providers do this for you — cosine similarity and dot product rank results identically, which is why libraries often use dot product for speed. Know which your store uses, because scores are not comparable across metrics.',
        syntax: `def cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return 0.0 if na == 0 or nb == 0 else dot / (na * nb)`,
        takeaways: ['Cosine is the text default — direction matters, magnitude usually does not.', 'On normalised vectors, cosine and dot product rank identically.'],
      },
      {
        id: 'm5-l3',
        title: 'Lesson 5.3 Chunking Strategy',
        objectives: ['Split documents well'],
        theory: 'You cannot embed a whole book as one vector — meaning averages out into mush — so documents are split into chunks. Chunk size is a genuine trade-off. Small chunks retrieve precisely but may lack the surrounding context needed to answer. Large chunks carry context but dilute the embedding and burn your token budget.\nA common starting point is a few hundred tokens with a modest overlap so a sentence spanning a boundary is not lost. Better than tuning numbers blindly is respecting structure: split on headings, paragraphs or code blocks rather than raw character counts, so each chunk is a coherent unit. Always carry metadata — source, page, section — because that is what makes citation possible later.',
        takeaways: ['Chunk size trades retrieval precision against available context.', 'Split on document structure, and always keep source metadata for citations.'],
      },
      {
        id: 'm5-l4',
        title: 'Lesson 5.4 Metadata and Filtering',
        objectives: ['Constrain the search'],
        theory: 'Pure vector similarity is often not enough. Real deployments need results restricted by tenant, department, document date or access permission. Storing structured metadata alongside each vector lets you combine a semantic search with a hard filter.\nPermission filtering is the one that matters most and is most often bolted on too late. In a multi-tenant system, filtering must happen inside the query — not by retrieving broadly and discarding afterwards, which risks leaking content into a prompt the user was never allowed to see. Hybrid search, blending vector similarity with keyword matching, also helps where exact identifiers, product codes or names must match precisely.',
        takeaways: ['Filter by tenant and permission inside the query, never after retrieval.', 'Hybrid vector + keyword search rescues exact identifiers.'],
      },
      {
        id: 'm5-l5',
        title: 'Lesson 5.5 Vector Databases',
        objectives: ['Choose a store'],
        theory: 'A vector database indexes embeddings for fast approximate nearest-neighbour search. Exact search over millions of vectors is too slow, so indexes such as HNSW trade a little recall for large speed gains — a tunable trade-off, not a defect.\nFor most teams the pragmatic choice is pgvector, an extension to PostgreSQL. If you already run Postgres, your vectors, metadata and relational data live in one database with one backup and transaction story, which removes an entire class of consistency problems. Dedicated stores such as Pinecone, Qdrant and Weaviate earn their place at large scale or when you need their specific filtering and hybrid features. Start with pgvector and move only when you can name the limit you hit.',
        takeaways: ['ANN indexes trade a little recall for large speed gains.', 'Start with pgvector if you already run Postgres; move when you can name the limit.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Why is cosine similarity the default for text embeddings?', options: ['It is faster than every alternative', 'Direction carries meaning while magnitude often reflects incidental length', 'It always returns values between 0 and 1', 'It is the only metric vector databases support'], correctAnswer: 'Direction carries meaning while magnitude often reflects incidental length' },
      { id: 2, question: 'You switch to a different embedding model. What must you do?', options: ['Nothing, vectors are interchangeable', 'Re-embed the entire corpus', 'Only re-embed new documents', 'Change the similarity metric'], correctAnswer: 'Re-embed the entire corpus' },
      { id: 3, question: 'In a multi-tenant RAG system, where must permission filtering happen?', options: ['After retrieval, by discarding results', 'Inside the query itself', 'In the system prompt', 'At render time in the UI'], correctAnswer: 'Inside the query itself' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Implement cosine(a, b) and top_k(query_vec, corpus, k, tenant) for a tiny in-memory vector store. top_k must apply the tenant filter BEFORE ranking — the permission rule from Lesson 5.4 — and return the k highest-scoring items as (score, id) tuples, scores rounded to 3 decimals. Handle a zero vector without dividing by zero.',
          language: 'python',
          starterCode: 'CORPUS = [\n    {"id": "a1", "tenant": "acme", "vec": [1.0, 0.0, 1.0]},\n    {"id": "a2", "tenant": "acme", "vec": [0.9, 0.1, 0.8]},\n    {"id": "b1", "tenant": "beta", "vec": [1.0, 0.0, 1.0]},\n    {"id": "a3", "tenant": "acme", "vec": [0.0, 1.0, 0.0]},\n]\n\n\ndef cosine(a: list[float], b: list[float]) -> float:\n    # TODO: dot / (norm(a) * norm(b)); return 0.0 if either norm is 0\n    return 0.0\n\n\ndef top_k(query_vec: list[float], corpus: list[dict], k: int, tenant: str) -> list[tuple]:\n    # TODO: filter by tenant FIRST, then score, sort descending, take k\n    return []\n\n\nprint(top_k([1.0, 0.0, 1.0], CORPUS, 2, "acme"))\nprint(cosine([0.0, 0.0, 0.0], [1.0, 2.0, 3.0]))\n',
          examples: [
            { input: 'query=[1,0,1], k=2, tenant="acme"', output: "[(1.0, 'a1'), (0.997, 'a2')]", explanation: "b1 is an exact match but belongs to another tenant, so it must never appear." },
            { input: 'cosine([0,0,0], [1,2,3])', output: '0.0' },
          ],
        },
      ],
    },
  },

  m6: {
    id: 'm6',
    title: 'MODULE 6: RETRIEVAL-AUGMENTED GENERATION',
    overview: 'The core technique of applied GenAI: ground the model in your own documents, cite sources, and evaluate whether it worked.',
    outcomes: ['Build an ingestion and retrieval pipeline', 'Construct grounded, cited context', 'Evaluate retrieval and answer quality'],
    lessons: [
      {
        id: 'm6-l1',
        title: 'Lesson 6.1 Why RAG',
        objectives: ['Know when to reach for it'],
        theory: 'A model knows only what its weights encode as of training. It cannot see your policies, your tickets or last week\'s decisions, and asking anyway produces confident invention. Retrieval-augmented generation fixes this by finding relevant text first and putting it into the prompt, so the model summarises supplied evidence instead of recalling from memory.\nRAG is usually the right first answer when the requirement involves private, changing or citable knowledge. It updates instantly when a document changes, needs no training run, and — crucially for enterprise buyers — can show its sources. Module 9 covers when fine-tuning is the better tool; the short version is that RAG supplies knowledge, fine-tuning shapes behaviour.',
        takeaways: ['RAG grounds answers in supplied evidence rather than recall.', 'RAG for knowledge, fine-tuning for behaviour.'],
      },
      {
        id: 'm6-l2',
        title: 'Lesson 6.2 The Ingestion Pipeline',
        objectives: ['Get documents in'],
        theory: 'Ingestion runs: load, extract, clean, chunk, embed, store. Each stage has traps. PDF extraction is the usual source of pain — multi-column layouts interleave, tables lose structure, and scanned pages need OCR. Garbage extracted here produces garbage retrieved later, and no amount of prompt tuning recovers it.\nMake ingestion idempotent and incremental. Re-ingesting an unchanged document should not duplicate chunks, so key on a content hash. Record source, page and section on every chunk, because that metadata is what later becomes a citation. Expect to spend more engineering effort here than on the model call; in real deployments ingestion is where the work actually is.',
        takeaways: ['Load → extract → clean → chunk → embed → store. Extraction is the usual weak link.', 'Key chunks on a content hash so re-ingestion is idempotent.'],
      },
      {
        id: 'm6-l3',
        title: 'Lesson 6.3 Retrieval and Reranking',
        objectives: ['Find the right chunks'],
        theory: 'Naive RAG embeds the question, takes the top few chunks by similarity and stuffs them in. It works surprisingly often and is the correct starting point. Its weaknesses appear with short or ambiguous questions and with corpora full of near-duplicates.\nTwo upgrades give most of the improvement. Query rewriting turns a terse follow-up into a self-contained question using conversation history, so "what about the second one?" becomes searchable. Reranking retrieves a wider candidate set — say the top fifty — then scores each against the query with a cross-encoder that reads query and document together, and keeps the best five. It costs an extra model call but consistently lifts answer quality more than prompt tweaking does.',
        takeaways: ['Start naive; add query rewriting and reranking when quality plateaus.', 'Retrieve wide, rerank, then keep few.'],
      },
      {
        id: 'm6-l4',
        title: 'Lesson 6.4 Context and Citations',
        objectives: ['Assemble the prompt'],
        theory: 'How you lay out retrieved text matters. Label each chunk with an identifier and its source, fence it clearly as data, and instruct the model to answer only from it and to cite the identifiers it used. Order matters too: models attend most reliably to the beginning and end of long contexts, so place the strongest chunks at the edges rather than buried in the middle.\nCitations are what make the system trustworthy and auditable, and they must be verifiable. Validate after generation that every identifier the model cited actually exists in the context you supplied — a fabricated citation is the highest-signal hallucination detector you get for free.',
        syntax: `context = "\\n\\n".join(
    f"[{c['id']}] (source: {c['source']}, p.{c['page']})\\n{c['text']}"
    for c in chunks
)
# After generation: every cited id must exist in {c['id'] for c in chunks}`,
        takeaways: ['Label, fence and order chunks; strongest at the edges.', 'Verify cited ids against supplied chunks — fabricated citations are free hallucination detection.'],
      },
      {
        id: 'm6-l5',
        title: 'Lesson 6.5 Evaluating RAG',
        objectives: ['Measure the pipeline'],
        theory: 'RAG has two failure points and you must measure them separately. If retrieval did not surface the right chunk, no prompt can save the answer; if retrieval succeeded but the answer is still wrong, the problem is generation. Conflating them leads to tuning the wrong half for weeks.\nEvaluate retrieval with recall@k — did the correct chunk appear in the top k — using a set of question and expected-source pairs. Evaluate generation on faithfulness, whether every claim is supported by the supplied context, and on relevance to the question. Build a golden set of fifty to a hundred real questions early; it is the single highest-leverage artefact in a RAG project, and it is what lets you change anything with confidence.',
        takeaways: ['Measure retrieval and generation separately or you will tune the wrong half.', 'A golden set of 50–100 real questions is the highest-leverage artefact you can build.'],
      },
      {
        id: 'm6-l6',
        title: 'Lesson 6.6 Reducing Hallucination',
        objectives: ['Harden the answers'],
        theory: 'Grounding reduces hallucination but does not remove it. The model may still blend prior knowledge with the context, over-generalise from a partial match, or answer confidently when the retrieved text does not actually contain the answer.\nThe levers that work are unglamorous. Instruct explicitly that unsupported questions must return a fixed "I do not know" response, and make that an acceptable outcome rather than a failure. Keep temperature at zero. Verify citations. Where retrieval scores are all weak, decline to answer instead of forwarding poor context — a low-confidence retrieval is a signal, and using it is the most common cause of confidently wrong answers.',
        takeaways: ['Make "I don\'t know" an explicit, acceptable output path.', 'Weak retrieval scores are a signal to decline, not to answer anyway.'],
      },
    ],
    quiz: [
      { id: 1, question: 'An answer is wrong. What must you check first?', options: ['The temperature setting', 'Whether retrieval surfaced the correct chunk at all', 'The system prompt wording', 'The embedding dimension'], correctAnswer: 'Whether retrieval surfaced the correct chunk at all' },
      { id: 2, question: 'What does recall@k measure in a RAG system?', options: ['How faithful the answer is to the context', 'Whether the correct chunk appeared in the top k results', 'How many tokens were used', 'The cosine score of the best match'], correctAnswer: 'Whether the correct chunk appeared in the top k results' },
      { id: 3, question: 'The model cites [doc-7], which was never in the supplied context. What is this?', options: ['A retrieval bug', 'A fabricated citation — a detectable hallucination', 'Expected behaviour with citations', 'A chunking error'], correctAnswer: 'A fabricated citation — a detectable hallucination' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build the grounding half of a RAG pipeline. build_context(chunks) formats chunks as "[id] (source: X)\\ntext" joined by blank lines. verify_citations(answer, chunks) extracts every [id] the answer cites and returns {"valid": [...], "fabricated": [...]} — ids not present in the supplied chunks are fabricated. This is the free hallucination detector from Lesson 6.4.',
          language: 'python',
          starterCode: 'import re\n\nCHUNKS = [\n    {"id": "c1", "source": "handbook.pdf", "text": "Leave must be approved by a manager."},\n    {"id": "c2", "source": "policy.pdf", "text": "Carry-over is capped at five days."},\n]\n\n\ndef build_context(chunks: list[dict]) -> str:\n    # TODO: "[id] (source: src)\\ntext", chunks separated by a blank line\n    return ""\n\n\ndef verify_citations(answer: str, chunks: list[dict]) -> dict:\n    # TODO: pull every [id] out of answer; split into valid vs fabricated\n    return {"valid": [], "fabricated": []}\n\n\nprint(build_context(CHUNKS))\nprint(verify_citations("Managers approve leave [c1]; carry-over is capped [c2]. See also [c9].", CHUNKS))\n',
          examples: [
            { input: 'build_context(CHUNKS)', output: '[c1] (source: handbook.pdf)\nLeave must be approved by a manager.\n\n[c2] (source: policy.pdf)\nCarry-over is capped at five days.' },
            { input: 'answer citing [c1], [c2] and [c9]', output: "{'valid': ['c1', 'c2'], 'fabricated': ['c9']}" },
          ],
        },
      ],
    },
  },

  m7: {
    id: 'm7',
    title: 'MODULE 7: AI AGENTS',
    overview: 'Moving past single-turn answers: tool calling, agent loops, memory, multi-agent systems and the safety rails they need.',
    outcomes: ['Implement function calling and an agent loop', 'Design memory and multi-agent structures', 'Apply least privilege and human-in-the-loop'],
    lessons: [
      {
        id: 'm7-l1',
        title: 'Lesson 7.1 What Makes Something an Agent',
        objectives: ['Draw the line'],
        theory: 'A chatbot takes input and returns text. An agent decides what to do next, acts on that decision using tools, observes the result, and repeats until the task is done or it gives up. The distinguishing feature is the loop with real side effects, not the sophistication of the prompt.\nThat autonomy is also the risk. A chatbot that is wrong produces a bad sentence; an agent that is wrong sends an email, deletes a record or spends money. Every design decision in this module — tool scope, approval gates, iteration caps — exists because the failure mode changed from embarrassing to consequential.',
        takeaways: ['Agent = decide → act → observe → repeat, with real side effects.', 'A wrong chatbot writes a bad sentence; a wrong agent takes a bad action.'],
      },
      {
        id: 'm7-l2',
        title: 'Lesson 7.2 Tools and Function Calling',
        objectives: ['Give the model capabilities'],
        theory: 'Function calling is how a model reaches outside itself. You describe available functions with a name, a description and a JSON schema of parameters. The model does not execute anything — it returns a structured request naming the function and arguments. Your code validates and runs it, then feeds the result back.\nThat separation is the security boundary and the thing to internalise: the model proposes, your code disposes. Validate every argument as if it came from an untrusted client, because effectively it did. Tool descriptions are also prompt engineering; vague descriptions produce wrong tool choices far more often than model weakness does.',
        syntax: `TOOLS = [{
    "name": "search_orders",
    "description": "Find orders for a customer. Use when asked about order status or history.",
    "input_schema": {
        "type": "object",
        "properties": {"customer_id": {"type": "string"}, "limit": {"type": "integer"}},
        "required": ["customer_id"],
    },
}]
# The model returns a request; YOUR code validates and executes it.`,
        takeaways: ['The model proposes a call; your code validates and executes it.', 'Treat tool arguments as untrusted input. Write tool descriptions carefully.'],
      },
      {
        id: 'm7-l3',
        title: 'Lesson 7.3 The Agent Loop',
        objectives: ['Implement the cycle'],
        theory: 'The loop is: send the conversation and tool definitions to the model; if it returns a tool call, execute it and append the result as a new message; repeat. When it returns plain text instead of a tool call, that is the final answer. This pattern of interleaving reasoning and action is often called ReAct.\nTwo guards are mandatory rather than optional. Cap the number of iterations, because a confused agent will loop indefinitely and bill you for it. Handle tool errors by returning the error text to the model as an observation instead of crashing — a good agent recovers from a failed call by trying something else, and it cannot do that if your process died.',
        syntax: `for step in range(MAX_STEPS):            # never an unbounded loop
    resp = model(messages, tools=TOOLS)
    if not resp.tool_call:
        return resp.text                  # final answer
    try:
        result = dispatch(resp.tool_call)
    except Exception as e:
        result = f"error: {e}"            # observation, not a crash
    messages.append(tool_result(result))
return "Stopped: step limit reached."`,
        takeaways: ['Always cap iterations — a confused agent loops and bills you.', 'Feed tool errors back as observations so the agent can recover.'],
      },
      {
        id: 'm7-l4',
        title: 'Lesson 7.4 Memory',
        objectives: ['Persist across turns'],
        theory: 'The model itself is stateless: every call resends the entire conversation. Short-term memory is therefore just the message list, bounded by the context window, and once the conversation outgrows the window you must summarise older turns or drop them.\nLong-term memory means storing facts outside the conversation and retrieving them when relevant — which is RAG applied to user history rather than documents. Be deliberate about what is worth remembering; storing every message and retrieving semantically similar ones tends to surface noise. Stable preferences and decisions are worth persisting, small talk is not.',
        takeaways: ['The model is stateless; short-term memory is the message list you resend.', 'Long-term memory is RAG over user history — store facts, not every message.'],
      },
      {
        id: 'm7-l5',
        title: 'Lesson 7.5 Multi-Agent Systems',
        objectives: ['Decompose complex tasks'],
        theory: 'When a task spans distinct skills, one agent with twenty tools becomes unreliable — tool selection degrades as the list grows. The supervisor pattern puts a coordinator in front of specialists, each with a narrow toolset, routing subtasks and assembling results.\nBe honest about the cost. Every additional agent adds latency, tokens and failure surface, and errors compound across handoffs. Most problems presented as multi-agent are better solved by one well-scoped agent with good tools. Reach for multiple agents when the subtasks are genuinely independent and parallelisable, or when the toolsets are so different that one prompt cannot describe them coherently.',
        takeaways: ['Supervisor + narrow specialists beats one agent with twenty tools.', 'Multi-agent adds latency and compounding errors — justify it before adopting it.'],
      },
      {
        id: 'm7-l6',
        title: 'Lesson 7.6 Safety and Human-in-the-Loop',
        objectives: ['Constrain the blast radius'],
        theory: 'Agent safety is an architecture problem, not a prompting problem. Apply least privilege: give each agent the narrowest tools and credentials that let it do its job, and prefer read-only access wherever the task allows. An agent that cannot delete cannot be talked into deleting.\nRequire explicit human approval for anything irreversible or externally visible — sending messages, moving money, changing production data. Log every tool call with its arguments and result so behaviour is auditable after the fact. Combined with the injection risks from Module 4, the guiding assumption is that the model can be manipulated, so design so that manipulation cannot cause serious harm.',
        takeaways: ['Least privilege and read-only by default; approval gates for irreversible actions.', 'Log every tool call with arguments — agents need an audit trail.'],
      },
    ],
    quiz: [
      { id: 1, question: 'When a model makes a function call, what actually executes it?', options: ['The model, inside the provider', 'Your application code, after validating the arguments', 'The vector database', 'The tool schema'], correctAnswer: 'Your application code, after validating the arguments' },
      { id: 2, question: 'Why must an agent loop have an iteration cap?', options: ['Providers require it', 'A confused agent will loop indefinitely and keep billing you', 'It improves answer quality', 'It reduces the context window'], correctAnswer: 'A confused agent will loop indefinitely and keep billing you' },
      { id: 3, question: 'A tool call raises an exception. What should the agent loop do?', options: ['Crash the request', 'Retry the identical call forever', 'Return the error to the model as an observation so it can recover', 'Silently skip it and answer anyway'], correctAnswer: 'Return the error to the model as an observation so it can recover' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Implement run_agent(script, tools, max_steps) — the loop from Lesson 7.3, with a scripted "model" so it runs offline. Each script entry is either {"tool": name, "args": {...}} or {"final": text}. Execute tool calls, append "ok: <result>" or "error: <message>" to a trace, stop on a final answer, and stop with "Stopped: step limit reached." if the script never finishes within max_steps. A raising tool must NOT crash the loop.',
          language: 'python',
          starterCode: 'def add(a: int, b: int) -> int:\n    return a + b\n\n\ndef fail(**_) -> str:\n    raise RuntimeError("upstream timeout")\n\n\nTOOLS = {"add": add, "fail": fail}\n\n\ndef run_agent(script: list[dict], tools: dict, max_steps: int) -> dict:\n    """Return {"answer": str, "trace": list[str]}."""\n    trace: list[str] = []\n    # TODO: step through script up to max_steps.\n    #   {"tool": n, "args": {...}} -> call it, append "ok: <r>" or "error: <e>"\n    #   {"final": text}            -> return it as the answer\n    # Exhausting max_steps -> answer "Stopped: step limit reached."\n    return {"answer": "", "trace": trace}\n\n\nprint(run_agent([{"tool": "add", "args": {"a": 2, "b": 3}}, {"final": "The total is 5."}], TOOLS, 5))\nprint(run_agent([{"tool": "fail", "args": {}}, {"final": "Recovered."}], TOOLS, 5))\nprint(run_agent([{"tool": "add", "args": {"a": 1, "b": 1}}] * 10, TOOLS, 3))\n',
          examples: [
            { input: 'add then final', output: "{'answer': 'The total is 5.', 'trace': ['ok: 5']}" },
            { input: 'failing tool then final', output: "{'answer': 'Recovered.', 'trace': ['error: upstream timeout']}", explanation: 'The exception becomes an observation; the loop survives.' },
            { input: '10 tool calls, max_steps=3', output: "{'answer': 'Stopped: step limit reached.', 'trace': ['ok: 2', 'ok: 2', 'ok: 2']}" },
          ],
        },
      ],
    },
  },

  m8: {
    id: 'm8',
    title: 'MODULE 8: MULTIMODAL GENAI',
    overview: 'Text, images, audio and video — and the latency budget that decides whether a voice agent feels alive or broken.',
    outcomes: ['Describe speech-to-text and text-to-speech pipelines', 'Use vision models on documents and screenshots', 'Budget latency for real-time voice'],
    lessons: [
      {
        id: 'm8-l1',
        title: 'Lesson 8.1 Beyond Text',
        objectives: ['Map the modalities'],
        theory: 'Multimodal models accept and sometimes produce more than text — images, audio and video. Practically this arrives in two shapes: a single model that natively accepts images alongside text, or a pipeline that converts one modality to text, reasons over the text, and converts back.\nThe pipeline approach remains the workhorse for audio because it is composable and debuggable. You can inspect the transcript, log it, evaluate it and swap any stage independently. Native multimodal models are stronger where the visual detail itself matters, such as reading a chart or a screenshot, since converting that to text first destroys the information you needed.',
        takeaways: ['Two shapes: natively multimodal models, or convert-to-text pipelines.', 'Pipelines are debuggable; native models win when visual detail is the point.'],
      },
      {
        id: 'm8-l2',
        title: 'Lesson 8.2 Speech to Text',
        objectives: ['Transcribe reliably'],
        theory: 'Speech recognition models such as Whisper turn audio into text and are strong enough that transcription is rarely the hard part. The hard parts are the edges: domain vocabulary, product names, accents and background noise all degrade accuracy, and errors propagate silently into everything downstream.\nFor real-time use, streaming transcription matters more than raw accuracy. Waiting for the speaker to finish before transcribing adds seconds of dead air. Streaming emits partial results as audio arrives, and pairing it with voice-activity detection to identify end-of-speech is what makes a conversation feel natural rather than walkie-talkie.',
        takeaways: ['Domain vocabulary and noise, not the model, are the usual accuracy problem.', 'Streaming plus voice-activity detection is what makes real-time feel natural.'],
      },
      {
        id: 'm8-l3',
        title: 'Lesson 8.3 Text to Speech and Streaming',
        objectives: ['Close the loop'],
        theory: 'Text-to-speech has become good enough that naturalness is no longer the bottleneck; latency is. The technique that matters is streaming both stages together: begin synthesising audio from the first sentence the LLM produces rather than waiting for the full response.\nThat one change typically removes several seconds of perceived delay, because the user hears speech while the model is still generating. It requires sentence-boundary detection on the token stream and careful audio buffering to avoid gaps, which is where most of the engineering effort in a voice product actually goes.',
        takeaways: ['Stream TTS from the first sentence instead of waiting for the full response.', 'Sentence-boundary detection and audio buffering are the real work.'],
      },
      {
        id: 'm8-l4',
        title: 'Lesson 8.4 Vision',
        objectives: ['Work with images'],
        theory: 'Vision-capable models read screenshots, charts, diagrams, handwriting and scanned pages. The highest-value use in enterprise work is document understanding, particularly for PDFs where traditional text extraction fails — multi-column layouts, tables and scans that carry meaning in their structure.\nA practical hybrid works well: extract text normally where extraction is clean, and fall back to the vision model for pages where it is not. Watch cost and context, since images consume a substantial number of tokens, and remember that an image is untrusted input too — text inside an image can carry a prompt injection just as a document can.',
        takeaways: ['Vision rescues PDFs where text extraction fails; hybrid by page is cost-effective.', 'Images are untrusted input — they can carry injected instructions.'],
      },
      {
        id: 'm8-l5',
        title: 'Lesson 8.5 Voice Agent Architecture',
        objectives: ['Design for latency'],
        theory: 'A voice agent chains speech-to-text, an LLM, possibly retrieval or tools, then text-to-speech, over a persistent WebSocket connection. Each stage adds delay, and the sum is what the user experiences as responsiveness.\nHumans notice conversational delay beyond roughly 800 milliseconds. That is your total budget, and it forces real decisions: stream at every stage, keep the system prompt short, cap retrieval, use a fast model for the conversational path and reserve a stronger one for genuinely hard turns. Handling barge-in — the user interrupting mid-response — means cancelling in-flight generation and synthesis immediately, and it is what separates a demo from a product.',
        takeaways: ['Budget around 800ms end to end; stream at every stage.', 'Barge-in handling separates a voice demo from a voice product.'],
      },
    ],
    quiz: [
      { id: 1, question: 'What most reduces perceived latency in a voice agent?', options: ['A larger model', 'Streaming TTS from the first sentence rather than the full response', 'Raising the temperature', 'A bigger context window'], correctAnswer: 'Streaming TTS from the first sentence rather than the full response' },
      { id: 2, question: 'Why prefer a native vision model over text extraction for a chart?', options: ['It is always cheaper', 'Converting the chart to text destroys the visual information you needed', 'Extraction cannot open PDFs', 'Vision models use fewer tokens'], correctAnswer: 'Converting the chart to text destroys the visual information you needed' },
      { id: 3, question: 'Which is true of images sent to a multimodal model?', options: ['They are inherently safe input', 'Text inside an image can carry a prompt injection', 'They never consume tokens', 'They bypass the context window'], correctAnswer: 'Text inside an image can carry a prompt injection' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write budget_check(stages, target_ms) for a voice pipeline. stages is a list of (name, ms). Return the total, whether it meets the target, and — when it does not — the stages sorted by cost descending so you know what to optimise first. This is the 800ms budget from Lesson 8.5 turned into a tool.',
          language: 'python',
          starterCode: 'PIPELINE = [("stt", 320), ("retrieval", 180), ("llm_first_token", 450), ("tts_first_audio", 200)]\n\n\ndef budget_check(stages: list[tuple], target_ms: int) -> dict:\n    # TODO: total the milliseconds, compare against target_ms, and when over\n    # budget list the stage names sorted by cost descending.\n    return {"total_ms": 0, "within_budget": False, "over_by_ms": 0, "optimise": []}\n\n\nprint(budget_check(PIPELINE, 800))\nprint(budget_check([("stt", 200), ("llm_first_token", 300)], 800))\n',
          examples: [
            { input: 'PIPELINE, target 800', output: "{'total_ms': 1150, 'within_budget': False, 'over_by_ms': 350, 'optimise': ['llm_first_token', 'stt', 'tts_first_audio', 'retrieval']}" },
            { input: '[("stt",200),("llm_first_token",300)], target 800', output: "{'total_ms': 500, 'within_budget': True, 'over_by_ms': 0, 'optimise': []}" },
          ],
        },
      ],
    },
  },

  m9: {
    id: 'm9',
    title: 'MODULE 9: FINE-TUNING',
    overview: 'When to adapt a model rather than prompt or retrieve — dataset preparation, LoRA, and the honest answer about when not to bother.',
    outcomes: ['Choose between prompting, RAG and fine-tuning', 'Prepare and validate a training dataset', 'Explain LoRA, QLoRA and PEFT'],
    lessons: [
      {
        id: 'm9-l1',
        title: 'Lesson 9.1 Prompting vs RAG vs Fine-tuning',
        objectives: ['Choose correctly'],
        theory: 'These solve different problems and are routinely confused in interviews. Prompting changes instructions and is instant and free to iterate. RAG supplies knowledge the model does not have, updates the moment a document changes, and can cite sources. Fine-tuning changes learned behaviour — tone, format, a specialised task — but bakes knowledge in at training time.\nThe decision rule is compact. If the model lacks facts, use RAG. If it knows the facts but consistently behaves wrongly — wrong format, wrong register, wrong task framing — consider fine-tuning. If you have not yet exhausted prompting and few-shot examples, do that first, because it costs hours rather than weeks. Fine-tuning to inject knowledge is the classic expensive mistake: the model learns the style of your documents without reliably learning their content.',
        takeaways: ['Missing facts → RAG. Wrong behaviour → fine-tuning. Try prompting first.', 'Fine-tuning to inject knowledge is the classic expensive mistake.'],
      },
      {
        id: 'm9-l2',
        title: 'Lesson 9.2 Preparing the Dataset',
        objectives: ['Build training data'],
        theory: 'Fine-tuning is mostly a data problem. The usual format is JSONL, one example per line, each holding a messages array in the same shape as an API call. Quality dominates quantity — a few hundred consistent, correct examples routinely beat tens of thousands of noisy ones.\nConsistency is what the model actually learns. If half your examples answer in Markdown and half in plain prose, you are teaching it to be inconsistent. Hold out a genuine validation split before training, never after, and check for near-duplicates between train and validation or your evaluation will flatter itself. Budget most of your project time here; teams routinely underestimate it.',
        syntax: `{"messages": [{"role": "system", "content": "..."},
              {"role": "user", "content": "..."},
              {"role": "assistant", "content": "..."}]}
# One JSON object per line. Consistency across examples matters more than volume.`,
        takeaways: ['A few hundred consistent examples beat tens of thousands of noisy ones.', 'Inconsistent formatting in training data teaches inconsistency.'],
      },
      {
        id: 'm9-l3',
        title: 'Lesson 9.3 Instruction Tuning',
        objectives: ['Understand the stages'],
        theory: 'A base model only continues text; given a question it might produce more questions, because that is a plausible continuation. Instruction tuning trains it to follow instructions and answer, and a further alignment stage using human preference data shapes it to be helpful and safe.\nThis is why the models you call through an API already behave conversationally, and it clarifies what your own fine-tune is doing: adapting an already instruction-tuned model to your specific task, not teaching it language. That framing keeps expectations realistic about how much a small fine-tune can change.',
        takeaways: ['Base models continue text; instruction tuning makes them answer.', 'Your fine-tune adapts an already-tuned model — it does not teach language.'],
      },
      {
        id: 'm9-l4',
        title: 'Lesson 9.4 LoRA, QLoRA and PEFT',
        objectives: ['Train efficiently'],
        theory: 'Full fine-tuning updates every weight and demands enormous memory. Parameter-efficient fine-tuning freezes the original weights and trains a small number of new ones instead. LoRA — low-rank adaptation — inserts small trainable matrices into the model, typically training well under one percent of the parameters.\nThe practical consequences are large. Training becomes feasible on a single GPU, the resulting adapter is megabytes rather than gigabytes, and you can keep several task-specific adapters over one base model and swap them at serving time. QLoRA adds quantisation of the frozen base to shrink memory further, making surprisingly large models tunable on modest hardware. For nearly all applied work, LoRA is the default and full fine-tuning the exception.',
        takeaways: ['LoRA trains a tiny adapter instead of all weights — one GPU, megabyte artefacts.', 'Swap task-specific adapters over one shared base model at serving time.'],
      },
      {
        id: 'm9-l5',
        title: 'Lesson 9.5 Evaluating and Knowing When Not To',
        objectives: ['Judge the result'],
        theory: 'Evaluate a fine-tune against the honest baseline: the best prompt you could write for the original model, measured on the same held-out set. Teams frequently celebrate a fine-tune that a good few-shot prompt would have matched at a fraction of the cost.\nWatch for regression outside your training distribution — a model tuned hard on one narrow task often gets worse at everything else. And recognise the cases where you should not fine-tune at all: knowledge that changes frequently, requirements that demand citations, datasets too small to be representative, or a task where prompting already meets the bar. Saying "we should not fine-tune this, and here is why" is a senior answer in an interview.',
        takeaways: ['Baseline against the best prompt on the original model, not against nothing.', 'Narrow tuning often degrades everything outside the training distribution.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Your chatbot lacks knowledge of internal policies that change monthly. What do you use?', options: ['Fine-tuning', 'RAG', 'A larger context window alone', 'Higher temperature'], correctAnswer: 'RAG' },
      { id: 2, question: 'What does LoRA train?', options: ['Every weight in the model', 'A small number of inserted low-rank matrices, with the base frozen', 'Only the tokenizer', 'The embedding model'], correctAnswer: 'A small number of inserted low-rank matrices, with the base frozen' },
      { id: 3, question: 'What is the correct baseline when evaluating a fine-tune?', options: ['An untrained random model', 'The best prompt on the original model, on the same held-out set', 'The training set score', 'Another fine-tune'], correctAnswer: 'The best prompt on the original model, on the same held-out set' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write validate_dataset(lines) that checks JSONL fine-tuning data before a training run. Return counts of valid examples and a list of problems. Flag: invalid JSON, a missing or empty messages array, any example whose last message is not from the assistant, and exact duplicate examples. Catching these before training saves hours from Lesson 9.2.',
          language: 'python',
          starterCode: 'import json\n\nLINES = [\n    \'{"messages":[{"role":"user","content":"hi"},{"role":"assistant","content":"hello"}]}\',\n    \'{"messages":[{"role":"user","content":"hi"},{"role":"assistant","content":"hello"}]}\',\n    \'{"messages":[{"role":"user","content":"no answer"}]}\',\n    \'{"messages":[]}\',\n    \'not json at all\',\n]\n\n\ndef validate_dataset(lines: list[str]) -> dict:\n    """Return {"valid": int, "problems": [str, ...]} with problems as\n    "line N: <reason>" using 1-based line numbers."""\n    # TODO: parse each line, apply the four checks, keep the order of problems\n    return {"valid": 0, "problems": []}\n\n\nresult = validate_dataset(LINES)\nprint(result["valid"])\nfor p in result["problems"]:\n    print(p)\n',
          examples: [
            { input: 'the 5 LINES above', output: '1\nline 2: duplicate example\nline 3: last message is not from the assistant\nline 4: empty messages array\nline 5: invalid JSON' },
          ],
        },
      ],
    },
  },

  m10: {
    id: 'm10',
    title: 'MODULE 10: PRODUCTION GENAI',
    overview: 'What separates a working demo from a system that survives real traffic: streaming, cost control, caching, retries and fallback.',
    outcomes: ['Stream responses over SSE or WebSockets', 'Control token cost and apply caching', 'Handle rate limits, retries and model fallback'],
    lessons: [
      {
        id: 'm10-l1',
        title: 'Lesson 10.1 Serving Architecture',
        objectives: ['Structure the service'],
        theory: 'A typical production shape puts a gateway in front, handling authentication, rate limiting and routing, with an AI service behind it owning prompts, retrieval and provider calls. Keeping the provider integration in one layer means swapping models or adding a fallback is a contained change.\nIf you already run Go or Node, a common and effective split is to keep the platform there and put a FastAPI service alongside for the model layer, communicating over REST or gRPC. Long generations should not block a request thread — stream them, or push the work to a queue and deliver results asynchronously.',
        takeaways: ['Gateway for auth and limits; a separate AI service owning provider calls.', 'Never block a request thread on a long generation.'],
      },
      {
        id: 'm10-l2',
        title: 'Lesson 10.2 Streaming Responses',
        objectives: ['Deliver tokens as they arrive'],
        theory: 'A ten-second wait for a complete answer feels broken; the same ten seconds with text appearing immediately feels fast. Streaming does not make generation quicker, it changes what the user perceives, and time-to-first-token becomes the metric that matters more than total duration.\nServer-sent events are the simpler transport for one-directional token streams and work well through most infrastructure. WebSockets are appropriate when you need bidirectional traffic, such as voice or interruption. Either way, plan for a stream that dies halfway: handle partial responses, propagate cancellation so an abandoned request stops burning tokens, and remember that buffering proxies will silently defeat streaming if misconfigured.',
        takeaways: ['Optimise time-to-first-token, not total duration.', 'SSE for one-way streams, WebSockets when you need bidirectional; handle partial failure.'],
      },
      {
        id: 'm10-l3',
        title: 'Lesson 10.3 Token Cost',
        objectives: ['Keep spend predictable'],
        theory: 'Providers bill per token, with input and output priced differently and output usually costing more. Cost therefore scales with prompt size, and a RAG system that stuffs ten thousand tokens of context into every request is expensive by design, not by accident.\nMake cost observable before you try to optimise it. Log token usage per request with the user or tenant attached, so you can see which features and which customers drive spend. The reliable levers are retrieving fewer and better chunks, trimming system prompts, capping max output tokens, summarising long histories instead of resending them, and routing easy requests to a cheaper model.',
        takeaways: ['Log per-request token usage with tenant attached before optimising.', 'Fewer, better chunks beats a bigger context window.'],
      },
      {
        id: 'm10-l4',
        title: 'Lesson 10.4 Caching',
        objectives: ['Avoid repeat work'],
        theory: 'Caching is the highest-leverage cost and latency optimisation available. Exact-match caching on identical prompts is trivial and effective for repeated questions. Semantic caching goes further by embedding the query and reusing an answer when a previous question was close enough — powerful, but it needs a carefully chosen threshold, since serving a stale answer to a subtly different question is worse than a cache miss.\nProvider-side prompt caching is worth knowing about separately: when a long prefix such as a system prompt or a fixed document repeats across calls, providers can cache it and charge less for those tokens. Structuring prompts so the stable part comes first makes that caching effective.',
        takeaways: ['Exact-match caching is free money; semantic caching needs a careful threshold.', 'Put the stable prefix first so provider-side prompt caching can work.'],
      },
      {
        id: 'm10-l5',
        title: 'Lesson 10.5 Retries, Timeouts and Fallback',
        objectives: ['Survive provider failure'],
        theory: 'Model APIs fail. You will meet rate limits, transient server errors, and occasional latency spikes far beyond the norm. Every call needs an explicit timeout, and transient failures need retry with exponential backoff plus jitter — without jitter, all your retries collide and you re-create the overload you were backing off from.\nRetry only what is safe to retry: a rate limit or a 5xx, not a validation error, which will fail identically forever. Beyond retries, model fallback keeps you serving when a provider degrades: route to a secondary model, and degrade gracefully rather than erroring — returning retrieved passages without a generated summary is far better than a blank page.',
        syntax: `delay = min(base * (2 ** attempt), max_delay)
delay = delay * (0.5 + random.random() / 2)   # jitter: never retry in lockstep`,
        takeaways: ['Exponential backoff needs jitter or retries synchronise and re-create the overload.', 'Retry 429s and 5xxs; never retry a validation error.'],
      },
      {
        id: 'm10-l6',
        title: 'Lesson 10.6 Rate Limits and Concurrency',
        objectives: ['Stay inside the envelope'],
        theory: 'Providers limit both requests and tokens per minute, and a batch job can exhaust the same quota your interactive users depend on. Treat provider capacity as a shared resource that needs deliberate allocation rather than first-come-first-served.\nThe practical measures are a client-side concurrency limit set below the provider ceiling, a queue for bulk work so it cannot starve interactive traffic, and per-tenant limits so one customer cannot consume everything. Read the rate-limit headers on responses and adapt before you are throttled — reacting to 429s alone means you have already degraded someone\'s experience.',
        takeaways: ['Separate bulk work from interactive traffic; add per-tenant limits.', 'Adapt from rate-limit headers rather than waiting for 429s.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Why add jitter to exponential backoff?', options: ['It reduces token cost', 'Without it, retries synchronise and re-create the overload', 'It is required by HTTP', 'It makes retries faster'], correctAnswer: 'Without it, retries synchronise and re-create the overload' },
      { id: 2, question: 'Which metric matters most for perceived streaming performance?', options: ['Total generation time', 'Time to first token', 'Tokens per request', 'Context window size'], correctAnswer: 'Time to first token' },
      { id: 3, question: 'Which failure should NOT be retried?', options: ['429 rate limit', '503 service unavailable', 'A request validation error', 'A connection timeout'], correctAnswer: 'A request validation error' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write retry_delays(attempts, base_ms, max_ms) returning the backoff schedule WITHOUT jitter (so it is deterministic and testable), capped at max_ms, and should_retry(status) returning True only for 429 and 5xx. Together these are the retry policy from Lesson 10.5.',
          language: 'python',
          starterCode: 'def retry_delays(attempts: int, base_ms: int, max_ms: int) -> list[int]:\n    """Exponential backoff: base * 2**attempt, capped at max_ms.\n\n    Attempt 0 waits base_ms. Jitter is added at call time, not here.\n    """\n    # TODO\n    return []\n\n\ndef should_retry(status: int) -> bool:\n    """Retry transient failures only: 429 and any 5xx."""\n    # TODO\n    return False\n\n\nprint(retry_delays(6, 200, 5000))\nprint([should_retry(s) for s in (429, 503, 500, 400, 422, 200)])\n',
          examples: [
            { input: 'retry_delays(6, 200, 5000)', output: '[200, 400, 800, 1600, 3200, 5000]', explanation: 'The sixth would be 6400 but is capped at max_ms.' },
            { input: 'statuses 429, 503, 500, 400, 422, 200', output: '[True, True, True, False, False, False]' },
          ],
        },
      ],
    },
  },

  m11: {
    id: 'm11',
    title: 'MODULE 11: LLMOPS',
    overview: 'Operating GenAI systems: tracing, evaluation harnesses, guardrails and the monitoring that catches silent regressions.',
    outcomes: ['Instrument tracing across a RAG or agent pipeline', 'Build an automated evaluation harness', 'Apply guardrails and monitor for regression'],
    lessons: [
      {
        id: 'm11-l1',
        title: 'Lesson 11.1 Why LLMOps Exists',
        objectives: ['Frame the discipline'],
        theory: 'Traditional software fails loudly — an exception, a 500, a failing test. GenAI systems fail quietly. The service returns 200, the response is fluent, and the content is wrong. Nothing in conventional monitoring notices.\nLLMOps is the practice built around that gap: tracing so you can see what actually happened inside a request, evaluation so quality is measured rather than sensed, and monitoring tuned to drift and cost rather than only errors. Without it, a prompt edit that quietly degrades ten percent of answers ships unnoticed and is discovered by a customer.',
        takeaways: ['GenAI fails quietly — 200 OK with a wrong answer.', 'Tracing, evaluation and drift monitoring exist to close that gap.'],
      },
      {
        id: 'm11-l2',
        title: 'Lesson 11.2 Tracing',
        objectives: ['See inside a request'],
        theory: 'A single user question may trigger a query rewrite, an embedding call, a vector search, a rerank, a generation and two tool calls. When the answer is wrong, you need to see every step with its inputs, outputs, latency and token usage. That is a trace.\nTools such as LangSmith and Langfuse provide this, and OpenTelemetry lets you fold LLM spans into the tracing you already run for the rest of the platform. Attach a request id, tenant, prompt version and model version to every trace. When someone reports a bad answer, being able to pull up exactly what was retrieved and what was sent to the model turns a debugging afternoon into a few minutes.',
        takeaways: ['Trace every step with inputs, outputs, latency and tokens.', 'Tag traces with request id, tenant, prompt version and model version.'],
      },
      {
        id: 'm11-l3',
        title: 'Lesson 11.3 Evaluation Harnesses',
        objectives: ['Automate quality checks'],
        theory: 'An evaluation harness runs a fixed set of test cases through your pipeline and scores the outputs, giving you the regression test that conventional unit tests cannot provide for non-deterministic systems. Build it around the golden set from Module 6.\nScoring uses three approaches in combination. Deterministic checks catch structure and rules — valid JSON, citations present, no forbidden content. Similarity against a reference answer catches drift. LLM-as-judge, where a model scores an answer against a rubric, handles nuance but must itself be validated against human ratings, or you are trusting one unverified model to grade another. Run the harness in CI on every prompt or model change.',
        takeaways: ['Combine deterministic checks, similarity, and a validated LLM judge.', 'Run the harness in CI on every prompt or model change.'],
      },
      {
        id: 'm11-l4',
        title: 'Lesson 11.4 RAG and Hallucination Evaluation',
        objectives: ['Score groundedness'],
        theory: 'Beyond the retrieval metrics from Module 6, generation needs its own scoring. Faithfulness asks whether every claim in the answer is supported by the retrieved context; the usual method decomposes the answer into individual claims and checks each against the context. Answer relevance asks whether it addressed the question at all.\nCheap proxies are worth wiring up first because they catch a surprising amount: verify every cited identifier exists, flag answers containing specific numbers or dates absent from the context, and track how often the system correctly declines to answer. A sudden fall in the "I don\'t know" rate often signals a regression where the model has started inventing rather than declining.',
        takeaways: ['Decompose an answer into claims and check each against the context.', 'A falling "I don\'t know" rate is an early hallucination warning.'],
      },
      {
        id: 'm11-l5',
        title: 'Lesson 11.5 Guardrails and Security',
        objectives: ['Constrain behaviour'],
        theory: 'Guardrails are checks around the model rather than instructions inside it. On input: length limits, injection heuristics, and redaction of personal data before it leaves your boundary. On output: schema validation, refusal of forbidden categories, and scanning for leaked secrets or personal data before anything reaches a user.\nData leakage deserves specific attention in enterprise deployments. Retrieved context may contain material the requesting user is not entitled to see, so permission filtering belongs in the retrieval query as covered in Module 5. Be explicit with customers about what is sent to which provider and whether it may be retained — in regulated industries that question decides the architecture, and sometimes the deal.',
        takeaways: ['Guardrails wrap the model: validate input and output outside the prompt.', 'Be explicit about what leaves your boundary and whether it is retained.'],
      },
      {
        id: 'm11-l6',
        title: 'Lesson 11.6 Monitoring in Production',
        objectives: ['Watch the right signals'],
        theory: 'Track latency as percentiles rather than averages, since the tail is what users complain about, and track time-to-first-token separately for streaming endpoints. Track cost per request, per tenant and per feature so spend has an owner. Track failure and retry rates by provider so degradation is visible before customers report it.\nThe GenAI-specific signals are the ones teams forget: the distribution of retrieval scores, refusal rate, JSON repair rate, and evaluation scores over time. Each is an early warning. Retrieval scores drifting downward usually means the corpus has changed shape, and it will show up in these metrics well before it shows up as complaints.',
        takeaways: ['Latency percentiles, cost per tenant, failure rate by provider.', 'Watch retrieval score distribution, refusal rate and JSON repair rate as early warnings.'],
      },
    ],
    quiz: [
      { id: 1, question: 'Why is conventional monitoring insufficient for GenAI systems?', options: ['It cannot measure latency', 'Responses return 200 OK while being wrong', 'Providers block metrics', 'Token usage is not exposed'], correctAnswer: 'Responses return 200 OK while being wrong' },
      { id: 2, question: 'You use LLM-as-judge for scoring. What must you also do?', options: ['Nothing, model scores are objective', 'Validate the judge against human ratings', 'Use the same model as the one being judged', 'Raise the judge temperature'], correctAnswer: 'Validate the judge against human ratings' },
      { id: 3, question: 'The rate of "I don\'t know" responses drops sharply after a prompt change. What does this suggest?', options: ['Retrieval improved', 'The model may have started inventing answers instead of declining', 'Users asked easier questions', 'Cost will fall'], correctAnswer: 'The model may have started inventing answers instead of declining' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Build the deterministic half of an evaluation harness. score_case(answer, context_ids, expected_substring) returns a dict of checks: cites_sources (at least one [id] present), citations_valid (every cited id is in context_ids), contains_expected (case-insensitive), and declined (the answer is exactly "I don\'t know."). Then run_harness(cases) returns the pass rate per check, rounded to 2 decimals.',
          language: 'python',
          starterCode: 'import re\n\nCASES = [\n    {"answer": "Managers approve leave [c1].", "context_ids": ["c1", "c2"], "expected": "manager"},\n    {"answer": "Carry-over is five days [c9].", "context_ids": ["c1", "c2"], "expected": "five"},\n    {"answer": "I don\'t know.", "context_ids": ["c1"], "expected": "anything"},\n]\n\n\ndef score_case(answer: str, context_ids: list[str], expected_substring: str) -> dict:\n    # TODO: return the four boolean checks described in the prompt\n    return {"cites_sources": False, "citations_valid": False,\n            "contains_expected": False, "declined": False}\n\n\ndef run_harness(cases: list[dict]) -> dict:\n    # TODO: score every case, then return the pass RATE per check (2 dp)\n    return {}\n\n\nprint(score_case(CASES[1]["answer"], CASES[1]["context_ids"], CASES[1]["expected"]))\nprint(run_harness(CASES))\n',
          examples: [
            { input: 'answer citing [c9] with context_ids [c1, c2]', output: "{'cites_sources': True, 'citations_valid': False, 'contains_expected': True, 'declined': False}" },
            { input: 'run_harness(CASES)', output: "{'cites_sources': 0.67, 'citations_valid': 0.33, 'contains_expected': 0.67, 'declined': 0.33}" },
          ],
        },
      ],
    },
  },

  m12: {
    id: 'm12',
    title: 'MODULE 12: FORWARD DEPLOYED ENGINEERING',
    overview: 'The FDE half of the role: turning a vague customer problem into a scoped, integrated, deployed and measurable AI system.',
    outcomes: ['Run requirement discovery with a customer', 'Scope and size a solution honestly', 'Integrate with enterprise data, auth and environments'],
    lessons: [
      {
        id: 'm12-l1',
        title: 'Lesson 12.1 What a Forward Deployed Engineer Does',
        objectives: ['Understand the role'],
        theory: 'An FDE sits between the product and the customer, and builds. The work starts before requirements exist: a customer says "we have ten million documents and want employees to search them with AI", and turning that into a specification is the job, not a prerequisite for it.\nWhat distinguishes the role is that engineering quality and customer communication carry equal weight. You will write production code, and you will also sit in a room explaining why the approach they asked for will not work and what you propose instead. Interviews probe both, which is why practising the discovery conversation matters as much as practising system design.',
        takeaways: ['FDEs turn vague problems into specifications, then build them.', 'Engineering and customer communication carry equal weight.'],
      },
      {
        id: 'm12-l2',
        title: 'Lesson 12.2 Requirement Gathering',
        objectives: ['Ask the right questions'],
        theory: 'Customers describe solutions rather than problems. "We want a chatbot" is a proposed solution; your job is to find the underlying need. Ask who the users are, what they do today, how long it takes, what a good answer looks like, and how they will know the system is working.\nThe questions that most often change the design are unglamorous. Where does the data live and who owns it? What are the access rules, and do they vary per user? How current must answers be? What is the consequence of a wrong answer — mild embarrassment, or regulatory exposure? That last question alone determines whether you need citations, human review, or should decline the project as scoped.',
        takeaways: ['Customers describe solutions; dig for the problem underneath.', 'The cost of a wrong answer determines the entire architecture.'],
      },
      {
        id: 'm12-l3',
        title: 'Lesson 12.3 Solution Architecture and Scoping',
        objectives: ['Design and size'],
        theory: 'Design the smallest system that proves value, then extend. For a document search request, that usually means one document type, one department and a narrow question set — shipped in weeks and measurable — rather than the full corpus in six months with no feedback until the end.\nSize honestly, including the parts that are not modelling. Ingestion and data cleaning typically dominate the timeline. Integration with existing authentication is rarely quick. Evaluation needs a golden set someone has to write. Presenting a plan that names these explicitly builds far more trust than an optimistic estimate that slips, and it is exactly the judgement an FDE interview is testing.',
        takeaways: ['Ship the smallest system that proves value, then extend.', 'Ingestion, auth integration and evaluation dominate timelines — say so upfront.'],
      },
      {
        id: 'm12-l4',
        title: 'Lesson 12.4 Data Integration and Enterprise Auth',
        objectives: ['Connect to real systems'],
        theory: 'Enterprise data lives in SharePoint, Confluence, S3, Salesforce, network drives and databases, each with its own API, quirks and permission model. Building connectors, handling incremental sync and dealing with formats that resist extraction is where most of the real engineering time goes.\nPermissions are the part that must be right from the first day. If a document is restricted to the finance team, that restriction must survive ingestion, retrieval and generation — which means capturing access metadata at ingestion and filtering inside the retrieval query. Retrofitting permissions onto a working prototype is painful and risky; a demo that leaks one restricted document can end an engagement.',
        takeaways: ['Connectors, sync and extraction consume most of the engineering time.', 'Carry access metadata from ingestion through to the retrieval filter, from day one.'],
      },
      {
        id: 'm12-l5',
        title: 'Lesson 12.5 Deploying in Customer Environments',
        objectives: ['Ship where they live'],
        theory: 'Customers may require deployment inside their own cloud account, their VPC, or fully on-premises with no internet access — which rules out hosted model APIs and pushes you toward open-weight models running locally. That constraint changes the architecture, so ask about it early rather than discovering it at delivery.\nDebugging in a customer environment is its own skill. You often cannot reproduce locally, may have limited log access, and every change needs approval. Structured logging, feature flags, and a configuration story that does not require a rebuild are what make the difference between a fix in an hour and a fix next sprint.',
        takeaways: ['Ask about deployment constraints early — on-prem rules out hosted APIs.', 'Structured logs and config-without-rebuild make remote debugging survivable.'],
      },
      {
        id: 'm12-l6',
        title: 'Lesson 12.6 Communicating Trade-offs',
        objectives: ['Earn technical trust'],
        theory: 'Much of the job is explaining constraints to people who do not share your background. Say what the system cannot do as clearly as what it can. A customer who understands that answers are grounded in their documents and that anything outside them returns "I don\'t know" will read a refusal as correct behaviour rather than failure.\nQuantify trade-offs where you can: this configuration costs roughly this much per thousand questions, responds in about this long, and answers correctly at about this rate on your own golden set. Numbers from their data move conversations that adjectives cannot. And when you get something wrong, say so early — credibility recovered late is credibility lost.',
        takeaways: ['State limitations as clearly as capabilities — it reframes refusals as correct.', 'Quantify cost, latency and accuracy on the customer\'s own data.'],
      },
    ],
    quiz: [
      { id: 1, question: 'A customer says "we want an AI chatbot". What is the first FDE move?', options: ['Start building a chatbot', 'Find the underlying problem and who the users are', 'Choose a vector database', 'Estimate token cost'], correctAnswer: 'Find the underlying problem and who the users are' },
      { id: 2, question: 'When must document access permissions be handled?', options: ['After the prototype is validated', 'At ingestion and inside the retrieval query, from day one', 'Only in the UI layer', 'Only for on-premises deployments'], correctAnswer: 'At ingestion and inside the retrieval query, from day one' },
      { id: 3, question: 'A customer requires fully on-premises deployment with no internet. What changes?', options: ['Nothing significant', 'Hosted model APIs are ruled out; you need open-weight models running locally', 'Only the billing model', 'You must use a larger context window'], correctAnswer: 'Hosted model APIs are ruled out; you need open-weight models running locally' },
    ],
    assignment: {
      prompts: [
        {
          kind: 'code',
          prompt: 'Write size_ingestion(docs, avg_pages, chunk_tokens, embed_cost_per_million, throughput_pages_per_min) to produce the sizing numbers an FDE needs in a scoping call: total pages, estimated chunks (assume 500 tokens per page, rounded up per page), embedding cost in dollars rounded to 2 decimals, and ingestion hours rounded to 1 decimal. Being able to answer "what will it cost and how long" in the room is the Lesson 12.3 skill.',
          language: 'python',
          starterCode: 'import math\n\nTOKENS_PER_PAGE = 500\n\n\ndef size_ingestion(docs: int, avg_pages: float, chunk_tokens: int,\n                   embed_cost_per_million: float,\n                   throughput_pages_per_min: float) -> dict:\n    """Rough sizing for an ingestion run.\n\n    chunks  = ceil(TOKENS_PER_PAGE / chunk_tokens) per page\n    cost    = total_tokens / 1_000_000 * embed_cost_per_million\n    hours   = total_pages / throughput_pages_per_min / 60\n    """\n    # TODO\n    return {"total_pages": 0, "total_chunks": 0, "embed_cost_usd": 0.0, "ingest_hours": 0.0}\n\n\nprint(size_ingestion(10_000, 12, 400, 0.02, 250))\n',
          examples: [
            { input: '10,000 docs x 12 pages, 400-token chunks, $0.02/M tokens, 250 pages/min', output: "{'total_pages': 120000, 'total_chunks': 240000, 'embed_cost_usd': 1.2, 'ingest_hours': 8.0}", explanation: 'Each 500-token page yields ceil(500/400) = 2 chunks.' },
          ],
        },
        'Write a one-page scoping response to this customer request: "We have 10 million documents across SharePoint and a network drive, and we want employees to search them using AI." State the clarifying questions you would ask first, the smallest system you would ship to prove value, the three risks you would flag in the first meeting, and how you would measure success. Answer as if writing to the customer, not to a colleague.',
      ],
    },
  },
};
