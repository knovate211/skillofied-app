import type { ModuleData } from '../GenAICourseData';

const mod_m12: ModuleData = {
  id: 'm12',
  title: 'MODULE 12: FORWARD DEPLOYED ENGINEERING',
  overview: 'The FDE half of the role: turning a vague customer problem into a scoped, integrated, deployed and measurable AI system.',
  outcomes: ['Run requirement discovery with a customer', 'Scope and size a solution honestly', 'Integrate with enterprise data, auth and environments'],
  lessons: [
    {
      id: 'm12-l1',
      title: 'Lesson 12.1 What a Forward Deployed Engineer Does',
      objectives: [
        'Describe where the FDE role sits.',
        'Accept that requirements are an output, not an input.',
        'Weigh engineering and communication equally.',
      ],
      theory: 'An FDE sits between the product and the customer, and builds. The work starts before requirements exist: a customer says "we have ten million documents and want employees to search them with AI", and turning that into a specification is the job, not a prerequisite for it.\nWhat distinguishes the role is that engineering quality and customer communication carry equal weight. You will write production code, and you will also sit in a room explaining why the approach they asked for will not work and what you propose instead. Interviews probe both, which is why practising the discovery conversation matters as much as practising system design.\nThe practical consequence is that "the requirements were unclear" is never an available excuse. Clarifying them is the work, and a good FDE treats a vague brief as the starting position rather than a blocker.',
      callout: {
        lead: 'The role in one line:',
        text: '"the requirements were unclear" is not an excuse in this job. Clarifying them is the job.',
      },
      codeExample: `brief = "We have 10M documents and want employees to search them with AI."

DELIVERABLES = [
    ("a specification",  "does not exist yet — you write it"),
    ("a scoped pilot",   "one document type, one team, weeks not months"),
    ("working software", "production code, in their environment"),
    ("a success measure","agreed with them before you build"),
]

print("what the customer gave you:")
print(f"  {brief}\\n")
print("what you owe them:")
for item, note in DELIVERABLES:
    print(f"  {item:<18}{note}")`,
      codeOutput: 'what the customer gave you:\n  We have 10M documents and want employees to search them with AI.\n\nwhat you owe them:\n  a specification   does not exist yet — you write it\n  a scoped pilot    one document type, one team, weeks not months\n  working software  production code, in their environment\n  a success measure agreed with them before you build',
      takeaways: [
        'FDEs turn vague problems into specifications, then build them.',
        'Engineering and customer communication carry equal weight.',
        '"The requirements were unclear" is never an available excuse in this role.',
      ],
    },
    {
      id: 'm12-l2',
      title: 'Lesson 12.2 Requirement Gathering',
      objectives: [
        'Find the problem underneath a proposed solution.',
        'Ask the questions that change the design.',
        'Use the cost of a wrong answer to set the architecture.',
      ],
      theory: 'Customers describe solutions rather than problems. "We want a chatbot" is a proposed solution; your job is to find the underlying need. Ask who the users are, what they do today, how long it takes, what a good answer looks like, and how they will know the system is working.\nThe questions that most often change the design are unglamorous. Where does the data live and who owns it? What are the access rules, and do they vary per user? How current must answers be? What is the consequence of a wrong answer — mild embarrassment, or regulatory exposure? That last question alone determines whether you need citations, human review, or should decline the project as scoped.\nRun that last question first when time is short. It is the single input that most reshapes the architecture, and asking it early prevents you designing a system whose whole approach turns out to be unacceptable.',
      callout: {
        lead: 'If you ask only one question:',
        text: 'what does a wrong answer cost? That single answer reshapes the architecture more than any other.',
      },
      codeExample: `def architecture_for(wrong_answer_cost: str) -> list[str]:
    base = ["retrieval grounding", "citations"]
    if wrong_answer_cost == "embarrassment":
        return base
    if wrong_answer_cost == "financial loss":
        return base + ["human review before action", "full audit log"]
    if wrong_answer_cost == "regulatory exposure":
        return base + ["human review before action", "full audit log",
                       "on-premise deployment", "decline if unsupported"]
    return base


for cost in ["embarrassment", "financial loss", "regulatory exposure"]:
    print(f"{cost:<22}{len(architecture_for(cost))} controls")
    for control in architecture_for(cost):
        print(f"  - {control}")`,
      codeOutput: 'embarrassment         2 controls\n  - retrieval grounding\n  - citations\nfinancial loss        4 controls\n  - retrieval grounding\n  - citations\n  - human review before action\n  - full audit log\nregulatory exposure   6 controls\n  - retrieval grounding\n  - citations\n  - human review before action\n  - full audit log\n  - on-premise deployment\n  - decline if unsupported',
      takeaways: [
        'Customers describe solutions; dig for the problem underneath.',
        'The cost of a wrong answer determines the entire architecture.',
        'Ask that question first — it constrains every decision after it.',
      ],
    },
    {
      id: 'm12-l3',
      title: 'Lesson 12.3 Solution Architecture and Scoping',
      objectives: [
        'Scope the smallest system that proves value.',
        'Size the work that is not modelling.',
        'Present a plan that names its own risks.',
      ],
      theory: 'Design the smallest system that proves value, then extend. For a document search request, that usually means one document type, one department and a narrow question set — shipped in weeks and measurable — rather than the full corpus in six months with no feedback until the end.\nSize honestly, including the parts that are not modelling. Ingestion and data cleaning typically dominate the timeline. Integration with existing authentication is rarely quick. Evaluation needs a golden set someone has to write. Presenting a plan that names these explicitly builds far more trust than an optimistic estimate that slips, and it is exactly the judgement an FDE interview is testing.\nThe breakdown below is the one worth internalising. The model call — the part everyone imagines is the project — is a rounding error next to ingestion, auth and evaluation. Say that in the first meeting rather than discovering it in week six.',
      callout: {
        lead: 'Say this in the first meeting:',
        text: 'the model call is the smallest part of the project. Ingestion, auth and evaluation are where the weeks go.',
      },
      codeExample: `PLAN = [
    ("ingestion and extraction", 15),
    ("auth and permissions", 8),
    ("evaluation golden set", 5),
    ("retrieval and prompt work", 4),
    ("the model call itself", 1),
]

total = sum(days for _, days in PLAN)

for task, days in PLAN:
    share = days / total
    print(f"{task:<28}{days:>3}d  {'#' * round(share * 30)}")

print(f"\\ntotal {total} days — the model call is {1 / total:.0%} of it")`,
      codeOutput: 'ingestion and extraction     15d  ##############\nauth and permissions          8d  #######\nevaluation golden set         5d  #####\nretrieval and prompt work     4d  ####\nthe model call itself         1d  #\n\ntotal 33 days — the model call is 3% of it',
      takeaways: [
        'Ship the smallest system that proves value, then extend.',
        'Ingestion, auth integration and evaluation dominate timelines — say so upfront.',
        'A plan that names its own risks earns more trust than an optimistic one.',
      ],
    },
    {
      id: 'm12-l4',
      title: 'Lesson 12.4 Data Integration and Enterprise Auth',
      objectives: [
        'Anticipate the reality of enterprise data sources.',
        'Carry access metadata from ingestion to retrieval.',
        'Avoid retrofitting permissions onto a prototype.',
      ],
      theory: 'Enterprise data lives in SharePoint, Confluence, S3, Salesforce, network drives and databases, each with its own API, quirks and permission model. Building connectors, handling incremental sync and dealing with formats that resist extraction is where most of the real engineering time goes.\nPermissions are the part that must be right from the first day. If a document is restricted to the finance team, that restriction must survive ingestion, retrieval and generation — which means capturing access metadata at ingestion and filtering inside the retrieval query. Retrofitting permissions onto a working prototype is painful and risky; a demo that leaks one restricted document can end an engagement.\nThe chain below is the thing to get right. An access rule that exists in the source system but is not carried into the chunk record cannot be enforced at query time, no matter how careful the retrieval code is.',
      callout: {
        lead: 'The chain that must not break:',
        text: 'source ACL → chunk metadata → retrieval filter. Drop it at any link and it cannot be enforced at the next.',
      },
      codeExample: `SOURCE_DOCS = [
    {"id": "d1", "acl": ["finance"], "text": "Q3 salary bands"},
    {"id": "d2", "acl": ["all"],     "text": "Office opening hours"},
]


def ingest(doc: dict, carry_acl: bool) -> dict:
    chunk = {"id": doc["id"], "text": doc["text"]}
    if carry_acl:
        chunk["acl"] = doc["acl"]
    return chunk


def retrieve(chunks: list[dict], user_groups: set) -> list[str]:
    visible = []
    for c in chunks:
        acl = c.get("acl")
        if acl is None:                       # metadata was never carried
            visible.append(c["id"] + " (UNGUARDED)")
        elif set(acl) & user_groups or "all" in acl:
            visible.append(c["id"])
    return visible


user = {"engineering"}
for carry in (False, True):
    chunks = [ingest(d, carry) for d in SOURCE_DOCS]
    print(f"acl carried at ingestion={carry}: {retrieve(chunks, user)}")`,
      codeOutput: "acl carried at ingestion=False: ['d1 (UNGUARDED)', 'd2 (UNGUARDED)']\nacl carried at ingestion=True: ['d2']",
      takeaways: [
        'Connectors, sync and extraction consume most of the engineering time.',
        'Carry access metadata from ingestion through to the retrieval filter, from day one.',
        'A permission not captured at ingestion cannot be enforced at query time.',
      ],
    },
    {
      id: 'm12-l5',
      title: 'Lesson 12.5 Deploying in Customer Environments',
      objectives: [
        'Ask about deployment constraints early.',
        'Trace how a constraint reshapes the architecture.',
        'Make remote debugging survivable.',
      ],
      theory: 'Customers may require deployment inside their own cloud account, their VPC, or fully on-premises with no internet access — which rules out hosted model APIs and pushes you toward open-weight models running locally. That constraint changes the architecture, so ask about it early rather than discovering it at delivery.\nDebugging in a customer environment is its own skill. You often cannot reproduce locally, may have limited log access, and every change needs approval. Structured logging, feature flags, and a configuration story that does not require a rebuild are what make the difference between a fix in an hour and a fix next sprint.\nThe cascade below is why this question belongs in the first conversation. "No internet access" is not a deployment detail; it eliminates hosted APIs, which changes your model, your hardware requirements and your cost model at once.',
      callout: {
        lead: 'Ask in the first meeting:',
        text: '"where does this have to run?" On-premise is not a deployment detail — it changes the model, the hardware and the cost.',
      },
      codeExample: `CONSTRAINTS = {
    "our cloud, hosted APIs allowed": [],
    "customer VPC, egress allowed": ["private networking", "their key management"],
    "on-premise, no internet": [
        "hosted model APIs ruled out",
        "open-weight model, self-hosted",
        "GPU capacity to procure",
        "cost model changes from per-token to per-GPU-hour",
    ],
}

for constraint, consequences in CONSTRAINTS.items():
    print(f"{constraint}")
    if not consequences:
        print("  (no architectural change)")
    for c in consequences:
        print(f"  -> {c}")`,
      codeOutput: 'our cloud, hosted APIs allowed\n  (no architectural change)\ncustomer VPC, egress allowed\n  -> private networking\n  -> their key management\non-premise, no internet\n  -> hosted model APIs ruled out\n  -> open-weight model, self-hosted\n  -> GPU capacity to procure\n  -> cost model changes from per-token to per-GPU-hour',
      takeaways: [
        'Ask about deployment constraints early — on-prem rules out hosted APIs.',
        'Structured logs and config-without-rebuild make remote debugging survivable.',
        'One deployment constraint can change the model, the hardware and the pricing at once.',
      ],
    },
    {
      id: 'm12-l6',
      title: 'Lesson 12.6 Communicating Trade-offs',
      objectives: [
        'State limitations as clearly as capabilities.',
        'Quantify cost, latency and accuracy on their data.',
        'Correct course early when you are wrong.',
      ],
      theory: 'Much of the job is explaining constraints to people who do not share your background. Say what the system cannot do as clearly as what it can. A customer who understands that answers are grounded in their documents and that anything outside them returns "I don\'t know" will read a refusal as correct behaviour rather than failure.\nQuantify trade-offs where you can: this configuration costs roughly this much per thousand questions, responds in about this long, and answers correctly at about this rate on your own golden set. Numbers from their data move conversations that adjectives cannot. And when you get something wrong, say so early — credibility recovered late is credibility lost.\nThe contrast below is worth rehearsing. The same system described in adjectives invites argument; described in numbers from the customer\'s own golden set, it invites a decision.',
      callout: {
        lead: 'Adjectives invite argument:',
        text: 'numbers from the customer\'s own golden set invite a decision. Bring the second kind.',
      },
      codeExample: `MEASURED = {
    "questions in golden set": 80,
    "answered correctly": 68,
    "declined (correctly)": 7,
    "wrong": 5,
    "p95_latency_ms": 2100,
    "cost_per_1000_usd": 4.20,
}

correct = MEASURED["answered correctly"] / MEASURED["questions in golden set"]
wrong = MEASURED["wrong"] / MEASURED["questions in golden set"]

print("vague:")
print("  'it works well and is pretty fast'\\n")
print("quantified, on their own data:")
print(f"  correct on {correct:.0%} of {MEASURED['questions in golden set']} real questions")
print(f"  declines rather than guessing on {MEASURED['declined (correctly)']}")
print(f"  wrong on {wrong:.0%} — this is the number to discuss")
print(f"  p95 latency {MEASURED['p95_latency_ms']}ms, {MEASURED['cost_per_1000_usd']:.2f} USD per 1000 questions")`,
      codeOutput: "vague:\n  'it works well and is pretty fast'\n\nquantified, on their own data:\n  correct on 85% of 80 real questions\n  declines rather than guessing on 7\n  wrong on 6% — this is the number to discuss\n  p95 latency 2100ms, 4.20 USD per 1000 questions",
      takeaways: [
        'State limitations as clearly as capabilities — it reframes refusals as correct.',
        'Quantify cost, latency and accuracy on the customer\'s own data.',
        'Naming your own error rate first is what makes the other numbers credible.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "A customer says \"we want an AI chatbot\". What is the first FDE move?", options: ["Find the underlying problem and who the users are", "Start building a chatbot", "Choose a vector database", "Choose a vector database and a model before discovery starts"], correctAnswer: "Find the underlying problem and who the users are" },
    { id: 2, question: "When must document access permissions be handled?", options: ["After the prototype is validated", "At ingestion and inside the retrieval query, from day one", "After the prototype proves value, once the index is stable", "Only for on-premises deployments"], correctAnswer: "At ingestion and inside the retrieval query, from day one" },
    { id: 3, question: "A customer requires fully on-premises deployment with no internet. What changes?", options: ["Only the billing model changes, since hosted APIs offer offline keys", "Only the billing model", "Hosted model APIs are ruled out; you need open-weight models running locally", "You must use a larger context window"], correctAnswer: "Hosted model APIs are ruled out; you need open-weight models running locally" },
    { id: 4, question: "Which single question most reshapes the architecture of a customer AI system?", options: ["Which model do you prefer?", "What is your budget?", "How many documents are there?", "What does a wrong answer cost you?"], correctAnswer: "What does a wrong answer cost you?" },
    { id: 5, question: "In a realistic delivery plan, which phase usually takes longest?", options: ["Ingestion and data extraction", "The model call integration", "Choosing a vector database", "Writing the system prompt"], correctAnswer: "Ingestion and data extraction" },
    { id: 6, question: "A document's ACL is not captured during ingestion. What is the consequence?", options: ["Nothing changes, because the vector index inherits permissions from the source", "Retrieval cannot filter on it, so access must be re-checked against the source system", "The document is skipped automatically", "Only admins can retrieve it"], correctAnswer: "Retrieval cannot filter on it, so access must be re-checked against the source system" },
    { id: 7, question: "What is the best scope for a first delivery against a 10-million-document request?", options: ["The full 10 million documents, so the value is visible from the start", "A proof of concept with synthetic data", "One document type and one team, shipped in weeks and measurable", "Whatever the customer asked for exactly"], correctAnswer: "One document type and one team, shipped in weeks and measurable" },
    { id: 8, question: "Why tell a customer your system's error rate unprompted?", options: ["It lowers expectations, so every later result feels like a win", "It is contractually required", "It shifts blame to the model", "Naming it first is what makes your other numbers credible"], correctAnswer: "Naming it first is what makes your other numbers credible" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A customer has 10 million documents; each averages 5 pages and ingestion processes 200 pages per minute. Roughly how long is a full ingestion?",
        options: [
          "About 17 hours",
          "About 35 days — 50 million pages at 1,000 per minute",
          "About 35 days",
          "About 174 days — 50 million pages at 200 per minute",
        ],
        correctAnswer: "About 174 days — 50 million pages at 200 per minute",
      },
      {
        kind: 'mcq',
        prompt: "A retrieved chunk carries the ACL [finance], and the user belongs to [engineering, all-staff]. What should retrieval return?",
        options: [
          "Exclude the chunk — the user shares no group with its ACL",
          "Include it, since the user is authenticated",
          "Include it with a warning banner",
          "Include it for engineering users only if they ask",
        ],
        correctAnswer: "Exclude the chunk — the user shares no group with its ACL",
      },
      {
        kind: 'mcq',
        prompt: "Discovery reveals the customer's real goal is cutting support resolution time, not \"a chatbot\". What is the right first deliverable?",
        options: [
          "A general chatbot over every internal system",
          "A narrow, measurable assistant for the highest-volume ticket type, with the baseline time recorded",
          "A vector database migration",
          "A model comparison report across three providers, before any build",
        ],
        correctAnswer: "A narrow, measurable assistant for the highest-volume ticket type, with the baseline time recorded",
      },
      {
        kind: 'mcq',
        prompt: "A bank requires that no data leaves its network and wants hosted frontier-model quality. How do you handle it?",
        options: [
          "Use a hosted API anyway and encrypt the traffic",
          "Promise identical quality on-premises and tune the models after launch",
          "State the trade-off plainly: on-premises open-weight models, with the quality gap measured on their own tasks",
          "Recommend a hosted API with a private endpoint, since that keeps the data inside their network",
        ],
        correctAnswer: "State the trade-off plainly: on-premises open-weight models, with the quality gap measured on their own tasks",
      },
      {
        kind: 'mcq',
        prompt: "In a customer demo, your system gets 1 answer wrong out of 20. What should you do?",
        options: [
          "Move past it quickly, since one error in twenty is within expectations",
          "Blame the underlying model",
          "Remove that question from future demos",
          "Name the error rate and how it is being measured and reduced — it makes the other results credible",
        ],
        correctAnswer: "Name the error rate and how it is being measured and reduced — it makes the other results credible",
      },
    ],
  },
};

export default mod_m12;
