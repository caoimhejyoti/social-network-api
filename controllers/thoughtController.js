const Thought = require("../models/Thought");
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
    Thought.create(req.body)
      .then((dbthoughtData) => res.json(dbthoughtData))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  //FIXME: Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate("user")
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
};
