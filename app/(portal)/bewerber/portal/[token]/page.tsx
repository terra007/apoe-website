"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2, Clock, FileText, Image as ImageIcon,
  Loader2, PartyPopper, Send, ShieldAlert,
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
  const isImg = /\.(jpg|jpeg|png|webp)$/i.test(doc.original_name);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm">
      <div className="h-8 w-8 flex-shrink-0 rounded-lg bg-gray-50 flex items-center justify-center">
        {isImg
          ? <ImageIcon className="h-4 w-4 text-blue-400" />
          : <FileText className="h-4 w-4 text-red-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{doc.original_name}</p>
        <p className="text-xs text-gray-400">{fmtDate(doc.created_at)}</p>
      </div>
      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
    </div>
  );
}

export default function PortalPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData]         = useState<Data | null>(null);
  const [loading, setLoading]   = useState(true);
  const [invalid, setInvalid]   = useState(false);
  const [expired, setExpired]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/bewerber/portal/${token}/data`);
    if (res.status === 404) { setInvalid(true); setLoading(false); return; }
    if (res.status === 410) { setExpired(true); setLoading(false); return; }
    if (!res.ok)            { setInvalid(true); setLoading(false); return; }
    setData(await res.json());
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const portalDocs = data?.bewerbung_dokumente ?? [];
  const requested  = data?.angefragt_dokumente ?? [];
  const uploaded   = requested.filter((req) =>
    portalDocs.some((d) => d.original_name === req || d.original_name.toLowerCase().includes(req.toLowerCase().split(" ")[0]))
  );
  const pct = requested.length ? Math.round((uploaded.length / requested.length) * 100) : 0;

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
    </div>
  );

  // ── Error states ──
  if (invalid || expired) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Logo />
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 mx-auto mb-4">
            <ShieldAlert className="h-7 w-7 text-red-500" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            {expired ? "Link abgelaufen" : "Link ungültig"}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {expired
              ? "Upload-Links sind 7 Tage gültig. Bitte kontaktieren Sie uns für einen neuen Link."
              : "Dieser Link ist ungültig. Bitte verwenden Sie den Link aus Ihrer E-Mail."}
          </p>
          <a href="mailto:office@apoesterreich.at"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
            office@apoesterreich.at
          </a>
        </div>
      </div>
    </div>
  );

  if (!data) return null;

  // ── Success / submitted ──
  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <Logo />
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 mx-auto mb-5">
            <PartyPopper className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 mb-2">Vielen Dank, {data.vorname}!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Ihre Unterlagen wurden erfolgreich eingereicht. Das APÖ-Team wird sie zeitnah prüfen
            und sich bei Ihnen melden.
          </p>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-left space-y-2">
            {portalDocs.map((d) => (
              <div key={d.id} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="truncate">{d.original_name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Fragen?{" "}
            <a href="mailto:office@apoesterreich.at" className="text-red-600 hover:underline">
              office@apoesterreich.at
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // ── Main portal ──
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto"><Logo inline /></div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Hallo, {data.vorname}!</h1>
          <p className="text-gray-500 text-sm mt-1">
            Bitte laden Sie die angeforderten Unterlagen hoch und reichen Sie diese dann ein.
          </p>
        </div>

        {/* Progress */}
        {requested.length > 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fortschritt</span>
              <span className={`text-sm font-bold ${pct === 100 ? "text-emerald-600" : "text-gray-500"}`}>
                {uploaded.length} / {requested.length}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-4">
              <div className="h-2 rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <ul className="space-y-2">
              {requested.map((doc) => {
                const done = portalDocs.some((d) =>
                  d.original_name === doc ||
                  d.original_name.toLowerCase().includes(doc.toLowerCase().split(" ")[0])
                );
                return (
                  <li key={doc} className="flex items-center gap-2.5 text-sm">
                    {done
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      : <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />}
                    <span className={done ? "text-gray-400 line-through" : "text-gray-700"}>{doc}</span>
                    {done && <span className="text-xs font-medium text-emerald-600 ml-auto">Hochgeladen</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Already uploaded */}
        {portalDocs.length > 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Hochgeladene Dokumente ({portalDocs.length})
            </h2>
            <div className="space-y-2">
              {portalDocs.map((doc) => <DocCard key={doc.id} doc={doc} />)}
            </div>
          </div>
        )}

        {/* Upload */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            {portalDocs.length > 0 ? "Weitere Dokumente hinzufügen" : "Dokumente hochladen"}
          </h2>
          <PortalUpload
            token={token}
            bewerbungId={data.id}
            categories={requested}
            onUploaded={load}
          />
        </div>

        {/* Submit button — appears once at least one doc is uploaded */}
        {portalDocs.length > 0 && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Bereit zum Einreichen?</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Sie haben {portalDocs.length} Dokument{portalDocs.length !== 1 ? "e" : ""} hochgeladen.
                  Klicken Sie auf „Einreichen", um das APÖ-Team zu benachrichtigen.
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                setConfirming(true);
                // Small delay so the button feels intentional
                await new Promise((r) => setTimeout(r, 600));
                setSubmitted(true);
              }}
              disabled={confirming}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {confirming
                ? <><Loader2 className="h-4 w-4 animate-spin" />Wird eingereicht …</>
                : <><Send className="h-4 w-4" />Unterlagen einreichen</>}
            </button>
          </div>
        )}

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

function Logo({ inline = false }: { inline?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${inline ? "" : "mb-6"}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
        <span className="text-white font-bold text-sm">A</span>
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm leading-none">APÖ</p>
        <p className="text-gray-400 text-xs">{inline ? "Dokument-Portal" : "Agentur für Pflegevermittlung Österreich"}</p>
      </div>
    </div>
  );
}
