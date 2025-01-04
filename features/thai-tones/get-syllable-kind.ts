import { removeToneMarks } from "./remove-tone-marks";

/**
 * Syllable kinds
 */
export const SyllableKinds = {
  Live: "live",
  Dead: "dead",
} as const;
export type SyllableKind = (typeof SyllableKinds)[keyof typeof SyllableKinds];

/**
 * TODO: the real solution here is to identify vowel, starting consonant/cluster, and
 * ending consonant, and then decide based on that...
 */
export function getSyllableKind(thaiSyllable: string): SyllableKind {
  const cleaned = removeToneMarks(thaiSyllable);

  // 2) Identify final character(s)
  // Because Thai might have clusters like 'ร', 'ล' as finals, etc.,
  // we might check if the last char is a vowel or a consonant,
  // or if the last two chars form a cluster.
  // For simplicity, we just look at the last character for now.
  const finalChar = cleaned[cleaned.length - 1] || "";

  // 3) Define possible stop-final consonants => leads to "dead" syllable
  const stopFinals = new Set([
    // Commonly romanized as -k
    "ก",
    "ข",
    "ค",
    "ฆ",
    // Commonly romanized as -p
    "บ",
    "ป",
    "ผ",
    "พ",
    "ฟ",
    "ภ",
    // Commonly romanized as -t
    "ด",
    "ต",
    "ถ",
    "ท",
    "ฑ",
    "ฒ",
    "ฎ",
    "ฏ",
    "ธ",
    "ศ",
    "ษ",
    "ส",
    "จ",
    "ช",
    "ฌ",
    // ^ "ศ", "ษ", "ส" can function as a final /t/ in some words
    "ฤ", // not when long ie ฤา
    "ฦ", // not when long ie ฦา
  ]);

  // 4) Define short vowel endings => also "dead"
  // (For many short vowels, the finalChar might be the vowel sign.)
  const shortVowelSigns = new Set(
    ["ะ", " ั ", " ิ", " ึ", " ุ", " ็", " ๋"].map((v) => v.trim())
  );

  // if it starts with any of เ,แ,โ,ใ,ไ and only has one consonant
  // after the initial vowel, it's live
  const startingVowels = new Set(["เ", "แ", "โ", "ใ", "ไ"]);
  if (startingVowels.has(cleaned[0]) && cleaned.length === 2) {
    return SyllableKinds.Live;
  }

  // 5) Check conditions
  if (shortVowelSigns.has(finalChar)) {
    return SyllableKinds.Dead; // dead (glottal stop implied)
  }

  if (stopFinals.has(finalChar)) {
    return SyllableKinds.Dead; // dead
  }

  // Everything else (nasal finals, long vowels, etc.) => live
  return SyllableKinds.Live;
}
