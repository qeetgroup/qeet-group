import NextLink from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const variantMap: Record<Variant, string> = {
  solid: "bg-ink text-canvas hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-glow",
  outline: "border border-rule-strong text-ink hover:border-brand/50 hover:bg-brand-soft",
  ghost: "text-ink hover:bg-brand-soft",
};

const sizeMap: Record<Size, string> = {
  md: "h-10 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Wrap in a cursor-following magnetic shell (mouse-only, reduced-motion safe). */
  magnetic?: boolean;
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
  const { variant = "solid", size = "md", className, magnetic = false, children } = props;
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "transition-[transform,box-shadow,background-color,border-color] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    variantMap[variant],
    sizeMap[size],
    className,
  );

  const wrap = (el: ReactNode) => (magnetic ? <Magnetic>{el}</Magnetic> : el);

  if ("href" in props && props.href !== undefined) {
    const { href } = props;
    const isExternal = isExternalHref(href);
    if (isExternal) {
      return wrap(
        <a
          href={href}
          className={cls}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>,
      );
    }
    return wrap(
      <NextLink href={href} className={cls}>
        {children}
      </NextLink>,
    );
  }

  // Strip the custom props so only real button attributes reach the DOM.
  const {
    variant: _v,
    size: _s,
    className: _c,
    magnetic: _m,
    children: _ch,
    href: _omit,
    ...buttonRest
  } = props as ButtonAsButton & { href?: undefined };
  void _v;
  void _s;
  void _c;
  void _m;
  void _ch;
  void _omit;
  return wrap(
    <button className={cls} {...buttonRest}>
      {children}
    </button>,
  );
}
