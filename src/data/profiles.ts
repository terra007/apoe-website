export type Ziel = "DGKP" | "PFA" | "PA";
export type Deutsch = "A2" | "B1" | "B2";
export type PhaseId = "selektion" | "legal" | "nostrifizierung";
export type UnterlageStatus = "liegt vor" | "in Prüfung" | "offen";

/**
 * Die Phasen heißen je nach Berufsgruppe anders, weil die Reihenfolge anders
 * ist: Bei DGKP kommt die Nostrifizierung vor der Rot-Weiß-Rot-Karte, bei den
 * Assistenzberufen die Karte zuerst (siehe ProcessTracker).
 */
export function phaseLabel(ziel: Ziel, phase: PhaseId): string {
  if (ziel === "DGKP") {
    return { selektion: "Selektion & Sprache", legal: "Nostrifizierung & Visa", nostrifizierung: "Einreise & Registrierung" }[phase];
  }
  return { selektion: "Selektion & Sprache", legal: "Legal & Visa", nostrifizierung: "Post-Migration & Nostrifizierung" }[phase];
}

export type Bundesland =
  | "Wien"
  | "Niederösterreich"
  | "Oberösterreich"
  | "Steiermark"
  | "Tirol"
  | "Salzburg"
  | "Kärnten"
  | "Vorarlberg"
  | "Burgenland";

export type Profil = {
  id: string;
  /** Nur Vorname und Initial: mehr gehört nicht auf eine öffentliche Seite. */
  name: string;
  alter: number;
  herkunft: string;
  geschlecht: "w" | "m";
  ziel: Ziel;
  ausbildung: string;
  berufserfahrung: number;
  fachbereiche: string[];
  deutsch: { niveau: Deutsch; zertifikat: boolean; hinweis: string };
  sprachen: { name: string; niveau: string }[];
  phase: PhaseId;
  einsatzbereitAb: string;
  startAls: string;
  wunschBundesland: Bundesland;
  einrichtung: string;
  kurzprofil: string;
  staerken: string[];
  unterlagen: { name: string; status: UnterlageStatus }[];
  avatar: { skin: string; hair: "bun" | "long" | "short" | "bob"; scrubs: string; glasses?: boolean };
  /**
   * Vorstellungsvideo — nur echte Aufnahmen mit schriftlicher Einwilligung.
   * Dateien nach public/videos/ legen (z. B. /videos/nattaya.mp4), Untertitel als
   * WebVTT daneben. Ohne Eintrag zeigt die Seite einen Platzhalter.
   */
  video?: { src: string; poster?: string; untertitel?: string };
};

// ACHTUNG: Alle Personen sind frei erfunden und dienen der Veranschaulichung.
// Echte Profile dürfen erst mit schriftlicher Einwilligung der Fachkraft
// (DSGVO) und ohne Foto-/Nachnamen-Angaben ohne Freigabe veröffentlicht werden.
export const BEISPIELPROFILE: Profil[] = [
  {
    id: "nattaya",
    name: "Nattaya K.",
    alter: 29,
    herkunft: "Chiang Mai",
    geschlecht: "w",
    ziel: "DGKP",
    ausbildung: "Bachelor of Nursing Science (4 Jahre), staatliche Universität",
    berufserfahrung: 6,
    fachbereiche: ["Geriatrie", "Innere Medizin"],
    deutsch: { niveau: "B1", zertifikat: true, hinweis: "ÖSD B1 bestanden, B2-Kurs läuft (B2 nötig für DGKP)" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B2" },
      { name: "Deutsch", niveau: "B1" },
    ],
    phase: "selektion",
    einsatzbereitAb: "voraussichtlich 2028",
    startAls: "DGKP nach Nostrifizierung und Eintragung im Gesundheitsberuferegister",
    wunschBundesland: "Steiermark",
    einrichtung: "Landeskrankenhaus / Akutgeriatrie",
    kurzprofil:
      "Sechs Jahre auf einer geriatrischen Station im Universitätsspital. Gewohnt, mit Mehrfacherkrankungen und Angehörigengesprächen zu arbeiten.",
    staerken: ["Wundmanagement", "Angehörigenarbeit", "Dokumentation in EDV"],
    unterlagen: [
      { name: "Diplom & Transcript", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B1", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B2", status: "offen" },
      { name: "Strafregisterauszug", status: "liegt vor" },
      { name: "Antrag Nostrifizierung", status: "offen" },
    ],
    avatar: { skin: "#d9a074", hair: "bun", scrubs: "#0ea5a4" },
  },
  {
    id: "somchai",
    name: "Somchai P.",
    alter: 34,
    herkunft: "Khon Kaen",
    geschlecht: "m",
    ziel: "DGKP",
    ausbildung: "Bachelor of Nursing Science, Spezialisierung Intensivpflege",
    berufserfahrung: 9,
    fachbereiche: ["Intensivpflege", "Notfall"],
    deutsch: { niveau: "B2", zertifikat: true, hinweis: "ÖSD B2 bestanden" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "C1" },
      { name: "Deutsch", niveau: "B2" },
    ],
    phase: "legal",
    einsatzbereitAb: "ca. 4–6 Monate nach Nostrifizierungsbescheid",
    startAls: "DGKP auf der Intensivstation, nach Rot-Weiß-Rot-Karte und Registereintrag",
    wunschBundesland: "Tirol",
    einrichtung: "Klinikum / Intensivstation",
    kurzprofil:
      "Neun Jahre Intensivpflege mit Beatmung und Dialyse. Der Antrag auf Nostrifizierung läuft; die Rot-Weiß-Rot-Karte folgt erst nach dem Bescheid.",
    staerken: ["Beatmung", "Hämodynamisches Monitoring", "Einschulung von Kolleg:innen"],
    unterlagen: [
      { name: "Diplom & Transcript", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B2", status: "liegt vor" },
      { name: "Antrag Nostrifizierung", status: "in Prüfung" },
      { name: "Rot-Weiß-Rot-Karte (erst nach Bescheid)", status: "offen" },
      { name: "Gesundheitsberuferegister", status: "offen" },
    ],
    avatar: { skin: "#c98f63", hair: "short", scrubs: "#2563eb" },
  },
  {
    id: "pimchanok",
    name: "Pimchanok S.",
    alter: 26,
    herkunft: "Bangkok",
    geschlecht: "w",
    ziel: "PFA",
    ausbildung: "Praktische Krankenpflege (2 Jahre) mit Zusatzqualifikation Langzeitpflege",
    berufserfahrung: 3,
    fachbereiche: ["Langzeitpflege", "Demenz"],
    deutsch: { niveau: "A2", zertifikat: false, hinweis: "B1-Prüfung geplant 12/2026" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B1" },
      { name: "Deutsch", niveau: "A2" },
    ],
    phase: "selektion",
    einsatzbereitAb: "voraussichtlich 04/2028",
    startAls: "Pflegefachassistenz im Pflegewohnhaus",
    wunschBundesland: "Oberösterreich",
    einrichtung: "Pflegewohnhaus",
    kurzprofil:
      "Drei Jahre in einem Pflegeheim mit Demenzbereich. Im Deutschkurs in Bangkok, Prüfungstermin B1 steht fest.",
    staerken: ["Validation bei Demenz", "Mobilisation", "Geduld im Bewohnerkontakt"],
    unterlagen: [
      { name: "Ausbildungsnachweis", status: "liegt vor" },
      { name: "ÖSD-Zertifikat A2", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B1", status: "offen" },
      { name: "Strafregisterauszug", status: "in Prüfung" },
    ],
    avatar: { skin: "#dfae85", hair: "long", scrubs: "#7c3aed" },
  },
  {
    id: "kittisak",
    name: "Kittisak R.",
    alter: 31,
    herkunft: "Nakhon Ratchasima",
    geschlecht: "m",
    ziel: "PA",
    ausbildung: "Nursing Assistant Certificate (1 Jahr)",
    berufserfahrung: 5,
    fachbereiche: ["Langzeitpflege", "Rehabilitation"],
    deutsch: { niveau: "B1", zertifikat: true, hinweis: "ÖSD B1 bestanden" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B1" },
      { name: "Deutsch", niveau: "B1" },
    ],
    phase: "legal",
    einsatzbereitAb: "06/2027",
    startAls: "Pflegeassistenz, Aufbau zur PFA möglich",
    wunschBundesland: "Niederösterreich",
    einrichtung: "Pflegeheim, Landgemeinde",
    kurzprofil:
      "Fünf Jahre Reha- und Langzeitpflege, körperlich belastbar, im Team verlässlich. Möchte langfristig in einer Gemeinde bleiben.",
    staerken: ["Transfer & Lagerung", "Rehabilitative Pflege", "Schichtdienst"],
    unterlagen: [
      { name: "Ausbildungsnachweis", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B1", status: "liegt vor" },
      { name: "Arbeitsvorvertrag", status: "in Prüfung" },
      { name: "Antrag Rot-Weiß-Rot-Karte", status: "in Prüfung" },
    ],
    avatar: { skin: "#cf9468", hair: "short", scrubs: "#16a34a", glasses: true },
  },
  {
    id: "supansa",
    name: "Supansa T.",
    alter: 38,
    herkunft: "Udon Thani",
    geschlecht: "w",
    ziel: "DGKP",
    ausbildung: "Bachelor of Nursing Science, Weiterbildung Palliativpflege",
    berufserfahrung: 12,
    fachbereiche: ["Palliativpflege", "Onkologie"],
    deutsch: { niveau: "B2", zertifikat: true, hinweis: "ÖSD B2 bestanden" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B2" },
      { name: "Deutsch", niveau: "B2" },
    ],
    phase: "legal",
    einsatzbereitAb: "ca. 6–9 Monate nach Nostrifizierungsbescheid",
    startAls: "DGKP nach Nostrifizierung, Rot-Weiß-Rot-Karte und Registereintrag",
    wunschBundesland: "Wien",
    einrichtung: "Pflegewohnhaus mit Palliativbereich",
    kurzprofil:
      "Zwölf Jahre in der Onkologie und Palliativpflege, zuletzt als Stationsleitungs-Vertretung. Erfahren in Sterbebegleitung und Angehörigengesprächen.",
    staerken: ["Schmerzmanagement", "Sterbebegleitung", "Teamkoordination"],
    unterlagen: [
      { name: "Diplom & Transcript", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B2", status: "liegt vor" },
      { name: "Beglaubigte Übersetzungen", status: "in Prüfung" },
      { name: "Antrag Nostrifizierung", status: "offen" },
    ],
    avatar: { skin: "#d6a07a", hair: "bob", scrubs: "#db2777" },
  },
  {
    id: "anan",
    name: "Anan W.",
    alter: 27,
    herkunft: "Chonburi",
    geschlecht: "m",
    ziel: "PFA",
    ausbildung: "Praktische Krankenpflege (2 Jahre), Zusatzkurs Akutpflege",
    berufserfahrung: 4,
    fachbereiche: ["Akutpflege", "Chirurgie"],
    deutsch: { niveau: "A2", zertifikat: true, hinweis: "ÖSD A2 bestanden, B1 im Kurs" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B2" },
      { name: "Deutsch", niveau: "A2" },
    ],
    phase: "selektion",
    einsatzbereitAb: "voraussichtlich 02/2028",
    startAls: "Pflegefachassistenz auf einer chirurgischen Station",
    wunschBundesland: "Salzburg",
    einrichtung: "Klinikum / chirurgische Station",
    kurzprofil:
      "Vier Jahre auf einer chirurgischen Station, prä- und postoperative Pflege, Verbandwechsel und Drainagen.",
    staerken: ["Postoperative Pflege", "Hygienestandards", "Schnelle Auffassung"],
    unterlagen: [
      { name: "Ausbildungsnachweis", status: "liegt vor" },
      { name: "ÖSD-Zertifikat A2", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B1", status: "offen" },
    ],
    avatar: { skin: "#d4996c", hair: "short", scrubs: "#0891b2" },
  },
  {
    id: "waraporn",
    name: "Waraporn J.",
    alter: 33,
    herkunft: "Songkhla",
    geschlecht: "w",
    ziel: "DGKP",
    ausbildung: "Bachelor of Nursing Science, Weiterbildung Psychiatrische Pflege",
    berufserfahrung: 8,
    fachbereiche: ["Gerontopsychiatrie", "Demenz"],
    deutsch: { niveau: "B2", zertifikat: true, hinweis: "ÖSD B2 bestanden" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B2" },
      { name: "Deutsch", niveau: "B2" },
    ],
    phase: "nostrifizierung",
    einsatzbereitAb: "ca. 1–3 Monate nach Einreise",
    startAls: "DGKP nach Eintragung im Gesundheitsberuferegister",
    wunschBundesland: "Kärnten",
    einrichtung: "Pflegeheim mit gerontopsychiatrischem Bereich",
    kurzprofil:
      "Acht Jahre in der Gerontopsychiatrie. Nostrifizierung abgeschlossen (mit Ergänzungsprüfung), Rot-Weiß-Rot-Karte erteilt, Einreise in Vorbereitung.",
    staerken: ["Deeskalation", "Biografiearbeit", "Medikamentenmanagement"],
    unterlagen: [
      { name: "Nostrifizierungsbescheid", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B2", status: "liegt vor" },
      { name: "Rot-Weiß-Rot-Karte", status: "liegt vor" },
      { name: "Eintragung Gesundheitsberuferegister", status: "offen" },
    ],
    avatar: { skin: "#dcab82", hair: "bun", scrubs: "#ea580c", glasses: true },
  },
  {
    id: "thanakorn",
    name: "Thanakorn M.",
    alter: 30,
    herkunft: "Bangkok",
    geschlecht: "m",
    ziel: "PA",
    ausbildung: "Nursing Assistant Certificate (1 Jahr), Zusatzkurs Hauskrankenpflege",
    berufserfahrung: 4,
    fachbereiche: ["Mobile Pflege", "Langzeitpflege"],
    deutsch: { niveau: "B1", zertifikat: true, hinweis: "ÖSD B1 bestanden" },
    sprachen: [
      { name: "Thai", niveau: "Muttersprache" },
      { name: "Englisch", niveau: "B1" },
      { name: "Deutsch", niveau: "B1" },
    ],
    phase: "legal",
    einsatzbereitAb: "08/2027",
    startAls: "Pflegeassistenz in der mobilen Pflege",
    wunschBundesland: "Tirol",
    einrichtung: "Sozial- und Gesundheitssprengel",
    kurzprofil:
      "Vier Jahre in der Hauskrankenpflege mit Klient:innen in abgelegenen Gegenden. Führerschein Klasse B vorhanden, nach der Anerkennung in Österreich umzuschreiben.",
    staerken: ["Selbständiges Arbeiten", "Führerschein Klasse B", "Hausbesuche"],
    unterlagen: [
      { name: "Ausbildungsnachweis", status: "liegt vor" },
      { name: "ÖSD-Zertifikat B1", status: "liegt vor" },
      { name: "Antrag Rot-Weiß-Rot-Karte", status: "in Prüfung" },
      { name: "Führerschein-Umschreibung", status: "offen" },
    ],
    avatar: { skin: "#c68a5e", hair: "short", scrubs: "#0d9488" },
  },
];
