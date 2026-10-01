import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PORTFOLIO, STATUS_DEFINITION, type OrgStatus } from "./portfolio";
import { deckSlides } from "./slides";
import { MISSION, POSITIONING, QEET, SELF_DESCRIPTION, VISION } from "./slides/canon";
import { DECKS, SLIDE_CAUTIONS, SLIDE_IDS, SLIDE_LABELS, SLIDE_NOTES } from "./slides/notes";
import { StillProvider } from "./slides/primitives";

/**
 * ============================================================================
 * What this file is actually protecting
 * ============================================================================
 *
 * Not the layout — that is audited in a real browser. The thing that can
 * quietly go wrong in a corporate deck is the CLAIMS: someone tightens a
 * sentence six months from now, "active" becomes "available" because it reads
 * better, or a tidy total appears over the portfolio, and the organisation is
 * committed to a statement its own records do not support. That edit looks
 * harmless in review and it is the single most damaging change anyone could
 * make to this directory.
 *
 * So the forbidden claims are asserted, not trusted.
 *
 * ---------------------------------------------------------------------------
 * Slides are checked as RENDERED TEXT
 * ---------------------------------------------------------------------------
 * Every slide is rendered to static markup inside `StillProvider still` — the
 * same final-state tree the PDF prints — and the assertions run on the words
 * an audience would see. That catches what a source scan cannot: names and
 * statuses pulled in from `portfolio.ts` and `canon.ts`, strings computed at
 * render time, and nothing is ever hidden inside a comment.
 *
 * Cautions are deliberately NOT scanned. Their job is to name the claims the
 * presenter must not make, so they necessarily contain the forbidden words.
 *
 * ---------------------------------------------------------------------------
 * Where the expected values come from
 * ---------------------------------------------------------------------------
 * The constants below are transcribed from qeet-context with file and line
 * references. When the qeet-context repository is checked out beside this one
 * (as it is in the QG workspace), the tests also read the source files
 * directly and fail if the transcription has drifted from them.
 */

/* ==========================================================================
 * Helpers
 * ======================================================================== */

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
};

/** A slide's visible text, as one whitespace-normalised string. */
function renderText(Component: (props: { index: number }) => React.ReactNode, index: number) {
  const html = renderToStaticMarkup(
    <StillProvider still>
      <Component index={index} />
    </StillProvider>,
  );
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|lt|gt|quot|#x27|#39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

const MASTER = deckSlides("master");
const RENDERED = MASTER.map((s, i) => ({ id: s.id, text: renderText(s.Component, i + 1) }));
const renderedText = (id: string) => RENDERED.find((r) => r.id === id)?.text ?? "";

/** Whitespace-normalised, so a quote wrapped across source lines still matches. */
const normalise = (s: string) => s.replace(/\s+/g, " ").trim();

/**
 * Claims are matched on WORD BOUNDARIES. An earlier version of this guard
 * matched substrings and failed on `translate-y` (containing "sla") and on
 * `carries` (containing "arr"). A guard that cries wolf gets deleted by the
 * next person in a hurry.
 */
function mentions(haystack: string, claim: string): boolean {
  const escaped = claim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(haystack);
}

const SIBLING_CONTEXT = join(process.cwd(), "..", "qeet-context");
const HAS_CONTEXT = existsSync(join(SIBLING_CONTEXT, "ORGANIZATION.md"));
const contextFile = (name: string) => readFileSync(join(SIBLING_CONTEXT, name), "utf8");

/* ==========================================================================
 * Structure
 * ======================================================================== */

describe("deck structure", () => {
  it("is fifteen slides, in the agreed narrative order", () => {
    expect([...DECKS.master]).toEqual([
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
    ]);
  });

  it("has exactly one component file per slide", () => {
    const files = readdirSync(join(process.cwd(), "src", "app", "presentation", "slides")).filter(
      (f) => /^S\d\d.*\.tsx$/.test(f),
    );
    expect(files).toHaveLength(SLIDE_IDS.length);
  });

  it("says what Qeet Group is before it shows a single product", () => {
    const order: readonly string[] = DECKS.master;
    expect(order.indexOf("who")).toBe(1);
    expect(order.indexOf("vision-mission")).toBeLessThan(order.indexOf("ecosystem"));
    expect(order.indexOf("ecosystem")).toBeLessThan(order.indexOf("connects"));
  });

  it("gives every slide a label, speaker notes and a caution", () => {
    for (const id of SLIDE_IDS) {
      expect(SLIDE_LABELS[id], id).toBeTruthy();
      expect(SLIDE_NOTES[id], id).toBeTruthy();
      expect(SLIDE_CAUTIONS[id], id).toBeTruthy();
    }
  });

  /*
   * 110–260 words is roughly 45–90 seconds spoken. Too short and the slide is
   * being read aloud; too long and it is a script the presenter will lose
   * their place in.
   */
  it.each(SLIDE_IDS)("%s has 45-90 seconds of spoken material", (id) => {
    const words = SLIDE_NOTES[id].trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(110);
    expect(words).toBeLessThanOrEqual(260);
  });

  it.each(RENDERED.map((r) => [r.id, r.text] as const))("%s renders visible text", (_, text) => {
    expect(text.length).toBeGreaterThan(20);
  });
});

/* ==========================================================================
 * The organisation's own words
 * ======================================================================== */

/** ORGANIZATION.md:40-49, transcribed. */
const EXPECTED_CANON = {
  words: ["Question", "Explore", "Envision", "Transform"],
  claims: [
    "Progress begins with the right question.",
    "Curiosity, made operational.",
    "Designing for what compounds.",
    "Vision is decoration until it ships.",
  ],
  vision:
    "To create a future of limitless possibilities, where industries and individuals thrive through questioning, exploring, and transforming ideas into reality.",
  mission:
    "To empower people and organisations to adapt, innovate, and transform by embracing curiosity, exploration, and future-focused thinking.",
  self: "A multi-company holding built on a single philosophy: that meaningful progress begins with the right question.",
};

describe("canon", () => {
  it("uses the four canonical words, in order, and nothing else", () => {
    expect(QEET.map((p) => p.word)).toEqual(EXPECTED_CANON.words);
    expect(QEET.map((p) => p.letter).join("")).toBe("QEET");
  });

  it("quotes each principle's published claim verbatim", () => {
    expect(QEET.map((p) => p.claim)).toEqual(EXPECTED_CANON.claims);
  });

  it("quotes the vision, the mission and the self-description verbatim", () => {
    expect(VISION).toBe(EXPECTED_CANON.vision);
    expect(MISSION).toBe(EXPECTED_CANON.mission);
    expect(SELF_DESCRIPTION).toBe(EXPECTED_CANON.self);
  });

  it.skipIf(!HAS_CONTEXT)("matches qeet-context/ORGANIZATION.md as it stands today", () => {
    const source = normalise(contextFile("ORGANIZATION.md"));
    for (const quoted of [VISION, MISSION, SELF_DESCRIPTION, ...EXPECTED_CANON.claims]) {
      expect(source, quoted).toContain(quoted);
    }
    for (const word of EXPECTED_CANON.words) {
      expect(source).toContain(`**${word}**`);
    }
  });

  it("puts the vision and mission on screen, word for word", () => {
    const text = renderedText("vision-mission");
    expect(text).toContain(VISION);
    expect(text).toContain(MISSION);
  });

  it("describes Qeet as a group of ventures, in its own words", () => {
    expect(renderedText("who")).toContain(SELF_DESCRIPTION);
    expect(renderedText("title")).toContain(POSITIONING);
  });

  it("closes on the four words", () => {
    const text = renderedText("closing");
    for (const word of EXPECTED_CANON.words) expect(text).toContain(`${word}.`);
  });
});

/* ==========================================================================
 * Portfolio
 * ======================================================================== */

/** PRODUCT-PORTFOLIO.md:28-30, transcribed. */
const EXPECTED_STATUS: Record<string, OrgStatus> = {
  "Qeet ID": "active",
  Qeetrix: "active",
  "Qeet Logs": "active",
  "Qeet Notify": "active",
  "Qeet Pay": "development",
  "Qeet People": "development",
  "Qeet AI": "development",
  "Qeet News": "development",
  "Qeet Mail": "planned",
  "Qeet Calendar": "planned",
  "Qeet Contacts": "planned",
  "Qeet Tasks": "planned",
  "Qeet Drive": "planned",
  "Qeet Chat": "planned",
  "Qeet Meet": "planned",
};

/** schemas/context-schema.yaml `vocabularies.status`, transcribed. */
const EXPECTED_DEFINITION: Record<OrgStatus, string> = {
  active: "Shipped and in use.",
  development: "Substantive code exists; not yet complete or launched.",
  planned: "Specified or intended; no implementation.",
};

/**
 * The site's public vocabulary differs in one word, deliberately (see
 * `ProductStatus` in lib/content/types.ts). The mapping lives here, and only
 * here, so the deck itself never has to contain the site's word.
 */
const SITE_TO_ORG: Record<string, OrgStatus> = {
  available: "active",
  development: "development",
  planned: "planned",
};

const PRODUCTS_DIR = join(process.cwd(), "src", "content", "products");
const SITE_PRODUCTS = readdirSync(PRODUCTS_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const source = readFileSync(join(PRODUCTS_DIR, f), "utf8");
    const field = (key: string) => {
      const match = new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m").exec(source);
      if (!match) throw new Error(`${f} has no ${key} in its frontmatter`);
      return match[1];
    };
    return { slug: f.replace(/\.mdx$/, ""), name: field("name"), status: field("status") };
  });

describe("portfolio", () => {
  it("carries the organisation's status for every product, and no other", () => {
    expect(Object.fromEntries(PORTFOLIO.map((p) => [p.name, p.status]))).toEqual(EXPECTED_STATUS);
    expect(new Set(PORTFOLIO.map((p) => p.slug)).size).toBe(PORTFOLIO.length);
  });

  it("defines each status in the schema's own words", () => {
    expect(STATUS_DEFINITION).toEqual(EXPECTED_DEFINITION);
  });

  it("never lets a role imply a status it does not have", () => {
    for (const p of PORTFOLIO) {
      if (p.role === "foundation") expect(p.status, p.name).toBe("active");
      if (p.role === "domain") expect(p.status, p.name).toBe("development");
      if (p.role === "productivity") expect(p.status, p.name).toBe("planned");
    }
  });

  it("names exactly the products qeet.in publishes", () => {
    const deck = PORTFOLIO.map((p) => `${p.slug}=${p.name}`).toSorted();
    const site = SITE_PRODUCTS.map((p) => `${p.slug}=${p.name}`).toSorted();
    expect(deck).toEqual(site);
  });

  it("agrees with qeet.in on every status, once the vocabularies are mapped", () => {
    for (const site of SITE_PRODUCTS) {
      const deck = PORTFOLIO.find((p) => p.slug === site.slug);
      expect(SITE_TO_ORG[site.status], `${site.slug}: site says "${site.status}"`).toBe(deck?.status);
    }
  });

  it.skipIf(!HAS_CONTEXT)("matches qeet-context/PRODUCT-PORTFOLIO.md as it stands today", () => {
    const source = contextFile("PRODUCT-PORTFOLIO.md");
    for (const status of ["active", "development", "planned"] as const) {
      const row = new RegExp(`^\\|\\s*\`${status}\`\\s*\\|\\s*(.+?)\\s*\\|\\s*$`, "m").exec(source);
      expect(row, `no ${status} row`).not.toBeNull();
      const names = row![1].split("·").map((n) => n.trim());
      const deck = PORTFOLIO.filter((p) => p.status === status).map((p) => p.name);
      expect(deck.toSorted()).toEqual(names.toSorted());
    }
  });

  it("shows every product on the ecosystem slide", () => {
    const text = renderedText("ecosystem");
    for (const p of PORTFOLIO) expect(text, p.name).toContain(p.name);
  });
});

/* ==========================================================================
 * Claim safety
 * ======================================================================== */

/**
 * Each pattern is forbidden by a specific record in the organisation's own
 * documentation: a contested GA date (DRIFT-REGISTER QC-007), an isolation
 * guarantee the code does not make (QC-013, QC-014), compliance status that
 * is `unknown` (DATA-GOVERNANCE.md §9), deployment notes that availability and
 * scale may not be claimed (DEPLOYMENT.md), a product count that does not
 * reconcile, and the rule that no unsourced business figure is shown.
 */
const FORBIDDEN: Array<[string, RegExp]> = [
  // Status vocabulary: the organisation's word is "active".
  ["available / availability", /\bavailab/i],
  ["GA", /\bGA\b/],
  ["general availability", /\bgeneral(ly)?\s+availab/i],
  ["running in production", /\brunning in production\b/i],
  ["enterprise-ready", /\benterprise[\s-]ready\b/i],
  // Compliance: none is evidenced.
  ["certification", /\bcertif/i],
  ["SOC 2", /\bsoc\s?2\b/i],
  ["ISO 27001", /\biso\s?27001\b/i],
  ["PCI", /\bpci\b/i],
  ["HIPAA", /\bhipaa\b/i],
  ["FedRAMP", /\bfedramp\b/i],
  // Operations: not claimable today.
  ["uptime", /\buptime\b/i],
  ["SLA", /\bsla\b/i],
  ["high availability", /\bhigh(ly)?\s+availab/i],
  ["multi-region", /\bmulti-region\b/i],
  ["row-level security", /\brow-level security\b/i],
  ["architecturally impossible", /\barchitecturally impossible\b/i],
  // Business figures: none is verified.
  ["revenue", /\brevenue/i],
  ["ARR", /\barr\b/i],
  ["customers", /\bcustomers\b/i],
  ["headcount", /\bheadcount\b/i],
  ["market share", /\bmarket share\b/i],
  ["valuation", /\bvaluation\b/i],
  ["funding round", /\bfunding round\b/i],
  // The portfolio count does not reconcile, so no count is shown.
  [
    "a product count",
    /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen)\s+(\w+\s+)?(products|ventures|companies)\b/i,
  ],
  ["code-backed", /\bcode-backed\b/i],
  ["specification-only", /\bspecification-only\b/i],
  // The framing the organisation contradicts.
  ["not a collection of ventures", /\bnot a collection of\b/i],
  ["one technology organisation", /\bone technology organi[sz]ation\b/i],
  // Tone.
  ["revolutionary", /\brevolutionar/i],
  ["game-changing", /\bgame[\s-]chang/i],
  ["world-class", /\bworld[\s-]class\b/i],
  ["disrupt", /\bdisrupt/i],
  ["movement", /\bmovement\b/i],
  ["cutting-edge", /\bcutting[\s-]edge\b/i],
];

/**
 * Words that exist only in the seven-stage maturity scale the previous deck
 * invented. "Research" and "Development" are excluded: the first is in the
 * organisation's own Explore claim, and the second is a real status.
 */
const MATURITY_ONLY = ["Concept", "Prototype", "Preview", "Production", "Mature"];

describe("claim safety", () => {
  it("matches claims as words, not as substrings", () => {
    expect(mentions("transition-all translate-y-2", "sla")).toBe(false);
    expect(mentions("the slide carries a narrow rule", "arr")).toBe(false);
    expect(mentions("we publish an SLA of four nines", "sla")).toBe(true);
  });

  it("would catch a product total, including one with a word in the middle", () => {
    const [, count] = FORBIDDEN.find(([label]) => label === "a product count")!;
    expect(count.test("seven planned products")).toBe(true);
    expect(count.test("16 products")).toBe(true);
    expect(count.test("active, in-development and planned products")).toBe(false);
  });

  it.each(RENDERED.map((r) => [r.id, r.text] as const))(
    "%s slide makes no forbidden claim",
    (id, text) => {
      for (const [label, pattern] of FORBIDDEN) {
        expect(pattern.test(text), `slide ${id} says "${label}": ${text}`).toBe(false);
      }
    },
  );

  it.each(SLIDE_IDS)("%s speaker notes make no forbidden claim", (id) => {
    for (const [label, pattern] of FORBIDDEN) {
      expect(pattern.test(SLIDE_NOTES[id]), `notes for ${id} say "${label}"`).toBe(false);
    }
  });

  /**
   * The structural guarantee behind "status is not maturity": no slide may
   * put a product's name and a maturity-only word in the same frame. That is
   * how a status quietly becomes a maturity claim — not by anyone deciding
   * to make it, but by two words ending up eighty pixels apart.
   */
  it.each(RENDERED.map((r) => [r.id, r.text] as const))(
    "%s never places a product name beside a maturity stage",
    (id, text) => {
      const names = PORTFOLIO.map((p) => p.name).filter((name) => text.includes(name));
      const stages = MATURITY_ONLY.filter((stage) => mentions(text, stage));
      expect(
        names.length === 0 || stages.length === 0,
        `${id} names ${names.join(", ")} beside ${stages.join(", ")}`,
      ).toBe(true);
    },
  );

  it("presents no maturity scale anywhere — slides or notes", () => {
    const sources = [
      ...RENDERED.map((r) => [`slide ${r.id}`, r.text] as const),
      ...SLIDE_IDS.map((id) => [`notes ${id}`, SLIDE_NOTES[id]] as const),
    ];
    for (const [where, text] of sources) {
      const stages = ["Research", ...MATURITY_ONLY].filter((s) => mentions(text, s));
      expect(stages.length, `${where} uses ${stages.join(", ")}`).toBeLessThan(3);
    }
  });
});
