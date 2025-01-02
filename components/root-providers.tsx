import { AxiomProvider } from "@/features/logging/axiom";
import React from "react";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return <AxiomProvider>{children}</AxiomProvider>;
}
