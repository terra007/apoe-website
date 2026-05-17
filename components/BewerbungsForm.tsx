"use client";

import { useState, FormEvent, useRef } from "react";
import { AlertCircle, CheckCircle2, Loader2, Paperclip, X, FileText, Image } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { FormT } from "@/messages/bewerber/types";

interface FormState {
  vorname: string; nachname: string; email: string; telefon: string;
  herkunftsland: string; ausbildung: string; erfahrung: string;
  deutschkenntnisse: string; verfuegbarkeit: string;
  dokumente: string[]; nachricht: string; privacy: boolean;
}

interface UploadedFile { file: File; progress: "pending" | "uploading" | "done" | "error"; error?: string }

const INITIAL: FormState = {
  vorname: "", nachname: "", email: "", telefon: "",
  herkunftsland: "", ausbildung: "", erfahrung: "",
  deutschkenntnisse: "", verfuegbarkeit: "", dokumente: [], nachricht: "", privacy: false,
};

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_SIZE_MB = 10;

function fileIcon(mime: string) {
  if (mime.startsWith("image/")) return <Image className="h-4 w-4 text-blue-500" aria-hidden="true" />;
  return <FileText className="h-4 w-4 text-red-400" aria-hidden="true" />;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function BewerbungsForm({ t }: { t: FormT }) {
  const [form, setForm]         = useState<FormState>(INITIAL);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [uploadFiles, setUploadFiles] = useState<UploadedFile[]>([]);
  const [uploadStep, setUploadStep]   = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  function addFiles(files: FileList | null) {
    if (!files) return;
    const newFiles: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;
      if (uploadFiles.some((u) => u.file.name === file.name && u.file.size === file.size)) continue;
      newFiles.push({ file, progress: "pending" });
    }
    setUploadFiles((prev) => [...prev, ...newFiles]);
  }
  function removeFile(idx: number) {
    setUploadFiles((prev) => prev.filter((_, i) => i !== idx));
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
    if (!form.nachricht.trim() || form.nachricht.trim().length < 20) e.nachricht = t.errors.nachricht;
    if (!form.privacy) e.privacy = t.errors.privacy;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");

    // Step 1: Create application record
    setUploadStep("Bewerbung wird gespeichert …");
    let bewerbungId: string;
    try {
      const res = await fetch("/api/bewerber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dokumente: form.dokumente }),
      });
      let data: Record<string, unknown> = {};
      try { data = await res.json(); } catch { /* non-JSON body */ }
      if (!res.ok) { setServerError((data.error as string) ?? t.errors.serverDefault); setStatus("error"); return; }
      bewerbungId = data.id as string;
    } catch {
      setServerError(t.errors.network);
      setStatus("error");
      return;
    }

    // Step 2: Upload files directly to Supabase Storage
    if (uploadFiles.length > 0) {
      const supabase = createClient();
      for (let i = 0; i < uploadFiles.length; i++) {
        const { file } = uploadFiles[i];
        setUploadStep(`Dokument ${i + 1} / ${uploadFiles.length} wird hochgeladen …`);
        setUploadFiles((prev) => prev.map((u, idx) => idx === i ? { ...u, progress: "uploading" } : u));

        const ext = file.name.split(".").pop() ?? "bin";
        const path = `bewerbungen/${bewerbungId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

        const { error: uploadErr } = await supabase.storage.from("apo-media").upload(path, file, { contentType: file.type });
        if (uploadErr) {
          setUploadFiles((prev) => prev.map((u, idx) => idx === i ? { ...u, progress: "error", error: uploadErr.message } : u));
          continue;
        }

        // Record metadata in DB
        await fetch(`/api/bewerber/${bewerbungId}/dokument`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ original_name: file.name, storage_path: path, mime_type: file.type, groesse: file.size }),
        });

        setUploadFiles((prev) => prev.map((u, idx) => idx === i ? { ...u, progress: "done" } : u));
        void ext; // suppress unused var warning
      }
    }

    setStatus("success");
    setForm(INITIAL);
    setUploadFiles([]);
    setUploadStep("");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" aria-hidden="true" />
        <h3 className="text-xl font-bold text-green-800 mb-2">{t.success.title}</h3>
        <p className="text-green-700 mb-4">{t.success.text}</p>
        <p className="text-sm text-green-600">
          {t.success.emailNote}{" "}
          <a href="mailto:office@apoesterreich.at" className="font-semibold underline">office@apoesterreich.at</a>
        </p>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? "border-red-300 bg-red-50 focus:ring-red-300" : "border-navy-200 bg-white focus:ring-navy-400"
    }`;
  const labelClass = "block text-sm font-medium text-navy-700 mb-1";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Persönliche Daten */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">{t.sectionPersonal}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["vorname", "nachname"] as const).map((f) => (
            <div key={f}>
              <label htmlFor={f} className={labelClass}>{t.fields[f].label}</label>
              <input id={f} type="text" autoComplete={f === "vorname" ? "given-name" : "family-name"}
                value={form[f]} onChange={(e) => set(f, e.target.value)}
                className={inputClass(f)} placeholder={t.fields[f].placeholder} />
              {errors[f] && <p className="mt-1 text-xs text-red-600">{errors[f]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="email" className={labelClass}>{t.fields.email.label}</label>
            <input id="email" type="email" autoComplete="email"
              value={form.email} onChange={(e) => set("email", e.target.value)}
              className={inputClass("email")} placeholder={t.fields.email.placeholder} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telefon" className={labelClass}>{t.fields.telefon.label}</label>
            <input id="telefon" type="tel" autoComplete="tel"
              value={form.telefon} onChange={(e) => set("telefon", e.target.value)}
              className={inputClass("telefon")} placeholder={t.fields.telefon.placeholder} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="herkunftsland" className={labelClass}>{t.fields.herkunftsland.label}</label>
            <input id="herkunftsland" type="text"
              value={form.herkunftsland} onChange={(e) => set("herkunftsland", e.target.value)}
              className={inputClass("herkunftsland")} placeholder={t.fields.herkunftsland.placeholder} />
            {errors.herkunftsland && <p className="mt-1 text-xs text-red-600">{errors.herkunftsland}</p>}
          </div>
        </div>
      </fieldset>

      {/* Berufliches Profil */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">{t.sectionProfessional}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["ausbildung", "erfahrung", "deutschkenntnisse", "verfuegbarkeit"] as const).map((f) => {
            const opts = f === "ausbildung" ? t.ausbildungen : f === "erfahrung" ? t.erfahrungen : f === "deutschkenntnisse" ? t.deutschniveaus : t.verfuegbarkeiten;
            return (
              <div key={f}>
                <label htmlFor={f} className={labelClass}>{t.fields[f].label}</label>
                <select id={f} value={form[f]} onChange={(e) => set(f, e.target.value)} className={inputClass(f)}>
                  <option value="">{t.fields[f].placeholder}</option>
                  {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors[f] && <p className="mt-1 text-xs text-red-600">{errors[f]}</p>}
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Dokumente – Checkliste + Upload */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-1 pb-2 border-b border-navy-100 w-full">{t.sectionDocuments}</legend>
        <p className="text-xs text-navy-500 mb-4">{t.sectionDocumentsSubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {t.dokumenteOptions.map((doc) => (
            <label key={doc} className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={form.dokumente.includes(doc)}
                onChange={() => toggleDokument(doc)}
                className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-red-austria" />
              <span className="text-sm text-navy-700 group-hover:text-navy-900 transition-colors leading-snug">{doc}</span>
            </label>
          ))}
        </div>

        {/* File upload area */}
        <div
          className="rounded-xl border-2 border-dashed border-navy-200 bg-navy-50 p-6 text-center cursor-pointer hover:border-navy-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          role="button"
          aria-label="Dateien hochladen"
        >
          <Paperclip className="mx-auto h-8 w-8 text-navy-300 mb-2" aria-hidden="true" />
          <p className="text-sm font-medium text-navy-600 mb-0.5">Dokumente anhängen</p>
          <p className="text-xs text-navy-400">PDF, JPG, PNG, DOC · max. {MAX_SIZE_MB} MB pro Datei</p>
          <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
            className="hidden" onChange={(e) => addFiles(e.target.files)} />
        </div>

        {uploadFiles.length > 0 && (
          <ul className="mt-3 space-y-2">
            {uploadFiles.map((u, i) => (
              <li key={i} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                u.progress === "error" ? "border-red-200 bg-red-50" :
                u.progress === "done" ? "border-green-200 bg-green-50" : "border-navy-200 bg-white"
              }`}>
                {fileIcon(u.file.type)}
                <span className="flex-1 truncate text-navy-700">{u.file.name}</span>
                <span className="text-xs text-navy-400 flex-shrink-0">{formatSize(u.file.size)}</span>
                {u.progress === "done" && <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />}
                {u.progress === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-navy-400" aria-hidden="true" />}
                {u.progress === "pending" && (
                  <button type="button" onClick={() => removeFile(i)} className="text-navy-300 hover:text-red-500 transition-colors">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      {/* Kurzvorstellung */}
      <fieldset>
        <legend className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-navy-100 w-full">{t.sectionMotivation}</legend>
        <div>
          <label htmlFor="nachricht" className={labelClass}>{t.fields.nachricht.label}</label>
          <textarea id="nachricht" rows={5}
            value={form.nachricht} onChange={(e) => set("nachricht", e.target.value)}
            className={`${inputClass("nachricht")} resize-y`} placeholder={t.fields.nachricht.placeholder} />
          <div className="mt-1 flex justify-between">
            {errors.nachricht ? <p className="text-xs text-red-600">{errors.nachricht}</p> : <span />}
            <span className="text-xs text-navy-400">{form.nachricht.length} / 2000</span>
          </div>
        </div>
      </fieldset>

      {/* Datenschutz */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.privacy} onChange={(e) => set("privacy", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-red-austria" />
          <span className="text-sm text-navy-600">
            <Link href="/datenschutz" className="text-red-austria underline hover:text-red-austria-dark" target="_blank">
              {/* linked inline below */}
            </Link>
            {t.privacy}
          </span>
        </label>
        {errors.privacy && <p className="mt-1 text-xs text-red-600">{errors.privacy}</p>}
      </div>

      {status === "error" && serverError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <button type="submit" disabled={status === "loading"}
        className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
            {uploadStep || t.submitting}
          </>
        ) : t.submit}
      </button>
      <p className="text-xs text-navy-400 text-center">{t.emailNote}</p>
    </form>
  );
}
