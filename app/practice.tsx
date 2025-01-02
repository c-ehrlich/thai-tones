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
import { useAxiom } from "@/features/logging/axiom";

function App() {
  const [state, dispatch] = useReducer(StateMachineReducer, getInitialState());
  const axiom = useAxiom();

  if (state.uiState.status === "init") {
    return (
      <Button label="Get Syllable" onPress={() => dispatch({ type: "get" })} />
    );
  }

  if (state.uiState.status === "quiz") {
    return (
      <View className="flex flex-col">
        <CurrentSyllable syllable={state.uiState.currentSyllable} />
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
        <CurrentSyllable syllable={state.uiState.currentSyllable} />
        <Text>tone: {getThaiTone(state.uiState.currentSyllable)}</Text>
        <Button
          label="Replay audio"
          onPress={() => {
            if (!state.uiState.currentSyllable) {
              throw new Error("no current syllable");
            }
            playAudioFile(state.uiState.currentSyllable);
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
        <Button
          label="Not a syllable"
          onPress={() =>
            axiom.log({
              type: "syllable_issue",
              event: {
                syllable: state.uiState.currentSyllable! ?? null,
                issue: "not-a-syllable",
              },
            })
          }
        />
        <Button
          label="Incorrect audio or explanation"
          onPress={() =>
            axiom.log({
              type: "syllable_issue",
              event: {
                syllable: state.uiState.currentSyllable! ?? null,
                issue: "incorrect-audio-or-explanation",
              },
            })
          }
        />
      </View>
    );
  }

  return <p>Unknown UI State</p>;
}

function CurrentSyllable({ syllable }: { syllable: string }) {
  return <Text style={{ fontSize: 48 }}>{syllable}</Text>;
}

export default App;
