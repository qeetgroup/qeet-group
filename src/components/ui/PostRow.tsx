import { Anchor } from "./Anchor";
import { DemoBadge } from "./DemoBadge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/*
 * One post row. This replaces two near-identical components that each carried
 * their own copy of formatDate and their own "Read →" affordance: a stacked
 * card version and a 12-column listing version. They are the same content
 * model at two densities, so density is a variant.
 *
 * The old listing variant took an `isFirst` prop purely to suppress its top
 * border. Dividers now belong to the list container (`divide-y divide-rule`),
 * which is where they always belonged — a row should not need to know its
 * position.
 */
export type PostRowLayout = "card" | "listing";

type PostRowProps = {
  /** ISO date string, e.g. "2026-05-22". */
  date: string;
  title: string;
  dek: string;
  href: string;
  category?: string;
  /** Minutes. Shown in the listing layout only. */
  readingTime?: number;
  layout?: PostRowLayout;
  /**
   * Marks the row as demonstration content. Shown on the LISTING as well as on
   * the article, because a reader scanning an index forms an impression before
   * they ever open the piece — labelling only the destination is too late.
   */
  demo?: boolean;
  className?: string;
};

function Meta({
  date,
  category,
  readingTime,
  demo,
}: Pick<PostRowProps, "date" | "category" | "readingTime" | "demo">) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-label uppercase text-ink-subtle">
      <time dateTime={date}>{formatDate(date)}</time>
      {category ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{category}</span>
        </>
      ) : null}
      {readingTime ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{readingTime} min read</span>
        </>
      ) : null}
      {demo && <DemoBadge />}
    </p>
  );
}

function ReadMore({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 font-sans text-body-s text-ink",
        className,
      )}
    >
      <span>Read</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-base group-hover/post:translate-x-1"
      >
        →
      </span>
    </span>
  );
}

export function PostRow({
  date,
  title,
  dek,
  href,
  category,
  readingTime,
  layout = "card",
  demo,
  className,
}: PostRowProps) {
  if (layout === "listing") {
    return (
      <article className={cn("py-10 md:py-12 lg:py-14", className)}>
        <Anchor
          href={href}
          className="group/post grid grid-cols-1 gap-4 rounded-sm focus-ring md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-3">
            <Meta date={date} category={category} readingTime={readingTime} demo={demo} />
          </div>
          <div className="md:col-span-9">
            <h2 className="text-balance font-display text-ink text-heading-xl">
              {title}
            </h2>
            <p className="mt-3 max-w-prose text-body text-ink-muted md:mt-4">{dek}</p>
            <ReadMore className="mt-5 md:mt-6" />
          </div>
        </Anchor>
      </article>
    );
  }

  return (
    <Anchor href={href} className={cn("group/post block rounded-sm focus-ring", className)}>
      <article className="flex flex-col gap-3">
        <Meta date={date} category={category} demo={demo} />
        <h3 className="text-balance font-display text-ink text-heading-l">
          {title}
        </h3>
        <p className="text-body-s text-ink-muted">{dek}</p>
        <ReadMore className="mt-2" />
      </article>
    </Anchor>
  );
}
