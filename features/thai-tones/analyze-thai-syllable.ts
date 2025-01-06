import { bannedSyllables } from "../practice/pick-syllable";
import { Consonants } from "./consonants";
import { extractInitialConsonantCluster } from "./extract-initial-consonant-cluster";
import { extractVowel } from "./extract-vowel";
import { getConsonantClass } from "./get-consonant-class";
import { getSyllableKind } from "./get-syllable-kind";
import { getThaiToneInfo } from "./get-syllable-tone";
import { getVowelLength } from "./get-vowel-length";
import { getToneMarker } from "./get-tone-marker";
import { removeStartingClusterAndVowel } from "./remove-starting-cluster-and-vowel";

const onlyContainsThaiCharactersRegex = /^[\u0E00-\u0E7F]+$/;

export function analyzeThaiSyllable(syllable: string) {
  if (!syllable) {
    throw new Error("Empty syllable");
  }

  if (bannedSyllables.has(syllable)) {
    throw new Error(`Banned syllable: ${syllable}`);
  }

  if (!onlyContainsThaiCharactersRegex.test(syllable)) {
    throw new Error(`Syllable contains non thai characters: ${syllable}`);
  }

  // 1. Identify tone marks
  const toneMarker = getToneMarker(syllable);

  // 2. Extract the "initial consonant or cluster" and figure out its class
  const initialCluster = extractInitialConsonantCluster(syllable);

  if (!initialCluster) {
    throw new Error(`No initial cluster found in syllable: ${syllable}`);
  }

  const endingConsonant = removeStartingClusterAndVowel({
    syllable: syllable,
    startingCluster: initialCluster,
  });

  const vowel = extractVowel({
    syllable,
    startingCluster: initialCluster,
    endingConsonant: endingConsonant,
  });

  const consonantClass = getConsonantClass(initialCluster, syllable);
  if (!consonantClass) {
    throw new Error(
      `Cannot determine consonant class for cluster: ${initialCluster} in syllable: ${syllable}`
    );
  }

  const syllableKind = getSyllableKind(syllable);

  const vowelLength = getVowelLength(vowel);

  const initialClusterNames = initialCluster.split("").map((c) => {
    if (c in Consonants) {
      return Consonants[c as keyof typeof Consonants].name;
    }
    return c;
  });

  const { tone, reason } = getThaiToneInfo({
    toneMarker,
    consonantClass,
    syllableKind: syllableKind,
    vowelLength,
  });

  return {
    tone,
    reason,
    toneMarker,
    initialCluster,
    initialClusterNames,
    consonantClass,
    syllableKind,
    vowel,
    vowelLength,
    endingConsonant,
  };
}
