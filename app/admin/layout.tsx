"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Kandidatinnen" },
  { href: "/admin/bewerbungen", label: "Bewerbungen" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Admin Header */}
      <header className="bg-navy-900 border-b border-navy-700 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-austria">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">APÖ Admin</span>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            {adminNav.map(({ href, label }) => {
              const active = href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);
              return (
                <Link key={href} href={href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    active ? "bg-navy-700 text-white" : "text-navy-300 hover:bg-navy-700 hover:text-white"
                  )}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-navy-300 hover:text-white text-xs transition-colors">← Website</Link>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
