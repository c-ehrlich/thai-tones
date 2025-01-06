import { useEffect, useMemo, useReducer, useState } from "react";
import {
  getInitialState,
  StateMachineReducer,
} from "@/features/practice/state-machine";
import { analyzeThaiSyllable } from "@/features/thai-tones/analyze-thai-syllable";
import { Pressable, Text, View } from "react-native";
import { Button } from "@/components/button";
import { playAudioFile } from "@/features/audio/sound-file";
import { ReportSyllableIssue } from "@/features/practice/report-syllable-issue";
import {
  type Font,
  useSettingsStore,
} from "@/features/settings/settings-store";
import { FontAwesome } from "@expo/vector-icons";

function usePracticeFont(currentSyllable?: string) {
  const [localFont, setLocalFont] = useState<Font | undefined>(undefined);
  const globalFont = useSettingsStore((state) => state.font);
  const showFontToggle = useSettingsStore((state) => state.showFontToggle);

  const toggleFont = () => {
    setLocalFont(
      (localFont ?? globalFont) === "modern" ? "traditional" : "modern"
    );
  };

  useEffect(() => {
    setLocalFont(undefined);
  }, [currentSyllable]);

  return {
    font: localFont ?? globalFont,
    showFontToggle,
    toggleFont,
  };
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <View className="h-full w-full pb-safe">{children}</View>;
}

function App() {
  const [state, dispatch] = useReducer(StateMachineReducer, getInitialState());

  const { font, showFontToggle, toggleFont } = usePracticeFont(
    state.uiState.currentSyllable
  );

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
          {showFontToggle ? <FontToggle onToggle={toggleFont} /> : null}
          <View className="w-full flex flex-col">
            <Pressable
              className="w-full items-center pb-2"
              onPress={() => {
                if (!state.uiState.currentSyllable) {
                  throw new Error("no current syllable");
                }
                console.log("syllable: ", state.uiState.currentSyllable);
                void playAudioFile(state.uiState.currentSyllable);
              }}
            >
              <CurrentSyllable
                syllable={state.uiState.currentSyllable}
                overrideFont={font}
              />
            </Pressable>

            <View className="w-full px-4">
              <View className="bg-gray-100 rounded-lg py-2 px-4 mb-6">
                <Text className="text-center text-2xl">
                  Tone: <Text className="font-bold">{analyzed?.tone}</Text>
                </Text>
              </View>

              <View className="flex-row justify-between gap-2">
                <ExplanationSection
                  sectionName="Initial"
                  letters={analyzed?.initialCluster ?? "-"}
                  bottomStart={analyzed?.initialCluster ? "Class:" : undefined}
                  bottomMain={analyzed?.consonantClass ?? "unknown"}
                  font={font}
                />

                <ExplanationSection
                  sectionName="Vowel"
                  letters={analyzed?.vowel ?? "-"}
                  bottomStart="Length:"
                  bottomMain={analyzed?.vowelLength ?? "unknown"}
                  font={font}
                />

                <ExplanationSection
                  sectionName="Final"
                  letters={analyzed?.endingConsonant ?? "-"}
                  bottomStart={analyzed?.endingConsonant ? "Kind:" : undefined}
                  bottomMain={analyzed?.syllableKind ?? "unknown"}
                  font={font}
                />
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

function CurrentSyllable({
  syllable,
  overrideFont,
}: {
  syllable: string;
  overrideFont?: "traditional" | "modern";
}) {
  const font = useSettingsStore((state) => state.font);
  const fontFamily = (overrideFont ?? font) === "modern" ? "Kanit" : undefined;

  return (
    <View className="w-full min-h-40 items-center">
      <Text style={{ fontFamily }} className="text-[72px] pt-6 pb-2">
        {syllable}
      </Text>
    </View>
  );
}

function ExplanationSection({
  sectionName,
  letters,
  bottomStart,
  bottomMain,
  font,
}: {
  sectionName: string;
  letters?: string;
  bottomStart?: string;
  bottomMain: string;
  font?: Font;
}) {
  const globalFont = useSettingsStore((state) => state.font);
  const fontFamily = (font ?? globalFont) === "modern" ? "Kanit" : undefined;

  return (
    <View className="flex-1 bg-gray-100 p-4 rounded-lg">
      <Text className="text-center mb-2 text-gray-600">{sectionName}</Text>
      <Text style={{ fontFamily }} className="text-center text-4xl py-1">
        {letters ?? "-"}
      </Text>
      <Text className="text-center text-xs text-gray-600 mt-1">
        {bottomStart ? <Text>{bottomStart} </Text> : null}
        <Text className="text-black font-bold">{bottomMain}</Text>
      </Text>
    </View>
  );
}

function FontToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <Pressable
      onPress={() => {
        onToggle();
      }}
      className="absolute z-10 top-2 left-2 p-2 bg-gray-100 rounded-lg"
    >
      {/* TODO: dont use hex color lol */}
      <FontAwesome name="font" size={36} color="#ccc" />
    </Pressable>
  );
}

export default App;
