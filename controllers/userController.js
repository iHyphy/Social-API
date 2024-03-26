const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findById(params.id)
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Update a user by ID
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  // Delete a user and their thoughts
  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        // Optional: Delete the user's thoughts
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => res.json({ message: 'User and their thoughts deleted successfully' }))
      .catch(err => res.status(400).json(err));
  },

  // Add a friend to a user's friend list
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $push: { friends: params.friendId } },
      { new: true }
    )
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;
