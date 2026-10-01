/**
 * ============================================================================
 * The running order, the labels and the spoken material
 * ============================================================================
 *
 * Notes are written to be SPOKEN, not read off. Each is roughly a minute at a
 * normal speaking pace and each does three things: it says what the slide
 * deliberately does not put on screen, it stays in plain language, and it
 * ends by handing over to the next slide.
 *
 * None of them recites the slide. If a note could be replaced by reading the
 * slide aloud, the note is doing nothing and the slide is probably overloaded.
 *
 * ---------------------------------------------------------------------------
 * Notes and cautions are separate on purpose
 * ---------------------------------------------------------------------------
 * `SLIDE_NOTES` is what the presenter says. `SLIDE_CAUTIONS` is what the
 * presenter must NOT say — the GA date that is contested, the product total
 * that does not reconcile, the integration that is an expectation rather than
 * a fact. A caution has to name the claim it forbids, so it cannot sit in the
 * same field as the notes: the claim-safety tests scan the notes for exactly
 * those words. Both print, and both show in the notes panel.
 *
 * This module holds DATA ONLY — no component imports — so `slides.test.tsx`
 * can load the order and the notes without a renderer, and so the order is
 * one list rather than fifteen import statements.
 */

export const SLIDE_IDS = [
  "title",
  "who",
  "why",
  "method",
  "in-practice",
  "vision-mission",
  "ecosystem",
  "foundations",
  "domain",
  "productivity",
  "connects",
  "standards",
  "how-we-build",
  "long-term",
  "closing",
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

/**
 * Named running orders. Only the master overview is built today; the audience
 * variants are described in `index.ts` and are composed by writing a new
 * sequence here — replacing slides, never editing the master's.
 */
export const DECKS = {
  master: SLIDE_IDS,
} as const satisfies Record<string, readonly SlideId[]>;

export type DeckVariant = keyof typeof DECKS;

/** Short titles. Used by the slide marker, the notes panel and the tests. */
export const SLIDE_LABELS: Record<SlideId, string> = {
  title: "Qeet Group",
  who: "Who we are",
  why: "Why Qeet exists",
  method: "The name is the method",
  "in-practice": "Q.E.E.T in practice",
  "vision-mission": "Vision & mission",
  ecosystem: "The Qeet ecosystem",
  foundations: "Shared foundations",
  domain: "Domain products",
  productivity: "Planned productivity suite",
  connects: "How the ecosystem connects",
  standards: "What Qeet standardises",
  "how-we-build": "How Qeet builds",
  "long-term": "The long-term Qeet",
  closing: "Closing",
};

export const SLIDE_NOTES: Record<SlideId, string> = {
  title: `Thank you for the time. I want to start with the name, because at Qeet the name is not decoration — it is the method. Q.E.E.T stands for Question, Explore, Envision and Transform, in that order, and the order matters.

The line underneath is the shortest honest description of the group: one philosophy, many ventures. Over the next few minutes I will cover what the group is, how the philosophy works in practice, what we are building, and how the pieces fit together.

I will also be precise about what exists today and what does not. Some of what you will see is in use now, some of it is being built, and some of it is still on paper — and each will be labelled as exactly that.

Let me start with the most basic question of all: who we are.`,

  who: `Qeet Group describes itself as a multi-company holding built on a single philosophy: that meaningful progress begins with the right question. In plainer terms, it is a group of ventures rather than a single product company.

Three ideas hold it together. Each venture owns its domain — its architecture, its technology choices, its pace. Payments and payroll are different problems from news or identity, and they are allowed to be solved differently. What the ventures share is a small set of foundations: identity, a design system, notifications and observability, built once so that no venture has to rebuild them. And underneath both sits the method — the same way of deciding what deserves to be built at all.

If you remember one line from this slide, make it this one: independent domains, shared foundations, one philosophy.

So why does a group like this exist? That is the next slide.`,

  why: `There is a question most organisations begin with: what should we build? It is a reasonable question, and it is the one at the top of the slide, set back on purpose.

Qeet begins one step earlier: what problem actually matters? The difference sounds small in a sentence. In practice it decides whether everything that follows was worth doing, because the first question optimises how well you build, and the second decides whether the thing deserved to be built at all.

The line at the bottom is the conviction behind it. We believe execution cannot rescue the wrong problem — however good the building is, an answer to a question that did not matter is still an answer nobody needed.

That conviction is not a slogan we added afterwards. It is quite literally the first letter of the name, which is where I want to go next.`,

  method: `Q.E.E.T is the organisation's official acronym, and the point of this slide is that it describes a sequence, not four values on a wall.

Question asks why this problem exists, and whether it is the one that matters. Explore asks which possibilities are worth investigating — research, experiments, the patient work of reducing uncertainty. Envision asks what future should exist once we understand the problem; the organisation's phrase is designing for what compounds, something specific that looks past the next quarter. And Transform asks how we make that future real. The phrase there is the one I like most: vision is decoration until it ships.

Now look at the line underneath. Transform is not the end. Shipping produces real-world evidence, and evidence produces better questions than we could have asked at the start — so the method runs again.

Each step is only honest if the one before it actually happened. Rather than keep describing it, let me show it working on a real product.`,

  "in-practice": `This is the method applied to Qeet ID, the identity platform.

The question was never which login system to build. It was what digital identity has to become as people, organisations, applications, machines and autonomous systems all become interconnected. The exploration was deliberately wide: identity and trust, authentication and authorisation, machine identity, the modern standards, and the cryptographic models behind them.

What came out of that was not another isolated login box. It was a shared foundation that every other Qeet product can depend on — and then it was built. Qeet ID is passkeys-first, and it is the identity substrate for the group: Qeet products authenticate against it through OIDC instead of each one building its own sign-in.

The status beside the name is Active, which in the organisation's vocabulary means shipped and in use. That is the claim, and it is the whole claim.

Next, the two statements that sit above every product: the vision and the mission.`,

  "vision-mission": `These are the organisation's published words, unedited, and I would rather read them to you than paraphrase them.

The vision is about the outcome: a future of limitless possibilities, where industries and individuals thrive through questioning, exploring, and transforming ideas into reality. You will notice it is the method again — question, explore, transform — described as what the world gains when it is practised widely.

The mission is about our part in that: to empower people and organisations to adapt, innovate, and transform, by embracing curiosity, exploration, and future-focused thinking.

One says where we are pointed. The other says what work we commit to on the way. Neither is a promise about a particular product; together they are the test every venture is held to.

With that in place, let me show you what the group is actually building.`,

  ecosystem: `This is the whole portfolio on one slide, and the most important thing on it is the status labels.

The organisation uses three states here. Active means shipped and in use. Development means substantive code exists, but it is not yet complete or launched. Planned means specified or intended, with no implementation yet. The three are drawn with deliberately different weight, so you can tell them apart from the back of the room — and even in black and white.

At the top are the shared foundations: Qeet ID, Qeetrix, Qeet Notify and Qeet Logs, all active. In the middle are the domain products: Qeet Pay, Qeet People, Qeet AI and Qeet News, all in development. At the bottom is a productivity suite — mail, calendar, contacts, tasks, drive, chat and meet — which is planned.

I am deliberately not putting a headline number on this. Each product carries its own status, and you can hold me to any of them.

Let me take the foundations first, because everything else depends on them.`,

  foundations: `Some capabilities every product needs, and all of them are expensive to get right: who a user is, how an interface behaves, how a message gets delivered, and what happened when something went wrong. Qeet builds each of those once.

Qeet ID is identity — sign-in through OIDC. Qeetrix is the interface foundation, the design system the front-ends are built from. Qeet Notify is communication: email, SMS, WhatsApp, push, in-app and webhooks. Qeet Logs is observability: privacy-first logs, metrics, traces and audit.

Notice that the arrows only point one way. Products depend on the foundations; the foundations never depend on the products. That is what keeps them foundations.

Here is the practical test. If a new venture finds itself designing its own login, its own component library or its own notification pipeline, something has gone wrong — and the fix is to close the gap with the foundation, not to build a parallel version of it.

Now, the products that sit on top.`,

  domain: `These are the domain products — the ventures — and every one of them is in development. Real code exists, and none of it is presented as finished or launched.

Each one takes on a domain's hardest problem. Qeet Pay is India-first payments, billing and GST-compliant invoicing: UPI, cards, NACH and payouts, on a double-entry ledger. Qeet People is India-first HCM: core HR, leave, attendance and statutory payroll. Qeet AI is the layer for identity, memory, knowledge and agents across the suite — not a chatbot, and not a wrapper around a model. Qeet News is AI-first news under human editorial oversight, with cited, multi-perspective stories.

The hard problems are different enough that the stacks are different too. Pay is Java and People is Kotlin, because tax and payroll arithmetic, and India's filing SDKs, live on the JVM. That is a deliberate choice, and I will come back to why it is allowed.

Beyond these sits a suite that is still on paper.`,

  productivity: `Mail, calendar, contacts, tasks, drive, chat and meet: this is the planned productivity suite.

I want to be exact about where it stands. Each of these has a written specification — requirements, architecture, and the reasoning behind both. None of them has implementation code. They are documented product directions, and I am showing them so that you have the full picture, not because there is anything to try yet.

Why show them at all? Because they make the shape of the strategy visible. A productivity suite is precisely the kind of product that gains the most from shared identity, a shared interface and shared notifications — the foundations from two slides ago. Every one of them would start from what already exists rather than from nothing.

How those pieces connect is the next slide.`,

  connects: `This is the same idea seen from inside a single product — any Qeet product, whether it exists today or has not been started.

Authentication comes from Qeet ID, over OIDC. The interface is built from Qeetrix, which is published as packages. Notifications go through Qeet Notify's API. Audit and observability go to Qeet Logs. And where a product needs to bill, the expectation is that it uses Qeet Pay — drawn dashed, because Pay is itself still in development.

Two rules sit underneath the picture. First, one direction only: products depend on these capabilities and never the reverse, so there are no hidden cycles. Second, everything crosses a published contract — an API, a package or an event. No product reads another product's database. A product boundary is a data boundary.

That is what lets the next product benefit from what has already been built, instead of starting from nothing.

Which raises the obvious question: what exactly does Qeet standardise?`,

  standards: `Qeet standardises interfaces and guarantees — not identical implementations. If you want one sentence for how the group is organised, it is that one.

On the left is what every product shares: the identity and session model, the security baseline and tenancy rules, the shape of the APIs, how domains and hostnames are laid out, the design system for front-ends, the environment tiers, and what we expect from observability and audit.

On the right is what each product decides for itself: its language and runtime, its architectural style, its datastore, its messaging, cache and search, its deployment topology, its internal structure and how it tests.

That is why the stacks differ. Qeet ID is Go, Qeet Pay is Java, Qeet People is Kotlin, and Qeet Logs uses Rust on its hottest path with Go for the rest. The stack follows the domain's hardest problem, not a house default. Divergence in implementation is expected; divergence in interface or security is a finding.

So how does that turn into day-to-day work?`,

  "how-we-build": `This is the philosophy turned into operating practice: five habits.

Question with evidence means claims change when the evidence changes. Concretely, the organisation keeps a written register of every place where its own documentation disagrees with what is actually built — and when the two disagree, the documentation is corrected rather than defended.

Secure by design means authentication, authorisation and tenant isolation are where a design starts, not something added at the end. Explicit contracts means products meet through published APIs, packages and events, never through hidden coupling. Ship reality means a roadmap item is never presented as a shipped capability, which is exactly why every product in this deck carries its status. And learning from real use closes the loop: build, deploy, observe, learn, improve — and let what we learn become the next question.

None of these is unusual on its own. Holding all five at once, especially when they cost speed, is the discipline.

Which brings me to the long term.`,

  "long-term": `Let me be plain about the long term.

The portfolio will change. The technologies will change. The questions will change — some of what we are confident about today will look naive in a few years. What should remain is the method: questioning, exploring, envisioning, and insisting that only shipped things count.

The direction is already visible in the portfolio itself: foundations first, then domain products built on them, then a productivity suite that is specified and waiting. Where it goes after that is something the method should decide, not something I should promise from a slide.

What anchors it is the vision underneath — a future where industries and individuals thrive through questioning, exploring and transforming ideas into reality. The ambition is long-term. The claims stay grounded in what exists today.

Let me close where we started.`,

  closing: `Question. Explore. Envision. Transform.

At the start these were four words in a name. I hope they now read as a description of how the group works — how it decides what deserves to exist, how it builds, how it learns, and how it moves forward.

If you take three things away, let them be these. What Qeet is: a group of ventures built on one philosophy and a set of shared foundations. What Qeet is building: a connected ecosystem of foundations, domain products and a planned productivity suite, each labelled for exactly what it is. And how Qeet thinks: the four words on this slide.

If you want to test whether we really work this way, ask about the gap between what we claim and what runs. We keep track of that gap deliberately.

Thank you. I would like to take your questions.`,
};

/**
 * What must not be said on each slide, and why. Presenter-only. These name
 * the forbidden claims on purpose, so they are excluded from the claim scan.
 */
export const SLIDE_CAUTIONS: Record<SlideId, string> = {
  title:
    "Keep the opening bare. No products, dates or numbers yet — an opening claim is the one most likely to be quoted back.",
  who:
    "Say \"group of ventures\" or \"multi-company holding\" — never \"one technology organisation\" or \"a single product company\". Do not offer a founding date, team size, funding or legal structure: none is verified in the organisation's records.",
  why:
    "This is Qeet's belief, not an industry statistic. Do not say most companies fail for this reason, and do not quote any failure-rate figure — there is no source for one.",
  method:
    "Use the canonical words exactly: Question, Explore, Envision, Transform — not \"Exploration\" or \"Transformation\" as the principle names.",
  "in-practice":
    "No GA date and no \"generally available\": the organisation's records disagree on Qeet ID's GA status (drift QC-007), so it is unknown. Do not translate Active into \"available\". SSO, MFA, SAML, SCIM and the authorisation models are the product's scope — confirm any single capability against the product's own status before committing to it.",
  "vision-mission":
    "Quote the wording exactly. Do not compress the vision into \"changing the world\", and do not present either statement as a commitment about a specific product.",
  ecosystem:
    "Do not quote a product total. The organisation's summary and its detailed list disagree (sixteen versus the fifteen named here) and that is being reconciled, not resolved on stage. Never describe a development or planned product as shipped, and never say \"available\" in place of Active.",
  foundations:
    "This is the organisation's model and expectation, not a claim that every product already uses every foundation. Qeet ID is the one dependency every product has. Qeetrix covers almost every front-end, with recorded exceptions. Notify and Logs are widely used but not universally, and Logs adoption is still being rolled out.",
  domain:
    "Nothing here is launched, and nothing in Qeet AI is deployed. No dates, design-partner names or pricing. \"GST-compliant invoicing\" describes the product's scope, not a regulatory approval or certification.",
  productivity:
    "Planned means no implementation. No dates, no \"beta\" or \"early access\", and do not move any of these into development without a change in the organisation's records.",
  connects:
    "This is the model, not a claim that every integration exists today. Billing through Qeet Pay is an organisation-level expectation and Pay is in development. Do not say all products already use all of these.",
  standards:
    "These are the standards. Some interfaces still carry recorded divergence — API error and pagination shapes, for example — and it is tracked. Do not claim every product implements every standard identically.",
  "how-we-build":
    "Keep this at the level of principle. Do not cite security certifications — none is held — and do not describe security controls as complete; some organisation-level settings are still being tightened.",
  "long-term":
    "Do not present future categories, markets or timelines as commitments. If asked about funding, size or financials, say that no verified figures are part of this deck rather than estimating.",
  closing: "End on the method, not on a promise. No call to action beyond qeet.in.",
};
