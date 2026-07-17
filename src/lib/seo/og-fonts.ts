/**
 * Fetches Instrument Serif from Google Fonts so OG images render in the brand
 * face instead of Satori's default sans. Cached per build so each OG route
 * doesn't re-fetch. Returns null on any failure — callers should fall back to
 * Satori's default font rather than erroring the build.
 */
let cached: ArrayBuffer | null = null;
let attempted = false;

export async function loadSerifFont(): Promise<ArrayBuffer | null> {
  if (cached) return cached;
  if (attempted) return null;
  attempted = true;

  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    cached = await fontRes.arrayBuffer();
    return cached;
  } catch {
    return null;
  }
}
