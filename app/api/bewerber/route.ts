import { NextRequest, NextResponse } from "next/server";
import { bewerberRatelimit } from "@/lib/ratelimit";
import { createClient } from "@/lib/supabase/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 2000);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success } = await bewerberRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte warten Sie einige Minuten." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiges Format." }, { status: 400 });
  }

  const p = body as Record<string, unknown>;

  const vorname           = sanitize(p.vorname);
  const nachname          = sanitize(p.nachname);
  const email             = sanitize(p.email);
  const telefon           = sanitize(p.telefon);
  const herkunftsland     = sanitize(p.herkunftsland);
  const ausbildung        = sanitize(p.ausbildung);
  const erfahrung         = sanitize(p.erfahrung);
  const deutschkenntnisse = sanitize(p.deutschkenntnisse);
  const verfuegbarkeit    = sanitize(p.verfuegbarkeit);
  const nachricht         = sanitize(p.nachricht);
  const vorhandene_dokumente = Array.isArray(p.dokumente)
    ? (p.dokumente as unknown[]).filter((d) => typeof d === "string").map((d) => sanitize(d as string))
    : [];

  if (!vorname || !nachname || !email || !herkunftsland || !ausbildung || !erfahrung || !deutschkenntnisse || !verfuegbarkeit || !nachricht) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }
  if (!p.privacy) {
    return NextResponse.json({ error: "Datenschutzzustimmung erforderlich." }, { status: 400 });
  }
  if (nachricht.length < 20) {
    return NextResponse.json({ error: "Kurzvorstellung zu kurz (min. 20 Zeichen)." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bewerbungen")
    .insert({
      vorname, nachname, email, telefon: telefon || null,
      herkunftsland, ausbildung, erfahrung,
      deutschkenntnisse, verfuegbarkeit, nachricht,
      vorhandene_dokumente, status: "neu",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[APÖ Bewerbung] DB error:", error);
    return NextResponse.json({ error: "Bewerbung konnte nicht gespeichert werden." }, { status: 500 });
  }

  console.info("[APÖ Bewerbung] created:", data.id, email);
  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
