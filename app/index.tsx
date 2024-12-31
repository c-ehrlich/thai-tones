import { Button } from "@/components/button";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
      <Text>Index</Text>
      <Button label="Learn" onPress={() => router.push("/learn")} />
    </SafeAreaView>
  );
}
