import React from "react";

import "@/util/polyfills";
import "react-native-reanimated";

export function Globals({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
