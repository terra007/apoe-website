import Link from "next/link";
import { ArrowRight, Award, FileCheck, Users } from "lucide-react";

const stats = [
  { value: "100%", label: "Ethisches Recruitment", icon: Award },
  { value: "WHO", label: "Fair Recruitment konform", icon: FileCheck },
  { value: "B2G", label: "Fokus öffentliche Träger", icon: Users },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-hero-gradient"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Austrian flag stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-austria" aria-hidden="true" />

      <div className="container-wide relative py-12 sm:py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider">
              B2G · Öffentliche Gesundheitsversorgung
            </span>
            <span className="badge bg-navy-700/60 text-navy-200 text-xs">
              Wien · Österreich
            </span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Agentur für{" "}
            <span className="text-red-austria">Pflegevermittlung</span>{" "}
            Österreich{" "}
            <span className="text-navy-300">(APÖ)</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base text-navy-200 leading-relaxed max-w-2xl sm:text-lg lg:text-xl">
            Das behördlich begleitete Kompetenzzentrum für die strukturelle
            Rekrutierung und Integration thailändischer Pflegefachkräfte im
            öffentlichen Gesundheitswesen.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/kontakt" className="btn-primary">
              Bedarfserhebung starten
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/oeffentliche-traeger" className="btn-outline-white">
              Leistungsübersicht
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-start gap-2 text-xs text-navy-300 sm:text-sm">
            <FileCheck className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
            <span>
              Konzessioniertes Arbeitsvermittlungsunternehmen gemäß AÜG · AMS-geprüft
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-navy-600/50 bg-navy-800/50 backdrop-blur-sm p-5 flex items-center gap-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-austria/20">
                <Icon className="h-5 w-5 text-red-austria" aria-hidden="true" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-navy-300 mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
