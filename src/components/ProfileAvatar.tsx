import type { Profil } from "@/data/profiles";

const HAIR = "#17171c";
const TOP = "M36 58 C34 32 50 26 60 26 C70 26 86 32 84 58 C80 44 72 38 60 38 C48 38 40 44 36 58 Z";

/** Gezeichnetes Porträt, kein Foto — die Profile sind Beispiele. */
export default function ProfileAvatar({ avatar, label }: { avatar: Profil["avatar"]; label: string }) {
  const { skin, hair, scrubs, glasses } = avatar;
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className="h-full w-full">
      <defs>
        <linearGradient id={`bg-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f766e" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#bg-${label})`} />

      {hair === "long" && <path d="M34 56 C32 30 48 24 60 24 C72 24 88 30 86 56 L90 108 L30 108 Z" fill={HAIR} />}
      {hair === "bob" && <path d="M34 56 C32 30 48 24 60 24 C72 24 88 30 86 56 L88 80 Q60 90 32 80 Z" fill={HAIR} />}
      {hair === "bun" && <circle cx="60" cy="24" r="11" fill={HAIR} />}

      <path d="M12 120 C12 98 34 90 60 90 C86 90 108 98 108 120 Z" fill={scrubs} />
      <path d="M48 91 L60 106 L72 91 Z" fill="#f8fafc" />
      <rect x="52" y="78" width="16" height="16" rx="6" fill={skin} opacity="0.85" />

      <ellipse cx="60" cy="58" rx="24" ry="27" fill={skin} />
      <path d={TOP} fill={HAIR} />

      <path d="M44 53 q5 -3 10 0 M66 53 q5 -3 10 0" stroke={HAIR} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="61" r="2.3" fill="#2b1b12" />
      <circle cx="70" cy="61" r="2.3" fill="#2b1b12" />
      <path d="M52 73 Q60 79 68 73" stroke="#9b3d3d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="43" cy="68" r="4.5" fill="#f08a8a" opacity="0.25" />
      <circle cx="77" cy="68" r="4.5" fill="#f08a8a" opacity="0.25" />

      {glasses && (
        <g stroke="#e2e8f0" strokeWidth="1.6" fill="none">
          <circle cx="50" cy="61" r="7.5" />
          <circle cx="70" cy="61" r="7.5" />
          <path d="M57.5 61 h5" />
        </g>
      )}
    </svg>
  );
}
