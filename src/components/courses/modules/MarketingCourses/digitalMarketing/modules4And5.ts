import { MarketingLesson, MarketingAssignment } from '../types';
import { QuizQuestion } from '../../../../../types';

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

      { type: "text", value: "Do not try to learn that whole table today. Three rows do most of the work. Consent decides whether you may email a person at all. Deliverability decides whether the email arrives. The lead magnet decides whether anyone joins in the first place. Everything else is detail you will pick up as you practise." },
      { type: "text", value: "Notice that opt-in and consent are not quite the same thing. Opt-in is the action the person takes. Consent is the record you keep that proves they took it. If you cannot show when, where and what wording they agreed to, you do not really have consent." },

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

      { type: "text", value: "Read those two columns side by side and notice the asymmetry. Everything in the left column is a decision you make. Everything in the right column is a decision somebody else makes for you. That is the whole argument for email, and it is why this module comes before the paid channels in most sensible plans." },
      { type: "text", value: "This is not an argument for abandoning social media. Social is often the best place to meet people for the first time. The point is what happens next: move that new attention onto a list you control, rather than hoping the platform shows your next post to the same people." },

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

      { type: "text", value: "The pattern across both columns is the same. The good ideas are things a cake buyer wants. The weak ideas are things anybody wants. A prize draw will always collect more addresses than a discount on cake. It will also collect mostly people who will never order a cake, and you will pay to email them every month afterwards." },
      { type: "text", value: "A useful test before you build anything: finish the sentence 'Someone who wants this is probably about to…'. If the honest ending is 'order a celebration cake', the magnet is right. If the honest ending is 'enter another competition', start again." },

      { type: "example", title: "Second worked example: the sign-up promise, before and after", value: "The offer can be right and the wording can still lose people. Here is\nthe same Rosie's Bakery sign-up box, rewritten.\n\nBEFORE\n  Heading:  Join our newsletter\n  Body:     Sign up for updates from Rosie's Bakery.\n  Button:   Subscribe\n  Small print: (none)\n\n  What is wrong:\n    - 'Updates' promises nothing. The visitor cannot picture what\n      arrives or why they would want it.\n    - No mention of how often, so the visitor assumes 'too often'.\n    - No mention of unsubscribing, so signing up feels risky.\n    - 'Subscribe' describes what the form does, not what they get.\n\nAFTER\n  Heading:  Get 10% off your first celebration cake\n  Body:     Pop in your email and we will send your code straight\n            away, plus one email a month with new bakes and\n            seasonal ordering dates.\n  Button:   Send my 10% code\n  Small print: One email a month. Unsubscribe in one click, any time.\n\n  Why it works:\n    - The heading is the reward, not the mechanism.\n    - 'straight away' sets the expectation the next email must meet.\n    - 'one email a month' answers the unspoken worry.\n    - The button repeats the promise, so the last thing read before\n      clicking is the benefit.\n    - The unsubscribe line lowers the risk of saying yes, and it is\n      also honest about what you will do." },
      { type: "text", value: "Read the two versions out loud. The 'before' talks about the bakery. The 'after' talks about the reader. That one shift is most of what separates a sign-up form that works from one that does not." },

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

      { type: "text", value: "Look at what actually changed in that example. Rosie did not get more visitors. She did not spend more money. She changed what she offered and how she described it, and four times as many people joined. That is the shape of most early email wins: the traffic was already there." },
      { type: "text", value: "Be careful with the second half of the sum, though. Ten orders from eighty subscribers is a small number, so treat 12.5% as a rough early signal rather than a reliable rate. Watch it over three or four months before you plan anything around it." },

      { type: "heading", value: "Copy-paste: lead magnet and sign-up planner" },
      { type: "text", value: "Copy this into a document and fill it in before you build anything. If you cannot complete a line honestly, that is the part of the plan that needs more thought." },
      { type: "example", title: "Lead magnet and sign-up planner (fill in the blanks)", value: "BUSINESS: ____________________\n\n1. THE PRODUCT I MOST WANT TO SELL\n   ____________________\n\n2. THE PERSON WHO BUYS IT\n   They are trying to: ____________________\n   The small thing they are stuck on right now: ____________________\n\n3. THE LEAD MAGNET\n   Title (specific, not broad): ____________________\n   Format: checklist / template / calculator / discount / other\n   Time to value (must be under 10 minutes): ______ minutes\n   Link to the product above in one sentence: ____________________\n\n4. THE SIGN-UP BOX\n   Heading (the reward): ____________________\n   Body (what arrives, and how often): ____________________\n   Button text (repeats the reward): ____________________\n   Small print (frequency + unsubscribe): ____________________\n   Fields collected: email only?  Y / N\n     If N, list each extra field and why you need it NOW:\n     ____________________\n\n5. CONSENT RECORD\n   Double opt-in switched on?            Y / N\n   Consent box unticked by default?      Y / N\n   Wording shown is stored with the record? Y / N\n   Date, time and source stored?         Y / N\n   Lawful basis: consent / PECR soft opt-in\n     If soft opt-in, write why it applies: ____________________\n\n6. DELIVERY\n   What arrives immediately: ____________________\n   Where the file or code lives: ____________________\n   I have tested this myself end to end:  Y / N\n   Date tested: ______\n\n7. REVIEW\n   Sign-up rate after one month: ______%\n   Next thing I will change: ____________________" },
      { type: "text", value: "Section 5 is the one beginners skip. It is also the one that matters if anyone ever asks where a subscriber came from. Good email tools record all four of those items automatically, so the task is mostly checking that the settings are switched on." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Can I email people who gave me their business card at an event? A: Not for marketing, unless they clearly agreed to receive marketing emails. Handing over a card is a contact detail, not consent. Add them only if you asked and recorded the answer." },
      { type: "text", value: "Q: Does double opt-in not lose me subscribers? A: Yes, it loses some — typically the mistyped addresses, the throwaway ones and the half-interested. What remains is a list with fewer bounces and fewer spam complaints, which protects delivery for everyone else. On a small list that trade is almost always worth it." },
      { type: "text", value: "Q: We already sell to these people. Do we still need consent? A: In the UK the PECR soft opt-in may cover existing customers for similar products, if you gave them a clear chance to opt out when they bought and you give one in every email. It is narrower than people assume: it does not cover enquiries that never bought, and it does not cover unrelated products. If in doubt, ask for consent." },
      { type: "text", value: "Q: How big does a list need to be before it is worth it? A: There is no threshold. A list of 200 people who chose a specific offer can outperform 5,000 harvested addresses. Judge the list by orders and replies, not by the number at the top of the dashboard." },

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

      { type: "text", value: "Two rows in that table will change how you read every email report you ever see. Apple MPP is the reason open rate is no longer a scoreboard. Click rate is the number that survived it. Everything else in the table is vocabulary you will absorb by using it." },
      { type: "text", value: "One habit to build now: whenever someone quotes you an open rate, ask what the click rate was. If they do not know, the open rate on its own tells you almost nothing." },

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

      { type: "text", value: "Compare the two columns and you will see that the good ones all contain a noun a customer cares about: a code, a bake, a deadline. The weak ones contain only the sender talking about themselves, or shouting. Nouns beat adjectives in subject lines almost every time." },
      { type: "text", value: "The third weak example is worth a separate warning. Capital letters and rows of exclamation marks are among the oldest signals spam filters look at, and they also make a small bakery look like a stranger. Neither effect is worth the extra attention you hoped for." },

      { type: "example", title: "Second worked example: one email, before and after", value: "Rosie is sending a weekend brownie box announcement.\n\nBEFORE\n  Subject:  Rosie's Bakery Newsletter - September Edition\n  Preview:  View this email in your browser\n  Opening:  Hello everyone! We hope you are having a wonderful\n            month. It has been such a busy time here at the bakery\n            and we have lots of exciting news to share with you\n            all about what we have been up to lately.\n  Buttons:  Follow us on Instagram | Read our blog | Order online\n\n  What is wrong:\n    - The subject names the sender, not the reader's benefit.\n    - Preview text was left as the tool's default, wasting the\n      second headline.\n    - 46 words before anything useful. On a phone that is the\n      entire first screen.\n    - 'Hello everyone' tells the reader this is a broadcast.\n    - Three competing buttons, so none of them gets the click.\n\nAFTER\n  Subject:  New: weekend brownie box (38 characters)\n  Preview:  Six brownies, collect Saturday from 9am\n  Opening:  Hi Sam, the brownie box is back this weekend.\n            Six brownies, boxed, £12, ready to collect from 9am\n            on Saturday.\n  Button:   Reserve a brownie box\n\n  Why it works:\n    - Subject fits on a phone and names the thing.\n    - Preview adds NEW information instead of repeating.\n    - Price, quantity and time are in the first two sentences,\n      so a skim-reader still gets the offer.\n    - One button, and its words say what happens next.\n    - 'Hi Sam' uses a merge field with a fallback of 'there'." },
      { type: "text", value: "Notice that the 'after' version is shorter, not cleverer. Most email rewriting is deletion. Cut everything before the offer, keep one ask, and the email usually improves without a single new idea." },

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

      { type: "text", value: "Read down that list and notice what each email is for. Email 1 keeps a promise. Emails 2 to 4 earn attention. Only email 5 asks for money. People do not resent being sold to; they resent being sold to by someone who has not yet been useful." },
      { type: "text", value: "The gaps matter as much as the content. Sending all five in three days feels like pressure. Spreading them over three weeks means the reader has forgotten who you are by email 3. Every other day for the first week is a sensible default you can adjust later." },

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

      { type: "text", value: "Follow the logic of that example. The reported open rate of 60% is the largest and least useful number on the page. The six orders are the smallest and most useful. If Rosie reported the 60% to her business partner she would sound successful; if she reported the six orders she would learn something." },
      { type: "text", value: "Also notice the drop from 50% clicks on email 1 to 15% on email 5. That is normal and not a failure. Email 1 delivers something the reader just asked for. Email 5 asks for money. Judge each email against the same email last month, not against the others in the sequence." },

      { type: "heading", value: "Copy-paste: welcome sequence planner" },
      { type: "text", value: "Write the whole sequence on one page before you open any email tool. Planning in the tool is slow, and it tempts you to design emails one at a time instead of as a story." },
      { type: "example", title: "Welcome sequence planner (fill in the blanks)", value: "BUSINESS: ____________________\nTRIGGER:  ____________________  (e.g. confirmed sign-up on form X)\nEXIT:     ____________________  (e.g. places an order, or unsubscribes)\nGOAL OF THE WHOLE SEQUENCE (one sentence): ____________________\n\nEMAIL 1 — send: immediately\n  Job of this email: deliver what was promised\n  Subject (under 40 chars): ____________________\n  Preview text (new information): ____________________\n  First two sentences: ____________________\n  The one call to action: ____________________\n\nEMAIL 2 — send: day ___\n  Job: the single most useful thing I know\n  Subject: ____________________\n  Preview: ____________________\n  First two sentences: ____________________\n  The one call to action: ____________________\n\nEMAIL 3 — send: day ___\n  Job: a real customer story (problem, change, outcome)\n  Subject: ____________________\n  Preview: ____________________\n  First two sentences: ____________________\n  The one call to action: ____________________\n\nEMAIL 4 — send: day ___\n  Job: answer the objection that stops most people buying\n  The objection: ____________________\n  Subject: ____________________\n  Preview: ____________________\n  First two sentences: ____________________\n  The one call to action: ____________________\n\nEMAIL 5 — send: day ___\n  Job: a clear offer with a genuine reason to act now\n  The offer: ____________________\n  The honest reason to act now: ____________________\n  Subject: ____________________\n  Preview: ____________________\n  First two sentences: ____________________\n  The one call to action: ____________________\n\nCHECKS BEFORE SWITCHING ON\n  [ ] Merge fields have a fallback word\n  [ ] Every link tested on a phone\n  [ ] Exit condition set and tested with a real purchase\n  [ ] Unsubscribe link present and working in all five\n  [ ] Review date in the calendar: ______" },
      { type: "text", value: "The 'job of this email' line is the most useful part of the planner. If you cannot state one job in a few words, the email is doing two things and will do neither well." },

      { type: "heading", value: "Copy-paste: deliverability checklist" },
      { type: "text", value: "Deliverability is mostly setup you do once, plus habits you keep. Work down this list before your next send. Your email tool has a help page for each of the technical items and will usually check them for you." },
      { type: "example", title: "Deliverability checklist", value: "AUTHENTICATION (set up once, then verify)\n  [ ] SPF record published for the sending domain\n  [ ] DKIM signing enabled and verified in the email tool\n  [ ] DMARC record published (start at p=none and monitor)\n  [ ] Sending from your own domain, not a free address\n      (e.g. hello@rosiesbakery.example, not a gmail.com address)\n\nBULK SENDER EXPECTATIONS (Gmail and Yahoo)\n  [ ] One-click unsubscribe available in the email header\n  [ ] Visible unsubscribe link in the footer too\n  [ ] Spam complaint rate kept below 0.3%, ideally near 0.1%\n  [ ] Unsubscribes processed promptly, not weeks later\n\nLIST HYGIENE\n  [ ] Double opt-in switched on\n  [ ] Hard bounces removed automatically\n  [ ] Subscribers with no opens or clicks in ~6 months moved to a\n      re-engagement flow, then removed if still silent\n  [ ] No bought, scraped or rented addresses. Ever.\n\nCONTENT HABITS\n  [ ] Plain sender name the reader recognises\n  [ ] Reply-to address that a human actually reads\n  [ ] No all-caps subject lines or rows of exclamation marks\n  [ ] Images have text around them; the email works with images off\n  [ ] Test send opened on a phone before every campaign\n\nMONITORING (monthly)\n  [ ] Complaint rate: ______%   (target: under 0.3%)\n  [ ] Bounce rate: ______%\n  [ ] Click rate trend over last 3 sends: ______\n  [ ] Anything unusual? ____________________" },
      { type: "text", value: "The 0.3% complaint threshold sounds generous until you do the arithmetic. On a send of 2,000 emails, 0.3% is six people pressing 'report spam'. That is why relevance and honest expectations matter more than any technical trick." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: My open rate is 65%. Is that good? A: It is unknowable on its own. Apple Mail Privacy Protection loads images automatically for a large share of subscribers, so those opens are recorded whether or not a person looked. Compare open rates only between two subject lines sent to the same list at the same time, and judge real success on clicks, replies and orders." },
      { type: "text", value: "Q: How often should I email? A: As often as you promised on the sign-up form, and no more. A predictable monthly email that people expect beats an unpredictable weekly one. If you want to send more, say so on the form first." },
      { type: "text", value: "Q: Should I use emoji in subject lines? A: One, occasionally, where it fits the tone. They render differently across devices and they do not rescue a weak subject line. Never use them as punctuation." },
      { type: "text", value: "Q: Removing inactive subscribers feels like throwing away money. Is it? A: The people you remove were not opening or clicking, so they were not producing money. They were, however, dragging down your engagement signals and raising your costs. Send a genuine 'do you still want these?' email first, then remove the silent ones." },

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

      { type: "text", value: "Three of those rows are the ones you will use every day. The trigger is what starts it. The exit condition is what stops it. The integration is what supplies the behaviour data in the first place. Without an integration there is no behaviour to trigger on, so that row usually decides what you can build at all." },
      { type: "text", value: "Margin is in the table for a reason too. Automations often end with a discount, and a discount is real money. Knowing your margin is what tells you whether a 10% code is a sensible cost or a loss." },

      { type: "heading", value: "Automations worth building first" },
      { type: "table", headers: ["Trigger", "Message", "Why it works"], rows: [
        ["Signed up", "Welcome sequence", "Interest is at its peak"],
        ["Abandoned cart", "Reminder, then help, then incentive", "Highest-return automation in e-commerce; intent was explicit"],
        ["Viewed pricing, did not buy", "Address the common objection", "Behaviour signalled evaluation"],
        ["Inactive 60 days", "Re-engagement, then removal", "Protects deliverability"],
        ["Purchased", "Onboarding, then a relevant next product", "Keeping customers costs less than finding new ones"],
      ] },

      { type: "text", value: "The rows are in a deliberate order. Signed up and abandoned cart come first because the person has just shown you what they want. The later rows work on weaker signals, so they earn less and take more effort to get right." },
      { type: "text", value: "Build them one at a time. Two automations that are correct, tested and reviewed will out-earn eight that were switched on in an afternoon and never checked again. There is no prize for having the most workflows." },
      { type: "text", value: "Notice also that the fourth row — inactive 60 days — is the only one whose purpose is not a sale. It exists to protect deliverability, which protects every other row in the table." },

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

      { type: "text", value: "The two columns differ in one idea: the good email assumes the person was interrupted, and the bad one assumes the person needs pushing. The first assumption is usually correct, and it is also the more respectful one." },

      { type: "example", title: "Second worked example: cart email 1, before and after", value: "Rosie's Bakery now takes online orders. A customer put a lemon\ndrizzle cake in the basket and left.\n\nBEFORE\n  Subject:  Don't miss out!!!\n  Preview:  (empty)\n  Opening:  Hi {{first_name}}, you left something behind! Complete\n            your purchase now and get 20% OFF with code COME20 -\n            hurry, this offer expires in 2 hours!\n  Sent:     8 minutes after the customer left\n  Shows:    a generic photo of the shop front\n  Buttons:  Complete order | Browse cakes | Follow us\n\n  What is wrong:\n    - Shouting, and the merge field has no fallback, so anyone\n      without a first name reads 'Hi {{first_name}},'.\n    - 20% off given away eight minutes in, to people who would\n      mostly have come back anyway.\n    - A fake two-hour deadline the customer can test and disprove.\n    - It never says which cake, so the reader has to go and look.\n    - Three buttons compete with the one that matters.\n\nAFTER\n  Subject:  Your lemon drizzle cake is still in your basket\n  Preview:  We have held it for you - collect or local delivery\n  Opening:  Hi Sam, your 8-inch lemon drizzle cake is still in\n            your basket. Local delivery is free over £30, or you\n            can collect from the shop any day before 4pm.\n  Sent:     1 hour after the customer left\n  Shows:    a photo of that exact cake, pulled in automatically\n  Button:   Finish my order\n  Exit:     stops immediately when the order is placed\n\n  Why it works:\n    - The subject names the product, so it is recognisable in a\n      crowded inbox.\n    - No discount. The reminder alone recovers most of what is\n      recoverable.\n    - It answers the likely worry (delivery cost, collection times)\n      instead of applying pressure.\n    - One button, and the fallback name is set to 'there'." },
      { type: "text", value: "If you only change one thing in an existing cart email, take the discount out of the first message. In the candle shop figures below, 16 of the 20 recovered orders arrived before any code was offered." },

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

      { type: "text", value: "Read the last paragraph of that example again, because it is the part most people get wrong. The discount did not create 20 orders. It created, at most, the final 4. The other 16 would have arrived anyway, and giving them a code would simply have reduced the price of orders you had already won." },
      { type: "text", value: "There is a second cost that does not appear in the arithmetic. Customers learn. If a code reliably arrives an hour after abandoning a basket, some of them will abandon on purpose. That habit is hard to unteach, which is why the incentive belongs at the end of the sequence or nowhere at all." },

      { type: "heading", value: "Copy-paste: automation quality checklist" },
      { type: "text", value: "Automations fail silently, so they need a checklist rather than a memory. Run this before switching a workflow on, and again at every quarterly review." },
      { type: "example", title: "Automation quality checklist", value: "WORKFLOW NAME: ____________________\nOWNER: ____________________   REVIEW DATE: ____________________\n\n1. TRIGGER\n  [ ] Written in one sentence: ____________________\n  [ ] Only people who can lawfully be emailed can enter\n  [ ] Tested by triggering it myself with a real account\n\n2. TIMING\n  [ ] Each delay written down and justified\n  [ ] Nothing sends in the middle of the night where possible\n  [ ] Total length of the sequence: ______ days\n\n3. CONTENT\n  [ ] Each email has ONE job, written at the top of the draft\n  [ ] Each email has ONE call to action\n  [ ] Every merge field has a fallback word\n  [ ] Subject and preview text written on purpose, none left blank\n  [ ] No product mentioned that could go out of stock unnoticed\n\n4. EXITS AND OVERLAP\n  [ ] Exit on purchase set and TESTED with a real order\n  [ ] Exit on unsubscribe set\n  [ ] Frequency cap or overlap rule checked against other flows\n  [ ] Someone in this flow cannot also receive the same offer by\n      broadcast on the same day\n\n5. LINKS AND DEVICES\n  [ ] Every link clicked on a phone\n  [ ] Unsubscribe link present and working\n  [ ] Email readable with images blocked\n\n6. AFTER LAUNCH\n  [ ] Reminder set for 2 weeks: check sends, clicks, unsubscribes\n  [ ] Reminder set for 3 months: full re-test of the above\n  [ ] Numbers recorded somewhere I will find them again\n\nFOUND A PROBLEM? Write it here and the date you fixed it:\n  ____________________" },
      { type: "text", value: "Item 4 is the one worth testing twice. Place a genuine order yourself, then wait out the full sequence. It is the only way to be certain the exit condition works, and it is far cheaper than finding out from an annoyed customer." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Can I send abandoned cart emails to anyone who typed their email at checkout? A: Only where you have a lawful basis. In the UK that usually means marketing consent, or the PECR soft opt-in if they are an existing customer buying similar products and you gave them a clear chance to opt out. A transactional message about an order they placed is different from a marketing reminder about one they did not." },
      { type: "text", value: "Q: How many cart emails is too many? A: Three over three days is a common and reasonable pattern. Five in two days reads as harassment and produces spam complaints, which cost you far more than the recovered order was worth." },
      { type: "text", value: "Q: My shop is tiny. Is an abandoned cart flow worth building? A: If you get even a handful of abandoned baskets a week, yes, because the work is done once and runs for years. What is not worth it on a tiny shop is building eight workflows at once before any of them has been tested." },
      { type: "text", value: "Q: Should I use a first name in automated emails? A: It is fine, and it helps slightly, but only with a fallback set. 'Hi there' is unremarkable. 'Hi {{first_name}}' sent to two thousand people is the kind of mistake people screenshot." },

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

      { type: "text", value: "Two of those terms do most of the work. Friction is anything that makes the action harder than it needs to be. Message match is whether the page keeps the promise that brought the visitor. Almost every landing page problem you will meet is one of those two wearing a different hat." },
      { type: "text", value: "One clarification about bounce rate, because it confuses people. GA4 does not lead with bounce rate; it reports engagement rate, and bounce rate is simply what is left over. A high bounce rate on a page whose only job is to give a phone number is not automatically bad. Always ask what the visitor was meant to do." },

      { type: "heading", value: "Why visitors do not convert" },
      { type: "text", value: "Almost every failure comes down to one of four causes. Working out which one applies is more useful than redesigning at random." },
      { type: "table", headers: ["Cause", "Symptom", "Fix"], rows: [
        ["Unclear value", "High bounce, short time on page", "State plainly what it is and who it is for, above the fold"],
        ["Insufficient trust", "Reaches the form, does not submit", "Reviews, named case studies, guarantees, security signals"],
        ["Too much friction", "Starts the form, abandons it", "Fewer fields, no forced account creation, clearer errors"],
        ["Wrong traffic", "Everything looks fine but nobody buys", "Fix targeting — the page is not the problem"],
      ] },
      { type: "alert", value: "The fourth cause is the one most often missed. If an advert promises a free tool and the landing page sells a subscription, no amount of page improvement will fix it. Check message match between the ad and the page before touching the design." },

      { type: "text", value: "The value of that table is that it turns a vague feeling — 'the page is not working' — into a question you can answer with data you already have. Each symptom points at a different place in the visit, so you can tell the causes apart without guessing." },
      { type: "text", value: "In practice you diagnose by asking where people stop. If they leave within a few seconds, they never understood the offer, so the problem is value or message match. If they read the whole page and leave, they understood it but did not believe it, so the problem is trust. If they start the form and give up, they believed it but the process was too much like hard work, so the problem is friction. If they do all three and still nobody buys, look at who you are sending." },
      { type: "text", value: "Work top to bottom. There is no point polishing a form that only eleven people a month reach, and there is no point rewriting a headline for visitors who should never have arrived." },

      { type: "heading", value: "The anatomy of a landing page" },
      { type: "text", value: "Most pages that convert well share the same skeleton. The order is not a rule, but it follows the order of the questions a visitor asks, and that is why it keeps reappearing." },
      { type: "table", headers: ["Section", "The visitor's question it answers", "What goes wrong"], rows: [
        ["Hero (headline, sub-headline, button)", "What is this, who is it for, and can I do it now?", "A slogan instead of an offer; the button below the fold on a phone"],
        ["Proof strip", "Is this a real business other people use?", "Anonymous 'Great service!' quotes with no name or detail"],
        ["What you get", "What exactly am I buying or booking?", "Features listed as adjectives instead of concrete items"],
        ["Objection section", "What is the thing I am worried about?", "The worry is never named, so the visitor answers it with 'no'"],
        ["Price or price guide", "Can I afford this?", "'Contact us for a quote', which costs more enquiries than it protects"],
        ["Form or booking step", "How do I start?", "Fields collected 'just in case'"],
        ["Repeat call to action", "Where do I go now that I have decided?", "The visitor has to scroll back up to find the button"],
      ] },
      { type: "text", value: "Read that middle column on its own. It is a conversation, and the visitor leaves at the first question the page does not answer. That is why adding a testimonial to the bottom of a page rarely helps: the people who needed reassurance left three screens earlier." },
      { type: "text", value: "Hiding prices deserves its own note. Businesses hide them to avoid scaring people off, but a visitor who cannot find a price usually assumes the worst and leaves without telling you. A price guide — 'celebration cakes from £45; wedding cakes typically £300 to £600' — answers the question, sets expectations and filters out enquiries you did not want anyway." },

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

      { type: "text", value: "The difference between those two columns is not budget or design skill. Every item in the strong column is a decision about clarity: say what it is, ask for one thing, show proof where the doubt lives, and let the page load. A small business can do all of that on a template site." },

      { type: "example", title: "Second worked example: the hero section, before and after", value: "The top of Rosie's wedding cake landing page, rewritten. The advert\nthat sends the traffic says: 'Wedding cakes in Bristol - free tasting'.\n\nBEFORE\n  Headline:     Baked with love since 2015\n  Sub-headline: Artisan bakery, Bristol\n  Button:       Learn more\n  Under it:     [full-width photo, 4.2 MB, 8 seconds on 4G]\n  Also in view: newsletter box, Instagram feed, bread menu link\n\n  What is wrong:\n    - The headline is a slogan. It does not say what is sold, to\n      whom, or where.\n    - It does not repeat the advert's promise, so the visitor\n      briefly wonders whether they clicked the right thing.\n    - 'Learn more' promises effort, not a result.\n    - Four things compete for the click.\n    - On a phone the button sits below the fold, under a photo\n      that has not finished loading.\n\nAFTER\n  Headline:     Wedding cakes baked in Bristol\n  Sub-headline: Book a free tasting - three flavours, no obligation.\n                Cakes from £300.\n  Button:       Book a free tasting\n  Under it:     [compressed photo, 180 KB, loads with the page]\n  Also in view: one line of proof - 'Rated 4.9 from 86 Google\n                reviews', and the collection area\n\n  Why it works:\n    - The headline says the product and the place, matching the ad.\n    - The sub-headline removes the two biggest worries at once:\n      what a tasting involves, and roughly what it costs.\n    - The button repeats the advert's exact words, so the visitor\n      knows the promise is being kept.\n    - One action, visible on a phone without scrolling.\n    - Proof sits beside the ask, not at the bottom of the page.\n\nA five-second test: cover the page after five seconds and say what\nit offers and to whom. The 'before' fails. The 'after' passes." },
      { type: "text", value: "Nothing in the 'after' version is clever writing. It is the advert's promise, the product, the place, the price range and one button. Most landing page improvement is this unglamorous, and it is why it is worth doing before any redesign." },

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

      { type: "text", value: "The last part of that sum is the argument you will use with a business owner. Rosie did not buy 750 extra visitors. She deleted seven form fields. The enquiries are worth the same either way, and one of those options is free." },
      { type: "text", value: "Be honest about the numbers, though. Thirty submissions rising to forty-five is a small sample, and a good month can look like a win. Rosie should watch it for a further month or two before she treats 3% as her new normal, and she should check that the extra enquiries are as good as the old ones — a shorter form can bring in more people who are not serious." },

      { type: "heading", value: "Copy-paste: landing page teardown checklist" },
      { type: "text", value: "Use this to review any page in about twenty minutes. Do it on a phone, on a normal mobile connection, and answer honestly. A 'no' is not a failure; it is the list of things to fix." },
      { type: "example", title: "Landing page teardown checklist", value: "PAGE: ____________________   DATE: ______\nWHAT BROUGHT THE VISITOR (ad, email, search): ____________________\nTHE ONE ACTION THIS PAGE WANTS: ____________________\n\nA. MESSAGE MATCH\n  [ ] The words in the ad or email appear in the headline or button\n  [ ] The offer promised is the offer shown\n  [ ] Nothing on the page contradicts the promise (price, dates,\n      availability)\n  Verdict: match / partial / mismatch\n\nB. THE FIVE-SECOND TEST\n  Show the top of the page to someone for five seconds, then cover it.\n  [ ] They can say what is sold\n  [ ] They can say who it is for\n  [ ] They can say what they are meant to do next\n  What they actually said: ____________________\n\nC. CLARITY\n  [ ] Headline states the product and the audience, not a slogan\n  [ ] Sub-headline answers the biggest worry or names the price range\n  [ ] The main button is visible on a phone without scrolling\n  [ ] Button text describes the result ('Book a free tasting')\n\nD. FOCUS\n  Number of different calls to action on the page: ______\n  [ ] There is exactly one primary action\n  [ ] Navigation, social links and pop-ups do not compete with it\n\nE. TRUST\n  [ ] Reviews or case studies with real names or detail\n  [ ] Proof sits next to the point of hesitation, not only at the end\n  [ ] Prices or a price guide are visible\n  [ ] Contact details, returns or guarantee terms are easy to find\n\nF. FRICTION\n  Form fields: ______   Fields genuinely needed now: ______\n  [ ] No forced account creation\n  [ ] Errors explain how to fix the problem\n  [ ] The form works with a thumb, on a phone, one-handed\n\nG. SPEED\n  Mobile load measured at: ______ seconds (PageSpeed Insights)\n  [ ] Largest image under ~200 KB\n  [ ] Nothing jumps around while the page loads\n\nH. DECISION\n  Most likely cause: unclear value / low trust / friction / wrong traffic\n  The ONE change I will make first: ____________________\n  How I will know whether it helped: ____________________\n  Re-check date: ______" },
      { type: "text", value: "Section H is the point of the exercise. A teardown that produces fourteen equally urgent fixes produces nothing. Pick one, make it, and write down what you expect to happen before you look at the numbers." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Should I send adverts to my home page? A: Usually not. A home page has to serve everyone, so it cannot keep a specific promise. Send paid traffic to a page built for the one thing the advert offered, even if that page is simple." },
      { type: "text", value: "Q: How long should a landing page be? A: As long as it takes to answer the visitor's questions and no longer. A £12 brownie box needs very little. A £600 wedding cake needs proof, a price guide, an objection section and photographs. Length follows the size of the decision, not a rule." },
      { type: "text", value: "Q: Do pop-ups work? A: They often raise sign-ups and they often annoy people, and both effects are real. If you use one, make it easy to close, do not show it to someone who has already signed up, and avoid covering the content on a phone. Measure whether enquiries rose, not just sign-ups." },
      { type: "text", value: "Q: My page converts at 1%. Is that bad? A: It depends entirely on the product, the price and the traffic source. Comparing yourself to a published 'average conversion rate' is close to meaningless, because those averages mix supermarkets with £20,000 services. Compare the page with itself last month." },

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

      { type: "text", value: "Three rows in that table cause most of the arguments you will ever have about testing. Relative versus absolute lift is why '+10%' and '+0.2 percentage points' can describe the same result and feel completely different. MDE is why two people can look at the same page and disagree about whether a test is possible. Peeking is why a test that was designed properly still produces a wrong answer." },
      { type: "text", value: "If you remember one sentence from this lesson, make it this: the size of the test is decided before it starts, and nothing you see while it runs is allowed to change it." },

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

      { type: "text", value: "Line by line, the right-hand column is not lazier than the left. It is often more work: more changes, more meetings, more excitement. What it lacks is the boring part, which is deciding the rules before you see the data." },
      { type: "text", value: "The last row of each column is the one to sit with. A trustworthy process has to be able to produce the answer 'we could not tell', and that answer has to be acceptable to report. If 'no difference' is treated as failure in your organisation, every test will eventually be read as a win, whatever the numbers say." },

      { type: "heading", value: "Tools in 2026" },
      { type: "text", value: "Google Optimize, once the popular free option, was shut down in September 2023. It no longer exists. Today's options include:" },
      { type: "list", items: [
        "Built into email tools: Mailchimp, Brevo, MailerLite and Klaviyo can A/B test subject lines and content. This is the easiest place for a beginner to start.",
        "Website testing platforms: VWO, Optimizely, AB Tasty and Convert (paid), and PostHog or GrowthBook (with free tiers).",
        "Platform features: many website builders and Shopify apps offer simple split testing, and ad platforms such as Google Ads and Meta have built-in experiments.",
        "Free sample size calculators: search for an 'A/B test sample size calculator' (for example Evan Miller's or the calculators from testing vendors).",
      ] },
      { type: "text", value: "Those are categories rather than recommendations. Names, prices and free tiers change, so check the current documentation before choosing, and do not assume a well-known tool suits a small site. The tool is the least important part of a good test." },
      { type: "text", value: "Start where your traffic already is. If your website gets a few hundred visitors a month but your email list gets a few thousand sends, your email tool is the only place you can run a test that could finish." },
      { type: "text", value: "Remember that testing tools set cookies or similar identifiers, so they need to respect your cookie consent settings under UK GDPR and PECR. A visitor who refused analytics cookies should not be silently placed into a variant and tracked." },

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
      { type: "text", value: "It is worth seeing where that 80,000 comes from, because it stops the number feeling arbitrary. A 2% conversion rate means about 1 conversion in every 50 visitors, so conversions are rare events and each one carries a lot of randomness. A 10% relative lift only moves the rate from 2% to 2.2% — two extra conversions in every thousand visitors. To be confident that a gap that small is real rather than luck, you need enough conversions in each group that two-in-a-thousand stops being noise. That works out at roughly 1,600 conversions per variant, which at 2% is roughly 80,000 visitors per variant." },
      { type: "text", value: "Two things follow from that. First, the smaller the effect you want to detect, the more traffic you need, and it rises steeply — halving the effect you want to spot roughly quadruples the visitors required. Second, a low baseline rate is expensive: detecting the same relative lift is far harder at 2% than at 20%. This is why big companies can test button wording and a local bakery cannot." },
      { type: "text", value: "Say so plainly when a test is not statistically viable. Reporting a 20% lift from 40 conversions as a finding is misleading, and decisions built on it will not hold." },

      { type: "example", title: "Worked example: significance intuition for a small online shop (illustrative figures)", value: "Test: new product page headline. Ran 2 full weeks.\n\n            Visitors   Orders   Conversion rate\nA (control)    1,000       20   20 ÷ 1,000 × 100 = 2.0%\nB (variant)    1,000       25   25 ÷ 1,000 × 100 = 2.5%\n\nRelative lift = (2.5 − 2.0) ÷ 2.0 × 100 = 25%\n\nSounds great. But is it luck?\n\nRough intuition: with counts this small, random variation is about\nthe square root of the count.\n  √20 ≈ 4.5    √25 = 5\nSo A could easily have been 16–24 and B 20–30. The ranges overlap\nheavily, so a 5-order gap is well within normal chance.\n\nA proper calculator agrees: this is nowhere near 95% confidence.\nVerdict: 'No reliable difference yet.' Keep B only if there is a\ngood qualitative reason, and do not report '+25%' as a proven win.\n\n(The square-root rule is a rough guide for intuition only; use a\nsignificance calculator for real decisions.)" },

      { type: "text", value: "Notice what that example does not say. It does not say B is worse. It says the data cannot tell the difference yet, which is a different and more honest statement. Reporting '+25%' from a five-order gap would be the mistake, because the next fortnight could easily reverse it." },
      { type: "text", value: "This is where most small-business testing goes wrong. The arithmetic of percentages works perfectly well on tiny numbers, so a spreadsheet will happily tell you that 25 is 25% more than 20. Nothing in the sum warns you that both figures were partly luck." },

      { type: "example", title: "Second worked example: a test plan, before and after", value: "A colleague sends this over chat.\n\nBEFORE\n  \"Let's test the new homepage. I've changed the headline, swapped\n   the hero photo, made the button green and moved the reviews up.\n   We'll run it Monday to Thursday and see which one wins.\"\n\n  What is wrong:\n    - No hypothesis, so no reason to expect anything.\n    - Four changes at once. If B wins you cannot say which change\n      did it, so you have learned nothing you can reuse.\n    - Monday to Thursday excludes the weekend, when this business\n      gets a third of its enquiries.\n    - 'See which one wins' has no stopping rule, so it will be\n      stopped when it looks good.\n    - No sample size, so 'wins' has no meaning.\n\nAFTER\n  Hypothesis:  Adding a price guide to the hero will increase\n               enquiry form submissions, because 14 of the last 30\n               enquiry emails opened by asking the price.\n  Change:      One. A line under the headline reading\n               'Wedding cakes from £300'. Nothing else moves.\n  Metric:      Enquiry form submissions (not clicks, not time on page).\n  Baseline:    2.4% over the last 8 weeks.\n  MDE:         20% relative, chosen because smaller than that is not\n               worth the disruption.\n  Sample size: taken from a calculator, per variant: ______\n  Duration:    whole weeks only. Planned end date: ______\n  Stopping rule: we look at the result on the end date and not\n               before. If it is inconclusive we say so.\n  Decision in advance: if B wins, ship it and add price guides to\n               the other two service pages. If not, keep A and test\n               the objection section next.\n\n  Why it works:\n    - Written before the data exists, so it cannot be bent to fit.\n    - One change means the result is reusable knowledge.\n    - 'Inconclusive' is an allowed outcome." },
      { type: "text", value: "The 'after' version takes about fifteen minutes to write. It is the cheapest quality control in marketing, because it makes it obvious — before anyone spends a fortnight — when a test was never going to answer the question." },

      { type: "steps", title: "Walkthrough: check whether a test is even possible before you start", steps: [
        { label: "Find your baseline", text: "In GA4, go to Reports > Engagement > Pages and screens (or your conversion report) and note visitors and conversions for the page over the last 28 days." },
        { label: "Calculate the rate", text: "Conversions ÷ visitors × 100. Example: 40 ÷ 2,000 × 100 = 2%." },
        { label: "Choose the smallest lift worth finding", text: "Be realistic: most single changes produce small lifts, often 5–20% relative." },
        { label: "Use a sample size calculator", text: "Enter the baseline and the minimum detectable effect. Note visitors needed per variant." },
        { label: "Work out the duration", text: "Total visitors needed ÷ weekly visitors = weeks. Round up to whole weeks." },
        { label: "Decide", text: "If it takes more than about 4–8 weeks, do not A/B test. Use qualitative research and make a reasoned change instead." },
      ] },

      { type: "text", value: "Those six steps take about half an hour and they save weeks. Most of the time on a small site the honest answer at step six is 'no', and that is a useful answer: it sends you to the recordings, the support inbox and the customers, which is where the big improvements were hiding anyway." },

      { type: "heading", value: "Copy-paste: test-plan one-pager" },
      { type: "text", value: "Fill this in before the test starts and share it with whoever will read the result. Anything written after the data arrives is no longer a plan; it is an explanation." },
      { type: "example", title: "Test-plan one-pager", value: "TEST NAME: ____________________\nOWNER: ____________________     WRITTEN ON: ______\n\n1. WHAT MADE US THINK OF THIS\n   The evidence (recordings, support emails, funnel drop, reviews):\n   ____________________\n\n2. HYPOTHESIS\n   If we ____________________,\n   then ____________________ will improve,\n   because ____________________.\n\n3. THE CHANGE\n   Exactly one change: ____________________\n   Everything that stays identical: ____________________\n\n4. WHAT WE MEASURE\n   Primary metric (one only): ____________________\n   Guardrail metric (must not get worse): ____________________\n   Metrics we will ignore, to stop ourselves cherry-picking:\n   ____________________\n\n5. THE NUMBERS, BEFORE WE START\n   Baseline rate: ______%   (measured over ______ weeks)\n   Minimum lift worth detecting: ______% relative\n   Sample size needed per variant: ______  (from a calculator)\n   Weekly traffic to this page: ______\n   Duration = total needed ÷ weekly traffic = ______ weeks,\n     rounded up to whole weeks: ______\n   Planned end date: ______\n\n6. IS THIS VIABLE?\n   [ ] Under about 4-8 weeks: run it\n   [ ] Longer than that: do NOT run it. Write what we will do\n       instead: ____________________\n\n7. RULES WE AGREE NOW\n   [ ] We do not look at the result before the end date\n   [ ] We do not stop early because it looks good\n   [ ] We run whole weeks, never part weeks\n   [ ] 'No clear difference' is an acceptable result we will report\n\n8. DECIDED IN ADVANCE\n   If the variant wins, we will: ____________________\n   If it loses, we will: ____________________\n   If it is inconclusive, we will: ____________________\n\n9. RESULT (filled in on the end date)\n   A: ______ visitors, ______ conversions, ______%\n   B: ______ visitors, ______ conversions, ______%\n   Relative difference: ______%\n   Significant at 95%? Y / N\n   What we actually did: ____________________" },
      { type: "text", value: "Keep every completed one-pager, including the failures. After a year the folder is worth more than any single test, because it is a record of what this particular audience does and does not respond to." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Can I just run the test until it reaches significance? A: No. That is peeking with extra steps. Because results fluctuate, a test with no real difference will cross the 95% line at some point if you keep watching, so 'run until significant' guarantees a winner whether or not one exists. Fix the end date in advance." },
      { type: "text", value: "Q: When should I not A/B test at all? A: When the traffic cannot support it, when the page is obviously broken and just needs fixing, when the change is required for legal or accessibility reasons, or when a test would take longer than the thing it is testing will stay relevant. Seasonal campaigns are a common example of the last one." },
      { type: "text", value: "Q: What about testing three or four versions at once? A: Splitting the same traffic more ways means each version gets less of it, so you need even more visitors overall. On a small site, two versions is already ambitious." },
      { type: "text", value: "Q: Is it cheating to stop a test early if the variant is doing real damage? A: No — that is a guardrail, not peeking, and you should agree it in advance. Write the rule as part of the plan: for example, 'we stop immediately if enquiries fall by more than half'. What you must not do is stop early because the variant is doing well." },

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
      "Google Optimize closed in 2023; the replacements are email tool testing, website testing platforms and built-in platform experiments.",
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

      { type: "text", value: "The two words that will change how you work are dead click and rage click. Both are the tool telling you that a visitor expected something to happen and it did not. That is a gap between your design and someone's expectation, and it is nearly always cheap to close." },
      { type: "text", value: "Masking and personal data belong together in your head from the start. A session recording is a recording of a real person using your website, so the sensible default is to record as little as you can get away with while still learning something." },

      { type: "heading", value: "The tools" },
      { type: "table", headers: ["Tool", "Shows", "Best used for"], rows: [
        ["Click heatmap", "Where people click", "Finding non-clickable elements people expect to click"],
        ["Scroll map", "How far down people read", "Checking whether key content is ever seen"],
        ["Session recording", "An individual visit replayed", "Understanding a specific point of confusion"],
        ["Form analytics", "Field-by-field abandonment", "Identifying exactly which question loses people"],
      ] },
      { type: "text", value: "Free options are good enough for most small businesses. Microsoft Clarity is free and includes heatmaps, recordings, and rage and dead click detection. Hotjar has a free plan with limits. Both can connect with GA4." },

      { type: "text", value: "Read that table as a sequence rather than a menu. Scroll maps tell you what was seen. Click maps tell you what was tried. Recordings tell you what it felt like. Form analytics tells you exactly where the effort became too much. Working in that order stops you watching thirty recordings to discover something a scroll map would have shown in ten seconds." },
      { type: "text", value: "Always split the data by device. Mobile and desktop visitors behave so differently that a combined heatmap can average two real patterns into one misleading picture. If most of your visitors are on phones, look at the mobile map first and treat desktop as the secondary view." },
      { type: "text", value: "One limitation to keep in mind: these tools only see visitors who accepted tracking. Where consent is required, your heatmaps describe the consenting subset, not everyone. That is fine for finding problems, but it is another reason not to treat the percentages as precise." },

      { type: "heading", value: "What they typically reveal" },
      { type: "list", items: [
        "People clicking images or headings that are not links. Your design is not meeting their expectation.",
        "Rage clicks: repeated rapid clicking on something that does not respond, which points to a broken or slow element.",
        "An important call to action placed below the point where 80% of visitors stop scrolling.",
        "One form field — often phone number or company size — where abandonment jumps.",
      ] },

      { type: "text", value: "Each of those four findings has an obvious, cheap fix: make the thing clickable, repair the broken element, move the call to action up, or delete the field. That is the appeal of qualitative tools. They rarely tell you to redesign; they tell you to correct a small mismatch between what you built and what people expected." },

      { type: "heading", value: "Reading the signals" },
      { type: "text", value: "It helps to have a short translation table for what you see, so that you interpret rather than guess. Treat the right-hand column as the first thing to check, not as the answer." },
      { type: "table", headers: ["What you see", "Usual meaning", "First thing to check"], rows: [
        ["Dead clicks on an image or heading", "People expect it to be a link", "Make it a link, or remove the thing that looks clickable"],
        ["Rage clicks on a button", "It is broken, slow, or gives no feedback", "Test it on a slow phone connection; add a loading state"],
        ["Scroll map stops before the main button", "The ask is below where attention ends", "Move the button up, or repeat it higher"],
        ["A long pause on one form field", "The question is unclear or feels intrusive", "Reword the label, add a hint, or delete the field"],
        ["Rapid scrolling to the bottom and back", "Hunting for something specific, often the price", "Publish a price guide higher on the page"],
        ["Lots of clicks on the navigation from a landing page", "The page did not answer the question", "Check message match with the ad or email"],
      ] },
      { type: "text", value: "None of these are proof. They are the beginning of a sentence you have to finish with evidence: 'I think people do X because Y, so if I change Z I expect this number to move.' Without that sentence you are just watching videos." },

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

      { type: "text", value: "The difference between those two columns is a question. The good column starts with one and uses recordings to answer it. The poor column starts with the tool and hopes a conclusion appears. Ten minutes spent writing the question down before you press play will save you an afternoon." },
      { type: "text", value: "Counting matters too. 'Nine of the fifteen sessions I watched did this' is a finding you can act on and revisit. 'I saw someone struggle with the postcode box' is an anecdote, and anecdotes are very persuasive and very often wrong." },

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

      { type: "text", value: "Walk back through that example and notice how the three sources did different jobs. GA4 said the rate was 8% but not why. The scroll map showed that most people never saw the button, which changes the meaning of the 8% completely — among people who actually saw it, nearly a quarter clicked. The click map and the recordings then explained the wasted taps." },
      { type: "text", value: "Rosie's caution at the end is the right instinct. One month at 12.5% against one month at 8% is a strong trend on 1,200 visitors, not a proven result, and something else may have changed — a school holiday, a mention in a local group, better weather. She keeps the change because the reasoning is sound and the risk is nil, and she keeps watching." },

      { type: "example", title: "Second worked example: writing up a finding, before and after", value: "Same recordings, two write-ups. Only one of them can be acted on.\n\nBEFORE\n  \"Watched some recordings of the order page. People seem really\n   confused, the page is a mess on mobile. I think we need a\n   redesign - maybe a new template? Someone was clicking all over\n   the place, it was painful to watch.\"\n\n  What is wrong:\n    - No question was asked, so no question was answered.\n    - No counts. 'Some' and 'people' could mean two sessions.\n    - Jumps straight to the most expensive possible fix.\n    - 'Confused' is a feeling, not an observation.\n    - Nothing here can be checked against the numbers.\n\nAFTER\n  Question:   Why do only 8% of /order visitors add to basket?\n  Method:     15 mobile recordings filtered to /order, plus the\n              Clarity click and scroll maps for the same 28 days.\n  Observed:   9 of 15 sessions tapped a cake photo, paused about\n              two seconds, then scrolled away or left.\n              The click map shows 310 taps on photos, which are\n              not links.\n              The scroll map shows only 35% reach the\n              'Add to basket' buttons.\n  Read as:    People expect the photo to open the product, and the\n              main action sits below where most attention ends.\n  Hypothesis: If the photos link to the product and one\n              'Add to basket' button appears above the fold, the\n              add-to-basket rate will rise.\n  Cost:       Half a day of template work. No redesign.\n  Measure:    Add-to-basket rate, compared with the previous two\n              28-day periods. Reviewed after 28 days.\n  Risk:       Low. If nothing changes, we revert in ten minutes.\n  Caveat:     1,200 visitors a month is too little to prove this\n              statistically; we will judge it on trend.\n\n  Why it works:\n    - Starts from a number that already worried us.\n    - Counts everything, so a colleague can disagree with evidence.\n    - Separates what was seen from what it was taken to mean.\n    - Proposes the cheapest change that would test the idea.\n    - States in advance how it will be judged, and admits the limit." },
      { type: "text", value: "Use the 'after' shape for every finding, even a small one. It takes five minutes, it makes disagreement productive, and in six months it will remind you why the page looks the way it does." },

      { type: "heading", value: "Copy-paste: heatmap and session review checklist" },
      { type: "text", value: "Run this once a month on one important page. Reviewing everything occasionally is less useful than reviewing one page regularly." },
      { type: "example", title: "Heatmap and session review checklist", value: "PAGE: ____________________   PERIOD: ______ to ______\nTHE QUESTION I AM TRYING TO ANSWER (one sentence):\n  ____________________\nTHE NUMBER THAT PROMPTED IT (from GA4): ____________________\n\nBEFORE YOU LOOK — PRIVACY CHECK\n  [ ] The tool only loads after analytics consent is given\n  [ ] Masking is set to strict or balanced; typed text is hidden\n  [ ] Payment, password and personal detail fields are excluded\n  [ ] Session recording is described in the privacy policy\n  [ ] A retention period is set, and old recordings are deleted\n  [ ] I can explain to a customer what is recorded and why\n\n1. SCROLL MAP  (mobile first, then desktop)\n  % reaching the main call to action: ______\n  % reaching the proof / reviews: ______\n  Anything important below the attention drop-off?\n  ____________________\n\n2. CLICK MAP\n  Top 3 clicked elements: ____________________\n  Dead clicks - things tapped that do nothing: ____________________\n  Rage clicks - where: ____________________\n  Clicks on navigation away from the page: ______\n\n3. RECORDINGS  (watch 10-15, filtered, not random)\n  Filter used (page, rage clicks, dead clicks, device): ______\n  Sessions watched: ______\n  Pattern seen: ____________________  in ______ of ______ sessions\n  Second pattern: ____________________ in ______ of ______ sessions\n\n4. FORM BEHAVIOUR\n  Field with the longest pause: ____________________\n  Field where people abandon: ____________________\n  Is that field genuinely needed now?  Y / N\n\n5. WRITE IT UP\n  Observed (facts, with counts): ____________________\n  Read as (interpretation): ____________________\n  Hypothesis: If we ______, then ______ will improve, because ______\n  Cheapest change that tests it: ____________________\n  How it will be judged, and by when: ____________________\n  Honest limits of this evidence: ____________________\n\n6. NEXT REVIEW DATE: ______" },
      { type: "text", value: "The privacy block sits at the top on purpose. It is the part that gets skipped once the tool is installed and everyone is keen to look at the pictures, and it is the only part with consequences beyond a wasted afternoon." },

      { type: "heading", value: "Common questions" },
      { type: "text", value: "Q: Do I need consent to record sessions? A: In the UK and EU, these tools set identifiers on the visitor's device, so cookie rules generally require consent before they load. The recordings themselves are personal data, so they also need a lawful basis, a privacy notice entry and a retention period. Treat consent as the default position rather than the exception." },
      { type: "text", value: "Q: Is it fine if I never look at anyone's personal details in the recordings? A: Intent is not the safeguard; configuration is. Mask inputs so the data is never captured in the first place. If a payment field is recorded, the problem exists whether or not you watch it." },
      { type: "text", value: "Q: How many recordings should I watch? A: Ten to fifteen filtered sessions is usually enough to see a repeated pattern, and beyond about twenty you rarely learn anything new in one sitting. Filtering matters far more than volume — fifteen sessions from the page you care about beat a hundred random ones." },
      { type: "text", value: "Q: My site has very little traffic. Is any of this worth it? A: This is exactly where it is worth most. Low traffic rules out A/B testing, so watching real visits is the only evidence you have. It is also the cheapest: on a small site you can watch every relevant session from a week in under an hour." },

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

export const modules4And5Quizzes: Record<string, QuizQuestion[]> = {
  'dm-m4-quiz': [
    {
      id: 1,
      question: 'Why is email described as the only channel you truly own?',
      options: [
        'No algorithm decides whether your message reaches the people on your list',
        'Marketing emails cannot be reported as spam',
        'It has the highest open rate of any marketing channel',
        'Email addresses never stop working, unlike social accounts',
      ],
      correctAnswer: 'No algorithm decides whether your message reaches the people on your list',
    },
    {
      id: 2,
      question: 'What makes a lead magnet effective?',
      options: [
        'Solving one specific problem with immediate value',
        'Being as long and comprehensive as possible',
        'Covering a broad topic so it appeals to everyone',
        'Being unrelated to the product so it attracts a wider audience',
      ],
      correctAnswer: 'Solving one specific problem with immediate value',
    },
    {
      id: 3,
      question: 'What is the effect of sending a campaign to a bought list?',
      options: [
        'Spam complaints and bounces that damage delivery for your genuine subscribers too',
        'No effect, provided every address on the list is valid',
        'A better sender reputation, because volume builds trust with inbox providers',
        'Slower sending, but no other consequence',
      ],
      correctAnswer: 'Spam complaints and bounces that damage delivery for your genuine subscribers too',
    },
    {
      id: 4,
      question: 'Which automation is usually the highest-return one for a small online shop?',
      options: [
        'Abandoned cart',
        'Monthly newsletter',
        'Birthday email',
        'Annual customer survey',
      ],
      correctAnswer: 'Abandoned cart',
    },
    {
      id: 5,
      question: 'Why should the first abandoned-cart email avoid a discount?',
      options: [
        'Most of the recoverable orders come back from the reminder alone, so an early code gives away margin and teaches people to abandon baskets',
        'Discounts are not permitted in automated email',
        'A discount code reduces the open rate of the email',
        'Consumer protection law forbids discounting within 24 hours',
      ],
      correctAnswer: 'Most of the recoverable orders come back from the reminder alone, so an early code gives away margin and teaches people to abandon baskets',
    },
    {
      id: 6,
      question: 'A campaign reports a 68% open rate, a 0.4% click rate and two orders. What is the most honest reading?',
      options: [
        'Opens are inflated by privacy features such as Apple Mail Privacy Protection, so judge this campaign on its clicks and orders',
        'The campaign performed well, because the open rate is far above average',
        'The tracking is broken, because opens and clicks should be similar',
        'The list is too small for any of these numbers to mean anything',
      ],
      correctAnswer: 'Opens are inflated by privacy features such as Apple Mail Privacy Protection, so judge this campaign on its clicks and orders',
    },
  ],

  'dm-m5-quiz': [
    {
      id: 1,
      question: 'Which cause of poor conversion cannot be fixed by changing the page?',
      options: [
        'Wrong traffic — a targeting or message-match problem',
        'An unclear value proposition above the fold',
        'Too much friction in the enquiry form',
        'Not enough trust signals near the point of hesitation',
      ],
      correctAnswer: 'Wrong traffic — a targeting or message-match problem',
    },
    {
      id: 2,
      question: 'What is the most common and most damaging A/B testing error?',
      options: [
        'Stopping the test as soon as the result looks significant',
        'Running the test for whole weeks rather than part weeks',
        'Calculating the sample size before the test starts',
        'Changing only one thing between the two versions',
      ],
      correctAnswer: 'Stopping the test as soon as the result looks significant',
    },
    {
      id: 3,
      question: 'What should a low-traffic site do instead of A/B testing small changes?',
      options: [
        'Use qualitative evidence such as recordings and support questions, then judge reasoned changes on trend',
        'Run the test anyway and report whatever number appears',
        'Stop trying to improve the page at all',
        'Test several variables at once so the test finishes sooner',
      ],
      correctAnswer: 'Use qualitative evidence such as recordings and support questions, then judge reasoned changes on trend',
    },
    {
      id: 4,
      question: 'What does a rage click usually indicate?',
      options: [
        'An element that is broken, slow or gives no feedback',
        'Unusually strong interest in the product',
        'A slow internet connection on the visitor’s side',
        'An automated bot visiting the page',
      ],
      correctAnswer: 'An element that is broken, slow or gives no feedback',
    },
    {
      id: 5,
      question: 'What does using session recording require?',
      options: [
        'Masking sensitive inputs, disclosing it and honouring consent — the recordings are personal data',
        'Nothing extra, because no names are captured',
        'Written consent from every visitor, collected by post',
        'Only a mention in the website footer',
      ],
      correctAnswer: 'Masking sensitive inputs, disclosing it and honouring consent — the recordings are personal data',
    },
    {
      id: 6,
      question: 'A page gets 800 visitors a month and converts at 2%. A colleague wants an A/B test that can detect a 10% relative lift. What is the honest answer?',
      options: [
        'It would need roughly 80,000 visitors per variant at 95% confidence and 80% power, so the test can never finish — improve the page by other means',
        'Run it for one month and report whichever version is ahead',
        'Lower the confidence level until the test finishes within a month',
        'Add two more variants so the test gathers data faster',
      ],
      correctAnswer: 'It would need roughly 80,000 visitors per variant at 95% confidence and 80% power, so the test can never finish — improve the page by other means',
    },
  ],
};

export const modules4And5Assignments: Record<string, MarketingAssignment> = {
  'dm-m4-assignment': {
    title: 'Email Programme',
    questions: [
      {
        kind: 'mcq',
        prompt: 'A Plymouth opticians has 900 past customers who bought glasses in the last three years. At the till they were asked for an email address so the prescription reminder could be sent, and nothing else was said. The owner now wants to email them about a new range of sunglasses. What is the most defensible position?',
        options: [
          'The address was collected for prescription reminders with no marketing opt-out offered, so the soft opt-in does not cleanly apply — ask for consent before marketing to them',
          'They are existing customers, so any marketing email to them is automatically permitted',
          'Marketing is fine as long as the first email includes an unsubscribe link',
          'It is fine because sunglasses are a different product from prescription glasses',
        ],
        correctAnswer: 'The address was collected for prescription reminders with no marketing opt-out offered, so the soft opt-in does not cleanly apply — ask for consent before marketing to them',
      },
      {
        kind: 'mcq',
        prompt: 'A Dundee gym sends 4,000 emails a month from a free webmail address, has never set up domain authentication, and sees a spam complaint rate of 0.5%. Delivery is getting worse. What should be fixed first?',
        options: [
          'Move to sending from the gym’s own domain with SPF, DKIM and DMARC set up, add one-click unsubscribe, and bring the complaint rate under 0.3%',
          'Rewrite the subject lines to be more exciting so more people open them',
          'Send more often, so the inbox providers see a consistent volume',
          'Buy a warm-up service that sends to seed addresses to raise the open rate',
        ],
        correctAnswer: 'Move to sending from the gym’s own domain with SPF, DKIM and DMARC set up, add one-click unsubscribe, and bring the complaint rate under 0.3%',
      },
      {
        kind: 'mcq',
        prompt: 'A Norwich garden centre ran a competition: "Win a £250 greenhouse — just enter your email." The entry form had a pre-ticked box reading "Keep me updated with offers". 1,400 people entered. The owner wants to add all 1,400 to the monthly newsletter. What is the honest advice?',
        options: [
          'A pre-ticked box is not valid consent, and prize entrants are a poor fit anyway — email them once to ask them to opt in, and only keep those who do',
          'Add all 1,400; they ticked the box, so they consented',
          'Add all 1,400 but remove anyone who complains afterwards',
          'Add them and rely on the soft opt-in, since entering a competition is a transaction',
        ],
        correctAnswer: 'A pre-ticked box is not valid consent, and prize entrants are a poor fit anyway — email them once to ask them to opt in, and only keep those who do',
      },
      {
        kind: 'mcq',
        prompt: 'You run a subject line A/B test in your email tool. Version A shows a 64% open rate, version B shows 59%. Version B produced almost twice as many clicks. The tool declares A the winner because it is set to pick on opens. What do you do?',
        options: [
          'Treat B as the better performer and change the tool to decide on clicks, because privacy features inflate opens and clicks reflect real interest',
          'Accept A as the winner, because the tool applied the standard metric',
          'Discard the test entirely, because the two metrics disagree',
          'Re-send version A to everyone who did not open it the first time',
        ],
        correctAnswer: 'Treat B as the better performer and change the tool to decide on clicks, because privacy features inflate opens and clicks reflect real interest',
      },
      {
        kind: 'mcq',
        prompt: 'A customer buys a garden bench nine minutes after abandoning their basket. Over the next three days they receive two "You left something behind" emails showing the bench, plus the order confirmation and a dispatch note. What went wrong, and what is the fix?',
        options: [
          'The cart workflow has no working exit condition — set "exit on order placed" and re-test it by placing a real order',
          'The delays are too short — increase the first reminder from one hour to six',
          'The confirmation and dispatch emails should have been suppressed instead',
          'Nothing went wrong; extra reminders encourage repeat purchases',
        ],
        correctAnswer: 'The cart workflow has no working exit condition — set "exit on order placed" and re-test it by placing a real order',
      },
      {
        kind: 'mcq',
        prompt: 'A list of 6,000 has 3,800 subscribers who have not opened or clicked anything in fourteen months. The owner is about to send a big seasonal campaign to everyone, reasoning that "it costs nothing to include them". What is the risk?',
        options: [
          'Sending to a large unengaged segment raises bounces and complaints and lowers engagement signals, so the campaign is more likely to land in spam for the 2,200 people who do care',
          'There is no real risk, since unengaged subscribers simply ignore the email',
          'The only cost is the extra sending fee for the larger volume',
          'It will improve deliverability, because a bigger send looks more established',
        ],
        correctAnswer: 'Sending to a large unengaged segment raises bounces and complaints and lowers engagement signals, so the campaign is more likely to land in spam for the 2,200 people who do care',
      },
      {
        kind: 'text',
        prompt: 'CASE STUDY 1 — The open rates look wonderful. The orders do not follow.\n\nKestrel Opticians is an independent practice in Plymouth: one shop, two optometrists, a list of 4,200 addresses. The owner, Nadia, is pleased with her email programme and cannot understand why the shop is quiet. She shows you the last five campaigns. Illustrative figures for practice, not real measurements.\n\n  Campaign             Sends  Open  Click  Orders  Unsubs\n  1. New frames        4,200   61%   0.9%       3      41\n  2. Free test week    4,180   58%   1.1%       6      37\n  3. Half-price lenses 4,150   66%   0.7%       2      55\n  4. Our new branch    4,100   54%   0.4%       0      48\n  5. Sunglasses        4,050   63%   0.8%       4      62\n\nOther facts you establish:\n- The spam complaint rate across the five sends averages 0.42%.\n- The list came from a tablet at the till, a 2023 prize draw, and a spreadsheet bought from a local directory "to get started".\n- No double opt-in. Nobody has ever been removed for inactivity.\n- Sending is from a free webmail address. SPF, DKIM and DMARC are not set up.\n- Footer unsubscribe link only; no one-click unsubscribe header.\n- Nadia reports success to her partner using the open rate alone.\n\nYour deliverable. A short diagnosis and a fix plan Nadia could act on this month.\n\nInclude:\n1. A plain-English explanation of why the open rate is the least trustworthy number in the table, naming Apple Mail Privacy Protection and saying what you would judge the programme on instead.\n2. What the programme actually delivered: total clicks, total orders, and total unsubscribes as a percentage of the list.\n3. The three most serious problems, in priority order, with one line each on why that order.\n4. A fix plan split into "this week", "this month" and "ongoing habit".\n5. What you will tell Nadia to report to her partner from now on, and why.\n\nWhat a good answer looks like:\n- It states that inflated opens make 61% meaningless on its own, and moves the judgement to clicks, bookings and complaints.\n- It notices that under 1% click rates against 60% open rates is the clearest sign something is wrong.\n- It identifies the bought spreadsheet and the 2023 prize draw as consent problems, not just quality problems.\n- It flags the 0.42% complaint rate as above the level bulk senders are expected to stay under.\n- It puts authentication (own domain, SPF, DKIM, DMARC, one-click unsubscribe) and list cleaning before any copywriting advice.\n- It promises no specific uplift and labels every figure as illustrative.\n\nLength guide: roughly 450-550 words.',
      },
      {
        kind: 'text',
        prompt: 'CASE STUDY 2 — Design a welcome sequence from scratch.\n\nTay Strength is a small independent gym in Dundee: one room of free weights and squat racks, a physiotherapy-led beginners programme, 210 members. Membership is £38 a month, no joining fee. Enquiries peak in January and September.\n\nWhat the owner, Fraser, tells you:\n- Most new members visit the website two or three times before enquiring.\n- The single most common question on the phone is "Will I be the only beginner there?"\n- The second most common is "Do I need to book the equipment?"\n- Around a third of people who book a trial session never turn up.\n- The website currently has a box reading "Join our mailing list" and collects about four addresses a month.\n- Fraser has a booking system that can tell the email tool when someone books or attends a trial.\n\nYour deliverable. Design the complete welcome sequence, written out so Fraser could build it on Monday without asking you anything.\n\nInclude:\n1. The lead magnet: what it is, the exact title, the format, and why someone who would join this gym would want it within ten minutes.\n2. The sign-up promise as it will appear on the website: heading, one or two sentences of body copy, button text, and the small print covering frequency and unsubscribing.\n3. The trigger that starts the sequence, written as one sentence, and the exit condition, also as one sentence.\n4. Four emails. For each one give: the job of that email in a few words, the send timing measured from the trigger, the subject line (under 40 characters), the preview text, and the first two sentences of the body. Give each email exactly one call to action and write out its button wording.\n5. Two things you would check before switching it on, and the date you would review it.\n\nWhat a good answer looks like:\n- The lead magnet is specific to starting strength training as a nervous beginner, not a generic fitness ebook or a prize draw.\n- The sign-up promise states what arrives, how often, and that unsubscribing is easy — and the button repeats the reward rather than saying "Subscribe".\n- Email 1 delivers the promised thing immediately and nothing else.\n- The two real objections Fraser named — being the only beginner, and booking equipment — are each answered by name in one of the four emails.\n- Only the last email asks for the sale, and its reason to act is honest rather than an invented deadline.\n- Subject lines name a concrete thing, fit on a phone, and preview text adds new information rather than repeating.\n\nLength guide: roughly 500-600 words. Lay the four emails out as a list.',
      },
    ],
  },

  'dm-m5-assignment': {
    title: 'Conversion Audit',
    questions: [
      {
        kind: 'mcq',
        prompt: 'A Norwich garden centre’s enquiry page gets 900 visitors a month and converts at 1.8%. The marketing manager wants to A/B test six different button colours over the next quarter. What is the most useful thing to say?',
        options: [
          'At this traffic no colour test could ever reach a trustworthy result — watch session recordings and fix the clearest problems instead',
          'Run all six variants at once, so the quarter is not wasted',
          'Run the test and report the leading colour at the end of the quarter',
          'Increase the advertising budget until the test becomes possible',
        ],
        correctAnswer: 'At this traffic no colour test could ever reach a trustworthy result — watch session recordings and fix the clearest problems instead',
      },
      {
        kind: 'mcq',
        prompt: 'Four days into a planned three-week test, the variant is 34% ahead on 21 conversions versus 16 and the tool shows 96% confidence. Your colleague wants to ship it and move on. What is the correct response?',
        options: [
          'Keep running to the planned end date — results fluctuate, and stopping at the first good-looking moment manufactures winners that do not exist',
          'Ship it, because 96% is above the 95% threshold',
          'Ship it, but re-run the same test next quarter to confirm',
          'Extend the test until confidence reaches 99%, then ship',
        ],
        correctAnswer: 'Keep running to the planned end date — results fluctuate, and stopping at the first good-looking moment manufactures winners that do not exist',
      },
      {
        kind: 'mcq',
        prompt: 'You want to install session recording on a checkout to find out where people give up. Which set-up is defensible?',
        options: [
          'Load the tool only after analytics consent, keep input masking on so typed text is never captured, describe it in the privacy policy and set a retention period',
          'Record everything including form input, since you will only watch the checkout steps',
          'Record everything but promise internally never to look at payment details',
          'Skip consent because the recordings are anonymous and contain no names',
        ],
        correctAnswer: 'Load the tool only after analytics consent, keep input masking on so typed text is never captured, describe it in the privacy policy and set a retention period',
      },
      {
        kind: 'mcq',
        prompt: 'An advert reads "Free 15-minute roof survey, Plymouth". It sends traffic to a page headed "Quality roofing since 1994" whose only button is "Request a quote". The page converts at 0.3%. What do you fix first?',
        options: [
          'The message match — make the page headline and button offer the free survey the advert promised',
          'The page speed, since slow pages always convert worse',
          'The trust signals, by adding more reviews near the bottom',
          'The advert’s bid strategy, to buy better quality traffic',
        ],
        correctAnswer: 'The message match — make the page headline and button offer the free survey the advert promised',
      },
      {
        kind: 'mcq',
        prompt: 'Over two weeks, page A took 18 orders from 900 visitors and page B took 24 from 900. A report is circulated claiming "B wins by 33%". What is the honest reading?',
        options: [
          'With counts this small the gap is well within normal random variation, so the correct conclusion is that no reliable difference has been shown',
          'B wins by 33% and should be rolled out immediately',
          'A wins, because it had fewer orders and therefore less risk',
          'The test is invalid because both pages had identical traffic',
        ],
        correctAnswer: 'With counts this small the gap is well within normal random variation, so the correct conclusion is that no reliable difference has been shown',
      },
      {
        kind: 'mcq',
        prompt: 'A page gets 2,000 visitors a month. 1,100 scroll to the enquiry form, 640 start filling it in, and 41 submit it. Which cause does this pattern point to, and what would you check first?',
        options: [
          'Friction inside the form — check which field people stop on using form analytics or recordings, then remove or reword it',
          'Unclear value — rewrite the headline, since most visitors never reach the form',
          'Insufficient trust — add reviews to the top of the page',
          'Wrong traffic — pause the campaign sending these visitors',
        ],
        correctAnswer: 'Friction inside the form — check which field people stop on using form analytics or recordings, then remove or reword it',
      },
      {
        kind: 'text',
        prompt: 'CASE STUDY 1 — Tear down a landing page and decide what to do first.\n\nBramble Lane Garden Centre, near Norwich, has started a garden design service: a designer visits, measures the garden and produces a planting plan. Prices start at £450. They buy search adverts for "garden design Norwich", all sent to one page. Illustrative figures for practice, not real measurements.\n\nThe page, section by section, top to bottom:\n1. A full-width photograph of the garden centre car park, 3.8 MB, which takes about seven seconds to appear on a phone.\n2. Headline: "Bramble Lane — Growing With Norfolk Since 1978".\n3. Sub-headline: "Plants, gifts, coffee shop and more."\n4. Four buttons side by side: "Opening times", "Coffee shop menu", "Gift vouchers", "Enquire".\n5. Three paragraphs about the founder’s history with the site.\n6. A block of six anonymous quotes, each reading "Lovely place!" or similar, with no names.\n7. A line reading "Garden design service available — contact us for a quote."\n8. An eleven-field enquiry form: name, email, phone, address 1, address 2, postcode, garden size, budget, preferred contact time, how you heard about us, message. An error clears the whole form.\n9. Footer.\n\nThe funnel for last month:\n  Visitors to the page              2,400\n  Scrolled past the founder story     890\n  Reached the enquiry form            410\n  Started the form                    180\n  Submitted the form                   22\n\nYour deliverable. A teardown the garden centre manager could act on.\n\nInclude:\n1. The funnel drop-offs expressed as percentages, and one sentence on what the largest drop tells you.\n2. The problems in priority order, numbered, with a one-line reason for the position of each.\n3. A rewritten headline and sub-headline, written out in full.\n4. A rewritten primary call to action: the button wording, where on the page it sits, and what happens to the other three buttons.\n5. What you would change first and why, and how you would judge whether it worked given this traffic level.\n\nWhat a good answer looks like:\n- The percentages are calculated correctly and the biggest single loss is identified rather than guessed at.\n- Message match is addressed: the advert promises garden design, the page promises a coffee shop.\n- The eleven-field form and the error behaviour are named as friction, and the specific fields to cut are listed.\n- The anonymous quotes are called out as weak proof, and the missing price guide is noticed.\n- The priority order puts clarity and message match above cosmetic fixes, with reasons.\n- It states plainly that 22 submissions a month is too few to A/B test, so the change will be judged on trend over a few months.\n\nLength guide: roughly 450-550 words, with the funnel percentages as a short list.',
      },
      {
        kind: 'text',
        prompt: 'CASE STUDY 2 — Say no to a test, and explain the arithmetic kindly.\n\nFerndale Tile Studio is a small tile showroom in Colchester. Its "Book a design consultation" page gets about 800 visitors a month and converts at 2%, so roughly 16 bookings. Illustrative figures for practice, not real measurements.\n\nYour colleague Marcus sends this message:\n\n  "I want to A/B test the consultation page. New headline, and I want\n   to be able to pick up a 10% improvement — going from 2% to 2.2%\n   would pay for itself easily. Standard 95% confidence, 80% power.\n   Can we get it live this week and review at the end of the month?"\n\nMarcus is not a statistician and genuinely wants to improve the page.\n\nYour deliverable. A reply to Marcus that settles the question honestly and leaves him with something better to do.\n\nInclude:\n1. The sample size arithmetic, done properly: at a 2% baseline, detecting a 10% relative lift at 95% confidence and 80% power needs roughly 80,000 visitors per variant, about 160,000 in total. Show how you get from 160,000 to a duration at 800 visitors a month, and state that duration in years.\n2. An explanation in plain words, with no formulas, of why such a small improvement needs such a large audience — cover the idea that conversions are rare events and that two extra conversions per thousand visitors is easily produced by chance.\n3. One sentence on what would change the answer: what happens to the required sample if the minimum detectable effect is larger, or if the baseline conversion rate is higher.\n4. Why the shortcuts are not shortcuts: briefly say what is wrong with lowering the confidence level, running it anyway and reporting whatever leads, or adding more variants.\n5. What to do instead — three concrete alternatives suited to 800 visitors a month, with one line each on how Marcus would judge whether they worked.\n\nWhat a good answer looks like:\n- The arithmetic is right and shown: 160,000 ÷ 800 = 200 months, which is over sixteen years.\n- It is clear that this is not a matter of patience — the test can never finish in a useful timeframe.\n- The plain-words explanation avoids jargon and does not simply restate the formula.\n- It notes that a bigger minimum detectable effect, or a higher baseline rate, would need far fewer visitors.\n- The alternatives are specific — for example session recordings on the page, asking the last twenty enquirers what nearly stopped them, and a reasoned headline rewrite judged on trend over three months.\n- The tone is collaborative rather than superior, and it does not promise any particular uplift.\n\nLength guide: roughly 400-500 words, written as a message Marcus would read.',
      },
    ],
  },
};
