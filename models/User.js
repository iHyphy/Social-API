const mongoose = require('mongoose');
const validator = require('validator'); // Ensure you have 'validator' installed for email validation

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Convert email to lowercase before saving
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought', // References the Thought model
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Self-reference to enable user-to-user relationships
    },
  ],
},
{
  toJSON: {
    virtuals: true, // Include virtuals when document is converted to JSON
  },
  id: false, // Don't include the 'id' field
});

// Virtual for friendCount
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Returns the number of friends
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
