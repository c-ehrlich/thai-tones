import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";
import { CircleIcon } from "@gluestack-ui/themed";
import { useSettingsStore } from "@/features/settings/settings-store";
import { Button, ButtonText } from "@/components/ui/button";
import { useStateMachineStore } from "@/features/practice/state-machine";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";

export default function SettingsPage() {
  const theme = useSettingsStore((state) => state.theme);
  const font = useSettingsStore((state) => state.font);
  const _showFontToggle = useSettingsStore((state) => state.showFontToggle);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setFont = useSettingsStore((state) => state.setFont);
  const _setShowFontToggle = useSettingsStore(
    (state) => state.setShowFontToggle
  );
  const resetSrs = useStateMachineStore((state) => state.resetSrs);
  const srsItems = useStateMachineStore((state) => state.srsItems);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showFontToggle = _showFontToggle ? "true" : "false";
  const setShowFontToggle = (show: "true" | "false") =>
    _setShowFontToggle(show === "true" ? true : false);

  return (
    <View className="p-4">
      <VStack space="md">
        <RadioGroup value={theme} onChange={setTheme}>
          <Text>Theme</Text>
          <VStack space="sm">
            <Radio value="system">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>System</RadioLabel>
            </Radio>
            <Radio value="light">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Light</RadioLabel>
            </Radio>
            <Radio value="dark">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Dark</RadioLabel>
            </Radio>
          </VStack>
        </RadioGroup>
        <RadioGroup value={font} onChange={setFont}>
          <Text>Font</Text>
          <VStack space="sm">
            <Radio value="traditional">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Traditional</RadioLabel>
              <Text className="ml-2 text-2xl">สวัสดี</Text>
            </Radio>
            <Radio value="modern">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Modern</RadioLabel>
              <Text style={{ fontFamily: "Kanit" }} className="ml-2 text-2xl">
                สวัสดี
              </Text>
            </Radio>
          </VStack>
        </RadioGroup>
        <RadioGroup value={showFontToggle} onChange={setShowFontToggle}>
          <Text>Show font toggle during practice</Text>
          <VStack space="sm">
            <Radio value="true">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Yes</RadioLabel>
            </Radio>
            <Radio value="false">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>No</RadioLabel>
            </Radio>
          </VStack>
        </RadioGroup>
        <Button
          variant="solid"
          action="negative"
          onPress={() => setShowConfirmModal(true)}
        >
          <Text>Reset SRS ({srsItems.length} reviews scheduled)</Text>
        </Button>
      </VStack>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>Reset SRS Progress?</Heading>
          </ModalHeader>
          <ModalBody>
            <Text>
              This will delete all {srsItems.length} scheduled reviews. This
              action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onPress={() => setShowConfirmModal(false)}
              className="mr-2"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="negative"
              variant="solid"
              onPress={() => {
                resetSrs();
                setShowConfirmModal(false);
              }}
            >
              <ButtonText>Reset</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}
