const mongoose = require('mongoose');

// Define the Reaction schema as a subdocument
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
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
      get: createdAtVal => createdAtVal.toDateString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, // Do not assign an `id` to subdocuments
  }
);

// Since this isn't a model but a schema, we don't compile it with mongoose.model()
module.exports = reactionSchema;
