const BUCKET = "profile-videos";

/**
 * Macht aus dem Eintrag in `Profil.video` eine abspielbare Adresse.
 *
 * - `https://…` oder `/videos/…` bleiben, wie sie sind.
 * - Ein blosser Dateiname (`nattaya.mp4`) liegt im Supabase-Bucket
 *   `profile-videos`; dafür braucht es NEXT_PUBLIC_SUPABASE_URL.
 *
 * Fehlt die Adresse, gibt die Funktion `null` zurück und die Seite zeigt den
 * Platzhalter statt eines toten Players.
 */
export function resolveVideoUrl(src: string | undefined): string | null {
  if (!src) return null;
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(src)}`;
}
