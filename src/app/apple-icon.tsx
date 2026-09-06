import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/seo/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The home-screen icon. A single letter on the canvas colour — at 180px on a
 * cluttered springboard, the mark has to survive being 1cm wide, and anything
 * more than one glyph does not.
 */
export default async function AppleIcon() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Mirrors --color-canvas / --color-ink; Satori cannot read tokens.
          background: "#0a0a0a",
          color: "#fcfcfc",
          fontFamily: fonts.length > 0 ? "Qeet UI" : "sans-serif",
          fontSize: 118,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        Q
      </div>
    ),
    {
      ...size,
      fonts: fonts.map((f) => ({
        name: f.name,
        data: f.data,
        style: "normal" as const,
        weight: f.weight,
      })),
    },
  );
}
