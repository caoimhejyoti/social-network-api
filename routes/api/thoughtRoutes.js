const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createRaction,
  deleteRaction,
} = require('./../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).get(getSingleThought).post(createThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:ThoughtId/friends/:friendId').post(createRaction).delete(deleteRaction);

module.exports = router;