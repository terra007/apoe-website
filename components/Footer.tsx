import Link from "next/link";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  leistungen: [
    { href: "/oeffentliche-traeger", label: "Für öffentliche Träger" },
    { href: "/prozess-tracker", label: "Prozess-Tracker" },
    { href: "/kontakt", label: "Bedarfserhebung" },
  ],
  rechtliches: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/kontakt", label: "Kontakt" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      {/* Main Footer */}
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-austria">
                <Shield className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-white">APÖ</span>
                <span className="text-[10px] font-medium text-navy-400">
                  Agentur für Pflegevermittlung Österreich
                </span>
              </div>
            </Link>
            <p className="text-sm text-navy-300 leading-relaxed max-w-sm mb-6">
              Das behördlich begleitete Kompetenzzentrum für die strukturelle
              Rekrutierung und Integration thailändischer Pflegefachkräfte im
              öffentlichen Gesundheitswesen Österreichs.
            </p>
            {/* Contact Info */}
            <div className="flex flex-col gap-2 text-sm text-navy-300">
              <a
                href="mailto:office@apoesterreich.at"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-red-austria flex-shrink-0" />
                office@apoesterreich.at
              </a>
              <a
                href="tel:+431234567890"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-red-austria flex-shrink-0" />
                +43 1 234 567 890
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-austria flex-shrink-0" />
                Musterstraße 1, 1010 Wien
              </span>
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Leistungen
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.leistungen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Rechtliches
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} APÖ GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-400">
            <span>Behördlich konzessioniertes Arbeitsvermittlungsunternehmen</span>
            <span className="h-3 w-px bg-navy-600" />
            <span>Gewerbeschein-Nr. GWO AT-2024-0001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
