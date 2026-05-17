import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Eye } from "lucide-react";
import BewerbungDeleteButton from "./BewerbungDeleteButton";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  neu:                   "bg-blue-100 text-blue-700",
  in_pruefung:           "bg-yellow-100 text-yellow-700",
  unterlagen_angefragt:  "bg-orange-100 text-orange-700",
  akzeptiert:            "bg-green-100 text-green-700",
  abgelehnt:             "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  neu:                   "Neu",
  in_pruefung:           "In Prüfung",
  unterlagen_angefragt:  "Unterlagen angefragt",
  akzeptiert:            "Akzeptiert",
  abgelehnt:             "Abgelehnt",
};

type Bewerbung = {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  herkunftsland: string;
  ausbildung: string;
  deutschkenntnisse: string;
  status: string;
  created_at: string;
  bewerbung_dokumente: [{ count: number }];
};

export default async function BewerbungenPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: bewerbungen } = await supabase
    .from("bewerbungen")
    .select("id, vorname, nachname, email, herkunftsland, ausbildung, deutschkenntnisse, status, created_at, bewerbung_dokumente(count)")
    .order("created_at", { ascending: false });

  const rows = (bewerbungen ?? []) as Bewerbung[];

  const counts = {
    gesamt: rows.length,
    neu: rows.filter((r) => r.status === "neu").length,
    in_pruefung: rows.filter((r) => r.status === "in_pruefung").length,
    akzeptiert: rows.filter((r) => r.status === "akzeptiert").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Bewerbungen</h1>
          <p className="text-sm text-navy-500 mt-0.5">{counts.gesamt} Bewerbungen gesamt</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Gesamt", value: counts.gesamt, cls: "border-navy-200 bg-navy-50 text-navy-700" },
          { label: "Neu", value: counts.neu, cls: "border-blue-200 bg-blue-50 text-blue-700" },
          { label: "In Prüfung", value: counts.in_pruefung, cls: "border-yellow-200 bg-yellow-50 text-yellow-700" },
          { label: "Akzeptiert", value: counts.akzeptiert, cls: "border-green-200 bg-green-50 text-green-700" },
        ].map(({ label, value, cls }) => (
          <div key={label} className={`rounded-xl border px-4 py-3 ${cls}`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs mt-0.5 opacity-70">{label}</div>
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-navy-200 bg-white p-12 text-center">
          <p className="text-navy-400 text-sm">Noch keine Bewerbungen eingegangen.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-navy-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden sm:table-cell">Land</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Ausbildung</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Deutsch</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden lg:table-cell">Dokumente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden lg:table-cell">Datum</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {rows.map((b) => {
                const docCount = b.bewerbung_dokumente?.[0]?.count ?? 0;
                return (
                  <tr key={b.id} className="hover:bg-navy-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-navy-900">{b.vorname} {b.nachname}</div>
                      <div className="text-xs text-navy-400 mt-0.5 truncate max-w-[160px]">{b.email}</div>
                    </td>
                    <td className="px-5 py-4 text-navy-600 text-xs hidden sm:table-cell">{b.herkunftsland}</td>
                    <td className="px-5 py-4 text-navy-600 text-xs hidden md:table-cell max-w-[140px]">
                      <span className="truncate block">{b.ausbildung}</span>
                    </td>
                    <td className="px-5 py-4 text-navy-600 text-xs hidden md:table-cell">{b.deutschkenntnisse}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[b.status] ?? "bg-navy-100 text-navy-600"}`}>
                        {STATUS_LABELS[b.status] ?? b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${docCount > 0 ? "bg-blue-100 text-blue-700" : "bg-navy-100 text-navy-500"}`}>
                        {docCount} {docCount === 1 ? "Dok." : "Dok."}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-navy-400 hidden lg:table-cell">
                      {new Date(b.created_at).toLocaleDateString("de-AT")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/bewerbungen/${b.id}`}
                          className="rounded-md p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-700 transition-colors"
                          title="Bewerbung öffnen">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <BewerbungDeleteButton id={b.id} name={`${b.vorname} ${b.nachname}`} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
