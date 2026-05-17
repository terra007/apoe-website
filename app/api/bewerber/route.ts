import { NextRequest, NextResponse } from "next/server";
import { bewerberRatelimit } from "@/lib/ratelimit";

interface BewerbungPayload {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string;
  herkunftsland: string;
  ausbildung: string;
  erfahrung: string;
  deutschkenntnisse: string;
  verfuegbarkeit: string;
  dokumente: string[];
  nachricht: string;
  privacy: boolean;
}

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

  const payload = body as Partial<BewerbungPayload>;

  const vorname = sanitize(payload.vorname);
  const nachname = sanitize(payload.nachname);
  const email = sanitize(payload.email);
  const telefon = sanitize(payload.telefon);
  const herkunftsland = sanitize(payload.herkunftsland);
  const ausbildung = sanitize(payload.ausbildung);
  const erfahrung = sanitize(payload.erfahrung);
  const deutschkenntnisse = sanitize(payload.deutschkenntnisse);
  const verfuegbarkeit = sanitize(payload.verfuegbarkeit);
  const dokumente = Array.isArray(payload.dokumente)
    ? payload.dokumente.filter((d) => typeof d === "string").map((d) => sanitize(d))
    : [];
  const nachricht = sanitize(payload.nachricht);

  if (!vorname || !nachname || !email || !herkunftsland || !ausbildung || !erfahrung || !deutschkenntnisse || !verfuegbarkeit || !nachricht) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
  }

  if (!payload.privacy) {
    return NextResponse.json({ error: "Datenschutzzustimmung erforderlich." }, { status: 400 });
  }

  if (nachricht.length < 20) {
    return NextResponse.json({ error: "Kurzvorstellung zu kurz (min. 20 Zeichen)." }, { status: 400 });
  }

  // --- E-Mail-Versand via Resend (konfigurierbar) ---
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "APÖ Bewerbungseingang <noreply@apoesterreich.at>",
  //   to: [process.env.CONTACT_EMAIL_TO ?? "office@apoesterreich.at"],
  //   replyTo: email,
  //   subject: `APÖ Bewerbung: ${vorname} ${nachname} – ${ausbildung} (${herkunftsland})`,
  //   text: `
  //     Name: ${vorname} ${nachname}
  //     E-Mail: ${email}
  //     Telefon: ${telefon || "–"}
  //     Herkunftsland: ${herkunftsland}
  //     Ausbildung: ${ausbildung}
  //     Berufserfahrung: ${erfahrung}
  //     Deutschkenntnisse: ${deutschkenntnisse}
  //     Verfügbarkeit: ${verfuegbarkeit}
  //     Vorhandene Dokumente: ${dokumente.join(", ") || "–"}
  //     Kurzvorstellung: ${nachricht}
  //   `,
  // });

  console.info("[APÖ Bewerbung]", {
    timestamp: new Date().toISOString(),
    name: `${vorname} ${nachname}`,
    email,
    herkunftsland,
    ausbildung,
    erfahrung,
    deutschkenntnisse,
    verfuegbarkeit,
    dokumente,
    nachrichtLength: nachricht.length,
  });

  return NextResponse.json(
    { success: true, message: "Ihre Bewerbung wurde erfolgreich übermittelt." },
    { status: 200 }
  );
}
