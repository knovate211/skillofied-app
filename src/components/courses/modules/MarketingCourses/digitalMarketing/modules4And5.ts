import { MarketingLesson } from '../types';

export const modules4And5Lessons: Record<string, MarketingLesson> = {
  // ─── Module 4: Email ──────────────────────────────────────────────────
  "dm-m4-l1": {
    title: "Lead Magnet Design & List Growth",
    objective: "design a lead magnet people actually want and grow a list legally.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Imagine a bakery that gives you a free recipe card if you write your email address in a little book by the till. You get something useful straight away. The bakery gets a way to tell you about new cakes later. That swap is a lead magnet, and the little book is your email list." },
      { type: "text", value: "Email is the only marketing channel you truly own. No algorithm decides whether your message is delivered. No social platform can remove your audience overnight. That makes growing an email list one of the most long-lasting investments in marketing." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Email list", "The group of people who have agreed to receive emails from you."],
        ["Subscriber", "One person on your list."],
        ["Lead", "A person who has shown interest (for example, by giving their email) but has not bought yet."],
        ["Lead magnet", "A free, useful thing you give in exchange for an email address — a checklist, template or discount."],
        ["Opt-in", "The moment a person actively says 'yes, email me'."],
        ["Double opt-in", "The person signs up, then clicks a link in a confirmation email to prove the address is real and theirs."],
        ["Consent", "Clear permission to contact someone. Under the law it must be given freely and actively."],
        ["GDPR", "General Data Protection Regulation — the EU law on personal data. The UK has its own version (UK GDPR)."],
        ["PECR", "Privacy and Electronic Communications Regulations — UK rules that cover marketing emails specifically."],
        ["Deliverability", "How often your emails land in the inbox instead of the spam folder."],
        ["Spam complaint", "When a subscriber clicks 'Report spam'. Too many of these harm your deliverability."],
        ["Sign-up form", "The box on your website where people type their email address."],
      ] },

      { type: "heading", value: "Why email is worth building" },
      { type: "text", value: "On social media you 'rent' your audience. The platform can change its rules, reduce your reach or close your account. An email list stays with you, even if you change email software, because you can export it." },
      { type: "compare", columns: [
        { title: "Owned: email list", tone: "olive", items: [
          "You decide when to send.",
          "No algorithm filters your message before delivery.",
          "You can export and move it to another tool.",
        ] },
        { title: "Rented: social followers", tone: "rose", items: [
          "The platform decides who sees your post.",
          "Reach can drop overnight after a rule change.",
          "If the account is closed, the audience is gone.",
        ] },
      ] },

      { type: "heading", value: "What makes a lead magnet work" },
      { type: "text", value: "A lead magnet trades something valuable for an email address. The trade has to feel worth it to the visitor." },
      { type: "text", value: "Generic ebooks usually perform poorly. Everyone has one, and almost nobody reads them." },
      { type: "list", items: [
        "Solve one specific problem completely. Do not cover a big topic in a shallow way.",
        "Give value immediately. A checklist someone uses in ten minutes beats a 60-page PDF that never gets opened.",
        "Match the product you will eventually sell. If the giveaway is unrelated, you attract people who wanted the giveaway — not your product — and the list will not buy.",
        "Prefer templates, calculators, checklists and swipe files (collections of ready-to-copy examples) over long documents.",
      ] },
      { type: "example", title: "Weak versus strong", value: "Weak:   \"The Ultimate Guide to Digital Marketing\" (80-page PDF)\n        Broad, generic, attracts everyone and therefore nobody.\n\nStrong: \"Google Ads Negative Keyword List for E-commerce\n        — 300 terms that waste budget\"\n        Specific, immediately usable, and attracts exactly the\n        person who would buy an ads service." },
      { type: "compare", columns: [
        { title: "Good lead magnet", subtitle: "For Rosie's Bakery", tone: "olive", items: [
          "'10% off your first celebration cake' — directly linked to what she sells.",
          "'Printable birthday cake order checklist: sizes, flavours, allergy notes' — useful in five minutes.",
          "Clear promise of what emails will follow: 'monthly new bakes and offers'.",
        ] },
        { title: "Weak lead magnet", subtitle: "For Rosie's Bakery", tone: "rose", items: [
          "'Enter to win an iPad' — attracts prize hunters, not cake buyers.",
          "'The Complete History of Bread' 50-page ebook — nobody reads it.",
          "No explanation of what the subscriber will receive afterwards.",
        ] },
      ] },

      { type: "heading", value: "Consent and the law" },
      { type: "text", value: "Under GDPR, UK GDPR and similar laws, consent must be freely given, specific, informed and unambiguous. In plain words: the person chose it, knew what they were signing up for, and took a clear action." },
      { type: "list", items: [
        "Pre-ticked boxes are not consent.",
        "Adding people who handed you a business card is not consent.",
        "Buying a list is not consent. Sending to it also damages your sending reputation and exposes you legally.",
        "Every marketing email must include an easy way to unsubscribe. Major inbox providers such as Gmail and Yahoo now expect a one-click unsubscribe from bulk senders.",
        "Keep a record of when and how each person signed up. Good email tools do this for you.",
      ] },
      { type: "text", value: "In the UK, PECR includes a 'soft opt-in': you may email existing customers about similar products if you gave them a clear chance to opt out when they bought. This is a narrow exception — if you are unsure, ask for explicit consent." },
      { type: "alert", value: "A small engaged list beats a large indifferent one on every metric that matters. Bought and scraped lists produce spam complaints. Those complaints harm deliverability for your genuine subscribers too, so the damage spreads beyond the bad addresses." },

      { type: "steps", title: "Walkthrough: create a sign-up form with a lead magnet in Brevo (free plan)", steps: [
        { label: "Create a free account", text: "Sign up at brevo.com. Mailchimp and MailerLite work in a very similar way if you prefer them. Free plans have sending limits, so check the current limits on the pricing page." },
        { label: "Create a contact list", text: "Go to Contacts > Lists and create a list called, for example, 'Website sign-ups'." },
        { label: "Build the form", text: "Go to Contacts > Forms (called 'Subscription forms'). Add an email field only. Every extra field reduces sign-ups." },
        { label: "Write clear consent wording", text: "Add a short line such as 'Get our monthly new bakes and your 10% discount code. Unsubscribe any time.' Add an unticked consent checkbox if you collect other data." },
        { label: "Turn on double opt-in", text: "Choose the double opt-in option so new subscribers confirm by clicking a link. This keeps fake and mistyped addresses off your list." },
        { label: "Deliver the lead magnet", text: "Edit the final confirmation email to include the discount code or a link to the PDF checklist." },
        { label: "Publish the form", text: "Copy the embed code or the hosted form link and add it to your website, link-in-bio page or receipts." },
        { label: "Test it yourself", text: "Sign up with your own email. Check that the confirmation arrives, the link works and the lead magnet is delivered." },
      ] },

      { type: "example", title: "Worked example: Rosie's Bakery list growth (illustrative figures)", value: "Rosie adds a sign-up form offering '10% off your first celebration cake'.\n\nWebsite visitors in a month:         2,000\nPeople who sign up:                     80\n\nSign-up rate = sign-ups ÷ visitors × 100\n             = 80 ÷ 2,000 × 100\n             = 0.04 × 100\n             = 4%\n\nOf those 80, 10 order a cake within a month.\nConversion from subscriber = 10 ÷ 80 × 100 = 12.5%\n\nAverage cake order:  £40\nRevenue from list:   10 × £40 = £400\nDiscount given:      10 × £4  = £40\nRevenue after discount: £400 − £40 = £360\n\nBefore, with a generic 'Join our newsletter' box, only 20 people\nsigned up (20 ÷ 2,000 × 100 = 1%). A specific, relevant magnet\nquadrupled sign-ups." },

      { type: "warning", value: "Common beginner mistakes: (1) Offering a prize unrelated to the business, which fills the list with people who never buy. (2) Buying or scraping email addresses. (3) Pre-ticking the consent box. (4) Asking for name, phone, birthday and postcode on the sign-up form — every field loses people. (5) Forgetting to deliver the promised freebie, or sending it days later. (6) Not telling people what emails they will get, so they later mark you as spam." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Pick a small business you know (or use Rosie's Bakery).",
        "Write down the one product it most wants to sell.",
        "Brainstorm three lead magnet ideas that solve a small, specific problem for someone who would buy that product.",
        "For each idea, ask: 'Could someone use this within ten minutes?' Cross out any that fail.",
        "Write a one-sentence sign-up promise for your best idea, including what emails will follow and that people can unsubscribe.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why is a 'Win an iPad' giveaway usually a poor lead magnet for a bakery? (It attracts people who want an iPad, not cakes, so the list will not buy.)",
        "Is a pre-ticked 'Yes, send me offers' box valid consent under GDPR? (No — consent requires a clear, active choice by the person.)",
        "Why can a bought list hurt emails to your real subscribers? (Spam complaints and bounces damage your sender reputation, so more of all your emails go to spam.)",
      ] },
    ],
    takeaways: [
      "Email is a channel you own — no algorithm sits between you and the subscriber.",
      "A good lead magnet solves one specific problem and can be used straight away.",
      "Match the lead magnet to what you sell, or the list will not buy.",
      "Consent must be clear and active; never pre-tick boxes or buy lists.",
      "Use double opt-in and keep the sign-up form short.",
    ],
  },

  "dm-m4-l2": {
    title: "Writing High-Open-Rate Sequences",
    objective: "write emails that get opened and read, and structure a welcome sequence.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Think of your inbox as a busy doormat full of letters. The subject line is the writing on the envelope — it decides whether the letter is opened or thrown away. A welcome sequence is like a friendly host at a party: they greet you when you arrive, show you around, and only later suggest you try the food." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Subject line", "The title of the email shown in the inbox."],
        ["Preview text (preheader)", "The short grey line shown next to or under the subject line."],
        ["Open rate", "The percentage of delivered emails that were opened."],
        ["Click rate (CTR)", "Click-through rate — the percentage of delivered emails where someone clicked a link."],
        ["CTA", "Call to action — the one thing you ask the reader to do, such as 'Order your cake'."],
        ["Sequence", "A series of emails sent automatically, one after another, with set gaps between them."],
        ["Welcome sequence", "The sequence a new subscriber receives right after signing up."],
        ["Broadcast / newsletter", "A one-off email sent to the whole list at the same time."],
        ["Deliverability", "How often your emails reach the inbox rather than spam."],
        ["Promotions tab", "A separate Gmail tab for marketing emails. Less visible than the main inbox."],
        ["Apple MPP", "Apple Mail Privacy Protection — a feature that pre-loads emails, so many show as 'opened' even if the person never read them."],
        ["Merge field", "A placeholder like {{first_name}} that the tool fills with each subscriber's details."],
        ["Pruning / sunsetting", "Removing subscribers who have not engaged for a long time."],
        ["A/B test (subject line)", "Sending two subject lines to small parts of the list to see which works better."],
      ] },

      { type: "heading", value: "Subject lines" },
      { type: "text", value: "The subject line has one job: to earn the open. It is the only part most subscribers see." },
      { type: "text", value: "Being specific beats being clever. A clear statement of what is inside does better than wordplay almost every time." },
      { type: "list", items: [
        "Keep it short enough to show fully on a phone — around 40 characters.",
        "Be specific: '3 ad settings that waste budget' beats 'Marketing tips'.",
        "Do not trick people. Putting 'Re:' on an email that is not a reply gets opened once, then teaches people to distrust you.",
        "The preview text is a second headline. Write it on purpose; do not let the tool fill it with 'View this email in your browser'.",
      ] },
      { type: "compare", columns: [
        { title: "Good subject lines", tone: "olive", items: [
          "'Your 10% cake code is inside' (preview: 'Valid for 30 days on any celebration cake')",
          "'New this week: cinnamon sourdough'",
          "'Order by Thursday for Saturday birthdays'",
        ] },
        { title: "Weak subject lines", tone: "rose", items: [
          "'Newsletter #14' — says nothing about what is inside.",
          "'RE: your order' — fake reply, feels like a trick.",
          "'!!! AMAZING DEALS YOU WON'T BELIEVE !!!' — shouting looks like spam.",
        ] },
      ] },

      { type: "heading", value: "The body of the email" },
      { type: "text", value: "Write to one person. Email is read by one person at a time. Copy written to 'everyone' feels like a broadcast nobody needs to care about." },
      { type: "list", items: [
        "Keep paragraphs short — one to three sentences.",
        "Get to the point in the first two lines.",
        "Include exactly one call to action. Several different asks reduce the response to all of them.",
        "Make the button or link text say what happens: 'Choose your cake' rather than 'Click here'.",
      ] },

      { type: "heading", value: "Measuring emails honestly in 2026" },
      { type: "text", value: "Open rates are less reliable than they used to be. Apple Mail Privacy Protection loads emails automatically, so many opens are recorded even when nobody read the message. This makes open rates look higher than reality." },
      { type: "text", value: "Use open rate as a rough signal, especially for comparing subject lines on the same list. Judge success mainly on clicks, replies, orders and unsubscribes." },

      { type: "heading", value: "The welcome sequence" },
      { type: "text", value: "Interest is highest right after someone signs up. A welcome sequence uses that moment, instead of leaving a new subscriber waiting until your next newsletter." },
      { type: "example", title: "A five-email welcome sequence", value: "1  Immediately  Deliver what was promised. Nothing else.\n2  Day 2        The single most useful thing you know. Pure value.\n3  Day 4        A customer story: problem, what changed, outcome.\n4  Day 6        Address the objection that stops most people buying.\n5  Day 8        A clear offer with a genuine reason to act now.\n\nFour emails of value before one ask. The ratio is the point." },

      { type: "steps", title: "Walkthrough: set up a welcome sequence in Mailchimp or Brevo", steps: [
        { label: "Open the automation builder", text: "In Mailchimp go to Automations and choose a pre-built 'Welcome new contacts' journey. In Brevo go to Automations and choose the 'Welcome message' template." },
        { label: "Choose the trigger", text: "Set the starting point to 'Contact added to list' (or 'Signs up through form') and pick your sign-up list." },
        { label: "Add email 1", text: "Send immediately. Deliver the lead magnet and say what emails will come next." },
        { label: "Add a delay, then email 2", text: "Add a 'Wait 2 days' step, then your most useful tip." },
        { label: "Repeat for emails 3 to 5", text: "Add delays and emails for the customer story, the common objection and the offer." },
        { label: "Set an exit condition", text: "If the tool allows it, stop the sequence when the contact makes a purchase, so buyers do not get the 'please buy' email." },
        { label: "Check merge fields and links", text: "Send a test to yourself. Confirm the first name fills in correctly (or has a fallback like 'there') and every link works on a phone." },
        { label: "Switch it on and review after two weeks", text: "Look at clicks and unsubscribes for each email. Rewrite the weakest one first." },
      ] },

      { type: "alert", value: "Deliverability is earned. Engagement signals — opens, clicks, replies, and not being marked as spam — decide whether you land in the inbox or the promotions tab. Gmail and Yahoo also require bulk senders to authenticate their domain (SPF, DKIM and DMARC settings, which your email tool guides you through) and keep spam complaints very low. Regularly removing people who have not engaged in about six months improves delivery for everyone else. A smaller list can genuinely produce more revenue." },

      { type: "example", title: "Worked example: Rosie's Bakery welcome sequence (illustrative figures)", value: "80 new subscribers join in a month.\n\nEmail 1 (discount code)\n  Clicks: 40      Click rate = 40 ÷ 80 × 100 = 50%\n\nEmail 5 (offer: 'Order by Friday, free delivery')\n  Clicks: 12      Click rate = 12 ÷ 80 × 100 = 15%\n  Orders:  6      Order rate = 6 ÷ 80 × 100  = 7.5%\n\nRevenue: 6 orders × £35 average = £210\n\nReported open rate for email 5: 60%.\nRosie ignores this as a headline number, because Apple MPP inflates\nopens. She focuses on the 15% clicks and 6 orders instead." },

      { type: "warning", value: "Common beginner mistakes: (1) Clever or vague subject lines that hide what the email is about. (2) Leaving preview text blank. (3) Three or four different buttons in one email. (4) Selling hard in the very first welcome email. (5) Celebrating a high open rate without checking clicks or sales. (6) A broken merge field showing 'Hi {{first_name}}' — always set a fallback. (7) Never removing inactive subscribers." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Open your own inbox and find three marketing emails you opened recently.",
        "Write down each subject line and preview text. Note why you opened it.",
        "For Rosie's Bakery, write three subject lines under 40 characters for a new 'weekend brownie box'.",
        "Write a preview text for each one that adds new information.",
        "Draft email 2 of her welcome sequence in five short paragraphs with exactly one call to action.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why should you not rely only on open rate in 2026? (Apple Mail Privacy Protection records many opens automatically, so the figure is inflated; clicks and sales are more reliable.)",
        "In the five-email welcome sequence, how many emails give value before the main offer? (Four.)",
        "Why include only one call to action per email? (Competing asks split attention and reduce the response to all of them.)",
      ] },
    ],
    takeaways: [
      "Specific subject lines beat clever ones — and always write the preview text.",
      "Write to one person, with short paragraphs and one call to action.",
      "Welcome sequences use the moment when interest is highest, right after signup.",
      "Give value several times before you ask for a sale.",
      "Treat open rates with caution; judge emails on clicks, replies and orders.",
      "Remove long-term inactive subscribers — it helps the rest reach the inbox.",
    ],
  },

  "dm-m4-l3": {
    title: "Setting up Behavioral Triggers & Workflows",
    objective: "build automations that respond to behaviour rather than to a calendar.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "A broadcast email is like shouting an announcement across a shop floor at 10am, whether anyone is listening or not. A behavioural trigger is like a shop assistant who notices you put a cake down and walked away, and quietly asks, 'Can I help with anything?' The assistant speaks to the right person at the right moment." },
      { type: "text", value: "An automation goes to one person at the moment their behaviour shows it is relevant. It consistently beats broadcasts, because relevance and timing are most of what makes email work." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Automation / workflow", "A set of emails that sends itself when certain conditions are met."],
        ["Trigger", "The event that starts an automation, such as 'added item to basket'."],
        ["Behavioural trigger", "A trigger based on what a person does (clicks, visits, buys), not on a calendar date."],
        ["Broadcast", "One email sent to a whole list at a time you choose."],
        ["Abandoned cart", "When a shopper adds items to their basket but leaves without paying."],
        ["Delay / wait step", "A pause inside a workflow, such as 'wait 24 hours'."],
        ["Condition / branch", "A yes/no check inside a workflow, such as 'Has the person bought?'"],
        ["Exit condition", "A rule that removes someone from a workflow, such as 'made a purchase'."],
        ["Suppression", "Stopping certain people from receiving certain emails."],
        ["Re-engagement", "Emails trying to win back subscribers who have stopped opening or clicking."],
        ["Merge field", "A placeholder like {{first_name}} filled in with each person's details."],
        ["Integration", "A connection between your shop platform (e.g. Shopify, WooCommerce) and your email tool, so behaviour data flows across."],
        ["Margin", "The profit left from a sale after the cost of making or buying the product."],
      ] },

      { type: "heading", value: "Automations worth building first" },
      { type: "table", headers: ["Trigger", "Message", "Why it works"], rows: [
        ["Signed up", "Welcome sequence", "Interest is at its peak"],
        ["Abandoned cart", "Reminder, then help, then incentive", "Highest-return automation in e-commerce; intent was explicit"],
        ["Viewed pricing, did not buy", "Address the common objection", "Behaviour signalled evaluation"],
        ["Inactive 60 days", "Re-engagement, then removal", "Protects deliverability"],
        ["Purchased", "Onboarding, then a relevant next product", "Keeping customers costs less than finding new ones"],
      ] },

      { type: "heading", value: "Abandoned cart: the best place to start" },
      { type: "text", value: "Abandoned cart is usually the highest-return automation a shop can build. The person chose a product and then stopped." },
      { type: "text", value: "You know exactly what they wanted, and you know they nearly bought it. Often they were simply interrupted." },
      { type: "text", value: "Note: the email tool can only send cart emails to people it can identify — usually logged-in customers or people who typed their email at checkout — and who have agreed to marketing where your local law requires it." },
      { type: "example", title: "Abandoned cart sequence", value: "1 hour   Simple reminder. Often just a distraction, no incentive needed.\n24 hours Address friction: shipping cost, returns policy, sizing help.\n72 hours Incentive, if margin allows.\n\nDiscounting in the first email trains customers to abandon carts\ndeliberately. Hold the incentive back." },
      { type: "compare", columns: [
        { title: "Good cart email", tone: "olive", items: [
          "Shows the exact item left behind, with a photo.",
          "Subject: 'Your lemon drizzle cake is still in your basket'.",
          "Answers a likely worry: 'Next-day local delivery, free over £30'.",
          "Stops as soon as the person buys.",
        ] },
        { title: "Bad cart email", tone: "rose", items: [
          "Generic 'You forgot something!' with no product shown.",
          "20% discount in the first email, one hour later.",
          "Five reminders in two days.",
          "Keeps sending after the customer has already paid.",
        ] },
      ] },

      { type: "steps", title: "Walkthrough: build an abandoned cart workflow (Shopify + Klaviyo, Mailchimp or Brevo)", steps: [
        { label: "Connect your shop", text: "Install your email tool's official integration for your shop platform (for example the Mailchimp, Klaviyo or Brevo app for Shopify, or the WooCommerce plugin). This sends basket and purchase events to the email tool." },
        { label: "Choose the template", text: "Open Automations and pick the pre-built 'Abandoned cart' (sometimes called 'Abandoned checkout') workflow." },
        { label: "Set the trigger", text: "Trigger: 'Started checkout' or 'Added to cart' without a completed order." },
        { label: "Email 1 after 1 hour", text: "A friendly reminder with the dynamic product block, so the basket items appear automatically. No discount." },
        { label: "Wait 23 hours, then email 2", text: "Answer common worries: delivery cost, allergy information, how to change the order date." },
        { label: "Wait 48 hours, then email 3", text: "Optional small incentive, only if your margin allows it." },
        { label: "Add the exit condition", text: "Set 'Exit when: Placed order'. Check this carefully — it is the most important setting." },
        { label: "Test with real data", text: "Use a test customer email, add an item, leave, and wait for email 1. Then buy and confirm no more emails arrive." },
        { label: "Put a review in the calendar", text: "Every three months, check that each email still sends, links work and the products shown are correct." },
      ] },

      { type: "alert", value: "Automations run on their own, so their failures are quiet and can last for months. A broken merge field sends 'Hi {{first_name}}' to thousands of people. A badly timed trigger sends a 'please buy' reminder to someone who already bought. Test with real data, and review live automations every quarter." },

      { type: "heading", value: "Suppression and exit conditions" },
      { type: "text", value: "Every automation needs exit conditions. Someone who completes a purchase must stop getting cart reminders immediately." },
      { type: "text", value: "Also think about overlap. A new customer could be in the welcome sequence, the cart workflow and a sale broadcast on the same day. Many tools let you limit how many emails one person receives per day, or pause other workflows while one is running." },
      { type: "text", value: "Nothing damages trust faster than being chased for something you already did." },

      { type: "example", title: "Worked example: a small online candle shop (illustrative figures)", value: "Abandoned carts per month:          200\nAverage basket value:               £30\nValue left in baskets: 200 × £30 =  £6,000\n\nCart workflow results\n  Email 1 (reminder):  10 orders\n  Email 2 (help):       6 orders\n  Email 3 (5% off):     4 orders\n  Total recovered:     20 orders\n\nRecovery rate = 20 ÷ 200 × 100 = 10%\nRevenue       = 20 × £30        = £600\nDiscount cost = 4 × (£30 × 5%)  = 4 × £1.50 = £6\nNet revenue   = £600 − £6       = £594 a month\n\nBecause 16 of the 20 orders came before any discount, putting the\ndiscount in email 1 would have given away money on those 16 orders:\n16 × £1.50 = £24 lost, and taught customers to wait for a code." },

      { type: "warning", value: "Common beginner mistakes: (1) No exit condition, so buyers keep getting reminders. (2) Offering a discount in the first cart email. (3) Never testing the workflow with a real order. (4) Merge fields with no fallback. (5) Building ten automations at once instead of perfecting the welcome and cart flows first. (6) Forgetting a workflow exists, so it keeps promoting a product that is sold out. (7) Sending cart emails to people who have not agreed to marketing where consent is required." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Pick a small online shop (or Rosie's Bakery taking online orders).",
        "List three customer behaviours that could trigger an email (for example: signed up, left a basket, bought for the first time).",
        "For one of them, sketch a workflow on paper: trigger, delays, each email's single purpose.",
        "Write the exit condition for that workflow in one sentence.",
        "Write down one thing that could go wrong silently, and how you would test for it.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why should the discount not be in the first abandoned cart email? (Many people buy after a simple reminder, so an early discount wastes margin and teaches customers to abandon carts on purpose.)",
        "What is an exit condition? (A rule that removes someone from a workflow, such as stopping cart reminders once they place an order.)",
        "In the candle shop example, what was the recovery rate? (20 recovered orders ÷ 200 abandoned carts × 100 = 10%.)",
      ] },
    ],
    takeaways: [
      "Behaviour-based emails beat calendar broadcasts because they are relevant and well-timed.",
      "Abandoned cart is usually the highest-return automation for a shop.",
      "Hold back discounts — do not offer one in the first reminder.",
      "Every workflow needs an exit condition, especially 'has purchased'.",
      "Test with real data and review automations every quarter, because failures are silent.",
    ],
  },

  // ─── Module 5: CRO ────────────────────────────────────────────────────
  "dm-m5-l1": {
    title: "Landing Page Best Practices",
    objective: "diagnose and improve a landing page against the reasons people fail to convert.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Imagine you pay to put a sign on the high street that brings 100 people into your bakery. If the shop is messy, prices are hidden and the till is hard to find, most will walk out. Conversion optimisation is tidying the shop so more of the people who already came in actually buy." },
      { type: "text", value: "Conversion optimisation works on traffic you have already paid for. That is why it is usually the cheapest growth available. Lifting a landing page from 2% to 3% gives the same result as increasing traffic by half, with no extra advertising cost." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["CRO", "Conversion rate optimisation — improving a page so a higher share of visitors take the action you want."],
        ["Conversion", "The action you want a visitor to take: buy, book, sign up, call."],
        ["Conversion rate", "Conversions ÷ visitors × 100, shown as a percentage."],
        ["Landing page", "The page a visitor arrives on, often from an advert or email, built for one goal."],
        ["Traffic", "The visitors coming to your website."],
        ["Bounce / bounce rate", "A visit where the person leaves without engaging. In GA4 this is the opposite of 'engagement rate'."],
        ["Above the fold", "The part of the page visible before scrolling."],
        ["CTA", "Call to action — the main button or link, such as 'Book a tasting'."],
        ["Friction", "Anything that makes the action harder: long forms, forced account creation, confusing errors."],
        ["Social proof", "Evidence that others trust you: reviews, ratings, customer stories."],
        ["Message match", "The page clearly continues the promise made in the advert or email that brought the visitor."],
        ["Page speed", "How quickly the page loads and becomes usable."],
        ["Core Web Vitals", "Google's page experience measures: loading (LCP), responsiveness (INP) and visual stability (CLS)."],
        ["GA4", "Google Analytics 4 — Google's free website analytics tool."],
      ] },

      { type: "heading", value: "Why visitors do not convert" },
      { type: "text", value: "Almost every failure comes down to one of four causes. Working out which one applies is more useful than redesigning at random." },
      { type: "table", headers: ["Cause", "Symptom", "Fix"], rows: [
        ["Unclear value", "High bounce, short time on page", "State plainly what it is and who it is for, above the fold"],
        ["Insufficient trust", "Reaches the form, does not submit", "Reviews, named case studies, guarantees, security signals"],
        ["Too much friction", "Starts the form, abandons it", "Fewer fields, no forced account creation, clearer errors"],
        ["Wrong traffic", "Everything looks fine but nobody buys", "Fix targeting — the page is not the problem"],
      ] },
      { type: "alert", value: "The fourth cause is the one most often missed. If an advert promises a free tool and the landing page sells a subscription, no amount of page improvement will fix it. Check message match between the ad and the page before touching the design." },

      { type: "heading", value: "Structural principles" },
      { type: "list", items: [
        "One page, one goal. Competing calls to action reduce all of them.",
        "The headline should say what it is and who it is for — not a slogan.",
        "Place proof next to the point of hesitation. For example, put a delivery review next to the delivery price, not all reviews in one band at the bottom.",
        "Ask only for information you genuinely need now. Every form field costs conversions.",
        "Make the main action impossible to miss.",
        "Design for mobile first — for many small businesses most visitors are on phones.",
      ] },
      { type: "text", value: "Speed matters for conversions as well as for SEO. Each extra second of loading time measurably reduces conversions, and the effect is larger on slow mobile connections. Large, uncompressed images are the most common cause on small business sites." },

      { type: "compare", columns: [
        { title: "Strong landing page", subtitle: "Rosie's Bakery: wedding cakes", tone: "olive", items: [
          "Headline: 'Wedding cakes baked in Bristol — book a free tasting'.",
          "One button: 'Book a tasting', repeated down the page.",
          "Short form: name, email, wedding date.",
          "Reviews with names and photos placed next to the price guide.",
          "Loads in under 3 seconds on a phone.",
        ] },
        { title: "Weak landing page", subtitle: "Same business", tone: "rose", items: [
          "Headline: 'Baked with love since 2015' — a slogan, not an offer.",
          "Buttons for newsletter, Instagram, bread menu and wedding enquiry.",
          "Ten-field form including budget, guest count and phone number.",
          "Prices hidden: 'Contact us for a quote'.",
          "Huge hero photo that takes 8 seconds to load.",
        ] },
      ] },

      { type: "steps", title: "Walkthrough: find where visitors drop off with a GA4 funnel exploration", steps: [
        { label: "Open Explore", text: "In Google Analytics 4, click Explore in the left menu, then choose 'Funnel exploration'." },
        { label: "Define the steps", text: "Edit the steps. For example: Step 1 'page_view' where page path = /wedding-cakes; Step 2 'form_start'; Step 3 'generate_lead' (or your form submission event)." },
        { label: "Set the date range", text: "Pick at least the last 28 days so the numbers are not tiny." },
        { label: "Add a breakdown", text: "Drag 'Device category' into Breakdown to compare mobile and desktop." },
        { label: "Read the drop-off", text: "Look at the percentage lost between each step. The biggest drop is where to look first." },
        { label: "Match it to a cause", text: "Big drop before form_start suggests unclear value or trust. Big drop between form_start and submit suggests friction." },
        { label: "Check message match", text: "Open the adverts or emails sending traffic to the page and read them next to the page headline." },
      ] },

      { type: "example", title: "Worked example: Rosie's wedding cake page (illustrative figures)", value: "Visitors to the page last month:      1,500\nStarted the form:                       300\nSubmitted the form:                      30\n\nOverall conversion rate = 30 ÷ 1,500 × 100 = 2%\n\nDrop-off inside the form:\n  Completion = 30 ÷ 300 × 100 = 10%\n  So 90% of people who started the form gave up → friction.\n\nRosie cuts the form from 10 fields to 3.\nNext month: 1,500 visitors, 300 starts, 45 submissions.\n\nNew conversion rate = 45 ÷ 1,500 × 100 = 3%\n\nWhat it is worth:\n  To get 45 enquiries at the old 2% rate she would need\n  45 ÷ 0.02 = 2,250 visitors — 750 more.\n  750 ÷ 1,500 = 0.5 → the same as 50% more traffic, for free." },

      { type: "warning", value: "Common beginner mistakes: (1) Redesigning the whole page based on personal taste instead of finding the cause. (2) Sending ad traffic to the home page instead of a focused landing page. (3) A headline that is a slogan. (4) Too many buttons and links. (5) Asking for phone number and company details 'just in case'. (6) Testing the page only on a fast desktop, never on a phone. (7) Blaming the page when the advert is attracting the wrong people." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Open a landing page from a real advert (search for a product and click a sponsored result).",
        "Cover the page after five seconds. Write down what it offers and who it is for. If you cannot, value is unclear.",
        "Count the different calls to action on the page.",
        "Count the form fields and mark which are truly needed now.",
        "Run the page through PageSpeed Insights (pagespeed.web.dev) on mobile and note the load score.",
        "Write down which of the four causes seems most likely, and one change you would make.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Many visitors start a form but few submit it. Which cause is most likely? (Too much friction.)",
        "A page goes from 2% to 3% conversion with the same traffic. How much extra traffic would give the same gain at 2%? (50% more, because 3 ÷ 2 = 1.5.)",
        "An ad says 'free sample' but the page sells a £30 box. What should you fix first? (The message match between ad and page, not the page design.)",
      ] },
    ],
    takeaways: [
      "CRO improves traffic you already paid for, so it is usually the cheapest growth.",
      "Most failures come from four causes: unclear value, low trust, friction or wrong traffic.",
      "Check that the ad and the page make the same promise before redesigning.",
      "One page, one goal, and only the form fields you really need.",
      "Use a GA4 funnel to find the biggest drop-off before deciding what to fix.",
      "Speed matters, especially on mobile.",
    ],
  },

  "dm-m5-l2": {
    title: "A/B Testing Frameworks & Tools",
    objective: "run tests that produce trustworthy results rather than convincing noise.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Imagine Rosie wants to know whether a chocolate or a lemon cake sells better in her window. If she shows each for just one morning, the result could be luck — maybe it rained on the lemon day. To be sure, she needs many days and many customers. A/B testing is the same idea for web pages and emails: show two versions to lots of people and wait long enough to trust the answer." },
      { type: "text", value: "An A/B test splits traffic between two versions and measures which performs better. The mechanics are simple. The statistics are where most teams go wrong. A misread test is worse than no test, because it leads to a confident change in the wrong direction." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["A/B test (split test)", "Showing version A to some visitors and version B to others at the same time, then comparing results."],
        ["Control", "The current version (A)."],
        ["Variant", "The changed version (B)."],
        ["Hypothesis", "A clear guess with a reason: 'If we do X, Y will improve, because Z.'"],
        ["Baseline conversion rate", "Your current conversion rate before any change."],
        ["Lift", "How much better (or worse) the variant performs, usually as a percentage."],
        ["Relative vs absolute lift", "2% to 2.2% is +0.2 percentage points (absolute) but +10% (relative)."],
        ["MDE", "Minimum detectable effect — the smallest lift you want your test to be able to spot."],
        ["Sample size", "How many visitors (or conversions) each version needs before the result can be trusted."],
        ["Statistical significance", "A measure of how unlikely the difference would be if there were really no difference — i.e. that it is probably not just luck."],
        ["Confidence level (95%)", "The common standard: accept only about a 5% chance of calling a winner that is really just noise."],
        ["Statistical power (80%)", "The chance your test will detect a real effect of the size you chose. 80% is the usual standard."],
        ["Peeking", "Checking results repeatedly and stopping as soon as they look good. This creates false winners."],
        ["Noise", "Random ups and downs in data that look like patterns but mean nothing."],
        ["Qualitative evidence", "Non-numeric insight: interviews, recordings, support emails, reviews."],
      ] },

      { type: "heading", value: "A disciplined test" },
      { type: "list", ordered: true, items: [
        "Start from a hypothesis with a reason: 'Adding pricing to the landing page will increase form completions, because support tickets show cost is the top pre-sales question.'",
        "Change one thing. Otherwise you will not know what caused any difference.",
        "Calculate the sample size you need BEFORE starting, using your baseline rate and the smallest lift worth detecting.",
        "Run for whole weeks. Weekday and weekend behaviour differ, so a Tuesday-to-Friday test is biased.",
        "Decide in advance what result will make you change something.",
      ] },
      { type: "alert", value: "Stopping a test as soon as it looks significant is the most common and most damaging mistake. Results go up and down. If you keep checking and stop at the first good-looking moment, you will 'confirm' effects that do not exist. Set the duration and sample size first, then wait." },

      { type: "compare", columns: [
        { title: "Trustworthy test", tone: "olive", items: [
          "Hypothesis written down with a reason from real evidence.",
          "One change: headline only.",
          "Sample size calculated first: needs 4 weeks.",
          "Runs the full 4 weeks, even though B 'looked ahead' on day 3.",
          "Reports the result honestly, including 'no clear difference'.",
        ] },
        { title: "Convincing noise", tone: "rose", items: [
          "'Let's see what happens' with no hypothesis.",
          "New headline, new photo, new button colour and new price all at once.",
          "No sample size calculation.",
          "Stopped on day 3 because B was 30% ahead.",
          "'B wins by 30%!' from 12 versus 9 conversions.",
        ] },
      ] },

      { type: "heading", value: "Tools in 2026" },
      { type: "text", value: "Google Optimize, once the popular free option, was shut down in September 2023. It no longer exists. Today's options include:" },
      { type: "list", items: [
        "Built into email tools: Mailchimp, Brevo, MailerLite and Klaviyo can A/B test subject lines and content. This is the easiest place for a beginner to start.",
        "Website testing platforms: VWO, Optimizely, AB Tasty and Convert (paid), and PostHog or GrowthBook (with free tiers).",
        "Platform features: many website builders and Shopify apps offer simple split testing, and ad platforms such as Google Ads and Meta have built-in experiments.",
        "Free sample size calculators: search for an 'A/B test sample size calculator' (for example Evan Miller's or the calculators from testing vendors).",
      ] },
      { type: "text", value: "Remember that testing tools set cookies or similar identifiers, so they need to respect your cookie consent settings under GDPR and PECR." },

      { type: "steps", title: "Walkthrough: run a subject line A/B test in Mailchimp or Brevo", steps: [
        { label: "Write the hypothesis", text: "Example: 'A subject line naming the product will get more clicks than a general one, because past emails naming products did better.'" },
        { label: "Create an A/B campaign", text: "In Mailchimp choose Create > Email > A/B test (in Brevo, turn on A/B testing when creating the campaign)." },
        { label: "Choose what to test", text: "Pick 'Subject line'. Enter version A and version B. Keep everything else identical." },
        { label: "Choose the winning metric", text: "Pick clicks rather than opens where the tool allows it, because Apple Mail Privacy Protection inflates opens." },
        { label: "Set the test group and wait time", text: "For example, send A and B to 20% of the list each, wait 4 hours or more, then send the winner to the remaining 60%." },
        { label: "Check the size first", text: "If each test group would contain only a few hundred people, differences of one or two clicks are noise. Test to the whole list split 50/50 instead and treat results as a trend across several sends." },
        { label: "Record the result", text: "Write down both versions, the numbers and whether the difference was large enough to trust. Build up a log over time." },
      ] },

      { type: "heading", value: "What is realistic" },
      { type: "text", value: "Small sites often cannot run valid A/B tests at all. Detecting a small improvement on a low conversion rate needs a lot of traffic." },
      { type: "text", value: "For example, to reliably detect a 10% relative lift on a 2% baseline (95% confidence, 80% power), you need roughly 80,000 visitors per version — about 1,600 conversions each. A site with 1,000 visitors a month would need many years, and by then the market has changed." },
      { type: "example", title: "When testing is not viable", value: "Baseline conversion  2%\nMinimum detectable   +10% relative (2% → 2.2%)\nRequired             ~ 80,000 visitors per variant\n                     (160,000 in total)\n\nAt 1,000 visitors a month: 160,000 ÷ 1,000 = 160 months\n                          = over 13 years for one test.\n\nBetter approach at this scale: make well-reasoned improvements based\non qualitative evidence — session recordings, user interviews, support\ntickets — and judge them on trend rather than significance." },
      { type: "text", value: "Say so plainly when a test is not statistically viable. Reporting a 20% lift from 40 conversions as a finding is misleading, and decisions built on it will not hold." },

      { type: "example", title: "Worked example: significance intuition for a small online shop (illustrative figures)", value: "Test: new product page headline. Ran 2 full weeks.\n\n            Visitors   Orders   Conversion rate\nA (control)    1,000       20   20 ÷ 1,000 × 100 = 2.0%\nB (variant)    1,000       25   25 ÷ 1,000 × 100 = 2.5%\n\nRelative lift = (2.5 − 2.0) ÷ 2.0 × 100 = 25%\n\nSounds great. But is it luck?\n\nRough intuition: with counts this small, random variation is about\nthe square root of the count.\n  √20 ≈ 4.5    √25 = 5\nSo A could easily have been 16–24 and B 20–30. The ranges overlap\nheavily, so a 5-order gap is well within normal chance.\n\nA proper calculator agrees: this is nowhere near 95% confidence.\nVerdict: 'No reliable difference yet.' Keep B only if there is a\ngood qualitative reason, and do not report '+25%' as a proven win.\n\n(The square-root rule is a rough guide for intuition only; use a\nsignificance calculator for real decisions.)" },

      { type: "steps", title: "Walkthrough: check whether a test is even possible before you start", steps: [
        { label: "Find your baseline", text: "In GA4, go to Reports > Engagement > Pages and screens (or your conversion report) and note visitors and conversions for the page over the last 28 days." },
        { label: "Calculate the rate", text: "Conversions ÷ visitors × 100. Example: 40 ÷ 2,000 × 100 = 2%." },
        { label: "Choose the smallest lift worth finding", text: "Be realistic: most single changes produce small lifts, often 5–20% relative." },
        { label: "Use a sample size calculator", text: "Enter the baseline and the minimum detectable effect. Note visitors needed per variant." },
        { label: "Work out the duration", text: "Total visitors needed ÷ weekly visitors = weeks. Round up to whole weeks." },
        { label: "Decide", text: "If it takes more than about 4–8 weeks, do not A/B test. Use qualitative research and make a reasoned change instead." },
      ] },

      { type: "warning", value: "Common beginner mistakes: (1) Stopping the test the moment one version looks ahead. (2) Changing several things at once. (3) Testing tiny details, such as button colour, on a site with little traffic. (4) Running a test for three days instead of whole weeks. (5) Reporting a big percentage lift from a handful of conversions. (6) Picking the email winner by opens, which Apple Mail Privacy Protection inflates. (7) Looking for Google Optimize — it was discontinued in 2023." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Write one hypothesis for Rosie's Bakery in the form 'If we…, then…, because…'.",
        "Assume her order page has 3,000 visitors a month and 60 orders. Calculate the baseline conversion rate (60 ÷ 3,000 × 100).",
        "Open a free online A/B test sample size calculator. Enter that baseline and a 20% relative lift.",
        "Note the visitors needed per variant, then divide the total by 3,000 to get months.",
        "Decide: is an A/B test realistic here? If not, write one qualitative method she could use instead.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "Why is stopping a test early at the first 'significant' result a problem? (Results fluctuate, so repeatedly checking and stopping at a good moment produces false winners.)",
        "Conversion goes from 2% to 2.2%. What is the relative lift? ((2.2 − 2) ÷ 2 × 100 = 10%.)",
        "A site gets 800 visitors a month. What should it do instead of A/B testing small changes? (Use qualitative evidence — recordings, interviews, support questions — make reasoned changes and watch the trend.)",
      ] },
    ],
    takeaways: [
      "Start with a written hypothesis and change only one thing.",
      "Work out the sample size before starting, and run for whole weeks.",
      "Stopping early when results look good creates false winners.",
      "Small numbers produce big-looking percentages that are often just luck.",
      "Google Optimize is gone; email tools and platforms like VWO, Optimizely or PostHog replace it.",
      "Small sites often cannot test validly — use qualitative evidence instead.",
    ],
  },

  "dm-m5-l3": {
    title: "Analyzing User Heatmaps and Sessions",
    objective: "use qualitative tools to explain behaviour that analytics cannot.",
    content: [
      { type: "heading", value: "In simple terms" },
      { type: "text", value: "Analytics is like a till receipt: it tells you what was sold and when. Heatmaps and session recordings are like standing in the corner of the shop watching customers — you see where they hesitate, what they pick up and where they get confused." },
      { type: "text", value: "Analytics tells you what happened: 68% leave the checkout at step two. It does not tell you why. Qualitative tools answer the why, and together the two are far more useful than either alone." },

      { type: "heading", value: "Key terms" },
      { type: "table", headers: ["Term", "Plain meaning"], rows: [
        ["Quantitative data", "Numbers: visitors, clicks, conversion rates. Tells you what happened."],
        ["Qualitative data", "Observations and explanations: recordings, interviews, comments. Helps explain why."],
        ["Heatmap", "A picture of a page coloured by activity — hot (red) areas get lots of clicks or attention."],
        ["Click heatmap", "Shows where people click or tap."],
        ["Scroll map", "Shows how far down the page people scroll, often as a percentage at each point."],
        ["Session recording (replay)", "A video-like replay of one person's visit: mouse movement, scrolls, clicks."],
        ["Form analytics", "Shows which form field people pause on or abandon."],
        ["Dead click", "A click on something that does nothing, such as an image that is not a link."],
        ["Rage click", "Rapid repeated clicks in one place — a sign of frustration with something broken or slow."],
        ["Masking", "Hiding typed text and sensitive content so the tool never records it."],
        ["Personal data", "Any information that can identify a person, directly or indirectly. Protected by GDPR."],
        ["Consent banner (CMP)", "The cookie pop-up where visitors accept or reject tracking. CMP means consent management platform."],
        ["Microsoft Clarity", "A free heatmap and session recording tool from Microsoft."],
        ["Hotjar", "A popular heatmap, recording and survey tool with a free plan."],
      ] },

      { type: "heading", value: "The tools" },
      { type: "table", headers: ["Tool", "Shows", "Best used for"], rows: [
        ["Click heatmap", "Where people click", "Finding non-clickable elements people expect to click"],
        ["Scroll map", "How far down people read", "Checking whether key content is ever seen"],
        ["Session recording", "An individual visit replayed", "Understanding a specific point of confusion"],
        ["Form analytics", "Field-by-field abandonment", "Identifying exactly which question loses people"],
      ] },
      { type: "text", value: "Free options are good enough for most small businesses. Microsoft Clarity is free and includes heatmaps, recordings, and rage and dead click detection. Hotjar has a free plan with limits. Both can connect with GA4." },

      { type: "heading", value: "What they typically reveal" },
      { type: "list", items: [
        "People clicking images or headings that are not links. Your design is not meeting their expectation.",
        "Rage clicks: repeated rapid clicking on something that does not respond, which points to a broken or slow element.",
        "An important call to action placed below the point where 80% of visitors stop scrolling.",
        "One form field — often phone number or company size — where abandonment jumps.",
      ] },

      { type: "steps", title: "Walkthrough: set up Microsoft Clarity and review your first recordings", steps: [
        { label: "Create a project", text: "Go to clarity.microsoft.com, sign in and create a new project with your website address." },
        { label: "Install the code", text: "Use the built-in integration for your platform (for example Shopify or WordPress), or paste the tracking code into your site's head section." },
        { label: "Connect consent", text: "Make sure Clarity only runs after visitors accept analytics cookies where consent is required. Most consent banner tools and Clarity's consent settings support this." },
        { label: "Check masking", text: "In Settings > Masking, keep 'Strict' or 'Balanced' masking so typed text and sensitive content are hidden." },
        { label: "Optional: link GA4", text: "In Settings, connect your Google Analytics 4 property so you can jump between numbers and recordings." },
        { label: "Wait for data", text: "Give it a few days, or a week for a low-traffic site." },
        { label: "Open Heatmaps", text: "Choose your key page. Look at the click map for dead clicks, then the scroll map for where attention drops." },
        { label: "Filter recordings", text: "In Recordings, filter by 'Rage clicks', 'Dead clicks' or a page URL such as /checkout. Watch 10 to 15 sessions and note repeated patterns." },
        { label: "Write hypotheses", text: "Turn each repeated pattern into a sentence: 'People tap the cake photos expecting prices, so adding prices under photos may increase orders.'" },
      ] },

      { type: "alert", value: "Watching ten sessions will suggest a hypothesis; it does not prove one. It is easy to over-generalise from one frustrating recording. Use qualitative tools to create ideas, then check them with numbers where you have enough traffic." },

      { type: "compare", columns: [
        { title: "Good use of recordings", tone: "olive", items: [
          "Starts from a question: 'Why do 68% leave at checkout step two?'",
          "Watches many sessions and counts how often a pattern appears.",
          "Checks the pattern against GA4 numbers.",
          "Masks all typed input and respects consent.",
        ] },
        { title: "Poor use of recordings", tone: "rose", items: [
          "Watches random sessions with no question in mind.",
          "Redesigns the page after one annoying recording.",
          "Never compares with analytics data.",
          "Records card numbers and addresses because masking was switched off.",
        ] },
      ] },

      { type: "heading", value: "Privacy obligations" },
      { type: "text", value: "Session recording captures real people's behaviour, so it counts as personal data." },
      { type: "list", items: [
        "Configure the tool to mask form inputs. Never record passwords, payment details or personal information.",
        "Explain the recording in your privacy policy.",
        "Only load the tool after consent where the law requires it (cookie rules in the UK and EU usually do), and honour visitors' consent choices.",
        "Keep recordings only as long as you need them.",
      ] },
      { type: "text", value: "Making your analysis easier does not override a user's privacy." },

      { type: "example", title: "Worked example: Rosie's Bakery online order page (illustrative figures)", value: "GA4 shows (last 28 days):\n  Visitors to /order:            1,200\n  Clicked 'Add to basket':          96\n  Add-to-basket rate = 96 ÷ 1,200 × 100 = 8%\n\nClarity click heatmap:\n  310 taps on cake photos, which are not links (dead clicks).\n  310 ÷ 1,200 × 100 ≈ 26% of visitors tapped a photo.\n\nClarity scroll map:\n  Only 35% of visitors scroll far enough to see the\n  'Add to basket' buttons.\n  1,200 × 35% = 1,200 × 0.35 = 420 people see the button.\n  96 ÷ 420 × 100 ≈ 23% of those who see it click it.\n\nRecordings (15 watched): 9 people tap a photo, wait, then leave.\n\nHypothesis: make photos clickable and move 'Add to basket' higher.\n\nAfter the change (next 28 days):\n  1,200 visitors, 150 add to basket\n  150 ÷ 1,200 × 100 = 12.5% (up from 8%)\n\nWith this traffic Rosie treats it as a strong trend, not a proven\nresult, and keeps watching the numbers." },

      { type: "warning", value: "Common beginner mistakes: (1) Installing a recording tool without a consent banner or privacy policy update. (2) Turning off masking. (3) Drawing big conclusions from one or two recordings. (4) Watching hours of random sessions with no question in mind. (5) Only checking desktop heatmaps when most visitors use phones — look at mobile and desktop separately. (6) Leaving the tool running forever and never acting on what it shows." },

      { type: "heading", value: "Try it yourself" },
      { type: "list", ordered: true, items: [
        "Open any product page on a small online shop on your phone.",
        "Tap everything you think might be clickable. Note any 'dead clicks' where nothing happens.",
        "Note how far you had to scroll before you saw the main button.",
        "Write two hypotheses in the form 'People expect…, so changing… may increase…'.",
        "If you have your own site, sign up for Microsoft Clarity, install it with consent enabled, and set a reminder to review heatmaps in one week.",
      ] },

      { type: "heading", value: "Check your understanding" },
      { type: "list", items: [
        "What does a rage click usually indicate? (Frustration with an element that is broken, slow or not responding.)",
        "You watch three recordings where people struggle with the postcode field. Is that proof? (No — it is a hypothesis to check against form analytics or larger numbers.)",
        "Why must session recording tools mask inputs? (Recordings are personal data; passwords, payment and personal details must never be captured.)",
      ] },
    ],
    takeaways: [
      "Analytics shows what happened; heatmaps and recordings help explain why.",
      "Dead clicks, rage clicks and scroll depth point to specific problems.",
      "Form analytics shows exactly which field loses people.",
      "A few recordings suggest ideas — check them with numbers before trusting them.",
      "Free tools like Microsoft Clarity are enough for most small businesses.",
      "Recordings are personal data: mask inputs, get consent and update your privacy policy.",
    ],
  },
};
