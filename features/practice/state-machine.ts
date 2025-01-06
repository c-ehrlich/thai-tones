import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import syllables from "./syllables.json";
import { AliasTable } from "./pick-syllable";
import { playAudioFile } from "../audio/sound-file";

type UiState =
  | {
      status: "init";
      currentSyllable: undefined;
    }
  | {
      status: "quiz";
      currentSyllable: string;
    }
  | {
      status: "answer";
      currentSyllable: string;
    };

type SrsItem = {
  syllable: string;
  count: number;
  nextDue: Date;
};

type StateMachineState = {
  uiState: UiState;
  last10: string[];
  srsItems: SrsItem[];
};

const DEFAULT_INIT_STATE: StateMachineState = {
  uiState: { status: "init", currentSyllable: undefined },
  last10: [],
  srsItems: [],
};

const aliasTable = new AliasTable(syllables);

interface StateMachineStore extends StateMachineState {
  init: () => void;
  clear: () => void;
  get: () => void;
  showAnswer: () => void;
  solveRight: () => void;
  solveWrong: () => void;
}

export const useStateMachineStore = create<StateMachineStore>()(
  persist(
    (set) => ({
      ...DEFAULT_INIT_STATE,

      init: () => set(DEFAULT_INIT_STATE),

      clear: () => set(DEFAULT_INIT_STATE),

      get: () => {
        const next = aliasTable.sample();
        set({
          uiState: {
            status: "quiz",
            currentSyllable: next,
          },
        });
      },

      showAnswer: () =>
        set((state) => {
          const curr = state.uiState.currentSyllable;
          if (typeof curr !== "string") {
            throw new Error("currentSyllable is not a string");
          }

          void playAudioFile(curr);

          return {
            ...state,
            uiState: {
              ...state.uiState,
              status: "answer",
            },
          };
        }),

      solveRight: () =>
        set((state) => {
          const curr = state.uiState.currentSyllable;
          const next = aliasTable.sample();

          if (typeof curr !== "string") {
            throw new Error("currentSyllable is not a string");
          }

          return {
            ...state,
            uiState: {
              status: "quiz",
              currentSyllable: next,
            },
            last10: [...state.last10, curr].slice(-10),
          };
        }),

      solveWrong: () =>
        set((state) => {
          const curr = state.uiState.currentSyllable;
          const next = aliasTable.sample();

          if (typeof curr !== "string") {
            throw new Error("currentSyllable is not a string");
          }

          return {
            // TODO: srs items
            ...state,
            uiState: {
              status: "quiz",
              currentSyllable: next,
            },
            last10: [...state.last10, curr].slice(-10),
          };
        }),
    }),
    {
      name: "practice-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
