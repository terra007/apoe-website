"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// Alle Zahlen und Regeln stammen aus der Recherche in src/data/fakten.ts.

function Counter({ to, ms = 2200, className }: { to: number; ms?: number; className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const steps = 50;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setN(Math.round(to * Math.min(1, i / steps)));
      if (i >= steps) clearInterval(t);
    }, ms / steps);
    return () => clearInterval(t);
  }, [to, ms]);
  return <span className={className}>{n.toLocaleString("de-DE")}</span>;
}

function Bedarf() {
  return (
    <div className="w-full max-w-md text-center">
      <p className="text-5xl font-semibold text-emerald-400 sm:text-7xl">
        <Counter to={75700} />
      </p>
      <p className="mt-1 text-slate-300">zusätzliche Pflegekräfte bis 2030</p>
      <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-white/10">
        <motion.div className="bg-amber-400" initial={{ width: 0 }} animate={{ width: "55%" }} transition={{ delay: 0.6, duration: 1.4 }} />
        <motion.div className="bg-emerald-500" initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ delay: 1.2, duration: 1.4 }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>
          <i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
          ca. 42.000 Ersatz für Pensionierungen
        </span>
        <span>
          <i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
          ca. 34.000 Mehrbedarf
        </span>
      </div>
    </div>
  );
}

function Verbindung() {
  return (
    <div className="w-full max-w-lg">
      <svg viewBox="0 0 400 160" className="w-full" aria-hidden>
        <motion.path
          d="M40 120 C 120 -20, 280 -20, 360 40"
          fill="none"
          stroke="#34d399"
          strokeWidth="3"
          strokeDasharray="3 9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          style={{ offsetPath: "path('M40 120 C 120 -20, 280 -20, 360 40')" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <circle r="9" fill="#fff" />
          <path d="M-4 0 h8 M0 -4 v8" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>
        {[
          { x: 40, y: 120, l: "BANGKOK" },
          { x: 360, y: 40, l: "WIEN" },
        ].map((c, i) => (
          <g key={c.l}>
            <motion.circle cx={c.x} cy={c.y} r="7" fill="#34d399" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 2.8, type: "spring" }} />
            <text x={c.x} y={c.y + 24} textAnchor="middle" fill="#94a3b8" fontSize="11" letterSpacing="2">
              {c.l}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Sprache() {
  const stufen = [
    { l: "A1", t: "" },
    { l: "A2", t: "" },
    { l: "B1", t: "PA · PFA" },
    { l: "B2", t: "DGKP" },
  ];
  return (
    <div className="flex w-full max-w-md items-end justify-center gap-2 sm:gap-3">
      {stufen.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.7, type: "spring", stiffness: 140, damping: 16 }}
          className="flex flex-1 flex-col items-center"
        >
          <span className="mb-2 h-6 text-xs font-semibold text-emerald-300">{s.t}</span>
          <div
            className={cn("flex w-full items-start justify-center rounded-t-xl pt-2 text-lg font-semibold", i >= 2 ? "bg-emerald-500 text-slate-950" : "bg-white/15")}
            style={{ height: 40 + i * 34 }}
          >
            {s.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Anerkennung() {
  return (
    <div className="relative flex h-44 w-full max-w-sm items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -50, rotate: -8 + i * 8 }}
          animate={{ opacity: 1, y: i * 6, rotate: -4 + i * 4 }}
          transition={{ delay: 0.2 + i * 0.4, type: "spring" }}
          className="absolute h-36 w-28 rounded-lg border border-white/20 bg-slate-100 p-3 text-slate-700 shadow-xl sm:w-32"
        >
          <div className="h-1.5 w-12 rounded bg-slate-400" />
          <div className="mt-2 space-y-1.5">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="h-1 rounded bg-slate-300" />
            ))}
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 2.4, rotate: -25 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ delay: 2.4, type: "spring", stiffness: 220, damping: 14 }}
        className="absolute rounded-md border-4 border-emerald-500 px-3 py-1 text-lg font-bold uppercase tracking-widest text-emerald-500"
      >
        Nostrifiziert
      </motion.div>
    </div>
  );
}

function Karte() {
  return (
    <div className="w-full max-w-sm">
      <motion.div
        initial={{ opacity: 0, rotateY: 80, y: 20 }}
        animate={{ opacity: 1, rotateY: 0, y: 0 }}
        transition={{ duration: 0.9, type: "spring", damping: 18 }}
        className="overflow-hidden rounded-2xl shadow-2xl"
      >
        <div className="h-8 bg-red-600" />
        <div className="flex items-center justify-between bg-white px-5 py-4 text-slate-800">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Aufenthaltstitel</p>
            <p className="text-lg font-semibold">Rot-Weiß-Rot – Karte</p>
            <p className="text-xs text-slate-500">Fachkraft in Mangelberuf</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-red-600">
              <Counter to={55} ms={1800} />
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Punkte mind.</p>
          </div>
        </div>
        <div className="h-8 bg-red-600" />
      </motion.div>
      <p className="mt-3 text-center text-xs text-slate-400">+ Stelle mit Entlohnung nach Kollektivvertrag</p>
    </div>
  );
}

function Ankommen() {
  const punkte = ["Eintrag im Gesundheitsberuferegister", "Einarbeitung mit Mentoring", "Erster Dienst im Team"];
  return (
    <ul className="w-full max-w-sm space-y-3">
      {punkte.map((p, i) => (
        <motion.li
          key={p}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 1.1 }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 1.1, type: "spring", stiffness: 300 }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950"
          >
            <Check className="h-4 w-4" />
          </motion.span>
          <span className="text-sm sm:text-base">{p}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Fair() {
  return (
    <div className="w-full max-w-sm text-center">
      <svg viewBox="0 0 300 170" className="w-full" aria-hidden>
        <line x1="150" y1="20" x2="150" y2="150" stroke="#64748b" strokeWidth="4" />
        <line x1="100" y1="150" x2="200" y2="150" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <motion.g
          style={{ originX: "150px", originY: "34px" }}
          initial={{ rotate: -14 }}
          animate={{ rotate: [-14, 10, -5, 2, 0] }}
          transition={{ duration: 3, times: [0, 0.3, 0.55, 0.8, 1] }}
        >
          <line x1="40" y1="34" x2="260" y2="34" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 34 L22 84 H58 Z M260 34 L242 84 H278 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="40" cy="86" rx="26" ry="6" fill="#0ea5a4" />
          <ellipse cx="260" cy="86" rx="26" ry="6" fill="#0ea5a4" />
        </motion.g>
      </svg>
      <p className="mt-1 text-xs text-slate-400">Herkunftsland · Fachkraft · Zielland</p>
    </div>
  );
}

function Start() {
  return (
    <div className="text-center">
      <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl font-semibold tracking-tight sm:text-8xl">
        AP<span className="text-emerald-400">Ö</span>
      </motion.p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="#rechner" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
          Bedarf erheben <ArrowRight className="h-4 w-4" />
        </a>
        <a href="#profile" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-semibold hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          Profile ansehen
        </a>
      </div>
    </div>
  );
}

/** `text` sind die Untertitel; `sprech` ist die Lautschrift für die Stimme (Zahlen, Abkürzungen), falls sie abweicht. */
type Szene = { id: string; titel: string; dauer: number; text: string; sprech?: string; visual: ReactNode };

const SZENEN: Szene[] = [
  { id: "bedarf", titel: "Der Bedarf", dauer: 9, text: "Österreich fehlt Pflegepersonal. Bis 2030 werden mindestens 75.700 zusätzliche Pflegekräfte gebraucht.",
    sprech: "Österreich fehlt Pflegepersonal. Bis zweitausenddreißig werden mindestens fünfundsiebzigtausendsiebenhundert zusätzliche Pflegekräfte gebraucht.", visual: <Bedarf /> },
  { id: "idee", titel: "Zwei Länder", dauer: 8, text: "APÖ verbindet zwei Länder: qualifizierte Pflegekräfte aus Thailand, begleitet bis zum ersten Arbeitstag.",
    sprech: "A P Ö verbindet zwei Länder: qualifizierte Pflegekräfte aus Thailand, begleitet bis zum ersten Arbeitstag.", visual: <Verbindung /> },
  { id: "sprache", titel: "Sprache", dauer: 9, text: "Schritt eins, Sprache. In Bangkok lernen die Fachkräfte Deutsch. B1 genügt für Pflegeassistenz, für die diplomierte Pflege braucht es B2.",
    sprech: "Schritt eins, Sprache. In Bangkok lernen die Fachkräfte Deutsch. B eins genügt für Pflegeassistenz, für die diplomierte Pflege braucht es B zwei.", visual: <Sprache /> },
  { id: "anerkennung", titel: "Anerkennung", dauer: 9, text: "Schritt zwei, Anerkennung. Die Ausbildung wird in Österreich nostrifiziert. Bei der diplomierten Pflege geschieht das, bevor die Karte beantragt wird.", visual: <Anerkennung /> },
  { id: "karte", titel: "Aufenthalt", dauer: 8, text: "Schritt drei, Aufenthalt. Die Rot-Weiß-Rot-Karte für Fachkräfte in Mangelberufen, mit einer Stelle und Entlohnung nach Kollektivvertrag.", visual: <Karte /> },
  { id: "ankommen", titel: "Ankommen", dauer: 8, text: "Schritt vier, Ankommen. Eintrag im Gesundheitsberuferegister, Einarbeitung mit Mentoring, und dann der erste Dienst.", visual: <Ankommen /> },
  { id: "fair", titel: "Fair", dauer: 7, text: "Und das fair: nach dem Verhaltenskodex der Weltgesundheitsorganisation für ethische Anwerbung.", visual: <Fair /> },
  { id: "start", titel: "Ihr Start", dauer: 6, text: "Ihr Start: Bedarf erheben, Profile ansehen, Beratung buchen.", visual: <Start /> },
];

export default function ExplainerVideo() {
  const reduce = useReducedMotion();
  const [gestartet, setGestartet] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [stimme, setStimme] = useState(false);
  const [stimmeOk, setStimmeOk] = useState(false);
  const rest = useRef(0);
  const seit = useRef(0);

  const szene = SZENEN[index];
  const letzte = index === SZENEN.length - 1;

  useEffect(() => {
    // speechSynthesis gibt es nur im Browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStimmeOk(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const gehZu = useCallback((i: number, spielen = true) => {
    const n = Math.max(0, Math.min(SZENEN.length - 1, i));
    rest.current = SZENEN[n].dauer * 1000;
    setIndex(n);
    setGestartet(true);
    setPlaying(spielen);
  }, []);

  const toggle = useCallback(() => {
    if (!gestartet) return gehZu(0);
    setPlaying((p) => !p);
  }, [gestartet, gehZu]);

  // Szenenwechsel: Restzeit merken, damit eine Pause nicht von vorn zählt.
  useEffect(() => {
    if (!playing) return;
    if (letzte) {
      const t = setTimeout(() => setPlaying(false), rest.current);
      seit.current = Date.now();
      return () => {
        rest.current -= Date.now() - seit.current;
        clearTimeout(t);
      };
    }
    seit.current = Date.now();
    const t = setTimeout(() => gehZu(index + 1), rest.current);
    return () => {
      rest.current -= Date.now() - seit.current;
      clearTimeout(t);
    };
  }, [playing, index, letzte, gehZu]);

  // Sprecher
  useEffect(() => {
    if (!stimmeOk) return;
    window.speechSynthesis.cancel();
    if (stimme && playing && gestartet) {
      const u = new SpeechSynthesisUtterance(szene.sprech ?? szene.text);
      u.lang = "de-AT";
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
    return () => window.speechSynthesis.cancel();
  }, [stimme, playing, gestartet, index, szene.text, szene.sprech, stimmeOk]);

  const btn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-30";

  return (
    <section id="erklaerfilm" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">In 70 Sekunden erklärt</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Vom Bedarf bis zum ersten Dienst: der Weg einer Pflegekraft nach Österreich als kurzer Animationsfilm, mit
          Untertiteln und auf Wunsch mit Sprecherstimme.
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden px-5 sm:aspect-video sm:px-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(16,185,129,0.16),transparent_60%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_100%,48px_48px,48px_48px]"
            />

            {!gestartet ? (
              <button
                type="button"
                onClick={toggle}
                className="group relative flex flex-col items-center gap-4 focus:outline-none"
                aria-label="Erklärfilm starten"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-[0_0_0_12px_rgba(16,185,129,0.18)] transition group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-emerald-300">
                  <Play className="h-9 w-9 translate-x-0.5" />
                </span>
                <span className="text-lg font-medium">Erklärfilm starten</span>
                <span className="text-sm text-slate-400">ca. 70 Sekunden · deutsch · mit Untertiteln</span>
              </button>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={szene.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex w-full flex-col items-center pb-28 pt-6 sm:pb-16"
                >
                  <p className="mb-5 text-xs uppercase tracking-[0.3em] text-emerald-300">
                    {index + 1} / {SZENEN.length} · {szene.titel}
                  </p>
                  {szene.visual}
                </motion.div>
              </AnimatePresence>
            )}

            {gestartet && (
              <p
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-8 text-center text-sm text-white sm:text-base"
                aria-live="polite"
              >
                {szene.text}
              </p>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-3 flex gap-1" role="tablist" aria-label="Szenen">
              {SZENEN.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index && gestartet}
                  aria-label={`Szene ${i + 1}: ${s.titel}`}
                  title={s.titel}
                  onClick={() => gehZu(i)}
                  className="group relative h-6 flex-1 focus:outline-none"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/15 group-focus-visible:ring-2 group-focus-visible:ring-emerald-400">
                    <span
                      key={`${i}-${i === index ? index : "x"}`}
                      className={cn("block h-full w-0 rounded-full bg-emerald-400", gestartet && i < index && "w-full")}
                      style={
                        gestartet && i === index
                          ? { animation: `explainer-fill ${s.dauer}s linear forwards`, animationPlayState: playing ? "running" : "paused" }
                          : undefined
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => gehZu(index - 1)} disabled={!gestartet || index === 0} aria-label="Vorherige Szene" className={btn}>
                  <SkipBack className="h-4 w-4" />
                </button>
                <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Abspielen"} className={cn(btn, "bg-emerald-500 text-slate-950 hover:text-slate-950")}>
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button type="button" onClick={() => gehZu(index + 1)} disabled={!gestartet || letzte} aria-label="Nächste Szene" className={btn}>
                  <SkipForward className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => gehZu(0)} disabled={!gestartet} aria-label="Von vorn" className={btn}>
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              {stimmeOk && (
                <button
                  type="button"
                  aria-pressed={stimme}
                  onClick={() => setStimme((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm sm:px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                    stimme ? "border-emerald-400 bg-emerald-400/10 text-white" : "border-white/15 text-slate-300 hover:border-white/40"
                  )}
                >
                  {stimme ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  Sprecher {stimme ? "an" : "aus"}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Animierte Grafik, keine Rechtsberatung. Zahlen: GÖG-Prognose; Regeln: oesterreich.gv.at, Stand Oktober 2026. Die
          Sprecherstimme kommt vom Browser und klingt je nach Gerät unterschiedlich.
          {reduce ? " Autoplay ist wegen Ihrer Bewegungseinstellung aus." : ""}
        </p>
      </div>
      <style>{`@keyframes explainer-fill { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
