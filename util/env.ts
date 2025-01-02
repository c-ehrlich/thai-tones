import Constants from "expo-constants";

const vars = ["AXIOM_DATASET", "AXIOM_TOKEN"] as const;

const env: Record<(typeof vars)[number], string> =
  Constants.expoConfig?.extra ?? ({} as any);

const missingEnvVars: string[] = [];
for (const key of vars) {
  if (!env[key]) {
    missingEnvVars.push(key);
  }
}

if (missingEnvVars.length) {
  throw new Error(
    `The following environment variables are required: ${missingEnvVars.join(
      ", "
    )}`
  );
}

export { env };
