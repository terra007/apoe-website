"use client";

// Metadata is set via app/faq/layout.tsx (client components cannot export metadata)
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "allgemein",
    label: "Allgemein",
  },
  {
    id: "kosten",
    label: "Kosten & Finanzierung",
  },
  {
    id: "recht",
    label: "Rechtliches & Compliance",
  },
  {
    id: "prozess",
    label: "Prozess & Zeitrahmen",
  },
  {
    id: "pflegekraefte",
    label: "Die Pflegefachkräfte",
  },
];

const faqs: {
  category: string;
  question: string;
  answer: string;
}[] = [
  // Allgemein
  {
    category: "allgemein",
    question: "Was macht APÖ genau?",
    answer:
      "APÖ – Agentur für Pflegevermittlung Österreich – ist ein konzessioniertes Kompetenzzentrum, das öffentliche Einrichtungen (Gemeinden, Krankenhäuser, Pflegeheime) mit qualifizierten Pflegefachkräften aus Thailand verbindet. Wir übernehmen den gesamten Prozess: von der Auswahl und Sprachausbildung über Visa-Beantragung und Einreise bis hin zur Nostrifizierung und laufenden Integration. Ihr HR-Team wird dabei minimal belastet.",
  },
  {
    category: "allgemein",
    question: "Warum rekrutiert APÖ aus Thailand?",
    answer:
      "Thailand verfügt über ein exzellentes staatliches Pflegeausbildungssystem mit DGKP-äquivalenten Abschlüssen. Thai Pflegefachkräfte gelten international als besonders sorgfältig, empathisch und lernbereit. Zudem unterhält Österreich stabile diplomatische Beziehungen zu Thailand, was Visa-Prozesse vereinfacht. APÖ arbeitet ausschließlich nach den Grundsätzen der WHO-Richtlinie für ethisches internationales Recruiting – keine Abwerbung aus Ländern mit eigenem Pflegemangel.",
  },
  {
    category: "allgemein",
    question: "Für welche Einrichtungen ist APÖ geeignet?",
    answer:
      "APÖ arbeitet ausschließlich im B2G-Bereich (Business-to-Government) mit öffentlichen und gemeinnützigen Trägern: Gemeinden und Städte mit kommunalen Pflegeeinrichtungen, öffentliche Krankenhäuser und Landeskliniken, landeseigene und gemeinnützige Pflegeheime sowie mobile Pflegedienste öffentlicher Träger. Private gewerbliche Pflegebetreiber zählen nicht zu unserer Zielgruppe.",
  },
  {
    category: "allgemein",
    question: "Wie unterscheidet sich APÖ von klassischen Personalvermittlern?",
    answer:
      "Klassische Personalvermittler liefern CV-Listen und stellen eine Rechnung. APÖ übernimmt Gesamtverantwortung: Wir begleiten die Pflegekraft vom Erstgespräch in Bangkok bis zur bestandenen Nostrifizierungsprüfung in Österreich – über einen Zeitraum von 18–24 Monaten. Zusätzlich sind alle unsere Prozesse BVergG-konform und damit ausschreibungsfähig, was für öffentliche Träger ein entscheidender Unterschied ist.",
  },

  // Kosten & Finanzierung
  {
    category: "kosten",
    question: "Was kostet die Vermittlung einer Pflegefachkraft?",
    answer:
      "Die Gesamtkosten hängen vom konkreten Umfang (Anzahl der Kandidatinnen, Qualifikationsziel, Region) ab und werden individuell im Angebot festgelegt. Es gibt keine versteckten Gebühren. Alle Kosten sind transparent in Meilensteinen aufgeteilt – Sie zahlen nur bei tatsächlich erreichtem Fortschritt. Kontaktieren Sie uns für ein unverbindliches Angebot mit konkreten Zahlen.",
  },
  {
    category: "kosten",
    question: "Wie funktionieren die Meilenstein-Zahlungen?",
    answer:
      "Es gibt keine Vorauskasse. Zahlungen sind an definierte, objektiv messbare Projektereignisse geknüpft: z. B. nach bestandener Deutschprüfung (B1/B2), nach erteiltem Visum und erfolgter Einreise, sowie nach abgeschlossener Nostrifizierung. So tragen Sie kein finanzielles Risiko für Leistungen, die noch nicht erbracht wurden.",
  },
  {
    category: "kosten",
    question: "Gibt es Fördermöglichkeiten für öffentliche Träger?",
    answer:
      "Ja. Für kommunale Träger gibt es in mehreren Bundesländern Förderprogramme zur Fachkräftegewinnung im Pflegebereich (z. B. über den Pflegefonds oder ESF-Programme). APÖ unterstützt Sie bei der Identifikation relevanter Förderungen und stellt alle notwendigen Nachweisdokumente bereit. Sprechen Sie uns darauf an – wir kennen die Förderlandschaft in allen österreichischen Bundesländern.",
  },
  {
    category: "kosten",
    question: "Was passiert kostenmäßig, wenn eine Kandidatin den Prozess abbricht?",
    answer:
      "Da Zahlungen nur an erreichten Meilensteinen fällig werden, entstehen Ihnen für nicht abgeschlossene Schritte keine Kosten. Bricht eine Kandidatin vor einem Meilenstein ab, stellt APÖ auf eigene Kosten eine Ersatzkandidatin bereit. Details regelt der Dienstleistungsvertrag, den wir transparent vor Projektbeginn gemeinsam abstimmen.",
  },

  // Rechtliches & Compliance
  {
    category: "recht",
    question: "Ist die internationale Rekrutierung aus Thailand rechtlich zulässig?",
    answer:
      "Ja, vollumfänglich. Österreich hat keine Beschäftigungsbeschränkungen für thai Staatsangehörige im Pflegebereich. Das Verfahren läuft über die regulären Kanäle: Arbeitsgenehmigung gemäß AuslBG, Anerkennung der Berufsqualifikation durch die zuständige Gesundheitsbehörde (Nostrifizierung), und Aufenthaltstitel gemäß NAG. APÖ arbeitet mit spezialisierten Migrationsrechtsanwälten zusammen, die jeden Schritt rechtssicher begleiten.",
  },
  {
    category: "recht",
    question: "Wie sind die Pflegekräfte angestellt – bei APÖ oder bei meiner Einrichtung?",
    answer:
      "Die Pflegekräfte werden direkt bei Ihrer Einrichtung angestellt und erhalten einen österreichischen Arbeitsvertrag gemäß dem relevanten Kollektivvertrag (z. B. SWÖ-KV oder Gemeindebedienstetengesetz). APÖ tritt als Arbeitsvermittler auf und begleitet den gesamten Prozess – die Beschäftigung liegt von Anfang an bei Ihrer Einrichtung, nicht bei APÖ.",
  },
  {
    category: "recht",
    question: "Was ist die Nostrifizierung und wie lange dauert sie?",
    answer:
      "Die Nostrifizierung ist die offizielle Anerkennung eines ausländischen Pflegediploms durch die zuständige österreichische Landesbehörde. Sie mündet in der vollständigen Berufsqualifikation als Diplomierter Gesundheits- und Krankenpfleger (DGKP) – das höchste Pflegediplom in Österreich. Der Prozess dauert typischerweise 12–18 Monate und umfasst Ergänzungsprüfungen und ggf. praktische Anpassungsmaßnahmen. APÖ begleitet diesen Prozess vollständig.",
  },
  {
    category: "recht",
    question: "Sind APÖ-Leistungen im Rahmen öffentlicher Vergabe beschaffbar?",
    answer:
      "Ja. Alle APÖ-Leistungen sind BVergG 2018-konform beschaffbar. Wir stellen vollständige Vergabeunterlagen bereit: Leistungsbeschreibungen mit CPV-Codes (85141000, 85310000), Bewertungsmatrizen für Qualitätskriterien, Musterverträge und Kalkulationsvorlagen. Damit sind Direktvergaben bis € 100.000 sowie Verhandlungsverfahren und offene Verfahren möglich.",
  },

  // Prozess & Zeitrahmen
  {
    category: "prozess",
    question: "Wie lange dauert der Gesamtprozess von Erstkontakt bis Dienstantritt?",
    answer:
      "Von der Vertragsunterzeichnung bis zum ersten Arbeitstag in Ihrer Einrichtung vergehen typischerweise 9–14 Monate. Der größte Zeitblock entfällt auf die Sprachausbildung (B2-Niveau, ca. 6–8 Monate in Thailand) und das Visumverfahren (2–4 Monate). Die anschließende Nostrifizierung läuft berufsbegleitend und dauert weitere 12–18 Monate – in dieser Zeit ist die Pflegekraft jedoch bereits vollwertig als Pflegeassistenz tätig.",
  },
  {
    category: "prozess",
    question: "Wie läuft das Erstgespräch ab?",
    answer:
      "Das Erstgespräch (ca. 60–90 Minuten, persönlich oder per Video) dient der Bedarfserhebung: Wir erfassen Anzahl und Qualifikationsprofil der benötigten Stellen, regionalen Standort, Zeitrahmen und Budget. Im Anschluss erhalten Sie innerhalb von 5 Werktagen ein unverbindliches, detailliertes Angebot. Das Gespräch ist kostenlos und unverbindlich.",
  },
  {
    category: "prozess",
    question: "Wie werde ich während des laufenden Prozesses informiert?",
    answer:
      "Sie erhalten Zugang zum APÖ Prozess-Tracker – einem digitalen Dashboard, das den aktuellen Status jeder Kandidatin in Echtzeit anzeigt: aktueller Meilenstein, nächster Schritt, benötigte Unterlagen von Ihrer Seite. Zusätzlich gibt es monatliche Statusberichte und einen fixen Ansprechpartner bei APÖ für alle Rückfragen.",
  },
  {
    category: "prozess",
    question: "Was sind die Voraussetzungen für meine Einrichtung?",
    answer:
      "Ihre Einrichtung benötigt eine gültige Betriebsbewilligung, einen aufrechten Kollektivvertrag und die Bereitschaft, die Pflegekraft während der Nostrifizierungsphase als Pflegeassistenz anzustellen (mit schrittweiser Übernahme von DGKP-Aufgaben nach Anerkennung). APÖ unterstützt Sie bei der Vorbereitung aller notwendigen Unterlagen für die Behörden.",
  },

  // Pflegefachkräfte
  {
    category: "pflegekraefte",
    question: "Welche Qualifikationen haben die vermittelten Kandidatinnen?",
    answer:
      "Alle APÖ-Kandidatinnen verfügen über ein staatlich anerkanntes Pflegediplom aus Thailand (Bachelor of Nursing Science, B.N.S.), das dem österreichischen DGKP-Abschluss inhaltlich entspricht. Voraussetzung für die Aufnahme ins APÖ-Programm ist mindestens 2 Jahre Berufserfahrung in einem Krankenhaus oder Pflegeheim sowie ein Voreignungstest, der fachliche und persönliche Eignung prüft.",
  },
  {
    category: "pflegekraefte",
    question: "Welches Deutsch-Niveau haben die Kandidatinnen bei Einreise?",
    answer:
      "Bei Einreise verfügen alle Kandidatinnen über ein zertifiziertes B2-Niveau (Goethe-Zertifikat B2 oder ÖSD Zertifikat B2). Die Sprachausbildung findet im Rahmen eines intensiven 6–8-monatigen Programms in Thailand statt, das APÖ organisiert und finanziert. Viele Kandidatinnen erreichen im ersten Österreich-Jahr C1-Niveau durch die tägliche Praxis.",
  },
  {
    category: "pflegekraefte",
    question: "Wie wird die soziale Integration in Österreich begleitet?",
    answer:
      "APÖ betreibt ein strukturiertes Post-Migration-Programm: Unterstützung bei Wohnungssuche und Behördengängen in den ersten Wochen, Buddy-System mit bereits integrierten Thai-Pflegekräften, monatliche Gruppentreffen und individuelle Beratung bei Alltagsfragen. Ziel ist eine nachhaltige Integration, die Fluktuation minimiert – unsere Pflegekräfte bleiben durchschnittlich über 5 Jahre in der vermittelten Einrichtung.",
  },
  {
    category: "pflegekraefte",
    question: "Kann ich Kandidatinnen vor der Einstellung kennenlernen?",
    answer:
      "Ja. Vor der finalen Zusage führen Sie ein strukturiertes Video-Interview mit ausgewählten Kandidatinnen durch (auf Deutsch). Sie erhalten vorab vollständige Profile mit Lebenslauf, Diplomen, Referenzen und einem kurzen Vorstellungsvideo. Die Entscheidung für eine Kandidatin liegt immer bei Ihrer Einrichtung.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-navy-200 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-navy-50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-navy-900">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-navy-400 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 bg-white border-t border-navy-100">
          <p className="text-sm text-navy-600 leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("allgemein");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-16" aria-labelledby="faq-heading">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider mb-5 inline-block">
              Häufige Fragen
            </span>
            <h1 id="faq-heading" className="text-4xl font-extrabold text-white sm:text-5xl">
              Ihre Fragen –{" "}
              <span className="text-red-austria">unsere Antworten</span>
            </h1>
            <p className="mt-4 text-lg text-navy-200 leading-relaxed">
              Alles Wichtige zu Prozess, Kosten, Rechtslage und den Pflegefachkräften –
              kompakt und transparent aufbereitet für öffentliche Träger.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-navy-50 py-16">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar */}
            <aside className="lg:w-56 flex-shrink-0">
              <nav aria-label="FAQ Kategorien">
                <ul className="flex lg:flex-col gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setOpenIndex(0);
                        }}
                        className={cn(
                          "w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                          activeCategory === cat.id
                            ? "bg-navy-900 text-white"
                            : "bg-white text-navy-600 hover:bg-navy-100 hover:text-navy-900"
                        )}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* FAQ List */}
            <div className="flex-1 flex flex-col gap-3">
              {filtered.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-austria/20">
                <MessageCircle className="h-6 w-6 text-red-austria" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Ihre Frage war nicht dabei?
                </h2>
                <p className="mt-1 text-sm text-navy-300">
                  Unser Beratungsteam beantwortet alle offenen Fragen persönlich –
                  kostenlos und unverbindlich.
                </p>
              </div>
            </div>
            <Link href="/kontakt" className="btn-primary flex-shrink-0">
              Jetzt Frage stellen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
