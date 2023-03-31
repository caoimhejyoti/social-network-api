const username = [
  "amyStake",
  "barbDwyer",
  "paigeTurner",
  "robynBanks",
  "zoltanPepper",
  "benDover",
  "krystallBall",
  "joeKing",
  "justinCase",
  "charlesMunk",
  "loriDriver",
  "ashHull",
  "ipFreely",
  "amandaHuggenkiss",
  "jacquesStrap",
  "ivanaTinkle",
  "alCoholic",
  "anitaBath",
  "oliverClothesoff",
  "anitaMan",
  "seymourButz",
  "mayaButtreeks",
  "homerSexual",
  "euraSnotball",
  "mikeRotch",
  "ollieTabooger",
  "hughJass",
  "heywoodUCuddleme",
  "beaOProblem",
];

const thoughts = [
  "Today is a good Day!",
  "Wow what a day!",
  "Just keep swimming",
  "So happy!",
  "Sun is shining!",
  "I need coffee!",
  "Cannot wait for this evening",
  "Feeling excited!",
];

const possiblereactions = ["😀", "😂", "😍", "🥳", "🤯", "😭", "😡"];

// Get a random item given an array
const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUsername = () => `${getRandomArrItem(username)}`;

const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      createdAt: new Date(),
      reactions: getRandomArrItem(possiblereactions),
    });
  }
  return results;
};

const getRandomFriends = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactions: getRandomArrItem(getRandomUsername),
    });
  }
  return results;
};

const getDBThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    let baseThought = getRandomThoughts(int);
    results.push({
      thoughtText: baseThought[i].thoughtText,
      createdAt: new Date(),
      username: `${getRandomArrItem(username)}`,
      reactions: baseThought[i].reactions,
    });
  }
  return results;
};

module.exports = {
  getRandomUsername,
  getRandomThoughts,
  getRandomFriends,
  getDBThoughts,
};
