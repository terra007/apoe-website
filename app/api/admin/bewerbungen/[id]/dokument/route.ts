import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Keine Datei." }, { status: 400 });
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "Datei zu groß (max. 20 MB)." }, { status: 413 });
  }

  const ext = file.name.split(".").pop() ?? "bin";
  const path = `bewerbungen/${id}/admin-${Date.now()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("apo-media")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("bewerbung_dokumente")
    .insert({
      bewerbung_id: id,
      original_name: file.name,
      storage_path: path,
      uploaded_by: "admin",
      mime_type: file.type,
      groesse: file.size,
    })
    .select("id, original_name, storage_path, uploaded_by, created_at")
    .single();

  if (error || !data) return NextResponse.json({ error: "DB-Fehler." }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from("apo-media").getPublicUrl(path);
  return NextResponse.json({ ...data, url: publicUrl }, { status: 201 });
}
