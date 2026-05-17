import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import BewerbungsForm from "@/components/BewerbungsForm";

export const metadata: Metadata = {
  title: "Bewerben – Pflegekarriere in Österreich",
  description:
    "Starten Sie Ihre Pflegekarriere in Österreich. APÖ begleitet Sie von der Bewerbung bis zur Vermittlung – Nostrifizierung, Visa und Jobvermittlung aus einer Hand.",
};

const vorteile = [
  {
    icon: Heart,
    title: "Persönliche Begleitung",
    text: "Von der Bewerbung bis zum ersten Arbeitstag stehen wir Ihnen mit einem festen Ansprechpartner zur Seite.",
  },
  {
    icon: ShieldCheck,
    title: "Rechtliche Unterstützung",
    text: "Wir begleiten Sie durch die Nostrifizierung, den Rot-Weiß-Rot-Karten-Prozess und alle bürokratischen Schritte.",
  },
  {
    icon: Users,
    title: "Direkte Vermittlung",
    text: "Wir vermitteln ausschließlich an öffentliche Träger in Österreich – sichere Arbeitsstellen mit fairen Bedingungen.",
  },
];

const prozessSchritte = [
  {
    nr: "01",
    titel: "Online-Bewerbung",
    beschreibung: "Füllen Sie das Bewerbungsformular aus und senden Sie Ihre Unterlagen. Wir melden uns innerhalb von 5 Werktagen.",
  },
  {
    nr: "02",
    titel: "Eignungsgespräch",
    beschreibung: "Ein Video-Call mit unserem Team – wir besprechen Ihre Qualifikation, Erwartungen und den weiteren Ablauf.",
  },
  {
    nr: "03",
    titel: "Dokumentenprüfung & Nostrifizierung",
    beschreibung: "Wir prüfen Ihre Unterlagen, koordinieren die Anerkennung Ihrer Ausbildung und unterstützen beim Visumantrag.",
  },
  {
    nr: "04",
    titel: "Vermittlung & Start",
    beschreibung: "Nach erfolgreicher Anerkennung werden Sie an einen österreichischen Träger vermittelt und starten Ihre Karriere.",
  },
];

const voraussetzungen = [
  { icon: GraduationCap, text: "Abgeschlossene Pflegeausbildung (mind. Pflegeassistenz oder gleichwertig)" },
  { icon: Languages, text: "Deutschkenntnisse mind. A2 (B1 empfohlen, B2 für DGKP erforderlich)" },
  { icon: Star, text: "Mindestens 1 Jahr Berufserfahrung in der Pflege" },
  { icon: Globe, text: "Bereitschaft, in Österreich zu arbeiten und zu leben" },
  { icon: FileText, text: "Bereitschaft zur Nostrifizierung (Anerkennung Ihrer Ausbildung)" },
  { icon: Heart, text: "Freude an der Arbeit mit älteren und pflegebedürftigen Menschen" },
];

const dokumente = [
  {
    kategorie: "Persönliche Dokumente",
    farbe: "bg-blue-50 border-blue-200",
    titelFarbe: "text-blue-800",
    items: [
      "Gültiger Reisepass (mind. 2 Jahre Restlaufzeit)",
      "Geburtsurkunde",
      "Polizeiliches Führungszeugnis (nicht älter als 3 Monate)",
      "Aktuelles Lichtbild (Passfoto)",
    ],
  },
  {
    kategorie: "Ausbildungsnachweise",
    farbe: "bg-purple-50 border-purple-200",
    titelFarbe: "text-purple-800",
    items: [
      "Pflegediplom / Abschlusszeugnis der Pflegeausbildung (Original)",
      "Lehrplan mit Stundenübersicht (Theorie & Praxis je Fach)",
      "Nachweis über den Status der Ausbildungseinrichtung",
      "Alle Dokumente: beglaubigte deutsche Übersetzung durch gerichtlich beeideten Dolmetscher",
      "Apostille-Beglaubigung der Originaldokumente (wo erforderlich)",
    ],
  },
  {
    kategorie: "Berufserfahrung",
    farbe: "bg-green-50 border-green-200",
    titelFarbe: "text-green-800",
    items: [
      "Arbeitszeugnisse / Beschäftigungsnachweise",
      "Stellenbeschreibungen bisheriger Tätigkeiten",
      "Referenzschreiben (optional, empfohlen)",
    ],
  },
  {
    kategorie: "Sprachnachweis",
    farbe: "bg-yellow-50 border-yellow-200",
    titelFarbe: "text-yellow-800",
    items: [
      "Deutschzertifikat von anerkannter Institution",
      "Anerkannte Anbieter: ÖSD, Goethe-Institut, telc, ÖIF",
      "Pflegeassistenz: mind. A2 | Pflegefachassistenz: B1 | DGKP: B2",
    ],
  },
];

const faqItems = [
  {
    frage: "Welche Pflegeausbildungen werden in Österreich anerkannt?",
    antwort:
      "Grundsätzlich können alle pflegerischen Ausbildungen durch die Nostrifizierung anerkannt werden. Die zuständige Behörde prüft, ob Ihre Ausbildung vergleichbar mit österreichischen Standards ist. Fehlende Ausbildungsinhalte werden ggf. durch Ergänzungskurse nachgeholt.",
  },
  {
    frage: "Wie lange dauert der gesamte Prozess bis zur Arbeitsstelle?",
    antwort:
      "Erfahrungsgemäß dauert der Prozess 12–18 Monate: Die Nostrifizierung allein nimmt 2–4 Monate in Anspruch, der Rot-Weiß-Rot-Karten-Antrag weitere 4–8 Wochen. APÖ begleitet Sie durch alle Schritte.",
  },
  {
    frage: "Muss ich Deutsch können, bevor ich mich bewerbe?",
    antwort:
      "Nein – Sie können sich auch ohne oder mit geringen Deutschkenntnissen bewerben. Wir beraten Sie, welche Sprachkurse empfohlen werden und wie Sie am besten vorgehen. Das erforderliche Niveau hängt von Ihrer Ausbildung ab.",
  },
  {
    frage: "Entstehen mir Kosten durch die Vermittlung?",
    antwort:
      "Die Vermittlung durch APÖ ist für Bewerberinnen und Bewerber kostenlos. Behördliche Gebühren (z. B. für die Nostrifizierung, ca. € 250, oder den Visa-Antrag) müssen selbst getragen werden.",
  },
  {
    frage: "Welches Gehalt kann ich in Österreich erwarten?",
    antwort:
      "Das Mindestgehalt für Pflegekräfte mit Rot-Weiß-Rot-Karte beträgt 2026 mind. € 3.465 brutto/Monat. Je nach Qualifikation, Träger und Region kann das Gehalt deutlich höher liegen. Österreich bietet zudem starke Kollektivverträge.",
  },
  {
    frage: "Kann ich meine Familie nach Österreich mitbringen?",
    antwort:
      "Ja – nach einer Mindestbeschäftigungsdauer ist Familienzusammenführung möglich. APÖ informiert Sie über die genauen Voraussetzungen im persönlichen Gespräch.",
  },
];

export default function BewerberPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider mb-6 inline-flex">
              Jetzt bewerben
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Ihre Pflegekarriere{" "}
              <span className="text-red-austria">in Österreich</span>
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-2xl">
              APÖ begleitet qualifizierte Pflegekräfte aus dem Ausland auf ihrem
              Weg nach Österreich – von der Bewerbung über die Nostrifizierung bis
              zur sicheren Arbeitsstelle bei einem öffentlichen Träger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#bewerbungsformular" className="btn-primary">
                Jetzt bewerben
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#dokumente" className="btn-outline-white">
                Dokumente ansehen
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { label: "Kandidatinnen vermittelt", wert: "50+" },
                { label: "Öffentliche Träger", wert: "20+" },
                { label: "Herkunftsländer", wert: "5+" },
              ].map(({ label, wert }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{wert}</div>
                  <div className="text-xs text-navy-300 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Warum APÖ?</h2>
            <p className="section-subtitle mt-3 max-w-2xl mx-auto">
              Als spezialisierte Vermittlungsagentur kennen wir jeden Schritt des
              Prozesses – und begleiten Sie persönlich durch alle Herausforderungen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vorteile.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-austria/10">
                  <Icon className="h-6 w-6 text-red-austria" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voraussetzungen */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-title mb-4">Voraussetzungen</h2>
              <p className="section-subtitle mb-8">
                Diese Grundvoraussetzungen sollten Sie mitbringen, um als Pflegekraft
                in Österreich zugelassen zu werden.
              </p>
              <ul className="space-y-3">
                {voraussetzungen.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-red-austria flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-navy-700 leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Was wir für Sie tun</h3>
              <ul className="space-y-4">
                {[
                  "Kostenlose Erstberatung und Eignungsprüfung",
                  "Koordination und Begleitung der Nostrifizierung",
                  "Unterstützung beim Rot-Weiß-Rot-Karten-Antrag",
                  "Vorbereitung auf österreichische Arbeitsbedingungen",
                  "Direktvermittlung an geprüfte öffentliche Träger",
                  "Ansprechpartner während der gesamten Einarbeitungszeit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-austria flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-navy-200 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Ihr Weg zu uns</h2>
            <p className="section-subtitle mt-3 max-w-xl mx-auto">
              In vier Schritten von der Bewerbung bis zur Arbeitsstelle in Österreich.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prozessSchritte.map(({ nr, titel, beschreibung }) => (
              <div key={nr} className="card relative flex flex-col gap-3">
                <div className="text-4xl font-extrabold text-red-austria/20 leading-none">{nr}</div>
                <h3 className="text-base font-bold text-navy-900">{titel}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{beschreibung}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dokumente */}
      <section id="dokumente" className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Benötigte Dokumente</h2>
            <p className="section-subtitle mt-3 max-w-2xl mx-auto">
              Bereiten Sie diese Unterlagen vor. Alle fremdsprachigen Dokumente
              müssen von einem gerichtlich beeideten Dolmetscher ins Deutsche
              übersetzt werden.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dokumente.map(({ kategorie, farbe, titelFarbe, items }) => (
              <div key={kategorie} className={`rounded-xl border p-6 ${farbe}`}>
                <h3 className={`text-base font-bold mb-4 ${titelFarbe}`}>{kategorie}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-4">
            <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Hinweis zur Beglaubigung</p>
              <p className="text-sm text-amber-700">
                Alle Originaldokumente aus Nicht-EU-Ländern benötigen eine{" "}
                <strong>Apostille-Beglaubigung</strong> sowie eine beglaubigte deutsche Übersetzung
                durch einen in Österreich zugelassenen Dolmetscher. Wir helfen Ihnen dabei, die
                richtigen Stellen zu kontaktieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bewerbungsformular */}
      <section id="bewerbungsformular" className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="section-title mb-2">Jetzt bewerben</h2>
              <p className="text-navy-500 mb-8">
                Füllen Sie das Formular aus – wir melden uns innerhalb von 5 Werktagen.
              </p>
              <BewerbungsForm />
            </div>
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-base font-bold text-navy-900 mb-4">Direktkontakt</h3>
                <div className="space-y-3 text-sm">
                  <a
                    href="mailto:office@apoesterreich.at"
                    className="flex items-center gap-2 text-navy-700 hover:text-red-austria transition-colors"
                  >
                    <span className="text-red-austria">@</span>
                    office@apoesterreich.at
                  </a>
                  <p className="text-navy-500 text-xs">
                    Dokumente bitte per E-Mail einreichen, nachdem Sie das Formular ausgefüllt haben.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-800 mb-1">Kostenlose Vermittlung</p>
                <p className="text-xs text-green-700">
                  Die Vermittlung durch APÖ ist für Bewerberinnen und Bewerber vollständig
                  kostenlos. Sie zahlen nur anfallende Behördengebühren.
                </p>
              </div>
              <div className="rounded-xl border border-navy-200 bg-white p-5">
                <p className="text-sm font-semibold text-navy-800 mb-3">Sprachen</p>
                <p className="text-xs text-navy-600">
                  Wir sprechen Deutsch, Englisch und Thailändisch – schreiben Sie uns in
                  der Sprache, in der Sie sich am wohlsten fühlen.
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {["Deutsch", "English", "ภาษาไทย"].map((lang) => (
                    <span key={lang} className="badge bg-navy-100 text-navy-700 border border-navy-200 text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Häufige Fragen</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map(({ frage, antwort }) => (
              <div key={frage} className="rounded-xl border border-navy-100 bg-navy-50 p-6">
                <h3 className="text-base font-bold text-navy-900 mb-2">{frage}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{antwort}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Bereit für Ihren nächsten Schritt?
          </h2>
          <p className="text-navy-200 mb-8 max-w-xl mx-auto">
            Starten Sie Ihre Bewerbung heute – wir begleiten Sie auf dem gesamten Weg nach Österreich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bewerbungsformular" className="btn-primary">
              Jetzt bewerben
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/kontakt" className="btn-outline-white">
              Fragen stellen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
