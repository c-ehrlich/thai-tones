import { useMemo, useReducer } from "react";
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

  const analyzed = useMemo(() => {
    if (!state.uiState.currentSyllable) {
      return undefined;
    }

    return analyzeThaiSyllable(state.uiState.currentSyllable);
  }, [state.uiState.currentSyllable]);

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
          <View className="w-full flex flex-col">
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
              <Text>Replay audio</Text>
            </Pressable>

            <View className="w-full px-4">
              <Text className="text-center mb-4">tone: {analyzed?.tone}</Text>

              <View className="flex-row justify-between gap-2">
                <View className="flex-1 bg-gray-100 p-4 rounded-lg">
                  <Text className="font-bold text-center mb-2">Initial</Text>
                  <Text className="text-center">
                    {analyzed?.initialCluster}
                  </Text>
                  <Text className="text-center text-xs text-gray-600 mt-1">
                    {analyzed?.initialCluster
                      ? "Class: " + (analyzed?.consonantClass ?? "unknown")
                      : "None"}
                  </Text>
                </View>

                <View className="flex-1 bg-gray-100 p-4 rounded-lg">
                  <Text className="font-bold text-center mb-2">Vowel</Text>
                  <Text className="text-center">{analyzed?.vowel}</Text>
                  <Text className="text-center text-xs text-gray-600 mt-1">
                    Length: {analyzed?.vowelLength}
                  </Text>
                </View>

                <View className="flex-1 bg-gray-100 p-4 rounded-lg">
                  <Text className="font-bold text-center mb-2">Final</Text>
                  <Text className="text-center">
                    {analyzed?.endingConsonant ?? "-"}
                  </Text>
                  <Text className="text-center text-xs text-gray-600 mt-1">
                    {analyzed?.endingConsonant
                      ? "Kind: " + (analyzed?.syllableKind ?? "unknown")
                      : "None"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

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
