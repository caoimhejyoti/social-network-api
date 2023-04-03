// const moment = require("moment");

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

//WORKING! DESCRIPTION: Gets a random username FIXME: splice out username from original array
const getRandomUsername = () => {
  const chosenUsername = `${getRandomArrItem(usernameArr)}`;
  const index = usernameArr.indexOf(chosenUsername);
  if (index > -1) {
    usernameArr.splice(index, 1);
  }
  // console.log(usernameArr);
  possibleFriends.push(chosenUsername);
  // console.log(possibleFriends);
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
      // createdAt: moment().format("DD/MM/YYYY, h:mm:ss a"),
      username: createdUsername,
      // reactions: getReactions(3), ASKBCS
    });
  }
  return results;
};

// WORKING! DESCRIPTION: Gets a random reactions
// const getReactions = (int) => {
//   if (int === 1) {
//     return getRandomArrItem(possiblereactions);
//   }
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: getRandomArrItem(possiblereactions),
//       username: getRandomArrItem(usernameArr),
//     });
//   }
//   return results;
// };

// WORKING! DESCRIPTION: Gets a random thoughts for thoughts collection.
// const getDBThoughts = (int) => {
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     let baseThought = getRandomThoughts(int);
//     results.push({
//       thoughtText: baseThought[i].thoughtText,
//       createdAt: moment().format("DD/MM/YYYY, h:mm:ss a"),
//       username: `${getRandomArrItem(usernameArr)}`,
//       // reactions: baseThought[i].reactions,
//     });
//   }
//   return results;
// };

// FIXME: managed to get random usernames but they do not relate to other users created. currently resulting a blank array.
// DESCRIPTION: Gets a random friends.

// const getRandomFriends = (currentUser, users) => {
//   // NOTE: does this need to return the _id of friend, and not the username?
//   // console.log(users);
//   console.log("currentUser: " + currentUser);
//   // console.log("users: " + users.username);
//   console.log("possibleFriends: " + possibleFriends);
//   // let myPossibleFriends = [];
//   const index = possibleFriends.indexOf(currentUser);
//   console.log("index: " + index);
//   let myPossibleFriends = possibleFriends.map(possibleFriends.slice(index));

//   console.log(myPossibleFriends);
//   const chosenFriend = getRandomArrItem(myPossibleFriends);
//   console.log("chosenFriend" + chosenFriend);
//   return chosenFriend;
// };

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
  // getRandomFriends,
  // getDBThoughts,
};
