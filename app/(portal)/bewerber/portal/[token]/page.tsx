"use client";

// This page is under the (portal) route group — renders without the site Header/Footer.
// It uses client-side fetching so we can handle token errors gracefully.

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2, Clock, Download, FileText,
  Image as ImageIcon, Loader2, ShieldAlert,
} from "lucide-react";
import PortalUpload from "./PortalUpload";

const TOKEN_TTL_MS = 7 * 24 * 3600 * 1000;

type Doc = { id: string; original_name: string; uploaded_by: string; created_at: string };
type Data = {
  id: string;
  vorname: string;
  angefragt_dokumente: string[];
  upload_token_created_at: string;
  bewerbung_dokumente: Doc[];
};

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("de-AT", { day: "2-digit", month: "short", year: "numeric" });
}

function DocCard({ doc }: { doc: Doc }) {
  const isImg = doc.original_name.match(/\.(jpg|jpeg|png|webp)$/i);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-50 flex items-center justify-center">
        {isImg
          ? <ImageIcon className="h-5 w-5 text-blue-400" />
          : <FileText className="h-5 w-5 text-red-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{doc.original_name}</p>
        <p className="text-xs text-gray-400">{fmtDate(doc.created_at)}</p>
      </div>
    </div>
  );
}

export default function PortalPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData]     = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [expired, setExpired] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/bewerber/portal/${token}/data`);
    if (res.status === 404) { setInvalid(true); setLoading(false); return; }
    if (res.status === 410) { setExpired(true); setLoading(false); return; }
    if (!res.ok) { setInvalid(true); setLoading(false); return; }
    const json = await res.json() as Data;
    setData(json);
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const portalDocs  = data?.bewerbung_dokumente ?? [];
  const requested   = data?.angefragt_dokumente ?? [];
  const uploaded    = requested.filter((req) =>
    portalDocs.some((d) => d.original_name.toLowerCase().includes(req.toLowerCase().split(" ")[0]))
  );
  const pct = requested.length ? Math.round((uploaded.length / requested.length) * 100) : 0;

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
      </div>
    );
  }

  // ── Error states ──
  if (invalid || expired) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-none">APÖ</p>
              <p className="text-gray-400 text-xs">Agentur für Pflegevermittlung Österreich</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mx-auto mb-4">
              <ShieldAlert className="h-7 w-7 text-red-500" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 mb-2">
              {expired ? "Link abgelaufen" : "Link ungültig"}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {expired
                ? "Dieser Upload-Link war 7 Tage gültig und ist abgelaufen. Bitte kontaktieren Sie uns für einen neuen Link."
                : "Dieser Link ist ungültig. Bitte verwenden Sie den Link aus der E-Mail von APÖ."}
            </p>
            <a
              href="mailto:office@apoesterreich.at"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              office@apoesterreich.at
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const allDone = requested.length > 0 && uploaded.length === requested.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-none">APÖ</p>
            <p className="text-gray-400 text-xs">Dokument-Portal</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Hallo, {data.vorname}!</h1>
          <p className="text-gray-500 text-sm mt-1">
            Bitte laden Sie die angeforderten Unterlagen hier hoch.
          </p>
        </div>

        {/* Progress card */}
        {requested.length > 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700">Fortschritt</h2>
              <span className={`text-sm font-bold ${allDone ? "text-emerald-600" : "text-gray-500"}`}>
                {uploaded.length} / {requested.length}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-5">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <ul className="space-y-2">
              {requested.map((doc) => {
                const done = portalDocs.some((d) =>
                  d.original_name.toLowerCase().includes(doc.toLowerCase().split(" ")[0])
                );
                return (
                  <li key={doc} className="flex items-center gap-3 text-sm">
                    {done
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      : <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />}
                    <span className={done ? "text-gray-400 line-through" : "text-gray-700"}>{doc}</span>
                    {done && <span className="text-xs font-medium text-emerald-600">Hochgeladen</span>}
                  </li>
                );
              })}
            </ul>
            {allDone && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-emerald-800">
                  Alle angeforderten Dokumente wurden hochgeladen. Vielen Dank!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Uploaded documents */}
        {portalDocs.length > 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">
              Ihre hochgeladenen Dokumente
              <span className="ml-2 font-normal text-gray-400">({portalDocs.length})</span>
            </h2>
            <div className="space-y-2">
              {portalDocs.map((doc) => <DocCard key={doc.id} doc={doc} />)}
            </div>
          </div>
        )}

        {/* Upload */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">
            {portalDocs.length > 0 ? "Weitere Dokumente hochladen" : "Dokumente hochladen"}
          </h2>
          <PortalUpload token={token} bewerbungId={data.id} onUploaded={load} />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Fragen?{" "}
          <a href="mailto:office@apoesterreich.at" className="text-red-600 hover:underline">
            office@apoesterreich.at
          </a>{" "}
          · Link gültig 7 Tage
        </p>
      </main>
    </div>
  );
}
