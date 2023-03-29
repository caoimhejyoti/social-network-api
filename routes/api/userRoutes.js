const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('./../../controllers/userController');

// /api/users
router.route('/').get(getUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

// FIXME: how to remove users associated thoughts when deleting user! 

// /api/users/:userId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;