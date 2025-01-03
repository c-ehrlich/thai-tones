import { bannedSyllables } from "../practice/pick-syllable";

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

/**
 * Thai consonant classes
 */
export const ConsonantClasses = {
  LC: "LC",
  MC: "MC",
  HC: "HC",
} as const;
export type ConsonantClass =
  (typeof ConsonantClasses)[keyof typeof ConsonantClasses];

/**
 * Syllable kinds
 */
export const SyllableKinds = {
  Live: "live",
  Dead: "dead",
} as const;
export type SyllableKind = (typeof SyllableKinds)[keyof typeof SyllableKinds];

/**
 * Vowel Lengths
 */
export const VowelLengths = {
  Short: "short",
  Long: "long",
} as const;
export type VowelLength = (typeof VowelLengths)[keyof typeof VowelLengths];

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
  const { ending, vowelLength } = getVowelInfo(syllable);

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

/**
 * Extracts the leading consonant or common consonant cluster
 * from a Thai syllable. This helps us identify the "initial".
 *
 * Note: If the syllable starts with ห + (ง, ญ, น, ม, ย, ร, ล, ว, ฬ) => treat
 *       as a cluster that might raise the tone class to high.
 */
function extractLeadingCluster(syllable: string): string | null {
  // Remove tone marks to avoid confusion
  const cleaned = syllable.replace(/[่้๊๋]/g, "");

  // 1) Handle the special "leading ห" case:
  //    If we see ห followed by certain low-class letters (ง, ญ, น, ม, ย, ร, ล, ว, ฬ),
  //    that is usually spelled to create a high tone environment.
  if (cleaned.length >= 2 && cleaned.startsWith("ห")) {
    const secondChar = cleaned[1];
    // Some typical low class that can be raised:
    // (ง, ญ, น, ม, ย, ร, ล, ว, ฬ)
    if (/[งญนมยรลวฬ]/.test(secondChar)) {
      // treat the cluster as "ห + next consonant"
      // (Some treat as just "ห" for class detection, but let's return "หX" to handle
      // it in getConsonantClass if needed.)
      return cleaned.slice(0, 2);
    }
  }

  // 2) Check if the first 2 or 3 chars form a known cluster
  //    For simplicity, define some typical clusters:
  const possibleClusters = [
    "กร",
    "กล",
    "ขร",
    "ขล",
    "คร",
    "คล",
    "ปร",
    "ปล",
    "พร",
    "ผล",
    "พล",
    "ทร",
    "ทว",
    "ตร",
    "กล",
    "คล",
    "ศร",
    "สร", // rarely used
    // etc. Expand if needed
  ];

  // check up to first 3 chars
  for (let length = 3; length >= 2; length--) {
    if (cleaned.length >= length) {
      const clusterCandidate = cleaned.slice(0, length);
      if (possibleClusters.includes(clusterCandidate)) {
        return clusterCandidate;
      }
    }
  }

  // 3) Otherwise, just return the first Thai consonant we see
  for (const char of cleaned) {
    if (/[ก-ฮ]/.test(char)) {
      return char;
    }
  }

  return null;
}

/**
 * Determine the consonant class (low, mid, high) for the extracted cluster.
 * Also handle special letters like ฆ, ฑ, ฒ, ธ, ฟ, ภ, ย, ร, ล, ว, ฬ, ฮ, ฅ, ฌ, ญ, ฤ, ฦ, etc.
 *
 * For leading silent "ห" cluster (e.g., "หน", "หม", "หง"),
 * we treat that as high class (the main reason for that spelling).
 */
function getConsonantClass(
  cluster: string,
  _fullSyllable: string
): ConsonantClass | null {
  // 1) If cluster starts with "ห" + second char in [งญนมยรลวฬ],
  //    treat as high class (leading-silent ห).
  if (
    cluster.length === 2 &&
    cluster.startsWith("ห") &&
    /[งญนมยรลวฬ]/.test(cluster[1])
  ) {
    return ConsonantClasses.HC;
  }

  // 2) If it's a known multi-char cluster, we can pick the class from the primary consonant:
  //    Typically the first consonant or second consonant might matter. Let's do a simple approach:
  //    "ปร" => base is "ป" (mid-class?), "กร" => "ก" (mid), "ทร" => "ท" (low)...

  // Map each cluster to a class if needed:
  const clusterClassMap: Record<string, ConsonantClass> = {
    // Examples
    กร: ConsonantClasses.MC,
    กล: ConsonantClasses.MC,
    ขร: ConsonantClasses.HC,
    ขล: ConsonantClasses.HC,
    คร: ConsonantClasses.LC,
    คล: ConsonantClasses.LC,
    ปร: ConsonantClasses.MC,
    ปล: ConsonantClasses.MC,
    พร: ConsonantClasses.LC,
    ผล: ConsonantClasses.LC,
    พล: ConsonantClasses.LC,
    ทร: ConsonantClasses.LC,
    ทว: ConsonantClasses.LC,
    ตร: ConsonantClasses.LC, // ต (mid or low?), but typically treated as "low" for tone
    // etc.
  };
  if (clusterClassMap[cluster]) {
    return clusterClassMap[cluster];
  }

  // 3) Otherwise, we treat cluster as a single consonant.
  //    Identify the first consonant char:
  const consonant = cluster[0];

  // High class
  const HIGH_CLASS = new Set([
    "ข",
    "ฃ",
    "ฉ",
    "ฐ",
    "ถ",
    "ผ",
    "ฝ",
    "ศ",
    "ษ",
    "ส",
    "ห",
  ]);
  // Mid class
  const MID_CLASS = new Set(["ก", "จ", "ฎ", "ฏ", "ด", "ต", "บ", "ป", "อ"]);
  // Low class is everything else:
  // (ฆ, ฑ, ฒ, ธ, ฟ, ภ, พ, ฮ, ง, ย, ร, ล, ว, ฬ, ฌ, ญ, ฅ, ฐ (?), etc.)

  if (HIGH_CLASS.has(consonant)) {
    return ConsonantClasses.HC;
  } else if (MID_CLASS.has(consonant)) {
    return ConsonantClasses.MC;
  } else {
    return ConsonantClasses.LC;
  }
}

function getVowelInfo(thaiSyllable: string): {
  ending: SyllableKind;
  vowelLength: VowelLength;
} {
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
    // ^ "ศ", "ษ", "ส" can function as a final /t/ in some words
  ]);

  // 4) Define short vowel endings => also "dead"
  // (For many short vowels, the finalChar might be the vowel sign.)
  const shortVowelSigns = new Set(
    ["ะ", " ั ", " ิ", " ึ", " ุ", " ็", " ๋"].map((v) => v.trim())
  );

  // 5) Check conditions
  if (shortVowelSigns.has(finalChar)) {
    return { ending: SyllableKinds.Dead, vowelLength: VowelLengths.Short }; // dead (glottal stop implied)
  }

  if (stopFinals.has(finalChar)) {
    return { ending: SyllableKinds.Dead, vowelLength: VowelLengths.Long }; // dead
  }

  // Everything else (nasal finals, long vowels, etc.) => live
  return { ending: SyllableKinds.Live, vowelLength: VowelLengths.Long };
}
