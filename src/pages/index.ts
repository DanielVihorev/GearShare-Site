// server/index.ts (Express + MySQL)
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors(), express.json());

const pool = mysql.createPool({
  host: "localhost", user: "root", database: "dashboard", password: "secret"
});

app.get("/api/orders", async (req, res) => {
  const [rows] = await pool.query("SELECT id, item, qty, total FROM orders");
  res.json(rows);
});

app.get("/api/sales", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM sales");
  res.json(rows);
});

app.get("/api/contacts", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM contacts");
  res.json(rows);
});

app.get("/api/billing", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM billing");
  res.json(rows);
});

app.listen(3001, () => console.log("API running on port 3001"));