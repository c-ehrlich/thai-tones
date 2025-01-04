import { removeToneMarks } from "./remove-tone-marks";

export function extractVowel({
  syllable,
  startingCluster,
  endingConsonant,
}: {
  syllable: string;
  startingCluster: string;
  endingConsonant?: string;
}) {
  const withoutToneMarks = removeToneMarks(syllable);
  const withoutStartingCluster = withoutToneMarks.replace(startingCluster, "-");
  const withoutEndingConsonant = endingConsonant
    ? withoutStartingCluster
        .split("")
        .reverse()
        .join("")
        .replace(endingConsonant, "")
        .split("")
        .reverse()
        .join("")
    : withoutStartingCluster;

  if (withoutEndingConsonant === "-") {
    if (endingConsonant) {
      return "โ-ะ";
    } else {
      return "-ะ";
    }
  }

  return withoutEndingConsonant;
}
