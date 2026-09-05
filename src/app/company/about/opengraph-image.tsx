import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogTemplate,
} from "@/lib/seo/og-template";

export const alt = "About Qeet Group — one organisation, not a collection of ventures.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogTemplate({
    eyebrow: "About · Qeet Group",
    headline: "One organisation, not a collection of ventures.",
  });
}
