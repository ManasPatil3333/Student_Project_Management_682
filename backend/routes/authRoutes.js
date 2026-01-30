const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const {
  signupUser,
  loginUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working", user: req.user });
});

router.get(
  "/admin",
  authMiddleware,
  checkRole(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
  }
);

module.exports = router;
