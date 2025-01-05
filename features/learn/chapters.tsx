type Chapter = { id: string; name: string; description?: string[] };
export const LEARN_CHAPTERS = [
  {
    id: "ch1",
    name: "Day 1: The Class System",
    description: [
      "What are consonant classes?",
      "Low class consonants 1",
      "First 7 long vowels",
      "No space between words",
    ],
  },
  {
    id: "ch2",
    name: "Day 2: A Matter of Life and Death",
    description: [
      "Low class consonants 2",
      'Final consonants are "unreleased"',
      "Long vowels that can't take final consonants",
      "Live-dead syllables",
    ],
  },
  {
    id: "ch3",
    name: "Day 3: A Short, Short Story",
    description: [
      "Mid class consonants",
      'Placeholder consonant "อ"',
      "Short vowels",
      "A vowel with 2 forms",
      "Camouflaged vowels (2 letters)",
    ],
  },
  {
    id: "ch4",
    name: "Day 4: The Silent Partner",
    description: [
      "High class consonants",
      "Consonant sounds when at final position",
      'Class-changing silent "ห"',
      "How to memorise consonant classes",
    ],
  },
  {
    id: "ch5",
    name: "Day 5: Theory of Tones",
    description: [
      "Long vowels that have 2 forms",
      "String Theory #1 (live syllable rule)",
      "String Theory #2 (dead syllable rule",
    ],
  },
  {
    id: "intermission",
    name: "Intermission",
    description: [],
  },
  {
    id: "ch6",
    name: "Day 6: Mark My Words",
    description: [
      "Complex vowels",
      'How to identify vowels from the character "เ-"',
      "String Method #3 & #4 (tone mark rule)",
      "Pronunciation mismatch",
    ],
  },
  {
    id: "ch7",
    name: "Day 7: Unclustering Your Life",
    description: [
      "Less common consonants",
      'Pronunciation of "ญ"',
      "Consonant clusters: true, pseudo, and false clusters",
      "Camouflaged vowels (1 letter)",
    ],
  },
  {
    id: "ch8",
    name: "Day 8: Hear me Ror!",
    description: [
      "Less common consonants (continued)",

      "Consonant Summary",
      "Silent mark",
      "Vowel-shortening marks",
      'Pronunciations of "ร": at final position, within a syllable, and double "รร"',
    ],
  },
  {
    id: "ch9",
    name: "Day 9: The Outlaws",
    description: [
      "Thai numberals",
      'Rule exceptions: vowel-less words, "อย" combination, silent consonants, and vowels without a silent mark',
      'Syllabic "ฤ"',
      'Abbreviation mark "ฯ"',
      'Repetition mark "ๆ"',
    ],
  },
  {
    id: "preliminary",
    name: "Preliminary",
    description: [],
  },
  {
    id: "ch10",
    name: "Day 10: The Beginning",
    description: [
      "Camouflaged words (3 letter)",
      "Similar-looking characters",
      "How to draw syllable borders",
    ],
  },
] as const as Chapter[];
