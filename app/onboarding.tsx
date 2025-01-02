import { type OnboardingStep } from "@/features/onboarding/_onboarding-shared";
import { AreYouSureYouCantRead } from "@/features/onboarding/form-stages/are-you-sure-you-cant-read";
import { CanYouRead } from "@/features/onboarding/form-stages/can-you-read";
import { CanYouReallyRead } from "@/features/onboarding/form-stages/can-you-really-read";
import { EndFormAllSelected } from "@/features/onboarding/form-stages/end-form-all-selected";
import { EndFormNoneSelected } from "@/features/onboarding/form-stages/end-form-none-selected";
import { EndFormSomeSelected } from "@/features/onboarding/form-stages/end-form-some-selected";
import { SelectKnownConsonants } from "@/features/onboarding/form-stages/select-known-consonants";
import { SelectKnownVowels } from "@/features/onboarding/form-stages/select-known-vowels";
import { SplashScreen } from "@/features/onboarding/form-stages/splash-screen";
import { useState } from "react";
import { SafeAreaView, Text } from "react-native";

export default function OnboardingIndex() {
  const [step, setStep] = useState<OnboardingStep>("splash-screen");
  // TODO: BEFORE MERGE - this needs to change depending on db schema design
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [knownVowels, setKnownVowels] = useState<
    "todo" | "all" | "some" | "none"
  >("todo");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [knownConsonants, setKnownConsonants] = useState<
    "todo" | "all" | "some" | "none"
  >("todo");

  return (
    <SafeAreaView>
      {step === "splash-screen" ? (
        <SplashScreen handleNextStep={() => setStep("can-you-read")} />
      ) : step === "can-you-read" ? (
        <CanYouRead
          handleYes={() => setStep("can-you-really-read")}
          handleNo={() => setStep("are-you-sure-you-cant-read")}
        />
      ) : step === "can-you-really-read" ? (
        <CanYouReallyRead
          handleYes={() => setStep("end-form-all-selected")}
          handleNo={() => setStep("select-known-vowels")}
        />
      ) : step === "are-you-sure-you-cant-read" ? (
        <AreYouSureYouCantRead
          handleSelectCanReadABit={() => setStep("select-known-vowels")}
          handleSelectCantRead={() => setStep("end-form-none-selected")}
        />
      ) : step === "select-known-vowels" ? (
        <SelectKnownVowels
          setKnownVowels={setKnownVowels}
          handleNextStep={() => setStep("select-known-consonants")}
        />
      ) : step === "select-known-consonants" ? (
        <SelectKnownConsonants
          setKnownConsonants={setKnownConsonants}
          handleNextStep={() => setStep("end-form-some-selected")}
        />
      ) : step === "end-form-all-selected" ? (
        <EndFormAllSelected
          setKnownVowels={setKnownVowels}
          setKnownConsonants={setKnownConsonants}
        />
      ) : step === "end-form-none-selected" ? (
        <EndFormNoneSelected
          setKnownVowels={setKnownVowels}
          setKnownConsonants={setKnownConsonants}
        />
      ) : step === "end-form-some-selected" ? (
        <EndFormSomeSelected />
      ) : (
        <Text>Invalid step: {step}</Text>
      )}
    </SafeAreaView>
  );
}
