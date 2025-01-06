import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "system" | "light" | "dark";
export type Font = "traditional" | "modern";

interface SettingsState {
  theme: Theme;
  font: Font;
  showFontToggle: boolean;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  setShowFontToggle: (showFontToggle: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      font: "traditional",
      showFontToggle: true,
      setTheme: (theme) => set({ theme }),
      setFont: (font) => set({ font }),
      setShowFontToggle: (showFontToggle: boolean) => set({ showFontToggle }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
