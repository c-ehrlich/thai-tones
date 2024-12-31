import { getThaiTone } from "./tone";

describe("getThaiTone", () => {
  describe("basics", () => {
    it(`"กราบ" - cluster "กร" => mid (?), no mark, ends in บ => dead => low tone`, () => {
      expect(getThaiTone("กราบ")).toBe("low");
    });

    it(`"ขลาด" - cluster "ขล" => high, no mark => rising`, () => {
      expect(getThaiTone("ขลาด")).toBe("rising");
    });

    it(`"หมา" - leading ห + ม => high class => no mark => rising`, () => {
      expect(getThaiTone("หมา")).toBe("rising");
    });

    it(`"หม่า" - leading ห + ม => high class, live syllable, ไม้เอก => low`, () => {
      expect(getThaiTone("หม่า")).toBe("low");
    });

    it(`"กระ" - cluster "กร" => mid, ends in ะ => dead => low`, () => {
      expect(getThaiTone("กระ")).toBe("low");
    });

    it(`"ปรา" - cluster "ปร" => mid, ends in า => live => mid`, () => {
      expect(getThaiTone("ปรา")).toBe("mid");
    });

    it(`"คำ" - single consonant ค (low), live syllable, no tone marker => mid`, () => {
      expect(getThaiTone("คำ")).toBe("mid");
    });

    it(`"ฆ่า" - single consonant ฆ (low), live syllable, ไม้โท => falling`, () => {
      expect(getThaiTone("ฆ่า")).toBe("falling");
    });

    it(`"จิ๋ว" - mid class จ + ไม้จัตวา => rising`, () => {
      expect(getThaiTone("จิ๋ว")).toBe("rising");
    });

    it(`"หมู" - ห + ม => high class => no mark => rising`, () => {
      expect(getThaiTone("หมู")).toBe("rising");
    });

    it(`"หรู" - ห + ร => high class => no mark => rising`, () => {
      expect(getThaiTone("หรู")).toBe("rising");
    });

    it(`"ไหว้", // tricky real word => "ไหฺว้" (leading ห + ว => high class + ไม้โท => falling)`, () => {
      expect(getThaiTone("ไหว้")).toBe("falling");
    });
  });

  describe("edge cases", () => {
    it("handles ภรร - high class consonant, live syllable (อรร => อัน) => mid", () => {
      expect(getThaiTone("ภรร")).toBe("mid");
    });
  });

  describe("non syllables", () => {
    it("should throw on empty input", () => {
      expect(() => getThaiTone("")).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => getThaiTone(undefined)).toThrow();
    });

    it("should throw on a banned syllable", () => {
      expect(() => getThaiTone("วชน")).toThrow();
    });

    it("should throw if there is non thai in the syllable", () => {
      expect(() => getThaiTone("hello")).toThrow();
    });
  });
});
