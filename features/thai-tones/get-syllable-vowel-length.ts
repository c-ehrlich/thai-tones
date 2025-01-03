import { getSyllableLiveOrDeadAndVowelLength } from "./get-syllable-live-or-dead-and-vowel-length";

export const VowelLengths = {
  Short: "short",
  Long: "long",
} as const;
export type VowelLength = (typeof VowelLengths)[keyof typeof VowelLengths];

export function getSyllableVowelLength(syllable: string): VowelLength {
  if (syllable.endsWith("ำ")) {
    return VowelLengths.Short;
  }

  const shortVowelSigns = new Set(
    ["ะ", " ั ", " ิ", " ึ", " ุ", " ็", " ๋"].map((v) => v.trim())
  );

  if ([...shortVowelSigns].some((v) => syllable.includes(v))) {
    return VowelLengths.Short;
  }

  return VowelLengths.Long;
}
