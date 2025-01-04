/**
 * Thai consonant classes
 */
export const ConsonantClasses = {
  LC: "Low",
  MC: "Middle",
  HC: "High",
} as const;
export type ConsonantClass =
  (typeof ConsonantClasses)[keyof typeof ConsonantClasses];

/**
 * Determine the consonant class (low, mid, high) for the extracted cluster.
 * Also handle special letters like ฆ, ฑ, ฒ, ธ, ฟ, ภ, ย, ร, ล, ว, ฬ, ฮ, ฅ, ฌ, ญ, ฤ, ฦ, etc.
 *
 * For leading silent "ห" cluster (e.g., "หน", "หม", "หง"),
 * we treat that as high class (the main reason for that spelling).
 */
export function getConsonantClass(
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
