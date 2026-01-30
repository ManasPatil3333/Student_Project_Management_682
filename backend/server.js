const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Student Project Management API is running");
});

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("PostgreSQL connected successfully at:", res.rows[0].now);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
