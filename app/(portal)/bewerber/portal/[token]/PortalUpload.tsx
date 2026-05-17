"use client";

import { useState, useRef, useCallback } from "react";
import {
  AlertCircle, CheckCircle2, FileText, Image as ImageIcon,
  Loader2, Paperclip, UploadCloud, X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UploadFile {
  file: File;
  kategorie: string;
  progress: "pending" | "uploading" | "done" | "error";
  error?: string;
  preview?: string;
}

const ALLOWED = [
  "application/pdf",
  "image/jpeg", "image/png", "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_MB = 20;
const SONSTIGES = "Sonstiges / Anderes Dokument";

function fmtSize(b: number) {
  return b < 1_048_576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1_048_576).toFixed(1)} MB`;
}

export default function PortalUpload({
  token, bewerbungId, categories, onUploaded,
}: {
  token: string;
  bewerbungId: string;
  categories: string[];
  onUploaded: () => void;
}) {
  const [files, setFiles]       = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [step, setStep]         = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allOptions = [...categories, SONSTIGES];

  function buildPreview(file: File) {
    return file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: UploadFile[] = [];
    for (const f of Array.from(list)) {
      if (!ALLOWED.includes(f.type)) continue;
      if (f.size > MAX_MB * 1_048_576) continue;
      if (files.some((u) => u.file.name === f.name && u.file.size === f.size)) continue;
      // Auto-select category if only one requested doc remains unmatched
      const autoKat = categories.length === 1 ? categories[0] : "";
      next.push({ file: f, kategorie: autoKat, progress: "pending", preview: buildPreview(f) });
    }
    setFiles((p) => [...p, ...next]);
  }

  function setKategorie(idx: number, kat: string) {
    setFiles((p) => p.map((u, i) => i === idx ? { ...u, kategorie: kat } : u));
  }

  function remove(idx: number) {
    setFiles((p) => p.filter((_, i) => i !== idx));
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [files]);

  const pending = files.filter((f) => f.progress === "pending");
  const allCategorized = pending.every((f) => f.kategorie !== "");
  const canUpload = pending.length > 0 && allCategorized;

  async function uploadAll() {
    if (!canUpload || uploading) return;
    setUploading(true);
    const supabase = createClient();
    let anyDone = false;

    for (let i = 0; i < files.length; i++) {
      if (files[i].progress !== "pending") continue;
      const { file, kategorie } = files[i];
      const pendingIdx = pending.indexOf(files[i]);
      setStep(`Dokument ${pendingIdx + 1} / ${pending.length} …`);
      setFiles((p) => p.map((u, j) => j === i ? { ...u, progress: "uploading" } : u));

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `bewerbungen/${bewerbungId}/portal-${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from("apo-media")
        .upload(path, file, { contentType: file.type });

      if (upErr) {
        setFiles((p) => p.map((u, j) => j === i ? { ...u, progress: "error", error: upErr.message } : u));
        continue;
      }

      // Use category as document name (fallback to filename for "Sonstiges")
      const displayName = kategorie === SONSTIGES ? file.name : kategorie;

      const res = await fetch(`/api/bewerber/portal/${token}/dokument`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original_name: displayName,
          storage_path: path,
          mime_type: file.type,
          groesse: file.size,
        }),
      });

      if (res.ok) {
        setFiles((p) => p.map((u, j) => j === i ? { ...u, progress: "done" } : u));
        anyDone = true;
      } else {
        setFiles((p) => p.map((u, j) => j === i ? { ...u, progress: "error", error: "Speicherfehler." } : u));
      }
    }

    setUploading(false);
    setStep("");
    if (anyDone) onUploaded();
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        aria-label="Dateien auswählen"
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-150 ${
          dragging ? "border-red-400 bg-red-50 scale-[1.01]" : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-white"
        }`}
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${dragging ? "bg-red-100" : "bg-white shadow-sm"}`}>
          <UploadCloud className={`h-6 w-6 ${dragging ? "text-red-500" : "text-gray-400"}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {dragging ? "Loslassen zum Hinzufügen" : "Dateien ablegen oder hier klicken"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG, DOCX · max. {MAX_MB} MB</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); if (inputRef.current) inputRef.current.value = ""; }}
        />
      </div>

      {/* File + category list */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((u, i) => {
            const isImg = u.file.type.startsWith("image/");
            const isDone = u.progress === "done";
            const isError = u.progress === "error";
            const isUploading = u.progress === "uploading";
            const needsKat = u.progress === "pending" && u.kategorie === "";

            return (
              <div key={i} className={`rounded-2xl border p-4 transition-all ${
                isDone ? "border-emerald-200 bg-emerald-50"
                : isError ? "border-red-200 bg-red-50"
                : isUploading ? "border-blue-200 bg-blue-50"
                : needsKat ? "border-amber-200 bg-amber-50"
                : "border-gray-200 bg-white"
              }`}>
                {/* File row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {isImg && u.preview
                      ? <img src={u.preview} alt="" className="h-full w-full object-cover" />
                      : isImg
                      ? <ImageIcon className="h-5 w-5 text-blue-400" />
                      : <FileText className="h-5 w-5 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{u.file.name}</p>
                    <p className="text-xs text-gray-400">{fmtSize(u.file.size)}</p>
                  </div>
                  {isDone       && <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />}
                  {isUploading  && <Loader2 className="h-5 w-5 animate-spin text-blue-400 flex-shrink-0" />}
                  {u.progress === "pending" && (
                    <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Category selector */}
                {u.progress === "pending" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Was ist dieses Dokument? <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={u.kategorie}
                      onChange={(e) => setKategorie(i, e.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                        needsKat
                          ? "border-amber-300 bg-white focus:ring-amber-300 text-gray-400"
                          : "border-gray-200 bg-white focus:ring-red-300 text-gray-800"
                      }`}
                    >
                      <option value="">Bitte auswählen …</option>
                      {categories.length > 0 && (
                        <optgroup label="Angeforderte Dokumente">
                          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </optgroup>
                      )}
                      <optgroup label="Sonstiges">
                        <option value={SONSTIGES}>{SONSTIGES}</option>
                      </optgroup>
                    </select>
                    {needsKat && (
                      <p className="flex items-center gap-1 text-xs text-amber-600 mt-1.5">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Bitte Dokumenttyp auswählen, bevor Sie hochladen.
                      </p>
                    )}
                  </div>
                )}

                {/* Show selected category for uploading/done files */}
                {(isDone || isUploading) && u.kategorie && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isDone ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {u.kategorie === SONSTIGES ? u.file.name : u.kategorie}
                    </span>
                  </div>
                )}

                {isError && (
                  <p className="flex items-center gap-1 text-xs text-red-600 mt-2">
                    <AlertCircle className="h-3.5 w-3.5" /> {u.error}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Hint when categories missing */}
      {pending.length > 0 && !allCategorized && (
        <p className="text-xs text-amber-600 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          Bitte für alle Dateien einen Dokumenttyp auswählen.
        </p>
      )}

      {/* Upload button */}
      {pending.length > 0 && (
        <button
          onClick={uploadAll}
          disabled={!canUpload || uploading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading
            ? <><Loader2 className="h-4 w-4 animate-spin" />{step || "Hochladen …"}</>
            : <><Paperclip className="h-4 w-4" />{pending.length === 1 ? "Dokument hochladen" : `${pending.length} Dokumente hochladen`}</>}
        </button>
      )}
    </div>
  );
}
