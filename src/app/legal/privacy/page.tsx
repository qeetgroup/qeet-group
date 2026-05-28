import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { loadLegal } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadLegal("privacy");
  if (!doc) return {};
  return { title: doc.data.title, description: doc.data.description };
}

export default async function PrivacyPage() {
  const doc = await loadLegal("privacy");
  if (!doc) notFound();
  return <LegalArticle doc={doc} />;
}
