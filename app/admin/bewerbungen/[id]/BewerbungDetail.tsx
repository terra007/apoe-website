"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2, Clock, Download, FileText, Image as ImageIcon,
  Loader2, Plus, Trash2, X, AlertCircle, Save,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "neu",                  label: "Neu" },
  { value: "in_pruefung",          label: "In Prüfung" },
  { value: "unterlagen_angefragt", label: "Unterlagen angefragt" },
  { value: "akzeptiert",           label: "Akzeptiert" },
  { value: "abgelehnt",            label: "Abgelehnt" },
];

const STATUS_STYLES: Record<string, string> = {
  neu:                   "bg-blue-100 text-blue-700",
  in_pruefung:           "bg-yellow-100 text-yellow-700",
  unterlagen_angefragt:  "bg-orange-100 text-orange-700",
  akzeptiert:            "bg-green-100 text-green-700",
  abgelehnt:             "bg-red-100 text-red-700",
};

type Dokument = {
  id: string;
  original_name: string;
  storage_path: string;
  uploaded_by: "bewerber" | "admin";
  mime_type: string | null;
  groesse: number | null;
  created_at: string;
  url: string;
};

type Bewerbung = {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string | null;
  herkunftsland: string;
  ausbildung: string;
  erfahrung: string;
  deutschkenntnisse: string;
  verfuegbarkeit: string;
  nachricht: string;
  vorhandene_dokumente: string[];
  status: string;
  admin_notizen: string;
  angefragt_dokumente: string[];
  created_at: string;
  bewerbung_dokumente: Dokument[];
};

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function DocIcon({ mime }: { mime: string | null }) {
  if (mime?.startsWith("image/")) return <ImageIcon className="h-4 w-4 text-blue-500" aria-hidden="true" />;
  return <FileText className="h-4 w-4 text-red-400" aria-hidden="true" />;
}

export default function BewerbungDetail({ initial, supabaseUrl, anonKey }: {
  initial: Bewerbung;
  supabaseUrl: string;
  anonKey: string;
}) {
  const router = useRouter();
  const [bew, setBew]         = useState<Bewerbung>(initial);
  const [notizen, setNotizen] = useState(initial.admin_notizen ?? "");
  const [status, setStatus]   = useState(initial.status);
  const [saving, setSaving]   = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [newAnfrage, setNewAnfrage]   = useState("");
  const [anfragen, setAnfragen]       = useState<string[]>(initial.angefragt_dokumente ?? []);

  const [uploading, setUploading]     = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const publicUrl = (path: string) =>
    `${supabaseUrl}/storage/v1/object/public/apo-media/${path}`;

  async function patch(payload: Record<string, unknown>) {
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  }

  async function saveAll() {
    setSaving(true);
    setSaveMsg("");
    const ok = await patch({ status, admin_notizen: notizen, angefragt_dokumente: anfragen });
    setSaving(false);
    setSaveMsg(ok ? "Gespeichert." : "Fehler beim Speichern.");
    if (ok) setTimeout(() => setSaveMsg(""), 3000);
  }

  async function uploadAdminDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { setUploadError("Datei zu groß (max. 20 MB)."); return; }
    setUploading(true);
    setUploadError("");

    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}/dokument`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) { setUploadError(data.error ?? "Upload fehlgeschlagen."); return; }
    const newDoc: Dokument = { ...data, url: publicUrl(data.storage_path) };
    setBew((prev) => ({ ...prev, bewerbung_dokumente: [...prev.bewerbung_dokumente, newDoc] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function deleteDoc(docId: string) {
    if (!confirm("Dokument wirklich löschen?")) return;
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}/dokument/${docId}`, { method: "DELETE" });
    if (res.ok) setBew((prev) => ({ ...prev, bewerbung_dokumente: prev.bewerbung_dokumente.filter((d) => d.id !== docId) }));
  }

  async function deleteBewerbung() {
    if (!confirm(`Bewerbung von ${bew.vorname} ${bew.nachname} und alle Dokumente wirklich löschen?`)) return;
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/bewerbungen");
  }

  function addAnfrage() {
    const trimmed = newAnfrage.trim();
    if (!trimmed || anfragen.includes(trimmed)) return;
    setAnfragen((prev) => [...prev, trimmed]);
    setNewAnfrage("");
  }

  function removeAnfrage(item: string) {
    setAnfragen((prev) => prev.filter((a) => a !== item));
  }

  const bewerberDocs = bew.bewerbung_dokumente.filter((d) => d.uploaded_by === "bewerber");
  const adminDocs    = bew.bewerbung_dokumente.filter((d) => d.uploaded_by === "admin");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{bew.vorname} {bew.nachname}</h1>
          <p className="text-sm text-navy-500 mt-0.5">
            Eingegangen am {new Date(bew.created_at).toLocaleDateString("de-AT", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
        <button onClick={deleteBewerbung}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">
          <Trash2 className="h-3.5 w-3.5" />
          Bewerbung löschen
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details + Admin Actions */}
        <div className="lg:col-span-2 space-y-6">

          {/* Applicant Info */}
          <div className="rounded-2xl border border-navy-200 bg-white p-6">
            <h2 className="text-base font-bold text-navy-900 mb-4">Bewerberdaten</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["E-Mail", bew.email, `mailto:${bew.email}`],
                ["Telefon / WhatsApp", bew.telefon ?? "—", bew.telefon ? `tel:${bew.telefon}` : null],
                ["Herkunftsland", bew.herkunftsland, null],
                ["Ausbildung", bew.ausbildung, null],
                ["Berufserfahrung", bew.erfahrung, null],
                ["Deutschkenntnisse", bew.deutschkenntnisse, null],
                ["Verfügbarkeit", bew.verfuegbarkeit, null],
              ].map(([label, value, href]) => (
                <div key={label as string}>
                  <dt className="text-xs text-navy-400 mb-0.5">{label}</dt>
                  <dd className="font-medium text-navy-800">
                    {href ? <a href={href as string} className="text-red-austria hover:underline">{value}</a> : value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 pt-4 border-t border-navy-100">
              <dt className="text-xs text-navy-400 mb-1">Kurzvorstellung</dt>
              <dd className="text-sm text-navy-700 leading-relaxed whitespace-pre-wrap">{bew.nachricht}</dd>
            </div>
            {bew.vorhandene_dokumente.length > 0 && (
              <div className="mt-4 pt-4 border-t border-navy-100">
                <dt className="text-xs text-navy-400 mb-2">Vorhandene Dokumente (laut Bewerber)</dt>
                <div className="flex flex-wrap gap-1.5">
                  {bew.vorhandene_dokumente.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status + Notes */}
          <div className="rounded-2xl border border-navy-200 bg-white p-6">
            <h2 className="text-base font-bold text-navy-900 mb-4">Status & Notizen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-navy-500 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-400">
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? "bg-navy-100 text-navy-600"}`}>
                  {STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-navy-500 mb-1">Admin-Notizen (intern)</label>
              <textarea value={notizen} onChange={(e) => setNotizen(e.target.value)} rows={4}
                className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-400 resize-y"
                placeholder="Interne Notizen, Gesprächsprotokoll, nächste Schritte …" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={saveAll} disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700 transition-colors disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Speichern
              </button>
              {saveMsg && <span className="text-sm text-green-600">{saveMsg}</span>}
            </div>
          </div>

          {/* Requested Documents */}
          <div className="rounded-2xl border border-navy-200 bg-white p-6">
            <h2 className="text-base font-bold text-navy-900 mb-4">Unterlagen anfragen</h2>
            <div className="flex gap-2 mb-3">
              <input value={newAnfrage} onChange={(e) => setNewAnfrage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAnfrage(); }}}
                placeholder="z. B. Polizeiliches Führungszeugnis"
                className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400" />
              <button onClick={addAnfrage}
                className="inline-flex items-center gap-1 rounded-lg bg-red-austria px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
                <Plus className="h-4 w-4" /> Hinzufügen
              </button>
            </div>
            {anfragen.length > 0 ? (
              <ul className="space-y-2">
                {anfragen.map((a) => (
                  <li key={a} className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2">
                    <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="flex-1 text-sm text-navy-700">{a}</span>
                    <button onClick={() => removeAnfrage(a)} className="text-navy-300 hover:text-red-500 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-navy-400">Keine Unterlagen angefragt.</p>
            )}
            <p className="text-xs text-navy-400 mt-3">Änderungen werden beim Speichern (oben) gespeichert.</p>
          </div>
        </div>

        {/* Right: Documents */}
        <div className="space-y-6">
          {/* Bewerber documents */}
          <div className="rounded-2xl border border-navy-200 bg-white p-5">
            <h2 className="text-base font-bold text-navy-900 mb-4">
              Dokumente vom Bewerber
              <span className="ml-2 text-xs font-normal text-navy-400">({bewerberDocs.length})</span>
            </h2>
            {bewerberDocs.length === 0 ? (
              <p className="text-xs text-navy-400">Noch keine Dokumente hochgeladen.</p>
            ) : (
              <ul className="space-y-2">
                {bewerberDocs.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2">
                    <DocIcon mime={doc.mime_type} />
                    <span className="flex-1 truncate text-xs text-navy-700" title={doc.original_name}>{doc.original_name}</span>
                    <span className="text-xs text-navy-400 flex-shrink-0">{formatSize(doc.groesse)}</span>
                    <a href={publicUrl(doc.storage_path)} target="_blank" rel="noopener noreferrer"
                      className="text-navy-300 hover:text-navy-700 transition-colors flex-shrink-0" title="Herunterladen">
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <button onClick={() => deleteDoc(doc.id)}
                      className="text-navy-300 hover:text-red-500 transition-colors flex-shrink-0" title="Löschen">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Admin documents */}
          <div className="rounded-2xl border border-navy-200 bg-white p-5">
            <h2 className="text-base font-bold text-navy-900 mb-4">
              Admin-Dokumente
              <span className="ml-2 text-xs font-normal text-navy-400">({adminDocs.length})</span>
            </h2>
            {adminDocs.length > 0 && (
              <ul className="space-y-2 mb-4">
                {adminDocs.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
                    <DocIcon mime={doc.mime_type} />
                    <span className="flex-1 truncate text-xs text-navy-700" title={doc.original_name}>{doc.original_name}</span>
                    <span className="text-xs text-navy-400 flex-shrink-0">{formatSize(doc.groesse)}</span>
                    <a href={publicUrl(doc.storage_path)} target="_blank" rel="noopener noreferrer"
                      className="text-navy-300 hover:text-navy-700 transition-colors flex-shrink-0" title="Herunterladen">
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <button onClick={() => deleteDoc(doc.id)}
                      className="text-navy-300 hover:text-red-500 transition-colors flex-shrink-0" title="Löschen">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Upload area */}
            <div
              className="rounded-xl border-2 border-dashed border-navy-200 bg-navy-50 p-4 text-center cursor-pointer hover:border-navy-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f && fileInputRef.current) {
                  const dt = new DataTransfer();
                  dt.items.add(f);
                  fileInputRef.current.files = dt.files;
                  await uploadAdminDoc({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
                }
              }}>
              {uploading ? (
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-navy-400 mb-1" />
              ) : (
                <Plus className="mx-auto h-6 w-6 text-navy-300 mb-1" />
              )}
              <p className="text-xs text-navy-500">
                {uploading ? "Wird hochgeladen …" : "Dokument hochladen"}
              </p>
              <p className="text-xs text-navy-400">PDF, JPG, PNG, DOC · max. 20 MB</p>
              <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                className="hidden" onChange={uploadAdminDoc} />
            </div>
            {uploadError && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5" /> {uploadError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
