import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string; docId: string }> };

export async function DELETE(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id, docId } = await params;

  const { data: doc } = await supabase
    .from("bewerbung_dokumente")
    .select("storage_path")
    .eq("id", docId)
    .eq("bewerbung_id", id)
    .single();

  if (!doc) return NextResponse.json({ error: "Dokument nicht gefunden." }, { status: 404 });

  await supabase.storage.from("apo-media").remove([doc.storage_path]);

  const { error } = await supabase.from("bewerbung_dokumente").delete().eq("id", docId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
