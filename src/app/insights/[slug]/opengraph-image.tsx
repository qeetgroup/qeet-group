import { loadInsight } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ogTemplate, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-template";

export const alt = "Qeet Group insights";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadInsight(slug);

  const topic = post?.data.topic ?? "Insights";
  const dateLabel = post ? formatDate(post.data.date) : "";

  return ogTemplate({
    eyebrow: dateLabel ? `${topic} · ${dateLabel}` : topic,
    headline: post?.data.title ?? "Qeet Group insights",
    footer: "qeet.in/insights",
  });
}
