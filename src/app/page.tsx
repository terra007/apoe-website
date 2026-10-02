import B2GCalculator from "@/components/B2GCalculator";
import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";
import ProcessTracker from "@/components/ProcessTracker";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <HeroSection />
        <B2GCalculator />
        <ProcessTracker />
      </main>
    </>
  );
}
