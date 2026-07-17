import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogTemplate,
} from "@/lib/seo/og-template";

export const alt = "Contact Qeet Group — Get in touch.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogTemplate({
    eyebrow: "Contact · Qeet Group",
    headline: "Get in touch.",
  });
}
