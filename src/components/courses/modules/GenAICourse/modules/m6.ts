import type { ModuleData } from '../GenAICourseData';

const mod_m6: ModuleData = {
  id: 'm6',
  title: 'MODULE 6: RETRIEVAL-AUGMENTED GENERATION',
  overview: 'The core technique of applied GenAI: ground the model in your own documents, cite sources, and evaluate whether it worked.',
  outcomes: ['Build an ingestion and retrieval pipeline', 'Construct grounded, cited context', 'Evaluate retrieval and answer quality'],
  lessons: [
    {
      id: 'm6-l1',
      title: 'Lesson 6.1 Why RAG',
      objectives: [
        'Identify the requirements that call for retrieval.',
        'Contrast supplying knowledge with shaping behaviour.',
        'Explain why RAG updates without retraining.',
      ],
      theory: 'A model knows only what its weights encode as of training. It cannot see your policies, your tickets or last week\'s decisions, and asking anyway produces confident invention. Retrieval-augmented generation fixes this by finding relevant text first and putting it into the prompt, so the model summarises supplied evidence instead of recalling from memory.\nRAG is usually the right first answer when the requirement involves private, changing or citable knowledge. It updates instantly when a document changes, needs no training run, and — crucially for enterprise buyers — can show its sources. Module 9 covers when fine-tuning is the better tool; the short version is that RAG supplies knowledge, fine-tuning shapes behaviour.\nThe difference is visible in the example. Asked about something outside its weights, the ungrounded path produces a confident sentence with nothing behind it. The grounded path produces an answer you can trace to a document, which is the property enterprise buyers actually pay for.',
      callout: {
        lead: 'The one-line rule:',
        text: 'RAG supplies knowledge. Fine-tuning shapes behaviour. Reaching for the wrong one is the expensive mistake.',
      },
      codeExample: `WEIGHTS = {"capital of France": "Paris"}                    # in the model already
DOCS = {"refund window": "Refunds are issued within 14 days."}  # yours, private


def answer(question: str, context: str | None = None) -> str:
    if context:
        return f"grounded  -> {context}"
    if question in WEIGHTS:
        return f"recalled  -> {WEIGHTS[question]}"
    return "invented  -> a fluent, confident, unverifiable claim"


print(answer("capital of France"))
print(answer("refund window"))
print(answer("refund window", DOCS["refund window"]))`,
      codeOutput: 'recalled  -> Paris\ninvented  -> a fluent, confident, unverifiable claim\ngrounded  -> Refunds are issued within 14 days.',
      takeaways: [
        'RAG grounds answers in supplied evidence rather than recall.',
        'RAG for knowledge, fine-tuning for behaviour.',
        'Traceability to a source is the property enterprise buyers are actually purchasing.',
      ],
    },
    {
      id: 'm6-l2',
      title: 'Lesson 6.2 The Ingestion Pipeline',
      objectives: [
        'Name the six stages of ingestion.',
        'Make re-ingestion idempotent with a content hash.',
        'Record the metadata a citation will need.',
      ],
      theory: 'Ingestion runs: load, extract, clean, chunk, embed, store. Each stage has traps. PDF extraction is the usual source of pain — multi-column layouts interleave, tables lose structure, and scanned pages need OCR. Garbage extracted here produces garbage retrieved later, and no amount of prompt tuning recovers it.\nMake ingestion idempotent and incremental. Re-ingesting an unchanged document should not duplicate chunks, so key on a content hash. Record source, page and section on every chunk, because that metadata is what later becomes a citation. Expect to spend more engineering effort here than on the model call; in real deployments ingestion is where the work actually is.\nIdempotency is not a nicety. Ingestion jobs get retried, interrupted and re-run by someone who was not sure whether the first run finished — and a pipeline without a content key turns each of those into duplicate chunks that then compete with each other in retrieval results.',
      callout: {
        lead: 'Where the work actually is:',
        text: 'expect ingestion and extraction to consume more engineering time than the model call. Every real deployment works out this way.',
      },
      codeExample: `import hashlib

store: dict[str, dict] = {}


def content_key(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()


def ingest(text: str, source: str, page: int) -> str:
    """Keyed on content, so re-running the job changes nothing."""
    key = content_key(text)
    if key in store:
        return "skipped (unchanged)"
    store[key] = {"text": text, "source": source, "page": page}
    return "stored"


doc = "Refunds are issued within 14 days."

print(ingest(doc, "policy.pdf", 2))
print(ingest(doc, "policy.pdf", 2))                      # the job got re-run
print(ingest(doc + " Appeals take 30.", "policy.pdf", 3))  # genuinely new text
print("chunks in store:", len(store))`,
      codeOutput: 'stored\nskipped (unchanged)\nstored\nchunks in store: 2',
      takeaways: [
        'Load → extract → clean → chunk → embed → store. Extraction is the usual weak link.',
        'Key chunks on a content hash so re-ingestion is idempotent.',
        'Duplicate chunks do not just waste storage — they compete with each other in results.',
      ],
    },
    {
      id: 'm6-l3',
      title: 'Lesson 6.3 Retrieval and Reranking',
      objectives: [
        'Start with naive retrieval and know its limits.',
        'Rewrite terse queries into standalone ones.',
        'Retrieve wide, rerank, then keep few.',
      ],
      theory: 'Naive RAG embeds the question, takes the top few chunks by similarity and stuffs them in. It works surprisingly often and is the correct starting point. Its weaknesses appear with short or ambiguous questions and with corpora full of near-duplicates.\nTwo upgrades give most of the improvement. Query rewriting turns a terse follow-up into a self-contained question using conversation history, so "what about the second one?" becomes searchable. Reranking retrieves a wider candidate set — say the top fifty — then scores each against the query with a cross-encoder that reads query and document together, and keeps the best five. It costs an extra model call but consistently lifts answer quality more than prompt tweaking does.\nThe distinction to hold onto is that the embedding model never saw the query and the document together. It encoded each independently, so it can only compare summaries of meaning. A reranker reads both at once, which is why it can promote a chunk the vector index ranked fourth.',
      callout: {
        lead: 'Why reranking works:',
        text: 'the embedding model encoded query and document separately. A reranker is the first thing to read them together.',
      },
      codeExample: `QUESTION = "how long do refunds take"

# Ranked by vector similarity alone — query and text were embedded separately.
candidates = [
    ("c1", 0.81, "Refunds are issued within 14 days of receipt"),
    ("c2", 0.79, "Refund request form download page"),
    ("c3", 0.77, "Appeals must be filed within 30 days"),
    ("c4", 0.74, "Refunds normally take 14 days how long depends on your bank"),
]


def rerank(question: str, items: list[tuple]) -> list[tuple]:
    """A cross-encoder reads question AND text together. Toy version: overlap."""
    q = set(question.lower().split())
    scored = [(len(q & set(text.lower().split())), cid) for cid, _score, text in items]
    return sorted(scored, reverse=True)


print("vector order:  ", [cid for cid, _, _ in candidates])
print("reranked order:", [cid for _, cid in rerank(QUESTION, candidates)])
print("\\nc4 was fourth on similarity and first once something read both together")`,
      codeOutput: "vector order:   ['c1', 'c2', 'c3', 'c4']\nreranked order: ['c4', 'c1', 'c3', 'c2']\n\nc4 was fourth on similarity and first once something read both together",
      takeaways: [
        'Start naive; add query rewriting and reranking when quality plateaus.',
        'Retrieve wide, rerank, then keep few.',
        'Embeddings compare independently-encoded summaries; rerankers read both texts at once.',
      ],
    },
    {
      id: 'm6-l4',
      title: 'Lesson 6.4 Context and Citations',
      objectives: [
        'Lay out retrieved chunks so the model uses them.',
        'Require citations that can be checked.',
        'Detect fabricated citations automatically.',
      ],
      theory: 'How you lay out retrieved text matters. Label each chunk with an identifier and its source, fence it clearly as data, and instruct the model to answer only from it and to cite the identifiers it used. Order matters too: models attend most reliably to the beginning and end of long contexts, so place the strongest chunks at the edges rather than buried in the middle.\nCitations are what make the system trustworthy and auditable, and they must be verifiable. Validate after generation that every identifier the model cited actually exists in the context you supplied — a fabricated citation is the highest-signal hallucination detector you get for free.\nIt is free in the literal sense: no extra model call, no judge, no labelled data. A regular expression and a set membership test give you a reliable signal that something went wrong, which is rare enough in this field to be worth building on day one.',
      callout: {
        lead: 'Build this on day one:',
        text: 'a regex and a set membership test give you free, reliable hallucination detection. Nothing else in GenAI evaluation is this cheap.',
      },
      syntax: `context = "\\n\\n".join(
    f"[{c['id']}] (source: {c['source']}, p.{c['page']})\\n{c['text']}"
    for c in chunks
)
# After generation: every cited id must exist in {c['id'] for c in chunks}`,
      codeExample: `import re

CHUNKS = [
    {"id": "c1", "source": "handbook.pdf", "text": "Leave must be approved by a manager."},
    {"id": "c2", "source": "policy.pdf", "text": "Carry-over is capped at five days."},
]

CITATION = re.compile(r"\\[(\\w+)\\]")


def build_context(chunks: list[dict]) -> str:
    return "\\n\\n".join(
        f"[{c['id']}] (source: {c['source']})\\n{c['text']}" for c in chunks
    )


def verify_citations(answer: str, chunks: list[dict]) -> dict:
    supplied = {c["id"] for c in chunks}
    cited = CITATION.findall(answer)
    return {
        "valid": [c for c in cited if c in supplied],
        "fabricated": [c for c in cited if c not in supplied],
    }


print(build_context(CHUNKS))
print()
answer = "Managers approve leave [c1]; carry-over is capped [c2]. See also [c9]."
print(verify_citations(answer, CHUNKS))`,
      codeOutput: "[c1] (source: handbook.pdf)\nLeave must be approved by a manager.\n\n[c2] (source: policy.pdf)\nCarry-over is capped at five days.\n\n{'valid': ['c1', 'c2'], 'fabricated': ['c9']}",
      takeaways: [
        'Label, fence and order chunks; strongest at the edges.',
        'Verify cited ids against supplied chunks — fabricated citations are free hallucination detection.',
        'This check needs no extra model call, no judge and no labelled data.',
      ],
    },
    {
      id: 'm6-l5',
      title: 'Lesson 6.5 Evaluating RAG',
      objectives: [
        'Separate retrieval failures from generation failures.',
        'Measure retrieval with recall@k.',
        'Build and defend a golden set.',
      ],
      theory: 'RAG has two failure points and you must measure them separately. If retrieval did not surface the right chunk, no prompt can save the answer; if retrieval succeeded but the answer is still wrong, the problem is generation. Conflating them leads to tuning the wrong half for weeks.\nEvaluate retrieval with recall@k — did the correct chunk appear in the top k — using a set of question and expected-source pairs. Evaluate generation on faithfulness, whether every claim is supported by the supplied context, and on relevance to the question. Build a golden set of fifty to a hundred real questions early; it is the single highest-leverage artefact in a RAG project, and it is what lets you change anything with confidence.\nThe diagnosis matters more than the score. A run where retrieval recall is high but answers are wrong points at your prompt; a run where recall is low means the prompt is irrelevant until chunking or the query rewrite improves. The example labels each case so the next action is obvious.',
      callout: {
        lead: 'Diagnose before you tune:',
        text: 'if the right chunk never arrived, no prompt change can fix the answer. Measure the two halves separately.',
      },
      codeExample: `GOLDEN = [
    {"q": "refund window?",   "expect": "c1", "retrieved": ["c1", "c7"], "answer_ok": True},
    {"q": "appeal deadline?", "expect": "c3", "retrieved": ["c1", "c7"], "answer_ok": False},
    {"q": "who approves?",    "expect": "c5", "retrieved": ["c5", "c2"], "answer_ok": False},
]

hits = 0
for case in GOLDEN:
    found = case["expect"] in case["retrieved"]
    hits += found
    if not found:
        verdict = "RETRIEVAL failed — fix chunking or the query"
    elif not case["answer_ok"]:
        verdict = "GENERATION failed — fix the prompt"
    else:
        verdict = "ok"
    print(f"{case['q']:<18}{verdict}")

print(f"\\nrecall@2: {hits}/{len(GOLDEN)}")`,
      codeOutput: 'refund window?    ok\nappeal deadline?  RETRIEVAL failed — fix chunking or the query\nwho approves?     GENERATION failed — fix the prompt\n\nrecall@2: 2/3',
      takeaways: [
        'Measure retrieval and generation separately or you will tune the wrong half.',
        'A golden set of 50–100 real questions is the highest-leverage artefact you can build.',
        'The per-case diagnosis tells you what to fix; the aggregate score does not.',
      ],
    },
    {
      id: 'm6-l6',
      title: 'Lesson 6.6 Reducing Hallucination',
      objectives: [
        'Make "I don\'t know" a first-class outcome.',
        'Treat weak retrieval scores as a signal to decline.',
        'Combine the levers that actually work.',
      ],
      theory: 'Grounding reduces hallucination but does not remove it. The model may still blend prior knowledge with the context, over-generalise from a partial match, or answer confidently when the retrieved text does not actually contain the answer.\nThe levers that work are unglamorous. Instruct explicitly that unsupported questions must return a fixed "I do not know" response, and make that an acceptable outcome rather than a failure. Keep temperature at zero. Verify citations. Where retrieval scores are all weak, decline to answer instead of forwarding poor context — a low-confidence retrieval is a signal, and using it is the most common cause of confidently wrong answers.\nThe threshold check below costs one comparison and prevents the single most common production failure: passing the best of a bad set of chunks to the model, which then dutifully writes a confident answer from irrelevant text.',
      callout: {
        lead: 'The cheapest safeguard there is:',
        text: 'if the best retrieval score is weak, decline. Passing the best of a bad set is how confident wrong answers happen.',
      },
      codeExample: `THRESHOLD = 0.55
DECLINE = "I don't know."


def respond(question: str, scored_chunks: list[tuple]) -> str:
    if not scored_chunks:
        return DECLINE
    best = max(score for score, _ in scored_chunks)
    if best < THRESHOLD:
        return f"{DECLINE}  (best score {best:.2f} < {THRESHOLD})"
    context = " ".join(text for score, text in scored_chunks if score >= THRESHOLD)
    return f"answered from: {context}"


good = [(0.81, "Refunds are issued within 14 days."), (0.42, "Office opening hours.")]
weak = [(0.31, "Office opening hours."), (0.28, "Car park directions.")]

print(respond("refund window?", good))
print(respond("what is the CEO's salary?", weak))
print(respond("anything at all?", []))`,
      codeOutput: "answered from: Refunds are issued within 14 days.\nI don't know.  (best score 0.31 < 0.55)\nI don't know.",
      takeaways: [
        'Make "I don\'t know" an explicit, acceptable output path.',
        'Weak retrieval scores are a signal to decline, not to answer anyway.',
        'One threshold comparison prevents the most common production failure in RAG.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "An answer is wrong. What must you check first?", options: ["Whether retrieval surfaced the correct chunk at all", "The temperature setting, since sampling is the usual cause", "The system prompt wording", "The embedding dimension"], correctAnswer: "Whether retrieval surfaced the correct chunk at all" },
    { id: 2, question: "What does recall@k measure in a RAG system?", options: ["How faithful the answer is to the context", "Whether the correct chunk appeared in the top k results", "How many tokens were used", "The cosine score of the best match"], correctAnswer: "Whether the correct chunk appeared in the top k results" },
    { id: 3, question: "The model cites [doc-7], which was never in the supplied context. What is this?", options: ["A retrieval bug", "Expected behaviour with citations", "A fabricated citation — a detectable hallucination", "A chunking error"], correctAnswer: "A fabricated citation — a detectable hallucination" },
    { id: 4, question: "Why key ingested chunks on a content hash?", options: ["A hash key stores each chunk in fewer bytes than its text", "It improves embedding quality", "It is required by vector databases", "Re-running an interrupted ingestion job does not create duplicate chunks"], correctAnswer: "Re-running an interrupted ingestion job does not create duplicate chunks" },
    { id: 5, question: "Why can a reranker beat pure vector similarity?", options: ["It reads the query and the document together rather than encoding each separately", "It uses a bigger embedding model", "It retrieves more candidates from the index than the vector search did", "It runs before retrieval"], correctAnswer: "It reads the query and the document together rather than encoding each separately" },
    { id: 6, question: "Every retrieved chunk scores below your similarity threshold. What is the correct behaviour?", options: ["Send the best chunks anyway", "Decline to answer", "Raise the temperature", "Retrieve more chunks and send those"], correctAnswer: "Decline to answer" },
    { id: 7, question: "Where should the strongest retrieved chunks be placed in a long context?", options: ["All at the end, where the model reads them just before answering", "Buried in the middle", "At the beginning and end, where models attend most reliably", "Order makes no difference"], correctAnswer: "At the beginning and end, where models attend most reliably" },
    { id: 8, question: "What is the highest-leverage artefact to build early in a RAG project?", options: ["A larger embedding model", "A custom vector database", "A fine-tuned model trained on the full document corpus", "A golden set of 50–100 real questions with expected sources"], correctAnswer: "A golden set of 50–100 real questions with expected sources" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "Answers are frequently cut off mid-explanation because the relevant text straddles two chunks. What is the targeted fix?",
        options: [
          "Raise the model temperature",
          "Add overlap between adjacent chunks, then confirm with recall@k that retrieval improved",
          "Switch to a larger model that can infer the missing half of the text",
          "Remove the similarity threshold",
        ],
        correctAnswer: "Add overlap between adjacent chunks, then confirm with recall@k that retrieval improved",
      },
      {
        kind: 'mcq',
        prompt: "A golden set shows the expected chunk is in the top 5 for 92% of questions, yet answers are wrong 30% of the time. Where is the problem?",
        options: [
          "In retrieval — the top 5 are right but ranked badly, so re-embed the corpus with a better model",
          "In the chunker — split into smaller chunks to raise recall further",
          "Mostly in generation — retrieval is finding the right material, so look at prompt, context order and grounding",
          "Nowhere; 92% recall means the system works",
        ],
        correctAnswer: "Mostly in generation — retrieval is finding the right material, so look at prompt, context order and grounding",
      },
      {
        kind: 'mcq',
        prompt: "An answer cites [doc-3] and [doc-9]. The supplied context contained doc-3 and doc-5. What should the system do?",
        options: [
          "Accept both citations",
          "Retrieve doc-9 and add it to the answer",
          "Remove doc-3 as well, since one bad citation means the whole answer is ungrounded",
          "Flag doc-9 as a fabricated citation, since it can be verified against what was supplied",
        ],
        correctAnswer: "Flag doc-9 as a fabricated citation, since it can be verified against what was supplied",
      },
      {
        kind: 'mcq',
        prompt: "An ingestion job crashes halfway and is rerun. The index now holds many duplicate chunks. What design prevents this?",
        options: [
          "Deterministic ids from a content hash, so re-ingesting upserts rather than inserts",
          "Deleting the whole index before each run",
          "Running ingestion only once",
          "Smaller chunks, so a crash loses less work and duplicates are rare",
        ],
        correctAnswer: "Deterministic ids from a content hash, so re-ingesting upserts rather than inserts",
      },
      {
        kind: 'mcq',
        prompt: "Retrieval returns 50 candidates cheaply, but the top 5 are mediocre. What stage improves the final ordering?",
        options: [
          "A higher similarity threshold",
          "A cross-encoder reranker that scores each query–document pair together",
          "Retrieving 500 candidates",
          "A longer system prompt telling the model which chunks matter most",
        ],
        correctAnswer: "A cross-encoder reranker that scores each query–document pair together",
      },
    ],
  },
};

export default mod_m6;
