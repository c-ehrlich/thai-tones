import { bannedSyllables } from "../practice/pick-syllable";
import { Consonants } from "./consonants";
import { extractLeadingCluster } from "./extract-leading-cluster";
import { extractVowel } from "./extract-vowel";
import { getConsonantClass } from "./get-consonant-class";
import { getSyllableKind } from "./get-syllable-kind";
import { getThaiToneInfo } from "./get-syllable-tone";
import { getSyllableVowelLength } from "./get-syllable-vowel-length";
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
  const initialCluster = extractLeadingCluster(syllable);

  if (!initialCluster) {
    throw new Error(`No initial cluster found in syllable: ${syllable}`);
  }

  const consonantClass = getConsonantClass(initialCluster, syllable);
  if (!consonantClass) {
    throw new Error(
      `Cannot determine consonant class for cluster: ${initialCluster} in syllable: ${syllable}`
    );
  }

  // 3. Check if the syllable is "dead" or "live"
  // TODO: BEFORE MERGE - this should not be called "ending"...
  const syllableKind = getSyllableKind(syllable);
  const vowelLength = getSyllableVowelLength(syllable);

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

  const endingConsonant = removeStartingClusterAndVowel({
    syllable: syllable,
    startingCluster: initialCluster,
  });

  const vowel = extractVowel({
    syllable,
    startingCluster: initialCluster,
    endingConsonant: endingConsonant,
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
