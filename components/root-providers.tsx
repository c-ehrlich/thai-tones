import { AxiomProvider } from "@/features/logging/axiom";
import React from "react";
import { GluestackUIProvider } from "./ui/gluestack-ui-provider";
import { useSettingsStore } from "@/features/settings/settings-store";

export function RootProviders({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((state) => state.theme);

  return (
    <GluestackUIProvider mode={theme}>
      <AxiomProvider>{children}</AxiomProvider>
    </GluestackUIProvider>
  );
}
