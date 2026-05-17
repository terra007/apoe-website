import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "APÖ Dokument-Portal",
  description: "Sicheres Dokumenten-Upload-Portal der APÖ",
  robots: "noindex, nofollow",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.className}>
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
