"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ApoLogo from "./ApoLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/oeffentliche-traeger", label: "Öffentliche Träger" },
  { href: "/pflegekraefte", label: "Kandidatinnen" },
  { href: "/prozess-tracker", label: "Prozess-Tracker" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy-900 shadow-lg">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <ApoLogo className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-white tracking-tight">
                APÖ
              </span>
              <span className="hidden text-[10px] font-medium text-navy-300 sm:block">
                Agentur für Pflegevermittlung Österreich
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150",
                  pathname === link.href
                    ? "bg-navy-700 text-white"
                    : "text-navy-200 hover:bg-navy-700 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/kontakt" className="btn-primary text-xs px-4 py-2">
              Erstgespräch vereinbaren
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-navy-200 hover:bg-navy-700 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-navy-700 py-3"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-navy-700 text-white"
                      : "text-navy-200 hover:bg-navy-700 hover:text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-2">
                <Link
                  href="/kontakt"
                  className="btn-primary w-full text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Erstgespräch vereinbaren
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
