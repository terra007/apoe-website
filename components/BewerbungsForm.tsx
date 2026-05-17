"use client";

import { useState, FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import type { FormT } from "@/messages/bewerber/types";

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

export default function BewerbungsForm({ t }: { t: FormT }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const e: Record<string, string> = {};
    if (!form.vorname.trim()) e.vorname = t.errors.vorname;
    if (!form.nachname.trim()) e.nachname = t.errors.nachname;
    if (!form.email.trim()) e.email = t.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.errors.emailInvalid;
    if (!form.herkunftsland.trim()) e.herkunftsland = t.errors.herkunftsland;
    if (!form.ausbildung) e.ausbildung = t.errors.ausbildung;
    if (!form.erfahrung) e.erfahrung = t.errors.erfahrung;
    if (!form.deutschkenntnisse) e.deutschkenntnisse = t.errors.deutschkenntnisse;
    if (!form.verfuegbarkeit) e.verfuegbarkeit = t.errors.verfuegbarkeit;
    if (!form.nachricht.trim() || form.nachricht.trim().length < 20)
      e.nachricht = t.errors.nachricht;
    if (!form.privacy) e.privacy = t.errors.privacy;
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
        setServerError(data.error ?? t.errors.serverDefault);
        setStatus("error");
      } else {
        setStatus("success");
        setForm(INITIAL);
      }
    } catch {
      setServerError(t.errors.network);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" aria-hidden="true" />
        <h3 className="text-xl font-bold text-green-800 mb-2">{t.success.title}</h3>
        <p className="text-green-700 mb-4">{t.success.text}</p>
        <p className="text-sm text-green-600">
          {t.success.emailNote}{" "}
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
          {t.sectionPersonal}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vorname" className={labelClass}>{t.fields.vorname.label}</label>
            <input
              id="vorname"
              type="text"
              autoComplete="given-name"
              value={form.vorname}
              onChange={(e) => set("vorname", e.target.value)}
              className={inputClass("vorname")}
              placeholder={t.fields.vorname.placeholder}
            />
            {errors.vorname && <p className="mt-1 text-xs text-red-600">{errors.vorname}</p>}
          </div>
          <div>
            <label htmlFor="nachname" className={labelClass}>{t.fields.nachname.label}</label>
            <input
              id="nachname"
              type="text"
              autoComplete="family-name"
              value={form.nachname}
              onChange={(e) => set("nachname", e.target.value)}
              className={inputClass("nachname")}
              placeholder={t.fields.nachname.placeholder}
            />
            {errors.nachname && <p className="mt-1 text-xs text-red-600">{errors.nachname}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>{t.fields.email.label}</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputClass("email")}
              placeholder={t.fields.email.placeholder}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telefon" className={labelClass}>{t.fields.telefon.label}</label>
            <input
              id="telefon"
              type="tel"
              autoComplete="tel"
              value={form.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              className={inputClass("telefon")}
              placeholder={t.fields.telefon.placeholder}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="herkunftsland" className={labelClass}>{t.fields.herkunftsland.label}</label>
            <input
              id="herkunftsland"
              type="text"
              value={form.herkunftsland}
              onChange={(e) => set("herkunftsland", e.target.value)}
              className={inputClass("herkunftsland")}
              placeholder={t.fields.herkunftsland.placeholder}
            />
            {errors.herkunftsland && <p className="mt-1 text-xs text-red-600">{errors.herkunftsland}</p>}
          </div>
        </div>
      </fieldset>

      {/* Berufliches Profil */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">
          {t.sectionProfessional}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ausbildung" className={labelClass}>{t.fields.ausbildung.label}</label>
            <select
              id="ausbildung"
              value={form.ausbildung}
              onChange={(e) => set("ausbildung", e.target.value)}
              className={inputClass("ausbildung")}
            >
              <option value="">{t.fields.ausbildung.placeholder}</option>
              {t.ausbildungen.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            {errors.ausbildung && <p className="mt-1 text-xs text-red-600">{errors.ausbildung}</p>}
          </div>
          <div>
            <label htmlFor="erfahrung" className={labelClass}>{t.fields.erfahrung.label}</label>
            <select
              id="erfahrung"
              value={form.erfahrung}
              onChange={(e) => set("erfahrung", e.target.value)}
              className={inputClass("erfahrung")}
            >
              <option value="">{t.fields.erfahrung.placeholder}</option>
              {t.erfahrungen.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            {errors.erfahrung && <p className="mt-1 text-xs text-red-600">{errors.erfahrung}</p>}
          </div>
          <div>
            <label htmlFor="deutschkenntnisse" className={labelClass}>{t.fields.deutschkenntnisse.label}</label>
            <select
              id="deutschkenntnisse"
              value={form.deutschkenntnisse}
              onChange={(e) => set("deutschkenntnisse", e.target.value)}
              className={inputClass("deutschkenntnisse")}
            >
              <option value="">{t.fields.deutschkenntnisse.placeholder}</option>
              {t.deutschniveaus.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            {errors.deutschkenntnisse && <p className="mt-1 text-xs text-red-600">{errors.deutschkenntnisse}</p>}
          </div>
          <div>
            <label htmlFor="verfuegbarkeit" className={labelClass}>{t.fields.verfuegbarkeit.label}</label>
            <select
              id="verfuegbarkeit"
              value={form.verfuegbarkeit}
              onChange={(e) => set("verfuegbarkeit", e.target.value)}
              className={inputClass("verfuegbarkeit")}
            >
              <option value="">{t.fields.verfuegbarkeit.placeholder}</option>
              {t.verfuegbarkeiten.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            {errors.verfuegbarkeit && <p className="mt-1 text-xs text-red-600">{errors.verfuegbarkeit}</p>}
          </div>
        </div>
      </fieldset>

      {/* Dokumente */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-1 pb-2 border-b border-navy-100 w-full">
          {t.sectionDocuments}
        </legend>
        <p className="text-xs text-navy-500 mb-4">{t.sectionDocumentsSubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {t.dokumenteOptions.map((doc) => (
            <label key={doc} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.dokumente.includes(doc)}
                onChange={() => toggleDokument(doc)}
                className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-red-austria"
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
          {t.sectionMotivation}
        </legend>
        <div>
          <label htmlFor="nachricht" className={labelClass}>{t.fields.nachricht.label}</label>
          <textarea
            id="nachricht"
            rows={5}
            value={form.nachricht}
            onChange={(e) => set("nachricht", e.target.value)}
            className={`${inputClass("nachricht")} resize-y`}
            placeholder={t.fields.nachricht.placeholder}
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
            <Link href="/datenschutz" className="text-red-austria underline hover:text-red-austria-dark" target="_blank">
              {/* privacy text includes the link text – we split on the linked word */}
            </Link>
            {t.privacy}
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
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>

      <p className="text-xs text-navy-400 text-center">{t.emailNote}</p>
    </form>
  );
}
