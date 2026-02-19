const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");

    const projects = await pool.query("SELECT COUNT(*) FROM projects");

    const completed = await pool.query(
      "SELECT COUNT(*) FROM projects WHERE status = 'completed'"
    );

    const active = await pool.query(
      "SELECT COUNT(*) FROM projects WHERE status = 'active'"
    );

    res.json({
      users: users.rows[0].count,
      projects: projects.rows[0].count,
      completed: completed.rows[0].count,
      active: active.rows[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
};

module.exports = { getDashboardStats };
