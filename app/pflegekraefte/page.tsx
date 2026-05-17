export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import PflegekraftCard from "@/components/PflegekraftCard";
import { readKandidatinnen } from "@/lib/data-store";
import { phaseLabels } from "@/lib/pflegekraefte-data";
import Link from "next/link";
import { Users, ArrowRight, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsere Kandidatinnen",
  description:
    "Lernen Sie unsere qualifizierten thailändischen Pflegefachkräfte kennen. Jede Kandidatin mit individuellem Track-Brief, Vorstellungsvideo und aktuellem Prozess-Status.",
};

const stats = [
  { value: "6", label: "Aktive Kandidatinnen" },
  { value: "4", label: "Verschiedene Phasen" },
  { value: "Ø 7J", label: "Berufserfahrung" },
  { value: "100%", label: "ÖSD-Kurs absolviert oder laufend" },
];

export default async function PflegekraeftePage() {
  const pflegekraefte = await readKandidatinnen();
  const byPhase = [1, 2, 3, 4] as const;

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-14 sm:py-20">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider">
                Kandidatinnen 2025/26
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl mb-4">
              Unsere qualifizierten{" "}
              <span className="text-red-austria">Pflegekandidatinnen</span>
            </h1>
            <p className="text-base text-navy-200 leading-relaxed sm:text-lg">
              Jede Kandidatin verfügt über ein staatlich anerkanntes Pflegediplom,
              befindet sich im APÖ-Prozess und wird mit einem persönlichen
              Track-Brief sowie Vorstellungsvideo präsentiert.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-navy-600/40 bg-navy-800/50 p-4 text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-navy-300 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Filter Overview */}
      <section className="bg-white border-b border-navy-100 py-4 sticky top-16 z-30">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-navy-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold text-navy-500 mr-1">Phase:</span>
            {byPhase.map((phase) => {
              const count = pflegekraefte.filter((p) => p.currentPhase === phase).length;
              if (count === 0) return null;
              return (
                <a
                  key={phase}
                  href={`#phase-${phase}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1 text-xs font-medium text-navy-600 hover:bg-navy-50 hover:border-navy-300 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-austria" aria-hidden="true" />
                  Phase {phase} · {phaseLabels[phase].split(" ")[0]}
                  <span className="rounded-full bg-navy-100 px-1.5 py-0.5 text-xs text-navy-500">
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Candidates Grid — grouped by phase */}
      <section className="bg-navy-50 py-12 sm:py-16">
        <div className="container-wide space-y-14">
          {byPhase.map((phase) => {
            const candidates = pflegekraefte.filter((p) => p.currentPhase === phase);
            if (candidates.length === 0) return null;
            return (
              <div key={phase} id={`phase-${phase}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-white text-sm font-bold flex-shrink-0">
                    {phase}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-navy-900">
                      Phase {phase}: {phaseLabels[phase]}
                    </h2>
                    <p className="text-xs text-navy-400">
                      {candidates.length} Kandidatin{candidates.length > 1 ? "nen" : ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {candidates.map((pk) => (
                    <PflegekraftCard key={pk.slug} pflegekraft={pk} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-14">
        <div className="container-wide text-center">
          <Users className="mx-auto mb-4 h-10 w-10 text-red-austria" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
            Interesse an einer Kandidatin?
          </h2>
          <p className="text-navy-300 mb-7 max-w-lg mx-auto text-sm sm:text-base">
            Vereinbaren Sie ein Erstgespräch — wir präsentieren Ihnen die
            passenden Kandidatinnen für Ihre Einrichtung und erklären den
            gesamten Recruitingprozess.
          </p>
          <Link href="/kontakt" className="btn-primary">
            Kandidatinnen anfragen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
