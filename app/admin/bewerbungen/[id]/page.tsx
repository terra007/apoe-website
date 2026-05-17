import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BewerbungDetail from "./BewerbungDetail";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function BewerbungPage({ params }: Params) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: bew } = await supabase
    .from("bewerbungen")
    .select("*, bewerbung_dokumente(*)")
    .eq("id", id)
    .single();

  if (!bew) notFound();

  // Attach public URLs to documents
  const docsWithUrl = (bew.bewerbung_dokumente ?? []).map((doc: { storage_path: string }) => ({
    ...doc,
    url: supabase.storage.from("apo-media").getPublicUrl(doc.storage_path).data.publicUrl,
  }));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return (
    <div>
      <Link href="/admin/bewerbungen"
        className="inline-flex items-center gap-1.5 text-sm text-navy-400 hover:text-navy-700 transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Alle Bewerbungen
      </Link>
      <BewerbungDetail
        initial={{ ...bew, bewerbung_dokumente: docsWithUrl }}
        supabaseUrl={supabaseUrl}
        anonKey={anonKey}
      />
    </div>
  );
}
