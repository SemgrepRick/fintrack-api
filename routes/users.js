const express = require("express");
const { users } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json(user);
});

router.get("/:id", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.put("/:id", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { email, ssn, balance } = req.body;
  if (email) user.email = email;
  if (ssn) user.ssn = ssn;
  if (balance !== undefined) user.balance = balance;

  res.json(user);
});

router.delete("/:id", authenticate, (req, res) => {
  const idx = users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  users.splice(idx, 1);
  res.json({ success: true });
});

router.get("/:id/export", authenticate, (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ error: "Forbidden: cannot export another user's data" });
  }
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    ssn: user.ssn,
    balance: user.balance,
    role: user.role,
  });
});

module.exports = router;
