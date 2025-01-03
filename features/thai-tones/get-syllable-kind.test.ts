import { getSyllableKind, SyllableKinds } from "./get-syllable-kind";

describe("getSyllableKind", () => {
  describe("basic regression tests", () => {
    it("starting consonant, long vowel", () => {
      expect(getSyllableKind("กา")).toBe(SyllableKinds.Live);
    });

    it("starting consonant, long vowel, live ending consonant", () => {
      expect(getSyllableKind("สาน")).toBe(SyllableKinds.Live);
    });

    it("starting consonant, long u vowel, tone mark", () => {
      expect(getSyllableKind("ปู่")).toBe(SyllableKinds.Live);
    });

    it("starting consonant, long ä vowel, tone mark", () => {
      expect(getSyllableKind("แม่")).toBe(SyllableKinds.Live);
    });

    it("starting consonant, long o vowel, dead ending consonant, tone mark", () => {
      expect(getSyllableKind("โค้ก")).toBe(SyllableKinds.Dead);
    });

    it("no starting consonant, long vowel, dead ending consonant", () => {
      expect(getSyllableKind("อาบ")).toBe(SyllableKinds.Dead);
    });

    it("starting consonant, short i vowel", () => {
      expect(getSyllableKind("นิ")).toBe(SyllableKinds.Dead);
    });

    it("starting consonant, short a vowel", () => {
      expect(getSyllableKind("จะ")).toBe(SyllableKinds.Dead);
    });

    it("starting consonant, long voewl, stop consonant", () => {
      expect(getSyllableKind("เลศ")).toBe(SyllableKinds.Dead);
    });
  });

  describe("new cases", () => {
    it("handles just rue/lue", () => {
      expect(getSyllableKind("ฤ")).toBe(SyllableKinds.Dead);
      expect(getSyllableKind("ฦ")).toBe(SyllableKinds.Dead);

      expect(getSyllableKind("ฤๅ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("ฦๅ")).toBe(SyllableKinds.Live);
    });

    it("handles -am", () => {
      expect(getSyllableKind("นำ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("ทำ")).toBe(SyllableKinds.Live);
    });

    it("handles a vowel that's only 'on the left', with only a starting consonant", () => {
      expect(getSyllableKind("เพ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("แพ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("โพ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("ใพ")).toBe(SyllableKinds.Live);
      expect(getSyllableKind("ไพ")).toBe(SyllableKinds.Live);
    });
  });
});
