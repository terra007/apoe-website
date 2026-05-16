import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der APÖ GmbH gemäß DSGVO (Art. 13, 14).",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
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
            <Lock className="h-5 w-5 text-navy-600" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900">
            Datenschutzerklärung
          </h1>
        </div>

        <div className="text-sm text-navy-700 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              1. Verantwortlicher (Art. 4 Nr. 7 DSGVO)
            </h2>
            <div className="rounded-xl border border-navy-100 bg-navy-50 p-5 text-sm space-y-1">
              <p>
                <strong>APÖ GmbH</strong> (Agentur für Pflegevermittlung Österreich)
              </p>
              <p>Musterstraße 1, 1010 Wien, Österreich</p>
              <p>
                E-Mail:{" "}
                <a href="mailto:datenschutz@apoesterreich.at" className="text-red-austria hover:underline">
                  datenschutz@apoesterreich.at
                </a>
              </p>
              <p>Telefon: +43 1 234 567 890</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              2. Erhobene Daten & Zwecke der Verarbeitung
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-navy-200">
                <thead>
                  <tr className="bg-navy-50">
                    <th className="border border-navy-200 px-3 py-2 text-left font-semibold text-navy-700">Datenkategorie</th>
                    <th className="border border-navy-200 px-3 py-2 text-left font-semibold text-navy-700">Zweck</th>
                    <th className="border border-navy-200 px-3 py-2 text-left font-semibold text-navy-700">Rechtsgrundlage</th>
                    <th className="border border-navy-200 px-3 py-2 text-left font-semibold text-navy-700">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-navy-50/50"}>
                      <td className="border border-navy-200 px-3 py-2">{row.category}</td>
                      <td className="border border-navy-200 px-3 py-2">{row.purpose}</td>
                      <td className="border border-navy-200 px-3 py-2">{row.basis}</td>
                      <td className="border border-navy-200 px-3 py-2">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              3. Kontaktformular
            </h2>
            <p className="leading-relaxed">
              Bei Nutzung des Kontaktformulars werden die eingegebenen Daten
              (Name, Organisation, E-Mail, Telefon, Nachricht) ausschließlich zur
              Bearbeitung Ihrer Anfrage verarbeitet. Die Verarbeitung erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
              bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Beantwortung von Anfragen). Daten werden nicht an Dritte
              weitergegeben und nach Abschluss der Bearbeitung gelöscht, sofern
              keine gesetzliche Aufbewahrungspflicht besteht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              4. Hosting & technische Infrastruktur
            </h2>
            <p className="leading-relaxed">
              Diese Website wird auf{" "}
              <strong>Vercel Inc.</strong> (340 Pine Street, Suite 701, San
              Francisco, CA 94104, USA) gehostet. Bei jedem Aufruf werden
              technisch notwendige Server-Logfiles (IP-Adresse, Zeitstempel,
              Browser-Typ, aufgerufene URL) für maximal 30 Tage gespeichert.
              Vercel ist EU-US Data Privacy Framework zertifiziert. Die
              Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO. Details:{" "}
              <span className="text-navy-500">vercel.com/legal/privacy-policy</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">5. Cookies</h2>
            <p className="leading-relaxed">
              Diese Website verwendet ausschließlich technisch notwendige Cookies,
              die für den Betrieb der Website erforderlich sind (Session-Cookies,
              keine Tracking-Cookies). Es werden keine Analyse-, Marketing- oder
              Drittanbieter-Cookies gesetzt. Eine Einwilligung gemäß § 165 Abs. 3
              TKG 2021 ist für technisch notwendige Cookies nicht erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              6. Ihre Rechte (Art. 15–22 DSGVO)
            </h2>
            <ul className="space-y-1.5 leading-relaxed list-disc pl-5">
              <li>
                <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Recht auf Auskunft
                über gespeicherte personenbezogene Daten.
              </li>
              <li>
                <strong>Berichtigung (Art. 16 DSGVO):</strong> Recht auf Berichtigung
                unrichtiger Daten.
              </li>
              <li>
                <strong>Löschung (Art. 17 DSGVO):</strong> Recht auf Löschung
                („Recht auf Vergessenwerden").
              </li>
              <li>
                <strong>Einschränkung (Art. 18 DSGVO):</strong> Recht auf
                Einschränkung der Verarbeitung.
              </li>
              <li>
                <strong>Widerspruch (Art. 21 DSGVO):</strong> Recht auf Widerspruch
                gegen die Verarbeitung bei berechtigtem Interesse.
              </li>
              <li>
                <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Recht auf
                Herausgabe Ihrer Daten in maschinenlesbarem Format.
              </li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:datenschutz@apoesterreich.at" className="text-red-austria hover:underline">
                datenschutz@apoesterreich.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              7. Beschwerderecht
            </h2>
            <p className="leading-relaxed">
              Sie haben das Recht, bei der zuständigen Datenschutzbehörde Beschwerde
              einzulegen:
            </p>
            <div className="mt-2 rounded-lg border border-navy-100 bg-navy-50 p-4 text-sm">
              <p className="font-semibold">Österreichische Datenschutzbehörde (DSB)</p>
              <p>Barichgasse 40-42, 1030 Wien</p>
              <p>E-Mail: dsb@dsb.gv.at | Tel: +43 1 52 152-0</p>
              <p>Web: dsb.gv.at</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              8. Aktualität dieser Erklärung
            </h2>
            <p className="leading-relaxed">
              Diese Datenschutzerklärung wird bei Änderungen der
              Datenverarbeitungspraktiken oder gesetzlichen Anforderungen
              aktualisiert. Es gilt jeweils die auf der Website veröffentlichte
              Fassung.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 border-t border-navy-100 pt-5">
            <p className="text-xs text-navy-400 flex-1">
              Stand:{" "}
              {new Date().toLocaleDateString("de-AT", {
                year: "numeric",
                month: "long",
              })}
            </p>
            <Link href="/impressum" className="text-xs text-navy-500 hover:text-navy-900 underline">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const dataTable = [
  {
    category: "Kontaktformular-Daten",
    purpose: "Bearbeitung von Anfragen",
    basis: "Art. 6 I lit. b/f DSGVO",
    duration: "6 Monate nach Abschluss",
  },
  {
    category: "Server-Logfiles",
    purpose: "IT-Sicherheit, Fehleranalyse",
    basis: "Art. 6 I lit. f DSGVO",
    duration: "30 Tage",
  },
  {
    category: "Vertragsdaten (B2G)",
    purpose: "Vertragserfüllung",
    basis: "Art. 6 I lit. b DSGVO",
    duration: "7 Jahre (UGB § 212)",
  },
  {
    category: "E-Mail-Korrespondenz",
    purpose: "Kommunikation & Dokumentation",
    basis: "Art. 6 I lit. f DSGVO",
    duration: "7 Jahre",
  },
];
