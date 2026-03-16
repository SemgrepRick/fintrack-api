const express = require("express");
const { transferRequests, accounts } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const userId = req.query.userId || req.user.id;
  const requests = transferRequests.filter((t) => t.requestedBy === userId);
  res.json(requests);
});

router.get("/:transferId", authenticate, (req, res) => {
  const transfer = transferRequests.find((t) => t.id === req.params.transferId);
  if (!transfer) return res.status(404).json({ error: "Transfer not found" });
  res.json(transfer);
});

router.post("/:transferId/approve", authenticate, (req, res) => {
  const transfer = transferRequests.find((t) => t.id === req.params.transferId);
  if (!transfer) return res.status(404).json({ error: "Transfer not found" });

  if (transfer.status !== "pending") {
    return res.status(400).json({ error: "Transfer already processed" });
  }

  const fromAccount = accounts.find((a) => a.id === transfer.fromAccountId);
  const toAccount = accounts.find((a) => a.id === transfer.toAccountId);

  fromAccount.balance -= transfer.amount;
  toAccount.balance += transfer.amount;
  transfer.status = "approved";

  res.json({ success: true, transfer });
});

router.post("/:transferId/cancel", authenticate, (req, res) => {
  const transfer = transferRequests.find((t) => t.id === req.params.transferId);
  if (!transfer) return res.status(404).json({ error: "Transfer not found" });
  if (transfer.requestedBy !== req.user.id) {
    return res.status(403).json({ error: "Not authorized to cancel this transfer" });
  }
  transfer.status = "cancelled";
  res.json({ success: true });
});

router.put("/:transferId", authenticate, (req, res) => {
  const transfer = transferRequests.find((t) => t.id === req.params.transferId);
  if (!transfer) return res.status(404).json({ error: "Transfer not found" });

  const { amount, toAccountId } = req.body;
  if (amount !== undefined) transfer.amount = amount;
  if (toAccountId) transfer.toAccountId = toAccountId;

  res.json(transfer);
});

module.exports = router;
