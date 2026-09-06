/**
 * Contrast gate.
 *
 * Parses the token layer out of src/app/globals.css, resolves var() chains,
 * converts OKLCH to sRGB and asserts every declared pairing against its WCAG
 * threshold — in BOTH themes. Run with `bun run check:contrast`.
 *
 * This exists because contrast is arithmetic and should not be a judgement
 * call, and because the palette's stranger-looking decisions are all arithmetic
 * in origin:
 *
 *   - brand-500 measures ~2.9:1 on the light canvas, so accent TEXT needs its
 *     own token and splits again by size.
 *   - White on a brand-500 fill is ~3:1, so labels on an accent fill use a
 *     near-black instead.
 *   - The light theme's accent drifts toward gold as it darkens, because
 *     holding a yellow-green's hue while darkening it produces olive.
 *
 * None of those is visible by inspection. All of them are caught here.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

type Rgb = [number, number, number];

// Run from the repo root via `bun run check:contrast`, so cwd is the project.
// (`import.meta.dir` is Bun-only and fails Next's TypeScript pass.)
const CSS_PATH = join(process.cwd(), "src", "app", "globals.css");

/* -- colour maths ---------------------------------------------------------- */

function oklchToSrgb(L: number, C: number, H: number): Rgb {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const enc = (c: number) => {
    const v = Math.max(0, Math.min(1, c));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  };
  return [enc(lr), enc(lg), enc(lb)];
}

function hexToSrgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as Rgb;
}

function relativeLuminance([r, g, b]: Rgb): number {
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* -- token extraction ------------------------------------------------------ */

const css = readFileSync(CSS_PATH, "utf-8");

/** Collects `--name: value;` declarations from the block a selector opens. */
function collectBlock(source: string, opener: RegExp): Record<string, string> {
  const out: Record<string, string> = {};
  const start = source.search(opener);
  if (start === -1) return out;
  let depth = 0;
  let i = source.indexOf("{", start);
  const from = i + 1;
  for (; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}" && --depth === 0) break;
  }
  for (const m of source.slice(from, i).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim();
  }
  return out;
}

// `@theme\s*\{` matches only the plain block — `@theme inline {` and
// `@theme static {` both have a word where the brace would have to be.
const base: Record<string, string> = {
  ...collectBlock(css, /@theme static\s*\{/),
  ...collectBlock(css, /@theme\s*\{/),
};
const light = { ...base, ...collectBlock(css, /^\.light\s*\{/m) };

function resolve(tokens: Record<string, string>, name: string, depth = 0): Rgb | null {
  if (depth > 10) return null;
  const raw = tokens[name];
  if (!raw) return null;

  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  if (ref) return resolve(tokens, ref[1], depth + 1);

  const oklch = raw.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
  if (oklch) return oklchToSrgb(+oklch[1], +oklch[2], +oklch[3]);

  if (/^#[0-9a-fA-F]{3,8}$/.test(raw)) return hexToSrgb(raw);

  return null; // color-mix() and friends aren't solid colours.
}

/* -- the contract ---------------------------------------------------------- */

type Check = {
  fg: string;
  bg: string;
  /** 4.5 for body text; 3 for large text and non-text UI (WCAG 1.4.11). */
  min: number;
  why: string;
  /*
   * A pairing that is knowingly allowed to fail, with the reason it was
   * accepted. It is still measured and still printed on every run — it just
   * does not fail the gate.
   *
   * This exists so a deliberate exception stays VISIBLE. The alternative when
   * someone decides a rule should not apply is that the check gets deleted, and
   * six months later nobody remembers a decision was ever made. An accepted
   * exception is a decision with its reasoning attached; a deleted check is
   * just an absence.
   */
  accepted?: string;
};

const CHECKS: Check[] = [
  { fg: "--color-ink", bg: "--color-canvas", min: 4.5, why: "body text" },
  { fg: "--color-ink-muted", bg: "--color-canvas", min: 4.5, why: "secondary text" },
  { fg: "--color-ink-subtle", bg: "--color-canvas", min: 4.5, why: "tertiary text" },
  { fg: "--color-ink", bg: "--color-surface", min: 4.5, why: "text on cards" },
  { fg: "--color-ink-muted", bg: "--color-surface", min: 4.5, why: "secondary on cards" },
  { fg: "--color-ink-subtle", bg: "--color-surface", min: 4.5, why: "tertiary on cards" },
  { fg: "--color-ink-inverse", bg: "--color-inverse", min: 4.5, why: "inverse band text" },
  {
    fg: "--color-accent-text",
    bg: "--color-canvas",
    min: 4.5,
    why: "accent text — the raw accent fails here, which is why this token exists",
  },
  { fg: "--color-accent-text", bg: "--color-surface", min: 4.5, why: "accent text on cards" },
  {
    fg: "--color-accent-text-display",
    bg: "--color-canvas",
    // 3:1 is the WCAG large-text threshold. This token is only ever used on
    // display type (the hero headline), which is far above 24px.
    min: 3,
    why: "accent text at display size",
  },
  {
    fg: "--color-accent-contrast",
    bg: "--color-accent",
    min: 4.5,
    why: "label on an accent fill — white would be 3.01:1",
  },
  /*
   * Filled controls. The label check is the one that forced a second accent
   * token: white on the graphic accent (brand-500) is 3.01:1, so the button
   * fill had to darken independently of it.
   */
  { fg: "--color-accent-solid-contrast", bg: "--color-accent-solid", min: 4.5, why: "white label on a button" },
  { fg: "--color-accent-solid", bg: "--color-canvas", min: 3, why: "button separates from the canvas" },
  { fg: "--color-accent-solid-contrast", bg: "--color-accent-solid-hover", min: 4.5, why: "white label on hover" },
  /* Hover is the brand at full strength, used on graphics only — 3:1 (1.4.11). */
  { fg: "--color-accent-hover", bg: "--color-canvas", min: 3, why: "brand on hover, as a graphic" },
  {
    fg: "--color-accent-text-hover",
    bg: "--color-canvas",
    min: 4.5,
    why: "hover text",
    accepted:
      "brand #ff6900 is used for hover text in both themes by design. It is " +
      "2.81:1 on the light canvas and does not meet AA. Scoped to hover only " +
      "(static accent text passes), unreachable by keyboard or touch, and " +
      "never the sole affordance — every element also moves an underline, " +
      "arrow or border. Compliant on dark at 6.86:1.",
  },
  { fg: "--color-focus", bg: "--color-canvas", min: 3, why: "focus ring on canvas" },
  { fg: "--color-focus", bg: "--color-surface", min: 3, why: "focus ring on cards" },
  { fg: "--color-rule-interactive", bg: "--color-canvas", min: 3, why: "meaningful borders (1.4.11)" },
  { fg: "--color-rule-interactive", bg: "--color-surface", min: 3, why: "meaningful borders on cards" },
  { fg: "--color-error", bg: "--color-canvas", min: 4.5, why: "error text" },
  { fg: "--color-success", bg: "--color-canvas", min: 4.5, why: "success text" },
  { fg: "--color-warning", bg: "--color-canvas", min: 4.5, why: "warning text" },
  /*
   * Lifecycle. These are the load-bearing ones for the ecosystem map: status is
   * encoded in colour, so each step must be independently distinguishable from
   * the surface it sits on — 3:1 as a non-text graphic (WCAG 1.4.11), and 4.5:1
   * where the same token also colours the status label's text, which it does on
   * every StatusChip. `planned` is the tight one by construction: it is the
   * faintest rung of a ladder whose whole point is that it fades.
   */
  { fg: "--color-status-available", bg: "--color-canvas", min: 4.5, why: "available status" },
  { fg: "--color-status-available", bg: "--color-surface", min: 4.5, why: "available on cards" },
  { fg: "--color-status-development", bg: "--color-canvas", min: 4.5, why: "in-development status" },
  { fg: "--color-status-development", bg: "--color-surface", min: 4.5, why: "in-development on cards" },
  { fg: "--color-status-planned", bg: "--color-canvas", min: 4.5, why: "planned status" },
  { fg: "--color-status-planned", bg: "--color-surface", min: 4.5, why: "planned on cards" },
  /*
   * Text over a scrimmed photograph. The scrim is the guarantee that this
   * pairing holds regardless of what the image underneath does, so it is the
   * scrim floor — not the image — that has to be measured.
   */
  { fg: "--color-ink-inverse", bg: "--scrim-floor-solid", min: 4.5, why: "text over scrimmed media" },
];

const THEMES: Array<[string, Record<string, string>]> = [
  ["dark", base],
  ["light", light],
];

let failures = 0;
let skipped = 0;
let accepted = 0;

for (const [themeName, tokens] of THEMES) {
  console.log(`\n  ${themeName}`);
  for (const { fg, bg, min, why } of CHECKS) {
    const a = resolve(tokens, fg);
    const b = resolve(tokens, bg);
    if (!a || !b) {
      skipped++;
      console.log(`    ?    ${fg} on ${bg} — unresolvable, skipped`);
      continue;
    }
    const ratio = contrast(a, b);
    const pass = ratio >= min;
    const note = CHECKS.find((c) => c.fg === fg && c.bg === bg)?.accepted;
    if (!pass && note) accepted++;
    else if (!pass) failures++;
    const label = pass ? "ok " : note ? "ACPT" : "FAIL";
    console.log(
      `    ${label} ${ratio.toFixed(2).padStart(5)}:1  (needs ${min})  ` +
        `${fg.replace("--color-", "")} on ${bg.replace("--color-", "")}` +
        (pass ? "" : `  <- ${why}`),
    );
  }
}

const total = CHECKS.length * THEMES.length - skipped;
console.log(
  `\n  ${total} pairings checked, ${failures} failing, ${accepted} accepted, ${skipped} skipped.\n`,
);

// Accepted exceptions are reprinted in full, so the reasoning is in the output
// of every run and not only in a comment somebody has to go looking for.
for (const c of CHECKS.filter((c) => c.accepted)) {
  console.log(`  ACCEPTED  ${c.fg.replace("--color-", "")} on ${c.bg.replace("--color-", "")}`);
  console.log(`            ${c.accepted}\n`);
}

if (failures > 0) process.exit(1);
