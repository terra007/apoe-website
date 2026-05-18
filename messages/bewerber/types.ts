export interface FormT {
  sectionPersonal: string;
  sectionProfessional: string;
  sectionDocuments: string;
  sectionDocumentsSubtitle: string;
  sectionMotivation: string;
  fields: {
    vorname: { label: string; placeholder: string };
    nachname: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    telefon: { label: string; placeholder: string };
    herkunftsland: { label: string; placeholder: string };
    ausbildung: { label: string; placeholder: string };
    erfahrung: { label: string; placeholder: string };
    deutschkenntnisse: { label: string; placeholder: string };
    verfuegbarkeit: { label: string; placeholder: string };
    nachricht: { label: string; placeholder: string };
  };
  ausbildungen: string[];
  erfahrungen: string[];
  deutschniveaus: string[];
  verfuegbarkeiten: string[];
  dokumenteOptions: string[];
  privacy: string;
  submit: string;
  submitting: string;
  emailNote: string;
  success: { title: string; text: string; emailNote: string };
  errors: {
    vorname: string;
    nachname: string;
    email: string;
    emailInvalid: string;
    herkunftsland: string;
    ausbildung: string;
    erfahrung: string;
    deutschkenntnisse: string;
    verfuegbarkeit: string;
    nachricht: string;
    privacy: string;
    serverDefault: string;
    network: string;
  };
}

export interface BewerberT {
  lang: "de" | "en" | "th";
  meta: { title: string; description: string };
  langSwitcher: { de: string; en: string; th: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Array<{ value: string; label: string }>;
  };
  vorteile: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{ title: string; text: string }>;
  };
  voraussetzungen: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: string[];
    weOffer: { title: string; items: string[] };
  };
  prozess: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: Array<{ nr: string; title: string; description: string }>;
  };
  dokumente: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{ label: string; required: boolean }>;
    submission: {
      title: string;
      mandatoryNote: string;
      originalLabel: string;
      originalDesc: string;
      certifiedLabel: string;
      certifiedDesc: string;
    };
    notes: {
      title: string;
      items: string[];
    };
  };
  form: FormT & {
    sectionTitle: string;
    sectionSubtitle: string;
    sidebar: {
      contactTitle: string;
      emailNote: string;
      freeTitle: string;
      freeText: string;
      languagesTitle: string;
    };
  };
  faq: {
    sectionTitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: { title: string; subtitle: string; primary: string; secondary: string };
}
