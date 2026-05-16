export type Phase = 1 | 2 | 3 | 4;
export type LanguageLevel = "A1" | "A2" | "B1" | "B2";
export type DocumentStatus = "ausstehend" | "eingereicht" | "anerkannt";

export interface Document {
  name: string;
  status: DocumentStatus;
}

export interface Pflegekraft {
  slug: string;
  name: string;
  nameThai: string;
  namePhonetic: string;
  age: number;
  experienceYears: number;
  specialization: string;
  languageLevel: LanguageLevel;
  languageProgress: number; // 0-100
  currentPhase: Phase;
  phaseStatus: string;
  bio: string;
  skills: string[];
  availableFrom: string;
  videoUrl?: string; // YouTube embed URL — wird nach HeyGen-Erstellung eingetragen
  avatarColor: string;
  documents: Document[];
}

export const pflegekraefte: Pflegekraft[] = [
  {
    slug: "nattaya-charoenwong",
    name: "Nattaya Charoenwong",
    nameThai: "นัตยา เจริญวงศ์",
    namePhonetic: "nat-ta-ya · cha-roen-wong",
    age: 27,
    experienceYears: 5,
    specialization: "Altenpflege",
    languageLevel: "B1",
    languageProgress: 92,
    currentPhase: 2,
    phaseStatus: "RWR-Antrag eingereicht",
    bio: "Nattaya schloss ihr Pflegestudium am Mahidol University Hospital in Bangkok mit Auszeichnung ab. Ihre fünf Jahre Erfahrung in der stationären Altenpflege, insbesondere in der Betreuung pflegebedürftiger Seniorinnen und Senioren, machen sie zur idealen Kandidatin für österreichische Pflegeheime. Sie spricht neben Thai und Deutsch (B1) auch grundlegendes Englisch.",
    skills: ["Altenpflege", "Grundpflege", "Demenzbetreuung", "Wundversorgung", "Mobilitätsförderung"],
    availableFrom: "Q4 2025",
    avatarColor: "from-blue-600 to-blue-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Mahidol University)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "anerkannt" },
      { name: "Strafregisterbescheinigung TH", status: "anerkannt" },
      { name: "ÖSD-Zertifikat B1", status: "anerkannt" },
      { name: "RWR-Antrag AMS", status: "eingereicht" },
      { name: "Botschafts-Visum D", status: "ausstehend" },
    ],
  },
  {
    slug: "siriporn-suksawat",
    name: "Siriporn Suksawat",
    nameThai: "ศิริพร สุขสวัสดิ์",
    namePhonetic: "si-ri-porn · suk-sa-wat",
    age: 31,
    experienceYears: 8,
    specialization: "Altenpflege",
    languageLevel: "B1",
    languageProgress: 78,
    currentPhase: 1,
    phaseStatus: "Deutsch-Intensivkurs (Monat 4/6)",
    bio: "Siriporn bringt acht Jahre Erfahrung in der stationären Altenpflege am Siriraj Hospital, dem größten Krankenhaus Thailands, mit. Ihre einfühlsame Art im Umgang mit pflegebedürftigen älteren Menschen und deren Angehörigen macht sie zu einer außergewöhnlichen Pflegefachkraft für österreichische Seniorenheime und Pflegezentren.",
    skills: ["Altenpflege", "Demenzbetreuung", "Angehörigenberatung", "Mobilitätsförderung", "Grundpflege"],
    availableFrom: "Q1 2026",
    avatarColor: "from-purple-600 to-purple-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Siriraj Hospital)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "anerkannt" },
      { name: "Strafregisterbescheinigung TH", status: "eingereicht" },
      { name: "ÖSD-Zertifikat B1", status: "ausstehend" },
      { name: "RWR-Antrag AMS", status: "ausstehend" },
      { name: "Botschafts-Visum D", status: "ausstehend" },
    ],
  },
  {
    slug: "praewa-thongthai",
    name: "Praewa Thongthai",
    nameThai: "แพรวา ทองไทย",
    namePhonetic: "praew-wa · thong-thai",
    age: 29,
    experienceYears: 6,
    specialization: "Altenpflege",
    languageLevel: "B1",
    languageProgress: 100,
    currentPhase: 3,
    phaseStatus: "Einreise geplant · Dienstantritt vorbereitet",
    bio: "Praewa spezialisierte sich nach ihrem Abschluss an der Chulalongkorn University auf die stationäre Altenpflege in einem Seniorenzentrum in Bangkok. Ihre strukturierte Arbeitsweise und ihr umfangreiches Wissen in der Pflegedokumentation haben ihr hervorragende Referenzen eingebracht. Sie hat das ÖSD B1 mit Auszeichnung bestanden.",
    skills: ["Altenpflege", "Pflegedokumentation", "Körperpflege", "Sturzprävention", "Aktivierungsbetreuung"],
    availableFrom: "Oktober 2025",
    avatarColor: "from-green-600 to-green-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Chulalongkorn University)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "anerkannt" },
      { name: "Strafregisterbescheinigung TH", status: "anerkannt" },
      { name: "ÖSD-Zertifikat B1 (Auszeichnung)", status: "anerkannt" },
      { name: "RWR-Karte", status: "anerkannt" },
      { name: "Botschafts-Visum D", status: "anerkannt" },
    ],
  },
  {
    slug: "malee-wongsiri",
    name: "Malee Wongsiri",
    nameThai: "มาลี วงศ์ศิริ",
    namePhonetic: "ma-lee · wong-si-ri",
    age: 25,
    experienceYears: 3,
    specialization: "Altenpflege",
    languageLevel: "A2",
    languageProgress: 55,
    currentPhase: 1,
    phaseStatus: "Deutsch-Intensivkurs (Monat 2/6)",
    bio: "Malee ist mit 25 Jahren die jüngste Kandidatin im aktuellen APÖ-Jahrgang, bringt jedoch bereits drei Jahre Erfahrung in einem Bangkoker Seniorenheim mit. Ihre natürliche Fürsorge, Geduld und Empathie im Umgang mit älteren, pflegebedürftigen Menschen werden von allen Vorgesetzten besonders hervorgehoben.",
    skills: ["Altenpflege", "Grundpflege", "Ernährungsunterstützung", "Soziale Betreuung", "Freizeitgestaltung"],
    availableFrom: "Q2 2026",
    avatarColor: "from-pink-600 to-pink-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Bangkok Children's Hospital)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "eingereicht" },
      { name: "Strafregisterbescheinigung TH", status: "ausstehend" },
      { name: "ÖSD-Zertifikat B1", status: "ausstehend" },
      { name: "RWR-Antrag AMS", status: "ausstehend" },
      { name: "Botschafts-Visum D", status: "ausstehend" },
    ],
  },
  {
    slug: "anchana-buathong",
    name: "Anchana Buathong",
    nameThai: "อัญชนา บัวทอง",
    namePhonetic: "an-cha-na · bua-thong",
    age: 34,
    experienceYears: 11,
    specialization: "Altenpflege",
    languageLevel: "B1",
    languageProgress: 100,
    currentPhase: 4,
    phaseStatus: "Nostrifizierungsverfahren läuft · als PA tätig",
    bio: "Anchana ist die erfahrenste Kandidatin im APÖ-Programm. Elf Jahre in der stationären Altenpflege am Ramathibodi Hospital und in einem privaten Pflegezentrum in Bangkok haben sie zu einer äußerst kompetenten und belastbaren Pflegefachkraft geformt. Sie ist bereits als Pflegeassistenz in Österreich tätig und befindet sich im laufenden DGKP-Nostrifizierungsverfahren.",
    skills: ["Altenpflege", "Demenzbetreuung", "Palliativbegleitung", "Wundmanagement", "Teamführung", "Pflegeplanung"],
    availableFrom: "als DGKP: Q1 2026",
    avatarColor: "from-red-600 to-red-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Ramathibodi Hospital)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "anerkannt" },
      { name: "Strafregisterbescheinigung TH", status: "anerkannt" },
      { name: "ÖSD-Zertifikat B1", status: "anerkannt" },
      { name: "RWR-Karte", status: "anerkannt" },
      { name: "Nostrifizierungsantrag DGKP", status: "eingereicht" },
    ],
  },
  {
    slug: "supansa-klahan",
    name: "Supansa Klahan",
    nameThai: "สุพรรษา กล้าหาญ",
    namePhonetic: "su-pan-sa · kla-han",
    age: 30,
    experienceYears: 7,
    specialization: "Altenpflege",
    languageLevel: "B1",
    languageProgress: 88,
    currentPhase: 2,
    phaseStatus: "Dokumente bei AMS eingereicht",
    bio: "Supansa widmete sich nach ihrem Abschluss an der Khon Kaen University vollständig der stationären Altenpflege. Sieben Jahre lang betreute sie pflegebedürftige Seniorinnen und Senioren mit einem besonderen Fokus auf würdevolle Begleitung und Lebensqualität im Alter. Ihr hohes Maß an Empathie und Belastbarkeit wurde mehrfach von Vorgesetzten ausgezeichnet.",
    skills: ["Altenpflege", "Sterbebegleitung", "Schmerzmanagement", "Angehörigenberatung", "Biografiearbeit"],
    availableFrom: "Q4 2025",
    avatarColor: "from-amber-600 to-amber-800",
    videoUrl: undefined,
    documents: [
      { name: "Pflegediplom (Khon Kaen University)", status: "anerkannt" },
      { name: "Geburtsurkunde (Apostille)", status: "anerkannt" },
      { name: "Strafregisterbescheinigung TH", status: "anerkannt" },
      { name: "ÖSD-Zertifikat B1", status: "eingereicht" },
      { name: "RWR-Antrag AMS", status: "eingereicht" },
      { name: "Botschafts-Visum D", status: "ausstehend" },
    ],
  },
];

export const phaseLabels: Record<Phase, string> = {
  1: "Rekrutierung & Sprachkurs",
  2: "RWR-Karte & Legalisation",
  3: "Einreise & Dienstantritt",
  4: "Nostrifizierung DGKP",
};

export const phaseColors: Record<Phase, { bg: string; text: string; border: string; badge: string }> = {
  1: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  2: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  3: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", badge: "bg-green-100 text-green-700" },
  4: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
};
