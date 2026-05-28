import { cn } from "@/lib/utils";

type RuleProps = {
  className?: string;
  /** Use the higher-contrast rule color. */
  strong?: boolean;
};

export function Rule({ className, strong = false }: RuleProps) {
  return (
    <hr
      role="separator"
      className={cn(
        "w-full border-0 border-t",
        strong ? "border-rule-strong" : "border-rule",
        className,
      )}
    />
  );
}
