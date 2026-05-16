import { CheckCircle2, Globe2, HandshakeIcon, Scale } from "lucide-react";

const trustPoints = [
  {
    icon: Globe2,
    title: "WHO-Verhaltenskodex",
    description:
      "Alle Rekrutierungsmaßnahmen entsprechen vollumfänglich dem WHO Global Code of Practice on the International Recruitment of Health Personnel.",
  },
  {
    icon: CheckCircle2,
    title: "Fair Recruitment ILO",
    description:
      "Einhaltung der ILO-Grundsätze für faire Anwerbung: keine Gebühren für Arbeitnehmende, transparente Vertragsbedingungen, freiwillige Migration.",
  },
  {
    icon: Scale,
    title: "Österreichisches Arbeitsrecht",
    description:
      "Vollständige Konformität mit AÜG, AuslBG und den Kollektivverträgen des Gesundheits- und Sozialbereichs. Begleitung durch Arbeitsrechtskanzleien.",
  },
  {
    icon: HandshakeIcon,
    title: "Bilaterales MOU TH–AT",
    description:
      "Zusammenarbeit im Rahmen des bilateralen Memorandums of Understanding zwischen dem Königreich Thailand und der Republik Österreich.",
  },
];

const partnerLogos = [
  { name: "Bundeministerium für Soziales", abbr: "BMSÖ" },
  { name: "Arbeitsmarktservice Österreich", abbr: "AMS" },
  { name: "Österreichisches Rotes Kreuz", abbr: "ÖRK" },
  { name: "Gemeinde- und Städtebund", abbr: "GStB" },
];

export default function TrustIndicators() {
  return (
    <section className="bg-navy-50 py-12 sm:py-20" aria-labelledby="trust-heading">
      <div className="container-wide">
        {/* Partner Logos */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-6">
            In Abstimmung mit öffentlichen Stellen und Verbänden
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partnerLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-14 min-w-[120px] items-center justify-center rounded-lg border-2 border-navy-200 bg-white px-5 text-sm font-bold text-navy-400 shadow-sm"
                title={logo.name}
                aria-label={logo.name}
              >
                {logo.abbr}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-navy-400">
            * Logointegration erfolgt nach Abschluss der Kooperationsvereinbarungen
          </p>
        </div>

        {/* Ethics Section */}
        <div className="text-center mb-12">
          <h2 id="trust-heading" className="section-title">
            Ethisches Recruitment & Compliance
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Unsere Vermittlungsprozesse unterliegen den höchsten internationalen
            Standards zum Schutz der Arbeitnehmenden und der aufnehmenden
            Gesundheitseinrichtungen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {trustPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-navy-100">
                <Icon className="h-6 w-6 text-navy-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-navy-900 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
