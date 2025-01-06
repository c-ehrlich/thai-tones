import { removeStartingClusterAndVowel } from "./remove-starting-cluster-and-vowel";

describe("removeStartingClusterAndVowel", () => {
  it("should handle starting cluster", () => {
    expect(
      removeStartingClusterAndVowel({ syllable: "หมา", startingCluster: "หม" })
    ).toBe("");
    expect(
      removeStartingClusterAndVowel({ syllable: "หมาม", startingCluster: "หม" })
    ).toBe("ม");
    // expect(removeStartingClusterAndVowel("หมวด")).toBe("ว");
    // expect(removeStartingClusterAndVowel("หมาย")).toBe("า");
    // expect(removeStartingClusterAndVowel("หลือ")).toBe("ือ");
  });

  it("should handle vowels that wrap a consonant", () => {
    expect(
      removeStartingClusterAndVowel({ syllable: "เกาะ", startingCluster: "ก" })
    ).toBe("");
    expect(
      removeStartingClusterAndVowel({ syllable: "เสือม", startingCluster: "ส" })
    ).toBe("ม");
    expect(
      removeStartingClusterAndVowel({ syllable: "เลีย", startingCluster: "ล" })
    ).toBe("");
  });

  it("should handle -am", () => {
    expect(
      removeStartingClusterAndVowel({ syllable: "นำ", startingCluster: "น" })
    ).toBe("");
    expect(
      removeStartingClusterAndVowel({ syllable: "ทำ", startingCluster: "ท" })
    ).toBe("");
  });

  it("should handle the same starting and ending consonant", () => {
    expect(
      removeStartingClusterAndVowel({ syllable: "กก", startingCluster: "ก" })
    ).toBe("ก");
    expect(
      removeStartingClusterAndVowel({ syllable: "สส", startingCluster: "ส" })
    ).toBe("ส");
    expect(
      removeStartingClusterAndVowel({ syllable: "กส", startingCluster: "ก" })
    ).toBe("ส");
  });

  describe("tests for every vowel", () => {
    it("อะ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อะ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กระ",
          startingCluster: "กร",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กรัช",
          startingCluster: "กร",
        })
      ).toBe("ช");
      // 🐉 invisible "ะ"
      expect(
        removeStartingClusterAndVowel({
          syllable: "ก",
          startingCluster: "ก",
        })
      ).toBe("");
    });

    it("อา", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อา",
          startingCluster: "อ",
        })
      );
      expect(
        removeStartingClusterAndVowel({
          syllable: "ขวา",
          startingCluster: "ขว",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ขวาน",
          startingCluster: "ขว",
        })
      ).toBe("น");
    });

    it("อิ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อิ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ศิ",
          startingCluster: "ศ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ศิลป์",
          startingCluster: "ศ",
        })
      ).toBe("ลป์");
    });

    it("อี", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อี",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กรี",
          startingCluster: "กร",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กรีน",
          startingCluster: "กร",
        })
      ).toBe("น");
    });

    it("อือ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อือ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ครือ",
          startingCluster: "คร",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "มื่น",
          startingCluster: "ม",
        })
      ).toBe("น");
    });

    it("อุ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อุ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ขุ",
          startingCluster: "ข",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ศุก",
          startingCluster: "ศ",
        })
      ).toBe("ก");
    });

    it("อู", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "อู",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ปรู",
          startingCluster: "ปร",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ลูบ",
          startingCluster: "ล",
        })
      ).toBe("บ");
    });

    it("เอะ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "เอะ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "เกะ",
          startingCluster: "ก",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "เด็ก",
          startingCluster: "ด",
        })
      ).toBe("ก");
    });

    it("เอ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "เอ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "เค",
          startingCluster: "ค",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "เพลง",
          startingCluster: "พล",
        })
      ).toBe("ง");
    });

    it("แอะ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "แอะ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "แกะ",
          startingCluster: "ก",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "แอ็ป",
          startingCluster: "อ",
        })
      ).toBe("ป");
    });

    it("แอ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "แอ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "แคร",
          startingCluster: "คร",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "แก่น",
          startingCluster: "ก",
        })
      ).toBe("น");
    });

    it("โอะ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "โอะ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "โกะ",
          startingCluster: "ก",
        })
      ).toBe("");
      // 🐉 invisible short o
      expect(
        removeStartingClusterAndVowel({
          syllable: "กบ",
          startingCluster: "ก",
        })
      ).toBe("บ");
    });

    it("โอ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "โอ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "โค",
          startingCluster: "ค",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "โลก",
          startingCluster: "ล",
        })
      ).toBe("ก");
    });

    it("เอาะ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "เอาะ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "เคาะ",
          startingCluster: "ค",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "ศอก",
          startingCluster: "ศ",
        })
      ).toBe("ก");
    });

    it("ออ", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "ออ",
          startingCluster: "อ",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กอ",
          startingCluster: "ก",
        })
      ).toBe("");
      expect(
        removeStartingClusterAndVowel({
          syllable: "กอน",
          startingCluster: "ก",
        })
      ).toBe("น");
    });

    describe("เออะ", () => {
      it("should handle เออะ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เออะ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เกอะ",
            startingCluster: "ก",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เดอก",
            startingCluster: "ด",
          })
        ).toBe("ก");
      });

      it("เออ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เออ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เคอ",
            startingCluster: "ค",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เพอง",
            startingCluster: "พ",
          })
        ).toBe("ง");
      });

      it("ไอ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "ไอ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "ไม้",
            startingCluster: "ม",
          })
        ).toBe("");
      });

      it("ใอ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "ใอ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "ใคร",
            startingCluster: "คร",
          })
        ).toBe("");
      });

      it("เอา", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เอา",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขา",
            startingCluster: "ข",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขาม",
            startingCluster: "ข",
          })
        ).toBe("ม");
      });

      it("เอียะ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เอียะ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เกียะ",
            startingCluster: "ก",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เกียก",
            startingCluster: "ก",
          })
        ).toBe("ก");
      });

      it("เอีย", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เอีย",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขีย",
            startingCluster: "ข",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขียว",
            startingCluster: "ข",
          })
        ).toBe("ว");
      });

      it("เอือะ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เอือะ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขือะ",
            startingCluster: "ข",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขือก",
            startingCluster: "ข",
          })
        ).toBe("ก");
      });

      it("เอือ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "เอือ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขือ",
            startingCluster: "ข",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "เขือน",
            startingCluster: "ข",
          })
        ).toBe("น");
      });

      it("อัวะ", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "อัวะ",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "กัวะ",
            startingCluster: "ก",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "กัวก",
            startingCluster: "ก",
          })
        ).toBe("ก");
      });

      it("อัว", () => {
        expect(
          removeStartingClusterAndVowel({
            syllable: "อัว",
            startingCluster: "อ",
          })
        ).toBe("");
        expect(
          removeStartingClusterAndVowel({
            syllable: "กัว",
            startingCluster: "ก",
          })
        ).toBe("");
        // 🐉 this is technically incorrect but we still want to check for it
        expect(
          removeStartingClusterAndVowel({
            syllable: "กัวน",
            startingCluster: "ก",
          })
        ).toBe("น");
        // 🐉 -ัว actually turns into -ว- when there is an ending consonant
        expect(
          removeStartingClusterAndVowel({
            syllable: "กวก",
            startingCluster: "ก",
          })
        ).toBe("ก");
      });
    });
  });

  describe("tests from bug reports", () => {
    it("should correctly parse 'แถว'", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "แถว",
          startingCluster: "ถ",
        })
      ).toBe("");
    });

    it("should correctly parse 'เปิด'", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "เปิด",
          startingCluster: "ป",
        })
      ).toBe("ด");
    });

    it("should correctly handle 'ทด'", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "ทด",
          startingCluster: "ท",
        })
      ).toBe("ด");
    });

    it("should correctly handle 'จารย'", () => {
      expect(
        removeStartingClusterAndVowel({
          syllable: "จารย",
          startingCluster: "จ",
        })
      ).toBe("รย");
    });
  });
});
