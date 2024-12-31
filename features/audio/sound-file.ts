import { Audio } from "expo-av";

export const preloadAudioFile = async (fileName: string) => {
  const sound = new Audio.Sound();
  try {
    const file = require(`../../assets/audio/output_0_mp3.mp3`);
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
    const file = require(`../../assets/audio/output_0_mp3.mp3`);
    console.log("file", file);
    await sound.loadAsync(file);
    await sound.playAsync();

    // we will never need the file that long
    setTimeout(() => {
      sound.unloadAsync();
    }, 30_000);
  } catch (error) {
    alert(`Error preloading sound: ${JSON.stringify(error)}`);
  }
};
