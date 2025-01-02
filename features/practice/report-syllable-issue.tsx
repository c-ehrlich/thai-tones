import { Button, ButtonText } from "@/components/ui/button";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useAxiom } from "../logging/axiom";
import { Heading } from "@/components/ui/heading";

export function ReportSyllableIssue({ syllable }: { syllable: string }) {
  const [showReportSyllableModal, setShowReportSyllableModal] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const axiom = useAxiom();

  return (
    <>
      <Pressable onPress={() => setShowReportSyllableModal(true)}>
        <Text>Report</Text>
      </Pressable>
      <Modal
        isOpen={showReportSyllableModal}
        onClose={() => setShowReportSyllableModal(false)}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>What is incorrect about this syllable?</Heading>
          </ModalHeader>
          <ModalBody>
            <View className="flex flex-col gap-4">
              <Button
                variant="outline"
                onPress={() => {
                  axiom.log({
                    type: "syllable_issue",
                    event: {
                      syllable,
                      issue: "not-a-syllable",
                    },
                  });
                  setShowReportSyllableModal(false);
                  setShowThanksModal(true);
                }}
              >
                <ButtonText>It is not a syllable</ButtonText>
              </Button>
              <Button
                variant="outline"
                onPress={() => {
                  axiom.log({
                    type: "syllable_issue",
                    event: {
                      syllable,
                      issue: "incorrect-audio-or-explanation",
                    },
                  });
                  setShowReportSyllableModal(false);
                  setShowThanksModal(true);
                }}
              >
                <ButtonText>Incorrect audio or explanation</ButtonText>
              </Button>
            </View>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setShowReportSyllableModal(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={showThanksModal} onClose={() => setShowThanksModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading>Thanks for the report!</Heading>
          </ModalHeader>
          <ModalBody>
            <Text>Our team will review this issue soon.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              action="primary"
              variant="solid"
              onPress={() => setShowThanksModal(false)}
            >
              <ButtonText>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
