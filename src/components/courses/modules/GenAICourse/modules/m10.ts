import type { ModuleData } from '../GenAICourseData';

const mod_m10: ModuleData = {
  id: 'm10',
  title: 'MODULE 10: PRODUCTION GENAI',
  overview: 'What separates a working demo from a system that survives real traffic: streaming, cost control, caching, retries and fallback.',
  outcomes: ['Stream responses over SSE or WebSockets', 'Control token cost and apply caching', 'Handle rate limits, retries and model fallback'],
  lessons: [
    {
      id: 'm10-l1',
      title: 'Lesson 10.1 Serving Architecture',
      objectives: [
        'Separate gateway concerns from the AI service.',
        'Keep provider integration in one layer.',
        'Avoid blocking a request thread on a generation.',
      ],
      theory: 'A typical production shape puts a gateway in front, handling authentication, rate limiting and routing, with an AI service behind it owning prompts, retrieval and provider calls. Keeping the provider integration in one layer means swapping models or adding a fallback is a contained change.\nIf you already run Go or Node, a common and effective split is to keep the platform there and put a FastAPI service alongside for the model layer, communicating over REST or gRPC. Long generations should not block a request thread — stream them, or push the work to a queue and deliver results asynchronously.\nThe test for whether the seam is in the right place is simple: count how many files change when you add a fallback model. If the answer is one, the layering is right. If provider calls are scattered through handlers, every one of them is a place a fallback can be forgotten.',
      callout: {
        lead: 'A test for your layering:',
        text: 'how many files change when you add a fallback model? One means the seam is right.',
      },
      codeExample: `# Every provider call goes through one function. That is the whole point.
CALL_SITES = {
    "scattered": ["chat_handler.py", "summarise.py", "classify.py", "batch_job.py"],
    "layered":   ["llm_client.py"],
}

for shape, files in CALL_SITES.items():
    print(f"{shape:<11} adding a fallback touches {len(files)} file(s): {', '.join(files)}")

print("\\nand every missed call site is a request with no fallback")`,
      codeOutput: 'scattered   adding a fallback touches 4 file(s): chat_handler.py, summarise.py, classify.py, batch_job.py\nlayered     adding a fallback touches 1 file(s): llm_client.py\n\nand every missed call site is a request with no fallback',
      takeaways: [
        'Gateway for auth and limits; a separate AI service owning provider calls.',
        'Never block a request thread on a long generation.',
        'One provider call site means fallback, logging and cost tracking land everywhere at once.',
      ],
    },
    {
      id: 'm10-l2',
      title: 'Lesson 10.2 Streaming Responses',
      objectives: [
        'Optimise time-to-first-token over total duration.',
        'Choose between SSE and WebSockets.',
        'Handle a stream that dies halfway.',
      ],
      theory: 'A ten-second wait for a complete answer feels broken; the same ten seconds with text appearing immediately feels fast. Streaming does not make generation quicker, it changes what the user perceives, and time-to-first-token becomes the metric that matters more than total duration.\nServer-sent events are the simpler transport for one-directional token streams and work well through most infrastructure. WebSockets are appropriate when you need bidirectional traffic, such as voice or interruption. Either way, plan for a stream that dies halfway: handle partial responses, propagate cancellation so an abandoned request stops burning tokens, and remember that buffering proxies will silently defeat streaming if misconfigured.\nCancellation is the one with a direct cost. A user who closes the tab has stopped caring about the answer, but unless the cancellation reaches the provider call you are still generating and still paying for every token.',
      callout: {
        lead: 'The one with a bill attached:',
        text: 'a user who closed the tab is still costing you tokens unless cancellation reaches the provider call.',
      },
      codeExample: `TOTAL_MS = 9_000
FIRST_TOKEN_MS = 400

print("without streaming:")
print(f"  user sees nothing for {TOTAL_MS / 1000:.0f}s, then everything")

print("with streaming:")
print(f"  first token at {FIRST_TOKEN_MS / 1000:.1f}s, rest arrives while they read")

print(f"\\nsame {TOTAL_MS / 1000:.0f}s of generation, {TOTAL_MS // FIRST_TOKEN_MS}x better perceived latency")

abandoned_at_ms = 1_200
wasted = TOTAL_MS - abandoned_at_ms
print(f"\\nuser closes the tab at {abandoned_at_ms / 1000:.1f}s:")
print(f"  without cancellation you keep generating for another {wasted / 1000:.1f}s and pay for it")`,
      codeOutput: 'without streaming:\n  user sees nothing for 9s, then everything\nwith streaming:\n  first token at 0.4s, rest arrives while they read\n\nsame 9s of generation, 22x better perceived latency\n\nuser closes the tab at 1.2s:\n  without cancellation you keep generating for another 7.8s and pay for it',
      takeaways: [
        'Optimise time-to-first-token, not total duration.',
        'SSE for one-way streams, WebSockets when you need bidirectional; handle partial failure.',
        'Propagate cancellation or abandoned requests keep billing you.',
      ],
    },
    {
      id: 'm10-l3',
      title: 'Lesson 10.3 Token Cost',
      objectives: [
        'Attribute spend to tenants and features.',
        'Identify which lever actually reduces cost.',
        'Make cost observable before optimising it.',
      ],
      theory: 'Providers bill per token, with input and output priced differently and output usually costing more. Cost therefore scales with prompt size, and a RAG system that stuffs ten thousand tokens of context into every request is expensive by design, not by accident.\nMake cost observable before you try to optimise it. Log token usage per request with the user or tenant attached, so you can see which features and which customers drive spend. The reliable levers are retrieving fewer and better chunks, trimming system prompts, capping max output tokens, summarising long histories instead of resending them, and routing easy requests to a cheaper model.\nAttribution usually produces a surprise. Spend is rarely spread evenly; one tenant or one feature is typically responsible for a disproportionate share, and you cannot find that out from an aggregate monthly bill.',
      callout: {
        lead: 'What attribution finds:',
        text: 'spend is never spread evenly. One tenant or one feature usually dominates — and the monthly total hides it.',
      },
      codeExample: `IN_RATE, OUT_RATE = 3.00, 15.00        # USD per million tokens

REQUESTS = [
    {"tenant": "acme",   "feature": "chat",    "in": 1_200, "out": 300},
    {"tenant": "acme",   "feature": "summary", "in": 9_800, "out": 900},
    {"tenant": "globex", "feature": "chat",    "in": 1_100, "out": 280},
    {"tenant": "acme",   "feature": "summary", "in": 9_400, "out": 860},
]


def cost(r: dict) -> float:
    return (r["in"] * IN_RATE + r["out"] * OUT_RATE) / 1_000_000


by_tenant: dict[str, float] = {}
by_feature: dict[str, float] = {}
for r in REQUESTS:
    by_tenant[r["tenant"]] = by_tenant.get(r["tenant"], 0) + cost(r)
    by_feature[r["feature"]] = by_feature.get(r["feature"], 0) + cost(r)

total = sum(by_tenant.values())
print(f"total {total:.4f} USD across {len(REQUESTS)} requests\\n")
for label, group in (("tenant", by_tenant), ("feature", by_feature)):
    for name, amount in sorted(group.items(), key=lambda kv: -kv[1]):
        print(f"  {label:<8}{name:<10}{amount:.4f} USD  {amount / total:.0%}")`,
      codeOutput: 'total 0.0996 USD across 4 requests\n\n  tenant  acme      0.0921 USD  92%\n  tenant  globex    0.0075 USD  8%\n  feature summary   0.0840 USD  84%\n  feature chat      0.0156 USD  16%',
      takeaways: [
        'Log per-request token usage with tenant attached before optimising.',
        'Fewer, better chunks beats a bigger context window.',
        'Attribution finds the one tenant or feature that dominates the bill.',
      ],
    },
    {
      id: 'm10-l4',
      title: 'Lesson 10.4 Caching',
      objectives: [
        'Apply exact-match caching first.',
        'Choose a semantic cache threshold deliberately.',
        'Structure prompts for provider-side prefix caching.',
      ],
      theory: 'Caching is the highest-leverage cost and latency optimisation available. Exact-match caching on identical prompts is trivial and effective for repeated questions. Semantic caching goes further by embedding the query and reusing an answer when a previous question was close enough — powerful, but it needs a carefully chosen threshold, since serving a stale answer to a subtly different question is worse than a cache miss.\nProvider-side prompt caching is worth knowing about separately: when a long prefix such as a system prompt or a fixed document repeats across calls, providers can cache it and charge less for those tokens. Structuring prompts so the stable part comes first makes that caching effective.\nThe threshold is where semantic caching goes wrong. Set it too low and "how do I cancel my order" serves the answer for "how do I cancel my subscription" — a plausible neighbour and a completely different answer. When in doubt, set it high; a cache miss costs a request, a wrong hit costs trust.',
      callout: {
        lead: 'When in doubt, set it high:',
        text: 'a cache miss costs one request. A wrong semantic hit costs a user\'s trust in every answer after it.',
      },
      codeExample: `THRESHOLD = 0.97

CACHE = {"how do I cancel my order": "Orders can be cancelled within 1 hour."}

# Pretend similarity scores against the one cached question.
INCOMING = [
    ("how do I cancel my order", 1.00),
    ("How do I cancel my order?", 0.99),
    ("how do I cancel my subscription", 0.94),
]

for question, score in INCOMING:
    if score >= THRESHOLD:
        print(f"HIT  {score:.2f}  {question!r}")
    else:
        print(f"MISS {score:.2f}  {question!r}  <- different answer entirely")`,
      codeOutput: "HIT  1.00  'how do I cancel my order'\nHIT  0.99  'How do I cancel my order?'\nMISS 0.94  'how do I cancel my subscription'  <- different answer entirely",
      takeaways: [
        'Exact-match caching is free money; semantic caching needs a careful threshold.',
        'Put the stable prefix first so provider-side prompt caching can work.',
        'Order and subscription are near neighbours with different answers — set the threshold high.',
      ],
    },
    {
      id: 'm10-l5',
      title: 'Lesson 10.5 Retries, Timeouts and Fallback',
      objectives: [
        'Retry only what is safe to retry.',
        'Apply exponential backoff with jitter.',
        'Degrade gracefully instead of erroring.',
      ],
      theory: 'Model APIs fail. You will meet rate limits, transient server errors, and occasional latency spikes far beyond the norm. Every call needs an explicit timeout, and transient failures need retry with exponential backoff plus jitter — without jitter, all your retries collide and you re-create the overload you were backing off from.\nRetry only what is safe to retry: a rate limit or a 5xx, not a validation error, which will fail identically forever. Beyond retries, model fallback keeps you serving when a provider degrades: route to a secondary model, and degrade gracefully rather than erroring — returning retrieved passages without a generated summary is far better than a blank page.\nGraceful degradation is the step most systems skip. When the model is unavailable, a RAG system still has the retrieved passages, and showing them with an honest note is far more useful than an error page — the user came for the information, not for the prose.',
      callout: {
        lead: 'The step most systems skip:',
        text: 'when generation fails, a RAG system still has the retrieved passages. Show those rather than an error page.',
      },
      syntax: `delay = min(base * (2 ** attempt), max_delay)
delay = delay * (0.5 + random.random() / 2)   # jitter: never retry in lockstep`,
      codeExample: `def retry_delays(attempts: int, base_ms: int, max_ms: int) -> list[int]:
    return [min(base_ms * 2 ** attempt, max_ms) for attempt in range(attempts)]


def should_retry(status: int) -> bool:
    """Transient only. A 422 will fail identically forever."""
    return status == 429 or 500 <= status < 600


print("backoff:", retry_delays(6, 200, 5000))
for status in (429, 503, 400, 422):
    print(f"  {status} -> retry: {should_retry(status)}")

print("\\nall retries exhausted, provider still down:")
print("  degraded: here are the 3 passages we found, without a generated summary")`,
      codeOutput: 'backoff: [200, 400, 800, 1600, 3200, 5000]\n  429 -> retry: True\n  503 -> retry: True\n  400 -> retry: False\n  422 -> retry: False\n\nall retries exhausted, provider still down:\n  degraded: here are the 3 passages we found, without a generated summary',
      takeaways: [
        'Exponential backoff needs jitter or retries synchronise and re-create the overload.',
        'Retry 429s and 5xxs; never retry a validation error.',
        'Degrade to retrieved passages rather than returning an error page.',
      ],
    },
    {
      id: 'm10-l6',
      title: 'Lesson 10.6 Rate Limits and Concurrency',
      objectives: [
        'Separate bulk work from interactive traffic.',
        'Set a client-side concurrency limit below the ceiling.',
        'Adapt from rate-limit headers before being throttled.',
      ],
      theory: 'Providers limit both requests and tokens per minute, and a batch job can exhaust the same quota your interactive users depend on. Treat provider capacity as a shared resource that needs deliberate allocation rather than first-come-first-served.\nThe practical measures are a client-side concurrency limit set below the provider ceiling, a queue for bulk work so it cannot starve interactive traffic, and per-tenant limits so one customer cannot consume everything. Read the rate-limit headers on responses and adapt before you are throttled — reacting to 429s alone means you have already degraded someone\'s experience.\nThe allocation below is the shape that works: reserve capacity for interactive traffic, let bulk work have what remains, and let bulk work queue rather than compete. A batch job finishing an hour later is invisible; an interactive request timing out is not.',
      callout: {
        lead: 'Allocate, do not share:',
        text: 'a batch job finishing an hour late is invisible. An interactive request timing out is not.',
      },
      codeExample: `PROVIDER_CEILING = 100          # concurrent requests the provider allows
SAFETY_MARGIN = 0.8

usable = int(PROVIDER_CEILING * SAFETY_MARGIN)
interactive = int(usable * 0.75)
bulk = usable - interactive

print(f"provider ceiling      {PROVIDER_CEILING}")
print(f"we use                {usable}   (margin for other clients and spikes)")
print(f"  interactive         {interactive}   never queued behind batch work")
print(f"  bulk                {bulk}   queues; may take an hour longer")

pending_batch = 5_000
print(f"\\n{pending_batch:,} queued batch items cannot touch the {interactive} interactive slots")`,
      codeOutput: 'provider ceiling      100\nwe use                80   (margin for other clients and spikes)\n  interactive         60   never queued behind batch work\n  bulk                20   queues; may take an hour longer\n\n5,000 queued batch items cannot touch the 60 interactive slots',
      takeaways: [
        'Separate bulk work from interactive traffic; add per-tenant limits.',
        'Adapt from rate-limit headers rather than waiting for 429s.',
        'Set your own ceiling below the provider\'s so spikes have somewhere to go.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "Why add jitter to exponential backoff?", options: ["Without it, retries synchronise and re-create the overload", "Jitter shortens each wait, so the total retry time is lower", "It is required by HTTP", "It makes retries faster"], correctAnswer: "Without it, retries synchronise and re-create the overload" },
    { id: 2, question: "Which metric matters most for perceived streaming performance?", options: ["Total generation time", "Time to first token", "Tokens per request", "Context window size"], correctAnswer: "Time to first token" },
    { id: 3, question: "Which failure should NOT be retried?", options: ["429 rate limit", "503 service unavailable", "A request validation error", "A connection timeout"], correctAnswer: "A request validation error" },
    { id: 4, question: "A user closes the tab mid-generation. What must happen?", options: ["Nothing — the response is discarded", "Cache the response so it is ready if the user opens the tab again", "The request should be retried", "Cancellation must propagate to the provider call or you keep paying for tokens"], correctAnswer: "Cancellation must propagate to the provider call or you keep paying for tokens" },
    { id: 5, question: "Why log token usage per tenant rather than only in aggregate?", options: ["Spend is rarely even — attribution finds the tenant or feature that dominates", "Providers require it", "It reduces cost directly", "Per-tenant logs let the provider route each tenant to faster servers"], correctAnswer: "Spend is rarely even — attribution finds the tenant or feature that dominates" },
    { id: 6, question: "What is the risk of setting a semantic cache threshold too low?", options: ["More cache misses", "Serving a stale answer to a subtly different question", "Higher embedding cost", "More cache misses, so the cache barely reduces traffic"], correctAnswer: "Serving a stale answer to a subtly different question" },
    { id: 7, question: "All retries are exhausted and the provider is still down. What is the best behaviour for a RAG system?", options: ["Return a 500 error", "Retry indefinitely", "Show the retrieved passages without a generated summary", "Return a cached answer to a different question"], correctAnswer: "Show the retrieved passages without a generated summary" },
    { id: 8, question: "Why set your client-side concurrency limit below the provider ceiling?", options: ["Providers charge a lower rate when you stay below the ceiling", "Providers reject requests at the ceiling", "It improves model quality", "It leaves headroom for spikes and other clients sharing the quota"], correctAnswer: "It leaves headroom for spikes and other clients sharing the quota" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "An exponential backoff with base 200ms and a cap of 5,000ms retries five times. What is the delay before the 5th retry, without jitter?",
        options: [
          "5,000ms",
          "3,200ms",
          "1,000ms",
          "6,400ms",
        ],
        correctAnswer: "3,200ms",
      },
      {
        kind: 'mcq',
        prompt: "Three thousand clients all hit a rate limit at the same instant and retry on the same fixed schedule. What happens?",
        options: [
          "The provider queues them fairly",
          "Each succeeds on its first retry",
          "They retry in synchronised waves and re-create the overload; jitter spreads them out",
          "The backoff cap spaces them out, so the overload clears on its own",
        ],
        correctAnswer: "They retry in synchronised waves and re-create the overload; jitter spreads them out",
      },
      {
        kind: 'mcq',
        prompt: "A monthly bill doubles. Per-feature logging shows one tenant's document summariser using 80% of output tokens. What does this show?",
        options: [
          "Aggregate totals would have shown the same thing",
          "Output tokens are cheaper than input tokens",
          "The provider has overcharged",
          "Attribution by tenant and feature is what locates the cost driver",
        ],
        correctAnswer: "Attribution by tenant and feature is what locates the cost driver",
      },
      {
        kind: 'mcq',
        prompt: "Which response should trigger a retry?",
        options: [
          "A 503 from the provider",
          "A 400 because your request body is malformed",
          "A 401 because the API key is invalid",
          "A content-policy refusal",
        ],
        correctAnswer: "A 503 from the provider",
      },
      {
        kind: 'mcq',
        prompt: "Two questions — \"reset my password\" and \"reset my 2FA device\" — hit a semantic cache with a loose threshold and get the same answer. What went wrong?",
        options: [
          "The threshold was too strict, so the cache matched on keywords only",
          "The threshold was too permissive, so a subtly different question was served a wrong cached answer",
          "Embeddings cannot represent passwords",
          "The cache TTL was too long",
        ],
        correctAnswer: "The threshold was too permissive, so a subtly different question was served a wrong cached answer",
      },
    ],
  },
};

export default mod_m10;
