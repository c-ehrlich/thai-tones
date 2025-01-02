interface RecursiveObjectOfStrNumNil {
  [key: string]: string | number | null | RecursiveObjectOfStrNumNil;
}

type EnsureEventType<
  T extends { type: string; event: RecursiveObjectOfStrNumNil }
> = T;

export type AxiomEvent = EnsureEventType<
  | {
      type: "syllable_issue";
      event: {
        syllable: string;
        issue: "not-a-syllable" | "incorrect-audio-or-explanation";
      };
    }
  | { type: "foo"; event: { bar: string } }
>;
