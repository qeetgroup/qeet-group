import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { loadLegal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadLegal("terms");
  if (!doc) return {};
  return {
    title: doc.data.title,
    description: doc.data.description,
    alternates: { canonical: "/legal/terms" },
  };
}

export default async function TermsPage() {
  const doc = await loadLegal("terms");
  if (!doc) notFound();
  return <LegalArticle doc={doc} />;
}
