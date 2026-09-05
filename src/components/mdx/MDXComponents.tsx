import type { ComponentPropsWithoutRef } from "react";
import NextLink from "next/link";
import { isExternalHref } from "@/lib/utils";

/**
 * Styled element map for MDX content. Headings use the editorial serif; body
 * matches the rest of the site at body-size ink-muted; links get the same
 * underline treatment as the Link primitive. Keeps MDX output visually
 * indistinguishable from hand-authored sections.
 */

function MdxLink({ href = "#", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = isExternalHref(href);
  const cls =
    "text-ink underline underline-offset-[5px] decoration-[1px] decoration-current/30 transition-[text-decoration-color] hover:decoration-accent focus-ring rounded-sm";
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cls}>
      {children}
    </NextLink>
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
      className="mt-10 mb-4 font-sans font-medium text-[1.125rem] leading-[1.5] text-ink"
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
};
