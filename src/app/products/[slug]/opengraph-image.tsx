import { loadProduct } from "@/lib/content";
import { ogTemplate, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-template";

export const alt = "Qeet Group product";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  const sector = product?.data.sector;

  return ogTemplate({
    eyebrow: sector ? `A Qeet Group product · ${sector}` : "A Qeet Group product",
    headline: product?.data.name ?? "Qeet Group",
    sub: product?.data.tagline,
    footer: `qeet.in/products/${slug}`,
  });
}
