const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  // deleteFriend,
} = require("./../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// FIXME: how to remove users associated thoughts when deleting user!

// /api/users/userId
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)
  .post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId"); //.delete(deleteFriend);

module.exports = router;
