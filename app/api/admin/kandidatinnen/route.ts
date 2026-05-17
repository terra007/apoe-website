import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readKandidatinnen, createKandidatin } from "@/lib/data-store";
import { createClient } from "@/lib/supabase/server";
import type { Pflegekraft } from "@/lib/pflegekraefte-data";

async function isAuthorized(): Promise<boolean> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readKandidatinnen());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = (await req.json()) as Pflegekraft;
  const result = await createKandidatin(data);

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 409 });

  revalidatePath("/pflegekraefte");
  revalidatePath(`/pflegekraefte/${data.slug}`);
  return NextResponse.json({ ok: true }, { status: 201 });
}
