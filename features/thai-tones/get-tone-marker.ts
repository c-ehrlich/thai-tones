export const ToneMarkers = {
  MaiEk: "MaiEk",
  MaiTho: "MaiTho",
  MaiTri: "MaiTri",
  MaiChattawa: "MaiChattawa",
  None: "None",
} as const;

export type ToneMarker = (typeof ToneMarkers)[keyof typeof ToneMarkers];

export function getToneMarker(syllable: string): ToneMarker {
  if (syllable.includes("่")) {
    return ToneMarkers.MaiEk;
  }

  if (syllable.includes("้")) {
    return ToneMarkers.MaiTho;
  }

  if (syllable.includes("๊")) {
    return ToneMarkers.MaiTri;
  }

  if (syllable.includes("๋")) {
    return ToneMarkers.MaiChattawa;
  }

  return ToneMarkers.None;
}
