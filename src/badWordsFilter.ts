import { Filter } from "bad-words";

const filter = new Filter();

const customBadWords = [
  "putang ina",
  "bobo",
  "tanga",
  "sira ulo",
  "gago",
  "bwisit",
  "hayop",
  "bastard",
  "peste",
  // Add more words as needed
];

customBadWords.forEach((word) => filter.addWords(word));

export const containsBadWords = (text: string): boolean => {
  // Check if the text contains any filtered words
  if (filter.isProfane(text)) {
    return true; // Detected a bad word
  }

  // Check for variations or misspellings (basic example)
  const lowerCaseText = text.toLowerCase();

  // Iterate through custom bad words to check for variations
  for (const word of customBadWords) {
    // Allow variations like "bobo", "bobos", etc.
    const regex = new RegExp(`\\b${word}\\w*\\b`); // Matches the word and any variations
    if (regex.test(lowerCaseText)) {
      return true; // Detected a variation
    }
  }

  return false; // No bad words found
};

export default filter;
