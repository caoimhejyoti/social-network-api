const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomThoughts,
  getRandomFriends,
  getDBThoughts,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // drop existing collections
  await User.deleteMany({});
  await Thought.deleteMany({});
  // await Reaction.deleteMany({});

  const users = [];
  const thoughts = getDBThoughts(5);

  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = `${username}@test.com`;
    const thoughts = getRandomThoughts(5);
    const friends = getRandomFriends(5);

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);
  // await Reaction.collection.insertMany(reactions);

  console.table(users);
  console.table(thoughts);
  // console.table(reactions);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
