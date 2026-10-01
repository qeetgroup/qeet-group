/**
 * ============================================================================
 * The organisation's own words
 * ============================================================================
 *
 * Everything in this module is QUOTED, not written. The source is
 * qeet-context/ORGANIZATION.md, which quotes the organisation's published
 * profile (qeetgroup/.github/profile/README.md) — the document it names as
 * authoritative for identity, philosophy, vision and mission, "quoted here,
 * never contradicted".
 *
 * So nothing below may be tightened, modernised or paraphrased for a slide.
 * `slides.test.tsx` holds a second copy of each string, transcribed from the
 * source, and fails on any difference. If the profile changes, both change.
 *
 * Data only — no React — so the tests can load it in plain Node.
 */

export type Principle = {
  letter: "Q" | "E" | "T";
  /** The canonical word. Never "Exploration" or "Transformation". */
  word: "Question" | "Explore" | "Envision" | "Transform";
  /** The organisation's first sentence for this word, verbatim. */
  claim: string;
  /** A short gloss, written for the deck, that restates the claim plainly. */
  gloss: string;
};

/** ORGANIZATION.md:40-43. The order is the argument; it never changes. */
export const QEET: readonly Principle[] = [
  {
    letter: "Q",
    word: "Question",
    claim: "Progress begins with the right question.",
    gloss: "Find the problem that truly matters.",
  },
  {
    letter: "E",
    word: "Explore",
    claim: "Curiosity, made operational.",
    gloss: "Research, experiment, and reduce uncertainty.",
  },
  {
    letter: "E",
    word: "Envision",
    claim: "Designing for what compounds.",
    gloss: "Define a specific future worth creating.",
  },
  {
    letter: "T",
    word: "Transform",
    claim: "Vision is decoration until it ships.",
    gloss: "Build it, deliver it, and learn from it.",
  },
];

/** ORGANIZATION.md:45-46. */
export const VISION =
  "To create a future of limitless possibilities, where industries and individuals thrive through questioning, exploring, and transforming ideas into reality.";

/** ORGANIZATION.md:48-49. */
export const MISSION =
  "To empower people and organisations to adapt, innovate, and transform by embracing curiosity, exploration, and future-focused thinking.";

/** ORGANIZATION.md:24 — the organisation's self-description. */
export const SELF_DESCRIPTION =
  "A multi-company holding built on a single philosophy: that meaningful progress begins with the right question.";

/**
 * ORGANIZATION.md:26-27 publishes the framing as "one philosophy, many
 * ventures". Set here as two sentences, which is a typographic decision about
 * a title slide, not a change of wording.
 */
export const POSITIONING = "One philosophy. Many ventures.";

/** Where the quoted wording comes from, for on-slide attribution. */
export const PROFILE_SOURCE = "Qeet Group organisation profile";
