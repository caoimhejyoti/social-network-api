const { Schema, model, now } = require("mongoose");
const formatDate = require("./../utils/helpers");
// require("./User");
const moment = require("moment");

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
    get: formatDate,

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
      get: formatDate,
      //FIXME: add getting method to format the timestamd on query.
    },
    username: {
      type: String,
      required: true,
    },
    // [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "user",
    //   },
    // ],
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
  return this.reactions.length;
});

// DESCRIPTION: Initialize our Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
