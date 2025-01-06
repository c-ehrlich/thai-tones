import { Text, View } from "react-native";
import { LearnedToggleButton } from "@/features/learn/learned-toggle-button";

export default function LearnIntermission() {
  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>Intermission</Text>
      </View>
      <LearnedToggleButton chapterId="intermission" />
    </View>
  );
}
