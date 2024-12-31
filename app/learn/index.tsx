import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { LEARN_CHAPTERS } from "./_layout";

export default function LearnIndex() {
  return (
    <View>
      <Text>Learn</Text>
      <FlatList
        data={LEARN_CHAPTERS}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/learn/${item.id}`)}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
