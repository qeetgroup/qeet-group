import NextLink from "next/link";

type PostRowProps = {
  /** ISO date string, e.g. "2026-05-22". */
  date: string;
  category?: string;
  title: string;
  dek: string;
  href: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostRow({ date, category, title, dek, href }: PostRowProps) {
  return (
    <NextLink
      href={href}
      className="group/post block focus-ring"
    >
      <article className="flex flex-col gap-3">
        <div className="flex items-center gap-3 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
          <time dateTime={date}>{formatDate(date)}</time>
          {category && (
            <>
              <span aria-hidden="true">·</span>
              <span>{category}</span>
            </>
          )}
        </div>
        <h3 className="text-balance font-display font-normal text-ink text-heading-l">
          {title}
        </h3>
        <p className="text-body-s text-ink-muted">{dek}</p>
        <div className="mt-2">
          <span className="inline-flex items-baseline gap-1.5 font-sans text-body-s text-ink">
            <span>Read</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover/post:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </article>
    </NextLink>
  );
}
