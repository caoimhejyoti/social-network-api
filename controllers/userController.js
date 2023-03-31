const User = require("./../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("posts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { username: req.body.username },
      { email: req.body.email },
      { new: true },
      (err, result) => {
        if (results) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log("Oh no - something has gone wrong!");
          // console.log(err);
          res.status(500).json({ message: err.message });
        }
      }
    );
  },
  // deleteUser
  // addFriend
  // deleteFriend
};
