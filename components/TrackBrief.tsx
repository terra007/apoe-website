import { CheckCircle2, Clock, Circle, FileCheck, AlertCircle } from "lucide-react";
import { type Pflegekraft, type Phase, phaseLabels, phaseColors } from "@/lib/pflegekraefte-data";
import { cn } from "@/lib/utils";

interface TrackBriefProps {
  pflegekraft: Pflegekraft;
}

const phaseDescriptions: Record<Phase, string> = {
  1: "Rekrutierung & ÖSD-Sprachkurs B1 in Bangkok",
  2: "RWR-Karten-Antrag beim AMS + Botschafts-Legalisation",
  3: "Einreise nach Österreich & Dienstantritt als PA",
  4: "Berufsbegleitende Nostrifizierung zum DGKP",
};

const phaseDurations: Record<Phase, string> = {
  1: "6 Monate",
  2: "2–3 Monate",
  3: "1 Monat",
  4: "6–12 Monate",
};

type DocumentStatus = "ausstehend" | "eingereicht" | "anerkannt";

const docStatusConfig: Record<DocumentStatus, { icon: React.ElementType; color: string; label: string }> = {
  anerkannt: { icon: CheckCircle2, color: "text-green-600", label: "Anerkannt" },
  eingereicht: { icon: Clock, color: "text-amber-500", label: "Eingereicht" },
  ausstehend: { icon: AlertCircle, color: "text-navy-300", label: "Ausstehend" },
};

export default function TrackBrief({ pflegekraft }: TrackBriefProps) {
  const phases: Phase[] = [1, 2, 3, 4];

  return (
    <div className="space-y-6">
      {/* Process Timeline */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 sm:p-6 shadow-card">
        <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-5">
          APÖ Prozess-Status
        </h3>

        <div className="space-y-3">
          {phases.map((phase, idx) => {
            const isDone = phase < pflegekraft.currentPhase;
            const isActive = phase === pflegekraft.currentPhase;
            const isPending = phase > pflegekraft.currentPhase;
            const colors = phaseColors[phase];

            return (
              <div key={phase} className="flex gap-3">
                {/* Step indicator + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                      isDone
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? `${colors.bg} ${colors.border} ${colors.text} border-2`
                        : "bg-navy-50 border-navy-200 text-navy-300"
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    ) : isActive ? (
                      <span>{phase}</span>
                    ) : (
                      <Circle className="h-3 w-3" aria-hidden="true" />
                    )}
                  </div>
                  {idx < phases.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 mt-1 min-h-[16px]",
                        isDone ? "bg-green-300" : "bg-navy-100"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={cn("pb-3 flex-1 min-w-0", idx < phases.length - 1 && "")}>
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isDone
                          ? "text-green-700"
                          : isActive
                          ? "text-navy-900"
                          : "text-navy-300"
                      )}
                    >
                      {phaseLabels[phase]}
                    </span>
                    {isActive && (
                      <span className={cn("badge text-xs", colors.badge)}>
                        Aktiv
                      </span>
                    )}
                    {isDone && (
                      <span className="badge bg-green-100 text-green-700 text-xs">
                        Abgeschlossen
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs leading-relaxed",
                      isPending ? "text-navy-300" : "text-navy-500"
                    )}
                  >
                    {phaseDescriptions[phase]}
                  </p>
                  {isActive && (
                    <p className="text-xs font-medium text-navy-700 mt-1">
                      → {pflegekraft.phaseStatus}
                    </p>
                  )}
                  <div
                    className={cn(
                      "flex items-center gap-1 mt-1 text-xs",
                      isPending ? "text-navy-200" : "text-navy-400"
                    )}
                  >
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {phaseDurations[phase]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language Progress */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
        <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">
          Sprachkompetenz Deutsch
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-navy-700">
            Niveau: {pflegekraft.languageLevel}
          </span>
          <span className="text-sm font-bold text-navy-900">
            {pflegekraft.languageProgress}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-navy-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-navy-500 to-navy-700 transition-all duration-700"
            style={{ width: `${pflegekraft.languageProgress}%` }}
            role="progressbar"
            aria-valuenow={pflegekraft.languageProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Deutschkenntnisse ${pflegekraft.languageProgress}%`}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-navy-400">
          <span>A1</span>
          <span>A2</span>
          <span>B1</span>
          <span>B2</span>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
        <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">
          Dokument-Checkliste
        </h3>
        <ul className="space-y-2.5">
          {pflegekraft.documents.map((doc) => {
            const config = docStatusConfig[doc.status];
            const Icon = config.icon;
            return (
              <li key={doc.name} className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4 flex-shrink-0", config.color)} aria-hidden="true" />
                <span className="text-sm text-navy-700 flex-1">{doc.name}</span>
                <span
                  className={cn(
                    "text-xs font-medium flex-shrink-0",
                    config.color
                  )}
                >
                  {config.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-navy-50 flex gap-4 text-xs">
          {(["anerkannt", "eingereicht", "ausstehend"] as DocumentStatus[]).map((status) => {
            const count = pflegekraft.documents.filter((d) => d.status === status).length;
            const conf = docStatusConfig[status];
            return (
              <div key={status} className="flex items-center gap-1">
                <conf.icon className={cn("h-3 w-3", conf.color)} />
                <span className="text-navy-500">
                  {count}× {conf.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available From */}
      <div className="rounded-2xl border-2 border-red-austria/20 bg-red-50 p-4 flex items-center gap-3">
        <FileCheck className="h-5 w-5 text-red-austria flex-shrink-0" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold text-red-austria uppercase tracking-wide">
            Verfügbar ab
          </p>
          <p className="text-base font-bold text-navy-900">{pflegekraft.availableFrom}</p>
        </div>
      </div>
    </div>
  );
}
