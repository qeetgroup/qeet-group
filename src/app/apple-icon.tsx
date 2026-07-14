import { ImageResponse } from "next/og";
import { loadSerifFont } from "@/lib/seo/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const serif = await loadSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          color: "#FCFCFC",
          fontFamily: serif ? "Instrument Serif" : "serif",
          fontSize: 132,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          paddingBottom: 14,
        }}
      >
        Q
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
