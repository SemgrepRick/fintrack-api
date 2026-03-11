const users = [
  { id: "u1", username: "alice", email: "alice@example.com", password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "user", ssn: "123-45-6789", balance: 15000 },
  { id: "u2", username: "bob", email: "bob@example.com", password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "user", ssn: "987-65-4321", balance: 3200 },
  { id: "u3", username: "carol", email: "carol@example.com", password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "user", ssn: "555-44-3333", balance: 87000 },
  { id: "u4", username: "admin", email: "admin@example.com", password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "admin", ssn: "000-00-0001", balance: 0 },
];

const accounts = [
  { id: "acc1", userId: "u1", type: "checking", accountNumber: "1234567890", balance: 15000, routingNumber: "021000021" },
  { id: "acc2", userId: "u1", type: "savings", accountNumber: "1234567891", balance: 42000, routingNumber: "021000021" },
  { id: "acc3", userId: "u2", type: "checking", accountNumber: "9876543210", balance: 3200, routingNumber: "021000021" },
  { id: "acc4", userId: "u3", type: "checking", accountNumber: "5551234567", balance: 87000, routingNumber: "021000021" },
];

const transactions = [
  { id: "tx1", accountId: "acc1", userId: "u1", amount: -250, description: "Grocery Store", date: "2024-01-15", type: "debit" },
  { id: "tx2", accountId: "acc1", userId: "u1", amount: 5000, description: "Salary Deposit", date: "2024-01-01", type: "credit" },
  { id: "tx3", accountId: "acc3", userId: "u2", amount: -89.99, description: "Netflix", date: "2024-01-10", type: "debit" },
  { id: "tx4", accountId: "acc4", userId: "u3", amount: 50000, description: "Wire Transfer In", date: "2024-01-05", type: "credit" },
  { id: "tx5", accountId: "acc2", userId: "u1", amount: -1200, description: "Rent Payment", date: "2024-01-02", type: "debit" },
];

const documents = [
  { id: "doc1", userId: "u1", name: "2023_tax_return.pdf", type: "tax", url: "/files/u1/tax2023.pdf", sensitive: true },
  { id: "doc2", userId: "u2", name: "bank_statement_jan.pdf", type: "statement", url: "/files/u2/stmt_jan.pdf", sensitive: true },
  { id: "doc3", userId: "u3", name: "investment_portfolio.pdf", type: "investment", url: "/files/u3/portfolio.pdf", sensitive: true },
  { id: "doc4", userId: "u1", name: "loan_agreement.pdf", type: "loan", url: "/files/u1/loan.pdf", sensitive: true },
];

const messages = [
  { id: "msg1", fromUserId: "u4", toUserId: "u1", subject: "Account Verification Required", body: "Please verify your account within 24 hours.", date: "2024-01-15", read: false },
  { id: "msg2", fromUserId: "u1", toUserId: "u2", subject: "Payment Sent", body: "I sent you $200 for dinner.", date: "2024-01-14", read: true },
  { id: "msg3", fromUserId: "u4", toUserId: "u2", subject: "Suspicious Activity Detected", body: "We noticed unusual login from IP 1.2.3.4. Temporary hold placed.", date: "2024-01-13", read: false },
];

const transferRequests = [
  { id: "tr1", fromAccountId: "acc1", toAccountId: "acc3", amount: 500, status: "pending", requestedBy: "u1" },
  { id: "tr2", fromAccountId: "acc3", toAccountId: "acc1", amount: 200, status: "approved", requestedBy: "u2" },
];

const auditLogs = [
  { id: "log1", userId: "u1", action: "login", ip: "192.168.1.1", timestamp: "2024-01-15T10:00:00Z" },
  { id: "log2", userId: "u2", action: "login", ip: "10.0.0.5", timestamp: "2024-01-15T09:30:00Z" },
  { id: "log3", userId: "u3", action: "large_transfer", ip: "172.16.0.1", timestamp: "2024-01-05T14:00:00Z" },
];

module.exports = { users, accounts, transactions, documents, messages, transferRequests, auditLogs };
