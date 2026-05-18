import type { BewerberT } from "./types";

const de: BewerberT = {
  lang: "de",
  meta: {
    title: "Bewerben – Pflegekarriere in Österreich",
    description:
      "Starten Sie Ihre Pflegekarriere in Österreich. APÖ begleitet Sie von der Bewerbung bis zur Vermittlung – Nostrifizierung, Visa und Jobvermittlung aus einer Hand.",
  },
  langSwitcher: { de: "Deutsch", en: "English", th: "ภาษาไทย" },
  hero: {
    badge: "Jetzt bewerben",
    title: "Ihre Pflegekarriere",
    titleAccent: "in Österreich",
    subtitle:
      "APÖ begleitet qualifizierte Pflegekräfte aus dem Ausland auf ihrem Weg nach Österreich – von der Bewerbung über die Nostrifizierung bis zur sicheren Arbeitsstelle bei einem öffentlichen Träger.",
    ctaPrimary: "Jetzt bewerben",
    ctaSecondary: "Dokumente ansehen",
    stats: [
      { value: "50+", label: "Kandidatinnen vermittelt" },
      { value: "20+", label: "Öffentliche Träger" },
      { value: "5+", label: "Herkunftsländer" },
    ],
  },
  vorteile: {
    sectionTitle: "Warum APÖ?",
    sectionSubtitle:
      "Als spezialisierte Vermittlungsagentur kennen wir jeden Schritt des Prozesses – und begleiten Sie persönlich durch alle Herausforderungen.",
    items: [
      {
        title: "Persönliche Begleitung",
        text: "Von der Bewerbung bis zum ersten Arbeitstag stehen wir Ihnen mit einem festen Ansprechpartner zur Seite.",
      },
      {
        title: "Rechtliche Unterstützung",
        text: "Wir begleiten Sie durch die Nostrifizierung, den Rot-Weiß-Rot-Karten-Prozess und alle bürokratischen Schritte.",
      },
      {
        title: "Direkte Vermittlung",
        text: "Wir vermitteln ausschließlich an öffentliche Träger in Österreich – sichere Arbeitsstellen mit fairen Bedingungen.",
      },
    ],
  },
  voraussetzungen: {
    sectionTitle: "Voraussetzungen",
    sectionSubtitle:
      "Diese Grundvoraussetzungen sollten Sie mitbringen, um als Pflegekraft in Österreich zugelassen zu werden.",
    items: [
      "Abgeschlossene Pflegeausbildung (mind. Pflegeassistenz oder gleichwertig)",
      "Deutschkenntnisse mind. A2 (B1 empfohlen, B2 für DGKP erforderlich)",
      "Mindestens 1 Jahr Berufserfahrung in der Pflege",
      "Bereitschaft, in Österreich zu arbeiten und zu leben",
      "Bereitschaft zur Nostrifizierung (Anerkennung Ihrer Ausbildung)",
      "Freude an der Arbeit mit älteren und pflegebedürftigen Menschen",
    ],
    weOffer: {
      title: "Was wir für Sie tun",
      items: [
        "Kostenlose Erstberatung und Eignungsprüfung",
        "Koordination und Begleitung der Nostrifizierung",
        "Unterstützung beim Rot-Weiß-Rot-Karten-Antrag",
        "Vorbereitung auf österreichische Arbeitsbedingungen",
        "Direktvermittlung an geprüfte öffentliche Träger",
        "Ansprechpartner während der gesamten Einarbeitungszeit",
      ],
    },
  },
  prozess: {
    sectionTitle: "Ihr Weg zu uns",
    sectionSubtitle: "In vier Schritten von der Bewerbung bis zur Arbeitsstelle in Österreich.",
    steps: [
      {
        nr: "01",
        title: "Online-Bewerbung",
        description: "Füllen Sie das Bewerbungsformular aus und senden Sie Ihre Unterlagen. Wir melden uns innerhalb von 5 Werktagen.",
      },
      {
        nr: "02",
        title: "Eignungsgespräch",
        description: "Ein Video-Call mit unserem Team – wir besprechen Ihre Qualifikation, Erwartungen und den weiteren Ablauf.",
      },
      {
        nr: "03",
        title: "Dokumentenprüfung & Nostrifizierung",
        description: "Wir prüfen Ihre Unterlagen, koordinieren die Anerkennung Ihrer Ausbildung und unterstützen beim Visumantrag.",
      },
      {
        nr: "04",
        title: "Vermittlung & Start",
        description: "Nach erfolgreicher Anerkennung werden Sie an einen österreichischen Träger vermittelt und starten Ihre Karriere.",
      },
    ],
  },
  dokumente: {
    sectionTitle: "Benötigte Dokumente",
    sectionSubtitle:
      "Bitte bereiten Sie folgende Unterlagen vor. Pflichtdokumente sind mit einem Sternchen (*) gekennzeichnet.",
    items: [
      { label: "Profilfoto / Passfoto", required: true },
      { label: "Reisepass", required: true },
      { label: "Lebenslauf (CV) mit Foto", required: true },
      { label: "Berufszeugnis (Berufsschule/Fachschule) und/oder Diplom-/Abschlusszeugnis (Originalsprache mit Übersetzung)", required: true },
      { label: "Kopie der Abschrift und Noten des Abschlusszeugnisses (Originalsprache mit Übersetzung)", required: true },
      { label: "Kopie der Nachweise und absolvierten Praxisstunden aus der Berufsausbildung (Originalsprache mit Übersetzung)", required: true },
      { label: "Berufliche Pflegelizenz (Originalsprache mit Übersetzung)", required: true },
      { label: "Praktikumsbescheinigung (falls vorhanden) (Originalsprache mit Übersetzung)", required: false },
      { label: "Weiterbildungszertifikat (falls vorhanden) (Originalsprache mit Übersetzung)", required: false },
      { label: "Beschäftigungsnachweis / Arbeitszeugnis (falls vorhanden) (Originalsprache mit Übersetzung)", required: false },
      { label: "Sprachzertifikat (falls vorhanden)", required: false },
      { label: "Geburtsurkunde (Originalsprache mit Übersetzung)", required: true },
      { label: "Heiratsurkunde oder Partnerschaftsurkunde – falls verheiratet oder in eingetragener Partnerschaft (Originalsprache mit Übersetzung)", required: false },
    ],
    submission: {
      title: "Einreichungsanforderungen",
      mandatoryNote: "Mit einem Sternchen (*) gekennzeichnete Dokumente sind Pflichtdokumente und müssen eingereicht werden; andernfalls kann die Bewerbung nicht bearbeitet werden.",
      originalLabel: "Originaldokument",
      originalDesc: "Ein Scan des Originaldokuments (Thai oder Englisch) oder eine digitale Kopie (falls verfügbar). (Gilt für alle Originaldokumente, einschließlich Reisepass, Lebenslauf mit Foto und Sprachzertifikat).",
      certifiedLabel: "Beglaubigte Übersetzung",
      certifiedDesc: "Ein Scan des vom vereidigten Übersetzer beglaubigten Dokuments. (Gilt für alle übersetzten Dokumente).",
    },
    notes: {
      title: "Hinweis",
      items: [
        "Bitte scannen Sie Originaldokumente immer in Farbe.",
        "Laden Sie alle Originaldokumente und beglaubigten Übersetzungen als separate Dateien hoch (z. B. 1 Datei = 6-seitiges Original; 1 Datei = 6-seitige beglaubigte Übersetzung).",
        "Eingescannte Kopien oder Fotografien von Dokumenten, die nicht klar erkennbar sind, werden nicht bearbeitet. Wir fordern die fehlerhaften Dokumente erneut an.",
      ],
    },
  },
  form: {
    sectionTitle: "Jetzt bewerben",
    sectionSubtitle: "Füllen Sie das Formular aus – wir melden uns innerhalb von 5 Werktagen.",
    sidebar: {
      contactTitle: "Direktkontakt",
      emailNote: "",
      freeTitle: "Kostenlose Vermittlung",
      freeText: "Die Vermittlung durch APÖ ist für Bewerberinnen und Bewerber vollständig kostenlos.",
      languagesTitle: "Sprachen",
    },
    sectionPersonal: "Persönliche Daten",
    sectionProfessional: "Berufliches Profil",
    sectionDocuments: "Welche Dokumente liegen Ihnen bereits vor?",
    sectionDocumentsSubtitle: "Mehrfachauswahl möglich – kein Pflichtfeld.",
    sectionMotivation: "Kurzvorstellung",
    fields: {
      vorname: { label: "Vorname *", placeholder: "z. B. Malee" },
      nachname: { label: "Nachname *", placeholder: "z. B. Wongsiri" },
      email: { label: "E-Mail *", placeholder: "name@beispiel.com" },
      telefon: { label: "Telefon / WhatsApp", placeholder: "+66 81 234 5678" },
      herkunftsland: { label: "Herkunftsland *", placeholder: "z. B. Thailand" },
      ausbildung: { label: "Pflegeausbildung *", placeholder: "Bitte wählen …" },
      erfahrung: { label: "Berufserfahrung *", placeholder: "Bitte wählen …" },
      deutschkenntnisse: { label: "Deutschkenntnisse *", placeholder: "Bitte wählen …" },
      verfuegbarkeit: { label: "Verfügbarkeit *", placeholder: "Bitte wählen …" },
      nachricht: {
        label: "Erzählen Sie uns etwas über sich *",
        placeholder: "Warum möchten Sie in Österreich arbeiten? Was motiviert Sie in der Pflege?",
      },
    },
    ausbildungen: [
      "Pflegeassistenz (PA)",
      "Pflegefachassistenz (PFA)",
      "Diplomierte Gesundheits- und Krankenpflege (DGKP)",
      "Heimhilfe",
      "Sonstige Pflegeausbildung",
    ],
    erfahrungen: ["Unter 1 Jahr", "1–3 Jahre", "3–5 Jahre", "Mehr als 5 Jahre"],
    deutschniveaus: [
      "Noch keine Deutschkenntnisse",
      "A1 – Einsteiger",
      "A2 – Grundkenntnisse",
      "B1 – Fortgeschritten",
      "B2 – Selbstständige Sprachverwendung",
      "C1 – Kompetente Sprachverwendung",
    ],
    verfuegbarkeiten: ["Sofort", "In 3 Monaten", "In 6 Monaten", "In 12 oder mehr Monaten"],
    dokumenteOptions: [
      "Lebenslauf (CV)",
      "Pflegediplom / Ausbildungsnachweis",
      "Lehrplan mit Stundenübersicht (Theorie & Praxis)",
      "Deutschzertifikat (ÖSD, Goethe-Institut, telc oder ÖIF)",
      "Polizeiliches Führungszeugnis (nicht älter als 3 Monate)",
      "Reisepass (gültig, mind. 2 Jahre)",
      "Lichtbild (aktuelles Passfoto)",
      "Arbeitszeugnis(se) / Beschäftigungsnachweise",
      "Geburtsurkunde",
    ],
    privacy:
      "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Bewerbung zu. *",
    submit: "Bewerbung absenden",
    submitting: "Bewerbung wird übermittelt …",
    emailNote: "",
    success: {
      title: "Bewerbung erfolgreich eingereicht!",
      text: "Vielen Dank für Ihre Bewerbung. Wir melden uns innerhalb von 5 Werktagen bei Ihnen.",
      emailNote: "",
    },
    errors: {
      vorname: "Vorname erforderlich.",
      nachname: "Nachname erforderlich.",
      email: "E-Mail erforderlich.",
      emailInvalid: "Ungültige E-Mail-Adresse.",
      herkunftsland: "Herkunftsland erforderlich.",
      ausbildung: "Bitte Ausbildung wählen.",
      erfahrung: "Bitte Erfahrung wählen.",
      deutschkenntnisse: "Bitte Sprachniveau wählen.",
      verfuegbarkeit: "Bitte Verfügbarkeit wählen.",
      nachricht: "Bitte mindestens 20 Zeichen eingeben.",
      privacy: "Datenschutzerklärung muss akzeptiert werden.",
      serverDefault: "Ein Fehler ist aufgetreten.",
      network: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    },
  },
  faq: {
    sectionTitle: "Häufige Fragen",
    items: [
      {
        question: "Welche Pflegeausbildungen werden in Österreich anerkannt?",
        answer:
          "Grundsätzlich können alle pflegerischen Ausbildungen durch die Nostrifizierung anerkannt werden. Die zuständige Behörde prüft, ob Ihre Ausbildung vergleichbar mit österreichischen Standards ist. Fehlende Inhalte werden ggf. durch Ergänzungskurse nachgeholt.",
      },
      {
        question: "Wie lange dauert der gesamte Prozess bis zur Arbeitsstelle?",
        answer:
          "Erfahrungsgemäß dauert der Prozess 12–18 Monate: Die Nostrifizierung allein nimmt 2–4 Monate in Anspruch, der Rot-Weiß-Rot-Karten-Antrag weitere 4–8 Wochen. APÖ begleitet Sie durch alle Schritte.",
      },
      {
        question: "Muss ich Deutsch können, bevor ich mich bewerbe?",
        answer:
          "Nein – Sie können sich auch ohne oder mit geringen Deutschkenntnissen bewerben. Wir beraten Sie, welche Sprachkurse empfohlen werden. Das erforderliche Niveau hängt von Ihrer Ausbildung ab.",
      },
      {
        question: "Entstehen mir Kosten durch die Vermittlung?",
        answer:
          "Die Vermittlung durch APÖ ist für Bewerberinnen und Bewerber vollständig kostenlos. Sie zahlen nur anfallende Behördengebühren (z. B. ca. € 250 für die Nostrifizierung oder die Visumgebühr).",
      },
      {
        question: "Welches Gehalt kann ich in Österreich erwarten?",
        answer:
          "Das Mindestgehalt für Pflegekräfte mit Rot-Weiß-Rot-Karte beträgt 2026 mind. € 3.465 brutto/Monat. Je nach Qualifikation, Träger und Region kann das Gehalt deutlich höher liegen. Österreich bietet zudem starke Kollektivverträge.",
      },
      {
        question: "Kann ich meine Familie nach Österreich mitbringen?",
        answer:
          "Ja – nach einer Mindestbeschäftigungsdauer ist Familienzusammenführung möglich. APÖ informiert Sie über die genauen Voraussetzungen im persönlichen Gespräch.",
      },
    ],
  },
  cta: {
    title: "Bereit für Ihren nächsten Schritt?",
    subtitle: "Starten Sie Ihre Bewerbung heute – wir begleiten Sie auf dem gesamten Weg nach Österreich.",
    primary: "Jetzt bewerben",
    secondary: "Fragen stellen",
  },
};

export default de;
