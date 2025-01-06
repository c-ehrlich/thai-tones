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
import { LEARN_CHAPTERS } from "@/features/learn/chapters";

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
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="onboarding"
            options={{ headerShown: false, title: "Onboarding" }}
          />
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen name="learn/index" options={{ title: "Learn" }} />
          {/* <Stack.Screen name="learn/ch1" options={{ title: "Chapter 1" }} /> */}
          {LEARN_CHAPTERS.map((ch) => (
            <Stack.Screen
              key={`learn-${ch.id}`}
              name={`learn/${ch.id}`}
              options={{ title: ch.name }}
            />
          ))}
          <Stack.Screen name="practice" options={{ title: "Practice" }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </RootProviders>
    </Globals>
  );
}
