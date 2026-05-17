import Link from "next/link";
import { readKandidatinnen } from "@/lib/data-store";
import { phaseLabels, phaseColors } from "@/lib/pflegekraefte-data";
import { Plus, Pencil, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const kandidatinnen = await readKandidatinnen();

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Kandidatinnen</h1>
          <p className="text-sm text-navy-500 mt-0.5">{kandidatinnen.length} Einträge gesamt</p>
        </div>
        <Link
          href="/admin/neu"
          className="inline-flex items-center gap-2 rounded-lg bg-red-austria px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neue Kandidatin
        </Link>
      </div>

      {/* Phase summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {([1, 2, 3, 4] as const).map((phase) => {
          const count = kandidatinnen.filter((k) => k.currentPhase === phase).length;
          const colors = phaseColors[phase];
          return (
            <div key={phase} className={`rounded-xl border ${colors.border} ${colors.bg} px-4 py-3`}>
              <div className={`text-xl font-bold ${colors.text}`}>{count}</div>
              <div className="text-xs text-navy-500 mt-0.5">Phase {phase}</div>
              <div className={`text-xs font-medium ${colors.text} mt-0.5`}>
                {phaseLabels[phase].split(" ")[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate table */}
      {kandidatinnen.length === 0 ? (
        <div className="rounded-2xl border border-navy-200 bg-white p-12 text-center">
          <p className="text-navy-400 text-sm mb-4">Noch keine Kandidatinnen erfasst.</p>
          <Link href="/admin/neu" className="inline-flex items-center gap-2 rounded-lg bg-red-austria px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
            <Plus className="h-4 w-4" />
            Erste Kandidatin anlegen
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-navy-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden sm:table-cell">Phase</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Deutsch</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden lg:table-cell">Verfügbar</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Foto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Video</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {kandidatinnen.map((k) => {
                const colors = phaseColors[k.currentPhase];
                return (
                  <tr key={k.slug} className="hover:bg-navy-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-navy-900">{k.name}</div>
                      <div className="text-xs text-navy-400 mt-0.5">{k.specialization} · {k.experienceYears}J</div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.badge}`}>
                        Phase {k.currentPhase}
                      </span>
                      <div className="text-xs text-navy-400 mt-0.5 max-w-[160px] truncate">{k.phaseStatus}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="font-medium text-navy-700">{k.languageLevel}</span>
                      <div className="mt-1 w-16 h-1.5 rounded-full bg-navy-100">
                        <div
                          className="h-1.5 rounded-full bg-red-austria"
                          style={{ width: `${k.languageProgress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4 text-navy-500 text-xs hidden lg:table-cell">{k.availableFrom}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {k.photoUrl ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">✓ Foto</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-500">— kein Foto</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {k.videoUrl ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">✓ Video</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-500">— kein Video</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/pflegekraefte/${k.slug}`}
                          target="_blank"
                          className="rounded-md p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-700 transition-colors"
                          title="Profil ansehen"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/${k.slug}`}
                          className="rounded-md p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-700 transition-colors"
                          title="Bearbeiten"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteButton slug={k.slug} name={k.name} />
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
