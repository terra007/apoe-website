// Recherchiert am 2026-10-02. Rechtslage und Prognosen ändern sich: vor jeder
// Veröffentlichung gegen die verlinkten Quellen prüfen.

export const STAND = "Oktober 2026";

export type Quelle = { label: string; url: string };

export const QUELLEN: Record<string, Quelle> = {
  goegPrognose: {
    label: "GÖG: Pflegepersonal-Bedarfsprognose für Österreich (2019)",
    url: "https://jasmin.goeg.at/id/eprint/1080/1/Pflegepersonalprognose%202030_bf.pdf",
  },
  goegUpdate: {
    label: "GÖG: Pflegepersonalbedarfsprognose, Update bis 2050",
    url: "https://jasmin.goeg.at/id/eprint/3378/",
  },
  rwr: {
    label: "oesterreich.gv.at: Rot-Weiß-Rot-Karte für Fachkräfte in Mangelberufen",
    url: "https://www.oesterreich.gv.at/de/themen/menschen_aus_anderen_staaten/aufenthalt/3/2/2/Seite.120231",
  },
  anerkennung: {
    label: "Anlaufstelle Anerkennung: Einwanderung und Anerkennung von Pflegeberufen",
    url: "https://media.anlaufstelle-anerkennung.at/Infoblatt_Einwanderung_Anerkennung_Pflege.pdf",
  },
  gbrDeutsch: {
    label: "GÖG Gesundheitsberuferegister: Nachweis der Deutschkenntnisse",
    url: "https://gbr.goeg.at/sites/gbr.goeg.at/files/inline-files/Nachw_DKenntnisse_14052024.pdf",
  },
  berufsanerkennung: { label: "berufsanerkennung.at", url: "https://www.berufsanerkennung.at" },
  who: {
    label: "WHO Global Code of Practice on the International Recruitment of Health Personnel",
    url: "https://www.who.int/publications-detail-redirect/who-global-code-of-practice-on-the-international-recruitment-of-health-personnel",
  },
  nurses4vienna: {
    label: "Wiener Gesundheitsverbund: #Nurses4Vienna",
    url: "https://gesundheitsverbund.at/nurses4vienna-internationale-pflegekraefte-staerken-wiens-gesundheitsversorgung/",
  },
};

export const BEDARF: { zahl: string; titel: string; text: string; quelle: Quelle }[] = [
  {
    zahl: "75.700",
    titel: "zusätzliche Pflegekräfte bis 2030",
    text: "Mindestbedarf 2017–2030: rund 42.000 als Ersatz für Pensionierungen, rund 34.000 wegen der Alterung der Bevölkerung.",
    quelle: QUELLEN.goegPrognose,
  },
  {
    zahl: "21.000",
    titel: "davon in der Langzeitpflege",
    text: "Vom Mehrbedarf entfallen rund 21.000 auf Pflegeheime und mobile Dienste, rund 13.000 auf Spitäler.",
    quelle: QUELLEN.goegPrognose,
  },
  {
    zahl: "119.900",
    titel: "Fehlbedarf bis 2040",
    text: "Die Aktualisierung der Prognose rechnet bis 2030 mit rund 51.100 und bis 2040 mit rund 119.900 fehlenden Pflege- und Betreuungspersonen.",
    quelle: QUELLEN.goegUpdate,
  },
  {
    zahl: "600",
    titel: "Pflegekräfte aus Drittstaaten in Wien",
    text: "Beispiel #Nurses4Vienna: Wiener Gesundheitsverbund und FH Campus Wien wollen binnen fünf Jahren bis zu 600 qualifizierte Kräfte aus Drittstaaten gewinnen.",
    quelle: QUELLEN.nurses4vienna,
  },
];

export const FAQ: { frage: string; antwort: string; quellen: Quelle[] }[] = [
  {
    frage: "Welche Pflegeberufe gibt es in Österreich?",
    antwort:
      "Das Gesundheits- und Krankenpflegegesetz (GuKG) kennt die Pflegeassistenz (PA, 1 Jahr Ausbildung), die Pflegefachassistenz (PFA, 2 Jahre) und die gehobene Pflege, die Diplomierte Gesundheits- und Krankenpflege (DGKP, Bachelor an einer Fachhochschule).",
    quellen: [QUELLEN.anerkennung],
  },
  {
    frage: "Ist Pflege ein Mangelberuf?",
    antwort:
      "Ja. Alle drei Pflegeberufe stehen auf der Mangelberufsliste und können über die Rot-Weiß-Rot-Karte als Fachkraft in einem Mangelberuf zuwandern. Voraussetzungen unter anderem: mindestens 55 Punkte, eine Stelle mit Mindestentlohnung nach Gesetz oder Kollektivvertrag und ein Nachweis von Deutsch- oder Englischkenntnissen.",
    quellen: [QUELLEN.rwr],
  },
  {
    frage: "Muss die Ausbildung zuerst anerkannt werden?",
    antwort:
      "Bei diplomierten Pflegekräften (DGKP) muss die Nostrifizierung abgeschlossen sein, bevor die Rot-Weiß-Rot-Karte beantragt wird. Für die Assistenzberufe kann eine Beschäftigung teils auch ohne vollständige Nostrifizierung möglich sein. Das hängt vom Einzelfall ab und sollte vorab mit den Behörden geklärt werden.",
    quellen: [QUELLEN.rwr, QUELLEN.anerkennung],
  },
  {
    frage: "Wer führt die Nostrifizierung durch, und wie lange dauert sie?",
    antwort:
      "Je nach Beruf sind Fachhochschulen oder die Landesbehörden zuständig. Die Anlaufstellen nennen als Richtwert 2 bis 6 Monate. Das Ergebnis kann eine Ergänzungsprüfung oder einen Anpassungslehrgang vorsehen, wenn sich die Ausbildung wesentlich von der österreichischen unterscheidet.",
    quellen: [QUELLEN.anerkennung, QUELLEN.berufsanerkennung],
  },
  {
    frage: "Welches Deutsch wird verlangt?",
    antwort:
      "Für die Eintragung im Gesundheitsberuferegister, ohne die man nicht als Pflegekraft arbeiten darf: B2 für DGKP, B1 für Pflegeassistenz und Pflegefachassistenz. Für die Rot-Weiß-Rot-Karte selbst zählen Sprachkenntnisse im Punktesystem.",
    quellen: [QUELLEN.gbrDeutsch, QUELLEN.rwr],
  },
  {
    frage: "Was heißt „ethische Rekrutierung“?",
    antwort:
      "Die WHO hat 2010 einen freiwilligen Verhaltenskodex für die internationale Anwerbung von Gesundheitspersonal beschlossen. Er soll Herkunftsländer mit knappem Personal schützen, die Rechte der Fachkräfte wahren und den Zielländern empfehlen, selbst genug Personal auszubilden und zu halten. Er ist ein Maßstab für seriöse Vermittlung.",
    quellen: [QUELLEN.who],
  },
];
