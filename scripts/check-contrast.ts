/**
 * Contrast gate.
 *
 * Parses the token layer out of src/app/globals.css, resolves var() chains,
 * converts OKLCH to sRGB and asserts every declared pairing against its WCAG
 * threshold — in BOTH themes. Run with `bun run check:contrast`.
 *
 * This exists because contrast is arithmetic and should not be a judgement
 * call. Two of the palette's stranger-looking tokens are here because the
 * numbers demanded them: brand-500 is 2.94:1 on the light canvas (so accent
 * text needs its own token), and white on a brand-500 fill is 3.01:1 (so
 * labels on accent need a near-black).
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
  { fg: "--color-focus", bg: "--color-canvas", min: 3, why: "focus ring on canvas" },
  { fg: "--color-focus", bg: "--color-surface", min: 3, why: "focus ring on cards" },
  { fg: "--color-rule-interactive", bg: "--color-canvas", min: 3, why: "meaningful borders (1.4.11)" },
  { fg: "--color-rule-interactive", bg: "--color-surface", min: 3, why: "meaningful borders on cards" },
  { fg: "--color-error", bg: "--color-canvas", min: 4.5, why: "error text" },
  { fg: "--color-success", bg: "--color-canvas", min: 4.5, why: "success text" },
  { fg: "--color-warning", bg: "--color-canvas", min: 4.5, why: "warning text" },
];

const THEMES: Array<[string, Record<string, string>]> = [
  ["dark", base],
  ["light", light],
];

let failures = 0;
let skipped = 0;

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
    if (!pass) failures++;
    console.log(
      `    ${pass ? "ok " : "FAIL"} ${ratio.toFixed(2).padStart(5)}:1  (needs ${min})  ` +
        `${fg.replace("--color-", "")} on ${bg.replace("--color-", "")}` +
        (pass ? "" : `  <- ${why}`),
    );
  }
}

const total = CHECKS.length * THEMES.length - skipped;
console.log(`\n  ${total} pairings checked, ${failures} failing, ${skipped} skipped.\n`);

if (failures > 0) process.exit(1);
