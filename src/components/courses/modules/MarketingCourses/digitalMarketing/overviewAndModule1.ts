import { MarketingLesson, MarketingAssignment } from '../types';
import { QuizQuestion } from '../../../../../types';

/**
 * Digital Marketing Strategy — Overview and Module 1 (The Funnel).
 *
 * Beginner-friendly expanded lessons. The running example throughout is
 * "Rosie's Bakery", a fictional small bakery with a local shop and a simple
 * online shop. All figures for Rosie's Bakery are illustrative.
 */
export const overviewAndModule1Lessons: Record<string, MarketingLesson> = {
  // ─── Overview ─────────────────────────────────────────────────────────
  "overview-welcome": {
    title: "Welcome to Digital Marketing Strategy",
    objective: "understand what strategy means here, and why channel tactics alone do not work.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Imagine you get in a car and start driving without a destination. You are moving, you are using fuel, and you are busy. But you cannot say whether you are getting closer to anywhere useful." },
      { type: "text", value: "Marketing without a strategy is the same. You post, you run ads, you send emails. It feels like progress. A strategy is the destination and the map: it tells you where you are going and which roads get you there." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Strategy", "Your overall plan: who you want to reach, what you want them to do, and how you will get them to do it."],
        ["Tactic", "One specific action, such as a Facebook ad or a weekly email. Tactics carry out the strategy."],
        ["Channel", "A place or method you use to reach people, for example Google search, Instagram or email."],
        ["Funnel", "A simple picture of how a stranger becomes a customer, step by step. Many people start at the top; fewer reach the bottom."],
        ["Conversion", "When someone does the thing you wanted, such as buying, signing up or booking."],
        ["Revenue", "The money that comes in from sales, before costs are taken away."],
        ["Impressions", "The number of times your post or ad was shown on a screen. One person can create many impressions."],
        ["Reach", "The number of different people who saw your post or ad at least once."],
        ["Vanity metric", "A number that looks impressive (likes, followers, impressions) but does not show whether you made money."],
        ["KPI (Key Performance Indicator)", "The small number of measurements you choose to judge success, such as orders per week."],
        ["Organic", "Unpaid. Organic social means normal posts, not ads."],
      ] },
      { type: "text", value: "Read that table as two groups. Strategy, tactic, channel, funnel and conversion are planning words: they describe how you decide what to do. Revenue, impressions, reach, vanity metric and KPI are counting words: they describe how you judge whether it worked." },
      { type: "text", value: "Most beginners learn the counting words first and the planning words never. That is why so much marketing is busy and directionless. The two groups are also easy to muddle in a meeting. \"We need more reach\" sounds like a plan, but it is only a number. \"We need 30 more cake orders from local parents before December\" is a goal, and a goal is the thing that tells you which channels are even worth considering." },

      { type: "heading", value: "Why tactics alone fail" },
      { type: "text", value: "Most digital marketing does not fail because the tactics are wrong. It fails because nothing connects them." },
      { type: "text", value: "A typical small business runs some ads, posts on social media and sends the odd email. When you ask which of these produced sales, nobody knows. Nobody knows how the activities help each other, either." },
      { type: "text", value: "Strategy is what joins everything together. It answers four questions:" },
      { type: "list", ordered: true, items: [
        "Who are we trying to reach?",
        "What do we want them to do?",
        "Which channels move them along that path?",
        "How will we know whether it worked?",
      ] },
      { type: "text", value: "Tactics without these answers are just activity. They are not really marketing." },

      { type: "compare", columns: [
        { title: "Strategy", subtitle: "Connected and measured", tone: "olive", items: [
          "Goal: 30 extra cake orders a month.",
          "Audience: local parents planning birthdays.",
          "Channels chosen because those parents search Google and use Facebook groups.",
          "Every link is tracked, so sales can be traced to a channel.",
          "Monthly review: keep what sells, stop what does not.",
        ] },
        { title: "Just activity", subtitle: "Busy but blind", tone: "rose", items: [
          "Goal: \"get our name out there\".",
          "Audience: \"everyone\".",
          "Posts on every platform because competitors do.",
          "No tracking, so nobody knows where sales came from.",
          "Success judged by likes and followers.",
        ] },
      ] },

      { type: "heading", value: "What this course covers: nine modules" },
      { type: "text", value: "The course runs in nine modules. Each one produces a piece of written work, and the pieces stack up into a single marketing plan for one business you choose in Module 1." },
      { type: "table", headers: ["Module", "What it covers", "What you produce"], rows: [
        ["1. The Digital Marketing Funnel", "How a stranger becomes a customer, and how to find where they drop out", "A funnel table with conversion rates, a persona and a channel-to-goal grid"],
        ["2. Social Media & Organic Growth", "Content pillars, posting rhythm and community, instead of random posting", "A content calendar built on three to five pillars"],
        ["3. PPC Advertising", "Paid search and paid social campaigns that do not waste budget", "A campaign structure with targeting, budget and negative keywords"],
        ["4. Email Marketing Automation", "Lists, lead magnets, welcome and win-back sequences, and consent", "A written email sequence with timing and triggers"],
        ["5. Conversion Rate Optimisation", "Getting more sales from the visitors you already have", "A prioritised list of page fixes and one test plan"],
        ["6. Measurement, Analytics & Attribution", "GA4, key events, UTM tagging and how credit is shared between channels", "A measurement plan and a one-page reporting dashboard design"],
        ["7. Content, Video & Partnerships", "Longer-form content, short video and working with other businesses or creators", "A content plan and one partnership or collaboration brief"],
        ["8. AI in Digital Marketing", "Using AI tools for research, drafting and analysis, and where they mislead you", "An AI-assisted workflow with human checks written in"],
        ["9. Capstone & Career", "Putting everything together, and presenting it", "A complete campaign plan, plus a portfolio piece"],
      ] },
      { type: "text", value: "Notice that Modules 1 and 6 sit either side of the doing modules. Module 1 decides what to measure and why; Modules 2 to 5 and 7 to 8 do the work; Module 6 checks honestly whether it paid. A plan without those two ends is the \"driving with no destination\" problem again." },
      { type: "text", value: "Nothing in this course requires coding. You will be assessed with short quizzes on the ideas and written case studies where you make a judgement and defend it. There is no programming task anywhere in the nine modules." },
      { type: "text", value: "The course ends with a capstone: one complete campaign plan for your chosen business, with a goal, an audience, channels, a budget, a schedule and a measurement plan. Everything before Module 9 is a piece of that plan." },

      { type: "heading", value: "A warning about vanity metrics" },
      { type: "text", value: "Impressions, reach, followers and likes are easy to grow and easy to report. They are also often disconnected from revenue." },
      { type: "text", value: "A campaign with a million impressions and no sales has failed, however good the report looks." },

      { type: "example", title: "Rosie's Bakery: likes versus sales (illustrative figures)", value: "Rosie tried two things in March.\n\n1) Instagram posts\n   Impressions: 12,000\n   Likes:          300\n   Orders traced:    0\n   Revenue:         £0\n\n2) One email to her 400 subscribers with a Mother's Day offer\n   Orders:          32\n   Average order:  £18\n   Revenue: 32 x £18 = £576\n\nThe Instagram numbers look bigger, but the email made money.\nThat does not mean Instagram is useless. It means Rosie must\nset a goal for Instagram (for example, email sign-ups) and\nmeasure it, instead of counting likes." },
      { type: "text", value: "What that comparison really shows is a difference in how close each channel sits to a decision. The 400 people on Rosie's email list had already given her their address, which means they had already decided they wanted to hear from her. The 12,000 impressions were shown to people who had decided nothing." },
      { type: "text", value: "So the lesson is not \"email good, Instagram bad\". It is that a channel must be judged against the job you gave it. If Rosie's job for Instagram is \"add 40 people to the email list this month\", then 300 likes and 2 sign-ups is a bad month, and 60 likes and 45 sign-ups is a good one. Without a stated job, neither number means anything." },

      { type: "example", title: "Rosie's Bakery: the same report, before and after a goal is set (illustrative figures)", value: "BEFORE — Rosie's monthly report, as she used to write it\n\n  Instagram followers:  2,410 (up 180)\n  Post impressions:    12,000\n  Likes:                  300\n  Website visits:       1,900\n  \"Good month!\"\n\nWhy this report cannot be acted on:\n  - Every line counts attention, not outcomes.\n  - Nothing says what any of it was supposed to achieve.\n  - Two channels could have done all the work, or none.\n  - There is no decision anyone could make from it.\n\nAFTER — the same month, reported against stated goals\n\n  Goal 1: 40 new email subscribers from Instagram\n    Link clicks from bio:   96\n    Sign-ups:               31   -> 78% of goal\n  Goal 2: 30 cake orders from all channels\n    Orders from email:      32\n    Orders from search:      9\n    Orders from Instagram:   2\n    Total:                  43  -> goal met\n  Goal 3: keep cost per order under £10\n    Total ad spend:       £120\n    Orders from ads:         9   -> £13.33, over target\n\nWhat Rosie now knows that she did not know before:\n  - Instagram earns its place as a list-building channel, not a\n    selling channel: 31 sign-ups, only 2 direct orders.\n  - Email is doing the selling, so protecting the list matters.\n  - Ads are slightly too expensive; that is one clear thing to fix.\n\nThe activity did not change. Only the way it was judged changed." },
      { type: "text", value: "The \"after\" report is not longer, and it took no extra tools. The only new ingredient is a stated goal beside each number. That is what turns a report into a decision." },

      { type: "heading", value: "Copy-paste template: the monthly one-page report" },
      { type: "text", value: "Use this from your very first month. A spreadsheet with these six columns is enough. Fill in the goal column at the start of the month, not at the end, or you will quietly pick whichever goal you happened to hit." },
      { type: "example", title: "Template: monthly marketing report (copy the column headings)", value: "Month | Activity | Goal for this month | Actual | Gap | Decision for next month\n\nOct | Instagram posts   | 40 email sign-ups      | 31   | -9    | Keep. Try one story-poll per week.\nOct | Email newsletter  | 30 orders              | 32   | +2    | Keep. Send a second one in November.\nOct | Paid search       | Orders under £10 each  | £13.33 | -£3.33 | Add negative keywords, re-check in 4 weeks.\nOct | Local Facebook group | 5 enquiries         | 0    | -5    | Stop. It has produced nothing in 3 months.\n\nRules for using it:\n  - One row per activity, never one row per platform metric.\n  - The goal must be a number and must be written in advance.\n  - Every row ends in Keep, Change or Stop. No row ends in\n    \"monitor\", because that is how bad activities survive.\n  - Review it on the same date every month, in under 30 minutes.\n\n(The figures above are illustrative, not real measurements.)" },
      { type: "text", value: "The Keep, Change or Stop rule is the important part. Most small businesses never stop anything, so effort only ever accumulates. Forcing a decision on every row each month is what keeps the plan small enough to actually run." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Are likes and followers completely worthless then? A: No. They are weak early signals that content is landing, and a large audience is genuinely easier to sell to later. The mistake is reporting them as if they were the result. Treat them as an input you watch, not an outcome you are paid for." },
      { type: "text", value: "Q: My business has no website, so I cannot use Google Analytics 4. Can I still do this course? A: Yes. Everything in Module 1 can be done with counted actions instead: enquiries taken, phone calls answered, walk-ins, messages received. Write the numbers in a spreadsheet by hand. The thinking is identical; only the tool changes." },
      { type: "text", value: "Q: How long before a strategy shows results? A: It depends entirely on the channel, and no honest answer is a single number. Email and paid search can produce sales within days because they reach people who are already interested. Search optimisation and organic social usually take months. Plan for both: one fast channel to pay the bills, one slow channel to build something that lasts." },
      { type: "text", value: "Q: There are nine modules. Do I have to pick the business in Module 1, or can I decide later? A: Pick it now, in Module 1. Every later module adds a piece to the same plan, so changing business halfway means redoing the funnel, the persona and the channel choices. Choosing a slightly imperfect real business now beats choosing a perfect one in Module 5." },

      { type: "alert", value: "For every activity in this course, ask two questions. What business result is this supposed to produce? How would I measure it? If you cannot answer, the activity is not justified, even if everyone else does it." },

      { type: "steps", title: "Quick check: where do your visitors come from? (Google Analytics 4, free)", steps: [
        { label: "Open Google Analytics 4", text: "Go to analytics.google.com and choose your website's property. If you do not have one yet, note this down: setting it up is your first task." },
        { label: "Open the traffic report", text: "In the left menu, choose Reports, then Acquisition, then Traffic acquisition." },
        { label: "Set the date range", text: "At the top right, choose the last 28 days." },
        { label: "Read the channel list", text: "The table groups visits by channel, such as Organic Search, Direct, Organic Social, Paid Search and Email." },
        { label: "Look at key events, not just sessions", text: "Scroll right to the Key events column (for example purchases or form sign-ups). Which channel brings visits that actually lead to results?" },
        { label: "Write one sentence", text: "For example: \"Most visits come from Organic Social, but most key events come from Email.\" This is your starting point." },
      ] },

      { type: "warning", value: "Common beginner mistakes: (1) Choosing channels before choosing a goal. (2) Reporting likes and followers as if they were sales. (3) Trying to be on every platform at once with no time to do any of them well. (4) Not tracking anything, so good and bad activities look the same. (5) Copying what a large brand does, when a small business has very different budgets and needs." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Pick a business you know well: your own, your employer's, or a local shop.",
        "List every marketing activity it does now (posts, ads, emails, flyers). Aim for 3 to 6 items.",
        "Next to each one, write what result it is meant to produce, such as \"bookings\" or \"email sign-ups\".",
        "Next to each result, write how you could measure it. If you cannot think of a way, write \"unknown\".",
        "Circle any activity with \"unknown\". These are the first things to question.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "What is the difference between a strategy and a tactic? (A strategy is the overall plan of who, what, where and how you measure. A tactic is one specific action that carries out that plan.)",
        "Why is \"50,000 impressions\" not proof that a campaign worked? (Impressions only count how often something was shown. They do not show whether anyone bought or took action.)",
        "What two questions should you ask about every marketing activity? (What business result should it produce, and how will I measure it?)",
      ] },
    ],
    takeaways: [
      "Strategy connects tactics to results. Tactics alone are just activity.",
      "The funnel is the frame: reach people, engage them, convert them, keep them.",
      "Likes, followers and impressions are easy to grow but often do not track sales.",
      "Every activity needs a stated goal and a way to measure it.",
      "Nine modules, each producing one piece of a single plan that ends in a capstone campaign.",
      "Assessment is quizzes and written case studies. There is no coding anywhere in this course.",
      "Report every activity as Keep, Change or Stop, so bad activities cannot quietly survive.",
      "Start by checking where your results already come from, for example in Google Analytics 4.",
    ],
  },

  "overview-outcomes": {
    title: "Learning Outcomes",
    objective: "know what you will be able to build and measure by the end.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Think of this course like building a recipe book for one restaurant. Each module adds a new page: who the guests are, what to serve, how to invite people in and how to make them come back. By the end, you have the whole book, written for a real kitchen." },
      { type: "text", value: "In this course, the \"book\" is a complete, practical marketing plan for one real business. You will not do separate, disconnected exercises." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Marketing plan", "A written document that says what you will do in marketing, why, with what budget, and how you will measure it."],
        ["Customer journey", "The steps a person goes through from first hearing about you to buying (and buying again)."],
        ["Persona", "A short description of a typical customer type, based on real evidence."],
        ["Content pillar", "One of 3 to 5 main topics your content is always about."],
        ["Content calendar", "A schedule showing what you will publish, where and when."],
        ["Google Ads / Meta Ads", "The advertising tools for Google (search, YouTube) and Meta (Facebook, Instagram)."],
        ["Targeting", "Choosing who sees your ad, for example by location, interests or search words."],
        ["Bidding", "How you tell an ad platform what you are willing to pay, and what result you want it to aim for."],
        ["CAC (Customer Acquisition Cost)", "How much you spend on marketing, on average, to win one new customer."],
        ["LTV (Lifetime Value)", "How much value one customer brings you over the whole time they buy from you. Also called CLV."],
        ["Margin", "The part of the price you keep after paying for the product itself (ingredients, stock, packaging)."],
        ["Email sequence", "A series of emails sent automatically in order, for example a welcome series."],
        ["A/B test", "Showing two versions (A and B) to similar people to see which one performs better."],
        ["Attribution", "Deciding which channel gets the credit for a sale when someone touched several before buying."],
        ["Capstone", "The final piece of work, where everything you have built is brought together into one plan."],
      ] },
      { type: "text", value: "Two words in that table do most of the work. CAC and LTV are the pair that decide whether a channel is a business or a hobby. Everything else on the list is a method; those two are the scoreboard." },
      { type: "text", value: "Attribution is on the list because it is where beginners lose confidence. A customer sees an Instagram post, searches your name a week later and buys after an email. Three channels touched that sale. Module 6 is about deciding how to share the credit honestly instead of letting each platform claim it all." },

      { type: "heading", value: "What you will be able to do, module by module" },
      { type: "table", headers: ["Module", "What you will be able to do", "What you hand in"], rows: [
        ["1. The Digital Marketing Funnel", "Map a customer journey and find where people really drop out, then build an evidence-based persona and choose channels by funnel stage", "Funnel table with conversion rates, persona one-pager, channel-to-goal grid"],
        ["2. Social Media & Organic Growth", "Plan content around three to five pillars instead of posting randomly", "A four-week content calendar"],
        ["3. PPC Advertising", "Set up search and social campaigns with correct targeting, budget and bidding, and judge them by cost per sale", "A campaign structure and a budget justification"],
        ["4. Email Marketing Automation", "Design sequences that sell without driving unsubscribes, and handle consent properly", "A welcome sequence and one recovery sequence, written out"],
        ["5. Conversion Rate Optimisation", "Find why a page loses people, and design a test that gives a trustworthy answer", "A prioritised fix list and one test plan"],
        ["6. Measurement, Analytics & Attribution", "Set up key events and UTM tagging in GA4, and explain how credit is shared between channels", "A measurement plan and a one-page report design"],
        ["7. Content, Video & Partnerships", "Plan longer content and short video, and brief a partner or creator", "A content plan and a partnership brief"],
        ["8. AI in Digital Marketing", "Use AI tools for research, drafting and analysis while keeping human checks in place", "A documented AI workflow with its checkpoints"],
        ["9. Capstone & Career", "Assemble and defend a complete campaign plan, and present it as portfolio work", "The capstone campaign plan"],
      ] },
      { type: "text", value: "Read down the last column and you have the shape of the course. Nine small deliverables, none of them longer than a page or two, that clip together into one plan. Nothing is thrown away and nothing is practice for its own sake." },
      { type: "text", value: "None of those deliverables involves writing code. They are tables, short documents and written judgements, which is exactly what a marketer is asked for in a real job." },

      { type: "heading", value: "A first look at CAC and LTV" },
      { type: "text", value: "Outcome 5 is the one that separates a strategist from someone who just runs campaigns. Here is a simple preview. You will learn it properly later." },
      { type: "example", title: "Rosie's Bakery: is Facebook advertising profitable? (illustrative figures)", value: "Step 1: Find CAC\n  Ad spend in April:          £300\n  New customers from ads:       20\n  CAC = £300 / 20 =             £15 per customer\n\nStep 2: Find LTV (using profit, not just sales)\n  Average order:                £18\n  Orders per customer per year:   5\n  Years a customer stays:         2\n  Sales per customer = £18 x 5 x 2 = £180\n  Rosie keeps 40% after ingredients and packaging\n  LTV = £180 x 0.40 =           £72\n\nStep 3: Compare\n  LTV / CAC = £72 / £15 =       4.8\n\nEach £15 spent brings back about £72 of profit over time.\nA common rule of thumb is that LTV should be at least 3 times\nCAC, so this channel looks healthy." },
      { type: "text", value: "The step that beginners skip is step 2's last line. Rosie keeps only 40 pence of every pound, so her £180 of sales is £72 of value. Had she used the sales figure, the ratio would have looked like 12 rather than 4.8, and she would have felt safe spending far more than she can afford." },
      { type: "text", value: "The 3:1 rule of thumb is a convention, not a law, and it is not a promise of profit. It exists because CAC is paid today while LTV arrives slowly over two years, and a business still has to pay rent in the meantime. A thin ratio is not automatically a failure; it just means the channel has no room for a bad month." },

      { type: "example", title: "Rosie's Bakery: the same channel, before and after a price change (illustrative figures)", value: "Rosie raises her average order from £18 to £21 and cuts\npackaging waste, lifting her margin from 40% to 45%.\nHer ad costs do not change.\n\nBEFORE\n  Ad spend:                    £300\n  New customers:                 20\n  CAC = £300 / 20 =             £15\n  Sales per customer\n    = £18 x 5 x 2 =            £180\n  Margin 40%\n  LTV = £180 x 0.40 =           £72\n  LTV / CAC = 72 / 15 =         4.8\n  Profit per customer\n    = £72 - £15 =               £57\n\nAFTER\n  Ad spend:                    £300\n  New customers:                 18   (slightly fewer: price is higher)\n  CAC = £300 / 18 =          £16.67\n  Sales per customer\n    = £21 x 5 x 2 =            £210\n  Margin 45%\n  LTV = £210 x 0.45 =         £94.50\n  LTV / CAC = 94.50 / 16.67 =   5.7\n  Profit per customer\n    = £94.50 - £16.67 =       £77.83\n\nWhat this shows:\n  Rosie won 2 fewer customers and her CAC got worse, yet the\n  channel became clearly better. Margin and order value move\n  LTV; only the ad account moves CAC. Most small businesses\n  spend all their attention on the half they control least.\n\n(Both columns are illustrative figures for practice.)" },
      { type: "text", value: "That is the single most useful idea in the whole preview. When a channel looks unprofitable, the instinct is to fix the ads. Often the cheaper fix is on the other side of the sum: raise the average order, improve the margin, or give people a reason to come back a third time." },

      { type: "heading", value: "Copy-paste template: the course business one-pager" },
      { type: "text", value: "Fill this in before Module 1 and keep it on the first tab of your spreadsheet. Every later module refers back to it, and the capstone in Module 9 opens with it." },
      { type: "example", title: "Template: course business one-pager (copy the labels)", value: "Business name:\nWhat it sells, in one sentence:\nWho usually buys (best guess for now):\nWhere it sells: shop / website / both / by phone\n\nNumbers (estimate, and label estimates as estimates)\n  Average order value:            £\n  Orders per customer per year:\n  Years a typical customer stays:\n  Rough margin kept after costs:   %\n  Current marketing spend a month: £\n\nGoal for the next 12 weeks (must contain a number and a date):\n\nTools\n  Google Analytics 4:      yes / no / need access\n  Google Search Console:   yes / no / need access\n  Meta Business Suite:     yes / no / need access\n  Email tool + list size:\n\nHard limits I must plan around:\n  (budget, staff time, stock, delivery area, seasonality)\n\nWho can give me real answers (owner, manager, three customers):" },
      { type: "text", value: "The last two lines are the ones that matter most. Limits are what make a plan real, and a named person who will answer questions is what keeps your persona in Module 1 from becoming fiction." },

      { type: "heading", value: "How you will be assessed" },
      { type: "text", value: "Each of the nine modules has a short quiz on the ideas, and an assignment made of multiple-choice judgement questions followed by written case studies." },
      { type: "text", value: "There is no coding in this course and no programming task in any module. The case studies are written briefs: you read a scenario with real numbers, make a decision and defend it in prose. Each one comes with a \"what a good answer looks like\" checklist so you can mark your own work honestly while studying alone." },
      { type: "text", value: "The assignments build on each other. Module 9 is a capstone: you assemble the nine deliverables into one complete campaign plan for your chosen business, with a goal, an audience, channels, a budget, a schedule and a measurement plan, and you write the argument for why that plan is the right one." },

      { type: "alert", value: "Choose a real business with a real product: your own, your employer's, or a small local business. If you invent a company, you can avoid the hard limits (small budget, little data, low margins). Those limits are exactly what make strategy difficult and worth learning." },

      { type: "compare", columns: [
        { title: "A good course business", subtitle: "Real limits to work with", tone: "olive", items: [
          "A local bakery, salon or shop you can visit or contact.",
          "You can find or estimate real prices and margins.",
          "It has (or could get) a website, social pages or an email list.",
          "You can ask a few real customers questions.",
        ] },
        { title: "A weak course business", subtitle: "No real limits", tone: "rose", items: [
          "An invented brand with an unlimited budget.",
          "A global company like Nike, where you cannot see real data.",
          "A product that does not exist yet and has no customers to ask.",
          "Changing to a different business in every module.",
        ] },
      ] },

      { type: "steps", title: "Set up your free toolkit for the course", steps: [
        { label: "Google Analytics 4", text: "At analytics.google.com, create a property for the business website (or ask the owner for Viewer access). This shows visits and results." },
        { label: "Google Search Console", text: "At search.google.com/search-console, add the website. This shows which Google searches bring people to the site." },
        { label: "Meta Business Suite", text: "At business.facebook.com, connect the Facebook Page and Instagram account. Its Insights area shows audience and post results." },
        { label: "Google's Campaign URL Builder", text: "Bookmark the free Campaign URL Builder (search \"GA4 Campaign URL Builder\"). You will use it to tag links so you can see which campaign brought each visitor." },
        { label: "A spreadsheet", text: "Create a Google Sheets or Excel file called \"Marketing plan\". Add one tab per module. Your assignment answers will live here." },
      ] },

      { type: "warning", value: "Common beginner mistakes: (1) Picking a huge famous brand, so you never deal with real budget limits. (2) Skipping the assignments and only doing quizzes, which leaves you with no plan at the end. (3) Asking for Admin access to a business's accounts when Viewer access is enough and safer. (4) Using sales revenue instead of profit when working out LTV, which makes channels look better than they are." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: I do not know my business's margin. Can I still calculate LTV? A: Yes, with an estimate, as long as you label it as one. Ask the owner what the product costs them to make or buy, or work it out for one typical order. An estimate you have written down can be corrected later; a missing number means the sum never gets done at all." },
      { type: "text", value: "Q: Nine modules is a lot. Can I skip the ones that do not apply, such as PPC if there is no ad budget? A: Read them, but scale the deliverable down. A business with no ad budget still needs to know what paid search would cost, because that is how you judge whether your free channels are worth the hours they take. Skipping a module leaves a hole in the capstone." },
      { type: "text", value: "Q: What if the business will not give me access to its analytics? A: Ask for Viewer access only, and explain what you want to look at. If the answer is still no, use what is public: the website itself, Google Maps reviews, competitor pages, and counted actions such as enquiries. Say plainly in your assignments which numbers are measured and which are estimated." },
      { type: "text", value: "Q: Are the case studies marked by anyone? A: No, this is a self-paced course, so you mark your own. That is why each case study ends in a checklist of five or six points. Write your answer first, then check it against the list and note honestly which points you missed. The missed points are your revision list." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Write down one real business you will use for the whole course.",
        "Write one sentence describing what it sells and who usually buys.",
        "Estimate its average order value (for example £18) and roughly how often a customer buys each year.",
        "List which tools from the toolkit it already has, and which you will need to set up or request access to.",
        "Save this in your \"Marketing plan\" spreadsheet as the first tab.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why should you use a real business instead of an invented one? (Real businesses have real limits, such as small budgets, thin data and tight margins, and dealing with those is the point of strategy.)",
        "If a business spends £500 on ads and gets 25 new customers, what is the CAC? (£500 / 25 = £20 per customer.)",
        "Why use profit rather than sales when calculating LTV? (Because the business does not keep all of the sale price. Using sales makes customers look more valuable than they are.)",
      ] },
    ],
    takeaways: [
      "Nine modules, nine small deliverables, which combine into one capstone campaign plan.",
      "Assessment is quizzes plus written case studies, marked against a checklist. No coding.",
      "Use one real business so the limits are real.",
      "You will learn to judge whether a channel is profitable, not just how to run it.",
      "CAC is the cost to win a customer; LTV is the value they bring over time.",
      "Set up your free tools (GA4, Search Console, Meta Business Suite, a spreadsheet) early.",
    ],
  },

  // ─── Module 1: The Funnel ─────────────────────────────────────────────
  "dm-m1-l1": {
    title: "AIDA Model & Customer Value Journey",
    objective: "map the stages a customer passes through and diagnose where they drop out.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Imagine a bucket with a hole in it. You can keep pouring more water in the top, but you keep losing it through the hole. The smart move is to find the hole and fix it first." },
      { type: "text", value: "A marketing funnel helps you find the hole. It shows each step from \"stranger\" to \"customer\", so you can see exactly where people leave." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Funnel", "A model of the steps people take to become customers. It is wide at the top (many people) and narrow at the bottom (few buyers)."],
        ["AIDA", "Attention, Interest, Desire, Action: four classic funnel stages."],
        ["Prospect", "A possible future customer who has not bought yet."],
        ["Traffic", "The visitors who come to your website."],
        ["Conversion rate", "The percentage of people who move from one step to the next. Formula: (people who did the next step / people at this step) x 100."],
        ["Bottleneck", "The step where the most people are lost. It limits everything after it."],
        ["Landing page", "The web page someone arrives on after clicking an ad or link."],
        ["Friction", "Anything that makes the next step harder, such as a long form or surprise delivery costs."],
        ["Cart abandonment", "When someone adds items to their basket but leaves without paying."],
        ["Retention", "Keeping customers so they buy again."],
        ["Advocacy", "Customers recommending you to others, for example in reviews or by word of mouth."],
        ["Event (in GA4)", "An action Google Analytics records, such as a page view, add_to_cart or purchase."],
      ] },

      { type: "heading", value: "What the funnel is for" },
      { type: "text", value: "The funnel is a model of how a stranger becomes a customer. It is a simplification. Real journeys loop back, pause and jump around." },
      { type: "text", value: "It is still useful because it makes you ask one specific question: at which stage are we losing people?" },

      { type: "heading", value: "AIDA" },
      { type: "table", headers: ["Stage", "Prospect state", "What they need", "Typical asset"], rows: [
        ["Attention", "Does not know you exist", "A reason to notice", "Social content, ads, SEO"],
        ["Interest", "Aware, mildly curious", "Information that helps them", "Guides, newsletters, comparisons"],
        ["Desire", "Considering, comparing options", "Proof it works and fits", "Case studies, demos, reviews"],
        ["Action", "Ready, needs a nudge", "A clear, easy next step", "Landing page, trial, checkout"],
      ] },
      { type: "text", value: "Read the table across, not down. The useful column is the third one: what the person needs at that moment. Someone at Attention needs a reason to look up. Someone at Action needs the delivery cost and the button. Give them the wrong thing and they leave, however good it is." },
      { type: "text", value: "This is why the same message cannot serve the whole funnel. A long explanation of how your cakes are made is excellent at Interest and actively annoying at Action, when the person has a card in their hand and just wants to know if it will arrive by Saturday." },

      { type: "heading", value: "Using the funnel to diagnose problems" },
      { type: "text", value: "How you use the model matters more than the model itself." },
      { type: "text", value: "If you have lots of visitors but few sales, you have a conversion problem, not an awareness problem. Buying more traffic will make it worse. You would be spending money to fill a leaking bucket." },
      { type: "example", title: "Reading the numbers", value: "10,000 visitors -> 500 sign-ups -> 20 customers\n\n  Visit-to-sign-up:     500 / 10,000 = 5%   (reasonable)\n  Sign-up-to-customer:   20 / 500    = 4%   (weak)\n\nThe bottleneck is after sign-up, not before it.\nSpending more on ads raises the top number and\nchanges nothing about the 4%." },
      { type: "text", value: "The reason this works is that funnel stages multiply. The end-to-end rate here is 20 out of 10,000, which is 0.2 per cent, and that figure is 5% multiplied by 4%. Improving the weak 4% step to 8% doubles the whole funnel. Improving the healthy 5% step to 6% adds only a fifth." },
      { type: "text", value: "So the worst percentage, not the biggest headcount drop, is usually where the money goes. The largest number of people is almost always lost at the very top, because that is where the most people are. That drop is normal and is not the leak." },

      { type: "example", title: "Rosie's Bakery online shop: more ads or fix the checkout? (illustrative figures)", value: "Last month:\n  Website visitors:          8,000\n  Viewed a cake page:        1,200   -> 1,200 / 8,000 = 15%\n  Added to basket:             240   ->   240 / 1,200 = 20%\n  Completed purchase:           24   ->    24 / 240   = 10%\n\nThe worst step is basket -> purchase (10%). 9 in 10 people\nleave at checkout. Rosie finds a surprise £6 delivery charge\nonly appears on the final page.\n\nOption A: double ad spend to get 16,000 visitors\n  16,000 x 15% = 2,400 viewed\n   2,400 x 20% =   480 added\n     480 x 10% =    48 purchases   (double the cost)\n\nOption B: show delivery cost early, keep 8,000 visitors\n  Suppose checkout completion rises to 25%\n     240 x 25% =    60 purchases   (no extra ad cost)\n\nFixing the leak gives more sales than doubling the ad budget." },
      { type: "text", value: "Look at what each option costs as well as what it produces. Option A buys 48 extra orders' worth of traffic and pays for every one of them, month after month, for as long as the ads run. Option B is one afternoon's work on the checkout page, and it keeps working for free." },
      { type: "text", value: "There is a second, quieter benefit. Fixing the checkout does not only improve the 24 orders Rosie already gets: it improves every future visitor from every channel, including the ones she has not started yet. Conversion fixes compound across the whole business. Extra ad spend does not." },

      { type: "example", title: "Rosie's Bakery: the checkout page, before and after (illustrative)", value: "This is the actual change behind the 10% to 25% jump above.\n\nBEFORE — what the customer saw, step by step\n  Basket page:    \"Chocolate celebration cake  £45\"\n                  [Checkout]\n  Details page:   name, email, phone, address, company name,\n                  \"how did you hear about us?\", create a password\n  Payment page:   \"Delivery: £6.00\"  <- first mention of delivery\n                  Total £51.00\n  No mention anywhere of when the cake would arrive.\n\nWhat went wrong, in plain terms:\n  - The price changed at the last possible moment. That feels\n    like a trick, even when it is not one.\n  - Eight fields were asked for; three were actually needed.\n  - Forcing an account is a common reason people abandon.\n  - The one question in the customer's head - \"will it be here\n    by Saturday?\" - was never answered.\n\nAFTER — the same three pages, rewritten\n  Basket page:    \"Chocolate celebration cake  £45\"\n                  \"Delivery £6 to LS1-LS17. Order by Wednesday\n                   for Saturday.\"\n                  Total shown as £51 from this point onwards\n                  [Checkout - no account needed]\n  Details page:   name, email, delivery address, delivery date\n  Payment page:   card details only, total unchanged at £51\n\nWhat changed, and why each change matters:\n  1. Delivery cost moved to the basket -> no price shock.\n  2. Guest checkout -> removes a reason to abandon.\n  3. Eight fields down to four -> less work, fewer drop-outs.\n  4. Delivery date promised early -> answers the real question.\n  5. Total identical on all three pages -> builds trust.\n\nRosie changed the pages one at a time, a fortnight apart, so\nshe could see which change moved the number. Changing all five\nat once would have told her the funnel improved and nothing\nabout why. (Figures illustrative.)" },
      { type: "text", value: "Notice that not one of those fixes is about persuasion. Nobody was convinced to want a cake. Rosie simply stopped getting in the way of people who already wanted one, which is what most conversion work actually is." },

      { type: "heading", value: "Copy-paste template: the funnel metrics sheet" },
      { type: "text", value: "This is the sheet you will fill in for your own business, and it is the first tab of your marketing plan. Keep it to one page. The last two columns are what stop it becoming a report nobody acts on." },
      { type: "example", title: "Template: funnel metrics sheet (copy the column headings)", value: "Period: 1-31 October 2026        Business: ______\n\nStage | Action counted | People | Rate from previous | Worst? | Suspected cause | Next action\n\nAttention | Saw a post or ad     | 8,000 |     - |   | -                       | -\nInterest  | Visited a cake page  | 1,200 | 15.0% |   | Normal for cold traffic | Leave alone\nDesire    | Added to basket      |   240 | 20.0% |   | Nothing obvious         | Leave alone\nAction    | Completed purchase   |    24 | 10.0% | X | Delivery charge revealed late | Show the delivery cost in the basket\nRetention | Ordered again in 90d |     3 | 12.5% |   | No follow-up email      | Add a 30-day thank-you email\n\nEnd-to-end rate: 24 / 8,000 = 0.30%\n\nHow to fill it in:\n  - Count PEOPLE, not sessions, so one person who visits three\n    times before buying is not counted three times.\n  - Rate from previous = this row's people / previous row's\n    people x 100. One decimal place is enough.\n  - Mark exactly ONE row as the worst. If you mark three, you\n    will start three jobs and finish none.\n  - Suspected cause is a guess until you have evidence. Write\n    down beside it how you will check it.\n  - Every row needs a next action, even if that action is\n    Leave alone. Blank rows are how leaks survive.\n  - Re-do the sheet monthly, on the same dates, so the numbers\n    can be compared month to month.\n\n(All figures above are illustrative.)" },
      { type: "text", value: "Counting people rather than sessions matters more than it sounds. A customer who visits three times before buying inflates a session-based funnel and makes your conversion rate look far worse than it is. GA4's funnel exploration counts users by default, which is what you want here." },

      { type: "compare", columns: [
        { title: "Good diagnosis", subtitle: "Find the leak first", tone: "olive", items: [
          "Calculates the conversion rate between every pair of steps.",
          "Finds the step with the biggest drop.",
          "Looks for the reason (price shock, slow page, confusing form).",
          "Fixes that step, then measures again.",
        ] },
        { title: "Bad reaction", subtitle: "Pour in more water", tone: "rose", items: [
          "Sees low sales and immediately increases ad budget.",
          "Only looks at total visitors and total sales.",
          "Guesses the cause without checking data.",
          "Changes five things at once, so cannot tell what worked.",
        ] },
      ] },

      { type: "heading", value: "Beyond the sale" },
      { type: "text", value: "AIDA stops at the purchase. This is where the model shows its age." },
      { type: "text", value: "Keeping customers and getting recommendations usually matter more to profit than finding new customers. Selling to an existing customer costs a fraction of winning a new one." },
      { type: "text", value: "So extend the journey with two more stages: Retention (they keep buying) and Advocacy (they bring others)." },
      { type: "table", headers: ["Extra stage", "What it looks like at Rosie's Bakery", "How to measure it"], rows: [
        ["Retention", "A loyalty card or a \"your birthday cake reminder\" email each year", "Percentage of customers who order again within 12 months"],
        ["Advocacy", "Asking happy customers for a Google review", "Number of new reviews per month; orders from \"a friend recommended you\""],
      ] },
      { type: "text", value: "The third column is the part to take seriously. Retention and advocacy are often described as attitudes, which makes them impossible to manage. Turned into a percentage and a monthly count, they become ordinary funnel stages with their own conversion rates and their own leaks." },
      { type: "text", value: "Rosie's retention rate of 12.5 per cent in the template above is the weakest number in her whole business, and it never appears in an ad report. Twenty-one of her twenty-four customers bought a cake, liked it, and were never contacted again. Winning those people back costs an email; winning a stranger costs an ad budget." },

      { type: "steps", title: "Build a simple funnel in Google Analytics 4 (free)", steps: [
        { label: "Open Explore", text: "In GA4, click Explore in the left menu, then choose the Funnel exploration template." },
        { label: "Edit the steps", text: "In the Settings panel, click the pencil icon next to Steps." },
        { label: "Add your stages as events", text: "For an online shop, use GA4's standard e-commerce events: view_item, add_to_cart, begin_checkout, purchase. Give each step a clear name, such as \"Viewed cake\"." },
        { label: "Choose a date range", text: "Pick the last 28 or 90 days, so you have enough visitors to see a pattern." },
        { label: "Read the drop-offs", text: "GA4 shows how many users completed each step and the abandonment rate between steps." },
        { label: "Mark the bottleneck", text: "Write down the step with the largest percentage drop. This is where to focus first." },
      ] },
      { type: "alert", value: "The funnel report only works if your site sends those events. Many shop platforms (such as Shopify or WooCommerce with the Google integration) send them automatically. If a step shows zero, check tracking before assuming nobody did it." },

      { type: "alert", value: "Before you suggest any new campaign, calculate the conversion rate between each pair of stages. The stage with the worst rate is where the money and effort should go. This one habit prevents most wasted budget." },

      { type: "warning", value: "Common beginner mistakes: (1) Buying more traffic when the real problem is lower down the funnel. (2) Looking only at the final sales number, not at each step. (3) Forgetting retention: a customer who orders once and never returns is expensive. (4) Comparing rates from very small numbers, such as 2 sales out of 10 visits, which can change wildly by chance. (5) Trusting a funnel report without checking that tracking is set up correctly." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: My business has no website. Can I still build a funnel? A: Yes, and the thinking is identical. Count the real-world equivalents: people who walked past the window, people who came in, people who asked a price, people who bought, people who came back. Tally them for a fortnight. A hand-counted funnel with honest numbers beats a dashboard you do not trust." },
      { type: "text", value: "Q: How many people do I need before the rates mean anything? A: There is no exact threshold, but be very careful below about 100 people in a stage. Two sales out of ten visits is 20 per cent, and one sale fewer next week makes it 10 per cent, with nothing having actually changed. When numbers are small, widen the date range or judge the trend over several months rather than one." },
      { type: "text", value: "Q: What if two stages are both bad? A: Fix the later one first, in most cases. A leak near the bottom wastes people who have already come all the way down, and those are the most expensive people you have. It is also usually the cheaper fix, because it is a page or a form rather than a whole channel." },
      { type: "text", value: "Q: My GA4 funnel shows a stage with zero users, but I know people do it. What now? A: Assume a tracking problem before a customer problem. Check that the event actually fires, that it is named exactly as the funnel step expects, and that names match case for case. GA4 event names are case-sensitive, so add_to_cart and Add_to_cart are two different events." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "For your course business, write the four AIDA stages down the left side of a page or spreadsheet.",
        "Next to each stage, write one real action a person takes (for example: sees an Instagram post, visits the menu page, adds to basket, pays).",
        "Find or estimate how many people did each action last month. Use GA4 if you have it; otherwise estimate and label the numbers \"estimated\".",
        "Calculate the conversion rate between each pair of stages: next step / this step x 100.",
        "Circle the lowest rate. Write one sentence on what might be causing people to leave there.",
        "Add a fifth row, Retention, and write how you could encourage a second purchase.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "A shop has 5,000 visitors, 400 add to basket and 8 buy. Where is the bottleneck? (Visit to basket is 400 / 5,000 = 8%. Basket to purchase is 8 / 400 = 2%. The bottleneck is checkout.)",
        "Why can buying more ads make a conversion problem worse? (You pay for more visitors, but the same leak loses most of them, so cost rises faster than sales.)",
        "Which two stages does AIDA leave out, and why do they matter? (Retention and Advocacy. Repeat customers and recommendations usually cost much less than winning new customers.)",
      ] },
    ],
    takeaways: [
      "The funnel is mainly a diagnostic tool: it shows where people drop out.",
      "Lots of visitors with few sales is a conversion problem, not an awareness problem.",
      "Always calculate the conversion rate between each pair of steps before spending more.",
      "Stage rates multiply, so doubling the worst percentage does far more than nudging a healthy one.",
      "Count people rather than sessions, and mark only one stage as the worst.",
      "Fixing the worst step often beats buying more traffic.",
      "Retention and advocacy usually matter more to profit than finding new customers.",
      "GA4's Funnel exploration can show your drop-offs for free, if tracking is set up.",
    ],
  },

  "dm-m1-l2": {
    title: "Defining Target Personas & Segments",
    objective: "build a persona from evidence and segment an audience usefully.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Think about buying a present. For a close friend, it is easy: you know what they like, what they already own and what they would never use. For a stranger, you guess, and you usually get it wrong." },
      { type: "text", value: "A persona turns your customers from strangers into people you know. Segments are like sorting your friends into groups, so each group gets the kind of message that suits them." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Persona", "A short, evidence-based description of a type of customer, so everyone on the team pictures the same person."],
        ["Segment", "A group of people within your audience who should be treated differently from other groups."],
        ["Segmentation", "The process of splitting an audience into segments."],
        ["Demographics", "Facts like age, gender, income and location."],
        ["Behavioural segment", "A group based on what people have done, such as bought before or left items in a basket."],
        ["Job to be done", "The real problem or task that makes someone look for a product, for example \"I need a birthday cake by Saturday\"."],
        ["B2B / B2C", "Business-to-business (selling to companies) and business-to-consumer (selling to members of the public)."],
        ["Support ticket", "A record of a customer asking for help or complaining."],
        ["First-party data", "Information you collect directly from your own customers, such as orders and email sign-ups."],
        ["Inactive / lapsed customer", "Someone who bought before but has not bought for a long time, such as 90 days."],
        ["Cart abandonment", "When someone adds items to their online basket but leaves without paying."],
      ] },

      { type: "heading", value: "What a persona is for" },
      { type: "text", value: "A persona is a short description of a real type of customer. It exists so that everyone writing adverts or choosing targeting is picturing the same person." },
      { type: "text", value: "Done well, it makes decisions sharper. Done badly, it is a made-up character with a stock photo that nobody ever looks at." },

      { type: "heading", value: "Evidence, not invention" },
      { type: "text", value: "The difference between a useful persona and a useless one is where the information came from." },
      { type: "text", value: "Good sources to use:" },
      { type: "list", items: [
        "Interviews with actual customers.",
        "Recordings or notes from sales calls.",
        "Support tickets and complaints.",
        "The search queries that bring people to your website.",
        "Reviews of your competitors (what people praise and what annoys them).",
      ] },

      { type: "example", title: "Invented versus evidenced", value: "Invented:\n  \"Marketing Mary, 34, likes yoga and travel, wants to grow her brand.\"\n  -> Demographics with no effect on the buying decision.\n\nEvidenced:\n  \"Runs marketing alone at a 20-person B2B firm. Judged on lead volume.\n   Has a budget but no time. Distrusts agencies after one bad contract.\n   Searches for templates and checklists, not theory.\"\n  -> Every line changes what you would write and where you would place it." },
      { type: "text", value: "Test any persona line with one question: what would I do differently if this line were the opposite? \"Likes yoga\" fails, because nothing changes if she does not. \"Distrusts agencies after a bad contract\" passes, because it tells you to lead with a short trial and a clear cancellation policy rather than a twelve-month retainer." },
      { type: "text", value: "That test is also a good way to cut a bloated persona down. Delete every line that fails it. What is left is short, which is exactly why people will actually read it." },

      { type: "compare", columns: [
        { title: "Evidenced persona", subtitle: "Changes decisions", tone: "olive", items: [
          "Based on real interviews, reviews and search data.",
          "Describes the problem they are trying to solve.",
          "Notes what they tried before and why it failed.",
          "Lists what makes them distrust a seller.",
          "Says where they look for answers.",
        ] },
        { title: "Invented persona", subtitle: "Looks nice, changes nothing", tone: "rose", items: [
          "Written from imagination in a meeting.",
          "Focuses on hobbies and a stock photo.",
          "Age and job title with no link to buying.",
          "No sources listed.",
          "Never used again after it is created.",
        ] },
      ] },

      { type: "heading", value: "What a persona should contain" },
      { type: "list", items: [
        "The job they are trying to get done: the real problem that makes them search.",
        "What they have already tried, and why it did not work.",
        "What would make them distrust or reject a solution.",
        "Where they look for answers.",
        "Who else is involved in the decision.",
      ] },

      { type: "example", title: "Rosie's Bakery: an evidenced persona (illustrative)", value: "Name: \"The Last-Minute Party Parent\"\n\nEvidence used:\n  - 6 phone chats with recent cake customers\n  - 40 Google reviews of Rosie's and two nearby bakeries\n  - Search Console queries such as \"birthday cake near me\"\n    and \"same week custom cake\"\n\nJob to be done:\n  Get a personalised birthday cake with only a few days' notice.\nTried before:\n  Supermarket cakes (\"looked cheap\"); a home baker who\n  cancelled the day before.\nWhat makes them distrust a seller:\n  No clear prices online; no photos of real cakes.\nWhere they look:\n  Google search on their phone; local parents' Facebook group.\nOthers involved:\n  Often the other parent, and sometimes the child choosing a design.\n\nWhat this changes:\n  Show prices and \"order by Wednesday for Saturday\" on the website;\n  post real cake photos; ask happy parents to recommend Rosie's\n  in local Facebook groups." },

      { type: "heading", value: "Segmentation" },
      { type: "text", value: "Segmentation splits an audience into groups that are worth treating differently." },
      { type: "text", value: "The test is simple: does the split change what you would do? Splitting by age is only useful if a 25-year-old and a 45-year-old need different messages." },
      { type: "text", value: "Behavioural segments usually earn their place. Examples are: has bought before, abandoned a basket, or has been inactive for 90 days. Each one points to a different action." },
      { type: "table", headers: ["Segment", "What it tells you", "Action it suggests"], rows: [
        ["Bought in the last 90 days", "They like you and are active", "Thank-you email, ask for a review, suggest a related product"],
        ["Abandoned basket", "Interested but something stopped them", "Reminder email within 24 hours, answer common worries (delivery, price)"],
        ["Inactive for 90+ days", "They may have forgotten you", "Win-back email with a reason to return"],
        ["Signed up but never bought", "Curious but not convinced", "Show reviews and a simple first-order offer"],
      ] },
      { type: "text", value: "Every row in that table maps onto a funnel stage from the previous lesson. Abandoned basket is a leak at Action. Signed up but never bought is a leak at Desire. Inactive for 90 days is a leak at Retention. Segments are not a separate subject: they are the funnel, seen from the customer's side." },
      { type: "text", value: "That is also why behavioural segments beat demographic ones for a small business. Age tells you who someone is. Behaviour tells you where they got stuck, and only the second of those tells you what to send them on Tuesday morning." },
      { type: "text", value: "One practical caution: segments built from customer data are still personal data. Under UK GDPR you need a lawful basis to hold it, you must tell people what you do with it, and you must honour requests to delete it. Keeping segments simple and few makes that obligation much easier to meet." },

      { type: "example", title: "Rosie's Bakery: is a win-back email worth it? (illustrative figures)", value: "Rosie's email list: 1,500 people\n  Inactive for 90+ days:  600\n\nShe sends one win-back email: \"We miss you - new autumn bakes\".\n  Suppose 3% of them order:\n  600 x 0.03 = 18 orders\n  18 orders x £18 average = £324 revenue\n\nCost: about an hour of writing, plus her email tool.\nSending the same generic email to all 1,500 would give\nrecent buyers a \"we miss you\" message that makes no sense." },
      { type: "text", value: "The £324 is the small part of that sum. The large part is that the segment made the message possible at all. \"We miss you\" is only a sensible sentence to send to someone who has been away, and there is no version of it that works for all 1,500 people at once." },
      { type: "text", value: "Note also what the 3 per cent is: an assumption, not a measurement. Before you send, write down the rate you expect and why. Afterwards, compare. Over four or five sends you will learn what your list actually does, and your forecasts will stop being wishes." },

      { type: "example", title: "Rosie's Bakery: one message, before and after segmenting (illustrative)", value: "The task: promote the new autumn range to 1,500 subscribers.\n\nBEFORE — one email to everybody\n  Subject: Our new autumn range is here!\n  Body:    \"Hello! We have new autumn bakes in store. Come and\n            try them. We miss you!\"\n  Sent to: all 1,500\n  Result:  22 orders (1.5%), 31 unsubscribes\n\nWhy it underperformed:\n  - The 340 people who ordered last week were told they were\n    missed. That reads as careless.\n  - The 180 people who signed up but never bought were given\n    no reason to trust a first order.\n  - One subject line had to suit three very different states\n    of mind, so it suited none of them.\n\nAFTER — the same content, split three ways\n  Segment A: ordered in the last 90 days (340 people)\n    Subject: Your usual, now in an autumn version\n    Angle:   thank them, name the bake closest to their last\n             order, ask for a Google review\n    Result:  27 orders (7.9%), 1 unsubscribe\n\n  Segment B: signed up, never ordered (180 people)\n    Subject: Not sure yet? Here is what people order first\n    Angle:   three reviews, a photo, and the delivery cut-off\n    Result:   9 orders (5.0%), 4 unsubscribes\n\n  Segment C: inactive 90+ days (600 people)\n    Subject: It has been a while - the autumn bakes are in\n    Angle:   what has changed since they last ordered\n    Result:  18 orders (3.0%), 12 unsubscribes\n\n  Remaining 380 people: no clear state, left out of this send.\n\n  Totals: 54 orders against 22, and 17 unsubscribes against 31.\n\nWhat it cost Rosie:\n  About 40 extra minutes writing two more versions. No extra\n  software, no extra send cost.\n\n(All figures illustrative. Rates vary hugely by business.)" },
      { type: "text", value: "Two details in that example are worth copying. First, the unsubscribe count fell as well as the order count rising, because fewer people received something irrelevant. Second, 380 people were deliberately left out. A segment you cannot write a specific message for is a segment you should not send to that week." },

      { type: "heading", value: "Copy-paste template: the persona one-pager" },
      { type: "text", value: "One page, five sections, a source beside every line. If a line has no source, it is a guess, and it should be labelled as one until you can check it." },
      { type: "example", title: "Template: persona one-pager (copy the labels)", value: "PERSONA NAME (describe the situation, not the person):\n  e.g. \"The Last-Minute Party Parent\", not \"Sarah, 38\"\n\nEvidence used (list it, with dates):\n  - interviews:\n  - reviews read (yours and competitors'):\n  - search queries:\n  - support messages or complaints:\n\n1. Job to be done                                [source]\n   What are they actually trying to achieve, in their words?\n\n2. What they tried before, and why it failed     [source]\n\n3. What makes them distrust or reject a seller   [source]\n\n4. Where they look for answers                   [source]\n\n5. Who else is involved in the decision          [source]\n\nSO WHAT (this section is compulsory):\n  - One thing we will change on the website:\n  - One thing we will change in our wording:\n  - One channel this tells us to use, or drop:\n\nConfidence: high / medium / low, and why.\nReview date (no later than 6 months from today):\n\nRules:\n  - Delete any line that would not change a decision if it\n    were the opposite.\n  - No stock photo. It adds nothing and invites invention.\n  - Two or three personas maximum for a small business.\n  - If a line has no source, write GUESS next to it." },
      { type: "text", value: "The \"so what\" section is the one that keeps personas alive. A persona that never produced a change to a page, a sentence or a channel choice was an exercise, not a tool, and it will be quietly ignored within a month." },

      { type: "alert", value: "Do not create more segments than you can actually serve. Three segments with tailored messages beat twelve that all receive the same generic email." },

      { type: "steps", title: "Collect persona evidence in 30 minutes with free tools", steps: [
        { label: "Search queries (Google Search Console)", text: "Open Performance, then Search results, and click the Queries tab. Note the words people use, for example \"gluten free cake delivery\". These show the job they are trying to get done." },
        { label: "Audience facts (Meta Business Suite)", text: "Open Insights, then Audience. Check the age range, gender split and top towns or cities of your followers. Treat these as clues, not a persona." },
        { label: "Reviews (Google Maps)", text: "Search for two competitors on Google Maps. Read 10 good and 10 bad reviews. Copy the exact phrases people use about what they loved and what went wrong." },
        { label: "Behaviour (Google Analytics 4)", text: "Open Reports, then Engagement, then Pages and screens. See which pages get the most views. Popular pages show what people care about." },
        { label: "Customer conversations", text: "Ask three recent customers: \"What were you trying to do when you found us? What did you try before? What nearly stopped you buying?\"" },
        { label: "Write it up", text: "Fill in the five persona sections using only what you found. Next to each line, note the source." },
      ] },

      { type: "warning", value: "Common beginner mistakes: (1) Inventing personas in a meeting without talking to any customers. (2) Filling personas with hobbies and favourite colours that do not affect buying. (3) Creating ten personas when the business can only serve two or three well. (4) Treating social media audience data as a full persona; it only shows who follows you, not why they buy. (5) Making segments that all get the same message anyway. (6) Collecting personal data without telling customers or following data protection rules such as UK GDPR." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: How many customers do I need to interview? A: Five or six conversations usually surface most of the recurring themes for a small business, and you will notice the same phrases repeating. Stop when a new interview tells you nothing new. Six real conversations are worth more than a hundred-person survey full of tick boxes." },
      { type: "text", value: "Q: My business genuinely sells to everyone. Do I still need a persona? A: Almost no business sells to everyone equally. Look at who actually buys most often and spends most, and start there. A persona is not a claim that nobody else may buy; it is a decision about whom your wording should suit best when it cannot suit everyone." },
      { type: "text", value: "Q: Should I give the persona a name and a photo? A: A name helps, because it makes the persona easy to refer to in conversation. Use a name that describes the situation, such as \"The Last-Minute Party Parent\". Skip the stock photo: it adds no information and it tempts people to invent personality traits that nobody researched." },
      { type: "text", value: "Q: How often should a persona be updated? A: Review it at least every six months, and immediately after any big change in the business, such as a new product, a price rise or a new location. Personas rot quietly. The dated evidence list at the top of the template is what tells you how stale it has become." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Open Google Maps and find two competitors of your course business.",
        "Read at least 10 reviews for each. Copy 5 exact phrases about what customers wanted or what disappointed them.",
        "If you have access, copy the top 10 queries from Google Search Console for your business.",
        "Using only this evidence, write a draft persona with the five sections: job to be done, tried before, distrust triggers, where they look, others involved.",
        "List three behavioural segments for your business and one action for each.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "What is the simple test for whether a segment is useful? (Whether splitting people into that group changes what you would say or do for them.)",
        "Why is \"likes yoga and travel\" usually a poor persona detail? (It has no effect on the buying decision, so it does not change your message or where you place it.)",
        "Name two good sources of persona evidence. (Any two of: customer interviews, sales calls, support tickets, search queries, competitor reviews.)",
      ] },
    ],
    takeaways: [
      "Build personas from real evidence: interviews, tickets, reviews and search data.",
      "Focus on the job to be done and what people tried before, not hobbies.",
      "Note what makes customers distrust a seller and where they look for answers.",
      "A segment is only useful if it changes what you would do.",
      "Behavioural segments (bought, abandoned, inactive) usually work better than age or gender alone.",
      "Keep segments few enough that each gets a truly tailored message.",
      "Delete any persona line that would not change a decision if it were the opposite.",
      "Every persona needs a \"so what\" section, or it will never be used again.",
      "Customer data is personal data: hold it lawfully, explain it, and delete it on request.",
    ],
  },

  "dm-m1-l3": {
    title: "Mapping Marketing Channels to Goals",
    objective: "choose channels by funnel stage and business constraint rather than by fashion.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Think about fishing. If you want a quick catch, you go where the fish are already gathering. If there are no fish nearby, you first need to attract them, which takes longer." },
      { type: "text", value: "Marketing channels work the same way. Some channels catch people who are already looking for you. Others attract people who were not looking yet. Choosing the right one depends on your goal, your budget and how quickly you need results." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Channel", "A way of reaching people, such as Google search, Instagram or email."],
        ["SEO (Search Engine Optimisation)", "Improving your website so it appears higher in unpaid Google results."],
        ["Paid search (PPC)", "Ads shown on search results when someone searches certain words. PPC means pay-per-click: you pay when someone clicks."],
        ["Paid social", "Ads on social platforms such as Facebook, Instagram or TikTok."],
        ["Organic social", "Normal, unpaid posts on your social media accounts."],
        ["Content", "Useful material you publish, such as blog posts, videos and guides."],
        ["Demand", "How many people already want, and are searching for, what you sell."],
        ["Owned / earned / paid", "Owned: channels you control (website, email list). Earned: attention others give you (reviews, press). Paid: advertising."],
        ["Algorithm", "The rules a platform uses to decide who sees which posts."],
        ["CPC (Cost Per Click)", "Ad spend / number of clicks."],
        ["CTR (Click-Through Rate)", "Clicks / times the ad was shown, x 100. Shows how appealing the ad is."],
        ["CPA (Cost Per Acquisition)", "Ad spend / number of sales (or sign-ups). The cost of one result."],
        ["ROAS (Return On Ad Spend)", "Revenue from ads / ad spend. A ROAS of 3 means £3 of sales for every £1 spent."],
        ["Marginal cost", "The extra cost of doing one more of something, such as sending one more email."],
        ["UTM parameters", "Short tags added to the end of a link so analytics tools can tell which campaign a visitor came from."],
      ] },

      { type: "heading", value: "Why channels are not interchangeable" },
      { type: "text", value: "Each channel has a natural place in the funnel, a typical cost and a typical speed." },
      { type: "text", value: "If you choose badly, you might pay for awareness when you needed sales. Or you might wait months for results you needed this quarter." },

      { type: "heading", value: "Channel characteristics" },
      { type: "table", headers: ["Channel", "Best for", "Speed", "Cost profile"], rows: [
        ["SEO", "Attention and interest", "Slow: months", "Lots of effort up front, then keeps paying back over time"],
        ["Paid search", "Action: captures existing demand", "Immediate", "Ongoing; stops when the budget stops"],
        ["Paid social", "Attention: creates demand", "Immediate", "Ongoing; needs new images and videos regularly"],
        ["Organic social", "Attention and advocacy", "Slow", "Takes a lot of time; reach is unpredictable"],
        ["Email", "Desire, action and retention", "Immediate, to people already on the list", "Very low cost per email; you must build the list first"],
        ["Content", "Interest and desire", "Slow", "Keeps paying back; supports every other channel"],
      ] },
      { type: "text", value: "The Speed column is the one that decides most real arguments. If a business needs orders this month, the slow channels are irrelevant however good they are, and starting them in a panic is how businesses end up with an abandoned blog. Speed is not a quality judgement; it is a constraint." },
      { type: "text", value: "The Cost profile column matters just as much, because the two kinds of cost behave differently. Ads are a tap: turn off the money and the visitors stop the same day. Search optimisation and content are more like a wall: slow to build, but it stays up. A sensible plan usually has one of each, so the business is neither broke nor standing still." },

      { type: "heading", value: "The critical distinction" },
      { type: "text", value: "Paid search captures existing demand. People are already looking for what you sell." },
      { type: "text", value: "Paid social creates demand. People were not looking, and your ad interrupted them." },
      { type: "text", value: "That difference drives everything. Search usually converts faster, but it is limited by how many people are searching. Social can reach far more people, but the ad must do the persuading first." },

      { type: "compare", columns: [
        { title: "Paid search", subtitle: "Catches people already looking", tone: "honey", items: [
          "Someone types \"birthday cake delivery Leeds\".",
          "Your ad appears at that moment.",
          "High intent, so often a higher conversion rate.",
          "Limited by how many people search each month.",
        ] },
        { title: "Paid social", subtitle: "Reaches people not yet looking", tone: "honey", items: [
          "Someone scrolls Instagram and sees your cake video.",
          "They were not planning to buy a cake today.",
          "Lower intent, so the ad must create the desire.",
          "Can reach many more people, by interest and location.",
        ] },
      ] },

      { type: "alert", value: "If nobody searches for your product because the category is new, paid search has nothing to capture. On the other hand, if demand exists and competitors are winning it, spending on social awareness solves a problem you do not have." },

      { type: "example", title: "Rosie's Bakery: which channel for 40 extra cake orders this month? (illustrative figures)", value: "Average cake order: £45\n\nPaid search test (£200 budget)\n  Cost per click (CPC):     £0.80\n  Clicks = £200 / £0.80 =   250\n  Conversion rate:          6%\n  Orders = 250 x 0.06 =     15\n  CPA = £200 / 15 =         £13.33 per order\n  Revenue = 15 x £45 =      £675\n  ROAS = £675 / £200 =      3.4\n\nPaid social test (£200 budget)\n  Cost per click (CPC):     £0.40\n  Clicks = £200 / £0.40 =   500\n  Conversion rate:          1.6%\n  Orders = 500 x 0.016 =    8\n  CPA = £200 / 8 =          £25 per order\n  Revenue = 8 x £45 =       £360\n  ROAS = £360 / £200 =      1.8\n\nEmail to her existing list (1,200 people)\n  2% order: 1,200 x 0.02 =  24 orders\n  Revenue = 24 x £45 =      £1,080\n  Extra cost: almost nothing beyond her email tool\n\nTotal: 15 + 8 + 24 = 47 orders, above the 40-order goal.\n\nLesson: cheaper clicks (social) did not mean cheaper orders.\nEmail was the best performer, but only because Rosie spent\nthe previous year building the list. For quick sales this\nmonth, paid search and email fit. Social is better used to\ngrow the list for next time. ROAS here uses revenue; profit\nafter ingredients would be lower." },
      { type: "text", value: "The line to remember is that social clicks were half the price of search clicks and social orders were nearly twice the price. Cost per click measures how cheaply you can buy attention. Cost per acquisition measures how cheaply you can buy a customer. Only the second one pays wages." },
      { type: "text", value: "The final caution about ROAS is not a footnote. A ROAS of 3.4 sounds comfortable, but if Rosie keeps 40 per cent after ingredients and packaging, her £675 of revenue is £270 of gross profit against £200 of spend. The channel is still worth running, but the margin is thin enough that a small rise in click costs would wipe it out." },
      { type: "text", value: "The email column is the one people misread. It looks free, and it is not: it is the payoff from a year of collecting addresses. Treat a strong email result as evidence that list-building deserves budget, not as evidence that you never needed to spend anything." },

      { type: "example", title: "Rosie's Bakery: one campaign, before and after choosing by goal (illustrative)", value: "The goal: 40 extra cake orders in 4 weeks. Budget: £400.\n\nBEFORE — how Rosie planned it the first time\n  £100 TikTok  - \"everyone is on TikTok now\"\n  £100 Instagram - \"we already post there\"\n  £100 Facebook  - \"our customers are older\"\n  £100 Google    - \"we should probably do Google too\"\n  No tagged links. Goal written as \"raise our profile\".\n\n  What happened:\n    - Four sets of ad images to make, for one person.\n    - £100 is too little for any platform to learn from.\n    - Traffic all appeared in GA4 as generic social and direct.\n    - 11 orders. Nobody could say which £100 produced them.\n    - Nothing could be repeated, because nothing was known.\n\nAFTER — the same £400, planned from the goal backwards\n  Step 1: what stage is the problem? Orders, not awareness.\n          So: channels that reach people close to buying.\n  Step 2: is there demand to capture? Google Trends shows\n          steady searches for \"birthday cake delivery Leeds\".\n          So: paid search is available, not a guess.\n  Step 3: what do we already own? A 1,200-person email list.\n          So: use it first, because it costs almost nothing.\n\n  £250 Google Search - capture existing demand\n         one campaign, one ad group, 8 close-match terms,\n         negative keywords for \"jobs\", \"recipe\", \"free\"\n  £150 Meta ads     - one goal only: email sign-ups, so the\n         list is bigger for the NEXT campaign\n  £0   Email        - two sends to the existing list\n  Every link tagged with UTM parameters.\n\n  What happened:\n    - 19 orders from search, 24 from email, 2 from Meta,\n      plus 96 new subscribers from Meta.\n    - 45 orders against a goal of 40.\n    - Rosie knows the source of every single order.\n    - Next quarter starts with a list of 1,296, not 1,200.\n\nThe budget was identical. The difference was deciding the\ngoal and the funnel stage before choosing any channel.\n\n(All figures illustrative.)" },
      { type: "text", value: "The deepest difference between the two plans is not the split of money. It is that the second plan gave each channel one job it could be judged on. Meta was not asked for orders, so two orders is not a failure: 96 subscribers is the result it was bought for." },

      { type: "heading", value: "Copy-paste template: the channel-to-goal grid" },
      { type: "text", value: "Fill one row per channel you are considering, including the ones you decide against. Writing down why you rejected a channel stops the same argument happening every quarter." },
      { type: "example", title: "Template: channel-to-goal grid (copy the column headings)", value: "Goal: 40 extra cake orders in 4 weeks    Budget: £400\n\nChannel | Funnel stage | Job (one only) | Success measure | Budget | Fast enough? | Can we run it well? | Decision\n\nPaid search   | Action    | Capture people searching now | Orders under £15 each | £250 | Yes | Yes, 1 campaign | RUN\nEmail         | Desire/Action | Sell to people who know us | 20+ orders | £0 | Yes | Yes | RUN\nPaid social   | Attention | Grow the email list | 80+ sign-ups | £150 | Yes | Yes, 1 creative set | RUN\nSEO           | Attention/Interest | Rank for cake terms | Ranking positions | £0 | No, months | Yes | START, judge next quarter\nOrganic social| Attention | Show real cakes | Saves and shares | £0 | No | Barely, 2 posts a week | KEEP SMALL\nTikTok        | Attention | -                | -               | £0 | Yes | No, no video skills, no time | REJECT\nPrint flyers  | Attention | -                | -               | £0 | Yes | Yes but untrackable | REJECT for now\n\nRules for filling it in:\n  - One job per channel. A channel with two jobs has none.\n  - The success measure must be a number you can actually get.\n  - If \"Can we run it well?\" is no, the answer is REJECT, no\n    matter how good the channel is in theory.\n  - Keep the rejected rows. They are the record of your reasoning.\n  - Name one owned, one earned and one paid channel across the\n    grid, so the plan is not resting on a single platform.\n\n(Figures illustrative.)" },
      { type: "text", value: "The \"can we run it well?\" column is where most small-business plans should shrink. A channel run badly is worse than a channel not run at all, because it costs the same hours and produces an empty account that customers can see." },

      { type: "heading", value: "Owned, earned and paid" },
      { type: "list", items: [
        "Owned: your website and email list. You control them, and nobody can take them away.",
        "Earned: press coverage, reviews and word of mouth. Most trusted, but hardest to control.",
        "Paid: advertising. Fastest and most predictable, but it stops when the money stops.",
      ] },
      { type: "text", value: "A strategy that depends on only one of these is fragile." },
      { type: "text", value: "Businesses built only on one social platform lose their audience when the algorithm changes. Businesses built only on paid ads have nothing left when budgets are cut." },
      { type: "text", value: "The standard fix is to turn paid and earned attention into an owned email list. For example, run an ad that offers a useful free guide or a small discount in exchange for an email address." },

      { type: "compare", columns: [
        { title: "Good channel choice", subtitle: "Fits goal and limits", tone: "olive", items: [
          "Starts from the goal and the deadline.",
          "Checks whether people already search for the product.",
          "Picks 1 to 3 channels the team can run well.",
          "Tracks every link with UTM tags to compare results.",
          "Uses ads to grow the email list as well as sell.",
        ] },
        { title: "Bad channel choice", subtitle: "Follows fashion", tone: "rose", items: [
          "Starts on TikTok because \"everyone is there\".",
          "Expects SEO to bring sales next week.",
          "Spreads a small budget across six platforms.",
          "Judges channels by cost per click, not cost per sale.",
          "Relies on one platform and owns no customer contacts.",
        ] },
      ] },

      { type: "steps", title: "Check search demand before choosing paid search (free tools)", steps: [
        { label: "Open Google Trends", text: "Go to trends.google.com. Type a phrase customers would use, such as \"custom birthday cake\"." },
        { label: "Set your country and time range", text: "Choose your country (for example United Kingdom) and \"Past 12 months\" to see seasonal patterns." },
        { label: "Compare phrases", text: "Add one or two alternatives, such as \"birthday cake delivery\". The higher line has more relative interest." },
        { label: "Get rough volumes (optional)", text: "In Google Ads, open Tools, then Keyword Planner, then \"Get search volume and forecasts\". A free Google Ads account is needed; ranges are shown if you are not spending." },
        { label: "Decide", text: "Steady, clear searches suggest paid search can capture demand. Almost no searches suggest you need to create demand with social and content first." },
      ] },

      { type: "steps", title: "Track which channel brings sales with UTM tags and GA4", steps: [
        { label: "Open the Campaign URL Builder", text: "Search for Google's \"GA4 Campaign URL Builder\" and open it." },
        { label: "Enter your page address", text: "For example: https://rosiesbakery.co.uk/birthday-cakes" },
        { label: "Fill in the tags", text: "campaign source: facebook; campaign medium: paid_social; campaign name: birthday_cakes_oct. Use lower case and keep names consistent." },
        { label: "Copy the tagged link", text: "The tool creates a link ending in something like ?utm_source=facebook&utm_medium=paid_social&utm_campaign=birthday_cakes_oct. Use this link in your ad." },
        { label: "Repeat for each channel", text: "Make a separate link for email (source: newsletter, medium: email), and so on. Keep a list of links in your spreadsheet." },
        { label: "Check results in GA4", text: "After a few days, open Reports, then Acquisition, then Traffic acquisition. Change the table's first column to Session campaign. Compare sessions and key events (such as purchases) for each campaign." },
      ] },

      { type: "warning", value: "Common beginner mistakes: (1) Choosing channels because they are popular, not because they fit the goal. (2) Expecting SEO or organic social to produce sales within weeks. (3) Judging ads by cheap clicks instead of cost per sale (CPA). (4) Running paid search for a new product nobody searches for. (5) Building the whole business on one social platform and never collecting email addresses. (6) Forgetting UTM tags, so all ad visits look like generic social traffic in GA4. (7) Using mixed capitals in UTM tags (\"Facebook\" and \"facebook\"), which GA4 shows as separate sources." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: How many channels should a small business run? A: One to three, run properly. The limit is not budget, it is attention: each channel needs someone to make the material, watch the numbers and respond to people. A business running two channels well usually beats the same business running six thinly." },
      { type: "text", value: "Q: My competitor is on a platform I am not. Should I join it? A: Not on that basis alone. You cannot see their results, only their activity, and plenty of accounts are busy and unprofitable. Add the platform to your channel grid, give it a job and a success measure, and let it compete with your other options on merit." },
      { type: "text", value: "Q: Should I ever put UTM tags on links to my own website from my own pages? A: No. Internal links with UTM tags start a new session in GA4 and make it look as though your visitor arrived from outside, which breaks the very report you are trying to read. Tag only links that arrive from somewhere else: ads, emails, other people's sites and printed QR codes." },
      { type: "text", value: "Q: How long should I run a channel before judging it? A: Long enough to get a meaningful number of results, and long enough to cover the normal ups and downs of your week. For paid search on a small budget, four weeks is a sensible minimum. For search optimisation or organic social, judge at three to six months. Decide the review date before you start, and write it down." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Write one clear goal for your course business with a number and a deadline, for example \"20 extra bookings in the next 6 weeks\".",
        "Use Google Trends to check whether people search for its main product in your country.",
        "Using the channel table, pick two channels that fit the goal and the deadline. Write one sentence explaining each choice.",
        "Name one owned, one earned and one paid channel the business could use.",
        "Use the Campaign URL Builder to create one tagged link for one of your chosen channels, and save it in your spreadsheet.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "What is the key difference between paid search and paid social? (Paid search captures people already looking for what you sell; paid social reaches people who were not looking and has to create the desire.)",
        "An ad costs £300 and brings 12 sales worth £40 each. What are the CPA and ROAS? (CPA = £300 / 12 = £25. Revenue = 12 x £40 = £480, so ROAS = £480 / £300 = 1.6.)",
        "Why is turning ad and social audiences into an email list a good idea? (The email list is an owned channel. You keep it even if a platform changes its algorithm or you stop paying for ads.)",
      ] },
    ],
    takeaways: [
      "Match the channel to the funnel stage, your budget and how quickly you need results.",
      "Paid search captures existing demand; paid social creates new demand.",
      "SEO and content are slow but keep paying back; ads stop when spending stops.",
      "Judge channels by cost per sale and return on ad spend, not by cheap clicks.",
      "Turn paid and earned attention into owned channels, especially an email list.",
      "Tag links with UTM parameters so GA4 can show which channel actually brings sales.",
      "Give every channel exactly one job and one success measure, and record the channels you rejected.",
      "If you cannot run a channel well, reject it, however promising it looks in theory.",
    ],
  },
};

export const overviewAndModule1Quizzes: Record<string, QuizQuestion[]> = {
  'dm-m1-quiz': [
    {
      id: 1,
      question: 'A site has high traffic but very few sales. What does the funnel tell you?',
      options: [
        'It is a conversion problem, so more traffic will not help',
        'It is an awareness problem, so buy more ads',
        'The product must be priced wrongly',
        'The site needs more social followers',
      ],
      correctAnswer: 'It is a conversion problem, so more traffic will not help',
    },
    {
      id: 2,
      question: 'What should a persona be built from?',
      options: [
        'Customer interviews, support messages, reviews and search queries',
        'Demographic assumptions and a stock photo',
        'A competitor\u2019s marketing materials',
        'The owner\u2019s intuition about who buys',
      ],
      correctAnswer: 'Customer interviews, support messages, reviews and search queries',
    },
    {
      id: 3,
      question: 'What is the test for whether a segment is useful?',
      options: [
        'Whether the split changes what you would actually say or do',
        'Whether it contains at least 1,000 people',
        'Whether it is based on age and location',
        'Whether your email tool supports it',
      ],
      correctAnswer: 'Whether the split changes what you would actually say or do',
    },
    {
      id: 4,
      question: 'What is the key difference between paid search and paid social?',
      options: [
        'Search captures demand that already exists; social has to create it',
        'Search is free to appear in; social always costs money',
        'Search only works for business-to-business companies',
        'Social always converts faster than search',
      ],
      correctAnswer: 'Search captures demand that already exists; social has to create it',
    },
    {
      id: 5,
      question: 'Why does it matter to build an owned channel such as an email list?',
      options: [
        'Reach borrowed from a platform can be reduced or withdrawn without notice',
        'Owned channels are always cheaper to set up than paid ones',
        'Search engines rank businesses with email lists more highly',
        'It is a legal requirement for online shops in the UK',
      ],
      correctAnswer: 'Reach borrowed from a platform can be reduced or withdrawn without notice',
    },
    {
      id: 6,
      question: 'A campaign delivers 500 clicks at 40p each and 8 orders. A second delivers 200 clicks at 90p each and 14 orders. Which is performing better, and on what measure?',
      options: [
        'The second, on cost per order: about GBP 12.86 against GBP 25',
        'The first, because its clicks cost less than half as much',
        'The first, because it reached more people in total',
        'Neither can be compared without knowing the follower counts',
      ],
      correctAnswer: 'The second, on cost per order: about GBP 12.86 against GBP 25',
    },
  ],
};

export const overviewAndModule1Assignments: Record<string, MarketingAssignment> = {
  'dm-m1-assignment': {
    title: 'Funnel Diagnosis, Persona & Channel Plan',
    questions: [
      {
        kind: 'mcq',
        prompt: 'A Plymouth opticians has 6,000 website visits a month, 900 people reach the appointment-booking page and 36 book an eye test. The owner wants to double the advertising budget to get 12,000 visits. What is the strongest advice?',
        options: [
          'Fix the booking step first: 36 of 900 is 4 per cent, so doubling traffic doubles the cost while the same leak loses the same share',
          'Double the budget, because more visits will always produce proportionally more bookings',
          'Do nothing until a full year of data is available',
          'Move the whole budget to social media, because visits are the problem',
        ],
        correctAnswer: 'Fix the booking step first: 36 of 900 is 4 per cent, so doubling traffic doubles the cost while the same leak loses the same share',
      },
      {
        kind: 'mcq',
        prompt: 'A Norwich garden centre reports its quarter as: 42,000 impressions, 1,900 new followers and 310 likes on the best post. The owner asks whether the quarter went well. What is the most useful reply?',
        options: [
          'None of those numbers answers the question, because none of them is tied to a stated goal or to orders and enquiries',
          'Yes, because follower growth of 1,900 in a quarter is strong for a local business',
          'No, because 42,000 impressions is a low figure for that audience size',
          'It cannot be judged at all until the business has at least 10,000 followers',
        ],
        correctAnswer: 'None of those numbers answers the question, because none of them is tied to a stated goal or to orders and enquiries',
      },
      {
        kind: 'mcq',
        prompt: 'A Dundee gym\u2019s persona document says: \u201cFiona, 29, enjoys hiking and box sets, drinks oat lattes, drives a hatchback.\u201d What is the main problem with it?',
        options: [
          'None of those details would change the wording, the offer or the channel choice, so the persona cannot influence any decision',
          'It names only one person, when at least ten personas are needed',
          'It does not state her income, which is the most important persona field',
          'It should have used a stock photo so the team can picture her',
        ],
        correctAnswer: 'None of those details would change the wording, the offer or the channel choice, so the persona cannot influence any decision',
      },
      {
        kind: 'mcq',
        prompt: 'A new business sells a product category almost nobody searches for yet. Google Trends shows near-zero search interest in the United Kingdom. Which channel choice follows from that?',
        options: [
          'Paid search has little existing demand to capture, so demand must be created first through social, content and partnerships',
          'Paid search is the safest option, because the clicks will be very cheap',
          'Email should be used first, even though the business has no list yet',
          'The product cannot be marketed online at all until searches appear',
        ],
        correctAnswer: 'Paid search has little existing demand to capture, so demand must be created first through social, content and partnerships',
      },
      {
        kind: 'mcq',
        prompt: 'An opticians tags its newsletter links with utm_source=Newsletter in January and utm_source=newsletter in February, and also adds UTM tags to the internal links between its own pages. What will GA4 show?',
        options: [
          'Two separate sources for one newsletter, and internal clicks wrongly recorded as new visits from outside the site',
          'One combined newsletter source, because GA4 ignores capitalisation',
          'Nothing at all, because UTM tags only work on paid advertising links',
          'Accurate data, since GA4 automatically merges duplicate source names',
        ],
        correctAnswer: 'Two separate sources for one newsletter, and internal clicks wrongly recorded as new visits from outside the site',
      },
      {
        kind: 'mcq',
        prompt: 'A garden centre spends GBP 800 on ads and wins 40 new customers. Each customer spends GBP 45 an order, orders 3 times a year for 2 years, and the business keeps 35 per cent after stock costs. What do CAC and LTV look like?',
        options: [
          'CAC is GBP 20 and LTV is about GBP 94.50, because LTV must be calculated on gross profit rather than on total sales',
          'CAC is GBP 20 and LTV is GBP 270, because lifetime value is the total the customer spends',
          'CAC is GBP 800 and LTV is GBP 45, because one campaign wins one customer at a time',
          'Neither can be calculated without knowing the click-through rate',
        ],
        correctAnswer: 'CAC is GBP 20 and LTV is about GBP 94.50, because LTV must be calculated on gross profit rather than on total sales',
      },
      {
        kind: 'text',
        prompt: "CASE STUDY 1 - Find the leak in a quarter of channel data.\n\nThorpe Green Garden Centre sits on the edge of Norwich. It sells plants, compost and garden furniture, and has had an online shop for two years. The owner, Marek, has been sent the figures below for July to September. All figures are illustrative.\n\nChannel | Visits | Email sign-ups | Orders | Revenue | Spend\nOrganic search | 14,200 | 410 | 236 | GBP 11,800 | GBP 0\nPaid search | 3,600 | 62 | 144 | GBP 8,640 | GBP 2,400\nPaid social | 9,800 | 118 | 49 | GBP 2,205 | GBP 2,100\nEmail | 2,050 | - | 205 | GBP 12,300 | GBP 45\nDirect | 4,350 | 35 | 87 | GBP 4,785 | GBP 0\n\nOther facts:\n- The email list holds 3,900 people. Two campaigns went out all quarter, both to the whole list.\n- Average order value is about GBP 45, except paid search at GBP 60.\n- Marek keeps about 35 per cent of each sale after stock and packaging.\n- Delivery costs GBP 7.95 and is first shown on the payment page.\n- Marek's plan: move more budget into paid social, because it brought the most visits after organic search.\n\nYour deliverable. A short funnel diagnosis Marek could act on next week.\n\nInclude:\n1. The table above with two added columns: conversion rate (orders / visits) and cost per order (spend / orders).\n2. Where the funnel leaks worst, with the arithmetic, and whether this is an awareness or a conversion problem.\n3. The one stage you would fix first, why, and what it is worth if it improves. Show the sum.\n4. What Marek should NOT spend on, answering his paid social plan directly.\n5. One thing this data cannot tell you, and how you would find it out.\n\nWhat a good answer looks like:\n- Paid social is judged on cost per order (about GBP 43, against roughly GBP 17 for paid search), not on visits.\n- Gross profit is used at least once: a GBP 45 order at 35 per cent returns about GBP 15.75, so GBP 43 per order loses money.\n- The late delivery charge is named as a likely checkout leak, and fixed before any extra spending.\n- The underused list is spotted: 3,900 people, two sends, yet email already earns the most revenue.\n- Marek's plan is refused with reasons rather than ignored.\n- One honest limitation is stated, such as not knowing which channel a customer saw first.\n\nLength guide: roughly 400 to 500 words plus the table.",
      },
      {
        kind: 'text',
        prompt: "CASE STUDY 2 - Build a persona and a channel plan from raw evidence.\n\nIronworks Gym is an independent gym in Dundee with 480 members. Membership is GBP 34 a month and the average member stays 11 months. The owner, Priya, keeps about 55 per cent after costs. She has GBP 600 a month and four hours a week. Her goal is 35 net new members this quarter. All figures are illustrative.\n\nSales and behaviour data:\n- 62 per cent of members live within two miles.\n- Joining peaks in January and September; July is worst.\n- 41 per cent of last year's new members came from a member referral.\n- The website gets 1,100 visits a month. 240 reach the membership page, 22 start the join form, 14 finish it.\n- The join form asks for 14 fields, including next of kin and a GP address.\n- There is an Instagram account with 2,300 followers, and no email list.\n\nWhat six members said when interviewed:\n- \"I walked past for a year. I had no idea what it cost.\"\n- \"I tried a big chain first. All machines, nobody spoke to me. I lasted six weeks.\"\n- \"I worried it would be full of people who already knew what they were doing.\"\n- \"My sister goes here. I came with her twice before joining.\"\n- \"I looked at the website on my phone at work and gave up on the form.\"\n- \"I do not want a contract. The last place charged me for four months after I moved.\"\n\nYour deliverable. One persona one-pager and a channel plan for the quarter.\n\nInclude:\n1. A persona with the five sections: job to be done, tried before, distrust triggers, where they look, who else decides. Put the evidence beside each line.\n2. A \"so what\" section: one website change, one wording change, one channel to use or drop.\n3. A plan of no more than three channels, each with one job, one success measure and a share of the GBP 600.\n4. For each channel, one sentence tying it to a funnel stage and a specific piece of evidence above.\n5. One channel you rejected, and why.\n6. What you will measure, and the date you will review it.\n\nWhat a good answer looks like:\n- Every persona line has a source in the quotes or the data, not age or gender.\n- The 22-to-14 form drop is fixed before buying traffic, with the 14 fields named as the cause.\n- Referral is funded properly, because 41 per cent of members already arrive that way.\n- Hidden pricing is picked up from the first quote and addressed.\n- The budget funds two or three jobs properly instead of five thinly.\n- One sum appears: GBP 34 x 11 x 0.55 is roughly GBP 206 per member, which sets what a new member may cost.\n\nLength guide: roughly 450 to 550 words including the one-pager.",
      },
    ],
  },
};
