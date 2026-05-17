import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Download,
  Building2,
  HeartPulse,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Für öffentliche Träger",
  description:
    "Das APÖ Rundum-Sorglos-Paket für Bürgermeister, HR-Direktoren von Kliniken und Geschäftsführer öffentlicher Pflegeheime. Transparente Meilenstein-Zahlungen, rechtssichere Prozesse.",
};

const benefits = [
  {
    icon: ShieldCheck,
    title: "Rechtssicherheit & Compliance",
    description:
      "Vollständige Konformität mit GewO, AuslBG und Kollektivverträgen. Alle Schritte werden von spezialisierten Rechtsanwälten begleitet. Keine rechtlichen Risiken für Ihre Einrichtung.",
  },
  {
    icon: Calendar,
    title: "Meilenstein-Zahlungen",
    description:
      "Keine Vorauskasse. Zahlungen erfolgen ausschließlich an definierten Projektmeilensteinen (nach erfolgter Sprachprüfung, nach Einreise, nach Nostrifizierung). Maximale Kostentransparenz.",
  },
  {
    icon: Users,
    title: "Ganzheitliche Betreuung",
    description:
      "APÖ übernimmt den gesamten Prozess: Auswahl, Sprachkurs, Visa, Einreise, Behördengänge, Wohnungssuche und Nostrifizierungsbegleitung. Ihr HR-Team wird minimal belastet.",
  },
  {
    icon: TrendingUp,
    title: "Langfristige Mitarbeiterbindung",
    description:
      "Durch das strukturierte Post-Migration-Programm und die berufsbegleitende Qualifizierung schaffen wir Loyalität. Unsere Pflegekräfte bleiben durchschnittlich >5 Jahre in der Einrichtung.",
  },
  {
    icon: FileText,
    title: "Ausschreibungskonformität",
    description:
      "Alle Leistungen können im Rahmen öffentlicher Vergabe beschafft werden (BVergG-konform). Wir stellen vollständige Ausschreibungsunterlagen und Leistungsverzeichnisse bereit.",
  },
  {
    icon: HeartPulse,
    title: "Qualifizierte Fachkräfte",
    description:
      "Nur staatlich geprüfte Pflegefachkräfte aus Thailand mit DGKP-Äquivalenz-Diplomen. Zielqualifikation: Vollständige Nostrifizierung zum Diplomierten Gesundheits- und Krankenpfleger (DGKP).",
  },
];

const targetGroups = [
  {
    icon: Building2,
    title: "Gemeinden & Städte",
    subtitle: "Bürgermeister & Gemeindeverwaltung",
    description:
      "Lösen Sie den akuten Pflegemangel in kommunalen Altenheimen und mobilen Pflegediensten. APÖ ermöglicht planbare, budgetkonforme Personalaufstockung.",
  },
  {
    icon: HeartPulse,
    title: "Öffentliche Krankenhäuser",
    subtitle: "Ärztliche Direktoren & HR-Abteilungen",
    description:
      "Schließen Sie offene Stellen auf Normal- und Pflegestationen nachhaltig. Unsere DGKP-Kandidaten erfüllen alle österreichischen Qualifikationsanforderungen.",
  },
  {
    icon: Users,
    title: "Landeseigene Pflegeheime",
    subtitle: "Geschäftsführung & Pflegedienstleitung",
    description:
      "Strukturierte Integration neuer Pflegekräfte mit minimalem Aufwand für Ihr Team. Das APÖ-Onboarding-Programm sorgt für reibungslosen Dienstantritt.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Bedarfserhebung",
    description:
      "Kostenfreies Erstgespräch: Wir erheben Ihren konkreten Bedarf (Anzahl, Qualifikation, Region, Zeitrahmen) und erstellen ein unverbindliches Angebot.",
  },
  {
    step: "02",
    title: "Vertragsabschluss",
    description:
      "Unterzeichnung des Dienstleistungsvertrags mit klar definierten Meilensteinen, Leistungsumfang und Zahlungsplan. Kein finanzielles Risiko für Ihre Einrichtung.",
  },
  {
    step: "03",
    title: "Rekrutierung & Prozess",
    description:
      "APÖ startet den Rekrutierungsprozess in Thailand. Sie erhalten regelmäßige Statusberichte zu den einzelnen Kandidatinnen und Kandidaten.",
  },
  {
    step: "04",
    title: "Dienstantritt & Integration",
    description:
      "Nach Einreise beginnt der Dienstantritt als Pflegeassistenz. APÖ begleitet die gesamte Eingewöhnungsphase und das Nostrifizierungsverfahren.",
  },
];

export default function OeffentlicheTraegerPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-hero-gradient py-20" aria-labelledby="b2g-heading">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider">
                Für öffentliche Träger
              </span>
            </div>
            <h1 id="b2g-heading" className="text-4xl font-extrabold text-white sm:text-5xl">
              Das APÖ{" "}
              <span className="text-red-austria">Rundum-Sorglos-Paket</span>{" "}
              für öffentliche Einrichtungen
            </h1>
            <p className="mt-5 text-lg text-navy-200 leading-relaxed">
              Planbare Personalaufstockung im Pflegebereich – rechtssicher,
              budgetkonform und ohne operative Belastung Ihrer HR-Abteilung.
              Für Gemeinden, Krankenhäuser und öffentliche Pflegeeinrichtungen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/kontakt?subject=Erstgespräch+für+Bedarfserhebung" className="btn-primary">
                Bedarfserhebung starten
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/kontakt?subject=Ausschreibungsunterlagen+anfordern" className="btn-outline-white">
                <Download className="h-4 w-4" aria-hidden="true" />
                Ausschreibungsunterlagen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="bg-white py-16" aria-labelledby="targets-heading">
        <div className="container-wide">
          <h2 id="targets-heading" className="section-title text-center mb-12">
            Für wen ist das APÖ-Modell?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetGroups.map(({ icon: Icon, title, subtitle, description }) => (
              <div key={title} className="card text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100">
                  <Icon className="h-7 w-7 text-navy-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>
                <p className="text-xs font-medium text-red-austria mb-3">{subtitle}</p>
                <p className="text-sm text-navy-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-navy-50 py-16" aria-labelledby="benefits-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="benefits-heading" className="section-title">
              Ihre Vorteile im Überblick
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              APÖ übernimmt Verantwortung – von der Auswahl bis zur vollständigen
              Anerkennung der Pflegefachkraft in Österreich.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-austria/10">
                  <Icon className="h-6 w-6 text-red-austria" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white py-16" aria-labelledby="process-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="process-heading" className="section-title">
              So funktioniert die Zusammenarbeit
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, description }) => (
              <div key={step} className="relative">
                {/* Connector line */}
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-navy-100 -z-10" aria-hidden="true" />

                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 mb-2">{title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="bg-navy-50 py-12">
        <div className="container-wide">
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-navy-600 flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  BVergG-Konformität & öffentliche Vergabe
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed mb-4">
                  Alle APÖ-Leistungen können im Rahmen von öffentlichen
                  Vergabeverfahren gemäß Bundesvergabegesetz (BVergG 2018)
                  beschafft werden. Wir stellen vollständige Unterlagen für
                  Direktvergaben, Verhandlungsverfahren und offene Verfahren bereit:
                  Leistungsbeschreibungen, Bewertungsmatrizen und Musterverträge.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "CPV-Code 85141000",
                    "CPV-Code 85310000",
                    "Direktvergabe bis € 100.000",
                    "Verhandlungsverfahren",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="badge bg-navy-100 text-navy-700 border border-navy-200 text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900 py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Jetzt Bedarfserhebung anfordern
          </h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Kostenfreies Erstgespräch mit unserem B2G-Beratungsteam. Wir erstellen
            Ihnen innerhalb von 5 Werktagen ein maßgeschneidertes Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary">
              Erstgespräch vereinbaren
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/kontakt?subject=Ausschreibungsunterlagen+anfordern" className="btn-outline-white">
              <Download className="h-4 w-4" aria-hidden="true" />
              Ausschreibungsunterlagen anfordern
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
