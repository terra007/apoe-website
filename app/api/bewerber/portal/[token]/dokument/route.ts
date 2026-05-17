import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

type Params = { params: Promise<{ token: string }> };

const TOKEN_TTL_MS = 7 * 24 * 3600 * 1000;

function sanitize(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, 500);
}

export async function POST(request: NextRequest, { params }: Params): Promise<NextResponse> {
  const { token } = await params;
  if (!token || !/^[0-9a-f-]{36}$/.test(token)) {
    return NextResponse.json({ error: "Ungültiger Token." }, { status: 400 });
  }

  const service = createServiceClient();

  // Validate token
  const { data: bew } = await service
    .from("bewerbungen")
    .select("id, upload_token_created_at")
    .eq("upload_token", token)
    .single();

  if (!bew) return NextResponse.json({ error: "Ungültiger oder abgelaufener Link." }, { status: 403 });

  const age = Date.now() - new Date(bew.upload_token_created_at).getTime();
  if (age > TOKEN_TTL_MS) {
    return NextResponse.json({ error: "Dieser Link ist abgelaufen." }, { status: 403 });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
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

  const { data, error } = await service
    .from("bewerbung_dokumente")
    .insert({
      bewerbung_id: bew.id,
      original_name,
      storage_path,
      uploaded_by: "portal",
      mime_type: mime_type || null,
      groesse,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[APÖ Portal] dokument error:", error);
    return NextResponse.json({ error: "Dokument konnte nicht gespeichert werden." }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
