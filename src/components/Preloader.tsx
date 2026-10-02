"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "apoe_intro_seen";
const WORDS = ["Strukturiert.", "Ethisch.", "Behördlich begleitet."];
const WORD_MS = 1000;
const LOGO_MS = 1500;

type Phase = "pending" | "words" | "logo" | "curtain" | "done";

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

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("pending");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Erst nach dem Mount lesbar: sessionStorage gibt es auf dem Server nicht.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(hasSeenIntro() ? "done" : "words");
  }, []);

  useEffect(() => {
    if (phase === "words" || phase === "logo") {
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
      else setPhase("logo");
    }, WORD_MS);
    return () => clearTimeout(t);
  }, [phase, wordIndex]);

  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(() => setPhase("curtain"), LOGO_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const skip = useCallback(() => setPhase("curtain"), []);

  const finish = useCallback(() => {
    markIntroSeen();
    setPhase("done");
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      role="dialog"
      aria-label="Einleitung"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a] text-white"
      initial={{ y: 0 }}
      animate={{ y: phase === "curtain" ? "-100%" : 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "curtain") finish();
      }}
    >
      <div className="px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === "words" && (
            <motion.p
              key={WORDS[wordIndex]}
              className="text-3xl font-light tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              {WORDS[wordIndex]}
            </motion.p>
          )}
          {(phase === "logo" || phase === "curtain") && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl font-semibold tracking-tight sm:text-8xl">
                AP<span className="text-emerald-400">Ö</span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                Pflege · Österreich · Thailand
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
