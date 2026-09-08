import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { ProductStatus, ProductSummary } from "@/lib/content/types";
import { CONTESTED, hasContestedStatus, toBands } from "./portfolio";
import { SLIDE_IDS, SLIDE_LABELS, SLIDE_NOTES } from "./slides/notes";

/**
 * ============================================================================
 * What this file is actually protecting
 * ============================================================================
 *
 * Not the layout. The thing that can quietly go wrong in a corporate deck is
 * the CLAIMS: someone tightens a sentence six months from now, "available"
 * becomes "generally available" because it reads better, and the organisation
 * is committed to a maturity statement its own records do not support. That
 * edit looks harmless in review and it is the single most damaging change
 * anyone could make to this directory.
 *
 * So the forbidden claims are asserted, not trusted. The same discipline the
 * site already applies to contrast (`bun run check:contrast`) and to metrics
 * (`MetricBand` refusing to render a figure without evidence), pointed at the
 * one artefact whose whole argument is that Qeet does not overstate.
 *
 * ---------------------------------------------------------------------------
 * Why the slides are read as SOURCE rather than rendered
 * ---------------------------------------------------------------------------
 * Rendering would be the better test in principle — it checks what an audience
 * sees rather than what a file says. It is also the more fragile one here: the
 * suite runs in a plain Node environment with no React renderer, and pulling
 * one in to assert on strings would make a claim-safety guard depend on a
 * rendering toolchain that has nothing to do with claims.
 *
 * Reading source has one real hazard, and it is handled: the comments in this
 * directory NAME the forbidden claims in order to explain why they are absent.
 * So comments are stripped before any assertion runs, and there is a test
 * asserting that the stripping works — without it, this file would pass by
 * accident and prove nothing.
 */

const SLIDE_DIR = join(process.cwd(), "src", "app", "presentation", "slides");

function slideFiles(): string[] {
  return readdirSync(SLIDE_DIR)
    .filter((f) => /^S\d\d.*\.tsx$/.test(f))
    .sort();
}

/** Removes block comments, line comments and import statements. */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^\s*\/\/.*$/gm, " ")
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];/gm, " ");
}

function slideBody(file: string): string {
  return stripComments(readFileSync(join(SLIDE_DIR, file), "utf8"));
}

/**
 * Claims are matched on WORD BOUNDARIES, and the first draft of this file was
 * not — which made it fail on `translate-y` (containing "sla") and on
 * `carries` (containing "arr"). A guard that cries wolf gets deleted by the
 * next person in a hurry, so the short claims have to be matched as words.
 */
function mentions(haystack: string, claim: string): boolean {
  const escaped = claim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(haystack);
}

/**
 * Every phrase here is forbidden by a specific record in the organisation's
 * own documentation — a contested GA date, a critical drift entry about an
 * isolation guarantee, a published statement that no certification is held, a
 * deployment note that availability may not be claimed, or the rule that no
 * unsourced number is rendered anywhere on a Qeet surface.
 *
 * `development` is deliberately NOT here. It is a legitimate word in both of
 * Qeet's vocabularies — the public status "In development", and the maturity
 * stage "Development" — so banning it would ban the deck's own subject matter.
 */
const FORBIDDEN_CLAIMS = [
  "generally available",
  "running in production",
  "enterprise-ready",
  "enterprise ready",
  "soc 2",
  "soc2",
  "iso 27001",
  "pci dss",
  "certified",
  "certification",
  "uptime",
  "sla",
  "highly available",
  "high availability",
  "multi-region",
  "row-level security",
  "architecturally impossible",
  "revenue",
  "headcount",
  "market share",
  "customers",
  "arr",
];

/**
 * Maturity stages that exist ONLY in the maturity vocabulary. "Development" is
 * excluded because it appears in both, so its presence proves nothing either
 * way.
 */
const MATURITY_ONLY = [
  "Research",
  "Concept",
  "Prototype",
  "Preview",
  "Production",
  "Mature",
];

/*
 * Product names come from the frontmatter rather than from the slug. Deriving
 * "Qeet Logs" from `qeet-logs` by title-casing looks fine until it produces
 * "Qeet logs" and the co-location check below silently stops matching the
 * product it was written to catch.
 */
const PRODUCTS_DIR = join(process.cwd(), "src", "content", "products");
const PRODUCT_NAMES = readdirSync(PRODUCTS_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const source = readFileSync(join(PRODUCTS_DIR, f), "utf8");
    const match = /^name:\s*["']?(.+?)["']?\s*$/m.exec(source);
    if (!match) throw new Error(`${f} has no name in its frontmatter`);
    return match[1];
  });

function product(
  slug: string,
  status: ProductStatus,
  group: ProductSummary["group"],
): ProductSummary {
  return {
    slug,
    name: slug,
    short: slug,
    oneLiner: "",
    sector: "",
    group,
    href: `/products/${slug}`,
    status,
    statusLabel: status,
  };
}

describe("deck structure", () => {
  it("is fifteen slides", () => {
    expect(SLIDE_IDS).toHaveLength(15);
    expect(slideFiles()).toHaveLength(15);
  });

  it("runs in the agreed narrative order, with the proof at position four", () => {
    expect([...SLIDE_IDS]).toEqual([
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
    ]);
    // The whole point of the ordering: a real product before the philosophy.
    expect(SLIDE_IDS.indexOf("qeet-id")).toBeLessThan(SLIDE_IDS.indexOf("question"));
  });

  it("gives every slide a label and speaker notes", () => {
    for (const id of SLIDE_IDS) {
      expect(SLIDE_LABELS[id], id).toBeTruthy();
      expect(SLIDE_NOTES[id], id).toBeTruthy();
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
});

describe("claim safety", () => {
  it("strips comments before asserting, so the guard cannot pass by accident", () => {
    const withComment = `/* generally available */\n// soc 2\nconst a = "keep";`;
    const stripped = stripComments(withComment);
    expect(stripped).not.toContain("generally available");
    expect(stripped).not.toContain("soc 2");
    expect(stripped).toContain("keep");

    // And the inverse: a claim in real markup must survive stripping.
    expect(stripComments(`<p>generally available</p>`)).toContain("generally available");
  });

  it("matches claims as words, not as substrings", () => {
    expect(mentions("transition-all translate-y-2", "sla")).toBe(false);
    expect(mentions("the slide carries a narrow rule", "arr")).toBe(false);
    expect(mentions("we publish an SLA of four nines", "sla")).toBe(true);
    expect(mentions("Generally Available since May", "generally available")).toBe(true);
  });

  it.each(slideFiles())("%s makes no forbidden claim", (file) => {
    const body = slideBody(file);
    for (const claim of FORBIDDEN_CLAIMS) {
      expect(mentions(body, claim), `${file} contains "${claim}"`).toBe(false);
    }
  });

  it.each(SLIDE_IDS)("%s speaker notes make no forbidden claim", (id) => {
    for (const claim of FORBIDDEN_CLAIMS) {
      expect(
        mentions(SLIDE_NOTES[id], claim),
        `notes for ${id} contain "${claim}"`,
      ).toBe(false);
    }
  });

  /**
   * The structural guarantee behind "status is not maturity": no slide may put
   * a product's name and a maturity-only stage word in the same frame. That is
   * how `Available` quietly becomes `Production` — not by anyone deciding to
   * claim it, but by the two words ending up eighty pixels apart.
   */
  it.each(slideFiles())("%s never places a product name beside a maturity stage", (file) => {
    const body = slideBody(file);
    const names = PRODUCT_NAMES.filter((name) => body.includes(name));
    const stages = MATURITY_ONLY.filter((stage) => new RegExp(`\\b${stage}\\b`).test(body));

    if (names.length > 0 && stages.length > 0) {
      throw new Error(
        `${file} mentions ${names.join(", ")} alongside maturity stage(s) ${stages.join(", ")}. ` +
          `Status and maturity are separate systems and may not be co-located.`,
      );
    }
    expect(names.length === 0 || stages.length === 0).toBe(true);
  });

  /**
   * The seven-stage scale is presented on exactly one slide.
   *
   * Slide 08 legitimately names three of these words in its idea-to-shipped
   * chain, and that is a different figure making a different point — so the
   * threshold is set where "uses a stage word" ends and "is presenting the
   * maturity scale" begins. If a second slide ever starts rendering the scale,
   * the two will drift, and one of them will be the version someone
   * remembers.
   */
  it("presents the maturity scale on exactly one slide", () => {
    const scaleCount = (file: string) => {
      const body = slideBody(file);
      return MATURITY_ONLY.filter((s) => new RegExp(`\\b${s}\\b`).test(body)).length;
    };

    const carriers = slideFiles().filter((file) => scaleCount(file) >= 5);
    expect(carriers).toEqual(["S11Lifecycle.tsx"]);
    expect(scaleCount("S11Lifecycle.tsx")).toBe(MATURITY_ONLY.length);
    expect(scaleCount("S08Transform.tsx")).toBeLessThan(5);
  });
});

describe("portfolio gate", () => {
  const contested = [
    product("qeet-id", "available", "identity"),
    product("qeet-notify", "available", "communications"),
    product("qeet-mail", "planned", "productivity"),
  ];

  it("reports a contested status while one is on the list", () => {
    expect(CONTESTED.size).toBeGreaterThan(0);
    expect(hasContestedStatus(contested)).toBe(true);
  });

  it("reports none once the disputed product is out of the portfolio", () => {
    const resolved = contested.filter((p) => !CONTESTED.has(p.slug));
    expect(hasContestedStatus(resolved)).toBe(false);
  });

  it("bands by role, never by status", () => {
    const bands = toBands(contested);
    const foundations = bands.find((b) => b.label === "Shared foundations");
    expect(foundations?.items.map((p) => p.slug)).toEqual(["qeet-id"]);

    // A band label must not name a lifecycle state, or the grouping has
    // smuggled a per-status count back onto the slide.
    for (const band of bands) {
      expect(band.label.toLowerCase()).not.toContain("available");
      expect(band.label.toLowerCase()).not.toContain("development");
      expect(band.label.toLowerCase()).not.toContain("planned");
    }
  });

  it("drops empty bands rather than rendering an empty heading", () => {
    const onlyFoundations = [product("qeet-id", "available", "identity")];
    expect(toBands(onlyFoundations).map((b) => b.label)).toEqual(["Shared foundations"]);
  });

  it("never invents a fourth lifecycle state", () => {
    const source = readFileSync(
      join(process.cwd(), "src", "app", "presentation", "portfolio.ts"),
      "utf8",
    );
    const body = stripComments(source).toLowerCase();
    for (const invented of ["under review", "unknown", "unconfirmed", "tbc", "coming soon"]) {
      expect(body, `portfolio.ts introduces "${invented}"`).not.toContain(invented);
    }
  });
});
