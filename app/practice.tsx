import { useReducer } from "react";
import {
  getInitialState,
  StateMachineReducer,
} from "@/features/practice/state-machine";
import { getThaiTone } from "@/features/thai-tones/tone";
import { speakText } from "@/features/audio/speak-text";
import { Text, View } from "react-native";
import { Button } from "@/components/button";
import { playAudioFile } from "@/features/audio/sound-file";

function App() {
  const [state, dispatch] = useReducer(StateMachineReducer, getInitialState());

  if (state.uiState.status === "init") {
    return (
      <Button label="Get Syllable" onPress={() => dispatch({ type: "get" })} />
    );
  }

  if (state.uiState.status === "quiz") {
    return (
      <View className="flex flex-col">
        <Text>Current Syllable: {state.uiState.currentSyllable}</Text>
        <Button
          label="Show answer"
          onPress={() => dispatch({ type: "show-answer" })}
        ></Button>
      </View>
    );
  }

  if (state.uiState.status === "answer") {
    return (
      <View className="flex flex-col">
        <Text>Current Syllable: {state.uiState.currentSyllable}</Text>
        <Text>tone: {getThaiTone(state.uiState.currentSyllable)}</Text>
        <Button
          label="Replay audio"
          onPress={() => {
            if (!state.uiState.currentSyllable) {
              throw new Error("no current syllable");
            }
            playAudioFile("output_0_mp3.mp3");
            // speakText(state.uiState.currentSyllable);
          }}
        />
        <Button
          label="Solve right"
          onPress={() => dispatch({ type: "solve-right" })}
        />
        <Button
          label="Solve wrong"
          onPress={() => dispatch({ type: "solve-wrong" })}
        />
      </View>
    );
  }

  return <p>Unknown UI State</p>;
}

export default App;
