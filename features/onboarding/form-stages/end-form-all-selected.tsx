import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export function EndFormAllSelected({
  setKnownVowels,
  setKnownConsonants,
}: {
  setKnownVowels: (v: "all") => void;
  setKnownConsonants: (c: "all") => void;
}) {
  return (
    <View>
      <Text>Noice u know all the letters already so lets just practice</Text>
      <Button
        label="Next"
        onPress={() => {
          setKnownConsonants("all");
          setKnownVowels("all");

          // TODO: BEFORE MERGE - how to persist?

          router.push("/");
        }}
      />
    </View>
  );
}
