"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ slug, name }: { slug: string; name: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Kandidatin "${name}" wirklich löschen?`)) return;

    const res = await fetch(`/api/admin/kandidatinnen/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Fehler beim Löschen.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      title="Löschen"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
