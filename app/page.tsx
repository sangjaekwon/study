import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { MatchingSection } from "@/components/MatchingSection";
import { CameraSection } from "@/components/CameraSection";
import { TimerSection } from "@/components/TimerSection";
import { AutomationSection } from "@/components/AutomationSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProblemSection />
      <MatchingSection />
      <CameraSection />
      <TimerSection />
      <AutomationSection />
      <FinalCta />
      <Footer />
    </>
  );
}
