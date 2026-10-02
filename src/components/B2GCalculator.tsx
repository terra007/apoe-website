"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, Euro } from "lucide-react";
import { cn } from "@/lib/utils";

type Urgency = "standard" | "beschleunigt" | "dringend";

// Richtwerte zur Orientierung, keine Zusage. Vor Livegang mit echten
// Projektdaten von APÖ abgleichen.
const BASE_MONTHS = 14;
const URGENCY: Record<Urgency, { label: string; hint: string; factor: number; premium: number }> = {
  standard: { label: "Standard", hint: "ab 12 Monate Vorlauf", factor: 1, premium: 0 },
  beschleunigt: { label: "Beschleunigt", hint: "6–12 Monate", factor: 0.85, premium: 0.1 },
  dringend: { label: "Dringend", hint: "unter 6 Monate", factor: 0.75, premium: 0.2 },
};
const COST_PER_DGKP = 14000; // Richtwert Vermittlung & Integration je Person
const COST_PER_PA = 9000;
const AGENCY_PER_FTE = 11500; // Richtwert Leiharbeit/Personalagentur je Jahr und Stelle über dem Eigenpersonal
const AGENCY_YEARS = 2;

const eur = new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function NumberField(props: { id: string; label: string; value: number; max: number; onChange: (n: number) => void }) {
  const { id, label, value, max, onChange } = props;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-200">
          {label}
        </label>
        <input
          type="number"
          min={0}
          max={max}
          value={value}
          aria-label={`${label} (Zahl)`}
          onChange={(e) => onChange(Math.min(max, Math.max(0, Math.round(Number(e.target.value) || 0))))}
          className="w-20 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-right text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        />
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
    </div>
  );
}

export default function B2GCalculator() {
  const [dgkp, setDgkp] = useState(10);
  const [pa, setPa] = useState(15);
  const [urgency, setUrgency] = useState<Urgency>("standard");

  const result = useMemo(() => {
    const total = dgkp + pa;
    const u = URGENCY[urgency];
    // Größere Kohorten brauchen mehr Koordination: +1 Monat je 25 Personen, höchstens +4.
    const months = Math.max(6, Math.round(BASE_MONTHS * u.factor + Math.min(4, Math.floor(total / 25))));
    const direct = Math.round((dgkp * COST_PER_DGKP + pa * COST_PER_PA) * (1 + u.premium));
    const agency = total * AGENCY_PER_FTE * AGENCY_YEARS;
    return { total, months, direct, agency, saving: agency - direct };
  }, [dgkp, pa, urgency]);

  const checklist = useMemo(() => {
    const items = [
      "Bedarfsmeldung & Stellenplan der Einrichtung",
      "Mitwirkung AMS: Beschäftigungsbewilligung / Rot-Weiß-Rot-Karte",
      "Sprachnachweis ÖSD (A1 → B1) vor Einreise",
      "Anerkennungsverfahren (Nostrifizierung) für DGKP / Anerkennung PA",
    ];
    if (dgkp > 0) items.push("DGKP: Ergänzungsprüfung / Anpassungslehrgang einplanen");
    if (result.total >= 20) items.push("Unterkunft & Mentoring-Konzept für Kohorte ab 20 Personen");
    return items;
  }, [dgkp, result.total]);

  return (
    <section id="rechner" className="bg-slate-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Kapazitäts- &amp; Zeitrechner</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Für Klinikleitungen und Gemeinden: eine erste Einschätzung, wie lange die Integration dauert und was sie
          im Vergleich zur Personalagentur kostet.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-7 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <NumberField id="dgkp" label="Benötigte DGKP-Stellen" value={dgkp} max={100} onChange={setDgkp} />
            <NumberField id="pa" label="Benötigte PA-Stellen" value={pa} max={100} onChange={setPa} />

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-200">Zeitliche Dringlichkeit</legend>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(URGENCY) as Urgency[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={urgency === key}
                    onClick={() => setUrgency(key)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                      urgency === key
                        ? "border-emerald-400 bg-emerald-400/10 text-white"
                        : "border-white/10 text-slate-300 hover:border-white/30"
                    )}
                  >
                    <span className="block font-semibold">{URGENCY[key].label}</span>
                    <span className="block text-xs text-slate-400">{URGENCY[key].hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="space-y-4" aria-live="polite">
            {result.total === 0 ? (
              <p className="rounded-2xl border border-white/10 p-6 text-slate-400">
                Wählen Sie mindestens eine Stelle, um die Einschätzung zu sehen.
              </p>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <Clock className="mb-2 h-5 w-5 text-emerald-400" />
                    <p className="text-3xl font-semibold">~{result.months} Monate</p>
                    <p className="text-sm text-slate-400">bis zur Integration im Dienst</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <Euro className="mb-2 h-5 w-5 text-emerald-400" />
                    <p className="text-3xl font-semibold">{eur.format(result.direct)}</p>
                    <p className="text-sm text-slate-400">geschätzte Gesamtkosten APÖ-Weg</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-3 text-sm font-medium text-slate-200">
                    Vergleich über {AGENCY_YEARS} Jahre bei {result.total} Stellen
                  </p>
                  {[
                    { label: "APÖ-Weg (einmalig)", value: result.direct, bar: "bg-emerald-500" },
                    { label: "Personalagentur (Mehrkosten)", value: result.agency, bar: "bg-slate-500" },
                  ].map((row) => (
                    <div key={row.label} className="mb-3 last:mb-0">
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{row.label}</span>
                        <span>{eur.format(row.value)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className={cn("h-2 rounded-full transition-all duration-500", row.bar)}
                          style={{ width: `${Math.max(4, (row.value / Math.max(result.direct, result.agency)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="mt-3 text-sm text-slate-300">
                    {result.saving > 0
                      ? `Rechnerischer Vorteil: ${eur.format(result.saving)}`
                      : "Bei dieser Konstellation ist die Agenturlösung rechnerisch nicht teurer."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-3 text-sm font-medium text-slate-200">Compliance-Checkliste</p>
                  <ul className="space-y-2">
                    {checklist.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`mailto:kontakt@apoe.at?subject=${encodeURIComponent("Beratungstermin Bedarfserhebung")}&body=${encodeURIComponent(
                    `DGKP: ${dgkp}, PA: ${pa}, Dringlichkeit: ${URGENCY[urgency].label}`
                  )}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <CalendarCheck className="h-4 w-4" /> Beratungstermin buchen
                </a>
              </>
            )}
            <p className="text-xs text-slate-500">
              Richtwerte zur Orientierung, unverbindlich. Dauer und Kosten hängen von Behörden und Einzelfall ab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
