import { SOCIAL_PLATFORMS } from "@/lib/social";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";

const sizeMap: Record<Size, { box: string; svg: string }> = {
  sm: { box: "h-9 w-9", svg: "h-[18px] w-[18px]" },
  md: { box: "h-10 w-10", svg: "h-5 w-5" },
};

/**
 * Renders the centrally-configured social platforms as a row of icon-only
 * links. Each link opens in a new tab and carries a real aria-label since
 * there is no visible text.
 */
export function SocialIcons({
  className,
  size = "sm",
}: {
  className?: string;
  size?: Size;
}) {
  const sz = sizeMap[size];
  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {SOCIAL_PLATFORMS.map((p) => {
        const Icon = p.icon;
        return (
          <li key={p.name}>
            <a
              href={p.url}
              aria-label={p.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center text-ink-muted hover:text-ink",
                "transition-colors duration-200 rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                sz.box,
              )}
            >
              <Icon className={sz.svg} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
