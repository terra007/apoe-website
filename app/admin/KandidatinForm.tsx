"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, ArrowLeft, Upload, X, Film, Image as ImageIcon } from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/client";
import type { Pflegekraft, DocumentStatus, LanguageLevel, Phase } from "@/lib/pflegekraefte-data";

const AVATAR_COLORS = [
  { label: "Blau", value: "from-blue-600 to-blue-800" },
  { label: "Lila", value: "from-purple-600 to-purple-800" },
  { label: "Grün", value: "from-green-600 to-green-800" },
  { label: "Pink", value: "from-pink-600 to-pink-800" },
  { label: "Rot", value: "from-red-600 to-red-800" },
  { label: "Amber", value: "from-amber-600 to-amber-800" },
  { label: "Teal", value: "from-teal-600 to-teal-800" },
  { label: "Indigo", value: "from-indigo-600 to-indigo-800" },
];

const DOC_SUGGESTIONS = [
  "Pflegediplom",
  "Geburtsurkunde (Apostille)",
  "Strafregisterbescheinigung TH",
  "ÖSD-Zertifikat B1",
  "ÖSD-Zertifikat B2",
  "RWR-Antrag AMS",
  "RWR-Karte",
  "Botschafts-Visum D",
  "Nostrifizierungsantrag DGKP",
];

const SKILL_SUGGESTIONS = [
  "Altenpflege", "Grundpflege", "Demenzbetreuung", "Wundversorgung",
  "Wundmanagement", "Mobilitätsförderung", "Pflegedokumentation",
  "Körperpflege", "Sturzprävention", "Aktivierungsbetreuung",
  "Angehörigenberatung", "Ernährungsunterstützung", "Soziale Betreuung",
  "Freizeitgestaltung", "Palliativbegleitung", "Sterbebegleitung",
  "Schmerzmanagement", "Biografiearbeit", "Teamführung", "Pflegeplanung",
];

interface FormState {
  name: string;
  nameThai: string;
  namePhonetic: string;
  age: string;
  experienceYears: string;
  specialization: string;
  languageLevel: LanguageLevel;
  languageProgress: string;
  currentPhase: string;
  phaseStatus: string;
  bio: string;
  skills: string[];
  availableFrom: string;
  videoUrl: string;
  photoUrl: string;
  avatarColor: string;
  documents: { name: string; status: DocumentStatus }[];
}

const EMPTY_FORM: FormState = {
  name: "",
  nameThai: "",
  namePhonetic: "",
  age: "",
  experienceYears: "",
  specialization: "Altenpflege",
  languageLevel: "B1",
  languageProgress: "0",
  currentPhase: "1",
  phaseStatus: "",
  bio: "",
  skills: [],
  availableFrom: "",
  videoUrl: "",
  photoUrl: "",
  avatarColor: "from-blue-600 to-blue-800",
  documents: [],
};

function toFormState(pk: Pflegekraft): FormState {
  return {
    name: pk.name,
    nameThai: pk.nameThai,
    namePhonetic: pk.namePhonetic,
    age: String(pk.age),
    experienceYears: String(pk.experienceYears),
    specialization: pk.specialization,
    languageLevel: pk.languageLevel,
    languageProgress: String(pk.languageProgress),
    currentPhase: String(pk.currentPhase),
    phaseStatus: pk.phaseStatus,
    bio: pk.bio,
    skills: [...pk.skills],
    availableFrom: pk.availableFrom,
    videoUrl: pk.videoUrl ?? "",
    photoUrl: pk.photoUrl ?? "",
    avatarColor: pk.avatarColor,
    documents: pk.documents.map((d) => ({ ...d })),
  };
}

function toPayload(form: FormState, slug: string): Pflegekraft {
  return {
    slug,
    name: form.name.trim(),
    nameThai: form.nameThai.trim(),
    namePhonetic: form.namePhonetic.trim(),
    age: parseInt(form.age, 10),
    experienceYears: parseInt(form.experienceYears, 10),
    specialization: form.specialization.trim(),
    languageLevel: form.languageLevel,
    languageProgress: parseInt(form.languageProgress, 10),
    currentPhase: parseInt(form.currentPhase, 10) as Phase,
    phaseStatus: form.phaseStatus.trim(),
    bio: form.bio.trim(),
    skills: form.skills.filter(Boolean),
    availableFrom: form.availableFrom.trim(),
    videoUrl: form.videoUrl.trim() || undefined,
    photoUrl: form.photoUrl.trim() || undefined,
    avatarColor: form.avatarColor,
    documents: form.documents.filter((d) => d.name.trim()),
  };
}

export default function KandidatinForm({
  existing,
}: {
  existing?: Pflegekraft;
}) {
  const router = useRouter();
  const isEdit = !!existing;

  const [form, setForm] = useState<FormState>(
    existing ? toFormState(existing) : EMPTY_FORM
  );
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [slugManual, setSlugManual] = useState(isEdit);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Auto-generate slug from name when creating
  useEffect(() => {
    if (!slugManual && form.name) {
      setSlug(generateSlug(form.name));
    }
  }, [form.name, slugManual]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed || form.skills.includes(trimmed)) return;
    setField("skills", [...form.skills, trimmed]);
    setNewSkill("");
  }

  function removeSkill(skill: string) {
    setField("skills", form.skills.filter((s) => s !== skill));
  }

  function addDocument() {
    setField("documents", [...form.documents, { name: "", status: "ausstehend" }]);
  }

  function updateDocument(i: number, key: "name" | "status", value: string) {
    const updated = form.documents.map((d, idx) =>
      idx === i ? { ...d, [key]: value } : d
    );
    setField("documents", updated);
  }

  function removeDocument(i: number) {
    setField("documents", form.documents.filter((_, idx) => idx !== i));
  }

  async function deleteStorageFile(url: string) {
    if (!url || !url.includes("supabase")) return;
    const marker = "/apo-media/";
    const idx = url.indexOf(marker);
    if (idx === -1) return;
    const path = url.slice(idx + marker.length).split("?")[0];
    const supabase = createClient();
    await supabase.storage.from("apo-media").remove([path]);
  }

  async function uploadFile(
    file: File,
    type: "video" | "photo",
    setUploading: (v: boolean) => void
  ) {
    if (!slug) { setUploadError("Bitte zuerst einen Slug festlegen."); return; }
    setUploading(true);
    setUploadError("");

    // Delete old file from storage before uploading new one
    const existingUrl = type === "video" ? form.videoUrl : form.photoUrl;
    if (existingUrl) await deleteStorageFile(existingUrl);

    const ext = file.name.split(".").pop();
    const path = `kandidatinnen/${slug}/${type}.${ext}`;
    const supabase = createClient();

    const { error: uploadErr } = await supabase.storage
      .from("apo-media")
      .upload(path, file, { upsert: true });

    setUploading(false);

    if (uploadErr) {
      setUploadError(`Upload fehlgeschlagen: ${uploadErr.message}`);
      return;
    }

    const { data } = supabase.storage.from("apo-media").getPublicUrl(path);
    if (type === "video") setField("videoUrl", data.publicUrl);
    if (type === "photo") setField("photoUrl", data.publicUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = toPayload(form, slug);

    const res = isEdit
      ? await fetch(`/api/admin/kandidatinnen/${existing!.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/kandidatinnen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setSaving(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Unbekannter Fehler");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 focus:border-red-austria focus:outline-none focus:ring-1 focus:ring-red-austria placeholder-navy-400";
  const labelCls = "block text-xs font-semibold text-navy-600 mb-1 uppercase tracking-wider";
  const sectionCls = "rounded-2xl border border-navy-200 bg-white p-5 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-navy-200 p-2 text-navy-500 hover:bg-navy-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-xl font-bold text-navy-900">
          {isEdit ? `Bearbeiten: ${existing!.name}` : "Neue Kandidatin anlegen"}
        </h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Fehler: {error}
        </div>
      )}

      {/* Personal Info */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-navy-100 pb-2">
          Persönliche Daten
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Name (Lateinisch) *</label>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="z.B. Nattaya Charoenwong"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Name (Thai-Schrift)</label>
            <input
              className={inputCls}
              value={form.nameThai}
              onChange={(e) => setField("nameThai", e.target.value)}
              placeholder="z.B. นัตยา เจริญวงศ์"
            />
          </div>
          <div>
            <label className={labelCls}>Aussprache (Phonetik)</label>
            <input
              className={inputCls}
              value={form.namePhonetic}
              onChange={(e) => setField("namePhonetic", e.target.value)}
              placeholder="z.B. nat-ta-ya · cha-roen-wong"
            />
          </div>
          <div>
            <label className={labelCls}>URL-Slug *</label>
            <div className="flex gap-2">
              <input
                className={inputCls}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                }}
                required
                disabled={isEdit}
                placeholder="nattaya-charoenwong"
              />
              {!isEdit && (
                <button
                  type="button"
                  onClick={() => { setSlugManual(false); setSlug(generateSlug(form.name)); }}
                  className="flex-shrink-0 rounded-lg border border-navy-200 px-3 text-xs text-navy-500 hover:bg-navy-50"
                >
                  Auto
                </button>
              )}
            </div>
            {isEdit && <p className="text-xs text-navy-400 mt-1">Slug kann nach Erstellung nicht geändert werden.</p>}
          </div>
          <div>
            <label className={labelCls}>Alter *</label>
            <input
              type="number"
              className={inputCls}
              value={form.age}
              onChange={(e) => setField("age", e.target.value)}
              min={18}
              max={70}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Berufserfahrung (Jahre) *</label>
            <input
              type="number"
              className={inputCls}
              value={form.experienceYears}
              onChange={(e) => setField("experienceYears", e.target.value)}
              min={0}
              max={50}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Spezialisierung *</label>
            <input
              className={inputCls}
              value={form.specialization}
              onChange={(e) => setField("specialization", e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelCls}>Verfügbar ab *</label>
            <input
              className={inputCls}
              value={form.availableFrom}
              onChange={(e) => setField("availableFrom", e.target.value)}
              placeholder="z.B. Q4 2025 oder Oktober 2025"
              required
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Biografie *</label>
          <textarea
            className={`${inputCls} min-h-[120px] resize-y`}
            value={form.bio}
            onChange={(e) => setField("bio", e.target.value)}
            required
            placeholder="Kurze Beschreibung der Kandidatin für das öffentliche Profil…"
          />
        </div>
      </div>

      {/* Language & Phase */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-navy-100 pb-2">
          Sprachstand & Prozessphase
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Deutschniveau *</label>
            <select
              className={inputCls}
              value={form.languageLevel}
              onChange={(e) => setField("languageLevel", e.target.value as LanguageLevel)}
            >
              {(["A1", "A2", "B1", "B2"] as LanguageLevel[]).map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Sprachfortschritt (0–100)</label>
            <input
              type="number"
              className={inputCls}
              value={form.languageProgress}
              onChange={(e) => setField("languageProgress", e.target.value)}
              min={0}
              max={100}
            />
          </div>
          <div>
            <label className={labelCls}>Aktuelle Phase *</label>
            <select
              className={inputCls}
              value={form.currentPhase}
              onChange={(e) => setField("currentPhase", e.target.value)}
            >
              <option value="1">Phase 1 – Rekrutierung & Sprachkurs</option>
              <option value="2">Phase 2 – RWR-Karte & Legalisation</option>
              <option value="3">Phase 3 – Einreise & Dienstantritt</option>
              <option value="4">Phase 4 – Nostrifizierung DGKP</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Phasenstatus *</label>
            <input
              className={inputCls}
              value={form.phaseStatus}
              onChange={(e) => setField("phaseStatus", e.target.value)}
              placeholder="z.B. RWR-Antrag eingereicht"
              required
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-navy-100 pb-2">
          Fachkompetenzen
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-navy-400 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
          {form.skills.length === 0 && (
            <p className="text-xs text-navy-400">Noch keine Skills hinzugefügt.</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            className={`${inputCls} flex-1`}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(newSkill); } }}
            placeholder="Skill eingeben oder auswählen…"
            list="skill-suggestions"
          />
          <datalist id="skill-suggestions">
            {SKILL_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
          </datalist>
          <button
            type="button"
            onClick={() => addSkill(newSkill)}
            className="flex-shrink-0 rounded-lg bg-navy-100 px-3 py-2 text-xs font-medium text-navy-700 hover:bg-navy-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className={sectionCls}>
        <div className="flex items-center justify-between border-b border-navy-100 pb-2 mb-2">
          <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
            Dokumente
          </h2>
          <button
            type="button"
            onClick={addDocument}
            className="inline-flex items-center gap-1 rounded-lg bg-navy-100 px-3 py-1.5 text-xs font-medium text-navy-700 hover:bg-navy-200 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Hinzufügen
          </button>
        </div>
        <div className="space-y-2">
          {form.documents.map((doc, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={`${inputCls} flex-1`}
                value={doc.name}
                onChange={(e) => updateDocument(i, "name", e.target.value)}
                placeholder="Dokumentname"
                list="doc-suggestions"
              />
              <datalist id="doc-suggestions">
                {DOC_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
              </datalist>
              <select
                className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-xs text-navy-900 focus:border-red-austria focus:outline-none"
                value={doc.status}
                onChange={(e) => updateDocument(i, "status", e.target.value as DocumentStatus)}
              >
                <option value="ausstehend">Ausstehend</option>
                <option value="eingereicht">Eingereicht</option>
                <option value="anerkannt">Anerkannt</option>
              </select>
              <button
                type="button"
                onClick={() => removeDocument(i)}
                className="flex-shrink-0 rounded-lg p-2 text-navy-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {form.documents.length === 0 && (
            <p className="text-xs text-navy-400 text-center py-3">
              Noch keine Dokumente. Klicken Sie auf „Hinzufügen".
            </p>
          )}
        </div>
      </div>

      {/* Appearance & Media */}
      <div className={sectionCls}>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-navy-100 pb-2">
          Darstellung & Medien
        </h2>

        {uploadError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
            {uploadError}
          </div>
        )}

        {/* Avatar color */}
        <div>
          <label className={labelCls}>Avatar-Hintergrundfarbe</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setField("avatarColor", c.value)}
                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.value} border-2 transition-all ${
                  form.avatarColor === c.value ? "border-navy-900 scale-110" : "border-transparent"
                }`}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Photo upload */}
          <div>
            <label className={labelCls}>Foto (JPG / PNG)</label>
            <div className="mt-1 space-y-2">
              {form.photoUrl ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.photoUrl}
                    alt="Vorschau"
                    className="h-20 w-20 rounded-xl object-cover border border-navy-200"
                  />
                  <button
                    type="button"
                    onClick={async () => { await deleteStorageFile(form.photoUrl); setField("photoUrl", ""); }}
                    className="absolute -top-1.5 -right-1.5 rounded-full bg-red-600 p-0.5 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-navy-200 bg-navy-50">
                  <ImageIcon className="h-7 w-7 text-navy-300" />
                </div>
              )}
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 transition-colors">
                <Upload className="h-3.5 w-3.5" />
                {photoUploading ? "Lädt hoch…" : "Foto hochladen"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={photoUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(file, "photo", setPhotoUploading);
                  }}
                />
              </label>
              <div>
                <input
                  className={`${inputCls} text-xs`}
                  value={form.photoUrl}
                  onChange={(e) => setField("photoUrl", e.target.value)}
                  placeholder="oder URL direkt eingeben"
                />
              </div>
            </div>
          </div>

          {/* Video upload */}
          <div>
            <label className={labelCls}>Vorstellungsvideo (MP4)</label>
            <div className="mt-1 space-y-2">
              {form.videoUrl ? (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                  <Film className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-green-700 flex-1 truncate">{form.videoUrl}</span>
                  <button
                    type="button"
                    onClick={async () => { await deleteStorageFile(form.videoUrl); setField("videoUrl", ""); }}
                    className="text-green-500 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex h-10 items-center gap-2 rounded-lg border-2 border-dashed border-navy-200 bg-navy-50 px-3">
                  <Film className="h-4 w-4 text-navy-300" />
                  <span className="text-xs text-navy-400">Kein Video</span>
                </div>
              )}
              <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 transition-colors">
                <Upload className="h-3.5 w-3.5" />
                {videoUploading ? "Lädt hoch…" : "Video hochladen"}
                <input
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  disabled={videoUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile(file, "video", setVideoUploading);
                  }}
                />
              </label>
              <div>
                <input
                  className={`${inputCls} text-xs`}
                  value={form.videoUrl}
                  onChange={(e) => setField("videoUrl", e.target.value)}
                  placeholder="oder URL direkt eingeben"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-navy-200 px-4 py-2 text-sm text-navy-600 hover:bg-navy-50 transition-colors"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-red-austria px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="h-4 w-4" />
          {saving ? "Wird gespeichert…" : isEdit ? "Änderungen speichern" : "Kandidatin anlegen"}
        </button>
      </div>
    </form>
  );
}
