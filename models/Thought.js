const { Schema, model, Types } = require("mongoose");
const formatDate = require("../utils/helpers");

// DESCRIPTION: Child schema - Reactions.
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => formatDate(date),
  },
});

// DESCRIPTION: Schema to create Thought Model.
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// DESCRIPTION: Creating virtual property 'reactionCount' which gets the number of reponses attached to the current thought.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// DESCRIPTION: Initialize our Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
