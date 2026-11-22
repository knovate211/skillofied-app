import type { ModuleData } from '../GenAICourseData';

const mod_m5: ModuleData = {
  id: 'm5',
  title: 'MODULE 5: EMBEDDINGS & VECTOR SEARCH',
  overview: 'Turning meaning into geometry: embeddings, similarity metrics, chunking strategy and the databases that store vectors.',
  outcomes: ['Explain what an embedding represents', 'Implement cosine similarity and top-k search', 'Choose a chunking strategy and a vector store'],
  lessons: [
    {
      id: 'm5-l1',
      title: 'Lesson 5.1 From Text to Vectors',
      objectives: [
        'Explain what an embedding actually encodes.',
        'Use the same model for queries and documents.',
        'Treat an embedding-model change as a migration.',
      ],
      theory: 'An embedding maps a piece of text to a list of numbers — often several hundred to a few thousand dimensions — positioned so that texts with similar meaning land near each other. "How do I reset my password?" and "I forgot my login credentials" share almost no words but sit close together in that space.\nThat property is what makes semantic search possible, and it is exactly what keyword search cannot do. Two operational rules follow. Query and documents must be embedded with the same model, since vectors from different models are not comparable. And changing embedding model means re-embedding your entire corpus — treat it as a migration, not a config change.\nThe toy below uses three hand-placed dimensions so you can read them: roughly "account", "payment" and "delivery". A real model learns thousands of dimensions that resist that kind of naming, but the geometry behaves the same way — nearness means similar meaning, regardless of shared words.',
      callout: {
        lead: 'Operational rule:',
        text: 'changing embedding model means re-embedding everything. Plan it as a migration, never as a config flag.',
      },
      codeExample: `# Toy 3-dimensional space: roughly [account, payment, delivery]
VECTORS = {
    "password reset help":                 [0.94, 0.10, 0.05],
    "recover forgotten login credentials": [0.91, 0.14, 0.02],
    "track parcel delivery status":        [0.04, 0.12, 0.97],
}


def cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return 0.0 if na == 0 or nb == 0 else dot / (na * nb)


query = "password reset help"
for text, vec in VECTORS.items():
    if text == query:
        continue
    shared = set(query.split()) & set(text.split())
    print(f"{cosine(VECTORS[query], vec):.3f}  shared words: {len(shared)}  {text}")

print("\\nhigh similarity with zero shared words — that is the whole point")`,
      codeOutput: '0.998  shared words: 0  recover forgotten login credentials\n0.106  shared words: 0  track parcel delivery status\n\nhigh similarity with zero shared words — that is the whole point',
      takeaways: [
        'Embeddings put meaning in geometry: similar text, nearby vectors.',
        'Same model for queries and documents; changing it means re-embedding everything.',
        'Similarity is independent of shared vocabulary — that is what keyword search cannot do.',
      ],
    },
    {
      id: 'm5-l2',
      title: 'Lesson 5.2 Similarity Metrics',
      objectives: [
        'Implement cosine similarity from scratch.',
        'Explain why magnitude usually should not count.',
        'Know when cosine and dot product agree.',
      ],
      theory: 'Cosine similarity measures the angle between two vectors, ignoring their magnitude, and it is the default for text embeddings because direction carries the meaning while length often reflects incidental things like passage length. It runs from -1 to 1, with 1 being identical direction.\nEuclidean distance measures straight-line separation and is sensitive to magnitude. Dot product combines both. In practice, if your vectors are normalised to unit length — many providers do this for you — cosine similarity and dot product rank results identically, which is why libraries often use dot product for speed. Know which your store uses, because scores are not comparable across metrics.\nThe example shows the failure mode concretely. Two passages pointing in exactly the same direction — the same meaning — get the same cosine score, but wildly different dot products purely because one is longer. Ranking on the raw dot product would put the verbose passage first every time.',
      callout: {
        lead: 'Think of it like this:',
        text: 'cosine asks “which way does this point?”. Dot product also asks “how loud is it?” — and length is rarely what you meant.',
      },
      syntax: `def cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return 0.0 if na == 0 or nb == 0 else dot / (na * nb)`,
      codeExample: `def dot(a: list[float], b: list[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def norm(v: list[float]) -> float:
    return sum(x * x for x in v) ** 0.5


def cosine(a: list[float], b: list[float]) -> float:
    d = norm(a) * norm(b)
    return 0.0 if d == 0 else dot(a, b) / d


query = [1.0, 0.0]
docs = {
    "short passage": [0.6, 0.1],
    "long passage":  [6.0, 1.0],   # identical direction, 10x the magnitude
}

for name, vec in docs.items():
    print(f"{name:<14} cosine {cosine(query, vec):.4f}   dot {dot(query, vec):.2f}")

print("\\nsame meaning, same cosine — dot product just rewarded length")`,
      codeOutput: 'short passage  cosine 0.9864   dot 0.60\nlong passage   cosine 0.9864   dot 6.00\n\nsame meaning, same cosine — dot product just rewarded length',
      takeaways: [
        'Cosine is the text default — direction matters, magnitude usually does not.',
        'On normalised vectors, cosine and dot product rank identically.',
        'Scores from different metrics are not comparable — know which your store uses.',
      ],
    },
    {
      id: 'm5-l3',
      title: 'Lesson 5.3 Chunking Strategy',
      objectives: [
        'Weigh chunk size against retrieval precision.',
        'Split on document structure rather than character counts.',
        'Carry the metadata that makes citation possible.',
      ],
      theory: 'You cannot embed a whole book as one vector — meaning averages out into mush — so documents are split into chunks. Chunk size is a genuine trade-off. Small chunks retrieve precisely but may lack the surrounding context needed to answer. Large chunks carry context but dilute the embedding and burn your token budget.\nA common starting point is a few hundred tokens with a modest overlap so a sentence spanning a boundary is not lost. Better than tuning numbers blindly is respecting structure: split on headings, paragraphs or code blocks rather than raw character counts, so each chunk is a coherent unit. Always carry metadata — source, page, section — because that is what makes citation possible later.\nCompare the two strategies below on the same document. Structure-aware splitting produces two chunks that each answer a question completely. Fixed-width splitting produces fragments that begin mid-sentence and end mid-word, and an embedding of a fragment encodes a fragment of the meaning.',
      callout: {
        lead: 'Prefer this:',
        text: 'split on headings and paragraphs, not character counts. A chunk should be something a person could answer from.',
      },
      codeExample: `DOC = """# Refunds
Refunds are issued within 14 days of receipt.

# Appeals
Appeals must be filed within 30 days."""


def by_structure(doc: str) -> list[str]:
    """Each heading starts a new chunk — a coherent unit."""
    sections: list[list[str]] = []
    for line in doc.splitlines():
        if line.startswith("#") or not sections:
            sections.append([])
        sections[-1].append(line)
    return ["\\n".join(s).strip() for s in sections]


def by_size(doc: str, n: int) -> list[str]:
    return [doc[i:i + n] for i in range(0, len(doc), n)]


print("structure-aware:")
for s in by_structure(DOC):
    print("  ", repr(s))

print("fixed 45 characters:")
for s in by_size(DOC, 45):
    print("  ", repr(s))`,
      codeOutput: "structure-aware:\n   '# Refunds\\nRefunds are issued within 14 days of receipt.'\n   '# Appeals\\nAppeals must be filed within 30 days.'\nfixed 45 characters:\n   '# Refunds\\nRefunds are issued within 14 days o'\n   'f receipt.\\n\\n# Appeals\\nAppeals must be filed w'\n   'ithin 30 days.'",
      takeaways: [
        'Chunk size trades retrieval precision against available context.',
        'Split on document structure, and always keep source metadata for citations.',
        'A fragment embeds a fragment of the meaning — coherent chunks retrieve better.',
      ],
    },
    {
      id: 'm5-l4',
      title: 'Lesson 5.4 Metadata and Filtering',
      objectives: [
        'Combine semantic search with hard filters.',
        'Apply permission filtering inside the query.',
        'Recognise where hybrid search is required.',
      ],
      theory: 'Pure vector similarity is often not enough. Real deployments need results restricted by tenant, department, document date or access permission. Storing structured metadata alongside each vector lets you combine a semantic search with a hard filter.\nPermission filtering is the one that matters most and is most often bolted on too late. In a multi-tenant system, filtering must happen inside the query — not by retrieving broadly and discarding afterwards, which risks leaking content into a prompt the user was never allowed to see. Hybrid search, blending vector similarity with keyword matching, also helps where exact identifiers, product codes or names must match precisely.\nThe example shows both problems in one run. Retrieve-then-filter loaded another tenant\'s document into memory and logs before discarding it, and it also returned fewer results than asked for, because the filter ate part of the top-k.',
      callout: {
        lead: 'Never do this:',
        text: 'retrieve broadly and filter afterwards. The forbidden document was already in memory, in your logs, and possibly in the prompt.',
      },
      codeExample: `CORPUS = [
    {"id": "c1", "tenant": "acme",   "score": 0.91, "text": "Acme salary bands"},
    {"id": "c2", "tenant": "globex", "score": 0.95, "text": "Globex salary bands"},
    {"id": "c3", "tenant": "acme",   "score": 0.72, "text": "Acme leave policy"},
]


def retrieve_then_filter(corpus, tenant, k):
    top = sorted(corpus, key=lambda c: c["score"], reverse=True)[:k]
    print("  loaded into memory:", [c["id"] for c in top])
    return [c["id"] for c in top if c["tenant"] == tenant]


def filter_then_retrieve(corpus, tenant, k):
    allowed = [c for c in corpus if c["tenant"] == tenant]
    print("  loaded into memory:", [c["id"] for c in allowed])
    return [c["id"] for c in sorted(allowed, key=lambda c: c["score"], reverse=True)[:k]]


print("retrieve-then-filter ->", retrieve_then_filter(CORPUS, "acme", 2))
print("filter-then-retrieve ->", filter_then_retrieve(CORPUS, "acme", 2))`,
      codeOutput: "  loaded into memory: ['c2', 'c1']\nretrieve-then-filter -> ['c1']\n  loaded into memory: ['c1', 'c3']\nfilter-then-retrieve -> ['c1', 'c3']",
      takeaways: [
        'Filter by tenant and permission inside the query, never after retrieval.',
        'Hybrid vector + keyword search rescues exact identifiers.',
        'Filtering after the fact also silently shrinks your top-k.',
      ],
    },
    {
      id: 'm5-l5',
      title: 'Lesson 5.5 Vector Databases',
      objectives: [
        'Explain the approximate-nearest-neighbour trade-off.',
        'Choose a store for the scale you actually have.',
        'Measure recall rather than assuming it.',
      ],
      theory: 'A vector database indexes embeddings for fast approximate nearest-neighbour search. Exact search over millions of vectors is too slow, so indexes such as HNSW trade a little recall for large speed gains — a tunable trade-off, not a defect.\nFor most teams the pragmatic choice is pgvector, an extension to PostgreSQL. If you already run Postgres, your vectors, metadata and relational data live in one database with one backup and transaction story, which removes an entire class of consistency problems. Dedicated stores such as Pinecone, Qdrant and Weaviate earn their place at large scale or when you need their specific filtering and hybrid features. Start with pgvector and move only when you can name the limit you hit.\nWhat matters operationally is knowing your recall rather than assuming it. Compare the approximate index against an exact scan on a sample of queries, and you will have a number instead of a hope. If the number is unacceptable, index parameters are usually the fix.',
      callout: {
        lead: 'Before you migrate stores:',
        text: 'name the specific limit you hit. "It might not scale" is not a limit — it is an anxiety.',
      },
      codeExample: `# Which chunks an exact scan would return, versus what the ANN index returned.
exact_top_10 = list(range(10))
ann_returned = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11]

hits = set(exact_top_10) & set(ann_returned)
missed = sorted(set(exact_top_10) - hits)

print(f"recall@10: {len(hits) / len(exact_top_10):.0%}")
print("missed:   ", missed)
print("\\n90% recall for a large speed gain is a tuning choice, not a defect")`,
      codeOutput: 'recall@10: 90%\nmissed:    [9]\n\n90% recall for a large speed gain is a tuning choice, not a defect',
      takeaways: [
        'ANN indexes trade a little recall for large speed gains.',
        'Start with pgvector if you already run Postgres; move when you can name the limit.',
        'Measure recall against an exact scan instead of assuming the index is fine.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "Why is cosine similarity the default for text embeddings?", options: ["Direction carries meaning while magnitude often reflects incidental length", "It is cheaper to compute than dot product on high-dimensional vectors", "It always returns values between 0 and 1", "It is the only metric vector databases support"], correctAnswer: "Direction carries meaning while magnitude often reflects incidental length" },
    { id: 2, question: "You switch to a different embedding model. What must you do?", options: ["Nothing, vectors are interchangeable", "Re-embed the entire corpus", "Only re-embed new documents", "Change the similarity metric"], correctAnswer: "Re-embed the entire corpus" },
    { id: 3, question: "In a multi-tenant RAG system, where must permission filtering happen?", options: ["After retrieval, by discarding results", "In the system prompt", "Inside the query itself", "At render time in the UI"], correctAnswer: "Inside the query itself" },
    { id: 4, question: "Two passages have identical direction but one vector is ten times longer. What happens?", options: ["Cosine differs, dot product matches", "Both metrics match", "Both metrics differ", "Cosine matches, dot product rewards the longer one"], correctAnswer: "Cosine matches, dot product rewards the longer one" },
    { id: 5, question: "What does an approximate nearest-neighbour index trade away for speed?", options: ["A little recall", "Metadata support", "Vector dimensionality", "Transactional consistency"], correctAnswer: "A little recall" },
    { id: 6, question: "Why prefer splitting on headings over fixed character counts?", options: ["More, smaller chunks always give higher similarity scores", "Each chunk stays a coherent unit that can answer a question", "It is faster to compute", "Embedding models require it"], correctAnswer: "Each chunk stays a coherent unit that can answer a question" },
    { id: 7, question: "A user searches for the exact product code \"XR-4419\". Which approach is most reliable?", options: ["Pure vector search", "Raising top-k so the exact match is likely somewhere in the results", "Hybrid search blending vector similarity with keyword matching", "A larger embedding model"], correctAnswer: "Hybrid search blending vector similarity with keyword matching" },
    { id: 8, question: "Why must metadata like source and page be stored with each chunk?", options: ["It improves embedding quality", "Vector databases require it", "Embedding models use it to improve the vector for each chunk", "It is what makes verifiable citations possible later"], correctAnswer: "It is what makes verifiable citations possible later" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "Vector A is [1, 0] and vector B is [0, 1]. What is their cosine similarity?",
        options: [
          "0 — the vectors are orthogonal",
          "1 — both vectors have the same length",
          "-1",
          "0.5",
        ],
        correctAnswer: "0 — the vectors are orthogonal",
      },
      {
        kind: 'mcq',
        prompt: "Vector B is vector A multiplied by 5. What is their cosine similarity?",
        options: [
          "5 — cosine scales with the multiplication factor",
          "1 — cosine ignores magnitude and only compares direction",
          "0.2",
          "It depends on the dimension",
        ],
        correctAnswer: "1 — cosine ignores magnitude and only compares direction",
      },
      {
        kind: 'mcq',
        prompt: "A Markdown handbook is chunked every 500 characters. Answers often cite a fragment that starts mid-sentence under the wrong heading. What is the fix?",
        options: [
          "Raise the chunk size to 5,000 characters",
          "Use a larger embedding model",
          "Split on headings first, then on paragraph boundaries, and store the heading with each chunk",
          "Increase top-k so the missing context arrives in neighbouring chunks",
        ],
        correctAnswer: "Split on headings first, then on paragraph boundaries, and store the heading with each chunk",
      },
      {
        kind: 'mcq',
        prompt: "You retrieve the top 5 chunks across all tenants, then drop the ones the user may not see, leaving 1. What went wrong?",
        options: [
          "Nothing — post-filtering is the standard approach",
          "Top-k was too small; retrieving the top 50 before filtering fixes it fully",
          "The embedding model is tenant-specific",
          "Filtering after ranking starves results and risks leakage; the tenant filter belongs inside the query",
        ],
        correctAnswer: "Filtering after ranking starves results and risks leakage; the tenant filter belongs inside the query",
      },
      {
        kind: 'mcq',
        prompt: "A dot-product search keeps ranking long, rambling passages above short precise ones. Why?",
        options: [
          "Dot product rewards vector magnitude, which often tracks length rather than relevance",
          "Short passages cannot be embedded",
          "The approximate index drops short vectors during the nearest-neighbour search",
          "Long passages always contain more keywords",
        ],
        correctAnswer: "Dot product rewards vector magnitude, which often tracks length rather than relevance",
      },
    ],
  },
};

export default mod_m5;
