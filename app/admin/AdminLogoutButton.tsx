"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border border-navy-600 px-3 py-1 text-xs text-navy-300 hover:bg-navy-700 hover:text-white transition-colors"
    >
      Abmelden
    </button>
  );
}
