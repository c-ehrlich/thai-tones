import syllables from "./syllables.json";
import { AliasTable } from "./pick-syllable";
import { speakText } from "../audio/speak-text";
import { playAudioFile } from "../audio/sound-file";

type StateMachineAction =
  | { type: "init" }
  | { type: "clear" }
  | { type: "get" }
  | { type: "show-answer" }
  | { type: "solve-right" }
  | { type: "solve-wrong" };

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

export const DEFAULT_INIT_STATE: StateMachineState = {
  uiState: { status: "init", currentSyllable: undefined },
  last10: [],
  srsItems: [],
};

const aliasTable = new AliasTable(syllables);

export const getInitialState = () => {
  // TODO: localstorage
  return DEFAULT_INIT_STATE;
};

export function StateMachineReducer(
  state: StateMachineState,
  action: StateMachineAction
): StateMachineState {
  // console.log("tktk StateMachineReducer", state, action);
  const { type } = action;

  switch (type) {
    case "init": {
      return getInitialState();
    }

    case "clear": {
      // TODO: clear localstorage? how is this even different from init?
      return getInitialState();
    }

    case "get": {
      const next = aliasTable.sample();
      return {
        ...state,
        uiState: {
          status: "quiz",
          currentSyllable: next,
        },
      };
    }

    case "show-answer": {
      const curr = state.uiState.currentSyllable;
      if (typeof curr !== "string") {
        throw new Error("currentSyllable is not a string");
      }

      playAudioFile(curr);
      // speakText(curr);

      return {
        ...state,
        uiState: {
          ...state.uiState,
          status: "answer",
        },
      };
    }

    case "solve-right": {
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
    }

    case "solve-wrong": {
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
    }
  }
}
