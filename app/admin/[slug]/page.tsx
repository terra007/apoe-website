export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getKandidatin } from "@/lib/data-store";
import KandidatinForm from "../KandidatinForm";

interface Props {
  params: { slug: string };
}

export default async function EditPage({ params }: Props) {
  const kandidatin = await getKandidatin(params.slug);
  if (!kandidatin) notFound();

  return <KandidatinForm existing={kandidatin} />;
}
