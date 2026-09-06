import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Anchor } from "./Anchor";
import { cn } from "@/lib/utils";

/*
 * All six states are designed here rather than left to the browser: default,
 * hover, focus-visible, active, disabled and loading. That completeness is
 * most of what separates a premium control from a competent one — the previous
 * version had only the first three.
 *
 * `active:` gives a real press response, the disabled styles remove the
 * affordance rather than just dimming it, and loading keeps the button's width
 * stable so a form does not reflow mid-submit.
 */
const button = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-full",
    "font-ui font-medium tracking-tight whitespace-nowrap",
    "transition-[transform,box-shadow,background-color,border-color,opacity] duration-fast",
    "focus-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        solid:
          "bg-ink text-canvas hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 active:bg-ink/80",
        // White label on a brand-700 fill — see --color-accent-solid in
        // globals.css for why this is not the same fill as `bg-accent`.
        accent:
          "bg-accent-solid text-accent-solid-contrast hover:bg-accent-solid-hover hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
        outline:
          "border border-rule-interactive text-ink hover:border-accent-hover hover:bg-accent-soft active:bg-accent-soft/70",
        ghost: "text-ink hover:bg-accent-soft active:bg-accent-soft/70",
      },
      size: {
        sm: "h-9 px-4 text-body-s",
        md: "h-10 px-5 text-body-s",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof button>;

type CommonProps = ButtonVariants & {
  children: ReactNode;
  className?: string;
  /** Rendered beside the label. Use ui/Icon. */
  icon?: ReactNode;
  iconPosition?: "start" | "end";
};

type ButtonAsButton = CommonProps & {
  href?: never;
  /** Swaps the label for a spinner and blocks interaction, width unchanged. */
  loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonAsLink = CommonProps & {
  href: string;
  loading?: never;
  /** Anchors cannot be disabled; use this if a link must read as inert. */
  "aria-disabled"?: boolean;
};

function Spinner() {
  return (
    <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/25 border-t-current motion-reduce:animate-none" />
    </span>
  );
}

/**
 * Label plus optional icon. While loading the label stays in flow but hidden,
 * so the control keeps its width and the layout does not jump.
 */
function Content({
  children,
  icon,
  iconPosition,
  loading,
}: Pick<CommonProps, "children" | "icon" | "iconPosition"> & { loading: boolean }) {
  return (
    <>
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {icon && iconPosition === "start" ? icon : null}
        {children}
        {icon && iconPosition === "end" ? icon : null}
      </span>
      {loading ? <Spinner /> : null}
    </>
  );
}

/*
 * Split into two components so each destructures its own props in its
 * signature. The previous single-function version had to strip seven custom
 * props out of a shared rest object and then `void` each one to satisfy the
 * linter — noise that hid what the component actually did.
 */
function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  icon,
  iconPosition = "start",
  ...rest
}: ButtonAsLink) {
  return (
    <Anchor href={href} className={cn(button({ variant, size }), className)} {...rest}>
      <Content icon={icon} iconPosition={iconPosition} loading={false}>
        {children}
      </Content>
    </Anchor>
  );
}

function ButtonControl({
  children,
  className,
  variant,
  size,
  icon,
  iconPosition = "start",
  loading = false,
  disabled,
  type = "button",
  ...rest
}: ButtonAsButton) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(button({ variant, size }), loading && "cursor-progress", className)}
      {...rest}
    >
      <Content icon={icon} iconPosition={iconPosition} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  return "href" in props && props.href ? (
    <ButtonLink {...props} />
  ) : (
    <ButtonControl {...(props as ButtonAsButton)} />
  );
}
