import Link from "next/link";
import { BookOpen, FileText, GraduationCap, ArrowRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: BookOpen,
    title: "Selektion & Sprache",
    subtitle: "Rekrutierung in Thailand",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    numberColor: "text-blue-200",
    points: [
      "Kooperation mit akkreditierten Pflegehochschulen in Bangkok & Chiang Mai",
      "Strenge Vorauswahl: Fachkenntnisse, Motivation, sozialer Hintergrund",
      "Berufsbegleitender Deutsch-Intensivkurs bis Niveau B1 (ÖSD-zertifiziert)",
      "Kulturelles Vorbereitungsprogramm zum Leben und Arbeiten in Österreich",
    ],
    duration: "6 Monate",
  },
  {
    number: "02",
    icon: FileText,
    title: "Legal & Visa",
    subtitle: "RWR-Karte & Einreise",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    numberColor: "text-red-200",
    points: [
      "Vollständige Antragstellung für die Rot-Weiß-Rot-Karte (Fachkraft Pflege)",
      "Botschafts-Legalisation aller Dokumente (Zeugnisse, Strafregister, Gesundheitsatteste)",
      "Begleitung durch spezialisierte Migrationsrechtsanwälte",
      "Koordination mit AMS und dem Bundesministerium für Inneres",
    ],
    duration: "2–3 Monate",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Post-Migration & Nostrifizierung",
    subtitle: "Integration & Aufstieg",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    numberColor: "text-green-200",
    points: [
      "Begleitung bei Wohnungssuche, Behördengängen und Sozialversicherung",
      "Anstellung als Pflegeassistenz (PA) während laufender Nostrifizierung",
      "Antrag auf Nostrifizierung zum/zur DGKP bei der zuständigen Gesundheitsbehörde",
      "Mentoring-Programm durch erfahrene österreichische Pflegekräfte",
    ],
    duration: "6–12 Monate",
  },
];

export default function ThreePillars() {
  return (
    <section className="bg-white py-20" aria-labelledby="pillars-heading">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 id="pillars-heading" className="section-title">
            Das APÖ 3-Säulen-Erfolgsmodell
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Von der Rekrutierung in Bangkok bis zum anerkannten Diplomierten
            Gesundheits- und Krankenpfleger in Österreich — ein lückenloser,
            rechtssicherer Prozess.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pillars.map(
            ({
              number,
              icon: Icon,
              title,
              subtitle,
              color,
              iconBg,
              iconColor,
              numberColor,
              points,
              duration,
            }) => (
              <div
                key={number}
                className={`relative rounded-2xl border-2 ${color} p-7 overflow-hidden`}
              >
                {/* Background number */}
                <span
                  className={`absolute top-4 right-5 text-7xl font-black ${numberColor} select-none`}
                  aria-hidden="true"
                >
                  {number}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} mb-4`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-bold text-navy-900 leading-tight">
                  {title}
                </h3>
                <p className="relative z-10 text-sm font-medium text-navy-500 mb-4">
                  {subtitle}
                </p>

                {/* Points */}
                <ul className="relative z-10 space-y-2 mb-5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy-400" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Duration Badge */}
                <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-navy-700 border border-navy-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-austria" aria-hidden="true" />
                  Laufzeit: {duration}
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/prozess-tracker" className="btn-secondary">
            Interaktiven Prozess-Tracker öffnen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
