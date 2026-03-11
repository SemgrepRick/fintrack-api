const express = require("express");
const { users, accounts, transactions, auditLogs } = require("../data/store");
const { authenticate, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/users", authenticate, requireAdmin, (req, res) => {
  res.json(users);
});

router.get("/users/:id/full", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const userAccounts = accounts.filter((a) => a.userId === user.id);
  const userTxs = transactions.filter((t) => t.userId === user.id);
  res.json({ user, accounts: userAccounts, transactions: userTxs });
});

router.post("/users/:id/suspend", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.suspended = true;
  res.json({ success: true, user });
});

router.post("/users/:id/promote", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.role = req.body.role || "admin";
  res.json({ success: true, user });
});

router.get("/audit-logs", authenticate, requireAdmin, (req, res) => {
  res.json(auditLogs);
});

router.get("/audit-logs/:userId", authenticate, (req, res) => {
  const logs = auditLogs.filter((l) => l.userId === req.params.userId);
  res.json(logs);
});

router.get("/reports/financial", authenticate, (req, res) => {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalTransactions = transactions.length;
  const largeTransactions = transactions.filter((t) => Math.abs(t.amount) > 10000);
  res.json({ totalBalance, totalTransactions, largeTransactions, accounts, users });
});

router.delete("/users/:id", authenticate, requireAdmin, (req, res) => {
  const idx = users.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  users.splice(idx, 1);
  res.json({ success: true });
});

module.exports = router;
