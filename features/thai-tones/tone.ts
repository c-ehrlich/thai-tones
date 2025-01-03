import { bannedSyllables } from "../practice/pick-syllable";
import { extractLeadingCluster } from "./extract-leading-cluster";
import {
  type ConsonantClass,
  ConsonantClasses,
  getConsonantClass,
} from "./get-consonant-class";
import {
  getSyllableKind,
  type SyllableKind,
  SyllableKinds,
} from "./get-syllable-kind";
import { getSyllableLiveOrDeadAndVowelLength } from "./get-syllable-live-or-dead-and-vowel-length";
import {
  getSyllableVowelLength,
  type VowelLength,
  VowelLengths,
} from "./get-syllable-vowel-length";

/**
 * Possible Thai tone labels
 */
export const ThaiTones = {
  Mid: "Mid",
  Low: "Low",
  Falling: "Falling",
  High: "High",
  Rising: "Rising",
};
export type ThaiTone = (typeof ThaiTones)[keyof typeof ThaiTones];

const onlyContainsThaiCharactersRegex = /^[\u0E00-\u0E7F]+$/;

const ToneMarkOptions = {
  MaiEk: "MaiEk",
  MaiTho: "MaiTho",
  MaiTri: "MaiTri",
  MaiChattawa: "MaiChattawa",
  None: "None",
} as const;
type ToneMarkOption = (typeof ToneMarkOptions)[keyof typeof ToneMarkOptions];

function getToneMark(syllable: string): ToneMarkOption {
  // ไม้เอก
  if (syllable.includes("่")) {
    return ToneMarkOptions.MaiEk;
  }

  // ไม้โท
  if (syllable.includes("้")) {
    return ToneMarkOptions.MaiTho;
  }

  if (syllable.includes("๊")) {
    return ToneMarkOptions.MaiTri;
  }

  if (syllable.includes("๋")) {
    return ToneMarkOptions.MaiChattawa;
  }

  return ToneMarkOptions.None;
}

const ThaiToneReason = {
  NoMarkLowConsonantLive: "no-mark-low-consonant-live",
  NoMarkLowConsonantDeadShort: "no-mark-low-consonant-dead-short",
  NoMarkLowConsonantDeadLong: "no-mark-low-consonant-dead-long",
  NoMarkMidConsonantLive: "no-mark-mid-consonant-live",
  NoMarkMidConsonantDead: "no-mark-mid-consonant-dead",
  NoMarkHighConsonantLive: "no-mark-high-consonant-live",
  NoMarkHighConsonantDead: "no-mark-high-consonant-dead",
  MaiEkHighConsonant: "mai-ek-high-consonant",
  MaiEkMidConsonant: "mai-ek-mid-consonant",
  MaiEkLowConsonant: "mai-ek-low-consonant",
  MaiThoHighConsonant: "mai-tho-high-consonant",
  MaiThoMidConsonant: "mai-tho-mid-consonant",
  MaiThoLowConsonant: "mai-tho-low-consonant",
  MaiTriHighConsonant: "mai-tri-high-consonant",
  MaiTriMidConsonant: "mai-tri-mid-consonant",
  MaiTriLowConsonant: "mai-tri-low-consonant",
  MaiChattawaHighConsonant: "mai-chattawa-high-consonant",
  MaiChattawaMidConsonant: "mai-chattawa-mid-consonant",
  MaiChattawaLowConsonant: "mai-chattawa-low-consonant",
} as const;
type TThaiToneReason = (typeof ThaiToneReason)[keyof typeof ThaiToneReason];

function getThaiToneInfo({
  toneMark,
  consonantClass,
  vowelLength,
  ending,
}: {
  toneMark: ToneMarkOption;
  consonantClass: ConsonantClass;
  vowelLength: VowelLength;
  ending: SyllableKind;
}): { tone: ThaiTone; reason: TThaiToneReason } {
  if (toneMark === ToneMarkOptions.None) {
    // No tone mark
    if (consonantClass === ConsonantClasses.MC) {
      if (ending === SyllableKinds.Dead) {
        return {
          tone: ThaiTones.Low,
          reason: ThaiToneReason.NoMarkMidConsonantDead,
        };
      } else {
        return {
          tone: ThaiTones.Mid,
          reason: ThaiToneReason.NoMarkMidConsonantLive,
        };
      }
    } else if (consonantClass === ConsonantClasses.HC) {
      if (ending === SyllableKinds.Dead) {
        return {
          tone: ThaiTones.Low,
          reason: ThaiToneReason.NoMarkHighConsonantDead,
        };
      } else {
        return {
          tone: ThaiTones.Rising,
          reason: ThaiToneReason.NoMarkHighConsonantLive,
        };
      }
    } else {
      // low class
      if (ending === SyllableKinds.Dead) {
        if (vowelLength === VowelLengths.Short) {
          return {
            tone: ThaiTones.High,
            reason: ThaiToneReason.NoMarkLowConsonantDeadShort,
          };
        } else {
          return {
            tone: ThaiTones.Falling,
            reason: ThaiToneReason.NoMarkLowConsonantDeadLong,
          };
        }
      } else {
        return {
          tone: ThaiTones.Mid,
          reason: ThaiToneReason.NoMarkLowConsonantLive,
        };
      }
    }
  }

  // If there's a tone mark
  if (toneMark === ToneMarkOptions.MaiEk) {
    if (consonantClass === ConsonantClasses.HC) {
      return { tone: ThaiTones.Low, reason: ThaiToneReason.MaiEkHighConsonant };
    } else if (consonantClass === ConsonantClasses.MC) {
      return { tone: ThaiTones.Low, reason: ThaiToneReason.MaiEkMidConsonant };
    } else {
      // low class
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiEkLowConsonant,
      };
    }
  }

  if (toneMark === ToneMarkOptions.MaiTho) {
    if (consonantClass === ConsonantClasses.HC) {
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiThoHighConsonant,
      };
    } else if (consonantClass === ConsonantClasses.MC) {
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiThoMidConsonant,
      };
    }
    {
      // low class
      return {
        tone: ThaiTones.High,
        reason: ThaiToneReason.MaiThoLowConsonant,
      };
    }
  }

  if (toneMark === ToneMarkOptions.MaiTri) {
    // Rare in actual usage
    if (consonantClass === ConsonantClasses.MC) {
      return {
        tone: ThaiTones.High,
        reason: ThaiToneReason.MaiTriMidConsonant,
      };
    } else if (consonantClass === ConsonantClasses.HC) {
      // often considered "falling" or rarely used
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiTriHighConsonant,
      };
    } else {
      // low class
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiTriLowConsonant,
      };
    }
  }

  if (toneMark === ToneMarkOptions.MaiChattawa) {
    if (consonantClass === ConsonantClasses.MC) {
      return {
        tone: ThaiTones.Rising,
        reason: ThaiToneReason.MaiChattawaMidConsonant,
      };
    } else if (consonantClass === ConsonantClasses.HC) {
      // rarely used
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiChattawaHighConsonant,
      };
    } else {
      // low class
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiChattawaLowConsonant,
      };
    }
  }

  // fallback
  throw new Error(`Unhandled tone mark combination`);
}

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
  const toneMark = getToneMark(syllable);

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
  const ending = getSyllableKind(syllable);
  const vowelLength = getSyllableVowelLength(syllable);

  const { tone, reason } = getThaiToneInfo({
    toneMark,
    consonantClass,
    ending,
    vowelLength,
  });

  return {
    tone,
    reason,
    toneMark,
    initialCluster,
    consonantClass,
    ending,
    vowelLength,
  };
}
