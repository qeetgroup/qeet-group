import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * ============================================================================
 * Fonts for OG cards
 * ============================================================================
 *
 * Qeet UI, read off disk. Two weights, because the card has a hierarchy and
 * one weight flattens it.
 *
 * ---------------------------------------------------------------------------
 * Why there are .ttf files here when the site ships .woff2
 * ---------------------------------------------------------------------------
 * Satori — what renders these cards — reads TTF, OTF and WOFF, and does NOT
 * read WOFF2. Qeetrix ships WOFF2 only, which is correct for a browser and
 * unusable here, so the two weights the card needs are decompressed to TTF at build
 * time and committed alongside this module. Same outlines, same face; only the
 * container differs.
 *
 * This also removes the network entirely. The previous version fetched a font
 * from Google Fonts on every cold build — which is how it came to be broken
 * for so long without anyone noticing: it sent a User-Agent that made Google
 * return TTF, then matched a regex that only accepted WOFF2, so the fetch
 * silently returned null and every card the site ever produced was rendered in
 * Satori's fallback font. A local read cannot fail that quietly.
 */

export type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 600 };

const FAMILY = "Qeet UI";

// 600, not 700 — the same weight the site sets its headlines at, so a social
// card and the page it links to are visibly the same typography.
const FILES: Array<{ file: string; weight: 400 | 600 }> = [
  { file: "QeetUI-Regular.ttf", weight: 400 },
  { file: "QeetUI-SemiBold.ttf", weight: 600 },
];

let cached: OgFont[] | null = null;

export async function loadOgFonts(): Promise<OgFont[]> {
  if (cached) return cached;
  try {
    cached = await Promise.all(
      FILES.map(async ({ file, weight }) => {
        const buf = await readFile(join(process.cwd(), "src", "lib", "seo", "og-fonts", file));
        // Node Buffer -> ArrayBuffer, sliced to the exact bytes: a Buffer can
        // be a view into a larger pooled allocation, and handing Satori the
        // whole pool produces a parse error rather than a font.
        const data = buf.buffer.slice(
          buf.byteOffset,
          buf.byteOffset + buf.byteLength,
        ) as ArrayBuffer;
        return { name: FAMILY, data, weight };
      }),
    );
  } catch {
    // Falls back to Satori's default rather than failing a build over a social
    // preview — but unlike the network version, this only happens if the files
    // are genuinely missing from the repository.
    cached = [];
  }
  return cached;
}
