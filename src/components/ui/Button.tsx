import NextLink from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const variantMap: Record<Variant, string> = {
  solid: "bg-ink text-ink-inverse hover:bg-ink/90",
  outline: "border border-rule-strong text-ink hover:bg-ink/5",
  ghost: "text-ink hover:bg-ink/5",
};

const sizeMap: Record<Size, string> = {
  md: "h-10 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonAsLink = CommonProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", className, children } = props;
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    variantMap[variant],
    sizeMap[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href } = props;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <NextLink href={href} className={cls}>
        {children}
      </NextLink>
    );
  }

  const { href: _omit, ...buttonRest } = props as ButtonAsButton & { href?: undefined };
  void _omit;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
