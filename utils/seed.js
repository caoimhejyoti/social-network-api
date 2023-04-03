const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = `${username}${getRandomEmail()}`;
    const thoughts = getRandomThoughts(5, username);

    const newThoughts = await Thought.collection.insertMany(thoughts);

    users.push({
      username: username,
      email: email,
      thoughts: [
        newThoughts.insertedIds["0"],
        newThoughts.insertedIds["1"],
        newThoughts.insertedIds["2"],
        newThoughts.insertedIds["3"],
        newThoughts.insertedIds["4"],
      ],
      friends: [],
    });
  }

  // NOTE: Future developement - seeding friends.
  // for (let i = 0; i < users.length; i++) {
  //   let currentUser = users[i].username;

  //   const friend = getRandomFriends(currentUser);
  //   users[i].friends.push(friend);

  // }

  await User.collection.insertMany(users);

  console.table(users);
  console.info("🌱 SEEDING COMPLETE! 🌱");
  process.exit(0);
});
