import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateKandidatin, deleteKandidatin } from "@/lib/data-store";
import { createClient } from "@/lib/supabase/server";
import type { Pflegekraft } from "@/lib/pflegekraefte-data";

async function isAuthorized(): Promise<boolean> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = (await req.json()) as Pflegekraft;
  const result = await updateKandidatin(params.slug, data);

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 404 });

  revalidatePath("/pflegekraefte");
  revalidatePath(`/pflegekraefte/${params.slug}`);
  if (data.slug !== params.slug) revalidatePath(`/pflegekraefte/${data.slug}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await deleteKandidatin(params.slug);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 404 });

  revalidatePath("/pflegekraefte");
  return NextResponse.json({ ok: true });
}
