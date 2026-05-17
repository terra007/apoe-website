import { notFound } from "next/navigation";
import { CheckCircle2, Clock, FileText } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import ApoLogo from "@/components/ApoLogo";
import PortalUpload from "./PortalUpload";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ token: string }> };

const TOKEN_TTL_DAYS = 7;

export default async function PortalPage({ params }: Params) {
  const { token } = await params;
  if (!token || !/^[0-9a-f-]{36}$/.test(token)) notFound();

  const service = createServiceClient();

  const { data: bew } = await service
    .from("bewerbungen")
    .select("id, vorname, nachname, angefragt_dokumente, upload_token_created_at, bewerbung_dokumente(id, original_name, uploaded_by, created_at)")
    .eq("upload_token", token)
    .single();

  if (!bew) notFound();

  // Check token expiry
  const created = new Date(bew.upload_token_created_at);
  const expired = Date.now() - created.getTime() > TOKEN_TTL_DAYS * 24 * 3600 * 1000;

  const portalDocs = (bew.bewerbung_dokumente ?? []).filter(
    (d: { uploaded_by: string }) => d.uploaded_by === "portal"
  );

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-navy-900 px-6 py-4 flex items-center gap-3">
        <ApoLogo className="h-8 w-8" />
        <div>
          <div className="text-white font-bold text-sm">APÖ</div>
          <div className="text-navy-300 text-xs">Agentur für Pflegevermittlung Österreich</div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-navy-900 mb-1">
            Hallo, {bew.vorname}!
          </h1>
          <p className="text-navy-500 text-sm">
            Das APÖ-Team hat folgende Unterlagen für Ihre Bewerbung angefordert.
            Bitte laden Sie die fehlenden Dokumente hier hoch.
          </p>
        </div>

        {/* Requested documents */}
        {bew.angefragt_dokumente?.length > 0 && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 mb-6">
            <h2 className="text-base font-bold text-navy-900 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Angeforderete Unterlagen
            </h2>
            <ul className="space-y-2">
              {(bew.angefragt_dokumente as string[]).map((doc) => {
                const uploaded = portalDocs.some(
                  (d: { original_name: string }) =>
                    d.original_name.toLowerCase().includes(doc.toLowerCase().split(" ")[0])
                );
                return (
                  <li key={doc} className="flex items-center gap-3 text-sm">
                    {uploaded
                      ? <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      : <FileText className="h-4 w-4 text-orange-400 flex-shrink-0" />}
                    <span className={uploaded ? "line-through text-navy-400" : "text-navy-700"}>{doc}</span>
                    {uploaded && <span className="text-xs text-green-600 font-medium">Hochgeladen</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Expired token */}
        {expired ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="text-base font-bold text-red-800 mb-2">Dieser Link ist abgelaufen</h2>
            <p className="text-sm text-red-700 mb-4">
              Upload-Links sind 7 Tage gültig. Bitte kontaktieren Sie uns für einen neuen Link.
            </p>
            <a href="mailto:office@apoesterreich.at"
              className="inline-block rounded-lg bg-red-austria px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
              office@apoesterreich.at
            </a>
          </div>
        ) : (
          <>
            {/* Upload */}
            <div className="rounded-2xl border border-navy-200 bg-white p-6 mb-6">
              <h2 className="text-base font-bold text-navy-900 mb-4">Dokumente hochladen</h2>
              <PortalUpload token={token} bewerbungId={bew.id} />
            </div>

            {/* Already uploaded via portal */}
            {portalDocs.length > 0 && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <h2 className="text-base font-bold text-navy-900 mb-3">Bereits hochgeladen</h2>
                <ul className="space-y-2">
                  {portalDocs.map((d: { id: string; original_name: string; created_at: string }) => (
                    <li key={d.id} className="flex items-center gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="flex-1 truncate">{d.original_name}</span>
                      <span className="text-xs text-navy-400">
                        {new Date(d.created_at).toLocaleDateString("de-AT")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <p className="text-center text-xs text-navy-400 mt-8">
          Fragen? <a href="mailto:office@apoesterreich.at" className="text-red-austria hover:underline">office@apoesterreich.at</a>
        </p>
      </main>
    </div>
  );
}
