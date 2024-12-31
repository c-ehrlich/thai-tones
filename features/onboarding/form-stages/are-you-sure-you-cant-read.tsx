import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function AreYouSureYouCantRead({
  handleSelectCantRead,
  handleSelectCanReadABit,
}: {
  handleSelectCantRead: () => void;
  handleSelectCanReadABit: () => void;
}) {
  return (
    <View>
      <Text>Are you sure you cant read</Text>
      <Button label="Yea I cant read" onPress={handleSelectCantRead} />
      <Button label="I can read a bit" onPress={handleSelectCanReadABit} />
    </View>
  );
}
