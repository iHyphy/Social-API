const mongoose = require('mongoose');

// Define the Reaction schema as a subdocument
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  // You can also explicitly define createdAt here if specific customization is needed
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields to reactions
  toJSON: { getters: true },
  id: false,
});

// Define the Thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields to thoughts
  toJSON: { virtuals: true, getters: true },
});

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
