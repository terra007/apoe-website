import B2GCalculator from "@/components/B2GCalculator";
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
        <ProfilesSection />
        <B2GCalculator />
        <ProcessTracker />
      </main>
    </>
  );
}
