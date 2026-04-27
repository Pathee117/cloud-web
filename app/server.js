const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "cloudapp",
  port: 5432,
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW() as time");
  res.send(`<h1>Hello from Node + PostgreSQL</h1><p>DB time: ${result.rows[0].time}</p>`);
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
