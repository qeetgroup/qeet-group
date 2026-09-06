import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge has to be taught this project's custom scale, or it does real
 * damage silently. Out of the box it treats every `text-*` class as a possible
 * font-size, so `cn("text-display-xl", "text-ink")` resolves to just
 * `text-ink` — the size is dropped and the heading collapses to body size.
 * Declaring our size names explicitly lets colour classes fall through to the
 * text-color group where they belong.
 *
 * The same applies to every custom @utility in globals.css: without these
 * groups, `py-section` and `py-4` would both survive, and the later one would
 * not win as authors expect.
 *
 * Anything added to globals.css that shares a Tailwind prefix belongs here too.
 * `src/lib/utils.test.ts` locks this behaviour down.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-l",
            "display-m",
            "heading-xl",
            "heading-l",
            "heading-m",
            "heading-s",
            "body-l",
            "body",
            "body-s",
            "caption",
            "label",
          ],
        },
      ],
      "max-w": [{ "max-w": ["prose", "narrow", "default", "wide"] }],
      py: [{ py: ["section", "section-tight"] }],
      z: [{ z: ["nav", "dropdown", "overlay", "modal", "toast"] }],
      duration: [{ duration: ["instant", "fast", "base", "slow", "slower"] }],
      ease: [{ ease: ["expo", "quart", "soft", "entrance", "out-expo"] }],
      shadow: [{ shadow: ["glow"] }],
    },
  },
});

/**
 * Merge class names, with later Tailwind utilities overriding earlier ones in
 * the same group. Use everywhere a component accepts a `className` prop, so
 * callers can actually override the component's defaults.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const EXTERNAL_HREF_RE = /^(https?:|mailto:|tel:)/;

/**
 * True for any href Next.js shouldn't treat as an internal route — http(s)
 * URLs, mailto:, and tel:. Centralised so every link primitive stays in sync.
 */
export function isExternalHref(href: string): boolean {
  return EXTERNAL_HREF_RE.test(href);
}
