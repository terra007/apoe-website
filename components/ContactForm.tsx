"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

const subjects = [
  "Erstgespräch für Bedarfserhebung",
  "Ausschreibungsunterlagen anfordern",
  "Allgemeine Anfrage",
  "Kooperationsanfrage",
  "Sonstiges",
];

const initialForm: FormData = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  subject: subjects[0],
  message: "",
  privacy: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name ist erforderlich.";
    if (!form.organisation.trim())
      next.organisation = "Organisation / Gemeinde ist erforderlich.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!form.message.trim() || form.message.trim().length < 20)
      next.message = "Nachricht muss mindestens 20 Zeichen enthalten.";
    if (!form.privacy)
      next.privacy = "Bitte stimmen Sie der Datenschutzerklärung zu.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold text-green-900 mb-2">
          Ihre Anfrage wurde gesendet!
        </h3>
        <p className="text-green-700 mb-6">
          Vielen Dank für Ihre Kontaktaufnahme. Ein APÖ-Berater wird sich
          innerhalb von 48 Stunden bei Ihnen melden.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>
            Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es
            erneut oder kontaktieren Sie uns direkt per E-Mail.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1">
            Vor- & Nachname <span className="text-red-austria">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={cn(
              "w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder-navy-300 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent",
              errors.name ? "border-red-300 bg-red-50" : "border-navy-200 bg-white"
            )}
            placeholder="Mag. Maria Muster"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="organisation" className="block text-sm font-medium text-navy-700 mb-1">
            Organisation / Gemeinde <span className="text-red-austria">*</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            value={form.organisation}
            onChange={handleChange}
            className={cn(
              "w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder-navy-300 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent",
              errors.organisation ? "border-red-300 bg-red-50" : "border-navy-200 bg-white"
            )}
            placeholder="Gemeinde Musterstadt / LKH Muster"
            aria-describedby={errors.organisation ? "org-error" : undefined}
          />
          {errors.organisation && (
            <p id="org-error" className="mt-1 text-xs text-red-600">
              {errors.organisation}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
            E-Mail-Adresse <span className="text-red-austria">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={cn(
              "w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder-navy-300 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent",
              errors.email ? "border-red-300 bg-red-50" : "border-navy-200 bg-white"
            )}
            placeholder="m.muster@gemeinde.at"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1">
            Telefon (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 placeholder-navy-300 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            placeholder="+43 1 234 567 890"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-1">
          Betreff
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1">
          Ihre Nachricht <span className="text-red-austria">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder-navy-300 resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent",
            errors.message ? "border-red-300 bg-red-50" : "border-navy-200 bg-white"
          )}
          placeholder="Beschreiben Sie Ihren Bedarf (Anzahl benötigter Pflegekräfte, Region, Zeitrahmen) ..."
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="privacy"
            checked={form.privacy}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 text-red-austria focus:ring-red-austria"
          />
          <span className="text-sm text-navy-600">
            Ich habe die{" "}
            <a
              href="/datenschutz"
              className="text-navy-700 underline hover:text-red-austria"
              target="_blank"
            >
              Datenschutzerklärung
            </a>{" "}
            gelesen und bin mit der Verarbeitung meiner Daten zum Zweck der
            Kontaktaufnahme einverstanden. <span className="text-red-austria">*</span>
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1 ml-7 text-xs text-red-600">{errors.privacy}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Wird gesendet …
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Anfrage senden
          </>
        )}
      </button>

      <p className="text-xs text-navy-400">
        * Pflichtfelder. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer
        Anfrage verwendet. Keine Weitergabe an Dritte. (DSGVO-konform)
      </p>
    </form>
  );
}
