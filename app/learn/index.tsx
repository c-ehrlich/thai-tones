import { Heading } from "@/components/ui/heading";
import { LEARN_CHAPTERS } from "@/features/learn/chapters";
import { router } from "expo-router";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function LearnIndex() {
  return (
    <SafeAreaView>
      <FlatList
        className="p-4"
        data={LEARN_CHAPTERS}
        renderItem={({ item }) => (
          // @ts-expect-error not sure why route types are off here
          <TouchableOpacity onPress={() => router.push(`/learn/${item.id}`)}>
            <Heading size="md">{item.name}</Heading>
            {item.description ? (
              <FlatList
                data={item.description}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            ) : null}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
