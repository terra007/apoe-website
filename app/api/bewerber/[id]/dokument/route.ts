import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitize(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 500);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiges Format." }, { status: 400 });
  }

  const p = body as Record<string, unknown>;
  const original_name  = sanitize(p.original_name);
  const storage_path   = sanitize(p.storage_path);
  const mime_type      = sanitize(p.mime_type);
  const groesse        = typeof p.groesse === "number" ? Math.round(p.groesse) : null;

  if (!original_name || !storage_path) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  const supabase = await createClient();

  // Verify application exists (anon read needs to bypass RLS via service — use anon check)
  const { data: bew } = await supabase
    .from("bewerbungen")
    .select("id")
    .eq("id", id)
    .single();

  if (!bew) {
    return NextResponse.json({ error: "Bewerbung nicht gefunden." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("bewerbung_dokumente")
    .insert({ bewerbung_id: id, original_name, storage_path, uploaded_by: "bewerber", mime_type: mime_type || null, groesse })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[APÖ Dokument] DB error:", error);
    return NextResponse.json({ error: "Dokument konnte nicht gespeichert werden." }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
