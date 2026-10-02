"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Flag, GraduationCap, Landmark, Languages, Timer, type LucideIcon } from "lucide-react";
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

// Dauern sind Richtwerte und hängen von Behörden und Einzelfall ab.
const PHASES: Phase[] = [
  {
    id: "selektion",
    title: "Selektion & Sprache",
    place: "Bangkok",
    icon: Languages,
    duration: "6–9 Monate",
    summary: "Auswahl der Kandidat:innen und Deutschkurs von A1 bis B1 mit ÖSD-Prüfung.",
    documents: ["Pass", "Pflegeausbildungsnachweis (Zeugnisse, Diplom)", "Lebenslauf & Motivationsschreiben", "Strafregisterauszug", "ÖSD-Zertifikat A1, A2, B1"],
    milestones: ["Eignungsgespräch bestanden", "ÖSD A1 abgelegt", "ÖSD A2 abgelegt", "ÖSD B1 abgelegt"],
  },
  {
    id: "legal",
    title: "Legal & Visa",
    place: "AMS · BMI · Botschaft",
    icon: Landmark,
    duration: "2–4 Monate",
    summary: "Arbeitsmarktprüfung, Rot-Weiß-Rot-Karte und Einreise.",
    documents: ["Arbeitsvorvertrag der Einrichtung", "Antrag Rot-Weiß-Rot-Karte", "Nachweis Unterkunft & Krankenversicherung", "Beglaubigte Übersetzungen der Zeugnisse", "Visum-Antrag (Botschaft)"],
    milestones: ["Antrag bei der Behörde eingereicht", "AMS-Stellungnahme liegt vor", "Karte bewilligt", "Visum erteilt & Einreise"],
  },
  {
    id: "nostrifizierung",
    title: "Post-Migration & Nostrifizierung",
    place: "Österreich · PA / DGKP",
    icon: GraduationCap,
    duration: "6–12 Monate",
    summary: "Einsatz als Pflegeassistenz während der Anerkennung, danach DGKP-Nostrifizierung.",
    documents: ["Antrag auf Nostrifizierung / Anerkennung", "Gleichhaltungsbescheid der Behörde", "Nachweise zu Ergänzungsprüfung oder Anpassungslehrgang", "Eintragung ins Gesundheitsberuferegister"],
    milestones: ["Einstieg als PA", "Bescheid zu Ausgleichsmaßnahmen", "Ergänzungsprüfung bestanden", "Registereintrag als DGKP"],
  },
];

export default function ProcessTracker() {
  const [activeId, setActiveId] = useState(PHASES[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const active = PHASES.find((p) => p.id === activeId) ?? PHASES[0];

  const progress = (p: Phase) => p.milestones.filter((m) => done[`${p.id}:${m}`]).length;

  return (
    <section id="prozess" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Der Weg in drei Säulen</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Wählen Sie eine Phase, um Dokumente, Dauer und Meilensteine zu sehen. Meilensteine lassen sich abhaken.
        </p>

        <div role="tablist" aria-label="Prozessphasen" className="mt-10 grid gap-3 md:grid-cols-3">
          {PHASES.map((p, i) => {
            const Icon = p.icon;
            const selected = p.id === activeId;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`panel-${p.id}`}
                type="button"
                onClick={() => setActiveId(p.id)}
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
            key={active.id}
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
                  {active.milestones.map((m) => {
                    const key = `${active.id}:${m}`;
                    return (
                      <li key={m}>
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                          <input
                            type="checkbox"
                            checked={!!done[key]}
                            onChange={(e) => setDone((s) => ({ ...s, [key]: e.target.checked }))}
                            className="h-4 w-4 accent-emerald-500"
                          />
                          <span className={cn(done[key] && "text-slate-500 line-through")}>{m}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-slate-500">Dauern sind Richtwerte und hängen von Behörden und Einzelfall ab.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
