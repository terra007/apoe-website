"use client";

import { useState, useRef } from "react";
import { CheckCircle2, FileText, Image as ImageIcon, Loader2, Paperclip, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UploadFile { file: File; progress: "pending" | "uploading" | "done" | "error"; error?: string }

const ALLOWED = ["application/pdf", "image/jpeg", "image/png", "image/webp",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

function fmt(b: number) { return b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`; }
function FileIcon({ mime }: { mime: string }) {
  return mime.startsWith("image/")
    ? <ImageIcon className="h-4 w-4 text-blue-500" />
    : <FileText className="h-4 w-4 text-red-400" />;
}

export default function PortalUpload({ token, bewerbungId }: { token: string; bewerbungId: string }) {
  const [files, setFiles]     = useState<UploadFile[]>([]);
  const [done, setDone]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [step, setStep]       = useState("");
  const ref = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: UploadFile[] = [];
    for (const f of Array.from(list)) {
      if (!ALLOWED.includes(f.type)) continue;
      if (f.size > 20 * 1024 * 1024) continue;
      if (files.some((u) => u.file.name === f.name && u.file.size === f.size)) continue;
      next.push({ file: f, progress: "pending" });
    }
    setFiles((p) => [...p, ...next]);
  }

  async function upload() {
    if (!files.length || uploading) return;
    setUploading(true);
    const supabase = createClient();
    let anyDone = false;

    for (let i = 0; i < files.length; i++) {
      if (files[i].progress !== "pending") continue;
      const { file } = files[i];
      setStep(`Dokument ${i + 1} / ${files.length} wird hochgeladen …`);
      setFiles((p) => p.map((u, idx) => idx === i ? { ...u, progress: "uploading" } : u));

      const path = `bewerbungen/${bewerbungId}/portal-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("apo-media").upload(path, file, { contentType: file.type });
      if (upErr) {
        setFiles((p) => p.map((u, idx) => idx === i ? { ...u, progress: "error", error: upErr.message } : u));
        continue;
      }

      const res = await fetch(`/api/bewerber/portal/${token}/dokument`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_name: file.name, storage_path: path, mime_type: file.type, groesse: file.size }),
      });
      if (res.ok) {
        setFiles((p) => p.map((u, idx) => idx === i ? { ...u, progress: "done" } : u));
        anyDone = true;
      } else {
        setFiles((p) => p.map((u, idx) => idx === i ? { ...u, progress: "error", error: "Fehler beim Speichern." } : u));
      }
    }

    setUploading(false);
    setStep("");
    if (anyDone) setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Dokumente erfolgreich hochgeladen!</h3>
        <p className="text-green-700 text-sm">Das APÖ-Team wurde benachrichtigt und wird Ihre Unterlagen prüfen.</p>
        <p className="text-green-600 text-sm mt-2">Bei Fragen: <a href="mailto:office@apoesterreich.at" className="underline font-medium">office@apoesterreich.at</a></p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        className="rounded-xl border-2 border-dashed border-navy-200 bg-navy-50 p-8 text-center cursor-pointer hover:border-navy-400 transition-colors"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        role="button"
        aria-label="Dateien auswählen"
      >
        <Paperclip className="mx-auto h-8 w-8 text-navy-300 mb-2" />
        <p className="text-sm font-medium text-navy-700 mb-1">Dateien hierher ziehen oder klicken</p>
        <p className="text-xs text-navy-400">PDF, JPG, PNG, DOC · max. 20 MB pro Datei</p>
        <input ref={ref} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((u, i) => (
            <li key={i} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
              u.progress === "error" ? "border-red-200 bg-red-50" :
              u.progress === "done"  ? "border-green-200 bg-green-50" : "border-navy-200 bg-white"
            }`}>
              <FileIcon mime={u.file.type} />
              <span className="flex-1 truncate text-navy-700">{u.file.name}</span>
              <span className="text-xs text-navy-400 flex-shrink-0">{fmt(u.file.size)}</span>
              {u.progress === "done"      && <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />}
              {u.progress === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-navy-400 flex-shrink-0" />}
              {u.progress === "pending"   && (
                <button type="button" onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                  className="text-navy-300 hover:text-red-500 flex-shrink-0 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={upload}
        disabled={!files.some((f) => f.progress === "pending") || uploading}
        className="w-full rounded-xl bg-red-austria py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {uploading ? <><Loader2 className="h-4 w-4 animate-spin" />{step}</> : "Dokumente hochladen"}
      </button>
    </div>
  );
}
