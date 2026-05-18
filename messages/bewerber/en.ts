import type { BewerberT } from "./types";

const en: BewerberT = {
  lang: "en",
  meta: {
    title: "Apply – Nursing Career in Austria",
    description:
      "Start your nursing career in Austria. APÖ guides you from application to placement – qualification recognition, visa support, and job placement in one place.",
  },
  langSwitcher: { de: "Deutsch", en: "English", th: "ภาษาไทย" },
  hero: {
    badge: "Apply Now",
    title: "Your Nursing Career",
    titleAccent: "in Austria",
    subtitle:
      "APÖ accompanies qualified care workers from abroad throughout their journey to Austria – from the application through qualification recognition to a secure position with a public care provider.",
    ctaPrimary: "Apply Now",
    ctaSecondary: "View Documents",
    stats: [
      { value: "50+", label: "Placed Candidates" },
      { value: "20+", label: "Public Care Providers" },
      { value: "5+", label: "Countries of Origin" },
    ],
  },
  vorteile: {
    sectionTitle: "Why APÖ?",
    sectionSubtitle:
      "As a specialised recruitment agency, we know every step of the process – and accompany you personally through every challenge.",
    items: [
      {
        title: "Personal Support",
        text: "From application to your first day at work, you have a dedicated contact person at your side.",
      },
      {
        title: "Legal Assistance",
        text: "We guide you through the qualification recognition process (Nostrifizierung), the Red-White-Red Card application, and all bureaucratic steps.",
      },
      {
        title: "Direct Placement",
        text: "We place exclusively with public care providers in Austria – secure positions with fair working conditions.",
      },
    ],
  },
  voraussetzungen: {
    sectionTitle: "Requirements",
    sectionSubtitle:
      "These are the basic requirements you should meet to be approved as a care worker in Austria.",
    items: [
      "Completed nursing qualification (at least Pflegeassistenz or equivalent)",
      "German language proficiency, minimum A2 (B1 recommended, B2 required for DGKP)",
      "At least 1 year of professional experience in care",
      "Willingness to work and live in Austria",
      "Willingness to undergo qualification recognition (Nostrifizierung)",
      "Genuine enjoyment of working with elderly and care-dependent people",
    ],
    weOffer: {
      title: "What We Do for You",
      items: [
        "Free initial consultation and suitability assessment",
        "Coordination and support throughout the recognition process",
        "Support with the Red-White-Red Card application",
        "Preparation for Austrian working conditions",
        "Direct placement with verified public care providers",
        "Dedicated contact person throughout the entire probationary period",
      ],
    },
  },
  prozess: {
    sectionTitle: "Your Path to Us",
    sectionSubtitle: "From application to employment in Austria in four steps.",
    steps: [
      {
        nr: "01",
        title: "Online Application",
        description: "Fill in the application form and submit your documents. We will get back to you within 5 business days.",
      },
      {
        nr: "02",
        title: "Suitability Interview",
        description: "A video call with our team – we discuss your qualifications, expectations, and the next steps.",
      },
      {
        nr: "03",
        title: "Document Review & Recognition",
        description: "We review your documents, coordinate the recognition of your qualifications, and support you with the visa application.",
      },
      {
        nr: "04",
        title: "Placement & Start",
        description: "After successful recognition, you will be placed with an Austrian public provider and begin your career.",
      },
    ],
  },
  dokumente: {
    sectionTitle: "Required Documents",
    sectionSubtitle:
      "Please prepare the following documents. Mandatory items are marked with an asterisk (*).",
    items: [
      { label: "Profile photo / Portrait photo", required: true },
      { label: "Passport", required: true },
      { label: "Curriculum Vitae (CV) with photo", required: true },
      { label: "Professional Certificate (Vocational/Technical) and/or Diploma/Degree Certificate (Original language with translation)", required: true },
      { label: "Copy of Transcript and Grades from the Degree Certificate (Original language with translation)", required: true },
      { label: "Copy of Records and Completed Practical Working Hours during professional training (Original language with translation)", required: true },
      { label: "Professional Nursing License (Original language with translation)", required: true },
      { label: "Internship Certificate (if applicable) (Original language with translation)", required: false },
      { label: "Continuing Education Certificate (if applicable) (Original language with translation)", required: false },
      { label: "Proof of Employment / Employment Certificate (if applicable) (Original language with translation)", required: false },
      { label: "Language Certificate (if applicable)", required: false },
      { label: "Birth Certificate (Original language with translation)", required: true },
      { label: "Marriage Certificate or Certificate of Registered Partnership – If married or in a registered partnership (Original language with translation)", required: false },
    ],
    submission: {
      title: "Submission Requirements",
      mandatoryNote: "Documents marked with an asterisk (*) are mandatory and must be submitted; otherwise, the application cannot be processed.",
      originalLabel: "Original Document",
      originalDesc: "A scan of the original document (Thai or English) or a digital copy (if available). (This applies to all original documents, including Passport, CV with photo, and Language Certificate).",
      certifiedLabel: "Certified Translation",
      certifiedDesc: "A scan of the original document certified by a sworn translator. (This applies to all translated documents).",
    },
    notes: {
      title: "Note",
      items: [
        "Please always scan original documents in color.",
        "Upload all original documents and certified translations as separate files (e.g., 1 file = 6-page original; 1 file = 6-page certified translation).",
        "Scanned copies or identifiable photographs of documents that are not clear will not be processed. We will request the incorrect documents.",
      ],
    },
  },
  form: {
    sectionTitle: "Apply Now",
    sectionSubtitle: "Fill in the form – we will get back to you within 5 business days.",
    sidebar: {
      contactTitle: "Direct Contact",
      emailNote: "",
      freeTitle: "Free Placement Service",
      freeText: "Placement through APÖ is completely free of charge for all applicants.",
      languagesTitle: "Languages",
    },
    sectionPersonal: "Personal Details",
    sectionProfessional: "Professional Profile",
    sectionDocuments: "Which documents do you already have?",
    sectionDocumentsSubtitle: "Multiple selections allowed – not required.",
    sectionMotivation: "Short Introduction",
    fields: {
      vorname: { label: "First Name *", placeholder: "e.g. Malee" },
      nachname: { label: "Last Name *", placeholder: "e.g. Wongsiri" },
      email: { label: "Email *", placeholder: "name@example.com" },
      telefon: { label: "Phone / WhatsApp", placeholder: "+66 81 234 5678" },
      herkunftsland: { label: "Country of Origin *", placeholder: "e.g. Thailand" },
      ausbildung: { label: "Nursing Qualification *", placeholder: "Please select …" },
      erfahrung: { label: "Professional Experience *", placeholder: "Please select …" },
      deutschkenntnisse: { label: "German Language Level *", placeholder: "Please select …" },
      verfuegbarkeit: { label: "Availability *", placeholder: "Please select …" },
      nachricht: {
        label: "Tell us something about yourself *",
        placeholder: "Why do you want to work in Austria? What motivates you in nursing?",
      },
    },
    ausbildungen: [
      "Nursing Assistant (PA)",
      "Senior Nursing Assistant (PFA)",
      "Registered Nurse / DGKP",
      "Home Care Worker",
      "Other nursing qualification",
    ],
    erfahrungen: ["Less than 1 year", "1–3 years", "3–5 years", "More than 5 years"],
    deutschniveaus: [
      "No German knowledge",
      "A1 – Beginner",
      "A2 – Elementary",
      "B1 – Intermediate",
      "B2 – Upper Intermediate",
      "C1 – Advanced",
    ],
    verfuegbarkeiten: ["Immediately", "In 3 months", "In 6 months", "In 12 months or more"],
    dokumenteOptions: [
      "CV / Résumé",
      "Nursing diploma / proof of qualification",
      "Curriculum with hour breakdown (theory & practice)",
      "German language certificate (ÖSD, Goethe-Institut, telc or ÖIF)",
      "Police clearance certificate (no older than 3 months)",
      "Valid passport (min. 2 years)",
      "Current passport photo",
      "Employment certificate(s) / proof of employment",
      "Birth certificate",
    ],
    privacy:
      "I have read the privacy policy and consent to the processing of my data for the purpose of handling my application. *",
    submit: "Submit Application",
    submitting: "Submitting application …",
    emailNote: "",
    success: {
      title: "Application submitted successfully!",
      text: "Thank you for your application. We will get back to you within 5 business days.",
      emailNote: "",
    },
    errors: {
      vorname: "First name is required.",
      nachname: "Last name is required.",
      email: "Email is required.",
      emailInvalid: "Invalid email address.",
      herkunftsland: "Country of origin is required.",
      ausbildung: "Please select a qualification.",
      erfahrung: "Please select your experience.",
      deutschkenntnisse: "Please select your language level.",
      verfuegbarkeit: "Please select your availability.",
      nachricht: "Please enter at least 20 characters.",
      privacy: "You must accept the privacy policy.",
      serverDefault: "An error occurred.",
      network: "Network error. Please try again.",
    },
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    items: [
      {
        question: "Which nursing qualifications are recognised in Austria?",
        answer:
          "In principle, all nursing qualifications can be recognised through the Nostrifizierung process. The responsible authority checks whether your training is comparable to Austrian standards. Missing content may need to be made up through supplementary courses.",
      },
      {
        question: "How long does the entire process take until employment?",
        answer:
          "Based on experience, the process takes 12–18 months: the Nostrifizierung alone takes 2–4 months, the Red-White-Red Card application takes an additional 4–8 weeks. APÖ supports you through every step.",
      },
      {
        question: "Do I need to speak German before applying?",
        answer:
          "No – you can apply even without or with minimal German skills. We advise which language courses are recommended and how to proceed. The required level depends on your qualification.",
      },
      {
        question: "Are there any costs for the placement service?",
        answer:
          "Placement through APÖ is completely free for applicants. You only pay applicable government fees (e.g. approx. €250 for recognition, or the visa fee).",
      },
      {
        question: "What salary can I expect in Austria?",
        answer:
          "The minimum salary for care workers with a Red-White-Red Card is at least €3,465 gross per month in 2026. Depending on qualification, provider, and region, the salary can be significantly higher. Austria also has strong collective bargaining agreements.",
      },
      {
        question: "Can I bring my family to Austria?",
        answer:
          "Yes – after a minimum employment period, family reunification is possible. APÖ will inform you about the specific requirements in a personal conversation.",
      },
    ],
  },
  cta: {
    title: "Ready for Your Next Step?",
    subtitle: "Start your application today – we will accompany you throughout your journey to Austria.",
    primary: "Apply Now",
    secondary: "Ask a Question",
  },
};

export default en;
