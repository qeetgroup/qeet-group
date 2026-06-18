import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { VisionMission } from "@/components/sections/VisionMission";
import { Products } from "@/components/sections/Products";
import { NewsroomPreview } from "@/components/sections/NewsroomPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <VisionMission />
      <Products />
      <NewsroomPreview />
      <ClosingCTA />
    </>
  );
}
