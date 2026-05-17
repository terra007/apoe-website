"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";

interface HomeVideoSectionProps {
  videoUrl: string;
  posterUrl?: string;
}

export default function HomeVideoSection({ videoUrl, posterUrl }: HomeVideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="home-video-heading">
      <div className="container-wide">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-austria">
            APÖ erklärt
          </span>
          <h2
            id="home-video-heading"
            className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl"
          >
            So funktioniert unser Modell – in 90 Sekunden
          </h2>
          <p className="mt-3 text-navy-500 max-w-xl mx-auto text-sm sm:text-base">
            Von der Auswahl in Thailand bis zum Dienstantritt in Österreich –
            strukturiert, rechtssicher und ethisch.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-navy-900"
            style={{ aspectRatio: "16/9" }}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              controls={playing}
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              onEnded={() => setPlaying(false)}
            />

            {/* Overlay – shown until user clicks play */}
            {!playing && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 cursor-pointer group bg-navy-900/60 backdrop-blur-sm"
                onClick={handlePlay}
                role="button"
                aria-label="Video abspielen"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 border-2 border-white/40 transition-all duration-200 group-hover:bg-white/25 group-hover:scale-110">
                  <Play className="h-8 w-8 text-white fill-white ml-1" aria-hidden="true" />
                </div>
                <p className="text-white/70 text-sm font-medium tracking-wide">
                  Video abspielen
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
