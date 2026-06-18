/**
 * Plausible custom events helper. The Plausible script exposes
 * `window.plausible(name, opts)` once loaded; if it isn't loaded (script
 * blocked, dev mode without NEXT_PUBLIC_PLAUSIBLE_DOMAIN), calls are silent.
 */

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
  }
}

export function track(event: string, props?: PlausibleOptions["props"]): void {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}

/**
 * Common event names. Centralised so dashboards have stable identifiers.
 */
export const Events = {
  ContactSubmit: "Contact: Submit",
  NewsletterSubscribe: "Newsletter: Subscribe",
  EmailClick: "Email: Click",
  ExternalProductClick: "Product: External Click",
  PostOpen: "Post: Open",
  PressAssetDownload: "Press: Asset Download",
} as const;
