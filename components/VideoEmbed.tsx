"use client";

import { useState } from "react";
import { Play, Video } from "lucide-react";

interface VideoEmbedProps {
  videoUrl?: string;
  nurseName: string;
  avatarColor: string;
  initials: string;
}

function isLocalVideo(url: string): boolean {
  return url.startsWith("/") || url.endsWith(".mp4") || url.endsWith(".webm");
}

export default function VideoEmbed({
  videoUrl,
  nurseName,
  avatarColor,
  initials,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  // Local MP4 video (from /public/videos/)
  if (videoUrl && isLocalVideo(videoUrl)) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg" style={{ aspectRatio: "16/9" }}>
        <video
          src={videoUrl}
          controls
          autoPlay={playing}
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          title={`Vorstellungsvideo ${nurseName}`}
          onPlay={() => setPlaying(true)}
        >
          Ihr Browser unterstützt das Video-Format nicht.
        </video>
        {/* Name overlay when not playing */}
        {!playing && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer group"
            onClick={() => setPlaying(true)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${avatarColor} opacity-60`} />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border-2 border-white/40 text-xl font-bold text-white">
                {initials}
              </div>
              <p className="text-white font-semibold text-sm">{nurseName}</p>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border-2 border-white/60 transition-all duration-200 group-hover:bg-white/30 group-hover:scale-110">
                <Play className="h-6 w-6 text-white fill-white ml-0.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // YouTube / external iframe embed
  if (videoUrl && playing) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
          title={`Vorstellungsvideo ${nurseName}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  // Placeholder thumbnail (no video yet)
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
      style={{ aspectRatio: "16/9" }}
      onClick={() => videoUrl && setPlaying(true)}
      role={videoUrl ? "button" : undefined}
      aria-label={videoUrl ? `Vorstellungsvideo von ${nurseName} abspielen` : undefined}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${avatarColor}`} />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white border-2 border-white/30">
          {initials}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/70 mb-1">Vorstellungsvideo</p>
          <p className="text-lg font-bold text-white leading-tight">{nurseName}</p>
        </div>
        {videoUrl ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border-2 border-white/50 transition-all duration-200 group-hover:bg-white/30 group-hover:scale-110">
            <Play className="h-6 w-6 text-white fill-white ml-0.5" aria-hidden="true" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-2">
              <Video className="h-4 w-4 text-white/80" aria-hidden="true" />
              <span className="text-xs font-medium text-white/80">Video wird vorbereitet</span>
            </div>
            <p className="text-xs text-white/50 text-center max-w-[180px]">
              Personalisiertes Intro-Video via HeyGen AI
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-white/70">APÖ Kandidatinnen-Vorstellung</span>
        <span className="text-xs text-white/50">🇹🇭 → 🇦🇹</span>
      </div>
    </div>
  );
}
