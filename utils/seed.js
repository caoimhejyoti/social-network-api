const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
  getDBThoughts,
  getRandomFriends,
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
    const email = `${username}${getRandomEmail()}`;
    const thoughts = getRandomThoughts(5); //CURRENTLY NOT CONNECTED TO THOUGHTS TABLE!
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
  console.info("🌱 SEEDING COMPLETE! 🌱");
  process.exit(0);
});
