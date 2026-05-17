import type { Metadata } from "next";
import BewerberPageContent from "@/components/BewerberPageContent";
import en from "@/messages/bewerber/en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function BewerberPageEN() {
  return <BewerberPageContent t={en} />;
}
