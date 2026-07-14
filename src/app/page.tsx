import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProofBand } from "@/components/sections/ProofBand";
import { Philosophy } from "@/components/sections/Philosophy";
import { ProductsBento } from "@/components/sections/ProductsBento";
import { OperatingModel } from "@/components/sections/OperatingModel";
import { Story } from "@/components/sections/Story";
import { Team } from "@/components/sections/Team";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { NewsroomPreview } from "@/components/sections/NewsroomPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Ten sections, one argument: thesis (Hero) → proof (ProofBand) → doctrine
 * (Philosophy) → evidence (Products) → method (OperatingModel) → narrative
 * (Story) → people (Team) → objections (FAQ) → signal (Newsroom) → ask (CTA).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBand />
      <Philosophy />
      <ProductsBento />
      <OperatingModel />
      <Story />
      <Team />
      <HomeFaq />
      <NewsroomPreview />
      <ClosingCTA />
    </>
  );
}
