import { analyzeThaiSyllable, ThaiTones } from "./tone";

describe("analyzeThaiSyllable", () => {
  describe("tone", () => {
    describe("basics", () => {
      it(`"กราบ" - cluster "กร" => mid (?), no mark, ends in บ => dead => low tone`, () => {
        expect(analyzeThaiSyllable("กราบ").tone).toBe(ThaiTones.Low);
      });

      it(`"ขลาด" - cluster "ขล" => high, dead => rising`, () => {
        expect(analyzeThaiSyllable("ขลาด").tone).toBe(ThaiTones.Low);
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

    // http://www.thai-language.com/ref/tone-calculator
    describe("Tone Calculator", () => {
      // no tone marker, dead syllable
      it("low initial consonant, dead syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("มาก").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ภาค").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("มีด").tone).toBe(ThaiTones.Falling);
      });
      it("mid initial consonant, dead syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("กวาด").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("กวาด").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("กวาด").tone).toBe(ThaiTones.Low);
      });
      it("high initial consonant, dead syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("เผาะ").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("แฉะ").tone).toBe(ThaiTones.Low);
      });

      // no tone marker, live syllable
      it("low initial consonant, live syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("มา").tone).toBe(ThaiTones.Mid);
        expect(analyzeThaiSyllable("ชาน").tone).toBe(ThaiTones.Mid);
        expect(analyzeThaiSyllable("งู").tone).toBe(ThaiTones.Mid);
      });
      it("mid initial consonant, live syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("เดิม").tone).toBe(ThaiTones.Mid);
        expect(analyzeThaiSyllable("เตียง").tone).toBe(ThaiTones.Mid);
        expect(analyzeThaiSyllable("ปืน").tone).toBe(ThaiTones.Mid);
      });
      it("high initial consonant, live syllable, no tone marker", () => {
        expect(analyzeThaiSyllable("หา").tone).toBe(ThaiTones.Rising);
        expect(analyzeThaiSyllable("ผี").tone).toBe(ThaiTones.Rising);
        expect(analyzeThaiSyllable("หน").tone).toBe(ThaiTones.Rising);
      });

      // low tone marker, dead syllable
      it("low initial consonant, dead syllable, low tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, dead syllable, low tone marker", () => {
        expect(analyzeThaiSyllable("ปึ่ก").tone).toBe(ThaiTones.Low);
      });
      it("high initial consonant, dead syllable, low tone marker", () => {
        expect(analyzeThaiSyllable("ส่าย").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("ถ่าน").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("สิ่ง").tone).toBe(ThaiTones.Low);
      });

      // low tone marker, live syllable
      it("low initial consonant, live syllable, low tone marker", () => {
        expect(analyzeThaiSyllable("ช่าง").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ว่าย").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("นี่").tone).toBe(ThaiTones.Falling);
      });
      it("mid initial consonant, live syllable, low tone marker", () => {
        expect(analyzeThaiSyllable("กล่อง").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("ดื่ม").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("อ่อน").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("อิ่ม").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("กริ่ง").tone).toBe(ThaiTones.Low);
      });
      it("high initial consonant, live syllable, low tone marker", () => {
        expect(analyzeThaiSyllable("ส่าย").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("ถ่าน").tone).toBe(ThaiTones.Low);
        expect(analyzeThaiSyllable("สิ่ง").tone).toBe(ThaiTones.Low);
      });

      // falling tone marker, dead syllable
      it("low initial consonant, dead syllable, falling tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, dead syllable, falling tone marker", () => {
        expect(analyzeThaiSyllable("จั้ก").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("อึ้บ").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("กรี้ด").tone).toBe(ThaiTones.Falling);
      });
      it("high initial consonant, dead syllable, falling tone marker", () => {
        // never occurs
      });

      // falling tone marker, live syllable
      it("low initial consonant, live syllable, falling tone marker", () => {
        expect(analyzeThaiSyllable("ลิ้น").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("ช้า").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("ร้าน").tone).toBe(ThaiTones.High);
      });
      it("mid initial consonant, live syllable, falling tone marker", () => {
        expect(analyzeThaiSyllable("โป้ปด").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("เก้า").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ใกล้").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ได้").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("จิ้ม").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("กุ้ง").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ตั้ง").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ตื้น").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ด้วน").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("กล้อง").tone).toBe(ThaiTones.Falling);
      });
      it("high initial consonant, live syllable, falling tone marker", () => {
        expect(analyzeThaiSyllable("ห้าม").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("ข้าว").tone).toBe(ThaiTones.Falling);
        expect(analyzeThaiSyllable("เส้น").tone).toBe(ThaiTones.Falling);
      });

      // high tone marker, dead syllable
      it("low initial consonant, dead syllable, high tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, dead syllable, high tone marker", () => {
        expect(analyzeThaiSyllable("ก๊อก").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("จี๊ป").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("แจ๊ส").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("ตุ๊ก").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("จั๊ก").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("จี๊").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("กั๊ก").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("อิ๊ว").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("กุ๊ย").tone).toBe(ThaiTones.High);
      });
      it("high initial consonant, dead syllable, high tone marker", () => {
        // never occurs
      });

      // high tone marker, live syllable
      it("low initial consonant, live syllable, high tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, live syllable, high tone marker", () => {
        expect(analyzeThaiSyllable("แบ๊งค์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("เอี๊ยม์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("ก๊วน์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("ปั๊ม์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("โป๊์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("จี๊์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("อิ๊ว์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("กุ๊ย์").tone).toBe(ThaiTones.High);
        expect(analyzeThaiSyllable("เก๊า์").tone).toBe(ThaiTones.High);
      });
      it("high initial consonant, live syllable, high tone marker", () => {
        // never occurs
      });

      // rising tone marker, dead syllable
      it("low initial consonant, dead syllable, rising tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, dead syllable, rising tone marker", () => {
        expect(analyzeThaiSyllable("โก๋").tone).toBe(ThaiTones.Rising);
        expect(analyzeThaiSyllable("ตี๋๋").tone).toBe(ThaiTones.Rising);
      });
      it("high initial consonant, dead syllable, rising tone marker", () => {
        // never occurs
      });

      // rising tone marker, live syllable
      it("low initial consonant, live syllable, rising tone marker", () => {
        // never occurs
      });
      it("mid initial consonant, live syllable, rising tone marker", () => {
        // doesn't seem to ever occur?
      });
      it("high initial consonant, live syllable, rising tone marker", () => {
        // never occurs
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
