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

  test("simple short vowels", () => {
    expect(getSyllableVowelLength("จะ")).toBe(VowelLengths.Short); // จ + ะ
    expect(getSyllableVowelLength("ปะ")).toBe(VowelLengths.Short); // ป + ะ
    expect(getSyllableVowelLength("ถะ")).toBe(VowelLengths.Short); // ถ + ะ (rare, but possible)
    expect(getSyllableVowelLength("ปั")).toBe(VowelLengths.Short); // ป + ั
    expect(getSyllableVowelLength("มิด")).toBe(VowelLengths.Short); // Contains 'ิ'
  });

  test("simple long vowels", () => {
    expect(getSyllableVowelLength("กา")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("หมู")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("โบ")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("ไข")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("ใส")).toBe(VowelLengths.Long);
  });

  test("mixed/composite short vowels", () => {
    // 1) ำ series
    expect(getSyllableVowelLength("ทำ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("ขำ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("นำ")).toBe(VowelLengths.Short);

    // 2) เงาะ => เง + อะ = short
    expect(getSyllableVowelLength("เงาะ")).toBe(VowelLengths.Short);

    // 3) เอะ/แอะ
    expect(getSyllableVowelLength("เตะ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("แอะ")).toBe(VowelLengths.Short);

    // 4) เออะ/เอือะ
    expect(getSyllableVowelLength("เถอะ")).toBe(VowelLengths.Short);
    // Rarely used, but let's test:
    expect(getSyllableVowelLength("เฟือะ")).toBe(VowelLengths.Short);

    // 5) ฤ, ฦ
    expect(getSyllableVowelLength("ฤ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("ฦ")).toBe(VowelLengths.Short);
  });

  test("mixed/composite long vowels", () => {
    // 1) เอีย, เอือ
    expect(getSyllableVowelLength("เสีย")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("เอือ")).toBe(VowelLengths.Long);

    // 2) ไ, ใ, โ, แ followed by no short sign => typically long
    expect(getSyllableVowelLength("ไป")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("ใส")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("โละ")).toBe(VowelLengths.Short); // counter-check below
    expect(getSyllableVowelLength("โต")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("แม")).toBe(VowelLengths.Long);

    // 3) ฤา, ฦา
    expect(getSyllableVowelLength("ฤา")).toBe(VowelLengths.Long);
    expect(getSyllableVowelLength("ฦา")).toBe(VowelLengths.Long);
  });

  test("edge cases to confirm sorting logic", () => {
    // 'โละ' spelled with โ + ะ => that means short (like "lo" + a short stop)
    expect(getSyllableVowelLength("โละ")).toBe(VowelLengths.Short);

    // 'เออะ' => short
    expect(getSyllableVowelLength("เออะ")).toBe(VowelLengths.Short);
  });

  test("long vowels, shortened", () => {
    expect(getSyllableVowelLength("เพียะ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("เดียะ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("เบือะ")).toBe(VowelLengths.Short);
    expect(getSyllableVowelLength("อือะ")).toBe(VowelLengths.Short);
  });
});
