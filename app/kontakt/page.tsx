import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt & Beratung",
  description:
    "Kontaktieren Sie die APÖ für eine kostenfreie Bedarfserhebung. Erstgespräch für öffentliche Träger, Ausschreibungsunterlagen und allgemeine Anfragen.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "E-Mail",
    value: "office@apoesterreich.at",
    href: "mailto:office@apoesterreich.at",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+43 1 234 567 890",
    href: "tel:+431234567890",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Musterstraße 1, 1010 Wien",
    href: null,
  },
  {
    icon: Clock,
    label: "Erreichbarkeit",
    value: "Mo–Fr: 09:00–17:00 Uhr",
    href: null,
  },
];

export default function KontaktPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-hero-gradient py-16">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider mb-4 inline-flex">
              Beratung & Kontakt
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Erstgespräch &{" "}
              <span className="text-red-austria">Bedarfserhebung</span>
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed">
              Schildern Sie uns Ihren Bedarf – wir erstellen innerhalb von 5
              Werktagen ein maßgeschneidertes, unverbindliches Angebot für Ihre
              Einrichtung.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">
                Anfrage senden
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="card">
                <h3 className="text-base font-bold text-navy-900 mb-4">
                  Direktkontakt
                </h3>
                <div className="space-y-3">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon
                        className="h-4 w-4 text-red-austria mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-xs text-navy-400 mb-0.5">{label}</div>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-navy-700 hover:text-red-austria transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-navy-700">
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Card */}
              <div className="rounded-xl border-2 border-red-austria/20 bg-red-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-red-austria" aria-hidden="true" />
                  <h3 className="text-base font-bold text-navy-900">
                    Online-Termin
                  </h3>
                </div>
                <p className="text-sm text-navy-600 mb-4">
                  Buchen Sie direkt ein 30-minütiges Video-Erstgespräch mit
                  unserem B2G-Beratungsteam.
                </p>
                <a
                  href="mailto:office@apoesterreich.at?subject=Terminanfrage%20Erstgespräch"
                  className="btn-primary w-full text-sm justify-center"
                >
                  Termin anfragen
                </a>
              </div>

              {/* Response time */}
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <p className="text-sm text-green-800 font-medium mb-1">
                  Schnelle Rückmeldung garantiert
                </p>
                <p className="text-xs text-green-700">
                  Anfragen werden innerhalb von 48 Geschäftsstunden beantwortet.
                  Für dringende Anliegen empfehlen wir den direkten Anruf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
