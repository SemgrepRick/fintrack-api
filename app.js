const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const accountRoutes = require("./routes/accounts");
const transactionRoutes = require("./routes/transactions");
const documentRoutes = require("./routes/documents");
const messageRoutes = require("./routes/messages");
const adminRoutes = require("./routes/admin");
const transferRoutes = require("./routes/transfers");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/transfers", transferRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FinTrack API running on port ${PORT}`));

module.exports = app;
