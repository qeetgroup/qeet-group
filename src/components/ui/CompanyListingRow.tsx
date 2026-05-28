import NextLink from "next/link";
import { Link } from "./Link";
import { MetaPair } from "./MetaPair";
import { cn } from "@/lib/utils";

type CompanyListingRowProps = {
  name: string;
  description: string;
  sector: string;
  stage: string;
  founded: string;
  externalUrl: string;
  internalHref: string;
  /** Skip the top border on the first row in a stack. */
  isFirst?: boolean;
};

/**
 * Richer subsidiary row for /companies. Not a single clickable surface — has
 * two explicit links (external "Visit" and internal "Read more"), so the row
 * is a plain article rather than a wrapped anchor.
 */
export function CompanyListingRow({
  name,
  description,
  sector,
  stage,
  founded,
  externalUrl,
  internalHref,
  isFirst,
}: CompanyListingRowProps) {
  const externalLabel = externalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-20 lg:py-24",
        !isFirst && "border-t border-rule",
      )}
    >
      <div className="md:col-span-8">
        <NextLink href={internalHref} className="group/name inline-block">
          <h2 className="font-serif font-normal tracking-[-0.015em] text-ink text-[2.5rem] leading-[1.04] md:text-[3.5rem] md:leading-[1.03] lg:text-[4.5rem] lg:leading-[1.02]">
            {name}
          </h2>
        </NextLink>
        <p className="mt-6 max-w-[36rem] text-body-l text-ink-muted md:mt-8">{description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
          <Link href={externalUrl} className="text-body text-ink">
            Visit {externalLabel}
          </Link>
          <Link href={internalHref} variant="arrow" className="text-body text-ink-muted">
            Read more
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-1 md:gap-7 md:pt-3 lg:pt-5">
        <MetaPair label="Sector" value={sector} />
        <MetaPair label="Stage" value={stage} />
        <MetaPair label="Founded" value={founded} />
      </div>
    </article>
  );
}
