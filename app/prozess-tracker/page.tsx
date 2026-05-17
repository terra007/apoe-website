import type { Metadata } from "next";
import ProcessTracker from "@/components/ProcessTracker";
import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Prozess-Tracker – Nostrifizierung & RWR-Karte",
  description:
    "Interaktiver Überblick über den gesamten APÖ-Prozess: Von der Rekrutierung in Bangkok bis zur vollständigen Nostrifizierung als DGKP in Österreich.",
};

export default function ProzessTrackerPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-hero-gradient py-16">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-flex">
              Interaktiver Prozess-Überblick
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Nostrifizierungs- &{" "}
              <span className="text-red-austria">RWR-Prozess-Tracker</span>
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed">
              Verfolgen Sie jeden Schritt des APÖ-Prozesses – von der Rekrutierung
              in Bangkok bis zum anerkannten DGKP in Österreich. Vollständig
              transparent, rechtssicher und planbar.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-navy-300">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-red-austria" />
                Gesamtlaufzeit: 15–22 Monate
              </span>
              <span className="h-3 w-px bg-navy-600" />
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-red-austria" />
                4 Phasen
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Tracker Component */}
      <ProcessTracker />

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title mb-10">Häufige Fragen zum Prozess</h2>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-navy-100 bg-white shadow-sm overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-navy-900 hover:bg-navy-50 transition-colors list-none">
                  {q}
                  <span className="flex-shrink-0 text-navy-400 group-open:rotate-180 transition-transform duration-200 select-none">
                    ▾
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-2 text-sm text-navy-600 leading-relaxed border-t border-navy-50">
                  {a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-navy-500 mb-4">
              Weitere Fragen? Unser Beratungsteam steht bereit.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Jetzt Kontakt aufnehmen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    q: "Warum gerade Thailand als Rekrutierungsland?",
    a: "Thailand verfügt über ein hochentwickeltes, staatlich reguliertes Pflegeausbildungssystem. Die Ausbildungsstandards sind mit europäischen Qualifikationen weitgehend kompatibel, was das Nostrifizierungsverfahren erleichtert. Zudem besteht ein bilaterales Memorandum of Understanding zwischen Thailand und Österreich. Die Sprachaffinität und hohe Lernbereitschaft der Kandidatinnen sind weitere Schlüsselfaktoren.",
  },
  {
    q: "Was kostet das APÖ-Gesamtpaket für eine Pflegekraft?",
    a: "Die Kosten variieren je nach Qualifikationsniveau, Anzahl der zu rekrutierenden Pflegekräfte und Spezifika der aufnehmenden Einrichtung. APÖ arbeitet ausschließlich mit Meilenstein-Zahlungen – keine Vorauskasse. Ein detailliertes Angebot erhalten Sie nach der kostenlosen Bedarfserhebung.",
  },
  {
    q: "Wie lange dauert das Nostrifizierungsverfahren tatsächlich?",
    a: "Das Nostrifizierungsverfahren dauert nach Einreise typischerweise 6–12 Monate. Die genaue Dauer hängt von der Äquivalenz des thailändischen Diploms und der zuständigen Landesgesundheitsbehörde ab. In der Zwischenzeit sind die Kandidatinnen als Pflegeassistenz (PA) angestellt und produktiv tätig.",
  },
  {
    q: "Wer trägt das Risiko, wenn eine Pflegekraft das Verfahren abbricht?",
    a: "APÖ übernimmt das Rekrutierungsrisiko durch Ersatzstellungsgarantien. Bricht eine Kandidatin vor Einreise ab, wird kostenfrei Ersatz aus dem bestehenden Bewerber-Pool bereitgestellt. Nach Einreise gilt eine 6-monatige Betreuungsperiode mit Konfliktmediation durch APÖ.",
  },
  {
    q: "Ist das Verfahren mit der österreichischen Gewerbebehörde konform?",
    a: "Ja. APÖ verfügt über die erforderliche Konzession für gewerbliche Arbeitsvermittlung gemäß Gewerbeordnung (GewO 1994) und operiert unter Aufsicht des AMS. Alle Prozesse wurden von der Wirtschaftskammer Österreich (WKO) und spezialisierten Arbeitsrechtskanzleien geprüft.",
  },
];
