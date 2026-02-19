const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  assignMember,
  deleteProject,
  updateProject,
  updateProgress
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// Upload report
router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        "UPDATE projects SET report_file = $1 WHERE id = $2",
        [req.file.filename, id]
      );

      res.json({ message: "File uploaded" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);


router.post("/", authMiddleware, adminMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/assign", authMiddleware, adminMiddleware, assignMember);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProject);
router.put("/:id", authMiddleware, adminMiddleware, updateProject);
router.put("/:id/progress", authMiddleware, updateProgress);


module.exports = router;
