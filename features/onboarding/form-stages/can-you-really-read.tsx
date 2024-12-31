import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function CanYouReallyRead({
  handleYes,
  handleNo,
}: {
  handleYes: () => void;
  handleNo: () => void;
}) {
  return (
    <View>
      <Text>Can you really read?</Text>
      <Button label="Yes" onPress={handleYes} />
      <Button label="No" onPress={handleNo} />
    </View>
  );
}
