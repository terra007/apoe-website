import { NextRequest, NextResponse } from "next/server";
import { contactRatelimit } from "@/lib/ratelimit";

interface ContactPayload {
  name: string;
  organisation: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
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
  const { success } = await contactRatelimit.limit(ip);
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
    return NextResponse.json(
      { error: "Ungültiges JSON-Format." },
      { status: 400 }
    );
  }

  const payload = body as Partial<ContactPayload>;

  const name = sanitize(payload.name);
  const organisation = sanitize(payload.organisation);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const subject = sanitize(payload.subject);
  const message = sanitize(payload.message);

  // Server-side validation
  if (!name || !organisation || !email || !message) {
    return NextResponse.json(
      { error: "Pflichtfelder fehlen." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Ungültige E-Mail-Adresse." },
      { status: 400 }
    );
  }

  if (!payload.privacy) {
    return NextResponse.json(
      { error: "Datenschutzzustimmung erforderlich." },
      { status: 400 }
    );
  }

  if (message.length < 20) {
    return NextResponse.json(
      { error: "Nachricht zu kurz." },
      { status: 400 }
    );
  }

  // --- E-Mail-Versand (Resend / SendGrid) ---
  // Konfiguration via Vercel Environment Variables:
  //   RESEND_API_KEY=re_xxxx
  //   CONTACT_EMAIL_TO=office@apoesterreich.at
  //
  // Beispiel Resend-Integration (npm install resend):
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  //
  // await resend.emails.send({
  //   from: "APÖ Kontaktformular <noreply@apoesterreich.at>",
  //   to: [process.env.CONTACT_EMAIL_TO ?? "office@apoesterreich.at"],
  //   replyTo: email,
  //   subject: `APÖ Anfrage: ${subject} – ${name} (${organisation})`,
  //   text: `
  //     Name: ${name}
  //     Organisation: ${organisation}
  //     E-Mail: ${email}
  //     Telefon: ${phone || "–"}
  //     Betreff: ${subject}
  //
  //     Nachricht:
  //     ${message}
  //   `,
  // });

  // Log for development / placeholder until email provider is configured
  console.info("[APÖ Contact]", {
    timestamp: new Date().toISOString(),
    name,
    organisation,
    email,
    phone: phone || null,
    subject,
    messageLength: message.length,
  });

  return NextResponse.json(
    { success: true, message: "Ihre Anfrage wurde erfolgreich übermittelt." },
    { status: 200 }
  );
}
