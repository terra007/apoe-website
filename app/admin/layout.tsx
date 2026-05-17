import Link from "next/link";
import { Shield } from "lucide-react";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-50">
      {/* Admin Header */}
      <header className="bg-navy-900 border-b border-navy-700 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-austria">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">APÖ Admin</span>
            <span className="text-navy-400 text-xs hidden sm:inline">· Kandidatinnen-Verwaltung</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-navy-300 hover:text-white text-xs transition-colors">
            ← Website
          </Link>
          <Link
            href="/pflegekraefte"
            className="text-navy-300 hover:text-white text-xs transition-colors hidden sm:inline"
          >
            Kandidatinnen ansehen
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
