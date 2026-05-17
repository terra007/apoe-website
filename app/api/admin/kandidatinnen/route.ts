import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createKandidatin } from "@/lib/data-store";
import type { Pflegekraft } from "@/lib/pflegekraefte-data";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
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
  if (!kandidatin?.slug || !kandidatin?.name) {
    return NextResponse.json({ error: "Pflichtfelder fehlen (slug, name)." }, { status: 400 });
  }

  const result = await createKandidatin(kandidatin);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
