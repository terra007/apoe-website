import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TOKEN_TTL_MS = 7 * 24 * 3600 * 1000;
type Params = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, { params }: Params): Promise<NextResponse> {
  const { token } = await params;
  if (!token || !/^[0-9a-f-]{36}$/.test(token)) {
    return NextResponse.json({ error: "Ungültiger Token." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: raw, error } = await supabase.rpc("get_portal_data", { p_token: token });

  if (error || !raw) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  const bew = raw as { upload_token_created_at: string };
  const age = Date.now() - new Date(bew.upload_token_created_at).getTime();
  if (age > TOKEN_TTL_MS) {
    return NextResponse.json({ error: "Link abgelaufen." }, { status: 410 });
  }

  return NextResponse.json(raw);
}
