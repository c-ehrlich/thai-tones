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
  due: Date;
};

const SRS_INTERVALS = [
  1 * 60 * 1000, // 1m
  10 * 60 * 1000, // 10m
  60 * 60 * 1000, // 1h
  24 * 60 * 60 * 1000, // 1d
  7 * 24 * 60 * 60 * 1000, // 1w
];

/**
 * offsets a number by a random amount within a range
 * eg. getRandomVariation(3, 0.1) gets numbers between 2.7 and 3.3
 */
function getRandomVariation(value: number, range = 0.1): number {
  const variation = value * range;
  const randomOffset = (Math.random() * 2 - 1) * variation;
  return value + randomOffset;
}

function createSrsItems(syllable: string): SrsItem[] {
  const now = new Date();
  return SRS_INTERVALS.map((interval) => ({
    syllable,
    due: new Date(now.getTime() + getRandomVariation(interval)),
  }));
}

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
  resetSrs: () => void;
}

export const useStateMachineStore = create<StateMachineStore>()(
  persist(
    (set) => ({
      ...DEFAULT_INIT_STATE,

      init: () => set(DEFAULT_INIT_STATE),

      clear: () => set(DEFAULT_INIT_STATE),

      resetSrs: () =>
        set((state) => ({
          ...state,
          srsItems: [],
        })),

      get: () => {
        const now = new Date();
        set((state) => {
          console.log("tktk srs items before", state.srsItems);
          // Check if first item is due (array is kept sorted)
          const [firstItem, ...remainingItems] = state.srsItems;
          if (firstItem && firstItem.due <= now) {
            return {
              ...state,
              uiState: {
                status: "quiz",
                currentSyllable: firstItem.syllable,
              },
              srsItems: remainingItems,
            };
          }

          // If no due items, pick a random syllable
          const next = aliasTable.sample();
          return {
            ...state,
            uiState: {
              status: "quiz",
              currentSyllable: next,
            },
          };
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

          // Remove any existing SRS items for this syllable
          const filteredSrsItems = state.srsItems.filter(
            (item) => item.syllable !== curr
          );

          // Create new SRS items for this syllable
          const newSrsItems = createSrsItems(curr);

          // Combine and sort all SRS items by due date
          const sortedSrsItems = [...filteredSrsItems, ...newSrsItems].sort(
            (a, b) => a.due.getTime() - b.due.getTime()
          );

          return {
            ...state,
            uiState: {
              status: "quiz",
              currentSyllable: next,
            },
            last10: [...state.last10, curr].slice(-10),
            srsItems: sortedSrsItems,
          };
        }),
    }),
    {
      name: "practice-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
