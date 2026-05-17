import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import BewerbungsForm from "@/components/BewerbungsForm";
import BewerberLanguageSwitcher from "@/components/BewerberLanguageSwitcher";
import type { BewerberT } from "@/messages/bewerber/types";

const VORTEIL_ICONS = [Heart, ShieldCheck, Users];
const VORAUS_ICONS = [GraduationCap, Languages, Star, Globe, FileText, Heart];

export default function BewerberPageContent({ t }: { t: BewerberT }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-20 sm:py-28">
        <div className="container-wide">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge bg-red-austria/20 text-red-austria border border-red-austria/30 text-xs font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
              <BewerberLanguageSwitcher current={t.lang} labels={t.langSwitcher} />
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
              {t.hero.title}{" "}
              <span className="text-red-austria">{t.hero.titleAccent}</span>
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed max-w-2xl">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#bewerbungsformular" className="btn-primary">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#dokumente" className="btn-outline-white">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {t.hero.stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{value}</div>
                  <div className="text-xs text-navy-300 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.vorteile.sectionTitle}</h2>
            <p className="section-subtitle mt-3 max-w-2xl mx-auto">{t.vorteile.sectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.vorteile.items.map(({ title, text }, i) => {
              const Icon = VORTEIL_ICONS[i];
              return (
                <div key={title} className="card flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-austria/10">
                    <Icon className="h-6 w-6 text-red-austria" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voraussetzungen */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-title mb-4">{t.voraussetzungen.sectionTitle}</h2>
              <p className="section-subtitle mb-8">{t.voraussetzungen.sectionSubtitle}</p>
              <ul className="space-y-3">
                {t.voraussetzungen.items.map((item, i) => {
                  const Icon = VORAUS_ICONS[i] ?? Star;
                  return (
                    <li key={item} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-red-austria flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-navy-700 leading-snug">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy-900 p-8 text-white">
              <h3 className="text-xl font-bold mb-6">{t.voraussetzungen.weOffer.title}</h3>
              <ul className="space-y-4">
                {t.voraussetzungen.weOffer.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-austria flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-navy-200 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.prozess.sectionTitle}</h2>
            <p className="section-subtitle mt-3 max-w-xl mx-auto">{t.prozess.sectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.prozess.steps.map(({ nr, title, description }) => (
              <div key={nr} className="card flex flex-col gap-3">
                <div className="text-4xl font-extrabold text-red-austria/20 leading-none">{nr}</div>
                <h3 className="text-base font-bold text-navy-900">{title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dokumente */}
      <section id="dokumente" className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.dokumente.sectionTitle}</h2>
            <p className="section-subtitle mt-3 max-w-2xl mx-auto">{t.dokumente.sectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.dokumente.categories.map(({ name, color, titleColor, items }) => (
              <div key={name} className={`rounded-xl border p-6 ${color}`}>
                <h3 className={`text-base font-bold mb-4 ${titleColor}`}>{name}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-4">
            <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">{t.dokumente.note.title}</p>
              <p className="text-sm text-amber-700">{t.dokumente.note.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formular */}
      <section id="bewerbungsformular" className="bg-navy-50 py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="section-title mb-2">{t.form.sectionTitle}</h2>
              <p className="text-navy-500 mb-8">{t.form.sectionSubtitle}</p>
              <BewerbungsForm t={t.form} />
            </div>
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-base font-bold text-navy-900 mb-4">{t.form.sidebar.contactTitle}</h3>
                <div className="space-y-3 text-sm">
                  <a
                    href="mailto:office@apoesterreich.at"
                    className="flex items-center gap-2 text-navy-700 hover:text-red-austria transition-colors"
                  >
                    <span className="text-red-austria">@</span>
                    office@apoesterreich.at
                  </a>
                </div>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-800 mb-1">{t.form.sidebar.freeTitle}</p>
                <p className="text-xs text-green-700">{t.form.sidebar.freeText}</p>
              </div>
              <div className="rounded-xl border border-navy-200 bg-white p-5">
                <p className="text-sm font-semibold text-navy-800 mb-3">{t.form.sidebar.languagesTitle}</p>
                <div className="flex gap-2 flex-wrap">
                  {(["🇦🇹 Deutsch", "🇬🇧 English", "🇹🇭 ภาษาไทย"] as const).map((lang) => (
                    <span key={lang} className="badge bg-navy-100 text-navy-700 border border-navy-200 text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">{t.faq.sectionTitle}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.faq.items.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-navy-100 bg-navy-50 p-6">
                <h3 className="text-base font-bold text-navy-900 mb-2">{question}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">{t.cta.title}</h2>
          <p className="text-navy-200 mb-8 max-w-xl mx-auto">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bewerbungsformular" className="btn-primary">
              {t.cta.primary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/kontakt" className="btn-outline-white">
              {t.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
