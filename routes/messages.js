const express = require("express");
const { messages } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const inbox = messages.filter((m) => m.toUserId === req.user.id);
  res.json(inbox);
});

router.get("/:msgId", authenticate, (req, res) => {
  const msg = messages.find((m) => m.id === req.params.msgId);
  if (!msg) return res.status(404).json({ error: "Message not found" });
  res.json(msg);
});

router.post("/", authenticate, (req, res) => {
  const { toUserId, subject, body } = req.body;
  const msg = {
    id: `msg${messages.length + 1}`,
    fromUserId: req.user.id,
    toUserId,
    subject,
    body,
    date: new Date().toISOString().split("T")[0],
    read: false,
  };
  messages.push(msg);
  res.status(201).json(msg);
});

router.delete("/:msgId", authenticate, (req, res) => {
  const msg = messages.find((m) => m.id === req.params.msgId);
  if (!msg) return res.status(404).json({ error: "Message not found" });
  const idx = messages.indexOf(msg);
  messages.splice(idx, 1);
  res.json({ success: true });
});

router.put("/:msgId/read", authenticate, (req, res) => {
  const msg = messages.find((m) => m.id === req.params.msgId);
  if (!msg) return res.status(404).json({ error: "Message not found" });
  msg.read = true;
  res.json(msg);
});

module.exports = router;
