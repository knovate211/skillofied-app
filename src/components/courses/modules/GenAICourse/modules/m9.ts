import type { ModuleData } from '../GenAICourseData';

const mod_m9: ModuleData = {
  id: 'm9',
  title: 'MODULE 9: FINE-TUNING',
  overview: 'When to adapt a model rather than prompt or retrieve — dataset preparation, LoRA, and the honest answer about when not to bother.',
  outcomes: ['Choose between prompting, RAG and fine-tuning', 'Prepare and validate a training dataset', 'Explain LoRA, QLoRA and PEFT'],
  lessons: [
    {
      id: 'm9-l1',
      title: 'Lesson 9.1 Prompting vs RAG vs Fine-tuning',
      objectives: [
        'Apply the missing-facts versus wrong-behaviour test.',
        'Exhaust prompting before considering training.',
        'Explain why fine-tuning is a poor way to add knowledge.',
      ],
      theory: 'These solve different problems and are routinely confused in interviews. Prompting changes instructions and is instant and free to iterate. RAG supplies knowledge the model does not have, updates the moment a document changes, and can cite sources. Fine-tuning changes learned behaviour — tone, format, a specialised task — but bakes knowledge in at training time.\nThe decision rule is compact. If the model lacks facts, use RAG. If it knows the facts but consistently behaves wrongly — wrong format, wrong register, wrong task framing — consider fine-tuning. If you have not yet exhausted prompting and few-shot examples, do that first, because it costs hours rather than weeks. Fine-tuning to inject knowledge is the classic expensive mistake: the model learns the style of your documents without reliably learning their content.\nThe ordering in the decision function below is deliberate. Prompting is checked before fine-tuning, because "we tried a few prompts and it did not work" is not the same as having exhausted prompting, and the difference between those two states is several weeks of somebody\'s time.',
      callout: {
        lead: 'The compact rule:',
        text: 'missing facts → RAG. Wrong behaviour → fine-tuning. Not sure → you have not finished trying prompts.',
      },
      codeExample: `def recommend(missing_facts: bool, wrong_behaviour: bool, prompting_exhausted: bool) -> str:
    if missing_facts:
        return "RAG — supply the knowledge"
    if not prompting_exhausted:
        return "Prompting first — hours, not weeks"
    if wrong_behaviour:
        return "Fine-tuning — shape the behaviour"
    return "Ship what you have"


cases = [
    ("policies changed last week", True, False, True),
    ("format is inconsistent", False, True, False),
    ("format is inconsistent", False, True, True),
    ("everything works", False, False, True),
]

for label, facts, behaviour, exhausted in cases:
    print(f"{label:<28}{recommend(facts, behaviour, exhausted)}")`,
      codeOutput: 'policies changed last week  RAG — supply the knowledge\nformat is inconsistent      Prompting first — hours, not weeks\nformat is inconsistent      Fine-tuning — shape the behaviour\neverything works            Ship what you have',
      takeaways: [
        'Missing facts → RAG. Wrong behaviour → fine-tuning. Try prompting first.',
        'Fine-tuning to inject knowledge is the classic expensive mistake.',
        '"We tried a few prompts" is not the same as having exhausted prompting.',
      ],
    },
    {
      id: 'm9-l2',
      title: 'Lesson 9.2 Preparing the Dataset',
      objectives: [
        'Format training examples as JSONL message arrays.',
        'Validate a dataset before spending a training run.',
        'Value consistency over volume.',
      ],
      theory: 'Fine-tuning is mostly a data problem. The usual format is JSONL, one example per line, each holding a messages array in the same shape as an API call. Quality dominates quantity — a few hundred consistent, correct examples routinely beat tens of thousands of noisy ones.\nConsistency is what the model actually learns. If half your examples answer in Markdown and half in plain prose, you are teaching it to be inconsistent. Hold out a genuine validation split before training, never after, and check for near-duplicates between train and validation or your evaluation will flatter itself. Budget most of your project time here; teams routinely underestimate it.\nRun a validator before every training run. Each of the four problems below — malformed JSON, an empty conversation, an example that does not end with an assistant turn, an exact duplicate — is cheap to detect and expensive to discover after the GPU time is spent.',
      callout: {
        lead: 'Before every training run:',
        text: 'validate the dataset. These four checks cost seconds; discovering them after a training run costs a day.',
      },
      syntax: `{"messages": [{"role": "system", "content": "..."},
              {"role": "user", "content": "..."},
              {"role": "assistant", "content": "..."}]}
# One JSON object per line. Consistency across examples matters more than volume.`,
      codeExample: `import json

LINES = [
    '{"messages":[{"role":"user","content":"hi"},{"role":"assistant","content":"hello"}]}',
    '{"messages":[{"role":"user","content":"hi"},{"role":"assistant","content":"hello"}]}',
    '{"messages":[{"role":"user","content":"no answer here"}]}',
    '{"messages":[]}',
    'not json at all',
]


def validate(lines: list[str]) -> dict:
    valid, problems, seen = 0, [], set()
    for n, line in enumerate(lines, start=1):
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            problems.append(f"line {n}: invalid JSON")
            continue
        messages = obj.get("messages")
        if not messages:
            problems.append(f"line {n}: empty messages array")
            continue
        if messages[-1].get("role") != "assistant":
            problems.append(f"line {n}: last message is not from the assistant")
            continue
        if line in seen:
            problems.append(f"line {n}: duplicate example")
            continue
        seen.add(line)
        valid += 1
    return {"valid": valid, "problems": problems}


result = validate(LINES)
print("usable examples:", result["valid"], "of", len(LINES))
for p in result["problems"]:
    print(" ", p)`,
      codeOutput: 'usable examples: 1 of 5\n  line 2: duplicate example\n  line 3: last message is not from the assistant\n  line 4: empty messages array\n  line 5: invalid JSON',
      takeaways: [
        'A few hundred consistent examples beat tens of thousands of noisy ones.',
        'Inconsistent formatting in training data teaches inconsistency.',
        'Validate before training — four cheap checks save a wasted GPU run.',
      ],
    },
    {
      id: 'm9-l3',
      title: 'Lesson 9.3 Instruction Tuning',
      objectives: [
        'Distinguish a base model from an instruction-tuned one.',
        'Explain what alignment training adds.',
        'Set realistic expectations for your own fine-tune.',
      ],
      theory: 'A base model only continues text; given a question it might produce more questions, because that is a plausible continuation. Instruction tuning trains it to follow instructions and answer, and a further alignment stage using human preference data shapes it to be helpful and safe.\nThis is why the models you call through an API already behave conversationally, and it clarifies what your own fine-tune is doing: adapting an already instruction-tuned model to your specific task, not teaching it language. That framing keeps expectations realistic about how much a small fine-tune can change.\nIt also explains why a few hundred examples can work at all. You are not teaching grammar, facts or reasoning — all of that arrived during pretraining and instruction tuning. You are nudging an already-capable model toward one specific output shape, which is a far smaller ask.',
      callout: {
        lead: 'Why 300 examples can be enough:',
        text: 'you are not teaching language or reasoning. You are nudging an already-tuned model toward one output shape.',
      },
      codeExample: `question = "What is the refund window?"

base_model_output = (
    "What is the refund window? How do I start a return? "
    "Where is my nearest store?"          # plausible continuation: more questions
)

instruction_tuned_output = "Refunds are issued within 14 days of receipt."

print("prompt: ", question)
print("base:   ", base_model_output)
print("tuned:  ", instruction_tuned_output)
print("\\nsame pretrained knowledge — instruction tuning changed what it does with it")`,
      codeOutput: 'prompt:  What is the refund window?\nbase:    What is the refund window? How do I start a return? Where is my nearest store?\ntuned:   Refunds are issued within 14 days of receipt.\n\nsame pretrained knowledge — instruction tuning changed what it does with it',
      takeaways: [
        'Base models continue text; instruction tuning makes them answer.',
        'Your fine-tune adapts an already-tuned model — it does not teach language.',
        'That is why a few hundred well-formed examples can move behaviour at all.',
      ],
    },
    {
      id: 'm9-l4',
      title: 'Lesson 9.4 LoRA, QLoRA and PEFT',
      objectives: [
        'Explain what parameter-efficient fine-tuning freezes and trains.',
        'Quantify how small a LoRA adapter is.',
        'Serve several adapters over one base model.',
      ],
      theory: 'Full fine-tuning updates every weight and demands enormous memory. Parameter-efficient fine-tuning freezes the original weights and trains a small number of new ones instead. LoRA — low-rank adaptation — inserts small trainable matrices into the model, typically training well under one percent of the parameters.\nThe practical consequences are large. Training becomes feasible on a single GPU, the resulting adapter is megabytes rather than gigabytes, and you can keep several task-specific adapters over one base model and swap them at serving time. QLoRA adds quantisation of the frozen base to shrink memory further, making surprisingly large models tunable on modest hardware. For nearly all applied work, LoRA is the default and full fine-tuning the exception.\nThe arithmetic is worth seeing once, because the ratio is what makes the serving story possible. An adapter measured in megabytes can be loaded, swapped and shipped per customer; a full fine-tune measured in gigabytes cannot.',
      callout: {
        lead: 'Why this changes deployment:',
        text: 'a megabyte-sized adapter can be swapped per customer at serving time. A gigabyte-sized full fine-tune cannot.',
      },
      codeExample: `BASE_PARAMS = 7_000_000_000
HIDDEN, LAYERS, RANK = 4096, 32, 8

# Two low-rank matrices per projection, four projections per layer.
adapter_params = LAYERS * 4 * 2 * HIDDEN * RANK
share = adapter_params / BASE_PARAMS

print(f"base model:   {BASE_PARAMS:>15,} parameters (frozen)")
print(f"LoRA adapter: {adapter_params:>15,} parameters ({share:.3%} trained)")
print(f"\\nadapter on disk at 2 bytes per parameter: {adapter_params * 2 / 1e6:.0f} MB")
print("one base model in memory, a different adapter per customer")`,
      codeOutput: 'base model:     7,000,000,000 parameters (frozen)\nLoRA adapter:       8,388,608 parameters (0.120% trained)\n\nadapter on disk at 2 bytes per parameter: 17 MB\none base model in memory, a different adapter per customer',
      takeaways: [
        'LoRA trains a tiny adapter instead of all weights — one GPU, megabyte artefacts.',
        'Swap task-specific adapters over one shared base model at serving time.',
        'Well under 1% of parameters trained is what makes per-customer adapters practical.',
      ],
    },
    {
      id: 'm9-l5',
      title: 'Lesson 9.5 Evaluating and Knowing When Not To',
      objectives: [
        'Baseline a fine-tune against the best prompt.',
        'Watch for regression outside the training distribution.',
        'Recognise the cases that should not be fine-tuned.',
      ],
      theory: 'Evaluate a fine-tune against the honest baseline: the best prompt you could write for the original model, measured on the same held-out set. Teams frequently celebrate a fine-tune that a good few-shot prompt would have matched at a fraction of the cost.\nWatch for regression outside your training distribution — a model tuned hard on one narrow task often gets worse at everything else. And recognise the cases where you should not fine-tune at all: knowledge that changes frequently, requirements that demand citations, datasets too small to be representative, or a task where prompting already meets the bar. Saying "we should not fine-tune this, and here is why" is a senior answer in an interview.\nThe comparison below is the one that gets skipped. Measured against a weak prompt, the fine-tune looks like a triumph. Measured against the best prompt anyone actually tried, it gained two points for several weeks of work — and lost ground on everything it was not trained for.',
      callout: {
        lead: 'The comparison teams skip:',
        text: 'not "fine-tune versus nothing" but "fine-tune versus the best prompt you could write". Those give very different answers.',
      },
      codeExample: `RESULTS = {
    "base model, weak prompt": 0.61,
    "base model, best prompt": 0.84,
    "fine-tuned model":        0.86,
}

baseline = RESULTS["base model, best prompt"]
for name, score in RESULTS.items():
    print(f"{name:<26}{score:.2f}   {score - baseline:+.2f} vs honest baseline")

# And on tasks it was never trained for:
print(f"\\n{'fine-tuned, other tasks':<26}{0.71:.2f}   {0.71 - baseline:+.2f} vs honest baseline")
print("\\n+0.02 on target, -0.13 everywhere else, for weeks of work")`,
      codeOutput: 'base model, weak prompt   0.61   -0.23 vs honest baseline\nbase model, best prompt   0.84   +0.00 vs honest baseline\nfine-tuned model          0.86   +0.02 vs honest baseline\n\nfine-tuned, other tasks   0.71   -0.13 vs honest baseline\n\n+0.02 on target, -0.13 everywhere else, for weeks of work',
      takeaways: [
        'Baseline against the best prompt on the original model, not against nothing.',
        'Narrow tuning often degrades everything outside the training distribution.',
        'Recommending against a fine-tune, with reasons, is a senior answer.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "Your chatbot lacks knowledge of internal policies that change monthly. What do you use?", options: ["RAG", "Fine-tuning", "A larger context window alone", "Higher temperature"], correctAnswer: "RAG" },
    { id: 2, question: "What does LoRA train?", options: ["Every weight in the model", "A small number of inserted low-rank matrices, with the base frozen", "The full set of attention weights, at a lower learning rate", "The embedding model"], correctAnswer: "A small number of inserted low-rank matrices, with the base frozen" },
    { id: 3, question: "What is the correct baseline when evaluating a fine-tune?", options: ["An untrained random model", "The training set score", "The best prompt on the original model, on the same held-out set", "The fine-tuned model's own score on its training set"], correctAnswer: "The best prompt on the original model, on the same held-out set" },
    { id: 4, question: "Half your training examples answer in Markdown and half in plain prose. What have you taught the model?", options: ["To choose the better format per question", "Nothing — formatting is ignored", "To prefer Markdown", "To be inconsistent"], correctAnswer: "To be inconsistent" },
    { id: 5, question: "What does a base model typically do when given a question?", options: ["Continue the text, possibly with more questions", "Answer it directly", "Answer it directly, since pretraining teaches question answering", "Return an error"], correctAnswer: "Continue the text, possibly with more questions" },
    { id: 6, question: "Why can a few hundred examples be enough for a useful fine-tune?", options: ["Models learn language quickly", "You are nudging an already instruction-tuned model toward one output shape", "Providers pad small datasets with synthetic examples automatically", "Small datasets prevent overfitting"], correctAnswer: "You are nudging an already instruction-tuned model toward one output shape" },
    { id: 7, question: "What does QLoRA add over LoRA?", options: ["More trainable parameters", "A larger context window, so longer examples fit during training", "Quantisation of the frozen base to reduce memory", "Automatic dataset cleaning"], correctAnswer: "Quantisation of the frozen base to reduce memory" },
    { id: 8, question: "A model tuned hard on one narrow task scores worse on unrelated tasks. What is this?", options: ["A data leak from the evaluation set into the training data", "Underfitting", "A tokenizer mismatch", "Catastrophic forgetting of abilities outside the tuned task"], correctAnswer: "Catastrophic forgetting of abilities outside the tuned task" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A training set has one example where the same question appears in both the training and validation split. What is the risk?",
        options: [
          "Leakage — validation scores become inflated and stop reflecting unseen data",
          "None; duplicates only waste compute",
          "The model will refuse that question",
          "Training fails, because providers reject duplicated questions",
        ],
        correctAnswer: "Leakage — validation scores become inflated and stop reflecting unseen data",
      },
      {
        kind: 'mcq',
        prompt: "A JSONL fine-tuning file contains some rows missing the assistant message and some over the token limit. When should this be caught?",
        options: [
          "After training, by reading the model's outputs",
          "Before the training run, by a validation pass that counts and reports problems",
          "Never — the provider fixes malformed rows",
          "During inference, when malformed rows surface as bad answers",
        ],
        correctAnswer: "Before the training run, by a validation pass that counts and reports problems",
      },
      {
        kind: 'mcq',
        prompt: "A PM wants to fine-tune so the bot knows this quarter's product prices. What do you recommend?",
        options: [
          "Fine-tune monthly on the price list",
          "A higher temperature",
          "RAG over the price list — prices change and must be current and citable",
          "A bigger base model that already knows current market pricing",
        ],
        correctAnswer: "RAG over the price list — prices change and must be current and citable",
      },
      {
        kind: 'mcq',
        prompt: "A LoRA adapter at rank 8 on a 4,096-dimensional projection adds how many parameters for that one projection?",
        options: [
          "32,768 — one matrix of 4,096 × 8",
          "16,777,216 — the full 4,096 × 4,096 matrix",
          "64 — rank squared",
          "65,536 — two matrices of 4,096 × 8",
        ],
        correctAnswer: "65,536 — two matrices of 4,096 × 8",
      },
      {
        kind: 'mcq',
        prompt: "Your fine-tuned model beats the base model on your eval set. What comparison is still missing?",
        options: [
          "The base model with your best prompt and few-shot examples on the same held-out set",
          "A comparison against a random model",
          "The fine-tuned model's score on the data it was trained with",
          "Nothing — beating the base model is sufficient",
        ],
        correctAnswer: "The base model with your best prompt and few-shot examples on the same held-out set",
      },
    ],
  },
};

export default mod_m9;
