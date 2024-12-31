import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export function EndFormSomeSelected() {
  return (
    <View>
      <Text>Ok we will do a partial thing</Text>
      <Button
        label="Next"
        onPress={() => {
          // TODO: BEFORE MERGE - how to persist?

          router.push("/");
        }}
      />
    </View>
  );
}
