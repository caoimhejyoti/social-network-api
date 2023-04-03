const Thought = require("../models/Thought");
const User = require("../models/User");
const reactionSchema = require("../models/Thought");

module.exports = {
  //WORKING! Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .populate("username")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  //WORKING! Get a Single Thought
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
  // FIXME: Create a Thought
  createThought(req, res) {
    // update user model then create thought
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
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "thougt crrated successfully" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  //FIXME: Update a Thought
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
      .catch((err) => res.status(500).json(err));
  },
  //WORKING! Delete a Thought
  deleteThought(req, res) {
    // need to look at how to delete connected thoughts.
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : reactionSchema.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() =>
        res.json({
          message: "thought with this id and its reactions are deleted",
        })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  //WORKING!  Add a Reaction to the Thought
  addReaction(req, res) {
    reactionSchema
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.params.reactionBody } },
        { runValidators: true, new: true }
      )
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
};
