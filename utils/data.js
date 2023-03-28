const names = [];

const thoughts = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      published: Math.random() < 0.5,
      description: getRandomArrItem(thoughts),
      advertiserFriendly: Math.random() < 0.5,
      reactions: [...getRandomReactions(3)],
    });
  }
  return results;
};

getRandomThoughts, getRandomReactions;
