"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NurseIllustration from "./NurseIllustration";

const SESSION_KEY = "apoe_intro_seen";
const WORDS = ["Strukturiert.", "Ethisch.", "Behördlich begleitet."];
const WORD_MS = 1000;
const SCENE_MS = 5600;

type Phase = "pending" | "words" | "scene" | "curtain" | "done";

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Storage gesperrt: das Intro läuft dann bei jedem Laden, unkritisch. */
  }
}

/** Bangkok links unten, Wien rechts oben; die Kurve ist nur Schmuck, keine Flugroute. */
function RouteArc() {
  return (
    <svg viewBox="0 0 320 90" className="w-full max-w-xs" aria-hidden>
      <motion.path
        d="M20 70 C 90 -10, 230 -10, 300 20"
        fill="none"
        stroke="#34d399"
        strokeWidth="2"
        strokeDasharray="2 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        r="5"
        fill="#fff"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        style={{ offsetPath: "path('M20 70 C 90 -10, 230 -10, 300 20')" }}
        transition={{ delay: 2.0, duration: 1.6, ease: "easeInOut" }}
      />
      {[
        { x: 20, y: 70, label: "Bangkok", delay: 1.9 },
        { x: 300, y: 20, label: "Wien", delay: 3.5 },
      ].map((c) => (
        <g key={c.label}>
          <motion.circle
            cx={c.x}
            cy={c.y}
            r="5"
            fill="#34d399"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: c.delay, type: "spring", stiffness: 300 }}
          />
          <motion.text
            x={c.x}
            y={c.y + 20}
            textAnchor={c.x < 100 ? "start" : "end"}
            fill="#94a3b8"
            fontSize="11"
            letterSpacing="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: c.delay + 0.1 }}
          >
            {c.label.toUpperCase()}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("pending");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Erst nach dem Mount lesbar: sessionStorage gibt es auf dem Server nicht.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(hasSeenIntro() || reduceMotion ? "done" : "words");
  }, [reduceMotion]);

  useEffect(() => {
    if (phase === "words" || phase === "scene") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "words") return;
    const t = setTimeout(() => {
      if (wordIndex < WORDS.length - 1) setWordIndex((i) => i + 1);
      else setPhase("scene");
    }, WORD_MS);
    return () => clearTimeout(t);
  }, [phase, wordIndex]);

  useEffect(() => {
    if (phase !== "scene") return;
    const t = setTimeout(() => setPhase("curtain"), SCENE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const skip = useCallback(() => setPhase("curtain"), []);

  const finish = useCallback(() => {
    markIntroSeen();
    setPhase("done");
  }, []);

  if (phase === "done") return null;

  const showScene = phase === "scene" || phase === "curtain";

  return (
    <motion.div
      role="dialog"
      aria-label="Einleitung"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white"
      initial={{ y: 0 }}
      animate={{ y: phase === "curtain" ? "-100%" : 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "curtain") finish();
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(16,185,129,0.16),transparent_60%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_100%,48px_48px,48px_48px]"
      />

      <AnimatePresence mode="wait">
        {phase === "words" && (
          <motion.p
            key={WORDS[wordIndex]}
            className="absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-light tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            {WORDS[wordIndex]}
          </motion.p>
        )}
      </AnimatePresence>

      {showScene && (
        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-4 px-6 md:grid-cols-2 md:gap-10">
          <div className="order-2 text-center md:order-1 md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              className="mb-6 flex flex-col items-center gap-1 md:items-start"
            >
              <span className="text-2xl font-light text-emerald-300 sm:text-3xl">สวัสดีค่ะ</span>
              <span className="text-2xl font-light sm:text-3xl">Grüß Gott.</span>
            </motion.div>

            <div className="mb-6 flex justify-center md:justify-start">
              <RouteArc />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 3.7, duration: 0.8 }}
            >
              <div className="text-6xl font-semibold tracking-tight sm:text-8xl">
                AP<span className="text-emerald-400">Ö</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                Pflege · Österreich · Thailand
              </p>
            </motion.div>
          </div>

          <div className="order-1 mx-auto h-[38vh] max-h-[460px] md:order-2 md:h-[62vh]">
            <NurseIllustration delay={0.2} />
          </div>
        </div>
      )}

      {phase !== "curtain" && phase !== "pending" && (
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-8 right-8 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-300 transition hover:border-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Intro überspringen
        </button>
      )}
    </motion.div>
  );
}
