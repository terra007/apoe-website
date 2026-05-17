// Auth is handled client-side via Supabase Auth (signInWithPassword / signOut).
// This route is kept as a no-op to avoid 404s from any cached references.
export async function GET() {
  return new Response(null, { status: 204 });
}
