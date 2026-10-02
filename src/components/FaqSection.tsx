"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { FAQ, STAND } from "@/data/fakten";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-900 px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Häufige Fragen</h2>
        <p className="mt-3 text-slate-400">
          Was Einrichtungen und Fachkräfte zu Anerkennung, Deutsch und Aufenthalt wissen müssen, mit Quellen.
        </p>

        <ul className="mt-10 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.frage} className="rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    {f.frage}
                    <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition", isOpen && "rotate-180")} />
                  </button>
                </h3>
                {isOpen && (
                  <div id={`faq-${i}`} className="px-5 pb-5 text-sm text-slate-300">
                    <p>{f.antwort}</p>
                    <ul className="mt-3 space-y-1">
                      {f.quellen.map((q) => (
                        <li key={q.url}>
                          <a
                            href={q.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:underline"
                          >
                            {q.label} <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-slate-500">
          Stand: {STAND}. Allgemeine Information, keine Rechtsberatung. Maßgeblich sind die zuständigen Behörden.
        </p>
      </div>
    </section>
  );
}
