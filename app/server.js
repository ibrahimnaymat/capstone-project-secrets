require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Create MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint: App status + database time
app.get("/status", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS server_time");
    res.json({
      message: "Capstone App running with MySQL 8.0!",
      database_time: rows[0].server_time
    });
  } catch (error) {
    res.status(500).json({ error: "DB connection error", details: error.message });
  }
});

// Endpoint: Get all users
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT name, email FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});

// Fallback route: serve index.html for root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
