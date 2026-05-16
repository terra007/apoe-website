"use client";

import Link from "next/link";
import { ArrowRight, Star, Clock } from "lucide-react";
import { type Pflegekraft, phaseLabels, phaseColors } from "@/lib/pflegekraefte-data";

interface PflegekraftCardProps {
  pflegekraft: Pflegekraft;
}

export default function PflegekraftCard({ pflegekraft: pk }: PflegekraftCardProps) {
  const colors = phaseColors[pk.currentPhase];
  const initials = pk.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="group rounded-2xl border border-navy-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden hover:-translate-y-0.5">

      {/* Video / Thumbnail */}
      {pk.videoUrl ? (
        <div
          className="relative h-48 bg-black overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            src={pk.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            aria-label={`Vorstellungsvideo ${pk.name}`}
          />
          {/* Phase Badge */}
          <div className={`absolute top-3 left-3 badge ${colors.badge} text-xs font-semibold pointer-events-none`}>
            Phase {pk.currentPhase}
          </div>
        </div>
      ) : (
        <Link href={`/pflegekraefte/${pk.slug}`} aria-label={`Profil von ${pk.name} öffnen`} tabIndex={-1}>
          <div className={`relative h-40 bg-gradient-to-br ${pk.avatarColor} flex items-center justify-center overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 border-2 border-white/40 text-2xl font-bold text-white">
                {initials}
              </div>
              <span className="text-xs font-medium text-white/70 bg-black/20 rounded-full px-3 py-0.5">
                🎬 Intro-Video folgt
              </span>
            </div>
            <div className={`absolute top-3 left-3 badge ${colors.badge} text-xs font-semibold`}>
              Phase {pk.currentPhase}
            </div>
            <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
          </div>
        </Link>
      )}

      {/* Card Body */}
      <Link
        href={`/pflegekraefte/${pk.slug}`}
        className="block p-4 sm:p-5"
        aria-label={`Profil von ${pk.name} öffnen`}
      >
        <div className="mb-3">
          <h3 className="text-base font-bold text-navy-900 group-hover:text-navy-700 transition-colors leading-tight">
            {pk.name}
          </h3>
          <p className="text-xs text-navy-400 mt-0.5">{pk.nameThai} · {pk.namePhonetic}</p>
        </div>

        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700">
            <Star className="h-3 w-3 text-red-austria" aria-hidden="true" />
            {pk.specialization}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="rounded-lg bg-navy-50 p-2">
            <div className="text-sm font-bold text-navy-900">{pk.experienceYears}J</div>
            <div className="text-xs text-navy-400">Erfahrung</div>
          </div>
          <div className="rounded-lg bg-navy-50 p-2">
            <div className="text-sm font-bold text-navy-900">{pk.languageLevel}</div>
            <div className="text-xs text-navy-400">Deutsch</div>
          </div>
          <div className="rounded-lg bg-navy-50 p-2">
            <div className="text-sm font-bold text-navy-900">{pk.age}</div>
            <div className="text-xs text-navy-400">Jahre</div>
          </div>
        </div>

        <div className={`rounded-lg ${colors.bg} border ${colors.border} px-3 py-2 mb-4`}>
          <div className={`text-xs font-semibold ${colors.text} mb-0.5`}>
            {phaseLabels[pk.currentPhase]}
          </div>
          <div className="text-xs text-navy-600">{pk.phaseStatus}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-navy-500">
            <Clock className="h-3.5 w-3.5 text-red-austria" aria-hidden="true" />
            Verfügbar: {pk.availableFrom}
          </div>
          <span className="text-xs font-semibold text-red-austria group-hover:underline">
            Profil ansehen →
          </span>
        </div>
      </Link>
    </div>
  );
}
