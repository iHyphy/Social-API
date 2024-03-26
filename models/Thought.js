const mongoose = require('mongoose');

// Reaction schema as a subdocument
const ReactionSchema = new mongoose.Schema({
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
    },
}, {
    toJSON: { getters: true },
    _id: false, // Prevents the creation of an _id for subdocuments
});

// Thought schema
const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: { // assuming a simple string reference here; adjust as needed for your application
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
}, {
    toJSON: { virtuals: true },
    id: false,
});

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
