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
  "ulol",
  "tarantado",
  "hinayupak",
  "lintik",
  "demonyo",
  "salot",
  "lecheng",
  "putik",
  "inutil",
  "lapastangan",
  "walang hiya",
  "punyeta",
  "hudas",
  "yawa",
  "burat",
  "titi",
  "kupal",
  "unggoy",
  "kupal",
  "gunggong",
  "ulupong",
  "buwisit",
  "tite",
  "tang ina",
  "puke",
  "kantot",
  "kantutan",
  "kantotan",
  "torjak",
  "dede",
  "pepe",
  "puday",
  "bilat",
  "tae",

  // Add more as needed
];

customBadWords.forEach((word) => filter.addWords(word));

export const containsBadWords = (text: string): boolean => {
  if (filter.isProfane(text)) {
    return true;
  }

  const lowerCaseText = text.toLowerCase();

  for (const word of customBadWords) {
    const regex = new RegExp(`\\b${word}\\w*\\b`);
    if (regex.test(lowerCaseText)) {
      return true;
    }
  }

  return false;
};

export default filter;
