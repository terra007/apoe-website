import { Captions, Play, ShieldCheck } from "lucide-react";
import type { Profil } from "@/data/profiles";
import { resolveVideoUrl } from "@/lib/video";
import ProfileAvatar from "./ProfileAvatar";

const AUFBAU = [
  "Kurze Vorstellung auf Deutsch (ca. 30 Sek.)",
  "Berufserfahrung und Fachbereich in eigenen Worten",
  "Warum Österreich, warum diese Region",
  "Deutschkenntnisse live: ein Satz zur Pflegesituation",
];

/**
 * Spielt das Vorstellungsvideo ab, wenn es eine echte, freigegebene Aufnahme
 * gibt. Sonst ein gekennzeichneter Platzhalter, der zeigt, wie ein Video
 * aufgebaut wäre — kein erzeugtes Video einer erfundenen Person.
 */
export default function ProfileVideo({ p }: { p: Profil }) {
  const videoUrl = resolveVideoUrl(p.video?.src);
  if (p.video && videoUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          poster={p.video.poster}
          className="aspect-video w-full"
          aria-label={`Vorstellungsvideo von ${p.name}`}
        >
          <source src={videoUrl} type="video/mp4" />
          {p.video.untertitel && (
            <track kind="captions" src={p.video.untertitel} srcLang="de" label="Deutsch" default />
          )}
          Ihr Browser kann dieses Video nicht abspielen.
        </video>
        <p className="flex items-center gap-2 border-t border-white/10 px-4 py-2 text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Aufnahme mit schriftlicher Einwilligung von {p.name}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-white/20">
      <div className="relative aspect-video w-full bg-slate-800">
        <div className="absolute inset-0 scale-125 opacity-30 blur-md">
          <ProfileAvatar avatar={p.avatar} label={`${p.id}-video`} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/50 px-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30">
            <Play className="h-6 w-6 text-white/70" />
          </span>
          <p className="font-medium">Vorstellungsvideo (Beispiel)</p>
          <p className="max-w-xs text-xs text-slate-300">
            Zu diesem Beispielprofil gibt es kein Video. Bei echten Fachkräften sehen Sie hier eine kurze Aufnahme.
          </p>
        </div>
      </div>
      <div className="space-y-2 p-4 text-sm">
        <p className="flex items-center gap-2 text-slate-300">
          <Captions className="h-4 w-4 text-emerald-400" /> So ist ein Video aufgebaut (60–90 Sekunden, mit Untertiteln):
        </p>
        <ol className="list-decimal space-y-1 pl-9 text-slate-400">
          {AUFBAU.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
