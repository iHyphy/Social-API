const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Get a single thought by ID
  getThoughtById({ params }, res) {
    Thought.findById(params.id)
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        return User.findByIdAndUpdate(
          body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(params.id)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID' });
          return;
        }
        // Remove thought ID from user's thoughts array
        return User.findByIdAndUpdate(
          dbThoughtData.username, // Assuming username is the ID; adjust if using actual userID
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought successfully deleted' }))
      .catch(err => res.status(400).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;
