import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { loadLegal } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/meta";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadLegal("terms");
  if (!doc) return {};
  return buildPageMetadata({
    title: doc.data.title,
    description: doc.data.description,
    path: "/legal/terms",
  });
}

export default async function TermsPage() {
  const doc = await loadLegal("terms");
  if (!doc) notFound();
  return <LegalArticle doc={doc} />;
}
