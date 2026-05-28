import { ImageResponse } from "next/og";
import { loadMemo } from "@/lib/content";
import { loadSerifFont } from "@/lib/og-fonts";

export const alt = "Qeet Group memo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memo = await loadMemo(slug);
  const serif = await loadSerifFont();

  const title = memo?.data.title ?? "Qeet Group Memo";
  const dateLabel = memo ? formatDate(memo.data.date) : "";
  const readingTime = memo ? `${memo.readingTime} min read` : "";
  const eyebrow = [dateLabel, readingTime].filter(Boolean).join(" · ") || "Memo";

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
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            fontSize: 40,
            letterSpacing: "-0.01em",
          }}
        >
          <span>Qeet</span>
          <span
            style={{
              fontSize: 18,
              color: "#6E6E6E",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: serif ? "Instrument Serif" : "sans-serif",
            }}
          >
            Memo
          </span>
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
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22 }}>qeet.in/memos</div>
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
