export const ONBOARDING_STEPS = [
  "splash-screen",
  "can-you-read",
  "can-you-really-read",
  "are-you-sure-you-cant-read",
  "select-known-vowels",
  "select-known-consonants",
  "end-form-none-selected",
  "end-form-some-selected",
  "end-form-all-selected",
] as const;
export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
