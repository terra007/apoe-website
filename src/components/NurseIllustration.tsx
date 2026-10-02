"use client";

import { motion } from "framer-motion";

const SKIN = "#d9a074";
const SKIN_SHADE = "#c48b60";
const SCRUBS = "#0ea5a4";
const SCRUBS_DARK = "#0b8584";
const HAIR = "#17171c";

/**
 * Eine Pflegekraft im Wai-Gruß — gezeichnet, nicht fotografiert. Sie steigt
 * von unten ins Bild, verneigt sich leicht und lächelt mit geschlossenen
 * Augen. Wer ein echtes Foto einsetzen will, ersetzt dieses Bauteil im
 * Preloader durch ein Bild; die übrige Bühne bleibt gleich.
 */
export default function NurseIllustration({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 240 320"
      overflow="visible"
      role="img"
      aria-label="Thailändische Pflegekraft begrüßt mit dem Wai"
      className="h-full w-full"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay }}
    >
      <defs>
        <radialGradient id="nurse-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="1" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="120"
        cy="170"
        r="130"
        fill="url(#nurse-glow)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Oberkörper */}
      <path d="M30 320 C30 252 74 222 120 222 C166 222 210 252 210 320 Z" fill={SCRUBS} />
      <path d="M95 224 L120 264 L145 224 Z" fill="#f8fafc" />
      <path d="M120 264 L120 320" stroke={SCRUBS_DARK} strokeWidth="2" />
      {/* Namensschild */}
      <rect x="150" y="238" width="26" height="16" rx="3" fill="#f8fafc" />
      <path d="M163 241 v10 M158 246 h10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

      {/* Hals */}
      <rect x="107" y="190" width="26" height="38" rx="12" fill={SKIN_SHADE} />

      {/* Kopf: neigt sich zum Gruß */}
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 0, 7, 7, 0] }}
        transition={{ delay: delay + 1.1, duration: 2.4, times: [0, 0.1, 0.4, 0.7, 1], ease: "easeInOut" }}
      >
        {/* Haarknoten */}
        <circle cx="120" cy="84" r="23" fill={HAIR} />
        {/* Gesicht */}
        <ellipse cx="120" cy="150" rx="46" ry="52" fill={SKIN} />
        {/* Haar */}
        <path
          d="M72 152 C66 92 98 80 120 80 C142 80 174 92 168 152 C162 124 146 110 120 110 C94 110 78 124 72 152 Z"
          fill={HAIR}
        />
        {/* Schwesternhaube */}
        <path d="M90 108 Q120 86 150 108 L146 118 Q120 102 94 118 Z" fill="#f8fafc" />
        <path d="M120 98 v10 M115 103 h10" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
        {/* Gesicht: Brauen, Augen, Lächeln, Wangen */}
        <path d="M97 140 q9 -5 18 0 M125 140 q9 -5 18 0" stroke={HAIR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M99 154 q8 7 16 0 M125 154 q8 7 16 0" stroke="#2b1b12" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M120 156 v10" stroke={SKIN_SHADE} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M106 176 Q120 190 134 176" stroke="#9b3d3d" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <circle cx="94" cy="170" r="8" fill="#f08a8a" opacity="0.3" />
        <circle cx="146" cy="170" r="8" fill="#f08a8a" opacity="0.3" />
      </motion.g>

      {/* Arme und Hände im Wai */}
      <motion.g
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.7, duration: 0.7, ease: "easeOut" }}
      >
        <path d="M54 312 C60 276 88 282 112 272" stroke={SCRUBS_DARK} strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M186 312 C180 276 152 282 128 272" stroke={SCRUBS_DARK} strokeWidth="28" fill="none" strokeLinecap="round" />
        <path d="M120 230 C106 238 102 262 106 284 Q120 296 134 284 C138 262 134 238 120 230 Z" fill={SKIN} />
        <path d="M120 236 V290" stroke={SKIN_SHADE} strokeWidth="2" />
      </motion.g>
    </motion.svg>
  );
}
