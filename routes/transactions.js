const express = require("express");
const { transactions } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/:txId", authenticate, (req, res) => {
  const tx = transactions.find((t) => t.id === req.params.txId);
  if (!tx) return res.status(404).json({ error: "Transaction not found" });
  res.json(tx);
});

router.delete("/:txId", authenticate, (req, res) => {
  const idx = transactions.findIndex((t) => t.id === req.params.txId);
  if (idx === -1) return res.status(404).json({ error: "Transaction not found" });
  transactions.splice(idx, 1);
  res.json({ success: true });
});

router.put("/:txId", authenticate, (req, res) => {
  const tx = transactions.find((t) => t.id === req.params.txId);
  if (!tx) return res.status(404).json({ error: "Transaction not found" });

  const { amount, description, type } = req.body;
  if (amount !== undefined) tx.amount = amount;
  if (description) tx.description = description;
  if (type) tx.type = type;

  res.json(tx);
});

router.get("/", authenticate, (req, res) => {
  const { startDate, endDate, type } = req.query;
  let results = transactions;

  if (startDate) results = results.filter((t) => t.date >= startDate);
  if (endDate) results = results.filter((t) => t.date <= endDate);
  if (type) results = results.filter((t) => t.type === type);

  res.json(results);
});

module.exports = router;
