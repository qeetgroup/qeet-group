import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogTemplate,
} from "@/lib/og-template";

export const alt = "About Qeet Group — A holding company for ideas that compound.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogTemplate({
    eyebrow: "About · Qeet Group",
    headline: "A holding company for ideas that compound.",
  });
}
