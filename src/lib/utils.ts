type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) v.forEach(walk);
  };
  inputs.forEach(walk);
  return out.join(" ");
}

const EXTERNAL_HREF_RE = /^(https?:|mailto:|tel:)/;

/**
 * True for any href Next.js shouldn't treat as an internal route — http(s)
 * URLs, mailto:, and tel:. Centralised so link primitives (Link, Button,
 * MDXLink, FooterLinkRow) stay in sync.
 */
export function isExternalHref(href: string): boolean {
  return EXTERNAL_HREF_RE.test(href);
}
