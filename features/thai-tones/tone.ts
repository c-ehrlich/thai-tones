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

const onlyContainsThaiCharactersRegex = /^[\u0E00-\u0E7F]+$/;

type ThaiToneMarkInfo = {
  hasMaiEk: boolean;
  hasMaiTho: boolean;
  hasMaiTri: boolean;
  hasMaiChattawa: boolean;
};

function getToneMarkInfo(syllable: string): ThaiToneMarkInfo {
  const hasMaiEk = syllable.includes("่"); // ไม้เอก
  const hasMaiTho = syllable.includes("้"); // ไม้โท
  const hasMaiTri = syllable.includes("๊"); // ไม้ตรี
  const hasMaiChattawa = syllable.includes("๋"); // ไม้จัตวา

  return { hasMaiEk, hasMaiTho, hasMaiTri, hasMaiChattawa };
}

const ThaiToneReason = {
  NoMarkLowConsonant: "no-mark-low-consonant",
  NoMarkMidConsonantLive: "no-mark-mid-consonant-live",
  NoMarkMidConsonantDead: "no-mark-mid-consonant-dead",
  NoMarkHighConsonant: "no-mark-high-consonant",
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
  toneMarkInfo,
  consonantClass,
  isDead,
}: {
  toneMarkInfo: ThaiToneMarkInfo;
  consonantClass: "low" | "mid" | "high";
  isDead: boolean;
}): { tone: ThaiTone; reason: TThaiToneReason } {
  const { hasMaiEk, hasMaiTho, hasMaiTri, hasMaiChattawa } = toneMarkInfo;

  if (!hasMaiEk && !hasMaiTho && !hasMaiTri && !hasMaiChattawa) {
    // No tone mark
    if (consonantClass === "mid") {
      if (isDead) {
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
    } else if (consonantClass === "high") {
      return {
        tone: ThaiTones.Rising,
        reason: ThaiToneReason.NoMarkHighConsonant,
      };
    } else {
      // low class
      return { tone: ThaiTones.Mid, reason: ThaiToneReason.NoMarkLowConsonant };
    }
  }

  // If there's a tone mark
  if (hasMaiEk) {
    if (consonantClass === "high") {
      return { tone: ThaiTones.Low, reason: ThaiToneReason.MaiEkHighConsonant };
    } else if (consonantClass === "mid") {
      return { tone: ThaiTones.Low, reason: ThaiToneReason.MaiEkMidConsonant };
    } else {
      // low class
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiEkLowConsonant,
      };
    }
  }

  if (hasMaiTho) {
    if (consonantClass === "high") {
      return {
        tone: ThaiTones.Falling,
        reason: ThaiToneReason.MaiThoHighConsonant,
      };
    } else if (consonantClass === "mid") {
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

  if (hasMaiTri) {
    // Rare in actual usage
    if (consonantClass === "mid") {
      return {
        tone: ThaiTones.High,
        reason: ThaiToneReason.MaiTriMidConsonant,
      };
    } else if (consonantClass === "high") {
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

  if (hasMaiChattawa) {
    if (consonantClass === "mid") {
      return {
        tone: ThaiTones.Rising,
        reason: ThaiToneReason.MaiChattawaMidConsonant,
      };
    } else if (consonantClass === "high") {
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
  const toneMarkInfo = getToneMarkInfo(syllable);

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
  const isDead = isDeadSyllable(syllable);

  const { tone, reason } = getThaiToneInfo({
    toneMarkInfo,
    consonantClass,
    isDead,
  });

  return { tone, reason, toneMarkInfo, initialCluster, consonantClass, isDead };
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
): "low" | "mid" | "high" | null {
  // 1) If cluster starts with "ห" + second char in [งญนมยรลวฬ],
  //    treat as high class (leading-silent ห).
  if (
    cluster.length === 2 &&
    cluster.startsWith("ห") &&
    /[งญนมยรลวฬ]/.test(cluster[1])
  ) {
    return "high";
  }

  // 2) If it's a known multi-char cluster, we can pick the class from the primary consonant:
  //    Typically the first consonant or second consonant might matter. Let's do a simple approach:
  //    "ปร" => base is "ป" (mid-class?), "กร" => "ก" (mid), "ทร" => "ท" (low)...

  // Map each cluster to a class if needed:
  const clusterClassMap: Record<string, "low" | "mid" | "high"> = {
    // Examples
    กร: "mid",
    กล: "mid",
    ขร: "high",
    ขล: "high",
    คร: "low",
    คล: "low",
    ปร: "mid",
    ปล: "mid",
    พร: "low",
    ผล: "low",
    พล: "low",
    ทร: "low",
    ทว: "low",
    ตร: "low", // ต (mid or low?), but typically treated as "low" for tone
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
    return "high";
  } else if (MID_CLASS.has(consonant)) {
    return "mid";
  } else {
    return "low";
  }
}

function isDeadSyllable(thaiSyllable: string): boolean {
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
  const shortVowelSigns = new Set(["ะ", "ั", "ิ", "ึ", "ุ", "็", "๋"]);

  // 5) Check conditions
  if (stopFinals.has(finalChar)) {
    return true; // dead
  }
  if (shortVowelSigns.has(finalChar)) {
    return true; // dead (glottal stop implied)
  }

  // Everything else (nasal finals, long vowels, etc.) => live
  return false;
}
