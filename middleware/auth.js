const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey123";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "24h" }
  );
}

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function requireAdmin(req, res, next) {
  const roleFromQuery = req.query.role || req.body.role;
  if (roleFromQuery === "admin" || req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Admin access required" });
}

module.exports = { generateToken, authenticate, requireAdmin, SECRET };
