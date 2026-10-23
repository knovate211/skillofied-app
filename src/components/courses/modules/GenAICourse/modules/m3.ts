import type { ModuleData } from '../GenAICourseData';

const mod_m3: ModuleData = {
  id: 'm3',
  title: 'MODULE 3: LLM FUNDAMENTALS',
  overview: 'How large language models actually work, and the handful of knobs that change their behaviour in production.',
  outcomes: ['Explain tokens, context windows and attention', 'Control output with temperature and top-p', 'Call a model API and handle its failure modes'],
  lessons: [
    {
      id: 'm3-l1',
      title: 'Lesson 3.1 What an LLM Is',
      objectives: [
        'Describe the next-token loop precisely.',
        'Explain why a model has no facts to look up.',
        'Connect the mechanism to the need for retrieval.',
      ],
      theory: 'A large language model is a next-token predictor. Given a sequence of tokens it produces a probability distribution over what comes next, samples one, appends it, and repeats. Everything you see — reasoning, code, translation — emerges from that loop run at enormous scale.\nHolding this model in your head explains most surprising behaviour. The model has no database and performs no lookup; it has weights. It does not know whether a statement is true, only what text is plausible. That is why grounding it with retrieved documents, rather than trusting recall, is the central technique of practical GenAI engineering.\nThe toy below makes the loop concrete. A real model has billions of parameters instead of a small table, and its distribution is computed rather than stored, but the shape of what happens is identical: look at the context, produce a distribution, pick a token, append, repeat.',
      callout: {
        lead: 'Think of it like this:',
        text: 'the model is not recalling facts. It is producing the text that most plausibly comes next.',
      },
      codeExample: `# A model in miniature: a table of "what usually follows what".
NEXT = {
    "the": {"model": 0.6, "user": 0.3, "cat": 0.1},
    "model": {"predicts": 0.7, "fails": 0.3},
    "predicts": {"the": 0.9, "nothing": 0.1},
}


def greedy(start: str, steps: int) -> str:
    """Always take the most likely token — temperature 0."""
    out, token = [start], start
    for _ in range(steps):
        dist = NEXT.get(token)
        if not dist:
            break
        token = max(dist, key=dist.get)
        out.append(token)
    return " ".join(out)


print(greedy("the", 4))
print("no lookup, no database — just a distribution, sampled repeatedly")`,
      codeOutput: 'the model predicts the model\nno lookup, no database — just a distribution, sampled repeatedly',
      takeaways: [
        'An LLM predicts the next token, repeatedly. That is the whole mechanism.',
        'It has no facts to look up — only weights. Hence retrieval.',
        'Scale changes the quality of the distribution, not the shape of the loop.',
      ],
    },
    {
      id: 'm3-l2',
      title: 'Lesson 3.2 Tokens and the Context Window',
      objectives: [
        'Estimate token counts from character counts.',
        'Account for everything the window must hold.',
        'Build a context budget before you exceed one.',
      ],
      theory: 'Models do not see characters or words; they see tokens, which are subword fragments. A rough English rule of thumb is four characters per token, so a thousand words lands near thirteen hundred tokens. Code, JSON and non-English text tokenize less efficiently.\nThe context window is the total number of tokens the model can attend to at once, covering system prompt, conversation history, retrieved documents and the response together. Exceeding it does not produce a graceful warning — content gets truncated or the request is rejected. Every serious GenAI system therefore has a context budget, and Module 6 spends it deliberately on retrieved chunks.\nBudget the output too. Reserving space for the response is the step most often forgotten, and it is why a request that looks comfortably inside the window still fails: the prompt fits, but the prompt plus what the model wants to say does not.',
      callout: {
        lead: 'The step people forget:',
        text: 'reserve room for the answer. The window holds your prompt AND the response, not just the prompt.',
      },
      codeExample: `import math

WINDOW = 8_000
MAX_OUTPUT = 800


def tokens(text: str) -> int:
    """English rule of thumb: about 4 characters per token."""
    return math.ceil(len(text) / 4)


parts = {
    "system prompt": "You answer strictly from the supplied context." * 2,
    "chat history": "previous turns " * 120,
    "retrieved context": "policy text " * 2400,
}

used = 0
for name, text in parts.items():
    t = tokens(text)
    used += t
    print(f"{name:<18}{t:>6}")

print(f"{'reserved output':<18}{MAX_OUTPUT:>6}")
total = used + MAX_OUTPUT
print(f"{'TOTAL':<18}{total:>6} / {WINDOW}")
print("fits" if total <= WINDOW else f"OVER BUDGET by {total - WINDOW} tokens")`,
      codeOutput: 'system prompt         23\nchat history         450\nretrieved context   7200\nreserved output      800\nTOTAL               8473 / 8000\nOVER BUDGET by 473 tokens',
      takeaways: [
        'Roughly 4 characters per token in English; code and JSON are worse.',
        'The window covers prompt, history, context and output together.',
        'Reserve the output budget explicitly or requests fail at generation time.',
      ],
    },
    {
      id: 'm3-l3',
      title: 'Lesson 3.3 Transformers and Attention',
      objectives: [
        'Explain self-attention in one sentence.',
        'Say why transformers replaced sequential models.',
        'Predict the cost consequence of a longer context.',
      ],
      theory: 'Before transformers, sequence models processed text one position at a time, which made long-range dependencies hard and training slow. The transformer processes the whole sequence in parallel and uses attention to let every token look at every other token directly.\nSelf-attention means each token computes how relevant every other token is to it, then builds its representation as a weighted blend of them. This is how a pronoun late in a paragraph connects to the noun it refers to. The practical consequence you feel as an engineer is cost: attention scales quadratically with sequence length, which is why long contexts are expensive and slow, not merely a licensing limit.\nQuadratic means the jump is worse than intuition suggests. Doubling the context does not double the attention work, it quadruples it — which is the real reason "just use the million-token window" is rarely the right answer to a retrieval problem.',
      callout: {
        lead: 'Why this matters commercially:',
        text: 'doubling the context quadruples the attention work. “Just use a bigger window” is rarely the cheap option.',
      },
      codeExample: `def pairwise_scores(n_tokens: int) -> int:
    """Every token attends to every token: n x n."""
    return n_tokens * n_tokens


base = 1_000
for n in (1_000, 4_000, 16_000, 64_000):
    factor = pairwise_scores(n) // pairwise_scores(base)
    print(f"{n:>7} tokens -> {pairwise_scores(n):>15,} scores  ({factor:>5}x)")

print("\\n64x the context, 4096x the attention work")`,
      codeOutput: '   1000 tokens ->       1,000,000 scores  (    1x)\n   4000 tokens ->      16,000,000 scores  (   16x)\n  16000 tokens ->     256,000,000 scores  (  256x)\n  64000 tokens ->   4,096,000,000 scores  ( 4096x)\n\n64x the context, 4096x the attention work',
      takeaways: [
        'Attention lets every token consult every other token directly.',
        'Cost grows quadratically with length — long context is genuinely expensive.',
        'Retrieving the right 2,000 tokens beats sending 100,000 mediocre ones.',
      ],
    },
    {
      id: 'm3-l4',
      title: 'Lesson 3.4 Decoding: Temperature and Top-p',
      objectives: [
        'Explain what temperature does to the distribution.',
        'Distinguish temperature from top-p sampling.',
        'Choose settings for structured versus creative work.',
      ],
      theory: 'At each step the model has a probability distribution over tokens, and decoding parameters decide how you sample from it. Temperature flattens or sharpens that distribution: near zero the model almost always takes the most likely token, giving repeatable output; higher values spread probability and produce more variety.\nTop-p, or nucleus sampling, instead restricts sampling to the smallest set of tokens whose probabilities sum to p. The practical guidance is simple. For extraction, classification, JSON output and anything you will parse, use a temperature at or near zero. For brainstorming and creative copy, raise it. Tuning both aggressively at once mostly makes behaviour hard to reason about.\nThe example shows the mechanism directly. Notice that temperature does not add new candidates or change which token is most likely — it only changes how decisively the top one wins.',
      callout: {
        lead: 'Default to this:',
        text: 'temperature 0 for anything you will parse. Raise it only where variety is the actual product.',
      },
      codeExample: `import math

LOGITS = {"yes": 2.0, "no": 1.2, "maybe": 0.4}


def softmax(logits: dict, temperature: float) -> dict:
    t = max(temperature, 1e-6)
    scaled = {k: v / t for k, v in logits.items()}
    ceiling = max(scaled.values())                       # numerical stability
    exp = {k: math.exp(v - ceiling) for k, v in scaled.items()}
    total = sum(exp.values())
    return {k: round(v / total, 3) for k, v in exp.items()}


for temp in (0.1, 0.7, 1.5):
    print(f"temperature {temp}: {softmax(LOGITS, temp)}")

print("\\nsame ranking every time — temperature only changes how decisively it wins")`,
      codeOutput: "temperature 0.1: {'yes': 1.0, 'no': 0.0, 'maybe': 0.0}\ntemperature 0.7: {'yes': 0.704, 'no': 0.224, 'maybe': 0.072}\ntemperature 1.5: {'yes': 0.518, 'no': 0.304, 'maybe': 0.178}\n\nsame ranking every time — temperature only changes how decisively it wins",
      takeaways: [
        'Temperature near 0 for anything structured or parsed.',
        'Raise temperature only where variety is genuinely wanted.',
        'Temperature reshapes the distribution; it does not change which token leads.',
      ],
    },
    {
      id: 'm3-l5',
      title: 'Lesson 3.5 Hallucination',
      objectives: [
        'Explain why hallucination follows from the mechanism.',
        'Distinguish well-formed output from true output.',
        'List the structural defences that actually work.',
      ],
      theory: 'A hallucination is fluent, confident output that is false. It is not a bug to be patched — it follows directly from the mechanism. The model optimises for plausible continuations, and a plausible-sounding citation is exactly what a fabricated citation looks like.\nThis reframes your job. You cannot eliminate hallucination by asking the model to be accurate; you reduce it structurally. Ground answers in retrieved source text, require citations that can be checked against real documents, lower temperature, and give the model an explicit path to say it does not know. Module 6 builds each of these into a pipeline.\nThe distinction the example draws is the one to internalise. Your validators can check that output is well-formed — correct shape, valid identifiers, parseable JSON — but well-formed is not the same as true. Only checking a claim against a source you supplied gets you closer to true.',
      callout: {
        lead: 'The distinction to hold onto:',
        text: 'a validator proves output is well-formed. Only a source proves it is true.',
      },
      codeExample: `import re

CITATION = re.compile(r"\\[(\\w+-\\d+)\\]")
SUPPLIED = {"doc-3", "doc-9"}          # what retrieval actually returned

answer = "Refunds take 14 days [doc-3] and appeals take 30 days [doc-42]."

cited = CITATION.findall(answer)
print("cited ids:      ", cited)
print("all well-formed:", all(CITATION.fullmatch(f"[{c}]") is not None for c in cited))
print("actually exist: ", [c for c in cited if c in SUPPLIED])
print("fabricated:     ", [c for c in cited if c not in SUPPLIED])`,
      codeOutput: "cited ids:       ['doc-3', 'doc-42']\nall well-formed: True\nactually exist:  ['doc-3']\nfabricated:      ['doc-42']",
      takeaways: [
        'Hallucination follows from next-token prediction; it is not a patchable bug.',
        'Reduce it structurally: grounding, citations, low temperature, an "I do not know" path.',
        'Well-formed output is not true output — check claims against supplied sources.',
      ],
    },
    {
      id: 'm3-l6',
      title: 'Lesson 3.6 Calling a Model API',
      objectives: [
        'Recognise the shape shared by provider APIs.',
        'Treat the provider as an unreliable dependency.',
        'Make token cost observable from the first call.',
      ],
      theory: 'The major providers — OpenAI, Anthropic and Google among them — expose broadly the same shape: you send a list of messages with roles, plus parameters, and receive generated text along with token usage. Learning one transfers readily to the others.\nTreat the provider as an unreliable network dependency, because it is. Requests time out, get rate-limited and occasionally return malformed content. Set explicit timeouts, retry transient failures with backoff, and read the usage numbers on every response so cost is observable from day one. Keep the provider call behind a thin interface of your own so swapping or adding a fallback model is a small change rather than a rewrite.\nReading usage is the habit that pays for itself fastest. Input and output tokens are priced differently, output usually costs several times more, and a single line converting usage into currency turns an abstract worry into a number you can put on a dashboard.',
      callout: {
        lead: 'Do this on day one:',
        text: 'convert usage into currency on every response. Cost you cannot see is cost you cannot control.',
      },
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
      codeExample: `from dataclasses import dataclass


@dataclass
class Usage:
    input_tokens: int
    output_tokens: int


# Dollars per million tokens: (input, output). Output is the expensive half.
PRICES = {"small": (0.25, 1.25), "large": (3.00, 15.00)}


def cost_usd(model: str, usage: Usage) -> float:
    in_rate, out_rate = PRICES[model]
    return (usage.input_tokens * in_rate + usage.output_tokens * out_rate) / 1_000_000


# A typical RAG request: lots of context in, a short answer out.
usage = Usage(input_tokens=7_200, output_tokens=800)

for model in PRICES:
    print(f"{model:<6} {cost_usd(model, usage):.5f} USD per request")

daily = cost_usd("large", usage) * 50_000
print(f"\\n50,000 requests/day on 'large': {daily:,.0f} USD/day")`,
      codeOutput: "small  0.00280 USD per request\nlarge  0.03360 USD per request\n\n50,000 requests/day on 'large': 1,680 USD/day",
      takeaways: [
        'Providers share a messages + parameters + usage shape.',
        'Wrap the call behind your own interface so fallback is cheap.',
        'Output tokens cost several times input tokens — price both, per request.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "What does the context window include?", options: ["System prompt, history, context and the response together", "Only the user question", "Only the retrieved documents", "Only the user's latest message and the model's reply"], correctAnswer: "System prompt, history, context and the response together" },
    { id: 2, question: "You need reliable JSON output. Which temperature?", options: ["Around 0.7", "At or near 0", "As high as allowed", "Temperature has no effect on structure"], correctAnswer: "At or near 0" },
    { id: 3, question: "Why is very long context expensive rather than merely restricted?", options: ["Providers charge a flat premium", "Long prompts need more disk", "Attention compute grows quadratically with sequence length", "Providers must switch to a larger model for longer inputs"], correctAnswer: "Attention compute grows quadratically with sequence length" },
    { id: 4, question: "What does a language model do when asked a factual question?", options: ["Looks the fact up in an internal database", "Queries a search engine", "Returns the closest training sentence verbatim", "Produces the most plausible continuation given its weights"], correctAnswer: "Produces the most plausible continuation given its weights" },
    { id: 5, question: "What does raising temperature actually change?", options: ["How sharply probability concentrates on the leading tokens", "Which token is most likely", "The size of the vocabulary", "Which tokens exist in the vocabulary the model can choose from"], correctAnswer: "How sharply probability concentrates on the leading tokens" },
    { id: 6, question: "How does top-p sampling differ from temperature?", options: ["It is the same thing under another name", "It restricts sampling to the smallest set of tokens whose probabilities sum to p", "It caps output length at p tokens before sampling stops", "It removes randomness entirely"], correctAnswer: "It restricts sampling to the smallest set of tokens whose probabilities sum to p" },
    { id: 7, question: "Which token type usually costs the most?", options: ["Input tokens", "They are always priced identically", "Output tokens", "System prompt tokens only"], correctAnswer: "Output tokens" },
    { id: 8, question: "A citation in an answer is correctly formatted as [doc-42]. What does that prove?", options: ["The document exists", "The claim is supported", "That retrieval succeeded", "Only that the output is well-formed"], correctAnswer: "Only that the output is well-formed" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A 128k-token window holds a 2k system prompt, 30k history and 90k retrieved context. How much room is left for the answer?",
        options: [
          "The full 128k, since output has its own budget",
          "90k, because context is counted separately",
          "About 6k tokens — output shares the window with everything else",
          "Unlimited; the window only limits input",
        ],
        correctAnswer: "About 6k tokens — output shares the window with everything else",
      },
      {
        kind: 'mcq',
        prompt: "Logits for three tokens are 2.0, 1.0, 0.1. You lower temperature from 1.0 to 0.2. What happens to the top token's probability?",
        options: [
          "It falls toward one third",
          "It is unchanged; temperature only affects which token is chosen",
          "The ordering of tokens reverses",
          "It rises toward 1.0 — lower temperature sharpens the distribution",
        ],
        correctAnswer: "It rises toward 1.0 — lower temperature sharpens the distribution",
      },
      {
        kind: 'mcq',
        prompt: "A corpus of 40,000 documents averages 3,000 tokens each. A colleague says a one-million-token window means retrieval is unnecessary. What is the problem?",
        options: [
          "The corpus is about 120M tokens — over a hundred times larger than the window, and cost scales with every request",
          "There is no problem; the window fits the corpus",
          "Nothing — a million tokens holds the corpus as long as documents are summarised",
          "Retrieval is only needed for PDFs",
        ],
        correctAnswer: "The corpus is about 120M tokens — over a hundred times larger than the window, and cost scales with every request",
      },
      {
        kind: 'mcq',
        prompt: "Why does a softmax implementation subtract the largest logit before exponentiating?",
        options: [
          "To make the probabilities sum to more than 1",
          "To avoid numeric overflow; subtracting a constant does not change the resulting probabilities",
          "To scale the logits so that temperature has a visible effect",
          "Because temperature is applied after exponentiation and needs the largest logit to be zero",
        ],
        correctAnswer: "To avoid numeric overflow; subtracting a constant does not change the resulting probabilities",
      },
      {
        kind: 'mcq',
        prompt: "A model answers a question about last week's event confidently and wrongly. What is the most accurate explanation?",
        options: [
          "The API returned a cached answer",
          "The temperature was set to zero",
          "The event is after its training data and it generated a plausible continuation anyway",
          "The context window overflowed and the model dropped the retrieved facts",
        ],
        correctAnswer: "The event is after its training data and it generated a plausible continuation anyway",
      },
    ],
  },
};

export default mod_m3;
