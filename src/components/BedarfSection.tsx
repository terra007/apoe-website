"use client";

import { motion } from "framer-motion";
import { ExternalLink, Scale } from "lucide-react";
import { BEDARF, QUELLEN, STAND } from "@/data/fakten";

export default function BedarfSection() {
  return (
    <section id="bedarf" className="bg-slate-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Warum jetzt: der Bedarf in Zahlen</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Die Zahlen stammen aus der amtlichen Pflegepersonalprognose der Gesundheit Österreich GmbH. Jede Karte
          verlinkt auf ihre Quelle.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BEDARF.map((b, i) => (
            <motion.li
              key={b.titel}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-4xl font-semibold text-emerald-400">{b.zahl}</p>
              <p className="mt-1 font-medium">{b.titel}</p>
              <p className="mt-2 flex-1 text-sm text-slate-400">{b.text}</p>
              <a
                href={b.quelle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Quelle <ExternalLink className="h-3 w-3" />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-emerald-400" />
          <div>
            <h3 className="text-lg font-semibold">Ethische Rekrutierung als Maßstab</h3>
            <p className="mt-2 text-sm text-slate-300">
              Die WHO empfiehlt in ihrem Verhaltenskodex von 2010 faire Anwerbung: Herkunftsländer mit knappem Personal
              nicht auszudünnen, die Rechte der Fachkräfte zu wahren und im eigenen Land selbst ausreichend Personal
              auszubilden und zu halten. Der Kodex ist freiwillig, aber der gängige Maßstab für seriöse Vermittlung.
            </p>
            <a
              href={QUELLEN.who.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              WHO-Kodex lesen <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">Stand der Recherche: {STAND}. Prognosen sind Modellrechnungen.</p>
      </div>
    </section>
  );
}
