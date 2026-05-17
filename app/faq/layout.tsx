import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Häufig gestellte Fragen",
  description:
    "Antworten zu Kosten, Prozess, Rechtslage und Qualifikation der Pflegefachkräfte – transparent aufbereitet für öffentliche Träger in Österreich.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
