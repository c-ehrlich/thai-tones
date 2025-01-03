import {
  getSyllableVowelLength,
  VowelLengths,
} from "./get-syllable-vowel-length";

describe("getSyllableVowelLength", () => {
  describe("basic regression tests", () => {
    it("starting consonant, long vowel", () => {
      expect(getSyllableVowelLength("กา")).toBe(VowelLengths.Long);
    });

    it("starting consonant, long vowel, live ending consonant", () => {
      expect(getSyllableVowelLength("สาน")).toBe(VowelLengths.Long);
    });

    it("starting consonant, long u vowel, tone mark", () => {
      expect(getSyllableVowelLength("ปู่")).toBe(VowelLengths.Long);
    });

    it("starting consonant, long ä vowel, tone mark", () => {
      expect(getSyllableVowelLength("แม่")).toBe(VowelLengths.Long);
    });

    it("starting consonant, long o vowel, dead ending consonant, tone mark", () => {
      expect(getSyllableVowelLength("โค้ก")).toBe(VowelLengths.Long);
    });

    it("no starting consonant, long vowel, dead ending consonant", () => {
      expect(getSyllableVowelLength("อาบ")).toBe(VowelLengths.Long);
    });

    it("starting consonant, short i vowel", () => {
      expect(getSyllableVowelLength("นิ")).toBe(VowelLengths.Short);
    });

    it("starting consonant, short a vowel", () => {
      expect(getSyllableVowelLength("จะ")).toBe(VowelLengths.Short);
    });

    it("starting consonant, long voewl, stop consonant", () => {
      expect(getSyllableVowelLength("เลศ")).toBe(VowelLengths.Long);
    });
  });

  describe("new cases", () => {
    it("should allow a short vowel length for dead syllables", () => {
      expect(getSyllableVowelLength("ปริก")).toBe(VowelLengths.Short);
      expect(getSyllableVowelLength("กัน")).toBe(VowelLengths.Short);
    });

    it("should correctly handle '`ำ'", () => {
      expect(getSyllableVowelLength("ทำ")).toBe(VowelLengths.Short);
    });
  });
});
