// Desc: user routes
import express from "express";
import { db } from "../index.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/", async (req, res) => {
  const q =
    "INSERT INTO user (username, email, password, createdAt) VALUES (?)";
  const hashedPassword = await bcrypt.hashSync(req.body.password, 12);
  const values = [
    req.body.username,
    req.body.email,
    hashedPassword,
    new Date(),
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.send(data);
    }
  });
});

router.get("/", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(data);
    }
  });
});

export default router;
