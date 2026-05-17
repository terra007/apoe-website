export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getKandidatin } from "@/lib/data-store";
import KandidatinForm from "../KandidatinForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPage({ params }: Props) {
  const { slug } = await params;
  const kandidatin = await getKandidatin(slug);
  if (!kandidatin) notFound();

  return <KandidatinForm existing={kandidatin} />;
}
