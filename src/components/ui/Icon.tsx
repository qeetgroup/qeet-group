import type { ComponentType } from "react";
import type { QeetrixIcon, QeetrixIconProps } from "@qeetrix/icons";
import { cn } from "@/lib/utils";

/** Re-exported so icon maps can be typed without importing from two places. */
export type { QeetrixIcon };

type IconOwnProps = {
  /** CSS length. Defaults to 1em so the icon tracks the type beside it. */
  size?: string | number;
  className?: string;
  /**
   * Icons are decorative by default. Pass a label only when the icon is the
   * sole carrier of meaning — otherwise it is noise for screen readers.
   */
  label?: string;
};

/**
 * Wrapper for `@qeetrix/icons`.
 *
 * The library draws every glyph in `currentColor`, but each generated `<svg>`
 * also carries `color="white"` as its default — so an icon dropped in without
 * props renders white regardless of surrounding text, and vanishes on our light
 * canvas. Passing `color="currentColor"` restores normal inheritance, which is
 * what lets our semantic tokens drive it. Routing icons through here means no
 * call site has to remember that.
 *
 * Generic over the icon's own props, per the library's guidance: each component
 * narrows `variant`/`shape` to the artwork it actually ships, so a single
 * non-generic component type cannot accept them (props are contravariant).
 * This keeps `variant="solid"` type-checked against the specific icon.
 */
export function Icon<P extends QeetrixIconProps>({
  icon: Glyph,
  size = "1em",
  className,
  label,
  ...rest
}: { icon: ComponentType<P> } & IconOwnProps &
  Omit<P, "className" | "width" | "height" | "color" | "aria-hidden">) {
  const glyphProps = {
    ...rest,
    color: "currentColor",
    width: size,
    height: size,
    className: cn("inline-block shrink-0", className),
    "aria-hidden": label ? undefined : true,
    role: label ? "img" : undefined,
    "aria-label": label,
    focusable: "false",
  } as unknown as P;

  return <Glyph {...glyphProps} />;
}
