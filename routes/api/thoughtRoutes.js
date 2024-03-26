const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
router.route('/')
  .get(getAllThoughts) // GET all thoughts
  .post(createThought); // POST a new thought

// Routes for /api/thoughts/:id
router.route('/:id')
  .get(getThoughtById) // GET a single thought by id
  .put(updateThought) // UPDATE a thought by id
  .delete(deleteThought); // DELETE a thought by id

// Route for adding a reaction to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction); // POST a reaction to a thought

// Route for removing a reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // DELETE a reaction by id from a thought

module.exports = router;
