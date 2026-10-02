"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileText, Flag, GraduationCap, Landmark, Languages, Timer, type LucideIcon } from "lucide-react";
import { QUELLEN, STAND } from "@/data/fakten";
import { cn } from "@/lib/utils";

type Phase = {
  id: string;
  title: string;
  place: string;
  icon: LucideIcon;
  duration: string;
  summary: string;
  documents: string[];
  milestones: string[];
};

type Pfad = "dgkp" | "assistenz";

// Die Reihenfolge folgt den Behörden: Bei DGKP muss die Nostrifizierung vor
// dem Antrag auf die Rot-Weiß-Rot-Karte abgeschlossen sein (oesterreich.gv.at).
// Dauern sind Richtwerte, nur die 2–6 Monate Nostrifizierung stammen aus einer
// Quelle (Anlaufstelle Anerkennung).
const PFADE: Record<Pfad, { label: string; hinweis: string; phasen: Phase[] }> = {
  dgkp: {
    label: "DGKP",
    hinweis: "Diplomierte Gesundheits- und Krankenpflege (Bachelor, FH)",
    phasen: [
      {
        id: "selektion",
        title: "Selektion & Sprache",
        place: "Bangkok",
        icon: Languages,
        duration: "8–12 Monate",
        summary: "Auswahl der Kandidat:innen und Deutsch von A1 bis B2. B2 ist die Voraussetzung für die Eintragung als DGKP.",
        documents: ["Pass", "Diplom und Transcript (Bachelor)", "Berufserfahrungszeugnisse", "Strafregisterauszug", "Sprachzertifikat B2 (z. B. ÖSD)"],
        milestones: ["Eignungsgespräch bestanden", "Deutsch B1 abgelegt", "Deutsch B2 abgelegt", "Unterlagen beglaubigt und übersetzt"],
      },
      {
        id: "nostrifizierung",
        title: "Nostrifizierung & Visa",
        place: "FH · AMS · Botschaft",
        icon: Landmark,
        duration: "6–12 Monate",
        summary:
          "Zuerst die Nostrifizierung der Ausbildung, bei DGKP über eine Fachhochschule. Erst danach der Antrag auf die Rot-Weiß-Rot-Karte. Der Bescheid kann Ergänzungsprüfung oder Anpassungslehrgang vorsehen.",
        documents: [
          "Antrag auf Nostrifizierung mit beglaubigten Übersetzungen",
          "Nostrifizierungsbescheid",
          "Arbeitsvorvertrag der Einrichtung (Mindestentlohnung nach Kollektivvertrag)",
          "Antrag Rot-Weiß-Rot-Karte, Fachkraft in Mangelberuf (mind. 55 Punkte)",
        ],
        milestones: ["Antrag Nostrifizierung eingereicht", "Bescheid liegt vor", "Auflagen erfüllt", "Rot-Weiß-Rot-Karte erteilt"],
      },
      {
        id: "registrierung",
        title: "Einreise & Registrierung",
        place: "Österreich",
        icon: GraduationCap,
        duration: "1–3 Monate",
        summary: "Einreise, Eintragung im Gesundheitsberuferegister (Voraussetzung für die Berufsausübung) und Einarbeitung.",
        documents: ["Rot-Weiß-Rot-Karte", "Nostrifizierungsbescheid", "Deutschnachweis B2", "Antrag Eintragung Gesundheitsberuferegister"],
        milestones: ["Einreise und Meldung", "Eintrag im Gesundheitsberuferegister", "Einarbeitung mit Mentoring", "Probezeit abgeschlossen"],
      },
    ],
  },
  assistenz: {
    label: "PA / PFA",
    hinweis: "Pflegeassistenz (1 Jahr) und Pflegefachassistenz (2 Jahre)",
    phasen: [
      {
        id: "selektion",
        title: "Selektion & Sprache",
        place: "Bangkok",
        icon: Languages,
        duration: "6–9 Monate",
        summary: "Auswahl der Kandidat:innen und Deutsch von A1 bis B1. B1 genügt für die Eintragung als PA oder PFA.",
        documents: ["Pass", "Ausbildungsnachweis", "Strafregisterauszug", "Sprachzertifikat B1 (z. B. ÖSD)"],
        milestones: ["Eignungsgespräch bestanden", "Deutsch A2 abgelegt", "Deutsch B1 abgelegt", "Unterlagen beglaubigt und übersetzt"],
      },
      {
        id: "legal",
        title: "Legal & Visa",
        place: "AMS · BMI · Botschaft",
        icon: Landmark,
        duration: "2–4 Monate",
        summary:
          "Rot-Weiß-Rot-Karte als Fachkraft in einem Mangelberuf. Bei den Assistenzberufen ist eine Beschäftigung teils auch ohne abgeschlossene Nostrifizierung möglich. Das im Einzelfall vorab klären.",
        documents: [
          "Arbeitsvorvertrag der Einrichtung (Mindestentlohnung nach Kollektivvertrag)",
          "Antrag Rot-Weiß-Rot-Karte (mind. 55 Punkte)",
          "Ausbildungsnachweise mit beglaubigter Übersetzung",
          "Visum-Antrag bei der Botschaft",
        ],
        milestones: ["Antrag eingereicht", "Stellungnahme der Behörde", "Karte erteilt", "Visum und Einreise"],
      },
      {
        id: "nostrifizierung",
        title: "Post-Migration & Nostrifizierung",
        place: "Österreich · Landesbehörde",
        icon: GraduationCap,
        duration: "3–9 Monate",
        summary: "Nostrifizierung bei der Landesbehörde, danach die Eintragung im Gesundheitsberuferegister. Ergänzungsprüfung oder Anpassungslehrgang sind möglich.",
        documents: ["Antrag auf Nostrifizierung", "Nostrifizierungsbescheid", "Nachweis Ergänzungsprüfung oder Lehrgang (falls vorgeschrieben)", "Antrag Eintragung Gesundheitsberuferegister"],
        milestones: ["Antrag Nostrifizierung eingereicht", "Bescheid liegt vor", "Eintrag im Gesundheitsberuferegister", "Einarbeitung mit Mentoring"],
      },
    ],
  },
};

export default function ProcessTracker() {
  const [pfad, setPfad] = useState<Pfad>("dgkp");
  const [activeIndex, setActiveIndex] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const { phasen, hinweis } = PFADE[pfad];
  const active = phasen[activeIndex];
  const key = (p: Phase, m: string) => `${pfad}:${p.id}:${m}`;
  const progress = (p: Phase) => p.milestones.filter((m) => done[key(p, m)]).length;

  return (
    <section id="prozess" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Der Weg in drei Säulen</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Der Ablauf unterscheidet sich je nach Berufsgruppe. Wählen Sie den Weg und eine Phase, um Dokumente, Dauer und
          Meilensteine zu sehen.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Berufsgruppe" className="inline-flex rounded-full border border-white/15 p-1">
            {(Object.keys(PFADE) as Pfad[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={pfad === k}
                onClick={() => {
                  setPfad(k);
                  setActiveIndex(0);
                }}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                  pfad === k ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:text-white"
                )}
              >
                {PFADE[k].label}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400">{hinweis}</p>
        </div>

        <div role="tablist" aria-label="Prozessphasen" className="mt-6 grid gap-3 md:grid-cols-3">
          {phasen.map((p, i) => {
            const Icon = p.icon;
            const selected = i === activeIndex;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`panel-${p.id}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                  selected ? "border-emerald-400 bg-emerald-400/10" : "border-white/10 bg-white/[0.03] hover:border-white/30"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <Icon className={cn("h-6 w-6", selected ? "text-emerald-400" : "text-slate-400")} />
                  <span className="text-xs text-slate-500">Säule {i + 1}</span>
                </div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-slate-400">{p.place}</p>
                <p className="mt-3 text-xs text-slate-400">
                  {progress(p)} / {p.milestones.length} Meilensteine
                </p>
                <div className="mt-1 h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${(progress(p) / p.milestones.length) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${pfad}-${active.id}`}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold">{active.title}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                <Timer className="h-3.5 w-3.5" /> {active.duration}
              </span>
            </div>
            <p className="mt-2 text-slate-300">{active.summary}</p>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <FileText className="h-4 w-4 text-emerald-400" /> Benötigte Dokumente
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  {active.documents.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Flag className="h-4 w-4 text-emerald-400" /> Meilensteine
                </p>
                <ul className="space-y-2">
                  {active.milestones.map((m) => (
                    <li key={m}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={!!done[key(active, m)]}
                          onChange={(e) => setDone((s) => ({ ...s, [key(active, m)]: e.target.checked }))}
                          className="h-4 w-4 accent-emerald-500"
                        />
                        <span className={cn(done[key(active, m)] && "text-slate-500 line-through")}>{m}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Dauern sind Richtwerte. Stand: {STAND}. Maßgeblich sind die Behörden, siehe{" "}
              <a href={QUELLEN.rwr.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-300 hover:underline">
                oesterreich.gv.at <ExternalLink className="h-3 w-3" />
              </a>{" "}
              und{" "}
              <a href={QUELLEN.berufsanerkennung.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-300 hover:underline">
                berufsanerkennung.at <ExternalLink className="h-3 w-3" />
              </a>
              .
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
