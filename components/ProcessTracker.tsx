"use client";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  Plane,
  GraduationCap,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phase {
  id: number;
  icon: React.ElementType;
  title: string;
  location: string;
  duration: string;
  color: string;
  activeColor: string;
  borderColor: string;
  milestones: string[];
  details: string;
  documents: string[];
}

const phases: Phase[] = [
  {
    id: 1,
    icon: BookOpen,
    title: "Rekrutierung & Sprachkurs (B1)",
    location: "Bangkok, Thailand",
    duration: "6 Monate",
    color: "bg-blue-50",
    activeColor: "bg-blue-600",
    borderColor: "border-blue-300",
    milestones: [
      "Bewerbungseingang & Vorauswahl durch APÖ-Partnerorganisation",
      "Persönliches Assessment & Fachkompetenztests in Bangkok",
      "Deutsch-Intensivkurs (A1 → B1, ÖSD-zertifiziert)",
      "Kulturelles Vorbereitungsseminar & Einführung österr. Pflegestandards",
      "Abschlussprüfung Sprachkompetenz (ÖSD B1)",
    ],
    details:
      "Die Rekrutierungsphase beginnt mit der strukturierten Auswahl geeigneter Bewerberinnen und Bewerber an akkreditierten Pflegehochschulen in Bangkok und Chiang Mai. Das APÖ-Auswahlteam führt persönliche Assessments durch und begleitet die Kandidatinnen während des gesamten 6-monatigen Sprachkurses.",
    documents: [
      "Pflegediplom (Original + beglaubigte Übersetzung)",
      "Geburtsurkunde",
      "Strafregisterbescheinigung (TH)",
      "ärztliches Gesundheitszeugnis",
    ],
  },
  {
    id: 2,
    icon: FileText,
    title: "RWR-Karten-Antrag & Botschafts-Legalisation",
    location: "Wien + Österreichische Botschaft Bangkok",
    duration: "2–3 Monate",
    color: "bg-amber-50",
    activeColor: "bg-amber-600",
    borderColor: "border-amber-300",
    milestones: [
      "Einreichung aller legalisierten Dokumente beim AMS Österreich",
      "Bearbeitung der RWR-Karte (Fachkraft im Pflegebereich)",
      "Botschafts-Legalisation (Apostille) aller Bildungsnachweise",
      "Visum D-Antrag bei der Österreichischen Botschaft Bangkok",
      "Zustellung der RWR-Karte & Reisevorbereitungen",
    ],
    details:
      "Parallel zur laufenden Antragstellung koordiniert das APÖ-Legalteam alle erforderlichen Dokumente. Spezialisierte Migrationsrechtsanwälte übernehmen die Kommunikation mit dem AMS und dem Bundesministerium für Inneres, um maximale Rechtssicherheit zu gewährleisten.",
    documents: [
      "Ausgefülltes AMS-Antragsformular RWR",
      "Lohnbestätigung des aufnehmenden Trägers",
      "Stellenbeschreibung & Kollektivvertrag",
      "Alle Bildungsnachweise mit Apostille",
    ],
  },
  {
    id: 3,
    icon: Plane,
    title: "Einreise nach Österreich & Dienstantritt",
    location: "Österreich",
    duration: "1 Monat",
    color: "bg-green-50",
    activeColor: "bg-green-600",
    borderColor: "border-green-300",
    milestones: [
      "Ankunft am Flughafen Wien-Schwechat & Erstempfang durch APÖ",
      "Behördliche Anmeldung (Meldezettel, Finanzamt, GKK)",
      "Wohnungsübergabe & Einrichtung Alltag",
      "Dienstantritt als Pflegeassistenz (PA) im aufnehmenden Betrieb",
      "Onboarding & Einführungswoche im Pflegebetrieb",
    ],
    details:
      "Das APÖ-Betreuungsteam empfängt alle Pflegefachkräfte persönlich am Flughafen und begleitet sie durch die ersten Behördengänge. Ein Buddy-Programm sorgt für eine reibungslose Eingewöhnung. In dieser Phase beginnt die Anstellung als Pflegeassistenz.",
    documents: [
      "Meldezettel (Anmeldung beim Gemeindeamt)",
      "Sozialversicherungsnummer",
      "Arbeitsvertrag (PA) mit dem öffentlichen Träger",
      "Kontoerstellung bei österreichischer Bank",
    ],
  },
  {
    id: 4,
    icon: GraduationCap,
    title: "Berufsbegleitende Nostrifizierung zum DGKP",
    location: "Österreich",
    duration: "6–12 Monate",
    color: "bg-purple-50",
    activeColor: "bg-purple-600",
    borderColor: "border-purple-300",
    milestones: [
      "Einreichung Nostrifizierungsantrag bei Landesgesundheitsbehörde",
      "Prüfung der Gleichwertigkeit des Pflegediploms",
      "Ggf. Ausgleichsmaßnahmen (Eignungsprüfung oder Anpassungslehrgang)",
      "Abschluss Nostrifizierungsverfahren → Anerkennung als DGKP",
      "Umstieg auf vollen DGKP-Kollektivvertrag & Aufgabenbereich",
    ],
    details:
      "Das Nostrifizierungsverfahren läuft vollständig berufsbegleitend ab. APÖ koordiniert alle Behördenkontakte und stellt Vorbereitungskurse für etwaige Eignungsprüfungen bereit. Nach erfolgreicher Anerkennung als DGKP genießen die Pflegefachkräfte volle Berufsrechte und Gehaltsansprüche.",
    documents: [
      "Nostrifizierungsantrag (Landesformular)",
      "Beglaubigte Übersetzung aller Dokumente (vereidigte Übersetzer/in)",
      "Nachweis Berufspraktikum (PA-Phase)",
      "Deutsch-Zertifikat B2 (für DGKP-Anerkennung empfohlen)",
    ],
  },
];

export default function ProcessTracker() {
  const [activePhase, setActivePhase] = useState<number>(1);

  const currentPhase = phases.find((p) => p.id === activePhase)!;

  return (
    <section
      className="bg-section-gradient py-20"
      aria-labelledby="tracker-heading"
    >
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 id="tracker-heading" className="section-title">
            APÖ Nostrifizierungs- & RWR-Prozess-Tracker
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Verfolgen Sie den gesamten Prozess von der Rekrutierung in Bangkok
            bis zur vollständigen Anerkennung als DGKP in Österreich — Schritt
            für Schritt, transparent und planbar.
          </p>
        </div>

        {/* Phase Selector */}
        <div className="mb-8">
          {/* Timeline connector */}
          <div className="relative">
            {/* Horizontal line */}
            <div
              className="absolute top-6 left-0 right-0 h-0.5 bg-navy-200 hidden sm:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {phases.map((phase) => {
                const Icon = phase.icon;
                const isActive = phase.id === activePhase;
                const isPast = phase.id < activePhase;

                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActivePhase(phase.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
                      isActive
                        ? `${phase.borderColor} ${phase.color} shadow-md`
                        : isPast
                        ? "border-green-200 bg-green-50 opacity-80 hover:opacity-100"
                        : "border-navy-100 bg-white hover:border-navy-300 hover:shadow-sm"
                    )}
                    aria-pressed={isActive}
                    aria-label={`Phase ${phase.id}: ${phase.title}`}
                  >
                    {/* Phase number indicator */}
                    <div
                      className={cn(
                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2",
                        isActive
                          ? `${phase.activeColor} border-transparent text-white`
                          : isPast
                          ? "bg-green-500 border-transparent text-white"
                          : "bg-white border-navy-200 text-navy-400"
                      )}
                    >
                      {isPast && !isActive ? (
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </div>

                    <div className="text-center">
                      <div
                        className={cn(
                          "text-xs font-bold uppercase tracking-wide",
                          isActive ? "text-navy-900" : "text-navy-500"
                        )}
                      >
                        Phase {phase.id}
                      </div>
                      <div
                        className={cn(
                          "text-xs font-medium mt-0.5 leading-tight hidden sm:block",
                          isActive ? "text-navy-700" : "text-navy-400"
                        )}
                      >
                        {phase.title.split(" ")[0]}
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        isActive ? "text-navy-600" : "text-navy-400"
                      )}
                    >
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {phase.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phase Detail Panel */}
        <div
          className={`rounded-2xl border-2 ${currentPhase.borderColor} ${currentPhase.color} p-8`}
          aria-live="polite"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-5">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${currentPhase.activeColor} text-white`}
                >
                  <currentPhase.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
                    Phase {currentPhase.id} von {phases.length}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">
                    {currentPhase.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-navy-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {currentPhase.duration}
                    </span>
                    <span className="h-3 w-px bg-navy-300" />
                    <span>{currentPhase.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-navy-700 leading-relaxed mb-6">
                {currentPhase.details}
              </p>

              {/* Milestones */}
              <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-3">
                Meilensteine
              </h4>
              <ol className="space-y-2">
                {currentPhase.milestones.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-navy-700">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${currentPhase.activeColor} text-white text-xs font-bold`}
                    >
                      {idx + 1}
                    </span>
                    {milestone}
                  </li>
                ))}
              </ol>
            </div>

            {/* Documents Sidebar */}
            <div>
              <div className="rounded-xl border border-navy-200 bg-white p-5">
                <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-4">
                  Benötigte Dokumente
                </h4>
                <ul className="space-y-2.5">
                  {currentPhase.documents.map((doc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-navy-600"
                    >
                      <ChevronRight
                        className="h-4 w-4 text-red-austria flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-4">
                {activePhase > 1 && (
                  <button
                    type="button"
                    onClick={() => setActivePhase((p) => p - 1)}
                    className="flex-1 rounded-lg border border-navy-300 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 transition-colors"
                  >
                    ← Zurück
                  </button>
                )}
                {activePhase < phases.length && (
                  <button
                    type="button"
                    onClick={() => setActivePhase((p) => p + 1)}
                    className={cn(
                      "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors",
                      currentPhase.activeColor,
                      "hover:opacity-90"
                    )}
                  >
                    Nächste Phase →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Total duration summary */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-navy-600">
          <div className="flex items-center gap-2 rounded-full bg-white border border-navy-200 px-4 py-2 shadow-sm">
            <Clock className="h-4 w-4 text-red-austria" />
            <strong>Gesamtlaufzeit:</strong> ca. 15–22 Monate (Bangkok → DGKP Österreich)
          </div>
        </div>
      </div>
    </section>
  );
}
