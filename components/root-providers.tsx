import { AxiomProvider } from "@/features/logging/axiom";
import React from "react";
import { GluestackUIProvider } from "./ui/gluestack-ui-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <GluestackUIProvider>
      <AxiomProvider>{children}</AxiomProvider>
    </GluestackUIProvider>
  );
}
