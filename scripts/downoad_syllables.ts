import dotenv from "dotenv";
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
  for (const [
    index,
    // audio-16khz-32kbitrate-mono-mp3
    // audio-16khz-16bit-32kbps-mono-opus
    // audio-24khz-16bit-24kbps-mono-opus
    // amr-wb-16000hz
    { text, voice, format = "amr-wb-16000hz" },
  ] of requests.entries()) {
    try {
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
      const filePath = `${outputDir}/output_${index}.mp3`;
      await Bun.write(filePath, new Uint8Array(buffer));
      console.log(`Saved: ${filePath}`);
    } catch (error) {
      console.error(`Error processing "${text}":`, error);
    }
  }
}

// Example Usage
const ttsRequests: TTSRequest[] = [
  // { text: "Hello, world!", voice: "en-US-AriaNeural" },
  // { text: "สวัสดีครับ", voice: "th-TH-AcharaNeural" },
  { text: "การ", voice: "th-TH-AcharaNeural" },
];

performBatchTTS(ttsRequests, "./output").then(() => {
  console.log("Batch TTS processing completed.");
});
