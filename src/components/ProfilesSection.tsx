"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  Clock3,
  GraduationCap,
  Languages,
  MapPin,
  Info,
  Play,
  Send,
  Star,
  X,
} from "lucide-react";
import { BEISPIELPROFILE, phaseLabel, type Bundesland, type Deutsch, type PhaseId, type Profil, type Ziel } from "@/data/profiles";
import { cn } from "@/lib/utils";
import ProfileAvatar from "./ProfileAvatar";
import ProfileVideo from "./ProfileVideo";
import { resolveVideoUrl } from "@/lib/video";

const ZIEL_LABEL: Record<Ziel, string> = {
  DGKP: "DGKP · Diplomierte Gesundheits- und Krankenpflege",
  PFA: "PFA · Pflegefachassistenz",
  PA: "PA · Pflegeassistenz",
};
const PHASES: { id: PhaseId; label: string }[] = [
  { id: "selektion", label: "Selektion & Sprache" },
  { id: "legal", label: "Legal & Visa" },
  { id: "nostrifizierung", label: "Nostrifizierung" },
];
const DEUTSCH_RANG: Record<Deutsch, number> = { A2: 1, B1: 2, B2: 3 };
const ALLE = "Alle";

function chip(active: boolean) {
  return cn(
    "rounded-full border px-3.5 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
    active ? "border-emerald-400 bg-emerald-400/15 text-white" : "border-white/15 text-slate-300 hover:border-white/40"
  );
}

function PhaseBadge({ phase, ziel }: { phase: PhaseId; ziel: Ziel }) {
  const label = phaseLabel(ziel, phase);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
      <Clock3 className="h-3 w-3" /> {label}
    </span>
  );
}

function StatusIcon({ status }: { status: Profil["unterlagen"][number]["status"] }) {
  if (status === "liegt vor") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-label="liegt vor" />;
  if (status === "in Prüfung") return <Clock3 className="h-4 w-4 shrink-0 text-amber-400" aria-label="in Prüfung" />;
  return <CircleDashed className="h-4 w-4 shrink-0 text-slate-500" aria-label="offen" />;
}

function mailto(subject: string, body: string) {
  return `mailto:kontakt@apoe.at?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ProfileDetail({
  p,
  merk,
  onToggleMerk,
  onClose,
}: {
  p: Profil;
  merk: boolean;
  onToggleMerk: () => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const aktiv = PHASES.findIndex((ph) => ph.id === p.phase);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Profil ${p.name}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-900 p-6 sm:rounded-3xl"
      >
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
            <ProfileAvatar avatar={p.avatar} label={`${p.id}-detail`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold">{p.name}</h3>
            <p className="text-sm text-slate-400">
              {p.alter} Jahre · {p.herkunft}, Thailand
            </p>
            <div className="mt-2">
              <PhaseBadge phase={p.phase} ziel={p.ziel} />
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-full border border-white/15 p-2 text-slate-300 hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          <ProfileVideo p={p} />
        </div>

        <p className="mt-5 text-slate-300">{p.kurzprofil}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="flex items-center gap-2 text-slate-400">
                <GraduationCap className="h-4 w-4 text-emerald-400" /> Zielqualifikation in Österreich
              </dt>
              <dd className="mt-0.5 text-slate-100">{ZIEL_LABEL[p.ziel]}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slate-400">
                <Briefcase className="h-4 w-4 text-emerald-400" /> Ausbildung &amp; Erfahrung
              </dt>
              <dd className="mt-0.5 text-slate-100">
                {p.ausbildung} · {p.berufserfahrung} Jahre Berufserfahrung
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-400" /> Einsatzwunsch
              </dt>
              <dd className="mt-0.5 text-slate-100">
                {p.wunschBundesland} · {p.einrichtung}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slate-400">
                <CalendarClock className="h-4 w-4 text-emerald-400" /> Einsatzbereit
              </dt>
              <dd className="mt-0.5 text-slate-100">
                {p.einsatzbereitAb} · {p.startAls}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-slate-400">
                <Languages className="h-4 w-4 text-emerald-400" /> Sprachen
              </dt>
              <dd className="mt-0.5 text-slate-100">{p.sprachen.map((s) => `${s.name} (${s.niveau})`).join(" · ")}</dd>
            </div>
          </dl>

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-slate-400">Stand im Verfahren</p>
              <ol className="space-y-2">
                {PHASES.map((ph, i) => (
                  <li key={ph.id} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                        i < aktiv && "bg-emerald-500 text-slate-950",
                        i === aktiv && "bg-emerald-400/20 text-emerald-300 ring-2 ring-emerald-400",
                        i > aktiv && "bg-white/10 text-slate-500"
                      )}
                    >
                      {i < aktiv ? "✓" : i + 1}
                    </span>
                    <span className={cn(i > aktiv ? "text-slate-500" : "text-slate-100")}>{phaseLabel(p.ziel, ph.id)}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-400">Unterlagen</p>
              <ul className="space-y-1.5">
                {p.unterlagen.map((u) => (
                  <li key={u.name} className="flex items-center gap-2 text-sm text-slate-200">
                    <StatusIcon status={u.status} />
                    <span className="flex-1">{u.name}</span>
                    <span className="text-xs text-slate-500">{u.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.staerken.map((s) => (
            <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {s}
            </span>
          ))}
        </div>

        <p className="mt-6 flex gap-2 rounded-xl bg-amber-400/10 p-3 text-xs text-amber-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Beispielprofil: erfundene Person zur Veranschaulichung. Echte Profile werden nur mit schriftlicher
          Einwilligung der Fachkraft gezeigt.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailto(`Gespräch anfragen: Profil ${p.name}`, `Wir interessieren uns für das Profil ${p.name} (${p.ziel}, ${p.wunschBundesland}).`)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Send className="h-4 w-4" /> Vorstellungsgespräch anfragen
          </a>
          <button
            type="button"
            onClick={onToggleMerk}
            aria-pressed={merk}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
              merk ? "border-emerald-400 bg-emerald-400/10 text-white" : "border-white/20 text-white hover:border-white/50"
            )}
          >
            <Star className={cn("h-4 w-4", merk && "fill-emerald-400 text-emerald-400")} />
            {merk ? "Gemerkt" : "Merken"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilesSection() {
  const [ziel, setZiel] = useState<Ziel | typeof ALLE>(ALLE);
  const [land, setLand] = useState<Bundesland | typeof ALLE>(ALLE);
  const [bereich, setBereich] = useState<string>(ALLE);
  const [minDeutsch, setMinDeutsch] = useState<Deutsch>("A2");
  const [offen, setOffen] = useState<string | null>(null);
  const [gemerkt, setGemerkt] = useState<string[]>([]);

  const laender = useMemo(() => [...new Set(BEISPIELPROFILE.map((p) => p.wunschBundesland))].sort(), []);
  const bereiche = useMemo(() => [...new Set(BEISPIELPROFILE.flatMap((p) => p.fachbereiche))].sort(), []);

  const treffer = useMemo(
    () =>
      BEISPIELPROFILE.filter(
        (p) =>
          (ziel === ALLE || p.ziel === ziel) &&
          (land === ALLE || p.wunschBundesland === land) &&
          (bereich === ALLE || p.fachbereiche.includes(bereich)) &&
          DEUTSCH_RANG[p.deutsch.niveau] >= DEUTSCH_RANG[minDeutsch]
      ),
    [ziel, land, bereich, minDeutsch]
  );

  const aktuell = BEISPIELPROFILE.find((p) => p.id === offen) ?? null;
  const toggleMerk = (id: string) => setGemerkt((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  const schliessen = () => setOffen(null);

  return (
    <section id="profile" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Fachkräfte-Profile</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          So sehen Profile aus, bevor Sie sich entscheiden: Qualifikation, Deutschniveau, Stand im Verfahren und
          Einsatzwunsch. Filtern Sie nach dem, was Ihre Einrichtung braucht.
        </p>

        <p className="mt-5 flex max-w-3xl gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>Beispielprofile.</strong> Die Personen sind frei erfunden und zeigen, welche Angaben Sie später zu
            echten Fachkräften erhalten, mit deren schriftlicher Einwilligung. Keine Nachnamen, keine Fotos ohne
            Freigabe.
          </span>
        </p>

        <div className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-[1fr_auto_auto_auto]">
          <fieldset>
            <legend className="mb-2 text-xs uppercase tracking-widest text-slate-500">Qualifikation</legend>
            <div className="flex flex-wrap gap-2">
              {([ALLE, "DGKP", "PFA", "PA"] as const).map((z) => (
                <button key={z} type="button" aria-pressed={ziel === z} onClick={() => setZiel(z)} className={chip(ziel === z)}>
                  {z}
                </button>
              ))}
            </div>
          </fieldset>
          {[
            { label: "Bundesland", value: land, set: (v: string) => setLand(v as Bundesland | typeof ALLE), options: laender },
            { label: "Fachbereich", value: bereich, set: setBereich, options: bereiche },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-slate-500">{f.label}</span>
              <select
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 lg:w-44"
              >
                <option value={ALLE}>Alle</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-slate-500">Deutsch mind.</span>
            <select
              value={minDeutsch}
              onChange={(e) => setMinDeutsch(e.target.value as Deutsch)}
              className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 lg:w-32"
            >
              {(["A2", "B1", "B2"] as const).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm text-slate-500" aria-live="polite">
          {treffer.length} von {BEISPIELPROFILE.length} Profilen
        </p>

        {treffer.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-white/10 p-8 text-center text-slate-400">
            Kein Profil passt zu diesen Filtern. Lockern Sie einen Filter.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treffer.map((p) => {
              const merk = gemerkt.includes(p.id);
              return (
                <li key={p.id}>
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-emerald-400/50 hover:bg-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setOffen(p.id)}
                      className="flex h-full w-full flex-col p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <ProfileAvatar avatar={p.avatar} label={p.id} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-lg font-semibold">{p.name}</p>
                          <p className="text-sm text-slate-400">
                            {p.alter} · {p.herkunft}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">{p.ziel}</span>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                          Deutsch {p.deutsch.niveau}
                          {p.deutsch.zertifikat ? " ✓" : ""}
                        </span>
                        <PhaseBadge phase={p.phase} ziel={p.ziel} />
                        {resolveVideoUrl(p.video?.src) && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs text-emerald-300">
                            <Play className="h-3 w-3" /> Video
                          </span>
                        )}
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-slate-300">{p.kurzprofil}</p>
                      <dl className="mt-4 space-y-1 border-t border-white/10 pt-3 text-xs text-slate-400">
                        <div className="flex gap-2">
                          <dt className="sr-only">Einsatzwunsch</dt>
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <dd>
                            {p.wunschBundesland} · {p.einrichtung}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="sr-only">Einsatzbereit</dt>
                          <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                          <dd>{p.einsatzbereitAb}</dd>
                        </div>
                      </dl>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleMerk(p.id)}
                      aria-pressed={merk}
                      aria-label={merk ? `${p.name} aus Merkliste entfernen` : `${p.name} merken`}
                      className="absolute right-3 top-3 rounded-full p-2 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Star className={cn("h-5 w-5", merk && "fill-emerald-400 text-emerald-400")} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <AnimatePresence>
          {gemerkt.length > 0 && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 sm:flex-row sm:items-center"
            >
              <p className="text-sm text-slate-100">
                <strong>{gemerkt.length}</strong> Profil{gemerkt.length === 1 ? "" : "e"} gemerkt:{" "}
                {gemerkt.map((id) => BEISPIELPROFILE.find((p) => p.id === id)?.name).join(", ")}
              </p>
              <a
                href={mailto(
                  "Merkliste Fachkräfte-Profile",
                  `Wir interessieren uns für folgende Profile: ${gemerkt
                    .map((id) => BEISPIELPROFILE.find((p) => p.id === id)?.name)
                    .join(", ")}`
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <Send className="h-4 w-4" /> Merkliste anfragen
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {aktuell && (
          <ProfileDetail
            key={aktuell.id}
            p={aktuell}
            merk={gemerkt.includes(aktuell.id)}
            onToggleMerk={() => toggleMerk(aktuell.id)}
            onClose={schliessen}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
