/**
 * Syllable kinds
 */
export const SyllableKinds = {
  Live: "live",
  Dead: "dead",
} as const;
export type SyllableKind = (typeof SyllableKinds)[keyof typeof SyllableKinds];

export function getSyllableKind(thaiSyllable: string): SyllableKind {
  // return getSyllableLiveOrDeadAndVowelLength(thaiSyllable).ending;
  // 1) Normalize (remove tone marks, etc.) for easier parsing
  // Tone marks: ่ (0xe48), ้ (0xe49), ๊ (0xe4a), ๋ (0xe4b), ์ (0xe4c), ฺ (0xe4d), ๎ (0xe4e)
  const toneMarkRegex = /[\u0E48-\u0E4E]/g;
  const cleaned = thaiSyllable.replace(toneMarkRegex, "");

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
