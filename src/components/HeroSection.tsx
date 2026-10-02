"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserPlus } from "lucide-react";

const PARTNERS = [
  { name: "BMSÖ", full: "Bundesministerium für Soziales", color: "#e5484d" },
  { name: "AMS", full: "Arbeitsmarktservice Österreich", color: "#f0546a" },
  { name: "Rotes Kreuz", full: "Österreichisches Rotes Kreuz", color: "#ef4444" },
  { name: "Gemeindebund", full: "Österreichischer Gemeindebund", color: "#34d399" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-950 px-6 py-24 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-300"
        >
          <ShieldCheck className="h-3.5 w-3.5" /> Public Health · Österreich ↔ Thailand
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
        >
          Pflegekräfte für Österreichs Versorgung —{" "}
          <span className="text-emerald-400">geplant, nicht improvisiert.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          APÖ begleitet Kliniken, Pflegeheime und Gemeinden von der Bedarfserhebung über die
          Sprachausbildung in Bangkok, Nostrifizierung und Aufenthaltsverfahren bis zur Eintragung
          als DGKP oder Pflege(fach)assistenz, ethisch rekrutiert und behördlich nachvollziehbar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#rechner"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Bedarfserhebung starten <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#prozess"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:border-white/60 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <UserPlus className="h-4 w-4" /> Als Pflegefachkraft bewerben
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-500">
            Vertrauen &amp; Zusammenspiel mit
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <button
                  type="button"
                  title={p.full}
                  aria-label={p.full}
                  className="group flex h-16 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span
                    className="text-lg font-bold tracking-tight text-slate-500 grayscale transition duration-300 group-hover:text-[var(--c)] group-hover:grayscale-0 group-focus-visible:text-[var(--c)] group-focus-visible:grayscale-0"
                    style={{ "--c": p.color } as CSSProperties}
                  >
                    {p.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Schriftzüge als Platzhalter; offizielle Logos erst nach Freigabe der Institutionen einbinden.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
