import { MarketingCourseContent } from './types';
import { overviewAndModule1Lessons } from './digitalMarketing/overviewAndModule1';
import { modules2And3Lessons } from './digitalMarketing/modules2And3';
import { modules4And5Lessons } from './digitalMarketing/modules4And5';

/**
 * Digital Marketing Strategy — full course content.
 *
 * Module and lesson titles follow the published syllabus shown on the course
 * landing page (CoursePlaceholderPage).
 */
export const digitalMarketingContent: MarketingCourseContent = {
  lessons: {
    ...overviewAndModule1Lessons,
    ...modules2And3Lessons,
    ...modules4And5Lessons,
  },

  quizzes: {
    'dm-m1-quiz': [
      { id: 1, question: 'A site has high traffic but very few sales. What does the funnel tell you?', options: ['It is a conversion problem, so more traffic will not help', 'It is an awareness problem, so buy more ads', 'The product is priced wrongly', 'The site needs more social followers'], correctAnswer: 'It is a conversion problem, so more traffic will not help' },
      { id: 2, question: 'What should a persona be built from?', options: ["Demographic assumptions and a stock photo", "Customer interviews, support tickets and reviews", "Competitor marketing materials", "The founder's intuition"], correctAnswer: "Customer interviews, support tickets and reviews" },
      { id: 3, question: 'What is the test for whether a segment is useful?', options: ["Whether it contains at least 1,000 people", "Whether it is based on age", "Whether the split changes what you would actually do", "Whether the platform supports it"], correctAnswer: "Whether the split changes what you would actually do" },
      { id: 4, question: 'What is the key difference between paid search and paid social?', options: ["Search is free; social is paid", "Search only works for B2B", "Social converts faster than search", "Search captures existing demand; social creates it"], correctAnswer: "Search captures existing demand; social creates it" },
      { id: 5, question: 'Why is building an owned channel important?', options: ['Rented reach can be withdrawn by a platform without notice', 'Owned channels are cheaper to set up', 'Search engines rank owned channels higher', 'It is legally required'], correctAnswer: 'Rented reach can be withdrawn by a platform without notice' },
    ],
    'dm-m2-quiz': [
      { id: 1, question: 'What is the usual reason social accounts fail?', options: ["Not posting enough hashtags", "Inconsistency rather than content quality", "Posting at the wrong time of day", "Not buying followers"], correctAnswer: "Inconsistency rather than content quality" },
      { id: 2, question: 'What do content pillars solve?', options: ["The need for a paid budget", "Algorithm penalties", "The blank-page problem — you never decide what to post from nothing", "Algorithm penalties for posting on inconsistent topics"], correctAnswer: "The blank-page problem — you never decide what to post from nothing" },
      { id: 3, question: 'What do social algorithms ultimately optimise for?', options: ["Rewarding accounts that post most often", "Promoting paying advertisers organically", "Showing the newest content first", "Keeping people on the platform"], correctAnswer: "Keeping people on the platform" },
      { id: 4, question: 'Why is engagement bait a bad tactic?', options: ["It is demoted by platforms and erodes audience trust", "It is illegal in most countries", "It costs more than normal posts", "It only works on LinkedIn and is ignored by other platforms"], correctAnswer: 'It is demoted by platforms and erodes audience trust' },
      { id: 5, question: 'What is the usual result of deleting legitimate public criticism?', options: ["The complaint is forgotten", "It escalates — the deletion becomes the story", "The algorithm boosts your next post", "Nothing measurable happens"], correctAnswer: "It escalates — the deletion becomes the story" },
    ],
    'dm-m3-quiz': [
      { id: 1, question: 'Why should one ad group cover only one theme?', options: ["Because Google limits keywords per ad group", "To reduce the daily budget", "So the ad copy and landing page can closely match the query", "To avoid duplicate content penalties"], correctAnswer: "So the ad copy and landing page can closely match the query" },
      { id: 2, question: 'Where does most wasted search-ad spend hide?', options: ["In the account setup fee", "In weekend and late-night impressions nobody acts on", "In the display network only", "In queries that should have been excluded by negative keywords"], correctAnswer: "In queries that should have been excluded by negative keywords" },
      { id: 3, question: 'What is the largest lever in paid social performance?', options: ['The creative', 'The targeting', 'The daily budget', 'The bid strategy'], correctAnswer: 'The creative' },
      { id: 4, question: 'LTV should be calculated on which figure?', options: ["Total revenue", "Gross margin", "Order count", "Ad spend"], correctAnswer: "Gross margin" },
      { id: 5, question: 'Why start with manual bidding on a new campaign?', options: ["Manual bidding is always cheaper", "Automated bidding is deprecated", "Automated strategies need conversion volume to learn from", "Manual bidding guarantees position one"], correctAnswer: "Automated strategies need conversion volume to learn from" },
    ],
    'dm-m4-quiz': [
      { id: 1, question: 'Why is email described as the only channel you own?', options: ["It cannot be marked as spam once someone has subscribed", "It cannot be marked as spam", "It has the highest open rate of any channel", "No algorithm decides whether your message is delivered to your list"], correctAnswer: "No algorithm decides whether your message is delivered to your list" },
      { id: 2, question: 'What makes a lead magnet effective?', options: ['Solving one specific problem with immediate value', 'Being as long and comprehensive as possible', 'Covering a broad topic to attract everyone', 'Being unrelated to the product so it appeals widely'], correctAnswer: 'Solving one specific problem with immediate value' },
      { id: 3, question: 'What is the effect of sending to a bought list?', options: ["No effect, as long as every address on the list is valid", "Spam complaints that degrade deliverability for your genuine subscribers too", "No effect if the addresses are valid", "Improved sender reputation from higher volume"], correctAnswer: "Spam complaints that degrade deliverability for your genuine subscribers too" },
      { id: 4, question: 'Which automation is usually the highest-return in e-commerce?', options: ["Monthly newsletter", "Birthday email", "Abandoned cart", "Annual survey"], correctAnswer: "Abandoned cart" },
      { id: 5, question: 'Why should the first abandoned-cart email avoid a discount?', options: ["Discounts are not permitted in automated email", "It reduces the open rate", "It breaches consumer protection law", "It teaches customers to abandon carts deliberately to get one"], correctAnswer: "It teaches customers to abandon carts deliberately to get one" },
    ],
    'dm-m5-quiz': [
      { id: 1, question: 'Which cause of poor conversion cannot be fixed by changing the page?', options: ["Wrong traffic — a targeting or message-match problem", "Unclear value proposition", "Too much form friction that stops visitors completing it", "Insufficient trust signals"], correctAnswer: 'Wrong traffic — a targeting or message-match problem' },
      { id: 2, question: 'What is the most common and damaging A/B testing error?', options: ["Running the test for a full week", "Stopping the test as soon as it looks significant", "Calculating sample size in advance", "Testing only one variable"], correctAnswer: "Stopping the test as soon as it looks significant" },
      { id: 3, question: 'What should a small site with low conversion volume do instead of A/B testing?', options: ["Run the test anyway and report the result", "Stop optimising entirely", "Use qualitative evidence and judge changes on trend", "Test many variables at once to save time"], correctAnswer: "Use qualitative evidence and judge changes on trend" },
      { id: 4, question: 'What does a rage click indicate?', options: ["Strong interest in the product", "A slow internet connection", "A bot visiting the page", "An unresponsive or broken element"], correctAnswer: "An unresponsive or broken element" },
      { id: 5, question: 'What is required when using session recording?', options: ["Mask sensitive inputs and disclose it — the recordings are personal data", "Nothing, since no names are captured", "Written consent from every visitor by post", "Nothing, since recordings contain no names or email addresses"], correctAnswer: 'Mask sensitive inputs and disclose it — the recordings are personal data' },
    ],
  },

  assignments: {
    'dm-m1-assignment': {
      title: 'Funnel & Persona Map',
      questions: [
        {
          kind: 'code',
          prompt: 'Compute the step-by-step conversion rates down the funnel, find the worst step, and report the end-to-end rate. The worst step is where the next pound of budget goes — the biggest absolute drop is usually not it.',
          language: 'javascript',
          starterCode: `const FUNNEL = [
  { stage: 'Reach',  n: 48000 },
  { stage: 'Visit',  n: 6200 },
  { stage: 'Signup', n: 940 },
  { stage: 'Trial',  n: 610 },
  { stage: 'Paid',   n: 88 },
];

// TODO: for each consecutive pair print '<from> -> <to>: <rate>%'
// with the rate to one decimal place.
// Then print 'worst step: <from> -> <to> at <rate>%'
// and 'end to end: <rate>%' to two decimal places.`,
          examples: [
            { input: 'None', output: 'Reach -> Visit: 12.9%\\nVisit -> Signup: 15.2%\\nSignup -> Trial: 64.9%\\nTrial -> Paid: 14.4%\\nworst step: Reach -> Visit at 12.9%\\nend to end: 0.18%', explanation: 'Reach -> Visit loses the most people, but Trial -> Paid is nearly as leaky and far cheaper to fix.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'A segment is only real if it changes the message. Write the rules that place each user in exactly one segment, and print the resulting sizes — a segment of one is not a segment.',
          language: 'javascript',
          starterCode: `const USERS = [
  { id: 'u1', plan: 'free', sessions: 22, lastSeenDays: 2 },
  { id: 'u2', plan: 'paid', sessions: 40, lastSeenDays: 1 },
  { id: 'u3', plan: 'paid', sessions: 3,  lastSeenDays: 45 },
  { id: 'u4', plan: 'free', sessions: 1,  lastSeenDays: 90 },
  { id: 'u5', plan: 'free', sessions: 18, lastSeenDays: 3 },
];

function segment(user) {
  // TODO, checked in this order:
  //   gone more than 30 days -> 'at-risk' if paid, else 'dormant'
  //   paid                   -> 'advocate'
  //   free with 10+ sessions -> 'power-free'
  //   otherwise              -> 'casual'
}

// TODO: print '<id>: <segment>' for each user, then the counts as JSON
// with the keys sorted alphabetically.`,
          examples: [
            { input: 'None', output: 'u1: power-free\\nu2: advocate\\nu3: at-risk\\nu4: dormant\\nu5: power-free\\n{"advocate":1,"at-risk":1,"dormant":1,"power-free":2}', explanation: 'A lapsed paying customer and a lapsed free user need opposite emails — that is why they split.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'A persona built from invention is a liability. Tag each claim with its source, and print the ones you would have to delete before this persona goes anywhere near a campaign brief.',
          language: 'javascript',
          starterCode: `const CLAIMS = [
  { claim: 'Mostly aged 25-34',                 source: 'ga4 demographics' },
  { claim: 'Prefers WhatsApp over email',       source: null },
  { claim: 'Buys after 3 visits on average',    source: 'crm export' },
  { claim: 'Cares deeply about sustainability', source: null },
];

// TODO: print '[evidence: <source>] <claim>' or '[UNSOURCED] <claim>' for each,
// then 'supported: <n>/<total>'
// then 'drop before shipping: <unsourced claims joined by "; ">' `,
          examples: [
            { input: 'None', output: '[evidence: ga4 demographics] Mostly aged 25-34\\n[UNSOURCED] Prefers WhatsApp over email\\n[evidence: crm export] Buys after 3 visits on average\\n[UNSOURCED] Cares deeply about sustainability\\nsupported: 2/4\\ndrop before shipping: Prefers WhatsApp over email; Cares deeply about sustainability', explanation: 'Half the persona is made up — and the made-up half is the part people build campaigns on.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Map the activities onto funnel stages and find the imbalance. An unserved stage is a hole; an over-served one is where the budget is piling up because it is the easiest thing to buy.',
          language: 'javascript',
          starterCode: `const STAGES = ['awareness', 'consideration', 'conversion', 'retention'];

const ACTIVITIES = [
  { name: 'Instagram reels',  stage: 'awareness' },
  { name: 'SEO blog',         stage: 'awareness' },
  { name: 'Paid search',      stage: 'conversion' },
  { name: 'Comparison page',  stage: 'consideration' },
  { name: 'Retargeting',      stage: 'consideration' },
  { name: 'Podcast ads',      stage: 'awareness' },
];

// TODO: print '<stage>: <count>' in STAGES order,
// then 'unserved: <stages with zero, comma separated>'
// then 'over-served: <stages above the average per stage>' `,
          examples: [
            { input: 'None', output: 'awareness: 3\\nconsideration: 2\\nconversion: 1\\nretention: 0\\nunserved: retention\\nover-served: awareness, consideration', explanation: 'Nothing at all serves retention, which is where the cheapest revenue in the business lives.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the persona as the artifact, not the caricature. Every field carries the source it came from, and anything you cannot source goes in the "assumptions to test" list instead of being asserted as fact.',
          language: 'json',
          runnable: false,
          starterCode: `{
  "persona": "TODO: a role, not a first name and a stock photo",
  "based_on": {
    "sample_size": 0,
    "sources": ["TODO: ga4, crm export, N customer interviews"]
  },
  "attributes": [
    {
      "field": "age_range",
      "value": "25-34",
      "source": "ga4 demographics",
      "confidence": "high"
    }
  ],
  "jobs_to_be_done": ["TODO"],
  "objections": ["TODO: the reason they do not buy, in their words"],
  "assumptions_to_test": [
    { "assumption": "TODO", "how_we_would_test_it": "TODO" }
  ]
}`,
        },
      ],
    },
    'dm-m2-assignment': {
      title: 'Content Strategy',
      questions: [
        {
          kind: 'code',
          prompt: 'Check the calendar against the pillars before it ships. A pillar with no posts is a stated strategy nobody is executing, and a pillar over 40% is the calendar quietly turning into a product feed.',
          language: 'javascript',
          starterCode: `const PILLARS = ['education', 'proof', 'product', 'community'];

const CALENDAR = [
  { day: 1, pillar: 'education' }, { day: 2, pillar: 'product' },
  { day: 3, pillar: 'education' }, { day: 4, pillar: 'product' },
  { day: 5, pillar: 'education' }, { day: 6, pillar: 'proof' },
  { day: 7, pillar: 'product' },   { day: 8, pillar: 'product' },
];

// TODO: print '<pillar>: <count> (<percent>%)' in PILLARS order, rounding,
// then 'missing: <pillars with no posts>'
// then 'balanced: <true|false>' — balanced when no pillar exceeds 40%.`,
          examples: [
            { input: 'None', output: 'education: 3 (38%)\\nproof: 1 (13%)\\nproduct: 4 (50%)\\ncommunity: 0 (0%)\\nmissing: community\\nbalanced: false', explanation: 'Half the calendar is product and nothing at all is community — the strategy document says otherwise.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Raw engagement counts flatter whichever platform has the biggest audience. Normalise to engagement rate, then index against the platform benchmark so a LinkedIn post and an Instagram post can be compared honestly.',
          language: 'javascript',
          starterCode: `const POSTS = [
  { id: 'a', platform: 'instagram', reach: 12000, interactions: 840 },
  { id: 'b', platform: 'linkedin',  reach: 3000,  interactions: 390 },
  { id: 'c', platform: 'instagram', reach: 40000, interactions: 1600 },
  { id: 'd', platform: 'linkedin',  reach: 1200,  interactions: 96 },
];

const BENCHMARK = { instagram: 0.05, linkedin: 0.10 };

// TODO: rate = interactions / reach; index = round(rate / benchmark * 100).
// Print '<id> (<platform>): <rate>% = <index> vs benchmark' with the rate to
// one decimal place, sorted by index descending then id ascending.`,
          examples: [
            { input: 'None', output: 'a (instagram): 7.0% = 140 vs benchmark\\nb (linkedin): 13.0% = 130 vs benchmark\\nc (instagram): 4.0% = 80 vs benchmark\\nd (linkedin): 8.0% = 80 vs benchmark', explanation: 'Post c has the most interactions of any post here and is the joint worst performer.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Validate the posting schedule before anyone commits to it. Two posts on the same platform on the same day burns reach; a week-long gap loses the audience you just paid to build.',
          language: 'javascript',
          starterCode: `const POSTS = [
  { day: 1, platform: 'instagram' }, { day: 1, platform: 'instagram' },
  { day: 1, platform: 'linkedin' },  { day: 3, platform: 'instagram' },
  { day: 9, platform: 'instagram' }, { day: 10, platform: 'linkedin' },
];

const MAX_PER_DAY = { instagram: 1, linkedin: 2 };

// TODO: print 'too many on day <day> (<platform>): <count>' for each breach,
// then 'longest instagram gap: <n> days' (largest gap between instagram days),
// then 'violations: <n>'.`,
          examples: [
            { input: 'None', output: 'too many on day 1 (instagram): 2\\nlongest instagram gap: 6 days\\nviolations: 1', explanation: 'Two posts on day one and then silence for six days — the classic burst-and-vanish calendar.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the reply to a real, specific public complaint. It must name the actual problem rather than "your experience", say what you are doing about it, and move the thread to a channel where it can be resolved — in that order, without a single word of corporate padding.',
          language: 'markdown',
          runnable: false,
          starterCode: `> **@customer**, publicly:
> "Ordered on the 2nd, promised 3-day delivery, it is now the 14th and support
> has not replied to two emails. Genuinely the worst service I have had."

**Your reply — under 60 words:**

TODO: name the specific failure. Not "your experience".

TODO: what you are doing about it, concretely, with a time.

TODO: the one channel to continue on, with a reference they can quote.

<!--
  Check:
  - Have you apologised for the thing that actually happened?
  - Have you promised anything you cannot deliver?
  - Would you post this if the complaint were about your own order?
-->`,
        },
        {
          kind: 'code',
          prompt: 'Write the content strategy as data the calendar is generated from, not as a slide. Pillars carry a justification and a target share; the path from a post to an owned email address is written out step by step, because that is the only part of this that compounds.',
          language: 'json',
          runnable: false,
          starterCode: `{
  "pillars": [
    {
      "name": "education",
      "why": "TODO: what belief does this change in the buyer?",
      "target_share": 0.3,
      "formats": ["TODO"]
    }
  ],
  "platforms": [
    {
      "name": "TODO",
      "rewards": "TODO: what does this platform's ranking actually favour, based on what performs there?",
      "cadence_per_week": 0
    }
  ],
  "path_to_owned": [
    "TODO: step 1 — the post",
    "TODO: step 2 — the destination",
    "TODO: step 3 — what is exchanged for the email address",
    "TODO: step 4 — the first email"
  ]
}`,
        },
      ],
    },
    'dm-m3-assignment': {
      title: 'Paid Campaign Plan',
      questions: [
        {
          kind: 'code',
          prompt: 'Structure the account so every ad group is one theme with one promise. Write it as configuration: campaign, budget, ad groups, and the keywords with their match types — plus the reason each ad group deserves to be separate.',
          language: 'json',
          runnable: false,
          starterCode: `{
  "campaign": "TODO",
  "daily_budget": 0,
  "networks": ["search"],
  "ad_groups": [
    {
      "name": "seo course - transactional",
      "why_separate": "TODO: what is the single promise this ad group's ads make?",
      "keywords": [
        { "text": "seo course price", "match": "exact" }
      ],
      "landing_page": "TODO"
    }
  ],
  "negatives": ["TODO: see the next task"]
}`,
        },
        {
          kind: 'code',
          prompt: 'Match types decide what you pay for. Implement the three, apply the negatives first, and prefer the tightest match when several keywords qualify — otherwise every query gets billed at the loosest one.',
          language: 'javascript',
          starterCode: `const KEYWORDS = [
  { text: 'seo course',        match: 'broad' },
  { text: 'seo course online', match: 'phrase' },
  { text: 'seo course price',  match: 'exact' },
];

const NEGATIVES = ['free', 'jobs', 'pdf'];

function serve(query) {
  // TODO:
  //   a negative appearing as a whole word -> 'blocked by negative'
  //   exact  — the query is the keyword, word for word
  //   phrase — the query contains the keyword as a substring
  //   broad  — every keyword word appears somewhere in the query
  // When several match, report the tightest: exact, then phrase, then broad.
  // Nothing matches -> 'no match'
}

for (const q of [
  'seo course price',
  'seo course online for beginners',
  'affordable seo course',
  'free seo course',
  'marketing course',
]) {
  console.log(q + ' -> ' + serve(q));
}`,
          examples: [
            { input: 'None', output: 'seo course price -> exact: seo course price\\nseo course online for beginners -> phrase: seo course online\\naffordable seo course -> broad: seo course\\nfree seo course -> blocked by negative\\nmarketing course -> no match', explanation: 'Without the negative you would pay for "free seo course" on every impression.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Paid acquisition is only a strategy if the arithmetic works. Compute CAC, LTV, the ratio and the payback period, then let the numbers deliver the verdict rather than the enthusiasm.',
          language: 'javascript',
          starterCode: `const spend = 1_800_000;      // media spend over the period
const newCustomers = 240;
const arpu = 1500;            // revenue per customer per month
const grossMargin = 0.7;
const monthlyChurn = 0.05;

// TODO:
//   CAC            = spend / newCustomers, rounded
//   lifetime       = 1 / monthlyChurn, rounded, in months
//   LTV            = arpu * grossMargin * lifetime, rounded
//   ratio          = LTV / CAC to one decimal
//   payback months = CAC / (arpu * grossMargin) to one decimal
// Print CAC, LTV, 'LTV:CAC = <ratio>:1', 'payback months: <n>', then
// 'verdict: ' — 'scale' at 3:1 or better, 'fix unit economics first' at 1:1
// or better, otherwise 'stop'.`,
          examples: [
            { input: 'None', output: 'CAC: 7500\\nLTV: 21000\\nLTV:CAC = 2.8:1\\npayback months: 7.1\\nverdict: fix unit economics first', explanation: 'A whisker under 3:1 with a seven-month payback — the business funds this campaign for over half a year before it profits.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Budget pacing catches the overspend on day seven rather than in the invoice. Project the month from what has actually been spent and report the variance against the plan.',
          language: 'javascript',
          starterCode: `const budget = 90000;
const days = 30;
const spendByDay = [4200, 4400, 4100, 5200, 5000, 5300, 5100];

// TODO: print
//   'spent: <total> over <n> days'
//   'ideal daily: <budget / days, rounded>'
//   'actual daily: <total / elapsed, rounded>'
//   'projected month: <actual daily * days, rounded>'
//   'variance: <+/-><percent>%' against the budget, rounded`,
          examples: [
            { input: 'None', output: 'spent: 33300 over 7 days\\nideal daily: 3000\\nactual daily: 4757\\nprojected month: 142714\\nvariance: +59%', explanation: 'A week in and the campaign is on track to spend 59% over — that is a Monday-morning conversation, not a month-end one.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the ad copy linter. Google truncates a headline over 30 characters and a description over 90, and a description far under the limit is paid space you chose not to use.',
          language: 'javascript',
          starterCode: `const LIMITS = { headline: 30, description: 90 };

const ADS = [
  {
    headline: 'SEO Course For Beginners',
    description: 'Learn crawling, keywords and on-page SEO with mentor-reviewed assignments.',
  },
  {
    headline: 'The Best SEO Training Course Available Online Today',
    description: 'Enrol now.',
  },
];

// TODO: for each ad print 'ad <n>: ok' or the issues joined by '; ':
//   'headline <len>/<limit>'
//   'description <len>/<limit>'
//   'description wastes available space'  — under 40 characters`,
          examples: [
            { input: 'None', output: 'ad 1: ok\\nad 2: headline 51/30; description wastes available space', explanation: 'The second ad is truncated at the top and half-empty at the bottom.' },
          ],
        },
      ],
    },
    'dm-m4-assignment': {
      title: 'Email Programme',
      questions: [
        {
          kind: 'code',
          prompt: 'Schedule the welcome sequence from the signup timestamp, respecting quiet hours — nothing sends between 22:00 and 08:00, it waits for 09:00. Work in UTC so the result does not depend on where the code runs.',
          language: 'javascript',
          starterCode: `const OFFSET_DAYS = [0, 1, 3, 7, 14];
const SIGNUP = new Date('2026-09-07T22:30:00Z');
const QUIET_START = 22;
const QUIET_END = 8;

// TODO: for each offset, add the days to SIGNUP. If the hour falls inside
// quiet hours, move it to 09:00 — the same morning if it is before 08:00,
// the next morning if it is 22:00 or later.
// Print 'email <n> (day <offset>): YYYY-MM-DD HH:MM' in UTC.`,
          examples: [
            { input: 'None', output: 'email 1 (day 0): 2026-09-08 09:00\\nemail 2 (day 1): 2026-09-09 09:00\\nemail 3 (day 3): 2026-09-11 09:00\\nemail 4 (day 7): 2026-09-15 09:00\\nemail 5 (day 14): 2026-09-22 09:00', explanation: 'Every send lands in the quiet window and slides to the next morning — the offsets are relative to signup, not to the previous send.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'A behavioural sequence without exit conditions keeps selling a product the customer has already bought. Write the state machine, and make the exits absorbing — once someone has left, nothing brings them back in.',
          language: 'javascript',
          starterCode: `function step(state, event) {
  // States: 'new' -> 'sent1' -> 'sent2' -> 'done'
  // Events: 'sent', 'purchased', 'unsubscribed'
  // TODO:
  //   'done' and 'exited' are absorbing — return them unchanged
  //   'purchased' or 'unsubscribed' -> 'exited'
  //   'sent' advances one state
}

let state = 'new';
for (const event of ['sent', 'sent', 'purchased', 'sent']) {
  state = step(state, event);
  console.log(event + ' -> ' + state);
}

let uninterrupted = 'new';
for (const event of ['sent', 'sent', 'sent']) uninterrupted = step(uninterrupted, event);
console.log('uninterrupted end state: ' + uninterrupted);`,
          examples: [
            { input: 'None', output: 'sent -> sent1\\nsent -> sent2\\npurchased -> exited\\nsent -> exited\\nuninterrupted end state: done', explanation: 'The fourth "sent" changes nothing — that absorbing state is what stops the post-purchase nagging.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the subject line linter. It should catch what actually costs you: truncation on mobile, shouting, spam-filter triggers, and emoji used as punctuation.',
          language: 'javascript',
          starterCode: `const SPAM_WORDS = ['free', '!!!', 'act now', 'guaranteed', 'winner'];

function lint(subject) {
  // TODO: return the issues in this order
  //   'too long (<len>)'            — over 50 characters
  //   'all caps'                    — no lowercase letters at all
  //   'spam trigger: a, b'          — matched words, in SPAM_WORDS order
  //   'too many emoji (<n>)'        — more than one
}

for (const subject of [
  'Your SEO audit template is ready',
  'FREE BONUS!!! ACT NOW',
  'Three things your homepage is getting wrong (and how to fix them today)',
  '\\u{1F389} Welcome \\u{1F680} aboard \\u{1F38A}',
]) {
  console.log(JSON.stringify(lint(subject)));
}`,
          examples: [
            { input: 'None', output: '[]\\n["all caps","spam trigger: free, !!!, act now"]\\n["too long (71)"]\\n["too many emoji (3)"]', explanation: 'The third subject is the interesting one — good copy, still truncated on every phone.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Sending to an unengaged list is how a domain gets its reputation destroyed. Bucket the list and report how much of it you can actually mail.',
          language: 'javascript',
          starterCode: `const LIST = [
  { email: 'a@x.com', bounces: 0, opens90d: 6, unsubscribed: false },
  { email: 'b@x.com', bounces: 3, opens90d: 0, unsubscribed: false },
  { email: 'c@x.com', bounces: 0, opens90d: 0, unsubscribed: false },
  { email: 'd@x.com', bounces: 0, opens90d: 1, unsubscribed: true },
  { email: 'e@x.com', bounces: 0, opens90d: 2, unsubscribed: false },
];

function bucket(contact) {
  // TODO, in this order:
  //   unsubscribed, or 2+ bounces -> 'suppress'
  //   no opens in 90 days         -> 're-engage'
  //   otherwise                   -> 'active'
}

// TODO: print '<email>: <bucket>' for each, then
// 'mailable: <active count> of <total>', then the counts as JSON with
// keys sorted alphabetically.`,
          examples: [
            { input: 'None', output: 'a@x.com: active\\nb@x.com: suppress\\nc@x.com: re-engage\\nd@x.com: suppress\\ne@x.com: active\\nmailable: 2 of 5\\n{"active":2,"re-engage":1,"suppress":2}', explanation: 'Two of five are genuinely mailable — the list is smaller than the dashboard says.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Specify the lead magnet and the consent mechanism together, because one is worthless without the other. Name the specific problem it solves in the next ten minutes, and write out the consent wording — then test it against "freely given, specific, informed and unambiguous".',
          language: 'markdown',
          runnable: false,
          starterCode: `# Lead magnet

## The problem it solves, in one sentence
TODO: something the persona is stuck on right now. Not "learn more about X".

## Why they would trade an email address for it
TODO:

## Format and time to value
TODO: what it is, and how long before it has helped them.

# Consent

## The wording beside the field
TODO: write it exactly as it will appear.

## The four tests
- **Freely given** — TODO: is the download conditional on marketing consent?
- **Specific** — TODO: does it name what they will receive?
- **Informed** — TODO: sender, frequency, and how to leave.
- **Unambiguous** — TODO: is the box unticked by default?

## What is recorded at signup
TODO: timestamp, wording shown, source. Consent you cannot evidence is consent you do not have.`,
        },
      ],
    },
    'dm-m5-assignment': {
      title: 'Conversion Audit',
      questions: [
        {
          kind: 'code',
          prompt: 'Before designing an A/B test, find out whether the site has the traffic to finish it. Compute the sample size per variant, convert it to days, and let that decide whether the test is worth running.',
          language: 'javascript',
          starterCode: `function sampleSize(baseline, relativeMde) {
  // TODO: absolute detectable difference = baseline * relativeMde.
  // n per variant = 16 * p * (1 - p) / difference^2, rounded up.
  // (16 is the constant for 80% power at 95% confidence.)
}

const n = sampleSize(0.04, 0.20);
console.log('per variant: ' + n);

const dailyVisitors = 500;
const variants = 2;
// TODO: print 'days at 500/day: <n>' (rounded up)
// TODO: print 'viable in 4 weeks: <true|false>' — 28 days or fewer
// TODO: print 'per variant at 40% mde: <n>' `,
          examples: [
            { input: 'None', output: 'per variant: 9600\\ndays at 500/day: 39\\nviable in 4 weeks: false\\nper variant at 40% mde: 2400', explanation: 'Doubling the effect you are willing to detect cuts the sample fourfold — that is the only lever this page has.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'The variant looks like a 20% lift. Run the two-proportion z-test and find out whether you would be shipping a real improvement or noise.',
          language: 'javascript',
          starterCode: `const control = { conversions: 200, visitors: 5000 };
const variant = { conversions: 240, visitors: 5000 };

function zScore(control, variant) {
  // TODO: pooled p = (all conversions) / (all visitors)
  //       se = sqrt(p * (1 - p) * (1/n1 + 1/n2))
  //       z  = (p2 - p1) / se
}

// TODO: print
//   'control: <rate>%'  and 'variant: <rate>%' to one decimal
//   'lift: +<percent>%' relative, rounded
//   'z = <value>' to three decimals
//   'significant at 95%: <true|false>' — |z| >= 1.96`,
          examples: [
            { input: 'None', output: 'control: 4.0%\\nvariant: 4.8%\\nlift: +20%\\nz = 1.950\\nsignificant at 95%: false', explanation: 'A 20% lift on 10,000 visitors and still short of the bar — shipping this is a coin flip you have paid for.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Message match is the cheapest conversion fix there is. Score how much of the ad promise actually survives onto the page, and watch the second example fall off a cliff.',
          language: 'javascript',
          starterCode: `const CASES = [
  { ad: 'Free SEO audit template', page: 'Download the free SEO audit template' },
  { ad: 'Free SEO audit template', page: 'Our digital marketing services' },
];

function matchScore(ad, page) {
  // TODO: take the distinct lowercase alphanumeric words of the ad,
  // and report what percentage of them also appear on the page. Round it.
}

for (const c of CASES) {
  console.log(matchScore(c.ad, c.page) + '% match: ' + c.page);
}`,
          examples: [
            { input: 'None', output: '100% match: Download the free SEO audit template\\n0% match: Our digital marketing services', explanation: 'The second page shares not one word with the ad that paid for the click.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Rank the fixes by ICE — impact, confidence, ease — so the order is defensible rather than a matter of taste. Note where the biggest idea lands.',
          language: 'javascript',
          starterCode: `const IDEAS = [
  { name: 'Move CTA above fold', impact: 8, confidence: 9, ease: 9 },
  { name: 'Rewrite hero copy',   impact: 7, confidence: 6, ease: 8 },
  { name: 'Rebuild checkout',    impact: 9, confidence: 5, ease: 2 },
  { name: 'Add trust badges',    impact: 4, confidence: 7, ease: 10 },
];

// TODO: score = mean of the three, to one decimal.
// Print '<rank>. <name>: <score>' sorted by score descending,
// ties broken by name ascending.`,
          examples: [
            { input: 'None', output: '1. Move CTA above fold: 8.7\\n2. Add trust badges: 7.0\\n3. Rewrite hero copy: 7.0\\n4. Rebuild checkout: 5.3', explanation: 'The highest-impact idea ranks last, because you are not confident in it and it is hard — which is exactly the argument ICE is there to have.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the test hypothesis so it can be wrong. It needs the observation that prompted it, the change, the predicted direction with a number, one primary metric decided in advance, and the guardrail metric that would make you roll it back even if the primary metric went up.',
          language: 'markdown',
          runnable: false,
          starterCode: `# Test: TODO

## What we observed
TODO: the evidence. Session recordings, a funnel step, a heatmap — say which.

## What we will change
TODO: one change. If you cannot describe it in a sentence, it is two tests.

## Because we believe
TODO: the mechanism. Why would this change behaviour?

## We expect
TODO: <primary metric> to move from <current> to <target>.

## Primary metric
TODO: one. Decided now, not after the data arrives.

## Guardrail metric
TODO: what would make you roll this back even if the primary metric improved?

## Sample size and duration
TODO: per variant, and the number of days. Use the calculator from task 1.

## What we do if it loses
TODO: the thing people never write down.`,
        },
      ],
    },
  },
};
