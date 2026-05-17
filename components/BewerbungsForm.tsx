"use client";

import { useState, FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const AUSBILDUNGEN = [
  "Pflegeassistenz (PA)",
  "Pflegefachassistenz (PFA)",
  "Diplomierte Gesundheits- und Krankenpflege (DGKP)",
  "Heimhilfe",
  "Sonstige Pflegeausbildung",
];

const ERFAHRUNGEN = [
  "Unter 1 Jahr",
  "1–3 Jahre",
  "3–5 Jahre",
  "Mehr als 5 Jahre",
];

const DEUTSCHNIVEAUS = [
  "Noch keine Deutschkenntnisse",
  "A1 – Einsteiger",
  "A2 – Grundkenntnisse",
  "B1 – Fortgeschritten",
  "B2 – Selbstständige Sprachverwendung",
  "C1 – Kompetente Sprachverwendung",
];

const VERFUEGBARKEITEN = [
  "Sofort",
  "In 3 Monaten",
  "In 6 Monaten",
  "In 12 oder mehr Monaten",
];

const DOKUMENTE_OPTIONS = [
  "Lebenslauf (CV)",
  "Pflegediplom / Ausbildungsnachweis",
  "Lehrplan mit Stundenübersicht (Theorie & Praxis)",
  "Deutschzertifikat (ÖSD, Goethe-Institut, telc oder ÖIF)",
  "Polizeiliches Führungszeugnis (nicht älter als 3 Monate)",
  "Reisepass (gültig, mind. 2 Jahre)",
  "Lichtbild (aktuelles Passfoto)",
  "Arbeitszeugnis(se) / Beschäftigungsnachweise",
  "Geburtsurkunde",
];

interface FormState {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  herkunftsland: string;
  ausbildung: string;
  erfahrung: string;
  deutschkenntnisse: string;
  verfuegbarkeit: string;
  dokumente: string[];
  nachricht: string;
  privacy: boolean;
}

interface Errors {
  [key: string]: string;
}

const INITIAL: FormState = {
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  herkunftsland: "",
  ausbildung: "",
  erfahrung: "",
  deutschkenntnisse: "",
  verfuegbarkeit: "",
  dokumente: [],
  nachricht: "",
  privacy: false,
};

export default function BewerbungsForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function toggleDokument(doc: string) {
    setForm((prev) => ({
      ...prev,
      dokumente: prev.dokumente.includes(doc)
        ? prev.dokumente.filter((d) => d !== doc)
        : [...prev.dokumente, doc],
    }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.vorname.trim()) e.vorname = "Vorname erforderlich.";
    if (!form.nachname.trim()) e.nachname = "Nachname erforderlich.";
    if (!form.email.trim()) e.email = "E-Mail erforderlich.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ungültige E-Mail-Adresse.";
    if (!form.herkunftsland.trim()) e.herkunftsland = "Herkunftsland erforderlich.";
    if (!form.ausbildung) e.ausbildung = "Bitte Ausbildung wählen.";
    if (!form.erfahrung) e.erfahrung = "Bitte Erfahrung wählen.";
    if (!form.deutschkenntnisse) e.deutschkenntnisse = "Bitte Sprachniveau wählen.";
    if (!form.verfuegbarkeit) e.verfuegbarkeit = "Bitte Verfügbarkeit wählen.";
    if (!form.nachricht.trim() || form.nachricht.trim().length < 20)
      e.nachricht = "Bitte mindestens 20 Zeichen eingeben.";
    if (!form.privacy) e.privacy = "Datenschutzerklärung muss akzeptiert werden.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/bewerber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Ein Fehler ist aufgetreten.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm(INITIAL);
      }
    } catch {
      setServerError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" aria-hidden="true" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Bewerbung erfolgreich eingereicht!</h3>
        <p className="text-green-700 mb-4">
          Vielen Dank für Ihre Bewerbung. Wir melden uns innerhalb von 5 Werktagen bei Ihnen.
        </p>
        <p className="text-sm text-green-600">
          Bitte senden Sie Ihre Unterlagen auch per E-Mail an{" "}
          <a href="mailto:office@apoesterreich.at" className="font-semibold underline">
            office@apoesterreich.at
          </a>
        </p>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? "border-red-300 bg-red-50 focus:ring-red-300"
        : "border-navy-200 bg-white focus:ring-navy-400"
    }`;

  const labelClass = "block text-sm font-medium text-navy-700 mb-1";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Persönliche Daten */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">
          Persönliche Daten
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vorname" className={labelClass}>Vorname *</label>
            <input
              id="vorname"
              type="text"
              autoComplete="given-name"
              value={form.vorname}
              onChange={(e) => set("vorname", e.target.value)}
              className={inputClass("vorname")}
              placeholder="z. B. Malee"
            />
            {errors.vorname && <p className="mt-1 text-xs text-red-600">{errors.vorname}</p>}
          </div>
          <div>
            <label htmlFor="nachname" className={labelClass}>Nachname *</label>
            <input
              id="nachname"
              type="text"
              autoComplete="family-name"
              value={form.nachname}
              onChange={(e) => set("nachname", e.target.value)}
              className={inputClass("nachname")}
              placeholder="z. B. Wongsiri"
            />
            {errors.nachname && <p className="mt-1 text-xs text-red-600">{errors.nachname}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>E-Mail *</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputClass("email")}
              placeholder="name@beispiel.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telefon" className={labelClass}>Telefon / WhatsApp</label>
            <input
              id="telefon"
              type="tel"
              autoComplete="tel"
              value={form.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              className={inputClass("telefon")}
              placeholder="+66 81 234 5678"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="herkunftsland" className={labelClass}>Herkunftsland *</label>
            <input
              id="herkunftsland"
              type="text"
              value={form.herkunftsland}
              onChange={(e) => set("herkunftsland", e.target.value)}
              className={inputClass("herkunftsland")}
              placeholder="z. B. Thailand"
            />
            {errors.herkunftsland && <p className="mt-1 text-xs text-red-600">{errors.herkunftsland}</p>}
          </div>
        </div>
      </fieldset>

      {/* Berufliches Profil */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">
          Berufliches Profil
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ausbildung" className={labelClass}>Pflegeausbildung *</label>
            <select
              id="ausbildung"
              value={form.ausbildung}
              onChange={(e) => set("ausbildung", e.target.value)}
              className={inputClass("ausbildung")}
            >
              <option value="">Bitte wählen …</option>
              {AUSBILDUNGEN.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {errors.ausbildung && <p className="mt-1 text-xs text-red-600">{errors.ausbildung}</p>}
          </div>
          <div>
            <label htmlFor="erfahrung" className={labelClass}>Berufserfahrung *</label>
            <select
              id="erfahrung"
              value={form.erfahrung}
              onChange={(e) => set("erfahrung", e.target.value)}
              className={inputClass("erfahrung")}
            >
              <option value="">Bitte wählen …</option>
              {ERFAHRUNGEN.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            {errors.erfahrung && <p className="mt-1 text-xs text-red-600">{errors.erfahrung}</p>}
          </div>
          <div>
            <label htmlFor="deutschkenntnisse" className={labelClass}>Deutschkenntnisse *</label>
            <select
              id="deutschkenntnisse"
              value={form.deutschkenntnisse}
              onChange={(e) => set("deutschkenntnisse", e.target.value)}
              className={inputClass("deutschkenntnisse")}
            >
              <option value="">Bitte wählen …</option>
              {DEUTSCHNIVEAUS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errors.deutschkenntnisse && <p className="mt-1 text-xs text-red-600">{errors.deutschkenntnisse}</p>}
          </div>
          <div>
            <label htmlFor="verfuegbarkeit" className={labelClass}>Verfügbarkeit *</label>
            <select
              id="verfuegbarkeit"
              value={form.verfuegbarkeit}
              onChange={(e) => set("verfuegbarkeit", e.target.value)}
              className={inputClass("verfuegbarkeit")}
            >
              <option value="">Bitte wählen …</option>
              {VERFUEGBARKEITEN.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            {errors.verfuegbarkeit && <p className="mt-1 text-xs text-red-600">{errors.verfuegbarkeit}</p>}
          </div>
        </div>
      </fieldset>

      {/* Dokumente */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-1 pb-2 border-b border-navy-100 w-full">
          Welche Dokumente liegen Ihnen bereits vor?
        </legend>
        <p className="text-xs text-navy-500 mb-4">Mehrfachauswahl möglich – kein Pflichtfeld.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DOKUMENTE_OPTIONS.map((doc) => (
            <label key={doc} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.dokumente.includes(doc)}
                onChange={() => toggleDokument(doc)}
                className="mt-0.5 h-4 w-4 rounded border-navy-300 text-red-austria focus:ring-red-austria accent-red-austria"
              />
              <span className="text-sm text-navy-700 group-hover:text-navy-900 transition-colors leading-snug">
                {doc}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Kurzvorstellung */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">
          Kurzvorstellung
        </legend>
        <div>
          <label htmlFor="nachricht" className={labelClass}>
            Erzählen Sie uns etwas über sich *
          </label>
          <textarea
            id="nachricht"
            rows={5}
            value={form.nachricht}
            onChange={(e) => set("nachricht", e.target.value)}
            className={`${inputClass("nachricht")} resize-y`}
            placeholder="Warum möchten Sie in Österreich arbeiten? Was motiviert Sie in der Pflege? Welche Erfahrungen haben Sie gesammelt?"
          />
          <div className="mt-1 flex justify-between">
            {errors.nachricht
              ? <p className="text-xs text-red-600">{errors.nachricht}</p>
              : <span />}
            <span className="text-xs text-navy-400">{form.nachricht.length} / 2000</span>
          </div>
        </div>
      </fieldset>

      {/* Datenschutz */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => set("privacy", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-red-austria"
          />
          <span className="text-sm text-navy-600">
            Ich habe die{" "}
            <Link href="/datenschutz" className="text-red-austria underline hover:text-red-austria-dark" target="_blank">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Bewerbung zu. *
          </span>
        </label>
        {errors.privacy && <p className="mt-1 text-xs text-red-600">{errors.privacy}</p>}
      </div>

      {/* Server Error */}
      {status === "error" && serverError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
            Bewerbung wird übermittelt …
          </>
        ) : (
          "Bewerbung absenden"
        )}
      </button>

      <p className="text-xs text-navy-400 text-center">
        Nach dem Absenden bitte Ihre Unterlagen per E-Mail an{" "}
        <a href="mailto:office@apoesterreich.at" className="text-navy-600 underline">
          office@apoesterreich.at
        </a>{" "}
        senden.
      </p>
    </form>
  );
}
