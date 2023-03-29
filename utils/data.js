const names = [
  'Mike',
  'Olivia',
  'Noah',
  'Emma',
  'Ethan',
  'Isabella',
  'James',
  'Lily',
  'Elijah',
  'Aurora',
  'Charlotte',
  'Harper',
  'Levi',
  'Mateo',
  'Smith',
  'Young',
  'Ling',
  'Rodriguez',
  'Davis',
  'Garcia',
  'Williams',
  'Lopez',
  'Green',
  'Nelson',
  'King',
  'Lewis',
  'Adams',
  'Carter',
  'Rivera',
  'Roberts'
];

const thoughts = [
  'Today is a good Day!',
  'Wow what a day!',
  'Just keep swimming',
  'So happy!',
  'Sun is shining!',
  'I need coffee!,'
  'Cannot wait for this evening',
  'Feeling excited!',
];

const possiblereactions = [
  '😀',
  '😂',
  '😍',
  '🥳',
  '🤯',
  '😭',
  '😡'
];

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
      reactions: getRandomArrItem(possiblereactions),
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts};
