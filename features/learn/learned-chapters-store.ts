import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LearnedChaptersState {
  learnedChapters: Set<string>;
  setChapterLearned: (chapterId: string, learned: boolean) => void;
  isChapterLearned: (chapterId: string) => boolean;
}

type SerializedState = {
  learnedChapters: string[];
};

export const useLearnedChaptersStore = create<LearnedChaptersState>()(
  persist(
    (set, get) => ({
      learnedChapters: new Set<string>(),

      setChapterLearned: (chapterId: string, learned: boolean) =>
        set((state) => {
          const newLearnedChapters = new Set(state.learnedChapters);
          if (learned) {
            newLearnedChapters.add(chapterId);
          } else {
            newLearnedChapters.delete(chapterId);
          }
          return { learnedChapters: newLearnedChapters };
        }),

      isChapterLearned: (chapterId: string) =>
        get().learnedChapters.has(chapterId),
    }),
    {
      name: "learned-chapters-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        learnedChapters: Array.from(state.learnedChapters),
      }),
      merge: (persistedState: unknown, currentState: LearnedChaptersState) => {
        const typedState = persistedState as SerializedState;
        return {
          ...currentState,
          learnedChapters: new Set(typedState.learnedChapters ?? []),
        };
      },
    }
  )
);
