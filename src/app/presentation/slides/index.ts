import { S01Title } from "./S01Title";
import { S02WhoWeAre } from "./S02WhoWeAre";
import { S03Why } from "./S03Why";
import { S04Method } from "./S04Method";
import { S05InPractice } from "./S05InPractice";
import { S06VisionMission } from "./S06VisionMission";
import { S07Ecosystem } from "./S07Ecosystem";
import { S08Foundations } from "./S08Foundations";
import { S09Domain } from "./S09Domain";
import { S10Productivity } from "./S10Productivity";
import { S11Connects } from "./S11Connects";
import { S12Standards } from "./S12Standards";
import { S13HowWeBuild } from "./S13HowWeBuild";
import { S14LongTerm } from "./S14LongTerm";
import { S15Closing } from "./S15Closing";
import {
  DECKS,
  SLIDE_CAUTIONS,
  SLIDE_LABELS,
  SLIDE_NOTES,
  type DeckVariant,
  type SlideId,
} from "./notes";
import type { Slide, SlideProps } from "./types";

/**
 * ============================================================================
 * The deck, assembled
 * ============================================================================
 *
 * Every slide is registered once, by id. A running order is a list of ids in
 * `notes.ts` (`DECKS`), so the order, the labels and the spoken material are
 * one data structure that the tests can read without importing a component.
 *
 * The master order answers, in sequence: what Qeet Group is (01–02), why it
 * exists and how it thinks (03–05), where it is pointed (06), what it is
 * building (07–10), how the pieces relate (11), how it operates (12–13), and
 * where it is going (14–15). Products appear at slide 05, the philosophy is
 * never more than two slides from something real, and the portfolio is
 * complete by slide 10.
 *
 * ---------------------------------------------------------------------------
 * Audience variants — how to build one
 * ---------------------------------------------------------------------------
 * Add a sequence to `DECKS` that reuses the master's opening and swaps the
 * later slides. Never edit a master slide to suit one audience; add a slide.
 *
 *   NEW JOINER   keep 01–11. Replace 12–14 with: how teams work and who owns
 *                what, product and engineering discipline, security
 *                responsibility, why the organisation writes its context
 *                down, what Q.E.E.T asks of an employee, and where a new
 *                joiner fits in the ecosystem.
 *
 *   INVESTOR     keep 01–08. Replace the engineering slides with market
 *                problem, opportunity, portfolio strategy, ecosystem
 *                advantage, defensibility, business model, traction and
 *                milestones. EVERY ONE OF THOSE NEEDS VERIFIED BUSINESS
 *                INPUTS, and none exists in the organisation's records today.
 *                Do not build this variant from estimates: no revenue, ARR,
 *                users, retention, pipeline, funding, valuation, partnerships,
 *                market sizing or forecast may appear without a source. Until
 *                those inputs exist, the slide that would carry them says that
 *                they are required.
 *
 *   CUSTOMER /   keep 01–02, 05, 07–11. Add: the problems each product
 *   PARTNER      solves, integration and APIs, developer experience, the
 *                security model, the deployment and adoption model, and
 *                operational trust — scoped to products whose status is
 *                active.
 *
 *   TECHNICAL    keep 01–02, 07–12. Expand: the platform dependency model,
 *                polyrepo, polyglot by domain, OIDC, API standards, product
 *                and data boundaries, tenant isolation, environments,
 *                deployment, observability and SDKs.
 *
 * Every variant runs under the same claim-safety tests as the master.
 */
const COMPONENTS: Record<SlideId, (props: SlideProps) => React.ReactNode> = {
  title: S01Title,
  who: S02WhoWeAre,
  why: S03Why,
  method: S04Method,
  "in-practice": S05InPractice,
  "vision-mission": S06VisionMission,
  ecosystem: S07Ecosystem,
  foundations: S08Foundations,
  domain: S09Domain,
  productivity: S10Productivity,
  connects: S11Connects,
  standards: S12Standards,
  "how-we-build": S13HowWeBuild,
  "long-term": S14LongTerm,
  closing: S15Closing,
};

export function slide(id: SlideId): Slide {
  return {
    id,
    label: SLIDE_LABELS[id],
    Component: COMPONENTS[id],
    notes: SLIDE_NOTES[id],
    caution: SLIDE_CAUTIONS[id],
  };
}

/** A running order, resolved to slides. */
export function deckSlides(variant: DeckVariant): Slide[] {
  return DECKS[variant].map(slide);
}
