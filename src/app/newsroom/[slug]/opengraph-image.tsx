import { ImageResponse } from "next/og";
import { loadPost } from "@/lib/content";
import { loadSerifFont } from "@/lib/seo/og-fonts";

export const alt = "Qeet Group newsroom";
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
  const post = await loadPost(slug);
  const serif = await loadSerifFont();

  const title = post?.data.title ?? "Qeet Group Newsroom";
  const dateLabel = post ? formatDate(post.data.date) : "";
  const category = post?.data.category ?? "Newsroom";

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
            {dateLabel ? `${category} · ${dateLabel}` : category}
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

        <div style={{ display: "flex", fontSize: 22 }}>qeet.in/newsroom</div>
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
