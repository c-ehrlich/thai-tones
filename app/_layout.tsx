import React from "react";
import "@/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { RootProviders } from "@/components/root-providers";
import { Globals } from "@/components/globals";
import * as Font from "expo-font";
import KanitRegular from "@/assets/fonts/Kanit-Regular.ttf";

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    Kanit: KanitRegular,
  });
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.error("Error loading fonts:", e);
      } finally {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    };

    void prepareApp();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Globals>
      <RootProviders>
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </RootProviders>
    </Globals>
  );
}
