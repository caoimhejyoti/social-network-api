const Thought = require("../models/Thought");
const User = require("../models/User");
const reactionSchema = require("../models/Thought");

module.exports = {
  // DESCRIPTION: Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .populate("username")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Get a Single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("username")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No User with this id!" });
        }
        res.json({ message: "Thought created!" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : reactionSchema.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() =>
        res.json({
          message: "Thought with this id and its reactions are deleted",
        })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Add a Reaction to the Thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  // DESCRIPTION: Delete a reaction from a Thought.
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .populate("reactions")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
};
