import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "APÖ – Agentur für Pflegevermittlung Österreich",
    template: "%s | APÖ",
  },
  description:
    "Das behördlich begleitete Kompetenzzentrum für die strukturelle Rekrutierung und Integration thailändischer Pflegefachkräfte im öffentlichen Gesundheitswesen Österreichs.",
  keywords: [
    "Pflegevermittlung",
    "Österreich",
    "thailändische Pflegekräfte",
    "RWR-Karte",
    "Nostrifizierung",
    "DGKP",
    "öffentliche Träger",
    "Gemeindeverwaltung",
    "Pflegenotstand",
  ],
  authors: [{ name: "APÖ GmbH" }],
  creator: "APÖ GmbH",
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "Agentur für Pflegevermittlung Österreich",
    title: "APÖ – Agentur für Pflegevermittlung Österreich",
    description:
      "Behördlich begleitetes Kompetenzzentrum für die strukturelle Rekrutierung und Integration von Pflegefachkräften.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a3558",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
