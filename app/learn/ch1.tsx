import { Text, View } from "react-native";
import { LearnedToggleButton } from "@/features/learn/learned-toggle-button";

export default function LearnCh1() {
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>Chapter 1</Text>
      </View>
      <LearnedToggleButton chapterId="ch1" />
    </View>
  );
}
