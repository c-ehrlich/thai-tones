import { Button } from "@/components/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex flex-col items-center">
      <View className="h-full flex flex-col items-center justify-between">
        <View className="w-full flex-1 flex items-center justify-center">
          <Heading size="5xl">Thai Tones</Heading>
          <Heading size="3xl">🇹🇭🐔</Heading>
        </View>
        <View className="pb-24 flex flex-col items-center">
          <Link href="/learn">
            <Button label="Learn" />
          </Link>
          <Link href="/practice">
            <Button label="Practice" />
          </Link>
          <Link href="/settings">
            <Button label="Settings" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
