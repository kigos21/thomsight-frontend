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
  "gunggong",
  "ulupong",
  "buwisit",
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
  "mangmang",
  "iyot",
  "shet",
  "pakyu",
  "damn",
  "shit",
  "fuck",
  "fucker",
  "bitch",
  "asshole",
  "bastard",
  "dickhead",
  "motherfucker",
  "son of a bitch",
  "whore",
  "slut",
  "cunt",
  "jerk",
  "idiot",
  "bitchass",
  "nigger",
  "shitty",
  "bullshit",
  "laspag",
  "pakyu",
  "tangina",
  "batugan",
  "tameme",
  "santong kabayo",
  "abnoy",
  "duwag",
  "tuta",
  "bakla",
  "tomboy",
  "bading",
  "bugok",
  "gagu",
  "kingina",
  "putragis",
  "yabag",
  "bayag",
  "katangahan",
  "kasumpa-sumpa",
  "kagaguhan",
  "putres",
  "leche",
  "puta",
  "bobong",
  "pakyong ina",
  "shithead",
  "faggot",
  "moron",
  "crap",
  "anus",
  "motherfreaker",
  "gaylord",
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
