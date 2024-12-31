import { Button } from "@/components/button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export function EndFormNoneSelected({
  setKnownVowels,
  setKnownConsonants,
}: {
  setKnownVowels: (v: "none") => void;
  setKnownConsonants: (c: "none") => void;
}) {
  return (
    <View>
      <Text>Ok we shall learn together</Text>
      <Button
        label="Next"
        onPress={() => {
          setKnownConsonants("none");
          setKnownVowels("none");

          // TODO: BEFORE MERGE - how to persist?

          router.push("/");
        }}
      />
    </View>
  );
}
