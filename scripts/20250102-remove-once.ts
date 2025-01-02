import syllables from "../features/practice/syllables.json";

const foo: Array<{ syllable: string; freq: number }> = syllables;

const atLeastTwice = foo.filter((s) => s.freq > 1);

// write the result to a file using bun
import { writeFileSync } from "fs";
writeFileSync("./at-least-twice.json", JSON.stringify(atLeastTwice, null, 2));
