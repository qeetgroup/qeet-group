import NextLink from "next/link";
import { Container } from "./Container";
import { Eyebrow } from "../ui/Eyebrow";
import { NewsletterForm } from "../forms/NewsletterForm";
import { SocialIcons } from "../ui/SocialIcons";
import { isExternalHref } from "@/lib/utils";

type FooterLink = { href: string; label: string };
type FooterColumn = { heading: string; items: FooterLink[] };

const columns: FooterColumn[] = [
  {
    heading: "Group",
    items: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/now", label: "Now" },
      { href: "/companies", label: "Companies" },
      { href: "/newsroom", label: "Newsroom" },
      { href: "/memos", label: "Memos" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Companies",
    items: [{ href: "/companies/qeetid", label: "Qeet ID" }],
  },
  {
    heading: "Contact",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "mailto:partnerships@qeet.in", label: "Partnerships" },
      { href: "/press", label: "Press kit" },
      { href: "mailto:support@qeet.in", label: "General" },
    ],
  },
];

function FooterLinkRow({ href, label }: FooterLink) {
  const isExternal = isExternalHref(href);
  const cls = "text-body-s text-ink-muted transition-colors duration-200 hover:text-ink";
  return (
    <li>
      {isExternal ? (
        <a href={href} className={cls}>
          {label}
        </a>
      ) : (
        <NextLink href={href} className={cls}>
          {label}
        </NextLink>
      )}
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule bg-canvas">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-20">
          <div className="md:col-span-5">
            <NextLink
              href="/"
              aria-label="Qeet Group home"
              className="font-serif text-[2.25rem] leading-none text-ink"
            >
              Qeet ID
            </NextLink>
            <p className="mt-5 max-w-sm text-body-s text-ink-muted">
              A multi-company holding built on a single philosophy: that meaningful progress
              begins with the right question.
            </p>
            <div className="mt-8">
              <Eyebrow className="mb-3">Stay in touch</Eyebrow>
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-7 md:gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <Eyebrow className="mb-5">{col.heading}</Eyebrow>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <FooterLinkRow key={item.href} {...item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-rule py-6 md:flex-row md:items-center md:justify-between">
          <Eyebrow>Follow</Eyebrow>
          <SocialIcons />
        </div>
        <div className="flex flex-col gap-4 border-t border-rule py-8 text-body-s text-ink-subtle md:flex-row md:items-center md:justify-between">
          <p>© {year} Qeet Group. All rights reserved.</p>
          <div className="flex gap-6">
            <NextLink href="/legal/privacy" className="transition-colors duration-200 hover:text-ink">
              Privacy
            </NextLink>
            <NextLink href="/legal/terms" className="transition-colors duration-200 hover:text-ink">
              Terms
            </NextLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
