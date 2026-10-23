import type { ModuleData } from '../GenAICourseData';

const mod_m2: ModuleData = {
  id: 'm2',
  title: 'MODULE 2: MACHINE LEARNING ESSENTIALS',
  overview: 'The ML vocabulary a GenAI engineer needs to reason about model behaviour and evaluate systems — without becoming a researcher.',
  outcomes: ['Explain supervised vs unsupervised learning', 'Split data correctly and spot overfitting', 'Measure quality with precision, recall and F1'],
  lessons: [
    {
      id: 'm2-l1',
      title: 'Lesson 2.1 What Machine Learning Is',
      objectives: [
        'Explain how ML inverts ordinary programming.',
        'Recognise problems that do not need a model.',
        'Justify the cheaper solution when one exists.',
      ],
      theory: 'Traditional programming encodes rules by hand: you write the logic, the data flows through it. Machine learning inverts that — you supply examples of inputs and desired outputs, and the training process derives the rules. That is the whole idea.\nThe engineering judgement is knowing when not to use it. If a problem can be solved with a lookup table, a regular expression or a handful of if-statements, those are cheaper, faster, testable and explainable. ML earns its keep when the rules are too numerous or too fuzzy to write down — language being the classic case.\nThis judgement recurs constantly in GenAI work, where the temptation is to send everything to a model. Routing by keyword, validating a format, or checking a value against a list are all things a model can do and none are things a model should do: it will be slower, cost money per call, and occasionally get it wrong.',
      callout: {
        lead: 'Ask this first:',
        text: 'could a lookup table, a regex or five if-statements do it? If yes, they will be faster, cheaper and testable.',
      },
      codeExample: `import re

RULE = re.compile(r"^(?:INV|REC)-\\d{6}$")


def classify_rule_based(ref: str) -> str:
    """Deterministic, free, testable, and correct every time."""
    return "valid_reference" if RULE.match(ref) else "not_a_reference"


for ref in ["INV-004512", "REC-991200", "invoice 4512", "INV-45"]:
    print(f"{ref:<14} -> {classify_rule_based(ref)}")

print("\\ncost per 1000 calls: $0.00, latency: microseconds")`,
      codeOutput: 'INV-004512     -> valid_reference\nREC-991200     -> valid_reference\ninvoice 4512   -> not_a_reference\nINV-45         -> not_a_reference\n\ncost per 1000 calls: $0.00, latency: microseconds',
      takeaways: [
        'ML learns rules from examples instead of you writing them.',
        'If a regex or lookup solves it, that beats a model.',
        'Sending deterministic work to a model buys latency, cost and occasional wrongness.',
      ],
    },
    {
      id: 'm2-l2',
      title: 'Lesson 2.2 Supervised and Unsupervised Learning',
      objectives: [
        'Distinguish supervised from unsupervised learning.',
        'Identify where the labels come from — and what they cost.',
        'Explain why LLM pretraining is self-supervised.',
      ],
      theory: 'Supervised learning trains on labelled data: each example carries the correct answer. Spam detection, sentiment classification and document routing are all supervised problems, and the cost is that somebody has to produce the labels.\nUnsupervised learning finds structure in unlabelled data — clustering similar documents, or reducing dimensionality. It matters for GenAI because embeddings are learned without task labels, and semantic search is effectively unsupervised similarity. Large language models are trained primarily by self-supervision: the label is simply the next token in the text, so the data labels itself.\nThat self-supervision is why pretraining could scale to internet-sized corpora at all. Nobody could label a trillion tokens; but every token in every document is already a training target for the tokens before it, which turns raw text into supervision for free.',
      callout: {
        lead: 'Think of it like this:',
        text: 'self-supervision is why pretraining scaled — every token is its own label, so raw text becomes free supervision.',
      },
      codeExample: `text = "the model predicts the next token"
tokens = text.split()

# Every position is a training example: context -> next token. No labeller.
for i in range(1, len(tokens)):
    context = " ".join(tokens[:i])
    label = tokens[i]
    print(f"{context:<32} -> {label}")

print(f"\\n{len(tokens) - 1} training examples from {len(tokens)} tokens, zero labelling")`,
      codeOutput: 'the                              -> model\nthe model                        -> predicts\nthe model predicts               -> the\nthe model predicts the           -> next\nthe model predicts the next      -> token\n\n5 training examples from 6 tokens, zero labelling',
      takeaways: [
        'Supervised needs labels; unsupervised finds structure without them.',
        'LLM pretraining is self-supervised — the next token is the label.',
        'Free supervision is what let pretraining scale to internet-sized corpora.',
      ],
    },
    {
      id: 'm2-l3',
      title: 'Lesson 2.3 Splitting Data and Overfitting',
      objectives: [
        'Split data into train, validation and test correctly.',
        'Recognise overfitting from the train/validation gap.',
        'Spot the prompt-engineering equivalent of overfitting.',
      ],
      theory: 'You split data three ways. The training set fits the model, the validation set tunes your choices, and the test set is touched once at the very end to estimate real-world performance. Evaluating on data the model trained on tells you nothing — it can memorise.\nOverfitting is a model that has learned the training data rather than the pattern: excellent training scores, poor performance on anything new. The tell is a widening gap between training and validation scores. In GenAI work the same trap appears when you tune prompts against the same twenty examples until they pass; you have overfitted your prompt to a tiny sample.\nThe defence is the same in both settings: hold something back and do not look at it. A golden set you never tune against is what tells you whether a prompt change is a genuine improvement or a memorised fit. Module 6 builds that set for RAG, and Module 11 wires it into CI.',
      callout: {
        lead: 'The GenAI version:',
        text: 'tuning a prompt until it passes your twenty favourite examples is overfitting, with extra steps.',
      },
      codeExample: `train_scores = [0.62, 0.75, 0.84, 0.91, 0.96, 0.99]
val_scores   = [0.60, 0.72, 0.79, 0.78, 0.74, 0.69]

print("epoch  train    val   gap")
for epoch, (t, v) in enumerate(zip(train_scores, val_scores), start=1):
    flag = "  <-- diverging" if t - v > 0.10 else ""
    print(f"{epoch:>5}  {t:.2f}  {v:.2f}  {t - v:+.2f}{flag}")

best = max(range(len(val_scores)), key=lambda i: val_scores[i])
print(f"\\nbest validation score at epoch {best + 1}; everything after is memorisation")`,
      codeOutput: 'epoch  train    val   gap\n    1  0.62  0.60  +0.02\n    2  0.75  0.72  +0.03\n    3  0.84  0.79  +0.05\n    4  0.91  0.78  +0.13  <-- diverging\n    5  0.96  0.74  +0.22  <-- diverging\n    6  0.99  0.69  +0.30  <-- diverging\n\nbest validation score at epoch 3; everything after is memorisation',
      takeaways: [
        'Train fits, validation tunes, test is touched once.',
        'Tuning prompts against a handful of examples is prompt overfitting.',
        'A widening train/validation gap is the signature — watch the gap, not the training score.',
      ],
    },
    {
      id: 'm2-l4',
      title: 'Lesson 2.4 Features, Labels and Text as Numbers',
      objectives: [
        'Explain how text becomes numbers a model can consume.',
        'State what bag-of-words and TF-IDF throw away.',
        'Motivate why embeddings exist.',
      ],
      theory: 'Features are the inputs a model sees; the label is the answer you want. Models consume numbers, so text must be converted. The classic approaches are bag-of-words and TF-IDF, which count terms and weight them by how distinctive they are across a corpus.\nThese lose word order and meaning: "the dog bit the man" and "the man bit the dog" look identical to bag-of-words, and "car" has no relationship to "automobile". Embeddings, covered in Module 5, solve exactly this by placing meaning in a continuous vector space. Knowing what TF-IDF cannot do is the clearest motivation for why embeddings exist.\nThat said, keyword methods are not obsolete. They match exact identifiers, product codes and rare names that embeddings often miss, which is why production retrieval frequently blends both — the hybrid search of Lesson 5.4.',
      callout: {
        lead: 'Keep this in mind:',
        text: 'keyword search is not obsolete. It catches exact codes and rare names that embeddings blur — hence hybrid search.',
      },
      codeExample: `from collections import Counter

a = "the dog bit the man"
b = "the man bit the dog"

print("bag-of-words identical:", Counter(a.split()) == Counter(b.split()))
print("meaning identical:     ", a == b)

# And synonymy is invisible to counting
q, d = "car insurance", "automobile coverage"
overlap = set(q.split()) & set(d.split())
print(f"\\noverlap between {q!r} and {d!r}: {overlap or 'none'}")`,
      codeOutput: "bag-of-words identical: True\nmeaning identical:      False\n\noverlap between 'car insurance' and 'automobile coverage': none",
      takeaways: [
        'Models need numbers; text must be vectorised first.',
        'TF-IDF ignores word order and synonymy — that gap is why embeddings exist.',
        'Keyword matching still wins on exact codes and rare names; production blends both.',
      ],
    },
    {
      id: 'm2-l5',
      title: 'Lesson 2.5 Measuring Quality',
      objectives: [
        'Explain why accuracy misleads on imbalanced data.',
        'Compute precision, recall and F1 from raw counts.',
        'Choose which to optimise from the product context.',
      ],
      theory: 'Accuracy is the fraction of predictions that were correct, and it is misleading whenever classes are imbalanced. If one percent of documents are fraudulent, a model that always answers "not fraud" scores ninety-nine percent accuracy while being useless.\nPrecision asks: of the items I flagged, how many were right? Recall asks: of the items I should have flagged, how many did I catch? They trade off against each other, and F1 is their harmonic mean. Which you optimise is a product decision — a legal search tool wants recall, an automated action wants precision. These same metrics reappear in Module 6 to evaluate retrieval.\nGuard your divisions. A classifier that flags nothing produces a zero denominator, and evaluation code that raises on its worst case is evaluation code you cannot trust at exactly the moment you need it.',
      callout: {
        lead: 'The product question:',
        text: 'what does a miss cost versus a false alarm? That answer, not a formula, picks precision or recall.',
      },
      syntax: `precision = true_positives / (true_positives + false_positives)
recall    = true_positives / (true_positives + false_negatives)
f1        = 2 * precision * recall / (precision + recall)`,
      codeExample: `def scores(tp: int, fp: int, fn: int) -> dict:
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {"precision": round(precision, 3), "recall": round(recall, 3), "f1": round(f1, 3)}


# 1000 documents, 10 are fraud. The lazy model flags nothing.
lazy_accuracy = 990 / 1000
print(f"accuracy of a model that always says 'not fraud': {lazy_accuracy:.1%}")
print("its actual scores:", scores(tp=0, fp=0, fn=10))

print("\\ncautious model:", scores(tp=6, fp=1, fn=4))
print("eager model:   ", scores(tp=10, fp=40, fn=0))`,
      codeOutput: "accuracy of a model that always says 'not fraud': 99.0%\nits actual scores: {'precision': 0.0, 'recall': 0.0, 'f1': 0.0}\n\ncautious model: {'precision': 0.857, 'recall': 0.6, 'f1': 0.706}\neager model:    {'precision': 0.2, 'recall': 1.0, 'f1': 0.333}",
      takeaways: [
        'Accuracy lies on imbalanced data.',
        'Precision vs recall is a product decision, not a technical one.',
        'Guard every denominator — a classifier that flags nothing is a real case.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "A model scores 99% accuracy detecting fraud, where 1% of cases are fraud. What is most likely?", options: ["It may be predicting \"not fraud\" every time", "It is an excellent model", "It is overfitting the test set", "Accuracy is the wrong formula"], correctAnswer: "It may be predicting \"not fraud\" every time" },
    { id: 2, question: "Training accuracy keeps rising while validation accuracy falls. What is happening?", options: ["Underfitting", "Overfitting", "Data leakage into the test set", "The learning rate is too low"], correctAnswer: "Overfitting" },
    { id: 3, question: "Why is LLM pretraining described as self-supervised?", options: ["It needs no data", "Humans label every sentence", "The next token in the text acts as the label", "It uses clustering instead of labels"], correctAnswer: "The next token in the text acts as the label" },
    { id: 4, question: "What is the test set for?", options: ["Tuning hyperparameters", "Training when the training set is small", "Choosing which model architecture to use", "A single final estimate of real-world performance"], correctAnswer: "A single final estimate of real-world performance" },
    { id: 5, question: "A legal discovery tool must not miss a relevant document. Which metric do you optimise?", options: ["Recall", "Precision", "Accuracy", "Training loss"], correctAnswer: "Recall" },
    { id: 6, question: "What do bag-of-words and TF-IDF both discard?", options: ["Term frequency", "Word order and synonymy", "Document length", "Punctuation only"], correctAnswer: "Word order and synonymy" },
    { id: 7, question: "You tune a prompt until it passes your twenty test examples. What have you likely done?", options: ["Achieved production quality", "Performed a valid held-out evaluation", "Overfitted the prompt to a tiny sample", "Reduced token cost"], correctAnswer: "Overfitted the prompt to a tiny sample" },
    { id: 8, question: "Your classifier flags nothing, so precision has a zero denominator. What should your evaluation code report?", options: ["Raise a ZeroDivisionError", "Skip that run and report the previous run's metrics instead", "Report 100% precision", "0.0 for precision by convention, rather than crashing on the division"], correctAnswer: "0.0 for precision by convention, rather than crashing on the division" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A spam filter reports 90 true positives, 10 false positives and 30 false negatives. What are precision and recall?",
        options: [
          "Precision 0.75, recall 0.90",
          "Precision 0.90, recall 0.75",
          "Precision 0.90, recall 0.90",
          "Precision 0.75, recall 0.75",
        ],
        correctAnswer: "Precision 0.90, recall 0.75",
      },
      {
        kind: 'mcq',
        prompt: "Validation loss is lowest at epoch 4 and rises steadily through epoch 12 while training loss keeps falling. Which checkpoint should you ship?",
        options: [
          "Epoch 12 — it has the lowest training loss",
          "Epoch 12 — the latest checkpoint has seen the most training data",
          "Epoch 4 — the point before the model began memorising the training data",
          "An average of all twelve epochs",
        ],
        correctAnswer: "Epoch 4 — the point before the model began memorising the training data",
      },
      {
        kind: 'mcq',
        prompt: "Before training a model to route support tickets to four teams, what should you build first?",
        options: [
          "A fine-tuned LLM trained on every historical ticket available",
          "A vector database of all past tickets",
          "A dashboard for model accuracy",
          "A simple keyword baseline that the model must beat to justify itself",
        ],
        correctAnswer: "A simple keyword baseline that the model must beat to justify itself",
      },
      {
        kind: 'mcq',
        prompt: "You measured accuracy on the test set, changed features, and measured again, repeating this twenty times. What has happened to the test set?",
        options: [
          "It has leaked into model selection and no longer gives an unbiased estimate",
          "Nothing — the test set is only a problem if you train on it",
          "Its estimate has become more reliable with repetition",
          "It has become a second training set in the literal sense",
        ],
        correctAnswer: "It has leaked into model selection and no longer gives an unbiased estimate",
      },
      {
        kind: 'mcq',
        prompt: "A cancer screening tool and an email promotions filter both need tuning. Which should favour recall over precision?",
        options: [
          "The promotions filter — missing a promotion is worse",
          "The cancer screen — a missed case costs far more than a false alarm",
          "Both equally, because F1 balances them",
          "Neither; accuracy is the right target for both",
        ],
        correctAnswer: "The cancer screen — a missed case costs far more than a false alarm",
      },
    ],
  },
};

export default mod_m2;
