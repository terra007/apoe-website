import { createClient } from "./supabase/server";
import type { Pflegekraft } from "./pflegekraefte-data";
export { generateSlug } from "./slug";

export async function readKandidatinnen(): Promise<Pflegekraft[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("kandidatinnen")
    .select("slug, data, created_at")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({ ...(row.data as Pflegekraft), slug: row.slug }));
}

export async function getKandidatin(slug: string): Promise<Pflegekraft | undefined> {
  const supabase = createClient();
  const { data } = await supabase
    .from("kandidatinnen")
    .select("slug, data")
    .eq("slug", slug)
    .single();
  if (!data) return undefined;
  return { ...(data.data as Pflegekraft), slug: data.slug };
}

export async function createKandidatin(kandidatin: Pflegekraft): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("kandidatinnen")
    .insert({ slug: kandidatin.slug, data: kandidatin });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateKandidatin(slug: string, kandidatin: Pflegekraft): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("kandidatinnen")
    .update({ data: kandidatin, slug: kandidatin.slug })
    .eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteKandidatin(slug: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("kandidatinnen")
    .delete()
    .eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
