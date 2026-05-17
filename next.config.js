/** @type {import('next').NextConfig} */

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const securityHeaders = [
  // Verhindert Einbettung in fremde Iframes (Clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Verhindert MIME-Type-Sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Kontrolliert Referrer-Informationen
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deaktiviert nicht benötigte Browser-Features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js benötigt unsafe-inline für Hydration-Skripte
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Tailwind und Next.js nutzen Inline-Styles
      "style-src 'self' 'unsafe-inline'",
      // Bilder: eigene Domain + Supabase Storage + Data-URIs
      `img-src 'self' data: blob: https://${supabaseHost}`,
      // Videos von Supabase Storage
      `media-src 'self' https://${supabaseHost}`,
      // API-Aufrufe: eigene Domain + Supabase
      `connect-src 'self' https://${supabaseHost} https://*.supabase.co`,
      // Keine externen Fonts
      "font-src 'self'",
      // Kein Embedding durch Dritte
      "frame-ancestors 'none'",
      // Kein Zugriff auf Object-Elemente
      "object-src 'none'",
      // Basis-URI auf eigene Domain beschränken
      "base-uri 'self'",
      // Formulare nur an eigene Domain senden
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
