const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  assignMember,
  deleteProject
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/assign", authMiddleware, adminMiddleware, assignMember);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProject);

module.exports = router;
