import type { Metadata } from "next";
import BewerberPageContent from "@/components/BewerberPageContent";
import de from "@/messages/bewerber/de";

export const metadata: Metadata = {
  title: de.meta.title,
  description: de.meta.description,
};

export default function BewerberPageDE() {
  return <BewerberPageContent t={de} />;
}
