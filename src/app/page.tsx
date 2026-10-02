import B2GCalculator from "@/components/B2GCalculator";
import ExplainerVideo from "@/components/ExplainerVideo";
import BedarfSection from "@/components/BedarfSection";
import FaqSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";
import ProcessTracker from "@/components/ProcessTracker";
import ProfilesSection from "@/components/ProfilesSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <HeroSection />
        <ExplainerVideo />
        <BedarfSection />
        <ProfilesSection />
        <B2GCalculator />
        <ProcessTracker />
        <FaqSection />
      </main>
    </>
  );
}
