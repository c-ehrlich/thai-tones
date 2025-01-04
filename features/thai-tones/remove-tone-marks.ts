// Tone marks: ่ (0xe48), ้ (0xe49), ๊ (0xe4a), ๋ (0xe4b), ์ (0xe4c), ฺ (0xe4d), ๎ (0xe4e)
const toneMarkRegex = /[\u0E48-\u0E4E]/g;
const toneMarkRegexExcept0xe4c = /[\u0E48-\u0E4B\u0E4D-\u0E4E]/g;

export function removeToneMarks(syllable: string, preserveSilentMark = false) {
  const regex = preserveSilentMark ? toneMarkRegexExcept0xe4c : toneMarkRegex;
  return syllable.replace(regex, "");
}
