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
  // const thoughts = getDBThoughts(5); ASKBCS

  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = `${username}${getRandomEmail()}`;
    const thoughts = getRandomThoughts(5); //FIXME: CURRENTLY NOT CONNECTED TO THOUGHTS TABLE!
    const friends = getRandomFriends(5);
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
      friends: friends,
    });
  }

  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);
  // await Reaction.collection.insertMany(reactions);

  console.table(users);
  console.table(thoughts);
  // console.table(reactions);
  console.info("🌱 SEEDING COMPLETE! 🌱");
  process.exit(0);
});
