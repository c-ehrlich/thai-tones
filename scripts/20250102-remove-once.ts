import syllables from "../features/practice/syllables.json";
import { unlinkSync, writeFileSync } from "fs";
import { join } from "path";

const foo: Array<{ syllable: string; freq: number }> = syllables;

const atLeastTwice = foo.filter((s) => s.freq > 1);

// write the result to a file using bun
writeFileSync("./at-least-twice.json", JSON.stringify(atLeastTwice, null, 2));

// attempt to delete the mp3 files for syllables that only appear once
const once = foo.filter((s) => s.freq === 1);
// use bun to delete the file at '../assets/audio/<syllable>.mp3'
for (const { syllable } of once) {
  try {
    unlinkSync(join(__dirname, "..", "assets", "audio", `${syllable}.mp3`));
  } catch (error) {
    console.error(`Error deleting ${syllable}.mp3: ${JSON.stringify(error)}`);
  }
}
