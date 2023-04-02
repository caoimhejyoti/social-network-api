const moment = require("moment");

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

const emails = [
  "@gmail.com",
  "@hotmail.com",
  "@outlook.com",
  "@me.com",
  "@yahoo.com",
  "@microsoft.com",
  "@aol.com",
];

const possiblereactions = ["😀", "😂", "😍", "🥳", "🤯", "😭", "😡"];

//WORKING! DESCRIPTION: Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

//WORKING! DESCRIPTION: Gets a random username
const getRandomUsername = () => `${getRandomArrItem(username)}`;

//WORKING! DESCRIPTION: Gets a random email domain
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// WORKING! DESCRIPTION: Gets a random thoughts
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      createdAt: moment().format("DD/MM/YYYY, h:mm:ss a"),
      // reactions: getReactions(3), ASKBCS
    });
  }
  return results;
};

// WORKING! DESCRIPTION: Gets a random reactions
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possiblereactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possiblereactions),
      username: getRandomArrItem(username),
    });
  }
  return results;
};

// WORKING! DESCRIPTION: Gets a random thoughts for thoughts collection.
const getDBThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    let baseThought = getRandomThoughts(int);
    results.push({
      thoughtText: baseThought[i].thoughtText,
      createdAt: moment().format("DD/MM/YYYY, h:mm:ss a"),
      username: `${getRandomArrItem(username)}`,
      reactions: baseThought[i].reactions,
    });
  }
  return results;
};

// FIXME: managed to get random usernames but they do not relate to other users created. currently resulting a blank array.
// DESCRIPTION: Gets a random friends.
const getRandomFriends = (int) => {
  let results = [];
  let B = 5;
  let N = 0;

  for (let i = 0; i < int; i++) {
    let chooseFriends = () => {
      num = Math.floor(Math.random() * username.length - N);
      N = Math.min(N + 1, B);
      friend = username.splice(num, 1);
      username.push(friend);
      return friend;
    };
    // console.log(chooseFriends());
  }
  return results;
};

module.exports = {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
  getRandomFriends,
  getDBThoughts,
};
