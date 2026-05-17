import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import BewerberPageContent from "@/components/BewerberPageContent";
import th from "@/messages/bewerber/th";

export const metadata: Metadata = {
  title: th.meta.title,
  description: th.meta.description,
};

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function BewerberPageTH() {
  return (
    <div className={sarabun.className}>
      <BewerberPageContent t={th} />
    </div>
  );
}
