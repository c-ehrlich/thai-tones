import { Text, View } from "react-native";
import { LearnedToggleButton } from "@/features/learn/learned-toggle-button";

export default function LearnCh3() {
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>Chapter 3</Text>
      </View>
      <LearnedToggleButton chapterId="ch3" />
    </View>
  );
}
