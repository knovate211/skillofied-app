import { MarketingLesson } from '../types';

/**
 * AI SEO & Search Visibility — course overview lessons.
 *
 * The course teaches optimisation for AI answer engines (ChatGPT, Google AI
 * Overviews, Gemini, Perplexity, Claude, Grok) alongside classic search, since
 * the two share the same foundations.
 */
export const aiOverviewLessons: Record<string, MarketingLesson> = {
  "overview-welcome": {
    title: "Welcome to AI SEO",
    objective: "understand what AI SEO is, what it is not, and how this course is structured.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "For twenty years, being found online meant one thing: appear in a list of blue links. Today many people ask a question and read one written answer instead. That answer may name a few sources, or none at all." },
      { type: "text", value: "Think of it like asking for directions. The old way was a noticeboard covered in adverts: you read the board and chose. The new way is asking a local person who has read the whole board for you. AI SEO is the work of making sure that person knows about your business, trusts what it knows, and says your name." },
      { type: "text", value: "This course teaches how to be found, understood and quoted by AI answer engines: ChatGPT, Google AI Overviews, Gemini, Perplexity, Claude and Grok. It also teaches classic search optimisation, because the two are not separate jobs. Most AI answers are built from live web search results, so a page search engines cannot find is a page an assistant cannot quote." },
      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["SEO", "Search engine optimisation. Work that helps a page appear in search results."],
        ["AI answer engine", "A tool that answers a question in written sentences instead of only listing links."],
        ["LLM", "Large language model. The kind of program behind ChatGPT, Gemini, Claude and Grok."],
        ["GEO", "Generative engine optimisation. An industry name for optimising to appear in AI-generated answers."],
        ["AEO", "Answer engine optimisation. Another industry name for the same broad goal, focused on direct answers."],
        ["Citation", "A source link or name that an AI answer shows to say where its information came from."],
        ["Retrieval", "The step where an assistant searches the live web before writing its answer."],
        ["Organic traffic", "Visitors who arrive without you paying for the click."],
      ] },
      { type: "alert", value: "GEO, AEO and 'LLM SEO' are names invented by the marketing industry, not official programmes run by AI companies. There is no application form and no ranking dashboard. Treat anyone promising guaranteed placement in AI answers with suspicion." },
      { type: "heading", value: "What this course covers" },
      { type: "list", ordered: true, items: [
        "How AI search actually works, and what GEO, AEO and LLM SEO really mean.",
        "Writing and structuring a page so an assistant can lift a clear answer from it.",
        "Auditing what AI tools currently say about you, and fixing the pages they rely on.",
        "Crawlability: which AI crawlers exist, what each one does, and how robots.txt and llms.txt fit in.",
        "Reputation: E-E-A-T, being a consistent entity across the web, and earning honest mentions.",
        "Digital PR: press releases and outreach that put your facts on the record.",
        "Using AI tools for technical SEO work — schema, internal links, page speed — without shipping rubbish.",
        "Measuring AI visibility over time, and the ethics and limits of the whole field.",
      ] },
      { type: "heading", value: "What makes AI SEO different" },
      { type: "compare", columns: [
        { title: "Classic search", subtitle: "A list of links", tone: "honey", items: [
          "The reader chooses which result to open.",
          "You can check your position for a keyword.",
          "Ten results share the page.",
          "Click-through depends on your title and description.",
        ] },
        { title: "AI answers", subtitle: "One written reply", tone: "olive", items: [
          "The assistant chooses, summarises, and may name only two or three sources.",
          "There is no fixed position to check; answers vary between people and between attempts.",
          "Being unmentioned is the common outcome, not position eleven.",
          "Being quoted depends on being clear, specific and trusted.",
        ] },
      ] },
      { type: "warning", value: "Common beginner mistakes: (1) Believing AI SEO replaces SEO — most assistants search the web, so the basics still decide what they can find. (2) Asking a chatbot once, seeing your name, and calling it a ranking. (3) Blocking AI crawlers to 'protect' content, then wondering why no assistant cites you. (4) Buying a tool before fixing the pages. (5) Expecting results in days." },
      { type: "heading", value: "How you will be assessed" },
      { type: "text", value: "Each module ends with a quiz on the ideas and an assignment you complete in the editor: real files such as robots.txt, llms.txt, JSON-LD markup, a press release, and small scripts that check your work. The assignments build up into one complete AI visibility plan for a single website." },
      { type: "alert", value: "Pick one real website now and use it for every assignment: your own site, a friend's business, or a small local business. The examples in this course follow two small businesses — Rosie's Bakery in Bristol and StepRight Shoes in Leeds — so you always have a model to copy." },
      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why does classic SEO still matter for AI answers? (Most assistants search the live web, so pages that cannot be found cannot be quoted.)",
        "Is GEO an official Google or OpenAI programme? (No. It is an industry term.)",
        "Why is asking ChatGPT about your brand once a weak test? (Answers vary between runs and users, and models can invent details.)",
      ] },
    ],
    takeaways: [
      "AI SEO means being found, understood and quoted by AI answer engines.",
      "Most AI answers are built from live search results, so classic SEO still decides what is findable.",
      "GEO, AEO and LLM SEO are industry names, not official programmes.",
      "There are no rankings to check: answers vary, so you measure by sampling many times.",
      "Nobody can guarantee placement in an AI answer.",
    ],
  },

  "overview-outcomes": {
    title: "Learning Outcomes",
    objective: "know exactly what you will be able to do by the end of the course.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "By the end of this course you will be able to take one real website and do the full job: find out what AI tools say about it today, fix what they read, earn the mentions that back it up, and measure whether any of it worked." },
      { type: "heading", value: "Specific capabilities" },
      { type: "list", ordered: true, items: [
        "Explain how an AI assistant produces an answer, and tell the difference between what it memorised during training and what it just fetched from the web.",
        "Run a repeatable audit of what several AI tools say about a business, and record the results as evidence rather than a one-off screenshot.",
        "Restructure a page so the answer comes first, in the words people actually ask.",
        "Write and validate JSON-LD structured data that matches what the page visibly says.",
        "Write a robots.txt that makes deliberate choices about each AI crawler, and explain the trade-off for each one.",
        "Write an llms.txt file, and explain honestly what it is and is not likely to do.",
        "Apply E-E-A-T thinking to a site, and build a consistent entity across profiles and directories.",
        "Write a press release and an outreach pitch that a real journalist might use.",
        "Use AI tools to speed up technical SEO work while catching the errors they introduce.",
        "Track AI visibility over time with repeat sampling, and report it without overclaiming.",
      ] },
      { type: "heading", value: "The eight modules" },
      { type: "table", headers: ["Module", "What you build"], rows: [
        ["1. AI search foundations", "A clear mental model of how answers are produced, and an audit of one page."],
        ["2. Optimising a page for AI answers", "One rewritten page that serves AI answers and classic search at once."],
        ["3. Training AI to find and cite you", "An evidence log of what assistants say, and rewritten about, contact and source pages."],
        ["4. Crawlability for AI crawlers", "A deliberate robots.txt and an llms.txt for your site."],
        ["5. Reputation: E-E-A-T and entity authority", "Organization markup, consistent profiles, and a mentions plan."],
        ["6. Digital PR", "A finished press release and a short outreach list."],
        ["7. AI-assisted technical SEO", "Schema, an internal link plan and a speed pass, done with AI help and human review."],
        ["8. Measuring AI visibility", "A sampling tracker and an honest report of what changed."],
      ] },
      { type: "heading", value: "What this course will not do" },
      { type: "list", items: [
        "Promise that ChatGPT will recommend you. No one can promise that.",
        "Teach fake reviews, fake accounts or hidden paid posts. These break platform rules and, for reviews, the law in the UK and elsewhere.",
        "Sell you a tool. Tools are named only as neutral examples of a category.",
        "Pretend the field is settled. Crawler names, features and guidance change often, so the course teaches you how to check rather than what to memorise.",
      ] },
      { type: "alert", value: "Expect slow feedback. Changing a page changes what assistants can retrieve within days or weeks, but changing what a model has absorbed about you takes far longer and depends on other people writing about you." },
      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Choose the one website you will use for every assignment in this course.",
        "Open a spreadsheet and create three columns: Date, Prompt, What the AI said.",
        "Ask two different AI assistants the same question a customer would ask, for example 'best gluten-free birthday cakes in Bristol'.",
        "Record both answers word for word, and note whether your site was mentioned or cited.",
        "Repeat the same prompt once more in a fresh chat and note whether the answer changed.",
      ] },
      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why record the answer twice in separate chats? (Answers vary run to run, so one sample proves nothing.)",
        "Which takes longer to change: what an assistant retrieves, or what a model absorbed? (What the model absorbed.)",
        "Why does this course avoid recommending specific paid tools? (The category matters; the vendors change, and a course should not be an advert.)",
      ] },
    ],
    takeaways: [
      "You will run a complete AI visibility project on one real site.",
      "Assignments produce real files: robots.txt, llms.txt, JSON-LD, a press release and a tracker.",
      "Measurement means repeat sampling, not a single screenshot.",
      "No guarantees, no fake reviews, no vendor sales pitches.",
      "The field moves fast, so the course teaches how to verify current guidance.",
    ],
  },
};
