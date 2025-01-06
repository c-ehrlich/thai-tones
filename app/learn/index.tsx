import { Heading } from "@/components/ui/heading";
import { LEARN_CHAPTERS } from "@/features/learn/chapters";
import { useLearnedChaptersStore } from "@/features/learn/learned-chapters-store";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ChapterStatusIcon({ chapterId }: { chapterId: string }) {
  const isLearned = useLearnedChaptersStore((state) =>
    state.isChapterLearned(chapterId)
  );

  return (
    <View className="pt-1">
      <FontAwesome
        name={isLearned ? "check-square-o" : "square-o"}
        size={20}
        color={isLearned ? "#22c55e" : "#666666"}
      />
    </View>
  );
}

export default function LearnIndex() {
  return (
    <SafeAreaView>
      <FlatList
        className="p-4"
        contentContainerClassName="flex flex-col gap-3"
        data={LEARN_CHAPTERS}
        renderItem={({ item }) => (
          // @ts-expect-error not sure why route types are off here
          <TouchableOpacity onPress={() => router.push(`/learn/${item.id}`)}>
            <View className="flex flex-row gap-2 items-start">
              <ChapterStatusIcon chapterId={item.id} />
              <View>
                <Heading size="md">{item.name}</Heading>
                {item.description ? (
                  <FlatList
                    data={item.description}
                    renderItem={({ item }) => <Text>{item}</Text>}
                  />
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
