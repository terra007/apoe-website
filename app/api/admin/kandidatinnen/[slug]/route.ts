import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateKandidatin, deleteKandidatin } from "@/lib/data-store";
import type { Pflegekraft } from "@/lib/pflegekraefte-data";

interface Params {
  params: { slug: string };
}

export async function PUT(request: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiges JSON." }, { status: 400 });
  }

  const kandidatin = body as Pflegekraft;
  if (!kandidatin?.name) {
    return NextResponse.json({ error: "Pflichtfeld fehlt (name)." }, { status: 400 });
  }

  const result = await updateKandidatin(params.slug, kandidatin);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: Params): Promise<NextResponse> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const result = await deleteKandidatin(params.slug);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
