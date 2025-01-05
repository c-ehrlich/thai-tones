import { Heading } from "@/components/ui/heading";
import { LEARN_CHAPTERS } from "@/features/learn/chapters";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function LearnIndex() {
  return (
    <View className="p-4 flex flex-col gap-2 min-h-screen-safe">
      <Heading size="xl">Chapters</Heading>
      <FlatList
        className="flex flex-col gap-2"
        data={LEARN_CHAPTERS}
        renderItem={({ item, index }) => (
          // @ts-expect-error not sure why route types are off here
          <TouchableOpacity onPress={() => router.push(`/learn/${item.id}`)}>
            <Heading size="md">
              Chapter {index + 1}: {item.name}
            </Heading>
            {item.description ? (
              <FlatList
                data={item.description}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
