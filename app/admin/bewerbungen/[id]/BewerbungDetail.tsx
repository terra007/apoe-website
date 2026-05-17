"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { deAusbildung, deDeutsch, deDokument, deErfahrung, deVerfueg } from "@/lib/normalizeToDE";
import {
  AlertCircle, CheckCircle2, Clock, Copy, Download, Eye,
  FileText, Image as ImageIcon, Link as LinkIcon,
  Loader2, Mail, Plus, Save, Trash2, X,
} from "lucide-react";

// ── Preview Modal ─────────────────────────────────────────────────────────────
function PreviewModal({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(name);
  const isPdf   = /\.pdf$/i.test(name);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-navy-900 truncate max-w-[70%]">{name}</p>
          <div className="flex items-center gap-2">
            <a href={url} download target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-medium text-navy-600 hover:bg-navy-50 transition-colors">
              <Download className="h-3.5 w-3.5" /> Herunterladen
            </a>
            <button onClick={onClose} className="rounded-lg p-1.5 text-navy-400 hover:bg-navy-100 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4" style={{ minHeight: 300 }}>
          {isImage && (
            <img src={url} alt={name} className="max-w-full max-h-[70vh] rounded-xl shadow object-contain" />
          )}
          {isPdf && (
            <iframe src={url} title={name} className="w-full rounded-xl" style={{ height: "70vh" }} />
          )}
          {!isImage && !isPdf && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-navy-300 mx-auto mb-3" />
              <p className="text-sm text-navy-500 mb-4">Keine Vorschau verfügbar für diesen Dateityp.</p>
              <a href={url} download target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700 transition-colors">
                <Download className="h-4 w-4" /> Datei herunterladen
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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

const DOKUMENT_VORSCHLAEGE = [
  "Polizeiliches Führungszeugnis",
  "Reisepass (gültig)",
  "Deutschzertifikat (ÖSD / Goethe / telc / ÖIF)",
  "Pflegediplom / Ausbildungsnachweis",
  "Lehrplan mit Stundenübersicht (Theorie & Praxis)",
  "Nachweis der Ausbildungseinrichtung",
  "Arbeitszeugnis / Beschäftigungsnachweis",
  "Geburtsurkunde",
  "Lichtbild (aktuelles Passfoto)",
  "Beglaubigte deutsche Übersetzung",
  "Apostille-Beglaubigung",
];

type Dokument = {
  id: string; original_name: string; storage_path: string;
  uploaded_by: "bewerber" | "admin" | "portal";
  mime_type: string | null; groesse: number | null; created_at: string; url: string;
};

type Bewerbung = {
  id: string; vorname: string; nachname: string; email: string; telefon: string | null;
  herkunftsland: string; ausbildung: string; erfahrung: string;
  deutschkenntnisse: string; verfuegbarkeit: string; nachricht: string;
  vorhandene_dokumente: string[]; status: string; admin_notizen: string;
  angefragt_dokumente: string[]; created_at: string; bewerbung_dokumente: Dokument[];
};

function fmt(bytes: number | null) {
  if (!bytes) return "";
  return bytes < 1048576 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1048576).toFixed(1)} MB`;
}
function DocIcon({ mime }: { mime: string | null }) {
  return mime?.startsWith("image/")
    ? <ImageIcon className="h-4 w-4 text-blue-500" />
    : <FileText className="h-4 w-4 text-red-400" />;
}

export default function BewerbungDetail({ initial, supabaseUrl }: {
  initial: Bewerbung; supabaseUrl: string; anonKey: string;
}) {
  const router = useRouter();
  const [bew, setBew]           = useState<Bewerbung>(initial);
  const [notizen, setNotizen]   = useState(initial.admin_notizen ?? "");
  const [status, setStatus]     = useState(initial.status);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState("");
  const [preview, setPreview]   = useState<{ url: string; name: string } | null>(null);

  // Document request
  const [selected, setSelected]         = useState<string[]>(initial.angefragt_dokumente ?? []);
  const [customDoc, setCustomDoc]       = useState("");
  const [sending, setSending]           = useState(false);
  const [sendResult, setSendResult]     = useState<{ portalUrl: string; emailSent: boolean } | null>(null);
  const [sendError, setSendError]       = useState("");
  const [copied, setCopied]             = useState(false);

  // Admin file upload
  const [uploading, setUploading]       = useState(false);
  const [uploadError, setUploadError]   = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const publicUrl = (path: string) =>
    `${supabaseUrl}/storage/v1/object/public/apo-media/${path}`;

  async function patch(payload: Record<string, unknown>) {
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  }

  async function saveAll() {
    setSaving(true); setSaveMsg("");
    const ok = await patch({ status, admin_notizen: notizen, angefragt_dokumente: selected });
    setSaving(false);
    setSaveMsg(ok ? "Gespeichert." : "Fehler beim Speichern.");
    if (ok) setTimeout(() => setSaveMsg(""), 3000);
  }

  function toggleChip(doc: string) {
    setSelected((p) => p.includes(doc) ? p.filter((d) => d !== doc) : [...p, doc]);
  }
  function addCustom() {
    const t = customDoc.trim();
    if (t && !selected.includes(t)) { setSelected((p) => [...p, t]); }
    setCustomDoc("");
  }
  function removeSelected(doc: string) { setSelected((p) => p.filter((d) => d !== doc)); }

  async function sendAnfrage() {
    if (!selected.length) { setSendError("Bitte mindestens ein Dokument auswählen."); return; }
    setSending(true); setSendError(""); setSendResult(null);
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}/dokument-anfrage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dokumente: selected }),
    });
    const data = await res.json();
    setSending(false);
    if (!res.ok) { setSendError(data.error ?? "Fehler."); return; }
    setSendResult({ portalUrl: data.portalUrl, emailSent: data.emailSent });
    setStatus("unterlagen_angefragt");
    setBew((p) => ({ ...p, status: "unterlagen_angefragt", angefragt_dokumente: selected }));
  }

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function uploadAdminDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { setUploadError("Datei zu groß (max. 20 MB)."); return; }
    setUploading(true); setUploadError("");
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}/dokument`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) { setUploadError(data.error ?? "Upload fehlgeschlagen."); return; }
    const newDoc: Dokument = { ...data, url: publicUrl(data.storage_path) };
    setBew((p) => ({ ...p, bewerbung_dokumente: [...p.bewerbung_dokumente, newDoc] }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function deleteDoc(docId: string) {
    if (!confirm("Dokument wirklich löschen?")) return;
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}/dokument/${docId}`, { method: "DELETE" });
    if (res.ok) setBew((p) => ({ ...p, bewerbung_dokumente: p.bewerbung_dokumente.filter((d) => d.id !== docId) }));
  }

  async function deleteBewerbung() {
    if (!confirm(`Bewerbung von ${bew.vorname} ${bew.nachname} und alle Dokumente wirklich löschen?`)) return;
    const res = await fetch(`/api/admin/bewerbungen/${bew.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/bewerbungen");
  }

  const bewerberDocs = bew.bewerbung_dokumente.filter((d) => d.uploaded_by === "bewerber");
  const portalDocs   = bew.bewerbung_dokumente.filter((d) => d.uploaded_by === "portal");
  const adminDocs    = bew.bewerbung_dokumente.filter((d) => d.uploaded_by === "admin");

  function DocList({ docs, label, color }: { docs: Dokument[]; label: string; color: string }) {
    return (
      <div className={`rounded-2xl border p-5 ${color}`}>
        <h3 className="text-sm font-bold text-navy-900 mb-3">
          {label} <span className="font-normal text-navy-400">({docs.length})</span>
        </h3>
        {docs.length === 0
          ? <p className="text-xs text-navy-400">Keine Dokumente.</p>
          : <ul className="space-y-2">
              {docs.map((doc) => {
                const url = publicUrl(doc.storage_path);
                return (
                  <li key={doc.id} className="flex items-center gap-2 text-sm group">
                    <DocIcon mime={doc.mime_type} />
                    <button
                      onClick={() => setPreview({ url, name: doc.original_name })}
                      className="flex-1 truncate text-left text-navy-700 hover:text-red-austria transition-colors"
                      title={`Vorschau: ${doc.original_name}`}
                    >
                      {doc.original_name}
                    </button>
                    <span className="text-xs text-navy-400 flex-shrink-0">{fmt(doc.groesse)}</span>
                    <button onClick={() => setPreview({ url, name: doc.original_name })}
                      className="text-navy-300 hover:text-navy-700 transition-colors flex-shrink-0" title="Vorschau">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="text-navy-300 hover:text-navy-700 transition-colors flex-shrink-0" title="Herunterladen">
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <button onClick={() => deleteDoc(doc.id)}
                      className="text-navy-300 hover:text-red-500 transition-colors flex-shrink-0" title="Löschen">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
        }
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {preview && <PreviewModal url={preview.url} name={preview.name} onClose={() => setPreview(null)} />}
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
          <Trash2 className="h-3.5 w-3.5" /> Bewerbung löschen
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Applicant info */}
          <div className="rounded-2xl border border-navy-200 bg-white p-6">
            <h2 className="text-base font-bold text-navy-900 mb-4">Bewerberdaten</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {([
                ["E-Mail", bew.email, `mailto:${bew.email}`],
                ["Telefon / WhatsApp", bew.telefon ?? "—", bew.telefon ? `tel:${bew.telefon}` : null],
                ["Herkunftsland", bew.herkunftsland, null],
                ["Ausbildung", deAusbildung(bew.ausbildung), null],
                ["Berufserfahrung", deErfahrung(bew.erfahrung), null],
                ["Deutschkenntnisse", deDeutsch(bew.deutschkenntnisse), null],
                ["Verfügbarkeit", deVerfueg(bew.verfuegbarkeit), null],
              ] as [string, string, string | null][]).map(([label, value, href]) => (
                <div key={label}>
                  <dt className="text-xs text-navy-400 mb-0.5">{label}</dt>
                  <dd className="font-medium text-navy-800">
                    {href ? <a href={href} className="text-red-austria hover:underline">{value}</a> : value}
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
                <dt className="text-xs text-navy-400 mb-2">Laut Bewerber vorhanden</dt>
                <div className="flex flex-wrap gap-1.5">
                  {bew.vorhandene_dokumente.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> {deDokument(d)}
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
                  className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400">
                  {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
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
                className="w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 resize-y"
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

          {/* ── Document request ── */}
          <div className="rounded-2xl border border-navy-200 bg-white p-6">
            <h2 className="text-base font-bold text-navy-900 mb-1">Unterlagen anfordern</h2>
            <p className="text-xs text-navy-500 mb-4">
              Wähle die benötigten Dokumente aus. Klick auf „E-Mail senden" löst eine Email mit einem persönlichen Upload-Link aus.
            </p>

            {/* Predefined chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {DOKUMENT_VORSCHLAEGE.map((doc) => {
                const on = selected.includes(doc);
                return (
                  <button key={doc} type="button" onClick={() => toggleChip(doc)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      on ? "border-red-austria bg-red-austria text-white" : "border-navy-200 bg-navy-50 text-navy-600 hover:border-navy-400"
                    }`}>
                    {on && <X className="h-3 w-3" />}
                    {doc}
                  </button>
                );
              })}
            </div>

            {/* Custom doc */}
            <div className="flex gap-2 mb-4">
              <input value={customDoc} onChange={(e) => setCustomDoc(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); }}}
                placeholder="Eigenes Dokument hinzufügen …"
                className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400" />
              <button onClick={addCustom}
                className="inline-flex items-center gap-1 rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-600 hover:bg-navy-50 transition-colors">
                <Plus className="h-4 w-4" /> Hinzufügen
              </button>
            </div>

            {/* Selected list */}
            {selected.length > 0 && (
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 mb-4">
                <p className="text-xs font-semibold text-orange-700 mb-2">Wird angefordert ({selected.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 rounded-full bg-white border border-orange-200 px-2.5 py-0.5 text-xs text-navy-700">
                      <Clock className="h-3 w-3 text-orange-400" />
                      {d}
                      <button onClick={() => removeSelected(d)} className="text-navy-300 hover:text-red-500 ml-0.5 transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sendError && (
              <div className="flex items-center gap-2 text-xs text-red-600 mb-3">
                <AlertCircle className="h-4 w-4" /> {sendError}
              </div>
            )}

            <button onClick={sendAnfrage} disabled={sending || !selected.length}
              className="inline-flex items-center gap-2 rounded-lg bg-red-austria px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {sending ? "E-Mail wird gesendet …" : "Anforderungs-E-Mail senden"}
            </button>

            {/* Success result */}
            {sendResult && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  {sendResult.emailSent ? `E-Mail an ${bew.email} gesendet.` : "Link generiert (E-Mail-Versand nicht konfiguriert)."}
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-navy-400 flex-shrink-0" />
                  <a href={sendResult.portalUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 truncate text-xs text-red-austria hover:underline">{sendResult.portalUrl}</a>
                  <button onClick={() => copyLink(sendResult.portalUrl)}
                    className="inline-flex items-center gap-1 rounded-md border border-navy-200 px-2 py-1 text-xs text-navy-600 hover:bg-navy-50 transition-colors flex-shrink-0">
                    <Copy className="h-3 w-3" />
                    {copied ? "Kopiert!" : "Kopieren"}
                  </button>
                </div>
                <p className="text-xs text-navy-500">Der Link ist 7 Tage gültig. Danach kann über dieses Panel ein neuer Link ausgestellt werden.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column – Documents */}
        <div className="space-y-4">
          <DocList docs={bewerberDocs} label="Vom Bewerber" color="border-navy-200 bg-white" />

          {portalDocs.length > 0 && (
            <DocList docs={portalDocs} label="Via Upload-Portal" color="border-blue-200 bg-blue-50" />
          )}

          <DocList docs={adminDocs} label="Admin-Dokumente" color="border-navy-200 bg-white" />

          {/* Admin upload */}
          <div className="rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50 p-4 text-center cursor-pointer hover:border-navy-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f && fileInputRef.current) {
                const dt = new DataTransfer(); dt.items.add(f);
                fileInputRef.current.files = dt.files;
                await uploadAdminDoc({ target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>);
              }
            }}>
            {uploading ? <Loader2 className="mx-auto h-6 w-6 animate-spin text-navy-400 mb-1" />
                       : <Plus className="mx-auto h-6 w-6 text-navy-300 mb-1" />}
            <p className="text-xs text-navy-500">{uploading ? "Wird hochgeladen …" : "Admin-Dokument hochladen"}</p>
            <p className="text-xs text-navy-400">PDF, JPG, PNG · max. 20 MB</p>
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
              className="hidden" onChange={uploadAdminDoc} />
          </div>
          {uploadError && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" /> {uploadError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
