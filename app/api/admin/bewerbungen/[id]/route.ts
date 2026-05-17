import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user ? supabase : null;
}

export async function GET(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabase
    .from("bewerbungen")
    .select("*, bewerbung_dokumente(*)")
    .eq("id", id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const allowed = ["status", "admin_notizen", "angefragt_dokumente"] as const;
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  const { error } = await supabase.from("bewerbungen").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
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
