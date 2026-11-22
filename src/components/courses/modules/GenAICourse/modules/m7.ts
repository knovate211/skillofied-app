import type { ModuleData } from '../GenAICourseData';

const mod_m7: ModuleData = {
  id: 'm7',
  title: 'MODULE 7: AI AGENTS',
  overview: 'Moving past single-turn answers: tool calling, agent loops, memory, multi-agent systems and the safety rails they need.',
  outcomes: ['Implement function calling and an agent loop', 'Design memory and multi-agent structures', 'Apply least privilege and human-in-the-loop'],
  lessons: [
    {
      id: 'm7-l1',
      title: 'Lesson 7.1 What Makes Something an Agent',
      objectives: [
        'Define an agent by its loop and its side effects.',
        'Explain why autonomy changes the risk profile.',
        'Justify the guards the rest of this module adds.',
      ],
      theory: 'A chatbot takes input and returns text. An agent decides what to do next, acts on that decision using tools, observes the result, and repeats until the task is done or it gives up. The distinguishing feature is the loop with real side effects, not the sophistication of the prompt.\nThat autonomy is also the risk. A chatbot that is wrong produces a bad sentence; an agent that is wrong sends an email, deletes a record or spends money. Every design decision in this module — tool scope, approval gates, iteration caps — exists because the failure mode changed from embarrassing to consequential.\nThat is the whole reason the bar moves. Nobody demands an audit trail for a suggestion, and everybody demands one for an action. Reading the rest of this module as a list of controls on consequences, rather than a list of best practices, makes each one obvious.',
      callout: {
        lead: 'The line that matters:',
        text: 'a wrong chatbot writes a bad sentence. A wrong agent takes a real action. Everything else follows from that.',
      },
      codeExample: `ORDERS = {"A-1": "open", "A-2": "open"}


def chatbot(order_id: str) -> str:
    """Produces text. Changes nothing."""
    return f"You could cancel order {order_id} from the orders page."


def agent(order_id: str) -> str:
    """Takes an action. The world is different afterwards."""
    ORDERS[order_id] = "cancelled"
    return f"cancelled {order_id}"


print(chatbot("A-1"))
print("after chatbot:", ORDERS)
print(agent("A-1"))
print("after agent:  ", ORDERS)`,
      codeOutput: "You could cancel order A-1 from the orders page.\nafter chatbot: {'A-1': 'open', 'A-2': 'open'}\ncancelled A-1\nafter agent:   {'A-1': 'cancelled', 'A-2': 'open'}",
      takeaways: [
        'Agent = decide → act → observe → repeat, with real side effects.',
        'A wrong chatbot writes a bad sentence; a wrong agent takes a bad action.',
        'Every control in this module is a control on consequences, not on prompt quality.',
      ],
    },
    {
      id: 'm7-l2',
      title: 'Lesson 7.2 Tools and Function Calling',
      objectives: [
        'Describe tools with a name, purpose and schema.',
        'Keep execution on your side of the boundary.',
        'Validate arguments as untrusted input.',
      ],
      theory: 'Function calling is how a model reaches outside itself. You describe available functions with a name, a description and a JSON schema of parameters. The model does not execute anything — it returns a structured request naming the function and arguments. Your code validates and runs it, then feeds the result back.\nThat separation is the security boundary and the thing to internalise: the model proposes, your code disposes. Validate every argument as if it came from an untrusted client, because effectively it did. Tool descriptions are also prompt engineering; vague descriptions produce wrong tool choices far more often than model weakness does.\nValidation has to cover three things, and the example checks all three: that the tool exists at all, that each argument has the right type, and that no unexpected arguments slipped in. Skipping the last one is how a well-formed call with an extra field reaches code that was not expecting it.',
      callout: {
        lead: 'The security boundary:',
        text: 'the model proposes, your code disposes. Tool arguments are untrusted input that happens to have arrived from a model.',
      },
      syntax: `TOOLS = [{
    "name": "search_orders",
    "description": "Find orders for a customer. Use when asked about order status or history.",
    "input_schema": {
        "type": "object",
        "properties": {"customer_id": {"type": "string"}, "limit": {"type": "integer"}},
        "required": ["customer_id"],
    },
}]
# The model returns a request; YOUR code validates and executes it.`,
      codeExample: `SCHEMAS = {
    "search_orders": {"customer_id": str, "limit": int},
}


def validate(call: dict) -> tuple[bool, str]:
    name, args = call["name"], call["args"]
    if name not in SCHEMAS:
        return False, f"unknown tool: {name}"
    schema = SCHEMAS[name]
    unexpected = sorted(set(args) - set(schema))
    if unexpected:
        return False, f"unexpected arguments: {unexpected}"
    for key, expected in schema.items():
        if key in args and not isinstance(args[key], expected):
            return False, f"{key} must be {expected.__name__}"
    return True, "ok"


proposals = [
    {"name": "search_orders", "args": {"customer_id": "c-1", "limit": 5}},
    {"name": "search_orders", "args": {"customer_id": "c-1", "limit": "all"}},
    {"name": "search_orders", "args": {"customer_id": "c-1", "admin": True}},
    {"name": "drop_table", "args": {}},
]

for p in proposals:
    print(f"{p['name']:<14}", validate(p))`,
      codeOutput: "search_orders  (True, 'ok')\nsearch_orders  (False, 'limit must be int')\nsearch_orders  (False, \"unexpected arguments: ['admin']\")\ndrop_table     (False, 'unknown tool: drop_table')",
      takeaways: [
        'The model proposes a call; your code validates and executes it.',
        'Treat tool arguments as untrusted input. Write tool descriptions carefully.',
        'Validate three things: the tool exists, types match, and no extra arguments slipped in.',
      ],
    },
    {
      id: 'm7-l3',
      title: 'Lesson 7.3 The Agent Loop',
      objectives: [
        'Implement the decide–act–observe cycle.',
        'Cap iterations so a confused agent cannot run away.',
        'Return tool errors as observations rather than crashing.',
      ],
      theory: 'The loop is: send the conversation and tool definitions to the model; if it returns a tool call, execute it and append the result as a new message; repeat. When it returns plain text instead of a tool call, that is the final answer. This pattern of interleaving reasoning and action is often called ReAct.\nTwo guards are mandatory rather than optional. Cap the number of iterations, because a confused agent will loop indefinitely and bill you for it. Handle tool errors by returning the error text to the model as an observation instead of crashing — a good agent recovers from a failed call by trying something else, and it cannot do that if your process died.\nThe second guard is the counter-intuitive one. Your instinct as an engineer is to let the exception propagate; here, swallowing it into the transcript is correct, because the model is the error handler. It reads "error: upstream timeout" and tries a different approach, which is exactly what you wanted.',
      callout: {
        lead: 'The counter-intuitive bit:',
        text: 'feed tool errors back to the model instead of raising. The model is your error handler — it cannot recover from a dead process.',
      },
      syntax: `for step in range(MAX_STEPS):            # never an unbounded loop
    resp = model(messages, tools=TOOLS)
    if not resp.tool_call:
        return resp.text                  # final answer
    try:
        result = dispatch(resp.tool_call)
    except Exception as e:
        result = f"error: {e}"            # observation, not a crash
    messages.append(tool_result(result))
return "Stopped: step limit reached."`,
      codeExample: `def add(a: int, b: int) -> int:
    return a + b


def fail(**_) -> str:
    raise RuntimeError("upstream timeout")


TOOLS = {"add": add, "fail": fail}


def run_agent(script: list[dict], tools: dict, max_steps: int) -> dict:
    """A scripted 'model' so the loop is visible without a network call."""
    trace: list[str] = []
    for step in range(max_steps):
        if step >= len(script):
            break
        action = script[step]
        if "final" in action:
            return {"answer": action["final"], "trace": trace}
        try:
            trace.append(f"ok: {tools[action['tool']](**action['args'])}")
        except Exception as e:
            trace.append(f"error: {e}")        # observation, not a crash
    return {"answer": "Stopped: step limit reached.", "trace": trace}


print(run_agent([{"tool": "add", "args": {"a": 2, "b": 3}}, {"final": "The total is 5."}], TOOLS, 5))
print(run_agent([{"tool": "fail", "args": {}}, {"final": "Recovered."}], TOOLS, 5))
print(run_agent([{"tool": "add", "args": {"a": 1, "b": 1}}] * 10, TOOLS, 3))`,
      codeOutput: "{'answer': 'The total is 5.', 'trace': ['ok: 5']}\n{'answer': 'Recovered.', 'trace': ['error: upstream timeout']}\n{'answer': 'Stopped: step limit reached.', 'trace': ['ok: 2', 'ok: 2', 'ok: 2']}",
      takeaways: [
        'Always cap iterations — a confused agent loops and bills you.',
        'Feed tool errors back as observations so the agent can recover.',
        'The loop ends when the model returns text instead of a tool call.',
      ],
    },
    {
      id: 'm7-l4',
      title: 'Lesson 7.4 Memory',
      objectives: [
        'Explain why the model itself is stateless.',
        'Fit a growing conversation into a fixed window.',
        'Decide what deserves long-term storage.',
      ],
      theory: 'The model itself is stateless: every call resends the entire conversation. Short-term memory is therefore just the message list, bounded by the context window, and once the conversation outgrows the window you must summarise older turns or drop them.\nLong-term memory means storing facts outside the conversation and retrieving them when relevant — which is RAG applied to user history rather than documents. Be deliberate about what is worth remembering; storing every message and retrieving semantically similar ones tends to surface noise. Stable preferences and decisions are worth persisting, small talk is not.\nDropping the oldest turns is the easy implementation and the one that quietly breaks conversations, because the earliest turn is often where the user said what they actually wanted. Summarise what you evict rather than discarding it, and the later turns keep their referent.',
      callout: {
        lead: 'The quiet failure:',
        text: 'the oldest turn is usually where the user said what they wanted. Summarise what you evict — do not just drop it.',
      },
      codeExample: `BUDGET = 30


def tokens(text: str) -> int:
    return max(1, len(text) // 4)


history = [
    ("user", "hi"),
    ("assistant", "Hello, how can I help?"),
    ("user", "I want to return a laptop bought in March"),
    ("assistant", "Returns are accepted within 30 days of purchase."),
    ("user", "what about the charger that came with it"),
]


def fit(turns: list[tuple], budget: int) -> tuple[list, list, int]:
    kept, used = [], 0
    for role, text in reversed(turns):        # newest first
        cost = tokens(text)
        if used + cost > budget:
            break
        kept.append((role, text))
        used += cost
    kept.reverse()
    return kept, turns[: len(turns) - len(kept)], used


kept, evicted, used = fit(history, BUDGET)
print(f"kept {len(kept)} of {len(history)} turns, {used}/{BUDGET} tokens")
for role, text in kept:
    print(f"  {role:<10}{text}")
print("\\nevicted (summarise these, do not drop them):")
for role, text in evicted:
    print(f"  {role:<10}{text}")`,
      codeOutput: 'kept 2 of 5 turns, 22/30 tokens\n  assistant Returns are accepted within 30 days of purchase.\n  user      what about the charger that came with it\n\nevicted (summarise these, do not drop them):\n  user      hi\n  assistant Hello, how can I help?\n  user      I want to return a laptop bought in March',
      takeaways: [
        'The model is stateless; short-term memory is the message list you resend.',
        'Long-term memory is RAG over user history — store facts, not every message.',
        'Summarise evicted turns; the oldest turn often holds the actual request.',
      ],
    },
    {
      id: 'm7-l5',
      title: 'Lesson 7.5 Multi-Agent Systems',
      objectives: [
        'Explain why tool selection degrades with scale.',
        'Apply the supervisor and specialist pattern.',
        'Weigh the real cost of extra agents.',
      ],
      theory: 'When a task spans distinct skills, one agent with twenty tools becomes unreliable — tool selection degrades as the list grows. The supervisor pattern puts a coordinator in front of specialists, each with a narrow toolset, routing subtasks and assembling results.\nBe honest about the cost. Every additional agent adds latency, tokens and failure surface, and errors compound across handoffs. Most problems presented as multi-agent are better solved by one well-scoped agent with good tools. Reach for multiple agents when the subtasks are genuinely independent and parallelisable, or when the toolsets are so different that one prompt cannot describe them coherently.\nThe arithmetic in the example is the honest version of the trade. Routing turns one nine-way choice into a three-way choice followed by another three-way choice — easier decisions, but two model calls instead of one, and a routing mistake sends the whole request to the wrong specialist.',
      callout: {
        lead: 'Be honest about the trade:',
        text: 'routing replaces one hard choice with two easy ones — and adds a call, latency, and a new way to be wrong.',
      },
      codeExample: `SPECIALISTS = {
    "orders":  ["search_orders", "cancel_order", "track_shipment"],
    "billing": ["get_invoice", "issue_refund", "update_card"],
    "account": ["reset_password", "change_email", "close_account"],
}

flat = [t for tools in SPECIALISTS.values() for t in tools]

print(f"single agent: one {len(flat)}-way tool choice")
print(f"supervisor:   one {len(SPECIALISTS)}-way routing choice, then...")
for name, tools in SPECIALISTS.items():
    print(f"                {name:<8} a {len(tools)}-way choice")

print("\\ncost: 2 model calls instead of 1, and a routing mistake misdirects everything")`,
      codeOutput: 'single agent: one 9-way tool choice\nsupervisor:   one 3-way routing choice, then...\n                orders   a 3-way choice\n                billing  a 3-way choice\n                account  a 3-way choice\n\ncost: 2 model calls instead of 1, and a routing mistake misdirects everything',
      takeaways: [
        'Supervisor + narrow specialists beats one agent with twenty tools.',
        'Multi-agent adds latency and compounding errors — justify it before adopting it.',
        'Routing does not remove the hard decision; it moves it to the supervisor.',
      ],
    },
    {
      id: 'm7-l6',
      title: 'Lesson 7.6 Safety and Human-in-the-Loop',
      objectives: [
        'Apply least privilege to tools and credentials.',
        'Gate irreversible actions behind human approval.',
        'Log every tool call for audit.',
      ],
      theory: 'Agent safety is an architecture problem, not a prompting problem. Apply least privilege: give each agent the narrowest tools and credentials that let it do its job, and prefer read-only access wherever the task allows. An agent that cannot delete cannot be talked into deleting.\nRequire explicit human approval for anything irreversible or externally visible — sending messages, moving money, changing production data. Log every tool call with its arguments and result so behaviour is auditable after the fact. Combined with the injection risks from Module 4, the guiding assumption is that the model can be manipulated, so design so that manipulation cannot cause serious harm.\nThe useful mental test is to ask what the worst plausible outcome is if the agent were fully controlled by an attacker. If the answer is "it reads some documents it was already allowed to read", you have designed it well. If the answer involves money or deletion, you need a gate.',
      callout: {
        lead: 'The test to apply:',
        text: 'if an attacker fully controlled this agent, what is the worst it could do? That answer is your real security posture.',
      },
      codeExample: `IRREVERSIBLE = {"issue_refund", "close_account", "send_email"}
APPROVED: set[str] = {"issue_refund"}          # a human clicked approve

audit: list[str] = []


def execute(tool: str, args: dict) -> str:
    if tool in IRREVERSIBLE and tool not in APPROVED:
        outcome = "HELD for human approval"
    else:
        outcome = "executed"
    audit.append(f"{tool}({args}) -> {outcome}")
    return f"{outcome}: {tool}"


print(execute("search_orders", {"customer_id": "c-1"}))
print(execute("issue_refund", {"amount": 40}))
print(execute("close_account", {"id": "c-1"}))

print("\\naudit trail:")
for line in audit:
    print(" ", line)`,
      codeOutput: "executed: search_orders\nexecuted: issue_refund\nHELD for human approval: close_account\n\naudit trail:\n  search_orders({'customer_id': 'c-1'}) -> executed\n  issue_refund({'amount': 40}) -> executed\n  close_account({'id': 'c-1'}) -> HELD for human approval",
      takeaways: [
        'Least privilege and read-only by default; approval gates for irreversible actions.',
        'Log every tool call with arguments — agents need an audit trail.',
        'Design for the case where an attacker controls the agent completely.',
      ],
    },
  ],
  quiz: [
    { id: 1, question: "When a model makes a function call, what actually executes it?", options: ["Your application code, after validating the arguments", "The model, inside the provider", "The vector database", "The provider, which calls your endpoint using the tool schema"], correctAnswer: "Your application code, after validating the arguments" },
    { id: 2, question: "Why must an agent loop have an iteration cap?", options: ["Providers reject agent sessions that do not declare an iteration cap", "A confused agent will loop indefinitely and keep billing you", "It improves answer quality", "It reduces the context window"], correctAnswer: "A confused agent will loop indefinitely and keep billing you" },
    { id: 3, question: "A tool call raises an exception. What should the agent loop do?", options: ["Crash the request so the error is surfaced to the user immediately", "Retry the identical call forever", "Return the error to the model as an observation so it can recover", "Silently skip it and answer anyway"], correctAnswer: "Return the error to the model as an observation so it can recover" },
    { id: 4, question: "What distinguishes an agent from a chatbot?", options: ["A longer system prompt", "A larger model that can plan multi-step answers in one reply", "Access to a vector database", "A loop that takes actions with real side effects"], correctAnswer: "A loop that takes actions with real side effects" },
    { id: 5, question: "How does the agent loop know it has finished?", options: ["The model returns plain text instead of a tool call", "The iteration cap is reached", "Every tool has been called once", "The context window fills and the provider ends the session"], correctAnswer: "The model returns plain text instead of a tool call" },
    { id: 6, question: "Why does one agent with twenty tools become unreliable?", options: ["Providers cap tool counts", "Tool-selection accuracy degrades as the list grows", "The tools time out", "Tool schemas start to conflict once there are more than ten"], correctAnswer: "Tool-selection accuracy degrades as the list grows" },
    { id: 7, question: "Which is the strongest defence against an agent being manipulated into deleting data?", options: ["A firmer system prompt", "A higher temperature", "Not giving it a delete tool at all", "More few-shot examples"], correctAnswer: "Not giving it a delete tool at all" },
    { id: 8, question: "A conversation outgrows the context window. What is the right handling?", options: ["Drop the oldest turns silently", "Truncate the newest turns", "Switch to a larger model", "Summarise the evicted turns and keep the summary"], correctAnswer: "Summarise the evicted turns and keep the summary" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'mcq',
        prompt: "A scripted agent keeps calling search with the same query and never answers. What must the loop have?",
        options: [
          "A higher temperature",
          "More tools, so it can find a different way to get the answer",
          "A maximum step count that ends the run with a clear error",
          "A larger context window",
        ],
        correctAnswer: "A maximum step count that ends the run with a clear error",
      },
      {
        kind: 'mcq',
        prompt: "The model requests a tool called drop_table, which has a schema but is not on this agent's allow-list. What should happen?",
        options: [
          "Execute it, since a schema exists",
          "Execute it but log a warning, since a schema means it was intended",
          "Ask the model whether it is sure",
          "Reject the call — the allow-list decides, not the existence of a schema",
        ],
        correctAnswer: "Reject the call — the allow-list decides, not the existence of a schema",
      },
      {
        kind: 'mcq',
        prompt: "A tool call arrives with a required argument missing. What is the right response?",
        options: [
          "Reject it without executing and return the validation error to the model as an observation",
          "Fill in a default and execute",
          "Fill in the missing argument from the conversation history, then execute and log it",
          "Retry the identical call",
        ],
        correctAnswer: "Reject it without executing and return the validation error to the model as an observation",
      },
      {
        kind: 'mcq',
        prompt: "An agent can refund customer orders. Which safeguard matters most?",
        options: [
          "A system prompt telling it to be careful with refunds",
          "Require human approval above a threshold and keep an audit trail of every call",
          "Using a larger model",
          "Giving it read-only access to the orders table as well",
        ],
        correctAnswer: "Require human approval above a threshold and keep an audit trail of every call",
      },
      {
        kind: 'mcq',
        prompt: "When is splitting one agent into several specialist agents actually justified?",
        options: [
          "Always — more agents are more capable",
          "Whenever latency needs to drop, since agents run in parallel by default",
          "When one agent's toolset is too large to select reliably and the subtasks are genuinely separable",
          "When the prompt is longer than 1,000 tokens",
        ],
        correctAnswer: "When one agent's toolset is too large to select reliably and the subtasks are genuinely separable",
      },
    ],
  },
};

export default mod_m7;
