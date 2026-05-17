import { createClient } from "@supabase/supabase-js";

// Server-side only – uses service role key which bypasses RLS.
// Never import this in client components or expose to the browser.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.");
  return createClient(url, key, { auth: { persistSession: false } });
}
