import { extractVowel } from "./extract-vowel";

describe("extract-vowel", () => {
  it("should handle starting cluster", () => {
    expect(extractVowel({ syllable: "หมา", startingCluster: "หม" })).toBe("-า");
    expect(
      extractVowel({
        syllable: "หมวด",
        startingCluster: "หม",
        endingConsonant: "ด",
      })
    ).toBe("-ว");
    expect(
      extractVowel({
        syllable: "หมาย",
        startingCluster: "หม",
        endingConsonant: "ย",
      })
    ).toBe("-า");
    expect(
      extractVowel({
        syllable: "หลือ",
        startingCluster: "หล",
      })
    ).toBe("-ือ");
  });

  it("should handle vowels that wrap a consonant", () => {
    expect(extractVowel({ syllable: "เกาะ", startingCluster: "ก" })).toBe(
      "เ-าะ"
    );
    expect(extractVowel({ syllable: "เสือ", startingCluster: "ส" })).toBe(
      "เ-ือ"
    );
    expect(extractVowel({ syllable: "เลีย", startingCluster: "ล" })).toBe(
      "เ-ีย"
    );
  });

  it("should handle -am", () => {
    expect(extractVowel({ syllable: "นำ", startingCluster: "น" })).toBe("-ำ");
    expect(extractVowel({ syllable: "ทำ", startingCluster: "ท" })).toBe("-ำ");
  });

  it("should handle the same starting and ending consonant", () => {
    expect(
      extractVowel({
        syllable: "กก",
        startingCluster: "ก",
        endingConsonant: "ก",
      })
    ).toBe("โ-ะ");
    expect(
      extractVowel({
        syllable: "สส",
        startingCluster: "ส",
        endingConsonant: "ส",
      })
    ).toBe("โ-ะ");
    expect(
      extractVowel({
        syllable: "ผล",
        startingCluster: "ผ",
        endingConsonant: "ล",
      })
    ).toBe("โ-ะ");
  });

  it("should handle short a", () => {
    expect(extractVowel({ syllable: "จ", startingCluster: "จ" })).toBe("-ะ");
    expect(extractVowel({ syllable: "ป", startingCluster: "ป" })).toBe("-ะ");
    expect(extractVowel({ syllable: "ถ", startingCluster: "ถ" })).toBe("-ะ");
  });

  it("should handle ua", () => {
    expect(extractVowel({ syllable: "ชั่ว", startingCluster: "ช" })).toBe(
      "-ัว"
    );
  });

  it("should handle ao", () => {
    expect(extractVowel({ syllable: "เรา", startingCluster: "ร" })).toBe("เ-า");
    expect(extractVowel({ syllable: "เก้า", startingCluster: "ก" })).toBe(
      "เ-า"
    );
  });

  // same as เออ
  it("should handle eer", () => {
    expect(
      extractVowel({
        syllable: "เกิด",
        startingCluster: "ก",
        endingConsonant: "ด",
      })
    ).toBe("เ-ิ");
  });

  it("should handle the short e", () => {
    expect(
      extractVowel({
        syllable: "เด็ก",
        startingCluster: "ด",
        endingConsonant: "ก",
      })
    ).toBe("เ-็");
  });
});
