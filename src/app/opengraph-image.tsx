import { ImageResponse } from "next/og";
import { loadSerifFont } from "@/lib/seo/og-fonts";

export const alt = "Qeet Group — Question, Explore, Envision, Transform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#6E6E6E",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Qeet Group · Est. 2026
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              maxWidth: "92%",
            }}
          >
            We question, we explore, we envision, we transform.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#0A0A0A",
          }}
        >
          qeet.in
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }]
        : undefined,
    },
  );
}
