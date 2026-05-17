import Link from "next/link";

const LANGS = [
  { code: "de", href: "/bewerber", flag: "🇦🇹" },
  { code: "en", href: "/bewerber/en", flag: "🇬🇧" },
  { code: "th", href: "/bewerber/th", flag: "🇹🇭" },
] as const;

export default function BewerberLanguageSwitcher({
  current,
  labels,
}: {
  current: "de" | "en" | "th";
  labels: { de: string; en: string; th: string };
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 border border-white/20 p-1 backdrop-blur-sm">
      {LANGS.map(({ code, href, flag }) => (
        <Link
          key={code}
          href={href}
          aria-current={current === code ? "page" : undefined}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150 ${
            current === code
              ? "bg-white text-navy-900 shadow-sm"
              : "text-white/80 hover:bg-white/20 hover:text-white"
          }`}
        >
          <span>{flag}</span>
          <span>{labels[code]}</span>
        </Link>
      ))}
    </div>
  );
}
