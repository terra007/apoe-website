"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BewerbungDeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Bewerbung von ${name} wirklich löschen?`)) return;
    const res = await fetch(`/api/admin/bewerbungen/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-md p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      title="Löschen"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
