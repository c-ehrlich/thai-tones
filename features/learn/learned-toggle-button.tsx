import { Button } from "@/components/button";
import { useLearnedChaptersStore } from "./learned-chapters-store";
import { View } from "react-native";

interface LearnedToggleButtonProps {
  chapterId: string;
}

export function LearnedToggleButton({ chapterId }: LearnedToggleButtonProps) {
  const isLearned = useLearnedChaptersStore((state) =>
    state.isChapterLearned(chapterId)
  );
  const setChapterLearned = useLearnedChaptersStore(
    (state) => state.setChapterLearned
  );

  return (
    <View className="p-4">
      <Button
        label={isLearned ? "Mark as Not Learned" : "Mark as Learned"}
        onPress={() => setChapterLearned(chapterId, !isLearned)}
      />
    </View>
  );
}
