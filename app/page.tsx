import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
import ThreePillars from "@/components/ThreePillars";
import ProcessTracker from "@/components/ProcessTracker";
import HomeVideoSection from "@/components/HomeVideoSection";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Startseite",
  description:
    "APÖ – Das behördlich begleitete Kompetenzzentrum für die strukturelle Rekrutierung und Integration thailändischer Pflegefachkräfte im öffentlichen Gesundheitswesen Österreichs.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {process.env.NEXT_PUBLIC_HOME_VIDEO_URL && (
        <HomeVideoSection
          videoUrl={process.env.NEXT_PUBLIC_HOME_VIDEO_URL}
          posterUrl={process.env.NEXT_PUBLIC_HOME_VIDEO_POSTER_URL}
        />
      )}
      <TrustIndicators />
      <ThreePillars />
      <ProcessTracker />

      {/* Contact CTA Section */}
      <section className="bg-navy-900 py-20" aria-labelledby="cta-heading">
        <div className="container-wide text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            Bereit, den Pflegebedarf Ihrer Einrichtung zu lösen?
          </h2>
          <p className="mt-4 text-lg text-navy-300 max-w-xl mx-auto">
            Vereinbaren Sie jetzt ein unverbindliches Erstgespräch mit unserem
            Beratungsteam für öffentliche Träger.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary">
              Erstgespräch vereinbaren
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+431234567890"
              className="btn-outline-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              +43 1 234 567 890
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
