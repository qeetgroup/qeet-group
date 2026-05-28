import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

type PhilosophyBlockProps = {
  letter: "Q" | "E" | "T";
  word: string;
  headline: string;
  body: string;
  /** Skip the top border on the first block of a stack. */
  isFirst?: boolean;
};

export function PhilosophyBlock({
  letter,
  word,
  headline,
  body,
  isFirst,
}: PhilosophyBlockProps) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 gap-6 py-14 md:grid-cols-12 md:items-end md:gap-8 md:py-20 lg:py-24",
        !isFirst && "border-t border-rule",
      )}
    >
      <div className="md:col-span-5 lg:col-span-4">
        <span
          aria-hidden="true"
          className="block font-serif font-normal text-ink leading-[0.82] text-[7rem] md:text-[13rem] lg:text-[17rem]"
        >
          {letter}
        </span>
      </div>
      <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 pb-1 md:pb-3 lg:pb-6">
        <Eyebrow className="mb-4 md:mb-5">{word}</Eyebrow>
        <h3 className="mb-5 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.15] md:mb-6 md:text-[2rem] md:leading-[1.18] lg:text-[2.25rem] lg:leading-[1.2]">
          {headline}
        </h3>
        <p className="max-w-[34rem] text-body text-ink-muted">{body}</p>
      </div>
    </article>
  );
}
