"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "apo_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function necessary() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy-200 bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 flex-shrink-0">
            <Cookie className="h-4 w-4 text-navy-600" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-bold text-navy-900">Datenschutz & Cookies</h2>
        </div>
        <p className="text-xs text-navy-500 leading-relaxed mb-4">
          Wir verwenden ausschließlich technisch notwendige Cookies für den
          sicheren Betrieb dieser Website. Keine Tracking- oder
          Werbe-Cookies.{" "}
          <Link
            href="/datenschutz"
            className="underline text-navy-700 hover:text-red-austria"
          >
            Datenschutzerklärung
          </Link>
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={accept}
            className="w-full rounded-lg bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-700 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={necessary}
            className="w-full rounded-lg border border-navy-200 px-4 py-2 text-xs font-medium text-navy-600 hover:bg-navy-50 transition-colors"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
