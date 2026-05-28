import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { VisionMission } from "@/components/sections/VisionMission";
import { Companies } from "@/components/sections/Companies";
import { NewsroomPreview } from "@/components/sections/NewsroomPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <VisionMission />
      <Companies />
      <NewsroomPreview />
      <ClosingCTA />
    </>
  );
}
