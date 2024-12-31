import { bannedSyllables } from "../practice/pick-syllable";

/**
 * Possible Thai tone labels
 */
export type ThaiTone = "mid" | "low" | "falling" | "high" | "rising";

/**
 * Determine the tone of a single Thai syllable using
 * standard Thai tone rules, *plus* some handling of:
 *   - Leading silent "ห" that raises low-class consonants
 *   - Common consonant clusters
 *   - Special letters
 *
 * Returns a ThaiTone or undefined if we cannot classify.
 */
export function getThaiTone(syllable: string): ThaiTone | undefined {
  if (!syllable) return undefined;

  if (bannedSyllables.has(syllable)) {
    throw new Error(`Banned syllable: ${syllable}`);
  }

  // 1. Identify tone marks
  const hasMaiEk = syllable.includes("่"); // ไม้เอก
  const hasMaiTho = syllable.includes("้"); // ไม้โท
  const hasMaiTri = syllable.includes("๊"); // ไม้ตรี
  const hasMaiChattawa = syllable.includes("๋"); // ไม้จัตวา

  // 2. Extract the "initial consonant or cluster" and figure out its class
  const initialCluster = extractLeadingCluster(syllable);
  if (!initialCluster) {
    return undefined; // can't identify
  }

  const consonantClass = getConsonantClass(initialCluster, syllable);
  if (!consonantClass) {
    return undefined;
  }

  // 3. Check if the syllable is "dead" or "live"
  const isDead = isDeadEnding(syllable);

  // 4. Apply standard tone rules
  //    (summarized reference in the previous code)
  if (!hasMaiEk && !hasMaiTho && !hasMaiTri && !hasMaiChattawa) {
    // No tone mark
    if (consonantClass === "mid") {
      return isDead ? "low" : "mid";
    } else if (consonantClass === "high") {
      return "rising";
    } else {
      // low class
      return "mid";
    }
  }

  // If there's a tone mark
  if (hasMaiEk) {
    if (consonantClass === "mid" || consonantClass === "high") {
      return "low";
    } else {
      // low class
      return "falling";
    }
  }

  if (hasMaiTho) {
    if (consonantClass === "mid" || consonantClass === "high") {
      return "falling";
    } else {
      // low class
      return "high";
    }
  }

  if (hasMaiTri) {
    // Rare in actual usage
    if (consonantClass === "mid") {
      return "high";
    } else if (consonantClass === "high") {
      // often considered "falling" or rarely used
      return "falling";
    } else {
      // low class
      return "falling";
    }
  }

  if (hasMaiChattawa) {
    if (consonantClass === "mid") {
      return "rising";
    } else if (consonantClass === "high") {
      // rarely used
      return "falling";
    } else {
      // low class
      return "falling";
    }
  }

  // fallback
  return undefined;
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
  if (cleaned.length >= 2 && cleaned[0] === "ห") {
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
  fullSyllable: string
): "low" | "mid" | "high" | null {
  // 1) If cluster starts with "ห" + second char in [งญนมยรลวฬ],
  //    treat as high class (leading-silent ห).
  if (
    cluster.length === 2 &&
    cluster[0] === "ห" &&
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

/**
 * Check if a syllable ends in a "dead" or "live" fashion.
 * This is simplified. Real Thai can be more complex.
 */
function isDeadEnding(syllable: string): boolean {
  // Remove tone marks
  const cleaned = syllable.replace(/[่้๊๋]/g, "");

  // Final character
  const finalChar = cleaned[cleaned.length - 1] || "";
  // Some typical "dead" final consonants (stop finals):
  // (g/k), (d/t), (b/p), etc.
  const deadFinals = new Set([
    "ก",
    "ด",
    "บ",
    "ค",
    "ต",
    "ป",
    "ฏ",
    "ฑ",
    "สะ",
    "จ",
    "ข",
    "ช",
    "ทร",
    "ษ",
    "ส",
  ]);
  // If finalChar is in these => treat as dead
  if (deadFinals.has(finalChar)) {
    return true;
  }

  // Short vowel endings => often dead
  const deadVowelEndings = new Set(["ะ", "ั", "็", "ิ", "ุ", "ึ", "ํ"]);
  if (deadVowelEndings.has(finalChar)) {
    return true;
  }

  // Otherwise treat as live
  return false;
}
