const User = require("./../models/User");
const Thought = require("../models/Thought");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .select("-__v")
      .populate({ path: "thoughts", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    Thought.findById({ _id: req.params.userId });
    User.findById({ _id: req.params.userId });
  },

  // deleteUser
  // addFriend
  // deleteFriend
};
