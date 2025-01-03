import { getSyllableLiveOrDeadAndVowelLength } from "./get-syllable-live-or-dead-and-vowel-length";

/**
 * Syllable kinds
 */
export const SyllableKinds = {
  Live: "live",
  Dead: "dead",
} as const;
export type SyllableKind = (typeof SyllableKinds)[keyof typeof SyllableKinds];

export function getSyllableKind(thaiSyllable: string): SyllableKind {
  return getSyllableLiveOrDeadAndVowelLength(thaiSyllable).ending;
}
