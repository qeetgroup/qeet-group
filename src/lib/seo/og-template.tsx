import { ImageResponse } from "next/og";
import { loadOgFonts } from "./og-fonts";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Palette, inlined.
 *
 * Satori renders outside the DOM, so it cannot resolve a CSS custom property —
 * these are the only literal colours in the codebase, and they exist because
 * the alternative is no OG image at all. They mirror --color-canvas,
 * --color-ink, --color-ink-subtle, --color-rule and --color-accent in the DARK
 * theme — the card is always a dark surface, so it takes the dark theme's
 * values. If the token layer moves, these move with it.
 */
const CANVAS = "#101214";
const INK = "#F5F6F7";
const INK_SUBTLE = "#93999E";
const RULE = "#2C3136";
const ACCENT = "#E8FF47"; // mirrors --color-accent in the dark theme

/**
 * Shared 1200×630 OG card.
 *
 * Deliberately not a screenshot of the page and not a gradient. A social
 * preview is seen at thumbnail size in a crowded feed, so it is built like a
 * title card: dark field, one accent rule, one headline, the wordmark. At 25%
 * scale the rule and the headline are still legible, which is the only test
 * that matters.
 */
export async function ogTemplate({
  eyebrow,
  headline,
  sub,
  footer = "qeet.in",
}: {
  eyebrow: string;
  headline: string;
  /** Optional supporting line under the headline — a product's positioning. */
  sub?: string;
  /** Defaults to the bare domain; routes pass a deeper path where useful. */
  footer?: string;
}) {
  const fonts = await loadOgFonts();
  const family = fonts.length > 0 ? "Qeet UI" : "sans-serif";

  /*
   * Headline size steps down as the headline grows, so a two-word product name
   * and a twelve-word article title both fill the card instead of one looking
   * lost and the other wrapping to four lines. Cheaper and more predictable
   * than measuring text, which Satori cannot do at layout time anyway.
   */
  const fontSize = headline.length <= 14 ? 132 : headline.length <= 34 ? 96 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          color: INK,
          padding: "72px 88px",
          fontFamily: family,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Qeet Group</span>
          {/* The accent, at roughly the coverage the palette budgets for it. */}
          <span
            style={{
              display: "flex",
              width: 56,
              height: 6,
              background: ACCENT,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 400,
              color: INK_SUBTLE,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "94%",
            }}
          >
            {headline}
          </div>
          {sub && (
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: INK_SUBTLE,
                maxWidth: "82%",
              }}
            >
              {sub}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            paddingTop: 28,
            borderTop: `1px solid ${RULE}`,
            fontSize: 20,
            fontWeight: 400,
            color: INK_SUBTLE,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.map((f) => ({
        name: f.name,
        data: f.data,
        style: "normal" as const,
        weight: f.weight,
      })),
    },
  );
}
