const User = require("./../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .populate("thoughts")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get a Single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User
  deleteUser(req, res) {
    // need to look at how to delete connected thoughts.
    User.findOneAndDelete({ _id: req.params.userId })
      // trying to get bonus - FIXME: when used, causing a timeout error.
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.status({
          message: "User with this id and their thoughts are deleted",
        })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },

  // deleteUser
  // addFriend
  // deleteFriend
};
