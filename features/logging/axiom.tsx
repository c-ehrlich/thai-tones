import React, { useState } from "react";
import { Axiom } from "@axiomhq/js";
import { useRequiredContext } from "@/util/hooks/useRequiredContext";
import { type AxiomEvent } from "./axiom-event";
import { env } from "@/util/env";

const AxiomContext = React.createContext<Axiom | null>(null);

export function AxiomProvider({ children }: { children: React.ReactNode }) {
  const [axiom] = useState(() => new Axiom({ token: env.AXIOM_TOKEN }));

  return (
    <AxiomContext.Provider value={axiom}>{children}</AxiomContext.Provider>
  );
}

export function useAxiom() {
  const axiom = useRequiredContext(AxiomContext);

  const log = (event: AxiomEvent) => {
    console.log("tktk log", {
      env,
      dataset: env.AXIOM_DATASET,
      event,
    });
    axiom.ingest(env.AXIOM_DATASET, event);
  };

  return { log };
}
