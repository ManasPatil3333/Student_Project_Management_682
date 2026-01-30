const express = require("express");
const { registerUser, getAllNonAdminUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.get(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  getAllNonAdminUsers
);



module.exports = router;
