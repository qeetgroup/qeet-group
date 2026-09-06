import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  Calendar,
  Component,
  FingerScan,
  Folder,
  MagicStar,
  Messages,
  Notification,
  Paper,
  People,
  Personalcard,
  Sms,
  TaskSquare,
  Video,
  Wallet,
} from "@qeetrix/icons";

/**
 * ============================================================================
 * Product icons — one glyph per product, from @qeetrix/icons
 * ============================================================================
 *
 * The ecosystem map used to draw fifteen identical dots. A dot can encode
 * status (through its stroke) and position (through the ring), but it cannot
 * encode IDENTITY — so reading the figure meant reading fifteen small text
 * labels one at a time, and the ring never resolved into a portfolio you could
 * take in at a glance. An icon per product is what makes it scannable.
 *
 * ---------------------------------------------------------------------------
 * Why the group's own library rather than drawn marks
 * ---------------------------------------------------------------------------
 * These are NOT product logos, and inventing fifteen logos for products that
 * mostly do not exist yet would be exactly the kind of fabrication the rest of
 * this site refuses. They are category glyphs from `@qeetrix/icons` — the same
 * library the product UIs are built from — so the corporate site and the
 * products draw their iconography from one source, and a planned product is
 * labelled by what it WILL be for rather than dressed up with a brand it has
 * not earned.
 *
 * Each choice is the library's own semantic category, not a lookalike:
 * `security/finger-scan` for the passkeys-first identity layer,
 * `design/component` for the design foundation, `data/activity` for
 * observability, `finance/wallet` for payments. Where two products could take
 * the same glyph, the more specific one wins — Qeet ID takes the security
 * mark, so Contacts takes `people/personalcard` rather than a second face.
 *
 * ---------------------------------------------------------------------------
 * This map is EXHAUSTIVE, unlike the product-visual registry
 * ---------------------------------------------------------------------------
 * `components/product-ui/registry` deliberately covers only six products,
 * because drawing an interface for unbuilt software invents a screen. An icon
 * carries no such claim: it says what a product is for, which is knowable the
 * day the product is named. So every product gets one, and
 * product-icons.test.ts fails if a new product arrives without a glyph — the
 * opposite assertion to the visual registry's, for the opposite reason.
 */

/**
 * The subset of an icon's props this site uses.
 *
 * Deliberately narrower than `QeetrixIconProps`. Each generated icon narrows
 * `shape` to the artwork it actually ships, so a map annotated with the full
 * props type rejects its own members — props are contravariant, and a
 * component accepting only `shape="round"` is not assignable to one that
 * claims to accept `"sharp"` as well. Typing the map by what the CALLER passes
 * sidesteps that without casting.
 */
export type ProductGlyph = ComponentType<SVGProps<SVGSVGElement>>;

export const PRODUCT_ICON = {
  /* The two foundations everything else depends on. */
  "qeet-id": FingerScan,
  qeetrix: Component,

  /* Operations. */
  "qeet-logs": Activity,
  "qeet-notify": Notification,

  /* Business. */
  "qeet-pay": Wallet,
  "qeet-people": People,

  /* Intelligence and media. */
  "qeet-ai": MagicStar,
  "qeet-news": Paper,

  /* Productivity suite. */
  "qeet-mail": Sms,
  "qeet-calendar": Calendar,
  "qeet-contacts": Personalcard,
  "qeet-tasks": TaskSquare,
  "qeet-drive": Folder,
  "qeet-chat": Messages,
  "qeet-meet": Video,
} satisfies Record<string, ProductGlyph>;

export type ProductIconSlug = keyof typeof PRODUCT_ICON;

/**
 * Resolves a product's glyph.
 *
 * Returns `undefined` rather than throwing for an unknown slug: a missing icon
 * should cost the figure one mark, not take the homepage down. The test is
 * what makes that safety net unnecessary in practice.
 */
export function productIcon(slug: string): ProductGlyph | undefined {
  return (PRODUCT_ICON as Record<string, ProductGlyph>)[slug];
}
