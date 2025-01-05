import { removeToneMarks } from "./remove-tone-marks";

export function removeStartingClusterAndVowel({
  syllable,
  startingCluster,
}: {
  syllable: string;
  startingCluster: string; // e.g. "กร", "หม", "ส", etc.
}): string {
  const withoutToneMarkers = removeToneMarks(syllable, true);
  const withoutStartingCluster = withoutToneMarkers.replace(
    startingCluster,
    "-"
  );
  // 🐉 order matters here
  const allPossibleVowels = [
    "-ำ",
    "-ัวะ",
    "-ัว",
    "-ั",
    "แ-ว",
    "เ-ือะ",
    "เ-ือ",
    "เ-ียะ",
    "เ-ีย",
    "แ-ะ",
    "เ-อะ",
    "เ-าะ",
    "เ-ีย",
    "เ-ือ",
    "เ-ิ", // -er
    "เ-อ",
    "เ-า",
    "-ว",
    "แ-อ",
    "โ-ะ",
    "ไ-",
    "ใ-",
    "โ-",
    "แ-็",
    "เ-็",
    "เ-ะ",
    "แ-",
    "เ-",
    "-ู",
    "-ุ",
    "-ือ",
    "-ื",
    "-ึอ",
    "-อ",
    "-ึ",
    "-ิ",
    "-ี",
    "-ะ",
    "-า",
    "-",
  ];
  let final = withoutStartingCluster;
  allPossibleVowels.forEach((vowel) => {
    if (final.includes(vowel)) {
      final = final.replace(vowel, "");
    }
  });
  return final;
}
