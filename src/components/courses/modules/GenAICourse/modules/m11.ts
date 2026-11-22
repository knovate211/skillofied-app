import type { ModuleData } from '../GenAICourseData';

const mod_m11: ModuleData = {
  id: 'm11',
  title: 'MODULE 11: LLMOPS',
  overview: 'Operating GenAI systems: tracing, evaluation harnesses, guardrails and the monitoring that catches silent regressions.',
  outcomes: ['Instrument tracing across a RAG or agent pipeline', 'Build an automated evaluation harness', 'Apply guardrails and monitor for regression'],
  lessons: [
    {
      id: 'm11-l1',
      title: 'Lesson 11.1 Why LLMOps Exists',
      objectives: [
        'Explain why GenAI systems fail silently.',
        'Say what conventional monitoring cannot see.',
        'Name the three practices that close the gap.',
      ],
      theory: 'Traditional software fails loudly — an exception, a 500, a failing test. GenAI systems fail quietly. The service returns 200, the response is fluent, and the content is wrong. Nothing in conventional monitoring notices.\nLLMOps is the practice built around that gap: tracing so you can see what actually happened inside a request, evaluation so quality is measured rather than sensed, and monitoring tuned to drift and cost rather than only errors. Without it, a prompt edit that quietly degrades ten percent of answers ships unnoticed and is discovered by a customer.\nThe scenario below is the one that should worry you. Every conventional signal is green — no errors, healthy latency, normal throughput — while a tenth of answers are wrong. A dashboard built for ordinary software would show nothing at all.',
      callout: {
        lead: 'The uncomfortable scenario:',
        text: 'zero errors, healthy latency, and 10% of answers wrong. Conventional monitoring shows a perfectly green dashboard.',
      },
      codeExample: `RESPONSES = [
    {"status": 200, "latency_ms": 820, "answer_correct": True},
    {"status": 200, "latency_ms": 790, "answer_correct": True},
    {"status": 200, "latency_ms": 810, "answer_correct": False},   # fluent and wrong
    {"status": 200, "latency_ms": 805, "answer_correct": True},
]

errors = sum(1 for r in RESPONSES if r["status"] >= 400)
avg_latency = sum(r["latency_ms"] for r in RESPONSES) / len(RESPONSES)
wrong = sum(1 for r in RESPONSES if not r["answer_correct"])

print("conventional dashboard:")
print(f"  error rate   {errors / len(RESPONSES):.0%}")
print(f"  avg latency  {avg_latency:.0f}ms")
print("  status       ALL GREEN")

print("\\nwhat it cannot see:")
print(f"  wrong answers {wrong / len(RESPONSES):.0%}")`,
      codeOutput: 'conventional dashboard:\n  error rate   0%\n  avg latency  806ms\n  status       ALL GREEN\n\nwhat it cannot see:\n  wrong answers 25%',
      takeaways: [
        'GenAI fails quietly — 200 OK with a wrong answer.',
        'Tracing, evaluation and drift monitoring exist to close that gap.',
        'Error rate and latency can be perfect while quality is collapsing.',
      ],
    },
    {
      id: 'm11-l2',
      title: 'Lesson 11.2 Tracing',
      objectives: [
        'Record every stage of a request with its cost.',
        'Tag traces so a report can be traced back.',
        'Find the expensive or failing stage quickly.',
      ],
      theory: 'A single user question may trigger a query rewrite, an embedding call, a vector search, a rerank, a generation and two tool calls. When the answer is wrong, you need to see every step with its inputs, outputs, latency and token usage. That is a trace.\nTools such as LangSmith and Langfuse provide this, and OpenTelemetry lets you fold LLM spans into the tracing you already run for the rest of the platform. Attach a request id, tenant, prompt version and model version to every trace. When someone reports a bad answer, being able to pull up exactly what was retrieved and what was sent to the model turns a debugging afternoon into a few minutes.\nThe prompt version tag earns its keep the first time someone reports a regression. Without it you are guessing which prompt produced the answer; with it, you compare two traces and the difference is in front of you.',
      callout: {
        lead: 'The tag that pays for itself:',
        text: 'prompt version. Without it, a regression report is guesswork; with it, you diff two traces.',
      },
      codeExample: `TRACE = {
    "request_id": "req-8891",
    "tenant": "acme",
    "prompt_version": "answer-v7",
    "spans": [
        {"name": "query_rewrite", "ms": 210, "tokens": 120},
        {"name": "embed",         "ms": 90,  "tokens": 0},
        {"name": "vector_search", "ms": 45,  "tokens": 0},
        {"name": "rerank",        "ms": 380, "tokens": 2400},
        {"name": "generate",      "ms": 1310, "tokens": 3100},
    ],
}

total_ms = sum(s["ms"] for s in TRACE["spans"])
total_tokens = sum(s["tokens"] for s in TRACE["spans"])

print(f"{TRACE['request_id']}  tenant={TRACE['tenant']}  prompt={TRACE['prompt_version']}")
for span in TRACE["spans"]:
    bar = "#" * round(span["ms"] / total_ms * 30)
    print(f"  {span['name']:<14}{span['ms']:>5}ms {bar}")

print(f"\\ntotal {total_ms}ms, {total_tokens} tokens")`,
      codeOutput: 'req-8891  tenant=acme  prompt=answer-v7\n  query_rewrite   210ms ###\n  embed            90ms #\n  vector_search    45ms #\n  rerank          380ms ######\n  generate       1310ms ###################\n\ntotal 2035ms, 5620 tokens',
      takeaways: [
        'Trace every step with inputs, outputs, latency and tokens.',
        'Tag traces with request id, tenant, prompt version and model version.',
        'The trace tells you which stage to fix; the total latency does not.',
      ],
    },
    {
      id: 'm11-l3',
      title: 'Lesson 11.3 Evaluation Harnesses',
      objectives: [
        'Build a regression test for a non-deterministic system.',
        'Combine deterministic, similarity and judge scoring.',
        'Validate an LLM judge before trusting it.',
      ],
      theory: 'An evaluation harness runs a fixed set of test cases through your pipeline and scores the outputs, giving you the regression test that conventional unit tests cannot provide for non-deterministic systems. Build it around the golden set from Module 6.\nScoring uses three approaches in combination. Deterministic checks catch structure and rules — valid JSON, citations present, no forbidden content. Similarity against a reference answer catches drift. LLM-as-judge, where a model scores an answer against a rubric, handles nuance but must itself be validated against human ratings, or you are trusting one unverified model to grade another. Run the harness in CI on every prompt or model change.\nStart with the deterministic checks. They are free, they never disagree with themselves, and in practice they catch a surprising share of real regressions before any judge is involved.',
      callout: {
        lead: 'Start here:',
        text: 'deterministic checks are free and never disagree with themselves. Exhaust them before reaching for a judge.',
      },
      codeExample: `import re

CITATION = re.compile(r"\\[(\\w+)\\]")

CASES = [
    {"answer": "Managers approve leave [c1].",   "ids": ["c1", "c2"], "expect": "manager"},
    {"answer": "Carry-over is five days [c9].",  "ids": ["c1", "c2"], "expect": "five"},
    {"answer": "I don't know.",                  "ids": ["c1"],       "expect": "anything"},
]


def score_case(answer: str, ids: list[str], expect: str) -> dict:
    cited = CITATION.findall(answer)
    return {
        "cites_sources": bool(cited),
        "citations_valid": bool(cited) and all(c in ids for c in cited),
        "contains_expected": expect.lower() in answer.lower(),
        "declined": answer.strip() == "I don't know.",
    }


checks = ["cites_sources", "citations_valid", "contains_expected", "declined"]
scored = [score_case(c["answer"], c["ids"], c["expect"]) for c in CASES]

for name in checks:
    rate = sum(s[name] for s in scored) / len(scored)
    print(f"{name:<20}{rate:.2f}")

print("\\nno model involved — and citations_valid already caught a fabrication")`,
      codeOutput: 'cites_sources       0.67\ncitations_valid     0.33\ncontains_expected   0.67\ndeclined            0.33\n\nno model involved — and citations_valid already caught a fabrication',
      takeaways: [
        'Combine deterministic checks, similarity, and a validated LLM judge.',
        'Run the harness in CI on every prompt or model change.',
        'Deterministic checks cost nothing and catch a surprising share of regressions.',
      ],
    },
    {
      id: 'm11-l4',
      title: 'Lesson 11.4 RAG and Hallucination Evaluation',
      objectives: [
        'Decompose an answer into checkable claims.',
        'Use cheap proxies before expensive judges.',
        'Treat the refusal rate as a leading indicator.',
      ],
      theory: 'Beyond the retrieval metrics from Module 6, generation needs its own scoring. Faithfulness asks whether every claim in the answer is supported by the retrieved context; the usual method decomposes the answer into individual claims and checks each against the context. Answer relevance asks whether it addressed the question at all.\nCheap proxies are worth wiring up first because they catch a surprising amount: verify every cited identifier exists, flag answers containing specific numbers or dates absent from the context, and track how often the system correctly declines to answer. A sudden fall in the "I don\'t know" rate often signals a regression where the model has started inventing rather than declining.\nThe number check below is the highest-yield proxy of the three. Hallucinated specifics are usually numbers — dates, amounts, durations — and a number in the answer that appears nowhere in the context is a strong signal, found with a regular expression rather than a model.',
      callout: {
        lead: 'The highest-yield cheap check:',
        text: 'a number in the answer that appears nowhere in the context. Hallucinated specifics are almost always numbers.',
      },
      codeExample: `import re

NUMBER = re.compile(r"\\d+")

CONTEXT = "Refunds are issued within 14 days. Appeals must be filed within 30 days."

ANSWERS = [
    "Refunds take 14 days and appeals 30 days.",
    "Refunds take 14 days, and expedited refunds take 3 days.",
]

context_numbers = set(NUMBER.findall(CONTEXT))

for answer in ANSWERS:
    used = set(NUMBER.findall(answer))
    unsupported = sorted(used - context_numbers)
    verdict = f"UNSUPPORTED numbers: {unsupported}" if unsupported else "all numbers grounded"
    print(f"{verdict}\\n  {answer}")`,
      codeOutput: "all numbers grounded\n  Refunds take 14 days and appeals 30 days.\nUNSUPPORTED numbers: ['3']\n  Refunds take 14 days, and expedited refunds take 3 days.",
      takeaways: [
        'Decompose an answer into claims and check each against the context.',
        'A falling "I don\'t know" rate is an early hallucination warning.',
        'Numbers absent from the context are the cheapest strong signal available.',
      ],
    },
    {
      id: 'm11-l5',
      title: 'Lesson 11.5 Guardrails and Security',
      objectives: [
        'Apply checks around the model, not inside the prompt.',
        'Redact personal data before it leaves your boundary.',
        'Be explicit about what is sent to which provider.',
      ],
      theory: 'Guardrails are checks around the model rather than instructions inside it. On input: length limits, injection heuristics, and redaction of personal data before it leaves your boundary. On output: schema validation, refusal of forbidden categories, and scanning for leaked secrets or personal data before anything reaches a user.\nData leakage deserves specific attention in enterprise deployments. Retrieved context may contain material the requesting user is not entitled to see, so permission filtering belongs in the retrieval query as covered in Module 5. Be explicit with customers about what is sent to which provider and whether it may be retained — in regulated industries that question decides the architecture, and sometimes the deal.\nRedaction has to happen before the request leaves your network, not after the response returns. Once a card number has been sent to a third party, no amount of output scanning undoes it.',
      callout: {
        lead: 'Order matters:',
        text: 'redact before the request leaves your network. Once it has been sent, output scanning cannot undo it.',
      },
      codeExample: `import re

PATTERNS = {
    "CARD": re.compile(r"\\b\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4}\\b"),
    "EMAIL": re.compile(r"\\b[\\w.]+@[\\w.]+\\.\\w+\\b"),
}


def redact(text: str) -> tuple[str, list[str]]:
    found = []
    for label, pattern in PATTERNS.items():
        if pattern.search(text):
            found.append(label)
            text = pattern.sub(f"[{label}]", text)
    return text, found


message = "Charge 4111 1111 1111 1111 and email the receipt to sam@example.com"
clean, found = redact(message)

print("outbound:", clean)
print("redacted:", found)
print("\\nthis happens BEFORE the provider call, not after the response")`,
      codeOutput: 'outbound: Charge [CARD] and email the receipt to [EMAIL]\nredacted: [\'CARD\', \'EMAIL\']\n\nthis happens BEFORE the provider call, not after the response',
      takeaways: [
        'Guardrails wrap the model: validate input and output outside the prompt.',
        'Be explicit about what leaves your boundary and whether it is retained.',
        'Redact on the way out, not on the way back.',
      ],
    },
    {
      id: 'm11-l6',
      title: 'Lesson 11.6 Monitoring in Production',
      objectives: [
        'Track latency as percentiles rather than averages.',
        'Attribute cost per tenant and feature.',
        'Watch the GenAI-specific early warnings.',
      ],
      theory: 'Track latency as percentiles rather than averages, since the tail is what users complain about, and track time-to-first-token separately for streaming endpoints. Track cost per request, per tenant and per feature so spend has an owner. Track failure and retry rates by provider so degradation is visible before customers report it.\nThe GenAI-specific signals are the ones teams forget: the distribution of retrieval scores, refusal rate, JSON repair rate, and evaluation scores over time. Each is an early warning. Retrieval scores drifting downward usually means the corpus has changed shape, and it will show up in these metrics well before it shows up as complaints.\nThe average is the metric that lies most reliably. A handful of very slow requests barely move it while ruining the experience for exactly the users most likely to complain, which is why the p95 and p99 belong on the dashboard and the mean does not.',
      callout: {
        lead: 'The metric that lies:',
        text: 'the average. A few very slow requests barely move it — and those users are the ones who complain.',
      },
      codeExample: `LATENCIES = [780, 800, 810, 790, 820, 795, 805, 815, 4200, 5100]


def percentile(values: list[int], p: float) -> int:
    ordered = sorted(values)
    index = min(int(p * len(ordered)), len(ordered) - 1)
    return ordered[index]


average = sum(LATENCIES) / len(LATENCIES)

print(f"average  {average:>6.0f}ms   <- looks acceptable")
print(f"p50      {percentile(LATENCIES, 0.50):>6}ms")
print(f"p95      {percentile(LATENCIES, 0.95):>6}ms   <- what the complaints are about")
print(f"max      {max(LATENCIES):>6}ms")
print(f"\\n{sum(1 for v in LATENCIES if v > 3000)} of {len(LATENCIES)} requests took over 3s")`,
      codeOutput: 'average    1572ms   <- looks acceptable\np50         810ms\np95        5100ms   <- what the complaints are about\nmax        5100ms\n\n2 of 10 requests took over 3s',
      takeaways: [
        'Latency percentiles, cost per tenant, failure rate by provider.',
        'Watch retrieval score distribution, refusal rate and JSON repair rate as early warnings.',
        'The average hides exactly the requests users complain about.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "Why is conventional monitoring insufficient for GenAI systems?", options: ["Responses return 200 OK while being wrong", "It cannot measure latency", "Providers block metrics", "Token usage is not exposed"], correctAnswer: "Responses return 200 OK while being wrong" },
    { id: 2, question: "You use LLM-as-judge for scoring. What must you also do?", options: ["Nothing, model scores are objective", "Validate the judge against human ratings", "Use the same model as the one being judged", "Raise the judge temperature"], correctAnswer: "Validate the judge against human ratings" },
    { id: 3, question: "The rate of \"I don't know\" responses drops sharply after a prompt change. What does this suggest?", options: ["Retrieval improved", "Users asked easier questions", "The model may have started inventing answers instead of declining", "Retrieval has improved, so the model finds answers more often"], correctAnswer: "The model may have started inventing answers instead of declining" },
    { id: 4, question: "Why track latency percentiles rather than the average?", options: ["Percentiles are cheaper to compute", "Averages are unavailable in most tools", "Percentiles also count failed requests, which averages exclude", "A few very slow requests barely move the average but ruin those users' experience"], correctAnswer: "A few very slow requests barely move the average but ruin those users' experience" },
    { id: 5, question: "Which trace tag most helps diagnose a reported regression?", options: ["Prompt version", "Response length", "Server hostname", "Time of day"], correctAnswer: "Prompt version" },
    { id: 6, question: "Where in the request lifecycle must personal data be redacted?", options: ["After the provider responds", "Before the request leaves your network", "In the UI layer", "During logging only"], correctAnswer: "Before the request leaves your network" },
    { id: 7, question: "Which is the cheapest strong signal that an answer contains a hallucinated specific?", options: ["A second model grading it", "Response length", "A number in the answer that appears nowhere in the context", "Latency above the p95, since fabrication takes longer to generate"], correctAnswer: "A number in the answer that appears nowhere in the context" },
    { id: 8, question: "What are guardrails, precisely?", options: ["Instructions inside the system prompt", "A provider feature", "A type of fine-tuning", "Checks applied around the model, on input and output"], correctAnswer: "Checks applied around the model, on input and output" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "Latencies are 200, 220, 250, 260 and 9,000ms. What does the average hide that p95 or max reveals?",
        options: [
          "Nothing; the average captures it",
          "That most requests were slow, since the average is close to two seconds",
          "One request took 9 seconds — the average of 1,986ms describes no real user",
          "That the system is overloaded",
        ],
        correctAnswer: "One request took 9 seconds — the average of 1,986ms describes no real user",
      },
      {
        kind: 'mcq',
        prompt: "An evaluation harness checks each answer for citations present, citations valid, and an expected substring. What kind of checks are these?",
        options: [
          "LLM-as-judge scores",
          "Human evaluation",
          "LLM-as-judge scores that rate each answer against a rubric",
          "Deterministic checks — cheap, repeatable and suitable to run in CI on every change",
        ],
        correctAnswer: "Deterministic checks — cheap, repeatable and suitable to run in CI on every change",
      },
      {
        kind: 'mcq',
        prompt: "Answer quality is quietly degrading over two weeks with no errors in the logs. What detects this?",
        options: [
          "Tracking a quality metric daily against a rolling baseline and alerting on a sustained drop",
          "Monitoring HTTP error rates",
          "Monitoring HTTP error rates and alerting when 5xx responses rise",
          "Checking the provider status page",
        ],
        correctAnswer: "Tracking a quality metric daily against a rolling baseline and alerting on a sustained drop",
      },
      {
        kind: 'mcq',
        prompt: "A regression is reported on Tuesday. Traces record prompt version, model version and retrieval config per request. What does that enable?",
        options: [
          "Automatic rollback without any analysis",
          "Pinpointing which change coincided with the regression instead of guessing",
          "Automatic rollback to the last version with no analysis needed",
          "Faster responses",
        ],
        correctAnswer: "Pinpointing which change coincided with the regression instead of guessing",
      },
      {
        kind: 'mcq',
        prompt: "An answer states \"refunds within 45 days\" but the supplied context only mentions 30 days. What is the cheapest reliable detection?",
        options: [
          "Ask a second model whether the answer seems plausible",
          "Measure response latency",
          "Check that numbers in the answer appear in the context",
          "Count tokens in the answer",
        ],
        correctAnswer: "Check that numbers in the answer appear in the context",
      },
    ],
  },
};

export default mod_m11;
