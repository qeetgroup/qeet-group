import type { ComponentPropsWithoutRef } from "react";
import { Anchor } from "../ui/Anchor";

/**
 * Styled element map for MDX content. Headings use the editorial serif; body
 * matches the rest of the site at body-size ink-muted; links get the same
 * underline treatment as the Link primitive. Keeps MDX output visually
 * indistinguishable from hand-authored sections.
 */

function MdxLink({ href = "#", children, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <Anchor
      href={href}
      className="rounded-sm text-ink underline decoration-current/30 decoration-[1px] underline-offset-[5px] transition-[text-decoration-color] hover:decoration-accent focus-ring"
      {...props}
    >
      {children}
    </Anchor>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 mb-6 font-display font-normal text-balance text-ink text-heading-xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 mb-4 font-sans font-medium text-heading-s text-ink"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 text-body text-ink-muted" {...props} />
  ),
  a: MdxLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 list-disc list-outside space-y-2 pl-5 text-body text-ink-muted marker:text-ink-subtle"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-5 list-decimal list-outside space-y-2 pl-5 text-body text-ink-muted marker:text-ink-subtle"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-display italic" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-rule-strong pl-6 font-display italic text-balance text-heading-m text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-0 border-t border-rule" />,

  /*
   * The mappings below were missing entirely, so these elements rendered with
   * no styling at all. Inline `code` is the one that mattered immediately —
   * the published content uses it 17 times.
   *
   * `pre` is deliberately plain: no content currently ships a fenced code
   * block, so pulling in a syntax highlighter now would be weight for nothing.
   * It gets one when product pages actually carry code samples.
   */
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mt-0 mb-8 font-display font-normal text-balance text-ink text-display-m"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-8 mb-3 font-sans font-medium text-body-l text-ink" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-sm border border-rule bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-8 overflow-x-auto rounded-lg border border-rule bg-surface-sunken p-5 font-mono text-body-s text-ink [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-body-s" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-rule-strong" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="py-3 pr-6 font-sans text-label font-medium uppercase text-ink-subtle"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-t border-rule py-3 pr-6 align-top text-ink-muted" {...props} />
  ),
};
