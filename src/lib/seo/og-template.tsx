import { ImageResponse } from "next/og";
import { loadSerifFont } from "./og-fonts";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared 1200×630 OG card. Routes pass an eyebrow line + a serif headline;
 * the rest of the layout (footer brand, type rhythm) stays consistent so
 * social previews read as one body of work.
 */
export async function ogTemplate({
  eyebrow,
  headline,
}: {
  eyebrow: string;
  headline: string;
}) {
  const serif = await loadSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FCFCFC",
          color: "#0A0A0A",
          padding: "80px 96px",
          fontFamily: serif ? "Instrument Serif" : "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, letterSpacing: "-0.01em" }}>
          Qeet
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              color: "#6E6E6E",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.06,
              letterSpacing: "-0.015em",
              maxWidth: "92%",
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#0A0A0A" }}>
          qeet.in
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: serif
        ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
