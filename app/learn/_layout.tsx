import { Stack } from "expo-router";

export const LEARN_CHAPTERS = [
  { id: "ch1", name: "Chapter 1 name", description: "Chapter 1 description" },
  { id: "ch2", name: "Chapter 2 name", description: "Chapter 2 description" },
] as const;

export default function LearnLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      {LEARN_CHAPTERS.map((chapter) => (
        <Stack.Screen key={chapter.id} name={chapter.id} />
      ))}
    </Stack>
  );
}
