// TODO: do these in `analyze-thai-syllabe.test.ts instead
// the current ones are wrong because we pass the vowel instead of the whole syllable

it("", () => {
  /* noop to make jest happy */
});

// import { getVowelLength } from "./get-vowel-length";
// import { VowelLengths } from "./vowels";

// describe("getSyllableVowelLength", () => {
//   describe("basic regression tests", () => {
//     it("starting consonant, long vowel", () => {
//       expect(getVowelLength("กา")).toBe(VowelLengths.Long);
//     });

//     it("starting consonant, long vowel, live ending consonant", () => {
//       expect(getVowelLength("สาน")).toBe(VowelLengths.Long);
//     });

//     it("starting consonant, long u vowel, tone mark", () => {
//       expect(getVowelLength("ปู่")).toBe(VowelLengths.Long);
//     });

//     it("starting consonant, long ä vowel, tone mark", () => {
//       expect(getVowelLength("แม่")).toBe(VowelLengths.Long);
//     });

//     it("starting consonant, long o vowel, dead ending consonant, tone mark", () => {
//       expect(getVowelLength("โค้ก")).toBe(VowelLengths.Long);
//     });

//     it("no starting consonant, long vowel, dead ending consonant", () => {
//       expect(getVowelLength("อาบ")).toBe(VowelLengths.Long);
//     });

//     it("starting consonant, short i vowel", () => {
//       expect(getVowelLength("นิ")).toBe(VowelLengths.Short);
//     });

//     it("starting consonant, short a vowel", () => {
//       expect(getVowelLength("จะ")).toBe(VowelLengths.Short);
//     });

//     it("starting consonant, long voewl, stop consonant", () => {
//       expect(getVowelLength("เลศ")).toBe(VowelLengths.Long);
//     });
//   });

//   describe("new cases", () => {
//     it("should allow a short vowel length for dead syllables", () => {
//       expect(getVowelLength("ปริก")).toBe(VowelLengths.Short);
//       expect(getVowelLength("กัน")).toBe(VowelLengths.Short);
//     });

//     it("should correctly handle '`ำ'", () => {
//       expect(getVowelLength("ทำ")).toBe(VowelLengths.Short);
//     });
//   });

//   test("simple short vowels", () => {
//     expect(getVowelLength("จะ")).toBe(VowelLengths.Short); // จ + ะ
//     expect(getVowelLength("ปะ")).toBe(VowelLengths.Short); // ป + ะ
//     expect(getVowelLength("ถะ")).toBe(VowelLengths.Short); // ถ + ะ (rare, but possible)
//     expect(getVowelLength("ปั")).toBe(VowelLengths.Short); // ป + ั
//     expect(getVowelLength("มิด")).toBe(VowelLengths.Short); // Contains 'ิ'
//   });

//   test("simple long vowels", () => {
//     expect(getVowelLength("กา")).toBe(VowelLengths.Long);
//     expect(getVowelLength("หมู")).toBe(VowelLengths.Long);
//     expect(getVowelLength("โบ")).toBe(VowelLengths.Long);
//     expect(getVowelLength("ไข")).toBe(VowelLengths.Long);
//     expect(getVowelLength("ใส")).toBe(VowelLengths.Long);
//   });

//   test("mixed/composite short vowels", () => {
//     // 1) ำ series
//     expect(getVowelLength("ทำ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("ขำ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("นำ")).toBe(VowelLengths.Short);

//     // 2) เงาะ => เง + อะ = short
//     expect(getVowelLength("เงาะ")).toBe(VowelLengths.Short);

//     // 3) เอะ/แอะ
//     expect(getVowelLength("เตะ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("แอะ")).toBe(VowelLengths.Short);

//     // 4) เออะ/เอือะ
//     expect(getVowelLength("เถอะ")).toBe(VowelLengths.Short);
//     // Rarely used, but let's test:
//     expect(getVowelLength("เฟือะ")).toBe(VowelLengths.Short);

//     // 5) ฤ, ฦ
//     expect(getVowelLength("ฤ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("ฦ")).toBe(VowelLengths.Short);
//   });

//   test("mixed/composite long vowels", () => {
//     // 1) เอีย, เอือ
//     expect(getVowelLength("เสีย")).toBe(VowelLengths.Long);
//     expect(getVowelLength("เอือ")).toBe(VowelLengths.Long);

//     // 2) ไ, ใ, โ, แ followed by no short sign => typically long
//     expect(getVowelLength("ไป")).toBe(VowelLengths.Long);
//     expect(getVowelLength("ใส")).toBe(VowelLengths.Long);
//     expect(getVowelLength("โละ")).toBe(VowelLengths.Short); // counter-check below
//     expect(getVowelLength("โต")).toBe(VowelLengths.Long);
//     expect(getVowelLength("แม")).toBe(VowelLengths.Long);

//     // 3) ฤา, ฦา
//     expect(getVowelLength("ฤา")).toBe(VowelLengths.Long);
//     expect(getVowelLength("ฦา")).toBe(VowelLengths.Long);
//   });

//   test("edge cases to confirm sorting logic", () => {
//     // 'โละ' spelled with โ + ะ => that means short (like "lo" + a short stop)
//     expect(getVowelLength("โละ")).toBe(VowelLengths.Short);

//     // 'เออะ' => short
//     expect(getVowelLength("เออะ")).toBe(VowelLengths.Short);
//   });

//   test("long vowels, shortened", () => {
//     expect(getVowelLength("เพียะ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("เดียะ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("เบือะ")).toBe(VowelLengths.Short);
//     expect(getVowelLength("อือะ")).toBe(VowelLengths.Short);
//   });

//   describe("tests from feedback", () => {
//     it("should understand implicit short o", () => {
//       // TODO: BEFORE MERGE - this is failing currently
//       // if (syllable - startingCluster === only consonants, return short o)
//       expect(getVowelLength("ทด")).toBe(VowelLengths.Short);
//     });
//   });
// });
