import NextLink from "next/link";
import { cn } from "@/lib/utils";

type PostListingRowProps = {
  date: string;
  category: string;
  title: string;
  dek: string;
  href: string;
  isFirst?: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostListingRow({
  date,
  category,
  title,
  dek,
  href,
  isFirst,
}: PostListingRowProps) {
  return (
    <article
      className={cn(
        "py-10 md:py-12 lg:py-14",
        !isFirst && "border-t border-rule",
      )}
    >
      <NextLink
        href={href}
        className="group/post grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas rounded-sm"
      >
        <div className="md:col-span-3 lg:col-span-3">
          <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
            <time dateTime={date}>{formatDate(date)}</time>
            <span aria-hidden="true"> · </span>
            <span>{category}</span>
          </p>
        </div>
        <div className="md:col-span-9 lg:col-span-9">
          <h2 className="text-balance font-serif font-normal tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.18] md:text-[2.25rem] md:leading-[1.16] lg:text-[2.5rem] lg:leading-[1.14]">
            {title}
          </h2>
          <p className="mt-3 max-w-[40rem] text-body text-ink-muted md:mt-4">{dek}</p>
          <span className="mt-5 inline-flex items-baseline gap-1.5 font-sans text-body-s text-ink md:mt-6">
            <span>Read</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover/post:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </NextLink>
    </article>
  );
}
