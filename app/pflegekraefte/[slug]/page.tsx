export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Briefcase, Languages, Star } from "lucide-react";
import { readKandidatinnen } from "@/lib/data-store";
import { phaseLabels, phaseColors } from "@/lib/pflegekraefte-data";
import VideoEmbed from "@/components/VideoEmbed";
import TrackBrief from "@/components/TrackBrief";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pflegekraefte = await readKandidatinnen();
  const pk = pflegekraefte.find((p) => p.slug === params.slug);
  if (!pk) return { title: "Nicht gefunden" };
  return {
    title: `${pk.name} – ${pk.specialization}`,
    description: `Profil von ${pk.name} (${pk.nameThai}): ${pk.specialization}, ${pk.experienceYears} Jahre Erfahrung, Deutsch ${pk.languageLevel}. APÖ Phase ${pk.currentPhase}: ${phaseLabels[pk.currentPhase]}.`,
  };
}

export default async function PflegekraftProfilePage({ params }: Props) {
  const pflegekraefte = await readKandidatinnen();
  const pk = pflegekraefte.find((p) => p.slug === params.slug);
  if (!pk) notFound();

  const initials = pk.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colors = phaseColors[pk.currentPhase];

  // Find prev/next for navigation
  const currentIndex = pflegekraefte.findIndex((p) => p.slug === pk.slug);
  const prevPk = pflegekraefte[currentIndex - 1];
  const nextPk = pflegekraefte[currentIndex + 1];

  return (
    <div>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${pk.avatarColor} py-12 sm:py-16 relative overflow-hidden`}>
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-austria" aria-hidden="true" />

        <div className="container-wide relative">
          {/* Back link */}
          <Link
            href="/pflegekraefte"
            className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle Kandidatinnen
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar / Photo */}
            <div className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-white/30 overflow-hidden">
              {pk.photoUrl ? (
                <Image
                  src={pk.photoUrl}
                  alt={pk.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover object-top"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-white/20 text-3xl font-bold text-white">
                  {initials}
                </div>
              )}
            </div>

            {/* Name & Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`badge ${colors.badge} text-xs font-semibold`}>
                  Phase {pk.currentPhase}: {phaseLabels[pk.currentPhase]}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {pk.name}
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {pk.nameThai} &nbsp;·&nbsp; {pk.namePhonetic}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-red-austria" />
                  {pk.specialization}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-white/60" />
                  {pk.experienceYears} Jahre Erfahrung
                </span>
                <span className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-white/60" />
                  Deutsch {pk.languageLevel}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-white/60" />
                  Thailand → Österreich
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-navy-50 py-10 sm:py-14">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Video + Bio + Skills */}
            <div className="lg:col-span-2 space-y-6">

              {/* Video */}
              <div>
                <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
                  Vorstellungsvideo
                </h2>
                <VideoEmbed
                  videoUrl={pk.videoUrl}
                  nurseName={pk.name}
                  avatarColor={pk.avatarColor}
                  initials={initials}
                />
                {!pk.videoUrl && (
                  <p className="mt-2 text-xs text-navy-400 text-center">
                    Personalisiertes KI-Intro-Video wird via{" "}
                    <span className="font-semibold">HeyGen</span> erstellt und hier eingebunden.
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-card">
                <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
                  Über {pk.name.split(" ")[0]}
                </h2>
                <p className="text-sm text-navy-700 leading-relaxed">{pk.bio}</p>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Alter", value: `${pk.age} Jahre` },
                    { label: "Erfahrung", value: `${pk.experienceYears} Jahre` },
                    { label: "Deutsch", value: pk.languageLevel },
                    { label: "Spezialisierung", value: pk.specialization },
                    { label: "Verfügbar", value: pk.availableFrom },
                    { label: "Phase", value: `${pk.currentPhase} von 4` },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-navy-50 p-3">
                      <p className="text-xs text-navy-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-navy-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-card">
                <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">
                  Fachkompetenzen
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pk.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-navy-200 bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border-2 border-navy-900 bg-navy-900 p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  Interesse an {pk.name.split(" ")[0]}?
                </h3>
                <p className="text-navy-300 text-sm mb-4">
                  Kontaktieren Sie uns für ein unverbindliches Erstgespräch und
                  erfahren Sie mehr über den Recruitingprozess.
                </p>
                <Link
                  href={`/kontakt?subject=Anfrage+${encodeURIComponent(pk.name)}`}
                  className="btn-primary"
                >
                  Kandidatin anfragen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right: Track Brief */}
            <div>
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
                Track-Brief
              </h2>
              <TrackBrief pflegekraft={pk} />
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
            {prevPk ? (
              <Link
                href={`/pflegekraefte/${prevPk.slug}`}
                className="flex items-center gap-3 rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50 hover:border-navy-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-navy-400">Vorherige</div>
                  <div className="font-semibold">{prevPk.name}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPk ? (
              <Link
                href={`/pflegekraefte/${nextPk.slug}`}
                className="flex items-center gap-3 rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50 hover:border-navy-300 transition-colors text-right sm:text-right"
              >
                <div className="text-right flex-1">
                  <div className="text-xs text-navy-400">Nächste</div>
                  <div className="font-semibold">{nextPk.name}</div>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
