import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

interface QAItem {
  q: string;
  a: string;
}

const FAQS_DATA: Record<number, { title: string; list: QAItem[] }> = {
  1: {
    title: 'LLM Fundamentals',
    list: [
      {
        q: 'Explain the transformer architecture and why attention matters.',
        a: 'Earlier sequence models processed tokens one position at a time, making long-range dependencies hard. The transformer processes the sequence in parallel and uses self-attention so every token can weigh every other token directly. The engineering consequence is that attention cost grows quadratically with sequence length — which is why long context is genuinely expensive rather than merely restricted.',
      },
      {
        q: 'What is a token, and how do you estimate them?',
        a: 'A token is a subword fragment, not a word or a character. English averages roughly four characters per token; code, JSON and non-English text tokenize less efficiently. The context window covers system prompt, history, retrieved context and the generated output together, so a context budget is a real design constraint.',
      },
      {
        q: 'Why do models hallucinate, and can you eliminate it?',
        a: 'The model samples plausible next tokens; it has no notion of truth and no store to look facts up in. A fabricated citation is exactly what a plausible citation looks like. You cannot eliminate it by instruction — you reduce it structurally with grounding, verifiable citations, temperature at zero, and an explicit path to decline.',
      },
      {
        q: 'When would you change temperature versus top-p?',
        a: 'Temperature sharpens or flattens the whole distribution; top-p restricts sampling to the smallest set of tokens covering probability p. For anything parsed — JSON, extraction, classification — use temperature near zero and leave top-p alone. Tuning both at once mostly makes behaviour hard to reason about.',
      },
    ],
  },
  2: {
    title: 'RAG and Retrieval',
    list: [
      {
        q: 'RAG or fine-tuning — how do you decide?',
        a: 'RAG supplies knowledge; fine-tuning shapes behaviour. Missing or changing facts, or a requirement to cite sources, means RAG. Consistently wrong format, tone or task framing, where the facts are already known, points to fine-tuning. Exhaust prompting and few-shot first — it costs hours instead of weeks. Fine-tuning to inject knowledge is the classic expensive mistake.',
      },
      {
        q: 'How do you choose chunk size?',
        a: 'It trades retrieval precision against available context: small chunks match precisely but may lack the surrounding text needed to answer; large chunks carry context but dilute the embedding and consume budget. Rather than tuning numbers blindly, split on structure — headings, paragraphs, code blocks — then measure recall@k on a golden set and adjust.',
      },
      {
        q: 'How would you evaluate a RAG system?',
        a: 'Measure the two failure points separately. Retrieval: recall@k against question and expected-source pairs. Generation: faithfulness — is every claim supported by the supplied context — and answer relevance. Conflating them means tuning the wrong half. Cheap proxies help: verify cited ids exist, and watch the refusal rate.',
      },
      {
        q: 'An answer is wrong. Walk me through debugging it.',
        a: 'First check whether the correct chunk was retrieved at all — pull the trace and look at what went into the prompt. If it was not retrieved, the problem is chunking, embedding or filtering. If it was retrieved and the answer is still wrong, the problem is generation: prompt, context ordering, or temperature. Never start by editing the prompt.',
      },
    ],
  },
  3: {
    title: 'Agents and Tools',
    list: [
      {
        q: 'How does function calling actually work?',
        a: 'You describe available functions with a name, description and JSON parameter schema. The model never executes anything — it returns a structured request naming a function and arguments. Your code validates and runs it, then feeds the result back as an observation. The model proposes, your code disposes; that boundary is the security model.',
      },
      {
        q: 'What guards does an agent loop need?',
        a: 'An iteration cap, because a confused agent loops indefinitely and keeps billing you. Tool errors returned to the model as observations rather than raised, so it can recover by trying something else. Least-privilege tools, approval gates on irreversible actions, and a logged audit trail of every call and argument.',
      },
      {
        q: 'When is a multi-agent system justified?',
        a: 'When subtasks are genuinely independent and parallelisable, or when the toolsets are so different that one prompt cannot describe them coherently. Otherwise a single well-scoped agent wins: every extra agent adds latency, tokens and failure surface, and errors compound across handoffs.',
      },
      {
        q: 'What is prompt injection and how do you defend against it?',
        a: 'Instructions and data share one channel, so text inside a document or web page can carry commands the model follows. Indirect injection through retrieved content is the dangerous form — the attacker never touches your interface. No prompt fully prevents it, so defend architecturally: untrusted-by-default content, least-privilege tools, human approval for irreversible actions, output validation.',
      },
    ],
  },
  4: {
    title: 'Production and Cost',
    list: [
      {
        q: 'How do you reduce LLM latency?',
        a: 'Stream, and optimise time-to-first-token rather than total duration. Then: shorter system prompts, fewer retrieved chunks, a smaller model on the easy path with a stronger one reserved for hard turns, caching, and parallelising independent calls. For voice, budget around 800ms end to end and stream at every stage.',
      },
      {
        q: 'How do you control token cost?',
        a: 'Make it observable first — log usage per request with tenant and feature attached, so spend has an owner. Then retrieve fewer and better chunks, trim system prompts, cap max output tokens, summarise long histories instead of resending them, cache exact repeats, and route easy requests to a cheaper model.',
      },
      {
        q: 'A provider starts returning 429s and 500s. What does your client do?',
        a: 'Explicit timeouts on every call. Retry only transient failures — 429 and 5xx, never a validation error — with exponential backoff plus jitter, since without jitter retries synchronise and re-create the overload. Beyond retries, fall back to a secondary model, and degrade gracefully: returning retrieved passages without a summary beats an error page.',
      },
      {
        q: 'How do you know a prompt change did not make things worse?',
        a: 'An evaluation harness over a golden set, run in CI on every prompt or model change, combining deterministic checks, similarity to reference answers, and an LLM judge validated against human ratings. GenAI fails quietly — 200 OK with a wrong answer — so without this, a change that degrades ten percent of responses ships unnoticed.',
      },
    ],
  },
  5: {
    title: 'System Design',
    list: [
      {
        q: 'Design a ChatGPT-like application.',
        a: 'Gateway for auth, rate limiting and routing; a conversation service owning history with summarisation past the context window; an AI service owning prompts and provider calls behind one interface so fallback is cheap. Stream over SSE. Store conversations in Postgres, cache exact repeats in Redis. Per-tenant rate limits, token accounting per request, and tracing across the whole path.',
      },
      {
        q: 'Design enterprise document search over 10 million documents.',
        a: 'Ingestion is the bulk of the work: connectors per source, incremental sync keyed on content hash, extraction with a vision fallback for hard PDFs, structural chunking, and access metadata captured at ingest. Retrieval filters by tenant and permission inside the query, then reranks. Answers cite verifiable ids. Start with one document type and one department to prove value.',
      },
      {
        q: 'How would you make a RAG system multi-tenant and safe?',
        a: 'Capture access metadata at ingestion and filter inside the retrieval query — never retrieve broadly and discard afterwards, which risks leaking restricted content into the prompt. Namespace vectors per tenant, enforce per-tenant rate and cost limits, and trace with tenant attached. Retrofitting permissions onto a working prototype is painful and risky.',
      },
      {
        q: 'The customer requires on-premises deployment with no internet. What changes?',
        a: 'Hosted model APIs are ruled out, so you move to open-weight models served locally, which changes hardware sizing, latency and quality expectations. Ask about this in discovery rather than discovering it at delivery. Also plan for constrained debugging: structured logging, feature flags, and configuration changes that do not require a rebuild.',
      },
    ],
  },
  6: {
    title: 'Forward Deployed Engineering',
    list: [
      {
        q: '"We have 10 million documents and want employees to search them with AI." What do you ask?',
        a: 'Who are the users and what do they do today? What does a good answer look like, and how will you know it is working? Where does the data live and who owns it? What are the access rules, and do they vary per user? How current must answers be? And critically: what is the cost of a wrong answer — that one determines whether you need citations, human review, or should decline the scope.',
      },
      {
        q: 'How do you scope a first delivery?',
        a: 'The smallest system that proves value and can be measured: one document type, one department, a narrow question set, shipped in weeks. Size honestly — ingestion and cleaning usually dominate, auth integration is rarely quick, and the golden set is work someone has to do. Naming those upfront builds more trust than an optimistic estimate that slips.',
      },
      {
        q: 'A customer says the AI is "not accurate enough". How do you respond?',
        a: 'Turn it into something measurable. Collect specific failing questions, run them through the pipeline with tracing, and separate retrieval failures from generation failures. Then report numbers on their own data: recall@k, faithfulness, and the refusal rate. Adjectives do not move these conversations; numbers from their documents do.',
      },
      {
        q: 'How do you communicate limitations without losing the deal?',
        a: 'State what the system cannot do as clearly as what it can, early. A customer who understands answers are grounded in their documents — and that anything outside returns "I don\'t know" — reads a refusal as correct behaviour rather than failure. Quantify the trade-offs: cost per thousand questions, latency, accuracy on their golden set.',
      },
    ],
  },
};

const InterviewPrep: React.FC<Props> = ({ page }) => {
  const section = FAQS_DATA[page];

  if (!section) {
    return <div className={styles.tabContent}>Section not found</div>;
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{section.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '18px' }}>
        {section.list.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              background: 'var(--bg-surface-2)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}
          >
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
              {item.q}
            </p>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
