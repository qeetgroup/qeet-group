import { ImageResponse } from "next/og";
import { loadProduct } from "@/lib/content";
import { loadSerifFont } from "@/lib/og-fonts";

export const alt = "Qeet Group product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  const serif = await loadSerifFont();

  const name = product?.data.name ?? "Qeet Group";
  const tagline = product?.data.tagline ?? "";
  const sector = product?.data.sector ?? "";

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
            gap: 28,
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
            {sector ? `A Qeet Group product · ${sector}` : "A Qeet Group product"}
          </div>
          <div
            style={{
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
          {tagline && (
            <div
              style={{
                fontSize: 40,
                color: "#4A4A4A",
                letterSpacing: "-0.01em",
                maxWidth: "85%",
              }}
            >
              {tagline}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 22 }}>qeet.in/products/{slug}</div>
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
