import { readFileSync } from "fs";

import dotenv from "dotenv";
import { audioFiles } from "@/assets/audio/_audio-files";
import { generateAudioIndex } from "./create-audio-index";
dotenv.config({ path: "../.env" });

// Load environment variables
const AZURE_API_KEY = process.env.AZURE_API_KEY!;
const AZURE_REGION = process.env.AZURE_REGION!;
const AZURE_TTS_URL = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

if (!AZURE_API_KEY || !AZURE_REGION) {
  console.error(
    "Missing Azure API Key or Region. Check your environment variables."
  );
  process.exit(1);
}

// Type for TTS request
type TTSRequest = {
  text: string;
  voice: string;
  format?: string;
};

// Perform batch TTS
async function performBatchTTS(requests: TTSRequest[], outputDir: string) {
  try {
    for (const [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      index,
      { text, voice, format = "audio-16khz-32kbitrate-mono-mp3" },
    ] of requests.entries()) {
      try {
        if (text in audioFiles) {
          console.log(`Skipping: ${text}`);
          continue;
        }

        console.log(`Processing: ${text} with voice ${voice}`);

        // Make the request to Azure TTS
        const response = await fetch(AZURE_TTS_URL, {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": format,
          },
          body: `
          <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="${voice}">${text}</voice>
          </speak>
        `,
        });

        if (!response.ok) {
          throw new Error(`Azure TTS API failed: ${response.statusText}`);
        }

        // Save the audio file
        const buffer = await response.arrayBuffer();
        const filePath = `${outputDir}/${text}.mp3`;
        await Bun.write(filePath, new Uint8Array(buffer));
        console.log(`Saved: ${filePath}`);

        // avoid rate limiting - at 10/minute it will take ~15h to generate all audio
        await new Promise((resolve) => setTimeout(resolve, 6_000));
      } catch (error) {
        console.error(`Error processing "${text}":`, error);

        throw new Error("Batch TTS processing failed.");
      }
    }
  } finally {
    generateAudioIndex();
  }
}

const data = readFileSync("./syllables.txt", "utf-8");
const lines = data.split(/\r?\n/);

// Example Usage
const ttsRequests: TTSRequest[] = lines.map((line) => ({
  text: line,
  voice: "th-TH-AcharaNeural",
}));

// [
//   // { text: "Hello, world!", voice: "en-US-AriaNeural" },
//   // { text: "สวัสดีครับ", voice: "th-TH-AcharaNeural" },
//   { text: "การ", voice: "th-TH-AcharaNeural" },
// ];

void performBatchTTS(ttsRequests, "../assets/audio").then(() => {
  console.log("Batch TTS processing completed.");
});
