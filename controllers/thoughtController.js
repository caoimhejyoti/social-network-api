const Thought = require("../models/Thought");
const User = require("./../models/User");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
    //   .populate("users")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    //   .select("-__v")
    //   .populate("users")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  },
  //   createThought(req, res) {
  //     Thought.create(req.body)
  //       .then((dbthoughtData) => res.json(dbthoughtData))
  //       .catch((err) => res.status(500).json({ message: err.message }));
  //   },
};
