import { analyzeThaiSyllable, ThaiTones } from "./tone";

describe("analyzeThaiSyllable", () => {
  describe("tone", () => {
    describe("basics", () => {
      it(`"กราบ" - cluster "กร" => mid (?), no mark, ends in บ => dead => low tone`, () => {
        expect(analyzeThaiSyllable("กราบ").tone).toBe(ThaiTones.Low);
      });

      it(`"ขลาด" - cluster "ขล" => high, no mark => rising`, () => {
        expect(analyzeThaiSyllable("ขลาด").tone).toBe(ThaiTones.Rising);
      });

      it(`"หมา" - leading ห + ม => high class => no mark => rising`, () => {
        expect(analyzeThaiSyllable("หมา").tone).toBe(ThaiTones.Rising);
      });

      it(`"หม่า" - leading ห + ม => high class, live syllable, ไม้เอก => low`, () => {
        expect(analyzeThaiSyllable("หม่า").tone).toBe(ThaiTones.Low);
      });

      it(`"กระ" - cluster "กร" => mid, ends in ะ => dead => low`, () => {
        expect(analyzeThaiSyllable("กระ").tone).toBe(ThaiTones.Low);
      });

      it(`"ปรา" - cluster "ปร" => mid, ends in า => live => mid`, () => {
        expect(analyzeThaiSyllable("ปรา").tone).toBe(ThaiTones.Mid);
      });

      it(`"คำ" - single consonant ค (low), live syllable, no tone marker => mid`, () => {
        expect(analyzeThaiSyllable("คำ").tone).toBe(ThaiTones.Mid);
      });

      it(`"ฆ่า" - single consonant ฆ (low), live syllable, ไม้โท => falling`, () => {
        expect(analyzeThaiSyllable("ฆ่า").tone).toBe(ThaiTones.Falling);
      });

      it(`"จิ๋ว" - mid class จ + ไม้จัตวา => rising`, () => {
        expect(analyzeThaiSyllable("จิ๋ว").tone).toBe(ThaiTones.Rising);
      });

      it(`"หมู" - ห + ม => high class => no mark => rising`, () => {
        expect(analyzeThaiSyllable("หมู").tone).toBe(ThaiTones.Rising);
      });

      it(`"หรู" - ห + ร => high class => no mark => rising`, () => {
        expect(analyzeThaiSyllable("หรู").tone).toBe(ThaiTones.Rising);
      });

      it(`"ไหว้", // tricky real word => "ไหฺว้" (leading ห + ว => high class + ไม้โท => falling)`, () => {
        expect(analyzeThaiSyllable("ไหว้").tone).toBe(ThaiTones.Falling);
      });
    });

    describe("edge cases", () => {
      it("handles ภรร - high class consonant, live syllable (อรร => อัน) => mid", () => {
        expect(analyzeThaiSyllable("ภรร").tone).toBe(ThaiTones.Mid);
      });
    });

    describe("non syllables", () => {
      it("should throw on empty input", () => {
        expect(() => analyzeThaiSyllable("")).toThrow();
        // @ts-expect-error - testing invalid input
        expect(() => analyzeThaiSyllable(undefined)).toThrow();
      });

      it("should throw on a banned syllable", () => {
        expect(() => analyzeThaiSyllable("วชน")).toThrow();
      });

      it("should throw if there is non thai in the syllable", () => {
        expect(() => analyzeThaiSyllable("hello")).toThrow();
      });
    });
  });
});
