const pool = require("../config/db");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await pool.query(
      "INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(project.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignMember = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;

    if (!["student", "faculty"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    await pool.query(
      `INSERT INTO project_members (project_id, user_id, role)
       VALUES ($1, $2, $3)`,
      [projectId, userId, role]
    );

    res.json({ message: "Member assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const { id, role } = req.user;

    let result;

    if (role === "admin") {
      result = await pool.query("SELECT * FROM projects");
    } else {
      result = await pool.query(
        `SELECT p.*
         FROM projects p
         JOIN project_members pm ON p.id = pm.project_id
         WHERE pm.user_id = $1`,
        [id]
      );
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const db = require("../config/db");

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  assignMember,
  getProjects,
  deleteProject, 
};
