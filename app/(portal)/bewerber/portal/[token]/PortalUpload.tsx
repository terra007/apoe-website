"use client";

import { useState, useRef, useCallback } from "react";
import {
  CheckCircle2, FileText, Image as ImageIcon, Loader2,
  Paperclip, Trash2, UploadCloud, X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UploadedFile {
  file: File;
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

function fmtSize(b: number) {
  return b < 1_048_576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1_048_576).toFixed(1)} MB`;
}

function FileCard({ u, onRemove }: { u: UploadedFile; onRemove?: () => void }) {
  const isImg = u.file.type.startsWith("image/");
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
      u.progress === "done"      ? "border-emerald-200 bg-emerald-50"
      : u.progress === "error"  ? "border-red-200 bg-red-50"
      : u.progress === "uploading" ? "border-blue-200 bg-blue-50"
      : "border-gray-200 bg-white"
    }`}>
      {/* Thumbnail / icon */}
      <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {isImg && u.preview
          ? <img src={u.preview} alt="" className="h-full w-full object-cover" />
          : isImg
          ? <ImageIcon className="h-5 w-5 text-blue-400" />
          : <FileText className="h-5 w-5 text-red-400" />}
      </div>
      {/* Name + size */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{u.file.name}</p>
        <p className="text-xs text-gray-400">{fmtSize(u.file.size)}</p>
        {u.progress === "error" && <p className="text-xs text-red-500 mt-0.5">{u.error}</p>}
      </div>
      {/* Status */}
      {u.progress === "done"      && <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />}
      {u.progress === "uploading" && <Loader2 className="h-5 w-5 animate-spin text-blue-400 flex-shrink-0" />}
      {u.progress === "pending"   && onRemove && (
        <button onClick={onRemove} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function PortalUpload({
  token, bewerbungId, onUploaded,
}: {
  token: string;
  bewerbungId: string;
  onUploaded: () => void;
}) {
  const [files, setFiles]       = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [step, setStep]         = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function buildPreview(file: File): string | undefined {
    if (file.type.startsWith("image/")) return URL.createObjectURL(file);
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: UploadedFile[] = [];
    for (const f of Array.from(list)) {
      if (!ALLOWED.includes(f.type)) continue;
      if (f.size > MAX_MB * 1_048_576) continue;
      if (files.some((u) => u.file.name === f.name && u.file.size === f.size)) continue;
      next.push({ file: f, progress: "pending", preview: buildPreview(f) });
    }
    setFiles((p) => [...p, ...next]);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, [files]);

  async function uploadAll() {
    const pending = files.filter((f) => f.progress === "pending");
    if (!pending.length || uploading) return;
    setUploading(true);
    const supabase = createClient();

    for (let i = 0; i < files.length; i++) {
      if (files[i].progress !== "pending") continue;
      const { file } = files[i];
      const idx = files.findIndex((_, j) => j === i);
      setStep(`Dokument ${pending.indexOf(files[i]) + 1} / ${pending.length} …`);
      setFiles((p) => p.map((u, j) => j === idx ? { ...u, progress: "uploading" } : u));

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `bewerbungen/${bewerbungId}/portal-${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from("apo-media")
        .upload(path, file, { contentType: file.type });

      if (upErr) {
        setFiles((p) => p.map((u, j) => j === idx ? { ...u, progress: "error", error: upErr.message } : u));
        continue;
      }

      const res = await fetch(`/api/bewerber/portal/${token}/dokument`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_name: file.name, storage_path: path, mime_type: file.type, groesse: file.size }),
      });
      if (res.ok) {
        setFiles((p) => p.map((u, j) => j === idx ? { ...u, progress: "done" } : u));
      } else {
        setFiles((p) => p.map((u, j) => j === idx ? { ...u, progress: "error", error: "Speicherfehler." } : u));
      }
    }

    setUploading(false);
    setStep("");
    onUploaded();
  }

  const hasPending = files.some((f) => f.progress === "pending");

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
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-red-400 bg-red-50 scale-[1.01]"
            : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${dragging ? "bg-red-100" : "bg-gray-100"}`}>
          <UploadCloud className={`h-7 w-7 ${dragging ? "text-red-500" : "text-gray-400"}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {dragging ? "Loslassen zum Hochladen" : "Dateien hier ablegen oder klicken"}
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOCX · max. {MAX_MB} MB</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((u, i) => (
            <FileCard
              key={i}
              u={u}
              onRemove={u.progress === "pending" ? () => setFiles((p) => p.filter((_, j) => j !== i)) : undefined}
            />
          ))}
        </div>
      )}

      {/* Upload button */}
      {hasPending && (
        <button
          onClick={uploadAll}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <><Loader2 className="h-4 w-4 animate-spin" />{step || "Hochladen …"}</>
          ) : (
            <><Paperclip className="h-4 w-4" />Dokumente hochladen</>
          )}
        </button>
      )}
    </div>
  );
}
