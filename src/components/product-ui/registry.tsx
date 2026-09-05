import type { ComponentType } from "react";
import { QeetIdMock } from "./QeetIdMock";
import { QeetrixMock } from "./QeetrixMock";
import { QeetLogsMock } from "./QeetLogsMock";
import { QeetPeopleMock } from "./QeetPeopleMock";
import { QeetNotifyMock } from "./QeetNotifyMock";
import { QeetPayMock } from "./QeetPayMock";

/**
 * Maps a product's content slug to its stylised product visual.
 *
 * These are deliberately NOT "fake dashboards" in the sense the brief rules
 * out — there are no invented metrics, no fabricated customer names and no
 * charts implying data that does not exist. They are abstracted renderings of
 * a product's actual primary surface, drawn from semantic tokens, and marked
 * aria-hidden because they carry no information the surrounding copy does not.
 *
 * ---------------------------------------------------------------------------
 * Only six of fifteen products have one, and that is correct.
 * ---------------------------------------------------------------------------
 * A planned product has no interface to abstract, so drawing one would be
 * inventing a screen for software that does not exist — the exact failure the
 * lifecycle system exists to prevent, committed in pixels rather than words.
 * Products without a visual fall back to a Figure at the call site.
 *
 * The keys were previously plain strings, and `qeetid` silently stopped
 * matching when the flagship's slug became `qeet-id` — the page kept rendering
 * with no visual and nothing failed. `ProductVisualSlug` is checked against
 * the content collection by registry.test.ts so a stale key is a test failure
 * rather than a missing image nobody notices.
 */
export const PRODUCT_UI = {
  "qeet-id": QeetIdMock,
  qeetrix: QeetrixMock,
  "qeet-logs": QeetLogsMock,
  "qeet-people": QeetPeopleMock,
  "qeet-notify": QeetNotifyMock,
  "qeet-pay": QeetPayMock,
} satisfies Record<string, ComponentType>;

export type ProductVisualSlug = keyof typeof PRODUCT_UI;

/** Whether a product has a visual, without resolving the component itself. */
export function hasProductVisual(slug: string): boolean {
  return slug in PRODUCT_UI;
}

/**
 * Renders a product's visual, or nothing.
 *
 * The lookup happens INSIDE a module-scope component rather than at the call
 * site. Resolving a component type during another component's render creates a
 * new component identity on every pass, which resets its state — harmless for
 * these particular visuals, which are stateless, but the rule is worth keeping
 * because the next thing added here might not be.
 */
export function ProductVisual({ slug }: { slug: string }) {
  const Visual = (PRODUCT_UI as Record<string, ComponentType>)[slug];
  return Visual ? <Visual /> : null;
}
