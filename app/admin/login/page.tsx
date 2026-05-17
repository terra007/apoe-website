"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Ungültige Anmeldedaten. Bitte erneut versuchen.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-austria mb-4">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">APÖ Admin</h1>
          <p className="text-navy-400 text-sm mt-1">Kandidatinnen-Verwaltung</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-navy-800 rounded-2xl border border-navy-700 p-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-200 mb-1.5">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-navy-600 bg-navy-900 px-4 py-2.5 text-white placeholder-navy-500 text-sm focus:border-red-austria focus:outline-none focus:ring-1 focus:ring-red-austria"
              placeholder="admin@beispiel.at"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy-200 mb-1.5">
              Passwort
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-navy-600 bg-navy-900 px-4 py-2.5 pr-10 text-white placeholder-navy-500 text-sm focus:border-red-austria focus:outline-none focus:ring-1 focus:ring-red-austria"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-200"
                tabIndex={-1}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-900/30 border border-red-800/50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full rounded-lg bg-red-austria px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Wird geprüft…" : "Anmelden"}
          </button>
        </form>

        <p className="text-center text-xs text-navy-500 mt-4">
          Nur für autorisierte Administratoren
        </p>
      </div>
    </div>
  );
}
