import { MarketingCourseContent } from './types';

/**
 * SEO Fundamentals — full course content.
 *
 * Module and lesson titles follow the published syllabus shown on the course
 * landing page (CoursePlaceholderPage), so what learners were promised is what
 * they get.
 */
export const seoContent: MarketingCourseContent = {
  lessons: {
    // ─── Overview ─────────────────────────────────────────────────────────
    'overview-welcome': {
      title: 'Welcome to SEO Fundamentals',
      objective: 'understand what this course covers and how SEO actually creates business value.',
      content: [
        { type: 'text', value: 'Search engine optimisation is the practice of earning traffic from unpaid search results. Unlike advertising, you do not pay per click — but you do pay in time, and the results compound rather than stopping the moment you switch off a budget.' },
        { type: 'text', value: 'That trade-off shapes everything in this course. SEO is a medium-to-long-term investment. A page you optimise today may take weeks or months to rank, then deliver traffic for years. Expecting overnight results is the single most common reason teams abandon SEO before it works.' },
        { type: 'heading', value: 'What this course covers' },
        { type: 'list', items: [
          'How search engines discover, crawl and index pages — the mechanics everything else depends on.',
          'Keyword research: finding what people actually search for, and judging whether you can realistically compete.',
          'On-page optimisation: titles, headings, copy, images and internal linking.',
          'Technical SEO: site speed, Core Web Vitals, structured data, canonicalisation and redirects.',
          'Off-page authority: how links work, how to earn them ethically, and how to audit a backlink profile.',
        ] },
        { type: 'heading', value: 'How SEO creates value' },
        { type: 'text', value: 'The commercial case is straightforward. Paid search traffic stops the day the budget stops. Organic traffic persists. A page ranking well for a high-intent commercial query can be worth more than its equivalent ad spend every month, indefinitely.' },
        { type: 'text', value: 'The honest caveat: rankings are not owned, they are rented from the search engine. Algorithm updates, new competitors and changing search behaviour all move positions. Sustainable SEO means building something genuinely useful, not gaming a scoring system.' },
        { type: 'alert', value: 'Throughout this course, prefer techniques that would still make sense if search engines did not exist. A page that genuinely answers a question ranks better and converts better. Tactics that only work because they exploit a ranking signal tend to stop working.' },
      ],
      takeaways: [
        'SEO earns unpaid search traffic; results compound but arrive slowly.',
        'Paid traffic stops with the budget; organic traffic persists.',
        'Rankings are rented, not owned — algorithm changes move positions.',
        'Optimise for the reader first; the ranking follows.',
      ],
    },
    'overview-outcomes': {
      title: 'Learning Outcomes',
      objective: 'know exactly what you will be able to do by the end of the course.',
      content: [
        { type: 'text', value: 'By the end of this course you will be able to complete a full SEO engagement on a real website, from first audit to measurable improvement.' },
        { type: 'heading', value: 'Specific capabilities' },
        { type: 'list', ordered: true, items: [
          'Diagnose why a page is not indexed, and fix it — distinguishing crawl problems from indexing problems from ranking problems.',
          'Run keyword research that starts from search intent rather than volume, and build a keyword-to-page map.',
          'Audit and rewrite on-page elements: title tags, meta descriptions, heading hierarchy, image alt text and internal links.',
          'Read a Core Web Vitals report and identify which specific issues are worth fixing.',
          'Implement structured data and validate it.',
          'Choose correctly between a canonical tag, a 301 redirect and a noindex directive — a distinction that causes a great deal of accidental damage when confused.',
          'Evaluate a backlink profile and design an outreach campaign that does not risk a penalty.',
        ] },
        { type: 'heading', value: 'How you will be assessed' },
        { type: 'text', value: 'Each module ends with a quiz covering the concepts and an assignment applying them to a real site of your choosing. The assignments build on each other: by the final module you will have produced a complete SEO audit document.' },
        { type: 'alert', value: 'Pick one real website at the start of the course and use it for every assignment. Your own site, a friend\'s business, or a small local business. Applying the material to one site repeatedly teaches far more than isolated exercises.' },
      ],
      takeaways: [
        'You will be able to run a complete SEO audit end to end.',
        'Assignments build cumulatively into one full audit document.',
        'Choose a single real site to work on throughout.',
      ],
    },

    // ─── Module 1: Crawling & Indexing ────────────────────────────────────
    'seo-m1-l1': {
      title: 'How Google Search Works',
      objective: 'explain the three stages of search and identify which stage a problem belongs to.',
      content: [
        { type: 'text', value: 'Search works in three distinct stages. Almost every SEO problem you will ever diagnose belongs to exactly one of them, and knowing which saves enormous wasted effort.' },
        { type: 'heading', value: 'The three stages' },
        { type: 'table', headers: ['Stage', 'What happens', 'Typical failure'], rows: [
          ['Crawling', 'Googlebot discovers URLs by following links and reading sitemaps, then requests the page.', 'Page is not linked from anywhere and is not in the sitemap, so it is never found.'],
          ['Indexing', 'Google renders the page, analyses its content, and decides whether to store it in the index.', 'Page is crawled but judged duplicate, thin, or is blocked by a noindex tag.'],
          ['Serving', 'For a given query, Google selects and ranks indexed pages.', 'Page is indexed but ranks poorly because the content does not match intent or lacks authority.'],
        ] },
        { type: 'text', value: 'The diagnostic value is direct. If a page is not appearing in search, do not start rewriting the copy — first establish whether it was crawled at all. Rewriting a page that Googlebot has never fetched achieves nothing.' },
        { type: 'example', title: 'Diagnosing in order', value: 'Search: site:example.com/your-page\n\n  No result  -> the page is not indexed. Check crawling and indexing.\n  Result appears -> the page IS indexed. The problem is ranking, not access.\n\nThen check Google Search Console -> URL Inspection for the specific reason.' },
        { type: 'heading', value: 'Rendering matters' },
        { type: 'text', value: 'Modern sites often build content with JavaScript. Google does render JavaScript, but rendering is queued separately and can lag behind crawling. Content that only exists after a client-side fetch may be indexed late or incompletely. Server-side rendering or static generation removes that uncertainty.' },
        { type: 'alert', value: 'Use the URL Inspection tool in Google Search Console and view the rendered HTML, not your source. If your main content is missing from the rendered output, no amount of keyword work will help.' },
      ],
      takeaways: [
        'Three stages: crawling, indexing, serving.',
        'Diagnose in order — access problems before ranking problems.',
        '`site:` search quickly tells you whether a page is indexed at all.',
        'JavaScript-rendered content can be indexed late or incompletely.',
      ],
    },
    'seo-m1-l2': {
      title: 'Understanding Crawl Budgets & Indexability',
      objective: 'explain crawl budget, identify what wastes it, and know when it actually matters.',
      content: [
        { type: 'text', value: 'Crawl budget is the number of URLs Googlebot will crawl on your site in a given period. It is a function of two things: crawl capacity (how much your server can handle without slowing down) and crawl demand (how much Google wants your content, based on popularity and freshness).' },
        { type: 'heading', value: 'When it matters — and when it does not' },
        { type: 'text', value: 'For a site with a few hundred pages, crawl budget is essentially never the problem. It becomes a genuine concern on large sites: e-commerce catalogues, listings sites, anything generating tens of thousands of URLs. Do not spend time optimising crawl budget on a small site; it is a distraction from work that would actually move rankings.' },
        { type: 'heading', value: 'What wastes crawl budget' },
        { type: 'list', items: [
          'Faceted navigation generating near-infinite URL combinations (?colour=red&size=m&sort=price).',
          'Session IDs or tracking parameters creating a distinct URL for every visitor.',
          'Long redirect chains — each hop is a separate request.',
          'Soft 404s: pages returning 200 OK for content that does not exist.',
          'Large volumes of thin, duplicate or auto-generated pages.',
        ] },
        { type: 'heading', value: 'Indexability' },
        { type: 'text', value: 'Crawlable and indexable are different properties. A page can be crawled and then deliberately excluded from the index. The controls are distinct and frequently confused:' },
        { type: 'table', headers: ['Control', 'Effect', 'Common mistake'], rows: [
          ['robots.txt Disallow', 'Prevents crawling. Google may still index the URL if linked elsewhere, showing no description.', 'Using it to remove a page from search — it cannot, because Google must crawl the page to see a noindex tag.'],
          ['noindex meta tag', 'Allows crawling, prevents indexing. The correct tool for removing a page from search.', 'Combining it with a robots.txt block, which stops Google ever seeing the tag.'],
          ['canonical tag', 'Signals the preferred version among duplicates. A hint, not a directive.', 'Expecting it to work like a redirect.'],
        ] },
        { type: 'alert', value: 'Never block a page in robots.txt AND add a noindex tag. Googlebot cannot read the tag on a page it is forbidden to fetch, so the page may remain indexed indefinitely. Choose one.' },
      ],
      takeaways: [
        'Crawl budget matters on large sites, rarely on small ones.',
        'Parameters, facets and redirect chains are the usual waste.',
        'robots.txt controls crawling; noindex controls indexing.',
        'Blocking a page in robots.txt prevents Google from seeing its noindex tag.',
      ],
    },
    'seo-m1-l3': {
      title: 'Sitemaps and Robots.txt Best Practices',
      objective: 'write a correct robots.txt and maintain an XML sitemap that helps rather than misleads.',
      content: [
        { type: 'heading', value: 'robots.txt' },
        { type: 'text', value: 'robots.txt lives at the root of the domain and tells crawlers which paths they may request. It is a publicly readable file and it is advisory — well-behaved crawlers respect it, malicious ones do not. It is therefore not a security control.' },
        { type: 'example', title: 'A sane robots.txt', value: 'User-agent: *\nDisallow: /admin/\nDisallow: /cart/\nDisallow: /*?sort=\nAllow: /\n\nSitemap: https://example.com/sitemap.xml' },
        { type: 'alert', value: 'Never list sensitive paths in robots.txt to hide them. The file is public, so you are publishing a map of exactly what you want hidden. Protect those paths with authentication instead.' },
        { type: 'heading', value: 'XML sitemaps' },
        { type: 'text', value: 'A sitemap lists the URLs you want indexed, with optional metadata. It helps discovery on large sites and on sites with poor internal linking. It does not guarantee indexing — it is a suggestion, not an instruction.' },
        { type: 'text', value: 'The quality bar matters more than most people realise. A sitemap full of redirects, 404s and noindexed URLs erodes trust in the file. Every URL in your sitemap should return 200, be canonical, and be indexable.' },
        { type: 'example', title: 'Sitemap entry', value: '<url>\n  <loc>https://example.com/guides/seo-basics</loc>\n  <lastmod>2026-07-15</lastmod>\n</url>\n\nlastmod is used as a signal for recrawl priority. Only update it when the\ncontent genuinely changed — falsifying it trains Google to ignore it.' },
        { type: 'heading', value: 'Practical rules' },
        { type: 'list', items: [
          'Split sitemaps at 50,000 URLs or 50 MB and use a sitemap index file.',
          'Include only canonical, indexable, 200-status URLs.',
          'Submit the sitemap in Google Search Console and monitor the coverage report.',
          'Generate it automatically from your CMS; hand-maintained sitemaps drift out of date.',
        ] },
      ],
      takeaways: [
        'robots.txt is public and advisory — never a security measure.',
        'A sitemap aids discovery but does not guarantee indexing.',
        'Only canonical, indexable, 200-status URLs belong in a sitemap.',
        'Accurate lastmod values earn trust; false ones get ignored.',
      ],
    },

    // ─── Module 2: Keyword Research ───────────────────────────────────────
    'seo-m2-l1': {
      title: 'Identifying Search Intent',
      objective: 'classify a query by intent and judge whether a page can realistically satisfy it.',
      content: [
        { type: 'text', value: 'Search intent is what the searcher actually wants. It is the single most important concept in keyword research, because a page that targets the right keyword with the wrong intent will not rank regardless of how well optimised it is.' },
        { type: 'heading', value: 'The four intent types' },
        { type: 'table', headers: ['Intent', 'The searcher wants', 'Example query', 'Page that wins'], rows: [
          ['Informational', 'To learn something', 'what is a canonical tag', 'Guide, tutorial, explainer'],
          ['Navigational', 'To reach a specific site', 'google search console login', 'The official page itself'],
          ['Commercial', 'To compare before buying', 'best seo tools 2026', 'Comparison, review, roundup'],
          ['Transactional', 'To take an action now', 'buy ahrefs subscription', 'Product or pricing page'],
        ] },
        { type: 'heading', value: 'How to determine intent reliably' },
        { type: 'text', value: 'Do not guess. Search the query and look at what already ranks. Google has enormous behavioural data about what satisfies each query, and the current top ten is its best answer. If the first page is entirely blog posts, a product page will not break in — and vice versa.' },
        { type: 'example', title: 'Reading the results page', value: 'Query: "email marketing"\n\nTop results are all definitional guides and beginner articles.\n-> Intent is informational.\n-> A software pricing page targeting this term will not rank.\n-> Target "email marketing software pricing" instead, which shows\n   commercial results.' },
        { type: 'heading', value: 'Intent mismatch is the usual failure' },
        { type: 'text', value: 'A common and expensive mistake: a business targets a high-volume head term with a sales page, sees no movement for months, and concludes SEO does not work. The keyword was informational. The fix is not more optimisation — it is a different page type, or a different keyword.' },
        { type: 'alert', value: 'Before writing anything, search the target query and note the format of the top five results: article, listicle, product page, video, tool. Match that format. You are not obliged to copy their angle, but you should respect what searchers evidently want.' },
      ],
      takeaways: [
        'Four intents: informational, navigational, commercial, transactional.',
        'Determine intent by examining what currently ranks, not by intuition.',
        'Match the format of the winning results.',
        'Intent mismatch, not weak optimisation, is the usual reason a page fails.',
      ],
    },
    'seo-m2-l2': {
      title: 'Keyword Grouping & Selection Metrics',
      objective: 'evaluate keywords on volume, difficulty and business value, and group them into page targets.',
      content: [
        { type: 'heading', value: 'The three metrics that matter' },
        { type: 'table', headers: ['Metric', 'What it tells you', 'Trap'], rows: [
          ['Search volume', 'Rough monthly searches', 'Averages hide seasonality; tool figures are estimates, not truth.'],
          ['Keyword difficulty', 'How hard it is to rank, usually from backlink strength of current top results', 'Vendor-specific and directional only — never comparable across tools.'],
          ['Business value', 'How likely a visitor is to become a customer', 'Ignored most often, and matters most.'],
        ] },
        { type: 'text', value: 'Business value deserves more weight than it usually gets. Ranking first for a 40,000-a-month term that never converts is worth less than ranking first for a 300-a-month term that reliably produces customers. Volume flatters reports; revenue pays salaries.' },
        { type: 'heading', value: 'Head, body and long-tail' },
        { type: 'list', items: [
          'Head terms: one or two words, enormous volume, brutal competition, vague intent ("shoes").',
          'Body terms: two to three words, moderate volume, clearer intent ("running shoes for flat feet").',
          'Long-tail: four or more words, low individual volume, very specific intent, far easier to rank ("best running shoes for flat feet and knee pain").',
        ] },
        { type: 'text', value: 'New sites should start long-tail. Long-tail queries collectively account for the majority of all searches, convert better because intent is specific, and can be ranked without a large backlink profile. Head terms become realistic once the site has accumulated authority.' },
        { type: 'heading', value: 'Grouping into page targets' },
        { type: 'text', value: 'Keywords that share intent belong on one page, not several. "How to tie running shoes", "tying running shoes properly" and "running shoe lacing technique" are the same question. Three separate pages compete with each other and split their own signals — a problem called keyword cannibalisation.' },
        { type: 'example', title: 'A keyword-to-page map', value: 'Page: /guides/choosing-running-shoes\n  primary:   how to choose running shoes        (1,900/mo)\n  secondary: what running shoes should i buy    (320/mo)\n             picking running shoes for beginners (170/mo)\n\nOne page. One primary keyword. Secondary terms are covered by\nsections within the same article.' },
        { type: 'alert', value: 'Maintain the keyword-to-page map as a living document. Before creating any new page, check whether an existing page already targets that intent. If it does, improve that page instead — you will almost always get more from strengthening one page than from splitting effort across two.' },
      ],
      takeaways: [
        'Weigh volume, difficulty and business value — the last is most neglected.',
        'New sites should target long-tail queries first.',
        'Keywords sharing intent belong on one page.',
        'A keyword-to-page map prevents cannibalisation.',
      ],
    },
    'seo-m2-l3': {
      title: 'Competitor Gap & Opportunity Audits',
      objective: 'find keywords competitors rank for that you do not, and prioritise the realistic ones.',
      content: [
        { type: 'text', value: 'A content gap analysis compares your keyword coverage against competitors and surfaces terms they rank for and you do not. It is the fastest way to build a content plan grounded in evidence rather than brainstorming.' },
        { type: 'heading', value: 'Choosing the right competitors' },
        { type: 'text', value: 'Your SEO competitors are not necessarily your business competitors. They are whoever occupies the search results for your target terms — which often includes publishers, review sites and marketplaces you do not compete with commercially. Analyse who actually ranks.' },
        { type: 'heading', value: 'The process' },
        { type: 'list', ordered: true, items: [
          'Identify three to five sites that consistently rank for your target terms.',
          'Export their ranking keywords from any keyword tool.',
          'Filter to terms where they rank in the top twenty and you do not rank at all.',
          'Discard terms irrelevant to your business, however tempting the volume.',
          'Score what remains by business value and realistic difficulty.',
          'Group the survivors into page targets.',
        ] },
        { type: 'heading', value: 'Judging what is realistic' },
        { type: 'text', value: 'A gap is only an opportunity if you can plausibly close it. If every result on page one is a major publication with thousands of referring domains, a new site will not rank there this year no matter how good the article is. Look instead for pages that rank with thin content, outdated information, or weak backlink profiles — those are genuinely winnable.' },
        { type: 'example', title: 'Prioritisation in practice', value: 'Gap keyword: "technical seo checklist"   KD 72, 2,400/mo\n  Page one: Moz, Ahrefs, Semrush, Backlinko\n  -> not realistic for a new site this year\n\nGap keyword: "technical seo checklist for shopify"  KD 21, 210/mo\n  Page one: two thin blog posts, one 2021 article\n  -> genuinely winnable, and higher commercial intent' },
        { type: 'alert', value: 'Beware vanity gaps. It is easy to assemble an impressive list of high-volume keywords you will never rank for. A short list of achievable, commercially relevant terms is worth far more than a long list of aspirational ones.' },
      ],
      takeaways: [
        'SEO competitors are whoever ranks, not whoever competes commercially.',
        'Filter gaps by relevance first, then by realistic difficulty.',
        'Winnable gaps show thin, outdated or weakly linked results on page one.',
        'A short achievable list beats a long aspirational one.',
      ],
    },

    // ─── Module 3: On-Page ────────────────────────────────────────────────
    'seo-m3-l1': {
      title: 'Title Tags, Meta Descriptions & Header Structures',
      objective: 'write title tags and headings that rank and earn clicks.',
      content: [
        { type: 'heading', value: 'Title tags' },
        { type: 'text', value: 'The title tag remains one of the strongest on-page ranking signals and is usually what appears as the clickable headline in search results. It has two jobs: tell the search engine what the page is about, and persuade a human to click.' },
        { type: 'list', items: [
          'Keep it under roughly 60 characters — Google truncates on pixel width, not character count, so treat this as a guide.',
          'Put the primary keyword near the front, where it carries more weight and survives truncation.',
          'Make each title unique across the site.',
          'Write for the human. A keyword-stuffed title that nobody clicks performs worse than a natural one.',
        ] },
        { type: 'example', title: 'Weak versus strong', value: 'Weak:   SEO Tips | Tips for SEO | Best SEO Tips 2026 | MySite\nStrong: SEO Basics: 12 Fixes That Actually Move Rankings\n\nThe first repeats the keyword and says nothing. The second states a\nspecific promise, which is what earns the click.' },
        { type: 'alert', value: 'Google frequently rewrites title tags when it judges yours unhelpful — usually when it is stuffed, vague, or does not match the page. A rewritten title is a signal that yours was poor.' },
        { type: 'heading', value: 'Meta descriptions' },
        { type: 'text', value: 'The meta description is not a ranking factor. It is advertising copy: its only job is to increase click-through rate from the results page. Around 155 characters, written as a benefit-led summary with a reason to click. If you omit it, Google generates one from the page — often adequately, but you lose control of the pitch.' },
        { type: 'heading', value: 'Heading structure' },
        { type: 'text', value: 'Headings communicate document structure to both readers and crawlers, and they matter for accessibility because screen readers use them to navigate. Use exactly one H1 stating the page topic, then H2s for main sections and H3s for subsections. Do not skip levels for visual effect — style with CSS instead.' },
        { type: 'example', title: 'Correct hierarchy', value: 'H1  Complete Guide to Technical SEO\n  H2  Crawling and Indexing\n    H3  Robots.txt\n    H3  XML Sitemaps\n  H2  Site Speed\n    H3  Core Web Vitals' },
      ],
      takeaways: [
        'Title tags rank and earn clicks; keyword near the front, under ~60 characters.',
        'Meta descriptions do not rank but drive click-through.',
        'A rewritten title in the results means yours was judged unhelpful.',
        'One H1 per page; never skip heading levels for styling.',
      ],
    },
    'seo-m3-l2': {
      title: 'SEO Copywriting & Image Optimization',
      objective: 'write copy that satisfies intent, and optimise images for both ranking and speed.',
      content: [
        { type: 'heading', value: 'Writing for search' },
        { type: 'text', value: 'Keyword density is obsolete. Modern search engines understand synonyms, related concepts and context, so repeating an exact phrase does not help and reads badly. What matters is topical completeness: does the page genuinely answer the question, including the follow-up questions a reader will have?' },
        { type: 'list', items: [
          'Answer the main question early. Readers who bounce immediately signal that the page did not deliver.',
          'Cover related subtopics the query implies — the "People also ask" box is a direct list of what to include.',
          'Use natural language and the vocabulary your audience actually uses.',
          'Structure for scanning: short paragraphs, descriptive subheadings, lists where they genuinely fit.',
        ] },
        { type: 'alert', value: 'Content written primarily to rank rather than to inform tends to be verbose, repetitive and slow to reach the point. If a section exists only to include a keyword, delete it. Ranking follows usefulness far more reliably than the reverse.' },
        { type: 'heading', value: 'Image optimisation' },
        { type: 'text', value: 'Images are usually the largest contributor to page weight, which makes them a speed problem before they are a ranking opportunity. They are also an accessibility obligation.' },
        { type: 'table', headers: ['Technique', 'Why it matters'], rows: [
          ['Descriptive alt text', 'Screen readers rely on it; it is also how images rank in image search. Describe the image, do not stuff keywords.'],
          ['Modern formats (WebP, AVIF)', 'Typically 25-50% smaller than JPEG at equivalent quality.'],
          ['Correct dimensions', 'Serving a 4000px image into a 400px slot wastes bandwidth for no visible benefit.'],
          ['Explicit width and height', 'Lets the browser reserve space, preventing layout shift — a Core Web Vitals factor.'],
          ['Lazy loading below the fold', 'Defers off-screen images so they do not delay first render.'],
          ['Descriptive filenames', 'running-shoes-flat-feet.webp carries meaning; IMG_4821.jpg does not.'],
        ] },
        { type: 'example', title: 'Alt text', value: 'Missing:  <img src="chart.png">\nStuffed:  <img alt="seo seo tips best seo chart ranking seo">\nGood:     <img alt="Organic traffic rising from 2k to 14k over six months">\n\nDecorative images should use alt="" so screen readers skip them.' },
      ],
      takeaways: [
        'Topical completeness beats keyword density, which is obsolete.',
        'Answer the main question early.',
        'Images are a speed problem before they are a ranking opportunity.',
        'Alt text is an accessibility requirement, not a keyword slot.',
      ],
    },
    'seo-m3-l3': {
      title: 'URL Hierarchy and Internal Link Architecture',
      objective: 'design clean URLs and use internal linking to distribute authority deliberately.',
      content: [
        { type: 'heading', value: 'URL structure' },
        { type: 'text', value: 'URLs should be readable, stable and descriptive. They appear in search results, get shared, and communicate structure. Keep them short, lower-case, hyphen-separated, and free of parameters where possible.' },
        { type: 'example', title: 'URL quality', value: 'Poor:  /p?id=8891&cat=3&ref=hp\nBetter: /guides/technical-seo\n\nAvoid dates in URLs for evergreen content — /2023/seo-guide looks stale\nby 2026 even if the content is current.' },
        { type: 'alert', value: 'Changing a URL costs you the accumulated ranking signals unless you 301 redirect the old one. Decide the structure carefully up front. Do not restructure URLs for cosmetic reasons.' },
        { type: 'heading', value: 'Internal linking' },
        { type: 'text', value: 'Internal links are the most underused tool in SEO. They are entirely within your control — no outreach, no negotiation — and they do three jobs: they help crawlers discover pages, they distribute authority through the site, and they tell search engines what a page is about via anchor text.' },
        { type: 'list', items: [
          'Link from strong pages to pages that need help. Authority flows along links.',
          'Use descriptive anchor text. "Read our technical SEO guide" beats "click here" for both users and crawlers.',
          'Keep important pages within about three clicks of the homepage.',
          'Fix orphan pages — pages with no internal links are hard to discover and appear unimportant.',
        ] },
        { type: 'heading', value: 'Topic clusters' },
        { type: 'text', value: 'A durable structure is the hub-and-spoke model: one comprehensive pillar page on a broad topic, surrounded by detailed pages on subtopics, each linking back to the pillar and to relevant siblings. This signals topical authority and keeps related pages mutually reinforcing rather than competing.' },
        { type: 'example', title: 'Cluster structure', value: 'Pillar:  /guides/technical-seo\n  spoke: /guides/technical-seo/robots-txt\n  spoke: /guides/technical-seo/core-web-vitals\n  spoke: /guides/technical-seo/structured-data\n\nEvery spoke links up to the pillar; the pillar links down to each spoke.' },
      ],
      takeaways: [
        'URLs should be short, readable and stable; 301 redirect if you must change them.',
        'Internal linking is fully under your control and heavily underused.',
        'Descriptive anchor text helps users and crawlers alike.',
        'Hub-and-spoke clusters build topical authority.',
      ],
    },

    // ─── Module 4: Technical SEO ──────────────────────────────────────────
    'seo-m4-l1': {
      title: 'Core Web Vitals & Page Load Impact',
      objective: 'interpret the three Core Web Vitals and identify which fixes are worth making.',
      content: [
        { type: 'text', value: 'Core Web Vitals are Google\'s measurable proxies for user experience. They are a genuine ranking factor, though a modest one — they act as a tiebreaker between pages of comparable relevance rather than overriding content quality. A fast page with poor content will not outrank a slower page that answers the question better.' },
        { type: 'heading', value: 'The three metrics' },
        { type: 'table', headers: ['Metric', 'Measures', 'Good', 'Common cause of failure'], rows: [
          ['LCP — Largest Contentful Paint', 'Loading: when the main content appears', 'under 2.5s', 'Oversized hero images, slow server response, render-blocking resources'],
          ['INP — Interaction to Next Paint', 'Responsiveness: delay before the page reacts', 'under 200ms', 'Heavy JavaScript occupying the main thread'],
          ['CLS — Cumulative Layout Shift', 'Visual stability: unexpected movement', 'under 0.1', 'Images without dimensions, injected banners, late-loading fonts'],
        ] },
        { type: 'alert', value: 'CLS is the one users notice most viscerally — it is what makes you tap the wrong button because an ad loaded above your thumb. It is also usually the cheapest to fix: set explicit width and height on images and reserve space for anything injected after load.' },
        { type: 'heading', value: 'Field data versus lab data' },
        { type: 'text', value: 'Lab data comes from a simulated load in controlled conditions — repeatable and useful for debugging. Field data comes from real users on real devices and networks, and it is what Google actually uses for ranking. A page can score well in Lighthouse and still fail in the field because real users are on slower phones and worse connections.' },
        { type: 'example', title: 'Where to look', value: 'PageSpeed Insights   -> both lab and field data for one URL\nSearch Console       -> Core Web Vitals report, grouped across the site\nChrome DevTools      -> Lighthouse and Performance panel for debugging\n\nTrust field data for decisions; use lab data to find the cause.' },
        { type: 'text', value: 'Prioritise by impact. Fixing CLS on the template used by ten thousand pages beats micro-optimising one landing page. Group pages by template, and fix the template.' },
      ],
      takeaways: [
        'LCP loading, INP responsiveness, CLS visual stability.',
        'A real but modest ranking factor — a tiebreaker, not an override.',
        'Field data drives ranking; lab data helps you debug.',
        'Fix templates, not individual pages.',
      ],
    },
    'seo-m4-l2': {
      title: 'Schema Markup & Rich Snippets Implementation',
      objective: 'add structured data correctly and know what it can and cannot deliver.',
      content: [
        { type: 'text', value: 'Structured data is machine-readable markup describing what a page contains — that this number is a price, that this text is a review, that these steps are a recipe. It uses the shared vocabulary at schema.org.' },
        { type: 'heading', value: 'What it does and does not do' },
        { type: 'text', value: 'Structured data is not a direct ranking factor. Adding it will not move you up the results. What it can do is qualify your page for rich results: star ratings, FAQ dropdowns, recipe cards, event details. Those occupy more space and attract more attention, so click-through rate often improves substantially even at an unchanged position.' },
        { type: 'alert', value: 'Rich results are never guaranteed. Valid markup makes a page eligible; Google decides whether to show it, and that decision changes over time. Google has removed entire rich result types before — FAQ rich results were sharply reduced in 2023. Treat them as an upside, not a plan.' },
        { type: 'heading', value: 'Implementation' },
        { type: 'text', value: 'Use JSON-LD in a script tag. Google recommends it, and unlike microdata it does not entangle the markup with your HTML, which makes it far easier to maintain.' },
        { type: 'example', title: 'JSON-LD for an article', value: '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Complete Guide to Technical SEO",\n  "author": { "@type": "Person", "name": "Asha Nair" },\n  "datePublished": "2026-07-15",\n  "image": "https://example.com/img/technical-seo.webp"\n}\n</script>' },
        { type: 'heading', value: 'Common types worth implementing' },
        { type: 'list', items: [
          'Article — for blog posts and guides.',
          'Product with Offer — price, availability and reviews for e-commerce.',
          'LocalBusiness — address, hours and phone for physical locations.',
          'BreadcrumbList — shows the site hierarchy in results.',
          'FAQPage — question and answer pairs, where they genuinely appear on the page.',
        ] },
        { type: 'alert', value: 'Marking up content that is not visible on the page violates Google\'s guidelines and risks a manual action. The markup must describe what the user actually sees. Validate with the Rich Results Test before shipping.' },
      ],
      takeaways: [
        'Structured data is not a ranking factor; it enables rich results.',
        'Rich results improve click-through but are never guaranteed.',
        'Use JSON-LD — recommended and easier to maintain.',
        'Never mark up content the user cannot see.',
      ],
    },
    'seo-m4-l3': {
      title: 'Handling Canonicalization & Redirects',
      objective: 'choose correctly between canonical tags, redirects and noindex.',
      content: [
        { type: 'text', value: 'This lesson covers the three tools most often confused with one another, and confusing them causes real damage — deindexed pages, lost rankings, broken sites. Each solves a different problem.' },
        { type: 'heading', value: 'The distinction' },
        { type: 'table', headers: ['Tool', 'Use when', 'Effect'], rows: [
          ['rel=canonical', 'Several URLs show substantially the same content and all should stay accessible', 'Suggests which version to index and consolidates signals. A hint, not a directive.'],
          ['301 redirect', 'A page has permanently moved and the old URL should no longer be used', 'Sends users and crawlers to the new URL and passes ranking signals. Removes the old URL from the index.'],
          ['302 redirect', 'A page has temporarily moved and the old URL will return', 'Sends users onward but keeps the original indexed.'],
          ['noindex', 'The page should stay accessible to users but not appear in search', 'Allows crawling, prevents indexing.'],
        ] },
        { type: 'heading', value: 'Duplicate content' },
        { type: 'text', value: 'Duplicate content is rarely a penalty; it is a dilution problem. When the same content sits at several URLs, links and signals split between them, and Google picks one version — possibly not the one you wanted. Canonical tags let you make the choice explicitly.' },
        { type: 'example', title: 'Typical duplicates', value: 'https://example.com/page\nhttps://www.example.com/page\nhttp://example.com/page\nhttps://example.com/page?utm_source=newsletter\nhttps://example.com/page/\n\nAll the same content. Pick one canonical form and make every other\nversion point to it. Self-reference the canonical on the chosen URL.' },
        { type: 'heading', value: 'Redirect hygiene' },
        { type: 'list', items: [
          'Avoid chains: A -> B -> C wastes crawl budget and loses signal at each hop. Point A directly at C.',
          'Never create loops — the page becomes permanently unreachable.',
          'Redirect to the closest equivalent page. Sending everything to the homepage is treated as a soft 404 and helps nobody.',
          'Keep redirects in place for at least a year; signals take time to transfer.',
        ] },
        { type: 'alert', value: 'The most damaging mistake in this lesson is applying noindex site-wide during a redesign and forgetting to remove it at launch. It deindexes the entire site within days and recovery takes weeks. Check for stray noindex tags as part of every deployment.' },
      ],
      takeaways: [
        'Canonical consolidates duplicates; 301 moves permanently; noindex hides from search.',
        'Duplicate content dilutes signals rather than causing a penalty.',
        'Avoid redirect chains and never redirect everything to the homepage.',
        'A forgotten site-wide noindex is the classic launch catastrophe.',
      ],
    },

    // ─── Module 5: Off-Page ───────────────────────────────────────────────
    'seo-m5-l1': {
      title: 'Evaluating Domain Authority',
      objective: 'interpret authority metrics correctly and judge whether a link is worth pursuing.',
      content: [
        { type: 'text', value: 'Links remain one of the strongest ranking signals. The original insight behind PageRank still holds: a link is a vote, and votes from trusted sources count for more.' },
        { type: 'alert', value: 'Domain Authority, Domain Rating and similar scores are invented by SEO tool vendors. Google does not use them and has said so explicitly. They are useful as rough comparative estimates and nothing more. Never report them as though they were a Google metric.' },
        { type: 'heading', value: 'What actually makes a link valuable' },
        { type: 'table', headers: ['Factor', 'Why'], rows: [
          ['Topical relevance', 'A link from a site in your field carries far more weight than one from an unrelated directory.'],
          ['Editorial placement', 'A link within body content from an author who chose to cite you beats a footer or sidebar link.'],
          ['Traffic on the linking page', 'A page nobody visits passes little value, whatever its domain score.'],
          ['Referring domain diversity', 'Fifty links from fifty sites are worth far more than five hundred from one.'],
          ['dofollow vs nofollow', 'rel="nofollow" or "sponsored" tells Google not to pass ranking signal — though such links can still send real traffic.'],
        ] },
        { type: 'text', value: 'Judge a link by whether it would send you genuine, interested visitors. If the answer is yes, it is almost certainly a link worth having. If the only argument for it is a vendor metric, be sceptical.' },
        { type: 'heading', value: 'What to avoid' },
        { type: 'list', items: [
          'Bought links. This directly violates Google\'s spam policies and risks a manual action.',
          'Link exchange schemes and private blog networks.',
          'Mass directory submissions to low-quality aggregators.',
          'Automated comment and forum link spam.',
        ] },
        { type: 'alert', value: 'The asymmetry matters: recovering from a manual action takes months of cleanup and a reconsideration request, while the short-term ranking gain from bought links rarely survives the next algorithm update. The expected value is negative.' },
      ],
      takeaways: [
        'Domain Authority is a vendor estimate, not a Google metric.',
        'Relevance, editorial placement and real traffic determine link value.',
        'Diverse referring domains beat repeated links from one site.',
        'Bought links carry months of recovery risk for a temporary gain.',
      ],
    },
    'seo-m5-l2': {
      title: 'Ethical Guest Posting & Content Outreach',
      objective: 'run an outreach campaign that earns links without risking a penalty.',
      content: [
        { type: 'text', value: 'Link building fails when it is treated as a numbers game. Sending five hundred identical emails produces a poor response rate and damages your reputation with exactly the people whose links you want. Outreach works when there is something genuinely worth linking to and a specific reason for this recipient to care.' },
        { type: 'heading', value: 'Earn the link first' },
        { type: 'text', value: 'Before any outreach, ask what on your site is actually worth citing. Original research, proprietary data, a genuinely comprehensive guide, a free tool. Without something linkable, outreach is just asking strangers for favours.' },
        { type: 'heading', value: 'Techniques that work' },
        { type: 'list', items: [
          'Broken link building — find dead links on relevant pages and offer your resource as the replacement. It helps them immediately, which is why it works.',
          'Guest posting on genuinely relevant publications, where you write something their audience actually wants.',
          'Digital PR — publish original data or research journalists have reason to cite.',
          'Unlinked mentions — find places that mention your brand without linking and politely ask.',
          'Resource page inclusion where you genuinely belong on the list.',
        ] },
        { type: 'example', title: 'Outreach email that respects the reader', value: 'Subject: Broken link on your SEO resources page\n\nHi Sam,\n\nI was reading your technical SEO resources page and noticed the link to\n"Crawl Budget Explained" returns a 404 — looks like the original site\nreorganised.\n\nWe published a guide covering the same ground here: [link]. Useful as a\nreplacement if you think it fits; either way, thought you would want to\nknow about the dead link.\n\nAsha' },
        { type: 'text', value: 'Note what that email does: it leads with something useful to them, it is specific enough to prove the page was actually read, it makes the ask once without pressure, and it is short.' },
        { type: 'alert', value: 'Guest posting purely for links, at scale, on sites that accept anything, is treated as a link scheme. The test is whether you would still publish the piece if the link were nofollow. If not, it is a link scheme.' },
      ],
      takeaways: [
        'Create something worth linking to before doing any outreach.',
        'Personalise; mass identical emails fail and damage reputation.',
        'Broken link building works because it helps the recipient first.',
        'If the piece is not worth publishing without the link, it is a scheme.',
      ],
    },
    'seo-m5-l3': {
      title: 'Backlink Auditing & Disavow Tool',
      objective: 'audit a backlink profile and use disavow only when it is genuinely warranted.',
      content: [
        { type: 'heading', value: 'Auditing a profile' },
        { type: 'text', value: 'A backlink audit answers three questions: who links to you, whether those links help or harm, and where the gaps are compared with competitors. Pull data from Google Search Console — the only source that is definitively Google\'s own view — and supplement with a third-party crawler for extra coverage.' },
        { type: 'list', items: [
          'Referring domains matter more than raw link count.',
          'Check anchor text distribution. A natural profile is mostly branded and generic anchors; a profile dominated by exact-match commercial anchors looks manipulated.',
          'Look for sudden spikes, which may indicate a negative SEO attempt or a previous agency\'s tactics.',
          'Identify your most-linked pages — they are your strongest assets and useful sources of internal links.',
        ] },
        { type: 'heading', value: 'The disavow tool' },
        { type: 'text', value: 'Disavow tells Google to ignore specified links when assessing your site. It is a powerful and genuinely dangerous tool, because disavowing links that were actually helping will lose you rankings, and the effect is slow to reverse.' },
        { type: 'alert', value: 'Google\'s own guidance is that most sites should never use the disavow tool. Google is generally good at ignoring low-quality links without being told. Use it only when you have a manual action for unnatural links, or clear evidence of a deliberate spam attack against your site.' },
        { type: 'example', title: 'Disavow file format', value: '# Individual URLs\nhttp://spam-site.example/page-linking-to-us\n\n# Entire domain — the usual choice, since spam sites\n# rarely link only once\ndomain:spam-network.example\n\nSubmit as a plain text file, one entry per line, at the domain level\nin Search Console. It replaces any previous file entirely.' },
        { type: 'heading', value: 'Before reaching for disavow' },
        { type: 'list', ordered: true, items: [
          'Confirm there is an actual problem — a manual action in Search Console, or a documented attack.',
          'Attempt removal at source first; a removed link is better than a disavowed one.',
          'Disavow at domain level for spam networks rather than listing individual URLs.',
          'Keep a record of what you disavowed and why. The file replaces the previous one, so losing track is costly.',
        ] },
      ],
      takeaways: [
        'Referring domains and anchor distribution matter more than link count.',
        'Most sites should never use the disavow tool.',
        'Reserve it for manual actions or documented negative SEO.',
        'Try removal at source first; disavow at domain level; keep records.',
      ],
    },
  },

  quizzes: {
    'seo-m1-quiz': [
      { id: 1, question: 'What are the three stages of how Google Search works?', options: ['Crawling, indexing, serving', 'Fetching, parsing, ranking', 'Discovery, scoring, display', 'Reading, storing, sorting'], correctAnswer: 'Crawling, indexing, serving' },
      { id: 2, question: 'A page does not appear in search. What should you check FIRST?', options: ['Whether the page is indexed at all', 'The keyword density of the copy', 'The number of backlinks', 'The meta description'], correctAnswer: 'Whether the page is indexed at all' },
      { id: 3, question: 'What does robots.txt actually control?', options: ['Crawling, not indexing', 'Indexing, not crawling', 'Both crawling and indexing', 'Ranking position'], correctAnswer: 'Crawling, not indexing' },
      { id: 4, question: 'Why should you never combine a robots.txt block with a noindex tag on the same page?', options: ['Google cannot read the noindex tag on a page it is forbidden to crawl', 'It causes a duplicate content penalty', 'It doubles the crawl budget cost', 'The tags cancel each other out and the page is deleted'], correctAnswer: 'Google cannot read the noindex tag on a page it is forbidden to crawl' },
      { id: 5, question: 'On which kind of site does crawl budget genuinely matter?', options: ['Large sites with tens of thousands of URLs', 'Any site with more than ten pages', 'Only single-page applications', 'It matters equally on every site'], correctAnswer: 'Large sites with tens of thousands of URLs' },
    ],
    'seo-m2-quiz': [
      { id: 1, question: 'What is the most reliable way to determine a query\'s search intent?', options: ['Look at what currently ranks on page one', 'Check the keyword difficulty score', 'Read the search volume trend', 'Ask the client what they think'], correctAnswer: 'Look at what currently ranks on page one' },
      { id: 2, question: 'Which intent does the query "best seo tools 2026" represent?', options: ['Commercial', 'Informational', 'Navigational', 'Transactional'], correctAnswer: 'Commercial' },
      { id: 3, question: 'Why should a new site target long-tail keywords first?', options: ['Lower competition and more specific intent make them realistically rankable', 'They have the highest search volume', 'They require no content', 'Google prioritises longer queries'], correctAnswer: 'Lower competition and more specific intent make them realistically rankable' },
      { id: 4, question: 'What is keyword cannibalisation?', options: ['Multiple pages targeting the same intent and competing with each other', 'Using a keyword too many times on one page', 'Competitors stealing your keywords', 'Removing keywords from a page'], correctAnswer: 'Multiple pages targeting the same intent and competing with each other' },
      { id: 5, question: 'Which keyword metric is most often neglected and most important?', options: ['Business value', 'Search volume', 'Keyword difficulty', 'Character length'], correctAnswer: 'Business value' },
    ],
    'seo-m3-quiz': [
      { id: 1, question: 'Is the meta description a ranking factor?', options: ['No, but it affects click-through rate', 'Yes, it is one of the strongest signals', 'Yes, but only on mobile', 'No, and it has no effect at all'], correctAnswer: 'No, but it affects click-through rate' },
      { id: 2, question: 'How many H1 tags should a page have?', options: ['Exactly one', 'One per section', 'As many as needed for styling', 'None — H2 is the top level'], correctAnswer: 'Exactly one' },
      { id: 3, question: 'What does it usually mean when Google rewrites your title tag in the results?', options: ['Google judged your title unhelpful, stuffed or mismatched', 'Your page has been penalised', 'The page is not indexed', 'It happens randomly and means nothing'], correctAnswer: 'Google judged your title unhelpful, stuffed or mismatched' },
      { id: 4, question: 'What is the primary purpose of image alt text?', options: ['Accessibility for screen reader users', 'Keyword placement for ranking', 'Reducing file size', 'Setting image dimensions'], correctAnswer: 'Accessibility for screen reader users' },
      { id: 5, question: 'What is the main SEO benefit of internal linking?', options: ['It distributes authority and aids discovery, entirely under your control', 'It increases keyword density', 'It reduces page load time', 'It replaces the need for backlinks'], correctAnswer: 'It distributes authority and aids discovery, entirely under your control' },
    ],
    'seo-m4-quiz': [
      { id: 1, question: 'Which Core Web Vital measures visual stability?', options: ['CLS — Cumulative Layout Shift', 'LCP — Largest Contentful Paint', 'INP — Interaction to Next Paint', 'TTFB — Time to First Byte'], correctAnswer: 'CLS — Cumulative Layout Shift' },
      { id: 2, question: 'Which data does Google actually use for ranking purposes?', options: ['Field data from real users', 'Lab data from Lighthouse', 'Whichever score is higher', 'Neither — Core Web Vitals are not used for ranking'], correctAnswer: 'Field data from real users' },
      { id: 3, question: 'Is structured data a direct ranking factor?', options: ['No, but it can qualify a page for rich results', 'Yes, it directly boosts position', 'Yes, but only for e-commerce', 'No, and it has no benefit'], correctAnswer: 'No, but it can qualify a page for rich results' },
      { id: 4, question: 'When should you use a 301 redirect rather than a canonical tag?', options: ['When a page has permanently moved and the old URL should no longer be used', 'When two pages have similar content and both should stay accessible', 'When you want to hide a page from search', 'When the page is temporarily down'], correctAnswer: 'When a page has permanently moved and the old URL should no longer be used' },
      { id: 5, question: 'What is the classic catastrophic mistake during a site redesign?', options: ['Leaving a site-wide noindex tag in place at launch', 'Forgetting to update the copyright year', 'Changing the colour scheme', 'Adding too many internal links'], correctAnswer: 'Leaving a site-wide noindex tag in place at launch' },
    ],
    'seo-m5-quiz': [
      { id: 1, question: 'What is the status of Domain Authority as a metric?', options: ['A third-party vendor estimate that Google does not use', 'An official Google ranking score', 'A direct measure of traffic', 'A measure of page speed'], correctAnswer: 'A third-party vendor estimate that Google does not use' },
      { id: 2, question: 'Which factor most determines whether a backlink is valuable?', options: ['Topical relevance and editorial placement', 'The linking site\'s Domain Authority alone', 'The number of words on the linking page', 'How recently the site was registered'], correctAnswer: 'Topical relevance and editorial placement' },
      { id: 3, question: 'What does rel="nofollow" tell Google?', options: ['Not to pass ranking signal through the link', 'Not to crawl the linked page ever', 'To rank the linked page lower', 'To treat the link as paid advertising only'], correctAnswer: 'Not to pass ranking signal through the link' },
      { id: 4, question: 'What is the honest test for whether guest posting is a link scheme?', options: ['Whether you would still publish the piece if the link were nofollow', 'Whether the site has a high Domain Authority', 'Whether you paid for it in cash', 'Whether the article is over 1,000 words'], correctAnswer: 'Whether you would still publish the piece if the link were nofollow' },
      { id: 5, question: 'When should the disavow tool be used?', options: ['Only for a manual action or documented negative SEO — most sites never need it', 'Monthly, on all low-quality links', 'Whenever a competitor outranks you', 'Before every site migration'], correctAnswer: 'Only for a manual action or documented negative SEO — most sites never need it' },
    ],
  },

  assignments: {
    'seo-m1-assignment': {
      title: 'Indexing Audit',
      questions: [
        {
          kind: 'code',
          prompt: 'Write the robots.txt for the site. Block the two areas crawlers have no business in, carve out the one subfolder inside them that should still be crawled, point at the sitemap, and add a comment on each rule. Remember what Disallow does not do — it does not remove a page from the index.',
          language: 'shell',
          runnable: false,
          starterCode: `# robots.txt for https://example.com
# One rule per line. Disallow controls crawling, not indexing —
# a blocked URL can still rank from external links alone.

User-agent: *
# TODO: block the admin area
# TODO: block internal search results (infinite crawl space)
# TODO: allow the one public folder that lives under the admin path
# TODO: point at the sitemap

# TODO: in a comment — which directive would you need to actually
# remove a page from the index, and why robots.txt cannot do it?`,
        },
        {
          kind: 'code',
          prompt: 'Write the sitemap for the four public URLs. Every entry needs a loc, a lastmod and a priority you can justify — and only canonical, indexable, 200-returning URLs belong here. Add a comment listing three kinds of URL that must never appear in a sitemap.',
          language: 'xml',
          runnable: false,
          starterCode: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-09-07</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- TODO: /courses, /courses/seo, /blog/search-intent -->
</urlset>

<!--
  TODO: three kinds of URL that must never be listed here, and why:
  1.
  2.
  3.
-->`,
        },
        {
          kind: 'code',
          prompt: 'Implement the matcher that decides whether a URL is crawlable. Parse the robots.txt, keep only the rules under the * agent, and apply the real precedence: the longest matching path wins, and Allow beats Disallow on a tie.',
          language: 'javascript',
          starterCode: `const ROBOTS = \`User-agent: *
Disallow: /admin/
Disallow: /search
Allow: /admin/public/
Sitemap: https://example.com/sitemap.xml\`;

function parseRobots(text) {
  // TODO: return { rules: [{ allow, path }], sitemap }
  // Only collect Allow/Disallow while the active User-agent is '*'.
}

function isAllowed(rules, url) {
  // TODO: longest matching path wins; Allow wins a tie; no match means allowed.
}

const { rules, sitemap } = parseRobots(ROBOTS);
for (const url of ['/', '/admin/settings', '/admin/public/faq', '/search?q=shoes']) {
  console.log(url + ' -> ' + (isAllowed(rules, url) ? 'allowed' : 'blocked'));
}
console.log('sitemap: ' + sitemap);`,
          examples: [
            { input: 'None', output: '/ -> allowed\\n/admin/settings -> blocked\\n/admin/public/faq -> allowed\\n/search?q=shoes -> blocked\\nsitemap: https://example.com/sitemap.xml', explanation: 'The Allow is longer than the Disallow it sits inside, which is the only reason /admin/public/ survives.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'This is the index coverage report Search Console gives you, built by hand. Report why each URL is excluded, checking the reasons in the order that actually determines the outcome — a 404 is not a noindex problem.',
          language: 'javascript',
          starterCode: `const PAGES = [
  { url: '/',       status: 200, canonical: '/',       robots: 'index,follow' },
  { url: '/blog/a', status: 200, canonical: '/blog/a', robots: 'noindex' },
  { url: '/old',    status: 301, canonical: '/new',    robots: 'index' },
  { url: '/dup',    status: 200, canonical: '/',       robots: 'index' },
  { url: '/gone',   status: 404, canonical: '/gone',   robots: 'index' },
];

function audit(page) {
  // TODO: return 'indexable', or the first applicable exclusion:
  //   'excluded: status <code>'
  //   'excluded: noindex'
  //   'excluded: canonical points to <url>'
}

let indexable = 0;
for (const page of PAGES) {
  const result = audit(page);
  if (result === 'indexable') indexable += 1;
  console.log(page.url + ' ' + result);
}
console.log('indexable: ' + indexable + ' of ' + PAGES.length);`,
          examples: [
            { input: 'None', output: '/ indexable\\n/blog/a excluded: noindex\\n/old excluded: status 301\\n/dup excluded: canonical points to /\\n/gone excluded: status 404\\nindexable: 1 of 5', explanation: 'Only one of five pages is actually eligible to rank — that gap is the finding.' },
          ],
        },
      ],
    },
    'seo-m2-assignment': {
      title: 'Keyword Research & Intent Mapping',
      questions: [
        {
          kind: 'code',
          prompt: 'Intent decides the page format, so it has to be decided first. Write the classifier, and get the precedence right: a branded query is navigational even when it also contains a commercial word, and "price" outranks "best".',
          language: 'javascript',
          starterCode: `const BRANDS = ['skillofied'];

function classifyIntent(query) {
  // TODO: 'navigational' | 'transactional' | 'commercial' | 'informational'
  //   navigational  — contains a brand name
  //   transactional — buy, price, pricing, discount, near me, coupon
  //   commercial    — best, top, vs, review, reviews, alternative
  //   informational — everything else
  // Check them in that order.
}

for (const q of [
  'how to learn seo',
  'best seo course',
  'buy seo course',
  'skillofied login',
  'seo course price',
  'seo vs sem',
]) {
  console.log(q + ' -> ' + classifyIntent(q));
}`,
          examples: [
            { input: 'None', output: 'how to learn seo -> informational\\nbest seo course -> commercial\\nbuy seo course -> transactional\\nskillofied login -> navigational\\nseo course price -> transactional\\nseo vs sem -> commercial' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Volume alone picks the wrong keyword every time. Score each candidate by volume weighted for intent and divided by difficulty, then rank. Notice which keyword wins and whether you would actually have chosen it.',
          language: 'javascript',
          starterCode: `const INTENT_WEIGHT = {
  transactional: 1.0,
  commercial: 0.8,
  informational: 0.4,
  navigational: 0.1,
};

const KEYWORDS = [
  { kw: 'seo course price', volume: 900,  difficulty: 18, intent: 'transactional' },
  { kw: 'best seo course',  volume: 2400, difficulty: 46, intent: 'commercial' },
  { kw: 'how to learn seo', volume: 8100, difficulty: 64, intent: 'informational' },
  { kw: 'skillofied login', volume: 300,  difficulty: 4,  intent: 'navigational' },
];

// TODO: score = round(volume * weight / difficulty), sorted by score
// descending, then keyword ascending. Print '<keyword>: <score>'.`,
          examples: [
            { input: 'None', output: 'how to learn seo: 51\\nseo course price: 50\\nbest seo course: 42\\nskillofied login: 8', explanation: 'The two leaders are one point apart — which is exactly when the weighting assumptions deserve arguing about.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Two keywords with the same topic and the same intent are one page, not two — splitting them makes the pages compete with each other. Group the list into page targets and report how many pages you actually need.',
          language: 'javascript',
          starterCode: `const KEYWORDS = [
  { kw: 'seo course price', topic: 'seo course', intent: 'transactional' },
  { kw: 'seo course cost',  topic: 'seo course', intent: 'transactional' },
  { kw: 'best seo course',  topic: 'seo course', intent: 'commercial' },
  { kw: 'how to learn seo', topic: 'learn seo',  intent: 'informational' },
  { kw: 'learn seo free',   topic: 'learn seo',  intent: 'informational' },
];

// TODO: group on topic + intent. Print 'pages: <n>', then one line per group,
// sorted by 'topic|intent', formatted:
//   <topic> (<intent>) <- kw, kw`,
          examples: [
            { input: 'None', output: 'pages: 3\\nlearn seo (informational) <- how to learn seo, learn seo free\\nseo course (commercial) <- best seo course\\nseo course (transactional) <- seo course price, seo course cost', explanation: 'Same topic, different intent, different page — one sells and one explains.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the keyword map as the artifact the rest of the course builds on: one entry per target page, with its URL, primary keyword, secondary keywords, intent and the page format the SERP demands. This file is the deliverable, so it has to be complete enough for someone else to write the pages from.',
          language: 'json',
          runnable: false,
          starterCode: `{
  "site": "https://example.com",
  "pages": [
    {
      "url": "/courses/seo",
      "primary": "seo course price",
      "secondary": ["seo course cost"],
      "intent": "transactional",
      "format": "product page with pricing above the fold",
      "note": "TODO: why this format — what do the top five results look like?"
    }
  ]
}

// TODO: add the remaining target pages from your clustering, including at
// least one informational page and one commercial-comparison page.`,
        },
      ],
    },
    'seo-m3-assignment': {
      title: 'On-Page Optimisation Pass',
      questions: [
        {
          kind: 'code',
          prompt: 'Write the on-page checker. Title 50-60 characters, description 50-160, exactly one H1, and the target keyword present in the title — report every failure at once rather than stopping at the first.',
          language: 'javascript',
          starterCode: `function auditOnPage({ title = '', description = '', h1s = [], target = '' }) {
  // TODO: return an array of issue strings, in this order:
  //   'title too short' / 'title too long'
  //   'title missing target keyword'
  //   'description too short' / 'description too long'
  //   'expected exactly one h1, found <n>'
}

const good = {
  title: 'SEO Fundamentals Course: Rank Pages That Actually Convert',
  description: 'A practical SEO course covering crawling, keyword intent, on-page work and link building, with a full audit as the final deliverable.',
  h1s: ['SEO Fundamentals'],
  target: 'seo',
};
const bad = { title: 'Home', description: 'Welcome.', h1s: ['Home', 'Courses'], target: 'seo course' };

console.log(JSON.stringify(auditOnPage(good)));
console.log(JSON.stringify(auditOnPage(bad)));`,
          examples: [
            { input: 'None', output: '[]\\n["title too short","title missing target keyword","description too short","expected exactly one h1, found 2"]', explanation: 'The passing title is 57 characters and the description 133 — count before assuming.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'This page has two H1s, skips from H2 to H4, and uses a heading purely to make text big. Rewrite the outline so it reads as a document structure: exactly one H1, no skipped levels, and no heading used for styling. Add a comment beside each change saying which rule it fixes.',
          language: 'html',
          runnable: false,
          starterCode: `<h1>Skillofied</h1>
<h1>SEO Fundamentals Course</h1>

<h2>What you will learn</h2>
<h4>Crawling and indexing</h4>
<h4>Keyword research</h4>

<h3>Enrol today</h3>

<h2>FAQ</h2>
<h5>How long is the course?</h5>

<!-- TODO: rewrite the outline above.
     One H1. No skipped levels. Nothing that is only a heading because
     it should look big — use CSS for that. -->`,
        },
        {
          kind: 'code',
          prompt: 'Audit the images the way a page-speed report does. Flag every problem on every image, not just the first, and report how many are clean.',
          language: 'javascript',
          starterCode: `const IMAGES = [
  { src: '/hero.webp',    alt: 'Students working through an SEO audit', width: 1200, height: 630 },
  { src: '/IMG_2049.JPG', alt: 'IMG_2049.JPG',                          width: 4032, height: 3024 },
  { src: '/logo.png',     alt: '',                                      width: null, height: null },
  { src: '/chart.svg',    alt: 'Traffic up 40% after the on-page pass',  width: 800,  height: 400 },
];

function auditImage(image) {
  // TODO: collect problems in this order:
  //   'legacy format'                        — not webp, avif or svg
  //   'missing alt'                          — empty alt
  //   'alt repeats the filename'             — alt equals the file name
  //   'no dimensions (causes layout shift)'  — width or height missing
  //   'oversized'                            — wider than 2000px
}

let clean = 0;
for (const image of IMAGES) {
  const problems = auditImage(image);
  if (problems.length === 0) clean += 1;
  console.log(image.src + ': ' + (problems.length ? problems.join('; ') : 'ok'));
}
console.log('clean: ' + clean + ' of ' + IMAGES.length);`,
          examples: [
            { input: 'None', output: '/hero.webp: ok\\n/IMG_2049.JPG: legacy format; alt repeats the filename; oversized\\n/logo.png: legacy format; missing alt; no dimensions (causes layout shift)\\n/chart.svg: ok\\nclean: 2 of 4', explanation: 'An alt that repeats the filename is worse than none — it reads the filename aloud.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Internal links are the only ranking signal you fully control. Count inbound links per page and find the orphans — pages nothing links to, which crawlers reach only from the sitemap, if at all.',
          language: 'javascript',
          starterCode: `const PAGES = ['/', '/courses', '/courses/seo', '/blog/intent', '/blog/crawl'];

const LINKS = [
  ['/', '/courses'],
  ['/', '/blog/intent'],
  ['/courses', '/courses/seo'],
  ['/blog/intent', '/courses/seo'],
  ['/blog/crawl', '/'],
];

// TODO: print '<page>: <n> inbound' for every page in PAGES order,
// then 'orphans: <comma list>' — pages with zero inbound links,
// excluding the homepage. Print 'orphans: none' when there are none.`,
          examples: [
            { input: 'None', output: '/: 1 inbound\\n/courses: 1 inbound\\n/courses/seo: 2 inbound\\n/blog/intent: 1 inbound\\n/blog/crawl: 0 inbound\\norphans: /blog/crawl', explanation: '/blog/crawl links out but nothing links in — it is invisible to link-based discovery.' },
          ],
        },
      ],
    },
    'seo-m4-assignment': {
      title: 'Technical Audit',
      questions: [
        {
          kind: 'code',
          prompt: 'Score both pages against the Core Web Vitals thresholds — LCP 2500/4000ms, INP 200/500ms, CLS 0.1/0.25 — and name the metrics that are outright poor, because those are the ones that cost you.',
          language: 'javascript',
          starterCode: `const THRESHOLDS = {
  lcp: [2500, 4000],
  inp: [200, 500],
  cls: [0.1, 0.25],
};

const PAGES = [
  { url: '/',        lcp: 2100, inp: 150, cls: 0.05 },
  { url: '/courses', lcp: 3800, inp: 240, cls: 0.31 },
];

function rate(metric, value) {
  // TODO: 'good' at or below the first threshold, 'needs improvement' at or
  // below the second, otherwise 'poor'
}

// TODO: for each page print
//   <url>: lcp=<rating> inp=<rating> cls=<rating> | poor: <metrics or 'none'>`,
          examples: [
            { input: 'None', output: '/: lcp=good inp=good cls=good | poor: none\\n/courses: lcp=needs improvement inp=needs improvement cls=poor | poor: cls', explanation: 'CLS is the only poor metric, so it is the one to fix first — and it is almost always an image without dimensions.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write the JSON-LD for the course page. It needs the right @type, the provider, the offer with its currency, and an aggregateRating — and every claim in it must also be visible on the page itself, because structured data that contradicts the page is a manual action waiting to happen.',
          language: 'json',
          runnable: false,
          starterCode: `{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "SEO Fundamentals",
  "description": "TODO"
}

// TODO: add provider (an Organization with a name and url), an offers object
// (price, priceCurrency, availability, url), and hasCourseInstance with the
// delivery mode. Then, in a comment: which of these values must also appear
// as visible text on the page, and what happens if one does not?`,
        },
        {
          kind: 'code',
          prompt: 'Canonical, redirect and noindex solve three different problems and are constantly used for each other\\u2019s. Encode the decision so the rule is written down rather than argued each time.',
          language: 'javascript',
          starterCode: `function decide(page) {
  // TODO: return one of
  //   '301 redirect'          — the URL has moved for good
  //   'canonical to <url>'    — a real duplicate that must stay reachable
  //   'noindex'               — thin or private, should not be in the index
  //   'leave as is'           — nothing wrong with it
  // Check them in that order.
}

const CASES = [
  { name: 'printer-friendly copy',  duplicateOf: '/article' },
  { name: 'old url after rename',   movedPermanently: true },
  { name: 'internal search results', thinOrPrivate: true },
  { name: 'the canonical article' },
];

for (const page of CASES) {
  console.log(page.name + ' -> ' + decide(page));
}`,
          examples: [
            { input: 'None', output: 'printer-friendly copy -> canonical to /article\\nold url after rename -> 301 redirect\\ninternal search results -> noindex\\nthe canonical article -> leave as is', explanation: 'A canonical is a hint; a 301 is an instruction. Using the hint for a move is why old URLs linger.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Redirect chains leak crawl budget and link equity, and redirect loops take the page down entirely. Resolve each start URL, classify it, and report the full hop path.',
          language: 'javascript',
          starterCode: `const REDIRECTS = {
  '/a': '/b',
  '/b': '/c',
  '/c': '/d',
  '/loop1': '/loop2',
  '/loop2': '/loop1',
};

function resolve(start) {
  // TODO: follow the redirects, returning { status, hops, chain }
  //   'loop'  — a URL repeats
  //   'chain' — more than one hop
  //   'ok'    — one hop or none
}

for (const start of ['/a', '/c', '/loop1']) {
  const result = resolve(start);
  console.log(start + ' -> ' + result.status + ' (' + result.hops + ' hops): ' + result.chain.join(' > '));
}`,
          examples: [
            { input: 'None', output: '/a -> chain (3 hops): /a > /b > /c > /d\\n/c -> ok (1 hops): /c > /d\\n/loop1 -> loop (2 hops): /loop1 > /loop2 > /loop1', explanation: 'Point /a straight at /d and the chain collapses to a single hop.' },
          ],
        },
      ],
    },
    'seo-m5-assignment': {
      title: 'Backlink Profile & Outreach Plan',
      questions: [
        {
          kind: 'code',
          prompt: 'Referring domains matter far more than raw link counts — fifty links from one site is one endorsement. Aggregate the export and report both numbers, plus the pages actually earning the links.',
          language: 'javascript',
          starterCode: `const LINKS = [
  { from: 'https://blog.example.com/a', to: '/courses/seo' },
  { from: 'https://blog.example.com/b', to: '/courses/seo' },
  { from: 'https://news.site.org/x',    to: '/' },
  { from: 'https://forum.dev.io/t/1',   to: '/courses/seo' },
  { from: 'https://news.site.org/y',    to: '/blog/intent' },
];

// TODO: print
//   'referring domains: <unique hostnames>'
//   'total links: <n>'
// then one '<page>: <n>' line per linked page, most-linked first,
// ties broken alphabetically.`,
          examples: [
            { input: 'None', output: 'referring domains: 3\\ntotal links: 5\\n/courses/seo: 3\\n/: 1\\n/blog/intent: 1', explanation: 'Five links, three domains — the honest number is three.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'An anchor profile that is mostly exact-match commercial text is the signature of a link scheme. Classify the anchors and judge the distribution against the 30% rule.',
          language: 'javascript',
          starterCode: `const ANCHORS = [
  'Skillofied', 'skillofied.com', 'click here', 'read more',
  'best seo course', 'seo course online', 'Skillofied', 'https://skillofied.com',
];

const BRANDS = ['skillofied'];
const GENERIC = ['click here', 'read more', 'here', 'this page', 'learn more'];

function classify(anchor) {
  // TODO: 'branded' (contains a brand), 'generic' (exactly a generic phrase),
  // otherwise 'exact-match'. Check in that order.
}

// TODO: print '<kind>: <count> (<percent>%)' for branded, generic and
// exact-match in that order, rounding the percentage.
// Then print 'natural: <true|false>' — natural when exact-match is 30% or less.`,
          examples: [
            { input: 'None', output: 'branded: 4 (50%)\\ngeneric: 2 (25%)\\nexact-match: 2 (25%)\\nnatural: true', explanation: 'A naked URL counts as branded — it carries the brand and nothing commercial.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Write one outreach email to a specific real prospect. It must name something particular about their page, say in one line why your asset is worth their reader\\u2019s time, make the ask exactly once, and be short enough to read on a phone. No merge-field flattery.',
          language: 'markdown',
          runnable: false,
          starterCode: `**To:** editor@<their site>
**Subject:** TODO — specific, not "Quick question"

TODO: one line proving you read the specific page you are writing about.

TODO: one line on what you have and why their reader benefits. Link it.

TODO: the ask, once. Then stop.

—
TODO: your name and one line of who you are.

<!--
  Check before sending:
  - Would you still send this if the link had to be nofollow?
  - Is there anything here you could not say to their face?
-->`,
        },
        {
          kind: 'code',
          prompt: 'Most sites should never touch the disavow tool. Encode when it is warranted: a documented manual action, and only for links that are paid or genuinely toxic. Then show what the same list produces with no manual action.',
          language: 'javascript',
          starterCode: `const LINKS = [
  { domain: 'pbn-links.biz',        spamScore: 92, paid: true },
  { domain: 'guest-post-farm.net',  spamScore: 71, paid: true },
  { domain: 'realblog.dev',         spamScore: 8,  paid: false },
  { domain: 'scraper-mirror.xyz',   spamScore: 88, paid: false },
];

function shouldDisavow(link, hasManualAction) {
  // TODO: only under a manual action, and only when the link is paid
  // or scores 80 or above.
}

console.log('under a manual action:');
// TODO: print 'domain:<domain>' for each link to disavow

// TODO: print 'without a manual action: <n> entries'
console.log('without a manual action: 0 entries');`,
          examples: [
            { input: 'None', output: 'under a manual action:\\ndomain:pbn-links.biz\\ndomain:guest-post-farm.net\\ndomain:scraper-mirror.xyz\\nwithout a manual action: 0 entries', explanation: 'Zero without a manual action is the correct answer for almost every site that asks.' },
          ],
        },
        {
          kind: 'code',
          prompt: 'Specify the linkable asset you would actually build. Name the audience who would cite it, the specific claim it lets them make, the data behind it, and how you would know within 90 days whether it worked. "A blog post" is not an asset.',
          language: 'markdown',
          runnable: false,
          starterCode: `# Linkable asset brief

## What it is
TODO: one sentence. Be specific about the format — dataset, calculator, benchmark, original survey.

## Who cites it, and in what sentence
TODO: name the kind of page that would link to this, and write the sentence
they would write around the link.

## Where the data comes from
TODO: your own data, a survey you run, or a public dataset you process.
If you cannot answer this, it is not a linkable asset.

## Why it does not exist already
TODO:

## Success test at 90 days
TODO: a number — referring domains, or citations from a named tier of site.`,
        },
      ],
    },
  },
};
