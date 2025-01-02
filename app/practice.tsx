import { useReducer } from "react";
import {
  getInitialState,
  StateMachineReducer,
} from "@/features/practice/state-machine";
import { getThaiTone } from "@/features/thai-tones/tone";
import { Text, View } from "react-native";
import { Button } from "@/components/button";
import { playAudioFile } from "@/features/audio/sound-file";
import { useAxiom } from "@/features/logging/axiom";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <View className="h-full w-full pb-12">{children}</View>;
}

function App() {
  const [state, dispatch] = useReducer(StateMachineReducer, getInitialState());
  const axiom = useAxiom();

  if (state.uiState.status === "init") {
    return (
      <Wrapper>
        <View className="w-full h-full items-center justify-between">
          <View />
          <Button
            label="Get Syllable"
            onPress={() => dispatch({ type: "get" })}
          />
        </View>
      </Wrapper>
    );
  }

  if (state.uiState.status === "quiz") {
    return (
      <Wrapper>
        <View className="w-full h-full flex flex-col justify-between items-center">
          <CurrentSyllable syllable={state.uiState.currentSyllable} />
          <Button
            label="Show answer"
            onPress={() => dispatch({ type: "show-answer" })}
          />
        </View>
      </Wrapper>
    );
  }

  if (state.uiState.status === "answer") {
    return (
      <Wrapper>
        <View className="w-full h-full items-center justify-between">
          <View className="items-center">
            <CurrentSyllable syllable={state.uiState.currentSyllable} />
            <Text>tone: {getThaiTone(state.uiState.currentSyllable)}</Text>
          </View>

          <View>
            <Button
              label="Replay audio"
              onPress={() => {
                if (!state.uiState.currentSyllable) {
                  throw new Error("no current syllable");
                }
                console.log("syllable: ", state.uiState.currentSyllable);
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
        </View>
      </Wrapper>
    );
  }

  return <p>Unknown UI State</p>;
}

function CurrentSyllable({ syllable }: { syllable: string }) {
  return (
    <View className="w-full items-center">
      <Text className="text-5xl pt-2">{syllable}</Text>
    </View>
  );
}

export default App;
