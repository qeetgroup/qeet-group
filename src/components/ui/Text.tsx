import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextSize = "body-l" | "body" | "body-s" | "caption";
export type TextTone = "default" | "muted" | "subtle" | "accent" | "inverse";
export type TextFace = "sans" | "ui" | "mono" | "display";

const sizeMap: Record<TextSize, string> = {
  "body-l": "text-body-l",
  body: "text-body",
  "body-s": "text-body-s",
  caption: "text-caption",
};

/*
 * `accent` resolves to --color-accent-text, not --color-accent. The raw brand
 * colour is 2.94:1 on the light canvas — it fails AA even at large sizes — so
 * accent-coloured TEXT always goes through the contrast-safe token.
 */
const toneMap: Record<TextTone, string> = {
  default: "text-ink",
  muted: "text-ink-muted",
  subtle: "text-ink-subtle",
  accent: "text-accent-text",
  inverse: "text-ink-inverse",
};

const faceMap: Record<TextFace, string> = {
  sans: "font-sans",
  ui: "font-ui",
  mono: "font-mono",
  display: "font-display",
};

type TextProps = {
  size?: TextSize;
  tone?: TextTone;
  face?: TextFace;
  /** Tabular figures — for metrics, tables and timestamps that must not jitter. */
  tabular?: boolean;
  className?: string;
  children: ReactNode;
  as?: ElementType;
} & Omit<ComponentPropsWithoutRef<"p">, "className" | "children">;

export function Text({
  size = "body",
  tone = "muted",
  face = "sans",
  tabular = false,
  className,
  children,
  as,
  ...rest
}: TextProps) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      className={cn(
        faceMap[face],
        sizeMap[size],
        toneMap[tone],
        tabular && "tabular-figures",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
