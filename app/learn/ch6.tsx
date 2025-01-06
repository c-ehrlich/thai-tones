import { Text, View } from "react-native";
import { LearnedToggleButton } from "@/features/learn/learned-toggle-button";

export default function LearnCh6() {
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>Chapter 6</Text>
      </View>
      <LearnedToggleButton chapterId="ch6" />
    </View>
  );
}
