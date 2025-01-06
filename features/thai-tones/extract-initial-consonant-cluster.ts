/**
 * Extracts the leading consonant or common consonant cluster
 * from a Thai syllable. This helps us identify the "initial".
 *
 * Note: If the syllable starts with ห + (ง, ญ, น, ม, ย, ร, ล, ว, ฬ) => treat
 *       as a cluster that might raise the tone class to high.
 */
export function extractInitialConsonantCluster(
  syllable: string
): string | null {
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
