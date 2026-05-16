import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der APÖ GmbH – Agentur für Pflegevermittlung Österreich.",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-wide max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100">
            <Shield className="h-5 w-5 text-navy-600" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Impressum</h1>
        </div>

        <div className="prose prose-sm max-w-none text-navy-700 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Offenlegung gemäß § 25 Mediengesetz & § 5 ECG
            </h2>
            <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 text-sm space-y-2">
              <p>
                <strong>Firmenname:</strong> APÖ GmbH (Agentur für Pflegevermittlung Österreich)
              </p>
              <p>
                <strong>Rechtsform:</strong> Gesellschaft mit beschränkter Haftung (GmbH)
              </p>
              <p>
                <strong>Firmensitz:</strong> Musterstraße 1, 1010 Wien, Österreich
              </p>
              <p>
                <strong>Firmenbuchnummer:</strong> FN 000000 x (Handelsgericht Wien)
              </p>
              <p>
                <strong>UID-Nummer:</strong> ATU00000000
              </p>
              <p>
                <strong>Gewerbe:</strong> Arbeitsvermittlung / Arbeitskräfteüberlassung
              </p>
              <p>
                <strong>Gewerbebehörde:</strong> Magistratisches Bezirksamt 1010 Wien
              </p>
              <p>
                <strong>Konzession/Reg.-Nr.:</strong> AÜG AT-2024-0001
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Kontakt</h2>
            <div className="text-sm space-y-1">
              <p>
                <strong>E-Mail:</strong>{" "}
                <a href="mailto:office@apoesterreich.at" className="text-red-austria hover:underline">
                  office@apoesterreich.at
                </a>
              </p>
              <p>
                <strong>Telefon:</strong>{" "}
                <a href="tel:+431234567890" className="text-red-austria hover:underline">
                  +43 1 234 567 890
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Geschäftsführung
            </h2>
            <p className="text-sm">Mag. Max Mustermann (Geschäftsführer)</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Unternehmensgegenstand
            </h2>
            <p className="text-sm leading-relaxed">
              Die APÖ GmbH ist ein konzessioniertes Arbeitsvermittlungs- und
              Beratungsunternehmen mit Spezialisierung auf die Rekrutierung und
              Integration von Pflegefachkräften aus dem südostasiatischen Raum für
              den österreichischen öffentlichen Gesundheits- und Pflegesektor.
              Tätigkeiten: Personalvermittlung, Migrationsberatung, Begleitung von
              Nostrifizierungsverfahren, Sprachkursorganisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Anwendbare Rechtsvorschriften
            </h2>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Arbeitskräfteüberlassungsgesetz (AÜG), BGBl. Nr. 196/1988 i.d.g.F.</li>
              <li>Ausländerbeschäftigungsgesetz (AuslBG), BGBl. Nr. 218/1975 i.d.g.F.</li>
              <li>Gewerbeordnung 1994 (GewO 1994), BGBl. Nr. 194/1994 i.d.g.F.</li>
              <li>Gesundheits- und Krankenpflegegesetz (GuKG), BGBl. I Nr. 108/1997 i.d.g.F.</li>
              <li>Bundesvergabegesetz 2018 (BVergG 2018)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Aufsichtsbehörde
            </h2>
            <p className="text-sm">
              Wirtschaftskammer Österreich (WKO), Fachverband Unternehmensberatung,
              Buchhaltung und Informationstechnologie (UBIT) / Sparte Arbeitsvermittlung
              <br />
              Bundesministerium für Arbeit und Wirtschaft (BMAW)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Haftungsausschluss
            </h2>
            <p className="text-sm leading-relaxed">
              Die APÖ GmbH bemüht sich, alle auf dieser Website veröffentlichten
              Informationen aktuell und korrekt zu halten. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte wird jedoch keine Haftung
              übernommen. Externe Links wurden zum Zeitpunkt der Verlinkung auf
              rechtswidrige Inhalte überprüft; eine laufende Überwachung ist ohne
              konkreten Hinweis auf Rechtsverletzungen nicht zumutbar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">Urheberrecht</h2>
            <p className="text-sm leading-relaxed">
              Alle auf dieser Website veröffentlichten Inhalte (Texte, Grafiken,
              Logos) sind urheberrechtlich geschützt. Eine Vervielfältigung,
              Bearbeitung oder Verbreitung bedarf der ausdrücklichen schriftlichen
              Zustimmung der APÖ GmbH.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              Online-Streitbeilegung
            </h2>
            <p className="text-sm leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <span className="text-navy-500">https://ec.europa.eu/consumers/odr</span>
              . Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen, da es sich bei unseren Kunden ausschließlich um
              Unternehmen (B2B/B2G) handelt.
            </p>
          </section>

          <p className="text-xs text-navy-400 border-t border-navy-100 pt-4">
            Stand: {new Date().toLocaleDateString("de-AT", { year: "numeric", month: "long" })}
          </p>
        </div>
      </div>
    </div>
  );
}
