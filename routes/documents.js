const express = require("express");
const { documents } = require("../data/store");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const userId = req.query.userId || req.user.id;
  const userDocs = documents.filter((d) => d.userId === userId);
  res.json(userDocs);
});

router.get("/:docId", authenticate, (req, res) => {
  const doc = documents.find((d) => d.id === req.params.docId);
  if (!doc) return res.status(404).json({ error: "Document not found" });
  res.json(doc);
});

router.delete("/:docId", authenticate, (req, res) => {
  const idx = documents.findIndex((d) => d.id === req.params.docId);
  if (idx === -1) return res.status(404).json({ error: "Document not found" });
  documents.splice(idx, 1);
  res.json({ success: true });
});

router.post("/", authenticate, (req, res) => {
  const { name, type, url } = req.body;
  const targetUserId = req.body.userId || req.user.id;

  const doc = {
    id: `doc${documents.length + 1}`,
    userId: targetUserId,
    name,
    type,
    url,
    sensitive: true,
  };
  documents.push(doc);
  res.status(201).json(doc);
});

module.exports = router;
