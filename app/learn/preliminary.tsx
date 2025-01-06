import { Text, View } from "react-native";
import { LearnedToggleButton } from "@/features/learn/learned-toggle-button";

export default function LearnPreliminary() {
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>Preliminary</Text>
      </View>
      <LearnedToggleButton chapterId="preliminary" />
    </View>
  );
}
