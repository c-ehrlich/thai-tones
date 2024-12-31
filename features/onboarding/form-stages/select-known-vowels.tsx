import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function SelectKnownVowels({
  setKnownVowels,
  handleNextStep,
}: {
  // TODO: BEFORE MERGE - this needs to take the form data
  setKnownVowels: (vowels: "some") => void;
  handleNextStep: () => void;
}) {
  const onPress = () => {
    setKnownVowels("some");
    handleNextStep();
  };

  return (
    <View>
      <Text>Select known vowels</Text>
      <Button label="Next" onPress={onPress} />
    </View>
  );
}
