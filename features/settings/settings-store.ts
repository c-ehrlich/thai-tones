import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "system" | "light" | "dark";
type Font = "traditional" | "modern";

interface SettingsState {
  theme: Theme;
  font: Font;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      font: "traditional",
      setTheme: (theme) => set({ theme }),
      setFont: (font) => set({ font }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
