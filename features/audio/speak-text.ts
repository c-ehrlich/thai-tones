import * as Speech from "expo-speech";

export function speakText(text: string) {
  Speech.speak(text, {
    language: "th-TH",
    pitch: 1.0,
    rate: 0.8,
  });
}
// export const speakText = (text: string) => {
//   if (!window.speechSynthesis) {
//     alert("Your browser does not support speech synthesis.");
//     return;
//   }

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "th-TH"; // might not always work well, depends on OS/browsers
//   utterance.rate = 0.8;
//   window.speechSynthesis.speak(utterance);
// };
