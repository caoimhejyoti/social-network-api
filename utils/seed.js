const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomThoughts,
  // getDBThoughts,
  // getRandomFriends,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // drop existing collections
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  // const thoughts = getDBThoughts(5); ASKBCS

  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    // console.log(usernameArray);
    // const friends = getRandomUsername();
    const email = `${username}${getRandomEmail()}`;
    const thoughts = getRandomThoughts(5, username);

    // const friends = getRandomFriends(5);
    // console.log(friends);

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

  // for (let i = 0; i < users.length; i++) {
  //   let currentUser = users[i].username;

  //   const friend = getRandomFriends(currentUser);
  //   // const secondFriend = getRandomFriends(currentUser);

  //   // console.log(friend);
  //   // console.log(secondFriend);

  //   // const result = users.find(user => user.username === friend);

  //   // console.log(result._id);

  //   // function findFriendId() {
  //   //   idArr = users.filter((friend) => friend === users.username);
  //   //   return idArr;
  //   // };

  //   // console.log(friendId);

  //   // const objIndex = [i];
  //   // console.log(users[objIndex]);
  //   // console.log("Before update: ", users[objIndex]);

  //   users[i].friends.push(friend);

  //   // console.log("after update: ", users[objIndex]);
  // }

  // console.log(users);

  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);

  console.table(users);
  // console.table(thoughts);
  // console.table(reactions);
  console.info("🌱 SEEDING COMPLETE! 🌱");
  process.exit(0);
});
