const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  // await Reaction.deleteMany({});

  const users = [];
  const thoughts = getRandomThoughts(10);
  // const reactions = getRandomReactions(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
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
