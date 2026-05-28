import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogTemplate,
} from "@/lib/og-template";

export const alt = "Careers at Qeet Group — Work at Qeet.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogTemplate({
    eyebrow: "Careers · Qeet Group",
    headline: "Work at Qeet.",
  });
}
