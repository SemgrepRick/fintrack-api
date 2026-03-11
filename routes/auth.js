const express = require("express");
const bcrypt = require("bcryptjs");
const { users } = require("../data/store");
const { generateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, userId: user.id, role: user.role });
});

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: "Username taken" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: `u${users.length + 1}`,
    username,
    email,
    password: hashed,
    role: role || "user",
    ssn: null,
    balance: 0,
  };
  users.push(newUser);

  const token = generateToken(newUser);
  res.status(201).json({ token, userId: newUser.id, role: newUser.role });
});

module.exports = router;
