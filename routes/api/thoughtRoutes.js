const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  // createThought,
  // updateThought,
  // deleteThought,
  // createRaction,
  // deleteRaction,
} = require('./../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts)//.post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought)//.put(updateThought)//.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/friends/:friendId').post(createRaction).delete(deleteRaction);

module.exports = router;

