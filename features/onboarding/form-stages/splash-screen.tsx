import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function SplashScreen({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) {
  return (
    <View>
      <Text>สวัสดี</Text>
      <Text>Splash Screen</Text>
      <Button label="Begin" onPress={handleNextStep} />
    </View>
  );
}
