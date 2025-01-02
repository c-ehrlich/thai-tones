// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import React from "react";
import "@/global.css";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootProviders } from "@/components/root-providers";

const fetchUserHasOnboarded = async () => {
  // await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
  return true; // TODO: BEFORE MERGE - work on this lol
};

// TODO: BEFORE MERGE - this doesn't work
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const userHasFinishedOnboarding = await fetchUserHasOnboarded();

        if (!userHasFinishedOnboarding) {
          // redirect to onboarding
          router.push("/onboarding");
        } else {
          router.push("/practice");
        }
      } catch (e) {
        console.error(e);
      } finally {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    };

    prepareApp();

    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, []);

  // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  // </ThemeProvider>
  return (
    <RootProviders>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </RootProviders>
  );
}
