import { type ConsonantClass, ConsonantClasses } from "./get-consonant-class";
import { type SyllableKind, SyllableKinds } from "./get-syllable-kind";
import { type ToneMarker, ToneMarkers } from "./get-tone-marker";
import { type VowelLength, VowelLengths } from "./vowels";

// TODO: use these...
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

export const ThaiTones = {
  Mid: "Mid",
  Low: "Low",
  Falling: "Falling",
  High: "High",
  Rising: "Rising",
};

export type ThaiTone = (typeof ThaiTones)[keyof typeof ThaiTones];

export function getThaiToneInfo({
  toneMarker,
  consonantClass,
  vowelLength,
  syllableKind,
}: {
  toneMarker: ToneMarker;
  consonantClass: ConsonantClass;
  vowelLength: VowelLength;
  syllableKind: SyllableKind;
}): { tone: ThaiTone; reason: TThaiToneReason } {
  if (toneMarker === ToneMarkers.None) {
    // No tone mark
    if (consonantClass === ConsonantClasses.MC) {
      if (syllableKind === SyllableKinds.Dead) {
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
      if (syllableKind === SyllableKinds.Dead) {
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
      if (syllableKind === SyllableKinds.Dead) {
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
  if (toneMarker === ToneMarkers.MaiEk) {
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

  if (toneMarker === ToneMarkers.MaiTho) {
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

  if (toneMarker === ToneMarkers.MaiTri) {
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

  if (toneMarker === ToneMarkers.MaiChattawa) {
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
