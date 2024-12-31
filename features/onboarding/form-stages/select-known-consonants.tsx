import { Button } from "@/components/button";
import { Text, View } from "react-native";

export function SelectKnownConsonants({
  setKnownConsonants,
  handleNextStep,
}: {
  // TODO: BEFORE MERGE - this needs to take the form data
  setKnownConsonants: (consonants: "some") => void;
  handleNextStep: () => void;
}) {
  const onPress = () => {
    setKnownConsonants("some");
    handleNextStep();
  };

  return (
    <View>
      <Text>Select known consonants</Text>
      <Button label="Next" onPress={onPress} />
    </View>
  );
}
