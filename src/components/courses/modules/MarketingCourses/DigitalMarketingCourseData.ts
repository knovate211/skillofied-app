import { MarketingCourseContent } from './types';

/**
 * Digital Marketing Strategy — full course content.
 *
 * Module and lesson titles follow the published syllabus shown on the course
 * landing page (CoursePlaceholderPage).
 */
export const digitalMarketingContent: MarketingCourseContent = {
  lessons: {
    // ─── Overview ─────────────────────────────────────────────────────────
    'overview-welcome': {
      title: 'Welcome to Digital Marketing Strategy',
      objective: 'understand what strategy means here, and why channel tactics alone do not work.',
      content: [
        { type: 'text', value: 'Most digital marketing fails not because the tactics are wrong but because there is no strategy connecting them. A business runs some ads, posts on social, sends occasional emails, and cannot say which of those produced revenue or how they relate to each other.' },
        { type: 'text', value: 'Strategy is the connective tissue: who you are trying to reach, what you want them to do, which channels move them along that path, and how you will know whether it worked. Tactics without that frame are activity, not marketing.' },
        { type: 'heading', value: 'What this course covers' },
        { type: 'list', items: [
          'The funnel: how strangers become customers, and what each stage requires.',
          'Organic social: content that compounds rather than disappearing.',
          'Paid advertising: search and social campaigns that do not waste budget.',
          'Email: the only channel you actually own.',
          'Conversion optimisation: getting more from the traffic you already have.',
        ] },
        { type: 'heading', value: 'A warning about vanity metrics' },
        { type: 'text', value: 'Impressions, reach, followers and likes are easy to grow and easy to report. They are also frequently disconnected from revenue. A campaign with a million impressions and no sales has failed, however good the deck looks.' },
        { type: 'alert', value: 'For every activity in this course, ask what business outcome it is supposed to produce and how you would measure it. If you cannot answer, the activity is unjustified — however conventional it is.' },
      ],
      takeaways: [
        'Strategy connects tactics to outcomes; tactics alone are just activity.',
        'The funnel is the frame: reach, engage, convert, retain.',
        'Vanity metrics grow easily and often do not track revenue.',
        'Every activity needs a stated outcome and a measurement.',
      ],
    },
    'overview-outcomes': {
      title: 'Learning Outcomes',
      objective: 'know what you will be able to build and measure by the end.',
      content: [
        { type: 'text', value: 'This course is built around producing a complete, defensible marketing plan for one real business, rather than isolated channel exercises.' },
        { type: 'heading', value: 'Specific capabilities' },
        { type: 'list', ordered: true, items: [
          'Map a customer journey and identify where prospects are actually dropping out.',
          'Build a persona grounded in evidence rather than invention.',
          'Plan a content calendar around pillars instead of ad-hoc posting.',
          'Structure a Google Ads or Meta Ads campaign with correct targeting, budget and bidding.',
          'Calculate whether a paid channel is profitable using CAC and LTV.',
          'Design an email sequence that converts without eroding the list.',
          'Run an A/B test that produces a trustworthy result rather than a misleading one.',
        ] },
        { type: 'heading', value: 'Assessment' },
        { type: 'text', value: 'Each module has a quiz on the concepts and an assignment applying them to a business you choose at the start. The assignments accumulate into a full marketing plan by the final module.' },
        { type: 'alert', value: 'Choose a real business with a real product — your own, an employer\'s, or a small local business. Inventing a fictional company lets you dodge the hard constraints (limited budget, thin data, awkward margins) that make strategy difficult and worth learning.' },
      ],
      takeaways: [
        'Assignments accumulate into one complete marketing plan.',
        'Work with a real business so the constraints are real.',
        'You will be able to judge channel profitability, not just run campaigns.',
      ],
    },

    // ─── Module 1: The Funnel ─────────────────────────────────────────────
    'dm-m1-l1': {
      title: 'AIDA Model & Customer Value Journey',
      objective: 'map the stages a customer passes through and diagnose where they drop out.',
      content: [
        { type: 'text', value: 'The funnel is a model of how a stranger becomes a customer. It is a simplification — real journeys loop, pause and jump around — but it is useful because it forces you to ask a specific question: at which stage are we losing people?' },
        { type: 'heading', value: 'AIDA' },
        { type: 'table', headers: ['Stage', 'Prospect state', 'What they need', 'Typical asset'], rows: [
          ['Attention', 'Does not know you exist', 'A reason to notice', 'Social content, ads, SEO'],
          ['Interest', 'Aware, mildly curious', 'Information that helps them', 'Guides, newsletters, comparisons'],
          ['Desire', 'Considering, comparing options', 'Proof it works and fits', 'Case studies, demos, reviews'],
          ['Action', 'Ready, needs a nudge', 'A clear, low-friction next step', 'Landing page, trial, checkout'],
        ] },
        { type: 'text', value: 'The diagnostic use matters more than the model itself. Poor sales with high traffic is a conversion problem, not an awareness problem — and buying more traffic will make it worse by spending money to fill a leaking bucket.' },
        { type: 'example', title: 'Reading the numbers', value: '10,000 visitors -> 500 signups -> 20 customers\n\n  Visit-to-signup:   5%   (reasonable)\n  Signup-to-customer: 4%   (weak)\n\nThe bottleneck is after signup, not before it. Spending more on ads\nraises the top number and changes nothing about the 4%.' },
        { type: 'heading', value: 'Beyond the sale' },
        { type: 'text', value: 'AIDA stops at purchase, which is where the model shows its age. Retention and referral usually matter more to profitability than acquisition, because selling to an existing customer costs a fraction of winning a new one. Extend the journey: Retention (they keep buying) and Advocacy (they bring others).' },
        { type: 'alert', value: 'Before proposing any new campaign, calculate the conversion rate between each pair of stages. The stage with the worst rate is where the money should go. This single habit prevents most wasted budget.' },
      ],
      takeaways: [
        'The funnel\'s value is diagnostic: it locates where prospects drop out.',
        'High traffic with low sales is a conversion problem, not an awareness one.',
        'Retention and advocacy usually beat acquisition on profitability.',
        'Measure stage-to-stage conversion before spending anything.',
      ],
    },
    'dm-m1-l2': {
      title: 'Defining Target Personas & Segments',
      objective: 'build a persona from evidence and segment an audience usefully.',
      content: [
        { type: 'text', value: 'A persona is a compressed description of a real customer type, used so that everyone writing copy or choosing targeting is picturing the same person. Done well it sharpens decisions. Done badly it is a fictional character with a stock photo that nobody consults.' },
        { type: 'heading', value: 'Evidence, not invention' },
        { type: 'text', value: 'The difference between a useful persona and a useless one is where the information came from. Sources worth using: interviews with actual customers, sales call recordings, support tickets, search queries that bring people to your site, reviews of competitors.' },
        { type: 'example', title: 'Invented versus evidenced', value: 'Invented:\n  "Marketing Mary, 34, likes yoga and travel, wants to grow her brand."\n  -> Demographics with no bearing on the buying decision.\n\nEvidenced:\n  "Runs marketing alone at a 20-person B2B firm. Judged on lead volume.\n   Has a budget but no time. Distrusts agencies after one bad contract.\n   Searches for templates and checklists, not theory."\n  -> Every line changes what you would write and where you would place it.' },
        { type: 'heading', value: 'What a persona should contain' },
        { type: 'list', items: [
          'The job they are trying to get done — the actual problem prompting a search.',
          'What they have already tried and why it did not work.',
          'What would make them distrust or reject a solution.',
          'Where they look for answers.',
          'Who else is involved in the decision.',
        ] },
        { type: 'heading', value: 'Segmentation' },
        { type: 'text', value: 'Segmentation splits an audience into groups worth treating differently. The test is whether the split changes what you would do. Splitting by age is only useful if a 25-year-old and a 45-year-old need different messaging. Behavioural segments — has bought before, abandoned a cart, went inactive for 90 days — usually earn their keep because each implies a different action.' },
        { type: 'alert', value: 'Do not create more segments than you can actually serve. Three segments with tailored messaging beat twelve that all receive the same generic email.' },
      ],
      takeaways: [
        'Build personas from interviews, tickets and reviews — not imagination.',
        'Capture the job to be done and prior failed attempts, not hobbies.',
        'A segment is only useful if it changes what you would do.',
        'Behavioural segments usually outperform demographic ones.',
      ],
    },
    'dm-m1-l3': {
      title: 'Mapping Marketing Channels to Goals',
      objective: 'choose channels by funnel stage and business constraint rather than by fashion.',
      content: [
        { type: 'text', value: 'Channels are not interchangeable. Each has a natural position in the funnel, a cost profile and a speed. Choosing badly means paying for reach when you needed conversion, or waiting months for results you needed this quarter.' },
        { type: 'heading', value: 'Channel characteristics' },
        { type: 'table', headers: ['Channel', 'Best for', 'Speed', 'Cost profile'], rows: [
          ['SEO', 'Attention and interest', 'Slow — months', 'High effort up front, compounds afterwards'],
          ['Paid search', 'Action — captures existing demand', 'Immediate', 'Ongoing; stops when the budget stops'],
          ['Paid social', 'Attention — creates demand', 'Immediate', 'Ongoing; needs constant creative refresh'],
          ['Organic social', 'Attention and advocacy', 'Slow', 'Time-intensive, unpredictable reach'],
          ['Email', 'Desire, action and retention', 'Immediate to the existing list', 'Very low marginal cost; must build the list first'],
          ['Content', 'Interest and desire', 'Slow', 'Compounds; supports every other channel'],
        ] },
        { type: 'heading', value: 'The critical distinction' },
        { type: 'text', value: 'Paid search captures existing demand — people are already looking for what you sell. Paid social creates demand — people were not looking, and you interrupted them. That difference drives everything: search converts faster but is capped by how many people are searching; social can reach far more people but needs to do the persuading first.' },
        { type: 'alert', value: 'If nobody is searching for your product because the category is new, paid search has nothing to capture. Conversely, if demand exists and competitors are capturing it, social awareness spending is solving a problem you do not have.' },
        { type: 'heading', value: 'Owned, earned and paid' },
        { type: 'list', items: [
          'Owned — your site and email list. You control it, and it cannot be taken away.',
          'Earned — coverage, reviews, word of mouth. Most credible, least controllable.',
          'Paid — advertising. Fastest and most predictable, and it stops when the money stops.',
        ] },
        { type: 'text', value: 'A strategy resting entirely on one is fragile. Businesses built solely on a social platform lose their audience when the algorithm changes; businesses built solely on paid ads have no asset when budgets are cut. Converting paid and earned reach into an owned email list is the standard way to reduce that dependency.' },
      ],
      takeaways: [
        'Match the channel to the funnel stage and to how fast you need results.',
        'Paid search captures demand; paid social creates it.',
        'SEO and content are slow but compound; ads stop when spending stops.',
        'Convert reach into owned channels to reduce platform dependency.',
      ],
    },

    // ─── Module 2: Social ─────────────────────────────────────────────────
    'dm-m2-l1': {
      title: 'Content Pillars and Scheduling Strategies',
      objective: 'design content pillars and a sustainable calendar.',
      content: [
        { type: 'text', value: 'Most social accounts fail from inconsistency rather than bad content. Posting daily for three weeks and then vanishing for two months performs worse than posting twice a week indefinitely. Pillars and a calendar exist to make consistency possible.' },
        { type: 'heading', value: 'Content pillars' },
        { type: 'text', value: 'Pillars are three to five recurring themes you post about. They eliminate the blank-page problem — you are never deciding what to post from nothing, only what to post within a known theme.' },
        { type: 'example', title: 'Pillars for a project-management tool', value: '1. Practical how-to    — workflows, templates, tips\n2. Customer stories    — proof, outcomes, before and after\n3. Industry commentary — opinions on trends, hiring, remote work\n4. Behind the scenes   — how the team works, product decisions\n\nEvery post belongs to one pillar. If it fits none, question whether\nit should be posted at all.' },
        { type: 'heading', value: 'Ratio and restraint' },
        { type: 'text', value: 'A common guideline is that roughly four in five posts should give value and one should ask for something. The exact ratio matters less than the principle: an account that only sells gets ignored, because there is no reason to follow it.' },
        { type: 'heading', value: 'Sustainable scheduling' },
        { type: 'list', items: [
          'Choose a frequency you can maintain on a bad week, not a good one.',
          'Batch production — write a fortnight of posts in one session rather than daily improvisation.',
          'Schedule in advance, but leave room to respond to anything timely.',
          'Track which pillars actually perform and shift the mix accordingly.',
        ] },
        { type: 'alert', value: 'Posting the identical asset to every platform performs poorly. A LinkedIn post and an Instagram post have different formats, lengths and audience expectations. Repurpose the idea; do not copy the artefact.' },
      ],
      takeaways: [
        'Inconsistency, not content quality, is the usual failure.',
        'Three to five pillars remove the blank-page problem.',
        'Give far more than you ask.',
        'Repurpose ideas across platforms rather than duplicating posts.',
      ],
    },
    'dm-m2-l2': {
      title: 'Algorithm Optimization (LinkedIn, Instagram)',
      objective: 'understand what social algorithms optimise for and work with it honestly.',
      content: [
        { type: 'text', value: 'Every social algorithm optimises for the same thing: keeping people on the platform. Everything else follows. Content that holds attention and provokes interaction gets distributed; content that people scroll past does not.' },
        { type: 'heading', value: 'What the signals generally are' },
        { type: 'list', items: [
          'Dwell time — how long someone stops on the post. Usually the strongest signal.',
          'Meaningful interaction — comments and shares weigh more than likes, because they take more effort.',
          'Early engagement — performance in the first hour or so shapes how widely it is then shown.',
          'Completion — whether people watch a video or read to the end.',
          'Relevance — how similar the post is to things this specific user engaged with before.',
        ] },
        { type: 'heading', value: 'Practical implications' },
        { type: 'table', headers: ['Signal', 'What it implies for your post'], rows: [
          ['Dwell time', 'The opening line has to earn the second line. Front-load the interesting part.'],
          ['Comments over likes', 'Ask a genuine question people have an opinion about — and reply to them.'],
          ['Early engagement', 'Post when your specific audience is active, then be present to respond.'],
          ['Completion', 'Shorter and finished beats longer and abandoned.'],
        ] },
        { type: 'alert', value: 'Engagement bait — "comment YES if you agree", tagging people irrelevantly, fake controversy — is actively demoted on most platforms and erodes trust with the audience you are trying to build. The short-term reach is not worth it.' },
        { type: 'heading', value: 'The platform risk' },
        { type: 'text', value: 'Algorithms change without notice and without appeal. An account that reliably reached 50,000 people can reach 3,000 next month for reasons never explained. This is why social should feed an owned channel rather than being the destination. Reach you rent can be withdrawn; an email list cannot.' },
      ],
      takeaways: [
        'Algorithms optimise for attention retention; everything follows from that.',
        'Dwell time and comments outweigh likes.',
        'Engagement bait is demoted and costs audience trust.',
        'Use social to build an owned list — rented reach can vanish.',
      ],
    },
    'dm-m2-l3': {
      title: 'Community Management & Engagement',
      objective: 'run community interaction that builds trust, including when it goes wrong.',
      content: [
        { type: 'text', value: 'Community management is the unglamorous half of social media: replying, moderating, and handling complaints in public. It rarely produces impressive metrics and it disproportionately determines whether people trust the brand.' },
        { type: 'heading', value: 'Responding well' },
        { type: 'list', items: [
          'Reply quickly — expectations on social are hours, not days.',
          'Sound like a person. Corporate-voice replies to a genuine question read as evasive.',
          'Answer the question actually asked before adding anything else.',
          'Take complex or sensitive issues to a private channel, but acknowledge publicly first.',
        ] },
        { type: 'heading', value: 'Handling criticism' },
        { type: 'text', value: 'Public complaints feel urgent and are frequently mishandled. Deleting them almost always escalates — the complainant screenshots the deletion, and now the story is the cover-up rather than the original problem.' },
        { type: 'example', title: 'Two responses to the same complaint', value: 'Complaint: "Third time this month the export has failed. Unusable."\n\nPoor: "Sorry for any inconvenience! Please DM us."\n  -> Generic, concedes nothing, and asks them to do the work.\n\nBetter: "That is three failures too many and I understand the\n  frustration. We had an export bug affecting large files, fixed on\n  Tuesday. If it is still failing for you, send me the file size and\n  I will look at it today."\n  -> Specific, acknowledges the actual problem, offers a real next step.' },
        { type: 'alert', value: 'Only delete comments that are abusive, spam, or contain someone\'s personal data. Deleting legitimate criticism reliably makes the situation worse and is the single most common self-inflicted social media crisis.' },
        { type: 'heading', value: 'What good community work produces' },
        { type: 'text', value: 'It does not show up cleanly in a dashboard. It shows up as customers who defend you unprompted, as reduced support load because answers are public and searchable, and as product insight you would otherwise pay a research agency for.' },
      ],
      takeaways: [
        'Reply fast and in a human voice.',
        'Acknowledge publicly, resolve privately where appropriate.',
        'Deleting legitimate criticism escalates almost every time.',
        'The returns are trust and product insight, not dashboard metrics.',
      ],
    },

    // ─── Module 3: PPC ────────────────────────────────────────────────────
    'dm-m3-l1': {
      title: 'Google Search Ads Campaign Setup',
      objective: 'structure a search campaign and choose match types deliberately.',
      content: [
        { type: 'text', value: 'Search ads capture existing demand: someone typed a query indicating what they want, and you bid to appear. That intent is why search typically converts better than any other paid channel — and why it is more expensive per click.' },
        { type: 'heading', value: 'Account structure' },
        { type: 'text', value: 'Structure exists so that the ad and landing page can match the query closely. The tighter the match, the better the Quality Score, and the less you pay for the same position.' },
        { type: 'example', title: 'Structure', value: 'Campaign: Running Shoes            (budget and location set here)\n  Ad group: Trail Running Shoes\n    keywords: trail running shoes, off road running shoes\n    ad copy:  about trail shoes specifically\n    landing:  /shoes/trail\n  Ad group: Road Running Shoes\n    keywords: road running shoes, marathon shoes\n    ad copy:  about road shoes specifically\n    landing:  /shoes/road\n\nOne theme per ad group. Mixing themes forces generic copy that\nmatches nothing well.' },
        { type: 'heading', value: 'Match types' },
        { type: 'table', headers: ['Match type', 'Written as', 'Triggers on', 'Risk'], rows: [
          ['Broad', 'running shoes', 'Anything Google considers related', 'Wastes budget on loosely related queries'],
          ['Phrase', '"running shoes"', 'Queries containing that meaning', 'Balanced — the usual starting point'],
          ['Exact', '[running shoes]', 'That query and close variants', 'Limited volume'],
        ] },
        { type: 'alert', value: 'Negative keywords matter as much as keywords. Without them a shoe retailer pays for "running shoes free", "running shoes repair" and "running shoes history". Review the search terms report weekly and add negatives — this is where most wasted spend hides.' },
        { type: 'heading', value: 'Quality Score' },
        { type: 'text', value: 'Google scores expected click-through rate, ad relevance and landing page experience. A higher score means a lower cost per click for the same position, so relevance is not merely good practice — it directly reduces what you pay.' },
      ],
      takeaways: [
        'Search captures existing demand and converts well but costs more per click.',
        'One theme per ad group so copy and landing page can match the query.',
        'Phrase match is the sensible default; broad match needs close supervision.',
        'Negative keywords are where wasted spend is recovered.',
      ],
    },
    'dm-m3-l2': {
      title: 'Meta (Facebook/Instagram) Ads Manager',
      objective: 'build a paid social campaign and understand why creative dominates results.',
      content: [
        { type: 'text', value: 'Paid social interrupts rather than captures. Nobody opened Instagram to buy your product, so the advert has to earn attention before it can persuade. That single difference explains why creative matters more here than anywhere else.' },
        { type: 'heading', value: 'Campaign structure' },
        { type: 'list', items: [
          'Campaign — sets the objective. Choose the objective matching the actual goal; optimising for traffic when you want purchases produces plenty of cheap, worthless clicks.',
          'Ad set — audience, placement, budget and schedule.',
          'Ad — the creative itself: image or video, copy, call to action.',
        ] },
        { type: 'heading', value: 'Targeting' },
        { type: 'table', headers: ['Audience type', 'Built from', 'Typical use'], rows: [
          ['Core', 'Demographics, interests, behaviours', 'Cold prospecting when you have no data'],
          ['Custom', 'Your customer list, site visitors, video viewers', 'Retargeting people who already engaged'],
          ['Lookalike', 'People resembling a source audience', 'Scaling once you know who converts'],
        ] },
        { type: 'text', value: 'Retargeting almost always outperforms cold targeting, because familiarity does much of the persuasion. Someone who visited a pricing page last week is a fundamentally different prospect from someone who has never heard of you, and the advert should say something different to each.' },
        { type: 'alert', value: 'Creative is the largest lever in paid social — larger than targeting. The platforms have become very good at finding receptive people; they cannot make a boring advert interesting. Expect to refresh creative regularly, because performance decays as an audience sees the same thing repeatedly.' },
        { type: 'heading', value: 'Measurement caveat' },
        { type: 'text', value: 'Attribution on social is genuinely difficult. Privacy changes and cookie restrictions mean platform-reported conversions are estimates, and platforms have an obvious incentive to attribute generously. Compare against your own analytics and, where possible, against total revenue rather than trusting the ad platform alone.' },
      ],
      takeaways: [
        'Paid social interrupts, so creative must earn attention first.',
        'Choose the objective that matches the real goal.',
        'Retargeting outperforms cold targeting; the message should differ.',
        'Platform-reported conversions are optimistic estimates — verify independently.',
      ],
    },
    'dm-m3-l3': {
      title: 'Bidding Strategies, Budgets, and Retargeting',
      objective: 'set budgets and bids that stay profitable, using CAC and LTV.',
      content: [
        { type: 'heading', value: 'The only numbers that matter' },
        { type: 'text', value: 'A campaign is profitable when it costs less to acquire a customer than that customer is worth. Everything else — click cost, impressions, engagement rate — is diagnostic detail beneath that question.' },
        { type: 'example', title: 'Working it through', value: 'Spend                 GBP 2,000\nCustomers acquired    40\nCAC = 2000 / 40     = GBP 50\n\nAverage order          GBP 60\nAverage repeat orders  3\nGross margin           40%\nLTV = 60 x 3 x 0.40  = GBP 72\n\nLTV:CAC = 72:50 = 1.44:1\n\nProfitable, but thin. A widely used benchmark is 3:1; below that,\ngrowth consumes cash faster than it generates it.' },
        { type: 'alert', value: 'Calculating LTV on revenue rather than margin is the most common error here, and it flatters the number badly. A GBP 60 order at 40% margin contributes GBP 24, not GBP 60. Businesses have scaled themselves into insolvency on that mistake.' },
        { type: 'heading', value: 'Bidding' },
        { type: 'list', items: [
          'Manual CPC — full control, useful when data is thin or spend is small.',
          'Maximise conversions — the platform spends the budget for the most conversions; needs conversion tracking to be correct.',
          'Target CPA — aims for a cost per acquisition you set. Requires enough conversion history to learn from.',
          'Target ROAS — aims for a return on ad spend. Needs accurate revenue values passed back.',
        ] },
        { type: 'text', value: 'Automated bidding needs data. Setting Target CPA on a campaign with four conversions a month gives the algorithm nothing to learn from. Start manual, gather data, then automate.' },
        { type: 'heading', value: 'Retargeting economics' },
        { type: 'text', value: 'Retargeting is usually the cheapest acquisition available, because the audience already knows you. It is also capped — you can only retarget people who already visited. It amplifies existing demand rather than creating it, so it cannot be the whole strategy.' },
        { type: 'alert', value: 'Cap retargeting frequency. Following someone around the internet with the same advert twenty times a week produces irritation, not sales, and damages brand perception in a way the dashboard will not show you.' },
      ],
      takeaways: [
        'Profitability is LTV versus CAC; aim for roughly 3:1.',
        'Calculate LTV on margin, never on revenue.',
        'Automated bidding needs conversion volume — start manual.',
        'Retargeting is cheap but capped, and needs a frequency limit.',
      ],
    },

    // ─── Module 4: Email ──────────────────────────────────────────────────
    'dm-m4-l1': {
      title: 'Lead Magnet Design & List Growth',
      objective: 'design a lead magnet people actually want and grow a list legally.',
      content: [
        { type: 'text', value: 'Email is the only channel you own. No algorithm decides whether your message is delivered, and no platform can remove your audience overnight. That makes list growth one of the most durable investments in marketing.' },
        { type: 'heading', value: 'What makes a lead magnet work' },
        { type: 'text', value: 'A lead magnet trades something valuable for an email address. The trade has to feel worthwhile. Generic ebooks perform poorly because everyone has one and nobody reads them.' },
        { type: 'list', items: [
          'Solve one specific problem completely, rather than covering a broad topic shallowly.',
          'Deliver value immediately — a checklist used in ten minutes beats a 60-page PDF that never gets opened.',
          'Match the eventual product. A list built with an unrelated giveaway converts badly, because you attracted people who wanted the giveaway.',
          'Prefer templates, calculators, checklists and swipe files over long-form documents.',
        ] },
        { type: 'example', title: 'Weak versus strong', value: 'Weak:   "The Ultimate Guide to Digital Marketing" (80-page PDF)\n        Broad, generic, attracts everyone and therefore nobody.\n\nStrong: "Google Ads Negative Keyword List for E-commerce\n        — 300 terms that waste budget"\n        Specific, immediately usable, and attracts exactly the\n        person who would buy an ads service.' },
        { type: 'heading', value: 'Consent and the law' },
        { type: 'text', value: 'Under GDPR and similar regimes, consent must be freely given, specific, informed and unambiguous. Pre-ticked boxes are not consent. Adding people who gave you a business card is not consent. Buying a list is not consent, and sending to it will damage your sending reputation as well as exposing you legally.' },
        { type: 'alert', value: 'A small engaged list outperforms a large indifferent one on every metric that matters. Bought and scraped lists produce spam complaints, which degrade deliverability for your legitimate subscribers too. The damage extends beyond the bad addresses.' },
      ],
      takeaways: [
        'Email is owned; no algorithm sits between you and the subscriber.',
        'Solve one specific problem, delivered immediately.',
        'Match the magnet to the product or the list will not convert.',
        'Consent must be explicit; bought lists harm deliverability broadly.',
      ],
    },
    'dm-m4-l2': {
      title: 'Writing High-Open-Rate Sequences',
      objective: 'write emails that get opened and read, and structure a welcome sequence.',
      content: [
        { type: 'heading', value: 'Subject lines' },
        { type: 'text', value: 'The subject line has one job: earn the open. It is the only part most subscribers see. Specificity beats cleverness — a clear statement of what is inside outperforms wordplay almost every time.' },
        { type: 'list', items: [
          'Keep it short enough to survive mobile truncation, around 40 characters.',
          'Be specific: "3 ad settings that waste budget" beats "Marketing tips".',
          'Avoid manipulation. "Re:" on a message that is not a reply gets opened once and trains people to distrust you.',
          'The preview text is a second headline — write it deliberately rather than letting it default.',
        ] },
        { type: 'heading', value: 'Body' },
        { type: 'text', value: 'Write to one person. Email is read individually, and copy addressed to "everyone" reads as a broadcast nobody is obliged to care about. Keep paragraphs short, get to the point quickly, and include exactly one call to action — competing asks reduce response to all of them.' },
        { type: 'heading', value: 'The welcome sequence' },
        { type: 'text', value: 'Open rates are highest immediately after signup, when interest is at its peak. A welcome sequence exploits that window rather than letting a new subscriber sit idle until the next newsletter.' },
        { type: 'example', title: 'A five-email welcome sequence', value: '1  Immediately  Deliver what was promised. Nothing else.\n2  Day 2        The single most useful thing you know. Pure value.\n3  Day 4        A customer story: problem, what changed, outcome.\n4  Day 6        Address the objection that stops most people buying.\n5  Day 8        A clear offer with a genuine reason to act now.\n\nFour emails of value before one ask. The ratio is the point.' },
        { type: 'alert', value: 'Deliverability is earned. Engagement signals — opens, replies, not being marked spam — determine whether you land in the inbox or the promotions tab. Regularly removing subscribers who have not opened anything in six months improves delivery for everyone remaining. A smaller list can genuinely produce more revenue.' },
      ],
      takeaways: [
        'Specific subject lines beat clever ones; write the preview text too.',
        'Write to one person, with one call to action.',
        'Welcome sequences exploit the peak-interest window after signup.',
        'Prune inactive subscribers — it improves deliverability for the rest.',
      ],
    },
    'dm-m4-l3': {
      title: 'Setting up Behavioral Triggers & Workflows',
      objective: 'build automations that respond to behaviour rather than to a calendar.',
      content: [
        { type: 'text', value: 'A broadcast goes to everyone at a time you chose. An automation goes to one person at the moment their behaviour indicates it is relevant. The second consistently outperforms the first, because relevance and timing are most of what makes email work.' },
        { type: 'heading', value: 'Automations worth building first' },
        { type: 'table', headers: ['Trigger', 'Message', 'Why it works'], rows: [
          ['Signed up', 'Welcome sequence', 'Interest is at its peak'],
          ['Abandoned cart', 'Reminder, then help, then incentive', 'Highest-return automation in e-commerce; intent was explicit'],
          ['Viewed pricing, did not buy', 'Address the common objection', 'Behaviour signalled evaluation'],
          ['Inactive 60 days', 'Re-engagement, then removal', 'Protects deliverability'],
          ['Purchased', 'Onboarding, then a relevant next product', 'Retention costs less than acquisition'],
        ] },
        { type: 'text', value: 'Abandoned cart is usually the highest-return automation available to a shop. The person selected a product and stopped — you know exactly what they wanted and that they nearly bought it.' },
        { type: 'example', title: 'Abandoned cart sequence', value: '1 hour   Simple reminder. Often just a distraction, no incentive needed.\n24 hours Address friction: shipping cost, returns policy, sizing help.\n72 hours Incentive, if margin allows.\n\nDiscounting in the first email trains customers to abandon carts\ndeliberately. Hold the incentive back.' },
        { type: 'alert', value: 'Automations run unattended, which makes their failures quiet and long-lived. A broken merge field sends "Hi {{first_name}}" to thousands of people; a mistimed trigger sends a purchase reminder to someone who already bought. Test with real data, and review live automations quarterly.' },
        { type: 'heading', value: 'Suppression' },
        { type: 'text', value: 'Every automation needs exit conditions. Someone who completes a purchase must stop receiving the cart reminders immediately. Nothing erodes trust faster than being chased for something you already did.' },
      ],
      takeaways: [
        'Behavioural triggers beat calendar broadcasts on relevance and timing.',
        'Abandoned cart is usually the highest-return automation.',
        'Do not discount immediately, or you teach customers to abandon carts.',
        'Set exit conditions and review automations quarterly — failures are silent.',
      ],
    },

    // ─── Module 5: CRO ────────────────────────────────────────────────────
    'dm-m5-l1': {
      title: 'Landing Page Best Practices',
      objective: 'diagnose and improve a landing page against the reasons people fail to convert.',
      content: [
        { type: 'text', value: 'Conversion optimisation works on traffic you already paid for, which is why it is usually the cheapest growth available. Lifting a landing page from 2% to 3% is equivalent to increasing traffic by half, at no additional media cost.' },
        { type: 'heading', value: 'Why visitors do not convert' },
        { type: 'text', value: 'Almost every failure reduces to one of four causes. Diagnosing which one applies is more productive than redesigning at random.' },
        { type: 'table', headers: ['Cause', 'Symptom', 'Fix'], rows: [
          ['Unclear value', 'High bounce, short time on page', 'State plainly what it is and who it is for, above the fold'],
          ['Insufficient trust', 'Reaches the form, does not submit', 'Reviews, named case studies, guarantees, security signals'],
          ['Too much friction', 'Starts the form, abandons it', 'Fewer fields, no forced account creation, clearer errors'],
          ['Wrong traffic', 'Everything looks fine but nobody buys', 'Fix targeting — the page is not the problem'],
        ] },
        { type: 'alert', value: 'The fourth cause is the one most often missed. If an advert promises a free tool and the landing page sells a subscription, no amount of page optimisation will fix it. Check message match between ad and page before touching the design.' },
        { type: 'heading', value: 'Structural principles' },
        { type: 'list', items: [
          'One page, one goal. Competing calls to action reduce all of them.',
          'The headline should say what it is and who it is for — not a slogan.',
          'Place proof next to the point of hesitation, not all together in a testimonial band at the bottom.',
          'Ask only for information you genuinely need now. Every field costs conversions.',
          'Make the primary action visually unmistakable.',
        ] },
        { type: 'text', value: 'Speed is a conversion factor as well as an SEO one. Every additional second of load time measurably reduces conversion, and on mobile connections the effect is larger.' },
      ],
      takeaways: [
        'CRO improves traffic you already paid for — usually the cheapest growth.',
        'Four causes: unclear value, low trust, friction, wrong traffic.',
        'Check ad-to-page message match before redesigning anything.',
        'One page, one goal; every form field costs conversions.',
      ],
    },
    'dm-m5-l2': {
      title: 'A/B Testing Frameworks & Tools',
      objective: 'run tests that produce trustworthy results rather than convincing noise.',
      content: [
        { type: 'text', value: 'An A/B test splits traffic between two versions and measures which performs better. The mechanics are simple; the statistics are where most teams go wrong, and a misread test is worse than no test because it drives a confident change in the wrong direction.' },
        { type: 'heading', value: 'A disciplined test' },
        { type: 'list', ordered: true, items: [
          'Start from a hypothesis with a reason: "Adding pricing to the landing page will increase form completions, because support tickets show cost is the top pre-sales question."',
          'Change one thing, or you will not know what caused any difference.',
          'Calculate the sample size needed BEFORE starting, from your baseline rate and the smallest lift worth detecting.',
          'Run for whole weeks. Weekday and weekend behaviour differ, and a Tuesday-to-Friday test is biased.',
          'Decide in advance what result will change your behaviour.',
        ] },
        { type: 'alert', value: 'Stopping a test as soon as it looks significant is the most common and most damaging error. Results fluctuate, and if you keep checking and stop at the first favourable moment you will "confirm" effects that do not exist. Set the duration and sample size up front, then wait.' },
        { type: 'heading', value: 'What is realistic' },
        { type: 'text', value: 'Small sites frequently cannot run valid A/B tests at all. Detecting a 10% relative improvement on a 2% baseline needs several thousand conversions per variant. With 200 conversions a month, a valid test would run for years — by which point the market has changed.' },
        { type: 'example', title: 'When testing is not viable', value: 'Baseline conversion  2%\nMinimum detectable   +10% relative\nRequired             ~ 15,000 visitors per variant\n\nAt 1,000 visitors a month, that is over two years per test.\n\nBetter approach at this scale: make well-reasoned improvements based\non qualitative evidence — session recordings, user interviews, support\ntickets — and judge them on trend rather than significance.' },
        { type: 'text', value: 'Say so plainly when a test is not statistically viable. Reporting a 20% lift from 40 conversions as a finding is misleading, and decisions built on it will not hold.' },
      ],
      takeaways: [
        'Start from a hypothesis with a reason; change one thing.',
        'Calculate sample size before starting and run whole weeks.',
        'Stopping early at significance manufactures false results.',
        'Small sites often cannot test validly — use qualitative evidence instead.',
      ],
    },
    'dm-m5-l3': {
      title: 'Analyzing User Heatmaps and Sessions',
      objective: 'use qualitative tools to explain behaviour that analytics cannot.',
      content: [
        { type: 'text', value: 'Analytics tells you what happened: 68% abandon the checkout at step two. It does not tell you why. Qualitative tools answer the why, and the two together are far more useful than either alone.' },
        { type: 'heading', value: 'The tools' },
        { type: 'table', headers: ['Tool', 'Shows', 'Best used for'], rows: [
          ['Click heatmap', 'Where people click', 'Finding non-clickable elements people expect to click'],
          ['Scroll map', 'How far down people read', 'Checking whether key content is ever seen'],
          ['Session recording', 'An individual visit replayed', 'Understanding a specific point of confusion'],
          ['Form analytics', 'Field-by-field abandonment', 'Identifying exactly which question loses people'],
        ] },
        { type: 'heading', value: 'What they typically reveal' },
        { type: 'list', items: [
          'People clicking images or headings that are not links — an expectation your design is not meeting.',
          'Rage clicks: repeated rapid clicking on something unresponsive, indicating a broken or slow element.',
          'A critical call to action sitting below the point where 80% of visitors stop scrolling.',
          'One form field — often phone number or company size — where abandonment spikes.',
        ] },
        { type: 'alert', value: 'Watching ten sessions will suggest a hypothesis; it does not prove one. It is easy to over-generalise from a single frustrating recording. Use qualitative tools to generate ideas, then validate with quantitative data where volume permits.' },
        { type: 'heading', value: 'Privacy obligations' },
        { type: 'text', value: 'Session recording captures real user behaviour and is therefore personal data. Configure the tool to mask form inputs — never record passwords, payment details or personal information. Disclose recording in your privacy policy, and honour Do Not Track and consent choices. Convenience for your analysis does not override a user\'s privacy.' },
      ],
      takeaways: [
        'Analytics gives the what; qualitative tools give the why.',
        'Rage clicks, dead clicks and scroll depth expose specific problems.',
        'Form analytics pinpoints the exact field losing people.',
        'Mask sensitive inputs and disclose recording — it is personal data.',
      ],
    },
  },

  quizzes: {
    'dm-m1-quiz': [
      { id: 1, question: 'A site has high traffic but very few sales. What does the funnel tell you?', options: ['It is a conversion problem, so more traffic will not help', 'It is an awareness problem, so buy more ads', 'The product is priced wrongly', 'The site needs more social followers'], correctAnswer: 'It is a conversion problem, so more traffic will not help' },
      { id: 2, question: 'What should a persona be built from?', options: ['Customer interviews, support tickets and reviews', 'Demographic assumptions and a stock photo', 'Competitor marketing materials', 'The founder\'s intuition'], correctAnswer: 'Customer interviews, support tickets and reviews' },
      { id: 3, question: 'What is the test for whether a segment is useful?', options: ['Whether the split changes what you would actually do', 'Whether it contains at least 1,000 people', 'Whether it is based on age', 'Whether the platform supports it'], correctAnswer: 'Whether the split changes what you would actually do' },
      { id: 4, question: 'What is the key difference between paid search and paid social?', options: ['Search captures existing demand; social creates it', 'Search is free; social is paid', 'Search only works for B2B', 'Social converts faster than search'], correctAnswer: 'Search captures existing demand; social creates it' },
      { id: 5, question: 'Why is building an owned channel important?', options: ['Rented reach can be withdrawn by a platform without notice', 'Owned channels are cheaper to set up', 'Search engines rank owned channels higher', 'It is legally required'], correctAnswer: 'Rented reach can be withdrawn by a platform without notice' },
    ],
    'dm-m2-quiz': [
      { id: 1, question: 'What is the usual reason social accounts fail?', options: ['Inconsistency rather than content quality', 'Not posting enough hashtags', 'Posting at the wrong time of day', 'Not buying followers'], correctAnswer: 'Inconsistency rather than content quality' },
      { id: 2, question: 'What do content pillars solve?', options: ['The blank-page problem — you never decide what to post from nothing', 'The need for a paid budget', 'Algorithm penalties', 'Image licensing'], correctAnswer: 'The blank-page problem — you never decide what to post from nothing' },
      { id: 3, question: 'What do social algorithms ultimately optimise for?', options: ['Keeping people on the platform', 'Rewarding accounts that post most often', 'Promoting paying advertisers organically', 'Showing the newest content first'], correctAnswer: 'Keeping people on the platform' },
      { id: 4, question: 'Why is engagement bait a bad tactic?', options: ['It is demoted by platforms and erodes audience trust', 'It is illegal in most countries', 'It costs more than normal posts', 'It only works on LinkedIn'], correctAnswer: 'It is demoted by platforms and erodes audience trust' },
      { id: 5, question: 'What is the usual result of deleting legitimate public criticism?', options: ['It escalates — the deletion becomes the story', 'The complaint is forgotten', 'The algorithm boosts your next post', 'Nothing measurable happens'], correctAnswer: 'It escalates — the deletion becomes the story' },
    ],
    'dm-m3-quiz': [
      { id: 1, question: 'Why should one ad group cover only one theme?', options: ['So the ad copy and landing page can closely match the query', 'Because Google limits keywords per ad group', 'To reduce the daily budget', 'To avoid duplicate content penalties'], correctAnswer: 'So the ad copy and landing page can closely match the query' },
      { id: 2, question: 'Where does most wasted search-ad spend hide?', options: ['In queries that should have been excluded by negative keywords', 'In the account setup fee', 'In weekend impressions', 'In the display network only'], correctAnswer: 'In queries that should have been excluded by negative keywords' },
      { id: 3, question: 'What is the largest lever in paid social performance?', options: ['The creative', 'The targeting', 'The daily budget', 'The bid strategy'], correctAnswer: 'The creative' },
      { id: 4, question: 'LTV should be calculated on which figure?', options: ['Gross margin', 'Total revenue', 'Order count', 'Ad spend'], correctAnswer: 'Gross margin' },
      { id: 5, question: 'Why start with manual bidding on a new campaign?', options: ['Automated strategies need conversion volume to learn from', 'Manual bidding is always cheaper', 'Automated bidding is deprecated', 'Manual bidding guarantees position one'], correctAnswer: 'Automated strategies need conversion volume to learn from' },
    ],
    'dm-m4-quiz': [
      { id: 1, question: 'Why is email described as the only channel you own?', options: ['No algorithm decides whether your message is delivered to your list', 'It is free to send', 'It cannot be marked as spam', 'It has the highest open rate of any channel'], correctAnswer: 'No algorithm decides whether your message is delivered to your list' },
      { id: 2, question: 'What makes a lead magnet effective?', options: ['Solving one specific problem with immediate value', 'Being as long and comprehensive as possible', 'Covering a broad topic to attract everyone', 'Being unrelated to the product so it appeals widely'], correctAnswer: 'Solving one specific problem with immediate value' },
      { id: 3, question: 'What is the effect of sending to a bought list?', options: ['Spam complaints that degrade deliverability for your genuine subscribers too', 'A temporary rise in open rates', 'No effect if the addresses are valid', 'Improved sender reputation from higher volume'], correctAnswer: 'Spam complaints that degrade deliverability for your genuine subscribers too' },
      { id: 4, question: 'Which automation is usually the highest-return in e-commerce?', options: ['Abandoned cart', 'Monthly newsletter', 'Birthday email', 'Annual survey'], correctAnswer: 'Abandoned cart' },
      { id: 5, question: 'Why should the first abandoned-cart email avoid a discount?', options: ['It teaches customers to abandon carts deliberately to get one', 'Discounts are not permitted in automated email', 'It reduces the open rate', 'It breaches consumer protection law'], correctAnswer: 'It teaches customers to abandon carts deliberately to get one' },
    ],
    'dm-m5-quiz': [
      { id: 1, question: 'Which cause of poor conversion cannot be fixed by changing the page?', options: ['Wrong traffic — a targeting or message-match problem', 'Unclear value proposition', 'Too much form friction', 'Insufficient trust signals'], correctAnswer: 'Wrong traffic — a targeting or message-match problem' },
      { id: 2, question: 'What is the most common and damaging A/B testing error?', options: ['Stopping the test as soon as it looks significant', 'Running the test for a full week', 'Calculating sample size in advance', 'Testing only one variable'], correctAnswer: 'Stopping the test as soon as it looks significant' },
      { id: 3, question: 'What should a small site with low conversion volume do instead of A/B testing?', options: ['Use qualitative evidence and judge changes on trend', 'Run the test anyway and report the result', 'Stop optimising entirely', 'Test many variables at once to save time'], correctAnswer: 'Use qualitative evidence and judge changes on trend' },
      { id: 4, question: 'What does a rage click indicate?', options: ['An unresponsive or broken element', 'Strong interest in the product', 'A slow internet connection', 'A bot visiting the page'], correctAnswer: 'An unresponsive or broken element' },
      { id: 5, question: 'What is required when using session recording?', options: ['Mask sensitive inputs and disclose it — the recordings are personal data', 'Nothing, since no names are captured', 'Written consent from every visitor by post', 'Recording only logged-out users'], correctAnswer: 'Mask sensitive inputs and disclose it — the recordings are personal data' },
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
