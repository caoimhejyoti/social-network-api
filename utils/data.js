const usernameArr = [
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

const possibleFriends = [];

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
const getRandomUsername = () => {
  const chosenUsername = `${getRandomArrItem(usernameArr)}`;
  const index = usernameArr.indexOf(chosenUsername);
  if (index > -1) {
    usernameArr.splice(index, 1);
  }
  possibleFriends.push(chosenUsername); //used for future developement of being able to seed friends.

  return chosenUsername;
};

//WORKING! DESCRIPTION: Gets a random email domain
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// WORKING! DESCRIPTION: Gets a random thoughts
const getRandomThoughts = (int, createdUsername) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      username: createdUsername,
    });
  }
  return results;
};

// NOTE: Future developement - seeding reactions. DESCRIPTION: Gets a random reactions
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possiblereactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possiblereactions),
      username: getRandomArrItem(usernameArr),
    });
  }
  return results;
};

// NOTE: Future developement - created for seeding reactions. DESCRIPTION: Gets a random thoughts for thoughts collection.
const getDBThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    let baseThought = getRandomThoughts(int);
    results.push({
      thoughtText: baseThought[i].thoughtText,
      createdAt: moment().format("DD/MM/YYYY, h:mm:ss a"),
      username: `${getRandomArrItem(usernameArr)}`,
      // reactions: baseThought[i].reactions,
    });
  }
  return results;
};

// NOTE: Future developement - created for seeding friendships. DESCRIPTION: Gets a random friends.
function getRandomFriends(currentUser) {
  const myPossibleFriends = possibleFriends.filter(
    (friend) => friend !== currentUser
  );
  const chosenFriend = getRandomArrItem(myPossibleFriends);
  return chosenFriend;
}

module.exports = {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
  // getRandomFriends, //future developement
  // getDBThoughts, //future developement
};
