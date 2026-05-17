import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { data, error } = await supabase
    .from("bewerbungen")
    .select("id, vorname, nachname, email, herkunftsland, ausbildung, erfahrung, deutschkenntnisse, verfuegbarkeit, status, created_at, bewerbung_dokumente(count)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "ID fehlt." }, { status: 400 });

  // Delete all files from storage first
  const { data: docs } = await supabase
    .from("bewerbung_dokumente")
    .select("storage_path")
    .eq("bewerbung_id", id);

  if (docs && docs.length > 0) {
    await supabase.storage.from("apo-media").remove(docs.map((d) => d.storage_path));
  }

  const { error } = await supabase.from("bewerbungen").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
