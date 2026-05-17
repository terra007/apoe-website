// Maps any stored dropdown value (DE/EN/TH) back to the German canonical value.
// Uses index-position parity across all language arrays — order must stay in sync.

import de from "@/messages/bewerber/de";
import en from "@/messages/bewerber/en";
import th from "@/messages/bewerber/th";

type FieldKey = "ausbildungen" | "erfahrungen" | "deutschniveaus" | "verfuegbarkeiten" | "dokumenteOptions";

const sources = [de.form, en.form, th.form];

function toDE(value: string, key: FieldKey): string {
  const deArr = de.form[key];
  for (const lang of sources) {
    const idx = lang[key].indexOf(value);
    if (idx !== -1 && idx < deArr.length) return deArr[idx];
  }
  return value; // free-text or already German
}

export const deAusbildung  = (v: string) => toDE(v, "ausbildungen");
export const deErfahrung   = (v: string) => toDE(v, "erfahrungen");
export const deDeutsch     = (v: string) => toDE(v, "deutschniveaus");
export const deVerfueg     = (v: string) => toDE(v, "verfuegbarkeiten");
export const deDokument    = (v: string) => toDE(v, "dokumenteOptions");
