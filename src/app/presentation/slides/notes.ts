/**
 * ============================================================================
 * Speaker notes
 * ============================================================================
 *
 * Written to be SPOKEN, not read off. Each is 45–90 seconds at a normal
 * speaking pace and each does three things: it says the thing the slide
 * deliberately does not put on screen, it stays in plain language, and it ends
 * by handing over to the next slide.
 *
 * None of them recites the slide. If a note could be replaced by reading the
 * slide aloud, the note is doing nothing and the slide is probably overloaded.
 *
 * This module holds DATA ONLY — no component imports — for two reasons. It is
 * what lets `slides.test.ts` load the notes and assert claim safety in a plain
 * Node environment with no React renderer, and it keeps the deck's ordering in
 * one list that is not entangled with fifteen import statements.
 *
 * Notes are also where the deck's internal evidence lives. Several slides
 * deliberately state a principle where they could have stated the mechanism
 * behind it; the mechanism belongs here, said out loud by a person who can be
 * asked a follow-up question, rather than projected onto a wall where it
 * cannot.
 */

export const SLIDE_IDS = [
  "title",
  "why",
  "method",
  "qeet-id",
  "question",
  "explore",
  "envision",
  "transform",
  "loop",
  "portfolio",
  "lifecycle",
  "compounding",
  "difference",
  "long-term",
  "closing",
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

/** Short titles. Used by the slide marker, the notes panel and the tests. */
export const SLIDE_LABELS: Record<SlideId, string> = {
  title: "Qeet Group",
  why: "Why Qeet exists",
  method: "The name is the method",
  "qeet-id": "Qeet ID — the method applied",
  question: "Question",
  explore: "Explore",
  envision: "Envision",
  transform: "Transform",
  loop: "QEET as a loop",
  portfolio: "What Qeet is building",
  lifecycle: "Truth in lifecycle",
  compounding: "Building what compounds",
  difference: "What makes Qeet different",
  "long-term": "The long-term Qeet Group",
  closing: "Closing",
};

export const SLIDE_NOTES: Record<SlideId, string> = {
  title: `Thank you for the time. I want to start with the name, because at Qeet the name is not decoration — it is the method. Qeet is an acronym before it is a company: Question, Explore, Envision, Transform. Four words, in that order.

Over the next twenty minutes I will do three things. I will show you what those four words mean in practice, because plenty of organisations have values on a wall and I do not want you to hear this as that. I will show you the first product they produced, early, so the method is attached to something real rather than to a diagram. And I will be precise about what exists today and what does not, because I would rather you left with an accurate picture than a flattering one.

Let me start with why the group exists at all.`,

  why: `There is a question most organisations start with: what should we build? It is a reasonable question and it is the wrong first one, because it assumes the problem is already settled and the only thing left is execution.

Qeet starts one step earlier. What problem actually matters? The difference sounds small in a sentence and it is enormous over five years — the first question optimises how well you build, and the second one determines whether the thing was worth building at all.

The line at the bottom is from our founding memo, and I think it is the truest sentence in it. Companies that fail mostly do not fail on execution; the execution is often excellent. They fail because the original question was too small, and no amount of good building rescues a question that did not matter.

So the first discipline is choosing better questions. Which brings me to what the four letters actually are.`,

  method: `Question, Explore, Envision, Transform. The claims beside each letter are the organisation's own published wording, not something written for this room.

What I would ask you to notice is the order. These are not four values you could shuffle into a different sequence — each one is only honest if the one before it actually happened. Envisioning without exploring is guessing. Transforming without envisioning is just activity. Questioning and then stopping is commentary.

The sequence is the argument. And the step most commonly skipped is the first one, because it is the only step with no visible output. Nobody gets credit for a quarter spent making sure the question was right, which is precisely why so few organisations spend one.

I would rather show you this working than keep describing it, so let me go straight to the product it produced.`,

  "qeet-id": `This is Qeet ID, and I am showing it fourth rather than last on purpose. I do not want to spend twenty minutes on philosophy before you see anything real.

Read the four columns as one story. The question was not "what login system should we build". It was what identity has to become when people, organisations, applications, machines and increasingly autonomous software are all interconnected. The exploration was genuinely wide — authentication, authorisation, machine and agent identity, the standards arriving now and the cryptography arriving behind them. What we envisioned was not another login box, but a trust foundation an organisation could own outright. And then we built it, and every other Qeet product signs in through it.

One word on the status. It says Available, and that is all I am going to claim for it. Available means the capabilities described run, and you can use them. I will come back in a few slides to why I am being that careful, because it is not modesty — it is a rule.`,

  question: `Now let me unpack the four letters properly, starting with Question.

The four postures on the left are the easy part to say out loud. The hard one is the last: being willing to question ourselves. It is straightforward to challenge an industry assumption, and genuinely difficult to reopen a decision you made and then defended in public.

The principle on the right is how we try to resolve that. When evidence contradicts a claim, we correct the claim. Concretely — and this is the part I have deliberately kept off the slide — this organisation keeps a written register of the places its own documentation disagrees with what is actually built. When those two disagree, the documentation gets corrected rather than quietly defended.

It is an uncomfortable habit, and it is the single most useful one we have, because it means the picture we hold of ourselves stays accurate. An accurate picture is what makes the next question a good one.

Exploration is next.`,

  explore: `Exploration is the word here most likely to be mistaken for something soft, so let me be precise about what it is for. It is not the collecting of interesting ideas. It is the reduction of uncertainty.

The diagram is honest about the shape of that. One question, many directions worth testing, and most of them stop. The ones that stop are still drawn, because a direction ruled out is knowledge — it permanently narrows what we ever have to consider again. What we are trying to reach is the point on the right: not an idea we happen to like, but a possibility we have actually ruled in or out.

The cost of working this way is patience. Some of what we explore will not pay for itself for years, and we have accepted that explicitly rather than pretending otherwise. What we do not accept is exploring without ever converging.

Which is what the third letter is about.`,

  envision: `Envision is really about the difference between two planning horizons.

The question on the left — what can we build this year — is a perfectly sensible operating question. The failure mode is when it is the only question, because then you accumulate products that do not help each other.

The question on the right is the one we try to hold. What becomes possible once the right foundation exists? The chain underneath is the shape that produces: foundation, capability, product, platform, ecosystem — where each stage is only affordable because the one before it is already there.

The clearest evidence that we actually work this way is the order in which we built things. Identity and the design foundation came first, before there was a portfolio anywhere near large enough to justify either of them. That is an expensive decision to make early, and it is the reason the fourth and fifth products cost less to build than the first one did.

Which brings us to Transform.`,

  transform: `This is the slide I would most like you to remember.

Look at the rule in the middle of that scale. Everything to the left of it — the idea, the research, the prototype, the development — is work. Only what is to the right of it is a result. That is not a criticism of the work; it is most of what any organisation does, including us. It is a statement about what may be claimed.

A roadmap entry is not a shipped capability. A prototype is not a product. A concept is not a launched business. Those distinctions sound obvious in a room like this, and they erode constantly under commercial pressure, which is exactly why we have made the rule enforced rather than encouraged.

Here is the uncomfortable version of it. If I cannot show you something working, I should not be describing it to you as though it does. You are entitled to hold me to that for the rest of this conversation.`,

  loop: `One correction before we get to the portfolio. Everything I have described so far sounds linear, and it is not.

Transform does not end the sequence. It produces the one thing the sequence cannot generate on its own, which is evidence from the real world — and what using something teaches you is never quite what testing it teaches you. That evidence produces better questions than we were capable of asking at the start, and the loop closes.

Practically, this is why we treat a launch as a beginning rather than a finish line, and why the products that have been in real use the longest have changed the most since.

It also means the durable asset here is the method rather than any particular answer it has produced. The answers will date. Some of them already have.

Now let me show you what it has produced so far.`,

  portfolio: `This is the portfolio, grouped by the role each part plays rather than by how far along it is.

Two shared foundations: identity, and the design foundation that every product interface is built from. Then the operating products, each aimed at a specific domain and composed from those foundations instead of rebuilding them. Then a set that is specified in real detail and not yet built — and I would rather show you those honestly than leave them out, because the specification work is real and the absence of code is a fact, not an embarrassment.

Every item carries the status we publish for it. What I am not going to do is summarise those into one flattering headline number. If you want to know where any single one of these stands, ask me directly and I will tell you precisely, including where our own records disagree with each other.

The reason I am being this careful about status is the next slide, and it is the part of how we work that I am most confident about.`,

  lifecycle: `We keep two vocabularies, and the discipline is in refusing to merge them.

Product status is public, and deliberately only three words wide: planned, in development, available. It answers exactly one question — can you use this?

Maturity is the scale across the top, and it answers a different question: how far has this actually progressed? Seven states, because the difference between a prototype and a preview is a real difference, and organisations that collapse it end up believing their own roadmaps.

The critical part is that these two do not map onto each other. Available does not mean mature. A product can be available, with its core in production, while one capability inside it is still at preview — and being able to tell you that precisely is worth considerably more to you than a single reassuring label.

So when anyone, including me, tells you a product is available, the useful follow-up is: which parts, and at what maturity? We should be able to answer that every time.`,

  compounding: `This is the strategic idea behind being a group at all, rather than a series of separate companies.

Research produces knowledge. Knowledge becomes shared capabilities. Capabilities become infrastructure. Infrastructure makes the next product cheaper. Products become platforms, which open opportunities that send us back to research with better questions than we started with.

The design principle we hold ourselves to is the line on the slide: the next thing should benefit from everything built before it. I am stating that as a principle, not as a financial forecast — I am not putting a number on it, because I do not have one I could defend.

But it is a usable test. If a new product has to re-answer who a user is, or how an interface should behave, then the group has failed at the only thing it uniquely offers. The structure is the argument here. The products are what the structure makes possible.`,

  difference: `I want to be careful with this slide, because it would be easy to read it as "other companies do this badly". That is not the claim.

Every item in the left column is a real pressure that every organisation feels, us included. They are shortcuts precisely because they work in the short term. Shipping first and finding the question afterwards is faster. Optimising the next release is measurable. Letting roadmap language blur into the present tense makes for a better meeting. Accepting the category as given is how you get compared favourably within it.

The right column is what we have committed to instead. The honest framing is that this is a discipline rather than a talent, and it costs us speed — regularly.

What it buys is that the picture we give you of ourselves is accurate. Over a long relationship, I think that compounds as much as any technology does.`,

  "long-term": `Let me be plain about the long term.

The portfolio will change. The technologies will change. Some of what we are confident about today will look naive in five years. What should survive all of that is the method — the questioning, the exploring, the envisioning, and the insistence that only shipped things count.

The areas listed underneath are domains we think are worth exploring, and I have labelled them that way deliberately. They are not committed product lines, and I am not going to present them to you as a roadmap.

For the record, so you are not discovering it later: we are early, we are self-funded by design, and the team is small. We will not pretend the group is bigger than it is.

The ambition genuinely is long-term. And every claim I have made today is meant to be checkable against what exists right now.`,

  closing: `Question. Explore. Envision. Transform.

I hope by now that reads as a description of how we work rather than as a slogan.

If you take one thing from this conversation, I would like it to be this: we would rather be known less for what we have built so far — it is early, and the list is short — and more for how we decide what deserves to be built at all. That is the part we think compounds.

And if you want to test whether we actually work this way, the fastest route is to ask about the gap between what we claim and what runs. We keep track of that gap deliberately, and I am happy to walk you through any part of it.

Thank you. I would like to take questions.`,
};
