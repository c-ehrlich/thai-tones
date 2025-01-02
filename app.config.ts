import { type ConfigContext, type ExpoConfig } from "expo/config";

// app.config.js
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...(config as ExpoConfig),
    extra: {
      AXIOM_DATASET: process.env.AXIOM_DATASET,
      AXIOM_TOKEN: process.env.AXIOM_TOKEN,
    },
  };
};
