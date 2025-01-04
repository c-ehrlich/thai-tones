export const VowelLengths = {
  Short: "Short",
  Long: "Long",
} as const;
export type VowelLength = (typeof VowelLengths)[keyof typeof VowelLengths];

const shortVowelPatterns: string[] = [
  // Single diacritics
  "ะ", // -ะ (e.g. จะ, ปะ)
  "ั", // -ั (e.g. กัน, มัน)
  "ิ", // -ิ (e.g. กิ, นิด)
  "ึ", // -ึ (e.g. นึ, ดึง if no final consonant changes that)
  "ุ", // -ุ (e.g. สุ, บุ)
  "็", // -็ (e.g. แ็?)
  // " ๋" is a tone mark, not usually a vowel in itself, so might not belong here

  // Special single letters that behave like short vowels
  "ำ", // -ำ (e.g. ทำ, ขำ, นำ)

  // Standalone vowels often treated as short
  "ฤ", // -ฤ (like รึ)
  "ฦ", // -ฦ (like ลึ)

  // Composite/cluster vowels for short forms
  "เาะ", // (e.g. เงาะ)
  "แอะ", // (e.g. แอะ – rare but possible)
  "เอะ", // (e.g. เตะ – spelled เตะ, containing "เ" + "ะ")
  "โะ", // (e.g. โละ – spelled โ + ะ, though often written โละ)
  "ไะ", // not common but can appear in archaic or dialect forms
  "ใะ", // likewise archaic
  "เอียะ", // (e.g. เมียะ – quite rare but used in certain dialect/spelling)
  "เอือะ", // (e.g. เฟือะ – also very uncommon)
  "เออะ", // (e.g. เถอะ)
];

const longVowelPatterns: string[] = [
  // Single letter vowels that are typically long
  "า", // -า
  "ี", // -ี
  "ื", // -ื + (usually needs อ, e.g. มือ, but check carefully)
  "ู", // -ู

  // Composite vowels commonly taught as “long”
  "อา",
  "อี",
  "อู", // if spelled that way in a cluster
  "แอ", // เ-แ
  "โ", // NOTE: on its own, โ is usually a long vowel (โอ)
  "ไ", // ไ- (ไอ)
  "ใ", // ใ- (ใอ)
  "เอ", // เ- (เช, เม, etc. if no final short sign)
  "แอ", // แ-
  "เอีย", // เ-ีย
  "เอือ", // เ-ือ
  "อำ", // in some spelled forms, though typically “อำ” is written as “ำ”
  "ฤา", // -ฤา (like รึา -> long)
  "ฦา", // -ฦา (like ลึา -> long)
];

/**
 * Helper to strip tone marks, if you haven't already.
 */
function removeToneMarks(s: string): string {
  return s.replace(/[\u0E48-\u0E4E]/g, "");
}

/**
 * Attempt to identify short vs. long vowels by looking
 * for known patterns from longest to shortest match.
 */
export function getSyllableVowelLength(syllable: string): VowelLength {
  const cleaned = removeToneMarks(syllable);

  // 1) We match from LONGEST patterns to SHORTEST to avoid partial matches
  //    For example, we don’t want to match "เอะ" inside "เออะ" incorrectly.
  //    We'll sort arrays so that e.g. "เอือะ" appears before "เอะ" in short patterns, etc.
  const sortedShort = [...shortVowelPatterns].sort(
    (a, b) => b.length - a.length
  );
  const sortedLong = [...longVowelPatterns].sort((a, b) => b.length - a.length);

  // 2) Check short patterns first
  for (const sv of sortedShort) {
    if (cleaned.includes(sv)) {
      // this logic needs exceptions for ฤา and ฦา
      if (
        (sv === "ฤ" && cleaned.includes("ฤา")) ||
        (sv === "ฦ" && cleaned.includes("ฦา"))
      ) {
        return VowelLengths.Long;
      }

      return VowelLengths.Short;
    }
  }

  // 3) Check long patterns
  for (const lv of sortedLong) {
    if (cleaned.includes(lv)) {
      return VowelLengths.Long;
    }
  }

  // 4) If nothing matches, default to LONG
  return VowelLengths.Long;
}
