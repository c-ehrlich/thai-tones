import { extractInitialConsonantCluster } from "./extract-initial-consonant-cluster";

describe("extractLeadingCluster", () => {
  it("should work in the case of an implicit short-o vowel", () => {
    expect(extractInitialConsonantCluster("ทด")).toBe("ท");
  });
});
