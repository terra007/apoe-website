import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params): Promise<NextResponse> {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });

  const { id } = await params;
  const { dokumente } = await request.json() as { dokumente: string[] };

  if (!dokumente?.length) {
    return NextResponse.json({ error: "Mindestens ein Dokument erforderlich." }, { status: 400 });
  }

  // Load application with service client (bypasses RLS for reading)
  const service = createServiceClient();
  const { data: bew, error: fetchErr } = await service
    .from("bewerbungen")
    .select("id, vorname, nachname, email, herkunftsland")
    .eq("id", id)
    .single();

  if (fetchErr || !bew) {
    return NextResponse.json({ error: "Bewerbung nicht gefunden." }, { status: 404 });
  }

  // Generate new upload token (7 days validity)
  const uploadToken = randomUUID();
  const { error: updateErr } = await service
    .from("bewerbungen")
    .update({
      upload_token: uploadToken,
      upload_token_created_at: new Date().toISOString(),
      angefragt_dokumente: dokumente,
      status: "unterlagen_angefragt",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateErr) {
    console.error("[APÖ Anfrage] update error:", updateErr);
    return NextResponse.json({ error: "Datenbank-Fehler." }, { status: 500 });
  }

  const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://apoe-website.vercel.app"}/bewerber/portal/${uploadToken}`;

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  let emailSent = false;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const docList = dokumente.map((d) => `• ${d}`).join("\n");
      await resend.emails.send({
        from: "APÖ <noreply@apoesterreich.at>",
        to: [bew.email],
        subject: "APÖ – Zusätzliche Unterlagen erforderlich",
        text: `Sehr geehrte/r ${bew.vorname} ${bew.nachname},\n\nvielen Dank für Ihre Bewerbung bei der Agentur für Pflegevermittlung Österreich (APÖ).\n\nFür die weitere Bearbeitung benötigen wir folgende Dokumente:\n\n${docList}\n\nBitte laden Sie die fehlenden Unterlagen über folgenden Link hoch:\n${portalUrl}\n\nDer Link ist 7 Tage gültig.\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen\nDas APÖ-Team\noffice@apoesterreich.at`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f2038">
            <div style="background:#0a1628;padding:24px 32px">
              <h1 style="color:white;margin:0;font-size:20px">APÖ – Agentur für Pflegevermittlung Österreich</h1>
            </div>
            <div style="padding:32px">
              <p>Sehr geehrte/r <strong>${bew.vorname} ${bew.nachname}</strong>,</p>
              <p>vielen Dank für Ihre Bewerbung. Für die weitere Bearbeitung benötigen wir folgende Dokumente:</p>
              <ul style="padding-left:20px;line-height:2">
                ${dokumente.map((d) => `<li>${d}</li>`).join("")}
              </ul>
              <p>Bitte laden Sie die fehlenden Unterlagen über den folgenden Button hoch:</p>
              <div style="text-align:center;margin:32px 0">
                <a href="${portalUrl}" style="background:#c8102e;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
                  Dokumente hochladen
                </a>
              </div>
              <p style="color:#666;font-size:13px">Der Link ist <strong>7 Tage</strong> gültig. Danach können wir auf Anfrage einen neuen Link ausstellen.</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
              <p style="color:#666;font-size:13px">Bei Fragen: <a href="mailto:office@apoesterreich.at" style="color:#c8102e">office@apoesterreich.at</a></p>
            </div>
          </div>`,
      });
      emailSent = true;
    } catch (e) {
      console.error("[APÖ Anfrage] email error:", e);
    }
  }

  return NextResponse.json({ success: true, portalUrl, emailSent, token: uploadToken });
}
