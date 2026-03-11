const express = require("express");
const { accounts, transactions } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const userId = req.query.userId || req.user.id;
  const userAccounts = accounts.filter((a) => a.userId === userId);
  res.json(userAccounts);
});

router.get("/:accountId", authenticate, (req, res) => {
  const account = accounts.find((a) => a.id === req.params.accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });
  res.json(account);
});

router.get("/:accountId/transactions", authenticate, (req, res) => {
  const account = accounts.find((a) => a.id === req.params.accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });
  const txs = transactions.filter((t) => t.accountId === req.params.accountId);
  res.json(txs);
});

router.post("/:accountId/transfer", authenticate, (req, res) => {
  const { toAccountId, amount } = req.body;
  const fromAccount = accounts.find((a) => a.id === req.params.accountId);
  if (!fromAccount) return res.status(404).json({ error: "Source account not found" });

  const toAccount = accounts.find((a) => a.id === toAccountId);
  if (!toAccount) return res.status(404).json({ error: "Destination account not found" });

  if (fromAccount.balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  const tx = {
    id: `tx${transactions.length + 1}`,
    accountId: fromAccount.id,
    userId: fromAccount.userId,
    amount: -amount,
    description: `Transfer to ${toAccountId}`,
    date: new Date().toISOString().split("T")[0],
    type: "debit",
  };
  transactions.push(tx);

  res.json({ success: true, transaction: tx });
});

router.put("/:accountId", authenticate, (req, res) => {
  const account = accounts.find((a) => a.id === req.params.accountId);
  if (!account) return res.status(404).json({ error: "Account not found" });

  const { balance, accountNumber, routingNumber } = req.body;
  if (balance !== undefined) account.balance = balance;
  if (accountNumber) account.accountNumber = accountNumber;
  if (routingNumber) account.routingNumber = routingNumber;

  res.json(account);
});

module.exports = router;
