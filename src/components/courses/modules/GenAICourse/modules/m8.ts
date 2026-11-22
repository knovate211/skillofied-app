import type { ModuleData } from '../GenAICourseData';

const mod_m8: ModuleData = {
  id: 'm8',
  title: 'MODULE 8: MULTIMODAL GENAI',
  overview: 'Text, images, audio and video — and the latency budget that decides whether a voice agent feels alive or broken.',
  outcomes: ['Describe speech-to-text and text-to-speech pipelines', 'Use vision models on documents and screenshots', 'Budget latency for real-time voice'],
  lessons: [
    {
      id: 'm8-l1',
      title: 'Lesson 8.1 Beyond Text',
      objectives: [
        'Distinguish native multimodal models from conversion pipelines.',
        'Choose the shape that fits the failure you need to debug.',
        'Recognise where converting to text destroys the signal.',
      ],
      theory: 'Multimodal models accept and sometimes produce more than text — images, audio and video. Practically this arrives in two shapes: a single model that natively accepts images alongside text, or a pipeline that converts one modality to text, reasons over the text, and converts back.\nThe pipeline approach remains the workhorse for audio because it is composable and debuggable. You can inspect the transcript, log it, evaluate it and swap any stage independently. Native multimodal models are stronger where the visual detail itself matters, such as reading a chart or a screenshot, since converting that to text first destroys the information you needed.\nThe deciding question is what you will need to look at when it goes wrong. A pipeline leaves you an artefact at every stage; a native call leaves you the input and the output and nothing in between. For audio that intermediate transcript is usually worth more than the accuracy you trade away for it.',
      callout: {
        lead: 'Choose on debuggability:',
        text: 'a pipeline leaves you an artefact at every stage. A native call leaves you input and output, and nothing in between.',
      },
      codeExample: `def pipeline(audio: str) -> str:
    """Convert to text first — every stage leaves something inspectable."""
    transcript = audio.replace("[audio]", "").strip()
    print("  stage 1 transcript (logged, evaluable):", repr(transcript))
    return f"  stage 2 answer about: {transcript}"


def native(audio: str) -> str:
    """One call. Nothing in the middle to inspect when it is wrong."""
    return "  answer (no intermediate artefact)"


clip = "[audio] how long do refunds take"

print("pipeline:")
print(pipeline(clip))
print("native:")
print(native(clip))`,
      codeOutput: "pipeline:\n  stage 1 transcript (logged, evaluable): 'how long do refunds take'\n  stage 2 answer about: how long do refunds take\nnative:\n  answer (no intermediate artefact)",
      takeaways: [
        'Two shapes: natively multimodal models, or convert-to-text pipelines.',
        'Pipelines are debuggable; native models win when visual detail is the point.',
        'Ask what you will need to inspect when it fails — that usually decides it.',
      ],
    },
    {
      id: 'm8-l2',
      title: 'Lesson 8.2 Speech to Text',
      objectives: [
        'Identify what actually degrades transcription accuracy.',
        'Explain why streaming matters more than accuracy in real time.',
        'Pair streaming with voice-activity detection.',
      ],
      theory: 'Speech recognition models such as Whisper turn audio into text and are strong enough that transcription is rarely the hard part. The hard parts are the edges: domain vocabulary, product names, accents and background noise all degrade accuracy, and errors propagate silently into everything downstream.\nFor real-time use, streaming transcription matters more than raw accuracy. Waiting for the speaker to finish before transcribing adds seconds of dead air. Streaming emits partial results as audio arrives, and pairing it with voice-activity detection to identify end-of-speech is what makes a conversation feel natural rather than walkie-talkie.\nThe silent propagation is the part worth fearing. A misheard product name does not raise an error — it becomes a retrieval query for something that does not exist, and the user gets a confident answer about the wrong thing. Log transcripts and sample them; it is the cheapest quality check in a voice product.',
      callout: {
        lead: 'The silent failure:',
        text: 'a misheard product name never raises an error. It becomes a retrieval query for a thing that does not exist.',
      },
      codeExample: `WORDS = "how long do refunds take".split()

print("batch — nothing until the speaker stops:")
print(f"  t=2.0s  {' '.join(WORDS)!r}")

print("streaming — partials as audio arrives:")
for i in range(1, len(WORDS) + 1):
    print(f"  t={i * 0.4:.1f}s  {' '.join(WORDS[:i])!r}")

print("\\ndownstream can start retrieving before the sentence is finished")`,
      codeOutput: "batch — nothing until the speaker stops:\n  t=2.0s  'how long do refunds take'\nstreaming — partials as audio arrives:\n  t=0.4s  'how'\n  t=0.8s  'how long'\n  t=1.2s  'how long do'\n  t=1.6s  'how long do refunds'\n  t=2.0s  'how long do refunds take'\n\ndownstream can start retrieving before the sentence is finished",
      takeaways: [
        'Domain vocabulary and noise, not the model, are the usual accuracy problem.',
        'Streaming plus voice-activity detection is what makes real-time feel natural.',
        'Transcription errors propagate silently — log and sample transcripts.',
      ],
    },
    {
      id: 'm8-l3',
      title: 'Lesson 8.3 Text to Speech and Streaming',
      objectives: [
        'Explain why latency, not naturalness, is the bottleneck.',
        'Detect sentence boundaries in a token stream.',
        'Start synthesis before generation finishes.',
      ],
      theory: 'Text-to-speech has become good enough that naturalness is no longer the bottleneck; latency is. The technique that matters is streaming both stages together: begin synthesising audio from the first sentence the LLM produces rather than waiting for the full response.\nThat one change typically removes several seconds of perceived delay, because the user hears speech while the model is still generating. It requires sentence-boundary detection on the token stream and careful audio buffering to avoid gaps, which is where most of the engineering effort in a voice product actually goes.\nThe subtlety is that tokens do not arrive on sentence boundaries. You receive fragments, so you need a buffer that accumulates until a terminator appears, emits the completed sentence, and keeps the remainder for the next round — which is exactly what the generator below does.',
      callout: {
        lead: 'Where the effort goes:',
        text: 'tokens do not arrive on sentence boundaries. Buffering until a terminator appears is most of the work in a voice product.',
      },
      codeExample: `import re

SENTENCE = re.compile(r"[^.!?]+[.!?]")


def stream_sentences(chunks):
    """Emit each complete sentence as soon as its terminator arrives."""
    buffer = ""
    for chunk in chunks:
        buffer += chunk
        while True:
            m = SENTENCE.search(buffer)
            if not m:
                break
            yield m.group().strip()
            buffer = buffer[m.end():]
    if buffer.strip():
        yield buffer.strip()


# What arrives from the model — fragments, not sentences.
token_stream = ["Refunds take ", "14 days. ", "Appeals take ", "30 days. ", "Contact support."]

for i, sentence in enumerate(stream_sentences(token_stream), start=1):
    print(f"synthesis {i} starts while the model is still generating: {sentence!r}")`,
      codeOutput: "synthesis 1 starts while the model is still generating: 'Refunds take 14 days.'\nsynthesis 2 starts while the model is still generating: 'Appeals take 30 days.'\nsynthesis 3 starts while the model is still generating: 'Contact support.'",
      takeaways: [
        'Stream TTS from the first sentence instead of waiting for the full response.',
        'Sentence-boundary detection and audio buffering are the real work.',
        'Tokens arrive mid-sentence — buffer, emit on a terminator, keep the remainder.',
      ],
    },
    {
      id: 'm8-l4',
      title: 'Lesson 8.4 Vision',
      objectives: [
        'Apply vision models where text extraction fails.',
        'Route pages hybrid to control cost.',
        'Treat images as untrusted input.',
      ],
      theory: 'Vision-capable models read screenshots, charts, diagrams, handwriting and scanned pages. The highest-value use in enterprise work is document understanding, particularly for PDFs where traditional text extraction fails — multi-column layouts, tables and scans that carry meaning in their structure.\nA practical hybrid works well: extract text normally where extraction is clean, and fall back to the vision model for pages where it is not. Watch cost and context, since images consume a substantial number of tokens, and remember that an image is untrusted input too — text inside an image can carry a prompt injection just as a document can.\nThe routing rule can be simple and still save most of the money. Almost no extracted text means a scan; a detected table means layout carries meaning. Everything else goes down the cheap path, which in a typical corpus is the large majority of pages.',
      callout: {
        lead: 'Do not forget:',
        text: 'an image is untrusted input. Text inside a screenshot can carry an injection exactly like a document can.',
      },
      codeExample: `PAGES = [
    {"n": 1, "chars": 2400, "has_table": False},   # clean text
    {"n": 2, "chars": 12,   "has_table": False},   # a scan
    {"n": 3, "chars": 1800, "has_table": True},    # layout carries meaning
    {"n": 4, "chars": 3100, "has_table": False},   # clean text
]

VISION, TEXT = 0.0040, 0.0001


def route(page: dict) -> str:
    if page["chars"] < 100 or page["has_table"]:
        return "vision"
    return "text"


total = 0.0
for page in PAGES:
    method = route(page)
    total += VISION if method == "vision" else TEXT
    print(f"page {page['n']}: {method}")

print(f"\\nhybrid:          {total:.4f} USD")
print(f"vision for all:  {len(PAGES) * VISION:.4f} USD")`,
      codeOutput: 'page 1: text\npage 2: vision\npage 3: vision\npage 4: text\n\nhybrid:          0.0082 USD\nvision for all:  0.0160 USD',
      takeaways: [
        'Vision rescues PDFs where text extraction fails; hybrid by page is cost-effective.',
        'Images are untrusted input — they can carry injected instructions.',
        'A two-line routing rule captures most of the saving.',
      ],
    },
    {
      id: 'm8-l5',
      title: 'Lesson 8.5 Voice Agent Architecture',
      objectives: [
        'Budget end-to-end latency across the pipeline.',
        'Identify which stage to optimise first.',
        'Handle barge-in correctly.',
      ],
      theory: 'A voice agent chains speech-to-text, an LLM, possibly retrieval or tools, then text-to-speech, over a persistent WebSocket connection. Each stage adds delay, and the sum is what the user experiences as responsiveness.\nHumans notice conversational delay beyond roughly 800 milliseconds. That is your total budget, and it forces real decisions: stream at every stage, keep the system prompt short, cap retrieval, use a fast model for the conversational path and reserve a stronger one for genuinely hard turns. Handling barge-in — the user interrupting mid-response — means cancelling in-flight generation and synthesis immediately, and it is what separates a demo from a product.\nWhen you are over budget, optimise the largest stage rather than the easiest one. Teams routinely shave twenty milliseconds off retrieval while the first-token latency sits at four hundred and fifty, because retrieval is the part they control most comfortably.',
      callout: {
        lead: 'Optimise the biggest number:',
        text: 'teams shave 20ms off retrieval while first-token latency sits at 450ms, because retrieval is the part they find comfortable.',
      },
      codeExample: `PIPELINE = [
    ("stt", 320),
    ("retrieval", 180),
    ("llm_first_token", 450),
    ("tts_first_audio", 200),
]
TARGET = 800

total = sum(ms for _, ms in PIPELINE)
print(f"total {total}ms against a {TARGET}ms budget")

for name, ms in sorted(PIPELINE, key=lambda s: s[1], reverse=True):
    share = ms / total
    print(f"  {name:<18}{ms:>5}ms  {share:>5.0%}")

print(f"\\nover by {total - TARGET}ms — start at the top of that list, not the bottom")`,
      codeOutput: 'total 1150ms against a 800ms budget\n  llm_first_token     450ms    39%\n  stt                 320ms    28%\n  tts_first_audio     200ms    17%\n  retrieval           180ms    16%\n\nover by 350ms — start at the top of that list, not the bottom',
      takeaways: [
        'Budget around 800ms end to end; stream at every stage.',
        'Barge-in handling separates a voice demo from a voice product.',
        'Optimise the largest stage, not the most familiar one.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "What most reduces perceived latency in a voice agent?", options: ["Streaming TTS from the first sentence rather than the full response", "A larger model, which produces a better response in fewer tokens", "Raising the temperature", "A bigger context window"], correctAnswer: "Streaming TTS from the first sentence rather than the full response" },
    { id: 2, question: "Why prefer a native vision model over text extraction for a chart?", options: ["Image tokens are cheaper than the text needed to describe the chart", "Converting the chart to text destroys the visual information you needed", "Extraction cannot open PDFs", "Vision models use fewer tokens"], correctAnswer: "Converting the chart to text destroys the visual information you needed" },
    { id: 3, question: "Which is true of images sent to a multimodal model?", options: ["They are inherently safe input", "They never consume tokens", "Text inside an image can carry a prompt injection", "They bypass the context window"], correctAnswer: "Text inside an image can carry a prompt injection" },
    { id: 4, question: "What is the main advantage of a convert-to-text pipeline over a native multimodal call?", options: ["It is always more accurate", "It needs fewer models, so there are fewer moving parts to run", "It removes the need for streaming", "Every stage leaves an artefact you can inspect, log and evaluate"], correctAnswer: "Every stage leaves an artefact you can inspect, log and evaluate" },
    { id: 5, question: "A speech model mishears a product name. What happens downstream?", options: ["Retrieval silently searches for something that does not exist", "The speech model raises a low-confidence error and asks the user to repeat", "The model refuses to answer", "The transcript is discarded"], correctAnswer: "Retrieval silently searches for something that does not exist" },
    { id: 6, question: "Voice-agent teams commonly budget end-to-end response latency at roughly what?", options: ["Under 50ms, matching network round-trip time", "About 800ms to one second", "About 3 seconds, like a web page load", "About 10 seconds, as long as audio is streaming"], correctAnswer: "About 800ms to one second" },
    { id: 7, question: "Your voice pipeline is 350ms over budget. Which stage do you attack first?", options: ["The one you understand best", "The cheapest to change", "The one contributing the most milliseconds", "All of them equally"], correctAnswer: "The one contributing the most milliseconds" },
    { id: 8, question: "What does handling barge-in require?", options: ["A larger context window", "A second model that listens while the first one is speaking", "Disabling streaming", "Cancelling in-flight generation and synthesis immediately"], correctAnswer: "Cancelling in-flight generation and synthesis immediately" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "Pipeline stages take STT 300ms, retrieval 150ms, LLM first token 700ms, TTS first audio 250ms against a 1,000ms budget. Which stage do you cut first?",
        options: [
          "TTS, because audio is what users hear",
          "Retrieval, because it is easiest to cache",
          "All four stages by 100ms each, so no single stage bears the whole cut",
          "The LLM first-token stage — at 700ms it is the largest share of the 400ms overrun",
        ],
        correctAnswer: "The LLM first-token stage — at 700ms it is the largest share of the 400ms overrun",
      },
      {
        kind: 'mcq',
        prompt: "A model streams \"Your order. It shipped yester\" in chunks. When should the first sentence go to TTS?",
        options: [
          "As soon as \"Your order.\" is complete, without waiting for the rest",
          "Only when the whole response has finished",
          "After every token, so audio playback starts at the earliest moment",
          "After a fixed 2-second delay",
        ],
        correctAnswer: "As soon as \"Your order.\" is complete, without waiting for the rest",
      },
      {
        kind: 'mcq',
        prompt: "Warehouse staff ask stock questions in a noisy environment, and every answer must be auditable. Which architecture fits better?",
        options: [
          "A native speech-to-speech model with no intermediate text",
          "A cascade — transcribe, then LLM — so each stage leaves an inspectable artefact",
          "Text-only chat",
          "A vision model reading the shelves",
        ],
        correctAnswer: "A cascade — transcribe, then LLM — so each stage leaves an inspectable artefact",
      },
      {
        kind: 'mcq',
        prompt: "A scanned invoice has a total inside an image. The OCR text says 1,000 but the image shows 7,000. What does this illustrate?",
        options: [
          "Vision models are always wrong about numbers",
          "OCR is always more accurate than vision",
          "Conversion to text can silently lose information; a native vision model reads the image directly",
          "The invoice image is corrupted, so neither OCR nor vision can be trusted",
        ],
        correctAnswer: "Conversion to text can silently lose information; a native vision model reads the image directly",
      },
      {
        kind: 'mcq',
        prompt: "A user starts speaking while the agent is still talking. Nothing stops and the agent keeps playing audio. What is missing?",
        options: [
          "A larger model that can predict when the user wants to interrupt",
          "A longer silence timeout",
          "Higher TTS quality",
          "Barge-in handling that cancels in-flight generation and playback when speech is detected",
        ],
        correctAnswer: "Barge-in handling that cancels in-flight generation and playback when speech is detected",
      },
    ],
  },
};

export default mod_m8;
