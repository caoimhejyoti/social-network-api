const { Schema, model } = require("mongoose");

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
    //FIXME: add getting method to format the timestamp on query.
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
      //FIXME: add getting method to format the timestamd on query.
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema], //FIXME: confirm working
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// DESCRIPTION: Creating virtual property 'reactionCount' which gets the number of reponses attached to the current thought.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.lenth;
});

// DESCRIPTION: Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
