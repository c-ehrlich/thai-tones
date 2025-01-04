import { useReducer } from "react";
import {
  getInitialState,
  StateMachineReducer,
} from "@/features/practice/state-machine";
import { analyzeThaiSyllable } from "@/features/thai-tones/analyze-thai-syllable";
import { Pressable, Text, View } from "react-native";
import { Button } from "@/components/button";
import { playAudioFile } from "@/features/audio/sound-file";
import { ReportSyllableIssue } from "@/features/practice/report-syllable-issue";
import { useSettingsStore } from "@/features/settings/settings-store";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <View className="h-full w-full pb-safe">{children}</View>;
}

function App() {
  const [state, dispatch] = useReducer(StateMachineReducer, getInitialState());

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
        <View className="w-full h-full items-center justify-between relative">
          <Pressable
            className="w-full items-center pb-4"
            onPress={() => {
              if (!state.uiState.currentSyllable) {
                throw new Error("no current syllable");
              }
              console.log("syllable: ", state.uiState.currentSyllable);
              void playAudioFile(state.uiState.currentSyllable);
            }}
          >
            <CurrentSyllable syllable={state.uiState.currentSyllable} />
            <Text>
              tone: {analyzeThaiSyllable(state.uiState.currentSyllable).tone}
            </Text>
            <Text>Replay audio</Text>
            <Text className="font-mono">
              {JSON.stringify(
                analyzeThaiSyllable(state.uiState.currentSyllable)
              )}
            </Text>
            <Text>Starting consonant/cluster</Text>
            <Text>Vowel</Text>
            <Text>Ending consonant/cluster</Text>
          </Pressable>

          <View className="absolute top-2 right-2">
            <ReportSyllableIssue syllable={state.uiState.currentSyllable} />
          </View>

          <View className="flex flex-row w-full bg-yellow-100 gap-2">
            <Pressable
              className="bg-red-500 flex-1 h-20 items-center justify-center"
              onPress={() => dispatch({ type: "solve-wrong" })}
            >
              <Text>Solve wrong</Text>
            </Pressable>
            <Pressable
              className="bg-green-500 flex-1 h-20 items-center justify-center"
              onPress={() => dispatch({ type: "solve-right" })}
            >
              <Text>Solve right</Text>
            </Pressable>
          </View>
        </View>
      </Wrapper>
    );
  }

  return <p>Unknown UI State</p>;
}

function CurrentSyllable({ syllable }: { syllable: string }) {
  const font = useSettingsStore((state) => state.font);
  const fontFamily = font === "modern" ? "Kanit" : undefined;

  return (
    <View className="w-full items-center">
      <Text style={{ fontFamily }} className="text-5xl pt-8 pb-2">
        {syllable}
      </Text>
    </View>
  );
}

export default App;
