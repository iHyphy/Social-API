const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Routes for /api/users
router.route('/')
  .get(getAllUsers) // GET all users
  .post(createUser); // POST a new user

// Routes for /api/users/:id
router.route('/:id')
  .get(getUserById) // GET a single user by id
  .put(updateUser) // UPDATE a user by id
  .delete(deleteUser); // DELETE a user by id

// Routes for user's friends
router.route('/:userId/friends/:friendId')
  .post(addFriend) // POST to add a new friend to a user's friend list
  .delete(removeFriend); // DELETE to remove a friend from a user's friend list

module.exports = router;
