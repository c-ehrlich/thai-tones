import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function CanYouRead({
  handleYes,
  handleNo,
}: {
  handleYes: () => void;
  handleNo: () => void;
}) {
  return (
    <View>
      <Text>Other than tones, do you already know how to read Thai?</Text>
      <Button label="Yes" onPress={handleYes} />
      <Button label="No" onPress={handleNo} />
    </View>
  );
}
