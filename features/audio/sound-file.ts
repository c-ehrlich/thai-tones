import { audioFiles } from "@/assets/audio/_audio-files";
import { Audio } from "expo-av";
import { speakText } from "./speak-text";

export const preloadAudioFile = async (fileName: string) => {
  const sound = new Audio.Sound();
  try {
    // fileName = "การ"; // TODO: BEFORE MERGE - don't overwrite the filename

    // @ts-expect-error we are intentionally indexing into something that might be undefined
    const file = audioFiles[fileName];

    if (!file) {
      return;
    }

    await sound.loadAsync(file);

    // we will never need the file that long
    setTimeout(() => {
      sound.unloadAsync();
    }, 30_000);
  } catch (error) {
    alert(`Error preloading sound: ${JSON.stringify(error)}`);
  }
};

export const playAudioFile = async (fileName: string) => {
  const sound = new Audio.Sound();
  try {
    // fileName = "การ"; // TODO: BEFORE MERGE - don't overwrite the filename

    // @ts-expect-error we are intentionally indexing into something that might be undefined
    const file = audioFiles[fileName];

    if (!file) {
      speakText(fileName);
      return;
    }

    await sound.loadAsync(file);
    await sound.playAsync();

    // we will never need the file that long
    setTimeout(() => {
      sound.unloadAsync();
    }, 30_000);
  } catch (error) {
    alert(`Error playing sound: ${JSON.stringify(error)}`);
  }
};
