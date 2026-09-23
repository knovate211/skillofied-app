import { MarketingLesson } from '../types';

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

      { type: "heading", value: "What this course covers" },
      { type: "list", items: [
        "The funnel: how strangers become customers, and what each stage needs.",
        "Organic social: content that keeps working over time instead of disappearing after a day.",
        "Paid advertising: search and social campaigns that do not waste budget.",
        "Email: the only channel you truly own.",
        "Conversion optimisation: getting more sales from the visitors you already have.",
      ] },

      { type: "heading", value: "A warning about vanity metrics" },
      { type: "text", value: "Impressions, reach, followers and likes are easy to grow and easy to report. They are also often disconnected from revenue." },
      { type: "text", value: "A campaign with a million impressions and no sales has failed, however good the report looks." },

      { type: "example", title: "Rosie's Bakery: likes versus sales (illustrative figures)", value: "Rosie tried two things in March.\n\n1) Instagram posts\n   Impressions: 12,000\n   Likes:          300\n   Orders traced:    0\n   Revenue:         £0\n\n2) One email to her 400 subscribers with a Mother's Day offer\n   Orders:          32\n   Average order:  £18\n   Revenue: 32 x £18 = £576\n\nThe Instagram numbers look bigger, but the email made money.\nThat does not mean Instagram is useless. It means Rosie must\nset a goal for Instagram (for example, email sign-ups) and\nmeasure it, instead of counting likes." },

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
      ] },

      { type: "heading", value: "What you will be able to do" },
      { type: "list", ordered: true, items: [
        "Map a customer journey and find where people are really dropping out.",
        "Build a persona based on evidence, not imagination.",
        "Plan a content calendar around pillars, instead of posting randomly.",
        "Set up a Google Ads or Meta Ads campaign with correct targeting, budget and bidding.",
        "Work out whether a paid channel makes a profit, using CAC and LTV.",
        "Design an email sequence that brings sales without making people unsubscribe.",
        "Run an A/B test that gives a trustworthy answer, not a misleading one.",
      ] },

      { type: "heading", value: "A first look at CAC and LTV" },
      { type: "text", value: "Outcome 5 is the one that separates a strategist from someone who just runs campaigns. Here is a simple preview. You will learn it properly later." },
      { type: "example", title: "Rosie's Bakery: is Facebook advertising profitable? (illustrative figures)", value: "Step 1: Find CAC\n  Ad spend in April:          £300\n  New customers from ads:       20\n  CAC = £300 / 20 =             £15 per customer\n\nStep 2: Find LTV (using profit, not just sales)\n  Average order:                £18\n  Orders per customer per year:   5\n  Years a customer stays:         2\n  Sales per customer = £18 x 5 x 2 = £180\n  Rosie keeps 40% after ingredients and packaging\n  LTV = £180 x 0.40 =           £72\n\nStep 3: Compare\n  LTV / CAC = £72 / £15 =       4.8\n\nEach £15 spent brings back about £72 of profit over time.\nA common rule of thumb is that LTV should be at least 3 times\nCAC, so this channel looks healthy." },

      { type: "heading", value: "How you will be assessed" },
      { type: "text", value: "Each module has a quiz on the ideas and an assignment where you apply them. You apply them to one business you choose at the start." },
      { type: "text", value: "The assignments build on each other. By the final module, together they form a full marketing plan." },

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
      "All assignments add up to one complete marketing plan.",
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

      { type: "heading", value: "Using the funnel to diagnose problems" },
      { type: "text", value: "How you use the model matters more than the model itself." },
      { type: "text", value: "If you have lots of visitors but few sales, you have a conversion problem, not an awareness problem. Buying more traffic will make it worse. You would be spending money to fill a leaking bucket." },
      { type: "example", title: "Reading the numbers", value: "10,000 visitors -> 500 sign-ups -> 20 customers\n\n  Visit-to-sign-up:     500 / 10,000 = 5%   (reasonable)\n  Sign-up-to-customer:   20 / 500    = 4%   (weak)\n\nThe bottleneck is after sign-up, not before it.\nSpending more on ads raises the top number and\nchanges nothing about the 4%." },

      { type: "example", title: "Rosie's Bakery online shop: more ads or fix the checkout? (illustrative figures)", value: "Last month:\n  Website visitors:          8,000\n  Viewed a cake page:        1,200   -> 1,200 / 8,000 = 15%\n  Added to basket:             240   ->   240 / 1,200 = 20%\n  Completed purchase:           24   ->    24 / 240   = 10%\n\nThe worst step is basket -> purchase (10%). 9 in 10 people\nleave at checkout. Rosie finds a surprise £6 delivery charge\nonly appears on the final page.\n\nOption A: double ad spend to get 16,000 visitors\n  16,000 x 15% = 2,400 viewed\n   2,400 x 20% =   480 added\n     480 x 10% =    48 purchases   (double the cost)\n\nOption B: show delivery cost early, keep 8,000 visitors\n  Suppose checkout completion rises to 25%\n     240 x 25% =    60 purchases   (no extra ad cost)\n\nFixing the leak gives more sales than doubling the ad budget." },

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

      { type: "example", title: "Rosie's Bakery: is a win-back email worth it? (illustrative figures)", value: "Rosie's email list: 1,500 people\n  Inactive for 90+ days:  600\n\nShe sends one win-back email: \"We miss you - new autumn bakes\".\n  Suppose 3% of them order:\n  600 x 0.03 = 18 orders\n  18 orders x £18 average = £324 revenue\n\nCost: about an hour of writing, plus her email tool.\nSending the same generic email to all 1,500 would give\nrecent buyers a \"we miss you\" message that makes no sense." },

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
    ],
  },
};
